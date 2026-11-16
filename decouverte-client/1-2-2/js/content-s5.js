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
    }
  };
})(globalThis);
