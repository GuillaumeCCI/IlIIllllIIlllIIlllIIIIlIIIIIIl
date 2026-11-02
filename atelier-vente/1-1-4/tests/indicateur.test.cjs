/* Indicateur de points des réponses ouvertes (moteur/js/indicateur.js + js/grilles.js).
 *
 * Pour chaque exercice à réponse rédigée : les réponses possibles du module
 * et au moins huit réponses justes, formulées autrement, obtiennent un bon
 * score ; une réponse vide, hors sujet, maladroite ou réduite à des
 * mots-clés reste basse. On vérifie aussi que chaque grille lit des champs
 * de son écran et que les pages chargent l'indicateur.
 * Réponses : reponses-justes-a.cjs (séries 1 à 3), reponses-justes-b.cjs
 * (séries 4 et 5).
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
const contents = fs.readdirSync(path.join(root, 'js')).filter(f => /^content-s\d\.js$/.test(f)).map(f => `js/${f}`);
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js', ...contents]) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8').replace(/globalThis\);\s*$/, 'window);'), sandbox, { filename: file });
}
const W = sandbox.window;
const { AtelierAnalyse: A, ATELIER_GRILLES: G } = W;
const A_SET = require('./reponses-justes-a.cjs');
const B_SET = require('./reponses-justes-b.cjs');
const JUSTES = Object.assign({}, A_SET.justes, B_SET.justes);
const MAUVAISES = Object.assign({}, A_SET.mauvaises, B_SET.mauvaises);
const points = (key, values) => (A.score(G[key], values) || { points: 0 }).points;
const champs = key => G[key].blocs.flatMap(b => b.champs || []);
const fill = (key, text) => Object.fromEntries(champs(key).map(f => [f, text]));

/* Le contenu d'un exercice : 's2-2.4' → ATELIER_S2['2.4']. */
const contentOf = key => { const [, s, id] = key.match(/^s(\d)-(.+)$/); return (W[`ATELIER_S${s}`] || {})[id]; };

/* Les réponses possibles affichées au corrigé, champ par champ. */
function modeles(key) {
  const c = contentOf(key);
  if (!c || !champs(key).length) return null;
  if (!c.cases) return Object.fromEntries(champs(key).map(f => [f, c.model]));
  const values = {};
  c.cases.forEach((kase, i) => {
    const fields = kase.fields || c.fields || [];
    const scored = fields.filter(f => champs(key).includes(`c${i}_${f.id}`));
    fields.forEach(f => {
      const model = (kase.models || {})[f.id] ?? f.model ?? (scored.length === 1 ? kase.model : undefined);
      if (model && champs(key).includes(`c${i}_${f.id}`)) values[`c${i}_${f.id}`] = model;
    });
  });
  return Object.keys(values).length ? values : null;
}

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

const HORS_SUJET = 'Il fait beau aujourd’hui et la circulation était dense.';

console.log('\nIndicateur de points · réponses ouvertes du module 1-1-4');

test('chaque grille est intégrée à son corrigé et a ses réponses de test', () => {
  for (const [key, grid] of Object.entries(G)) {
    assert.ok(grid.integre, `${key} : la grille doit être intégrée à l’écran`);
    assert.ok(JUSTES[key], `${key} : réponses justes manquantes`);
    assert.ok(MAUVAISES[key], `${key} : réponses mauvaises manquantes`);
  }
});

test('les réponses possibles du module obtiennent au moins 7 / 10', () => {
  const low = [];
  for (const key of Object.keys(G)) {
    const values = modeles(key);
    if (!values) continue;
    const score = points(key, values);
    if (score < 7) low.push(`${key} : ${score}`);
  }
  assert.deepStrictEqual(low, []);
});

for (const [key, sets] of Object.entries(JUSTES)) {
  test(`${key} : ${sets.length} réponses justes, formulées autrement, obtiennent au moins 6 / 10`, () => {
    assert.ok(sets.length >= 8, `${key} : au moins 8 réponses variées attendues`);
    const low = sets.map((values, n) => [n + 1, points(key, values)]).filter(([, score]) => score < 6);
    assert.deepStrictEqual(low, [], `${key} : ${low.map(([n, s]) => `réponse ${n} à ${s} / 10`).join(', ')}`);
  });
}

test('les réponses mauvaises (hors sujet, maladroites, mots-clés) restent sous les justes et à 5 / 10 au plus', () => {
  const bad = [];
  for (const [key, sets] of Object.entries(MAUVAISES)) {
    const best = Math.min(...JUSTES[key].map(v => points(key, v)));
    sets.forEach((values, n) => {
      const score = points(key, values);
      if (score > 5 || score >= best) bad.push(`${key} réponse ${n + 1} : ${score} (justes dès ${best})`);
    });
  }
  assert.deepStrictEqual(bad, []);
});

test('une réponse vide ne marque aucun point', () => {
  for (const key of Object.keys(G)) assert.strictEqual(points(key, fill(key, '')), 0, key);
});

test('une réponse hors sujet obtient au plus 2 / 10', () => {
  for (const key of Object.keys(G)) {
    const score = points(key, fill(key, HORS_SUJET));
    assert.ok(score <= 2, `${key} : ${score} / 10`);
  }
});

test('chaque grille lit des champs qui existent dans les écrans ou le contenu', () => {
  const code = ['js/screens', 'js'].flatMap(dir => fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith('.js')).map(f => fs.readFileSync(path.join(root, dir, f), 'utf8'))).join('\n');
  for (const [key, grid] of Object.entries(G)) {
    for (const bloc of grid.blocs) {
      for (const field of bloc.champs || [bloc.motif]) {
        const id = field.replace(/^c\d+_/, '').replace(/\d+$/, '');
        assert.ok(code.includes(`'${id}`) || code.includes(`\`${id}`) || code.includes(`id: '${field.replace(/^c\d+_/, '')}'`), `${key} : champ « ${field} » introuvable`);
      }
    }
  }
});

test('les outils de corrigé placent le score', () => {
  const mounts = fs.readFileSync(path.join(root, 'js/mounts.js'), 'utf8');
  assert.match(mounts, /scoreHead\(key\)/);
  assert.match(mounts, /ouvert\(\)\.answer\(/);
  for (const key of ['s2-2.4', 's4-4.3']) {
    const screen = fs.readFileSync(path.join(root, 'js/screens', `${key.replace('.', '-')}.js`), 'utf8');
    assert.match(screen, new RegExp(`ouvert\\.head\\('${key.replace('.', '\\.')}'`), key);
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
