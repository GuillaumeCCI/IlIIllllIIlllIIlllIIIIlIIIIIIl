/* Indicateur de points des réponses ouvertes (moteur/js/indicateur.js + js/grilles.js).
 *
 * Pour chaque exercice à réponse rédigée : les réponses possibles du module
 * et au moins huit réponses justes, formulées tout autrement, obtiennent un
 * bon score ; une réponse vide, hors sujet ou réduite à des mots-clés reste
 * basse. On vérifie aussi que chaque grille lit des champs de son écran, et
 * que l'écran affiche bien le score dans son corrigé.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js', 'js/content-s1.js', 'js/content-s2.js', 'js/content-s3.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8').replace(/globalThis\);\s*$/, 'window);'), sandbox, { filename: file });
}
const { AtelierAnalyse: A, ATELIER_GRILLES: G, ATELIER_S1: S1, ATELIER_S2: S2, ATELIER_S3: S3 } = sandbox.window;
const VARIEES = require('./reponses-variees.cjs');

/* La grille d'un exercice ; S1 1.6 dépend de l'objection travaillée. */
const gridOf = (key, values = {}) => (G[key].parCas ? G[key].parCas(Number(values.objection) || 0) : G[key]);
const points = (key, values) => (A.score(gridOf(key, values), values) || { points: 0 }).points;

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

const six = [0, 1, 2, 3, 4, 5].map(i => `phrase${i}`);
const FIELDS = {
  's1-1.4': ['hypothesis', 'question'],
  's1-1.5': ['why'],
  's1-1.6': six,
  's1-1.7': [0, 1, 2, 3].flatMap(i => [`question${i}`, `answer${i}`, `proof${i}`]),
  's2-2.3': ['reply0', 'reply1'],
  's2-2.4': ['spot0', 'spot1', 'spot2', 'spot3'],
  's2-2.5': ['why'],
  's2-2.6': ['script0', 'script1', 'script2'],
  's2-2.7': [0, 1, 2].flatMap(i => [`posture${i}`, `reponse${i}`, `rebond${i}`]),
  's3-1.2': ['error0', 'error1', 'error2', 'error3', 'rewrite'],
  's3-2.2': [0, 1, 2].flatMap(i => [`why${i}`, `reply${i}`])
};
const fill = (key, texts) => Object.fromEntries(FIELDS[key].map((field, i) => [field, Array.isArray(texts) ? texts[i] : texts]));

/* Les réponses possibles affichées dans les corrigés du module. */
const MODELES = {
  's1-1.4': { hypothesis: S1['1.4'].hypotheses[0], question: S1['1.4'].model },
  's1-1.5': { why: S1['1.5'].model },
  's1-1.7': fill('s1-1.7', S1['1.7'].fiches.flatMap(f => [f.question, f.answer, f.proof])),
  's2-2.3': fill('s2-2.3', S2['2.3'].turns.map(t => t.model)),
  's2-2.4': fill('s2-2.4', S2['2.4'].errors.map(e => `${e.title} : ${e.text}`)),
  's2-2.5': { why: S2['2.5'].model },
  's2-2.6': fill('s2-2.6', S2['2.6'].situations.map(s => s.model)),
  's2-2.7': fill('s2-2.7', S2['2.7'].cards.flatMap(c => [c.model.posture, c.model.reponse, c.model.rebond])),
  's3-1.2': fill('s3-1.2', [...S3['1.2'].passages.map(p => p.error), S3['1.2'].model]),
  's3-2.2': fill('s3-2.2', S3['2.2'].cases.flatMap(c => [c.blocks, c.model]))
};
S1['1.6'].objections.forEach((o, n) => { MODELES[`s1-1.6 · ${o.text}`] = Object.assign({ objection: n }, fill('s1-1.6', o.model)); });

/* Des mots-clés jetés sans phrase : justes sur le fond, mais pas rédigés. */
const MOTS_CLES = {
  's1-1.4': ['prix', 'hésitez'],
  's1-1.5': ['réponse 2 essai preuve'],
  's2-2.3': ['ergonomie riveau', 'jour'],
  's2-2.5': ['réponse 1 questions'],
  's2-2.6': ['moment', 'postes', 'améliorer'],
  's3-2.2': ['force', 'moment', 'générique', 'questions', 'dénigre', 'compte']
};

const HORS_SUJET = 'Il fait beau aujourd’hui et la circulation était dense.';

console.log('\nIndicateur de points · réponses ouvertes du module 1-1-3');

test('chaque exercice à réponse rédigée a sa grille, intégrée à son corrigé', () => {
  assert.deepStrictEqual(Object.keys(G).sort(), Object.keys(FIELDS).sort());
  for (const [key, grid] of Object.entries(G)) assert.ok(grid.integre, `${key} : la grille doit être intégrée à l’écran`);
});

test('les réponses possibles du module obtiennent au moins 7 / 10', () => {
  for (const [name, values] of Object.entries(MODELES)) {
    const key = name.split(' · ')[0];
    const score = points(key, values);
    assert.ok(score >= 7, `${name} : ${score} / 10`);
  }
});

for (const [key, sets] of Object.entries(VARIEES)) {
  test(`${key} : ${sets.length} réponses justes, formulées tout autrement, obtiennent au moins 6 / 10`, () => {
    assert.ok(sets.length >= 8, `${key} : au moins 8 réponses variées attendues`);
    const low = sets.map((values, n) => [n + 1, points(key, values)]).filter(([, score]) => score < 6);
    assert.deepStrictEqual(low, [], `${key} : ${low.map(([n, s]) => `réponse ${n} à ${s} / 10`).join(', ')}`);
  });
}

test('chaque exercice a ses réponses variées', () => {
  assert.deepStrictEqual(Object.keys(VARIEES).sort(), Object.keys(FIELDS).sort());
});

test('une réponse vide ne marque aucun point', () => {
  for (const key of Object.keys(FIELDS)) assert.strictEqual(points(key, fill(key, '')), 0, key);
});

test('une réponse hors sujet obtient au plus 2 / 10', () => {
  for (const key of Object.keys(FIELDS)) {
    const score = points(key, fill(key, HORS_SUJET));
    assert.ok(score <= 2, `${key} : ${score} / 10`);
  }
});

test('une liste de mots-clés reste basse (au plus 5 / 10) et vaut moins que les mêmes idées rédigées', () => {
  for (const [key, texts] of Object.entries(MOTS_CLES)) {
    const list = points(key, fill(key, texts));
    assert.ok(list <= 5, `${key} : ${list} / 10`);
    const written = points(key, VARIEES[key][0]);
    assert.ok(list < written, `${key} : ${list} devrait être inférieur à ${written}`);
  }
});

test('S1 1.6 : chaque objection a sa propre grille', () => {
  const sujets = S1['1.6'].objections.map((_, n) => JSON.stringify(G['s1-1.6'].parCas(n).blocs[0].criteres[1].mots));
  assert.strictEqual(new Set(sujets).size, sujets.length);
});

test('chaque grille lit des champs qui existent dans les écrans', () => {
  const screens = fs.readdirSync(path.join(root, 'js/screens')).map(f => fs.readFileSync(path.join(root, 'js/screens', f), 'utf8')).join('\n');
  for (const key of Object.keys(G)) {
    for (const bloc of gridOf(key).blocs) {
      for (const field of bloc.champs || [bloc.motif]) {
        const base = field.replace(/\d+$/, '');
        // S2 2.7 nomme ses champs d'après les gestes du contenu (posture, reponse, rebond).
        const gesture = key === 's2-2.7' && S2['2.7'].gestures.some(g => g.id === base) && screens.includes('gestures[g].id');
        assert.ok(gesture || screens.includes(`'${field}'`) || screens.includes(`\`${base}`) || screens.includes(`'${base}`), `${key} : champ « ${field} » introuvable`);
      }
    }
  }
});

test('chaque écran concerné place le score dans son corrigé', () => {
  const compare = fs.readFileSync(path.join(root, '../../moteur/js/kit.js'), 'utf8');
  for (const key of Object.keys(G)) {
    const code = fs.readFileSync(path.join(root, 'js/screens', `${key.replace('.', '-')}.js`), 'utf8');
    if (code.includes('mountCompare(')) {
      assert.match(compare, /AtelierOuvert\.head\(key\)/, `${key} : kit.mountCompare doit placer le score`);
      continue;
    }
    assert.match(code, new RegExp(`ouvert\\.head\\('${key.replace('.', '\\.')}'`), `${key} : le score global manque en tête du corrigé`);
    assert.match(code, /ouvert\.(answer|quote|expected)\(/, `${key} : la relecture réponse par réponse manque`);
  }
});

test('le corrigé des réponses ouvertes parle de « Une réponse possible »', () => {
  for (const key of Object.keys(G)) {
    const code = fs.readFileSync(path.join(root, 'js/screens', `${key.replace('.', '-')}.js`), 'utf8');
    assert.doesNotMatch(code, /kit\.(model|yours)\(/, `${key} : un ancien bloc de corrigé reste`);
  }
});

test('les pages d’exercice chargent les grilles, l’indicateur et la relecture', () => {
  for (const file of fs.readdirSync(path.join(root, 'exercices'))) {
    const html = fs.readFileSync(path.join(root, 'exercices', file), 'utf8');
    for (const script of ['../js/grilles.js', '../../../moteur/js/indicateur.js', '../../../moteur/js/reponses-ouvertes.js']) {
      assert.ok(html.includes(`src="${script}"`), `${file} : ${script} manque`);
    }
  }
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
