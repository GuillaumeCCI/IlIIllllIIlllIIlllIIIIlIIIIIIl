# L’Atelier Vente, exercices 1-1-3

Dix-huit exercices interactifs répartis en trois séries, réalisés à partir des maquettes fournies. Le projet fonctionne en HTML, CSS et JavaScript, sans framework, sans dépendance et sans compilation. Il reprend le moteur des modules 1-1-1 et 1-1-2 (navigation, sauvegarde, pages de contexte, plein écran, commandes clavier) et lui ajoute ses propres écrans.

| Série | Exercices | Thème |
| --- | --- | --- |
| 1 · Gérer les objections | 1.1 à 1.7 | Bons réflexes, méthode en six étapes, nature de l’objection, objection silencieuse, bibliothèque de réponses |
| 2 · Prospection téléphonique | 2.1 à 2.7 | Barrage et prétexte, erreurs d’appel, standard, demande de documentation, scripts et cartes réflexes |
| 3 · Manipulation | 1.1, 1.2, 2.1, 2.2 | Remettre la méthode dans l’ordre, crash-test d’une réponse, nature des objections, mode traitement |

**Chaque exercice est un fichier HTML autonome** dans `exercices/`. Vous pouvez en ouvrir un seul, ou enchaîner la totalité depuis `index.html` : la progression est partagée entre les deux modes.

**Les modules 1-1-1 et 1-1-2 ne sont pas touchés.** Les trois projets sont indépendants, et leurs brouillons aussi : la clé de sauvegarde de 1-1-3 (`atelier-vente-1-1-3-v1`) est différente des deux autres. Un apprenant peut suivre les trois modules dans le même navigateur sans mélange.

## Démarrer en deux minutes

1. Ouvrez le dossier `atelier-vente` dans Visual Studio Code : **Fichier → Ouvrir le dossier**.
2. Pour un premier aperçu, double-cliquez sur `index.html`.
3. Pour travailler confortablement, lancez le serveur, puis ouvrez l’adresse indiquée.

Avec Node.js 18 ou supérieur, depuis le terminal de VS Code :

```sh
npm start
```

Aucun `npm install` n’est nécessaire. Le serveur écoute sur `http://127.0.0.1:4173/` ; `Ctrl+C` l’arrête. Si le port est occupé (par exemple parce que le serveur d’un autre module tourne déjà) : `node server.mjs --port 4174`.

L’enregistrement de la voix (exercice 2.6, facultatif) demande un navigateur compatible et l’autorisation du micro, sur localhost ou HTTPS.

## Les dix-huit exercices

Les deux maquettes de l’exercice 1.3 (fichiers « A » et « B ») montrent deux variantes du même écran, la seconde décision. Elles ont été réunies en **un seul exercice à étapes** : pour chaque cas, on pose d’abord le diagnostic, puis on choisit le geste.

### Série 1 · Gérer les objections

| ID | Interaction |
| --- | --- |
| 1.1 | Huit attitudes du commercial, une à la fois : « À éviter » ou « Bon réflexe » (cliquer ou glisser la carte), la suivante apparaît d’elle-même |
| 1.2 | Six rôles, un à la fois, à relier à l’un des six verbes de la méthode, chaque verbe servant une seule fois |
| 1.3 | Quatre objections : la nature (sincère et fondée, malentendu, prétexte, réassurance), puis le premier geste (argumenter, informer, creuser, rassurer). Bouton « Rappel » |
| 1.4 | Une scène illustrée et trois répliques : l’objection silencieuse probable, puis la question ouverte qui la révèle |
| 1.5 | Deux réponses à « C’est trop cher » : choisir la plus efficace, expliquer pourquoi |
| 1.6 | Une objection au choix, une phrase par étape de la méthode, puis une auto-évaluation |
| 1.7 | Quatre fiches d’objection : nature, question pour creuser, réponse type, preuve ; vue en tableau |

### Série 2 · Prospection téléphonique

| ID | Interaction |
| --- | --- |
| 2.1 | Six répliques entendues au téléphone : B (barrage), P (prétexte) ou O (objection réelle) |
| 2.2 | Cinq erreurs à relier à leur conséquence (cliquer l’erreur puis la conséquence, ou glisser) |
| 2.3 | Simulation d’appel : la situation, puis deux tours de parole avec l’accueil, chacun confronté aux trois clés (courtois, bref, facilitant) |
| 2.4 | La transcription d’un appel raté : relever quatre maladresses |
| 2.5 | Deux réponses à « Envoyez-moi une documentation » : choisir, expliquer |
| 2.6 | Trois esquives, un script de 2 à 3 phrases chacune, puis une lecture à voix haute (enregistrement facultatif) et une auto-évaluation de la voix |
| 2.7 | Trois cartes réflexes (posture, réponse, rebond), puis la fiche « mode appel », imprimable |

### Série 3 · Manipulation

| ID | Interaction |
| --- | --- |
| 1.1 | Six cartes à placer sur le parcours, du départ à l’arrivée ; « Débloquer la méthode » révèle le nom des étapes |
| 1.2 | Poser des drapeaux sur les passages maladroits d’une réponse au prix, nommer quatre erreurs, puis réécrire la réponse |
| 2.1 | Six réactions, une à la fois, à ranger dans l’un des quatre dossiers de nature |
| 2.2 | Trois mauvais réflexes : pourquoi ça bloque, puis la réponse adaptée (accueil, question, suite) |

Les maquettes du dossier Manipulation sont nommées `3.1` à `3.4`, mais portent les titres « Exercice 1.1 », « 1.2 », « 2.1 » et « 2.2 » : ce sont ces numéros qui ont été gardés, comme pour le module 1-1-2. La maquette `2.1` du dossier S2 indique « Exercice 08 / 08 » dans son en-tête : elle a été traitée comme l’exercice 2.1.

## Les corrigés : issus des fiches d’activité

Les réponses attendues, les explications et les corrigés modèles proviennent des **fiches d’activité M1.1.3** :

| Série | Fiche source |
| --- | --- |
| 1 · Gérer les objections | « Activités supplémentaires SCORM 1 », exercices 1.1 à 1.7 |
| 2 · Prospection téléphonique | « Activités supplémentaires SCORM 2 », exercices 2.1 à 2.7 |
| 3 · Manipulation | « Activités 1 et 2, Manipulation » |

Les fiches tutoient l’apprenant ; l’interface le vouvoie, les textes ont donc été transposés sans en changer le fond. L’interface l’indique sous chaque corrigé : « Corrigé modèle issu de la fiche d’activité ».

Les maquettes ne montrent que le premier écran de chaque exercice. Les éléments qu’elles ne montraient pas avaient d’abord été rédigés ; ils ont été **remplacés par ceux des fiches** :

| Exercice | Ce que la fiche a apporté |
| --- | --- |
| S1 1.1 | Les situations 2 à 8 |
| S1 1.2 | Le texte des six rôles (repris aussi dans le rappel de la méthode) |
| S1 1.3 | Les cas 2 à 4 : la livraison en région (malentendu), la baisse des arrêts (réassurance), la plaquette (prétexte) |
| S1 1.4 | Les objections probables et la question qui les révèle |
| S1 1.5, 1.6 | Le corrigé de 1.5 et les six phrases modèles de « Nos chaises actuelles suffisent » |
| S1 1.7 | Les quatre fiches : nature, question, réponse et preuve |
| S2 2.1 | « Envoyez un mail, on vous rappellera » est un **barrage**, et non plus un prétexte |
| S2 2.3 à 2.7 | Le corrigé du premier tour au standard, les quatre erreurs de l’appel, les scripts et les cartes réflexes |
| S3 1.2 | Six maladresses au lieu de quatre (s’y ajoutent : ne pas creuser, ne pas reformuler) et la réponse réécrite |
| S3 2.1, 2.2 | Les réactions b à f, les cas 2 et 3 et leurs réponses |

Trois points restent rédigés, faute d’équivalent dans les fiches :

- **S1 1.6** : la fiche ne donne un modèle que pour « Nos chaises actuelles suffisent ». Les phrases des trois autres objections au choix reprennent les réponses de la bibliothèque d’objections (1.7) de la fiche.
- **S2 2.3** : la fiche corrige le premier tour de parole ; le second (« Il est en déplacement toute la semaine ») et son modèle ont été rédigés.
- **S3 2.1** : la fiche de manipulation, générique, donne une garantie de 3 ans. Dans le fil rouge Ergolys, la garantie est de 5 ans partout ailleurs ; le corrigé retient donc 5 ans.

Deux choix de réponse méritent votre regard :

- **S2 2.1** : la fiche classe « Envoyez un mail, on vous rappellera » en barrage, et « On a déjà un fournisseur, merci » en prétexte. Le premier peut se discuter s’il vient du décideur lui-même.
- **S1 1.7** : la nature des quatre objections n’est pas notée, car elle dépend du contexte. Le corrigé indique la nature retenue par la fiche.

Tous ces textes se modifient sans toucher au code : `js/content-s1.js` à `js/content-s3.js`, un bloc commenté par exercice. Les réponses attendues y figurent en clair (`answer`, `nature`, `gesture`, `step`…). La méthode en six étapes et les quatre natures d’objection, communes à plusieurs exercices, sont en tête de `content-s1.js`.

### Ce que la validation vérifie

La validation contrôle que tout est rempli ou placé. Elle **ne juge pas la qualité** des textes rédigés et n’attribue aucune note. Pour les exercices à bonne réponse, le corrigé détaille, réponse par réponse, ce qui est juste (vert) et ce qui ne l’est pas (rouge), avec une explication. Pour les productions rédigées, il place un exemple juste sous la réponse de l’apprenant. Deux contrôles de forme s’ajoutent : la question de 1.4 doit finir par un point d’interrogation, et chaque script de 2.6 doit compter au moins deux phrases.

Le corrigé apparaît **après la dernière étape** de chaque exercice. **Réinitialiser** efface les réponses de l’exercice ; il demande un second clic pour confirmer.

## Glisser-déposer, clic et clavier

Quatre exercices se jouent au glisser-déposer : S1 1.1, S2 2.2, S3 1.1 et S3 2.1. **Le glisser-déposer n’est jamais le seul chemin** : chaque carte et chaque zone sont aussi des boutons, donc utilisables au clic, au doigt sur tablette et au clavier. Un test vérifie cette équivalence.

## Illustrations

| Fichier | Exercices | Origine |
| --- | --- | --- |
| `assets/illustrations/s1/1-1-3-S1-i1-4.png` | S1 1.4 | Fichier `i1.4.png` fourni |
| `assets/illustrations/s1/1-1-3-S1-i1-5.png` | S1 1.5 | Fichier `i1.5.png` fourni |
| `assets/illustrations/s2/1-1-3-S2-i2-4.png` | S2 2.4 | Fichier `i2.4.png` fourni |
| `assets/illustrations/s1/1-1-3-S1-portrait.png` | S1 1.6 | **Recadré dans `i1.4.png`**, faute de fichier séparé |

Sur la maquette 1.6, le client est représenté par un petit portrait : c’est l’homme de l’illustration 1.4, recadré sur son visage. Si vous disposez d’un portrait d’origine, déposez-le sous le même nom.

La maquette 1.5 montrait une scène de bureau ; l’illustration fournie sous le nom `i1.5` montre une boutique de luminaires. C’est elle qui est utilisée. Le texte du commercial 2 évoque toutefois les TMS et l’essai de 30 jours, propres au mobilier de bureau : si vous changez d’image ou de texte, gardez les deux cohérents.

Les autres exercices n’ont pas d’illustration fournie : leur page de contexte affiche un schéma de leur mécanique, tracé en SVG (`js/previews.js`). Pour ajouter une illustration, suivez `assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt`.

```sh
npm install --no-save sharp   # une seule fois
npm run build:images          # produit les versions allégées .web.png
```

## Les fonds d’écran

Aucun fond n’a été fourni pour 1-1-3 : les fonds des modules précédents ont été réutilisés et répartis sur les 18 exercices. La correspondance est listée dans `assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt`. Pour changer un fond, glissez votre image par-dessus la sienne, en gardant le nom.

## Se repérer dans les fichiers

| Emplacement | Rôle |
| --- | --- |
| `index.html` | Accueil : les trois séries, la reprise et le bilan |
| `exercices/*.html` | Une page autonome par exercice (18 fichiers, générés) |
| `js/catalog.js` | **Le fichier central** : séries, images, fonds, ordre, clé de sauvegarde |
| `js/content-s1.js` … `content-s3.js` | Tous les textes, réponses attendues et corrigés, par série |
| `js/briefings.js` | Les textes des pages de contexte |
| `js/kit.js` | Les briques communes aux écrans : en-têtes, étapes, grilles, paquets de cartes, comparaison de deux réponses, glisser-déposer |
| `js/screens/*.js` | Un fichier par exercice : son écran, sa validation, son corrigé |
| `js/core.js`, `js/exercise.js` | Le moteur repris de 1-1-1 : état, sauvegarde, navigation, validation |
| `css/kit.css` | Les styles des briques communes |
| `css/s1.css` … `s3.css` | Les styles propres à chaque série |
| `references/` | Les maquettes d’origine, renommées sans espaces, par série |
| `tools/` | Génération des pages, des aide-mémoire, des images ; mesure de la mise en page |
| `tests/` | Tests ; lancer `npm test` |

Après avoir modifié le catalogue, lancez `npm run build` pour régénérer les pages et les aide-mémoire.

## Conservation des réponses

Les réponses sont stockées avec `localStorage`, uniquement dans le navigateur utilisé, et partagées entre toutes les pages du module. Elles ne sont ni synchronisées, ni envoyées à un formateur. L’enregistrement de la voix (2.6) n’est jamais conservé : il reste dans la mémoire de la page et s’efface en la quittant.

## Vérifications effectuées

- `npm test` : **97 tests, tous au vert**. 3 sur les règles de saisie ; 57 qui montent chacun des 18 écrans (page de contexte et exercice, refus d’une réponse vide, absence d’emoji et de tiret cadratin, icônes, équivalent au clic de chaque glisser-déposer) ; 37 qui jouent des parcours, dont **les 18 exercices menés jusqu’au corrigé avec les réponses attendues**, en vérifiant qu’aucune n’y est marquée fausse : les corrigés sont cohérents avec les contenus.
- `npm run check:layout` : les 18 écrans mesurés dans Microsoft Edge, en 1920 × 1080 puis en 1366 × 768. **Sur les 36 cas : aucun contenu coupé, aucun chevauchement.** Aucun débordement horizontal non plus en largeur réduite.
- Contrôle visuel des 18 écrans, des écrans de corrigé, d’une page de contexte et de l’accueil, comparés aux maquettes.

Restent à faire de votre côté :

- **Une relecture des transpositions** : les corrigés reprennent les fiches d’activité M1.1.3, passés au vouvoiement.
- **Un essai de l’enregistrement audio** (2.6) avec votre équipement.
- **Un parcours sur tablette ou téléphone** : la mise en page s’adapte, mais n’a été mesurée que sur ordinateur.
