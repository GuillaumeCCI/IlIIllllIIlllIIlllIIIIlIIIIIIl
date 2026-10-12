/* SÉRIE 5 · MANIPULATION · contenus éditables.
 *
 * Huit exercices courts qui reprennent les quatre thèmes du module : annoncer
 * le prix (1.x), défendre la valeur (2.x), conclure (3.x), relancer (4.x).
 * Textes des maquettes repris tels quels. Les cartes que les maquettes ne
 * montrent pas et les corrigés viennent de la fiche « Activités, Présenter le
 * prix et conclure la vente » (M1.1.4), transposée au vouvoiement.
 */
window.ATELIER_S5 = {
  /* ── 1.1 · Annoncer le prix avec assurance ──────────────────────────── */
  '1.1': {
    eyebrow: 'Exercice 1.1 · Prix',
    title: 'Annoncer le prix avec assurance',
    subtitle: 'Cette annonce suit-elle la méthode du sandwich ?',
    cardLabel: 'Phrase',
    cardsLabel: 'phrases',
    letters: true,
    zones: [
      { id: 'sandwich', label: 'Sandwich', sub: 'Le prix est encadré par de la valeur.', symbol: 'check', tone: 'good' },
      { id: 'revoir', label: 'À revoir', sub: 'L’annonce peut être améliorée.', symbol: 'pencil', tone: 'bad' }
    ],
    confirmLabel: 'Enregistrer et passer à la phrase suivante',
    cards: [
      { text: '« Ça fait 2 400 €. »', answer: 'revoir', why: 'Le prix est annoncé seul : aucun bénéfice ne vient rappeler la valeur de l’offre.' },
      { text: '« Pour un accompagnement complet sur l’année, avec la garantie et le suivi, l’investissement est de 2 400 €, et vous êtes tranquille pendant 12 mois. »', answer: 'sandwich', why: 'Le prix est encadré par la valeur : accompagnement, garantie et suivi avant le prix, puis tranquillité pendant 12 mois après.' },
      { text: '« C’est 2 400 €… mais bon, on peut voir. »', answer: 'revoir', why: 'Aucun bénéfice, et « mais bon, on peut voir » donne aussitôt l’impression qu’il faut justifier ou négocier le prix.' },
      { text: '« Cette formule vous fait gagner du temps chaque semaine : elle est à 2 400 €, soit moins de 7 € par jour pour bénéficier de l’ensemble du service. »', answer: 'sandwich', why: 'Le bénéfice est rappelé avant le prix, puis celui-ci est remis en perspective au regard du service proposé.' }
    ],
    keyPoint: 'À retenir : une annonce de prix efficace rappelle la valeur, annonce clairement le prix, puis le reconnecte à un bénéfice ou ouvre sur la suite.'
  },

  /* ── 1.2 · À vous d'annoncer le prix ────────────────────────────────── */
  '1.2': {
    eyebrow: 'Annoncer le prix · Exercice 1.2',
    title: 'À vous d’annoncer le prix',
    subtitle: 'Composez votre réponse au client en trois temps.',
    scene: [
      { quote: 'Très bien, et combien coûte cette solution ?', speaker: 'Le client' },
      { info: 'Prix de l’offre · 2 400 €', symbol: 'tag' },
      { facts: [
        { symbol: 'check', strong: '1.', text: 'Rappelez un bénéfice important pour le client.' },
        { symbol: 'check', strong: '2.', text: 'Annoncez clairement le prix de 2 400 €, sans hésitation ni justification excessive.' },
        { symbol: 'check', strong: '3.', text: 'Terminez par un bénéfice complémentaire ou une ouverture vers la suite.' }
      ], title: 'Votre mission' }
    ],
    cases: [
      { tab: 'Votre réponse', fields: [
        { id: 'text', label: 'Votre réponse', placeholder: 'Écrivez ici ce que vous diriez au client…', rows: 5,
          model: 'Cette solution vous permet d’avoir un accompagnement complet tout au long de l’année, avec le suivi et la garantie inclus. L’investissement est de 2 400 €. Vous bénéficiez ainsi de l’ensemble du service pendant 12 mois, sans coût supplémentaire à prévoir.' }
      ] }
    ],
    keyPoint: 'Le bon réflexe : le prix ne s’excuse pas. Il s’annonce clairement, en cohérence avec la valeur que vous venez de démontrer, puis on se tait pour laisser le client réagir.',
    submitLabel: 'Valider ma formulation',
    feedback: 'Votre réponse suit-elle bien les trois temps : bénéfice, prix, ouverture ?'
  },

  /* ── 2.1 · Valoriser ou brader ? ────────────────────────────────────── */
  '2.1': {
    eyebrow: 'Défendre la valeur · Exercice 2.1',
    title: 'Valoriser ou brader ?',
    subtitle: 'Classez chaque réponse du commercial au client qui dit : « C’est trop cher. »',
    cardLabel: 'Réplique',
    cardsLabel: 'répliques',
    letters: true,
    question: 'Quelle stratégie utilise le commercial ?',
    legend: [
      { label: 'Valoriser', text: 'explorer l’objection ou rappeler la valeur' },
      { label: 'Négocier', text: 'discuter d’un ajustement du prix' }
    ],
    zones: [
      { id: 'valoriser', label: 'Valoriser', symbol: 'award', tone: 'good' },
      { id: 'negocier', label: 'Négocier', symbol: 'coins', tone: 'bad' }
    ],
    confirmLabel: 'Enregistrer et continuer',
    cards: [
      { text: '« Je peux vous faire 10 % de remise. »', answer: 'negocier', why: 'La remise arrive avant même d’avoir compris ce qui se cache derrière « trop cher » : le prix est fragilisé, on entre en négociation.' },
      { text: '« Quand vous dites que le prix vous paraît élevé, par rapport à quoi le comparez-vous ? »', answer: 'valoriser', why: 'On cherche le point de comparaison du client (budget, concurrent, montant imaginé) pour adapter l’argumentation.' },
      { text: '« Ce prix comprend la livraison, la garantie et le suivi pendant 12 mois. Vous avez donc un coût global, sans prestation complémentaire à ajouter. »', answer: 'valoriser', why: 'On rappelle concrètement ce que comprend le prix : le client évalue l’offre dans sa globalité.' },
      { text: '« Quel budget aviez-vous prévu pour ce projet ? »', answer: 'negocier', why: 'Utile à un autre moment, mais juste après « c’est trop cher », la question déplace la discussion vers le montant que le client est prêt à payer.' },
      { text: '« Si on le ramène à la durée d’utilisation prévue, l’investissement représente moins de 7 € par jour. »', answer: 'valoriser', why: 'Le prix reste inchangé, mais il est remis en perspective par la durée d’utilisation.' }
    ],
    keyPoint: 'À retenir : face à « c’est trop cher », ne cherchez pas immédiatement à faire baisser le prix. Comprenez d’abord ce que signifie l’objection, puis aidez le client à mettre en regard le prix et la valeur obtenue.'
  },

  /* ── 2.2 · Défendre le prix ─────────────────────────────────────────── */
  '2.2': {
    eyebrow: 'Défendre la valeur · Exercice 2.2',
    title: 'Défendre le prix',
    subtitle: 'Votre défi : maintenir le prix sans remise immédiate.',
    scene: [
      { image: 'assets/illustrations/s5/1-1-4-S5-i2-2.png', alt: 'Une cliente lit un devis, songeuse : « C’est plus cher que ce que je pensais… »' },
      { facts: [
        { symbol: 'chat', strong: 'Comprendre :', text: 'accueillez et précisez ce qui semble élevé.' },
        { symbol: 'award', strong: 'Valoriser :', text: 'citez 1 ou 2 faits concrets de l’offre.' },
        { symbol: 'chart', strong: 'Perspective :', text: 'décomposez le prix ou comparez.' }
      ], title: 'Votre défi' }
    ],
    cases: [
      { tab: 'À vous de répondre', fields: [
        { id: 'text', label: 'À vous de répondre', sub: 'Rédigez ce que vous diriez à la cliente.', placeholder: 'Ce que vous diriez…', rows: 6,
          model: 'Je comprends. Quand vous dites que c’est plus cher que prévu, est-ce par rapport au budget que vous aviez envisagé ou à une autre solution ? Dans le montant proposé, l’accompagnement, la livraison, la garantie et le suivi pendant 12 mois sont inclus : vous n’avez pas de prestation complémentaire à ajouter. Si l’on rapporte l’investissement à l’année, cela représente moins de 7 € par jour pour bénéficier de l’ensemble du service.' }
      ] }
    ],
    keyPoint: 'Le bon réflexe : défendre son prix, ce n’est pas se justifier. C’est aider le client à comprendre ce qu’il obtient en contrepartie de son investissement.',
    submitLabel: 'Valider ma réponse',
    feedback: 'Votre réponse comprend-elle, valorise-t-elle et met-elle le prix en perspective, sans remise ?'
  },

  /* ── 3.1 · Signal d'achat ou pas ? ──────────────────────────────────── */
  '3.1': {
    eyebrow: 'Conclure la vente · Exercice 3.1',
    title: 'Signal d’achat ou pas ?',
    subtitle: 'Observez chaque réaction avant de décider.',
    cardLabel: 'Réaction',
    cardsLabel: 'réactions',
    letters: true,
    symbol: 'search',
    question: 'Quel signal percevez-vous ?',
    legend: [
      { label: 'Signal d’achat', text: 'le client se projette dans la suite' },
      { label: 'Signal de recul / frein', text: 'un doute subsiste' }
    ],
    zones: [
      { id: 'achat', label: 'Signal d’achat', symbol: 'check', tone: 'good' },
      { id: 'recul', label: 'Signal de recul / frein', symbol: 'close', tone: 'bad' }
    ],
    confirmLabel: 'Enregistrer et continuer',
    cards: [
      { text: '« Et la livraison, ça prend combien de temps ? »', answer: 'achat', why: 'Le client ne questionne plus l’intérêt de l’offre : il s’intéresse aux modalités concrètes de sa mise en œuvre.' },
      { text: '« Il faudrait que je réfléchisse encore. »', answer: 'recul', why: 'Le client n’est pas prêt : avant de conclure, cherchez ce qui nourrit encore son hésitation.' },
      { text: '« Si je prends la formule complète, le suivi est inclus ? »', answer: 'achat', why: 'Le « si je prends… » est révélateur : le client se projette dans le choix d’une formule.' },
      { text: '« Je ne suis pas sûr que ce soit vraiment adapté à ma situation. »', answer: 'recul', why: 'Un doute persiste sur l’adéquation entre l’offre et le besoin : traitez-le avant de conclure.' },
      { text: '« Si on valide cette semaine, on pourrait démarrer quand ? »', answer: 'achat', why: 'Le client se projette dans le démarrage et évoque une validation : un signal fort.' },
      { text: 'Le client reprend la proposition commerciale et vérifie attentivement les modalités de livraison.', answer: 'achat', why: 'Les signaux ne sont pas uniquement verbaux : revenir sur des modalités concrètes montre qu’il envisage la suite.' }
    ],
    keyPoint: 'À retenir : un signal d’achat apparaît souvent quand le client passe de « Est-ce que cette offre m’intéresse ? » à « Comment cela va-t-il se passer si j’avance ? ». Ce n’est pas encore un « oui » : c’est une invitation à tester s’il est prêt à avancer, sans lui forcer la main.'
  },

  /* ── 3.2 · À vous de conclure ───────────────────────────────────────── */
  '3.2': {
    eyebrow: 'Conclure la vente · Exercice 3.2',
    title: 'À vous de conclure',
    subtitle: 'Le client se projette. Choisissez votre approche pour proposer la suite.',
    scene: { image: 'assets/illustrations/s5/1-1-4-S5-i3-2.png', alt: 'Dans une épicerie fine, la cliente demande au commerçant : « On pourrait démarrer quand ? »' },
    cases: [
      { tab: 'Ma réponse au client', fields: [
        { id: 'approach', type: 'choice', label: 'Votre approche', options: [
          { id: 'directe', label: 'Conclusion directe', sub: 'Proposer de valider la commande.', symbol: 'rocket', tone: 'coral' },
          { id: 'alternative', label: 'Conclusion alternative', sub: 'Proposer deux possibilités concrètes.', symbol: 'compass', tone: 'blue' }
        ], answer: ['directe', 'alternative'],
          why: 'Les deux approches conviennent ici : la cliente se projette. La directe propose simplement de passer à l’étape suivante ; l’alternative propose deux possibilités concrètes et la laisse choisir.' },
        { id: 'text', label: 'Ma réponse au client', placeholder: 'Rassurez-le aussi sur la suite.', rows: 5,
          model: 'Conclusion directe : « Nous pouvons démarrer dès le 15 octobre. Si cette date vous convient, je vous propose de valider la commande aujourd’hui et je m’occupe de lancer la mise en place. Je vous accompagnerai ensuite à chaque étape. » Conclusion alternative : « Nous pouvons démarrer dès le 15 octobre ou, si vous préférez vous laisser un peu plus de temps, début novembre. Quelle option vous conviendrait le mieux ? Dans les deux cas, je vous accompagne pour organiser la mise en place. »' }
      ] }
    ],
    keyPoint: 'À retenir : quand le client se projette, évitez de relancer votre argumentaire. Accompagnez son mouvement : répondez à sa question, proposez l’étape suivante et sécurisez la suite.',
    submitLabel: 'Valider ma réponse',
    feedback: 'Votre réponse propose-t-elle la suite et rassure-t-elle la cliente ?'
  },

  /* ── 4.1 · Les bons réflexes de relance ─────────────────────────────── */
  '4.1': {
    eyebrow: 'Relancer efficacement · Exercice 4.1',
    title: 'Les bons réflexes de relance',
    subtitle: 'Pour chaque pratique, choisissez : bon réflexe ou à éviter.',
    cardLabel: 'Pratique',
    cardsLabel: 'pratiques',
    letters: true,
    question: 'Vous la classez comment ?',
    zones: [
      { id: 'good', label: 'Bon réflexe', symbol: 'check', tone: 'good' },
      { id: 'bad', label: 'À éviter', symbol: 'close', tone: 'bad' }
    ],
    confirmLabel: 'Enregistrer et continuer',
    cards: [
      { text: 'Relancer plusieurs fois avec le même message : « Alors, vous avez réfléchi ? »', answer: 'bad', why: 'Répéter le même message n’apporte au client aucune nouvelle raison de répondre.' },
      { text: 'Dès l’envoi de l’offre, prévoir une date pour la première relance.', answer: 'good', why: 'Planifier la relance évite de laisser passer trop de temps et organise le suivi commercial.' },
      { text: 'À chaque nouvelle relance, apporter un élément utile : information complémentaire, retour d’expérience, actualité, échéance…', answer: 'good', why: 'Un cas client, une information ou une nouvelle option crée une nouvelle occasion de reprendre l’échange.' },
      { text: 'Après une première relance sans réponse, considérer que le client n’est plus intéressé et arrêter tout contact.', answer: 'bad', why: 'Une absence de réponse n’est pas forcément un refus : le client peut être occupé ou avoir besoin de temps.' },
      { text: 'Adapter le canal de relance à la situation (mail, téléphone…) et garder une trace des échanges.', answer: 'good', why: 'Varier les canaux et tracer les contacts rend la relance cohérente et évite les sollicitations répétitives.' },
      { text: 'Insister sur les précédentes tentatives de contact : « Je vous ai déjà écrit deux fois et je n’ai toujours pas eu de réponse. »', answer: 'bad', why: 'Rappeler au client qu’il n’a pas répondu sonne comme un reproche : donnez-lui plutôt une nouvelle raison de reprendre contact.' }
    ],
    keyPoint: 'À retenir : planifier, apporter de la valeur, varier si nécessaire, tracer, rester respectueux. L’objectif n’est pas de relancer plus, mais de relancer mieux.'
  },

  /* ── 4.2 · Rédigez votre relance ────────────────────────────────────── */
  '4.2': {
    eyebrow: 'Relancer efficacement · Exercice 4.2',
    title: 'Rédigez votre relance',
    subtitle: 'Un mail court qui donne une nouvelle raison de reprendre l’échange.',
    scene: [
      { facts: [
        { symbol: 'document', text: 'Offre envoyée il y a 10 jours à Madame Riveau : 10 postes ergonomiques.' },
        { symbol: 'users', text: 'Ses priorités : réduire les douleurs posturales et faciliter le déploiement.' },
        { symbol: 'star', text: 'Nouveau : un retour positif d’une entreprise du même secteur sur ces équipements.' }
      ], title: 'La situation' },
      { facts: [
        { symbol: 'document', strong: 'Contexte :', text: 'pourquoi vous écrivez.' },
        { symbol: 'star', strong: 'Valeur :', text: 'le retour d’expérience.' },
        { symbol: 'target', strong: 'Action :', text: 'un prochain pas concret.' }
      ], title: 'Votre mission' }
    ],
    cases: [
      { tab: 'Mon mail de relance', title: 'Mon mail de relance', fields: [
        { id: 'subject', type: 'input', label: 'Objet', placeholder: 'L’objet de votre mail…', max: 120, model: 'Votre projet d’équipement : un retour d’expérience à vous partager' },
        { id: 'message', label: 'Message', placeholder: 'Bonjour Madame Riveau, …', rows: 9, max: 1200,
          model: 'Bonjour Madame Riveau, je reviens vers vous concernant la proposition envoyée il y a une dizaine de jours pour l’équipement de vos 10 postes de travail. Depuis notre échange, une entreprise de votre secteur nous a partagé son retour sur l’utilisation de ces équipements, notamment sur le confort de travail de ses équipes. Je serais ravi de vous en partager les principaux enseignements. Auriez-vous 15 minutes mardi ou jeudi pour en échanger ? Bien cordialement, Thomas' }
      ] }
    ],
    keyPoint: 'À retenir : une relance efficace ne dit pas seulement « Où en êtes-vous ? ». Elle suit une logique simple : je rappelle, j’apporte, je propose.',
    submitLabel: 'Valider mon mail',
    feedback: 'Votre mail rappelle-t-il le contexte, apporte-t-il la valeur du retour d’expérience et propose-t-il un prochain pas ?'
  }
};
