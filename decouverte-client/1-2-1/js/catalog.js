/* CATALOGUE DES SÉRIES ET DES EXERCICES · module 1-2-1, aucune compilation.
 *
 * Découverte client · Pratiquer l'écoute active et s'adapter au client
 * (fiche M1.2.1). Ce fichier déclare les séries et les exercices : leur
 * titre, leur mécanique et leur fond. C'est le seul fichier à modifier pour
 * changer l'ordre des exercices ou ajouter une illustration.
 *
 * `mount` indique la mécanique (voir moteur/js/mounts.js) ; le contenu est
 * dans js/content-<série>.js, à l'entrée `id`. Les pages de `exercices/`
 * préfixent les chemins par « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  // Clé de sauvegarde propre au module : il ne se mélange à aucun autre.
  storageKey: 'decouverte-client-1-2-1-v1',

  code: '1-2-1',
  title: 'Écoute active · module 1-2-1',
  intro: 'Reconnaître les attitudes d’écoute, reformuler sans rien ajouter, repérer les signaux du client et adapter sa posture.',

  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Se positionner',
      // Grille d'auto-positionnement, colonne « Début » : fiche M1.2.1.
      // La grille est dans js/content-s1.js ; sa colonne « Fin » est la série s9.
      sourced: true,
      exercises: [
        { id: '1.1', file: 's1-1-1', label: 'Mon point de départ', theme: 'blue' }
      ]
    },
    {
      id: 's2',
      label: 'Les attitudes d’écoute',
      // Situations 1 et 2 et leurs corrigés : fiche M1.2.1, activité A1.
      // La situation 3 (agence immobilière) s'y ajoute.
      sourced: true,
      exercises: [
        { id: '2.1', file: 's2-2-1', image: 'assets/illustrations/dialogues/magasin.webp', alt: 'Dans un magasin, un vendeur répond à une cliente qui l’écoute, la main sous le menton.', label: 'Au magasin', theme: 'blue', mount: 'form' },
        { id: '2.2', file: 's2-2-2', image: 'assets/illustrations/dialogues/entreprise.webp', alt: 'Dans un atelier, une commerciale explique quelque chose à un client qui l’écoute, sceptique.', label: 'En entreprise', theme: 'blue', mount: 'form' },
        { id: '2.3', file: 's2-2-3', image: 'assets/illustrations/dialogues/agence.webp', alt: 'À une table de rendez-vous, une conseillère présente un document sur sa tablette à un client pensif.', label: 'À l’agence immobilière', theme: 'blue', mount: 'form' }
      ]
    },
    {
      id: 's3',
      label: 'Reformuler',
      // Écho, reflet, synthèse et « l'intrus » : fiche M1.2.1, activité A2.
      // Chaque exercice compte plusieurs clients (la fiche n'en donne qu'un).
      sourced: true,
      exercises: [
        { id: '3.1', file: 's3-3-1', label: 'L’écho', theme: 'blue', mount: 'form' },
        { id: '3.2', file: 's3-3-2', label: 'Le reflet', theme: 'blue', mount: 'form' },
        { id: '3.3', file: 's3-3-3', label: 'La synthèse', theme: 'blue', mount: 'form' },
        { id: '3.4', file: 's3-3-4', image: 'assets/illustrations/dialogues/reformulation.webp', alt: 'Un vendeur montre quelque chose sur sa tablette à une cliente qui l’écoute attentivement.', label: 'Reformulation, ou pas ?', theme: 'blue', mount: 'form' }
      ]
    },
    {
      id: 's4',
      label: 'Analyser un entretien',
      // Le rendez-vous des Benali et son corrigé : fiche M1.2.1, activité A3.
      sourced: true,
      exercises: [
        { id: '4.1', file: 's4-4-1', label: 'Les attitudes de Nadia', theme: 'blue', mount: 'form', image: 'assets/illustrations/dialogues/rendez-vous-benali.webp', alt: 'Dans une agence, un couple écoute, attentif, une conseillère qui montre des plans et des annonces.' },
        { id: '4.2', file: 's4-4-2', label: 'Les signaux manqués', theme: 'blue', mount: 'form', image: 'assets/illustrations/dialogues/rendez-vous-benali.webp', alt: 'Dans une agence, un couple écoute, attentif, une conseillère qui montre des plans et des annonces.' },
        { id: '4.3', file: 's4-4-3', label: 'Pourquoi la fin de l’entretien change tout', theme: 'blue', mount: 'form', image: 'assets/illustrations/dialogues/rendez-vous-benali.webp', alt: 'Dans une agence, un couple écoute, attentif, une conseillère qui montre des plans et des annonces.' },
        { id: '4.4', file: 's4-4-4', label: 'Réécrire « Comme tout le monde ! »', theme: 'blue', mount: 'form', image: 'assets/illustrations/dialogues/rendez-vous-benali.webp', alt: 'Dans une agence, un couple écoute, attentif, une conseillère qui montre des plans et des annonces.' }
      ]
    },
    {
      id: 's5',
      label: 'Évaluer une posture',
      // Mme Royer et ses trois commerciaux, grille et corrigé : fiche M1.2.1, activité A4.
      sourced: true,
      exercises: [
        { id: '5.1', file: 's5-5-1', label: 'Trois commerciaux, une cliente pressée', theme: 'blue' }
      ]
    },
    {
      id: 's6',
      label: 'À vous de répondre',
      // Trois fiches client (Garnier, Lefort, Duval), grille et corrigés : fiche M1.2.1, activité A5.
      sourced: true,
      exercises: [
        { id: '6.1', file: 's6-6-1', label: 'Votre réponse, votre voix', theme: 'blue' }
      ]
    },
    {
      id: 's9',
      label: 'Faire le point',
      // Grille d'auto-positionnement, colonne « Fin », et « Ma progression » :
      // fiche M1.2.1. Toujours la dernière série : A4 (s5), A5 (s6) et la
      // synthèse optionnelle se placeront avant elle.
      sourced: true,
      exercises: [
        { id: '9.1', file: 's9-9-1', label: 'Mon point d’arrivée', theme: 'blue' }
      ]
    }
  ]
};

/* LES PORTRAITS DES CARTES « CITATION CLIENT » (une ligne par page).
 * Portraits disponibles, dans assets/illustrations/clients/ : client-tasse,
 * client-cheveux-gris, client-chignon, client-pull-clair, client-veste-verte. */
window.ATELIER_CATALOG.portraits = {
  default: 'client-tasse'
};

/* Index pratique : liste à plat de tous les exercices, dans l'ordre du parcours.
 * Chaque entrée reçoit `key` (« s2-2.1 »), `series` et `seriesLabel`. */
window.ATELIER_CATALOG.all = window.ATELIER_CATALOG.series.flatMap(serie =>
  serie.exercises.map(exercise => Object.assign({}, exercise, {
    key: `${serie.id}-${exercise.id}`,
    series: serie.id,
    seriesLabel: serie.label,
    sourced: serie.sourced === true
  }))
);
