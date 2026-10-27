/* PAGES DE CONTEXTE · ce qui s'affiche avant chaque exercice.
 *
 * Chaque exercice reçoit :
 *   lede       l'accroche du titre, en deux parties : `key` est souligné
 *              de corail, `rest` enchaîne ;
 *   mission    la consigne en une ou deux phrases, dans la carte blanche ;
 *   method     la façon de procéder, en une ligne, sous un filet ;
 *   situation  la mise en situation, repliée avec les critères ;
 *   task       le détail de ce qui est demandé ;
 *   criteria   les points sur lesquels la production sera relue.
 *
 * `quote` est facultatif : la réplique du client, quand l'exercice en a une.
 *
 * Textes repris des maquettes et des fiches d'activité. Modifiez-les ici :
 * aucun code d'écran à toucher.
 */
window.ATELIER_BRIEFINGS = {

  /* ══ SÉRIE 1 · PRISE DE CONTACT ═══════════════════════════════════════ */

  's1-A': {
    lede: { key: "Une accroche à la loupe.", rest: "Écoutez, diagnostiquez, puis réécrivez-la." },
    mission: "Relevez ce qui fonctionne, deux à trois axes d’amélioration, puis proposez votre version.",
    method: "Écoutez l’accroche avant de commencer.",
    situation: 'Vous êtes en boutique. Un client entre d’un pas pressé, jette des coups d’œil à sa montre et évite le contact visuel. Une conseillère l’accueille par une accroche que vous allez écouter.',
    task: 'Écoutez l’accroche, puis relevez ce qui fonctionne, deux à trois axes d’amélioration précis, et réécrivez-la à votre façon.',
    criteria: [
      'La finesse du diagnostic : des points d’amélioration réels, pas des erreurs inventées',
      'Une version réécrite qui corrige effectivement les points relevés',
      'Un ton et une concision adaptés à un client pressé'
    ]
  },

  's1-B': {
    lede: { key: "Un client pressé.", rest: "Trouvez les mots qui respectent son rythme." },
    mission: "Rédigez votre entrée en matière en trois à quatre phrases, puis nommez votre réglage principal.",
    method: "Observez les signaux avant de rédiger.",
    situation: 'Même boutique, même client pressé. Il a un besoin précis mais craint d’être accaparé par un discours commercial trop lourd.',
    task: 'Rédigez votre entrée en matière en trois à quatre phrases, puis nommez en une phrase le réglage principal que vous avez fait pour vous synchroniser avec lui.',
    criteria: [
      'Une ouverture courte, qui respecte son rythme et lui laisse le choix',
      'Un réglage annoncé cohérent avec la situation',
      'Ce réglage doit être réellement perceptible dans votre formulation'
    ]
  },

  's1-C': {
    lede: { key: "Deux ouvertures, un choix.", rest: "Les deux se défendent : tranchez et argumentez." },
    mission: "Choisissez la plus efficace, appuyez-vous sur trois arguments, puis identifiez un emprunt utile.",
    method: "Reliez chaque argument à un critère.",
    situation: 'Premier rendez-vous B2B dans une PME, trente minutes prévues. Deux ouvertures vous sont proposées pour cette même situation. Les deux sont acceptables.',
    task: 'Choisissez la plus efficace, appuyez votre décision sur au moins trois arguments reliés aux critères, puis identifiez ce que vous emprunteriez à l’autre.',
    criteria: [
      'Au moins trois arguments explicitement reliés aux critères d’une bonne ouverture',
      'Un emprunt pertinent identifié dans l’ouverture non retenue',
      'Un raisonnement, pas une préférence : les deux choix restent défendables s’ils sont argumentés'
    ]
  },

  's1-D': {
    lede: { key: "Une ouverture complète.", rest: "Écrivez-la ligne à ligne, fonction par fonction." },
    mission: "Écrivez quatre à six phrases et indiquez la fonction de chacune.",
    method: "Une phrase par ligne, sa fonction en face.",
    situation: 'Vous préparez une ouverture d’entretien complète, pour la situation commerciale de votre choix.',
    task: 'Écrivez quatre à six phrases, une par ligne, et indiquez en face de chacune la fonction qu’elle remplit : accueil, présentation, cadrage, transition vers l’écoute ou adaptation.',
    criteria: [
      'Les quatre fonctions clés sont présentes : accueil, présentation, cadrage, transition vers l’écoute',
      'Chaque fonction est correctement identifiée en face de sa ligne',
      'L’enchaînement se tient quand on lit l’ouverture à voix haute'
    ]
  },

  's1-E1': {
    lede: { key: "La caméra se coupe.", rest: "Vous perdez les signaux visuels : gardez le lien." },
    mission: "Formulez en deux ou trois phrases ce que vous dites maintenant.",
    method: "Un entraînement oral facultatif est proposé.",
    situation: 'Premier rendez-vous en visioconférence. Il reste quinze minutes, votre interlocuteur est un décideur pressé. En pleine conversation, il coupe sa caméra : vous perdez tous les signaux visuels.',
    task: 'Formulez en deux ou trois phrases ce que vous dites maintenant. Un entraînement oral est proposé, facultatif.',
    criteria: [
      'Le changement est reconnu simplement, sans exiger que la caméra soit rallumée',
      'Le cadrage verbal est renforcé pour compenser l’absence d’image',
      'Une question courte redonne la parole au client'
    ]
  },

  's1-E2': {
    lede: { key: "Quarante secondes.", rest: "Pas une de plus pour donner envie de poursuivre." },
    mission: "Rédigez une ouverture de quatre-vingt-dix mots maximum, puis testez-la à voix haute.",
    method: "Un chronomètre vous attend dans l’exercice.",
    situation: 'Le client vous accorde quarante secondes avant de décider s’il poursuit l’échange. Pas une de plus.',
    task: 'Rédigez une ouverture de quatre-vingt-dix mots maximum, puis testez-la à voix haute avec le chronomètre.',
    criteria: [
      'Une accroche claire, un bénéfice concret pour le client, une proposition de suite',
      'Le tout tient réellement dans les quarante secondes',
      'La concision ne sacrifie ni le climat ni la place laissée au client'
    ]
  },

  's1-E3': {
    lede: { key: "Sans aucune question.", rest: "Entrez en matière par une phrase affirmative." },
    mission: "Rédigez une première phrase affirmative, en 280 caractères maximum.",
    method: "Aucun point d’interrogation n’est accepté.",
    situation: 'Vous abordez un client dans un espace de vente. La consigne est inhabituelle : réussir votre entrée en matière sans poser la moindre question.',
    task: 'Rédigez une première phrase affirmative, en deux cent quatre-vingts caractères maximum. Aucun point d’interrogation.',
    criteria: [
      'La contrainte est respectée : pas de question posée',
      'L’ouverture prend l’initiative tout en laissant de la place à l’interlocuteur',
      'Le climat reste positif, l’affirmation n’est pas une injonction'
    ]
  },

  's1-F': {
    lede: { key: "Trois canaux.", rest: "La même intention, trois formes différentes." },
    mission: "Transposez l’ouverture au téléphone, puis à l’e-mail avec son objet.",
    method: "L’e-mail doit faire 80 à 120 mots.",
    situation: 'Vous disposez d’une bonne ouverture en face-à-face. Il s’agit maintenant de la porter sur deux autres canaux, où le non-verbal disparaît et où l’e-mail impose l’asynchrone.',
    task: 'Transposez-la au téléphone, puis à l’e-mail de premier contact, avec son objet. L’e-mail doit faire entre quatre-vingts et cent vingt mots.',
    criteria: [
      'Les quatre fonctions sont présentes dans chaque version',
      'Au téléphone : identité vérifiée, disponibilité demandée, motif explicite',
      'En e-mail : objet clair, cadrage de la durée, proposition de créneau'
    ]
  },

  /* ══ SÉRIE 2 · ÉCOUTE ACTIVE ══════════════════════════════════════════ */

  's2-A': {
    lede: { key: "Trois clients, trois rythmes.", rest: "À chacun la prise de contact qui lui convient." },
    mission: "Pour chaque client, choisissez la meilleure réponse puis justifiez votre choix en une phrase.",
    method: "Les trois clients s’enchaînent par onglets.",
    situation: 'Trois clients se présentent successivement en boutique : l’un est pressé, le deuxième méfiant après de mauvaises expériences, le troisième n’y connaît rien et redoute de se tromper.',
    task: 'Pour chacun, choisissez parmi quatre réponses la meilleure prise de contact, puis justifiez en une phrase pourquoi les trois autres sont moins adaptées.',
    criteria: [
      'Le choix s’appuie sur le rythme, le besoin et le niveau d’ouverture du client',
      'La justification explique pourquoi les autres options ferment ou dévient la relation',
      'L’attitude retenue garde la relation ouverte'
    ]
  },

  's2-B': {
    lede: { key: "De fausses reformulations.", rest: "Repérez le glissement, puis corrigez-le." },
    mission: "Nommez l’attitude vers laquelle chaque réponse dévie, puis réécrivez-la en compréhension.",
    method: "Quatre réponses à traiter, dans un tableau.",
    situation: 'Un client vous dit que votre solution lui paraît un peu chère. Quatre réponses de vendeur vous sont soumises : toutes commencent comme une reformulation, mais glissent en réalité vers une autre attitude.',
    quote: 'Votre solution me paraît un peu chère.',
    task: 'Pour chaque réponse, nommez l’attitude de Porter vers laquelle elle dévie, puis réécrivez-la en véritable compréhension.',
    criteria: [
      'La bonne attitude est nommée pour chacune des quatre réponses',
      'La réécriture reprend les mots du client sans rien ajouter',
      'Ni jugement, ni interprétation, ni solution prématurée, ni consolation'
    ]
  },

  's2-D': {
    lede: { key: "Les six attitudes de Porter.", rest: "Produisez-les toutes, puis choisissez." },
    mission: "Rédigez une réponse par attitude, puis désignez la plus appropriée et justifiez.",
    method: "Une attitude à la fois, puis votre choix final.",
    situation: 'Un client vous annonce qu’il préfère prendre son temps avant de se décider. Les six attitudes d’écoute de Porter décrivent six façons de lui répondre.',
    quote: 'Je préfère prendre mon temps avant de me décider.',
    task: 'Rédigez une réponse illustrant chacune des six attitudes, puis désignez celle qui convient le mieux à une prise de contact et argumentez votre choix.',
    criteria: [
      'Les six réponses illustrent bien six attitudes distinctes',
      'Le choix final s’appuie sur les critères de la grille',
      'L’argumentation tient compte du moment : il s’agit d’une prise de contact'
    ]
  },

  's2-F': {
    lede: { key: "Trois profils difficiles.", rest: "Méfiant, bavard, silencieux : adaptez votre écoute." },
    mission: "Pour chaque profil, formulez une réponse d’écoute et expliquez votre adaptation.",
    method: "Les trois profils s’enchaînent par onglets.",
    situation: 'Trois profils d’interlocuteurs difficiles se succèdent : un client méfiant voire agressif, un client bavard qui part dans tous les sens, et un client silencieux qui ne répond presque pas.',
    task: 'Pour chaque profil, formulez une réponse d’écoute juste, puis expliquez en une phrase comment vous adaptez votre posture.',
    criteria: [
      'La réponse reste de l’écoute : ni jugement, ni défense',
      'Elle est ajustée au profil par son ton, sa longueur et son ouverture',
      'L’adaptation annoncée est réellement visible dans la formulation'
    ]
  },

  /* ══ SÉRIE 3 · GESTION DES OBJECTIONS ═════════════════════════════════ */

  's3-1.1': {
    lede: { key: "Huit comportements.", rest: "Lesquels ouvrent le dialogue, lesquels le referment ?" },
    mission: "Classez chaque carte dans la bonne zone : bon réflexe, ou à éviter.",
    method: "Déplacez-les à la souris ou au clavier.",
    situation: 'Face à une objection, certains réflexes ouvrent le dialogue, d’autres le referment. Huit comportements vous sont proposés en vrac.',
    task: 'Classez chaque comportement dans la bonne zone : bon réflexe, ou à éviter. À la souris, ou au clavier.',
    criteria: [
      'Les huit cartes sont classées',
      'La logique de fond : comprendre avant de répondre',
      'Le corrigé détaille ensuite chaque carte, une par une'
    ]
  },

  's3-1.2': {
    lede: { key: "Six étapes, six rôles.", rest: "Retrouvez la fonction de chacune." },
    mission: "Associez chaque carte-rôle à l’étape de la méthode qui lui correspond.",
    method: "Déplacez-les à la souris ou au clavier.",
    situation: 'La méthode de traitement d’une objection se déroule en six étapes : accueillir, questionner, reformuler, traiter, contrôler, enchaîner. Chacune remplit une fonction précise.',
    task: 'Associez chaque carte-rôle à l’étape qui lui correspond. Une étape ne reçoit qu’une seule carte.',
    criteria: [
      'Les six associations sont faites',
      'La séquence suit une logique : ne pas braquer, identifier le frein, prouver, vérifier, reprendre la main',
      'Le corrigé rappelle ensuite le rôle de chaque étape'
    ]
  },

  's3-1.3': {
    lede: { key: "Quatre objections.", rest: "Chacune appelle un premier geste différent." },
    mission: "Pour chaque objection, identifiez la nature probable puis choisissez le premier geste.",
    method: "Deux décisions par objection, l’une après l’autre.",
    situation: 'Toutes les objections ne se ressemblent pas. Une réserve fondée, un malentendu, un prétexte et une demande de réassurance n’appellent pas le même premier geste. Quatre objections vous sont soumises.',
    task: 'Pour chacune, identifiez d’abord la nature probable, puis choisissez le premier geste à poser.',
    criteria: [
      'La nature retenue est la plus vraisemblable au vu de ce que dit le client',
      'Le premier geste ouvre la suite de l’échange plutôt qu’il ne la referme',
      'Un mémo reste consultable pendant l’exercice'
    ]
  },

  's3-1.4': {
    lede: { key: "Derrière le prétexte.", rest: "Le vrai frein n’est jamais celui qu’on annonce." },
    mission: "Formulez une hypothèse sur le vrai frein, puis la question qui le révélerait.",
    method: "Lisez l’échange avant de répondre.",
    situation: 'Un client repousse la discussion sans expliquer ce qui le freine. Le commercial accepte le report sans chercher à comprendre, et l’échange se termine sur un vague « on verra ».',
    task: 'Formulez une hypothèse simple sur le vrai frein, puis la question ouverte qui permettrait de le révéler.',
    criteria: [
      'L’hypothèse est précise, pas une généralité',
      'La question est ouverte et ne suggère pas sa propre réponse',
      'Elle invite le client à préciser plutôt qu’à répondre par oui ou non'
    ]
  },

  's3-1.5': {
    lede: { key: "C’est trop cher.", rest: "Deux réponses possibles : une seule traite vraiment l’objection." },
    mission: "Comparez les deux approches, choisissez la plus juste, puis expliquez votre raisonnement.",
    method: "Les deux réponses sont affichées côte à côte.",
    situation: 'Un client vous dit que c’est trop cher. Deux réponses de commercial vous sont proposées pour traiter cette objection.',
    quote: 'C’est trop cher.',
    task: 'Comparez les deux approches, choisissez la plus juste, puis expliquez ce qui la rend plus efficace.',
    criteria: [
      'Le choix distingue une réponse qui comprend d’une réponse qui concède',
      'Le raisonnement s’appuie sur les étapes de la méthode',
      'Le corrigé détaille ensuite les deux approches'
    ]
  },

  's3-1.6': {
    lede: { key: "Un traitement complet.", rest: "Six contextes au choix, six étapes, une phrase à la fois." },
    mission: "Rédigez une phrase pour chacune des six étapes de la méthode.",
    method: "Choisissez un contexte : les étapes se suivent ensuite une par une.",
    situation: 'Six clients, six secteurs, six objections : des sièges de bureau, une maison à vendre, une assurance d’artisan, un logiciel, un vélo électrique, un projet de décoration. Choisissez un contexte, puis construisez votre réponse complète, étape par étape. Un contexte suffit pour terminer ; les autres sont autant de nouvelles tentatives.',
    task: 'Rédigez une phrase pour chacune des six étapes de la méthode : accueillir, questionner, reformuler, traiter, contrôler, enchaîner.',
    criteria: [
      'L’accueil ne contredit pas le client',
      'La question ne suggère pas sa réponse, la reformulation reprend ses mots',
      'Le traitement apporte une preuve, le contrôle laisse une vraie place à sa réponse'
    ]
  },

  's3-1.7': {
    lede: { key: "Vos cartes réflexes.", rest: "Décoder, creuser, répondre avec une preuve." },
    mission: "Pour chaque objection : identifiez sa nature, creusez, puis préparez votre réponse.",
    method: "Trois temps par carte, quatre cartes.",
    situation: 'Quatre objections fréquentes vous sont soumises. Pour chacune, il s’agit de bâtir une carte réflexe, mobilisable en entretien.',
    task: 'Pour chaque objection : identifiez sa nature, formulez la question qui permet de creuser, puis préparez une réponse appuyée sur une preuve.',
    criteria: [
      'La nature retenue correspond à ce que le client exprime réellement',
      'La question creuse sans suggérer la réponse',
      'La réponse s’appuie sur un élément vérifiable, pas sur une promesse'
    ]
  },

  /* ══ SÉRIE 4 · MANIPULATION ═══════════════════════════════════════════ */

  's4-1.1': {
    lede: { key: "Cinq phrases mélangées.", rest: "À vous de reconstruire une ouverture d’entretien fluide." },
    mission: "Placez les cinq phrases de la première à la cinquième.",
    method: "Déplacez-les à la souris ou au clavier.",
    situation: 'Les cinq phrases d’une ouverture d’entretien vous sont présentées en désordre. Remises dans le bon ordre, elles forment une ouverture fluide.',
    task: 'Placez chaque phrase à sa position, de la première à la cinquième. À la souris, ou au clavier.',
    criteria: [
      'Les cinq phrases sont placées',
      'La logique attendue : créer la relation, puis cadrer l’échange, avant de basculer vers l’écoute',
      'Les variantes défendables sur l’ordre exact objet et durée sont acceptées'
    ]
  },

  's4-1.2': {
    lede: { key: "Une ouverture ratée.", rest: "Repérez ce qui cloche, puis réécrivez-la." },
    mission: "Surlignez au moins quatre maladresses, puis proposez une ouverture correcte.",
    method: "Cliquez sur les passages maladroits.",
    situation: 'Une ouverture d’entretien ratée vous est soumise. Registre familier, entrée directe sur l’offre, aucune place laissée au client : tout y passe.',
    task: 'Cliquez sur au moins quatre passages maladroits pour les surligner, puis réécrivez une ouverture correcte en trois ou quatre phrases.',
    criteria: [
      'Au moins quatre maladresses repérées dans le texte',
      'La réécriture rétablit les quatre temps : accueil, présentation, cadrage, question ouverte',
      'Le corrigé signale ensuite ce que le texte d’origine omettait'
    ]
  },

  's4-2.1': {
    lede: { key: "Six réponses, six attitudes.", rest: "Classez-les selon la grille de Porter." },
    mission: "Classez chaque réponse sous l’attitude qui lui correspond.",
    method: "Déplacez-les à la souris ou au clavier.",
    situation: 'Un client hésite sur le moment d’investir. Six réponses de commercial vous sont proposées : chacune illustre l’une des six attitudes d’écoute de Porter.',
    quote: 'Je ne suis pas sûr que ce soit le bon moment pour investir là-dedans.',
    task: 'Classez chaque réponse sous l’attitude qui lui correspond. Une attitude ne reçoit qu’une seule réponse.',
    criteria: [
      'Les six réponses sont classées',
      'Ne pas confondre l’enquête, qui questionne, et la compréhension, qui reformule',
      'Les six attitudes ne sont ni bonnes ni mauvaises en soi : tout dépend du moment'
    ]
  },

  's4-2.2': {
    lede: { key: "Trois échanges qui tournent court.", rest: "Remplacez le réflexe par une vraie écoute." },
    mission: "Pour chaque situation, remplacez la réponse réflexe par une reformulation de compréhension.",
    method: "Les trois situations s’enchaînent.",
    situation: 'Trois échanges tournent court. À chaque fois, le commercial répond par un réflexe qui referme la conversation : il contredit, il minimise, ou il balaie l’expérience passée.',
    task: 'Pour chaque situation, remplacez la réponse réflexe par une reformulation de compréhension.',
    criteria: [
      'La reformulation nomme le ressenti ou le besoin du client',
      'Elle ne juge pas, ne conseille pas et ne minimise pas',
      'Elle invite le client à poursuivre plutôt qu’elle ne referme l’échange'
    ]
  }
};
