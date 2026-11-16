/* Réponses d'apprenants pour tester le score estimatif (indicateur.test.cjs).
 *   justes    : réponses correctes, formulées de façons variées (registres,
 *               longueurs, apostrophes droites ou typographiques) ;
 *   mauvaises : une solution, un jugement, un ajout (3 / 10 au plus) ;
 *   motsCles  : les bonnes idées en mots isolés, sans phrase (6 / 10 au plus,
 *               et toujours moins que les réponses justes).
 * Une entrée par exercice, champ par champ (c0_text = le premier client).
 */
module.exports = {
  justes: {
    's3-3.1': [
      { c0_text: 'Une côte terrible ?', c1_text: 'Épuisant ?', c2_text: 'La loterie ?' },
      { c0_text: 'Terrible, la côte ?', c1_text: 'C’était épuisant ?', c2_text: 'C’est toujours la loterie ?' },
      { c0_text: 'Une côte terrible, c’est-à-dire ?', c1_text: 'Épuisant, l’an dernier ?', c2_text: 'La loterie, les livraisons ?' },
      { c0_text: 'Terrible ?', c1_text: 'Pas comme l’an dernier ?', c2_text: 'Toujours la loterie ?' },
      { c0_text: 'Une côte vraiment terrible ?', c1_text: 'Épuisant à ce point ?', c2_text: 'Les livraisons, une loterie ?' },
      { c0_text: '25 kilomètres, avec une côte terrible ?', c1_text: 'Épuisant, c\'est-à-dire ?', c2_text: 'Une loterie ?' },
      { c0_text: 'La côte est terrible ?', c1_text: 'Vous dites épuisant ?', c2_text: 'Vous dites la loterie ?' },
      { c0_text: 'Une côte terrible, à la fin ?', c1_text: 'Épuisant, comment ça ?', c2_text: 'La loterie, à ce point ?' },
      { c0_text: 'Terrible, cette côte ?', c1_text: 'C\'était épuisant ?', c2_text: 'C’est la loterie, vraiment ?' },
      { c0_text: 'Une côte terrible ? C’est-à-dire ?', c1_text: 'Épuisant ? Qu’est-ce qui l’était ?', c2_text: 'La loterie ? C’est-à-dire ?' },
      // Le mot du client, puis une courte relance : la forme la plus naturelle à l'oral.
      { c0_text: 'Une côte terrible ? Racontez-moi.', c1_text: 'C’était épuisant ? Qu’est-ce qui s’est passé ?', c2_text: 'Toujours la loterie ? Qu’est-ce qui se passe ?' },
      { c0_text: 'Une côte terrible ? Qu’entendez-vous par là ?', c1_text: 'Épuisant ? Vous pouvez m’en dire plus ?', c2_text: 'La loterie, les livraisons ? Qu’entendez-vous par là ?' },
      { c0_text: 'Une côte terrible, c’est-à-dire ? Elle est longue, raide ?', c1_text: 'Pas comme l’an dernier ? Qu’est-ce qui était épuisant ?', c2_text: 'Les livraisons, c’est la loterie ? Racontez-moi une livraison type.' },
      { c0_text: '25 kilomètres avec une côte terrible ? Comment ça se passe pour vous ?', c1_text: 'L’an dernier, c’était épuisant ? Racontez-moi comment ça s’est passé.', c2_text: 'Toujours la loterie, vos livraisons ? Qu’est-ce qui coince le plus ?' },
      { c0_text: "Une cote terrible ? C'est-a-dire ?", c1_text: "C'etait epuisant ? Qu'est-ce qui vous a fatiguee ?", c2_text: "La loterie ? C'est-a-dire ?" },
      { c0_text: 'une côte terrible? cad?', c1_text: 'épuisant? comment ça?', c2_text: 'la loterie? cad?' },
      { c0_text: 'Une côte terrible ? Qu’est-ce qui est le plus dur ?', c1_text: 'Épuisant, vos vacances ? Qu’est-ce qui a coincé ?', c2_text: 'La loterie ? Qu’est-ce qui ne va pas, concrètement ?' },
      { c0_text: 'Terrible à quel point, cette côte ?', c1_text: 'Épuisant pour toute la famille ? Racontez-moi.', c2_text: 'La loterie, avec votre fournisseur actuel ? Comment ça se passe ?' }
    ],
    's3-3.2': [
      { c0_text: 'Vous avez l’impression de toujours arriver trop tard, et c’est décourageant.', c1_text: 'Vous en avez assez de revenir pour le même bruit, vous avez le sentiment qu’on ne vous prend pas au sérieux.', c2_text: 'Vous êtes déçue de ces formations et vous avez peur de dépenser encore pour rien.' },
      { c0_text: 'Trois coups de cœur et à chaque fois le carrelage n’est plus là : vous êtes découragée.', c1_text: 'Revenir trois fois pour le même problème, c’est usant, vous êtes agacé.', c2_text: 'Vous avez payé deux formations qui n’ont rien apporté, vous êtes méfiante maintenant.' },
      { c0_text: 'Vous êtes frustrée de le voir partir à chaque coup de cœur.', c1_text: 'Vous êtes exaspéré : on vous dit que c’est réglé et le bruit revient.', c2_text: 'Vous craignez de payer encore une formation dont vos équipes ne retireront rien.' },
      { c0_text: 'J’entends que vous êtes lasse de ces coups de cœur qui ne donnent rien.', c1_text: 'Vous avez le sentiment de revenir pour rien, et ça vous énerve.', c2_text: 'Vous êtes échaudée par les deux formations de l’an dernier.' },
      { c0_text: 'Ça doit être décourageant d’avoir un coup de cœur et de voir le carrelage vous échapper.', c1_text: 'Vous êtes à bout, ce bruit revient toujours malgré la réparation.', c2_text: 'Vous avez l’impression d’avoir dépensé votre budget pour rien.' },
      { c0_text: 'Vous avez peur de rater encore le prochain carrelage qui vous plaira.', c1_text: 'Vous êtes mécontent, c’est la troisième fois que vous revenez.', c2_text: 'Vous êtes déçue, vos équipes n’ont rien retiré de ces formations.' },
      { c0_text: 'Vous sentez que vous arrivez toujours trop tard, c\'est frustrant.', c1_text: 'Vous avez le sentiment qu\'on ne vous écoute pas au garage.', c2_text: 'Vous n\'avez plus confiance après ces deux formations payées pour rien.' },
      { c0_text: 'Vous êtes fatiguée de chercher sans jamais réussir à commander.', c1_text: 'Revenir encore et encore, vous en avez marre.', c2_text: 'Vous avez du mal à faire confiance à une nouvelle formation.' },
      { c0_text: 'Trois carrelages trouvés, et chaque fois plus disponibles : vous êtes découragée.', c1_text: 'Trois fois le même bruit : vous êtes à bout de patience, vous ne vous sentez pas pris au sérieux.', c2_text: 'Deux formations l’an dernier et aucun résultat : vous êtes déçue et inquiète de recommencer.' },
      { c0_text: 'C’est usant de rater chaque coup de cœur, le temps de se décider.', c1_text: 'Ça doit être pénible de revenir pour un bruit qu’on vous disait réparé.', c2_text: 'Vous redoutez de dépenser encore sans que vos équipes en retirent quoi que ce soit.' }
    ],
    's3-3.3': [
      { c0_text: 'Si je résume : vous perdez du temps à répondre au téléphone pendant que vous coiffez, et environ trois clientes par semaine ne viennent pas. Vos coiffeuses doivent voir le planning sur leur téléphone. Et il faut que ce soit simple, après l’application trop compliquée. C’est bien ça ?',
        c1_text: 'Si je résume : votre machine tombe en panne presque chaque week-end, vous servez environ trois cents cafés par jour, vos serveurs changent souvent donc il faut qu’elle soit simple, et la place derrière le comptoir est réduite. C’est bien ça ?' },
      { c0_text: 'Donc, le téléphone vous interrompt pendant les coupes, trois rendez-vous manqués par semaine, un planning consultable par vos cinq coiffeuses sur leur portable, et un outil facile. Ai-je bien compris ?',
        c1_text: 'Donc : des pannes le week-end, 300 cafés par jour, des serveurs qui changent souvent, et peu de place au comptoir. Ai-je bien compris ?' },
      { c0_text: 'Je récapitule. Vous êtes dérangée par les appels quand vous coiffez. Trois clientes par semaine ne viennent pas à leur rendez-vous. Vos coiffeuses doivent consulter le planning sur leur téléphone. Et vous voulez quelque chose de simple. Est-ce que j’ai oublié quelque chose ?',
        c1_text: 'Je récapitule. La machine tombe en panne le week-end, quand il y a le plus de monde. Vous faites trois cents cafés par jour. Les serveurs changent, il faut une prise en main facile. Et le comptoir est petit. Est-ce que j’ai oublié quelque chose ?' },
      { c0_text: 'Si j’ai bien compris, vos priorités sont d’arrêter de répondre au téléphone en coiffant, de réduire les absences, environ trois par semaine, de partager le planning avec votre équipe sur leur téléphone, et d’avoir un outil simple. C’est ça ?',
        c1_text: 'Si j’ai bien compris, il vous faut une machine fiable, qui ne lâche pas le week-end, capable de faire trois cents cafés par jour, facile à prendre en main pour vos serveurs et compacte. C’est ça ?' },
      { c0_text: "Pour résumer : trop d'appels pendant les coupes, trois rendez-vous non honorés chaque semaine, un planning à voir sur le téléphone des coiffeuses, et une solution simple, pas comme l'appli d'avant. C'est bien ça ?",
        c1_text: "Pour résumer : des pannes chaque week-end, environ 300 cafés par jour, du personnel qui change souvent, et très peu d'espace derrière le comptoir. C'est bien ça ?" },
      { c0_text: 'Vous perdez du temps au téléphone en coiffant ; trois clientes par semaine oublient leur rendez-vous ; vos coiffeuses ont besoin du planning sur leur portable ; et la simplicité compte, après votre première expérience. Est-ce que je résume bien ?',
        c1_text: 'Votre machine lâche au moment du coup de feu du week-end ; vous servez trois cents cafés par jour ; vos nouveaux serveurs doivent s’en servir facilement ; et la place est réduite. Est-ce que je résume bien ?' },
      { c0_text: 'Alors, si je reprends : le téléphone vous coupe pendant les coupes, trois lapins par semaine, vos coiffeuses doivent voir l’agenda sur leur téléphone, et il faut que ce soit simple. Il y a autre chose d’important pour vous ?',
        c1_text: 'Alors, si je reprends : des pannes le week-end, trois cents cafés par jour, des serveurs qui changent et doivent vite la prendre en main, et un comptoir étroit. Il y a autre chose d’important pour vous ?' },
      { c0_text: 'En résumé, quatre points : moins d’interruptions par le téléphone, moins de rendez-vous manqués (trois par semaine), un planning sur le téléphone des cinq coiffeuses, et un outil simple. C’est correct ?',
        c1_text: 'En résumé, quatre points : la fiabilité le week-end, un volume de trois cents cafés par jour, une utilisation simple pour des serveurs qui changent, et une machine compacte. C’est correct ?' },
      { c0_text: 'Ce que je retiens : répondre au téléphone pendant que vous coiffez vous fait perdre du temps, trois clientes par semaine ne viennent pas, vos coiffeuses veulent le planning sur leur téléphone, et vous voulez un outil facile. Je ne me trompe pas ?',
        c1_text: 'Ce que je retiens : la machine tombe en panne le week-end, il faut tenir trois cents cafés par jour, vos serveurs changent souvent et doivent l’utiliser facilement, et vous avez peu de place. Je ne me trompe pas ?' },
      { c0_text: 'Si je résume bien : les appels vous dérangent quand vous coiffez, trois rendez-vous manqués chaque semaine, le planning doit être consultable par vos coiffeuses sur leur téléphone, et l’outil doit être simple, pas comme l’application déjà essayée. Vous confirmez ?',
        c1_text: 'Si je résume bien : des pannes presque chaque week-end, trois cents cafés par jour, des serveurs qui se renouvellent et une prise en main facile, et un comptoir réduit. Vous confirmez ?' }
    ],
    's4-4.2': [
      { c1_verifier: 'Quand vous dites pas trop loin, c’est par rapport à quoi ?' },
      { c1_verifier: 'Monsieur, pas trop loin, ça veut dire combien de temps de trajet pour vous ?' },
      { c1_verifier: 'Vous travaillez de nuit : est-ce que le trajet du retour vous préoccupe ?' },
      { c1_verifier: 'Monsieur, qu’est-ce qui compte le plus pour vous dans ce projet ?' },
      { c1_verifier: 'Je vois que cette maison ne vous convainc pas. Qu’est-ce qui vous gêne ?' },
      { c1_verifier: "Pas trop loin de quoi, exactement ? De l'hôpital ?" },
      { c1_verifier: 'Quand vous rentrez à 23 heures, combien de temps de route est acceptable pour vous ?' },
      { c1_verifier: 'Pouvez-vous me préciser ce que vous entendez par pas trop loin ?' },
      { c1_verifier: 'J’ai l’impression que ma proposition ne vous parle pas, est-ce que je me trompe ?' },
      { c1_verifier: 'Monsieur, la distance est importante pour vous, par rapport à votre travail de nuit ?' }
    ],
    's4-4.3': [
      { c0_pourquoi: 'Quand elle revient sur « pas trop loin », Nadia reprend les mots exacts de M. Benali et s’adresse enfin à lui. Il se sent écouté et explique son vrai besoin : rentrer en sécurité après ses gardes de nuit. Ensuite, Nadia résume tout et le couple valide.' },
      { c0_pourquoi: 'Nadia fait un écho de « pas trop loin » et vérifie. M. Benali, qui était ignoré, décroise les bras et parle du danger de s’endormir au volant. Puis son résumé est confirmée par les deux.' },
      { c0_pourquoi: 'Parce qu’il arrête de juger et reformule. Le mari se sent pris en compte, il se confie : le vrai critère, c’est vingt minutes maximum depuis l’hôpital. La synthèse finale permet au couple de valider.' },
      { c0_pourquoi: 'Sa question sur « pas trop loin » reprend le mot du client au lieu de le contredire, donc M. Benali s’ouvre. On découvre que le problème n’est pas l’habitude mais la fatigue du trajet de nuit. Le résumé récapitule et fait valider le besoin par le couple.' },
      { c0_pourquoi: "Elle revient sur ce qu'a dit Monsieur avec ses propres mots. Monsieur se détend, il raconte qu'il s'est déjà endormi au volant. Ensuite Nadia résume et les deux confirment : c'est la sécurité qui compte." },
      { c0_pourquoi: 'Nadia écoute enfin M. Benali, qu’elle avait écarté. Grâce à la reformulation, le vrai besoin apparaît : la sécurité sur la route après le travail. La synthèse transforme ce besoin en premier critère, validé par les deux.' },
      { c0_pourquoi: 'Avant, Nadia parlait et proposait. À la fin elle reprend « pas trop loin » et pose une vraie question : le client se sent compris et livre la vraie raison, ses gardes de nuit. Ensuite, elle résume, et le couple dit oui.' },
      { c0_pourquoi: 'Sa question sur « pas trop loin » montre qu’il a entendu M. Benali, ce qui fait tomber la tension. Le besoin réel apparaît : moins de vingt minutes de trajet. Le résumé reformule le tout et obtient l’accord du couple, donc les recherches seront dans la bonne cible.' },
      { c0_pourquoi: 'Elle s’adresse directement au mari et reprend ses mots. Celui-ci décroise les bras et explique le danger du trajet de nuit. Puis Nadia fait une synthèse validée : maintenant elle sait quoi chercher.' },
      { c0_pourquoi: 'Nadia passe enfin à la compréhension : elle reformule ce que dit M. Benali et vérifie. M. Benali se sent écouté et révèle son vrai besoin, la sécurité. Son résumé, confirmée par les deux, fixe les critères.' }
    ],
    's4-4.4': [
      { c0_l3: 'Pas trop loin… La distance compte beaucoup pour vous, Monsieur. Par rapport à quoi, surtout ?' },
      { c0_l3: 'Monsieur, quand vous dites pas trop loin, c’est-à-dire ?' },
      { c0_l3: 'Pas trop loin, d’accord. Qu’est-ce qui est important pour vous dans la distance ?' },
      { c0_l3: 'La distance compte pour vous. Pouvez-vous me dire par rapport à quoi ?' },
      { c0_l3: 'Pas trop loin ? Qu’entendez-vous par là, Monsieur ?' },
      { c0_l3: "Je note que la proximité est importante pour vous. Pourquoi, surtout ?" },
      { c0_l3: 'Pas trop loin de quoi, Monsieur ? De votre travail ?' },
      { c0_l3: 'Vous voulez rester proche. Qu’est-ce qui compte le plus pour vous là-dedans ?' },
      { c0_l3: 'Monsieur, pas trop loin, ça représente combien de temps de trajet pour vous ?' },
      { c0_l3: 'Si je comprends bien, la distance est un critère important. Dites-moi en plus, Monsieur ?' }
    ]
  },

  mauvaises: {
    's3-3.1': [
      { c0_text: 'Il vous faut un vélo avec un moteur puissant, je vous montre notre modèle.', c1_text: 'Je vous propose un club de vacances, c’est reposant.', c2_text: 'Notre offre de livraison est fiable, je vous propose un essai.' },
      { c0_text: 'Prenez la batterie longue durée, la côte ne sera plus un problème.', c1_text: 'Je vous conseille un séjour au calme, à la campagne.', c2_text: 'Je vous recommande de changer de fournisseur.' },
      { c0_text: 'Ne vous inquiétez pas, tout le monde a des côtes.', c1_text: 'C’est normal, les vacances en famille, c’est fatigant.', c2_text: 'Vous avez raison, changez de fournisseur.' }
    ],
    's3-3.2': [
      { c0_text: 'Il fallait vous décider plus vite, c’est tout.', c1_text: 'Ne vous inquiétez pas, cette fois on va trouver.', c2_text: 'Je vous propose notre formation, elle est bien meilleure.' },
      { c0_text: 'Je vous conseille de commander tout de suite la prochaine fois.', c1_text: 'Je vous propose une remise sur la réparation.', c2_text: 'Notre solution est garantie, vous ne perdrez pas votre argent.' },
      { c0_text: 'En fait, vous êtes trop lents à vous décider.', c1_text: 'Ça arrive à tout le monde, les voitures font du bruit.', c2_text: 'Vous auriez dû choisir de meilleures formations.' }
    ],
    's3-3.3': [
      { c0_text: 'Je vous propose notre logiciel de réservation à 29 euros par mois, il règle tout.', c1_text: 'Notre machine est la plus fiable du marché, je vous fais un devis.' },
      { c0_text: 'Vous avez raison, le téléphone c’est pénible. Prenez notre application.', c1_text: 'Il vous faut une machine plus grosse, avec notre garantie.' },
      { c0_text: 'Je vous recommande notre abonnement, avec un rappel automatique des rendez-vous par message.', c1_text: 'Je vous propose notre modèle compact, livré et installé gratuitement.' }
    ],
    's4-4.2': [
      { c1_verifier: 'En fait, vous êtes fatigué, il vous faut une maison tout près de l’hôpital.' },
      { c1_verifier: 'Ne vous inquiétez pas, je vous propose une maison à 10 minutes.' },
      { c1_verifier: 'Vous avez raison, c’est normal de vouloir être proche.' }
    ],
    's4-4.3': [
      { c0_pourquoi: 'Parce que Nadia propose enfin une maison moins chère.' },
      { c0_pourquoi: 'Il a raison d’insister, le client finit toujours par accepter.' },
      { c0_pourquoi: 'C’est normal, à la fin les clients se fatiguent.' }
    ],
    's4-4.4': [
      { c0_l3: 'Pas trop loin, comme tout le monde. Soyons réalistes, il faudra s’éloigner.' },
      { c0_l3: 'Je vous propose une maison à 25 minutes, c’est raisonnable.' },
      { c0_l3: 'Avec votre budget, ce n’est pas possible, désolé.' }
    ]
  },

  motsCles: {
    's3-3.1': { c0_text: 'côte', c1_text: 'épuisant', c2_text: 'loterie' },
    's3-3.2': { c0_text: 'découragée carrelage', c1_text: 'agacé bruit', c2_text: 'déçue formations' },
    's3-3.3': { c0_text: 'téléphone, rendez-vous, planning, simple', c1_text: 'pannes, 300, serveurs, place' },
    's4-4.2': { c1_verifier: 'loin nuit bras' },
    's4-4.3': { c0_pourquoi: 'écho sécurité synthèse' },
    's4-4.4': { c0_l3: 'loin monsieur' }
  },

  // Réponses justes, écrites par quelqu’un de fâché avec l’orthographe : sans accents,
  // au son (« sa », « tro », « koi »), mots collés (« cest », « darivé »), sans majuscule ni point.
  fautes: {
    's3-3.1': [
      { c0_text: 'une cote terible ? cest a dire ?', c1_text: 'cété épuisan ? qu esce qui vous a fatigé ?', c2_text: 'toujour la loteri ? coment sa se passe ?' },
      { c0_text: 'Une côtes térrible ? Raconté moi.', c1_text: 'Epuisent ? Cest a dire ?', c2_text: 'La lotterie ? Sa veut dire quoi ?' },
      { c0_text: 'une cote terrrible ?', c1_text: 'épuisant ? sa veu dire koi ?', c2_text: 'la louterie ? cad ?' },
      { c0_text: 'Une monté téribl ? Comment sa ?', c1_text: 'C etait epuissant ? Racontez moi', c2_text: 'Toujour la lotrie, les livraison ? Comment ça ?' }
    ],
    's3-3.2': [
      { c0_text: 'vous avé l impression darivé toujour tro tard, c décourajant', c1_text: 'vous en avez mare de revenir pour rien, vous avez le santiment de pas etre pris au serieu', c2_text: 'vous etes dessu par ces formation et vous avez peur de dépensé encor pour rien' },
      { c0_text: 'Vous ete décourager de le voir partir a chaque cou de coeur.', c1_text: 'Vous etes exaspéré, sa recomence a chaque fois.', c2_text: 'Vous etes déçu, vos équipe nont rien retirer des formations.' },
      { c0_text: 'Vous avez l\'impresion d\'arriver toujours trop tard et sa vous décourage', c1_text: 'Vous en avez asser de revenir pour le meme bruit', c2_text: 'Vous avez peur de payé encore pour rien apres ces deux formations' }
    ],
    's3-3.3': [
      { c0_text: 'si je résume, vous perdé du tant au téléfone pandant que vous coifé, 3 cliente par semaine vienne pas, vos coifeuse doive voir le planing sur leur portable et il faut un truc simple. cest bien sa ?',
        c1_text: 'si je resume votre machine tombe en pane presque chaque wikend, vous servé 300 café par jour, vos serveur change souvant donc elle doit etre simple et la plasse derriere le comptoire est réduite. cest bien sa ?' }
    ],
    's4-4.2': [
      { c1_verifier: 'quand vous dites pas tro loin, cest par raport a quoi ?' },
      { c1_verifier: 'Monsieur pas trop loin sa veux dire combien de tant de trajet pour vous ?' }
    ],
    's4-4.3': [
      { c0_pourquoi: 'kan elle revient sur pas trop loin nadia reprent les mot exact de M benali et sadresse enfin a lui. il se sent écouter et il explique son vrai besoin, rentré en sécurité aprés ses garde de nuit. ensuite elle résume tout et le couple valide.' },
      { c0_pourquoi: 'Nadia reformule pas tro loin et elle verifie. Monsieur qui etait ignoré décroise les bras et parle du dangé de sendormir au volan. La sintèse est confirmé par les deux.' }
    ],
    's4-4.4': [
      { c0_l3: 'pas tro loin... la distanse conte beaucoup pour vous monsieur, pas trop loin de quoi ?' },
      { c0_l3: 'Monsieur, quant vous dite pas trop loin, cest a dire ?' }
    ]
  }
};

/* S5 5.1 · A4 : la justification du premier choix (champ `why`). */
const A4 = module.exports;
A4.justes['s5-5.1'] = [
  { why: 'Inès tient compte du temps de la cliente, elle reformule ce qu’elle ressent et pose des questions précises pour ouvrir la découverte.' },
  { why: 'Inès est la seule à respecter le quart d’heure. Elle fait un reflet de « c’est moi qui prends » puis elle demande combien de pannes par mois.' },
  { why: "Ines va à l'essentiel car la cliente est pressée, elle montre qu'elle a compris sa situation et elle lui pose des questions sur les appareils." },
  { why: 'Je mets Inès en premier : elle prend en compte la contrainte de temps, elle reformule sans juger et elle creuse le besoin avec ses questions. Thomas et Hugo, eux, ne l’écoutent pas.' },
  { why: 'Inès a la meilleure note sur la grille : elle note le délai de 15 minutes, elle reformule l’émotion de la cliente et elle ouvre la découverte.' },
  { why: 'Contrairement à Hugo qui juge, Inès écoute : elle reprend le ressenti de la cliente, respecte son temps et lui demande des précisions sur les pannes.' },
  { why: 'Parce qu’Inès s’adapte au temps disponible, montre de l’empathie (elle est en première ligne face aux équipes) et cherche à cibler le besoin avec deux questions.' },
  { why: 'Inès : elle dit « un quart d’heure, c’est noté », elle reformule la situation pesante de la cliente puis elle l’invite à en dire plus.' },
  { why: "Inès coche presque tous les critères : elle respecte le temps, elle fait preuve d'écoute avec sa reformulation et elle lance la découverte avec des questions." },
  { why: 'Inès reste brève parce que la cliente regarde sa montre, elle comprend ce qu’elle vit au quotidien et ses questions sur les pannes vont permettre de découvrir son vrai besoin.' },
  { why: 'Elle seule, Inès, prend en compte la contrainte horaire, reformule ce que vit la cliente et l’interroge sur la fréquence des pannes.' },
  { why: 'Inès est la plus adaptée : elle est concise, elle reformule le stress de la cliente et elle demande des informations précises, alors que Thomas parle de lui.' }
];
A4.mauvaises['s5-5.1'] = [
  { why: 'Hugo, parce qu’il propose une intervention en 4 h et ça règle le problème.' },
  { why: 'Thomas présente bien son groupe : 12 agences depuis 1987, c’est rassurant.' },
  { why: 'Je la trouve sympa et souriante, elle a l’air agréable.' },
  { why: 'Hugo est sûr de lui et il connaît la maintenance préventive.' }
];
A4.motsCles['s5-5.1'] = { why: 'Inès temps' };
A4.fautes['s5-5.1'] = [
  { why: 'ines tien conte du tant de la cliente, elle reformul ce quel ressen et elle pose des question precise pour la decouverte' },
  { why: 'Inès respecte le car dheure, elle fai un reflet de cest moi qui prend et elle demande conbien de panne par mois' }
];

/* S5 5.2 · A5 : trois réponses par client (r1 compréhension, r2 signal,
 * r3 synthèse). `cas` : la fiche choisie (0 literie, 1 pièces auto, 2 mandat). */
const A5 = module.exports;
A5.justes['s5-5.2'] = [
  // M. Garnier
  { cas: 0, r1: 'Des mois de mauvaises nuits et le dos douloureux au réveil, ça doit vraiment peser sur vos journées.',
    r2: 'Le prix vous fait réagir. C’est un budget important et vous voulez être sûr que ça en vaut la peine, c’est ça ?',
    r3: 'Si je résume : votre priorité, c’est de soulager votre dos et de retrouver des nuits complètes. Il faut une fermeté qui convienne à vous deux, le 140 devient juste, et l’investissement doit être justifié. C’est bien ça ?' },
  { cas: 0, r1: 'Vous dormez mal depuis des mois et vous vous réveillez avec mal au dos. Ça doit être épuisant au quotidien.',
    r2: 'Je vois que le prix vous surprend. Qu’est-ce qui est important pour vous dans cet achat ?',
    r3: 'Donc si je comprends bien, vous voulez soulager votre dos et mieux dormir, trouver une fermeté qui plaise aussi à votre femme, plus de place qu’un 140, pour un budget qui en vaut la peine. J’ai bien compris ?' },
  { cas: 0, r1: "Se réveiller le dos en compote après des nuits difficiles, j'imagine que c'est pénible.",
    r2: "1 200 €, ça vous fait hésiter. Vous voulez être sûr que c'est justifié ?",
    r3: "Si je résume, vos nuits et votre dos d'abord, une fermeté à trouver à deux, un 140 trop étroit, et un prix qui doit valoir la peine. C'est ça ?" },
  { cas: 0, r1: 'Je comprends : depuis des mois votre sommeil est mauvais et votre dos vous fait souffrir le matin.',
    r2: 'Le montant vous fait réagir, c’est un vrai investissement. Vous voulez être certain qu’il en vaut la peine, c’est bien ça ?',
    r3: 'Pour résumer : vous cherchez à soulager votre dos et à retrouver le sommeil, avec une fermeté qui vous convienne tous les deux, plus de place qu’en 140, et une dépense justifiée. Ai-je oublié quelque chose ?' },
  // Mme Lefort
  { cas: 1, r1: 'Une pièce qui manque, c’est un pont bloqué et un planning qui déraille. Vous devez jongler toute la journée.',
    r2: 'Je vois que l’atelier a besoin de vous, je vais être bref. Trois questions, et si besoin on cale un autre moment, ça vous va ?',
    r3: 'Si je résume : votre priorité, c’est la fiabilité des livraisons, la bonne pièce au bon moment, parce que chaque pont immobilisé vous oblige à rappeler vos clients. Le prix vient après. C’est bien ça ?' },
  { cas: 1, r1: 'Une fois sur trois il manque une pièce et la voiture reste sur le pont : ça doit être très frustrant pour votre atelier.',
    r2: 'On vous appelle sans arrêt, je fais court : deux questions et je vous laisse, ou je repasse plus tard si vous préférez ?',
    r3: 'Donc, ce qui compte pour vous, ce sont des livraisons fiables et complètes, pour ne plus avoir de pont bloqué ni de clients à décaler. Le tarif passe après. J’ai bien compris ?' },
  { cas: 1, r1: "Des livraisons incomplètes et des voitures immobilisées, j'imagine que ça désorganise tout votre planning.",
    r2: "Je vois que vous êtes très sollicitée. Je vais à l'essentiel : une seule question, ça vous va ?",
    r3: "Si je résume, il vous faut la bonne pièce à temps, parce qu'un pont immobilisé vous coûte du temps et vous oblige à rappeler les clients, et le prix n'est pas la priorité. C'est ça ?" },
  { cas: 1, r1: 'Je comprends : votre fournisseur livre souvent avec une pièce manquante et vos ponts restent bloqués, c’est pénible au quotidien.',
    r2: 'L’atelier vous attend, je ne vais pas vous retenir. Je peux vous rappeler à un autre moment ?',
    r3: 'Pour résumer : la fiabilité des livraisons d’abord, pour ne plus avoir de voiture bloquée sur le pont ni de rendez-vous clients à reporter. Le prix vient après. Vous confirmez ?' },
  // Mme Duval
  { cas: 2, r1: 'Le jardin et l’étage deviennent difficiles au quotidien. La maison n’est plus adaptée à ce dont vous avez besoin aujourd’hui.',
    r2: '(Laisser un silence.) C’est une maison pleine de souvenirs. Ce n’est pas une décision facile.',
    r3: 'Si je résume : vous vendez parce que la maison n’est plus adaptée. Votre fils souhaite une vente rapide avant l’hiver, et pour vous, l’essentiel est d’avoir trouvé un appartement près de votre sœur avant de partir. Il faudra donc coordonner les deux calendriers. Est-ce que j’ai bien compris ?' },
  { cas: 2, r1: 'Entretenir le jardin et monter à l’étage avec vos genoux, ça devient pénible. Je comprends que la maison soit devenue trop grande.',
    r2: 'Vos enfants ont grandi ici, cette maison compte beaucoup pour vous. Prenons le temps.',
    r3: 'Donc, la maison n’est plus adaptée à cause du jardin et de l’étage, votre fils voudrait vendre vite, avant l’hiver, et vous voulez d’abord un appartement près de votre sœur. Il faudra organiser les deux en même temps. C’est bien ça ?' },
  { cas: 2, r1: "L'entretien du jardin et l'escalier sont devenus difficiles avec vos genoux, la maison n'est plus adaptée.",
    r2: "C'est toute une histoire de famille, cette maison. Je comprends que ce soit émouvant, rien ne presse.",
    r3: "Si je résume, la maison est devenue difficile à entretenir, votre fils est pressé de vendre avant l'hiver, et pour vous l'essentiel est d'être installée près de votre sœur. On doit coordonner tout ça. C'est juste ?" },
  { cas: 2, r1: 'Je comprends, avec vos genoux, l’étage et le jardin vous pèsent au quotidien.',
    r2: 'Je vois que ces souvenirs vous touchent. Ce n’est pas une décision facile, nous avons le temps.',
    r3: 'Pour résumer : la maison n’est plus adaptée, votre fils veut vendre rapidement, et vous souhaitez avoir trouvé un appartement proche de votre sœur avant de partir. Il faut accorder les deux calendriers. Ai-je bien compris ?' }
];
A5.mauvaises['s5-5.2'] = [
  { cas: 0, r1: 'Je vous propose notre matelas à mémoire de forme, idéal pour le dos.', r2: 'Ce n’est pas si cher pour cette qualité, et nous avons une remise.', r3: 'Prenez le matelas ferme en 160.' },
  { cas: 1, r1: 'Votre fournisseur n’est pas sérieux, nous livrons en 2 heures.', r2: 'Je vous présente notre entreprise : nous existons depuis 1990 et notre catalogue est complet.', r3: 'Je vous propose notre offre.' },
  { cas: 2, r1: 'Ne vous inquiétez pas, je vais faire une estimation.', r2: 'Ne vous en faites pas, c’est la vie. Parlons du prix.', r3: 'Je vous propose un mandat exclusif.' },
  { cas: 0, r1: 'C’est normal à votre âge.', r2: 'Garantie dix ans, ça vaut le coup.', r3: 'Essayez celui-là.' }
];
A5.motsCles['s5-5.2'] = { cas: 1, r1: 'pièce pont', r2: 'bref', r3: 'livraisons pont clients prix' };
A5.fautes['s5-5.2'] = [
  { cas: 0, r1: 'des mois de movaises nuit et le dos en conpote au reveil, sa doit peser sur vos journé',
    r2: 'le pris vous fait reagir, cest un gros budget et vous voulez etre sur que sa en vaut la peine cest sa ?',
    r3: 'si je resume votre priorité cest soulagé votre dos et dormir, une fermté qui vous va a tous les deux, le 140 est trop juste et le budget doit etre justifier. cest bien sa ?' },
  { cas: 2, r1: 'le jardin et letage devienne dificile avec vos genous, la maison est plus adapté',
    r2: 'cest une maison plaine de souvenir, cest pas une décision facile',
    r3: 'si je resume la maison est plus adapté, votre fis veut vendre vite avant lhiver et vous voulez un apartement pres de votre soeur, il faut coordoné les deux. cest bien sa ?' }
];
