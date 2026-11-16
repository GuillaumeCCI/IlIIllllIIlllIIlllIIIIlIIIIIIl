/* Réponses d'apprenants pour tester le score estimatif (indicateur.test.cjs).
 *   justes    : réponses correctes, formulées de façons variées (au moins dix) ;
 *   mauvaises : solution, question orientée, hors sujet (3 / 10 au plus) ;
 *   motsCles  : les bonnes idées en mots isolés (6 / 10 au plus) ;
 *   fautes    : réponses justes pleines de fautes d'orthographe (7 / 10 au moins).
 * Une entrée par exercice, champ par champ.
 */
module.exports = { justes: {}, mauvaises: {}, motsCles: {}, fautes: {} };

/* S3 3.1 · A2 : pour chaque client, l'hypothèse (cN_implicite) et la question (cN_question). */
const R = module.exports;
const set = (...pairs) => Object.fromEntries(pairs.flatMap(([imp, q], i) => [[`c${i}_implicite`, imp], [`c${i}_question`, q]]));
R.justes['s3-3.1'] = [
  set(['Il a peut-être peur de tomber en panne sur un long trajet.', 'Quels trajets ferez-vous avec ce vélo, au quotidien ?'],
    ['Il perd du temps et il y a des erreurs dans le planning des salariés.', 'Qu’est-ce qui se passe, concrètement, quand le tableau ne suffit plus ?'],
    ['La quatrième pièce servirait de bureau pour le télétravail.', 'À quoi servira la quatrième pièce ?'],
    ['Elle doit faire face à un pic d’activité ou à des absences.', 'Qu’est-ce qui rend lundi si urgent ?'],
    ['Elle a peut-être une fatigue visuelle à cause de l’écran.', 'Dans quelles situations avez-vous du mal à lire ?']),
  set(['Être rassuré sur l’autonomie pour aller au travail tous les jours.', 'Comment allez-vous utiliser ce vélo ?'],
    ['Remplacer vite les absents et éviter les conflits avec l’équipe.', 'Que se passe-t-il quand vos tableaux ne suffisent plus ?'],
    ['Ils attendent peut-être un enfant et veulent une chambre de plus.', 'Qu’est-ce qui vous fait dire que le quartier compte peu ?'],
    ['Il y a peut-être des absences ou une grosse commande à livrer.', 'Qu’est-ce qui ferait qu’ils soient opérationnels dès le premier jour ?'],
    ['C’est peut-être une première presbytie qu’elle vit mal.', 'Quand est-ce que la lecture devient difficile pour vous ?']),
  set(["Il fait sûrement de longs trajets avec des côtes.", "Quel trajet faites-vous chaque jour ?"],
    ["La gérante veut gagner du temps et faire moins d'erreurs.", "Comment organisez-vous le planning aujourd'hui ?"],
    ["Peu importe le quartier, c'est peut-être une question de budget.", "Qu'est-ce qui compte le plus pour vous dans ce quatre-pièces ?"],
    ["Des salariés absents, il faut des gens opérationnels tout de suite.", "Qu'est-ce qui rend la situation si urgente ?"],
    ["Elle travaille peut-être beaucoup sur écran et fatigue.", "Dans quelles situations la lecture vous pose problème ?"]),
  set(['Ne jamais être à plat en route.', 'Parlez-moi de vos trajets : quelle distance faites-vous ?'],
    ['Les absences sont mal gérées et ça crée des tensions.', 'Qu’est-ce qui ne va plus avec vos tableaux ?'],
    ['Un bureau ou une chambre d’amis ; le budget peut être une contrainte.', 'Comment imaginez-vous la quatrième pièce ?'],
    ['Éviter une mauvaise expérience avec des intérimaires pas formés.', 'Que se passe-t-il lundi pour que ce soit urgent ?'],
    ['Elle a des maux de tête devant l’ordinateur.', 'À quels moments avez-vous du mal à lire ?']),
  set(['La peur de la panne d’autonomie sur un long trajet.', 'Pour quels trajets voulez-vous la plus grosse batterie ?'],
    ['Libérer du temps à la gérante, débordée par l’organisation.', 'Concrètement, qu’est-ce que vos tableaux ne permettent plus ?'],
    ['Peut-être du télétravail, il leur faut un bureau.', 'À quoi servira cette pièce en plus ?'],
    ['Une commande importante, et elle a besoin de profils expérimentés.', 'Qu’est-ce qui se passe lundi ?'],
    ['Peut-être la vue qui baisse avec l’âge, et elle le vit mal.', 'Dans quelles situations avez-vous du mal à lire ?']),
  set(['Il veut être sûr de ne pas tomber en panne dans la côte.', 'Comment se passe votre trajet aujourd’hui ?'],
    ['Il y a des oublis et des erreurs, les clients se plaignent.', 'Qu’est-ce qui vous fait dire que les tableaux ne suffisent plus ?'],
    ['Agrandir la famille : une chambre pour un bébé.', 'Pouvez-vous me dire à quoi servira la quatrième pièce ?'],
    ['Des absences imprévues, elle doit tenir la production.', 'Pourquoi lundi, qu’est-ce qui rend cela urgent ?'],
    ['Une fatigue des yeux au travail sur l’ordinateur.', 'Quand avez-vous besoin de lire avec ces lunettes ?']),
  set(['L’autonomie pour un trajet long tous les jours.', 'Combien de kilomètres ferez-vous avec ce vélo ?'],
    ['Remplacer rapidement un salarié absent sans y passer des heures.', 'Comment gérez-vous un absent aujourd’hui ?'],
    ['Leur budget est limité, c’est pour ça que le quartier leur importe peu.', 'Qu’est-ce qui vous fait dire que le quartier compte peu ?'],
    ['Elle veut des intérimaires opérationnels immédiatement, déjà formés.', 'Qu’est-ce qui ferait qu’ils soient opérationnels dès lundi ?'],
    ['Elle ne veut pas avoir l’air de vieillir avec des lunettes.', 'Dans quels moments avez-vous du mal à lire ?']),
  set(['Ne pas rester en panne loin de chez lui.', 'Quelle utilisation ferez-vous du vélo ?'],
    ['Des conflits avec les salariés sur les horaires.', 'Que se passe-t-il, concrètement, avec vos tableaux ?'],
    ['Un bureau pour travailler à la maison.', 'Comment utiliserez-vous la quatrième pièce ?'],
    ['Un départ ou un arrêt maladie dans l’équipe.', 'Qu’est-ce qui rend lundi si urgent pour vous ?'],
    ['Elle lit beaucoup sur écran au travail et se fatigue.', 'Dans quelles situations la lecture devient difficile ?']),
  set(['Rassuré de ne pas tomber en panne, il roule beaucoup.', 'Quels sont vos trajets avec ce vélo ?'],
    ['Gagner du temps sur l’organisation et faire moins d’erreurs.', 'Quand le tableau ne suffit plus, que se passe-t-il ?'],
    ['Une chambre d’amis ou un bureau ; peut-être un budget serré.', 'Qu’attendez-vous de cette quatrième pièce ?'],
    ['Un pic de production à tenir, avec des gens fiables.', 'Qu’est-ce qui se passe lundi à la production ?'],
    ['Une fatigue visuelle plus large, pas seulement pour lire.', 'Quand avez-vous du mal à voir de près ?']),
  set(['Il a un long trajet avec une côte et ne veut pas de panne.', 'Pouvez-vous me parler de vos trajets ?'],
    ['Moins d’erreurs et de stress dans le planning des équipes.', 'Comment se passe l’organisation du planning aujourd’hui ?'],
    ['Peut-être un enfant à venir.', 'Qu’est-ce qui vous amène à chercher un quatre-pièces ?'],
    ['Faire face à des absences, et ne pas revivre une mauvaise expérience.', 'Qu’est-ce qui rend lundi si urgent ?'],
    ['Une presbytie qui commence, peut-être mal vécue.', 'Dans quelles situations avez-vous du mal à lire ?'])
];
R.mauvaises['s3-3.1'] = [
  set(['Je vous propose notre modèle avec la plus grosse batterie.', 'Vous avez peur de tomber en panne, c’est ça ?'],
    ['Prenez notre logiciel.', 'Votre tableau est nul, non ?'],
    ['Je vous conseille un quatre-pièces en promotion.', 'Vous voulez sûrement un bureau, n’est-ce pas ?'],
    ['Nous avons des intérimaires.', 'C’est urgent, c’est ça ?'],
    ['Essayez nos modèles pas chers.', 'Vous voulez des lunettes pas chères, non ?']),
  set(['Rien.', 'D’accord.'], ['Rien.', 'D’accord.'], ['Rien.', 'D’accord.'], ['Rien.', 'D’accord.'], ['Rien.', 'D’accord.']),
  set(['Il a raison.', 'Vous êtes sûr ?'], ['Il a raison.', 'Vous êtes sûr ?'], ['Ils ont raison.', 'Vous êtes sûrs ?'], ['Elle a raison.', 'Vous êtes sûre ?'], ['Elle a raison.', 'Vous êtes sûre ?'])
];
R.motsCles['s3-3.1'] = set(['panne', 'batterie'], ['erreurs', 'tableau'], ['bureau', 'pièce'], ['absences', 'lundi'], ['écran', 'lire']);
R.fautes['s3-3.1'] = [
  set(['il a peur de tombé en pane sur son trajé', 'quel trajet ferez vous avec se vélo ?'],
    ['il pert du tant et y a des erreur dans le planing', 'qu esce qui se passe quand le tablo ne sufit plus ?'],
    ['la quatrieme piece ce serait un burau pour le teletravail', 'a quoi servira la quatrieme piece ?'],
    ['elle a un pic d activiter ou des absence', 'qu esce qui rend lundi si urgen ?'],
    ['elle a une fatige visuel a cause de l ecran', 'dans quel situation avez vous du mal a lire ?'])
];
