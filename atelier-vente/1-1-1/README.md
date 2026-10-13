# L’Atelier Vente, exercices 1-1-1

Vingt-trois exercices interactifs répartis en quatre séries, réalisés à partir des maquettes et des illustrations fournies. Le projet fonctionne en HTML, CSS et JavaScript, sans framework, sans dépendance et sans compilation.

| Série | Exercices | Thème |
| --- | --- | --- |
| 1 · Prise de contact | A, B, C, D, E1, E2, E3, F | Entrer en matière et cadrer l’échange |
| 2 · Écoute active | A, B, D, F | Reformuler et adapter sa posture |
| 3 · Gestion des objections | 1.1 à 1.7 | Diagnostiquer et traiter une objection |
| 4 · Manipulation | 1.1, 1.2, 2.1, 2.2 | Remettre en ordre, repérer, classer, réparer |

**Chaque exercice est un fichier HTML autonome** dans `exercices/`. Vous pouvez en ouvrir un seul, ou enchaîner la totalité depuis `index.html` : la progression est partagée entre les deux modes.

## Démarrer en deux minutes

1. Décompressez l’archive **entièrement**.
2. Ouvrez le dossier `atelier-vente` dans Visual Studio Code : **Fichier → Ouvrir le dossier**.
3. Pour un premier aperçu, double-cliquez sur `index.html` dans votre explorateur de fichiers.
4. Pour travailler confortablement, lancez le serveur ci-dessous, puis ouvrez l’adresse indiquée.

Avec Node.js 18 ou supérieur, depuis le terminal de VS Code :

```sh
npm start
```

Aucun `npm install` n’est nécessaire. Vous pouvez aussi utiliser `node server.mjs`, ou la tâche VS Code **Ouvrir le serveur des exercices**. Le serveur écoute par défaut sur `http://127.0.0.1:4173/` ; `Ctrl+C` l’arrête. Si le port est occupé : `node server.mjs --port 4174`.

Utilisez toujours la même adresse de travail : les brouillons sont liés au navigateur et à l’origine du site. Le stockage lors d’une ouverture directe en `file://` dépend du navigateur ; le serveur local est préférable. L’enregistrement oral nécessite un navigateur compatible et l’autorisation du microphone, sur localhost ou HTTPS.

## Un exercice seul, ou tout d’un coup

**Un exercice seul.** Ouvrez directement son fichier, par exemple `exercices/s3-1-4.html`. La page se suffit à elle-même : elle affiche l’exercice, le valide et propose sa piste de relecture. Vous pouvez envoyer ce seul lien à un apprenant.

**Tout le parcours.** Ouvrez `index.html`. Vous y trouvez les quatre séries, l’état de chaque exercice, un bouton **Reprendre où je me suis arrêté** et le bilan global (`index.html#bilan`).

**Une série entière.** Depuis l’accueil, le bouton de chaque carte ouvre son premier exercice ; le bouton **Continuer** enchaîne ensuite jusqu’au bout, en passant d’une série à la suivante.

La barre du haut et le bandeau des séries sont présents sur toutes les pages : la navigation reste possible à tout moment, quel que soit le point d’entrée.

## Remplacer une illustration : glisser, remplacer, actualiser

1. Préparez votre nouvelle image au format **PNG**.
2. Donnez-lui **exactement** le nom du fichier à remplacer, avec la même casse.
3. Glissez-la dans le sous-dossier de la série et acceptez le remplacement.
4. Actualisez la page. Si nécessaire, `Ctrl+F5` sous Windows ou `Cmd+Maj+R` sous macOS.

**Aucun fichier de code n’est à modifier avec cette méthode.** La liste complète et à jour des fichiers, écran par écran, se trouve dans `assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt`, elle est régénérée depuis le catalogue, elle ne peut donc pas se désynchroniser.

| Série | Dossier | Fichiers |
| --- | --- | --- |
| 1 | `assets/illustrations/s1/` | `1-1-1-iA.png`, `1-1-1-iB.png`, `1-1-1-iE1.png`, `1-1-1-iE2.png`, `1-1-1-iE3.png`, `1-1-1-iF.png` |
| 2 | `assets/illustrations/s2/` | `1-1-1-S2-iA1.png`, `1-1-1-S2-iA2.png`, `1-1-1-S2-iA3.png`, `1-1-1-S2-iC.png`, `1-1-1-S2-iE.png` |

Les noms reprennent ceux des fichiers que vous avez fournis, les espaces remplacés par des tirets (nécessaire pour des URL propres sur GitHub Pages). Les séries 3 et 4 n’utilisent pas d’illustration : leurs maquettes n’en comportent pas.

Ajouter une image sous un autre nom ne remplace pas l’ancienne. Renommer un JPG en `.png` ne le convertit pas : exportez vraiment en PNG. Pour un autre nom, un autre format (`.jpg`, `.webp`) ou un nouveau texte alternatif, modifiez l’entrée de l’exercice dans `js/catalog.js`, c’est le seul fichier à toucher.

**L’inversion A/B de la série 1 est volontaire.** La maquette A montre l’image fournie sous le nom « 1-1-1 iB », et la maquette B montre « 1-1-1 iA ». Le projet respecte les visuels des maquettes et conserve leurs identifiants.

## Les fonds d’écran

Chaque exercice a son fond, tiré au sort parmi les neuf images fournies, plus un fond commun posé dessous. Les fichiers sont en **WEBP** : ces images texturées pesaient 14,4 Mo en PNG, elles tiennent en 0,6 Mo en WEBP, sans différence visible à l’écran.

| Besoin | Fichier à remplacer |
| --- | --- |
| Le fond posé sous tous les exercices | `assets/backgrounds/commun.webp` |
| Fond d’un exercice de la série 1 | `assets/backgrounds/s1/1-1-1-<ID>.webp` |
| Fond d’un exercice de la série 2 | `assets/backgrounds/s2/1-1-1-S2-<ID>.webp` |
| Fond d’un exercice de la série 3 | `assets/backgrounds/s3/1-1-1-S3-<ID>.webp` |
| Fond d’un exercice de la série 4 | `assets/backgrounds/s4/1-1-1-S4-<ID>.webp` |

La correspondance exacte, exercice par exercice, est listée dans `assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt`.

**Pour changer un fond, glissez votre image par-dessus la sienne**, en gardant le nom du fichier. Aucune ligne de code à modifier.

### L’intensité des fonds

Le fond s’affiche à 85 % de son intensité, sous un voile ivoire léger. Pour la régler, changez `--fond-opacite` dans `css/layout.css` (1 = couleurs d’origine). Si vous déposez un fond très chargé ou sombre, vérifiez la lisibilité des textes posés directement dessus (titres, barre du haut). Le réglage se trouve dans `css/layout.css`, section **FOND DE PAGE**.

Les panneaux de réponse et la colonne de gauche ont par ailleurs leur propre surface claire : le contenu ne se pose jamais à même le fond.

### Préparer vos propres fonds

Format conseillé : paysage, 1920 px de large. Le fond est cadré en haut et couvre la largeur, donc il peut être recadré sur un écran étroit : gardez l’essentiel du décor sur les bords et le centre dégagé.

**Le fond défile avec la page.** Épinglé, il donnait l’impression d’un décor plaqué derrière une fenêtre qui glisse ; en défilant, il appartient à la page.

Pour convertir et alléger un lot d’images :

```sh
npm install --no-save sharp
node tools/compress-backgrounds.mjs <source> <destination>
node tools/install-backgrounds.mjs <destination>
```

Le second script répartit les fonds sur les 23 exercices. Le tirage est **au hasard mais reproductible** : il dérive de la clé de l’exercice, pas d’un tirage à l’exécution. Relancer le script redonne donc la même distribution, et un exercice garde son fond d’une génération à l’autre.

Pour retirer un fond, mettez son chemin à `null` dans `js/catalog.js`.

## Les vingt-trois exercices

### Série 1 · Prise de contact

| ID | Interaction |
| --- | --- |
| A | Écouter l’accroche, lire sa transcription, identifier les points forts et les améliorations, réécrire |
| B | Formuler une entrée en matière et expliquer son principal ajustement |
| C | Choisir une ouverture, relier 3 à 5 arguments à des critères, identifier un élément à emprunter |
| D | Écrire 4 à 6 phrases et choisir la fonction de chacune |
| E1 | Réagir à une caméra coupée ; essai oral facultatif avec réécoute locale |
| E2 | Préparer une ouverture de 90 mots maximum et la tester avec un chrono de 40 secondes |
| E3 | Rédiger une entrée affirmative de 280 caractères maximum |
| F | Adapter au téléphone et à l’e-mail, avec objet et message de 80 à 120 mots |

### Série 2 · Écoute active

| ID | Interaction |
| --- | --- |
| A | Trois clients enchaînés : choisir la meilleure prise de contact et justifier en une phrase |
| B | Quatre fausses reformulations : identifier l’attitude de Porter, puis réécrire |
| D | Rédiger une réponse pour chacune des 6 attitudes de Porter, puis choisir et justifier |
| F | Trois profils : formuler une réponse d’écoute et expliquer l’adaptation de posture |

### Série 3 · Gestion des objections

| ID | Interaction |
| --- | --- |
| 1.1 | Classer 8 comportements entre « bon réflexe » et « à éviter » |
| 1.2 | Associer chacune des 6 étapes de la méthode à son rôle |
| 1.3 | Quatre objections : identifier la nature, puis choisir le premier geste |
| 1.4 | Lire un échange, formuler le vrai frein et la question qui l’ouvre |
| 1.5 | Comparer deux réponses à « c’est trop cher », puis expliquer son choix. En deux temps : on choisit d’abord, on justifie ensuite, le choix étant rappelé |
| 1.6 | Construire un traitement complet, une phrase par étape |
| 1.7 | Quatre cartes réflexes : décoder, creuser, répondre avec preuve |

### Série 4 · Manipulation

| ID | Interaction |
| --- | --- |
| 1.1 | Remettre 5 phrases dans l’ordre d’une ouverture d’entretien |
| 1.2 | Surligner au moins 4 maladresses, puis réécrire l’ouverture |
| 2.1 | Classer 6 réponses selon les 6 attitudes de Porter |
| 2.2 | Trois situations : remplacer la réponse réflexe par une reformulation |

Les réponses s’enregistrent automatiquement après la saisie et avec **Enregistrer le brouillon**. Après validation, une piste de relecture apparaît, puis **Continuer** mène à l’exercice suivant. Le dernier écran mène au bilan.

### Glisser-déposer et clavier

Les exercices de manipulation (S3 1.1 et 1.2, S4 1.1 et 2.1) se jouent à la souris **ou au clavier** : chaque zone de dépôt a son bouton sous la carte, et **Annuler le dernier choix** revient en arrière. Ces boutons sont masqués par défaut et s’affichent avec le bouton de l’en-tête, sans jamais quitter l’ordre de tabulation : voyez « Les commandes clavier, à la demande » plus bas. Le glisser-déposer est un confort, jamais le seul chemin.

### Ce que la validation vérifie

La validation contrôle les champs requis, les choix effectués et les limites de longueur. Elle **ne juge pas la qualité** des arguments et n’attribue aucune note. Pour les exercices à bonne réponse (QCM, classements, associations), le corrigé affiche le détail réponse par réponse **après** validation. Les cases d’auto-vérification sont des aide-mémoires, pas un score.

## Audio et contenus pédagogiques à personnaliser

Les corrigés des séries 1, 2 et 4 proviennent des **fiches d’activité fournies** (« Reconstruire une ouverture d’entretien réussie », « Choisir la bonne attitude d’écoute », « Manipulation des connaissances »). Les fiches tutoient l’apprenant ; l’interface le vouvoie, les textes ont donc été transposés sans en changer le fond.

**Les corrigés de la série 3 proviennent de la fiche du module M1.1.3**, « Activités supplémentaires SCORM 1, Répondre efficacement aux objections » : ses exercices 1.1 à 1.7 sont exactement ceux de la série (mêmes répliques, mêmes objections). Ce que les maquettes ne montraient pas (cartes 2 à 8 de 1.1, objections 2 à 4 de 1.3, la quatrième carte réflexe de 1.7) vient aussi de cette fiche ; 1.6 affiche désormais le corrigé modèle sous chaque étape. Les sept exercices affichent donc, comme les autres séries, « Corrigé modèle issu de la fiche d’activité ». Le drapeau `sourced` de `js/catalog.js` pilote ce message.

Les grilles d’auto-évaluation des fiches sont accessibles depuis le bouton **Grille d’évaluation** des écrans concernés. Côté audio, l’archive ne contenait pas de fichier son ni de transcription.

- **Accroche A (série 1)** : un texte d’exemple est lu avec la synthèse vocale du navigateur. La voix et sa disponibilité dépendent du système. La transcription reste accessible.
- **Pour votre propre audio** : voyez `assets/audio/AJOUTER-L-AUDIO.txt`.
- **Grilles, indices et corrigés** : chaque série a son fichier de contenu, `js/content-s1.js` à `js/content-s4.js`. Tous les textes affichés y sont regroupés, commentés et modifiables sans toucher au code des écrans.
- **E1 (série 1)** : l’enregistrement du microphone est temporaire. Il sert à la réécoute immédiate et n’est ni transcrit, ni envoyé à un serveur, ni conservé dans le brouillon. La réponse écrite reste nécessaire.
- **E2 (série 1)** : le chronomètre est un outil de répétition libre, sans accès au microphone.

Les textes visibles sur les maquettes ont été repris. Les marques ont été unifiées sous **L’Atelier Vente**. Les palettes bleue, violette et magenta de la série 1 sont conservées ; les séries 2 à 4 reprennent le bleu de leurs maquettes.

## Une page de contexte avant chaque exercice

Chaque exercice s’ouvre sur une page qui pose le décor, dans un registre volontairement différent de celui des exercices : barres crème et très grand titre. Le fond est le même que celui de l’exercice, pour que le décor ne saute pas d’une image à l’autre en cours de route ; c’est le passage des barres crème aux barres blanches qui marque le moment où l’on se met au travail.

La page se compose ainsi :

| Élément | Rôle |
| --- | --- |
| Le titre | Le nom de l’exercice, en grand |
| L’accroche | Une phrase, dont le début est souligné de corail |
| La carte **Votre mission** | La consigne, la façon de procéder, le bouton **Commencer l’exercice** |
| L’illustration | La scène de l’exercice, quand une illustration a été fournie |
| L’aperçu | À défaut d’illustration, un dessin de la mécanique de l’exercice |
| **La situation et les critères** | Repliés sous la carte, ouverts à la demande |

La page ne s’affiche **qu’au premier passage** : revenir sur un brouillon ouvre directement l’exercice, sans refaire lire la consigne. Un lien **Revoir la consigne**, à côté de « Enregistrer le brouillon », la rappelle à tout moment.

## Choisir son cas, puis enchaîner les autres

Cinq exercices présentent plusieurs cas indépendants : S2 A (trois clients), S2 F (trois profils), S3 1.3 (quatre objections), S3 1.7 (quatre cartes réflexes) et S4 2.2 (trois situations).

Pour ceux-là, un **menu des cas** s’intercale entre la page de contexte et l’exercice. L’apprenant y choisit par où commencer : l’ordre est libre, et chaque carte indique si le cas est déjà traité.

Le déroulé est le même pour les cinq :

1. La page de contexte, puis le menu des cas.
2. On ouvre un cas, on y répond, on le valide.
3. **Sa correction s’affiche aussitôt**, au contact des réponses de ce cas.
4. La barre d’actions propose alors le cas suivant non traité, ou le retour au menu.
5. L’exercice n’est marqué terminé qu’une fois **tous** les cas traités.

Quand l’exercice dispose d’une illustration par cas, **chaque carte du menu porte la sienne** : on reconnaît le client avant même de l’ouvrir. C’est le cas de S2 A et S2 F, qui reprennent les scènes de leur galerie. Une carte sans illustration reste parfaitement lisible, et un fichier manquant laisse simplement une bande teintée.

Au-dessus de chaque cas, un fil rappelle où l’on en est : le retour au menu, une pastille par cas (celle du cas courant est pleine, les cas traités sont verts) et le décompte. Les pastilles permettent de sauter d’un cas à l’autre sans repasser par le menu.

Un cas peut lui-même comporter plusieurs temps, sans que cela change le menu : S3 1.3 demande la nature puis le premier geste, S3 1.7 fait décoder, creuser, puis répondre. Ces étapes sont propres au cas ouvert : revenir au menu puis rouvrir un cas le reprend là où il en était.

### Rendre un exercice multi-cas

Dans l’écran, déclarez les cas et la condition de fin, puis utilisez les deux briques dédiées :

```js
const caseDone = i => ex.value(`done${i}`) === true;

const cases = () => clients.map((client, i) => ({
  label: client.label,       // le titre de la carte, au menu
  hint: client.quote,        // l’aperçu, en italique
  done: caseDone(i)          // l’état, au menu comme sur les pastilles
}));

function screen() {
  const i = ex.openCase() ?? 0;        // le cas ouvert
  return `<form class="panel" novalidate>
    ${ex.caseBar(cases(), i, 'client')}
    …
    ${ex.caseActions(cases(), i, 'Valider ma réponse')}
  </form>`;
}

function validate(values) { /* le cas ouvert, et lui seul */ }
function afterSubmit() { ex.setValue(`done${ex.openCase() ?? 0}`, true); }

ex.mount('s2-A', {
  screen, validate, feedback, afterSubmit, cases,
  allDone: () => clients.every((_, i) => caseDone(i)),
  menuIntro: 'Trois clients vous attendent. Choisissez celui que vous souhaitez traiter en premier.'
});
```

Le nom des cas sert aux libellés (« Tous les clients », « 2 sur 3 traités »). Pour un nom féminin, passez un descripteur plutôt qu’un simple mot, afin que les accords suivent :

```js
ex.caseBar(cases(), i, { noun: 'objection', feminine: true })  // « Toutes les objections »
```

### Illustrations et aperçus

**Quand une illustration a été fournie, elle prime** : une scène pose mieux le contexte qu’un schéma. Douze exercices en ont une, et deux d’entre eux, S2 A et S2 F, affichent leurs trois scènes côte à côte comme dans l’exercice lui-même.

La page s’organise alors différemment : **l’illustration passe à gauche et en grand, la carte « Votre mission » à droite**, et la réplique du client vient se loger dans la carte. Une image pose le contexte d’un coup d’œil, là où un schéma de mécanique ne dit rien tant qu’on n’a pas lu la consigne. Sans illustration, le schéma reste à droite et la consigne garde la première place.

Une illustration seule est montrée **entière** : elle a été composée pour être lue d’un bloc, et un recadrage couperait ce qu’elle raconte. Les galeries de trois scènes, elles, sont mises au même format portrait : elles sont donc recadrées, jamais déformées, et le cadrage est ancré au-dessus du milieu, là où se trouvent les visages.

| Série | Illustrations fournies |
| --- | --- |
| 1 · Prise de contact | A, B, E1, E2, E3, F, soit six fichiers |
| 2 · Écoute active | A et F, trois scènes chacun, soit cinq fichiers |
| 3 · Objections | **aucune** : les sept exercices affichent un schéma |
| 4 · Manipulation | **aucune** : les quatre exercices affichent un schéma |

Les archives fournies ne contiennent d’illustration que pour les séries 1 et 2 : ce sont les fichiers dont le nom porte un « i », comme `1-1-1 iB` ou `1-1-1 S2 iC`. Pour les séries 3 et 4, elles ne contiennent que les maquettes d’écran.

Les douze exercices sans illustration affichent donc un dessin de **leur propre mécanique** : des cartes qui se déplacent vers des emplacements numérotés, une question et ses options, un paragraphe à surligner. L’apprenant voit d’un coup d’œil ce qu’il va manipuler.

Six familles couvrent ces exercices, chacune paramétrée par le nombre réel de cartes ou de zones :

| Famille | Exercices concernés |
| --- | --- |
| Remise en ordre | S4 1.1 |
| Tri en deux zones | S3 1.1 |
| Association vers une grille | S3 1.2, S4 2.1 |
| Question à choix | S1 C, S3 1.3, S3 1.5, S3 1.7 |
| Rédaction ligne à ligne | S1 D, S2 B, S2 D, S3 1.4, S3 1.6, S4 2.2 |
| Surligneur | S4 1.2 |

Tout est tracé en SVG dans `js/previews.js` : net à toute taille, aucun fichier image à fournir, et les couleurs suivent le thème.

### Déposer les illustrations manquantes

Les emplacements des onze exercices restants sont **déjà déclarés** dans `js/catalog.js`, avec leur chemin et leur texte alternatif. Il suffit de déposer le fichier et de retirer une mention :

1. Déposez votre PNG au chemin annoncé, par exemple `assets/illustrations/s3/1-1-1-S3-i1-5.png`
2. Dans `js/catalog.js`, retirez `pending: true` de l’entrée correspondante
3. Lancez `npm run build:images` pour produire la version allégée

L’illustration remplace alors le schéma. Tant que `pending` est présent, le schéma reste affiché : vous pouvez donc déclarer les emplacements bien avant d’avoir les images. La liste complète figure dans `assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt`.

### Le poids des illustrations

Les fichiers fournis pèsent environ 3 Mo chacun, pour 1672 pixels de large, alors qu’ils ne dépassent jamais 800 pixels à l’écran. Sur une page à trois scènes, cela représentait près de 9 Mo à télécharger avant le premier affichage.

```sh
npm install --no-save sharp   # une seule fois
npm run build:images
```

Le script produit, **à côté de chaque original**, une version `.web.png` redimensionnée à 1100 pixels : 35 Mo deviennent 5,5 Mo, soit 84 % de moins. La page la plus chargée, qui affiche trois scènes, passe de 9,3 Mo à 1,5 Mo. Vos fichiers d’origine ne sont jamais modifiés ; vous gardez la pleine résolution pour l’impression.

L’interface sert la version allégée quand elle existe, et retombe sur l’original sinon. Oublier de lancer le script ralentit l’affichage, mais ne casse rien. Les deux versions, ainsi que `js/web-images.js`, doivent être envoyées sur GitHub : les pages n’y sont que des fichiers statiques.

### Personnaliser

| Ce que vous voulez changer | Où |
| --- | --- |
| Les textes (accroche, mission, méthode, situation, critères) | `js/briefings.js`, une entrée par exercice |
| Le fond | Le même que l’exercice : voir `assets/backgrounds/` |
| Le fond crème, les tailles, la composition | `css/briefing.css` |
| Les dessins d’aperçu | `js/previews.js` |

Le décor est volontairement rangé dans deux fichiers remplaçables : déposez vos propres `feuillage-gauche.svg` et `feuillage-droit.svg` et l’habillage change, sans toucher au code.

## La mise en page

Les pages prennent **toute la largeur** disponible : le contenu s’étend sur environ 94 % de la fenêtre, avec des marges proportionnelles. Les plateaux de glisser-déposer, les grilles d’attitudes et les tableaux s’élargissent donc au lieu de se tasser au centre. Seuls les blocs de texte courant restent bornés, une ligne trop longue étant pénible à lire.

**La page défile normalement.** Un exercice chargé peut dépasser la hauteur de l’écran : c’est accepté, et préférable à des zones internes qui défilent chacune de leur côté en coupant le contenu. Sous 900 px puis 760 px de hauteur, les espacements et les illustrations se resserrent pour qu’un maximum tienne d’emblée.

### Vérifier la mise en page

```sh
npm start             # dans un terminal
npm run check:layout  # dans un autre
```

Le script ouvre chacune des 23 pages dans Microsoft Edge ou Google Chrome, en 1920 × 1080 puis en 1366 × 768, passe la page de contexte, ouvre un cas quand l’exercice en propose un menu, et vérifie quatre choses : la page de contexte s’est bien affichée, **aucun contenu n’est coupé** par un conteneur à débordement masqué, la largeur est réellement occupée (alerte sous 80 %), et aucun bloc n’en chevauche un autre. Sans navigateur installé, le script s’arrête proprement.

## Le plein écran

Un bouton dans l’en-tête, à droite de la barre de progression, bascule la page en plein écran et en sort. L’icône suit l’état réel. La touche **Échap** sort également, par le comportement natif du navigateur. En plein écran, le pied de page s’efface pour rendre sa hauteur au contenu.

## Les corrections s’affichent au contact des réponses

Plutôt qu’un pavé de texte en bas d’écran, **la correction se pose là où elle porte**.

- Les listes de choix se figent après validation : la bonne réponse ressort en vert, le choix erroné en rouge, les autres s’effacent.
- Les réponses rédigées sont relues telles quelles, avec le repère ou la formulation modèle glissé juste dessous.
- L’exercice D de la série 1 va plus loin : chaque ligne reçoit sa pastille en face de la fonction choisie, les fonctions clés absentes sont nommées, puis **la version modèle s’affiche en dessous, présentée exactement de la même façon**, pour une comparaison ligne à ligne. C’est l’un des rares cas où l’on accepte de dépasser la hauteur d’écran : le panneau défile, parce que la comparaison vaut le défilement.

Le bandeau du bas ne garde que la synthèse : un score, ou le critère à vérifier. Les éléments de correction sont **répartis selon ce que l’apprenant a réellement rempli** : un repère de fonction n’apparaît que sous la ligne où cette fonction a été choisie.

## La police : Fira Sans, et rien d’autre

Tout le site est en **Fira Sans**, titres compris. Les fichiers sont dans `assets/fonts/` et servis par le site lui-même : aucun appel à Google Fonts, donc rien n’est envoyé à un tiers, et tout fonctionne hors ligne.

Quatre graisses sont fournies, plus l’italique du texte courant :

| Fichier | Graisse | Où |
| --- | --- | --- |
| `fira-sans-400.woff2` | Regular | Le texte courant |
| `fira-sans-400i.woff2` | Regular italique | Les citations clients |
| `fira-sans-600.woff2` | SemiBold | Les intertitres, les étiquettes |
| `fira-sans-700.woff2` | Bold | Les titres de panneau, les boutons |
| `fira-sans-800.woff2` | ExtraBold | Les grands titres des pages de contexte |

Les feuilles de style demandent parfois des valeurs intermédiaires (550, 650, 750). C’est volontaire : le navigateur sert alors la graisse déclarée la plus proche, sans jamais avoir à en simuler une.

Le texte s’affiche immédiatement avec la police de secours, puis repasse en Fira dès qu’elle est chargée (`font-display: swap`) : on ne reste jamais devant une page vide.

### Changer de police

Déposez vos `.woff2` dans `assets/fonts/`, puis reprenez les cinq blocs `@font-face` en tête de `css/styles.css` ainsi que la famille de `:root`, juste en dessous. C’est le seul endroit à modifier : aucune autre feuille ne nomme de police.

Si vous repartez d’une archive OTF ou TTF, convertissez-la d’abord :

```sh
npm install --no-save wawoff2
node tools/build-fonts.mjs <dossier contenant les .otf>
```

Le script ne retient que les graisses utilisées et les convertit en WOFF2, le format compressé du web : l’archive d’origine, 32 fichiers OTF pour 5,8 Mo, se réduit ainsi à cinq fichiers pour 702 ko. Une fois les `.woff2` générés et versionnés, ni le script ni `wawoff2` ne sont nécessaires pour faire tourner le site.

**Fira Sans est sous licence SIL OFL**, qui autorise l’usage commercial et la redistribution, à condition que la licence accompagne les fichiers : c’est le rôle de `assets/fonts/LICENCE-OFL.txt`, à conserver.

## Icônes : du SVG, jamais d’emoji

Toutes les icônes de l’interface sont des **SVG tracés**, regroupés dans `js/icons.js`. Aucun emoji ni caractère décoratif n’est rendu : leur dessin change d’un système à l’autre, les lecteurs d’écran les annoncent de façon imprévisible, et ils ne suivent pas la couleur du thème.

Chaque icône hérite de la couleur du texte (`currentColor`) et prend la taille demandée :

```js
icon('check')                       // décorative : masquée aux lecteurs d’écran
icon('check', { label: 'terminé' }) // porteuse de sens : annoncée
icon('lock', { size: 15 })          // taille en pixels, 24 par défaut
```

Pour ajouter une icône, ajoutez son tracé à l’objet `PATHS` de `js/icons.js`, dessiné dans une grille de 24 × 24. Un test (`npm test`) vérifie qu’aucun emoji ne réapparaît dans les écrans et que tout nom d’icône référencé existe bien.

## Déposer le projet sur GitHub

Déposez **le contenu** du dossier `atelier-vente` à la racine de votre dépôt : `index.html` doit se trouver directement à cette racine, avec `assets`, `css`, `js` et `exercices`. Conservez aussi le fichier `.nojekyll`. Le dossier `references/` contient les maquettes originales pour comparer le résultat ; il pèse 29 Mo et **n’est pas nécessaire au fonctionnement**. Vous pouvez le garder seulement sur votre ordinateur : le dépôt passe alors de 70 à 41 Mo.

Pour héberger ces pages avec GitHub Pages :

1. Envoyez les fichiers dans votre dépôt, sur la branche `main` (ou votre branche de travail).
2. Ouvrez **Settings → Pages**.
3. Sous **Build and deployment**, choisissez **Deploy from a branch**.
4. Choisissez votre branche et **/(root)**, puis **Save**.
5. Ouvrez l’URL fournie par GitHub une fois la publication terminée.

Les chemins sont relatifs : une adresse de type `https://votre-compte.github.io/votre-depot/` fonctionne sans réglage supplémentaire. Aucune redirection n’est nécessaire.

Pour remplacer une image en ligne : remplacez le fichier local, enregistrez le changement dans Git, puis envoyez-le sur la branche publiée. Après republication, actualisez la page. Un changement uniquement sur votre ordinateur ne modifie pas le site déjà publié.

## Se repérer dans les fichiers

| Emplacement | Rôle |
| --- | --- |
| `index.html` | Accueil : les quatre séries, la reprise et le bilan |
| `exercices/*.html` | Une page autonome par exercice (23 fichiers, générés) |
| `js/catalog.js` | **Le fichier central** : séries, images, fonds, ordre des exercices |
| `js/briefings.js` | Les textes des pages de contexte |
| `js/previews.js` | Les aperçus SVG de la mécanique des exercices |
| `js/web-images.js` | Versions allégées des illustrations, fichier généré |
| `js/content-s1.js` … `content-s4.js` | Tous les textes pédagogiques, par série |
| `js/icons.js` | Les icônes SVG de l’interface (aucun emoji) |
| `js/core.js` | Socle commun : état, sauvegarde, en-tête, navigation, briques d’interface |
| `js/exercise.js` | Moteur d’un exercice : champs, validation, feedback, étapes |
| `js/dnd.js` | Plateaux de manipulation : glisser-déposer et équivalents clavier |
| `js/placement.js` | État partagé des exercices à cartes (placements, annulation) |
| `js/media.js` | Lecture de l’accroche, entraînement oral, chronomètre |
| `js/home.js` | Accueil et bilan |
| `js/rules.js` | Règles de complétude et de longueur |
| `js/screens/*.js` | Un fichier par exercice : son contenu visuel et sa validation |
| `css/styles.css` | Styles de base, couleurs, mise en page, adaptation mobile |
| `css/components.css` | Composants des séries 2 à 4 |
| `css/review.css` | Correction affichée au contact des réponses |
| `css/layout.css` | Largeur, densité, boutons d’en-tête |
| `css/briefing.css` | Les pages de contexte : fond crème, décor, composition |
| `assets/illustrations/` | Les illustrations à remplacer, par série |
| `assets/backgrounds/` | Fond commun et fonds par exercice, par série |
| `assets/audio/` | Emplacement du futur enregistrement de l’accroche |
| `references/` | Les maquettes originales, par série |
| `tools/build-pages.mjs` | Régénère les 23 pages depuis le catalogue |
| `tools/build-guides.mjs` | Régénère les aide-mémoire des dossiers d’assets |
| `tools/check-layout.mjs` | Mesure la mise en page réelle dans un navigateur |
| `tools/build-images.mjs` | Produit les versions allégées des illustrations |
| `server.mjs` | Serveur de travail local facultatif |
| `tests/` | Tests des règles, des écrans et des parcours ; lancer `npm test` |

### Ajouter un exercice

1. Ajoutez son entrée dans la série voulue, dans `js/catalog.js` (`id`, `file`, `label`, `background`).
2. Créez `js/screens/<file>.js` en vous inspirant d’un écran proche.
3. Déposez son fond : `assets/backgrounds/<série>/<nom>.webp` (copiez un fond existant pour commencer).
4. Lancez `npm run build` : la page HTML et les aide-mémoire sont régénérés.
5. Lancez `npm test` pour vérifier que l’écran se monte et valide correctement.

Les scripts de `js/screens/` ne sont jamais écrasés par la génération.

## Conservation des réponses

Les réponses sont stockées avec `localStorage`, uniquement dans le navigateur utilisé. Elles sont partagées entre toutes les pages du projet : ouvrir un exercice seul ou passer par l’accueil met à jour la même progression. Elles ne sont pas synchronisées entre appareils, ne sont pas envoyées à un formateur et ne sont pas déposées sur GitHub. Effacer les données du navigateur peut les supprimer. En navigation privée ou si le stockage est bloqué, la conservation peut être limitée ; l’interface le signale.

La clé `storageKey` dans `js/catalog.js` permet de distinguer une autre promotion ou une autre série d’exercices. Changer cette clé démarre un nouveau brouillon, sans importer les anciennes réponses.

## Vérifications effectuées

- `npm test` : 88 tests au total, tous au vert. 8 sur les règles de saisie de la série 1 ; 66 montant chacun des 23 écrans dans un DOM simulé, **page de contexte ET exercice** (affichage, refus d’une réponse vide, absence d’emoji et de tiret cadratin, validité des noms d’icônes, présence des boutons d’en-tête, maintien des commandes clavier dans la tabulation, complétude des 23 consignes, **affichage des 11 illustrations fournies**, et production d’un schéma pour les 12 exercices restants) ; 22 jouant des parcours complets.
- Contrôle automatique que les 23 pages HTML existent, que leurs clés et noms de fichiers sont uniques, et que **tous** les chemins d’images et de fonds du catalogue pointent vers un fichier réel.
- Vérification par requêtes HTTP sur le serveur local : toutes les URL référencées par les pages et les 35 images du catalogue répondent en 200.
- `npm run check:layout` : les 23 écrans mesurés dans Microsoft Edge, en 1920 × 1080 puis en 1366 × 768. **Sur les 46 cas : aucun contenu coupé, 94 % de la largeur occupée, aucun chevauchement.**
- Les textes, consignes, verbatims clients et libellés de boutons ont été repris des quinze nouvelles maquettes, écran par écran.
- Les 11 illustrations fournies ont été vérifiées identiques aux originaux, octet pour octet, et les 23 maquettes de référence sont archivées dans `references/`.
- Les corrigés des quatre séries ont été repris des fiches d’activité fournies (M1.1.1 pour les séries 1, 2 et 4, M1.1.3 pour la série 3) et transposés au vouvoiement ; aucun contenu n’a été ajouté depuis des exercices de fiche sans écran correspondant.

Restent à faire de votre côté, car ils dépendent de votre matériel ou de votre jugement :

- **Un parcours visuel à l’œil.** La mise en page est désormais mesurée automatiquement, mais une machine ne juge pas de l’esthétique : parcourez les écrans avant la mise en ligne, en particulier les plateaux de glisser-déposer des séries 3 et 4 et les écrans de correction après validation.
- **Un essai du microphone** (série 1, E1) et de la **synthèse vocale** (série 1, A) avec votre équipement : la disponibilité des voix dépend du système.
- **Une relecture de la série 3** : ses corrigés reprennent la fiche M1.1.3 « Répondre efficacement aux objections », passés au vouvoiement.
- **La publication sur votre dépôt GitHub**, qui n’a pas été effectuée.
