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

  root.ATELIER_GRILLES = {
    // @@GRILLES@@
  };
})(typeof window !== 'undefined' ? window : globalThis);
