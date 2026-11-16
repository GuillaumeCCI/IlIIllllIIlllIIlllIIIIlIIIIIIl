/* PAGES DE CONTEXTE · ce qui s'affiche avant chaque exercice du module 1-2-2.
 *
 * Chaque exercice reçoit :
 *   lede       l'accroche du titre, en deux parties : `key` est souligné
 *              de corail, `rest` enchaîne ;
 *   mission    la consigne en une ou deux phrases, dans la carte blanche ;
 *   method     la façon de procéder, en une ligne ;
 *   situation  la mise en situation, repliée avec les critères ;
 *   task       le détail de ce qui est demandé ;
 *   criteria   les points sur lesquels la production sera relue.
 *
 * `quote` est facultatif : la réplique du client, quand l'exercice en a une.
 */
window.ATELIER_BRIEFINGS = {

  /* ══ SÉRIE 1 · SE POSITIONNER ════════════════════════════════════════ */

  's1-1.1': {
    lede: { key: 'Avant de commencer,', rest: 'où en êtes-vous ?' },
    mission: 'Huit critères décrivent un vendeur qui découvre vraiment le besoin de son client. Pour chacun, cochez votre niveau aujourd’hui : à retravailler, en bonne voie ou maîtrisé.',
    method: 'Une grille, un niveau par critère. Personne ne vous note.',
    situation: 'C’est votre point de départ. Ensuite, suivez le module « Détecter les besoins et motivations d’achat » sur la plateforme, puis les activités. À la fin, vous remplirez la même grille sans revoir celle-ci.',
    task: 'Huit critères : préparation, entonnoir, types de questions, relances, besoin explicite et implicite, enjeux, motivations d’achat, hiérarchisation.',
    criteria: ['Un niveau pour chaque critère', 'Une réponse honnête, pas idéale']
  },

  /* ══ SÉRIE 2 · POSER LA BONNE QUESTION ═══════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Ouverte, fermée, alternative…', rest: 'ou orientée ?' },
    mission: 'M. Garnier revient au magasin de literie : il dort mal et a mal au dos. Le vendeur lui pose dix questions. Pour chacune, indiquez son type.',
    method: 'Une question à la fois : choisissez son type, puis la suivante.',
    quote: 'Je dors mal depuis des mois, je me réveille avec le dos en compote.',
    situation: 'Le vendeur cherche à découvrir le besoin de M. Garnier. Certaines de ses questions font parler, d’autres précisent, d’autres soufflent la réponse.',
    task: 'Dix questions à classer : ouverte (elle fait parler), fermée (oui, non, une information), alternative (un choix), orientée (la réponse est dans la question).',
    criteria: ['Le bon type pour chaque question', 'Repérer les questions orientées']
  },
  's2-2.2': {
    lede: { key: 'Du général au précis,', rest: 'puis on valide.' },
    mission: 'Six questions du vendeur à M. Garnier. Placez chacune à l’étage de l’entonnoir qui lui correspond.',
    method: 'Une question à la fois : choisissez son étage, puis la suivante.',
    situation: 'L’entonnoir : la situation générale (questions larges), puis les problèmes et les attentes (questions ouvertes ciblées), puis les précisions (fermées, alternatives), enfin la validation.',
    task: 'Six questions, quatre étages. Le corrigé explique la place de chacune.',
    criteria: ['Le bon étage pour chaque question', 'Le bon outil au bon moment']
  },

  /* @@SERIES@@ */

  /* ══ SÉRIE 9 · FAIRE LE POINT ════════════════════════════════════════ */

  's9-9.1': {
    lede: { key: 'Le module est fini.', rest: 'Qu’est-ce qui a bougé ?' },
    mission: 'Remplissez à nouveau la grille du début, sans chercher à vous souvenir de vos premières réponses. Puis comparez les deux colonnes et décidez de ce que vous allez retravailler.',
    method: 'La grille d’abord, puis la comparaison et trois questions.',
    situation: 'Vous avez rempli cette grille avant le module. Vos deux colonnes s’affichent côte à côte une fois la seconde remplie.',
    task: 'Huit critères à recocher, puis trois questions : où vous avez le plus progressé, ce qui reste à travailler, l’activité que vous allez refaire.',
    criteria: ['Un niveau pour chaque critère', 'Un exemple précis tiré d’une activité', 'Une activité choisie pour continuer']
  }
};
