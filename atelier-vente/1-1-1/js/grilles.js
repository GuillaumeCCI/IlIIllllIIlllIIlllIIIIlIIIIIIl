/* GRILLES D'ANALYSE · réponses ouvertes du module 1-1-1.
 *
 * Lues par moteur/js/indicateur.js, qui affiche un indicateur de points en
 * tête du corrigé. Une grille par exercice (clé du catalogue) ; chaque bloc
 * lit un ou plusieurs champs (`champs`, ou `motif` : « line » → line1,
 * line2…) et compte ses critères, ses phrases complètes, ses règles et ses
 * pièges. Le détail de l'écriture des expressions est en tête d'indicateur.js.
 *
 * Les familles de mots communes sont en tête : les enrichir profite à tous
 * les exercices qui les emploient.
 */
(() => {
  'use strict';

  /* ── Familles communes ──────────────────────────────────────────────── */

  const ACCUEIL = ['bonjour', 'bonsoir', 'merci de me recevoir', 'merci de m’accueillir', 'merci pour votre accueil', 'merci de votre accueil',
    'merci de votre temps', 'merci pour votre temps', 'merci d’avoir pris le temps', 'merci de prendre le temps', 'merci de m’accorder',
    'je vous remercie', 'merci beaucoup', 'merci d’être venu', 'merci d’être là', 'merci de votre venue', 'ravi de vous rencontrer',
    'ravie de vous rencontrer', 'ravi de vous voir', 'ravie de vous voir', 'ravi de faire votre connaissance', 'enchanté', 'enchantée',
    'bienvenue', 'soyez le bienvenu', 'soyez la bienvenue', 'content de vous voir', 'contente de vous voir', 'heureux de vous rencontrer',
    'heureuse de vous rencontrer', 'c’est un plaisir', 'avec plaisir', 'installez-vous', 'asseyez-vous', 'prenez place', 'je vous en prie',
    'vous avez trouvé facilement', 'vous allez bien'];

  const PRESENTATION = ['je suis', 'je m’appelle', 'mon nom est', 'je me présente', 'permettez-moi de me présenter', 'conseiller', 'conseillère',
    'commercial', 'commerciale', 'chargé de clientèle', 'chargée de clientèle', 'chargé d’affaires', 'chargée d’affaires', 'responsable',
    'consultant', 'consultante', 'représentant', 'représentante', 'vendeur', 'vendeuse', 'ingénieur commercial', 'technico-commercial',
    'à l’appareil', 'je travaille chez', 'je travaille pour', 'je représente', 'de la société', 'de l’entreprise', 'de l’agence', 'mon rôle', 'ma fonction',
    'je m’occupe', 'je suis en charge', 'votre interlocuteur', 'votre interlocutrice', 'votre contact', '[prénom', 'prénom nom', '[entreprise'];

  const CADRAGE = ['je vous propose', 'je propose', 'nous proposons', 'minutes', 'minute', 'min', 'une demi-heure', 'demi-heure', 'un quart d’heure',
    'une heure', 'une vingtaine', 'une trentaine', 'une quinzaine', 'durée', 'le temps de', 'nous avons prévu', 'on a prévu', 'prévu ensemble',
    'd’abord', 'ensuite', 'puis', 'enfin', 'pour commencer', 'dans un premier temps', 'dans un second temps', 'en premier', 'en second',
    'l’objectif', 'objectif', 'le but', 'l’objet', 'ordre du jour', 'déroulé', 'déroulement', 'programme', 'étapes', 'faire le point',
    'faire un point', 'cet échange', 'cet entretien', 'ce rendez-vous', 'notre rendez-vous', 'notre échange', 'notre entretien',
    'ça vous va', 'cela vous va', 'ça vous convient', 'cela vous convient', 'vous convient-il', 'vous convient-elle', 'êtes-vous d’accord',
    'si vous êtes d’accord', 'si cela vous convient', 'si ça vous convient', 'qu’en dites-vous', 'on fait comme ça'];

  const ECOUTE = ['je vous écoute', 'vous écouter', 'commencer par vous écouter', 'écouter', 'parlez-moi', 'racontez-moi', 'me raconter',
    'me parler', 'dites-moi', 'expliquez-moi', 'm’expliquer', 'je vous laisse', 'je vous laisse la parole', 'à vous', 'la parole',
    'votre situation', 'vos besoins', 'votre besoin', 'votre projet', 'vos attentes', 'vos priorités', 'vos enjeux', 'votre activité',
    'vos objectifs', 'vos questions', 'votre contexte', 'vos préoccupations', 'ce qui compte', 'ce qui est important pour vous',
    'ce qui vous amène', 'qu’est-ce qui vous amène', 'qu’est-ce qui', 'comprendre', 'mieux comprendre', 'bien comprendre', 'cerner',
    'connaître', 'découvrir', 'vos difficultés', 'vos contraintes', 'votre quotidien', 'où vous en êtes', 'votre point de vue', 'votre avis'];

  const REFORMULATION = ['si je comprends bien', 'si j’ai bien compris', 'si je vous suis bien', 'si je vous entends bien', 'autrement dit',
    'en d’autres termes', 'vous voulez dire', 'vous me dites', 'vous dites', 'vous trouvez', 'vous avez l’impression', 'vous préférez',
    'vous souhaitez', 'vous voulez', 'vous aimeriez', 'pour vous', 'c’est bien ça', 'c’est bien cela', 'c’est cela', 'c’est ça',
    'ai-je bien compris', 'est-ce bien cela', 'n’est-ce pas', 'je comprends', 'je comprends que', 'j’entends', 'j’entends que', 'je vois',
    'je note', 'si je résume', 'en résumé', 'pour résumer', 'ce que je retiens', 'ce que j’entends', 'vous ressentez', 'vous vous sentez',
    'vous avez besoin', 'est important pour vous', 'compte pour vous', 'vous tient à cœur', 'vous interpelle', 'vous fait hésiter',
    'vous inquiète', 'vous préoccupe', 'vous rend prudent', 'vous rend prudente', 'vous vous interrogez', 'vous vous demandez',
    'vous hésitez', 'vous doutez', 'vous craignez', 'vous attendez'];

  const QUESTION_OUVERTE = ['qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'sur quoi', 'de quoi',
    'par rapport à quoi', 'dans quelle mesure', 'en quoi', 'à quel point', 'à quoi', 'que pensez-vous', 'qu’en pensez-vous',
    'racontez-moi', 'dites-moi', 'parlez-moi', 'expliquez-moi', 'pourriez-vous préciser', 'précisez'];

  const PREUVE = ['garantie', 'garanti', '5 ans', 'cinq ans', 'essai', '30 jours', 'trente jours', 'satisfait ou remboursé', 'remboursé',
    'nos clients', 'clients constatent', 'entreprises équipées', 'références', 'référence', 'témoignage', 'témoignages', 'avis clients',
    'étude', 'étude ergonomique', 'chiffres', 'chiffre', 'résultats', 'baisse', 'réduction des arrêts', 'moins d’arrêts', 'arrêts',
    'absences', 'absentéisme', 'tms', 'troubles musculo', 'prévention', 'prévenir', 'retour sur investissement', 'rentabilité', 'rentable',
    'économies', 'économiser', 'sav', '48 h', '48 heures', '1 200', '1200', 'location', 'louer', 'étaler', 'mensualités', 'diagnostic',
    'démonstration', 'exemple', 'concrètement', 'certifié', 'normes', 'productivité', 'confort', 'santé'];

  const CONTROLE = ['est-ce que cela répond', 'est-ce que ça répond', 'cela répond-il', 'cela répond à', 'ça répond à', 'cela vous rassure',
    'ça vous rassure', 'cela vous parle', 'ça vous parle', 'qu’en pensez-vous', 'qu’en dites-vous', 'est-ce plus clair', 'est-ce que c’est plus clair',
    'cela vous convient', 'ça vous convient', 'est-ce que cela vous convient', 'avez-vous d’autres questions', 'd’autres questions',
    'cela lève', 'est-ce que cela lève', 'êtes-vous rassuré', 'êtes-vous rassurée', 'ai-je répondu', 'est-ce que j’ai répondu',
    'cela vous semble', 'ça vous semble', 'vous semble-t-il', 'est-ce que cet angle', 'cet angle', 'votre préoccupation', 'votre question'];

  const SUITE = ['je vous propose', 'nous pourrions', 'on pourrait', 'prochaine étape', 'la suite', 'rendez-vous', 'on fixe', 'fixons',
    'on planifie', 'planifions', 'organiser', 'organisons', 'diagnostic', 'gratuit', 'démonstration', 'essai', 'visite', 'présentation',
    'rencontre', 'rencontrer', 'cette semaine', 'la semaine prochaine', 'demain', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
    'date', 'créneau', 'agenda', 'calendrier', 'je vous envoie', 'je vous rappelle le', 'on continue', 'on avance', 'avançons'];

  const RAISON = ['parce que', 'car', 'puisque', 'comme', 'ce qui', 'cela', 'ça permet', 'cela permet', 'permet de', 'permet', 'afin de',
    'pour que', 'donc', 'ainsi', 'c’est pourquoi', 'en effet', 'grâce à', 'cela montre', 'ce qui montre', 'cela évite', 'ce qui évite'];

  /* ── Pièges communs ─────────────────────────────────────────────────── */

  const PIEGE_PRODUIT = { nom: 'Le produit arrive trop tôt', points: 1,
    mots: ['notre meilleure offre', 'offre exceptionnelle', 'offres intéressantes', 'en promotion', 'promo', 'remise', 'le moment ou jamais',
      'il faut que je vous montre', 'je vais vous présenter nos', 'je vais vous montrer nos', 'nos produits', 'nos solutions sont',
      'vous allez adorer', 'c’est le meilleur', 'notre formule premium', 'je vais vous vendre'],
    conseil: 'En ouverture, on écoute avant de présenter une offre.' };

  const PIEGE_FAMILIER = { nom: 'Registre familier', points: 1,
    mots: ['ouais', 'bon écoutez', 'alors voilà', 'ben', 'euh', 'genre', 'trop bien', 'super cool', 'salut', 'coucou', 'ok ok', 'bah'],
    conseil: 'Gardez un registre professionnel dès les premiers mots.' };

  const PIEGE_JUGEMENT = { nom: 'Jugement', points: 1,
    mots: ['vous avez tort', 'vous vous trompez', 'c’est faux', 'n’importe quoi', 'je comprends mais', 'oui mais', 'certes mais',
      'la qualité a un prix', 'il ne faut pas', 'vous auriez dû', 'c’est dommage', 'c’est une erreur', 'vous exagérez'],
    conseil: 'On reformule sans approuver ni désapprouver.' };

  const PIEGE_SOLUTION = { nom: 'Solution trop rapide', points: 1,
    mots: ['vous devriez', 'je vous conseille', 'je vous recommande', 'à votre place', 'il vous faut', 'prenez la formule', 'notre offre',
      'entrée de gamme', 'je vais vous montrer', 'je vais vous expliquer', 'la solution c’est', 'je vous fais une remise', 'remise',
      'réduction', 'rabais', 'geste commercial'],
    conseil: 'On comprend d’abord ; la solution viendra ensuite.' };

  const PIEGE_MINIMISE = { nom: 'Le ressenti est minimisé', points: 1,
    mots: ['ne vous inquiétez pas', 'ne vous en faites pas', 'tout le monde dit ça', 'tout le monde', 'c’est rien', 'ce n’est rien',
      'c’est très simple', 'c’est pas grave', 'ce n’est pas grave', 'vous allez voir', 'c’est différent'],
    conseil: 'Nommez le ressenti au lieu de le minimiser.' };

  const PIEGE_INTERPRETATION = { nom: 'Interprétation', points: 1,
    mots: ['en fait vous', 'au fond', 'ce qui vous bloque', 'pas le budget', 'vous n’avez pas le budget', 'c’est que vous', 'en réalité vous',
      'vous voulez surtout', 'je pense que vous'],
    conseil: 'Reprenez ses mots, sans ajouter ce qu’il n’a pas dit.' };

  /* ── Critères réutilisés ────────────────────────────────────────────── */

  const accueil = { nom: 'Accueil et climat', mots: ACCUEIL, conseil: 'Saluez et remerciez avant toute chose.' };
  const presentation = { nom: 'Présentation', mots: PRESENTATION, conseil: 'Dites qui vous êtes, votre fonction et votre entreprise.' };
  const cadrage = { nom: 'Cadrage', mots: CADRAGE, conseil: 'Annoncez l’objet, le déroulé ou la durée de l’échange.' };
  const ecoute = { nom: 'Transition vers l’écoute', mots: ECOUTE, conseil: 'Donnez la parole au client avant de parler de l’offre.' };
  const reformulation = { nom: 'Reformulation', mots: REFORMULATION, conseil: 'Reprenez ce que dit le client : « Si je comprends bien… ».' };
  const raison = { nom: 'Justification', mots: RAISON, conseil: 'Expliquez pourquoi : « parce que… », « ce qui permet… ».' };

  /* Une ouverture complète, réécrite (S1 A, S4 1.2). */
  const ouvertureComplete = {
    criteres: [accueil, presentation, cadrage, ecoute],
    phrases: { attendues: 3, points: 2 },
    regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
    pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER]
  };

  /* Une reformulation de compréhension, sur une réplique donnée. */
  const reformuler = (titre, champ, sujet) => ({
    titre, champs: [champ],
    criteres: [reformulation, { nom: 'Les mots du client repris', mots: sujet, conseil: 'Reprenez le sujet exact de sa phrase.' }],
    phrases: { attendues: 1, points: 1 },
    // Ici, chaque glissement est l'erreur visée : il coûte deux points.
    pieges: [PIEGE_JUGEMENT, PIEGE_SOLUTION, PIEGE_MINIMISE, PIEGE_INTERPRETATION].map(piege => ({ ...piege, points: 2 }))
  });

  /* ── Les grilles ────────────────────────────────────────────────────── */

  window.ATELIER_GRILLES = {

    // S1 A · Analyser l'accroche de Camille, puis la réécrire.
    's1-A': { blocs: [
      { titre: 'Ce qui fonctionne', champs: ['strengths'],
        criteres: [
          { nom: 'La salutation repérée', mots: ['bonjour', 'salutation', 'salue', 'politesse', 'poli', 'polie', 'courtois', 'courtoise'], conseil: 'L’accroche commence bien par une salutation.' },
          { nom: 'La présentation repérée', mots: ['présente', 'présentation', 'identité', 'nom', 'prénom', 'fonction', 'entreprise', 'camille', 'novéa', 'conseillère', 'qui elle est'], conseil: 'Camille dit qui elle est et pour qui elle travaille.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Axes d’amélioration', champs: ['improvements'],
        criteres: [
          { nom: 'Mise à l’aise', mots: ['remerci*', 'merci', 'mise à l’aise', 'mettre à l’aise', 'climat', 'chaleur', 'chaleureu*', 'sourire', 'accueil'], conseil: 'Il manque un remerciement, une mise à l’aise.' },
          { nom: 'Cadrage absent', mots: ['cadrage', 'cadrer', 'durée', 'minutes', 'temps', 'déroulé', 'déroulement', 'objectif', 'ordre du jour', 'structure'], conseil: 'Ni durée ni déroulé ne sont annoncés.' },
          { nom: 'Produit trop tôt', mots: ['produit', 'offre', 'offres', 'présenter', 'je vais vous présenter', 'vend*', 'pousse*', 'solutions', 'trop vite', 'trop tôt', 'directement'], conseil: 'Elle parle de ses offres avant d’écouter.' },
          { nom: 'Pas d’écoute', mots: ['écoute', 'écouter', 'question', 'parole', 'besoin*', 'transition', 'laisser parler', 'découverte'], conseil: 'Le client n’a pas la parole.' },
          { nom: 'Formule vague', mots: ['vague', 'flou', 'floue', 'imprécis', 'imprécise', 'pourrait vous convenir', 'précis', 'concret', 'générique'], conseil: '« Ce qui pourrait vous convenir » reste vague.' }
        ],
        phrases: { attendues: 2, points: 1 } },
      { titre: 'Votre version améliorée', champs: ['rewrite'], ...ouvertureComplete }
    ] },

    // S1 B · Boutique, client pressé : une ouverture courte, non intrusive.
    's1-B': { blocs: [
      { titre: 'Votre entrée en matière', champs: ['opening'],
        criteres: [
          accueil,
          { nom: 'Respect de son rythme', mots: ['à votre rythme', 'je vous laisse', 'prenez votre temps', 'tranquillement', 'sans vous presser',
            'regarder', 'faire un tour', 'librement', 'jeter un œil', 'je reste', 'à côté', 'dans les parages', 'à disposition', 'à votre disposition',
            'au moindre besoin', 'si besoin', 'si vous avez besoin', 'n’hésitez pas', 'rapidement', 'en deux mots', 'je ne vous retiens pas',
            'je ne vous dérange pas', 'pas de souci', 'aucun souci'], conseil: 'Montrez que vous respectez son peu de temps.' },
          { nom: 'Présentation légère', mots: ['je suis', 'je m’appelle', 'conseiller', 'conseillère', 'vendeur', 'vendeuse', 'ici', 'du magasin', 'de la boutique'], conseil: 'Une présentation en quelques mots suffit.' },
          { nom: 'Le choix laissé au client', mots: ['vous préférez', 'vous cherchez', 'quelque chose de précis', 'je peux vous aider', 'puis-je vous aider', 'voulez-vous', 'souhaitez-vous', 'si vous voulez', 'comme vous voulez'], conseil: 'Laissez-lui le choix : être aidé ou regarder seul.' }
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [PIEGE_PRODUIT, { nom: 'Trop insistant', points: 1, mots: ['pourquoi', 'vous devriez', 'il faut absolument', 'prenez le temps de regarder', 'vous avez tort'], conseil: 'Ne retenez pas un client pressé.' }] },
      { titre: 'Votre réglage majeur', champs: ['adjustment'],
        criteres: [
          { nom: 'Le réglage nommé', mots: ['court', 'courte', 'bref', 'brève', 'rapide', 'concis', 'concise', 'rythme', 'pressé', 'temps', 'laisser',
            'liberté', 'non intrusif', 'non intrusive', 'discret', 'discrète', 'retenir', 'choix', 'disponible', 'disponibilité', 'adapt*', 'ajust*', 'raccourci*', 'simplifi*'], conseil: 'Nommez ce que vous avez changé : plus court, moins intrusif…' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S1 C · Comparer deux ouvertures : 3 à 5 arguments, puis un emprunt.
    's1-C': { blocs: [
      { titre: 'Vos arguments', motif: 'argument',
        criteres: [
          { nom: 'Cadrage', mots: ['cadrage', 'cadre', 'durée', '30 minutes', 'minutes', 'déroulé', 'déroulement', 'd’abord', 'ensuite', 'structur*', 'annonce', 'à quoi s’attendre', 'organis*'], conseil: 'L’ouverture 1 annonce la durée et le déroulé.' },
          { nom: 'Écoute avant présentation', mots: ['écoute', 'écouter', 'je vous écoute', 'parole', 'besoin*', 'découv*', 'situation', 'avant de présenter', 'avant de pousser', 'avant de parler', 'laisse parler', 'parler de sa situation'], conseil: 'Elle donne la parole avant de présenter.' },
          { nom: 'Recherche d’accord', mots: ['ça vous va', 'accord', 'valid*', 'consentement', 'avis', 'implique', 'impliquer', 'demande', 'vérifie', 'approbation'], conseil: '« Ça vous va ? » cherche l’accord du client.' },
          { nom: 'Posture centrée client', mots: ['centré', 'centrée', 'orienté client', 'orientée client', 'posture', 'parle de lui', 'parle d’elle', 'se met en avant', 'le vendeur', 'ses résultats', 'monopolise', 'client'], conseil: 'Comparez la place laissée au client.' },
          { nom: 'Comparaison', mots: ['alors que', 'contrairement', 'tandis que', 'à l’inverse', 'au contraire', 'ouverture 2', 'la deuxième', 'la seconde', 'l’autre', 'par rapport', 'plus', 'moins'], min: 2, conseil: 'Mettez les deux ouvertures face à face.' },
          raison
        ],
        phrases: { attendues: 3, points: 2 } },
      { titre: 'Votre emprunt', champs: ['borrow'],
        criteres: [
          { nom: 'L’élément emprunté', mots: ['référence*', 'clients', 'entreprises comme la vôtre', 'plusieurs entreprises', 'résultats', 'preuve', 'crédib*', 'témoignage', 'exemple*', 'déjà accompagné', 'accompagne déjà', 'expérience', 'confiance'], conseil: 'L’ouverture 2 cite des clients similaires : une preuve sociale.' },
          { nom: 'Comment vous l’intégrez', mots: ['j’ajouterais', 'j’intégrerais', 'je reprendrais', 'je glisserais', 'j’emprunterais', 'je mettrais', 'ajouter', 'intégrer', 'insérer', 'placer', 'après', 'avant', 'brièvement', 'en une phrase', 'au moment', 'juste après'], conseil: 'Dites où et comment vous le placeriez.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S1 D · Rédiger une ouverture phrase par phrase.
    's1-D': { blocs: [
      { titre: 'Votre ouverture', motif: 'line',
        criteres: [accueil, presentation, cadrage, ecoute],
        phrases: { attendues: 4, points: 2 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
        pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER] }
    ] },

    // S1 E1 · Visio : le prospect coupe sa caméra.
    's1-E1': { blocs: [
      { champs: ['response'],
        criteres: [
          { nom: 'La situation reconnue', mots: ['caméra', 'image', 'on ne se voit pas', 'sans image', 'à l’oral', 'oral', 'voix', 'je vous entends', 'vous entendre', 'coupé', 'pas de souci', 'aucun souci', 'pas de problème', 'très bien', 'tout à fait', 'aucun problème', 'on continue'], conseil: 'Reconnaissez simplement le changement.' },
          { nom: 'Cadrage à l’oral', mots: CADRAGE, conseil: 'Sans image, annoncez le déroulé à voix haute.' },
          { nom: 'Invitation à réagir', mots: ['n’hésitez pas', 'dites-moi', 'interrompre', 'interrompez', 'arrêter', 'réagir', 'réagissez', 'quand vous voulez', 'à tout moment', 'si je vais trop vite', 'préciser', 'coupez-moi'], conseil: 'Invitez-le à réagir à la voix.' },
          { nom: 'Une question sur sa priorité', mots: ECOUTE, conseil: 'Posez une question courte sur ce qui compte pour lui.' }
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [{ nom: 'Exiger la caméra', points: 2, mots: ['rallumer', 'rallumez', 'allumer votre caméra', 'activer votre caméra', 'activez', 'remettre la caméra', 'remettez', 'pourriez-vous allumer', 'il faudrait la caméra', 'mettre la caméra'], conseil: 'N’exigez pas qu’il rallume sa caméra.' }] }
    ] },

    // S1 E2 · L'ultimatum : 40 secondes pour obtenir un rendez-vous.
    's1-E2': { blocs: [
      { champs: ['proposal'],
        criteres: [
          { nom: 'Accroche claire', mots: ['bonjour', 'je suis', 'je m’appelle', 'de ergolys', 'chez ergolys', 'ergolys', 'commercial', 'commerciale', 'conseiller', 'conseillère'], conseil: 'Dites tout de suite qui vous êtes.' },
          { nom: 'Valeur pour la cliente', mots: ['vous aider', 'aider', 'aidons', 'permet', 'gagner', 'économiser', 'économies', 'réduire', 'réduction', 'améliorer', 'bénéfice', 'confort',
            'santé', 'dos', 'arrêts', 'arrêts maladie', 'absences', 'absentéisme', 'tms', 'productivité', 'bien-être', 'salariés', 'équipes', 'collaborateurs', 'coûts', 'efficacité', 'résultats', 'concret*', 'prévenir', 'prévention'], min: 2, conseil: 'Dites ce que la cliente peut y gagner, concrètement.' },
          { nom: 'Suite proposée', mots: ['je vous propose', 'rendez-vous', '10 minutes', 'dix minutes', 'on continue', 'on en parle', 'on fixe', 'ça vous va', 'êtes-vous d’accord', 'd’accord', 'prochaine', 'rencontrer', 'démonstration', 'essai', 'quand', 'créneau', 'cette semaine'], conseil: 'Proposez clairement de poursuivre.' },
          { nom: 'Le sujet nommé', mots: ['siège*', 'sièges', 'fauteuil*', 'chaise*', 'ergonom*', 'bureau', 'poste de travail', 'postes'], conseil: 'Nommez ce que vous vendez.' }
        ],
        phrases: { attendues: 2, points: 1 },
        regles: [{ regle: 'maxMots:90', nom: '90 mots au plus', points: 1 }],
        pieges: [PIEGE_FAMILIER] }
    ] },

    // S1 E3 · Agence de décoration : entrer en matière sans question.
    's1-E3': { blocs: [
      { champs: ['opening'],
        criteres: [
          accueil,
          { nom: 'Prise d’initiative', mots: ['je vous propose', 'je propose', 'proposons', 'prenons', 'commençons', 'nous allons', 'on va', 'je vais', 'permettez-moi', 'allons-y', 'laissez-moi', 'je commence', 'nous commençons', 'voici comment', 'nous pouvons'], conseil: 'Ouvrez par une proposition : « Je vous propose de… ».' },
          { nom: 'Invitation à parler', mots: ['je vous laisse', 'je vous écoute', 'racontez-moi', 'parlez-moi', 'me raconter', 'me parler', 'me dire', 'me décrire', 'décrivez-moi', 'votre projet', 'votre salon', 'vos envies', 'vos goûts', 'votre intérieur', 'vos idées', 'ce que vous imaginez', 'ce que vous aimez', 'votre style', 'vos attentes', 'votre situation'], conseil: 'Sans question, invitez-la quand même à s’exprimer.' },
          { nom: 'Climat positif', mots: ['ravi', 'ravie', 'plaisir', 'heureux', 'heureuse', 'enchanté', 'enchantée', 'merci', 'bienvenue', 'installez-vous', 'agréable', 'ensemble', 'avec vous', 'tranquillement', 'prendre le temps'], conseil: 'Un mot chaleureux installe le climat.' },
          { nom: 'Présentation', mots: PRESENTATION.concat(['atelier teinte', 'décoratrice', 'décorateur', 'architecte d’intérieur']), conseil: 'Dites qui vous êtes.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'sansQuestion', nom: 'Sans question', points: 2 }],
        pieges: [PIEGE_PRODUIT, PIEGE_FAMILIER] }
    ] },

    // S1 F · Transposer l'ouverture au téléphone, puis par e-mail.
    's1-F': { blocs: [
      { titre: 'Au téléphone', champs: ['phone'],
        criteres: [
          { nom: 'Identité vérifiée', mots: ['suis-je bien', 'je suis bien', 'bien avec', 'êtes-vous bien', 'c’est bien', 'je parle bien', 'monsieur', 'madame', '[nom'], conseil: 'Vérifiez que vous parlez à la bonne personne.' },
          presentation,
          { nom: 'Raison de l’appel', mots: ['je vous appelle', 'au sujet de', 'concernant', 'à propos de', 'pour vous parler', 'suite à', 'l’objet de mon appel', 'je me permets', 'mon appel'], conseil: 'Dites tout de suite pourquoi vous appelez.' },
          { nom: 'Disponibilité', mots: ['bon moment', 'un moment', 'avez-vous', 'quelques minutes', 'deux minutes', '2 minutes', 'disponible', 'je vous dérange', 'rappeler', 'préférez-vous', 'plus tard'], conseil: 'Demandez si c’est un bon moment.' },
          ecoute
        ],
        phrases: { attendues: 3, points: 1 } },
      { titre: 'L’objet de l’e-mail', champs: ['subject'],
        criteres: [{ nom: 'Un objet clair', mots: ['échange', 'rendez-vous', 'rencontre', 'min', 'minutes', 'proposition', 'votre', 'projet', 'appel', 'entretien', 'point', 'demande', 'question'], conseil: 'Un objet court qui dit le sujet et l’intention.' }],
        phrases: { points: 0 } },
      { titre: 'Le message', champs: ['email'],
        criteres: [
          { nom: 'Formule d’appel', mots: ['bonjour', 'madame', 'monsieur', 'cher', 'chère'], conseil: 'Commencez par « Bonjour [Nom] ».' },
          presentation,
          { nom: 'Raison du message', mots: ['je me permets', 'au sujet de', 'concernant', 'je vous écris', 'suite à', 'à propos de'], conseil: 'Dites pourquoi vous écrivez.' },
          { nom: 'Écoute annoncée', mots: ['comprendre', 'vos priorités', 'votre situation', 'vos besoins', 'vous écouter', 'échanger', 'vos attentes', 'votre avis'], conseil: 'Annoncez que vous voulez d’abord comprendre.' },
          { nom: 'Durée et créneau', mots: ['minutes', 'créneau', 'disponible', 'disponibilité', 'semaine', 'date', 'quand', 'rendez-vous', 'échange de', 'appel de'], conseil: 'Proposez une durée et demandez un créneau.' },
          { nom: 'Formule de politesse', mots: ['cordialement', 'bien à vous', 'belle journée', 'bonne journée', 'dans l’attente', 'au plaisir', 'salutations', 'bien cordialement'], conseil: 'Terminez par une formule de politesse.' }
        ],
        phrases: { attendues: 3, points: 1 },
        regles: [{ regle: 'minMots:80', nom: '80 mots au moins', points: 1 }, { regle: 'maxMots:120', nom: '120 mots au plus', points: 1 }] }
    ] },

    // S2 A · Justifier son choix de réponse, client par client.
    's2-A': { blocs: [
      ['Client pressé', ['temps', 'pressé', 'rythme', 'laisser', 'liberté', 'disponible', 'cadre', 'coup de vent', 'respecte', 'n’impose pas']],
      ['Client méfiant', ['méfi*', 'doute', 'expérience', 'confiance', 'prudent', 'ressenti', 'nomme', 'sceptique', 'déçu', 'mauvaise expérience']],
      ['Client novice', ['peur', 'rassur*', 'soutien', 'accompagn*', 'ensemble', 'normal', 'perdu', 'se tromper', 'rythme', 'ressenti']]
    ].map(([titre, sujet], i) => ({
      titre, champs: [`why${i}`],
      criteres: [
        { nom: 'L’attitude nommée', mots: ['compréhension', 'reformul*', 'comprend*', 'écoute', 'respect*', 'empathie', 'empathique', 'bienveillan*'], conseil: 'Nommez l’attitude de la bonne réponse.' },
        { nom: 'Le lien avec ce client', mots: sujet, conseil: 'Reliez votre choix à ce que vit ce client.' },
        { nom: 'Les autres réponses écartées', mots: ['juge*', 'jugement', 'minimis*', 'solution', 'intrusi*', 'prématur*', 'pousse*', 'interpr*', 'ferme', 'force', 'impose', 'trop tôt', 'les autres'], conseil: 'Dites pourquoi les autres réponses ferment la relation.' },
        raison
      ],
      phrases: { attendues: 1, points: 1 }
    })) },

    // S2 B · Réécrire 4 fausses reformulations sur « un peu chère ».
    's2-B': { blocs: [0, 1, 2, 3].map(i =>
      reformuler(`Réplique ${i + 1}`, `rewrite${i}`, ['prix', 'cher', 'chère', 'tarif', 'coût', 'montant', 'investissement', 'rapport prix', 'valeur', 'élevé'])) },

    // S2 D · Une réponse par attitude de Porter, puis le choix justifié.
    's2-D': { blocs: [
      { titre: 'Jugement / évaluation', champs: ['reply0'], criteres: [{ nom: 'Une évaluation', mots: ['vous avez raison', 'vous avez tort', 'c’est bien', 'c’est une erreur', 'c’est sage', 'c’est dommage', 'bonne idée', 'mauvaise idée', 'c’est raisonnable', 'c’est prudent', 'vous faites bien', 'il ne faut pas', 'sage', 'excellent', 'dommage', 'erreur', 'bien vu'], conseil: 'Approuvez ou désapprouvez : « Vous avez raison… ».' }] },
      { titre: 'Interprétation', champs: ['reply1'], criteres: [{ nom: 'Une explication à sa place', mots: ['en fait', 'au fond', 'c’est que', 'ce qui vous', 'vous n’êtes pas', 'vous avez peur', 'vous doutez', 'pas convaincu', 'vous craignez', 'je pense que vous', 'sûrement', 'sans doute', 'j’imagine que', 'en réalité'], conseil: 'Expliquez à sa place : « En fait, vous… ».' }] },
      { titre: 'Soutien / consolation', champs: ['reply2'], criteres: [{ nom: 'Un réconfort', mots: ['ne vous inquiétez pas', 'rien ne presse', 'prenez votre temps', 'pas de souci', 'c’est normal', 'aucun problème', 'je suis là', 'ne vous en faites pas', 'tout va bien', 'on a le temps', 'aucune pression', 'pas de pression'], conseil: 'Rassurez : « Rien ne presse… ».' }] },
      { titre: 'Investigation / enquête', champs: ['reply3'], criteres: [{ nom: 'Une question pour en savoir plus', mots: QUESTION_OUVERTE.concat(['pourquoi', 'combien', 'quand']), conseil: 'Posez une question : « Qu’est-ce qui… ? ».' }], regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: 'Solution / décision', champs: ['reply4'], criteres: [{ nom: 'Une solution proposée', mots: ['je vous propose', 'prenez', 'je vous conseille', 'vous pouvez', 'la formule', 'sans engagement', 'essai', 'je vous recommande', 'choisissez', 'optez', 'signez', 'réservez', 'essayez', 'devriez', 'il suffit'], conseil: 'Proposez une issue : « Prenez la formule… ».' }] },
      { titre: 'Compréhension / reformulation', champs: ['reply5'], criteres: [reformulation, { nom: 'Ses mots repris', mots: ['votre rythme', 'votre temps', 'prendre le temps', 'réfléchir', 'décider', 'temps', 'avant de vous décider'], conseil: 'Reprenez son besoin de temps.' }], pieges: [PIEGE_SOLUTION] },
      { titre: 'Votre choix justifié', champs: ['justification'],
        criteres: [
          { nom: 'La compréhension choisie', mots: ['compréhension', 'reformul*'], conseil: 'En prise de contact, on privilégie la compréhension.' },
          { nom: 'Pourquoi elle convient', mots: ['respecte', 'confiance', 'relation', 'ouverte', 'sans pousser', 'rythme', 'besoin', 'écoute', 'ne juge pas', 'ne force pas'], conseil: 'Dites ce qu’elle apporte à la relation.' },
          { nom: 'Les autres comparées', mots: ['soutien', 'investigation', 'enquête', 'plus tard', 'ensuite', 'jugement', 'solution', 'interprétation', 'alors que', 'plutôt que'], conseil: 'Situez-la par rapport aux autres attitudes.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S2 F · Trois profils : une réponse d'écoute, puis la posture.
    's2-F': { blocs: [
      { titre: 'Méfiant : votre réponse', champs: ['reply0'],
        criteres: [{ nom: 'Le doute nommé', mots: ['doute*', 'méfi*', 'confiance', 'prudent', 'déçu', 'expérience', 'sceptique', 'réserves', 'je comprends', 'j’entends', 'je le comprends'], conseil: 'Nommez son doute calmement.' },
          { nom: 'Une invitation à préciser', mots: QUESTION_OUVERTE.concat(['ce qui vous rendrait', 'qu’est-ce qui vous rassurerait']), conseil: 'Transformez le doute en information.' }],
        pieges: [{ nom: 'Défense', points: 1, mots: ['si si', 'je vous assure', 'faites-moi confiance', 'ce n’est pas vrai', 'nos solutions marchent', 'vous avez tort', 'pas du tout', 'je vous garantis'], conseil: 'Ne répondez pas à l’agressivité par la défense.' }, PIEGE_MINIMISE] },
      { titre: 'Méfiant : votre adaptation', champs: ['posture0'], criteres: [{ nom: 'La posture décrite', mots: ['calme', 'défens*', 'sans me défendre', 'agress*', 'nommer', 'accueillir', 'justifier', 'neutre', 'information', 'apaiser', 'posé', 'posée', 'serein*', 'patien*', 'ton'], conseil: 'Calme, sans défense : on nomme le doute.' }, raison] },
      { titre: 'Bavard : votre réponse', champs: ['reply1'],
        criteres: [{ nom: 'Une synthèse', mots: ['si je résume', 'en résumé', 'pour résumer', 'si je comprends bien', 'beaucoup à gérer', 'plusieurs prestataires', 'trois prestataires', 'déçu', 'la même histoire', 'plusieurs essais'], conseil: 'Résumez ce qu’il a dit.' },
          { nom: 'Un recentrage', mots: ['sur quoi', 'par quoi', 'pour être utile', 'commençons', 'priorité', 'le plus important', 'l’essentiel', 'recentrer', 'concentrer', 'en premier'], conseil: 'Proposez par quoi commencer.' }],
        pieges: [{ nom: 'Couper la parole', points: 1, mots: ['stop', 'arrêtez', 'on va pas', 'abrégez', 'venons-en au fait', 'bref'], conseil: 'Recentrez avec respect, sans couper.' }] },
      { titre: 'Bavard : votre adaptation', champs: ['posture1'], criteres: [{ nom: 'La posture décrite', mots: ['synthèse', 'résum*', 'recentr*', 'respect*', 'sans couper', 'couper la parole', 'cadrer', 'structur*', 'canaliser', 'guider', 'interromp*'], conseil: 'Une synthèse qui recentre, sans couper.' }, raison] },
      { titre: 'Silencieux : votre réponse', champs: ['reply2'],
        criteres: [{ nom: 'Le silence accueilli', mots: ['prudent', 'normal', 'prenez', 'votre temps', 'je comprends', 'pas de souci', 'réfléchi*', 'à votre rythme'], conseil: 'Accueillez sa réserve.' },
          { nom: 'Une question ouverte légère', mots: QUESTION_OUVERTE.concat(['ce qui compte']), conseil: 'Une question douce pour l’inviter à parler.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: 'Silencieux : votre adaptation', champs: ['posture2'], criteres: [{ nom: 'La posture décrite', mots: ['question ouverte', 'douce', 'doucement', 'sans presser', 'invit*', 'encourag*', 'silence', 'laisser le temps', 'mettre à l’aise', 'rassur*', 'patien*', 'léger', 'légère', 'ouvert'], conseil: 'Une investigation douce, sans presser.' }, raison] }
    ] },

    // S3 1.4 · « Je vais réfléchir » : l'hypothèse, puis la question.
    's3-1.4': { blocs: [
      { titre: 'Vraie objection probable', champs: ['hypothesis'],
        criteres: [
          { nom: 'Le prétexte repéré', mots: ['prétexte', 'excuse', 'dérobade', 'masque', 'cache', 'ne dit pas', 'non exprimé', 'non exprimée', 'vraie objection', 'frein', 'réel', 'vraie raison'], conseil: '« Je vais réfléchir » cache souvent autre chose.' },
          { nom: 'Des causes possibles', mots: ['prix', 'budget', 'coût', 'utilité', 'doute', 'valider', 'direction', 'hiérarchie', 'décision', 'interne', 'peur', 'crainte', 'se tromper', 'risque', 'concurrent', 'comparaison', 'autre offre', 'moment', 'mise en œuvre', 'associé', 'patron'], min: 2, conseil: 'Citez des freins possibles : budget, décision, crainte…' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Question pour la révéler', champs: ['question'],
        criteres: [
          { nom: 'Une question ouverte', mots: QUESTION_OUVERTE, conseil: 'Commencez par « Qu’est-ce qui… ».' },
          { nom: 'L’hésitation visée', mots: ['hésite*', 'freine*', 'retien*', 'bloque*', 'réfléchir', 'doute*', 'réserve*', 'inquiète*', 'préoccupe*', 'manque', 'aide à décider'], conseil: 'Visez ce qui le fait hésiter.' },
          { nom: 'Avec tact', mots: ['bien sûr', 'je comprends', 'tout à fait', 'pour vous aider', 'pour être utile', 'd’accord', 'c’est normal', 'volontiers'], conseil: 'Accueillez d’abord : « Bien sûr… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [{ nom: 'Le report accepté', points: 2, mots: ['je vous rappelle', 'on verra', 'dans un mois', 'je vous laisse réfléchir', 'prenez le temps de réfléchir', 'rappelez-moi'], conseil: 'Accepter un report vague, c’est perdre la main.' }] }
    ] },

    // S3 1.5 · Expliquer pourquoi la réponse B est la plus juste.
    's3-1.5': { blocs: [
      { champs: ['why'],
        criteres: [
          { nom: 'Les étapes repérées', mots: ['accueil*', 'creuse*', 'question*', 'reformul*', 'preuve', 'traite*', 'contrôle*', 'vérifie*', 'adhésion', 'par rapport à quoi', 'essai', 'arrêts'], min: 3, conseil: 'B accueille, creuse, reformule, prouve et contrôle.' },
          { nom: 'Les défauts de A', mots: ['contredit', 'contredire', 'remise', 'brade*', '10 %', 'réduction', 'négociation', 'prématuré*', 'dévalorise*', 'affaiblit', 'ne creuse pas', 'n’écoute pas', 'pas si cher'], conseil: 'A contredit le client et brade le prix.' },
          { nom: 'La valeur défendue', mots: ['valeur', 'valoris*', 'sans brader', 'sans baisser', 'investissement', 'en vaut la peine'], conseil: 'B défend la valeur au lieu de baisser le prix.' },
          raison
        ],
        phrases: { attendues: 2, points: 1 } }
    ] },

    // S3 1.6 · « Nos chaises actuelles suffisent » : une phrase par étape.
    's3-1.6': { blocs: [
      { titre: '1. Accueillir', champs: ['line0'], criteres: [{ nom: 'L’objection accueillie', mots: ['je comprends', 'j’entends', 'je vois', 'c’est légitime', 'merci de', 'bonne remarque', 'tout à fait', 'en effet', 'effectivement', 'c’est normal', 'bien sûr', 'je note'], conseil: 'Recevez l’objection sans la contredire.' }],
        pieges: [PIEGE_JUGEMENT, { nom: 'Contradiction', points: 1, mots: ['pas du tout', 'détrompez-vous', 'au contraire'], conseil: 'Ne contredisez pas le client.' }] },
      { titre: '2. Questionner', champs: ['line1'], criteres: [{ nom: 'Une question qui creuse', mots: QUESTION_OUVERTE.concat(['vous arrive-t-il', 'avez-vous', 'est-ce que']), conseil: 'Une seule question, ouverte.' },
        { nom: 'Le bon sujet', mots: ['salariés', 'collaborateurs', 'équipes', 'dos', 'arrêts', 'plaintes', 'douleurs', 'confort', 'inconfort', 'gênés', 'absences', 'tms', 'fatigue'], conseil: 'Interrogez sur le confort et les arrêts.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: '3. Reformuler', champs: ['line2'], criteres: [reformulation, { nom: 'Ses mots repris', mots: ['suffisent', 'actuelles', 'dépenser', 'vrai problème', 'satisfait', 'fonctionnent', 'pas de besoin', 'pas nécessaire', 'chaises'], conseil: 'Reprenez son idée : elles suffisent.' }] },
      { titre: '4. Traiter', champs: ['line3'], criteres: [{ nom: 'Une preuve', mots: PREUVE, conseil: 'Une preuve concrète vaut mieux qu’une promesse.' }] },
      { titre: '5. Contrôler', champs: ['line4'], criteres: [{ nom: 'L’adhésion vérifiée', mots: CONTROLE, conseil: 'Vérifiez : « Est-ce que cela vous parle ? ».' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: '6. Enchaîner', champs: ['line5'], criteres: [{ nom: 'Une suite précise', mots: SUITE.concat(['2 ou 3 postes', 'deux ou trois postes', 'objectiver']), conseil: 'Proposez une suite précise : un diagnostic gratuit…' }] }
    ] },

    // S3 1.7 · Cartes réflexes : creuser, puis répondre avec une preuve.
    's3-1.7': { blocs: [
      ['Direction', ['direction', 'compterait', 'important pour eux', 'critères', 'qui décide', 'décision', 'quand', 'convaincre', 'attendent', 'qui d’autre', 'arguments'],
        ['argumentaire', 'chiffr*', 'dossier', 'synthèse', 'présentation', 'présenter', 'rencontrer', 'rendez-vous', 'accompagner', 'avec vous', 'document', 'retour sur investissement', 'coût des arrêts', 'à votre direction']],
      ['Trop cher', ['par rapport à quoi', 'comparé', 'compar*', 'budget prévu', 'enveloppe', 'autre offre', 'combien', 'quel budget', 'autre devis'],
        ['garantie', '5 ans', 'cinq ans', 'essai', '30 jours', 'location', 'étaler', 'mensualité*', 'valeur', 'rentab*', 'coût des arrêts', 'économ*', 'durée de vie', 'investissement']],
      ['Déçu par un fournisseur', ['qu’est-ce qui s’est', 'que s’est-il passé', 'mal passé', 'déçu', 'pourquoi', 'racontez', 'exactement', 'quel problème', 'ce qui n’a pas'],
        ['garantie', 'sav', '48 h', '48 heures', 'essai', 'satisfait ou remboursé', 'remboursé', '1 200', '1200', 'entreprises équipées', 'références', 'avis', 'témoignages', 'engagement', 'suivi', 'interlocuteur']],
      ['Nos chaises suffisent', ['salariés', 'dos', 'gênés', 'douleurs', 'arrêts', 'plaintes', 'confort', 'tms', 'absences', 'collaborateurs'],
        ['prévention', 'prévenir', 'tms', 'arrêts', 'baisse', 'diagnostic', 'gratuit', 'étude', 'essai', 'coût', 'absences']]
    ].flatMap(([titre, creuser, prouver], i) => [
      { titre: `${titre} : votre question`, champs: [`dig${i}`],
        criteres: [{ nom: 'Une question ouverte', mots: QUESTION_OUVERTE.concat(['pourquoi']), conseil: 'Creusez par une question ouverte.' }, { nom: 'Le bon angle', mots: creuser, conseil: 'Visez la cause probable de l’objection.' }],
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }] },
      { titre: `${titre} : votre réponse`, champs: [`reply${i}`],
        criteres: [{ nom: 'Une preuve', mots: prouver, min: 2, conseil: 'Appuyez-vous sur une preuve : garantie, essai, chiffres…' }],
        pieges: [{ nom: 'Le prix bradé', points: 1, mots: ['remise', 'réduction', 'rabais', 'geste commercial', 'baisser le prix', 'baisse de prix', 'moins cher pour vous'], conseil: 'On défend la valeur, on ne brade pas.' }] }
    ]) },

    // S4 1.2 · Réécrire une ouverture maladroite.
    's4-1.2': { blocs: [{ champs: ['rewrite'], ...ouvertureComplete }] },

    // S4 2.2 · Remplacer trois réponses réflexes par une reformulation.
    's4-2.2': { blocs: [
      reformuler('Le concurrent moins cher', 'repair0', ['budget', 'prix', 'critère', 'moins cher', 'coût', 'tarif', 'important', 'compar*', 'concurrent']),
      reformuler('Pas le temps', 'repair1', ['charge', 'temps', 'chargé', 'chargée', 'occupé', 'occupée', 'priorité', 'en ce moment', 'pas de place', 'débordé', 'débordée', 'agenda']),
      reformuler('Déjà essayé', 'repair2', ['expérience', 'prudent', 'prudente', 'déçu', 'déçue', 'essayé', 'méfiant', 'réserve', 'rien donné', 'résultat', 'doute'])
    ] }
  };
})();
