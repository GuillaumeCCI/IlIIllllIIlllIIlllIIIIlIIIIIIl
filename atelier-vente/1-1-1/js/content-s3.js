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
      { id: 'A', text: 'Ce n’est pas si cher, c’est simplement le prix normal pour ce niveau de qualité. Nos équipements justifient pleinement ce positionnement sur le marché. Cependant, je vois que vous hésitez, alors pour vous aider à vous décider aujourd’hui, je peux exceptionnellement vous accorder une remise immédiate de 10 %.' },
      { id: 'B', text: 'Je comprends, c’est un budget. Par rapport à quoi trouvez-vous le prix élevé : une autre offre ou une enveloppe prévue ? Si je comprends bien, vous voulez être sûr que l’investissement en vaut la peine. Nos clients constatent une baisse des arrêts liés aux TMS, et l’essai de 30 jours vous permet de vérifier sans risque. Est-ce que cela répond à votre préoccupation ?' }
    ],
    answer: 'B',
    feedback: 'Vous pouviez écrire : « La réponse B est la plus juste. Elle accueille l’objection, creuse avec “par rapport à quoi ?”, reformule, apporte une preuve (moins d’arrêts de travail, un essai de 30 jours) et vérifie que le client est d’accord. La réponse A le contredit, ne cherche pas à comprendre et accorde tout de suite une remise : elle affaiblit la valeur au lieu de traiter l’objection. »'
  },

  /* ── 1.6 · Construisez votre traitement complet ───────────────────────── */
  '1.6': {
    eyebrow: 'Gestion des objections',
    title: 'Construisez votre traitement complet',
    intro: 'Répondez à l’objection en 6 étapes, une phrase à la fois.',
    feedback: 'Relisez votre traitement d’un seul tenant, à voix haute. Vérifiez que l’accueil ne contredit pas le client, que votre question ne suggère pas la réponse, que la reformulation reprend bien ses mots, que le traitement apporte une preuve plutôt qu’une promesse, que le contrôle laisse une vraie place à sa réponse et que l’enchaînement propose une suite précise.',
    /* Six contextes, un par secteur. Chacun : qui vous êtes, le client, où
     * en est l'échange, l'objection, vos atouts (de quoi prouver à l'étape
     * « Traiter », mêlés à des arguments hors sujet, `horsSujet`, à écarter),
     * un corrigé type par étape, et les mots propres au cas
     * que l'indicateur de points recherche (js/grilles.js) :
     * `sujet` (la bonne question), `reprise` (les mots du client à
     * reformuler), `preuve` (les atouts cités), `suite` (la proposition),
     * `horsSujet` (un argument hors sujet repris : il coûte un point).
     * Le premier contexte reprend le cas de la fiche (Ergolys). */
    cases: [
      {
        label: 'Mobilier de bureau',
        vous: 'Commercial chez Ergolys, qui vend des sièges de bureau ergonomiques aux entreprises.',
        client: 'Sophie Marchal, gérante d’un cabinet comptable de 40 salariés.',
        situation: 'Premier rendez-vous dans son bureau. Elle vous écoute poliment, puis coupe court.',
        objection: 'Nos chaises actuelles suffisent.',
        atouts: [
          'Chez nos clients, les arrêts de travail pour mal de dos ont baissé.',
          'Nous proposons un diagnostic gratuit de 2 ou 3 postes de travail.',
          'La cliente peut essayer les sièges gratuitement pendant 30 jours, et être remboursée si elle n’est pas satisfaite.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'Nos sièges existent en 12 coloris.',
          'La livraison est gratuite à partir de 10 sièges.',
          'Notre salle d’exposition est ouverte le samedi.'
        ],
        model: [
          'Je comprends : si personne ne se plaint, la question ne se pose pas tous les jours.',
          'Vous arrive-t-il d’avoir des salariés gênés par le dos, ou des arrêts de ce type ?',
          'Si je comprends bien, vous préférez éviter de dépenser tant que ce n’est pas un vrai problème.',
          'C’est justement l’objectif : éviter les douleurs de dos avant qu’elles ne deviennent des arrêts. Chez nos clients, ces arrêts ont baissé, et le diagnostic ne porte que sur les postes à risque.',
          'Est-ce que cette idée de prévention vous parle ?',
          'Je vous propose un diagnostic gratuit de 2 ou 3 postes, pour vérifier ensemble s’il y a un vrai besoin.'
        ],
        mots: {
          sujet: ['salariés', 'collaborateurs', 'équipes', 'dos', 'arrêts', 'plaintes', 'douleurs', 'confort', 'inconfort', 'gênés', 'absences', 'tms', 'fatigue', 'postes', 'fin de journée', 'se sentent', 'mal', 'douleur', 'assis', 'journée', 'plaignent', 'plaint', 'santé', 'bien-être', 'confortables', 'usées', 'âge', 'combien de temps', 'posture', 'télétravail'],
          reprise: ['suffisent', 'actuelles', 'chaises', 'dépenser', 'vrai problème', 'satisfait', 'fonctionnent', 'pas de besoin', 'pas nécessaire', 'convient', 'personne ne se plaint', 'plaint', 'changer', 'raison de changer', 'font le travail', 'suffit', 'en bon état', 'pas utile', 'pas la peine', 'besoin', 'pas prioritaire'],
          preuve: ['douleurs', 'mal de dos', 'tms', 'arrêts', 'absences', 'baisse', 'prévenir', 'prévention', 'clients constatent', 'étude', 'ergonom*', 'garantie', '5 ans', 'essai', '30 jours', 'remboursé', '1 200', '1200', 'entreprises équipées', 'diagnostic', 'garantis', 'tester', 'testez', 'diminué', 'moins d’arrêts', 'entreprises', 'santé'],
          suite: ['diagnostic', 'gratuit', '2 ou 3 postes', 'deux ou trois postes', 'objectiver', 'essai', 'visite', 'passer', 'tester', 'semaine prochaine', 'passer', 'deux ou trois', 'vérifier', 'mesurer', 'regarder ensemble'],
          horsSujet: ['coloris', 'couleurs', 'livraison', 'livré', 'salle d’exposition', 'exposition', 'showroom']
        }
      },
      {
        label: 'Immobilier',
        vous: 'Conseiller à l’agence Horizon Immobilier. Vous voulez que ce couple vous confie la vente de sa maison.',
        client: 'M. et Mme Roche, qui vendent leur maison familiale pour se rapprocher de leurs enfants.',
        situation: 'Vous venez de leur présenter votre estimation et votre offre de service, autour de la table du salon.',
        objection: 'Vos honoraires sont trop élevés, une autre agence nous propose 3 %.',
        atouts: [
          'Avec notre agence, une maison se vend en 45 jours en moyenne ; dans le secteur, il en faut 90.',
          '92 % des maisons que nous vendons partent au prix affiché, ou presque.',
          'Plus de 300 personnes prêtes à acheter sont inscrites dans notre fichier.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'L’agence est ouverte 6 jours sur 7.',
          'Un parking est réservé aux clients devant l’agence.',
          'Notre agence a ouvert ses portes en 1998.'
        ],
        model: [
          'Je comprends, les honoraires représentent une vraie somme sur une vente comme la vôtre.',
          'Qu’est-ce qui compte le plus pour vous dans cette vente : le prix final, le délai, ou les frais ?',
          'Si je comprends bien, vous voulez être sûrs que ce que vous payez se retrouve dans le prix que vous touchez au final.',
          'Nos maisons se vendent en 45 jours en moyenne, et 92 % au prix affiché : si votre maison se vend seulement 2 % plus cher, la différence d’honoraires est largement couverte.',
          'Est-ce que cette façon de faire le calcul vous parle ?',
          'Je vous propose de comparer les deux offres sur ce qu’il vous restera vraiment après la vente, samedi matin ici même.'
        ],
        mots: {
          sujet: ['prix final', 'prix de vente', 'délai', 'frais', 'compte le plus', 'priorité', 'important pour vous', 'autre agence', '3 %', 'comparé', 'net vendeur', 'attendez', 'vendre vite', 'meilleur prix', 'attentes', 'vite', 'prix', 'calendrier', 'déménagement', 'quand', 'objectif', 'combien'],
          reprise: ['honoraires', 'frais', 'payez', 'payer', 'coût', 'commission', 'trop élevés', 'autre agence', 'prix', 'touchez', 'net', 'valent', 'coûtent', 'cher', 'trop', 'comparer', 'agences', 'moins cher', 'économiser', 'valoir', 'rentable'],
          preuve: ['45 jours', 'délai', '90 jours', '92 %', 'prix affiché', 'prix du mandat', 'plus cher', 'écart', 'photos', 'visite virtuelle', 'acheteurs', 'acquéreurs', 'fichier', '300', 'compte rendu', 'net vendeur', 'négociation', 'estimation', 'moyenne', 'ailleurs', 'photographe', 'visite virtuelle', '300 personnes', 'différence', 'vendue', 'vendues', 'rapidement'],
          suite: ['samedi', 'comparer', 'net vendeur', 'chiffres en main', 'rendez-vous', 'mandat', 'signer', 'revenir', 'date', 'proposition écrite', 'comparaison écrite', 'comparaison', 'revenir', 'estimation', 'confier', 'reste'],
          horsSujet: ['6 jours sur 7', 'ouverte', 'parking', '1998', 'ouvert ses portes', 'depuis 1998']
        }
      },
      {
        label: 'Assurance des pros',
        vous: 'Conseillère chez Novéa, qui assure les artisans : leur atelier, leur matériel, et leurs revenus en cas de coup dur.',
        client: 'Karim Benali, plombier à son compte depuis 8 ans, avec un apprenti.',
        situation: 'Vous l’appelez après sa demande de rappel sur le site. Il décroche entre deux chantiers.',
        objection: 'Je suis déjà assuré ailleurs, ça me va très bien.',
        atouts: [
          'Nous comparons gratuitement son contrat actuel au nôtre, en 20 minutes.',
          'Si un sinistre l’empêche de travailler, notre contrat continue de lui verser un revenu.',
          'Trois artisans sur quatre n’ont aucune garantie qui leur verse un revenu pendant un arrêt.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'Nos bureaux sont situés en centre-ville.',
          'Nous assurons aussi les voitures des particuliers.',
          'Notre site internet a été entièrement refait cette année.'
        ],
        model: [
          'Très bien, c’est important d’être couvert quand on travaille chez les autres.',
          'Si demain un dégât des eaux vous immobilise un mois, savez-vous ce que votre contrat vous verse ?',
          'Si je vous suis bien, vous êtes satisfait de votre assureur et vous ne voulez pas tout changer pour rien.',
          'Justement, je ne vous propose pas de changer à l’aveugle : en 20 minutes, je compare votre contrat au nôtre, en particulier ce qui vous est versé si vous ne pouvez plus travailler, une garantie qui manque à trois artisans sur quatre.',
          'Cette comparaison vous semble utile ?',
          'Je vous propose de passer jeudi en fin de journée avec votre contrat actuel, et vous déciderez ensuite.'
        ],
        mots: {
          sujet: ['contrat', 'couvert', 'couverture', 'garanties', 'perte d’exploitation', 'arrêt', 'sinistre', 'dégât', 'immobilise', 'chantier', 'verse', 'rembourse', 'franchise', 'arrêt de travail', 'revenus', 'revenu', 'accident', 'empêche de travailler', 'travailler', 'un mois', 'que se passe', 'couvre', 'si demain', 'arrêté', 'malade'],
          reprise: ['déjà assuré', 'satisfait', 'ça vous va', 'changer', 'assureur', 'contrat actuel', 'content', 'pas besoin', 'content', 'envie de tout changer', 'pas envie', 'bien couvert', 'déjà couvert', 'tranquille', 'ailleurs'],
          preuve: ['comparer', 'comparaison', '20 minutes', 'gratuit', 'perte d’exploitation', 'revenu', 'revenus', 'versé', 'ne pouvez plus travailler', 'remboursé', 'assistance', '24 h', '24 heures', 'indemnis*', '10 jours', 'artisans', 'trois sur quatre', '3 sur 4', 'touchez', 'pendant l’arrêt', 'jour et nuit', 'artisans', 'gratuitement', 'remboursé'],
          suite: ['jeudi', 'passer', 'rendez-vous', 'contrat actuel', 'comparer', 'comparaison', 'date', 'créneau', 'fin de journée', 'rappeler', 'jeudi soir', 'se voir', 'on peut se voir', 'votre contrat'],
          horsSujet: ['centre-ville', 'bureaux', 'voitures', 'voiture', 'particuliers', 'site internet', 'refait']
        }
      },
      {
        label: 'Logiciel de gestion',
        vous: 'Commerciale chez Planeo, un logiciel de devis et de factures pour les petites entreprises.',
        client: 'Nathalie Vidal, gérante d’une entreprise de paysagisme de 8 salariés.',
        situation: 'Démonstration en visio de 30 minutes. Elle trouve l’outil clair, mais regarde l’heure.',
        objection: 'Je n’ai pas le temps de changer d’outil en ce moment.',
        atouts: [
          'Nos équipes transfèrent elles-mêmes ses devis, ses factures et ses clients dans le logiciel.',
          'Le logiciel est prêt à l’emploi en 2 heures.',
          'Nos clients gagnent en moyenne 4 heures par semaine sur leurs devis et leurs factures.',
          'Elle peut l’essayer gratuitement pendant 14 jours, sans engagement.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'Le logiciel existe en 5 langues.',
          'Les couleurs de l’écran sont personnalisables.',
          'Notre entreprise compte 40 salariés.'
        ],
        model: [
          'Je comprends, la saison doit être chargée, et changer d’outil fait peur quand on court déjà.',
          'Combien de temps passez-vous aujourd’hui chaque semaine sur vos devis et vos factures ?',
          'Si je comprends bien, vous craignez que le changement vous prenne plus de temps qu’il ne vous en fait gagner.',
          'C’est pour ça que nos équipes transfèrent vos données elles-mêmes : le logiciel est prêt en 2 heures, et nos clients gagnent en moyenne 4 heures par semaine.',
          'Est-ce que cela répond à votre crainte sur le temps ?',
          'Je vous propose d’ouvrir l’essai gratuit aujourd’hui, et de fixer votre heure de formation mardi prochain.'
        ],
        mots: {
          sujet: ['temps', 'heures', 'semaine', 'devis', 'factures', 'administratif', 'combien', 'aujourd’hui', 'outil actuel', 'saison', 'soirées', 'week-end', 'heures par semaine', 'combien de temps', 'temps passé', 'soir', 'paperasse', 'facturation'],
          reprise: ['pas le temps', 'changer', 'changement', 'crainte', 'craignez', 'perdre du temps', 'chargée', 'en ce moment', 'outil', 'peur', 'perdre du temps', 'beaucoup de travail', 'débordée', 'pas le moment', 'changer d’outil', 'surchargée', 'trop de travail'],
          preuve: ['transfèrent', 'transfert', 'prêt', 'reprise', 'données', '2 heures', 'deux heures', 'mise en route', 'prise en main', 'formation', '4 heures', 'quatre heures', 'gagnent', 'essai', '14 jours', 'sans engagement', 'nos clients', 'transférer', 'quatre heures', 'deux heures', 'prête', 'facile', 'simple'],
          suite: ['essai', '14 jours', 'formation', 'prise en main', 'mardi', 'semaine prochaine', 'rendez-vous', 'visio', 'date', 'créneau', 'ouvrir', 'aujourd’hui', 'mardi', 'je vous ouvre', 'dès aujourd’hui', 'commencer'],
          horsSujet: ['5 langues', 'langues', 'couleurs', 'personnalis*', '40 salariés']
        }
      },
      {
        label: 'Vélo électrique',
        vous: 'Vendeur chez Cycles Martin, un magasin de vélos en centre-ville.',
        client: 'Paul, 52 ans, qui veut aller au travail à vélo : 12 km par jour, aller-retour.',
        situation: 'Il vient d’essayer un modèle à 2 400 € sur le parking du magasin. Il a aimé, mais il hésite.',
        objection: '2 400 €, c’est trop cher pour un vélo.',
        atouts: [
          'Sur son trajet, il économisera environ 80 € par mois d’essence et de stationnement.',
          'La ville lui verse une prime de 300 € à l’achat.',
          'Il peut payer en 4 fois, sans frais.',
          'Il peut garder le vélo une journée pour l’essayer sur son vrai trajet.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'Le vélo existe en trois couleurs.',
          'Le cadre est fabriqué en aluminium.',
          'Le magasin vend aussi des casques et des antivols.'
        ],
        model: [
          'Je comprends, c’est une vraie somme pour un vélo.',
          'Par rapport à quoi le trouvez-vous cher : un autre modèle, ou le budget que vous aviez prévu ?',
          'Si je comprends bien, vous voulez être sûr que cet achat se rembourse vraiment sur vos trajets.',
          'Sur vos 12 km par jour, vous économisez environ 80 € par mois d’essence et de stationnement ; avec la prime de la ville de 300 € et le paiement en 4 fois, le vélo est remboursé en deux ans environ.',
          'Est-ce que ce calcul vous rassure ?',
          'Je vous propose de le garder une journée pour faire votre vrai trajet, et vous me direz ce que vous en pensez.'
        ],
        mots: {
          sujet: ['par rapport à quoi', 'budget', 'prévu', 'autre modèle', 'compar*', 'trajet', 'km', 'utilisation', 'combien', 'voiture', 'comparez', 'comparer', 'autre vélo', 'fixé', 'combien', 'trajets'],
          reprise: ['cher', 'prix', 'somme', 'budget', 'rentable', 'rembourse', 'investissement', '2 400', 'vaut son prix', 'dépense', 'petite dépense', 'certain', 'sûr', 'vaut le coup', 'valoir'],
          preuve: ['80 €', '80 euros', 'essence', 'stationnement', 'parking', 'économ*', 'prime', '300', '4 fois', 'quatre fois', 'sans frais', 'garantie', 'batterie', '5 ans', 'révision', 'rentabilis*', 'par mois', 'euros', 'économiser', 'ville', 'essence', 'remboursé'],
          suite: ['journée', 'essai', 'essayer', 'garder', 'trajet', 'réserver', 'samedi', 'demain', 'date', 'prêt', 'prenez-le', 'demain', 'on en reparle', 'votre trajet'],
          horsSujet: ['trois couleurs', 'couleurs', 'coloris', 'aluminium', 'cadre', 'casques', 'casque', 'antivols', 'antivol']
        }
      },
      {
        label: 'Décoration intérieure',
        vous: 'Conseillère à l’Atelier Teinte, une agence de décoration intérieure.',
        client: 'Claire, qui veut refaire son salon : peinture, rideaux, un canapé.',
        situation: 'Vous lui avez présenté un projet complet et son devis de 6 800 €. Elle a l’air séduite.',
        objection: 'Il faut que j’en parle à mon conjoint avant de décider.',
        atouts: [
          'Nous offrons une image en 3D de son futur salon.',
          'Elle peut emporter des échantillons de tissus et de peinture.',
          'Le devis reste valable 30 jours.',
          'Nous pouvons la recevoir un samedi, avec son conjoint.'
        ],
        // Vrais, mais sans rapport avec l'objection : l'apprenant doit les écarter.
        horsSujet: [
          'Nous travaillons avec plus de 50 fournisseurs de tissus.',
          'L’agence a reçu un prix de décoration en 2023.',
          'Nos poseurs interviennent dans toute la région.'
        ],
        model: [
          'Bien sûr, c’est un projet pour toute la maison, c’est normal de décider à deux.',
          'Qu’est-ce qui comptera le plus pour lui : le budget, le style, ou la durée des travaux ?',
          'Si je comprends bien, vous voulez qu’il adhère au projet autant que vous avant de vous engager.',
          'Pour l’aider à se projeter, je vous prépare une image en 3D de votre futur salon et je vous confie les échantillons ; le devis reste valable 30 jours.',
          'Est-ce que cela vous aiderait pour en parler ensemble ?',
          'Je vous propose de revenir tous les deux samedi à 10 h : je vous présente l’image en 3D et on ajuste ensemble.'
        ],
        mots: {
          sujet: ['conjoint', 'mari', 'femme', 'compagnon', 'compagne', 'comptera', 'budget', 'style', 'durée', 'délai', 'travaux', 'important pour lui', 'avis', 'goûts', 'préférences', 'important pour votre conjoint', 'son avis', 'ce qu’il aime', 'ce qu’elle aime', 'son goût', 'ses goûts', 'qu’est-ce qui'],
          reprise: ['conjoint', 'à deux', 'ensemble', 'décider', 'adhère', 'avis', 'd’accord', 'engager', 'en parler', 'd’accord avec le projet', 'signer', 'décider ensemble', 'son accord', 'lui en parler', 'tous les deux'],
          preuve: ['image', 'futur salon', 'planche', '3d', 'ambiance', 'échantillons', 'devis', '30 jours', 'valable', 'visuel', 'projeter', 'photos', 'réalisations', 'acompte', '30 %', 'image en 3d', 'emportez', 'emporter', 'montrer', 'voir le résultat'],
          suite: ['samedi', 'revenir', 'tous les deux', 'rendez-vous', '10 h', 'présente', 'date', 'venir ensemble', 'ajuster', 'venez', 'samedi matin', 'montrerai', 'montrer', 'ensemble'],
          horsSujet: ['50 fournisseurs', 'fournisseurs', 'prix de décoration', '2023', 'poseurs', 'toute la région', 'région']
        }
      }
    ]
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
        // Pourquoi cette nature, puis une question et une réponse possibles.
        why: 'Elle est fondée : elle dépend de la façon dont l’entreprise prend ses décisions.',
        question: 'Vous pouviez écrire : « Qu’est-ce qui compterait le plus pour votre direction ? »',
        reply: 'Vous pouviez écrire : « Je vous prépare un dossier chiffré pour votre direction, et je peux venir le présenter avec vous en quelques minutes. »'
      },
      {
        objection: 'C’est trop cher.',
        answer: 'fondee',
        why: 'Elle est fondée : le prix est un vrai critère pour le client.',
        question: 'Vous pouviez écrire : « Par rapport à quoi trouvez-vous le prix élevé ? »',
        reply: 'Vous pouviez écrire : « Nos sièges sont garantis 5 ans, et vous pouvez les essayer 30 jours. La location est aussi possible, pour étaler le budget. »'
      },
      {
        objection: 'J’ai été déçu par un fournisseur.',
        answer: 'rassurance',
        why: 'C’est une demande de réassurance : le client veut être sûr que cela ne se reproduira pas.',
        question: 'Vous pouviez écrire : « Qu’est-ce qui s’était mal passé avec ce fournisseur ? »',
        reply: 'Vous pouviez écrire : « Nos sièges sont garantis 5 ans, notre service après-vente intervient sous 48 h, et vous pouvez les essayer 30 jours, satisfait ou remboursé. Plus de 1 200 entreprises sont déjà équipées. »'
      },
      {
        objection: 'Nos chaises actuelles suffisent.',
        answer: 'pretexte',
        why: 'C’est un prétexte : le client préfère ne rien changer.',
        question: 'Vous pouviez écrire : « Avez-vous des salariés gênés par le dos ? »',
        reply: 'Vous pouviez écrire : « Nos clients constatent une baisse des arrêts liés au mal de dos. Je vous propose un diagnostic gratuit de vos postes de travail. »'
      }
    ]
  }
};
