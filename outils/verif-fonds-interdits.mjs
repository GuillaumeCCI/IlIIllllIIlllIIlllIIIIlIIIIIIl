/* FONDS INTERDITS · un fond refusé ne doit plus jamais revenir, nulle part.
 *
 *   node outils/verif-fonds-interdits.mjs            vérifie tout le dépôt (lancé par npm test)
 *   node outils/verif-fonds-interdits.mjs --ajouter <image> "<raison>"
 *                                                     interdit un fond de plus
 *
 * Chaque fond interdit est gardé dans outils/fonds-interdits.json par son
 * empreinte exacte (MD5) et par une vignette de 48 × 27 pixels : une copie
 * sous un autre nom, redimensionnée ou convertie (PNG, WebP…) est repérée
 * aussi. Toute image du dépôt trop proche fait échouer les tests.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LISTE = join(root, 'outils/fonds-interdits.json');
const SEUIL = 1.5; // écart moyen par canal (0-255) : en dessous, c'est le même dessin
const liste = existsSync(LISTE) ? JSON.parse(readFileSync(LISTE, 'utf8')) : [];

const md5 = f => createHash('md5').update(readFileSync(f)).digest('hex');
const vignette = async f => sharp(f).resize(48, 27, { fit: 'fill' }).removeAlpha().raw().toBuffer();
const ecart = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };

if (process.argv[2] === '--ajouter') {
  const [, , , image, raison = ''] = process.argv;
  const v = await vignette(image);
  liste.push({ nom: relative(root, resolve(image)).replace(/\\/g, '/'), raison, md5: md5(image), vignette: v.toString('base64'), ajoute: new Date().toISOString().slice(0, 10) });
  writeFileSync(LISTE, JSON.stringify(liste, null, 2) + '\n');
  console.log(`Fond interdit ajouté : ${image}`);
  process.exit(0);
}

const images = [];
(function marche(d) {
  for (const n of readdirSync(d)) {
    if (n === 'node_modules' || n === '.git') continue;
    const p = join(d, n);
    if (statSync(p).isDirectory()) marche(p);
    else if (/\.(webp|png|jpe?g|avif|gif)$/i.test(n)) images.push(p);
  }
})(root);

console.log(`\n══ Fonds interdits : ${liste.length} fond(s), ${images.length} images vérifiées`);
const interdits = liste.map(x => ({ ...x, v: Buffer.from(x.vignette, 'base64') }));
let trouves = 0;
for (const f of images) {
  const exact = md5(f);
  let motif = interdits.find(x => x.md5 === exact);
  if (!motif) {
    let v;
    try { v = await vignette(f); } catch { continue; }
    motif = interdits.find(x => ecart(x.v, v) < SEUIL);
  }
  if (motif) { trouves++; console.log(`  ✗ ${relative(root, f)} : fond interdit (${motif.raison || motif.nom})`); }
}
console.log(trouves ? `${trouves} image(s) à remplacer.` : '  ✓ aucun fond interdit');
process.exit(trouves ? 1 : 0);
