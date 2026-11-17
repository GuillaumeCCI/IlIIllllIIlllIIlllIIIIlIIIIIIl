/* Importe la carte du chemin de 6.2 « Le coach » (fournie par l'utilisateur),
 * en masquant la barre horizontale du milieu (recouverte de la couleur du fond).
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
const src = join(homedir(), 'Downloads', 'Parcours de formation en six modules.png');

const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
// Trouve la barre : la ligne la plus sombre entre 47 % et 55 % de la hauteur (entre les deux rangées, sans texte).
const lum = y => { let s = 0; for (let x = Math.round(info.width * .2); x < info.width * .8; x++) { const i = (y * info.width + x) * info.channels; s += data[i] + data[i + 1] + data[i + 2]; } return s; };
let bar = 0, darkest = Infinity;
for (let y = Math.round(info.height * .47); y < info.height * .55; y++) { const l = lum(y); if (l < darkest) { darkest = l; bar = y; } }
// La couleur du fond, au bord gauche, à la hauteur de la barre (la barre n'y va pas).
const at = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
const [r, g, b] = at(20, bar);
const rect = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}"><rect x="0" y="${bar - 6}" width="${info.width}" height="13" fill="rgb(${r},${g},${b})"/></svg>`);
const masked = await sharp(src).composite([{ input: rect }]).png().toBuffer();
await sharp(masked).resize({ width: 1400 }).webp({ quality: 84 }).toFile(join(out, 'coach-chemin.webp'));
console.log(`parcours/coach-chemin.webp (origine ${info.width}×${info.height}, barre masquée à y=${bar}, fond rgb(${r},${g},${b}))`);
