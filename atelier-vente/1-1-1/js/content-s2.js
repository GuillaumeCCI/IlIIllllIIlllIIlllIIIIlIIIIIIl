/* SÉRIE 2 · ÉCOUTE ACTIVE · contenus éditables.
 *
 * Corrigés modèles repris de la fiche d'activité « Choisir la bonne attitude
 * d'écoute » (M1.1.1, activité 2). Les fiches tutoient l'apprenant ;
 * l'interface le vouvoie, les textes ont donc été transposés sans en changer
 * le fond. Les verbatims clients restent ceux des maquettes.
 *
 * Nuance à garder en tête, reprise de la fiche : la compréhension (reformuler)
 * reste l'attitude à privilégier en prise de contact, mais la bonne attitude
 * se module selon la situation · une pointe de soutien face à un client
 * anxieux, une investigation légère face à un client silencieux. Restent à
 * éviter : le jugement, l'interprétation et la solution prématurée.
 */
window.ATELIER_S2 = {
  // Les 6 attitudes de Porter, réutilisées par les écrans B, D et par la S4.
  attitudes: [
    'Jugement / évaluation',
    'Interprétation',
    'Soutien / consolation',
    'Investigation / enquête',
    'Solution / décision',
    'Compréhension / reformulation'
  ],

  /* Grille commune « Ma réponse d'écoute est-elle juste ? », reprise de la fiche. */
  rubric: [
    ['Écoute réelle', 'Je pars de ce que le client a exprimé, pas de ce que je veux vendre.'],
    ['Reformulation fidèle', 'Je reformule sans ajouter, déformer ni interpréter ses propos.'],
    ['Absence de jugement', 'Je n’approuve ni ne désapprouve le client ; je ne me défends pas.'],
    ['Pas de solution prématurée', 'Je ne saute pas au conseil ou à la solution avant d’avoir compris.'],
    ['Attitude adaptée au moment', 'L’attitude choisie correspond à la situation et au périmètre : la prise de contact.'],
    ['Relation qui reste ouverte', 'Ma réponse invite le client à poursuivre plutôt qu’elle ne referme l’échange.']
  ],

  /* ── Écran A · Choisir la réponse la plus juste ───────────────────────── */
  A: {
    eyebrow: 'Mise en pratique',
    title: 'Choisir la réponse la plus juste',
    intro: 'Pour chaque client, choisissez la meilleure prise de contact puis justifiez votre choix en une phrase.',
    tag: 'Prise de contact',
    hint: 'Cherchez la réponse qui respecte le rythme, le besoin et le niveau d’ouverture du client.',
    criterion: 'Critère spécifique : la qualité de la justification. Votre choix s’appuie sur les critères de la grille, et vous expliquez pourquoi les autres options ferment ou dévient la relation.',
    clients: [
      {
        label: 'Client pressé',
        quote: 'Je passe juste jeter un œil en coup de vent, je n’ai vraiment pas beaucoup de temps.',
        options: [
          { id: 'a', text: 'Vous avez tort, prenez le temps de regarder, c’est important.' },
          { id: 'b', text: 'Très bien, je vais vous montrer rapidement notre meilleure offre.' },
          { id: 'c', text: 'Aucun souci, je vous laisse regarder à votre rythme ; je reste dans les parages si vous avez besoin.' },
          { id: 'd', text: 'Pourquoi n’avez-vous pas le temps aujourd’hui ?' }
        ],
        answer: 'c',
        model: 'Vous pouviez écrire : « La réponse c montre que je comprends qu’il est pressé et respecte son rythme : la relation reste ouverte. La a le juge, la b lui propose une offre trop tôt, et la d lui pose une question trop personnelle pour un premier contact. »'
      },
      {
        label: 'Client méfiant',
        quote: 'Franchement, vos solutions miracles, je n’y crois pas trop. Ça ne se passe jamais comme prévu.',
        options: [
          { id: 'a', text: 'Ne vous inquiétez pas, avec nous ça se passera bien.' },
          { id: 'b', text: 'Cette mauvaise expérience vous rend prudent, je comprends.' },
          { id: 'c', text: 'C’est que vous êtes mal tombé, les autres ne font pas leur travail.' },
          { id: 'd', text: 'Qu’est-ce qui s’est passé exactement ?' }
        ],
        answer: 'b',
        model: 'Vous pouviez écrire : « La réponse b montre de la compréhension : elle nomme sa méfiance sans la minimiser ni la juger, ce qui installe la confiance. La a minimise ce qu’il ressent, la c juge les autres et interprète. La d n’est pas fausse, mais elle arrive trop tôt : on creusera plus tard. »'
      },
      {
        label: 'Client novice',
        quote: 'Je ne connais rien à tout ça, j’ai un peu peur de me tromper.',
        options: [
          { id: 'a', text: 'C’est normal de se sentir perdu au début ; on va avancer ensemble, à votre rythme.' },
          { id: 'b', text: 'Ne vous inquiétez pas, c’est très simple.' },
          { id: 'c', text: 'Vous devriez vous renseigner avant de venir.' },
          { id: 'd', text: 'Je vais vous expliquer tout de suite comment ça marche.' }
        ],
        answer: 'a',
        model: 'Vous pouviez écrire : « La réponse a montre de la compréhension : elle reconnaît sa peur et le rassure sans la minimiser, à son rythme. La b minimise avec “c’est très simple” et peut le braquer, la c le juge, et la d lui explique tout avant de l’avoir écouté. »'
      }
    ]
  },

  /* ── Écran B · Reformuler sans dévier ─────────────────────────────────── */
  B: {
    eyebrow: 'Atelier d’écoute active',
    title: 'Reformuler sans dévier',
    mission: '« Votre solution me paraît un peu chère. »',
    intro: 'Les 4 réponses ci-dessous ressemblent à des reformulations, mais dévient vers une autre attitude. Pour chacune, identifiez l’attitude puis proposez une véritable réponse de compréhension.',
    criterion: 'Critère spécifique : la détection du glissement. Vous avez nommé la bonne attitude vers laquelle chaque réponse dévie, et votre réécriture reformule sans rien ajouter.',
    cases: [
      {
        text: 'Si je comprends bien, en fait vous n’avez pas le budget.',
        answer: 'Interprétation',
        why: 'Elle ajoute « pas le budget », que le client n’a pas dit.',
        rewrite: 'Vous pouviez écrire : « Si je comprends bien, le prix est un point important pour vous. »'
      },
      {
        text: 'Je comprends, mais vous savez, la qualité a un prix.',
        answer: 'Jugement / évaluation',
        why: 'Le « mais » annule l’écoute et défend l’offre.',
        rewrite: 'Vous pouviez écrire : « Le tarif vous interpelle, c’est cela ? »'
      },
      {
        text: 'Je vois ce que vous voulez dire ; vous devriez regarder notre offre d’entrée de gamme.',
        answer: 'Solution / décision',
        why: 'Elle propose une offre avant d’avoir compris.',
        rewrite: 'Vous pouviez écrire : « Vous vous interrogez sur le rapport prix / valeur, si je comprends bien. »'
      },
      {
        text: 'Je comprends, ne vous en faites pas, tout le monde dit ça au début.',
        answer: 'Soutien / consolation',
        why: '« Tout le monde dit ça » minimise le ressenti.',
        rewrite: 'Vous pouviez écrire : « J’entends que le prix vous fait hésiter. »'
      }
    ],
    feedback: 'Une reformulation de compréhension reprend ce que le client a dit et lui demande confirmation, sans ajouter d’interprétation, de jugement, de solution ni de réconfort.'
  },

  /* ── Écran D · Explorer les 6 attitudes de Porter ─────────────────────── */
  D: {
    eyebrow: 'Atelier d’écoute active',
    title: 'Explorer les 6 attitudes de Porter',
    mission: '« Je préfère prendre mon temps avant de me décider. »',
    intro: 'Rédigez une réponse pour chacune des 6 attitudes de Porter. Choisissez ensuite celle qui vous semble la plus appropriée lors d’une prise de contact et justifiez votre choix.',
    criterion: 'Critère spécifique : la distinction des 6 attitudes. Vos 6 réponses illustrent bien 6 attitudes distinctes, et votre argumentation s’appuie sur la grille.',
    // Réponses modèles, dans l'ordre des attitudes ci-dessus.
    examples: [
      'Vous avez raison d’attendre. / Vous avez tort d’hésiter.',
      'En fait, vous n’êtes pas convaincu.',
      'Ne vous inquiétez pas, rien ne presse.',
      'Qu’est-ce qui vous ferait avancer plus vite ?',
      'Prenez la formule sans engagement, vous déciderez après.',
      'Vous préférez avancer à votre rythme, je comprends.'
    ],
    recommended: 'Compréhension / reformulation',
    feedback: 'Le meilleur choix en prise de contact est la compréhension : elle respecte le besoin exprimé, garde la relation ouverte et ne pousse pas. Le soutien (« rien ne presse ») est acceptable mais plus pauvre ; l’investigation pourra venir ensuite, une fois la confiance installée.'
  },

  /* ── Écran F · Adapter son écoute au profil ───────────────────────────── */
  F: {
    eyebrow: 'Mise en situation',
    title: 'Adapter son écoute au profil',
    intro: 'Pour chaque profil, formulez une réponse d’écoute puis expliquez comment vous adaptez votre posture.',
    tag: 'Écoute active',
    hint: 'Observez le rythme, le ton et le niveau d’ouverture avant de répondre.',
    criterion: 'Critère spécifique : l’adaptation au profil. Votre réponse reste de l’écoute, sans jugement ni défense, ET elle est ajustée au profil par son ton, sa longueur et son ouverture.',
    profiles: [
      {
        label: 'Méfiant / agressif',
        quote: 'Franchement, vos solutions miracles, je n’y crois pas trop. Ça ne se passe jamais comme prévu.',
        model: 'Vous avez des doutes sérieux, je le comprends. Dites-moi ce qui vous rendrait plus confiant.',
        adaptation: 'Ne pas répondre à l’agressivité par la défense : nommer le doute calmement et le transformer en information.'
      },
      {
        label: 'Bavard',
        quote: 'Alors, je vous explique, on a déjà essayé trois prestataires, et à chaque fois c’est la même histoire, je vous raconte…',
        model: 'Si je résume, il y a beaucoup à gérer de votre côté. Pour être utile, sur quoi voulez-vous qu’on commence ?',
        adaptation: 'Une reformulation-synthèse qui recentre avec respect, sans couper la parole.'
      },
      {
        label: 'Silencieux',
        quote: '… (le client écoute, hoche la tête, mais ne répond pas)',
        model: 'Vous restez prudent, c’est normal ; qu’est-ce qui compte le plus pour vous là-dessus ?',
        adaptation: 'Compréhension, plus une question ouverte légère, une investigation douce, pour l’inviter à s’exprimer sans le presser.'
      }
    ]
  }
};
