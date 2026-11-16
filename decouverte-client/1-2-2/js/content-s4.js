/* SÉRIE 4 · LES MOTIVATIONS D'ACHAT (fiche M1.2.2, activité A3 « Les mots
 * qui trahissent les motivations », Bloom 4, ≈ 25 min).
 *
 * 4.1 : huit phrases de clients ; la motivation dominante (méthode
 * SONCASE), puis le mot qui met sur la piste. 4.2 : retour chez les Benali
 * (rencontrés en M1.2.1) ; les motivations de chacun, la hiérarchie des
 * besoins, puis la question qui départage. Corrigé de la fiche.
 */
(function (root) {
  'use strict';

  /* SONCASE : les sept motivations d'achat. */
  const SONCASE = [
    { id: 'securite', label: 'Sécurité', sub: 'Ne pas prendre de risque, être rassuré.' },
    { id: 'orgueil', label: 'Orgueil', sub: 'Image, statut, reconnaissance.' },
    { id: 'nouveaute', label: 'Nouveauté', sub: 'Dernière génération, innovation.' },
    { id: 'confort', label: 'Confort', sub: 'Simplicité, bien-être, gain de temps.' },
    { id: 'argent', label: 'Argent', sub: 'Prix, économies, rentabilité.' },
    { id: 'sympathie', label: 'Sympathie', sub: 'Confiance, relation, recommandation.' },
    { id: 'environnement', label: 'Environnement / éthique', sub: 'Valeurs, local, responsable.' }
  ];

  /* La situation de chaque phrase : qui vous êtes, qui parle. Neutre : elle
   * ne souffle pas la motivation, qui doit se lire dans les mots du client. */
  const CONTEXT = {
    'Le moteur': ['Le client', 'Vous êtes vendeur dans une concession automobile. Un client d’une soixantaine d’années hésite entre deux voitures d’occasion récentes, garées côte à côte.'],
    'Les collègues': ['Le client', 'Vous êtes vendeur dans un magasin d’informatique. Un cadre commercial cherche un ordinateur portable pour ses rendez-vous chez les clients.'],
    'La nouveauté': ['La cliente', 'Vous êtes vendeur dans une boutique de téléphonie. Une cliente d’une trentaine d’années vient changer de smartphone et passe en revue les modèles exposés.'],
    'Le paramétrage': ['La cliente', 'Vous êtes commercial chez un installateur de domotique. Une cliente, infirmière en horaires décalés, envisage de piloter le chauffage de sa maison depuis son téléphone.'],
    'Les économies': ['La cliente', 'Vous êtes conseiller chez un installateur de panneaux solaires. La propriétaire d’une maison des années 1990 vous reçoit pour un premier devis.'],
    'Le bon accueil': ['Le client', 'Vous êtes vendeur dans un magasin d’électroménager. Un client revient trois semaines après une première visite ; il cherche un lave-linge.'],
    'Les enfants': ['La cliente', 'Vous êtes conseiller chez un installateur d’alarmes. Une mère de famille vous reçoit chez elle, dans un lotissement, un mercredi après-midi.'],
    'Le local': ['La cliente', 'Vous êtes vendeur dans un magasin de meubles. Une cliente cherche une table de salle à manger et compare deux modèles de prix différents.']
  };
  const phrase = (tab, quote, answer, indice, why, portrait) => ({
    tab,
    scene: [{ info: (CONTEXT[tab] || [])[1] }, { quote, speaker: (CONTEXT[tab] || ['Le client'])[0], portrait }].filter(b => b.info !== undefined || b.quote),
    fields: [
      { id: 'motivation', type: 'choice', label: '1 · La motivation dominante', options: SONCASE, answer, why },
      { id: 'indice', type: 'input', label: '2 · Le mot ou l’expression qui vous met sur la piste', sub: 'Recopiez-le tel que le client l’a dit.', placeholder: 'Le mot indice…', max: 120, model: indice }
    ]
  });

  /* Le deuxième rendez-vous des Benali, avec Laura (fiche M1.2.2). */
  const BENALI = { dialogue: [
    { who: 'seller', label: 'Laura', face: 'laura', text: 'La dernière fois, vous m’avez dit que le trajet de M. Benali après ses gardes était la priorité. Qu’est-ce qui a changé depuis votre visite ?' },
    { who: 'client', label: 'Mme Benali', face: 'mme-benali', text: 'Rien, c’est toujours le cas. La maison à 15 minutes était parfaite… mais le jardin donnait sur une route passante. Avec les enfants, j’ai eu peur.' },
    { who: 'client', label: 'M. Benali', face: 'm-benali', text: 'Et franchement, la cuisine était neuve, tout était refait. Je n’ai pas envie de passer mes week-ends en travaux.' },
    { who: 'seller', label: 'Laura', face: 'laura', text: 'Les travaux, c’est rédhibitoire pour vous ?' },
    { who: 'client', label: 'M. Benali', face: 'm-benali', text: 'Pas rédhibitoire. Mais je travaille de nuit : mes week-ends, c’est pour récupérer.' },
    { who: 'client', label: 'Mme Benali', face: 'mme-benali', text: 'Moi, avec ma sœur qui vient souvent, une chambre d’amis ce serait bien. Mais si ça fait monter le prix…' },
    { who: 'seller', label: 'Laura', face: 'laura', text: 'Vous aviez un budget autour de 280 000 €. Il a bougé ?' },
    { who: 'client', label: 'Mme Benali', face: 'mme-benali', text: 'Non. On ne veut pas s’étrangler avec le crédit.' }
  ] };

  /* L'étape de la question : seulement les deux besoins à départager. */
  const DEPARTAGE = [
    { info: 'Les Benali n’ont pas tranché entre deux souhaits. Laura doit savoir lequel compte le plus avant de leur proposer des biens.' },
    { dialogue: BENALI.dialogue.filter(line => /travaux|chambre d’amis/.test(line.text) && line.who === 'client') }
  ];

  const NIVEAUX = [
    { id: 'prioritaire', label: 'Prioritaire', sub: 'Non négociable.' },
    { id: 'important', label: 'Important', sub: 'Compte, mais se discute.' },
    { id: 'secondaire', label: 'Secondaire', sub: 'Sacrifiable.' }
  ];
  const besoin = (id, label, answer, why) => ({ id, type: 'choice', label, options: NIVEAUX, answer, why });

  root.ATELIER_S4 = {

    /* ── 4.1 · Les mots qui trahissent ────────────────────────────────── */
    '4.1': {
      eyebrow: 'Les motivations d’achat · SONCASE',
      title: 'Les mots qui trahissent les motivations',
      subtitle: 'Pour chaque phrase, trouvez la motivation dominante du client, puis le mot qui vous a mis sur la piste.',
      welcome: { title: 'Les motivations d’achat (SONCASE)', rows: [
        ['shield', 'Sécurité, orgueil, nouveauté', 'Être rassuré ; son image ; le dernier modèle.'],
        ['armchair', 'Confort, argent, sympathie', 'Simple, tranquille ; économiser ; la confiance, la recommandation.'],
        ['sprout', 'Environnement, éthique', 'Ses valeurs : local, durable, responsable.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'Le client', text: 'Lisez sa phrase : la motivation se cache dans ses mots.' },
        { target: '.fm-main .fm-field', title: 'Deux réponses', text: 'La motivation dominante, puis le mot indice.' },
        { target: '.fm-actions', title: 'Phrase suivante', text: 'Huit phrases : le corrigé arrive après la dernière.' }
      ],
      caseNoun: 'Phrase',
      reviewLayout: 'rows',
      pills: true,
      oneField: true,
      countLabel: 'phrases analysées',
      submitLabel: 'Phrase suivante',
      cases: [
        phrase('Le moteur', 'Je veux être sûr que le moteur ne me lâchera pas au bout de deux ans.', 'securite', '« être sûr », « lâchera »', 'Il craint une panne coûteuse : il veut éviter le risque.', 'client-tasse'),
        phrase('Les collègues', 'Mes collègues ont tous un modèle haut de gamme, je ne veux pas avoir l’air de m’équiper au rabais.', 'orgueil', '« mes collègues », « au rabais »', 'Il se compare à ses collègues : c’est son image qui compte.', 'client-tasse'),
        phrase('La nouveauté', 'Vous avez quelque chose de vraiment nouveau ? Je veux la dernière génération.', 'nouveaute', '« nouveau », « dernière génération »', 'Elle veut ce qui vient de sortir : elle cherche l’innovation.', 'client-pull-clair'),
        phrase('Le paramétrage', 'Ce qui compte, c’est que ce soit simple : je n’ai pas envie de passer mes soirées à paramétrer.', 'confort', '« simple », « pas envie »', 'Elle ne veut ni effort ni temps perdu : elle cherche la facilité.', 'client-veste-verte'),
        phrase('Les économies', 'Combien je vais réellement économiser par an ?', 'argent', '« combien », « économiser »', 'Elle compte ce que l’installation lui rapportera : c’est la rentabilité.', 'client-chignon'),
        phrase('Le bon accueil', 'Je reviens parce que votre collègue m’avait très bien reçu la dernière fois.', 'sympathie', '« très bien reçu »', 'Il revient pour la relation : c’est la confiance qui le guide.', 'client-tasse'),
        phrase('Les enfants', 'Avec trois enfants, je ne veux plus avoir peur en les laissant seuls à la maison.', 'securite', '« peur »', 'Elle veut protéger sa famille : elle cherche à être rassurée.', 'client-cheveux-gris'),
        phrase('Le local', 'Si c’est fabriqué près d’ici et que l’entreprise respecte ses salariés, je veux bien payer un peu plus.', 'environnement', '« fabriqué près d’ici », « respecte »', 'Le local et le respect des salariés : ce sont ses valeurs.', 'client-pull-clair')
      ],
      keyPoint: 'À retenir : une motivation se repère dans les mots du client, pas dans ce qu’on imagine de lui. Notez le mot exact : c’est lui que vous reprendrez en argumentant.'
    },

    /* ── 4.2 · Retour chez les Benali ──────────────────────────────────── */
    '4.2': {
      eyebrow: 'Les motivations d’achat · Les Benali',
      title: 'Retour chez les Benali',
      subtitle: 'Les Benali, un couple, cherchent une maison avec jardin.\nAprès une première visite, Laura, leur conseillère immobilière, fait le point avec eux.\nRelevez les motivations de chacun, hiérarchisez leurs besoins, puis trouvez la question qui départage.',
      welcome: { title: 'Le deuxième rendez-vous', rows: [
        ['users', 'Les Benali', 'Un couple avec des enfants : ils cherchent une maison avec jardin, autour de 280 000 €.'],
        ['chat', 'Ce qui se passe', 'Après une première visite, Laura, leur conseillère, fait le point avec eux.'],
        ['pencil', 'Ce qui vous est demandé', 'Les motivations de chacun, la hiérarchie de leurs besoins, puis une question pour départager deux souhaits.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'L’échange', text: 'Lisez tout l’échange : chacun des deux conjoints parle de ce qui compte pour lui.' },
        { target: '.fm-main .fm-field', title: 'Vos réponses', text: 'Appuyez-vous sur leurs mots, pas sur votre avis.' },
        { target: '.fm-actions', title: 'Trois étapes', text: 'Les motivations, la hiérarchie, puis la question.' }
      ],
      caseNoun: 'Étape',
      reviewLayout: 'rows',
      pills: true,
      countLabel: 'étapes faites',
      nextLabel: 'Étape suivante',
      submitLabel: 'Voir le corrigé',
      reviewIntro: BENALI,
      reviewIntroTitle: 'L’échange',
      cases: [
        { tab: 'Les motivations', scene: BENALI, fields: [
          { id: 'madame', label: 'Les motivations de Mme Benali', sub: 'Avec les mots qui vous mettent sur la piste.', placeholder: 'Ex. : sécurité (« … »)', rows: 3,
            model: 'Sécurité (« avec les enfants, j’ai eu peur ») ; confort et famille (« une chambre d’amis ce serait bien ») ; argent (« on ne veut pas s’étrangler avec le crédit »).' },
          { id: 'monsieur', label: 'Les motivations de M. Benali', sub: 'Avec les mots qui vous mettent sur la piste.', placeholder: 'Ex. : confort (« … »)', rows: 3,
            model: 'Sécurité (le trajet après ses gardes) ; confort (« mes week-ends, c’est pour récupérer », « pas envie de passer mes week-ends en travaux »).' }
        ] },
        { tab: 'La hiérarchie', scene: BENALI, matrix: true, fields: [
          besoin('trajet', 'Moins de 20 min de trajet depuis l’hôpital', 'prioritaire', 'Non négociable, rappelé spontanément : « c’est toujours le cas ».'),
          besoin('jardin', 'Un jardin sûr pour les enfants', 'prioritaire', '« J’ai eu peur » : cela a fait écarter une maison « parfaite ».'),
          besoin('budget', 'Le budget de 280 000 €', 'prioritaire', '« On ne veut pas s’étrangler » : il est ferme.'),
          besoin('travaux', 'Pas de gros travaux', 'important', '« Pas rédhibitoire » : important, mais négociable.'),
          besoin('chambre', 'Une chambre d’amis', 'secondaire', '« Ce serait bien… mais si ça fait monter le prix » : sacrifiable.')
        ] },
        { tab: 'La question', scene: DEPARTAGE, fields: [
          { id: 'question', label: 'La question qui départage « pas de travaux » et « chambre d’amis »', sub: 'Quelle question Laura aurait-elle pu poser pour savoir lequel des deux compte le plus ?', placeholder: 'Ex. : « Si vous deviez choisir… »', rows: 4,
            help: 'Astuce : une question alternative (« entre… et…, lequel… ? ») oblige à choisir, sans souffler la réponse.',
            model: '« Si vous deviez choisir entre une maison sans travaux et une maison avec une chambre d’amis, laquelle prendriez-vous ? » C’est une question alternative, utile ici pour hiérarchiser.' }
        ] }
      ],
      keyPoint: 'À retenir : dans un couple, chacun a ses propres motivations. Les repérer séparément évite de proposer un bien qui convient à l’un seulement. Et chaque niveau de votre hiérarchie doit s’appuyer sur une phrase réellement prononcée.'
    }
  };
})(globalThis);
