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
    ]
  },

  motsCles: {
    's3-3.1': { c0_text: 'côte', c1_text: 'épuisant', c2_text: 'loterie' },
    's3-3.2': { c0_text: 'découragés appartements', c1_text: 'agacé bruit', c2_text: 'déçue formations' },
    's3-3.3': { c0_text: 'téléphone, rendez-vous, planning, simple', c1_text: 'pannes, 300, serveurs, place' }
  }
};
