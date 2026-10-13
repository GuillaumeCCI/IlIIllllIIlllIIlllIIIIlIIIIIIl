/* SÉRIE 3 · ARGUMENTER AVEC JUSTESSE · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Éléments non visibles sur les
 * maquettes (séries B et C de l'intrus, besoins 2 et 3, répliques 2 à 4,
 * réactions du client dans l'arbre), réponses attendues et corrigés : fiche
 * « Activités supplémentaires SCORM 3 » (M1.1.2, exercices 3.1 à 3.6),
 * transposée au vouvoiement.
 */
window.ATELIER_S3 = {
  /* ── 3.1 · Repérez l'intrus ─────────────────────────────────────────── */
  '3.1': {
    eyebrow: 'Exercice · Argumentation',
    title: 'Repérez l’intrus',
    subtitle: 'Chaque série contient deux bonnes pratiques et une erreur. Sélectionnez l’affirmation fausse, puis expliquez brièvement pourquoi elle pénalise l’échange.',
    // `wrong` : index de l'affirmation fausse.
    series: [
      {
        items: [
          'Un argument efficace est relié à un besoin exprimé par le client.',
          'Après avoir présenté un argument, le commercial vérifie la réaction du client.',
          'Plus le commercial enchaîne d’arguments, plus il augmente ses chances de convaincre.'
        ],
        wrong: 2,
        why: 'Accumuler les arguments peut au contraire diluer le message et noyer les éléments réellement importants pour le client. Une argumentation efficace privilégie quelques arguments directement liés aux besoins identifiés. À privilégier : argumenter, laisser réagir, vérifier l’impact, ajuster.'
      },
      {
        items: [
          'Laisser le client réagir fait partie de l’argumentation.',
          'Employer un vocabulaire très technique renforce toujours la crédibilité du commercial.',
          'Une preuve concrète permet de renforcer un argument.'
        ],
        wrong: 1,
        why: 'Le vocabulaire technique n’est utile que s’il est adapté à l’interlocuteur et compris par lui. Utilisé sans nécessité, le jargon rend le discours difficile à comprendre et masque le bénéfice concret. À privilégier : traduire les caractéristiques techniques en bénéfices compréhensibles et les appuyer par des preuves.'
      },
      {
        items: [
          'Présenter un argument sur un besoin que le client n’a pas exprimé est toujours pertinent.',
          'La réaction du client permet d’adapter la suite de son argumentation.',
          'Sélectionner quelques arguments pertinents est généralement plus efficace que de présenter tout ce que l’on sait du produit.'
        ],
        wrong: 0,
        why: 'Un argument est d’autant plus pertinent qu’il répond à une préoccupation identifiée chez le client. Introduire des arguments sans lien avec ses attentes risque de détourner l’échange de ses priorités. À privilégier : écouter, sélectionner l’argument pertinent, observer la réaction, rebondir.'
      }
    ]
  },

  /* ── 3.2 · Action → Réaction ────────────────────────────────────────── */
  '3.2': {
    eyebrow: 'Exercice · Argumentation',
    title: 'Action → Réaction',
    subtitle: 'La façon dont vous argumentez influence directement votre client. Glissez chaque numéro vers la réaction la plus probable.',
    note: 'Chaque numéro ne peut être utilisé qu’une fois.',
    behaviours: [
      'Relier son argument à un besoin exprimé par le client.',
      'Présenter de nombreux arguments à la suite, sans laisser le client réagir.',
      'Poser une question pour vérifier l’effet de son argument.',
      'Employer un vocabulaire technique sans l’expliquer.',
      'Appuyer son argument avec une preuve chiffrée et concrète.',
      'Continuer à argumenter alors que le client semble déjà convaincu.'
    ],
    // Les réactions sont volontairement mélangées : `answer` est le numéro
    // du comportement qui la provoque, `why` l'explication du corrigé.
    reactions: [
      { text: 'Il est davantage rassuré et accorde plus de crédibilité à l’argument.', answer: 5, why: 'Une donnée concrète et vérifiable renforce la crédibilité de l’argument et contribue à rassurer le client.' },
      { text: 'Il risque de décrocher face à trop d’informations.', answer: 2, why: 'Accumuler les arguments sans pause provoque une saturation : les arguments importants se perdent dans la quantité.' },
      { text: 'Il peut commencer à douter alors qu’il était initialement convaincu.', answer: 6, why: 'Argumenter auprès d’un client déjà convaincu est contre-productif : de nouvelles informations peuvent faire naître des doutes inutiles.' },
      { text: 'Il se sent compris et perçoit immédiatement l’intérêt de l’argument.', answer: 1, why: 'Relier l’argument au besoin montre au client que sa situation a été comprise et donne immédiatement du sens à l’argument.' },
      { text: 'Il risque de ne plus comprendre le message et de se sentir perdu.', answer: 4, why: 'Un jargon non expliqué crée de l’incompréhension : une caractéristique technique doit être traduite en bénéfice compréhensible.' },
      { text: 'Il peut confirmer son intérêt, le nuancer ou exprimer une nouvelle préoccupation.', answer: 3, why: 'Une question de contrôle permet de savoir comment le client reçoit l’argument : il confirme, nuance ou fait apparaître une nouvelle attente.' }
    ],
    takeaway: 'Une argumentation efficace suit une logique d’échange : argumenter, observer la réaction, vérifier, ajuster. L’objectif n’est pas de dire le plus de choses possible, mais de présenter le bon argument au bon moment et de laisser au client la possibilité de réagir.',
        rule: 'Glissez une pastille numérotée sur une réaction, ou cliquez une pastille puis l’emplacement « N° ». Cliquez un emplacement rempli pour le vider.'
  },

  /* ── 3.3 · Le bon argument au bon moment ────────────────────────────── */
  '3.3': {
    eyebrow: 'Exercice · Argumentation',
    title: 'Le bon argument au bon moment',
    subtitle: 'Le client exprime un besoin. Sélectionnez l’argument commercial le plus pertinent pour y répondre.',
    note: 'Un seul argument est sélectionné par besoin. Certains arguments sont des intrus et ne seront pas utilisés.',
    options: [
      'Import des données existantes inclus',
      'Formation incluse pour faciliter une prise en main rapide',
      'Chiffrement des données AES-256',
      'Tarif à partir de 19 €/mois, sans engagement',
      'Interface moderne'
    ],
    needs: [
      { tab: 'Prise en main', quote: 'Ce qui compte pour moi, c’est que mon équipe puisse utiliser la solution rapidement.', answer: 1, why: 'Le client veut que son équipe soit rapidement opérationnelle : la formation incluse répond directement à cette préoccupation.' },
      { tab: 'Reprise des données', quote: 'Je dois aussi récupérer toutes mes données actuelles. Je ne veux rien perdre lors du changement de solution.', answer: 0, why: 'Le client veut récupérer ses données lors du changement : l’import inclus est l’argument le plus directement lié. Ne vous laissez pas distraire par le chiffrement AES-256 : il concerne la protection des données, pas leur transfert.' },
      { tab: 'Budget', quote: 'Et puis notre budget est assez serré. Je dois vraiment maîtriser les coûts.', answer: 3, why: 'Le client exprime une contrainte budgétaire : le tarif et l’absence d’engagement sont les éléments les plus pertinents à ce moment de l’échange.' }
    ],
    intruders: 'Le chiffrement AES-256 deviendrait pertinent si le client exprimait une préoccupation de sécurité ou de confidentialité. L’interface moderne n’apporte pas de réponse assez directe aux trois besoins exprimés. Le bon argument n’est pas simplement un argument intéressant sur le produit : c’est celui qui répond au besoin que le client vient d’exprimer.',
        rules: [
      'Un seul argument par besoin.',
      'Chaque argument ne peut servir qu’une fois : ceux déjà retenus sont grisés.',
      'Deux arguments ne correspondent à aucun besoin : ce sont des intrus.'
    ]
  },

  /* ── 3.4 · Le radar de dérive ───────────────────────────────────────── */
  '3.4': {
    eyebrow: 'Exercice · Pertinence',
    title: 'Le radar de dérive',
    subtitle: 'Pour chaque argument, indiquez s’il répond directement à la priorité du client ou s’il s’écarte du sujet.',
    priority: 'Je veux réduire le temps passé sur mes tâches administratives.',
    rows: [
      { text: 'Notre outil automatise vos relances : vous gagnez jusqu’à 3 heures par semaine.', answer: 'fit', why: 'Pertinent : l’automatisation des relances réduit directement le temps administratif, et le gain de 3 heures par semaine rend le bénéfice concret.' },
      { text: 'L’interface de notre solution a remporté un prix de design.', answer: 'drift', why: 'Dérive : le prix de design valorise le produit, mais ne répond pas au besoin de gain de temps.' },
      { text: 'Vous générez vos devis en un clic et évitez la double saisie.', answer: 'fit', why: 'Pertinent : devis en un clic et fin de la double saisie simplifient les tâches administratives.' },
      { text: 'La solution intègre également un module marketing avec une segmentation avancée.', answer: 'drift', why: 'Dérive : le client n’a exprimé aucun besoin marketing ; présenter ce module détourne l’argumentation de sa priorité.' },
      { text: 'L’application mobile dispose d’une interface particulièrement élégante.', answer: 'drift', why: 'Dérive : l’élégance de l’application ne démontre pas qu’elle réduira le temps de gestion administrative.' }
    ],
    columns: [
      { id: 'fit', label: 'Pertinent', sub: 'Répond au besoin' },
      { id: 'drift', label: 'Dérive', sub: 'S’écarte du sujet' }
    ]
  },

  /* ── 3.5 · Vérifier avant d'avancer ─────────────────────────────────── */
  '3.5': {
    eyebrow: 'Exercice · Écoute client',
    title: 'Vérifier avant d’avancer',
    subtitle: 'Pour chaque réplique, indiquez si le vendeur invite le client à réagir ou s’il continue son argumentation sans vérifier l’effet produit.',
    note: 'Si le vendeur pousse son argumentation, rédigez la question de contrôle qu’il aurait pu poser.',
    lines: [
      { text: 'Vous gagnez jusqu’à 3 heures par semaine. Est-ce que ce gain de temps ferait une différence dans votre quotidien ?', answer: 'check', why: 'Le commercial ne se contente pas d’annoncer le bénéfice : sa question permet au client de dire si le gain de temps a réellement de la valeur pour lui.' },
      { text: 'Vous pouvez également générer vos devis en un clic et éviter la double saisie.', answer: 'push', why: 'L’argument est pertinent, mais le commercial enchaîne sans solliciter la réaction du client. D’autres formulations sont possibles, dès lors qu’elles vérifient l’intérêt du client.', model: 'Le fait de générer vos devis en un clic vous ferait-il gagner du temps au quotidien ?' },
      { text: 'Et ce n’est pas tout : la solution propose encore de nombreuses fonctionnalités. Elle est vraiment très complète.', answer: 'push', why: 'Le commercial valorise globalement la solution sans chercher à savoir ce qui compte pour le client : il risque de repartir dans une logique de catalogue.', model: 'Parmi les éléments que nous venons de voir, lequel répond le mieux à votre besoin de gagner du temps ?' },
      { text: 'Est-ce que cela vous semble répondre à votre besoin de réduire le temps passé sur l’administratif ?', answer: 'check', why: 'La question permet au client de confirmer, nuancer ou remettre en question la pertinence des arguments par rapport à son besoin initial.' }
    ],
        choices: [
      { id: 'check', label: 'Vérifie l’impact', sub: 'Il invite activement le client à réagir.', image: 'assets/illustrations/s2/verifie.webp' },
      { id: 'push', label: 'Pousse son argumentation', sub: 'Il continue de parler sans valider l’effet produit.', image: 'assets/illustrations/s2/pousse.webp' }
    ]
  },

  /* ── 3.6 · L'arbre des réactions ────────────────────────────────────── */
  '3.6': {
    eyebrow: 'Exercice 3.6 · Argumentation',
    title: 'L’arbre des réactions',
    subtitle: 'Construisez votre argument CAP, puis faites évoluer l’échange selon la réaction du client.',
    need: 'Réduire le temps consacré aux tâches administratives.',
    steps: [
      { key: 'C', label: 'Caractéristique', question: 'Quelle caractéristique répond directement à ce besoin ?', placeholder: 'Votre caractéristique…', help: 'Une information concrète, en une phrase.', button: 'Ajouter la caractéristique', hint: 'Cherchez une fonction du logiciel qui supprime une tâche répétitive : saisie, relances, devis.', model: 'RelaCosy automatise la saisie de vos factures.' },
      { key: 'A', label: 'Avantage', question: 'Que gagne concrètement le client grâce à cette caractéristique ?', placeholder: 'Votre avantage…', help: 'Commencez par « Vous… ».', button: 'Ajouter l’avantage', hint: 'Traduisez la fonction en temps récupéré, en tranquillité, en tâches évitées.', model: 'Vous réduisez ainsi les saisies manuelles et pouvez économiser environ 3 heures de travail administratif par semaine.' },
      { key: 'P', label: 'Preuve', question: 'Quelle preuve rend cet avantage crédible ?', placeholder: 'Votre preuve…', help: 'Un chiffre, un témoignage, une démonstration.', button: 'Ajouter la preuve', hint: 'Un chiffre précis vaut mieux qu’un adjectif : combien d’heures, combien de clients ?', model: 'C’est le gain de temps moyen constaté chez nos clients utilisant cette fonctionnalité. Est-ce que ce gain de temps serait significatif pour vous ?' },
      { key: 'yes', label: 'Convaincu', question: 'Le client est convaincu. Comment poursuivez-vous l’échange ?', client: 'Oui, clairement, ça me ferait gagner du temps.', placeholder: 'Votre réponse au client convaincu…', help: 'Validez l’intérêt et avancez, sans surargumenter.', button: 'Ajouter la branche', hint: 'Inutile de continuer à défendre le même point : validez, puis passez à la suite de l’échange.', model: 'Très bien. Regardons alors un autre poste qui vous prend du temps aujourd’hui : la préparation de vos devis.' },
      { key: 'no', label: 'Sceptique', question: 'Le client reste sceptique. Comment rebondissez-vous ?', client: 'Je ne suis pas certain que ce soit là que nous perdons le plus de temps.', placeholder: 'Votre réponse au client sceptique…', help: 'Questionnez pour comprendre sa réserve avant d’argumenter de nouveau.', button: 'Terminer l’arbre', hint: 'N’ajoutez pas tout de suite un nouvel argument : cherchez d’abord à comprendre où il perd du temps.', model: 'D’accord. Sur quelles tâches administratives perdez-vous le plus de temps aujourd’hui ?' }
    ],
    takeaway: 'La réaction du client détermine la suite : client convaincu, on valide et on avance, sans surargumenter ; client sceptique, on questionne, on comprend et on ajuste, et sa réponse permet de choisir un argument plus pertinent. L’objectif n’est pas d’enchaîner les arguments préparés, mais de piloter l’échange en fonction des réactions du client.'
  }
};
