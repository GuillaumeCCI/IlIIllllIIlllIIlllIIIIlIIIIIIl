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
for (const file of ['../../moteur/js/indicateur.js', 'js/grilles.js', 'js/content-s1.js', 'js/content-s2.js', 'js/content-s3.js', 'js/content-s4.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8').replace(/globalThis\);\s*$/, 'window);'), sandbox, { filename: file });
}
const { AtelierAnalyse: A, ATELIER_GRILLES: G, ATELIER_S1: S1, ATELIER_S2: S2, ATELIER_S3: S3, ATELIER_S4: S4 } = sandbox.window;
const VARIEES = require('./reponses-variees.cjs');
const points = (key, values) => (A.score(G[key], values) || { points: 0 }).points;

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

/* Les champs rédigés de chaque exercice, tels que les écrans les nomment. */
const FIELDS = {
  's1-1.3': ['a0', 'a1', 'a2'],
  's1-1.4': ['why0', 'why1'],
  's1-1.5': ['why'],
  's1-1.6': ['worst', 'error0', 'error1', 'error2', 'fixed'],
  's2-2.3': ['hook0', 'hook1', 'hook2'],
  's2-2.5': ['priority'],
  's2-2.6': ['pitch'],
  's3-3.1': ['why0', 'why1', 'why2'],
  's3-3.5': ['q1', 'q2'],
  's3-3.6': ['t0', 't1', 't2', 't3', 't4'],
  's4-1.2': ['adv0', 'proof0', 'adv1', 'proof1'],
  's4-2.2': ['client0', 'client1'],
  's4-3.2': ['error0', 'error1', 'error2']
};
const fill = (key, texts) => Object.fromEntries(FIELDS[key].map((field, i) => [field, Array.isArray(texts) ? texts[i] : texts]));

/* Les réponses possibles affichées dans les corrigés du module. */
const MODELES = {
  's1-1.3': fill('s1-1.3', S1['1.3'].needs.map(n => n.model)),
  's1-1.4': fill('s1-1.4', S1['1.4'].clients.map(c => c.model)),
  's1-1.5': { why: S1['1.5'].model },
  's1-1.6': fill('s1-1.6', [S1['1.6'].worstExample, ...S1['1.6'].worstErrors, S1['1.6'].model]),
  's2-2.3': fill('s2-2.3', S2['2.3'].hooks.map(h => h.example)),
  's2-2.5': { priority: S2['2.5'].priority },
  's2-2.6': { pitch: S2['2.6'].example },
  's3-3.1': fill('s3-3.1', S3['3.1'].series.map(s => s.why)),
  's3-3.5': { q1: S3['3.5'].lines[1].model, q2: S3['3.5'].lines[2].model },
  's3-3.6': fill('s3-3.6', S3['3.6'].steps.map(s => s.model)),
  's4-1.2': fill('s4-1.2', S4['1.2'].lines.flatMap(l => [l.advantage, l.proof])),
  's4-2.2': fill('s4-2.2', S4['2.2'].challenges.map(c => c.model)),
  's4-3.2': fill('s4-3.2', S4['3.2'].model.slice(0, 3).map(m => `${m.title} : ${m.text}`))
};

/* Des mots-clés jetés sans phrase : justes sur le fond, mais pas rédigés. */
const MOTS_CLES = {
  's1-1.3': ['vous sécurité', 'vous assistance', 'vous budget'],
  's1-1.4': ['sécurité piratage chiffrement car', 'argent prix 19 car'],
  's1-1.5': ['piratage chiffrement sauvegarde car'],
  's1-1.6': ['logo saas aussi meilleur', 'jargon', 'besoins', 'preuve client', 'sécurité assistance budget vous 19'],
  's2-2.3': ['temps vous combien', '3 heures vous', 'imaginez temps vous'],
  's2-2.5': ['preuve ajouter car'],
  's2-2.6': ['sécurité vous gagnez 5000 je vous propose'],
  's3-3.1': ['trop client car', 'jargon client car', 'besoin client car'],
  's3-3.5': ['devis temps', 'besoin lequel'],
  's3-3.6': ['automatise saisie', 'vous temps', '3 heures clients', 'parfait regardons', 'je comprends quelles tâches'],
  's4-1.2': ['vous lendemain', 'livraison', 'vous rapidement', 'formation'],
  's4-2.2': ['vous protégées', 'vous lumière'],
  's4-3.2': ['besoin', 'catalogue', 'jargon']
};

const HORS_SUJET = 'Il fait beau aujourd’hui et la circulation était dense.';

console.log('\nIndicateur de points · réponses ouvertes du module 1-1-2');

test('chaque exercice à réponse rédigée a sa grille, intégrée à son corrigé', () => {
  assert.deepStrictEqual(Object.keys(G).sort(), Object.keys(FIELDS).sort());
  for (const [key, grid] of Object.entries(G)) assert.ok(grid.integre, `${key} : la grille doit être intégrée à l’écran`);
});

test('les réponses possibles du module obtiennent au moins 7 / 10', () => {
  for (const [key, values] of Object.entries(MODELES)) {
    const score = points(key, values);
    assert.ok(score >= 7, `${key} : ${score} / 10`);
  }
});

for (const [key, sets] of Object.entries(VARIEES)) {
  test(`${key} : ${sets.length} réponses justes, formulées tout autrement, obtiennent au moins 6 / 10`, () => {
    assert.ok(sets.length >= 8, `${key} : au moins 8 réponses variées attendues`);
    const low = sets.map((values, n) => [n + 1, points(key, values)]).filter(([, score]) => score < 6);
    assert.deepStrictEqual(low, [], `${key} : ${low.map(([n, s]) => `réponse ${n} à ${s} / 10`).join(', ')}`);
  });
}

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

test('les variantes d’un mot sont reconnues (accents, terminaisons, mot intercalé)', () => {
  const list = A.tokens('Vous en GAGNEZ, nous gagnerons ; sécurisé');
  assert.ok(A.find(list, 'vous gagnez').length, 'mot intercalé');
  assert.ok(A.find(list, 'securise').length, 'accents');
  assert.ok(A.find(A.tokens('Livré sous 24 h, 98 % des commandes'), '9*').length, 'un nombre');
});

test('S3 3.5 : une réplique sans question écrite ne compte pas', () => {
  const only = A.score(G['s3-3.5'], { q1: S3['3.5'].lines[1].model });
  assert.strictEqual(only.blocs.length, 1);
  assert.strictEqual(A.score(G['s3-3.5'], {}), null);
});

test('les pièges retirent des points : ton hésitant, argument de trop, question qui force la main', () => {
  const sure = points('s2-2.6', VARIEES['s2-2.6'][3]);
  const unsure = points('s2-2.6', { pitch: `Je pense que peut-être ${VARIEES['s2-2.6'][3].pitch} Normalement, ça devrait aller.` });
  assert.ok(unsure < sure, `${unsure} devrait être inférieur à ${sure}`);
  const t3 = A.score({ blocs: [G['s3-3.6'].blocs[3]] }, { t3: 'Très bien. Et en plus, sans oublier notre module marketing, regardons la suite.' });
  assert.ok(t3.blocs[0].lines.some(line => line.kind === 'warn'), 'l’argument de trop est signalé');
});

test('chaque grille lit des champs qui existent dans les écrans', () => {
  const screens = fs.readdirSync(path.join(root, 'js/screens')).map(f => fs.readFileSync(path.join(root, 'js/screens', f), 'utf8')).join('\n');
  for (const [key, grid] of Object.entries(G)) {
    for (const bloc of grid.blocs) {
      for (const field of bloc.champs || [bloc.motif]) {
        const base = field.replace(/\d+$/, '');
        assert.ok(screens.includes(`'${field}'`) || screens.includes(`\`${base}`) || screens.includes(`'${base}`), `${key} : champ « ${field} » introuvable`);
      }
    }
  }
});

test('chaque écran concerné place le score dans son corrigé', () => {
  for (const key of Object.keys(G)) {
    const file = path.join(root, 'js/screens', `${key.replace('.', '-')}.js`);
    const code = fs.readFileSync(file, 'utf8');
    assert.match(code, new RegExp(`ouvert\\.head\\('${key.replace('.', '\\.')}'`), `${key} : le score global manque en tête du corrigé`);
    assert.match(code, /ouvert\.(answer|quote|expected)\(/, `${key} : la relecture réponse par réponse manque`);
  }
});

test('le corrigé des réponses ouvertes parle de « Une réponse possible »', () => {
  const helper = fs.readFileSync(path.join(root, '../../moteur/js/reponses-ouvertes.js'), 'utf8');
  assert.match(helper, /Une réponse possible/);
  for (const key of Object.keys(G)) {
    const code = fs.readFileSync(path.join(root, 'js/screens', `${key.replace('.', '-')}.js`), 'utf8');
    assert.doesNotMatch(code, /kit\.model\('(Corrigé|Argument possible|Un exemple|Exemple)/, `${key} : un ancien libellé de corrigé reste`);
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
