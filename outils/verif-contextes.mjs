/* CHAQUE EXERCICE A SA FENÊTRE DE CONTEXTE · lancé par outils/tester.mjs.
 *
 * Pour tous les modules de tous les parcours : un exercice doit ouvrir une
 * fenêtre de contexte à l'arrivée, de l'une de ces façons :
 *   - son écran appelle kit.context (kit.selfContext ne compte pas : c'est la
 *     fenêtre de l'écran d'autoévaluation, pas celle de l'arrivée) ;
 *   - son contenu a une clé `welcome` (écrans communs, moteur/js/mounts.js),
 *     ou `context` pour les cartes Vrai/Faux (mountDeck ouvre sa fenêtre) ;
 *   - le module la déclare dans js/contextes.js (window.ATELIER_CONTEXTES),
 *     et ses pages chargent ce fichier.
 *
 *     node outils/verif-contextes.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
let checked = 0;
for (const parcours of readdirSync(root).filter(p => !p.startsWith('.') && statSync(join(root, p)).isDirectory()).sort()) {
  for (const mod of readdirSync(join(root, parcours)).filter(m => existsSync(join(root, parcours, m, 'js/catalog.js'))).sort()) {
    const dir = join(root, parcours, mod, 'js');
    const ctx = { window: {} };
    ctx.globalThis = ctx.window;
    vm.createContext(ctx);
    for (const f of readdirSync(dir).filter(f => /^(catalog|contextes|content-s\d+(-\w+)?)\.js$/.test(f)).sort()) {
      try { vm.runInContext(readFileSync(join(dir, f), 'utf8'), ctx, { filename: f }); } catch { /* un contenu qui dépend du navigateur */ }
    }
    const declared = ctx.window.ATELIER_CONTEXTES || {};
    const loaded = file => existsSync(join(root, parcours, mod, 'exercices', `${file}.html`))
      && ['src="../js/contextes.js"', 'moteur/js/kit.js'].every(s => readFileSync(join(root, parcours, mod, 'exercices', `${file}.html`), 'utf8').includes(s));
    for (const serie of ctx.window.ATELIER_CATALOG.series) {
      for (const e of serie.exercises) {
        checked++;
        const key = `${serie.id}-${e.id}`;
        const screen = join(dir, 'screens', `${e.file}.js`);
        const src = existsSync(screen) ? readFileSync(screen, 'utf8') : '';
        const m = /mount\w+\('[^']+',\s*window\.(ATELIER_S\d+)\['([^']+)'\]/.exec(src);
        const content = m && ctx.window[m[1]] && ctx.window[m[1]][m[2]];
        const own = content ? !!(content.welcome || (content.context && typeof content.context === 'object' && /mountDeck/.test(src))) : /kit\.context\(|\.context\(\[/.test(src);
        if (own) continue;
        if (!declared[key]) problems.push(`${parcours}/${mod} ${key} « ${e.label} » : aucune fenêtre de contexte`);
        else if (!loaded(e.file)) problems.push(`${parcours}/${mod} ${key} : la page ne charge pas js/contextes.js et moteur/js/kit.js`);
      }
    }
  }
}
console.log(`\n══ Fenêtres de contexte : ${checked} exercices vérifiés`);
if (problems.length) {
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log('  ✓ chaque exercice ouvre une fenêtre de contexte à l’arrivée');
