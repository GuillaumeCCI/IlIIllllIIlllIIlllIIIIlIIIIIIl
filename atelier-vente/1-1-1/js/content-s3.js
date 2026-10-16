/* SÉRIE 3 · GESTION DES OBJECTIONS · contenus éditables.
 *
 * Textes, verbatims et libellés repris des sept maquettes fournies.
 *
 * Les sept exercices reprennent ceux de la fiche « Activités supplémentaires
 * SCORM 1, Répondre efficacement aux objections » du module M1.1.3. Ce que
 * les maquettes ne montrent pas (cartes 2 à 8, objections 2 à 4) et les
 * corrigés viennent de cette fiche, transposée au vouvoiement.
 */
window.ATELIER_S3 = {
  // La méthode en 6 étapes, partagée par les écrans 1.2 et 1.6.
  method: [
    { step: 'Accueillir', role: 'Recevoir l’objection sans se braquer, garder le lien.', symbol: 'handshake', advice: 'Conseil : restez neutre et sincère.', placeholder: 'Je comprends…' },
    { step: 'Questionner', role: 'Comprendre ce qui gêne vraiment et isoler l’objection.', symbol: 'question', advice: 'Conseil : une seule question, ouverte.', placeholder: 'Par rapport à quoi…' },
    { step: 'Reformuler', role: 'Montrer qu’on a compris et valider la vraie objection.', symbol: 'document', advice: 'Conseil : reprenez ses mots, puis demandez confirmation.', placeholder: 'Si je comprends bien…' },
    { step: 'Traiter', role: 'Apporter la réponse adaptée, avec une preuve si utile.', symbol: 'gear', advice: 'Conseil : une preuve concrète vaut mieux qu’une promesse.', placeholder: 'Concrètement…' },
    { step: 'Contrôler', role: 'Vérifier que l’objection est levée.', symbol: 'search', advice: 'Conseil : posez la question, puis laissez répondre.', placeholder: 'Est-ce que cela répond à…' },
    { step: 'Enchaîner', role: 'Revenir au fil de la vente.', symbol: 'chart', advice: 'Conseil : proposez une suite précise.', placeholder: 'Je vous propose de…' }
  ],

  /* ── 1.1 · Les bons réflexes face à une objection ─────────────────────── */
  '1.1': {
    eyebrow: 'Gestion des objections',
    title: 'Les bons réflexes face à une objection',
    intro: 'Classez les 8 comportements en les glissant dans la bonne zone.',
    zones: [{ id: 'good', label: 'Bon réflexe' }, { id: 'bad', label: 'À éviter' }],
    cards: [
      { text: 'Répondre immédiatement pour « casser » l’objection.', answer: 'bad', why: 'Répondre avant d’avoir compris braque le client et vise souvent la mauvaise objection.' },
      { text: 'Écouter l’objection jusqu’au bout sans interrompre.', answer: 'good', why: 'On écoute et on comprend avant de répondre : le client livre l’objection complète.' },
      { text: 'Prendre l’objection comme une attaque personnelle.', answer: 'bad', why: 'L’objection porte sur l’offre, pas sur vous : on l’accueille sans se braquer.' },
      { text: 'Baisser tout de suite le prix pour clore la discussion.', answer: 'bad', why: 'On ne brade pas : la remise immédiate dévalorise l’offre et laisse le vrai frein intact.' },
      { text: 'Reformuler l’objection avant d’y répondre.', answer: 'good', why: 'La reformulation montre qu’on a compris et vérifie qu’on vise la vraie objection.' },
      { text: 'Poser une question pour comprendre ce qui gêne vraiment.', answer: 'good', why: 'Questionner fait émerger la cause réelle : on traite alors le bon problème.' },
      { text: 'Enchaîner sur la vente sans vérifier l’adhésion.', answer: 'bad', why: 'Sans contrôle, on avance sur une objection qu’on croit traitée alors qu’elle reste entière.' },
      { text: 'Vérifier que la réponse a convaincu avant d’avancer.', answer: 'good', why: 'On vérifie avant d’avancer : sinon le doute ressurgit au moment de décider.' }
    ],
    feedback: 'Bons réflexes : 1, 3, 5, 7. À éviter : 2, 4, 6, 8. À retenir : on écoute et on comprend avant de répondre ; on vérifie avant d’avancer ; on ne brade pas.'
  },

  /* ── 1.2 · Associer chaque étape à son rôle ───────────────────────────── */
  '1.2': {
    eyebrow: 'Gestion des objections',
    title: 'Associer chaque étape à son rôle',
    intro: 'Retrouvez la fonction de chaque étape de la méthode.',
    feedback: 'Accueillir : recevoir l’objection sans se braquer. Questionner : comprendre ce qui gêne vraiment. Reformuler : valider la vraie objection. Traiter : apporter la réponse adaptée. Contrôler : vérifier que l’objection est levée. Enchaîner : revenir au fil de la vente.'
  },

  /* ── 1.3 · Diagnostiquer l’objection ──────────────────────────────────── */
  '1.3': {
    eyebrow: 'Gestion des objections',
    title: 'Diagnostiquer l’objection',
    intro: 'Une objection, deux décisions simples.',
    natures: [
      { id: 'fondee', label: 'Sincère et fondée', description: 'Une réserve réelle', symbol: 'scales' },
      { id: 'malentendu', label: 'Malentendu', description: 'Une information fausse ou incomplète', symbol: 'question' },
      { id: 'pretexte', label: 'Prétexte / dérobade', description: 'Le client se défile', symbol: 'running' },
      { id: 'rassurance', label: 'Demande de rassurance', description: 'Un besoin d’être rassuré', symbol: 'shield' }
    ],
    gestures: [
      { id: 'preuve', symbol: 'document', label: 'Apporter une preuve', description: 'Chiffre, référence, essai, garantie' },
      { id: 'preciser', symbol: 'search', label: 'Faire préciser', description: 'Une question ouverte pour comprendre' },
      { id: 'corriger', symbol: 'refresh', label: 'Corriger l’information', description: 'Rétablir le fait, sans contredire la personne' },
      { id: 'rassurer', symbol: 'shield', label: 'Sécuriser la décision', description: 'Réduire le risque perçu' }
    ],
    cases: [
      {
        quote: 'Vos sièges sont plus chers que mon fournisseur actuel.',
        nature: 'fondee', gesture: 'preciser',
        feedback: 'Sincère et fondée : c’est une réserve sur le prix. Premier geste : creuser (« par rapport à quoi ? »), puis argumenter la valeur : garantie 5 ans, essai de 30 jours, baisse des arrêts.'
      },
      {
        quote: 'Je crois que vous ne livrez pas en région.',
        nature: 'malentendu', gesture: 'corriger',
        feedback: 'Malentendu : Ergolys livre et installe partout. Premier geste : informer, avec tact, sans mettre le client en faute.'
      },
      {
        quote: 'Comment être sûr que ça réduira vraiment les arrêts ?',
        nature: 'rassurance', gesture: 'rassurer',
        feedback: 'Demande de réassurance : le client ne conteste pas la solution, il veut être sûr du résultat. Premier geste : rassurer avec les retours clients, l’étude ergonomique et l’essai de 30 jours.'
      },
      {
        quote: 'Envoyez-moi une plaquette, je regarderai.',
        nature: 'pretexte', gesture: 'preciser',
        feedback: 'Prétexte, dérobade : le client se défile. Premier geste : creuser l’intérêt réel avant d’envoyer quoi que ce soit, pour garder la main.'
      }
    ]
  },

  /* ── 1.4 · Derrière le prétexte ───────────────────────────────────────── */
  '1.4': {
    eyebrow: 'Gestion des objections',
    title: 'Derrière le prétexte',
    intro: 'Repérez le vrai frein, puis trouvez la question qui ouvre le dialogue.',
    exchange: [
      { who: 'Client', text: 'Écoutez, ce n’est pas le moment, je vais réfléchir.' },
      { who: 'Commercial', text: 'D’accord, je vous rappelle dans un mois ?' },
      { who: 'Client', text: 'Oui voilà, on verra.' }
    ],
    observation: 'Le client repousse la discussion sans expliquer ce qui le freine.',
    hint: 'Le commercial a accepté le report sans chercher à comprendre. « Je vais réfléchir » cache souvent un doute précis : un budget non arbitré, une décision qui ne lui appartient pas seul, une crainte sur la mise en œuvre ou une comparaison en cours. Votre question doit être ouverte, courte et sans suggestion de réponse.',
    // Trois repères distincts : l'écran les place sous le champ concerné.
    hypothesisModel: '« Je vais réfléchir » est souvent un prétexte qui masque une objection non exprimée : le prix, un doute sur l’utilité, la nécessité de valider en interne, ou la crainte de se tromper.',
    questionModel: 'Question possible : « Bien sûr. Pour vous aider au mieux, qu’est-ce qui vous fait hésiter aujourd’hui : le budget, le moment, ou autre chose ? » On isole ainsi la vraie objection plutôt que de subir un « on verra ».',
    avoid: 'À éviter : accepter un report vague, comme ici. En proposant de rappeler dans un mois, le commercial perd la main.'
  },

  /* ── 1.5 · Choisissez la réponse la plus juste ────────────────────────── */
  '1.5': {
    eyebrow: 'Gestion des objections',
    title: 'Choisissez la réponse la plus juste',
    intro: 'Comparez les deux approches, puis expliquez votre choix.',
    objection: 'C’est trop cher.',
    objectionTag: 'Prix',
    objectionContext: 'Le client exprime un frein lié au prix. Votre objectif est de traiter cette objection de manière constructive tout en valorisant la solution.',
    options: [
      { id: 'A', text: 'Ce n’est pas cher, c’est normal pour de la qualité. En plus, je peux vous faire −10 %.' },
      { id: 'B', text: 'Je comprends, c’est un budget. Par rapport à quoi trouvez-vous le prix élevé : une autre offre ou une enveloppe prévue ? Si je comprends bien, vous voulez être sûr que l’investissement en vaut la peine. Nos clients constatent une baisse des arrêts liés aux TMS, et l’essai de 30 jours vous permet de vérifier sans risque. Est-ce que cela répond à votre préoccupation ?' }
    ],
    answer: 'B',
    feedback: 'La réponse B. Elle accueille, creuse (« par rapport à quoi ? »), reformule, traite avec une preuve (baisse des arrêts, essai de 30 jours) et contrôle l’adhésion. La réponse A contredit le client, ne creuse rien et brade d’emblée avec une remise : c’est de la négociation prématurée, qui affaiblit la valeur au lieu de traiter l’objection.'
  },

  /* ── 1.6 · Construisez votre traitement complet ───────────────────────── */
  '1.6': {
    eyebrow: 'Gestion des objections',
    title: 'Construisez votre traitement complet',
    intro: 'Répondez à l’objection en 6 étapes, une phrase à la fois.',
    objection: 'Nos chaises actuelles suffisent.',
    // Le corrigé modèle de la fiche, une phrase par étape de la méthode.
    model: [
      'Je comprends : si personne ne se plaint, la question ne se pose pas tous les jours.',
      'Vous arrive-t-il d’avoir des salariés gênés par le dos, ou des arrêts de ce type ?',
      'Si je comprends bien, vous préférez éviter de dépenser tant que ce n’est pas un vrai problème.',
      'C’est justement l’objectif : prévenir les TMS avant l’arrêt. Nos clients constatent une baisse des absences, et l’étude ergonomique ne cible que les postes à risque.',
      'Est-ce que cet angle prévention vous parle ?',
      'Je vous propose un diagnostic gratuit de 2 ou 3 postes pour objectiver le besoin.'
    ],
    feedback: 'Relisez votre traitement d’un seul tenant, à voix haute. Vérifiez que l’accueil ne contredit pas le client, que votre question ne suggère pas la réponse, que la reformulation reprend bien ses mots, que le traitement apporte une preuve plutôt qu’une promesse, que le contrôle laisse une vraie place à sa réponse et que l’enchaînement propose une suite précise.'
  },

  /* ── 1.7 · Construisez vos cartes réflexes ────────────────────────────── */
  '1.7': {
    eyebrow: 'Gestion des objections',
    title: 'Construisez vos cartes réflexes',
    intro: 'Pour chaque objection : identifiez sa nature, creusez, puis préparez une réponse avec preuve.',
    natures: [
      { id: 'fondee', label: 'Objection fondée', symbol: 'scales' },
      { id: 'pretexte', label: 'Prétexte / statu quo', symbol: 'pauseCircle' },
      { id: 'processus', label: 'Fondée, processus de décision', symbol: 'gear' },
      { id: 'rassurance', label: 'Demande de réassurance', symbol: 'shield' }
    ],
    cards: [
      {
        objection: 'Il faut que j’en parle à ma direction.',
        answer: 'processus',
        feedback: 'Fondée, liée au processus de décision. Creuser : « Qu’est-ce qui compterait pour eux ? » Réponse : fournir un argumentaire chiffré et proposer une présentation courte à la direction.'
      },
      {
        objection: 'C’est trop cher.',
        answer: 'fondee',
        feedback: 'Fondée. Creuser : « Par rapport à quoi ? » Réponse : la valeur, l’essai de 30 jours et la garantie de 5 ans ; la location est possible pour étaler le budget.'
      },
      {
        objection: 'J’ai été déçu par un fournisseur.',
        answer: 'rassurance',
        feedback: 'Demande de réassurance. Creuser : « Qu’est-ce qui s’était mal passé ? » Réponse : la garantie de 5 ans, un SAV sous 48 h, l’essai de 30 jours satisfait ou remboursé, et plus de 1 200 entreprises équipées.'
      },
      {
        objection: 'Nos chaises actuelles suffisent.',
        answer: 'pretexte',
        feedback: 'Prétexte, statu quo. Creuser : « Avez-vous des salariés gênés par le dos ? » Réponse : la prévention des TMS, la baisse des arrêts constatée chez nos clients, un diagnostic gratuit.'
      }
    ]
  }
};
