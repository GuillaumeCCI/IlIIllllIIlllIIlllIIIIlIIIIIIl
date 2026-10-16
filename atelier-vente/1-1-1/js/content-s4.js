/* SÉRIE 4 · MANIPULATION · contenus éditables.
 *
 * Corrigés repris de la fiche « M1.1.1, Activités 1 & 2, manipulation des
 * connaissances ». Les fiches tutoient l'apprenant ; l'interface le vouvoie,
 * les textes ont donc été transposés sans en changer le fond. Les verbatims
 * et les listes de réponses restent ceux des maquettes.
 */
window.ATELIER_S4 = {
  /* ── 1.1 · Remettez l’ouverture dans le bon ordre ─────────────────────── */
  '1.1': {
    eyebrow: 'Ouverture d’entretien',
    title: 'Remettez l’ouverture dans le bon ordre',
    intro: 'Placez les 5 phrases pour reconstruire une ouverture d’entretien fluide.',
    // `position` = place attendue dans l'ouverture (1 à 5).
    // L'ordre ci-dessous est l'ordre d'apparition des cartes, volontairement mélangé.
    cards: [
      { text: 'Pour bien cerner votre situation, je vais commencer par vous écouter.', position: 5 },
      { text: 'Bonjour, merci de me recevoir.', position: 1 },
      { text: 'Je vous propose de faire le point sur votre projet, puis de voir comment je peux vous aider.', position: 3 },
      { text: 'Je suis [Prénom Nom], conseiller chez [Entreprise].', position: 2 },
      { text: 'Nous avons prévu une trentaine de minutes ensemble, cela vous convient-il toujours ?', position: 4 }
    ],
    feedback: [
      'Ordre logique : accueil, puis présentation, puis objet et objectif, puis cadrage de la durée, enfin transition vers l’écoute.',
      'Soit : « Bonjour, merci de me recevoir » → « Je suis [Prénom Nom]… » → « Je vous propose de faire le point… » → « Nous avons une trentaine de minutes… » → « Pour bien cerner votre situation, je vais vous écouter. »',
      'Ce que cela montre : on crée la relation, puis on cadre l’échange, avant de basculer vers l’écoute.',
      'Point de vigilance : l’ordre exact entre l’objet et la durée peut varier légèrement. Les variantes défendables sont acceptables ; c’est la logique globale qui compte : relation, puis cadre, puis écoute.'
    ]
  },

  /* ── 1.2 · Repérez ce qui cloche ──────────────────────────────────────── */
  '1.2': {
    eyebrow: 'Ouverture d’entretien',
    title: 'Repérez ce qui cloche',
    intro: 'Sélectionnez au moins 4 maladresses, puis réécrivez une ouverture plus juste.',
    minimum: 4,
    // Le texte est découpé en segments cliquables. `flaw: true` marque une maladresse.
    segments: [
      { text: 'Ouais, bonjour.', flaw: true, why: 'Salutation négligée, registre familier : « Ouais, bonjour » dégrade d’emblée le climat et l’image professionnelle.' },
      { text: ' Bon, écoutez, ', flaw: true, why: 'Tic de langage qui coupe la parole avant même de l’avoir donnée.' },
      { text: 'on a une offre exceptionnelle en ce moment, il faut vraiment que je vous la montre, c’est le moment ou jamais.', flaw: true, why: 'Entrée directe sur l’offre : on « pousse » un produit avant d’avoir créé la relation.' },
      { text: ' Alors, qu’est-ce qu’il vous faut ?', flaw: true, why: 'Question brutale, centrée produit : elle demande une commande, pas un besoin.' },
      { text: ' De toute façon, je pense que notre formule premium est ce qu’il vous faut,', flaw: true, why: 'Le client n’a pas la parole : « De toute façon… je pense que… » impose une posture et supprime l’écoute.' },
      { text: ' je vais vous expliquer tout ça.', flaw: true, why: 'L’ouverture se termine sur un monologue annoncé : aucune place laissée à l’échange.' }
    ],
    missing: 'Il manque aussi l’essentiel : aucune présentation (ni identité, ni fonction, ni entreprise, le client ne sait pas à qui il parle) et aucun cadrage : ni objet, ni déroulé, ni durée annoncés, l’échange démarre sans repères.',
    feedback: 'Modèle d’ouverture réécrite : « Bonjour, merci de me recevoir. Je suis [Prénom Nom], conseiller chez [Entreprise]. Je vous propose de faire le point sur votre besoin, puis de voir ensemble les solutions adaptées, nous avons une trentaine de minutes. Pour commencer, je vous écoute : qu’est-ce qui vous amène aujourd’hui ? »'
  },

  /* ── 2.1 · Associez chaque réponse à son attitude ─────────────────────── */
  '2.1': {
    eyebrow: 'Écoute et posture',
    title: 'Associez chaque réponse à son attitude',
    intro: 'Classez les 6 réponses du commercial selon les attitudes de Porter.',
    clientSays: 'Je ne suis pas sûr que ce soit le bon moment pour investir là-dedans.',
    // Les 6 zones de dépôt, dans l'ordre d'affichage de la maquette.
    zones: [
      { id: 'evaluation', label: 'Évaluation', symbol: 'scales' },
      { id: 'interpretation', label: 'Interprétation', symbol: 'thought' },
      { id: 'soutien', label: 'Soutien', symbol: 'hands' },
      { id: 'investigation', label: 'Investigation', symbol: 'search' },
      { id: 'solution', label: 'Solution', symbol: 'lightbulb' },
      { id: 'comprehension', label: 'Compréhension', symbol: 'ear' }
    ],
    cards: [
      { text: 'Si je comprends bien, vous préférez prendre le temps de la réflexion.', answer: 'comprehension', why: 'On reformule pour montrer qu’on a compris : l’attitude à privilégier.' },
      { text: 'En fait, ce qui vous bloque, c’est le prix.', answer: 'interpretation', why: 'On explique à la place de l’autre.' },
      { text: 'Pourquoi dites-vous ça ? Qu’est-ce qui vous retient exactement ?', answer: 'investigation', why: 'On questionne pour obtenir plus d’informations.' },
      { text: 'À votre place, je signerais maintenant.', answer: 'solution', why: 'On donne immédiatement une solution ou un conseil.' },
      { text: 'Vous avez tort d’hésiter, c’est vraiment le moment.', answer: 'evaluation', why: 'On approuve ou on désapprouve le client.' },
      { text: 'Ne vous inquiétez pas, tout le monde ressent ça au début.', answer: 'soutien', why: 'On rassure, on minimise.' }
    ],
    feedback: [
      'Les 6 attitudes ne sont pas « bonnes » ou « mauvaises » dans l’absolu : l’enjeu est de choisir celle qui est adaptée au moment. En prise de contact, on privilégie la compréhension : reformuler est ce qui installe le plus la confiance.',
      'Erreur fréquente à surveiller : ne pas confondre l’enquête, qui questionne, et la compréhension, qui reformule ce que l’autre exprime.'
    ]
  },

  /* ── 2.2 · Réparez la conversation ────────────────────────────────────── */
  '2.2': {
    eyebrow: 'Écoute et posture',
    title: 'Réparez la conversation',
    intro: 'Pour chaque situation, remplacez la réponse réflexe par une reformulation de compréhension.',
    valued: 'Ce qu’on valorise dans vos réponses : elles reformulent ou nomment le ressenti et le besoin du client, sans juger, conseiller ni minimiser, et elles invitent le client à poursuivre plutôt qu’elles ne referment l’échange. Plusieurs formulations sont valables : toute reformulation juste est acceptée, même différente de l’exemple.',
    situations: [
      {
        client: 'Votre concurrent est moins cher.',
        reflex: 'Oui, mais nous, on est de meilleure qualité.',
        model: 'Le budget est un critère important pour vous, si je comprends bien.'
      },
      {
        client: 'Je n’ai pas le temps de m’occuper de ça en ce moment.',
        reflex: 'Ça va vous prendre dix minutes, c’est rien.',
        model: 'Votre charge actuelle ne laisse pas de place à un nouveau projet, c’est bien cela ?'
      },
      {
        client: 'On a déjà essayé ce type de solution, ça n’a rien donné.',
        reflex: 'Ah mais là c’est différent, vous allez voir.',
        model: 'Cette expérience vous rend prudent aujourd’hui, je comprends.'
      }
    ]
  }
};
