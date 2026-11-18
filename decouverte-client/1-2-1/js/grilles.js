/* GRILLES DU SCORE ESTIMATIF · réponses rédigées du module 1-2-1.
 *
 * Une grille par exercice à réponse ouverte (clé du catalogue, ex. 's3-3.1') :
 * des blocs, chacun lisant un ou plusieurs champs, avec ses critères (familles
 * de mots et de tournures), ses pièges et ses règles. Voir
 * moteur/js/indicateur.js. Les exercices à choix n'ont pas de grille : leur
 * corrigé dit simplement ce qui était attendu.
 *
 * Les noms des critères reprennent ceux de l'autoévaluation de l'exercice.
 */
(function (root) {
  'use strict';

  /* ── Familles communes ────────────────────────────────────────────── */

  // Ce que ressent le client, nommé : la base du reflet.
  const EMOTION = ['décourag*', 'découragement', 'frustr*', 'déçu', 'déçue', 'déçus', 'déception', 'décevant*', 'lass*', 'las', 'en avez assez',
    'en avoir assez', 'marre', 'ras-le-bol', 'agac*', 'énerv*', 'exaspér*', 'inquiet', 'inquiète', 'inquiétude', 'inquiète*', 'peur', 'crain*',
    'craignez', 'redoutez', 'fatigu*', 'épuis*', 'usant', 'usante', 'impression', 'l’impression', 'sentiment', 'le sentiment', 'sentez', 'ressentez',
    'ressenti', 'vous semble', 'impatien*', 'colère', 'irrité', 'irritée', 'désespér*', 'doute*', 'méfi*', 'pas pris au sérieux', 'pris au sérieux', 'pas prise au sérieux', 'prise au sérieux',
    'pas écouté', 'pas écoutée', 'injuste', 'pénible', 'dur', 'difficile', 'blasé', 'blasée', 'amer', 'amère', 'perdu confiance', 'confiance',
    'échaudé', 'échaudée', 'regret*', 'vexé', 'vexée', 'déprim*', 'stress*', 'tendu', 'tendue', 'à bout', 'ça vous pèse', 'pèse', 'agaçant',
    'lassant', 'rageant', 'contrari*', 'mécontent*', 'insatisf*', 'vous en avez', 'vous avez du mal'];

  // Demander au client de valider.
  const VALIDATION = ['c’est bien ça', 'c’est ça', 'est-ce bien ça', 'est-ce que c’est bien ça', 'ai-je bien compris', 'j’ai bien compris',
    'si j’ai bien compris', 'est-ce que j’ai bien compris', 'je vous ai bien compris', 'vous confirmez', 'pouvez-vous confirmer', 'je résume bien',
    'correct', 'exact', 'n’est-ce pas', 'je ne me trompe pas', 'je me trompe', 'ai-je oublié', 'oublié quelque chose', 'autre chose', 'quelque chose à ajouter',
    'à ajouter', 'à compléter', 'compléter', 'ça vous parle', 'ça correspond', 'cela correspond', 'est-ce que ça résume', 'ça résume', 'bien résumé',
    'on est d’accord', 'sommes-nous d’accord', 'vous êtes d’accord', 'd’accord avec', 'il manque', 'manque-t-il', 'rien oublié', 'est-ce que je',
    'c’est juste', 'juste ?'];

  // Ce qui transforme la reformulation en vente : solution, conseil, argument.
  const PIEGE_SOLUTION = { nom: 'Une solution ou un argument', points: 3,
    mots: ['il vous faut', 'il vous faudrait', 'il faut que vous', 'je vous propose', 'je vous conseille', 'je vous recommande', 'je vous suggère',
      'nous avons', 'nous proposons', 'on a ce qu’il', 'j’ai ce qu’il', 'j’ai exactement', 'notre modèle', 'nos modèles', 'notre offre', 'notre solution',
      'notre logiciel', 'notre application', 'notre machine', 'notre matelas', 'nos contrats', 'notre gamme', 'prenez', 'essayez', 'optez',
      'la solution', 'une solution', 'un moteur', 'la batterie', 'promotion', 'promo', 'remise', 'réduction', 'tarif', 'prix', '€', 'euros', 'abonnement',
      'ce qu’il vous faut', 'je vais vous montrer', 'regardez', 'on va trouver', 'je m’en occupe', 'ça règle', 'réglera'],
    conseil: 'Une reformulation ne propose rien : elle redit seulement ce que dit le client.' };

  // Juger, rassurer ou interpréter au lieu de redire.
  const PIEGE_JUGEMENT = { nom: 'Un jugement ou un conseil', points: 2,
    mots: ['vous avez raison', 'vous avez tort', 'c’est normal', 'ça arrive', 'ça arrive à tout le monde', 'tout le monde', 'ne vous inquiétez pas',
      'pas de panique', 'rassurez-vous', 'pas grave', 'il faut vous décider', 'décidez-vous', 'vous auriez dû', 'vous devriez', 'le marché est tendu',
      'en fait', 'en réalité', 'au fond', 'c’est de votre faute', 'c’est votre faute', 'il fallait', 'soyez rassuré', 'soyez rassurée', 'courage'],
    conseil: 'Pas de jugement ni de leçon : le client attend d’être compris, pas évalué.' };

  // Les pièges propres à la synthèse : rien ne s'ajoute à ce que le client a dit.
  const PIEGE_AJOUT = { nom: 'Un ajout du vendeur', points: 2,
    mots: ['je vous propose', 'nous proposons', 'notre', 'nos', 'je vous conseille', 'je vous recommande', 'prix', 'tarif', '€', 'euros',
      'abonnement', 'budget', 'remise', 'garantie', 'livraison', 'installation', 'devis'],
    conseil: 'La synthèse reprend ce que le client a dit, sans produit, ni prix, ni solution.' };

  /* ── L'écho : un mot du client, sur un ton de question ──────────────── */
  const echo = (titre, champ, mots) => ({
    titre, champs: [champ],
    criteres: [{ nom: 'Un de ses mots', mots, points: 4, conseil: 'Reprenez un mot important, tel qu’il a été dit.' }],
    phrases: { points: 0 },
    // La question est le cœur de l'écho : elle invite le client à préciser.
    regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 4 }, { regle: 'maxMots:12', nom: 'Court', points: 1 }],
    pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT]
  });

  /* ── Le reflet : ce qu'il ressent, avec ses mots ───────────────────── */
  const reflet = (titre, champ, situation) => ({
    titre, champs: [champ],
    criteres: [
      // Des noms neutres : la même grille vaut pour une cliente et pour un client.
      { nom: 'L’émotion nommée', mots: EMOTION, points: 4, conseil: 'Nommez ce que la personne ressent : lassitude, déception, découragement…' },
      { nom: 'Sa situation, avec ses mots', mots: situation, points: 3, conseil: 'Reprenez la situation décrite, avec ses mots.' },
      { nom: '« Vous », pas « je »', mots: ['vous', 'votre', 'vos'], points: 1, conseil: 'Parlez de la personne : « Vous avez l’impression que… ».' }
    ],
    phrases: { attendues: 1, points: 1, cache: true },
    pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT]
  });

  /* ── La synthèse : tous les éléments, puis une validation ──────────── */
  // `n` : le rang du client en 3.3 ; ses paroles servent à repérer une copie.
  const paroles = n => () => ((root.ATELIER_S3 && root.ATELIER_S3['3.3'].cases[n].scene.find(b => b.said)) || {}).said;
  const synthese = (titre, champ, elements, source) => ({
    titre, champs: [champ], source,
    // Une ligne par remarque du client, puis la validation : rien d'autre à lire.
    criteres: elements.map(([nom, mots]) => ({ nom, mots, points: 2 }))
      .concat([{ nom: 'Une question pour valider', mots: VALIDATION, points: 3, conseil: 'Terminez par une question : « C’est bien ça ? ».' }]),
    phrases: { points: 1, cache: true },
    pieges: [PIEGE_AJOUT, PIEGE_JUGEMENT]
  });

  /* ── A5 · Votre réponse, votre voix ───────────────────────────────── */

  // Ce que le vendeur dit pour montrer qu'il a compris, sans juger.
  const COMPRIS = ['ça doit', 'cela doit', 'doit être', 'j’imagine', 'imagine', 'je comprends', 'je comprend', 'compren*', 'pénible', 'difficile', 'dur', 'pèse', 'peser',
    'épuisant', 'fatigant', 'usant', 'au quotidien', 'vos journées', 'votre quotidien', 'gênant', 'gêne', 'vous en avez assez', 'pas facile', 'pas simple',
    'désagréable', 'inquiét*', 'stress*', 'frustr*', 'lourd', 'compliqué', 'jongler', 'déraille', 'désorganis*'];
  // Les rassurances toutes faites (« ne vous inquiétez pas ») : un soutien banal.
  const PIEGE_BANAL = { nom: 'Une rassurance toute faite', points: 2,
    mots: ['ne vous inquiétez pas', 'ne vous en faites pas', 'pas de souci', 'pas de soucis', 'pas de panique', 'rassurez-vous', 'c’est la vie', 'courage',
      'ça va aller', 'tout va bien se passer', 'c’est normal', 'tout le monde'],
    conseil: 'Pas de formule toute faite : dites ce que vous avez compris de sa situation.' };
  const produit = (mots, conseil) => ({ nom: 'Un produit ou une solution', points: 3, conseil,
    mots: ['je vous propose', 'je vous conseille', 'je vous recommande', 'je vais vous montrer', 'nous avons', 'notre gamme', 'nos modèles', 'notre offre',
      'promotion', 'promo', 'remise', 'réduction', 'garantie', 'essayez', 'prenez', 'il vous faut', 'il vous faudrait', 'la solution'].concat(mots) });
  const VALIDE = ['c’est bien ça', 'c’est ça', 'est-ce bien ça', 'ai-je bien compris', 'j’ai bien compris', 'est-ce que j’ai bien compris', 'vous confirmez',
    'je résume bien', 'correct', 'exact', 'n’est-ce pas', 'je me trompe', 'autre chose', 'quelque chose à ajouter', 'à ajouter', 'oublié', 'rien oublié',
    'ça correspond', 'on est d’accord', 'c’est juste', 'bien compris'];
  const RESUME = ['si je résume', 'je résume', 'pour résumer', 'en résumé', 'si je comprends bien', 'si je vous ai bien compris', 'si j’ai bien compris', 'donc', 'récapitul*'];

  /* Réplique 1 : comprendre ce que vit le client. */
  const r1 = (vecu, pieges) => ({ titre: 'Réplique 1 · Une réponse en attitude de compréhension', champs: ['r1'],
    criteres: [
      { nom: 'Ce qu’il vit', mots: vecu, points: 4, conseil: 'Reprenez ce que le client vous a dit de sa situation, avec ses mots.' },
      { nom: 'Ce que ça lui fait', mots: COMPRIS, points: 3, conseil: 'Montrez que vous mesurez ce que cela représente : « ça doit peser sur vos journées ».' },
      { nom: 'Tourné vers le client', mots: ['vous', 'votre', 'vos'], points: 1, conseil: 'Parlez du client : « vous », « vos nuits ».' }
    ],
    phrases: { attendues: 1, points: 1 },
    pieges: [PIEGE_BANAL, PIEGE_JUGEMENT].concat(pieges) });

  /* Réplique 3 : la synthèse, les éléments du client puis une validation. */
  const r3 = (elements, pieges) => ({ titre: 'Réplique 3 · Une reformulation-synthèse', champs: ['r3'],
    criteres: elements.map(([nom, mots]) => ({ nom, mots, points: 2, conseil: `Reprenez aussi cet élément : ${nom.toLowerCase()}.` }))
      .concat([{ nom: 'Une validation', mots: VALIDE, points: 2, conseil: 'Terminez par une question : « C’est bien ça ? ».' },
        { nom: 'Une annonce de synthèse', mots: RESUME, points: 1, conseil: 'Annoncez-la : « Si je résume… ».' }]),
    phrases: { attendues: 2, points: 1 },
    regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
    pieges });

  const A5 = [
    // 0 · M. Garnier, magasin de literie.
    [
      r1(['dors mal', 'dormir', 'dormez', 'sommeil', 'nuit', 'nuits', 'mauvaises nuits', 'dos', 'mal au dos', 'douleur*', 'réveil*', 'réveillez', 'des mois',
        'depuis des mois', 'compote', 'courbatu*', 'fatigu*', 'repos'],
        [produit(['matelas', 'ferme', 'fermeté', 'mémoire de forme', 'ressorts', 'latex', 'sommier', 'oreiller', 'orthopédique', 'ergonomique'],
          'À ce stade, pas de matelas : montrez d’abord que vous avez compris ce qu’il vit.')]),
      { titre: 'Réplique 2 · Tenir compte du signal', champs: ['r2'],
        criteres: [
          { nom: 'Le signal perçu', points: 4, conseil: 'Montrez que vous avez vu sa réaction au prix : « Le prix vous fait réagir ».',
            mots: ['prix', '1 200', '1200', 'budget', 'coût', 'cher', 'investissement', 'somme', 'montant', 'réagir', 'réagit', 'réaction', 'grimace', 'tarif',
              'dépense', 'hésit*', 'surpris', 'étiquette'] },
          { nom: 'Une vérification', points: 3, conseil: 'Vérifiez ce qu’il pense, sans argumenter : « vous voulez être sûr que ça en vaut la peine, c’est ça ? ».',
            mots: ['être sûr', 'vaut la peine', 'en vaut', 'vous voulez', 'vous souhaitez', 'c’est ça', 'est-ce', 'qu’est-ce', 'important', 'pour vous',
              'vous hésitez', 'je comprends', 'compren*', 'vous attendez', 'vos attentes', 'justifié', 'raisonnable'] },
          { nom: 'Tourné vers lui', mots: ['vous', 'votre', 'vos'], points: 1, conseil: 'Parlez de lui : « vous voulez être sûr… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [PIEGE_JUGEMENT, { nom: 'Un argument sur le prix', points: 3, conseil: 'Ne défendez pas le prix : vérifiez d’abord ce que sa réaction veut dire.',
          mots: ['pas si cher', 'pas cher', 'ça vaut le coup', 'qualité', 'garantie', 'remise', 'promotion', 'promo', 'réduction', 'en plusieurs fois', '3 fois',
            'trois fois sans frais', 'sans frais', 'facilité', 'facilités', 'durable', 'dure dix ans', '10 ans', 'rentable', 'je peux vous faire', 'geste commercial'] }] },
      r3([
        ['Son dos et ses nuits', ['dos', 'soulager', 'douleur*', 'nuits', 'nuit', 'sommeil', 'dormir', 'réveil*', 'reposé', 'complètes']],
        ['La fermeté, à deux', ['ferme', 'fermeté', 'votre femme', 'votre épouse', 'épouse', 'madame', 'tous les deux', 'à deux', 'vous deux', 'tous deux']],
        ['Le 140 trop juste', ['140', 'place', 'taille', 'plus grand', 'plus large', '160', 'gêne', 'gênez', 'juste', 'étroit', 'dimension*']],
        ['Un investissement justifié', ['prix', 'budget', '1 200', '1200', 'investissement', 'vaut', 'justifié', 'en vaut la peine', 'coût', 'dépense']]
      ], [produit(['matelas ferme', 'mémoire de forme', 'ressorts', 'latex', 'sommier', 'orthopédique'], 'La synthèse reprend ce qu’il a dit, sans produit.')])
    ],
    // 1 · Mme Lefort, distributeur de pièces auto.
    [
      r1(['pièce', 'pièces', 'manque', 'manquante', 'manquantes', 'pont', 'bloqué', 'bloquée', 'immobilis*', 'voiture', 'livraison', 'livraisons', 'fournisseur',
        'une fois sur trois', 'planning', 'attente', 'attendre', 'retard*', 'atelier'],
        [produit(['nos livraisons', 'livraison garantie', 'nous livrons', 'stock', 'catalogue', 'en 2 heures', 'plateforme', 'commande en ligne'],
          'À ce stade, pas d’offre : montrez d’abord que vous avez compris ce qu’elle vit.'),
          { nom: 'Juger le fournisseur', points: 2, conseil: 'Ne dénigrez pas son fournisseur : parlez de ce qu’elle vit.',
            mots: ['pas sérieux', 'incompétent', 'incompétents', 'ils sont tous pareils', 'changez de fournisseur', 'nul'] }]),
      { titre: 'Réplique 2 · Tenir compte du signal', champs: ['r2'],
        criteres: [
          { nom: 'Le signal perçu', points: 3, conseil: 'Montrez que vous voyez qu’on l’attend : « je vois que l’atelier a besoin de vous ».',
            mots: ['téléphone', 'appel', 'appels', 'atelier', 'occupée', 'besoin de vous', 'vous attend', 'on vous attend', 'on vous appelle', 'mécanicien',
              'sollicit*', 'pas le temps', 'peu de temps', 'votre temps', 'pressée', 'je vois', 'dérange*', 'débordée', 'chargée'] },
          { nom: 'Plus bref, elle garde la main', points: 4, conseil: 'Raccourcissez et laissez-la choisir : « trois questions, ou on cale un autre moment ? ».',
            mots: ['bref', 'brève', 'court', 'courte', 'rapide*', 'vite', 'deux minutes', '2 minutes', 'cinq minutes', 'trois questions', 'une question',
              'deux questions', 'quelques questions', 'je fais court', 'je vais faire court', 'autre moment', 'rappeler', 'rappelle', 'plus tard', 'repasser',
              'rendez-vous', 'quand vous voulez', 'l’essentiel', 'à l’essentiel', 'ça vous va', 'vous préférez', 'si vous préférez', 'quand vous serez'] }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'maxMots:40', nom: 'Une réponse courte', points: 1 }],
        pieges: [{ nom: 'Un argumentaire', points: 3, conseil: 'Elle est pressée : pas de présentation, pas d’argument.',
          mots: ['je vous présente', 'notre entreprise', 'notre société', 'nous existons', 'nos agences', 'notre offre', 'nos tarifs', 'nous livrons',
            'je vous propose', 'notre catalogue'] }] },
      r3([
        ['La fiabilité des livraisons', ['fiabilité', 'fiable', 'fiables', 'livraison', 'livraisons', 'bonne pièce', 'au bon moment', 'à temps', 'sans erreur',
          'complète', 'complètes', 'pièce', 'pièces']],
        ['Le pont immobilisé', ['pont', 'ponts', 'immobilis*', 'bloqué', 'bloquée', 'voiture', 'attente', 'temps perdu', 'du temps']],
        ['Les clients à rappeler', ['clients', 'client', 'rappeler', 'décaler', 'report*', 'image', 'réputation', 'planning', 'rendez-vous']],
        ['Le prix vient après', ['prix', 'tarif', 'coût', 'après', 'secondaire', 'passe après', 'vient après', 'pas la priorité', 'moins important', 'regardez moins']]
      ], [produit(['nos livraisons', 'nous livrons', 'notre stock', 'catalogue'], 'La synthèse reprend ce qu’elle a dit, sans offre.')])
    ],
    // 2 · Mme Duval, mandat de vente.
    [
      r1(['jardin', 'étage', 'escalier', 'escaliers', 'genoux', 'genou', 'entretenir', 'entretien', 'maison', 'monter', 'plus adaptée', 'adaptée', 'trop grande',
        'difficile*', 'au quotidien', 'fatigu*'],
        [produit(['estimation', 'estimer', 'vendre vite', 'acheteur', 'acheteurs', 'mandat', 'visites', 'plain-pied', 'appartement'],
          'À ce stade, pas d’estimation : montrez d’abord que vous avez compris ce qu’elle vit.')]),
      { titre: 'Réplique 2 · Tenir compte du signal', champs: ['r2'],
        criteres: [
          { nom: 'L’émotion reconnue', points: 4, conseil: 'Nommez ce que la maison représente : « une maison pleine de souvenirs ».',
            mots: ['souvenir', 'souvenirs', 'enfants', 'grandi', 'famille', 'familiale', 'photo', 'attach*', 'émotion*', 'votre vie', 'une vie', 'toute une vie',
              'histoire', 'pleine de', 'chargée', 'compte pour vous', 'tient à cœur', 'cœur'] },
          { nom: 'Ralentir, respecter', points: 3, conseil: 'Ralentissez : laissez un silence, reconnaissez que la décision n’est pas facile.',
            mots: ['pas facile', 'pas une décision facile', 'décision', 'difficile', 'prendre le temps', 'prenons le temps', 'votre temps', 'rien ne presse',
              'je comprends', 'compren*', 'silence', 'un temps', 'pause', 'émouvant', 'touchant', 'naturel', 'important'] },
          { nom: 'Tournée vers elle', mots: ['vous', 'votre', 'vos'], points: 1, conseil: 'Parlez d’elle : « vos enfants », « pour vous ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_BANAL, { nom: 'Passer à la vente', points: 3, conseil: 'Ne passez pas à l’estimation : laissez-lui le temps.',
          mots: ['estimation', 'estimer', 'prix', 'vendre vite', 'acheteur', 'acheteurs', 'passons', 'revenons', 'parlons du prix', 'visite', 'mandat'] }] },
      r3([
        ['La maison plus adaptée', ['plus adaptée', 'adaptée', 'jardin', 'étage', 'genoux', 'entretenir', 'entretien', 'trop grande', 'difficile']],
        ['Le fils pressé', ['fils', 'vite', 'rapide', 'rapidement', 'avant l’hiver', 'hiver']],
        ['L’appartement près de sa sœur', ['appartement', 'sœur', 'soeur', 'près de', 'proche', 'installation', 'installer', 'trouvé', 'avant de partir', 'déménag*', 'logement']],
        ['Deux calendriers à coordonner', ['coordonner', 'calendrier', 'calendriers', 'en même temps', 'à la fois', 'organiser', 'les deux', 'd’abord', 'synchronis*',
          'concilier', 'accorder', 'ordre', 'priorité', 'votre priorité', 'pour vous', 'l’essentiel']]
      ], [{ nom: 'Une estimation ou une solution', points: 3, conseil: 'La synthèse reprend ce qu’elle a dit, sans estimation.',
        mots: ['estimation', 'estimer', 'je vous propose', 'acheteurs', 'mandat exclusif', 'prix de vente'] }])
    ]
  ];

  root.ATELIER_GRILLES = {

    // S3 3.1 · L'écho, sur trois clients.
    's3-3.1': { integre: true, blocs: [
      echo('Le cycliste', 'c0_text', ['côte', 'côtes', 'terrible', 'côte terrible', 'montée', 'pente', 'grimpette', 'raide', '25 kilomètres', '25 km',
        'vingt-cinq kilomètres', 'kilomètres', 'à la fin', 'trajet', 'tous les jours', 'par jour']),
      echo('La famille', 'c1_text', ['épuisant', 'épuisante', 'épuisé', 'épuisée', 'épuisés', 'épuisement', 'pas comme l’an dernier', 'l’an dernier',
        'l’année dernière', 'fatigant', 'fatigante', 'crevant', 'en famille']),
      echo('La restauratrice', 'c2_text', ['loterie', 'la loterie', 'toujours la loterie', 'c’est la loterie', 'livraisons', 'livraison', 'au hasard', 'aléatoire',
        'aléatoires', 'imprévisible', 'imprévisibles', 'jamais sûr', 'pas fiable', 'fiables', 'irrégulier*'])
    ] },

    // S3 3.2 · Le reflet, sur trois clients.
    's3-3.2': { integre: true, blocs: [
      reflet('La rénovation', 'c0_text', ['carrelage', 'carrelages', 'trois fois', 'trois', 'coup de cœur', 'coups de cœur', 'plus disponible', 'disponible',
        'rupture', 'épuisé', 'parti', 'déjà vendu', 'trop tard', 'à chaque fois', 'chaque fois', 'passer devant',
        'vous échappe', 'échappe', 'vous filer', 'filer', 'rater', 'ratez', 'manquer', 'perdre', 'perdez']),
      reflet('L’automobiliste', 'c1_text', ['troisième fois', 'trois fois', 'même bruit', 'bruit', 'revenir', 'revenez', 'revenu', 'pour rien', 'réglé',
        'réparé', 'réparation', 'deux jours', 'recommence', 'revient', 'toujours là', 'garage', 'voiture', 'encore', 'à chaque fois', 'problème']),
      reflet('La responsable', 'c2_text', ['deux formations', 'formations', 'formation', 'payé', 'payées', 'dépensé', 'dépenser', 'investi', 'équipes',
        'équipe', 'rien retiré', 'rien apporté', 'servi à rien', 'pour rien', 'l’an dernier', 'argent', 'budget', 'encore', 'de nouveau', 'à nouveau'])
    ] },

    // S3 3.3 · La synthèse, sur deux clients : quatre éléments, puis une validation.
    's3-3.3': { integre: true, blocs: [
      synthese('La gérante', 'c0_text', [
        ['Le téléphone pendant qu’elle coiffe', ['téléphone', 'appels', 'appel', 'répondre au téléphone', 'interrompue', 'interrompre', 'interruption*',
          'dérangée', 'déranger', 'coupée', 'décrocher', 'sonne', 'pendant les coupes', 'pendant qu’elle coiffe', 'en coiffant', 'perdre du temps',
          'perdez du temps', 'temps perdu']],
        ['Les rendez-vous manqués', ['trois clientes', '3 clientes', 'trois par semaine', '3 par semaine', 'rendez-vous manqués', 'rendez-vous non honorés',
          'ne viennent pas', 'ne viennent plus', 'absences', 'absentes', 'lapins', 'oublient', 'oubli*', 'annulations', 'manqués', 'manquent',
          'non honorés', 'par semaine', 'désistements']],
        ['Le planning sur le téléphone des coiffeuses', ['coiffeuses', 'vos coiffeuses', 'cinq coiffeuses', '5 coiffeuses', 'planning', 'agenda',
          'sur leur téléphone', 'leur téléphone', 'portable', 'consulter', 'voir le planning', 'équipe', 'employées', 'salariées', 'collaboratrices']],
        ['Un outil simple', ['simple', 'simples', 'simplicité', 'facile', 'facilement', 'trop compliquée', 'compliqué', 'compliquée', 'pas compliqué',
          'première expérience', 'déjà essayé', 'déjà testé', 'mauvaise expérience', 'application', 'appli', 'prise en main', 'intuitif', 'intuitive']]
      ], paroles(0)),
      synthese('Le restaurateur', 'c1_text', [
        ['Les pannes du week-end', ['panne', 'pannes', 'tombe en panne', 'en panne', 'week-end', 'week-ends', 'weekend', 'fin de semaine', 'le plus de monde',
          'plus de clients', 'affluence', 'coup de feu', 'rush', 'lâche', 'fiable', 'fiabilité', 'casse', 'plante']],
        ['Trois cents cafés par jour', ['trois cents', '300', 'cafés par jour', 'par jour', 'volume', 'beaucoup de cafés', 'cadence', 'quantité', 'débit']],
        ['Des serveurs qui changent', ['serveurs', 'serveur', 'changent', 'turnover', 'nouveaux', 'renouvel*', 'équipe', 'personnel', 'prise en main',
          'prendre en main', 'facile', 'facilement', 'simple', 'simple à utiliser', 'intuitive', 'formation', 'apprendre']],
        ['Peu de place au comptoir', ['place', 'peu de place', 'comptoir', 'derrière le comptoir', 'espace', 'encombrement', 'encombrante', 'compact',
          'compacte', 'petite', 'réduite', 'étroit', 'exigu', 'taille']]
      ], paroles(1))
    ] },

    // S4 4.2 · Vérifier un signal par une question, au lieu de le supposer.
    's4-4.2': { integre: true, blocs: [
      { titre: 'Vérifier un signal', champs: ['c1_verifier'],
        criteres: [
          { nom: 'Un signal du couple', points: 3, conseil: 'Partez d’un signal précis : « pas trop loin », le travail de nuit, les bras croisés, le soupir…',
            mots: ['pas trop loin', 'trop loin', 'loin', 'distance', 'trajet', 'route', 'temps de trajet', 'nuit', 'de nuit', '23 heures', '23 h', 'horaires',
              'hôpital', 'travail', 'gardes', 'téléphone', 'bras croisés', 'bras', 'soupir', 'soupirez', 'silence', 'sèchement', 'habitudes', 'proposition',
              'cette maison', 'la maison', 'monsieur', 'ce qui vous gêne', 'ce qui vous préoccupe', 'préoccupe', 'compte le plus', 'important pour vous'] },
          { nom: 'Une vérification, pas une supposition', points: 3, conseil: 'Demandez-lui : « c’est par rapport à quoi ? », « vous voulez dire… ? ».',
            mots: ['de quoi', 'exactement', 'précisément', 'à quoi', 'par rapport à quoi', 'par rapport à', 'vous voulez dire', 'qu’entendez-vous', 'qu’est-ce que vous entendez', 'c’est-à-dire', 'c’est bien',
              'est-ce que', 'est-ce', 'qu’est-ce qui', 'qu’est-ce que', 'quand vous dites', 'si je comprends', 'ai-je bien compris', 'comment', 'pourquoi',
              'pouvez-vous', 'pourriez-vous', 'dites-moi', 'précisez', 'préciser', 'quel', 'quelle', 'combien', 'est-il', 'est-elle', 'avez-vous', 'vous préoccupe',
              'vous inquiète', 'vous gêne', 'qui compte'] }
        ],
        // Une question courte sans verbe (« Pas trop loin de quoi ? ») est juste : pas de phrase exigée.
        phrases: { points: 0 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 2 }],
        pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT] }
    ] },

    // S4 4.3 · Pourquoi la fin de l'entretien retourne la situation.
    's4-4.3': { integre: true, blocs: [
      { titre: 'Pourquoi la fin de l’entretien change tout', champs: ['c0_pourquoi'],
        criteres: [
          { nom: 'Les mots du client repris', points: 2, conseil: 'Dites que Nadia reprend les mots exacts de M. Benali : « pas trop loin ».',
            mots: ['pas trop loin', 'ses mots', 'ses propres mots', 'mots exacts', 'mots du client', 'reprend', 'reprise', 'répète', 'écho', 'reformul*', 'cite'] },
          { nom: 'M. Benali enfin écouté', points: 2, conseil: 'Dites que Nadia s’adresse enfin à M. Benali, qu’elle avait écarté.',
            mots: ['s’adresse', 'adresse', 'directement', 'monsieur', 'm. benali', 'le mari', 'son mari', 'écarté', 'ignoré', 'oublié', 'inclut', 'implique',
              'entendu', 'écouté', 'considéré', 'pris en compte', 'se sent compris', 'se sent écouté', 'reconnu'] },
          { nom: 'Le vrai besoin découvert', points: 2, conseil: 'Nommez le vrai besoin : la sécurité du trajet de nuit.',
            mots: ['sécurité', 'en sécurité', 'sécuritaire', 'trajet de nuit', 'trajet', 'de nuit', 'endormi', 'endormir', 'fatigue', 'fatigué', 'danger', 'dangereux',
              'accident', 'vingt minutes', '20 minutes', 'hôpital', 'vrai besoin', 'besoin réel', 'véritable besoin', 'vraie raison', 'gardes', 'pas une question d’habitudes'] },
          { nom: 'La synthèse validée', points: 2, conseil: 'Dites que le résumé de Nadia reprend tout et le fait valider par le couple.',
            mots: ['synthèse', 'résume', 'résumé', 'récapitule', 'valide', 'valider', 'validé', 'validée', 'validation', 'confirme', 'confirment', 'c’est bien ça',
              'les deux', 'le couple', 'tous les deux', 'critère', 'critères', 'priorité', 'premier critère', 'hors cible', 'à côté'] },
          { nom: 'L’effet sur le couple', points: 1, conseil: 'Montrez l’effet : il décroise les bras, il se confie.',
            mots: ['décroise', 'bras', 'se détend', 'détend', 'détente', 'confiance', 'se confie', 'confie', 'ouvre', 's’ouvre', 'parle', 'livre', 'explique',
              'raconte', 'apaise', 'tension'] }
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [PIEGE_JUGEMENT] }
    ] },

    // S5 5.1 · A4 : justifier son premier choix par les critères de la grille.
    's5-5.1': { integre: true, blocs: [
      { titre: 'Pourquoi ce premier choix', champs: ['why'],
        criteres: [
          { nom: 'Inès, en premier', points: 2, conseil: 'Nommez le commercial que vous placez en premier : Inès.',
            mots: ['inès', 'ines'] },
          { nom: 'La contrainte de temps', points: 2, conseil: 'Dites qu’elle tient compte du temps de la cliente : « un quart d’heure, c’est noté ».',
            mots: ['temps', 'quart d’heure', 'un quart d’heure', '15 minutes', 'quinze minutes', 'pressée', 'pressé', 'montre', 'essentiel', 'l’essentiel', 'contrainte',
              'délai', 'comité', '11 h', 'onze heures', 'va droit', 'droit au but', 'court', 'brève', 'bref', 'concise', 'concis', 'vite', 'horaire', 'disponibilité'] },
          { nom: 'L’écoute de la cliente', points: 2, conseil: 'Dites qu’elle reformule ce que ressent la cliente, sans juger : « c’est moi qui prends ».',
            mots: ['reformul*', 'reflet', 'ressent', 'ressenti', 'émotion', 'émotions', 'compréhension', 'comprend', 'compris', 'empathie', 'empathique', 'écoute',
              'écouté', 'écoutée', 'pesant', 'pèse', 'première ligne', 'c’est moi qui prends', 'qui prends', 'sans juger', 'ne juge pas', 'ne juge', 'vécu', 'vit',
              'situation', 'frustration', 'stress', 'se sent comprise', 'comprise', 'à sa place'] },
          { nom: 'La découverte ouverte', points: 2, conseil: 'Dites qu’elle ouvre la découverte : ses questions précises (combien de pannes, quels appareils).',
            mots: ['question', 'questions', 'découverte', 'découvrir', 'combien', 'pannes par mois', 'appareils', 'quels appareils', 'cibler', 'cible', 'précise',
              'précises', 'précis', 'creuse', 'creuser', 'en dire plus', 'besoin', 'besoins', 'interroge', 'demande', 'informations', 'chiffres', 'fréquence'] },
          { nom: 'Une comparaison', points: 1, conseil: 'Comparez-la aux deux autres : Thomas parle de lui, Hugo juge et propose une solution.',
            mots: ['seule', 'seul', 'thomas', 'hugo', 'les autres', 'les deux autres', 'contrairement', 'alors que', 'tandis que', 'à la différence', 'au contraire',
              'meilleure note', 'meilleur score', 'plus de points', '7 sur 8', '7/8', '7 / 8', 'note', 'grille', 'critère', 'critères'] }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [
          { nom: 'Une impression, pas un critère', points: 2, conseil: 'Appuyez-vous sur les critères de la grille, pas sur votre impression.',
            mots: ['sympa', 'sympathique', 'gentille', 'agréable', 'polie', 'souriante', 'je la trouve', 'elle a l’air', 'j’aime bien', 'je préfère', 'feeling', 'instinct',
              'impression générale', 'je sens', 'elle me plaît', 'elle est bien'] },
          { nom: 'L’argument d’Hugo', points: 3, conseil: 'Proposer une solution rapide n’est pas écouter : Hugo juge et répond sans connaître le problème.',
            mots: ['intervention', 'en 4 h', '4 heures', 'quatre heures', 'maintenance', 'préventive', 'règle le problème', 'ça règle', 'sûr de lui', 'tous pareils'] },
          { nom: 'La présentation de Thomas', points: 3, conseil: 'Présenter son entreprise n’est pas écouter : Thomas ignore le temps de la cliente.',
            mots: ['1987', '12 agences', 'douze agences', 'son groupe', 'présente son groupe', 'présente son entreprise', 'historique', 'agences'] }
        ] }
    ] },

    // S5 5.2 · A5 : trois répliques par client. La grille dépend de la fiche
    // choisie (`parCas` : 0 literie, 1 pièces auto, 2 mandat de vente).
    's5-5.2': { integre: true, cas: 3, parCas: index => ({ blocs: (A5[index] || A5[0]) }) },

    // S4 4.4 · La réplique « comme tout le monde », réécrite avec une attitude de compréhension.
    's4-4.4': { integre: true, blocs: [
      { titre: 'Votre réplique à la place de celle de Nadia', champs: ['c0_l3'],
        criteres: [
          { nom: 'Le mot du client repris', points: 3, conseil: 'Reprenez le mot de M. Benali : « pas trop loin ».',
            mots: ['pas trop loin', 'trop loin', 'loin', 'distance', 'proximité', 'proche', 'près', 'éloigné', 'trajet'] },
          { nom: 'Une invitation à préciser', points: 3, conseil: 'Invitez-le à préciser : « par rapport à quoi ? ».',
            mots: ['de quoi', 'exactement', 'précisément', 'à quoi', 'surtout', 'par rapport à quoi', 'par rapport à', 'c’est-à-dire', 'qu’entendez-vous', 'vous voulez dire', 'qu’est-ce qui', 'qu’est-ce que', 'pourquoi',
              'comment', 'pouvez-vous', 'pourriez-vous', 'dites-m’en', 'dites-moi', 'précisez', 'préciser', 'quel', 'quelle', 'combien', 'compte', 'important',
              'qui compte', 'préoccupe', 'est-ce que'] },
          { nom: 'Tourné vers M. Benali', points: 1, conseil: 'Adressez-vous à lui : « Monsieur », « pour vous ».',
            mots: ['monsieur', 'pour vous', 'vous', 'votre'] }
        ],
        phrases: { points: 0 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 2 }],
        pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT,
          { nom: 'Le jugement de Nadia', points: 3, mots: ['comme tout le monde', 'soyons réalistes', 'réaliste', 'il faudra', 's’éloigner', 'impossible', 'pas possible',
            'avec votre budget', 'avec 280 000', 'tout le monde veut'], conseil: 'Ne reprenez pas le jugement « comme tout le monde » : écoutez avant de conclure.' }] }
    ] }
  };
})(typeof window !== 'undefined' ? window : globalThis);
