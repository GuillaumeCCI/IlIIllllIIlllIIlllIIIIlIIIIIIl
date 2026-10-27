/* Réponses justes, écrites de plusieurs façons, pour les exercices à une
 * seule grille. Chaque entrée : les valeurs des champs, telles qu'un
 * apprenant les remplirait. L'indicateur doit leur donner au moins 8 / 10
 * (test indicateur.test.cjs). */
module.exports = {
  // S1 A · L'accroche de Camille (Novéa) : ce qui va, ce qui manque, la réécriture.
  's1-A': [
    { strengths: 'Elle salue le client et se présente : on sait qui elle est et pour quelle entreprise elle travaille.',
      improvements: 'Elle ne remercie pas et ne met pas le client à l’aise. Elle n’annonce ni la durée ni le déroulé. Elle parle tout de suite de ses offres au lieu d’écouter, et « ce qui pourrait vous convenir » reste flou.',
      rewrite: 'Bonjour, merci de me recevoir. Je suis Camille Martin, conseillère chez Novéa. Je vous propose vingt minutes : d’abord vous me parlez de votre activité, ensuite je vous présente ce qui peut vous aider. Qu’est-ce qui compte le plus pour vous aujourd’hui ?' },
    { strengths: 'La présentation est claire : son nom, sa fonction et le nom de l’entreprise. Le ton reste poli.',
      improvements: 'Il manque un remerciement et un climat chaleureux. Aucun cadrage du temps. Elle pousse ses produits trop tôt et ne laisse pas la parole au client.',
      rewrite: 'Bonjour et merci de m’accorder ce moment. Je m’appelle Camille Martin, je suis conseillère chez Novéa. Nous avons une demi-heure : je vais d’abord vous écouter, puis nous verrons ensemble les solutions adaptées. Pouvez-vous me parler de votre entreprise ?' },
    { strengths: 'Elle commence par bonjour et dit qui elle est, ce qui rassure le client.',
      improvements: 'Pas de mise à l’aise, pas d’objectif ni de durée annoncés. L’ouverture est centrée sur ses offres, sans question pour découvrir le besoin. La fin est vague.',
      rewrite: 'Bonjour, ravie de vous rencontrer. Camille Martin, conseillère chez Novéa. Pour commencer, j’aimerais comprendre votre situation, ensuite je vous montrerai les garanties utiles, en vingt minutes environ. Qu’est-ce qui vous amène à vous intéresser à votre couverture ?' }
  ],
  // S1 B · Boutique, client pressé.
  's1-B': [
    { opening: 'Bonjour ! Je vous laisse regarder tranquillement. Je suis Léo, vendeur ici : si vous avez besoin, je suis juste à côté.', adjustment: 'J’ai fait court et je l’ai laissé libre, parce qu’il est pressé et ne veut pas être retenu.' },
    { opening: 'Bonjour, bienvenue ! Prenez votre temps. Je m’appelle Sarah, n’hésitez pas si vous cherchez quelque chose de précis.', adjustment: 'Une ouverture brève et discrète, car le client n’a pas de temps : je respecte son rythme.' },
    { opening: 'Bonjour ! Pas de souci, je ne vous retiens pas. Je suis le conseiller du magasin : au moindre besoin, faites-moi signe.', adjustment: 'Je me suis adapté à son peu de temps en restant disponible sans insister.' }
  ],
  // S1 C · Comparer deux ouvertures (trois arguments, puis l'emprunt).
  's1-C': [
    { argument1: 'L’ouverture 1 annonce une durée de trente minutes et un déroulé, alors que l’ouverture 2 ne cadre rien : le client sait à quoi s’attendre.',
      argument2: 'Dans l’ouverture 1, le commercial écoute d’abord le client avant de présenter son offre, tandis que l’ouverture 2 présente tout de suite.',
      argument3: 'L’ouverture 1 demande l’accord du client avec « Ça vous va ? », ce qui l’implique dans l’échange.',
      borrow: 'Je reprendrais la référence aux entreprises déjà accompagnées, parce que c’est une preuve qui rassure. Je l’ajouterais en une phrase, juste après ma présentation.' },
    { argument1: 'La première ouverture est mieux structurée : elle fixe le temps et les étapes de l’entretien, contrairement à la seconde.',
      argument2: 'Elle est centrée sur le client, qui parle en premier, alors que la deuxième parle surtout du vendeur et de ses résultats.',
      argument3: 'Elle cherche l’accord du client, ce qui crée un climat de confiance que la deuxième ne crée pas.',
      borrow: 'J’emprunterais l’exemple des clients satisfaits, car cela crédibilise l’offre. Je le glisserais brièvement après le cadrage.' }
  ],
  // S1 D · Une ouverture, phrase par phrase.
  's1-D': [
    { line1: 'Bonjour, merci de me recevoir.', line2: 'Je suis Paul Durand, conseiller chez Novéa.', line3: 'Je vous propose une vingtaine de minutes : d’abord je vous écoute, ensuite je vous présente des pistes.', line4: 'Pour commencer, qu’est-ce qui vous amène aujourd’hui ?' },
    { line1: 'Bonjour, ravi de vous rencontrer.', line2: 'Je m’appelle Julie Martin, je suis chargée de clientèle chez Atelier Teinte.', line3: 'Nous avons une demi-heure ensemble, et j’aimerais d’abord comprendre votre projet.', line4: 'Pouvez-vous me parler de ce que vous imaginez ?' },
    { line1: 'Bonjour et merci pour votre accueil.', line2: 'Je me présente : Marc Leroy, commercial chez Ergolys.', line3: 'Je vous propose de faire le point sur vos besoins, puis de voir ensemble ce qui peut vous aider, en trente minutes.', line4: 'Comment se passe le travail de vos équipes aujourd’hui ?' }
  ],
  // S1 E1 · Visio, le prospect coupe sa caméra.
  's1-E1': [
    { response: 'Aucun souci, on continue à l’oral. Pour être clair, je vous propose quinze minutes : d’abord je vous écoute, puis je réagis. Dites-moi ce qui est prioritaire pour vous.' },
    { response: 'Pas de problème, je vous entends très bien. Comme on ne se voit pas, n’hésitez pas à m’interrompre si je vais trop vite. Qu’est-ce qui compte le plus pour vous sur ce sujet ?' },
    { response: 'Très bien, continuons sans image. Je vais d’abord vous laisser m’expliquer votre situation, ensuite je vous proposerai des pistes. Arrêtez-moi quand vous voulez.' }
  ],
  // S1 E2 · 40 secondes pour obtenir un rendez-vous (Ergolys).
  's1-E2': [
    { proposal: 'Bonjour, Marc Leroy, commercial chez Ergolys. Nous aidons les PME à réduire les arrêts liés au mal de dos grâce à des sièges ergonomiques. Je vous propose dix minutes pour voir si c’est utile pour vos salariés. On en parle ?' },
    { proposal: 'Bonjour, je suis Julie de chez Ergolys. Nos sièges de bureau améliorent le confort de vos équipes et diminuent les absences. Accepteriez-vous un rendez-vous de dix minutes cette semaine ?' },
    { proposal: 'Bonjour, Ergolys, sièges ergonomiques. En deux mots : moins de douleurs de dos pour vos collaborateurs, donc moins d’arrêts. Je vous propose un court rendez-vous pour en parler. Ça vous va ?' }
  ],
  // S1 E3 · Agence de décoration : entrer en matière sans question.
  's1-E3': [
    { opening: 'Bonjour, merci d’être venue. Je suis Léa, conseillère chez Atelier Teinte. Je vous propose de commencer par votre salon : racontez-moi ce que vous imaginez.' },
    { opening: 'Bonjour et bienvenue. Je m’appelle Paul, décorateur à l’agence. Prenons le temps ensemble : je vous laisse me décrire votre projet, je suis là pour vous écouter.' },
    { opening: 'Bonjour, ravie de vous recevoir. Installez-vous, je vous propose qu’on parte de vos envies pour votre salon. Je vous écoute.' }
  ],
  // S2 A · Justifier son choix de réponse, client par client.
  's2-A': [
    { why0: 'La réponse c respecte son peu de temps et le laisse libre, alors que les autres le jugent ou le poussent.',
      why1: 'La réponse b nomme son doute sans le juger, ce qui installe la confiance ; la a minimise et la c juge.',
      why2: 'La réponse a reconnaît sa peur et le rassure sans minimiser, parce que les autres jugent ou donnent une solution trop tôt.' },
    { why0: 'Elle respecte son rythme et ne l’impose pas, contrairement aux autres qui l’interrogent ou lui proposent une offre.',
      why1: 'Elle montre qu’on comprend sa mauvaise expérience, sans se défendre ni critiquer les concurrents.',
      why2: 'Elle accompagne le client novice avec bienveillance, car elle accepte qu’il se sente perdu au lieu de le juger.' }
  ],
  // S2 B · Réécrire 4 fausses reformulations sur « un peu chère ».
  's2-B': [
    { rewrite0: 'Si je vous suis bien, le prix compte beaucoup pour vous.', rewrite1: 'Le tarif vous paraît élevé, c’est bien ça ?', rewrite2: 'Vous vous demandez si la valeur justifie le prix, si je comprends bien.', rewrite3: 'J’entends que le coût vous fait hésiter.' },
    { rewrite0: 'Autrement dit, le montant est un point important pour vous.', rewrite1: 'Vous trouvez notre solution chère, c’est cela ?', rewrite2: 'Pour vous, la question du prix passe avant tout, si je vous comprends bien.', rewrite3: 'Ce que j’entends, c’est que le prix vous fait douter.' }
  ],
  // S2 F · Trois profils : une réponse d'écoute, puis la posture.
  's2-F': [
    { reply0: 'J’entends que vous avez des doutes, c’est légitime. Qu’est-ce qui vous rendrait plus confiant ?', posture0: 'Je reste calme, je ne me défends pas : je nomme son doute pour en faire une information.',
      reply1: 'Si je résume, vous avez eu plusieurs prestataires décevants. Pour être utile, par quoi voulez-vous qu’on commence ?', posture1: 'Je fais une synthèse pour recentrer l’échange, avec respect, sans lui couper la parole.',
      reply2: 'Vous restez prudent, c’est normal. Qu’est-ce qui compte le plus pour vous ?', posture2: 'Une question ouverte et douce, pour l’inviter à parler sans le presser.' },
    { reply0: 'Vous êtes sceptique, je le comprends. Qu’est-ce qui vous a déçu jusqu’ici ?', posture0: 'Je garde un ton posé et j’accueille sa méfiance au lieu de me justifier.',
      reply1: 'En résumé, il y a beaucoup à gérer de votre côté. Quelle est votre priorité aujourd’hui ?', posture1: 'Je résume et je cadre doucement pour l’aider à se concentrer sur l’essentiel.',
      reply2: 'Je vous sens réservé, prenez votre temps. Comment voyez-vous les choses ?', posture2: 'Je laisse du silence et je l’encourage par une question légère, patiemment.' }
  ],
  // S3 1.5 · Pourquoi la réponse B est la plus juste.
  's3-1.5': [
    { why: 'La réponse B accueille l’objection, pose une question pour comprendre, reformule, apporte une preuve avec l’essai de 30 jours et vérifie que le client est convaincu. La réponse A contredit le client et accorde une remise trop vite, ce qui dévalorise l’offre.' },
    { why: 'B suit la méthode : elle creuse avec « par rapport à quoi ? », reformule, prouve la valeur et contrôle l’adhésion. A brade le prix avec 10 % de réduction sans rien comprendre, ce qui affaiblit la valeur.' }
  ],
  // S3 1.7 · Cartes réflexes : creuser, puis répondre avec une preuve.
  's3-1.7': [
    { dig0: 'Qu’est-ce qui compterait le plus pour votre direction ?', reply0: 'Je vous prépare un argumentaire chiffré, et je peux venir le présenter à votre direction.',
      dig1: 'Par rapport à quoi le trouvez-vous cher ?', reply1: 'Nos sièges sont garantis 5 ans, et vous pouvez les essayer 30 jours ; la location permet aussi d’étaler le budget.',
      dig2: 'Que s’est-il passé avec ce fournisseur ?', reply2: 'Nous avons un SAV sous 48 heures et une garantie de 5 ans, et plus de 1 200 entreprises sont équipées.',
      dig3: 'Avez-vous des salariés qui souffrent du dos ?', reply3: 'Nos clients constatent une baisse des arrêts, et nous proposons un diagnostic gratuit pour vérifier.' },
    { dig0: 'Qui décide, et sur quels critères ?', reply0: 'Je vous laisse un dossier avec les chiffres, et je propose une courte présentation à votre direction.',
      dig1: 'Comparé à quelle offre ?', reply1: 'C’est un investissement : la garantie de 5 ans et l’essai de 30 jours limitent votre risque.',
      dig2: 'Qu’est-ce qui n’a pas fonctionné ?', reply2: 'Essai satisfait ou remboursé, SAV en 48 h et un interlocuteur dédié pour le suivi.',
      dig3: 'Comment vos collaborateurs se sentent-ils en fin de journée ?', reply3: 'La prévention des douleurs de dos réduit les absences, et le diagnostic est gratuit.' }
  ],
  // S4 1.2 · Réécrire une ouverture maladroite.
  's4-1.2': [
    { rewrite: 'Bonjour, merci de me recevoir. Je suis Paul Durand, conseiller chez Novéa. Je vous propose de faire le point sur votre besoin en trente minutes, puis de voir les solutions adaptées. Qu’est-ce qui vous amène ?' },
    { rewrite: 'Bonjour et bienvenue. Je m’appelle Julie, je suis chargée de clientèle. Nous avons une demi-heure : d’abord je vous écoute, ensuite je vous propose des pistes. Pouvez-vous me parler de votre projet ?' }
  ],
  // S4 2.2 · Trois réponses réflexes remplacées par une reformulation.
  's4-2.2': [
    { repair0: 'Si je comprends bien, le prix est un critère important pour vous.', repair1: 'Vous êtes très occupé en ce moment, et ce projet passe après, c’est bien ça ?', repair2: 'Cette mauvaise expérience vous rend méfiant, je le comprends.' },
    { repair0: 'Vous comparez nos tarifs, et le coût compte beaucoup pour vous.', repair1: 'Si je vous suis, votre agenda est déjà plein.', repair2: 'Vous avez déjà essayé sans résultat, donc vous restez prudent.' }
  ]
};
