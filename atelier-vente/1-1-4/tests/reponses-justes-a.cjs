/* Réponses d’apprenants pour tester l’indicateur de points (1-1-4).
 * « justes » : réponses correctes, formulées de façons variées.
 * « mauvaises » : hors sujet, maladroite, liste de mots-clés.
 */
module.exports = {
  justes: {
    's1-1.4': [
      { c0_risk: 'Il donne un chiffre sec sans avoir rien compris aux besoins du client. Du coup, le client ne retient que les 17 000 € et va comparer uniquement là-dessus.',
        c0_replay: 'Je vais vous répondre, c’est normal de vouloir savoir. Le montant dépend surtout du nombre de personnes à équiper et de ce qui vous gêne aujourd’hui : combien de collaborateurs sont concernés ?' },
      { c0_risk: 'Le risque, c’est que le client trouve ça cher tout de suite, parce qu’il n’a encore aucune idée de ce qu’il obtient pour cette somme.',
        c0_replay: 'Bonne question. Selon la formule, on va d’environ 700 € pour un siège à un peu moins de 2 000 € pour un poste complet. Pour être précis, vous cherchez à équiper combien de personnes, et qu’est-ce qui pose problème actuellement ?' },
      { c0_risk: 'En annonçant le montant d’emblée, le commercial se prive de la découverte : il ignore les attentes de son interlocuteur et ne peut plus mettre en avant ce que l’offre apporte. Le prix devient alors le seul critère de décision.',
        c0_replay: 'Je comprends que vous vouliez aller à l’essentiel. Permettez-moi deux questions rapides pour vous proposer un chiffre qui corresponde vraiment à votre situation : combien de postes souhaitez-vous équiper, et quelles difficultés rencontrent vos équipes aujourd’hui ?' },
      { c0_risk: 'Prix annoncé trop tôt, sans aucune valeur autour : le client risque de bloquer sur le montant.',
        c0_replay: 'Avec plaisir, je vous le donne juste après. Dites-moi d’abord combien de postes sont concernés ?' },
      { c0_risk: 'Le client n’a pas encore vu l’intérêt du produit, donc 17 000 €, ça lui paraît énorme. Il peut se braquer ou partir voir ailleurs moins cher.',
        c0_replay: 'Pas de souci, je vais vous donner un chiffre. Par contre ça varie pas mal selon ce que vous voulez : vous pensez plutôt à des sièges seuls ou à des postes complets, et pour combien de personnes ?' },
      { c0_risk: 'Il risque de perdre la vente avant même de l’avoir commencée : sans connaître le besoin, il ne sait pas si le pack est adapté, et le client juge l’offre uniquement sur son prix.',
        c0_replay: 'C’est une question légitime et je vais y répondre. Pour que le chiffre ait du sens, pouvez-vous me dire en quelques mots ce qui vous amène à chercher de nouveaux équipements ?' },
      { c0_risk: 'Le commercial passe à côté de l’étape de découverte. Il ne peut plus relier le prix aux bénéfices, et le chiffre risque de faire peur.',
        c0_replay: 'Tout à fait, on peut aller vite. Nos solutions démarrent à 690 € le siège. Pour vous chiffrer précisément, combien de postes avez-vous et quels problèmes voulez-vous régler ?' },
      { c0_risk: 'Annoncer 17 000 € comme ça, c’est donner un prix « nu ». Le client n’a aucun élément pour savoir si c’est justifié, il va donc comparer avec la concurrence uniquement sur le montant.',
        c0_replay: 'Bien sûr, je ne vais pas vous faire attendre. Laissez-moi simplement vous poser deux ou trois questions pour vous annoncer le bon montant et vous expliquer ce qu’il comprend.' },
      { c0_risk: 'Le danger est double : il propose un pack sans savoir si le client a besoin de 10 postes, et il met le prix en avant avant la valeur, ce qui fausse la perception de l’offre.',
        c0_replay: 'Je vous réponds tout de suite après, promis. Pour ne pas vous donner un prix au hasard : qu’est-ce que vous aimeriez améliorer pour vos équipes, et sur combien de postes ?' },
      { c0_risk: 'S’il commence par le prix, le client risque de ne retenir que ça. Il n’a pas encore pu montrer le confort, la garantie ou l’installation, donc la somme paraît sans justification.',
        c0_replay: 'Je comprends, le budget compte. Cela peut aller de quelques centaines d’euros à une solution complète pour toute une équipe. Qu’est-ce qui est prioritaire pour vous en ce moment ?' }
    ],

    's1-1.5': [
      { why: 'L’annonce 2 commence par ce que le siège apporte, donne le prix sans hésiter et finit par la garantie. Dans l’annonce 1, le vendeur dit lui-même que c’est cher, ce qui donne au client une raison de refuser.' },
      { why: 'Dans la première, on sent que le vendeur n’est pas à l’aise : il hésite et s’excuse presque. La deuxième est claire, assurée, et met en avant le confort pour le dos avant de parler d’argent.' },
      { why: 'La seconde annonce suit la méthode sandwich : avantage, montant, garantie. Les mots sont positifs et le chiffre est posé simplement. La première dévalorise le produit avec « un peu cher » et « mais bon ».' },
      { why: 'Elle est plus assurée et mieux construite : le prix arrive entre un bénéfice et une garantie, sans excuse.' },
      { why: 'L’annonce 2 inspire confiance : le commercial adopte une posture sereine, organise son propos autour du bénéfice, puis du prix et enfin de la réassurance, et emploie des termes concrets. À l’inverse, l’annonce 1 trahit un manque de conviction qui fragilise la valeur perçue.' },
      { why: 'Le prix est le même, mais la 2 donne envie : on comprend tout de suite à quoi sert le siège et qu’on est couvert 5 ans. La 1 est floue et négative, le client retient seulement que c’est cher.' },
      { why: 'J’ai choisi la 2 parce que le commercial ne se justifie pas. Il parle du dos et de la morphologie, des mots qui parlent au client, puis il annonce 690 € avec la garantie. Dans la 1, les « alors… » montrent qu’il doute.' },
      { why: 'La posture est meilleure dans l’annonce 2, le ton est sûr. L’ordre est logique et tout est clair : on sait exactement ce qu’on paie et ce qu’on obtient.' },
      { why: 'Avec l’annonce 1, le vendeur se tire une balle dans le pied en disant que c’est cher avant que le client ait réagi. L’annonce 2 valorise le produit, reste précise et rassure grâce aux 5 ans de garantie.' },
      { why: 'L’annonce 2 est plus efficace car elle relie le prix à des bénéfices concrets et se termine sur une garantie qui sécurise l’achat. Elle est dite nettement, sans hésitation. L’annonce 1 n’apporte aucun argument et le vendeur s’excuse du prix.' }
    ],

    's1-1.7': [
      { c0_text: 'Vos collaborateurs travaillent bien installés toute la journée, sans tension dans le dos. Ce siège coûte 690 €, et il est garanti 5 ans.',
        c1_text: 'Avec ce poste, chacun peut travailler assis ou debout selon le moment, et l’écran est à la bonne hauteur. C’est 1 900 €, et on s’occupe de l’installation.',
        c2_text: 'Toute votre équipe gagne en confort, avec des postes pensés pour chacun grâce à l’étude ergonomique. Le pack est à 17 000 €, et nous formons vos équipes à bien régler leur poste.' },
      { c0_text: 'Réglable en six points, ce siège s’adapte parfaitement à votre morphologie. Il est proposé à 690 €, avec une garantie de cinq ans.',
        c1_text: 'Ce poste complet vous permet d’alterner les positions et de rester en forme jusqu’au soir. Il est à 1 900 €, livré et installé par nos soins.',
        c2_text: 'Vous équipez dix personnes d’un coup avec une solution adaptée à chacune. L’ensemble représente 17 000 €, et notre SAV intervient sous 48 heures si besoin.' },
      { c0_text: 'Franchement, vous allez sentir la différence pour le dos dès la première semaine. Le siège est à 690 €, et si vous n’êtes pas convaincu, vous avez 30 jours pour l’essayer gratuitement.',
        c1_text: 'Bureau qui monte et descend, siège ergonomique, bras pour l’écran : vous avez tout pour bien travailler. Le tout fait 1 900 €, installation comprise.',
        c2_text: 'Vos dix collaborateurs auront chacun un poste réglé pour eux, et ça se ressent sur la fatigue. C’est 17 000 € pour le pack, avec la formation des équipes incluse.' },
      { c0_text: 'Ce siège protège votre dos au quotidien. Il coûte 690 €, garantie 5 ans comprise.',
        c1_text: 'Ce poste vous fait gagner en énergie. Il est à 1 900 €, installé chez vous.',
        c2_text: 'Ce pack équipe toute votre équipe. Il est à 17 000 €, avec un SAV sous 48 h.' },
      { c0_text: 'Ce siège soutient efficacement le dos et limite la fatigue en fin de journée. Son prix est de 690 €, et vous bénéficiez d’une garantie de cinq ans, pièces et main-d’œuvre.',
        c1_text: 'Ce poste de travail permet à vos collaborateurs de varier leur posture et de préserver leur santé sur la durée. Son prix s’élève à 1 900 €, l’installation étant entièrement prise en charge par nos équipes.',
        c2_text: 'Ce pack offre à vos équipes un environnement de travail plus confortable, conçu à partir d’une étude ergonomique de vos locaux. L’investissement s’élève à 17 000 €, et vous disposez de 30 jours d’essai pour vous assurer qu’il vous convient.' },
      { c0_text: 'Ce siège se règle à votre taille et soulage le bas du dos. Vous l’avez pour 690 €, avec 5 ans de garantie.',
        c1_text: 'Vous pourrez travailler debout quand vous en avez envie, ce qui évite de rester figé sur sa chaise toute la journée. Ce poste coûte 1 900 € et vous pouvez l’essayer 30 jours.',
        c2_text: 'Avec ce pack, vos dix postes sont aménagés de façon cohérente et vos équipes apprennent à bien s’en servir. Il revient à 17 000 €, et en cas de souci, notre service après-vente passe sous 48 h.' },
      { c0_text: 'Pour vous, c’est l’assurance de travailler confortablement, quelle que soit votre morphologie. Le prix est de 690 €. Et vous êtes tranquille pendant 5 ans grâce à la garantie.',
        c1_text: 'Ce poste complet améliore votre confort et votre concentration, car tout se règle à votre hauteur. Il est à 1 900 €. Nous nous chargeons de l’installation et notre SAV répond sous 48 h.',
        c2_text: 'Vous offrez à vos équipes des conditions de travail nettement meilleures, poste par poste. Le pack est à 17 000 €. Nous commençons par une étude ergonomique et nous formons chacun à son poste.' },
      { c0_text: 'Vos salariés seront mieux assis et moins souvent gênés par des douleurs de dos. Ce modèle est à 690 €, avec un essai gratuit d’un mois.',
        c1_text: 'Ce poste rend vos journées plus agréables : on se lève, on s’assoit, on ajuste l’écran en un instant. L’ensemble coûte 1 900 €, et il est installé par nos techniciens.',
        c2_text: 'Équiper vos dix collaborateurs, c’est leur donner un vrai confort au quotidien. Le pack est à 17 000 €, l’installation est comprise et notre SAV intervient en 48 h.' },
      { c0_text: 'Grâce à ses six réglages, chacun trouve la bonne position et travaille sans tension. Je vous le propose à 690 €, et il est garanti cinq ans.',
        c1_text: 'Ce poste vous accompagne toute la journée : assis le matin, debout l’après-midi, sans effort. Il est à 1 900 €, et vous avez trente jours pour l’essayer chez vous.',
        c2_text: 'Cette solution complète donne à chaque membre de votre équipe un poste adapté et confortable. Elle s’élève à 17 000 €, avec une étude ergonomique au départ et une formation pour vos équipes.' },
      { c0_text: 'Ce siège, c’est du confort tous les jours et un dos préservé. Il vaut 690 €. Vous êtes couvert cinq ans.',
        c1_text: 'Vous gagnez en énergie et en bien-être en changeant de position quand vous le souhaitez. Le poste complet est à 1 900 €. On vient l’installer, vous n’avez rien à faire.',
        c2_text: 'Vos équipes travaillent dans de meilleures conditions et sont moins fatiguées. Cela représente 17 000 € pour les dix postes. Vous pouvez tester pendant 30 jours et le SAV intervient sous 48 h.' }
    ],

    's2-2.3': [
      { c0_text: 'Ce siège coûte 690 €. Sur cinq ans, ça fait à peu près 38 centimes par jour, moins qu’un café, pour être bien assis tous les jours.',
        c1_text: 'Le pack est à 17 000 €, c’est-à-dire 1 700 € par poste. Pour ce prix, chaque collaborateur a son siège, son bureau réglable et son bras d’écran, installés chez vous.' },
      { c0_text: 'L’investissement est de 690 €, ce qui revient à environ 0,38 € par jour si on le répartit sur cinq ans. Pour ce montant, votre collaborateur travaille plus confortablement huit heures par jour.',
        c1_text: 'Pour 17 000 €, vous équipez dix postes, soit 1 700 € par personne. Chaque salarié dispose ainsi d’un poste complet, installé et garanti.' },
      { c0_text: 'Le prix de ce siège est de 690 €. Rapporté à une durée d’utilisation de cinq ans, il représente environ 38 centimes par jour, pour un confort de travail amélioré au quotidien.',
        c1_text: 'Le pack s’élève à 17 000 €, soit 1 700 € par poste. Ce montant comprend, pour chacun de vos dix collaborateurs, un équipement complet avec installation et garantie.' },
      { c0_text: 'Ce siège vaut 690 €, soit environ 0,38 € par jour sur 5 ans pour un dos préservé au travail.',
        c1_text: 'Le pack fait 17 000 € au total, donc 1 700 € par poste, installation et garantie comprises.' },
      { c0_text: 'Le siège est à 690 €. Si vous le gardez cinq ans, on tombe autour de 38 centimes par jour. Pour un siège sur lequel vous passez toutes vos journées, c’est un vrai confort pour pas grand-chose.',
        c1_text: 'Le pack fait 17 000 €. Divisé par dix, ça nous fait 1 700 € par poste, et dedans il y a tout : le matériel, la pose et la garantie. Vous pouvez comparer poste par poste.' },
      { c0_text: 'Pour 690 €, vous avez un siège qui vous suit pendant cinq ans : ça représente environ 0,38 € par jour. Chaque matin, vos collaborateurs s’assoient sur un siège réglé pour eux.',
        c1_text: 'L’offre globale est de 17 000 €. Concrètement, chaque poste vous revient à 1 700 €, et vos équipes ont un poste de travail confortable dès l’installation terminée.' },
      { c0_text: 'Il est à 690 €. Sur sa durée de garantie de cinq ans, cela fait environ 38 centimes par jour pour moins de fatigue en fin de journée.',
        c1_text: 'Ce pack de 17 000 € revient à 1 700 € par collaborateur équipé. Cela permet de comparer facilement avec le prix d’un poste acheté seul, sachant que l’installation est déjà incluse.' },
      { c0_text: 'Ce siège coûte 690 € : réparti sur 5 ans, c’est à peu près 0,38 € par jour. C’est le prix d’un confort qui se ressent à chaque heure passée au bureau.',
        c1_text: 'Cela représente 1 700 € par poste sur un total de 17 000 €, avec l’installation et la garantie comprises. Vous pouvez ainsi mettre ce prix en regard de tout ce que la solution contient.' },
      { c0_text: 'Vous investissez 690 €, ce qui, sur cinq ans, revient à environ 38 centimes par jour de travail. Pour ce prix, vous réduisez les tensions dans le dos et vous restez concentré plus longtemps.',
        c1_text: 'Le pack complet coûte 17 000 €. Ramené à chaque poste, on est à 1 700 €, pour un équipement qui accompagne vos salariés huit heures par jour.' },
      { c0_text: 'Le siège est à 690 €. Si on divise par les cinq ans pendant lesquels vous allez l’utiliser, on arrive à environ 0,38 € par jour, pour un siège qui s’adapte à chaque personne qui s’y assoit.',
        c1_text: 'Pour dix postes, l’investissement est de 17 000 €, soit 1 700 € chacun. Chaque personne de votre équipe gagne un poste confortable, monté et prêt à l’emploi.' }
    ],

    's2-2.4': [
      { error0: 'Il contredit le client en disant que ce n’est pas si cher', error1: 'Remise de 15 % accordée tout de suite', error2: 'Aucune question pour comprendre l’objection', error3: 'Il se justifie avec ses coûts' },
      { error0: 'Justification par les coûts de l’entreprise', error1: 'Il cède une réduction sans même discuter', error2: 'Il nie l’objection du client', error3: 'Il clôt la discussion avec « on n’en parle plus »' },
      { error0: 'Il dit au client qu’il a tort', error1: 'Il ne demande pas pourquoi c’est trop cher', error2: 'Il baisse son prix dès la première remarque', error3: 'Il parle de ses propres contraintes au lieu de la valeur' },
      { error0: 'Baisse le prix trop vite', error1: 'Ne creuse pas le frein', error2: 'Contredit le client', error3: 'Met en avant ses coûts' },
      { error0: 'Il répond « c’est pas si cher », il s’oppose au client', error1: 'Il propose -15 % immédiatement, ça casse la valeur', error2: 'Il met fin à l’échange sans chercher à comprendre', error3: 'Il explique que ses coûts sont élevés, ça n’intéresse pas le client' },
      { error0: 'Il ne valorise rien et ne pose aucune question', error1: 'Il conteste le ressenti du client', error2: 'Il explique le prix par les charges de sa boîte', error3: 'Il brade le prix avec une remise immédiate' },
      { error0: 'Erreur : remise immédiate de 15 %', error1: 'Erreur : contradiction du client', error2: 'Erreur : pas d’écoute ni de question', error3: 'Erreur : excuse liée aux coûts internes' },
      { error0: 'Il conteste ce que dit le client', error1: 'Il fait un rabais sans qu’on le lui demande', error2: 'Il coupe court au lieu de découvrir ce qui bloque', error3: 'Il se justifie par ses frais' },
      { error0: 'Il fait une remise d’entrée de jeu', error1: 'Il justifie le tarif par ses contraintes', error2: 'Il ne cherche pas ce que veut dire « trop cher »', error3: 'Il nie le problème soulevé par le client' },
      { error0: 'Il répond « c’est pas si cher » : il contredit', error1: 'Il s’excuse presque du prix à cause des coûts', error2: 'Il dit « on n’en parle plus » : il ferme la discussion', error3: 'Il lâche 15 % tout de suite' }
    ],

    's2-2.5': [
      { crit0: 'Elle ne nie pas que l’offre est plus chère : le vendeur accepte la remarque du client.',
        crit1: 'Elle propose de comparer les mêmes éléments (installation, garantie, SAV) avant de parler de l’écart.' },
      { crit0: 'Respect du concurrent : la réponse 2 ne critique pas l’autre entreprise.',
        crit1: 'Vérification du périmètre : on regarde d’abord si les deux offres contiennent la même chose.' },
      { crit0: 'Le vendeur reconnaît l’écart avec « c’est possible », sans se braquer.',
        crit1: 'Il prépare la suite en annonçant qu’on cherchera précisément d’où vient la différence, ce qui permettra de mettre en valeur ce qu’il propose en plus.' },
      { crit0: 'On compare à périmètre égal.',
        crit1: 'Le concurrent n’est pas dénigré.' },
      { crit0: 'La réponse 1 part du principe que l’écart est justifié, alors que la réponse 2 vérifie d’abord ce que propose le concurrent. C’est plus solide.',
        crit1: 'La réponse 2 reste neutre envers le concurrent et laisse le client constater lui-même les différences.' },
      { crit0: 'Elle accueille l’objection calmement au lieu de la contester.',
        crit1: 'Elle liste les éléments à vérifier dans les deux offres : étude, installation, garantie, SAV.' },
      { crit0: 'Le commercial ne dit pas de mal de la concurrence, il reste professionnel.',
        crit1: 'Il valorise ensuite les vraies différences, une fois qu’on sait ce que chaque offre comprend.' },
      { crit0: 'Elle admet que le prix peut être plus élevé, ce qui rend le vendeur crédible.',
        crit1: 'Elle évite de justifier l’écart trop vite et cherche d’abord à savoir si on compare des offres équivalentes.' },
      { crit0: 'Reconnaissance de l’écart : le vendeur ne conteste pas ce que dit le client.',
        crit1: 'Valorisation des différences : il propose d’expliquer précisément d’où vient la différence de prix.' },
      { crit0: 'Avant de défendre son prix, le vendeur s’assure que les deux propositions incluent les mêmes prestations.',
        crit1: 'Il ne rabaisse pas le concurrent et garde un ton ouvert, ce qui met le client en confiance.' }
    ],

    's2-2.6': [
      { c0_text: 'Je vous entends. Trop cher par rapport à quoi exactement : votre budget, ou une autre offre que vous avez vue ? Je veux être sûr qu’on parle de la même chose, sachant que le prix comprend l’installation et 5 ans de garantie.',
        c1_text: 'D’accord, merci de me le dire. Qu’est-ce que comprend l’offre que vous avez trouvée ? Chez nous, l’installation, la garantie de 5 ans et le SAV sous 48 h sont inclus, donc regardons si c’est comparable.',
        c2_text: 'Qu’est-ce qui vous fait douter ? Ces 17 000 €, c’est 1 700 € par poste, avec l’étude ergonomique, l’installation et la formation de vos équipes. Dites-moi ce qui compte le plus pour vous, et on verra si l’offre y répond.' },
      { c0_text: 'Je comprends votre réaction. Qu’est-ce qui vous paraît trop élevé, le prix global ou le prix d’un poste ? Je vous rappelle que tout est compris : matériel, pose et garantie cinq ans.',
        c1_text: 'Ça peut arriver. Est-ce que l’autre proposition inclut aussi la pose et une garantie aussi longue ? Si on compare la même chose, on y verra plus clair.',
        c2_text: 'C’est une vraie question. Qu’est-ce que vous attendez en priorité de cet équipement ? Pour 17 000 €, vos dix collaborateurs ont un poste complet, installé, avec un SAV sous 48 h.' },
      { c0_text: 'J’entends votre remarque. Pourriez-vous me préciser à quoi vous comparez ce montant ? Cela me permettra de vous montrer ce que l’offre comprend réellement, notamment la garantie de cinq ans et l’installation.',
        c1_text: 'C’est tout à fait possible. Savez-vous si cette offre comprend l’étude ergonomique, l’installation et le service après-vente ? Il est essentiel de comparer des prestations équivalentes.',
        c2_text: 'Je comprends votre hésitation face à un tel investissement. Quels résultats attendez-vous concrètement pour vos équipes ? Ce montant correspond à 1 700 € par poste, accompagnement et formation inclus.' },
      { c0_text: 'Ah oui ? Trop cher comparé à quoi ? Je vous demande ça parce que tout est inclus, même la garantie 5 ans.',
        c1_text: 'Ah, chez qui ? Vous avez le détail de ce qu’ils proposent ? On regarde ensemble si c’est la même chose, parce que chez nous la pose et le SAV sont compris.',
        c2_text: 'Qu’est-ce qui vous retient ? On parle de 1 700 € par poste, installation comprise, pour toute votre équipe.' },
      { c0_text: 'D’accord. Quand vous dites « trop cher », vous pensez à votre budget de départ ? Regardons ensemble ce que vous obtenez : un siège réglable en six points, garanti cinq ans, avec un essai de 30 jours.',
        c1_text: 'Merci pour l’information. Pouvez-vous me dire ce que contient cette offre moins chère : la garantie, l’installation, le délai d’intervention ? Notre prix intègre tout cela, donc l’écart vient peut-être de là.',
        c2_text: 'Je comprends. Qu’est-ce qui vous ferait dire que ça les vaut ? Pour ce montant, chaque poste est étudié, installé, et vos équipes sont formées à bien le régler.' },
      { c0_text: 'C’est une remarque importante. Qu’est-ce qui vous fait dire ça ? Je préfère comprendre avant de vous expliquer ce que ce prix couvre, comme le SAV sous 48 h ou la garantie.',
        c1_text: 'C’est possible, il y a plusieurs offres sur le marché. Comparons-les élément par élément : de votre côté, l’installation est-elle prévue ? Chez nous elle est comprise, comme la garantie de 5 ans.',
        c2_text: 'Votre doute est légitime. Quelles sont vos priorités pour vos équipes : le confort, la santé, l’image auprès des salariés ? Avec 1 700 € par poste, étude, installation et formation incluses, on peut regarder si la solution y répond.' },
      { c0_text: 'Je vois. Votre budget prévu était de combien, à peu près ? Je vous demande ça pour voir comment l’offre, installation et garantie comprises, se situe par rapport à vos attentes.',
        c1_text: 'Très bien. Qu’est-ce qui est compris dans ce prix-là ? Je veux m’assurer qu’on compare bien les mêmes prestations, parce que nous incluons la livraison, la pose et un service après-vente rapide.',
        c2_text: 'Qu’est-ce qui vous fait hésiter ? Si on détaille, ce sont dix postes complets à 1 700 € chacun, avec une étude de vos besoins au départ et 30 jours pour essayer.' },
      { c0_text: 'Je comprends. Qu’est-ce qui vous fait dire que le prix est trop élevé ? Regardons ce qui compte pour vous et ce que notre offre comprend.',
        c1_text: 'J’entends. Cette autre offre, vous l’avez sous les yeux ? Si on la compare poste par poste avec la nôtre, garantie et installation comprises, on comprendra d’où vient la différence.',
        c2_text: 'C’est normal de se poser la question pour un tel montant. Qu’est-ce qui est le plus important pour vous dans ce projet ? Nos 17 000 € couvrent dix postes équipés, installés et suivis par un SAV en 48 h.' },
      { c0_text: 'Vous avez bien fait d’en parler. Trop cher pour quel usage, selon vous ? Ce poste sert huit heures par jour pendant des années, et il est garanti cinq ans.',
        c1_text: 'Je comprends que vous compariez. Qu’est-ce qui vous a plu dans l’autre proposition ? Chez nous, vous avez l’étude ergonomique et la formation des équipes en plus, ce qui change souvent la donne.',
        c2_text: 'Sur quel point avez-vous un doute : le matériel, le service ou le montant global ? Les 17 000 € comprennent l’étude, l’installation et la formation, soit 1 700 € par poste.' },
      { c0_text: 'Qu’entendez-vous par trop cher ? Par rapport à ce que vous aviez prévu, ou par rapport à autre chose ? Pour ce prix, vos collaborateurs ont un équipement durable, installé chez vous et garanti.',
        c1_text: 'Ah, intéressant. Vous savez si leur garantie dure aussi cinq ans et si le montage est inclus ? Ce sont souvent ces détails qui expliquent un écart de prix.',
        c2_text: 'Je comprends que ce soit un vrai investissement. Qu’attendez-vous de cette solution pour être sûr qu’elle en vaut la peine ? Ensemble, on peut regarder ce que comprend chacun des dix postes, à 1 700 € l’unité.' }
    ],

    's2-2.7': [
      { c0_text: 'Je comprends tout à fait, c’est votre direction qui va trancher. Qu’est-ce qu’elle va regarder en premier : le montant, ou ce que l’équipement va changer pour les équipes ? Pour vous aider, je peux vous préparer une fiche qui montre que le pack revient à 1 700 € par poste, installation, étude ergonomique et garantie comprises.' },
      { c0_text: 'Je vois, il faut que vous puissiez défendre le projet en interne. Quels arguments votre direction attend-elle d’habitude pour valider ce type d’achat ? On peut détailler ensemble : 1 700 € par poste, tout compris, pour un poste utilisé tous les jours pendant au moins cinq ans.' },
      { c0_text: 'Je comprends parfaitement la difficulté de présenter un tel budget. Afin de vous aider, pourriez-vous me dire quels critères votre direction privilégie : le coût global, le bien-être des équipes ou la réduction des absences ? Je vous transmettrai ensuite une synthèse détaillant ce que comprend l’offre, soit 1 700 € par poste avec installation, garantie et formation.' },
      { c0_text: 'D’accord, je comprends, c’est pas vous qui signez au final. Qu’est-ce qui risque de coincer chez votre direction ? Si c’est le montant, on peut le ramener à 1 700 € le poste, avec la pose et la garantie, et je vous fais un petit document récapitulatif pour votre réunion.' },
      { c0_text: 'Je comprends. Qu’est-ce qui pourrait faire hésiter votre direction ? Je peux vous aider avec un récapitulatif clair : 1 700 € par poste, installation et garantie incluses.' },
      { c0_text: 'C’est un vrai budget, je l’entends. Aujourd’hui, combien de vos collègues se plaignent du dos ou de leur installation ? Mettre ça en face des 17 000 € peut parler à votre direction, d’autant que le prix comprend l’étude, l’installation, la formation et 5 ans de garantie.' },
      { c0_text: 'Je comprends que vous ayez besoin d’arguments solides. Votre direction est-elle surtout sensible au coût, ou plutôt aux conditions de travail ? Selon sa priorité, on peut lui présenter l’investissement poste par poste ou montrer ce que coûtent déjà la fatigue et les arrêts. Je peux même vous accompagner lors de la présentation si cela vous aide.' },
      { c0_text: 'Bien sûr, il faut que ça tienne la route face à votre direction. Qu’est-ce qui vous semble le plus difficile à justifier ? Ensemble, on peut préparer un dossier simple : le prix par poste, tout ce qui est inclus, l’essai de 30 jours et le SAV sous 48 h, pour qu’elle décide en connaissant tout le détail.' },
      { c0_text: 'Je comprends. Quand vous dites que ce sera dur à justifier, est-ce le montant total qui gêne, ou ce que la direction va en retirer ? Le pack, c’est 1 700 € par poste avec installation et garantie. Regardons vos priorités et mettons-les face à l’investissement pour que vous ayez du concret à présenter.' },
      { c0_text: 'Votre direction va vouloir savoir ce qu’elle gagne, et c’est normal. Qu’est-ce qui pose problème aujourd’hui dans vos bureaux ? Si l’on compare à périmètre égal, avec l’étude ergonomique, la pose et la formation incluses, vous verrez que 1 700 € par poste reste cohérent, et je peux vous donner un comparatif écrit.' }
    ],

    's3-3.3': [
      { c0_text: 'Oui, c’est faisable avant la fin du mois. On valide la commande pour réserver la date ?',
        c1_text: 'On part sur 5 postes pour commencer, ou vous équipez tout de suite les 10 ?',
        c2_text: 'Parfait, tout est calé. Je lance la commande ?' },
      { c0_text: 'Tout à fait, nous pouvons livrer d’ici la fin du mois. Souhaitez-vous que je lance la commande dès aujourd’hui ?',
        c1_text: 'Préférez-vous équiper d’abord 5 postes, ou les 10 en une seule fois ?',
        c2_text: 'Nous avons donc 10 postes, installés et garantis 5 ans, au prix convenu. On peut signer ?' },
      { c0_text: 'Oui, c’est possible. Je réserve ce créneau et on passe commande ?',
        c1_text: 'Qu’est-ce qui vous conviendrait le mieux : démarrer avec 5 postes ou installer directement les 10 ?',
        c2_text: 'Si je résume, la solution, le nombre de postes et le tarif vous conviennent. Je prépare le bon de commande ?' },
      { c0_text: 'Avant la fin du mois, pas de souci. On part là-dessus ?',
        c1_text: 'Cinq postes maintenant, ou les dix d’un coup : qu’est-ce que vous préférez ?',
        c2_text: 'Tout est bon pour vous ? Alors je vous propose de lancer la commande.' },
      { c0_text: 'Une livraison avant la fin du mois est envisageable. Puis-je enregistrer votre commande pour vous garantir ce délai ?',
        c1_text: 'Souhaitez-vous équiper en priorité cinq postes, ou bien l’ensemble des dix dès à présent ?',
        c2_text: 'Nous sommes d’accord sur les dix postes, l’installation et la garantie. Puis-je vous transmettre le bon de commande à signer ?' },
      { c0_text: 'Oui, on peut vous livrer avant la fin du mois. Vous voulez qu’on bloque la date maintenant ?',
        c1_text: 'Vous seriez plutôt pour équiper 5 postes cette fois et les autres plus tard, ou les 10 dès maintenant ?',
        c2_text: 'Récapitulons : 10 postes, installation comprise, garantie 5 ans. On valide ensemble ?' },
      { c0_text: 'C’est jouable pour la fin du mois. Est-ce qu’on confirme la commande aujourd’hui pour tenir ce délai ?',
        c1_text: 'On commence par les 5 postes les plus urgents, ou vous préférez tout équiper d’un coup ?',
        c2_text: 'Puisque tout est validé, est-ce que vous souhaitez que je lance la commande ?' },
      { c0_text: 'Oui, la fin du mois, c’est possible. Est-ce que vous voulez qu’on parte sur ce planning ?',
        c1_text: 'Pour vous, ce serait plutôt 5 postes ou 10 postes ?',
        c2_text: 'Nous avons validé ensemble les postes, l’installation et le prix. Je vous envoie le bon de commande ce soir ?' },
      { c0_text: 'Bien sûr, c’est faisable. On signe aujourd’hui pour que je vous garantisse la livraison avant la fin du mois ?',
        c1_text: 'Vous partez sur la version à 5 postes ou sur la version complète à 10 ?',
        c2_text: 'Très bien, on est d’accord sur tout. Est-ce que je peux enregistrer la commande ?' },
      { c0_text: 'Oui, nous avons de la disponibilité avant la fin du mois. Je vous la réserve ?',
        c1_text: 'Lequel des deux scénarios vous parle le plus : 5 postes pour démarrer, ou les 10 directement ?',
        c2_text: 'Dix postes, la pose et la garantie de cinq ans : tout est validé. On passe à la commande ?' }
    ],

    's3-3.4': [
      { c0_text: 'Elle demande quand ce sera livré : elle s’imagine déjà avec le produit, c’est un signal d’achat.',
        c1_text: 'Il aurait dû s’arrêter de vendre et lui demander si elle voulait commander. En continuant à présenter d’autres produits, il risque de la perdre.',
        c2_text: 'Oui, c’est possible avant la fin du mois. On lance la commande maintenant pour réserver la livraison ?' },
      { c0_text: 'C’est un signal d’achat : sa question porte sur la livraison, donc sur l’après-achat.',
        c1_text: 'Il fallait saisir l’occasion et vérifier si elle était prête à acheter. Au lieu de ça, il relance son discours et noie la cliente sous de nouvelles infos.',
        c2_text: 'Tout à fait, nous pouvons vous livrer avant la fin du mois. Est-ce que cela vous convient pour qu’on valide la commande ?' },
      { c0_text: 'La cliente se projette dans la mise en place : s’interroger sur le délai de livraison traduit un intérêt concret pour l’achat.',
        c1_text: 'Le vendeur aurait dû répondre précisément à la question puis proposer de conclure. En poursuivant sa présentation, il détourne l’attention de la cliente et laisse passer le moment propice à la décision.',
        c2_text: 'Oui, une livraison avant la fin du mois est tout à fait envisageable. Souhaitez-vous que nous fixions la date dès aujourd’hui ?' },
      { c0_text: 'Elle se projette : elle demande un délai de livraison.',
        c1_text: 'Il devait répondre et proposer la commande, car elle était déjà prête.',
        c2_text: 'Oui, c’est possible. On valide ?' },
      { c0_text: 'Bah elle demande si ça peut arriver avant la fin du mois, donc elle pense déjà au moment où elle va l’avoir. C’est un signe qu’elle veut acheter.',
        c1_text: 'Il aurait dû lui répondre clairement sur la date et lui demander si on passe commande. Là, il part sur les lampes et les repose-pieds, alors qu’elle était presque décidée.',
        c2_text: 'Oui, aucun problème pour la fin du mois ! Vous voulez qu’on bloque la livraison dès maintenant ?' },
      { c0_text: 'Un intérêt fort : elle s’inquiète du calendrier, ce qui veut dire qu’elle envisage sérieusement d’acheter.',
        c1_text: 'Il devait tester son envie d’avancer, par exemple en lui proposant de valider. En ajoutant des accessoires, il complique la décision et peut faire naître de nouvelles hésitations.',
        c2_text: 'Oui, nous pouvons livrer avant la fin du mois. Si ce délai vous va, je prépare le bon de commande ?' },
      { c0_text: 'Elle pose une question sur le « quand », pas sur le produit : elle se voit déjà équipée.',
        c1_text: 'Il aurait fallu arrêter de présenter et lui proposer de conclure. Continuer à parler, c’est prendre le risque qu’elle change d’avis ou qu’elle se sente poussée à dépenser plus.',
        c2_text: 'Bien sûr, la fin du mois, c’est faisable. On part sur cette date ensemble ?' },
      { c0_text: 'La question sur la date de livraison montre que la cliente se voit déjà utiliser la solution.',
        c1_text: 'Le vendeur n’a pas entendu le signal. Il aurait dû confirmer la date et demander à la cliente si elle souhaitait passer commande, plutôt que de remettre de nouveaux produits sur la table.',
        c2_text: 'Oui, c’est possible. Est-ce que vous voulez que nous réservions ce créneau pour lancer votre commande ?' },
      { c0_text: 'C’est un signal verbal d’achat : la cliente s’intéresse au délai, elle pense à la suite.',
        c1_text: 'Il aurait dû comprendre que c’était le moment de conclure. Au lieu de proposer la décision, il rajoute des produits, ce qui disperse la cliente.',
        c2_text: 'Oui, on peut vous livrer d’ici la fin du mois. Je vous propose de valider la commande aujourd’hui pour être sûrs de tenir ce délai, ça vous va ?' },
      { c0_text: 'Elle montre qu’elle est intéressée et qu’elle organise déjà la livraison dans son planning.',
        c1_text: 'Son rôle était de saisir cette question pour aller vers la conclusion. En relançant sa présentation, il rate l’occasion et retarde l’achat.',
        c2_text: 'Avant la fin du mois, oui, c’est possible. On fixe la date de livraison ensemble ?' }
    ],

    's3-3.5': [
      { why: 'Je prends la réponse 1. Elle répond à la question sur le délai et demande clairement au client s’il veut commander. Comme on ne sait pas encore s’il a vraiment décidé, c’est plus prudent de vérifier.' },
      { why: 'Je choisirais la réponse 2 si le client a déjà dit oui sur le principe. Il ne reste que la date à fixer, et lui laisser choisir entre deux périodes le fait avancer sans le brusquer.' },
      { why: 'La réponse 1 me paraît plus adaptée : elle saisit le signal en donnant un délai précis, puis vérifie explicitement l’engagement du client. Elle est claire et lui laisse la liberté de dire oui ou non.' },
      { why: 'Réponse 2 : le client a validé l’achat, il ne reste qu’à choisir la période. La question est simple et c’est lui qui décide.' },
      { why: 'Moi je dirais la 1, parce que le client demande juste quand on peut démarrer, ça ne veut pas dire qu’il a signé. Donc on lui donne la date et on lui demande s’il est partant, c’est simple et direct.' },
      { why: 'La réponse 2, car elle propose deux options concrètes qui reviennent toutes les deux à un accord. Si le client a déjà montré qu’il était convaincu, c’est le moyen le plus naturel de passer à l’organisation.' },
      { why: 'Les deux saisissent le signal. Je choisis la 1 parce qu’elle permet de vérifier que le client est prêt avant d’entrer dans le calendrier, mais la 2 marcherait aussi s’il avait déjà validé l’achat.' },
      { why: 'Je préfère la réponse 2. La question « On pourrait démarrer quand ? » montre que le client s’organise déjà ; en lui proposant de choisir la période qui convient à son organisation, on respecte sa liberté tout en concluant.' },
      { why: 'La 1 est plus sûre : elle propose une date, puis pose une question fermée qui demande la décision. On ne suppose pas que le client a déjà dit oui, et la proposition est très nette.' },
      { why: 'J’opte pour la réponse 2. Si le client a déjà validé le principe pendant l’entretien, revenir avec « voulez-vous commander ? » serait inutile. Lui faire choisir entre la semaine prochaine et le début du mois répond à son signal, reste clair et lui laisse le dernier mot.' }
    ],

    's3-3.6': [
      { c0_text: 'Oui, l’installation avant la fin du mois, c’est possible. Si je récapitule : 10 postes complets, installation et garantie 5 ans comprises. Est-ce qu’on part là-dessus ? [Le client acquiesce.] Très bien. Je vous envoie le bon de commande cet après-midi, et dès réception je vous appelle pour caler le jour de l’installation.' },
      { c0_text: 'Tout à fait, nous pouvons installer vos 10 postes d’ici la fin du mois. On valide la commande ensemble ? (Le client dit oui.) Parfait, je vous remercie. Je vous fais parvenir le contrat demain matin, et je vous propose qu’on fixe dès maintenant la date d’installation : le 24 ou le 27, qu’est-ce qui vous arrange ?' },
      { c0_text: 'Oui, une installation avant la fin du mois est tout à fait réalisable. Nous avons validé ensemble le pack de dix postes, l’installation et la garantie de cinq ans. Souhaitez-vous que nous lancions la commande ? [Silence, puis accord du client.] Je vous en remercie. Je vous adresse aujourd’hui le bon de commande et, à réception de votre signature, notre équipe vous contactera pour planifier l’intervention.' },
      { c0_text: 'Oui, c’est possible avant la fin du mois. On lance la commande ? [Oui.] Parfait, je vous envoie le bon ce soir et on fixe la date d’installation demain par téléphone.' },
      { c0_text: 'Ah oui, ça, on peut le faire ! Donc on est bien d’accord : les 10 postes, posés chez vous, garantis 5 ans. Ça vous va qu’on parte là-dessus ? [Le client : « Oui. »] Super. Je prépare tout aujourd’hui, je vous envoie le devis à signer et je vous rappelle jeudi pour bloquer le jour de l’installation.' },
      { c0_text: 'Bonne nouvelle, nous avons encore des créneaux avant la fin du mois. Puisque la garantie et l’installation vous conviennent, souhaitez-vous qu’on réserve un de ces créneaux pour vos 10 postes ? [Le client accepte.] Très bien. Je vous propose le mardi 26 au matin. Je vous envoie dans l’heure la confirmation par mail avec le récapitulatif de la commande.' },
      { c0_text: 'Oui, si on valide aujourd’hui, l’installation avant la fin du mois est possible. Est-ce que cela vous convient ? [Le client hoche la tête.] Parfait. Il nous reste juste à choisir la date : plutôt en début ou en fin de semaine prochaine ? [Le client choisit le début de semaine.] C’est noté, je vous envoie le bon de commande et la date d’installation par écrit cet après-midi.' },
      { c0_text: 'Oui, nous pouvons organiser la pose avant la fin du mois. Si ce calendrier vous va, on part sur les 10 postes ? [Silence.] Parfait. Je prépare la commande aujourd’hui et je reviens vers vous demain pour vous confirmer la date d’installation.' },
      { c0_text: 'C’est faisable, oui. Pour être sûr qu’on est alignés : vous prenez le pack de 10 postes, nous installons tout avant la fin du mois, et vous bénéficiez de la garantie de 5 ans. Je peux enregistrer la commande ? [Le client répond oui.] Merci pour votre confiance. Vous recevrez demain le récapitulatif à signer, et notre technicien vous appellera dans la semaine pour convenir de l’heure d’arrivée.' },
      { c0_text: 'Avant la fin du mois, oui, sans problème. Vous avez validé la solution, la garantie et l’installation : est-ce qu’on peut passer à la commande ? [Le client : « Oui, allons-y. »] Très bien. Je vous propose qu’on se rappelle vendredi à 10 h pour signer le bon de commande ensemble et arrêter la date précise de l’installation.' }
    ],

    's3-3.7': [
      { c0_text: 'Est-ce que cette table vous convient pour qu’on passe la commande ?',
        c1_text: 'Vous préférez la version en chêne ou celle en noyer ?',
        c2_text: 'Nous avons donc le canapé trois places, la livraison et le montage. On finalise ?',
        c3_text: 'Il ne nous reste plus qu’à choisir le tissu. Lequel vous plaît le plus ?' },
      { c0_text: 'On peut démarrer l’abonnement dès ce mois-ci, est-ce que c’est bon pour vous ?',
        c1_text: 'Vous partez plutôt sur la formule mensuelle ou sur l’engagement annuel ?',
        c2_text: 'Si je résume : 15 licences, la formation de vos équipes et le support inclus. On active votre compte ?',
        c3_text: 'Dernière chose : à quelle adresse mail voulez-vous recevoir vos identifiants ?' },
      { c0_text: 'Souhaitez-vous que je vous inscrive à la prochaine session ?',
        c1_text: 'La session de mars ou celle d’avril, laquelle vous arrange le plus ?',
        c2_text: 'Nous avons validé le programme, les deux jours de formation et le financement. Je confirme votre inscription ?',
        c3_text: 'Tout est calé, il me reste seulement à savoir quel jour de la semaine vous convient le mieux pour commencer.' },
      { c0_text: 'Alors, on la commande ?',
        c1_text: 'Vous la prenez en achat comptant ou en location longue durée ?',
        c2_text: 'Récapitulons : la version hybride, la reprise de votre ancien véhicule et l’entretien inclus pendant trois ans. On signe le bon de commande ?',
        c3_text: 'Il ne vous reste plus qu’à choisir la couleur de la carrosserie. Laquelle vous tente ?' },
      { c0_text: 'Ce projet de cuisine vous convient-il pour que nous lancions la fabrication ?',
        c1_text: 'Pour le plan de travail, ce sera plutôt quartz ou bois massif ?',
        c2_text: 'Les meubles, l’électroménager et la pose sont validés, au prix dont on a parlé. Est-ce qu’on peut signer le devis ?',
        c3_text: 'Si tout vous va, il ne reste qu’à choisir les poignées. Vous avez une préférence ?' },
      { c0_text: 'On peut mettre ce contrat en place dès aujourd’hui, ça vous va ?',
        c1_text: 'Préférez-vous la formule essentielle ou la formule confort ?',
        c2_text: 'Vous êtes couvert pour l’habitation, la responsabilité civile et l’assistance, pour 32 € par mois. Je prépare votre contrat ?',
        c3_text: 'Pour terminer, vous préférez être prélevé le 5 ou le 10 du mois ?' },
      { c0_text: 'On valide votre commande de viennoiseries pour samedi ?',
        c1_text: 'Vous les voulez plutôt en mini format ou en taille normale ?',
        c2_text: 'Donc 50 croissants, 30 pains au chocolat et une livraison à 8 h samedi. Je note la commande ?',
        c3_text: 'Il ne me manque que le prénom à inscrire sur le gâteau. Qu’est-ce que je mets ?' },
      { c0_text: 'Est-ce qu’on part sur ces dix postes ?',
        c1_text: 'Vous démarrez avec cinq postes, ou vous équipez tout le plateau d’un coup ?',
        c2_text: 'Nous avons validé les dix postes, l’installation et la garantie cinq ans. Je lance la commande ?',
        c3_text: 'Tout le reste est validé, alors parlons finition : vous voyez plutôt des bureaux blancs ou en bois clair ?' },
      { c0_text: 'Vous êtes prêt à vous inscrire aujourd’hui ?',
        c1_text: 'Vous préférez l’abonnement à l’année ou au mois ?',
        c2_text: 'L’accès illimité, deux séances de coaching et les cours collectifs : tout vous convient. On remplit le formulaire d’inscription ?',
        c3_text: 'Quel jour souhaitez-vous faire votre première séance ?' },
      { c0_text: 'Est-ce que vous me donnez votre accord pour démarrer le chantier ?',
        c1_text: 'On commence les travaux en juin, ou vous préférez attendre septembre ?',
        c2_text: 'Pour récapituler : la rénovation de la salle de bain, les matériaux choisis et un chantier de trois semaines. Est-ce qu’on peut valider le devis ?',
        c3_text: 'Il nous reste juste à choisir le carrelage : lequel retenez-vous parmi ceux que vous avez vus ?' }
    ]
  },

  mauvaises: {
    's1-1.4': [
      { c0_risk: 'Il fait très beau aujourd’hui, le client a dû bien profiter de sa matinée.', c0_replay: 'Vous avez trouvé facilement pour vous garer ?' },
      { c0_risk: 'Il n’y a aucun risque, le client a demandé le prix, il faut le lui donner.', c0_replay: 'C’est 17 000 €, mais je peux vous faire une remise de 10 % si vous signez aujourd’hui.' },
      { c0_risk: 'prix trop tôt valeur besoin', c0_replay: 'question besoin postes' }
    ],
    's1-1.5': [
      { why: 'Moi je préfère les sièges en cuir, ils sont plus jolis dans un bureau.' },
      { why: 'L’annonce 1 est meilleure parce qu’elle est honnête : le vendeur reconnaît que c’est cher, le client appréciera sa franchise.' },
      { why: 'posture structure vocabulaire clarté' }
    ],
    's1-1.7': [
      { c0_text: 'Nous avons ouvert un nouveau magasin près de la gare.', c1_text: 'Le parking est gratuit le samedi.', c2_text: 'Nos bureaux sont ouverts de 9 h à 18 h.' },
      { c0_text: 'Euh, alors, ce siège fait 690 €, je sais que c’est cher, désolé.', c1_text: 'Le poste complet coûte 1 900 €, mais je peux vous faire un geste si vous voulez.', c2_text: 'C’est 17 000 €, c’est beaucoup, mais nos coûts de fabrication sont élevés.' },
      { c0_text: 'bénéfice prix garantie', c1_text: 'confort 1 900 € installation', c2_text: 'pack 17 000 € SAV' }
    ],
    's2-2.3': [
      { c0_text: 'Les sièges arrivent par camion le mardi.', c1_text: 'Notre entreprise existe depuis vingt ans.' },
      { c0_text: 'Ce n’est que 38 centimes par jour, presque rien, ne regardez pas le prix total.', c1_text: 'Je vous fais 1 500 € par poste au lieu de 1 700 €, ça vous va ?' },
      { c0_text: '690 0,38 jour confort', c1_text: '17 000 1 700 poste' }
    ],
    's2-2.4': [
      { error0: 'Il porte une cravate bleue', error1: 'Le client est arrivé en retard', error2: 'Il pleuvait ce jour-là', error3: 'Le bureau est mal éclairé' },
      { error0: 'Il aurait dû faire une remise plus grande', error1: 'Il a raison de dire que ce n’est pas cher', error2: 'Il parle trop poliment', error3: 'Il devrait expliquer encore plus ses coûts' },
      { error0: 'faux pas prix', error1: 'client cher', error2: 'vendeur réponse', error3: 'erreur commerciale' }
    ],
    's2-2.5': [
      { crit0: 'Le client a l’air pressé de rentrer chez lui.', crit1: 'La salle de réunion est agréable.' },
      { crit0: 'Il faut dire au client que le concurrent est moins sérieux que nous.', crit1: 'Il faudrait proposer tout de suite une remise pour s’aligner.' },
      { crit0: 'écart concurrent', crit1: 'périmètre différences' }
    ],
    's2-2.6': [
      { c0_text: 'Vous avez vu le match hier soir ?', c1_text: 'Il y a des travaux sur l’autoroute en ce moment.', c2_text: 'Je pars en vacances la semaine prochaine.' },
      { c0_text: 'Non, ce n’est pas cher du tout, vous vous trompez.', c1_text: 'Pas de problème, je m’aligne sur leur prix et je vous fais 10 % de remise.', c2_text: 'Je sais que c’est beaucoup, désolé, mais nos coûts de production sont très élevés.' },
      { c0_text: 'question frein valeur', c1_text: 'périmètre garantie SAV', c2_text: '1 700 € poste installation' }
    ],
    's2-2.7': [
      { c0_text: 'Votre bureau est très bien décoré, vous avez choisi les couleurs vous-même ?' },
      { c0_text: 'Je comprends, je peux descendre à 15 000 € si ça aide votre direction à signer.' },
      { c0_text: 'direction valeur 1 700 € poste levier' }
    ],
    's3-3.3': [
      { c0_text: 'Vous êtes venu en train ou en voiture ?', c1_text: 'Il fait froid ce matin.', c2_text: 'Vous avez des vacances prévues ?' },
      { c0_text: 'Oui, et je vous montre aussi nos lampes et nos repose-pieds, ils sont super.', c1_text: 'Prenez les 10, c’est évident, vous ne le regretterez pas, signez ici.', c2_text: 'Avant de conclure, je voulais vous reparler de toutes les options de nos bureaux.' },
      { c0_text: 'livraison commande directe', c1_text: 'alternative 5 10', c2_text: 'récapitulatif validé commande' }
    ],
    's3-3.4': [
      { c0_text: 'La cliente porte un joli manteau.', c1_text: 'Il aurait dû lui proposer un café à son arrivée.', c2_text: 'Il fait beau, vous avez de la chance pour votre trajet.' },
      { c0_text: 'Elle ne donne aucun signal, elle pose juste une question.', c1_text: 'Il a bien fait de présenter plus de produits, il pourra vendre plus.', c2_text: 'Oui, et vous avez vu nos lampes de bureau ? Et nos supports d’écran sont en promotion.' },
      { c0_text: 'signal livraison', c1_text: 'conclure argumentaire', c2_text: 'oui commande' }
    ],
    's3-3.5': [
      { why: 'La boutique a l’air très bien rangée et lumineuse.' },
      { why: 'Aucune des deux : il faut d’abord représenter tous les produits au client pour être sûr qu’il a bien tout compris.' },
      { why: 'signal engagement clarté liberté' }
    ],
    's3-3.6': [
      { c0_text: 'Vous avez prévu quelque chose ce week-end ? On annonce du soleil, ce serait l’occasion de sortir un peu.' },
      { c0_text: 'Oui, normalement c’est possible. Mais avant, laissez-moi vous montrer nos nouveaux repose-pieds et nos lampes, ils compléteraient bien votre commande. Et si vous signez aujourd’hui, je vous fais 10 % de remise.' },
      { c0_text: 'signal récapitulatif décision commande date' }
    ],
    's3-3.7': [
      { c0_text: 'Il pleut beaucoup en ce moment.', c1_text: 'Vous habitez loin d’ici ?', c2_text: 'J’ai bien aimé le film d’hier soir.', c3_text: 'Le café de la machine est froid.' },
      { c0_text: 'Signez ici, vous n’allez pas laisser passer une offre pareille.', c1_text: 'Vous ne voulez vraiment pas réfléchir encore un peu ?', c2_text: 'Je vous redonne toutes les caractéristiques du produit une dernière fois.', c3_text: 'Et sinon, je ne vous ai pas encore montré nos autres modèles.' },
      { c0_text: 'directe accord', c1_text: 'choix option A B', c2_text: 'récapitulatif validé décision', c3_text: 'détail couleur' }
    ]
  }
};
