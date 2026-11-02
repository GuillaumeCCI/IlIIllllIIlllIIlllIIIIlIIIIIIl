/* FENÊTRES DE CONTEXTE · ce qui s'ouvre à l'arrivée sur un exercice.
 *
 * Pour les exercices qui n'ont pas leur propre fenêtre (kit.context dans
 * l'écran, ou `welcome` dans le contenu) : le moteur (moteur/js/kit.js)
 * l'ouvre à l'arrivée et ajoute le bouton « Le contexte ». Jusqu'à quatre lignes :
 * la situation, ce qui est demandé, comment faire, ce qui compte. Tirées de la page de
 * présentation de l'exercice (js/briefings.js) ; à retoucher librement ici.
 */
window.ATELIER_CONTEXTES = {
  's1-1.1': {
    title: 'Bon réflexe ou à éviter ?',
    rows: [
      ['users', 'La situation', 'Un client émet une objection en plein rendez-vous. Le commercial a plusieurs façons de réagir : certaines ouvrent l’échange, d’autres le ferment.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chacune des huit attitudes du commercial face à une objection, dites s’il s’agit d’un bon réflexe ou d’une attitude à éviter.'],
      ['list', 'Comment faire', 'Classez les huit situations, relisez votre classement, puis validez pour découvrir le corrigé.'],
      ['target', 'Ce qui compte', ['Distinguer une attitude constructive d’un mauvais réflexe', 'Repérer ce qui braque le client']]
    ]
  },
  's1-1.4': {
    title: 'Ce qui n’est pas dit',
    rows: [
      ['users', 'La situation', 'Dans un magasin de décoration, un client s’apprête à partir sans acheter. Il esquive : « je vais réfléchir ». La commerciale lui propose de le rappeler dans un mois.'],
      ['pencil', 'Ce qui vous est demandé', 'Lisez l’échange, formulez l’objection que le client garde pour lui, puis la question ouverte qui la ferait émerger.'],
      ['list', 'Comment faire', 'Une dérobade masque souvent une objection non dite. Formulez une hypothèse, puis la question qui permettrait de la vérifier sans la suggérer.'],
      ['target', 'Ce qui compte', ['Une hypothèse plausible au regard de la scène', 'Une question ouverte, qui ne présume pas de la réponse']]
    ]
  },
  's1-1.5': {
    title: 'Face au « C’est trop cher »',
    rows: [
      ['users', 'La situation', 'Un client trouve le prix trop élevé. Deux commerciaux lui répondent chacun à leur manière.'],
      ['pencil', 'Ce qui vous est demandé', 'Comparez deux réponses à « C’est trop cher », choisissez la plus efficace, puis expliquez votre choix.'],
      ['list', 'Comment faire', 'Choisissez la réponse qui aide à comprendre et à traiter l’objection. Appuyez votre justification sur les étapes de la méthode.'],
      ['target', 'Ce qui compte', ['Le bon choix', 'Une justification qui cite les étapes respectées ou oubliées']]
    ]
  },
  's2-2.2': {
    title: 'À chaque erreur sa conséquence',
    rows: [
      ['users', 'La situation', 'Un appel de prospection se joue en quelques secondes. Certaines erreurs sont si fréquentes qu’on ne les remarque plus.'],
      ['pencil', 'Ce qui vous est demandé', 'Associez chacune des cinq erreurs de prospection à la raison pour laquelle l’appel échoue.'],
      ['list', 'Comment faire', 'Reliez les cinq erreurs aux cinq conséquences, une conséquence par erreur.'],
      ['target', 'Ce qui compte', ['Comprendre l’effet de chaque maladresse sur le prospect']]
    ]
  },
  's2-2.3': {
    title: 'Franchir le standard en douceur',
    rows: [
      ['users', 'La situation', 'Vous appelez pour Ergolys une entreprise de 80 salariés. Vous souhaitez parler à M. Riveau, responsable des services généraux. L’accueil vous filtre.'],
      ['pencil', 'Ce qui vous est demandé', 'Répondez à l’accueil téléphonique en deux tours de parole, pour obtenir un créneau ou le nom du bon interlocuteur.'],
      ['list', 'Comment faire', 'Deux réponses courtes, de 240 caractères au plus : courtoises, brèves et facilitantes.'],
      ['target', 'Ce qui compte', ['Courtois : présentation et politesse', 'Bref : le sujet en quelques mots', 'Facilitant : une question qui donne une issue']]
    ]
  },
  's2-2.4': {
    title: 'Repérer les erreurs de prospection',
    rows: [
      ['users', 'La situation', 'Un commercial d’Ergolys appelle une responsable d’entreprise. L’appel se termine sur une demande de documentation, et c’est tout.'],
      ['pencil', 'Ce qui vous est demandé', 'Lisez la transcription d’un appel de prospection et notez quatre erreurs précises du commercial.'],
      ['list', 'Comment faire', 'Repérez ce qui a fait échouer l’appel : ce que le commercial a dit, et ce qu’il n’a pas fait.'],
      ['target', 'Ce qui compte', ['Des erreurs précises, pas des impressions', 'Les quatre erreurs repérées']]
    ]
  },
  's2-2.5': {
    title: 'Garder la main face à la demande de doc',
    rows: [
      ['users', 'La situation', 'En plein appel de prospection, la cliente vous demande une documentation. Deux réponses sont possibles.'],
      ['pencil', 'Ce qui vous est demandé', 'Choisissez la réponse qui fait avancer l’échange face à une demande de documentation, puis expliquez pourquoi.'],
      ['list', 'Comment faire', 'Pensez à la suite donnée à la conversation : laquelle garde la main ?'],
      ['target', 'Ce qui compte', ['Le bon choix', 'Une justification centrée sur la suite de l’échange']]
    ]
  },
  's3-1.2': {
    title: 'Le crash-test de l’objection prix',
    rows: [
      ['users', 'La situation', 'Un commercial répond à une objection sur le prix. Sa réponse accumule les erreurs.'],
      ['pencil', 'Ce qui vous est demandé', 'Repérez quatre maladresses dans la réponse d’un commercial à « C’est trop cher », puis réécrivez-la.'],
      ['list', 'Comment faire', 'Diagnostic d’abord : quatre erreurs nommées précisément. Réécriture ensuite : la réponse qu’il aurait dû faire.'],
      ['target', 'Ce qui compte', ['Quatre maladresses nommées', 'Une réécriture qui suit les étapes de la méthode']]
    ]
  },
  's3-2.1': {
    title: 'À chaque objection, sa nature',
    rows: [
      ['users', 'La situation', 'Des prospects réagissent à votre proposition. Avant de répondre, il faut savoir de quoi il s’agit.'],
      ['pencil', 'Ce qui vous est demandé', 'Rangez chacune des six réactions dans le dossier de sa nature la plus probable.'],
      ['list', 'Comment faire', 'Prétexte, objection sincère et fondée, malentendu ou demande de réassurance : à vous de classer.'],
      ['target', 'Ce qui compte', ['Une nature appuyée sur les mots du prospect']]
    ]
  }
};
