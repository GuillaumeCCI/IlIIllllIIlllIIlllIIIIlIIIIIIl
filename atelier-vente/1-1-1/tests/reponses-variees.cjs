/* Réponses justes, formulées autrement que les corrigés types : ce qu'un
 * apprenant pourrait écrire. L'indicateur doit les reconnaître (test
 * indicateur.test.cjs). Une ligne par étape : accueillir, questionner,
 * reformuler, traiter, contrôler, enchaîner. */
module.exports = {
  // S2 D · « Je préfère prendre mon temps avant de me décider. »
  // Huit réponses justes par attitude, dans l'ordre de ATELIER_S2.attitudes.
  's2-D': {
    attitudes: [
      [ // Jugement / évaluation
        'Vous avez bien raison de ne pas vous précipiter.',
        'C’est très sage de prendre le temps de réfléchir.',
        'C’est dommage, vous risquez de passer à côté d’une belle occasion.',
        'Vous avez tort d’attendre, les prix vont augmenter.',
        'C’est une bonne idée de bien peser votre décision.',
        'Je trouve que c’est une attitude très raisonnable.',
        'Ce serait une erreur de trop attendre.',
        'Vous faites bien, on ne prend pas ce genre de décision à la légère.'
      ],
      [ // Interprétation
        'En fait, vous n’êtes pas encore convaincu par notre offre.',
        'Au fond, je pense que c’est le prix qui vous retient.',
        'Si vous voulez attendre, c’est que quelque chose vous inquiète.',
        'J’imagine que vous voulez comparer avec la concurrence.',
        'Vous avez sûrement peur de vous tromper.',
        'En réalité, vous devez en parler à quelqu’un avant de décider.',
        'Je crois que vous doutez encore de l’utilité de notre solution.',
        'C’est sans doute parce que vous avez déjà été déçu par le passé.'
      ],
      [ // Soutien / consolation
        'Ne vous inquiétez pas, rien ne presse.',
        'Prenez tout votre temps, il n’y a aucune urgence.',
        'Pas de souci, c’est tout à fait normal.',
        'Ne vous en faites pas, beaucoup de clients font comme vous.',
        'Aucun problème, je reste à votre disposition quand vous serez prêt.',
        'Rassurez-vous, vous n’avez aucune pression de ma part.',
        'C’est bien normal, tout le monde a besoin de réfléchir.',
        'Soyez tranquille, l’offre reste valable.'
      ],
      [ // Investigation / enquête
        'Qu’est-ce qui vous ferait avancer plus vite ?',
        'De combien de temps pensez-vous avoir besoin ?',
        'Sur quels points souhaitez-vous encore réfléchir ?',
        'Pourquoi préférez-vous attendre ?',
        'Qu’est-ce qui vous fait hésiter aujourd’hui ?',
        'Avez-vous besoin d’informations supplémentaires pour décider ?',
        'Quand pensez-vous pouvoir prendre votre décision ?',
        'Qui d’autre doit donner son avis sur ce projet ?'
      ],
      [ // Solution / décision
        'Prenez la formule sans engagement, vous déciderez ensuite.',
        'Je vous propose un essai gratuit de quinze jours.',
        'Je vous conseille de réserver dès maintenant pour bloquer le tarif.',
        'Vous pouvez commencer par la version de base et évoluer après.',
        'Je vous envoie le devis, et vous signerez quand vous voudrez.',
        'Le mieux serait de faire un test sur un mois.',
        'Je vous recommande de démarrer avec un petit volume.',
        'Signez aujourd’hui, vous aurez quatorze jours pour vous rétracter.'
      ],
      [ // Compréhension / reformulation
        'Vous préférez avancer à votre rythme, je comprends.',
        'Si je comprends bien, vous voulez prendre le temps de réfléchir avant de vous engager.',
        'Vous avez besoin de temps pour être sûr de votre choix, c’est bien cela ?',
        'Pour vous, il est important de ne pas décider dans la précipitation.',
        'J’entends que vous souhaitez mûrir votre décision.',
        'Autrement dit, vous ne voulez pas vous décider trop vite.',
        'Vous tenez à prendre votre décision tranquillement, si je vous suis bien.',
        'Ce que j’entends, c’est que vous voulez réfléchir avant de dire oui.'
      ]
    ],
    // [choix, justification]
    choix: [
      ['Compréhension / reformulation', 'Elle respecte son rythme et montre que je l’ai écouté, sans le pousser. C’est ce qui installe la confiance au premier contact.'],
      ['Compréhension / reformulation', 'Reformuler garde la relation ouverte, car le client se sent compris. Le jugement ou la solution le braqueraient trop tôt.'],
      ['Compréhension / reformulation', 'Je choisis la compréhension parce qu’elle ne juge pas et ne force pas la décision. L’investigation pourra venir ensuite, une fois la confiance installée.'],
      ['Compréhension / reformulation', 'Au premier contact, le client doit sentir qu’on l’écoute vraiment. La reformulation le permet, alors que le soutien minimise ce qu’il ressent.']
    ],
    // Une réponse juste, mais d'une autre attitude : elle ne doit pas compter.
    mauvaises: [
      ['Qu’est-ce qui vous fait hésiter ?', 'Prenez la formule sans engagement.', 'Vous avez raison d’attendre.', 'Vous préférez prendre votre temps, je comprends.', 'Ne vous inquiétez pas, rien ne presse.', 'En fait, vous n’êtes pas convaincu.']
    ]
  },

  // S3 1.4 · « Je vais réfléchir » : [hypothèse, question]. Les bonnes
  // couvrent chacune un frein différent ; les mauvaises acceptent le report,
  // soufflent la réponse ou restent vagues.
  's3-1.4': {
    bonnes: [
      ['Le client hésite peut-être parce que le prix dépasse le budget qu’il avait prévu.', 'Bien sûr. Qu’est-ce qui vous fait hésiter aujourd’hui ?'],
      ['Il ne peut sans doute pas décider seul : il doit en parler à son associé ou à sa direction.', 'Je comprends. Qui d’autre doit donner son avis sur ce projet ?'],
      ['Il n’est probablement pas convaincu que notre solution lui sera vraiment utile.', 'D’accord. Qu’est-ce qui vous manque pour être convaincu ?'],
      ['Je pense qu’il a peur de se tromper et de regretter son choix.', 'Tout à fait. Qu’est-ce qui vous inquiète le plus dans cette décision ?'],
      ['Il est peut-être en train de comparer avec une autre offre, chez un concurrent.', 'Bien entendu. Sur quels points comparez-vous les différentes propositions ?'],
      ['Ce n’est pas une priorité pour lui en ce moment, il a d’autres urgences.', 'Je comprends. Qu’est-ce qui passe avant ce projet pour vous en ce moment ?'],
      ['Le « je vais réfléchir » cache une objection qu’il n’ose pas dire, sans doute sur le coût.', 'Pour vous aider à y voir clair, qu’est-ce qui vous retient encore ?'],
      ['Il craint que la mise en place soit compliquée et lui prenne trop de temps.', 'C’est normal. Comment imaginez-vous la mise en place de votre côté ?'],
      ['Il a eu une mauvaise expérience avec un autre fournisseur et il reste méfiant.', 'Je vous comprends. Qu’est-ce qui vous ferait davantage confiance ?'],
      ['Il lui manque probablement des informations pour se décider.', 'Volontiers. De quelles informations auriez-vous besoin pour avancer ?']
    ],
    mauvaises: [
      ['Il n’a pas le temps.', 'D’accord, je vous rappelle dans un mois.'],
      ['Je ne sais pas.', 'Très bien, prenez le temps de réfléchir et rappelez-moi.'],
      ['Le client est pénible.', 'Vous êtes sûr que ce n’est pas trop cher pour vous ?'],
      ['Il veut juste réfléchir, c’est normal.', 'On verra plus tard alors.']
    ]
  },

  // S3 1.6 · une réponse par contexte, dans l'ordre de content-s3.js.
  's3-1.6': [
    [ // Mobilier de bureau
      'Je vous entends, et c’est vrai que vos chaises font encore le travail.',
      'Comment vos salariés se sentent-ils en fin de journée, notamment au niveau du dos ?',
      'Si je vous suis bien, tant que personne ne se plaint, vous ne voyez pas de raison de changer.',
      'Nos sièges sont garantis 5 ans et vous pouvez les tester 30 jours gratuitement ; chez nos clients, les arrêts pour mal de dos ont diminué.',
      'Qu’en pensez-vous ?',
      'Je peux passer la semaine prochaine faire le diagnostic gratuit de deux ou trois postes, ça vous irait ?'
    ],
    [ // Immobilier
      'Je comprends tout à fait, c’est normal de comparer les agences.',
      'Qu’est-ce qui est le plus important pour vous : vendre vite ou vendre au meilleur prix ?',
      'Autrement dit, vous voulez être sûrs que nos frais valent ce qu’ils coûtent.',
      'Chez nous, une maison se vend en 45 jours en moyenne, contre 90 ailleurs, et presque toujours au prix affiché.',
      'Est-ce que ça vous paraît plus clair comme ça ?',
      'Je vous propose de revenir samedi avec une comparaison écrite des deux offres.'
    ],
    [ // Assurance des pros
      'D’accord, c’est une bonne chose d’être déjà couvert.',
      'Savez-vous ce qui se passe pour vos revenus si un accident vous empêche de travailler pendant un mois ?',
      'Si j’ai bien compris, vous êtes content de votre assureur et vous n’avez pas envie de tout changer.',
      'Je vous propose simplement de comparer gratuitement votre contrat au nôtre en 20 minutes : chez nous, vous touchez un revenu pendant l’arrêt.',
      'Ça vous semble utile de vérifier ?',
      'On peut se voir jeudi soir avec votre contrat actuel, qu’en dites-vous ?'
    ],
    [ // Logiciel de gestion
      'Je comprends, vous avez déjà beaucoup de travail en ce moment.',
      'Combien d’heures par semaine passez-vous sur vos devis et vos factures ?',
      'Si je comprends bien, vous avez peur de perdre du temps à cause du changement.',
      'Justement, nos équipes s’occupent de transférer vos données, tout est prêt en deux heures, et nos clients gagnent quatre heures par semaine.',
      'Est-ce que cela vous rassure sur le temps à y consacrer ?',
      'Je vous ouvre l’essai gratuit de 14 jours dès aujourd’hui et on fixe la formation mardi.'
    ],
    [ // Vélo électrique
      'Je vous comprends, ce n’est pas une petite dépense.',
      'Vous le comparez à quoi, à un autre vélo ou au budget que vous vous étiez fixé ?',
      'Si je résume, vous voulez être certain que ce vélo vaut son prix pour vos trajets.',
      'Vous allez économiser environ 80 euros par mois d’essence et de parking, et la ville vous verse une prime de 300 euros.',
      'Vu comme ça, est-ce que le prix vous paraît plus raisonnable ?',
      'Prenez-le une journée pour faire votre trajet demain, et on en reparle.'
    ],
    [ // Décoration intérieure
      'Bien sûr, c’est tout à fait normal de décider ensemble.',
      'Qu’est-ce qui sera le plus important pour votre conjoint dans ce projet ?',
      'Si je comprends bien, vous voulez qu’il soit d’accord avec le projet avant de signer.',
      'Je vous prépare une image en 3D de votre salon et vous emportez les échantillons ; le devis reste valable 30 jours.',
      'Est-ce que cela vous aidera à lui présenter le projet ?',
      'Venez tous les deux samedi matin, je vous montrerai le projet en détail.'
    ]
  ]
};
