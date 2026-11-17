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

  /* ══ SÉRIE 3 · LE BESOIN RÉEL ═══════════════════════════════════════ */

  's3-3.1': {
    lede: { key: 'Ce qu’il demande,', rest: 'et ce dont il a besoin.' },
    mission: 'Cinq clients vous disent ce qu’ils veulent. Pour chacun, notez ce qu’il demande, faites une hypothèse sur ce qui se cache derrière, puis écrivez la question qui vous permettrait de la vérifier.',
    method: 'Un client à la fois : trois réponses, puis le client suivant.',
    quote: 'Je veux le vélo avec la plus grosse batterie.',
    situation: 'Un magasin de vélos électriques, un éditeur de logiciel de planning, une agence immobilière, une agence d’intérim, un opticien. Chaque demande cache peut-être autre chose.',
    task: 'Pour chaque client : le besoin explicite, un besoin implicite possible, et une question ouverte qui part de ses mots, sans souffler votre hypothèse.',
    criteria: ['Le besoin explicite, avec ses mots', 'Une hypothèse plausible', 'Hypothèse vérifiée, pas supposée']
  },

  /* ══ SÉRIE 4 · LES MOTIVATIONS D'ACHAT ══════════════════════════════ */

  's4-4.1': {
    lede: { key: 'Un mot,', rest: 'et la motivation apparaît.' },
    mission: 'Huit clients parlent de ce qu’ils veulent. Pour chacun, trouvez sa motivation dominante, puis le mot ou l’expression qui vous a mis sur la piste.',
    method: 'Une phrase à la fois : la motivation, puis le mot indice.',
    quote: 'Je veux être sûr que le moteur ne me lâchera pas au bout de deux ans.',
    situation: 'Sept motivations d’achat (SONCASE) : sécurité, orgueil, nouveauté, confort, argent, sympathie, environnement et éthique.',
    task: 'Huit phrases : pour chacune, la motivation dominante et le mot indice, recopié tel que le client l’a dit.',
    criteria: ['La bonne motivation', 'Le mot du client, pas votre impression']
  },
  's4-4.2': {
    lede: { key: 'Deux conjoints,', rest: 'deux façons de choisir.' },
    mission: 'Deuxième rendez-vous à l’agence : Laura fait le point avec M. et Mme Benali. Relevez les motivations de chacun, hiérarchisez leurs besoins, puis trouvez la question qui aurait départagé deux de leurs souhaits.',
    method: 'Trois étapes, l’échange toujours sous les yeux.',
    situation: 'Les Benali cherchent une maison avec jardin, autour de 280 000 €. Après une première visite, chacun dit ce qui compte pour lui.',
    task: 'Les motivations de Mme Benali et de M. Benali, avec leurs mots ; cinq besoins à classer (prioritaire, important, secondaire) ; une question pour départager « pas de travaux » et « chambre d’amis ».',
    criteria: ['Les motivations de chacun', 'Hiérarchie justifiée par les mots du client', 'Une question qui fait choisir']
  },

  /* ══ SÉRIE 5 · PRÉPARER ET MENER LA DÉCOUVERTE ═══════════════════════ */

  's5-5.1': {
    lede: { key: 'Deux guides,', rest: 'un seul fait parler.' },
    mission: 'Deux commerciaux préparent leur premier rendez-vous avec Mme Lefort, gérante d’un garage. Notez chaque guide de questions avec la grille, désignez le meilleur, puis réécrivez trois questions de l’autre.',
    method: 'Un guide à la fois : six critères notés de 0 à 2, puis le choix et les réécritures.',
    situation: 'Mme Lefort gère un garage indépendant de 6 salariés. Yanis et Clara, d’un distributeur de pièces automobiles, ont chacun rédigé leur guide.',
    task: 'Six critères par guide : l’entonnoir, les questions ouvertes, les problèmes et leurs coûts, les critères de choix, ni question orientée ni vente déguisée, une validation. Puis trois questions de Yanis à réécrire.',
    criteria: ['Des notes proches du corrigé', 'Le meilleur guide', 'Réécriture qui ouvre']
  },

  's5-5.2': {
    lede: { key: 'Votre guide,', rest: 'votre découverte.' },
    mission: 'Choisissez un client, celui qui ressemble le plus à votre futur métier. Préparez votre guide de questions, menez la découverte avec lui, puis analysez ce que vous avez découvert. Vous déposez ensuite votre guide et votre analyse pour le retour de votre tuteur.',
    method: 'Cinq étapes : le client, le guide, la découverte, l’analyse, la grille.',
    situation: 'M. Garnier au magasin de literie, Mme Lefort dans son garage, ou Mme Duval qui vend la maison familiale. Le client répond à vos questions, thème par thème : vous ne découvrez sa réponse qu’après avoir posé votre question.',
    task: 'Un guide en cinq étages (situation, problèmes et enjeux, précisions, motivations, validation) ; au moins quatre questions posées ; un besoin implicite, la motivation dominante, une hiérarchie provisoire. Aucun produit proposé.',
    criteria: ['Un guide en entonnoir', 'Une découverte réelle', 'Une hiérarchie appuyée sur les mots du client']
  },

  /* ══ SÉRIE 6 · POUR ALLER PLUS LOIN (facultatif) ═══════════════════ */

  's6-6.1': {
    lede: { key: 'Vos questions,', rest: 'son histoire.' },
    mission: 'Vous êtes Antoine, conseiller dans une concession automobile. Mme Rivière, infirmière libérale, vient pour un essai et n’a que trente minutes. À chaque étape, choisissez votre question et voyez son effet. Puis construisez la carte de ses besoins. Cette activité est facultative.',
    method: 'Le scénario (sept étapes, une jauge de découverte), la carte des besoins (six rubriques), puis la grille.',
    situation: 'La jauge part de 5 sur 10. Elle monte quand votre question fait émerger une information utile, elle baisse quand elle ferme l’échange. La fin de l’entretien dépend de la jauge.',
    task: 'Une partie jouée jusqu’au bout ; une carte des besoins : besoins explicites et implicites, motivations, hiérarchie, ce qui manque, votre auto-critique.',
    criteria: ['Des questions qui font parler', 'Chaque information reliée à sa question', 'Une hiérarchie qui vient de la cliente']
  },

  's6-6.2': {
    lede: { key: 'Son entretien,', rest: 'votre regard de coach.' },
    mission: 'Deux collègues vous confient la transcription de leur deuxième rendez-vous : « Je pensais avoir bien questionné, mais je repars sans savoir quoi proposer. » Choisissez un entretien, relisez-le moment par moment, repérez ce qui a ouvert ou fermé la découverte, et aidez votre collègue à progresser. Cette activité est facultative.',
    method: 'L’entretien (dix moments à diagnostiquer), les 3 moments décisifs, vos réécritures, ce qu’il fallait savoir, la fiche de coaching, puis la grille.',
    situation: 'Deux dossiers au choix : Camille, conseillère dans un magasin de cuisines, ou Karim, attaché commercial d’une entreprise de propreté. Vous pourrez faire l’autre ensuite.',
    task: 'Un diagnostic pour chaque moment ; trois moments décisifs, réécrits ; ce que votre collègue aurait dû savoir, hiérarchisé ; une fiche de coaching factuelle, qui commence par le positif.',
    criteria: ['Des moments vraiment décisifs', 'Des questions de remplacement sans produit', 'Un retour factuel, qui ne juge pas la personne']
  },

  's6-6.3': {
    lede: { key: 'Vos clients,', rest: 'vos questions.' },
    mission: 'Lucas arrive lundi en alternance. Votre responsable vous demande de lui préparer une banque de questions pour réussir ses découvertes client, à partir de ce que vous vivez dans votre métier. Cette activité est facultative.',
    method: 'Vos 3 situations, le bon réflexe pour chacune, une fiche de questions par situation, vos 5 règles d’or, un test terrain, puis la grille.',
    situation: 'Vous choisissez 3 situations parmi 8 : le client qui sait ce qu’il veut, celui qui « regarde juste », le premier rendez-vous avec une entreprise, l’appel entrant, le client accompagné, le client pressé, le renouvellement, le client qui revient après un problème.',
    task: 'Trois fiches (situation réelle, ce qu’il faut découvrir, questions pour ouvrir, creuser, préciser et classer, mots indices, piège à éviter) et cinq règles d’or.',
    criteria: ['Des questions ouvertes pour ouvrir et creuser', 'Des questions fermées réservées aux précisions', 'Une banque ancrée dans votre métier']
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
