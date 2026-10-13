/* ══════════════════════════════════════════════════════════════════════
   INSTALLER LES FONDS

   Répartit les fonds disponibles sur les 34 exercices, plus la page de
   contexte. Le tirage est AU HASARD mais REPRODUCTIBLE : il dérive de la
   clé de l'exercice, pas d'un tirage à l'exécution. Relancer le script
   redonne donc exactement la même distribution, et un exercice garde son
   fond d'une génération à l'autre.

       node tools/install-backgrounds.mjs <dossier des fonds>

   Les fichiers sont copiés aux emplacements déjà déclarés dans le
   catalogue : rien à modifier dans le code. Pour changer le fond d'un
   exercice, glissez simplement votre image par-dessus la sienne.
   ══════════════════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('Indiquez le dossier contenant les fonds.');
  process.exit(1);
}

const sandbox = { window: {} };
new Function('window', readFileSync(join(root, 'js', 'catalog.js'), 'utf8'))(sandbox.window);
const catalog = sandbox.window.ATELIER_CATALOG;

/* Les images du dossier, triées par nom pour que l'ordre ne dépende pas
 * du système de fichiers : c'est ce qui rend le tirage reproductible. */
const pool = readdirSync(source)
  .filter(name => /\.(png|jpe?g|webp)$/i.test(name))
  .sort();

if (!pool.length) { console.error('Aucune image trouvée.'); process.exit(1); }
console.log(`${pool.length} fonds disponibles.\n`);

/* Hachage simple et stable d'une chaîne : deux exécutions, même résultat.
 * (FNV-1a, suffisant ici : on ne cherche qu'à disperser des clés.) */
function hash(text) {
  let value = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return value;
}

function copy(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  writeFileSync(to, readFileSync(from));
}

const used = new Map();
let placed = 0;

for (const exercise of catalog.all) {
  if (!exercise.background) continue;
  const pick = pool[hash(exercise.key) % pool.length];
  const target = resolve(root, exercise.background);

  /* La cible est déclarée en .png par le catalogue. Un JPEG copié sous ce
   * nom resterait lisible (les navigateurs se fient au contenu, pas à
   * l'extension), mais le mensonge se paierait tôt ou tard : on prévient. */
  if (extname(pick).toLowerCase() !== extname(target).toLowerCase()) {
    console.log(`  note : ${pick} est copié sous ${exercise.background}`);
  }

  copy(join(source, pick), target);
  used.set(pick, (used.get(pick) || 0) + 1);
  placed++;
  console.log(`  ${exercise.key.padEnd(8)} <- ${pick}`);
}

/* La page de contexte garde son propre décor SVG ; le fond commun ne sert
 * que de couche de repli sous les exercices. */
const common = pool[hash('commun') % pool.length];
copy(join(source, common), resolve(root, catalog.commonBackground));
console.log(`  ${'commun'.padEnd(8)} <- ${common}`);

console.log(`\n${placed} exercices servis.`);
const unused = pool.filter(name => !used.has(name) && name !== common);
if (unused.length) console.log(`Non utilisés : ${unused.join(', ')}`);
