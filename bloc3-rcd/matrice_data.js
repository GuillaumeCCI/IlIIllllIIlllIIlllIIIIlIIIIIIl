// Matrice compétences / critères -> chapitres du parcours (source unique, utilisée par les deux pages)
// Poids : "E" = essentiel (traite directement le critère), "C" = complémentaire (appui, exemple, activité)

const COMPETENCES = [
  { bloc: "1. Recrutement des salariés permanents et intérimaires", items: [
    { id: "1.1", label: "Anticiper les besoins en personnel (quantitatif et qualitatif)", criteres: {
      a: "Besoins quantitatifs évalués et anticipés selon la saisonnalité et les objectifs",
      b: "Besoins en compétences émergents (digitalisation, multicanal) identifiés" } },
    { id: "1.2", label: "Réaliser les actions de recrutement : identification et sélection des candidats", criteres: {
      a: "Fiche de poste claire, concise et fidèle",
      b: "Profil en adéquation avec le poste et les compétences attendues",
      c: "Choix du sourcing justifié (contexte, criticité)",
      d: "Sourcing et critères exempts de discrimination",
      e: "Dispositions d'équité pour les personnes en situation de handicap",
      f: "Sélection argumentée sur critères objectifs" } },
    { id: "1.3", label: "Intégrer les nouveaux salariés dans l'unité de vente", criteres: {
      a: "Étapes d'intégration identifiées et répertoriées",
      b: "Étapes planifiées et mise en œuvre vérifiable",
      c: "Spécificités liées au handicap anticipées (dispositions adaptées)" } },
  ]},
  { bloc: "2. Organisation du travail et plannings", items: [
    { id: "2.1", label: "Organiser le travail de l'équipe : tâches, missions, objectifs et plannings", criteres: {
      a: "Plannings établis selon les besoins de l'activité",
      b: "Plannings conformes à la législation et aux accords d'entreprise",
      c: "Rôles, missions et tâches clairement définis",
      d: "Répartition du travail couvrant tous les besoins" } },
    { id: "2.2", label: "Établir les règles de sécurité et d'éco-responsabilité", criteres: {
      a: "Sécurité des collaborateurs conforme à la réglementation",
      b: "Pratiques respectueuses de l'environnement intégrées" } },
    { id: "2.3", label: "Aménager les postes pour les salariés en situation de handicap", criteres: {
      a: "Besoins spécifiques identifiés et définis",
      b: "Aménagements répertoriés et faisabilité évaluée",
      c: "Dispositions d'accessibilité et d'autonomie déterminées" } },
  ]},
  { bloc: "3. Encadrement et animation de l'équipe de vente", items: [
    { id: "3.1", label: "Développer une posture managériale adaptée", criteres: {
      a: "Management et communication adaptés à l'équipe et à la culture d'entreprise",
      b: "Clarté et dynamisme favorisant adhésion et motivation",
      c: "Réunions où chacun s'exprime et fait le point",
      d: "Résolution des difficultés par l'intelligence collective" } },
    { id: "3.2", label: "Former les collaborateurs à la vente et à la relation client multicanale", criteres: {
      a: "Techniques de vente multicanal exposées avec clarté",
      b: "Bonnes pratiques relation client de l'entreprise transmises" } },
    { id: "3.3", label: "Gérer les litiges et conflits interpersonnels", criteres: {
      a: "Nature, origine et criticité du différend analysées",
      b: "Modalités de résolution amiable explorées",
      c: "Posture de médiateur désamorçant le conflit" } },
    { id: "3.4", label: "Réaliser les entretiens annuels d'évaluation", criteres: {
      a: "Points forts et marges de progrès identifiés",
      b: "Bien-être, motivations et objectifs vérifiés",
      c: "Solutions d'évolution conciliant salarié et entreprise",
      d: "Conseils personnalisés pour améliorer les pratiques" } },
  ]},
];

// Chapitres dans l'ordre du cours. liens : { "critère": "E"|"C" }  ; note = remarque interne
const MODULES = [
  { titre: "M1 : Recruter et intégrer des collaborateurs", quiz: "Quiz de validation pour l'obtention du badge 1", chapitres: [
    { t: "Les règles incontournables pour recruter en toute légalité", liens: { "1.2d": "E", "1.2e": "C" } },
    { t: "Anticiper vos besoins RH et recruter au bon moment", liens: { "1.1a": "E", "1.1b": "C" } },
    { t: "Évaluer les besoins en compétences émergentes", liens: { "1.1b": "E" } },
    { t: "La fiche de poste, un levier puissant de recrutement", liens: { "1.2a": "E" } },
    { t: "Un exemple de fiche de poste", liens: { "1.2a": "C" } },
    { t: "Mieux recruter grâce à une fiche de poste structurée", liens: { "1.2a": "E", "1.2b": "C", "1.2f": "C" } },
    { t: "Choisir les bons canaux et filtrer efficacement les candidatures", liens: { "1.2b": "E" },
      note: "La description porte sur la définition du profil, pas sur les canaux." },
    { t: "Comment rédiger une annonce d'emploi ?", liens: { "1.2c": "E" },
      note: "La description porte sur les canaux de diffusion et le sourcing, pas sur la rédaction." },
    { t: "Activité : Comment rédiger une annonce ?", liens: { "1.2c": "C", "1.2d": "C" } },
    { t: "Mettre en place une présélection efficace pour identifier les bons profils", liens: { "1.2f": "E" } },
    { t: "Activité : Comment analyser un CV ?", liens: { "1.2f": "C" } },
    { t: "Mener l'entretien avec les bonnes questions pour repérer les talents", liens: { "1.2f": "E", "1.2d": "C" } },
    { t: "Conduire un entretien structuré et instaurer la confiance", liens: { "1.2f": "E", "1.2d": "C" } },
    { t: "Activité : Adopter les bons réflexes en entretien", liens: { "1.2f": "C" } },
    { t: "Offrir à un nouvel arrivant une intégration réussie", liens: { "1.3a": "E", "1.3b": "E" } },
    { t: "Exemple de livret d'accueil", liens: { "1.3a": "C" } },
    { t: "Préparer une intégration inclusive et adaptée dès l'embauche", liens: { "1.3c": "E", "1.3a": "C", "1.3b": "C", "1.2e": "C" },
      note: "Le titre annonce « inclusive » mais la description ne mentionne pas le handicap." },
  ]},
  { titre: "M2 : Organiser le travail et le planning de l'équipe", quiz: "Quiz de validation pour l'obtention du badge 2", chapitres: [
    { t: "Planifier efficacement le travail d'une équipe", liens: { "2.1c": "E" },
      note: "Description identique à « Gérer efficacement une équipe »." },
    { t: "Organiser l'activité avec un planning adapté", liens: { "2.1a": "E" } },
    { t: "Planifier l'activité dans le respect du cadre réglementaire", liens: { "2.1b": "E" } },
    { t: "La gestion du planning de présence et des congés chez Ange", liens: { "2.1b": "C", "2.1a": "C" } },
    { t: "Activité : Organiser un planning", liens: { "2.1a": "C", "2.1b": "C" } },
    { t: "Gérer efficacement une équipe", liens: { "2.1c": "C" } },
    { t: "Composer une équipe cohérente pour atteindre ses objectifs", liens: { "2.1c": "E", "2.1d": "E" } },
    { t: "Comment répartir les tâches ?", liens: { "2.1d": "E" } },
    { t: "Préparer efficacement une délégation de missions", liens: { "2.1c": "C", "2.1d": "C" } },
    { t: "Fixer des objectifs SMARTER", liens: { "2.1c": "C" } },
    { t: "Quels objectifs choisir ?", liens: { "2.1c": "C" } },
    { t: "Relier les objectifs commerciaux aux missions du quotidien", liens: { "2.1a": "E", "2.1d": "E" } },
    { t: "Appliquer les règles de sécurité pour protéger les équipes au quotidien", liens: { "2.2a": "E" } },
    { t: "Intégrer des principes éco-responsables dans les consignes et procédures de travail", liens: { "2.2b": "E" } },
    { t: "Comprendre le handicap au travail et mobiliser les bons leviers", liens: { "2.3a": "E", "2.3b": "E", "2.3c": "E", "1.2e": "E", "1.3c": "C" } },
    { t: "Activité : Organiser l'activité d'une personne en situation de handicap", liens: { "2.3b": "C", "2.3c": "C", "1.3c": "C" } },
  ]},
  { titre: "M3 : Animer et manager son équipe", quiz: "Quiz de validation pour l'obtention du badge 3", chapitres: [
    { t: "Comprendre les styles de management", liens: { "3.1a": "E" } },
    { t: "Adopter le bon style de management au bon moment", liens: { "3.1a": "E" } },
    { t: "Installer des rituels qui font avancer l'équipe", liens: { "3.1c": "E", "3.1d": "C" } },
    { t: "Activité : Animer des réunions utiles et engageantes", liens: { "3.1c": "E", "3.1d": "C" } },
    { t: "Adapter sa communication selon la situation", liens: { "3.1b": "E", "3.1a": "C" } },
    { t: "Donner des feedbacks qui motivent", liens: { "3.1b": "E", "3.4a": "C" } },
    { t: "Maîtriser les techniques de vente multicanal", liens: { "3.2a": "E" } },
    { t: "Créer une relation client de qualité sur chaque canal", liens: { "3.2b": "E" } },
    { t: "Observer pour faire progresser les pratiques commerciales", liens: { "3.2a": "C", "3.2b": "C" } },
    { t: "Exemple de grille d'observation commerciale", liens: { "3.2a": "C" } },
    { t: "Formuler un feedback d'amélioration", liens: { "3.4d": "E", "3.2a": "C" } },
    { t: "Formuler des critiques utiles et constructives", liens: { "3.3b": "C" } },
    { t: "Recadrer avec justesse et professionnalisme", liens: { "3.3b": "C" } },
    { t: "Prévenir et résoudre les tensions dans l'équipe", liens: { "3.3a": "E", "3.3b": "E", "3.3c": "E" } },
    { t: "Faire de l'entretien professionnel un levier de développement", liens: { "3.4c": "E", "3.4b": "C" } },
    { t: "L'entretien d'évaluation & le développement des collaborateurs", liens: { "3.4a": "E", "3.4c": "E", "3.4d": "C" } },
    { t: "La grille d'entretien annuel chez Ange", liens: { "3.4a": "C", "3.4b": "C" } },
  ]},
];
