/* PAGES DE CONTEXTE · ce qui s'affiche avant chaque exercice.
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
 * Modifiez les textes ici : aucun code d'écran à toucher.
 */
window.ATELIER_BRIEFINGS = {

  /* ══ SÉRIE 1 · BÂTIR L'ARGUMENT ═══════════════════════════════════════ */

  's1-1.1': {
    lede: { key: 'Trois cartes vont ensemble.', rest: 'La quatrième se cache parmi elles.' },
    mission: 'Dans chacune des trois séries, écartez la carte intruse, puis dites si le trio restant réunit des caractéristiques, des avantages ou des preuves.',
    method: 'Cliquez sur la carte intruse pour l’écarter.',
    situation: 'Vous préparez la présentation de RelaCosy, un logiciel CRM pour les PME. Vos notes mélangent ce que fait le produit, ce que le client y gagne et ce qui le prouve.',
    task: 'Pour chaque série de quatre cartes, repérez l’intrus, puis identifiez la catégorie commune aux trois autres.',
    criteria: ['Distinguer caractéristique, avantage et preuve', 'Justifier mentalement chaque choix avant de valider']
  },

  's1-1.2': {
    lede: { key: 'Un bon argument a trois étages.', rest: 'À vous de les surligner.' },
    mission: 'Surlignez précisément la caractéristique, l’avantage et la preuve de chacun des deux arguments.',
    method: 'Choisissez un surligneur, puis cliquez ou balayez les mots.',
    situation: 'Deux arguments de vente de RelaCosy sont déjà rédigés. Ils respectent la méthode CAP : il reste à en délimiter les composantes.',
    task: 'Pour chaque argument, colorez les mots de la caractéristique, de l’avantage et de la preuve. Les mots de liaison restent neutres.',
    criteria: ['Des limites précises entre les trois composantes', 'Les trois composantes repérées dans chaque argument']
  },

  's1-1.3': {
    lede: { key: 'Une fiche produit, trois besoins.', rest: 'Fabriquez trois arguments sur mesure.' },
    mission: 'Pour chaque priorité du prospect, sélectionnez les caractéristiques utiles, formulez l’avantage, puis choisissez la preuve.',
    method: 'Glissez les cartes de la fiche produit dans l’atelier, ou cliquez-les.',
    situation: 'Votre prospect dirige une PME de 12 salariés, sans service informatique. Il veut sécuriser ses données, fonctionner sans équipe technique et maîtriser son budget.',
    task: 'Construisez un argument CAP par besoin, en ne retenant que les informations qui y répondent.',
    criteria: ['Des caractéristiques reliées au besoin, sans information hors sujet', 'Un avantage formulé du point de vue du client', 'Une preuve vérifiable']
  },

  's1-1.4': {
    lede: { key: 'Écoutez ses mots.', rest: 'Ils trahissent ce qui le motive vraiment.' },
    mission: 'Repérez les indices dans les propos de chaque client, identifiez sa motivation dominante, choisissez les deux arguments qui lui parlent, puis justifiez.',
    method: 'Cliquez sur les mots qui vous mettent sur la piste.',
    situation: 'Deux clients de RelaCosy s’expriment. Leurs mots révèlent l’une des six motivations SONCAS : sécurité, orgueil, nouveauté, confort, argent, sympathie.',
    task: 'Pour chaque client : indices, motivation dominante, deux arguments adaptés et une justification de 300 caractères maximum.',
    criteria: ['Une motivation appuyée sur les mots du client', 'Deux arguments qui répondent à cette motivation', 'Une justification qui relie les deux']
  },

  's1-1.5': {
    lede: { key: 'Quatre arguments, un seul vainqueur.', rest: 'Faites-les s’affronter.' },
    mission: 'À chaque duel, choisissez l’argument qui répond le mieux au besoin de sécurité du client, jusqu’à désigner le grand gagnant, puis justifiez.',
    method: 'Cliquez sur le meilleur argument de chaque duel.',
    quote: 'J’ai déjà été piraté. Je veux être certain que mes données seront parfaitement protégées.',
    situation: 'Votre client a été victime d’un piratage. Sa motivation dominante est la sécurité. Quatre arguments de RelaCosy s’affrontent en demi-finales, puis en finale.',
    task: 'Départagez les deux demi-finales, désignez le vainqueur de la finale, puis expliquez en une ou deux phrases pourquoi il est le plus décisif.',
    criteria: ['Hiérarchiser selon le risque précis exprimé', 'Une justification reliée aux mots du client']
  },

  's1-1.6': {
    lede: { key: 'Faites le pire,', rest: 'pour mieux savoir le réparer.' },
    mission: 'Rédigez volontairement le pire argumentaire possible, diagnostiquez-en trois erreurs majeures, puis réécrivez-le pour répondre aux besoins du client.',
    method: 'Trois étapes : construire, analyser, réparer.',
    situation: 'Vous vendez RelaCosy à une PME qui veut sécuriser ses données, être accompagnée faute de service informatique, et maîtriser son budget.',
    task: 'Écrivez un argumentaire désastreux, nommez trois erreurs et leur impact, puis proposez une version qui répond aux trois besoins avec des bénéfices concrets et des preuves.',
    criteria: ['Un diagnostic qui nomme l’erreur et son effet sur le client', 'Une version réparée qui couvre les trois besoins', 'Des bénéfices concrets appuyés de preuves']
  },

  /* ══ SÉRIE 2 · PITCHER AVEC IMPACT ════════════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Idée reçue ou bonne pratique ?', rest: 'Tranchez, une affirmation à la fois.' },
    mission: 'Classez huit affirmations sur l’argumentation commerciale : mythe ou méthode.',
    method: 'Glissez la carte vers une catégorie, ou cliquez la catégorie.',
    situation: 'On entend beaucoup de choses sur l’art de convaincre. Certaines sont des réflexes utiles, d’autres des idées fausses qui desservent le commercial.',
    task: 'Classez chaque affirmation, relisez votre classement, puis validez pour découvrir le corrigé.',
    criteria: ['Distinguer les idées reçues des bonnes pratiques']
  },

  's2-2.2': {
    lede: { key: 'Même idée, cinq formulations.', rest: 'Laquelle convainc vraiment ?' },
    mission: 'Classez cinq propositions de la moins convaincante à la plus percutante.',
    method: 'Glissez chaque proposition sur l’échelle, ou cliquez-la puis cliquez un échelon.',
    situation: 'Les cinq phrases parlent toutes de la sécurité des données. Elles diffèrent par leur précision, leur point de vue et la présence d’une preuve.',
    task: 'Placez chaque proposition sur un échelon de 1 (moins convaincante) à 5 (plus percutante).',
    criteria: ['Repérer ce qui affaiblit une phrase : hésitation, flou, « on »', 'Repérer ce qui la renforce : « vous », précision, preuve']
  },

  's2-2.3': {
    lede: { key: 'Les premières secondes décident.', rest: 'Trois accroches pour les gagner.' },
    mission: 'Rédigez trois accroches de natures différentes pour une gérante de PME : une question, un chiffre-choc, un bénéfice projeté.',
    method: 'Une accroche par onglet, 160 caractères maximum.',
    situation: 'Une gérante de PME perd du temps dans la gestion de tâches répétitives. Vous lui présentez RelaCosy et devez capter son attention dès la première phrase.',
    task: 'Rédigez une question qui l’amène à reconnaître le temps perdu, un chiffre-choc qui rend le problème concret, et un bénéfice qui la projette dans le résultat.',
    criteria: ['Courte', 'Concrète', 'Centrée sur le client']
  },

  's2-2.4': {
    lede: { key: 'Une affirmation sans preuve', rest: 'n’est qu’une promesse.' },
    mission: 'Pour chacune des cinq affirmations d’un pitch, dites si elle est étayée par une preuve concrète ou s’il s’agit d’un trou de preuve.',
    method: 'Cochez une seule case par ligne.',
    situation: 'Un commercial présente RelaCosy en cinq phrases. Certaines s’appuient sur des faits vérifiables, d’autres sur des superlatifs gratuits.',
    task: 'Qualifiez chaque affirmation : étayée, ou trou de preuve.',
    criteria: ['Reconnaître une preuve vérifiable', 'Repérer les superlatifs sans source']
  },

  's2-2.5': {
    lede: { key: 'Passez le pitch à la grille.', rest: 'Puis trouvez LA correction qui change tout.' },
    mission: 'Notez un pitch sur les six critères de la grille commune, de 0 à 2, puis désignez la modification prioritaire.',
    method: 'Une note par critère, puis une priorité rédigée.',
    situation: 'Un commercial présente RelaCosy en trois phrases : une liste de fonctions et un « je pense que ça peut vous convenir ».',
    task: 'Évaluez le pitch critère par critère, puis formulez concrètement la modification qui aurait le plus fort impact.',
    criteria: ['Des notes cohérentes avec le pitch', 'Une priorité unique, concrète et argumentée']
  },

  's2-2.6': {
    lede: { key: 'Soixante secondes.', rest: 'Pas une de plus pour convaincre.' },
    mission: 'Rédigez votre pitch de RelaCosy pour un prospect soucieux de sécurité, enregistrez-le en 60 secondes maximum, puis auto-évaluez-vous.',
    method: 'Rédiger, enregistrer, s’évaluer.',
    situation: 'Votre prospect est très attentif à la sécurité de ses données. Vous disposez d’une minute pour lui présenter RelaCosy.',
    task: 'Structurez votre pitch (accroche, deux bénéfices prouvés, conclusion), enregistrez une prise audio ou vidéo, puis notez-vous sur les sept critères.',
    criteria: ['Une structure complète en 60 secondes', 'Des bénéfices appuyés de preuves', 'Un ton affirmatif, orienté client']
  },

  /* ══ SÉRIE 3 · ARGUMENTER AVEC JUSTESSE ═══════════════════════════════ */

  's3-3.1': {
    lede: { key: 'Deux vérités, une erreur.', rest: 'Saurez-vous la débusquer ?' },
    mission: 'Dans chacune des trois séries, sélectionnez l’affirmation fausse, puis expliquez pourquoi elle pénalise l’échange.',
    method: 'Une affirmation à cocher, une explication courte.',
    situation: 'Chaque série réunit trois affirmations sur l’argumentation : deux bonnes pratiques et une erreur fréquente.',
    task: 'Repérez l’erreur et décrivez concrètement son effet sur le client, en 240 caractères maximum.',
    criteria: ['Identifier l’erreur', 'Expliquer son effet concret sur le client']
  },

  's3-3.2': {
    lede: { key: 'Chaque geste du vendeur', rest: 'provoque une réaction chez le client.' },
    mission: 'Associez chacun des six comportements du commercial à la réaction la plus probable du client.',
    method: 'Glissez chaque numéro vers une réaction, ou cliquez le numéro puis l’emplacement.',
    situation: 'La façon d’argumenter influence directement le client : elle peut le rassurer, le perdre ou le faire douter.',
    task: 'Placez les six numéros, chacun une seule fois.',
    criteria: ['Relier un comportement à son effet sur le client']
  },

  's3-3.3': {
    lede: { key: 'Le bon argument,', rest: 'c’est celui qui arrive au bon moment.' },
    mission: 'Au fil de l’entretien, le client formule trois attentes. Pour chacune, choisissez l’argument le plus pertinent.',
    method: 'Un argument par besoin, chacun ne sert qu’une fois.',
    situation: 'Cinq arguments sont disponibles. Trois répondent aux attentes du client ; deux sont des intrus.',
    task: 'Associez un argument à chaque attente, sans réutiliser un argument déjà retenu.',
    criteria: ['Un argument qui répond directement à l’attente exprimée', 'Écarter les intrus']
  },

  's3-3.4': {
    lede: { key: 'Restez sur la cible.', rest: 'Tout le reste est une dérive.' },
    mission: 'Pour chacun des cinq arguments du commercial, dites s’il répond à la priorité du client ou s’il s’écarte du sujet.',
    method: 'Cochez une seule case par ligne, puis calculez votre score.',
    quote: 'Je veux réduire le temps passé sur mes tâches administratives.',
    situation: 'Le client a exprimé une priorité claire. Le commercial enchaîne cinq arguments, pas tous en rapport avec elle.',
    task: 'Qualifiez chaque argument : pertinent ou dérive.',
    criteria: ['Rester fidèle à la priorité exprimée', 'Repérer les arguments vrais mais hors sujet']
  },

  's3-3.5': {
    lede: { key: 'Un argument sans question', rest: 'est un argument sans réponse.' },
    mission: 'Pour chacune des quatre répliques, dites si le vendeur vérifie l’impact de son argument ou pousse son argumentation. S’il pousse, rédigez la question qu’il aurait pu poser.',
    method: 'Une réplique à la fois.',
    situation: 'Un commercial présente RelaCosy. Parfois il laisse le client réagir, parfois il enchaîne sans vérifier l’effet produit.',
    task: 'Qualifiez chaque réplique et, le cas échéant, rédigez une question de contrôle de 180 caractères maximum.',
    criteria: ['Reconnaître une vérification de l’impact', 'Une question de contrôle ouverte et reliée à l’argument']
  },

  's3-3.6': {
    lede: { key: 'Un argument, deux réactions possibles.', rest: 'Préparez les deux branches.' },
    mission: 'Construisez un argument CAP à partir du besoin du client, puis prévoyez votre réponse s’il est convaincu et s’il reste sceptique.',
    method: 'Cinq étapes, l’arbre se construit à chaque réponse.',
    quote: 'Réduire le temps consacré aux tâches administratives.',
    situation: 'Votre client veut réduire le temps consacré aux tâches administratives. Selon sa réaction à votre argument, l’échange peut prendre deux directions.',
    task: 'Rédigez la caractéristique, l’avantage et la preuve, puis la suite de l’échange pour un client convaincu et pour un client sceptique.',
    criteria: ['Un tronc CAP fidèle au besoin', 'Une conclusion engageante face au client convaincu', 'Un traitement du doute face au client sceptique']
  },

  /* ══ SÉRIE 4 · MANIPULATION ═══════════════════════════════════════════ */

  's4-1.1': {
    lede: { key: 'C, A ou P ?', rest: 'Six affirmations à qualifier.' },
    mission: 'Pour chaque affirmation, dites s’il s’agit d’une caractéristique, d’un avantage ou d’une preuve.',
    method: 'Un clic sur C, A ou P.',
    situation: 'Six phrases extraites d’un argumentaire de RelaCosy mélangent les trois composantes de la méthode CAP.',
    task: 'Qualifiez les six affirmations, puis vérifiez vos réponses.',
    criteria: ['Distinguer les trois composantes de la méthode CAP']
  },

  's4-1.2': {
    lede: { key: 'D’une caractéristique,', rest: 'tirez un argument complet.' },
    mission: 'Pour deux caractéristiques, rédigez l’avantage pour le client puis la preuve qui le rend crédible.',
    method: 'Deux champs par ligne : avantage, puis preuve.',
    situation: 'Deux caractéristiques sont données : une livraison en 24 heures et une formation des utilisateurs incluse.',
    task: 'Déroulez la chaîne CAP pour chacune.',
    criteria: ['Un avantage concret, du point de vue du client', 'Une preuve factuelle et vérifiable']
  },

  's4-2.1': {
    lede: { key: 'Ce que le produit possède,', rest: 'ou ce que le client y gagne ?' },
    mission: 'Pour chaque formulation, dites s’il s’agit d’une caractéristique ou d’un bénéfice client.',
    method: 'Un clic sur C ou B.',
    situation: 'Six formulations vont par paires : une caractéristique, puis le bénéfice qu’elle procure.',
    task: 'Qualifiez les six formulations, puis vérifiez vos réponses.',
    criteria: ['Distinguer la donnée produit de la valeur pour l’utilisateur']
  },

  's4-2.2': {
    lede: { key: 'Parlez client,', rest: 'pas fiche technique.' },
    mission: 'Traduisez deux fiches techniques en bénéfices concrets, en une phrase qui commence par « Vous… ».',
    method: 'Une phrase par défi.',
    situation: 'Un logiciel avec sauvegarde automatique, un bien immobilier en double exposition : deux caractéristiques à rendre parlantes.',
    task: 'Exprimez ce que le client vivra réellement grâce à chaque caractéristique.',
    criteria: ['Résultat vécu', 'Langage simple', 'Phrase directe']
  },

  's4-3.1': {
    lede: { key: 'Défi express :', rest: 'à faire, ou à éviter ?' },
    mission: 'Classez six comportements commerciaux, un par un : bonne pratique ou erreur à éviter.',
    method: 'Cliquez une réponse ou glissez la carte : la suivante apparaît d’elle-même.',
    situation: 'Six comportements observés en entretien de vente : certains renforcent la persuasion, d’autres la sabotent.',
    task: 'Classez les six cartes, relisez, puis validez.',
    criteria: ['Reconnaître les comportements qui renforcent la persuasion']
  },

  's4-3.2': {
    lede: { key: 'Trop d’arguments', rest: 'tue l’argument.' },
    mission: 'Lisez un court échange, puis relevez les trois erreurs majeures du commercial.',
    method: 'Trois erreurs à décrire, puis la comparaison avec le corrigé.',
    quote: 'Je cherche surtout quelque chose de simple à utiliser.',
    situation: 'Un client demande un outil simple. Le commercial répond par une longue liste de fonctions techniques ; le client décroche.',
    task: 'Décrivez trois erreurs, en observant le fond, le rythme et l’écoute.',
    criteria: ['Le besoin ignoré', 'L’avalanche de caractéristiques', 'Le signal du client non relevé']
  }
};
