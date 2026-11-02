/* Indicateur de points des réponses ouvertes (moteur/js/indicateur.js + js/grilles.js).
 *
 * Chaque grille doit lire des champs qui existent, être intégrée à son
 * corrigé, et chaque page doit charger l'indicateur. Les jeux de réponses
 * justes et fausses arrivent avec les exercices à réponse rédigée.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}
const { ATELIER_GRILLES: G } = sandbox.window;

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

console.log('\nIndicateur de points · réponses ouvertes du module 1-2-1');

test('chaque grille est intégrée à son corrigé', () => {
  for (const [key, grid] of Object.entries(G)) assert.ok(grid.integre, `${key} : la grille doit être intégrée à l’écran`);
});

test('les pages d’exercice chargent les grilles, l’indicateur et la relecture', () => {
  for (const file of fs.readdirSync(path.join(root, 'exercices')).filter(f => !f.startsWith('_'))) {
    const html = fs.readFileSync(path.join(root, 'exercices', file), 'utf8');
    for (const script of ['../js/grilles.js', '../../../moteur/js/indicateur.js', '../../../moteur/js/reponses-ouvertes.js', '../../../moteur/js/mounts.js']) {
      assert.ok(html.includes(`src="${script}"`), `${file} : ${script} manque`);
    }
  }
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
