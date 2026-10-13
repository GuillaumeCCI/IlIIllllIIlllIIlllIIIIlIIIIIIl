# L’Atelier Vente, exercices 1-1-2

Vingt-quatre exercices interactifs répartis en quatre séries de six, réalisés à partir des maquettes fournies. Le projet fonctionne en HTML, CSS et JavaScript, sans framework, sans dépendance et sans compilation. Il reprend le moteur du module 1-1-1 (navigation, sauvegarde, pages de contexte, plein écran, commandes clavier) et lui ajoute ses propres écrans.

| Série | Exercices | Thème |
| --- | --- | --- |
| 1 · Bâtir l’argument | 1.1 à 1.6 | Méthodes CAP et SONCAS, hiérarchiser, réparer un argumentaire |
| 2 · Pitcher avec impact | 2.1 à 2.6 | Idées reçues, conviction, accroches, preuves, audit, pitch de 60 s |
| 3 · Argumenter avec justesse | 3.1 à 3.6 | Pertinence, effet sur le client, écoute, réactions |
| 4 · Manipulation | 1.1, 1.2, 2.1, 2.2, 3.1, 3.2 | C, A ou P, chaîne CAP, caractéristique ou bénéfice, à faire ou à éviter |

**Chaque exercice est un fichier HTML autonome** dans `exercices/`. Vous pouvez en ouvrir un seul, ou enchaîner la totalité depuis `index.html` : la progression est partagée entre les deux modes.

**Le module 1-1-1 n’est pas touché.** Les deux projets sont indépendants, et leurs brouillons aussi : la clé de sauvegarde de 1-1-2 (`atelier-vente-1-1-2-v1`) est différente de celle de 1-1-1. Un apprenant peut suivre les deux modules dans le même navigateur sans mélange.

## Démarrer en deux minutes

1. Ouvrez le dossier `atelier-vente` dans Visual Studio Code : **Fichier → Ouvrir le dossier**.
2. Pour un premier aperçu, double-cliquez sur `index.html`.
3. Pour travailler confortablement, lancez le serveur, puis ouvrez l’adresse indiquée.

Avec Node.js 18 ou supérieur, depuis le terminal de VS Code :

```sh
npm start
```

Aucun `npm install` n’est nécessaire. Le serveur écoute sur `http://127.0.0.1:4173/` ; `Ctrl+C` l’arrête. Si le port est occupé (par exemple parce que le serveur du module 1-1-1 tourne déjà) : `node server.mjs --port 4174`.

L’enregistrement du pitch (exercice 2.6) demande un navigateur compatible et l’autorisation du micro ou de la caméra, sur localhost ou HTTPS.

## Les vingt-quatre exercices

Les maquettes de plusieurs écrans d’un même exercice (fichiers « A », « B », « C ») ont été réunies en **un seul exercice à étapes** : on avance d’une étape à l’autre, on peut revenir en arrière, et la progression est conservée.

### Série 1 · Bâtir l’argument

| ID | Maquettes | Interaction |
| --- | --- | --- |
| 1.1 | A1, A2 | Trois séries de quatre cartes : écarter l’intrus (glisser vers la corbeille ou cliquer), puis classer le trio en C, A ou P |
| 1.2 | 1;2 | Deux arguments à surligner mot à mot avec trois surligneurs C, A, P (clic ou balayage) |
| 1.3 | 1.3 | Trois besoins du prospect : déposer les caractéristiques, rédiger l’avantage, déposer la preuve |
| 1.4 | A, B, C | Deux clients : repérer les indices dans leurs propos, choisir la motivation SONCAS, deux arguments, justifier |
| 1.5 | A, B | Tournoi : deux demi-finales, une finale, puis justification du grand gagnant |
| 1.6 | A, B, C | Rédiger le pire argumentaire, diagnostiquer trois erreurs, le réparer, comparer avant / après |

### Série 2 · Pitcher avec impact

| ID | Interaction |
| --- | --- |
| 2.1 | Huit affirmations, une à la fois : mythe ou méthode (glisser ou cliquer), « Passer », « Annuler le dernier choix » |
| 2.2 | Ranger cinq propositions sur une échelle de conviction de 1 à 5 |
| 2.3 | Trois accroches pour une gérante de PME : question, chiffre-choc, bénéfice projeté |
| 2.4 | Cinq affirmations d’un pitch : étayée ou trou de preuve |
| 2.5 | Noter un pitch sur la grille commune (6 critères, de 0 à 2), puis désigner la modification prioritaire |
| 2.6 | Rédiger un pitch de 60 s (mots et durée estimée en direct), l’enregistrer en audio ou vidéo, s’auto-évaluer sur 7 critères |

### Série 3 · Argumenter avec justesse

| ID | Interaction |
| --- | --- |
| 3.1 | Trois séries de trois affirmations : repérer l’erreur et expliquer pourquoi elle pénalise l’échange |
| 3.2 | Associer six comportements du commercial à six réactions du client (numéros à glisser ou à poser d’un clic) |
| 3.3 | Trois attentes du client, cinq arguments dont deux intrus, chacun utilisable une fois |
| 3.4 | Cinq arguments face à une priorité : pertinent ou dérive, avec une jauge de score |
| 3.5 | Quatre répliques : le vendeur vérifie-t-il l’impact ? Sinon, rédiger sa question de contrôle |
| 3.6 | L’arbre des réactions : C, A, P, puis la suite face à un client convaincu et face à un client sceptique |

### Série 4 · Manipulation

| ID | Interaction |
| --- | --- |
| 1.1 | Six affirmations : C, A ou P |
| 1.2 | Deux caractéristiques : rédiger l’avantage et la preuve |
| 2.1 | Six formulations : caractéristique ou bénéfice client |
| 2.2 | Deux fiches techniques à traduire en « Vous… + bénéfice » |
| 3.1 | Six comportements, une carte à la fois : à faire ou à éviter |
| 3.2 | Un échange de sur-argumentation : relever trois erreurs, puis comparer au corrigé |

La maquette fournie sous le nom `4.1.png` du dossier Manipulation porte en réalité le titre « Exercice 1.1 » : elle a été traitée comme l’exercice 1.1.

## Les corrigés : issus des fiches d’activité

Les réponses attendues, les explications et les corrigés modèles des 24 exercices proviennent des **fiches d’activité M1.1.2** :

| Série | Fiche source |
| --- | --- |
| 1 · Bâtir l’argument | « Activités supplémentaires SCORM 1 », exercices 1.1 à 1.6 |
| 2 · Pitcher avec impact | « Activités supplémentaires SCORM 2 », exercices 2.1 à 2.6 |
| 3 · Argumenter avec justesse | « Activités supplémentaires SCORM 3 », exercices 3.1 à 3.6 |
| 4 · Manipulation | « Activités 1 à 3, Manipulation des connaissances » |

Les fiches tutoient l’apprenant ; l’interface le vouvoie, les textes ont donc été transposés sans en changer le fond. L’interface l’indique sous chaque corrigé : « Corrigé modèle issu de la fiche d’activité ». Les exercices 1.7, 2.7 et 3.7 des fiches (carte d’argumentaire, exercices avec une intelligence artificielle) n’ont pas d’écran correspondant et n’ont pas été ajoutés.

Les maquettes ne montrent que le premier écran de chaque exercice. Les éléments qu’elles ne montraient pas avaient d’abord été rédigés ; ils ont été **remplacés par ceux des fiches** :

| Exercice | Ce que la fiche a apporté |
| --- | --- |
| S1 1.1 | Les séries B et C de l’intrus (intrus B : la carte 4, trio de preuves ; intrus C : la carte 3, trio d’avantages) |
| S1 1.2 | Le second argument à décomposer (l’accès mobile) |
| S1 1.3 | Le classement des cartes : « Conforme RGPD » devient une preuve ; l’accès mobile et l’import CSV sont « pertinents mais non prioritaires » ; l’analyse des cartes écartées |
| S1 1.4 | Le second client, motivé par l’**argent** (et non plus le confort), avec la même liste d’arguments que le premier |
| S2 2.1 | Les affirmations 2 à 8 |
| S2 2.2 | L’ordre attendu : b < d < c < e < a (b et d étaient inversés) |
| S3 3.1 | Les séries A, B et C |
| S3 3.3 | Les attentes 2 et 3 |
| S3 3.5 | Les répliques 2 à 4 (la 4 vérifie l’impact) |
| S3 3.6 | Les deux réactions du client et les corrigés de chaque étape |
| S4 3.1 | Les cartes 2 à 6 |
| S4 3.2 | Quatre erreurs au corrigé (besoin ignoré, effet catalogue, jargon, monologue) |

Ce qui reste rédigé pour l’interface, hors corrigé : les indices, les cartes « piège » de 1.6, les critères de relecture et les messages d’aide.

**Les réponses de S3 3.2 ont été mélangées.** Sur la maquette, le comportement 1 correspond à la réaction a, le 2 à la b, et ainsi de suite : l’exercice se résolvait sans réfléchir. L’ordre des réactions a donc été changé.

Tous ces textes se modifient sans toucher au code : `js/content-s1.js` à `js/content-s4.js`, un bloc commenté par exercice. Les réponses attendues y figurent en clair (`answer`, `intruder`, `category`, `rank`…).

### Ce que la validation vérifie

La validation contrôle que tout est rempli ou placé. Elle **ne juge pas la qualité** des textes rédigés et n’attribue aucune note. Pour les exercices à bonne réponse, le corrigé détaille, réponse par réponse, ce qui est juste (vert) et ce qui ne l’est pas (rouge), avec une explication. Pour les productions rédigées, il place un exemple juste sous la réponse de l’apprenant.

Le corrigé apparaît **après la dernière étape** de chaque exercice, comme l’annoncent les maquettes (« Corrigé disponible après les 3 séries »). **Réinitialiser** efface les réponses de l’exercice ; il demande un second clic pour confirmer.

## Glisser-déposer, clic et clavier

Six exercices se jouent au glisser-déposer : S1 1.1, 1.3, S2 2.1, 2.2, S3 3.2 et S4 3.1. Les surligneurs de S1 1.2 s’utilisent au clic, mot par mot, ou en balayant plusieurs mots bouton enfoncé. **Le glisser-déposer n’est jamais le seul chemin** : chaque carte et chaque zone sont aussi des boutons, donc utilisables au clic, au doigt sur tablette et au clavier. Un test vérifie cette équivalence.

## Illustrations

| Fichier | Exercices | Origine |
| --- | --- | --- |
| `assets/illustrations/s2/1-1-2-S2-i2-3.png` | S2 2.3 | Fichier `i2.3.png` fourni |
| `assets/illustrations/s1/1-1-2-S1-i1-4.png` | S1 1.4 et 1.5 | **Extrait de la maquette 1.4 A**, faute de fichier séparé |

Le portrait du client de S1 1.4 et 1.5 n’existait que dans les maquettes : il en a été découpé, en 610 × 280 pixels. Il est net à l’écran mais moins fin qu’une illustration d’origine. **Si vous disposez du fichier original, déposez-le sous le même nom** (`1-1-2-S1-i1-4.png`), puis lancez `npm run build:images`. Le second client de 1.4 n’a pas d’illustration : il est représenté par une carte.

Les autres exercices n’ont pas d’illustration fournie : leur page de contexte affiche un schéma de leur mécanique, tracé en SVG (`js/previews.js`). Pour ajouter une illustration, suivez `assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt`.

```sh
npm install --no-save sharp   # une seule fois
npm run build:images          # produit les versions allégées .web.png
```

## Les fonds d’écran

Aucun fond n’a été fourni pour 1-1-2 : les neuf fonds du module 1-1-1 ont été réutilisés, répartis sur les 24 exercices par le même tirage reproductible. La correspondance est listée dans `assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt`. Pour changer un fond, glissez votre image par-dessus la sienne, en gardant le nom.

## Se repérer dans les fichiers

| Emplacement | Rôle |
| --- | --- |
| `index.html` | Accueil : les quatre séries, la reprise et le bilan |
| `exercices/*.html` | Une page autonome par exercice (24 fichiers, générés) |
| `js/catalog.js` | **Le fichier central** : séries, images, fonds, ordre, clé de sauvegarde |
| `js/content-s1.js` … `content-s4.js` | Tous les textes, réponses attendues et corrigés, par série |
| `js/briefings.js` | Les textes des pages de contexte |
| `js/kit.js` | Les briques communes aux écrans 1-1-2 : en-têtes, étapes, grilles, paquets de cartes, glisser-déposer |
| `js/screens/*.js` | Un fichier par exercice : son écran, sa validation, son corrigé |
| `js/core.js`, `js/exercise.js` | Le moteur repris de 1-1-1 : état, sauvegarde, navigation, validation |
| `css/kit.css` | Les styles des briques communes, et des exercices S1 1.1 et 1.2 |
| `css/s1.css` … `s4.css` | Les styles propres à chaque série |
| `references/` | Les maquettes d’origine, renommées sans espaces, par série |
| `tools/` | Génération des pages, des aide-mémoire, des images ; mesure de la mise en page |
| `tests/` | Tests ; lancer `npm test` |

Après avoir modifié le catalogue, lancez `npm run build` pour régénérer les pages et les aide-mémoire.

## Conservation des réponses

Les réponses sont stockées avec `localStorage`, uniquement dans le navigateur utilisé, et partagées entre toutes les pages du module. Elles ne sont ni synchronisées, ni envoyées à un formateur. L’enregistrement du pitch (2.6) n’est jamais conservé : il reste dans la mémoire de la page et s’efface en la quittant.

## Vérifications effectuées

- `npm test` : **111 tests, tous au vert**. 3 sur les règles de saisie ; 69 qui montent chacun des 24 écrans (page de contexte et exercice, refus d’une réponse vide, absence d’emoji et de tiret cadratin, icônes, équivalent au clic de chaque glisser-déposer) ; 39 qui jouent des parcours, dont **les 24 exercices menés jusqu’au corrigé avec les réponses attendues**, en vérifiant qu’aucune n’y est marquée fausse : les corrigés sont cohérents avec les contenus.
- `npm run check:layout` : les 24 écrans mesurés dans Microsoft Edge, en 1920 × 1080 puis en 1366 × 768. **Sur les 48 cas : aucun contenu coupé, 94 % de la largeur occupée, aucun chevauchement.** La règle de chevauchement de l’outil a été corrigée : elle signalait à tort deux colonnes posées côte à côte.
- Contrôle visuel des 24 écrans, de plusieurs pages de contexte, de l’accueil et des écrans de corrigé, comparés aux maquettes.

Restent à faire de votre côté :

- **Une relecture des transpositions** : les corrigés reprennent les fiches d’activité M1.1.2, passés au vouvoiement.
- **Un essai de l’enregistrement audio et vidéo** (2.6) avec votre équipement.
- **Un parcours sur tablette ou téléphone** : la mise en page s’adapte, mais n’a été mesurée que sur ordinateur.
- **L’illustration d’origine du client de S1 1.4 et 1.5**, si vous l’avez.
