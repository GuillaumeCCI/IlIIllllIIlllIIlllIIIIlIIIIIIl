/* SÉRIE 1 · PRISE DE CONTACT · contenus éditables.
 *
 * Grille d'auto-évaluation et corrigés modèles repris de la fiche d'activité
 * « Reconstruire une ouverture d'entretien réussie » (M1.1.1, activité 1).
 * Les fiches tutoient l'apprenant ; l'interface le vouvoie, les textes ont
 * donc été transposés sans en changer le fond.
 *
 * Les corrigés sont des EXEMPLES, pas des réponses uniques : toute production
 * respectant la grille est valable.
 */
window.ATELIER_S1 = {
  audio: {
    // Aucun audio n’était fourni. Pour activer le vôtre, remplacez null par
    // 'assets/audio/1-1-1-A.mp3', puis adaptez transcript et mettez demo à false.
    src: null,
    demo: true,
    transcript: 'Bonjour, je suis Camille Martin, conseillère chez Novéa. Je vais vous présenter nos solutions d’assurance professionnelle, on a des offres vraiment intéressantes en ce moment. On va voir ensemble ce qui pourrait vous convenir.'
  },

  openings: [
    'Bonjour, merci de me recevoir. Je suis [Prénom Nom], [fonction] chez [Entreprise]. Pour être efficaces, je vous propose 30 minutes : d’abord vous me parlez de votre situation, ensuite je vous montre ce qui peut vous aider. Ça vous va ? Je vous écoute.',
    'Bonjour, [Prénom Nom] de [Entreprise], enchanté. On accompagne déjà plusieurs entreprises comme la vôtre sur [sujet], avec de très bons résultats. Je vais vous présenter notre approche, et vous me direz ce que vous en pensez.'
  ],

  faceToFace: 'Bonjour, merci de me recevoir. Je suis [Prénom Nom], conseiller chez [Entreprise]. Je vous propose 20 minutes : d’abord pour vous écouter sur votre projet, ensuite pour vous proposer des pistes. Pour commencer, qu’est-ce qui vous amène ?',

  criteria: ['Cadrage', 'Écoute', 'Centrage client', 'Recherche d’accord', 'Crédibilité'],
  techniques: ['Accueil / 4 × 20', 'Présentation', 'Cadrage', 'Transition vers l’écoute', 'Adaptation'],

  /* Grille commune « Mon ouverture est-elle réussie ? », reprise de la fiche. */
  rubric: [
    ['Accueil et climat', 'Salutation soignée, mise à l’aise, registre professionnel dès les premiers mots (4 × 20).'],
    ['Présentation', 'J’annonce clairement qui je suis, ma fonction et mon entreprise, de façon concise.'],
    ['Cadrage', 'J’annonce l’objet de l’échange, le déroulé et, si pertinent, la durée.'],
    ['Transition vers l’écoute', 'Je bascule vers le client avant de parler produit ou offre.'],
    ['Posture centrée client', 'Ton, formulation et rythme sont orientés client ; je ne monopolise pas la parole.'],
    ['Adaptation', 'Mon ouverture est ajustée au client, au canal et à la situation.']
  ],

  hints: {
    E1: 'Reconnaissez simplement le changement, confirmez que l’échange peut continuer à l’oral et posez une question courte sur la priorité du prospect. Évitez d’exiger qu’il rallume sa caméra.',
    E2: 'Conservez trois éléments : une entrée en matière claire, un bénéfice concret pour le client et une proposition de suite. Testez votre débit avec le chronomètre.',
    E3: 'Commencez par une proposition : « Je vous propose de… », « Prenons un instant pour… ». Prenez l’initiative tout en laissant de la place à votre interlocuteur.'
  },

  /* Chaque écran reçoit le corrigé modèle de l'exercice correspondant de la
   * fiche. Les listes sont affichées paragraphe par paragraphe. */
  feedback: {
    // Exercice B de la fiche : diagnostiquer une ouverture « correcte mais perfectible ».
    A: [
      'Ce qui va déjà : la salutation et la présentation sont là : identité, fonction, entreprise. L’ouverture n’est donc pas ratée.',
      'Points perfectibles : pas de mise à l’aise ni de remerciement ; pas de cadrage de la durée ; une bascule trop rapide sur « je vais vous présenter » et « des offres intéressantes », qui oriente vers le produit avant l’écoute ; pas de transition claire vers le client ; « ce qui pourrait vous convenir » reste vague.',
      'Version améliorée : « Bonjour, merci de me recevoir. Je suis Camille Martin, conseillère chez Novéa. Je vous propose une vingtaine de minutes : d’abord pour que vous me parliez de votre activité et de vos besoins, ensuite je vous présenterai les solutions les plus adaptées. Pour commencer, qu’est-ce qui vous préoccupe aujourd’hui côté couverture ? »',
      'Critère spécifique à vérifier : la finesse du diagnostic. Avez-vous repéré des points d’amélioration réels, et votre version les corrige-t-elle effectivement ?'
    ],

    // Exercice A de la fiche, contexte 1 : boutique, client pressé (B2C).
    B: [
      'Corrigé modèle pour ce contexte : « Bonjour ! Je vous laisse regarder à votre rythme. Je suis [Prénom], conseiller ici : au moindre besoin, je suis juste à côté. Vous cherchez quelque chose de précis, ou je vous laisse d’abord faire un tour ? »',
      'Le réglage attendu : une ouverture courte et non intrusive, qui respecte le rythme du client et lui laisse le choix.',
      'Critère spécifique à vérifier : l’adaptation au contexte. Le réglage que vous annoncez doit être cohérent avec la situation et réellement présent dans votre formulation.'
    ],

    // Exercice C de la fiche : comparer deux ouvertures et argumenter.
    C: [
      'La plus efficace est l’Ouverture 1, pour trois raisons. Un : le cadrage est clair, avec durée et déroulé annoncés : le client sait à quoi s’attendre. Deux : la bascule vers l’écoute précède toute présentation, on découvre avant de « pousser ». Trois : il y a recherche d’accord (« Ça vous va ? ») et une posture centrée client.',
      'Faiblesses de l’Ouverture 2 : elle parle surtout du vendeur et de ses résultats, enchaîne directement sur « je vais vous présenter », sans cadrage de durée ni temps d’écoute.',
      'L’emprunt utile à l’Ouverture 2 : la référence à des clients similaires, une preuve sociale à réintroduire brièvement pour crédibiliser, sans en faire le cœur de l’ouverture ni retarder l’écoute.',
      'Critère spécifique à vérifier : la qualité de l’argumentation. Au moins trois arguments explicitement reliés aux critères, et un emprunt pertinent identifié.'
    ],

    // Exercice D de la fiche : rédiger et expliciter son raisonnement.
    // Corrigé structuré : l'écran place chaque élément sous la ligne concernée.
    D: {
      // Les quatre fonctions attendues dans toute ouverture complète.
      requiredFunctions: ['Accueil / 4 × 20', 'Présentation', 'Cadrage', 'Transition vers l’écoute'],
      // Ce que chaque fonction doit produire, pour juger sa propre ligne.
      guidance: {
        'Accueil / 4 × 20': 'Les premiers mots et le ton installent le climat : saluez et remerciez avant toute chose.',
        'Présentation': 'Dites qui vous êtes et pour qui : prénom, nom, fonction, entreprise, en une phrase.',
        'Cadrage': 'Annoncez l’objet, le déroulé et, si c’est pertinent, la durée.',
        'Transition vers l’écoute': 'Donnez réellement la parole, par une question ouverte.',
        'Adaptation': 'Ajustez au contexte et aux signaux observés. Utile, mais ne remplace aucune des quatre fonctions clés.'
      },
      // Le modèle annoté : une ligne, sa fonction, ce qu'elle sert.
      model: [
        { line: 'Bonjour, merci de me recevoir.', fonction: 'Accueil / 4 × 20', intention: 'Premiers mots et ton : le climat se joue ici.' },
        { line: 'Je suis [Prénom Nom], conseiller chez [Entreprise].', fonction: 'Présentation', intention: 'Qui je suis, pour qui.' },
        { line: 'Je vous propose qu’on prenne 20 minutes…', fonction: 'Cadrage', intention: 'La durée est annoncée.' },
        { line: '…d’abord pour vous écouter, ensuite pour vous proposer des pistes.', fonction: 'Cadrage', intention: 'Le déroulé est annoncé, et l’écoute avec lui.' },
        { line: 'Pour commencer, qu’est-ce qui vous amène ?', fonction: 'Transition vers l’écoute', intention: 'Une question ouverte qui donne la parole.' }
      ],
      criterion: 'Critère spécifique : la justesse de l’auto-explicitation. Chaque fonction clé doit être présente ET correctement identifiée en face de sa ligne.'
    },

    // Exercice E de la fiche, contrainte 1 : visio, caméra coupée.
    E1: [
      'Corrigé modèle : « Bonjour [Nom], je suis [Prénom Nom] de [Entreprise]. Comme on ne se voit pas, je vais être clair sur le déroulé : je vous propose 15 minutes, d’abord je vous écoute sur [sujet], ensuite je réagis. Dites-moi simplement quand vous voulez que je précise ou que je m’arrête. »',
      'La gestion de la contrainte : un cadrage verbal renforcé, plus une invitation à réagir vocalement, pour compenser l’absence d’image.',
      'Critère spécifique à vérifier : la gestion de la contrainte. Elle doit être effectivement respectée, et l’ouverture rester efficace : climat, cadrage et écoute préservés autant que possible.'
    ],

    // Exercice E de la fiche, contrainte 2 : 40 secondes chrono.
    E2: [
      'Corrigé modèle : « Bonjour, [Prénom Nom] de [Entreprise]. En un mot : on aide les [type d’entreprise] à [bénéfice concret]. Je vous propose 10 minutes pour voir si c’est pertinent pour vous. On continue ? »',
      'La gestion de la contrainte : une accroche bénéfice ultra-courte, suivie d’une demande d’accord immédiate.',
      'Critère spécifique à vérifier : la gestion de la contrainte. Votre ouverture tient-elle réellement dans les quarante secondes, tout en gardant une valeur concrète pour le client et une proposition de suite ?'
    ],

    // Exercice E de la fiche, contrainte 3 : sans poser de question.
    E3: [
      'Corrigé modèle : « Bonjour, merci de me recevoir. Je suis [Prénom Nom] de [Entreprise]. Je vous propose qu’on prenne le temps : je vous laisse me raconter votre situation, je suis là pour ça avant tout. »',
      'La gestion de la contrainte : remplacer la question par une invitation ouverte, qui donne tout de même la parole au client.',
      'Critère spécifique à vérifier : la gestion de la contrainte. Aucune question posée, et pourtant le client est invité à s’exprimer.'
    ],

    // Exercice F de la fiche : transposer d'un canal à un autre.
    F: [
      'Téléphone : « Bonjour, [Prénom Nom] de [Entreprise], suis-je bien avec [Nom] ? Je vous appelle au sujet de [raison courte]. Est-ce un bon moment pour deux minutes, ou préférez-vous que je rappelle ? … Parfait. Pour être utile, je vais surtout vous écouter : qu’est-ce qui compte le plus pour vous sur [sujet] ? » Les adaptations : vérifier l’identité et la disponibilité, puisqu’on ne voit pas l’interlocuteur ; la voix devient le seul vecteur ; la raison de l’appel est explicite.',
      'E-mail. Objet : « [Sujet] : un échange de 20 min ? » Message : « Bonjour [Nom], je suis [Prénom Nom], conseiller chez [Entreprise]. Je me permets de vous écrire au sujet de [sujet]. Avant toute proposition, j’aimerais surtout comprendre votre situation et vos priorités. Seriez-vous disponible pour un échange de 20 minutes cette semaine ? Dites-moi le créneau qui vous convient. Bien cordialement, [Signature] » Les adaptations : un objet clair, un ton écrit courtois, le cadrage de la durée, une question de disponibilité puisque le canal est asynchrone, et une écoute annoncée mais reportée à l’échange.',
      'Critère spécifique à vérifier : l’adaptation au canal. Les quatre fonctions doivent être présentes dans chaque version ET adaptées aux contraintes du canal : identité et disponibilité au téléphone, objet et créneau en e-mail.'
    ]
  }
};
