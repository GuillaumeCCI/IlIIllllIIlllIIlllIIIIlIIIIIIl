/* LES PAGES « GUIDE FORMATEUR » (fiches d'accompagnement pédagogique).
 *
 *     node decouverte-client/tools/build-guides.cjs
 *
 * Écrit decouverte-client/guide-1-2-1.html et guide-1-2-2.html à partir de
 * tools/guides-contenu.cjs (la même source que les documents Word mis à
 * jour). L'habillage reprend celui de la page « Intégrer » (son premier
 * bloc <style>), pour rester cohérent avec l'accueil du parcours.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const here = path.resolve(__dirname, '..');
const guides = require('./guides-contenu.cjs');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const integrer = fs.readFileSync(path.join(here, 'integrer.html'), 'utf8');
const BASE = /<style>([\s\S]*?)<\/style>/.exec(integrer)[1];
const FAVICON = /<link rel="icon"[^>]*>/.exec(integrer)[0];

// Le titre de chaque exercice, lu dans le catalogue du module.
function catalogOf(code) {
  const sandbox = {};
  new Function('window', fs.readFileSync(path.join(here, code, 'js/catalog.js'), 'utf8'))(sandbox);
  const map = {};
  sandbox.ATELIER_CATALOG.series.forEach(s => s.exercises.forEach(e => { map[e.file] = `${e.id} ${e.label}`; }));
  return map;
}

/* Les puces « en ligne » : un lien vers chaque exercice de l'étape. */
const linksOf = (code, files, cat) => (files.length ? `<span class="ex-links">${files.map(f => `<a href="${code}/exercices/${f}.html">${esc(cat[f] || f)}</a>`).join('')}</span>` : '');
// Le nom de l'étape sans « · en ligne … » (les liens le disent mieux).
const stepName = s => s.replace(/ · (en ligne|sur document).*$/, '');

const STYLE = `${BASE}
  .guide h2 { margin: 34px 0 12px; font-size: 1.35rem; }
  .guide h2 span { color: var(--accent); margin-right: 6px; }
  .guide .card + .card, .guide .note + .card { margin-top: 14px; }
  .guide table { width: 100%; border-collapse: collapse; font-size: .95rem; }
  .guide th { text-align: left; padding: 10px 12px; color: var(--muted); font-size: .78rem; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; border-bottom: 2px solid var(--line); }
  .guide td { padding: 12px; vertical-align: top; border-bottom: 1px solid var(--line); }
  .guide tr:last-child td { border-bottom: 0; }
  .guide td.label { width: 26%; font-weight: 700; }
  .guide .table-card { padding: 6px 12px; overflow-x: auto; }
  .guide .note { margin: 12px 4px 0; color: var(--muted); font-size: .92rem; }
  .guide .prereq { margin: 12px 4px 0; }
  .guide .marks td, .guide .marks th { text-align: center; }
  .guide .marks td:first-child, .guide .marks th:first-child { text-align: left; }
  .guide .marks .dot { color: var(--accent); font-size: 1.1rem; }
  .guide .ex-links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
  .guide .ex-links a { padding: 3px 10px; border-radius: 999px; background: var(--tint); color: var(--accent); font-size: .82rem; font-weight: 700; text-decoration: none; }
  .guide .ex-links a:hover { background: #d5e2ff; }
  .guide ul.plain { margin: 0; padding-left: 20px; display: grid; gap: 6px; }
  .guide .tag { display: inline-block; margin-bottom: 6px; color: var(--muted); font-size: .8rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
  .guide .top-links { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 8px; }
  @media print { .top, footer, .top-links { display: none; } body { background: #fff; } .card { box-shadow: none; } }
`;

function render(g) {
  const cat = catalogOf(g.code);
  const certRows = [];
  g.certLinks.forEach(([from, to, text]) => {
    for (let i = from; i < to; i++) {
      const [name, rncp] = g.certs[i];
      certRows.push(`<tr><td>${esc(name)}</td><td>${esc(rncp)}</td>${i === from ? `<td rowspan="${to - from}">${esc(text)}</td>` : ''}</tr>`);
    }
  });
  const mark = m => (m ? `<span class="dot" aria-label="${m === '●' ? 'objectif travaillé principalement' : 'objectif mobilisé en appui'}">${m}</span>` : '');
  const body = `<main class="guide">
  <p class="top-links"><a class="button small secondary" href="${g.code}/index.html">Ouvrir le module ${esc(g.code)}</a><a class="button small secondary" href="integrer.html">Intégrer les exercices</a><button type="button" class="button small secondary" onclick="window.print()">Imprimer</button></p>
  <span class="tag">${esc(g.header)}</span>
  <h1>${esc(g.title)}</h1>
  <p class="lede">${esc(g.lead)}</p>

  <h2><span>1.</span>Le module en bref</h2>
  <div class="card table-card"><table><tbody>${g.brief.map(([k, v]) => `<tr><td class="label">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>

  <h2><span>2.</span>À qui s’adresse ce module</h2>
  <div class="card table-card"><table><thead><tr><th>Certification</th><th>RNCP</th><th>Lien avec le module · supports qui lui parleront le plus</th></tr></thead><tbody>${certRows.join('')}</tbody></table></div>
  <p class="note">${esc(g.align)}</p>
  <p class="prereq">${esc(g.prereq)}</p>

  <h2><span>3.</span>Comment le module est construit</h2>
  <div class="card table-card"><table><thead><tr><th>Étape</th><th>Niveau de Bloom</th><th>Durée</th><th>Correction</th><th>Dépôt</th></tr></thead><tbody>${g.steps.map(([name, bloom, time, corr, dep, files]) => `<tr><td><strong>${esc(stepName(name))}</strong>${linksOf(g.code, files, cat)}${/sur document/.test(name) ? '<span class="note">Sur document (pas d’exercice en ligne)</span>' : ''}</td><td>${esc(bloom)}</td><td>${esc(time)}</td><td>${esc(corr)}</td><td>${esc(dep)}</td></tr>`).join('')}</tbody></table></div>
  <div class="card table-card"><table class="marks"><thead><tr><th>Objectif pédagogique</th>${g.objectives.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${g.objectives.rows.map(r => `<tr><td>${esc(r[0])}</td>${r.slice(1).map(m => `<td>${mark(m)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <p class="note">● objectif travaillé principalement · ○ objectif mobilisé en appui</p>
  <div class="card"><strong>Quelques choix de conception</strong><ul class="plain" style="margin-top:8px">${g.choices.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>

  <h2><span>4.</span>Prise en main dans votre plateforme de formation</h2>
  <div class="card table-card"><table><thead><tr><th>Élément</th><th>Ce que nous suggérons, et pourquoi</th></tr></thead><tbody>${g.platform.map(([k, v]) => `<tr><td class="label">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>
  <p class="prereq">${esc(g.followUp)}</p>
  <p class="prereq">${esc(g.yourChoices)}</p>

  <h2><span>5.</span>Points de vigilance</h2>
  <div class="card table-card"><table><thead><tr><th>Point</th><th>Ce que nous avons observé ou anticipé → piste</th></tr></thead><tbody>${g.watch.map(([k, v]) => `<tr><td class="label">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div>

  <h2><span>6.</span>Points à reprendre en cours</h2>
  <p class="prereq" style="margin-top:0">${esc(g.classIntro)}</p>
  <div class="card table-card"><table><thead><tr><th>Difficulté · où la repérer</th><th>Ce qui la signale</th><th>Idée d’animation</th></tr></thead><tbody>${g.difficulties.map(([a, b, c]) => `<tr><td class="label">${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join('')}</tbody></table></div>

  <h2><span>7.</span>Différencier</h2>
  <div class="card"><ul class="plain">${g.differentiate.map(d => `<li>${esc(d)}</li>`).join('')}</ul></div>
  <p class="note">${esc(g.feedback)}</p>
</main>`;
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#1249d8">
  <meta name="robots" content="noindex, nofollow">
  <title>Guide formateur · ${esc(g.code)} · L’Atelier Vente · Découverte client</title>
  ${FAVICON}
  <style>${STYLE}</style>
</head>
<body>
  <header class="top"><span class="mark" aria-hidden="true"></span><strong>L’Atelier Vente · Découverte client</strong>
    <nav><a href="index.html">Les modules</a><a href="integrer.html">Intégrer</a></nav></header>
  ${body}
  <footer>Fiche d’accompagnement pédagogique · guide pour le formateur · mise à jour de novembre 2026.</footer>
</body>
</html>
`;
}

for (const g of Object.values(guides)) {
  const file = path.join(here, `guide-${g.code}.html`);
  fs.writeFileSync(file, render(g));
  console.log(path.relative(here, file));
}
