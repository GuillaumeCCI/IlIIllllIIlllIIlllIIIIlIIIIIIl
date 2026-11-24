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
const port = 9336;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--host-resolver-rules=MAP guillaumecci.github.io 127.0.0.1:9', '--autoplay-policy=no-user-gesture-required', '--disable-site-isolation-trials', '--disable-features=IsolateOrigins,site-per-process', '--window-size=1300,800', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'plein-'))}`, 'about:blank'], { stdio: 'ignore' });
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
  const f = all.find(x => /\/site\//.test(x.url));
  if (!f) return 'PAS DE CADRE';
  const w = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'essai' });
  const r = await cdp('Runtime.evaluate', { expression: expr, contextId: w.result.executionContextId, returnByValue: true });
  return r.result.result.value;
}
const reel = async () => JSON.parse(await ev(`JSON.stringify(__data)`));
const etat = async () => JSON.parse((await reel())['cmi.suspend_data'] || '{}');
await cdp('Page.enable'); await cdp('Runtime.enable');

async function frames() {
  const tree = (await cdp('Page.getFrameTree')).result.frameTree;
  const all = []; (function walk(n) { all.push(n.frame); (n.childFrames || []).forEach(walk); })(tree);
  return all;
}
async function dans(pred, expr) {
  const f = (await frames()).find(pred);
  if (!f) return 'ABSENT';
  const w = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'p' + Math.random() });
  const r = await cdp('Runtime.evaluate', { expression: expr, contextId: w.result.executionContextId, returnByValue: true });
  return r.result.result ? r.result.result.value : r.result;
}
const RECT = sel => `(function(){var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; var r=e.getBoundingClientRect(); return {x:r.left,y:r.top,w:r.width,h:r.height};})()`;
const estLecteur = f => /lecteur\.html/.test(f.url), estPage = f => /04_page/.test(f.url), estCadre = f => /cadre\.html/.test(f.url), estExo = f => /\/site\//.test(f.url) && /1-1-1\//.test(f.url);
async function clic(x, y) {
  await cdp('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
  await cdp('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  await pause(1500);
}
const plein = async () => ({
  lecteur: await dans(estLecteur, '!!document.fullscreenElement'),
  exo: await dans(estExo, '!!document.fullscreenElement'),
  cadre: await dans(estCadre, '!!document.fullscreenElement'),
  bouton: await dans(estExo, `(function(){var b=document.querySelector('[data-action="fullscreen"]'); return b ? b.getAttribute('aria-pressed') : 'sans bouton';})()`)
});
async function boutonExo() {
  const sco = JSON.parse(await ev(`JSON.stringify(${RECT('#sco')})`));
  const contenu = await dans(estLecteur, RECT('iframe.contenu'));
  const exos = await dans(estPage, RECT('#exercices'));
  const inner = await dans(estCadre, RECT('iframe'));
  const b = await dans(estExo, RECT('[data-action="fullscreen"]'));
  return { x: sco.x + contenu.x + exos.x + inner.x + b.x + b.w / 2, y: sco.y + contenu.y + exos.y + inner.y + b.y + b.h / 2 };
}

// Contextes principaux de chaque cadre (là où tourne le code des pages).
const ctx = {};
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.method === 'Runtime.executionContextCreated' && m.params.context.auxData && m.params.context.auxData.isDefault) ctx[m.params.context.auxData.frameId] = m.params.context.id; });
async function principal(pred, expr) {
  const f = (await frames()).find(pred);
  if (!f || !ctx[f.id]) return 'ABSENT';
  const r = await cdp('Runtime.evaluate', { expression: expr, contextId: ctx[f.id], returnByValue: true });
  return r.result.result ? r.result.result.value : r.result;
}
// Le plein écran simulé du lecteur (le navigateur d'essai refuse le vrai).
const SIMU = `(function(){ var on = false; window.__demandes = 0;
  Object.defineProperty(document, 'fullscreenElement', { configurable: true, get: function(){ return on ? document.documentElement : null; } });
  document.documentElement.requestFullscreen = function(){ on = true; document.dispatchEvent(new Event('fullscreenchange')); return Promise.resolve(); };
  document.exitFullscreen = function(){ on = false; document.dispatchEvent(new Event('fullscreenchange')); return Promise.resolve(); };
  return true; })()`;
// Dans les exercices : on compte toute demande de plein écran propre (il n'en faut aucune).
const ESPION = `(function(){ window.__propres = 0; var f = function(){ window.__propres++; return Promise.reject(new Error('interdit')); };
  Element.prototype.requestFullscreen = f; return true; })()`;

const estPage2 = f => /02_page/.test(f.url);
await go('http://localhost:4174/lms.html', 6000);
await L(`d.querySelector('[data-id="PAGE_3226"]').click()`); await pause(8000);
const page = await principal(estPage2, `JSON.stringify({ hauteurCadre: document.getElementById('exercices').offsetHeight, ecran: innerHeight, hautDuCadre: Math.round(document.getElementById('exercices').getBoundingClientRect().top), defile: Math.round(scrollY) })`);
console.log('page d’activités :', page);
const fen = await principal(estExo, `JSON.stringify(Array.from(document.querySelectorAll('dialog[open], .av-entrance-card:not([hidden])')).map(function (d) { var r = d.getBoundingClientRect(); return { quoi: d.tagName.toLowerCase() + '.' + (d.className || '').split(' ')[0], haut: Math.round(r.top), bas: Math.round(r.bottom), ecran: innerHeight }; }))`);
console.log('fenêtres ouvertes :', fen);
const p = JSON.parse(page), f = JSON.parse(fen);
ok(Math.abs(p.hauteurCadre - p.ecran) < 4, 'le cadre des exercices fait la hauteur de l’écran');
ok(Math.abs(p.hautDuCadre) <= 4, 'la page s’est placée sur les exercices');
ok(f.length > 0 && f.every(x => x.haut >= 0 && x.bas <= x.ecran), 'la fenêtre ouverte est entièrement visible');
await shot('8-fenetre-visible.png');
// L'apprenant passe l'accueil, remonte lire les objectifs, puis ouvre un exercice.
await principal(estExo, `(function(){var b=document.querySelector('[data-entrance-skip]'); if(b) b.click(); var m=document.querySelector('[data-entrance="off"]'); if(m) m.click(); return true;})()`); await pause(1200);
await principal(estPage2, `(window.scrollTo(0, 0), true)`); await pause(800);
await principal(estExo, `(function(){ var a = document.querySelector('a[href*="s1-a"]'); if (a) a.click(); return !!a; })()`); await pause(7000);
await principal(estExo, `(function(){ var b = Array.from(document.querySelectorAll('button, a')).find(function (x) { return /Commencer|Reprendre/.test(x.textContent); }); if (b) b.click(); return true; })()`); await pause(3000);
const page2 = JSON.parse(await principal(estPage2, `JSON.stringify({ hautDuCadre: Math.round(document.getElementById('exercices').getBoundingClientRect().top) })`));
const fen2 = JSON.parse(await principal(estExo, `JSON.stringify(Array.from(document.querySelectorAll('dialog[open]')).map(function (d) { var r = d.getBoundingClientRect(); return { titre: (d.querySelector('h2, h1, [id*="title"]') || d).textContent.trim().slice(0, 60), haut: Math.round(r.top), bas: Math.round(r.bottom), ecran: innerHeight }; }))`));
console.log('exercice ouvert :', page2, fen2);
ok(Math.abs(page2.hautDuCadre) <= 4, 'la page s’est replacée sur les exercices');
ok(fen2.length > 0 && fen2.every(x => x.haut >= 0 && x.bas <= x.ecran), 'la fenêtre de l’exercice est entièrement visible');
await shot('9-fenetre-exercice.png');
proc.kill(); process.exit(0);
