// Essai de la VISITE DE LA CAPSULE (fausse plateforme, Edge sans fenêtre).
// Paquet décompressé avec au moins deux capsules Storyline (ex. le paquet 1).
//   node outils/scorm-essais/test-visite-capsule.mjs <paquet décompressé> <dossier captures>
// 1. Première capsule, « Démarrer » : la visite paraît (pause, rejouer,
//    sous-titres, flèches + celles du haut cerclées), la vidéo est en pause.
// 2. Fin de la visite : la vidéo repart, c'est mémorisé (etat.vc).
// 3. Deuxième capsule, « Démarrer » : pas de visite.
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
}).listen(4176, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9338;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--host-resolver-rules=MAP guillaumecci.github.io 127.0.0.1:9', '--autoplay-policy=no-user-gesture-required', '--window-size=1280,720', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'visite-'))}`, 'about:blank'], { stdio: 'ignore' });
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
const capsule = rang => L(`(function(){ var caps = w.PARCOURS.sections[0].items.filter(function (x) { return x.type === 'scorm'; }); var a = d.querySelector('[data-id="' + caps[${rang}].id + '"]'); if (a) a.click(); return !!a; })()`);
const demarrer = () => L(`(function(){ var c = d.querySelector('#scene iframe').contentDocument; var b = Array.prototype.find.call(c.querySelectorAll('button, [role="button"]'), function (x) { return /démarrer|commencer/i.test(x.getAttribute('aria-label') || x.textContent); }); if (b) b.click(); return !!b; })()`);
const titre = () => L(`(function(){ var h = d.querySelector('.visite h2'); return h ? h.textContent : ''; })()`);
const etat = async () => JSON.parse((await ev('__data["cmi.suspend_data"] || "{}"')) || '{}');

await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Page.navigate', { url: 'http://localhost:4176/lms.html' }); await pause(4500);
// La visite du lecteur d'abord : on la termine.
await L(`(function(){ var f = d.querySelector('.visite [data-v="fin"]'); if (f) f.click(); return 1; })()`);
await pause(500);

// 1. Première capsule.
await capsule(0); await pause(1200);
await L(`d.querySelector('.accueil-entrer').click()`); await pause(8000);
ok(await titre() === '', 'pas de visite sur la couverture (avant « Démarrer »)');
ok(await demarrer(), 'capsule 1 : « Démarrer »');
await pause(6000);
ok(await titre() === 'Pause et lecture', `capsule 1 : la visite paraît (« ${await titre()} »)`);
const enPause = await L(`(function(){ var b = d.querySelector('#scene iframe').contentDocument.getElementById('play-pause'); return b.getAttribute('aria-label'); })()`);
ok(!/arr[êe]t/i.test(enPause), `la vidéo est en pause pendant la visite (bouton : « ${enPause} »)`);
const titres = [await titre()];
await shot('capsule-visite-1.png');
for (let k = 2; k <= 4; k++) {
  await L(`d.querySelector('.visite [data-v="suiv"]').click()`); await pause(900);
  titres.push(await titre()); await shot(`capsule-visite-${k}.png`);
}
ok(titres.join(' / ') === 'Pause et lecture / Rejouer / Les sous-titres / Les flèches de la capsule', 'les quatre bulles : ' + titres.join(' / '));
ok(await L(`d.querySelector('.visite-aussi').hidden`), 'les flèches du haut ne sont pas montrées');
await L(`d.querySelector('.visite [data-v="suiv"]').click()`); await pause(1500);
ok(await titre() === '', 'la visite se ferme');
const reprise = await L(`(function(){ var b = d.querySelector('#scene iframe').contentDocument.getElementById('play-pause'); return b.getAttribute('aria-label'); })()`);
ok(/arr[êe]t/i.test(reprise), `la vidéo repart après la visite (bouton : « ${reprise} »)`);
ok((await etat()).vc === 1, 'mémorisé sur la plateforme (vc)');

// 2. Deuxième capsule : plus de visite.
await capsule(1); await pause(1200);
await L(`d.querySelector('.accueil-entrer').click()`); await pause(8000);
ok(await demarrer(), 'capsule 2 : « Démarrer »');
await pause(7000);
ok(await titre() === '', 'capsule 2 : pas de visite');
await shot('capsule-2-sans-visite.png');

proc.kill(); serveur.close(); ws.close();
process.exit(0);
