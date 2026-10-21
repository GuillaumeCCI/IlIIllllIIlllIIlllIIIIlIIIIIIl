/* SÉRIE 1 · ANNONCER LE PRIX · contenus éditables.
 *
 * Les textes visibles sur les maquettes sont repris tels quels. Ce qu'elles
 * ne montrent pas (affirmations 2 à 6) et les corrigés viennent de la fiche
 * « Activités supplémentaires SCORM 1 » (M1.1.4), transposée au vouvoiement.
 * Fil rouge : Ergolys, siège à 690 €, poste complet à 1 900 €, pack de
 * 10 postes à 17 000 €.
 */

/* Les deux réponses des « vrai ou faux », communes à plusieurs séries. */
window.ATELIER_TRUE_FALSE = [
  { id: 'V', letter: 'V', label: 'Vrai', tone: 'good' },
  { id: 'F', letter: 'F', label: 'Faux', tone: 'bad' }
];

window.ATELIER_S1 = {
  /* ── 1.1 · L'art d'annoncer le prix ─────────────────────────────────── */
  '1.1': {
    eyebrow: 'Entretien de vente',
    title: 'L’art d’annoncer le prix',
    context: {
      situation: 'Vous préparez le moment où vous annoncerez votre prix au client.',
      read: '6 affirmations sur la façon d’annoncer un prix.',
      choose: 'Pour chacune, dites si elle est vraie ou fausse.'
    },
    subtitle: 'Six affirmations. À vous de trancher.',
    cardLabel: 'Affirmation',
    cardsLabel: 'affirmations',
    symbol: 'tag',
    question: 'Votre verdict',
    zones: window.ATELIER_TRUE_FALSE,
    cards: [
      { text: 'Il est préférable d’annoncer le prix dès le début de l’échange pour « qualifier » le client.', answer: 'F', why: 'On fait d’abord percevoir la valeur de l’offre, puis on annonce le prix.' },
      { text: 'La méthode « sandwich » consiste à présenter le prix entre deux éléments qui valorisent les bénéfices de l’offre.', answer: 'V', why: 'Bénéfice, prix, réassurance : le prix est relié aux bénéfices apportés.' },
      { text: 'Après avoir annoncé le prix, il vaut mieux reprendre immédiatement la parole pour éviter un silence.', answer: 'F', why: 'On laisse au client le temps de réagir : le silence fait aussi partie de l’échange.' },
      { text: 'S’excuser ou se justifier au moment d’annoncer le prix permet de rassurer le client.', answer: 'F', why: 'Le prix s’annonce clairement et sans s’excuser : l’excuse fragilise l’annonce.' },
      { text: 'Présenter le prix sous la forme d’un coût par jour peut aider le client à le mettre en perspective.', answer: 'V', why: 'Rapporté à l’usage, le montant devient plus concret pour le client.' },
      { text: 'Le prix doit être annoncé clairement, d’une voix calme et assurée.', answer: 'V', why: 'L’assurance de la voix montre que le prix est juste et assumé.' }
    ],
    keyPoint: 'À retenir : d’abord, faites percevoir la valeur de l’offre. Puis annoncez le prix clairement et sans vous excuser, en le reliant aux bénéfices apportés. Enfin, laissez au client le temps de réagir : le silence fait aussi partie de l’échange.'
  },

  /* ── 1.2 · La méthode sandwich ──────────────────────────────────────── */
  '1.2': {
    eyebrow: 'Entretien de vente',
    title: 'La méthode sandwich',
    subtitle: 'Repérez les 3 temps dans la réplique.',
    markers: [
      { id: 'benefice', label: 'Bénéfice', tone: 'blue' },
      { id: 'prix', label: 'Prix', tone: 'gold' },
      { id: 'reassurance', label: 'Réassurance', tone: 'green' }
    ],
    // La réplique, découpée en passages ; `part` donne le temps attendu.
    passages: [
      { text: 'Avec ce siège, vos collaborateurs gagnent en confort et vous réduisez les arrêts liés au dos.', part: 'benefice' },
      { text: 'L’investissement est de 690 €.', part: 'prix' },
      { text: 'Et vous êtes couvert 5 ans, pièces et main-d’œuvre.', part: 'reassurance' }
    ],
    explanations: {
      benefice: 'On ouvre sur ce que le client gagne : le confort et moins d’arrêts.',
      prix: 'Le prix, net et sans excuse, au milieu.',
      reassurance: 'On referme sur une garantie qui sécurise la décision.'
    },
    keyPoint: 'À retenir : pour annoncer un prix avec la méthode sandwich, je valorise, j’annonce, je rassure.'
  },

  /* ── 1.4 · Le prix arrive trop tôt ──────────────────────────────────── */
  '1.4': {
    eyebrow: 'Mise en situation · Prix',
    title: 'Le prix arrive trop tôt',
    subtitle: 'Mettez la scène sur pause, puis rejouez votre réplique.',
    countLabel: 'étapes',
    tour: [
      { target: '.fm-scene', title: 'La scène sur pause', text: 'Dès le début du rendez-vous, le client demande le prix, et le commercial l’annonce aussitôt. La scène s’arrête là.' },
      { target: '.fm-main > div.fm-field:nth-of-type(1)', title: '1 · Diagnostiquer', text: 'Quel risque prend le commercial en donnant le prix si tôt ? Écrivez votre analyse.' },
      { target: '.fm-main > div.fm-field:nth-of-type(2)', title: '2 · Rejouer', text: 'Écrivez ce que vous répondriez au client à la place du commercial, comme si vous lui parliez.' },
      { target: '.fm-actions', title: 'Repère et test',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: 'Un doute ? « Voir un repère » vous oriente.' },
        { symbol: 'checkCircle', tone: 'green', text: '« Tester ma nouvelle réponse » affiche le corrigé.' }
      ] }
    ],
    scene: [
      { info: 'Début du rendez-vous. Pause : le prix vient d’être annoncé.', symbol: 'pauseCircle' },
      { dialogue: [
        { who: 'client', text: 'Bon, on va gagner du temps : ça coûte combien votre truc ?' },
        { who: 'seller', text: 'Le pack pour 10 postes, c’est 17 000 €.', mark: '17 000 €' }
      ] }
    ],
    hint: 'Répondez à la question sans perdre la possibilité de comprendre le besoin : donnez un ordre d’idée, puis posez une question pour ajuster.',
    cases: [
      { tab: 'Diagnostiquer et rejouer', fields: [
        { id: 'risk', label: '1 · Diagnostiquer', sub: 'Quel risque prend le commercial ?', placeholder: 'Votre analyse…', rows: 4,
          model: 'Le prix est annoncé avant que le commercial ait pu comprendre le besoin et faire percevoir la valeur de l’offre. Présenté seul, le montant de 17 000 € risque de devenir le principal point de comparaison pour le client.' },
        { id: 'replay', label: '2 · Rejouer', sub: 'Que répondriez-vous au client ?', placeholder: 'Votre nouvelle réplique…', rows: 4,
          model: 'Bien sûr, je vais vous donner le prix. Pour vous donner un montant adapté et vous expliquer ce qu’il comprend, j’ai juste besoin de vous poser deux ou trois questions sur vos postes et vos besoins.' }
      ], lesson: 'Il ne s’agit pas d’esquiver la question : on l’accueille, puis on propose de clarifier rapidement le besoin avant d’annoncer le prix et ce qu’il comprend.' }
    ],
    keyPoint: 'À retenir : quand le prix est demandé très tôt, ne pas esquiver, mais éviter d’annoncer un prix « nu ». D’abord comprendre et donner de la valeur, puis annoncer le prix.',
    submitLabel: 'Tester ma nouvelle réponse',
    feedback: 'Votre réplique répond-elle à la question tout en ouvrant sur le besoin ?'
  },

  /* ── 1.5 · Le duel des annonces ─────────────────────────────────────── */
  '1.5': {
    eyebrow: 'Entretien de vente',
    title: 'Le duel des annonces',
    subtitle: 'Même prix. Deux façons de le présenter.',
    badge: '690 € dans les deux cas',
    tour: [
      { target: '.cmp-options', title: 'Deux annonces, un même prix', text: 'Le même siège, au même prix : seule la façon de l’annoncer change.',
        items: [
          { symbol: 'chat', tone: 'blue', text: 'Lisez les deux annonces en entier.' },
          { symbol: 'pointer', tone: 'green', text: 'Cliquez sur « Choisir cette annonce » sous la plus efficace.' }
        ] },
      { target: '.cmp-why', show: '.cmp-why', title: 'Votre verdict', wide: true,
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Ce cadre apparaît dès que vous avez choisi une annonce.' },
          { symbol: 'list', tone: 'blue', text: 'Cochez au moins deux critères : posture, structure, vocabulaire, clarté.' },
          { symbol: 'pencil', tone: 'gold', text: 'Expliquez en quelques mots pourquoi cette annonce est plus efficace.' },
          { symbol: 'arrowRight', tone: 'green', text: '« Valider mon analyse » affiche l’analyse des deux annonces et le corrigé.' }
        ] }
    ],
    options: [
      { id: '1', label: 'Annonce 1', text: 'Alors… c’est 690 € le siège. C’est un peu cher, je sais, mais bon.',
        analysis: ['Posture hésitante : « Alors… », « mais bon ».', 'Le commercial qualifie lui-même son prix de cher.', 'Aucun bénéfice, aucune réassurance : le prix est nu.'] },
      { id: '2', label: 'Annonce 2', text: 'Ce siège soulage le dos et s’adapte à chaque morphologie. Il est à 690 €, avec une garantie de 5 ans incluse.',
        analysis: ['Structure sandwich : bénéfice, prix, réassurance.', 'Vocabulaire positif et concret.', 'Prix annoncé clairement, sans excuse.'] }
    ],
    answer: '2',
    chooseLabel: 'Choisir cette annonce',
    whyLabel: 'Votre verdict',
    whyHelp: 'Appuyez votre choix sur au moins deux critères.',
    criteria: [
      { id: 'posture', label: 'Posture', symbol: 'users' },
      { id: 'structure', label: 'Structure', symbol: 'stack' },
      { id: 'vocabulaire', label: 'Vocabulaire', symbol: 'chat' },
      { id: 'clarte', label: 'Clarté', symbol: 'lightbulb' }
    ],
    whyPlaceholder: 'Expliquez pourquoi cette annonce vous paraît plus efficace…',
    hint: 'Comparez la posture (assurance ou hésitation), la structure (bénéfice, prix, réassurance), les mots choisis et la clarté du chiffre.',
    model: 'L’annonce 2 présente d’abord les bénéfices, annonce ensuite le prix clairement et sans s’excuser, puis termine par un élément de réassurance, la garantie de 5 ans. Dans l’annonce 1, le commercial qualifie lui-même le prix de « cher » et montre son hésitation : il fragilise son annonce avant même que le client ait réagi. Le prix est identique, mais la manière de l’annoncer influence la façon dont sa valeur est perçue.'
  },

  /* ── 1.7 · Ma banque d'annonces ─────────────────────────────────────── */
  '1.7': {
    eyebrow: 'Exercice 1.7',
    title: 'Ma banque d’annonces',
    subtitle: 'Créez trois formulations que vous pourrez reprendre en rendez-vous.',
    countLabel: 'cartes prêtes',
    caseNoun: 'Carte',
    pills: true,
    // L'auto-évaluation, une fois les 3 cartes écrites.
    selfCheck: {
      title: 'Relisez vos 3 annonces',
      question: 'Chacune de vos annonces suit-elle ces trois temps ?',
      rows: [
        { title: 'Bénéfice', text: 'Elle commence par un bénéfice concret pour le client.' },
        { title: 'Prix', text: 'Elle annonce le prix clairement, sans hésitation ni excuse.' },
        { title: 'Réassurance', text: 'Elle se termine par une garantie ou un service inclus.' }
      ]
    },
    tour: [
      { target: '.fm-tabs', title: 'Trois annonces à créer', text: 'Une carte par offre : siège, poste complet, pack de 10 postes.',
        items: [
          { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une carte pour passer de l’une à l’autre.' },
          { symbol: 'check', tone: 'green', text: 'Une carte terminée est cochée.' }
        ] },
      { target: '.fm-main .fm-field', title: 'Votre annonce', text: 'Rédigez l’annonce complète, telle que vous la diriez au client.',
        items: [
          { key: '1', tone: 'blue', text: 'un bénéfice ;' },
          { key: '2', tone: 'coral', text: 'le prix ;' },
          { key: '3', tone: 'green', text: 'une réassurance.' }
        ] },
      { target: '.fm-actions .k-dialog-button', title: 'Repère et éléments de l’offre',
        items: [
          { symbol: 'lightbulb', tone: 'gold', text: '« Voir un repère » rappelle la marche à suivre.' },
          { symbol: 'stack', tone: 'blue', text: '« Consulter les éléments de l’offre » donne les prix, garanties et services.' }
        ] },
      { target: '.fm-tab.is-self', title: 'L’auto-évaluation', text: 'Après les 3 cartes, vous relisez vos annonces et vous les évaluez.',
        items: [
          { symbol: 'checkCircle', tone: 'green', text: 'Le corrigé modèle s’affiche ensuite.' }
        ] }
    ],
    fields: [{ id: 'text', label: 'Votre annonce', placeholder: 'Rédigez ici l’annonce complète, telle que vous la diriez au client…', rows: 6, max: 600 }],
    hint: 'Une formulation naturelle, claire et prête à être prononcée : un bénéfice concret, le prix sans hésitation, puis une garantie ou un service inclus.',
    resources: [
      'Siège ergonomique : 690 €, réglable en 6 points, garantie 5 ans.',
      'Poste complet : 1 900 € (siège, bureau assis-debout électrique, bras d’écran), installation incluse.',
      'Pack 10 postes : 17 000 €, soit 1 700 € par poste, avec étude ergonomique et formation des équipes.',
      'Essai gratuit de 30 jours, SAV sous 48 h.'
    ],
    resourcesLabel: 'Consulter les éléments de l’offre',
    resourcesTitle: 'Les éléments de l’offre',
    cases: [
      { tab: 'Siège ergonomique', tabSub: '690 €', title: 'Votre annonce à 690 €',
        models: { text: 'Ce siège vous apporte un meilleur confort au quotidien tout en préservant votre dos. Il est à 690 €, avec une garantie de 5 ans.' } },
      { tab: 'Poste complet', tabSub: '1 900 €', title: 'Votre annonce à 1 900 €',
        models: { text: 'Vous pouvez alterner les positions tout au long de la journée pour gagner en confort et en énergie. L’ensemble est à 1 900 €, avec 30 jours pour l’essayer.' } },
      { tab: 'Pack 10 postes', tabSub: '17 000 €', title: 'Votre annonce à 17 000 €',
        models: { text: 'Vous équipez vos équipes avec une solution complète qui améliore leur confort de travail. L’investissement est de 17 000 €, installation comprise, avec un SAV sous 48 h.' } }
    ],
    keyPoint: 'Il n’y a pas de réponse unique : votre banque doit vous ressembler et rester naturelle à l’oral. L’objectif n’est plus de réciter une méthode, mais de vous constituer des formulations à vous approprier et à adapter en rendez-vous.',
    nextLabel: 'Enregistrer cette carte',
    submitLabel: 'Ouvrir ma banque d’annonces',
    lock: 'Banque en mode rendez-vous après les 3 cartes',
    modelLabel: 'Corrigé modèle',
    feedback: 'Relisez vos trois annonces à voix haute : chacune suit-elle bénéfice, prix, réassurance ?'
  }
};
