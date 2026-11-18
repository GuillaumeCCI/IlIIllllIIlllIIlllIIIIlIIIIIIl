/* Capture du corrigé d'un exercice à champs : remplit chaque cas avec les
 * réponses données, passe l'auto-évaluation, ferme les fenêtres.
 * Usage : node tools/shot-corrige.mjs s3-3-2 "réponse 1" "réponse 2" … [--h=1400]
 * (serveur du module lancé : npm start). */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const args = process.argv.slice(2);
const height = Number((args.find(a => a.startsWith('--h=')) || '--h=1400').slice(4));
const [file, ...answers] = args.filter(a => !a.startsWith('--'));
const browser = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const out = join(root, 'captures');
mkdirSync(out, { recursive: true });

const script = `<script>
addEventListener('load', () => {
  try { localStorage.clear(); } catch (e) {}
  const T = ${JSON.stringify(answers)};
  let step = 0, self = false;
  setInterval(() => {
    document.querySelectorAll('button').forEach(b => { if (/C.est parti|Passer|Terminer|Commencer|J.ai compris/.test(b.textContent)) b.click(); });
    const ta = document.querySelector('textarea'); const go = document.querySelector('.k-submit');
    if (ta && go && step < T.length && !ta.value) { ta.value = T[step]; ta.dispatchEvent(new Event('input', { bubbles: true })); setTimeout(() => go.click(), 150); step++; return; }
    // Un exercice à choix : une réponse cochée (en alternant), puis la suite.
    const choices = [...document.querySelectorAll('.fm-choice')];
    if (!ta && go && choices.length && !document.querySelector('.fm-choice.is-chosen') && !document.querySelector('.fm-line, .fm-review')) {
      choices[(step++) % 2].click(); setTimeout(() => { const g = document.querySelector('.k-submit'); if (g) g.click(); }, 200); return;
    }
    if (step >= T.length && !self && document.querySelector('.fm-self-question')) {
      document.querySelectorAll('tbody tr, [role="radiogroup"], .k-matrix-row').forEach(r => { const b = r.querySelector('button, input'); if (b) b.click(); });
      setTimeout(() => { const g = document.querySelector('.k-submit'); if (g) g.click(); }, 300); self = true;
    }
  }, 600);
});
</script></body>`;
const page = resolve(root, 'exercices', '_shot.html');
writeFileSync(page, readFileSync(resolve(root, 'exercices', `${file}.html`), 'utf8').replace('</body>', script), 'utf8');
try {
  const target = join(out, `${file}-corrige.png`);
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', `--window-size=1440,${height}`,
    '--virtual-time-budget=40000', `--screenshot=${target}`, 'http://127.0.0.1:4173/exercices/_shot.html'], { stdio: 'ignore', timeout: 60000 });
  console.log(target);
} finally {
  rmSync(page, { force: true });
}
