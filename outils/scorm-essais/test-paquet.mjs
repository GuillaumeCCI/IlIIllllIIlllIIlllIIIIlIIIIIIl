// ESSAI GÉNÉRAL D'UN PAQUET DU LECTEUR (n'importe quel parcours), dans une
// fausse plateforme SCORM 1.2, Edge sans fenêtre, site GitHub BLOQUÉ (le
// paquet doit être indépendant). Pour chaque élément du sommaire : il
// s'ouvre, la capsule trouve l'API et donne un statut, l'entraînement
// s'affiche ; on relève les fichiers manquants (404), les erreurs JavaScript
// et toute requête vers l'extérieur.
//   node outils/scorm-essais/test-paquet.mjs <paquet décompressé> <dossier captures>
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const [PAQUET, CAPTURES] = process.argv.slice(2);
mkdirSync(CAPTURES, { recursive: true });
const PORT = 4175, DBG = 9336;
const types = { '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.png': 'image/png', '.json': 'application/json', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.xml': 'text/xml', '.vtt': 'text/vtt', '.pdf': 'application/pdf' };
const LMS = `<!doctype html><meta charset="utf-8"><body style="margin:0">
<script>
  var data = { 'cmi.core.lesson_status': 'not attempted', 'cmi.core.student_id': 'essai-42', 'cmi.core.student_name': 'Essai, Paquet' };
  window.API = {
    LMSInitialize: function () { return 'true'; },
    LMSGetValue: function (k) { return data[k] || ''; },
    LMSSetValue: function (k, v) { data[k] = String(v); return 'true'; },
    LMSCommit: function () { return 'true'; }, LMSFinish: function () { return 'true'; },
    LMSGetLastError: function () { return '0'; }, LMSGetErrorString: function () { return ''; }, LMSGetDiagnostic: function () { return ''; }
  };
  window.__data = data;
</script>
<iframe id="sco" allow="fullscreen" allowfullscreen style="width:1280px;height:760px;border:0" src="/sco/lecteur.html"></iframe>`;

const manquants = new Set();
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/lms.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); return res.end(LMS); }
  if (url.pathname.startsWith('/sco/')) {
    const rel = decodeURIComponent(url.pathname.slice(5));
    try { const body = await readFile(join(PAQUET, rel)); res.writeHead(200, { 'content-type': types[extname(rel).toLowerCase()] || 'application/octet-stream' }); return res.end(body); }
    catch { manquants.add(rel); res.writeHead(404); return res.end(); }
  }
  if (url.pathname !== '/favicon.ico') manquants.add('(hors paquet) ' + url.pathname);
  res.writeHead(404); res.end();
}).listen(PORT, 'localhost');

const edge = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const proc = spawn(edge, ['--headless=new', '--disable-gpu', '--host-resolver-rules=MAP guillaumecci.github.io 127.0.0.1:9', '--autoplay-policy=no-user-gesture-required', '--disable-site-isolation-trials', '--disable-features=IsolateOrigins,site-per-process', '--window-size=1300,800', `--remote-debugging-port=${DBG}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'paquet-'))}`, 'about:blank'], { stdio: 'ignore' });
let targets;
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch { await new Promise(r => setTimeout(r, 200)); } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let n = 0; const pending = {};
const erreurs = [], dehors = new Set();
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; return; }
  if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails; erreurs.push(`${(d.exception && d.exception.description || d.text || '').split('\n')[0]} (${(d.url || '').replace(/^.*\/sco\//, '')}:${d.lineNumber})`); }
  if (m.method === 'Network.requestWillBeSent') { const u = m.params.request.url; if (!/^(https?:\/\/(localhost|127\.0\.0\.1)[:/]|data:|blob:|about:|chrome|edge)/.test(u)) dehors.add(u.slice(0, 120)); }
});
const cdp = (method, params = {}) => new Promise(r => { const k = ++n; pending[k] = r; ws.send(JSON.stringify({ id: k, method, params })); });
const pause = ms => new Promise(r => setTimeout(r, ms));
const ev = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result.result ? r.result.result.value : undefined; };
const L = expr => ev(`(function(){ var w = document.getElementById('sco').contentWindow, d = w.document; return (${expr}); })()`);
const shot = async nom => { const r = await cdp('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1280, height: 760, scale: 1 } }); writeFileSync(join(CAPTURES, nom), Buffer.from(r.result.data, 'base64')); };
// Le texte visible d'une page d'exercices (dans son propre cadre).
// On passe l'invitation au plein écran (« Continuer sans plein écran »),
// puis on compte le texte et les exercices proposés (liens ou boutons).
async function texteExercice() {
  const tree = (await cdp('Page.getFrameTree')).result.frameTree;
  const all = []; (function walk(x) { all.push(x.frame); (x.childFrames || []).forEach(walk); })(tree);
  const fs = all.filter(x => /\/site\/.+\.html/.test(x.url) && !/cadre\.html/.test(x.url));
  let total = 0, actions = 0; const exo = [];
  for (const f of fs) {
    const w = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'essai' });
    const run = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, contextId: w.result.executionContextId, returnByValue: true }); return r.result.result && r.result.result.value; };
    // Les écrans d'accueil des entraînements : plein écran, musique, visite.
    for (let k = 0; k < 6; k++) {
      const clic = await run(`(function(){ var b = [].find.call(document.querySelectorAll('button, a'), x => x.offsetParent && /sans plein écran|sans musique|^\\s*passer|terminer la visite|fermer la visite|c.est parti/i.test(x.textContent)); if (b) { b.click(); return b.textContent.trim(); } return ''; })()`);
      if (!clic) break;
      await pause(1500);
    }
    total += (await run(`(document.querySelector('#main') || document.body).innerText.length`)) || 0;
    actions += (await run(`document.querySelectorAll('#main a[href], #main button').length`)) || 0;
    if (process.env.ENTRAINEMENTS) {
      // On ouvre le premier exercice du menu et on regarde s'il s'affiche.
      const menu = await run(`(document.querySelector('#main') || document.body).innerText.replace(/\\s+/g, ' ').slice(0, 160)`);
      const ouvert = await run(`(function(){ var a = document.querySelector('#main a[href*=".html"]:not([href^="http"]), #main [data-action="open-case"], #main .exercise-card a, #main a.card'); if (a) { a.click(); return a.textContent.replace(/\\s+/g, ' ').trim().slice(0, 60); } return ''; })()`);
      await pause(3500);
      const w2 = await cdp('Page.createIsolatedWorld', { frameId: f.id, worldName: 'essai2' });
      const r2 = await cdp('Runtime.evaluate', { expression: `({ url: location.pathname.replace(/^.*\\/site\\//, ''), texte: (document.querySelector('#main') || document.body).innerText.length, champs: document.querySelectorAll('#main input, #main textarea, #main button').length })`, contextId: w2.result.executionContextId, returnByValue: true });
      exo.push({ menu, ouvert, apres: r2.result.result && r2.result.result.value });
    }
  }
  return { cadres: fs.length, texte: total, actions, exo };
}
const etat = async () => { try { return JSON.parse((await ev(`JSON.stringify(__data)`) && JSON.parse(await ev(`JSON.stringify(__data)`))['cmi.suspend_data']) || '{}'); } catch { return {}; } };

await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');
await cdp('Page.navigate', { url: `http://localhost:${PORT}/lms.html` }); await pause(8000);
// La visite guidée du premier lancement : on la passe.
await L(`(function(){ var b = [].find.call(d.querySelectorAll('button'), x => /^\\s*Passer\\s*$/.test(x.textContent)); if (b) b.click(); })()`);
await pause(800);
const P = await L(`w.PARCOURS`);
const items = P.sections.flatMap(s => s.items.map(it => Object.assign({ section: s.nom }, it)));
console.log(`PAQUET : ${P.titre} · ${P.sections.map(s => s.nom).join(' / ')} · ${items.length} éléments`);
let echecs = 0;
for (const [i, it] of items.entries()) {
  if (process.env.ENTRAINEMENTS && it.type === 'scorm') continue; // capsules déjà essayées
  const e0 = erreurs.length;
  await L(`(function(){ var b = d.querySelector('.som-item[data-id="${it.id}"]'); if (b) b.click(); return !!b; })()`);
  await pause(2500);
  const accueil = await L(`!!d.querySelector('.accueil-entrer')`);
  if (accueil) { await L(`d.querySelector('.accueil-entrer').click()`); }
  await pause(it.type === 'scorm' ? 12000 : 7000);
  const titre = await L(`d.getElementById('barre-titre').textContent`);
  const st = ((await etat()).i || {})[it.id] || {};
  let ok, detail;
  if (it.type === 'scorm') {
    ok = !!st.s && titre.includes(it.titre.slice(0, 12));
    detail = `capsule ${accueil ? 'accueil ✓, ' : ''}statut « ${st.s || 'aucun : API non trouvée'} »`;
  } else {
    const x = await texteExercice();
    const e = x.exo[0];
    ok = x.cadres > 0 && x.actions > 0 && titre.includes(it.titre.replace(/^\S+\s/, '').slice(0, 10)) && (!e || (e.ouvert && e.apres && e.apres.texte > 200 && e.apres.champs > 0));
    detail = e
      ? `menu « ${e.menu.slice(0, 70)}… » → ouvert « ${e.ouvert} » → ${e.apres ? `${e.apres.url}, ${e.apres.texte} caractères, ${e.apres.champs} champs ou boutons` : 'rien'}`
      : `entraînement : ${x.cadres} page(s), ${x.texte} caractères, ${x.actions} liens ou boutons`;
  }
  const errs = erreurs.slice(e0);
  if (!ok) echecs++;
  console.log(`${ok ? '  ✓' : '  ✗'} ${String(i + 1).padStart(2)}. ${it.titre} — ${detail}${errs.length ? ` — ${errs.length} erreur(s) JS : ${errs.slice(0, 2).join(' | ')}` : ''}`);
  await shot(`${String(i + 1).padStart(2, '0')}-${it.type}.png`);
}
console.log(`Fichiers manquants (404) : ${manquants.size ? [...manquants].slice(0, 15).join(' ; ') : 'aucun'}`);
console.log(`Requêtes vers l'extérieur : ${dehors.size ? [...dehors].slice(0, 10).join(' ; ') : 'aucune'}`);
console.log(`Erreurs JS au total : ${erreurs.length}`);
const d = JSON.parse(await ev(`JSON.stringify(__data)`));
console.log(`Plateforme : statut « ${d['cmi.core.lesson_status']} », suspend_data ${String(d['cmi.core.suspend_data'] || d['cmi.suspend_data'] || '').length} caractères (≤ 4 096)`);
console.log(echecs ? `BILAN : ${echecs} élément(s) en échec sur ${items.length}` : `BILAN : les ${items.length} éléments fonctionnent`);
proc.kill(); process.exit(0);
