/* SÉRIE 6 · À VOUS DE RÉPONDRE · fiche M1.2.1, activité A5
 * « Ta réponse, ta voix » (Bloom 6, ≈ 30 min).
 *
 * L'apprenant choisit une des trois fiches client, la plus proche de son
 * futur métier. Le client prononce trois répliques ; pour chacune, une
 * réponse : compréhension (1), adaptation au signal non verbal (2),
 * synthèse avec validation (3). Puis un enregistrement oral (3 minutes
 * au plus), l'auto-évaluation Oui / Non de la fiche, et le dépôt du texte
 * et de l'audio sur la plateforme, pour le retour du tuteur.
 * Dans les répliques, les passages entre crochets décrivent un geste.
 * La fiche tutoie ; l'interface vouvoie.
 */
(function (root) {
  'use strict';

  root.ATELIER_S6 = {

    /* ── 6.1 · Votre réponse, votre voix ───────────────────────────────── */
    '6.1': {
      eyebrow: 'À vous de répondre · Votre réponse, votre voix',
      title: 'Votre réponse, votre voix',
      subtitle: 'Choisissez un client, répondez à ses trois répliques, puis dites vos réponses à voix haute.',
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
