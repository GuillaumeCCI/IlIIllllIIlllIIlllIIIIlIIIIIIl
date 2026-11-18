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


  /* LE JUGE DES RÉPONSES RÉDIGÉES (6.2 « Le coach ») : diagnostics écrits et
   * questions réécrites. Une réponse est jugée sur ses IDÉES CLÉS : chaque
   * idée a une liste de mots ou de débuts de mots ; les accents, majuscules
   * et ponctuation ne comptent pas, une faute de frappe est tolérée sur les
   * mots longs. Une idée { open: true } vérifie que la question est ouverte.
   * La banque de réponses de test est dans tests/coach.test.cjs. */
  const plain = text => ` ${String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()} `;
  const lev = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  const hasWord = (t, w) => {
    const word = plain(w).trim();
    if (!word) return false;
    if (t.includes(` ${word}`)) return true;
    if (word.length < 6 || word.includes(' ')) return false;
    return t.trim().split(' ').some(x => x.length >= word.length - 1 && lev(x.slice(0, word.length), word) <= 1);
  };
  // Une question ouverte : un mot interrogatif ouvert dans ses premiers mots.
  const OPEN = ['qu', 'que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'pourquoi', 'racontez', 'parlez', 'decrivez', 'expliquez', 'dites', 'quoi', 'qui', 'en quoi', 'dans quelle'];
  const isOpen = text => { const first = ` ${plain(text).trim().split(' ').slice(0, 9).join(' ')} `; return OPEN.some(w => first.includes(` ${w} `)); };
  const words = text => plain(text).trim().split(' ').filter(Boolean).length;
  function judgeIdeas(ideas, text) {
    const t = plain(text);
    const found = words(text) < 3 ? [] : ideas.filter(idea => (idea.open ? isOpen(text) : idea.words.some(w => hasWord(t, w))));
    const missing = ideas.filter(idea => !found.includes(idea));
    return { found, missing, tone: !missing.length ? 'ok' : found.length ? 'mid' : 'ko' };
  }
  /* Une question réécrite : ses idées, sans produit ni détail interdit. Le
   * type choisi par l'apprenant est vérifié à part, à l'écran. */
  function judgeRewrite(r, text, productWords) {
    const t = plain(text);
    const res = judgeIdeas(r.ideas, text);
    // Produits et mots interdits : le mot entier (« laquelle » n’est pas « laqué »).
    const whole = w => { const x = plain(w).trim(); return [' ', 's ', 'x '].some(end => t.includes(` ${x}${end}`)); };
    const product = productWords.find(whole) || '';
    const forbidden = (r.forbid || []).find(whole) || '';
    let tone = res.tone;
    if ((product || forbidden) && tone === 'ok') tone = 'mid';
    return Object.assign(res, { tone, product, forbidden, question: /\?\s*»?\s*$/.test(String(text || '').trim()) });
  }
  root.ATELIER_COACH = Object.freeze({ plain, hasWord, isOpen, judgeIdeas, judgeRewrite });

  root.ATELIER_S6 = {

    '6.1': {
      eyebrow: 'Pour aller plus loin · Synthèse facultative',
      title: 'L’entretien dont vous êtes le héros',
      subtitle: 'Choisissez vos questions, voyez leur effet sur la cliente, puis construisez la carte de ses besoins.',

      // La carte du chemin : les quatre étapes, leur pictogramme.
      path: [
        { label: 'Le scénario', icon: 'chat' },
        { label: 'Vos acquis', icon: 'lightbulb' },
        { label: 'La carte des besoins', icon: 'target' },
        { label: 'La grille', icon: 'list' }
      ],

      // Une page avant chaque étape : ce qui est fait, pourquoi la suite, à vous.
      transitions: [
        {
          done: 'Vous savez à quoi sert la découverte : comprendre ce qui compte pour elle, avant de lui faire essayer un véhicule.',
          why: 'Mme Rivière arrive pour son essai, entre deux tournées. Vous allez mener la découverte en sept étapes. Chaque question prend du temps, et ce que vous apprendrez décidera du véhicule qu’elle essaiera.',
          todo: 'À chaque étape, choisissez ce que vous voulez lui demander. La jauge suit la qualité de votre découverte, le chrono son temps, et un retour vous dit ce que votre question a produit.'
        },
        {
          done: 'Vous avez mené la découverte avec Mme Rivière jusqu’au bout.',
          why: 'Avant de construire la carte de ses besoins, quatre questions courtes pour vérifier les bons réflexes : partir d’un signal, faire mesurer l’enjeu, faire classer, reformuler.',
          todo: 'Répondez aux 4 questions. Un retour suit chaque réponse.'
        },
        {
          done: 'Vos réflexes de questionnement sont vérifiés.',
          why: 'Ce que Mme Rivière vous a dit doit maintenant servir. La carte de ses besoins, c’est ce sur quoi s’appuiera votre argumentation pendant l’essai.',
          todo: 'Remplissez les 6 rubriques de la carte. Votre entretien reste à gauche, sous vos yeux.'
        },
        {
          done: 'Votre carte des besoins est prête.',
          why: 'Avant de voir l’exemple, relisez-la comme le fera votre tuteur, avec la même grille.',
          todo: 'Répondez Oui ou Non aux 7 critères de la grille.'
        }
      ],

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
          says: 'Bonjour… Excusez-moi, ça fait dix minutes que je tourne pour trouver une place. Je reprends ma tournée à 13 h 30, alors je n’ai que trente minutes devant moi, pas plus.',
          order: ['b', 'a', 'c'],
          choices: {
            a: { intent: 'Cadrer le temps, puis la faire parler de ses journées', minutes: 4, text: 'Trente minutes, c’est noté : dix minutes pour parler de vos journées, puis l’essai. Racontez-moi une journée de tournée.', points: 2, reply: 'Alors… je pars de chez moi vers 7 h, et le matin je vois une quinzaine de patients, à peu près autant le soir. La plupart habitent en centre-ville, mais j’en ai aussi dans deux villages un peu plus loin. Je fais des pansements, des prises de sang, des injections… Du coup, je passe ma journée à monter et descendre de voiture, vous imaginez.' },
            b: { intent: 'Gagner du temps en précisant d’abord la motorisation', minutes: 1, text: 'Trente minutes, c’est noté. Pour gagner du temps : vous roulez plutôt en diesel, en essence ou en hybride, en ce moment ?', points: 0, reply: 'Euh… honnêtement, je n’en sais rien. Ce qui consomme le moins, je suppose ? Je n’y connais pas grand-chose, vous savez : ma dernière voiture, c’est mon frère qui me l’avait choisie.', note: 'La question n’est pas fausse en soi : le carburant comptera. Mais elle arrive trop tôt. Vous précisez un détail avant de savoir comment elle utilise sa voiture, et sa réponse (« ce qui consomme le moins ») ne vous apprend presque rien.' },
            c: { intent: 'Lui proposer tout de suite un modèle à essayer', minutes: 3, text: 'J’ai une citadine hybride qui ira parfaitement pour vos tournées : on va l’essayer tout de suite ?', points: -2, reply: 'Attendez, attendez… vous ne savez même pas encore ce que je fais. Je ne vais pas essayer une voiture au hasard : je n’ai vraiment pas le temps de me tromper deux fois.', note: 'Vous proposez un véhicule avant de savoir quoi que ce soit de ses journées. Elle vous le fait remarquer, et la découverte démarre sur une méfiance.' }
          },
          best: 'a', why: 'Vous respectez son temps en annonçant le déroulé, puis vous ouvrez largement sur ses journées. C’est le premier étage de l’entonnoir : la situation, avec ses mots.'
        },
        {
          scene: 'Elle enlève son manteau, jette un œil aux voitures exposées, puis se tourne vers vous.',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Lui demander ce qui la gêne avec sa voiture', minutes: 3, text: 'Qu’est-ce qui vous complique le plus la vie avec une voiture, pendant vos tournées ?', points: 2, reply: 'Me garer, surtout. En centre-ville, il m’arrive de tourner dix minutes devant chez un patient, et pendant ce temps-là, lui, il m’attend. Certains jours, je finis par me mettre en double file avec les warnings, et je croise les doigts pour ne pas prendre d’amende.' },
            b: { intent: 'Vérifier si elle roule souvent sur autoroute', minutes: 2, text: 'Pour vos tournées, vous prenez souvent l’autoroute, en dehors de vos trajets en ville ?', points: 0, reply: 'Un peu, pour aller dans les villages. Mais pas tant que ça, en fait : vingt minutes de voie rapide le matin, à peu près pareil le soir. Le reste du temps, je suis en ville.', note: 'La question est fermée : elle appelle un oui ou un non. Vous obtenez un détail utile (« les villages »), mais rien sur ce qui la gêne vraiment.' },
            c: { intent: 'Lui faire valider l’intérêt d’une petite voiture', minutes: 1, text: 'Pour des tournées, une petite voiture reste ce qu’il y a de plus pratique, vous êtes d’accord ?', points: -2, reply: 'Si vous le dites… Pour être honnête, je ne me suis jamais vraiment posé la question comme ça.', note: 'La question est orientée : elle contient déjà votre réponse et lui demande seulement d’acquiescer. « Si vous le dites… » : elle se range à votre avis sans rien vous apprendre.' }
          },
          best: 'a', why: 'Une question ouverte, ciblée sur ses difficultés. Elle vous parle de ce qui la gêne vraiment, sans que vous ayez rien supposé : c’est le deuxième étage.'
        },
        {
          says: 'Et puis il y a le coffre. Mon sac de soins, je le sors au moins vingt fois par jour, et je peux vous dire qu’il pèse son poids…',
          picture: true,
          after: 'En le disant, elle se touche l’épaule droite, avec une petite grimace.',
          order: ['b', 'c', 'a'],
          choices: {
            a: { intent: 'Rebondir sur son geste vers l’épaule', minutes: 2, text: 'Vous vous êtes touché l’épaule en parlant du coffre : qu’est-ce qui se passe, au juste ?', points: 2, reply: 'Oh… c’est une tendinite, ça fait six mois que je traîne ça. Mon ancien coffre était haut, alors je soulevais le sac à bout de bras toute la journée. Le kiné m’a dit d’arrêter de forcer… c’est facile à dire, quand on n’a pas le choix.' },
            b: { intent: 'Reformuler son besoin : un coffre plus grand', minutes: 1, text: 'Si je comprends bien, il vous faudrait surtout un grand coffre, pour ranger votre sac sans difficulté ?', points: 0, reply: 'Non, pas forcément plus grand. Mon sac tient dans n’importe quel coffre, vous savez. Ce qui compte pour moi, c’est de pouvoir le sortir facilement.', note: 'L’intention est bonne, mais vous interprétez à sa place. Ce n’est pas la taille du coffre qui compte pour elle : elle doit vous corriger, et la raison de son geste reste cachée.' },
            c: { intent: 'Lui présenter l’option du hayon électrique', minutes: 4, text: 'Nos modèles existent avec un hayon électrique en option : vous n’auriez plus rien à soulever vous-même.', points: -2, reply: 'Ah. Et elle coûte combien, cette option ? Parce que si c’est pour payer la voiture deux fois plus cher, ce n’est pas la peine.', note: 'Vous proposez une solution avant d’avoir compris le problème. La discussion part aussitôt sur le prix de l’option, et vous ne saurez pas pourquoi elle s’est touché l’épaule.' }
          },
          best: 'a', why: 'Vous partez d’un signal, son geste vers l’épaule, et vous la laissez expliquer sans rien supposer. Le vrai besoin apparaît : un coffre accessible, à cause de sa tendinite.'
        },
        {
          says: 'Il faut dire que ma voiture m’a lâchée la semaine dernière, en pleine tournée, juste devant chez une patiente. C’est pour ça que je suis en location. Je ne veux plus jamais revivre ça.',
          order: ['a', 'b', 'c'],
          choices: {
            a: { intent: 'Lui faire imaginer une nouvelle panne', minutes: 2, text: 'Que se passerait-il si votre voiture vous lâchait de nouveau ?', points: 2, reply: 'Ce serait la catastrophe. La location me coûte 60 € par jour, et j’ai dû annuler des patients, ce qui ne m’était jamais arrivé. Au total, cette panne m’a fait perdre 1 500 €, à peu près.' },
            b: { intent: 'Vérifier ce que couvre son assurance actuelle', minutes: 3, text: 'Votre assurance actuelle vous prévoit-elle un véhicule de prêt en cas de panne ?', points: 0, reply: 'Euh… non, je ne crois pas. Il faudrait que je regarde mon contrat, je ne sais plus trop. De toute façon, cette fois-ci, j’ai tout payé de ma poche.', note: 'La question est utile, mais fermée et trop précise à ce stade. Vous apprenez qu’elle n’a pas de véhicule de prêt, sans savoir ce qu’une panne lui coûte vraiment.' },
            c: { intent: 'La rassurer sur vos modèles', minutes: 1, text: 'Avec nous, plus de souci : nos modèles sont fiables.', points: -2, reply: 'On m’a déjà dit ça, vous savez. Ma voiture aussi était « fiable », d’après le vendeur, et elle n’avait que quatre ans.', note: 'Vous voulez la rassurer, mais une promesse générale ne rassure personne, surtout après une panne. Elle l’a déjà entendue : la confiance baisse.' }
          },
          best: 'a', why: 'Vous lui faites dire elle-même ce que coûte le problème. Elle mesure l’enjeu (60 € par jour, 1 500 € perdus) : c’est ce qui donnera du poids à votre future proposition.'
        },
        {
          scene: 'Elle jette un œil à sa montre, mais reste assise.',
          order: ['c', 'b', 'a'],
          choices: {
            a: { intent: 'Lui demander ce qui la rendrait sereine', minutes: 3, text: 'Qu’est-ce qui ferait que vous vous sentiez vraiment sereine avec votre prochaine voiture ?', points: 2, reply: 'Savoir qu’on viendra me dépanner vite, et qu’on me prêtera une voiture le temps de la réparation. Et puis ne pas me ruiner non plus : je suis à mon compte, alors une journée sans rouler, c’est une journée sans être payée.' },
            b: { intent: 'Connaître ses goûts de couleur', minutes: 1, text: 'Pour la voiture, vous avez une préférence de couleur ou de finition ?', points: 0, reply: 'Franchement ? Ça m’est bien égal. Du moment qu’elle démarre le matin, elle peut être rose, si vous voulez.', note: 'La question est hors sujet : la couleur ne pèse pas dans sa décision. Vous perdez une minute précieuse alors qu’elle regarde l’heure.' },
            c: { intent: 'Lui suggérer le modèle le plus fiable de la gamme', minutes: 2, text: 'Vous préférez sûrement le modèle le plus fiable de la gamme, même s’il coûte un peu plus cher ?', points: -2, reply: 'Ça dépend du prix. Je suis à mon compte, moi : je ne vais pas payer pour des choses dont je n’ai pas besoin.', note: 'La question est orientée : vous lui soufflez la réponse (« le plus fiable, même plus cher »). Elle se défend sur le prix, et sa vraie motivation n’apparaît pas.' }
          },
          best: 'a', why: 'Une question ouverte sur ce qui la rendrait sereine : elle exprime ses motivations avec ses mots (le dépannage, une voiture de prêt, ne pas se ruiner).'
        },
        {
          says: 'Bon, il ne me reste plus que {reste}… Ce que je ne veux surtout pas, c’est me retrouver encore à pied, comme la semaine dernière.', // le temps réellement restant au chrono
          order: ['c', 'a', 'b'],
          choices: {
            a: { intent: 'Lui faire classer elle-même ses critères', minutes: 2, text: 'Si vous deviez classer : vous garer, un coffre accessible, une voiture de prêt en cas de panne, le budget… qu’est-ce qui passe en premier ?', points: 2, reply: 'La voiture de prêt, sans hésiter : sans voiture, je ne travaille pas. Ensuite le coffre, à cause de mon épaule. Et puis pouvoir me garer. Le budget compte, bien sûr, mais ce n’est pas ce qui passe en premier.' },
            b: { intent: 'Vérifier que tous ses critères comptent', minutes: 2, text: 'Le stationnement, le coffre, la voiture de prêt, le budget : j’imagine que tout compte pour vous ?', points: 0, reply: 'Ben… oui, tout compte. C’est un peu pour ça que je suis venue, non ?', note: 'La question ne l’aide pas à choisir : « tout compte » est toujours vrai. Elle acquiesce, et vous ne savez toujours pas ce qui passe en premier.' },
            c: { intent: 'Lui faire confirmer que le budget passe avant tout', minutes: 3, text: 'Entre le stationnement, le coffre et la voiture de prêt en cas de panne, c’est quand même le budget, au fond, qui passe en premier pour vous, non ?', points: -2, reply: 'Non, pas forcément. Le budget compte, mais ce n’est pas ce qui m’inquiète le plus.', note: 'Vous lui imposez votre hiérarchie : pour vous, c’est le budget. Elle vous contredit, sans vous dire ce qui compte vraiment pour elle.' }
          },
          best: 'a', why: 'Une question qui l’oblige à choisir. C’est elle qui classe ses besoins : votre hiérarchie reposera sur ses mots, pas sur vos idées.'
        },
        {
          prompt: 'Avant l’essai, quelle validation faites-vous ?',
          order: ['a', 'c', 'b'],
          choices: {
            a: { intent: 'Résumer ses besoins dans l’ordre et les faire valider', minutes: 2, text: 'Si je résume : d’abord une voiture de prêt en cas de panne, car une panne vous empêche de travailler ; puis un coffre facile d’accès pour votre épaule ; une voiture simple à garer ; un budget maîtrisé. Dans cet ordre ?', points: 2, reply: '' },
            b: { intent: 'Résumer en une phrase, simplement', minutes: 3, text: 'Si je résume : une petite voiture, facile à garer en ville et pas trop chère, avec un coffre assez grand pour votre sac de soins et vos allers-retours entre deux patients, toute la journée. C’est bien ça ?', points: 0, reply: 'C’est un peu court, là… Vous oubliez le plus important pour moi : ne plus jamais me retrouver à pied.', note: 'Le résumé n’est pas faux, mais il est trop court : il oublie la voiture de prêt, son vrai premier besoin, et ne donne aucun ordre. Elle ne peut pas le valider.' },
            c: { intent: 'Résumer ses besoins en lui proposant votre citadine hybride', minutes: 4, text: 'Si je résume : une voiture fiable, un coffre pratique pour votre épaule, facile à garer en ville… notre citadine hybride avec hayon électrique coche toutes les cases. On l’essaie dès maintenant ?', points: -2, reply: 'Attendez, vous allez un peu vite… Je ne suis même pas sûre que ce soit la voiture qu’il me faut.', note: 'Vous glissez un produit dans le résumé : ce n’est plus une validation, c’est une proposition. Elle sent la vente arriver trop vite.' }
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
          model: 'Une voiture pour ses tournées (« le matin je vois une quinzaine de patients », « en centre-ville, mais j’en ai aussi dans deux villages ») ; se garer facilement (« Me garer, surtout »).' },
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
      subtitle: 'Un entretien de découverte à analyser : repérez ce qui l’a ouvert ou fermé, et aidez votre collègue à progresser.',

      // L'accroche : la règle d'or du coach.
      warmup: {
        question: 'Votre collègue vous demande votre avis sur son entretien. Par quoi commencez-vous votre retour ?',
        order: ['b', 'a', 'c'], best: 'a',
        choices: {
          a: { text: 'Par ce qui a fonctionné, en citant ses questions.', fb: 'C’est la règle d’or du coach : partir du positif, avec des faits. Votre collègue sait ce qu’il faut garder, et écoutera mieux la suite.' },
          b: { text: 'Par l’erreur qui lui a coûté le plus cher, pour qu’il la retienne bien.', fb: 'Commencer par l’erreur met votre collègue sur la défensive : c’est le reproche qui restera, pas le conseil. Le positif d’abord, avec ses questions à l’appui.' },
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
          seller: { name: 'Camille', fem: true, role: 'Conseillère cuisine', face: 'visages/camille.webp' },
          people: {
            mme: { name: 'Mme Leroy', face: 'visages/mme-leroy.webp' },
            mr: { name: 'M. Leroy', face: 'visages/m-leroy.webp' }
          },
          context: 'Camille, conseillère dans un magasin de cuisines, revoit M. et Mme Leroy. Au premier rendez-vous, elle était allée trop vite.',
          ask: 'J’ai revu les Leroy ce matin. Je pensais avoir bien questionné, mais je repars sans savoir quoi leur proposer. Vous pouvez relire mon entretien et m’aider ?',
          moments: [
            { n: 'M1', label: 'L’ouverture', q: 'Merci d’être revenus. La dernière fois, je suis allée un peu vite. Aujourd’hui, je vous propose qu’on parle d’abord de vous et de votre cuisine, sans catalogue. Ça vous va ?',
              replies: [{ who: 'mme', text: 'Oui, très bien, ça nous va. La dernière fois, on est repartis avec une pile de catalogues, et on n’a même pas osé les ouvrir.' }],
              hint: 'Regardez ce que Camille annonce, et comment le couple réagit.',
              order: ['b', 'a', 'c'], best: 'a',
              choices: {
                a: { text: 'Un cadrage : elle reconnaît son erreur et annonce qu’elle va d’abord écouter.' },
                b: { text: 'Une question fermée : « Ça vous va ? » n’appelle qu’un oui, sans rien apprendre.', tone: 'mid', note: 'Elle se termine bien par une question fermée, mais ce n’est pas le sujet : ici, un « oui » suffit. Le moment sert à réparer la relation et à poser le cadre de l’écoute.' },
                c: { text: 'Une maladresse : en s’excusant, elle perd sa crédibilité face au couple.', tone: 'ko', note: 'Au contraire : reconnaître qu’elle est allée vite rassure les Leroy. Le couple accepte aussitôt de parler de lui.' }
              },
              why: 'Point fort. Elle répare la relation (« je suis allée un peu vite ») et annonce l’écoute (« sans catalogue »). Le couple accepte aussitôt.' },
            { n: 'M2', label: 'La journée type', q: 'Racontez-moi une journée type dans votre cuisine.',
              replies: [{ who: 'mme', text: 'Oh, en semaine, c’est vite fait : un café le matin, un petit plat le soir, on n’est que tous les deux. Mais le week-end, c’est autre chose ! Avec les petits-enfants, on cuisine à quatre ou cinq, tout le monde veut mettre la main à la pâte… et on se marche dessus.' }],
              hint: 'Quelle information nouvelle cette question a-t-elle fait apparaître ?',
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte large : elle fait apparaître le moment clé, le week-end à plusieurs.' },
                b: { text: 'Une question ouverte, mais trop vague : la réponse reste générale et peu utile pour la suite.', tone: 'mid', note: 'Elle est large, mais pas vague : la réponse donne le moment clé (« le week-end… on se marche dessus »). C’est ce qu’on attend du premier étage de l’entonnoir.' },
                c: { text: 'Une question hors sujet : la vie de famille ne dit rien de la cuisine à concevoir.', tone: 'ko', note: 'C’est l’inverse : la vie de famille est au cœur du projet. « On cuisine à quatre ou cinq » annonce déjà le besoin de place.' }
              },
              why: 'Point fort. Une question ouverte large, premier étage de l’entonnoir : elle fait apparaître le moment clé (« le week-end, on se marche dessus »).' },
            { n: 'M3', label: 'Les petits-enfants', q: 'Vous avez combien de petits-enfants ? Quel âge ? Ils viennent tous les week-ends ?',
              replies: [{ who: 'mme', text: 'Trois. 6, 9 et 12 ans. Et oui, presque tous les week-ends, depuis que leur maman travaille le samedi.' }],
              hint: 'Comptez les questions, et regardez ce que la réponse apprend vraiment.',
              order: ['c', 'b', 'a'], best: 'a',
              choices: {
                a: { text: 'Trois questions fermées en rafale : un interrogatoire qui apprend peu.' },
                b: { text: 'Une relance utile : elle creuse le moment clé que Mme Leroy vient d’évoquer.', tone: 'mid', note: 'L’intention de creuser est bonne, mais pas la forme : trois questions fermées d’affilée. Elle obtient des chiffres, pas ce qui se passe quand on « se marche dessus ».' },
                c: { text: 'Une question alternative : elle aide Mme Leroy à préciser son besoin de place.', tone: 'ko', note: 'Ce ne sont pas des alternatives (« ceci ou cela ? ») mais trois questions fermées. Et rien ne porte sur la place : l’âge des enfants ne dit pas ce qui gêne.' }
              },
              why: 'Trois fermées d’affilée : c’est un interrogatoire. Une seule question ouverte sur le moment évoqué (« Comment ça se passe, quand vous cuisinez à cinq ? ») en aurait appris davantage.' },
            { n: 'M4', label: 'L’îlot central', q: 'Vous voulez donc un îlot central, c’est ça ?',
              scene: 'M. Leroy fronce les sourcils.',
              replies: [{ who: 'mr', text: 'On n’a pas dit ça. On n’est pas venus pour qu’on nous dise ce qu’il nous faut.' }],
              hint: 'D’où vient le mot « îlot » : du couple, ou de Camille ?',
              order: ['b', 'c', 'a'], best: 'a',
              choices: {
                a: { text: 'Une question orientée : elle glisse une solution, et M. Leroy se braque.' },
                b: { text: 'Une reformulation : elle vérifie ce qu’elle a compris du besoin de place.', tone: 'mid', note: 'Une reformulation reprend les mots du client. Ici, « îlot central » vient de Camille : c’est une solution déguisée en question, et M. Leroy le sent.' },
                c: { text: 'Une précision bien placée : le besoin de place est déjà clair à ce stade.', tone: 'ko', note: 'Rien n’est clair encore : on sait qu’ils « se marchent dessus », pas pourquoi. Proposer l’îlot à ce stade ferme la découverte.' }
              },
              why: 'Décisif. Elle propose une solution avant d’avoir compris le problème. M. Leroy fronce les sourcils : la découverte se ferme.' },
            { n: 'M5', label: 'Ce qui gêne', q: 'Pardon. Qu’est-ce qui vous gêne le plus aujourd’hui quand vous cuisinez à plusieurs ?',
              replies: [{ who: 'mme', text: 'Ce qui me gêne ? Le plan de travail, déjà : il est trop petit, on finit par poser les plats sur la table, sur les chaises… Et puis il y a mon dos. Le four est tout en bas, et je ne peux plus me baisser pour sortir les plats. C’est mon petit-fils qui le fait, maintenant.' }],
              hint: 'Comparez avec la question sur l’îlot : qu’est-ce qui change dans la réponse ?',
              order: ['a', 'b', 'c'], best: 'b',
              choices: {
                a: { text: 'Une question orientée : « ce qui vous gêne » suppose un problème que le couple n’a pas évoqué.', tone: 'ko', note: 'Elle ne suppose rien : le couple vient de dire qu’il se marche dessus. Elle le laisse dire ce qui gêne, avec ses mots : deux besoins apparaissent (la place, le dos).' },
                b: { text: 'Une question ouverte ciblée : elle rattrape la situation, et deux besoins apparaissent.' },
                c: { text: 'Une question ouverte large : elle repart de zéro sur leur façon de cuisiner.', tone: 'mid', note: 'Elle est ouverte, mais pas large : elle cible les difficultés (« ce qui vous gêne le plus »), le deuxième étage de l’entonnoir. C’est pour cela qu’elle fait apparaître deux besoins précis.' }
              },
              why: 'Point fort. Une question ouverte ciblée sur les difficultés (deuxième étage) : elle rattrape la question sur l’îlot, et deux besoins apparaissent (un plan de travail plus grand, ne plus se baisser pour le four).' },
            { n: 'M6', label: 'La question à M. Leroy', q: 'Et vous, Monsieur, qu’est-ce qui compte pour vous dans ce projet ?',
              replies: [{ who: 'mr', text: 'Moi ? Que les travaux ne s’éternisent pas. Pour la salle de bains, on nous avait promis trois semaines. On a eu trois mois de retard, à aller se laver chez la voisine. Alors ça… plus jamais.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte à l’autre décideur : elle fait apparaître sa motivation.' },
                b: { text: 'Une question de politesse : elle fait participer M. Leroy, sans enjeu pour la vente.', tone: 'mid', note: 'Elle fait bien participer M. Leroy, mais l’enjeu est réel : c’est lui qui pose les conditions (les délais, puis le prix ferme). Sans cette question, Camille passait à côté.' },
                c: { text: 'Une question qui divise : elle oppose les attentes de Monsieur à celles de Madame.', tone: 'ko', note: 'Elle ne les oppose pas : elle donne la parole à celui qui se taisait, et qui s’était braqué à propos de l’îlot. Il livre sa motivation, la sécurité (« plus jamais »).' }
              },
              why: 'Point fort. Une question ouverte adressée à l’autre décideur : M. Leroy livre sa motivation, la sécurité (« trois mois de retard… plus jamais »).' },
            { n: 'M7', label: 'Les délais', q: 'Les délais, c’est votre priorité ?',
              replies: [{ who: 'mr', text: 'Les délais, oui. Et un prix ferme. La salle de bains a fini bien au-dessus du devis, avec un « imprévu » à chaque visite de l’artisan. Cette fois, je veux savoir ce que je paie. Pas de surprise à la fin.' }],
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une question fermée inutile : M. Leroy venait juste de le dire.', tone: 'mid', note: 'Elle valide ce qu’il a dit, et c’est utile : en répondant, il ajoute « un prix ferme ». Une fermée bien placée, après les ouvertes, sert à préciser.' },
                b: { text: 'Une question orientée : elle impose les délais comme la priorité du couple.', tone: 'ko', note: 'Elle reprend le mot de M. Leroy, sans rien lui souffler : c’est une validation. Et il en dit plus que la question (« et un prix ferme »).' },
                c: { text: 'Une question fermée de validation : elle fait préciser « prix ferme ».' }
              },
              why: 'Utile. Une fermée de validation, bien placée après les ouvertes : M. Leroy précise sa condition (« un prix ferme, pas de surprise »).' },
            { n: 'M8', label: 'Bois ou laqué', write: { guide: 'Le type de question, puis ce qu’elle a produit chez le couple…', ideas: [
                { text: 'c’est une question alternative (« ceci ou cela ? »)', words: ['alternati', 'choix entre', 'deux options', 'deux choix', 'ou laque', 'fermee'] },
                { text: 'elle arrive trop tôt', words: ['trop tot', 'premature', 'precipit', 'avant d avoir', 'trop vite', 'saute', 'pas encore', 'pas le moment', 'trop rapide'] },
                { text: 'elle porte sur un détail (les finitions, l’esthétique), pas sur leurs attentes', words: ['esthetique', 'finition', 'detail', 'couleur', 'materiau', 'apparence', 'deco', 'gout', 'attentes', 'besoin'] }
              ] }, q: 'Vous préférez du bois ou du laqué ?',
              replies: [{ who: 'mme', text: 'Euh… on n’y a pas encore pensé, à vrai dire. Le bois, c’est chaleureux, mais le laqué, ça se nettoie mieux, non ? Je ne sais pas… Qu’est-ce que tu en penses, toi ?' }],
              order: ['c', 'a', 'b'], best: 'c',
              choices: {
                a: { text: 'Une question alternative bien choisie : elle aide le couple à se projeter.', tone: 'mid', note: 'La forme est juste (une alternative), mais pas le moment : les Leroy « n’y ont pas encore pensé ». Il restait à explorer leurs attentes au quotidien.' },
                b: { text: 'Une question ouverte : elle laisse le couple libre de répondre ce qu’il veut.', tone: 'ko', note: '« Bois ou laqué ? » ne laisse que deux réponses : c’est une alternative. Et elle arrive trop tôt, sur un détail esthétique.' },
                c: { text: 'Une alternative trop tôt : elle saute aux finitions avant d’avoir fini d’explorer.' }
              },
              why: 'Décisif. Une alternative prématurée, sur l’esthétique : Camille saute à la précision avant d’avoir fini d’explorer. Le couple n’y a « pas encore pensé ».' },
            { n: 'M9', label: 'Le budget', write: { guide: 'Le type, puis l’effet…', ideas: [
                { text: 'c’est une question fermée, posée sèchement', words: ['fermee', 'seche', 'sec', 'directe', 'brutale', 'abrupte', 'sans transition', 'mal amene', 'oui ou non'] },
                { text: 'l’information est quand même obtenue', words: ['obtenu', 'obtient', 'information', 'chiffre', '15 000', '15000', 'montant', 'limite', 'repond', 'donne', 'fonctionne', 'quand meme'] }
              ] }, q: 'Vous avez un budget ?',
              replies: [{ who: 'mr', text: 'On a mis de côté 15 000 €. Pas un euro de plus : c’est l’argent de notre retraite, et on ne va pas emprunter maintenant.' }],
              order: ['b', 'c', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question orientée : elle pousse le couple à annoncer un chiffre élevé.', tone: 'ko', note: 'Elle ne souffle aucun montant. C’est une fermée sèche, posée sans transition, mais M. Leroy donne le chiffre et sa limite (« pas un euro de plus »).' },
                b: { text: 'Une fermée sèche sur le budget, mal amenée : l’information est quand même obtenue.' },
                c: { text: 'Une question indiscrète : on ne parle pas du budget aussi tôt dans un projet de cuisine.', tone: 'mid', note: 'Le budget se demande, et ce n’est pas trop tôt ici. Le défaut est la forme : une fermée sèche, sans transition. Mieux : « Quel budget avez-vous prévu pour ce projet ? »' }
              },
              why: 'Mal amenée, mais l’information est obtenue : 15 000 €, « pas un euro de plus ». Une question ouverte (« Quel budget avez-vous prévu ? ») aurait été plus naturelle.' },
            { n: 'M10', label: 'Le devis', write: { ideas: [
                { text: 'elle ne résume rien et ne fait rien valider', words: ['valid', 'resum', 'reformul', 'synthese', 'recapitul', 'confirm', 'verifi'] },
                { text: 'elle ne sait pas ce qui compte le plus pour eux (aucune priorité)', words: ['priorit', 'classer', 'hierarch', 'ce qui compte', 'plus important', 'en premier', 'ordre', 'quoi proposer'] }
              ] }, q: 'Très bien, je vous prépare un devis.',
              scene: 'M. et Mme Leroy échangent un regard. Mme Leroy range ses lunettes dans son sac.',
              replies: [{ who: 'mme', text: 'D’accord… Vous nous l’envoyez par mail ?' }],
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
            text: 'Les moments décisifs sont l’îlot central, le choix « bois ou laqué » et le devis : là, la découverte s’est fermée. L’interrogatoire sur les petits-enfants se défend aussi, si vous l’expliquez.',
            why: {
              M3: 'Acceptable : l’interrogatoire freine l’exploration, mais Camille rattrape ensuite la situation.',
              M4: 'La solution glissée trop tôt fait braquer M. Leroy : la découverte se ferme.',
              M8: 'Elle saute aux finitions avant d’avoir exploré leurs attentes.',
              M10: 'Elle clôt sans résumer ni faire classer : c’est pour cela qu’elle ne sait pas quoi proposer.'
            }
          },
          rewrites: [
            { n: 'M4', type: ['ouverte'], ideas: [
                { open: true, text: 'elle est ouverte', need: 'Être ouverte, pour laisser le couple parler.' },
                { text: 'elle porte sur ce qui les gêne, ou ce qui les aiderait, quand ils cuisinent à plusieurs', need: 'Porter sur ce qui les gêne, ou ce qui les aiderait, quand ils cuisinent à plusieurs.', words: ['aid', 'gen', 'difficult', 'problem', 'plusieurs', 'ensemble', 'a quatre', 'a cinq', 'a 4', 'a 5', 'week end', 'weekend', 'petits enfants', 'marche dessus', 'marchez dessus', 'marcher dessus', 'dessus', 'place', 'espace', 'facilit', 'manqu', 'compliqu', 'pratique', 'ideal', 'attend', 'besoin', 'imagin', 'souhait', 'envie', 'changer', 'amelior', 'confort', 'embet', 'agac', 'derang', 'bloqu', 'coince', 'serre', 'circul', 'bouger', 'tous', 'famille'] }
              ], others: ['Comment ça se passe, quand vous cuisinez à cinq ?', 'Qu’est-ce qui vous gêne le plus, quand vous êtes plusieurs dans la cuisine ?', 'Racontez-moi un samedi midi avec les petits-enfants dans votre cuisine.'], hint: 'Revenez au deuxième étage de l’entonnoir : ce qui les aiderait, sans rien proposer.',
              what: 'Elle propose l’îlot avant d’avoir compris le problème : M. Leroy se braque, et la découverte se ferme.',
              model: 'Qu’est-ce qui vous aiderait, quand vous cuisinez à plusieurs ?' },
            { n: 'M8', type: ['ouverte'], forbid: ['couleur', 'finition', 'facade', 'materiau', 'style', 'teinte', 'brillant', 'mat ', 'bois', 'laque'], forbidText: 'Votre question porte encore sur un détail esthétique (une couleur, une finition).', ideas: [
                { open: true, text: 'elle est ouverte', need: 'Être ouverte, pour laisser le couple parler.' },
                { text: 'elle porte sur leurs attentes, leur usage au quotidien', need: 'Porter sur leurs attentes et leur usage au quotidien, pas sur les finitions.', words: ['attend', 'quotidien', 'usage', 'utilis', 'important', 'compte', 'envie', 'souhait', 'besoin', 'ideal', 'imagin', 'priorit', 'pratique', 'servir', 'sert', 'habitude', 'reve', 'plaisir', 'futur', 'nouvelle cuisine', 'tous les jours', 'chaque jour', 'facilit', 'change', 'apporter', 'apporte', 'faire', 'cuisinez', 'cuisiner', 'vivre', 'vie'] }
              ], others: ['Comment utiliserez-vous votre nouvelle cuisine, au quotidien ?', 'Qu’est-ce qui compte le plus pour vous dans cette nouvelle cuisine ?', 'Qu’est-ce que votre future cuisine doit vous permettre de faire ?'], hint: 'Demandez-vous à quel étage on en est.',
              what: 'Elle saute aux finitions (bois ou laqué) alors que le couple n’a pas fini de dire ce qu’il attend : « on n’y a pas encore pensé ».',
              model: 'Qu’attendez-vous de votre future cuisine, au quotidien ?' },
            { n: 'M10', type: ['synthese'], ideas: [
                { text: 'vous résumez ce que vous avez compris', need: 'Résumer ce que vous avez compris de leurs besoins.', words: ['resum', 'si je comprends', 'si j ai bien compris', 'si je reprends', 'recapitul', 'vous m avez dit', 'vous avez besoin', 'il vous faut', 'plan de travail', 'four', 'delai', 'prix ferme', '15 000', '15000', 'dos', 'place', 'travaux', 'budget', 'synthese', 'reformul'] },
                { text: 'vous leur faites classer les priorités', need: 'Leur faire classer leurs priorités.', words: ['premier', 'premiere', 'priorit', 'plus important', 'compte le plus', 'compte plus', 'classer', 'ordre', 'avant tout', 'd abord', 'passe avant', 'essentiel', 'primordial', 'le plus', 'choisir', 'garder un seul', 'une chose', 'laquelle', 'lequel', 'une seule'] }
              ], others: ['Si je résume : plus de place, un four en hauteur, des délais tenus et un prix ferme. Qu’est-ce qui compte le plus pour vous ?', 'Si j’ai bien compris : de la place, pas besoin de se baisser, pas de retard, pas de surprise. Dans quel ordre ?'],
              what: 'Elle clôt sans résumer ni faire classer les priorités : elle repart sans savoir ce qui compte le plus.',
              model: 'Si je résume : un plan de travail pour cuisiner à plusieurs, un four en hauteur pour votre dos, des délais tenus et un prix ferme de 15 000 € au maximum. Qu’est-ce qui passe en premier pour vous ?' }
          ],
          // Ce que Camille aurait dû repartir en sachant.
          sort: [
            { id: 's1', text: 'Un plan de travail plus grand', kind: 'explicite', why: 'Mme Leroy le dit elle-même : « le plan de travail est trop petit ».' },
            { id: 's2', text: 'Ne plus se baisser pour sortir les plats du four', kind: 'explicite', why: 'Elle le dit elle-même : « je ne peux plus me baisser ». D’où un four en hauteur.' },
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
            good: 'Son ouverture répare la relation et annonce l’écoute (« sans catalogue »). « Racontez-moi une journée type » fait apparaître le moment clé (« le week-end… on se marche dessus »). « Qu’est-ce qui vous gêne le plus ? » rattrape la situation : deux besoins apparaissent (la place, le dos). « Et vous, Monsieur ? » donne la parole à M. Leroy, qui livre sa motivation (les délais).',
            diag: 'Ses questions ouvertes (la journée type, ce qui gêne, la question à M. Leroy) fonctionnent. Mais Camille enchaîne aussi fermées et alternatives (les petits-enfants, bois ou laqué, le budget) et propose une solution trop tôt (l’îlot) : l’entonnoir n’est pas respecté. Le dos de Mme Leroy et la sécurité de M. Leroy (délais, prix ferme) ne sont pas exploités, et rien n’est validé à la fin.',
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
            { n: 'M1', label: 'L’ouverture', q: 'La dernière fois, vous m’avez parlé de continuité de service. Avant toute proposition, j’aimerais mieux comprendre votre organisation. On prend vingt minutes ?',
              replies: [{ who: 'vidal', text: 'D’accord. Vingt minutes, ça me va, j’ai un comité de direction à onze heures. Et c’est vrai que la dernière fois, on a surtout parlé de vos tarifs.' }],
              hint: 'Regardez ce que Karim rappelle, et ce qu’il annonce.',
              order: ['b', 'c', 'a'], best: 'a',
              choices: {
                a: { text: 'Un cadrage : il rappelle le besoin et prend le temps de comprendre.' },
                b: { text: 'Une question fermée : « On prend vingt minutes ? » n’appelle qu’un oui.', tone: 'mid', note: 'Elle se termine par une fermée, mais ce n’est pas le sujet : le « oui » suffit. Karim rappelle le besoin et annonce qu’il veut comprendre avant de proposer.' },
                c: { text: 'Une perte de temps : il aurait dû présenter son offre dès le début.', tone: 'ko', note: 'Présenter l’offre d’abord, c’est parler de soi avant le client. Ce cadrage montre au contraire qu’il écoute.' }
              },
              why: 'Point fort. Un cadrage avec rappel : il reprend le besoin du premier échange et annonce qu’il veut comprendre avant de proposer.' },
            { n: 'M2', label: 'L’organisation du ménage', q: 'Comment le ménage est-il organisé aujourd’hui, sur une journée ?',
              replies: [{ who: 'vidal', text: 'Alors… six agents de notre prestataire le matin, pour les chambres, et deux l’après-midi pour les parties communes : le hall, les couloirs, le spa. Sur le papier, ça tient. Sauf que dès qu’il en manque un, et ça arrive presque chaque semaine, ce sont mes réceptionnistes qui dépannent.' }],
              hint: 'Quelle information inattendue arrive à la fin de la réponse ?',
              order: ['a', 'b', 'c'], best: 'a',
              choices: {
                a: { text: 'Une question ouverte large : elle fait apparaître le dépannage par la réception.' },
                b: { text: 'Une question technique : elle porte sur l’organisation du ménage, pas sur les besoins.', tone: 'mid', note: 'Elle porte sur l’organisation, mais c’est voulu : en décrivant sa journée, M. Vidal révèle un problème (ses réceptionnistes dépannent).' },
                c: { text: 'Une question orientée : elle suppose que le ménage est mal organisé.', tone: 'ko', note: 'Elle ne suppose rien : elle laisse M. Vidal décrire sa journée avec ses mots. C’est lui qui fait apparaître le problème.' }
              },
              why: 'Point fort. Une question ouverte large : en décrivant la journée, M. Vidal révèle que ses réceptionnistes font le ménage quand il manque quelqu’un.' },
            { n: 'M3', label: 'Les réceptionnistes', q: 'Vos réceptionnistes dépannent ?',
              replies: [{ who: 'vidal', text: 'Oui, elles montent faire des chambres. Et pendant ce temps, l’accueil est vide. J’ai des clients qui attendent leur chambre jusqu’à 16 h, la valise à la main, alors que l’arrivée est à 14 h. Et ils le notent dans leurs avis : « personnel débordé », « chambre pas prête ». On a perdu quatre dixièmes de note en six mois.' }],
              hint: 'D’où viennent les mots de la question ? Et que contient la réponse ?',
              order: ['a', 'b', 'c'], best: 'c',
              choices: {
                a: { text: 'Une question fermée : elle n’appelle qu’un « oui » de confirmation, sans rien de plus.', tone: 'mid', note: 'Sur le papier, on peut répondre oui. Mais en reprenant ses mots, Karim l’invite à développer, et M. Vidal parle des clients et de leurs avis.' },
                b: { text: 'Une répétition inutile : M. Vidal vient de le dire.', tone: 'ko', note: 'Ce n’est pas une répétition : c’est un écho. Reprendre ses mots l’invite à développer, et la suite est précieuse (l’accueil vide, les avis).' },
                c: { text: 'Un écho : en reprenant ses mots, il révèle l’impact sur les clients et les avis.' }
              },
              why: 'Point fort. Un écho : en reprenant ses mots, Karim fait apparaître l’impact sur les clients (l’attente, les avis).' },
            { n: 'M4', label: 'L’impact sur les équipes', q: 'Quel impact cela a-t-il sur vos équipes ?',
              replies: [{ who: 'vidal', text: 'Énorme. Elles font deux métiers à la fois, et elles le vivent mal. Deux arrêts maladie ce trimestre, dont ma meilleure réceptionniste. Elles sont épuisées, et je sais que deux d’entre elles regardent ailleurs. Je risque d’en perdre, et on ne les remplace pas en un mois.' }],
              hint: 'À quel étage de l’entonnoir est-on : la situation, ou les enjeux ?',
              order: ['b', 'c', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question ouverte large : elle reprend l’exploration à zéro.', tone: 'mid', note: 'Elle est ouverte, mais pas large : elle cible un enjeu (l’impact sur les équipes). C’est le deuxième étage, et elle fait dire le coût humain.' },
                b: { text: 'Une ouverte sur les enjeux : elle fait dire le coût humain.' },
                c: { text: 'Une question indiscrète : les équipes du client ne regardent pas Karim.', tone: 'ko', note: 'Les équipes sont au cœur du problème : c’est sur elles que pèse le manque. M. Vidal répond sans réserve.' }
              },
              why: 'Point fort. Une question ouverte sur les enjeux : M. Vidal dit le coût humain (deux arrêts maladie, des équipes épuisées).' },
            { n: 'M5', label: 'Les questions techniques', q: 'Combien de chambres ? Combien d’étages ? Quelle surface de parties communes ? Quels revêtements de sol ?',
              scene: 'M. Vidal soupire et jette un œil à sa montre.',
              replies: [{ who: 'vidal', text: '… Je vous enverrai le plan. Mon assistante a tout ça.' }],
              hint: 'Que venait de dire M. Vidal ? Et comment répond-il ici ?',
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une question ouverte : elle laisse M. Vidal décrire son hôtel.', tone: 'ko', note: 'Quatre questions fermées d’affilée, techniques : M. Vidal se ferme (« je vous enverrai le plan »).' },
                b: { text: 'Des précisions utiles, mais posées trop vite : ces chiffres serviront.', tone: 'mid', note: 'Ces chiffres serviront, oui. Mais ils tombent juste après l’épuisement des équipes : Karim quitte l’enjeu humain, et M. Vidal se ferme.' },
                c: { text: 'Une rafale de fermées techniques : elle casse la dynamique au pire moment.' }
              },
              why: 'Décisif. Une rafale de fermées techniques juste après l’enjeu humain : Karim quitte le sujet qui compte, et M. Vidal se ferme.' },
            { n: 'M6', label: 'Le remplacement garanti', q: 'Notre remplacement garanti sous deux heures règle exactement ce problème.',
              replies: [{ who: 'vidal', text: 'Peut-être. Mais ce n’est pas qu’une question de remplacement. L’audit de classement revient en mars, et la dernière fois, l’inspecteur a relevé la propreté de plusieurs chambres.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une solution prématurée : il propose avant d’avoir tout compris.' },
                b: { text: 'Une reformulation : il montre qu’il a compris le problème des absences.', tone: 'mid', note: 'Il a compris une partie du problème, mais il ne reformule pas : il propose son produit. Et M. Vidal révèle aussitôt un enjeu plus grand (l’audit).' },
                c: { text: 'Une conclusion bien placée : le besoin est clair, il peut proposer.', tone: 'ko', note: 'Le besoin n’est pas clair : M. Vidal parle aussitôt de l’audit de mars, que Karim ignorait. Il a proposé trop tôt.' }
              },
              why: 'Décisif. Une solution prématurée : Karim propose avant d’avoir tout compris. Le vrai enjeu (l’audit de mars) arrive après.' },
            { n: 'M7', label: 'L’audit de mars', q: 'Il revient en mars ?',
              replies: [{ who: 'vidal', text: 'Une contre-visite, oui. Les remarques de l’automne doivent être levées d’ici là. Si l’hôtel perd sa quatrième étoile, le groupe ne me le pardonnera pas : c’est mon poste qui est en jeu.' }],
              order: ['c', 'b', 'a'], best: 'b',
              choices: {
                a: { text: 'Une question hors sujet : l’audit ne concerne pas le ménage.', tone: 'ko', note: 'L’audit concerne directement la propreté des chambres. Et c’est le vrai enjeu de M. Vidal : son poste.' },
                b: { text: 'Un écho : il révèle l’enjeu personnel de M. Vidal, son poste.' },
                c: { text: 'Une fermée de vérification : elle confirme seulement la date.', tone: 'mid', note: 'Elle pourrait appeler un simple oui. Mais en reprenant ses mots, Karim l’invite à développer, et M. Vidal livre son enjeu personnel.' }
              },
              why: 'Point fort. Un écho : M. Vidal livre son enjeu personnel (« c’est mon poste qui est en jeu »).' },
            { n: 'M8', label: 'La formule premium', write: { guide: 'Le type de question, puis ce qu’elle a produit chez M. Vidal…', ideas: [
                { text: 'c’est une question orientée (elle contient la réponse)', words: ['orient', 'induit', 'suggest', 'sugger', 'souffl', 'pousse', 'force', 'manipul', 'tendanc', 'impose', 'oriente'] },
                { text: 'il glisse un produit, sa formule', words: ['produit', 'formule', 'premium', 'offre', 'vend', 'solution', 'propose', 'commercial'] },
                { text: 'M. Vidal se replie', words: ['replie', 'repli', 'ferme', 'recul', 'mefian', 'hesit', 'groupe', 'convaincu', 'bloque', 'braque', 'refroid', 'esquive'] }
              ] }, q: 'Vous ne voulez sûrement pas prendre de risque : vous préférerez notre formule premium ?',
              replies: [{ who: 'vidal', text: 'Je ne sais pas. Je ne vais pas signer une formule les yeux fermés. Je dois voir avec le groupe.' }],
              order: ['b', 'c', 'a'], best: 'c',
              choices: {
                a: { text: 'Une alternative : il laisse M. Vidal choisir entre deux formules.', tone: 'mid', note: 'Il n’y a pas de choix : « vous préférerez notre formule premium » contient déjà la réponse. C’est une question orientée.' },
                b: { text: 'Une question pour hiérarchiser : il aide M. Vidal à classer ses priorités.', tone: 'ko', note: 'Elle ne fait rien classer : elle pousse une formule, en jouant sur la peur du risque. M. Vidal se replie.' },
                c: { text: 'Une question orientée : il pousse une formule, et M. Vidal se replie.' }
              },
              why: 'Décisif. Une question orientée : Karim pousse sa formule premium en jouant sur la peur. M. Vidal se replie (« je dois voir avec le groupe »).' },
            { n: 'M9', label: 'La décision', write: { guide: 'Le type, puis l’effet…', ideas: [
                { text: 'c’est une bonne question, ouverte', words: ['ouverte', 'bonne question', 'pertinent', 'bien', 'point fort', 'utile', 'efficace', 'judicieu', 'reussi'] },
                { text: 'elle fait apparaître qui décide (le siège, son seuil, la gouvernante générale)', words: ['decision', 'decide', 'decideur', 'valide', 'qui d autre', 'processus', 'siege', 'gouvernante', '50 000', '50000', 'seuil', 'montant', 'groupe'] }
              ] }, q: 'Qui d’autre intervient dans la décision ?',
              replies: [{ who: 'vidal', text: 'Le siège du groupe valide tout ce qui dépasse 50 000 € par an. Et ma gouvernante générale doit être d’accord : c’est elle qui travaillera avec votre équipe tous les jours. Si elle n’y croit pas, ça ne marchera pas.' }],
              order: ['a', 'c', 'b'], best: 'a',
              choices: {
                a: { text: 'Une ouverte sur la décision : il apprend qui valide, et à partir de quel montant.' },
                b: { text: 'Une question fermée : elle n’appelle qu’un nom.', tone: 'mid', note: 'Elle est ouverte (« qui d’autre ? ») et elle fonctionne : M. Vidal cite le siège, son seuil, et sa gouvernante générale.' },
                c: { text: 'Une question gênante : elle met en doute l’autorité de M. Vidal devant son prestataire.', tone: 'ko', note: 'Elle ne met rien en doute : il vient de parler du groupe. Il répond sans gêne, et Karim apprend tout du processus de décision.' }
              },
              why: 'Point fort. Une question ouverte sur le processus de décision : le siège au-delà de 50 000 € par an, et la gouvernante générale.' },
            { n: 'M10', label: 'La conclusion', write: { ideas: [
                { text: 'il ne résume rien et ne fait rien valider', words: ['valid', 'resum', 'reformul', 'synthese', 'recapitul', 'confirm', 'verifi'] },
                { text: 'il propose « premium » sans savoir ce qui passe en premier', words: ['priorit', 'classer', 'hierarch', 'ce qui compte', 'plus important', 'en premier', 'ordre', 'premium', 'sans savoir'] }
              ] }, q: 'Parfait, je vous envoie la proposition premium demain.',
              scene: 'M. Vidal hoche la tête, sans conviction.',
              replies: [{ who: 'vidal', text: 'Envoyez toujours. Je regarderai.' }],
              order: ['c', 'a', 'b'], best: 'b',
              choices: {
                a: { text: 'Une relance efficace : il fixe une suite précise dès le lendemain.', tone: 'mid', note: 'Fixer une suite est utile, mais Karim ne résume rien et ne fait pas classer les priorités. Il propose « premium » sans savoir ce qui passe en premier.' },
                b: { text: 'Une clôture sans validation : aucune priorité n’est validée.' },
                c: { text: 'Une synthèse : il résume les besoins de M. Vidal avant de faire sa proposition.', tone: 'ko', note: 'Il n’y a aucun résumé : il annonce sa proposition. C’est justement ce qui manque, et M. Vidal n’est pas convaincu.' }
              },
              why: 'Conséquence de la formule premium poussée juste avant : une clôture sans validation. Karim propose « premium » sans hiérarchie validée, et M. Vidal n’est pas convaincu.' }
          ],
          decisive: {
            expected: ['M5', 'M6', 'M8'], acceptable: ['M10'],
            text: 'Les moments décisifs sont la rafale de questions techniques, le « remplacement garanti » et la formule premium : Karim questionne bien, mais il sort de l’entonnoir chaque fois qu’un enjeu apparaît. La conclusion se défend aussi, si vous l’expliquez.',
            why: {
              M5: 'La rafale technique casse la dynamique juste après l’enjeu humain.',
              M6: 'Il propose sa solution avant d’avoir compris : l’audit de mars arrive après.',
              M8: 'Il pousse une formule en jouant sur la peur : M. Vidal se replie.',
              M10: 'Acceptable : c’est la conséquence de la formule premium, une proposition sans priorités validées.'
            }
          },
          rewrites: [
            { n: 'M5', type: ['ouverte', 'echo'], forbid: ['chambre', 'etage', 'surface', 'metre', 'm2', 'revetement', 'sol ', 'plan '], forbidText: 'Votre question revient aux détails techniques, loin de l’enjeu humain.', ideas: [
                { open: true, text: 'elle est ouverte', need: 'Être ouverte, pour laisser M. Vidal parler.' },
                { text: 'elle reste sur l’enjeu humain : ses équipes', need: 'Rester sur l’enjeu qui vient d’apparaître : ses équipes.', words: ['equipe', 'receptionn', 'agent', 'personnel', 'salarie', 'collaborat', 'epuis', 'arret', 'fatigue', 'soulag', 'perdre', 'garder', 'humain', 'elles', 'collegue', 'employe', 'charge de travail', 'moral', 'tension', 'depart', 'absence', 'absent', 'gens', 'monde'] }
              ], others: ['Qu’est-ce qui aiderait le plus vos équipes, aujourd’hui ?', 'Elles sont épuisées, dites-vous : qu’est-ce que ça change pour l’hôtel ?', 'Que se passerait-il si vous perdiez une de vos réceptionnistes ?'], hint: 'Restez sur l’enjeu qui vient d’apparaître : ses équipes.',
              what: 'Juste après l’épuisement des équipes, il enchaîne quatre questions techniques : il quitte l’enjeu humain, et M. Vidal se ferme.',
              model: 'Et pour vos équipes, qu’est-ce qui devrait changer en priorité ?' },
            { n: 'M6', type: ['ouverte'], ideas: [
                { open: true, text: 'elle est ouverte', need: 'Être ouverte, pour laisser M. Vidal parler.' },
                { text: 'elle cherche ce qui compte pour lui, avant de proposer', need: 'Chercher ce qui compte pour lui, avant de proposer quoi que ce soit.', words: ['faudrait', 'faut', 'important', 'compte', 'attend', 'ideal', 'reussi', 'evit', 'reproduis', 'plus jamais', 'serein', 'rassur', 'priorit', 'enjeu', 'consequence', 'mars', 'audit', 'chang', 'besoin', 'pour vous', 'inquiet', 'preoccup', 'risque', 'pire', 'attente', 'aider', 'solution', 'regler', 'resoudre', 'souhait', 'aimeriez'] }
              ], others: ['Qu’est-ce qui serait le plus important pour vous dans une nouvelle organisation ?', 'Qu’est-ce qui vous inquiète le plus, dans les semaines qui viennent ?', 'Comment verriez-vous les choses idéalement ?'], hint: 'Demandez-vous s’il a tout compris avant de proposer.',
              what: 'Il propose son remplacement garanti avant d’avoir tout compris : le vrai enjeu, l’audit de mars, arrive après.',
              model: 'Que faudrait-il pour que ce problème ne se reproduise plus ?' },
            { n: 'M8', type: ['alternative', 'ouverte'], ideas: [
                { text: 'vous lui faites classer ses priorités', need: 'Lui faire classer ses priorités.', words: ['premier', 'premiere', 'priorit', 'plus important', 'compte le plus', 'compte plus', 'classer', 'ordre', 'avant tout', 'd abord', 'passe avant', 'essentiel', 'primordial', 'le plus', 'choisir', 'garder un seul', 'une chose', 'laquelle', 'lequel', 'une seule'] },
                { text: 'vous reprenez ses enjeux (la continuité, ses équipes, l’audit de mars)', need: 'Reprendre ses enjeux : la continuité, ses équipes, l’audit de mars.', words: ['continuit', 'equipe', 'audit', 'mars', 'etoile', 'menage', 'receptionn', 'remplac', 'absence', 'avis', 'client', 'poste', 'classement', 'inspect', 'personnel', 'proprete'] }
              ], others: ['Entre l’audit de mars et vos équipes, qu’est-ce qui passe en premier ?', 'Si vous ne deviez régler qu’une chose avant mars, ce serait laquelle ?'],
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
            good: '« Comment le ménage est-il organisé ? » fait apparaître le dépannage par la réception. L’écho « Vos réceptionnistes dépannent ? » révèle l’impact sur les clients et leurs avis. « Quel impact sur vos équipes ? » fait dire le coût humain (deux arrêts maladie). L’écho « Il revient en mars ? » révèle l’enjeu personnel (son poste). « Qui d’autre intervient ? » éclaire la décision (le siège, la gouvernante générale).',
            diag: 'Karim questionne bien (ouvertes, échos), mais il sort de l’entonnoir chaque fois qu’un enjeu apparaît : une rafale de questions techniques, une solution (le remplacement garanti), une question orientée (la formule premium). L’échéance de mars et l’enjeu personnel de M. Vidal (la sécurité) ne sont pas exploités, et il propose « premium » sans priorités validées. Il aurait dû savoir aussi que la décision est partagée : le siège au-delà de 50 000 € par an, et la gouvernante générale.',
            tips: 'Quand un enjeu apparaît (l’épuisement, l’audit), restez dessus avec une question ouverte : « Qu’est-ce que ça change pour vous ? » ; gardez les questions techniques pour la fin. Avant de proposer, résumez et faites classer : « Entre la continuité, vos équipes et l’audit de mars, qu’est-ce qui passe en premier ? »'
          }
        }
      },

      /* Les pages de transition, avant chaque étape à partir de la deuxième :
       * ce que vous venez de faire, pourquoi la suite, ce qu'on vous demande.
       * {name} : le prénom du collègue ; {il} : il ou elle. */
      transitions: [
        { done: 'Vous connaissez la règle d’or du coach.', why: 'Voici votre chemin : six étapes, de la lecture de l’entretien jusqu’à la fiche que vous remettrez à {name}.', todo: 'Lisez l’entretien de {name} en entier, puis analysez ses questions une à une.' },
        { done: 'Vous avez analysé les dix moments de l’entretien de {name}.', why: 'Toutes les questions ne se valent pas : quelques-unes seulement ont fait basculer la découverte. Un bon coach se concentre sur elles.', todo: 'Choisissez les 3 moments qui ont le plus pesé.' },
        { done: 'Vous avez repéré les moments qui ont tout changé.', why: 'Dire ce qui n’a pas marché ne suffit pas : {name} a besoin de savoir quoi dire à la place.', todo: 'Pour chaque moment décisif, écrivez la question que vous auriez posée.' },
        { done: 'Vous avez proposé de meilleures questions.', why: 'En questionnant mieux, {name} serait reparti{e} avec des informations précises sur le client. Ce sont elles qui permettent de faire la bonne proposition.', todo: 'Classez ce que {name} aurait dû apprendre, puis mettez les priorités du client dans l’ordre.' },
        { done: 'Vous avez tout ce qu’il faut pour faire votre retour.', why: 'Il reste à le dire à {name}, de façon utile : des faits, le positif d’abord, sans juger la personne.', todo: 'Rédigez votre fiche en trois rubriques : ce qui a marché, ce qui a coincé, deux conseils.' },
        { done: 'Votre fiche de coaching est prête.', why: 'Avant de découvrir le corrigé, relisez-la avec les critères de votre tuteur.', todo: 'Répondez Oui ou Non à chaque critère de la grille.' }
      ],

      // La fiche de coaching (rubriques 1, 2 et 5 du gabarit ; 3 et 4 viennent de vos étapes).
      fiche: [
        { id: 'good', tab: 'Ce qui a marché', label: 'Qu’est-ce que {name} a bien fait ?', sub: 'Citez au moins deux de ses questions, et ce qu’elles ont fait dire au client. Un retour commence toujours par là.', placeholder: '« … » a fait dire au client que…' },
        { id: 'diag', tab: 'Ce qui a coincé', label: 'Qu’est-ce qui a coincé, et pourquoi ?', sub: 'En deux ou trois phrases : les questions qui ont fermé la découverte, et ce que {name} n’a pas exploité chez le client.', placeholder: 'Quand {name} a demandé « … », le client…' },
        { id: 'tips', tab: 'Deux conseils', label: 'Quels deux conseils lui donnez-vous ?', sub: 'Deux conseils concrets, qu’{il} pourra appliquer dès son prochain entretien.', placeholder: '1. … 2. …' }
      ],

      selfCheck: [
        { text: 'Mes 3 moments sont ceux où la découverte s’est ouverte ou fermée, et je l’explique.' },
        { text: 'Je nomme le type de chaque question citée (ouverte, fermée, alternative, orientée).' },
        { text: 'Je relève au moins un besoin implicite et une motivation que mon ou ma collègue n’a pas exploités.' },
        { text: 'Mes questions de remplacement sont ouvertes ou bien placées dans l’entonnoir, sans produit.' },
        { text: 'Ce que mon ou ma collègue aurait dû savoir est hiérarchisé, avec les mots du client.' },
        { text: 'Mon retour est factuel, commence par le positif et ne juge pas la personne.' },
        { text: 'Pertinence du choix : j’ai choisi les questions qui ont le plus pesé sur la découverte, pas les plus visibles.' }
      ],

      keyPoint: 'À retenir : un entretien se juge à ce que chaque question fait dire au client. Les moments décisifs sont ceux où la découverte s’ouvre ou se ferme, souvent quand le vendeur propose trop tôt, ou ne fait pas classer les priorités.'
    },

    /* OPTION 3 « MA BANQUE DE QUESTIONS TERRAIN » (Bloom 6, ≈ 60 min). La
     * responsable demande de préparer une banque de questions pour un
     * nouveau collègue. Deux situations parmi huit ; pour chacune, « Le bon
     * réflexe » (une scène, trois réponses), puis une fiche ; puis cinq règles
     * d'or, le test terrain (facultatif), la grille. Les questions écrites sont
     * jugées sur leur FORME (ATELIER_QTYPE) : le métier de l'apprenant n'est
     * pas connu d'avance. Banque de tests : tests/banque.test.cjs. */
    '6.3': {
      eyebrow: 'Pour aller plus loin · Synthèse facultative',
      title: 'Ma banque de questions terrain',
      subtitle: 'Préparez, pour un nouveau collègue, les questions qui réussissent les découvertes dans votre métier.',
      decor: 'dialogues/salle-equipe.webp',
      manager: { name: 'Nadia', role: 'Votre responsable', face: 'visages/responsable.webp' },
      newcomer: { name: 'Lucas', role: 'Nouveau collègue, en alternance', face: 'visages/nouveau-collegue.webp' },
      ask: 'Lucas arrive lundi en alternance. Je voudrais que vous lui prépariez une banque de questions pour réussir ses découvertes client. Vous connaissez nos clients mieux que personne : appuyez-vous sur ce que vous vivez au comptoir.',
      mission: [
        'Dire en une ligne quel est votre métier.',
        'Choisir 2 situations de découverte que vous rencontrez souvent.',
        'Pour chacune, trouver le bon réflexe, puis remplir une fiche de questions.',
        'Écrire vos 5 règles d’or, puis vérifier votre banque avec la grille.'
      ],
      rule: 'Une bonne banque parle de VOS clients et de VOS produits : elle ne pourrait pas être copiée telle quelle dans une autre entreprise.',

      // Les huit situations (fiche), leur piège et leur question clé (repères du tuteur).
      // « reflex » : la scène du bon réflexe, trois réponses (best, mid, ko).
      situations: [
        { id: 'sait', deep: { trapWhy: 'Servi trop vite, il repart avec un modèle qui ne convient peut-être pas ; contredit, il se sent jugé et se ferme.', need: 'Être rassuré sur son choix, et qu’on respecte le travail de comparaison qu’il a déjà fait.', more: ['Comment l’utiliserez-vous, au quotidien ?', 'Qu’est-ce qui ne vous convenait plus, avec l’ancien ?'] }, fx: { sit: 'Un samedi, une cliente arrive avec la référence d’un lave-linge vu sur Internet : « le modèle X, 9 kg ». Elle a tout comparé et veut juste savoir s’il est en stock.', disc: 'Pourquoi ce modèle, comment elle l’utilisera, où il sera installé.' }, title: 'Le client qui sait ce qu’il veut', line: 'Une demande précise dès l’arrivée : un modèle, une référence.', trap: 'Le servir sans comprendre, ou le contredire.', key: 'Qu’est-ce qui vous a fait choisir ce modèle ?', face: 'clients/client-pull-clair.webp',
          reflex: { who: 'La cliente', context: 'Samedi matin, en magasin. Une cliente s’avance droit vers vous, son téléphone à la main : elle a noté une référence.', says: 'Bonjour ! Je viens pour le lave-linge X, le 9 kg, celui que j’ai vu sur votre site hier soir. J’ai déjà tout comparé, hein. Vous l’avez en stock ?', order: ['b', 'c', 'a'], best: 'a',
            choices: {
              a: { text: 'Il est bien en stock. Qu’est-ce qui vous a fait choisir celui-là ?' },
              b: { text: 'Oui, je vous le prépare tout de suite. Vous réglez par carte ?', tone: 'mid', note: 'Vous la servez vite, mais vous ne saurez jamais si ce modèle lui convient vraiment. Au moindre souci, elle reviendra déçue.' },
              c: { text: 'Celui-là est bien, mais on a beaucoup mieux pour le même prix, vous savez.', tone: 'ko', note: 'Vous contredisez son choix avant de le comprendre : elle se sent jugée et se ferme.' }
            },
            why: 'Vous confirmez, puis vous cherchez la raison de son choix. C’est elle qui dira si ce modèle lui convient.' } },
        { id: 'regarde', deep: { trapWhy: 'Insister le fait fuir ; le laisser partir, c’est perdre un projet qui existe peut-être déjà.', need: 'Regarder sans pression, et trouver de l’aide le jour où il en aura besoin.', more: ['Vous avez un projet en tête, ou vous vous faites une idée ?', 'Qu’est-ce qui a attiré votre regard ?'] }, fx: { sit: 'Un client flâne dans le magasin depuis dix minutes. Quand je m’approche, il me répond « Je regarde juste », sans lever les yeux.', disc: 'Ce qui l’a fait entrer aujourd’hui, s’il a un projet, et pour quand.' }, title: 'Le client qui « regarde juste »', line: 'Aucun besoin exprimé : on « regarde ».', trap: 'Insister, ou le laisser partir.', key: 'Qu’est-ce qui vous amène aujourd’hui ?', face: 'clients/client-veste-verte.webp',
          reflex: { who: 'La cliente', context: 'En fin d’après-midi, une cliente entre et flâne entre les rayons. Elle s’arrête, touche un article, repart. Vous vous approchez en souriant.', says: 'Oh, non merci, je regarde juste… Je passais devant, alors je suis entrée. On verra bien.', order: ['b', 'a', 'c'], best: 'b',
            choices: {
              a: { text: 'Pas de souci, je vous laisse regarder tranquillement. Je suis là si besoin.', tone: 'mid', note: 'C’est poli, mais vous la laissez partir sans rien savoir. Une question légère, sans pression, ouvre la porte.' },
              b: { text: 'Avec plaisir. Qu’est-ce qui vous amène, aujourd’hui ?' },
              c: { text: 'Vous êtes sûre ? On a justement une belle promotion sur toute cette allée.', tone: 'ko', note: 'Vous insistez et vous parlez produit : elle se sent poussée et s’éloigne.' }
            },
            why: 'Une question ouverte, légère, sans pression : elle peut répondre, ou non, mais la porte est ouverte.' } },
        { id: 'entreprise', deep: { trapWhy: 'Parler de vous d’abord, c’est passer vingt minutes sans rien apprendre de ses enjeux.', need: 'Qu’on comprenne son activité et ses contraintes avant de lui proposer quoi que ce soit.', more: ['Qu’est-ce qui vous pose le plus de difficultés aujourd’hui ?', 'Qui d’autre intervient dans ce type de décision ?'] }, fx: { sit: 'Premier rendez-vous chez le dirigeant d’une PME de 30 salariés. Il me reçoit entre deux réunions et me donne vingt minutes.', disc: 'Comment fonctionne son activité, ce qui lui pose problème aujourd’hui, qui décide avec lui.' }, title: 'Le premier rendez-vous avec une entreprise', line: 'Un prospect que vous ne connaissez pas encore.', trap: 'Présenter son entreprise d’abord.', key: 'Comment fonctionne votre activité aujourd’hui ?', face: 'clients/client-tasse.webp',
          reflex: { who: 'Le dirigeant', context: 'Premier rendez-vous chez un prospect. Le dirigeant d’une PME vous reçoit dans son bureau, entre deux réunions ; il pose son téléphone face cachée.', says: 'Bon. On m’a dit de vous recevoir, alors je vous écoute. Je vous préviens, j’ai une réunion juste après : vous avez vingt minutes.', order: ['c', 'a', 'b'], best: 'b',
            choices: {
              a: { text: 'Merci. Je vous présente d’abord notre société et nos trois offres phares.', tone: 'ko', note: 'Vous parlez de vous avant de parler de lui : il écoute poliment, et vous ne savez toujours rien de ses besoins.' },
              b: { text: 'Merci. Pour commencer, comment fonctionne votre activité aujourd’hui ?' },
              c: { text: 'Merci. Combien de salariés avez-vous, et sur combien de sites ?', tone: 'mid', note: 'Ces chiffres serviront, mais deux questions fermées pour commencer, c’est un interrogatoire. Faites-le d’abord raconter.' }
            },
            why: 'Une question ouverte et large : il raconte son activité, et ses enjeux apparaissent d’eux-mêmes.' } },
        { id: 'appel', deep: { trapWhy: 'Un prix sec, sans contexte : le client compare, et raccroche pour appeler le concurrent.', need: 'Une réponse juste et rapide, et sentir qu’on s’intéresse à sa situation, pas seulement au prix.', more: ['Qu’est-ce qui vous amène à vous renseigner aujourd’hui ?', 'Qu’attendez-vous d’un entretien, en dehors du prix ?'] }, fx: { sit: 'Une cliente appelle : « C’est combien, votre formule d’entretien ? » Elle appelle plusieurs magasins pour comparer les prix.', disc: 'Son équipement, ce qu’elle attend d’un entretien, ce qui compte pour elle à part le prix.' }, title: 'L’appel entrant', line: 'Un appel pour se renseigner, souvent sur le prix.', trap: 'Donner un prix tout de suite.', key: 'Pour vous répondre au mieux, quelle est votre situation ?', face: 'clients/client-cheveux-gris.webp',
          reflex: { who: 'Au téléphone', context: 'Le téléphone sonne. Au bout du fil, une cliente qui ne vous connaît pas encore : on entend du bruit derrière elle, elle appelle sans doute entre deux choses.', says: 'Oui, bonjour, je voulais juste un renseignement. C’est combien, votre formule d’entretien ? J’appelle un peu partout pour comparer.', order: ['a', 'c', 'b'], best: 'c',
            choices: {
              a: { text: 'Elle est à 89 € par an, pièces et main-d’œuvre comprises, sans engagement.', tone: 'ko', note: 'Un prix sec, sans contexte : elle compare, et raccroche pour appeler le concurrent.' },
              b: { text: 'Ça dépend. Vous avez quel modèle, exactement ?', tone: 'mid', note: 'L’idée est bonne, mais la question est fermée et sans explication : elle a l’impression qu’on esquive son prix.' },
              c: { text: 'Pour vous donner le bon prix, pouvez-vous me décrire votre situation ?' }
            },
            why: 'Vous expliquez pourquoi vous posez la question, et vous la laissez décrire sa situation : le prix viendra, et il sera juste.' } },
        { id: 'accompagne', deep: { trapWhy: 'Celui qu’on oublie décide souvent aussi : il peut bloquer l’achat sans rien dire.', need: 'Que chacun soit écouté, et que la solution convienne aux deux.', more: ['Comment allez-vous l’utiliser, l’un et l’autre ?', 'Si vous deviez garder un seul critère chacun, lequel ?'] }, fx: { sit: 'Un couple vient pour un projet commun. Madame parle beaucoup et veut « que ce soit joli » ; Monsieur reste en retrait et regarde les prix.', disc: 'Ce qui compte pour chacun des deux, qui décide, et le budget qu’ils se sont fixé.' }, title: 'Le client accompagné', line: 'Un couple, des associés, une famille : plusieurs décideurs.', trap: 'Ne parler qu’à un seul.', key: 'Et pour vous, qu’est-ce qui compte ?', face: 'visages/mme-leroy.webp',
          reflex: { who: 'Madame', context: 'Un couple entre ensemble pour un projet commun. Elle parle tout de suite ; lui reste un pas en retrait, les bras croisés, et regarde les étiquettes de prix.', says: 'Alors nous, enfin moi surtout, je veux que ce soit joli. On va vivre avec tous les jours, je ne veux pas d’un truc triste.', order: ['b', 'a', 'c'], best: 'a',
            choices: {
              a: { text: 'C’est noté. Et pour vous, Monsieur, qu’est-ce qui compte ?' },
              b: { text: 'Très bien, je vous montre tout de suite nos plus beaux modèles, Madame.', tone: 'ko', note: 'Vous ne parlez qu’à elle et vous passez au produit : lui, qui décide aussi, reste dehors.' },
              c: { text: 'Et côté budget, vous avez prévu combien ?', tone: 'mid', note: 'Vous restez avec elle, et sur une question fermée : celui qui se tait ne dira rien.' }
            },
            why: 'Vous donnez la parole à celui qui se tait : c’est souvent lui qui pose les conditions.' } },
        { id: 'presse', deep: { trapWhy: 'Trop de questions l’agacent ; aucune, et vous ne trouvez pas ce qu’il lui faut.', need: 'Aller droit au but, sans perdre de temps, avec la bonne solution du premier coup.', more: ['Pour quand vous le faut-il ?', 'Qu’est-ce qui ne doit surtout pas manquer ?'] }, fx: { sit: 'Un client entre à midi, ses clés de voiture à la main : « J’ai cinq minutes, il me faut quelque chose rapidement. »', disc: 'Le besoin le plus important pour lui, et pour quand il lui faut une solution.' }, title: 'Le client pressé', line: 'Il vous donne cinq minutes.', trap: 'L’interrogatoire, ou le silence.', key: 'En deux mots, qu’est-ce qui est le plus important ?', face: 'visages/m-vidal.webp',
          reflex: { who: 'Le client', context: 'Midi et demi. Un client entre d’un pas rapide, les clés de voiture encore à la main ; il est garé juste devant.', says: 'Bonjour, je suis entre deux rendez-vous, alors j’ai cinq minutes, pas plus. Il me faut quelque chose rapidement.', order: ['b', 'c', 'a'], best: 'b',
            choices: {
              a: { text: 'D’accord, je vous laisse regarder, et je reviens vers vous dans un moment.', tone: 'mid', note: 'Vous respectez son temps, mais vous ne découvrez rien : il repartira sans avoir trouvé.' },
              b: { text: 'Entendu. En deux mots, qu’est-ce qui est le plus important ?' },
              c: { text: 'Pas de souci. Taille, budget, couleur, délai : on fait vite ?', tone: 'ko', note: 'Quatre questions fermées d’affilée : un interrogatoire. Il répond vite, sans dire l’essentiel.' }
            },
            why: 'Une seule question ouverte, qui va droit à l’essentiel : en cinq minutes, c’est elle qui compte.' } },
        { id: 'renouvellement', deep: { trapWhy: 'Reconduire à l’identique, c’est ignorer ce qui a changé : le contrat ne lui conviendra plus.', need: 'Garder ce qui marche, corriger ce qui l’a gêné, sans y passer des heures.', more: ['Qu’est-ce qui vous a le plus servi, ces trois ans ?', 'Qu’est-ce qui vous a gêné, et que vous voudriez changer ?'] }, fx: { sit: 'Un client fidèle, sous contrat depuis trois ans, vient me voir : « Mon contrat se termine, on repart sur la même chose ? »', disc: 'Ce qui a changé pour lui depuis trois ans, ce qui lui a plu et ce qui l’a gêné.' }, title: 'Le renouvellement', line: 'Un client qui doit remplacer un équipement ou renouveler un contrat.', trap: 'Reconduire à l’identique.', key: 'Qu’est-ce qui a changé depuis la dernière fois ?', face: 'visages/m-leroy.webp',
          reflex: { who: 'Le client', context: 'Un client que vous connaissez passe vous voir : il a signé chez vous il y a trois ans, et son contrat arrive à échéance.', says: 'Bonjour ! Mon contrat se termine le mois prochain, j’ai reçu le courrier. Franchement, je n’ai pas trop le temps de m’en occuper : on repart sur la même chose ?', order: ['b', 'a', 'c'], best: 'b',
            choices: {
              a: { text: 'Bien sûr, je vous renouvelle tout à l’identique, c’est plus simple.', tone: 'ko', note: 'Vous reconduisez sans rien demander : si ses besoins ont changé, le contrat ne lui conviendra plus.' },
              b: { text: 'Avant de renouveler : qu’est-ce qui a changé pour vous depuis trois ans ?' },
              c: { text: 'Vous êtes satisfait du contrat actuel ?', tone: 'mid', note: 'Une question fermée : il dira « oui », et vous ne saurez pas ce qui a changé.' }
            },
            why: 'Trois ans ont passé : vous faites dire ce qui a changé, avant de reconduire quoi que ce soit.' } },
        { id: 'retour', deep: { trapWhy: 'Se justifier ou promettre trop vite : le client entend une excuse, pas une écoute.', need: 'Être entendu sur ce qui s’est mal passé, et avoir des garanties concrètes pour cette fois.', more: ['Qu’est-ce qui vous rassurerait, cette fois-ci ?', 'Qu’est-ce qui avait le plus compté pour vous, la dernière fois ?'] }, fx: { sit: 'Une cliente revient pour un nouvel achat. La dernière fois, sa livraison a eu trois semaines de retard et personne ne l’a rappelée.', disc: 'Ce qui l’a le plus gênée la dernière fois, et ce qu’il faudrait pour qu’elle soit rassurée.' }, title: 'Le client qui revient après un problème', line: 'Une mauvaise expérience la dernière fois, et une nouvelle chance.', trap: 'Se justifier.', key: 'Qu’est-ce qui s’était mal passé, de votre point de vue ?', face: 'visages/mme-benali.webp',
          reflex: { who: 'La cliente', context: 'Une cliente revient vous voir pour un nouvel achat. La dernière fois, tout ne s’est pas bien passé : elle s’assoit, son sac sur les genoux, un peu sur la défensive.', says: 'Je vous préviens tout de suite : la dernière fois, la livraison avait trois semaines de retard, et personne ne m’avait rappelée. J’ai hésité à revenir, vous savez. J’espère que ça ne se reproduira pas.', order: ['b', 'a', 'c'], best: 'c',
            choices: {
              a: { text: 'C’était la faute du transporteur, vous savez : chez nous, ça n’arrive jamais.', tone: 'ko', note: 'Vous vous justifiez : elle entend une excuse, pas une écoute.' },
              b: { text: 'Je comprends. Ça ne se reproduira pas, je vous le promets.', tone: 'mid', note: 'La promesse rassure un instant, mais vous ne savez pas ce qui l’a gênée le plus.' },
              c: { text: 'Je comprends. Qu’est-ce qui s’était mal passé, de votre point de vue ?' }
            },
            why: 'Vous la laissez dire ce qui l’a gênée, avec ses mots : c’est la première étape pour regagner sa confiance.' } }
      ],

      /* La fiche d'une situation, en quatre pages. Chaque champ « question »
       * est jugé sur sa forme (expect : les types acceptés). L'aide se retire :
       * fiche 1, un exemple (fiche, électroménager) ; fiche 2, un indice ;
       * fiche 3, rien. */
      pages: [
        { id: 'sit', tab: 'La situation', ask: 'Quand avez-vous vécu cette situation ?',
          intro: ['Pensez à une fois où vous avez vécu « {situation} » dans votre métier.'],
          fields: [
            { id: 'sit', kind: 'text', label: 'Le cas que vous avez vécu', sub: 'Qui était le client, où vous étiez, et ce qu’il vous a dit en arrivant. Deux ou trois lignes.', placeholder: 'Racontez…', min: 60, example: 'Un client arrive avec la référence d’un lave-linge vu sur Internet : le modèle X, 9 kg.', hint: 'Qui, où, et ce que le client a dit en arrivant.' },
            { id: 'disc', kind: 'text', label: 'Ce que Lucas doit découvrir', sub: 'Les deux ou trois informations à obtenir du client avant de lui proposer quoi que ce soit.', placeholder: 'Listez…', min: 30, example: 'Pourquoi ce modèle, l’usage réel, les contraintes d’installation.', hint: 'Ce qu’il faut savoir avant de proposer.' }
          ] },
        { id: 'open', tab: 'Ouvrir et creuser', ask: 'Quelles questions posez-vous pour faire parler le client ?',
          intro: ['<s>', 'Lucas va vivre cette situation. Il ne sait pas encore ce que veut le client : il doit le faire parler.', 'Écrivez pour lui 4 questions, mot pour mot, comme il les dira au client.', '2 pour lancer la conversation, 2 pour aller plus loin.', 'Toutes doivent être ouvertes. Sous chaque question, vous voyez aussitôt de quel type elle est.'],
          groups: [
            { title: 'Pour lancer la conversation', sub: 'Des questions larges, qui font raconter.', ids: ['o1', 'o2'] },
            { title: 'Pour aller plus loin', sub: 'Elles font parler d’un problème, d’une gêne, de ce que ça coûte.', ids: ['c1', 'c2'] }
          ],
          fields: [
            { id: 'o1', kind: 'q', expect: ['ouverte'], label: 'Question d’ouverture 1', sub: 'Large, adaptée à la situation : elle fait raconter.', example: 'Qu’est-ce qui vous a fait choisir ce modèle ?', hint: 'Une question qui fait raconter.' },
            { id: 'o2', kind: 'q', expect: ['ouverte'], label: 'Question d’ouverture 2', sub: 'Une autre façon d’ouvrir.', example: 'Comment l’utiliserez-vous, au quotidien ?', hint: 'Sur l’usage, le quotidien.' },
            { id: 'c1', kind: 'q', expect: ['ouverte'], label: 'Question pour creuser 1', sub: 'Elle fait parler d’un problème, d’un enjeu, de ce que ça coûte.', example: 'Qu’est-ce qui ne vous convenait plus, avec l’ancien ?', hint: 'Sur un problème ou une gêne.' },
            { id: 'c2', kind: 'q', expect: ['ouverte'], label: 'Question pour creuser 2', sub: 'Elle va plus loin sur ce qui a été dit.', example: 'Que se passerait-il s’il tombait en panne pendant une semaine ?', hint: 'Sur ce que le problème coûte.' }
          ] },
        { id: 'precise', tab: 'Préciser et classer', ask: 'Comment précisez-vous, puis faites-vous classer ?',
          intro: ['<s>', 'La conversation est lancée : le client a commencé à raconter.', 'Lucas doit maintenant vérifier des détails, puis savoir ce qui compte le plus pour le client.', 'Écrivez 2 questions courtes qui vérifient un détail : une réponse par oui ou non, ou un choix entre deux options.', 'Puis écrivez 1 question qui fait dire au client ce qui compte le plus pour lui.'],
          groups: [
            { title: 'Pour vérifier un détail', sub: 'Une réponse par oui ou non, ou un choix entre deux options.', ids: ['p1', 'p2'] },
            { title: 'Pour faire choisir', sub: 'Le client dit ce qui compte le plus pour lui.', ids: ['h'] }
          ],
          fields: [
            { id: 'p1', kind: 'q', expect: ['fermee', 'alternative'], label: 'Question de précision 1', sub: 'Fermée ou alternative : elle précise un détail.', example: 'L’emplacement fait-il 60 cm de large ?', hint: 'Une mesure, un délai, une contrainte.' },
            { id: 'p2', kind: 'q', expect: ['fermee', 'alternative'], label: 'Question de précision 2', sub: 'Une autre précision.', example: 'Livraison seule, ou avec installation ?', hint: 'Un choix entre deux options.' },
            { id: 'h', kind: 'q', expect: ['ouverte', 'alternative'], prio: true, label: 'Votre question pour hiérarchiser', sub: 'Elle aide le client à classer ses priorités.', example: 'Entre la capacité et le niveau sonore, qu’est-ce qui compte le plus pour vous ?', hint: 'Faites choisir entre deux critères.' }
          ] },
        { id: 'traps', tab: 'Indices et piège', ask: 'Que faut-il guetter, et que faut-il éviter ?',
          intro: ['Pensez à vos clients dans « {situation} » : ce qu’ils disent sans le vouloir, et ce qu’il ne faut surtout pas leur dire.'],
          fields: [
            { id: 'ind', kind: 'text', label: 'Les mots indices de motivation', sub: 'Les mots qui trahissent la motivation dominante, dans votre secteur.', min: 20, example: '« avis », « le meilleur » (orgueil, sécurité) ; « consommation » (argent, environnement).', hint: 'Les mots qu’ils emploient, et la motivation derrière.' },
            { id: 'piege', kind: 'q', expect: ['orientee', 'produit'], trap: true, label: 'Le piège à éviter', sub: 'La question orientée, ou la vente déguisée, typique de cette situation.', example: 'Vous savez qu’on a mieux pour le même prix ?', hint: 'La phrase qui pousse un produit trop tôt.' }
          ] }
      ],

      // Les cinq règles d'or : jugées sur les thèmes qu'elles couvrent ensemble.
      themes: [
        { id: 'entonnoir', text: 'l’entonnoir (du large au précis)', words: ['large', 'precis', 'entonnoir', 'commenc', 'ouvert', 'general', 'puis', 'ensuite', 'finir', 'fin '] },
        { id: 'relance', text: 'les relances (faire préciser, creuser)', words: ['relanc', 'c est a dire', 'echo', 'creus', 'approfond', 'reformul', 'preciser', 'rebond', 'reprendre ses mots', 'ses mots'] },
        { id: 'implicite', text: 'les besoins non dits (vérifier ses hypothèses)', words: ['hypothes', 'implicite', 'verifi', 'cache', 'non dit', 'suppos', 'devin', 'derriere', 'vrai besoin', 'pourquoi'] },
        { id: 'motivation', text: 'les motivations (guetter les mots indices)', words: ['motivation', 'mots', 'indice', 'ce qui compte', 'ce qui le pousse', 'pourquoi', 'raison', 'envie', 'peur', 'securite'] },
        { id: 'priorite', text: 'les priorités (les faire classer par le client)', words: ['classer', 'priorit', 'hierarch', 'choisir', 'premier', 'plus important', 'ordre', 'decider pour lui'] },
        { id: 'ecoute', text: 'l’écoute (une question à la fois, laisser parler)', words: ['ecout', 'une question a la fois', 'laisser parler', 'silence', 'interromp', 'couper', 'reponse', 'attendre'] }
      ],
      rulesExample: ['Je commence large, je finis précis.', 'Une question à la fois, et j’écoute la réponse.', 'Quand c’est vague, je relance : « C’est-à-dire ? »', 'Une hypothèse sur le besoin, je la vérifie.', 'Je fais classer les priorités au client, je ne les décide pas pour lui.'],

      // L'exemple de la fiche (magasin d'électroménager, deux situations), pour le corrigé.
      model: [
        { title: 'Le client qui sait ce qu’il veut', text: 'Situation : « Je veux le lave-linge X, 9 kg, référence vue sur Internet. » · À découvrir : pourquoi ce modèle, l’usage réel, les contraintes d’installation. · Ouverture : « Qu’est-ce qui vous a fait choisir ce modèle ? » « Comment l’utiliserez-vous au quotidien ? » · Creuser : « Qu’est-ce qui ne vous convenait plus avec l’ancien ? » · Précision : « L’emplacement fait 60 cm de large ? » « Livraison seule ou avec installation ? » · Indices : « avis », « le meilleur » (orgueil, sécurité), « consommation » (argent, environnement). · Hiérarchiser : « Entre la capacité et le niveau sonore, qu’est-ce qui compte le plus pour vous ? » · Piège : « Vous savez qu’on a mieux pour le même prix ? » avant d’avoir compris.' },
        { title: 'Le client accompagné', text: 'Situation : un couple choisit un réfrigérateur ; l’un regarde le prix, l’autre les finitions. · À découvrir : les attentes de chacun, qui décide. · Ouverture : « Parlez-moi de votre cuisine et de la façon dont vous l’utilisez. » · Creuser : « Et pour vous, Madame / Monsieur, qu’est-ce qui serait le plus gênant avec un mauvais choix ? » · Précision : « Pose libre ou encastrable ? » · Indices : « joli », « assorti » (orgueil, confort) ; « durer » (sécurité) ; « pas plus de » (argent). · Hiérarchiser : « Si vous deviez garder un seul critère chacun, lequel ? » · Piège : s’adresser à un seul des deux.' }
      ],

      selfCheck: [
        { text: 'Chaque fiche part d’un cas réel de mon entreprise ou de mon secteur.' },
        { text: 'Mes questions d’ouverture sont réellement ouvertes et adaptées à la situation.' },
        { text: 'Mes questions pour creuser font exprimer un problème ou un coût.' },
        { text: 'Mes questions fermées et alternatives sont réservées aux précisions.' },
        { text: 'Aucune question n’est orientée ; aucune ne parle d’un produit (sauf le piège à éviter).' },
        { text: 'Ma question de hiérarchisation aide vraiment le client à choisir.' },
        { text: 'Un nouvel arrivant peut utiliser ma banque sans explication.' },
        { text: 'Mes 5 règles d’or couvrent l’entonnoir, les relances, les besoins non dits et les motivations.' },
        { text: 'Ancrage terrain : ma banque parle de mes clients et de mes produits ; elle ne pourrait pas être copiée telle quelle ailleurs.' }
      ],

      // Les pages de transition (avant chaque étape), comme en 6.2.
      transitions: [
        { done: 'Vous savez ce que Nadia attend de vous.', why: 'Voici votre chemin : six étapes, des situations de votre métier jusqu’à la banque que vous remettrez à Lucas.', todo: 'Choisissez les 2 situations de découverte que vous rencontrez le plus souvent.' },
        { done: 'Vous avez choisi vos 2 situations.', why: 'Lucas arrive lundi, et il vous accompagne pour sa première semaine. Avant de lui écrire des fiches, montrez-lui l’exemple : dans chacune de vos 2 situations, un client vous parle, et Lucas regarde comment vous démarrez la découverte. Ce qu’il verra, il le refera.', todo: 'Pour chaque situation, lisez la scène, puis choisissez la réponse que vous donneriez au client devant Lucas. Après chaque choix, on vous dit pourquoi c’est le bon réflexe, ou pas.' },
        { done: 'Vous avez trouvé le bon réflexe pour chaque situation.', why: 'Maintenant, c’est votre métier qui parle : Lucas a besoin de questions prêtes à l’emploi, avec vos clients et vos produits.', todo: 'Remplissez une fiche par situation. Chaque question est vérifiée au fur et à mesure.' },
        { done: 'Vos deux fiches sont prêtes.', why: 'Lucas ne retiendra pas tout. Ce qu’il gardera en tête, ce sont quelques règles simples.', todo: 'Écrivez vos 5 règles d’or du questionnement.' },
        { done: 'Votre banque est complète.', why: 'Une question ne vaut que si elle marche au comptoir. Le mieux est d’en tester une cette semaine.', todo: 'Choisissez la question que vous testerez, et quand. Cette étape est facultative.' },
        { done: 'Vous avez prévu votre test terrain.', why: 'Avant de remettre la banque à Lucas, relisez-la avec les critères de votre tuteur.', todo: 'Répondez Oui ou Non à chaque critère de la grille.' }
      ],

      keyPoint: 'À retenir : une bonne banque de questions part des situations réelles de votre métier, ouvre large, creuse les problèmes, garde les questions fermées pour les précisions, fait classer les priorités, et nomme le piège à éviter.'
    }
  };

  /* LE JUGE DE LA FORME D'UNE QUESTION (6.3), valable dans tous les métiers :
   * ouverte, fermée, alternative, orientée, produit (vente déguisée), ou pas
   * une question. Banque de tests : tests/banque.test.cjs. */
  (function () {
    const plain = text => ` ${String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ?]+/g, ' ').replace(/\?/g, ' ? ').replace(/\s+/g, ' ').trim()} `;
    const ORIENTED = [' n est ce pas', ' non ? ', ' pas vrai', ' surement', ' j imagine', ' je suppose', ' vous ne pensez pas', ' vous ne trouvez pas', ' vous ne voulez pas', ' vous etes d accord', ' d accord ? ', ' on est d accord', ' forcement', ' il vous faut donc', ' vous voulez donc', ' c est bien ca', ' au fond', ' quand meme ', ' tout compte ', ' j image'];
    const PRODUCT = [' je vous propose', ' je vous conseille', ' je vous recommande', ' on a ', ' nous avons', ' notre offre', ' notre formule', ' notre gamme', ' notre modele', ' notre produit', ' notre nouveau', ' notre nouvelle', ' notre meilleur', ' notre service', ' nos plus ', ' nos produits', ' nos offres', ' nos modeles', ' nos formules', ' nos services', ' promotion', ' promo ', ' on a mieux', ' je vous montre', ' j ai ce qu il vous faut', ' offre ', ' formule '];
    const OPEN = ['qu', 'que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'pourquoi', 'racontez', 'raconte', 'parlez', 'decrivez', 'expliquez', 'dites', 'quoi', 'qui', 'lequel', 'laquelle', 'lesquels'];
    const CLOSED_START = ['est ce que', 'est ce qu', 'vous ', 'avez', 'etes', 'y a t il', 'c est', 'il y a', 'combien', 'quand', 'ou ', 'a quelle date', 'pouvez', 'souhaitez', 'voulez', 'preferez', 'aimez', 'connaissez', 'utilisez'];
    const PRIO = [' premier', ' priorit', ' plus important', ' compte le plus', ' compte plus', ' classer', ' ordre', ' avant tout', ' d abord', ' passe avant', ' essentiel', ' primordial', ' le plus ', ' garder un seul', ' une seule', ' choisir'];
    const words = t => t.trim().split(' ').filter(w => w && w !== '?');
    function classify(text) {
      const t = plain(text);
      const w = words(t);
      if (w.length < 3) return 'vide';
      if (ORIENTED.some(m => t.includes(m))) return 'orientee';
      if (PRODUCT.some(m => t.includes(m))) return 'produit';
      // Les premiers mots, sans « est-ce que » (qui introduit une question fermée).
      const head = ` ${t.trim().replace(/^(est ce qu e? ?|est ce que )/, '').split(' ').slice(0, 9).join(' ')} `;
      const startsClosed = CLOSED_START.some(s => t.trim().startsWith(s.trim()));
      const open = OPEN.some(o => head.includes(` ${o} `)) && !t.trim().startsWith('est ce');
      const imperative = /^ ?(racontez|parlez|decrivez|expliquez|dites)/.test(t);
      const alt = / ou (?!pas)/.test(t.slice(4)) && t.includes('?');
      // « Entre A et B, … ? » : une alternative, même sans « ou ».
      if ((alt && (!open || /plutot|ou bien/.test(t) || / entre /.test(t))) || (t.trim().startsWith('entre ') && t.includes('?'))) return 'alternative';
      if (open || imperative) return 'ouverte';
      if (!t.includes('?')) return startsClosed ? 'fermee' : 'pas-question';
      return 'fermee';
    }
    const prioritizes = text => PRIO.some(m => plain(text).includes(m));
    root.ATELIER_QTYPE = Object.freeze({ classify, prioritizes, plain });
  })();
})(globalThis);
