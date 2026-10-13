/* LES PAGES D'ACCUEIL D'UN PARCOURS · à relancer après avoir ajouté un module
 * ou changé un titre d'exercice.
 *
 *     node outils/assembler.mjs            (le parcours atelier-vente)
 *     node outils/assembler.mjs <parcours> (un autre parcours)
 *
 * Chaque parcours est un dossier à la racine du dépôt (atelier-vente/…),
 * qui contient ses modules (1-1-1/, 1-1-2/…). Les modules se modifient sur
 * place ; ce script ne copie rien, il régénère seulement, dans le dossier
 * du parcours :
 *   index.html     l'accueil du parcours, une carte par module ;
 *   integrer.html  la page « Intégrer » : un lien et un code d'intégration
 *                  pour chaque module, chaque thème et chaque exercice.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'atelier-vente';
const repo = join(root, slug);
if (!existsSync(repo)) { console.error(`Parcours introuvable : ${slug}`); process.exit(1); }

/* Les modules publiés, dans l'ordre de l'accueil. `source` : le dossier du
 * projet, relatif à ce dépôt. Ajoutez une ligne pour un nouveau module. */
const MODULES = readdirSync(repo).filter(name => /^[0-9]/.test(name) && existsSync(join(repo, name, 'js/catalog.js'))).sort()
  .map(code => ({ code, source: code }));

const KEEP = ['index.html', 'exercices', 'js', 'css', 'assets'];

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* Copie récursive, en sautant les originaux doublés d'une version web. */
function copy(from, to, stats) {
  const info = statSync(from);
  if (info.isDirectory()) {
    mkdirSync(to, { recursive: true });
    for (const name of readdirSync(from)) copy(join(from, name), join(to, name), stats);
    return;
  }
  if (/\.png$/i.test(from) && !/\.web\.png$/i.test(from) && existsSync(from.replace(/\.png$/i, '.web.png'))) { stats.skipped++; return; }
  if (/exercices[\\/]_/.test(from)) return; // pages temporaires de capture
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  stats.files++;
  stats.bytes += info.size;
}

/* Lit le catalogue d'un module sans l'exécuter dans un navigateur. */
function readCatalog(source) {
  const window = {};
  new Function('window', readFileSync(join(source, 'js/catalog.js'), 'utf8'))(window);
  return window.ATELIER_CATALOG;
}

const modules = [];
for (const entry of MODULES) {
  const source = resolve(repo, entry.source);
  if (!existsSync(source)) { console.error(`Module introuvable : ${entry.source}`); process.exit(1); }

  const catalog = readCatalog(source);
  const home = readFileSync(join(source, 'index.html'), 'utf8');
  const intro = catalog.intro || (home.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  modules.push({
    code: entry.code,
    intro,
    series: catalog.series.map(serie => ({
      id: serie.id,
      label: serie.label,
      exercises: serie.exercises.map(exercise => ({ id: exercise.id, file: exercise.file, label: exercise.label }))
    }))
  });
  console.log(`${entry.code} : ${catalog.series.reduce((n, s) => n + s.exercises.length, 0)} exercices`);
}

/* ─────────────────────────── Gabarit commun ──────────────────────────── */

const favicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%231249d8'/%3E%3Cpath d='M9 29 17 10h7l-8 19z' fill='white'/%3E%3Cpath d='m23 19 7 10h-8l-3-5z' fill='%23ff936b'/%3E%3C/svg%3E";
const STYLE = `
  @font-face { font-family: 'Fira Sans'; font-weight: 400; src: url('../moteur/assets/fonts/fira-sans-400.woff2') format('woff2'); font-display: swap; }
  @font-face { font-family: 'Fira Sans'; font-weight: 700; src: url('../moteur/assets/fonts/fira-sans-700.woff2') format('woff2'); font-display: swap; }
  @font-face { font-family: 'Fira Sans'; font-weight: 800; src: url('../moteur/assets/fonts/fira-sans-800.woff2') format('woff2'); font-display: swap; }
  :root { --navy: #13205c; --accent: #1249d8; --tint: #e6eeff; --coral: #ff936b; --muted: #5b6a8f; --line: #dde3f0; --bg: #f8f5f0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Fira Sans', system-ui, sans-serif; color: var(--navy); background: var(--bg); line-height: 1.5; }
  a { color: var(--accent); }
  .top { display: flex; align-items: center; gap: 14px; padding: 18px clamp(16px, 4vw, 64px); background: #fff; border-bottom: 1px solid var(--line); }
  .top strong { font-size: 1.2rem; }
  .top nav { margin-left: auto; display: flex; gap: 18px; }
  .mark { width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(115deg, var(--accent) 55%, var(--coral) 55%); }
  main { max-width: 1240px; margin: 0 auto; padding: 36px clamp(16px, 4vw, 48px) 64px; }
  h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 8px; line-height: 1.1; }
  .lede { color: var(--muted); font-size: 1.15rem; margin: 0 0 28px; max-width: 760px; }
  .card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 22px 24px; box-shadow: 0 6px 18px rgb(20 40 100 / 6%); }
  .button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: 10px; background: var(--accent); color: #fff; font-weight: 700; text-decoration: none; border: 0; font: inherit; font-weight: 700; cursor: pointer; }
  .button.secondary { background: #fff; color: var(--accent); border: 1.5px solid var(--accent); }
  .button.small { padding: 6px 12px; font-size: .88rem; border-radius: 8px; }
  .k { display: inline-block; padding: 3px 10px; border-radius: 12px; background: var(--tint); color: var(--accent); font-weight: 800; font-size: .85rem; }
  footer { text-align: center; color: var(--muted); font-size: .88rem; padding: 0 16px 32px; }
  .sound-toggle { display: inline-flex; align-items: center; gap: 6px; padding: 0; border: 0; background: none; font: inherit; font-weight: 650; font-size: .88rem; color: var(--accent); cursor: pointer; }
  .sound-toggle[aria-pressed="false"] { color: var(--muted); }
`;

const page = (title, body, script = '') => `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1249d8">
  <title>${esc(title)}</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <style>${STYLE}</style>
</head>
<body>
  <header class="top"><span class="mark" aria-hidden="true"></span><strong>L’Atelier Vente</strong>
    <nav><a href="index.html">Les modules</a><a href="integrer.html">Intégrer</a><span data-sound-anchor hidden></span></nav></header>
  ${body}
  <footer>Vos réponses restent dans votre navigateur : rien n’est envoyé à un serveur.</footer>
  ${script}
</body>
</html>
`;

/* ───────────────────────────── Accueil ───────────────────────────────── */

const count = m => m.series.reduce((n, s) => n + s.exercises.length, 0);
const home = page('L’Atelier Vente · Tous les modules', `<main>
  <h1>L’Atelier Vente</h1>
  <p class="lede">${modules.reduce((n, m) => n + count(m), 0)} exercices interactifs de vente, en ${modules.length} modules. Choisissez un module pour enchaîner ses exercices, ou ouvrez la page « Intégrer » pour placer un module ou un exercice dans une autre plateforme.</p>
  <div class="grid">${modules.map(m => `<article class="card module">
    <span class="k">Module ${esc(m.code)}</span>
    <p class="intro">${esc(m.intro)}</p>
    <ul>${m.series.map(s => `<li><strong>${esc(s.label)}</strong> · ${s.exercises.length} exercice${s.exercises.length > 1 ? 's' : ''}</li>`).join('')}</ul>
    <a class="button" href="${esc(m.code)}/index.html">Ouvrir le module (${count(m)} exercices)</a>
  </article>`).join('')}</div>
</main>
<style>
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }
  .module { display: grid; gap: 12px; align-content: start; }
  .module .intro { margin: 0; }
  .module ul { margin: 0; padding-left: 18px; color: var(--muted); font-size: .95rem; }
  .module .button { justify-self: start; margin-top: 4px; }
</style>`, '<script defer src="../moteur/js/sounds.js"></script>'); // sons et musique du menu
writeFileSync(join(repo, 'index.html'), home);

/* ──────────────────────────── Intégrer ───────────────────────────────── */

/* Les adresses sont calculées dans le navigateur, à partir de l'adresse de
 * la page : le site fonctionne quel que soit le nom du compte ou du dépôt. */
const data = JSON.stringify(modules);
const integrate = page('L’Atelier Vente · Intégrer', `<main>
  <h1>Intégrer les exercices</h1>
  <p class="lede">Deux façons de placer les exercices dans une autre plateforme (LMS, Moodle, site, Notion…) : un module entier, ou un seul thème du module (ses exercices, avec leur navigation). Chaque thème a son code d’intégration, affiché en entier : copiez-le et collez-le dans un bloc HTML de votre LMS.</p>
  <section class="card how">
    <h2>Mode d’emploi</h2>
    <ol>
      <li><strong>Lien</strong> : à coller tel quel dans un bouton ou une activité « URL ». Les exercices s’ouvrent en plein écran.</li>
      <li><strong>Code d’intégration</strong> : à coller dans un bloc HTML (« intégrer », « iframe », « code source »). Un thème = une activité du LMS. Le cadre mesure 900 pixels de haut, avec une barre de défilement si l’exercice est plus long.</li>
      <li><strong>Hauteur automatique</strong> (facultatif) : collez aussi la ligne ci-dessous juste après le code d’intégration, dans le même bloc HTML. C’est la même pour tous les thèmes. Si la plateforme refuse les scripts, le code d’intégration seul fonctionne quand même.
        <pre class="code" id="resize-code"></pre>
        <button type="button" class="button small secondary" id="resize-copy">Copier la ligne de hauteur automatique</button></li>
      <li>Les réponses de l’apprenant restent dans son navigateur. Certains navigateurs bloquent cette mémoire dans un cadre intégré : les exercices fonctionnent, mais le brouillon n’est pas gardé d’une visite à l’autre.</li>
    </ol>
  </section>
  <p class="filter"><label for="filter">Rechercher un thème ou un exercice</label><input id="filter" type="search" placeholder="Titre, série, numéro…"></p>
  <div id="modules"></div>
</main>
<style>
  .how h2 { margin-top: 0; }
  .how ol { margin: 0; padding-left: 20px; display: grid; gap: 6px; }
  .filter { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 26px 0 8px; }
  .filter input { flex: 1; min-width: 220px; padding: 10px 14px; border: 1.5px solid var(--line); border-radius: 10px; font: inherit; }
  .module { margin-top: 22px; }
  .module-head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .module-head h2 { margin: 0; font-size: 1.5rem; }
  .module-head .actions { margin-left: auto; }
  .actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .serie-head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 20px 0 6px; }
  .serie-head .actions { margin-left: auto; }
  .serie h3 { font-size: 1rem; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; margin: 0; }
  .serie-head .note { color: var(--muted); font-size: .9rem; }
  .serie[hidden] { display: none; }
  .code { margin: 8px 0; padding: 10px 12px; background: var(--soft, #f3f5fa); border: 1px solid var(--line); border-radius: 8px; font: .78rem/1.45 ui-monospace, Consolas, monospace; white-space: pre-wrap; word-break: break-all; user-select: all; cursor: text; }
  .how .code { margin-top: 10px; }
  .row { display: grid; grid-template-columns: 56px minmax(0, 1fr); align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--line); }
  .row .id { font-weight: 800; color: var(--accent); }
  .row[hidden] { display: none; }
  .copied { background: #1b6b47 !important; border-color: #1b6b47 !important; color: #fff !important; }
  @media (max-width: 760px) { .row { grid-template-columns: 44px minmax(0, 1fr); } }
</style>`, `<script>
(function () {
  'use strict';
  var MODULES = ${data};
  var base = location.href.replace(/[^/]*([?#].*)?$/, '');
  var esc = function (v) { return String(v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var resize = '<script>if(!window.atelierVenteResize){window.atelierVenteResize=1;addEventListener("message",function(e){if(!e.data||e.data.type!=="atelier-vente:height")return;document.querySelectorAll("iframe[data-atelier-vente]").forEach(function(f){if(f.contentWindow===e.source)f.style.height=e.data.height+"px";});});}<' + '/script>';
  function iframe(url, title) {
    return '<iframe src="' + url + '" title="' + esc(title) + '" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>';
  }
  function actions(url, title) {
    return '<span class="actions">'
      + '<a class="button small secondary" href="' + url + '" target="_blank" rel="noopener">Aperçu</a>'
      + '<button type="button" class="button small secondary" data-copy="' + esc(url) + '">Copier le lien</button>'
      + '<button type="button" class="button small" data-copy="' + esc(iframe(url, title)) + '">Copier le code d’intégration</button></span>';
  }
  document.getElementById('modules').innerHTML = MODULES.map(function (m) {
    var moduleUrl = base + m.code + '/index.html?embed=module';
    return '<section class="card module" data-module="' + m.code + '"><div class="module-head"><span class="k">Module ' + m.code + '</span><h2>Tous les exercices d’un coup</h2>'
      + actions(moduleUrl, 'L’Atelier Vente, module ' + m.code) + '</div>'
      + m.series.map(function (s) {
        var themeUrl = base + m.code + '/index.html?embed=module&theme=' + s.id;
        var themeTitle = 'L’Atelier Vente ' + m.code + ' · ' + s.label;
        return '<div class="serie"><div class="serie-head"><h3>' + esc(s.label) + '</h3><span class="note">Le thème entier · ' + s.exercises.length + ' exercice' + (s.exercises.length > 1 ? 's' : '') + '</span>' + actions(themeUrl, themeTitle) + '</div><pre class="code">' + esc(iframe(themeUrl, themeTitle)) + '</pre>' + s.exercises.map(function (x) {
          return '<div class="row" data-search="' + esc((m.code + ' ' + s.label + ' ' + x.id + ' ' + x.label).toLowerCase()) + '"><span class="id">' + esc(x.id) + '</span><span>' + esc(x.label) + '</span></div>';
        }).join('') + '</div>';
      }).join('') + '</section>';
  }).join('');

  document.getElementById('resize-code').textContent = resize;
  document.getElementById('resize-copy').setAttribute('data-copy', resize);

  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy]');
    if (!button) return;
    var text = button.getAttribute('data-copy');
    var done = function () {
      var label = button.textContent;
      button.classList.add('copied'); button.textContent = 'Copié';
      setTimeout(function () { button.classList.remove('copied'); button.textContent = label; }, 1600);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { prompt('Copiez :', text); });
    else { prompt('Copiez :', text); }
  });

  document.getElementById('filter').addEventListener('input', function (event) {
    var q = event.target.value.trim().toLowerCase();
    document.querySelectorAll('.row').forEach(function (row) { row.hidden = q && row.getAttribute('data-search').indexOf(q) === -1; });
    document.querySelectorAll('.serie').forEach(function (serie) { serie.hidden = !serie.querySelector('.row:not([hidden])'); });
  });
})();
</script>`);
writeFileSync(join(repo, 'integrer.html'), integrate);


console.log('\nAccueil et page « Intégrer » régénérés.');

/* ───────────────────── Accueil général : la liste des parcours ─────────── */

const parcours = readdirSync(root).filter(name => !name.startsWith('.') && existsSync(join(root, name, 'index.html'))
  && readdirSync(join(root, name)).some(m => existsSync(join(root, name, m, 'js/catalog.js')))).sort();
const titleOf = name => (readFileSync(join(root, name, 'index.html'), 'utf8').match(/<h1>([^<]*)<\/h1>/) || [])[1] || name;
const ledeOf = name => (readFileSync(join(root, name, 'index.html'), 'utf8').match(/<p class="lede">([^<]*)/) || [])[1] || '';
writeFileSync(join(root, 'index.html'), `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Les parcours</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <style>${STYLE.replaceAll("url('../moteur/", "url('moteur/")}</style>
</head>
<body>
  <header class="top"><span class="mark" aria-hidden="true"></span><strong>Les parcours</strong></header>
  <main>
    <h1>Les parcours</h1>
    <div class="grid">${parcours.map(name => `<article class="card module">
      <span class="k">${esc(name)}</span>
      <h2>${titleOf(name)}</h2>
      <p class="intro">${ledeOf(name).split('.')[0]}.</p>
      <a class="button" href="${esc(name)}/index.html">Ouvrir le parcours</a>
    </article>`).join('')}</div>
  </main>
</body>
</html>
`);
console.log(`Accueil général : ${parcours.length} parcours.`);
