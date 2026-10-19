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

  /* ══ SÉRIE 1 · ANNONCER LE PRIX ═══════════════════════════════════════ */

  's1-1.1': {
    lede: { key: 'Le prix ne s’improvise pas.', rest: 'Il s’annonce.' },
    mission: 'Pour chacune des six affirmations sur l’annonce du prix, dites si elle est vraie ou fausse.',
    method: 'Une affirmation à la fois : choisissez V ou F, puis validez.',
    situation: 'Vous présentez l’offre Ergolys à un client. Vient le moment d’annoncer le prix : quand, comment, avec quels mots ?',
    task: 'Tranchez les six affirmations. Les explications apparaissent après la dernière.',
    criteria: ['Savoir quand annoncer le prix', 'Annoncer avec assurance, sans s’excuser']
  },
  's1-1.2': {
    lede: { key: 'Bénéfice, prix, réassurance.', rest: 'Le prix au milieu.' },
    mission: 'Repérez les trois temps de la méthode sandwich dans la réplique du commercial.',
    method: 'Choisissez un surligneur, puis cliquez le passage correspondant.',
    situation: 'Le commercial annonce le prix d’un siège ergonomique à 690 €. Sa réplique est construite en trois temps.',
    task: 'Surlignez le bénéfice, le prix et la réassurance.',
    criteria: ['Un passage par temps', 'Le prix encadré par de la valeur']
  },
  's1-1.4': {
    lede: { key: '« Ça coûte combien ? »', rest: 'La question arrive trop tôt.' },
    mission: 'Analysez le risque pris par le commercial, puis rejouez sa réplique.',
    method: 'Deux champs : le diagnostic, puis votre nouvelle réplique.',
    quote: 'Bon, on va gagner du temps : ça coûte combien votre truc ?',
    situation: 'Dès le début du rendez-vous, le client demande le prix. Le commercial répond aussitôt : 17 000 € pour 10 postes.',
    task: 'Répondez à la question sans perdre la possibilité de comprendre le besoin.',
    criteria: ['Un risque clairement identifié', 'Une réponse honnête qui ouvre sur le besoin']
  },
  's1-1.5': {
    lede: { key: 'Même prix,', rest: 'deux façons de le présenter.' },
    mission: 'Comparez deux annonces du même prix, choisissez la plus efficace et justifiez avec au moins deux critères.',
    method: 'Choisissez une annonce, cochez vos critères, puis expliquez.',
    situation: 'Deux commerciaux annoncent le même siège à 690 €.',
    task: 'Appuyez votre choix sur la posture, la structure, le vocabulaire ou la clarté.',
    criteria: ['Le bon choix', 'Au moins deux critères justifiés']
  },
  's1-1.7': {
    lede: { key: 'Trois prix, trois annonces', rest: 'prêtes pour vos rendez-vous.' },
    mission: 'Rédigez une annonce complète pour le siège (690 €), le poste complet (1 900 €) et le pack 10 postes (17 000 €).',
    method: 'Une carte à la fois. Les éléments de l’offre restent consultables.',
    situation: 'Mieux vaut préparer ses annonces à froid que les improviser devant le client.',
    task: 'Chaque annonce suit la méthode sandwich : bénéfice, prix, réassurance.',
    criteria: ['Une formulation naturelle, prête à être dite', 'Le prix sans hésitation', 'Un bénéfice et une réassurance concrets']
  },

  /* ══ SÉRIE 2 · DÉFENDRE LE PRIX ═══════════════════════════════════════ */

  's2-2.1': {
    lede: { key: 'Défendre son prix,', rest: 'ce n’est pas le brader.' },
    mission: 'Examinez six pratiques face à une objection sur le prix : vrai ou faux ?',
    method: 'Une affirmation à la fois. Le débrief s’ouvre après les six réponses.',
    situation: 'Le client trouve le prix élevé. Certaines réactions préservent la valeur de l’offre, d’autres la dégradent.',
    task: 'Tranchez les six affirmations.',
    criteria: ['Ne pas céder trop vite', 'Comprendre avant de répondre']
  },
  's2-2.2': {
    lede: { key: 'Cinq répliques,', rest: 'cinq leviers de défense.' },
    mission: 'Associez chaque réplique du commercial au levier de défense du prix qu’elle utilise.',
    method: 'Une réplique à la fois : cliquez le levier. Chaque levier ne sert qu’une fois.',
    situation: 'Pour défendre un prix, le commercial dispose de cinq leviers : creuser, rappeler la valeur, ramener à l’usage, chiffrer l’inaction, comparer à périmètre égal.',
    task: 'Reliez les cinq répliques aux cinq leviers.',
    criteria: ['Reconnaître chaque levier dans une phrase réelle']
  },
  's2-2.3': {
    lede: { key: 'Un chiffre ne parle pas.', rest: 'Un usage, si.' },
    mission: 'Transformez le repère de calcul de chaque offre en argument utile au client.',
    method: 'Une offre à la fois. Vérifiez votre formulation avec les trois cases.',
    situation: 'Ergolys propose deux offres : un siège à 690 €, soit environ 0,38 € par jour sur 5 ans, et un pack de 10 postes de travail à 17 000 €, soit 1 700 € par poste.',
    task: 'Gardez le prix total visible, citez un repère juste et reliez-le à une valeur concrète.',
    criteria: ['Prix total visible', 'Repère juste', 'Valeur concrète']
  },
  's2-2.4': {
    lede: { key: 'Une réponse,', rest: 'quatre faux pas.' },
    mission: 'Repérez les quatre erreurs du commercial face à « C’est trop cher », puis nommez-les.',
    method: 'Cliquez les passages pour poser un drapeau, puis nommez chaque erreur.',
    quote: 'C’est trop cher.',
    situation: 'Le commercial répond à l’objection du client en une seule tirade.',
    task: 'Quatre erreurs précises, une par ligne.',
    criteria: ['Des erreurs nommées précisément', 'Les quatre repérées']
  },
  's2-2.5': {
    lede: { key: '« Plus cher que le concurrent. »', rest: 'Deux réponses possibles.' },
    mission: 'Choisissez la réponse la plus pertinente, puis défendez votre choix avec deux critères.',
    method: 'Choisissez une réponse, puis rédigez deux critères.',
    quote: 'Votre offre est plus chère que celle de votre concurrent.',
    situation: 'Le client compare votre offre à celle d’un concurrent moins cher.',
    task: 'Deux critères rédigés, un par champ.',
    criteria: ['Le bon choix', 'Deux critères distincts et justifiés']
  },
  's2-2.6': {
    lede: { key: 'Trois objections,', rest: 'trois réponses prêtes.' },
    mission: 'Préparez une réponse de 2 à 3 phrases pour chacune des trois objections sur le prix.',
    method: 'Une objection à la fois. Cochez ce que votre réponse fait.',
    quote: 'J’ai trouvé moins cher ailleurs.',
    situation: 'Ces trois objections reviennent dans presque tous les rendez-vous.',
    task: 'Comprenez le frein, valorisez l’offre, sans remise immédiate.',
    criteria: ['Je creuse le frein', 'Je valorise l’offre', 'Sans remise immédiate']
  },
  's2-2.7': {
    lede: { key: '17 000 €,', rest: 'à justifier devant la direction.' },
    mission: 'Choisissez vos leviers, puis construisez la réponse que vous diriez au client.',
    method: 'Cochez les leviers utiles, puis rédigez votre réponse.',
    quote: '17 000 € pour équiper 10 postes ? Je trouve ça vraiment élevé.',
    situation: 'Le responsable informatique trouve le pack trop cher et craint de devoir le justifier auprès de sa direction.',
    task: 'Inutile d’utiliser tous les leviers : choisissez ceux qui servent votre réponse.',
    criteria: ['Des leviers adaptés au client', 'Une réponse qui l’aide à convaincre sa direction', 'Aucune remise']
  },

  /* ══ SÉRIE 3 · CONCLURE LA VENTE ══════════════════════════════════════ */

  's3-3.1': {
    lede: { key: 'Le client se projette.', rest: 'L’avez-vous vu ?' },
    mission: 'Classez chaque signal d’achat : verbal (j’entends) ou non verbal (j’observe).',
    method: 'Glissez la carte, ou choisissez une zone puis validez.',
    situation: 'Pendant le rendez-vous, le client envoie des signaux : des questions, des gestes, des comportements.',
    task: 'Six situations à classer.',
    criteria: ['Distinguer paroles et comportements']
  },
  's3-3.2': {
    lede: { key: 'Quatre techniques,', rest: 'quatre phrases.' },
    mission: 'Associez chaque technique de conclusion à la phrase prononcée en rendez-vous.',
    method: 'Une technique à la fois : cliquez la phrase qui l’illustre.',
    situation: 'Conclusion directe, alternative, récapitulative, par le dernier détail : chacune a sa formulation.',
    task: 'Reliez les quatre techniques aux quatre phrases.',
    criteria: ['Reconnaître chaque technique']
  },
  's3-3.3': {
    lede: { key: 'Trois situations,', rest: 'une conclusion pour chacune.' },
    mission: 'Pour chaque situation, choisissez la technique de conclusion adaptée, puis écrivez votre phrase.',
    method: 'Une situation à la fois : une carte, puis une phrase.',
    situation: 'Trois clients, trois moments différents du rendez-vous.',
    task: 'Une seule phrase par situation, naturelle et concrète.',
    criteria: ['Une technique adaptée au client', 'Une phrase qui propose clairement la décision']
  },
  's3-3.4': {
    lede: { key: 'Un signal ignoré', rest: 'est une vente qui s’éloigne.' },
    mission: 'Repérez le signal donné par la cliente, comprenez l’erreur du vendeur, puis répondez à sa place.',
    method: 'Trois étapes, dans l’ordre : repérer, comprendre, répondre.',
    quote: 'Ça pourrait être livré avant la fin du mois ?',
    situation: 'La cliente demande un délai de livraison. Le vendeur, lui, continue de présenter des accessoires.',
    task: 'Une réponse courte par étape.',
    criteria: ['Le signal repéré', 'L’erreur comprise', 'Une réponse qui propose de conclure']
  },
  's3-3.5': {
    lede: { key: '« On pourrait démarrer quand ? »', rest: 'Deux façons de conclure.' },
    mission: 'Choisissez la réponse qui conclut le mieux, puis justifiez votre choix.',
    method: 'Choisissez une réponse, puis expliquez.',
    quote: 'On pourrait démarrer quand ?',
    situation: 'Le client donne un signal d’achat clair. Deux réponses sont possibles.',
    task: 'Appuyez-vous sur au moins deux critères : signal saisi, engagement du client, clarté de la proposition, liberté de décider.',
    criteria: ['Le bon choix', 'Une justification argumentée']
  },
  's3-3.6': {
    lede: { key: 'Défi final :', rest: 'jusqu’à la prochaine étape.' },
    mission: 'Rédigez la fin de l’échange, jusqu’à une prochaine étape concrète.',
    method: 'Un seul texte, comme une scène que vous joueriez.',
    quote: 'Et si on avance, vous pourriez installer les 10 postes avant la fin du mois ?',
    situation: 'L’intérêt est validé, la garantie et l’installation sont clarifiées. Le client se projette.',
    task: 'Saisissez le signal, récapitulez, proposez la décision et fixez une étape.',
    criteria: ['Le signal saisi', 'Une proposition claire', 'Une étape datée et concrète']
  },
  's3-3.7': {
    lede: { key: 'Quatre situations,', rest: 'quatre phrases dans vos mots.' },
    mission: 'Préparez une formulation de conclusion pour chacune des quatre intentions.',
    method: 'Une carte à la fois, rangée dans votre boîte.',
    situation: 'Vérifier si le client est prêt, proposer un choix, récapituler, faire choisir un détail : quatre façons de conclure.',
    task: 'Des phrases courtes, que vous pourriez vraiment dire.',
    criteria: ['Des phrases naturelles', 'Une décision proposée clairement']
  },

  /* ══ SÉRIE 4 · RELANCER ═══════════════════════════════════════════════ */

  's4-4.1': {
    lede: { key: 'Relancer,', rest: 'ce n’est pas harceler.' },
    mission: 'Pour chacune des six affirmations sur la relance, choisissez vrai ou faux.',
    method: 'Une affirmation à la fois.',
    situation: 'L’offre est envoyée, le client ne répond pas. Comment relancer sans agacer ?',
    task: 'Tranchez les six affirmations.',
    criteria: ['Une relance qui apporte de la valeur', 'Un prochain pas concret']
  },
  's4-4.2': {
    lede: { key: 'Contexte, valeur, action :', rest: 'l’anatomie d’une relance.' },
    mission: 'Lisez l’e-mail de relance, puis placez chacun de ses trois extraits dans sa partie.',
    method: 'Lisez d’abord, puis cliquez la partie de chaque extrait.',
    situation: 'Un commercial relance Madame Riveau au sujet d’une proposition envoyée le 3 juin.',
    task: 'Trois extraits, trois parties : rappel du contexte, élément de valeur, appel à l’action.',
    criteria: ['Reconnaître les trois parties d’une relance']
  },
  's4-4.3': {
    lede: { key: 'Une relance sans valeur', rest: 'reste sans réponse.' },
    mission: 'Trouvez trois éléments de valeur à apporter dans une relance.',
    method: 'Une idée par champ.',
    situation: 'L’offre Ergolys pour 10 postes complets a été envoyée il y a une semaine. Le client n’a pas répondu.',
    task: 'Chaque élément apporte quelque chose de nouveau ou d’utile au client.',
    criteria: ['Trois idées distinctes', 'Utiles du point de vue du client']
  },
  's4-4.4': {
    lede: { key: 'Une relance à jeter,', rest: 'quatre erreurs à comprendre.' },
    mission: 'Lisez l’e-mail, puis nommez quatre erreurs et leur effet sur la relation.',
    method: 'Lisez d’abord, puis passez à l’analyse.',
    situation: 'Thomas relance Madame Riveau pour la troisième fois.',
    task: 'Pour chaque erreur : ce qui ne va pas, et pourquoi cela nuit à la relation.',
    criteria: ['Quatre erreurs précises', 'Leur effet sur la relation expliqué']
  },
  's4-4.5': {
    lede: { key: 'Deux relances.', rest: 'Une seule donne envie de répondre.' },
    mission: 'Lisez les deux relances, choisissez la plus efficace et justifiez votre choix.',
    method: 'Choisissez une relance, puis expliquez.',
    situation: 'Le 3 juin, vous avez envoyé à Madame Riveau une proposition pour équiper 10 postes de travail. Voici deux façons de la relancer.',
    task: 'Appuyez-vous sur au moins deux critères : contexte, valeur apportée, ton, prochain pas.',
    criteria: ['Le bon choix', 'Au moins deux critères']
  },
  's4-4.6': {
    lede: { key: 'Quatre étapes,', rest: 'de la relance à la clôture.' },
    mission: 'Construisez votre plan de relance. Pour chaque étape, choisissez le moment, le canal, l’information utile à apporter et le prochain pas à proposer.',
    method: 'Vous avancez une étape à la fois. Vos cinq ressources restent consultables à tout moment.',
    situation: 'Le 3 juin, vous avez proposé à Madame Riveau, responsable RH d’une PME de 80 salariés, du mobilier ergonomique pour équiper 10 postes de travail. Elle est intéressée, mais doit d’abord consulter sa direction. Depuis, elle n’a pas répondu.',
    task: 'Prévoyez trois relances, de plus en plus espacées dans le temps, puis un message de clôture.',
    criteria: ['Des relances espacées', 'Des canaux variés', 'Une valeur nouvelle à chaque fois']
  },
  's4-4.7': {
    lede: { key: 'Un modèle', rest: 'qui s’adapte à chaque client.' },
    mission: 'Rédigez une trame de relance réutilisable : objet, contexte, valeur, prochain pas.',
    method: 'Insérez des champs entre crochets pour ce qui change d’un client à l’autre.',
    situation: 'Vous relancez souvent : un modèle bien construit vous fera gagner du temps.',
    task: 'Les trois parties d’une relance efficace, dans une trame à personnaliser.',
    criteria: ['Les trois parties présentes', 'Des champs à personnaliser']
  },

  /* ══ SÉRIE 5 · MANIPULATION ═══════════════════════════════════════════ */

  's5-1.1': {
    lede: { key: 'Sandwich', rest: 'ou à revoir ?' },
    mission: 'Dites si chacune des quatre annonces de prix suit la méthode du sandwich.',
    method: 'Une phrase à la fois.',
    situation: 'Quatre façons d’annoncer un prix de 2 400 €.',
    task: 'Le corrigé est disponible après les quatre phrases.',
    criteria: ['Reconnaître un prix encadré par de la valeur']
  },
  's5-1.2': {
    lede: { key: '2 400 €,', rest: 'en trois temps.' },
    mission: 'Rédigez votre annonce du prix de 2 400 € en appliquant la méthode du sandwich.',
    method: 'Un seul texte, tel que vous le diriez.',
    quote: 'Très bien, et combien coûte cette solution ?',
    situation: 'Le client vous demande le prix de l’offre.',
    task: 'Un bénéfice, le prix sans hésitation, puis un bénéfice complémentaire ou une ouverture.',
    criteria: ['Les trois temps présents', 'Un prix annoncé clairement']
  },
  's5-2.1': {
    lede: { key: 'Valoriser', rest: 'ou brader ?' },
    mission: 'Classez cinq réponses du commercial : valorise-t-il son offre, ou négocie-t-il le prix ?',
    method: 'Une réplique à la fois.',
    quote: 'C’est trop cher.',
    situation: 'Le client trouve le prix trop élevé. Le commercial a plusieurs réponses possibles.',
    task: 'La correction apparaît après les cinq répliques.',
    criteria: ['Distinguer valoriser et négocier']
  },
  's5-2.2': {
    lede: { key: 'Maintenir le prix', rest: 'sans remise immédiate.' },
    mission: 'Répondez à la cliente qui trouve le devis plus cher que prévu.',
    method: 'Comprendre, valoriser, mettre en perspective.',
    quote: 'C’est plus cher que ce que je pensais…',
    situation: 'La cliente lit le devis et marque un temps d’hésitation.',
    task: 'Une réponse qui suit les trois temps du défi.',
    criteria: ['Comprendre ce qui semble élevé', 'Un ou deux faits concrets', 'Le prix mis en perspective']
  },
  's5-3.1': {
    lede: { key: 'Signal d’achat', rest: 'ou signal de recul ?' },
    mission: 'Pour chacune des six réactions, dites s’il s’agit d’un signal d’achat ou d’un frein.',
    method: 'Une réaction à la fois.',
    situation: 'En fin de rendez-vous, le client réagit. Ses mots et ses gestes en disent long.',
    task: 'La correction apparaît après les six réactions.',
    criteria: ['Reconnaître un client qui se projette']
  },
  's5-3.2': {
    lede: { key: '« On pourrait démarrer quand ? »', rest: 'À vous de conclure.' },
    mission: 'Choisissez votre approche de conclusion, puis rédigez votre réponse à la cliente.',
    method: 'Une approche, puis votre réponse.',
    quote: 'On pourrait démarrer quand ?',
    situation: 'La cliente se projette. C’est le moment de proposer la suite.',
    task: 'Rassurez-la aussi sur la suite.',
    criteria: ['Une approche adaptée', 'Une suite proposée clairement']
  },
  's5-4.1': {
    lede: { key: 'Bon réflexe', rest: 'ou à éviter ?' },
    mission: 'Classez six pratiques de relance.',
    method: 'Une pratique à la fois.',
    situation: 'Après l’envoi d’une offre, certaines relances relancent l’échange, d’autres le ferment.',
    task: 'La correction apparaît après les six pratiques.',
    criteria: ['Reconnaître une relance utile']
  },
  's5-4.2': {
    lede: { key: 'Un mail court,', rest: 'une nouvelle raison d’échanger.' },
    mission: 'Rédigez un mail de relance à Madame Riveau, avec un objet et un message.',
    method: 'Contexte, valeur, action.',
    situation: 'Vous avez envoyé l’offre il y a 10 jours. Depuis, une entreprise du même secteur vous a fait un retour positif.',
    task: 'Un mail court, qui donne envie de répondre.',
    criteria: ['Contexte rappelé', 'Le retour d’expérience utilisé', 'Un prochain pas concret']
  }
};
