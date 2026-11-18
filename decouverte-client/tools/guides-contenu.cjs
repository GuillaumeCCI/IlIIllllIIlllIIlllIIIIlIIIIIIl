/* LES FICHES D'ACCOMPAGNEMENT PÉDAGOGIQUE (M1.2.1 et M1.2.2), mises à jour
 * d'après les exercices en ligne (novembre 2026).
 *
 * Source unique de deux productions :
 *   - les pages « Guide formateur » du site (tools/build-guides.cjs) ;
 *   - les documents Word mis à jour (mêmes textes, posés dans les fiches
 *     d'origine par Word, case par case).
 * La structure suit les fiches d'origine : 7 rubriques, mêmes tableaux.
 * Les codes A1 à A5 restent ceux des fiches (et du SCORM) ; chaque étape
 * renvoie aussi aux exercices du site (`links`, et « en ligne 2.1 à 2.3 »).
 */
'use strict';

const LEAD = 'Guide de prise en main · module asynchrone, exercices interactifs en ligne · des repères et des suggestions, pas des consignes : adaptez librement. Mise à jour de novembre 2026, d’après les exercices du site.';

const CERTS = [
  ['BTS Management commercial opérationnel', 'RNCP38362'],
  ['Gestionnaire d’unité commerciale', 'RNCP36141'],
  ['Responsable de commerces et de la distribution', 'RNCP40675'],
  ['BTS Négociation et digitalisation de la relation client', 'RNCP38368'],
  ['Attaché commercial', 'RNCP39743'],
  ['Responsable de développement commercial', 'RNCP40568'],
  ['BTS Gestion de la PME', 'RNCP38363'],
  ['BTS Professions immobilières', 'RNCP38380'],
  ['Responsable de transactions et de gestion de biens immobiliers', 'RNCP42523']
];
const ALIGN = 'Alignement aux référentiels : synthèse de travail, à vérifier dans les référentiels officiels en vigueur avant toute formalisation certificative.';
const S6_INTRO = 'Difficultés que les activités devraient faire apparaître, et idées d’animation (10 à 45 min) en présentiel ou en classe virtuelle, si vous le souhaitez.';
const ONLINE_ROWS = [
  ['Mise en ligne', 'Page « Intégrer » du site : un lien ou un code d’intégration par série, à coller dans une activité « URL » ou un bloc HTML de votre plateforme. Chaque série garde sa navigation.'],
  ['Suivi des réponses', 'Les réponses restent dans le navigateur de l’apprenant : rien ne remonte automatiquement dans votre plateforme. Pour lire une production, demandez un dépôt (audio, texte copié, capture d’écran).']
];

module.exports = {
  '1-2-1': {
    code: '1-2-1',
    header: 'FICHE D’ACCOMPAGNEMENT PÉDAGOGIQUE · Module M1.2 · Découverte client',
    title: 'M1.2.1 Pratiquer l’écoute active et s’adapter au client',
    lead: LEAD,
    brief: [
      ['Pour qui', 'Apprenants des certifications commerciales (niveaux 5 et 6), souvent en alternance ; contextualisable pour l’immobilier.'],
      ['Ce que l’apprenant saura faire', 'Adopter une posture d’écoute active, reconnaître les attitudes d’écoute qui favorisent la relation, reformuler (écho, reflet, synthèse) et adapter son comportement aux signaux verbaux et non verbaux du client.'],
      ['Durée et modalité', '2 h, 100 % asynchrone à distance : SCORM (15 min) + 5 activités en ligne (1 h 45), soit 13 exercices interactifs. Synthèse optionnelle : 45 à 60 min, sur document. Version hybride possible (point 6).'],
      ['Ce que vous recevez', 'Les exercices interactifs en ligne (L’Atelier Vente · Découverte client, module 1-2-1 : grilles Début et Fin, activités A1 à A5, corrigés intégrés) · la fiche d’activités (A1 à A5, grille d’auto-positionnement, corrigés) · l’activité de synthèse optionnelle (3 options, sur document) · cette fiche. SCORM « Comprendre et s’adapter au client » à récupérer dans le catalogue CCI France.'],
      ['Place dans le parcours', 'Ouvre M1.2 (Découverte client), avant M1.2.2 (questionnement) et M1.2.3 (entretien complet) ; en parcours intégré, suit M1.1.1.']
    ],
    // Le lien avec le module, par groupe de certifications (lignes 1, 4, 7 et 8 ; les autres sont fusionnées).
    certLinks: [
      [0, 3, 'Direct. A1 situation 1 (2.1 Au magasin) · A5 fiche 1 (5.2, M. Garnier, literie) · synthèse option 1 dossier A (cuisiniste), option 2, option 3 en magasin.'],
      [3, 6, 'Direct (noyau commercial). A1 situation 2 (2.2 En entreprise) · A4 (5.1) · A5 fiche 2 (5.2, Mme Lefort, garage) · synthèse option 1 dossier B (visioconférence entre entreprises).'],
      [6, 7, 'Plus ciblé : soutien commercial. A2 exercice 3 (3.3, petite entreprise cliente) · A5 fiche 2 (5.2) · synthèse option 3.'],
      [7, 9, 'Contextualisation immobilier. A1 situation 3 (2.3 À l’agence immobilière) · A2 exercice 2 (3.2) · A3 (série 4, rendez-vous en agence) · A5 fiche 3 (5.2, Mme Duval, mandat de vente).']
    ],
    align: ALIGN,
    certs: CERTS,
    prereq: 'Prérequis et profil des apprenants : aucun prérequis ; le module convient aux débutants en relation client comme aux alternants en poste. Il suppose une aisance minimale à l’écrit et la possibilité de s’enregistrer (A5 : l’enregistrement se fait dans la page 5.2, avec un micro). Les apprenants en entreprise tireront davantage parti de l’option 3 de la synthèse.',
    steps: [
      ['Grille d’auto-positionnement (Début) · en ligne 1.1', '—', '5 min', 'Aucune', 'Dans le navigateur', ['s1-1-1']],
      ['SCORM « Comprendre et s’adapter au client »', 'Se souvenir / Comprendre', '15 min', 'Automatique', 'Non', []],
      ['A1 — Qui parle comme ça ? · en ligne 2.1 à 2.3', 'Se souvenir / Comprendre', '15 min', 'Automatique + corrigé', 'Non', ['s2-2-1', 's2-2-2', 's2-2-3']],
      ['A2 — À vous de reformuler · en ligne 3.1 à 3.4', 'Appliquer', '20 min', 'Score estimatif + réponse possible (3.1 à 3.3) ; automatique (3.4)', 'Non', ['s3-3-1', 's3-3-2', 's3-3-3', 's3-3-4']],
      ['A3 — Rendez-vous en agence · en ligne 4.1 à 4.4', 'Analyser', '25 min', 'Automatique (4.1) ; score estimatif + corrigé (4.2 à 4.4)', 'Non', ['s4-4-1', 's4-4-2', 's4-4-3', 's4-4-4']],
      ['A4 — Trois commerciaux, une cliente pressée · en ligne 5.1', 'Évaluer', '15 min', 'Score estimatif + corrigé', 'Non', ['s5-5-1']],
      ['A5 — Votre réponse, votre voix · en ligne 5.2', 'Créer', '30 min', 'Score estimatif en ligne, puis formateur ou pair', 'Oui (audio téléchargé + texte copié)', ['s5-5-2']],
      ['Activité de synthèse (optionnelle, 3 options) · sur document', 'Analyser à Créer', '45-60 min', 'Formateur ou pair', 'Oui', []],
      ['Grille (Fin) + « Ma progression » · en ligne 9.1', '—', '10 min', 'Lecture formateur', 'Dans le navigateur', ['s9-9-1']]
    ],
    objectives: {
      cols: ['SCORM', 'A1', 'A2', 'A3', 'A4', 'A5', 'Synthèse'],
      rows: [
        ['Citer les attitudes d’écoute de Porter', '●', '●', '', '●', '', '', '○'],
        ['Appliquer l’attitude de compréhension', '●', '●', '', '●', '●', '●', '●'],
        ['Pratiquer la reformulation (écho, reflet, synthèse)', '', '', '●', '○', '●', '●', '●'],
        ['Adapter sa posture aux signaux verbaux et non verbaux', '', '', '', '●', '●', '●', '●']
      ]
    },
    choices: [
      'Le SCORM est un point de départ : il couvre les deux premiers objectifs (exemples d’après-vente) ; les activités portent le reste.',
      'Le jeu de rôle en trio prévu est réparti en asynchrone : observateur en A3 et A4, vendeur en A5 (version synchrone au point 6).',
      'Des contextes variés (commerce, entre entreprises, immobilier, petite entreprise) et des corrigés donnés comme exemples.'
    ],
    platform: [
      ['Grille d’auto-positionnement', 'En ligne (1.1 et 9.1) : la colonne Début est reprise automatiquement à la fin, puis comparée (« Ma progression »), à condition d’utiliser le même navigateur.'],
      ['Corrigés A1 à A4', 'En ligne, le corrigé s’affiche après validation : on apprend en comparant. Les choix sont corrigés automatiquement ; les réponses rédigées reçoivent un score estimatif, les mots repérés et une réponse possible.'],
      ['A5 et activité de synthèse', 'A5 (5.2) : l’apprenant s’enregistre dans la page, télécharge son audio et copie ses réponses écrites pour les déposer (le ton s’entend, le texte se corrige). Synthèse : sur document, un dépôt par option, corrigé après dépôt ; option 2 dans un outil à embranchements (Storyline, Genially, H5P Branching Scenario).'],
      ...ONLINE_ROWS
    ],
    followUp: 'Temps de suivi par apprenant : retour sur A5 ≈ 10 min · retour sur une synthèse ≈ 15 min · lecture des grilles Début et Fin ≈ 3 min.',
    yourChoices: 'Ce qui relève de vos choix : le rythme (une ou deux semaines), le retour sur les dépôts (formateur, pair ou les deux), l’usage de la synthèse (pour tous, pour les plus à l’aise ou en évaluation formative) et un éventuel temps synchrone.',
    watch: [
      ['Intitulés du SCORM', '6 attitudes de Porter et 3 reformulations (écho, reflet, synthèse) sont utilisées. → Vérifier la concordance avec la version du SCORM que vous diffusez.'],
      ['Auto-positionnement', 'Les apprenants se surestiment souvent au départ : une colonne Fin plus basse montre qu’ils perçoivent mieux l’exigence. → Le leur dire en clôture.'],
      ['Lecture du non verbal', 'Risque d’une grille de lecture figée (« bras croisés = fermé »). → Répéter qu’un signal est une hypothèse à vérifier.'],
      ['Frontière avec M1.2.2', 'Écouter et questionner sont parfois confondus. → Le questionnement structuré relève de M1.2.2.'],
      ['Audio de A5 et option 3', 'S’enregistrer peut freiner (gêne, matériel, micro refusé par le navigateur, handicap) ; l’option 3 suppose une entreprise. → Accepter ponctuellement l’écrit ; orienter les apprenants hors alternance vers les options 1 ou 2.']
    ],
    classIntro: S6_INTRO,
    difficulties: [
      ['1. La reformulation qui glisse vers l’argumentation · A2, A5, synthèse', 'Un produit, un prix ou un avantage s’invite (« …donc je vous conseille… »).', '« Écoute ou vente ? » Classer 8 répliques en reformulation ou argument, puis réécrire les arguments en reformulations.'],
      ['2. Le reflet qui interprète · A2 (exercice 2, en ligne 3.2), A5', 'L’apprenant prête au client une intention qu’il n’a pas exprimée.', '« Je n’ai jamais dit ça. » Le « client » répond ainsi à chaque reflet qui interprète ; le groupe retravaille la formulation.'],
      ['3. Le non verbal pris pour une certitude · A3 (question 2, en ligne 4.2), option 1', 'Des conclusions affirmatives (« il est fermé », « il ment ») sans vérification.', '« Hypothèse ou certitude ? » Pour 5 signaux, trouver 3 interprétations, puis la phrase qui permet de vérifier.'],
      ['4. La synthèse incomplète ou non validée · A2 (exercice 3, en ligne 3.3), A5, option 2', 'Un élément oublié, une solution ajoutée, ou pas de question de validation finale.', 'Synthèse en relais. Sur un échange lu, chacun ajoute un élément ; le dernier formule la question de validation.'],
      ['5. L’écoute confondue avec l’interrogatoire · A1 (série 2), A3 (série 4)', 'L’enquête est jugée « bonne écoute » ; les questions s’enchaînent.', 'Deux façons de répondre. Rejouer la deuxième réplique de l’entretien de A3 en rafale de questions, puis en reformulation suivie d’une question ; comparer le ressenti.'],
      ['6. Un oral récité · A5 (audio, en ligne 5.2)', 'Débit rapide, ton monocorde, absence de pauses, alors que l’écrit est correct.', 'Jeu de rôle en trio (45 min), version complète de l’activité socle : 5 min de consignes, 3 rotations de 8 à 10 min avec les fiches client de A5 (observateur avec la grille A5), 10 min de débriefing.']
    ],
    differentiate: [
      'Apprenants en difficulté : refaire A1 puis A2 (séries 2 et 3 en ligne) avant A5 ; chaque exercice se recommence à volonté.',
      'Apprenants à l’aise : activité de synthèse, en particulier l’option 1 dossier B, la plus subtile.',
      'Situation de handicap : transcription écrite des supports audio, alternative écrite à l’enregistrement de A5, durée majorée, en lien avec votre référent handicap. En ligne : taille du texte réglable, aide au clavier, plein écran.'
    ],
    feedback: 'Vos retours. Une activité trop longue, un contexte peu adapté, une difficulté que nous n’avions pas anticipée : vos observations nous aideront à faire évoluer le module pour tout le réseau. Contact : [1001parcours@ccifrance.fr].'
  },

  '1-2-2': {
    code: '1-2-2',
    header: 'FICHE D’ACCOMPAGNEMENT PÉDAGOGIQUE · Module M1.2 · Découverte client · M1.2.2',
    title: 'M1.2.2 Questionner pour identifier les besoins et les motivations d’achat',
    lead: LEAD,
    brief: [
      ['Pour qui', 'Certifications commerciales (niveaux 5 et 6), souvent en alternance ; contextualisable pour l’immobilier et la PME.'],
      ['Ce que l’apprenant saura faire', 'Préparer un guide de questionnement, questionner selon l’entonnoir, relancer, distinguer besoin explicite et implicite, repérer les motivations d’achat dans les mots du client et hiérarchiser ses besoins.'],
      ['Durée et modalité', '2 h 30, 100 % asynchrone : SCORM (≈ 10 min) + 5 activités en ligne (2 h 20), soit 7 exercices interactifs. En ligne, la découverte simulée de A5 se fait face à un client virtuel (une réponse par thème choisi). Synthèse optionnelle, en ligne elle aussi : 45 à 60 min, hors enveloppe.'],
      ['Ce que vous recevez', 'Les exercices interactifs en ligne (L’Atelier Vente · Découverte client, module 1-2-2 : grilles Début et Fin, activités A1 à A5, les 3 options de la synthèse, corrigés intégrés) · la fiche d’activités (grille d’auto-positionnement, A1 à A5, corrigés) · l’activité de synthèse optionnelle (3 options) · cette fiche. SCORM « Détecter les besoins et motivations d’achat » à récupérer dans le catalogue CCI France.'],
      ['Place dans le parcours', 'Après M1.2.1 (écoute active), avant M1.2.3 (entretien complet) ; en parcours intégré, prépare l’argumentation (M1.1.2).']
    ],
    certLinks: [
      [0, 3, 'Direct. A1 (2.1, M. Garnier, literie) · A2 (3.1, vélos électriques, opticien) · A5 fiche 1 (5.2) · synthèse option 1 dossier A (6.2, cuisiniste), option 2 (6.1, concession automobile), option 3 (6.3).'],
      [3, 6, 'Direct (noyau commercial). A4 (5.1) et A5 fiche 2 (5.2, Mme Lefort, garage) · A2 (3.1, logiciel de planning, emploi temporaire) · synthèse option 1 dossier B (6.2, visioconférence entre entreprises).'],
      [6, 7, 'Plus ciblé : soutien commercial. A2 (3.1, gérant d’une entreprise de nettoyage, emploi temporaire) · A5 fiche 2 (5.2) · synthèse option 3 (6.3).'],
      [7, 9, 'Contextualisation immobilier. A2 (3.1, quatre-pièces) · A3 exercice 2 (4.2, les Benali) · A5 fiche 3 (5.2, Mme Duval, mandat de vente).']
    ],
    align: ALIGN,
    certs: CERTS,
    prereq: 'Prérequis et profil des apprenants : l’écoute active (M1.2.1). Aisance à l’écrit ; pour A5, le client virtuel en ligne, ou un camarade en différé. L’option 3 de la synthèse sert surtout les apprenants en entreprise.',
    steps: [
      ['Grille d’auto-positionnement (Début) · en ligne 1.1', '—', '5 min', 'Aucune', 'Dans le navigateur', ['s1-1-1']],
      ['SCORM « Détecter les besoins et motivations d’achat »', 'Se souvenir / Comprendre', '≈ 10 min', 'Automatique', 'Non', []],
      ['A1 — La bonne question au bon moment · en ligne 2.1 et 2.2', 'Se souvenir / Comprendre', '20 min', 'Automatique + corrigé', 'Non', ['s2-2-1', 's2-2-2']],
      ['A2 — Du besoin exprimé au besoin réel · en ligne 3.1', 'Appliquer', '25 min', 'Score estimatif + réponse possible', 'Non', ['s3-3-1']],
      ['A3 — Les mots qui trahissent les motivations · en ligne 4.1 et 4.2', 'Analyser', '25 min', 'Score estimatif + corrigé', 'Non', ['s4-4-1', 's4-4-2']],
      ['A4 — Le guide qui fait parler · en ligne 5.1', 'Évaluer', '25 min', 'Score estimatif + corrigé', 'Non', ['s5-5-1']],
      ['A5 — Votre guide, votre découverte (activité socle) · en ligne 5.2', 'Créer', '45 min', 'Score estimatif en ligne, puis formateur ou pair', 'Sur demande (texte copié)', ['s5-5-2']],
      ['Activité de synthèse (optionnelle, 3 options) · en ligne 6.1 à 6.3', 'Analyser à Créer', '45-60 min', 'Corrigé et grille en ligne, puis formateur ou pair', 'Sur demande (fiche copiée)', ['s6-6-1', 's6-6-2', 's6-6-3']],
      ['Grille (Fin) + « Ma progression » · en ligne 9.1', '—', '10 min', 'Lecture formateur', 'Dans le navigateur', ['s9-9-1']]
    ],
    objectives: {
      cols: ['SCORM', 'A1', 'A2', 'A3', 'A4', 'A5', 'Synthèse'],
      rows: [
        ['Définir les questions à poser', '●', '', '○', '', '●', '●', '●'],
        ['Choisir le type de question selon l’étape', '○', '●', '○', '○', '●', '●', '●'],
        ['Distinguer besoin explicite et implicite', '○', '', '●', '○', '○', '●', '●'],
        ['Identifier les motivations d’achat', '○', '', '', '●', '○', '●', '●'],
        ['Hiérarchiser les besoins pour l’argumentation', '', '', '', '●', '', '●', '●']
      ]
    },
    choices: [
      'Le SCORM est un point de départ : il porte sur les questions à poser ; tout le reste est porté par les activités.',
      'L’activité socle en asynchrone (A5) : un guide, une découverte simulée face à un client virtuel (en ligne, une réponse par thème choisi), l’analyse de ses questions.',
      'Des clients déjà écoutés en M1.2.1, une hiérarchie qui reste « provisoire » (M1.2.3) et des corrigés donnés comme exemples.'
    ],
    platform: [
      ['Grille d’auto-positionnement', 'En ligne (1.1 et 9.1) : la colonne Début est reprise automatiquement à la fin, puis comparée (« Ma progression »), à condition d’utiliser le même navigateur.'],
      ['A1 à A4', 'En ligne : A1 (2.1, 2.2) en cartes à classer, corrigées automatiquement ; A2 (3.1), A3 (4.1, 4.2) et A4 (5.1) en réponse rédigée ou notée, avec un score estimatif et un corrigé affichés après la tentative.'],
      ['A5', 'En ligne (5.2) : le client virtuel donne une réponse par thème choisi, ce qui évite la lecture d’avance. Puis l’analyse et la grille A5 ; pour un retour, l’apprenant copie son guide et son analyse dans un dépôt.'],
      ['Synthèse, option 2', 'Déjà réalisée en ligne (6.1) : 7 étapes, une jauge de découverte, un chrono de 30 minutes, plusieurs fins, puis la carte des besoins. Les options 1 (6.2) et 3 (6.3) sont aussi en ligne.'],
      ...ONLINE_ROWS
    ],
    followUp: 'Temps de suivi par apprenant : retour sur A5 ≈ 10 à 15 min · retour sur une synthèse ≈ 15 min · lecture des grilles Début et Fin ≈ 3 min.',
    yourChoices: 'Ce qui relève de vos choix : la découverte de A5 (client virtuel en ligne, binôme en différé, ou trio en classe virtuelle : point 6), le retour sur les productions (formateur, pair ou les deux), l’usage de la synthèse (pour tous, pour les plus à l’aise ou en évaluation formative, l’option 2 s’y prête bien) et le rythme (une ou deux semaines).',
    watch: [
      ['Ce que couvre le SCORM', 'Son objectif porte sur les questions à poser, pas sur les types de questions ni les motivations. → Vérifier votre version ; les rappels de A1 et de A3 peuvent suffire.'],
      ['Motivations d’achat', 'Confusions sécurité / argent ou orgueil / nouveauté ; étiquettes posées sans indice. La méthode SONCASE (7 motivations) diffère du SONCAS de M1.1.2. → Exiger le mot indice (A3, en ligne 4.1) ; en parcours intégré, signaler le lien et l’écart.'],
      ['Besoin implicite deviné', 'Une hypothèse présentée comme une certitude, ou soufflée par une question orientée. → Le critère « Hypothèse vérifiée, pas supposée » de A2 peut servir de fil rouge.'],
      ['Vente déguisée et lecture d’avance', 'Des questions sur le produit dans les guides (« Notre service vous intéresserait ? ») ; une fiche-réponses lue en entier. → A4 (5.1) le montre avec le guide de Yanis ; en ligne, le client virtuel de A5 évite la lecture d’avance ; critère « Découverte réelle » de A5.'],
      ['Frontière avec M1.2.3', 'La hiérarchie produite en A5 et dans la synthèse reste provisoire. → Sa validation dans un entretien complet est travaillée en M1.2.3.']
    ],
    classIntro: S6_INTRO,
    difficulties: [
      ['1. L’interrogatoire de questions fermées · A1, A4, A5 (tableau d’analyse)', 'Des guides faits de questions « oui / non » ; une découverte rapide qui n’apprend presque rien.', '« Ouvre-la ! » Par binômes, transformer dix questions fermées en questions ouvertes, puis tester les deux versions à voix haute et comparer les réponses.'],
      ['2. La question orientée · A1 (2.1), A4 (5.1), synthèse (option 2, en ligne 6.1)', '« Vous voulez sûrement… », « … n’est-ce pas ? » : la réponse est soufflée au client.', 'La chasse aux réponses soufflées. Sur un extrait de découverte, repérer chaque question orientée et la réécrire sans hypothèse.'],
      ['3. L’entonnoir à l’envers · A1 (exercice 2, en ligne 2.2), A4, synthèse (option 1, dossier A, en ligne 6.2)', 'Des questions de précision (couleur, taille, budget) posées avant d’avoir exploré la situation.', 'L’entonnoir en cartes. Ranger une douzaine de questions par étage ; débattre des cas limites (le budget, la décision).'],
      ['4. Le besoin implicite affirmé sans vérification · A2 (3.1), A5 (5.2)', '« Il a peur de tomber en panne » écrit comme une certitude, ou demandé par une question orientée.', 'Hypothèse, question, réponse. Pour trois verbatims, formuler une hypothèse puis la question ouverte qui la vérifie ; le « client » peut démentir.'],
      ['5. La motivation étiquetée sans indice · A3 (exercice 1, en ligne 4.1), A5, synthèse', 'Une motivation attribuée « au feeling », sans mot du client pour l’appuyer.', 'Les mots qui trahissent. Sur des phrases de clients recueillies en entreprise, entourer le mot indice avant de nommer la motivation.'],
      ['6. Un questionnement figé · A5 (5.2)', 'Un guide bien construit, mais ni relance ni adaptation aux réponses du client.', 'Découverte en trio (45 min), version synchrone de l’activité socle : 5 min de consignes, 3 rotations de 10 min avec les fiches-réponses de A5 (observateur avec la grille A5), 10 min de débriefing.']
    ],
    differentiate: [
      'Apprenants en difficulté : refaire A1 puis A2 (séries 2 et 3 en ligne) avant A5, et partir de l’exemple de guide du corrigé de A5 pour construire le sien ; chaque exercice se recommence à volonté.',
      'Apprenants à l’aise : A5 avec une deuxième fiche client ; synthèse, en particulier l’option 1 dossier B (6.2), la plus subtile.',
      'Situation de handicap : fiche-réponses en document accessible, durée majorée, en lien avec votre référent handicap. En ligne : taille du texte réglable, aide au clavier, plein écran.'
    ],
    feedback: 'Vos retours. Une activité trop longue, un contexte peu adapté, une difficulté que nous n’avions pas anticipée : vos observations nous aideront à faire évoluer le module pour tout le réseau. Contact : [à compléter].'
  }
};
