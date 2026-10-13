/* PHOTOGRAPHIE TOUS LES EXERCICES, puis compare deux séries de photos.
 *
 *     node outils/captures.mjs prendre  <dossier>   (serveur : npm start)
 *     node outils/captures.mjs comparer <avant> <après>
 *
 * « prendre » ouvre chaque exercice de chaque parcours (page de consigne,
 * puis écran d'exercice) et chaque accueil de module, en 1440 × 900, avec
 * Edge sans fenêtre. « comparer » liste les pages dont l'image a changé.
 * Les dossiers de photos restent hors du dépôt (captures/ est ignoré).
 * HEIGHT=1600 agrandit la fenêtre pour voir toute la page.
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [mode, a, b] = process.argv.slice(2);
const BASE = process.env.SITE || 'http://127.0.0.1:4180';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function pages() {
  const list = [];
  for (const parcours of readdirSync(root).filter(n => !n.startsWith('.') && !['moteur', 'outils', 'captures', 'node_modules'].includes(n)).sort()) {
    let modules = [];
    try { modules = readdirSync(join(root, parcours)).filter(m => existsSync(join(root, parcours, m, 'js/catalog.js'))).sort(); } catch { continue; }
    for (const m of modules) {
      list.push({ name: `${parcours}__${m}__accueil`, url: `/${parcours}/${m}/index.html`, play: false });
      for (const f of readdirSync(join(root, parcours, m, 'exercices')).filter(f => f.endsWith('.html') && !f.startsWith('_')).sort())
        list.push({ name: `${parcours}__${m}__${f.replace('.html', '')}`, url: `/${parcours}/${m}/exercices/${f}`, play: true });
    }
  }
  // ONLY=texte : ne garde que les pages dont le nom contient ce texte.
  return process.env.ONLY ? list.filter(p => p.name.includes(process.env.ONLY)) : list;
}

async function take(dir) {
  mkdirSync(dir, { recursive: true });
  const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
  const port = 9300 + Math.floor(Math.random() * 90);
  const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cap-'))}`, 'about:blank'], { stdio: 'ignore' });
  let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
  const ws = new WebSocket(t.find(x => x.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
  let id = 0; const pending = {};
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && pending[m.id]) { pending[m.id](m.result); delete pending[m.id]; }
    // Une boîte de dialogue (alerte, « quitter la page ? ») est acceptée d'office.
    if (m.method === 'Page.javascriptDialogOpening') ws.send(JSON.stringify({ id: ++id, method: 'Page.handleJavaScriptDialog', params: { accept: true } }));
  });
  // Chaque commande a 20 s au plus : une page qui bloque est sautée, pas tout le reste.
  const send = (method, params = {}) => new Promise((r, reject) => {
    const n = ++id; pending[n] = r; ws.send(JSON.stringify({ id: n, method, params }));
    setTimeout(() => { if (pending[n]) { delete pending[n]; reject(new Error(`délai dépassé : ${method}`)); } }, 20000);
  });
  const ev = x => send('Runtime.evaluate', { expression: x, awaitPromise: true });
  const shot = async file => { const s = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(dir, file), Buffer.from(s.data, 'base64')); };
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: Number(process.env.HEIGHT) || 900, deviceScaleFactor: 1, mobile: false });
  // Musique et sons coupés (pas d'écran d'accueil sonore). Les animations ne
  // sont pas figées : certaines pages attendent leur fin pour continuer.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `try { localStorage.setItem('atelier-vente-musique', 'off'); localStorage.setItem('atelier-vente-sons', 'off'); } catch {}` });
  await send('Page.enable');
  const list = pages();
  const skipped = [];
  for (const [i, p] of list.entries()) {
    try {
      await send('Page.navigate', { url: BASE + p.url }); await sleep(2200);
      await shot(`${p.name}__1.png`);
      if (p.play) {
        await ev(`document.querySelector('[data-action="start-exercise"]')?.click()`); await sleep(4500);
        await ev('window.scrollTo(0, 0)'); await sleep(200);
        await shot(`${p.name}__2.png`);
      }
    } catch (error) { skipped.push(`${p.name} (${error.message})`); }
    process.stdout.write(`\r${i + 1}/${list.length}`);
  }
  if (skipped.length) console.log(`\nPages sautées :\n${skipped.join('\n')}`);
  console.log(`\n${list.length} pages photographiées dans ${dir}`);
  ws.close(); proc.kill();
}

async function compare(before, after) {
  const sharp = createRequire(import.meta.url)(join(root, 'node_modules/sharp'));
  const files = readdirSync(before).filter(f => f.endsWith('.png')).sort();
  const changed = [];
  for (const f of files) {
    if (!existsSync(join(after, f))) { changed.push(`${f} : absente après`); continue; }
    const [x, y] = await Promise.all([before, after].map(d => sharp(readFileSync(join(d, f))).raw().toBuffer({ resolveWithObject: true })));
    if (x.info.width !== y.info.width || x.info.height !== y.info.height) { changed.push(`${f} : taille différente`); continue; }
    let diff = 0;
    for (let i = 0; i < x.data.length; i += x.info.channels) {
      if (Math.abs(x.data[i] - y.data[i]) + Math.abs(x.data[i + 1] - y.data[i + 1]) + Math.abs(x.data[i + 2] - y.data[i + 2]) > 30) diff++;
    }
    const share = diff / (x.info.width * x.info.height);
    if (share > 0.0005) changed.push(`${f} : ${(share * 100).toFixed(2)} % des pixels`);
  }
  console.log(changed.length ? `${changed.length} image(s) différente(s) sur ${files.length} :\n` + changed.join('\n') : `Aucune différence sur ${files.length} images.`);
}

if (mode === 'prendre' && a) await take(resolve(a));
else if (mode === 'comparer' && a && b) await compare(resolve(a), resolve(b));
else console.error('Usage : node outils/captures.mjs prendre <dossier> | comparer <avant> <après>');
process.exit(0);
