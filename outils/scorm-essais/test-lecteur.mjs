// Essai du LECTEUR dans une fausse plateforme SCORM 1.2 (Edge sans fenêtre).
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const [PAQUET, CAPTURES] = process.argv.slice(2);
const SITE = 'http://127.0.0.1:4173';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.json': 'application/json', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const LMS = `<!doctype html><meta charset="utf-8"><body style="margin:0">
<script>
  var KEY = 'faux-lms-lecteur';
  var data = JSON.parse(localStorage.getItem(KEY) || '{}');
  if (!data['cmi.core.lesson_status']) data['cmi.core.lesson_status'] = 'not attempted';
  window.API = {
    LMSInitialize: function () { return 'true'; },
    LMSGetValue: function (k) { return data[k] || ''; },
    LMSSetValue: function (k, v) { data[k] = String(v); return 'true'; },
    LMSCommit: function () { localStorage.setItem(KEY, JSON.stringify(data)); return 'true'; },
    LMSFinish: function () { localStorage.setItem(KEY, JSON.stringify(data)); return 'true'; },
    LMSGetLastError: function () { return '0'; }, LMSGetErrorString: function () { return ''; }, LMSGetDiagnostic: function () { return ''; }
  };
  window.__data = data;
</script>
<iframe id="sco" allow="fullscreen" allowfullscreen style="width:1280px;height:760px;border:0" src="/sco/lecteur.html"></iframe>`;

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/lms.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(LMS); }
  if (url.pathname.startsWith('/sco/')) {
    const f = join(PAQUET, decodeURIComponent(url.pathname.slice(5)));
    try {
      let body = await readFile(f);
      if (f.endsWith('index.html')) body = Buffer.from(body.toString().replace(/https:\/\/guillaumecci\.github\.io\/IlIIllllIIlllIIlllIIIIlIIIIIIl/g, SITE));
      res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); return res.end(body);
    } catch { res.writeHead(404); return res.end(); }
  }
  res.writeHead(404); res.end();
}).listen(4174, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9335;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--autoplay-policy=no-user-gesture-required', '--disable-site-isolation-trials', '--disable-features=IsolateOrigins,site-per-process', '--window-size=1300,800', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'lecteur-'))}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await new Promise(r => setTimeout(r, 200)); } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = {};
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } });
const cdp = (method, params = {}) => new Promise(r => { const n = ++id; pending[n] = r; ws.send(JSON.stringify({ id: n, method, params })); });
const pause = ms => new Promise(r => setTimeout(r, ms));
const go = async (url, ms = 4000) => { await cdp('Page.navigate', { url }); await pause(ms); };
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.result ? r.result.result.value : r.result; };
const L = expr => ev(`(function(){ var w = document.getElementById('sco').contentWindow, d = w.document; return (${expr}); })()`);
const ok = (cond, msg) => console.log((cond ? '  ✓ ' : '  ✗ ') + msg);
const shot = async nom => { const r = await cdp('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1280, height: 760, scale: 1 } }); writeFileSync(join(CAPTURES, nom), Buffer.from(r.result.data, 'base64')); };
async function dedans(expr) {
  const tree = (await cdp('Page.getFrameTree')).result.frameTree;
  const all = []; (function walk(n) { all.push(n.frame); (n.childFrames || []).forEach(walk); })(tree);
  const f = all.find(x => x.url.startsWith(SITE));
  if (!f) return 'PAS DE CADRE';
  const w = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'essai' });
  const r = await cdp('Runtime.evaluate', { expression: expr, contextId: w.result.executionContextId, returnByValue: true });
  return r.result.result.value;
}
const reel = async () => JSON.parse(await ev(`JSON.stringify(__data)`));
const etat = async () => JSON.parse((await reel())['cmi.suspend_data'] || '{}');
await cdp('Page.enable'); await cdp('Runtime.enable');

// 1. Ouverture : premier élément (Storyline), sommaire, barre.
await go('http://localhost:4174/lms.html', 9000);
ok(await L(`d.querySelectorAll('.som-item').length`) === 6, 'sommaire : 6 éléments');
ok(/Prendre en main/.test(await L(`d.getElementById('barre-titre').textContent`)), 'barre : titre du Storyline');
// L'accueil du Storyline : objectifs et durée ; il ne compte pas comme commencé.
const accueil = await L(`(function(){ var a = d.querySelector('.accueil'); return a ? { li: a.querySelectorAll('li').length, duree: /Durée estimée : 10 minutes/.test(a.textContent), cadre: !!d.querySelector('#scene iframe') } : null; })()`);
ok(accueil && accueil.li === 1 && accueil.duree && !accueil.cadre, 'accueil du Storyline : objectifs, durée, module pas encore ouvert');
ok(!((await etat()).i.SCORM_3243 || {}).s, 'l’accueil ne compte pas comme commencé');
await shot('lecteur-0-accueil.png');
await L(`d.querySelector('.accueil-entrer').click()`); await pause(6000);
let e = await etat();
ok(e.c === 'SCORM_3243', 'élément en cours retenu');
ok(e.i.SCORM_3243 && e.i.SCORM_3243.s === 'incomplete', 'le Storyline a trouvé l’API du lecteur (statut ' + (e.i.SCORM_3243 && e.i.SCORM_3243.s) + ')');
ok((await reel())['cmi.core.lesson_status'] === 'incomplete', 'plateforme : « incomplete »');
ok(await L(`!d.getElementById('plein').hidden`), 'bouton plein écran visible');
await shot('1-storyline.png');
await L(`d.getElementById('burger').click()`); await pause(800);
await shot('2-sommaire.png');

// 2. Élément suivant : les exercices.
await L(`d.getElementById('burger').click()`); await pause(400);
await L(`d.getElementById('suiv').click()`); await pause(5000);
ok(/Prise de contact/.test(await L(`d.getElementById('barre-titre').textContent`)), 'flèche suivante → Prise de contact');
await dedans(`localStorage.setItem('atelier-vente-1-1-1-v2', JSON.stringify({ version: 2, exercises: { 's1-A': { values: { a: 'réponse' }, done: true, score: 0.75 } } }))`);
await go('http://localhost:4174/lms.html', 7000);
ok(/Prise de contact/.test(await L(`d.getElementById('barre-titre').textContent`)), 'reprise sur l’élément où l’on s’était arrêté');
e = await etat();
ok(e.i.PAGE_3226 && e.i.PAGE_3226.r === 75 && e.i.PAGE_3226.s === 'incomplete', 'exercices : score 75, en cours');
await shot('3-exercices.png');

// 3. Série complète → élément fait, « 1 sur 6 ».
const tous = ['A', 'B', 'C', 'D', 'E1', 'E2', 'E3', 'F'].reduce((o, k) => (o['s1-' + k] = { values: { a: 'ok '.repeat(200) }, done: true }, o), {});
await dedans(`localStorage.setItem('atelier-vente-1-1-1-v2', JSON.stringify({ version: 2, exercises: ${JSON.stringify(tous)} }))`);
await go('http://localhost:4174/lms.html', 7000);
e = await etat();
ok(e.i.PAGE_3226.s === 'completed', 'exercices : fait');
ok(/1<\/b> sur 6/.test(await L(`d.getElementById('barre-avance').innerHTML`)), 'barre : « 1 sur 6 faits »');
ok(((await reel())['cmi.suspend_data'] || '').length <= 4096, 'données ≤ 4 096 (' + ((await reel())['cmi.suspend_data'] || '').length + ')');

// 4. Fiche : Marquer comme terminé.
await L(`d.querySelector('[data-id="RESOURCE_3360"]').click()`); await pause(2500);
await L(`w.document.querySelector('iframe.contenu').contentDocument.querySelector('#mc button').click()`); await pause(800);
e = await etat();
ok(e.i.RESOURCE_3360 && e.i.RESOURCE_3360.s === 'completed', 'fiche : marquée terminée');
ok(await L(`!!w.document.querySelector('iframe.contenu').contentDocument.querySelector('a[download]')`), 'fiche : bouton Télécharger présent');
await L(`d.getElementById('burger').click()`); await pause(800);
await shot('4-sommaire-avance.png');

// 5. Fermeture : temps passé, statut global.
await go('about:blank', 1500);
await go('http://localhost:4174/lms.html', 3000);
const r = await reel();
ok(!!r['cmi.core.session_time'], 'temps passé : ' + r['cmi.core.session_time']);
ok(r['cmi.core.score.raw'] !== undefined, 'score global : ' + r['cmi.core.score.raw']);
proc.kill(); process.exit(0);
