# Essais du paquet SCORM (fausse plateforme)

Une fausse plateforme SCORM 1.2 (`http://localhost:4174/lms.html`) affiche le paquet décompressé ; les exercices viennent du site local (`node server.mjs --port 4173`, autre origine, comme GitHub en vrai). Edge sans fenêtre, piloté par le protocole de débogage.

    node server.mjs --port 4173 &
    node outils/scorm-depuis-mbz.mjs <mbz décompressé> sortie.zip
    (décompresser sortie.zip dans un dossier L avec C:\Windows\System32\tar.exe -xf)
    node outils/scorm-essais/test-lecteur.mjs L captures     # sommaire, suivi, reprise, fiche (16)
    node outils/scorm-essais/test-plein3.mjs L captures      # plein écran SCORM / activité (8)
    node outils/scorm-essais/test-apprenant.mjs L captures   # brouillons par apprenant (7)
    node outils/scorm-essais/test-multi.mjs L capture.png    # forme --multi, page 02_page seule

Pièges connus :
- le navigateur range à part la mémoire d'une page affichée dans une autre : pour écrire dans celle des exercices, passer par leur cadre (Page.createIsolatedWorld sur le bon frameId) ;
- lancer Edge avec --disable-site-isolation-trials et --disable-features=IsolateOrigins,site-per-process, sinon les cadres d'une autre origine n'apparaissent pas dans Page.getFrameTree ;
- Edge sans fenêtre refuse tout vrai plein écran : le simuler dans le lecteur (test-plein3) ;
- les scripts attendent les numéros d'activité du parcours « Techniques de vente » (PAGE_3227…).
