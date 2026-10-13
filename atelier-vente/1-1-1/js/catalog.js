/* CATALOGUE DES SÉRIES ET DES EXERCICES · aucune compilation nécessaire.
 *
 * Ce fichier déclare les 4 séries et les 23 exercices : leur titre, leur thème
 * de couleur, leur illustration et leur fond. C'est le seul fichier à modifier
 * pour changer une image, un fond ou l'ordre des exercices.
 *
 * Chemins relatifs à la racine du projet. Les pages de `exercices/` les
 * préfixent automatiquement par « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  code: '1-1-1',
  title: 'Série 1-1-1',
  intro: 'Vingt-trois exercices pour s’entraîner à la prise de contact, à l’écoute active, à la gestion des objections et à la manipulation des méthodes.',
  // Clé de sauvegarde commune : la progression est partagée entre toutes les
  // pages, qu'on ouvre un exercice seul ou le parcours complet.
  storageKey: 'atelier-vente-1-1-1-v2',

  // Fond affiché derrière TOUS les exercices. Remplacez ce PNG pour habiller
  // l'ensemble du parcours d'un coup.
  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Prise de contact',
      // Corrigés issus de la fiche « Reconstruire une ouverture d'entretien réussie ».
      sourced: true,
      eyebrow: 'Série 1 · Prise de contact',
      // Accueil du thème (intégration LMS, ?theme=s1) : le décor du titre, et
      // la vignette de chaque exercice (champ `thumb` ci-dessous).
      cover: 'assets/illustrations/s1/accueil/poignee-de-main.webp',
      exercises: [
        { id: 'A', file: 's1-a', label: 'Analyser', thumb: 'assets/illustrations/s1/accueil/a.webp', theme: 'blue', image: 'assets/illustrations/s1/1-1-1-iB.png', alt: 'Une conseillère présente une offre à un client autour d’une table.', background: 'assets/backgrounds/s1/1-1-1-A.webp', imagePosition: 'center' },
        { id: 'B', file: 's1-b', label: 'S’adapter', thumb: 'assets/illustrations/s1/accueil/b.webp', theme: 'blue', image: 'assets/illustrations/s1/1-1-1-iA.png', alt: 'Un client regarde sa montre à l’entrée d’une boutique, face à une vendeuse.', background: 'assets/backgrounds/s1/1-1-1-B.webp', imagePosition: 'center' },
        { id: 'C', file: 's1-c', label: 'Comparer', thumb: 'assets/illustrations/s1/accueil/c.webp', theme: 'blue', background: 'assets/backgrounds/s1/1-1-1-C.webp' },
        { id: 'D', file: 's1-d', label: 'Construire', thumb: 'assets/illustrations/s1/accueil/d.webp', theme: 'blue', background: 'assets/backgrounds/s1/1-1-1-D.webp' },
        { id: 'E1', file: 's1-e1', label: 'Garder le lien', thumb: 'assets/illustrations/s1/accueil/e1.webp', theme: 'purple', image: 'assets/illustrations/s1/1-1-1-iE1.png', alt: 'Une conseillère poursuit un échange en visioconférence alors que la caméra du prospect est coupée.', background: 'assets/backgrounds/s1/1-1-1-E1.webp', imagePosition: 'center' },
        { id: 'E2', file: 's1-e2', label: 'Aller à l’essentiel', thumb: 'assets/illustrations/s1/accueil/e2.webp', theme: 'magenta', image: 'assets/illustrations/s1/1-1-1-iE2.png', alt: 'Deux personnes échangent autour d’une table devant un grand chronomètre.', background: 'assets/backgrounds/s1/1-1-1-E2.webp', imagePosition: 'center' },
        { id: 'E3', file: 's1-e3', label: 'Prendre l’initiative', thumb: 'assets/illustrations/s1/accueil/e3.webp', theme: 'magenta', image: 'assets/illustrations/s1/1-1-1-iE3.png', alt: 'Une conseillère présente un nuancier à un client dans un espace accueillant.', background: 'assets/backgrounds/s1/1-1-1-E3.webp', imagePosition: 'center' },
        { id: 'F', file: 's1-f', label: 'Changer de canal', thumb: 'assets/illustrations/s1/accueil/f.webp', theme: 'magenta', image: 'assets/illustrations/s1/1-1-1-iF.png', alt: 'Trois façons d’échanger : en face-à-face, par téléphone et par e-mail.', background: 'assets/backgrounds/s1/1-1-1-F.webp', imagePosition: 'center' }
      ]
    },
    {
      id: 's2',
      label: 'Écoute active',
      // Corrigés issus de la fiche « Choisir la bonne attitude d'écoute ».
      sourced: true,
      eyebrow: 'Série 2 · Écoute active',
      exercises: [
        // L'écran A affiche les trois illustrations côte à côte, une par client.
        { id: 'A', file: 's2-a', label: 'Choisir la réponse juste', theme: 'blue', background: 'assets/backgrounds/s2/1-1-1-S2-A.webp',
          gallery: [
            { image: 'assets/illustrations/s2/1-1-1-S2-iA1.png', alt: 'Une cliente pressée traverse la boutique en regardant sa montre.' },
            { image: 'assets/illustrations/s2/1-1-1-S2-iA2.png', alt: 'Une cliente méfiante écoute un vendeur derrière son comptoir, les bras repliés.' },
            { image: 'assets/illustrations/s2/1-1-1-S2-iA3.png', alt: 'Une cliente hésitante tient un panier devant un rayon de petit électroménager.' }
          ] },
        { id: 'B', file: 's2-b', label: 'Reformuler sans dévier', theme: 'blue', background: 'assets/backgrounds/s2/1-1-1-S2-B.webp' },
        { id: 'D', file: 's2-d', label: 'Les 6 attitudes de Porter', theme: 'blue', background: 'assets/backgrounds/s2/1-1-1-S2-D.webp' },
        { id: 'F', file: 's2-f', label: 'Adapter son écoute', theme: 'blue', background: 'assets/backgrounds/s2/1-1-1-S2-F.webp',
          gallery: [
            { image: 'assets/illustrations/s2/1-1-1-S2-iC.png', alt: 'Un vendeur enthousiaste déroule son argumentaire pendant qu’un client s’éloigne, la main levée.' },
            { image: 'assets/illustrations/s2/1-1-1-S2-iE.png', alt: 'Une vendeuse présente un nuancier tandis qu’une cliente s’écarte du comptoir.' },
            { image: 'assets/illustrations/s2/1-1-1-S2-iA2.png', alt: 'Une cliente silencieuse croise les bras face à un vendeur qui explique.' }
          ] }
      ]
    },
    {
      id: 's3',
      label: 'Gestion des objections',
      // Corrigés repris de la fiche M1.1.3 « Répondre efficacement aux
      // objections » (exercices 1.1 à 1.7), identiques à ceux de cette série.
      sourced: true,
      eyebrow: 'Série 3 · Gestion des objections',
      exercises: [
        { id: '1.1', file: 's3-1-1', label: 'Les bons réflexes', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-1.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-1.png", alt: "Un commercial écoute une objection sans interrompre son client.", pending: true },
        { id: '1.2', file: 's3-1-2', label: 'Chaque étape, son rôle', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-2.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-2.png", alt: "Les six étapes du traitement d’une objection, de l’accueil à l’enchaînement.", pending: true },
        { id: '1.3', file: 's3-1-3', label: 'Diagnostiquer l’objection', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-3.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-3.png", alt: "Un commercial cherche à cerner la nature réelle de l’objection de son client.", pending: true },
        { id: '1.4', file: 's3-1-4', label: 'Derrière le prétexte', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-4.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-4.png", alt: "Un client repousse la discussion sans expliquer ce qui le freine.", pending: true },
        { id: '1.5', file: 's3-1-5', label: 'La réponse la plus juste', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-5.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-5.png", alt: "Un client songeur déclare « c’est trop cher » devant un rayon étiqueté 12,90 euros." },
        { id: '1.6', file: 's3-1-6', label: 'Traitement complet', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-6.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-6.png", alt: "Un commercial construit sa réponse à une objection, étape par étape.", pending: true },
        { id: '1.7', file: 's3-1-7', label: 'Vos cartes réflexes', theme: 'blue', background: 'assets/backgrounds/s3/1-1-1-S3-1-7.webp', image: "assets/illustrations/s3/1-1-1-S3-i1-7.png", alt: "Des cartes réflexes préparées pour répondre aux objections les plus fréquentes.", pending: true }
      ]
    },
    {
      id: 's4',
      label: 'Manipulation',
      // Corrigés issus de la fiche « Manipulation des connaissances ».
      sourced: true,
      eyebrow: 'Série 4 · Manipulation',
      exercises: [
        { id: '1.1', file: 's4-1-1', label: 'Remettre dans l’ordre', theme: 'blue', background: 'assets/backgrounds/s4/1-1-1-S4-1-1.webp', image: "assets/illustrations/s4/1-1-1-S4-i1-1.png", alt: "Les phrases d’une ouverture d’entretien, à remettre dans l’ordre.", pending: true },
        { id: '1.2', file: 's4-1-2', label: 'Repérer ce qui cloche', theme: 'blue', background: 'assets/backgrounds/s4/1-1-1-S4-1-2.webp', image: "assets/illustrations/s4/1-1-1-S4-i1-2.png", alt: "Une ouverture d’entretien maladroite, dont les passages fautifs sont à repérer.", pending: true },
        { id: '2.1', file: 's4-2-1', label: 'Associer les attitudes', theme: 'blue', background: 'assets/backgrounds/s4/1-1-1-S4-2-1.webp', image: "assets/illustrations/s4/1-1-1-S4-i2-1.png", alt: "Six réponses de commercial, à classer selon les attitudes d’écoute de Porter.", pending: true },
        { id: '2.2', file: 's4-2-2', label: 'Réparer la conversation', theme: 'blue', background: 'assets/backgrounds/s4/1-1-1-S4-2-2.webp', image: "assets/illustrations/s4/1-1-1-S4-i2-2.png", alt: "Un échange qui tourne court, à réparer par une reformulation.", pending: true }
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
  's2-b': 'client-cheveux-gris',
  's2-d': 'client-chignon',
  's3-1-6': 'client-tasse',
};

/* Index pratique : liste à plat de tous les exercices, dans l'ordre du parcours.
 * Chaque entrée reçoit `key` (« s2-A »), `series` et `seriesLabel`. */
window.ATELIER_CATALOG.all = window.ATELIER_CATALOG.series.flatMap(serie =>
  serie.exercises.map(exercise => Object.assign({}, exercise, {
    key: `${serie.id}-${exercise.id}`,
    series: serie.id,
    seriesLabel: serie.label,
    sourced: serie.sourced === true
  }))
);
