/* GRILLES DU SCORE ESTIMATIF · réponses rédigées du module 1-2-2.
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

  /* ── A2 · Du besoin exprimé au besoin réel ─────────────────────────── */

  // Une question ouverte, qui invite à raconter.
  const OUVERTE = ['comment', 'qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'dans quelles', 'dans quel', 'à quoi', 'parlez-moi',
    'racontez', 'racontez-moi', 'dites-moi', 'expliquez', 'pouvez-vous', 'pourriez-vous', 'de quoi', 'que se passe', 'qu’est-ce qui se passe', 'en quoi', 'pour quoi',
    'qu’attendez', 'qu’entendez', 'combien', 'où', 'quand'];
  // La question qui souffle l'hypothèse ou propose un produit.
  const PIEGE_ORIENTEE = { nom: 'Une question orientée', points: 3,
    mots: ['c’est ça', 'n’est-ce pas', 'non ?', 'sûrement', 'j’imagine que', 'vous avez peur', 'je suppose', 'forcément', 'vous voulez dire que', 'en fait vous', 'donc vous voulez'],
    conseil: 'Ne soufflez pas votre hypothèse : laissez le client la confirmer ou la démentir.' };
  const PIEGE_OFFRE = { nom: 'Une offre ou un produit', points: 3,
    mots: ['je vous propose', 'je vous conseille', 'je vous recommande', 'nous avons', 'notre modèle', 'nos modèles', 'notre logiciel', 'notre offre', 'promotion', 'remise',
      'prenez', 'essayez', 'il vous faut', 'la solution'],
    conseil: 'Pas de produit à ce stade : vous cherchez à comprendre.' };

  // Le besoin implicite : l'idée attendue, en familles de mots.
  const implicite = (titre, champ, idees) => ({ titre, champs: [champ],
    criteres: idees.map(([nom, mots]) => ({ nom, mots, points: 3, conseil: `Une piste possible : ${nom.toLowerCase()}.` })),
    phrases: { attendues: 1, points: 1 },
    pieges: [PIEGE_OFFRE] });

  // La question qui vérifie : ouverte, partie des mots du client, sans souffler.
  const verifier = (titre, champ, sesMots) => ({ titre, champs: [champ],
    criteres: [
      { nom: 'Une question ouverte', mots: OUVERTE, points: 4, conseil: 'Ouvrez : « Qu’est-ce qui… ? », « Comment… ? », « Dans quelles situations… ? ».' },
      { nom: 'Ses mots', mots: sesMots, points: 3, conseil: 'Partez de ce qu’il a dit, avec ses mots.' }
    ],
    phrases: { points: 0 },
    regles: [{ regle: 'avecQuestion', nom: 'Un point d’interrogation', points: 2 }],
    pieges: [PIEGE_ORIENTEE, PIEGE_OFFRE] });

  const A2 = [
    implicite('Le vélo · le besoin implicite', 'c0_implicite', [
      ['Ne pas tomber en panne sur son trajet', ['panne', 'tomber en panne', 'autonomie', 'trajet', 'trajets', 'kilomètres', 'km', 'distance', 'côte', 'côtes', 'route', 'aller au travail', 'tous les jours', 'quotidien', 'rassuré', 'rassurer', 'sûr', 'peur', 'inquiet', 'inquiète', 'batterie vide', 'à plat', 'recharger', 'recharge', 'longs', 'loin']]
    ]),
    verifier('Le vélo · la question', 'c0_question', ['batterie', 'grosse batterie', 'trajet', 'trajets', 'vélo', 'utiliser', 'utiliserez', 'servir', 'quotidien', 'autonomie', 'kilomètres', 'distance']),
    implicite('Le planning · le besoin implicite', 'c1_implicite', [
      ['Moins d’erreurs, de conflits ou d’absences mal gérées, du temps libéré', ['erreur', 'erreurs', 'oubli', 'oublis', 'conflit', 'conflits', 'tension', 'tensions', 'absent', 'absents', 'absence', 'absences', 'remplacer', 'remplacement', 'temps', 'gagner du temps', 'perd du temps', 'perte de temps', 'libérer', 'organisation', 'désorganis*', 'salariés', 'équipe', 'équipes', 'stress', 'débordé', 'charge', 'retards', 'clients', 'chantiers', 'sites', 'communication', 'prévenir']]
    ]),
    verifier('Le planning · la question', 'c1_question', ['tableau', 'tableaux', 'ne suffisent plus', 'ne suffit plus', 'suffisent', 'suffit', 'planning', 'concrètement', 'organisez', 'organisation', 'aujourd’hui', 'actuellement']),
    implicite('Le quatre-pièces · le besoin implicite', 'c2_implicite', [
      ['Un usage de la quatrième pièce, ou un budget derrière « peu importe le quartier »', ['bureau', 'télétravail', 'travailler', 'enfant', 'bébé', 'naissance', 'agrandir', 'famille', 'chambre', 'amis', 'parents', 'budget', 'prix', 'moyens', 'financ*', 'crédit', 'cher', 'pas cher', 'contrainte', 'quartier', 'loyer', 'surface', 'pièce', 'espace', 'place']]
    ]),
    verifier('Le quatre-pièces · la question', 'c2_question', ['quatrième pièce', 'quatre pièces', 'quatre-pièces', 'pièce', 'pièces', 'servira', 'utiliser', 'utiliserez', 'quartier', 'peu importe', 'compte peu', 'importe']),
    implicite('Les intérimaires · le besoin implicite', 'c3_implicite', [
      ['Un surcroît d’activité ou des absences, des profils opérationnels tout de suite', ['surcroît', 'activité', 'commande', 'commandes', 'pic', 'production', 'absence', 'absences', 'absent', 'absents', 'arrêt', 'malade', 'maladie', 'congés', 'démission', 'départ', 'opérationnel', 'opérationnels', 'tout de suite', 'immédiatement', 'expérience', 'expérimenté', 'compétent', 'formé', 'qualifié', 'fiable', 'mauvaise expérience', 'retard', 'délai', 'client']]
    ]),
    verifier('Les intérimaires · la question', 'c3_question', ['lundi', 'urgent', 'urgence', 'si urgent', 'trois', 'intérimaires', 'opérationnels', 'premier jour', 'poste', 'postes', 'besoin']),
    implicite('Les lunettes · le besoin implicite', 'c4_implicite', [
      ['Une gêne visuelle plus large, ou une presbytie mal vécue', ['fatigue', 'fatigué', 'fatiguée', 'écran', 'écrans', 'ordinateur', 'travail', 'travaille', 'presbytie', 'âge', 'vieillir', 'vieillit', 'mal vécu', 'mal vécue', 'gêne', 'gênée', 'maux de tête', 'mal de tête', 'yeux', 'vue', 'voir', 'conduire', 'lumière', 'premières lunettes', 'première fois', 'image', 'apparence', 'regard']]
    ]),
    verifier('Les lunettes · la question', 'c4_question', ['lire', 'lecture', 'juste pour lire', 'situations', 'situation', 'moments', 'quand', 'du mal', 'difficulté', 'difficultés', 'voir', 'lunettes'])
  ];

  root.ATELIER_GRILLES = {
    // S3 3.1 · A2 : l'hypothèse et la question, pour chacun des cinq clients.
    's3-3.1': { integre: true, blocs: A2 },
    // @@GRILLES@@
  };
})(typeof window !== 'undefined' ? window : globalThis);
