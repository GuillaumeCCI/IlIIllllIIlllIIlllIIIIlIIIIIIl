/* SÉRIE 1 · GÉRER LES OBJECTIONS · contenus éditables.
 *
 * Les textes visibles sur les maquettes sont repris tels quels. Ce qu'elles
 * ne montrent pas (situations 2 à 8 du défi express, cas 2 à 4 de « Écoutez
 * le client », rôles 2 à 6) et les corrigés viennent de la fiche « Activités
 * supplémentaires SCORM 1 » (M1.1.3, exercices 1.1 à 1.7), transposée au
 * vouvoiement. Le fil rouge est Ergolys, fournisseur de mobilier et
 * d'équipements de bureau ergonomiques.
 */

/* Les six étapes du traitement d'une objection, communes à plusieurs écrans. */
window.ATELIER_METHOD = [
  { id: 'accueillir', name: 'Accueillir', role: 'Recevoir l’objection sans se braquer, garder le lien.' },
  { id: 'questionner', name: 'Questionner', role: 'Comprendre ce qui gêne vraiment et isoler l’objection.' },
  { id: 'reformuler', name: 'Reformuler', role: 'Montrer qu’on a compris et valider la vraie objection.' },
  { id: 'traiter', name: 'Traiter', role: 'Apporter la réponse adaptée, avec une preuve si utile.' },
  { id: 'controler', name: 'Contrôler', role: 'Vérifier que l’objection est levée.' },
  { id: 'enchainer', name: 'Enchaîner', role: 'Revenir au fil de la vente.' }
];

/* Les quatre natures d'objection, communes à 1.3, 1.7 et à la manipulation 2.1. */
window.ATELIER_NATURES = [
  { id: 'pretexte', label: 'Prétexte / Dérobade', text: 'Évite la discussion, repousse ou se ferme sans réel motif.', gesture: 'Creuser' },
  { id: 'fondee', label: 'Objection sincère et fondée', text: 'Repose sur un besoin réel, une contrainte ou un point bloquant légitime.', gesture: 'Argumenter / compenser' },
  { id: 'malentendu', label: 'Malentendu / Non fondée', text: 'Basée sur une information inexacte ou une mauvaise compréhension.', gesture: 'Informer' },
  { id: 'reassurance', label: 'Demande de réassurance', text: 'Exprime un doute, une crainte et cherche des garanties.', gesture: 'Rassurer' }
];

window.ATELIER_S1 = {
  /* ── 1.1 · Bon réflexe ou à éviter ? ────────────────────────────────── */
  '1.1': {
    eyebrow: 'Gestion des objections · Défi express',
    title: 'Bon réflexe ou à éviter ?',
    subtitle: 'Classez les attitudes du commercial, une par une.',
    instruction: 'Choisissez une réponse : la situation suivante apparaîtra automatiquement.',
    question: 'Quelle attitude adopter face à cette situation ?',
    zones: [
      { id: 'bad', label: 'À éviter', sub: 'Mauvais réflexe', tone: 'bad', symbol: 'close' },
      { id: 'good', label: 'Bon réflexe', sub: 'Attitude constructive', tone: 'good', symbol: 'check' }
    ],
    cards: [
      { text: 'Écouter l’objection jusqu’au bout sans interrompre le client.', answer: 'good', why: 'On écoute et on comprend avant de répondre.' },
      { text: 'Répondre immédiatement pour « casser » l’objection.', answer: 'bad', why: 'Répondre trop tôt braque le client : on n’a pas encore compris ce qui le gêne.' },
      { text: 'Reformuler l’objection avant d’y répondre.', answer: 'good', why: 'La reformulation montre qu’on a compris et vise la vraie objection.' },
      { text: 'Prendre l’objection comme une attaque personnelle.', answer: 'bad', why: 'L’objection porte sur l’offre, pas sur vous : on l’accueille sans se braquer.' },
      { text: 'Poser une question pour comprendre ce qui gêne vraiment.', answer: 'good', why: 'Questionner fait émerger la cause réelle : on traite alors le bon problème.' },
      { text: 'Baisser tout de suite le prix pour clore la discussion.', answer: 'bad', why: 'On ne brade pas : céder d’emblée dévalorise l’offre et laisse la vraie cause intacte.' },
      { text: 'Vérifier que la réponse a convaincu avant d’avancer.', answer: 'good', why: 'On vérifie avant d’avancer : le doute ne ressurgira pas plus tard.' },
      { text: 'Enchaîner sur la vente sans vérifier l’adhésion.', answer: 'bad', why: 'Sans contrôle, on avance sur un doute qui reviendra au moment de décider.' }
    ]
  },

  /* ── 1.2 · À chaque étape, son rôle ─────────────────────────────────── */
  '1.2': {
    eyebrow: 'Exercice 1.2',
    title: 'À chaque étape, son rôle',
    subtitle: 'Identifiez l’étape qui correspond à chaque rôle.',
    instruction: 'Sélectionnez un verbe : le rôle suivant apparaîtra automatiquement.',
    lead: 'Dans l’échange, cette étape sert à…',
    question: 'À quelle étape de la méthode ce rôle correspond-il ?',
    // L'ordre des rôles est mélangé ; `answer` renvoie à l'étape de ATELIER_METHOD.
    roles: [
      { answer: 'reformuler', text: 'Montrer qu’on a compris et valider la vraie objection.' },
      { answer: 'traiter', text: 'Apporter la réponse adaptée, avec une preuve si utile.' },
      { answer: 'accueillir', text: 'Recevoir l’objection sans se braquer, garder le lien.' },
      { answer: 'enchainer', text: 'Revenir au fil de la vente.' },
      { answer: 'questionner', text: 'Comprendre ce qui gêne vraiment et isoler l’objection.' },
      { answer: 'controler', text: 'Vérifier que l’objection est levée.' }
    ]
  },

  /* ── 1.3 · Écoutez le client ────────────────────────────────────────── */
  '1.3': {
    eyebrow: 'Exercice 1.3',
    gestures: [
      { id: 'argumenter', label: 'Argumenter / compenser', sub: 'Répondre au fond', symbol: 'chat' },
      { id: 'informer', label: 'Informer', sub: 'Corriger', symbol: 'info' },
      { id: 'creuser', label: 'Creuser', sub: 'Explorer', symbol: 'search' },
      { id: 'rassurer', label: 'Rassurer', sub: 'Sécuriser', symbol: 'shield' }
    ],
    // À chaque nature son premier geste : c'est le rappel de l'en-tête.
    pairs: { fondee: 'argumenter', malentendu: 'informer', pretexte: 'creuser', reassurance: 'rassurer' },
    cases: [
      { quote: 'Vos sièges sont plus chers que mon fournisseur actuel.', topic: 'objection sur le prix', nature: 'fondee', gesture: 'argumenter',
        why: 'Sincère et fondée : c’est une réserve sur le prix. On creuse d’abord (« par rapport à quoi ? »), puis on argumente la valeur : garantie 5 ans, essai 30 jours, baisse des arrêts.' },
      { quote: 'Je crois que vous ne livrez pas en région.', topic: 'objection sur la livraison', nature: 'malentendu', gesture: 'informer',
        why: 'Malentendu : Ergolys livre et installe partout. On informe, avec tact.' },
      { quote: 'Comment être sûr que ça réduira vraiment les arrêts ?', topic: 'doute sur le résultat', nature: 'reassurance', gesture: 'rassurer',
        why: 'Demande de réassurance : on rassure avec les retours clients, l’étude ergonomique et l’essai de 30 jours.' },
      { quote: 'Envoyez-moi une plaquette, je regarderai.', topic: 'demande de documentation', nature: 'pretexte', gesture: 'creuser',
        why: 'Prétexte, dérobade : on creuse l’intérêt réel avant d’envoyer quoi que ce soit, pour garder la main.' }
    ]
  },

  /* ── 1.4 · Ce qui n'est pas dit ─────────────────────────────────────── */
  '1.4': {
    eyebrow: 'Exercice 1.4',
    title: 'Ce qui n’est pas dit',
    subtitle: 'Une dérobade peut masquer une objection. À vous de la faire émerger.',
    // Positions des bulles sur l'illustration, en pourcentage de l'image.
    bubbles: [
      { who: 'Client', text: 'Écoutez, ce n’est pas le moment, je vais réfléchir.', left: 47, top: 4 },
      { who: 'Commerciale', text: 'D’accord, je vous rappelle dans un mois ?', left: 21, top: 30 },
      { who: 'Client', text: 'Oui voilà, on verra.', mark: 'on verra.', left: 47, top: 66 }
    ],
    hypothesisHelp: 'Plusieurs explications sont possibles.',
    questionHelp: 'Cherchez à comprendre, sans présumer de la réponse.',
    hint: '« Je vais réfléchir » et « on verra » ne donnent aucun motif. Demandez-vous ce qui pourrait retenir ce client : le prix, un doute sur le produit, une autre personne à consulter ? Puis formulez une question ouverte qui l’invite à en parler.',
    hypotheses: [
      'Le prix.',
      'Un doute sur l’utilité.',
      'La nécessité de valider en interne.',
      'La crainte de se tromper.'
    ],
    model: 'Bien sûr. Pour vous aider au mieux, qu’est-ce qui vous fait hésiter aujourd’hui : le budget, le moment, ou autre chose ?',
    lesson: '« Je vais réfléchir » est souvent un prétexte qui masque une objection non exprimée. En acceptant un report vague, la commerciale perd la main ; la question isole la vraie objection plutôt que de subir un « on verra ».'
  },

  /* ── 1.5 · Face au « C'est trop cher » ──────────────────────────────── */
  '1.5': {
    eyebrow: 'Traiter une objection',
    title: 'Face au « C’est trop cher »',
    subtitle: 'Comparez deux réponses, choisissez la plus efficace, puis expliquez pourquoi.',
    speaker: 'Client',
    quote: 'C’est trop cher.',
    asideTitle: 'Deux façons de répondre.',
    asideText: 'Laquelle aide vraiment à comprendre et à traiter l’objection ?',
    listTitle: 'Les deux réponses',
    options: [
      { id: '1', label: 'Commercial 1', text: 'Ce n’est pas cher, c’est le prix normal pour de la qualité. En plus, je peux exceptionnellement vous faire une remise de 10 %.',
        analysis: [
          'Contredit le client (« ce n’est pas cher ») au lieu d’accueillir sa remarque.',
          'Ne pose aucune question : la cause réelle de l’objection reste inconnue.',
          'Cède une remise d’emblée : le prix perd sa crédibilité, sans garantie que ce soit le vrai frein.'
        ] },
      { id: '2', label: 'Commercial 2', text: 'Je comprends, c’est effectivement un budget. Par rapport à quoi trouvez-vous ce prix élevé : une autre offre, une enveloppe prévue ? Si je comprends bien, vous voulez être sûr que l’investissement en vaut la peine. Nos clients constatent une baisse des arrêts liés aux TMS, et l’essai de 30 jours vous permet de le vérifier sans risque. Est-ce que cela répond à votre préoccupation ?',
        analysis: [
          'Accueillir : « Je comprends, c’est effectivement un budget. »',
          'Questionner : « Par rapport à quoi trouvez-vous ce prix élevé ? »',
          'Reformuler : « Si je comprends bien, vous voulez être sûr… »',
          'Traiter : une preuve (baisse des arrêts) et un essai sans risque.',
          'Contrôler : « Est-ce que cela répond à votre préoccupation ? »'
        ] }
    ],
    answer: '2',
    whyLabel: 'Pourquoi ce choix ?',
    whyHelp: 'Appuyez-vous sur les étapes du traitement de l’objection.',
    hint: 'Comptez les étapes de la méthode que chaque commercial respecte : accueillir, questionner, reformuler, traiter, contrôler.',
    model: 'La réponse 2. Elle accueille, creuse (« par rapport à quoi ? »), reformule, traite avec une preuve (baisse des arrêts, essai de 30 jours) et contrôle l’adhésion. La réponse 1 contredit le client, ne creuse rien et brade d’emblée avec une remise : c’est de la négociation prématurée, qui affaiblit la valeur au lieu de traiter l’objection.'
  },

  /* ── 1.6 · Répondre en 6 étapes ─────────────────────────────────────── */
  '1.6': {
    eyebrow: 'Exercice 1.6',
    title: 'Répondre en 6 étapes',
    subtitle: 'Une phrase adressée au client pour chaque étape.',
    portrait: 'assets/illustrations/s1/1-1-3-S1-portrait.png',
    portraitAlt: 'Le client, la main sous le menton, perplexe.',
    // Une consigne et un repère par étape, dans l'ordre de ATELIER_METHOD.
    prompts: [
      { question: 'Comment montrer au client que vous avez entendu sa remarque ?', tip: 'Commencez par « Je comprends… » ou « C’est une bonne question… » : on accueille, on ne discute pas encore.' },
      { question: 'Quelle question posez-vous pour comprendre ce qui se cache derrière ?', tip: 'Une question ouverte : « Qu’est-ce qui vous fait dire que… ? », « Par rapport à quoi… ? »' },
      { question: 'Comment vérifiez-vous que vous avez bien compris ?', tip: '« Si je comprends bien, ce qui compte pour vous, c’est… ? » : on fait valider par le client.' },
      { question: 'Quelle réponse adaptée apportez-vous ?', tip: 'Un élément concret : une preuve chiffrée, un bénéfice précis, un essai, un témoignage.' },
      { question: 'Comment vérifiez-vous que votre réponse a levé le doute ?', tip: 'Une question fermée simple : « Est-ce que cela répond à votre question ? »' },
      { question: 'Comment reprenez-vous le fil de la vente ?', tip: 'Proposez une suite concrète : un essai, un rendez-vous, un chiffrage, avec une alternative de date.' }
    ],
    // Le modèle de « Nos chaises actuelles suffisent » est celui de la fiche ;
    // les trois autres reprennent les réponses de sa bibliothèque (1.7).
    objections: [
      { text: 'Nos chaises actuelles suffisent.', model: [
        'Je comprends : si personne ne se plaint, la question ne se pose pas tous les jours.',
        'Vous arrive-t-il d’avoir des salariés gênés par le dos, ou des arrêts de ce type ?',
        'Si je comprends bien, vous préférez éviter de dépenser tant que ce n’est pas un vrai problème.',
        'C’est justement l’objectif : prévenir les TMS avant l’arrêt. Nos clients constatent une baisse des absences, et l’étude ergonomique ne cible que les postes à risque.',
        'Est-ce que cet angle prévention vous parle ?',
        'Je vous propose un diagnostic gratuit de 2 ou 3 postes pour objectiver le besoin.'
      ] },
      { text: 'C’est trop cher.', model: [
        'Je comprends, c’est un vrai investissement.',
        'Par rapport à quoi le trouvez-vous élevé : une autre offre, un budget prévu ?',
        'Si je comprends bien, vous voulez être sûr que l’investissement en vaut la peine.',
        'Vos sièges sont garantis 5 ans, et l’essai de 30 jours vous permet de vérifier la valeur sans risque ; la location est aussi possible pour étaler le budget.',
        'Est-ce que cela répond à votre préoccupation ?',
        'Je vous propose de lancer l’essai sur quelques postes : plutôt la semaine prochaine ou la suivante ?'
      ] },
      { text: 'Je dois voir avec la direction.', model: [
        'Bien sûr, c’est une décision qui se prend à plusieurs.',
        'Qu’est-ce qui compterait le plus pour votre direction ?',
        'Si je comprends bien, vous avez besoin d’éléments solides pour présenter le projet.',
        'Je vous prépare un argumentaire chiffré, et je peux présenter le projet en quelques minutes à votre direction.',
        'Est-ce que cela vous aiderait à le défendre ?',
        'Quand voyez-vous votre direction ? Je peux vous envoyer l’argumentaire la veille.'
      ] },
      { text: 'J’ai été déçu par un fournisseur.', model: [
        'Je comprends, une mauvaise expérience laisse des traces.',
        'Qu’est-ce qui s’était mal passé ?',
        'Si je comprends bien, vous voulez être certain de ne pas revivre la même situation.',
        'Chez Ergolys, vous avez une garantie de 5 ans, un SAV sous 48 h, un essai de 30 jours satisfait ou remboursé, et plus de 1 200 entreprises déjà équipées.',
        'Ces garanties répondent-elles à votre crainte ?',
        'Je vous propose de démarrer par l’essai de 30 jours : on fixe la date ensemble ?'
      ] }
    ],
    // L'auto-évaluation, une ligne par étape.
    checks: [
      'Ma phrase d’accueil ne contredit pas le client.',
      'Ma question est ouverte et cherche la cause réelle.',
      'Ma reformulation se termine par une demande de validation.',
      'Ma réponse s’appuie sur un élément concret.',
      'Je vérifie que le doute est levé avant d’avancer.',
      'Je propose une suite précise.'
    ]
  },

  /* ── 1.7 · Ma bibliothèque d'objections ─────────────────────────────── */
  '1.7': {
    eyebrow: 'Exercice 1.7',
    title: 'Ma bibliothèque d’objections',
    subtitle: 'Préparez quatre réponses utiles pour vos prochains rendez-vous.',
    fiches: [
      { text: 'C’est trop cher.', nature: 'fondee', natureNote: 'Une réserve réelle sur le prix : on creuse, puis on argumente la valeur.',
        question: 'Par rapport à quoi ?',
        answer: 'Mettre en avant la valeur : essai de 30 jours et garantie de 5 ans ; la location est possible pour étaler le budget.',
        proof: 'L’essai de 30 jours et la garantie de 5 ans.' },
      { text: 'Nos chaises actuelles suffisent.', nature: 'pretexte', natureNote: 'Un prétexte, le statu quo : on creuse pour savoir si un besoin existe.',
        question: 'Avez-vous des salariés gênés par le dos ?',
        answer: 'Parler prévention des TMS et proposer un diagnostic gratuit.',
        proof: 'La baisse des arrêts constatée chez nos clients.' },
      { text: 'Je dois voir avec la direction.', nature: 'fondee', natureNote: 'Fondée : c’est le processus de décision de l’entreprise.',
        question: 'Qu’est-ce qui compterait pour eux ?',
        answer: 'Fournir un argumentaire chiffré et proposer une présentation courte à la direction.',
        proof: 'Un argumentaire chiffré.' },
      { text: 'J’ai été déçu par un fournisseur.', nature: 'reassurance', natureNote: 'Une demande de réassurance : le client veut éviter de revivre la même déception.',
        question: 'Qu’est-ce qui s’était mal passé ?',
        answer: 'Rassurer par les garanties : garantie de 5 ans, SAV sous 48 h, essai de 30 jours satisfait ou remboursé.',
        proof: 'Plus de 1 200 entreprises équipées.' }
    ]
  }
};
