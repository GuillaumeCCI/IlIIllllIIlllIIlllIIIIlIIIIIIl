const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/* Règles de saisie de la série 1. Les séries 2 à 4 sont couvertes par
 * tests/screens.test.cjs, qui monte chaque écran et valide ses réponses. */
const context = vm.createContext({ window: {} });
for (const file of ['catalog.js', 'content-s1.js', 'rules.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js', file), 'utf8'), context);
const catalog = context.window.ATELIER_CATALOG;
const config = context.window.ATELIER_S1;
const rules = context.ExerciseRules;
// Les exercices de la série 1, au format attendu par ces tests.
config.exercises = catalog.series[0].exercises;
config.commonBackground = catalog.commonBackground;
const validate = (id, values) => rules.validate(id, values, config);
const nWords = n => Array.from({ length: n }, () => 'bonjour').join(' ');

test('les huit exercices de la série 1 refusent une réponse vide', () => {
  for (const ex of config.exercises) assert.ok(validate(ex.id, {}).length > 0, ex.id);
});
test('les chemins d’illustration et de fond existent, avec la correspondance A/B des maquettes', () => {
  assert.match(config.exercises[0].image, /iB\.png$/);
  assert.match(config.exercises[1].image, /iA\.png$/);
  for (const ex of config.exercises) for (const key of ['image', 'background']) if (ex[key]) assert.ok(fs.existsSync(path.join(__dirname, '..', ex[key])), ex[key]);
  assert.ok(fs.existsSync(path.join(__dirname, '..', config.commonBackground)));
});
test('A et B acceptent les réponses remplies sans prétendre en juger la qualité', () => {
  assert.equal(validate('A', { strengths: 'Accueil clair.', improvements: 'Adapter au rythme et laisser la parole.', rewrite: 'Bonjour, je suis à votre disposition.' }).length, 0);
  assert.equal(validate('B', { opening: 'Bonjour, je vous laisse regarder. Je suis disponible si besoin.', adjustment: 'Je préserve son autonomie.' }).length, 0);
  assert.ok(validate('A', { strengths: '   ', improvements: 'x', rewrite: 'y' }).length);
});
test('C exige trois arguments avec critères valides, même si un choix est renseigné', () => {
  const draft = { choice: '1', borrow: 'La preuve de crédibilité.' };
  for (let i = 1; i <= 3; i++) { draft[`argument${i}`] = 'Le client participe au cadrage.'; draft[`criterion${i}`] = config.criteria[i - 1]; }
  assert.equal(validate('C', draft).length, 0);
  assert.ok(validate('C', { ...draft, criterion2: 'inventé' }).length);
  assert.ok(validate('C', { ...draft, argumentCount: 4 }).length);
  assert.ok(validate('C', { ...draft, choice: '3' }).length);
});
test('D associe une fonction à chacune des quatre à six lignes', () => {
  const draft = {};
  for (let i = 1; i <= 4; i++) { draft[`line${i}`] = 'Une phrase de mon ouverture.'; draft[`technique${i}`] = config.techniques[(i - 1) % config.techniques.length]; }
  assert.equal(validate('D', draft).length, 0);
  assert.ok(validate('D', { ...draft, lineCount: 5 }).length);
  draft.lineCount = 6;
  for (const i of [5, 6]) { draft[`line${i}`] = 'La suite de mon ouverture.'; draft[`technique${i}`] = 'Adaptation'; }
  assert.equal(validate('D', draft).length, 0);
});
test('E1 et E3 respectent les limites de caractères ; E3 signale une question ponctuée', () => {
  assert.equal(validate('E1', { response: 'Nous pouvons continuer à l’oral.' }).length, 0);
  assert.ok(validate('E1', { response: 'a'.repeat(301) }).length);
  assert.equal(validate('E3', { opening: 'Je vous propose de partir de vos priorités.' }).length, 0);
  assert.ok(validate('E3', { opening: 'Que souhaitez-vous ?' }).length);
  assert.ok(validate('E3', { opening: 'a'.repeat(281) }).length);
});
test('E2 : 90 mots acceptés, 91 refusés ; espaces et retours à la ligne ignorés', () => {
  assert.equal(rules.words('  Bonjour\n\nà  vous. '), 3);
  assert.equal(rules.words('   '), 0);
  assert.equal(validate('E2', { proposal: nWords(90) }).length, 0);
  assert.ok(validate('E2', { proposal: nWords(91) }).length);
});
test('F : bornes 80 et 120 mots incluses, objet et téléphone obligatoires', () => {
  const draft = { phone: 'Bonjour, je vous appelle à propos de votre projet.', subject: 'Votre projet' };
  for (const n of [80, 120]) assert.equal(validate('F', { ...draft, email: nWords(n) }).length, 0);
  for (const n of [0, 79, 121]) assert.ok(validate('F', { ...draft, email: nWords(n) }).length);
  assert.ok(validate('F', { ...draft, subject: '', email: nWords(80) }).length);
});
