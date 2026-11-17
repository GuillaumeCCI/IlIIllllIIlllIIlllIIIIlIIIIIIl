/* Importe les images fournies pour 6.2 « Le coach » (une seule fois) :
 * visages carrés de 400 px, décors de 1400 px de large, en WebP.
 *
 *     node tools/import-images-6-2.mjs
 */
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const require = createRequire(import.meta.url);
const sharp = require('../../../node_modules/sharp');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dl = join(homedir(), 'Downloads');
const out = join(root, 'assets', 'illustrations');

const FACES = [
  ['Camille, portrait professionnel attentif.png', 'visages/camille.webp'],
  ['Grand-mère souriante aux cheveux argentés.png', 'visages/mme-leroy.webp'],
  ['Portrait risographié d’un homme prudent.png', 'visages/m-leroy.webp'],
  ['Karim, portrait risographique en costume indigo.png', 'visages/karim.webp'],
  ['Portrait d’un directeur d’hôtel préoccupé.png', 'visages/m-vidal.webp']
];
const DECORS = [
  ['Showroom de cuisines aux accents indigo.png', 'dialogues/magasin-cuisines.webp'],
  ['Bureau d’hôtel quatre étoiles.png', 'dialogues/hotel-bureau.webp']
];

for (const [src, dest] of FACES) {
  const meta = await sharp(join(dl, src)).metadata();
  await sharp(join(dl, src)).resize(400, 400, { fit: 'cover', position: 'top' }).webp({ quality: 82 }).toFile(join(out, dest));
  console.log(`${dest} (origine ${meta.width}×${meta.height})`);
}
for (const [src, dest] of DECORS) {
  const meta = await sharp(join(dl, src)).metadata();
  await sharp(join(dl, src)).resize({ width: 1400, height: 788, fit: 'cover' }).webp({ quality: 80 }).toFile(join(out, dest));
  console.log(`${dest} (origine ${meta.width}×${meta.height})`);
}
