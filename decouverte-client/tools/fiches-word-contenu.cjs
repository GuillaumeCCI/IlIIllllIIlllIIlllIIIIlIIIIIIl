/* LES FICHES D'ACCOMPAGNEMENT PÉDAGOGIQUE de M1.2.1 et M1.2.2, au format
 * de la fiche M1.1.2 (v2) : 8 rubriques, mêmes tableaux, même ton.
 * Produites par tools/build-fiches-word.cjs. Deux pages A4 au plus.
 */
'use strict';

const INTRO = 'Des repères pour mettre le module en ligne et accompagner vos apprenants. Adaptez-les librement.';
const RETOURS = ['Vos retours nous aident. ', 'Une activité trop longue, un contexte peu adapté, une difficulté imprévue : dites-le-nous, le module évolue pour tout le réseau. Contact : 1001parcours@ccifrance.fr.'];
const CERT_NOTE = 'Correspondances de travail, à vérifier dans les référentiels officiels en vigueur.';
const GROUPES = {
  commerce: ['Commerce et distribution', 'BTS Management commercial opérationnel (RNCP38362) · Gestionnaire d’unité commerciale (RNCP36141) · Responsable de commerces et de la distribution (RNCP40675)'],
  b2b: ['Vente entre entreprises', 'BTS Négociation et digitalisation de la relation client (RNCP38368) · Attaché commercial (RNCP39743) · Responsable de développement commercial (RNCP40568)'],
  pme: ['Gestion d’entreprise', 'BTS Gestion de la PME (RNCP38363)'],
  immo: ['Immobilier', 'BTS Professions immobilières (RNCP38380) · Responsable de transactions et de gestion de biens immobiliers (RNCP42523)']
};
const EN_LIGNE = ['Exercices en ligne. ', 'Chaque série s’intègre dans la plateforme par un lien ou un code d’intégration (page « Intégrer les exercices ») et garde sa navigation. Les choix se corrigent automatiquement ; les réponses écrites reçoivent un score estimatif et un corrigé après la tentative.'];
const NAVIGATEUR = ['Les réponses restent dans le navigateur. ', 'Rien ne remonte dans votre plateforme : pour lire une production, demandez un dépôt. Les grilles de début et de fin se comparent dans le même navigateur.'];
const ERREURS_INTRO = 'En faisant les exercices, beaucoup d’apprenants font les erreurs ci-dessous. Si vous animez une séance, en salle ou à distance, chacune peut être retravaillée avec le groupe en 10 à 20 minutes, grâce à l’activité proposée en face.';

module.exports = {
  '1-2-1': {
    code: 'M1.2.1',
    kicker: 'MODULE M1.2 · DÉCOUVERTE CLIENT',
    title: 'Pratiquer l’écoute active et s’adapter au client',
    intro: INTRO,
    brief: [
      ['Public', 'Apprenants des certifications commerciales de niveaux 5 et 6, souvent en alternance. Le module se transpose à l’immobilier.'],
      ['Objectif', 'Adopter une posture d’écoute active, reconnaître les attitudes d’écoute qui aident la relation, reformuler (écho, reflet, synthèse) et s’adapter aux signaux verbaux et non verbaux du client.'],
      ['Format', '2 h, 100 % à distance : un module interactif (SCORM) et quatre séries d’exercices en ligne, soit 13 exercices. Synthèse facultative de 45 à 60 min, sur document.'],
      ['Place', 'Ouvre M1.2, avant M1.2.2 (questionner) et M1.2.3 (l’entretien complet). En parcours intégré, après M1.1.1.'],
      ['Prérequis', 'Aucun. Être à l’aise à l’écrit ; pour la dernière série, un micro (l’enregistrement se fait dans la page).']
    ],
    steps: [
      ['Mon point de départ', 'grille d’auto-positionnement', '5 min', 'Aucune'],
      ['Comprendre et s’adapter au client', 'module interactif (SCORM)', '15 min', 'Automatique'],
      ['Les attitudes d’écoute', 'Au magasin · En entreprise · À l’agence immobilière', '15 min', 'Automatique et corrigé'],
      ['Reformuler', 'L’écho · Le reflet · La synthèse · Reformulation, ou pas ?', '20 min', 'Automatique ou corrigé à comparer'],
      ['Analyser un entretien', 'Les attitudes de Nadia · Les signaux manqués · Pourquoi la fin change tout · Réécrire « Comme tout le monde ! »', '25 min', 'Automatique ou corrigé à comparer'],
      ['S’adapter au client', 'Trois commerciaux, une cliente pressée · Votre réponse, votre voix', '45 min', 'Corrigé à comparer ; dépôt de l’audio et du texte'],
      ['Mon point d’arrivée', 'grille et « Ma progression »', '10 min', 'Lecture par vous']
    ],
    matrix: {
      cols: [['2', 'Module'], ['3', 'Attitudes'], ['4', 'Reformuler'], ['5', 'Analyser'], ['6', 'S’adapter'], ['+', 'Synthèse']],
      rows: [
        ['Reconnaître les attitudes d’écoute (Porter)', '●', '●', '', '●', '', '○'],
        ['Adopter l’attitude de compréhension', '●', '●', '', '●', '●', '●'],
        ['Reformuler : écho, reflet, synthèse', '', '', '●', '○', '●', '●'],
        ['S’adapter aux signaux verbaux et non verbaux', '', '', '', '●', '●', '●']
      ]
    },
    exercisesIntro: 'Treize exercices, en quatre séries, entre deux grilles d’auto-positionnement. Chaque exercice suit le même déroulé : l’apprenant répond, puis il compare avec le corrigé.',
    exercises: [
      ['Les attitudes d’écoute', '« Au magasin », « En entreprise », « À l’agence immobilière » : reconnaître l’attitude d’écoute de chaque réplique d’un vendeur.'],
      ['Reformuler', '« L’écho », « Le reflet », « La synthèse » : reformuler les paroles d’un client. « Reformulation, ou pas ? » : trier des répliques.'],
      ['Analyser un entretien', 'Un rendez-vous en agence : les attitudes de Nadia, les signaux manqués, pourquoi la fin change tout, puis réécrire « Comme tout le monde ! ».'],
      ['S’adapter au client', '« Trois commerciaux, une cliente pressée » : juger trois réponses. « Votre réponse, votre voix » : répondre à un client par écrit, puis à voix haute.']
    ],
    certs: [
      [GROUPES.commerce, '« Au magasin » · « Votre réponse, votre voix », avec M. Garnier (literie) · synthèse : options 1 (dossier A, cuisiniste), 2 et 3.'],
      [GROUPES.b2b, '« En entreprise » · « Trois commerciaux, une cliente pressée » · Mme Lefort (garage) · synthèse : option 1, dossier B.'],
      [GROUPES.pme, '« La synthèse » (une petite entreprise cliente) · Mme Lefort · synthèse : option 3.'],
      [GROUPES.immo, '« À l’agence immobilière » · « Le reflet » · toute la série « Analyser un entretien » · Mme Duval (mandat de vente).']
    ],
    online: [
      EN_LIGNE,
      NAVIGATEUR,
      ['Votre réponse, votre voix. ', 'L’apprenant s’enregistre dans la page, télécharge son audio et copie son texte pour les déposer : le ton s’entend, le texte se corrige.'],
      ['La synthèse. ', 'Sur document, un dépôt par option ; l’option 2 se monte dans un outil à embranchements (Storyline, Genially, H5P).'],
      ['Temps de suivi. ', 'Environ 10 min par réponse enregistrée, 15 min par synthèse, 3 min pour les grilles.'],
      ['À votre main. ', 'Le rythme (une ou deux semaines), le retour (vous, un pair ou les deux), l’usage de la synthèse et un éventuel temps en direct.']
    ],
    watch: [
      ['Le module interactif', 'Il emploie 6 attitudes de Porter et 3 reformulations (écho, reflet, synthèse). Vérifiez que votre version utilise les mêmes mots.'],
      ['L’auto-positionnement', 'Les apprenants se surestiment souvent au départ : une note de fin plus basse montre qu’ils voient mieux l’exigence. Dites-le-leur.'],
      ['Le non verbal', 'Évitez les lectures toutes faites (« bras croisés = fermé ») : un signal est une hypothèse à vérifier.'],
      ['Frontière avec M1.2.2', 'Écouter et questionner se confondent vite. Le questionnement structuré se travaille dans M1.2.2.'],
      ['L’enregistrement', 'S’enregistrer peut gêner (timidité, matériel, micro refusé, handicap) : acceptez l’écrit si besoin. L’option 3 suppose une entreprise ; orientez les autres vers les options 1 ou 2.']
    ],
    errors: [
      ['Sa reformulation devient un argument.', 'Un produit, un prix ou un conseil s’invite : « … donc je vous conseille… ».', 'Écoute ou vente ?', 'Classez 8 répliques en reformulation ou argument, puis réécrivez les arguments en reformulations.'],
      ['Son reflet interprète.', 'Il prête au client une intention que celui-ci n’a pas exprimée.', 'Je n’ai jamais dit ça', 'Le « client » répond ainsi à chaque reflet qui interprète ; le groupe retravaille la phrase.'],
      ['Il prend le non verbal pour une certitude.', '« Il est fermé », « il ment », sans rien vérifier.', 'Hypothèse ou certitude ?', 'Pour 5 signaux, trouvez 3 interprétations, puis la phrase qui permet de vérifier.'],
      ['Sa synthèse est incomplète.', 'Un élément oublié, une solution ajoutée, aucune question pour valider.', 'La synthèse en relais', 'Sur un échange lu, chacun ajoute un élément ; le dernier pose la question de validation.'],
      ['Il confond écouter et interroger.', 'Il juge « bonne écoute » une rafale de questions.', 'Deux façons de répondre', 'Rejouez une réplique en rafale de questions, puis en reformulation suivie d’une question ; comparez le ressenti.'],
      ['Son oral sonne récité.', 'Débit rapide, ton monocorde, pas de pauses, alors que l’écrit est juste.', 'Jeu de rôle en trio (45 min)', '3 rotations de 10 min avec les fiches client de la dernière série, un observateur avec la grille, puis 10 min de bilan.']
    ],
    differentiate: [
      ['Apprenants en difficulté. ', 'Refaire « Les attitudes d’écoute » et « Reformuler » avant la dernière série ; chaque exercice se recommence à volonté.'],
      ['Apprenants à l’aise. ', 'La synthèse, en particulier l’option 1, dossier B, la plus subtile.'],
      ['Handicap ou impossibilité de s’enregistrer. ', 'Réponse écrite à la place de l’audio, transcription des supports audio, temps majoré, en lien avec votre référent handicap.']
    ]
  },

  '1-2-2': {
    code: 'M1.2.2',
    kicker: 'MODULE M1.2 · DÉCOUVERTE CLIENT',
    title: 'Questionner pour identifier les besoins et les motivations d’achat',
    intro: INTRO,
    brief: [
      ['Public', 'Apprenants des certifications commerciales de niveaux 5 et 6, souvent en alternance. Le module se transpose à l’immobilier et aux petites entreprises.'],
      ['Objectif', 'Préparer un guide de questions, questionner en entonnoir, relancer, distinguer le besoin exprimé du besoin réel, repérer les motivations d’achat dans les mots du client et hiérarchiser ses besoins.'],
      ['Format', '2 h 30, 100 % à distance : un module interactif (SCORM) et quatre séries d’exercices en ligne, soit 7 exercices. Trois activités facultatives pour aller plus loin (45 à 60 min).'],
      ['Place', 'Après M1.2.1 (l’écoute), avant M1.2.3 (l’entretien complet). En parcours intégré, prépare l’argumentation (M1.1.2).'],
      ['Prérequis', 'M1.2.1. Être à l’aise à l’écrit.']
    ],
    steps: [
      ['Mon point de départ', 'grille d’auto-positionnement', '5 min', 'Aucune'],
      ['Détecter les besoins et motivations d’achat', 'module interactif (SCORM)', '10 min', 'Automatique'],
      ['Poser la bonne question', 'Quel type de question ? · Les étages de l’entonnoir', '20 min', 'Automatique et corrigé'],
      ['Le besoin réel', 'Du besoin exprimé au besoin réel', '25 min', 'Score estimatif et réponse possible'],
      ['Les motivations d’achat', 'Les mots qui trahissent les motivations · Retour chez les Benali', '25 min', 'Score estimatif et corrigé'],
      ['Préparer et mener la découverte', 'Le guide qui fait parler · Votre guide, votre découverte', '70 min', 'Score estimatif et corrigé ; dépôt sur demande'],
      ['Pour aller plus loin (facultatif)', 'L’entretien dont vous êtes le héros · Le coach · Ma banque de questions terrain', '45 à 60 min', 'Bilan et grille en ligne ; dépôt sur demande'],
      ['Mon point d’arrivée', 'grille et « Ma progression »', '10 min', 'Lecture par vous']
    ],
    matrix: {
      cols: [['2', 'Module'], ['3', 'Questions'], ['4', 'Besoin'], ['5', 'Motivations'], ['6', 'Découverte'], ['7', 'Plus loin']],
      rows: [
        ['Définir les questions à poser', '●', '', '○', '', '●', '●'],
        ['Choisir le type de question selon l’étape', '○', '●', '○', '○', '●', '●'],
        ['Distinguer besoin exprimé et besoin réel', '○', '', '●', '○', '●', '●'],
        ['Identifier les motivations d’achat', '○', '', '', '●', '●', '●'],
        ['Hiérarchiser les besoins', '', '', '', '●', '●', '●']
      ]
    },
    exercisesIntro: 'Sept exercices, en quatre séries, et trois activités pour aller plus loin, entre deux grilles d’auto-positionnement. L’apprenant répond, puis il compare avec le corrigé.',
    exercises: [
      ['Poser la bonne question', '« Quel type de question ? » : classer dix questions (ouverte, fermée, alternative, orientée). « Les étages de l’entonnoir » : ranger des questions du plus large au plus précis.'],
      ['Le besoin réel', '« Du besoin exprimé au besoin réel » : pour cinq clients, formuler une hypothèse sur le besoin caché, puis la question ouverte qui la vérifie.'],
      ['Les motivations d’achat', '« Les mots qui trahissent » : nommer la motivation de huit phrases et le mot qui la révèle. « Retour chez les Benali » : repérer, hiérarchiser, poser la question suivante.'],
      ['Préparer et mener la découverte', '« Le guide qui fait parler » : comparer deux guides, réécrire trois questions. « Votre guide, votre découverte » : écrire son guide, le mener face à un client virtuel, analyser ses questions.'],
      ['Pour aller plus loin', '« L’entretien dont vous êtes le héros » (concession automobile), « Le coach » (analyser l’entretien d’un vendeur), « Ma banque de questions terrain » (pour son métier).']
    ],
    certs: [
      [GROUPES.commerce, '« Quel type de question ? » (literie) · « Du besoin exprimé au besoin réel » (vélos, opticien) · M. Garnier · les trois activités pour aller plus loin.'],
      [GROUPES.b2b, '« Le guide qui fait parler » · Mme Lefort (garage) · « Du besoin exprimé… » (logiciel de planning, intérim) · « Le coach », dossier B.'],
      [GROUPES.pme, '« Du besoin exprimé au besoin réel » (entreprise de nettoyage) · Mme Lefort · « Ma banque de questions terrain ».'],
      [GROUPES.immo, '« Du besoin exprimé au besoin réel » (quatre-pièces) · « Retour chez les Benali » · Mme Duval (mandat de vente).']
    ],
    online: [
      EN_LIGNE,
      NAVIGATEUR,
      ['Le client virtuel. ', 'Dans « Votre guide, votre découverte », il ne livre qu’une réponse par thème choisi : impossible de lire sa fiche d’avance.'],
      ['Temps de suivi. ', 'Environ 10 à 15 min par découverte, 15 min par activité pour aller plus loin, 3 min pour les grilles.'],
      ['À votre main. ', 'La découverte (client virtuel, binôme en différé ou trio en direct), le retour (vous, un pair ou les deux), l’usage des activités pour aller plus loin et le rythme.']
    ],
    watch: [
      ['Le module interactif', 'Il porte sur les questions à poser, pas sur leurs types ni sur les motivations. Vérifiez votre version ; les rappels des exercices peuvent suffire.'],
      ['Les motivations d’achat', 'Le module emploie SONCASE (7 motivations), qui diffère du SONCAS de M1.1.2 : signalez l’écart en parcours intégré. Exigez le mot du client qui justifie chaque motivation.'],
      ['Le besoin deviné', 'Une hypothèse présentée comme une certitude, ou soufflée par une question orientée. Le critère « hypothèse vérifiée, pas supposée » sert de fil rouge.'],
      ['Frontière avec M1.2.3', 'La hiérarchie des besoins reste provisoire ici ; sa validation dans un entretien complet se travaille dans M1.2.3.']
    ],
    errors: [
      ['Il enchaîne les questions fermées.', 'Ses guides sont faits de « oui / non » ; sa découverte n’apprend presque rien.', 'Ouvre-la !', 'Par deux, transformez dix questions fermées en questions ouvertes, puis testez les deux versions à voix haute.'],
      ['Il souffle la réponse.', '« Vous voulez sûrement… », « … n’est-ce pas ? » : la question est orientée.', 'La chasse aux réponses soufflées', 'Sur un extrait de découverte, repérez chaque question orientée et réécrivez-la sans hypothèse.'],
      ['Il prend l’entonnoir à l’envers.', 'Il demande la couleur, la taille ou le budget avant d’avoir compris la situation.', 'L’entonnoir en cartes', 'Rangez une douzaine de questions par étage ; débattez des cas limites (le budget, la décision).'],
      ['Il affirme le besoin caché sans le vérifier.', '« Il a peur de tomber en panne », écrit comme une certitude.', 'Hypothèse, question, réponse', 'Pour trois phrases de clients, formulez une hypothèse puis la question ouverte qui la vérifie ; le « client » peut démentir.'],
      ['Il nomme la motivation « au feeling ».', 'Aucun mot du client ne vient appuyer la motivation choisie.', 'Les mots qui trahissent', 'Sur des phrases de clients recueillies en entreprise, entourez le mot indice avant de nommer la motivation.'],
      ['Son questionnement reste figé.', 'Un guide bien construit, mais ni relance ni adaptation aux réponses du client.', 'Découverte en trio (45 min)', '3 rotations de 10 min avec les fiches client de la série « découverte », un observateur avec la grille, puis 10 min de bilan.']
    ],
    differentiate: [
      ['Apprenants en difficulté. ', 'Refaire « Poser la bonne question » et « Le besoin réel » avant la découverte, puis partir de l’exemple de guide du corrigé.'],
      ['Apprenants à l’aise. ', 'Une deuxième découverte avec un autre client, puis « Le coach », dossier B, le plus subtil.'],
      ['Handicap. ', 'Fiche client en document accessible, temps majoré, en lien avec votre référent handicap.']
    ]
  }
};

Object.values(module.exports).forEach(f => Object.assign(f, { retours: RETOURS, certNote: CERT_NOTE, errorsIntro: ERREURS_INTRO }));
