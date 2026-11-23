/* Liaison SCORM 1.2, partagée par toutes les pages du paquet.
 * Envoie aussi le temps passé (cmi.core.session_time) à la fermeture. */
(function (w) {
  var api = null, started = false, finished = false, t0 = Date.now();
  function find(win) {
    var n = 0;
    while (win && !win.API && win.parent && win.parent !== win && n < 10) { win = win.parent; n++; }
    return win && win.API ? win.API : null;
  }
  try { api = find(w) || (w.opener ? find(w.opener) : null); } catch (e) { api = null; }

  function duree(ms) {
    var s = Math.max(0, Math.round(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    s = s % 60;
    return (h < 10 ? '000' : h < 100 ? '00' : h < 1000 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  var S = {
    available: function () { return !!api; },
    init: function () {
      if (!api || started) return started;
      try { started = String(api.LMSInitialize('')) === 'true'; } catch (e) { started = false; }
      return started;
    },
    get: function (k) { if (!started) return ''; try { return String(api.LMSGetValue(k) || ''); } catch (e) { return ''; } },
    set: function (k, v) { if (!started) return false; try { return String(api.LMSSetValue(k, String(v))) === 'true'; } catch (e) { return false; } },
    commit: function () { if (!started) return; try { api.LMSCommit(''); } catch (e) {} },
    finish: function () {
      if (!started || finished) return;
      finished = true;
      try { api.LMSSetValue('cmi.core.session_time', duree(Date.now() - t0)); api.LMSCommit(''); api.LMSFinish(''); } catch (e) {}
    },
    /* Pages sans activité à suivre : terminé dès l'ouverture. */
    completeOnView: function () {
      if (!S.init()) return;
      var st = S.get('cmi.core.lesson_status');
      if (st !== 'completed' && st !== 'passed') S.set('cmi.core.lesson_status', 'completed');
      S.set('cmi.core.exit', '');
      S.commit();
    },
    /* Achèvement manuel : bouton « Marquer comme terminé » (comme sur la plateforme). */
    manualComplete: function (id) {
      var box = document.getElementById(id); if (!box) return;
      var btn = box.querySelector('button'), msg = box.querySelector('.mc-msg');
      function done() {
        btn.disabled = true; btn.textContent = '✔ Terminé'; btn.className = 'btn mc-done';
        msg.textContent = 'Cette activité est marquée comme terminée.';
      }
      if (!S.init()) { msg.textContent = 'Connexion à la plateforme indisponible : l’achèvement ne peut pas être enregistré.'; btn.disabled = true; return; }
      var st = S.get('cmi.core.lesson_status');
      if (st === 'completed' || st === 'passed') { done(); return; }
      if (st !== 'incomplete') { S.set('cmi.core.lesson_status', 'incomplete'); S.commit(); }
      btn.onclick = function () {
        S.set('cmi.core.lesson_status', 'completed');
        S.set('cmi.core.exit', '');
        S.commit();
        done();
      };
    }
  };
  w.addEventListener('beforeunload', S.finish);
  w.addEventListener('pagehide', S.finish);
  w.SCO = S;
})(window);
