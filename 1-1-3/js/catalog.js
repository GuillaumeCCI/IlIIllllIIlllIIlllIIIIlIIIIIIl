/* CATALOGUE DES SÉRIES ET DES EXERCICES · aucune compilation nécessaire.
 *
 * Ce fichier déclare les 3 séries et les 18 exercices du module 1-1-3 :
 * leur titre, leur illustration et leur fond. C'est le seul fichier à
 * modifier pour changer une image, un fond ou l'ordre des exercices.
 *
 * Chemins relatifs à la racine du projet. Les pages de `exercices/` les
 * préfixent automatiquement par « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  // Clé de sauvegarde commune : la progression est partagée entre toutes les
  // pages, qu'on ouvre un exercice seul ou le parcours complet. Elle diffère
  // de celles des modules 1-1-1 et 1-1-2 : les modules ne se mélangent pas.
  storageKey: 'atelier-vente-1-1-3-v1',

  // Libellés du module, repris par l'accueil, le bilan et les pages.
  code: '1-1-3',
  title: 'Série 1-1-3',
  intro: 'Dix-huit exercices pour accueillir et traiter les objections, garder la main au téléphone et manipuler la méthode de traitement en six étapes.',

  // Fond affiché derrière TOUS les exercices.
  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Gérer les objections',
      // Corrigés issus des fiches d'activité M1.1.3 : l'écran l'indique sous
      // chaque corrigé.
      sourced: true,
      exercises: [
        { id: '1.1', file: 's1-1-1', label: 'Bon réflexe ou à éviter ?', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-1.webp' },
        { id: '1.2', file: 's1-1-2', label: 'À chaque étape, son rôle', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-2.webp' },
        { id: '1.3', file: 's1-1-3', label: 'Écoutez le client', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-3.webp' },
        { id: '1.4', file: 's1-1-4', label: 'Ce qui n’est pas dit', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-4.webp',
          image: 'assets/illustrations/s1/1-1-3-S1-i1-4.png', alt: 'Dans un magasin de décoration, un client quitte la boutique d’un geste de la main pendant que la commerciale, au téléphone, désigne un calendrier.', imagePosition: 'center 40%' },
        { id: '1.5', file: 's1-1-5', label: 'Face au « C’est trop cher »', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-5.webp',
          image: 'assets/illustrations/s1/1-1-3-S1-i1-5.png', alt: 'Un client lève la main et désigne une lampe d’un air sceptique ; la vendeuse, derrière le comptoir, l’écoute.', imagePosition: 'center 35%' },
        { id: '1.6', file: 's1-1-6', label: 'Répondre en 6 étapes', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-6.webp' },
        { id: '1.7', file: 's1-1-7', label: 'Ma bibliothèque d’objections', theme: 'blue', background: 'assets/backgrounds/s1/1-1-3-S1-1-7.webp' }
      ]
    },
    {
      id: 's2',
      label: 'Prospection téléphonique',
      sourced: true,
      exercises: [
        { id: '2.1', file: 's2-2-1', label: 'Barrage, prétexte ou vraie objection ?', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-1.webp' },
        { id: '2.2', file: 's2-2-2', label: 'À chaque erreur sa conséquence', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-2.webp' },
        { id: '2.3', file: 's2-2-3', label: 'Franchir le standard en douceur', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-3.webp' },
        { id: '2.4', file: 's2-2-4', label: 'Repérer les erreurs de prospection', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-4.webp',
          image: 'assets/illustrations/s2/1-1-3-S2-i2-4.png', alt: 'Une cliente au téléphone, dans un showroom de mobilier de bureau, fronce les sourcils et fait un geste d’incompréhension.', imagePosition: 'center 25%' },
        { id: '2.5', file: 's2-2-5', label: 'Garder la main face à la demande de doc', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-5.webp' },
        { id: '2.6', file: 's2-2-6', label: 'Le script de rebond', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-6.webp' },
        { id: '2.7', file: 's2-2-7', label: 'Construisez vos cartes réflexes', theme: 'blue', background: 'assets/backgrounds/s2/1-1-3-S2-2-7.webp' }
      ]
    },
    {
      id: 's3',
      label: 'Manipulation',
      sourced: true,
      exercises: [
        { id: '1.1', file: 's3-1-1', label: 'Dans le bon ordre', theme: 'blue', background: 'assets/backgrounds/s3/1-1-3-S3-1-1.webp' },
        { id: '1.2', file: 's3-1-2', label: 'Le crash-test de l’objection prix', theme: 'blue', background: 'assets/backgrounds/s3/1-1-3-S3-1-2.webp' },
        { id: '2.1', file: 's3-2-1', label: 'À chaque objection, sa nature', theme: 'blue', background: 'assets/backgrounds/s3/1-1-3-S3-2-1.webp' },
        { id: '2.2', file: 's3-2-2', label: 'Passez en mode traitement', theme: 'blue', background: 'assets/backgrounds/s3/1-1-3-S3-2-2.webp' }
      ]
    }
  ]
};

/* LES PORTRAITS DES CARTES « CITATION CLIENT » (une ligne par page).
 * Changer un portrait : remplacer son nom. Portraits disponibles, dans
 * assets/illustrations/clients/ : client-tasse, client-cheveux-gris,
 * client-chignon, client-pull-clair, client-veste-verte. Une liste
 * ['…', '…'] donne un portrait par cas, dans l'ordre. `default` sert
 * aux pages non listées. */
window.ATELIER_CATALOG.portraits = {
  default: 'client-tasse',
  's1-1-3': ['client-pull-clair', 'client-tasse', 'client-chignon', 'client-cheveux-gris'],
  's2-2-5': 'client-tasse',
  's2-2-6': ['client-tasse', 'client-chignon', 'client-cheveux-gris'],
  's3-2-2': ['client-cheveux-gris', 'client-chignon', 'client-pull-clair'],
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
