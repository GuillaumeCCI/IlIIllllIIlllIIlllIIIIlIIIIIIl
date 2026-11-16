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

  /* ══ SÉRIE 1 · SE POSITIONNER ════════════════════════════════════════ */

  's1-1.1': {
    lede: { key: 'Avant de commencer,', rest: 'où en êtes-vous ?' },
    mission: 'Huit critères décrivent un vendeur qui écoute vraiment son client. Pour chacun, cochez votre niveau aujourd’hui : à retravailler, en bonne voie ou maîtrisé.',
    method: 'Une grille, une case par critère. Personne ne vous note.',
    situation: 'C’est votre point de départ. À la fin du module, vous remplirez la même grille sans revoir celle-ci, puis vous comparerez les deux.',
    task: 'Huit critères : attitudes d’écoute, attitude de compréhension, écho, reflet, synthèse, signaux, adaptation et posture d’écoute.',
    criteria: ['Un niveau pour chaque critère', 'Une réponse honnête, pas idéale']
  },

  /* ══ SÉRIE 2 · LES ATTITUDES D'ÉCOUTE ═════════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Un client se confie.', rest: 'Que lui répondez-vous ?' },
    mission: 'Une cliente explique pourquoi elle vient remplacer son lave-linge. Six vendeurs lui répondent : pour chaque réponse, trouvez l’attitude d’écoute du vendeur, puis l’effet de cette réponse sur la cliente.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Mon lave-linge a lâché ce matin. J’ai trois enfants, le linge s’entasse, et je n’ai vraiment pas le budget pour un modèle haut de gamme.',
    situation: 'Vous êtes dans un magasin d’électroménager. La cliente est pressée, elle a une famille nombreuse et un budget serré.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute (évaluation, interprétation, soutien, enquête, solution ou compréhension), puis l’effet probable sur la cliente.',
    criteria: ['La bonne attitude pour chaque réponse', 'L’effet de chaque réponse sur la cliente']
  },
  's2-2.2': {
    lede: { key: 'Trois mois de test pour rien.', rest: 'Le dirigeant n’y croit plus.' },
    mission: 'Le dirigeant d’une entreprise de travaux explique pourquoi il doute du logiciel. Six commerciaux lui répondent : pour chaque réponse, trouvez l’attitude d’écoute du commercial, puis l’effet de cette réponse sur le dirigeant.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Votre collègue est venu l’an dernier. On a testé votre logiciel de planning pendant trois mois, et mes chefs de chantier ne l’ont jamais utilisé. Je ne vois pas pourquoi ce serait différent aujourd’hui.',
    situation: 'Vous êtes commercial pour un éditeur de logiciel de planning. Le dirigeant a déjà essayé votre logiciel, sans succès, et il reste méfiant.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute, puis l’effet probable sur le dirigeant.',
    criteria: ['La bonne attitude pour chaque réponse', 'L’effet de chaque réponse sur le dirigeant']
  },
  's2-2.3': {
    lede: { key: 'Quatre mois sans une offre.', rest: 'Le propriétaire doute.' },
    mission: 'Un propriétaire explique pourquoi il change d’agence. Six agents lui répondent : pour chaque réponse, trouvez l’attitude d’écoute de l’agent, puis l’effet de cette réponse sur le propriétaire.',
    method: 'Une réponse à la fois : deux choix, puis la réponse suivante.',
    quote: 'Notre appartement est en vente depuis quatre mois avec une autre agence. Pas une seule offre. Je commence à me dire qu’il est invendable.',
    situation: 'Vous êtes agent dans une agence immobilière. Le propriétaire a déjà confié la vente de son appartement à une autre agence, sans résultat.',
    task: 'Six réponses à analyser. Pour chacune : l’attitude d’écoute, puis l’effet probable sur le propriétaire.',
    criteria: ['La bonne attitude pour chaque réponse', 'L’effet de chaque réponse sur le propriétaire']
  },

  /* ══ SÉRIE 3 · REFORMULER ════════════════════════════════════════════ */

  's3-3.1': {
    lede: { key: 'Un mot du client,', rest: 'une question, et il précise.' },
    mission: 'Trois clients vous parlent. Pour chacun, reformulez en écho : reprenez un mot important de sa phrase, sur un ton de question, pour qu’il en dise plus.',
    method: 'Un client à la fois : lisez, écrivez votre écho, passez au suivant.',
    situation: 'Un cycliste qui va travailler à vélo, une famille qui prépare ses vacances, une gérante de restaurant qui parle de son fournisseur. Chacun glisse un mot qui en dit long.',
    task: 'Trois échos à écrire, de quelques mots chacun. Ni conseil, ni produit : le mot du client en question, puis une courte relance.',
    criteria: ['Un mot du client', 'Une question', 'Fidélité aux mots du client']
  },
  's3-3.2': {
    lede: { key: 'Ce qu’il ressent,', rest: 'avec ses mots.' },
    mission: 'Trois clients vous confient une difficulté. Pour chacun, reformulez en reflet : dites-lui ce qu’il ressent, en reprenant ses mots, sans juger ni conseiller.',
    method: 'Un client à la fois : lisez, écrivez votre reflet, passez au suivant.',
    situation: 'Une cliente qui rate chaque carrelage qui lui plaît, un automobiliste qui revient au garage pour la troisième fois, une responsable déçue par des formations.',
    task: 'Trois reflets à écrire, en une ou deux phrases chacun.',
    criteria: ['Ce qu’il ressent', 'Ses mots', 'Fidélité aux mots du client']
  },
  's3-3.3': {
    lede: { key: 'Tout l’essentiel,', rest: 'puis « C’est bien ça ? »' },
    mission: 'Deux clients vous ont donné quatre informations chacun. Pour chacun, écrivez une synthèse : reprenez les quatre éléments sans rien ajouter, puis demandez-lui de valider.',
    method: 'Un client à la fois : lisez ses quatre éléments, écrivez votre synthèse.',
    situation: 'La gérante de deux salons de coiffure, puis le patron d’un café-restaurant. Tous deux viennent de vous expliquer ce qui compte pour eux.',
    task: 'Deux synthèses à écrire, comme vous les diriez à voix haute.',
    criteria: ['Tous les éléments', 'Une validation', 'Fidélité aux mots du client']
  },
  's3-3.4': {
    lede: { key: 'Ça y ressemble,', rest: 'mais ce n’en est pas.' },
    mission: 'Quatre clients, huit réponses de vendeurs. Pour chaque réponse, dites si c’est une vraie reformulation, ou si le vendeur y ajoute un jugement, une interprétation, un argument ou une solution.',
    method: 'Une réponse à la fois : un choix, puis la réponse suivante.',
    situation: 'Les clients parlent d’une offre concurrente, de leur mal de dos, d’un contrat d’assurance et de commandes ressaisies à la main.',
    task: 'Huit réponses à juger. Le corrigé explique chacune.',
    criteria: ['Repérer une vraie reformulation', 'Repérer ce qui s’y ajoute']
  },

  /* ══ SÉRIE 4 · ANALYSER UN ENTRETIEN ═════════════════════════════════ */

  's4-4.1': {
    lede: { key: 'Sept répliques,', rest: 'sept attitudes à reconnaître.' },
    mission: 'Nadia, conseillère immobilière, reçoit M. et Mme Benali. Pour chacune de ses répliques, de ses premières questions à son résumé final, trouvez son attitude d’écoute.',
    method: 'L’entretien reste affiché, la réplique à analyser est surlignée.',
    situation: 'Le couple cherche une maison avec un jardin, pour environ 280 000 €. Nadia enchaîne les maladresses, puis se rattrape.',
    task: 'Sept répliques à analyser : évaluation, interprétation, soutien, enquête, solution ou compréhension.',
    criteria: ['La bonne attitude pour chaque réplique']
  },
  's4-4.2': {
    lede: { key: 'Un geste, un soupir, trois mots.', rest: 'Nadia n’a rien vu.' },
    mission: 'Dans l’entretien de Nadia avec les Benali, repérez les signaux du couple qu’elle n’a pas exploités avant de revenir sur « pas trop loin ». Puis écrivez la question qui vous aurait permis d’en vérifier un.',
    method: 'Cliquez sur les signaux, puis écrivez votre question.',
    situation: 'Le couple montre beaucoup de choses sans les dire : des gestes, un ton, des mots glissés en passant.',
    task: 'Au moins trois signaux à repérer, puis une question pour en vérifier un, au lieu de le supposer.',
    criteria: ['Les signaux manqués', 'Signal vérifié, pas supposé']
  },
  's4-4.3': {
    lede: { key: 'Deux répliques', rest: 'et tout bascule.' },
    mission: 'À la fin de l’entretien, Nadia revient sur « pas trop loin », puis résume tout. Ces deux répliques retournent la situation. Expliquez pourquoi.',
    method: 'Relisez la fin de l’entretien, puis rédigez votre analyse.',
    situation: 'Après une série de maladresses, Nadia revient sur un mot de M. Benali. Le couple se détend et confirme sa synthèse.',
    task: 'Quelques phrases : ce que font ces deux répliques de Nadia, et ce que ça change pour le couple.',
    criteria: ['Les mots du client repris', 'M. Benali enfin écouté', 'Le vrai besoin découvert', 'La synthèse validée']
  },
  's4-4.4': {
    lede: { key: '« Comme tout le monde ! »', rest: 'Et si Nadia avait écouté ?' },
    mission: 'Quand Nadia répond « Pas trop loin, comme tout le monde ! », elle juge le souhait du couple. Réécrivez sa réplique avec une attitude de compréhension.',
    method: 'Cette réplique est surlignée dans l’entretien : écrivez ce que Nadia aurait pu dire.',
    situation: 'M. Benali vient de dire « Et pas trop loin », sans lever les yeux de son téléphone. Nadia répond : « comme tout le monde ».',
    task: 'Une réplique qui reprend le mot du client, ne juge pas et l’invite à préciser.',
    criteria: ['Le mot du client repris', 'Une invitation à préciser', 'Tourné vers M. Benali']
  },

  /* ══ SÉRIE 5 · ÉVALUER UNE POSTURE ═══════════════════════════════════ */

  's5-5.1': {
    lede: { key: 'Un quart d’heure,', rest: 'trois commerciaux. Qui l’écoute ?' },
    mission: 'Mme Royer est pressée et ses copieurs tombent en panne. Trois commerciaux lui répondent. Notez chacun avec la grille, classez-les du plus adapté au moins adapté, puis justifiez votre premier choix.',
    method: 'Un commercial à la fois : quatre critères notés de 0 à 2, puis le classement.',
    quote: 'J’ai un quart d’heure, on a un comité de direction à 11 h. Nos copieurs tombent en panne sans arrêt, les commerciaux râlent, et c’est moi qui prends.',
    situation: 'Mme Royer est office manager dans une entreprise de 80 salariés. Elle reçoit un commercial d’un distributeur de photocopieurs. Elle parle vite et regarde sa montre.',
    task: 'Quatre critères par commercial : la contrainte de temps, l’attitude d’écoute, la reformulation, l’ouverture de la découverte. Puis un classement et deux lignes de justification.',
    criteria: ['Des notes proches du repère', 'Un classement juste', 'Justification par critères']
  },

  /* ══ SÉRIE 6 · À VOUS DE RÉPONDRE ════════════════════════════════════ */

  's6-6.1': {
    lede: { key: 'Trois répliques,', rest: 'trois réponses, votre voix.' },
    mission: 'Choisissez un client, celui qui ressemble le plus à votre futur métier. Il vous dit trois choses : répondez à chacune, puis dites vos réponses à voix haute et déposez-les pour le retour de votre tuteur.',
    method: 'Une réplique à la fois, puis l’enregistrement et la grille.',
    situation: 'M. Garnier dans un magasin de literie, Mme Lefort dans son garage, ou Mme Duval qui vend la maison familiale. Chacun parle de son problème, et montre plus qu’il ne dit.',
    task: 'Réplique 1 : une réponse en attitude de compréhension. Réplique 2 : une réponse qui tient compte du signal non verbal, en adaptant votre rythme ou votre ton. Réplique 3 : une synthèse de tout l’échange, terminée par une validation. Aucun produit, aucune solution.',
    criteria: ['Compréhension, sans jugement ni solution', 'Adaptation au signal', 'Synthèse complète et validée', 'Ton posé à l’oral']
  },

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
