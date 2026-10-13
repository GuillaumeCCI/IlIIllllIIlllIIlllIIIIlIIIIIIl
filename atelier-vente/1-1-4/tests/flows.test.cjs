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
  form: (e, c) => c.cases.forEach((kase, i) => (kase.fields || c.fields || []).forEach(f => {
    const answer = (kase.answers || {})[f.id] ?? f.answer;
    const key = `c${i}_${f.id}`;
    if (f.type === 'choice') e.setValue(key, [].concat(answer || f.options[0].id)[0]);
    else if (f.type === 'chips') e.setValue(key, f.options.slice(0, f.min || 1).map(o => o.id));
    else if (f.type === 'select') e.setValue(key, f.options[0].id);
    else e.setValue(key, 'Une réponse.');
  }))
};
const CUSTOM = {
  's1-1-2': (e, c) => c.passages.forEach((p, i) => e.setValue(`mark${i}`, p.part)),
  's2-2-4': e => [0, 1, 2, 3].forEach(r => { e.setValue(`error${r}`, 'Il contredit.'); e.setValue(`flag${r}`, r); })
};

function perfect(exercise) {
  return (engine, w) => {
    const c = contentOf(w, exercise);
    if (exercise.mount) return FILL[exercise.mount](engine, c);
    return CUSTOM[exercise.file](engine, c);
  };
}

console.log('\nParcours complets, avec les réponses attendues');

test('les 34 exercices ont un parcours de test', () => {
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

test('cartes : annuler rend la dernière carte classée', () => {
  const sandbox = start('s1-1-1');
  const kit = sandbox.window.AtelierKit;
  kit.deckPlace(6, 'V');
  kit.deckPlace(6, 'F');
  kit.deckUndo(6);
  assert.strictEqual(kit.deckPlaced(6).filter(Boolean).length, 1, 'une carte doit être rendue');
  assert.strictEqual(kit.deckCurrent(6), 1, 'la carte rendue redevient la carte présentée');
});

test('cartes : tant qu’il reste une carte, rien n’est validé', () => {
  const sandbox = start('s4-4-1');
  sandbox.window.AtelierExercise.setValue('placed', ['F', 'V', 'F', 'V', 'V', null]);
  sandbox.window.AtelierExercise.submit();
  assert.ok(!isDone(sandbox, 's4-4.1'));
});

test('associations : tant qu’une réplique reste sans levier, rien n’est validé', () => {
  const sandbox = start('s2-2-2');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('link0', 0);
  engine.submit();
  assert.ok(!isDone(sandbox, 's2-2.2'), 'quatre répliques restent sans levier');
});

test('associations : l’e-mail se lit avant de placer les extraits', () => {
  const sandbox = start('s4-4-2');
  const engine = sandbox.window.AtelierExercise;
  assert.match(main(sandbox), /sc-email/, 'l’e-mail doit s’afficher d’abord');
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2, 'la lecture ouvre les associations');
  assert.ok(!isDone(sandbox, 's4-4.2'));
});

test('comparaison : moins de deux critères ne suffisent pas', () => {
  const sandbox = start('s1-1-5');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('pick', '2');
  engine.setValue('why', 'Plus clair.');
  engine.setValue('criteria', ['posture']);
  engine.submit();
  assert.ok(!isDone(sandbox, 's1-1.5'));
});

test('comparaison : les deux critères rédigés sont obligatoires', () => {
  const sandbox = start('s2-2-5');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('pick', '2');
  engine.setValue('crit0', 'Périmètre.');
  engine.submit();
  assert.ok(!isDone(sandbox, 's2-2.5'));
});

test('cas : une carte remplie mène à la suivante sans clore l’exercice', () => {
  const sandbox = start('s1-1-7');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('c0_text', 'Ce siège soulage le dos. Il est à 690 €.');
  engine.submit();
  assert.strictEqual(engine.value('case'), 1, 'la carte 2 doit suivre');
  assert.ok(!isDone(sandbox, 's1-1.7'));
});

test('cas : les étapes successives ne se sautent pas', () => {
  const sandbox = start('s3-3-4');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('case', 2);
  engine.render();
  assert.match(main(sandbox), /Quel indice/, 'l’étape 3 reste fermée tant que la 1 est vide');
  engine.setValue('c0_text', 'Elle demande un délai.');
  engine.submit();
  assert.strictEqual(engine.value('case'), 1, 'l’étape 2 suit l’étape 1');
});

test('cas : un e-mail à lire ouvre l’analyse', () => {
  const sandbox = start('s4-4-4');
  const engine = sandbox.window.AtelierExercise;
  engine.submit();
  assert.strictEqual(engine.value('c0_read'), true, 'la lecture est enregistrée');
  assert.strictEqual(engine.value('case'), 1, 'l’analyse suit la lecture');
  assert.ok(!isDone(sandbox, 's4-4.4'));
});

test('cas : un choix de technique est exigé', () => {
  const sandbox = start('s3-3-3');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('c0_text', 'On lance la commande ?');
  engine.submit();
  assert.ok(!engine.value('case'), 'sans technique, la situation 1 n’est pas validée');
});

test('une réponse fausse est bien marquée fausse dans le corrigé', () => {
  const sandbox = load('js/screens/s3-3-3.js');
  const content = sandbox.window.ATELIER_S3['3.3'];
  complete(sandbox, engine => content.cases.forEach((_, i) => { engine.setValue(`c${i}_technique`, 'detail'); engine.setValue(`c${i}_text`, 'Texte.'); }));
  assert.match(main(sandbox), /mark-ko/, 'les erreurs doivent apparaître');
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s1-1-4.js');
  first.window.AtelierExercise.setValue('c0_replay', 'Combien de postes ?');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');
  const second = load('js/screens/s1-1-4.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(second.window.AtelierExercise.value('c0_replay'), 'Combien de postes ?');
});

test('la sauvegarde du module 1-1-4 ne touche pas celles des autres modules', () => {
  assert.ok(!['atelier-vente-1-1-1-v2', 'atelier-vente-1-1-2-v1', 'atelier-vente-1-1-3-v1'].includes(catalog.storageKey));
});

test('une progression est visible depuis une autre page', () => {
  const first = load('js/screens/s5-1-1.js');
  const exercise = catalog.all.find(e => e.file === 's5-1-1');
  assert.ok(complete(first, perfect(exercise)));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const other = load('js/screens/s4-4-7.js', { storage: { [catalog.storageKey]: saved } });
  assert.ok(other.window.AtelierCore.isDone('s5-1.1'), 'la progression est partagée entre les pages');
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

test('l’accueil liste les cinq séries et tous leurs exercices', () => {
  const html = main(loadHome(''));
  assert.ok(!/undefined|NaN|\[object Object\]/.test(html));
  for (const serie of catalog.series) assert.ok(html.includes(escape(serie.label)), `la série ${serie.label} doit apparaître`);
  const links = html.match(/href="exercices\/[^"]+"/g) || [];
  assert.ok(links.length >= catalog.all.length, `au moins ${catalog.all.length} liens attendus, ${links.length} trouvés`);
  assert.match(html, /1-1-4/, 'l’accueil doit annoncer le module 1-1-4');
});

test('le bilan liste les 34 exercices avec leur état', () => {
  const html = main(loadHome('#bilan'));
  assert.match(html, /À commencer/);
  for (const exercise of catalog.all) assert.ok(html.includes(escape(exercise.label)), `${exercise.label} doit figurer au bilan`);
});

test('l’accueil reflète la progression enregistrée', () => {
  const first = load('js/screens/s3-3-2.js');
  complete(first, perfect(catalog.all.find(e => e.file === 's3-3-2')));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const html = main(loadHome('', { [catalog.storageKey]: saved }));
  assert.match(html, /state done/);
  assert.match(html, /Reprendre où je me suis arrêté/);
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
