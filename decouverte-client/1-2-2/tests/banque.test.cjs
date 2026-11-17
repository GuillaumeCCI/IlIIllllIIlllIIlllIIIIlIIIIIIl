/* 6.3 « Ma banque de questions terrain » : le juge de la forme d'une question.
 *
 * Le métier de l'apprenant n'est pas connu d'avance : chaque question écrite
 * est jugée sur sa FORME (ouverte, fermée, alternative, orientée, produit).
 * Cette banque mêle des métiers variés, des fautes et des tournures parlées.
 * Ajoutez ici toute question qu'un apprenant a écrite et que le juge a mal lue.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

globalThis.window = globalThis;
new Function(fs.readFileSync(path.join(__dirname, '../js/content-s6.js'), 'utf8'))();
const Q = globalThis.ATELIER_QTYPE;

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

const BANK = {
  ouverte: [
    'Qu’est-ce qui vous amène aujourd’hui ?',
    'Qu’est-ce qui vous a fait choisir ce modèle ?',
    'Comment utiliserez-vous ce vélo, au quotidien ?',
    'Comment fonctionne votre activité aujourd’hui ?',
    'Racontez-moi une journée type dans votre atelier.',
    'Parlez-moi de votre projet de déménagement.',
    'Pourquoi souhaitez-vous changer de banque maintenant ?',
    'Quels sont vos critères pour choisir un appartement ?',
    'Qu’attendez-vous de votre future voiture ?',
    'Que se passerait-il si votre machine tombait en panne une semaine ?',
    'Qu’est-ce qui ne vous convenait plus avec l’ancien logiciel ?',
    'Dans quelles situations avez-vous du mal à lire ?',
    'En quoi votre organisation actuelle vous pose-t-elle problème ?',
    'Qu’est-ce qui a changé pour vous depuis trois ans ?',
    'Et pour vous, Monsieur, qu’est-ce qui compte ?',
    'Décrivez-moi comment se passe une livraison chez vous.',
    'Quelle est votre situation, pour que je vous réponde au mieux ?',
    'Qu’est-ce qui s’était mal passé, de votre point de vue ?',
    'quest ce qui vous gene le plus aujourdhui',
    'Comment ça se passe quand il manque quelqu’un dans l’équipe ?',
    'Qui d’autre intervient dans la décision ?',
    'Pour vous, à quoi doit servir cette nouvelle cuisine ?',
    'Dites-moi ce qui compte le plus pour vous dans ce projet.'
  ],
  fermee: [
    'Vous avez un budget ?',
    'Vous avez des enfants ?',
    'Est-ce que vous utilisez souvent votre voiture ?',
    'Est-ce que la livraison doit être faite avant vendredi ?',
    'Combien de salariés avez-vous ?',
    'Quand souhaitez-vous emménager ?',
    'Où sera-t-il installé ?',
    'L’emplacement fait-il 60 cm de large ?',
    'Avez-vous déjà un fournisseur ?',
    'Êtes-vous satisfait de votre contrat actuel ?',
    'Y a-t-il un ascenseur dans l’immeuble ?',
    'Vous roulez beaucoup sur autoroute ?',
    'C’est pour un usage professionnel ?',
    'Vous êtes propriétaire de votre logement ?',
    'Le chantier peut-il commencer en mars ?',
    'Vous l’avez vu sur notre site ?',
    'Vous connaissez déjà nos magasins ?'
  ],
  alternative: [
    'Livraison seule, ou avec installation ?',
    'Vous préférez du bois ou du laqué ?',
    'Pose libre ou encastrable ?',
    'Plutôt diesel, essence ou hybride ?',
    'Vous payez en une fois ou en plusieurs fois ?',
    'Entre la capacité et le niveau sonore, qu’est-ce qui compte le plus pour vous ?',
    'Un rendez-vous le matin ou l’après-midi ?',
    'Vous voulez être livré à domicile ou retirer en magasin ?',
    'Entre le prix et la rapidité, lequel passe en premier ?',
    'Une seule pièce ou tout l’appartement ?'
  ],
  orientee: [
    'Vous voulez sûrement le plus fiable, non ?',
    'Le budget compte avant tout, n’est-ce pas ?',
    'Vous êtes d’accord que c’est le plus pratique ?',
    'Tout est important pour vous, j’imagine ?',
    'Il vous faut donc un grand coffre ?',
    'Vous voulez donc un îlot central, c’est ça ?',
    'Vous ne pensez pas qu’un modèle plus récent serait mieux ?',
    'C’est forcément la sécurité qui passe en premier ?',
    'Vous ne voulez pas prendre de risque, je suppose ?',
    'Une petite voiture, c’est ce qu’il y a de mieux en ville, pas vrai ?',
    'Le prix, c’est quand même le plus important ?'
  ],
  produit: [
    'On a une promotion sur ce modèle, ça vous intéresse ?',
    'Je vous propose notre formule premium, elle règle tout.',
    'Vous savez qu’on a mieux pour le même prix ?',
    'Nous avons un modèle parfait pour vous : on l’essaie ?',
    'Je vous montre tout de suite nos plus beaux canapés ?',
    'Je vous conseille le modèle hybride, il est idéal pour vous.',
    'Notre offre fidélité vous ferait économiser 20 %, non ?'
  ],
  vide: ['ok', 'je sais pas', 'xx']
};
// L'orientée et la vente déguisée sont deux pièges : l'un ou l'autre convient pour le piège.
const OK_FOR = { orientee: ['orientee', 'produit'], produit: ['produit', 'orientee'], vide: ['vide', 'pas-question'] };

console.log('\nMa banque de questions (6.3) · le juge de la forme');
for (const [type, list] of Object.entries(BANK)) {
  test(`${list.length} questions « ${type} » reconnues`, () => {
    const accepted = OK_FOR[type] || [type];
    const bad = list.filter(t => !accepted.includes(Q.classify(t))).map(t => `${t} → ${Q.classify(t)}`);
    assert.strictEqual(bad.join(' | '), '');
  });
}

test('les questions pour hiérarchiser sont repérées', () => {
  const yes = ['Entre la capacité et le niveau sonore, qu’est-ce qui compte le plus pour vous ?', 'Si vous deviez garder un seul critère, lequel ?', 'Qu’est-ce qui passe en premier pour vous ?', 'Pouvez-vous classer ces trois critères ?', 'Qu’est-ce qui est prioritaire pour vous ?'];
  const no = ['Comment utiliserez-vous ce vélo ?', 'Vous avez un budget ?'];
  const bad = [...yes.filter(t => !Q.prioritizes(t)), ...no.filter(t => Q.prioritizes(t))];
  assert.strictEqual(bad.join(' | '), '');
});

console.log(`\n${passed} tests réussis, ${failed} en échec.`);
if (failed) process.exitCode = 1;
