/* Vérifie que chaque écran se monte et refuse une réponse vide.
 *
 * Exécute le code réel des 34 écrans dans le DOM simulé de harness.cjs, pour
 * attraper les erreurs de référence, les clés d'exercice inconnues et les
 * trous de rendu. Ne juge pas du rendu visuel : voyez le README.
 *
 *     npm test
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { root, load, catalog } = require('./harness.cjs');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

console.log('\nCatalogue');

test('34 exercices répartis en 5 séries (5, 7, 7, 7 et 8)', () => {
  assert.strictEqual(catalog.series.length, 5);
  assert.strictEqual(catalog.all.length, 34);
  assert.deepStrictEqual(Array.from(catalog.series, serie => serie.exercises.length), [5, 7, 7, 7, 8]);
});

test('chaque clé d’exercice est unique', () => {
  const keys = catalog.all.map(exercise => exercise.key);
  assert.strictEqual(new Set(keys).size, keys.length);
});

test('chaque fichier de page a un nom unique', () => {
  const files = catalog.all.map(exercise => exercise.file);
  assert.strictEqual(new Set(files).size, files.length);
});

test('tous les fichiers référencés existent sur le disque', () => {
  const missing = [];
  for (const exercise of catalog.all) {
    // Un emplacement `pending` attend encore son fichier : c'est voulu.
    const declared = [exercise.background, exercise.pending ? null : exercise.image];
    for (const asset of declared.filter(Boolean)) {
      if (!fs.existsSync(path.join(root, asset))) missing.push(asset);
    }
    for (const item of exercise.gallery || []) {
      if (!fs.existsSync(path.join(root, item.image))) missing.push(item.image);
    }
  }
  if (!fs.existsSync(path.join(root, catalog.commonBackground))) missing.push(catalog.commonBackground);
  assert.strictEqual(missing.join(', '), '');
});

test('chaque exercice a sa page HTML générée', () => {
  const missing = catalog.all
    .map(exercise => `exercices/${exercise.file}.html`)
    .filter(file => !fs.existsSync(path.join(root, file)));
  assert.strictEqual(missing.join(', '), '');
});

test('chaque exercice a son script d’écran', () => {
  const missing = catalog.all
    .map(exercise => `js/screens/${exercise.file}.js`)
    .filter(file => !fs.existsSync(path.join(root, file)));
  assert.strictEqual(missing.join(', '), '');
});

console.log('\nÉcrans');

const screens = fs.readdirSync(path.join(root, 'js/screens')).filter(file => file.endsWith('.js')).sort();

/* Rend les deux écrans d'un exercice : la consigne, puis l'exercice. */
function bothScreens(file) {
  const sandbox = load(`js/screens/${file}`);
  const briefing = sandbox.document.querySelector('#main').innerHTML;
  sandbox.window.AtelierExercise.setValue('briefed', true);
  sandbox.window.AtelierExercise.render();
  return briefing + sandbox.document.querySelector('#main').innerHTML;
}


for (const file of screens) {
  const exercise = catalog.all.find(entry => `${entry.file}.js` === file);

  /* Deux rendus successifs à vérifier : la page de contexte, puis
   * l'exercice lui-même. Ne tester que le premier laisserait passer une
   * erreur dans le second. */
  test(`${file} se monte sans erreur`, () => {
    assert.ok(exercise, `aucun exercice du catalogue ne pointe vers ${file}`);
    const sandbox = load(`js/screens/${file}`);
    const read = () => sandbox.document.querySelector('#main').innerHTML;

    const briefing = read();
    assert.match(briefing, /mission-card/, 'la page de contexte doit s’afficher en premier');
    assert.ok(!/undefined|\[object Object\]/.test(briefing), 'la consigne contient « undefined »');

    // On passe la consigne et on vérifie l'exercice.
    sandbox.window.AtelierExercise.setValue('briefed', true);
    sandbox.window.AtelierExercise.render();
    const html = read();
    assert.ok(!/mission-card/.test(html), 'l’exercice doit remplacer la consigne');
    assert.ok(html.length > 200, 'l’écran ne produit presque rien');
    assert.ok(!/undefined|\[object Object\]/.test(html), 'le rendu contient « undefined » ou « [object Object] »');
  });

  test(`${file} refuse une réponse vide`, () => {
    const sandbox = load(`js/screens/${file}`);
    const engine = sandbox.window.AtelierExercise;
    engine.submit();
    assert.ok(!sandbox.window.AtelierCore.isDone(engine.current.key), 'un exercice vide ne doit pas être marqué terminé');
  });
}

console.log('\nPages de contexte');

test('chaque exercice a sa page de contexte, complète', () => {
  const sandbox = load(`js/screens/${screens[0]}`);
  const briefings = sandbox.window.ATELIER_BRIEFINGS;
  const problems = [];
  for (const exercise of catalog.all) {
    const brief = briefings[exercise.key];
    if (!brief) { problems.push(`${exercise.key} : absente`); continue; }
    if (!brief.situation) problems.push(`${exercise.key} : pas de situation`);
    if (!brief.task) problems.push(`${exercise.key} : pas de consigne`);
    if (!Array.isArray(brief.criteria) || !brief.criteria.length) problems.push(`${exercise.key} : pas de critères`);
  }
  assert.strictEqual(problems.join(' | '), '');
});

test('chaque exercice a son accroche, sa mission et son aperçu', () => {
  const sandbox = load(`js/screens/${screens[0]}`);
  const briefings = sandbox.window.ATELIER_BRIEFINGS;
  const previews = sandbox.window.AtelierPreviews;
  const problems = [];
  for (const exercise of catalog.all) {
    const brief = briefings[exercise.key] || {};
    if (!brief.lede || !brief.lede.key || !brief.lede.rest) problems.push(`${exercise.key} : accroche incomplète`);
    if (!brief.mission) problems.push(`${exercise.key} : pas de mission`);
    if (!brief.method) problems.push(`${exercise.key} : pas de méthode`);
    if (!previews.has(exercise.key)) problems.push(`${exercise.key} : pas d’aperçu`);
  }
  assert.strictEqual(problems.join(' | '), '');
});

/* Une illustration fournie doit apparaître sur la page de contexte : c'est
 * une scène, elle pose le décor mieux qu'un schéma. Les exercices sans
 * illustration gardent leur schéma de mécanique. */
test('les illustrations fournies apparaissent sur leur page de contexte', () => {
  const problems = [];
  for (const exercise of catalog.all) {
    const sandbox = load(`js/screens/${exercise.file}.js`);
    const html = sandbox.document.querySelector('#main').innerHTML;
    const pictures = (html.match(/class="briefing-picture"/g) || []).length;
    // Un emplacement en attente compte pour zéro : le schéma prend le relais.
    const expected = exercise.pending ? 0
      : exercise.gallery ? exercise.gallery.length
      : exercise.image ? 1 : 0;

    if (pictures !== expected) {
      problems.push(`${exercise.key} : ${pictures} illustration(s) affichée(s) pour ${expected} attendue(s)`);
    }
    // Sans illustration, le schéma de mécanique prend le relais.
    if (!expected && !/preview-art/.test(html)) problems.push(`${exercise.key} : ni illustration ni schéma`);
    // Avec illustration, le schéma ne doit pas doubler l'image.
    if (expected && /preview-art/.test(html)) problems.push(`${exercise.key} : illustration et schéma affichés ensemble`);
  }
  assert.strictEqual(problems.join(' | '), '');
});

/* Les emplacements déclarés mais pas encore pourvus doivent rester
 * cohérents : un chemin annoncé, un texte alternatif, et un schéma qui prend
 * le relais tant que le fichier manque. Dès que le PNG est déposé, le
 * drapeau pending doit être retiré pour que l'image s'affiche. */
test('les emplacements en attente sont correctement déclarés', () => {
  const problems = [];
  for (const exercise of catalog.all.filter(entry => entry.pending)) {
    if (!exercise.image) problems.push(`${exercise.key} : pas de chemin annoncé`);
    if (!exercise.alt) problems.push(`${exercise.key} : pas de texte alternatif`);
    if (exercise.image && fs.existsSync(path.join(root, exercise.image))) {
      problems.push(`${exercise.key} : le fichier existe, retirez le drapeau pending`);
    }
  }
  assert.strictEqual(problems.join(' | '), '');
});

test('chaque aperçu produit un dessin exploitable', () => {
  const sandbox = load(`js/screens/${screens[0]}`);
  const previews = sandbox.window.AtelierPreviews;
  const problems = [];
  for (const exercise of catalog.all) {
    const art = previews.preview(exercise.key);
    // Une illustration de famille (moteur/assets/illustrations/apercus/) :
    // son fichier doit exister. Sinon, un dessin tracé, assez fourni.
    const picture = /^<img class="preview-art[^"]*" src="[^"]*assets\/illustrations\/apercus\/([\w-]+\.webp)"/.exec(art);
    if (picture) {
      if (!fs.existsSync(path.join(__dirname, '../../../moteur/assets/illustrations/apercus', picture[1]))) problems.push(`${exercise.key} : illustration ${picture[1]} introuvable`);
      continue;
    }
    if (!art.startsWith('<svg')) { problems.push(`${exercise.key} : ni illustration ni SVG`); continue; }
    // Un dessin presque vide trahit une famille mal paramétrée.
    if (art.length < 600) problems.push(`${exercise.key} : dessin trop pauvre`);
    if (/undefined|NaN/.test(art)) problems.push(`${exercise.key} : valeur manquante dans le tracé`);
  }
  assert.strictEqual(problems.join(' | '), '');
});

test('la consigne cède la place à l’exercice, puis ne revient pas', () => {
  const sandbox = load('js/screens/s2-2-4.js');
  const engine = sandbox.window.AtelierExercise;
  const read = () => sandbox.document.querySelector('#main').innerHTML;

  assert.match(read(), /mission-card/, 'la consigne doit s’afficher en premier');
  assert.match(read(), /data-action="start-exercise"/, 'le bouton Commencer doit être présent');

  engine.setValue('briefed', true);
  engine.render();
  assert.ok(!/mission-card/.test(read()), 'l’exercice doit remplacer la consigne');

  // Un rechargement avec le brouillon ne doit pas réimposer la lecture.
  sandbox.window.AtelierCore.persist();
  const saved = sandbox.localStorage.getItem(catalog.storageKey);
  const again = load('js/screens/s2-2-4.js', { storage: { [catalog.storageKey]: saved } });
  assert.ok(!/mission-card/.test(again.document.querySelector('#main').innerHTML),
    'la consigne ne doit pas réapparaître au rechargement');
});

console.log('\nPlein écran et mise en page');

test('le bouton plein écran est présent sur chaque page d’exercice', () => {
  const missing = catalog.all
    .map(exercise => `exercices/${exercise.file}.html`)
    .filter(file => !fs.readFileSync(path.join(root, file), 'utf8').includes('data-action="fullscreen"'));
  assert.strictEqual(missing.join(', '), '');
});

test('le bouton des commandes clavier est présent sur chaque page', () => {
  const missing = catalog.all
    .map(exercise => `exercices/${exercise.file}.html`)
    .filter(file => !fs.readFileSync(path.join(root, file), 'utf8').includes('data-action="keyboard-help"'));
  assert.strictEqual(missing.join(', '), '');
});

/* Masquer ne doit jamais retirer les commandes du flux : un apprenant au
 * clavier doit pouvoir les atteindre sans avoir activé le mode. */
test('chaque glisser-déposer a son équivalent au clic', () => {
  /* Le glisser-déposer est un confort : chaque dépôt doit aussi pouvoir se
   * faire par un bouton, donc au clavier. */
  const cases = {
    's1-1-1': /data-act="dk-pick"/,
    's3-3-1': /data-act="dk-pick"/,
    's2-2-2': /data-act="mt-zone"/,
    's3-3-2': /data-act="mt-zone"/
  };
  for (const [file, pattern] of Object.entries(cases)) {
    const sandbox = load(`js/screens/${file}.js`);
    sandbox.window.AtelierExercise.setValue('briefed', true);
    sandbox.window.AtelierExercise.render();
    const html = sandbox.document.querySelector('#main').innerHTML;
    assert.match(html, pattern, `${file} : il manque l’équivalent au clic`);
    assert.match(html, /<button[^>]*data-drop=|<button[^>]*data-drag=/, `${file} : les zones ou cartes doivent être des boutons`);
  }
});

test('le bandeau des séries a disparu des pages d’exercice', () => {
  const remaining = catalog.all
    .map(exercise => `exercices/${exercise.file}.html`)
    .filter(file => fs.readFileSync(path.join(root, file), 'utf8').includes('series-bar'));
  assert.strictEqual(remaining.join(', '), '');
});

test('chaque page charge les feuilles de mise en page et de correction', () => {
  const missing = catalog.all
    .map(exercise => `exercices/${exercise.file}.html`)
    .filter(file => {
      const html = fs.readFileSync(path.join(root, file), 'utf8');
      return !html.includes('layout.css') || !html.includes('review.css');
    });
  assert.strictEqual(missing.join(', '), '');
});

console.log('\nSons et intégration');

test('chaque page charge les sons et le mode intégré', () => {
  const pages = [...catalog.all.map(exercise => `exercices/${exercise.file}.html`), 'index.html'];
  const missing = pages.filter(file => {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    return !html.includes('js/sounds.js') || !html.includes('js/embed.js') || !html.includes('css/extras.css');
  });
  assert.strictEqual(missing.join(', '), '');
});

test('le mode intégré se charge avant l’affichage, sans defer', () => {
  const html = fs.readFileSync(path.join(root, `exercices/${catalog.all[0].file}.html`), 'utf8');
  assert.ok(html.includes('<script src="../../../moteur/js/embed.js"></script>'));
});

console.log('\nIcônes');

/* Aucun emoji ni pictogramme décoratif ne doit atteindre l'interface : leur
 * dessin varie d'un système à l'autre, ils sont lus de façon imprévisible par
 * les lecteurs d'écran et ils ne suivent pas la couleur du thème. */
const PICTOGRAMS = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{2190}-\u{21FF}\u{25A0}-\u{25FF}\u{2800}-\u{28FF}]/gu;

test('aucun écran ne rend d’emoji ni de pictogramme', () => {
  const offenders = [];
  for (const file of screens) {
    // La flèche « → » des corrigés rédigés reste de la ponctuation, pas une icône.
    const found = bothScreens(file).replace(/→/gu, '').match(PICTOGRAMS);
    if (found) offenders.push(`${file} : ${[...new Set(found)].join(' ')}`);
  }
  assert.strictEqual(offenders.join(' | '), '');
});

/* Le tiret cadratin est proscrit : deux-points, virgule, parenthèses ou point
 * médian selon le rôle qu'il jouait. */
test('aucun écran n’affiche de tiret cadratin', () => {
  const offenders = [];
  for (const file of screens) {
    if (bothScreens(file).includes('—')) offenders.push(file);
  }
  assert.strictEqual(offenders.join(', '), '');
});

test('aucun fichier source ne contient de tiret cadratin', () => {
  const sources = [
    'index.html',
    ...fs.readdirSync(path.join(root, 'js')).filter(file => file.endsWith('.js')).map(file => `js/${file}`),
    ...screens.map(file => `js/screens/${file}`),
    ...fs.readdirSync(path.join(root, 'css')).map(file => `css/${file}`),
    ...fs.readdirSync(path.join(root, 'exercices')).map(file => `exercices/${file}`)
  ];
  const offenders = sources.filter(file => fs.readFileSync(path.join(root, file), 'utf8').includes('—'));
  assert.strictEqual(offenders.join(', '), '');
});

test('chaque nom d’icône référencé est bien défini', () => {
  const icons = load(`js/screens/${screens[0]}`).window.AtelierIcons;
  const sources = [
    ...fs.readdirSync(path.join(root, 'js')).filter(file => file.endsWith('.js')).map(file => `js/${file}`),
    ...screens.map(file => `js/screens/${file}`)
  ];
  const used = new Set();
  for (const file of sources) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (const match of source.matchAll(/\bicon\(\s*'([a-zA-Z]+)'/g)) used.add(match[1]);
    for (const match of source.matchAll(/symbol:\s*'([a-zA-Z]+)'/g)) used.add(match[1]);
  }
  const unknown = [...used].filter(name => !icons.has(name));
  assert.strictEqual(unknown.join(', '), '', 'icônes référencées mais absentes de js/icons.js');
});

console.log(`\n${passed} test${passed > 1 ? 's' : ''} réussi${passed > 1 ? 's' : ''}, ${failed} en échec.\n`);
process.exit(failed ? 1 : 0);
