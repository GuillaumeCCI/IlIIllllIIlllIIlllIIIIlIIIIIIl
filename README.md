# L’Atelier Vente · les parcours

Un dépôt, plusieurs parcours d’exercices interactifs. Publié par GitHub Pages à chaque envoi sur GitHub (branche `main`, dossier racine) : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/. Le dépôt doit rester public, sinon GitHub Pages (gratuit) s’arrête.

```
atelier-vente/            ← ce dépôt (Documents\atelier-vente)
├── index.html            l’accueil général (liste des parcours, généré)
├── moteur/               UNE copie des fichiers communs à tous les parcours :
│                         scripts (sons, glisser-déposer, exercices…), styles
│                         de base, sons, polices, fonds de chargement
├── atelier-vente/        un parcours
│   ├── index.html        son accueil (généré)
│   ├── integrer.html     liens et codes d’intégration LMS (généré)
│   ├── 1-1-1/            un module : pages, scripts, styles, illustrations,
│   ├── 1-1-2/            tests (tests/) et outils (tools/) du module
│   └── …
├── outils/               assembler.mjs (pages générées), tester.mjs (tests)
└── _redirects            anciennes redirections Netlify, sans effet sur GitHub Pages
```

## Travailler

- **Modifier un exercice** : directement dans `atelier-vente/1-1-x/` (VS Code). Live Server à la racine du dépôt montre tout le site.
- **Après un ajout de module ou un changement de titre** : `npm run assembler` (régénère les accueils et la page « Intégrer »).
- **Tester tout** : `npm test` (ou `npm test -- atelier-vente` pour un seul parcours).
- **Publier** : enregistrer (commit) puis envoyer (push) sur GitHub. Le site en ligne se met à jour seul, en une minute environ.

## Les liens LMS

Un thème d’un module : `https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/atelier-vente/1-1-2/index.html?embed=module&theme=s3`. La page `atelier-vente/integrer.html` donne tous les liens : module entier, thème par thème, exercice seul.

## Le moteur commun

Un fichier de `moteur/` sert à tous les modules de tous les parcours : le modifier change tout le site. Un fichier présent dans un module (`js/`, `css/`) reste propre à ce module. Les pages chargent le moteur par `../../moteur/` (accueil d’un module) ou `../../../moteur/` (page d’exercice).

## Réglages communs

- Carte « citation client » : variables `--client-card-*` en fin de `css/extras.css` ; portraits page par page dans `js/catalog.js` (rubrique `portraits`).
- Les captures de contrôle (`captures/`) et les maquettes (`references/`) restent sur l’ordinateur, jamais publiées.
