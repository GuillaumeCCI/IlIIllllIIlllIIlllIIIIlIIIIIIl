/* GRILLES D'ANALYSE · réponses ouvertes du module 1-1-2.
 *
 * Lues par moteur/js/indicateur.js, qui calcule un indicateur de points sur
 * 10. Une grille par exercice (clé du catalogue) ; chaque bloc lit un ou
 * plusieurs champs (`champs`, ou `motif` : « error » → error0, error1…) et
 * compte ses critères, ses phrases complètes, ses règles et ses pièges. Le
 * détail de l'écriture des expressions est en tête d'indicateur.js : la
 * casse, les accents et les terminaisons ne comptent pas, un mot peut
 * s'intercaler, un mot terminé par `*` est un début de mot.
 *
 * Toutes les grilles sont `integre: true` : chaque écran place lui-même le
 * score dans son corrigé (js/reponses-ouvertes.js), réponse par réponse.
 *
 * Les familles communes sont en tête, reprises du module 1-1-1 puis
 * enrichies : les élargir profite à tous les exercices qui les emploient.
 * Une réponse juste mais dite autrement doit être reconnue : on y met les
 * synonymes, les tournures orales, le vouvoiement comme la troisième
 * personne, les verbes à tous les temps (la racine suffit).
 */
(() => {
  'use strict';

  /* ── Familles communes ──────────────────────────────────────────────── */

  // Un nombre, écrit en chiffres (« 19 », « 7j/7 », « 98 % ») ou en lettres.
  const NOMBRES = ['0*', '1*', '2*', '3*', '4*', '5*', '6*', '7*', '8*', '9*', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit',
    'neuf', 'dix', 'onze', 'douze', 'quinze', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'cent', 'mille', 'milliers',
    'million*', 'centaine*', 'dizaine*', 'moitié', 'tiers', 'quart', 'zéro'];

  // Le client au centre : on lui parle, ou on parle de lui.
  const CLIENT = ['vous', 'votre', 'vos', 'vôtre', 'vôtres', 'le client', 'la cliente', 'les clients', 'l’entreprise', 'la pme', 'la société',
    'le dirigeant', 'la dirigeante', 'le gérant', 'la gérante', 'le patron', 'la patronne', 'il gagne', 'elle gagne', 'il peut', 'elle peut',
    'il est', 'elle est', 'il n’a plus', 'elle n’a plus', 'il évite', 'elle évite', 'il garde', 'elle garde', 'ses données', 'son équipe',
    'ses équipes', 'ses salariés', 'son budget', 'ses clients', 'son activité', 'ses collaborateurs', 'son entreprise', 'l’utilisateur',
    'les utilisateurs', 'l’utilisatrice', 'les salariés', 'les équipes', 'les collaborateurs', 'on gagne', 'on évite', 'on peut', 'tu', 'ton', 'tes'];

  // Ce que le client y gagne, quel que soit le produit.
  const BENEFICE = ['vous gagnez', 'vous gagnerez', 'vous économisez', 'vous évitez', 'vous n’avez plus', 'vous n’aurez plus', 'vous ne perdez',
    'vous pouvez', 'vous pourrez', 'vous êtes', 'vous serez', 'vous restez', 'vous gardez', 'vous conservez', 'vous maîtrisez', 'vous profitez',
    'vous bénéficiez', 'vous disposez', 'vous récupérez', 'vous dormez', 'vous travaillez', 'vous avancez', 'vous libérez', 'vous réduisez',
    'vous permet', 'cela vous', 'ce qui vous', 'ça vous', 'pour vous', 'sans vous', 'sans y penser', 'sans rien faire', 'sans effort',
    'l’esprit tranquille', 'l’esprit libre', 'serein*', 'sérénité', 'tranquill*', 'rassur*', 'gagn*', 'économis*', 'évit*', 'profit*',
    'bénéfici*', 'plus besoin', 'plus jamais', 'ne plus', 'fini', 'finie', 'finies', 'concrètement', 'au quotidien', 'simplifi*', 'facilit*',
    'grâce à', 'ainsi', 'permet', 'permettent', 'libér*', 'récupér*', 'confort', 'liberté', 'en toute', 'à l’abri', 'protég*', 'moins de',
    'plus de temps', 'du temps', 'rapidement', 'facilement', 'simplement'];

  // Un fait qui rend la promesse crédible : un chiffre, un tiers, un engagement.
  const PREUVE = NOMBRES.concat(['nos clients', 'nos utilisateurs', 'clients satisfaits', 'pme', 'entreprises', 'utilisateurs', 'utilisé par',
    'adopté par', 'choisi par', 'déjà équip*', 'font confiance', 'nous font confiance', 'audit*', 'certifi*', 'certification', 'conforme',
    'conformité', 'rgpd', 'norme*', 'iso', 'label*', 'garanti*', 'contrat', 'contractuel*', 'par écrit', 'écrit', 'noir sur blanc',
    'devis', 'témoignage*', 'avis', 'recommand*', 'étude*', 'enquête', 'sondage', 'mesur*', 'constat*', 'prouv*', 'démontr*',
    'démonstration', 'essai', 'test*', 'en moyenne', 'moyenne', 'statistique*', 'taux', 'pour cent', 'pourcentage', 'résultat*',
    'référence*', 'cas client', 'par exemple', 'exemple', 'chiffre*', 'chiffré*', 'récompens*', 'classement', 'note', 'noté', 'étoiles',
    'satisfaction', 'aucun incident', 'sans incident', 'sans le moindre incident', 'aucune perte', 'ans d’expérience', 'depuis',
    'historique', 'suivi', 'rapport', 'bilan', 'indépendant', 'organisme', 'vérifi*', 'officiel*', 'agréé', 'homologu*', 'partenaire*',
    'remboursé', 'satisfait ou remboursé', 'pénalité*', 'planifi*']);

  // La sécurité des données (motivation S du SONCAS, besoin n° 1 de la PME).
  const SECURITE = ['sécuris*', 'sécurité', 'en sécurité', 'protég*', 'protection', 'protect*', 'à l’abri', 'en sûreté', 'serein*', 'sérénité',
    'tranquill*', 'rassur*', 'confiance', 'l’esprit libre', 'l’esprit tranquille', 'sans crainte', 'sans inquiétude', 'sans risque',
    'aucun risque', 'zéro risque', 'risque*', 'ne perdez', 'ne perdrez', 'perdre', 'perte*', 'rien perdre', 'aucune perte', 'récupér*',
    'restaur*', 'retrouv*', 'confidenti*', 'pirat*', 'hack*', 'cyber*', 'attaque*', 'volé*', 'vol de', 'fuite*', 'intrus*', 'malveillan*',
    'virus', 'rançon*', 'illisible*', 'inaccessible*', 'personne d’autre', 'personne ne peut', 'chiffr*', 'crypt*', 'sauvegard*', 'copie*',
    'rgpd', 'conform*', 'la loi', 'légal*', 'amende*', 'sanction*', 'dormir', 'dormez', 'garanti*', 'fiab*', 'intact*', 'préserv*',
    'accès', 'en lieu sûr', 'bien gardé*', 'verrouill*', 'coffre'];

  // Être aidé sans équipe informatique (besoin n° 2 de la PME).
  const ACCOMPAGNEMENT = ['assistance', 'assist*', 'accompagn*', 'support', 'aide', 'aidé', 'aidée', 'aider', 'aidez', 'aidons', 'dépann*',
    'hotline', 'service client', 'répon*', 'joindre', 'joignable', 'disponible*', 'disponibilité', 'tous les jours', '7j', '7 jours', '7/7',
    'sept jours', 'week-end*', 'dimanche', 'samedi', 'jour et nuit', 'à tout moment', 'n’importe quand', 'quelqu’un', 'une équipe',
    'nos équipes', 'expert*', 'conseiller*', 'conseillère*', 'technicien*', 'informaticien*', 'service informatique', 'équipe technique',
    'compétence*', 'connaissance*', 'autonom*', 'jamais seul', 'tout seul', 'seul', 'seule', 'bloqué*', 'blocage*', 'panne*', 'problème*',
    'difficulté*', 'souci*', 'question*', 'en cas de', 'rapidement', 'vite', 'immédiat*', 'deux minutes', 'quelques minutes', 'simple*',
    'facile*', 'prise en main', 'prendre en main', 'rien à installer', 'rien à gérer', 'on s’occupe', 'nous nous occupons', 'nous gérons',
    'on gère', 'pris en charge', 'prend en charge', 'prenons en charge', 'à vos côtés', 'formation', 'formé*', 'guid*', 'appel*',
    'téléphone', 'messagerie', 'interlocuteur*', 'référent*', 'dédié*', 'sans informaticien', 'besoin d’informaticien', 'technique*'];

  // Maîtriser son budget (besoin n° 3 de la PME, motivation A du SONCAS).
  const BUDGET = ['budget*', 'budgétaire', 'maîtris*', 'coût*', 'coûte', 'coûter', 'prix', 'tarif*', 'payer', 'payez', 'paierez', 'paiement*',
    'dépense*', 'dépens*', 'économ*', 'argent', 'euro*', '19', 'par mois', 'mensuel*', 'chaque mois', 'abonnement*', 'sans engagement',
    'engag*', 'liberté', 'libre', 'arrêter', 'arrêtez', 'résili*', 'quand vous voulez', 'quand vous le souhaitez', 'à tout moment',
    'souple*', 'souplesse', 'flexib*', 'aucune surprise', 'pas de surprise', 'sans surprise', 'prévoir', 'prévisible*', 'anticip*', 'fixe',
    'ne bouge pas', 'ne change pas', 'n’augmente pas', 'augment*', 'hausse', '12 mois', 'un an', 'douze mois', 'une année',
    'investissement*', 'investi*', 'rentab*', 'abordable*', 'accessible*', 'bon marché', 'pas cher', 'peu cher', 'moins cher',
    'raisonnable', 'trésorerie', 'facture*', 'frais', 'caché*', 'portefeuille', 'somme*', 'montant*', 'financ*', 'à moindre coût',
    'à petit prix', 'charge*'];

  // Le temps perdu dans les tâches répétitives (S2 2.3, S3 3.6).
  const TACHES = ['temps', 'heure*', 'minute*', 'journée*', 'semaine*', 'chaque jour', 'chaque semaine', 'par jour', 'par semaine', 'perd*',
    'gaspill*', 'passez', 'passer', 'passe', 'consacr*', 'répétiti*', 'administrati*', 'saisi*', 'ressais*', 'paperasse*', 'tâche*',
    'corvée*', 'à la main', 'manuel*', 'formulaire*', 'papier*', 'relance*', 'factur*', 'devis', 'gestion', 'gérer', 'doublon*',
    'la même chose', 'les mêmes', 'refaire', 'recopi*', 'copier', 'tableur*', 'excel', 'fichier*', 'dossier*', 'organis*', 'débordé*',
    'surcharg*', 'stress*', 'courir', 'retard*', 'comptab*', 'secrétariat', 'bureau', 'planning*', 'agenda', 'courrier*', 'mail*',
    'e-mail*', 'double saisie', 'ressaisie*'];

  // Ce que rapporte le temps récupéré.
  const GAIN_TEMPS = ['gagn*', 'économis*', 'récupér*', 'libér*', 'réduis*', 'réduire', 'réduit*', 'moins de', 'plus de temps', 'du temps',
    'temps libre', 'évit*', 'n’avez plus', 'n’aurez plus', 'plus besoin', 'fini', 'finie', 'finies', 'plus jamais', 'ne plus', 'consacr*',
    'concentr*', 'l’essentiel', 'votre métier', 'vos clients', 'cœur de métier', 'tranquill*', 'serein*', 'sérénité', 'erreur*', 'oubli*',
    'allég*', 'simplifi*', 'facilit*', 'rapide*', 'plus vite', 'en un clic', 'automatique*', 'tout seul', 'toute seule', 'sans effort',
    'productiv*', 'efficac*', 'heure*', 'minute*', 'soulag*', 'respir*', 'souffl*'];

  const QUESTION_OUVERTE = ['qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'sur quoi', 'de quoi',
    'par rapport à quoi', 'dans quelle mesure', 'en quoi', 'à quel point', 'à quoi', 'que pensez-vous', 'qu’en pensez-vous', 'racontez-moi',
    'dites-moi', 'parlez-moi', 'expliquez-moi', 'pourriez-vous préciser', 'précisez', 'combien', 'pourquoi', 'lequel', 'laquelle',
    'lesquels', 'lesquelles', 'qu’attendez-vous', 'que recherchez-vous', 'qu’aimeriez-vous', 'c’est-à-dire', 'dites-m’en plus',
    'à quel moment', 'depuis quand', 'de quelle façon', 'de quelle manière', 'avez-vous', 'y a-t-il', 'est-ce que', 'est-ce qu*', 'où',
    'selon vous', 'à votre avis', 'd’après vous', 'pouvez-vous', 'pourriez-vous', 'vous arrive-t-il', 'êtes-vous', 'seriez-vous',
    'diriez-vous', 'auriez-vous', 'feriez-vous', 'aimeriez-vous', 'souhaitez-vous', 'voulez-vous', 'vous semble', 'vous paraît'];

  // Vérifier l'effet d'un argument : le client confirme, nuance ou ajoute.
  const CONTROLE = ['est-ce que cela répond', 'est-ce que ça répond', 'cela répond-il', 'cela répond à', 'ça répond à', 'cela vous rassure',
    'ça vous rassure', 'cela vous parle', 'ça vous parle', 'qu’en pensez-vous', 'qu’en dites-vous', 'que pensez-vous', 'cela vous convient',
    'ça vous convient', 'cela vous semble', 'ça vous semble', 'vous semble-t-il', 'vous semble', 'vous paraît', 'cela vous paraît',
    'ça vous paraît', 'est-ce que cela', 'est-ce que ça', 'est-ce que ce', 'est-ce que le', 'est-ce que la', 'est-ce que vous', 'est-ce qu*',
    'ferait-il', 'ferait-elle', 'ferait une différence', 'changerait', 'serait-il', 'serait-elle', 'serait utile', 'utile pour vous',
    'intéressant pour vous', 'vous intéresse', 'cela vous intéresse', 'ça vous intéresse', 'vous aiderait', 'vous aide', 'vous servirait',
    'vous ferait gagner', 'vous ferait', 'vous fait', 'vous voyez', 'avez-vous', 'auriez-vous', 'pensez-vous', 'trouvez-vous',
    'diriez-vous', 'comment voyez-vous', 'comment le voyez-vous', 'comment imaginez-vous', 'selon vous', 'à votre avis', 'd’après vous',
    'votre avis', 'votre sentiment', 'votre ressenti', 'lequel', 'laquelle', 'lesquels', 'quel', 'quelle', 'quels', 'quelles',
    'répond-il', 'répond-elle', 'correspond-il', 'correspond-elle', 'correspond à', 'convient-il', 'convient-elle', 'vous convient',
    'vous parle', 'vous rassure', 'vous plaît', 'êtes-vous', 'seriez-vous', 'est-ce utile', 'est-ce important', 'est-ce clair',
    'c’est clair pour vous', 'ai-je bien', 'avez-vous des questions', 'd’autres questions', 'vous suivez', 'ça vous va', 'cela vous va'];

  const RAISON = ['parce que', 'parce qu*', 'car', 'puisque', 'puisqu*', 'comme', 'ce qui', 'cela', 'ça permet', 'cela permet', 'permet de',
    'permet', 'permettent', 'afin de', 'pour que', 'donc', 'ainsi', 'c’est pourquoi', 'en effet', 'grâce à', 'cela montre', 'ce qui montre',
    'cela évite', 'ce qui évite', 'alors que', 'tandis que', 'contrairement', 'au lieu de', 'pour ne pas', 'de façon à', 'de manière à',
    'répond à', 'répondent à', 'répondre à', 'répond directement', 'correspond*', 'en lien avec', 'lié à', 'liés à', 'liée à',
    'directement', 'précisément', 'vu que', 'étant donné', 'dans la mesure où', 'du fait', 'en raison', 'à cause', 'c’est pour ça',
    'c’est pour cela', 'voilà pourquoi', 'd’où', 'sinon', 'sans quoi', 'résultat', 'si bien que', 'de sorte que', 'en conséquence',
    'par conséquent', 'ce qui fait', 'cela fait', 'ça fait', 'risque de', 'fait que', 'alors', 'du coup', 'empêch*', 'évite', 'évitent',
    'qui permet', 'qui évite', 'c’est ce qui', 'voilà', 'en clair', 'autrement dit'];

  // Ce que vit le client en face : il décroche, doute, se sent compris…
  const EFFET_CLIENT = ['le client', 'la cliente', 'l’interlocuteur', 'l’interlocutrice', 'le prospect', 'décroch*', 'perd*', 'ennui*', 'lass*',
    'fatigu*', 'agac*', 'énerv*', 'confus*', 'perdu', 'perdue', 'noyé', 'noyée', 'noie', 'submerg*', 'retien*', 'retenir', 'oubli*',
    'mémoris*', 'méfi*', 'doute*', 'confiance', 'crédib*', 'pas écouté', 'pas écoutée', 'pas compris', 'pas comprise', 'pas considéré',
    'se sent', 'sentir', 'impression', 'n’écoute plus', 'désintér*', 'intérêt', 'attention', 'persua*', 'convain*', 'échange',
    'relation', 'dialogue', 'pénalis*', 'nuit', 'nuire', 'nuisible', 'freine', 'frein', 'bloque', 'contre-productif', 'efficac*',
    'impact', 'achète', 'achat', 'vente', 'signer', 'décision', 'décider', 'comprend', 'comprendre', 'compren*', 'incompréhens*',
    'mal à l’aise', 'gêne', 'gêné', 'intimid*', 'distance', 'éloign*', 'importance', 'important', 'priorit*', 'sens', 'valeur'];

  const SUITE = ['je vous propose', 'nous pourrions', 'on pourrait', 'prochaine étape', 'la suite', 'rendez-vous', 'on fixe', 'fixons',
    'planifions', 'organisons', 'démonstration', 'démo', 'essai', 'essayer', 'tester', 'test', 'visite', 'rencontre', 'rencontrer',
    'cette semaine', 'la semaine prochaine', 'demain', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'date', 'créneau', 'agenda',
    'je vous envoie', 'on continue', 'continuons', 'on avance', 'avançons', 'regardons', 'voyons', 'on regarde', 'on voit', 'passons',
    'mettre en place', 'mise en place', 'installer', 'installation', 'démarrer', 'démarrage', 'lancer', 'commencer', 'commençons',
    'on commence', 'souhaitez-vous', 'voulez-vous', 'que diriez-vous', 'ça vous dit', 'cela vous dit', 'qu’en pensez-vous',
    'êtes-vous prêt', 'êtes-vous prête', 'ensemble', 'contactez', 'appelez', 'je vous rappelle', 'je reviens vers vous', 'je vous prépare',
    'je vous adresse', 'proposition', 'devis', 'offre', 'abonnement', 'inscription', 'ouvrir un compte', 'accès', 'étape', 'aller plus loin',
    'pour avancer', 'on y va', 'allons-y', 'quand', 'chez vous'];

  /* ── Pièges communs ─────────────────────────────────────────────────── */

  const PIEGE_HESITANT = { nom: 'Ton hésitant', points: 1,
    mots: ['je pense que peut-être', 'je pense', 'peut-être', 'normalement', 'en principe', 'je crois', 'il me semble', 'j’espère', 'euh',
      'on va essayer', 'si tout va bien', 'je ne sais pas', 'éventuellement', 'je suppose', 'à peu près'],
    conseil: 'Affirmez : un argument hésitant ne rassure pas.' };

  const PIEGE_JARGON = { nom: 'Jargon non expliqué', points: 1,
    mots: ['saas', 'multi-tenant', 'tenant', 'api', 'api rest', 'sso', 'backend', 'back-end', 'bi', 'scalab*', 'middleware',
      'framework', 'kpi', 'erp', 'webhook*'],
    conseil: 'Traduisez les termes techniques en ce que le client y gagne.' };

  const PIEGE_SURVENTE = { nom: 'Affirmation sans preuve', points: 1,
    mots: ['le meilleur', 'la meilleure', 'forcément', 'révolutionnaire', 'imbattable', 'numéro un', 'sans égal', 'incroyable', 'parfait',
      'vous ne trouverez pas mieux', 'croyez-moi', 'faites-moi confiance'],
    conseil: 'Remplacez le superlatif par un fait vérifiable.' };

  /* ── Critères réutilisés ────────────────────────────────────────────── */

  const client = { nom: 'Tourné vers le client', mots: CLIENT, conseil: 'Parlez au client : « Vous… », « vos équipes… ».' };
  const raison = { nom: 'Une justification', mots: RAISON, conseil: 'Expliquez pourquoi : « parce que… », « ce qui permet… ».' };
  const preuve = (nom = 'Un fait vérifiable', conseil = 'Appuyez-vous sur un chiffre, un audit, un nombre de clients, un engagement écrit.') =>
    ({ nom, mots: PREUVE, conseil });

  /* Un avantage CAP pour un besoin précis : le client, puis ce qu'il y gagne. */
  const avantage = (titre, champ, gain, conseil) => ({
    titre, champs: [champ],
    criteres: [client, { nom: 'Le gain lié à ce besoin', mots: gain, conseil }],
    phrases: { attendues: 1, points: 1 }
  });

  /* ── Les grilles ────────────────────────────────────────────────────── */

  window.ATELIER_GRILLES = {

    // S1 1.3 · La fabrique à arguments : l'avantage de chaque besoin.
    's1-1.3': { integre: true, blocs: [
      avantage('Sécuriser les données', 'a0', SECURITE, 'Dites ce que le client y gagne : des données protégées, rien de perdu, l’esprit tranquille.'),
      avantage('Fonctionner sans équipe technique', 'a1', ACCOMPAGNEMENT, 'Dites ce que le client y gagne : être aidé vite, même sans informaticien.'),
      avantage('Maîtriser son budget', 'a2', BUDGET, 'Dites ce que le client y gagne : un coût connu, et la liberté d’arrêter.')
    ] },

    // S1 1.4 · Le radar SONCAS : justifier les deux arguments retenus.
    's1-1.4': { integre: true, blocs: [
      { titre: 'Le dirigeant prudent', champs: ['why0'],
        criteres: [
          { nom: 'La motivation nommée', mots: ['sécurité', 'sécuris*', 'protég*', 'protection', 'protect*', 'rassur*', 'peur', 'crainte', 'craint*',
            'inquiet', 'inquiète', 'inquiétude', 'méfi*', 'prudent', 'prudence', 'risque*', 'confiance', 'fiab*', 'motivation s', 'soncas',
            'tranquill*', 'serein*', 'angoiss*', 'traumat*', 'échaudé', 'refroidi'], conseil: 'Nommez sa motivation : la sécurité.' },
          { nom: 'Ses mots repris', mots: ['pirat*', 'hack*', 'attaque*', 'cyber*', 'reproduis*', 'reproduire', 'recommence*', 'à nouveau', 'de nouveau',
            'encore une fois', 'certain', 'certaine', 'certitude', 'protégées', 'ses données', 'mes données', 'données', 'déjà été', 'par le passé',
            'mauvaise expérience', 'vécu', 'subi', 'passé', 'il dit', 'il veut', 'il souhaite', 'il ne veut', 'ce qu’il', 'ses propos', 'ses mots',
            'il évoque', 'il parle', 'il exprime', 'il insiste', 'il craint', 'il a peur'], conseil: 'Reprenez ce qu’il dit : il a déjà été piraté.' },
          { nom: 'Les arguments reliés', mots: ['chiffr*', 'crypt*', 'rgpd', 'conform*', 'sauvegard*', 'copie*', 'perte', 'perdre', 'perdu*',
            'accès', 'illisible*', 'récupér*', 'restaur*', 'automatique*', 'ces deux arguments', 'ces arguments', 'les deux arguments', 'a et c',
            'ces deux cartes'], conseil: 'Citez les deux arguments : chiffrement et conformité à la loi européenne sur les données, sauvegarde automatique.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Le client attentif au prix', champs: ['why1'],
        criteres: [
          { nom: 'La motivation nommée', mots: ['argent', 'prix', 'coût*', 'budget*', 'financ*', 'économ*', 'dépense*', 'tarif*', 'cher', 'payer',
            'rentab*', 'motivation a', 'soncas', 'portefeuille', 'somme*', 'montant*', 'combien', 'investi*', 'trésorerie', 'pécuni*'],
            conseil: 'Nommez sa motivation : l’argent.' },
          { nom: 'Ses mots repris', mots: ['prix', 'coûter', 'coût*', 'combien', 'précisément', 'précis', 'engager', 'm’engager', 's’engager',
            'engagement', 'durée', 'd’abord', 'savoir', 'il dit', 'il veut', 'il souhaite', 'il ne veut', 'il refuse', 'ce qu’il', 'ses propos',
            'ses mots', 'il évoque', 'il parle', 'il exprime', 'il insiste', 'il regarde', 'long terme', 'lié', 'bloqué', 'coincé'],
            conseil: 'Reprenez ce qu’il dit : le prix d’abord, et pas d’engagement.' },
          { nom: 'Les arguments reliés', mots: ['19', 'euro*', 'par mois', 'mensuel*', 'tarif*', 'accessible*', 'abordable*', 'sans engagement',
            'abonnement*', 'liberté', 'libre', 'arrêter', 'résili*', 'sans durée', 'quand il veut', 'quand il le souhaite', 'à tout moment',
            'impact financier', 'risque', 'ces deux arguments', 'ces arguments', 'les deux arguments', 'b et d', 'ces deux cartes'],
            conseil: 'Citez les deux arguments : le tarif à 19 € par mois, l’abonnement sans engagement.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S1 1.5 · Le tournoi : pourquoi le chiffrement l'emporte.
    's1-1.5': { integre: true, blocs: [
      { titre: 'Votre justification', champs: ['why'],
        criteres: [
          { nom: 'Le lien avec le piratage', mots: ['pirat*', 'hack*', 'intrus*', 'attaque*', 'déjà été', 'a déjà', 'reproduis*', 'reproduire',
            'vécu', 'subi', 'expérience', 'passé', 'accès non autorisé', 'accès', 'volé*', 'vol de', 'voler', 'fuite*', 'cyber*', 'malveillan*',
            'virus', 'rançon*', 'recommence*', 'à nouveau', 'de nouveau', 'sa crainte', 'sa peur', 'ce qu’il craint', 'ce qu’il a vécu'],
            conseil: 'Reliez votre choix à ce qu’il a vécu : un piratage.' },
          { nom: 'Ce que protège le chiffrement', mots: ['chiffr*', 'crypt*', 'rgpd', 'conform*', 'illisible*', 'protég*', 'protection',
            'empêch*', 'bloqu*', 'sécuris*', 'personne ne peut', 'inaccessible*', 'clé', 'confidenti*', 'à l’abri', 'en sécurité', 'sécurité',
            'garde*', 'verrouill*', 'intercept*', 'lire', 'lisible*'], conseil: 'Dites ce que fait le chiffrement : personne ne peut lire les données.' },
          { nom: 'Plus précis que la sauvegarde', points: 1, mots: ['sauvegard*', 'perte', 'perdre', 'conséquence*', 'après coup', 'limite*', 'restaur*',
            'récupér*', 'alors que', 'tandis que', 'contrairement', 'plutôt que', 'en amont', 'à la source', 'prévient', 'prévenir', 'prévention',
            'directement', 'précisément', 'le plus', 'prioritaire', 'en priorité', 'avant tout', 'plus que', 'que la', 'mieux que', 'au cœur',
            'principal*', 'premier', 'première', 'd’abord', 'avant même'], conseil: 'Comparez : la sauvegarde limite une perte, le chiffrement empêche l’intrusion.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S1 1.6 · Le pire argumentaire, son diagnostic, puis sa réparation.
    's1-1.6': { integre: true, blocs: [
      { titre: 'Mon pire argumentaire', champs: ['worst'],
        criteres: [
          { nom: 'Du hors sujet', points: 1, mots: ['logo', 'couleur*', 'bleu*', 'rouge', 'vert', 'poids', 'mo', 'méga*', 'léger', 'légère',
            'histoire', 'fond*', 'création', 'design', 'joli*', 'beau', 'belle', 'élégant*', 'esthétique*', 'police', 'icône*', 'locaux',
            'stagiaire*', 'mascotte', 'nom', 'thème', 'mode sombre', 'animation*', 'musique', 'café', 'parking', 'football', 'vacances',
            'anniversaire', 'moderne', 'modernisé', 'version', 'interface', 'mon chien', 'mon chat', 'la météo', 'mon patron', 'ma voiture',
            'notre siège', 'notre équipe de foot', 'notre directeur'], conseil: 'Glissez des informations sans rapport : le logo, la couleur, le poids de l’application…' },
          { nom: 'Du jargon', points: 1, mots: ['saas', 'tenant', 'multi', 'api', 'rest', 'aes', '256', 'sso', 'bi', 'crm', 'cloud', 'backend',
            'back-end', 'front*', 'serveur*', 'base de données', 'sql', 'json', 'http*', 'protocole*', 'algorithme*', 'cluster*', 'docker',
            'kubernetes', 'devops', 'scalab*', 'interopérab*', 'middleware', 'framework', 'machine learning', 'ia', 'intelligence artificielle',
            'blockchain', 'big data', 'kpi', 'roi', 'erp', 'ux', 'ui', 'open source', 'microservice*', 'latence', 'bande passante',
            'architecture', 'asymétrique', 'token', 'authentification', 'ldap', 'oauth', 'webhook*', 'synchro*', 'incrémental*', 'redondan*',
            'hébergement', 'infrastructure', 'ssl', 'tls', 'vpn', 'ios', 'android', 'technolog*', 'natif', 'native', 'responsive', 'jargon'],
            conseil: 'Empilez des sigles sans les expliquer : SaaS, API, SSO…' },
          { nom: 'Un catalogue de fonctions', points: 1, mots: ['et aussi', 'en plus', 'également', 'de plus', 'sans oublier', 'ainsi que',
            'mais aussi', 'il y a aussi', 'on a aussi', 'nous avons aussi', 'il y a encore', 'etc', 'et puis', 'aussi', 'plein de',
            'beaucoup de', 'de nombreuses', 'de nombreux', 'des dizaines', 'des centaines', 'toutes les', 'tous les', 'liste', 'fonction*',
            'option*', 'module*', 'possède', 'dispose', 'intègre', 'propose', 'inclut', 'comprend', 'fonctionne', 'gère'],
            conseil: 'Récitez les fonctions à la suite, sans les relier au client.' },
          { nom: 'Un ton hésitant ou une affirmation gratuite', points: 1, mots: ['je pense', 'peut-être', 'normalement', 'en principe',
            'je crois', 'il me semble', 'probablement', 'sans doute', 'je ne sais pas', 'j’imagine', 'éventuellement', 'je suppose', 'euh',
            'à peu près', 'le meilleur', 'la meilleure', 'meilleur', 'forcément', 'sans aucun doute', 'incroyable', 'révolutionnaire',
            'parfait', 'génial', 'extraordinaire', 'numéro un', 'leader', 'imbattable', 'unique', 'top', 'clairement', 'évidemment',
            'tout le monde', 'aucun concurrent', 'vous ne trouverez pas mieux', 'croyez-moi', 'faites-moi confiance', 'je vous le garantis',
            'c’est sûr', 'bref', 'enfin bon'], conseil: 'Ajoutez des « je pense », ou un « c’est le meilleur » sans preuve.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Mon diagnostic', motif: 'error',
        criteres: [
          { nom: 'Les besoins ignorés ou le hors sujet', mots: ['hors sujet', 'hors-sujet', 'besoin*', 'attente*', 'ignor*', 'pas adapté',
            'inadapt*', 'ne répond pas', 'répond à rien', 'aucun rapport', 'sans rapport', 'sans lien', 'pas de lien', 'n’intéresse pas',
            'intéresse pas', 'inutile*', 'pas ciblé', 'mal ciblé', 'cibl*', 'pertinen*', 'à côté', 'priorité*', 'sécurité', 'budget',
            'accompagnement', 'logo', 'couleur', 'poids', 'superflu*', 'futile*', 'anecdotique*', 'ne concerne pas', 'ne parle pas de',
            'oubli*', 'n’écoute pas', 'écout*', 'préoccupation*', 'demande*', 'ce qu’il veut', 'ce qu’il attend'], conseil: 'Repérez les informations sans rapport avec les trois besoins.' },
          { nom: 'Le jargon', mots: ['jargon', 'technique*', 'sigle*', 'acronyme*', 'incompréhensible*', 'compren*', 'complexe*', 'compliqué*',
            'vocabulaire', 'termes', 'mots', 'charabia', 'perdu', 'clair', 'flou', 'obscur', 'expliqu*', 'traduit', 'traduire', 'langage',
            'saas', 'api', 'sso'], conseil: 'Repérez les termes techniques non expliqués.' },
          { nom: 'Ni bénéfice ni preuve', mots: ['bénéfice*', 'avantage*', 'caractéristique*', 'liste', 'catalogue', 'énumér*', 'accumul*',
            'trop d’informations', 'trop d’arguments', 'trop de fonctions', 'noie', 'noy*', 'avalanche', 'preuve*', 'prouv*', 'chiffre*',
            'gratuit*', 'affirmation*', 'crédib*', 'démontr*', 'justifi*', 'meilleur', 'prétenti*', 'arrogan*', 'péremptoire*', 'hésit*',
            'ton', 'peut-être', 'je pense', 'assurance', 'convain*', 'promesse*', 'vantard', 'sans fondement', 'pas étayé', 'rien ne prouve'],
            conseil: 'Repérez l’absence de bénéfice et de preuve, ou le ton hésitant.' },
          { nom: 'L’effet sur le client', mots: EFFET_CLIENT.concat(['il ne', 'il se', 'il risque', 'n’achète', 'ne signe', 'refus*', 'partir',
            'fuir', 'part', 'donne', 'donc', 'ce qui', 'conséquence*', 'risque']), conseil: 'Dites l’effet de chaque erreur : le client décroche, doute…' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Mon argumentaire réparé', champs: ['fixed'],
        criteres: [
          { nom: 'La sécurité des données', mots: ['sécuris*', 'sécurité', 'protég*', 'protection', 'chiffr*', 'crypt*', 'sauvegard*', 'rgpd',
            'à l’abri', 'perte', 'perdre', 'pirat*', 'confidenti*', 'audit*', 'copie*', 'en sécurité'], conseil: 'Répondez au besoin n° 1 : sécuriser les données.' },
          { nom: 'L’accompagnement', mots: ['assistance', 'accompagn*', 'support', 'aide', 'aidé', 'aidée', 'aider', 'dépann*', '7j', '7 jours',
            'tous les jours', 'disponible*', 'informatique', 'informaticien*', 'technicien*', 'équipe technique', 'répon*', 'formation',
            'conseiller*', 'hotline', 'joindre', 'à vos côtés', 'jamais seul', 'quelqu’un', 'pris en charge', 'nous nous occupons', 'on s’occupe'],
            conseil: 'Répondez au besoin n° 2 : être accompagné sans service informatique.' },
          { nom: 'Le budget', mots: BUDGET, conseil: 'Répondez au besoin n° 3 : maîtriser son budget.' },
          { nom: 'Des bénéfices pour le client', mots: BENEFICE, conseil: 'Traduisez chaque fonction en ce que le client y gagne.' },
          preuve('Une preuve', 'Ajoutez au moins une preuve : un chiffre, un audit, une garantie.')
        ],
        phrases: { attendues: 2, points: 1 },
        pieges: [PIEGE_JARGON, PIEGE_HESITANT] }
    ] },

    // S2 2.3 · Le studio d'accroches : question, chiffre-choc, bénéfice projeté.
    's2-2.3': { integre: true, blocs: [
      { titre: 'Question', champs: ['hook0'],
        criteres: [
          { nom: 'Le temps perdu visé', mots: TACHES, conseil: 'Visez son problème : le temps perdu dans les tâches répétitives.' },
          client,
          { nom: 'Une question qui fait réfléchir', mots: QUESTION_OUVERTE.concat(['saviez-vous', 'et si', 'imaginez', 'avez-vous déjà',
            'ça vous arrive', 'cela vous arrive', 'vous est-il', 'vous arrive-t-il', 'combien de', 'qu’est-ce que vous', 'que feriez-vous',
            'vous rendez-vous compte', 'vous êtes-vous déjà', 'ne vous est-il jamais']), conseil: 'Une question qui l’amène à compter son temps perdu : « Combien… ? ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une vraie question', points: 1 }] },
      { titre: 'Chiffre-choc', champs: ['hook1'],
        criteres: [
          { nom: 'Un chiffre', mots: NOMBRES, conseil: 'Appuyez-vous sur un chiffre : des heures, un pourcentage, un nombre de clients.' },
          { nom: 'Le problème ou le gain rendu concret', mots: TACHES.concat(GAIN_TEMPS), conseil: 'Reliez le chiffre au temps perdu, ou au temps gagné.' },
          { nom: 'Qui la concerne', mots: CLIENT.concat(['nos clients', 'les gérant*', 'les pme', 'les entreprises', 'les dirigeant*', 'une pme',
            'les commerçant*', 'chaque gérant', 'les petites entreprises', 'les patrons', 'les indépendants', 'les artisans', 'les boutiques',
            'un gérant', 'une gérante', 'chaque semaine', 'chaque jour', 'par semaine', 'par jour', 'par an', 'chaque année']),
            conseil: 'Parlez d’elle, ou de dirigeants comme elle.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Bénéfice projeté', champs: ['hook2'],
        criteres: [
          { nom: 'Une projection', mots: ['imaginez', 'imagin*', 'et si', 'pensez', 'visualis*', 'figurez-vous', 'demain', 'bientôt', 'dès demain',
            'dès lundi', 'dès la semaine prochaine', 'enfin', 'plus jamais', 'ne plus', 'n’aurez plus', 'n’ayez plus', 'pourriez', 'pourrez',
            'aurez', 'auriez', 'serez', 'seriez', 'ferez', 'feriez', 'consacrerez', 'consacreriez', 'gagnerez', 'gagneriez', 'récupérerez',
            'quitterez', 'rentrerez', 'partirez', 'votre semaine', 'vos soirées', 'vos week-ends', 'ce serait', 'que diriez-vous',
            'que feriez-vous', 'rêve*', 'idéal*', 'libéré*', 'libér*', 'fini', 'finie', 'finies', 'terminé*', 'adieu', 'zéro', 'à l’avenir',
            'désormais', 'dorénavant', 'à partir de', 'chaque soir', 'chaque vendredi', 'un jour', 'votre prochaine', 'représentez-vous',
            'vous vous voyez', 'vous voyez-vous', 'envisagez'], conseil: 'Projetez-la dans le résultat : « Imaginez… », « Demain, vous… ».' },
          { nom: 'Le résultat vécu', mots: GAIN_TEMPS.concat(['temps', 'libre', 'esprit', 'développer', 'ce qui compte', 'famille', 'soirée*',
            'week-end*', 'rentrer', 'plus tôt', 'jamais perdre', 'aucune information', 'information*', 'tâche*', 'vendre', 'vente*',
            'croissance', 'calme', 'clients', 'équipe*', 'projet*', 'stress', 'perdre']), conseil: 'Décrivez ce que serait sa semaine une fois le problème réglé.' },
          client
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S2 2.5 · L'audit du pitch : la modification prioritaire.
    's2-2.5': { integre: true, blocs: [
      { titre: 'Votre modification prioritaire', champs: ['priority'],
        criteres: [
          { nom: 'La preuve désignée', mots: ['preuve*', 'prouv*', 'chiffr*', 'chiffre*', 'donnée*', 'des faits', 'un fait', 'fait vérifiable', 'fait concret', 'vérifiable*', 'concret*',
            'exemple*', 'témoignage*', 'référence*', 'étude*', 'statistique*', 'démonstration', 'démontr*', 'étay*', 'appui*', 'appuy*',
            'justifi*', 'crédib*', 'cas client', 'clients', 'pme', 'audit*', 'rgpd', 'certifi*', 'quantifi*', 'mesur*', 'résultat*', 'avis',
            'pourcentage', 'nombre*', 'élément* factuel*', 'factuel*', 'tangible*', 'garanti*', 'retour* client*', 'combien'],
            conseil: 'Le point faible du pitch : aucune preuve. Désignez-la.' },
          { nom: 'Une modification concrète', mots: ['ajout*', 'rajout*', 'intégr*', 'insér*', 'mettre', 'citer', 'cite', 'donner', 'apporter',
            'appuyer', 'illustrer', 'préciser', 'mentionner', 'glisser', 'compléter', 'remplacer', 'chaque bénéfice', 'chaque promesse',
            'chaque affirmation', 'par exemple', 'comme', 'après', 'à la place', 'au lieu de', 'il faut', 'il faudrait', 'je mettrais',
            'j’ajouterais', 'j’intégrerais', 'je citerais', 'je donnerais', 'on pourrait', 'il manque', 'manque', 'manquent', 'absence',
            'aucun', 'aucune'], conseil: 'Dites quoi ajouter, et où : « Ajouter un chiffre après chaque bénéfice… ».' },
          { nom: 'Pourquoi elle compte', mots: RAISON.concat(['sans preuve', 'promesse*', 'affirmation*', 'reste', 'rester', 'crédib*',
            'convain*', 'rassur*', 'confiance', 'croire', 'parole', 'percutant*', 'impact', 'poids', 'force']),
            conseil: 'Dites ce que la modification change : sans preuve, la promesse reste une affirmation.' }
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S2 2.6 · Le pitch de 60 secondes, pour un prospect soucieux de sécurité.
    's2-2.6': { integre: true, blocs: [
      { titre: 'Votre pitch', champs: ['pitch'],
        criteres: [
          { nom: 'Une accroche tournée vers lui', mots: ['votre priorité', 'vos données', 'votre sécurité', 'imaginez', 'saviez-vous', 'et si',
            'combien', 'avez-vous déjà', 'vous avez', 'vous êtes', 'vous savez', 'vous voulez', 'vous cherchez', 'vous souhaitez', 'ce qui compte',
            'votre préoccupation', 'votre inquiétude', 'votre crainte', 'je sais que', 'vous m’avez dit', 'vous me disiez', 'pour vous',
            'pour une entreprise comme', 'une seule fuite', 'une cyberattaque', 'chaque jour', 'chaque année', 'pirat*', 'fuite*', 'cauchemar',
            'pire', 'bonjour', 'vous tenez', 'vous tient à cœur', 'vous préoccupe', 'vous inquiète', 'vos clients', 'votre entreprise'],
            conseil: 'Ouvrez sur lui : sa priorité, sa crainte, une question.' },
          { nom: 'Son besoin de sécurité', mots: SECURITE, conseil: 'Restez sur ce qui compte pour lui : la sécurité.' },
          { nom: 'Des bénéfices concrets', mots: BENEFICE, min: 2, conseil: 'Deux bénéfices : ce qu’il y gagne, en clair.' },
          preuve('Des preuves', 'Chaque bénéfice a sa preuve : un chiffre, un audit, un nombre de clients.'),
          { nom: 'Une conclusion qui engage', mots: SUITE, conseil: 'Concluez par une proposition : « Je vous propose qu’on regarde ensemble… ».' }
        ],
        phrases: { attendues: 3, points: 1 },
        regles: [{ regle: 'maxMots:150', nom: '60 secondes à l’oral', points: 1 }],
        pieges: [PIEGE_HESITANT, PIEGE_JARGON] }
    ] },

    // S3 3.1 · Repérez l'intrus : expliquer pourquoi l'affirmation est fausse.
    's3-3.1': { integre: true, blocs: [
      { titre: 'Série A', champs: ['why0'],
        criteres: [
          { nom: 'Trop d’arguments diluent le message', mots: ['trop d’arguments', 'trop d’informations', 'trop d’info*', 'trop', 'accumul*',
            'enchaîn*', 'noie', 'noy*', 'dilu*', 'surcharg*', 'satur*', 'avalanche', 'quantité', 'qualité', 'moins c’est plus', 'retenir',
            'mémoire', 'mémoris*', 'l’essentiel', 'essentiel', 'quelques arguments', 'peu d’arguments', 'sélection*', 'cibl*', 'fatigu*',
            'lass*', 'ennui*', 'sur-argument*', 'surargument*', 'catalogue', 'liste', 'plus on', 'nombre', 'beaucoup', 'tout dire',
            'submerg*', 'important*', 'pertinent*', 'bombard*', 'déluge', 'flot', 'mitraill*'], conseil: 'Dites ce que fait l’accumulation : elle noie les arguments importants.' },
          { nom: 'L’effet sur le client', mots: EFFET_CLIENT, conseil: 'Dites ce que vit le client : il décroche, ne retient rien.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Série B', champs: ['why1'],
        criteres: [
          { nom: 'Le jargon brouille le message', mots: ['jargon', 'technique*', 'vocabulaire', 'mots', 'termes', 'compren*', 'incompréhens*',
            'pas compris', 'clair', 'clarté', 'complexe*', 'compliqué*', 'perdu', 'adapt*', 'interlocuteur', 'niveau', 'simple*', 'traduire',
            'traduit', 'expliqu*', 'bénéfice*', 'concret*', 'charabia', 'sigle*', 'acronyme*', 'pédago*', 'masque', 'cache', 'barrière',
            'intimid*', 'n’ose pas', 'pas toujours', 'toujours', 'spécialiste*', 'expert*', 'connaisseur*', 'langage', 'parler simplement'],
            conseil: 'Dites ce que fait le jargon : le client ne comprend plus le bénéfice.' },
          { nom: 'L’effet sur le client', mots: EFFET_CLIENT, conseil: 'Dites ce que vit le client : il se sent perdu, n’ose pas demander.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Série C', champs: ['why2'],
        criteres: [
          { nom: 'Un argument hors de ses besoins', mots: ['besoin*', 'exprimé*', 'attente*', 'priorité*', 'préoccupation*', 'pas demandé',
            'n’a pas demandé', 'ne l’intéresse pas', 'n’intéresse', 'intéresse pas', 'hors sujet', 'hors-sujet', 'à côté', 'détourn*',
            'dispers*', 'écart*', 'sans lien', 'sans rapport', 'pertinen*', 'inutile*', 'pas toujours', 'toujours', 'écout*', 'cibl*',
            'ce qui compte', 'ce qui l’intéresse', 'ce qu’il veut', 'ce qu’il attend', 'ce qu’il cherche', 'pas concerné', 'concerne pas',
            'ne correspond', 'correspond pas', 'n’a rien à voir', 'rien à voir', 'demande'], conseil: 'Dites le problème : l’argument ne répond à aucun besoin exprimé.' },
          { nom: 'L’effet sur le client', mots: EFFET_CLIENT, conseil: 'Dites ce que vit le client : il se sent peu écouté, l’échange s’égare.' },
          raison
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S3 3.5 · Vérifier avant d'avancer : la question de contrôle.
    // Un bloc par réplique, compté seulement si une question est écrite.
    's3-3.5': { integre: true, blocs: [0, 1, 2, 3].map(i => ({
      titre: `Réplique ${i + 1}`, champs: [`q${i}`], siRempli: true,
      criteres: [
        { nom: 'Une question qui donne la parole', mots: CONTROLE.concat(QUESTION_OUVERTE), conseil: 'Demandez son avis : « Est-ce que cela… ? », « Qu’en pensez-vous ? ».' },
        { nom: 'Reliée à son besoin', mots: [
          ['temps', 'gagner', 'gain', 'quotidien', 'différence', 'utile', 'administrati*', 'heure*', 'semaine', 'changer*', 'valeur', 'compte'],
          ['devis', 'clic', 'double saisie', 'saisie', 'saisir', 'temps', 'gagn*', 'quotidien', 'utile', 'simplifi*', 'facilit*', 'pratique',
            'intéress*', 'besoin*', 'tâche*', 'administrati*', 'travail', 'semaine', 'journée', 'erreur*', 'différence', 'changer*', 'aider', 'aide'],
          ['besoin*', 'temps', 'gagn*', 'lequel', 'laquelle', 'lesquels', 'quel', 'quelle', 'quels', 'ce qui', 'priorit*', 'important*', 'compte',
            'élément*', 'fonction*', 'parmi', 'utile*', 'intéress*', 'attend*', 'répond*', 'correspond*', 'le plus', 'le mieux', 'pour vous',
            'tâche*', 'administrati*', 'retenez', 'retiendriez', 'préférez', 'essentiel'],
          ['besoin*', 'temps', 'administrati*', 'répond*', 'correspond*', 'utile', 'attente*', 'gagn*', 'quotidien', 'tâche*']][i],
          conseil: 'Reliez la question à l’argument et à son besoin : gagner du temps.' }
      ],
      phrases: { attendues: 1, points: 1 },
      regles: [{ regle: 'avecQuestion', nom: 'Une vraie question', points: 1 }],
      pieges: [{ nom: 'Une question qui force la main', points: 1, mots: ['n’est-ce pas', 'vous êtes d’accord que', 'vous voulez signer', 'on signe',
        'je vous le mets', 'vous le prenez', 'on valide', 'je vous inscris', 'je vous envoie le contrat', 'non ?', 'hein'],
        conseil: 'Une question de contrôle cherche son avis, sans pousser à dire oui.' }]
    })) },

    // S3 3.6 · L'arbre des réactions : le tronc CAP, puis deux branches.
    's3-3.6': { integre: true, blocs: [
      { titre: 'Caractéristique', champs: ['t0'],
        criteres: [
          { nom: 'Une fonction de l’outil', mots: ['automatis*', 'automatique*', 'génér*', 'import*', 'export*', 'envoi*', 'envoie', 'synchronis*',
            'centralis*', 'rempli*', 'remplit', 'crée', 'créer', 'calcul*', 'classe', 'class*', 'trie', 'archiv*', 'programm*', 'planifi*',
            'relance', 'rappel*', 'scann*', 'numéris*', 'transform*', 'connect*', 'reli*', 'propose', 'intègre', 'dispose', 'permet', 'offre',
            'inclut', 'fait', 'gère', 'fonction*', 'module*', 'outil', 'logiciel', 'solution', 'relacosy', 'modèle*', 'tableau de bord',
            'notification*', 'signature', 'reconnaissance', 'pré-rempli*', 'en un clic', 'clic', 'application', 'plateforme'],
            conseil: 'Décrivez une fonction concrète de l’outil, en une phrase.' },
          { nom: 'Reliée à la tâche à alléger', mots: TACHES, conseil: 'Choisissez une fonction qui supprime une tâche administrative : saisie, relances, devis.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Avantage', champs: ['t1'],
        criteres: [client, { nom: 'Le temps récupéré', mots: GAIN_TEMPS.concat(['temps', 'administrati*', 'tâche*']), conseil: 'Dites ce qu’il y gagne : du temps, moins de tâches.' }],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Preuve', champs: ['t2'],
        criteres: [
          preuve('Un fait vérifiable', 'Un chiffre, un nombre de clients, un témoignage, une démonstration.'),
          { nom: 'Ce qu’elle prouve', mots: GAIN_TEMPS.concat(['temps', 'heure*', 'gain', 'semaine', 'fonctionnalité*', 'utilis*', 'clients',
            'entreprises', 'pme', 'saisie*', 'tâche*', 'administrati*', 'avant', 'après']), conseil: 'Reliez la preuve au gain promis.' }
        ],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Client convaincu', champs: ['t3'],
        criteres: [
          { nom: 'L’accord accueilli', mots: ['très bien', 'parfait', 'super', 'excellent', 'ravi', 'ravie', 'content', 'contente', 'tant mieux',
            'génial', 'bonne nouvelle', 'je suis heureux', 'je suis heureuse', 'd’accord', 'entendu', 'formidable', 'top', 'c’est noté', 'je note',
            'merci', 'bien', 'exactement', 'tout à fait', 'absolument', 'oui', 'je comprends', 'c’est l’objectif', 'c’est le but', 'parfaitement',
            'impeccable', 'heureux', 'heureuse', 'plaisir', 'je m’en réjouis', 'ça me fait plaisir', 'cela me fait plaisir', 'bravo', 'bonne idée',
            'c’est une bonne', 'ok'], conseil: 'Validez son intérêt d’un mot : « Très bien. »' },
          { nom: 'La suite proposée', mots: SUITE.concat(['autre poste', 'autre point', 'autre tâche', 'ensuite', 'maintenant', 'contrat',
            'signer', 'commande', 'compte', 'concrètement', 'pratique', 'organiser', 'calendrier', 'formation', 'votre équipe', 'vos équipes',
            'mettre en route', 'configur*', 'paramétr*', 'prochain*', 'suivant*', 'on passe', 'passer à']), conseil: 'Avancez : une autre étape, une autre tâche à alléger.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [{ nom: 'Un argument de trop', points: 1, mots: ['et en plus', 'mais ce n’est pas tout', 'et ce n’est pas tout', 'sans oublier',
          'il y a aussi', 'nous avons aussi', 'on a aussi', 'je vous rappelle que', 'n’oubliez pas que', 'en outre', 'de surcroît', 'sachez aussi',
          'et aussi'], conseil: 'Il est convaincu : inutile de rajouter un argument.' }] },
      { titre: 'Client sceptique', champs: ['t4'],
        criteres: [
          { nom: 'Le doute accueilli', mots: ['d’accord', 'je comprends', 'j’entends', 'je vois', 'entendu', 'très bien', 'bonne remarque',
            'c’est normal', 'c’est légitime', 'bien sûr', 'tout à fait', 'merci', 'c’est une bonne question', 'en effet', 'effectivement',
            'je vous comprends', 'ok', 'compris', 'je note', 'c’est intéressant', 'intéressant', 'logique', 'c’est possible', 'pourquoi pas',
            'vous avez raison', 'je vous entends', 'c’est compréhensible', 'ça se comprend', 'cela se comprend', 'bien noté', 'c’est noté',
            'justement', 'vous faites bien', 'bonne question', 'merci de me le dire', 'merci pour votre franchise'],
            conseil: 'Accueillez sa réserve sans la contredire : « D’accord. »' },
          { nom: 'Une question pour comprendre', mots: QUESTION_OUVERTE.concat(['sur quelles tâches', 'quelles tâches', 'qu’est-ce qui vous prend',
            'où perdez-vous', 'qu’est-ce qui vous fait perdre', 'à votre avis', 'selon vous', 'd’après vous']),
            conseil: 'Questionnez pour savoir où il perd vraiment du temps.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [{ nom: 'Le défendre au lieu de comprendre', points: 1, mots: ['vous vous trompez', 'je vous assure', 'faites-moi confiance',
          'si si', 'croyez-moi', 'mais si', 'détrompez-vous', 'vous avez tort', 'pas du tout', 'je vous garantis', 'c’est prouvé'],
          conseil: 'Ne défendez pas l’argument : cherchez d’abord à comprendre.' }] }
    ] },

    // S4 1.2 · Dérouler la chaîne CAP : avantage et preuve, deux fois.
    's4-1.2': { integre: true, blocs: [
      { titre: 'Livraison en 24 h : l’avantage', champs: ['adv0'],
        criteres: [client, { nom: 'Ce que la rapidité change', mots: ['lendemain', 'demain', 'rapide*', 'vite', 'tout de suite', 'aussitôt',
          'immédiat*', 'sans attendre', 'attend*', 'délai*', 'opérationnel*', 'travailler', 'travail', 'activité', 'interruption', 'interromp*',
          'arrêt*', 'continu*', 'stock*', 'rupture*', 'production', 'chantier*', 'satisf*', 'servir', 'urgence*', 'dépann*', 'à temps',
          'planifi*', 'organis*', 'prévoir', 'temps', 'gagn*', 'perdre', 'perte*', 'retard*', 'serein*', 'tranquill*', 'rassur*', 'compter sur',
          'stress', 'réactiv*', 'livr*', 'reçu', 'recevez', 'recevoir', 'réception', 'disposer', 'disposez', 'disponible*', 'en main', 'utiliser',
          'clients', 'commandes', 'ventes', 'chiffre d’affaires', 'manque*', 'jamais à court', 'à court', 'pas de trou', 'fluide*'],
          conseil: 'Dites ce que la livraison rapide change pour lui : pas d’attente, pas d’arrêt d’activité.' }],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Livraison en 24 h : la preuve', champs: ['proof0'],
        criteres: [preuve(), { nom: 'Elle porte sur la livraison', mots: ['commande*', 'livr*', 'délai*', 'suivi', 'contrat*', 'garanti*', 'pénalité*',
          'rembours*', 'engag*', 'clients', 'avis', 'taux', 'statistique*', 'en 2024', 'année', 'transporteur*', 'traçab*', 'colis', 'expédi*',
          'heure*', '24', 'lendemain', 'temps', 'retard*', 'ponctualité', 'à l’heure', 'respecté*'], conseil: 'Prouvez la promesse de délai : un taux, un engagement écrit.' }],
        phrases: { points: 0 } },
      { titre: 'Formation incluse : l’avantage', champs: ['adv1'],
        criteres: [client, { nom: 'Ce que la formation change', mots: ['maîtris*', 'autonom*', 'rapidement', 'vite', 'prise en main', 'prendre en main',
          'compétent*', 'à l’aise', 'efficace*', 'opérationnel*', 'utiliser', 'utilis*', 'tout de suite', 'sans surcoût', 'gratuit*', 'sans frais',
          'inclus*', 'compris', 'pas de frais', 'économ*', 'budget', 'coût*', 'payer', 'argent', 'erreur*', 'confiance', 'serein*', 'rassur*',
          'adopt*', 'apprendre', 'apprenn*', 'savoir', 'sauront', 'connaître', 'tirer parti', 'profit*', 'exploit*', 'gagn*', 'temps',
          'productiv*', 'form*', 'accompagn*', 'seul', 'seuls', 'perdus', 'bloqué*', 'facile*', 'simple*', 'dès le premier jour', 'aucun supplément'],
          conseil: 'Dites ce que la formation change : des équipes à l’aise vite, sans payer en plus.' }],
        phrases: { attendues: 1, points: 1 } },
      { titre: 'Formation incluse : la preuve', champs: ['proof1'],
        criteres: [preuve(), { nom: 'Elle porte sur la formation', mots: ['session*', 'séance*', 'heure*', 'jour*', 'planifi*', 'devis', 'contrat*',
          'écrit', 'programme', 'formateur*', 'formatrice*', 'certifi*', 'attestation*', 'satisfaction', 'stagiaire*', 'participant*', 'formé*',
          'note', 'avis', 'témoignage*', 'clients', 'calendrier', 'date*', 'form*', 'utilisateur*', 'équipe*', 'inclus*', 'compris', 'facture*',
          'module*', 'support*', 'tutoriel*', 'vidéo*', 'agréé*', 'qualiopi', 'organisme'], conseil: 'Prouvez la formation : des sessions prévues au devis, des clients formés.' }],
        phrases: { points: 0 } }
    ] },

    // S4 2.2 · Passez en mode client : la fiche technique devient un bénéfice.
    's4-2.2': { integre: true, blocs: [
      { titre: 'Logiciel', champs: ['client0'],
        criteres: [client, { nom: 'Le résultat vécu', mots: SECURITE.concat(['sans y penser', 'sans rien faire', 'automatique*', 'tout seul',
          'jamais perdre', 'ne perdez', 'retrouv*', 'panne*', 'bug*', 'plantage*', 'crash*', 'erreur*', 'effac*', 'oubli*', 'travail',
          'données', 'fichier*', 'document*', 'clients', 'temps', 'stress', 'inquiét*', 'souci*', 'tracas', 'tête', 'sans y songer',
          'n’avez plus à', 'n’avez rien à', 'plus besoin', 'ordinateur', 'disque', 'heures de travail']),
          conseil: 'Décrivez ce qu’il vit : ses données protégées sans y penser, rien de perdu.' }],
        phrases: { attendues: 1, points: 1 },
        pieges: [{ nom: 'Encore la fiche technique', points: 1, mots: ['notre logiciel intègre', 'intègre une fonction', 'fonction de sauvegarde automatique'],
          conseil: 'Ne répétez pas la fiche : dites ce qu’elle change pour lui.' }] },
      { titre: 'Immobilier', champs: ['client1'],
        criteres: [{ ...client, mots: CLIENT.concat(['chez vous', 'votre maison', 'votre logement', 'votre appartement',
          'les occupants', 'la famille', 'vos enfants', 'votre famille', 'votre intérieur', 'votre salon']) },
          { nom: 'Le résultat vécu', mots: ['lumière', 'lumineu*', 'clair', 'claire', 'clairs', 'claires', 'clarté', 'soleil', 'ensoleill*', 'matin',
            'soir', 'journée', 'toute la journée', 'du matin au soir', 'lever', 'coucher', 'chaleur', 'chaud', 'chaude', 'chauffage', 'économ*',
            'énergie', 'électricité', 'lampe*', 'éclairage', 'éclairé*', 'agréable*', 'confort*', 'bien-être', 'moral', 'humeur', 'vivre',
            'vie', 'cadre de vie', 'pièce*', 'salon', 'chambre*', 'aér*', 'air', 'ventil*', 'courant* d’air', 'frais', 'fraîcheur', 'vue',
            'dégag*', 'gai', 'gaie', 'chaleureu*', 'spacieu*', 'profit*', 'humidité', 'sec', 'sombre', 'obscur*', 'jour', 'naturel*',
            'apéritif', 'petit-déjeuner', 'petit déjeuner', 'dîner', 'terrasse', 'balcon', 'jardin', 'plantes', 'facture*'],
            conseil: 'Décrivez ce qu’il vit : de la lumière du matin au soir, des pièces agréables.' }],
        phrases: { attendues: 1, points: 1 },
        pieges: [{ nom: 'Encore la fiche technique', points: 1, mots: ['le bien dispose', 'dispose d’une double exposition'],
          conseil: 'Ne répétez pas la fiche : dites ce qu’elle change pour lui.' }] }
    ] },

    // S4 3.2 · Repérer la sur-argumentation : trois erreurs, dans l'ordre qu'on veut.
    's4-3.2': { integre: true, blocs: [
      { titre: 'Votre diagnostic', motif: 'error',
        criteres: [
          { nom: 'Le besoin ignoré', mots: ['besoin*', 'simple*', 'simplicité', 'attente*', 'demande*', 'ce qu’il cherche', 'ce qu’il veut',
            'ce qu’il demande', 'ignor*', 'pas écouté', 'n’écoute pas', 'écout*', 'ne répond pas', 'répond pas', 'à côté', 'hors sujet',
            'hors-sujet', 'pas adapté', 'inadapt*', 'pas pris en compte', 'ne tient pas compte', 'oubli*', 'priorité*', 'facile*',
            'utilisation', 'préoccupation*', 'pertinen*', 'cibl*', 'n’a rien à voir', 'sans rapport', 'sans lien', 'pas de lien'],
            conseil: 'Il cherche la simplicité : rien n’y répond.' },
          { nom: 'L’effet catalogue', mots: ['catalogue', 'liste', 'énumér*', 'accumul*', 'trop d’arguments', 'trop d’informations', 'trop d’info*',
            'trop de fonctions', 'trop de fonctionnalités', 'trop de caractéristiques', 'tous ses arguments', 'tout d’un coup', 'd’un coup',
            'avalanche', 'noie', 'noy*', 'submerg*', 'surcharg*', 'satur*', 'enchaîn*', 'déball*', 'débit', 'trop vite', 'rythme', 'trop',
            'sans sélection', 'sélection*', 'trier', 'tri', 'sur-argument*', 'surargument*', 'en vrac', 'inventaire', 'récit*', 'mitraill*',
            'flot', 'déluge', 'bombard*', 'tout dire', 'quantité', 'beaucoup'], conseil: 'Il déballe tout, sans choisir.' },
          { nom: 'Le jargon', mots: ['jargon', 'technique*', 'sigle*', 'acronyme*', 'aes', 'api', 'sso', 'bi', 'rgpd', 'compren*',
            'incompréhens*', 'vocabulaire', 'termes', 'mots', 'complexe*', 'compliqué*', 'traduit', 'traduire', 'expliqu*', 'charabia',
            'bénéfice*', 'clair', 'langage', 'spécialiste*', 'expert*'], conseil: 'AES-256, API, SSO : rien n’est traduit en bénéfice.' },
          { nom: 'Le monologue, le signal manqué', mots: ['monologu*', 'question*', 'vérifi*', 'réaction*', 'réagir', 'laisse*', 'parole',
            'parler', 'décroch*', 'euh', 'd’accord', 'signal', 'signe*', 'hésit*', 'perdu', 'gêne', 'gêné', 'mal à l’aise', 'échange',
            'dialogue', 'interact*', 'remarque pas', 'ne voit pas', 'observ*', 'impact', 'contrôle*', 'seul', 'tout seul', 'coupe', 'interromp*',
            'respir*', 'pause', 'silence', 'ne s’arrête', 'sans s’arrêter', 'n’écoute', 'attention', 'comportement', 'ne prend pas en compte sa réaction'],
            conseil: 'Aucune question : son « euh, d’accord » montre qu’il décroche.' }
        ],
        phrases: { attendues: 1, points: 1 } }
    ] }
  };
})();
