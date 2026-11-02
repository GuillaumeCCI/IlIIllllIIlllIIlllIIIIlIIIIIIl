/* SÉRIE 4 · ANALYSER UN ENTRETIEN (fiche M1.2.1, activité A3).
 *
 * Nadia, conseillère immobilière, reçoit M. et Mme Benali pour un premier
 * rendez-vous. Comme 1-1-1 S1 A : à gauche, l'illustration de la scène, avec
 * « Écouter l'entretien » et « Voir la transcription » ; à droite, une question
 * à la fois. Les quatre exercices se font dans n'importe quel ordre.
 *   4.1  l'attitude de Nadia dans chacune de ses répliques (L2 à L8) ;
 *   4.2  les signaux du couple que Nadia n'a pas exploités, et la question
 *        qui en vérifie un ;
 *   4.3  pourquoi les répliques L7 et L8 retournent la situation ;
 *   4.4  la réplique L3, réécrite avec une attitude de compréhension.
 */
(function (root) {
  'use strict';

  /* L'entretien, réplique par réplique. Ce qui est entre crochets décrit le
   * comportement, sans paroles. */
  const LIGNES = [
    { who: 'seller', label: 'L1 · Nadia', text: 'Bonjour, installez-vous. Alors, qu’est-ce que vous recherchez ?' },
    { who: 'client', label: 'Mme Benali', text: 'Une maison avec un jardin, pour les enfants. On est au troisième étage sans ascenseur, ça devient compliqué.' },
    { who: 'seller', label: 'L2 · Nadia', text: 'Combien de chambres ? Quel budget ? Vous avez un accord de prêt ?' },
    { who: 'client', label: 'Mme Benali', text: 'Trois chambres… Environ 280 000 €. On a vu la banque, mais rien n’est signé.' },
    { who: 'client', label: 'M. Benali', text: '[Il consulte son téléphone, les bras croisés.] Et pas trop loin.' },
    { who: 'seller', label: 'L3 · Nadia', text: 'Pas trop loin, comme tout le monde ! Avec 280 000 € pour trois chambres et un jardin, il faudra s’éloigner, soyons réalistes.' },
    { who: 'client', label: 'Mme Benali', text: 'Mon mari travaille de nuit à l’hôpital, il finit parfois à 23 heures.' },
    { who: 'seller', label: 'L4 · Nadia', text: 'Ah, je vois : en fait, Monsieur ne veut pas changer ses habitudes.' },
    { who: 'client', label: 'M. Benali', text: '[Sèchement.] Non, ce n’est pas une question d’habitudes. [Silence. Mme Benali se tourne vers son mari.]' },
    { who: 'seller', label: 'L5 · Nadia', text: 'Ne vous en faites pas, on trouve toujours, j’ai plein de clients dans votre cas.' },
    { who: 'seller', label: 'L6 · Nadia', text: 'J’ai justement une maison à 25 minutes, à 275 000 €. Je vous l’imprime ?' },
    { who: 'client', label: 'M. Benali', text: '[Il soupire.]' },
    { who: 'seller', label: 'L7 · Nadia', text: 'Je reviens en arrière, Monsieur. Quand vous dites « pas trop loin », c’est le trajet de nuit, après le travail, qui vous préoccupe ?' },
    { who: 'client', label: 'M. Benali', text: '[Il décroise les bras.] Voilà. Vingt minutes de route à 23 heures, après une garde de douze heures, pas plus. Je me suis déjà endormi au volant une fois.' },
    { who: 'seller', label: 'L8 · Nadia', text: 'Donc, si je résume : une maison de trois chambres avec un jardin pour les enfants, autour de 280 000 €, et surtout à moins de vingt minutes de l’hôpital, pour que vous rentriez en sécurité après vos gardes. C’est bien ça ?' },
    { who: 'client', label: 'M. et Mme Benali', text: 'Oui, exactement.' }
  ];

  const ligne = code => LIGNES.find(line => line.label.startsWith(`${code} `));
  const SCENE = [{ media: {
    image: 'assets/illustrations/dialogues/rendez-vous-benali.webp',
    alt: 'Dans une agence, un couple écoute, attentif, une conseillère qui montre des plans et des annonces.',
    placeholder: 'Le rendez-vous des Benali',
    title: 'Le rendez-vous des Benali',
    intro: 'Nadia, conseillère immobilière, reçoit M. et Mme Benali pour un premier rendez-vous. Ce qui est entre crochets décrit leur comportement.',
    transcript: LIGNES,
    listenLabel: 'Écouter l’entretien',
    note: 'Écoute lue par la voix de votre navigateur. La transcription décrit aussi les gestes du couple.'
  } }];
  const scene = { target: '.sc-media', title: 'La scène', text: 'Écoutez l’entretien, ou lisez sa transcription.' };

  const welcome = {
    title: 'Le rendez-vous des Benali',
    rows: [
      ['users', 'L’entretien', 'Nadia, conseillère immobilière, reçoit un couple qui cherche une maison. Ses répliques sont numérotées de L1 à L8.'],
      ['eye', 'Les signaux', 'Un signal, c’est ce que le client montre sans le dire clairement : un mot glissé, un geste, un silence, un ton.'],
      ['pencil', 'Ce qui vous est demandé', '']
    ]
  };
  const accueil = demande => ({ title: welcome.title, rows: welcome.rows.map(row => (row[0] === 'pencil' ? ['pencil', row[1], demande] : row)) });

  const ATTITUDES = root.ATELIER_ATTITUDES;

  /* ── 4.1 · L'attitude de chaque réplique ──────────────────────────── */
  const replique = (code, answer, why) => ({
    tab: code,
    scene: SCENE,
    reviewScene: [{ dialogue: [ligne(code)] }],
    fields: [{ id: 'attitude', type: 'choice', label: `L’attitude de Nadia en ${code}`, sub: `« ${ligne(code).text} »`, options: ATTITUDES, answer, why, whyTitle: 'Pourquoi' }]
  });

  root.ATELIER_S4 = {
    '4.1': {
      eyebrow: 'Analyser un entretien · Les attitudes',
      title: 'Les attitudes de Nadia',
      subtitle: 'Pour chacune de ses répliques, de L2 à L8, trouvez l’attitude d’écoute de Nadia.',
      welcome: accueil('Pour chaque réplique de Nadia surlignée, trouvez son attitude d’écoute.'),
      tour: [
        scene,
        { target: '.fm-main .fm-field', title: 'La réplique', text: 'Cliquez sur l’attitude de Nadia dans cette réplique.' },
        { target: '.fm-actions', title: 'Réplique suivante', text: 'Sept répliques : le corrigé arrive après la dernière.' }
      ],
      caseNoun: 'Réplique',
      pills: true,
      countLabel: 'répliques analysées',
      submitLabel: 'Réplique suivante',
      cases: [
        replique('L2', 'enquete', 'Trois questions en rafale, sans rien reprendre de ce que vient de dire Mme Benali : un interrogatoire.'),
        replique('L3', 'evaluation', '« Comme tout le monde », « soyons réalistes » : Nadia juge le souhait du couple, et glisse déjà vers une solution.'),
        replique('L4', 'interpretation', '« En fait, Monsieur ne veut pas changer ses habitudes » : Nadia prête une intention à M. Benali.'),
        replique('L5', 'soutien', '« Ne vous en faites pas, on trouve toujours » : c’est rassurant, mais ça minimise la tension qui vient d’apparaître.'),
        replique('L6', 'solution', 'Une maison proposée trop tôt, qui ne respecte même pas le critère des vingt minutes.'),
        replique('L7', 'comprehension', 'Nadia reprend les mots exacts de M. Benali (« pas trop loin ») et vérifie ce qu’elle a compris.'),
        replique('L8', 'comprehension', 'Une reformulation-synthèse de tout ce que le couple a dit, validée par les deux.')
      ],
      keyPoint: 'À retenir : Nadia passe par toutes les attitudes avant de trouver la bonne. Dès qu’elle reprend les mots du client (L7) et résume (L8), le couple se détend et livre son vrai besoin.'
    },

    /* ── 4.2 · Les signaux manqués ──────────────────────────────────── */
    '4.2': {
      eyebrow: 'Analyser un entretien · Les signaux',
      title: 'Les signaux que Nadia n’a pas vus',
      subtitle: 'Repérez les signaux du couple que Nadia n’a pas exploités avant L7, puis écrivez la question qui en vérifie un.',
      welcome: accueil('Repérez les signaux que Nadia laisse passer avant L7, puis écrivez la question qui en vérifie un.'),
      tour: [
        scene,
        { target: '.fm-main .fm-field', title: '1. Les signaux', text: 'Cliquez sur chaque signal que Nadia n’a pas exploité avant L7.' },
        { target: '.fm-actions', title: 'Étape suivante', text: 'Ensuite, vous écrirez la question qui vérifie un signal.' }
      ],
      caseNoun: 'Étape',
      pills: true,
      // Pleine largeur : la scène illustrée reste grande.
      submitLabel: 'Voir le corrigé',
      scoreScope: 'Le score estimatif porte sur votre question (partie 2). Les signaux repérés sont corrigés juste en dessous.',
      cases: [
        { tab: 'Repérer', scene: SCENE, reviewScene: false, fields: [
          { id: 'signaux', type: 'chips', columns: 2, label: '1 · Les signaux que Nadia n’a pas exploités', sub: 'Choisissez-en au moins trois. Certains ne sont pas des signaux manqués.', chipNoun: 'signal', min: 3,
            extraNote: 'Nadia en a déjà tenu compte',
            options: [
              { id: 'telephone', label: 'M. Benali consulte son téléphone, les bras croisés', why: 'Il ne se sent pas concerné, ou pas écouté.' },
              { id: 'chambres', label: 'Mme Benali veut trois chambres', why: 'Nadia l’a demandé elle-même en L2.' },
              { id: 'loin', label: '« Et pas trop loin » : un critère dit en trois mots', why: 'Un critère aussi court est à creuser : c’est un besoin qui ne se dit pas encore.' },
              { id: 'budget', label: 'Le budget d’environ 280 000 €', why: 'Nadia l’a repris dès L3.' },
              { id: 'nuit', label: 'M. Benali travaille de nuit et finit parfois à 23 heures', why: 'C’est l’information qui explique « pas trop loin ».' },
              { id: 'sec', label: 'La réponse sèche, le silence, le regard de Mme Benali vers son mari', why: 'La tension monte : la relation se dégrade.' },
              { id: 'bonjour', label: 'Le couple s’installe après le bonjour de Nadia', why: 'C’est l’accueil, pas un signal.' },
              { id: 'soupir', label: 'Le soupir de M. Benali après la proposition de maison', why: 'La proposition est rejetée avant même d’être regardée.' }
            ],
            answer: ['telephone', 'loin', 'nuit', 'sec', 'soupir'] }
        ] },
        { tab: 'Vérifier', scene: SCENE, reviewScene: false, fields: [
          { id: 'verifier', label: '2 · Vérifier un signal', sub: 'Choisissez l’un de ces signaux. Quelle question auriez-vous posée pour le vérifier, au lieu de le supposer ?', placeholder: 'Votre question au client…', rows: 3,
            model: 'Pour « pas trop loin » : « Quand vous dites pas trop loin, Monsieur, c’est par rapport à quoi, surtout ? ». Pour les bras croisés : « Monsieur, qu’est-ce qui compte le plus pour vous dans ce projet ? »' }
        ] }
      ],
      keyPoint: 'Point de vigilance : un signal non verbal est une hypothèse, pas une preuve. Des bras croisés peuvent aussi vouloir dire « j’ai froid ». On vérifie toujours par une question ou une reformulation, comme Nadia le fait enfin en L7.'
    },

    /* ── 4.3 · Ce qui retourne la situation ───────────────────────────── */
    '4.3': {
      eyebrow: 'Analyser un entretien · Le retournement',
      title: 'Pourquoi L7 et L8 changent tout',
      subtitle: 'Expliquez pourquoi ces deux répliques de Nadia retournent la situation.',
      welcome: accueil('Expliquez pourquoi les répliques L7 et L8 retournent la situation.'),
      tour: [
        scene,
        { target: '.fm-main .fm-field', title: 'Votre analyse', text: 'Expliquez ce que font L7 et L8, et ce que ça change pour le couple.' },
        { target: '.fm-actions', title: 'Valider', text: 'Vous comparez ensuite avec une réponse possible.' }
      ],
      caseNoun: 'Analyse',
      submitLabel: 'Voir le corrigé',
      cases: [
        { tab: 'Votre analyse', scene: SCENE, reviewScene: false, fields: [
          { id: 'pourquoi', label: 'Pourquoi L7 et L8 retournent la situation', sub: 'Relisez la fin de l’entretien dans la transcription : ce que fait Nadia en L7 et L8, et l’effet sur M. et Mme Benali.', placeholder: 'Votre analyse…', rows: 7,
            model: 'En L7, Nadia reprend les mots exacts de M. Benali (« pas trop loin ») et s’adresse enfin à lui, alors qu’elle l’avait écarté jusque-là. M. Benali se sent entendu : il décroise les bras et livre son vrai besoin, la sécurité du trajet de nuit, pas le confort ni l’habitude. En L8, Nadia fait de ce besoin le premier critère de recherche (moins de vingt minutes de l’hôpital) et fait valider sa synthèse par les deux. Sans elle, toutes les maisons proposées auraient été à côté.' }
        ] }
      ],
      keyPoint: 'À retenir : reprendre les mots du client et lui demander de valider, c’est ce qui fait apparaître le vrai besoin. Ici, ce n’était ni le confort ni l’habitude, mais la sécurité.'
    },

    /* ── 4.4 · Réécrire L3 ───────────────────────────────────────────── */
    '4.4': {
      eyebrow: 'Analyser un entretien · Réécrire',
      title: 'Réécrire la réplique L3',
      subtitle: 'Réécrivez la réplique de Nadia avec une attitude de compréhension.',
      welcome: accueil('Réécrivez la réplique L3 de Nadia avec une attitude de compréhension.'),
      tour: [
        scene,
        { target: '.fm-main .fm-field', title: 'Votre réplique', text: 'Écrivez ce que Nadia aurait pu dire à la place.' },
        { target: '.fm-actions', title: 'Valider', text: 'Vous comparez ensuite avec une réponse possible.' }
      ],
      caseNoun: 'Réécriture',
      submitLabel: 'Voir le corrigé',
      cases: [
        { tab: 'Votre réplique', scene: SCENE, reviewScene: [{ dialogue: [LIGNES[4], ligne('L3')] }], fields: [
          { id: 'l3', label: 'Votre réplique, à la place de L3', sub: `M. Benali vient de dire « Et pas trop loin ». Nadia répond en L3 : « ${ligne('L3').text} » Reprenez le mot de M. Benali, sans juger, et invitez-le à préciser.`, placeholder: 'Ce que Nadia aurait pu dire…', rows: 4,
            model: '« Pas trop loin… La distance compte beaucoup pour vous, Monsieur. Pas trop loin de quoi, surtout ? » D’autres formulations conviennent si elles reprennent le mot du client, ne jugent pas et l’invitent à préciser.' }
        ] }
      ],
      keyPoint: 'À retenir : au lieu de juger (« comme tout le monde »), on reprend le mot du client et on l’invite à préciser. C’est souvent derrière un mot court que se cache le critère décisif.'
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
