/* SÉRIE 3 · LE BESOIN RÉEL (fiche M1.2.2, activité A2 « Du besoin exprimé
 * au besoin réel », Bloom 3, ≈ 25 min).
 *
 * Cinq clients, chacun avec une demande. Pour chacun : le besoin explicite
 * (ce qu'il demande), une hypothèse de besoin implicite, et la question qui
 * permet de la vérifier sans la souffler. L'hypothèse et la question sont
 * relues par le score estimatif (js/grilles.js). Corrigé de la fiche.
 */
(function (root) {
  'use strict';

  /* Un client : sa demande, et les trois champs. `models` : le corrigé. */
  const client = (tab, speaker, context, quote, portrait, models, explicite) => ({
    tab,
    scene: [{ info: context }, { quote, speaker, portrait }],
    fields: [
      { id: 'explicite', type: 'input', label: '1 · Le besoin explicite', sub: 'Ce qu’il demande, avec ses mots.', placeholder: 'Ce qu’il demande…', max: 160, model: explicite },
      { id: 'implicite', label: '2 · Un besoin implicite possible', sub: 'Votre hypothèse : ce qui se cache peut-être derrière sa demande.', placeholder: 'Peut-être que…', rows: 2, model: models[0] },
      { id: 'question', label: '3 · Votre question pour vérifier', sub: 'Une question ouverte, qui part de ses mots et ne souffle pas votre hypothèse.', placeholder: 'Ex. : « Qu’est-ce qui… ? »', rows: 2, model: models[1] }
    ]
  });

  root.ATELIER_S3 = {

    '3.1': {
      eyebrow: 'Le besoin réel · Explicite et implicite',
      title: 'Du besoin exprimé au besoin réel',
      subtitle: 'Pour chaque client : ce qu’il demande, ce qui se cache peut-être derrière, et la question qui le vérifie.',
      welcome: { title: 'Le besoin explicite et le besoin implicite', rows: [
        ['target', 'Le besoin explicite', 'C’est ce que le client demande, avec ses mots : « la plus grosse batterie ».'],
        ['search', 'Le besoin implicite', 'C’est ce qui se cache derrière, sans être dit. On ne le devine pas : on fait une hypothèse.'],
        ['question', 'La question qui vérifie', 'Une question ouverte, qui part de ses mots et le laisse confirmer ou démentir, sans lui souffler votre idée.']
      ] },
      tour: [
        { target: '.fm-scene', title: 'Le client', text: 'Lisez la situation et ce que demande le client.' },
        { target: '.fm-main .fm-field', title: 'Trois réponses', text: 'Le besoin explicite, votre hypothèse, puis votre question pour la vérifier.' },
        { target: '.fm-actions', title: 'Client suivant', text: 'Cinq clients : le corrigé arrive après le dernier.' }
      ],
      caseNoun: 'Client',
      pills: true,
      countLabel: 'clients analysés',
      submitLabel: 'Client suivant',
      cases: [
        client('Le vélo électrique', 'Le client', 'Dans un magasin de vélos électriques.', 'Je veux le vélo avec la plus grosse batterie.', 'client-tasse',
          ['Ne jamais tomber en panne sur son trajet (25 km et une côte) ; être rassuré sur l’autonomie.', '« Quels trajets ferez-vous avec ce vélo, au quotidien ? »'],
          'Le vélo avec la plus grosse batterie.'),
        client('Le logiciel de planning', 'La gérante', 'La gérante d’une entreprise de nettoyage de 25 salariés reçoit un éditeur de logiciel.', 'Il nous faut un logiciel de planning, nos tableaux ne suffisent plus.', 'client-cheveux-gris',
          ['Moins d’erreurs et de conflits avec les salariés ; remplacer vite les absents ; libérer du temps à la gérante.', '« Qu’est-ce qui se passe, concrètement, quand le tableau ne suffit plus ? »'],
          'Un logiciel de planning.'),
        client('Le quatre-pièces', 'La cliente', 'Une cliente et son conjoint, dans une agence immobilière.', 'On cherche un quatre-pièces, peu importe le quartier.', 'client-pull-clair',
          ['Un bureau pour le télétravail ou une chambre pour un enfant à venir ; « peu importe le quartier » peut cacher une contrainte de budget.', '« À quoi servira la quatrième pièce ? » puis « Qu’est-ce qui vous fait dire que le quartier compte peu ? »'],
          'Un quatre-pièces, quartier indifférent.'),
        client('Les intérimaires', 'La responsable', 'La responsable de production appelle une agence d’emploi temporaire.', 'Envoyez-moi trois intérimaires lundi, c’est urgent.', 'client-veste-verte',
          ['Faire face à un surcroît d’activité ou à des absences ; des profils opérationnels tout de suite ; éviter une mauvaise expérience passée.', '« Qu’est-ce qui rend lundi si urgent ? » puis « Qu’est-ce qui ferait qu’ils soient opérationnels dès le premier jour ? »'],
          'Trois intérimaires lundi.'),
        client('Les lunettes', 'La cliente', 'Chez un opticien.', 'Je voudrais des lunettes pas chères, c’est juste pour lire.', 'client-chignon',
          ['Une fatigue visuelle plus large (travail sur écran) ; une première presbytie mal vécue.', '« Dans quelles situations avez-vous du mal à lire ? »'],
          'Des lunettes de lecture peu chères.')
      ],
      keyPoint: 'À retenir : une hypothèse sur le besoin implicite n’est utile que si vous la vérifiez. Les questions qui marchent partent des mots du client (« la plus grosse batterie », « urgent ») et l’invitent à raconter. « Vous avez peur de tomber en panne, c’est ça ? » serait une question orientée : elle impose votre hypothèse.'
    }
  };
})(globalThis);
