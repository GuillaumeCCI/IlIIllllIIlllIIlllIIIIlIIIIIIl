/* FENÊTRES DE CONTEXTE · ce qui s'ouvre à l'arrivée sur un exercice.
 *
 * Pour les exercices qui n'ont pas leur propre fenêtre (kit.context dans
 * l'écran, ou `welcome` dans le contenu) : le moteur (moteur/js/kit.js)
 * l'ouvre à l'arrivée et ajoute le bouton « Le contexte ». Jusqu'à quatre lignes :
 * la situation, ce qui est demandé, comment faire, ce qui compte. Tirées de la page de
 * présentation de l'exercice (js/briefings.js) ; à retoucher librement ici.
 */
window.ATELIER_CONTEXTES = {
  's1-1.4': {
    title: 'Le prix arrive trop tôt',
    rows: [
      ['users', 'La situation', 'Dès le début du rendez-vous, le client demande le prix. Le commercial répond aussitôt : 17 000 € pour 10 postes.'],
      ['pencil', 'Ce qui vous est demandé', 'Analysez le risque pris par le commercial, puis rejouez sa réplique.'],
      ['list', 'Comment faire', 'Répondez à la question sans perdre la possibilité de comprendre le besoin.'],
      ['target', 'Ce qui compte', ['Un risque clairement identifié', 'Une réponse honnête qui ouvre sur le besoin']]
    ]
  },
  's1-1.5': {
    title: 'Le duel des annonces',
    rows: [
      ['users', 'La situation', 'Deux commerciaux annoncent le même siège à 690 €.'],
      ['pencil', 'Ce qui vous est demandé', 'Comparez deux annonces du même prix, choisissez la plus efficace et justifiez avec au moins deux critères.'],
      ['list', 'Comment faire', 'Appuyez votre choix sur la posture, la structure, le vocabulaire ou la clarté.'],
      ['target', 'Ce qui compte', ['Le bon choix', 'Au moins deux critères justifiés']]
    ]
  },
  's1-1.7': {
    title: 'Ma banque d’annonces',
    rows: [
      ['users', 'La situation', 'Mieux vaut préparer ses annonces à froid que les improviser devant le client.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez une annonce complète pour le siège (690 €), le poste complet (1 900 €) et le pack 10 postes (17 000 €).'],
      ['list', 'Comment faire', 'Chaque annonce suit la méthode sandwich : bénéfice, prix, réassurance.'],
      ['target', 'Ce qui compte', ['Une formulation naturelle, prête à être dite', 'Le prix sans hésitation', 'Un bénéfice et une réassurance concrets']]
    ]
  },
  's2-2.3': {
    title: 'Le prix, remis à l’échelle',
    rows: [
      ['users', 'La situation', 'Ergolys propose deux offres : un siège à 690 €, soit environ 0,38 € par jour sur 5 ans, et un pack de 10 postes de travail à 17 000 €, soit 1 700 € par poste.'],
      ['pencil', 'Ce qui vous est demandé', 'Transformez le repère de calcul de chaque offre en argument utile au client.'],
      ['list', 'Comment faire', 'Gardez le prix total visible, citez un repère juste et reliez-le à une valeur concrète.'],
      ['target', 'Ce qui compte', ['Prix total visible', 'Repère juste', 'Valeur concrète']]
    ]
  },
  's2-2.4': {
    title: 'Quatre faux pas face au prix',
    rows: [
      ['users', 'La situation', 'Le commercial répond à l’objection du client en une seule tirade.'],
      ['pencil', 'Ce qui vous est demandé', 'Repérez les quatre erreurs du commercial face à « C’est trop cher », puis nommez-les.'],
      ['list', 'Comment faire', 'Quatre erreurs précises, une par ligne.'],
      ['target', 'Ce qui compte', ['Des erreurs nommées précisément', 'Les quatre repérées']]
    ]
  },
  's2-2.5': {
    title: 'Deux réponses, laquelle tient ?',
    rows: [
      ['users', 'La situation', 'Le client compare votre offre à celle d’un concurrent moins cher.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez la réponse la plus pertinente, puis défendez votre choix avec deux critères.'],
      ['list', 'Comment faire', 'Deux critères rédigés, un par champ.'],
      ['target', 'Ce qui compte', ['Le bon choix', 'Deux critères distincts et justifiés']]
    ]
  },
  's2-2.6': {
    title: 'Ton kit de défense du prix',
    rows: [
      ['users', 'La situation', 'Ces trois objections reviennent dans presque tous les rendez-vous.'],
      ['pencil', 'Ce qui vous est demandé', 'Préparez une réponse de 2 à 3 phrases pour chacune des trois objections sur le prix.'],
      ['list', 'Comment faire', 'Comprenez le frein, valorisez l’offre, sans remise immédiate.'],
      ['target', 'Ce qui compte', ['Je creuse le frein', 'Je valorise l’offre', 'Sans remise immédiate']]
    ]
  },
  's2-2.7': {
    title: 'Défendre la valeur',
    rows: [
      ['users', 'La situation', 'Le responsable informatique trouve le pack trop cher et craint de devoir le justifier auprès de sa direction.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez vos leviers, puis construisez la réponse que vous diriez au client.'],
      ['list', 'Comment faire', 'Inutile d’utiliser tous les leviers : choisissez ceux qui servent votre réponse.'],
      ['target', 'Ce qui compte', ['Des leviers adaptés au client', 'Une réponse qui l’aide à convaincre sa direction', 'Aucune remise']]
    ]
  },
  's3-3.3': {
    title: 'À vous de conclure !',
    rows: [
      ['users', 'La situation', 'Trois clients, trois moments différents du rendez-vous.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque situation, choisissez la technique de conclusion adaptée, puis écrivez votre phrase.'],
      ['list', 'Comment faire', 'Une seule phrase par situation, naturelle et concrète.'],
      ['target', 'Ce qui compte', ['Une technique adaptée au client', 'Une phrase qui propose clairement la décision']]
    ]
  },
  's3-3.5': {
    title: 'Comparer deux façons de conclure',
    rows: [
      ['users', 'La situation', 'Le client donne un signal d’achat clair. Deux réponses sont possibles.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez la réponse qui conclut le mieux, puis justifiez votre choix.'],
      ['list', 'Comment faire', 'Appuyez-vous sur au moins deux critères : signal saisi, engagement du client, clarté de la proposition, liberté de décider.'],
      ['target', 'Ce qui compte', ['Le bon choix', 'Une justification argumentée']]
    ]
  },
  's3-3.6': {
    title: 'Conduire la fin du rendez-vous',
    rows: [
      ['users', 'La situation', 'L’intérêt est validé, la garantie et l’installation sont clarifiées. Le client se projette.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez la fin de l’échange, jusqu’à une prochaine étape concrète.'],
      ['list', 'Comment faire', 'Saisissez le signal, récapitulez, proposez la décision et fixez une étape.'],
      ['target', 'Ce qui compte', ['Le signal saisi', 'Une proposition claire', 'Une étape datée et concrète']]
    ]
  },
  's3-3.7': {
    title: 'Construire sa boîte à conclusions',
    rows: [
      ['users', 'La situation', 'Vérifier si le client est prêt, proposer un choix, récapituler, faire choisir un détail : quatre façons de conclure.'],
      ['pencil', 'Ce qui vous est demandé', 'Préparez une formulation de conclusion pour chacune des quatre intentions.'],
      ['list', 'Comment faire', 'Des phrases courtes, que vous pourriez vraiment dire.'],
      ['target', 'Ce qui compte', ['Des phrases naturelles', 'Une décision proposée clairement']]
    ]
  },
  's4-4.3': {
    title: 'Trouver l’élément de valeur',
    rows: [
      ['users', 'La situation', 'L’offre Ergolys pour 10 postes complets a été envoyée il y a une semaine. Le client n’a pas répondu.'],
      ['pencil', 'Ce qui vous est demandé', 'Trouvez trois éléments de valeur à apporter dans une relance.'],
      ['list', 'Comment faire', 'Chaque élément apporte quelque chose de nouveau ou d’utile au client.'],
      ['target', 'Ce qui compte', ['Trois idées distinctes', 'Utiles du point de vue du client']]
    ]
  },
  's4-4.4': {
    title: 'Analyser une relance à jeter',
    rows: [
      ['users', 'La situation', 'Thomas relance Madame Riveau pour la troisième fois.'],
      ['pencil', 'Ce qui vous est demandé', 'Lisez l’e-mail, puis nommez quatre erreurs et leur effet sur la relation.'],
      ['list', 'Comment faire', 'Pour chaque erreur : ce qui ne va pas, et pourquoi cela nuit à la relation.'],
      ['target', 'Ce qui compte', ['Quatre erreurs précises', 'Leur effet sur la relation expliqué']]
    ]
  },
  's5-1.2': {
    title: 'À vous d’annoncer le prix',
    rows: [
      ['users', 'La situation', 'Le client vous demande le prix de l’offre.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez votre annonce du prix de 2 400 € en appliquant la méthode du sandwich.'],
      ['list', 'Comment faire', 'Un bénéfice, le prix sans hésitation, puis un bénéfice complémentaire ou une ouverture.'],
      ['target', 'Ce qui compte', ['Les trois temps présents', 'Un prix annoncé clairement']]
    ]
  },
  's5-2.2': {
    title: 'Défendre le prix',
    rows: [
      ['users', 'La situation', 'La cliente lit le devis et marque un temps d’hésitation.'],
      ['pencil', 'Ce qui vous est demandé', 'Répondez à la cliente qui trouve le devis plus cher que prévu.'],
      ['list', 'Comment faire', 'Une réponse qui suit les trois temps du défi.'],
      ['target', 'Ce qui compte', ['Comprendre ce qui semble élevé', 'Un ou deux faits concrets', 'Le prix mis en perspective']]
    ]
  },
  's5-3.2': {
    title: 'À vous de conclure',
    rows: [
      ['users', 'La situation', 'La cliente se projette. C’est le moment de proposer la suite.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez votre approche de conclusion, puis rédigez votre réponse à la cliente.'],
      ['list', 'Comment faire', 'Rassurez-la aussi sur la suite.'],
      ['target', 'Ce qui compte', ['Une approche adaptée', 'Une suite proposée clairement']]
    ]
  },
  's5-4.2': {
    title: 'Rédigez votre relance',
    rows: [
      ['users', 'La situation', 'Vous avez envoyé l’offre il y a 10 jours. Depuis, une entreprise du même secteur vous a fait un retour positif.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez un mail de relance à Madame Riveau, avec un objet et un message.'],
      ['list', 'Comment faire', 'Un mail court, qui donne envie de répondre.'],
      ['target', 'Ce qui compte', ['Contexte rappelé', 'Le retour d’expérience utilisé', 'Un prochain pas concret']]
    ]
  }
};
