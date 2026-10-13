/* SÉRIE 1 · BÂTIR L'ARGUMENT · contenus éditables.
 *
 * Les textes visibles sur les maquettes sont repris tels quels. Les éléments
 * que les maquettes ne montrent pas (séries B et C de l'intrus, second
 * argument à décomposer, second client SONCAS) et les corrigés viennent de
 * la fiche « Activités supplémentaires SCORM 1 » (M1.1.2, exercices 1.1 à
 * 1.6), transposés au vouvoiement.
 *
 * Modifiez-les ici, sans toucher au code des écrans.
 */
window.ATELIER_S1 = {
  /* ── 1.1 · Trouvez l'intrus ─────────────────────────────────────────── */
  '1.1': {
    /* Les illustrations des cartes, par texte de carte. Une carte sans
     * illustration garde son pictogramme (`icons`). */
    pictures: {
      'Sauvegarde toutes les 10 minutes': 'assets/illustrations/s1/intrus-sauvegarde.webp',
      'Interface mobile': 'assets/illustrations/s1/intrus-mobile.webp',
      'Vous travaillez de partout': 'assets/illustrations/s1/intrus-partout.webp',
      'Assistance 7j/7': 'assets/illustrations/s1/intrus-assistance.webp',
      '5 000 PME clientes': 'assets/illustrations/s1/intrus-pme.webp',
      '99,9 % de disponibilité': 'assets/illustrations/s1/intrus-disponibilite.webp',
      'Certifié ISO 27001': 'assets/illustrations/s1/intrus-iso.webp',
      'Vous ne perdez jamais vos données': 'assets/illustrations/s1/intrus-donnees.webp',
      'Vous gagnez du temps': 'assets/illustrations/s1/intrus-temps.webp',
      'Vous êtes serein sur la sécurité': 'assets/illustrations/s1/intrus-serein.webp',
      'Chiffrement de bout en bout': 'assets/illustrations/s1/intrus-chiffrement.webp'
    },
    eyebrow: 'Méthode CAP',
    title: 'Trouvez l’intrus',
    // `intruder` : index de la carte qui n'appartient pas au trio.
    // `category` : la nature commune aux trois autres (C, A ou P).
    // `icons` : le pictogramme de chaque carte, affiché à l'étape « classer ».
    series: [
      {
        cards: ['Sauvegarde toutes les 10 minutes', 'Interface mobile', 'Vous travaillez de partout', 'Assistance 7j/7'],
        icons: ['cloud', 'smartphone', 'compass', 'headset'],
        intruder: 2,
        category: 'C',
        why: 'Intrus : la carte 3. « Vous travaillez de partout » est un avantage parmi des caractéristiques : il dit ce que le client y gagne, les trois autres décrivent ce que fait le produit.'
      },
      {
        cards: ['5 000 PME clientes', '99,9 % de disponibilité', 'Certifié ISO 27001', 'Vous ne perdez jamais vos données'],
        icons: ['users', 'chart', 'award', 'database'],
        intruder: 3,
        category: 'P',
        why: 'Intrus : la carte 4. « Vous ne perdez jamais vos données » est un avantage parmi des preuves : les trois autres sont des faits vérifiables qui rendent la promesse crédible.'
      },
      {
        cards: ['Vous gagnez du temps', 'Vous êtes serein sur la sécurité', 'Chiffrement de bout en bout', 'Vous travaillez de partout'],
        icons: ['clock', 'shield', 'lock', 'compass'],
        intruder: 2,
        category: 'A',
        why: 'Intrus : la carte 3. « Chiffrement de bout en bout » est une caractéristique parmi des avantages : elle décrit le fonctionnement du produit, les trois autres expriment un gain pour le client.'
      }
    ],
    categories: [
      { id: 'C', label: 'Caractéristiques' },
      { id: 'A', label: 'Avantages' },
      { id: 'P', label: 'Preuves' }
    ]
  },

  /* ── 1.2 · Décomposez l'argument ────────────────────────────────────── */
  '1.2': {
    eyebrow: 'Méthode CAP',
    title: 'Décomposez l’argument',
    subtitle: 'Surlignez précisément la Caractéristique, l’Avantage et la Preuve.',
    // Chaque argument est découpé en passages ; `part` indique la composante
    // attendue (C, A, P) ou null pour les mots de liaison, neutres.
    arguments: [
      [
        { text: 'Grâce à', part: null },
        { text: 'la sauvegarde automatique toutes les 10 minutes,', part: 'C' },
        { text: 'vous ne perdez jamais vos données clients :', part: 'A' },
        { text: 'nos 5 000 PME clientes n’ont connu aucune perte en 2024.', part: 'P' }
      ],
      [
        { text: 'Avec', part: null },
        { text: 'l’accès mobile,', part: 'C' },
        { text: 'vos commerciaux travaillent depuis le terrain et gagnent près d’une heure par jour,', part: 'A' },
        { text: 'selon notre étude interne.', part: 'P' }
      ]
    ]
  },

  /* ── 1.3 · La fabrique à arguments ──────────────────────────────────── */
  '1.3': {
    eyebrow: 'Exercice 1.3 · Méthode CAP',
    title: 'La fabrique à arguments',
    prospect: ['PME · 12 salariés', 'Sans service informatique'],
    // Les cartes de la fiche produit. `kind` : C (caractéristique), P (preuve)
    // ou null (hors sujet). `needs` : les besoins auxquels elle répond.
    // `optional` : acceptée, mais absente de la liste des cartes attendues.
    // `note` : l'analyse du corrigé, affichée si la carte est déposée hors de
    // son besoin (informations pertinentes mais non prioritaires, à écarter).
    cards: [
      { id: 'aes', text: 'Chiffrement AES-256', symbol: 'lock', kind: 'C', needs: [0] },
      { id: 'backup', text: 'Sauvegarde toutes les 10 min', symbol: 'cloud', kind: 'C', needs: [0] },
      { id: 'rgpd', text: 'Conforme RGPD', symbol: 'document', kind: 'P', needs: [0] },
      { id: 'audit', text: 'Audit de sécurité annuel', symbol: 'award', kind: 'P', needs: [0] },
      { id: 'support', text: 'Assistance 7j/7', symbol: 'headset', kind: 'C', needs: [1] },
      { id: 'reply', text: 'Réponse moyenne : 2 min', symbol: 'chat', kind: 'P', needs: [1] },
      { id: 'access', text: 'Accès web + iOS + Android', symbol: 'smartphone', kind: 'C', needs: [], note: 'pertinente mais non prioritaire : utile si le client exprime un besoin de mobilité' },
      { id: 'csv', text: 'Import CSV inclus', symbol: 'document', kind: 'C', needs: [], note: 'pertinente mais non prioritaire : facilite la mise en place sans équipe informatique' },
      { id: 'price', text: 'À partir de 19 € / mois', symbol: 'coins', kind: 'C', needs: [2] },
      { id: 'free', text: 'Sans engagement', symbol: 'ban', kind: 'C', needs: [2] },
      { id: 'fixed', text: 'Tarif garanti 12 mois', symbol: 'tag', kind: 'P', needs: [2] },
      { id: 'pme', text: 'Plus de 5 000 PME', symbol: 'users', kind: 'P', needs: [0, 1, 2], optional: true },
      { id: 'size', text: 'Application : 45 Mo', symbol: 'smartphone', kind: null, needs: [], note: 'à écarter : ne répond à aucun besoin exprimé' },
      { id: 'logo', text: 'Interface bleue · logo 2023', symbol: 'palette', kind: null, needs: [], note: 'à écarter : sans lien avec les besoins du client' }
    ],
    needs: [
      {
        label: 'Sécuriser ses données',
        title: 'Sécuriser les données clients',
        symbol: 'shield',
        model: 'RelaCosy chiffre vos données et les sauvegarde automatiquement toutes les 10 minutes. Vous sécurisez ainsi vos informations clients et limitez les risques de perte. La solution est conforme au RGPD et sa sécurité est contrôlée chaque année par un organisme indépendant.'
      },
      {
        label: 'Fonctionner sans équipe technique',
        title: 'Fonctionner sans équipe technique',
        symbol: 'headset',
        model: 'Vous bénéficiez d’une assistance disponible 7 jours sur 7. Même sans service informatique interne, vous pouvez donc être accompagné rapidement en cas de difficulté. Le temps de réponse moyen de notre assistance est de 2 minutes.'
      },
      {
        label: 'Maîtriser son budget',
        title: 'Maîtriser son budget',
        symbol: 'coins',
        model: 'L’abonnement démarre à 19 € par mois et ne vous engage pas dans la durée. Vous maîtrisez ainsi votre investissement et conservez votre liberté. De plus, votre tarif est garanti pendant 12 mois.'
      }
    ],
    takeaway: 'Un argument n’est pas pertinent uniquement parce qu’il est vrai : il le devient lorsqu’il répond à un besoin du client. C’est au commercial de sélectionner et de hiérarchiser les informations, plutôt que de dérouler toute la fiche produit. Plusieurs formulations sont possibles, pourvu que chaque argument réponde à un besoin identifié et suive la logique Caractéristique, Avantage, Preuve.',
    hint: 'Une information vraie n’est utile que si elle répond au besoin.'
  },

  /* ── 1.4 · Le radar SONCAS ──────────────────────────────────────────── */
  '1.4': {
    eyebrow: 'Exercice · Méthode SONCAS',
    title: 'Le radar SONCAS',
    motives: [
      { id: 'S', label: 'Sécurité', symbol: 'shield', image: 'assets/illustrations/s1/soncas-securite.webp', tone: 'blue' },
      { id: 'O', label: 'Orgueil', symbol: 'crown', image: 'assets/illustrations/s1/soncas-orgueil.webp', tone: 'lilac' },
      { id: 'N', label: 'Nouveauté', symbol: 'rocket', image: 'assets/illustrations/s1/soncas-nouveaute.webp', tone: 'blue' },
      { id: 'C', label: 'Confort', symbol: 'armchair', image: 'assets/illustrations/s1/soncas-confort.webp', tone: 'blue' },
      { id: 'A', label: 'Argent', symbol: 'coins', image: 'assets/illustrations/s1/soncas-argent.webp', tone: 'gold' },
      { id: 'Sy', label: 'Sympathie', symbol: 'users', image: 'assets/illustrations/s1/soncas-sympathie.webp', tone: 'blue' }
    ],
    clients: [
      {
        label: 'Le dirigeant prudent',
        image: true,
        // Le propos est découpé en mots cliquables ; `clue: true` marque un indice.
        quote: [
          ['J’ai'], ['déjà'], ['été'], ['piraté', true], ['par'], ['le'], ['passé.'],
          ['Je'], ['ne'], ['veux'], ['surtout'], ['pas'], ['que'], ['cela'], ['se'], ['reproduise.', true],
          ['Avant'], ['de'], ['choisir'], ['une'], ['solution,'], ['je'], ['veux'], ['être'], ['certain', true],
          ['que'], ['mes'], ['données'], ['seront'], ['parfaitement'], ['protégées.', true]
        ],
        motive: 'S',
        arguments: [
          'Chiffrement des données et stricte conformité RGPD',
          'Tarif très accessible, à partir de 19 € / mois',
          'Sauvegarde automatique de toutes les données',
          'Abonnement 100 % sans engagement',
          'Interface moderne, esthétique et intuitive',
          'Accès multi-supports : ordinateur, smartphone, tablette'
        ],
        answers: [0, 2],
        model: 'Motivation dominante : S, Sécurité. Le client évoque un piratage subi, la protection de ses données et son besoin d’être rassuré sur la fiabilité de la solution. Le chiffrement avec la conformité RGPD et la sauvegarde automatique répondent directement à sa préoccupation : réduire les risques liés à la sécurité et à la perte de ses données. Les autres caractéristiques peuvent intéresser, mais ne répondent pas à sa motivation prioritaire.'
      },
      {
        label: 'Le client attentif au prix',
        image: false,
        quote: [
          ['Ce'], ['que'], ['je'], ['regarde'], ['d’abord,'], ['c’est'], ['le'], ['prix.', true],
          ['Je'], ['veux'], ['savoir'], ['précisément'], ['combien'], ['cela'], ['va'], ['me'], ['coûter', true],
          ['et'], ['je'], ['ne'], ['souhaite'], ['pas'], ['m’engager', true], ['sur'], ['la'], ['durée.', true]
        ],
        motive: 'A',
        arguments: [
          'Chiffrement des données et stricte conformité RGPD',
          'Tarif très accessible, à partir de 19 € / mois',
          'Sauvegarde automatique de toutes les données',
          'Abonnement 100 % sans engagement',
          'Interface moderne, esthétique et intuitive',
          'Accès multi-supports : ordinateur, smartphone, tablette'
        ],
        answers: [1, 3],
        model: 'Motivation dominante : A, Argent. Le client parle explicitement du prix, du coût de la solution et de son refus de s’engager dans la durée. Le tarif à partir de 19 € par mois lui permet d’évaluer immédiatement l’impact financier ; l’abonnement sans engagement réduit son risque, puisqu’il garde la liberté d’arrêter. Un même produit ne se présente pas de la même manière à tous les clients : on sélectionne les arguments qui ont le plus de valeur pour son interlocuteur.'
      }
    ]
  },

  /* ── 1.5 · Le tournoi des arguments ─────────────────────────────────── */
  '1.5': {
    eyebrow: 'Exercice · Hiérarchiser ses arguments',
    title: 'Le tournoi des arguments',
    quote: 'J’ai déjà été piraté. Je veux être certain que mes données seront parfaitement protégées.',
    contenders: {
      A: { text: 'Chiffrement des données et conformité RGPD', short: 'Chiffrement des données et conformité RGPD', tone: 'blue', image: 'assets/illustrations/s1/tournoi-chiffrement.webp' },
      B: { text: 'Interface moderne', short: 'Interface moderne', tone: 'red', image: 'assets/illustrations/s1/tournoi-interface.webp', bleed: true },
      C: { text: 'Sauvegarde automatique des données', short: 'Sauvegarde automatique des données', tone: 'green', image: 'assets/illustrations/s1/tournoi-sauvegarde.webp' },
      D: { text: 'Tarif accessible', short: 'Tarif accessible', tone: 'orange', image: 'assets/illustrations/s1/soncas-argent.webp' }
    },
    semis: [['A', 'B'], ['C', 'D']],
    expected: { semi1: 'A', semi2: 'C', final: 'A' },
    why: {
      semi1: 'Le chiffrement et la conformité RGPD répondent directement à la motivation Sécurité : ils apportent des éléments concrets sur la protection des données. L’interface moderne améliore l’expérience d’utilisation, mais ne répond pas à la préoccupation prioritaire de ce client.',
      semi2: 'La sauvegarde automatique contribue à sécuriser les données en limitant les conséquences d’une perte. Pour un client motivé par la sécurité, elle est plus pertinente que le tarif accessible.',
      final: 'Les deux arguments répondent à la motivation Sécurité, mais pas au même risque : le chiffrement protège du piratage et de l’accès non autorisé, la sauvegarde protège de la perte. Ce client a déjà subi un piratage : le chiffrement répond le plus directement à sa préoccupation.'
    },
    model: 'A, chiffrement et conformité RGPD : le client a déjà été piraté, cet argument répond précisément à la préoccupation exprimée. La sauvegarde automatique deviendrait prioritaire face à un client qui craint surtout la perte de ses données. Hiérarchiser, ce n’est pas seulement repérer les arguments qui correspondent à une motivation SONCAS : c’est déterminer lequel répond le plus précisément à ce que le client exprime.'
  },

  /* ── 1.6 · Construire puis réparer un mauvais argumentaire ──────────── */
  '1.6': {
    eyebrow: 'Exercice · Argumentation',
    title: 'Construire… puis réparer un mauvais argumentaire !',
    objective: 'Pour cet exercice, vous allez raisonner à l’envers. Vous commencerez par construire volontairement un argumentaire désastreux afin de mieux identifier les pièges à éviter, avant de le transformer en une proposition percutante.',
    context: 'Vous commercialisez RelaCosy, un logiciel CRM destiné aux PME. Lors de votre découverte, le client vous a exprimé 3 besoins prioritaires :',
    needs: ['Sécuriser ses données.', 'Être accompagné : il ne dispose d’aucun service informatique.', 'Maîtriser son budget.'],
    traps: [
      { name: 'Hors sujet', text: 'Parlez de ce qui n’intéresse pas le client : la couleur du logo, le poids de l’application, l’histoire de votre entreprise.' },
      { name: 'Jargon', text: 'Empilez les sigles sans les expliquer : SaaS multi-tenant, API REST, AES-256, SSO, BI.' },
      { name: 'Catalogue', text: 'Récitez toutes les fonctions du logiciel, sans en relier aucune au client.' },
      { name: 'Besoins ignorés', text: 'Ne dites pas un mot de la sécurité, de l’accompagnement ni du budget.' },
      { name: 'Ton hésitant', text: 'Ponctuez chaque phrase de « je pense », « peut-être », « normalement ».' },
      { name: 'Affirmation gratuite', text: 'Concluez par « c’est forcément la meilleure solution », sans la moindre preuve.' }
    ],
    commonErrors: [
      'Parler du produit au lieu du client : des caractéristiques sans bénéfice.',
      'Employer un jargon technique que le client ne comprend pas.',
      'Ignorer les besoins exprimés lors de la découverte.',
      'Affirmer sans prouver : aucune donnée chiffrée, aucun témoignage.',
      'Noyer le client sous une liste interminable de fonctions.',
      'Adopter un ton hésitant ou, à l’inverse, péremptoire.'
    ],
    worstExample: 'RelaCosy pèse seulement 45 Mo, possède une interface bleue, fonctionne sur iOS et Android et son logo a été modernisé en 2023. C’est clairement le meilleur CRM pour votre entreprise !',
    // Les trois erreurs relevées par le corrigé dans l'exemple ci-dessus.
    worstErrors: [
      'Les arguments sont mal ciblés : le poids de l’application, sa couleur ou son logo ne répondent ni au besoin de sécurité, ni au manque de ressources informatiques, ni à la contrainte budgétaire.',
      'Les bénéfices client ne sont pas explicités : le commercial énumère des caractéristiques sans dire ce qu’elles apportent à cette PME.',
      '« C’est le meilleur CRM » n’est pas démontré : aucune preuve, et la crédibilité du discours en pâtit.'
    ],
    model: 'Pour sécuriser vos données clients, RelaCosy utilise un chiffrement AES-256 et réalise des sauvegardes automatiques toutes les 10 minutes. La solution est conforme au RGPD. Comme vous ne disposez pas de service informatique, vous bénéficiez également d’une assistance 7j/7, avec un temps de réponse moyen de 2 minutes. Enfin, l’abonnement démarre à 19 € par mois, sans engagement : vous pouvez ainsi maîtriser votre budget tout en conservant de la souplesse.',
    takeaway: 'Un argumentaire efficace n’accumule pas les caractéristiques du produit : il part des besoins du client, puis sélectionne, traduit et hiérarchise les arguments qui y répondent. Ici, les trois priorités donnent le fil conducteur : sécurité, accompagnement, budget.'
  }
};
