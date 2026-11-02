/* Parcours complets : remplir, valider, enchaîner les étapes et les séries.
 *
 * Complète screens.test.cjs, qui ne vérifie que le montage. Ici on joue
 * chacun des 34 exercices jusqu'au bout avec les réponses attendues, puis
 * on vérifie l'écran de relecture. On contrôle aussi les étapes
 * intermédiaires de chaque mécanique, la sauvegarde, l'accueil et le bilan.
 */
const assert = require('node:assert');
const vm = require('node:vm');
const { load, makeSandbox, read, catalog } = require('./harness.cjs');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

/* Remplit, puis valide autant de fois que l'exercice a d'étapes. */
function complete(sandbox, fill) {
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  engine.setValue('briefed', true);
  fill(engine, sandbox.window);
  for (let guard = 0; guard < 30 && !core.isDone(engine.current.key); guard++) engine.submit();
  return core.isDone(engine.current.key);
}

const main = sandbox => sandbox.document.querySelector('#main').innerHTML;
const feedback = sandbox => sandbox.document.querySelector('#feedback').innerHTML;
const contentOf = (w, exercise) => w[`ATELIER_${exercise.series.toUpperCase()}`][exercise.id];

/* Les bonnes réponses, déduites du contenu selon la mécanique. Les champs
 * rédigés reçoivent un texte quelconque : leur qualité n'est pas notée. */
const FILL = {
  deck: (e, c) => e.setValue('placed', c.cards.map(card => card.answer)),
  match: (e, c) => c.cards.forEach((card, i) => e.setValue(`link${i}`, card.answer)),
  compare: (e, c) => {
    e.setValue('pick', [].concat(c.answer)[0]);
    e.setValue('why', 'Elle garde la main.');
    if (c.criteria) e.setValue('criteria', c.criteria.slice(0, 2).map(x => x.id));
    for (let i = 0; i < (c.criteriaFields || 0); i++) e.setValue(`crit${i}`, 'Un critère.');
  },
  form: (e, c) => {
    c.cases.forEach((kase, i) => (kase.fields || c.fields || []).forEach(f => {
      const answer = (kase.answers || {})[f.id] ?? f.answer;
      const key = `c${i}_${f.id}`;
      if (f.type === 'choice') e.setValue(key, [].concat(answer || f.options[0].id)[0]);
      else if (f.type === 'chips') e.setValue(key, f.answer ? [].concat(f.answer) : f.options.slice(0, f.min || 1).map(o => o.id));
      else if (f.type === 'select') e.setValue(key, f.options[0].id);
      else e.setValue(key, 'Une réponse.');
    }));
    // L'auto-évaluation qui précède le corrigé.
    if (c.selfCheck) c.selfCheck.rows.forEach((_, i) => e.setValue(`self${i}`, '2'));
  }
};
// Les écrans propres au module (sans mécanique commune) et leurs bonnes réponses.
const CUSTOM = {};

function perfect(exercise) {
  return (engine, w) => {
    const c = contentOf(w, exercise);
    if (exercise.mount) return FILL[exercise.mount](engine, c);
    return CUSTOM[exercise.file](engine, c);
  };
}

console.log('\nParcours complets, avec les réponses attendues');

test('chaque exercice a un parcours de test', () => {
  const missing = catalog.all.filter(exercise => !exercise.mount && !CUSTOM[exercise.file]).map(exercise => exercise.file);
  assert.strictEqual(missing.join(', '), '');
});

for (const exercise of catalog.all) {
  test(`${exercise.file} : se termine, puis affiche un corrigé sans erreur`, () => {
    const sandbox = load(`js/screens/${exercise.file}.js`);
    assert.ok(complete(sandbox, perfect(exercise)), 'l’exercice devrait être marqué terminé');
    const html = main(sandbox);
    assert.ok(!/undefined|NaN|\[object Object\]/.test(html), 'la relecture contient une valeur manquante');
    assert.ok(!/mark-ko/.test(html), 'des réponses attendues sont marquées fausses : corrigé incohérent');
    assert.match(feedback(sandbox), /Continuer|bilan/, 'la suite du parcours doit être proposée');
    assert.doesNotMatch(feedback(sandbox), /Corrigé modèle issu/, 'le corrigé ne porte plus d’avertissement');
  });
}

console.log('\nÉtapes intermédiaires');

const start = file => {
  const sandbox = load(`js/screens/${file}.js`);
  sandbox.window.AtelierExercise.setValue('briefed', true);
  sandbox.window.AtelierExercise.render();
  return sandbox;
};
const isDone = (sandbox, key) => sandbox.window.AtelierCore.isDone(key);

/* Une décision fausse apparaît bien fausse : l'effet « Il a envie d'en dire
 * plus » donné à toutes les réponses de la situation 1. */
test('une réponse fausse est bien marquée fausse dans le corrigé', () => {
  const sandbox = load('js/screens/s2-2-1.js');
  const content = sandbox.window.ATELIER_S2['2.1'];
  complete(sandbox, engine => content.cases.forEach((_, i) => { engine.setValue(`c${i}_attitude`, 'comprehension'); engine.setValue(`c${i}_effet`, 'ouvre'); }));
  assert.match(main(sandbox), /mark-ko|k-pick-tile is-ko/, 'les erreurs doivent apparaître');
});

test('deux décisions par réponse : le corrigé les présente en lignes', () => {
  const sandbox = load('js/screens/s2-2-1.js');
  complete(sandbox, perfect(catalog.all.find(e => e.file === 's2-2-1')));
  assert.match(main(sandbox), /k-pick-pair/);
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s2-2-1.js');
  first.window.AtelierExercise.setValue('c0_attitude', 'enquete');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');
  const second = load('js/screens/s2-2-1.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(second.window.AtelierExercise.value('c0_attitude'), 'enquete');
});

test('la sauvegarde du module 1-2-1 ne touche pas celles des autres modules', () => {
  assert.ok(!['atelier-vente-1-1-1-v2', 'atelier-vente-1-1-2-v1', 'atelier-vente-1-1-3-v1', 'atelier-vente-1-1-4-v1'].includes(catalog.storageKey));
});

test('une progression est visible depuis une autre page', () => {
  const exercise = catalog.all[0];
  const first = load(`js/screens/${exercise.file}.js`);
  assert.ok(complete(first, perfect(exercise)));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const other = load(`js/screens/${catalog.all[catalog.all.length - 1].file}.js`, { storage: { [catalog.storageKey]: saved } });
  assert.ok(other.window.AtelierCore.isDone(exercise.key), 'la progression est partagée entre les pages');
  assert.strictEqual(other.window.AtelierCore.completedCount(), 1);
});

console.log('\nAccueil et bilan');

function loadHome(hash, storage) {
  const sandbox = makeSandbox(storage ? { storage } : {});
  sandbox.location = { pathname: '/index.html', hash };
  sandbox.document.documentElement.dataset.depth = '0';
  for (const file of ['js/icons.js', 'js/catalog.js', 'js/core.js', 'js/home.js']) {
    vm.runInContext(read(file), sandbox, { filename: file });
  }
  return sandbox;
}

const escape = text => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

test('l’accueil liste les séries et tous leurs exercices', () => {
  const html = main(loadHome(''));
  assert.ok(!/undefined|NaN|\[object Object\]/.test(html));
  for (const serie of catalog.series) assert.ok(html.includes(escape(serie.label)), `la série ${serie.label} doit apparaître`);
  const links = html.match(/href="exercices\/[^"]+"/g) || [];
  assert.ok(links.length >= catalog.all.length, `au moins ${catalog.all.length} liens attendus, ${links.length} trouvés`);
  assert.match(html, /1-2-1/, 'l’accueil doit annoncer le module 1-2-1');
});

test('le bilan liste tous les exercices avec leur état', () => {
  const html = main(loadHome('#bilan'));
  assert.match(html, /À commencer/);
  for (const exercise of catalog.all) assert.ok(html.includes(escape(exercise.label)), `${exercise.label} doit figurer au bilan`);
});

test('l’accueil reflète la progression enregistrée', () => {
  const first = load(`js/screens/${catalog.all[0].file}.js`);
  complete(first, perfect(catalog.all[0]));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const html = main(loadHome('', { [catalog.storageKey]: saved }));
  assert.match(html, /state done/);
  assert.match(html, /Reprendre où je me suis arrêté/);
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
