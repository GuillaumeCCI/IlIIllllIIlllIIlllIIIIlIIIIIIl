/* CATALOGUE DES SÉRIES ET DES EXERCICES · aucune compilation nécessaire.
 *
 * Ce fichier déclare les 5 séries et les 34 exercices du module 1-1-4 :
 * leur titre, leur mécanique, leur illustration et leur fond. C'est le seul
 * fichier à modifier pour changer une image, un fond ou l'ordre des
 * exercices.
 *
 * `mount` indique la mécanique (voir js/mounts.js) et `content` l'entrée
 * du fichier de contenu. Les pages de `exercices/` préfixent les chemins par
 * « ../ » ; ne mettez donc jamais « ../ » ici.
 */
window.ATELIER_CATALOG = {
  // Clé de sauvegarde propre au module : 1-1-1, 1-1-2, 1-1-3 et 1-1-4 ne
  // se mélangent pas.
  storageKey: 'atelier-vente-1-1-4-v1',

  code: '1-1-4',
  title: 'Série 1-1-4',
  intro: 'Trente-quatre exercices pour annoncer le prix avec assurance, le défendre sans le brader, conclure au bon moment et relancer avec de la valeur.',

  commonBackground: 'assets/backgrounds/commun.webp',

  series: [
    {
      id: 's1',
      label: 'Annoncer le prix',
      // Corrigés issus des fiches d'activité M1.1.4 : l'écran l'indique sous
      // chaque corrigé.
      sourced: true,
      exercises: [
        { id: '1.1', file: 's1-1-1', label: 'L’art d’annoncer le prix', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s1/1-1-4-S1-1-1.webp' },
        { id: '1.2', file: 's1-1-2', label: 'La méthode sandwich', theme: 'blue', background: 'assets/backgrounds/s1/1-1-4-S1-1-2.webp' },
        { id: '1.4', file: 's1-1-4', label: 'Le prix arrive trop tôt', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s1/1-1-4-S1-1-4.webp' },
        { id: '1.5', file: 's1-1-5', label: 'Le duel des annonces', theme: 'blue', mount: 'compare', background: 'assets/backgrounds/s1/1-1-4-S1-1-5.webp' },
        { id: '1.7', file: 's1-1-7', label: 'Ma banque d’annonces', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s1/1-1-4-S1-1-7.webp' }
      ]
    },
    {
      id: 's2',
      label: 'Défendre le prix',
      sourced: true,
      exercises: [
        { id: '2.1', file: 's2-2-1', label: 'Défendre son prix sans le brader', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s2/1-1-4-S2-2-1.webp' },
        { id: '2.2', file: 's2-2-2', label: 'Quel levier dans cette réponse ?', theme: 'blue', mount: 'match', background: 'assets/backgrounds/s2/1-1-4-S2-2-2.webp' },
        { id: '2.3', file: 's2-2-3', label: 'Le prix, remis à l’échelle', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s2/1-1-4-S2-2-3.webp',
          gallery: [
            { image: 'assets/illustrations/s2/1-1-4-S2-i2-3-A.png', alt: 'Offre 1 : siège ergonomique à 690 €, soit environ 0,38 € par jour sur 5 ans.' },
            { image: 'assets/illustrations/s2/1-1-4-S2-i2-3-B.png', alt: 'Offre 2 : pack de 10 postes à 17 000 €, soit 1 700 € par poste.' }
          ] },
        { id: '2.4', file: 's2-2-4', label: 'Quatre faux pas face au prix', theme: 'blue', background: 'assets/backgrounds/s2/1-1-4-S2-2-4.webp' },
        { id: '2.5', file: 's2-2-5', label: 'Deux réponses, laquelle tient ?', theme: 'blue', mount: 'compare', background: 'assets/backgrounds/s2/1-1-4-S2-2-5.webp' },
        { id: '2.6', file: 's2-2-6', label: 'Ton kit de défense du prix', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s2/1-1-4-S2-2-6.webp' },
        { id: '2.7', file: 's2-2-7', label: 'Défendre la valeur', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s2/1-1-4-S2-2-7.webp' }
      ]
    },
    {
      id: 's3',
      label: 'Conclure la vente',
      sourced: true,
      exercises: [
        { id: '3.1', file: 's3-3-1', label: 'Attrape le bon signal !', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s3/1-1-4-S3-3-1.webp' },
        { id: '3.2', file: 's3-3-2', label: 'À chaque conclusion, sa réplique', theme: 'blue', mount: 'match', background: 'assets/backgrounds/s3/1-1-4-S3-3-2.webp' },
        { id: '3.3', file: 's3-3-3', label: 'À vous de conclure !', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s3/1-1-4-S3-3-3.webp',
          gallery: [
            { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-A.png', alt: 'Une cliente demande si la livraison est possible avant la fin du mois.' },
            { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-B.png', alt: 'Un client compare deux implantations de bureaux.' },
            { image: 'assets/illustrations/s3/1-1-4-S3-i3-3-C.png', alt: 'Le client et le commercial se serrent la main.' }
          ] },
        { id: '3.4', file: 's3-3-4', label: 'Le signal qui méritait une réponse', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s3/1-1-4-S3-3-4.webp' },
        { id: '3.5', file: 's3-3-5', label: 'Comparer deux façons de conclure', theme: 'blue', mount: 'compare', background: 'assets/backgrounds/s3/1-1-4-S3-3-5.webp',
          image: 'assets/illustrations/s3/1-1-4-S3-i3-5.png', alt: 'Dans une boutique, un client demande quand il pourrait démarrer.', imagePosition: 'center 30%' },
        { id: '3.6', file: 's3-3-6', label: 'Conduire la fin du rendez-vous', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s3/1-1-4-S3-3-6.webp',
          image: 'assets/illustrations/s3/1-1-4-S3-i3-6.png', alt: 'Le client demande si les 10 postes pourraient être installés avant la fin du mois.', imagePosition: 'center 30%' },
        { id: '3.7', file: 's3-3-7', label: 'Construire sa boîte à conclusions', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s3/1-1-4-S3-3-7.webp' }
      ]
    },
    {
      id: 's4',
      label: 'Relancer',
      sourced: true,
      exercises: [
        { id: '4.1', file: 's4-4-1', label: 'Le Vrai / Faux de la relance', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s4/1-1-4-S4-4-1.webp' },
        { id: '4.2', file: 's4-4-2', label: 'L’anatomie d’une relance', theme: 'blue', mount: 'match', background: 'assets/backgrounds/s4/1-1-4-S4-4-2.webp' },
        { id: '4.3', file: 's4-4-3', label: 'Trouver l’élément de valeur', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s4/1-1-4-S4-4-3.webp' },
        { id: '4.4', file: 's4-4-4', label: 'Analyser une relance à jeter', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s4/1-1-4-S4-4-4.webp' },
        { id: '4.5', file: 's4-4-5', label: 'À vous de trancher !', theme: 'blue', mount: 'compare', background: 'assets/backgrounds/s4/1-1-4-S4-4-5.webp' },
        { id: '4.6', file: 's4-4-6', label: 'Construire la stratégie', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s4/1-1-4-S4-4-6.webp' },
        { id: '4.7', file: 's4-4-7', label: 'Créer votre modèle', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s4/1-1-4-S4-4-7.webp' }
      ]
    },
    {
      id: 's5',
      label: 'Manipulation',
      sourced: true,
      exercises: [
        { id: '1.1', file: 's5-1-1', label: 'Annoncer le prix avec assurance', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s5/1-1-4-S5-1-1.webp' },
        { id: '1.2', file: 's5-1-2', label: 'À vous d’annoncer le prix', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s5/1-1-4-S5-1-2.webp' },
        { id: '2.1', file: 's5-2-1', label: 'Valoriser ou brader ?', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s5/1-1-4-S5-2-1.webp' },
        { id: '2.2', file: 's5-2-2', label: 'Défendre le prix', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s5/1-1-4-S5-2-2.webp',
          image: 'assets/illustrations/s5/1-1-4-S5-i2-2.png', alt: 'Une cliente lit un devis, songeuse, face à un artisan.', imagePosition: 'center 30%' },
        { id: '3.1', file: 's5-3-1', label: 'Signal d’achat ou pas ?', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s5/1-1-4-S5-3-1.webp' },
        { id: '3.2', file: 's5-3-2', label: 'À vous de conclure', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s5/1-1-4-S5-3-2.webp',
          image: 'assets/illustrations/s5/1-1-4-S5-i3-2.png', alt: 'Une cliente demande au commerçant quand elle pourrait démarrer.', imagePosition: 'center 30%' },
        { id: '4.1', file: 's5-4-1', label: 'Les bons réflexes de relance', theme: 'blue', mount: 'deck', background: 'assets/backgrounds/s5/1-1-4-S5-4-1.webp' },
        { id: '4.2', file: 's5-4-2', label: 'Rédigez votre relance', theme: 'blue', mount: 'form', background: 'assets/backgrounds/s5/1-1-4-S5-4-2.webp' }
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
  's2-2-5': 'client-cheveux-gris',
  's2-2-6': 'client-chignon',
  's2-2-7': 'client-pull-clair',
  's5-1-2': 'client-tasse',
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
