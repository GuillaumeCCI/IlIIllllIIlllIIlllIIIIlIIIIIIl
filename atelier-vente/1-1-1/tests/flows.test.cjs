/* Parcours complets : remplir, valider, enchaîner les cas, placer des cartes.
 *
 * Complète screens.test.cjs, qui ne vérifie que le montage. Ici on joue les
 * exercices comme un apprenant : saisie, étapes successives, placements,
 * annulation, puis validation finale et corrigé.
 */
const assert = require('node:assert');
const path = require('node:path');
const vm = require('node:vm');
const { load, makeSandbox, read, catalog } = require('./harness.cjs');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

/* Remplit tous les champs attendus et valide. */
function complete(sandbox, fill) {
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  fill(engine);
  // Un exercice à étapes avance d'un cran par soumission : on insiste.
  for (let guard = 0; guard < 30 && !core.isDone(engine.current.key); guard++) engine.submit();
  return core.isDone(engine.current.key);
}

console.log('\nParcours — saisie et validation');

test('S1 A : une analyse complète est acceptée', () => {
  const sandbox = load('js/screens/s1-a.js');
  const done = complete(sandbox, engine => {
    engine.setValue('strengths', 'L’accueil est chaleureux et le ton engageant.');
    engine.setValue('improvements', 'Laisser la parole au client, raccourcir la présentation de l’offre.');
    engine.setValue('rewrite', 'Bonjour, je suis Camille. Qu’est-ce qui vous amène aujourd’hui ?');
    // La grille d’autoévaluation, remplie avant le corrigé.
    for (let i = 0; i < 6; i++) engine.setValue(`self${i}`, i % 2 ? 'partie' : 'oui');
  });
  assert.ok(done, 'l’exercice devrait être marqué terminé');
  const feedback = sandbox.document.querySelector('#feedback');
  assert.ok(!feedback.hidden, 'la piste de relecture devrait s’afficher');
  assert.match(feedback.innerHTML, /Continuer|bilan/, 'le feedback doit proposer la suite');
});

test('S1 E3 : une ouverture interrogative est refusée, une affirmative acceptée', () => {
  const refused = load('js/screens/s1-e3.js');
  complete(refused, engine => engine.setValue('opening', 'Que puis-je faire pour vous ?'));
  assert.ok(!refused.window.AtelierCore.isDone('s1-E3'), 'une question doit être refusée');

  const accepted = load('js/screens/s1-e3.js');
  const done = complete(accepted, engine => engine.setValue('opening', 'Je vous propose de partir de vos priorités.'));
  assert.ok(done, 'une phrase affirmative doit être acceptée');
});

test('S1 F : l’e-mail hors des bornes 80–120 mots est refusé', () => {
  const words = n => Array.from({ length: n }, () => 'bonjour').join(' ');
  const short = load('js/screens/s1-f.js');
  complete(short, engine => {
    engine.setValue('phone', 'Bonjour, je vous appelle au sujet de votre projet.');
    engine.setValue('subject', 'Votre projet');
    engine.setValue('email', words(40));
  });
  assert.ok(!short.window.AtelierCore.isDone('s1-F'), '40 mots doivent être refusés');

  const right = load('js/screens/s1-f.js');
  const done = complete(right, engine => {
    engine.setValue('phone', 'Bonjour, je vous appelle au sujet de votre projet.');
    engine.setValue('subject', 'Votre projet');
    engine.setValue('email', words(95));
  });
  assert.ok(done, '95 mots doivent être acceptés');
});

console.log('\nParcours — exercices à plusieurs cas');

/* Les exercices à cas multiples passent par un menu : on choisit un cas,
 * on le valide, on lit sa correction, puis on revient en choisir un autre.
 * L'ordre est libre, et l'exercice n'est terminé qu'une fois tout traité. */
test('S2 A : le menu des cas, puis un client à la fois', () => {
  const sandbox = load('js/screens/s2-a.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const main = () => sandbox.document.querySelector('#main').innerHTML;

  // La consigne précède tout.
  assert.match(main(), /mission-card/, 'la consigne doit s’afficher en premier');

  // Puis le menu, avec un bouton par client.
  engine.setValue('briefed', true);
  engine.render();
  assert.match(main(), /case-cards/, 'le menu des cas doit suivre la consigne');
  assert.strictEqual((main().match(/data-action="open-case"/g) || []).length, 3,
    'le menu doit proposer les trois clients');

  // On ouvre le deuxième client : l'ordre est libre.
  engine.setValue('openCase', 1);
  engine.render();
  assert.ok(!/case-cards/.test(main()), 'le cas doit remplacer le menu');
  assert.match(main(), /case-bar/, 'le fil de retour au menu doit être présent');

  // Validation de ce seul client : d'abord son autoévaluation, puis la correction.
  engine.setValue('choice1', 'b');
  engine.setValue('why1', 'Elle accueille la réserve puis questionne.');
  engine.submit();
  assert.notStrictEqual(engine.value('done1'), true, 'l’autoévaluation doit précéder la correction');
  assert.match(main(), /self-list/, 'la grille d’autoévaluation doit s’afficher');
  engine.submit();
  assert.notStrictEqual(engine.value('done1'), true, 'la grille vide doit être refusée');
  for (let k = 0; k < 6; k++) engine.setValue(`self1_${k}`, 'oui');
  engine.submit();
  assert.strictEqual(engine.value('done1'), true, 'le client traité doit être marqué');
  assert.ok(!core.isDone('s2-A'), 'un client sur trois ne termine pas l’exercice');

  // Sa correction s'affiche aussitôt, au contact des réponses.
  assert.match(main(), /option-review/, 'les options doivent passer en relecture');
  assert.match(main(), /mark-ok/, 'la réponse attendue doit être marquée');
  assert.match(main(), /Une réponse possible/, 'une réponse possible doit suivre la justification');

  // Retour au menu : le client traité y est signalé.
  engine.setValue('openCase', null);
  engine.render();
  assert.match(main(), /case-cards/, 'on doit revenir au menu');
  assert.match(main(), /is-done/, 'le client traité doit être marqué au menu');

  // Les deux autres, puis l'exercice est terminé.
  for (const [index, choice] of [[0, 'c'], [2, 'a']]) {
    engine.setValue('openCase', index);
    engine.render();
    engine.setValue(`choice${index}`, choice);
    engine.setValue(`why${index}`, 'Ma justification.');
    engine.submit();
    for (let k = 0; k < 6; k++) engine.setValue(`self${index}_${k}`, 'oui');
    engine.submit();
  }
  assert.ok(core.isDone('s2-A'), 'les trois clients traités terminent l’exercice');
});

test('S3 1.3 : le menu, puis nature et geste pour chaque objection', () => {
  const sandbox = load('js/screens/s3-1-3.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const content = sandbox.window.ATELIER_S3['1.3'];
  const main = () => sandbox.document.querySelector('#main').innerHTML;

  // Le menu suit la consigne, avec une entrée par objection.
  engine.setValue('briefed', true);
  engine.render();
  assert.strictEqual((main().match(/data-action="open-case"/g) || []).length, content.cases.length,
    'le menu doit proposer les quatre objections');

  // On ouvre la troisième : à l'intérieur, les deux étapes s'enchaînent.
  engine.setValue('openCase', 2);
  engine.render();
  assert.match(main(), /case-step-line/, 'la première étape doit annoncer les deux temps');

  engine.setValue('nature2', content.cases[2].nature);
  engine.submit();                                     // nature -> geste
  assert.strictEqual(engine.value('stage2'), 2, 'la validation de la nature ouvre l’étape 2');
  assert.ok(!core.isDone('s3-1.3'), 'l’étape 1 ne termine rien');

  engine.setValue('gesture2', content.cases[2].gesture);
  engine.submit();                                     // geste -> objection suivante, sans correction
  assert.strictEqual(engine.value('done2'), true, 'l’objection traitée doit être marquée');
  assert.ok(!core.isDone('s3-1.3'), 'une objection sur quatre ne termine pas l’exercice');
  assert.strictEqual(engine.value('openCase'), 0, 'la première objection non traitée s’ouvre');
  assert.doesNotMatch(main(), /option-review/, 'pas de correction avant la fin');

  // Retour au menu : l'objection traitée y est signalée.
  engine.setValue('openCase', null);
  engine.render();
  assert.match(main(), /is-done/, 'l’objection traitée doit être marquée au menu');

  // Les trois autres, dans un ordre libre.
  for (const i of [0, 3, 1]) {
    engine.setValue('openCase', i);
    engine.render();
    engine.setValue('nature' + i, content.cases[i].nature);
    engine.submit();
    engine.setValue('gesture' + i, content.cases[i].gesture);
    engine.submit();
  }
  assert.ok(!core.isDone('s3-1.3'), 'l’auto-évaluation reste à faire');
  assert.match(main(), /self-list/, 'la grille d’auto-évaluation s’affiche après la quatrième objection');
  engine.submit();
  assert.ok(!core.isDone('s3-1.3'), 'la grille vide ne valide rien');
  content.cases.forEach((_, i) => engine.setValue('self' + i, 'oui'));
  engine.submit();
  assert.ok(core.isDone('s3-1.3'), 'l’auto-évaluation validée termine l’exercice');
  assert.strictEqual((main().match(/option-review/g) || []).length, content.cases.length * 2,
    'toutes les corrections s’affichent d’un coup');
  assert.match(main(), /inline-note/, 'chaque objection a son explication');
});

test('S3 1.7 : une carte se construit en trois temps, dans le cas ouvert', () => {
  const sandbox = load('js/screens/s3-1-7.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const content = sandbox.window.ATELIER_S3['1.7'];
  const main = () => sandbox.document.querySelector('#main').innerHTML;

  engine.setValue('briefed', true);
  engine.render();
  assert.strictEqual((main().match(/data-action="open-case"/g) || []).length, content.cards.length,
    'le menu doit proposer les quatre cartes');

  // Carte 2 : décoder, creuser, répondre.
  engine.setValue('openCase', 1);
  engine.render();
  engine.setValue('nature1', content.cards[1].answer);
  engine.submit();
  assert.strictEqual(engine.value('stage1'), 2, 'décoder mène à creuser');
  engine.setValue('dig1', 'Par rapport à quelle offre faites-vous cette comparaison ?');
  engine.submit();
  assert.strictEqual(engine.value('stage1'), 3, 'creuser mène à répondre');
  assert.ok(!core.isDone('s3-1.7'), 'les temps intermédiaires ne terminent rien');

  engine.setValue('reply1', 'Concrètement, nos trois derniers audits montrent le même écart.');
  engine.submit();
  assert.strictEqual(engine.value('done1'), true, 'la carte construite doit être marquée');
  assert.ok(!core.isDone('s3-1.7'), 'une carte sur quatre ne termine pas l’exercice');
  assert.match(main(), /Creuser : votre question/, 'la question et la réponse doivent être relues');
  assert.match(main(), /Une réponse possible/, 'une réponse possible doit suivre');

  // Le temps en cours est propre à chaque carte : une carte neuve repart à 1.
  engine.setValue('openCase', 3);
  engine.render();
  assert.ok(!engine.value('stage3'), 'une carte non entamée n’a pas d’étape enregistrée');
  assert.match(main(), /stepper/, 'elle reprend au premier temps');

  for (const i of [0, 2, 3]) {
    engine.setValue('openCase', i);
    engine.render();
    engine.setValue(`nature${i}`, content.cards[i].answer);
    engine.submit();
    engine.setValue(`dig${i}`, 'Qu’est-ce qui vous fait dire cela ?');
    engine.submit();
    engine.setValue(`reply${i}`, 'Voici un élément vérifiable à l’appui.');
    engine.submit();
  }
  assert.ok(core.isDone('s3-1.7'), 'les quatre cartes construites terminent l’exercice');
});

test('S3 1.5 : on choisit, puis on explique, le choix étant rappelé', () => {
  const sandbox = load('js/screens/s3-1-5.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const main = () => sandbox.document.querySelector('#main').innerHTML;

  engine.setValue('briefed', true);
  engine.render();

  // Étape 1 : les deux réponses, et rien d'autre à remplir.
  assert.match(main(), /duo-layout/, 'l’étape 1 présente les deux réponses');
  assert.ok(!/data-field="why"/.test(main()), 'le champ d’explication ne doit pas encore être là');

  // Valider sans choisir ne fait pas avancer.
  engine.submit();
  assert.ok(!Number(engine.value('stage')), 'sans choix, on reste à l’étape 1');

  // Choisir fait passer à l'étape 2, sans terminer l'exercice.
  engine.setValue('choice', 'B');
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2, 'le choix ouvre l’étape 2');
  assert.ok(!core.isDone('s3-1.5'), 'choisir ne termine pas l’exercice');

  // L'étape 2 rappelle le choix et demande le raisonnement.
  assert.match(main(), /duo-explain/, 'l’étape 2 s’affiche');
  assert.match(main(), /Réponse B/, 'le choix doit être rappelé');
  assert.match(main(), /data-field="why"/, 'le champ d’explication doit être présent');

  // Valider sans explication est refusé.
  engine.submit();
  assert.ok(!core.isDone('s3-1.5'), 'sans explication, l’exercice n’est pas validé');

  engine.setValue('why', 'Elle accueille le frein puis fait préciser avant de répondre.');
  engine.submit();
  assert.ok(core.isDone('s3-1.5'), 'choix et explication terminent l’exercice');

  // La correction est posée au contact des réponses.
  assert.match(main(), /option-review/, 'les deux réponses passent en relecture');
  assert.match(main(), /Une réponse possible/, 'une réponse possible doit suivre le raisonnement');
});

test('S1 C : choisir, argumenter un à un avec un critère, puis emprunter', () => {
  const sandbox = load('js/screens/s1-c.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const criteria = sandbox.window.ATELIER_S1.criteria;
  const main = () => sandbox.document.querySelector('#main').innerHTML;

  engine.setValue('briefed', true);
  engine.render();

  // Étape 1 : les ouvertures seules.
  assert.ok(!/data-field="argument1"/.test(main()), 'aucun argument à l’étape 1');
  engine.submit();
  assert.ok(!Number(engine.value('stage')), 'sans choix, on reste à l’étape 1');
  engine.setValue('choice', '1');
  engine.submit();
  assert.strictEqual(engine.value('stage'), 2, 'le choix ouvre l’étape 2');

  // Étape 2 : un argument à la fois, critère obligatoire.
  assert.match(main(), /Argument 1 sur 3/);
  assert.match(main(), /data-field="criterion1"/, 'le critère se choisit avec l’argument');
  assert.ok(!/data-field="argument2"/.test(main()), 'un seul argument affiché');
  engine.setValue('argument1', 'Elle cadre la durée.');
  engine.submit();
  assert.strictEqual(engine.value('argIndex'), 1, 'sans critère, on reste sur l’argument 1');
  engine.setValue('criterion1', criteria[0]);
  engine.submit();
  assert.strictEqual(engine.value('argIndex'), 2, 'argument complet : on passe au suivant');
  for (const i of [2, 3]) {
    engine.setValue(`criterion${i}`, criteria[i - 1]);
    engine.setValue(`argument${i}`, 'Le client parle en premier.');
    engine.submit();
  }
  assert.strictEqual(engine.value('stage'), 3, 'trois arguments mènent à l’étape 3');
  assert.ok(!core.isDone('s1-C'), 'argumenter ne termine pas l’exercice');

  // Étape 3 : l'emprunt, avec le rappel des deux ouvertures.
  assert.match(main(), /Autre proposition/);
  engine.submit();
  assert.ok(!core.isDone('s1-C'), 'sans emprunt, l’exercice n’est pas validé');
  engine.setValue('borrow', 'La preuve de crédibilité, glissée après le cadrage.');
  engine.submit();
  assert.ok(core.isDone('s1-C'), 'les trois étapes terminent l’exercice');
  assert.match(main(), /compare-arguments/, 'les arguments sont relus avec leur critère');
});

test('S3 1.6 : un contexte traité termine l’exercice, les autres restent ouverts', () => {
  const sandbox = load('js/screens/s3-1-6.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const method = sandbox.window.ATELIER_S3.method;
  const contexts = sandbox.window.ATELIER_S3['1.6'].cases;
  assert.ok(contexts.length >= 6, 'six contextes au moins');

  // Deuxième contexte : ses clés sont préfixées (c1_line0…).
  engine.setValue('openCase', 1);
  for (let i = 0; i < method.length; i++) {
    assert.strictEqual(engine.cursor(), i, `on doit être à l’étape ${i + 1}`);
    engine.setValue(`c1_line${i}`, `Ma phrase pour l’étape ${i + 1}.`);
    engine.submit();
  }
  engine.submit(); // le récapitulatif : valider
  assert.ok(core.isDone('s3-1.6'), 'un contexte traité termine l’exercice');
  assert.strictEqual(engine.value('done1'), true);
  assert.notStrictEqual(engine.value('done0'), true, 'les autres contextes restent à faire');
});

console.log('\nParcours — manipulation');

test('S3 1.1 : classer les 8 cartes, annuler, puis valider', () => {
  const sandbox = load('js/screens/s3-1-1.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const cards = sandbox.window.ATELIER_S3['1.1'].cards;
  const place = sandbox.window.AtelierPlacement.create({ total: cards.length });

  // Classe tout correctement sauf la dernière.
  cards.forEach((card, i) => { if (i < cards.length - 1) place.place(i, card.answer); });
  engine.submit();
  assert.ok(!core.isDone('s3-1.1'), 'une carte manquante empêche la validation');

  place.place(cards.length - 1, cards[cards.length - 1].answer);
  assert.strictEqual(place.placedCount(), cards.length, 'les 8 cartes doivent être placées');

  // Annuler retire bien la dernière posée.
  place.undo();
  assert.strictEqual(place.placedCount(), cards.length - 1, 'annuler doit retirer une carte');

  place.place(cards.length - 1, cards[cards.length - 1].answer);
  engine.submit();
  assert.ok(core.isDone('s3-1.1'), 'les 8 cartes classées terminent l’exercice');

  assert.match(sandbox.document.querySelector('#main').innerHTML, /result-score">8 \/ 8/, 'le corrigé doit annoncer le score');
});

test('S4 1.1 : une position déjà prise libère la carte précédente', () => {
  const sandbox = load('js/screens/s4-1-1.js');
  const cards = sandbox.window.ATELIER_S4['1.1'].cards;
  const place = sandbox.window.AtelierPlacement.create({ total: cards.length, unique: true });

  place.place(0, 1);
  place.place(1, 1);                                   // même position, autre carte
  const list = place.list();
  assert.strictEqual(list[0], null, 'la première carte doit être renvoyée au paquet');
  assert.strictEqual(list[1], 1, 'la seconde carte occupe la position');
  assert.strictEqual(place.placedCount(), 1, 'une seule carte placée');
});

test('S4 1.1 : l’ordre correct est reconnu comme complet', () => {
  const sandbox = load('js/screens/s4-1-1.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const cards = sandbox.window.ATELIER_S4['1.1'].cards;
  const place = sandbox.window.AtelierPlacement.create({ total: cards.length, unique: true });

  cards.forEach((card, i) => place.place(i, card.position));
  engine.submit();
  assert.ok(core.isDone('s4-1.1'), 'les 5 phrases placées terminent l’exercice');
  assert.match(sandbox.document.querySelector('#main').innerHTML, /result-score">5 \/ 5 à la place attendue/, 'le corrigé doit montrer l’ordre');
});

test('S4 1.2 : moins de 4 maladresses bloque, 4 ouvrent la réécriture', () => {
  const sandbox = load('js/screens/s4-1-2.js');
  const engine = sandbox.window.AtelierExercise;
  const core = sandbox.window.AtelierCore;
  const segments = sandbox.window.ATELIER_S4['1.2'].segments;

  const marks = segments.map(() => false);
  marks[0] = true;
  marks[1] = true;
  engine.setValue('marked', marks.slice());
  engine.submit();
  assert.strictEqual(engine.cursor(), 0, 'rester à l’étape de repérage');
  assert.ok(!core.isDone('s4-1.2'), '2 maladresses ne suffisent pas');

  marks[2] = true;
  marks[3] = true;
  engine.setValue('marked', marks.slice());
  engine.submit();                                     // passe à la réécriture
  engine.setValue('rewrite', 'Bonjour, merci de me recevoir. Je suis conseiller chez Atelier. Je vous propose 30 minutes. Qu’est-ce qui vous amène ?');
  engine.submit();
  assert.ok(core.isDone('s4-1.2'), '4 maladresses et une réécriture terminent l’exercice');
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s1-e3.js');
  first.window.AtelierExercise.setValue('opening', 'Je vous propose de commencer par vos priorités.');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');

  // Recharge dans un nouveau bac à sable, en réinjectant le stockage.
  const second = load('js/screens/s1-e3.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(
    second.window.AtelierExercise.value('opening'),
    'Je vous propose de commencer par vos priorités.',
    'la réponse doit être restaurée'
  );
});

test('les placements et marquages survivent aussi', () => {
  const first = load('js/screens/s4-1-2.js');
  first.window.AtelierExercise.setValue('marked', [true, false, true, false, true, false]);
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);

  const second = load('js/screens/s4-1-2.js', { storage: { [catalog.storageKey]: saved } });
  const restored = second.window.AtelierExercise.value('marked');
  assert.ok(Array.isArray(restored), 'le tableau doit être restauré');
  assert.strictEqual(restored.filter(Boolean).length, 3, 'les trois marquages doivent survivre');
});

test('une progression dans une série est visible depuis une autre page', () => {
  const first = load('js/screens/s2-b.js');
  const engine = first.window.AtelierExercise;
  const cases = first.window.ATELIER_S2.B.cases;
  const attitudes = first.window.ATELIER_S2.attitudes;
  cases.forEach((item, i) => {
    engine.setValue(`attitude${i}`, item.answer);
    engine.setValue(`rewrite${i}`, 'Si je vous suis bien, c’est le niveau de prix qui vous interroge.');
  });
  engine.submit();
  assert.ok(first.window.AtelierCore.isDone('s2-B'), 'l’exercice doit être terminé');
  const saved = first.localStorage.getItem(catalog.storageKey);

  // Une autre page du projet doit compter cet exercice comme terminé.
  const other = load('js/screens/s4-2-2.js', { storage: { [catalog.storageKey]: saved } });
  assert.ok(other.window.AtelierCore.isDone('s2-B'), 'la progression est partagée entre les pages');
  assert.strictEqual(other.window.AtelierCore.completedCount(), 1, 'un exercice terminé au total');
  void attitudes;
});

console.log('\nCorrection affichée en place');

/* Chaque écran listé ici doit poser sa correction au contact des réponses :
 * pastille de verdict, remarque sous le champ, version modèle, ou corrigé
 * ligne à ligne (réponse à gauche, retour à droite : an-verdict, S1 A et B). Sans cela
 * la correction retomberait dans le pavé du bas, ce qu'on cherche à éviter. */
const INLINE = {
  // S1 A : l’analyse, puis la grille d’autoévaluation déjà ouverte et remplie.
  's1-a': engine => {
    engine.setValue('strengths', 'a'); engine.setValue('improvements', 'b'); engine.setValue('rewrite', 'c');
    engine.setValue('selfCheck', true);
    for (let i = 0; i < 6; i++) engine.setValue(`self${i}`, 'oui');
  },
  // S1 B : l'approche, puis la grille d'autoévaluation déjà ouverte et remplie.
  's1-b': engine => {
    engine.setValue('opening', 'a'); engine.setValue('adjustment', 'b');
    engine.setValue('selfCheck', true);
    for (let i = 0; i < 6; i++) engine.setValue(`self${i}`, 'oui');
  },
  's1-d': engine => {
    for (let i = 1; i <= 4; i++) engine.setValue(`line${i}`, `Phrase ${i}`);
    engine.setValue('technique1', 'Accueil / 4 × 20');
    engine.setValue('technique2', 'Présentation');
    engine.setValue('technique3', 'Cadrage');
    engine.setValue('technique4', 'Transition vers l’écoute');
  },
  // S2 F passe par le menu des cas : on ouvre le premier profil et on
  // ne remplit que celui-là, comme le ferait un apprenant.
  's2-f': engine => {
    engine.setValue('openCase', 0); engine.setValue('reply0', 'r'); engine.setValue('posture0', 'p');
    engine.setValue('selfOpen0', true);
    for (let k = 0; k < 6; k++) engine.setValue(`self0_${k}`, 'oui');
  },
  's3-1-4': engine => { engine.setValue('hypothesis', 'h'); engine.setValue('question', 'Quoi ?'); },
  's4-2-2': engine => { engine.setValue('openCase', 0); engine.setValue('repair0', 'r'); }
};

for (const [file, fill] of Object.entries(INLINE)) {
  test(`${file} affiche sa correction au contact des réponses`, () => {
    const sandbox = load(`js/screens/${file}.js`);
    const engine = sandbox.window.AtelierExercise;
    fill(engine);
    /* Un exercice à cas multiples n'est terminé qu'une fois tous ses cas
     * traités : on valide donc une fois, et on vérifie que la correction
     * du cas s'affiche, sans exiger que l'exercice entier soit clos. */
    engine.submit();
    const main = sandbox.document.querySelector('#main').innerHTML;
    assert.ok(!/form-errors[^>]*>\s*<strong/.test(main), 'la validation ne doit pas être refusée');
    assert.match(main, /inline-note|model-block|mark-ok|option-review|an-verdict|result-model/,
      'la correction doit figurer dans l’écran, pas seulement dans le pavé du bas');
  });
}

console.log('\nAccueil et bilan');

/* L'accueil n'est pas un exercice : il se charge sans le moteur, et depuis
 * la racine du site plutôt que depuis exercices/. */
function loadHome(hash, storage) {
  const sandbox = makeSandbox(storage ? { storage } : {});
  sandbox.location = { pathname: '/index.html', hash };
  sandbox.document.documentElement.dataset.depth = '0';
  for (const file of ['js/icons.js', 'js/catalog.js', 'js/core.js', 'js/home.js']) {
    vm.runInContext(read(file), sandbox, { filename: file });
  }
  return sandbox;
}

test('l’accueil liste les quatre séries et tous leurs exercices', () => {
  const sandbox = loadHome('');
  const html = sandbox.document.querySelector('#main').innerHTML;
  assert.ok(!/undefined|NaN|\[object Object\]/.test(html), 'le rendu ne doit pas contenir undefined ou NaN');
  for (const serie of catalog.series) {
    assert.ok(html.includes(serie.label), `la série ${serie.label} doit apparaître`);
  }
  const links = html.match(/href="exercices\/[^"]+"/g) || [];
  assert.ok(links.length >= catalog.all.length, `au moins ${catalog.all.length} liens attendus, ${links.length} trouvés`);
});

test('le bilan liste les 23 exercices avec leur état', () => {
  const sandbox = loadHome('#bilan');
  const html = sandbox.document.querySelector('#main').innerHTML;
  assert.ok(!/undefined|NaN/.test(html), 'le rendu ne doit pas contenir undefined ou NaN');
  assert.match(html, /À commencer/, 'les exercices non commencés doivent être signalés');
  for (const exercise of catalog.all) {
    assert.ok(html.includes(exercise.label), `${exercise.label} doit figurer au bilan`);
  }
});

test('l’accueil reflète la progression enregistrée', () => {
  const first = load('js/screens/s1-e3.js');
  first.window.AtelierExercise.setValue('opening', 'Je vous propose de commencer par vos priorités.');
  first.window.AtelierExercise.submit();
  const saved = first.localStorage.getItem(catalog.storageKey);

  const sandbox = loadHome('', { [catalog.storageKey]: saved });
  const html = sandbox.document.querySelector('#main').innerHTML;
  assert.match(html, /state done/, 'l’exercice terminé doit être marqué');
  assert.match(html, /Reprendre où je me suis arrêté/, 'la reprise doit être proposée');
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
