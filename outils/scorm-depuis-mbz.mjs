/* SCORM DEPUIS UNE SAUVEGARDE TOTARA / MOODLE (.mbz)
 *
 *   node outils/scorm-depuis-mbz.mjs <dossier-mbz-décompressé> <sortie.zip>
 *   … --sans "Fiche jeu de rôle - Prise de contact"   (activité écartée, par
 *     son nom exact ; l'option peut se répéter)
 *
 * Fabrique un paquet SCORM 1.2 (un SCO par activité, dans l'ordre des
 * sections) à partir d'une sauvegarde de cours décompressée :
 *   · SCORM (Storyline…) : le module repris tel quel, il se suit lui-même ;
 *   · page : son contenu ; si elle affiche nos exercices (iframe vers le
 *     site), la page suit l'apprenant : exercices faits, scores, réponses,
 *     « terminé » quand tous les exercices de la série sont faits ;
 *   · fichier (resource) : présentation + boutons Télécharger / Ouvrir ;
 *   · le reste : nom et présentation.
 * L'achèvement suit le réglage de la sauvegarde : manuel → bouton « Marquer
 * comme terminé », sinon terminé à l'ouverture. Les pages d'exercices, elles,
 * se terminent d'elles-mêmes, quand tout est fait.
 * Le temps passé est envoyé à la plateforme partout (cmi.core.session_time).
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
/* Deux formes de paquet :
 *   · par défaut, LE LECTEUR : un seul élément pour la plateforme, avec notre
 *     sommaire (menu burger) ; chaque activité s'ouvre dedans et le lecteur
 *     suit tout (commun/lecteur.js) ;
 *   · --multi : un élément par activité, suivi ligne par ligne par la
 *     plateforme, avec son propre sommaire. */
const MULTI = args.includes('--multi');
/* --sans "<nom>" : une activité de la sauvegarde laissée hors du paquet. */
const SANS = args.flatMap((a, i) => (a === '--sans' && args[i + 1] ? [args[i + 1].trim()] : []));
const ecartees = new Set();
const [src, out] = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--sans');
if (!src || !out) { console.error('usage : node outils/scorm-depuis-mbz.mjs [--multi] [--sans "<nom d’activité>"] <dossier-mbz> <sortie.zip>'); process.exit(1); }
const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, '..');
const SITE = 'https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/';

/* ── Lecture des XML de la sauvegarde ─────────────────────────────── */
const lire = f => fs.readFileSync(path.join(src, f), 'utf8');
const dec = s => String(s ?? '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
const champ = (xml, tag) => { const m = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(xml); return m ? dec(m[1]) : ''; };
const nul = v => (v === '$@NULL@$' ? '' : v);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const escXml = s => esc(s).replace(/'/g, '&apos;');

const fichiers = [];
for (const m of lire('files.xml').matchAll(/<file id="(\d+)">([\s\S]*?)<\/file>/g)) {
  const b = m[2];
  const f = {
    id: m[1], contextid: champ(b, 'contextid'), component: champ(b, 'component'), filearea: champ(b, 'filearea'),
    filepath: champ(b, 'filepath'), filename: champ(b, 'filename'), hash: champ(b, 'contenthash'), mimetype: nul(champ(b, 'mimetype'))
  };
  if (f.filename !== '.') fichiers.push(f);
}
const blob = f => path.join(src, 'files', f.hash.slice(0, 2), f.hash);
const fichiersDe = (ctx, component, area) => fichiers.filter(f => f.contextid === ctx && f.component === component && f.filearea === area);

/* Nettoie le HTML collé depuis un éditeur (Gemini, Google Docs…) : balises
 * vides d'Angular, attributs techniques. */
const propre = html => String(html)
  .replace(/<!---->/g, '')
  .replace(/<sup[^>]*>\s*<\/sup>/g, '')
  .replace(/\s(?:data-path-to-node|data-index-in-node|_ngcontent-[\w-]+|aria-describedby|aria-setsize|aria-posinset)="[^"]*"/g, '')
  .replace(/\sid="(?:p-rc_|docs-internal-guid-)[^"]*"/g, '')
  .replace(/<span>\s*<\/span>/g, '');

const cours = lire('course/course.xml');
const titreCours = champ(cours, 'fullname');
const sauvegarde = lire('moodle_backup.xml');
const ident = (champ(cours, 'shortname') || 'parcours').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '_').toUpperCase();

/* Les sections, dans l'ordre, avec leurs activités dans l'ordre. */
const sections = fs.readdirSync(path.join(src, 'sections')).map(d => {
  const x = lire(`sections/${d}/section.xml`);
  return { numero: +champ(x, 'number'), nom: champ(x, 'name'), sequence: champ(x, 'sequence').split(',').filter(Boolean) };
}).sort((a, b) => a.numero - b.numero);
const presentes = new Set([...sauvegarde.matchAll(/<moduleid>(\d+)<\/moduleid>/g)].map(m => m[1]));

/* ── Le paquet ────────────────────────────────────────────────────── */
const tmp = fs.mkdtempSync(path.join(path.dirname(path.resolve(out)), 'scorm-'));
const ecrire = (rel, contenu) => { const f = path.join(tmp, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, contenu); };
const copier = (de, rel) => { const f = path.join(tmp, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.copyFileSync(de, f); };

// Les fichiers communs : liaison SCORM, page d'exercices, styles, polices.
const COMMUN = path.join(ICI, 'scorm-commun');
for (const f of fs.readdirSync(COMMUN)) {
  if (/^lecteur\./.test(f) && MULTI) continue;
  copier(path.join(COMMUN, f), f === 'lecteur.html' ? f : `commun/${f}`);
}
// Le logo CCI de la barre du lecteur.
if (!MULTI) copier(path.join(RACINE, 'moteur/assets/logo-cci.webp'), 'commun/logo-cci.webp');
// L'image du parcours (en tête du sommaire).
const coursCtx = (/contextid="(\d+)"/.exec(lire('course/course.xml')) || [])[1];
const imageCours = fichiers.find(f => f.contextid === coursCtx && f.component === 'course' && f.filearea === 'images' && /^image\//.test(f.mimetype));
if (imageCours && !MULTI) copier(blob(imageCours), `commun/parcours${path.extname(imageCours.filename).toLowerCase() || '.png'}`);
for (const g of ['400', '700', '800']) copier(path.join(RACINE, `moteur/assets/fonts/fira-sans-${g}.woff2`), `commun/fira-sans-${g}.woff2`);

/* Les images et fichiers d'un texte (@@PLUGINFILE@@) sont copiés à côté. */
function avecFichiers(html, ctx, component, area, dossier) {
  for (const f of fichiersDe(ctx, component, area)) {
    const rel = (f.filepath + f.filename).replace(/^\//, '');
    copier(blob(f), `${dossier}/${rel}`);
  }
  return String(html).replace(/@@PLUGINFILE@@\//g, '');
}

function page({ titre, corps, script = '', tete = '' }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)}</title>
<link rel="stylesheet" href="../commun/style.css">
<script src="../commun/scorm.js"></script>${tete}
</head>
<body>
<main class="wrap">
${MULTI ? `<h1 class="titre">${esc(titre)}</h1>` : '<!-- titre : dans la barre du lecteur -->'}
${corps}
</main>
${script}
</body>
</html>
`;
}
const boutonTermine = `<div class="mc" id="mc"><button class="btn" type="button">Marquer comme terminé</button><p class="mc-msg">Cliquez quand vous avez terminé cette activité.</p></div>`;
const achevement = manuel => manuel ? '<script>SCO.manualComplete("mc");</script>' : '<script>SCO.completeOnView();</script>';

const items = [];
const parcours = [];   // le sommaire du lecteur : sections et éléments
const sommaire = [];   // les éléments de la section en cours
const ressources = [];
let n = 0;
for (const section of sections) {
  const enfants = [];
  for (const moduleid of section.sequence) {
    if (!presentes.has(moduleid)) continue;
    const dir = fs.readdirSync(path.join(src, 'activities')).find(d => d.endsWith(`_${moduleid}`));
    if (!dir) continue;
    const type = dir.replace(/_\d+$/, '');
    const modXml = lire(`activities/${dir}/module.xml`);
    if (champ(modXml, 'visible') === '0') continue;
    const actXml = lire(`activities/${dir}/${type}.xml`);
    const ctx = (/contextid="(\d+)"/.exec(actXml) || [])[1];
    const nom = champ(actXml, 'name');
    if (SANS.includes(nom.trim())) { console.log(`  écartée : ${nom}`); ecartees.add(nom.trim()); continue; }
    const intro = propre(nul(champ(actXml, 'intro')));
    const manuel = champ(modXml, 'completion') === '1';
    const dossier = `${String(++n).padStart(2, '0')}_${type}`;
    let href;
    let genre = type; // pour le lecteur : scorm, exercices, page, resource…

    if (type === 'scorm') {
      // Le module tel qu'il a été déposé : ses fichiers, et sa page de lancement.
      const contenu = fichiersDe(ctx, 'mod_scorm', 'content');
      for (const f of contenu) copier(blob(f), `${dossier}/${(f.filepath + f.filename).replace(/^\//, '')}`);
      const manifeste = fs.readFileSync(path.join(tmp, dossier, 'imsmanifest.xml'), 'utf8');
      const lancement = (/<resource[^>]*adlcp:scormtype="sco"[^>]*href="([^"]+)"/i.exec(manifeste)
        || /<resource[^>]*href="([^"]+)"[^>]*adlcp:scormtype="sco"/i.exec(manifeste) || [])[1];
      if (!lancement) throw new Error(`${nom} : page de lancement introuvable`);
      // Son ancien manifeste et ses schémas ne servent plus : un seul
      // manifeste dans le paquet, à la racine.
      for (const f of fs.readdirSync(path.join(tmp, dossier))) if (f === 'imsmanifest.xml' || /\.xsd$/.test(f)) fs.rmSync(path.join(tmp, dossier, f));
      href = `${dossier}/${lancement}`;
    } else if (type === 'page') {
      const contenu = avecFichiers(propre(champ(actXml, 'content')), ctx, 'mod_page', 'content', dossier);
      const iframe = /<iframe[^>]*src="([^"]+)"[^>]*><\/iframe>/i.exec(contenu);
      const exercices = iframe && dec(iframe[1]).startsWith(SITE);
      if (exercices) {
        genre = 'exercices';
        // Nos exercices : la page suit l'apprenant (commun/activites.js).
        const texte = contenu.replace(iframe[0], '');
        const adresse = dec(iframe[1]);
        ecrire(`${dossier}/index.html`, page({
          titre: nom,
          corps: `<div class="intro">${texte}</div>
<div class="suivi" id="suivi" hidden><p class="suivi-texte" id="suivi-texte"></p><div class="suivi-barre"><span id="suivi-barre"></span></div></div>
<p class="suivi-alerte" id="suivi-alerte" hidden>Connexion à la plateforme indisponible : vos exercices fonctionnent, mais leur suivi n'est pas enregistré.</p>
<iframe id="exercices" class="exercices" title="${esc(nom)}" allow="autoplay; fullscreen; microphone; camera" allowfullscreen data-src="${esc(adresse)}"></iframe>`,
          script: '<script src="../commun/activites.js"></script>'
        }));
      } else {
        ecrire(`${dossier}/index.html`, page({ titre: nom, corps: `<div class="intro">${contenu}</div>${manuel ? boutonTermine : ''}`, script: achevement(manuel) }));
      }
      href = `${dossier}/index.html`;
    } else if (type === 'resource') {
      const docs = fichiersDe(ctx, 'mod_resource', 'content');
      const liens = docs.map(f => {
        // Un fichier déposé sans extension (« Fiche jeu de rôle ») la retrouve.
        let nomFichier = f.filename;
        if (!/\.\w{2,5}$/.test(nomFichier)) {
          const tete = fs.readFileSync(blob(f)).subarray(0, 4).toString('latin1');
          const ext = /wordprocessingml|msword/.test(f.mimetype) ? '.docx' : /pdf/.test(f.mimetype) || tete === '%PDF' ? '.pdf'
            : tete.startsWith('PK') && fs.readFileSync(blob(f)).includes('word/document.xml') ? '.docx'
            : tete.startsWith('PK') && fs.readFileSync(blob(f)).includes('ppt/presentation.xml') ? '.pptx'
            : tete.startsWith('PK') && fs.readFileSync(blob(f)).includes('xl/workbook.xml') ? '.xlsx' : '';
          nomFichier += ext;
        }
        // Rangé sous un nom sans accent ni espace (certaines plateformes
        // abîment les noms accentués d'un zip) ; téléchargé sous son vrai nom.
        const range = nomFichier.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.]+/g, '-').replace(/-+/g, '-').toLowerCase();
        copier(blob(f), `${dossier}/${range}`);
        const url = encodeURIComponent(range);
        const pdf = /\.pdf$/i.test(nomFichier);
        return `<div class="doc"><p class="doc-nom">${esc(nomFichier)}</p><div class="btns"><a class="btn" href="${url}" download="${esc(nomFichier)}" data-telecharge>Télécharger le document</a>${pdf ? `<a class="btn sec" href="${url}" target="_blank" rel="noopener">Ouvrir dans un nouvel onglet</a>` : ''}</div>${pdf ? `<object class="pdf" data="${url}" type="application/pdf"></object>` : ''}</div>`;
      }).join('');
      ecrire(`${dossier}/index.html`, page({ titre: nom, corps: `<div class="intro">${avecFichiers(intro, ctx, 'mod_resource', 'intro', dossier)}</div>${liens}${manuel ? boutonTermine : ''}`, script: achevement(manuel) }));
      href = `${dossier}/index.html`;
    } else {
      ecrire(`${dossier}/index.html`, page({ titre: nom, corps: `<div class="intro">${intro}</div>${manuel ? boutonTermine : ''}`, script: achevement(manuel) }));
      href = `${dossier}/index.html`;
      console.warn(`  · ${type} « ${nom} » : repris en simple page (nom et présentation)`);
    }

    const id = `${type.toUpperCase()}_${moduleid}`;
    enfants.push(`        <item identifier="IT_${id}" identifierref="RES_${id}" isvisible="true">\n          <title>${escXml(nom)}</title>\n        </item>`);
    // Une ressource par SCO, avec ses fichiers (les SCORM repris gardent leur
    // propre liste : on ne la répète pas, la plateforme décompresse tout).
    ressources.push(`    <resource identifier="RES_${id}" type="webcontent" adlcp:scormtype="sco" href="${escXml(href)}">\n      <file href="${escXml(href)}"/>\n    </resource>`);
    sommaire.push({ id, titre: nom, href, type: genre });
    console.log(`  ✓ ${dossier} · ${genre} · ${nom}`);
  }
  if (enfants.length) items.push(`      <item identifier="SEC_${section.numero}">\n        <title>${escXml(section.nom || `Section ${section.numero}`)}</title>\n${enfants.join('\n')}\n      </item>`);
  if (sommaire.length) parcours.push({ nom: section.nom || `Section ${section.numero}`, items: sommaire.splice(0) });
}
// Un nom demandé avec --sans mais absent de la sauvegarde : on arrête (faute de frappe).
const introuvables = SANS.filter(x => !ecartees.has(x));
if (introuvables.length) { console.error(`Activité introuvable (--sans) : ${introuvables.join(' ; ')}`); process.exit(1); }

if (!MULTI) {
  // Le lecteur : son sommaire (commun/parcours.js), et un seul élément pour
  // la plateforme.
  const image = fs.readdirSync(path.join(tmp, 'commun')).find(f => /^parcours\.(png|jpe?g|gif|webp|svg)$/.test(f));
  ecrire('commun/parcours.js', `window.PARCOURS = ${JSON.stringify({ titre: titreCours, image: image ? `commun/${image}` : '', sections: parcours }, null, 1)};\n`);
  items.splice(0, items.length, `      <item identifier="IT_LECTEUR" identifierref="RES_LECTEUR" isvisible="true">\n        <title>${escXml(titreCours)}</title>\n      </item>`);
  ressources.splice(0, ressources.length, `    <resource identifier="RES_LECTEUR" type="webcontent" adlcp:scormtype="sco" href="lecteur.html">\n      <file href="lecteur.html"/>\n    </resource>`);
}

ecrire('imsmanifest.xml', `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="CCI_${ident}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG_${ident}">
    <organization identifier="ORG_${ident}">
      <title>${escXml(titreCours)}</title>
${items.join('\n')}
    </organization>
  </organizations>
  <resources>
${ressources.join('\n')}
  </resources>
</manifest>
`);

/* Le zip : chemins avec des barres obliques, fichiers à la racine (le tar
 * de Windows écrit un vrai zip ; Compress-Archive de PowerShell 5 non). */
if (fs.existsSync(out)) fs.rmSync(out);
const tar = process.platform === 'win32' ? path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe') : 'zip';
const racines = fs.readdirSync(tmp);
if (process.platform === 'win32') execFileSync(tar, ['-a', '-c', '-f', path.resolve(out), '-C', tmp, ...racines]);
else execFileSync('zip', ['-qr', path.resolve(out), ...racines], { cwd: tmp });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\nPaquet écrit : ${out} (${(fs.statSync(out).size / 1048576).toFixed(1)} Mo)`);
