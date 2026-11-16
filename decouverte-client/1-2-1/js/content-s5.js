/* SÉRIE 5 · S'ADAPTER AU CLIENT · fiche M1.2.1, activités A4 et A5.
 *
 * 5.1 · A4 « Trois commerciaux, une cliente pressée » (Bloom 5, ≈ 15 min).
 *
 * Mme Royer, pressée, reçoit trois commerciaux. L'apprenant note chacun
 * sur les quatre critères de la fiche (0 = absent, 1 = partiel,
 * 2 = maîtrisé), les classe, puis justifie son premier choix. Le corrigé
 * reprend la fiche : un écart d'un point sur un critère reste acceptable.
 * La fiche tutoie ; l'interface vouvoie.
 */
(function (root) {
  'use strict';

  root.ATELIER_S5 = {

    /* ── 5.1 · Trois commerciaux, une cliente pressée ──────────────────── */
    '5.1': {
      eyebrow: 'S’adapter au client · Une cliente pressée',
      title: 'Trois commerciaux, une cliente pressée',
      subtitle: 'Notez chaque commercial avec la grille, classez-les, puis justifiez votre premier choix.',

      client: {
        name: 'Mme Royer',
        role: 'Office manager dans une entreprise de 80 salariés. Elle reçoit un commercial d’un distributeur de photocopieurs.',
        signal: 'Elle parle vite et regarde sa montre.',
        quote: 'J’ai un quart d’heure, on a un comité de direction à 11 h. Nos copieurs tombent en panne sans arrêt, les commerciaux râlent, et c’est moi qui prends.',
        portrait: 'client-chignon'
      },

      // `role` : affiché avec le nom (« Inès, commerciale, lui répond »).
      // `text` : la réponse ; les passages entre crochets sont des indications.
      sellers: [
        { id: 'thomas', name: 'Thomas', role: 'commercial', text: 'Très bien. Alors, avant tout, je vais vous présenter notre groupe : nous existons depuis 1987, nous avons 12 agences… [3 minutes plus tard] …voilà. Et donc, quels sont vos besoins ?',
          notes: [0, 0, 0, 1],
          why: 'Thomas ignore totalement la contrainte de la cliente et parle de lui. Sa question finale est ouverte, mais trop tardive et trop vague.' },
        { id: 'ines', name: 'Inès', role: 'commerciale', text: 'Un quart d’heure, c’est noté, je vais à l’essentiel. Si je vous suis bien, ces pannes à répétition vous mettent en première ligne face aux équipes, et c’est ça qui devient pesant. Pour bien cibler, combien de pannes environ par mois, et sur quels appareils ?',
          notes: [2, 2, 1, 2],
          why: 'Inès montre qu’elle a capté le signal de temps, fait un reflet de l’émotion (« c’est moi qui prends ») puis lance la découverte. Ce qu’elle peut améliorer : elle n’attend pas la validation de sa reformulation (« c’est bien ça ? ») avant d’enchaîner sur ses questions.' },
        { id: 'hugo', name: 'Hugo', role: 'commercial', text: 'Ah, les pannes, classique ! Votre prestataire ne fait sûrement pas de maintenance préventive, ils sont tous pareils. Chez nous, intervention en 4 h, ça règle le problème.',
          notes: [2, 0, 0, 0],
          why: 'Hugo est le piège : rapide et sûr de lui, il paraît efficace. Mais il juge (« ils sont tous pareils »), dénigre le concurrent et propose une solution sans connaître le problème. Les pannes viennent peut-être de machines inadaptées au volume, pas de la maintenance.' }
      ],

      criteria: [
        { title: 'Contrainte de temps', text: 'Prend en compte la contrainte de temps (signal verbal et non verbal).' },
        { title: 'Attitude d’écoute', text: 'Compréhension plutôt que jugement ou solution.' },
        { title: 'Reformulation', text: 'Reformule et vérifie sa compréhension.' },
        { title: 'Ouverture de la découverte', text: 'Invite la cliente à en dire plus.' }
      ],

      levels: [
        { id: '0', label: '0', sub: 'Absent' },
        { id: '1', label: '1', sub: 'Partiel' },
        { id: '2', label: '2', sub: 'Maîtrisé' }
      ],

      // Du plus adapté au moins adapté.
      ranking: ['ines', 'hugo', 'thomas'],
      rankingText: 'Inès, puis Hugo, puis Thomas.',

      justify: {
        label: 'Pourquoi ce premier choix ?',
        sub: 'En deux lignes, appuyez-vous sur les critères de la grille, pas sur votre impression générale.',
        placeholder: 'Ex. : Elle tient compte de… et elle…',
        model: 'Inès est la seule à tenir compte du temps de la cliente, à reformuler ce qu’elle ressent (« c’est moi qui prends ») et à ouvrir la découverte par des questions précises. Seul manque : elle n’attend pas que la cliente valide sa reformulation.'
      },

      // La réponse possible de chaque champ rédigé (score estimatif, js/grilles.js).
      models: { why: 'Inès est la seule à tenir compte du temps de la cliente, à reformuler ce qu’elle ressent (« c’est moi qui prends ») et à ouvrir la découverte par des questions précises. Seul manque : elle n’attend pas que la cliente valide sa reformulation.' },

      // Le critère spécifique de l'auto-évaluation de la fiche.
      selfCheck: { title: 'Justification par critères', text: 'Mon classement s’appuie sur la grille, pas sur mon impression générale.' },

      tolerance: 'Un écart d’un point sur un critère reste acceptable, si votre justification tient.'
    },

    /* ── 5.2 · Votre réponse, votre voix (fiche M1.2.1, A5) ───────────────
     * L'apprenant choisit une des trois fiches client, la plus proche de son
     * futur métier. Trois répliques, une réponse pour chacune : compréhension
     * (1), adaptation au signal non verbal (2), synthèse avec validation (3).
     * Puis un enregistrement oral (3 minutes au plus), l'auto-évaluation
     * Oui / Non de la fiche, et le dépôt du texte et de l'audio sur la
     * plateforme. Dans les répliques, les crochets décrivent un geste. */
    '5.2': {
      eyebrow: 'S’adapter au client · Votre réponse, votre voix',
      title: 'Votre réponse, votre voix',
      subtitle: 'Choisissez un client et menez l’entretien : trois moments, une réponse à chacun, puis dites-les à voix haute.',
      forbidden: 'Interdit : proposer un produit ou une solution. Vous êtes en découverte, pas en argumentation.',

      // Ce que chaque réponse doit faire, réplique par réplique.
      tasks: [
        { title: 'Une réponse en attitude de compréhension', text: 'Sans juger, sans interpréter, sans proposer de solution : montrez au client que vous avez compris ce qu’il vit.' },
        { title: 'Une réponse qui tient compte du signal', text: 'Le client vous montre quelque chose sans le dire. Montrez que vous l’avez perçu, et adaptez votre rythme ou votre ton.' },
        { title: 'Une reformulation-synthèse de tout l’échange', text: 'Reprenez tous les éléments importants, sans rien ajouter, et terminez par une question de validation.' }
      ],

      fiches: [
        {
          id: 'literie', sector: 'Commerce', title: 'Magasin de literie', name: 'M. Garnier', portrait: 'client-tasse',
          profile: 'M. Garnier, 58 ans, se tient le bas du dos en s’asseyant sur un matelas.',
          // Le contexte affiché pendant l'échange : qui vous êtes, où vous êtes.
          context: 'Vous êtes vendeur dans un magasin de literie. M. Garnier, 58 ans, entre dans le magasin et s’assoit sur un matelas en se tenant le bas du dos.',
          lines: [
            'Je dors mal depuis des mois, je me réveille avec le dos en compote.',
            '[Il regarde l’étiquette et grimace] Bon… 1 200 €, quand même.',
            'Ma femme veut un matelas ferme, moi j’ai lu que ce n’était pas forcément bon pour le dos. Et on a un 140, on se gêne la nuit.'
          ],
          models: [
            'Des mois de mauvaises nuits et des douleurs au réveil, ça doit peser sur vos journées.',
            'Le prix vous fait réagir. C’est un budget important, et vous voulez être sûr que ça en vaut la peine, c’est ça ?',
            'Si je résume : votre priorité, c’est de soulager votre dos et de retrouver des nuits complètes. Il faut trouver une fermeté qui vous convienne à tous les deux, le 140 devient un peu juste, et vous voulez que l’investissement soit justifié. C’est bien ça ? Il y a autre chose d’important ?'
          ],
          notes: ['', '', '']
        },
        {
          id: 'pieces', sector: 'Entre entreprises', title: 'Distributeur de pièces auto', name: 'Mme Lefort', portrait: 'client-veste-verte',
          profile: 'Mme Lefort gère un garage indépendant de 6 salariés.',
          context: 'Vous êtes commercial chez un distributeur de pièces auto. Vous rencontrez pour la première fois Mme Lefort, qui gère un garage indépendant de 6 salariés, dans son garage.',
          lines: [
            'Mon fournisseur livre deux fois par jour, mais une fois sur trois il manque une pièce et la voiture reste sur le pont.',
            '[Son téléphone sonne sans arrêt, un mécanicien l’appelle depuis l’atelier] Allez-y, je vous écoute, mais faites vite.',
            'Le prix, honnêtement, je regarde moins. Ce qui me coûte, c’est d’immobiliser un pont et de rappeler le client pour décaler.'
          ],
          models: [
            'Une pièce qui manque, c’est un pont bloqué et un planning qui déraille. Vous devez jongler toute la journée.',
            'Je vois que l’atelier a besoin de vous, je vais être bref. Trois questions, et si besoin on cale un autre moment, ça vous va ?',
            'Si je résume : votre priorité, c’est la fiabilité des livraisons, la bonne pièce au bon moment, parce que chaque pont immobilisé vous coûte du temps et de l’image auprès de vos clients. Le prix vient après. C’est bien ça ?'
          ],
          notes: ['', 'Adaptation : raccourcir et laisser la cliente garder la main.', '']
        },
        {
          id: 'mandat', sector: 'Immobilier', title: 'Mandat de vente', name: 'Mme Duval', portrait: 'client-cheveux-gris',
          profile: 'Mme Duval, 74 ans, veuve, vend la maison familiale.',
          context: 'Vous êtes conseiller dans une agence immobilière. Mme Duval, 74 ans, veuve, vous reçoit chez elle : elle souhaite vendre la maison familiale.',
          lines: [
            'Je n’arrive plus à entretenir le jardin, et l’étage, avec mes genoux…',
            '[Elle regarde longuement une photo au mur, sa voix baisse] Mes enfants ont grandi ici, vous savez.',
            'Mon fils dit qu’il faut vendre vite, avant l’hiver. Moi, je voudrais avoir trouvé un appartement près de ma sœur avant de partir.'
          ],
          models: [
            'Le jardin et l’étage deviennent difficiles au quotidien. La maison n’est plus adaptée à ce dont vous avez besoin aujourd’hui.',
            '(Laisser un silence.) C’est une maison pleine de souvenirs. Ce n’est pas une décision facile.',
            'Si je résume : vous vendez parce que la maison n’est plus adaptée. Votre fils souhaite une vente rapide avant l’hiver, et pour vous, l’essentiel est d’avoir trouvé un appartement près de votre sœur avant de partir. Il faudra donc coordonner le calendrier de la vente et celui de votre installation. Est-ce que j’ai bien compris ?'
          ],
          notes: ['', 'Adaptation : ralentir, ne pas enchaîner sur l’estimation. À éviter : un soutien banal du type « ne vous inquiétez pas ».', 'La synthèse distingue la priorité de la cliente de celle de son fils.']
        }
      ],

      oral: {
        title: 'Dites vos trois réponses à voix haute',
        text: 'Enregistrez-vous (3 minutes au plus) en lisant vos réponses comme si le client était en face de vous. Réécoutez-vous, puis téléchargez l’enregistrement pour le déposer.',
        max: 180000
      },

      // La grille de la fiche : la même sert au tuteur (ou à un pair).
      selfCheck: [
        { title: 'Réponse 1', text: 'Ma réponse 1 ne juge pas, n’interprète pas et ne propose pas de solution.' },
        { title: 'Les mots du client', text: 'J’utilise les mots du client.' },
        { title: 'Réponse 2', text: 'Ma réponse 2 montre que j’ai perçu le signal non verbal.' },
        { title: 'Adaptation au signal', text: 'J’adapte mon rythme ou mon ton : plus bref si le client est pressé, plus lent s’il est ému.' },
        { title: 'Synthèse complète', text: 'Ma synthèse reprend tous les éléments importants, sans rien ajouter.' },
        { title: 'Validation', text: 'Ma synthèse se termine par une question de validation.' },
        { title: 'Pas d’argument', text: 'Aucun argument produit n’apparaît.' },
        { title: 'À l’oral', text: 'Mon ton est posé et je ne coupe pas la parole. Ce critère sera aussi vérifié par votre tuteur.' }
      ],

      deposit: 'Déposez sur la plateforme le texte de vos trois réponses et votre enregistrement. Votre tuteur (ou un pair) vous fera un retour avec la même grille.'
    }
  };
})(globalThis);
