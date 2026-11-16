/* Capture d'écran d'une page, pour contrôle visuel.
 * Usage : node tools/shot.mjs s1-a [etape] [largeur] [hauteur]
 *   etape : 0 = page de contexte, 1 = menu des cas, 2 = exercice
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const [file = 's1-a', step = '0', width = 1920, height = 1080] = process.argv.slice(2);

const browser = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe'
].find(existsSync);
if (!browser) { console.error('Edge introuvable'); process.exit(1); }

const out = join(root, 'captures');
mkdirSync(out, { recursive: true });

const advance = Number(step) >= 1
  ? `const start = document.querySelector('[data-action="start-exercise"]');
     if (start) start.click();`
  : '';
const openCase = Number(step) >= 2
  ? `setTimeout(() => {
       const open = document.querySelector('[data-action="open-case"]');
       if (open) open.click();
     }, 250);`
  : '';

const page = resolve(root, 'exercices', '_shot.html');
writeFileSync(page, readFileSync(resolve(root, 'exercices', `${file}.html`), 'utf8')
  .replace('</body>', `<script>
    addEventListener('load', () => setTimeout(() => { ${advance} ${openCase} }, 350));
  </script></body>`), 'utf8');

try {
  const target = join(out, `${file}-${step}.png`);
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--window-size=${width},${height}`, '--virtual-time-budget=8000',
    `--screenshot=${target}`, 'http://127.0.0.1:4173/exercices/_shot.html'
  ], { stdio: ['ignore', 'ignore', 'ignore'], timeout: 40000 });
  console.log(target);
} finally {
  rmSync(page, { force: true });
}
