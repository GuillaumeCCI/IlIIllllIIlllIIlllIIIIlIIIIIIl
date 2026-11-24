// Essai de la SORTIE D'UNE CAPSULE (fausse plateforme, Edge sans fenêtre).
// Un vrai clic de souris sur la croix « Quitter » de la 1re capsule :
// 1. la fenêtre « Quitter la capsule ? » paraît, la capsule reste ouverte ;
// 2. « Continuer la capsule » : on y reste ;
// 3. « Quitter la capsule » : retour à l'accueil de la capsule (pas la page vide) ;
// 4. une capsule qui affiche d'elle-même sa page d'au revoir mène aussi à l'accueil.
//   node outils/scorm-essais/test-sortie-capsule.mjs <paquet décompressé> <dossier captures>
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const [PAQUET, CAPTURES] = process.argv.slice(2);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.json': 'application/json', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.vtt': 'text/vtt', '.xml': 'text/xml' };
const LMS = `<!doctype html><meta charset="utf-8"><body style="margin:0;overflow:hidden">
<script>
  var data = { 'cmi.core.lesson_status': 'not attempted' };
  window.API = { LMSInitialize: function () { return 'true'; }, LMSGetValue: function (k) { return data[k] || ''; }, LMSSetValue: function (k, v) { data[k] = String(v); return 'true'; },
    LMSCommit: function () { return 'true'; }, LMSFinish: function () { return 'true'; }, LMSGetLastError: function () { return '0'; }, LMSGetErrorString: function () { return ''; }, LMSGetDiagnostic: function () { return ''; } };
  window.__data = data;
</script>
<iframe id="sco" allow="fullscreen" allowfullscreen style="display:block;width:100vw;height:100vh;border:0" src="/sco/lecteur.html"></iframe>`;
const serveur = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/lms.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(LMS); }
  if (url.pathname.startsWith('/sco/')) {
    try { const f = join(PAQUET, decodeURIComponent(url.pathname.slice(5))); const body = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); return res.end(body); }
    catch { res.writeHead(404); return res.end(); }
  }
  res.writeHead(404); res.end();
}).listen(4177, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9339;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'sortie-'))}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await new Promise(r => setTimeout(r, 200)); } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = {};
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } });
const cdp = (method, params = {}) => new Promise(r => { const n = ++id; pending[n] = r; ws.send(JSON.stringify({ id: n, method, params })); });
const pause = ms => new Promise(r => setTimeout(r, ms));
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.result ? r.result.result.value : r.result; };
const L = expr => ev(`(function(){ var w = document.getElementById('sco').contentWindow, d = w.document; return (${expr}); })()`);
const ok = (cond, msg) => console.log((cond ? '  ✓ ' : '  ✗ ') + msg);
const shot = async nom => { const r = await cdp('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(CAPTURES, nom), Buffer.from(r.result.data, 'base64')); };
const capsuleUrl = () => L(`(function(){ var f = d.querySelector('#scene iframe'); return f ? f.contentWindow.location.pathname : 'aucune'; })()`);
// Le centre de la croix « Quitter », en coordonnées de la page.
const croix = () => L(`(function(){ var f = d.querySelector('#scene iframe'), c = f.contentDocument, o = f.getBoundingClientRect();
  var q = Array.prototype.find.call(c.querySelectorAll('[data-acc-text="Quitter"]'), function (x) { return x.getBoundingClientRect().width; });
  if (!q) return null; var r = q.getBoundingClientRect(); return { x: o.left + r.left + r.width / 2, y: o.top + r.top + r.height / 2 }; })()`);
const cliquer = async p => {
  for (const type of ['mouseMoved', 'mousePressed', 'mouseReleased']) await cdp('Input.dispatchMouseEvent', { type, x: p.x, y: p.y, button: 'left', clickCount: 1 });
};

await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Page.navigate', { url: 'http://localhost:4177/lms.html' }); await pause(4500);
await L(`(function(){ var f = d.querySelector('.visite [data-v="fin"]'); if (f) f.click(); return 1; })()`);
await pause(500);
await L(`d.querySelector('.accueil-entrer').click()`); await pause(8000);

// 1. La croix sur la couverture de la capsule.
let p = await croix();
ok(p, 'capsule ouverte, croix « Quitter » trouvée');
await cliquer(p); await pause(1500);
ok(await L(`!!d.querySelector('.confirmer')`), 'la fenêtre « Quitter la capsule ? » paraît');
ok(!/goodbye/.test(await capsuleUrl()), 'la capsule n’est pas fermée');
await shot('sortie-1-confirmer.png');

// 2. Continuer.
await L(`d.querySelector('[data-c="rester"]').click()`); await pause(1500);
ok(!(await L(`!!d.querySelector('.confirmer')`)) && /story|index_lms/.test(await capsuleUrl()), '« Continuer la capsule » : on reste dans la capsule');

// 3. Quitter.
p = await croix();
await cliquer(p); await pause(1500);
await L(`d.querySelector('[data-c="quitter"]').click()`); await pause(5000);
ok(await L(`!!d.querySelector('.accueil-entrer')`), '« Quitter la capsule » : retour à l’accueil de la capsule');
ok(await capsuleUrl() === 'aucune', 'plus de page « Vous pouvez fermer la fenêtre »');
await shot('sortie-2-accueil.png');

// 4. Fermeture par un autre chemin : la page d'au revoir mène à l'accueil.
await L(`d.querySelector('.accueil-entrer').click()`); await pause(6000);
await L(`(function(){ var f = d.querySelector('#scene iframe'); f.contentWindow.location.href = f.contentWindow.location.href.replace(/[^/]*$/, '') + 'lms/goodbye.html'; return 1; })()`);
await pause(3000);
ok(await L(`!!d.querySelector('.accueil-entrer')`), 'page d’au revoir de la capsule → accueil de la capsule');

proc.kill(); serveur.close(); ws.close();
process.exit(0);
