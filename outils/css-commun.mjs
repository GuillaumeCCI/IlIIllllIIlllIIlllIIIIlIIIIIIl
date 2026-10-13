/* ANALYSE / SÉPARATION d'une feuille de style présente dans tous les modules.
 *
 *     node outils/css-commun.mjs css/extras.css            (analyse seule)
 *     node outils/css-commun.mjs css/extras.css separer    (écrit les fichiers)
 *
 * Découpe chaque copie en règles (une règle, un @media, un commentaire…).
 * Les règles identiques dans TOUS les modules vont dans
 * moteur/css/<nom>-commun.css, dans leur ordre d'origine ; chaque module ne
 * garde que ses règles propres. Les pages chargent la feuille commune juste
 * avant celle du module.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [file, action] = process.argv.slice(2);
const modules = [];
for (const p of readdirSync(root).filter(n => !n.startsWith('.') && !['moteur', 'outils', 'captures', 'node_modules'].includes(n))) {
  try { for (const m of readdirSync(join(root, p))) if (existsSync(join(root, p, m, file))) modules.push(join(root, p, m)); } catch { /* fichier */ }
}

/* Une feuille en blocs : chaque bloc garde son commentaire d'en-tête. */
function blocks(css) {
  const parts = []; let i = 0, pendingComment = '';
  while (i < css.length) {
    if (css.startsWith('/*', i)) { const e = css.indexOf('*/', i) + 2; pendingComment += css.slice(i, e) + '\n'; i = e; continue; }
    if (/\s/.test(css[i])) { i++; continue; }
    let depth = 0, e = i;
    for (; e < css.length; e++) {
      if (css.startsWith('/*', e)) { e = css.indexOf('*/', e) + 1; continue; }
      if (css[e] === '{') depth++;
      else if (css[e] === '}') { depth--; if (depth === 0) { e++; break; } }
      else if (css[e] === ';' && depth === 0) { e++; break; }
    }
    parts.push({ comment: pendingComment.trim(), rule: css.slice(i, e).trim() }); pendingComment = ''; i = e;
  }
  if (pendingComment.trim()) parts.push({ comment: pendingComment.trim(), rule: '' });
  return parts;
}
const norm = rule => rule.replace(/\s+/g, ' ').trim();

const sheets = modules.map(dir => ({ dir, parts: blocks(readFileSync(join(dir, file), 'utf8').replace(/\r\n/g, '\n')) }));
const counts = new Map();
for (const s of sheets) for (const r of new Set(s.parts.filter(p => p.rule).map(p => norm(p.rule)))) counts.set(r, (counts.get(r) || 0) + 1);
const common = new Set([...counts].filter(([, n]) => n === sheets.length).map(([r]) => r));

console.log(`${file} : ${sheets.length} modules`);
for (const s of sheets) {
  const total = s.parts.filter(p => p.rule).length;
  const shared = s.parts.filter(p => p.rule && common.has(norm(p.rule))).length;
  // Une règle propre placée AVANT une règle commune : l'ordre change à la séparation.
  const lastCommon = s.parts.map(p => p.rule && common.has(norm(p.rule))).lastIndexOf(true);
  const before = s.parts.filter((p, k) => p.rule && !common.has(norm(p.rule)) && k < lastCommon).length;
  console.log(`  ${s.dir.slice(root.length + 1)} : ${shared}/${total} règles communes, ${total - shared} propres (dont ${before} placées avant une règle commune)`);
}

// Une image citée par une règle commune (url('../assets/…')) doit exister dans
// moteur/assets/ : le chemin se lit depuis la feuille, qui change de dossier.
const missing = [...new Set([...common].flatMap(r => [...r.matchAll(/url\(['"]?\.\.\/(assets\/[^'")]+)/g)].map(m => m[1])))]
  .filter(asset => !existsSync(join(root, 'moteur', asset)));
if (missing.length) console.log(`  ATTENTION, images à mettre dans moteur/ :\n    ${missing.join('\n    ')}`);

if (action === 'separer') {
  if (missing.length) { console.error('Séparation annulée : placez d’abord ces images dans moteur/assets/.'); process.exit(1); }
  const name = basename(file, '.css');
  const first = sheets[0].parts.filter(p => p.rule && common.has(norm(p.rule)));
  writeFileSync(join(root, 'moteur/css', `${name}-commun.css`),
    `/* ${name}-commun.css · règles communes à tous les modules (séparées de\n   ${file} par outils/css-commun.mjs). Chargée juste avant la feuille propre\n   à chaque module. */\n\n` + first.map(p => (p.comment ? p.comment + '\n' : '') + p.rule).join('\n\n') + '\n');
  for (const s of sheets) {
    const own = s.parts.filter(p => !p.rule || !common.has(norm(p.rule)));
    writeFileSync(join(s.dir, file), `/* Règles propres à ce module. Les règles communes sont dans\n   moteur/css/${name}-commun.css, chargée juste avant. */\n\n` + own.map(p => (p.comment ? p.comment + '\n' : '') + p.rule).join('\n\n').trim() + '\n');
  }
  // Les pages chargent la feuille commune juste avant celle du module.
  let pages = 0;
  for (const s of sheets) {
    const link = up => new RegExp(`(\\s*)<link rel="stylesheet" href="${up}${file.replace('.', '\\.')}">`);
    const add = (path, up, toEngine) => {
      if (!existsSync(path)) return;
      const text = readFileSync(path, 'utf8');
      if (text.includes(`moteur/css/${name}-commun.css`)) return;
      const out = text.replace(link(up), (m, space) => `${space}<link rel="stylesheet" href="${toEngine}moteur/css/${name}-commun.css">${m}`);
      if (out !== text) { writeFileSync(path, out); pages++; }
    };
    add(join(s.dir, 'index.html'), '', '../../');
    for (const f of readdirSync(join(s.dir, 'exercices')).filter(f => f.endsWith('.html'))) add(join(s.dir, 'exercices', f), '../', '../../../');
    add(join(s.dir, 'tools/build-pages.mjs'), '../', '../../../');
  }
  console.log(`Écrit : moteur/css/${name}-commun.css (${first.length} règles) et ${sheets.length} feuilles de module ; ${pages} pages relient la feuille commune.`);
}
