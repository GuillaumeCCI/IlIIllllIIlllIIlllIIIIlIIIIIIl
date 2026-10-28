/* Parcours complets : remplir, valider, enchaîner les étapes et les séries.
 *
 * Complète screens.test.cjs, qui ne vérifie que le montage. Ici on joue
 * chacun des 18 exercices jusqu'au bout avec les réponses attendues, puis
 * on vérifie l'écran de relecture. On contrôle aussi les étapes
 * intermédiaires, la sauvegarde, l'accueil et le bilan.
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
const range = n => Array.from({ length: n }, (_, i) => i);
const S = (w, serie) => w[`ATELIER_${serie}`];

/* Les bonnes réponses, exercice par exercice. Les champs rédigés reçoivent
 * un texte quelconque : la qualité n'est pas notée automatiquement. */
const PERFECT = {
  's1-1-1': (e, w) => e.setValue('placed', S(w, 'S1')['1.1'].cards.map(c => c.answer)),
  's1-1-2': (e, w) => S(w, 'S1')['1.2'].roles.forEach((r, i) => e.setValue(`pick${i}`, r.answer)),
  's1-1-3': (e, w) => S(w, 'S1')['1.3'].cases.forEach((c, i) => { e.setValue(`nature${i}`, c.nature); e.setValue(`gesture${i}`, c.gesture); }),
  's1-1-4': e => { e.setValue('hypothesis', 'Le prix le retient.'); e.setValue('question', 'Qu’est-ce qui vous fait hésiter ?'); },
  's1-1-5': e => { e.setValue('pick', '2'); e.setValue('why', 'Il questionne avant de répondre.'); },
  's1-1-6': (e, w) => { range(6).forEach(i => e.setValue(`phrase${i}`, 'Je comprends.')); S(w, 'S1')['1.6'].checks.forEach((_, i) => e.setValue(`self${i}`, '2')); },
  's1-1-7': e => range(4).forEach(i => { e.setValue(`nature${i}`, 'fondee'); e.setValue(`question${i}`, 'Pourquoi ?'); e.setValue(`answer${i}`, 'Je comprends.'); e.setValue(`proof${i}`, 'Un essai.'); }),

  's2-2-1': (e, w) => S(w, 'S2')['2.1'].items.forEach((it, i) => e.setValue(`item${i}`, it.answer)),
  's2-2-2': (e, w) => e.setValue('links', S(w, 'S2')['2.2'].errors.map(err => err.answer)),
  's2-2-3': e => range(2).forEach(i => e.setValue(`reply${i}`, 'Bonjour, Paul Martin, d’Ergolys.')),
  's2-2-4': e => range(4).forEach(i => e.setValue(`spot${i}`, 'Aucune présentation.')),
  's2-2-5': e => { e.setValue('pick', '1'); e.setValue('why', 'Elle garde la main.'); },
  's2-2-6': (e, w) => { range(3).forEach(i => e.setValue(`script${i}`, 'Je comprends. Quand puis-je vous rappeler ?')); S(w, 'S2')['2.6'].voice.forEach((_, j) => e.setValue(`voice${j}`, '2')); },
  's2-2-7': (e, w) => range(3).forEach(c => S(w, 'S2')['2.7'].gestures.forEach(g => e.setValue(`${g.id}${c}`, 'Calme et souriant.'))),

  's3-1-1': (e, w) => {
    const cards = S(w, 'S3')['1.1'].cards;
    e.setValue('slots', range(6).map(step => cards.find(c => c.step === step).id));
  },
  's3-1-2': e => { range(4).forEach(r => { e.setValue(`error${r}`, 'Il contredit.'); e.setValue(`flag${r}`, r); }); e.setValue('rewrite', 'Je comprends, par rapport à quoi ?'); },
  's3-2-1': (e, w) => e.setValue('placed', S(w, 'S3')['2.1'].reactions.map(r => r.answer)),
  's3-2-2': (e, w) => { range(3).forEach(i => { e.setValue(`why${i}`, 'Il insiste.'); e.setValue(`reply${i}`, 'Je comprends, quand puis-je rappeler ?'); }); S(w, 'S3')['2.2'].selfChecks.forEach((_, i) => e.setValue(`self${i}`, '2')); }
};

console.log('\nParcours complets, avec les réponses attendues');

test('les 18 exercices ont un parcours de test', () => {
  const missing = catalog.all.filter(exercise => !PERFECT[exercise.file]).map(exercise => exercise.file);
  assert.strictEqual(missing.join(', '), '');
});

for (const [file, fill] of Object.entries(PERFECT)) {
  test(`${file} : se termine, puis affiche un corrigé sans erreur`, () => {
    const sandbox = load(`js/screens/${file}.js`);
    assert.ok(complete(sandbox, fill), 'l’exercice devrait être marqué terminé');
    const html = main(sandbox);
    assert.ok(!/undefined|NaN|\[object Object\]/.test(html), 'la relecture contient une valeur manquante');
    assert.ok(!/mark-ko/.test(html), 'des réponses attendues sont marquées fausses : corrigé incohérent');
    assert.match(feedback(sandbox), /Continuer|bilan/, 'la suite du parcours doit être proposée');
    assert.doesNotMatch(feedback(sandbox), /Corrigé modèle issu/, 'le corrigé ne porte plus d’avertissement');
  });
}

console.log('\nÉtapes intermédiaires');

test('S1 1.2 : sans les six associations, rien n’est validé', () => {
  const sandbox = load('js/screens/s1-1-2.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('pick0', 'reformuler');
  engine.setValue('pick1', 'traiter');
  engine.submit();
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.2'), 'six associations sont nécessaires');
});

test('S1 1.3 : un cas sans geste n’est pas compté', () => {
  const sandbox = load('js/screens/s1-1-3.js');
  const engine = sandbox.window.AtelierExercise;
  const cases = sandbox.window.ATELIER_S1['1.3'].cases;
  engine.setValue('briefed', true);
  cases.forEach((c, i) => engine.setValue(`nature${i}`, c.nature));
  cases.slice(0, 3).forEach((c, i) => engine.setValue(`gesture${i}`, c.gesture));
  engine.submit();
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.3'), 'le quatrième cas manque son geste');
});

test('S1 1.6 : une phrase validée ouvre l’étape suivante, l’auto-évaluation vient après la sixième', () => {
  const sandbox = load('js/screens/s1-1-6.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.submit();
  assert.strictEqual(Number(engine.value('step')) || 1, 1, 'sans phrase, on reste à l’étape 1');
  engine.setValue('phrase0', 'Je comprends.');
  engine.submit();
  assert.strictEqual(engine.value('step'), 2, 'l’étape 2 doit suivre');
  range(6).forEach(i => engine.setValue(`phrase${i}`, 'Une phrase.'));
  engine.setValue('step', 6);
  engine.submit();
  assert.strictEqual(engine.value('step'), 7, 'l’auto-évaluation s’ouvre après la sixième phrase');
  engine.submit();
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.6'), 'sans auto-évaluation, rien n’est validé');
});

test('S1 1.7 : enregistrer une fiche passe à la suivante sans clore l’exercice', () => {
  const sandbox = load('js/screens/s1-1-7.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  ['nature0', 'question0', 'answer0', 'proof0'].forEach(field => engine.setValue(field, field === 'nature0' ? 'fondee' : 'Texte.'));
  engine.submit();
  assert.strictEqual(engine.value('fiche'), 1, 'la fiche 2 doit suivre');
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.7'));
});

test('S1 1.4 : une question sans point d’interrogation est refusée', () => {
  const sandbox = load('js/screens/s1-1-4.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('hypothesis', 'Le prix.');
  engine.setValue('question', 'Dites-moi ce qui vous retient.');
  engine.submit();
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.4'));
});

test('S2 2.3 : écouter, puis deux tours de parole avant le retour', () => {
  const sandbox = load('js/screens/s2-2-3.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2, 'l’écoute ouvre la réponse');
  engine.setValue('reply0', 'Bonjour, Paul Martin.');
  engine.submit();
  assert.strictEqual(engine.value('turn'), 1, 'le second tour doit suivre');
  assert.ok(!sandbox.window.AtelierCore.isDone('s2-2.3'));
});

test('S2 2.6 : une seule phrase ne suffit pas pour un script', () => {
  const sandbox = load('js/screens/s2-2-6.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('script0', 'Je comprends.');
  engine.submit();
  assert.ok(!engine.value('at'), 'on reste sur le premier script');
  engine.setValue('script0', 'Je comprends. Quand puis-je vous rappeler ?');
  engine.submit();
  assert.strictEqual(engine.value('at'), 1, 'le script 2 doit suivre');
});

test('S2 2.7 : chaque geste mène au suivant, puis à la carte suivante', () => {
  const sandbox = load('js/screens/s2-2-7.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('posture0', 'Calme.');
  engine.submit();
  assert.strictEqual(engine.value('g0'), 1, 'la réponse suit la posture');
  engine.setValue('reponse0', 'Je comprends.');
  engine.submit();
  engine.setValue('rebond0', 'Jeudi ou vendredi ?');
  engine.submit();
  assert.strictEqual(engine.value('card'), 1, 'la carte 2 suit la carte 1');
});

test('S3 1.2 : le diagnostic complet ouvre la réécriture', () => {
  const sandbox = load('js/screens/s3-1-2.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  range(3).forEach(r => engine.setValue(`error${r}`, 'Erreur.'));
  engine.submit();
  assert.strictEqual(Number(engine.value('stage')) || 1, 1, 'trois erreurs ne suffisent pas');
  engine.setValue('error3', 'Erreur.');
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2);
  assert.ok(!sandbox.window.AtelierCore.isDone('s3-1.2'), 'la réécriture reste à faire');
});

test('S1 1.1 et S3 2.1 : annuler rend la dernière carte classée', () => {
  for (const file of ['s1-1-1', 's3-2-1']) {
    const sandbox = load(`js/screens/${file}.js`);
    const kit = sandbox.window.AtelierKit;
    sandbox.window.AtelierExercise.setValue('briefed', true);
    kit.deckPlace(6, 'x');
    kit.deckPlace(6, 'y');
    assert.strictEqual(kit.deckPlaced(6).filter(Boolean).length, 2);
    kit.deckUndo(6);
    assert.strictEqual(kit.deckPlaced(6).filter(Boolean).length, 1, `${file} : une carte doit être rendue`);
    assert.strictEqual(kit.deckCurrent(6), 1, `${file} : la carte rendue redevient la carte présentée`);
  }
});

test('une réponse fausse est bien marquée fausse dans le corrigé', () => {
  const sandbox = load('js/screens/s2-2-1.js');
  const items = sandbox.window.ATELIER_S2['2.1'].items;
  complete(sandbox, engine => items.forEach((it, i) => engine.setValue(`item${i}`, it.answer === 'O' ? 'B' : 'O')));
  assert.match(main(sandbox), /arv-cell is-yours is-ko/, 'les erreurs doivent apparaître');
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s2-2-3.js');
  first.window.AtelierExercise.setValue('reply0', 'Bonjour, Paul Martin.');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');
  const second = load('js/screens/s2-2-3.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(second.window.AtelierExercise.value('reply0'), 'Bonjour, Paul Martin.');
});

test('les placements survivent aussi', () => {
  const first = load('js/screens/s3-1-1.js');
  first.window.AtelierExercise.setValue('slots', ['c', null, 'f', null, null, null]);
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  const second = load('js/screens/s3-1-1.js', { storage: { [catalog.storageKey]: saved } });
  assert.deepStrictEqual(Array.from(second.window.AtelierExercise.value('slots')), ['c', null, 'f', null, null, null]);
});

test('la sauvegarde du module 1-1-3 ne touche pas celles de 1-1-1 et 1-1-2', () => {
  assert.ok(!['atelier-vente-1-1-1-v2', 'atelier-vente-1-1-2-v1'].includes(catalog.storageKey));
});

test('une progression est visible depuis une autre page', () => {
  const first = load('js/screens/s2-2-1.js');
  assert.ok(complete(first, PERFECT['s2-2-1']));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const other = load('js/screens/s3-2-2.js', { storage: { [catalog.storageKey]: saved } });
  assert.ok(other.window.AtelierCore.isDone('s2-2.1'), 'la progression est partagée entre les pages');
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

test('l’accueil liste les trois séries et tous leurs exercices', () => {
  const html = main(loadHome(''));
  assert.ok(!/undefined|NaN|\[object Object\]/.test(html));
  for (const serie of catalog.series) assert.ok(html.includes(escape(serie.label)), `la série ${serie.label} doit apparaître`);
  const links = html.match(/href="exercices\/[^"]+"/g) || [];
  assert.ok(links.length >= catalog.all.length, `au moins ${catalog.all.length} liens attendus, ${links.length} trouvés`);
  assert.match(html, /1-1-3/, 'l’accueil doit annoncer le module 1-1-3');
});

test('le bilan liste les 18 exercices avec leur état', () => {
  const html = main(loadHome('#bilan'));
  assert.match(html, /À commencer/);
  for (const exercise of catalog.all) assert.ok(html.includes(escape(exercise.label)), `${exercise.label} doit figurer au bilan`);
});

test('l’accueil reflète la progression enregistrée', () => {
  const first = load('js/screens/s3-2-1.js');
  complete(first, PERFECT['s3-2-1']);
  const saved = first.localStorage.getItem(catalog.storageKey);
  const html = main(loadHome('', { [catalog.storageKey]: saved }));
  assert.match(html, /state done/);
  assert.match(html, /Reprendre où je me suis arrêté/);
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
