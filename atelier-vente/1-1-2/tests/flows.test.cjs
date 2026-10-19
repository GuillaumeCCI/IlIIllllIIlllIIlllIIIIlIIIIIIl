/* Parcours complets : remplir, valider, enchaîner les étapes et les séries.
 *
 * Complète screens.test.cjs, qui ne vérifie que le montage. Ici on joue
 * chacun des 24 exercices jusqu'au bout avec les réponses attendues, puis
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
  's1-1-1': (e, w) => S(w, 'S1')['1.1'].series.forEach((s, i) => { e.setValue(`intruder${i}`, s.intruder); e.setValue(`category${i}`, s.category); }),
  's1-1-2': (e, w) => S(w, 'S1')['1.2'].arguments.forEach((segments, a) => e.setValue(`marks${a}`,
    segments.flatMap(segment => segment.text.split(/\s+/).filter(Boolean).map(() => segment.part)))),
  's1-1-3': (e, w) => {
    const content = S(w, 'S1')['1.3'];
    content.needs.forEach((_, n) => {
      e.setValue(`c${n}`, content.cards.filter(c => c.kind === 'C' && c.needs.includes(n)).map(c => c.id));
      e.setValue(`a${n}`, 'Vous êtes tranquille.');
      e.setValue(`p${n}`, content.cards.filter(c => c.kind === 'P' && c.needs.includes(n)).map(c => c.id));
    });
  },
  's1-1-4': (e, w) => S(w, 'S1')['1.4'].clients.forEach((c, i) => {
    e.setValue(`motive${i}`, c.motive); e.setValue(`args${i}`, c.answers); e.setValue(`why${i}`, 'Parce que le client le dit.');
    e.setValue(`clues${i}`, c.quote.map(([, clue]) => Boolean(clue)));
  }),
  's1-1-5': (e, w) => { const x = S(w, 'S1')['1.5'].expected; e.setValue('semi1', x.semi1); e.setValue('semi2', x.semi2); e.setValue('final', x.final); e.setValue('why', 'Il a été piraté.'); },
  's1-1-6': e => { e.setValue('worst', 'SaaS multi-tenant.'); range(3).forEach(i => e.setValue(`error${i}`, 'Jargon.')); e.setValue('fixed', 'Vos données sont protégées.'); },

  's2-2-1': (e, w) => e.setValue('placed', S(w, 'S2')['2.1'].cards.map(c => c.answer)),
  's2-2-2': (e, w) => e.setValue('ranks', S(w, 'S2')['2.2'].cards.map(c => c.rank)),
  's2-2-3': e => range(3).forEach(i => e.setValue(`hook${i}`, 'Combien de temps perdez-vous ?')),
  's2-2-4': (e, w) => S(w, 'S2')['2.4'].rows.forEach((r, i) => e.setValue(`row${i}`, r.answer)),
  's2-2-5': (e, w) => { S(w, 'S2')['2.5'].criteria.forEach((c, i) => e.setValue(`note${i}`, String(c.reference))); e.setValue('priority', 'Parler bénéfices.'); },
  's2-2-6': (e, w) => { e.setValue('pitch', 'Vos données sont protégées.'); S(w, 'S2')['2.6'].criteria.forEach((_, i) => e.setValue(`score${i}`, '2')); },

  's3-3-1': (e, w) => S(w, 'S3')['3.1'].series.forEach((s, i) => { e.setValue(`wrong${i}`, String(s.wrong)); e.setValue(`why${i}`, 'Le client décroche.'); }),
  's3-3-2': (e, w) => e.setValue('match', S(w, 'S3')['3.2'].reactions.map(r => r.answer)),
  's3-3-3': (e, w) => S(w, 'S3')['3.3'].needs.forEach((n, i) => e.setValue(`pick${i}`, String(n.answer))),
  's3-3-4': (e, w) => S(w, 'S3')['3.4'].rows.forEach((r, i) => e.setValue(`row${i}`, r.answer)),
  's3-3-5': (e, w) => S(w, 'S3')['3.5'].lines.forEach((l, i) => { e.setValue(`act${i}`, l.answer); e.setValue(`q${i}`, 'Qu’en pensez-vous ?'); }),
  's3-3-6': e => range(5).forEach(i => e.setValue(`t${i}`, 'Une réponse.')),

  's4-1-1': (e, w) => S(w, 'S4')['1.1'].items.forEach((it, i) => e.setValue(`item${i}`, it.answer)),
  's4-1-2': e => range(2).forEach(i => { e.setValue(`adv${i}`, 'Vous gagnez du temps.'); e.setValue(`proof${i}`, '98 %.'); }),
  's4-2-1': (e, w) => S(w, 'S4')['2.1'].items.forEach((it, i) => e.setValue(`item${i}`, it.answer)),
  's4-2-2': e => range(2).forEach(i => e.setValue(`client${i}`, 'gagnez du temps.')),
  's4-3-1': (e, w) => e.setValue('placed', S(w, 'S4')['3.1'].cards.map(c => c.answer)),
  's4-3-2': e => range(3).forEach(i => e.setValue(`error${i}`, 'Besoin ignoré.'))
};

console.log('\nParcours complets, avec les réponses attendues');

test('les 24 exercices ont un parcours de test', () => {
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

test('S1 1.1 : une série validée passe à la suivante sans clore l’exercice', () => {
  const sandbox = load('js/screens/s1-1-1.js');
  const engine = sandbox.window.AtelierExercise;
  const s = sandbox.window.ATELIER_S1['1.1'].series[0];
  engine.setValue('briefed', true);
  engine.setValue('intruder0', s.intruder);
  engine.submit();
  assert.strictEqual(engine.value('stage0'), 2, 'l’intrus écarté ouvre le classement du trio');
  engine.setValue('category0', s.category);
  engine.submit();
  assert.strictEqual(engine.value('serie'), 1, 'la série B doit suivre');
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.1'), 'l’exercice ne doit pas être terminé après une série');
});

test('S1 1.4 : une seule carte d’argument ne suffit pas', () => {
  const sandbox = load('js/screens/s1-1-4.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('clues0', [true, true]);
  engine.setValue('motive0', 'S');
  engine.submit();
  engine.setValue('args0', [0]);
  engine.submit();
  assert.strictEqual(engine.value('stage0'), 2, 'il faut exactement deux arguments pour avancer');
});

test('S1 1.4 : sans indices repérés, la motivation reste verrouillée', () => {
  const sandbox = load('js/screens/s1-1-4.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.render();
  assert.match(sandbox.document.querySelector('#main').innerHTML, /soncas-step2 is-locked/, 'les motivations doivent être verrouillées');
  engine.setValue('motive0', 'S');
  engine.submit();
  assert.notStrictEqual(engine.value('stage0'), 2, 'sans indice, on ne passe pas aux arguments');
  engine.setValue('clues0', [true, true]);
  engine.submit();
  assert.strictEqual(engine.value('stage0'), 2, 'deux indices repérés ouvrent la suite');
});

test('S1 1.5 : sans justification, le tournoi n’est pas validé', () => {
  const sandbox = load('js/screens/s1-1-5.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('semi1', 'A'); engine.setValue('semi2', 'C'); engine.setValue('final', 'A');
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2, 'la finale jouée ouvre la justification');
  engine.submit();
  assert.ok(!sandbox.window.AtelierCore.isDone('s1-1.5'), 'sans justification, rien n’est validé');
});

test('S2 2.1 et S4 3.1 : annuler rend la dernière carte classée', () => {
  for (const file of ['s2-2-1', 's4-3-1']) {
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

test('S2 2.6 : un texte bien trop long pour 60 secondes est refusé', () => {
  const sandbox = load('js/screens/s2-2-6.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('pitch', Array.from({ length: 260 }, () => 'mot').join(' '));
  engine.submit();
  assert.strictEqual(Number(engine.value('stage')) || 1, 1, 'on ne doit pas passer à l’enregistrement');
});

test('S3 3.5 : « pousse son argumentation » exige la question de contrôle', () => {
  const sandbox = load('js/screens/s3-3-5.js');
  const engine = sandbox.window.AtelierExercise;
  engine.setValue('briefed', true);
  engine.setValue('act0', 'push');
  engine.submit();
  assert.ok(!engine.value('done0'), 'sans question, la réplique n’est pas validée');
  engine.setValue('act0', 'check');
  engine.submit();
  assert.strictEqual(engine.value('done0'), true, '« vérifie l’impact » se valide sans question');
});

test('une réponse fausse est bien marquée fausse dans le corrigé', () => {
  const sandbox = load('js/screens/s2-2-4.js');
  const rows = sandbox.window.ATELIER_S2['2.4'].rows;
  complete(sandbox, engine => rows.forEach((r, i) => engine.setValue(`row${i}`, r.answer === 'gap' ? 'proof' : 'gap')));
  assert.match(main(sandbox), /is-wrong|arv-item is-ko/, 'les erreurs doivent apparaître');
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s2-2-3.js');
  first.window.AtelierExercise.setValue('hook0', 'Combien d’heures perdez-vous ?');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');
  const second = load('js/screens/s2-2-3.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(second.window.AtelierExercise.value('hook0'), 'Combien d’heures perdez-vous ?');
});

test('les surlignages et placements survivent aussi', () => {
  const first = load('js/screens/s1-1-2.js');
  first.window.AtelierExercise.setValue('marks0', ['C', null, 'A', 'P']);
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  const second = load('js/screens/s1-1-2.js', { storage: { [catalog.storageKey]: saved } });
  assert.deepStrictEqual(Array.from(second.window.AtelierExercise.value('marks0')), ['C', null, 'A', 'P']);
});

test('la sauvegarde du module 1-1-2 ne touche pas celle du 1-1-1', () => {
  assert.notStrictEqual(catalog.storageKey, 'atelier-vente-1-1-1-v2');
});

test('une progression est visible depuis une autre page', () => {
  const first = load('js/screens/s4-1-1.js');
  assert.ok(complete(first, PERFECT['s4-1-1']));
  const saved = first.localStorage.getItem(catalog.storageKey);
  const other = load('js/screens/s3-3-1.js', { storage: { [catalog.storageKey]: saved } });
  assert.ok(other.window.AtelierCore.isDone('s4-1.1'), 'la progression est partagée entre les pages');
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

test('l’accueil liste les quatre séries et tous leurs exercices', () => {
  const html = main(loadHome(''));
  assert.ok(!/undefined|NaN|\[object Object\]/.test(html));
  for (const serie of catalog.series) assert.ok(html.includes(escape(serie.label)), `la série ${serie.label} doit apparaître`);
  const links = html.match(/href="exercices\/[^"]+"/g) || [];
  assert.ok(links.length >= catalog.all.length, `au moins ${catalog.all.length} liens attendus, ${links.length} trouvés`);
  assert.match(html, /1-1-2/, 'l’accueil doit annoncer le module 1-1-2');
});

test('le bilan liste les 24 exercices avec leur état', () => {
  const html = main(loadHome('#bilan'));
  assert.match(html, /À commencer/);
  for (const exercise of catalog.all) assert.ok(html.includes(escape(exercise.label)), `${exercise.label} doit figurer au bilan`);
});

test('l’accueil reflète la progression enregistrée', () => {
  const first = load('js/screens/s4-2-1.js');
  complete(first, PERFECT['s4-2-1']);
  const saved = first.localStorage.getItem(catalog.storageKey);
  const html = main(loadHome('', { [catalog.storageKey]: saved }));
  assert.match(html, /state done/);
  assert.match(html, /Reprendre où je me suis arrêté/);
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
