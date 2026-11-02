/* FENÊTRES DE CONTEXTE · ce qui s'ouvre à l'arrivée sur un exercice.
 *
 * Pour les exercices qui n'ont pas leur propre fenêtre (kit.context dans
 * l'écran, ou `welcome` dans le contenu) : le moteur (moteur/js/kit.js)
 * l'ouvre à l'arrivée et ajoute le bouton « Le contexte ». Trois lignes :
 * la situation, ce qui est demandé, comment faire, ce qui compte. Tirées de la page de
 * présentation de l'exercice (js/briefings.js) ; à retoucher librement ici.
 */
window.ATELIER_CONTEXTES = {
  's1-1.1': {
    title: 'Trouvez l’intrus',
    rows: [
      ['users', 'La situation', 'Vous préparez la présentation de RelaCosy, un logiciel de suivi des clients pour les petites entreprises. Vos notes mélangent ce que fait le produit, ce que le client y gagne et ce qui le prouve.'],
      ['pencil', 'Ce qui vous est demandé', 'Dans chacune des trois séries, écartez la carte intruse, puis dites si le trio restant réunit des caractéristiques, des avantages ou des preuves.'],
      ['list', 'Comment faire', 'Pour chaque série de quatre cartes, repérez l’intrus, puis identifiez la catégorie commune aux trois autres.'],
      ['target', 'Ce qui compte', ['Distinguer caractéristique, avantage et preuve', 'Justifier mentalement chaque choix avant de valider']]
    ]
  },
  's1-1.3': {
    title: 'La fabrique à arguments',
    rows: [
      ['users', 'La situation', 'Votre prospect dirige une entreprise de 12 salariés, sans service informatique. Il veut sécuriser ses données, fonctionner sans équipe technique et maîtriser son budget.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque priorité du prospect, sélectionnez les caractéristiques utiles, formulez l’avantage, puis choisissez la preuve.'],
      ['list', 'Comment faire', 'Construisez un argument CAP par besoin, en ne retenant que les informations qui y répondent.'],
      ['target', 'Ce qui compte', ['Des caractéristiques reliées au besoin, sans information hors sujet', 'Un avantage formulé du point de vue du client', 'Une preuve vérifiable']]
    ]
  },
  's1-1.4': {
    title: 'Le radar SONCAS',
    rows: [
      ['users', 'La situation', 'Deux clients de RelaCosy s’expriment. Leurs mots révèlent l’une des six motivations SONCAS : sécurité, orgueil, nouveauté, confort, argent, sympathie.'],
      ['pencil', 'Ce qui vous est demandé', 'Repérez les indices dans les propos de chaque client, identifiez sa motivation dominante, choisissez les deux arguments qui lui parlent, puis justifiez.'],
      ['list', 'Comment faire', 'Pour chaque client : indices, motivation dominante, deux arguments adaptés et une justification de 300 caractères maximum.'],
      ['target', 'Ce qui compte', ['Une motivation appuyée sur les mots du client', 'Deux arguments qui répondent à cette motivation', 'Une justification qui relie les deux']]
    ]
  },
  's1-1.5': {
    title: 'Le tournoi des arguments',
    rows: [
      ['users', 'La situation', 'Votre client a été victime d’un piratage. Sa motivation dominante est la sécurité. Quatre arguments de RelaCosy s’affrontent en demi-finales, puis en finale.'],
      ['pencil', 'Ce qui vous est demandé', 'À chaque duel, choisissez l’argument qui répond le mieux au besoin de sécurité du client, jusqu’à désigner le grand gagnant, puis justifiez.'],
      ['list', 'Comment faire', 'Départagez les deux demi-finales, désignez le vainqueur de la finale, puis expliquez en une ou deux phrases pourquoi il est le plus décisif.'],
      ['target', 'Ce qui compte', ['Hiérarchiser selon le risque précis exprimé', 'Une justification reliée aux mots du client']]
    ]
  },
  's1-1.6': {
    title: 'Réparer un argumentaire',
    rows: [
      ['users', 'La situation', 'Vous vendez RelaCosy à une petite entreprise qui veut sécuriser ses données, être accompagnée faute de service informatique, et maîtriser son budget.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez volontairement le pire argumentaire possible, diagnostiquez-en trois erreurs majeures, puis réécrivez-le pour répondre aux besoins du client.'],
      ['list', 'Comment faire', 'Écrivez un argumentaire désastreux, nommez trois erreurs et leur impact, puis proposez une version qui répond aux trois besoins avec des bénéfices concrets et des preuves.'],
      ['target', 'Ce qui compte', ['Un diagnostic qui nomme l’erreur et son effet sur le client', 'Une version réparée qui couvre les trois besoins', 'Des bénéfices concrets appuyés de preuves']]
    ]
  },
  's2-2.1': {
    title: 'Mythe ou méthode ?',
    rows: [
      ['users', 'La situation', 'On entend beaucoup de choses sur l’art de convaincre. Certaines sont des réflexes utiles, d’autres des idées fausses qui desservent le commercial.'],
      ['pencil', 'Ce qui vous est demandé', 'Classez huit affirmations sur l’argumentation commerciale : mythe ou méthode.'],
      ['list', 'Comment faire', 'Classez chaque affirmation, relisez votre classement, puis validez pour découvrir le corrigé.'],
      ['target', 'Ce qui compte', ['Distinguer les idées reçues des bonnes pratiques']]
    ]
  },
  's2-2.2': {
    title: 'L’échelle de conviction',
    rows: [
      ['users', 'La situation', 'Les cinq phrases parlent toutes de la sécurité des données. Elles diffèrent par leur précision, leur point de vue et la présence d’une preuve.'],
      ['pencil', 'Ce qui vous est demandé', 'Classez cinq propositions de la moins convaincante à la plus percutante.'],
      ['list', 'Comment faire', 'Placez chaque proposition sur un échelon de 1 (moins convaincante) à 5 (plus percutante).'],
      ['target', 'Ce qui compte', ['Repérer ce qui affaiblit une phrase : hésitation, flou, « on »', 'Repérer ce qui la renforce : « vous », précision, preuve']]
    ]
  },
  's2-2.3': {
    title: 'Le studio d’accroches',
    rows: [
      ['users', 'La situation', 'Une gérante de petite entreprise perd du temps dans la gestion de tâches répétitives. Vous lui présentez RelaCosy et devez capter son attention dès la première phrase.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez trois accroches de natures différentes pour une gérante de petite entreprise : une question, un chiffre-choc, un bénéfice projeté.'],
      ['list', 'Comment faire', 'Rédigez une question qui l’amène à reconnaître le temps perdu, un chiffre-choc qui rend le problème concret, et un bénéfice qui la projette dans le résultat.'],
      ['target', 'Ce qui compte', ['Courte', 'Concrète', 'Centrée sur le client']]
    ]
  },
  's2-2.4': {
    title: 'La chasse aux preuves',
    rows: [
      ['users', 'La situation', 'Un commercial présente RelaCosy avec beaucoup de chiffres. Presque tout est étayé, mais une promesse va plus loin que sa preuve.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chacune des cinq affirmations d’un pitch, dites si elle est étayée par une preuve concrète ou s’il s’agit d’un trou de preuve.'],
      ['list', 'Comment faire', 'Qualifiez chaque affirmation : étayée, ou trou de preuve.'],
      ['target', 'Ce qui compte', ['Reconnaître une preuve vérifiable', 'Repérer une promesse plus large que sa preuve']]
    ]
  },
  's2-2.5': {
    title: 'L’audit du pitch',
    rows: [
      ['users', 'La situation', 'Un commercial présente RelaCosy en quatre phrases : des bénéfices, un ton assuré, une question pour finir. Mais tient-il toutes ses promesses ?'],
      ['pencil', 'Ce qui vous est demandé', 'Notez un pitch sur les six critères de la grille commune, de 0 à 2, puis désignez la modification prioritaire.'],
      ['list', 'Comment faire', 'Évaluez le pitch critère par critère, puis formulez concrètement la modification qui aurait le plus fort impact.'],
      ['target', 'Ce qui compte', ['Des notes cohérentes avec le pitch', 'Une priorité unique, concrète et argumentée']]
    ]
  },
  's2-2.6': {
    title: 'Le pitch de 60 secondes',
    rows: [
      ['users', 'La situation', 'Votre prospect est très attentif à la sécurité de ses données. Vous disposez d’une minute pour lui présenter RelaCosy.'],
      ['pencil', 'Ce qui vous est demandé', 'Rédigez votre pitch de RelaCosy pour un prospect soucieux de sécurité, enregistrez-le en 60 secondes maximum, puis auto-évaluez-vous.'],
      ['list', 'Comment faire', 'Structurez votre pitch (accroche, deux bénéfices prouvés, conclusion), enregistrez une prise audio ou vidéo, puis notez-vous sur les sept critères.'],
      ['target', 'Ce qui compte', ['Une structure complète en 60 secondes', 'Des bénéfices appuyés de preuves', 'Un ton affirmatif, orienté client']]
    ]
  },
  's3-3.1': {
    title: 'Repérez l’intrus',
    rows: [
      ['users', 'La situation', 'Chaque série réunit trois affirmations sur l’argumentation : deux bonnes pratiques et une erreur fréquente.'],
      ['pencil', 'Ce qui vous est demandé', 'Dans chacune des trois séries, sélectionnez l’affirmation fausse, puis expliquez pourquoi elle pénalise l’échange.'],
      ['list', 'Comment faire', 'Repérez l’erreur et décrivez concrètement son effet sur le client, en 240 caractères maximum.'],
      ['target', 'Ce qui compte', ['Identifier l’erreur', 'Expliquer son effet concret sur le client']]
    ]
  },
  's3-3.2': {
    title: 'Action → Réaction',
    rows: [
      ['users', 'La situation', 'La façon d’argumenter influence directement le client : elle peut le rassurer, le perdre ou le faire douter.'],
      ['pencil', 'Ce qui vous est demandé', 'Associez chacun des six comportements du commercial à la réaction la plus probable du client.'],
      ['list', 'Comment faire', 'Placez les six numéros, chacun une seule fois.'],
      ['target', 'Ce qui compte', ['Relier un comportement à son effet sur le client']]
    ]
  },
  's3-3.3': {
    title: 'Le bon argument au bon moment',
    rows: [
      ['users', 'La situation', 'Cinq arguments sont disponibles. Trois répondent aux attentes du client ; deux sont des intrus.'],
      ['pencil', 'Ce qui vous est demandé', 'Au fil de l’entretien, le client formule trois attentes. Pour chacune, choisissez l’argument le plus pertinent.'],
      ['list', 'Comment faire', 'Associez un argument à chaque attente, sans réutiliser un argument déjà retenu.'],
      ['target', 'Ce qui compte', ['Un argument qui répond directement à l’attente exprimée', 'Écarter les intrus']]
    ]
  },
  's3-3.4': {
    title: 'Le radar de dérive',
    rows: [
      ['users', 'La situation', 'Le client a exprimé une priorité claire. Le commercial enchaîne cinq arguments, pas tous en rapport avec elle.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chacun des cinq arguments du commercial, dites s’il répond à la priorité du client ou s’il s’écarte du sujet.'],
      ['list', 'Comment faire', 'Qualifiez chaque argument : pertinent ou dérive.'],
      ['target', 'Ce qui compte', ['Rester fidèle à la priorité exprimée', 'Repérer les arguments vrais mais hors sujet']]
    ]
  },
  's3-3.5': {
    title: 'Vérifier avant d’avancer',
    rows: [
      ['users', 'La situation', 'Un commercial présente RelaCosy. Parfois il laisse le client réagir, parfois il enchaîne sans vérifier l’effet produit.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chacune des quatre répliques, dites si le vendeur vérifie l’impact de son argument ou pousse son argumentation. S’il pousse, rédigez la question qu’il aurait pu poser.'],
      ['list', 'Comment faire', 'Qualifiez chaque réplique et, le cas échéant, rédigez une question de contrôle de 180 caractères maximum.'],
      ['target', 'Ce qui compte', ['Reconnaître une vérification de l’impact', 'Une question de contrôle ouverte et reliée à l’argument']]
    ]
  },
  's4-1.1': {
    title: 'C, A ou P ?',
    rows: [
      ['users', 'La situation', 'Six phrases extraites d’un argumentaire de RelaCosy mélangent les trois composantes de la méthode CAP.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque affirmation, dites s’il s’agit d’une caractéristique, d’un avantage ou d’une preuve.'],
      ['list', 'Comment faire', 'Qualifiez les six affirmations, puis vérifiez vos réponses.'],
      ['target', 'Ce qui compte', ['Distinguer les trois composantes de la méthode CAP']]
    ]
  },
  's4-2.1': {
    title: 'Caractéristique ou bénéfice ?',
    rows: [
      ['users', 'La situation', 'Six formulations vont par paires : une caractéristique, puis le bénéfice qu’elle procure.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque formulation, dites s’il s’agit d’une caractéristique ou d’un bénéfice client.'],
      ['list', 'Comment faire', 'Qualifiez les six formulations, puis vérifiez vos réponses.'],
      ['target', 'Ce qui compte', ['Distinguer la donnée produit de la valeur pour l’utilisateur']]
    ]
  },
  's4-2.2': {
    title: 'Passez en mode client',
    rows: [
      ['users', 'La situation', 'Un logiciel avec sauvegarde automatique, un bien immobilier en double exposition : deux caractéristiques à rendre parlantes.'],
      ['pencil', 'Ce qui vous est demandé', 'Traduisez deux fiches techniques en bénéfices concrets, en une phrase qui commence par « Vous… ».'],
      ['list', 'Comment faire', 'Exprimez ce que le client vivra réellement grâce à chaque caractéristique.'],
      ['target', 'Ce qui compte', ['Résultat vécu', 'Langage simple', 'Phrase directe']]
    ]
  },
  's4-3.1': {
    title: 'À faire ou à éviter ?',
    rows: [
      ['users', 'La situation', 'Six comportements observés en entretien de vente : certains renforcent la persuasion, d’autres la sabotent.'],
      ['pencil', 'Ce qui vous est demandé', 'Classez six comportements commerciaux, un par un : bonne pratique ou erreur à éviter.'],
      ['list', 'Comment faire', 'Classez les six cartes, relisez, puis validez.'],
      ['target', 'Ce qui compte', ['Reconnaître les comportements qui renforcent la persuasion']]
    ]
  },
  's4-3.2': {
    title: 'Repérer la sur-argumentation',
    rows: [
      ['users', 'La situation', 'Un client demande un outil simple. Le commercial répond par une longue liste de fonctions techniques ; le client décroche.'],
      ['pencil', 'Ce qui vous est demandé', 'Lisez un court échange, puis relevez les trois erreurs majeures du commercial.'],
      ['list', 'Comment faire', 'Décrivez trois erreurs, en observant le fond, le rythme et l’écoute.'],
      ['target', 'Ce qui compte', ['Le besoin ignoré', 'L’avalanche de caractéristiques', 'Le signal du client non relevé']]
    ]
  }
};
