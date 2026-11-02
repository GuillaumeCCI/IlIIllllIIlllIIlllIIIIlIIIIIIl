/* FENÊTRES DE CONTEXTE · ce qui s'ouvre à l'arrivée sur un exercice.
 *
 * Pour les exercices qui n'ont pas leur propre fenêtre (kit.context dans
 * l'écran, ou `welcome` dans le contenu) : le moteur (moteur/js/kit.js)
 * l'ouvre à l'arrivée et ajoute le bouton « Le contexte ». Jusqu'à quatre lignes :
 * la situation, ce qui est demandé, comment faire, ce qui compte. Tirées de la page de
 * présentation de l'exercice (js/briefings.js) ; à retoucher librement ici.
 */
window.ATELIER_CONTEXTES = {
  's1-C': {
    title: 'Comparer',
    rows: [
      ['users', 'La situation', 'Premier rendez-vous avec une petite entreprise, trente minutes prévues. Deux ouvertures vous sont proposées pour cette même situation. Les deux sont acceptables.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez la plus efficace, appuyez-vous sur trois arguments, puis identifiez un emprunt utile.'],
      ['list', 'Comment faire', 'Choisissez la plus efficace, appuyez votre décision sur au moins trois arguments reliés aux critères, puis identifiez ce que vous emprunteriez à l’autre.'],
      ['target', 'Ce qui compte', ['Au moins trois arguments explicitement reliés aux critères d’une bonne ouverture', 'Un emprunt pertinent identifié dans l’ouverture non retenue', 'Un raisonnement, pas une préférence : les deux choix restent défendables s’ils sont argumentés']]
    ]
  },
  's1-D': {
    title: 'Construire',
    rows: [
      ['users', 'La situation', 'Vous préparez une ouverture d’entretien complète, pour la situation commerciale de votre choix.'],
      ['pencil', 'Ce qui vous est demandé', 'Écrivez quatre à six phrases et indiquez la fonction de chacune.'],
      ['list', 'Comment faire', 'Écrivez quatre à six phrases, une par ligne, et indiquez en face de chacune la fonction qu’elle remplit : accueil, présentation, cadrage, transition vers l’écoute ou adaptation.'],
      ['target', 'Ce qui compte', ['Les quatre fonctions clés sont présentes : accueil, présentation, cadrage, transition vers l’écoute', 'Chaque fonction est correctement identifiée en face de sa ligne', 'L’enchaînement se tient quand on lit l’ouverture à voix haute']]
    ]
  },
  's1-F': {
    title: 'Changer de canal',
    rows: [
      ['users', 'La situation', 'Vous disposez d’une bonne ouverture en face-à-face. Il s’agit maintenant de la porter sur deux autres canaux, où le non-verbal disparaît et où l’e-mail impose l’asynchrone.'],
      ['pencil', 'Ce qui vous est demandé', 'Transposez l’ouverture au téléphone, puis à l’e-mail avec son objet.'],
      ['list', 'Comment faire', 'Transposez-la au téléphone, puis à l’e-mail de premier contact, avec son objet. L’e-mail doit faire entre quatre-vingts et cent vingt mots.'],
      ['target', 'Ce qui compte', ['Les quatre fonctions sont présentes dans chaque version', 'Au téléphone : identité vérifiée, disponibilité demandée, motif explicite', 'En e-mail : objet clair, cadrage de la durée, proposition de créneau']]
    ]
  },
  's2-B': {
    title: 'Reformuler sans dévier',
    rows: [
      ['users', 'La situation', 'Un client vous dit que votre solution lui paraît un peu chère. Quatre réponses de vendeur vous sont soumises : toutes commencent comme une reformulation, mais glissent en réalité vers une autre attitude.'],
      ['pencil', 'Ce qui vous est demandé', 'Nommez l’attitude vers laquelle chaque réponse dévie, puis réécrivez-la en compréhension.'],
      ['list', 'Comment faire', 'Pour chaque réponse, nommez l’attitude de Porter vers laquelle elle dévie, puis réécrivez-la en véritable compréhension.'],
      ['target', 'Ce qui compte', ['La bonne attitude est nommée pour chacune des quatre réponses', 'La réécriture reprend les mots du client sans rien ajouter', 'Ni jugement, ni interprétation, ni solution prématurée, ni consolation']]
    ]
  },
  's3-1.1': {
    title: 'Les bons réflexes',
    rows: [
      ['users', 'La situation', 'Face à une objection, certains réflexes ouvrent le dialogue, d’autres le referment. Huit comportements vous sont proposés en vrac.'],
      ['pencil', 'Ce qui vous est demandé', 'Classez chaque carte dans la bonne zone : bon réflexe, ou à éviter.'],
      ['list', 'Comment faire', 'Classez chaque comportement dans la bonne zone : bon réflexe, ou à éviter. À la souris, ou au clavier.'],
      ['target', 'Ce qui compte', ['Les huit cartes sont classées', 'La logique de fond : comprendre avant de répondre', 'Le corrigé détaille ensuite chaque carte, une par une']]
    ]
  },
  's3-1.5': {
    title: 'La réponse la plus juste',
    rows: [
      ['users', 'La situation', 'Un client vous dit que c’est trop cher. Deux réponses de commercial vous sont proposées pour traiter cette objection.'],
      ['pencil', 'Ce qui vous est demandé', 'Comparez les deux approches, choisissez la plus juste, puis expliquez votre raisonnement.'],
      ['list', 'Comment faire', 'Comparez les deux approches, choisissez la plus juste, puis expliquez ce qui la rend plus efficace.'],
      ['target', 'Ce qui compte', ['Le choix distingue une réponse qui comprend d’une réponse qui concède', 'Le raisonnement s’appuie sur les étapes de la méthode', 'Le corrigé détaille ensuite les deux approches']]
    ]
  },
  's3-1.7': {
    title: 'Vos cartes réflexes',
    rows: [
      ['users', 'La situation', 'Quatre objections fréquentes vous sont soumises. Pour chacune, il s’agit de bâtir une carte réflexe, mobilisable en entretien.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque objection : identifiez sa nature, creusez, puis préparez votre réponse.'],
      ['list', 'Comment faire', 'Pour chaque objection : identifiez sa nature, formulez la question qui permet de creuser, puis préparez une réponse appuyée sur une preuve.'],
      ['target', 'Ce qui compte', ['La nature retenue correspond à ce que le client exprime réellement', 'La question creuse sans suggérer la réponse', 'La réponse s’appuie sur un élément vérifiable, pas sur une promesse']]
    ]
  },
  's4-1.1': {
    title: 'Remettre dans l’ordre',
    rows: [
      ['users', 'La situation', 'Les cinq phrases d’une ouverture d’entretien vous sont présentées en désordre. Remises dans le bon ordre, elles forment une ouverture fluide.'],
      ['pencil', 'Ce qui vous est demandé', 'Placez les cinq phrases de la première à la cinquième.'],
      ['list', 'Comment faire', 'Placez chaque phrase à sa position, de la première à la cinquième. À la souris, ou au clavier.'],
      ['target', 'Ce qui compte', ['Les cinq phrases sont placées', 'La logique attendue : créer la relation, puis cadrer l’échange, avant de basculer vers l’écoute', 'Les variantes défendables sur l’ordre exact objet et durée sont acceptées']]
    ]
  },
  's4-1.2': {
    title: 'Repérer ce qui cloche',
    rows: [
      ['users', 'La situation', 'Une ouverture d’entretien ratée vous est soumise. Registre familier, entrée directe sur l’offre, aucune place laissée au client : tout y passe.'],
      ['pencil', 'Ce qui vous est demandé', 'Surlignez au moins quatre maladresses, puis proposez une ouverture correcte.'],
      ['list', 'Comment faire', 'Cliquez sur au moins quatre passages maladroits pour les surligner, puis réécrivez une ouverture correcte en trois ou quatre phrases.'],
      ['target', 'Ce qui compte', ['Au moins quatre maladresses repérées dans le texte', 'La réécriture rétablit les quatre temps : accueil, présentation, cadrage, question ouverte', 'Le corrigé signale ensuite ce que le texte d’origine omettait']]
    ]
  },
  's4-2.1': {
    title: 'Associer les attitudes',
    rows: [
      ['users', 'La situation', 'Un client hésite sur le moment d’investir. Six réponses de commercial vous sont proposées : chacune illustre l’une des six attitudes d’écoute de Porter.'],
      ['pencil', 'Ce qui vous est demandé', 'Classez chaque réponse sous l’attitude qui lui correspond.'],
      ['list', 'Comment faire', 'Classez chaque réponse sous l’attitude qui lui correspond. Une attitude ne reçoit qu’une seule réponse.'],
      ['target', 'Ce qui compte', ['Les six réponses sont classées', 'Ne pas confondre l’enquête, qui questionne, et la compréhension, qui reformule', 'Les six attitudes ne sont ni bonnes ni mauvaises en soi : tout dépend du moment']]
    ]
  },
  's4-2.2': {
    title: 'Réparer la conversation',
    rows: [
      ['users', 'La situation', 'Trois échanges tournent court. À chaque fois, le commercial répond par un réflexe qui referme la conversation : il contredit, il minimise, ou il balaie l’expérience passée.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque situation, remplacez la réponse réflexe par une reformulation de compréhension.'],
      ['target', 'Ce qui compte', ['La reformulation nomme le ressenti ou le besoin du client', 'Elle ne juge pas, ne conseille pas et ne minimise pas', 'Elle invite le client à poursuivre plutôt qu’elle ne referme l’échange']]
    ]
  }
};
