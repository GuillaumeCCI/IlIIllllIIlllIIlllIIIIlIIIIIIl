/* LA TRAME DE M1.2 : les SCORM et les activités dans l'ordre, avec un lien
 * et un code d'intégration (iframe) par activité.
 *
 *     node decouverte-client/tools/build-trame.cjs [dossier]
 *
 * Écrit decouverte-client/TRAME-M1-2.md et Trame_M1-2_integration.docx
 * (dossier donné, par défaut : Téléchargements), à la forme des fiches.
 * Une activité de la trame = un code : un thème entier (&theme=s2), ou une
 * partie d'un thème (&theme=s5&ex=5.2, voir moteur/js/embed.js).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const W = require('./build-fiches-word.cjs');

const BASE = 'https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/';
const NAME = 'L’Atelier Vente · Découverte client';
const RESIZE = '<script>if(!window.atelierVenteResize){window.atelierVenteResize=1;addEventListener("message",function(e){if(!e.data||e.data.type!=="atelier-vente:height")return;document.querySelectorAll("iframe[data-atelier-vente]").forEach(function(f){if(f.contentWindow===e.source)f.style.height=e.data.height+"px";});});}</script>';
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/* Chaque étape : [titre, durée, où, thème, exercices (facultatif), note]. */
const TRAME = [
  {
    code: '1-2-1', title: 'M1.2.1 · Pratiquer l’écoute active et s’adapter au client', total: '≈ 2 h',
    steps: [
      ['Grille d’auto-positionnement · Début', '5 min', 'Mon point de départ', 's1'],
      ['SCORM « Comprendre et s’adapter au client »', '15 min', 'Catalogue CCI France, sur votre plateforme', null],
      ['A1 · Qui parle comme ça ?', '15 min', 'Les attitudes d’écoute : Au magasin · En entreprise · À l’agence immobilière', 's2'],
      ['A2 · À vous de reformuler', '20 min', 'Reformuler : L’écho · Le reflet · La synthèse · Reformulation, ou pas ?', 's3'],
      ['A3 · Rendez-vous en agence', '25 min', 'Analyser un entretien : 4 exercices autour de Nadia', 's4'],
      ['A4 · Trois commerciaux, une cliente pressée', '15 min', 'Un exercice', 's5', '5.1'],
      ['A5 · Votre réponse, votre voix', '30 min', 'Un exercice · dépôt de l’audio et du texte', 's5', '5.2'],
      ['Synthèse facultative (3 options)', '45 à 60 min', 'Sur document, hors enveloppe : pas d’exercice en ligne', null],
      ['Grille d’auto-positionnement · Fin et « Ma progression »', '10 min', 'Mon point d’arrivée', 's9']
    ]
  },
  {
    code: '1-2-2', title: 'M1.2.2 · Questionner pour identifier les besoins et les motivations d’achat', total: '≈ 2 h 30',
    steps: [
      ['Grille d’auto-positionnement · Début', '5 min', 'Mon point de départ', 's1'],
      ['SCORM « Détecter les besoins et motivations d’achat »', '≈ 10 min', 'Catalogue CCI France, sur votre plateforme', null],
      ['A1 · La bonne question au bon moment', '20 min', 'Quel type de question ? · Les étages de l’entonnoir', 's2'],
      ['A2 · Du besoin exprimé au besoin réel', '25 min', 'Un exercice, cinq clients', 's3'],
      ['A3 · Les mots qui trahissent les motivations', '25 min', 'Les mots qui trahissent les motivations · Retour chez les Benali', 's4'],
      ['A4 · Le guide qui fait parler', '25 min', 'Un exercice', 's5', '5.1'],
      ['A5 · Votre guide, votre découverte', '45 min', 'Un exercice, l’activité principale · dépôt sur demande', 's5', '5.2'],
      ['Synthèse facultative (3 options)', '45 à 60 min', 'L’entretien dont vous êtes le héros · Le coach · Ma banque de questions terrain', 's6'],
      ['Grille d’auto-positionnement · Fin et « Ma progression »', '10 min', 'Mon point d’arrivée', 's9']
    ]
  }
];
/* Les blocs de la trame (fiche consolidée M1.2) : l'index de la première
 * étape du bloc, son nom, sa précision. Mêmes blocs pour les deux modules. */
const GROUPS = [
  [0, 'Pour commencer', 'la grille de départ, puis le SCORM'],
  [2, 'Activités complémentaires', 'au choix ; dans l’ordre conseillé : repérer, appliquer, analyser, évaluer'],
  [6, 'Activité socle', 'à faire par tous ; dépôt pour un retour du formateur ou d’un pair'],
  [7, 'Synthèse', 'facultative, hors enveloppe'],
  [8, 'Pour finir', 'la grille d’arrivée et « Ma progression »']
];
const groupAt = i => GROUPS.find(g => g[0] === i);

const LATER = [
  ['M1.2.3 · Situation intégratrice (≈ 2 h, sans SCORM)', 'Un entretien de découverte simulé (10 à 15 min) et une fiche de synthèse du besoin, évalués avec une grille commune. Pas encore en ligne : à concevoir.'],
  ['M1.2.4 · Approfondissement (≈ 2 h)', 'Préparation de la découverte, entonnoir et SPIN, motivations, passage à l’argumentation, vente à plusieurs décideurs, découverte à distance, immobilier. Ni SCORM ni fiche : à produire.']
];

function linkOf(m, step) {
  const [title, , , theme, ex] = step;
  if (!theme) return null;
  const url = `${BASE}cadre.html?module=${m.code}&theme=${theme}${ex ? `&ex=${ex}` : ''}`;
  const label = `${NAME} ${m.code} · ${title}`;
  return { url, code: `<iframe src="${url}" title="${escAttr(label)}" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>` };
}

/* ---------- Markdown (dépôt) ---------- */
function markdown() {
  const out = ['# Trame du module M1.2 · Découverte client', '',
    'Ordre à suivre, sous-module par sous-module, en cinq blocs : pour commencer, les activités complémentaires (au choix), l’activité socle (pour tous), la synthèse (facultative), pour finir.',
    'Une activité = un lien et un code d’intégration (iframe), à coller dans un bloc HTML de la plateforme.',
    'Fichier produit par `decouverte-client/tools/build-trame.cjs` : modifier la trame là, puis relancer.', '',
    'Hauteur automatique : collez une seule fois, dans la même page, cette ligne (sinon le cadre mesure 900 pixels) :', '', '```html', RESIZE, '```', ''];
  for (const m of TRAME) {
    out.push('---', '', `## ${m.title} (${m.total})`, '');
    m.steps.forEach((s, i) => {
      const g = groupAt(i);
      if (g) out.push(`### ${g[1]} · ${g[2]}`, '');
      const l = linkOf(m, s);
      out.push(`${i + 1}. **${s[0]}** (${s[1]})  `, `   ${s[2]}`);
      if (l) out.push('', `   Lien : ${l.url}`, '', '   ```html', `   ${l.code}`, '   ```');
      out.push('');
    });
  }
  out.push('---', '');
  LATER.forEach(([t, d]) => out.push(`## ${t}`, '', d, ''));
  out.push('**Total M1.2** : 2 SCORM (≈ 25 min) · ≈ 8 h 30 au complet. En parcours intégré avec M1.1, le SCORM « Comprendre et s’adapter au client » n’est suivi qu’une fois (rattaché à M1.1.1).', '');
  return out.join('\n');
}

/* ---------- Word ---------- */
function word() {
  W.setScale(0.9);
  const { C, run, para, table, P } = W;
  const code = t => para(run(t, { size: 15, color: '3A4660', font: 'Consolas' }), { line: 240, extra: `<w:shd w:fill="${C.box}" w:color="auto" w:val="clear"/><w:ind w:left="120" w:right="120"/>`, after: 40 });
  const out = [];
  out.push(para(run('MODULE M1.2 · DÉCOUVERTE CLIENT', { size: 16, color: C.blue, bold: true }), { after: 40 }));
  out.push(para(run('La trame, avec les codes d’intégration', { size: 40, color: C.navy, bold: true }), { after: 40, line: 240 }));
  out.push(para(run('M1.2 · Les SCORM et les activités, dans l’ordre de la plateforme', { size: 22, color: C.muted }), { after: 160 }));
  out.push(para(run('Chaque module suit cinq blocs : pour commencer, les activités complémentaires (au choix), l’activité socle (pour tous), la synthèse (facultative), pour finir. Une activité = un lien et un code d’intégration, à coller dans un bloc HTML de votre plateforme (« intégrer », « iframe », « code source »), dans l’ordre ci-dessous. Les SCORM viennent du catalogue CCI France.', { italic: true, color: C.muted }), { after: 60 }));
  out.push(para([run('Hauteur automatique. ', { bold: true, color: C.navy }), run('Collez une seule fois, dans la même page que les codes, la ligne ci-dessous ; sans elle, chaque cadre mesure 900 pixels de haut, avec une barre de défilement.')], { before: 80, after: 40 }));
  out.push(code(RESIZE));
  TRAME.forEach((m, k) => {
    out.push(P.heading(k + 1, `${m.title} (${m.total})`));
    m.steps.forEach((s, i) => {
      const g = groupAt(i);
      if (g) out.push(para([run(g[1], { size: 20, color: C.navy, bold: true }), run(`  ·  ${g[2]}`, { size: 17, color: C.muted })], { before: 160, after: 40, keepNext: true }));
      const l = linkOf(m, s);
      const kind = l ? null : /SCORM/.test(s[0]) ? 'Sur la plateforme' : 'Pas de code';
      const keep = x => (l ? x.replace(/<w:pPr>/g, '<w:pPr><w:keepNext/>') : x);
      out.push(keep(table([600, 7406, 1900], [[
        para(run(String(i + 1), { size: 22, color: C.coral, bold: true })),
        P.strong(s[0]) + P.sub(s[2]),
        para(run(s[1])) + (kind ? para(run(kind, { size: 16, color: C.muted }), { before: 30 }) : '')
      ]])));
      if (l) {
        out.push(para([run('Lien : ', { size: 16, color: C.muted }), run(l.url, { size: 16, color: C.blue })], { before: 40, after: 30, keepNext: true, extra: '<w:ind w:left="710"/>' }));
        out.push(code(l.code).replace('<w:ind w:left="120" w:right="120"/>', '<w:ind w:left="710" w:right="120"/>'));
      }
    });
  });
  out.push(P.heading(3, 'La suite du module'));
  out.push(table([3400, 6506], LATER.map(([t, d]) => [P.strong(t), P.body(d)])));
  out.push(`<w:p><w:pPr><w:pBdr><w:left w:val="single" w:color="${C.coral}" w:sz="18" w:space="8"/></w:pBdr><w:shd w:fill="${C.box}" w:color="auto" w:val="clear"/><w:spacing w:after="0" w:before="200" w:line="276"/><w:ind w:left="160" w:right="160"/></w:pPr>${run('Total M1.2. ', { bold: true, color: C.navy })}${run('2 SCORM (≈ 25 min) · ≈ 8 h 30 au complet. En parcours intégré avec M1.1, le SCORM « Comprendre et s’adapter au client » n’est suivi qu’une fois (rattaché à M1.1.1).')}</w:p>`);
  out.push('<w:sectPr><w:footerReference w:type="default" r:id="rId6"/><w:pgSz w:w="11906" w:h="16838" w:orient="portrait"/><w:pgMar w:top="850" w:right="1000" w:bottom="850" w:left="1000" w:header="708" w:footer="500" w:gutter="0"/><w:pgNumType/><w:docGrid w:linePitch="360"/></w:sectPr>');
  return out.join('');
}

const outDir = process.argv[2] || path.join(os.homedir(), 'Downloads');
fs.writeFileSync(path.join(__dirname, '..', 'TRAME-M1-2.md'), markdown());
console.log('decouverte-client/TRAME-M1-2.md');
W.writeDocx(path.join(outDir, 'Trame_M1-2_integration.docx'), word(), 'M1.2 · Trame et codes d’intégration');
