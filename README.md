# L’Atelier Vente · les parcours

Un dépôt, plusieurs parcours d’exercices interactifs. Publié par Netlify à chaque envoi sur GitHub (branche `main`).

```
atelier-vente/            ← ce dépôt (Documents\atelier-vente)
├── index.html            l’accueil général (liste des parcours, généré)
├── atelier-vente/        un parcours
│   ├── index.html        son accueil (généré)
│   ├── integrer.html     liens et codes d’intégration LMS (généré)
│   ├── 1-1-1/            un module : pages, scripts, styles, illustrations,
│   ├── 1-1-2/            tests (tests/) et outils (tools/) du module
│   └── …
├── outils/               assembler.mjs (pages générées), tester.mjs (tests)
└── _redirects            anciennes adresses → nouvelles (Netlify)
```

## Travailler

- **Modifier un exercice** : directement dans `atelier-vente/1-1-x/` (VS Code). Live Server à la racine du dépôt montre tout le site.
- **Après un ajout de module ou un changement de titre** : `npm run assembler` (régénère les accueils et la page « Intégrer »).
- **Tester tout** : `npm test` (ou `npm test -- atelier-vente` pour un seul parcours).
- **Publier** : enregistrer (commit) puis envoyer (push) sur GitHub. Si les mises à jour Netlify sont en pause, le site en ligne ne change pas.

## Les liens LMS

Un thème d’un module : `https://<site>/atelier-vente/1-1-2/index.html?embed=module&theme=s3`. La page `atelier-vente/integrer.html` donne tous les liens.

## Réglages communs

- Carte « citation client » : variables `--client-card-*` en fin de `css/extras.css` ; portraits page par page dans `js/catalog.js` (rubrique `portraits`).
- Les captures de contrôle (`captures/`) et les maquettes (`references/`) restent sur l’ordinateur, jamais publiées.
