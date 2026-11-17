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
        // Les images de la scène (assets/illustrations/) : son visage, elle dans
        // l'espace conseil, le visage d'Antoine, le décor vide.
        face: 'visages/mme-riviere.webp',
        picture: 'dialogues/riviere-espace-conseil.webp',
        seller: 'visages/antoine.webp',
        decor: 'dialogues/concession-bureau.webp',
        context: 'Vous êtes Antoine, conseiller dans une concession automobile. Mme Rivière, infirmière libérale, a rendez-vous jeudi à 13 h pour un essai, entre ses deux tournées. Elle a 30 minutes. Avant l’essai, vous voulez comprendre ses besoins pour lui proposer le bon véhicule.'
      },

      /* La question d'accroche, avant la partie, et les questions de
       * vérification, après (une à la fois, retour aussitôt). Mêmes règles que
       * le scénario : longueurs mêlées, bonne réponse à des places variées. */
      warmup: {
        question: 'Selon vous, à quoi sert la découverte avec Mme Rivière, avant l’essai ?',
        order: ['b', 'c', 'a'], best: 'a',
        choices: {
          a: { text: 'À comprendre ses besoins et ce qui compte pour elle, pour lui faire essayer le bon véhicule.', fb: 'C’est tout l’enjeu : l’essai n’a de sens que sur un véhicule choisi à partir de ses besoins. Trente minutes suffisent si vos questions la font parler.' },
          b: { text: 'À présenter rapidement la gamme, pour qu’elle choisisse le modèle à essayer en connaissance de cause.', fb: 'Présenter la gamme, c’est parler de vous avant de parler d’elle. Sans connaître ses besoins, vous risquez de lui faire essayer un véhicule qui ne lui convient pas.' },
          c: { text: 'À vérifier son budget avant tout, pour ne pas perdre de temps sur l’essai.', fb: 'Le budget compte, mais commencer par lui ferme l’échange : elle répond à une question d’argent sans dire ce qu’elle attend de sa voiture.' }
        }
      },
      quiz: [
        {
          question: 'Une cliente se touche l’épaule en parlant du coffre. Que faites-vous ?',
          order: ['a', 'c', 'b'], best: 'a',
          choices: {
            a: { text: 'Je lui demande ce qui se passe, en partant de son geste.', fb: 'Un signal comme ce geste est une porte d’entrée : une question ouverte qui part de lui la laisse expliquer elle-même son vrai besoin.' },
            b: { text: 'Je note qu’il lui faut un grand coffre, et je passe à la question suivante.', fb: 'Vous interprétez à sa place et vous passez à côté de l’essentiel : ce n’est pas la taille du coffre, c’est son épaule.' },
            c: { text: 'Je lui propose aussitôt un modèle équipé d’un hayon électrique, pour la soulager.', fb: 'L’intention est bonne, mais c’est une solution avant d’avoir compris le problème. La discussion risque de partir sur le prix de l’option.' }
          }
        },
        {
          question: 'Quelle question fait le mieux dire à la cliente ce que lui coûte son problème ?',
          order: ['c', 'a', 'b'], best: 'a',
          choices: {
            a: { text: 'Que se passerait-il si votre voiture vous lâchait de nouveau ?', fb: 'Une question ouverte sur les conséquences : elle mesure elle-même l’enjeu, en euros et en patients perdus.' },
            b: { text: 'Une panne, ce serait embêtant, n’est-ce pas ?', fb: 'La question est orientée : elle appelle un « oui » sans rien vous apprendre de plus.' },
            c: { text: 'Vous avez déjà eu beaucoup de pannes avec votre voiture actuelle ?', fb: 'La question est fermée : vous saurez combien de pannes, pas ce qu’elles lui coûtent.' }
          }
        },
        {
          question: 'Pour faire hiérarchiser ses besoins à la cliente, quelle question posez-vous ?',
          order: ['b', 'c', 'a'], best: 'a',
          choices: {
            a: { text: 'Si vous deviez choisir, qu’est-ce qui passe en premier pour vous ?', fb: 'Une question qui oblige à choisir : c’est elle qui classe, et votre hiérarchie reposera sur ses mots.' },
            b: { text: 'Tout est important pour vous, j’imagine ?', fb: '« Tout est important » est toujours vrai : la cliente acquiesce, et vous ne savez toujours pas ce qui compte le plus.' },
            c: { text: 'C’est bien le budget qui compte le plus pour vous, n’est-ce pas ?', fb: 'Vous lui soufflez votre propre hiérarchie. Elle peut acquiescer par politesse, ou vous contredire sans vous dire ce qui compte vraiment.' }
          }
        },
        {
          question: 'Avant l’essai, à quoi sert la reformulation finale ?',
          order: ['a', 'b', 'c'], best: 'a',
          choices: {
            a: { text: 'À vérifier avec elle ce que vous avez compris, et dans quel ordre.', fb: 'La reformulation est une validation : la cliente confirme ou corrige. Vous partez à l’essai sur des besoins vérifiés.' },
            b: { text: 'À lui montrer que vous l’avez écoutée, avant de lui présenter le véhicule le mieux adapté.', fb: 'Montrer qu’on a écouté est un effet, pas le but. Et glisser le véhicule dans la foulée transforme la validation en vente.' },
            c: { text: 'À résumer l’entretien pour votre fiche client, une fois qu’elle est partie.', fb: 'La reformulation se fait avec la cliente, pendant l’entretien : sinon, personne ne valide ce que vous avez compris.' }
          }
        }
      ],

      start: 5,
      // Le chrono : les 30 minutes de Mme Rivière, essai compris. Il faut au
      // moins `testMin` minutes à la fin pour un vrai essai.
      minutes: 30,
      testMin: 10,
      steps: [
        {
          scene: 'Jeudi, 13 h. Mme Rivière arrive à l’heure, un peu essoufflée : elle a tourné dix minutes pour se garer. Elle pose sur le bureau les clés d’une voiture de location.',
          says: 'Bonjour… Pardon, je n’ai trouvé de place nulle part. Je reprends ma tournée à 13 h 30 : j’ai trente minutes, pas plus.',
          order: ['b', 'a', 'c'],
          choices: {
            a: { intent: 'Cadrer le temps, puis la faire parler de ses journées', minutes: 4, text: 'Trente minutes, c’est noté : dix minutes pour parler de vos journées, puis l’essai. Racontez-moi une journée de tournée.', points: 2, reply: 'Alors… je pars vers 7 h, une quinzaine de patients le matin, à peu près autant le soir. Surtout en centre-ville, et dans deux villages un peu plus loin. Des pansements, des prises de sang, des injections… Je monte et je descends de voiture toute la journée.' },
            b: { intent: 'Gagner du temps en précisant d’abord la motorisation', minutes: 1, text: 'Trente minutes, c’est noté. Pour gagner du temps : vous roulez plutôt en diesel, en essence ou en hybride, en ce moment ?', points: 0, reply: 'Euh… ce qui consomme le moins, je suppose. Je n’y connais pas grand-chose, vous savez. Ma dernière voiture, c’est mon frère qui me l’avait choisie.', note: 'La question n’est pas fausse en soi : le carburant comptera. Mais elle arrive trop tôt. Vous précisez un détail avant de savoir comment elle utilise sa voiture, et sa réponse (« ce qui consomme le moins ») ne vous apprend presque rien.' },
            c: { intent: 'Lui proposer tout de suite un modèle à essayer', minutes: 3, text: 'J’ai une citadine hybride qui ira parfaitement pour vos tournées : on va l’essayer tout de suite ?', points: -2, reply: 'Attendez, vous ne savez même pas ce que je fais. Je ne vais pas essayer une voiture au hasard, je n’ai pas le temps de me tromper deux fois.', note: 'Vous proposez un véhicule avant de savoir quoi que ce soit de ses journées. Elle vous le fait remarquer, et la découverte démarre sur une méfiance.' }
          },
          best: 'a', why: 'Vous respectez son temps en annonçant le déroulé, puis vous ouvrez largement sur ses journées. C’est le premier étage de l’entonnoir : la situation, avec ses mots.'
        },
        {
          scene: 'Elle enlève son manteau, jette un œil aux voitures exposées, puis se tourne vers vous.',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Lui demander ce qui la gêne avec sa voiture', minutes: 3, text: 'Qu’est-ce qui vous complique le plus la vie avec une voiture, pendant vos tournées ?', points: 2, reply: 'Me garer, surtout. En centre-ville, je tourne parfois dix minutes devant chez un patient. Et pendant ce temps-là, lui, il m’attend. Certains jours, je finis par me garer en double file, avec les warnings, et je croise les doigts.' },
            b: { intent: 'Vérifier si elle roule souvent sur autoroute', minutes: 2, text: 'Pour vos tournées, vous prenez souvent l’autoroute, en dehors de vos trajets en ville ?', points: 0, reply: 'Un peu, pour aller dans les villages. Pas tant que ça, en fait : vingt minutes de voie rapide le matin, autant le soir. Le reste, c’est de la ville.', note: 'La question est fermée : elle appelle un oui ou un non. Vous obtenez un détail utile (« les villages »), mais rien sur ce qui la gêne vraiment.' },
            c: { intent: 'Lui faire valider l’intérêt d’une petite voiture', minutes: 1, text: 'Pour des tournées, une petite voiture reste ce qu’il y a de plus pratique, vous êtes d’accord ?', points: -2, reply: 'Si vous le dites… Je ne me suis pas vraiment posé la question comme ça.', note: 'La question est orientée : elle contient déjà votre réponse et lui demande seulement d’acquiescer. « Si vous le dites… » : elle se range à votre avis sans rien vous apprendre.' }
          },
          best: 'a', why: 'Une question ouverte, ciblée sur ses difficultés. Elle vous parle de ce qui la gêne vraiment, sans que vous ayez rien supposé : c’est le deuxième étage.'
        },
        {
          says: 'Et puis il y a le coffre. Mon sac de soins, je le sors vingt fois par jour, et il pèse son poids…',
          picture: true,
          after: 'En le disant, elle se touche l’épaule droite, avec une petite grimace.',
          order: ['b', 'c', 'a'],
          choices: {
            a: { intent: 'Rebondir sur son geste vers l’épaule', minutes: 2, text: 'Vous vous êtes touché l’épaule en parlant du coffre : qu’est-ce qui se passe, au juste ?', points: 2, reply: 'Oh… une tendinite, depuis six mois. Mon ancien coffre était haut, je soulevais le sac à bout de bras. Le kiné m’a dit d’arrêter de forcer. Facile à dire.' },
            b: { intent: 'Reformuler son besoin : un coffre plus grand', minutes: 1, text: 'Si je comprends bien, il vous faudrait surtout un grand coffre, pour ranger votre sac sans difficulté ?', points: 0, reply: 'Pas forcément grand, non. Mon sac tient dans n’importe quel coffre. Qu’il soit facile d’accès, surtout.', note: 'L’intention est bonne, mais vous interprétez à sa place. Ce n’est pas la taille du coffre qui compte pour elle : elle doit vous corriger, et la raison de son geste reste cachée.' },
            c: { intent: 'Lui présenter l’option du hayon électrique', minutes: 4, text: 'Nos modèles existent avec un hayon électrique en option : vous n’auriez plus rien à soulever vous-même.', points: -2, reply: 'Ah. Et ça coûte combien, cette option ? Parce que si c’est pour doubler le prix de la voiture…', note: 'Vous proposez une solution avant d’avoir compris le problème. La discussion part aussitôt sur le prix de l’option, et vous ne saurez pas pourquoi elle s’est touché l’épaule.' }
          },
          best: 'a', why: 'Vous partez d’un signal, son geste vers l’épaule, et vous la laissez expliquer sans rien supposer. Le vrai besoin apparaît : un coffre accessible, à cause de sa tendinite.'
        },
        {
          says: 'Il faut dire que ma voiture m’a lâchée la semaine dernière, en pleine tournée, devant chez une patiente. D’où la location. Je ne veux plus jamais revivre ça.',
          order: ['a', 'b', 'c'],
          choices: {
            a: { intent: 'Lui faire imaginer une nouvelle panne', minutes: 2, text: 'Que se passerait-il si votre voiture vous lâchait de nouveau ?', points: 2, reply: 'Ce serait la catastrophe. La location, c’est 60 € par jour, et j’ai dû annuler des patients. Cette fois-ci, au total, j’ai perdu 1 500 €.' },
            b: { intent: 'Vérifier ce que couvre son assurance actuelle', minutes: 3, text: 'Votre assurance actuelle vous prévoit-elle un véhicule de prêt en cas de panne ?', points: 0, reply: 'Euh… non, je ne crois pas. Il faudrait que je regarde mon contrat. De toute façon, cette fois, j’ai tout payé de ma poche.', note: 'La question est utile, mais fermée et trop précise à ce stade. Vous apprenez qu’elle n’a pas de véhicule de prêt, sans savoir ce qu’une panne lui coûte vraiment.' },
            c: { intent: 'La rassurer sur vos modèles', minutes: 1, text: 'Avec nous, plus de souci : nos modèles sont fiables.', points: -2, reply: 'On m’a déjà dit ça. Ma voiture aussi était « fiable », d’après le vendeur. Elle avait quatre ans.', note: 'Vous voulez la rassurer, mais une promesse générale ne rassure personne, surtout après une panne. Elle l’a déjà entendue : la confiance baisse.' }
          },
          best: 'a', why: 'Vous lui faites dire elle-même ce que coûte le problème. Elle mesure l’enjeu (60 € par jour, 1 500 € perdus) : c’est ce qui donnera du poids à votre future proposition.'
        },
        {
          scene: 'Elle jette un œil à sa montre, mais reste assise.',
          order: ['c', 'b', 'a'],
          choices: {
            a: { intent: 'Lui demander ce qui la rendrait sereine', minutes: 3, text: 'Qu’est-ce qui ferait que vous vous sentiez vraiment sereine avec votre prochaine voiture ?', points: 2, reply: 'Savoir qu’on me dépanne vite, et qu’on me prête une voiture le temps de la réparation. Et ne pas me ruiner : je suis à mon compte, un jour sans rouler, c’est un jour sans être payée.' },
            b: { intent: 'Connaître ses goûts de couleur', minutes: 1, text: 'Pour la voiture, vous avez une préférence de couleur ou de finition ?', points: 0, reply: 'Franchement ? Peu importe. Du moment qu’elle démarre le matin, elle peut être rose.', note: 'La question est hors sujet : la couleur ne pèse pas dans sa décision. Vous perdez une minute précieuse alors qu’elle regarde l’heure.' },
            c: { intent: 'Lui suggérer le modèle le plus fiable de la gamme', minutes: 2, text: 'Vous préférez sûrement le modèle le plus fiable de la gamme, même s’il coûte un peu plus cher ?', points: -2, reply: 'Tout dépend du prix. Je suis à mon compte, moi : je ne vais pas payer pour des choses dont je n’ai pas besoin.', note: 'La question est orientée : vous lui soufflez la réponse (« le plus fiable, même plus cher »). Elle se défend sur le prix, et sa vraie motivation n’apparaît pas.' }
          },
          best: 'a', why: 'Une question ouverte sur ce qui la rendrait sereine : elle exprime ses motivations avec ses mots (le dépannage, une voiture de prêt, ne pas se ruiner).'
        },
        {
          says: 'Bon, il me reste {reste}. Et je ne veux surtout plus me retrouver à pied comme la semaine dernière.', // le temps réellement restant au chrono
          order: ['c', 'a', 'b'],
          choices: {
            a: { intent: 'Lui faire classer elle-même ses critères', minutes: 2, text: 'Si vous deviez classer : vous garer, un coffre accessible, une voiture de prêt en cas de panne, le budget… qu’est-ce qui passe en premier ?', points: 2, reply: 'La voiture de prêt, sans hésiter. Sans voiture, je ne travaille pas. Ensuite le coffre, pour mon épaule. Puis me garer. Le budget compte, mais pas en premier.' },
            b: { intent: 'Vérifier que tous ses critères comptent', minutes: 2, text: 'Le stationnement, le coffre, la voiture de prêt, le budget : j’imagine que tout compte pour vous ?', points: 0, reply: 'Ben… oui, tout compte. C’est pour ça que je suis là, non ?', note: 'La question ne l’aide pas à choisir : « tout compte » est toujours vrai. Elle acquiesce, et vous ne savez toujours pas ce qui passe en premier.' },
            c: { intent: 'Lui faire confirmer que le budget passe avant tout', minutes: 3, text: 'Entre le stationnement, le coffre et la voiture de prêt en cas de panne, c’est quand même le budget, au fond, qui passe en premier pour vous, non ?', points: -2, reply: 'Non, pas forcément. Le budget compte, mais ce n’est pas ce qui m’inquiète le plus.', note: 'Vous lui imposez votre hiérarchie : pour vous, c’est le budget. Elle vous contredit, sans vous dire ce qui compte vraiment pour elle.' }
          },
          best: 'a', why: 'Une question qui l’oblige à choisir. C’est elle qui classe ses besoins : votre hiérarchie reposera sur ses mots, pas sur vos idées.'
        },
        {
          prompt: 'Avant l’essai, quelle validation faites-vous ?',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Résumer ses besoins dans l’ordre et les faire valider', minutes: 2, text: 'Si je résume : d’abord une voiture de prêt en cas de panne, car une panne vous empêche de travailler ; puis un coffre facile d’accès pour votre épaule ; une voiture simple à garer ; un budget maîtrisé. Dans cet ordre ?', points: 2, reply: '' },
            b: { intent: 'Résumer en une phrase, simplement', minutes: 3, text: 'Si je résume : une petite voiture, facile à garer en ville et pas trop chère, avec un coffre assez grand pour votre sac de soins et vos allers-retours entre deux patients, toute la journée. C’est bien ça ?', points: 0, reply: 'C’est un peu court… Vous oubliez le plus important pour moi : ne plus me retrouver à pied.', note: 'Le résumé n’est pas faux, mais il est trop court : il oublie la voiture de prêt, son vrai premier besoin, et ne donne aucun ordre. Elle ne peut pas le valider.' },
            c: { intent: 'Résumer ses besoins en lui proposant votre citadine hybride', minutes: 4, text: 'Si je résume : une voiture fiable, un coffre pratique pour votre épaule, facile à garer en ville… notre citadine hybride avec hayon électrique coche toutes les cases. On l’essaie dès maintenant ?', points: -2, reply: 'Vous allez un peu vite, là… Je ne suis même pas sûre que ce soit la voiture qu’il me faut.', note: 'Vous glissez un produit dans le résumé : ce n’est plus une validation, c’est une proposition. Elle sent la vente arriver trop vite.' }
          },
          best: 'a', why: 'Une synthèse dans l’ordre, avec ses raisons, et une question qui lui permet de valider ou de corriger. Elle se sent comprise avant l’essai.'
        }
      ],

      // Les fins, selon la jauge à la fin du scénario. La première suppose aussi
      // la bonne validation à l'étape 7 : sinon, c'est la deuxième.
      endings: [
        { min: 8, title: 'Un essai sur le bon véhicule', says: 'Exactement. Et dans cet ordre, oui. C’est la première fois qu’on me pose autant de questions avant de me proposer une voiture. Allez, on l’essaie ?', text: 'L’essai se fait sur le bon véhicule.', tone: 'ok' },
        { min: 4, title: 'Un essai, mais des doutes', says: 'Bon… on peut l’essayer. Mais je ne suis pas sûre que ce soit le bon modèle pour moi.', text: 'L’essai a lieu, mais Mme Rivière hésite.', tone: 'mid' },
        { min: 0, title: 'Pas d’essai', says: 'Écoutez, je vais devoir y aller, mes patients m’attendent. Je reviendrai peut-être.', text: 'L’essai n’a pas lieu.', tone: 'ko' }
      ],

      // Plus assez de temps pour un vrai essai (moins de `testMin` minutes).
      shortEnding: { title: 'Un essai écourté', says: 'Je dois filer, ma patiente m’attend. On fait juste le tour du pâté de maisons ?', text: 'Il ne reste que {reste} : l’essai est bâclé, et elle repart sans avoir pu juger le véhicule.', tone: 'mid' },

      // La carte des besoins : six rubriques (gabarit de la fiche).
      map: [
        { id: 'explicites', tab: 'Explicites', label: '1 · Les besoins explicites', sub: 'Ce qu’elle a demandé, avec ses mots.', placeholder: 'Elle a demandé…', required: true,
          model: 'Une voiture pour ses tournées (« une quinzaine de patients, centre-ville et deux villages ») ; se garer facilement.' },
        { id: 'implicites', tab: 'Implicites', label: '2 · Les besoins implicites', sub: 'Ce qui est apparu, et la question qui l’a fait émerger.', placeholder: 'Un besoin… révélé par la question « … »', required: true,
          model: 'Un coffre accessible sans soulever (sa tendinite, révélée par la question sur son geste vers l’épaule) ; une voiture de prêt en cas de panne (révélée par « Que se passerait-il si… ? »).' },
        { id: 'motivations', tab: 'Motivations', label: '3 · Ses motivations d’achat', sub: 'La motivation dominante et les secondaires (SONCASE), avec les mots indices.', placeholder: 'Dominante : … (« … ») ; secondaires : …', required: true,
          model: 'Sécurité, dominante (« sans voiture, je ne travaille pas », « je ne veux plus revivre… ») ; argent (« je suis à mon compte ») ; confort (son épaule, le stationnement).' },
        { id: 'hierarchie', tab: 'Hiérarchie', label: '4 · La hiérarchie', sub: 'Prioritaire, important, secondaire, et comment elle a été validée (ou pas).', placeholder: '① … ② … ③ … Validée par…', required: true,
          model: '① La voiture de prêt en cas de panne ② le coffre accessible ③ la facilité de stationnement ④ un budget maîtrisé. Validée à l’étape 7 (« C’est bien dans cet ordre ? »).' },
        { id: 'manque', tab: 'Ce qui manque', label: '5 · Ce qui manque encore', sub: 'Ce que vous n’avez pas découvert, et que vous demanderiez au prochain échange.', placeholder: 'Il me manque…', required: true,
          model: 'Le budget précis ; le kilométrage annuel ; le mode de financement envisagé.' },
        { id: 'critique', tab: 'Auto-critique', label: '6 · Mon auto-critique', sub: 'Deux questions de votre partie que vous reformuleriez : votre question, la nouvelle version, son type.', placeholder: 'À l’étape …, j’ai choisi « … ». Je dirais plutôt « … » (type : …).', required: true,
          model: 'À l’étape 3, j’ai choisi « Il vous faudrait surtout un grand coffre… » : une interprétation. Je demanderais maintenant « Vous vous êtes touché l’épaule en parlant du coffre : qu’est-ce qui se passe, au juste ? », une question ouverte qui part de son geste et l’aurait laissée expliquer.' }
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
    },

    /* OPTION 1 « LE COACH » (Bloom 4-5-6, ≈ 50 min). Un collègue vous confie
     * la transcription de son deuxième rendez-vous. Deux dossiers au choix :
     * A (Camille, magasin de cuisines) et B (Karim, entreprise de propreté ;
     * le client est un hôtel, à la place de l'établissement pour personnes
     * âgées de la fiche). Pour chaque moment M1-M10, trois diagnostics : le
     * bon (`best`), un à moitié juste (tone 'mid'), un contresens ('ko').
     * Longueurs et positions vérifiées par script (règles « sans biais »). */
    '6.2': {
      eyebrow: 'Pour aller plus loin · Synthèse facultative',
      title: 'Le coach',
      subtitle: 'Analysez l’entretien d’un collègue, repérez ce qui a ouvert ou fermé la découverte, et aidez-le à progresser.',

      // L'accroche : la règle d'or du coach.
      warmup: {
        question: 'Votre collègue vous demande votre avis sur son entretien. Par quoi commencez-vous votre retour ?',
        order: ['b', 'a', 'c'], best: 'a',
        choices: {
          a: { text: 'Par ce qui a fonctionné, en citant ses questions.', fb: 'C’est la règle d’or du coach : partir du positif, avec des faits. Votre collègue sait ce qu’il doit garder, et il écoutera mieux la suite.' },
          b: { text: 'Par l’erreur qui lui a coûté le plus cher, pour qu’il la retienne bien.', fb: 'Commencer par l’erreur met votre collègue sur la défensive. Il retiendra le reproche, pas le conseil. Le positif d’abord, avec ses questions à l’appui.' },
          c: { text: 'Par votre impression générale sur sa façon de vendre.', fb: 'Une impression générale juge la personne, pas l’entretien. Un bon retour est factuel : il cite les questions et ce qu’elles ont produit.' }
        }
      },

      // Ce que vous allez faire, annoncé avant tout (sous le message du collègue).
      mission: [
        'Lire son entretien en entier.',
        'L’analyser question par question : qu’a fait votre collègue, et qu’est-ce que ça a produit chez le client ?',
        'Repérer les 3 moments qui ont tout changé, et proposer de meilleures questions.',
        'Lui rédiger une fiche de coaching.'
      ],

      // L'aide-mémoire, ouvrable pendant l'analyse et les réécritures.
      memo: [
        { term: 'Cadrage', text: 'Annonce le déroulé ou le temps de l’entretien.', ex: 'On prend vingt minutes ?' },
        { term: 'Ouverte large', text: 'Fait raconter la situation, sans rien supposer (étage 1).', ex: 'Racontez-moi une journée type.' },
        { term: 'Ouverte ciblée', text: 'Fait parler d’une difficulté ou d’un enjeu (étage 2).', ex: 'Qu’est-ce qui vous gêne le plus ?' },
        { term: 'Écho', text: 'Reprend les mots du client pour qu’il développe.', ex: 'Vos réceptionnistes dépannent ?' },
        { term: 'Fermée', text: 'Appelle un oui, un non ou un chiffre. Utile pour préciser, plutôt vers la fin.', ex: 'Vous avez un budget ?' },
        { term: 'Alternative', text: 'Propose un choix. Utile pour préciser, pas trop tôt.', ex: 'Bois ou laqué ?' },
        { term: 'Orientée', text: 'Contient déjà la réponse, ou glisse un produit : elle ferme l’échange.', ex: 'Vous voulez un îlot, c’est ça ?' },
        { term: 'Validation', text: 'Résume et fait confirmer, ou fait classer les priorités (étage 5).', ex: 'Qu’est-ce qui passe en premier ?' }
      ],
      funnel: ['La situation', 'Les difficultés et les enjeux', 'Les précisions', 'Les motivations', 'La validation'],

      rule: 'La règle d’or du coach : un retour factuel (vous citez les questions), qui commence par ce qui a fonctionné et ne juge pas la personne.',

      // Les types proposés pour vos réécritures.
      types: [
        { id: 'ouverte', label: 'Ouverte' },
        { id: 'echo', label: 'Écho (relance)' },
        { id: 'alternative', label: 'Alternative' },
        { id: 'fermee', label: 'Fermée' },
        { id: 'synthese', label: 'Synthèse à faire valider' }
      ],
      // Des mots de produit : une réécriture qui en contient propose une solution.
      productWords: ['îlot', 'ilot', 'laqué', 'laque', 'bois', 'devis', 'catalogue', 'modèle', 'premium', 'formule', 'offre', 'contrat', 'remplacement garanti', 'notre', 'nos '],

      dossiers: {
        A: {
          id: 'A', tab: 'Dossier A · Commerce', title: 'Camille et les Leroy', place: 'Un magasin de cuisines, deuxième rendez-vous',
          decor: 'dialogues/magasin-cuisines.webp',
          seller: { name: 'Camille', role: 'Conseillère cuisine', face: 'visages/camille.webp' },
          people: {
            mme: { name: 'Mme Leroy', face: 'visages/mme-leroy.webp' },
            mr: { name: 'M. Leroy', face: 'visages/m-leroy.webp' }
          },
          context: 'Camille, conseillère dans un magasin de cuisines, revoit M. et Mme Leroy. Au premier rendez-vous, elle était allée trop vite.',
          ask: 'J’ai revu les Leroy ce matin. Je pensais avoir bien questionné, mais je repars sans savoir quoi leur proposer. Vous pouvez relire mon entretien et m’aider ?',
          moments: [
            { n: 'M1', q: 'Merci d’être revenus. La dernière fois, je suis allée un peu vite. Aujourd’hui, je vous propose qu’on parle d’abord de vous et de votre cuisine, sans catalogue. Ça vous va ?',
              replies: [{ who: 'mme', text: 'Oui, très bien.' }],
              hint: 'Regardez ce que Camille annonce, et comment le couple réagit.',
              order: ['b', 'a', 'c'], best: 'a',
              choices: {
                a: { text: 'Un cadrage : elle reconnaît son erreur et annonce qu’elle va d’abord écouter.' },
                b: { text: 'Une question fermée : « Ça vous va ? » n’appelle qu’un oui, sans rien apprendre.', tone: 'mid', note: 'Elle se termine bien par une question fermée, mais ce n’est pas le sujet : ici, un « oui » suffit. Le moment sert à réparer la relation et à poser le cadre de l’écoute.' },
                c: { text: 'Une maladresse : en s’excusant, elle perd sa crédibilité face au couple.', tone: 'ko', note: 'Au contraire : reconnaître qu’elle est allée vite rassure les Leroy. Le couple accepte aussitôt de parler de lui.' }
              },
              why: 'Point fort. Elle répare la relation (« je suis allée un peu vite ») et annonce l’écoute (« sans catalogue »). Le couple accepte aussitôt.' },
            { n: 'M2', q: 'Racontez-moi une journée type dans votre cuisine.',
              replies: [{ who: 'mme', text: 'Le matin, c’est rapide. Mais le week-end, avec les petits-enfants, on cuisine à quatre ou cinq, et on se marche dessus.' }],
              hint: 'Quelle information nouvelle cette question a-t-elle fait apparaître ?',
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte large : elle fait apparaître le moment clé, le week-end à plusieurs.' },
                b: { text: 'Une question ouverte, mais trop vague : la réponse reste générale et peu utile pour la suite.', tone: 'mid', note: 'Elle est large, mais pas vague : la réponse donne le moment clé (« le week-end… on se marche dessus »). C’est ce qu’on attend du premier étage de l’entonnoir.' },
                c: { text: 'Une question hors sujet : la vie de famille ne dit rien de la cuisine à concevoir.', tone: 'ko', note: 'C’est l’inverse : la vie de famille est au cœur du projet. « On cuisine à quatre ou cinq » annonce déjà le besoin de place.' }
              },
              why: 'Point fort. Une question ouverte large, premier étage de l’entonnoir : elle fait apparaître le moment clé (« le week-end, on se marche dessus »).' },
            { n: 'M3', q: 'Vous avez combien de petits-enfants ? Quel âge ? Ils viennent tous les week-ends ?',
              replies: [{ who: 'mme', text: 'Trois… 6, 9 et 12 ans. Presque tous les week-ends.' }],
              hint: 'Comptez les questions, et regardez ce que la réponse apprend vraiment.',
              order: ['c', 'b', 'a'], best: 'a',
              choices: {
                a: { text: 'Trois questions fermées en rafale : un interrogatoire qui apprend peu.' },
                b: { text: 'Une relance utile : elle creuse le moment clé que Mme Leroy vient d’évoquer.', tone: 'mid', note: 'L’intention de creuser est bonne, mais pas la forme : trois questions fermées d’affilée. Elle obtient des chiffres, pas ce qui se passe quand on « se marche dessus ».' },
                c: { text: 'Une question alternative : elle aide Mme Leroy à préciser son besoin de place.', tone: 'ko', note: 'Ce ne sont pas des alternatives (« ceci ou cela ? ») mais trois questions fermées. Et rien ne porte sur la place : l’âge des enfants ne dit pas ce qui gêne.' }
              },
              why: 'Trois fermées d’affilée : c’est un interrogatoire. Une seule question ouverte sur le moment évoqué (« Comment ça se passe, quand vous cuisinez à cinq ? ») en aurait appris davantage.' },
            { n: 'M4', q: 'Vous voulez donc un îlot central, c’est ça ?',
              scene: 'M. Leroy fronce les sourcils.',
              replies: [{ who: 'mr', text: 'On n’a pas dit ça.' }],
              hint: 'D’où vient le mot « îlot » : du couple, ou de Camille ?',
              order: ['b', 'c', 'a'], best: 'a',
              choices: {
                a: { text: 'Une question orientée : elle glisse une solution, et M. Leroy se braque.' },
                b: { text: 'Une reformulation : elle vérifie ce qu’elle a compris du besoin de place.', tone: 'mid', note: 'Une reformulation reprend les mots du client. Ici, « îlot central » vient de Camille : c’est une solution déguisée en question, et M. Leroy le sent.' },
                c: { text: 'Une précision bien placée : le besoin de place est déjà clair à ce stade.', tone: 'ko', note: 'Rien n’est clair encore : on sait qu’ils « se marchent dessus », pas pourquoi. Proposer l’îlot à ce stade ferme la découverte.' }
              },
              why: 'Décisif. Elle propose une solution avant d’avoir compris le problème. M. Leroy fronce les sourcils : la découverte se ferme.' },
            { n: 'M5', q: 'Pardon. Qu’est-ce qui vous gêne le plus aujourd’hui quand vous cuisinez à plusieurs ?',
              replies: [{ who: 'mme', text: 'Le plan de travail est trop petit. Et avec mon dos, je ne peux plus me baisser pour sortir les plats du four.' }],
              hint: 'Comparez avec M4 : qu’est-ce qui change dans la réponse ?',
              order: ['a', 'b', 'c'], best: 'b',
              choices: {
                a: { text: 'Une question orientée : « ce qui vous gêne » suppose un problème que le couple n’a pas évoqué.', tone: 'ko', note: 'Elle ne suppose rien : le couple vient de dire qu’il se marche dessus. Elle le laisse dire ce qui gêne, avec ses mots : deux besoins apparaissent (la place, le dos).' },
                b: { text: 'Une question ouverte ciblée : elle rattrape la situation, et deux besoins apparaissent.' },
                c: { text: 'Une question ouverte large : elle repart de zéro sur leur façon de cuisiner.', tone: 'mid', note: 'Elle est ouverte, mais pas large : elle cible les difficultés (« ce qui vous gêne le plus »), le deuxième étage de l’entonnoir. C’est pour cela qu’elle fait apparaître deux besoins précis.' }
              },
              why: 'Point fort. Une question ouverte ciblée sur les difficultés (deuxième étage) : elle rattrape M4, et deux besoins apparaissent (un plan de travail plus grand, ne plus se baisser pour le four).' },
            { n: 'M6', q: 'Et vous, Monsieur, qu’est-ce qui compte pour vous dans ce projet ?',
              replies: [{ who: 'mr', text: 'Que les travaux ne s’éternisent pas. La salle de bains, trois mois de retard… plus jamais.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte à l’autre décideur : elle fait apparaître sa motivation.' },
                b: { text: 'Une question de politesse : elle fait participer M. Leroy, sans enjeu pour la vente.', tone: 'mid', note: 'Elle fait bien participer M. Leroy, mais l’enjeu est réel : c’est lui qui pose les conditions (les délais, puis le prix ferme). Sans cette question, Camille passait à côté.' },
                c: { text: 'Une question qui divise : elle oppose les attentes de Monsieur à celles de Madame.', tone: 'ko', note: 'Elle ne les oppose pas : elle donne la parole à celui qui se taisait, et qui s’était braqué en M4. Il livre sa motivation, la sécurité (« plus jamais »).' }
              },
              why: 'Point fort. Une question ouverte adressée à l’autre décideur : M. Leroy livre sa motivation, la sécurité (« trois mois de retard… plus jamais »).' },
            { n: 'M7', q: 'Les délais, c’est votre priorité ?',
              replies: [{ who: 'mr', text: 'Les délais, et un prix ferme. Pas de surprise à la fin.' }],
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une question fermée inutile : M. Leroy venait juste de le dire.', tone: 'mid', note: 'Elle valide ce qu’il a dit, et c’est utile : en répondant, il ajoute « un prix ferme ». Une fermée bien placée, après les ouvertes, sert à préciser.' },
                b: { text: 'Une question orientée : elle impose les délais comme la priorité du couple.', tone: 'ko', note: 'Elle reprend le mot de M. Leroy, sans rien lui souffler : c’est une validation. Et il en dit plus que la question (« et un prix ferme »).' },
                c: { text: 'Une question fermée de validation : elle fait préciser « prix ferme ».' }
              },
              why: 'Utile. Une fermée de validation, bien placée après les ouvertes : M. Leroy précise sa condition (« un prix ferme, pas de surprise »).' },
            { n: 'M8', q: 'Vous préférez du bois ou du laqué ?',
              replies: [{ who: 'mme', text: 'Euh… on n’y a pas encore pensé.' }],
              order: ['c', 'a', 'b'], best: 'c',
              choices: {
                a: { text: 'Une question alternative bien choisie : elle aide le couple à se projeter.', tone: 'mid', note: 'La forme est juste (une alternative), mais pas le moment : les Leroy « n’y ont pas encore pensé ». Il restait à explorer leurs attentes au quotidien.' },
                b: { text: 'Une question ouverte : elle laisse le couple libre de répondre ce qu’il veut.', tone: 'ko', note: '« Bois ou laqué ? » ne laisse que deux réponses : c’est une alternative. Et elle arrive trop tôt, sur un détail esthétique.' },
                c: { text: 'Une alternative trop tôt : elle saute aux finitions avant d’avoir fini d’explorer.' }
              },
              why: 'Décisif. Une alternative prématurée, sur l’esthétique : Camille saute à la précision avant d’avoir fini d’explorer. Le couple n’y a « pas encore pensé ».' },
            { n: 'M9', q: 'Vous avez un budget ?',
              replies: [{ who: 'mr', text: 'On a mis de côté 15 000 €. Pas un euro de plus.' }],
              order: ['b', 'c', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question orientée : elle pousse le couple à annoncer un chiffre élevé.', tone: 'ko', note: 'Elle ne souffle aucun montant. C’est une fermée sèche, posée sans transition, mais M. Leroy donne le chiffre et sa limite (« pas un euro de plus »).' },
                b: { text: 'Une fermée sèche sur le budget, mal amenée : l’information est quand même obtenue.' },
                c: { text: 'Une question indiscrète : on ne parle pas du budget aussi tôt dans un projet de cuisine.', tone: 'mid', note: 'Le budget se demande, et ce n’est pas trop tôt ici. Le défaut est la forme : une fermée sèche, sans transition. Mieux : « Quel budget avez-vous prévu pour ce projet ? »' }
              },
              why: 'Mal amenée, mais l’information est obtenue : 15 000 €, « pas un euro de plus ». Une question ouverte (« Quel budget avez-vous prévu ? ») aurait été plus naturelle.' },
            { n: 'M10', q: 'Très bien, je vous prépare un devis.',
              scene: 'M. et Mme Leroy échangent un regard.',
              replies: [],
              order: ['a', 'c', 'b'], best: 'b',
              choices: {
                a: { text: 'Une conclusion efficace : le couple a donné son budget, place au devis.', tone: 'mid', note: 'Le devis est la suite logique, mais Camille saute la validation : elle ne résume pas et ne fait pas classer les priorités. Elle ne sait pas ce qui passe en premier.' },
                b: { text: 'Une clôture sans validation : elle ignore ce qui compte le plus.' },
                c: { text: 'Une reformulation : elle résume les besoins avant de faire sa proposition.', tone: 'ko', note: 'Il n’y a aucun résumé : « je vous prépare un devis » clôt l’échange. C’est justement ce qui manque ici.' }
              },
              why: 'Décisif. Une clôture sans résumé ni hiérarchie : Camille repart sans savoir ce qui compte le plus pour le couple. C’est pour cela qu’elle « ne sait pas quoi proposer ».' }
          ],
          decisive: {
            expected: ['M4', 'M8', 'M10'], acceptable: ['M3'],
            text: 'Les moments décisifs sont M4, M8 et M10 : là, la découverte s’est fermée. M3 se défend aussi, si vous l’expliquez.',
            why: {
              M3: 'Acceptable : l’interrogatoire freine l’exploration, mais Camille rattrape ensuite la situation.',
              M4: 'La solution glissée trop tôt fait braquer M. Leroy : la découverte se ferme.',
              M8: 'Elle saute aux finitions avant d’avoir exploré leurs attentes.',
              M10: 'Elle clôt sans résumer ni faire classer : c’est pour cela qu’elle ne sait pas quoi proposer.'
            }
          },
          rewrites: [
            { n: 'M4', type: ['ouverte'], hint: 'Revenez au deuxième étage de l’entonnoir : ce qui les aiderait, sans rien proposer.',
              what: 'Elle propose l’îlot avant d’avoir compris le problème : M. Leroy se braque, et la découverte se ferme.',
              model: 'Qu’est-ce qui vous aiderait, quand vous cuisinez à plusieurs ?' },
            { n: 'M8', type: ['ouverte'], hint: 'Demandez-vous à quel étage on en est.',
              what: 'Elle saute aux finitions (bois ou laqué) alors que le couple n’a pas fini de dire ce qu’il attend : « on n’y a pas encore pensé ».',
              model: 'Qu’attendez-vous de votre future cuisine, au quotidien ?' },
            { n: 'M10', type: ['synthese'],
              what: 'Elle clôt sans résumer ni faire classer les priorités : elle repart sans savoir ce qui compte le plus.',
              model: 'Si je résume : un plan de travail pour cuisiner à plusieurs, un four en hauteur pour votre dos, des délais tenus et un prix ferme de 15 000 € au maximum. Qu’est-ce qui passe en premier pour vous ?' }
          ],
          // Ce que Camille aurait dû repartir en sachant.
          sort: [
            { id: 's1', text: 'Un plan de travail plus grand', kind: 'explicite', why: 'Mme Leroy le dit elle-même : « le plan de travail est trop petit ».' },
            { id: 's2', text: 'Ne plus se baisser pour sortir les plats du four', kind: 'explicite', why: 'Elle le dit en M5 : « je ne peux plus me baisser ». D’où un four en hauteur.' },
            { id: 's3', text: 'Cuisiner en famille sans se gêner', kind: 'implicite', why: 'Derrière « on se marche dessus », le vrai besoin : partager la cuisine avec les petits-enfants.' },
            { id: 's4', text: 'Ne pas revivre le chantier de la salle de bains', kind: 'implicite', why: 'M. Leroy ne demande rien de précis, mais « plus jamais » dit ce qu’il redoute.' },
            { id: 's5', text: 'La sécurité : des délais tenus, un prix ferme', kind: 'motivation', why: 'Les mots indices de M. Leroy : « plus jamais », « pas de surprise ».' },
            { id: 's6', text: 'Le confort au quotidien, pour son dos', kind: 'motivation', why: 'Pour Mme Leroy, la cuisine doit cesser de lui faire mal : c’est le confort.' },
            { id: 's7', text: 'La famille : recevoir les petits-enfants', kind: 'motivation', why: 'La sympathie : le projet tourne autour des week-ends en famille.' }
          ],
          // La hiérarchie, de la priorité au secondaire (l'ordre d'affichage est mélangé).
          rank: {
            items: [
              { id: 'r1', text: 'Les conditions de M. Leroy : délais tenus, prix ferme' },
              { id: 'r2', text: 'Un four en hauteur, pour le dos de Mme Leroy' },
              { id: 'r3', text: 'De la place pour cuisiner à plusieurs' }
            ],
            show: ['r3', 'r1', 'r2'],
            why: 'Les conditions de M. Leroy passent d’abord : sans délais tenus ni prix ferme, il n’y aura pas de projet. Puis le dos de Mme Leroy, qui la gêne tous les jours ; puis la place, pour les week-ends.'
          },
          model: {
            good: 'M1 répare la relation et annonce l’écoute (« sans catalogue »). M2 fait apparaître le moment clé (« le week-end… on se marche dessus »). M5 rattrape la situation : deux besoins apparaissent (la place, le dos). M6 donne la parole à M. Leroy, qui livre sa motivation (les délais).',
            diag: 'Les ouvertes du début (M2, M5, M6) fonctionnent. Ensuite, Camille enchaîne fermées et alternatives (M3, M8, M9) et propose une solution trop tôt (M4) : l’entonnoir n’est pas respecté. Le dos de Mme Leroy et la sécurité de M. Leroy (délais, prix ferme) ne sont pas exploités, et rien n’est validé à la fin.',
            tips: 'Quand un client évoque un moment (« on se marche dessus »), faites-le décrire par une question ouverte avant toute précision. Avant le devis, résumez les besoins et faites classer : « Qu’est-ce qui passe en premier pour vous ? »'
          }
        },

        B: {
          id: 'B', tab: 'Dossier B · Entre entreprises', title: 'Karim et M. Vidal', place: 'Un hôtel, deuxième visioconférence',
          decor: 'dialogues/hotel-bureau.webp',
          seller: { name: 'Karim', role: 'Attaché commercial', face: 'visages/karim.webp' },
          people: {
            vidal: { name: 'M. Vidal', face: 'visages/m-vidal.webp' }
          },
          context: 'Karim, attaché commercial d’une entreprise de propreté, retrouve en visioconférence M. Vidal, directeur d’un hôtel quatre étoiles de 120 chambres. Le premier échange avait fait apparaître un besoin de continuité de service.',
          ask: 'J’ai eu M. Vidal en visio. Je pensais avoir bien questionné, mais je ne sais pas trop quoi lui proposer, à part notre formule premium. Vous pouvez relire l’échange et m’aider ?',
          moments: [
            { n: 'M1', q: 'La dernière fois, vous m’avez parlé de continuité de service. Avant toute proposition, j’aimerais mieux comprendre votre organisation. On prend vingt minutes ?',
              replies: [{ who: 'vidal', text: 'D’accord.' }],
              hint: 'Regardez ce que Karim rappelle, et ce qu’il annonce.',
              order: ['b', 'c', 'a'], best: 'a',
              choices: {
                a: { text: 'Un cadrage : il rappelle le besoin et prend le temps de comprendre.' },
                b: { text: 'Une question fermée : « On prend vingt minutes ? » n’appelle qu’un oui.', tone: 'mid', note: 'Elle se termine par une fermée, mais ce n’est pas le sujet : le « oui » suffit. Karim rappelle le besoin et annonce qu’il veut comprendre avant de proposer.' },
                c: { text: 'Une perte de temps : il aurait dû présenter son offre dès le début.', tone: 'ko', note: 'Présenter l’offre d’abord, c’est parler de soi avant le client. Ce cadrage montre au contraire qu’il écoute.' }
              },
              why: 'Point fort. Un cadrage avec rappel : il reprend le besoin du premier échange et annonce qu’il veut comprendre avant de proposer.' },
            { n: 'M2', q: 'Comment le ménage est-il organisé aujourd’hui, sur une journée ?',
              replies: [{ who: 'vidal', text: 'Six agents du prestataire le matin pour les chambres, deux l’après-midi pour les parties communes. Et mes réceptionnistes dépannent quand il manque quelqu’un.' }],
              hint: 'Quelle information inattendue arrive à la fin de la réponse ?',
              order: ['a', 'b', 'c'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte large : elle fait apparaître le dépannage par la réception.' },
                b: { text: 'Une question technique : elle porte sur l’organisation du ménage, pas sur les besoins.', tone: 'mid', note: 'Elle porte sur l’organisation, mais c’est voulu : en décrivant sa journée, M. Vidal révèle un problème (ses réceptionnistes dépannent).' },
                c: { text: 'Une question orientée : elle suppose que le ménage est mal organisé.', tone: 'ko', note: 'Elle ne suppose rien : elle laisse M. Vidal décrire sa journée avec ses mots. C’est lui qui fait apparaître le problème.' }
              },
              why: 'Point fort. Une question ouverte large : en décrivant la journée, M. Vidal révèle que ses réceptionnistes font le ménage quand il manque quelqu’un.' },
            { n: 'M3', q: 'Vos réceptionnistes dépannent ?',
              replies: [{ who: 'vidal', text: 'Oui, et pendant ce temps, l’accueil est vide. Des clients attendent leur chambre jusqu’à 16 h. Ils le notent dans leurs avis.' }],
              hint: 'D’où viennent les mots de la question ? Et que contient la réponse ?',
              order: ['a', 'b', 'c'], best: 'c',
              choices: {
                a: { text: 'Une question fermée : elle n’appelle qu’un « oui » de confirmation, sans rien de plus.', tone: 'mid', note: 'Sur le papier, on peut répondre oui. Mais en reprenant ses mots, Karim l’invite à développer, et M. Vidal parle des clients et de leurs avis.' },
                b: { text: 'Une répétition inutile : M. Vidal vient de le dire.', tone: 'ko', note: 'Ce n’est pas une répétition : c’est un écho. Reprendre ses mots l’invite à développer, et la suite est précieuse (l’accueil vide, les avis).' },
                c: { text: 'Un écho : en reprenant ses mots, il révèle l’impact sur les clients et les avis.' }
              },
              why: 'Point fort. Un écho : en reprenant ses mots, Karim fait apparaître l’impact sur les clients (l’attente, les avis).' },
            { n: 'M4', q: 'Quel impact cela a-t-il sur vos équipes ?',
              replies: [{ who: 'vidal', text: 'Énorme. Deux arrêts maladie ce trimestre. Elles sont épuisées, et je risque d’en perdre.' }],
              hint: 'À quel étage de l’entonnoir est-on : la situation, ou les enjeux ?',
              order: ['b', 'c', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question ouverte large : elle reprend l’exploration à zéro.', tone: 'mid', note: 'Elle est ouverte, mais pas large : elle cible un enjeu (l’impact sur les équipes). C’est le deuxième étage, et elle fait dire le coût humain.' },
                b: { text: 'Une ouverte sur les enjeux : elle fait dire le coût humain.' },
                c: { text: 'Une question indiscrète : les équipes du client ne regardent pas Karim.', tone: 'ko', note: 'Les équipes sont au cœur du problème : c’est sur elles que pèse le manque. M. Vidal répond sans réserve.' }
              },
              why: 'Point fort. Une question ouverte sur les enjeux : M. Vidal dit le coût humain (deux arrêts maladie, des équipes épuisées).' },
            { n: 'M5', q: 'Combien de chambres ? Combien d’étages ? Quelle surface de parties communes ? Quels revêtements de sol ?',
              replies: [{ who: 'vidal', text: '… Je vous enverrai le plan.' }],
              hint: 'Que venait de dire M. Vidal ? Et comment répond-il ici ?',
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une question ouverte : elle laisse M. Vidal décrire son hôtel.', tone: 'ko', note: 'Quatre questions fermées d’affilée, techniques : M. Vidal se ferme (« je vous enverrai le plan »).' },
                b: { text: 'Des précisions utiles, mais posées trop vite : ces chiffres serviront.', tone: 'mid', note: 'Ces chiffres serviront, oui. Mais ils tombent juste après l’épuisement des équipes : Karim quitte l’enjeu humain, et M. Vidal se ferme.' },
                c: { text: 'Une rafale de fermées techniques : elle casse la dynamique au pire moment.' }
              },
              why: 'Décisif. Une rafale de fermées techniques juste après l’enjeu humain : Karim quitte le sujet qui compte, et M. Vidal se ferme.' },
            { n: 'M6', q: 'Notre remplacement garanti sous deux heures règle exactement ce problème.',
              replies: [{ who: 'vidal', text: 'Peut-être. Mais l’audit de classement revient en mars.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une solution prématurée : il propose avant d’avoir tout compris.' },
                b: { text: 'Une reformulation : il montre qu’il a compris le problème des absences.', tone: 'mid', note: 'Il a compris une partie du problème, mais il ne reformule pas : il propose son produit. Et M. Vidal révèle aussitôt un enjeu plus grand (l’audit).' },
                c: { text: 'Une conclusion bien placée : le besoin est clair, il peut proposer.', tone: 'ko', note: 'Le besoin n’est pas clair : M. Vidal parle aussitôt de l’audit de mars, que Karim ignorait. Il a proposé trop tôt.' }
              },
              why: 'Décisif. Une solution prématurée : Karim propose avant d’avoir tout compris. Le vrai enjeu (l’audit de mars) arrive après.' },
            { n: 'M7', q: 'Il revient en mars ?',
              replies: [{ who: 'vidal', text: 'Une contre-visite. Si l’hôtel perd sa quatrième étoile, c’est mon poste qui est en jeu.' }],
              order: ['c', 'b', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question hors sujet : l’audit ne concerne pas le ménage.', tone: 'ko', note: 'L’audit concerne directement la propreté des chambres. Et c’est le vrai enjeu de M. Vidal : son poste.' },
                b: { text: 'Un écho : il révèle l’enjeu personnel de M. Vidal, son poste.' },
                c: { text: 'Une fermée de vérification : elle confirme seulement la date.', tone: 'mid', note: 'Elle pourrait appeler un simple oui. Mais en reprenant ses mots, Karim l’invite à développer, et M. Vidal livre son enjeu personnel.' }
              },
              why: 'Point fort. Un écho : M. Vidal livre son enjeu personnel (« c’est mon poste qui est en jeu »).' },
            { n: 'M8', q: 'Vous ne voulez sûrement pas prendre de risque : vous préférerez notre formule premium ?',
              replies: [{ who: 'vidal', text: 'Je ne sais pas. Je dois voir avec le groupe.' }],
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une alternative : il laisse M. Vidal choisir entre deux formules.', tone: 'mid', note: 'Il n’y a pas de choix : « vous préférerez notre formule premium » contient déjà la réponse. C’est une question orientée.' },
                b: { text: 'Une question pour hiérarchiser : il aide M. Vidal à classer ses priorités.', tone: 'ko', note: 'Elle ne fait rien classer : elle pousse une formule, en jouant sur la peur du risque. M. Vidal se replie.' },
                c: { text: 'Une question orientée : il pousse une formule, et M. Vidal se replie.' }
              },
              why: 'Décisif. Une question orientée : Karim pousse sa formule premium en jouant sur la peur. M. Vidal se replie (« je dois voir avec le groupe »).' },
            { n: 'M9', q: 'Qui d’autre intervient dans la décision ?',
              replies: [{ who: 'vidal', text: 'Le siège du groupe valide au-delà de 50 000 € par an. Et ma gouvernante générale doit être d’accord.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une ouverte sur la décision : il apprend qui valide, et à partir de quel montant.' },
                b: { text: 'Une question fermée : elle n’appelle qu’un nom.', tone: 'mid', note: 'Elle est ouverte (« qui d’autre ? ») et elle fonctionne : M. Vidal cite le siège, son seuil, et sa gouvernante générale.' },
                c: { text: 'Une question gênante : elle met en doute l’autorité de M. Vidal devant son prestataire.', tone: 'ko', note: 'Elle ne met rien en doute : il vient de parler du groupe. Il répond sans gêne, et Karim apprend tout du processus de décision.' }
              },
              why: 'Point fort. Une question ouverte sur le processus de décision : le siège au-delà de 50 000 € par an, et la gouvernante générale.' },
            { n: 'M10', q: 'Parfait, je vous envoie la proposition premium demain.',
              scene: 'M. Vidal hoche la tête, sans conviction.',
              replies: [],
              order: ['c', 'a', 'b'], best: 'b',
              choices: {
                a: { text: 'Une relance efficace : il fixe une suite précise dès le lendemain.', tone: 'mid', note: 'Fixer une suite est utile, mais Karim ne résume rien et ne fait pas classer les priorités. Il propose « premium » sans savoir ce qui passe en premier.' },
                b: { text: 'Une clôture sans validation : aucune priorité n’est validée.' },
                c: { text: 'Une synthèse : il résume les besoins de M. Vidal avant de faire sa proposition.', tone: 'ko', note: 'Il n’y a aucun résumé : il annonce sa proposition. C’est justement ce qui manque, et M. Vidal n’est pas convaincu.' }
              },
              why: 'Conséquence de M8 : une clôture sans validation. Karim propose « premium » sans hiérarchie validée, et M. Vidal n’est pas convaincu.' }
          ],
          decisive: {
            expected: ['M5', 'M6', 'M8'], acceptable: ['M10'],
            text: 'Les moments décisifs sont M5, M6 et M8 : Karim questionne bien, mais il sort de l’entonnoir chaque fois qu’un enjeu apparaît. M10 se défend aussi, si vous l’expliquez.',
            why: {
              M5: 'La rafale technique casse la dynamique juste après l’enjeu humain.',
              M6: 'Il propose sa solution avant d’avoir compris : l’audit de mars arrive après.',
              M8: 'Il pousse une formule en jouant sur la peur : M. Vidal se replie.',
              M10: 'Acceptable : c’est la conséquence de M8, une proposition sans priorités validées.'
            }
          },
          rewrites: [
            { n: 'M5', type: ['ouverte', 'echo'], hint: 'Restez sur l’enjeu qui vient d’apparaître : ses équipes.',
              what: 'Juste après l’épuisement des équipes, il enchaîne quatre questions techniques : il quitte l’enjeu humain, et M. Vidal se ferme.',
              model: 'Et pour vos équipes, qu’est-ce qui devrait changer en priorité ?' },
            { n: 'M6', type: ['ouverte'], hint: 'Demandez-vous s’il a tout compris avant de proposer.',
              what: 'Il propose son remplacement garanti avant d’avoir tout compris : le vrai enjeu, l’audit de mars, arrive après.',
              model: 'Que faudrait-il pour que ce problème ne se reproduise plus ?' },
            { n: 'M8', type: ['alternative', 'ouverte'],
              what: 'Il pousse sa formule premium en jouant sur la peur du risque : M. Vidal se replie sur le groupe.',
              model: 'Entre la continuité du service, vos équipes et l’audit de mars, qu’est-ce qui passe en premier pour vous ?' }
          ],
          sort: [
            { id: 's1', text: 'Assurer le ménage, même quand un agent manque', kind: 'explicite', why: 'C’est la continuité de service, évoquée dès le premier échange.' },
            { id: 's2', text: 'Réussir la contre-visite de mars', kind: 'explicite', why: 'M. Vidal le dit lui-même : « l’audit de classement revient en mars ».' },
            { id: 's3', text: 'Ne plus faire dépanner ses réceptionnistes', kind: 'implicite', why: 'Il ne le demande pas, mais tout le montre : l’accueil vide, les clients qui attendent.' },
            { id: 's4', text: 'Protéger ses équipes épuisées', kind: 'implicite', why: 'Derrière « deux arrêts maladie », le besoin de ne pas perdre ses équipes.' },
            { id: 's5', text: 'La sécurité : garder son étoile, et son poste', kind: 'motivation', why: 'Le mot indice : « c’est mon poste qui est en jeu ».' },
            { id: 's6', text: 'L’image de l’hôtel : les avis des clients', kind: 'motivation', why: '« Ils le notent dans leurs avis » : la réputation de l’hôtel (orgueil).' },
            { id: 's7', text: 'Le bien-être de ses équipes', kind: 'motivation', why: '« Elles sont épuisées » : il tient à ses équipes (sympathie).' }
          ],
          rank: {
            items: [
              { id: 'r1', text: 'Réussir la contre-visite de mars' },
              { id: 'r2', text: 'La continuité du ménage, sans mobiliser la réception' },
              { id: 'r3', text: 'Protéger ses équipes' }
            ],
            show: ['r2', 'r3', 'r1'],
            why: 'L’échéance de mars passe en premier : son étoile et son poste en dépendent. Puis la continuité, sans faire dépanner la réception ; puis ses équipes, qui en bénéficieront.'
          },
          model: {
            good: 'M2 fait apparaître le dépannage par la réception. M3, un écho, révèle l’impact sur les clients et leurs avis. M4 fait dire le coût humain (deux arrêts maladie). M7, un autre écho, révèle l’enjeu personnel (son poste). M9 éclaire la décision (le siège, la gouvernante générale).',
            diag: 'Karim questionne bien (ouvertes, échos), mais il sort de l’entonnoir chaque fois qu’un enjeu apparaît : une rafale technique (M5), une solution (M6), une question orientée (M8). L’échéance de mars et l’enjeu personnel de M. Vidal (la sécurité) ne sont pas exploités, et il propose « premium » sans priorités validées. Il aurait dû savoir aussi que la décision est partagée : le siège au-delà de 50 000 € par an, et la gouvernante générale.',
            tips: 'Quand un enjeu apparaît (l’épuisement, l’audit), restez dessus avec une question ouverte : « Qu’est-ce que ça change pour vous ? » ; gardez les questions techniques pour la fin. Avant de proposer, résumez et faites classer : « Entre la continuité, vos équipes et l’audit de mars, qu’est-ce qui passe en premier ? »'
          }
        }
      },

      // La fiche de coaching (rubriques 1, 2 et 5 du gabarit ; 3 et 4 viennent de vos étapes).
      fiche: [
        { id: 'good', tab: 'Ce qui a fonctionné', label: '1 · Ce qui a bien fonctionné', sub: 'Au moins deux questions (leur numéro), avec ce qu’elles ont fait émerger.', placeholder: 'M… a fait apparaître… ; M… …' },
        { id: 'diag', tab: 'Diagnostic', label: '2 · Mon diagnostic', sub: 'Les types de questions dominants, le respect de l’entonnoir, les besoins et motivations laissés de côté.', placeholder: 'Les questions… L’entonnoir… Il a laissé de côté…' },
        { id: 'tips', tab: 'Deux conseils', label: '5 · Deux conseils', sub: 'Deux conseils concrets pour son prochain entretien.', placeholder: '1. … 2. …' }
      ],

      selfCheck: [
        { text: 'Mes 3 moments sont ceux où la découverte s’est ouverte ou fermée, et je l’explique.' },
        { text: 'Je nomme le type de chaque question citée (ouverte, fermée, alternative, orientée).' },
        { text: 'Je relève au moins un besoin implicite et une motivation que le vendeur n’a pas exploités.' },
        { text: 'Mes questions de remplacement sont ouvertes ou bien placées dans l’entonnoir, sans produit.' },
        { text: 'Ce que le vendeur aurait dû savoir est hiérarchisé, avec les mots du client.' },
        { text: 'Mon retour est factuel, commence par le positif et ne juge pas la personne.' },
        { text: 'Pertinence du choix : j’ai choisi les questions qui ont le plus pesé sur la découverte, pas les plus visibles.' }
      ],

      keyPoint: 'À retenir : un entretien se juge à ce que chaque question fait dire au client. Les moments décisifs sont ceux où la découverte s’ouvre ou se ferme, souvent quand le vendeur propose trop tôt, ou ne fait pas classer les priorités.'
    }
  };
})(globalThis);
