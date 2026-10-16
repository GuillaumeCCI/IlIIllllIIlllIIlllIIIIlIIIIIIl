/* SÉRIE 2 · PITCHER AVEC IMPACT · contenus éditables.
 *
 * Textes des maquettes repris tels quels. Les affirmations 2 à 8 de « Mythe
 * ou méthode », les réponses attendues et les corrigés modèles viennent de la
 * fiche « Activités supplémentaires SCORM 2 » (M1.1.2, exercices 2.1 à 2.6),
 * transposés au vouvoiement.
 */
window.ATELIER_S2 = {
  /* ── 2.1 · Mythe ou méthode ? ────────────────────────────────────────── */
  '2.1': {
    eyebrow: 'Quiz · Argumentation commerciale',
    title: 'Mythe ou méthode ?',
    subtitle: 'Faites glisser chaque affirmation vers la catégorie qui lui correspond.',
    zones: [
      { id: 'myth', label: 'Mythe', sub: 'Une idée fausse', symbol: 'ban', tone: 'bad', image: 'assets/illustrations/s2/mythe.webp' },
      { id: 'method', label: 'Méthode', sub: 'Une bonne pratique', symbol: 'checkCircle', tone: 'good', image: 'assets/illustrations/s2/methode.webp' }
    ],
    cards: [
      { text: 'Plus on donne d’arguments, plus on convainc.', answer: 'myth', why: 'Trop d’arguments noient le client et diluent le plus fort. Mieux vaut quelques arguments choisis pour lui.' },
      { text: 'Un bénéfice client convainc plus qu’une caractéristique.', answer: 'method', why: 'Le client achète ce qu’il y gagne : le bénéfice lui parle directement, la caractéristique l’oblige à faire lui-même la traduction.' },
      { text: 'Le jargon technique montre le professionnalisme.', answer: 'myth', why: 'Le jargon crée de la distance et de l’incompréhension. Le professionnalisme se montre en rendant les choses claires.' },
      { text: 'Il faut parler vite et fort pour paraître sûr de soi.', answer: 'myth', why: 'L’assurance passe par un débit posé et un ton affirmatif, pas par la vitesse ni le volume.' },
      { text: 'Une preuve concrète renforce la conviction.', answer: 'method', why: 'Un chiffre, un exemple, une démonstration transforment une promesse en fait vérifiable.' },
      { text: 'Une accroche capte l’attention dès le début.', answer: 'method', why: 'Les premières secondes décident de l’écoute : une question, un chiffre ou un bénéfice projeté donnent envie d’entendre la suite.' },
      { text: 'Mieux vaut tout dire pour ne rien oublier.', answer: 'myth', why: 'Tout dire noie l’essentiel : on sélectionne ce qui compte pour ce client.' },
      { text: 'Un langage affirmatif inspire confiance.', answer: 'method', why: 'Des formulations positives et assurées, sans « je pense », montrent que vous croyez à ce que vous proposez.' }
    ]
  },

  /* ── 2.2 · L'échelle de conviction ──────────────────────────────────── */
  '2.2': {
    eyebrow: 'Exercice · Argumentation commerciale',
    title: 'L’échelle de conviction',
    subtitle: 'Classez les propositions de la moins convaincante (1) à la plus percutante (5).',
    // `rank` : place attendue, de 1 (moins convaincante) à 5 (plus percutante).
    cards: [
      { id: 'a', text: 'Vos données clients sont protégées en continu : 5 000 PME nous font confiance, zéro incident en 2024.', rank: 5 },
      { id: 'b', text: 'On a de la sécurité.', rank: 1 },
      { id: 'c', text: 'Vos données sont protégées.', rank: 3 },
      { id: 'd', text: 'Le logiciel est sécurisé, je pense que c’est bien.', rank: 2 },
      { id: 'e', text: 'Vos données sont protégées en continu, chiffrées et conformes RGPD.', rank: 4 }
    ],
    explanation: [
      '1 · b : creuse, elle ne dit rien de concret.',
      '2 · d : elle ajoute du doute avec « je pense ».',
      '3 · c : correcte, mais nue : ni précision ni preuve.',
      '4 · e : elle ajoute des éléments concrets (chiffrées, conformes RGPD).',
      '5 · a : elle couronne le tout d’une preuve (5 000 PME, zéro incident en 2024).'
    ],
    hint: 'Trois critères font monter une proposition : elle parle du client (« vous »), elle est précise, et elle s’appuie sur une preuve. Une hésitation (« je pense ») la fait au contraire chuter.'
  },

  /* ── 2.3 · Le studio d'accroches ────────────────────────────────────── */
  '2.3': {
    eyebrow: 'Exercice · Prise de contact',
    title: 'Le studio d’accroches',
    subtitle: 'Rédigez 3 accroches de natures différentes pour capter l’attention dès les premières secondes.',
    prospect: {
      name: 'Gérante de PME',
      software: 'RelaCosy',
      problem: 'elle perd du temps dans la gestion de tâches répétitives.'
    },
    hooks: [
      {
        tab: 'Question',
        title: 'Interpellez votre prospect',
        prompt: 'Formulez une question qui l’amène à reconnaître le temps perdu dans ses tâches répétitives.',
        placeholder: 'Votre question…',
        next: 'Enregistrer et passer au chiffre-choc',
        example: 'Combien de temps vos équipes perdent-elles chaque semaine à ressaisir des données ?'
      },
      {
        tab: 'Chiffre-choc',
        title: 'Frappez avec un chiffre',
        prompt: 'Appuyez votre accroche sur un chiffre marquant qui rend le problème concret.',
        placeholder: 'Votre chiffre-choc…',
        next: 'Enregistrer et passer au bénéfice projeté',
        example: 'Nos clients récupèrent en moyenne 3 heures par semaine.'
      },
      {
        tab: 'Bénéfice projeté',
        title: 'Faites-lui imaginer le résultat',
        prompt: 'Projetez-la dans le résultat : ce que serait sa semaine une fois le problème réglé.',
        placeholder: 'Votre bénéfice projeté…',
        next: 'Valider mes 3 accroches',
        example: 'Imaginez ne plus jamais perdre une information client.'
      }
    ],
    criteria: ['Courte', 'Concrète', 'Centrée sur le client']
  },

  /* ── 2.4 · La chasse aux preuves ────────────────────────────────────── */
  '2.4': {
    eyebrow: 'Exercice · Argumentation',
    title: 'La chasse aux preuves',
    subtitle: 'Pour chaque affirmation, cochez si elle est étayée par une preuve concrète ou s’il s’agit d’un trou de preuve.',
    pitch: 'RelaCosy est le CRM le plus fiable du marché. Nos clients gagnent un temps fou. Vos données sont chiffrées et conformes RGPD (audit annuel). C’est aussi le plus simple à prendre en main. 5 000 PME l’utilisent déjà.',
    rows: [
      { text: 'RelaCosy est le CRM le plus fiable du marché.', answer: 'gap', why: 'Trou de preuve : superlatif gratuit, aucun classement, aucune source.' },
      { text: 'Nos clients gagnent un temps fou.', answer: 'gap', why: 'Trou de preuve : affirmation vague, non chiffrée.' },
      { text: 'Vos données sont chiffrées et conformes RGPD (audit annuel).', answer: 'proof', why: 'Étayée : l’audit annuel est un élément vérifiable.' },
      { text: 'C’est aussi le plus simple à prendre en main.', answer: 'gap', why: 'Trou de preuve : superlatif non étayé.' },
      { text: '5 000 PME l’utilisent déjà.', answer: 'proof', why: 'Étayée : donnée chiffrée et vérifiable.' }
    ],
    columns: [
      { id: 'proof', label: 'Étayée' },
      { id: 'gap', label: 'Trou de preuve' }
    ]
  },

  /* ── 2.5 · L'audit du pitch ─────────────────────────────────────────── */
  '2.5': {
    eyebrow: 'Exercice · Argumentation',
    title: 'L’audit du pitch',
    subtitle: 'Évaluez ce discours selon les 6 critères de la grille commune, de 0 à 2 points par critère.',
    note: 'Désignez ensuite LA modification prioritaire qui le rendrait plus percutant.',
    pitch: 'Bonjour, RelaCosy c’est un CRM complet avec sauvegarde, chiffrement, accès mobile, plein de fonctions. Je pense que ça peut vous convenir. Il y a beaucoup d’options.',
    // `reference` : la note du corrigé, de 0 à 2. Le corrigé attend des notes
    // basses sur le bénéfice, la preuve et le langage affirmatif ; les autres
    // notes sont indicatives.
    criteria: [
      { title: 'Orientation bénéfice', text: 'Je parle des bénéfices pour le client, pas des seules caractéristiques.', reference: 0, why: 'Une liste de fonctions, aucun bénéfice exprimé.' },
      { title: 'Preuve à l’appui', text: 'Mes affirmations sont étayées (chiffre, exemple, démonstration).', reference: 0, why: 'Aucun chiffre, aucun exemple.' },
      { title: 'Langage affirmatif', text: 'Formulations positives et assurées, sans « je pense que peut-être ».', reference: 0, why: '« Je pense que ça peut vous convenir » : le doute est explicite.' },
      { title: 'Clarté et structure', text: 'Accroche, corps, conclusion ; pas de jargon inutile.', reference: 1, why: 'Court et compréhensible, mais sans accroche ni conclusion.' },
      { title: 'Adaptation au client', text: 'Les arguments mis en avant correspondent à ses motivations.', reference: 0, why: 'Rien ne fait référence au client ni à ses besoins.' },
      { title: 'Force de conviction', text: 'Le propos donne envie ; l’engagement se ressent.', reference: 0, why: '« Plein de fonctions », « beaucoup d’options » : aucun élan.' }
    ],
    levels: [
      { id: '0', label: 'À retravailler' },
      { id: '1', label: 'En bonne voie' },
      { id: '2', label: 'Maîtrisé' }
    ],
    priority: 'Transformer les caractéristiques en un ou deux bénéfices concrets appuyés d’une preuve, par exemple : « vous gagnez 3 h par semaine, comme nos 5 000 clients ». Supprimer « je pense » vient juste après.'
  },

  /* ── 2.6 · Le pitch de 60 secondes ──────────────────────────────────── */
  '2.6': {
    eyebrow: 'Exercice · Mise en situation',
    title: 'Le pitch de 60 secondes',
    badge: 'Spécial Sécurité',
    subtitle: 'Rédigez, enregistrez puis auto-évaluez votre pitch de RelaCosy face à un prospect particulièrement soucieux de la sécurité.',
    structure: ['Une accroche', 'Un bénéfice + une preuve', 'Un bénéfice + une preuve', 'Une conclusion'],
    example: 'Votre priorité, c’est que les données de vos clients ne soient jamais en danger : c’est exactement ce que fait RelaCosy. Vos données sont chiffrées et sauvegardées en continu, conformes RGPD : plus de 5 000 PME l’utilisent sans le moindre incident. Et vous n’avez rien à gérer côté technique, l’assistance répond en 2 minutes, 7j/7. Concrètement, vous gagnez en sérénité sans y consacrer de temps. Je vous propose qu’on regarde ensemble comment le mettre en place chez vous.',
    criteria: [
      { title: 'Orientation bénéfice', text: 'Je parle des bénéfices pour le client, pas des seules caractéristiques.' },
      { title: 'Preuve à l’appui', text: 'Mes affirmations sont étayées (chiffre, exemple, démonstration).' },
      { title: 'Langage affirmatif', text: 'Formulations positives et assurées, sans « je pense que peut-être ».' },
      { title: 'Clarté et structure', text: 'Accroche, corps, conclusion ; pas de jargon inutile.' },
      { title: 'Adaptation au client', text: 'Les arguments mis en avant correspondent à ses motivations.' },
      { title: 'Force de conviction', text: 'Le propos donne envie ; l’engagement se ressent.' },
      { title: 'Concision et impact en 60 s', text: 'Une accroche + 2 bénéfices prouvés + une conclusion, en 60 s maximum.', specific: true }
    ],
    listen: ['Le débit est-il posé ?', 'Le ton est-il affirmatif ?', 'Avez-vous évité les « euh » et les « je pense » ?']
  }
};
