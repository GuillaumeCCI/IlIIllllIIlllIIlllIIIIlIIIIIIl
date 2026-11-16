/* SÉRIE 2 · POSER LA BONNE QUESTION (fiche M1.2.2, activité A1
 * « La bonne question au bon moment », Bloom 1-2, ≈ 20 min).
 *
 * M. Garnier revient au magasin de literie. 2.1 : chaque question du
 * vendeur, à classer par type (ouverte, fermée, alternative, orientée).
 * 2.2 : six questions à placer à l'étage de l'entonnoir qui leur
 * correspond. Mécanique : mountDeck (une carte, des zones). Corrigé de la
 * fiche ; la fiche tutoie, l'interface vouvoie.
 */
(function (root) {
  'use strict';

  const TYPES = [
    { id: 'ouverte', letter: 'O', label: 'Ouverte', sub: 'Elle fait parler.' },
    { id: 'fermee', letter: 'F', label: 'Fermée', sub: 'Oui, non ou une information précise.' },
    { id: 'alternative', letter: 'A', label: 'Alternative', sub: 'Un choix entre deux ou trois options.' },
    { id: 'orientee', letter: '!', label: 'Orientée', sub: 'Elle contient déjà la réponse.' }
  ];

  const ETAGES = [
    { id: '1', letter: '1', label: 'La situation générale', sub: 'Questions larges.' },
    { id: '2', letter: '2', label: 'Les problèmes et les attentes', sub: 'Questions ouvertes ciblées.' },
    { id: '3', letter: '3', label: 'Les précisions', sub: 'Fermées, alternatives.' },
    { id: '4', letter: '4', label: 'La validation', sub: 'Reformulation et validation.' }
  ];

  const context = {
    situation: 'M. Garnier, 58 ans, revient au magasin de literie : il dort mal et a mal au dos. Le vendeur lui pose des questions pour découvrir son besoin.',
    read: 'Lisez chaque question du vendeur.',
    choose: 'Classez-la dans la bonne zone.'
  };

  root.ATELIER_S2 = {

    /* ── 2.1 · Quel type de question ? ─────────────────────────────────── */
    '2.1': {
      eyebrow: 'Poser la bonne question · Les types',
      title: 'Quel type de question ?',
      banner: false,
      subtitle: 'Pour chaque question du vendeur à M. Garnier, indiquez son type.',
      context,
      question: 'Quel est le type de cette question ?',
      cardLabel: 'Le vendeur demande',
      quoted: true,
      zones: TYPES,
      cards: [
        { text: 'Comment dormez-vous en ce moment ?', answer: 'ouverte', why: '« Comment… ? » : M. Garnier répond avec ses mots, comme il veut.' },
        { text: 'Vous dormez plutôt sur le dos ou sur le côté ?', answer: 'alternative', why: 'Deux options proposées : il choisit l’une ou l’autre.' },
        { text: 'Votre matelas actuel a plus de dix ans ?', answer: 'fermee', why: 'On répond par oui ou par non : utile pour préciser un fait.' },
        { text: 'Qu’est-ce qui vous réveille la nuit ?', answer: 'ouverte', why: '« Qu’est-ce qui… ? » invite à raconter.' },
        { text: 'Avec un mal de dos, vous voulez sûrement un matelas très ferme, non ?', answer: 'orientee', why: 'La réponse est déjà dans la question (« sûrement… très ferme, non ? ») : le vendeur impose son idée.' },
        { text: 'Parlez-moi de vos nuits à deux : qu’est-ce qui vous gêne ?', answer: 'ouverte', why: '« Parlez-moi de… » fait parler du sujet sans rien suggérer.' },
        { text: 'Vous partez plutôt sur un 140 ou sur un 160 ?', answer: 'alternative', why: 'Un choix entre deux tailles.' },
        { text: 'Votre budget est bien de 1 200 € au maximum ?', answer: 'fermee', why: 'Une information à confirmer par oui ou non.' },
        { text: 'Qu’attendez-vous d’un nouveau matelas ?', answer: 'ouverte', why: 'Il exprime lui-même ses attentes.' },
        { text: 'Une garantie de dix ans, ça vous rassurerait, n’est-ce pas ?', answer: 'orientee', why: '« … n’est-ce pas ? » : le vendeur souffle la réponse, et glisse déjà un argument.' }
      ],
      keyPoint: 'À retenir : les questions fermées et alternatives ne sont pas « mauvaises » : elles servent à préciser et à valider, après l’exploration. Les questions orientées sont le vrai piège : elles soufflent la réponse et empêchent le client d’exprimer son propre besoin. Méfiez-vous aussi du « pourquoi », qui peut sonner comme un reproche : « qu’est-ce qui… » passe mieux.'
    },

    /* ── 2.2 · Les étages de l'entonnoir ───────────────────────────────── */
    '2.2': {
      eyebrow: 'Poser la bonne question · L’entonnoir',
      title: 'Les étages de l’entonnoir',
      banner: false,
      subtitle: 'Placez chaque question à l’étage de l’entonnoir qui lui correspond.',
      context,
      question: 'À quel étage de l’entonnoir ?',
      cardLabel: 'Le vendeur demande',
      quoted: true,
      zones: ETAGES,
      cards: [
        { text: 'Comment dormez-vous en ce moment ?', answer: '1', why: 'Une question large pour ouvrir : on part de la situation générale.' },
        { text: 'Qu’est-ce qui vous réveille, plus précisément ?', answer: '2', why: 'On creuse le problème avec une question ouverte ciblée.' },
        { text: 'La douleur arrive plutôt au réveil ou en cours de nuit ?', answer: '3', why: 'Une alternative pour préciser un détail.' },
        { text: 'Et pour votre épouse, qu’est-ce qui compte dans un matelas ?', answer: '2', why: 'Encore une attente à explorer, ouverte : celle de son épouse.' },
        { text: 'Si je résume : vous voulez retrouver des nuits complètes sans douleur, et un matelas qui vous convienne à tous les deux. C’est bien ça ?', answer: '4', why: 'La reformulation, puis la question de validation : on referme l’entonnoir.' },
        { text: 'Vous comptez garder votre sommier actuel ?', answer: '3', why: 'Une question fermée pour préciser un point technique.' }
      ],
      keyPoint: 'À retenir : on commence large pour faire parler, on resserre sur les problèmes et les attentes, on précise avec des questions fermées ou alternatives, puis on valide. Commencer par les précisions, c’est un interrogatoire.'
    }
  };
})(globalThis);
