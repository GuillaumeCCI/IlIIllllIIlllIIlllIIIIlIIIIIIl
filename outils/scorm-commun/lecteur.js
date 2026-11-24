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
  var COCHE = '<svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  // Au survol d'un cercle, une bulle dit ce qu'il signifie.
  function rond(it) {
    if (fait(it.id)) return '<span class="rond is-fait" data-bulle="Terminé" aria-hidden="true">' + COCHE + '</span>';
    if (commence(it.id)) return '<span class="rond is-encours" data-bulle="En cours" aria-hidden="true"></span>';
    return '<span class="rond" data-bulle="À faire" aria-hidden="true"></span>';
  }
  // La légende des cercles, sous l'en-tête du sommaire.
  document.getElementById('som-tete').insertAdjacentHTML('afterend',
    '<ul class="som-legende" aria-hidden="true">' +
      '<li><span class="rond"></span>À faire</li>' +
      '<li><span class="rond is-encours"></span>En cours</li>' +
      '<li><span class="rond is-fait">' + COCHE + '</span>Terminé</li>' +
    '</ul>');
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
    if (window.__quitterActivite) window.__quitterActivite();
    // L'ancien élément se ferme d'abord (il enregistre sa reprise sous son
    // nom), puis le nouveau prend la main sur l'API.
    var ancien = scene.querySelector('iframe');
    if (ancien) ancien.remove();
    scene.innerHTML = '';
    courant = it;
    window.API._max = '';
    etat.c = it.id;
    // Un SCORM s'annonce d'abord : objectifs et durée, puis « Entrer ».
    if (it.accueil) accueillir(it); else charger(it);
    enregistrer();
  }
  function accueillir(it) {
    var a = it.accueil;
    // Un objectif se lit comme une ligne de liste : sans « ; » ni point final.
    var net = function (o) { return String(o).replace(/\s*[;.]\s*$/, ''); };
    var objectifs = a.objectifs || [];
    /* Pour l'apprenant, un SCORM de la plateforme est une « capsule » (nos
     * exercices sont des « entraînements ») : ce n'est qu'une capsule de la
     * partie, on le dit (« Capsule 1 sur 2 »), en ne comptant que les capsules. */
    var sec = P.sections[it.section];
    var capsules = sec.items.filter(function (x) { return x.type === 'scorm'; });
    var rang = capsules.indexOf(it) + 1;
    var annonce = String(a.annonce || '').replace(/\bce module/i, 'cette capsule').replace(/\bdu module/i, 'de la capsule');
    var carte = document.createElement('section');
    carte.className = 'accueil';
    carte.setAttribute('aria-labelledby', 'accueil-titre');
    carte.innerHTML =
      '<div class="accueil-texte">' +
        '<div class="accueil-reperes">' +
          '<p class="accueil-capsule"><b>Capsule ' + rang + ' sur ' + capsules.length + '</b>' + (sec.nom ? ' · ' + esc(sec.nom) : '') + '</p>' +
          (a.duree ? '<p class="accueil-duree"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v5l3.2 2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Durée estimée : ' + esc(a.duree) + '</p>' : '') +
        '</div>' +
        '<h1 id="accueil-titre">' + (objectifs.length ? 'Ce que vous allez apprendre' : 'Avant de commencer') + '</h1>' +
        (objectifs.length
          ? '<p class="accueil-annonce">' + esc(annonce) + '</p>' +
            '<ol class="accueil-objectifs">' + objectifs.map(function (o, i) { return '<li>' + (objectifs.length > 1 ? '<span class="accueil-num" aria-hidden="true">' + (i + 1) + '</span>' : '') + '<span>' + esc(net(o)) + '</span></li>'; }).join('') + '</ol>'
          : '') +
        '<button type="button" class="accueil-entrer"><span>Lancer la capsule</span><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '</div>' +
      // La couverture de la capsule, sinon la formatrice.
      (a.image
        ? '<figure class="accueil-image is-couverture"><img src="' + esc(a.image) + '" alt=""></figure>'
        : '<figure class="accueil-image"><img src="commun/formatrice.webp" alt=""></figure>');
    if (a.image) carte.classList.add('avec-couverture');
    var cadre = document.createElement('div');
    cadre.className = 'accueil-fond';
    cadre.appendChild(carte);
    scene.appendChild(cadre);
    carte.querySelector('.accueil-entrer').addEventListener('click', function () {
      if (courant !== it) return;
      scene.innerHTML = '';
      charger(it);
    });
  }
  function charger(it) {
    var f = document.createElement('iframe');
    f.className = 'contenu';
    f.title = it.titre;
    f.setAttribute('allow', 'autoplay; fullscreen; microphone; camera');
    f.setAttribute('allowfullscreen', '');
    f.src = it.href;
    scene.appendChild(f);
    // Une capsule : sa visite, la première fois que sa barre de lecture paraît.
    if (it.type === 'scorm' && window.__guetterCapsule) window.__guetterCapsule(f);
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

    /* LE PLEIN ÉCRAN DE L'ACTIVITÉ, distinct de celui du SCORM. Nos exercices
     * ont leur propre bouton : dans le lecteur, il demande ce « mode
     * activité » (la barre se cache, les exercices prennent tout l'écran).
     * Un seul vrai plein écran, celui du lecteur : jamais un second dans le
     * premier, dont la sortie ferait tout quitter.
     *   · SCORM déjà en plein écran : quitter l'activité ramène au plein
     *     écran du SCORM (barre et sommaire) ;
     *   · SCORM en fenêtre : le lecteur passe en plein écran pour l'activité,
     *     et en sort avec elle.
     * Les exercices reçoivent l'état du MODE ACTIVITÉ (leur bouton dit si
     * l'activité est en plein écran, pas le SCORM). */
    var modeActivite = false, natifPourActivite = false;
    var annoncer = function () {
      document.body.classList.toggle('mode-activite', modeActivite);
      var f = scene.querySelector('iframe');
      if (f && f.contentWindow) f.contentWindow.postMessage({ type: 'atelier-vente:hote-plein', actif: modeActivite }, location.origin === 'null' ? '*' : location.origin);
    };
    var quitterActivite = function () {
      modeActivite = false;
      if (natifPourActivite && enPlein()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      natifPourActivite = false;
      annoncer();
    };
    var natifChange = function () {
      // Échap ou bouton du lecteur : le navigateur quitte tout plein écran.
      if (!enPlein()) { natifPourActivite = false; if (modeActivite) { modeActivite = false; } }
      annoncer();
    };
    document.addEventListener('fullscreenchange', natifChange);
    document.addEventListener('webkitfullscreenchange', natifChange);
    scene.addEventListener('load', annoncer, true); // le chargement de chaque élément
    window.addEventListener('message', function (event) {
      var f = scene.querySelector('iframe');
      if (!f || event.source !== f.contentWindow || !event.data || event.data.type !== 'atelier-vente:plein-ecran') return;
      var voulu = !!event.data.actif;
      if (!voulu) return quitterActivite();
      modeActivite = true;
      if (!enPlein()) {
        natifPourActivite = true;
        try {
          var p = (docEl.requestFullscreen || docEl.webkitRequestFullscreen).call(docEl);
          if (p && p.catch) p.catch(function () { natifPourActivite = false; annoncer(); });
        } catch (e) { natifPourActivite = false; }
      }
      annoncer();
    });
    // Changer d'élément quitte le mode activité.
    window.__quitterActivite = function () { if (modeActivite) quitterActivite(); };
  }

  // On reprend là où l'on s'était arrêté, sinon au premier élément pas fait.
  ouvrir(byId[etat.c] || items.filter(function (it) { return !fait(it.id); })[0] || items[0]);
  if (!reel) document.getElementById('barre-avance').insertAdjacentHTML('beforeend', ' · <span class="hors">suivi non enregistré</span>');

  /* ── La visite guidée du lecteur ──────────────────────────────────────
   * Au tout premier lancement : un projecteur présente la barre, zone par
   * zone (le sommaire, les flèches, le plein écran), comme la visite guidée
   * des exercices. Vue une fois par apprenant (mémorisée sur la plateforme,
   * ou dans le navigateur hors plateforme) ; « Revoir la visite guidée »,
   * en bas du sommaire, la relance. */
  // Le nom d'un contenu sans son émoji ni « Activités - », et son type pour l'apprenant.
  var nomCourt = function (it) { return it.titre.replace(/^[^\p{L}\p{N}]+/u, '').replace(/^Activités\s*-\s*/i, ''); };
  var genreDe = function (it) { return it.type === 'scorm' ? 'Capsule' : it.type === 'exercices' ? 'Entraînement' : ''; };
  /* Le schéma des flèches : un extrait du sommaire, dessiné comme lui (ronds,
   * ligne en cours bleu nuit), avec ← sur la ligne d'avant et → sur celle
   * d'après : on voit que les flèches suivent le sommaire. */
  var ligneChemin = function (it, fleche, ici) {
    return '<li class="chemin-ligne' + (ici ? ' is-ici' : '') + '">' + rond(it) +
      '<span class="chemin-nom"><b>' + esc(nomCourt(it)) + '</b>' + (genreDe(it) ? '<small>' + genreDe(it) + (ici ? ' · vous êtes ici' : '') + '</small>' : (ici ? '<small>vous êtes ici</small>' : '')) + '</span>' +
      (fleche ? '<span class="visite-fleche" aria-label="' + (fleche === '→' ? 'flèche de droite' : 'flèche de gauche') + '">' + fleche + '</span>' : '') + '</li>';
  };
  function chemin(c) {
    return '<ul class="chemin">' +
      (c.avant ? ligneChemin(c.avant, '←', false) : '') +
      ligneChemin(c.ici, '', true) +
      (c.apres ? ligneChemin(c.apres, '→', false) : '') + '</ul>';
  }
  function etapesVisite() {
    var i = courant ? courant.index : 0;
    var avant = items[i - 1], apres = items[i + 1];
    var etapes = [
      { cible: '#burger', titre: 'Le sommaire',
        texte: 'Il présente tout le parcours : les capsules et les entraînements, dans l’ordre. Cliquez sur l’un d’eux pour l’ouvrir.',
        liste: [
          { rond: '', texte: 'à faire' },
          { rond: 'is-encours', texte: 'en cours' },
          { rond: 'is-fait', texte: 'terminé' }
        ] },
      { cible: '#prec, #suiv', titre: 'Les flèches',
        texte: 'Elles suivent l’ordre du sommaire.',
        chemin: { ici: courant, apres: apres, avant: avant } }
    ];
    if (!document.getElementById('plein').hidden) etapes.push({ cible: '#plein', titre: 'Le plein écran',
      texte: 'Pour profiter de tout l’écran. Le même bouton, ou la touche Échap, vous ramène à la fenêtre.' });
    return etapes;
  }
  /* Le rectangle qui englobe des éléments, dans la page du lecteur ; `doc`
   * et `cadre` : ceux d'une capsule (on ajoute la place de son cadre). */
  function zoneDe(sel, doc, cadre) {
    var o = cadre ? cadre.getBoundingClientRect() : { left: 0, top: 0 };
    var r = Array.prototype.map.call((doc || document).querySelectorAll(sel), function (el) { return el.getBoundingClientRect(); })
      .filter(function (x) { return x.width || x.height; });
    if (!r.length) return null;
    return { left: o.left + Math.min.apply(0, r.map(function (x) { return x.left; })), top: o.top + Math.min.apply(0, r.map(function (x) { return x.top; })),
      right: o.left + Math.max.apply(0, r.map(function (x) { return x.right; })), bottom: o.top + Math.max.apply(0, r.map(function (x) { return x.bottom; })) };
  }
  function visite() { projecteur(etapesVisite(), function () {
    etat.v = 1;
    try { localStorage.setItem('lecteur-visite-' + (P.titre || ''), '1'); } catch (e) { /* navigateur fermé à la mémoire */ }
    enregistrer();
  }); }
  /* Le projecteur : tout s'assombrit sauf la zone de l'étape (`cible`, un
   * sélecteur du lecteur ou une fonction qui rend un rectangle) ; `aussi` :
   * une seconde zone simplement cerclée de blanc. La bulle se pose sous la
   * zone, ou au-dessus quand la place manque (barre du bas d'une capsule). */
  function projecteur(etapes, fin) {
    if (document.querySelector('.visite')) return;
    menu(false);
    var at = 0;
    var calque = document.createElement('div');
    calque.className = 'visite';
    calque.innerHTML = '<div class="visite-trou"></div><div class="visite-aussi" hidden></div><div class="visite-bulle" role="dialog" aria-modal="true" aria-labelledby="visite-titre" tabindex="-1"></div>';
    document.body.appendChild(calque);
    var trou = calque.querySelector('.visite-trou'), aussi = calque.querySelector('.visite-aussi'), bulle = calque.querySelector('.visite-bulle');
    var zone = function (c) { return typeof c === 'function' ? c() : zoneDe(c); };
    var cadrer = function (el, z, pad) { Object.assign(el.style, { left: (z.left - pad) + 'px', top: (z.top - pad) + 'px', width: (z.right - z.left + 2 * pad) + 'px', height: (z.bottom - z.top + 2 * pad) + 'px' }); };
    function placer() {
      var z = zone(etapes[at].cible), pad = 7;
      if (!z) return;
      cadrer(trou, z, pad);
      var z2 = etapes[at].aussi ? zone(etapes[at].aussi) : null;
      aussi.hidden = !z2;
      if (z2) cadrer(aussi, z2, pad);
      // La bulle sous la zone (ou au-dessus), alignée sur elle sans sortir de l'écran.
      var bw = bulle.offsetWidth, bh = bulle.offsetHeight, vw = window.innerWidth, vh = window.innerHeight;
      var x = Math.min(Math.max(12, (z.left + z.right) / 2 - bw / 2), vw - bw - 12);
      var dessus = z.bottom + 22 + bh > vh - 8;
      bulle.classList.toggle('is-dessus', dessus);
      bulle.style.left = x + 'px';
      bulle.style.top = (dessus ? z.top - 22 - bh : z.bottom + 22) + 'px';
      // La pointe de la bulle vise le milieu de la zone.
      bulle.style.setProperty('--pointe', Math.min(Math.max(22, (z.left + z.right) / 2 - x), bw - 22) + 'px');
    }
    function montrer(i) {
      at = i;
      var e = etapes[at], dernier = at === etapes.length - 1;
      bulle.innerHTML = '<p class="visite-compte">' + (at + 1) + ' / ' + etapes.length + '</p>' +
        '<h2 id="visite-titre">' + esc(e.titre) + '</h2><p>' + esc(e.texte) + '</p>' +
        (e.liste ? '<ul class="visite-liste">' + e.liste.map(function (l) { return '<li><span class="rond ' + l.rond + '">' + (l.rond === 'is-fait' ? COCHE : '') + '</span>' + esc(l.texte) + '</li>'; }).join('') + '</ul>' : '') +
        (e.chemin ? chemin(e.chemin) : '') +
        '<div class="visite-actions"><button type="button" class="visite-passer" data-v="fin">' + (dernier ? '' : 'Passer') + '</button><span>' +
        (at ? '<button type="button" class="visite-btn is-second" data-v="prec">Précédent</button>' : '') +
        '<button type="button" class="visite-btn" data-v="suiv">' + (dernier ? 'C’est parti !' : 'Suivant') + '</button></span></div>';
      bulle.classList.remove('is-in'); void bulle.offsetWidth; bulle.classList.add('is-in');
      placer();
      bulle.focus();
    }
    function finir() {
      calque.remove();
      removeEventListener('resize', placer);
      document.removeEventListener('keydown', clavier, true);
      if (fin) fin();
    }
    function clavier(ev) { if (ev.key === 'Escape') { ev.stopPropagation(); finir(); } }
    bulle.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-v]');
      if (!b) return;
      var v = b.getAttribute('data-v');
      if (v === 'fin' || (v === 'suiv' && at === etapes.length - 1)) finir();
      else montrer(at + (v === 'suiv' ? 1 : -1));
    });
    addEventListener('resize', placer);
    document.addEventListener('keydown', clavier, true);
    montrer(0);
  }
  // Revoir la visite : en bas du sommaire.
  document.getElementById('sommaire').insertAdjacentHTML('beforeend', '<button type="button" class="som-revoir" id="revoir-visite"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="16.8" r="1.1" fill="currentColor"/></svg>Revoir la visite guidée</button>');
  document.getElementById('revoir-visite').addEventListener('click', visite);
  var dejaVue = etat.v === 1;
  try { if (!reel && localStorage.getItem('lecteur-visite-' + (P.titre || ''))) dejaVue = true; } catch (e) { /* idem */ }
  if (!dejaVue) setTimeout(visite, 600);

  /* ── La visite de la capsule ──────────────────────────────────────────
   * La première fois qu'une barre de lecture de capsule (Storyline) apparaît,
   * après « Démarrer » : pause et lecture, rejouer, sous-titres, puis les
   * flèches de la capsule (sans parler de celles du haut, à sa demande).
   * La vidéo est mise en pause le temps de la visite, puis relancée.
   * Vue UNE fois pour toutes les capsules : mémorisée sur la plateforme pour
   * ce paquet (etat.vc) et dans le navigateur pour les autres paquets. Le
   * lecteur d'une capsule e-doceo n'a pas ces boutons : pas de visite. */
  var CLE_CAPSULE = 'lecteur-visite-capsule';
  var capsuleVue = function () {
    if (etat.vc === 1) return true;
    try { return !!localStorage.getItem(CLE_CAPSULE); } catch (e) { return false; }
  };
  function guetterCapsule(f) {
    if (capsuleVue()) return;
    var essais = 0;
    var t = setInterval(function () {
      // Le cadre a changé (autre contenu ouvert) ou la visite a été vue : on arrête.
      if (!f.isConnected || capsuleVue() || ++essais > 1200) { clearInterval(t); return; }
      var doc; try { doc = f.contentDocument; } catch (e) { clearInterval(t); return; }
      var pp = doc && doc.getElementById('play-pause');
      if (!pp || !pp.getBoundingClientRect().width || document.querySelector('.visite')) return;
      clearInterval(t);
      setTimeout(function () { if (f.isConnected) visiteCapsule(f, doc); }, 700);
    }, 500);
  }
  window.__guetterCapsule = guetterCapsule;
  // Une capsule déjà ouverte au lancement (sans écran d'accueil) : on la guette aussi.
  var deja = scene.querySelector('iframe');
  if (deja && courant && courant.type === 'scorm') guetterCapsule(deja);
  function visiteCapsule(f, doc) {
    var dans = function (sel) { return function () { return zoneDe(sel, doc, f); }; };
    var existe = function (sel) { var el = doc.querySelector(sel); return el && el.getBoundingClientRect().width; };
    var pp = doc.getElementById('play-pause');
    // En lecture, le bouton propose « Arrêter » (pause) : on met en pause.
    var enLecture = /arr[êe]t|pause/i.test(pp.getAttribute('aria-label') || '');
    if (enLecture) pp.click();
    var etapes = [
      { cible: dans('#play-pause'), titre: 'Pause et lecture', texte: 'Ce bouton met la capsule en pause, puis la relance quand vous êtes prêt.' }
    ];
    if (existe('#reset')) etapes.push({ cible: dans('#reset'), titre: 'Rejouer', texte: 'Il reprend la diapositive depuis son début.' });
    if (existe('#captions')) etapes.push({ cible: dans('#captions'), titre: 'Les sous-titres', texte: 'Ils affichent à l’écran le texte de ce qui est dit. Cliquez de nouveau pour les masquer.' });
    if (existe('#prev, #next')) etapes.push({ cible: dans('#prev, #next'), titre: 'Les flèches de la capsule',
      texte: 'Elles passent d’une diapositive à l’autre, à l’intérieur de cette capsule.' });
    projecteur(etapes, function () {
      etat.vc = 1;
      try { localStorage.setItem(CLE_CAPSULE, '1'); } catch (e) { /* idem */ }
      enregistrer();
      if (enLecture && f.isConnected) { try { var b = doc.getElementById('play-pause'); if (b && !/arr[êe]t|pause/i.test(b.getAttribute('aria-label') || '')) b.click(); } catch (e) { /* capsule fermée */ } }
    });
  }
})();
