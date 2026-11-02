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
      { c0_text: 'Une côte terrible ? C’est-à-dire ?', c1_text: 'Épuisant ? Qu’est-ce qui l’était ?', c2_text: 'La loterie ? C’est-à-dire ?' }
    ],
    's3-3.2': [
      { c0_text: 'Vous avez l’impression de toujours arriver trop tard, et c’est décourageant.', c1_text: 'Vous en avez assez de revenir pour le même bruit, vous avez le sentiment qu’on ne vous prend pas au sérieux.', c2_text: 'Vous êtes déçue de ces formations et vous avez peur de dépenser encore pour rien.' },
      { c0_text: 'Quinze visites et à chaque fois un autre acheteur passe devant : vous êtes découragés.', c1_text: 'Revenir trois fois pour le même problème, c’est usant, vous êtes agacé.', c2_text: 'Vous avez payé deux formations qui n’ont rien apporté, vous êtes méfiante maintenant.' },
      { c0_text: 'Vous êtes frustrés de vous faire doubler à chaque coup de cœur.', c1_text: 'Vous êtes exaspéré : on vous dit que c’est réglé et le bruit revient.', c2_text: 'Vous craignez de payer encore une formation dont vos équipes ne retireront rien.' },
      { c0_text: 'J’entends que vous êtes las de toutes ces visites qui ne donnent rien.', c1_text: 'Vous avez le sentiment de revenir pour rien, et ça vous énerve.', c2_text: 'Vous êtes échaudée par les deux formations de l’an dernier.' },
      { c0_text: 'Ça doit être décourageant d’avoir un coup de cœur et de voir l’appartement vous échapper.', c1_text: 'Vous êtes à bout, ce bruit revient toujours malgré la réparation.', c2_text: 'Vous avez l’impression d’avoir dépensé votre budget pour rien.' },
      { c0_text: 'Vous avez peur de rater encore le prochain appartement.', c1_text: 'Vous êtes mécontent, c’est la troisième fois que vous revenez.', c2_text: 'Vous êtes déçue, vos équipes n’ont rien retiré de ces formations.' },
      { c0_text: 'Vous sentez que vous arrivez toujours trop tard, c\'est frustrant.', c1_text: 'Vous avez le sentiment qu\'on ne vous écoute pas au garage.', c2_text: 'Vous n\'avez plus confiance après ces deux formations payées pour rien.' },
      { c0_text: 'Vous êtes fatigués de visiter sans jamais réussir à acheter.', c1_text: 'Revenir encore et encore, vous en avez marre.', c2_text: 'Vous avez du mal à faire confiance à une nouvelle formation.' },
      { c0_text: 'Quinze appartements visités, et chaque fois doublés : vous êtes découragés.', c1_text: 'Trois fois le même bruit : vous êtes à bout de patience, vous ne vous sentez pas pris au sérieux.', c2_text: 'Deux formations l’an dernier et aucun résultat : vous êtes déçue et inquiète de recommencer.' },
      { c0_text: 'C’est usant de se faire passer devant à chaque coup de cœur.', c1_text: 'Ça doit être pénible de revenir pour un bruit qu’on vous disait réparé.', c2_text: 'Vous redoutez de dépenser encore sans que vos équipes en retirent quoi que ce soit.' }
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
      { c0_pourquoi: 'En L7, Lucas reprend les mots exacts de M. Benali et s’adresse enfin à lui. Il se sent écouté et explique son vrai besoin : rentrer en sécurité après ses gardes de nuit. En L8, Lucas résume tout et le couple valide.' },
      { c0_pourquoi: 'Lucas fait un écho de « pas trop loin » et vérifie. M. Benali, qui était ignoré, décroise les bras et parle du danger de s’endormir au volant. Puis la synthèse de L8 est confirmée par les deux.' },
      { c0_pourquoi: 'Parce qu’il arrête de juger et reformule. Le mari se sent pris en compte, il se confie : le vrai critère, c’est vingt minutes maximum depuis l’hôpital. La synthèse finale permet au couple de valider.' },
      { c0_pourquoi: 'L7 reprend le mot du client au lieu de le contredire, donc M. Benali s’ouvre. On découvre que le problème n’est pas l’habitude mais la fatigue du trajet de nuit. L8 récapitule et fait valider le besoin par le couple.' },
      { c0_pourquoi: "Il revient sur ce qu'a dit Monsieur avec ses propres mots. Monsieur se détend, il raconte qu'il s'est déjà endormi au volant. Ensuite Lucas résume et les deux confirment : c'est la sécurité qui compte." },
      { c0_pourquoi: 'Lucas écoute enfin M. Benali, qu’il avait écarté. Grâce à la reformulation, le vrai besoin apparaît : la sécurité sur la route après le travail. La synthèse transforme ce besoin en premier critère, validé par les deux.' },
      { c0_pourquoi: 'Avant, Lucas parlait et proposait. En L7 il reprend « pas trop loin » et pose une vraie question : le client se sent compris et livre la vraie raison, ses gardes de nuit. En L8, il résume, et le couple dit oui.' },
      { c0_pourquoi: 'L7 montre qu’il a entendu M. Benali, ce qui fait tomber la tension. Le besoin réel apparaît : moins de vingt minutes de trajet. L8 reformule le tout et obtient l’accord du couple, donc les recherches seront dans la bonne cible.' },
      { c0_pourquoi: 'Il s’adresse directement au mari et reprend ses mots. Celui-ci décroise les bras et explique le danger du trajet de nuit. Puis Lucas fait une synthèse validée : maintenant il sait quoi chercher.' },
      { c0_pourquoi: 'Lucas passe enfin à la compréhension : il reformule ce que dit M. Benali et vérifie. M. Benali se sent écouté et révèle son vrai besoin, la sécurité. La synthèse de L8, confirmée par les deux, fixe les critères.' }
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
      { c0_text: 'Le marché est tendu, il faut vous décider plus vite.', c1_text: 'Ne vous inquiétez pas, cette fois on va trouver.', c2_text: 'Je vous propose notre formation, elle est bien meilleure.' },
      { c0_text: 'Je vous conseille de faire une offre dès la première visite.', c1_text: 'Je vous propose une remise sur la réparation.', c2_text: 'Notre solution est garantie, vous ne perdrez pas votre argent.' },
      { c0_text: 'En fait, vous êtes trop exigeants sur les appartements.', c1_text: 'Ça arrive à tout le monde, les voitures font du bruit.', c2_text: 'Vous auriez dû choisir de meilleures formations.' }
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
      { c0_pourquoi: 'Parce que Lucas propose enfin une maison moins chère.' },
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
    's3-3.2': { c0_text: 'découragés appartements', c1_text: 'agacé bruit', c2_text: 'déçue formations' },
    's3-3.3': { c0_text: 'téléphone, rendez-vous, planning, simple', c1_text: 'pannes, 300, serveurs, place' },
    's4-4.2': { c1_verifier: 'loin nuit bras' },
    's4-4.3': { c0_pourquoi: 'écho sécurité synthèse' },
    's4-4.4': { c0_l3: 'loin monsieur' }
  }
};
