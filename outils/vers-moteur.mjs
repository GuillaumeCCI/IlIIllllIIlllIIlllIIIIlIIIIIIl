/* PASSE UN FICHIER DANS LE MOTEUR COMMUN.
 *
 *     node outils/vers-moteur.mjs js/core.js atelier-vente/1-1-1
 *
 * Copie la version du module indiqué dans moteur/, supprime ce fichier de
 * tous les modules de tous les parcours, et réécrit les pages (accueil des
 * modules, pages d'exercice, gabarit tools/build-pages.mjs) pour qu'elles
 * chargent la copie du moteur. À utiliser une fois la version commune prête :
 * elle doit convenir à tous les modules (lancer ensuite npm test).
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [file, from] = process.argv.slice(2);
if (!file || !from || !/^(js|css)\/[\w.-]+\.(js|css)$/.test(file) || !existsSync(join(root, from, file))) {
  console.error('Usage : node outils/vers-moteur.mjs <js|css>/<fichier> <parcours>/<module>');
  process.exit(1);
}
const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' });

// La version retenue devient celle du moteur.
mkdirSync(dirname(join(root, 'moteur', file)), { recursive: true });
copyFileSync(join(root, from, file), join(root, 'moteur', file));
git('add', `moteur/${file}`);

// Tous les modules de tous les parcours : fichier retiré, pages réécrites.
const name = file.replace(/[.]/g, '\\.');
const pattern = new RegExp(`((?:src|href)=")((?:\\.\\./)?)(${name})"`, 'g');
const rewrite = path => {
  const text = readFileSync(path, 'utf8');
  const out = text.replace(pattern, (_, attr, up, p) => `${attr}${up ? '../../../' : '../../'}moteur/${p}"`);
  if (out !== text) writeFileSync(path, out);
  return out !== text;
};
let modules = 0, pages = 0;
for (const parcours of readdirSync(root).filter(n => !n.startsWith('.') && n !== 'moteur' && n !== 'outils')) {
  let entries = [];
  try { entries = readdirSync(join(root, parcours)); } catch { continue; }
  for (const module of entries.filter(m => existsSync(join(root, parcours, m, 'js/catalog.js')))) {
    const dir = join(root, parcours, module);
    modules++;
    if (existsSync(join(dir, file))) git('rm', '-q', '-f', `${parcours}/${module}/${file}`);
    if (rewrite(join(dir, 'index.html'))) pages++;
    for (const f of readdirSync(join(dir, 'exercices')).filter(f => f.endsWith('.html'))) if (rewrite(join(dir, 'exercices', f))) pages++;
    if (existsSync(join(dir, 'tools/build-pages.mjs'))) rewrite(join(dir, 'tools/build-pages.mjs'));
  }
}
console.log(`${file} : dans moteur/ (version de ${from}), retiré de ${modules} modules, ${pages} pages réécrites.`);
