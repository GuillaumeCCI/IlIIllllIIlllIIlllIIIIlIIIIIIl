/* GRILLES DE L'INDICATEUR DE POINTS · réponses ouvertes du module 1-1-3.
 *
 * Lues par moteur/js/indicateur.js. Une grille par exercice (clé du
 * catalogue) ; chaque bloc lit un ou plusieurs champs (`champs`, ou
 * `motif` : « spot » → spot0, spot1…) et compte ses critères, ses phrases
 * complètes, ses règles et ses pièges. L'écriture des expressions est
 * décrite en tête d'indicateur.js : casse, accents et terminaisons ne
 * comptent pas, un mot peut s'intercaler, « rassur* » est un début de mot.
 *
 * Toutes les grilles sont `integre` : chaque écran place lui-même le score
 * dans son corrigé (js/score-ecrans.js). Les familles communes sont en
 * tête, reprises de 1-1-1 et enrichies : les enrichir profite à tous les
 * exercices qui les emploient. Le but est large : une réponse juste, dite
 * autrement que la réponse possible, doit obtenir un bon score.
 */
(() => {
  'use strict';

  const uniq = (...lists) => [...new Set(lists.flat())];

  /* ── Familles communes ──────────────────────────────────────────────── */

  // Recevoir une objection sans la contredire.
  const ACCUEIL = ['je comprends', 'je vous comprends', 'je comprends tout à fait', 'je comprends bien', 'je comprends parfaitement', 'je le comprends',
    'je peux comprendre', 'je peux tout à fait comprendre', 'on peut comprendre', 'ça se comprend', 'cela se comprend', 'c’est compréhensible',
    'je vois', 'je vois bien', 'je vois ce que vous voulez dire', 'j’entends', 'je vous entends', 'j’entends bien', 'je l’entends', 'bien entendu',
    'bien sûr', 'naturellement', 'évidemment', 'tout à fait', 'absolument', 'effectivement', 'en effet', 'c’est vrai', 'c’est juste', 'c’est exact',
    'c’est normal', 'c’est bien normal', 'c’est tout à fait normal', 'c’est légitime', 'c’est logique', 'c’est naturel', 'c’est une bonne question',
    'bonne question', 'c’est une vraie question', 'c’est une question importante', 'c’est un point important', 'c’est important', 'c’est une remarque',
    'vous avez raison de', 'vous faites bien', 'vous avez bien fait', 'merci de me le dire', 'merci de le dire', 'merci de votre franchise',
    'merci pour votre franchise', 'merci de me le signaler', 'merci de m’en parler', 'merci de me faire part', 'merci pour cette remarque',
    'je note', 'c’est noté', 'je prends note', 'j’en prends note', 'entendu', 'd’accord', 'je respecte', 'je partage', 'je conçois', 'je le conçois',
    'je mesure', 'je saisis', 'beaucoup de clients', 'beaucoup de mes clients', 'd’autres clients', 'vous n’êtes pas le seul', 'vous n’êtes pas la seule',
    'votre remarque', 'votre réaction', 'votre point', 'votre prudence', 'c’est prudent', 'c’est sage', 'c’est une bonne chose', 'c’est une bonne réaction',
    'merci', 'je vous remercie', 'pas de souci', 'aucun souci', 'pas de problème', 'aucun problème', 'avec plaisir', 'volontiers', 'très bien', 'parfait',
    'je vous rejoins', 'vous n’avez pas tort', 'c’est une vraie préoccupation', 'c’est une préoccupation', 'c’est un vrai sujet', 'c’est un sujet',
    'je suis d’accord', 'c’est compréhensible', 'c’est une question légitime', 'c’est une réserve', 'oui', 'certes', 'je l’entends bien'];

  // Une question qui ouvre : le client doit développer.
  const QUESTION_OUVERTE = ['qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'sur quoi', 'de quoi', 'par rapport à quoi',
    'dans quelle mesure', 'en quoi', 'à quel point', 'à quoi', 'que pensez-vous', 'qu’en pensez-vous', 'racontez-moi', 'dites-moi', 'parlez-moi',
    'expliquez-moi', 'pourriez-vous préciser', 'précisez', 'combien', 'pourquoi', 'lequel', 'laquelle', 'lesquels', 'lesquelles', 'que se passe',
    'qu’attendez-vous', 'que recherchez-vous', 'qu’aimeriez-vous', 'que souhaiteriez-vous', 'que voulez-vous dire', 'c’est-à-dire', 'dites-m’en plus',
    'à quel moment', 'depuis quand', 'de quelle façon', 'de quelle manière', 'sous quelle forme', 'que s’est-il passé', 's’est-il passé',
    'qu’entendez-vous', 'que faudrait-il', 'que vous faudrait-il', 'de quoi auriez-vous besoin', 'qu’est-ce qu*', 'quand', 'où', 'qui d’autre',
    'qui décide', 'que manque-t-il', 'que vous manque-t-il', 'que vous faut-il', 'que diriez-vous', 'que souhaitez-vous', 'que voulez-vous',
    'que préférez-vous', 'qu’est-ce que vous', 'en quel sens', 'jusqu’où', 'pour quelle raison', 'pour quelles raisons', 'à votre avis'];

  // Une question qui explore, ouverte ou fermée.
  const QUESTION = uniq(QUESTION_OUVERTE, ['avez-vous', 'y a-t-il', 'vous arrive-t-il', 'est-ce que', 'est-ce qu*', 'pouvez-vous', 'pourriez-vous',
    'auriez-vous', 'seriez-vous', 'souhaitez-vous', 'voulez-vous', 'aimeriez-vous', 'connaissez-vous', 'savez-vous', 'êtes-vous', 'trouvez-vous',
    'pensez-vous', 'diriez-vous', 'faites-vous', 'vous arrive-t-il', 'arrive-t-il', 'vous est-il', 'remarquez-vous', 'constatez-vous', 'observez-vous',
    'ressentez-vous', 'rencontrez-vous', 'vos salariés ont-ils', 'vos équipes ont-elles', 'puis-je vous demander', 'je peux vous demander',
    'puis-je vous poser', 'je peux vous poser', 'une question', 'deux questions', 'petite question']);

  const REFORMULATION = ['si je comprends bien', 'si j’ai bien compris', 'si je vous suis bien', 'si je vous entends bien', 'autrement dit',
    'en d’autres termes', 'vous voulez dire', 'vous me dites', 'vous dites', 'vous trouvez', 'vous avez l’impression', 'vous préférez',
    'vous souhaitez', 'vous voulez', 'vous aimeriez', 'pour vous', 'c’est bien ça', 'c’est bien cela', 'c’est cela', 'c’est ça',
    'ai-je bien compris', 'est-ce bien cela', 'n’est-ce pas', 'je comprends que', 'j’entends que', 'si je résume', 'en résumé', 'pour résumer',
    'ce que je retiens', 'ce que j’entends', 'vous ressentez', 'vous vous sentez', 'vous avez besoin', 'est important pour vous', 'compte pour vous',
    'vous tient à cœur', 'vous fait hésiter', 'vous inquiète', 'vous préoccupe', 'vous rend prudent', 'vous rend prudente', 'vous vous interrogez',
    'vous vous demandez', 'vous hésitez', 'vous doutez', 'vous craignez', 'vous attendez', 'si j’entends bien', 'si je vous comprends bien',
    'si je saisis bien', 'en somme', 'en clair', 'donc vous', 'ainsi vous', 'vous voulez dire que', 'ce que vous me dites', 'ce que vous dites',
    'ce que je comprends', 'vous avez peur', 'vous avez le sentiment', 'vous ne voyez pas', 'vous n’avez pas envie', 'vous avez envie',
    'vous voulez être sûr', 'vous voulez être sûre', 'vous voulez être certain', 'vous voulez être certaine', 'vous souhaitez être sûr',
    'vous souhaitez être sûre', 'votre crainte', 'votre inquiétude', 'votre priorité', 'votre préoccupation', 'vous tenez à', 'vous préféreriez',
    'vous ne souhaitez pas', 'vous ne voulez pas', 'c’est important pour vous', 'vous êtes inquiet', 'vous êtes inquiète', 'vous trouvez que',
    'vous pensez que', 'vous estimez', 'vous jugez', 'je reformule', 'pour être sûr de bien comprendre', 'pour être sûre de bien comprendre',
    'pour bien comprendre', 'si je vous suis', 'si je vous comprends', 'ce qui compte pour vous', 'ce qui compte', 'l’essentiel pour vous',
    'ce qui vous importe', 'vous cherchez', 'vous recherchez', 'votre souhait', 'votre besoin', 'votre objectif', 'vous attendez de', 'vous devez',
    'il vous faut', 'il vous faudrait', 'vous auriez besoin', 'votre direction a besoin', 'vous voulez éviter', 'vous préférez éviter',
    'vous souhaitez éviter', 'vous ne voulez pas revivre', 'vous voulez vous assurer', 'vous souhaitez vous assurer', 'vous assurer', 'vous rassurer',
    'si je vous ai bien compris', 'si j’ai bien saisi', 'si j’ai bien entendu', 'si je ne me trompe pas', 'corrigez-moi si je me trompe',
    'dites-moi si je me trompe', 'je résume', 'pour être sûr', 'pour être sûre', 'le vrai point', 'le vrai sujet', 'le point qui', 'ce qui vous gêne',
    'ce qui vous bloque', 'ce qui vous retient', 'votre point porte', 'votre question porte', 'cela porte sur', 'il s’agit de', 'c’est surtout',
    'c’est plutôt', 'ce n’est pas tant', 'plus que', 'avant tout'];

  // Une demande de validation, à la fin d'une reformulation.
  const VALIDATION = ['c’est bien ça', 'c’est bien cela', 'c’est cela', 'c’est ça', 'n’est-ce pas', 'ai-je bien compris', 'est-ce bien cela',
    'est-ce bien ça', 'je me trompe', 'est-ce que je me trompe', 'corrigez-moi', 'dites-moi si', 'c’est exact', 'est-ce exact', 'est-ce juste',
    'c’est juste', 'correct', 'est-ce correct', 'vous confirmez', 'pouvez-vous confirmer', 'je résume bien', 'j’ai bien résumé', 'je vous suis bien',
    'est-ce que c’est ça', 'est-ce que c’est bien ça', 'c’est bien le point', 'c’est bien votre', 'c’est bien ce que', 'je vous ai bien compris',
    'j’ai bien compris', 'ai-je raison', 'est-ce le cas', 'c’est le cas', 'on est d’accord', 'vous êtes d’accord', 'êtes-vous d’accord', 'non', 'exact'];

  // Un élément concret qui prouve.
  const PREUVE = ['garantie', 'garanti', 'garantis', 'garantit', '5 ans', 'cinq ans', 'essai', 'essais', '30 jours', 'trente jours', 'satisfait ou remboursé',
    'remboursé', 'rembours*', 'nos clients', 'clients constatent', 'entreprises équipées', 'déjà équipées', 'références', 'référence', 'témoignage*',
    'avis clients', 'étude', 'étude ergonomique', 'chiffres', 'chiffre', 'chiffré', 'résultats', 'résultat', 'baisse', 'réduction des arrêts',
    'moins d’arrêts', 'arrêts', 'absences', 'absentéisme', 'tms', 'troubles musculo*', 'prévention', 'prévenir', 'retour sur investissement',
    'rentabilité', 'rentable', 'économies', 'économiser', 'économ*', 'sav', '48 h', '48h', '48 heures', '1 200', '1200', 'location', 'louer', 'étaler',
    'mensualités', 'diagnostic', 'démonstration', 'démo', 'exemple', 'par exemple', 'concrètement', 'certifié', 'certification', 'normes', 'norme',
    'productivité', 'confort', 'santé', 'tester', 'testez', 'essayer', 'essayez', 'diminué', 'baissé', 'en baisse', 'gagner', 'gagnent',
    'gratuitement', 'gratuit', 'gratuite', 'offert', 'offerte', 'inclus', 'incluse', 'clients satisfaits', 'prouvé', 'mesuré', 'constaté', 'démontré',
    'pour cent', '%', 'euros', 'en moyenne', 'chaque année', 'chaque mois', 'par mois', 'par an', 'ans d’expérience', 'cas concret', 'un client',
    'une cliente', 'nos utilisateurs', 'sans risque', 'sans engagement', 'vérifier', 'vérifiez', 'durable', 'durabilité', 'qualité', 'fabriqué',
    'fabrication', 'label', 'labellisé', 'agréé', 'recommandé', 'kinés*', 'ergonome*', 'médecin du travail', 'médecine du travail', 'visite',
    'venir voir', 'showroom', 'prêt', 'prêter', 'échantillon', 'installation', 'livraison', 'livré', 'suivi', 'contrat', 'engagement'];

  // Les chiffres, quels qu'ils soient (« 30 », « 5 », « 1200 »…).
  const CHIFFRES = ['0*', '1*', '2*', '3*', '4*', '5*', '6*', '7*', '8*', '9*', 'deux', 'trois', 'quatre', 'cinq', 'dix', 'quinze', 'vingt', 'trente',
    'cent', 'mille', 'moitié', 'tiers', 'quart'];

  // Vérifier que la réponse a levé le doute.
  const CONTROLE = ['est-ce que cela répond', 'est-ce que ça répond', 'cela répond-il', 'cela répond à', 'ça répond à', 'répond à votre',
    'répondent à votre', 'répondent-elles', 'répond-elle', 'répond-il', 'cela vous rassure', 'ça vous rassure', 'vous rassure', 'cela vous parle',
    'ça vous parle', 'vous parle', 'qu’en pensez-vous', 'qu’en dites-vous', 'est-ce plus clair', 'plus clair', 'cela vous convient', 'ça vous convient',
    'vous convient', 'avez-vous d’autres questions', 'd’autres questions', 'avez-vous des questions', 'des questions', 'cela lève', 'lève votre doute',
    'levé', 'lever', 'ai-je répondu', 'j’ai répondu', 'est-ce que j’ai répondu', 'cela vous semble', 'ça vous semble', 'vous semble', 'vous semble-t-il',
    'vous paraît', 'ça vous paraît', 'cela vous paraît', 'cela vous aide', 'ça vous aide', 'vous aiderait', 'cela vous aiderait', 'ça vous aiderait',
    'êtes-vous d’accord', 'vous êtes d’accord', 'ça vous va', 'cela vous va', 'convaincu', 'convaincue', 'rassuré', 'rassurée', 'reste-t-il',
    'un doute', 'des doutes', 'une réserve', 'd’autres réserves', 'qui vous retient', 'vous retient', 'qu’est-ce qui vous retient', 'votre crainte',
    'votre préoccupation', 'votre interrogation', 'votre question', 'votre inquiétude', 'vos inquiétudes', 'vos craintes', 'est-ce que c’est clair',
    'c’est clair', 'vous suivez', 'ça tient la route', 'ça a du sens', 'cela a du sens', 'est-ce cohérent', 'est-ce suffisant', 'suffisant', 'cela suffit',
    'ça suffit', 'cela vous satisfait', 'vous satisfait', 'est-ce que je réponds', 'c’est bon pour vous', 'on est d’accord', 'nous sommes d’accord',
    'est-ce que ça vous va', 'qu’est-ce qui vous manque', 'que vous faut-il de plus', 'il vous manque', 'ce point est réglé', 'ce point est levé',
    'cet argument', 'cet angle', 'cette réponse', 'cette solution', 'ces garanties', 'ces éléments', 'cette proposition', 'cette piste', 'cette option',
    'cela vous rassure-t-il', 'est-ce que cela vous rassure', 'est-ce que cela vous parle', 'est-ce que cela vous aiderait', 'vous sentez-vous',
    'vous êtes rassuré', 'vous êtes rassurée', 'cela change', 'ça change', 'cela répond', 'ça répond', 'votre doute', 'votre réserve',
    'cela vous éclaire', 'ça vous éclaire', 'éclairé', 'que vous en semble', 'votre sentiment', 'votre avis', 'est-ce que c’est plus clair',
    'cela vous intéresse', 'ça vous intéresse', 'vous intéresse', 'intéressant pour vous', 'utile pour vous', 'pourrait vous convenir',
    'cela correspond', 'ça correspond', 'correspond à vos attentes', 'correspond à ce que', 'défendre', 'le défendre', 'présenter'];

  // Proposer une suite concrète.
  const SUITE = ['je vous propose', 'je propose', 'nous pourrions', 'on pourrait', 'prochaine étape', 'la suite', 'rendez-vous', 'on fixe', 'fixons',
    'fixer', 'on planifie', 'planifions', 'planifier', 'organiser', 'organisons', 'diagnostic', 'démonstration', 'essai', 'visite', 'présentation',
    'rencontre', 'rencontrer', 'cette semaine', 'la semaine prochaine', 'semaine', 'demain', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
    'date', 'créneau', 'créneaux', 'agenda', 'calendrier', 'je vous envoie', 'je vous rappelle le', 'on continue', 'on avance', 'avançons',
    'je peux passer', 'passer vous voir', 'on peut se voir', 'se voir', 'venez', 'on en reparle', 'je reviens vers vous', 'je vous rappelle',
    'je vous recontacte', 'je vous prépare', 'je vous adresse', 'prochain rendez-vous', 'ce soir', 'matin', 'après-midi', 'en fin de journée',
    'quel jour', 'quelle date', 'quel moment', 'ça vous irait', 'cela vous irait', 'vous irait', 'seriez-vous disponible', 'êtes-vous disponible',
    'disponible', 'disponibilité*', 'on se rappelle', 'on se retrouve', 'je bloque', 'je réserve', 'réservons', 'commençons par', 'commencer par',
    'première étape', 'pour avancer', 'pour aller plus loin', 'mettre en place', 'mise en place', 'démarrer', 'démarrons', 'lancer', 'lançons',
    'devis', 'chiffrage', 'chiffrer', 'proposition', 'tester', 'test', 'quelques postes', 'pilote', 'installer', 'livrer', 'commande', 'commander',
    'valider', 'quand', 'plutôt', 'ou bien', 'la veille', 'ensemble', 'voyons', 'voir ensemble', 'revenir à', 'revenons', 'reprenons', 'reprendre',
    'poursuivre', 'poursuivons', 'passons', 'passer à', 'on passe', 'étape suivante', 'je vous montre', 'je peux vous montrer', 'regardons',
    'on regarde', 'on cale', 'calons', 'caler', 'convenir', 'convenons', 'je note', 'je vous inscris', 'inscrire', 'heure', 'heures'];

  const RAISON = ['parce que', 'parce qu*', 'car', 'puisque', 'puisqu*', 'comme', 'ce qui', 'cela permet', 'ça permet', 'permet de', 'permet', 'permettent',
    'afin de', 'pour que', 'donc', 'ainsi', 'c’est pourquoi', 'en effet', 'grâce à', 'cela montre', 'ce qui montre', 'cela évite', 'ce qui évite',
    'alors que', 'tandis que', 'contrairement', 'au lieu de', 'sans', 'pour ne pas', 'de façon à', 'de manière à', 'du coup', 'c’est pour ça',
    'c’est pour cela', 'voilà pourquoi', 'en revanche', 'par contre', 'mais', 'tandis', 'résultat', 'ce qui fait que', 'si bien que', 'de sorte que',
    'cela prouve', 'ce qui prouve', 'cela donne', 'ce qui donne', 'cela crée', 'ce qui crée', 'cela aide', 'ce qui aide', 'en faisant', 'en posant',
    'avant de', 'avant même de', 'en restant', 'en acceptant', 'en proposant', 'en cherchant', 'en demandant', 'en montrant', 'plutôt que', 'pour'];

  const POLITESSE = ['bonjour', 'bonsoir', 'madame', 'monsieur', 'merci', 'je vous remercie', 'merci beaucoup', 'merci infiniment', 's’il vous plaît',
    'svp', 'je vous prie', 'je vous en prie', 'c’est gentil', 'c’est très gentil', 'très aimable', 'aimable', 'volontiers', 'avec plaisir', 'bien sûr',
    'pardon', 'excusez-moi', 'excusez', 'désolé', 'désolée', 'bonne journée', 'bonne fin de journée', 'vous faites bien', 'je comprends', 'entendu',
    'parfait', 'très bien', 'je vous comprends', 'tout à fait', 'pas de souci', 'aucun souci', 'je ne veux pas vous déranger', 'je ne vous dérange pas',
    'si cela ne vous dérange pas', 'si ça ne vous dérange pas', 'pourriez-vous', 'auriez-vous', 'serait-il possible', 'je me permets', 'je vous sollicite',
    'navré', 'navrée', 'c’est noté', 'je vous écoute', 'vous avez raison', 'c’est normal', 'merci pour', 'merci de'];

  // Le prospect manque de temps : un autre moment, précis.
  const MOMENT = ['quel moment', 'quel serait le meilleur moment', 'meilleur moment', 'à quel moment', 'quand', 'quand puis-je', 'quand pourrais-je',
    'quel jour', 'quelle heure', 'à quelle heure', 'quel créneau', 'créneau', 'créneaux', 'plutôt', 'ou plutôt', 'demain', 'ce soir', 'cet après-midi',
    'matin', 'matinée', 'après-midi', 'fin de journée', 'en fin de journée', 'début de semaine', 'fin de semaine', 'en début', 'la semaine prochaine',
    'semaine prochaine', 'cette semaine', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'heure', 'heures', 'midi', 'rappeler', 'rappelle',
    'rappellerai', 'je vous rappelle', 'vous rappeler', 'recontacter', 'je vous recontacte', 'disponible', 'disponibilité*', 'libre', 'plus tard',
    'un autre moment', 'à un autre moment', 'moment plus propice', 'plus propice', 'plus favorable', 'plus calme', 'convient mieux', 'conviendrait',
    'vous conviendrait', 'vous irait', 'vous arrange', 'arrangerait', 'agenda', 'rendez-vous', 'rendez-vous téléphonique', 'date', 'prochainement',
    'dans la journée', 'dans la semaine', 'à votre convenance', 'quand vous voulez', 'quand cela vous arrange', 'quand ça vous arrange', 'caler',
    'on cale', 'fixer', 'on fixe', 'bloquer', 'je bloque', 'réserver', 'dix minutes', 'quinze minutes', 'cinq minutes', 'un quart d’heure', 'minutes'];

  /* ── Pièges communs ─────────────────────────────────────────────────── */

  const PIEGE_CONTREDIRE = { nom: 'Le client est contredit', points: 1,
    mots: ['vous avez tort', 'vous vous trompez', 'c’est faux', 'mais non', 'non mais', 'ce n’est pas cher', 'c’est pas cher', 'pas cher du tout',
      'n’importe quoi', 'je comprends mais', 'oui mais', 'certes mais', 'détrompez-vous', 'vous exagérez', 'vous auriez dû', 'c’est une erreur',
      'pas du tout cher', 'au contraire', 'pas vraiment cher', 'c’est n’importe quoi', 'vous n’avez pas compris'],
    conseil: 'On accueille la remarque du client, on ne la discute pas.' };

  const PIEGE_MINIMISE = { nom: 'Le ressenti est minimisé', points: 1,
    mots: ['tous mes clients me disent', 'tous mes clients disent', 'tout le monde dit', 'tout le monde me dit', 'ne vous inquiétez pas',
      'ne vous en faites pas', 'c’est rien', 'ce n’est rien', 'c’est pas grave', 'ce n’est pas grave', 'au début', 'ça passe', 'vous verrez bien'],
    conseil: 'Prenez la remarque au sérieux au lieu de la balayer.' };

  const PIEGE_PRESSION = { nom: 'Pression sur le client', points: 1,
    mots: ['si vous ne prenez pas', 'le prix va augmenter', 'les prix vont augmenter', 'dernière chance', 'aujourd’hui seulement', 'offre limitée',
      'il faut vous décider', 'décidez-vous', 'dépêchez', 'maintenant ou jamais', 'le moment ou jamais', 'vous allez le regretter', 'vous allez rater',
      'signez maintenant', 'il faut signer', 'avant ce soir', 'il ne reste que', 'il faut absolument', 'vous devez absolument', 'de toute façon',
      'c’est à prendre ou à laisser', 'sinon', 'tant pis pour vous'],
    conseil: 'On rassure et on fait avancer, on ne force pas la main.' };

  const PIEGE_BRADER = { nom: 'Le prix est bradé', points: 1,
    mots: ['remise', 'rabais', 'ristourne', 'geste commercial', 'pour cent de remise', 'baisser le prix', 'baisse le prix', 'je baisse', 'prix spécial',
      'un effort sur le prix', 'faire un effort', 'on n’en parle plus', 'promotion', 'promo', 'je vous fais un prix', 'je vous fais 5', 'je vous fais 10',
      'je vous fais 15', 'je vous fais 20', 'prix cassé', 'réduction de prix', 'une réduction', 'je vous accorde'],
    conseil: 'On montre la valeur avant de parler de prix : céder tout de suite affaiblit l’offre.' };

  const PIEGE_INSISTER = { nom: 'Le commercial insiste', points: 1,
    mots: ['ça ne prendra que', 'cela ne prendra que', 'ça ne prend que', 'que deux minutes', 'juste deux minutes', 'deux petites minutes',
      'une petite minute', 'juste une minute', 'je n’en ai pas pour longtemps', 'ça va aller vite', 'ça va être rapide', 'promis', 'je vous promets',
      'laissez-moi juste', 'écoutez-moi juste', 'il faut absolument', 'vous devez m’écouter', 'c’est très important', 'c’est urgent', 'passez-le moi',
      'passez-moi', 'je dois lui parler', 'il faut que je lui parle', 'c’est personnel', 'il m’attend'],
    conseil: 'Respectez la contrainte de la personne : insister la fait se fermer.' };

  const PIEGE_DENIGRER = { nom: 'Le concurrent est dénigré', points: 1,
    mots: ['on est mieux', 'on est bien mieux', 'nous sommes mieux', 'nous sommes meilleurs', 'on est meilleurs', 'meilleurs que', 'mieux qu’eux',
      'mieux que eux', 'moins chers qu', 'on est moins cher', 'nous sommes moins chers', 'ils sont nuls', 'nul', 'nuls', 'mauvais', 'médiocre',
      'la concurrence est', 'arnaque', 'ils vous arnaquent', 'vous méritez mieux', 'votre fournisseur est', 'changez de fournisseur', 'vous perdez'],
    conseil: 'Ne critiquez pas le concurrent : intéressez-vous à ce qui marche et à ce qui pourrait être amélioré.' };

  const PIEGE_RACCROCHER = { nom: 'L’échange s’arrête là', points: 1,
    mots: ['au revoir', 'je raccroche', 'à bientôt', 'bonne fin de journée', 'je vous envoie ça', 'je vous envoie la doc', 'je vous l’envoie tout de suite',
      'je vous envoie une brochure', 'je vous laisse réfléchir', 'rappelez-moi quand', 'on verra', 'revenez vers moi', 'tenez-moi au courant',
      'je vous rappelle dans un mois', 'dans un mois', 'quand vous voulez'],
    conseil: 'Gardez la main : une question ou une suite précise, avant de conclure.' };

  const PIEGE_ARGUMENTAIRE = { nom: 'Un argumentaire au standard', points: 1,
    mots: ['garantie', '5 ans', 'cinq ans', '30 jours', 'trente jours', '1 200', '1200', 'promotion', 'offre exceptionnelle', 'nos produits sont',
      'notre catalogue', 'nos tarifs', 'le meilleur', 'leader', 'numéro un', 'prix imbattable', 'nos prix'],
    conseil: 'Au standard, le sujet tient en quelques mots : l’argumentaire est pour le décideur.' };

  /* ── Critères réutilisés ────────────────────────────────────────────── */

  const accueil = { nom: 'Accueillir sans contredire', mots: ACCUEIL, conseil: 'Commencez par montrer que vous avez entendu : « Je comprends… ».' };
  const raison = { nom: 'Une explication', mots: RAISON, points: 1, conseil: 'Dites pourquoi : « parce que… », « ce qui permet… ».' };
  const avecQuestion = { regle: 'avecQuestion', nom: 'Une question au client', points: 1 };

  /* ── Les quatre objections du fil rouge (S1 1.6 et 1.7) ─────────────── */

  const OBJECTIONS = {
    // « C'est trop cher. »
    prix: {
      sujet: ['prix', 'cher', 'chère', 'coût', 'coûte', 'coûteux', 'coûteuse', 'tarif*', 'budget*', 'investissement', 'investir', 'dépense*', 'dépenser',
        'montant', 'somme', 'argent', 'élevé', 'élevée', 'onéreu*', 'payer', 'facture', 'enveloppe', 'moyens', 'financ*', 'en vaut la peine',
        'vaut le coup', 'vaut la peine', 'rentab*', 'valeur', 'rapport qualité', 'trop cher', 'trésorerie', 'portefeuille', 'effort financier',
        'pour votre argent', 'en avoir pour', 'investissement', 'retour', 'le jeu en vaut'],
      cause: ['par rapport à quoi', 'par rapport à', 'comparé*', 'compar*', 'autre offre', 'autre devis', 'autre proposition', 'concurren*', 'fournisseur*',
        'budget*', 'enveloppe', 'prévu', 'prévue', 'prévoyiez', 'combien', 'montant', 'quel prix', 'attendiez', 'vous attendiez', 'imaginiez', 'pensiez',
        'trop cher', 'cher', 'élevé', 'vous fait dire', 'quel élément', 'quelle partie', 'quel aspect', 'exactement', 'précisément', 'valeur',
        'investissement', 'rentab*', 'référence', 'idée', 'ordre de grandeur', 'fourchette', 'prix', 'coût', 'tarif*', 'dépense*', 'moyens', 'limite',
        'plafond', 'maximum', 'à quoi', 'avec quoi', 'déjà vu', 'ailleurs', 'marché', 'habitude', 'payez', 'payiez', 'actuellement', 'aujourd’hui'],
      reponse: ['garanti*', '5 ans', 'cinq ans', 'essai*', '30 jours', 'trente jours', 'sans risque', 'vérifier', 'tester', 'essayer', 'location', 'louer',
        'leasing', 'étaler', 'étalement', 'mensualité*', 'par mois', 'paiement*', 'plusieurs fois', 'financement', 'valeur', 'durée', 'durable',
        'durabilité', 'dure', 'longtemps', 'rentab*', 'retour sur investissement', 'économ*', 'amorti*', 'coût par', 'par jour', 'par an', 'sur l’année',
        'arrêts', 'absences', 'tms', 'santé', 'qualité', 'gagner', 'gagne', 'représente', 'clients constatent', 'nos clients', 'confort', 'productivité',
        'moins de', 'baisse', 'sur la durée', 'à long terme', 'long terme', 'solide', 'résistant', 'robuste', 'remplacer', 'remplacement', 'vous évite',
        'évite', 'éviter', 'réparation*', 'entretien', 'sav', 'diagnostic', 'adapté*', 'ajust*', 'sur mesure', 'premier prix', 'entrée de gamme'],
      preuve: ['garanti*', '5 ans', 'cinq ans', 'essai*', '30 jours', 'trente jours', 'clients', 'témoignage*', 'étude', 'chiffr*', 'baisse', 'arrêts',
        'absences', 'économ*', 'retour sur investissement', 'rentab*', 'comparatif', 'calcul', 'simulation', 'devis', 'durée de vie', 'remplacement',
        'références', 'avis', 'test', 'tester', 'location']
    },
    // « Nos chaises actuelles suffisent. »
    chaises: {
      sujet: ['chaise*', 'siège*', 'fauteuil*', 'mobilier', 'équipement*', 'équipé*', 'matériel', 'actuel*', 'suffi*', 'convien*', 'satisfait*',
        'fonctionne', 'marche bien', 'ça va', 'ça marche', 'en place', 'pour l’instant', 'pour le moment', 'pas de problème', 'aucun problème',
        'personne ne se plaint', 'plainte*', 'se plaint', 'pas besoin', 'besoin', 'changer', 'changement', 'renouveler', 'dépenser', 'dépense*',
        'investir', 'priorité', 'urgent', 'vrai problème', 'tant que', 'ce qui marche', 'ce qui fonctionne', 'utile', 'nécessaire', 'pas la peine',
        'au quotidien', 'tous les jours', 'question ne se pose', 'ne se pose pas', 'statu quo', 'habitude*', 'bureaux', 'postes'],
      cause: ['dos', 'mal', 'maux', 'douleur*', 'gêné*', 'gêne', 'inconfort*', 'confort*', 'fatigue*', 'fatigué*', 'plainte*', 'se plaignent', 'arrêt*',
        'absence*', 'absentéisme', 'maladie', 'tms', 'troubles', 'salarié*', 'collaborateur*', 'équipe*', 'personnel', 'employé*', 'postes', 'poste',
        'assis', 'journée', 'âge', 'depuis quand', 'depuis combien', 'combien de temps', 'achet*', 'renouvel*', 'satisfait*', 'retours', 'remontées',
        'ressenti', 'ergonom*', 'utilisateurs', 'télétravail', 'productivité', 'concentration', 'santé', 'bien-être', 'usure', 'usé*', 'vieux',
        'ancien*', 'anciennes', 'état', 'réglage*', 'réglable*', 'médecin', 'médecine du travail', 'kiné*', 'vous arrive-t-il', 'remarqué',
        'constaté', 'observé', 'entendu', 'qu’est-ce qui vous fait dire', 'vous fait dire', 'critère*', 'comment', 'quel', 'quels', 'quelle'],
      reponse: ['prévention', 'prévenir', 'éviter', 'évite', 'anticiper', 'avant', 'tms', 'troubles', 'dos', 'santé', 'arrêt*', 'absence*', 'absentéisme',
        'confort*', 'bien-être', 'productivité', 'diagnostic*', 'étude ergonomique', 'étude', 'postes à risque', 'à risque', 'cibl*', 'quelques postes',
        'progressiv*', 'coût d’un arrêt', 'coûte', 'économ*', 'rentab*', 'essai*', 'tester', 'essayer', 'gratuit*', 'sans engagement', 'clients constatent',
        'nos clients', 'baisse', 'moins', 'fatigue', 'concentration', 'efficacité', 'performance', 'motivation', 'image', 'attractivité', 'fidéli*',
        'recrutement', 'obligation*', 'employeur', 'responsabilité', 'loi', 'pénibilité', 'risque*', 'durée', 'garanti*', 'objectiver', 'mesurer',
        'faire le point', 'état des lieux', 'audit', 'évaluer', 'repérer', 'identifier'],
      preuve: ['baisse', 'arrêts', 'absences', 'absentéisme', 'tms', 'clients', 'étude', 'diagnostic', 'chiffr*', 'témoignage*', 'références', 'résultat*',
        'constat*', 'moins', 'réduction', 'mesur*', 'médecin', 'ergonome*', 'garanti*', 'essai*', 'avis']
    },
    // « Je dois voir avec la direction. »
    direction: {
      sujet: ['direction', 'directeur', 'directrice', 'dirigeant*', 'patron', 'hiérarchie', 'responsable*', 'décision', 'décider', 'décide', 'plusieurs',
        'à plusieurs', 'ensemble', 'valider', 'validation', 'accord', 'feu vert', 'présenter', 'défendre', 'convaincre', 'en parler', 'soumettre',
        'consulter', 'arbitr*', 'comité', 'associé*', 'gérant*', 'seul', 'processus', 'projet', 'éléments', 'dossier', 'arguments', 'argumentaire',
        'supérieur*', 'chef', 'boss', 'manager', 'interne', 'en interne', 'circuit', 'collectif', 'collective', 'concerter', 'concertation', 'avis',
        'appuyer', 'porter', 'solides', 'chiffres', 'chiffr*', 'budget'],
      cause: ['compterait', 'compte', 'important', 'importe', 'priorité*', 'critère*', 'attentes', 'attend', 'attendra', 'regarde', 'regardera',
        'sensible', 'convaincre', 'convainc*', 'préoccup*', 'enjeu*', 'objectif*', 'qui décide', 'qui d’autre', 'comment se passe', 'comment se prend',
        'décision', 'quand', 'délai', 'éléments', 'informations', 'besoin', 'de quoi', 'arguments', 'chiffres', 'budget', 'question*', 'objection*',
        'réserve*', 'votre avis', 'vous-même', 'personnellement', 'vous en pensez', 'vous pensez', 'intéresse', 'retiendra', 'retenir', 'valoriser',
        'mettre en avant', 'peser', 'pèse', 'freins', 'frein', 'risque', 'direction', 'votre directeur', 'votre directrice', 'ils', 'elle', 'eux'],
      reponse: ['argumentaire', 'argument*', 'chiffr*', 'dossier', 'document*', 'synthèse', 'note', 'présentation', 'présenter', 'présente', 'rencontrer',
        'rendez-vous', 'réunion', 'venir', 'accompagner', 'accompagne', 'à vos côtés', 'avec vous', 'support', 'devis', 'proposition', 'étude',
        'retour sur investissement', 'rentab*', 'économ*', 'références', 'témoignage*', 'cas client*', 'exemple*', 'clients', 'quelques minutes',
        'court*', 'brève', 'répondre', 'préparer', 'je vous prépare', 'je prépare', 'essai', 'diagnostic', 'récapitulatif', 'résumé', 'fiche', 'tableau',
        'comparatif', 'visio*', 'appel', 'téléphone', 'questions', 'défendre', 'convaincre', 'appuyer', 'aider', 'faciliter', 'outils', 'éléments',
        'transmettre', 'envoyer', 'je vous envoie', 'par mail', 'e-mail', 'mail', 'courriel'],
      preuve: ['argumentaire', 'chiffr*', 'retour sur investissement', 'économ*', 'rentab*', 'baisse', 'arrêts', 'absences', 'étude', 'références',
        'témoignage*', 'clients', 'garanti*', 'essai*', 'devis', 'synthèse', 'comparatif', 'cas client*', 'résultat*']
    },
    // « J'ai été déçu par un fournisseur. »
    decu: {
      sujet: ['déçu*', 'déception*', 'décevant*', 'expérience', 'mauvaise expérience', 'fournisseur*', 'prestataire*', 'traces', 'méfi*', 'confiance',
        'prudent*', 'prudence', 'échaudé*', 'refroidi*', 'revivre', 'même situation', 'se reproduise', 'reproduire', 'recommencer', 'éviter', 'risque',
        'peur', 'crainte', 'craignez', 'certain', 'certaine', 'sûr', 'sûre', 'garanties', 'promesses', 'passé', 'arrivé', 'mal passé', 'problème*',
        'mauvais souvenir', 'souvenir', 'marqué', 'blessé', 'vigilant*', 'vigilance', 'assurance*', 'assurer', 'rassur*', 'fiable', 'fiabilité',
        'sérieux', 'tenir', 'tiendrons', 'parole', 'engagements', 'pas les mêmes', 'erreur*'],
      cause: ['mal passé', 's’est passé', 'passé', 'arrivé', 'quoi', 'problème*', 'souci*', 'difficulté*', 'déçu*', 'déception', 'attentes', 'manqué',
        'manque', 'retard*', 'délai*', 'livraison', 'qualité', 'sav', 'service', 'suivi', 'réactivité', 'joignable', 'réponse', 'promesse*',
        'engagement*', 'casse', 'panne*', 'à quel niveau', 'sur quel point', 'précisément', 'exactement', 'aimeriez', 'éviter', 'attendez', 'important',
        'compte', 'faudrait', 'raconter', 'racontez', 'expliquer', 'expliquez', 'comment', 'quel', 'quelle', 'quels', 'quelles', 'que s’est-il passé',
        'qu’est-ce qui', 'qu’est-ce que', 'aujourd’hui', 'différemment', 'idéal', 'rassurer', 'rassurerait', 'besoin', 'garanties', 'confiance'],
      reponse: ['garanti*', '5 ans', 'cinq ans', 'sav', 'service après-vente', 'après-vente', '48 h', '48h', '48 heures', 'sous 48', 'essai*', '30 jours',
        'satisfait ou remboursé', 'rembours*', '1 200', '1200', 'entreprises équipées', 'déjà équipées', 'références', 'référence', 'témoignage*',
        'avis', 'clients', 'interlocuteur', 'contact unique', 'suivi', 'engagement*', 'engage', 'contrat', 'par écrit', 'écrit', 'transparence',
        'transparent', 'joignable', 'réactif', 'réactivité', 'qualité', 'certifi*', 'sans risque', 'tester', 'essayer', 'vérifier', 'preuve*',
        'prouver', 'démontrer', 'visite', 'contacter', 'appeler', 'rencontrer', 'parler à', 'dédié', 'dédiée', 'personnel', 'personnalisé', 'proximité',
        'local', 'délai*', 'pénalité*', 'clause*', 'progressiv*', 'petit volume', 'quelques postes', 'pilote', 'commencer petit'],
      preuve: ['garanti*', '5 ans', 'cinq ans', 'sav', '48', 'essai*', '30 jours', 'satisfait ou remboursé', 'rembours*', '1 200', '1200', 'entreprises',
        'références', 'témoignage*', 'avis', 'clients', 'contrat', 'engagement*', 'certifi*', 'note*', 'recommandation*', 'contact*']
    }
  };

  /* ── S1 1.6 · Une phrase par étape, pour l'objection choisie ────────── */

  const SIX = ['chaises', 'prix', 'direction', 'decu'];

  function sixBlocs(id, field) {
    const o = OBJECTIONS[id];
    return [
      { titre: 'Accueillir', champs: [field(0)],
        criteres: [
          { ...accueil, points: 3 },
          { nom: 'Le sujet du client repris', mots: o.sujet, points: 1, conseil: 'Reprenez en quelques mots ce que vient de dire le client.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_CONTREDIRE, PIEGE_MINIMISE, PIEGE_BRADER] },
      { titre: 'Questionner', champs: [field(1)],
        criteres: [
          { nom: 'Une question qui explore', mots: QUESTION, points: 2, conseil: 'Posez une vraie question : « Qu’est-ce qui vous fait dire… ? », « Par rapport à quoi… ? ».' },
          { nom: 'Elle cherche la cause', mots: o.cause, points: 2, conseil: 'Visez ce qui se cache derrière l’objection, sans suggérer la réponse.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_CONTREDIRE, PIEGE_BRADER] },
      { titre: 'Reformuler', champs: [field(2)],
        criteres: [
          { nom: 'Une reformulation', mots: REFORMULATION, points: 3, conseil: 'Reprenez ce que dit le client : « Si je comprends bien… ».' },
          { nom: 'Ses mots repris', mots: uniq(o.sujet, o.cause), points: 2, conseil: 'Reprenez le sujet exact de son objection.' },
          { nom: 'Une validation demandée', mots: VALIDATION, points: 1, conseil: 'Faites valider : « … c’est bien cela ? ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_CONTREDIRE, PIEGE_MINIMISE] },
      { titre: 'Traiter', champs: [field(3)],
        criteres: [
          { nom: 'Un élément concret', mots: uniq(PREUVE, CHIFFRES), points: 3, conseil: 'Appuyez-vous sur un fait : une garantie, un essai, un chiffre, un témoignage.' },
          { nom: 'Une réponse à son objection', mots: o.reponse, points: 2, conseil: 'Répondez à ce qui gêne vraiment ce client.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_BRADER, PIEGE_PRESSION, PIEGE_DENIGRER] },
      { titre: 'Contrôler', champs: [field(4)],
        criteres: [
          { nom: 'Le doute est vérifié', mots: CONTROLE, points: 3, conseil: 'Demandez si votre réponse a levé le doute : « Est-ce que cela vous rassure ? ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_PRESSION] },
      { titre: 'Enchaîner', champs: [field(5)],
        criteres: [
          { nom: 'Une suite concrète', mots: SUITE, points: 3, conseil: 'Proposez une étape précise : un essai, un rendez-vous, un chiffrage.' },
          { nom: 'Un moment ou un choix', mots: uniq(MOMENT, ['ou', 'plutôt', 'ensemble', 'la veille', 'quand']), points: 1, conseil: 'Proposez une date ou un choix entre deux options.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_PRESSION, PIEGE_BRADER, { ...PIEGE_RACCROCHER, mots: ['je vous laisse réfléchir', 'rappelez-moi quand', 'on verra', 'revenez vers moi', 'tenez-moi au courant', 'dans un mois'] }] }
    ];
  }

  /* ── S1 1.7 · Une fiche par objection ───────────────────────────────── */

  const FICHES = ['prix', 'chaises', 'direction', 'decu'];
  const FICHE_TITRES = ['« C’est trop cher »', '« Nos chaises actuelles suffisent »', '« Je dois voir avec la direction »', '« J’ai été déçu par un fournisseur »'];

  const ficheBlocs = (id, i) => {
    const o = OBJECTIONS[id];
    return [
      { titre: `${FICHE_TITRES[i]} · la question`, champs: [`question${i}`],
        criteres: [
          { nom: 'Une question qui explore', mots: QUESTION, points: 2, conseil: 'Une vraie question, de préférence ouverte : « Qu’est-ce qui… ? », « Par rapport à quoi… ? ».' },
          { nom: 'Elle creuse ce qui gêne', mots: o.cause, points: 2, conseil: 'Visez la cause de l’objection.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_CONTREDIRE] },
      { titre: `${FICHE_TITRES[i]} · la réponse et sa preuve`, champs: [`answer${i}`, `proof${i}`],
        criteres: [
          { nom: 'Une réponse à l’objection', mots: o.reponse, points: 3, conseil: 'Répondez à ce qui gêne vraiment le client.' },
          { nom: 'Une preuve vérifiable', mots: uniq(o.preuve, PREUVE, CHIFFRES), points: 3, conseil: 'Un fait que le client peut vérifier : un essai, une garantie, un chiffre, un témoignage.' },
          { nom: 'Un ton qui accueille', mots: ACCUEIL, points: 1, conseil: 'Une réponse qui commence par accueillir passe mieux : « Je comprends… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_BRADER, PIEGE_CONTREDIRE, PIEGE_DENIGRER, PIEGE_PRESSION] }
    ];
  };

  /* ── S1 1.5 et S2 2.5 · Justifier un choix ──────────────────────────── */

  const METHODE = ['accueil*', 'accueille', 'écoute*', 'écouter', 'question*', 'questionne*', 'interroge*', 'creuse*', 'creuser', 'reformul*', 'preuve*',
    'prouve', 'essai', 'rassur*', 'contrôl*', 'vérifie*', 'valide*', 's’assure', 'étape*', 'méthode', 'six étapes', 'par rapport à quoi', 'traite*',
    'enchaîn*', 'empathie', 'empathique', 'bienveillan*', 'je comprends', 'demande', 'demander', 'garantie', 'baisse des arrêts', 'chiffre*', 'concret*',
    'argumente', 'argument*', 'bénéfice*', 'valeur', 'valorise*', 'comprend', 'comprendre', 'cherche', 'cherche l’origine', 'origine', 'avant de répondre', 'cause', 'diagnostique', 'creuse l’objection'];

  /* ── Les grilles ────────────────────────────────────────────────────── */

  window.ATELIER_GRILLES = {

    // S1 1.4 · Ce qui n'est pas dit : l'objection silencieuse, puis la question.
    's1-1.4': { integre: true, blocs: [
      { titre: 'L’objection silencieuse probable', champs: ['hypothesis'],
        criteres: [
          { nom: 'Un frein probable nommé', points: 3, conseil: 'Nommez ce qui pourrait le retenir : le prix, un doute sur l’utilité, une autre personne à consulter, la peur de se tromper…',
            mots: ['prix', 'budget*', 'coût*', 'cher', 'chère', 'argent', 'tarif*', 'moyens', 'financ*', 'trésorerie', 'dépense*', 'investissement', 'investir',
              'rentab*', 'payer', 'montant', 'onéreu*', 'décider seul', 'seul', 'seule', 'direction', 'hiérarchie', 'patron', 'chef', 'supérieur*', 'associé*',
              'conjoint*', 'femme', 'mari', 'épouse', 'banque', 'banquier', 'comptable', 'en parler', 'valider', 'validation', 'accord', 'feu vert', 'qui décide',
              'interne', 'autorisation', 'consulter', 'demander à', 'utile', 'utilité', 'besoin', 'pas convaincu', 'pas convaincue', 'convaincu*', 'intérêt',
              'pertinent*', 'nécessaire', 'pas sûr', 'pas sûre', 'doute*', 'peur', 'crainte', 'craint', 'se tromper', 'erreur', 'regretter', 'regret', 'risque*',
              'inquiet', 'inquiète', 'inquiétude', 'engager', 'engagement', 'comparer', 'compare', 'comparaison', 'concurren*', 'autre offre', 'autre devis',
              'ailleurs', 'autres fournisseurs', 'priorité*', 'prioritaire', 'urgence', 'moment', 'calendrier', 'pas le temps', 'débordé*', 'occupé*', 'charge',
              'plus tard', 'mise en place', 'installation', 'compliqué', 'complexe', 'changement', 'changer', 'habitudes', 'confiance', 'méfian*', 'mauvaise expérience',
              'déçu*', 'fournisseur', 'informations', 'renseignements', 'détails', 'précisions', 'pas compris', 'flou', 'qualité', 'produit', 'offre', 'solution',
              'efficacité', 'fonctionne', 'marche', 'adapté*', 'correspond', 'design', 'couleur', 'style', 'place', 'taille', 'délai*', 'livraison', 'stock'] },
          { nom: 'Une hypothèse, pas une certitude', points: 1, conseil: 'Restez prudent : « peut-être », « sans doute », « il se peut que… ».',
            mots: ['peut-être', 'sans doute', 'probablement', 'probable', 'sûrement', 'il se peut', 'possible', 'possiblement', 'j’imagine', 'je pense', 'je suppose',
              'je crois', 'il semble', 'semble', 'on dirait', 'vraisemblablement', 'éventuellement', 'ou alors', 'ou bien', 'soit', 'plusieurs', 'hypothèse',
              'pourrait', 'pourraient', 'peut cacher', 'peut masquer', 'il est possible', 'il hésite', 'hésit*', 'n’ose pas', 'ne dit pas', 'ne veut pas dire',
              'pas exprimé', 'non exprimé', 'masque', 'cache', 'derrière', 'en réalité', 'prétexte', 'dérobade', 'excuse', 'vrai motif', 'vraie raison',
              'vrai frein', 'vraie objection', 'retient', 'freine', 'bloque', 'gêne', 'ou', 'ose pas', 'silenc*', 'non dit', 'pas dit', 'tait', 'taire'] }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'La question pour la révéler', champs: ['question'],
        criteres: [
          { nom: 'Une question ouverte', mots: QUESTION_OUVERTE, points: 2, conseil: 'Commencez par « Qu’est-ce qui… », « Comment… », « Quel… » : le client peut développer.' },
          { nom: 'Elle vise ce qui le retient', points: 2, conseil: 'Demandez ce qui le fait hésiter, sans proposer vous-même la réponse.',
            mots: ['hésit*', 'freine', 'frein*', 'retient', 'retenir', 'bloque', 'bloquer', 'gêne', 'gêner', 'inquiète', 'inquiéter', 'préoccupe', 'manque', 'manquerait',
              'convaincre', 'convaincu*', 'doute*', 'réserve*', 'point*', 'aspect*', 'élément*', 'reste', 'empêche', 'décider', 'décision', 'réfléchir', 'réflexion',
              'attendre', 'pour vous décider', 'aider à décider', 'faire avancer', 'avancer', 'aider au mieux', 'budget', 'moment', 'prix',
              'question*', 'interrogation*', 'pas encore', 'faudrait', 'il vous faudrait', 'besoin', 'rassurer', 'rassurerait', 'vous fait dire', 'vous amène',
              'souhaitez vérifier', 'vérifier', 'comparer', 'consulter', 'en parler', 'qui d’autre', 'valider', 'autre chose', 'votre avis', 'pensez', 'ressentez',
              'sentiment', 'réticen*', 'craintes', 'crainte', 'conditions', 'condition', 'à ce stade', 'pour l’instant', 'prêt', 'prête', 'oui'] },
          { nom: 'Le lien est gardé', points: 1, conseil: 'Une marque d’écoute avant la question : « Bien sûr. Pour vous aider au mieux… ».',
            mots: uniq(ACCUEIL, ['pour vous aider', 'pour bien faire', 'pour vous accompagner', 'pour mieux vous conseiller', 'pour être sûr', 'pour être sûre',
              'afin de', 'pour vous aider au mieux', 'pour mieux vous aider', 'je respecte', 'prenez le temps', 'aucune pression', 'sans pression', 'si je peux',
              'puis-je', 'je peux vous demander', 'me permettez-vous', 'permettez-moi', 'pour avancer ensemble', 'pour que vous', 'franchement', 'sincèrement',
              'simplement', 'juste pour comprendre', 'pour comprendre', 'si ce n’est pas indiscret']) }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [
          { nom: 'La réponse est suggérée', points: 1, mots: ['c’est le prix', 'c’est trop cher pour vous', 'vous n’avez pas le budget', 'en fait vous', 'je pense que vous',
            'c’est à cause du prix', 'c’est une question de prix', 'c’est une question d’argent'], conseil: 'Laissez le client nommer lui-même son frein.' },
          { nom: 'Le report est accepté', points: 1, mots: ['je vous rappelle dans', 'rappelez-moi', 'on verra', 'je vous laisse réfléchir', 'dans un mois', 'revenez vers moi'],
            conseil: 'Accepter un report vague fait perdre la main : cherchez d’abord le vrai frein.' },
          PIEGE_PRESSION
        ] }
    ] },

    // S1 1.5 · Face au « C'est trop cher » : pourquoi la réponse 2.
    's1-1.5': { integre: true, blocs: [
      { titre: 'Votre justification', champs: ['why'],
        criteres: [
          { nom: 'Les étapes de la méthode', mots: METHODE, min: 2, points: 3, conseil: 'Citez les étapes que suit la bonne réponse : accueillir, questionner, reformuler, traiter, contrôler.' },
          { nom: 'Le client compris avant de répondre', points: 2, conseil: 'Dites que la réponse cherche la vraie cause : « par rapport à quoi ? ».',
            mots: ['cause', 'causes', 'vraie raison', 'vrai frein', 'vraie objection', 'raison', 'comprendre', 'comprend', 'besoin*', 'par rapport à quoi', 'par rapport à',
              'ce qui le gêne', 'ce qui gêne', 'ce qui bloque', 'ce qui le bloque', 'point de vue', 'attentes', 'préoccupation', 'inquiétude', 'cherche à savoir',
              's’intéresse', 'intéresse', 'écoute', 'écouter', 'pose des questions', 'pose une question', 'questionne', 'creuse', 'creuser', 'cherche', 'découvrir',
              'savoir', 'pourquoi', 'origine', 'source', 'fond', 'le client', 'client', 'au client', 'sa remarque', 'son objection', 'ressenti', 'budget',
              'enveloppe', 'autre offre', 'valider', 'valide', 'vérifie', 'adhésion', 'implique', 'dialogue', 'échange'] },
          { nom: 'Les erreurs de l’autre réponse', points: 2, conseil: 'Dites aussi ce que rate la réponse 1 : elle se justifie et brade le prix.',
            mots: ['remise', 'réduction', 'rabais', 'ristourne', '15', 'brade', 'brader', 'bradé', 'baisse', 'baisser', 'cède', 'céder', 'négoci*', 'justifie',
              'se justifie', 'justifier', 'justification', 'défend', 'défensive', 'sur la défensive', 'matériaux', 'caractéristiques', 'technique', 'aucune question',
              'pas de question', 'ne pose pas', 'ne pose aucune', 'n’écoute pas', 'n’écoute', 'impose', 'dévalorise', 'dévaloriser', 'valeur', 'crédibilité',
              'crédible', 'réponse 1', 'commercial 1', 'première réponse', 'premier commercial', 'l’autre', 'autre réponse', 'trop vite', 'tout de suite',
              'directement', 'immédiatement', 'monologue', 'parle de lui', 'parle du produit', 'produit', 'prix', 'pression', 'pousse', 'force', 'prématuré*',
              'effort', 'conclure', 'vendre'] },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S1 1.6 · Répondre en 6 étapes : la grille dépend de l'objection choisie.
    's1-1.6': { integre: true, parCas: (index, field = i => `phrase${i}`) => ({ blocs: sixBlocs(SIX[index] || SIX[0], field) }) },

    // S1 1.7 · Ma bibliothèque d'objections : question, puis réponse et preuve.
    's1-1.7': { integre: true, blocs: FICHES.flatMap(ficheBlocs) },

    // S2 2.3 · Franchir le standard : deux tours de parole.
    's2-2.3': { integre: true, blocs: [
      { titre: 'Tour 1 · « C’est à quel sujet ? »', champs: ['reply0'],
        criteres: [
          { nom: 'Courtois', mots: POLITESSE, points: 2, conseil: 'Bonjour, merci : l’accueil est un allié, pas un obstacle.' },
          { nom: 'Le sujet en quelques mots', points: 2, conseil: 'Dites l’objet de l’appel simplement : l’aménagement des postes, le confort des équipes…',
            mots: ['aménagement', 'aménager', 'ergonom*', 'mobilier', 'meuble*', 'siège*', 'chaise*', 'fauteuil*', 'bureau', 'bureaux', 'postes', 'poste de travail',
              'confort', 'équipement*', 'équiper', 'santé', 'dos', 'tms', 'bien-être', 'au sujet de', 'au sujet du', 'concernant', 'à propos', 'il s’agit',
              'c’est au sujet', 'je vous appelle pour', 'j’appelle pour', 'je l’appelle', 'je souhaite lui parler', 'je souhaiterais lui parler', 'parler de',
              'services généraux', 'locaux', 'espace*', 'conditions de travail', 'qualité de vie', 'prévention', 'salariés', 'équipes', 'collaborateurs',
              'projet', 'sujet', 'renouvellement', 'installation', 'matériel'] },
          { nom: 'Une présentation', mots: uniq(['je suis', 'je m’appelle', 'mon nom est', 'ergolys', 'de la société', 'de chez', 'de l’entreprise', 'commercial',
            'commerciale', 'conseiller', 'conseillère', 'chargé', 'chargée', 'je représente', 'je travaille chez', 'je travaille pour', 'ici', 'à l’appareil',
            '[prénom', 'prénom', 'votre interlocuteur']), points: 1, conseil: 'Dites qui vous êtes et pour quelle entreprise.' },
          { nom: 'Une issue simple proposée', mots: uniq(MOMENT, ['qui d’autre', 'une autre personne', 'quelqu’un d’autre', 'la bonne personne', 'bon interlocuteur',
            'qui s’occupe', 'qui suit', 'qui gère', 'qui est en charge', 'en charge', 'adresse', 'mail', 'e-mail', 'courriel', 'laisser un message', 'message',
            'passer par vous', 'par vous', 'me conseiller', 'm’orienter', 'orienter', 'me dire', 'pourriez-vous me dire', 'pouvez-vous me dire', 'joindre',
            'le joindre', 'la joindre', 'c’est bien lui', 'c’est bien elle', 'est-ce bien lui', 'ligne directe', 'numéro', 'coordonnées', 'préférez-vous',
            'transmettre', 'rendez-vous', 'son assistant', 'son assistante']), points: 2, conseil: 'Finissez par une question facile : un moment, un nom, une adresse.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion, { regle: 'maxMots:60', nom: 'Bref', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_INSISTER] },
      { titre: 'Tour 2 · « Il est en déplacement toute la semaine »', champs: ['reply1'],
        criteres: [
          { nom: 'Courtois', mots: POLITESSE, points: 2, conseil: 'Un merci, une formule aimable : on garde l’accueil de son côté.' },
          { nom: 'Un autre moment', mots: uniq(MOMENT, ['à son retour', 'son retour', 'quand rentre-t-il', 'quand sera-t-il', 'quand revient-il', 'revient', 'rentre',
            'de retour', 'la semaine suivante', 'lundi prochain']), points: 2, conseil: 'Demandez quand le rappeler : un jour, un horaire.' },
          { nom: 'Un autre interlocuteur ou un message', points: 2, conseil: 'Demandez qui suit le sujet en son absence, ou laissez un message utile.',
            mots: ['qui d’autre', 'en son absence', 'pendant son absence', 'quelqu’un d’autre', 'une autre personne', 'un collègue', 'une collègue', 'son assistant',
              'son assistante', 'adjoint', 'adjointe', 'qui suit', 'qui s’occupe', 'qui gère', 'la personne qui', 'qui est en charge', 'en charge', 'responsable',
              'nom', 'coordonnées', 'son adresse', 'adresse', 'mail', 'e-mail', 'courriel', 'message', 'laisser un message', 'mes coordonnées', 'mon numéro',
              'numéro', 'qu’il me rappelle', 'me rappeler', 'transmettre', 'lui transmettre', 'pourriez-vous lui dire', 'lui dire', 'lui indiquer', 'noter',
              'remplace', 'remplaçant*', 'intérim', 'services généraux', 'aménagement des bureaux', 'ce type de sujet', 'ce sujet', 'oui volontiers',
              'oui avec plaisir', 'je veux bien'] }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion, { regle: 'maxMots:60', nom: 'Bref', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_INSISTER] }
    ] },

    // S2 2.4 · Les maladresses de l'appel, une par ligne, dans n'importe quel ordre.
    's2-2.4': { integre: true, blocs: [
      { titre: 'Vos repérages', motif: 'spot',
        criteres: [
          { nom: 'Le débit précipité', points: 2, conseil: 'Il parle d’une traite, sans respirer ni laisser de place au client.',
            mots: ['débit', 'vite', 'rapide', 'rapidement', 'précipit*', 'pressé', 'enchaîn*', 'd’une traite', 'd’un trait', 'sans respirer', 'respir*', 'souffle',
              'pause*', 'ponctuation', 'sans s’arrêter', 'trop vite', 'à toute vitesse', 'voix', 'ton', 'monocorde', 'articul*', 'mitraill*', 'rafale', 'débite',
              'déballe', 'récite', 'récité', 'sans laisser', 'laisse pas', 'ne laisse pas', 'temps de répondre', 'temps de parler', 'coupe', 'parle trop',
              'tout d’un coup', 'd’un coup', 'en une seule phrase', 'une seule phrase', 'phrase interminable', 'interminable', 'sans virgule', 'sans pause',
              'accroche', 'aucune accroche', 'bombarde', 'noie', 'noyé', 'flot', 'trop d’informations', 'trop d’infos', 'surcharge', 'pas clair', 'confus'] },
          { nom: 'Le catalogue d’emblée', points: 2, conseil: 'Il énumère ses produits avant de savoir ce dont le client a besoin.',
            mots: ['catalogue', 'caractéristique*', 'liste', 'énumère', 'énumér*', 'tous ses produits', 'ses produits', 'produits', 'argumentaire', 'arguments',
              'd’emblée', 'tout de suite', 'directement', 'sans besoin', 'besoin*', 'bénéfice*', 'intérêt du client', 'présentation produit', 'chiffres', 'garantie',
              'offre', 'vend', 'vendre', 'vente', 'pitch', 'arguments de vente', 'parle de lui', 'parle de son entreprise', 'centré sur lui', 'centré sur son',
              'ne s’intéresse pas', 'pas de découverte', 'découverte', 'ne demande pas', 'sans connaître', 'sans savoir', 'avant de', 'trop tôt', 'pub', 'publicité',
              'slogan', 'technique', 'mobilier', 'sièges', 'bureaux', 'assis-debout', '1 200', '1200', 'entreprises'] },
          { nom: 'La question fermée', points: 2, conseil: '« Est-ce que ça vous intéresse ? » appelle un « non » facile.',
            mots: ['question fermée', 'fermée', 'oui ou non', 'par oui', 'est-ce que ça vous intéresse', 'ça vous intéresse', 'intéresse', 'non facile', 'refus facile',
              'dire non', 'répondre non', 'un non', 'réponse négative', 'question directe', 'mauvaise question', 'facile à refuser', 'porte de sortie', 'sortie',
              'question fermé', 'pas ouverte', 'question ouverte', 'ouverte', 'intérêt', 'demande si', 'demande directement'] },
          { nom: 'La demande de doc prise au mot', points: 2, conseil: 'Il raccroche sans creuser l’intérêt ni proposer de suite.',
            mots: ['doc', 'documentation', 'brochure', 'plaquette', 'raccroche', 'raccrocher', 'au revoir', 'abandonne', 'abandon', 'lâche', 'accepte', 'sans creuser',
              'creuser', 'creuse', 'rendez-vous', 'créneau', 'garder la main', 'garde la main', 'perd la main', 'perdre la main', 'relance', 'suite', 'rappel', 'rappeler',
              'sans suite', 'qualifie', 'qualifier', 'objection', 'dérobade', 'prétexte', 'esquive', 'envoie', 'envoyer', 'ok', 'trop vite', 'termine', 'clôt',
              'met fin', 'fin de l’appel', 'perd le client', 'perd le prospect', 'laisse partir', 'laisse filer', 'prochaine étape', 'rebondit', 'rebond',
              'ne rebondit pas', 'pas de rebond', 'ne cherche pas'] },
          { nom: 'Une autre maladresse juste', points: 1, conseil: 'D’autres maladresses comptent aussi : il ne se présente pas, ne demande pas si c’est le bon moment…',
            mots: ['présente pas', 'présentation', 'se présente', 'prénom', 'son nom', 'identité', 'qui il est', 'permission', 'dérange', 'bon moment', 'moment opportun',
              'disponible', 'disponibilité', 'interlocuteur', 'bonne personne', 'décideur', 'familier', 'registre', 'oui bonjour', 'politesse', 'salutation', 'impoli',
              'écoute', 'n’écoute pas', 'empathie', 'personnalis*', 'impersonnel', 'objectif', 'raison de l’appel', 'motif'] }
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S2 2.5 · Garder la main face à la demande de doc : pourquoi la réponse 1.
    's2-2.5': { integre: true, blocs: [
      { titre: 'Votre justification', champs: ['why'],
        criteres: [
          { nom: 'L’échange reste ouvert', points: 3, conseil: 'Dites que la réponse 1 garde la main et relance la conversation.',
            mots: ['garde la main', 'maître', 'maîtrise', 'reste maître', 'pilote', 'piloter', 'dirige', 'mène', 'mener', 'tient', 'conserve', 'contrôle', 'la main', 'fait parler', 'fait avancer', 'avance', 'ne lâche pas', 'occasion', 'opportunité', 'rebondit', 'rebondir', 'retient', 'garde', 'garder la main', 'garde le contact', 'garder le contact', 'relance', 'relancer', 'continue', 'continuer', 'prolonge', 'prolonger',
              'poursuit', 'poursuivre', 'ouvert', 'ouverte', 'ouvre', 'maintient', 'maintenir', 'dialogue', 'conversation', 'échange', 'ne raccroche pas', 'ne lâche pas',
              'rebondit', 'rebond', 'avance', 'avancer', 'fait avancer', 'garde', 'garder', 'contact', 'lien', 'relation', 'ne subit pas', 'subit', 'reprend',
              'transforme', 'occasion', 'opportunité', 'suite', 'perd pas', 'ne perd pas', 'implique', 'engage', 'mène'] },
          { nom: 'Le besoin qualifié', points: 2, conseil: 'Dites que ses questions permettent de connaître le besoin et d’envoyer un document utile.',
            mots: ['question*', 'qualifie', 'qualifier', 'qualification', 'besoin*', 'postes', 'combien', 'dos', 'cible', 'cibler', 'ciblé*', 'sur mesure', 'personnalis*',
              'adapter', 'adapté*', 'utile', 'pertinent*', 'comprendre', 'connaître', 'en savoir plus', 'informations', 'renseignements', 'situation', 'précis*',
              'exactement', 'ce qui l’intéresse', 'intérêt', 'découvrir', 'découverte', 'sonder', 'creuse', 'creuser', 'cerner', 'mieux connaître', 'profil',
              'attentes', 'problèmes', 'soucis', 'difficultés'] },
          { nom: 'La demande accueillie', points: 1, conseil: 'Elle accepte la demande sans la contester : « avec plaisir ».',
            mots: ['accepte', 'avec plaisir', 'accueille', 'sans contredire', 'ne refuse pas', 'ne conteste pas', 'accord', 'polie', 'poli', 'courtois*', 'respecte',
              'positive', 'positif', 'volontiers', 'aimable', 'sympathique', 'agréable', 'bienveillan*', 'ne force pas', 'sans forcer', 'sans pression', 'respectueu*'] },
          { nom: 'Les limites de l’autre réponse', points: 2, conseil: 'Dites ce que rate la réponse 2 : elle accepte l’esquive et l’échange s’arrête.',
            mots: ['réponse 2', 'la 2', 'fuir', 'filer', 'laisse partir', 'laisse filer', 'laisse le client', 'au revoir', 'bonne journée', 'fin de l’échange', 'clôt', 'termine', 'met fin', 'perd le client', 'passif', 'passive', 'documentation complète', 'tarifs', 'deuxième', 'seconde', 'second', 'l’autre', 'autre réponse', 'générique', 'brochure', 'raccroche', 'abandon*', 'subit', 'perd', 'perdre', 'esquive',
              'dérobade', 'prétexte', 'fin', 'termine', 'arrête', 'arrêt', 'à froid', 'sans suite', 'aucune info*', 'ne sait rien', 'rien appris', 'pas lue', 'poubelle',
              'passive', 'passif', 'laisse partir', 'laisse filer', 'ferme', 'clôt', 'au revoir', 'n’apprend rien', 'aucune question', 'pas de question'] },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S2 2.6 · Le script de rebond : trois esquives, une réponse de 2 ou 3 phrases.
    's2-2.6': { integre: true, blocs: [
      { titre: '« Je n’ai pas le temps. »', champs: ['script0'],
        criteres: [
          { nom: 'Accuser réception', mots: ACCUEIL, points: 2, conseil: 'Montrez que vous avez entendu : « Je comprends… ».' },
          { nom: 'Préserver la relation', points: 1, conseil: 'Respectez sa contrainte : « je ne veux pas vous retenir ».',
            mots: ['je ne veux pas vous retenir', 'je ne vais pas vous retenir', 'je ne vous retiens pas', 'je ne veux pas vous déranger', 'je ne vous dérange pas',
              'je ne vais pas vous déranger', 'je serai bref', 'je serai brève', 'désolé', 'désolée', 'excusez', 'pardon', 'merci', 'à votre convenance', 'je respecte',
              'votre temps', 'votre emploi du temps', 'votre agenda', 'vous êtes occupé', 'vous êtes occupée', 'vous êtes pris', 'vous êtes prise', 'mauvais moment',
              'je tombe mal', 'je vous dérange', 'retenir', 'déranger', 'pas de souci', 'aucun souci', 'bien sûr', 'naturellement', 'tout à fait', 'c’est normal',
              'je vous laisse', 'pour ne pas vous', 'comme ça vous arrange', 'comme cela vous arrange', 'je m’adapte', 'à vous de voir'] },
          { nom: 'Un autre moment précis', mots: MOMENT, points: 3, conseil: 'Proposez un autre moment, de préférence avec un choix : « demain matin ou en fin de journée ? ».' }
        ],
        phrases: { attendues: 2, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_INSISTER, PIEGE_RACCROCHER] },
      { titre: '« Envoyez-moi une doc. »', champs: ['script1'],
        criteres: [
          { nom: 'Accepter la demande', points: 2, conseil: 'Acceptez sans contester : « Volontiers. »',
            mots: uniq(ACCUEIL, ['volontiers', 'avec plaisir', 'bien sûr', 'd’accord', 'entendu', 'je vous l’envoie', 'je vous envoie', 'je vous la fais parvenir',
              'je vous fais parvenir', 'je vous adresse', 'je vous transmets', 'sans problème', 'oui', 'avec joie', 'c’est noté', 'je m’en occupe', 'je vous prépare',
              'je peux vous envoyer', 'je vais vous envoyer', 'je vous fais suivre']) },
          { nom: 'Un envoi rendu utile', points: 1, conseil: 'Dites que vos questions servent à envoyer ce qui le concerne vraiment.',
            mots: ['pour vous envoyer', 'pour cibler', 'cibler', 'ciblé*', 'ce qui vous concerne', 'vous concerne', 'utile', 'adapté*', 'adapter', 'personnalis*',
              'sur mesure', 'pertinent*', 'vraiment', 'exactement', 'intéresse', 'correspond', 'votre situation', 'votre cas', 'vos besoins', 'votre besoin',
              'plutôt qu’une', 'générique', 'au lieu de', 'précis*', 'le bon document', 'la bonne', 'les bonnes', 'les bons', 'afin de', 'pour que', 'pour être sûr',
              'pour être sûre', 'ce dont vous avez besoin', 'ce qui vous sera utile', 'qui vous parle'] },
          { nom: 'Une question qui qualifie', points: 3, conseil: 'Posez une ou deux questions courtes : combien de postes, quel besoin…',
            mots: uniq(QUESTION, ['combien', 'postes', 'salariés', 'collaborateurs', 'personnes', 'équipe*', 'taille', 'besoin*', 'situation', 'actuellement',
              'aujourd’hui', 'projet', 'renouvel*', 'priorité*', 'problème*', 'soucis', 'souci', 'dos', 'confort', 'adresse', 'mail', 'e-mail', 'courriel']) }
        ],
        phrases: { attendues: 2, points: 1 },
        regles: [avecQuestion],
        pieges: [{ ...PIEGE_RACCROCHER, mots: ['au revoir', 'je raccroche', 'à bientôt', 'bonne fin de journée', 'je vous envoie ça', 'je vous l’envoie tout de suite', 'rappelez-moi quand', 'on verra'] }, PIEGE_INSISTER] },
      { titre: '« On a déjà un fournisseur. »', champs: ['script2'],
        criteres: [
          { nom: 'Accuser réception sans dénigrer', points: 2, conseil: 'Prenez acte de son choix : « C’est noté, vous êtes déjà équipé. »',
            mots: uniq(ACCUEIL, ['c’est noté', 'très bien', 'vous êtes déjà équipé', 'vous êtes déjà équipée', 'vous êtes équipé', 'déjà équipé', 'déjà équipée',
              'c’est une bonne chose', 'tant mieux', 'bonne chose', 'vous avez déjà', 'vous travaillez déjà', 'c’est bien', 'parfait', 'je respecte votre choix',
              'votre choix', 'vous êtes satisfait', 'vous êtes satisfaite', 'je ne vous demande pas de changer', 'pas question de', 'je ne cherche pas à']) },
          { nom: 'S’intéresser à ce qui marche', points: 2, conseil: 'Demandez ce qui le satisfait aujourd’hui.',
            mots: ['satisfait*', 'satisfaction', 'plaît', 'ce qui vous plaît', 'apprécie*', 'fonctionne', 'marche bien', 'points forts', 'point fort', 'qu’est-ce qui',
              'comment ça se passe', 'comment cela se passe', 'content', 'contente', 'aimez', 'choisi', 'choisir', 'critère*', 'compte', 'important', 'tenez',
              'attachez', 'retenu', 'depuis quand', 'depuis combien', 'comment', 'quel', 'quels', 'quelle', 'quelles', 'collaboration', 'partenariat', 'relation'] },
          { nom: 'Ce qui pourrait être amélioré', points: 2, conseil: 'Cherchez une piste d’amélioration : « Qu’aimeriez-vous améliorer ? ».',
            mots: ['améliorer', 'amélior*', 'mieux', 'manque', 'manquerait', 'regrett*', 'compléter', 'complément', 'attentes', 'si vous pouviez', 'changer', 'idéal',
              'idéalement', 'plus', 'autre chose', 'comparer', 'comparaison', 'point de comparaison', 'second avis', 'deuxième avis', 'alternative', 'solution de secours',
              'second fournisseur', 'deuxième fournisseur', 'à côté', 'en complément', 'optimiser', 'gagner', 'perfectible', 'moins bien', 'difficultés', 'soucis',
              'souci', 'problème*', 'besoin*', 'évolu*', 'nouveau', 'nouveaux', 'nouvelle', 'projet*', 'prochain', 'prochaine', 'renouvel*'] }
        ],
        phrases: { attendues: 2, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_DENIGRER, PIEGE_INSISTER] }
    ] },

    // S2 2.7 · Les cartes réflexes : posture, réponse, rebond, pour trois esquives.
    's2-2.7': { integre: true, blocs: [0, 1, 2].flatMap(c => cartes(c)) },

    // S3 1.2 · Le crash-test : le diagnostic, puis la réécriture.
    's3-1.2': { integre: true, blocs: [
      { titre: 'Votre diagnostic', motif: 'error',
        criteres: [
          { nom: 'Il contredit le client', points: 2, conseil: '« Non mais attendez » : il contredit le client d’emblée.',
            mots: ['contredit', 'contredire', 'contradiction', 'contre', 'confront*', 'frontal*', 'nie', 'nier', 'conteste', 'contester', 'non mais', 'attendez',
              'agressi*', 'braque', 'brusque', 'désaccord', 'pas d’accord', 'tort', 'conteste', 'remet en cause', 'rejette', 'réfute', 'accusé de réception',
              'n’accueille pas', 'accueil', 'pas cher du tout', 'dément', 'impoli*', 'irrespect*', 'coupe', 'défensi*', 'sur la défensive', 'se défend', 'défend'] },
          { nom: 'Il minimise et généralise', points: 2, conseil: '« Tous mes clients me disent ça » : le ressenti du client est balayé.',
            mots: ['minimis*', 'généralis*', 'tous mes clients', 'tous les clients', 'tout le monde', 'banalis*', 'invalid*', 'ressenti', 'pas écouté', 'n’écoute pas',
              'écoute', 'pas pris au sérieux', 'au sérieux', 'balaie', 'balayer', 'méprise', 'mépris', 'condescen*', 'infantilis*', 'rabaisse', 'ignore', 'nie son',
              'comme les autres', 'pas unique', 'cliché', 'au début', 'dénigre', 'considér*', 'personnalis*', 'individu*'] },
          { nom: 'Il met la pression', points: 2, conseil: '« Le prix va augmenter » : il force la main au lieu de rassurer.',
            mots: ['pression', 'menace', 'menacer', 'chantage', 'force', 'forcer', 'urgence', 'urgent', 'augmenter', 'augmentation', 'le prix va', 'maintenant',
              'peur', 'fait peur', 'culpabilis*', 'pousse', 'pousser', 'presse', 'presser', 'précipite', 'manipul*', 'oblige', 'impose', 'si vous ne prenez pas',
              'de toute façon', 'insiste', 'insistance', 'agressi*', 'intimid*'] },
          { nom: 'Il brade le prix', points: 2, conseil: '« Je vous fais 5 % » : il brade au lieu de montrer la valeur.',
            mots: ['brade', 'brader', 'bradé', 'remise', 'réduction', 'rabais', 'ristourne', 'concession', 'cède', 'céder', '5', 'cinq pour cent', 'baisse', 'baisser',
              'négoci*', 'geste commercial', 'dévalorise', 'dévaloriser', 'valeur', 'crédibilité', 'on n’en parle plus', 'clore', 'clôt', 'achète', 'acheter',
              'prix cassé', 'effort', 'discount', 'promo'] },
          { nom: 'Ce que la réponse oublie aussi', points: 1, conseil: 'Il ne cherche pas à comprendre (« par rapport à quoi ? ») et ne reformule pas.',
            mots: ['ne creuse pas', 'creuse', 'creuser', 'question*', 'questionne', 'par rapport à quoi', 'reformul*', 'comprendre', 'compris', 'cause', 'besoin',
              'pourquoi', 'preuve', 'argument*', 'valeur', 'contrôle', 'vérifie'] }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Votre réécriture', champs: ['rewrite'],
        criteres: [
          { ...accueil, points: 2 },
          { nom: 'Questionner', points: 2, conseil: 'Cherchez ce que « trop cher » veut dire : « Par rapport à quoi ? ».',
            mots: uniq(OBJECTIONS.prix.cause.filter(m => !['prix', 'cher', 'coût', 'aujourd’hui'].includes(m)), QUESTION_OUVERTE.filter(m => !['quand', 'où', 'qui d’autre', 'qui décide'].includes(m))) },
          { nom: 'Reformuler', mots: REFORMULATION, points: 2, conseil: 'Montrez que vous avez compris : « Si je comprends bien… ».' },
          { nom: 'Traiter avec du concret', mots: uniq(OBJECTIONS.prix.reponse, PREUVE, CHIFFRES, ['concrètement', 'voici ce que', 'ce que cela représente']), points: 2,
            conseil: 'Montrez la valeur avec un élément concret : un gain, un essai, une garantie, un chiffre.' },
          { nom: 'Contrôler', mots: CONTROLE, points: 2, conseil: 'Vérifiez que le doute est levé : « Est-ce que cela répond à votre question ? ».' },
          { nom: 'Enchaîner', mots: SUITE, points: 1, conseil: 'Reprenez le fil de la vente : « Je vous propose de… ».' }
        ],
        phrases: { attendues: 3, points: 2 },
        regles: [avecQuestion],
        pieges: [PIEGE_CONTREDIRE, PIEGE_MINIMISE, PIEGE_PRESSION, PIEGE_BRADER] }
    ] },

    // S3 2.2 · Passez en mode traitement : pourquoi le réflexe bloque, puis la réponse.
    's3-2.2': { integre: true, blocs: [
      { titre: '« Je n’ai pas le temps là. » · pourquoi ça bloque', champs: ['why0'],
        criteres: [
          { nom: 'Ce que le réflexe provoque', points: 3, conseil: 'Le client se sent forcé : sa contrainte est niée, l’échange devient un rapport de force.',
            mots: ['forcé', 'forcée', 'force', 'forcer', 'pression', 'insiste', 'insistance', 'insister', 'nie', 'nier', 'ignore', 'ignorer', 'pas écouté', 'pas écoutée',
              'n’écoute pas', 'pas respecté', 'pas respectée', 'irrespect*', 'manque de respect', 'respecte pas', 'agac*', 'énerv*', 'braque', 'ferme', 'se ferme',
              'raccroche', 'raccrocher', 'rapport de force', 'intrusif', 'intrusive', 'lourd', 'envahissant', 'mensonge', 'ment', 'pas crédible', 'méfian*', 's’impose',
              'impose', 'agress*', 'harcèle*', 'oppressé', 'piégé', 'coincé', 'contraint', 'rejet', 'rejette', 'irrit*', 'refus', 'refuse', 'fuit', 'fuir', 'perd',
              'négatif', 'mauvaise image', 'mauvaise impression', 'désagréable', 'malaise', 'gêne', 'gêné', 'mépris', 'personne n’y croit', 'jamais deux minutes'] },
          { nom: 'Sa contrainte de temps', points: 1, conseil: 'Nommez la contrainte qui n’est pas respectée : son temps.',
            mots: ['temps', 'contrainte', 'disponibilité', 'occupé', 'occupée', 'pas le temps', 'emploi du temps', 'deux minutes', 'minutes', 'promesse', 'promis',
              'agenda', 'moment', 'pressé', 'pressée', 'débordé', 'débordée', 'sa demande', 'ce qu’il dit', 'ce qu’il a dit', 'sa réponse', 'sa limite', 'sa parole'] },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: '« Je n’ai pas le temps là. » · votre réponse', champs: ['reply0'],
        criteres: [
          { nom: 'Accueillir la réplique', mots: uniq(ACCUEIL, ['je ne veux pas vous déranger', 'je ne vous dérange pas', 'je ne vais pas vous retenir', 'je ne veux pas vous retenir', 'je respecte']),
            points: 2, conseil: 'Respectez son temps : « Je comprends, je ne veux pas vous déranger. »' },
          { nom: 'Un autre moment précis', mots: MOMENT, points: 3, conseil: 'Proposez un autre moment, précis.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_INSISTER, PIEGE_RACCROCHER] },
      { titre: '« Envoyez-moi plutôt une documentation. » · pourquoi ça bloque', champs: ['why1'],
        criteres: [
          { nom: 'Ce que le réflexe provoque', points: 3, conseil: 'Il accepte la dérobade sans rien apprendre : l’envoi sera générique et la relance tombera à froid.',
            mots: ['dérobade', 'prétexte', 'esquive', 'excuse', 'accepte', 'subit', 'rien appris', 'n’apprend rien', 'ne sait rien', 'aucune info*', 'besoin*', 'générique',
              'pas adapté*', 'pas ciblé*', 'pas lue', 'poubelle', 'à froid', 'relance', 'perd la main', 'perdre la main', 'perd le contact', 'perd', 'fin', 'termine',
              'arrête', 'clôt', 'met fin', 'raccroche', 'abandonne', 'abandon', 'lâche', 'laisse partir', 'laisse filer', 'sans suite', 'aucune suite', 'pas de suite',
              'qualifi*', 'creuse', 'creuser', 'intérêt', 'ne cherche pas', 'occasion', 'opportunité', 'passif', 'passive', 'ne rebondit pas', 'rebond*', 'échange',
              'conversation', 'politesse', 'se débarrasser', 'débarrasser', 'oublie', 'oubliera', 'ne lira pas', 'jamais lue'] },
          { nom: 'Le besoin du client', points: 1, conseil: 'Dites ce qui manque : rien n’est appris sur son besoin.',
            mots: ['besoin*', 'situation', 'attentes', 'intérêt', 'ce qu’il cherche', 'ce qu’il veut', 'client', 'prospect', 'postes', 'envoi', 'document*', 'doc'] },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: '« Envoyez-moi plutôt une documentation. » · votre réponse', champs: ['reply1'],
        criteres: [
          { nom: 'Accueillir la demande', mots: uniq(ACCUEIL, ['volontiers', 'avec plaisir', 'je vous l’envoie', 'je vous envoie', 'je vous fais parvenir', 'je vous adresse', 'je vous transmets', 'sans problème']),
            points: 2, conseil: 'Acceptez la demande : « Avec plaisir. »' },
          { nom: 'Une question qui qualifie', points: 3, conseil: 'Posez une ou deux questions pour que l’envoi soit utile.',
            mots: uniq(QUESTION, ['combien', 'postes', 'salariés', 'besoin*', 'situation', 'utile', 'cibler', 'adapt*', 'personnalis*', 'exactement', 'vraiment',
              'vous concerne', 'une ou deux questions', 'deux questions', 'quelques questions', 'questions rapides', 'question rapide']) }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [{ ...PIEGE_RACCROCHER, mots: ['au revoir', 'je raccroche', 'à bientôt', 'je vous envoie ça', 'je vous l’envoie tout de suite', 'rappelez-moi quand', 'on verra'] }] },
      { titre: '« On travaille déjà avec un autre prestataire. » · pourquoi ça bloque', champs: ['why2'],
        criteres: [
          { nom: 'Ce que le réflexe provoque', points: 3, conseil: 'Il dénigre le concurrent : le client défend son choix, la discussion tourne à la comparaison.',
            mots: ['dénigre', 'dénigrer', 'dénigrement', 'critique', 'critiquer', 'défend', 'défendre', 'justifie', 'justifier', 'son choix', 'comparaison', 'compare',
              'comparer', 'arrogan*', 'prétentieu*', 'vantard', 'se vante', 'vante', 'remet en cause', 'braque', 'braquer', 'vexe', 'vexer', 'vexé', 'froisse', 'insulte',
              'se ferme', 'ferme', 'conflit', 'confrontation', 'aucune écoute', 'pas d’écoute', 'n’écoute pas', 'pas de question', 'aucune question', 'concurren*',
              'prestataire', 'fournisseur', 'tort', 'il s’est trompé', 'mauvais choix', 'jugement', 'juge', 'condescend*', 'supérieur', 'sans preuve', 'pas crédible',
              'gratuit', 'méfian*', 'agacé', 'agace', 'irrite', 'négatif'] },
          { nom: 'L’écoute oubliée', points: 1, conseil: 'Dites ce qui manque : s’intéresser à ce qui marche et à ce qui pourrait être amélioré.',
            mots: ['écoute', 'écouter', 'question*', 'intéresse', 's’intéresser', 'ce qui marche', 'besoin*', 'améliorer', 'comprendre', 'satisfait*', 'attentes', 'relation'] },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: '« On travaille déjà avec un autre prestataire. » · votre réponse', champs: ['reply2'],
        criteres: [
          { nom: 'Prendre acte sans dénigrer', mots: uniq(ACCUEIL, ['c’est noté', 'très bien', 'vous avez déjà un partenaire', 'vous êtes déjà équipé', 'vous êtes déjà équipée',
            'déjà équipé', 'c’est une bonne chose', 'tant mieux', 'vous avez déjà', 'vous travaillez déjà', 'votre choix', 'je respecte']), points: 2,
            conseil: 'Prenez acte de son choix : « C’est noté, vous avez déjà un partenaire. »' },
          { nom: 'Une question sur sa collaboration', points: 3, conseil: 'Intéressez-vous à ce qui compte pour lui, puis à ce qui pourrait être amélioré.',
            mots: uniq(QUESTION_OUVERTE, ['satisfait*', 'satisfaction', 'compte', 'important', 'apprécie*', 'plaît', 'améliorer', 'amélior*', 'mieux', 'manque',
              'attentes', 'collaboration', 'partenariat', 'critère*', 'comparer', 'second avis', 'point de comparaison', 'idéal', 'aimeriez', 'souhaiteriez']) }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [avecQuestion],
        pieges: [PIEGE_DENIGRER] }
    ] }
  };

  /* S2 2.7 · Les trois blocs d'une carte (déclarée après la table : on
   * l'appelle à sa construction, la fonction est hissée). */
  function cartes(c) {
    const POSTURE = ['calme', 'posé', 'posée', 'sourire', 'souriant', 'souriante', 'souris', 'sourit', 'détendu', 'détendue', 'zen', 'serein', 'sereine', 'respir*',
      'ton', 'voix', 'débit', 'lent', 'lente', 'lentement', 'doux', 'douce', 'aimable', 'cordial*', 'courtois*', 'bienveillan*', 'patient*', 'à l’écoute', 'écoute',
      'ouvert', 'ouverte', 'positif', 'positive', 'confian*', 'assuré', 'assurée', 'coopérati*', 'sans insister', 'sans forcer', 'ne pas insister', 'pas de pression',
      'respect*', 'empathi*', 'neutre', 'professionnel*', 'garder son calme', 'rester', 'reste', 'assis', 'droit', 'posture', 'attitude', 'tranquille', 'tranquillement',
      'chaleureu*', 'enjoué*', 'dynamique', 'énergie', 'naturel', 'naturelle', 'sincère', 'humble', 'disponible', 'attentif', 'attentive', 'compréhensi*', 'souple',
      'léger', 'légère', 'décontracté*', 'concentré*', 'pause', 'silence', 'articul*', 'clair', 'claire', 'aisance', 'curieu*', 'curiosité', 'intéressé*'];
    const SPEC = [
      { // « Je n'ai pas le temps. »
        posture: { nom: 'Respecter son temps', mots: ['respect*', 'temps', 'ne pas retenir', 'ne retient pas', 'on ne retient pas', 'retenir', 'bref', 'brève', 'court',
          'courte', 'rapide', 'concis*', 'ne pas insister', 'sans insister', 'pas insister', 'compréhensi*', 'comprend', 'accepte', 'accepter', 'laisser partir',
          'pas de force', 'de force', 'sans forcer', 'lâcher prise', 'pas vexé', 'pas vexée', 'sans pression', 'discret', 'discrète'] },
        reponse: { nom: 'Accuser réception', mots: uniq(ACCUEIL, ['je ne veux pas vous déranger', 'je ne vous dérange pas', 'je ne vais pas vous déranger',
          'je ne veux pas vous retenir', 'je ne vous retiens pas', 'je ne vais pas vous retenir', 'je tombe mal', 'mauvais moment', 'désolé', 'désolée', 'pardon',
          'excusez', 'je serai bref', 'je serai brève', 'votre temps', 'je respecte']) },
        rebond: { nom: 'Un autre moment', mots: MOMENT },
        model: 'Quel créneau vous irait mieux ?'
      },
      { // « Envoyez-moi une doc. »
        posture: { nom: 'Rester coopératif', mots: ['coopérati*', 'volontiers', 'accepte', 'accepter', 'accueill*', 'garde la main', 'garder la main', 'curieu*',
          'intéressé*', 'utile', 'aider', 'service', 'serviable', 'positif', 'positive', 'ouvert', 'ouverte', 'sans contester', 'ne pas contester', 'pas contrarié',
          'pas déçu', 'pas déçue', 'proactif', 'proactive', 'constructi*', 'à l’écoute', 'arrangeant*', 'conciliant*', 'enthousias*'] },
        reponse: { nom: 'Accepter la demande', mots: uniq(ACCUEIL, ['volontiers', 'avec plaisir', 'bien sûr', 'je vous l’envoie', 'je vous envoie', 'je vous fais parvenir',
          'je vous adresse', 'je vous transmets', 'sans problème', 'pour cibler', 'cibler', 'utile', 'l’utile', 'adapté*', 'personnalis*', 'ce qui vous concerne',
          'pour vous envoyer', 'pour que', 'afin de']) },
        rebond: { nom: 'Une question qui qualifie', mots: uniq(QUESTION, ['combien', 'postes', 'salariés', 'besoin*', 'situation', 'projet', 'adresse', 'mail', 'e-mail']) },
        model: 'Combien de postes environ ?'
      },
      { // « On a déjà un fournisseur. »
        posture: { nom: 'Sans dénigrer', mots: ['sans dénigrer', 'ne pas dénigrer', 'pas dénigrer', 'dénigr*', 'respect*', 'sans critiquer', 'ne pas critiquer', 'critiqu*',
          'curieu*', 'curiosité', 'intéressé*', 'ouvert', 'ouverte', 'neutre', 'félicit*', 'valoris*', 'concurren*', 'fournisseur', 'humble', 'humilité', 'beau joueur',
          'fair-play', 'sans jugement', 'ne pas juger', 'pas juger', 'bienveillan*', 'positif', 'positive', 'serein', 'sereine', 'pas agressif', 'sans agressivité'] },
        reponse: { nom: 'Prendre acte de son choix', mots: uniq(ACCUEIL, ['c’est noté', 'très bien', 'vous êtes déjà équipé', 'vous êtes déjà équipée', 'déjà équipé',
          'déjà équipée', 'c’est une bonne chose', 'tant mieux', 'vous avez déjà', 'votre choix', 'je respecte', 'c’est bien', 'parfait', 'bonne chose']) },
        rebond: { nom: 'Ce qui pourrait être amélioré', mots: uniq(QUESTION_OUVERTE, ['améliorer', 'amélior*', 'mieux', 'manque', 'satisfait*', 'plaît', 'apprécie*',
          'compte', 'idéal', 'attentes', 'comparer', 'point de comparaison', 'second avis', 'aimeriez', 'souhaiteriez', 'changer']) },
        model: ''
      }
    ][c];
    const quote = ['« Je n’ai pas le temps. »', '« Envoyez-moi une doc. »', '« On a déjà un fournisseur. »'][c];
    return [
      { titre: `${quote} · la posture`, champs: [`posture${c}`],
        criteres: [
          { nom: 'Une voix, une attitude', mots: POSTURE, points: 2, conseil: 'Décrivez votre voix et votre attitude : calme, souriante, posée…' },
          { ...SPEC.posture, points: 1, conseil: 'Adaptez la posture à cette esquive.' }
        ],
        // Une posture se note en quelques mots : pas de phrase exigée.
        phrases: { points: 0 } },
      { titre: `${quote} · la réponse`, champs: [`reponse${c}`],
        criteres: [{ ...SPEC.reponse, points: 3, conseil: 'Accusez réception sans contredire, en une phrase naturelle.' }],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_INSISTER, PIEGE_DENIGRER, PIEGE_CONTREDIRE] },
      { titre: `${quote} · le rebond`, champs: [`rebond${c}`],
        criteres: [
          { ...SPEC.rebond, points: 2, conseil: 'Une question ou un choix qui relance l’échange.' },
          { nom: 'Une question ou un choix', mots: uniq(QUESTION, ['je vous propose', 'je propose', 'plutôt', 'ou bien', 'préférez-vous', 'vous préférez']), points: 1,
            conseil: 'Le client doit pouvoir répondre facilement : une question, ou deux options.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_INSISTER, PIEGE_DENIGRER, PIEGE_RACCROCHER] }
    ];
  }
})();
