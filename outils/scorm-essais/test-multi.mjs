// Essai du paquet dans une fausse plateforme SCORM 1.2 (Edge sans fenêtre).
//   exercices : dans le paquet (site/), plus besoin du site local
//   plateforme       : http://localhost:4174  (ce script)
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdtempSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const PAQUET = process.argv[2];
const SITE = 'http://127.0.0.1:4173';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.docx': 'application/octet-stream' };

const LMS = `<!doctype html><meta charset="utf-8"><body style="margin:0">
<script>
  var KEY = 'faux-lms-' + new URLSearchParams(location.search).get('sco');
  var data = JSON.parse(localStorage.getItem(KEY) || '{}');
  if (!data['cmi.core.lesson_status']) data['cmi.core.lesson_status'] = 'not attempted';
  window.__log = [];
  window.API = {
    LMSInitialize: function () { __log.push('init'); return 'true'; },
    LMSGetValue: function (k) { return data[k] || ''; },
    LMSSetValue: function (k, v) { data[k] = String(v); __log.push(k + '=' + String(v).slice(0, 60)); return 'true'; },
    LMSCommit: function () { localStorage.setItem(KEY, JSON.stringify(data)); __log.push('commit'); return 'true'; },
    LMSFinish: function () { localStorage.setItem(KEY, JSON.stringify(data)); __log.push('finish'); return 'true'; },
    LMSGetLastError: function () { return '0'; }, LMSGetErrorString: function () { return ''; }, LMSGetDiagnostic: function () { return ''; }
  };
  window.__data = data;
</script>
<iframe id="sco" style="width:1300px;height:1500px;border:0" src="/sco/02_page/index.html"></iframe>`;

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/lms.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(LMS); }
  if (url.pathname.startsWith('/sco/')) {
    const f = join(PAQUET, decodeURIComponent(url.pathname.slice(5)));
    try {
      let body = await readFile(f);
      // Pour l'essai, les exercices viennent du site local, pas de GitHub.
      if (f.endsWith('index.html')) body = Buffer.from(body.toString().replace(/https:\/\/guillaumecci\.github\.io\/IlIIllllIIlllIIlllIIIIlIIIIIIl/g, SITE));
      res.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); return res.end(body);
    } catch { res.writeHead(404); return res.end(); }
  }
  res.writeHead(404); res.end();
}).listen(4174, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const port = 9333;
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--host-resolver-rules=MAP guillaumecci.github.io 127.0.0.1:9', '--disable-site-isolation-trials', '--disable-features=IsolateOrigins,site-per-process', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'scormtest-'))}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await new Promise(r => setTimeout(r, 200)); } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = {};
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } });
const cdp = (method, params = {}) => new Promise(r => { const n = ++id; pending[n] = r; ws.send(JSON.stringify({ id: n, method, params })); });
const go = async url => { await cdp('Page.navigate', { url }); await new Promise(r => setTimeout(r, 3500)); };
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.result.value; };
await cdp('Page.enable'); await cdp('Runtime.enable');

const KEY = 'atelier-vente-1-1-1-v2';
const LMSURL = 'http://localhost:4174/lms.html?sco=essai';
const lmsEtat = async () => JSON.parse(await ev(`JSON.stringify({ st: __data['cmi.core.lesson_status'], score: __data['cmi.core.score.raw'], exit: __data['cmi.core.exit'], suspend: (__data['cmi.suspend_data']||'').length, texte: document.getElementById('sco').contentDocument.getElementById('suivi-texte').textContent })`));
// Exécute du code dans la page des exercices (même mémoire que dans la plateforme).
async function dedans(expr) {
  const tree = (await cdp('Page.getFrameTree')).result.frameTree;
  const all = []; (function walk(n) { all.push(n.frame); (n.childFrames || []).forEach(walk); })(tree);
  const f = all.find(x => /\/site\//.test(x.url));
  if (!f) return 'PAS DE CADRE';
  const w = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'essai' });
  const r = await cdp('Runtime.evaluate', { expression: expr, contextId: w.result.executionContextId, returnByValue: true });
  return r.result.result.value;
}
const ok = (cond, msg) => console.log((cond ? '  ✓ ' : '  ✗ ') + msg);
const pause = ms => new Promise(r => setTimeout(r, ms));

// 1. Un exercice fait (score 75 %) + un brouillon d'une autre série.
await go(LMSURL);
await dedans(`localStorage.setItem('${KEY}', JSON.stringify({ version: 2, exercises: { 's1-A': { values: { a: 'réponse' }, done: true, score: 0.75 }, 's2-B': { values: { x: 'brouillon s2' }, done: false } } }))`);
await go(LMSURL);
let e = await lmsEtat();
console.log('1 · un exercice fait', e);
ok(e.st === 'incomplete', 'statut « incomplete »');
ok(e.score === '75', 'score 75 envoyé');
ok(/1 sur 8/.test(e.texte), 'progression « 1 sur 8 » affichée');
ok(e.suspend > 20, 'réponses enregistrées sur la plateforme');

// 2. Autre ordinateur : la mémoire des exercices est vide → la plateforme rend les réponses.
await dedans(`localStorage.setItem('${KEY}', JSON.stringify({ version: 2, exercises: { 's2-B': { values: { x: 'brouillon s2' }, done: false } } }))`);
await go(LMSURL);
await pause(3000);
e = await lmsEtat();
console.log('2 · mémoire vidée', e);
ok(/1 sur 8/.test(e.texte), 'toujours « 1 sur 8 »');
const apres = JSON.parse(await dedans(`localStorage.getItem('${KEY}')`));
ok(apres.exercises['s1-A'] && apres.exercises['s1-A'].done && apres.exercises['s1-A'].values.a === 'réponse', 'réponse de s1-A rendue aux exercices');
ok(apres.exercises['s2-B'] && apres.exercises['s2-B'].values.x === 'brouillon s2', 'brouillon de la série 2 conservé');

// 3. Toute la série faite → terminé.
const tous = ['A', 'B', 'C', 'D', 'E1', 'E2', 'E3', 'F'].reduce((o, k) => (o['s1-' + k] = { values: { a: 'ok' }, done: true }, o), {});
await dedans(`localStorage.setItem('${KEY}', JSON.stringify({ version: 2, exercises: ${JSON.stringify(tous)} }))`);
await go(LMSURL);
e = await lmsEtat();
console.log('3 · série complète', e);
ok(e.st === 'completed', 'statut « completed »');
ok(e.exit === '', 'sortie normale');
ok(/8 exercices sont faits/.test(e.texte), 'message « les 8 exercices sont faits »');

// 5. Réponses très longues + score plus bas sur s1-A.
const longs = ['A', 'B', 'C', 'D', 'E1', 'E2', 'E3', 'F'].reduce((o, k) => (o['s1-' + k] = { values: { a: 'x'.repeat(900) }, done: true, score: k === 'A' ? 0.2 : 1 }, o), {});
await dedans(`localStorage.setItem('${KEY}', JSON.stringify({ version: 2, exercises: ${JSON.stringify(longs)} }))`);
await go(LMSURL);
e = await lmsEtat();
const sus = JSON.parse(await ev(`__data['cmi.suspend_data']`));
console.log('5 · réponses longues', e);
ok(e.suspend <= 4096, 'données ≤ 4 096 caractères (' + e.suspend + ')');
ok(Object.values(sus.e).filter(x => x.done).length === 8, 'les 8 exercices faits restent enregistrés');
ok(Object.values(sus.e).some(x => Object.keys(x.values).length), 'une partie des réponses tient encore');
ok(sus.e['s1-A'].score === 0.75, 'score de s1-A gardé au meilleur (0,75 et non 0,2)');

// 4. Fermeture : temps passé envoyé.
await go('about:blank');
await go(LMSURL);
const log = JSON.parse(await ev(`localStorage.getItem('faux-lms-essai')`));
ok(!!log['cmi.core.session_time'], 'temps passé enregistré (' + log['cmi.core.session_time'] + ')');
await cdp('Page.captureScreenshot', { format: 'png' }).then(async r => (await import('node:fs')).writeFileSync(process.argv[3], Buffer.from(r.result.data, 'base64')));
proc.kill(); process.exit(0);
