/* GRILLES D'ANALYSE · réponses ouvertes du module 1-1-4.
 *
 * Lues par moteur/js/indicateur.js, qui calcule un indicateur de points.
 * Une grille par exercice (clé du catalogue) ; chaque bloc lit un ou
 * plusieurs champs (`champs`, ou `motif` : « error » → error0, error1…) et
 * compte ses critères, ses phrases complètes, ses règles et ses pièges. Le
 * détail de l'écriture des expressions est en tête d'indicateur.js.
 *
 * Toutes les grilles sont `integre` : les écrans du module placent eux-mêmes
 * le score dans leur corrigé (js/mounts.js pour les mécaniques communes,
 * js/screens/s2-2-4.js et s4-4-3.js pour les écrans propres).
 *
 * Les familles de mots communes sont en tête : les enrichir profite à tous
 * les exercices qui les emploient. Chaque famille doit reconnaître le plus
 * grand nombre possible de façons justes de dire la même chose.
 */
(() => {
  'use strict';

  const uniq = (...lists) => [...new Set(lists.flat())];

  /* ── Familles communes ──────────────────────────────────────────────── */

  // Accueillir une remarque ou une objection, sans la contredire.
  const ACCUEIL = ['je comprends', 'je vous comprends', 'je comprends tout à fait', 'je comprends bien', 'je le comprends', 'je peux comprendre',
    'j’entends', 'je vous entends', 'je vous entends bien', 'j’entends bien', 'je vois', 'je vois ce que vous voulez dire', 'c’est légitime',
    'c’est normal', 'c’est bien normal', 'c’est tout à fait normal', 'c’est compréhensible', 'ça se comprend', 'cela se comprend',
    'merci de me le dire', 'merci pour votre franchise', 'merci de votre franchise', 'merci pour cette remarque', 'je vous remercie',
    'bonne remarque', 'bonne question', 'c’est une bonne question', 'c’est une vraie question', 'c’est une question importante',
    'tout à fait', 'en effet', 'effectivement', 'bien sûr', 'bien entendu', 'évidemment', 'absolument', 'entendu', 'd’accord', 'très bien',
    'je note', 'je prends note', 'noté', 'c’est vrai', 'c’est juste', 'très juste', 'vous avez raison de', 'vous faites bien de',
    'c’est possible', 'c’est tout à fait possible', 'possible', 'c’est une vraie somme', 'c’est un vrai budget', 'c’est un investissement',
    'c’est un budget', 'c’est une somme', 'je comprends votre réaction', 'je comprends votre surprise', 'je comprends votre question',
    'je comprends votre remarque', 'je comprends votre hésitation', 'votre remarque est légitime', 'votre question est légitime',
    'vous n’êtes pas le seul', 'vous n’êtes pas la seule', 'beaucoup de clients', 'plusieurs clients', 'c’est important', 'je vous rejoins',
    'je vous suis', 'oui', 'certes', 'volontiers', 'avec plaisir', 'pas de souci', 'aucun souci', 'je respecte', 'c’est une bonne chose',
    'vous avez raison de comparer', 'c’est sain de comparer', 'c’est normal de comparer', 'heureusement que vous comparez'];

  // Une question ouverte (et ses tournures orales).
  const QUESTION_OUVERTE = ['qu’est-ce qui', 'qu’est-ce que', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'sur quoi', 'de quoi',
    'par rapport à quoi', 'par rapport à', 'dans quelle mesure', 'en quoi', 'à quel point', 'à quoi', 'que pensez-vous', 'qu’en pensez-vous',
    'racontez-moi', 'dites-moi', 'parlez-moi', 'expliquez-moi', 'pourriez-vous préciser', 'pouvez-vous préciser', 'précisez', 'combien',
    'pourquoi', 'lequel', 'laquelle', 'lesquels', 'lesquelles', 'comparé à', 'comparé à quoi', 'comparez', 'vous le comparez', 'vous comparez',
    'qu’attendez-vous', 'que recherchez-vous', 'qu’aimeriez-vous', 'que voulez-vous dire', 'c’est-à-dire', 'dites-m’en plus',
    'à quel moment', 'depuis quand', 'de quelle façon', 'de quelle manière', 'avez-vous', 'y a-t-il', 'est-ce que', 'est-ce qu*',
    'quand vous dites', 'qu’entendez-vous', 'que voulez-vous', 'qu’est-ce qui vous fait dire', 'qu’est-ce qui vous', 'à combien',
    'vous aviez', 'vous pensiez', 'vous imaginiez', 'vous attendiez', 'aviez-vous', 'pensiez-vous', 'est-ce par rapport', 'est-ce surtout',
    'est-ce plutôt', 'c’est par rapport', 'c’est plutôt', 'c’est surtout'];

  // Expliquer pourquoi.
  const RAISON = ['parce que', 'parce qu*', 'car', 'puisque', 'puisqu*', 'comme', 'ce qui', 'cela', 'ça permet', 'cela permet', 'permet de',
    'permet', 'afin de', 'afin que', 'pour que', 'donc', 'ainsi', 'c’est pourquoi', 'en effet', 'grâce à', 'cela montre', 'ce qui montre',
    'cela évite', 'ce qui évite', 'alors que', 'tandis que', 'contrairement', 'au lieu de', 'sans', 'de façon à', 'de manière à', 'du coup',
    'résultat', 'si bien que', 'de sorte que', 'voilà pourquoi', 'c’est ce qui', 'c’est pour ça', 'c’est pour cela', 'vu que', 'étant donné',
    'dans la mesure où', 'en fait', 'autrement dit', 'à cause', 'en raison', 'plus', 'moins', 'mieux'];

  // Dire que l'on compare deux choses.
  const COMPARAISON = ['alors que', 'tandis que', 'contrairement', 'à l’inverse', 'au contraire', 'par rapport', 'par contraste', 'à la différence',
    'l’autre', 'la première', 'la seconde', 'la deuxième', 'la 1', 'la 2', 'annonce 1', 'annonce 2', 'réponse 1', 'réponse 2', 'relance a',
    'relance b', 'la a', 'la b', 'plus', 'moins', 'mieux', 'meilleur', 'meilleure', 'plutôt que', 'au lieu de', 'quant à', 'en revanche', 'par contre',
    'elle aussi', 'les deux', 'l’une', 'pas comme', 'ne fait pas', 'n’a pas'];

  // Ce que le client y gagne.
  const BENEFICE = ['confort', 'confortable', 'confortables', 'dos', 'soulag*', 'préserv*', 'protèg*', 'protég*', 'santé', 'bien-être', 'bien être',
    'douleur*', 'mal de dos', 'maux de dos', 'posture', 'postur*', 'fatigue', 'fatigué*', 'énergie', 'tonus', 'productiv*', 'efficac*', 'performan*',
    'concentr*', 'gagner', 'gagnez', 'gagnent', 'gain', 'gains', 'moins d’arrêts', 'arrêts', 'absences', 'absentéisme', 'tms', 'troubles musculo',
    'au quotidien', 'tous les jours', 'chaque jour', 'toute la journée', 'tout au long de la journée', 'permet*', 'vous apporte', 'apporte',
    'vous offre', 'vous profitez', 'profit*', 'bénéfici*', 'amélior*', 'réduit', 'réduire', 'réduisez', 'limit*', 'facilit*', 'adapt*', 'sur mesure',
    'réglable', 'réglables', 'régl*', 'ergonom*', 'qualité', 'durable', 'robuste', 'solide', 'fiable', 'serein', 'sereine', 'sereins', 'sérénité',
    'tranquill*', 'simplicité', 'simple', 'pratique', 'motiv*', 'satisf*', 'plaisir', 'agréable', 'collaborateurs', 'équipes', 'salariés',
    'image', 'attractiv*', 'fidélis*', 'altern*', 'assis-debout', 'debout', 'bouger', 'mouvement', 'gagner du temps', 'économ*', 'mieux',
    'travailler mieux', 'meilleur', 'meilleure', 'morphologie', 'personnalis*', 'accompagnement', 'accompagn*', 'suivi', 'service', 'aide'];

  // Ce qui rassure après le prix : garantie, essai, services compris.
  const REASSURANCE = ['garantie', 'garanti', 'garantis', 'garanties', '5 ans', 'cinq ans', 'essai', 'essais', 'essayer', 'essayez', 'à l’essai',
    '30 jours', 'trente jours', 'un mois', 'gratuit', 'gratuite', 'gratuitement', 'offert', 'offerte', 'sans frais', 'sans engagement',
    'satisfait ou remboursé', 'rembours*', 'sav', 'service après-vente', 'après-vente', '48 h', '48 heures', '48h', 'sous 48', 'installation',
    'installé', 'installés', 'livraison', 'livré', 'livrés', 'formation', 'formés', 'étude ergonomique', 'étude', 'inclus', 'incluse', 'incluses',
    'inclut', 'compris', 'comprise', 'comprises', 'comprend', 'couvert', 'couverte', 'pièces et main-d’œuvre', 'main-d’œuvre', 'pris en charge',
    'on s’occupe de tout', 'nous nous occupons', 'je m’occupe', 'clé en main', 'clés en main', 'tranquill*', 'serein*', 'sérénité', 'rassur*',
    'sécuris*', 'sans risque', 'aucun risque', 'sans surprise', 'sans coût supplémentaire', 'aucun coût', 'aucun frais', 'sans supplément',
    'suivi', 'accompagn*', 'assistance', 'support', 'interlocuteur', 'je reste disponible', 'nous restons', 'à vos côtés', 'pendant 12 mois',
    '12 mois', 'douze mois', 'toute l’année', 'durée de vie', 'longtemps', 'durable', 'certifié', 'normes', 'label', 'remplac*', 'dépannage',
    'intervention', 'réactivité', 'réactif', 'assurance', 'assuré', 'protégé', 'tout compris', 'zéro souci', 'sans souci', 'en toute confiance'];

  // Les mots qui annoncent un prix.
  const PRIX_MOTS = ['investissement', 'prix', 'tarif', 'coûte', 'coût', 'montant', 's’élève', 'revient à', 'il est à', 'elle est à', 'est à',
    'l’ensemble est à', 'pour un montant', 'euros', 'euro', 'budget', 'proposé à', 'facturé', 'au prix de', 'représente', 'vous investissez',
    'pour seulement', 'il vous en coûtera', 'cela fait', 'ça fait', 'c’est'];

  // Ramener le prix à l'usage.
  const USAGE = ['par jour', 'par mois', 'par an', 'par année', 'par semaine', 'par poste', 'par salarié', 'par personne', 'par collaborateur',
    'par utilisateur', 'par tête', 'par employé', 'chaque jour', 'chaque mois', 'chaque poste', 'chaque salarié', 'au quotidien', 'quotidien',
    'centimes', 'centime', 'moins d’un euro', 'moins de 40', 'moins de 7', '7 €', 'sept euros', '200 € par mois', '0,38', '38', '1 700', '1700',
    'sur 5 ans', 'sur cinq ans', 'sur la durée', 'sur l’année', 'sur un an', 'à l’année', 'ramené', 'ramenée', 'rapporté', 'rapportée',
    'si on le ramène', 'si l’on rapporte', 'si on rapporte', 'divisé', 'divisez', 'soit', 'cela représente', 'ça représente', 'représente',
    'revient à', 'ça revient', 'cela revient', 'le prix d’un café', 'un café', 'durée d’utilisation', 'durée de vie', 'amorti', 'amortir',
    'amortissement', 'à l’usage', 'usage', 'utilisation', 'décompos*', 'mensualité*', 'mensuel*', 'étaler', 'étalé'];

  // Ce que le prix comprend.
  const VALEUR_COMPRISE = ['comprend', 'comprennent', 'compris', 'comprise', 'comprises', 'inclut', 'inclus', 'incluse', 'incluses', 'intègre',
    'intégré', 'avec', 'garantie', '5 ans', 'cinq ans', 'installation', 'livraison', 'sav', 'service après-vente', '48 h', '48 heures', 'suivi',
    'formation', 'étude ergonomique', 'étude', 'accompagnement', 'essai', '30 jours', 'diagnostic', 'conseil', 'pièces', 'main-d’œuvre',
    'tout compris', 'clé en main', 'clés en main', 'sans supplément', 'sans coût supplémentaire', 'pas de frais', 'aucun frais', 'aucune prestation',
    'pas de prestation', 'prestation complémentaire', 'coût global', 'global', 'dans le prix', 'dans ce prix', 'ce prix couvre', 'couvre',
    'ce que vous obtenez', 'ce que vous avez', 'ce que comprend', 'ce qui est compris', 'ce qui est inclus', 'contenu', 'qualité', 'durée de vie',
    'ergonom*', 'réglable', 'confort', 'santé', 'dos', 'arrêts', 'valeur', 'bénéfice*', 'avantage*', 'atouts', 'services', 'service'];

  // Comparer à périmètre égal.
  const PERIMETRE = ['même périmètre', 'périmètre', 'à périmètre égal', 'comparer', 'comparons', 'comparaison', 'compar*', 'équivalent',
    'équivalente', 'équivalents', 'la même chose', 'les mêmes', 'mêmes services', 'mêmes prestations', 'même prestation', 'à l’identique',
    'comparable', 'comparables', 'inclus aussi', 'également inclus', 'également incluses', 'aussi inclus', 'est-ce que l’autre', 'l’autre offre',
    'l’offre concurrente', 'offre concurrente', 'l’autre devis', 'l’autre proposition', 'l’autre fournisseur', 'votre autre', 'chez l’autre',
    'dans les deux offres', 'les deux offres', 'les deux devis', 'les deux propositions', 'point par point', 'ligne par ligne', 'poste par poste',
    'ce que comprend', 'ce qu’elle comprend', 'ce qu’il comprend', 'ce qui est compris', 'ce qui est inclus', 'contenu', 'détail', 'détails',
    'regardons', 'regarder', 'vérifier', 'vérifions', 'examiner', 'examinons', 'mettre côte à côte', 'côte à côte', 'en parallèle',
    'mettre en regard', 'installation', 'garantie', 'sav', 'étude', 'livraison', 'formation', 'pommes et des poires', 'pommes avec des poires'];

  // Ce que coûte le statu quo.
  const INACTION = ['coût de l’inaction', 'ne rien faire', 'rien faire', 'statu quo', 'attendre', 'ce que coûte', 'ce que coûtent', 'ce que vous coûte',
    'combien coûte', 'combien vous coûte', 'coûte déjà', 'arrêts', 'arrêts maladie', 'absences', 'absentéisme', 'inconfort', 'mal de dos',
    'douleurs', 'tms', 'remplacement', 'remplacer', 'désorganisation', 'turnover', 'départs', 'productivité perdue', 'perte de productivité',
    'perte', 'pertes', 'jours perdus', 'journées perdues', 'coût caché', 'coûts cachés', 'à long terme', 'sur la durée'];

  // Les preuves et faits qui défendent la valeur.
  const PREUVE = uniq(REASSURANCE, ['nos clients', 'un client', 'une entreprise', 'entreprises équipées', 'références', 'référence', 'témoignage',
    'témoignages', 'avis', 'chiffres', 'chiffre', 'résultats', 'baisse', 'réduction des arrêts', 'moins d’arrêts', 'arrêts', 'absences',
    'retour sur investissement', 'rentab*', 'économ*', 'productivité', 'confort', 'santé', 'qualité', 'concrètement', 'par exemple']);

  // Les éléments à rassembler pour convaincre un décideur.
  const DECIDEUR = ['direction', 'votre direction', 'votre hiérarchie', 'hiérarchie', 'vos responsables', 'votre patron', 'votre dg', 'décideur',
    'décideurs', 'comité', 'justifier', 'justification', 'argument*', 'argumentaire', 'dossier', 'éléments concrets', 'éléments', 'chiffres',
    'chiffr*', 'document', 'synthèse', 'note', 'présentation', 'présenter', 'convaincre', 'défendre', 'porter le projet', 'soutenir',
    'retour sur investissement', 'roi', 'rentab*', 'bilan', 'je vous prépare', 'je peux vous préparer', 'préparer ensemble', 'on prépare',
    'nous préparons', 'je vous envoie', 'vous transmettre', 'je vous transmets', 'support', 'fiche', 'business case', 'tableau', 'comparatif',
    'rencontrer votre direction', 'venir présenter', 'accompagner', 'je vous accompagne', 'avec vous', 'ensemble', 'en regard', 'mettre en regard',
    'mettre en balance', 'éclairer', 'aider à décider', 'faciliter', 'valider', 'validation', 'feu vert', 'enjeux', 'priorités', 'objectifs'];

  // Proposer la décision (conclusion directe).
  const DECISION = ['est-ce que nous pouvons', 'est-ce qu’on peut', 'est-ce que l’on peut', 'pouvons-nous', 'peut-on', 'on peut y aller', 'on y va',
    'allons-y', 'on lance', 'nous lançons', 'je lance', 'lancer', 'lançons', 'on valide', 'valider', 'validons', 'je valide', 'validation',
    'on part sur', 'partir sur', 'partons sur', 'nous partons', 'on démarre', 'démarrer', 'démarrons', 'démarrage', 'on commence', 'commencer',
    'commençons', 'commande', 'commander', 'bon de commande', 'passer commande', 'signer', 'signature', 'on signe', 'je prépare', 'je vous prépare',
    'préparer', 'réserver', 'je réserve', 'réservons', 'bloquer', 'je bloque', 'confirmer', 'je confirme', 'confirmation', 'officialiser',
    'concrétiser', 'on concrétise', 'on avance', 'avancer', 'avançons', 'aller de l’avant', 'se lancer', 'on se lance', 'êtes-vous prêt',
    'êtes-vous prête', 'prêt à', 'prête à', 'souhaitez-vous', 'voulez-vous', 'vous souhaitez que', 'je vous propose de', 'on fait comme ça',
    'c’est bon pour vous', 'ça vous va', 'cela vous va', 'cela vous convient', 'ça vous convient', 'vous convient', 'vous conviendrait',
    'on acte', 'acter', 'enclencher', 'mettre en route', 'feu vert', 'donner suite', 'engager', 'on s’engage', 'je m’occupe', 'je m’en occupe',
    'planifier', 'je planifie', 'programmer', 'caler', 'on cale', 'fixer', 'on fixe', 'retenir', 'on retient', 'je vous inscris', 'êtes-vous d’accord',
    'vous êtes d’accord', 'd’accord pour', 'c’est parti', 'go', 'on y est', 'mettre en place', 'on met en place', 'organiser', 'j’organise',
    'on organise', 'la suite', 'on enchaîne', 'prochaine étape', 'on continue', 'travailler ensemble', 'nous accorder', 'votre accord',
    'je mets en route', 'je déclenche', 'déclencher', 'on formalise', 'formaliser', 'l’accord'];

  // Proposer un choix entre deux options (conclusion alternative).
  const ALTERNATIVE = ['ou', 'ou bien', 'ou alors', 'ou plutôt', 'plutôt', 'préfér*', 'lequel', 'laquelle', 'lesquels', 'quelle option',
    'quelle formule', 'quelle solution', 'quelle date', 'quel jour', 'quel créneau', 'quelle période', 'quelle version', 'entre', 'entre les deux',
    'l’un ou l’autre', 'l’une ou l’autre', 'soit', 'deux options', 'deux possibilités', 'deux solutions', 'deux formules', 'deux scénarios',
    'choisir', 'choix', 'au choix', 'vous choisissez', 'à vous de choisir', 'ce qui vous arrange', 'vous arrange', 'arrangerait',
    'le mieux', 'vous conviendrait', 'conviendrait', 'option', 'options', 'formule', 'scénario', 'penchez', 'vous penchez', 'votre préférence'];

  // Rappeler ce qui est validé (conclusion récapitulative).
  const RECAP = ['nous avons donc', 'on a donc', 'nous avons validé', 'on a validé', 'vous avez validé', 'nous sommes d’accord', 'on est d’accord',
    'nous avons vu', 'on a vu', 'on a fait le tour', 'nous avons fait le tour', 'si je récapitule', 'je récapitule', 'récapitul*', 'récap',
    'pour résumer', 'en résumé', 'si je résume', 'je résume', 'résum*', 'en somme', 'au final', 'finalement', 'validé', 'validés', 'validée',
    'convenu', 'convenus', 'retenu', 'retenus', 'tout est bon', 'tout est calé', 'tout est clair', 'on a tout', 'nous avons tout', 'point par point',
    'les 10 postes', '10 postes', 'dix postes', 'installation', 'garantie', '5 ans', 'cinq ans', 'le prix', 'le budget', 'le tarif', 'le délai',
    'le périmètre', 'la solution', 'cette solution', 'cette offre', 'cette formule', 'ce qui a été', 'ce que nous avons', 'ce qu’on a', 'donc',
    'ensemble', 'reprenons', 'si je reprends', 'je reprends', 'pour rappel', 'rappel', 'nous avons défini', 'nous avons choisi', 'vous avez choisi',
    'vous avez retenu', 'vous m’avez confirmé', 'vous avez confirmé', 'ça vous convient', 'tout vous convient', 'formation', 'livraison'];

  // Faire choisir un dernier détail.
  const DETAIL = ['coloris', 'couleur', 'couleurs', 'teinte', 'teintes', 'finition', 'finitions', 'tissu', 'revêtement', 'matière', 'il nous reste',
    'il reste', 'il ne reste', 'il ne nous reste', 'reste plus', 'reste à', 'dernier détail', 'dernier point', 'derniers détails', 'petit détail',
    'détail', 'dernière chose', 'dernière question', 'qu’à choisir', 'qu’à définir', 'qu’à fixer', 'qu’à décider', 'date de livraison',
    'jour de livraison', 'date d’installation', 'jour d’installation', 'jour de démarrage', 'date de démarrage', 'date de début', 'adresse',
    'emplacement', 'modèle', 'version', 'taille', 'dimension', 'format', 'accoudoirs', 'option', 'options', 'noir', 'gris', 'bleu', 'blanc',
    'beige', 'anthracite', 'rouge', 'vert', 'chêne', 'bois', 'cuir', 'motorisation', 'jantes', 'mode de paiement', 'paiement', 'mode de règlement',
    'quelle couleur', 'quel coloris', 'quelle teinte', 'lequel', 'laquelle', 'préfér*', 'choisir', 'choix', 'nom', 'logo', 'gravure', 'personnalisation',
    'horaire', 'créneau', 'quantité', 'nombre', 'combien d’exemplaires', 'livrer', 'livraison', 'installer', 'installation', 'plan de travail',
    'poignées', 'formule', 'garantie étendue', 'contrat', 'carte', 'saveur', 'parfum', 'décor', 'thème'];

  // Laisser décider le client.
  const LAISSER_DECIDER = ['silence', '[silence]', 'je vous laisse', 'qu’en pensez-vous', 'qu’en dites-vous', 'si cela vous convient',
    'si ça vous convient', 'si ce calendrier vous convient', 'si cette date vous convient', 'si ce délai vous convient', 'si vous êtes d’accord',
    'si vous le souhaitez', 'si vous voulez', 'ça vous va', 'cela vous va', 'à vous de voir', 'comme vous préférez', 'comme vous voulez',
    'à votre convenance', 'à votre rythme', 'est-ce que cela vous convient', 'est-ce que ça vous convient', 'vous convient', 'vous conviendrait',
    'votre avis', 'qu’est-ce que vous en pensez', 'êtes-vous d’accord', 'vous êtes d’accord', 'je vous écoute', 'souhaitez-vous',
    'voulez-vous', 'préférez-vous', 'vous préférez', 'pause', 'je me tais', 'j’attends sa réponse', 'j’attends', 'laisser répondre',
    'laisser le client', 'le laisser', 'la laisser'];

  // Une suite concrète, datée.
  const ETAPE = ['je prépare', 'je vous prépare', 'préparer', 'je vous envoie', 'vous envoyer', 'je vous adresse', 'je vous transmets',
    'bon de commande', 'commande', 'devis', 'contrat', 'je vous confirme', 'confirmation', 'date d’installation', 'date de livraison',
    'prochaines étapes', 'prochaine étape', 'rendez-vous', 'planning', 'calendrier', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
    'cette semaine', 'la semaine prochaine', 'demain', 'ce soir', 'dès ce soir', 'dès demain', 'avant ce soir', 'd’ici',
    'signature', 'signer', 'je m’occupe', 'je m’en occupe', 'je vous appelle', 'je vous rappelle', 'je reviens vers vous', 'mail', 'e-mail',
    'courriel', 'récapitulatif', 'par écrit', 'technicien', 'équipe d’installation', 'installateurs', 'livraison', 'installation', 'date',
    'créneau', 'heure', 'heures', 'matin', 'après-midi', 'on fixe', 'fixons', 'je bloque', 'je réserve', 'nous convenons', 'convenons',
    'je lance', 'lancer', 'je note', 'visite', 'point', 'suivi', 'interlocuteur', 'appel', 'fin du mois', 'fin de mois', 'semaine'];

  // Le signal d'achat et ce qu'il montre.
  const SIGNAL = ['livraison', 'livr*', 'délai', 'délais', 'date', 'dates', 'fin du mois', 'avant la fin', 'quand', 'calendrier', 'question',
    'demande', 'demander', 'interroge', 'signal d’achat', 'signal', 'indice', 'démarr*', 'mise en place', 'installation', 'logistique',
    'modalités', 'modalité', 'organisation', 'pratique', 'pratiques', 'concrètement', 'concret', 'concrets', 'planning', 'timing'];
  const PROJECTION = ['se projette', 'projet*', 'projection', 'mise en œuvre', 'mise en place', 'après l’achat', 'la suite', 'intérêt',
    'intéressée', 'intéressé', 'prête', 'prêt', 'envie', 'acheter', 'achat', 'commande', 'commander', 'décid*', 'avancer', 'se voit',
    's’imagine', 'imagine', 'envisage', 'engager', 'engagement', 's’engager', 'convaincue', 'convaincu', 'conclure', 'conclusion', 'veut',
    'souhaite', 'déjà', 'pense déjà', 'quasiment', 'presque', 'd’accord', 'accord', 'validé', 'valider', 'signer', 'oui', 'le comment',
    'le quand', 'acquise', 'acquis', 'partante', 'partant', 'motivée', 'motivé', 'emballée', 'séduite', 'séduit', 'feu vert', 'positif',
    'positive', 'bon signe', 'favorable', 'tentée', 'tenté', 'sur le point'];

  // Relance : rappeler le contexte.
  const CONTEXTE_RAPPEL = ['je reviens vers vous', 'je reviens', 'revenir vers vous', 'je me permets de revenir', 'je me permets de vous recontacter',
    'je me permets de vous écrire', 'je me permets', 'je vous recontacte', 'je reprends contact', 'reprendre contact', 'je vous écris',
    'suite à', 'faisant suite', 'pour faire suite', 'au sujet de', 'concernant', 'à propos de', 'en ce qui concerne', 'relatif à', 'relative à',
    'notre proposition', 'ma proposition', 'la proposition', 'notre offre', 'l’offre', 'mon offre', 'le devis', 'notre devis', 'votre devis',
    'notre échange', 'notre dernier échange', 'nos échanges', 'notre conversation', 'notre entretien', 'notre rendez-vous', 'notre rencontre',
    'notre appel', 'notre discussion', 'envoyée', 'envoyé', 'adressée', 'adressé', 'transmise', 'transmis', 'que je vous ai', 'que nous vous avons',
    '3 juin', 'le 3 juin', 'il y a', 'la semaine dernière', 'dix jours', '10 jours', 'une dizaine de jours', 'récemment', 'votre projet',
    '10 postes', 'dix postes', 'équipement', '[date', '[offre', '[date de la proposition]', '[offre]', 'nous avions évoqué', 'nous avons évoqué',
    'évoqué', 'évoquée', 'comme convenu', 'comme promis', 'dernièrement', 'reçue', 'reçu', 'proposition', 'offre', 'devis', 'projet',
    'votre demande', 'votre réflexion', 'nous avions parlé', 'nous avons parlé', 'parlé', 'discuté', 'présenté', 'présentée'];

  // Relance : une information nouvelle ou utile.
  const VALEUR_RELANCE = ['retour d’expérience', 'retours d’expérience', 'retour', 'retours', 'témoignage', 'témoign*', 'un client', 'une cliente',
    'nos clients', 'un de nos clients', 'clients', 'une entreprise', 'entreprises', 'une société', 'sociétés', 'une pme', 'pme', 'de votre secteur',
    'même secteur', 'secteur', 'même domaine', 'domaine', 'comparable', 'similaire', 'semblable', 'résultat', 'résultats', 'constaté', 'constate',
    'observé', 'mesuré', 'chiffre', 'chiffres', 'chiffré', 'chiffrée', 'baisse', 'diminution', 'diminué', 'réduction des', 'moins d’arrêts',
    'arrêts', 'absences', 'absentéisme', 'étude', 'étude ergonomique', 'diagnostic', 'audit', 'gratuit', 'gratuite', 'gratuitement', 'offert',
    'offerte', 'sans frais', 'location', 'louer', 'leasing', 'étaler', 'étalement', 'mensualités', 'mensualisé', 'plusieurs fois', 'financement',
    'financer', 'essai', 'essayer', 'tester', 'test', 'prêt', 'démonstration', 'démo', 'visite', 'showroom', 'échéance', 'jusqu’au', 'jusqu’à',
    'fin de l’offre', 'offre valable', 'valable', 'disponibilité', 'créneau d’installation', 'installation', 'délai', 'stock', 'nouveau',
    'nouvelle', 'nouveauté', 'nouveaux', 'coloris', 'option', 'nouvelle option', 'modèle', 'gamme', 'information', 'informations',
    'actualité', 'guide', 'fiche', 'document', 'documentation', 'brochure', 'article', 'étude de cas', 'cas client', 'cas concret', 'vidéo',
    'webinaire', 'argumentaire', 'dossier', 'synthèse', 'note', 'support', 'retour sur investissement', 'rentab*', 'économ*', 'aide', 'aider',
    'conseil', 'conseils', 'astuce', 'bonnes pratiques', 'enseignements', 'partager', 'vous partager', 'vous transmettre', 'vous envoyer',
    'vous faire part', 'vous présenter', 'je joins', 'ci-joint', 'pièce jointe', 'questions', 'répondre à vos questions', 'préciser', 'précisions',
    'bonne réception', 'bien reçu', 'ajuster', 'adapter', 'version', 'formule', 'subvention', 'aides', 'prise en charge', 'évolution', 'amélioration',
    'positif', 'positifs', 'satisfaits', 'satisfaction', 'confort', 'douleurs', 'dos', 'santé', 'bien-être', 'équipé', 'équipée', 'équipées',
    'expérience', 'cas', 'exemple', 'données', 'donnée', 'statistique*', 'éclairage', 'point de vue', 'idée', 'piste', 'solution', 'alternative',
    'variante', 'phase pilote', 'pilote', 'progressivement', 'par étapes', 'déploiement', 'déployer', 'calendrier', 'planning', 'promotion',
    'complément', 'complémentaire', 'compléter', 'utile', 'utiles', 'intéressant', 'intéressante'];

  // Relance : un prochain pas simple et concret.
  const ACTION_RELANCE = ['échange de', 'un échange', 'court échange', 'échanger', 'en échanger', 'en parler', 'en discuter', 'discuter',
    'un appel', 'appel', 'je vous appelle', 'vous appeler', 'je vous téléphone', 'téléphone', 'téléphonique', 'visio', 'visioconférence',
    'rendez-vous', 'rdv', 'rencontre', 'rencontrer', 'se rencontrer', 'se voir', 'passer vous voir', 'je passe', 'démonstration', 'minutes',
    'minute', 'quart d’heure', 'demi-heure', 'un point', 'faire le point', 'point rapide', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi',
    'matin', 'après-midi', 'semaine prochaine', 'cette semaine', 'demain', 'heures', 'créneau', 'créneaux', 'disponible', 'disponibilité',
    'disponibilités', 'seriez-vous', 'auriez-vous', 'êtes-vous', 'pourriez-vous', 'pouvons-nous', 'pourrions-nous', 'je vous propose',
    'je propose', 'je vous suggère', 'pourquoi ne pas', 'que diriez-vous', 'lequel vous convient', 'qui vous convient', 'vous conviendrait',
    'vous arrange', 'prochaine étape', 'prochain pas', 'pour avancer', 'organiser', 'planifier', 'caler', 'fixer', 'bloquer', 'réserver',
    'visite', 'diagnostic', 'je vous envoie', 'vous envoyer', 'confirmer', 'valider', '[créneau', 'créneau a', 'créneau b', 'vous rappeler',
    'je vous rappelle', 'je vous recontacte', 'reprendre contact', 'recontacter', 'revenir vers vous', 'je reviens vers vous', 'à votre disposition',
    'disposition', 'je reste disponible', 'je reste à votre écoute', 'je reste joignable', 'joignable', 'n’hésitez pas', 'quand vous voulez',
    'quand vous le souhaitez', 'plus tard', 'dans quelques mois', 'quelques mois', 'à l’avenir', 'garder le contact', 'rester en contact',
    'essai', 'test', 'tester', 'devis', 'proposition', 'présentation', 'présenter', 'montrer', 'atelier', 'réunion', 'entretien', 'call'];

  /* ── Pièges communs ─────────────────────────────────────────────────── */

  const PIEGE_REMISE = { nom: 'Une remise trop tôt', points: 4,
    mots: ['une remise', 'remise de', 'vous faire une remise', 'faire un geste', 'un geste commercial', 'geste commercial', 'une réduction', 'réduction de',
      'un rabais', 'rabais', 'ristourne', 'vous faire un prix', 'faire un effort', 'un petit effort', 'baisser le prix', 'baisser mon prix',
      'baisser notre prix', 'baisse de prix', 'revoir le prix', 'revoir notre prix', 'à la baisse', 'moins cher pour vous', 'je vous accorde',
      'je peux vous accorder', 'je peux descendre', 'descendre à', 'petite remise', 'de remise', 'au lieu de 1', 'je vous fais 1', 'je vous le fais à 1', 'au lieu de 2', 'je vous fais 2', 'je vous le fais à 2', 'au lieu de 3', 'je vous fais 3', 'je vous le fais à 3', 'au lieu de 4', 'je vous fais 4', 'je vous le fais à 4', 'au lieu de 5', 'je vous fais 5', 'je vous le fais à 5', 'au lieu de 6', 'je vous fais 6', 'je vous le fais à 6', 'au lieu de 7', 'je vous fais 7', 'je vous le fais à 7', 'au lieu de 8', 'je vous fais 8', 'je vous le fais à 8', 'au lieu de 9', 'je vous fais 9', 'je vous le fais à 9', 'négociable', 'on peut s’arranger', 'on peut s’entendre', 'arranger le prix', 'prix d’ami', 'promotion', 'promo'],
    conseil: 'On défend la valeur avant de parler d’effort sur le prix.' };

  const PIEGE_HESITATION = { nom: 'Le prix s’excuse', points: 2,
    mots: ['désolé', 'désolée', 'je suis désolé', 'malheureusement', 'excusez', 'pardon', 'je m’excuse', 'je sais que c’est', 'un peu cher',
      'assez cher', 'c’est cher', 'pas donné', 'ça pique', 'mais bon', 'euh', 'j’avoue', 'je l’avoue', 'je vous l’accorde', 'ce n’est pas rien',
      'ça fait mal', 'pas si cher', 'c’est beaucoup', 'je crains', 'hélas', 'je n’y peux rien', 'on peut en discuter', 'on peut négocier'],
    conseil: 'Annoncez le prix sans vous excuser ni le juger vous-même.' };

  const PIEGE_CONTREDIRE = { nom: 'Le client est contredit', points: 1,
    mots: ['pas si cher', 'ce n’est pas cher', 'c’est pas cher', 'pas cher du tout', 'pas du tout cher', 'vous vous trompez', 'vous avez tort',
      'détrompez-vous', 'c’est faux', 'n’importe quoi', 'je ne suis pas d’accord', 'c’est donné', 'vous exagérez', 'quand même pas', 'presque rien', 'ce n’est que', 'ne regardez pas', 'ne faites pas attention au prix'],
    conseil: 'Accueillez la remarque au lieu de la contredire.' };

  const PIEGE_COUTS = { nom: 'Le prix justifié par vos coûts', points: 1,
    mots: ['nos coûts', 'nos charges', 'nos frais', 'nos marges', 'notre marge', 'on est obligés', 'nous sommes obligés', 'obligés d’être',
      'on ne peut pas faire moins', 'nous ne pouvons pas faire moins', 'matières premières', 'nos fournisseurs', 'nos salaires', 'l’inflation',
      'nos prix ont augmenté', 'ça nous coûte', 'cela nous coûte', 'coûts de fabrication', 'coûts de production'],
    conseil: 'Vos coûts ne disent rien de la valeur pour le client.' };

  const PIEGE_DENIGRER = { nom: 'Le concurrent dénigré', points: 1,
    mots: ['moins bon', 'moins bonne', 'mauvaise qualité', 'camelote', 'arnaque', 'pas sérieux', 'pas sérieuse', 'bas de gamme', 'ne vaut rien',
      'médiocre', 'méfiez-vous', 'qualité douteuse', 'ils trichent', 'ils mentent', 'piètre', 'pas fiable', 'pas fiables', 'du vent'],
    conseil: 'On compare les offres sans critiquer le concurrent.' };

  const PIEGE_ARGUMENTAIRE = { nom: 'L’argumentaire relancé', points: 2,
    mots: ['et sinon', 'par ailleurs', 'nous avons aussi', 'on a aussi', 'nous proposons aussi', 'on propose aussi', 'je vous présente aussi',
      'je peux aussi vous présenter', 'je vous montre aussi', 'd’autres produits', 'd’autres modèles', 'autres articles', 'repose-pieds', 'lampes',
      'supports d’écran', 'catalogue', 'en plus de ça', 'un autre avantage', 'encore un avantage', 'tous les avantages', 'rappeler les avantages', 'vous rappeler tous', 'laissez-moi vous rappeler', 'avant de parler du'],
    conseil: 'Le client se projette : on cesse d’argumenter et on propose la décision.' };

  const PIEGE_FORCER = { nom: 'La main forcée', points: 1,
    mots: ['signez maintenant', 'signez aujourd’hui', 'il faut signer', 'il faut vous décider', 'décidez-vous', 'dépêchez-vous', 'dernière chance',
      'offre limitée', 'aujourd’hui seulement', 'sinon vous', 'vous allez rater', 'vous allez le regretter', 'pas le choix', 'il faut que vous',
      'maintenant ou jamais', 'ne tardez pas', 'trop tard'],
    conseil: 'On propose la décision, on ne la force pas.' };

  const PIEGE_PRESSION = { nom: 'Reproche ou pression', points: 2,
    mots: ['malgré mes', 'malgré nos', 'toujours pas', 'toujours aucune', 'toujours aucun', 'pas eu de réponse', 'pas eu de retour',
      'pas reçu de réponse', 'pas reçu de retour', 'aucune réponse de votre part', 'aucun retour de votre part', 'vous n’avez pas répondu',
      'vous ne m’avez pas répondu', 'vous n’avez toujours pas', 'je vous ai déjà écrit', 'je vous ai déjà relancé', 'déjà relancé',
      'plusieurs relances', 'plusieurs messages', 'une nouvelle fois', 'encore une fois', 'dans les meilleurs délais', 'au plus vite',
      'répondre rapidement', 'réponse rapide', 'savoir rapidement', 'décision rapide', 'urgent', 'urgence', 'nous avons besoin de savoir',
      'j’ai besoin de savoir', 'nous organiser', 'm’organiser', 'de notre côté', 'confirmer votre décision', 'merci de me confirmer'],
    conseil: 'Une relance ne reproche rien et ne presse pas : elle donne envie de répondre.' };

  const PIEGE_VIDE = { nom: 'Une relance « pour des nouvelles »', points: 2,
    mots: ['avez-vous réfléchi', 'vous avez réfléchi', 'alors vous avez', 'où en êtes-vous', 'des nouvelles', 'prendre des nouvelles',
      'je voulais savoir', 'je voulais juste savoir', 'avez-vous pris votre décision', 'avez-vous pris une décision', 'vous êtes décidée',
      'vous êtes décidé', 'je me permets de vous relancer', 'de vos nouvelles', 'prendre de vos nouvelles', 'je voulais juste', 'juste prendre'],
    conseil: 'Apportez une raison nouvelle de répondre, pas seulement une demande de nouvelles.' };

  const PIEGE_ENVERS = { nom: 'Un avis à l’envers', points: 5,
    mots: ['aurait dû faire une remise', 'remise plus grande', 'plus grande remise', 'il a raison', 'a raison de dire', 'avait raison', 'trop poliment',
      'trop poli', 'trop polie', 'devrait expliquer', 'expliquer encore plus', 'être plus ferme', 'devrait être plus ferme', 'c’est elle qui est en faute', 'c’est de sa faute', 'elle est en faute', 'il manque une remise',
      'manque une remise', 'tous les jours', 'aurait dû répondre', 'relancer tous', 'a bien fait', 'bien fait de', 'vendre plus', 'aucun signal',
      'pas de signal', 'ne donne aucun signal', 'juste une question', 'est meilleure parce qu’elle est honnête', 'annonce 1 est meilleure', 'la 1 est meilleure',
      'la première est meilleure', 'préfère l’annonce 1', 'préfère la 1', 'appréciera sa franchise', 'sa franchise'],
    conseil: 'Relisez la situation : votre avis va dans le sens contraire de ce qu’il faudrait faire.' };

  /* ── Critères réutilisés ────────────────────────────────────────────── */

  const raison = (points = 1) => ({ nom: 'Une raison donnée', points, mots: RAISON, conseil: 'Dites pourquoi : « parce que… », « ce qui permet… ».' });
  const accueil = (points = 1) => ({ nom: 'La remarque accueillie', points, mots: ACCUEIL, conseil: 'Commencez par accueillir : « Je comprends… », « C’est possible… ».' });

  /* Une annonce de prix en trois temps : bénéfice, prix, réassurance. */
  const annonce = (titre, champ, chiffres, benefices = [], reassurances = []) => ({
    titre, champs: [champ],
    criteres: [
      { nom: 'Un bénéfice concret', mots: uniq(BENEFICE, benefices), conseil: 'Ouvrez sur ce que le client y gagne : confort, temps, santé…' },
      { nom: 'Le prix annoncé clairement', mots: uniq(chiffres, PRIX_MOTS), conseil: 'Dites le prix tel qu’il est, avec le montant exact.' },
      { nom: 'Une réassurance', mots: uniq(REASSURANCE, reassurances), conseil: 'Terminez par une garantie, un essai ou un service compris.' }
    ],
    phrases: { attendues: 1, points: 2 },
    pieges: [PIEGE_HESITATION, PIEGE_REMISE, PIEGE_COUTS]
  });

  const P690 = ['690', 'six cent quatre-vingt-dix', 'six cent quatre vingt dix', 'six cents quatre-vingt-dix'];
  const P1900 = ['1 900', '1900', 'mille neuf cents', 'mille neuf cent', 'mille neuf cents euros'];
  const P17000 = ['17 000', '17000', 'dix-sept mille', 'dix sept mille', '17 k', '17k', '17 mille'];
  const P2400 = ['2 400', '2400', 'deux mille quatre cents', 'deux mille quatre cent', '2 4'];

  /* ── Les grilles ────────────────────────────────────────────────────── */

  window.ATELIER_GRILLES = {

    // S1 1.4 · Le prix arrive trop tôt : le diagnostic, puis la réplique rejouée.
    's1-1.4': { integre: true, blocs: [
      { titre: 'Votre diagnostic', champs: ['c0_risk'],
        criteres: [
          { nom: 'Le prix arrive avant le besoin', mots: ['trop tôt', 'trop vite', 'tôt', 'vite', 'précipit*', 'prématur*', 'dès le début', 'd’emblée',
            'd’entrée', 'tout de suite', 'directement', 'immédiatement', 'aussitôt', 'avant de', 'avant d’avoir', 'sans avoir', 'pas encore', 'besoin',
            'besoins', 'attentes', 'découverte', 'questionn*', 'question', 'questions', 'comprendre', 'compris', 'connaître', 'connaît', 'cerner',
            'situation', 'ce qu’il veut', 'ce qu’il cherche', 'ce dont il a besoin', 'écoute', 'écouter', 'nombre de postes', 'priorités', 'projet',
            'enjeux', 'sans savoir', 'sans connaître', 'sans comprendre', 'sans questionner', 'début', 'premier', 'première', 'au départ', 'au lieu de',
            'ne sait pas', 'ne sait rien', 'ignore', 'à l’aveugle', 'contexte'],
            conseil: 'Le prix tombe avant que le commercial ait compris le besoin.' },
          { nom: 'La valeur n’est pas montrée', mots: ['valeur', 'valoris*', 'bénéfice*', 'avantage*', 'intérêt', 'utilité', 'ce que comprend',
            'ce qu’il comprend', 'ce qui est compris', 'ce qui est inclus', 'contenu', 'ce qu’il y a dedans', 'ce qu’il obtient', 'ce qu’il gagne',
            'ce qu’il achète', 'ce qu’il paie', 'contrepartie', 'justif*', 'argument*', 'expliqu*', 'explication', 'sec', 'nu', 'brut', 'seul',
            'isolé', 'sans contexte', 'sans explication', 'sans rien', 'percevoir', 'perçu', 'perception', 'qualité', 'offre', 'solution',
            'services', 'garantie', 'installation', 'présenter', 'présentation', 'mettre en valeur', 'atouts', 'apport', 'apporte', 'retour',
            'pourquoi ce prix', 'à quoi correspond', 'correspond'],
            conseil: 'Présenté seul, le montant arrive sans la valeur qui le justifie.' },
          { nom: 'Le risque pour la suite', mots: ['comparaison', 'compar*', 'point de comparaison', 'référence', 'focalis*', 'se concentre', 'se fixe',
            'fixer', 'bloqu*', 'blocage', 'retient', 'ne retient que', 'retenir', 'frein', 'frein*', 'effrai*', 'effray*', 'peur', 'fait peur',
            'choqu*', 'choc', 'refroidi*', 'recul', 'recul*', 'cher', 'trop cher', 'élevé', 'objection', 'négoci*', 'marchand*', 'remise', 'perdre',
            'perte', 'perd', 'fuir', 'fuite', 'partir', 'ferme', 'fermer', 'stopper', 'arrêter', 'fin', 'concurren*', 'ailleurs', 'risque', 'risquer',
            'danger', 'dissuad*', 'décourag*', 'rebut*', 'braqu*', 'méfian*', 'doute', 'hésit*', 'abandon*', 'renonc*', 'refus*', 'seul critère',
            'principal', 'seulement le prix', 'que le prix', 'au prix', 'sur le prix', 'montant', '17 000', 'chiffre'],
            conseil: 'Dites ce que risque la vente : un montant qui devient le seul point de comparaison.' }
        ],
        phrases: { attendues: 1, points: 2 } },
      { titre: 'Votre nouvelle réplique', champs: ['c0_replay'],
        criteres: [
          { nom: 'La question du client accueillie', mots: uniq(['je vais vous donner', 'je vous donne', 'je vais vous le donner', 'je vous le donne',
            'je vais vous répondre', 'je vous réponds', 'je vous dirai', 'je vais vous dire', 'je vous le dis', 'j’y viens', 'on y vient', 'on y arrive',
            'je vous l’annonce', 'je vous annonce', 'le prix', 'le montant', 'le tarif', 'le coût', 'combien', 'ordre d’idée', 'ordre de grandeur',
            'fourchette', 'à partir de', 'environ', 'autour de', 'aux alentours', 'grosso modo', 'en gros', 'chiffr*', 'devis', 'budget', 'naturellement',
            'aucun problème', 'pas de problème', 'promis', 'je comprends que', 'votre temps', 'gagner du temps', 'rapidement', 'rapide'], ACCUEIL),
            conseil: 'Montrez que vous allez répondre : « Bien sûr, je vais vous donner le prix… ».' },
          { nom: 'Le besoin précisé d’abord', mots: ['quelques questions', 'deux ou trois questions', 'une ou deux questions', 'deux questions',
            'trois questions', 'une question', 'questions', 'question', 'vous poser', 'vous demander', 'préciser', 'précisions', 'mieux comprendre',
            'comprendre', 'connaître', 'savoir', 'cerner', 'vos besoins', 'votre besoin', 'besoin', 'vos postes', 'postes', 'combien de', 'vos équipes',
            'vos salariés', 'vos collaborateurs', 'votre situation', 'votre projet', 'vos attentes', 'vos priorités', 'votre usage', 'utilisation',
            'utilisez', 'votre organisation', 'vos contraintes', 'ce dont vous avez besoin', 'ce que vous recherchez', 'ce que vous cherchez',
            'ce qui compte', 'important pour vous', 'qu’est-ce qui', 'quel', 'quelle', 'quels', 'quelles', 'comment', 'pour combien', 'd’abord',
            'avant', 'avant de', 'au préalable', 'en amont', 'quelques secondes', 'deux minutes', 'une minute', 'quelques minutes', 'rapidement',
            'faire le point', 'mieux vous connaître', 'mieux connaître', 'vos locaux', 'vos bureaux', 'personnes', 'salariés', 'vous utilisez'],
            conseil: 'Proposez deux ou trois questions sur ses besoins avant de chiffrer.' },
          { nom: 'Un prix juste et expliqué', mots: ['adapté', 'adaptée', 'adapter', 'ajuster', 'ajusté', 'sur mesure', 'personnalis*', 'juste', 'exact',
            'exacte', 'précis', 'précise', 'correspond', 'qui correspond', 'qui vous correspond', 'pertinent', 'pertinente', 'ce qu’il comprend',
            'ce que comprend', 'ce qui est compris', 'ce qui est inclus', 'inclus', 'compris', 'contenu', 'détail', 'détailler', 'expliquer',
            'vous expliquer', 'justifié', 'pour vous donner', 'pour vous proposer', 'pour que', 'afin de', 'afin que', 'pour être sûr', 'pour être sûre',
            'éviter', 'vraiment', 'réel', 'réelle', 'réellement', 'au plus juste', 'au plus près', 'la bonne solution', 'la solution', 'la formule',
            'l’offre', 'le bon', 'la bonne', 'cohérent', 'cohérente', 'fiable', 'utile', 'ce qui vous convient', 'qui vous convient', 'valable',
            'sérieux', 'sérieuse', 'à votre situation', 'à vos besoins', 'selon', 'en fonction', 'dépend', 'varie', 'chiffrage', 'chiffrer'],
            conseil: 'Dites pourquoi vous posez ces questions : pour donner un prix adapté et expliquer ce qu’il comprend.' }
        ],
        phrases: { attendues: 1, points: 2 },
        pieges: [
          { nom: 'La question esquivée', points: 2, mots: ['on verra plus tard', 'on verra ça plus tard', 'on en parlera plus tard', 'plus tard pour le prix',
            'le prix n’est pas important', 'ce n’est pas le sujet', 'ce n’est pas important', 'je ne peux pas vous dire', 'je ne peux pas vous donner',
            'je ne peux rien vous dire', 'patience', 'chaque chose en son temps', 'ne parlons pas', 'parlons d’autre chose', 'on n’en est pas là'],
            conseil: 'On ne fuit pas la question : on l’accueille, puis on précise le besoin.' },
          PIEGE_REMISE
        ] }
    ] },

    // S1 1.5 · Pourquoi l'annonce 2 est plus efficace.
    's1-1.5': { integre: true, blocs: [
      { titre: 'Votre verdict', champs: ['why'],
        criteres: [
          { nom: 'La structure de l’annonce', mots: ['sandwich', 'structure', 'structuré', 'structurée', 'construite', 'construction', 'ordre',
            'étapes', 'trois temps', '3 temps', 'bénéfice*', 'avantage*', 'soulag*', 'dos', 'morphologie', 'garantie', '5 ans', 'cinq ans',
            'réassurance', 'rassur*', 'valoris*', 'valeur', 'd’abord', 'puis', 'ensuite', 'enfin', 'encadr*', 'entour*', 'entre deux', 'avant le prix',
            'après le prix', 'commence par', 'termine par', 'finit par', 'se termine', 'ouvre sur', 'ferme sur', 'confort', 'santé', 'utile', 'concret',
            'concrète', 'concrets', 'arguments', 'argument', 'justifie', 'contenu', 'inclus', 'incluse', 'prix nu', 'nu', 'seul'],
            conseil: 'L’annonce 2 suit bénéfice, prix, réassurance.' },
          { nom: 'La posture du commercial', mots: ['assurance', 'assuré', 'assurée', 'confiant', 'confiance', 'posture', 'hésit*', 'alors', 'mais bon',
            's’excuse', 'excuse', 'excuser', 'gêné', 'gêne', 'mal à l’aise', 'timide', 'doute', 'douter', 'sûr de lui', 'sûr de son', 'sans s’excuser',
            'sans hésiter', 'sans hésitation', 'calme', 'ferme', 'aplomb', 'convaincu', 'convaincant', 'assume', 'assumé', 'assumer', 'crédib*',
            'professionnel', 'sérieux', 'pas sûr', 'peu sûr', 'manque', 'faible', 'fragil*', 'affaibli*', 'mou', 'molle', 'naturel', 'serein',
            'tranquille', 'poids', 'je sais', 'désolé', 'attitude', 'ton', 'voix'],
            conseil: 'Comparez l’assurance de l’annonce 2 à l’hésitation de l’annonce 1.' },
          { nom: 'Les mots et la clarté du prix', mots: ['cher', 'un peu cher', 'je sais', 'dévaloris*', 'fragilis*', 'négatif', 'négative', 'vocabulaire',
            'mots', 'termes', 'formulation', 'positif', 'positive', 'concret', 'concrète', 'clair', 'claire', 'clairement', 'clarté', 'net', 'nette',
            'précis', 'précise', 'flou', 'floue', 'vague', 'lisible', 'compréhensible', 'simple', 'direct', 'directe', 'franchement', 'franc', 'chiffre',
            '690', 'prix', 'annoncé', 'annonce', 'juge', 'qualifie', 'dit lui-même', 'lui-même', 'critique', 'sabote', 'tire une balle', 'perçu',
            'perception', 'image', 'donne envie', 'rassurant', 'rassurante', 'pas d’excuse', 'sans excuse', 'excuse'],
            conseil: 'Relevez le « c’est un peu cher » de l’annonce 1 et le prix net de l’annonce 2.' },
          { nom: 'Les deux annonces comparées', points: 1, mots: COMPARAISON, conseil: 'Mettez les deux annonces face à face.' },
          raison()
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_ENVERS] }
    ] },

    // S1 1.7 · Trois annonces : bénéfice, prix, réassurance.
    's1-1.7': { integre: true, blocs: [
      annonce('Siège ergonomique · 690 €', 'c0_text', P690, ['siège', 'assise', 'dossier', '6 points', 'six points', 'réglages', 'soutien', 'lombaire*']),
      annonce('Poste complet · 1 900 €', 'c1_text', P1900, ['assis-debout', 'électrique', 'bras d’écran', 'écran', 'bureau', 'positions', 'position',
        'se lever', 'varier', 'énergie', 'complet', 'complète', 'ensemble', 'tout-en-un']),
      annonce('Pack 10 postes · 17 000 €', 'c2_text', P17000, ['10 postes', 'dix postes', 'vos équipes', 'toute l’équipe', 'solution complète',
        'complète', 'complet', 'étude ergonomique', 'formation', 'formées', '1 700', '1700', 'par poste'], ['1 700', '1700', 'par poste', 'formation des équipes'])
    ] },

    // S2 2.3 · Le prix remis à l'échelle, offre par offre.
    's2-2.3': { integre: true, blocs: [
      ['Siège ergonomique · 690 €', 'c0_text', P690,
        ['38 centimes', '0,38', '0.38', '38', 'par jour', 'chaque jour', 'quotidien', 'au quotidien', 'journée', '5 ans', 'cinq ans', 'sur 5 ans',
          'moins de 40 centimes', '40 centimes', 'moins d’un euro', 'moins d’1 €', 'centimes', 'centime', '1 800 jours', '1825 jours', 'par an', '138',
          'par mois', '11,50', '11', '12 €'],
        ['confort', 'dos', 'posture', 'poste de travail', 'santé', 'fatigue', 'douleurs', 'café', 'un café', 'baguette', 'journée de travail',
          'chaque journée', 'heures', 'assis', 'tous les jours', 'travail']],
      ['Pack de 10 postes · 17 000 €', 'c1_text', P17000,
        ['1 700', '1700', 'mille sept cents', 'par poste', 'chaque poste', 'par salarié', 'chaque salarié', 'par personne', 'par collaborateur',
          'pour chaque', 'par tête', 'par employé', 'par utilisateur', 'divisé par 10', 'divisé par dix', 'pour un poste', 'un poste'],
        ['installation', 'garantie', 'compris', 'comprise', 'comprises', 'inclus', 'incluse', 'incluses', 'étude', 'formation', 'périmètre', 'sav',
          'livraison', 'ce que comprend', 'tout compris', 'clé en main', 'comparer', 'compar*', 'complet', 'complète', 'service', 'services']]
    ].map(([titre, champ, total, repere, concret]) => ({
      titre, champs: [champ],
      criteres: [
        { nom: 'Le prix total visible', mots: uniq(total, ['investissement', 'prix total', 'au total', 'en tout', 'le prix', 'montant', 'tarif', 'euros']),
          conseil: 'Gardez le prix total visible : le calcul ne doit pas le cacher.' },
        { nom: 'Le repère de calcul', mots: uniq(repere, ['soit', 'cela représente', 'ça représente', 'représente', 'revient à', 'ça revient', 'cela revient',
          'ramené', 'ramenée', 'rapporté', 'rapportée', 'divisé', 'ça fait', 'cela fait', 'c’est-à-dire']),
          conseil: 'Citez le repère sans erreur : le coût par jour, ou par poste.' },
        { nom: 'Une valeur concrète', mots: uniq(concret, BENEFICE), conseil: 'Reliez le chiffre à ce que le client vit au quotidien.' }
      ],
      phrases: { attendues: 1, points: 2 },
      pieges: [PIEGE_HESITATION, PIEGE_REMISE, PIEGE_CONTREDIRE]
    })) },

    // S2 2.4 · Nommer les quatre faux pas, dans n'importe quel ordre.
    // Des notes courtes suffisent : on ne compte pas les phrases complètes.
    's2-2.4': { integre: true, blocs: [
      { titre: 'Vos repérages', motif: 'error',
        criteres: [
          { nom: 'Il contredit le client', mots: ['contredit', 'contredire', 'contradiction', 'contred*', 'nie', 'nier', 'nié', 'conteste', 'contester',
            'pas si cher', 'si cher', 'pas d’accord', 'désaccord', 'dément', 's’oppose', 'oppos*', 'minimis*', 'remet en cause', 'remettre en cause',
            'donne tort', 'réfute', 'rejette', 'balaie', 'balaye', 'ne reconnaît pas', 'ignore le ressenti', 'nie le ressenti', 'dit le contraire',
            'conteste l’objection', 'n’accueille pas', 'pas accueilli', 'accueil', 'accueille', 'ne l’écoute pas', 'tort', 'raison', 'ressenti',
            'avis du client', 'perception', 'ferme la discussion', 'braque', 'braquer', 'agressif', 'sur la défensive', 'défensive', 'se défend',
            'défend', 'fait la leçon', 'condescendant', 'méprise', 'mépris', 'ne respecte pas', 'irrespect'],
            conseil: '« C’est pas si cher ! » contredit le client au lieu d’accueillir sa remarque.' },
          { nom: 'Il cède une remise tout de suite', mots: ['remise', 'réduction', 'rabais', '15', 'ristourne', 'baisse le prix', 'baisser', 'baisse',
            'brade', 'brader', 'bradé', 'cède', 'céder', 'cédé', 'geste commercial', 'geste', 'négoci*', 'prix cassé', 'solde', 'discount', 'pourcentage',
            'pour cent', 'moins cher', 'baisse son prix', 'lâche', 'lâcher', 'trop vite', 'trop rapidement', 'immédiatement', 'aussitôt', 'tout de suite',
            'dès le début', 'sans contrepartie', 'effort', 'rabaisse', 'dévaloris*', 'valeur perçue', 'perd de la valeur', 'casse', 'casser', 'marchand*'],
            conseil: '« Je vous fais −15 % » brade le prix avant toute discussion.' },
          { nom: 'Il ne cherche pas à comprendre', mots: ['question', 'questions', 'questionne', 'questionner', 'comprendre', 'compris', 'cherche pas',
            'cherche à comprendre', 'n’écoute pas', 'écoute', 'écouter', 'coupe court', 'coupe la parole', 'clôt', 'clore', 'clôture', 'ferme',
            'fermer', 'on n’en parle plus', 'n’en parle plus', 'parle plus', 'expédie', 'évacue', 'esquive', 'creuse', 'creuser', 'explor*', 'objection',
            'découverte', 'pourquoi', 'besoin', 'besoins', 'aucun élément de valeur', 'ne valorise pas', 'pas de valeur', 'valoris*', 'valeur',
            'met fin', 'termine', 'clos', 'clôt la discussion', 'sujet clos', 'court-circuite', 'balaye', 'balaie', 'dialogue', 'discussion', 'échange',
            'motif', 'raison', 'derrière', 'cache', 'vraie raison', 'ce qui gêne', 'curiosité', 'intéress*', 'ne demande pas', 'demande', 'arguments',
            'argumente pas', 'bâcle', 'expéditif', 'expéditive', 'empêche'],
            conseil: '« Et on n’en parle plus » ferme l’échange sans chercher ce que cache « trop cher ».' },
          { nom: 'Il justifie le prix par ses coûts', mots: ['coûts', 'coût', 'ses coûts', 'nos coûts', 'charges', 'obligé', 'obligés', 'obligation',
            'contraintes', 'contrainte', 'ses propres', 'propres', 'se justifie', 'justifie', 'justifier', 'justification', 's’excuse', 'excuse',
            'son problème', 'ses problèmes', 'l’entreprise', 'son entreprise', 'marges', 'marge', 'frais', 'interne', 'internes', 'lui', 'sa société',
            'de toute façon', 'fatalité', 'subit', 'pas le choix', 'se plaint', 'plainte', 'point de vue du vendeur', 'côté vendeur', 'centré sur lui',
            'parle de lui', 'pas du client', 'n’intéresse pas le client', 'élevés', 'élevé', 'fournisseur', 'fabrication', 'production'],
            conseil: '« Nos coûts sont élevés » parle de l’entreprise, pas de la valeur pour le client.' }
        ],
        phrases: { points: 0 },
        pieges: [PIEGE_ENVERS] }
    ] },

    // S2 2.5 · Deux critères pour justifier la réponse 2.
    's2-2.5': { integre: true, blocs: [
      { titre: 'Vos critères', champs: ['crit0', 'crit1'],
        criteres: [
          { nom: 'Le périmètre vérifié', points: 3, mots: uniq(PERIMETRE, ['ce que chaque offre comprend', 'chaque offre', 'ce que comprend', 'ce qu’elle comprend', 'ce que contient', 'on sait ce que', 'vérifie', 'vérifier', 'vérification', 'avant de comparer', 'avant de justifier',
            'mêmes éléments', 'même chose', 'équitable', 'à armes égales', 'sur la même base', 'même base', 'mêmes bases', 'objectiv*', 'les faits',
            'concret', 'précis', 'précisément', 'éléments comparés', 'ce qui est comparé', 'contenu des offres', 'ce que contient', 'l’offre concurrente']),
            conseil: 'La réponse 2 vérifie que les deux offres couvrent le même périmètre.' },
          { nom: 'L’écart reconnu, le concurrent respecté', mots: ['écart', 'l’écart', 'différence de prix', 'possible', 'c’est possible', 'reconnaît',
            'reconnaître', 'admet', 'admettre', 'accepte', 'accepter', 'ne nie pas', 'sans nier', 'nie', 'nier', 'contredit', 'contredire', 'conteste',
            'concurrent', 'concurrence', 'concurrente', 'dénigr*', 'critique', 'critiquer', 'respect*', 'sans juger', 'juge', 'attaque', 'dévalorise',
            'mal', 'honnête', 'honnêteté', 'franc', 'franchise', 'objectif', 'objective', 'neutre', 'calme', 'ouverte', 'ouvert', 'écoute', 'accueille',
            'accueillir', 'remarque du client', 'objection', 'le client a raison', 'donne raison', 'sans se braquer', 'braque', 'défensive'],
            conseil: 'Elle ne nie pas l’écart de prix et ne dénigre pas le concurrent.' },
          { nom: 'Les différences valorisées', mots: ['valoris*', 'valeur', 'différences', 'différence', 'atouts', 'atout', 'avantages', 'avantage', 'plus',
            'points forts', 'ce qui fait la différence', 'met en avant', 'mettre en avant', 'justifier l’écart', 'expliquer l’écart', 'd’où vient',
            'origine', 'prouver', 'preuve', 'arguments', 'argumenter', 'garantie', 'sav', 'étude', 'installation', 'services', 'qualité', 'ensuite',
            'après', 'dans un second temps', 'prépare', 'préparer', 'défendre', 'défend', 'convaincre', 'réellement', 'réelles', 'constatées'],
            conseil: 'Elle prépare la mise en valeur des différences réellement constatées.' },
          raison()
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S2 2.6 · Trois objections : creuser le frein, valoriser, sans remise.
    's2-2.6': { integre: true, blocs: [
      { titre: '« C’est trop cher. »', champs: ['c0_text'],
        criteres: [
          accueil(),
          { nom: 'Le frein creusé par une question', mots: uniq(QUESTION_OUVERTE, ['trop élevé', 'élevé', 'comparé', 'budget', 'attendiez', 'pensiez',
            'imaginiez', 'prévu', 'envisagé', 'quel montant', 'qu’est-ce qui vous fait dire', 'quand vous dites', 'trop cher par rapport', 'cher par rapport',
            'à quoi le comparez', 'votre référence', 'votre point de comparaison', 'autre offre', 'autre devis', 'ce qui vous paraît', 'ce qui vous semble',
            'quelle partie', 'quel élément', 'quel point', 'sur quel point', 'l’ensemble ou', 'une partie']),
            conseil: 'Posez une question pour comprendre : « Par rapport à quoi ? ».' },
          { nom: 'La valeur rappelée', mots: uniq(VALEUR_COMPRISE, USAGE, ['ce qui est important pour vous', 'important pour vous', 'vos priorités',
            'ce qui compte', 'regardons', 'voyons', 'ensemble']), conseil: 'Rappelez un ou deux faits concrets de l’offre.' }
        ],
        phrases: { attendues: 2, points: 2 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question au client', points: 1 }],
        pieges: [PIEGE_REMISE, PIEGE_CONTREDIRE, PIEGE_COUTS] },
      { titre: '« J’ai trouvé moins cher ailleurs. »', champs: ['c1_text'],
        criteres: [
          accueil(),
          { nom: 'Le même périmètre comparé', points: 3, mots: PERIMETRE, conseil: 'Proposez de vérifier que les offres comparées couvrent la même chose.' },
          { nom: 'L’écart compris', mots: uniq(QUESTION_OUVERTE, ['l’écart', 'écart', 'la différence', 'différence', 'd’où vient', 'comprendre',
            'expliquer', 'précisément', 'ce qui explique', 'quoi exactement', 'qu’est-ce qui est inclus', 'que comprend', 'qu’incluait', 'qu’inclut',
            'combien', 'quel prix', 'quel montant', 'pourrais-je voir', 'puis-je voir', 'me montrer', 'regarder ensemble', 'ensemble']),
            conseil: 'Cherchez d’où vient l’écart.' },
          { nom: 'La valeur rappelée', points: 1, mots: VALEUR_COMPRISE, conseil: 'Citez ce que comprend votre offre.' }
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_REMISE, PIEGE_DENIGRER, PIEGE_CONTREDIRE] },
      { titre: '« Cela vaut-il 17 000 € ? »', champs: ['c2_text'],
        criteres: [
          { nom: 'Le prix décomposé', mots: uniq(USAGE, P17000, ['10 postes', 'dix postes', 'chaque poste', 'ces 17 000', 'pour 10', 'regardons ce que représentent',
            'ce que représentent', 'ce que représente', 'décompos*', 'détaill*', 'en détail', 'concrètement']),
            conseil: 'Décomposez : 10 postes, soit 1 700 € par poste.' },
          { nom: 'Ce que comprend le prix', mots: VALEUR_COMPRISE, conseil: 'Rappelez ce qui est compris : installation, garantie…' },
          { nom: 'Les priorités du client', mots: ['vos priorités', 'vos enjeux', 'vos besoins', 'vos équipes', 'vos salariés', 'vos collaborateurs',
            'important pour vous', 'ce qui compte', 'objectifs', 'attentes', 'répond', 'répondre', 'justifier', 'justifie', 'valoir', 'vaut', 'vaille',
            'mérite', 'retour', 'bénéfices', 'bénéfice', 'confort', 'santé', 'arrêts', 'absences', 'dos', 'investissement', 'enjeu', 'vérifier',
            'vérifions', 'voir si', 'regardons si', 'évaluer', 'qu’en pensez-vous', 'votre avis', 'pour vous', 'chez vous', 'dans votre cas',
            'votre situation', 'qu’attendez-vous', 'qu’est-ce qui', 'quel', 'quelle', 'comment', 'utile', 'rentab*', 'économ*', 'productivité'],
            conseil: 'Reliez l’investissement à ce qui compte pour lui.' },
          accueil()
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_REMISE, PIEGE_CONTREDIRE, PIEGE_COUTS] }
    ] },

    // S2 2.7 · Donner au client de quoi convaincre sa direction.
    's2-2.7': { integre: true, blocs: [
      { titre: 'Votre réponse', champs: ['c0_text'],
        criteres: [
          accueil(),
          { nom: 'Le frein compris', mots: uniq(QUESTION_OUVERTE, ['si je comprends bien', 'si j’ai bien compris', 'autrement dit', 'vous craignez',
            'vous avez peur', 'vous avez besoin', 'ce qui vous inquiète', 'ce qui vous pose question', 'ce qui vous gêne', 'difficile', 'du mal',
            'justifier', 'votre direction', 'montant global', 'le montant', 'retour', 'qu’attend', 'attend', 'attendre', 'sensible', 'critères',
            'qu’est-ce qui compte', 'ce qui compte pour', 'convaincre', 'vous inquiète', 'votre inquiétude', 'votre crainte', 'freine', 'bloque']),
            conseil: 'Cherchez ce qui bloque : le montant, ou ce que la direction attend ?' },
          { nom: 'La valeur rendue visible', mots: uniq(USAGE, VALEUR_COMPRISE, INACTION, ['1 700', '1700', 'par poste']),
            conseil: 'Rendez la valeur visible : 1 700 € par poste, ce qui est compris…' },
          { nom: 'Des éléments pour la direction', mots: DECIDEUR, conseil: 'Proposez de quoi convaincre sa direction : des éléments concrets.' }
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_REMISE, PIEGE_CONTREDIRE, PIEGE_COUTS,
          { nom: 'Une promesse invérifiable', points: 1, mots: ['garanti à 100', '100 %', 'cent pour cent', 'aucun arrêt', 'plus aucun', 'zéro arrêt',
            'à coup sûr', 'c’est certain', 'je vous garantis que', 'rentabilisé en', 'remboursé en', 'sans aucun doute'],
            conseil: 'Rendez la valeur visible sans inventer de chiffres ni de résultats.' }] }
    ] },

    // S3 3.3 · Une phrase de conclusion par situation.
    's3-3.3': { integre: true, blocs: [
      { titre: 'Livraison rapide', champs: ['c0_text'],
        criteres: [
          { nom: 'Sa question traitée', mots: ['oui', 'c’est possible', 'possible', 'livrer', 'livraison', 'livr*', 'fin du mois', 'avant la fin', 'd’ici la fin',
            'délai', 'date', 'calendrier', 'tout à fait', 'bien sûr', 'sans problème', 'aucun problème', 'absolument', 'nous pouvons', 'on peut',
            'je peux', 'c’est faisable', 'faisable', 'jouable', 'envisageable', 'nous savons', 'on sait', 'on s’engage', 'je m’engage', 'garantir',
            'bien entendu', 'parfaitement', 'tenir', 'tenable', 'dans les temps', 'à temps', 'le 2', 'le 28', 'avant le', 'semaine'],
            conseil: 'Répondez d’abord à sa question sur la livraison.' },
          { nom: 'La décision proposée', mots: DECISION, conseil: 'Proposez clairement de valider : « Est-ce que nous partons sur… ? ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question qui fait décider', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER] },
      { titre: 'Hésite entre 5 et 10 postes', champs: ['c1_text'],
        criteres: [
          { nom: 'Un choix entre deux options', mots: ALTERNATIVE, conseil: 'Proposez un choix : « Vous préférez… ou… ? ».' },
          { nom: 'Les deux options nommées', mots: ['5', 'cinq', '10', 'dix', 'les 10', 'les 5', 'postes', 'moitié', 'tous', 'tout', 'l’ensemble',
            'progressivement', 'd’abord', 'directement', 'en une fois', 'en deux fois', 'en deux temps', 'par étapes', 'étape', 'phase', 'pilote',
            'test', 'prioritaires', 'priorité', 'urgents', 'commencer par', 'démarrer par', 'puis', 'ensuite', 'complet', 'complète', 'tout de suite',
            'immédiatement', 'premier temps', 'second temps', 'tranche', 'lot'],
            conseil: 'Nommez les deux options : 5 postes d’abord, ou les 10 directement.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question qui fait choisir', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER] },
      { titre: 'Tout validé', champs: ['c2_text'],
        criteres: [
          { nom: 'Ce qui est validé rappelé', points: 1, mots: RECAP, conseil: 'Rappelez ce qui est validé : postes, installation, garantie.' },
          { nom: 'La décision proposée', mots: DECISION, conseil: 'Proposez de lancer : « Est-ce que nous lançons la commande ? ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question qui fait décider', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER] }
    ] },

    // S3 3.4 · Repérer le signal, comprendre l'erreur, répondre à la cliente.
    's3-3.4': { integre: true, blocs: [
      { titre: 'Repérer', champs: ['c0_text'],
        criteres: [
          { nom: 'Le signal repéré', mots: SIGNAL, conseil: 'Le signal : sa question sur la date de livraison.' },
          { nom: 'Ce qu’il montre', mots: PROJECTION, conseil: 'Elle se projette déjà dans la mise en œuvre.' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_ENVERS] },
      { titre: 'Comprendre', champs: ['c1_text'],
        criteres: [
          { nom: 'L’occasion de conclure', mots: ['conclure', 'conclusion', 'closing', 'vérifier', 'vérifie', 'tester', 'teste', 'proposer', 'propose',
            'demander', 'demande', 'valider', 'valide', 'l’accord', 'accord', 'la décision', 'décision', 'décider', 's’engager', 'engager', 'engagement',
            'avancer', 'passer commande', 'commande', 'saisir', 'saisi', 'signal', 'répondre à sa question', 'répondre', 'répond', 'réponse', 'rebondir',
            'rebondit', 'occasion', 'opportunité', 'prête', 'prêt', 'signer', 'signature', 'finaliser', 'acheter', 'achat', 'vente', 'passer à l’action',
            'action', 'question fermée', 'est-ce que', 'livraison', 'délai', 'confirmer', 'prochaine étape', 'la suite', 'sauter sur', 'profiter',
            'concrétiser', 'transformer'],
            conseil: 'Il aurait dû répondre, puis vérifier si elle est prête à avancer.' },
          { nom: 'L’erreur du vendeur', mots: ['continue', 'continuer', 'poursuit', 'poursuivre', 'argumentaire', 'argumenter', 'argumente', 'arguments',
            'présenter', 'présente', 'présentation', 'd’autres produits', 'autres produits', 'nouveaux produits', 'produits', 'repose-pieds', 'lampes',
            'supports', 'ajoute', 'ajouter', 'informations', 'noie', 'noyer', 'détourne', 'détourner', 'perd', 'perdre', 'rate', 'rater', 'passe à côté',
            'ignore', 'ignorer', 'n’écoute pas', 'écoute', 'digresse', 'hors sujet', 's’éparpille', 'disperse', 'embrouille', 'brouille', 'distrait',
            'change de sujet', 'élude', 'esquive', 'balaie', 'expédie', 'oui oui', 'vend autre chose', 'au lieu de', 'plutôt que', 'trop parler',
            'parle trop', 'en rajoute', 'surcharge', 'saisit pas', 'ne saisit pas', 'n’a pas saisi', 'pas vu', 'n’a pas vu', 'pas entendu', 'manque',
            'laisse passer', 'laisse filer', 'refroidir', 'refroidit', 'lasser', 'fatiguer', 'hésiter', 'doute', 'distraire'],
            conseil: 'Il relance son argumentaire au lieu de saisir le signal.' },
          raison()
        ],
        phrases: { attendues: 1, points: 2 },
        pieges: [PIEGE_ENVERS] },
      { titre: 'Répondre', champs: ['c2_text'],
        criteres: [
          { nom: 'Sa question traitée', mots: ['oui', 'c’est possible', 'possible', 'livrer', 'livraison', 'livr*', 'fin du mois', 'avant la fin', 'd’ici la fin',
            'délai', 'date', 'calendrier', 'tout à fait', 'bien sûr', 'sans problème', 'aucun problème', 'absolument', 'nous pouvons', 'on peut', 'je peux',
            'faisable', 'jouable', 'envisageable', 'bien entendu', 'parfaitement', 'à temps', 'dans les temps', 'avant le', 'semaine'],
            conseil: 'Répondez à sa question sur le délai.' },
          { nom: 'La décision proposée', mots: DECISION, conseil: 'Dans la même phrase, proposez d’avancer.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question qui fait décider', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER, PIEGE_ENVERS] }
    ] },

    // S3 3.5 · Justifier son choix : les deux réponses sont acceptables.
    's3-3.5': { integre: true, blocs: [
      { titre: 'Votre justification', champs: ['why'],
        criteres: [
          { nom: 'Le signal saisi', mots: ['signal', 'démarr*', 'question du client', 'sa question', 'question', 'quand', 'délai', 'semaine prochaine',
            'répond', 'répondre', 'réponse', 'se projette', 'projet*', 'intérêt', 'saisit', 'saisir', 'rebondit', 'rebondir', 'date', 'période', 'périodes',
            'calendrier', 'début du mois', 'mois prochain', 'il veut', 'il souhaite', 'envie', 'prêt', 'demande'],
            conseil: 'Les deux réponses saisissent le signal : « On pourrait démarrer quand ? ».' },
          { nom: 'L’engagement déjà exprimé', mots: ['engagement', 'engagé', 's’engager', 'engager', 'déjà validé', 'validé', 'valider', 'principe',
            'principe de l’achat', 'prêt', 'décidé', 'décision', 'décider', 'convaincu', 'accord', 'où il en est', 'niveau', 'hésite', 'hésitation',
            'hésitant', 'confirmer', 'confirmé', 'acquis', 'sûr', 'certain', 'doute', 'avant', 'précédemment', 'dans l’échange', 'déjà', 'encore',
            'pas encore', 'selon', 'dépend', 'si le client', 'si', 'contexte', 'situation', 'moment', 'avancé', 'mûr', 'motivé', 'ce qu’il a dit',
            'ce qu’il a exprimé', 'exprimé', 'dit oui'],
            conseil: 'Le choix dépend de ce que le client a déjà exprimé.' },
          { nom: 'Une proposition claire, un client libre', mots: ['clair', 'claire', 'clarté', 'simple', 'simplement', 'précis', 'précise', 'concret',
            'concrète', 'choix', 'choisir', 'liberté', 'libre', 'laisse décider', 'laisse le choix', 'laisse', 'sans forcer', 'sans pression', 'pression',
            'ne force pas', 'forcer', 'deux options', 'deux périodes', 'deux possibilités', 'alternative', 'directe', 'direct', 'vérifie', 'vérifier',
            'question fermée', 'oui ou non', 'propose', 'proposer', 'proposition', 'commande', 'prépare', 'organisation', 'organiser', 'facile',
            'naturel', 'naturelle', 'respect*', 'confort', 'rassur*', 'implique', 'impliquer', 'acteur', 'maître', 'contrôle', 'pousse', 'brusque',
            'brusquer', 'efficace', 'franc', 'franche', 'l’action', 'prochaine étape'],
            conseil: 'Dites ce que la réponse choisie apporte : une proposition claire, un choix laissé au client.' },
          raison()
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S3 3.6 · Le closing complet, jusqu'à une étape concrète.
    's3-3.6': { integre: true, blocs: [
      { titre: 'Votre closing', champs: ['c0_text'],
        criteres: [
          { nom: 'Sa question traitée', points: 1, mots: ['oui', 'c’est possible', 'possible', 'installation', 'installer', 'installés', 'avant la fin du mois',
            'fin du mois', 'avant la fin', 'délai', 'date', 'calendrier', 'nous pouvons', 'on peut', 'je peux', 'faisable', 'jouable', 'tout à fait',
            'bien sûr', 'sans problème', 'absolument', 'organiser', 'à temps', 'dans les temps'],
            conseil: 'Répondez à sa question : l’installation avant la fin du mois.' },
          { nom: 'Ce qui est validé rappelé', points: 1, mots: RECAP, conseil: 'Rappelez ce qui est validé : 10 postes, installation, garantie.' },
          { nom: 'La décision proposée', mots: DECISION, conseil: 'Proposez la décision : « Est-ce que nous partons sur les 10 postes ? ».' },
          { nom: 'Une étape concrète', mots: ETAPE, conseil: 'Fixez une étape précise : une date, un document, un rendez-vous.' },
          { nom: 'Le client laissé libre de décider', points: 1, mots: LAISSER_DECIDER, conseil: 'Laissez-lui le temps de répondre, sans forcer.' }
        ],
        phrases: { attendues: 2, points: 2 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question qui fait décider', points: 1 }],
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER] }
    ] },

    // S3 3.7 · Quatre cartes de conclusion, prêtes à l'emploi.
    's3-3.7': { integre: true, blocs: [
      { titre: 'Vérifier directement', champs: ['c0_text'],
        criteres: [{ nom: 'La décision proposée', points: 3, mots: DECISION, conseil: 'Demandez franchement : « Est-ce que nous pouvons partir sur cette solution ? ».' }],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }, { regle: 'maxMots:40', nom: 'Une phrase courte', points: 1 }],
        pieges: [PIEGE_FORCER] },
      { titre: 'Proposer un choix', champs: ['c1_text'],
        criteres: [
          { nom: 'Un choix entre deux options', mots: ALTERNATIVE, conseil: 'Proposez un choix : « Vous préférez… ou… ? ».' },
          { nom: 'Deux options concrètes', mots: ['5', '10', 'cinq', 'dix', 'deux', 'trois', 'cette semaine', 'la semaine prochaine', 'début du mois',
            'fin du mois', 'mois prochain', 'maintenant', 'plus tard', 'en une fois', 'en deux temps', 'en deux fois', 'd’abord', 'directement', 'livraison',
            'installation', 'matin', 'après-midi', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'standard', 'premium', 'complète', 'complet',
            'essentielle', 'essentiel', 'basique', 'location', 'achat', 'comptant', 'plusieurs fois', 'mensualités', 'mensuel', 'annuel', 'version',
            'modèle', 'formule', 'pack', 'offre', 'noir', 'gris', 'blanc', 'bleu', 'couleur', 'coloris', 'en ligne', 'sur place', 'présentiel', 'distance',
            'à domicile', 'en boutique', 'en magasin', 'retrait', 'livrer', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'septembre',
            'octobre', 'novembre', 'décembre', 'date', 'jour', 'postes', 'personnes', 'mois', 'ans', 'année', 'semaine', 'petit', 'grand', 'tout de suite',
            'progressivement', 'partiel', 'total', 'abonnement'],
            conseil: 'Nommez deux options concrètes et proches.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [PIEGE_FORCER] },
      { titre: 'Récapituler', champs: ['c2_text'],
        criteres: [
          { nom: 'Ce qui est validé rappelé', mots: RECAP, conseil: 'Résumez ce qui est validé avant de proposer.' },
          { nom: 'La décision proposée', mots: DECISION, conseil: 'Puis proposez la décision.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [PIEGE_FORCER] },
      { titre: 'Dernier détail', champs: ['c3_text'],
        criteres: [
          { nom: 'Un dernier détail à choisir', points: 3, mots: DETAIL, conseil: 'Faites choisir un détail : le coloris, la date, une option.' },
          { nom: 'Le reste validé', points: 1, mots: ['si tout le reste', 'si tout est', 'tout le reste', 'le reste', 'reste vous convient', 'validé', 'validée',
            'convient', 'on est d’accord', 'nous sommes d’accord', 'pour le reste', 'c’est réglé', 'réglé', 'tout est bon', 'tout est ok', 'tout est clair',
            'il reste', 'il nous reste', 'il ne reste', 'plus qu’à', 'dernier', 'dernière', 'enfin', 'donc', 'puisque', 'maintenant', 'tout est calé',
            'calé', 'bouclé', 'parfait', 'super', 'très bien', 'entendu'],
            conseil: 'Rappelez que tout le reste est validé.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question', points: 1 }],
        pieges: [PIEGE_FORCER] }
    ] },

    // S4 4.3 · Trois éléments de valeur pour relancer Madame Riveau.
    // Une idée notée suffit : on ne compte pas les phrases complètes.
    's4-4.3': { integre: true, blocs: ['Élément 1', 'Élément 2', 'Élément 3'].map((titre, i) => ({
      titre, champs: [`c0_v${i + 1}`],
      criteres: [
        { nom: 'Un élément nouveau ou utile', points: 3, mots: VALEUR_RELANCE, conseil: 'Apportez du neuf : un résultat client, une option, une échéance, une aide…' },
        { nom: 'Relié à la cliente', mots: ['dos', 'mal de dos', 'douleurs', 'équipes', 'vos équipes', 'ses équipes', 'salariés', 'collaborateurs', 'direction',
          'sa direction', 'votre direction', 'budget', 'dépense', 'convaincre', 'justifier', 'rh', 'ressources humaines', 'absences', 'arrêts', 'confort',
          'santé', 'bien-être', 'pme', '80 salariés', 'décision', 'décider', 'avancer', 'vous', 'votre', 'vos', 'elle', 'son', 'sa', 'ses', 'madame riveau',
          'riveau', 'projet', 'besoin', 'besoins', 'enjeu', 'priorité', 'priorités', 'trésorerie', 'investissement', 'coût', 'postes', '10 postes',
          'entreprise', 'secteur', 'locaux', 'déploiement', 'installation', 'aider', 'aide', 'rassurer', 'lever', 'frein'],
          conseil: 'Reliez l’élément à son enjeu : le dos de ses équipes, ou sa direction.' }
      ],
      phrases: { points: 0 },
      regles: [{ regle: 'minMots:5', nom: 'Une idée développée', points: 1 }],
      pieges: [PIEGE_PRESSION, PIEGE_VIDE, PIEGE_REMISE]
    })) },

    // S4 4.4 · Les quatre erreurs de la relance, dans n'importe quel ordre.
    's4-4.4': { integre: true, blocs: [
      { titre: 'Vos quatre erreurs', champs: ['c1_e1', 'c1_e2', 'c1_e3', 'c1_e4'],
        criteres: [
          { nom: 'Elle culpabilise la cliente', mots: ['culpabilis*', 'reproche', 'reprocher', 'reproch*', 'faute', 'en faute', 'accus*', 'malgré',
            'précédents messages', 'toujours pas', 'pas reçu', 'pression', 'insist*', 'agressi*', 'ton', 'sec', 'sèche', 'condescendan*', 'lourd',
            'lourde', 'harcèle', 'harcèlement', 'harcel*', 'met la pression', 'sous-entend', 'une nouvelle fois', 'nouvelle fois', 'j’imagine',
            'ironi*', 'passif-agressif', 'vexer', 'vexant', 'vexe', 'blesser', 'blessant', 'mal à l’aise', 'gêne', 'gêner', 'gênant', 'juge', 'jugement',
            'critique', 'leçon', 'donneur de leçons', 'irrespect*', 'impoli', 'désagréable', 'négatif', 'négative', 'rancunier', 'agacé', 'agacement',
            'énervé', 'impatien*', 'menaçant', 'culpabilité', 'coupable', 'mauvaise conscience', 'piquer', 'pique', 'tacle'],
            conseil: '« Malgré mes précédents messages… » sonne comme un reproche.' },
          { nom: 'Elle n’apporte rien de nouveau', mots: ['valeur', 'nouveau', 'nouvelle', 'nouveauté', 'neuf', 'rien de neuf', 'rien de concret',
            'n’apprend rien', 'apporte rien', 'aucun élément', 'aucune information', 'aucune info', 'vague', 'flou', 'floue', 'générique', 'générale',
            'nombreux avantages', 'avantages', 'bénéfice', 'concret', 'concrète', 'preuve', 'argument', 'arguments', 'correspond parfaitement',
            'sans raison', 'raison de répondre', 'raison', 'intérêt', 'utile', 'utilité', 'creux', 'creuse', 'vide', 'banal', 'banale', 'cliché',
            'langue de bois', 'bateau', 'passe-partout', 'copier-coller', 'standard', 'impersonnel', 'impersonnelle', 'personnalis*', 'même message',
            'répète', 'répétition', 'redite', 'témoignage', 'chiffre', 'information', 'informations', 'apport', 'apporter', 'apporte', 'nourrir'],
            conseil: '« Notre offre présente de nombreux avantages » n’apprend rien de concret.' },
          { nom: 'Elle parle des besoins du commercial', mots: ['nous organiser', 'organiser', 'de notre côté', 'notre côté', 'son côté', 'ses besoins',
            'propres besoins', 'besoins du commercial', 'besoins du vendeur', 'centré sur', 'centrée sur', 'centré', 'centrée', 'le commercial', 'commercial',
            'vendeur', 'thomas', 'son intérêt', 'ses intérêts', 'son propre', 'sa propre', 'lui-même', 'égocentr*', 'parle de lui', 'parle de son',
            'pas de la cliente', 'point de vue', 'nous avons besoin', 'besoin de savoir', 'son organisation', 'ses contraintes', 'contraintes',
            'planning', 'agenda', 'son confort', 'sa société', 'son entreprise', 'l’entreprise', 'nous', 'notre', 'nos', 'je', 'priorité', 'prioritaire',
            'pas la cliente', 'au lieu de la cliente', 'oublie la cliente', 'oublie le client', 'enjeux de la cliente', 'besoins de la cliente',
            'ce qui l’arrange', 'arrange', 'lui profite', 'profite', 'bénéficie', 'avantage du commercial', 'tourné vers', 'tournée vers'],
            conseil: '« Afin que nous puissions nous organiser » sert le commercial, pas la cliente.' },
          { nom: 'L’appel à l’action trop exigeant', mots: ['meilleurs délais', 'dans les meilleurs délais', 'confirmer votre décision', 'décision', 'décider',
            'urgence', 'urgent', 'exige', 'exiger', 'exigeant', 'exigeante', 'contraignant', 'contraignante', 'presse', 'presser', 'pressé', 'pression',
            'rapidement', 'tout de suite', 'ultimatum', 'oui ou non', 'étape intermédiaire', 'intermédiaire', 'prochain pas', 'appel à l’action',
            'action', 'créneau', 'créneaux', 'rendez-vous', '15 minutes', 'échange', 'trop direct', 'trop directe', 'brutal', 'brutale', 'forcer', 'force',
            'précipit*', 'immédiat', 'immédiate', 'délai', 'délais', 'demande de décision', 'engagement', 's’engager', 'trop grand', 'trop gros',
            'marche', 'trop haute', 'facile', 'simple', 'concret', 'proposition', 'proposer', 'propose', 'aucune suite', 'pas de suite', 'fin', 'conclusion',
            'question fermée', 'impose', 'imposer', 'sommation', 'mise en demeure', 'injonction', 'ordre'],
            conseil: '« Confirmez votre décision dans les meilleurs délais » exige trop, trop vite.' },
          { nom: 'L’effet sur la relation', mots: ['relation', 'confiance', 'envie de répondre', 'donne envie', 'envie', 'refroidi*', 'braque', 'braquer',
            'agace', 'agacer', 'irrite', 'irriter', 'fuir', 'fuit', 'ignore', 'ignorer', 'se fermer', 'ferme', 'fermer', 'éloigne', 'éloigner', 'abîme',
            'abîmer', 'dégrade', 'dégrader', 'nuit', 'nuire', 'image', 'mauvaise impression', 'impression', 'perçu', 'perçue', 'ressent', 'se sent',
            'sentir', 'découragé', 'décourag*', 'démotiv*', 'désengag*', 'perte', 'perdre', 'client perdu', 'répondre', 'ne répondra pas', 'répondra',
            'n’a aucune raison', 'aucune raison', 'raison de répondre', 'mal', 'mauvais', 'mauvaise', 'gêne', 'mal à l’aise', 'distance', 'froid',
            'froide', 'hostile', 'tension', 'conflit', 'braquée', 'rebute', 'rebuter', 'freine', 'freiner', 'bloque', 'bloquer', 'détourne', 'méfian*',
            'désintérêt', 'désintéress*', 'lasse', 'lasser', 'lassitude', 'agacée', 'irritée', 'blessée', 'vexée', 'piégée', 'acculée', 'coincée'],
            conseil: 'Dites l’effet de chaque erreur sur la relation : la cliente n’a plus envie de répondre.' }
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_ENVERS] }
    ] },

    // S4 4.5 · Pourquoi la relance B est la plus efficace.
    's4-4.5': { integre: true, blocs: [
      { titre: 'Votre justification', champs: ['why'],
        criteres: [
          { nom: 'La valeur apportée', mots: ['valeur', 'retour d’expérience', 'retour', 'témoignage', 'une entreprise du même', 'entreprise du même secteur', 'même secteur', 'secteur', 'nouveau', 'nouvelle', 'nouvelle raison',
            'raison', 'information', 'concret', 'concrète', 'arrêts', 'douleurs', 'dorsales', 'dos', 'résultats', 'résultat', 'preuve', 'exemple',
            'apporte', 'apporter', 'apport', 'utile', 'intéressant', 'intéressante', 'enseignements', 'partage', 'partager', 'crédib*', 'confiance',
            'cas client', 'client du même', 'son projet', 'projet de', 'relie', 'lien', 'positif', 'diminution', 'baisse', 'chiffre', 'élément'],
            conseil: 'La B apporte une nouvelle raison d’échanger : le retour d’une entreprise du même secteur.' },
          { nom: 'Un prochain pas concret', mots: ['créneaux', 'créneau', 'deux créneaux', '15 minutes', 'quinze minutes', 'minutes', 'mardi ou jeudi', 'deux jours',
            '11 h', '14 h', 'date', 'dates', 'horaire', 'horaires', 'précis', 'précise', 'précisément', 'rendez-vous', 'échange', 'appel à l’action',
            'prochain pas', 'prochaine étape', 'action', 'facilite', 'faciliter', 'facile', 'simple', 'simplifie', 'concret', 'concrète', 'propose',
            'proposition', 'choix', 'choisir', 'court', 'courte', 'rapide', 'disponible', 'invite', 'invitation', 'engage', 'effort', 'question fermée',
            'répondre facilement', 'oui ou non', 'clair', 'claire'],
            conseil: 'Elle propose un échange court, avec deux créneaux précis.' },
          { nom: 'Les limites de la relance A', mots: ['ouverte', 'ouvert', 'trop ouvert', 'n’hésitez pas', 'effort', 'attend', 'attendre', 'passif', 'passive',
            'vague', 'laisse', 'revenir vers moi', 'aucune nouveauté', 'peu de valeur', 'rien de nouveau', 'pas de valeur', 'la a', 'relance a', 'la première',
            'l’autre', 'alors que', 'contrairement', 'tandis que', 'en revanche', 'par contre', 'mais', 'pas mauvaise', 'correcte', 'polie', 'rien de concret',
            'ne propose rien', 'pas de date', 'aucune date', 'sans date', 'tout l’effort', 'à la cliente de', 'charge', 'subit', 'flou', 'générique',
            'classique', 'banale', 'standard', 'moins'],
            conseil: 'La A n’est pas mauvaise, mais laisse tout l’effort à la cliente.' },
          { nom: 'Le contexte et le ton', points: 1, mots: ['contexte', 'rappelle', 'rappel', 'rappeler', '3 juin', 'proposition', 'professionnel',
            'professionnelle', 'professionnels', 'poli', 'polie', 'politesse', 'courtois', 'courtoise', 'ton', 'respectueux', 'respectueuse', 'respect',
            'personnalisé', 'personnalisée', 'bienveillant', 'bienveillante', 'sans pression', 'chaleureux', 'chaleureuse', 'agréable', 'positif',
            'positive', 'ravi', 'enthousiaste', 'cordial', 'cordiale', 'aimable', 'madame riveau', 'nom'],
            conseil: 'Les deux rappellent le contexte avec un ton professionnel.' },
          raison()
        ],
        phrases: { attendues: 1, points: 1 } }
    ] },

    // S4 4.6 · Le plan de relance : la valeur et le prochain pas de chaque étape.
    // Ce sont des notes de plan : on ne compte pas les phrases complètes.
    's4-4.6': { integre: true, blocs: [0, 1, 2].flatMap(i => [
      { titre: `Relance ${i + 1} · Valeur`, champs: [`c${i}_value`],
        criteres: [
          { nom: 'Une information utile', points: 3, mots: VALEUR_RELANCE, conseil: 'Apportez une information nouvelle et utile, pas seulement une demande de nouvelles.' },
          { nom: 'Pour Madame Riveau', points: 1, mots: ['vos', 'votre', 'son', 'sa', 'ses', 'elle', 'madame riveau', 'cliente', 'équipes', 'salariés', 'dos',
            'direction', 'budget', 'projet', 'besoins', 'besoin', 'questions', 'frein', 'enjeu', 'offre', 'proposition', 'postes', 'entreprise', 'secteur',
            'pme', 'rh', 'confort', 'santé', 'arrêts', 'décision', 'convaincre', 'rassurer', 'lever'], conseil: 'Pensez à ce qui compte pour elle.' }
        ],
        phrases: { points: 0 },
        regles: [{ regle: 'minMots:3', nom: 'Une idée développée', points: 1 }],
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] },
      { titre: `Relance ${i + 1} · Prochain pas`, champs: [`c${i}_next`],
        criteres: [
          { nom: 'Une action proposée', points: 3, mots: ACTION_RELANCE, conseil: 'Proposez une action : un échange, un appel, un rendez-vous…' },
          { nom: 'Précise', points: 1, mots: ['minutes', 'minute', 'quart d’heure', 'demi-heure', 'heure', 'heures', 'lundi', 'mardi', 'mercredi', 'jeudi',
            'vendredi', 'matin', 'après-midi', 'date', 'jour', 'créneau', 'créneaux', 'semaine', 'demain', 'court', 'courte', 'rapide', 'bref', 'brève',
            '15', '10', '20', '30', 'deux', 'précis', 'précise', 'visio', 'téléphone', 'sur place', 'chez vous', 'dans vos locaux', 'si nécessaire',
            'au besoin', 'objectif', 'pour', 'ensemble'], conseil: 'Rendez-la précise : une durée, un jour, un objet.' }
        ],
        phrases: { points: 0 },
        pieges: [PIEGE_PRESSION] }
    ]).concat([
      { titre: 'Clôture · Valeur', champs: ['c3_value'],
        criteres: [
          { nom: 'La séquence close avec courtoisie', points: 3, mots: ['clore', 'clôturer', 'clôture', 'clos', 'fin', 'finir', 'terminer', 'arrêter', 'arrêt',
            'cesser', 'ne pas multiplier', 'ne plus relancer', 'plus relancer', 'ne pas insister', 'sans insister', 'dernier message', 'dernière relance',
            'dernier contact', 'séquence', 'pas prioritaire', 'plus prioritaire', 'prioritaire', 'priorité', 'le moment', 'pas le moment', 'sans reproche',
            'comprends', 'comprendre', 'compréhension', 'respecte', 'respecter', 'respect', 'merci', 'remercier', 'remerciement', 'porte ouverte',
            'garder le lien', 'lien', 'relation', 'disponible', 'disposition', 'plus tard', 'quelques mois', 'revenir', 'courtois', 'courtoisie', 'poli',
            'politesse', 'bienveillant', 'élégant', 'élégance', 'sans fermer', 'ne pas fermer', 'laisser', 'pause', 'mettre en pause', 'en suspens',
            'bonne continuation', 'calendrier', 'l’ordre du jour', 'ordre du jour', 'sujet', 'temps', 'rythme', 'retour', 'contact'],
            conseil: 'Fermez la séquence avec courtoisie, sans reproche.' },
          { nom: 'Pour Madame Riveau', points: 1, mots: ['vos', 'votre', 'son', 'sa', 'ses', 'elle', 'madame riveau', 'cliente', 'projet', 'besoins', 'équipes',
            'direction', 'décision', 'situation', 'contraintes'], conseil: 'Parlez de son projet, pas de votre séquence.' }
        ],
        phrases: { points: 0 },
        pieges: [PIEGE_PRESSION] },
      { titre: 'Clôture · Prochain pas', champs: ['c3_next'],
        criteres: [
          { nom: 'La porte laissée ouverte', points: 3, mots: ['disponible', 'disponibilité', 'reprendre contact', 'recontacter', 'je vous recontacte',
            'dans quelques mois', 'quelques mois', 'plus tard', 'revenir', 'revenir vers vous', 'je reviendrai', 'à votre disposition', 'disposition',
            'n’hésitez pas', 'quand vous voulez', 'quand vous le souhaitez', 'le moment venu', 'si le sujet revient', 'si le projet revient', 'à l’avenir',
            'rester en contact', 'garder le contact', 'garder le lien', 'contact', 'porte ouverte', 'joignable', 'je reste', 'rester', 'reprendre',
            'relancer dans', 'rappeler dans', 'faire un point dans', 'dans six mois', 'dans 6 mois', 'dans trois mois', 'dans 3 mois', 'trimestre',
            'rentrée', 'l’année prochaine', 'ultérieurement', 'nouvelles', 'newsletter', 'informer', 'tenir informé', 'tenir informée', 'écoute', 'retour',
            'rouvrir', 'si besoin', 'au besoin', 'le jour où', 'dès que', 'si vous le souhaitez'],
            conseil: 'Laissez la porte ouverte : proposer de reprendre contact plus tard.' },
          { nom: 'Précise', points: 1, mots: ['mois', 'trimestre', 'rentrée', 'année', 'semaine', 'date', 'six', '6', 'trois', '3', 'septembre', 'janvier',
            'printemps', 'automne', 'quelques', 'proposer', 'propose', 'appel', 'message', 'e-mail', 'mail', 'téléphone', 'échange'],
            conseil: 'Dites quand ou comment vous reprendrez contact.' }
        ],
        phrases: { points: 0 },
        pieges: [PIEGE_PRESSION] }
    ]) },

    // S4 4.7 · Le modèle de relance, partie par partie.
    's4-4.7': { integre: true, blocs: [
      { titre: 'Objet', champs: ['c0_subject'],
        criteres: [{ nom: 'Un objet clair et engageant', points: 3, mots: ['votre projet', 'projet', 'votre proposition', 'proposition', 'offre', 'devis',
          'point rapide', 'point', 'rapide', 'retour d’expérience', 'retour', 'nouveauté', 'nouveau', 'nouvelle', 'information', 'info', 'suite', 'idée',
          'question', 'rendez-vous', 'échange', 'minutes', 'résultats', 'résultat', 'témoignage', 'bonne nouvelle', 'pour vous', 'votre équipe',
          'vos équipes', 'équipement', '[offre', '[offre]', '[prénom', '[projet', 'étape', 'prochaine étape', 'avancer', 'piste', 'solution', 'option',
          'complément', 'précision', 'précisions', 'éléments', 'votre', 'vos', 'suivi', 'aide', 'conseil', 'astuce', 'exemple', 'cas', 'chiffres', 'utile',
          'découvrez', 'à vous partager', 'partager', 'invitation', 'démonstration', 'essai', 'diagnostic', 'offert', 'gratuit'],
          conseil: 'Un objet court qui dit le sujet et donne envie d’ouvrir.' }],
        phrases: { points: 0 },
        regles: [{ regle: 'maxMots:14', nom: 'Un objet court', points: 1 }],
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] },
      { titre: 'Contexte', champs: ['c0_context'],
        criteres: [
          { nom: 'L’échange précédent rappelé', points: 3, mots: CONTEXTE_RAPPEL, conseil: 'Rappelez l’offre ou l’échange précédent, avec sa date.' },
          { nom: 'Un message personnalisé', points: 1, mots: ['bonjour', 'bonsoir', '[prénom', '[prénom du client]', 'madame', 'monsieur', 'cher', 'chère',
            '[nom', '[client', '[entreprise', '[offre', '[date', 'votre', 'vos', 'comme convenu', 'comme promis'],
            conseil: 'Saluez et personnalisez : « Bonjour [Prénom]… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] },
      { titre: 'Valeur', champs: ['c0_value'],
        criteres: [
          { nom: 'Une information nouvelle ou utile', points: 3, mots: VALEUR_RELANCE, conseil: 'Donnez une vraie raison de répondre : un retour d’expérience, une donnée, une option.' },
          { nom: 'Le lien avec son besoin', mots: ['car', 'parce que', 'parce qu*', 'pour vous', 'votre besoin', 'vos besoins', 'votre enjeu', 'vos enjeux',
            'votre projet', 'vos équipes', 'votre équipe', 'utile', 'intéresser', 'intéressera', 'pourrait vous', 'vous aider', 'vous permettre',
            'en lien avec', 'correspond', 'répond', 'vos priorités', 'votre priorité', 'votre situation', 'votre contexte', 'vous concerne', 'vous concerner',
            'je pense à vous', 'j’ai pensé à vous', 'pensé à vous', 'comme vous', 'votre cas', 'chez vous', 'votre activité', 'votre entreprise', 'vos',
            'votre', '[besoin', '[enjeu', '[lien', 'puisque', 'comme', 'afin de', 'pour que', 'permet', 'permettrait', 'aider', 'faciliter', 'lever'],
            conseil: 'Dites pourquoi c’est utile pour ce client : « car… ».' }
        ],
        phrases: { attendues: 1, points: 1 },
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] },
      { titre: 'Prochain pas', champs: ['c0_next'],
        criteres: [
          { nom: 'Une action simple et concrète', points: 3, mots: ACTION_RELANCE, conseil: 'Proposez une action simple : un échange de 15 minutes, une démonstration…' },
          { nom: 'Des créneaux à choisir', points: 1, mots: ['ou', 'ou bien', '[créneau', 'créneau a', 'créneau b', 'créneaux', 'deux créneaux', 'lundi', 'mardi',
            'mercredi', 'jeudi', 'vendredi', 'matin', 'après-midi', 'plutôt', 'lequel', 'laquelle', 'quel moment', 'quel jour', 'quelle date', 'vos disponibilités',
            '[date', '[jour', 'heure', 'heures', 'semaine', 'demain'], conseil: 'Proposez deux créneaux : il est plus facile de choisir.' }
        ],
        phrases: { attendues: 1, points: 1 },
        regles: [{ regle: 'avecQuestion', nom: 'Une question pour finir', points: 1 }],
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] }
    ] },

    // S5 1.2 · Annoncer 2 400 € en trois temps.
    's5-1.2': { integre: true, blocs: [
      { titre: 'Votre réponse', champs: ['c0_text'],
        criteres: [
          { nom: 'Un bénéfice concret', mots: uniq(BENEFICE, ['accompagnement', 'complet', 'complète', 'suivi', 'garantie', 'toute l’année', 'tout au long de l’année',
            'à vos côtés', 'expert', 'expertise', 'résultats', 'objectifs', 'progresser', 'progrès', 'temps', 'semaine', 'chaque semaine']),
            conseil: 'Ouvrez sur un bénéfice important pour le client.' },
          { nom: 'Le prix annoncé clairement', mots: uniq(P2400, PRIX_MOTS), conseil: 'Annoncez 2 400 € clairement, sans hésiter.' },
          { nom: 'Un bénéfice de plus, ou la suite', mots: uniq(REASSURANCE, USAGE, ['sans coût supplémentaire', '12 mois', 'douze mois', 'toute l’année',
            'moins de 7', '7 €', 'sept euros', 'qu’en pensez-vous', 'on démarre', 'nous démarrons', 'démarrer', 'commencer', 'je vous propose', 'la suite',
            'prochaine étape', 'si cela vous convient', 'si ça vous convient', 'ça vous convient', 'cela vous convient', 'quand souhaitez-vous',
            'quand voulez-vous', 'vous profitez', 'vous bénéficiez', 'bénéfici*', 'tranquille', 'serein', 'sereine', 'esprit libre', 'rien à prévoir',
            'aucune surprise', 'sans surprise', 'pendant', 'ensemble', 'mettre en place', 'lancer']),
            conseil: 'Terminez par un autre bénéfice ou une ouverture vers la suite.' }
        ],
        phrases: { attendues: 1, points: 2 },
        pieges: [PIEGE_HESITATION, PIEGE_REMISE] }
    ] },

    // S5 2.2 · Défendre le prix : comprendre, valoriser, mettre en perspective.
    's5-2.2': { integre: true, blocs: [
      { titre: 'Votre réponse', champs: ['c0_text'],
        criteres: [
          { nom: 'Comprendre ce qui semble élevé', mots: uniq(ACCUEIL, QUESTION_OUVERTE, ['plus cher que prévu', 'que prévu', 'prévu', 'envisagé', 'budget',
            'vous pensiez', 'vous aviez', 'autre solution', 'autre offre', 'comparé', 'imaginiez', 'attendiez', 'pensiez']),
            conseil: 'Accueillez, puis précisez ce qui semble élevé : le budget prévu, une autre offre ?' },
          { nom: 'Des faits concrets de l’offre', mots: uniq(VALEUR_COMPRISE, ['accompagnement', 'livraison', '12 mois', 'douze mois', 'toute l’année']),
            conseil: 'Citez un ou deux faits concrets : accompagnement, livraison, garantie, suivi.' },
          { nom: 'Le prix mis en perspective', mots: uniq(USAGE, PERIMETRE, ['moins de 7', '7 €', 'sept euros', '2 400', '2400', 'par jour', 'à l’année',
            'comparer', 'comparons', 'à côté de', 'face à', 'au regard de', 'en regard', 'mis en regard']),
            conseil: 'Décomposez le prix (par jour, par mois) ou comparez.' }
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_REMISE, PIEGE_CONTREDIRE, PIEGE_COUTS] }
    ] },

    // S5 3.2 · Répondre au signal, proposer la suite, rassurer.
    's5-3.2': { integre: true, blocs: [
      { titre: 'Votre réponse', champs: ['c0_text'],
        criteres: [
          { nom: 'Sa question traitée', mots: ['dès', 'date', 'le 15', '15', 'octobre', 'novembre', 'semaine prochaine', 'la semaine prochaine', 'lundi',
            'mardi', 'mercredi', 'jeudi', 'vendredi', 'rapidement', 'démarrer', 'démarrage', 'commencer', 'possible', 'nous pouvons', 'on peut', 'je peux',
            'quand vous voulez', 'quand vous le souhaitez', 'immédiatement', 'tout de suite', 'demain', 'cette semaine', 'mois prochain', 'début', 'fin',
            'jours', 'délai', 'sous', 'd’ici', 'bientôt', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'septembre', 'décembre'],
            conseil: 'Répondez à sa question : une date de démarrage.' },
          { nom: 'La suite proposée', mots: uniq(DECISION, ALTERNATIVE), conseil: 'Proposez de valider, ou un choix entre deux dates.' },
          { nom: 'Rassurer sur la suite', mots: ['accompagne', 'accompagner', 'accompagnement', 'je m’occupe', 'je m’en occupe', 'nous nous occupons',
            'on s’occupe', 'à chaque étape', 'chaque étape', 'mise en place', 'organiser', 'organisation', 'suivi', 'je reste disponible', 'disponible',
            'à vos côtés', 'de tout', 'sereinement', 'serein', 'sereine', 'tranquille', 'tranquillement', 'simple', 'simplement', 'sans souci', 'aucun souci',
            'interlocuteur', 'je vous guide', 'guider', 'ensemble', 'rassur*', 'pas d’inquiétude', 'ne vous inquiétez', 'facile', 'facilement', 'je gère',
            'on gère', 'nous gérons', 'prendre en charge', 'pris en charge', 'je vous tiens informé', 'je vous tiens informée', 'informée', 'informé',
            'vous n’aurez rien', 'rien à faire', 'clé en main', 'garantie', 'garanti', 'sécuris*', 'pas à pas', 'étape par étape', 'en douceur', 'confiance',
            'je vous appelle', 'je vous rappelle', 'je vous envoie', 'je vous prépare', 'récapitulatif', 'planning', 'calendrier', 'je reste joignable'],
            conseil: 'Rassurez-la sur la suite : vous l’accompagnez à chaque étape.' }
        ],
        phrases: { attendues: 2, points: 2 },
        pieges: [PIEGE_ARGUMENTAIRE, PIEGE_FORCER, PIEGE_REMISE] }
    ] },

    // S5 4.2 · Le mail de relance : objet, puis message.
    's5-4.2': { integre: true, blocs: [
      { titre: 'L’objet', champs: ['c0_subject'],
        criteres: [{ nom: 'Un objet clair et engageant', points: 3, mots: ['votre projet', 'projet', 'équipement', 'retour d’expérience', 'retour', 'témoignage',
          'proposition', 'offre', '10 postes', 'dix postes', 'postes', 'nouveauté', 'nouveau', 'nouvelle', 'information', 'pour vous', 'à vous partager',
          'partager', 'résultats', 'résultat', 'confort', 'douleurs', 'dos', 'entreprise', 'secteur', 'vos équipes', 'votre équipe', 'ergonom*', 'suite',
          'idée', 'point', 'échange', 'exemple', 'cas', 'client', 'retour positif', 'positif', 'enseignements', 'utile', 'santé', 'bien-être', 'mobilier',
          'sièges', 'bureaux', 'votre', 'vos'], conseil: 'Un objet court, qui donne envie d’ouvrir.' }],
        phrases: { points: 0 },
        regles: [{ regle: 'maxMots:15', nom: 'Un objet court', points: 1 }],
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] },
      { titre: 'Le message', champs: ['c0_message'],
        criteres: [
          { nom: 'Le contexte rappelé', mots: CONTEXTE_RAPPEL, conseil: 'Rappelez pourquoi vous écrivez : la proposition envoyée il y a 10 jours.' },
          { nom: 'La valeur du retour d’expérience', points: 3, mots: VALEUR_RELANCE, conseil: 'Apportez le retour positif d’une entreprise du même secteur.' },
          { nom: 'Un prochain pas concret', mots: ACTION_RELANCE, conseil: 'Proposez une action : 15 minutes mardi ou jeudi.' },
          { nom: 'Centré sur Madame Riveau', points: 1, mots: ['vos équipes', 'votre équipe', 'votre projet', 'vos priorités', 'douleurs', 'posturales', 'déploiement',
            'utile', 'pour vous', 'vous aider', 'vos salariés', 'vos collaborateurs', 'votre entreprise', 'vos besoins', 'votre réflexion', 'votre décision',
            'votre direction', 'dos', 'confort', 'santé', 'bien-être', 'faciliter', 'vous intéresser', 'pourrait vous'],
            conseil: 'Reliez le message à ses priorités : douleurs posturales, déploiement.' },
          { nom: 'Les formules de politesse', points: 1, mots: ['bonjour', 'madame', 'cordialement', 'bien à vous', 'belle journée', 'bonne journée',
            'au plaisir', 'salutations', 'bien cordialement', 'merci', 'dans l’attente'], conseil: 'Saluez et terminez par une formule de politesse.' }
        ],
        phrases: { attendues: 3, points: 2 },
        pieges: [PIEGE_PRESSION, PIEGE_VIDE] }
    ] }
  };
})();
