/* Indicateur de points des réponses ouvertes (moteur/js/indicateur.js + js/grilles.js).
 *
 * Pour chaque exercice à réponse rédigée : les réponses possibles du module
 * et au moins dix réponses justes, formulées autrement, obtiennent un bon
 * score ; les réponses mauvaises (solution, jugement, ajout, mots-clés), vides
 * ou hors sujet restent basses. On vérifie aussi que chaque grille lit des
 * champs de son exercice et que les pages chargent l'indicateur.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
const contents = fs.readdirSync(path.join(root, 'js')).filter(f => /^content-s\d+\.js$/.test(f)).map(f => `js/${f}`);
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js', ...contents]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}
const W = sandbox.window;
const { AtelierAnalyse: A, ATELIER_GRILLES: G } = W;
const { justes: JUSTES, mauvaises: MAUVAISES, motsCles: MOTS_CLES } = require('./reponses-variees.cjs');
const points = (key, values) => (A.score(G[key], values) || { points: 0 }).points;
const champs = key => G[key].blocs.flatMap(b => b.champs || []);
const fill = (key, text) => Object.fromEntries(champs(key).map(f => [f, text]));
const contentOf = key => { const [, s, id] = key.match(/^s(\d+)-(.+)$/); return (W[`ATELIER_S${s}`] || {})[id]; };

/* Les réponses possibles affichées au corrigé, champ par champ. */
function modeles(key) {
  const values = {};
  contentOf(key).cases.forEach((kase, i) => (kase.fields || []).forEach(f => { if (f.model) values[`c${i}_${f.id}`] = f.model; }));
  return values;
}

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

const HORS_SUJET = 'Il fait beau aujourd’hui et la circulation était dense.';

console.log('\nIndicateur de points · réponses ouvertes du module 1-2-1');

test('chaque grille est intégrée à son corrigé et a ses réponses de test', () => {
  for (const [key, grid] of Object.entries(G)) {
    assert.ok(grid.integre, `${key} : la grille doit être intégrée à l’écran`);
    assert.ok(JUSTES[key] && JUSTES[key].length >= 10, `${key} : au moins dix réponses justes attendues`);
    assert.ok(MAUVAISES[key] && MAUVAISES[key].length >= 3, `${key} : au moins trois réponses mauvaises attendues`);
  }
});

test('chaque grille lit des champs que son exercice demande', () => {
  for (const key of Object.keys(G)) {
    const fields = Object.keys(modeles(key));
    for (const champ of champs(key)) assert.ok(fields.includes(champ), `${key} : champ ${champ} inconnu de l’exercice`);
  }
});

test('les réponses possibles du module obtiennent au moins 8 / 10', () => {
  const low = Object.keys(G).map(key => [key, points(key, modeles(key))]).filter(([, p]) => p < 8);
  assert.deepStrictEqual(low, []);
});

for (const [key, sets] of Object.entries(JUSTES)) {
  test(`${key} : ${sets.length} réponses justes, formulées autrement, obtiennent au moins 6 / 10`, () => {
    const low = sets.map((values, n) => [n + 1, points(key, values)]).filter(([, score]) => score < 6);
    assert.deepStrictEqual(low, [], `${key} : ${low.map(([n, s]) => `réponse ${n} à ${s} / 10`).join(', ')}`);
  });
}

test('les réponses mauvaises restent à 3 / 10 au plus', () => {
  const high = [];
  for (const [key, sets] of Object.entries(MAUVAISES)) sets.forEach((values, n) => { const p = points(key, values); if (p > 3) high.push(`${key} réponse ${n + 1} : ${p}`); });
  assert.deepStrictEqual(high, []);
});

test('les bonnes idées en mots isolés restent à 6 / 10 au plus, sous les réponses justes', () => {
  const high = [];
  for (const [key, values] of Object.entries(MOTS_CLES)) {
    const p = points(key, values);
    const best = Math.min(...JUSTES[key].map(v => points(key, v)));
    if (p > 6 || p >= best) high.push(`${key} : ${p} (justes dès ${best})`);
  }
  assert.deepStrictEqual(high, []);
});

test('les réponses justes pleines de fautes d’orthographe obtiennent au moins 7 / 10', () => {
  const { fautes: FAUTES } = require('./reponses-variees.cjs');
  for (const [key, sets] of Object.entries(FAUTES)) {
    const low = sets.map((values, n) => [n + 1, points(key, values)]).filter(([, score]) => score < 7);
    assert.deepStrictEqual(low, [], `${key} : ${low.map(([n, s]) => `réponse ${n} à ${s} / 10`).join(', ')}`);
  }
});

test('la tolérance aux fautes ne confond pas deux vrais mots voisins', () => {
  const same = (text, expression) => A.find(A.tokens(text), expression, true).length > 0;
  assert.ok(!same('pas pris au sérieux', 'prix'), '« pris » n’est pas « prix »');
  assert.ok(!same('le parking de l’agence', 'agente'), '« agence » n’est pas « agente »');
  assert.ok(!same('le parking de l’agence', 'agent'), '« agence » n’est pas « agent »');
  assert.ok(same('cété épuisan', 'épuisant'), '« épuisan » vaut « épuisant »');
  assert.ok(same('toujour la loteri', 'loterie'), '« loteri » vaut « loterie »');
  assert.ok(same('cest bien sa', 'c’est bien ça'), '« cest bien sa » vaut « c’est bien ça »');
});

test('une réponse vide ne marque aucun point, une réponse hors sujet au plus 1', () => {
  for (const key of Object.keys(G)) {
    assert.strictEqual(points(key, fill(key, '')), 0, key);
    assert.ok(points(key, fill(key, HORS_SUJET)) <= 1, `${key} hors sujet : ${points(key, fill(key, HORS_SUJET))}`);
  }
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
