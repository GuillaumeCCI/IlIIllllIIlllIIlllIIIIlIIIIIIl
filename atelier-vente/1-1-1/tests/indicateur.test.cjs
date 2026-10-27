/* Indicateur de points des réponses ouvertes (moteur/js/indicateur.js + js/grilles.js).
 *
 * Les corrigés modèles des fiches doivent obtenir un bon score, les réponses
 * réflexes ou hors sujet un score bas ; chaque grille doit lire des champs
 * qui existent dans son écran.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js', 'js/content-s1.js', 'js/content-s2.js', 'js/content-s3.js', 'js/content-s4.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8').replace(/globalThis\);\s*$/, 'window);'), sandbox, { filename: file });
}
const { AtelierAnalyse: A, ATELIER_GRILLES: G, ATELIER_S1: S1, ATELIER_S3: S3, ATELIER_S4: S4 } = sandbox.window;
const points = (key, values) => A.score(G[key], values).points;
const quote = text => text.replace(/^.*?«\s*/, '').replace(/\s*».*$/, '');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

console.log('\nIndicateur de points — réponses ouvertes');

test('les corrigés modèles obtiennent au moins 8 / 10', () => {
  const cases = {
    's1-E3': { opening: 'Bonjour, merci de me recevoir. Je suis Léa Martin d’Atelier Teinte. Je vous propose qu’on prenne le temps : je vous laisse me raconter votre projet de salon.' },
    's1-E1': { response: quote(S1.feedback.E1[0]) },
    's1-B': { opening: quote(S1.feedback.B[0]), adjustment: 'J’ai fait une ouverture courte et non intrusive, car le client est pressé.' },
    's3-1.4': { hypothesis: quote(S3['1.4'].hypothesisModel) + ' Cela masque une objection non exprimée : le prix, ou la nécessité de valider en interne.', question: quote(S3['1.4'].questionModel) },
    's4-1.2': { rewrite: quote(S4['1.2'].feedback) },
    's4-2.2': Object.fromEntries(S4['2.2'].situations.map((s, i) => [`repair${i}`, s.model]))
  };
  for (const [key, values] of Object.entries(cases)) assert.ok(points(key, values) >= 8, `${key} : ${points(key, values)} / 10`);
});

test('1.6 : le corrigé type de chaque contexte obtient au moins 8 / 10', () => {
  for (const [c, cas] of S3['1.6'].cases.entries()) {
    const grid = G['s3-1.6'].parCas(cas, i => `line${i}`);
    const score = A.score(grid, Object.fromEntries(cas.model.map((line, i) => [`line${i}`, line]))).points;
    assert.ok(score >= 8, `contexte ${c + 1} (${cas.label}) : ${score} / 10`);
  }
});

test('les réponses réflexes obtiennent au plus 3 / 10', () => {
  assert.ok(points('s4-2.2', Object.fromEntries(S4['2.2'].situations.map((s, i) => [`repair${i}`, s.reflex]))) <= 3);
  assert.ok(points('s3-1.4', { hypothesis: 'Il a pas le temps', question: 'D’accord, je vous rappelle dans un mois.' }) <= 3);
});

test('une réponse hors sujet ne marque aucun point', () => {
  assert.equal(points('s1-E3', { opening: 'Il fait beau aujourd’hui et la circulation était dense.' }), 0);
});

test('une liste de mots-clés sans phrase compte à moitié', () => {
  const list = points('s1-E3', { opening: 'bonjour merci je vous propose votre projet' });
  const sentence = points('s1-E3', { opening: 'Bonjour, merci. Je vous propose de parler de votre projet.' });
  assert.ok(list < sentence, `${list} devrait être inférieur à ${sentence}`);
});

test('les variantes d’un mot sont reconnues (accents, terminaisons, mot intercalé)', () => {
  const list = A.tokens('Je vous le PROPOSE, nous proposons ; écoutez');
  assert.ok(A.find(list, 'je vous propose').length, 'mot intercalé');
  assert.equal(A.find(list, 'proposer').length, 2, 'terminaisons');
  assert.ok(A.find(list, 'ecouter').length, 'accents');
});

test('chaque grille lit des champs qui existent dans les écrans', () => {
  const screens = fs.readdirSync(path.join(root, 'js/screens')).map(f => fs.readFileSync(path.join(root, 'js/screens', f), 'utf8')).join('\n');
  for (const [key, grid] of Object.entries(G)) {
    for (const bloc of grid.blocs || grid.parCas(S3['1.6'].cases[0], i => `line${i}`).blocs) {
      for (const field of bloc.champs || [bloc.motif]) {
        const base = field.replace(/\d+$/, '');
        assert.ok(screens.includes(`'${field}'`) || screens.includes(`\`${base}`) || screens.includes(`'${base}`), `${key} : champ « ${field} » introuvable`);
      }
    }
  }
});

test('le bloc affiché contient le score et les mots surlignés', () => {
  const html = A.render(A.score(G['s1-E3'], { opening: 'Bonjour. Je vous propose de voir nos couleurs en promotion.' }));
  assert.match(html, /\/ 10 points/);
  assert.match(html, /<mark>Bonjour<\/mark>/);
  assert.match(html, /<mark class="is-warn">en promotion<\/mark>/);
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
