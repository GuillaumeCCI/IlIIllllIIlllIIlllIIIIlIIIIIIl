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

/* S4 4.1 · A3 : le mot indice de chaque phrase (cN_indice). */
const idx = (...w) => Object.fromEntries(w.map((t, i) => [`c${i}_indice`, t]));
R.justes['s4-4.1'] = [
  idx('être sûr', 'au rabais', 'dernière génération', 'simple', 'économiser', 'très bien reçu', 'peur', 'fabriqué près d’ici'),
  idx('« ne me lâchera pas »', '« mes collègues »', '« nouveau »', '« pas envie »', '« combien »', '« bien reçu »', '« avoir peur »', '« respecte ses salariés »'),
  idx('sûr', 'haut de gamme', 'vraiment nouveau', 'paramétrer', 'réellement économiser', 'votre collègue', 'seuls à la maison', 'près d’ici'),
  idx('Être sûr que le moteur ne lâchera pas', 'Mes collègues ont tous un modèle haut de gamme', 'Je veux la dernière génération', 'que ce soit simple', 'Combien je vais économiser', 'il m’avait très bien reçu', 'je ne veux plus avoir peur', 'fabriqué près d’ici'),
  idx('lâchera', 'rabais', 'génération', 'simple, pas envie', 'économiser par an', 'je reviens', 'peur', 'respecte'),
  idx('être sûr, lâchera', 'collègues, au rabais', 'nouveau, dernière génération', 'simple', 'combien, économiser', 'très bien reçu', 'peur', 'fabriqué près d’ici, respecte'),
  idx("être sûr", "avoir l'air au rabais", "dernière génération", "pas envie de paramétrer", "économiser", "bien reçu", "peur", "l'entreprise respecte ses salariés"),
  idx('Sûr', 'Collègues', 'Nouveau', 'Simple', 'Combien', 'Reçu', 'Peur', 'Fabriqué'),
  idx('ne me lâchera pas au bout de deux ans', 'haut de gamme', 'nouveau', 'mes soirées à paramétrer', 'économiser', 'votre collègue m’avait très bien reçu', 'seuls', 'payer un peu plus pour du local'),
  idx('être sûr que', 'avoir l’air au rabais', 'la dernière génération', 'simple', 'réellement économiser', 'très bien reçu la dernière fois', 'avoir peur', 'près d’ici')
];
R.mauvaises['s4-4.1'] = [
  idx('moteur', 'modèle', 'quelque chose', 'soirées', 'an', 'dernière fois', 'maison', 'payer'),
  idx('le client', 'le client', 'le client', 'le client', 'le client', 'le client', 'le client', 'le client'),
  idx('je ne sais pas', 'rien', 'aucun', '?', 'non', 'oui', 'rien', 'aucun')
];
R.fautes['s4-4.1'] = [idx('etre sur', 'au rabé', 'derniere generation', 'simpl', 'economisé', 'tres bien recu', 'peure', 'fabriker pres d ici')];

/* S4 4.2 · A3 : les motivations de chaque conjoint (c0_madame, c0_monsieur) et la question (c2_question). */
const ben = (madame, monsieur, question) => ({ c0_madame: madame, c0_monsieur: monsieur, c2_question: question });
R.justes['s4-4.2'] = [
  ben('Sécurité : « avec les enfants, j’ai eu peur ». Famille : la chambre d’amis pour sa sœur. Argent : « pas s’étrangler avec le crédit ».', 'Sécurité (le trajet après ses gardes) et confort : « mes week-ends, c’est pour récupérer ».', 'Si vous deviez choisir entre une maison sans travaux et une maison avec une chambre d’amis, laquelle prendriez-vous ?'),
  ben('La sécurité des enfants (route passante), une chambre pour sa sœur, et le budget.', 'Le confort : pas de travaux, récupérer le week-end ; la sécurité du trajet de nuit.', 'Entre pas de travaux et une chambre d’amis, qu’est-ce qui compte le plus pour vous ?'),
  ben("Peur pour les enfants, budget à ne pas dépasser, chambre d'amis si possible.", "Ne pas passer ses week-ends en travaux pour se reposer, trajet sûr après la nuit.", "Vous préférez une maison sans travaux ou une maison avec une chambre d'amis ?"),
  ben('Sécurité (« j’ai eu peur »), argent (« s’étrangler »), confort (chambre d’amis).', 'Confort (« récupérer »), sécurité (gardes de nuit, trajet).', 'Si l’une des deux devait passer avant, ce serait la maison sans travaux ou la chambre d’amis ?'),
  ben('Elle veut un jardin sûr à cause de la route, elle ne veut pas s’étrangler avec le crédit, et aimerait recevoir sa sœur.', 'Il veut se reposer le week-end, donc pas de travaux, et un trajet court après l’hôpital.', 'Que choisiriez-vous : une maison refaite sans chambre d’amis, ou une chambre d’amis avec des travaux ?'),
  ben('Sécurité, famille, argent.  « peur », « ma sœur », « crédit ».', 'Confort et sécurité : « récupérer », trajet après ses gardes.', 'Lequel est le plus important pour vous : éviter les travaux ou avoir une chambre d’amis ?'),
  ben('Mme Benali : sécurité des enfants, budget serré, chambre d’amis pour sa sœur.', 'M. Benali : récupérer le week-end (pas de travaux), trajet de nuit sûr.', 'Si vous deviez renoncer à l’un des deux, les travaux ou la chambre d’amis, lequel ?'),
  ben('Elle a eu peur pour les enfants (sécurité) et elle ne veut pas trop dépenser (argent).', 'Il veut du repos (confort), pas de week-ends en travaux.', 'Plutôt une maison sans travaux ou une maison avec une chambre d’amis ?'),
  ben('Protéger ses enfants : sécurité. Recevoir sa sœur. Ne pas s’étrangler : argent.', 'Récupérer de ses nuits : confort. Le trajet après les gardes : sécurité.', 'Entre une maison sans travaux et une chambre d’amis, laquelle passerait avant ?'),
  ben('La sécurité (« peur »), la famille (« ma sœur »), l’argent (« crédit »).', 'Le confort (« récupérer », « pas envie… travaux »).', 'Si vous ne pouviez avoir qu’une des deux, pas de travaux ou une chambre d’amis, laquelle choisiriez-vous ?')
];
R.mauvaises['s4-4.2'] = [
  ben('Elle est sympa.', 'Il est fatigué.', 'Je vous propose une maison avec quatre chambres.'),
  ben('Rien de particulier.', 'Rien de particulier.', 'Vous voulez visiter ?'),
  ben('Elle veut une belle maison.', 'Il veut une belle maison.', 'J’ai une maison parfaite pour vous.')
];
R.motsCles['s4-4.2'] = ben('peur budget', 'récupérer', 'travaux chambre');
R.fautes['s4-4.2'] = [ben('securiter des enfan, sa soeur, le credi', 'il veut recuperer le weekend, pas de travo, et le trajé apres les garde', 'si vous deviez choisir entre pas de travo ou une chambre d ami, laquel ?')];

/* S5 5.1 · A4 : trois questions de Yanis réécrites (rw0 à rw2). */
const rw = (a, b, c) => ({ rw0: a, rw1: b, rw2: c });
R.justes['s5-5.1'] = [
  rw('Comment travaillez-vous aujourd’hui avec votre fournisseur ?', 'Qu’est-ce qui fonctionne bien avec lui, et qu’est-ce que vous aimeriez améliorer ?', 'Que se passe-t-il à l’atelier quand une pièce manque ?'),
  rw('Pouvez-vous me parler de votre fournisseur actuel ?', 'Qu’est-ce qui vous plaît dans votre relation avec lui ?', 'Comment ça se passe quand une pièce n’arrive pas ?'),
  rw("Comment s'organisent vos livraisons aujourd'hui ?", "Qu'est-ce que vous aimeriez améliorer avec votre fournisseur ?", "Qu'est-ce qui se passe quand il manque une pièce ?"),
  rw('Racontez-moi comment se passent vos commandes de pièces.', 'Qu’est-ce qui fonctionne bien avec votre fournisseur actuel ?', 'Quand une pièce manque, comment faites-vous à l’atelier ?'),
  rw('Comment choisissez-vous vos fournisseurs de pièces ?', 'Qu’est-ce que vous changeriez dans votre façon de travailler avec lui ?', 'Que se passe-t-il pour vos clients quand une pièce manque ?'),
  rw('Comment travaillez-vous avec votre fournisseur aujourd’hui ?', 'Qu’est-ce qui vous satisfait le plus, et le moins, avec lui ?', 'Comment gérez-vous les ruptures de pièces ?'),
  rw('Parlez-moi de votre fournisseur : comment ça se passe ?', 'Qu’aimeriez-vous améliorer dans vos livraisons ?', 'Que se passe-t-il quand une voiture attend une pièce sur le pont ?'),
  rw('Comment se passent vos approvisionnements aujourd’hui avec votre fournisseur ?', 'Qu’est-ce qui compte pour vous dans la relation avec votre fournisseur ?', 'Qu’est-ce que ça change à l’atelier quand une pièce manque ?'),
  rw('Comment est organisée la livraison des pièces chez vous ?', 'Qu’est-ce qui marche bien avec votre fournisseur actuel ?', 'Que faites-vous quand une pièce n’est pas livrée ?'),
  rw('Comment travaillez-vous aujourd’hui pour vos pièces ?', 'Qu’est-ce que vous attendez de votre fournisseur ?', 'Quelles conséquences quand il manque une pièce à l’atelier ?')
];
R.mauvaises['s5-5.1'] = [
  rw('Vous connaissez notre service de livraison express ?', 'Notre catalogue de 80 000 références vous intéresserait ?', 'On peut vous faire une offre ?'),
  rw('Vous travaillez avec qui ?', 'Vous êtes satisfaite ?', 'Vous avez des ruptures ?'),
  rw('Je vous propose notre offre.', 'Chez nous, c’est mieux.', 'Nous livrons en express.')
];
R.motsCles['s5-5.1'] = rw('fournisseur', 'améliorer', 'pièce manque');
R.fautes['s5-5.1'] = [rw('coment travailler vous aujourd hui avec votre fournisseur ?', 'qu esce qui fonctione bien avec lui et qu aimeriez vous amelioré ?', 'que se passe t il a l atelier quand une piece manque ?')];
