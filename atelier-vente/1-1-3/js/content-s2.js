/* SÉRIE 2 · PROSPECTION TÉLÉPHONIQUE · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Réponses attendues et corrigés :
 * fiche « Activités supplémentaires SCORM 2 » (M1.1.3, exercices 2.1 à 2.7),
 * transposée au vouvoiement. Seul le second tour de l'appel au standard
 * (2.3), absent de la fiche, a été rédigé dans son esprit. Le commercial
 * appelle pour Ergolys.
 */
window.ATELIER_S2 = {
  /* ── 2.1 · Barrage, prétexte ou vraie objection ? ───────────────────── */
  '2.1': {
    eyebrow: 'Exercice 2.1',
    title: 'Barrage, prétexte ou vraie objection ?',
    context: 'Vous faites de la prospection téléphonique. Votre but est de réussir à parler à la personne qui prend les décisions (le responsable, le directeur, l’acheteur…).\nVous allez lire 6 réponses typiques entendues lors de vos appels. Rangez chacune d’elles dans l’une de ces catégories :',
    contextAfter: '',
    itemNoun: 'réplique',
    subtitle: 'Classez chaque réplique entendue au téléphone.',
    legend: [
      { id: 'B', label: 'Barrage du standard', text: 'Fait obstacle à la mise en relation.', tone: 'c' },
      { id: 'P', label: 'Prétexte / Dérobade', text: 'Évite la conversation.', tone: 'p' },
      { id: 'O', label: 'Objection réelle', text: 'Exprime un frein ou une réserve légitime.', tone: 'a' }
    ],
    instruction: 'Sélectionnez une catégorie pour chaque réplique.',
    items: [
      { text: '« C’est à quel sujet ? M. Riveau est en réunion. »', answer: 'B', why: 'Le standard filtre l’appel avant de transmettre : c’est un barrage, pas un refus du décideur.' },
      { text: '« Envoyez un mail, on vous rappellera. »', answer: 'B', why: 'Le standard filtre l’appel : c’est un barrage, pas un refus du décideur.' },
      { text: '« Je n’ai pas le temps là, rappelez plus tard. »', answer: 'P', why: 'Aucune raison de fond : l’interlocuteur repousse la conversation. Un prétexte n’est pas un refus définitif.' },
      { text: '« Votre solution dépasse le budget qu’on avait prévu. »', answer: 'O', why: 'Un frein concret et légitime, qui se traite : le budget.' },
      { text: '« On a déjà un fournisseur, merci. »', answer: 'P', why: 'Une réponse réflexe pour couper court : avoir un fournisseur n’empêche pas d’en écouter un autre.' },
      { text: '« Comment garantissez-vous la livraison sous 48 h ? »', answer: 'O', why: 'Une réserve précise, signe d’intérêt : le client veut une garantie.' }
    ]
  },

  /* ── 2.2 · À chaque erreur sa conséquence ───────────────────────────── */
  '2.2': {
    eyebrow: 'Prospection téléphonique',
    title: 'À chaque erreur sa conséquence',
    subtitle: 'Associez chaque maladresse à la raison pour laquelle l’appel échoue.',
    instruction: 'Sélectionnez une erreur, puis la conséquence correspondante.',
    errors: [
      { text: 'Réciter son script sans écouter la réponse du client.', answer: 2 },
      { text: 'Raccrocher dès que le client dit « envoyez une doc ».', answer: 0 },
      { text: 'Parler vite, d’un ton monocorde.', answer: 3 },
      { text: 'Insister lourdement : « ça ne prend que deux minutes ».', answer: 1 },
      { text: 'Répondre « nous, on est moins chers » à « on a déjà un fournisseur ».', answer: 4 }
    ],
    consequences: [
      'On perd le prospect sans avoir compris son intérêt réel.',
      'Le client se sent en terrain de vente agressive et se ferme.',
      'Le client sent qu’il n’est pas écouté ; l’échange se dépersonnalise.',
      'Le message n’accroche pas : au téléphone, la voix porte tout.',
      'On entre en comparaison frontale au lieu de créer de la valeur.'
    ]
  },

  /* ── 2.3 · Franchir le standard en douceur ──────────────────────────── */
  '2.3': {
    eyebrow: 'Défi · Prospection',
    title: 'Franchir le standard en douceur',
    subtitle: 'Une réponse courte pour obtenir un créneau ou trouver le bon interlocuteur.',
    context: 'Vous êtes commercial chez Ergolys, fabricant de mobilier ergonomique. Vous appelez une entreprise de 80 salariés pour parler à M. Riveau, responsable des services généraux. C’est l’accueil téléphonique qui décroche.',
    goal: 'Obtenir un créneau avec M. Riveau, ou le nom de la bonne personne.',
    max: 240,
    turns: [
      { line: 'C’est à quel sujet ? M. Riveau n’est pas disponible.',
        model: 'Bonjour, vous faites bien de me demander. Je contacte M. Riveau au sujet de l’aménagement ergonomique des postes de vos équipes : c’est bien lui qui suit ce type de sujet ? Quel serait le meilleur moment pour le joindre, ou préférez-vous que je passe par vous ?',
        why: 'Ce qui fonctionne : on nomme l’objet clairement, on valorise l’interlocuteur, on propose une suite concrète et on ne force pas.' },
      { line: 'Il est en déplacement toute la semaine. Vous voulez laisser un message ?',
        model: 'Merci, c’est gentil. Quel jour serait-il plus disponible la semaine prochaine ? Et en son absence, qui suit l’aménagement des bureaux ?' }
    ],
    keys: [
      { id: 'courtois', label: 'Courtois', text: 'Bonjour, nom, société, merci : le standard est un allié, pas un obstacle.' },
      { id: 'bref', label: 'Bref', text: 'Une ou deux phrases. Le sujet en quelques mots, sans argumentaire.' },
      { id: 'facilitant', label: 'Facilitant', text: 'Une question simple qui donne une issue : un moment, un nom, une adresse.' }
    ],
    hint: 'Présentez-vous, donnez le sujet en quelques mots, puis posez une question qui aide votre interlocutrice à vous répondre : un jour, un horaire, un autre nom.'
  },

  /* ── 2.4 · Repérer les erreurs de prospection ───────────────────────── */
  '2.4': {
    eyebrow: 'Prospection téléphonique',
    title: 'Repérer les erreurs de prospection',
    subtitle: 'Lisez l’appel et débusquez quatre maladresses du commercial.',
    call: 'Appel de prospection',
    sector: 'Mobilier ergonomique · B to B',
    lines: [
      { who: 'client', text: 'Allô ?' },
      { who: 'seller', text: 'Oui bonjour c’est Ergolys on fait du mobilier ergonomique sièges bureaux assis-debout garantie 5 ans essai 30 jours 1 200 entreprises est-ce que ça vous intéresse ?' },
      { who: 'client', text: 'Euh… écoutez, envoyez-moi une doc.' },
      { who: 'seller', text: 'Ok je vous envoie ça, au revoir.' }
    ],
    hint: 'Ne vous concentrez pas seulement sur ce que dit le commercial, mais sur ce qu’il oublie de faire. Pensez aux étapes clés d’une introduction téléphonique réussie et à la manière de traiter une objection.',
    errors: [
      { title: 'Un débit précipité', text: 'Aucune respiration ni accroche : la voix ne pose rien.' },
      { title: 'Un catalogue d’emblée', text: 'Des caractéristiques à la chaîne, sans besoin identifié ni bénéfice.' },
      { title: 'Une question fermée', text: '« Est-ce que ça vous intéresse ? » appelle un « non » facile.' },
      { title: 'La demande de doc prise au pied de la lettre', text: 'Il raccroche sans creuser l’intérêt ni garder la main : aucun créneau proposé.' }
    ]
  },

  /* ── 2.5 · Garder la main face à la demande de doc ──────────────────── */
  '2.5': {
    eyebrow: 'Choisir une réplique',
    title: 'Garder la main face à la demande de doc',
    subtitle: 'Choisissez la réponse qui fait avancer l’échange, puis expliquez pourquoi.',
    speaker: 'Client',
    quote: 'Envoyez-moi plutôt une documentation.',
    // Le client illustré (kit.clientCard), à la place de l'avatar.
    portrait: true,
    listTitle: 'Que répond le commercial ?',
    options: [
      { id: '1', label: 'Réponse 1', text: 'Pas de souci, je vous envoie la doc, bonne journée.',
        analysis: [
          'Accepte la dérobade telle quelle : l’échange s’arrête là.',
          'Aucune information sur le besoin : la documentation sera générique, donc peu lue.',
          'Aucune suite convenue : la relance partira à froid.'
        ] },
      { id: '2', label: 'Réponse 2', text: 'Avec plaisir. Pour vous adresser exactement ce qui vous sera utile plutôt qu’une brochure générique, puis-je vous poser deux questions rapides : combien de postes environ, et avez-vous déjà eu des soucis de dos dans les équipes ?',
        analysis: [
          'Accueille la demande sans la contester (« avec plaisir »).',
          'Justifie ses questions par l’intérêt du client : un envoi sur mesure.',
          'Pose deux questions courtes qui qualifient le besoin et relancent l’échange.'
        ] }
    ],
    answer: '2',
    whyLabel: 'Pourquoi ce choix ?',
    whyHelp: 'Pensez à la suite donnée à la conversation.',
    hint: 'Une demande de documentation est souvent une façon polie de raccrocher. Quelle réponse garde la conversation ouverte ?',
    model: 'La réponse 2. Elle accepte la demande mais la transforme en occasion de qualifier, et garde la main avec deux questions ciblées, au lieu de subir l’esquive et de perdre le contact. Argument implicite : une documentation personnalisée vaut mieux qu’une brochure générique.'
  },

  /* ── 2.6 · Le script de rebond ──────────────────────────────────────── */
  '2.6': {
    eyebrow: 'Prospection téléphonique',
    title: 'Le script de rebond',
    subtitle: 'Trois esquives. Pour chacune, rédigez une réponse de 2 à 3 phrases.',
    situations: [
      { title: 'Manque de disponibilité', short: 'Le manque de disponibilité', quote: 'Je n’ai pas le temps.',
        tip: 'Respectez la contrainte, puis proposez un autre moment précis plutôt que d’insister.',
        model: 'Je comprends, je ne veux pas vous retenir. Quel moment vous conviendrait mieux : plutôt en fin de journée, ou demain matin ?' },
      { title: 'Demande de documentation', short: 'La demande de documentation', quote: 'Envoyez-moi une doc.',
        tip: 'Acceptez, puis posez une ou deux questions pour que l’envoi soit utile.',
        model: 'Volontiers. Pour vous envoyer ce qui vous concerne vraiment, une question : combien de postes environ ?' },
      { title: 'Verrou concurrentiel', short: 'Le verrou concurrentiel', quote: 'On a déjà un fournisseur.',
        tip: 'Ne dénigrez pas le concurrent : intéressez-vous à ce qui pourrait être amélioré.',
        model: 'C’est noté, vous êtes déjà équipé. Qu’est-ce qui vous satisfait le plus aujourd’hui, et qu’aimeriez-vous améliorer ?' }
    ],
    keys: ['Accuser réception', 'Préserver la relation', 'Proposer une suite concrète'],
    voice: [
      { title: 'Débit posé', text: 'Ni précipité, ni traînant' },
      { title: 'Ton souriant', text: 'Le sourire s’entend au téléphone' },
      { title: 'Articulation', text: 'Chaque mot est compris' },
      { title: 'Silence après la question', text: 'Je laisse le client répondre' }
    ]
  },

  /* ── 2.7 · Construisez vos cartes réflexes ──────────────────────────── */
  '2.7': {
    eyebrow: 'Outil de terrain',
    title: 'Construisez vos cartes réflexes',
    subtitle: 'Une carte par esquive. Trois gestes pour la préparer.',
    gestures: [
      { id: 'posture', label: 'Posture', question: 'Quelle posture adopter ?', sub: 'Voix et attitude avant même de répondre.', placeholder: 'Décrivez votre posture…', next: 'Continuer vers la réponse',
        tip: 'Pensez à votre voix, à votre respiration, à votre sourire : ce que le client entend avant vos mots.' },
      { id: 'reponse', label: 'Réponse', question: 'Que répondez-vous ?', sub: 'La phrase exacte, courte et naturelle.', placeholder: 'Votre réponse au client…', next: 'Continuer vers le rebond',
        tip: 'Accusez réception sans contredire, en une phrase que vous pourriez dire sans lire.' },
      { id: 'rebond', label: 'Rebond', question: 'Quelle suite proposez-vous ?', sub: 'Une question ou une proposition qui relance l’échange.', placeholder: 'Votre rebond…', next: 'Terminer cette carte',
        tip: 'Une question ouverte ou un choix entre deux options : le client doit pouvoir répondre facilement.' }
    ],
    cards: [
      { quote: 'Je n’ai pas le temps.', model: {
        posture: 'Calme : on ne retient pas de force.',
        reponse: 'Je ne veux pas vous déranger.',
        rebond: 'Quel créneau vous irait mieux ?' } },
      { quote: 'Envoyez-moi une doc.', model: {
        posture: 'Coopératif : on garde la main.',
        reponse: 'Volontiers, pour cibler l’utile…',
        rebond: 'Combien de postes environ ?' } },
      { quote: 'On a déjà un fournisseur.', model: {
        posture: 'Sans dénigrer.',
        reponse: 'Vous êtes déjà équipé, très bien.',
        rebond: 'Qu’aimeriez-vous améliorer ?' } }
    ]
  }
};
