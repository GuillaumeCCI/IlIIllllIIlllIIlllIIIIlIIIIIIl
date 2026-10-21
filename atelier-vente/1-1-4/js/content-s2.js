/* SÉRIE 2 · DÉFENDRE LE PRIX · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Ce qu'elles ne montrent pas
 * (affirmations 2 à 6, répliques b à e) et les corrigés viennent de la fiche
 * « Activités supplémentaires SCORM 2 » (M1.1.4), transposée au vouvoiement.
 * Les cinq leviers de défense servent à 2.2 et 2.7.
 */
window.ATELIER_LEVERS = [
  { id: 'creuser', label: 'Creuser l’objection', short: 'Creuser l’objection', symbol: 'chat' },
  { id: 'valeur', label: 'Rappeler la valeur et ce que le prix comprend', short: 'Rappeler la valeur', symbol: 'award' },
  { id: 'usage', label: 'Ramener le prix à l’usage', short: 'Prix à l’usage', symbol: 'chart' },
  { id: 'inaction', label: 'Mettre en perspective le coût de l’inaction', short: 'Coût de l’inaction', symbol: 'clock' },
  { id: 'comparer', label: 'Comparer à périmètre égal', short: 'Comparer', symbol: 'scales' }
];

window.ATELIER_S2 = {
  /* ── 2.1 · Défendre son prix sans le brader ─────────────────────────── */
  '2.1': {
    eyebrow: 'Vrai ou faux',
    title: 'Défendre son prix sans le brader',
    context: {
      situation: 'Votre client trouve votre offre trop chère et vous demande de faire un effort.',
      read: '6 affirmations sur la façon de défendre votre prix.',
      choose: 'Pour chacune, dites si elle est vraie ou fausse.'
    },
    subtitle: 'Six pratiques à examiner. À vous de trancher.',
    cardLabel: 'Affirmation',
    cardsLabel: 'affirmations',
    question: 'Votre verdict',
    zones: window.ATELIER_TRUE_FALSE,
    confirmLabel: 'Valider et passer à la suivante',
    cards: [
      { text: 'Accorder une remise dès la première objection permet de montrer sa souplesse commerciale.', answer: 'F', why: 'On évite d’accorder immédiatement une remise : céder tout de suite fait douter de la justesse du prix.' },
      { text: 'Demander « Par rapport à quoi trouvez-vous le prix élevé ? » permet de mieux comprendre ce qui se cache derrière l’objection.', answer: 'V', why: 'Défendre son prix, c’est d’abord comprendre l’objection.' },
      { text: 'Ramener un prix à un coût par jour, par poste ou par usage peut aider à le mettre en perspective.', answer: 'V', why: 'Un montant rapporté à l’usage devient concret et comparable.' },
      { text: 'Pour défendre son prix, il faut avant tout expliquer au client pourquoi nos propres coûts sont élevés.', answer: 'F', why: 'On évite de se justifier : les coûts de l’entreprise ne disent rien de la valeur pour le client.' },
      { text: 'Rappeler ce que le prix comprend (garantie, installation, SAV…) permet de remettre en avant la valeur de l’offre.', answer: 'V', why: 'On rend visible la valeur de l’offre.' },
      { text: 'Défendre son prix signifie refuser toute discussion sur le tarif.', answer: 'F', why: 'Défendre son prix, ce n’est pas se braquer : on écoute, on comprend, puis on valorise.' }
    ],
    keyPoint: 'À retenir : défendre son prix, c’est d’abord comprendre l’objection, puis rendre la valeur de l’offre visible. On évite de se justifier, de se braquer ou d’accorder immédiatement une remise.'
  },

  /* ── 2.2 · Quel levier se cache dans cette réponse ? ────────────────── */
  '2.2': {
    eyebrow: 'Négociation · Prix',
    title: 'Quel levier se cache dans cette réponse ?',
    tour: [
      { target: '.mt-card', title: 'La réplique', text: 'Voici une réponse d’un vendeur à une objection sur le prix. Quel levier utilise-t-il ?' },
      { target: '.mt-zones', title: 'La boîte à leviers',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur le levier qui correspond à la réplique.' },
          { symbol: 'grip', tone: 'blue', text: 'Ou faites glisser la réplique sur le levier.' }
        ],
        after: 'Chaque levier ne s’utilise qu’une fois.' },
      { target: '.mt-page .k-count, .mt-dots', title: 'Les 5 répliques', text: 'La réplique suivante s’affiche d’elle-même. Les pastilles a à e permettent de revenir sur une réplique.' },
      { target: '.mt-page .k-bar', title: 'Vérifier', text: 'Les 5 répliques associées, vérifiez vos associations pour voir le corrigé.' }
    ],
    subtitle: 'Associez les 5 répliques aux 5 leviers de défense.',
    cardLabel: 'Réplique',
    cardsLabel: 'répliques',
    zoneTitle: 'Boîte à leviers',
    zoneHelp: 'Choisissez le levier correspondant à la réplique.',
    zoneNoun: 'levier',
    zones: window.ATELIER_LEVERS.map(l => ({ label: l.label })),
    cards: [
      { text: 'Ramené à sa durée d’utilisation, cela représente moins de 40 centimes par jour.', answer: 2, why: 'Le prix est rapporté à l’usage.' },
      { text: 'Par rapport à quoi trouvez-vous le prix élevé ?', answer: 0, why: 'Une question pour comprendre la référence du client.' },
      { text: 'Comparons les deux offres sur le même périmètre : l’installation et la garantie sont-elles également incluses dans l’offre concurrente ?', answer: 4, why: 'On vérifie que les deux offres couvrent le même périmètre.' },
      { text: 'Ce tarif comprend la garantie 5 ans, la livraison, l’installation et le SAV.', answer: 1, why: 'On rappelle tout ce que le prix contient.' },
      { text: 'Au-delà du prix de l’équipement, regardons aussi ce que peuvent coûter l’inconfort, les absences ou la désorganisation qu’ils peuvent entraîner.', answer: 3, why: 'On met en regard ce que coûte le statu quo.' }
    ],
    keyPoint: 'À retenir : face à une objection sur le prix, il n’existe pas une réponse unique. L’enjeu est de choisir le levier adapté à ce que le client exprime.'
  },

  /* ── 2.3 · Le prix, remis à l'échelle ───────────────────────────────── */
  '2.3': {
    eyebrow: 'Négociation · Prix',
    title: 'Le prix, remis à l’échelle',
    subtitle: 'Transformez un repère de calcul en argument utile au client.',
    countLabel: 'formulations',
    caseNoun: 'Offre',
    pills: true,
    // L'auto-évaluation, une fois les 2 formulations écrites.
    selfCheck: {
      title: 'Relisez vos 2 formulations',
      question: 'Chacune de vos formulations contient-elle ces trois éléments ?',
      rows: [
        { title: 'Prix total visible', text: 'Le prix total reste dit clairement, il n’est pas caché derrière le calcul.' },
        { title: 'Repère juste', text: 'Le repère de calcul est cité sans erreur.' },
        { title: 'Valeur concrète', text: 'Le chiffre est relié à ce que le client vit au quotidien.' }
      ]
    },
    tour: [
      { target: '.fm-tabs', title: 'Deux offres', text: 'Une formulation par offre : le siège, puis le pack de 10 postes.',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une offre pour passer de l’une à l’autre.' },
          { symbol: 'check', tone: 'green', text: 'Une offre terminée est cochée.' }
        ] },
      { target: '.fm-scene', title: 'Le repère de calcul', text: 'L’affiche donne le prix de l’offre et le calcul qui le remet à l’échelle.' },
      { target: '.fm-main .fm-field', title: 'Votre formulation', text: 'Écrivez ce que vous diriez au client pour relier ce coût à une valeur concrète.' },
      { target: '.fm-actions .k-dialog-button', title: 'Un repère', text: 'Un doute ? Ce bouton rappelle ce que la formulation doit contenir.' },
      { target: '.fm-tab.is-self', title: 'L’auto-évaluation', text: 'Après les 2 offres, vous relisez vos formulations et vous les évaluez.',
        items: [
          { symbol: 'checkCircle', tone: 'green', text: 'Le corrigé s’affiche ensuite.' }
        ] }
    ],
    fields: [{ id: 'text', label: 'Votre formulation', sub: 'Comment reliez-vous ce coût à un usage ou à une valeur concrète pour le client ?', placeholder: 'Ce que vous diriez au client…', rows: 5 }],
    hint: 'Gardez le prix total visible, citez le repère sans erreur, puis reliez-le à ce que le client vit au quotidien.',
    cases: [
      { tab: 'Siège ergonomique', tabSub: '690 €', scene: { image: 'assets/illustrations/s2/1-1-4-S2-i2-3-A.png', alt: 'Offre 1, siège ergonomique à 690 € : sur 5 ans, environ 0,38 € par jour.' },
        models: { text: 'Sur 5 ans d’utilisation, l’investissement représente environ 38 centimes par jour pour un équipement conçu pour améliorer le confort au poste de travail.' } },
      { tab: 'Pack de 10 postes', tabSub: '17 000 €', scene: { image: 'assets/illustrations/s2/1-1-4-S2-i2-3-B.png', alt: 'Offre 2, pack de 10 postes à 17 000 € : 1 700 € par poste.' },
        models: { text: 'Cela représente 1 700 € par poste, avec l’installation et la garantie comprises. Le client peut ainsi comparer le prix avec le périmètre réel de la solution proposée.' } }
    ],
    keyPoint: 'À retenir : décomposer le prix ne consiste pas seulement à faire un calcul. Il faut ensuite relier ce chiffre à une valeur concrète pour le client.',
    nextLabel: 'Enregistrer et passer à l’offre 2',
    submitLabel: 'Valider mes formulations',
    feedback: 'Vos formulations gardent-elles le prix total visible, avec un repère juste et une valeur concrète ?'
  },

  /* ── 2.4 · Quatre faux pas face au prix ─────────────────────────────── */
  '2.4': {
    eyebrow: 'Coach commercial',
    title: 'Quatre faux pas face au prix',
    subtitle: 'Repérez les erreurs du commercial dans sa réponse.',
    client: 'C’est trop cher.',
    passages: [
      { text: 'C’est pas si cher !', error: 'Il contredit immédiatement le client : la discussion se ferme au lieu de chercher ce que signifie « trop cher ».' },
      { text: 'Bon, écoutez, je vous fais -15 %', error: 'Il accorde immédiatement une remise : l’échange bascule trop vite dans la négociation et la valeur perçue s’affaiblit.' },
      { text: 'et on n’en parle plus.', error: 'Il ne cherche pas à comprendre l’objection : aucune question n’est posée, aucun élément de valeur n’est remis en perspective.' },
      { text: 'De toute façon, on est obligés d’être à ce prix, nos coûts sont élevés.', error: 'Il justifie le prix par ses propres contraintes : les coûts de l’entreprise n’expliquent pas la valeur apportée au client.' }
    ],
    keyPoint: 'À retenir : face à « c’est trop cher », le premier réflexe n’est pas de se défendre, mais de comprendre.',
        hint: 'Regardez comment le commercial accueille la remarque, ce qu’il cède, comment il conclut, et sur quoi il justifie son prix.'
  },

  /* ── 2.5 · Deux réponses. Laquelle tient la route ? ─────────────────── */
  '2.5': {
    eyebrow: 'Exercice 2.5 · Évaluer',
    title: 'Deux réponses. Laquelle tient la route ?',
    subtitle: 'Lisez les deux propositions et choisissez celle qui vous semble la plus pertinente.',
    speaker: 'Client',
    quote: 'Votre offre est plus chère que celle de votre concurrent.',
    options: [
      { id: '1', label: 'Réponse 01', text: 'Je comprends. Notre tarif est plus élevé parce que nous proposons une garantie de 5 ans et un SAV sous 48 h.',
        analysis: ['Contient déjà un élément intéressant de valorisation.', 'Suppose immédiatement que l’écart est justifié par la garantie et le SAV.', 'Ne vérifie pas ce que comprend l’offre concurrente.'] },
      { id: '2', label: 'Réponse 02', text: 'C’est possible. Avant de comparer les prix, regardons si les deux offres couvrent le même périmètre : étude ergonomique, installation, garantie et SAV. Nous pourrons ensuite regarder précisément d’où vient l’écart.',
        analysis: ['Ne nie pas l’écart de prix et ne dénigre pas le concurrent.', 'Propose de vérifier les éléments comparés avant de justifier l’écart.', 'Prépare la valorisation des différences réellement constatées.'] }
    ],
    answer: '2',
    whyLabel: 'Défendez votre choix',
    whyHelp: 'Appuyez-vous sur au moins deux critères : reconnaissance de l’écart, respect du concurrent, vérification du périmètre comparé, valorisation des différences.',
    criteriaFields: 2,
    hint: 'Avant de justifier un écart, vérifiez que les deux offres sont comparables.',
    // Visite en deux temps : le choix, puis (`later`) le cadre qui s'ouvre après le choix.
    tour: [
      { target: '.client-card', title: 'L’objection du client', text: 'Gardez-la en tête : la bonne réponse est celle qui la traite sans nier l’écart ni dénigrer le concurrent.' },
      { target: '.cmp-options', title: 'Deux réponses possibles',
        items: [
          { symbol: 'chat', tone: 'blue', text: 'Lisez les deux réponses en entier.' },
          { symbol: 'pointer', tone: 'green', text: 'Cliquez sur « Je choisis cette réponse » sous la plus pertinente.' }
        ],
        after: 'Un cadre s’ouvre ensuite pour défendre votre choix.' },
      { later: true, target: '.cmp-why-head', title: 'Défendez votre choix', text: 'Appuyez-vous sur au moins deux de ces critères :',
        items: [
          { key: '1', tone: 'blue', text: 'reconnaître l’écart de prix ;' },
          { key: '2', tone: 'coral', text: 'respecter le concurrent ;' },
          { key: '3', tone: 'gold', text: 'vérifier le périmètre comparé ;' },
          { key: '4', tone: 'green', text: 'valoriser les différences.' }
        ] },
      { later: true, target: '.cmp-fields', title: 'Vos deux critères', text: 'Un critère par champ : nommez-le, puis dites en quoi la réponse choisie le respecte.' },
      { later: true, target: '.cmp-why-row', title: 'Repère et validation',
        items: [
          { symbol: 'book', tone: 'gold', text: '« Voir un repère » donne une piste.' },
          { symbol: 'arrowRight', tone: 'blue', text: '« Valider mon analyse » affiche l’analyse des deux réponses et le corrigé.' }
        ] }
    ],
    model: 'La réponse 2 est la plus complète. Elle ne nie pas l’écart de prix et ne dénigre pas le concurrent ; surtout, elle propose de vérifier les éléments comparés avant de justifier l’écart, puis de valoriser les différences réellement constatées. La réponse 1 valorise déjà, mais suppose que l’écart est justifié sans vérifier ce que comprend l’offre concurrente. À retenir : avant de défendre un écart de prix, vérifiez que vous comparez réellement des offres équivalentes.'
  },

  /* ── 2.6 · Votre kit de défense du prix ───────────────────────────────── */
  '2.6': {
    eyebrow: 'Exercice 2.6 · S’entraîner',
    title: 'Votre kit de défense du prix',
    subtitle: '3 objections. 3 réponses prêtes pour le rendez-vous.',
    countLabel: 'réponses prêtes',
    caseNoun: 'Objection',
    pills: true,
    // L'auto-évaluation, une fois les 3 réponses écrites.
    selfCheck: {
      title: 'Relisez vos 3 réponses',
      question: 'Chacune de vos réponses fait-elle ces trois choses ?',
      rows: [
        { title: 'Je creuse le frein', text: 'Je pose une question pour comprendre ce qui fait dire au client que c’est cher.' },
        { title: 'Je valorise l’offre', text: 'Je rappelle un ou deux faits concrets de l’offre.' },
        { title: 'Sans remise immédiate', text: 'Je ne propose aucune remise à ce stade.' }
      ]
    },
    tour: [
      { target: '.fm-tabs', title: 'Trois objections', text: 'Une réponse par objection du client.',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une objection pour passer de l’une à l’autre.' },
          { symbol: 'check', tone: 'green', text: 'Une objection traitée est cochée.' }
        ] },
      { target: '.fm-scene', title: 'L’objection du client', text: 'Avant de valoriser l’offre, votre réponse cherche ce qui se cache derrière cette phrase.' },
      { target: '.fm-main .fm-field', title: 'Votre réponse', text: 'Écrivez ce que vous diriez au client, comme si vous lui parliez.' },
      { target: '.fm-actions .k-dialog-button', title: 'Un repère', text: 'Un doute ? Ce bouton rappelle la marche à suivre.' },
      { target: '.fm-tab.is-self', title: 'L’auto-évaluation', text: 'Après les 3 objections, vous relisez vos réponses et vous les évaluez.',
        items: [
          { symbol: 'checkCircle', tone: 'green', text: 'Le corrigé s’affiche ensuite.' }
        ] }
    ],
    fields: [{ id: 'text', label: 'Votre réponse en rendez-vous', sub: 'En 2 à 3 phrases : comprenez le frein, puis valorisez l’offre.', placeholder: 'Je comprends votre remarque…', rows: 5 }],
    hint: 'Une question pour comprendre la référence du client, puis un ou deux faits concrets de l’offre. Pas de remise à ce stade.',
    cases: [
      { tab: 'Trop cher', scene: { quote: 'C’est trop cher.' },
        models: { text: 'Je comprends. Qu’est-ce qui vous fait dire que le prix est trop élevé ? Regardons ce qui est important pour vous et ce que notre offre comprend.' } },
      { tab: 'Moins cher ailleurs', scene: { quote: 'J’ai trouvé moins cher ailleurs.' },
        models: { text: 'C’est possible. Regardons si nous comparons exactement le même périmètre : installation, garantie, SAV… Cela nous permettra de comprendre précisément l’écart.' } },
      { tab: 'Vaut-il 17 000 € ?', scene: { quote: 'Je ne suis pas sûr que cela vaille 17 000 €.' },
        models: { text: 'Regardons ce que représentent ces 17 000 € : 10 postes équipés, soit 1 700 € par poste, avec l’installation et la garantie comprises. L’enjeu est de vérifier si cette solution répond suffisamment à vos priorités pour justifier cet investissement.' } }
    ],
    keyPoint: 'À retenir : une objection sur le prix n’appelle pas une réponse automatique. On écoute, on questionne, on choisit son levier, on valorise.',
    nextLabel: 'Objection suivante',
    submitLabel: 'Valider mon kit',
    lock: 'Corrigé disponible après les 3 objections',
    feedback: 'Chaque réponse creuse-t-elle le frein et valorise-t-elle l’offre, sans remise immédiate ?'
  },

  /* ── 2.7 · Défendre la valeur, sans brader le prix ──────────────────── */
  '2.7': {
    eyebrow: 'Exercice 2.7 · Argumenter',
    title: 'Défendre la valeur, sans brader le prix',
    subtitle: 'Pack Ergolys · 10 postes · 17 000 €',
    tour: [
      { target: '.fm-scene', title: 'L’objection du client', text: 'Repérez son vrai frein : il doit convaincre sa direction. Votre réponse doit lui en donner les moyens.' },
      { target: '.fm-chips', title: 'Vos leviers',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur les leviers qui servent votre réponse.' },
          { symbol: 'check', tone: 'green', text: 'Inutile de tous les utiliser.' }
        ] },
      { target: '.fm-main .fm-field:has(textarea)', title: 'Votre réponse', text: 'Écrivez ce que vous diriez au client, en vous appuyant sur vos leviers, sans baisser le prix.' },
      { target: '.fm-actions .k-submit', title: 'Vérifier ma réponse', text: 'Le corrigé s’affiche ensuite, avec une réponse possible.' }
    ],
    scene: [
      { quote: '17 000 € pour équiper 10 postes ? Je trouve ça vraiment élevé. Je vais avoir du mal à justifier un tel investissement auprès de ma direction.', speaker: 'Client · Responsable informatique' },
      { info: 'Votre mission : construisez la réponse que vous diriez au client.', symbol: 'target' }
    ],
    cases: [
      { tab: 'Ma réponse', fields: [
        { id: 'levers', type: 'chips', label: 'Choisissez vos leviers', sub: 'Prenez ceux qui servent votre réponse ; inutile de tous les utiliser.', chipNoun: 'levier',
          options: window.ATELIER_LEVERS.map(l => ({ id: l.id, label: l.short, symbol: l.symbol })).concat({ id: 'rassurer', label: 'Rassurer', symbol: 'shield' }) },
        { id: 'text', label: 'Ma réponse au client', placeholder: 'Ce que vous diriez au client…', rows: 5,
          model: 'Je comprends. Quand vous dites que ce sera difficile à justifier, est-ce surtout le montant global qui vous pose question, ou le retour que votre direction peut en attendre ? Le pack représente 1 700 € par poste, installation et garantie comprises. On peut regarder ensemble les enjeux prioritaires pour vos équipes et les mettre en regard de l’investissement, afin que vous disposiez d’éléments concrets pour votre direction.' }
      ] }
    ],
    submitLabel: 'Vérifier ma réponse',
    keyPoint: 'À retenir : défendre son prix ne consiste pas à réciter tous ses arguments. Il s’agit de comprendre ce qui bloque, de sélectionner les bons leviers et de rendre la valeur visible sans surpromettre, ni inventer de chiffres ou de résultats.',
    feedback: 'Votre réponse donne-t-elle au client de quoi convaincre sa direction, sans baisser le prix ?'
  }
};
