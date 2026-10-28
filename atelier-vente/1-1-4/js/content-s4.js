/* SÉRIE 4 · RELANCER · contenus éditables.
 *
 * Textes des maquettes repris tels quels, autour de la proposition envoyée
 * le 3 juin à Madame Riveau (ressources humaines d'une entreprise de 80 salariés, 10 postes). Ce
 * qu'elles ne montrent pas (affirmations 2 à 6, extraits A et C) et les
 * corrigés viennent de la fiche « Activités supplémentaires SCORM 4 »
 * (M1.1.4), transposée au vouvoiement.
 */

/* L'e-mail de 4.2, dont les trois paragraphes sont les extraits à placer. */
const RELANCE_EFFICACE = [
  'Bonjour Madame Riveau, je reviens vers vous au sujet de la proposition d’équipement de vos 10 postes, envoyée le 3 juin.',
  'Un client de votre secteur vient de constater une nette baisse des arrêts pour mal de dos après installation : je peux vous partager son retour.',
  'Auriez-vous 15 minutes mardi ou jeudi pour en parler ?'
];

window.ATELIER_S4 = {
  /* ── 4.1 · Le Vrai / Faux de la relance ─────────────────────────────── */
  '4.1': {
    eyebrow: 'Exercice 4.1 · Relance',
    title: 'Le Vrai / Faux de la relance',
    context: {
      situation: 'Vous avez envoyé une offre à un prospect, et il ne vous a pas encore répondu.',
      read: '6 affirmations sur la façon de le relancer.',
      choose: 'Pour chacune, dites si elle est vraie ou fausse.'
    },
    subtitle: 'Pour chaque affirmation, choisissez Vrai ou Faux.',
    cardLabel: 'Affirmation',
    cardsLabel: 'affirmations',
    symbol: 'search',
    question: 'À vous de trancher',
    zones: window.ATELIER_TRUE_FALSE,
    confirmLabel: 'Vérifier ma réponse',
    cards: [
      { text: 'Une relance efficace se contente de demander : « Alors, vous avez réfléchi ? »', answer: 'F', why: 'Relancer ne consiste pas simplement à réclamer une réponse : une bonne relance apporte une raison de reprendre l’échange.' },
      { text: 'On planifie la première relance dès l’envoi de l’offre.', answer: 'V', why: 'Anticiper la relance dès l’envoi permet de ne pas laisser la proposition sans suite.' },
      { text: 'Apporter un élément nouveau donne au prospect une raison de répondre.', answer: 'V', why: 'Une information nouvelle, un bénéfice, un témoignage ou une actualité pertinente donne une nouvelle raison d’échanger.' },
      { text: 'Après deux relances sans réponse, il faut culpabiliser le client pour provoquer une réaction.', answer: 'F', why: 'Une relance ne doit jamais mettre le client sous pression ni le culpabiliser.' },
      { text: 'Varier les canaux de contact (mail, téléphone…) peut favoriser une réponse.', answer: 'V', why: 'Changer de canal permet de toucher le prospect différemment et facilite la reprise de contact.' },
      { text: 'Une relance efficace propose un prochain pas concret.', answer: 'V', why: 'Une action précise facilite la suite : un rendez-vous, un appel, une validation, une information complémentaire.' }
    ],
    keyPoint: 'À retenir : une bonne relance se planifie, apporte de la valeur et facilite le prochain pas, sans jamais culpabiliser le prospect.'
  },

  /* ── 4.2 · L'anatomie d'une relance efficace ────────────────────────── */
  '4.2': {
    eyebrow: 'Exercice 4.2 · Relance',
    title: 'À chaque extrait, sa place',
    subtitle: 'Placez chaque extrait de l’e-mail dans sa partie.',
    intro: {
      title: 'L’anatomie d’une relance efficace',
      subtitle: 'Lisez l’e-mail avant de classer ses trois extraits.',
      scene: { email: { lines: RELANCE_EFFICACE } },
      next: 'Passer aux associations',
      reread: 'Relire l’e-mail'
    },
    cardLabel: 'Extrait',
    cardsLabel: 'extraits',
    // Visite en deux temps : l'e-mail à lire, puis (`later`) les associations.
    tour: [
      { target: '.mt-intro', title: 'L’e-mail de relance', text: 'Lisez cet e-mail en entier : il est découpé en trois extraits que vous allez classer.' },
      { target: '.mt-page .k-bar .k-submit', title: 'Passer aux associations', text: 'Quand vous avez lu l’e-mail, ce bouton ouvre l’exercice.' },
      { later: true, target: '.mt-card', title: 'L’extrait', text: 'Voici un extrait de l’e-mail. À quelle partie d’une relance correspond-il ?' },
      { later: true, target: '.mt-zones', title: 'Les trois parties',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur la partie qui correspond à l’extrait.' },
          { symbol: 'grip', tone: 'blue', text: 'Ou faites glisser l’extrait sur la partie.' }
        ],
        after: 'Chaque partie ne s’utilise qu’une fois.' },
      { later: true, target: '.mt-reread', title: 'Relire l’e-mail', text: 'Un doute ? Ce bouton rouvre l’e-mail complet.' },
      { later: true, target: '.mt-page .k-bar', title: 'Valider', text: 'Les 3 extraits placés, validez vos associations pour voir le corrigé.' }
    ],
    zoneTitle: 'Où placer cet extrait ?',
    zoneNoun: 'partie',
    zones: [
      { label: 'Rappel du contexte', sub: 'Pourquoi est-ce que je reprends contact ?' },
      { label: 'Élément de valeur', sub: 'Qu’est-ce que j’apporte de nouveau ou d’utile ?' },
      { label: 'Appel à l’action', sub: 'Quel prochain pas est proposé ?' }
    ],
    // Les extraits sont présentés dans le désordre.
    cards: [
      { text: RELANCE_EFFICACE[1], answer: 1, why: 'Le commercial ne se contente pas de demander une réponse : il apporte un retour d’expérience susceptible d’intéresser sa cliente.' },
      { text: RELANCE_EFFICACE[2], answer: 2, why: 'Une action précise et facile à réaliser : 15 minutes d’échange, avec deux possibilités de rendez-vous.' },
      { text: RELANCE_EFFICACE[0], answer: 0, why: 'Le commercial rappelle la proposition concernée et sa date d’envoi : la cliente identifie immédiatement le sujet.' }
    ],
    submitLabel: 'Valider mes associations',
    keyPoint: 'À retenir : pour structurer vos prochaines relances, pensez à ce réflexe : je rappelle le contexte, j’apporte de la valeur, je propose la suite.'
  },

  /* ── 4.3 · Trouver l'élément de valeur ──────────────────────────────── */
  '4.3': {
    eyebrow: 'Exercice 4.3 · Relance',
    title: 'Trouver l’élément de valeur',
    subtitle: 'Pour chaque idée, apportez quelque chose de nouveau ou d’utile au client.',
    countLabel: 'éléments rédigés',
    // Écran propre (js/screens/s4-4-3.js) : le contexte à gauche, les trois
    // éléments en accordéon à droite.
    context: {
      info: 'L’offre Ergolys pour 10 postes complets a été envoyée il y a une semaine. Madame Riveau n’a pas répondu.',
      // Mêmes faits que le reste de la série 4 : Madame Riveau, entreprise de 80 salariés.
      rows: [
        { symbol: 'users', tone: 'blue', label: 'La cliente', text: 'Madame Riveau, responsable des ressources humaines d’une entreprise de 80 salariés.' },
        { symbol: 'document', tone: 'blue', label: 'L’offre', text: '10 postes pour 17 000 €, installation et garantie 5 ans comprises.' },
        { symbol: 'target', tone: 'green', label: 'Son enjeu', text: 'Soulager le mal de dos de ses équipes.' },
        { symbol: 'chat', tone: 'coral', label: 'Son frein probable', text: 'Convaincre sa direction de la dépense.' }
      ]
    },
    subs: [
      'Une information concrète que le client n’a pas encore.',
      'Une autre raison, différente de la première, de reprendre l’échange.',
      'Une idée qui l’aide à avancer dans sa décision.'
    ],
    // L'indice : des amorces de phrases concrètes, puis la règle d'or.
    hint: {
      title: 'Comment apporter de la valeur dans cette relance ?',
      items: [
        { label: 'Partager un résultat', example: 'Depuis notre dernier échange, un client de votre secteur a obtenu [résultat] grâce à…' },
        { label: 'Poser une question utile', example: 'Avez-vous pu avancer sur [sujet évoqué ensemble] ?' },
        { label: 'Apporter un point de réassurance', example: 'Pour rappel, l’installation ne demande que [durée] et…' },
        { label: 'Proposer une prochaine étape simple', example: 'Je vous propose d’en parler 10 minutes mardi ou jeudi. Lequel vous convient ?' }
      ],
      rule: 'Ne relancez pas « juste pour prendre des nouvelles ». Apportez une information nouvelle (un chiffre, une évolution) qui aide le client à avancer.'
    },
    tour: [
      { target: '.vf-context', title: 'Le contexte', text: 'Gardez-le en tête : chaque élément doit donner à ce client une bonne raison de reprendre l’échange.' },
      { target: '.vf-item.is-open', title: 'Un élément à la fois', text: 'Rédigez l’élément ouvert, comme une phrase que vous écririez au client.',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur un autre élément pour l’ouvrir.' },
          { symbol: 'check', tone: 'green', text: 'Un élément rédigé est coché.' }
        ] },
      { target: '.vf-actions .k-dialog-button', title: 'Un indice', text: 'À court d’idées ? Ce bouton propose des pistes et un repère pour trouver un élément qui compte pour le client.' },
      { target: '.vf-actions .k-submit', title: 'Enregistrer', text: 'Il passe à l’élément suivant. Après le troisième, des pistes possibles s’affichent dans le corrigé.' }
    ],
    cases: [
      { tab: 'Mes 3 éléments de valeur', fields: [
        { id: 'v1', label: 'Élément 1', placeholder: 'Rédigez votre premier élément de valeur…', rows: 2, model: 'Le retour chiffré d’un client du même secteur (baisse des arrêts).' },
        { id: 'v2', label: 'Élément 2', placeholder: 'Rédigez votre deuxième élément de valeur…', rows: 2, model: 'Une échéance : fin de l’offre d’essai de 30 jours étendue, ou disponibilité d’un créneau d’installation.' },
        { id: 'v3', label: 'Élément 3', placeholder: 'Rédigez votre troisième élément de valeur…', rows: 2, model: 'Une information utile : nouveau coloris, option location pour étaler le budget, étude ergonomique offerte.' }
      ], lesson: 'Autre piste du corrigé : une proposition d’aide, comme un diagnostic gratuit de 2 ou 3 postes pour objectiver le besoin. Toute proposition pertinente est valable.' }
    ],
    submitLabel: 'Enregistrer mes 3 éléments',
    feedback: 'Chacun de vos éléments donne-t-il au client une raison nouvelle de reprendre l’échange ?'
  },

  /* ── 4.4 · Analyser une relance à jeter ─────────────────────────────── */
  '4.4': {
    eyebrow: 'Exercice 4.4 · Relance',
    title: 'Analyser une relance à jeter',
    subtitle: 'Lisez l’e-mail avant d’en examiner les quatre erreurs.',
    sequential: true,
    countLabel: 'étapes',
    caseNoun: 'Étape',
    layout: 'stack',
    tour: [
      { target: '.fm-tabs', title: 'Deux étapes', text: 'L’exercice se fait en deux temps :',
        items: [
          { key: '1', tone: 'blue', text: 'lire l’e-mail de relance envoyé par Thomas ;' },
          { key: '2', tone: 'coral', text: 'repérer ses quatre erreurs et expliquer leur effet sur la relation.' }
        ],
        after: 'La deuxième étape s’ouvre une fois l’e-mail lu.' },
      { target: '.sc-email', title: 'L’e-mail à analyser', text: 'Lisez-le en entier, comme si vous étiez Madame Riveau : qu’est-ce qui vous donnerait envie de répondre, ou pas ?' },
      { target: '.fm-actions .k-submit, .k-bar .k-submit', title: 'Passer à l’analyse', text: 'Quand vous avez lu l’e-mail, ce bouton ouvre l’étape 2 : quatre zones pour nommer chaque erreur.' }
    ],
    scene: { email: { subject: 'Retour sur notre proposition', lines: [
      'Bonjour Madame Riveau,',
      'Je reviens une nouvelle fois vers vous concernant la proposition commerciale que je vous ai adressée il y a maintenant trois semaines pour l’équipement de vos postes de travail.',
      'Malgré mes précédents messages, je n’ai toujours pas reçu de retour de votre part. J’imagine que vous avez eu le temps d’étudier notre proposition depuis notre dernier échange.',
      'Nous avons vraiment besoin de savoir rapidement si vous souhaitez donner suite, afin que nous puissions nous organiser de notre côté. Notre offre présente de nombreux avantages et je pense qu’elle correspond parfaitement à vos besoins.',
      'Pouvez-vous donc me confirmer votre décision dans les meilleurs délais ?',
      'Merci par avance pour votre retour.',
      'Bien cordialement, Thomas.'
    ] } },
    cases: [
      { tab: 'Lire l’e-mail', fields: [], next: 'Passer à l’analyse' },
      { tab: 'Quatre erreurs à repérer', title: 'Quatre erreurs à repérer', numbered: true, intro: 'Pour chacune, nommez l’erreur et expliquez son effet sur la relation commerciale.', fields: [
        { id: 'e1', label: 'Erreur 1', placeholder: 'L’erreur et pourquoi elle nuit à la relation…', rows: 2, model: 'La relance fait culpabiliser la cliente : « Malgré mes précédents messages, je n’ai toujours pas reçu de retour de votre part » sonne comme un reproche. Une relance cherche à rouvrir la conversation, pas à placer le client en faute.' },
        { id: 'e2', label: 'Erreur 2', placeholder: 'L’erreur et pourquoi elle nuit à la relation…', rows: 2, model: 'Elle n’apporte aucune valeur nouvelle : « Notre offre présente de nombreux avantages » n’apprend rien de concret. La cliente n’a pas plus de raisons de répondre qu’au message précédent.' },
        { id: 'e3', label: 'Erreur 3', placeholder: 'L’erreur et pourquoi elle nuit à la relation…', rows: 2, model: 'Elle est centrée sur les besoins du commercial : « afin que nous puissions nous organiser de notre côté ». La raison de répondre bénéficie au commercial, pas à la cliente.' },
        { id: 'e4', label: 'Erreur 4', placeholder: 'L’erreur et pourquoi elle nuit à la relation…', rows: 2, model: 'L’appel à l’action est contraignant : « Pouvez-vous me confirmer votre décision dans les meilleurs délais ? » exige une décision dans l’urgence, sans étape intermédiaire. Mieux vaut proposer un échange de 15 minutes, deux créneaux précis ou une information complémentaire.' }
      ] }
    ],
    keyPoint: 'À retenir : avant d’envoyer une relance, vérifiez que vous ne culpabilisez pas votre interlocuteur, que vous apportez une information nouvelle ou utile, que vous partez de ses besoins et non des vôtres, et que vous proposez un prochain pas simple et concret.',
    submitLabel: 'Valider mon analyse',
    feedback: 'Comparez vos quatre erreurs au corrigé : ton, valeur, point de vue, prochain pas.'
  },

  /* ── 4.5 · À vous de trancher ! ─────────────────────────────────────── */
  '4.5': {
    eyebrow: 'Exercice 4.5 · Relance',
    title: 'À vous de trancher !',
    subtitle: 'Lisez les deux relances, puis choisissez la plus efficace.',
    context: 'Le 3 juin, vous avez envoyé à Madame Riveau une proposition pour équiper 10 postes de travail. Elle n’a pas encore répondu.',
    tour: [
      { target: '.cmp-context', title: 'Le contexte', wide: true,
        text: 'Vous êtes Thomas, commercial. Le 3 juin, vous avez envoyé à Madame Riveau une proposition pour équiper 10 postes de travail.\nElle n’a pas encore répondu : vous allez la relancer par e-mail.' },
      { target: '.cmp-options', title: 'Les deux relances', text: 'Voici deux e-mails possibles pour relancer Madame Riveau.',
        items: [
          { symbol: 'mail', tone: 'blue', text: 'Lisez les deux relances en entier.' },
          { symbol: 'pointer', tone: 'green', text: 'Cliquez sur « Choisir cette relance » sous celle qui vous semble la plus efficace.' }
        ] },
      { target: '.cmp-why', show: '.cmp-why', title: 'Justifiez votre choix', wide: true,
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Ce cadre apparaît dès que vous avez choisi une relance.' },
          { symbol: 'list', tone: 'blue', text: 'En haut, la consigne : appuyez-vous sur au moins deux critères (contexte, valeur apportée, ton employé, prochain pas proposé).' },
          { symbol: 'pencil', tone: 'gold', text: 'Dans le champ « Votre justification… », écrivez pourquoi la relance choisie est la plus efficace.' },
          { symbol: 'arrowRight', tone: 'green', text: '« Valider ma réponse » affiche ensuite l’analyse des deux relances et le corrigé.' }
        ] }
    ],
    listTitle: 'Quelle relance choisissez-vous ?',
    options: [
      { id: 'A', label: 'Relance A', lines: [
        'Bonjour Madame Riveau,',
        'Je me permets de revenir vers vous concernant notre proposition du 3 juin pour l’équipement de vos 10 postes de travail.',
        'Pour rappel, elle comprend la livraison, l’installation sur place et la garantie de 5 ans sur l’ensemble des sièges.',
        'Je comprends tout à fait que ce type de décision demande du temps et qu’il faut parfois en parler en interne.',
        'Avez-vous eu l’occasion d’en prendre connaissance ?',
        'Je reste bien entendu disponible si vous avez des questions ou si vous souhaitez que nous reprenions certains éléments de l’offre ensemble.',
        'N’hésitez pas à revenir vers moi lorsque vous serez disponible.',
        'Bien cordialement, Thomas'
      ], analysis: ['Polie, personnalisée, elle rappelle le contexte : elle n’est pas mauvaise.', 'Elle apporte peu de valeur nouvelle.', 'Son appel à l’action reste très ouvert : la cliente doit faire tout l’effort de reprendre la conversation.'] },
      { id: 'B', label: 'Relance B', lines: [
        'Bonjour Madame Riveau,',
        'Je reviens vers vous concernant notre proposition du 3 juin pour l’équipement de vos 10 postes de travail.',
        'Depuis notre échange, l’une des entreprises que nous accompagnons dans votre secteur nous a partagé un premier retour positif : après l’installation de ses nouveaux équipements, elle a constaté une diminution des arrêts liés aux douleurs dorsales.',
        'Je serais ravi de vous partager son retour d’expérience et de voir avec vous si certains enseignements peuvent être utiles à votre projet.',
        'Seriez-vous disponible 15 minutes mardi à 11 h ou jeudi à 14 h pour en échanger ?',
        'Bien cordialement, Thomas'
      ], analysis: ['Elle apporte une nouvelle raison de reprendre l’échange : le retour d’une entreprise du même secteur.', 'Elle relie cette valeur au projet de la cliente.', 'Elle facilite le passage à l’action : un échange court, deux créneaux précis.'] }
    ],
    answer: 'B',
    chooseLabel: 'Choisir cette relance',
    whyLabel: 'Justifiez votre choix',
    whyHelp: 'Appuyez-vous sur au moins deux critères : contexte, valeur apportée, ton employé, prochain pas proposé.',
    whyPlaceholder: 'Votre justification…',
    model: 'La relance B est la plus efficace. Les deux messages sont professionnels et rappellent le contexte, mais la B apporte une nouvelle raison d’échanger, la relie au projet de Madame Riveau et propose deux créneaux précis pour un échange de 15 minutes. La A n’est pas mauvaise, mais son « N’hésitez pas à revenir vers moi » laisse tout l’effort à la cliente. À retenir : entre deux relances correctes, privilégiez celle qui donne une nouvelle raison de répondre et rend le prochain pas simple et concret.',
    submitLabel: 'Valider ma réponse'
  },

  /* ── 4.6 · À vous de construire la stratégie ! ──────────────────────── */
  '4.6': {
    eyebrow: 'Exercice 4.6 · Relance',
    title: 'À vous de construire la stratégie !',
    subtitle: 'Quatre étapes, de la première relance à la clôture.',
    countLabel: 'étapes complétées',
    caseNoun: 'Étape',
    stepper: true,
    welcome: { title: 'Le plan de relance', rows: [
      ['target', 'La situation', 'Madame Riveau est intéressée, mais elle n’a pas répondu depuis l’envoi de l’offre.'],
      ['list', 'Un plan de relance', 'C’est une suite de prises de contact prévues à l’avance : trois relances, puis un message de clôture.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque étape, choisir le moment, le canal, l’information utile et le prochain pas.']
    ] },
    tour: [
      { target: '.fm-stepper', title: 'Quatre étapes', text: 'Vous construisez votre plan de relance en quatre étapes :',
      items: [
        { symbol: 'mail', tone: 'blue', text: 'trois relances, de plus en plus espacées ;' },
        { symbol: 'flag', tone: 'coral', text: 'puis un message de clôture.' }
      ],
      after: 'Une étape remplie se coche.' },
      { target: '.fm-side-card', title: 'La situation', text: 'Madame Riveau est intéressée mais n’a pas répondu depuis l’envoi de l’offre. Gardez sa situation en tête à chaque étape.' },
      { target: '.fm-step .fm-row', title: 'Quand et par quel canal',
      items: [
        { symbol: 'calendar', tone: 'blue', text: 'Quand ? En jours après l’envoi de l’offre : J+3, J+10…' },
        { symbol: 'phone', tone: 'coral', text: 'Quel canal ? E-mail, téléphone, rendez-vous…' }
      ],
      after: 'Espacez vos relances et variez les canaux.' },
      { target: '.fm-skin', title: 'Ce que vous apportez',
      items: [
        { symbol: 'sparkle', tone: 'blue', text: 'L’information utile que vous partagez.' },
        { symbol: 'target', tone: 'coral', text: 'L’action concrète que vous proposez.' }
      ],
      after: 'La zone d’écriture prend l’apparence du canal choisi : e-mail, appel, rendez-vous…' },
      { target: '.fm-side-col', title: 'Astuce et ressources',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: 'L’astuce rappelle la bonne pratique.' },
        { symbol: 'stack', tone: 'blue', text: '« Voir mes 5 ressources » ouvre des idées pour donner de la valeur à chaque relance.' }
      ] },
      { target: '.fm-step .fm-actions', title: 'Étape suivante',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: '« Étape suivante » passe à la relance d’après.' },
        { symbol: 'arrowLeft', tone: 'blue', text: '« Précédent » vous ramène en arrière.' },
        { symbol: 'checkCircle', tone: 'green', text: 'À la fin, vous découvrez le corrigé, étape par étape.' }
      ] }
    ],
    review: { when: 'when', channel: 'channel', written: ['value', 'next'], start: 3,
      symbols: { when: 'calendar', channel: 'mail', value: 'sparkle', next: 'arrowRight' } },
    skin: { field: 'channel', fields: ['value', 'next'], name: 'Madame Riveau', role: 'Responsable des ressources humaines', initials: 'MR', subject: 'Notre proposition du 3 juin' },
    side: { strong: 'Madame Riveau, responsable des ressources humaines d’une entreprise de 80 salariés.', info: 'Le 3 juin, vous lui avez envoyé une proposition : du mobilier ergonomique pour équiper 10 postes de travail, c’est-à-dire 10 salariés. Elle est intéressée, mais doit d’abord consulter sa direction. Depuis l’envoi de l’offre, elle n’a pas répondu.', symbol: 'calendar' },
    tip: 'Espacez vos relances : laissez un peu plus de temps entre chacune. Et apportez à chaque fois une information utile, pas seulement une demande de nouvelles.',
    fields: [
      { id: 'when', type: 'input', label: 'Quand ?', sub: 'Combien de jours après l’envoi de l’offre ?', placeholder: 'Ex. : J+3, soit trois jours après l’envoi', max: 40, half: true },
      { id: 'channel', type: 'select', label: 'Quel canal ?', sub: 'Par quel moyen contactez-vous Madame Riveau ?', placeholder: 'Choisir un canal', half: true, options: [
        { id: 'email', label: 'E-mail' }, { id: 'phone', label: 'Téléphone' }, { id: 'visit', label: 'Rendez-vous sur place' }, { id: 'linkedin', label: 'Message LinkedIn' }, { id: 'mail', label: 'Courrier' }
      ] },
      { id: 'value', label: 'Quelle valeur apportée ?', sub: 'Quelle information utile lui apportez-vous ?', placeholder: 'L’information utile à partager…', rows: 2, half: true },
      { id: 'next', label: 'Quel prochain pas ?', sub: 'Quelle action concrète lui proposez-vous ?', placeholder: 'Ex. : un échange de 15 minutes, un rendez-vous…', rows: 2, half: true }
    ],
    resources: [
      'Un témoignage d’une entreprise du même secteur.',
      'Des résultats observés chez certains clients après l’installation.',
      'La possibilité de proposer un diagnostic ergonomique.',
      'Une solution alternative de location du matériel.',
      'Votre disponibilité pour répondre aux questions ou ajuster la proposition.'
    ],
    resourcesLabel: 'Voir mes 5 ressources',
    resourcesTitle: 'Vos ressources, à mobiliser au choix',
    cases: [
      { tab: 'Relance 1', review: { subtitle: 'S’assurer de la bonne réception de l’offre.', days: [2, 5], whenOk: 'Quelques jours après l’envoi : assez tôt pour rester présent, sans presser.', whenTip: 'Pour une première relance, comptez deux à cinq jours après l’envoi.', channels: ['email'], channelWhy: 'Un e-mail convient pour une première relance : discret, il laisse le temps de répondre.', check: { value: 'Votre relance apporte-t-elle une information nouvelle et utile pour Madame Riveau, et pas seulement une demande de nouvelles ?', next: 'Votre prochain pas est-il concret : une action précise, une durée, une date ?' }, retain: ['Une première relance vérifie que l’offre est bien arrivée.', 'Elle propose d’aider : répondre aux questions, préciser un point.'] }, intro: 'Préparez votre première relance.', models: { when: 'J+3', channel: 'E-mail', value: 'S’assurer de la bonne réception ; proposer de répondre aux questions ou de préciser certains éléments de l’offre.', next: 'Un court échange, si nécessaire.' } },
      { tab: 'Relance 2', review: { subtitle: 'Le retour d’expérience pour renforcer votre crédibilité.', days: [7, 14], whenOk: 'Une semaine de plus : le temps laissé à la cliente s’allonge, c’est le bon rythme.', whenTip: 'Pour la deuxième relance, laissez passer une à deux semaines après l’envoi.', channels: ['phone'], channelWhy: 'Le téléphone crée un échange direct, utile après un premier e-mail resté sans réponse.', check: { value: 'Votre relance apporte-t-elle une information nouvelle et utile pour Madame Riveau, et pas seulement une demande de nouvelles ?', next: 'Votre prochain pas est-il concret : une action précise, une durée, une date ?' }, retain: ['Changer de canal relance l’attention.', 'Un retour d’expérience concret crée la confiance.', 'Proposez un prochain pas clair : une durée, un objectif, une date.'] }, intro: 'Préparez votre deuxième relance, un peu plus tard.', models: { when: 'J+10', channel: 'Téléphone', value: 'Le retour d’expérience d’une entreprise du même secteur ayant équipé ses postes.', next: 'Un échange de 15 minutes pour présenter les enseignements de cette expérience.' } },
      { tab: 'Relance 3', review: { subtitle: 'Lever le dernier frein avec une option concrète.', days: [15, 28], whenOk: 'Trois semaines environ : l’écart avec la relance précédente s’agrandit encore.', whenTip: 'Pour la troisième relance, comptez deux à quatre semaines après l’envoi.', channels: ['email', 'visit'], channelWhy: 'Un e-mail permet de joindre le diagnostic ou l’option de location ; un rendez-vous permet d’en parler de vive voix.', check: { value: 'Votre relance apporte-t-elle une information nouvelle et utile pour Madame Riveau, et pas seulement une demande de nouvelles ?', next: 'Votre prochain pas est-il concret : une action précise, une durée, une date ?' }, retain: ['Une option nouvelle (diagnostic, location) peut lever un frein de budget.', 'Chaque relance doit apporter quelque chose de neuf.'] }, intro: 'Préparez votre troisième relance, encore plus espacée.', models: { when: 'J+21', channel: 'E-mail', value: 'Un diagnostic ergonomique, ou l’option de location si le budget est un frein.', next: 'Un rendez-vous pour étudier l’option la plus adaptée.' } },
      { tab: 'Clôture', review: { subtitle: 'Clore la séquence sans fermer la relation.', days: [25, 45], whenOk: 'Environ un mois après l’envoi : il est temps de clore la séquence.', whenTip: 'Le message de clôture arrive en général un mois environ après l’envoi.', channels: ['email', 'mail'], channelWhy: 'Un message écrit laisse une trace et ferme la séquence avec courtoisie.', check: { value: 'Votre message ferme-t-il la séquence avec courtoisie, sans reproche ?', next: 'Laissez-vous la porte ouverte, par exemple en proposant de reprendre contact plus tard ?' }, retain: ['On arrête de relancer, mais on garde le lien.', 'Proposer de reprendre contact plus tard laisse la porte ouverte.'] }, intro: 'Préparez le dernier message, qui clôt la séquence.', models: { when: 'J+30', channel: 'E-mail', value: 'Clôturer la séquence sans fermer la relation.', next: 'Rester disponible et proposer de reprendre contact dans quelques mois.' },
        lesson: 'Message possible : « Sans retour de votre part, je suppose que ce projet n’est peut-être plus prioritaire pour le moment. Je vous propose donc de ne pas multiplier les relances. Je reste bien entendu disponible si le sujet revient à l’ordre du jour. Si vous le souhaitez, je pourrai également reprendre contact avec vous dans quelques mois. »' }
    ],
    nextLabel: 'Étape suivante',
    submitLabel: 'Valider ma stratégie',
    modelLabel: 'Corrigé modèle',
    keyPoint: 'Il n’existe pas une seule séquence parfaite : ce qui compte, c’est la cohérence de la stratégie. À retenir : un plan de relance n’est pas la répétition de la même demande ; il organise dans le temps des prises de contact qui apportent chacune une nouvelle valeur et une nouvelle occasion d’avancer. Pensez aussi à consigner vos actions et les retours dans votre outil de suivi.',
    feedback: 'Votre stratégie espace-t-elle les relances, varie-t-elle les canaux et apporte-t-elle du neuf à chaque étape ?'
  },

  /* ── 4.7 · À vous de créer votre modèle ! ───────────────────────────── */
  '4.7': {
    eyebrow: 'Exercice 4.7 · Relance',
    title: 'À vous de créer votre modèle !',
    subtitle: 'Écrivez une trame qui s’adapte à chaque client.',
    countLabel: 'parties',
    fieldSteps: true,
    tokens: ['[Prénom du client]', '[Date de la proposition]', '[Offre]', '[Ma signature]'],
    welcome: { title: 'Votre modèle de relance', rows: [
      ['target', 'Un modèle', 'C’est un e-mail de relance type, que vous réutilisez en l’adaptant à chaque client.'],
      ['list', 'Quatre parties', 'L’objet, le contexte, la valeur apportée, puis le prochain pas.'],
      ['pencil', 'Ce qui vous est demandé', 'Écrire chaque partie, dans l’ordre.']
    ] },
    tour: [
      { target: '.fs-nav', title: 'Quatre parties', text: 'Votre modèle se construit dans l’ordre d’un e-mail de relance.',
        items: [
          { symbol: 'lock', tone: 'blue', text: 'Une partie s’ouvre quand la précédente est remplie.' },
          { symbol: 'check', tone: 'green', text: 'Une partie remplie est cochée ; cliquez dessus pour y revenir.' }
        ] },
      { target: '.fm-tokens', title: 'Les champs à insérer', text: 'Ils rendent votre modèle réutilisable : chaque client aura son prénom, sa date et son offre.',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur un champ : il s’insère là où se trouve votre curseur.' }
        ],
        after: 'C’est facultatif : écrivez aussi en toutes lettres si vous préférez.' },
      { target: '.fs-step .fm-field', title: 'Votre texte', text: 'Rédigez la partie en cours, comme vous l’écririez au client.' },
      { target: '.fs-tip', title: 'Le conseil', text: 'Relisez-le avant de passer à la suite : il dit ce qui fait une bonne partie.' },
      { target: '.fs-panel .fm-actions .k-submit', title: 'Passer à l’étape suivante', text: 'Après la quatrième partie, votre modèle complet s’affiche avec le corrigé.' }
    ],
    cases: [
      { tab: 'Mon modèle', fields: [
        { id: 'subject', label: 'Objet', stepSub: 'Le sujet de la relance', symbol: 'document', intro: 'Indiquez le sujet de votre relance.', tip: 'L’objet doit être clair et inciter à l’ouverture.', placeholder: 'Objet de la relance…', rows: 3, max: 120, model: '[Projet / offre] : un point rapide' },
        { id: 'context', label: 'Contexte', stepSub: 'Rappeler l’échange précédent', symbol: 'chat', intro: 'Rappelez l’offre ou l’échange précédent.', tip: 'Une phrase suffit : le client doit se souvenir tout de suite de quoi vous parlez.', placeholder: 'Rappeler l’offre ou l’échange précédent…', rows: 4, model: 'Bonjour [Prénom], je reviens vers vous au sujet de [offre / proposition / projet], que je vous ai adressé(e) le [date].' },
        { id: 'value', label: 'Valeur', stepSub: 'Apporter une information utile', symbol: 'sparkle', intro: 'Apportez une information nouvelle ou utile.', tip: 'Donnez au client une vraie raison de répondre : un retour d’expérience, une donnée, une option nouvelle.', placeholder: 'Apporter une information nouvelle ou utile…', rows: 4, model: 'Depuis notre dernier échange, [élément de valeur : retour d’expérience d’un client, nouvelle information, option complémentaire, donnée utile, évolution de l’offre]. Je souhaitais vous en faire part car [lien avec le besoin ou l’enjeu du client].' },
        { id: 'next', label: 'Prochain pas', stepSub: 'Proposer une action concrète', symbol: 'target', intro: 'Proposez une action simple et concrète.', tip: 'Proposez deux créneaux précis : il est plus facile de choisir que d’inventer.', placeholder: 'Proposer une action simple et concrète…', rows: 4, model: 'Pour avancer, je vous propose [prochain pas : un échange de 15 minutes, une démonstration, un diagnostic, l’envoi d’un complément d’information]. Seriez-vous disponible [créneau A] ou [créneau B] ? Bien à vous, [Prénom, signature]' }
      ] }
    ],
    keyPoint: 'À retenir : un modèle de relance est une trame, pas un copier-coller. Sa structure peut rester la même, mais le contexte, la valeur apportée et le prochain pas doivent être personnalisés pour donner au client une vraie raison de répondre.',
    submitLabel: 'Enregistrer mon modèle',
    feedback: 'Votre modèle se réutilise-t-il tel quel, en ne changeant que les champs entre crochets ?'
  }
};
