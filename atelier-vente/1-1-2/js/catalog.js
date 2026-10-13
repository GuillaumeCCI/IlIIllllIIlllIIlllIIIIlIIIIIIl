/* CATALOGUE DES SÉRIES ET DES EXERCICES · aucune compilation nécessaire.
 *
 * Ce fichier déclare les 4 séries et les 24 exercices du module 1-1-2 :
 * leur titre, leur illustration et leur fond. C'est le seul fichier à
 * modifier pour changer une image, un fond ou l'ordre des exercices.
 *
 * Chemins relatifs à la racine du projet. Les pages de `exercices/` les
 * préfixent automatiquement par « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  // Clé de sauvegarde commune : la progression est partagée entre toutes les
  // pages, qu'on ouvre un exercice seul ou le parcours complet. Elle diffère
  // de celle du module 1-1-1 : les deux modules ne se mélangent pas.
  storageKey: 'atelier-vente-1-1-2-v1',

  // Libellés du module, repris par l'accueil, le bilan et les pages.
  code: '1-1-2',
  title: 'Série 1-1-2',
  intro: 'Vingt-quatre exercices pour bâtir un argument, le rendre percutant, l’ajuster au client et manipuler les méthodes CAP et SONCAS.',

  // Fond affiché derrière TOUS les exercices.
  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Bâtir l’argument',
      // Corrigés issus des fiches d'activité M1.1.2 : l'écran l'indique sous
      // chaque corrigé.
      sourced: true,
      exercises: [
        { id: '1.1', file: 's1-1-1', label: 'Trouvez l’intrus', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-1.webp' },
        { id: '1.2', file: 's1-1-2', label: 'Décomposez l’argument', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-2.webp' },
        { id: '1.3', file: 's1-1-3', label: 'La fabrique à arguments', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-3.webp' },
        { id: '1.4', file: 's1-1-4', label: 'Le radar SONCAS', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-4.webp',
          image: 'assets/illustrations/s1/1-1-2-S1-i1-4.png', alt: 'Un dirigeant de PME, mains jointes, écoute avec attention derrière son bureau.', imagePosition: 'center 30%' },
        { id: '1.5', file: 's1-1-5', label: 'Le tournoi des arguments', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-5.webp',
          image: 'assets/illustrations/s1/1-1-2-S1-i1-4.png', alt: 'Un dirigeant de PME, mains jointes, écoute avec attention derrière son bureau.', imagePosition: 'center 30%' },
        { id: '1.6', file: 's1-1-6', label: 'Réparer un argumentaire', theme: 'blue', background: 'assets/backgrounds/s1/1-1-2-S1-1-6.webp' }
      ]
    },
    {
      id: 's2',
      label: 'Pitcher avec impact',
      sourced: true,
      exercises: [
        { id: '2.1', file: 's2-2-1', label: 'Mythe ou méthode ?', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-1.webp' },
        { id: '2.2', file: 's2-2-2', label: 'L’échelle de conviction', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-2.webp' },
        { id: '2.3', file: 's2-2-3', label: 'Le studio d’accroches', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-3.webp',
          image: 'assets/illustrations/s2/1-1-2-S2-i2-3.png', alt: 'Une gérante de boutique débordée remplit des formulaires à la main tout en attrapant le téléphone qui sonne.', imagePosition: 'center 30%' },
        { id: '2.4', file: 's2-2-4', label: 'La chasse aux preuves', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-4.webp' },
        { id: '2.5', file: 's2-2-5', label: 'L’audit du pitch', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-5.webp' },
        { id: '2.6', file: 's2-2-6', label: 'Le pitch de 60 secondes', theme: 'blue', background: 'assets/backgrounds/s2/1-1-2-S2-2-6.webp' }
      ]
    },
    {
      id: 's3',
      label: 'Argumenter avec justesse',
      sourced: true,
      exercises: [
        { id: '3.1', file: 's3-3-1', label: 'Repérez l’intrus', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-1.webp' },
        { id: '3.2', file: 's3-3-2', label: 'Action → Réaction', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-2.webp' },
        { id: '3.3', file: 's3-3-3', label: 'Le bon argument au bon moment', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-3.webp' },
        { id: '3.4', file: 's3-3-4', label: 'Le radar de dérive', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-4.webp' },
        { id: '3.5', file: 's3-3-5', label: 'Vérifier avant d’avancer', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-5.webp' },
        { id: '3.6', file: 's3-3-6', label: 'L’arbre des réactions', theme: 'blue', background: 'assets/backgrounds/s3/1-1-2-S3-3-6.webp' }
      ]
    },
    {
      id: 's4',
      label: 'Manipulation',
      sourced: true,
      exercises: [
        { id: '1.1', file: 's4-1-1', label: 'C, A ou P ?', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-1-1.webp' },
        { id: '1.2', file: 's4-1-2', label: 'Dérouler la chaîne CAP', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-1-2.webp' },
        { id: '2.1', file: 's4-2-1', label: 'Caractéristique ou bénéfice ?', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-2-1.webp' },
        { id: '2.2', file: 's4-2-2', label: 'Passez en mode client', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-2-2.webp' },
        { id: '3.1', file: 's4-3-1', label: 'À faire ou à éviter ?', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-3-1.webp' },
        { id: '3.2', file: 's4-3-2', label: 'Repérer la sur-argumentation', theme: 'blue', background: 'assets/backgrounds/s4/1-1-2-S4-3-2.webp' }
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
  's3-3-3': 'client-veste-verte',
  's3-3-4': 'client-pull-clair',
  's3-3-5': 'client-chignon',
  's3-3-6': 'client-cheveux-gris',
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
