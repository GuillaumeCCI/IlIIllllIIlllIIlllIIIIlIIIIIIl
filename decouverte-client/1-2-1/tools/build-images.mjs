/* Génère les versions web des illustrations.
 *
 *     npm run build:images
 *
 * Les fichiers fournis pèsent environ 3 Mo chacun, pour 1672 pixels de
 * large. À l'écran, ils ne dépassent jamais 800 pixels : l'apprenant
 * télécharge donc bien plus que ce qu'il voit, et sur les pages à trois
 * illustrations cela représente près de 9 Mo avant le premier affichage.
 *
 * Ce script produit, à côté de chaque original, une version `.web.png`
 * redimensionnée et recompressée. **Les originaux ne sont jamais modifiés** :
 * vous gardez la pleine résolution pour l'impression ou une réutilisation.
 *
 * Le PNG est conservé comme format de sortie. Un essai en JPEG divisait
 * encore le poids par trois, mais les images ne se peignaient plus dans les
 * pages de contexte : le navigateur les déclarait chargées sans jamais les
 * afficher. Le gain ne valait pas ce risque.
 *
 * Il écrit aussi `js/web-images.js`, qui indique à l'interface quelles
 * versions existent. Si ce manifeste manque ou est périmé, les originaux
 * s'affichent : le chargement est plus lent, mais rien n'est cassé.
 *
 * Nécessite `sharp` :  npm install --no-save sharp
 */
import { writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('Le module « sharp » est absent. Installez-le puis relancez :');
  console.log('  npm install --no-save sharp');
  console.log('\nSans lui, les illustrations d’origine restent affichées : rien');
  console.log('n’est cassé, le chargement est seulement plus lent.');
  process.exit(0);
}

/* La plus grande illustration s'affiche en 788 pixels de large. 1100 pixels
 * couvrent donc confortablement un écran à forte densité, sans télécharger
 * du détail que personne ne verra : c'est là que se joue l'essentiel du
 * gain, les fichiers fournis faisant 1672 pixels.
 *
 * Porter cette valeur à 1600 double le poids sans différence visible. */
const MAX_WIDTH = 1100;
const QUALITY = 82;

const FOLDERS = ['assets/illustrations/s1', 'assets/illustrations/s2',
                 'assets/illustrations/s3', 'assets/illustrations/s4', 'assets/illustrations/s5'];

/* Les sources sont les PNG d'origine. On écarte tout fichier contenant
 * « .web. » pour ne jamais recompresser une version déjà produite. */
const sources = [];
for (const folder of FOLDERS) {
  const full = resolve(root, folder);
  if (!existsSync(full)) continue;
  for (const name of readdirSync(full)) {
    if (!name.endsWith('.png') || name.includes('.web.')) continue;
    sources.push(join(folder, name).replace(/\\/g, '/'));
  }
}

if (!sources.length) {
  console.log('Aucune illustration à traiter.');
  process.exit(0);
}

const webPath = source => source.replace(/\.png$/, '.web.png');
const size = file => statSync(resolve(root, file)).size;
const mo = bytes => `${(bytes / 1048576).toFixed(2)} Mo`;

let before = 0;
let after = 0;
let built = 0;
let skipped = 0;

for (const source of sources) {
  const target = webPath(source);
  const sourceFull = resolve(root, source);
  const targetFull = resolve(root, target);

  // On ne refait pas le travail si la version web est déjà à jour.
  if (existsSync(targetFull) && statSync(targetFull).mtimeMs >= statSync(sourceFull).mtimeMs) {
    before += size(source);
    after += size(target);
    skipped++;
    continue;
  }

  const image = sharp(sourceFull);
  const meta = await image.metadata();
  const width = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);

  await image
    .resize({ width, withoutEnlargement: true })
    .png({ quality: QUALITY, compressionLevel: 9, effort: 10, palette: true })
    .toFile(targetFull);

  before += size(source);
  after += size(target);
  built++;
  console.log(`  ${source.split('/').pop().padEnd(22)} ${mo(size(source)).padStart(8)} vers ${mo(size(target)).padStart(8)}`);
}

/* Le manifeste associe chaque original à sa version web. */
const manifest = {};
for (const source of sources) {
  const target = webPath(source);
  if (existsSync(resolve(root, target))) manifest[source] = target;
}

writeFileSync(resolve(root, 'js/web-images.js'),
`/* Versions allégées des illustrations · fichier GÉNÉRÉ, ne pas modifier.
 *
 * Produit par \`npm run build:images\`. Associe chaque illustration d'origine
 * à sa version web, servie à l'écran. Les originaux restent dans le dossier
 * et ne sont jamais touchés.
 *
 * Si ce fichier manque ou est périmé, l'interface affiche les originaux :
 * le chargement est plus lent, mais rien n'est cassé.
 */
window.ATELIER_WEB_IMAGES = ${JSON.stringify(manifest, null, 2)};
`, 'utf8');

console.log(`\n${built} version${built > 1 ? 's' : ''} produite${built > 1 ? 's' : ''}` +
  (skipped ? `, ${skipped} déjà à jour` : '') + '.');
if (before) {
  console.log(`Poids affiché : ${mo(before)} vers ${mo(after)} (${Math.round((1 - after / before) * 100)} % de moins).`);
}
console.log(`Manifeste écrit : js/web-images.js, ${Object.keys(manifest).length} entrées.`);
console.log('Les fichiers d’origine sont conservés intacts.');
