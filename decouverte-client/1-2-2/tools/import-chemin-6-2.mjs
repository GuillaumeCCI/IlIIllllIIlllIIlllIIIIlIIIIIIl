/* Importe la carte du chemin de 6.2 « Le coach » (fournie par l'utilisateur).
 *
 *     node tools/import-chemin-6-2.mjs
 */
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const sharp = require('../../../node_modules/sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets', 'illustrations', 'parcours');
mkdirSync(out, { recursive: true });
const src = join(homedir(), 'Downloads', 'Parcours ludique en six étapes.png');
const meta = await sharp(src).metadata();
await sharp(src).resize({ width: 1400 }).webp({ quality: 82 }).toFile(join(out, 'coach-chemin.webp'));
console.log(`parcours/coach-chemin.webp (origine ${meta.width}×${meta.height})`);
