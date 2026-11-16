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
    { id: 'ouverte', letter: '1', label: 'Ouverte', sub: 'Elle fait parler.' },
    { id: 'fermee', letter: '2', label: 'Fermée', sub: 'Oui, non ou une information précise.' },
    { id: 'alternative', letter: '3', label: 'Alternative', sub: 'Un choix entre deux ou trois options.' },
    { id: 'orientee', letter: '4', label: 'Orientée', sub: 'Elle contient déjà la réponse.' }
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
      subtitle: 'M. Garnier, 58 ans, revient au magasin de literie : il dort mal et a mal au dos.\nLe vendeur lui pose dix questions pour comprendre son besoin.\nIndiquez le type de chacune.',
      context,
      question: 'Quel est le type de cette question ?',
      cardLabel: 'Le vendeur demande',
      quoted: true,
      zones: TYPES,
      cards: [
        { text: 'Comment dormez-vous en ce moment ?', answer: 'ouverte', why: 'M. Garnier peut répondre comme il veut, avec ses propres mots. Le vendeur apprend ce qui compte pour lui, sans l’orienter.' },
        { text: 'Vous dormez plutôt sur le dos ou sur le côté ?', answer: 'alternative', why: 'Le vendeur propose deux réponses et M. Garnier en choisit une. C’est utile pour préciser un détail, une fois le besoin compris.' },
        { text: 'Votre matelas actuel a plus de dix ans ?', answer: 'fermee', why: 'M. Garnier ne peut répondre que oui ou non. Le vendeur vérifie un fait précis, mais n’apprend rien de plus.' },
        { text: 'Qu’est-ce qui vous réveille la nuit ?', answer: 'ouverte', why: 'M. Garnier doit expliquer avec ses mots : il raconte ce qui le gêne vraiment. Le vendeur découvre la cause de son problème.' },
        { text: 'Avec un mal de dos, vous voulez sûrement un matelas très ferme, non ?', answer: 'orientee', why: 'Le vendeur donne lui-même la réponse : « sûrement… très ferme, non ? ». M. Garnier risque d’approuver sans dire ce qu’il pense vraiment.' },
        { text: 'Parlez-moi de vos nuits à deux : qu’est-ce qui vous gêne ?', answer: 'ouverte', why: 'M. Garnier peut raconter librement ce qui se passe la nuit avec son épouse. Le vendeur peut ainsi découvrir un besoin qu’il n’avait pas imaginé.' },
        { text: 'Vous partez plutôt sur un 140 ou sur un 160 ?', answer: 'alternative', why: 'Le vendeur propose deux tailles et M. Garnier en choisit une. C’est utile en fin d’échange, pour arrêter un choix.' },
        { text: 'Votre budget est bien de 1 200 € au maximum ?', answer: 'fermee', why: 'M. Garnier n’a qu’à répondre oui ou non. Le vendeur confirme un chiffre déjà connu, sans ouvrir la discussion.' },
        { text: 'Qu’attendez-vous d’un nouveau matelas ?', answer: 'ouverte', why: 'M. Garnier décrit lui-même ce qu’il espère. Le vendeur connaît ses vraies attentes avant de proposer quoi que ce soit.' },
        { text: 'Une garantie de dix ans, ça vous rassurerait, n’est-ce pas ?', answer: 'orientee', why: 'Avec « n’est-ce pas ? », le vendeur pousse M. Garnier à dire oui. En plus, il glisse un argument de vente au lieu d’écouter.' }
      ],
      keyPoint: 'À retenir : les questions fermées et alternatives ne sont pas « mauvaises » : elles servent à préciser et à valider, après l’exploration. Les questions orientées sont le vrai piège : elles soufflent la réponse et empêchent le client d’exprimer son propre besoin. Méfiez-vous aussi du « pourquoi », qui peut sonner comme un reproche : « qu’est-ce qui… » passe mieux.'
    },

    /* ── 2.2 · Les étages de l'entonnoir ───────────────────────────────── */
    '2.2': {
      eyebrow: 'Poser la bonne question · L’entonnoir',
      title: 'Les étages de l’entonnoir',
      banner: false,
      subtitle: 'M. Garnier, 58 ans, revient au magasin de literie : il dort mal et a mal au dos.\nLe vendeur lui pose six questions, des plus larges aux plus précises.\nPlacez chacune à l’étage de l’entonnoir qui lui correspond.',
      context,
      question: 'À quel étage de l’entonnoir ?',
      cardLabel: 'Le vendeur demande',
      quoted: true,
      zones: ETAGES,
      cards: [
        { text: 'Parlez-moi de vos nuits en ce moment : comment ça se passe ?', answer: '1', why: 'C’est une question large, qui laisse M. Garnier raconter sa situation. On commence toujours par là, avant d’entrer dans les détails.' },
        { text: 'Qu’est-ce qui vous réveille, plus précisément ?', answer: '2', why: 'Le vendeur sait déjà que M. Garnier dort mal : il lui demande de préciser la cause. C’est l’étage où l’on creuse le problème.' },
        { text: 'La douleur arrive plutôt au réveil ou en cours de nuit ?', answer: '3', why: 'Le vendeur propose deux possibilités pour obtenir un détail précis. Les questions fermées et à choix viennent une fois le problème compris.' },
        { text: 'Et pour votre épouse, qu’est-ce qui compte dans un matelas ?', answer: '2', why: 'Le vendeur découvre une autre attente : celle de l’épouse, qui dort dans le même lit. Elle compte autant que celle de M. Garnier.' },
        { text: 'Si je résume : vous voulez retrouver des nuits complètes sans douleur, et un matelas qui vous convienne à tous les deux. C’est bien ça ?', answer: '4', why: 'Le vendeur redit ce qu’il a compris, puis demande à M. Garnier s’il a bien compris. C’est la dernière étape, avant de proposer un matelas.' },
        { text: 'Vous comptez garder votre sommier actuel ?', answer: '3', why: 'M. Garnier répond oui ou non. Le vendeur vérifie un détail pratique qui comptera pour choisir le matelas.' }
      ],
      keyPoint: 'À retenir : on commence large pour faire parler, on resserre sur les problèmes et les attentes, on précise avec des questions fermées ou alternatives, puis on valide. Commencer par les précisions, c’est un interrogatoire.'
    }
  };
})(globalThis);
