/* CATALOGUE DES SÉRIES ET DES EXERCICES · module 1-2-2, aucune compilation.
 *
 * Découverte client · Questionner pour identifier les besoins et les
 * motivations d'achat (fiche M1.2.2). Ce fichier déclare les séries et les
 * exercices : leur titre, leur mécanique et leur fond. C'est le seul fichier
 * à modifier pour changer l'ordre des exercices ou ajouter une illustration.
 *
 * `mount` indique la mécanique (voir moteur/js/mounts.js) ; sans `mount`,
 * l'exercice a son écran propre (js/screens/). Le contenu est dans
 * js/content-<série>.js, à l'entrée `id`. Les pages de `exercices/`
 * préfixent les chemins par « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  // Clé de sauvegarde propre au module : il ne se mélange à aucun autre.
  storageKey: 'decouverte-client-1-2-2-v1',

  code: '1-2-2',
  title: 'Questionnement · module 1-2-2',
  intro: 'Poser la bonne question au bon moment, faire émerger le besoin réel, repérer les motivations d’achat et préparer sa découverte.',

  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Se positionner',
      // Grille d'auto-positionnement, colonne « Début » : fiche M1.2.2.
      sourced: true,
      exercises: [
        { id: '1.1', file: 's1-1-1', label: 'Mon point de départ', theme: 'blue' }
      ]
    },
    {
      id: 's2',
      label: 'Poser la bonne question',
      // Les types de questions et l'entonnoir, corrigés : fiche M1.2.2, activité A1.
      sourced: true,
      exercises: [
        { id: '2.1', file: 's2-2-1', label: 'Quel type de question ?', theme: 'blue', mount: 'deck' },
        { id: '2.2', file: 's2-2-2', label: 'Les étages de l’entonnoir', theme: 'blue', mount: 'deck' }
      ]
    },
    {
      id: 's3',
      label: 'Le besoin réel',
      // Cinq clients, explicite / implicite / question, corrigé : fiche M1.2.2, activité A2.
      sourced: true,
      exercises: [
        { id: '3.1', file: 's3-3-1', label: 'Du besoin exprimé au besoin réel', theme: 'blue', mount: 'form' }
      ]
    },
    {
      id: 's4',
      label: 'Les motivations d’achat',
      // SONCASE et les Benali, corrigés : fiche M1.2.2, activité A3.
      sourced: true,
      exercises: [
        { id: '4.1', file: 's4-4-1', label: 'Les mots qui trahissent les motivations', theme: 'blue', mount: 'form' },
        { id: '4.2', file: 's4-4-2', label: 'Retour chez les Benali', theme: 'blue', mount: 'form' }
      ]
    },
    {
      id: 's9',
      label: 'Faire le point',
      // Grille d'auto-positionnement, colonne « Fin », et « Ma progression ».
      // Toujours la dernière série.
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
