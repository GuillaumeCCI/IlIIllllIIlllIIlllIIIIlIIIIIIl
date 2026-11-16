/* SÉRIE 1 · SE POSITIONNER · la grille d'auto-positionnement du module.
 *
 * Fiche M1.2.1, « Grille d'auto-positionnement · Est-ce que j'écoute
 * vraiment mon client ? ». Huit critères, trois niveaux. L'apprenant
 * remplit la colonne « Début » avant le module (exercice 1.1), puis la
 * colonne « Fin » à la fin (série 9, exercice 9.1), sans revoir la
 * première ; il compare ensuite les deux et répond aux questions « Ma
 * progression ». La fiche tutoie ; l'interface vouvoie.
 *
 * La grille est partagée : `grid` sert aux deux écrans.
 */
(function (root) {
  'use strict';

  const grid = {
    title: 'Est-ce que j’écoute vraiment mon client ?',

    // Les trois niveaux, du plus bas au plus haut (l'ordre sert à comparer).
    levels: [
      { id: '0', label: 'À retravailler' },
      { id: '1', label: 'En bonne voie' },
      { id: '2', label: 'Maîtrisé' }
    ],

    criteria: [
      { title: 'Attitudes d’écoute', text: 'Je sais nommer les 6 attitudes de Porter et reconnaître celle qu’utilise un vendeur dans une réplique.' },
      { title: 'Attitude de compréhension', text: 'Quand un client exprime un problème ou une émotion, je réponds sans juger, sans interpréter et sans proposer tout de suite une solution.' },
      { title: 'Reformulation écho', text: 'Je reprends un mot clé du client, sur un ton interrogatif, pour l’inviter à préciser.' },
      { title: 'Reformulation reflet', text: 'Je renvoie au client ce qu’il ressent ou le sens de ce qu’il dit, avec ses mots.' },
      { title: 'Reformulation synthèse', text: 'Je résume l’essentiel de ce que le client a dit, sans rien ajouter, et je lui demande de valider.' },
      { title: 'Signaux verbaux et non verbaux', text: 'Je repère les signaux du client (pressé, fermé, ému, hésitant) et je les vérifie par une question au lieu de les supposer.' },
      { title: 'Adaptation', text: 'J’ajuste mon rythme, mon ton et mon vocabulaire au profil du client et à ses réactions.' },
      { title: 'Posture d’écoute', text: 'Je laisse parler le client, je ne lui coupe pas la parole et je ne glisse pas vers l’argumentation pendant la découverte.' }
    ],

    /* « Ma progression », à remplir à la fin du module. */
    questions: [
      { id: 'q1', label: 'Sur quel critère avez-vous le plus progressé ?', sub: 'Donnez un exemple précis tiré d’une activité.', placeholder: 'Ex. : la reformulation reflet. Dans « Le reflet », j’ai…' },
      { id: 'q2', label: 'Quel critère reste « À retravailler » ou « En bonne voie » ?', sub: 'Un seul suffit : celui qui vous semble le plus utile à travailler.', placeholder: 'Le critère, et ce qui vous gêne encore…' },
      { id: 'q3', label: 'Quelle activité allez-vous refaire pour le travailler ?', sub: 'Aidez-vous du tableau « Si vous voulez retravailler… ».', placeholder: 'L’activité, et ce que vous y ferez autrement…' }
    ],

    /* « Si tu veux retravailler… Refais… » : `serie` renvoie à la série du
     * module qui porte l'activité. Tant qu'elle n'est pas en ligne, la ligne
     * s'affiche sans lien. */
    redo: [
      { topic: 'Attitudes d’écoute, attitude de compréhension', activity: 'A1 · Qui parle comme ça ?', serie: 's2' },
      { topic: 'Reformulation écho, reflet, synthèse', activity: 'A2 · À vous de reformuler', serie: 's3' },
      { topic: 'Signaux verbaux et non verbaux', activity: 'A3 · Rendez-vous en agence', serie: 's4' },
      { topic: 'Adaptation, posture d’écoute', activity: 'A4 · Trois commerciaux, une cliente pressée', serie: 's5' },
      { topic: 'Tous les critères ensemble', activity: 'A5 avec une autre fiche client', serie: 's6' }
    ]
  };

  root.ATELIER_S1 = {
    grid,

    /* ── 1.1 · Mon point de départ (colonne « Début ») ─────────────────── */
    '1.1': {
      eyebrow: 'Se positionner · Début du module',
      title: grid.title,
      subtitle: 'Pour chaque critère, cochez votre niveau aujourd’hui. Soyez honnête : personne ne vous note, c’est votre point de départ.',
      submit: 'Enregistrer mon point de départ',
      after: 'Votre point de départ est enregistré. À la fin du module, vous remplirez la même grille sans revoir celle-ci, puis vous verrez ce qui a bougé.'
    }
  };
})(globalThis);
