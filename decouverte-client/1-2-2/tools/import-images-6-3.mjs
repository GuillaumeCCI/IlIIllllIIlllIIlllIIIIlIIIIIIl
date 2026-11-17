/* Importe les images fournies pour 6.3 « Ma banque de questions terrain ».
 * La carte du chemin : barre horizontale du milieu masquée (comme 6.2), 1400 px.
 * Les visages : carrés de 400 px. Le décor : 1400 × 788. En WebP.
 * Une image absente des Téléchargements est simplement ignorée.
 *
 *     node tools/import-images-6-3.mjs
 */
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const sharp = require('../../../node_modules/sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dl = join(homedir(), 'Downloads');
const out = join(root, 'assets', 'illustrations');

const CHEMIN = 'Présentation institutionnelle en six étapes.png';
const FACES = [
  ['Portrait d’une manager en veste sauge.png', 'visages/responsable.webp'],
  ['Lucas, portrait risographique sur fond crème.png', 'visages/nouveau-collegue.webp']
];
const DECORS = [
  ['Salle d’équipe vide, tableau en entonnoir.png', 'dialogues/salle-equipe.webp']
];

const have = f => { const ok = existsSync(join(dl, f)); if (!ok) console.log(`absente : ${f}`); return ok; };

if (have(CHEMIN)) {
  const src = join(dl, CHEMIN);
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const lum = y => { let s = 0; for (let x = Math.round(info.width * .2); x < info.width * .8; x++) { const i = (y * info.width + x) * info.channels; s += data[i] + data[i + 1] + data[i + 2]; } return s; };
  let bar = 0, darkest = Infinity;
  for (let y = Math.round(info.height * .47); y < info.height * .55; y++) { const l = lum(y); if (l < darkest) { darkest = l; bar = y; } }
  const at = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
  const [r, g, b] = at(20, bar);
  const rect = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}"><rect x="0" y="${bar - 6}" width="${info.width}" height="13" fill="rgb(${r},${g},${b})"/></svg>`);
  const masked = await sharp(src).composite([{ input: rect }]).png().toBuffer();
  await sharp(masked).resize({ width: 1400 }).webp({ quality: 84 }).toFile(join(out, 'parcours', 'banque-chemin.webp'));
  console.log(`parcours/banque-chemin.webp (origine ${info.width}×${info.height}, barre masquée à y=${bar})`);
}
for (const [src, dest] of FACES) {
  if (!have(src)) continue;
  const meta = await sharp(join(dl, src)).metadata();
  await sharp(join(dl, src)).resize(400, 400, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(join(out, dest));
  console.log(`${dest} (origine ${meta.width}×${meta.height})`);
}
for (const [src, dest] of DECORS) {
  if (!have(src)) continue;
  const meta = await sharp(join(dl, src)).metadata();
  await sharp(join(dl, src)).resize({ width: 1400, height: 788, fit: 'cover' }).webp({ quality: 80 }).toFile(join(out, dest));
  console.log(`${dest} (origine ${meta.width}×${meta.height})`);
}
