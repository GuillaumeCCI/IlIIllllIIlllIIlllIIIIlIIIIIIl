/* SÉRIE 4 · MANIPULATION · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Les cartes 2 à 6 de « À faire ou
 * à éviter ? », les réponses attendues et les corrigés viennent de la fiche
 * « Activités 1 à 3, Manipulation des connaissances » (M1.1.2), transposée
 * au vouvoiement.
 */
window.ATELIER_S4 = {
  /* ── 1.1 · Caractéristique, avantage ou preuve ? ────────────────────── */
  '1.1': {
    eyebrow: 'Exercice 1.1',
    title: 'Caractéristique, avantage ou preuve ?',
    subtitle: 'Identifiez la nature de chaque argument commercial.',
    legend: [
      { id: 'C', label: 'Caractéristique', text: 'Ce que le produit fait', tone: 'c' },
      { id: 'A', label: 'Avantage', text: 'Ce que le client gagne', tone: 'a' },
      { id: 'P', label: 'Preuve', text: 'Ce qui crédibilise la promesse', tone: 'p' }
    ],
    instruction: 'Pour chaque affirmation, choisissez C, A ou P.',
    items: [
      { text: 'Vous ne perdez jamais vos données clients.', answer: 'A', why: 'Elle dit ce que le client y gagne.' },
      { text: 'Assistance téléphonique 7j/7.', answer: 'C', why: 'Un service fourni, décrit sans son effet pour le client.' },
      { text: 'Utilisé par plus de 5 000 PME.', answer: 'P', why: 'Une preuve sociale chiffrée.' },
      { text: 'Sauvegarde automatique toutes les 10 minutes.', answer: 'C', why: 'Elle décrit le fonctionnement du produit.' },
      { text: '99,9 % de disponibilité garantie par contrat.', answer: 'P', why: 'Un engagement chiffré et contractuel : la promesse devient vérifiable.' },
      { text: 'Vous êtes dépanné même le week-end.', answer: 'A', why: 'Le bénéfice concret de l’assistance 7j/7.' }
    ]
  },

  /* ── 1.2 · Dérouler la chaîne CAP ───────────────────────────────────── */
  '1.2': {
    eyebrow: 'Exercice 1.2',
    title: 'Dérouler la chaîne CAP',
    subtitle: 'Transformez une caractéristique en argument commercial convaincant.',
    instruction: 'Complétez l’avantage et la preuve pour chaque caractéristique.',
    chain: [
      { id: 'C', label: 'Caractéristique', text: 'Ce que fait le produit', tone: 'c' },
      { id: 'A', label: 'Avantage', text: 'Ce que le client y gagne', tone: 'a' },
      { id: 'P', label: 'Preuve', text: 'Ce qui le prouve', tone: 'p' }
    ],
    lines: [
      // `image` : l'illustration posée sous la caractéristique ; `symbol` :
      // le pictogramme de secours, sans image.
      { feature: 'Livraison en 24 h.', symbol: 'truck', image: 'assets/illustrations/s4/cap-livraison.webp', advantage: 'Vous êtes opérationnel dès le lendemain, sans interruption d’activité.', proof: '98 % des commandes livrées sous 24 h en 2024.' },
      { feature: 'Formation des utilisateurs incluse.', symbol: 'users', image: 'assets/illustrations/s4/cap-formation.webp', advantage: 'Vos équipes maîtrisent l’outil rapidement, sans surcoût.', proof: '2 sessions de formation planifiées au devis.' }
    ]
  },

  /* ── 2.1 · Caractéristique ou bénéfice client ? ─────────────────────── */
  '2.1': {
    eyebrow: 'Exercice 2.1',
    title: 'Caractéristique ou bénéfice client ?',
    subtitle: 'Distinguez ce que le produit possède de ce que l’utilisateur y gagne.',
    legend: [
      { id: 'C', label: 'Caractéristique', text: 'Une donnée sur le produit', tone: 'c' },
      { id: 'B', label: 'Bénéfice client', text: 'La valeur concrète pour l’utilisateur', tone: 'a' }
    ],
    instruction: 'Pour chaque formulation, choisissez C ou B.',
    items: [
      { text: 'Vous tenez deux jours sans recharger.', answer: 'B', why: 'Ce que la batterie change au quotidien.' },
      { text: 'Ce matériau est traité anti-UV.', answer: 'C', why: 'Une propriété du matériau.' },
      { text: 'Contrat sans engagement.', answer: 'C', why: 'Une condition de l’offre.' },
      { text: 'Vos meubles ne jauniront pas au soleil.', answer: 'B', why: 'Le résultat vécu par l’utilisateur.' },
      { text: 'Vous gardez la liberté d’arrêter quand vous voulez.', answer: 'B', why: 'La liberté que procure un contrat sans engagement.' },
      { text: 'Batterie de 5 000 mAh.', answer: 'C', why: 'Une donnée technique.' }
    ]
  },

  /* ── 2.2 · Passez en mode client ────────────────────────────────────── */
  '2.2': {
    eyebrow: 'Atelier de traduction · Exercice 2.2',
    title: 'Passez en mode client',
    subtitle: 'Transformez chaque fiche technique en bénéfice concret.',
    tip: 'Imaginez ce que le client vivra réellement.',
    challenges: [
      // `image` : l'illustration sous la fiche technique ; `symbol` : le
      // pictogramme de secours, sans image.
      { tag: 'Logiciel', symbol: 'cloud', image: 'assets/illustrations/s4/mc-sauvegarde.webp', card: 'Notre logiciel intègre une fonction de sauvegarde automatique.', model: 'Vos données clients sont protégées en permanence, sans que vous ayez à y penser : vous ne perdez plus rien.' },
      { tag: 'Immobilier', symbol: 'building', card: 'Le bien dispose d’une double exposition.', model: 'Vous profitez de la lumière du matin comme du soir : des pièces claires toute la journée, plus agréables à vivre.' }
    ],
    criteria: 'Résultat vécu · langage simple · phrase directe'
  },

  /* ── 3.1 · À faire ou à éviter ? ────────────────────────────────────── */
  '3.1': {
    eyebrow: 'Exercice 3.1 · Défi express',
    title: 'À faire ou à éviter ?',
    subtitle: 'Classez les comportements commerciaux, un par un.',
    zones: [
      { id: 'avoid', label: 'À ne pas faire', sub: 'Erreur à éviter', symbol: 'thumbDown', tone: 'bad' },
      { id: 'do', label: 'À faire', sub: 'Bonne pratique', symbol: 'thumbUp', tone: 'good' }
    ],
    cards: [
      { text: 'Enchaîner tous ses arguments d’affilée.', answer: 'avoid', why: 'Trop d’arguments tue l’argument : on cible ce qui répond au besoin exprimé.' },
      { text: 'Relier chaque argument au besoin exprimé.', answer: 'do', why: 'Un argument relié au besoin parle directement au client.' },
      { text: 'Laisser le client réagir après un argument.', answer: 'do', why: 'Sa réaction permet de vérifier l’impact et d’ajuster la suite.' },
      { text: 'Noyer le client sous les détails techniques.', answer: 'avoid', why: 'Le détail technique non traduit en bénéfice perd le client.' },
      { text: 'Monologuer sans laisser d’espace.', answer: 'avoid', why: 'Sans question ni vérification, le client décroche.' },
      { text: 'Appuyer un argument par une preuve concrète.', answer: 'do', why: 'La preuve rend l’argument crédible.' }
    ]
  },

  /* ── 3.2 · Repérer la sur-argumentation ─────────────────────────────── */
  '3.2': {
    eyebrow: 'Exercice 3.2 · Analyse',
    title: 'Repérer la sur-argumentation',
    subtitle: 'Lisez l’échange, puis relevez au moins 3 erreurs majeures.',
    exchange: [
      { who: 'client', text: 'Je cherche surtout quelque chose de simple à utiliser.' },
      { who: 'seller', text: 'Alors, on a le chiffrement AES-256, la conformité RGPD, 200 intégrations, un module de reporting BI, une API ouverte, le SSO, l’hébergement souverain, la sauvegarde incrémentale…' },
      { who: 'client', text: '… euh, d’accord.' }
    ],
    model: [
      { title: 'Le besoin exprimé est ignoré', text: 'Le client cherche la simplicité : rien n’y répond.' },
      { title: 'L’effet catalogue', text: 'Le commercial déballe tous ses arguments, sans sélection.' },
      { title: 'Le jargon technique', text: 'AES-256, BI, API, SSO : rien n’est traduit en bénéfice.' },
      { title: 'Le monologue', text: 'Aucune question ni vérification de l’impact : le client décroche, son « euh, d’accord » le montre.' }
    ],
    tip: 'Observez le fond, le rythme et l’écoute.'
  }
};
