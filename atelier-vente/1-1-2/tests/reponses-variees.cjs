/* Réponses justes, formulées autrement que les réponses possibles : ce
 * qu'un apprenant pourrait écrire, dans des registres et des longueurs
 * variés. L'indicateur doit les reconnaître (indicateur.test.cjs).
 * Une entrée par exercice : une liste de jeux de réponses, champ par champ.
 */
module.exports = {
  // S1 1.3 · L'avantage de chaque besoin : sécurité, accompagnement, budget.
  's1-1.3': [
    { a0: 'Vous sécurisez vos informations clients et limitez les risques de perte.', a1: 'Même sans service informatique, vous êtes accompagné rapidement en cas de difficulté.', a2: 'Vous maîtrisez votre investissement et gardez votre liberté.' },
    { a0: 'Vos données sont protégées, vous dormez tranquille.', a1: 'En cas de souci, quelqu’un vous répond en deux minutes.', a2: 'Vous savez exactement ce que vous payez chaque mois.' },
    { a0: 'Le client ne perd plus jamais ses fichiers, même en cas de panne.', a1: 'Le gérant n’a pas besoin d’informaticien : l’assistance règle ses problèmes.', a2: 'Il peut arrêter quand il veut, sans frais cachés.' },
    { a0: 'Avec ça, plus de risque de vous faire voler vos données !', a1: 'Vous êtes bloqué ? Un coup de fil et c’est réglé, même le dimanche.', a2: 'Pas de surprise sur la facture, et vous restez libre.' },
    { a0: 'Vous travaillez l’esprit tranquille : vos fichiers clients restent confidentiels.', a1: 'Vous n’êtes jamais seul face à un problème technique.', a2: 'Votre budget reste sous contrôle, sans engagement sur la durée.' },
    { a0: 'Vous respectez la loi sur les données personnelles et évitez les amendes.', a1: 'Pas besoin de compétences techniques : notre équipe vous accompagne au quotidien.', a2: 'Vous démarrez petit, pour 19 euros par mois.' },
    { a0: 'Vous retrouvez vos informations même après une panne de votre ordinateur.', a1: 'Vous êtes autonome dès le premier jour, avec une aide disponible sept jours sur sept.', a2: 'Vous dépensez seulement ce dont vous avez besoin et pouvez résilier à tout moment.' },
    { a0: 'Votre entreprise est protégée contre le piratage.', a1: 'Vos salariés trouvent de l’aide tout de suite, sans attendre un technicien.', a2: 'Votre tarif ne bouge pas pendant un an : vous prévoyez vos dépenses sereinement.' },
    { a0: 'Tes données restent à l’abri, quoi qu’il arrive.', a1: 'Tu as une hotline joignable tous les jours.', a2: 'Tu paies un petit abonnement mensuel, sans engagement.' }
  ],

  // S1 1.4 · Justifier les deux arguments, client par client.
  's1-1.4': [
    { why0: 'Le client a déjà été piraté et veut être certain que ses données soient protégées : sa motivation est la sécurité. Le chiffrement et la sauvegarde automatique répondent directement à cette crainte.', why1: 'Il parle d’abord du prix et ne veut pas s’engager, donc sa motivation est l’argent. Le tarif à 19 € par mois et l’abonnement sans engagement le rassurent.' },
    { why0: 'Sa peur d’un nouveau piratage montre qu’il cherche avant tout la sécurité, c’est pourquoi je choisis le chiffrement RGPD et la sauvegarde.', why1: 'Il veut savoir combien ça coûte et garder sa liberté : un petit tarif mensuel et pas d’engagement correspondent à ce qu’il demande.' },
    { why0: 'Ces arguments le protègent contre une nouvelle attaque, car il a déjà été piraté.', why1: 'Il regarde le prix avant tout, donc le tarif accessible et l’absence d’engagement lui parlent.' },
    { why0: 'Motivation S : il évoque un piratage subi. Chiffrer ses données et les sauvegarder réduit le risque que cela se reproduise.', why1: 'Motivation A : il insiste sur le coût et la durée. Avec 19 € par mois sans engagement, il connaît la dépense et peut arrêter quand il veut.' },
    { why0: 'Parce qu’il a été victime de hackers, il a besoin d’être rassuré : ses données seront chiffrées et copiées automatiquement.', why1: 'Comme il fait attention à son budget, je mets en avant un prix bas et la possibilité de résilier à tout moment.' },
    { why0: 'Le dirigeant est méfiant après sa mauvaise expérience. Les deux arguments garantissent la protection de ses informations, ce qui répond à sa crainte.', why1: 'Ce client pense surtout à l’argent : il veut un coût précis et refuse d’être bloqué sur la durée. Les deux arguments lèvent ces deux freins.' },
    { why0: 'Il dit qu’il ne veut pas que ça recommence : le chiffrement empêche le vol de données et la sauvegarde évite de tout perdre.', why1: 'Il dit qu’il regarde d’abord le prix, alors 19 euros par mois lui parle, et sans engagement il ne prend aucun risque.' },
    { why0: 'Ces arguments sont pertinents parce que le client cherche la sécurité : il a été piraté et veut des données parfaitement protégées.', why1: 'Ces arguments sont pertinents parce que le client est motivé par l’argent : il veut maîtriser le coût sans s’engager.' }
  ],

  // S1 1.5 · Pourquoi le chiffrement l'emporte.
  's1-1.5': [
    { why: 'Le client a déjà été piraté : le chiffrement empêche qu’on lise ses données, alors que la sauvegarde ne fait que limiter une perte.' },
    { why: 'Il a peur que le piratage se reproduise, donc l’argument A est prioritaire car il protège directement contre les intrusions.' },
    { why: 'Le chiffrement répond précisément à sa crainte : un nouvel accès non autorisé à ses données.' },
    { why: 'Comme il a vécu une attaque, je mets en premier ce qui bloque les pirates. La sauvegarde serait prioritaire s’il craignait surtout de perdre ses fichiers.' },
    { why: 'Cet argument est prioritaire parce que le chiffrement rend ses données illisibles en cas de piratage, ce qui est exactement ce qu’il redoute.' },
    { why: 'A gagne : le client veut être certain que ses données sont protégées après un piratage, et la conformité RGPD le rassure.' },
    { why: 'Pour quelqu’un qui a déjà été hacké, empêcher le vol des données compte plus que pouvoir les récupérer après coup.' },
    { why: 'Ce dirigeant a subi une intrusion, donc il faut d’abord verrouiller l’accès à ses données. La sauvegarde vient en second.' }
  ],

  // S1 1.6 · Le pire argumentaire, le diagnostic, la réparation.
  's1-1.6': [
    { worst: 'Alors euh, notre CRM est en SaaS multi-tenant avec une API REST et du SSO, je pense que c’est peut-être bien. Il a aussi un mode sombre et un joli logo.',
      error0: 'Le jargon technique est incompréhensible pour le client.', error1: 'Le ton hésitant le fait douter.', error2: 'Les besoins du client sont ignorés : rien sur la sécurité ni le budget.',
      fixed: 'Vos données sont chiffrées et sauvegardées toutes les 10 minutes : vous ne perdez rien. Sans informaticien, vous êtes aidé 7 jours sur 7. Et pour 19 € par mois sans engagement, vous gardez la maîtrise de votre budget.' },
    { worst: 'Notre logiciel a été créé en 2010 par notre fondateur, il possède 200 fonctions, des modules, des options, et il fonctionne sur iOS et Android. C’est forcément le meilleur.',
      error0: 'Hors sujet : l’histoire de l’entreprise n’intéresse pas le client.', error1: 'Catalogue de fonctions sans bénéfice, le client décroche.', error2: 'Affirmation gratuite sans preuve, ce qui nuit à la crédibilité.',
      fixed: 'Pour protéger vos informations clients, RelaCosy les chiffre et respecte le RGPD, avec un audit chaque année. Comme vous n’avez pas de service informatique, notre assistance vous répond en 2 minutes en moyenne. Enfin, à partir de 19 € par mois et sans engagement, votre budget reste maîtrisé.' },
    { worst: 'RelaCosy est bleu et pèse 45 Mo, avec une interface moderne. Franchement c’est le top, croyez-moi, il y a plein de fonctions.',
      error0: 'Il parle de détails inutiles.', error1: 'Il n’y a aucune preuve.', error2: 'Il oublie complètement les trois besoins exprimés, le client ne se sent pas écouté.',
      fixed: 'Vous gardez vos données à l’abri grâce à une sauvegarde automatique conforme au RGPD. Vous êtes accompagné tous les jours par notre assistance, sans technicien chez vous. Vous payez un abonnement mensuel, résiliable quand vous voulez : 5 000 PME l’ont déjà adopté.' },
    { worst: 'Notre solution cloud scalable intègre un backend sécurisé, une BI, un ERP et des webhooks. On a aussi des animations et une mascotte. Je crois que ça peut aller.',
      error0: 'Trop de jargon.', error1: 'Aucun bénéfice client', error2: 'Les besoins de sécurité et de budget sont oubliés, le client ne se sent pas écouté.',
      fixed: 'Avec RelaCosy, vos fichiers clients sont protégés et copiés automatiquement. Vous n’avez pas d’équipe technique ? Notre support vous aide sept jours sur sept. Et votre tarif est garanti pendant 12 mois, pour un budget sans surprise.' },
    { worst: 'Bon ben voilà, notre appli elle est trop belle, elle a plein d’options et de modules, euh, normalement ça marche sur Android, et notre logo est vert.',
      error0: 'Le vendeur hésite, ce qui donne une image peu sérieuse.', error1: 'Il énumère des fonctions sans dire ce que le client y gagne.', error2: 'Rien ne répond à la sécurité, à l’accompagnement ou au budget.',
      fixed: 'Vous voulez des données en sécurité : elles sont chiffrées et conformes au RGPD. Vous voulez être aidé : une équipe vous répond 7j/7. Vous voulez maîtriser vos dépenses : 19 € par mois, sans engagement.' },
    { worst: 'Notre CRM utilise une architecture microservices hébergée sur des serveurs avec synchronisation incrémentale et authentification OAuth. Il existe aussi en plusieurs couleurs. Il est sans doute le meilleur du marché.',
      error0: 'Les sigles techniques ne sont pas expliqués, le client se sent perdu.', error1: 'La couleur du logiciel est hors sujet.', error2: 'Le superlatif final n’est pas prouvé, le client se méfie.',
      fixed: 'Concrètement, vous ne perdez plus aucune donnée : tout est sauvegardé et protégé. Si vous avez une question, notre assistance vous répond en deux minutes, même le week-end. Et vous contrôlez votre budget avec un abonnement à 19 euros, sans engagement.' },
    { worst: 'Je vais vous parler de notre stagiaire, de notre machine à café et de notre nouveau logo. Ah et le logiciel fait aussi des tableaux, des graphiques, des exports, etc. Il est génial.',
      error0: 'Le discours est hors sujet et ne répond à aucun besoin.', error1: 'L’avalanche de fonctionnalités noie le client.', error2: 'Pas de preuve ni de chiffre pour convaincre.',
      fixed: 'Vos informations clients sont en sécurité : chiffrement, sauvegarde et audit annuel. Vous n’avez pas besoin d’informaticien, car notre support est joignable tous les jours. Votre budget est maîtrisé : un prix fixe pendant un an et la liberté d’arrêter.' },
    { worst: 'Le logiciel tourne sur des serveurs SQL avec une API ouverte, du SSO et un module BI. Il propose aussi un thème sombre, des icônes et 300 options. Normalement, c’est imbattable.',
      error0: 'Il utilise un vocabulaire que le client ne comprend pas.', error1: 'Il récite une liste sans parler des attentes du client.', error2: 'Il affirme sans démontrer, le client n’a aucune raison de le croire.',
      fixed: 'Vos données restent confidentielles et sont copiées en continu, conformément au RGPD. Si quelque chose bloque, un conseiller vous aide par téléphone, même le samedi. Enfin, l’abonnement commence à 19 € par mois : vous maîtrisez vos dépenses et vous pouvez arrêter quand vous voulez.' }
  ],

  // S2 2.3 · Trois accroches : question, chiffre-choc, bénéfice projeté.
  's2-2.3': [
    { hook0: 'Combien de temps vos équipes perdent-elles chaque semaine à ressaisir des données ?', hook1: 'Nos clients récupèrent en moyenne 3 heures par semaine.', hook2: 'Imaginez ne plus jamais perdre une information client.' },
    { hook0: 'Combien d’heures passez-vous chaque semaine sur vos factures ?', hook1: 'Une PME perd en moyenne 6 heures par semaine en saisies inutiles.', hook2: 'Imaginez une semaine où vos relances partent toutes seules.' },
    { hook0: 'Et si vous arrêtiez de ressaisir les mêmes informations ?', hook1: '30 % du temps d’un gérant part dans les tâches administratives.', hook2: 'Demain, vous pourriez consacrer ce temps à vos clients.' },
    { hook0: 'Vous arrive-t-il de recopier trois fois la même fiche client ?', hook1: 'Nos clients gagnent 3 heures par semaine dès le premier mois.', hook2: 'Imaginez finir votre journée à 18 heures, sans paperasse en retard.' },
    { hook0: 'Quelle part de votre journée part dans la paperasse ?', hook1: 'Chaque année, une gérante comme vous passe plus de 150 heures sur des tâches répétitives.', hook2: 'Imaginez : plus aucune saisie en double, et du temps libre pour développer votre boutique.' },
    { hook0: 'Qu’est-ce que vous feriez de deux heures de plus par semaine ?', hook1: 'Deux heures par jour : c’est le temps que perdent les gérants de PME en tâches répétitives.', hook2: 'Et si, dès lundi, vos devis se faisaient en un clic ?' },
    { hook0: 'Combien de fois par jour remplissez-vous les mêmes formulaires ?', hook1: 'Vous perdez près d’une journée entière par semaine en saisie manuelle.', hook2: 'Imaginez vos soirées libérées des tableaux Excel.' },
    { hook0: 'Savez-vous combien de temps vous perdez à gérer vos relances à la main ?', hook1: 'Plus de 5 000 PME ont déjà réduit de moitié leur temps de gestion.', hook2: 'Vous rentreriez plus tôt chez vous, sans tâches en retard sur le bureau.' }
  ],

  // S2 2.5 · La modification prioritaire du pitch.
  's2-2.5': [
    { priority: 'Ajouter une preuve à chaque bénéfice : un chiffre ou un fait vérifiable, par exemple les 5 000 PME qui l’utilisent déjà. Sans preuve, la promesse reste une affirmation.' },
    { priority: 'Ajouter des chiffres : par exemple le nombre de PME clientes, car sans preuve le client n’a aucune raison de croire ces promesses.' },
    { priority: 'Il faudrait appuyer chaque bénéfice par un fait vérifiable, comme l’audit RGPD annuel.' },
    { priority: 'La priorité est de donner une preuve concrète, sinon le pitch reste une suite d’affirmations.' },
    { priority: 'J’ajouterais un témoignage client pour rendre la sécurité crédible.' },
    { priority: 'Il manque des éléments factuels : intégrer une statistique sur le temps gagné rendrait le discours plus convaincant.' },
    { priority: 'Citer un exemple concret de client qui a gagné du temps, pour prouver ce qui est annoncé.' },
    { priority: 'Remplacer « solution clés en main » par une donnée chiffrée, comme les 3 heures économisées par semaine, car un chiffre marque plus qu’une formule.' }
  ],

  // S2 2.6 · Le pitch de 60 secondes, prospect soucieux de sécurité.
  's2-2.6': [
    { pitch: 'Votre priorité, c’est que les données de vos clients ne soient jamais en danger : c’est exactement ce que fait RelaCosy. Vos données sont chiffrées et sauvegardées en continu, conformes RGPD : plus de 5 000 PME l’utilisent sans le moindre incident. Et vous n’avez rien à gérer côté technique, l’assistance répond en 2 minutes, 7j/7. Concrètement, vous gagnez en sérénité sans y consacrer de temps. Je vous propose qu’on regarde ensemble comment le mettre en place chez vous.' },
    { pitch: 'Vous avez déjà été piraté et vous ne voulez plus jamais revivre ça. Avec RelaCosy, vos données sont chiffrées : personne d’autre ne peut les lire. Elles sont aussi sauvegardées toutes les 10 minutes, et un audit de sécurité indépendant le vérifie chaque année. Vous gagnez la tranquillité, sans rien gérer vous-même. Je vous propose une démonstration de 20 minutes cette semaine.' },
    { pitch: 'Saviez-vous qu’une PME sur deux subit une cyberattaque ? Vos fichiers clients méritent mieux. RelaCosy les protège par un chiffrement conforme au RGPD : plus de 5 000 entreprises nous font confiance. En cas de souci, notre assistance vous répond en 2 minutes, 7 jours sur 7, et vous restez serein. Voulez-vous qu’on regarde ensemble comment l’installer chez vous ?' },
    { pitch: 'Votre priorité, c’est la sécurité de vos données. RelaCosy chiffre tout et fait une copie automatique : vous ne perdez rien, même en cas de panne. Nos 5 000 clients n’ont connu aucune perte en 2024. Vous profitez aussi d’une assistance tous les jours. Je vous propose de tester gratuitement pendant un mois.' },
    { pitch: 'Imaginez dormir tranquille, sans craindre une fuite de vos données. C’est ce que vous apporte RelaCosy. Vos informations sont protégées et conformes au RGPD, avec un audit chaque année. Vous êtes aidé en deux minutes par une vraie équipe. Seriez-vous disponible jeudi pour un essai ?' },
    { pitch: 'Madame, vous m’avez dit que la protection de vos données clients est essentielle. RelaCosy vous garantit des données chiffrées et sauvegardées en continu. Cette sécurité est validée chaque année par un organisme indépendant, et 98 % de nos clients se disent rassurés. Vous n’avez rien à gérer : notre support s’occupe de tout. Je vous propose de fixer un rendez-vous pour la mise en place.' },
    { pitch: 'Une seule fuite de données peut coûter très cher à une PME. Avec RelaCosy, vous évitez ce risque : tout est chiffré et copié automatiquement. 5 000 PME l’utilisent sans incident. Et vous gardez l’esprit libre, car l’assistance répond 7j/7. On commence quand vous voulez : lundi, cela vous irait ?' },
    { pitch: 'Bonjour ! Vous voulez être certain que vos données ne tomberont jamais entre de mauvaises mains. RelaCosy les chiffre et les sauvegarde : vous travaillez en sécurité. Notre conformité RGPD est contrôlée par un audit annuel. Vous êtes accompagné par des experts disponibles tous les jours. Que diriez-vous d’un essai la semaine prochaine ?' }
  ],

  // S3 3.1 · Pourquoi chaque affirmation pénalise l'échange.
  's3-3.1': [
    { why0: 'Trop d’arguments noient le client, il ne retient plus l’essentiel.', why1: 'Le jargon empêche le client de comprendre, il se sent perdu.', why2: 'Le client n’a pas exprimé ce besoin, donc l’argument ne l’intéresse pas.' },
    { why0: 'Le client sature et décroche, car il reçoit trop d’informations d’un coup.', why1: 'Des mots trop techniques créent une barrière : le client n’ose pas dire qu’il ne comprend pas.', why2: 'Cela détourne l’échange de ses vraies priorités et il a l’impression de ne pas être écouté.' },
    { why0: 'Plus on accumule, plus on dilue le message : mieux vaut quelques arguments bien ciblés.', why1: 'Un vocabulaire technique n’aide que si l’interlocuteur le comprend ; sinon il cache le bénéfice.', why2: 'Un argument est pertinent seulement s’il répond à une attente du client, sinon il fait perdre du temps.' },
    { why0: 'Ça fait trop, le client finit par décrocher et ne retient rien.', why1: 'Le client ne comprend rien et ça le met mal à l’aise.', why2: 'Ça part hors sujet et le client se demande si on l’a vraiment écouté.' },
    { why0: 'Enchaîner les arguments sans pause fatigue le client et fait perdre les points importants.', why1: 'Le jargon rend le discours flou : il faut traduire la technique en bénéfice concret.', why2: 'Parler de ce qui ne le concerne pas disperse l’attention du client et affaiblit la persuasion.' },
    { why0: 'Ce n’est pas la quantité qui convainc mais la pertinence : un client submergé n’écoute plus.', why1: 'Employer des termes techniques n’est pas toujours crédible, car le client peut se sentir exclu.', why2: 'Ce n’est pas toujours pertinent, parce qu’un argument sans lien avec ses besoins ne lui apporte rien.' },
    { why0: 'L’accumulation crée une saturation qui fait oublier les bons arguments.', why1: 'Un client qui ne comprend pas les mots ne voit pas l’intérêt de l’offre.', why2: 'Le client risque de penser que le vendeur récite son catalogue au lieu de s’intéresser à ce qu’il attend.' },
    { why0: 'Accumuler les arguments peut diluer le message et noyer ce qui compte vraiment pour le client.', why1: 'Le jargon rend le discours difficile à comprendre et masque le bénéfice concret.', why2: 'Introduire des arguments sans lien avec ses attentes détourne l’échange de ses priorités.' }
  ],

  // S3 3.5 · La question de contrôle des répliques 2 et 3.
  's3-3.5': [
    { q1: 'Le fait de générer vos devis en un clic vous ferait-il gagner du temps au quotidien ?', q2: 'Parmi les éléments que nous venons de voir, lequel répond le mieux à votre besoin de gagner du temps ?' },
    { q1: 'Est-ce que ça vous aiderait de faire vos devis en un clic ?', q2: 'Qu’est-ce qui compte le plus pour vous dans tout ça ?' },
    { q1: 'Combien de temps passez-vous aujourd’hui sur vos devis ?', q2: 'Lequel de ces points vous ferait gagner le plus de temps ?' },
    { q1: 'Éviter la double saisie, cela vous parle ?', q2: 'Qu’en pensez-vous, cela correspond à votre besoin ?' },
    { q1: 'Que pensez-vous de cette fonction pour vos devis ?', q2: 'Parmi ces fonctions, laquelle vous semble la plus utile ?' },
    { q1: 'Est-ce que la double saisie vous fait perdre du temps aujourd’hui ?', q2: 'Avant d’aller plus loin, est-ce que cela répond à ce que vous cherchez ?' },
    { q1: 'Comment gérez-vous vos devis aujourd’hui ?', q2: 'Quelle fonction retenez-vous en priorité ?' },
    { q1: 'Ce gain sur les devis ferait-il une différence pour votre équipe ?', q2: 'Qu’est-ce qui vous intéresse vraiment parmi tout cela ?' }
  ],

  // S3 3.6 · Le tronc CAP, puis les deux branches.
  's3-3.6': [
    { t0: 'RelaCosy automatise la saisie de vos factures.', t1: 'Vous réduisez ainsi les saisies manuelles et pouvez économiser environ 3 heures de travail administratif par semaine.', t2: 'C’est le gain de temps moyen constaté chez nos clients utilisant cette fonctionnalité.', t3: 'Très bien. Regardons alors un autre poste qui vous prend du temps aujourd’hui : la préparation de vos devis.', t4: 'D’accord. Sur quelles tâches administratives perdez-vous le plus de temps aujourd’hui ?' },
    { t0: 'Le logiciel envoie automatiquement les relances de paiement.', t1: 'Vous n’avez plus à relancer vos clients un par un : vous gagnez une heure chaque jour.', t2: 'Nos utilisateurs économisent en moyenne 5 heures par semaine.', t3: 'Parfait ! Passons maintenant à vos devis, qui vous prennent aussi du temps.', t4: 'Je comprends. Où perdez-vous le plus de temps dans votre semaine ?' },
    { t0: 'RelaCosy génère vos devis en un clic à partir de la fiche client.', t1: 'Vous évitez la double saisie et vos devis partent plus vite.', t2: '3 000 PME l’utilisent déjà, avec un devis créé en moins de deux minutes.', t3: 'Très bien, je vous propose de regarder ensemble la mise en place la semaine prochaine.', t4: 'D’accord, c’est une bonne question. Quelles tâches vous prennent le plus de temps aujourd’hui ?' },
    { t0: 'L’outil importe vos factures fournisseurs et remplit la comptabilité tout seul.', t1: 'Vous libérez votre soirée du vendredi, finies les saisies à la main.', t2: 'Un client boulanger a réduit sa saisie de 4 heures à 30 minutes par semaine.', t3: 'Super, alors voyons comment démarrer : je vous envoie l’accès d’essai demain.', t4: 'Entendu. Selon vous, qu’est-ce qui vous fait perdre le plus de temps ?' },
    { t0: 'Notre solution centralise tous vos documents administratifs au même endroit.', t1: 'Vous retrouvez un document en quelques secondes, sans fouiller dans vos dossiers.', t2: 'C’est ce que montre l’étude menée auprès de nos clients : 40 % de temps de recherche en moins.', t3: 'Ravi que cela vous plaise ! Organisons une démonstration avec votre équipe.', t4: 'Je vous entends. Pourriez-vous me dire comment se passe une journée type au bureau ?' },
    { t0: 'La fonction de saisie automatique lit vos factures et les classe.', t1: 'Ainsi, vous consacrez votre temps à vos clients plutôt qu’à la paperasse.', t2: 'Nous pouvons vous faire une démonstration sur vos propres factures.', t3: 'Excellent. Quelle est la prochaine tâche que vous aimeriez alléger ?', t4: 'C’est noté. Sur quelles tâches administratives perdez-vous le plus de temps ?' },
    { t0: 'Ça remplit les factures tout seul.', t1: 'Vous gagnez du temps, et vous faites moins d’erreurs.', t2: 'Nos clients le disent : 3 heures gagnées par semaine en moyenne.', t3: 'Génial ! On passe à l’étape suivante : quand peut-on démarrer ?', t4: 'Ok, je vois. Qu’est-ce qui vous prend le plus de temps alors ?' },
    { t0: 'L’application programme les rappels de rendez-vous par SMS.', t1: 'Vous n’avez plus à téléphoner à chaque client la veille.', t2: 'Nos clients constatent deux fois moins d’oublis et de rendez-vous manqués.', t3: 'Tant mieux. Je vous propose de configurer cela ensemble dès lundi.', t4: 'Bien sûr, c’est normal d’avoir un doute. À quel moment de la semaine perdez-vous le plus de temps ?' }
  ],

  // S4 1.2 · Avantage et preuve, pour deux caractéristiques.
  's4-1.2': [
    { adv0: 'Vous êtes opérationnel dès le lendemain, sans interruption d’activité.', proof0: '98 % des commandes livrées sous 24 h en 2024.', adv1: 'Vos équipes maîtrisent l’outil rapidement, sans surcoût.', proof1: '2 sessions de formation planifiées au devis.' },
    { adv0: 'Vous recevez votre matériel dès le lendemain et votre activité ne s’arrête pas.', proof0: '98 % des colis arrivent en 24 h, selon notre suivi 2024.', adv1: 'Vos équipes sont à l’aise avec l’outil très vite, sans payer de formation en plus.', proof1: 'Deux sessions de formation sont prévues noir sur blanc dans le devis.' },
    { adv0: 'Vous n’attendez pas : la commande passée aujourd’hui est utilisable demain.', proof0: 'Délai garanti par contrat, avec pénalités en cas de retard.', adv1: 'Vos collaborateurs deviennent autonomes rapidement, et c’est inclus dans le prix.', proof1: 'Plus de 2 000 utilisateurs formés l’an dernier, avec 9 sur 10 de satisfaction.' },
    { adv0: 'Le client évite les ruptures de stock et continue à servir ses propres clients.', proof0: 'Un taux de livraison à l’heure de 97 % mesuré sur 10 000 commandes.', adv1: 'Le client gagne du temps : ses salariés maîtrisent l’outil dès la première semaine.', proof1: 'Une attestation de formation est remise à chaque participant.' },
    { adv0: 'Fini les journées perdues à attendre une pièce : vous êtes opérationnel tout de suite.', proof0: 'Nos clients notent la ponctualité de nos livraisons 4,8 sur 5.', adv1: 'Vous ne laissez personne seul face au logiciel, sans dépense supplémentaire.', proof1: 'Le programme de formation est planifié au calendrier dès la signature.' },
    { adv0: 'Votre chantier ne prend pas de retard, vous livrez vos clients à temps.', proof0: 'Le numéro de suivi vous permet de vérifier la livraison en temps réel.', adv1: 'Vos équipes apprennent à utiliser l’outil sans frais et font moins d’erreurs.', proof1: 'Nos formateurs certifiés ont formé 500 entreprises.' },
    { adv0: 'Vous commandez le soir, c’est chez vous le lendemain matin !', proof0: 'Sur 2024, 98 commandes sur 100 sont livrées en moins de 24 heures.', adv1: 'Vos gars savent se servir de l’outil en deux jours, et ça ne vous coûte rien de plus.', proof1: '2 séances de formation sont inscrites dans votre devis.' },
    { adv0: 'Vous gardez votre activité en marche, sans interruption.', proof0: 'Engagement écrit : livré sous 24 h ou remboursé.', adv1: 'Votre équipe prend l’outil en main rapidement, sans surcoût.', proof1: 'Les avis de nos clients sur la formation sont disponibles sur notre site.' }
  ],

  // S4 2.2 · La fiche technique devient un bénéfice client.
  's4-2.2': [
    { client0: 'Vos données clients sont protégées en permanence, sans que vous ayez à y penser : vous ne perdez plus rien.', client1: 'Vous profitez de la lumière du matin comme du soir : des pièces claires toute la journée, plus agréables à vivre.' },
    { client0: 'Vous ne perdez plus jamais votre travail, même en cas de panne.', client1: 'Vous profitez du soleil du matin au soir dans toutes les pièces.' },
    { client0: 'Vos fichiers sont en sécurité sans que vous ayez à y penser.', client1: 'Votre salon reste lumineux toute la journée, et vous allumez moins la lumière.' },
    { client0: 'Le client dort tranquille : ses données sont protégées automatiquement.', client1: 'Les occupants profitent d’un logement clair et agréable à vivre.' },
    { client0: 'Fini le stress de l’ordinateur qui plante : vous retrouvez tout.', client1: 'Vous prenez votre petit-déjeuner au soleil et votre dîner à la lumière du soir.' },
    { client0: 'Vous gagnez du temps : plus besoin de faire des copies à la main.', client1: 'Vous économisez sur le chauffage grâce à la chaleur du soleil.' },
    { client0: 'Même si votre ordinateur tombe en panne, vos documents restent récupérables.', client1: 'Votre appartement est bien aéré et lumineux, été comme hiver.' },
    { client0: 'Vous travaillez l’esprit libre, vos données sont à l’abri.', client1: 'Vous vivez dans des pièces claires, ce qui est bon pour le moral.' }
  ],

  // S4 3.2 · Trois erreurs de sur-argumentation, dans n'importe quel ordre.
  's4-3.2': [
    { error0: 'Le besoin exprimé est ignoré : le client cherche la simplicité et rien n’y répond.', error1: 'L’effet catalogue : le commercial déballe tous ses arguments, sans sélection.', error2: 'Le jargon technique : AES-256, BI, API, SSO, rien n’est traduit en bénéfice.' },
    { error0: 'Il ignore le besoin de simplicité du client.', error1: 'Il énumère toutes les fonctions comme un catalogue.', error2: 'Il emploie des sigles techniques que le client ne comprend pas.' },
    { error0: 'Le commercial ne pose aucune question.', error1: 'Trop d’informations d’un coup, le client est noyé.', error2: 'Le jargon (AES, API, SSO) n’est pas expliqué.' },
    { error0: 'Il ne répond pas à la demande : le client veut quelque chose de simple.', error1: 'Il n’écoute pas la réaction du client, qui dit « euh, d’accord ».', error2: 'Il récite une liste sans sélection.' },
    { error0: 'Le vendeur parle tout seul, il ne vérifie pas l’impact.', error1: 'Avalanche de fonctionnalités.', error2: 'Vocabulaire trop technique pour le client.' },
    { error0: 'Aucun lien avec ce que cherche le client.', error1: 'Il surcharge son discours de détails techniques.', error2: 'Il ne laisse pas le client réagir.' },
    { error0: 'Le besoin exprimé est complètement oublié.', error1: 'Il noie le client sous les caractéristiques.', error2: 'Il ne remarque pas que le client décroche.' },
    { error0: 'Il ne s’adapte pas à la demande de simplicité.', error1: 'Il en dit beaucoup trop, sans trier.', error2: 'Il ne vérifie pas si le client a compris.' }
  ]
};
