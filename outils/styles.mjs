/* COMPARE LES STYLES CALCULÉS de toutes les pages entre deux versions du site.
 *
 *     node outils/styles.mjs <site-avant> <site-après>
 *     ex. node outils/styles.mjs http://127.0.0.1:4183 http://127.0.0.1:4182
 *
 * Pour chaque page (consigne puis écran d'exercice), relève le style appliqué
 * à chaque élément visible (couleurs, fonds, bordures, tailles, marges,
 * polices, grilles…) dans les deux versions, ouvertes en parallèle, et liste
 * les écarts. Les propriétés animées (opacité, transformations) sont
 * ignorées : le relevé ne dépend pas du moment où il est pris.
 * ONLY=texte limite aux pages dont le nom contient ce texte.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [before, after] = process.argv.slice(2);
if (!before || !after) { console.error('Usage : node outils/styles.mjs <site-avant> <site-après>'); process.exit(1); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);

const PROPS = ['display', 'position', 'color', 'background-color', 'background-image', 'background-size', 'background-position',
  'border-top-width', 'border-top-style', 'border-top-color', 'border-bottom-width', 'border-bottom-color', 'border-left-width', 'border-left-color',
  'border-top-left-radius', 'box-shadow', 'padding-top', 'padding-left', 'padding-bottom', 'margin-top', 'margin-bottom',
  'font-size', 'font-weight', 'font-family', 'line-height', 'text-align', 'text-transform', 'letter-spacing',
  'grid-template-columns', 'gap', 'flex-direction', 'justify-content', 'align-items', 'width', 'max-width', 'min-height', 'z-index', 'cursor', 'visibility'];

const DUMP = `(() => {
  const props = ${JSON.stringify(PROPS)};
  const out = {};
  const nodes = [...document.querySelectorAll('body *')].filter(n => !['SCRIPT', 'STYLE', 'LINK', 'META', 'path', 'circle', 'rect', 'g', 'ellipse', 'line', 'polyline'].includes(n.tagName));
  const key = n => { const parts = []; for (let e = n; e && e !== document.body; e = e.parentElement) { const i = [...e.parentElement.children].indexOf(e); parts.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\\s+/).filter(c => !/^is-(lifted|over|dragging)/.test(c)).sort().join('.') : '') + ':' + i); } return parts.join('>'); };
  for (const n of nodes) { const cs = getComputedStyle(n); const row = {}; for (const p of props) row[p] = cs.getPropertyValue(p); for (const pe of ['::before', '::after']) { const c = getComputedStyle(n, pe); if (c.content && c.content !== 'none' && c.content !== 'normal') for (const p of ['content', 'background-image', 'background-color', 'width', 'height', 'color', 'border-top-color']) row[pe + p] = c.getPropertyValue(p); } out[key(n)] = row; }
  return out;
})()`;

async function browser() {
  const port = 9200 + Math.floor(Math.random() * 90);
  const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'sty-'))}`, 'about:blank'], { stdio: 'ignore' });
  let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
  const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pending = {};
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id]; }
    if (m.method === 'Page.javascriptDialogOpening') ws.send(JSON.stringify({ id: ++id, method: 'Page.handleJavaScriptDialog', params: { accept: true } })); });
  const send = (method, params = {}) => new Promise((r, reject) => { const n = ++id; pending[n] = r; ws.send(JSON.stringify({ id: n, method, params })); setTimeout(() => { if (pending[n]) { delete pending[n]; reject(new Error(`délai : ${method}`)); } }, 30000); });
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: "try { localStorage.setItem('atelier-vente-musique', 'off'); localStorage.setItem('atelier-vente-sons', 'off'); } catch {}" });
  const ev = async x => (await send('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true }))?.result?.value;
  return { ev, send, close: () => { ws.close(); proc.kill(); } };
}

const pages = [];
for (const parcours of readdirSync(root).filter(n => !n.startsWith('.') && !['moteur', 'outils', 'captures', 'node_modules'].includes(n)).sort()) {
  let modules = []; try { modules = readdirSync(join(root, parcours)).filter(m => existsSync(join(root, parcours, m, 'js/catalog.js'))).sort(); } catch { continue; }
  for (const m of modules) {
    pages.push({ name: `${m} accueil`, url: `/${parcours}/${m}/index.html`, play: false });
    for (const f of readdirSync(join(root, parcours, m, 'exercices')).filter(f => f.endsWith('.html') && !f.startsWith('_')).sort())
      pages.push({ name: `${m} ${f.replace('.html', '')}`, url: `/${parcours}/${m}/exercices/${f}`, play: true });
  }
}
const list = process.env.ONLY ? pages.filter(p => p.name.includes(process.env.ONLY)) : pages;

let A, B; const report = []; let checked = 0;
const reopen = async () => { A?.close(); B?.close(); [A, B] = await Promise.all([browser(), browser()]); };
for (const [i, p] of list.entries()) {
  if (i % 12 === 0) await reopen(); // un navigateur neuf régulièrement : il s'alourdit sinon
  try {
    const phase = async (b, base, play) => {
      await b.send('Page.navigate', { url: base + p.url }); await sleep(1800);
      if (play) { await b.ev(`document.querySelector('[data-action="start-exercise"]')?.click()`); await sleep(3500); }
      return b.ev(DUMP);
    };
    for (const play of p.play ? [false, true] : [false]) {
      const [x, y] = await Promise.all([phase(A, before, play), phase(B, after, play)]);
      const diffs = [];
      for (const k of Object.keys(x)) {
        if (!y[k]) continue;
        // Une image déplacée dans le moteur garde le même fichier : seul son nom compte.
        const same = v => String(v).replace(/url\("[^"]*\/([^"/]+)"\)/g, 'url($1)');
        for (const prop of Object.keys(x[k])) if (same(x[k][prop]) !== same(y[k][prop])) diffs.push(`${k.split('>').slice(-2).join(' > ')} { ${prop}: ${x[k][prop]} → ${y[k][prop]} }`);
      }
      const only = Object.keys(x).length - Object.keys(x).filter(k => y[k]).length;
      checked++;
      if (diffs.length) report.push(`■ ${p.name} (${play ? 'exercice' : 'consigne'}) : ${diffs.length} écart(s)\n   ` + diffs.slice(0, 6).join('\n   ') + (diffs.length > 6 ? `\n   … et ${diffs.length - 6} autres` : '') + (only ? `\n   (${only} élément(s) présents d'un seul côté)` : ''));
    }
  } catch (error) { report.push(`■ ${p.name} : non vérifiée (${error.message})`); }
  process.stdout.write(`\r${i + 1}/${list.length}`);
}
A?.close(); B?.close();
console.log(`\n${checked} écrans comparés.`);
console.log(report.length ? report.join('\n') : 'Aucun écart de style.');
process.exit(0);
