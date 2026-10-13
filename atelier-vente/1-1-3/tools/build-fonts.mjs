/* ══════════════════════════════════════════════════════════════════════
   FIRA SANS · de l'archive OTF aux fichiers servis

   L'archive livrée contient 32 fichiers OTF, soit 5,8 Mo : beaucoup trop
   pour une page web, et dans un format que les navigateurs chargent mal.
   Ce script ne retient que les graisses réellement utilisées par le site
   et les convertit en WOFF2, le format compressé du web.

   Pourquoi WOFF2 et pas OTF :
     · un OTF se télécharge tel quel, un WOFF2 est compressé (Brotli) et
       pèse environ trois fois moins ;
     · c'est le format attendu par tous les navigateurs actuels, et le seul
       nécessaire : inutile de prévoir du WOFF ou de l'EOT.

   À relancer seulement si vous changez les graisses retenues :

       npm install --no-save wawoff2
       node tools/build-fonts.mjs <dossier contenant les .otf>

   Les fichiers produits vont dans assets/fonts/ et sont versionnés : une
   fois générés, le site n'a plus besoin de ce script ni de wawoff2.
   ══════════════════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compress } from 'wawoff2';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('Indiquez le dossier contenant les fichiers .otf.');
  console.error('Exemple : node tools/build-fonts.mjs C:/Temp/fira-sans');
  process.exit(1);
}

/* Les graisses retenues.
 *
 * Les feuilles demandent 550, 600, 650, 700, 750 et 800, en plus du texte
 * courant. Ces valeurs intermédiaires n'existent pas en tant que fichiers :
 * le navigateur choisit la graisse déclarée la plus proche. Quatre faces
 * suffisent donc à couvrir toute l'échelle sans qu'aucune ne soit simulée.
 *
 *   demandé   ->  face servie
 *   400           Regular (le texte courant, non déclaré dans les feuilles)
 *   550, 600      SemiBold
 *   650, 700      Bold
 *   750, 800      ExtraBold
 *
 * L'italique du Regular est inclus : les citations clients en dépendent,
 * et sans lui le navigateur pencherait artificiellement les lettres. */
const FACES = [
  { file: 'FiraSans-Regular.otf',   out: 'fira-sans-400.woff2',  weight: 400, style: 'normal' },
  { file: 'FiraSans-Italic.otf',    out: 'fira-sans-400i.woff2', weight: 400, style: 'italic' },
  { file: 'FiraSans-SemiBold.otf',  out: 'fira-sans-600.woff2',  weight: 600, style: 'normal' },
  { file: 'FiraSans-Bold.otf',      out: 'fira-sans-700.woff2',  weight: 700, style: 'normal' },
  { file: 'FiraSans-ExtraBold.otf', out: 'fira-sans-800.woff2',  weight: 800, style: 'normal' }
];

const target = join(root, 'assets', 'fonts');
mkdirSync(target, { recursive: true });

let before = 0;
let after = 0;

for (const face of FACES) {
  const from = join(source, face.file);
  if (!existsSync(from)) { console.error(`  manquant : ${face.file}`); continue; }
  const otf = readFileSync(from);
  const woff2 = Buffer.from(await compress(otf));
  writeFileSync(join(target, face.out), woff2);
  before += otf.length;
  after += woff2.length;
  const ko = n => `${Math.round(n / 1024)} ko`;
  console.log(`  ${face.out.padEnd(22)} ${ko(otf.length).padStart(8)} -> ${ko(woff2.length).padStart(8)}`);
}

/* La licence accompagne les fichiers : Fira Sans est sous SIL OFL, qui
 * demande que la licence soit distribuée avec la police. */
const licence = readdirSync(source).find(name => /open font license/i.test(name));
if (licence) {
  writeFileSync(join(target, 'LICENCE-OFL.txt'), readFileSync(join(source, licence)));
  console.log('  LICENCE-OFL.txt        copiée (obligatoire : SIL OFL)');
}

const ko = n => `${Math.round(n / 1024)} ko`;
console.log(`\n${ko(before)} d'OTF -> ${ko(after)} de WOFF2 (${Math.round((1 - after / before) * 100)} % de moins).`);
