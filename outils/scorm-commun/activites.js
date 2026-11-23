/* PAGE D'EXERCICES SUIVIE · nos exercices (site L'Atelier Vente) dans une
 * page du paquet SCORM.
 *
 * Les exercices annoncent où en est l'apprenant (message
 * `atelier-vente:suivi` : exercices faits, score de chaque bilan, réponses).
 * Cette page le transmet à la plateforme :
 *   · cmi.core.lesson_status : « incomplete », puis « completed » quand tous
 *     les exercices de la série sont faits (jamais de retour en arrière) ;
 *   · cmi.core.score.raw : moyenne des bilans chiffrés, sur 100 ;
 *   · cmi.suspend_data : les réponses, rendues aux exercices à la visite
 *     suivante, même sur un autre ordinateur (message `atelier-vente:etat`) ;
 *   · le temps passé, à la fermeture (commun/scorm.js).
 */
(function () {
  var frame = document.getElementById('exercices');
  var src = frame.getAttribute('data-src');
  var origine = new URL(src, location.href).origin;
  var lms = SCO.init();
  var saved = { m: '', e: {} };
  var rendu = false, termine = false, envoi = 0;

  if (lms) {
    try {
      var s = JSON.parse(SCO.get('cmi.suspend_data') || '{}');
      if (s && typeof s === 'object' && s.e && typeof s.e === 'object') saved = { m: String(s.m || ''), e: s.e };
    } catch (e) { /* données illisibles : on repart de zéro */ }
    var st = SCO.get('cmi.core.lesson_status');
    termine = st === 'completed' || st === 'passed';
    if (!termine) { SCO.set('cmi.core.lesson_status', 'incomplete'); SCO.commit(); }
  } else {
    document.getElementById('suivi-alerte').hidden = false;
  }

  frame.style.height = '900px';
  frame.src = src;

  function afficher(fait, total) {
    var bloc = document.getElementById('suivi');
    bloc.hidden = false;
    document.getElementById('suivi-barre').style.width = (total ? Math.round(fait / total * 100) : 0) + '%';
    document.getElementById('suivi-texte').innerHTML = fait >= total
      ? '<b>Les ' + total + ' exercices sont faits.</b> Cette activité est terminée.'
      : 'Exercices faits : <b>' + fait + ' sur ' + total + '</b>. L’activité sera terminée quand tous seront faits.';
    bloc.classList.toggle('is-fini', fait >= total);
  }

  /* Totara garde 4 096 caractères par activité (cmi.suspend_data). Le suivi
   * (fait, score) passe toujours ; les réponses écrites aussi tant qu'il y a
   * la place : sinon on retire d'abord les plus longues, qui restent alors
   * dans le navigateur de l'apprenant. */
  var MAX = 4096;
  function compacter(module, tout) {
    var copie = {}, cles = [];
    for (var k in tout) if (Object.prototype.hasOwnProperty.call(tout, k)) {
      copie[k] = { values: tout[k].values || {}, done: !!tout[k].done };
      if (typeof tout[k].score === 'number') copie[k].score = tout[k].score;
      cles.push(k);
    }
    cles.sort(function (a, b) { return JSON.stringify(copie[b].values).length - JSON.stringify(copie[a].values).length; });
    var texte = JSON.stringify({ m: module, e: copie });
    for (var i = 0; texte.length > MAX && i < cles.length; i++) {
      copie[cles[i]].values = {};
      texte = JSON.stringify({ m: module, e: copie });
    }
    return texte.length > MAX ? JSON.stringify({ m: module, e: {} }) : texte;
  }

  function enregistrer(module, exercices, total) {
    // Les réponses de la plateforme s'ajoutent à celles du navigateur : un
    // exercice fait ailleurs reste fait tant que la page ne l'a pas repris.
    var tout = {};
    for (var k in saved.e) if (Object.prototype.hasOwnProperty.call(saved.e, k)) tout[k] = saved.e[k];
    for (var key in exercices) {
      if (!Object.prototype.hasOwnProperty.call(exercices, key)) continue;
      var nouveau = exercices[key], ancien = tout[key];
      if (!ancien || !ancien.done || nouveau.done) {
        // Le score ne baisse jamais : on garde le meilleur bilan.
        if (ancien && typeof ancien.score === 'number' && !(nouveau.score >= ancien.score)) {
          nouveau = { values: nouveau.values, done: nouveau.done, score: ancien.score };
        }
        tout[key] = nouveau;
      }
    }
    saved = { m: module, e: tout };

    var fait = 0, notes = [];
    for (var j in tout) {
      if (!Object.prototype.hasOwnProperty.call(tout, j)) continue;
      if (tout[j] && tout[j].done) fait++;
      if (tout[j] && typeof tout[j].score === 'number') notes.push(tout[j].score);
    }
    fait = Math.min(fait, total);
    afficher(fait, total);
    if (!lms) return;

    SCO.set('cmi.suspend_data', compacter(module, tout));
    if (notes.length) {
      var moyenne = notes.reduce(function (a, b) { return a + b; }, 0) / notes.length;
      SCO.set('cmi.core.score.min', '0');
      SCO.set('cmi.core.score.max', '100');
      SCO.set('cmi.core.score.raw', String(Math.round(moyenne * 100)));
    }
    if (fait >= total && total > 0) termine = true;
    SCO.set('cmi.core.lesson_status', termine ? 'completed' : 'incomplete');
    SCO.set('cmi.core.exit', termine ? '' : 'suspend');
    // Un enregistrement toutes les 3 secondes au plus pendant la frappe.
    clearTimeout(envoi);
    envoi = setTimeout(SCO.commit, 3000);
  }

  /* Le plein écran du lecteur : son état descend vers les exercices (et
   * leur est redonné à chaque chargement), leur commande remonte. */
  var hote = null;
  frame.addEventListener('load', function () { if (hote) frame.contentWindow.postMessage(hote, origine); });
  addEventListener('message', function (event) {
    var data = event.data;
    if (!data || window.parent === window) return;
    if (event.source === window.parent && data.type === 'atelier-vente:hote-plein') {
      hote = { type: data.type, actif: !!data.actif };
      // Le plein écran de l'activité : les exercices prennent toute la page.
      document.body.classList.toggle('mode-activite', hote.actif);
      frame.contentWindow.postMessage(hote, origine);
    } else if (event.source === frame.contentWindow && event.origin === origine && data.type === 'atelier-vente:plein-ecran') {
      window.parent.postMessage({ type: data.type, actif: !!data.actif }, location.origin === 'null' ? '*' : location.origin);
    }
  });

  addEventListener('message', function (event) {
    var data = event.data;
    if (event.origin !== origine || event.source !== frame.contentWindow || !data) return;
    if (data.type === 'atelier-vente:height' && data.height > 0) {
      frame.style.height = Math.max(600, Math.min(20000, Math.ceil(data.height))) + 'px';
      return;
    }
    if (data.type !== 'atelier-vente:suivi' || typeof data.module !== 'string' || !data.exercises) return;
    var total = Math.max(0, Math.min(500, +data.total || 0));

    // Première nouvelle des exercices : s'il manque des réponses enregistrées
    // sur la plateforme (autre ordinateur, navigateur vidé), on les rend.
    if (!rendu) {
      rendu = true;
      if (saved.m === data.module) {
        // Seulement les exercices dont les réponses ont tenu dans la place de
        // la plateforme : un exercice « fait » sans ses réponses afficherait
        // un corrigé vide (il reste compté comme fait ici).
        var rendre = {}, manque = false;
        for (var k in saved.e) {
          if (!Object.prototype.hasOwnProperty.call(saved.e, k)) continue;
          var ici = data.exercises[k], la = saved.e[k];
          if (!la || !la.values || !Object.keys(la.values).length) continue;
          if (!ici || (la.done && !ici.done)) { rendre[k] = la; manque = true; }
        }
        if (manque) frame.contentWindow.postMessage({ type: 'atelier-vente:etat', module: data.module, exercises: rendre }, origine);
      }
    }
    enregistrer(data.module, data.exercises, total);
  });

  addEventListener('pagehide', function () { clearTimeout(envoi); });
})();
