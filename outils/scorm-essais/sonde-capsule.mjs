// Sonde : ouvre la PREMIÈRE capsule d'un paquet décompressé dans la fausse
// plateforme, clique « Lancer la capsule », puis liste les boutons du lecteur
// de la capsule (Storyline, e-doceo…) : identifiant, classes, libellé,
// position. Sert à repérer ce que la visite de la capsule doit montrer.
//   node outils/scorm-essais/sonde-capsule.mjs <paquet décompressé> [capture.png] [numéro de capsule]
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const [PAQUET, CAPTURE, RANG = '1'] = process.argv.slice(2);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.json': 'application/json', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.vtt': 'text/vtt', '.xml': 'text/xml' };
const LMS = `<!doctype html><meta charset="utf-8"><body style="margin:0">
<script>
  var data = { 'cmi.core.lesson_status': 'not attempted' };
  window.API = { LMSInitialize: function () { return 'true'; }, LMSGetValue: function (k) { return data[k] || ''; }, LMSSetValue: function (k, v) { data[k] = String(v); return 'true'; },
    LMSCommit: function () { return 'true'; }, LMSFinish: function () { return 'true'; }, LMSGetLastError: function () { return '0'; }, LMSGetErrorString: function () { return ''; }, LMSGetDiagnostic: function () { return ''; } };
</script>
<iframe id="sco" allow="fullscreen" allowfullscreen style="width:1280px;height:760px;border:0" src="/sco/lecteur.html"></iframe>`;
const serveur = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/lms.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(LMS); }
  if (url.pathname.startsWith('/sco/')) {
    try { const f = join(PAQUET, decodeURIComponent(url.pathname.slice(5))); const body = await readFile(f); res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); return res.end(body); }
    catch { res.writeHead(404); return res.end(); }
  }
  res.writeHead(404); res.end();
}).listen(4175, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9337;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--autoplay-policy=no-user-gesture-required', '--window-size=1300,800', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'sonde-'))}`, 'about:blank'], { stdio: 'ignore' });
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

await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Page.navigate', { url: 'http://localhost:4175/lms.html' }); await pause(5000);
// Fermer la visite du lecteur si elle est là, aller à la capsule voulue.
await L(`(function(){ var f = d.querySelector('.visite [data-v="fin"]'); if (f) f.click(); var caps = w.PARCOURS.sections[0].items.filter(function (x) { return x.type === 'scorm'; }); var a = d.querySelector('[data-id="' + caps[${+RANG - 1}].id + '"]'); if (a) a.click(); return 1; })()`);
await pause(1500);
await L(`d.querySelector('.accueil-entrer') && d.querySelector('.accueil-entrer').click()`);
await pause(9000);
// La couverture de la capsule : « Démarrer » ouvre la suite, où vit la barre.
await L(`(function(){ var c = d.querySelector('#scene iframe').contentDocument; var b = Array.prototype.find.call(c.querySelectorAll('button, [role="button"]'), function (x) { return /démarrer|commencer/i.test(x.getAttribute('aria-label') || x.textContent); }); if (b) b.click(); return !!b; })()`);
await pause(6000);
const boutons = await L(`(function(){
  var f = d.querySelector('#scene iframe'); var c = f.contentDocument; if (!c) return 'pas d’accès';
  // Le lecteur peut avoir un second cadre (e-doceo) : on descend.
  var docs = [c]; Array.prototype.forEach.call(c.querySelectorAll('iframe'), function (x) { try { if (x.contentDocument) docs.push(x.contentDocument); } catch (e) {} });
  var out = [];
  docs.forEach(function (doc, k) {
    Array.prototype.forEach.call(doc.querySelectorAll('button, [role="button"], [role="slider"], [aria-label]'), function (b) {
      var r = b.getBoundingClientRect(); if (!r.width) return;
      out.push({ cadre: k, tag: b.tagName.toLowerCase(), id: b.id, cls: String(b.className && b.className.baseVal !== undefined ? b.className.baseVal : b.className).slice(0, 60), label: (b.getAttribute('aria-label') || b.title || b.textContent || '').trim().slice(0, 40), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) });
    });
  });
  return out;
})()`);
console.log(JSON.stringify(boutons, null, 1));
if (CAPTURE) { const r = await cdp('Page.captureScreenshot', { format: 'png' }); writeFileSync(CAPTURE, Buffer.from(r.result.data, 'base64')); }
proc.kill(); serveur.close(); ws.close();
process.exit(0);
