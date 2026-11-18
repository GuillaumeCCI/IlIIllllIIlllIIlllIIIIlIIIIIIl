# Trame du module M1.2 · Découverte client

Ordre à suivre, sous-module par sous-module : le SCORM, puis les activités dans l’ordre.
Une activité = un lien et un code d’intégration (iframe), à coller dans un bloc HTML de la plateforme.
Fichier produit par `decouverte-client/tools/build-trame.cjs` : modifier la trame là, puis relancer.

Hauteur automatique : collez une seule fois, dans la même page, cette ligne (sinon le cadre mesure 900 pixels) :

```html
<script>if(!window.atelierVenteResize){window.atelierVenteResize=1;addEventListener("message",function(e){if(!e.data||e.data.type!=="atelier-vente:height")return;document.querySelectorAll("iframe[data-atelier-vente]").forEach(function(f){if(f.contentWindow===e.source)f.style.height=e.data.height+"px";});});}</script>
```

---

## M1.2.1 · Pratiquer l’écoute active et s’adapter au client (≈ 2 h)

1. **Grille d’auto-positionnement · Début** (5 min)  
   Mon point de départ

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s1

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s1" title="L’Atelier Vente · Découverte client 1-2-1 · Grille d’auto-positionnement · Début" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

2. **SCORM « Comprendre et s’adapter au client »** (15 min)  
   Catalogue CCI France, sur votre plateforme

3. **A1 · Qui parle comme ça ?** (15 min)  
   Les attitudes d’écoute : Au magasin · En entreprise · À l’agence immobilière

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s2

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s2" title="L’Atelier Vente · Découverte client 1-2-1 · A1 · Qui parle comme ça ?" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

4. **A2 · À vous de reformuler** (20 min)  
   Reformuler : L’écho · Le reflet · La synthèse · Reformulation, ou pas ?

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s3

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s3" title="L’Atelier Vente · Découverte client 1-2-1 · A2 · À vous de reformuler" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

5. **A3 · Rendez-vous en agence** (25 min)  
   Analyser un entretien : 4 exercices autour de Nadia

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s4

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s4" title="L’Atelier Vente · Découverte client 1-2-1 · A3 · Rendez-vous en agence" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

6. **A4 · Trois commerciaux, une cliente pressée** (15 min)  
   Un exercice

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s5&ex=5.1

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s5&ex=5.1" title="L’Atelier Vente · Découverte client 1-2-1 · A4 · Trois commerciaux, une cliente pressée" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

7. **A5 · Votre réponse, votre voix** (30 min)  
   Un exercice · dépôt de l’audio et du texte

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s5&ex=5.2

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s5&ex=5.2" title="L’Atelier Vente · Découverte client 1-2-1 · A5 · Votre réponse, votre voix" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

8. **Synthèse facultative (3 options)** (45 à 60 min)  
   Sur document, hors enveloppe : pas d’exercice en ligne

9. **Grille d’auto-positionnement · Fin et « Ma progression »** (10 min)  
   Mon point d’arrivée

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s9

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-1&theme=s9" title="L’Atelier Vente · Découverte client 1-2-1 · Grille d’auto-positionnement · Fin et « Ma progression »" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

---

## M1.2.2 · Questionner pour identifier les besoins et les motivations d’achat (≈ 2 h 30)

1. **Grille d’auto-positionnement · Début** (5 min)  
   Mon point de départ

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s1

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s1" title="L’Atelier Vente · Découverte client 1-2-2 · Grille d’auto-positionnement · Début" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

2. **SCORM « Détecter les besoins et motivations d’achat »** (≈ 10 min)  
   Catalogue CCI France, sur votre plateforme

3. **A1 · La bonne question au bon moment** (20 min)  
   Quel type de question ? · Les étages de l’entonnoir

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s2

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s2" title="L’Atelier Vente · Découverte client 1-2-2 · A1 · La bonne question au bon moment" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

4. **A2 · Du besoin exprimé au besoin réel** (25 min)  
   Un exercice, cinq clients

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s3

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s3" title="L’Atelier Vente · Découverte client 1-2-2 · A2 · Du besoin exprimé au besoin réel" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

5. **A3 · Les mots qui trahissent les motivations** (25 min)  
   Les mots qui trahissent les motivations · Retour chez les Benali

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s4

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s4" title="L’Atelier Vente · Découverte client 1-2-2 · A3 · Les mots qui trahissent les motivations" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

6. **A4 · Le guide qui fait parler** (25 min)  
   Un exercice

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s5&ex=5.1

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s5&ex=5.1" title="L’Atelier Vente · Découverte client 1-2-2 · A4 · Le guide qui fait parler" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

7. **A5 · Votre guide, votre découverte** (45 min)  
   Un exercice, l’activité principale · dépôt sur demande

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s5&ex=5.2

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s5&ex=5.2" title="L’Atelier Vente · Découverte client 1-2-2 · A5 · Votre guide, votre découverte" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

8. **Synthèse facultative (3 options)** (45 à 60 min)  
   L’entretien dont vous êtes le héros · Le coach · Ma banque de questions terrain

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s6

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s6" title="L’Atelier Vente · Découverte client 1-2-2 · Synthèse facultative (3 options)" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

9. **Grille d’auto-positionnement · Fin et « Ma progression »** (10 min)  
   Mon point d’arrivée

   Lien : https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s9

   ```html
   <iframe src="https://guillaumecci.github.io/IlIIllllIIlllIIlllIIIIlIIIIIIl/decouverte-client/cadre.html?module=1-2-2&theme=s9" title="L’Atelier Vente · Découverte client 1-2-2 · Grille d’auto-positionnement · Fin et « Ma progression »" data-atelier-vente style="width:100%;height:900px;border:0;" loading="lazy" allow="autoplay; fullscreen; microphone; camera"></iframe>
   ```

---

## M1.2.3 · Situation intégratrice (≈ 2 h, sans SCORM)

Un entretien de découverte simulé (10 à 15 min) et une fiche de synthèse du besoin, évalués avec une grille commune. Pas encore en ligne : à concevoir.

## M1.2.4 · Approfondissement (≈ 2 h)

Préparation de la découverte, entonnoir et SPIN, motivations, passage à l’argumentation, vente à plusieurs décideurs, découverte à distance, immobilier. Ni SCORM ni fiche : à produire.

**Total M1.2** : 2 SCORM (≈ 25 min) · ≈ 8 h 30 au complet. En parcours intégré avec M1.1, le SCORM « Comprendre et s’adapter au client » n’est suivi qu’une fois (rattaché à M1.1.1).
