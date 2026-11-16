/* SÉRIE 5 · ÉVALUER UNE POSTURE · fiche M1.2.1, activité A4
 * « Trois commerciaux, une cliente pressée » (Bloom 5, ≈ 15 min).
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
      eyebrow: 'Évaluer une posture · Une cliente pressée',
      title: 'Trois commerciaux, une cliente pressée',
      subtitle: 'Notez chaque commercial avec la grille, classez-les, puis justifiez votre premier choix.',

      client: {
        name: 'Mme Royer',
        role: 'Office manager dans une entreprise de 80 salariés. Elle reçoit un commercial d’un distributeur de photocopieurs.',
        signal: 'Elle parle vite et regarde sa montre.',
        quote: 'J’ai un quart d’heure, on a un comité de direction à 11 h. Nos copieurs tombent en panne sans arrêt, les commerciaux râlent, et c’est moi qui prends.',
        portrait: 'client-chignon'
      },

      // `text` : la réponse ; les passages entre crochets sont des indications.
      sellers: [
        { id: 'thomas', name: 'Thomas', text: 'Très bien. Alors, avant tout, je vais vous présenter notre groupe : nous existons depuis 1987, nous avons 12 agences… [3 minutes plus tard] …voilà. Et donc, quels sont vos besoins ?',
          notes: [0, 0, 0, 1],
          why: 'Thomas ignore totalement la contrainte de la cliente et parle de lui. Sa question finale est ouverte, mais trop tardive et trop vague.' },
        { id: 'ines', name: 'Inès', text: 'Un quart d’heure, c’est noté, je vais à l’essentiel. Si je vous suis bien, ces pannes à répétition vous mettent en première ligne face aux équipes, et c’est ça qui devient pesant. Pour bien cibler, combien de pannes environ par mois, et sur quels appareils ?',
          notes: [2, 2, 1, 2],
          why: 'Inès montre qu’elle a capté le signal de temps, fait un reflet de l’émotion (« c’est moi qui prends ») puis lance la découverte. Ce qu’elle peut améliorer : elle n’attend pas la validation de sa reformulation (« c’est bien ça ? ») avant d’enchaîner sur ses questions.' },
        { id: 'hugo', name: 'Hugo', text: 'Ah, les pannes, classique ! Votre prestataire ne fait sûrement pas de maintenance préventive, ils sont tous pareils. Chez nous, intervention en 4 h, ça règle le problème.',
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

      // Le critère spécifique de l'auto-évaluation de la fiche.
      selfCheck: { title: 'Justification par critères', text: 'Mon classement s’appuie sur la grille, pas sur mon impression générale.' },

      tolerance: 'Un écart d’un point sur un critère reste acceptable, si votre justification tient.'
    }
  };
})(globalThis);
