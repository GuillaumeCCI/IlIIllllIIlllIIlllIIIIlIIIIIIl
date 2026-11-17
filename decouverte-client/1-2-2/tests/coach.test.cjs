/* 6.2 « Le coach » : la correction des réponses rédigées.
 *
 * Pour chaque diagnostic écrit et chaque question réécrite, une banque de
 * réponses d'apprenants : des JUSTES, formulées de façons variées (langage
 * courant, fautes, ordre différent), qui doivent obtenir « Bien vu ! » ; des
 * FAUSSES (contresens, produit, question fermée ou orientée, hors sujet,
 * charabia), qui ne doivent jamais l'obtenir. Ajoutez une réponse ici dès
 * qu'un apprenant en écrit une que la correction juge mal.
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

globalThis.window = globalThis;
new Function(fs.readFileSync(path.join(__dirname, '../js/content-s6.js'), 'utf8'))();
const J = globalThis.ATELIER_COACH;
const C = globalThis.ATELIER_S6['6.2'];

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (error) { failed++; console.error(`  ✗ ${name}\n      ${error.message}`); }
}

/* LES DIAGNOSTICS ÉCRITS (les trois derniers moments de chaque dossier). */
const DIAG = {
  'A · Bois ou laqué': {
    justes: [
      'Une question alternative posée trop tôt, sur les finitions, alors que le couple n’a pas fini de dire ses attentes.',
      'C’est une alternative prématurée : elle parle déjà esthétique alors qu’ils n’y ont pas encore pensé.',
      'Elle leur donne un choix entre deux options, trop tôt, sur un détail.',
      'Question alternative, elle va trop vite sur la couleur et le matériau.',
      'Elle saute aux finitions trop vite avec une question fermée, ils ne savent pas répondre.',
      'Alternative trop tôt : on parle de déco avant de connaître leurs besoins.',
      'question alternatif trop tot sur l esthetique',
      'C’est une question à choix (bois ou laqué) posée avant d’avoir compris leurs attentes, sur un détail.',
      'Elle se précipite sur les finitions avec une alternative, le couple n’y a pas encore réfléchi.',
      'Une question fermée sur le matériau, trop rapide : ce n’est pas le moment, il faut d’abord connaître leurs besoins.',
      'Trop tôt pour parler du goût : c’est une alternative, et ils ne savent pas quoi dire.',
      'Elle pose une alternative sur l’apparence de la cuisine alors qu’il fallait encore explorer leurs attentes : c’est prématuré.'
    ],
    fausses: [
      'Bonne question ouverte, elle les fait parler.',
      'Très bien, elle aide le couple à se projeter.',
      'Elle a raison de parler du bois.',
      'hhhhh jjjj',
      'Une alternative.'
    ]
  },
  'A · Le budget': {
    justes: [
      'Question fermée assez sèche, mais elle obtient quand même le montant : 15 000 €.',
      'Une fermée posée sans transition, mais ça fonctionne : ils donnent leur limite.',
      'C’est une question fermée un peu brutale, mais l’information est obtenue.',
      'Fermée et directe, mal amenée, pourtant M. Leroy répond et donne le chiffre.',
      'Question sèche sur le budget, mais elle a quand même le chiffre.',
      'question fermee, abrupte, mais ils repondent 15000',
      'Elle est fermée et mal amenée ; ça marche quand même, elle obtient la limite de 15 000 €.',
      'Une question oui ou non posée sèchement : on obtient le montant mais c’est maladroit.',
      'Mal amenée, fermée, mais M. Leroy donne son budget et sa limite.',
      'C’est une fermée très directe ; l’information est obtenue malgré tout.'
    ],
    fausses: [
      'Elle les vexe.',
      'Bonne question ouverte.',
      'Elle ne devait pas parler d’argent.',
      'Une question fermée.',
      'xxxx yyy'
    ]
  },
  'A · Le devis': {
    justes: [
      'Elle ne résume pas et ne fait pas classer les priorités.',
      'Aucune validation : elle repart sans savoir ce qui compte le plus pour eux.',
      'Elle conclut sans reformuler ni hiérarchiser leurs besoins.',
      'Pas de synthèse, pas de priorités : elle ne sait pas quoi proposer.',
      'Elle clôt sans récapituler, et ne leur demande pas ce qui passe en premier.',
      'Elle oublie de valider ce qu’elle a compris et de faire classer leurs critères.',
      'Elle aurait dû résumer et leur demander ce qui est le plus important.',
      'pas de resume ni de priorite',
      'Elle ne vérifie rien et ne connaît pas l’ordre des priorités.',
      'Fin sans reformulation : elle ignore ce qui compte le plus pour le couple.'
    ],
    fausses: [
      'Bonne conclusion.',
      'Elle a raison de proposer un devis.',
      'Très bien, rapide et efficace.',
      'Elle conclut sans reformuler.',
      'blabla'
    ]
  },
  'B · La formule premium': {
    justes: [
      'Question orientée : il pousse sa formule premium, M. Vidal se ferme.',
      'Il oriente la réponse vers son offre, et le client se replie sur le groupe.',
      'Une question qui suggère la réponse et vend son produit : M. Vidal recule.',
      'Il force la formule premium en jouant sur la peur, et M. Vidal n’est pas convaincu.',
      'C’est orienté, il impose sa solution premium, M. Vidal hésite.',
      'question orientee pour vendre la formule, le client se replie',
      'Il souffle la réponse et propose son offre : M. Vidal se bloque.',
      'Question tendancieuse qui pousse le premium ; le client esquive avec le groupe.',
      'Il manipule avec la peur du risque pour vendre sa formule, et M. Vidal se ferme.',
      'Orientée vers le produit premium ; résultat, M. Vidal botte en touche et renvoie au groupe.'
    ],
    fausses: [
      'Il lui laisse le choix.',
      'Bonne question pour hiérarchiser.',
      'Il a raison de proposer.',
      'Il veut vendre son produit.',
      'aaaa'
    ]
  },
  'B · La décision': {
    justes: [
      'Bonne question ouverte : il apprend qui décide, le siège et la gouvernante.',
      'Point fort, une ouverte sur le processus de décision.',
      'C’est utile : il découvre qui valide au-delà de 50 000 €.',
      'Question ouverte pertinente sur les décideurs : le siège du groupe et la gouvernante générale.',
      'Très bien : il identifie qui d’autre intervient dans la décision.',
      'bonne question ouverte sur qui decide',
      'Une question efficace : il apprend le seuil de 50 000 € et le rôle de la gouvernante.',
      'C’est réussi, il comprend le processus de décision du groupe.',
      'Une bonne question, ouverte, qui fait apparaître les décideurs.',
      'Point fort : il sait maintenant qui valide et à partir de quel montant.'
    ],
    fausses: [
      'Il se perd.',
      'Question gênante, il le vexe.',
      'Question ouverte.',
      'Il aurait dû proposer son offre.',
      'zzz'
    ]
  },
  'B · La conclusion': {
    justes: [
      'Pas de synthèse, aucune priorité validée.',
      'Il ne résume rien et propose premium sans savoir ce qui passe en premier.',
      'Il conclut sans reformuler ni faire classer les priorités.',
      'Aucune validation : il ne sait pas ce qui compte le plus pour M. Vidal.',
      'Il clôt sans récapituler, et envoie la proposition premium sans connaître l’ordre des priorités.',
      'pas de resume, pas de priorites',
      'Il ne vérifie rien et ignore ce qui est le plus important pour le client.',
      'Il oublie la synthèse et la hiérarchie des besoins.',
      'Fin sans reformulation ; il propose son offre premium sans savoir ce qui compte en premier.',
      'Il aurait dû résumer et demander ce qui passe en premier.'
    ],
    fausses: [
      'Très bien, il fixe un rendez-vous.',
      'Bonne relance.',
      'Il conclut vite.',
      'Il propose premium.',
      'rien'
    ]
  }
};

/* LES QUESTIONS RÉÉCRITES (la question que l'apprenant aurait posée). */
const RW = {
  'A · L’îlot central': {
    justes: [
      'Qu’est-ce qui vous aiderait, quand vous cuisinez à plusieurs ?',
      'Comment ça se passe, quand vous cuisinez à cinq ?',
      'Qu’est-ce qui vous gêne le plus quand vous êtes plusieurs dans la cuisine ?',
      'Racontez-moi un samedi midi avec les petits-enfants dans votre cuisine.',
      'Quand vous êtes tous ensemble, qu’est-ce qui coince ?',
      'Qu’est-ce qui vous manque aujourd’hui pour cuisiner en famille ?',
      'Comment imaginez-vous la cuisine idéale pour vos week-ends ?',
      'Qu’est-ce qui serait le plus pratique pour vous quand toute la famille est là ?',
      'Pourquoi avez-vous l’impression de vous marcher dessus ?',
      'quest ce qui vous gene quand vous etes plusieurs',
      'Qu’attendez-vous de la cuisine quand les petits-enfants sont là ?',
      'Dites-moi ce qui vous manque comme place quand vous cuisinez ensemble.'
    ],
    fausses: [
      'Vous voulez donc un îlot central ?',
      'Vous préférez un îlot ou une péninsule ?',
      'Un îlot vous aiderait, non ?',
      'Combien de petits-enfants avez-vous ?',
      'Vous cuisinez souvent ?',
      'fhfhfhfh'
    ]
  },
  'A · Bois ou laqué': {
    justes: [
      'Qu’attendez-vous de votre future cuisine, au quotidien ?',
      'Comment utiliserez-vous votre nouvelle cuisine, au quotidien ?',
      'Qu’est-ce qui compte le plus pour vous dans cette nouvelle cuisine ?',
      'Qu’est-ce que votre future cuisine doit vous permettre de faire ?',
      'Quels sont vos besoins pour la cuisine de tous les jours ?',
      'Comment imaginez-vous votre cuisine idéale ?',
      'Qu’est-ce qui serait important pour vous, chaque jour, dans cette cuisine ?',
      'Racontez-moi comment vous aimeriez vivre dans votre nouvelle cuisine.',
      'Qu’est-ce qui vous ferait plaisir dans votre future cuisine ?',
      'quest ce qui est important pour vous au quotidien',
      'Qu’est-ce que cette nouvelle cuisine doit changer pour vous ?'
    ],
    fausses: [
      'Vous préférez du bois ou du laqué ?',
      'Quelle couleur aimeriez-vous ?',
      'Quel style de façade vous plaît ?',
      'Vous voulez du bois ?',
      'Le laqué, ça vous va ?',
      'kkkk'
    ]
  },
  'A · Le devis': {
    justes: [
      'Si je résume : un plan de travail pour cuisiner à plusieurs, un four en hauteur, des délais tenus et un prix ferme. Qu’est-ce qui passe en premier pour vous ?',
      'Si j’ai bien compris : de la place, pas besoin de se baisser, pas de retard, pas de surprise. Dans quel ordre ?',
      'Si je reprends : plus de place, le four en hauteur pour votre dos, des délais tenus et 15 000 € maximum. Qu’est-ce qui compte le plus ?',
      'Vous m’avez parlé de place, de votre dos, des délais et du prix ferme : lequel est le plus important ?',
      'Pour résumer, il vous faut de la place, un four en hauteur, des travaux rapides et un prix ferme ; qu’est-ce qui passe avant tout ?',
      'Si je récapitule : place, dos, délais, budget. Que faut-il régler d’abord ?',
      'si je resume la place le four les delais le prix, quest ce qui est prioritaire',
      'Donc un plan de travail plus grand, un four en hauteur, des délais et un prix ferme : pouvez-vous classer ces critères ?',
      'Je reformule : le four, la place, les délais, le budget. Quel est l’essentiel pour vous ?',
      'Vous avez besoin de place, d’un four en hauteur et d’un prix ferme : qu’est-ce qui compte le plus ?'
    ],
    fausses: [
      'Très bien, je vous prépare un devis.',
      'Je vous envoie le devis demain ?',
      'Qu’est-ce qui compte le plus pour vous ?',
      'Si je résume, vous voulez un îlot ?',
      'jjjj'
    ]
  },
  'B · Les questions techniques': {
    justes: [
      'Et pour vos équipes, qu’est-ce qui devrait changer en priorité ?',
      'Qu’est-ce qui aiderait le plus vos équipes, aujourd’hui ?',
      'Elles sont épuisées, dites-vous : qu’est-ce que ça change pour l’hôtel ?',
      'Que se passerait-il si vous perdiez une de vos réceptionnistes ?',
      'Comment vos équipes vivent-elles cette situation ?',
      'Qu’est-ce qui soulagerait vos réceptionnistes ?',
      'Qu’est-ce que ces arrêts maladie vous coûtent ?',
      'Comment votre personnel tient-il le coup ?',
      'quest ce qui aiderait vos equipes',
      'Qu’est-ce qui vous inquiète le plus pour vos équipes ?',
      'Racontez-moi comment vos agents vivent les absences.'
    ],
    fausses: [
      'Combien de chambres avez-vous ?',
      'Quelle surface font vos parties communes ?',
      'Vos équipes sont fatiguées ?',
      'Quels revêtements de sol avez-vous ?',
      'Notre remplacement garanti vous aiderait, non ?',
      'pppp'
    ]
  },
  'B · Le remplacement garanti': {
    justes: [
      'Que faudrait-il pour que ce problème ne se reproduise plus ?',
      'Qu’est-ce qui serait le plus important pour vous dans une nouvelle organisation ?',
      'Qu’est-ce qui vous inquiète le plus, dans les semaines qui viennent ?',
      'Comment verriez-vous les choses idéalement ?',
      'Qu’attendez-vous d’un prestataire de ménage ?',
      'Qu’est-ce qui compte le plus pour vous aujourd’hui ?',
      'Quelles seraient les conséquences si rien ne changeait ?',
      'Qu’est-ce qui vous rassurerait ?',
      'quest ce qui est important pour vous',
      'Qu’est-ce qui doit changer avant l’audit de mars ?',
      'Quel est l’enjeu principal pour vous ?'
    ],
    fausses: [
      'Notre remplacement garanti sous deux heures règle ce problème.',
      'Vous voulez notre offre ?',
      'Ça vous intéresse, un remplacement garanti ?',
      'Vous avez un contrat actuellement ?',
      'mmmm'
    ]
  },
  'B · La formule premium': {
    justes: [
      'Entre la continuité du service, vos équipes et l’audit de mars, qu’est-ce qui passe en premier pour vous ?',
      'Entre l’audit de mars et vos équipes, qu’est-ce qui passe en premier ?',
      'Si vous ne deviez régler qu’une chose avant mars, ce serait laquelle : vos équipes ou l’audit ?',
      'Qu’est-ce qui est prioritaire pour vous : la continuité du ménage, vos réceptionnistes ou l’audit ?',
      'Pouvez-vous classer ces enjeux : l’audit, vos équipes, la continuité ?',
      'Parmi l’audit de mars, vos équipes et les absences, qu’est-ce qui compte le plus ?',
      'quest ce qui est le plus important laudit ou vos equipes',
      'Qu’est-ce qui passe avant tout : garder votre étoile ou soulager vos équipes ?',
      'Entre vos clients, vos équipes et le classement, quelle est votre priorité ?',
      'Si vous deviez choisir entre la continuité et l’audit, que choisiriez-vous d’abord ?'
    ],
    fausses: [
      'Vous préférerez notre formule premium ?',
      'Premium ou standard ?',
      'Qu’est-ce qui passe en premier pour vous ?',
      'Vous ne voulez pas prendre de risque ?',
      'tttt'
    ]
  }
};

console.log('\nLe coach (6.2) · diagnostics écrits');
const moment = label => {
  const [dos, name] = label.split(' · ');
  return C.dossiers[dos].moments.find(m => m.label === name);
};
for (const [label, bank] of Object.entries(DIAG)) {
  const m = moment(label);
  test(`${label} : ${bank.justes.length} diagnostics justes reçoivent « Bien vu ! »`, () => {
    const bad = bank.justes.filter(t => J.judgeIdeas(m.write.ideas, t).tone !== 'ok');
    assert.strictEqual(bad.join(' | '), '');
  });
  test(`${label} : ${bank.fausses.length} diagnostics faux ne le reçoivent pas`, () => {
    const bad = bank.fausses.filter(t => J.judgeIdeas(m.write.ideas, t).tone === 'ok');
    assert.strictEqual(bad.join(' | '), '');
  });
}

console.log('\nLe coach (6.2) · questions réécrites');
const rewrite = label => {
  const [dos, name] = label.split(' · ');
  const d = C.dossiers[dos];
  return d.rewrites.find(r => d.moments.find(m => m.n === r.n).label === name);
};
for (const [label, bank] of Object.entries(RW)) {
  const r = rewrite(label);
  test(`${label} : ${bank.justes.length} questions justes reçoivent « Bien vu ! »`, () => {
    const bad = bank.justes.filter(t => J.judgeRewrite(r, t, C.productWords).tone !== 'ok');
    assert.strictEqual(bad.join(' | '), '');
  });
  test(`${label} : ${bank.fausses.length} questions fausses ne le reçoivent pas`, () => {
    const bad = bank.fausses.filter(t => J.judgeRewrite(r, t, C.productWords).tone === 'ok');
    assert.strictEqual(bad.join(' | '), '');
  });
}

console.log(`\n${passed} tests réussis, ${failed} en échec.`);
if (failed) process.exitCode = 1;
