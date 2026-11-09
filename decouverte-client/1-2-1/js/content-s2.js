/* SÉRIE 2 · LES ATTITUDES D'ÉCOUTE (fiche M1.2.1, activité A1).
 *
 * Un client parle, six vendeurs lui répondent. Pour chaque réponse, deux
 * décisions : l'attitude d'écoute du vendeur, puis son effet probable sur le
 * client. Trois situations : un magasin, une entreprise, une agence
 * immobilière (la troisième s'ajoute à la fiche).
 *
 * Mécanique : mountForm (moteur/js/mounts.js), un cas par réponse.
 */
(function (root) {
  'use strict';

  /* Les six attitudes d'écoute, avec ce que fait chacune, en mots simples. */
  const ATTITUDES = [
    { id: 'evaluation', label: 'Évaluation', sub: 'Il approuve ou désapprouve ce que dit le client.' },
    { id: 'interpretation', label: 'Interprétation', sub: 'Il explique à la place du client ce qu’il pense vraiment.' },
    { id: 'soutien', label: 'Soutien', sub: 'Il rassure le client et minimise ce qu’il ressent.' },
    { id: 'enquete', label: 'Enquête', sub: 'Il pose des questions pour obtenir des informations.' },
    { id: 'solution', label: 'Solution', sub: 'Il propose tout de suite une solution ou un conseil.' },
    { id: 'comprehension', label: 'Compréhension', sub: 'Il redit avec ses mots ce que vit le client et vérifie.' }
  ];

  /* L'effet probable sur le client. */
  const EFFETS = [
    { id: 'ouvre', label: 'Il a envie d’en dire plus', sub: 'Il se sent écouté et continue de parler.' },
    { id: 'partiel', label: 'Il répond, sans plus', sub: 'Il donne une information, pas ce qui compte pour lui.' },
    { id: 'ferme', label: 'Il se ferme', sub: 'Il se sent jugé, bousculé ou pas entendu.' }
  ];

  root.ATELIER_ATTITUDES = ATTITUDES;

  /* Un cas : la réplique du client, la réponse du vendeur, les deux décisions. */
  function reponse(client, speaker, text, attitude, effet, whyAttitude, whyEffet) {
    return {
      scene: { dialogue: [
        { who: 'client', label: speaker, text: client },
        { who: 'seller', label: 'Le vendeur', text }
      ] },
      fields: [
        { id: 'attitude', type: 'choice', label: '1 · L’attitude du vendeur', options: ATTITUDES, answer: attitude, why: whyAttitude },
        { id: 'effet', type: 'choice', label: '2 · Son effet sur le client', options: EFFETS, answer: effet, why: whyEffet }
      ]
    };
  }

  /* La fenêtre d'arrivée et la visite guidée, communes aux trois situations. */
  const welcome = {
    title: 'Les six attitudes d’écoute',
    rows: [
      ['users', 'Une attitude d’écoute', 'C’est la façon dont le vendeur répond quand le client lui confie un problème ou une émotion.'],
      ['list', 'Six attitudes', 'Évaluer, interpréter, soutenir, enquêter, proposer une solution, ou montrer qu’on a compris.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque réponse du vendeur, trouvez son attitude, puis son effet probable sur le client.']
    ]
  };
  const tour = [
    { target: '.fm-scene', title: 'L’échange', text: 'Lisez ce que dit le client, puis la réponse du vendeur.' },
    // « Cette réponse » : la réplique du vendeur s'éclaire avec les attitudes.
    { target: '.fm-main .fm-field', also: '.fm-scene .sc-talk-line.is-seller, .fm-scene .sc-line.is-seller', title: '1. L’attitude', text: 'Cliquez sur l’attitude qui correspond à cette réponse.' },
    { target: '.fm-actions', title: '2. L’effet', text: 'Ensuite, vous choisirez son effet sur le client.' },
    { target: '.fm-tabs', title: 'Six réponses', text: 'Le corrigé arrive après la dernière.' }
  ];

  const commun = {
    welcome,
    tour,
    // Une question à la fois : l'attitude, puis l'effet (moins chargé).
    oneField: true,
    caseNoun: 'Réponse',
    countLabel: 'réponses analysées',
    // Pleine largeur : l'illustration au-dessus du dialogue reste grande ; onglets en pastilles.
    pills: true,
    // Au corrigé : la réplique du client une seule fois, en tête, puis la seule réponse du vendeur par carte.
    reviewDialogue: 'seller',
    submitLabel: 'Réponse suivante',
    keyPoint: 'À retenir : aucune attitude n’est interdite. L’enquête, par exemple, sert à découvrir le besoin. Mais au moment où le client confie un problème ou une émotion, seule la compréhension lui donne envie d’en dire plus. L’évaluation et la solution sont les réflexes les plus fréquents chez les vendeurs débutants : ils ferment l’échange.'
  };

  /* ── 2.1 · Magasin d'électroménager ───────────────────────────────── */
  const LINGE = 'Mon lave-linge a lâché ce matin. J’ai trois enfants, le linge s’entasse, et je n’ai vraiment pas le budget pour un modèle haut de gamme.';
  const CLIENTE = 'La cliente';

  /* ── 2.2 · Logiciel de planning, chez un dirigeant ─────────────────── */
  const CHANTIERS = 'Votre collègue est venu l’an dernier. On a testé votre logiciel de planning pendant trois mois, et mes chefs de chantier ne l’ont jamais utilisé. Je ne vois pas pourquoi ce serait différent aujourd’hui.';
  const DIRIGEANT = 'Le dirigeant';

  /* ── 2.3 · Agence immobilière ──────────────────────────────────────── */
  const APPARTEMENT = 'Notre appartement est en vente depuis quatre mois avec une autre agence. Pas une seule offre. Je commence à me dire qu’il est invendable.';
  const PROPRIETAIRE = 'Le propriétaire';

  const S2 = {
    '2.1': Object.assign({}, commun, {
      eyebrow: 'Attitudes d’écoute · Situation 1',
      title: 'Qui parle comme ça ? Au magasin',
      subtitle: 'Une cliente vient remplacer son lave-linge. Six vendeurs lui répondent.',
      reviewIntro: { dialogue: [{ who: 'client', label: 'La cliente', text: LINGE }] },
      cases: [
        reponse(LINGE, CLIENTE, 'En fait, ce que vous cherchez, c’est le moins cher, peu importe la qualité.',
          'interpretation', 'ferme',
          'Le vendeur dit à la cliente ce qu’elle pense « en fait ». Elle n’a jamais dit que la qualité lui était égale.',
          'Elle se ferme : on lui prête une intention qu’elle n’a pas exprimée, et elle doit maintenant se défendre.'),
        reponse(LINGE, CLIENTE, 'Quelle capacité avait votre ancien appareil ? Et quel budget avez-vous prévu ?',
          'enquete', 'partiel',
          'Deux questions pour obtenir des informations : c’est une enquête.',
          'Elle répond, sans plus : les questions sont utiles, mais elles arrivent trop tôt et passent à côté de l’urgence qu’elle vient de dire.'),
        reponse(LINGE, CLIENTE, 'Si je comprends bien, il vous faut une machine rapidement, qui suive le linge d’une famille de cinq, sans faire exploser votre budget. C’est bien ça ?',
          'comprehension', 'ouvre',
          'Le vendeur redit les trois éléments de la cliente (l’urgence, la famille, le budget) avec ses mots, puis vérifie.',
          'Elle a envie d’en dire plus : elle se sent entendue, elle confirme ou elle complète.'),
        reponse(LINGE, CLIENTE, 'Vous auriez dû prendre l’extension de garantie, ça vous aurait évité ça.',
          'evaluation', 'ferme',
          '« Vous auriez dû » : le vendeur juge ce que la cliente a fait.',
          'Elle se ferme : elle se sent jugée, au moment où elle a déjà un problème.'),
        reponse(LINGE, CLIENTE, 'Prenez celui-ci, c’est la promotion de la semaine, et il peut être livré demain.',
          'solution', 'ferme',
          'Le vendeur propose un produit avant de savoir ce qu’il faut à la cliente.',
          'Elle se ferme : le vendeur décide à sa place, sans connaître ses besoins.'),
        reponse(LINGE, CLIENTE, 'Ne vous inquiétez pas, ça arrive à tout le monde, on va trouver.',
          'soutien', ['partiel', 'ferme'],
          'Le vendeur rassure : « ne vous inquiétez pas », « ça arrive à tout le monde ».',
          'L’effet est neutre, voire fermant : c’est gentil, mais ça minimise ce qu’elle vit et ça clôt le sujet. Les deux réponses sont acceptées.')
      ]
    }),

    '2.2': Object.assign({}, commun, {
      eyebrow: 'Attitudes d’écoute · Situation 2',
      title: 'Qui parle comme ça ? En entreprise',
      subtitle: 'Le dirigeant d’une entreprise de travaux reçoit un commercial. Six commerciaux lui répondent.',
      reviewIntro: { dialogue: [{ who: 'client', label: 'Le dirigeant', text: CHANTIERS }] },
      cases: [
        reponse(CHANTIERS, DIRIGEANT, 'La nouvelle version a une application mobile, ça réglera le problème. Je vous l’installe ?',
          'solution', 'ferme',
          'Le commercial apporte une réponse toute faite, sans savoir pourquoi les chefs de chantier n’ont pas utilisé le logiciel.',
          'Il se ferme : on lui vend la même chose une deuxième fois, sans l’avoir écouté.'),
        reponse(CHANTIERS, DIRIGEANT, 'Le logiciel marche très bien, vos équipes n’ont sans doute pas été assez formées.',
          'evaluation', 'ferme',
          'Le commercial juge : le logiciel est bon, ce sont les équipes qui ont mal fait.',
          'Il se ferme : il se sent mis en cause, lui et ses équipes.'),
        reponse(CHANTIERS, DIRIGEANT, 'Je comprends, beaucoup de clients ont vécu ça, ce n’est pas grave.',
          'soutien', ['partiel', 'ferme'],
          'Le commercial rassure et banalise : « beaucoup de clients », « ce n’est pas grave ». Le « je comprends » ne suffit pas à en faire une attitude de compréhension : rien de ce qu’a dit le client n’est repris.',
          'L’effet est neutre, voire fermant : pour le dirigeant, trois mois perdus, ce n’est pas rien. Les deux réponses sont acceptées.'),
        reponse(CHANTIERS, DIRIGEANT, 'Vous avez consacré trois mois à un test qui n’a rien donné, et vous ne voulez pas revivre ça. Avant d’aller plus loin, vous voulez être sûr que vos chefs de chantier l’utiliseront vraiment, c’est ça ?',
          'comprehension', 'ouvre',
          'Le commercial reprend ce qu’a vécu le dirigeant et ce qu’il craint, puis il vérifie.',
          'Il a envie d’en dire plus : il se sent compris, et il va expliquer ce qui a bloqué.'),
        reponse(CHANTIERS, DIRIGEANT, 'En réalité, vous êtes surtout vexé que mon collègue ne vous ait jamais rappelé.',
          'interpretation', 'ferme',
          '« En réalité, vous êtes vexé » : le commercial explique au client ce qu’il ressentirait vraiment.',
          'Il se ferme : on lui attribue un sentiment qu’il n’a pas exprimé.'),
        reponse(CHANTIERS, DIRIGEANT, 'Qu’est-ce qui les a freinés concrètement ? Sur quel appareil l’utilisaient-ils ?',
          'enquete', 'partiel',
          'Deux questions pour comprendre ce qui s’est passé : c’est une enquête.',
          'Il répond, sans plus : les questions sont pertinentes, mais le dirigeant n’a pas eu le sentiment d’être entendu d’abord.')
      ]
    }),

    '2.3': Object.assign({}, commun, {
      eyebrow: 'Attitudes d’écoute · Situation 3',
      title: 'Qui parle comme ça ? À l’agence immobilière',
      subtitle: 'Un propriétaire pousse la porte d’une nouvelle agence pour vendre son appartement. Six agents lui répondent.',
      reviewIntro: { dialogue: [{ who: 'client', label: 'Le propriétaire', text: APPARTEMENT }] },
      cases: [
        reponse(APPARTEMENT, PROPRIETAIRE, 'Combien de visites avez-vous eues ? Et à quel prix est-il affiché ?',
          'enquete', 'partiel',
          'Deux questions pour obtenir des faits : c’est une enquête.',
          'Il répond, sans plus : il donne des chiffres, mais son découragement passe à la trappe.'),
        reponse(APPARTEMENT, PROPRIETAIRE, 'Quatre mois sans une seule offre, c’est usant, et vous finissez par douter de votre appartement. C’est bien ce que vous ressentez ?',
          'comprehension', 'ouvre',
          'L’agent reprend la durée, l’absence d’offre et le doute du propriétaire, puis vérifie.',
          'Il a envie d’en dire plus : il se sent compris, et il va raconter ce qui s’est passé.'),
        reponse(APPARTEMENT, PROPRIETAIRE, 'Quatre mois sans offre, c’est que le prix de départ était trop haut, tout simplement.',
          'evaluation', 'ferme',
          'L’agent juge le choix du propriétaire, sans rien savoir encore de l’appartement.',
          'Il se ferme : il se sent jugé, et il a l’impression qu’on lui reproche ses quatre mois perdus.'),
        reponse(APPARTEMENT, PROPRIETAIRE, 'Ne vous découragez pas, tous les appartements finissent par trouver un acheteur.',
          'soutien', ['partiel', 'ferme'],
          'L’agent rassure : « ne vous découragez pas », « tous finissent par se vendre ».',
          'L’effet est neutre, voire fermant : c’est encourageant, mais ça balaie son inquiétude sans l’écouter. Les deux réponses sont acceptées.'),
        reponse(APPARTEMENT, PROPRIETAIRE, 'On baisse le prix de 10 %, on refait les photos, et je vous trouve un acheteur en un mois.',
          'solution', 'ferme',
          'L’agent propose un plan d’action avant d’avoir compris pourquoi l’appartement ne se vend pas.',
          'Il se ferme : on décide à sa place, et on lui demande déjà de baisser son prix.'),
        reponse(APPARTEMENT, PROPRIETAIRE, 'Au fond, vous en voulez surtout à l’autre agence de vous avoir mal conseillé.',
          'interpretation', 'ferme',
          '« Au fond, vous en voulez à l’autre agence » : l’agent explique au propriétaire ce qu’il penserait vraiment.',
          'Il se ferme : on lui prête une rancune qu’il n’a pas exprimée.')
      ]
    })
  };

  /* Les onglets « Réponse 1 » à « Réponse 6 », et le nom de celui qui répond. */
  const SELLERS = { '2.1': 'Le vendeur', '2.2': 'Le commercial', '2.3': 'L’agent' };
  const PICTURES = {
    '2.1': { image: 'assets/illustrations/dialogues/magasin.webp', alt: 'Dans un magasin, un vendeur répond à une cliente qui l’écoute, la main sous le menton.' },
    '2.2': { image: 'assets/illustrations/dialogues/entreprise.webp', alt: 'Dans un atelier, une commerciale explique quelque chose à un client qui l’écoute, sceptique.' },
    '2.3': { image: 'assets/illustrations/dialogues/agence.webp', alt: 'À une table de rendez-vous, une conseillère présente un document sur sa tablette à un client pensif.' }
  };
  // Chaque onglet reprend quelques mots de la réponse qu'il contient : on sait
  // ce qui attend derrière. Jamais « Réponse 1 », ni le même mot partout.
  const TABS = {
    '2.1': ['« Le moins cher »', '« Quelle capacité ? »', '« Une famille de cinq »', '« L’extension de garantie »', '« La promotion de la semaine »', '« On va trouver »'],
    '2.2': ['« L’application mobile »', '« Le logiciel marche bien »', '« Beaucoup de clients »', '« Trois mois de test »', '« Mon collègue »', '« Sur quel appareil ? »'],
    '2.3': ['« Combien de visites ? »', '« Douter de votre appartement »', '« Le prix de départ »', '« Tous les appartements »', '« On baisse le prix »', '« L’autre agence »']
  };
  // Le nom de celui qui répond, dans les messages (« Commercial 2 : faites un choix »).
  const NOUNS = { '2.1': ['Vendeur', 'vendeurs'], '2.2': ['Commercial', 'commerciaux'], '2.3': ['Agent', 'agents'] };
  // Le côté de l'image où se tient le client (le vendeur est de l'autre côté).
  const CLIENT_SIDE = { '2.1': 'left', '2.2': 'left', '2.3': 'left' };
  for (const [id, exercise] of Object.entries(S2)) {
    const [noun, plural] = NOUNS[id];
    exercise.caseNoun = noun;
    exercise.tour = tour.map(step => (step.target === '.fm-tabs' ? Object.assign({}, step, { title: `Six ${plural}`, text: 'Chaque onglet reprend quelques mots d’une réponse. Le corrigé arrive après la dernière.' }) : step));
    exercise.cases.forEach((kase, i) => {
      kase.tab = TABS[id][i];
      kase.scene.dialogue[1].label = SELLERS[id];
      // Les deux répliques en bulles sur l'image ; le corrigé garde l'échange en texte.
      kase.reviewScene = [kase.scene];
      const side = who => (who === 'client' ? CLIENT_SIDE[id] : CLIENT_SIDE[id] === 'left' ? 'right' : 'left');
      kase.scene = [Object.assign({}, PICTURES[id], { bubbles: kase.scene.dialogue.map(line => Object.assign({ side: side(line.who) }, line)) })];
    });
  }
  root.ATELIER_S2 = S2;
})(typeof window !== 'undefined' ? window : globalThis);
