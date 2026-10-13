/* Mesure la mise en page réelle des 24 écrans dans un navigateur, à
 * 1920 × 1080 puis à 1366 × 768.
 *
 *     npm start            (dans un terminal)
 *     npm run check:layout (dans un autre)
 *
 * La page a le droit de défiler : un exercice chargé peut dépasser la
 * hauteur de l'écran, et c'est préférable à du contenu coupé. Le script
 * vérifie donc trois autres choses :
 *
 *   1. aucun contenu n'est COUPÉ par un conteneur à débordement masqué ;
 *   2. la LARGEUR est réellement occupée, pas tassée au centre ;
 *   3. aucun bloc n'en CHEVAUCHE un autre.
 *
 * Il contrôle aussi que la page de contexte s'affiche avant l'exercice.
 *
 * Nécessite Microsoft Edge ou Google Chrome. Sans navigateur, le script
 * s'arrête proprement : c'est une vérification d'appoint, pas une étape
 * obligatoire de `npm test`.
 */
import { readFileSync, existsSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const port = Number(option('--port', 4173));

const CANDIDATES = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
];
const browser = CANDIDATES.find(existsSync);
if (!browser) {
  console.log('Aucun navigateur trouvé (Edge ou Chrome). Vérification ignorée.');
  process.exit(0);
}

const sandbox = { window: {} };
new Function('window', readFileSync(resolve(root, 'js/catalog.js'), 'utf8'))(sandbox.window);
const catalog = sandbox.window.ATELIER_CATALOG;

/* La sonde ouvre la consigne, passe à l'exercice, puis mesure. Les
 * commandes clavier sont volontairement réduites à un point : elles sont
 * exclues du contrôle de coupure. */
const PROBE = `<script>
  addEventListener('load', () => setTimeout(() => {
    const briefing = !!document.querySelector('.mission-card');
    const start = document.querySelector('[data-action="start-exercise"]');
    if (start) start.click();

    // Un exercice à plusieurs cas intercale un menu : on y ouvre un cas,
    // sinon c'est le menu que l'on mesurerait, et jamais l'exercice.
    const openCase = document.querySelector('[data-action="open-case"]');
    const menu = !!openCase;
    if (openCase) openCase.click();

    setTimeout(() => {
      // 1. Contenu coupé par un conteneur à débordement masqué.
      const clipped = [];
      for (const node of document.querySelectorAll('#main *')) {
        if (node.getBoundingClientRect().height < 3) continue;
        if (node.closest('.keyboard-choices')) continue;   // masquage voulu
        let parent = node.parentElement;
        while (parent && parent !== document.body) {
          const flow = getComputedStyle(parent).overflowY;
          if (flow === 'hidden' || flow === 'auto' || flow === 'scroll') {
            const box = parent.getBoundingClientRect();
            if (node.getBoundingClientRect().bottom > box.bottom + 2) {
              clipped.push((node.className || node.tagName).toString().slice(0, 22));
              break;
            }
          }
          parent = parent.parentElement;
        }
      }

      // 2. Largeur réellement occupée.
      const viewportWidth = document.documentElement.clientWidth;
      const content = document.querySelector('#main > *');
      const usedWidth = content ? Math.round(content.getBoundingClientRect().width) : 0;
      // Les écrans centrés à dessein se reconnaissent à leur classe.
      // Le bloc mesuré peut être un <form> enveloppant : on cherche la
      // marque sur lui comme sur ses enfants directs.
      const marker = /(sorter|case-sheet|repair|step-layout|duo-page|briefing|case-menu)/;
      const centered = !!(content && (marker.test(String(content.className))
        || [...content.children].some(child => marker.test(String(child.className)))));

      // 3. Chevauchements entre blocs frères du formulaire.
      const overlaps = [];
      const form = document.querySelector('#main form');
      if (form) {
        const kids = [...form.children].filter(node => node.getBoundingClientRect().height > 2);
        for (let i = 0; i < kids.length - 1; i++) {
          const a = kids[i].getBoundingClientRect();
          for (let j = i + 1; j < kids.length; j++) {
            const b = kids[j].getBoundingClientRect();
            // Chevauchement réel : les deux boîtes se recouvrent en hauteur ET en largeur.
            if (a.bottom > b.top + 2 && a.top < b.bottom - 2 && a.right > b.left + 2 && a.left < b.right - 2) {
              overlaps.push((kids[i].className || kids[i].tagName).slice(0, 18) + ' / ' + (kids[j].className || kids[j].tagName).slice(0, 18));
            }
          }
        }
      }

      // Débordement horizontal : toujours un défaut, à toute largeur.
      window.scrollTo(99999, 0);
      const pageOverflowX = window.scrollX || document.documentElement.scrollLeft || 0;
      window.scrollTo(0, 0);

      document.title = 'PROBE' + JSON.stringify({
        briefing, menu, centered, viewportWidth, usedWidth, pageOverflowX,
        clipped: [...new Set(clipped)].slice(0, 4),
        overlaps: overlaps.slice(0, 3),
        pageHeight: Math.round(document.documentElement.scrollHeight)
      });
    }, 500);
  }, 400));
</script>`;

const temp = mkdtempSync(join(tmpdir(), 'atelier-layout-'));

/* Mesure une page. On en écrit une copie temporaire dont les chemins sont
 * réécrits vers le serveur local : les fichiers livrés ne bougent pas. */
function measure(file, width, height) {
  const page = join(temp, `${file}.html`);
  let html = readFileSync(resolve(root, 'exercices', `${file}.html`), 'utf8');
  html = html.replace(/(src|href)="\.\.\//g, `$1="http://127.0.0.1:${port}/`);
  html = html.replace('</body>', `${PROBE}</body>`);
  writeFileSync(page, html, 'utf8');
  try {
    const dom = execFileSync(browser, [
      '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
      `--window-size=${width},${height}`, '--virtual-time-budget=7000',
      '--dump-dom', `file:///${page.replace(/\\/g, '/')}`
    ], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 40000 });
    const match = dom.match(/<title>PROBE(\{.*?\})<\/title>/s);
    return match ? JSON.parse(match[1].replace(/&quot;/g, '"')) : null;
  } catch {
    return null;
  }
}

const SIZES = [[1920, 1080], [1366, 768]];
let failures = 0;
let unmeasured = 0;

for (const [width, height] of SIZES) {
  console.log(`\n${width} × ${height}`);
  for (const exercise of catalog.all) {
    const result = measure(exercise.file, width, height);
    if (!result) { console.log(`  ?  ${exercise.file} : mesure impossible`); unmeasured++; continue; }

    const usedRatio = result.viewportWidth ? result.usedWidth / result.viewportWidth : 1;
    const problems = [];
    if (!result.briefing) problems.push('pas de page de contexte');
    if (result.clipped.length) problems.push(`contenu coupé : ${result.clipped.join(', ')}`);
    // Un panneau doit occuper la largeur ; un écran centré doit
    // seulement rester lisible. D'où deux seuils plutôt qu'un.
    const minimum = result.centered ? 0.45 : 0.8;
    if (usedRatio < minimum) problems.push(`largeur occupée ${Math.round(usedRatio * 100)} % seulement`);
    if (result.overlaps.length) problems.push(`chevauchement : ${result.overlaps.join(', ')}`);
    if (result.pageOverflowX > 2) problems.push(`débordement horizontal de ${result.pageOverflowX} px`);
    if (problems.length) failures++;

    console.log(problems.length
      ? `  NON ${exercise.file.padEnd(10)} ${problems.join(' ; ')}`
      : `  OK  ${exercise.file.padEnd(10)} largeur ${Math.round(usedRatio * 100)} %${result.centered ? ' (écran centré)' : ''}, page de ${result.pageHeight} px${result.menu ? ' (via le menu des cas)' : ''}`);
  }
}

rmSync(temp, { recursive: true, force: true });

console.log(`\n${failures} écran${failures > 1 ? 's' : ''} en défaut.`);
if (unmeasured) console.log(`${unmeasured} mesure(s) impossible(s).`);
process.exit(failures ? 1 : 0);
