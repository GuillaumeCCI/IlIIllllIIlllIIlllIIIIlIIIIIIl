# L’Atelier Vente, exercices 1-1-4

Trente-quatre exercices interactifs répartis en cinq séries, réalisés à partir des maquettes fournies. Le projet fonctionne en HTML, CSS et JavaScript, sans framework, sans dépendance et sans compilation. Il reprend le moteur des modules précédents (navigation, sauvegarde, pages de contexte, plein écran, commandes clavier).

| Série | Exercices | Thème |
| --- | --- | --- |
| 1 · Annoncer le prix | 1.1, 1.2, 1.4, 1.5, 1.7 | Quand et comment annoncer, méthode sandwich, banque d’annonces |
| 2 · Défendre le prix | 2.1 à 2.7 | Ne pas brader, cinq leviers de défense, prix à l’usage, objections |
| 3 · Conclure la vente | 3.1 à 3.7 | Signaux d’achat, quatre techniques de conclusion, closing complet |
| 4 · Relancer | 4.1 à 4.7 | Relance de valeur, anatomie d’un e-mail, stratégie, modèle réutilisable |
| 5 · Manipulation | 1.1, 1.2, 2.1, 2.2, 3.1, 3.2, 4.1, 4.2 | Un exercice court par thème |

La série 1 ne compte que cinq exercices : **les maquettes 1.3 et 1.6 n’ont pas été fournies**. Les numéros d’origine ont été gardés.

**Chaque exercice est un fichier HTML autonome** dans `exercices/`. Vous pouvez en ouvrir un seul, ou enchaîner la totalité depuis `index.html` : la progression est partagée.

**Les modules 1-1-1, 1-1-2 et 1-1-3 ne sont pas touchés.** Les projets sont indépendants, et leurs brouillons aussi : la clé de sauvegarde de 1-1-4 (`atelier-vente-1-1-4-v1`) est propre au module.

## Démarrer

Avec Node.js 18 ou supérieur, depuis le dossier :

```sh
npm start
```

Puis ouvrez `http://127.0.0.1:4173/`. Si le port est occupé : `node server.mjs --port 4174`. Pour un simple aperçu, un double-clic sur `index.html` suffit.

## Quatre mécaniques pour 32 exercices

La plupart des exercices partagent une mécanique, décrite une fois dans `js/mounts.js` et paramétrée par le contenu :

| Mécanique | Ce que fait l’apprenant | Exercices |
| --- | --- | --- |
| Une carte, des zones | Classer une carte à la fois (vrai / faux, verbal / non verbal…), en cliquant ou en glissant | S1 1.1, S2 2.1, S3 3.1, S4 4.1, Manip 1.1, 2.1, 3.1, 4.1 |
| Une carte, une zone unique | Relier chaque carte à une zone qui ne sert qu’une fois | S2 2.2, S3 3.2, S4 4.2 |
| Deux réponses à comparer | Choisir la plus efficace, cocher des critères ou les rédiger, justifier | S1 1.5, S2 2.5, S3 3.5, S4 4.5 |
| Des cas, des champs | Une scène (réplique, dialogue, image, e-mail) et des champs, cas par cas | tous les autres |

Deux écrans sont sur mesure : **S1 1.2** (surligner les trois temps de la méthode sandwich) et **S2 2.4** (poser des drapeaux sur les faux pas, puis les nommer).

Les maquettes en plusieurs parties (3.5 A-B, 4.2 A-B, 4.4 A-B, 4.5 A-B-C, 4.6 A-B) sont devenues **un exercice à étapes**. Pour 4.5, les deux relances sont affichées côte à côte au lieu d’onglets : on les compare d’un coup d’œil.

## Les corrigés : issus des fiches d’activité

Les réponses attendues, les explications et les corrigés modèles proviennent des **fiches d’activité M1.1.4** :

| Série | Fiche source |
| --- | --- |
| 1 · Annoncer le prix | « Activités supplémentaires SCORM 1 » (1.1, 1.2, 1.4, 1.5, 1.7) |
| 2 · Défendre le prix | « Activités supplémentaires SCORM 2 » (2.1 à 2.7) |
| 3 · Conclure la vente | « Activités supplémentaires SCORM 3 » (3.1 à 3.7) |
| 4 · Relancer | « Activités supplémentaires SCORM 4 » (4.1 à 4.7) |
| 5 · Manipulation | « Activités, Présenter le prix et conclure la vente » (activités 1 à 4) |

Les fiches tutoient l’apprenant ; les corrigés ont été transposés au vouvoiement, sans en changer le fond. Les « À retenir » des fiches s’affichent sous chaque corrigé. L’interface indique sous chaque corrigé : « Corrigé modèle issu de la fiche d’activité ». Les exercices 1.3 et 1.6 de la fiche SCORM 1, sans maquette, n’ont pas été ajoutés.

Les éléments que les maquettes ne montraient pas avaient d’abord été rédigés ; ils ont été **remplacés par ceux des fiches** :

- les affirmations et cartes 2 et suivantes des exercices « une carte, des zones » (S1 1.1, S2 2.1, S3 3.1, S4 4.1, Manip 1.1, 2.1, 3.1, 4.1) ;
- les répliques b à e de S2 2.2, les situations de S3 3.3, les étapes de S3 3.4 ;
- toutes les phrases modèles des corrigés.

Changements de réponse attendue apportés par les fiches :

- **S3 3.3** : la situation 2 devient « le client hésite entre 5 et 10 postes » (l’illustration B montre bien ces deux implantations). Pour la situation 3, la conclusion récapitulative **et** la directe sont acceptées.
- **S3 3.5** : la fiche juge **les deux réponses pertinentes**, selon l’engagement déjà exprimé par le client. Les deux choix sont désormais acceptés ; le moteur de comparaison (`js/mounts.js`) accepte pour cela une liste de réponses (`answer: ['1', '2']`).
- **Manip 2.1** : « Quel budget aviez-vous prévu ? » est classé **négocier** : posée juste après « c’est trop cher », la question porte sur le montant, pas sur la valeur.
- **Manip 3.1, 4.1** : les cartes de la fiche remplacent celles qui avaient été rédigées (dont une réaction non verbale, F, classée signal d’achat).

Points qui méritent votre regard :

- **S2 2.2** : le texte du levier 2 est coupé sur la maquette ; la fiche confirme « Rappeler la valeur et ce que le prix comprend ».
- **Le prix de 2 400 €** des exercices de manipulation 1.1 et 1.2 est celui de la fiche : une offre générique d’accompagnement annuel, distincte des offres Ergolys.

Tous les textes se modifient sans toucher au code : `js/content-s1.js` à `js/content-s5.js`, un bloc commenté par exercice.

### Ce que la validation vérifie

La validation contrôle que tout est rempli, placé ou choisi. Elle **ne juge pas la qualité** des textes et n’attribue aucune note. Les exercices à bonne réponse sont corrigés réponse par réponse (vert ou rouge, avec une explication) ; les productions rédigées reçoivent un exemple en regard. Le corrigé apparaît **après la dernière étape**.

## Glisser-déposer, clic et clavier

Les cartes se glissent sur les zones, mais **le glisser-déposer n’est jamais le seul chemin** : chaque carte et chaque zone sont aussi des boutons. Un test vérifie cette équivalence.

## Illustrations

Les neuf illustrations fournies sont utilisées :

| Fichier | Exercice |
| --- | --- |
| `s2/1-1-4-S2-i2-3-A.png`, `-B.png` | S2 2.3, offres 1 et 2 |
| `s3/1-1-4-S3-i3-3-A.png`, `-B.png`, `-C.png` | S3 3.3, situations 1, 2 et 3 |
| `s3/1-1-4-S3-i3-5.png` | S3 3.5 |
| `s3/1-1-4-S3-i3-6.png` | S3 3.6 |
| `s5/1-1-4-S5-i2-2.png` | Manipulation 2.2 |
| `s5/1-1-4-S5-i3-2.png` | Manipulation 3.2 |

Les autres exercices affichent sur leur page de contexte un schéma de leur mécanique. Pour remplacer ou ajouter une image, suivez `assets/illustrations/COMMENT-REMPLACER-UNE-IMAGE.txt`, puis lancez `npm run build:images`.

## Les fonds d’écran

Aucun fond n’a été fourni : ceux du module 1-1-3 ont été redistribués sur les 34 exercices. La correspondance est dans `assets/backgrounds/COMMENT-AJOUTER-UN-FOND.txt`.

## Se repérer dans les fichiers

| Emplacement | Rôle |
| --- | --- |
| `js/catalog.js` | **Le fichier central** : séries, mécanique de chaque exercice, images, fonds |
| `js/content-s1.js` … `content-s5.js` | Tous les textes, réponses attendues et corrigés |
| `js/briefings.js` | Les pages de contexte |
| `js/mounts.js` | Les quatre mécaniques d’exercice |
| `js/kit.js` | Les briques communes (en-têtes, paquets de cartes, glisser-déposer) |
| `js/screens/*.js` | Un fichier par exercice : la plupart appellent une mécanique |
| `css/mounts.css` | Les styles des mécaniques et des deux écrans sur mesure |
| `references/` | Les maquettes d’origine, par série |

Après avoir modifié le catalogue, lancez `npm run build`.

## Vérifications effectuées

- `npm test` : **144 tests, tous au vert**. 3 sur les règles de saisie ; 89 qui montent chacun des 34 écrans (page de contexte et exercice, refus d’une réponse vide, absence d’emoji et de tiret cadratin, icônes, équivalent au clic du glisser-déposer) ; 52 qui jouent des parcours, dont **les 34 exercices menés jusqu’au corrigé avec les réponses attendues**, sans qu’aucune n’y soit marquée fausse.
- `npm run check:layout` : les 34 écrans mesurés en 1920 × 1080 puis 1366 × 768, **68 cas sans contenu coupé ni chevauchement**. Aucun débordement horizontal en largeur réduite non plus.
- Contrôle visuel des écrans, de plusieurs corrigés et de l’accueil, comparés aux maquettes.

Restent à faire de votre côté : **une relecture des transpositions** (les corrigés reprennent les fiches M1.1.4, passés au vouvoiement), et **un parcours sur tablette ou téléphone**.
