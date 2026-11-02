/* PAGES DE CONTEXTE · ce qui s'affiche avant chaque exercice du module 1-2-1.
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

  /* ══ SÉRIE 2 · LES ATTITUDES D'ÉCOUTE ═════════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Un client se confie.', rest: 'Que lui répondez-vous ?' },
    mission: 'Une cliente explique pourquoi elle vient remplacer son lave-linge. Six vendeurs lui répondent : pour chaque réponse, trouvez l’attitude d’écoute du vendeur, puis son effet probable sur la cliente.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Mon lave-linge a lâché ce matin. J’ai trois enfants, le linge s’entasse, et je n’ai vraiment pas le budget pour un modèle haut de gamme.',
    situation: 'Vous êtes dans un magasin d’électroménager. La cliente est pressée, elle a une famille nombreuse et un budget serré.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute (évaluation, interprétation, soutien, enquête, solution ou compréhension), puis l’effet probable sur la cliente.',
    criteria: ['La bonne attitude pour chaque réponse', 'Son effet probable sur la cliente']
  },
  's2-2.2': {
    lede: { key: 'Trois mois de test pour rien.', rest: 'Le dirigeant n’y croit plus.' },
    mission: 'Le dirigeant d’une entreprise de travaux explique pourquoi il doute du logiciel. Six commerciaux lui répondent : pour chaque réponse, trouvez l’attitude d’écoute du commercial, puis son effet probable sur le dirigeant.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Votre collègue est venu l’an dernier. On a testé votre logiciel de planning pendant trois mois, et mes chefs de chantier ne l’ont jamais utilisé. Je ne vois pas pourquoi ce serait différent aujourd’hui.',
    situation: 'Vous êtes commercial pour un éditeur de logiciel de planning. Le dirigeant a déjà essayé votre logiciel, sans succès, et il reste méfiant.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute, puis l’effet probable sur le dirigeant.',
    criteria: ['La bonne attitude pour chaque réponse', 'Son effet probable sur le dirigeant']
  },
  's2-2.3': {
    lede: { key: 'Quatre mois sans une offre.', rest: 'Le propriétaire doute.' },
    mission: 'Un propriétaire explique pourquoi il change d’agence. Six agents lui répondent : pour chaque réponse, trouvez l’attitude d’écoute de l’agent, puis son effet probable sur le propriétaire.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Notre appartement est en vente depuis quatre mois avec une autre agence. Pas une seule offre. Je commence à me dire qu’il est invendable.',
    situation: 'Vous êtes agent dans une agence immobilière. Le propriétaire a déjà confié la vente de son appartement à une autre agence, sans résultat.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute, puis l’effet probable sur le propriétaire.',
    criteria: ['La bonne attitude pour chaque réponse', 'Son effet probable sur le propriétaire']
  }
};
