/* GRILLES D'ANALYSE · réponses ouvertes du module 1-1-1.
 *
 * Lues par moteur/js/indicateur.js, qui affiche un indicateur de points en
 * tête du corrigé. Une grille par exercice (clé du catalogue) ; chaque bloc
 * lit un ou plusieurs champs (`champs`, ou `motif` : « line » → line1,
 * line2…) et compte ses critères, ses phrases complètes, ses règles et ses
 * pièges. Le détail de l'écriture des expressions est en tête d'indicateur.js.
 *
 * Les familles de mots communes sont en tête : les enrichir profite à tous
 * les exercices qui les emploient.
 */
(() => {
  'use strict';

  /* ── Familles communes ──────────────────────────────────────────────── */

  const ACCUEIL = ['bonjour', 'bonsoir', 'merci de me recevoir', 'merci de m’accueillir', 'merci pour votre accueil', 'merci de votre accueil',
    'merci de votre temps', 'merci pour votre temps', 'merci d’avoir pris le temps', 'merci de prendre le temps', 'merci de m’accorder',
    'je vous remercie', 'merci beaucoup', 'merci d’être venu', 'merci d’être là', 'merci de votre venue', 'ravi de vous rencontrer',
    'ravie de vous rencontrer', 'ravi de vous voir', 'ravie de vous voir', 'ravi de faire votre connaissance', 'enchanté', 'enchantée',
    'bienvenue', 'soyez le bienvenu', 'soyez la bienvenue', 'content de vous voir', 'contente de vous voir', 'heureux de vous rencontrer',
    'heureuse de vous rencontrer', 'c’est un plaisir', 'avec plaisir', 'installez-vous', 'asseyez-vous', 'prenez place', 'je vous en prie',
    'vous avez trouvé facilement', 'vous allez bien',
    'bonne journée', 'bienvenue chez nous', 'merci d’être passé', 'merci d’être passée', 'merci de nous recevoir', 'merci de votre confiance', 'je suis ravi', 'je suis ravie', 'très heureux', 'très heureuse', 'enchanté de vous rencontrer', 'enchantée de vous rencontrer', 'comment allez-vous', 'merci d’avoir accepté', 'merci pour ce rendez-vous', 'merci de m’avoir reçu', 'merci de m’avoir reçue', 'content de vous rencontrer', 'contente de vous rencontrer', 'je vous remercie de m’accorder', 'c’est un plaisir de vous rencontrer', 'je suis heureux de vous accueillir', 'je suis heureuse de vous accueillir', 'merci d’être venus'];

  const PRESENTATION = ['je suis', 'je m’appelle', 'mon nom est', 'je me présente', 'permettez-moi de me présenter', 'conseiller', 'conseillère',
    'commercial', 'commerciale', 'chargé de clientèle', 'chargée de clientèle', 'chargé d’affaires', 'chargée d’affaires', 'responsable',
    'consultant', 'consultante', 'représentant', 'représentante', 'vendeur', 'vendeuse', 'ingénieur commercial', 'technico-commercial',
    'à l’appareil', 'je travaille chez', 'je travaille pour', 'je représente', 'de la société', 'de l’entreprise', 'de l’agence', 'mon rôle', 'ma fonction',
    'je m’occupe', 'je suis en charge', 'votre interlocuteur', 'votre interlocutrice', 'votre contact', '[prénom', 'prénom nom', '[entreprise',
    'je me permets de me présenter', 'je travaille à', 'je travaille dans', 'je suis le conseiller', 'je suis la conseillère', 'je suis votre conseiller', 'je suis votre conseillère', 'chargé de', 'chargée de', 'je représente la société', 'directeur', 'directrice', 'gérant', 'gérante', 'associé', 'associée', 'expert', 'experte', 'spécialiste', 'agent', 'agente', 'de chez', 'pour le compte de', 'notre société', 'notre entreprise', 'notre agence', 'notre cabinet', 'notre magasin'];

  const CADRAGE = ['je vous propose', 'je propose', 'nous proposons', 'minutes', 'minute', 'min', 'une demi-heure', 'demi-heure', 'un quart d’heure',
    'une heure', 'une vingtaine', 'une trentaine', 'une quinzaine', 'durée', 'le temps de', 'nous avons prévu', 'on a prévu', 'prévu ensemble',
    'd’abord', 'ensuite', 'puis', 'enfin', 'pour commencer', 'dans un premier temps', 'dans un second temps', 'en premier', 'en second',
    'l’objectif', 'objectif', 'le but', 'l’objet', 'ordre du jour', 'déroulé', 'déroulement', 'programme', 'étapes', 'faire le point',
    'faire un point', 'cet échange', 'cet entretien', 'ce rendez-vous', 'notre rendez-vous', 'notre échange', 'notre entretien',
    'ça vous va', 'cela vous va', 'ça vous convient', 'cela vous convient', 'vous convient-il', 'vous convient-elle', 'êtes-vous d’accord',
    'si vous êtes d’accord', 'si cela vous convient', 'si ça vous convient', 'qu’en dites-vous', 'on fait comme ça',
    'nous avons', 'nous disposons de', 'on dispose de', 'en quelques minutes', 'quelques minutes', 'rapidement', 'brièvement', 'en deux temps', 'en trois temps', 'deux étapes', 'trois étapes', 'je vous explique comment', 'voici comment', 'voilà comment', 'le plan', 'le programme', 'ce que je vous propose', 'nous allons', 'on va', 'je vais d’abord', 'ensuite je', 'puis je', 'à la fin', 'pour finir', 'en fin d’entretien', 'avant de', 'après quoi', 'si ça vous va', 'si cela vous va', 'ça vous convient', 'est-ce que ça vous va', 'est-ce que cela vous convient', 'on se donne', 'nous nous donnons', 'combien de temps avez-vous', 'de combien de temps disposez-vous', 'vous avez combien de temps'];

  const ECOUTE = ['je vous écoute', 'vous écouter', 'commencer par vous écouter', 'écouter', 'parlez-moi', 'racontez-moi', 'me raconter',
    'me parler', 'dites-moi', 'expliquez-moi', 'm’expliquer', 'je vous laisse', 'je vous laisse la parole', 'à vous', 'la parole',
    'votre situation', 'vos besoins', 'votre besoin', 'votre projet', 'vos attentes', 'vos priorités', 'vos enjeux', 'votre activité',
    'vos objectifs', 'vos questions', 'votre contexte', 'vos préoccupations', 'ce qui compte', 'ce qui est important pour vous',
    'ce qui vous amène', 'qu’est-ce qui vous amène', 'qu’est-ce qui', 'comprendre', 'mieux comprendre', 'bien comprendre', 'cerner',
    'connaître', 'découvrir', 'vos difficultés', 'vos contraintes', 'votre quotidien', 'où vous en êtes', 'votre point de vue', 'votre avis',
    'je vous laisse me dire', 'je vous laisse m’expliquer', 'je vous laisse me présenter', 'présentez-moi', 'décrivez-moi', 'me décrire', 'me présenter', 'votre besoin', 'ce dont vous avez besoin', 'ce que vous recherchez', 'ce que vous cherchez', 'vous cherchez', 'vous recherchez', 'ce qui vous intéresse', 'ce qui vous préoccupe', 'ce qui vous ferait plaisir', 'vos envies', 'vos attentes', 'vos souhaits', 'votre organisation', 'votre fonctionnement', 'votre équipe', 'votre entreprise', 'votre métier', 'comment ça se passe', 'comment cela se passe', 'comment vous travaillez', 'comment vous faites', 'où en êtes-vous', 'qu’est-ce qui vous a amené', 'qu’est-ce qui vous a amenée', 'pourquoi vous êtes venu', 'pourquoi vous êtes venue', 'je suis là pour vous écouter', 'je suis à votre écoute', 'à votre écoute', 'je vous écoute attentivement', 'votre avis compte', 'donnez-moi votre avis'];

  const REFORMULATION = ['si je comprends bien', 'si j’ai bien compris', 'si je vous suis bien', 'si je vous entends bien', 'autrement dit',
    'en d’autres termes', 'vous voulez dire', 'vous me dites', 'vous dites', 'vous trouvez', 'vous avez l’impression', 'vous préférez',
    'vous souhaitez', 'vous voulez', 'vous aimeriez', 'pour vous', 'c’est bien ça', 'c’est bien cela', 'c’est cela', 'c’est ça',
    'ai-je bien compris', 'est-ce bien cela', 'n’est-ce pas', 'je comprends', 'je comprends que', 'j’entends', 'j’entends que', 'je vois',
    'je note', 'si je résume', 'en résumé', 'pour résumer', 'ce que je retiens', 'ce que j’entends', 'vous ressentez', 'vous vous sentez',
    'vous avez besoin', 'est important pour vous', 'compte pour vous', 'vous tient à cœur', 'vous interpelle', 'vous fait hésiter',
    'vous inquiète', 'vous préoccupe', 'vous rend prudent', 'vous rend prudente', 'vous vous interrogez', 'vous vous demandez',
    'vous hésitez', 'vous doutez', 'vous craignez', 'vous attendez',
    'si j’entends bien', 'si je vous comprends bien', 'si je saisis bien', 'en somme', 'en clair', 'donc vous', 'ainsi vous', 'vous voulez dire que', 'ce que vous me dites', 'ce que vous dites', 'ce que j’entends', 'ce que je comprends', 'vous avez peur', 'vous avez l’impression que', 'vous avez le sentiment', 'vous ne voyez pas', 'vous n’avez pas envie', 'vous avez envie', 'vous voulez être sûr', 'vous voulez être sûre', 'vous voulez être sûrs', 'vous voulez être certain', 'vous voulez être certaine', 'vous souhaitez être sûr', 'votre crainte', 'votre inquiétude', 'votre priorité', 'votre préoccupation', 'vous tenez à', 'vous préféreriez', 'vous ne souhaitez pas', 'vous ne voulez pas', 'pour vous c’est', 'c’est important pour vous', 'vous êtes inquiet', 'vous êtes inquiète', 'vous êtes déçu', 'vous êtes déçue', 'vous êtes content', 'vous êtes contente', 'vous êtes satisfait', 'vous êtes satisfaite', 'vous trouvez que', 'vous pensez que', 'vous estimez', 'vous jugez', 'je reformule', 'pour être sûr de bien comprendre', 'pour être sûre de bien comprendre', 'pour bien comprendre'];

  const QUESTION_OUVERTE = ['qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'sur quoi', 'de quoi',
    'par rapport à quoi', 'dans quelle mesure', 'en quoi', 'à quel point', 'à quoi', 'que pensez-vous', 'qu’en pensez-vous',
    'racontez-moi', 'dites-moi', 'parlez-moi', 'expliquez-moi', 'pourriez-vous préciser', 'précisez',
    'combien', 'savez-vous', 'pourquoi', 'lequel', 'laquelle', 'lesquels', 'lesquelles', 'que se passe', 'qu’arrive-t-il', 'comparez', 'vous le comparez', 'par rapport à', 'qu’attendez-vous', 'que recherchez-vous', 'qu’aimeriez-vous', 'que souhaiteriez-vous', 'que voulez-vous dire', 'c’est-à-dire', 'dites-m’en plus', 'expliquez-moi', 'racontez-moi', 'à quel moment', 'depuis quand', 'de quelle façon', 'de quelle manière', 'sous quelle forme'];

  const PREUVE = ['garantie', 'garanti', '5 ans', 'cinq ans', 'essai', '30 jours', 'trente jours', 'satisfait ou remboursé', 'remboursé',
    'nos clients', 'clients constatent', 'entreprises équipées', 'références', 'référence', 'témoignage', 'témoignages', 'avis clients',
    'étude', 'étude ergonomique', 'chiffres', 'chiffre', 'résultats', 'baisse', 'réduction des arrêts', 'moins d’arrêts', 'arrêts',
    'absences', 'absentéisme', 'tms', 'troubles musculo', 'prévention', 'prévenir', 'retour sur investissement', 'rentabilité', 'rentable',
    'économies', 'économiser', 'sav', '48 h', '48 heures', '1 200', '1200', 'location', 'louer', 'étaler', 'mensualités', 'diagnostic',
    'démonstration', 'exemple', 'concrètement', 'certifié', 'normes', 'productivité', 'confort', 'santé',
    'garantis', 'garantie', 'tester', 'testez', 'essayer', 'essayez', 'diminué', 'baissé', 'en baisse', 'gagnent', 'gagner', 'économisez', 'économiser', 'remboursé', 'remboursée', 'gratuitement', 'offert', 'offerte', 'inclus', 'incluse', 'compris', 'comprise', 'clients satisfaits', 'déjà équipés', 'déjà équipées', 'avis', 'notes', 'prouvé', 'mesuré', 'constaté', 'démontré', 'certifié', 'certification', 'pour cent', 'euros', 'en moyenne', 'chaque année', 'chaque mois', 'par semaine', 'par mois', 'par an', 'depuis', 'ans d’expérience', 'années', 'chiffres à l’appui', 'cas concret', 'exemple concret', 'un client', 'une cliente'];

  // Les marques d'une preuve, quel que soit le secteur.
  const PREUVE_GENERALE = ['en moyenne', 'nos clients', 'clients', 'garantie', 'garanti', 'essai', 'chiffres', 'chiffre', 'résultats', 'concrètement', 'par exemple', 'références', 'témoignages', 'étude', 'gratuit', 'sans engagement', 'économ*', 'rentab*'];

  // Les freins courants derrière un « je vais réfléchir » (S3 1.4).
  const FREINS = [
    // Le prix
    'prix', 'budget', 'coût', 'cher', 'argent', 'tarif', 'moyens', 'financ*', 'trésorerie', 'dépense', 'investissement', 'rentab*', 'payer', 'facture', 'montant',
    // Une décision qui ne lui appartient pas seul
    'décider seul', 'seul', 'direction', 'hiérarchie', 'patron', 'chef', 'associé', 'associée', 'conjoint', 'conjointe', 'femme', 'mari', 'banque', 'banquier', 'comptable', 'conseil d’administration', 'en parler à', 'valider', 'validation', 'accord de', 'feu vert', 'qui d’autre', 'qui décide', 'interne',
    // L'utilité, le besoin
    'utile', 'utilité', 'besoin', 'pas convaincu', 'pas convaincue', 'convaincu', 'convaincue', 'intérêt', 'apporter', 'valeur', 'pertinent', 'nécessaire', 'pas sûr', 'pas sûre',
    // La peur de se tromper
    'peur', 'crainte', 'craint', 'se tromper', 'erreur', 'regretter', 'regret', 'risque', 'risqué', 'inquiet', 'inquiète', 'angoisse', 'engager', 'engagement',
    // La concurrence
    'comparer', 'compare', 'comparaison', 'concurrent', 'concurrence', 'autre offre', 'autre proposition', 'autre devis', 'ailleurs', 'autres fournisseurs',
    // Le moment, les priorités
    'priorité', 'prioritaire', 'urgence', 'urgences', 'moment', 'calendrier', 'pas le temps', 'débordé', 'débordée', 'occupé', 'occupée', 'charge', 'saison', 'plus tard',
    // La mise en place
    'mise en place', 'mise en œuvre', 'installation', 'compliqué', 'complexe', 'changement', 'changer', 'habitudes', 'temps à y consacrer', 'formation',
    // La confiance
    'confiance', 'méfiant', 'méfiante', 'méfiance', 'mauvaise expérience', 'déçu', 'déçue', 'fournisseur', 'promesses', 'sérieux',
    // Les informations
    'informations', 'information', 'renseignements', 'détails', 'précisions', 'comprendre', 'pas compris', 'flou', 'clair'
  ];

  const CONTROLE = ['est-ce que cela répond', 'est-ce que ça répond', 'cela répond-il', 'cela répond à', 'ça répond à', 'cela vous rassure',
    'ça vous rassure', 'cela vous parle', 'ça vous parle', 'qu’en pensez-vous', 'qu’en dites-vous', 'est-ce plus clair', 'est-ce que c’est plus clair',
    'cela vous convient', 'ça vous convient', 'est-ce que cela vous convient', 'avez-vous d’autres questions', 'd’autres questions',
    'cela lève', 'est-ce que cela lève', 'êtes-vous rassuré', 'êtes-vous rassurée', 'ai-je répondu', 'est-ce que j’ai répondu',
    'cela vous semble', 'ça vous semble', 'vous semble-t-il', 'est-ce que cet angle', 'cet angle', 'votre préoccupation', 'votre question',
    'paraît', 'vous paraît', 'ça vous paraît', 'cela vous paraît', 'est-ce plus clair', 'plus clair', 'vous aidera', 'cela vous aide', 'ça vous aide', 'est-ce que je réponds', 'est-ce que ça répond', 'êtes-vous d’accord', 'vous êtes d’accord', 'est-ce que ça vous va', 'ça vous va', 'cela vous va', 'est-ce cohérent', 'est-ce que cela a du sens', 'ça a du sens', 'ça vous convainc', 'cela vous convainc', 'convaincu', 'convaincue', 'rassuré', 'rassurée', 'rassure', 'vous rassure', 'raisonnable', 'est-ce que c’est clair', 'c’est clair pour vous', 'avez-vous des questions', 'des questions', 'reste-t-il un doute', 'un doute', 'une réserve', 'd’autres réserves', 'quelque chose qui vous gêne', 'qui vous retient encore', 'qu’est-ce qui vous retient', 'vous retient', 'que vous en semble', 'votre sentiment', 'votre avis', 'vous voyez', 'vous suivez', 'ça tient la route', 'est-ce que ça vous parle', 'utile', 'intéressant pour vous', 'vous intéresse'];

  const SUITE = ['je vous propose', 'nous pourrions', 'on pourrait', 'prochaine étape', 'la suite', 'rendez-vous', 'on fixe', 'fixons',
    'on planifie', 'planifions', 'organiser', 'organisons', 'diagnostic', 'gratuit', 'démonstration', 'essai', 'visite', 'présentation',
    'rencontre', 'rencontrer', 'cette semaine', 'la semaine prochaine', 'demain', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
    'date', 'créneau', 'agenda', 'calendrier', 'je vous envoie', 'je vous rappelle le', 'on continue', 'on avance', 'avançons',
    'je peux passer', 'passer', 'on peut se voir', 'se voir', 'venez', 'je vous ouvre', 'on fixe', 'fixer', 'prenez-le', 'prenez-la', 'on en reparle', 'je reviens vers vous', 'je vous rappelle', 'je vous recontacte', 'je vous envoie', 'je vous prépare', 'je vous adresse', 'prochain rendez-vous', 'la semaine prochaine', 'ce soir', 'matin', 'après-midi', 'en fin de journée', 'quel jour', 'quelle date', 'quel moment', 'ça vous irait', 'cela vous irait', 'vous serait-il possible', 'seriez-vous disponible', 'êtes-vous disponible', 'on se rappelle', 'on se retrouve', 'retrouvons-nous', 'je bloque', 'je réserve', 'réservons', 'commençons par', 'première étape', 'pour avancer', 'pour aller plus loin', 'mettre en place', 'démarrer', 'lancer'];

  const RAISON = ['parce que', 'car', 'puisque', 'comme', 'ce qui', 'cela', 'ça permet', 'cela permet', 'permet de', 'permet', 'afin de',
    'pour que', 'donc', 'ainsi', 'c’est pourquoi', 'en effet', 'grâce à', 'cela montre', 'ce qui montre', 'cela évite', 'ce qui évite'];

  /* ── Pièges communs ─────────────────────────────────────────────────── */

  const PIEGE_PRODUIT = { nom: 'Le produit arrive trop tôt', points: 1,
    mots: ['notre meilleure offre', 'offre exceptionnelle', 'offres intéressantes', 'en promotion', 'promo', 'remise', 'le moment ou jamais',
      'il faut que je vous montre', 'je vais vous présenter nos', 'je vais vous montrer nos', 'nos produits', 'nos solutions sont',
      'vous allez adorer', 'c’est le meilleur', 'notre formule premium', 'je vais vous vendre'],
    conseil: 'En ouverture, on écoute avant de présenter une offre.' };

  const PIEGE_FAMILIER = { nom: 'Registre familier', points: 1,
    mots: ['ouais', 'bon écoutez', 'alors voilà', 'ben', 'euh', 'genre', 'trop bien', 'super cool', 'salut', 'coucou', 'ok ok', 'bah'],
    conseil: 'Gardez un registre professionnel dès les premiers mots.' };

  const PIEGE_JUGEMENT = { nom: 'Jugement', points: 1,
    mots: ['vous avez tort', 'vous vous trompez', 'c’est faux', 'n’importe quoi', 'je comprends mais', 'oui mais', 'certes mais',
      'la qualité a un prix', 'il ne faut pas', 'vous auriez dû', 'c’est dommage', 'c’est une erreur', 'vous exagérez'],
    conseil: 'On reformule sans approuver ni désapprouver.' };

  const PIEGE_SOLUTION = { nom: 'Solution trop rapide', points: 1,
    mots: ['vous devriez', 'je vous conseille', 'je vous recommande', 'à votre place', 'il vous faut', 'prenez la formule', 'notre offre',
      'entrée de gamme', 'je vais vous montrer', 'je vais vous expliquer', 'la solution c’est', 'je vous fais une remise', 'remise',
      'réduction', 'rabais', 'geste commercial'],
    conseil: 'On comprend d’abord ; la solution viendra ensuite.' };

  const PIEGE_MINIMISE = { nom: 'Le ressenti est minimisé', points: 1,
    mots: ['ne vous inquiétez pas', 'ne vous en faites pas', 'tout le monde dit ça', 'tout le monde', 'c’est rien', 'ce n’est rien',
      'c’est très simple', 'c’est pas grave', 'ce n’est pas grave', 'vous allez voir', 'c’est différent'],
    conseil: 'Nommez le ressenti au lieu de le minimiser.' };

  const PIEGE_INTERPRETATION = { nom: 'Interprétation', points: 1,
    mots: ['en fait vous', 'au fond', 'ce qui vous bloque', 'pas le budget', 'vous n’avez pas le budget', 'c’est que vous', 'en réalité vous',
      'vous voulez surtout', 'je pense que vous'],
    conseil: 'Reprenez ses mots, sans ajouter ce qu’il n’a pas dit.' };

  /* ── Critères réutilisés ────────────────────────────────────────────── */

  const accueil = { nom: 'Accueil et climat', mots: ACCUEIL, conseil: 'Saluez et remerciez avant toute chose.' };
  const presentation = { nom: 'Présentation', mots: PRESENTATION, conseil: 'Dites qui vous êtes, votre fonction et votre entreprise.' };
  const cadrage = { nom: 'Cadrage', mots: CADRAGE, conseil: 'Annoncez l’objet, le déroulé ou la durée de l’échange.' };
  const ecoute = { nom: 'Transition vers l’écoute', mots: ECOUTE, conseil: 'Donnez la parole au client avant de parler de l’offre.' };
  const reformulation = { nom: 'Reformulation', mots: REFORMULATION, conseil: 'Reprenez ce que dit le client : « Si je comprends bien… ».' };
  const raison = { nom: 'Justification', mots: RAISON, conseil: 'Expliquez pourquoi : « parce que… », « ce qui permet… ».' };

  /* Une ouverture complète, réécrite (S1 A, S4 1.2). */
  const ouvertureComplete = {
    criteres: [accueil, presentation, cadrage, ecoute],
    phrases: { attendues: 3, points: 2 },
    regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
    pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER]
  };

  /* Une reformulation de compréhension, sur une réplique donnée. */
  const reformuler = (titre, champ, sujet) => ({
    titre, champs: [champ],
    criteres: [reformulation, { nom: 'Les mots du client repris', mots: sujet, conseil: 'Reprenez le sujet exact de sa phrase.' }],
    phrases: { attendues: 1, points: 1 },
    // Ici, chaque glissement est l'erreur visée : il coûte deux points.
    pieges: [PIEGE_JUGEMENT, PIEGE_SOLUTION, PIEGE_MINIMISE, PIEGE_INTERPRETATION].map(piege => ({ ...piege, points: 2 }))
  });

  /* ── Les grilles ────────────────────────────────────────────────────── */

  window.ATELIER_GRILLES = {

    // S1 A · Analyser l'accroche de Camille, puis la réécrire.
    's1-A': { blocs: [
      { titre: 'Ce qui fonctionne', champs: ['strengths'],
        criteres: [
          { nom: 'La salutation repérée', mots: ['bonjour', 'salutation', 'salue', 'politesse', 'poli', 'polie', 'courtois', 'courtoise'], conseil: 'L’accroche commence bien par une salutation.' },
          { nom: 'La présentation repérée', mots: ['présente', 'présentation', 'identité', 'nom', 'prénom', 'fonction', 'entreprise', 'camille', 'novéa', 'conseillère', 'qui elle est'], conseil: 'Camille dit qui elle est et pour qui elle travaille.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Axes d’amélioration', champs: ['improvements'],
        criteres: [
          { nom: 'Mise à l’aise', mots: ['remerci*', 'merci', 'mise à l’aise', 'mettre à l’aise', 'climat', 'chaleur', 'chaleureu*', 'sourire', 'accueil'], conseil: 'Il manque un remerciement, une mise à l’aise.' },
          { nom: 'Cadrage absent', mots: ['cadrage', 'cadrer', 'durée', 'minutes', 'temps', 'déroulé', 'déroulement', 'objectif', 'ordre du jour', 'structure'], conseil: 'Ni durée ni déroulé ne sont annoncés.' },
          { nom: 'Produit trop tôt', mots: ['produit', 'offre', 'offres', 'présenter', 'je vais vous présenter', 'vend*', 'pousse*', 'solutions', 'trop vite', 'trop tôt', 'directement'], conseil: 'Elle parle de ses offres avant d’écouter.' },
          { nom: 'Pas d’écoute', mots: ['écoute', 'écouter', 'question', 'parole', 'besoin*', 'transition', 'laisser parler', 'découverte'], conseil: 'Le client n’a pas la parole.' },
          { nom: 'Formule vague', mots: ['vague', 'flou', 'floue', 'imprécis', 'imprécise', 'pourrait vous convenir', 'précis', 'concret', 'générique'], conseil: '« Ce qui pourrait vous convenir » reste vague.' }
        ],
        phrases: { attendues: 2, points: 1 } },
      { titre: 'Votre version améliorée', champs: ['rewrite'], ...ouvertureComplete }
    ] },

    // S1 B · Boutique, client pressé : une ouverture courte, non intrusive.
    's1-B': { blocs: [
      { titre: 'Votre entrée en matière', champs: ['opening'],
        criteres: [
          accueil,
          { nom: 'Respect de son rythme', mots: ['à votre rythme', 'je vous laisse', 'prenez votre temps', 'tranquillement', 'sans vous presser',
            'regarder', 'faire un tour', 'librement', 'jeter un œil', 'je reste', 'à côté', 'dans les parages', 'à disposition', 'à votre disposition',
            'au moindre besoin', 'si besoin', 'si vous avez besoin', 'n’hésitez pas', 'rapidement', 'en deux mots', 'je ne vous retiens pas',
            'je ne vous dérange pas', 'pas de souci', 'aucun souci'], conseil: 'Montrez que vous respectez son peu de temps.' },
          { nom: 'Présentation légère', mots: ['je suis', 'je m’appelle', 'conseiller', 'conseillère', 'vendeur', 'vendeuse', 'ici', 'du magasin', 'de la boutique'], conseil: 'Une présentation en quelques mots suffit.' },
          { nom: 'Le choix laissé au client', mots: ['vous préférez', 'vous cherchez', 'quelque chose de précis', 'je peux vous aider', 'puis-je vous aider', 'voulez-vous', 'souhaitez-vous', 'si vous voulez', 'comme vous voulez'], conseil: 'Laissez-lui le choix : être aidé ou regarder seul.' }
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [PIEGE_PRODUIT, { nom: 'Trop insistant', points: 1, mots: ['pourquoi', 'vous devriez', 'il faut absolument', 'prenez le temps de regarder', 'vous avez tort'], conseil: 'Ne retenez pas un client pressé.' }] },
      { titre: 'Votre réglage majeur', champs: ['adjustment'],
        criteres: [
          { nom: 'Le réglage nommé', mots: ['court', 'courte', 'bref', 'brève', 'rapide', 'concis', 'concise', 'rythme', 'pressé', 'temps', 'laisser',
            'liberté', 'non intrusif', 'non intrusive', 'discret', 'discrète', 'retenir', 'choix', 'disponible', 'disponibilité', 'adapt*', 'ajust*', 'raccourci*', 'simplifi*'], conseil: 'Nommez ce que vous avez changé : plus court, moins intrusif…' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S1 C · Comparer deux ouvertures : 3 à 5 arguments, puis un emprunt.
    's1-C': { blocs: [
      { titre: 'Vos arguments', motif: 'argument',
        criteres: [
          { nom: 'Cadrage', mots: ['cadrage', 'cadre', 'durée', '30 minutes', 'minutes', 'déroulé', 'déroulement', 'd’abord', 'ensuite', 'structur*', 'annonce', 'à quoi s’attendre', 'organis*'], conseil: 'L’ouverture 1 annonce la durée et le déroulé.' },
          { nom: 'Écoute avant présentation', mots: ['écoute', 'écouter', 'je vous écoute', 'parole', 'besoin*', 'découv*', 'situation', 'avant de présenter', 'avant de pousser', 'avant de parler', 'laisse parler', 'parler de sa situation'], conseil: 'Elle donne la parole avant de présenter.' },
          { nom: 'Recherche d’accord', mots: ['ça vous va', 'accord', 'valid*', 'consentement', 'avis', 'implique', 'impliquer', 'demande', 'vérifie', 'approbation'], conseil: '« Ça vous va ? » cherche l’accord du client.' },
          { nom: 'Posture centrée client', mots: ['centré', 'centrée', 'orienté client', 'orientée client', 'posture', 'parle de lui', 'parle d’elle', 'se met en avant', 'le vendeur', 'ses résultats', 'monopolise', 'client'], conseil: 'Comparez la place laissée au client.' },
          { nom: 'Comparaison', mots: ['alors que', 'contrairement', 'tandis que', 'à l’inverse', 'au contraire', 'ouverture 2', 'la deuxième', 'la seconde', 'l’autre', 'par rapport', 'plus', 'moins'], min: 2, conseil: 'Mettez les deux ouvertures face à face.' },
          raison
        ],
        phrases: { attendues: 3, points: 2 } },
      { titre: 'Votre emprunt', champs: ['borrow'],
        criteres: [
          { nom: 'L’élément emprunté', mots: ['référence*', 'clients', 'entreprises comme la vôtre', 'plusieurs entreprises', 'résultats', 'preuve', 'crédib*', 'témoignage', 'exemple*', 'déjà accompagné', 'accompagne déjà', 'expérience', 'confiance'], conseil: 'L’ouverture 2 cite des clients similaires : une preuve sociale.' },
          { nom: 'Comment vous l’intégrez', mots: ['j’ajouterais', 'j’intégrerais', 'je reprendrais', 'je glisserais', 'j’emprunterais', 'je mettrais', 'ajouter', 'intégrer', 'insérer', 'placer', 'après', 'avant', 'brièvement', 'en une phrase', 'au moment', 'juste après'], conseil: 'Dites où et comment vous le placeriez.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S1 D · Rédiger une ouverture phrase par phrase.
    's1-D': { blocs: [
      { titre: 'Votre ouverture', motif: 'line',
        criteres: [accueil, presentation, cadrage, ecoute],
        phrases: { attendues: 4, points: 2 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
        pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER] }
    ] },

    // S1 E1 · Visio : le prospect coupe sa caméra.
    's1-E1': { blocs: [
      { champs: ['response'],
        criteres: [
          { nom: 'La situation reconnue', mots: ['caméra', 'image', 'on ne se voit pas', 'sans image', 'à l’oral', 'oral', 'voix', 'je vous entends', 'vous entendre', 'coupé', 'pas de souci', 'aucun souci', 'pas de problème', 'très bien', 'tout à fait', 'aucun problème', 'on continue'], conseil: 'Reconnaissez simplement le changement.' },
          { nom: 'Cadrage à l’oral', mots: CADRAGE, conseil: 'Sans image, annoncez le déroulé à voix haute.' },
          { nom: 'Invitation à réagir', mots: ['n’hésitez pas', 'dites-moi', 'interrompre', 'interrompez', 'arrêter', 'réagir', 'réagissez', 'quand vous voulez', 'à tout moment', 'si je vais trop vite', 'préciser', 'coupez-moi'], conseil: 'Invitez-le à réagir à la voix.' },
          { nom: 'Une question sur sa priorité', mots: ECOUTE, conseil: 'Posez une question courte sur ce qui compte pour lui.' }
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [{ nom: 'Exiger la caméra', points: 2, mots: ['rallumer', 'rallumez', 'allumer votre caméra', 'activer votre caméra', 'activez', 'remettre la caméra', 'remettez', 'pourriez-vous allumer', 'il faudrait la caméra', 'mettre la caméra'], conseil: 'N’exigez pas qu’il rallume sa caméra.' }] }
    ] },

    // S1 E2 · L'ultimatum : 40 secondes pour obtenir un rendez-vous.
    's1-E2': { blocs: [
      { champs: ['proposal'],
        criteres: [
          { nom: 'Accroche claire', mots: ['bonjour', 'je suis', 'je m’appelle', 'de ergolys', 'chez ergolys', 'ergolys', 'commercial', 'commerciale', 'conseiller', 'conseillère'], conseil: 'Dites tout de suite qui vous êtes.' },
          { nom: 'Valeur pour la cliente', mots: ['vous aider', 'aider', 'aidons', 'permet', 'gagner', 'économiser', 'économies', 'réduire', 'réduction', 'améliorer', 'bénéfice', 'confort',
            'santé', 'dos', 'arrêts', 'arrêts maladie', 'absences', 'absentéisme', 'tms', 'productivité', 'bien-être', 'salariés', 'équipes', 'collaborateurs', 'coûts', 'efficacité', 'résultats', 'concret*', 'prévenir', 'prévention'], min: 2, conseil: 'Dites ce que la cliente peut y gagner, concrètement.' },
          { nom: 'Suite proposée', mots: ['je vous propose', 'rendez-vous', '10 minutes', 'dix minutes', 'on continue', 'on en parle', 'on fixe', 'ça vous va', 'êtes-vous d’accord', 'd’accord', 'prochaine', 'rencontrer', 'démonstration', 'essai', 'quand', 'créneau', 'cette semaine'], conseil: 'Proposez clairement de poursuivre.' },
          { nom: 'Le sujet nommé', mots: ['siège*', 'sièges', 'fauteuil*', 'chaise*', 'ergonom*', 'bureau', 'poste de travail', 'postes'], conseil: 'Nommez ce que vous vendez.' }
        ],
        phrases: { attendues: 2, points: 1 },
        regles: [{ regle: 'maxMots:90', nom: '90 mots au plus', points: 1 }],
        pieges: [PIEGE_FAMILIER] }
    ] },

    // S1 E3 · Agence de décoration : entrer en matière sans question.
    's1-E3': { blocs: [
      { champs: ['opening'],
        criteres: [
          accueil,
          { nom: 'Prise d’initiative', mots: ['je vous propose', 'je propose', 'proposons', 'prenons', 'commençons', 'nous allons', 'on va', 'je vais', 'permettez-moi', 'allons-y', 'laissez-moi', 'je commence', 'nous commençons', 'voici comment', 'nous pouvons'], conseil: 'Ouvrez par une proposition : « Je vous propose de… ».' },
          { nom: 'Invitation à parler', mots: ['je vous laisse', 'je vous écoute', 'racontez-moi', 'parlez-moi', 'me raconter', 'me parler', 'me dire', 'me décrire', 'décrivez-moi', 'votre projet', 'votre salon', 'vos envies', 'vos goûts', 'votre intérieur', 'vos idées', 'ce que vous imaginez', 'ce que vous aimez', 'votre style', 'vos attentes', 'votre situation'], conseil: 'Sans question, invitez-la quand même à s’exprimer.' },
          { nom: 'Climat positif', mots: ['ravi', 'ravie', 'plaisir', 'heureux', 'heureuse', 'enchanté', 'enchantée', 'merci', 'bienvenue', 'installez-vous', 'agréable', 'ensemble', 'avec vous', 'tranquillement', 'prendre le temps'], conseil: 'Un mot chaleureux installe le climat.' },
          { nom: 'Présentation', mots: PRESENTATION.concat(['atelier teinte', 'décoratrice', 'décorateur', 'architecte d’intérieur']), conseil: 'Dites qui vous êtes.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'sansQuestion', nom: 'Sans question', points: 2 }],
        pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER] }
    ] },

    // S1 F · Transposer l'ouverture au téléphone, puis par e-mail.
    's1-F': { blocs: [
      { titre: 'Au téléphone', champs: ['phone'],
        criteres: [
          { nom: 'Identité vérifiée', mots: ['suis-je bien', 'je suis bien', 'bien avec', 'êtes-vous bien', 'c’est bien', 'je parle bien', 'monsieur', 'madame', '[nom'], conseil: 'Vérifiez que vous parlez à la bonne personne.' },
          presentation,
          { nom: 'Raison de l’appel', mots: ['je vous appelle', 'au sujet de', 'concernant', 'à propos de', 'pour vous parler', 'suite à', 'l’objet de mon appel', 'je me permets', 'mon appel'], conseil: 'Dites tout de suite pourquoi vous appelez.' },
          { nom: 'Disponibilité', mots: ['bon moment', 'un moment', 'avez-vous', 'quelques minutes', 'deux minutes', '2 minutes', 'disponible', 'je vous dérange', 'rappeler', 'préférez-vous', 'plus tard'], conseil: 'Demandez si c’est un bon moment.' },
          ecoute
        ],
        phrases: { attendues: 3, points: 1 } },
      { titre: 'L’objet de l’e-mail', champs: ['subject'],
        criteres: [{ nom: 'Un objet clair', mots: ['échange', 'rendez-vous', 'rencontre', 'min', 'minutes', 'proposition', 'votre', 'projet', 'appel', 'entretien', 'point', 'demande', 'question'], conseil: 'Un objet court qui dit le sujet et l’intention.' }],
        phrases: { points: 0 } },
      { titre: 'Le message', champs: ['email'],
        criteres: [
          { nom: 'Formule d’appel', mots: ['bonjour', 'madame', 'monsieur', 'cher', 'chère'], conseil: 'Commencez par « Bonjour [Nom] ».' },
          presentation,
          { nom: 'Raison du message', mots: ['je me permets', 'au sujet de', 'concernant', 'je vous écris', 'suite à', 'à propos de'], conseil: 'Dites pourquoi vous écrivez.' },
          { nom: 'Écoute annoncée', mots: ['comprendre', 'vos priorités', 'votre situation', 'vos besoins', 'vous écouter', 'échanger', 'vos attentes', 'votre avis'], conseil: 'Annoncez que vous voulez d’abord comprendre.' },
          { nom: 'Durée et créneau', mots: ['minutes', 'créneau', 'disponible', 'disponibilité', 'semaine', 'date', 'quand', 'rendez-vous', 'échange de', 'appel de'], conseil: 'Proposez une durée et demandez un créneau.' },
          { nom: 'Formule de politesse', mots: ['cordialement', 'bien à vous', 'belle journée', 'bonne journée', 'dans l’attente', 'au plaisir', 'salutations', 'bien cordialement'], conseil: 'Terminez par une formule de politesse.' }
        ],
        phrases: { attendues: 3, points: 1 },
        regles: [{ regle: 'minMots:80', nom: '80 mots au moins', points: 1 }, { regle: 'maxMots:120', nom: '120 mots au plus', points: 1 }] }
    ] },

    // S2 A · Justifier son choix de réponse, client par client.
    's2-A': { blocs: [
      ['Client pressé', ['temps', 'pressé', 'rythme', 'laisser', 'liberté', 'disponible', 'cadre', 'coup de vent', 'respecte', 'n’impose pas']],
      ['Client méfiant', ['méfi*', 'doute', 'expérience', 'confiance', 'prudent', 'ressenti', 'nomme', 'sceptique', 'déçu', 'mauvaise expérience']],
      ['Client novice', ['peur', 'rassur*', 'soutien', 'accompagn*', 'ensemble', 'normal', 'perdu', 'se tromper', 'rythme', 'ressenti']]
    ].map(([titre, sujet], i) => ({
      titre, champs: [`why${i}`],
      criteres: [
        { nom: 'L’attitude nommée', mots: ['compréhension', 'reformul*', 'comprend*', 'écoute', 'respect*', 'empathie', 'empathique', 'bienveillan*'], conseil: 'Nommez l’attitude de la bonne réponse.' },
        { nom: 'Le lien avec ce client', mots: sujet, conseil: 'Reliez votre choix à ce que vit ce client.' },
        { nom: 'Les autres réponses écartées', mots: ['juge*', 'jugement', 'minimis*', 'solution', 'intrusi*', 'prématur*', 'pousse*', 'interpr*', 'ferme', 'force', 'impose', 'trop tôt', 'les autres'], conseil: 'Dites pourquoi les autres réponses ferment la relation.' },
        raison
      ],
      phrases: { attendues: 1, points: 1 }
    })) },

    // S2 B · Réécrire 4 fausses reformulations sur « un peu chère ».
    's2-B': { blocs: [0, 1, 2, 3].map(i =>
      reformuler(`Réplique ${i + 1}`, `rewrite${i}`, ['prix', 'cher', 'chère', 'tarif', 'coût', 'montant', 'investissement', 'rapport prix', 'valeur', 'élevé'])) },

    // S2 D · Une réponse par attitude de Porter, puis le choix justifié.
    // Le score est intégré aux blocs du corrigé (s2-d.js).
    's2-D': { integre: true, blocs: [
      { titre: 'Jugement / évaluation', champs: ['reply0'], criteres: [{ nom: 'Une évaluation', mots: ['vous avez raison', 'vous avez tort', 'c’est bien', 'c’est une erreur', 'c’est sage', 'c’est dommage', 'bonne idée', 'mauvaise idée', 'c’est raisonnable', 'c’est prudent', 'vous faites bien', 'il ne faut pas', 'sage', 'excellent', 'dommage', 'erreur', 'bien vu', 'raisonnable', 'prudent', 'prudente', 'sage', 'bravo', 'très bien', 'je trouve que', 'je pense que c’est', 'à mon avis', 'je vous félicite', 'c’est la bonne attitude', 'vous avez bien fait', 'c’est judicieux', 'judicieux', 'pertinent', 'c’est malin', 'c’est une mauvaise', 'c’est une bonne', 'vous faites erreur', 'vous risquez', 'ce serait une erreur', 'vous allez le regretter', 'regretter', 'c’est dommage', 'quel dommage', 'vous avez parfaitement raison', 'absolument raison', 'je vous approuve', 'je ne suis pas d’accord', 'vous ne devriez pas', 'à la légère', 'je comprends que ce soit', 'admirable', 'responsable', 'c’est intelligent', 'c’est risqué', 'imprudent', 'c’est le bon réflexe', 'bonne décision', 'mauvaise décision', 'vous passez à côté', 'rater', 'belle occasion'], conseil: 'Approuvez ou désapprouvez : « Vous avez raison… ».' }] },
      { titre: 'Interprétation', champs: ['reply1'], criteres: [{ nom: 'Une explication à sa place', mots: ['en fait', 'au fond', 'c’est que', 'ce qui vous', 'vous n’êtes pas', 'vous avez peur', 'vous doutez', 'pas convaincu', 'vous craignez', 'je pense que vous', 'sûrement', 'sans doute', 'j’imagine que', 'en réalité', 'je crois que vous', 'vous devez', 'vous voulez comparer', 'comparer', 'vous attendez', 'quelque chose vous', 'c’est le prix', 'le prix vous', 'vous retient', 'qui vous retient', 'vous inquiète', 'vous hésitez parce', 'si vous', 'c’est parce que', 'parce que vous', 'probablement', 'certainement', 'visiblement', 'manifestement', 'on dirait que', 'j’ai l’impression que vous', 'vous êtes méfiant', 'vous êtes méfiante', 'vous avez été déçu', 'vous avez été déçue', 'déçu', 'déçue', 'le vrai problème', 'la vraie raison', 'ce n’est pas le temps', 'vous cherchez', 'vous préférez sans doute', 'quelqu’un', 'en parler à', 'concurrence', 'concurrent', 'budget', 'pas les moyens', 'vous n’osez pas'], conseil: 'Expliquez à sa place : « En fait, vous… ».' }] },
      { titre: 'Soutien / consolation', champs: ['reply2'], criteres: [{ nom: 'Un réconfort', mots: ['ne vous inquiétez pas', 'rien ne presse', 'prenez votre temps', 'pas de souci', 'c’est normal', 'aucun problème', 'je suis là', 'ne vous en faites pas', 'tout va bien', 'on a le temps', 'aucune pression', 'pas de pression', 'soyez tranquille', 'tranquille', 'rassurez-vous', 'rassurez vous', 'aucune urgence', 'pas d’urgence', 'il n’y a pas d’urgence', 'tout votre temps', 'à votre disposition', 'je reste disponible', 'quand vous serez prêt', 'quand vous serez prête', 'beaucoup de clients', 'tout le monde', 'c’est bien normal', 'c’est tout à fait normal', 'pas de problème', 'il n’y a pas de mal', 'ça arrive à tout le monde', 'je comprends tout à fait', 'courage', 'tout ira bien', 'l’offre reste valable', 'reste valable', 'rien ne vous oblige', 'aucune obligation', 'sans obligation', 'on n’est pas pressé', 'on n’est pas pressés', 'détendez-vous', 'pas de stress', 'zen'], conseil: 'Rassurez : « Rien ne presse… ».' }] },
      { titre: 'Investigation / enquête', champs: ['reply3'], criteres: [{ nom: 'Une question pour en savoir plus', mots: QUESTION_OUVERTE.concat(['pourquoi', 'combien', 'quand', 'avez-vous besoin', 'besoin de', 'qui d’autre', 'qui doit', 'quand pensez-vous', 'est-ce que', 'avez-vous', 'souhaitez-vous', 'voulez-vous', 'pouvez-vous', 'pourriez-vous', 'informations', 'quels éléments', 'quelles informations', 'de quoi', 'à quel moment', 'd’ici quand', 'combien de temps', 'sur quels points', 'qu’est-ce qui vous', 'qu’attendez-vous', 'que vous faudrait-il', 'que faudrait-il', 'dites-moi', 'expliquez-moi', 'racontez-moi', 'pour quelle raison', 'en quoi']), conseil: 'Posez une question : « Qu’est-ce qui… ? ».' }], regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: 'Solution / décision', champs: ['reply4'], criteres: [{ nom: 'Une solution proposée', mots: ['je vous propose', 'prenez', 'je vous conseille', 'vous pouvez', 'la formule', 'sans engagement', 'essai', 'je vous recommande', 'choisissez', 'optez', 'signez', 'réservez', 'essayez', 'devriez', 'il suffit', 'je vous envoie', 'envoie', 'devis', 'le mieux serait', 'le mieux', 'faire un test', 'test', 'tester', 'démarrer', 'commencer', 'commencez', 'version de base', 'petit volume', 'rétracter', 'rétractation', 'quatorze jours', '14 jours', 'je vous fais', 'je peux vous faire', 'on peut', 'nous pouvons', 'je peux vous proposer', 'une offre', 'une remise', 'un geste', 'gratuit', 'gratuitement', 'abonnement', 'mensuel', 'paiement', 'payer en', 'bloquer', 'je vous réserve', 'faites', 'achetez', 'commandez', 'prenez', 'souscrivez', 'inscrivez-vous', 'il faut', 'il faudrait', 'vous devriez', 'à votre place'], conseil: 'Proposez une issue : « Prenez la formule… ».' }] },
      { titre: 'Compréhension / reformulation', champs: ['reply5'], criteres: [reformulation, { nom: 'Ses mots repris', mots: ['votre rythme', 'votre temps', 'prendre le temps', 'réfléchir', 'décider', 'temps', 'avant de vous décider', 'mûrir', 'tranquillement', 'précipitation', 'pas trop vite', 'trop vite', 'dire oui', 'vous engager', 'engager', 'être sûr', 'être sûre', 'sûr de votre choix', 'sûre de votre choix', 'votre décision', 'décision', 'votre choix', 'choix', 'réflexion', 'prendre votre temps', 'à votre rythme', 'sans vous presser', 'vous presser', 'hâte', 'pas pressé', 'pas pressée'], conseil: 'Reprenez son besoin de temps.' }], pieges: [PIEGE_SOLUTION] },
      { titre: 'Votre choix justifié', champs: ['finalChoice', 'justification'],
        criteres: [
          { nom: 'La compréhension choisie', mots: ['compréhension', 'reformul*'], conseil: 'En prise de contact, on privilégie la compréhension.' },
          { nom: 'Pourquoi elle convient', mots: ['respecte', 'confiance', 'relation', 'ouverte', 'sans pousser', 'rythme', 'besoin', 'écoute', 'ne juge pas', 'ne force pas', 'écouté', 'écoutée', 'écouter', 'compris', 'comprise', 'se sent', 'installe', 'installer', 'premier contact', 'ne pousse pas', 'ne le pousse pas', 'le pousser', 'braque', 'braquer', 'rassure', 'apaise', 'respecter', 'respect', 'valorise', 'considéré', 'considérée', 'entendu', 'entendue', 'dialogue', 'échange', 'lien', 'relation de confiance'], conseil: 'Dites ce qu’elle apporte à la relation.' },
          { nom: 'Les autres comparées', mots: ['soutien', 'investigation', 'enquête', 'plus tard', 'ensuite', 'jugement', 'solution', 'interprétation', 'alors que', 'plutôt que', 'minimise', 'minimiser', 'braqueraient', 'braquerait', 'pousserait', 'trop tôt', 'pourra venir', 'viendra', 'après', 'au contraire', 'contrairement', 'à la différence', 'tandis que', 'les autres', 'évaluation', 'conseil', 'questionner', 'question', 'rassurer', 'interpréter', 'juger'], conseil: 'Situez-la par rapport aux autres attitudes.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S2 F · Trois profils : une réponse d'écoute, puis la posture.
    's2-F': { blocs: [
      { titre: 'Méfiant : votre réponse', champs: ['reply0'],
        criteres: [{ nom: 'Le doute nommé', mots: ['doute*', 'méfi*', 'confiance', 'prudent', 'déçu', 'expérience', 'sceptique', 'réserves', 'je comprends', 'j’entends', 'je le comprends'], conseil: 'Nommez son doute calmement.' },
          { nom: 'Une invitation à préciser', mots: QUESTION_OUVERTE.concat(['ce qui vous rendrait', 'qu’est-ce qui vous rassurerait']), conseil: 'Transformez le doute en information.' }],
        pieges: [{ nom: 'Défense', points: 1, mots: ['si si', 'je vous assure', 'faites-moi confiance', 'ce n’est pas vrai', 'nos solutions marchent', 'vous avez tort', 'pas du tout', 'je vous garantis'], conseil: 'Ne répondez pas à l’agressivité par la défense.' }, PIEGE_MINIMISE] },
      { titre: 'Méfiant : votre adaptation', champs: ['posture0'], criteres: [{ nom: 'La posture décrite', mots: ['calme', 'défens*', 'sans me défendre', 'agress*', 'nommer', 'accueillir', 'justifier', 'neutre', 'information', 'apaiser', 'posé', 'posée', 'serein*', 'patien*', 'ton'], conseil: 'Calme, sans défense : on nomme le doute.' }, raison] },
      { titre: 'Bavard : votre réponse', champs: ['reply1'],
        criteres: [{ nom: 'Une synthèse', mots: ['si je résume', 'en résumé', 'pour résumer', 'si je comprends bien', 'beaucoup à gérer', 'plusieurs prestataires', 'trois prestataires', 'déçu', 'la même histoire', 'plusieurs essais'], conseil: 'Résumez ce qu’il a dit.' },
          { nom: 'Un recentrage', mots: ['sur quoi', 'par quoi', 'pour être utile', 'commençons', 'priorité', 'le plus important', 'l’essentiel', 'recentrer', 'concentrer', 'en premier'], conseil: 'Proposez par quoi commencer.' }],
        pieges: [{ nom: 'Couper la parole', points: 1, mots: ['stop', 'arrêtez', 'on va pas', 'abrégez', 'venons-en au fait', 'bref'], conseil: 'Recentrez avec respect, sans couper.' }] },
      { titre: 'Bavard : votre adaptation', champs: ['posture1'], criteres: [{ nom: 'La posture décrite', mots: ['synthèse', 'résum*', 'recentr*', 'respect*', 'sans couper', 'couper la parole', 'cadrer', 'structur*', 'canaliser', 'guider', 'interromp*'], conseil: 'Une synthèse qui recentre, sans couper.' }, raison] },
      { titre: 'Silencieux : votre réponse', champs: ['reply2'],
        criteres: [{ nom: 'Le silence accueilli', mots: ['prudent', 'normal', 'prenez', 'votre temps', 'je comprends', 'pas de souci', 'réfléchi*', 'à votre rythme'], conseil: 'Accueillez sa réserve.' },
          { nom: 'Une question ouverte légère', mots: QUESTION_OUVERTE.concat(['ce qui compte']), conseil: 'Une question douce pour l’inviter à parler.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: 'Silencieux : votre adaptation', champs: ['posture2'], criteres: [{ nom: 'La posture décrite', mots: ['question ouverte', 'douce', 'doucement', 'sans presser', 'invit*', 'encourag*', 'silence', 'laisser le temps', 'mettre à l’aise', 'rassur*', 'patien*', 'léger', 'légère', 'ouvert'], conseil: 'Une investigation douce, sans presser.' }, raison] }
    ] },

    // S3 1.4 · « Je vais réfléchir » : l'hypothèse, puis la question.
    // Une hypothèse simple suffit : un frein précis, formulé comme une
    // supposition. Les familles de freins couvrent les causes courantes.
    's3-1.4': { integre: true, blocs: [
      { titre: 'Vraie objection probable', champs: ['hypothesis'],
        criteres: [
          { nom: 'Un frein précis', mots: FREINS, conseil: 'Nommez un frein : le budget, une décision à plusieurs, un doute, une peur…' },
          { nom: 'Une hypothèse, pas une certitude', points: 1, mots: ['peut-être', 'sans doute', 'probablement', 'je pense', 'je crois', 'il est possible', 'il se peut', 'sûrement', 'certainement', 'je suppose', 'j’imagine', 'à mon avis', 'il semble', 'semble', 'on dirait', 'hésite', 'hésitation', 'parce que', 'car', 'cache', 'derrière', 'en réalité', 'vraie raison', 'vraie objection', 'prétexte', 'excuse', 'dérobade', 'masque', 'n’ose pas', 'ne dit pas', 'non exprimé', 'non exprimée', 'pas dit', 'frein', 'en fait'], conseil: 'Formulez-le comme une supposition : « Il hésite peut-être parce que… ».' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Question pour la révéler', champs: ['question'],
        criteres: [
          { nom: 'Une question ouverte', mots: QUESTION_OUVERTE.concat(['qui', 'qui d’autre', 'sur quels points', 'quels points', 'de quelles', 'de quoi auriez-vous besoin', 'qu’est-ce qui vous manque', 'qu’est-ce qui passe avant', 'comment imaginez-vous', 'qu’est-ce qui vous ferait', 'que faudrait-il', 'qu’est-ce qu’il faudrait', 'à quoi pensez-vous']), conseil: 'Commencez par « Qu’est-ce qui… », « Comment… », « Qui… ».' },
          { nom: 'Le frein visé', mots: FREINS.concat(['hésite*', 'freine*', 'retien*', 'bloque*', 'réfléchir', 'doute*', 'réserve*', 'inquiète*', 'inquiétude', 'préoccupe*', 'manque', 'convaincu', 'convaincue', 'confiance', 'avis', 'décision', 'décider', 'besoin', 'avancer', 'y voir clair', 'passe avant', 'aide à décider', 'compliqué', 'gêne']), conseil: 'Visez ce qui le fait hésiter.' },
          { nom: 'Avec tact', points: 1, mots: ['bien sûr', 'je comprends', 'je vous comprends', 'je vous entends', 'tout à fait', 'bien entendu', 'c’est normal', 'c’est bien normal', 'volontiers', 'pour vous aider', 'pour vous aider à y voir clair', 'pour être utile', 'd’accord', 'évidemment', 'avec plaisir', 'entendu', 'très bien', 'je respecte', 'prenez le temps', 'sans vous presser'], conseil: 'Accueillez d’abord : « Bien sûr… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [
          { nom: 'Le report accepté', points: 2, mots: ['je vous rappelle', 'rappelez-moi', 'on verra', 'dans un mois', 'plus tard', 'je vous laisse réfléchir', 'prenez le temps de réfléchir', 'revenez vers moi', 'quand vous voulez', 'on en reparle plus tard', 'je repasse', 'à bientôt alors'], conseil: 'Accepter un report vague, c’est perdre la main.' },
          { nom: 'Une question qui souffle la réponse', points: 1, mots: ['c’est le prix', 'c’est trop cher', 'est-ce le prix', 'est-ce le budget', 'c’est le budget', 'trop cher pour vous', 'c’est une question de budget', 'c’est une question d’argent', 'c’est à cause du prix', 'vous n’avez pas le budget'], conseil: 'Laissez-le nommer son frein lui-même.' }
        ] }
    ] },

    // S3 1.5 · Expliquer pourquoi la réponse B est la plus juste.
    's3-1.5': { blocs: [
      { champs: ['why'],
        criteres: [
          { nom: 'Les étapes repérées', mots: ['accueil*', 'creuse*', 'question*', 'reformul*', 'preuve', 'traite*', 'contrôle*', 'vérifie*', 'adhésion', 'par rapport à quoi', 'essai', 'arrêts'], min: 3, conseil: 'B accueille, creuse, reformule, prouve et contrôle.' },
          { nom: 'Les défauts de A', mots: ['contredit', 'contredire', 'remise', 'brade*', '10 %', 'réduction', 'négociation', 'prématuré*', 'dévalorise*', 'affaiblit', 'ne creuse pas', 'n’écoute pas', 'pas si cher'], conseil: 'A contredit le client et brade le prix.' },
          { nom: 'La valeur défendue', mots: ['valeur', 'valoris*', 'sans brader', 'sans baisser', 'investissement', 'en vaut la peine'], conseil: 'B défend la valeur au lieu de baisser le prix.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S3 1.6 · « Nos chaises actuelles suffisent » : une phrase par étape.
    // S3 1.6 · Six contextes : la méthode est commune, les mots du cas
    // (content-s3.js, `mots`) s'y ajoutent. L'écran construit la grille du
    // cas ouvert (`parCas`) et place le score dans ses six blocs.
    's3-1.6': { integre: true, parCas: (cas, champ) => ({ blocs: [
      { titre: '1. Accueillir', champs: [champ(0)], criteres: [{ nom: 'L’objection accueillie', mots: ['je comprends', 'j’entends', 'je vois', 'c’est légitime', 'merci de', 'bonne remarque', 'tout à fait', 'en effet', 'effectivement', 'c’est normal', 'bien sûr', 'je note', 'très bien', 'je vous rejoins', 'c’est une vraie question', 'vous avez raison de', 'je vous entends', 'je vous comprends', 'je comprends tout à fait', 'je comprends bien', 'je le comprends', 'd’accord', 'c’est une bonne chose', 'c’est vrai', 'c’est juste', 'c’est une remarque juste', 'c’est une question importante', 'merci de me le dire', 'merci pour votre franchise', 'je vous remercie de', 'c’est compréhensible', 'c’est bien normal', 'bien entendu', 'évidemment', 'absolument', 'entendu', 'très juste', 'ça se comprend', 'cela se comprend', 'c’est important', 'c’est une vraie somme', 'vous n’êtes pas le seul', 'vous n’êtes pas la seule', 'beaucoup de clients', 'c’est une bonne question', 'je note votre remarque', 'je prends note'], conseil: 'Recevez l’objection sans la contredire.' }],
        pieges: [PIEGE_JUGEMENT, { nom: 'Contradiction', points: 1, mots: ['pas du tout', 'détrompez-vous', 'au contraire', 'c’est faux'], conseil: 'Ne contredisez pas le client.' }] },
      { titre: '2. Questionner', champs: [champ(1)], criteres: [{ nom: 'Une question qui creuse', mots: QUESTION_OUVERTE.concat(['vous arrive-t-il', 'avez-vous', 'est-ce que', 'savez-vous', 'combien']), conseil: 'Une seule question, ouverte.' },
        { nom: 'Le bon sujet', mots: cas.mots.sujet, conseil: 'Visez ce qui se cache derrière son objection.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: '3. Reformuler', champs: [champ(2)], criteres: [reformulation, { nom: 'Ses mots repris', mots: cas.mots.reprise, conseil: 'Reprenez ses propres mots.' }] },
      { titre: '4. Traiter', champs: [champ(3)], criteres: [{ nom: 'Une preuve tirée de vos atouts', mots: cas.mots.preuve.concat(PREUVE_GENERALE), min: 2, conseil: 'Appuyez-vous sur un ou deux de vos atouts, chiffres à l’appui.' }],
        pieges: [{ nom: 'Le prix bradé', points: 1, mots: ['remise', 'réduction', 'rabais', 'geste commercial', 'baisser le prix', 'moins cher pour vous'], conseil: 'On défend la valeur, on ne brade pas.' },
          { nom: 'Un argument hors sujet', points: 1, mots: cas.mots.horsSujet || [], conseil: 'Il ne répond pas à son objection : gardez les arguments qui la traitent.' }] },
      { titre: '5. Contrôler', champs: [champ(4)], criteres: [{ nom: 'L’adhésion vérifiée', mots: CONTROLE, conseil: 'Vérifiez : « Est-ce que cela vous parle ? ».' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: '6. Enchaîner', champs: [champ(5)], criteres: [{ nom: 'Une suite précise', mots: SUITE.concat(cas.mots.suite), conseil: 'Proposez une étape précise, avec une date.' }] }
    ] }) },

    // S3 1.7 · Cartes réflexes : creuser, puis répondre avec une preuve.
    's3-1.7': { blocs: [
      ['Direction', ['direction', 'compterait', 'important pour eux', 'critères', 'qui décide', 'décision', 'quand', 'convaincre', 'attendent', 'qui d’autre', 'arguments'],
        ['argumentaire', 'chiffr*', 'dossier', 'synthèse', 'présentation', 'présenter', 'rencontrer', 'rendez-vous', 'accompagner', 'avec vous', 'document', 'retour sur investissement', 'coût des arrêts', 'à votre direction']],
      ['Trop cher', ['par rapport à quoi', 'comparé', 'compar*', 'budget prévu', 'enveloppe', 'autre offre', 'combien', 'quel budget', 'autre devis'],
        ['garantie', '5 ans', 'cinq ans', 'essai', '30 jours', 'location', 'étaler', 'mensualité*', 'valeur', 'rentab*', 'coût des arrêts', 'économ*', 'durée de vie', 'investissement']],
      ['Déçu par un fournisseur', ['qu’est-ce qui s’est', 'que s’est-il passé', 'mal passé', 'déçu', 'pourquoi', 'racontez', 'exactement', 'quel problème', 'ce qui n’a pas'],
        ['garantie', 'sav', '48 h', '48 heures', 'essai', 'satisfait ou remboursé', 'remboursé', '1 200', '1200', 'entreprises équipées', 'références', 'avis', 'témoignages', 'engagement', 'suivi', 'interlocuteur']],
      ['Nos chaises suffisent', ['salariés', 'dos', 'gênés', 'douleurs', 'arrêts', 'plaintes', 'confort', 'tms', 'absences', 'collaborateurs'],
        ['prévention', 'prévenir', 'tms', 'arrêts', 'baisse', 'diagnostic', 'gratuit', 'étude', 'essai', 'coût', 'absences']]
    ].flatMap(([titre, creuser, prouver], i) => [
      { titre: `${titre} : votre question`, champs: [`dig${i}`],
        criteres: [{ nom: 'Une question ouverte', mots: QUESTION_OUVERTE.concat(['pourquoi']), conseil: 'Creusez par une question ouverte.' }, { nom: 'Le bon angle', mots: creuser, conseil: 'Visez la cause probable de l’objection.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: `${titre} : votre réponse`, champs: [`reply${i}`],
        criteres: [{ nom: 'Une preuve', mots: prouver, min: 2, conseil: 'Appuyez-vous sur une preuve : garantie, essai, chiffres…' }],
        pieges: [{ nom: 'Le prix bradé', points: 1, mots: ['remise', 'réduction', 'rabais', 'geste commercial', 'baisser le prix', 'baisse de prix', 'moins cher pour vous'], conseil: 'On défend la valeur, on ne brade pas.' }] }
    ]) },

    // S4 1.2 · Réécrire une ouverture maladroite.
    's4-1.2': { blocs: [{ champs: ['rewrite'], ...ouvertureComplete }] },

    // S4 2.2 · Remplacer trois réponses réflexes par une reformulation.
    's4-2.2': { blocs: [
      reformuler('Le concurrent moins cher', 'repair0', ['budget', 'prix', 'critère', 'moins cher', 'coût', 'tarif', 'important', 'compar*', 'concurrent']),
      reformuler('Pas le temps', 'repair1', ['charge', 'temps', 'chargé', 'chargée', 'occupé', 'occupée', 'priorité', 'en ce moment', 'pas de place', 'débordé', 'débordée', 'agenda']),
      reformuler('Déjà essayé', 'repair2', ['expérience', 'prudent', 'prudente', 'déçu', 'déçue', 'essayé', 'méfiant', 'réserve', 'rien donné', 'résultat', 'doute'])
    ] }
  };
})();
