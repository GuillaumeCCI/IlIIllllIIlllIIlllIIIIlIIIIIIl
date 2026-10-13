/* Allège les fonds avant installation.
 *
 * Un fond est une image décorative, posée derrière le contenu et jamais
 * regardée de près : elle n'a pas besoin de la définition d'une photo.
 * On la ramène à 1920 px de large et on la repalettise, ce qui suffit
 * largement pour ces aplats et ce feuillage.
 *
 *     npm install --no-save sharp
 *     node tools/compress-backgrounds.mjs <source> <destination>
 */
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const [source, target] = process.argv.slice(2);
if (!source || !target) {
  console.error('Usage : node tools/compress-backgrounds.mjs <source> <destination>');
  process.exit(1);
}
mkdirSync(target, { recursive: true });

const files = readdirSync(source).filter(name => /\.(png|jpe?g)$/i.test(name)).sort();
let before = 0;
let after = 0;

for (const name of files) {
  const from = join(source, name);
  const to = join(target, `${parse(name).name}.webp`);

  /* 1920 px suffit : au-delà, l'écran ne montre pas la différence sur un
   * fond. Le WEBP est ici bien plus efficace que le PNG : la texture de
   * papier de ces images résiste aux palettes, et un PNG restait autour
   * du mégaoctet là où le WEBP tient en 70 ko, sans différence visible. */
  await sharp(from)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(to);

  const a = statSync(from).size;
  const b = statSync(to).size;
  before += a;
  after += b;
  const ko = n => `${Math.round(n / 1024)} ko`;
  console.log(`  ${parse(name).name.padEnd(30)} ${ko(a).padStart(9)} -> ${ko(b).padStart(8)}`);
}

const mo = n => `${(n / 1024 / 1024).toFixed(1)} Mo`;
console.log(`\n${mo(before)} -> ${mo(after)} (${Math.round((1 - after / before) * 100)} % de moins).`);
