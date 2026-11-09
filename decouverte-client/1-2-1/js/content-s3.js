/* SÉRIE 3 · REFORMULER (fiche M1.2.1, activité A2).
 *
 * Trois façons de reformuler, chacune sur plusieurs clients de secteurs
 * différents : l'écho (un mot clé repris en question), le reflet (ce que le
 * client ressent), la synthèse (tout l'essentiel, puis une validation).
 * Puis un exercice pour repérer ce qui n'est pas une reformulation.
 *
 * Les réponses rédigées sont relues par le score estimatif (js/grilles.js).
 */
(function (root) {
  'use strict';

  /* Une réplique de client, et le champ où l'apprenant écrit sa reformulation.
   * `portrait` : un portrait différent par client, jamais repris d'un exercice
   * à l'autre (assets/illustrations/clients/). */
  const client = (tab, speaker, quote, model, placeholder, portrait) => ({
    tab,
    // Une scène illustrée ({ image, alt }) remplace le portrait : elle s'affiche en grand, au-dessus de la réplique.
    scene: portrait && portrait.image
      ? [{ image: portrait.image, alt: portrait.alt }, { quote, speaker, portrait: false }]
      : { quote, speaker, portrait },
    fields: [{ id: 'text', label: 'Votre reformulation', sub: 'Écrivez ce que vous diriez au client, mot pour mot.', placeholder, rows: 3, model }]
  });

  /* L'écho (3.1) : le champ dit exactement quoi écrire, avec un exemple pris
   * hors de l'exercice (il ne donne pas la réponse). */
  const echo = (...args) => {
    const kase = client(...args);
    kase.fields = kase.fields.map(f => Object.assign({}, f, {
      label: 'Votre écho : son mot clé, en question',
      sub: 'Reprenez un ou quelques mots du client, tels quels, avec un point d’interrogation. Vous pouvez ajouter une courte relance (« C’est-à-dire ? »).',
      placeholder: 'Ex. : « Trop cher ? C’est-à-dire ? »',
      rows: 2
    }));
    return kase;
  };

  /* Les critères de la grille d'auto-positionnement, repris tels quels. */
  const fidelite = { title: 'Fidélité aux mots du client', text: 'Ma reformulation ne contient ni ajout, ni jugement, ni argument sur un produit.' };

  root.ATELIER_S3 = {

    /* ── 3.1 · L'écho ─────────────────────────────────────────────────── */
    '3.1': {
      eyebrow: 'Reformuler · L’écho',
      title: 'L’écho : un mot, une question',
      subtitle: 'Reprenez le mot clé du client, sur un ton de question, pour l’inviter à préciser.',
      welcome: { title: 'Reformuler en écho', rows: [
        ['compass', 'Pourquoi on est là', 'Au début d’un entretien, le client parle peu. Souvent une seule phrase, avec un mot plus fort que les autres. C’est ce mot qu’il faut saisir.'],
        ['target', 'L’objectif', 'Prendre le réflexe de relancer sur ce mot, au lieu de répondre tout de suite. Vous obtenez une information de plus, sans orienter le client.'],
        ['lightbulb', 'Bon à savoir', 'Le ton compte autant que les mots. Dit d’une voix plate, l’écho sonne comme une moquerie. Avec une vraie curiosité dans la voix, il invite à continuer.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'Le client', text: 'Lisez ce que le client vous dit.' },
        { target: '.fm-main .fm-field', title: 'Votre écho', text: 'Reprenez le mot clé du client, tel quel, avec un point d’interrogation. Exemple : « Trop cher ? C’est-à-dire ? »' },
        { target: '.fm-actions', title: 'Client suivant', text: 'Trois clients : le corrigé arrive après le dernier.' }
      ],
      caseNoun: 'Client',
      pills: true,
      className: 'fm-airy',
      countLabel: 'échos écrits',
      submitLabel: 'Client suivant',
      cases: [
        echo('Le cycliste', 'Le client, dans un magasin de vélos électriques', 'Je fais 25 kilomètres par jour pour aller au travail, avec une côte terrible à la fin.',
          'Une côte terrible ? C’est-à-dire ?', 'Votre écho…', 'client-tasse'),
        echo('La famille', 'La cliente, dans une agence de voyages', 'On voudrait partir en famille cet été, mais pas comme l’an dernier : c’était épuisant.',
          'C’était épuisant ? Qu’est-ce qui vous a fatiguée ?', 'Votre écho…', 'client-pull-clair'),
        echo('La restauratrice', 'La gérante d’un restaurant, au téléphone avec un fournisseur', 'Avec notre fournisseur actuel, les livraisons, c’est toujours la loterie.',
          'Toujours la loterie ? Comment ça se passe ?', 'Votre écho…', 'client-chignon')
      ],
      selfCheck: {
        title: 'Relisez vos trois échos',
        question: 'Chacun de vos échos respecte-t-il ces points ?',
        rows: [
          { title: 'Un mot du client', text: 'Je reprends un mot clé du client, tel qu’il l’a dit.' },
          { title: 'Une question', text: 'Mon écho se termine par un point d’interrogation : il invite à préciser.' },
          fidelite
        ]
      },
      keyPoint: 'À retenir : l’écho est la reformulation la plus courte. Il ne propose rien : il laisse le client préciser lui-même. On reprend son mot, puis une courte relance (« c’est-à-dire ? ») : le mot seul, renvoyé sec, sonne comme un perroquet. « Une côte terrible ? C’est-à-dire ? » vous apprendra la pente, la distance, s’il arrive en sueur au bureau… autant d’indices sur son vrai besoin. Erreur fréquente : « Ah, il vous faut un moteur puissant ! » n’est pas une reformulation, c’est déjà une solution.',
      feedback: 'Votre écho reprend-il un mot du client, sur un ton de question, sans rien ajouter ?'
    },

    /* ── 3.2 · Le reflet ──────────────────────────────────────────────── */
    '3.2': {
      eyebrow: 'Reformuler · Le reflet',
      title: 'Le reflet : dire ce que le client ressent',
      subtitle: 'Renvoyez au client ce qu’il ressent, avec ses mots, sans juger ni conseiller.',
      welcome: { title: 'Reformuler en reflet', rows: [
        ['compass', 'Pourquoi on est là', 'Un client contrarié n’écoute pas vos questions tant qu’il ne se sent pas compris. Tant que son émotion est là, elle bloque la suite de l’entretien.'],
        ['target', 'L’objectif', 'Mettre des mots sur ce que le client ressent, pour faire baisser la tension. Ensuite seulement, il est prêt à parler de ce qu’il attend.'],
        ['lightbulb', 'Bon à savoir', 'Si vous vous trompez d’émotion, ce n’est pas grave : le client vous corrige, et vous en apprenez encore plus.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'Le client', text: 'Lisez ce que le client vous dit, et ce qu’il ressent.' },
        { target: '.fm-main .fm-field', title: 'Votre reflet', text: 'Dites-lui ce qu’il ressent, avec ses mots.' },
        { target: '.fm-actions', title: 'Client suivant', text: 'Trois clients : le corrigé arrive après le dernier.' }
      ],
      caseNoun: 'Client',
      pills: true,
      className: 'fm-airy',
      countLabel: 'reflets écrits',
      submitLabel: 'Client suivant',
      cases: [
        client('La rénovation', 'Une cliente, dans un showroom de carrelage, pour rénover sa maison', 'Ça fait trois fois qu’on a un coup de cœur pour un carrelage. À chaque fois, le temps de se décider, il n’est plus disponible.',
          'Vous avez l’impression de toujours arriver trop tard, et ça finit par être décourageant.', 'Votre reflet…',
          { image: 'assets/illustrations/dialogues/showroom-carrelage.webp', alt: 'Dans un showroom de matériaux, une cliente pensive écoute un vendeur qui lui montre des échantillons.' }),
        client('L’automobiliste', 'Le client, chez son concessionnaire automobile', 'C’est la troisième fois que je reviens pour le même bruit. On me dit que c’est réglé, et deux jours après, ça recommence.',
          'Vous en avez assez de revenir pour rien, et vous avez le sentiment de ne pas être pris au sérieux.', 'Votre reflet…',
          { image: 'assets/illustrations/dialogues/concession-automobile.webp', alt: 'Chez un concessionnaire, un client pensif écoute une conseillère qui consulte sa tablette.' }),
        client('La responsable', 'La responsable des ressources humaines d’une entreprise', 'J’ai déjà payé deux formations l’an dernier, et mes équipes n’en ont rien retiré.',
          'Vous êtes déçue par ces deux formations, et vous craignez de dépenser encore pour rien.', 'Votre reflet…',
          { image: 'assets/illustrations/dialogues/entretien-rh.webp', alt: 'Dans un bureau, deux femmes discutent autour d’une table, l’une tient une feuille à la main.' })
      ],
      selfCheck: {
        title: 'Relisez vos trois reflets',
        question: 'Chacun de vos reflets respecte-t-il ces points ?',
        rows: [
          { title: 'Ce qu’il ressent', text: 'Je nomme ce que le client ressent : déception, lassitude, découragement…' },
          { title: 'Ses mots', text: 'Je reprends la situation qu’il décrit, avec ses mots.' },
          fidelite
        ]
      },
      keyPoint: 'À retenir : le reflet nomme l’émotion sans la juger. « Il fallait vous décider plus vite » n’est pas un reflet : c’est une évaluation, le vendeur fait la leçon. « Vous avez l’impression d’arriver toujours trop tard » montre au client qu’on a compris ce qu’il vit.',
      feedback: 'Votre reflet nomme-t-il ce que ressent le client, sans conseil ni jugement ?'
    },

    /* ── 3.3 · La synthèse ────────────────────────────────────────────── */
    '3.3': {
      eyebrow: 'Reformuler · La synthèse',
      title: 'La synthèse : tout l’essentiel, puis valider',
      subtitle: 'Résumez tout ce que le client vous a dit, sans rien ajouter, puis demandez-lui de valider.',
      welcome: { title: 'Reformuler en synthèse', rows: [
        ['compass', 'Pourquoi on est là', 'Pendant un entretien, le client donne ses informations dans le désordre. Sans résumé, chacun repart avec sa propre version.'],
        ['target', 'L’objectif', 'Rassembler en quelques phrases tout ce qu’il a dit, et le lui faire confirmer. Vous continuez ensuite sur une base que vous partagez tous les deux.'],
        ['lightbulb', 'Bon à savoir', 'La synthèse sert aussi de passage : une fois qu’elle est validée, vous pouvez présenter votre proposition.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'Ce que le client a dit', text: 'Lisez les quatre éléments donnés par le client.' },
        { target: '.fm-main .fm-field', title: 'Votre synthèse', text: 'Reprenez les quatre éléments, puis terminez par une question de validation.' },
        { target: '.fm-actions', title: 'Client suivant', text: 'Deux clients : le corrigé arrive après le second.' }
      ],
      caseNoun: 'Client',
      pills: true,
      className: 'fm-airy',
      countLabel: 'synthèses écrites',
      submitLabel: 'Client suivant',
      cases: [
        { tab: 'La gérante', scene: [
          { info: 'Vous rencontrez la gérante de deux salons de coiffure. Voici ce qu’elle vous a dit en cinq minutes d’entretien.', symbol: 'users' },
          { facts: [
            { symbol: 'phone', text: 'Elle perd du temps à répondre au téléphone pendant qu’elle coiffe.' },
            { symbol: 'calendar', text: 'Environ trois clientes par semaine ne viennent pas à leur rendez-vous.' },
            { symbol: 'users', text: 'Ses cinq coiffeuses doivent pouvoir consulter le planning sur leur téléphone.' },
            { symbol: 'info', text: 'Elle a déjà essayé une application de rendez-vous, qu’elle a trouvée trop compliquée.' }
          ] }
        ], fields: [{ id: 'text', label: 'Votre synthèse', sub: 'Les quatre éléments, sans rien ajouter, puis une question de validation.', placeholder: 'Votre synthèse…', rows: 6,
          model: 'Si je résume : vous voulez arrêter d’être interrompue par le téléphone pendant que vous coiffez, et réduire les rendez-vous manqués, environ trois par semaine. Vos coiffeuses doivent pouvoir consulter le planning sur leur téléphone. Et après votre première expérience, il vous faut un outil vraiment simple. C’est bien ça ? Il y a autre chose d’important pour vous ?' }] },
        { tab: 'Le restaurateur', scene: [
          { info: 'Vous rencontrez le patron d’un café-restaurant, qui veut changer sa machine à café. Voici ce qu’il vous a dit.', symbol: 'users' },
          { facts: [
            { symbol: 'gear', text: 'Sa machine actuelle tombe en panne presque chaque week-end, au moment où il y a le plus de monde.' },
            { symbol: 'chart', text: 'Il sert environ trois cents cafés par jour.' },
            { symbol: 'users', text: 'Ses serveurs changent souvent : la machine doit être facile à prendre en main.' },
            { symbol: 'target', text: 'La place derrière le comptoir est très réduite.' }
          ] }
        ], fields: [{ id: 'text', label: 'Votre synthèse', sub: 'Les quatre éléments, sans rien ajouter, puis une question de validation.', placeholder: 'Votre synthèse…', rows: 6,
          model: 'Si je résume : votre machine actuelle tombe en panne presque chaque week-end, justement quand vous avez le plus de clients, et vous servez environ trois cents cafés par jour. Comme vos serveurs changent souvent, elle doit être simple à utiliser. Et la place derrière le comptoir est réduite. C’est bien ça ? Y a-t-il un autre point important pour vous ?' }] }
      ],
      selfCheck: {
        title: 'Relisez vos deux synthèses',
        question: 'Chacune de vos synthèses respecte-t-elle ces points ?',
        rows: [
          { title: 'Tous les éléments', text: 'Je reprends les quatre éléments donnés par le client.' },
          { title: 'Une validation', text: 'Je termine par une question : « C’est bien ça ? ».' },
          fidelite
        ]
      },
      keyPoint: 'À retenir : une synthèse réussie reprend tout l’essentiel, n’ajoute rien (ni produit, ni solution, ni prix) et se termine par une validation. Ajouter « Il y a autre chose d’important pour vous ? » invite le client à compléter : c’est souvent là qu’il livre le point décisif.',
      feedback: 'Votre synthèse reprend-elle les quatre éléments, sans rien ajouter, avec une validation à la fin ?'
    }
  };
  /* ── 3.4 · Repérer l'intrus ───────────────────────────────────────── */
  const REFO = [
    { id: 'oui', label: 'Une reformulation', sub: 'Elle redit ce que dit le client, sans rien ajouter.' },
    { id: 'non', label: 'Pas une reformulation', sub: 'Elle ajoute un jugement, une interprétation, un argument ou une solution.' }
  ];
  const OFFRE = 'Votre concurrent m’a fait une offre, mais je ne la sens pas trop.';
  const DOS = 'Je dors mal depuis des mois, je me réveille avec le dos en compote.';
  const CONTRAT = 'Je ne comprends rien à ces contrats. J’ai peur de signer quelque chose qui ne me protège pas vraiment.';
  const SAISIE = 'On perd des heures chaque semaine à ressaisir les commandes à la main.';
  // Chaque onglet reprend quelques mots de la réponse du vendeur : on sait ce
  // qui attend derrière. Jamais « Réponse 1 », ni le même mot partout.
  const intrus = (tab, quote, reply, answer, why) => ({
    tab,
    // Les deux répliques en bulles sur l'image (le vendeur à gauche, la cliente à droite) ;
    // le corrigé garde l'échange en texte.
    scene: [{ image: 'assets/illustrations/dialogues/reformulation.webp', alt: 'Un vendeur montre quelque chose sur sa tablette à une cliente qui l’écoute attentivement.',
      bubbles: [{ who: 'client', side: 'right', label: 'La cliente', text: quote }, { who: 'seller', side: 'left', label: 'Le vendeur', text: reply }] }],
    reviewScene: [{ dialogue: [{ who: 'client', label: 'La cliente', text: quote }, { who: 'seller', label: 'Le vendeur', text: reply }] }],
    fields: [{ id: 'type', type: 'choice', label: 'Cette réponse est…', options: REFO, answer, why, whyTitle: 'Pourquoi' }]
  });

  root.ATELIER_S3['3.4'] = {
    eyebrow: 'Reformuler · Repérer l’intrus',
    title: 'Reformulation, ou pas ?',
    subtitle: 'Quatre clients, huit réponses : repérez celles qui ne sont pas de vraies reformulations.',
    welcome: { title: 'Une vraie reformulation', rows: [
      ['chat', 'Reformuler', 'C’est redire ce que dit le client, avec ses mots ou les vôtres, sans rien ajouter.'],
      ['search', 'Les intrus', 'Certaines réponses y ressemblent, mais ajoutent un jugement, une interprétation, un argument ou une solution.'],
      ['pencil', 'Ce qui vous est demandé', 'Pour chaque réponse, dites si c’est une reformulation ou non.']
    ] },
    tour: [
      { target: '.fm-scene', title: 'L’échange', text: 'Lisez ce que dit le client, puis la réponse du vendeur.' },
      { target: '.fm-main .fm-field', title: 'Votre avis', text: 'Cliquez : reformulation, ou pas ?' },
      { target: '.fm-actions', title: 'Réponse suivante', text: 'Huit réponses : le corrigé arrive après la dernière.' }
    ],
    caseNoun: 'Réponse',
    // Pleine largeur : l'illustration au-dessus du dialogue reste grande ; onglets en pastilles.
    pills: true,
    countLabel: 'réponses jugées',
    submitLabel: 'Réponse suivante',
    cases: [
      intrus('« Des doutes sur leur offre »', OFFRE, 'Vous avez des doutes sur leur offre.', 'oui', 'C’est un reflet : le vendeur redit le doute du client, sans rien ajouter.'),
      intrus('« Un matelas ferme »', DOS, 'Il vous faut un matelas ferme, c’est ce qu’il y a de mieux pour le dos.', 'non', 'C’est une solution, et même un conseil discutable : le vendeur ne sait encore rien des besoins du client.'),
      intrus('« Difficiles à lire »', CONTRAT, 'Les contrats vous paraissent difficiles à lire, et vous craignez de ne pas être bien protégé.', 'oui', 'Le vendeur redit la difficulté et la crainte du client, avec d’autres mots, sans rien ajouter.'),
      intrus('« Leurs frais cachés »', OFFRE, 'Vous avez raison de vous méfier, ils sont connus pour leurs frais cachés.', 'non', 'C’est une évaluation (« vous avez raison »), et elle dénigre le concurrent. Le client n’a jamais parlé de frais cachés.'),
      intrus('« Des heures perdues »', SAISIE, 'Des heures perdues chaque semaine, à tout ressaisir à la main ?', 'oui', 'C’est un écho : le vendeur reprend les mots du client sur un ton de question, pour l’inviter à préciser.'),
      intrus('« Les plus simples du marché »', CONTRAT, 'Pas de panique, nos contrats sont les plus simples du marché.', 'non', 'C’est du soutien (« pas de panique ») suivi d’un argument sur le produit. La crainte du client n’est pas reprise.'),
      intrus('« Quelque chose vous retient ? »', OFFRE, 'Quelque chose vous retient dans leur proposition ?', 'oui', 'C’est un écho reformulé en question : le client est invité à dire ce qui le retient.'),
      intrus('« Manque d’organisation »', SAISIE, 'Donc en fait, votre équipe manque surtout d’organisation.', 'non', 'C’est une interprétation, presque un jugement : le client a parlé de temps perdu, pas d’une équipe mal organisée.')
    ],
    keyPoint: 'À retenir : une reformulation n’ajoute rien. Dès qu’apparaissent un jugement (« vous avez raison »), une interprétation (« en fait »), un argument (« nos contrats ») ou une solution (« il vous faut »), on n’écoute plus : on parle de soi ou du produit.'
  };
})(typeof window !== 'undefined' ? window : globalThis);
