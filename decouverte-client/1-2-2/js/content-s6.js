/* SÉRIE 6 · POUR ALLER PLUS LOIN (fiche M1.2.2, activité de synthèse
 * optionnelle, option 2 « L'entretien dont tu es le héros », Bloom 3-5-6,
 * ≈ 45 min : scénario ≈ 15 min, carte des besoins ≈ 30 min).
 *
 * Sept étapes : à chacune, trois questions possibles. Chaque choix vaut
 * +2, 0 ou −2 sur une jauge de découverte (départ 5, bornée de 0 à 10) ;
 * la réaction de la cliente s'affiche aussitôt, l'analyse des choix
 * n'arrive qu'au corrigé. Puis la carte des besoins (six rubriques), la
 * grille Oui / Non et le corrigé modèle. Contenu de la fiche, au vouvoiement.
 *
 * L'ordre des trois choix est mélangé à l'écran (`order`) : la meilleure
 * question n'est pas toujours la première.
 */
(function (root) {
  'use strict';

  root.ATELIER_S6 = {

    '6.1': {
      eyebrow: 'Pour aller plus loin · Synthèse facultative',
      title: 'L’entretien dont vous êtes le héros',
      subtitle: 'Choisissez vos questions, voyez leur effet sur la cliente, puis construisez la carte de ses besoins.',

      client: {
        name: 'Mme Rivière',
        role: 'Infirmière libérale',
        portrait: 'client-chignon',
        context: 'Vous êtes Antoine, conseiller dans une concession automobile. Mme Rivière, infirmière libérale, revient jeudi à 13 h pour un essai. Elle a 30 minutes. Avant l’essai, vous voulez comprendre ses besoins pour lui proposer le bon véhicule.'
      },

      start: 5,
      steps: [
        {
          scene: 'Mme Rivière arrive à l’heure, les clés de sa voiture de location à la main.',
          says: 'Bonjour. J’ai trente minutes, pas plus.',
          order: ['b', 'a', 'c'],
          choices: {
            a: { text: 'Trente minutes, c’est noté : dix minutes pour parler de vos journées, puis l’essai. Racontez-moi une journée de tournée.', points: 2, reply: 'Je pars à 7 h, une quinzaine de patients, surtout en centre-ville et dans deux villages.' },
            b: { text: 'Trente minutes, c’est noté. Pour gagner du temps : vous roulez plutôt en diesel, en essence ou en hybride, en ce moment ?', points: 0, reply: 'Ce qui consomme le moins, je suppose.', note: 'Une précision trop tôt.' },
            c: { text: 'J’ai une citadine hybride qui ira parfaitement pour vos tournées : on va l’essayer tout de suite ?', points: -2, reply: 'Attendez, vous ne savez même pas ce que je fais.', note: 'Une solution, qui ferme l’échange.' }
          },
          best: 'a', why: 'Elle cadre le temps et ouvre large : c’est le premier étage de l’entonnoir.'
        },
        {
          says: 'Voilà, c’est à peu près ça.',
          order: ['a', 'c', 'b'],
          choices: {
            a: { text: 'Qu’est-ce qui vous complique le plus la vie avec une voiture, pendant vos tournées ?', points: 2, reply: 'Me garer. Et sortir mon sac de soins du coffre vingt fois par jour, avec mon épaule…' },
            b: { text: 'Sur une journée comme celle-là, vous faites beaucoup d’autoroute pour rejoindre les deux villages ?', points: 0, reply: 'Un peu, pour les villages.', note: 'Fermée, elle apprend peu.' },
            c: { text: 'En centre-ville, une petite voiture reste ce qu’il y a de plus pratique, vous êtes d’accord ?', points: -2, reply: 'Si vous le dites…', note: 'Orientée, elle impose votre avis.' }
          },
          best: 'a', why: 'Une question ouverte, ciblée sur ses difficultés : le deuxième étage.'
        },
        {
          scene: 'Elle se touche l’épaule droite en parlant du coffre.',
          order: ['b', 'c', 'a'],
          choices: {
            a: { text: 'Votre épaule ?', points: 2, reply: 'Une tendinite. Mon ancien coffre était haut, je soulevais le sac à bout de bras.' },
            b: { text: 'Il vous faut un grand coffre, alors.', points: 0, reply: 'Pas forcément grand. Facile d’accès, surtout.', note: 'Vous interprétez à sa place.' },
            c: { text: 'On a des modèles avec hayon électrique.', points: -2, reply: 'Et ça coûte combien, l’option ?', note: 'Une solution, et la discussion part sur le prix.' }
          },
          best: 'a', why: 'Un écho sur un signal : son geste vers l’épaule. Elle explique elle-même.'
        },
        {
          says: 'Bref, je ne veux plus revivre la semaine dernière.',
          order: ['a', 'b', 'c'],
          choices: {
            a: { text: 'Que se passerait-il si votre voiture vous lâchait de nouveau ?', points: 2, reply: 'Je devrais louer, 60 € par jour, et annuler des patients. La dernière fois, j’ai perdu 1 500 €.' },
            b: { text: 'Votre assurance actuelle vous prévoit-elle un véhicule de prêt en cas de panne ?', points: 0, reply: 'Non, je ne crois pas.', note: 'Fermée.' },
            c: { text: 'Avec nous, plus de souci : nos modèles sont fiables.', points: -2, reply: 'On m’a déjà dit ça.', note: 'Une promesse générale, qui ne la rassure pas.' }
          },
          best: 'a', why: 'Elle fait dire le coût du problème : la cliente mesure elle-même l’enjeu.'
        },
        {
          scene: 'Elle regarde l’heure, mais reste assise.',
          order: ['c', 'b', 'a'],
          choices: {
            a: { text: 'Qu’est-ce qui ferait que vous vous sentiez vraiment sereine avec votre prochaine voiture ?', points: 2, reply: 'Savoir qu’on me dépanne vite et qu’on me prête une voiture. Et ne pas me ruiner : je suis à mon compte.' },
            b: { text: 'Pour la voiture, vous avez une préférence de couleur ou de finition ?', points: 0, reply: 'Peu importe.', note: 'Hors sujet.' },
            c: { text: 'Vous préférez sûrement le modèle le plus fiable de la gamme, même s’il coûte un peu plus cher ?', points: -2, reply: 'Tout dépend du prix.', note: 'Orientée, elle souffle la réponse.' }
          },
          best: 'a', why: 'Elle fait exprimer sa motivation, avec ses mots.'
        },
        {
          says: 'Il me reste un quart d’heure.',
          order: ['c', 'a', 'b'],
          choices: {
            a: { text: 'Si vous deviez classer : vous garer, un coffre accessible, une voiture de prêt en cas de panne, le budget… qu’est-ce qui passe en premier ?', points: 2, reply: 'La voiture de prêt. Sans voiture, je ne travaille pas. Ensuite le coffre, pour mon épaule. Puis le budget.' },
            b: { text: 'Le stationnement, le coffre, la voiture de prêt, le budget : j’imagine que tout compte pour vous ?', points: 0, reply: 'Oui…', note: 'N’apprend rien.' },
            c: { text: 'Entre le stationnement, le coffre et la voiture de prêt en cas de panne, c’est quand même le budget, au fond, qui passe en premier pour vous, non ?', points: -2, reply: 'Non, pas forcément.', note: 'Orientée.' }
          },
          best: 'a', why: 'Une question alternative pour hiérarchiser : elle classe elle-même.'
        },
        {
          prompt: 'Avant l’essai, quelle validation faites-vous ?',
          order: ['a', 'c', 'b'],
          choices: {
            a: { text: 'Si je résume : d’abord une voiture de prêt en cas de panne, sans quoi vous ne travaillez pas ; puis un coffre facile d’accès pour votre épaule ; une voiture simple à garer ; un budget maîtrisé. Dans cet ordre ?', points: 2, reply: '' },
            b: { text: 'Si je résume : une petite voiture, facile à garer en centre-ville et pas trop chère, puisque vous êtes à votre compte et que vous roulez beaucoup dans la journée, entre vos patients. C’est bien ça ?', points: 0, reply: 'C’est un peu court.', note: 'Incomplète.' },
            c: { text: 'Si je résume : une voiture fiable, un coffre pratique pour votre épaule, facile à garer en ville… notre citadine hybride avec hayon électrique coche toutes les cases. On l’essaie ?', points: -2, reply: 'Vous allez vite…', note: 'Un produit glissé dans la synthèse.' }
          },
          best: 'a', why: 'Une synthèse ordonnée, avec ses raisons, qu’elle peut valider.'
        }
      ],

      // Les fins, selon la jauge à la fin du scénario.
      endings: [
        { min: 8, title: 'Un essai sur le bon véhicule', says: 'Exactement, et dans cet ordre. Vous êtes le premier à me poser ces questions. On l’essaie ?', text: 'L’essai se fait sur le bon véhicule.', tone: 'ok' },
        { min: 4, title: 'Un essai, mais des doutes', says: 'Je ne suis pas sûre que ce soit le bon modèle.', text: 'L’essai a lieu, mais Mme Rivière hésite.', tone: 'mid' },
        { min: 0, title: 'Pas d’essai', says: 'Écoutez, je n’ai plus le temps. Je reviendrai peut-être.', text: 'L’essai n’a pas lieu.', tone: 'ko' }
      ],

      // La carte des besoins : six rubriques (gabarit de la fiche).
      map: [
        { id: 'explicites', tab: 'Explicites', label: '1 · Les besoins explicites', sub: 'Ce qu’elle a demandé, avec ses mots.', placeholder: 'Elle a demandé…', required: true,
          model: 'Une voiture pour ses tournées (« une quinzaine de patients, centre-ville et deux villages ») ; se garer facilement.' },
        { id: 'implicites', tab: 'Implicites', label: '2 · Les besoins implicites', sub: 'Ce qui est apparu, et la question qui l’a fait émerger.', placeholder: 'Un besoin… révélé par la question « … »', required: true,
          model: 'Un coffre accessible sans soulever (sa tendinite, révélée par l’écho « Votre épaule ? ») ; une voiture de prêt en cas de panne (révélée par « Que se passerait-il si… ? »).' },
        { id: 'motivations', tab: 'Motivations', label: '3 · Ses motivations d’achat', sub: 'La motivation dominante et les secondaires (SONCASE), avec les mots indices.', placeholder: 'Dominante : … (« … ») ; secondaires : …', required: true,
          model: 'Sécurité, dominante (« sans voiture, je ne travaille pas », « je ne veux plus revivre… ») ; argent (« je suis à mon compte ») ; confort (son épaule, le stationnement).' },
        { id: 'hierarchie', tab: 'Hiérarchie', label: '4 · La hiérarchie', sub: 'Prioritaire, important, secondaire, et comment elle a été validée (ou pas).', placeholder: '① … ② … ③ … Validée par…', required: true,
          model: '① La voiture de prêt en cas de panne ② le coffre accessible ③ la facilité de stationnement ④ un budget maîtrisé. Validée à l’étape 7 (« C’est bien dans cet ordre ? »).' },
        { id: 'manque', tab: 'Ce qui manque', label: '5 · Ce qui manque encore', sub: 'Ce que vous n’avez pas découvert, et que vous demanderiez au prochain échange.', placeholder: 'Il me manque…', required: true,
          model: 'Le budget précis ; le kilométrage annuel ; le mode de financement envisagé.' },
        { id: 'critique', tab: 'Auto-critique', label: '6 · Mon auto-critique', sub: 'Deux questions de votre partie que vous reformuleriez : votre question, la nouvelle version, son type.', placeholder: 'À l’étape …, j’ai choisi « … ». Je dirais plutôt « … » (type : …).', required: true,
          model: 'À l’étape 3, j’ai choisi « Il vous faut un grand coffre, alors » : une interprétation. Je dirais maintenant « Votre épaule ? » (un écho), qui l’aurait laissée expliquer.' }
      ],

      // La grille Oui / Non de la fiche, avec le critère « Traçabilité ».
      selfCheck: [
        { text: 'Je distingue clairement besoins explicites et implicites, avec les mots de la cliente.' },
        { text: 'Pour chaque besoin implicite, j’indique la question qui l’a fait émerger.' },
        { text: 'J’identifie la motivation dominante avec au moins un mot indice.' },
        { text: 'Ma hiérarchie correspond à ce que la cliente a dit, pas à ce que je pense.' },
        { text: 'Je repère ce qui reste à découvrir.' },
        { text: 'Mon auto-critique porte sur mes vrais choix, y compris ceux qui ont fait baisser la jauge.' },
        { text: 'Traçabilité : chaque information de ma carte est reliée à la question qui l’a obtenue.' }
      ],

      keyPoint: 'À retenir : chaque information utile est venue d’une question ouverte, d’un écho ou d’une alternative. Les questions qui proposaient un produit ou soufflaient la réponse ont fermé l’échange.'
    }
  };
})(globalThis);
