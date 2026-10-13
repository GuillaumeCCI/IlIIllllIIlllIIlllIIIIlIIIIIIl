/* LANCE LES TESTS DE TOUS LES MODULES DE TOUS LES PARCOURS.
 *
 *     npm test                    (tout)
 *     npm test -- atelier-vente   (un seul parcours)
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv[2];
const isModule = dir => existsSync(join(dir, 'js/catalog.js')) && existsSync(join(dir, 'package.json'));
let failed = 0;
for (const parcours of readdirSync(root).filter(name => !name.startsWith('.') && (!only || name === only)).sort()) {
  const dir = join(root, parcours);
  let modules = [];
  try { modules = readdirSync(dir).filter(name => isModule(join(dir, name))).sort(); } catch { continue; }
  for (const module of modules) {
    console.log(`\n══ ${parcours} / ${module}`);
    const run = spawnSync('npm', ['test'], { cwd: join(dir, module), stdio: 'inherit', shell: true });
    if (run.status !== 0) failed++;
  }
}
console.log(failed ? `\n${failed} module(s) en échec.` : '\nTous les tests passent.');
process.exit(failed ? 1 : 0);
