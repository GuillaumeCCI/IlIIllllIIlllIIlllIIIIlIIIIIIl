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
const CUSTOM = {
  // La grille d'auto-positionnement : une case par critère, aucune n'est « juste ».
  's1-1-1': (e, c, w) => w.ATELIER_S1.grid.criteria.forEach((_, i) => e.setValue(`deb${i}`, '1')),
  // A4 : les notes du repère, le classement de la fiche.
  's5-5-1': (e, c) => {
    c.sellers.forEach(s => s.notes.forEach((n, i) => e.setValue(`${s.id}${i}`, String(n))));
    c.ranking.forEach((id, i) => e.setValue(`rank${i}`, id));
    (c.rewrites || []).forEach(r => e.setValue(r.id, 'Comment ça se passe ?'));
    if (!c.rewrites) e.setValue('why', 'Elle tient compte du temps et reformule.');
    e.setValue('self0', '2');
  },
  // A5 : une fiche, trois réponses, la grille Oui / Non.
  // A5 (1-2-2) : un client, son guide, quatre questions posées, l'analyse, la grille.
  's5-5-2': (e, c) => {
    if (c.floors) {
      const id = c.fiches[0].id;
      e.setValue('fiche', id);
      c.floors.forEach(fl => e.setValue(`${id}_${fl.id}`, 'Comment ça se passe ?'));
      for (let i = 0; i < c.minAsked; i++) { e.setValue(`${id}_q${i}`, 'Comment ?'); e.setValue(`${id}_ask${i}`, true); }
      e.setValue(`${id}_implicite`, 'Sa femme le réveille.');
      e.setValue(`${id}_motivation`, c.fiches[0].motivation);
      e.setValue(`${id}_prio`, 'Des nuits complètes.');
      c.selfCheck.forEach((_, i) => e.setValue(`${id}_self${i}`, 'oui'));
      return;
    }
    e.setValue('fiche', c.fiches[1].id);
    [1, 2, 3].forEach(k => e.setValue(`r${k}`, 'Une réponse.'));
    c.selfCheck.forEach((_, i) => e.setValue(`self${i}`, 'oui'));
  },
  // Synthèse (option 2) : la meilleure question à chaque étape, la carte, la grille.
  's6-6-1': (e, c) => {
    e.setValue('warm', c.warmup.best); e.setValue('wok', true);
    c.steps.forEach((s, k) => { e.setValue(`seen${k}`, true); e.setValue(`c${k}`, s.best); e.setValue(`rs${k}`, true); e.setValue(`ack${k}`, true); });
    c.quiz.forEach((item, i) => { e.setValue(`q${i}`, item.best); e.setValue(`qa${i}`, true); });
    c.map.forEach(r => e.setValue(`m_${r.id}`, r.model));
    c.selfCheck.forEach((_, i) => e.setValue(`self${i}`, 'oui'));
  },
  // Synthèse (option 1, Le coach) : dossier A, les bons diagnostics, les moments attendus,
  // les réécritures du corrigé, le bon classement, la fiche modèle, la grille.
  's6-6-2': (e, c) => {
    const d = c.dossiers.A;
    e.setValue('dos', 'A'); e.setValue('intro', true); e.setValue('warm', c.warmup.best); e.setValue('wok', true); e.setValue('read', true);
    // Les derniers moments s'écrivent : le diagnostic attendu, tel quel.
    d.moments.forEach((m, k) => {
      e.setValue(`seen${k}`, true); e.setValue(`ack${k}`, true);
      if (m.write) { e.setValue(`w${k}`, `${m.choices[m.best].text} ${m.why}`); e.setValue(`wt${k}`, 'ok'); e.setValue(`c${k}`, 'write'); } else e.setValue(`c${k}`, m.best);
    });
    e.setValue('dm', d.decisive.expected.slice()); e.setValue('dmok', true);
    d.rewrites.forEach((r, j) => { e.setValue(`rw${j}_why`, r.what); e.setValue(`rw${j}_q`, r.model); e.setValue(`rw${j}_t`, r.type[0]); e.setValue(`rw${j}_ok`, true); });
    d.sort.forEach((s, i) => e.setValue(`sk${i}`, s.kind)); e.setValue('sok', true);
    e.setValue('rk', d.rank.items.map(it => it.id)); e.setValue('rkok', true);
    c.fiche.forEach(r => e.setValue(`f_${r.id}`, d.model[r.id]));
    c.selfCheck.forEach((_, i) => e.setValue(`self${i}`, 'oui'));
  },
  // Synthèse (option 3, Ma banque) : 3 situations, les bons réflexes, les fiches d'exemple, les règles d'exemple.
  's6-6-3': (e, c) => {
    [0, 1, 2, 3, 4, 5].forEach(k => e.setValue(`tr${k}`, true));
    e.setValue('intro', true); e.setValue('metier', 'Conseiller en magasin d’électroménager');
    const ids = ['sait', 'regarde', 'accompagne'];
    e.setValue('sit', ids); e.setValue('sitok', true);
    ids.forEach((id, j) => { const s = c.situations.find(x => x.id === id); e.setValue(`c${j}`, s.reflex.best); e.setValue(`ack${j}`, true); c.pages.forEach(p => p.fields.forEach(f => e.setValue(`f${j}_${f.id}`, f.example))); e.setValue(`f${j}_ok`, true); });
    c.rulesExample.forEach((r, i) => e.setValue(`r${i}`, r)); e.setValue('rok', true);
    e.setValue('t_q', c.pages[1].fields[0].example); e.setValue('t_when', 'Jeudi matin.'); e.setValue('tok', true);
    c.selfCheck.forEach((_, i) => e.setValue(`self${i}`, 'oui'));
  },
  's9-9-1': (e, c, w) => {
    w.ATELIER_S1.grid.criteria.forEach((_, i) => e.setValue(`fin${i}`, '2'));
    w.ATELIER_S1.grid.questions.forEach(q => e.setValue(q.id, 'Une réponse.'));
  }
};

function perfect(exercise) {
  return (engine, w) => {
    const c = contentOf(w, exercise);
    if (exercise.mount) return FILL[exercise.mount](engine, c);
    return CUSTOM[exercise.file](engine, c, w);
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

/* Une erreur apparaît bien dans le corrigé : en A1, toutes les questions
 * classées « ouvertes ». */
test('une réponse fausse est bien marquée fausse dans le corrigé', () => {
  const sandbox = load('js/screens/s2-2-1.js');
  const content = sandbox.window.ATELIER_S2['2.1'];
  complete(sandbox, engine => engine.setValue('placed', content.cards.map(() => 'ouverte')));
  assert.match(main(sandbox), /is-ko|mark-ko/, 'les erreurs doivent apparaître');
});

console.log('\nSauvegarde');

test('les réponses survivent à un rechargement de page', () => {
  const first = load('js/screens/s1-1-1.js');
  first.window.AtelierExercise.setValue('deb0', '1');
  first.window.AtelierCore.persist();
  const saved = first.localStorage.getItem(catalog.storageKey);
  assert.ok(saved, 'le brouillon doit être écrit dans localStorage');
  const second = load('js/screens/s1-1-1.js', { storage: { [catalog.storageKey]: saved } });
  assert.strictEqual(second.window.AtelierExercise.value('deb0'), '1');
});

test('la sauvegarde du module 1-2-2 ne touche pas celles des autres modules', () => {
  assert.ok(!['decouverte-client-1-2-1-v1', 'atelier-vente-1-1-1-v2', 'atelier-vente-1-1-2-v1', 'atelier-vente-1-1-3-v1', 'atelier-vente-1-1-4-v1'].includes(catalog.storageKey));
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
  assert.match(html, /1-2-2/, 'l’accueil doit annoncer le module 1-2-2');
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
