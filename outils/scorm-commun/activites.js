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

  function enregistrer(module, exercices, total) {
    // Les réponses de la plateforme s'ajoutent à celles du navigateur : un
    // exercice fait ailleurs reste fait tant que la page ne l'a pas repris.
    var tout = {};
    for (var k in saved.e) if (Object.prototype.hasOwnProperty.call(saved.e, k)) tout[k] = saved.e[k];
    for (var key in exercices) {
      if (!Object.prototype.hasOwnProperty.call(exercices, key)) continue;
      var nouveau = exercices[key], ancien = tout[key];
      if (!ancien || !ancien.done || nouveau.done) tout[key] = nouveau;
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

    if (!SCO.set('cmi.suspend_data', JSON.stringify(saved))) {
      // Place limitée sur la plateforme : on garde au moins le suivi (fait,
      // score), les réponses restent alors dans le navigateur.
      var court = {};
      for (var c in tout) if (Object.prototype.hasOwnProperty.call(tout, c)) court[c] = { values: {}, done: !!tout[c].done, score: tout[c].score };
      SCO.set('cmi.suspend_data', JSON.stringify({ m: module, e: court }));
    }
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
        var manque = false;
        for (var k in saved.e) {
          if (!Object.prototype.hasOwnProperty.call(saved.e, k)) continue;
          var ici = data.exercises[k];
          if (!ici || (saved.e[k].done && !ici.done)) { manque = true; break; }
        }
        if (manque) frame.contentWindow.postMessage({ type: 'atelier-vente:etat', module: data.module, exercises: saved.e }, origine);
      }
    }
    enregistrer(data.module, data.exercises, total);
  });

  addEventListener('pagehide', function () { clearTimeout(envoi); });
})();
