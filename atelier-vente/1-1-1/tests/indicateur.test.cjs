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

test('1.6 : des réponses justes, formulées autrement que le corrigé, obtiennent au moins 8 / 10', () => {
  const variees = require('./reponses-variees.cjs')['s3-1.6'];
  for (const [c, cas] of S3['1.6'].cases.entries()) {
    const grid = G['s3-1.6'].parCas(cas, i => `line${i}`);
    const score = A.score(grid, Object.fromEntries(variees[c].map((line, i) => [`line${i}`, line]))).points;
    assert.ok(score >= 8, `contexte ${c + 1} (${cas.label}) : ${score} / 10`);
  }
});

test('1.6 : des réponses maladroites (contredire, brader, pousser) obtiennent au plus 3 / 10', () => {
  const maladroites = [
    ['Vous avez tort, ce n’est pas du tout le cas.', 'Vous êtes sûr de vouloir rater une si belle occasion.', 'Bon, passons, ce n’est pas grave.', 'Notre produit est le meilleur du marché, tout le monde le dit.', 'Voilà, c’est tout.', 'Signez ici et on n’en parle plus.'],
    ['Oui mais vous vous trompez complètement.', 'Il faut absolument acheter maintenant.', 'Je vais vous faire une remise de 20 % pour conclure.', 'Je vous fais un geste commercial exceptionnel aujourd’hui.', 'Ne vous inquiétez pas, tout le monde dit ça.', 'Je vous laisse réfléchir, rappelez-moi quand vous voulez.']
  ];
  for (const cas of S3['1.6'].cases) {
    const grid = G['s3-1.6'].parCas(cas, i => `line${i}`);
    for (const set of maladroites) {
      const score = A.score(grid, Object.fromEntries(set.map((line, i) => [`line${i}`, line]))).points;
      assert.ok(score <= 3, `${cas.label} : ${score} / 10`);
    }
  }
});

test('1.4 : dix hypothèses et questions justes, toutes différentes, obtiennent au moins 8 / 10 ; les mauvaises au plus 3', () => {
  const { bonnes, mauvaises } = require('./reponses-variees.cjs')['s3-1.4'];
  for (const [hypothesis, question] of bonnes) {
    const score = points('s3-1.4', { hypothesis, question });
    assert.ok(score >= 8, `« ${hypothesis} » / « ${question} » : ${score} / 10`);
  }
  for (const [hypothesis, question] of mauvaises) {
    const score = points('s3-1.4', { hypothesis, question });
    assert.ok(score <= 3, `« ${hypothesis} » / « ${question} » : ${score} / 10`);
  }
});

test('S2 D : 48 réponses justes (8 par attitude) sont reconnues ; une réponse dans la mauvaise attitude ne compte pas', () => {
  const V = require('./reponses-variees.cjs')['s2-D'];
  const blocs = G['s2-D'].blocs;
  V.attitudes.forEach((list, i) => list.forEach(text => {
    const score = A.score({ blocs: [blocs[i]] }, { [`reply${i}`]: text }).points;
    assert.ok(score >= 8, `${blocs[i].titre} : « ${text} » : ${score} / 10`);
  }));
  for (const [finalChoice, justification] of V.choix) {
    const score = A.score({ blocs: [blocs[6]] }, { finalChoice, justification }).points;
    assert.ok(score >= 8, `choix : « ${justification} » : ${score} / 10`);
  }
  for (const set of V.mauvaises) {
    const score = A.score({ blocs: blocs.slice(0, 6) }, Object.fromEntries(set.map((t, i) => [`reply${i}`, t]))).points;
    assert.ok(score <= 3, `attitudes mélangées : ${score} / 10`);
  }
});

test('les autres exercices : des réponses justes, écrites de plusieurs façons, obtiennent au moins 8 / 10', () => {
  const V = require('./reponses-variees-autres.cjs');
  for (const [key, sets] of Object.entries(V)) {
    sets.forEach((values, n) => {
      const score = A.score(G[key], values).points;
      assert.ok(score >= 8, `${key}, réponse ${n + 1} : ${score} / 10`);
    });
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
