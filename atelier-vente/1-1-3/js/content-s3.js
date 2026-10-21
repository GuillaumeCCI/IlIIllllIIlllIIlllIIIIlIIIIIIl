/* SÉRIE 3 · MANIPULATION · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Les réactions b à f de « À chaque
 * objection, sa nature », les cas 2 et 3 de « Passez en mode traitement » et
 * les corrigés viennent de la fiche « Activités 1 et 2, Manipulation »
 * (M1.1.3), transposée au vouvoiement.
 */
window.ATELIER_S3 = {
  /* ── 1.1 · Dans le bon ordre ────────────────────────────────────────── */
  '1.1': {
    eyebrow: 'Exercice 1.1',
    title: 'Dans le bon ordre',
    subtitle: 'Six cartes. Un parcours à reconstruire.',
    pathTitle: 'Le parcours de la réponse',
    // `step` renvoie à l'étape de ATELIER_METHOD : 0 = Accueillir… 5 = Enchaîner.
    cards: [
      { id: 'a', text: '« Est-ce que cela répond à votre préoccupation ? »', step: 4 },
      { id: 'b', text: 'On reprend le fil de la vente : « Je vous propose de revenir à… »', step: 5 },
      { id: 'c', text: '« Je comprends votre remarque. » (sans se braquer)', step: 0 },
      { id: 'd', text: 'On apporte la réponse adaptée : preuve, bénéfice, élément concret.', step: 3 },
      { id: 'e', text: '« Qu’entendez-vous exactement par… ? »', step: 1 },
      { id: 'f', text: '« Si je comprends bien, votre point porte sur… »', step: 2 }
    ]
  },

  /* ── 1.2 · Le crash-test de l'objection prix ────────────────────────── */
  '1.2': {
    eyebrow: 'Coach commercial',
    title: 'Le crash-test de l’objection prix',
    subtitle: 'Repérez 4 maladresses, puis réécrivez la réponse.',
    client: 'C’est trop cher.',
    // La réplique du commercial, découpée en passages que l'on peut marquer.
    passages: [
      { text: 'Non mais attendez, ce n’est pas cher du tout !', error: 'Il contredit frontalement le client : confrontation d’emblée, aucun accusé de réception.' },
      { text: 'Tous mes clients me disent ça au début.', error: 'Il minimise et généralise : le ressenti est invalidé, le client ne se sent pas écouté.' },
      { text: 'De toute façon, si vous ne prenez pas maintenant, le prix va augmenter.', error: 'Pression, menace : il force la main au lieu de rassurer.' },
      { text: 'Bon, je vous fais 5 % et on n’en parle plus, d’accord ?', error: 'Concession immédiate : il brade au lieu de valoriser, et bascule dans la négociation, hors du traitement de l’objection.' }
    ],
    // Les maladresses du corrigé qui ne tiennent pas à un passage : ce que la
    // réponse oublie de faire.
    missing: [
      { title: 'Il ne creuse pas l’objection', text: 'On ignore ce que « trop cher » signifie : par rapport à quoi (budget, valeur perçue, concurrent) ?' },
      { title: 'Aucune reformulation', text: 'Rien ne montre au client qu’il a été compris.' }
    ],
        hint: 'Comparez la réponse aux étapes de la méthode : le commercial accueille-t-il ? Questionne-t-il ? Apporte-t-il une preuve ? Vérifie-t-il que le doute est levé ?',
    rewriteHelp: 'Accueillez, questionnez, reformulez, traitez, contrôlez.',
    model: 'Je comprends, le budget est un point important. Quand vous dites que c’est trop cher, c’est par rapport à quoi exactement : une enveloppe prévue, une autre offre ? Si je comprends bien, vous voulez être sûr d’en avoir pour votre investissement. Concrètement, voici ce que cette solution vous fait gagner, et ce que cela représente sur l’année. Est-ce que cela répond à votre interrogation ? Dans ce cas, je vous propose de voir ensemble la mise en place.'
  },

  /* ── 2.1 · À chaque objection, sa nature ────────────────────────────── */
  '2.1': {
    eyebrow: 'Traitement des objections',
    title: 'À chaque objection, sa nature',
    subtitle: 'Classez 6 réactions selon leur nature la plus probable.',
    instruction: 'Choisissez la case où ranger cette réaction.',
    reactions: [
      { text: 'Franchement, je n’ai pas le temps, rappelez plus tard.', answer: 'pretexte', why: 'Prétexte, dérobade : on creuse et on propose un autre créneau.' },
      { text: 'Votre offre ne comprend pas l’installation, or j’en ai absolument besoin.', answer: 'fondee', why: 'Sincère et fondée : on argumente, on propose une solution ou une compensation.' },
      { text: 'Je pensais que votre garantie n’était que d’un an.', answer: 'malentendu', why: 'Malentendu : la garantie est de 5 ans. On informe, preuve à l’appui.' },
      { text: 'Comment être sûr que ça tiendra dans le temps ?', answer: 'reassurance', why: 'Demande de réassurance : on rassure avec des garanties, des références, des preuves.' },
      { text: 'On m’a dit que votre SAV ne répondait jamais.', answer: 'malentendu', why: 'Malentendu, rumeur non vérifiée : on rectifie avec tact, chiffres ou témoignages à l’appui.' },
      { text: 'Bon, envoyez-moi une doc, je verrai ça.', answer: 'pretexte', why: 'Prétexte, dérobade : on creuse l’intérêt réel avant d’envoyer, pour garder la main.' }
    ]
  },

  /* ── 2.2 · Passez en mode traitement ────────────────────────────────── */
  '2.2': {
    eyebrow: 'Prospection téléphonique',
    title: 'Passez en mode traitement',
    subtitle: 'Transformez trois mauvais réflexes en réponses qui ouvrent l’échange.',
    help: 'Écoutez, clarifiez, puis proposez une suite concrète.',
    // L'auto-évaluation, une fois les 3 cas faits.
    selfChecks: [
      { title: 'Accueil', text: 'Mes réponses accusent réception de la réplique, sans contredire le client.' },
      { title: 'Question', text: 'Elles posent une question pour comprendre sa situation.' },
      { title: 'Suite', text: 'Elles proposent une suite concrète : un autre moment, un envoi ciblé, un échange.' }
    ],
    // La réponse attendue accuse réception sans se braquer, cherche à comprendre
    // (question ou reformulation) et garde la relation ouverte.
    cases: [
      { tab: 'Pas le temps', client: 'Je n’ai pas le temps là.', reflex: 'Ça ne prendra que deux minutes, promis.',
        blocks: 'Le commercial nie la contrainte du client et insiste : il se sent forcé, la conversation devient un rapport de force.',
        tip: 'Respectez son temps, puis proposez un autre moment précis.',
        model: 'Je comprends, je ne veux pas vous déranger. Quel moment vous conviendrait mieux dans la journée ?' },
      { tab: 'Documentation', client: 'Envoyez-moi plutôt une documentation.', reflex: 'Je vous envoie ça, au revoir.',
        blocks: 'Il accepte la dérobade sans rien apprendre du besoin : la documentation sera générique et la relance tombera à froid.',
        tip: 'Acceptez, puis qualifiez le besoin pour que l’envoi soit utile.',
        model: 'Avec plaisir. Pour vous adresser exactement ce qui vous sera utile, puis-je vous poser une ou deux questions rapides ?' },
      { tab: 'Prestataire en place', client: 'On travaille déjà avec un autre prestataire.', reflex: 'Nous, on est bien mieux.',
        blocks: 'Il dénigre le concurrent : le client se retrouve à défendre son choix, et la discussion tourne à la comparaison au lieu de l’écoute.',
        tip: 'Intéressez-vous à ce qui marche, puis à ce qui pourrait être amélioré.',
        model: 'Vous avez déjà un partenaire, c’est noté. Qu’est-ce qui compte le plus pour vous dans cette collaboration aujourd’hui ?' }
    ]
  }
};
