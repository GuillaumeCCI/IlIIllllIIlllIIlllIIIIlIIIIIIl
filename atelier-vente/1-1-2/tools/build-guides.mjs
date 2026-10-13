/* Régénère les aide-mémoire déposés dans les dossiers d'assets.
 *
 *     npm run build:guides
 *
 * Les listes de fichiers sont tirées du catalogue : elles ne peuvent donc pas
 * se désynchroniser du code. Relancez après avoir ajouté un exercice.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {} };
new Function('window', readFileSync(resolve(root, 'js/catalog.js'), 'utf8'))(sandbox.window);
const catalog = sandbox.window.ATELIER_CATALOG;

const basename = path => path.split('/').pop();
const pad = (text, width) => String(text).padEnd(width, ' ');

/* ─────────────────── assets/illustrations/COMMENT-REMPLACER.txt ──────── */

const illustrationLines = [];
for (const serie of catalog.series) {
  const rows = [];
  for (const exercise of serie.exercises) {
    const images = exercise.gallery
      ? exercise.gallery.map(item => ({ file: item.image, alt: item.alt }))
      : exercise.image ? [{ file: exercise.image, alt: exercise.alt }] : [];
    for (const [index, image] of images.entries()) {
      rows.push({
        screen: index === 0 ? `${exercise.id} · ${exercise.label}` : '',
        path: image.file.replace('assets/illustrations/', ''),
        alt: image.alt
      });
    }
    if (!images.length) rows.push({ screen: `${exercise.id} · ${exercise.label}`, path: '(aucune illustration)', alt: '' });
  }
  const width = Math.max(...rows.map(row => row.screen.length), 10) + 2;
  const pathWidth = Math.max(...rows.map(row => row.path.length), 10) + 2;
  illustrationLines.push(
    '',
    `── ${serie.label.toUpperCase()} ${'─'.repeat(Math.max(0, 62 - serie.label.length))}`,
    '',
    ...rows.map(row => `  ${pad(row.screen, width)}${pad(row.path, pathWidth)}${row.alt}`)
  );
}

const illustrationGuide = `REMPLACER UNE ILLUSTRATION
==========================

1. Exportez votre nouvelle image au format PNG.
2. Renommez-la EXACTEMENT comme le fichier a remplacer (meme casse).
3. Glissez-la dans le sous-dossier indique et acceptez le remplacement.
4. Actualisez la page (Ctrl+F5 sous Windows, Cmd+Maj+R sous macOS).

Aucun fichier de code n'est a modifier tant que vous gardez le nom.
Ajouter une image sous un autre nom ne remplace pas l'ancienne.
Renommer un JPG en .png ne le convertit pas : exportez vraiment en PNG.

Pour un autre nom, un autre format (.jpg, .webp) ou un nouveau texte
alternatif : modifiez l'entree de l'exercice dans js/catalog.js.
${illustrationLines.join('\n')}

AJOUTER UNE ILLUSTRATION LA OU IL N'Y EN A PAS

  Les exercices marques "(aucune illustration)" affichent a la place un
  schema de leur mecanique, dessine automatiquement. Pour leur donner une
  vraie illustration :

    1. Deposez votre PNG dans assets/illustrations/<serie>/
       (creez le dossier s3/ ou s4/ s'il n'existe pas encore)
    2. Dans js/catalog.js, ajoutez a l'entree de l'exercice :
         image: 'assets/illustrations/s3/mon-image.png',
         alt: 'Description de la scene, pour les lecteurs d ecran'
    3. Rechargez la page : l'illustration remplace le schema.

  Le schema reste utilise tant qu'aucune image n'est declaree : aucune
  page de contexte ne reste vide.

NOTE SUR LA SERIE 1
  Le portrait du client (1.4 et 1.5) a ete extrait de la maquette 1.4 A,
  faute de fichier separe. Remplacez-le par l original des que possible,
  en gardant le nom 1-1-2-S1-i1-4.png.

SITE PUBLIE
  Remplacer le fichier sur votre ordinateur ne change pas le site en ligne.
  Envoyez ensuite le fichier modifie sur GitHub, puis rechargez la page.
`;

writeFileSync(resolve(root, 'assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt'), illustrationGuide, 'utf8');

/* ───────────────────── assets/backgrounds/COMMENT-AJOUTER.txt ────────── */

const backgroundLines = [];
for (const serie of catalog.series) {
  const rows = serie.exercises
    .filter(exercise => exercise.background)
    .map(exercise => ({
      screen: `${exercise.id} · ${exercise.label}`,
      path: exercise.background.replace('assets/backgrounds/', '')
    }));
  const width = Math.max(...rows.map(row => row.screen.length), 10) + 2;
  backgroundLines.push(
    '',
    `── ${serie.label.toUpperCase()} ${'─'.repeat(Math.max(0, 62 - serie.label.length))}`,
    '',
    ...rows.map(row => `  ${pad(row.screen, width)}${row.path}`)
  );
}

const backgroundGuide = `AJOUTER UN BACKGROUND
=====================

Les PNG de ces dossiers sont pour l'instant TRANSPARENTS : le fond des
exercices reste donc blanc. Glissez une image PNG portant le meme nom
pour remplacer celui de votre choix, puis rechargez la page.

DEUX NIVEAUX DE FOND

  ${basename(catalog.commonBackground)}  (a la racine de ce dossier)
      Fond affiche derriere TOUS les exercices des quatre series.
      Remplacez-le pour habiller l'ensemble du parcours d'un seul coup.

  s1/, s2/, s3/, s4/
      Fond propre a un exercice. Il se superpose au fond commun :
      un fond opaque le masque, un fond transparent le laisse apparaitre.
${backgroundLines.join('\n')}

CONSEILS
  Format paysage, par exemple 1920 x 1080 pixels.
  Le fond est centre et couvre l'ecran ; il peut etre recadre sur mobile.
  Privilegiez des fonds clairs, surtout derriere les titres.
  Les panneaux de reponse restent blancs et opaques pour rester lisibles.

REGLAGES FINS
  background-size et background-position : debut de css/styles.css.
  Pour retirer un fond : rendez son PNG transparent, ou mettez la valeur
  background a null pour cet exercice dans js/catalog.js.

SITE PUBLIE
  Envoyez le fichier modifie sur GitHub, puis rechargez la page en ligne.
`;

writeFileSync(resolve(root, 'assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt'), backgroundGuide, 'utf8');

console.log('Aide-mémoire régénérés :');
console.log('  · assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt');
console.log('  · assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt');
