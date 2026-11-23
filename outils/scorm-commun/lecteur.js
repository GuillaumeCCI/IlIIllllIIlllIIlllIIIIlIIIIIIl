/* LE LECTEUR DU PARCOURS · un seul élément SCORM pour la plateforme, notre
 * sommaire dedans.
 *
 * Chaque élément (Storyline, page d'exercices, fiche…) s'ouvre dans le cadre
 * du lecteur. Il croit parler à la plateforme : il trouve ici une API SCORM
 * 1.2 (window.API) qui lui est propre. Le lecteur garde l'état de chaque
 * élément (statut, score, reprise) et envoie à la vraie plateforme :
 *   · cmi.core.lesson_status : « completed » quand tous les éléments sont faits ;
 *   · cmi.core.score.raw : moyenne des éléments notés ;
 *   · cmi.suspend_data : l'état de tous les éléments (4 096 caractères au
 *     plus : on retire d'abord les réponses écrites des exercices, puis les
 *     reprises les plus longues) et l'élément où l'on s'est arrêté ;
 *   · le temps passé, à la fermeture (commun/scorm.js).
 */
(function () {
  var P = window.PARCOURS;
  var items = [];
  P.sections.forEach(function (s, si) { s.items.forEach(function (it) { it.section = si; items.push(it); }); });
  var byId = {}; items.forEach(function (it, i) { it.index = i; byId[it.id] = it; });

  /* ── L'état, lu sur la plateforme ─────────────────────────────────── */
  var reel = SCO.init();
  var etat = { c: '', i: {} };
  if (reel) {
    try {
      var lu = JSON.parse(SCO.get('cmi.suspend_data') || '{}');
      if (lu && typeof lu.i === 'object') etat = { c: String(lu.c || ''), i: lu.i };
    } catch (e) { /* illisible : on repart de zéro */ }
    var st0 = SCO.get('cmi.core.lesson_status');
    if (st0 !== 'completed' && st0 !== 'passed') { SCO.set('cmi.core.lesson_status', 'incomplete'); SCO.commit(); }
  }
  var de = function (id) { return etat.i[id] || (etat.i[id] = {}); };
  var fait = function (id) { var s = (etat.i[id] || {}).s; return s === 'completed' || s === 'passed'; };
  var commence = function (id) { var s = (etat.i[id] || {}).s; return !!s && s !== 'not attempted'; };

  /* ── L'enregistrement sur la plateforme ───────────────────────────── */
  var MAX = 4000; // marge sous les 4 096 de Totara
  function compacter() {
    var copie = JSON.parse(JSON.stringify(etat));
    var texte = function () { return JSON.stringify(copie); };
    if (texte().length <= MAX) return texte();
    // 1. Les réponses écrites des exercices (le suivi fait / score reste).
    items.filter(function (it) { return it.type === 'exercices' && copie.i[it.id] && copie.i[it.id].d; }).forEach(function (it) {
      if (texte().length <= MAX) return;
      try {
        var d = JSON.parse(copie.i[it.id].d);
        for (var k in d.e) if (Object.prototype.hasOwnProperty.call(d.e, k)) d.e[k].values = {};
        copie.i[it.id].d = JSON.stringify(d);
      } catch (e) { delete copie.i[it.id].d; }
    });
    // 2. Puis les reprises, des plus longues aux plus courtes.
    var longues = Object.keys(copie.i).filter(function (id) { return copie.i[id].d; })
      .sort(function (a, b) { return copie.i[b].d.length - copie.i[a].d.length; });
    for (var n = 0; texte().length > MAX && n < longues.length; n++) delete copie.i[longues[n]].d;
    return texte();
  }
  var attente = 0;
  function enregistrer(tout_de_suite) {
    dessiner();
    if (!reel) return;
    SCO.set('cmi.suspend_data', compacter());
    var tous = items.every(function (it) { return fait(it.id); });
    var notes = items.map(function (it) { return (etat.i[it.id] || {}).r; }).filter(function (r) { return typeof r === 'number'; });
    if (notes.length) {
      SCO.set('cmi.core.score.min', '0');
      SCO.set('cmi.core.score.max', '100');
      SCO.set('cmi.core.score.raw', String(Math.round(notes.reduce(function (a, b) { return a + b; }, 0) / notes.length)));
    }
    var deja = SCO.get('cmi.core.lesson_status');
    SCO.set('cmi.core.lesson_status', tous || deja === 'completed' ? 'completed' : 'incomplete');
    SCO.set('cmi.core.exit', tous ? '' : 'suspend');
    clearTimeout(attente);
    if (tout_de_suite) SCO.commit(); else attente = setTimeout(SCO.commit, 2000);
  }

  /* ── L'API vue par l'élément en cours ─────────────────────────────── */
  var courant = null;
  var nombre = function (v) { var n = parseFloat(v); return isFinite(n) ? n : undefined; };
  window.API = {
    LMSInitialize: function () { if (courant && !commence(courant.id)) { de(courant.id).s = 'incomplete'; enregistrer(); } return 'true'; },
    LMSFinish: function () { enregistrer(true); return 'true'; },
    LMSCommit: function () { enregistrer(true); return 'true'; },
    LMSGetValue: function (k) {
      var e = courant ? (etat.i[courant.id] || {}) : {};
      switch (k) {
        case 'cmi.core.student_id': case 'cmi.core.student_name': return reel ? SCO.get(k) : '';
        case 'cmi.core.lesson_status': return e.s || 'not attempted';
        case 'cmi.core.entry': return e.d || e.l ? 'resume' : 'ab-initio';
        case 'cmi.core.lesson_location': return e.l || '';
        case 'cmi.suspend_data': return e.d || '';
        case 'cmi.core.score.raw': return e.r === undefined ? '' : String(e.r);
        case 'cmi.core.score.min': return e.r === undefined ? '' : '0';
        case 'cmi.core.score.max': return e.r === undefined ? '' : '100';
        case 'cmi.core.credit': return 'credit';
        case 'cmi.core.lesson_mode': return 'normal';
        case 'cmi.core.total_time': return '0000:00:00';
        case 'cmi.core._children': return 'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time';
        case 'cmi.core.score._children': return 'raw,min,max';
        case 'cmi.interactions._count': case 'cmi.objectives._count': return '0';
        default: return '';
      }
    },
    LMSSetValue: function (k, v) {
      if (!courant) return 'true';
      var e = de(courant.id);
      v = String(v);
      if (k === 'cmi.core.lesson_status') {
        // Un élément fait le reste (un nouvel essai ne le défait pas).
        if (!(fait(courant.id) && v !== 'passed' && v !== 'completed')) e.s = v;
      } else if (k === 'cmi.core.score.raw') {
        var n = nombre(v);
        var max = nombre(window.API._max);
        if (n !== undefined) { var pct = max ? n / max * 100 : n; e.r = Math.round(Math.max(e.r || 0, Math.max(0, Math.min(100, pct)))); }
      } else if (k === 'cmi.core.score.max') {
        window.API._max = v;
      } else if (k === 'cmi.suspend_data') {
        e.d = v;
      } else if (k === 'cmi.core.lesson_location') {
        e.l = v;
      } else {
        return 'true'; // temps, interactions… : sans objet ici
      }
      enregistrer();
      return 'true';
    },
    LMSGetLastError: function () { return '0'; },
    LMSGetErrorString: function () { return ''; },
    LMSGetDiagnostic: function () { return ''; }
  };

  /* ── Le sommaire ──────────────────────────────────────────────────── */
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
  var liste = document.getElementById('som-liste');
  document.getElementById('som-tete').innerHTML =
    (P.image ? '<img src="' + esc(P.image) + '" alt="">' : '') + '<p class="som-titre">' + esc(P.titre) + '</p>';
  document.title = P.titre;

  var ouvertes = P.sections.map(function () { return true; });
  function rond(it) {
    if (fait(it.id)) return '<span class="rond is-fait" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
    if (commence(it.id)) return '<span class="rond is-encours" aria-hidden="true"></span>';
    return '<span class="rond" aria-hidden="true"></span>';
  }
  var etiquette = function (it) { return fait(it.id) ? 'fait' : commence(it.id) ? 'en cours' : 'à faire'; };
  function dessiner() {
    var n = items.filter(function (it) { return fait(it.id); }).length;
    liste.innerHTML = P.sections.map(function (s, si) {
      return '<section class="som-section' + (ouvertes[si] ? ' is-ouverte' : '') + '">' +
        '<button type="button" class="som-sec-titre" data-sec="' + si + '" aria-expanded="' + ouvertes[si] + '">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span>' + esc(s.nom) + '</span></button>' +
        '<ul>' + s.items.map(function (it) {
          var actif = courant && courant.id === it.id;
          return '<li><a href="#" data-id="' + esc(it.id) + '" class="som-item' + (actif ? ' is-actif' : '') + '"' + (actif ? ' aria-current="page"' : '') + '>' +
            rond(it) + '<span class="som-nom">' + (it.icone ? '<span class="som-ico" aria-hidden="true">' + it.icone + '</span>' : '') + esc(it.titre) +
            '<span class="sr">, ' + etiquette(it) + '</span></span></a></li>';
        }).join('') + '</ul></section>';
    }).join('');
    document.getElementById('barre-avance').innerHTML = '<b>' + n + '</b> sur ' + items.length + ' faits';
    if (courant) {
      document.getElementById('barre-titre').textContent = courant.titre;
      document.getElementById('prec').disabled = courant.index === 0;
      document.getElementById('suiv').disabled = courant.index === items.length - 1;
    }
  }
  liste.addEventListener('click', function (event) {
    var sec = event.target.closest('[data-sec]');
    if (sec) { var i = +sec.getAttribute('data-sec'); ouvertes[i] = !ouvertes[i]; dessiner(); return; }
    var a = event.target.closest('[data-id]');
    if (!a) return;
    event.preventDefault();
    ouvrir(byId[a.getAttribute('data-id')]);
    menu(false);
  });

  var burger = document.getElementById('burger'), som = document.getElementById('sommaire'), voile = document.getElementById('voile');
  function menu(ouvert) {
    document.body.classList.toggle('som-ouvert', ouvert);
    burger.setAttribute('aria-expanded', String(ouvert));
    som.setAttribute('aria-hidden', String(!ouvert));
    voile.hidden = !ouvert;
    if (ouvert) { var a = som.querySelector('.is-actif') || som.querySelector('.som-item'); if (a) a.focus(); }
  }
  burger.addEventListener('click', function () { menu(!document.body.classList.contains('som-ouvert')); });
  voile.addEventListener('click', function () { menu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('som-ouvert')) { menu(false); burger.focus(); } });

  /* ── L'ouverture d'un élément ─────────────────────────────────────── */
  var scene = document.getElementById('scene');
  function ouvrir(it) {
    if (!it) return;
    // L'ancien élément se ferme d'abord (il enregistre sa reprise sous son
    // nom), puis le nouveau prend la main sur l'API.
    var ancien = scene.querySelector('iframe');
    if (ancien) ancien.remove();
    courant = it;
    window.API._max = '';
    etat.c = it.id;
    var f = document.createElement('iframe');
    f.className = 'contenu';
    f.title = it.titre;
    f.setAttribute('allow', 'autoplay; fullscreen; microphone; camera');
    f.setAttribute('allowfullscreen', '');
    f.src = it.href;
    scene.appendChild(f);
    enregistrer();
  }
  document.getElementById('prec').addEventListener('click', function () { if (courant) ouvrir(items[courant.index - 1]); });
  document.getElementById('suiv').addEventListener('click', function () { if (courant) ouvrir(items[courant.index + 1]); });
  // À la fermeture : l'élément en cours enregistre sa reprise, puis le
  // lecteur, AVANT que commun/scorm.js ne clôture la session (d'où la
  // capture : ces écouteurs passent avant les siens).
  function fermer() { var f = scene.querySelector('iframe'); if (f) f.remove(); enregistrer(true); }
  window.addEventListener('beforeunload', fermer, true);
  window.addEventListener('pagehide', fermer, true);

  /* ── Le plein écran : tout le lecteur (barre, sommaire, contenu). La page
   * du lecteur ne change jamais : on reste en plein écran d'un élément à
   * l'autre, Storyline, pages et exercices compris. Le bouton n'apparaît que
   * si la plateforme autorise le plein écran à son cadre. */
  var plein = document.getElementById('plein');
  var docEl = document.documentElement;
  var autorise = document.fullscreenEnabled || document.webkitFullscreenEnabled;
  var enPlein = function () { return !!(document.fullscreenElement || document.webkitFullscreenElement); };
  if (autorise) {
    plein.hidden = false;
    plein.addEventListener('click', function () {
      if (enPlein()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else (docEl.requestFullscreen || docEl.webkitRequestFullscreen).call(docEl);
    });
    var suivre = function () {
      document.body.classList.toggle('is-plein', enPlein());
      plein.setAttribute('aria-label', enPlein() ? 'Quitter le plein écran' : 'Passer en plein écran');
      plein.title = enPlein() ? 'Quitter le plein écran' : 'Plein écran';
    };
    document.addEventListener('fullscreenchange', suivre);
    document.addEventListener('webkitfullscreenchange', suivre);
  }

  // On reprend là où l'on s'était arrêté, sinon au premier élément pas fait.
  ouvrir(byId[etat.c] || items.filter(function (it) { return !fait(it.id); })[0] || items[0]);
  if (!reel) document.getElementById('barre-avance').insertAdjacentHTML('beforeend', ' · <span class="hors">suivi non enregistré</span>');
})();
