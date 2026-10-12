# L’Atelier Vente : le site à publier sur GitHub

Ce dossier est **le site complet, prêt pour GitHub Pages** : les quatre modules (1-1-1 à 1-1-4, 99 exercices), une page d’accueil générale et une page « Intégrer » qui donne, pour chaque module et chaque exercice, un lien et un code d’intégration à copier.

| Fichier ou dossier | Rôle |
| --- | --- |
| `index.html` | Accueil : une carte par module |
| `integrer.html` | Liens et codes d’intégration, avec recherche et boutons « Copier » |
| `1-1-1/` … `1-1-4/` | Les modules, recopiés depuis leurs dossiers de travail |
| `outils/assembler.mjs` | Recopie les modules et régénère l’accueil et la page « Intégrer » |
| `server.mjs` | Aperçu local (`npm start`, puis `http://127.0.0.1:4180/`) |

**Ne modifiez pas les modules ici.** On les modifie dans leurs dossiers de travail (`Atelier-Vente-1-1-1`, etc.), puis on relance l’assemblage : `node outils/assembler.mjs`. Ce dossier doit rester à côté des quatre dossiers de travail.

## Publier sur GitHub, la première fois

Avec **GitHub Desktop**, le plus simple :

1. Créez un compte sur github.com si besoin, puis installez GitHub Desktop.
2. Dans GitHub Desktop : **File → Add local repository**, choisissez ce dossier. Il propose de créer un dépôt : acceptez (**create a repository**).
3. Cliquez **Publish repository**. Décochez « Keep this code private » si vous voulez un site public.
4. Sur github.com, ouvrez le dépôt : **Settings → Pages**, source **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
5. Une ou deux minutes plus tard, le site est en ligne à l’adresse `https://votre-compte.github.io/nom-du-depot/`.

Le dépôt pèse environ 25 Mo : l’envoi par le site web de GitHub (glisser-déposer) est limité à 100 fichiers à la fois, d’où le conseil de passer par GitHub Desktop.

## Mettre à jour le site

1. Modifiez un module dans son dossier de travail.
2. Dans ce dossier : `node outils/assembler.mjs`.
3. Dans GitHub Desktop : décrivez le changement, **Commit to main**, puis **Push origin**.

## Les deux façons d’intégrer

Ouvrez `integrer.html` sur le site publié : les adresses y sont calculées automatiquement à partir de l’adresse du site.

| Usage | Adresse | Ce qui s’affiche |
| --- | --- | --- |
| **Tous les exercices d’un module** | `1-1-4/index.html?embed=module` | Le module avec sa navigation, sans pied de page. On passe d’un exercice à l’autre sans quitter le mode intégré. |
| **Un exercice seul** | `1-1-4/exercices/s1-1-1.html?embed=solo` | L’exercice et son corrigé, sans en-tête, onglets ni bouton « Continuer ». |

Le **code d’intégration** est une iframe accompagnée d’un petit script : la page intégrée annonce sa hauteur, et le cadre s’ajuste. Si la plateforme retire les scripts, le cadre garde 900 pixels de haut, avec une barre de défilement. L’iframe autorise le micro et la caméra, utilisés par les exercices d’enregistrement oral.

Les réponses de l’apprenant restent dans son navigateur. Chaque module garde sa propre mémoire : les modules ne se mélangent pas, même publiés au même endroit. Dans un cadre intégré, certains navigateurs (Safari notamment) bloquent cette mémoire : l’exercice fonctionne, mais le brouillon n’est pas conservé d’une visite à l’autre.

## Les sons

Chaque exercice émet de petits sons, synthétisés par le navigateur (aucun fichier audio) : un clic sur un bouton ou une carte, un son de dépôt, une étape validée, un oubli (validation refusée), puis à la fin un son « tout juste », « des erreurs » ou « terminé » pour les productions rédigées. Le bouton **Sons** de l’en-tête les coupe ; le choix est mémorisé pour tous les modules. Pour un exercice intégré seul, le bouton flotte en haut à droite.
