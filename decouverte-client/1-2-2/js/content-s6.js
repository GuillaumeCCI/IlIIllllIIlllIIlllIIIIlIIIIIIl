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
            c: { intent: 'Lui proposer tout de suite un modèle à essayer', minutes: 4, text: 'J’ai une citadine hybride qui ira parfaitement pour vos tournées : on va l’essayer tout de suite ?', points: -2, reply: 'Attendez, vous ne savez même pas ce que je fais. Je ne vais pas essayer une voiture au hasard, je n’ai pas le temps de me tromper deux fois.', note: 'Vous proposez un véhicule avant de savoir quoi que ce soit de ses journées. Elle vous le fait remarquer, et la découverte démarre sur une méfiance.' }
          },
          best: 'a', why: 'Vous respectez son temps en annonçant le déroulé, puis vous ouvrez largement sur ses journées. C’est le premier étage de l’entonnoir : la situation, avec ses mots.'
        },
        {
          scene: 'Elle enlève son manteau, jette un œil aux voitures exposées, puis se tourne vers vous.',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Lui demander ce qui la gêne avec sa voiture', minutes: 3, text: 'Qu’est-ce qui vous complique le plus la vie avec une voiture, pendant vos tournées ?', points: 2, reply: 'Me garer, surtout. En centre-ville, je tourne parfois dix minutes devant chez un patient. Et pendant ce temps-là, lui, il m’attend. Certains jours, je finis par me garer en double file, avec les warnings, et je croise les doigts.' },
            b: { intent: 'Vérifier si elle roule souvent sur autoroute', minutes: 1, text: 'Pour vos tournées, vous prenez souvent l’autoroute, en dehors de vos trajets en ville ?', points: 0, reply: 'Un peu, pour aller dans les villages. Pas tant que ça, en fait : vingt minutes de voie rapide le matin, autant le soir. Le reste, c’est de la ville.', note: 'La question est fermée : elle appelle un oui ou un non. Vous obtenez un détail utile (« les villages »), mais rien sur ce qui la gêne vraiment.' },
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
            b: { intent: 'Vérifier ce que couvre son assurance actuelle', minutes: 2, text: 'Votre assurance actuelle vous prévoit-elle un véhicule de prêt en cas de panne ?', points: 0, reply: 'Euh… non, je ne crois pas. Il faudrait que je regarde mon contrat. De toute façon, cette fois, j’ai tout payé de ma poche.', note: 'La question est utile, mais fermée et trop précise à ce stade. Vous apprenez qu’elle n’a pas de véhicule de prêt, sans savoir ce qu’une panne lui coûte vraiment.' },
            c: { intent: 'La rassurer sur vos modèles', minutes: 1, text: 'Avec nous, plus de souci : nos modèles sont fiables.', points: -2, reply: 'On m’a déjà dit ça. Ma voiture aussi était « fiable », d’après le vendeur. Elle avait quatre ans.', note: 'Vous voulez la rassurer, mais une promesse générale ne rassure personne, surtout après une panne. Elle l’a déjà entendue : la confiance baisse.' }
          },
          best: 'a', why: 'Vous lui faites dire elle-même ce que coûte le problème. Elle mesure l’enjeu (60 € par jour, 1 500 € perdus) : c’est ce qui donnera du poids à votre future proposition.'
        },
        {
          scene: 'Elle jette un œil à sa montre, mais reste assise.',
          order: ['c', 'b', 'a'],
          choices: {
            a: { intent: 'Lui demander ce qui la rendrait sereine', minutes: 2, text: 'Qu’est-ce qui ferait que vous vous sentiez vraiment sereine avec votre prochaine voiture ?', points: 2, reply: 'Savoir qu’on me dépanne vite, et qu’on me prête une voiture le temps de la réparation. Et ne pas me ruiner : je suis à mon compte, un jour sans rouler, c’est un jour sans être payée.' },
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
            b: { intent: 'Vérifier que tous ses critères comptent', minutes: 1, text: 'Le stationnement, le coffre, la voiture de prêt, le budget : j’imagine que tout compte pour vous ?', points: 0, reply: 'Ben… oui, tout compte. C’est pour ça que je suis là, non ?', note: 'La question ne l’aide pas à choisir : « tout compte » est toujours vrai. Elle acquiesce, et vous ne savez toujours pas ce qui passe en premier.' },
            c: { intent: 'Lui faire confirmer que le budget passe avant tout', minutes: 2, text: 'Entre le stationnement, le coffre et la voiture de prêt en cas de panne, c’est quand même le budget, au fond, qui passe en premier pour vous, non ?', points: -2, reply: 'Non, pas forcément. Le budget compte, mais ce n’est pas ce qui m’inquiète le plus.', note: 'Vous lui imposez votre hiérarchie : pour vous, c’est le budget. Elle vous contredit, sans vous dire ce qui compte vraiment pour elle.' }
          },
          best: 'a', why: 'Une question qui l’oblige à choisir. C’est elle qui classe ses besoins : votre hiérarchie reposera sur ses mots, pas sur vos idées.'
        },
        {
          prompt: 'Avant l’essai, quelle validation faites-vous ?',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Résumer ses besoins dans l’ordre et les faire valider', minutes: 2, text: 'Si je résume : d’abord une voiture de prêt en cas de panne, car une panne vous empêche de travailler ; puis un coffre facile d’accès pour votre épaule ; une voiture simple à garer ; un budget maîtrisé. Dans cet ordre ?', points: 2, reply: '' },
            b: { intent: 'Résumer en une phrase, simplement', minutes: 1, text: 'Si je résume : une petite voiture, facile à garer en ville et pas trop chère, avec un coffre assez grand pour votre sac de soins et vos allers-retours entre deux patients, toute la journée. C’est bien ça ?', points: 0, reply: 'C’est un peu court… Vous oubliez le plus important pour moi : ne plus me retrouver à pied.', note: 'Le résumé n’est pas faux, mais il est trop court : il oublie la voiture de prêt, son vrai premier besoin, et ne donne aucun ordre. Elle ne peut pas le valider.' },
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
    }
  };
})(globalThis);
