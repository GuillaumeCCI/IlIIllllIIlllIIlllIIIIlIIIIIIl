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

  /* ══ SÉRIE 1 · GÉRER LES OBJECTIONS ═══════════════════════════════════ */

  's1-1.1': {
    lede: { key: 'Huit attitudes, deux réponses.', rest: 'Fiez-vous à votre premier réflexe.' },
    mission: 'Pour chacune des huit attitudes du commercial face à une objection, dites s’il s’agit d’un bon réflexe ou d’une attitude à éviter.',
    method: 'Cliquez sur une réponse : la situation suivante apparaît.',
    situation: 'Un client émet une objection en plein rendez-vous. Le commercial a plusieurs façons de réagir : certaines ouvrent l’échange, d’autres le ferment.',
    task: 'Classez les huit situations, relisez votre classement, puis validez pour découvrir le corrigé.',
    criteria: ['Distinguer une attitude constructive d’un mauvais réflexe', 'Repérer ce qui braque le client']
  },

  's1-1.2': {
    lede: { key: 'Six étapes, six rôles.', rest: 'À vous de les relier.' },
    mission: 'Associez chacun des six rôles à l’étape de la méthode de traitement des objections qui lui correspond.',
    method: 'Cliquez sur un verbe : le rôle suivant apparaît. Chaque verbe ne sert qu’une fois.',
    situation: 'Traiter une objection se fait en six étapes : accueillir, questionner, reformuler, traiter, contrôler, enchaîner. Chacune a un rôle précis dans l’échange.',
    task: 'Pour chaque rôle présenté, choisissez l’étape qui le remplit.',
    criteria: ['Connaître le rôle de chaque étape', 'Ne pas confondre questionner et reformuler, traiter et contrôler']
  },

  's1-1.3': {
    lede: { key: 'D’abord comprendre,', rest: 'ensuite réagir.' },
    mission: 'Pour chacune des quatre objections, posez le diagnostic de sa nature, puis choisissez le premier geste à adopter.',
    method: 'Deux décisions par cas : la nature, puis le geste. Le bouton « Rappel » rouvre la méthode.',
    quote: 'Vos sièges sont plus chers que mon fournisseur actuel.',
    situation: 'Vous êtes commercial chez Ergolys, fabricant de mobilier ergonomique. Quatre clients vous opposent une objection. Avant de répondre, il faut savoir à quoi l’on a affaire.',
    task: 'Une objection peut être sincère et fondée, non fondée (un malentendu), un prétexte ou une demande de réassurance. À chaque nature son premier geste : argumenter, informer, creuser ou rassurer.',
    criteria: ['Un diagnostic appuyé sur les mots du client', 'Un premier geste cohérent avec la nature retenue']
  },

  's1-1.4': {
    lede: { key: '« On verra »', rest: 'ne veut jamais dire « non ».' },
    mission: 'Lisez l’échange, formulez l’objection que le client garde pour lui, puis la question ouverte qui la ferait émerger.',
    method: 'Deux champs à remplir. Un indice est disponible si besoin.',
    situation: 'Dans un magasin de décoration, un client s’apprête à partir sans acheter. Il esquive : « je vais réfléchir ». La commerciale lui propose de le rappeler dans un mois.',
    task: 'Une dérobade masque souvent une objection non dite. Formulez une hypothèse, puis la question qui permettrait de la vérifier sans la suggérer.',
    criteria: ['Une hypothèse plausible au regard de la scène', 'Une question ouverte, qui ne présume pas de la réponse']
  },

  's1-1.5': {
    lede: { key: 'Deux commerciaux, une objection.', rest: 'Lequel la traite vraiment ?' },
    mission: 'Comparez deux réponses à « C’est trop cher », choisissez la plus efficace, puis expliquez votre choix.',
    method: 'Cochez une réponse, puis rédigez votre justification.',
    quote: 'C’est trop cher.',
    situation: 'Un client trouve le prix trop élevé. Deux commerciaux lui répondent chacun à leur manière.',
    task: 'Choisissez la réponse qui aide à comprendre et à traiter l’objection. Appuyez votre justification sur les étapes de la méthode.',
    criteria: ['Le bon choix', 'Une justification qui cite les étapes respectées ou oubliées']
  },

  's1-1.6': {
    lede: { key: 'Une objection, six phrases.', rest: 'Déroulez la méthode jusqu’au bout.' },
    mission: 'Choisissez une objection, puis rédigez une phrase adressée au client pour chacune des six étapes de la méthode. Terminez par une auto-évaluation.',
    method: 'Une étape à la fois. Un repère est disponible à chaque étape.',
    quote: 'Nos chaises actuelles suffisent.',
    situation: 'Vous rencontrez le responsable des services généraux d’une entreprise. Il vous oppose une objection. Vous allez lui répondre en suivant les six étapes, sans en sauter une.',
    task: 'Accueillir, questionner, reformuler, traiter, contrôler, enchaîner : une phrase pour chaque étape, comme si vous lui parliez. Puis relisez-vous avec la grille d’auto-évaluation.',
    criteria: ['Une phrase par étape, qui remplit son rôle', 'Un ton naturel, à l’oral', 'Une suite concrète pour finir']
  },

  's1-1.7': {
    lede: { key: 'Quatre objections fréquentes.', rest: 'Quatre fiches prêtes à servir.' },
    mission: 'Préparez une fiche pour chacune des quatre objections : sa nature, une question pour creuser, une réponse type et une preuve à citer.',
    method: 'Une fiche à la fois. La liste de gauche permet d’y revenir.',
    situation: 'Les mêmes objections reviennent de rendez-vous en rendez-vous. Mieux vaut les préparer à froid que les improviser à chaud.',
    task: 'Complétez les quatre fiches. Vous pourrez les consulter en tableau, puis les comparer au corrigé.',
    criteria: ['Une question ouverte pour creuser', 'Une réponse courte, centrée sur le client', 'Une preuve concrète et vérifiable']
  },

  /* ══ SÉRIE 2 · PROSPECTION TÉLÉPHONIQUE ═══════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Au téléphone, tout « non »', rest: 'n’est pas un refus.' },
    mission: 'Classez six répliques entendues au téléphone : barrage du standard, prétexte ou objection réelle.',
    method: 'Pour chaque réplique, cliquez sur B, P ou O.',
    situation: 'Vous prospectez par téléphone. Entre l’accueil qui filtre et le décideur qui esquive, il faut reconnaître ce qu’on entend pour savoir comment réagir.',
    task: 'Un barrage fait obstacle à la mise en relation, un prétexte évite la conversation, une objection réelle exprime un frein légitime.',
    criteria: ['Reconnaître le barrage du standard', 'Distinguer une esquive d’un frein réel']
  },

  's2-2.2': {
    lede: { key: 'Chaque maladresse a un prix.', rest: 'Reliez-la à sa conséquence.' },
    mission: 'Associez chacune des cinq erreurs de prospection à la raison pour laquelle l’appel échoue.',
    method: 'Cliquez une erreur, puis sa conséquence. Vous pouvez aussi glisser l’erreur.',
    situation: 'Un appel de prospection se joue en quelques secondes. Certaines erreurs sont si fréquentes qu’on ne les remarque plus.',
    task: 'Reliez les cinq erreurs aux cinq conséquences, une conséquence par erreur.',
    criteria: ['Comprendre l’effet de chaque maladresse sur le prospect']
  },

  's2-2.3': {
    lede: { key: 'Le standard n’est pas un mur.', rest: 'C’est un allié à convaincre.' },
    mission: 'Répondez à l’accueil téléphonique en deux tours de parole, pour obtenir un créneau ou le nom du bon interlocuteur.',
    method: 'Écrivez exactement ce que vous diriez, puis cochez les clés respectées.',
    quote: 'C’est à quel sujet ? M. Riveau n’est pas disponible.',
    situation: 'Vous appelez pour Ergolys une entreprise de 80 salariés. Vous souhaitez parler à M. Riveau, responsable des services généraux. L’accueil vous filtre.',
    task: 'Deux réponses courtes, de 240 caractères au plus : courtoises, brèves et facilitantes.',
    criteria: ['Courtois : présentation et politesse', 'Bref : le sujet en quelques mots', 'Facilitant : une question qui donne une issue']
  },

  's2-2.4': {
    lede: { key: 'Un appel de vingt secondes,', rest: 'quatre maladresses.' },
    mission: 'Lisez la transcription d’un appel de prospection et notez quatre erreurs précises du commercial.',
    method: 'Une erreur par ligne. Un indice est disponible.',
    situation: 'Un commercial d’Ergolys appelle une responsable d’entreprise. L’appel se termine sur une demande de documentation, et c’est tout.',
    task: 'Repérez ce qui a fait échouer l’appel : ce que le commercial a dit, et ce qu’il n’a pas fait.',
    criteria: ['Des erreurs précises, pas des impressions', 'Les quatre erreurs repérées']
  },

  's2-2.5': {
    lede: { key: '« Envoyez-moi une doc »', rest: 'n’est pas la fin de l’appel.' },
    mission: 'Choisissez la réponse qui fait avancer l’échange face à une demande de documentation, puis expliquez pourquoi.',
    method: 'Cochez une réponse, puis rédigez votre justification.',
    quote: 'Envoyez-moi plutôt une documentation.',
    situation: 'En plein appel de prospection, la cliente vous demande une documentation. Deux réponses sont possibles.',
    task: 'Pensez à la suite donnée à la conversation : laquelle garde la main ?',
    criteria: ['Le bon choix', 'Une justification centrée sur la suite de l’échange']
  },

  's2-2.6': {
    lede: { key: 'Trois esquives classiques.', rest: 'Trois rebonds prêts à l’emploi.' },
    mission: 'Rédigez une réponse de 2 à 3 phrases pour chacune des trois esquives, puis lisez-les à voix haute et évaluez votre voix.',
    method: 'Un script à la fois, puis l’auto-évaluation, avec un enregistrement facultatif.',
    quote: 'Je n’ai pas le temps.',
    situation: 'Au téléphone, trois esquives reviennent sans cesse : le manque de temps, la demande de documentation, le fournisseur déjà en place.',
    task: 'Chaque script doit accuser réception, préserver la relation et proposer une suite concrète. Puis votre voix doit le porter.',
    criteria: ['Accuser réception', 'Préserver la relation', 'Proposer une suite concrète', 'Une voix posée et souriante']
  },

  's2-2.7': {
    lede: { key: 'Une carte par esquive,', rest: 'à garder sous les yeux pendant l’appel.' },
    mission: 'Préparez trois cartes réflexes : pour chaque esquive, la posture, la réponse et le rebond.',
    method: 'Trois gestes par carte, un à la fois. Un repère est disponible à chaque geste.',
    situation: 'En session d’appels, on n’a pas le temps de réfléchir : il faut des réflexes. Vos cartes vous les rappelleront.',
    task: 'Une fois les trois cartes terminées, votre fiche s’ouvre en mode appel, à imprimer ou à garder à l’écran.',
    criteria: ['Une posture décrite concrètement', 'Une réponse courte et naturelle', 'Un rebond qui relance l’échange']
  },

  /* ══ SÉRIE 3 · MANIPULATION ═══════════════════════════════════════════ */

  's3-1.1': {
    lede: { key: 'Six cartes en vrac.', rest: 'Remettez la méthode dans l’ordre.' },
    mission: 'Placez les six cartes sur le parcours, du départ à l’arrivée, dans l’ordre de la méthode de traitement des objections.',
    method: 'Sélectionnez une carte puis une case, ou glissez-la.',
    situation: 'Chaque carte illustre une étape de la réponse à une objection, mais elles ont été mélangées.',
    task: 'Reconstruisez le parcours, puis débloquez la méthode pour découvrir le nom de chaque étape.',
    criteria: ['Les six étapes dans le bon ordre']
  },

  's3-1.2': {
    lede: { key: 'Une réponse au prix', rest: 'qui fonce droit dans le mur.' },
    mission: 'Repérez quatre maladresses dans la réponse d’un commercial à « C’est trop cher », puis réécrivez-la.',
    method: 'Cliquez les passages pour y poser un drapeau, nommez chaque erreur, puis réécrivez.',
    quote: 'C’est trop cher.',
    situation: 'Un commercial répond à une objection sur le prix. Sa réponse accumule les erreurs.',
    task: 'Diagnostic d’abord : quatre erreurs nommées précisément. Réécriture ensuite : la réponse qu’il aurait dû faire.',
    criteria: ['Quatre maladresses nommées', 'Une réécriture qui suit les étapes de la méthode']
  },

  's3-2.1': {
    lede: { key: 'Six réactions,', rest: 'quatre natures possibles.' },
    mission: 'Rangez chacune des six réactions dans le dossier de sa nature la plus probable.',
    method: 'Choisissez un dossier, puis « Classer et passer à la suivante ». Vous pouvez aussi glisser la carte.',
    situation: 'Des prospects réagissent à votre proposition. Avant de répondre, il faut savoir de quoi il s’agit.',
    task: 'Prétexte, objection sincère et fondée, malentendu ou demande de réassurance : à vous de classer.',
    criteria: ['Une nature appuyée sur les mots du prospect']
  },

  's3-2.2': {
    lede: { key: 'Trois mauvais réflexes.', rest: 'Trois réponses à réparer.' },
    mission: 'Pour chacun des trois cas, expliquez pourquoi le réflexe du commercial bloque, puis rédigez votre réponse adaptée.',
    method: 'Un cas à la fois. Cochez ce que votre réponse comporte : accueil, question, suite.',
    quote: 'Je n’ai pas le temps là.',
    situation: 'Au téléphone, trois prospects esquivent. Le commercial réagit chaque fois par un mauvais réflexe.',
    task: 'Transformez chaque réflexe en réponse qui ouvre l’échange : écoutez, clarifiez, puis proposez une suite concrète.',
    criteria: ['Comprendre l’effet du mauvais réflexe', 'Une réponse avec accueil, question et suite']
  }
};
