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
    'ressenti', 'vous semble', 'impatien*', 'colère', 'irrité', 'irritée', 'désespér*', 'doute*', 'méfi*', 'pas pris au sérieux', 'pris au sérieux',
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
      'la solution', 'une solution', 'moteur', 'batterie', 'promotion', 'promo', 'remise', 'réduction', 'tarif', 'prix', '€', 'euros', 'abonnement',
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
    criteres: [{ nom: 'Un mot du client', mots, points: 4, conseil: 'Reprenez un mot important du client, tel qu’il l’a dit.' }],
    phrases: { points: 0 },
    // La question est le cœur de l'écho : elle invite le client à préciser.
    regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 4 }, { regle: 'maxMots:12', nom: 'Court', points: 1 }],
    pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT]
  });

  /* ── Le reflet : ce qu'il ressent, avec ses mots ───────────────────── */
  const reflet = (titre, champ, situation) => ({
    titre, champs: [champ],
    criteres: [
      { nom: 'Ce qu’il ressent', mots: EMOTION, points: 4, conseil: 'Nommez ce que ressent le client : lassitude, déception, découragement…' },
      { nom: 'Ses mots', mots: situation, points: 3, conseil: 'Reprenez la situation qu’il décrit, avec ses mots.' },
      { nom: 'Tourné vers lui', mots: ['vous', 'votre', 'vos'], points: 1, conseil: 'Parlez de lui : « Vous avez l’impression que… ».' }
    ],
    phrases: { attendues: 1, points: 1 },
    pieges: [PIEGE_SOLUTION, PIEGE_JUGEMENT]
  });

  /* ── La synthèse : tous les éléments, puis une validation ──────────── */
  const synthese = (titre, champ, elements) => ({
    titre, champs: [champ],
    criteres: elements.map(([nom, mots]) => ({ nom, mots, points: 2, conseil: `Reprenez aussi cet élément : ${nom.toLowerCase()}.` }))
      .concat([{ nom: 'Une validation', mots: VALIDATION, points: 2, conseil: 'Terminez par une question : « C’est bien ça ? ».' }]),
    phrases: { attendues: 1, points: 1 },
    regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
    pieges: [PIEGE_AJOUT, PIEGE_JUGEMENT]
  });

  root.ATELIER_GRILLES = {

    // S3 3.1 · L'écho, sur trois clients.
    's3-3.1': { integre: true, blocs: [
      echo('Le cycliste', 'c0_text', ['côte', 'côtes', 'terrible', 'côte terrible', 'montée', 'pente', 'grimpette', 'raide', '25 kilomètres', '25 km',
        'vingt-cinq kilomètres', 'kilomètres', 'à la fin', 'trajet', 'tous les jours', 'par jour']),
      echo('La famille', 'c1_text', ['épuisant', 'épuisante', 'épuisé', 'épuisée', 'épuisés', 'épuisement', 'pas comme l’an dernier', 'l’an dernier',
        'l’année dernière', 'fatigant', 'fatigante', 'crevant', 'en famille']),
      echo('Le gérant', 'c2_text', ['loterie', 'la loterie', 'toujours la loterie', 'c’est la loterie', 'livraisons', 'livraison', 'au hasard', 'aléatoire',
        'aléatoires', 'imprévisible', 'imprévisibles', 'jamais sûr', 'pas fiable', 'fiables', 'irrégulier*'])
    ] },

    // S3 3.2 · Le reflet, sur trois clients.
    's3-3.2': { integre: true, blocs: [
      reflet('Le couple', 'c0_text', ['visité', 'visites', 'visiter', 'quinze', '15', 'appartements', 'appartement', 'coup de cœur', 'coups de cœur',
        'doubler', 'doublés', 'doublé', 'devancé*', 'autre acheteur', 'autres acheteurs', 'trop tard', 'à chaque fois', 'chaque fois', 'passer devant',
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
      ]),
      synthese('Le restaurateur', 'c1_text', [
        ['Les pannes du week-end', ['panne', 'pannes', 'tombe en panne', 'en panne', 'week-end', 'week-ends', 'weekend', 'fin de semaine', 'le plus de monde',
          'plus de clients', 'affluence', 'coup de feu', 'rush', 'lâche', 'fiable', 'fiabilité', 'casse', 'plante']],
        ['Trois cents cafés par jour', ['trois cents', '300', 'cafés par jour', 'par jour', 'volume', 'beaucoup de cafés', 'cadence', 'quantité', 'débit']],
        ['Des serveurs qui changent', ['serveurs', 'serveur', 'changent', 'turnover', 'nouveaux', 'renouvel*', 'équipe', 'personnel', 'prise en main',
          'prendre en main', 'facile', 'facilement', 'simple', 'simple à utiliser', 'intuitive', 'formation', 'apprendre']],
        ['Peu de place au comptoir', ['place', 'peu de place', 'comptoir', 'derrière le comptoir', 'espace', 'encombrement', 'encombrante', 'compact',
          'compacte', 'petite', 'réduite', 'étroit', 'exigu', 'taille']]
      ])
    ] }
  };
})(typeof window !== 'undefined' ? window : globalThis);
