/* SÉRIE 5 · PRÉPARER ET MENER LA DÉCOUVERTE · fiche M1.2.2, activités A4 et A5.
 *
 * 5.1 · A4 « Le guide qui fait parler » (Bloom 5, ≈ 25 min) : deux
 * commerciaux préparent leur premier rendez-vous avec Mme Lefort. L'apprenant
 * note chaque guide sur six critères (0 à 2), désigne le meilleur, puis
 * réécrit trois questions de l'autre guide. Un point d'écart par critère
 * reste accepté. Corrigé de la fiche ; la fiche tutoie, l'interface vouvoie.
 */
(function (root) {
  'use strict';

  root.ATELIER_S5 = {

    /* ── 5.1 · Le guide qui fait parler ────────────────────────────────── */
    '5.1': {
      eyebrow: 'Préparer la découverte · Le guide',
      title: 'Le guide qui fait parler',
      subtitle: 'Notez les deux guides de questions, désignez le meilleur, puis réécrivez trois questions de l’autre.',

      client: {
        name: 'Mme Lefort',
        role: 'Gérante d’un garage indépendant de 6 salariés, rencontrée en M1.2.1.',
        signal: 'Deux commerciaux d’un distributeur de pièces automobiles préparent leur premier rendez-vous avec elle.'
      },

      // Les deux guides : `groups` (un titre facultatif, des questions).
      sellers: [
        { id: 'yanis', name: 'Yanis', summary: 'Huit questions, presque toutes fermées, dont trois sur son offre.',
          groups: [{ title: '', questions: [
            'Vous travaillez avec quel fournisseur aujourd’hui ?',
            'Vous êtes livrée combien de fois par jour ?',
            'Vous êtes satisfaite de votre fournisseur ?',
            'Vous avez des ruptures ?',
            'Vous connaissez notre service de livraison express ?',
            'Notre catalogue de 80 000 références vous intéresserait ?',
            'Quel est votre budget mensuel de pièces ?',
            'On peut vous faire une offre ?'
          ] }],
          notes: [0, 0, 1, 0, 0, 0],
          why: 'Le guide de Yanis est un interrogatoire de questions fermées. Les questions 5, 6 et 8 sont de la vente déguisée : il parle de son offre avant d’avoir compris le besoin. La question 7, sur le budget, arrive sans contexte.' },
        { id: 'clara', name: 'Clara', summary: 'Cinq étapes, de l’atelier à la validation, avec des questions ouvertes.',
          groups: [
            { title: 'Comprendre l’atelier', questions: ['Pouvez-vous me présenter votre garage et votre activité ?', 'Comment s’organise une journée type à l’atelier ?'] },
            { title: 'Les difficultés', questions: ['Qu’est-ce qui vous fait perdre le plus de temps aujourd’hui ?', 'Que se passe-t-il quand une pièce n’arrive pas ?', 'Qu’est-ce que ça vous coûte, concrètement ?'] },
            { title: 'Préciser', questions: ['Combien de livraisons recevez-vous par jour ?', 'Ce sont plutôt des pièces courantes ou spécifiques qui manquent ?'] },
            { title: 'Ce qui compte', questions: ['Si vous changiez de fournisseur, qu’est-ce qui devrait absolument être meilleur ?'] },
            { title: 'Valider', questions: ['Si je résume… c’est bien ça ?'] }
          ],
          notes: [2, 2, 2, 1, 2, 2],
          why: 'Le guide de Clara est nettement meilleur : il suit l’entonnoir, fait raconter, cherche le coût du problème et prévoit une validation. Ce qu’elle peut améliorer : une seule question sur ce qui compte pour Mme Lefort ; il manque une question sur sa relation avec son fournisseur actuel et sur qui décide.' }
      ],

      criteria: [
        { title: 'L’entonnoir', text: 'Structure en entonnoir, du général au précis.' },
        { title: 'Questions ouvertes', text: 'Des questions ouvertes pour explorer.' },
        { title: 'Problèmes et coûts', text: 'Fait émerger les problèmes et ce qu’ils coûtent.' },
        { title: 'Critères et motivations', text: 'Cherche les critères de choix et les motivations.' },
        { title: 'Ni orientée ni vente', text: 'Aucune question orientée ni vente déguisée.' },
        { title: 'Validation', text: 'Une validation prévue à la fin.' }
      ],

      levels: [
        { id: '0', label: '0', sub: 'Absent' },
        { id: '1', label: '1', sub: 'Partiel' },
        { id: '2', label: '2', sub: 'Maîtrisé' }
      ],

      // Du meilleur guide au moins bon.
      ranking: ['clara', 'yanis'],
      rankTitle: 'Quel guide fait le mieux parler Mme Lefort ?',
      rankLabel: 'Désigner le meilleur guide',

      /* Les trois questions de Yanis à réécrire, et une réécriture possible. */
      rewrites: [
        { id: 'rw0', from: 'Vous travaillez avec quel fournisseur aujourd’hui ?', model: '« Comment travaillez-vous aujourd’hui avec votre fournisseur ? »' },
        { id: 'rw1', from: 'Vous êtes satisfaite de votre fournisseur ?', model: '« Qu’est-ce qui fonctionne bien avec lui, et qu’est-ce que vous aimeriez améliorer ? »' },
        { id: 'rw2', from: 'Vous avez des ruptures ?', model: '« Que se passe-t-il à l’atelier quand une pièce manque ? »' }
      ],

      // Les réécritures possibles, champ par champ (score estimatif).
      models: {
        rw0: 'Comment travaillez-vous aujourd’hui avec votre fournisseur ?',
        rw1: 'Qu’est-ce qui fonctionne bien avec lui, et qu’est-ce que vous aimeriez améliorer ?',
        rw2: 'Que se passe-t-il à l’atelier quand une pièce manque ?'
      },

      // Le critère spécifique de l'auto-évaluation de la fiche.
      selfCheck: { title: 'Réécriture qui ouvre', text: 'Mes trois questions réécrites sont ouvertes, partent de la situation de Mme Lefort et ne parlent pas du produit.' },

      tolerance: 'Un écart d’un point sur un critère reste acceptable, si votre justification tient.'
    },

    /* ── 5.2 · Votre guide, votre découverte (fiche M1.2.2, A5) ───────────
     * L'apprenant choisit un client, prépare son guide (les cinq étages de
     * l'entonnoir), mène la découverte avec un client virtuel (il écrit sa
     * question, puis découvre la réponse du thème choisi), analyse ce qu'il
     * a découvert, s'auto-évalue, puis dépose guide et analyse. */
    '5.2': {
      eyebrow: 'Mener la découverte · Votre guide',
      title: 'Votre guide, votre découverte',
      subtitle: 'Choisissez un client, préparez votre guide, menez la découverte, puis analysez ce que vous avez découvert.',
      forbidden: 'Interdit : proposer un produit pendant la découverte. Vous cherchez à comprendre, vous argumenterez plus tard.',
      minAsked: 4,

      // Les cinq étages du guide (gabarit 1 de la fiche).
      floors: [
        { id: 'g0', title: 'Situation générale', aim: 'Faire parler le client de sa situation, avec des questions larges.' },
        { id: 'g1', title: 'Problèmes et enjeux', aim: 'Faire émerger ses difficultés et ce qu’elles lui coûtent.' },
        { id: 'g2', title: 'Précisions', aim: 'Préciser les faits : questions fermées ou alternatives.' },
        { id: 'g3', title: 'Motivations et critères de choix', aim: 'Découvrir ce qui compte vraiment pour lui, et qui décide.' },
        { id: 'g4', title: 'Validation', aim: 'Reformuler ce que vous avez compris et le faire valider.' }
      ],

      fiches: [
        {
          id: 'literie',
          // Les réponses modèles de l'analyse (score estimatif).
          modelValues: { literie_implicite: 'Ne plus être réveillé par son épouse ; dormir pour être en sécurité au volant ; une taille compatible avec la chambre.', literie_prio: 'Des nuits complètes sans douleur au dos.' }, sector: 'Commerce', title: 'Magasin de literie', name: 'M. Garnier', portrait: 'client-tasse',
          profile: 'M. Garnier, 58 ans, revient au magasin. Il dort mal et a mal au dos.',
          context: 'Vous êtes vendeur dans un magasin de literie. M. Garnier, 58 ans, revient au magasin : il dort mal et a mal au dos.',
          topics: [
            { label: 'Ses nuits, son sommeil', answer: 'Je me réveille vers 4 h avec le bas du dos bloqué, et je ne me rendors pas.' },
            { label: 'Sa douleur, sa santé', answer: 'Mon kinésithérapeute dit que mon matelas s’affaisse au milieu.' },
            { label: 'Son matelas actuel', answer: 'Il a 14 ans. Un 140, acheté en promotion. On l’a regretté.' },
            { label: 'Ses nuits à deux', answer: 'Ma femme a chaud et bouge beaucoup : elle me réveille. Elle voudrait un 160, mais la chambre est petite.' },
            { label: 'Son travail, ses journées', answer: 'Je suis chauffeur-livreur, je commence à 6 h. Quand j’ai mal dormi, je ne me sens pas en sécurité sur la route.' },
            { label: 'Son budget', answer: '1 200 €, c’était ma limite. Mais si c’est vraiment mieux pour le dos…' },
            { label: 'La décision', answer: 'Ma femme viendra l’essayer samedi. Je ne décide pas sans elle.' }
          ],
          emerge: {
            explicite: 'Un matelas qui soulage le dos.',
            implicites: 'Ne plus être réveillé par son épouse (indépendance de couchage) ; dormir pour être en sécurité au volant ; une taille compatible avec la chambre.',
            motivations: 'Confort et santé (dominante) ; sécurité ; argent (souple).',
            prioritaire: 'Des nuits complètes sans douleur.',
            cle: '« Qui prendra la décision ? »'
          },
          guide: '① « Comment dormez-vous en ce moment ? » · « Parlez-moi d’une nuit type. » ② « Qu’est-ce qui vous réveille ? » · « Qu’est-ce que ces nuits changent dans vos journées ? » ③ « Il a quel âge, votre matelas ? » · « 140 ou 160, qu’est-ce qui est possible dans votre chambre ? » ④ « Qu’est-ce qui compterait le plus pour vous, et pour votre épouse ? » · « Qui prendra la décision ? » ⑤ « Si je résume… c’est bien ça ? »',
          motivation: 'confort'
        },
        {
          id: 'pieces',
          // Les réponses modèles de l'analyse (score estimatif).
          modelValues: { pieces_implicite: 'Garder ses clients fidèles ; ne pas trahir son fournisseur historique, changer progressivement ; moins d’erreurs de référence.', pieces_prio: 'La bonne pièce du premier coup.' }, sector: 'Entre entreprises', title: 'Garage indépendant', name: 'Mme Lefort', portrait: 'client-veste-verte',
          profile: 'Mme Lefort gère un garage indépendant. Premier rendez-vous, dans son garage.',
          context: 'Vous êtes commercial chez un distributeur de pièces automobiles. Premier rendez-vous avec Mme Lefort, dans son garage.',
          topics: [
            { label: 'Son garage, son activité', answer: 'Six salariés, quatre ponts. Surtout de l’entretien et de la réparation, avec beaucoup de clients fidèles du quartier.' },
            { label: 'L’organisation de l’atelier', answer: 'Les rendez-vous sont pleins dix jours à l’avance. Un pont bloqué, c’est trois rendez-vous à décaler.' },
            { label: 'Ses difficultés', answer: 'Une fois sur trois, il manque une pièce. Et chaque pièce erronée, c’est une demi-heure perdue.' },
            { label: 'Ce que cela lui coûte', answer: 'La semaine dernière, j’ai prêté ma propre voiture à un client. Je ne veux pas perdre mes fidèles.' },
            { label: 'Son fournisseur actuel', answer: 'Douze ans qu’on travaille ensemble, le patron est un ami de mon père. Changer, ça me gêne.' },
            { label: 'Ce qui compte pour elle', answer: 'La bonne pièce du premier coup. Le prix, je regarde après.' },
            { label: 'La décision', answer: 'C’est moi qui décide. Mais je ne veux pas tout changer d’un coup.' }
          ],
          emerge: {
            explicite: 'Des livraisons fiables.',
            implicites: 'Garder ses clients fidèles (image) ; ne pas « trahir » son fournisseur historique (démarrage progressif) ; moins d’erreurs de référence.',
            motivations: 'Sécurité (dominante) ; orgueil (sa réputation) ; sympathie (fournisseur ami).',
            prioritaire: 'La bonne pièce du premier coup.',
            cle: '« Comment voyez-vous la relation avec votre fournisseur actuel ? »'
          },
          guide: '① « Pouvez-vous me présenter votre garage ? » · « Comment s’organise une journée à l’atelier ? » ② « Qu’est-ce qui vous fait perdre le plus de temps ? » · « Qu’est-ce que ça vous coûte, concrètement ? » ③ « Ce sont plutôt des pièces courantes ou spécifiques qui manquent ? » ④ « Qu’est-ce qui devrait absolument être meilleur ? » · « Comment voyez-vous la relation avec votre fournisseur actuel ? » ⑤ « Si je résume… c’est bien ça ? »',
          motivation: 'securite'
        },
        {
          id: 'mandat',
          // Les réponses modèles de l'analyse (score estimatif).
          modelValues: { mandat_implicite: 'Coordonner la vente et l’achat de l’appartement ; des visites filtrées ; associer ses enfants à la décision.', mandat_prio: 'Un calendrier coordonné : trouver l’appartement avant de vendre.' }, sector: 'Immobilier', title: 'Mandat de vente', name: 'Mme Duval', portrait: 'client-cheveux-gris',
          profile: 'Mme Duval, 74 ans, veut vendre la maison familiale.',
          context: 'Vous êtes conseiller immobilier. Mme Duval, 74 ans, vous reçoit : elle veut vendre la maison familiale.',
          topics: [
            { label: 'Son projet', answer: 'Je vends la maison pour prendre un appartement près de ma sœur, à Tours.' },
            { label: 'La maison', answer: '140 m², 800 m² de jardin, construite en 1978. La toiture a été refaite il y a cinq ans.' },
            { label: 'Le calendrier', answer: 'Mon fils veut que ce soit vendu avant l’hiver. Moi, je veux d’abord avoir trouvé l’appartement.' },
            { label: 'Le prix', answer: 'Le voisin a vendu 320 000 €. La mienne vaut au moins ça.' },
            { label: 'Sa famille', answer: 'Mes deux enfants doivent être d’accord : c’est aussi leur héritage.' },
            { label: 'Ses inquiétudes', answer: 'J’ai peur des visites à répétition, de tous ces inconnus qui vont juger la maison.' },
            { label: 'Le choix de l’agence', answer: 'Une amie m’a parlé de vous, elle a été très bien accompagnée.' }
          ],
          emerge: {
            explicite: 'Vendre la maison.',
            implicites: 'Coordonner vente et achat ; des visites filtrées ; faire reconnaître la valeur de la maison ; associer les enfants.',
            motivations: 'Sécurité (dominante) ; sympathie (recommandation) ; orgueil (valeur de la maison).',
            prioritaire: 'Un calendrier coordonné.',
            cle: '« Qu’est-ce qui vous inquiète dans cette vente ? »'
          },
          guide: '① « Parlez-moi de votre projet. » · « Qu’est-ce qui vous amène à vendre ? » ② « Qu’est-ce qui vous inquiète dans cette vente ? » ③ « Quel calendrier avez-vous en tête ? » · « Vos enfants sont-ils associés à la décision ? » ④ « Qu’est-ce qui compte le plus pour vous dans la façon dont cette vente va se passer ? » ⑤ « Si je résume… c’est bien ça ? »',
          motivation: 'securite'
        }
      ],

      // Les motivations d'achat (méthode SONCASE).
      motivations: [
        { id: 'securite', label: 'Sécurité' }, { id: 'orgueil', label: 'Orgueil' }, { id: 'nouveaute', label: 'Nouveauté' },
        { id: 'confort', label: 'Confort' }, { id: 'argent', label: 'Argent' }, { id: 'sympathie', label: 'Sympathie' }, { id: 'environnement', label: 'Environnement' }
      ],

      // La grille de la fiche ; la même sert au tuteur.
      selfCheck: [
        { text: 'Mon guide suit l’entonnoir, du général au précis.' },
        { text: 'J’explore avec des questions ouvertes ; les questions fermées et alternatives servent à préciser.' },
        { text: 'Aucune question orientée, aucune proposition de produit.' },
        { text: 'J’ai relancé au moins une réponse vague.' },
        { text: 'J’ai fait émerger au moins un besoin implicite.' },
        { text: 'J’ai identifié la motivation dominante avec un mot indice.' },
        { text: 'Ma hiérarchie s’appuie sur les mots du client.' },
        { text: 'J’ai repéré mes propres questions à améliorer.' }
      ],

      deposit: 'Déposez sur la plateforme votre guide et votre analyse. Votre tuteur (ou un pair) vous fera un retour avec la même grille.',
      note: 'L’estimation de Mme Duval (« au moins 320 000 € ») et le budget de M. Garnier sont des sujets sensibles. En découverte, on les écoute et on les note ; on n’en débat pas.'
    }
  };
})(globalThis);
