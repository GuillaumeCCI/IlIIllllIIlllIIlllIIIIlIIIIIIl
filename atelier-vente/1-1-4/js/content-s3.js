/* SÉRIE 3 · CONCLURE LA VENTE · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Ce qu'elles ne montrent pas
 * (situations b à f, situations de 3.3, étapes de 3.4, situations de 3.7)
 * et les corrigés viennent de la fiche « Activités supplémentaires SCORM 3 »
 * (M1.1.4), transposée au vouvoiement.
 */

/* Les quatre techniques de conclusion, communes à 3.2, 3.3 et 3.7. */
window.ATELIER_CLOSINGS = [
  { id: 'directe', label: 'Directe', long: 'Conclusion directe', sub: 'Aller droit au but pour proposer la décision.', symbol: 'target', tone: 'coral' },
  { id: 'alternative', label: 'Alternative', long: 'Conclusion alternative', sub: 'Proposer un choix entre deux options claires.', symbol: 'refresh', tone: 'blue' },
  { id: 'recap', label: 'Récapitulative', long: 'Conclusion récapitulative', sub: 'Synthétiser les points clés pour valider l’accord.', symbol: 'list', tone: 'green' },
  { id: 'detail', label: 'Par le détail', long: 'Conclusion par le dernier détail', sub: 'Faire choisir un dernier détail qui vaut accord.', symbol: 'search', tone: 'gold' }
];

window.ATELIER_S3 = {
  /* ── 3.1 · Attrape le bon signal ! ──────────────────────────────────── */
  '3.1': {
    eyebrow: 'Exercice 3.1 · Défi flash',
    title: 'Attrape le bon signal !',
    context: {
      situation: 'Pendant l’entretien, votre client vous envoie des signaux, par ses mots ou par son attitude.',
      read: '6 situations : une phrase du client, ou ce que vous observez chez lui.',
      choose: 'Pour chacune, dites si vous l’entendez (signal verbal) ou si vous l’observez (signal non verbal).'
    },
    subtitle: 'Glisse la carte ou touche une zone pour classer chaque situation.',
    cardLabel: 'Situation',
    cardsLabel: 'cartes',
    letters: true,
    drag: true,
    zones: [
      { id: 'V', label: 'V · J’entends', sub: 'Paroles et questions', symbol: 'chat', tone: 'neutral' },
      { id: 'NV', label: 'NV · J’observe', sub: 'Gestes et comportements', symbol: 'eye', tone: 'neutral' }
    ],
    cards: [
      { text: 'Le client reprend la proposition commerciale et consulte attentivement les modalités.', answer: 'NV', why: 'Un comportement qui traduit un intérêt accru : indice non verbal.' },
      { text: '« On pourrait démarrer quand ? »', answer: 'V', why: 'Une question sur le délai : indice verbal.' },
      { text: '« Le suivi est inclus ? »', answer: 'V', why: 'Une question sur les modalités : indice verbal.' },
      { text: 'Le client examine à nouveau les différentes options proposées.', answer: 'NV', why: 'Il compare pour choisir : indice non verbal.' },
      { text: 'Le client prend des notes lorsque vous présentez les prochaines étapes.', answer: 'NV', why: 'Il se projette dans la suite : indice non verbal.' },
      { text: '« Et si on équipait deux postes supplémentaires ? »', answer: 'V', why: 'Une question sur les quantités : indice verbal.' }
    ],
    keyPoint: 'À retenir : les questions sur le délai, les modalités, les quantités ou la mise en œuvre peuvent montrer que le client commence à se projeter ; certains comportements non verbaux aussi. Mais un indice d’intérêt n’est pas encore un accord : il invite à vérifier si le client est prêt à avancer.'
  },

  /* ── 3.2 · À chaque conclusion, sa réplique ─────────────────────────── */
  '3.2': {
    eyebrow: 'Exercice 3.2 · Associer',
    title: 'À chaque conclusion, sa réplique',
    subtitle: 'Associe les 4 techniques aux phrases prononcées en rendez-vous.',
    cardLabel: 'Technique',
    cardsLabel: 'techniques',
    quoted: false,
    zoneTitle: 'Les phrases prononcées',
    zoneHelp: 'Choisissez la phrase qui illustre la technique.',
    zoneNoun: 'phrase',
    cards: [
      { text: 'Conclusion directe', answer: 2, why: 'Une question franche sur la décision.' },
      { text: 'Conclusion alternative', answer: 1, why: 'Deux options, toutes deux synonymes d’accord.' },
      { text: 'Conclusion récapitulative', answer: 0, why: 'On résume ce qui a été validé avant de proposer.' },
      { text: 'Conclusion par le dernier détail', answer: 3, why: 'Choisir le coloris suppose d’avoir décidé.' }
    ],
    zones: [
      { label: '« Nous avons donc 10 postes, installation incluse et garantie 5 ans. Est-ce que nous pouvons partir sur cette solution ? »' },
      { label: '« Pour la livraison, vous préféreriez la semaine prochaine ou le début du mois ? »' },
      { label: '« Est-ce que vous souhaitez que nous lancions la commande ? »' },
      { label: '« Si tout le reste vous convient, il nous reste simplement à choisir le coloris. Lequel préférez-vous ? »' }
    ],
    keyPoint: 'À retenir : il existe plusieurs façons de conclure. Le choix dépend de la situation et du niveau d’engagement exprimé par le client.'
  },

  /* ── 3.3 · À vous de conclure ! ─────────────────────────────────────── */
  '3.3': {
    eyebrow: 'Exercice 3.3 · Conclusion',
    title: 'À vous de conclure !',
    subtitle: 'Choisissez une technique, puis trouvez les mots justes.',
    countLabel: 'situations',
    caseNoun: 'Situation',
    fields: [
      { id: 'technique', type: 'choice', label: 'Quelle carte jouez-vous ?', options: window.ATELIER_CLOSINGS.map(c => ({ id: c.id, label: c.label, sub: c.sub, symbol: c.symbol, tone: c.tone })) },
      { id: 'text', label: 'Votre phrase au client', sub: 'Une seule phrase, naturelle et concrète.', placeholder: 'Écrivez ce que vous diriez vraiment…', max: 160, rows: 3 }
    ],
    hint: 'Lisez ce que fait le client : se projette-t-il dans la suite, hésite-t-il entre deux options, ou a-t-il tout validé ?',
    cases: [
      { tab: 'Situation 1', tabNote: 'Livraison avant la fin du mois ?', scene: { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-A.png', alt: 'Une cliente demande si la livraison est possible avant la fin du mois.', caption: 'Le client demande : « Vous pourriez nous livrer avant la fin du mois ? »' },
        answers: { technique: 'directe' }, models: { text: 'Oui, une livraison avant la fin du mois est possible. Est-ce que vous souhaitez que nous partions sur ce calendrier ?' } },
      { tab: 'Situation 2', tabNote: 'Hésite entre 5 et 10 postes', scene: { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-B.png', alt: 'Un client compare deux maquettes posées sur la table : une implantation de 5 postes et une de 10 postes.', caption: 'Le client souhaite s’équiper, mais hésite encore entre 5 et 10 postes.' },
        answers: { technique: 'alternative' }, models: { text: 'Vous préférez commencer par les 5 postes prioritaires ou équiper directement les 10 ?' } },
      { tab: 'Situation 3', tabNote: 'A tout validé, plus d’objection', scene: { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-C.png', alt: 'Le client et le commercial se serrent la main devant les éléments validés.', caption: 'Le client a validé la solution, son périmètre et son prix. Il ne formule plus d’objection.' },
        answers: { technique: ['recap', 'directe'] }, models: { text: 'Nous avons donc validé les 10 postes, l’installation et la garantie 5 ans. Est-ce que nous pouvons lancer la commande ?' } }
    ],
    keyPoint: 'À retenir : la bonne conclusion est celle qui s’appuie sur ce que le client vient réellement d’exprimer et lui propose clairement une prochaine étape.',
        nextLabel: 'Valider et passer à la situation suivante',
    submitLabel: 'Valider ma réponse',
    feedback: 'Votre phrase propose-t-elle clairement la décision, avec la technique adaptée au client ?'
  },

  /* ── 3.4 · Le signal qui méritait une réponse ───────────────────────── */
  '3.4': {
    eyebrow: 'Exercice 3.4',
    title: 'Le signal qui méritait une réponse',
    sequential: true,
    countLabel: 'étapes',
    caseNoun: 'Étape',
    scene: { dialogue: [
      { who: 'client', label: 'Cliente', text: 'Ça pourrait être livré avant la fin du mois ?' },
      { who: 'seller', label: 'Vendeur', text: 'Oui, oui. Et sinon, je vous disais, on a aussi des repose-pieds, des supports d’écran, des lampes…' }
    ] },
    cases: [
      { tab: 'Repérer', fields: [{ id: 'text', label: 'Quel indice (signal) le client donne-t-il ici ?', placeholder: 'Votre réponse…', max: 160, rows: 4,
        model: 'La question sur la date de livraison montre que la cliente se projette dans la mise en œuvre de la solution.' }],
        hint: 'Relisez la question de la cliente : parle-t-elle du produit, ou de ce qui se passera après l’achat ?' },
      { tab: 'Comprendre', fields: [{ id: 'text', label: 'Qu’aurait dû faire le vendeur, et pourquoi ?', placeholder: 'Votre réponse…', max: 240, rows: 4,
        model: 'Le vendeur ne saisit pas cette occasion : au lieu de vérifier si la cliente est prête à avancer, il reprend son argumentaire et ajoute de nouvelles informations.' }],
        hint: 'Que se passe-t-il quand on continue de présenter des produits à un client déjà prêt ?' },
      { tab: 'Répondre', fields: [{ id: 'text', label: 'Que répondez-vous à la cliente ?', placeholder: 'Votre réplique…', max: 240, rows: 4,
        model: 'Oui, une livraison avant la fin du mois est possible. Est-ce que ce délai vous conviendrait pour lancer l’équipement ?' }],
        hint: 'Répondez à sa question, puis proposez la décision dans la même phrase.' }
    ],
    nextLabel: 'Enregistrer et continuer',
    submitLabel: 'Valider mes réponses',
    hintLabel: 'Voir un indice',
    keyPoint: 'À retenir : quand le client commence à parler du « comment » ou du « quand », il peut être pertinent d’arrêter d’argumenter et de tester son envie d’avancer.',
    feedback: 'Avez-vous repéré le signal, compris l’erreur du vendeur, et proposé une conclusion ?'
  },

  /* ── 3.5 · Comparer deux façons de conclure ─────────────────────────── */
  '3.5': {
    eyebrow: 'Exercice 3.5',
    title: 'Comparer deux façons de conclure',
    subtitle: 'Quelle réponse choisissez-vous ?',
    image: 'assets/illustrations/s3/1-1-4-S3-i3-5.png',
    imageAlt: 'Dans une boutique, un client demande à la vendeuse quand il pourrait démarrer.',
    quote: 'On pourrait démarrer quand ?',
    options: [
      { id: '1', label: 'Réponse 1', text: 'Dès la semaine prochaine. Si ce délai vous convient, est-ce que vous souhaitez que je prépare la commande ?',
        analysis: ['Répond au signal et vérifie directement si le client est prêt à s’engager.', 'Adaptée si l’engagement du client reste à confirmer.'] },
      { id: '2', label: 'Réponse 2', text: 'Dès la semaine prochaine ou au début du mois prochain. Laquelle de ces deux périodes correspondrait le mieux à votre organisation ?',
        analysis: ['Conclusion alternative : le client choisit une période.', 'Adaptée si le principe de l’achat semble déjà validé et que le calendrier est réellement le dernier point à déterminer.'] }
    ],
    // Le corrigé de la fiche accepte les deux réponses : le choix dépend de
    // l'engagement déjà exprimé par le client.
    answer: ['1', '2'],
    whyLabel: 'Justifiez votre choix',
    whyHelp: 'Appuyez-vous sur au moins deux critères : le signal saisi, l’engagement déjà exprimé par le client, la clarté de la proposition, la liberté de décider laissée au client.',
    whyPlaceholder: 'Votre justification…',
    hint: 'Les deux réponses saisissent le signal. Demandez-vous ce que le client a déjà exprimé : a-t-il validé le principe de l’achat ?',
    model: 'Les deux réponses peuvent être pertinentes. La réponse 1 vérifie directement si le client est prêt à s’engager. La réponse 2 est adaptée si le principe de l’achat semble déjà validé et que le calendrier est le dernier point à déterminer. Le choix dépend donc du niveau d’engagement exprimé précédemment par le client. Évaluer une conclusion, ce n’est pas chercher une « phrase magique » : est-elle adaptée à ce que le client a réellement exprimé ?',
    submitLabel: 'Valider ma réponse'
  },

  /* ── 3.6 · Conduire la fin du rendez-vous ───────────────────────────── */
  '3.6': {
    eyebrow: 'Exercice 3.6 · Défi final',
    title: 'Conduire la fin du rendez-vous',
    subtitle: 'Ergolys · Intérêt validé · Garantie et installation clarifiées',
    layout: 'stack',
    scene: { image: 'assets/illustrations/s3/1-1-4-S3-i3-6.png', alt: 'Le client demande si les 10 postes pourraient être installés avant la fin du mois.', wide: true },
    cases: [
      { tab: 'Votre closing', title: 'Votre closing complet', fields: [
        { id: 'text', label: 'Rédigez la suite de l’échange jusqu’à une prochaine étape concrète.', placeholder: 'Écrivez ce que vous diriez au client…', max: 1200, rows: 8,
          model: 'Oui, nous pouvons organiser l’installation avant la fin du mois. Si ce calendrier vous convient, est-ce que nous pouvons partir sur les 10 postes ? [silence] Parfait. Je prépare la commande aujourd’hui et je vous confirme ensuite la date d’installation et les prochaines étapes.' }
      ] }
    ],
    keyPoint: 'À retenir : conclure, ce n’est pas seulement obtenir un « oui ». C’est transformer l’accord en prochaine étape claire et sécurisante pour le client.',
    hint: 'Saisissez le signal, récapitulez ce qui est validé, proposez la décision, puis fixez une étape précise (date, document, rendez-vous).',
    hintLabel: 'Voir un indice',
    submitLabel: 'Valider ma réponse',
    feedback: 'Votre closing aboutit-il à une étape concrète, datée et acceptée ?'
  },

  /* ── 3.7 · Construire sa boîte à conclusions ────────────────────────── */
  '3.7': {
    eyebrow: 'Exercice 3.7',
    title: 'Construire sa boîte à conclusions',
    subtitle: 'Des phrases naturelles, que vous pourriez vraiment dire.',
    countLabel: 'cartes',
    className: 'fm-airy',
    caseNoun: 'Situation',
    fields: [{ id: 'text', label: 'Ma formulation prête à l’emploi', help: 'Une phrase courte, dans vos mots.', placeholder: 'Ce que je dirais vraiment au client…', max: 280, rows: 4 }],
    cases: [
      { tab: 'Vérifier directement', title: 'Je veux vérifier directement si le client est prêt à avancer.',
        models: { text: 'Est-ce que nous pouvons partir sur cette solution ?' } },
      { tab: 'Proposer un choix', title: 'Je veux lui proposer de choisir entre deux options.',
        models: { text: 'Vous préférez commencer par 5 postes ou équiper directement les 10 ?' } },
      { tab: 'Récapituler', title: 'Je veux résumer ce qui est validé avant de proposer la décision.',
        models: { text: 'Nous avons donc validé les 10 postes, l’installation et la garantie 5 ans. Est-ce que nous lançons la commande ?' } },
      { tab: 'Dernier détail', title: 'Je veux conclure en faisant choisir un dernier détail.',
        models: { text: 'Si tout le reste est validé pour vous, il nous reste à choisir le coloris. Lequel préférez-vous ?' } }
    ],
    keyPoint: 'Le test final : lisez chacune de vos phrases à voix haute. Seriez-vous à l’aise pour dire exactement cette phrase à un client demain ? Sinon, reformulez-la. Un signal d’achat n’est pas un accord : on vérifie l’envie d’avancer, on propose explicitement le passage à l’action, on laisse décider, puis on sécurise la prochaine étape.',
    nextLabel: 'Enregistrer dans ma boîte',
    submitLabel: 'Ouvrir ma boîte à conclusions',
    modelLabel: 'Corrigé modèle',
    feedback: 'Vos quatre formulations sont prêtes : relisez-les à voix haute pour qu’elles sonnent naturelles.'
  }
};
