/* NOYAU PARTAGÉ · état, sauvegarde, en-tête, navigation, briques d'interface.
 *
 * Chargé par les 18 pages d'exercice et par le parcours complet. Aucune page
 * n'a besoin de connaître les autres : tout passe par le catalogue.
 *
 * Deux modes, un seul code :
 *   · page d'exercice  → une seule carte, boutons « précédent / suivant »
 *     pointant vers les fichiers voisins ;
 *   · parcours complet → index.html, navigation par #ancre, bilan final.
 */
(function (root) {
  'use strict';

  const catalog = root.ATELIER_CATALOG;
  const { icon } = root.AtelierIcons;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const words = value => (String(value ?? '').trim().match(/\S+/gu) || []).length;

  /* Les pages de `exercices/` sont un cran plus bas que les assets. */
  const inSubfolder = /\/exercices\//.test(location.pathname) || document.documentElement.dataset.depth === '1';
  const asset = path => path ? (inSubfolder ? `../${path}` : path) : path;

  /* Version allégée d'une illustration, produite par `npm run build:images`.
   * Les fichiers fournis pèsent environ 3 Mo pour 1672 pixels de large,
   * alors qu'ils ne dépassent jamais 800 pixels à l'écran. On sert donc la
   * version web, et l'original reprend la main si elle manque : oublier de
   * lancer le script ralentit l'affichage, mais ne casse rien.
   *
   * La liste des versions disponibles est écrite par le script dans
   * `window.ATELIER_WEB_IMAGES`. */
  const webAsset = path => {
    if (!path) return path;
    const web = (root.ATELIER_WEB_IMAGES || {})[path];
    return asset(web || path);
  };
  const pageUrl = file => inSubfolder ? `${file}.html` : `exercices/${file}.html`;
  const homeUrl = () => inSubfolder ? '../index.html' : 'index.html';

  const allKeys = catalog.all.map(ex => ex.key);
  const findExercise = key => catalog.all.find(ex => ex.key === key);

  /* ───────────────────────── État et sauvegarde ─────────────────────── */

  let state = { exercises: {} };
  let storageAvailable = true;
  let saveTimeout;
  let toastTimeout;
  let lastDialogTrigger;

  /* Ne restaure que le schéma attendu : un brouillon endommagé ne bloque pas
   * l'application, il est simplement ignoré. */
  try {
    const saved = JSON.parse(localStorage.getItem(catalog.storageKey) || 'null');
    if (saved && saved.version === 2 && saved.exercises && typeof saved.exercises === 'object') {
      for (const key of allKeys) {
        const entry = saved.exercises[key];
        if (!entry || typeof entry !== 'object') continue;
        const values = {};
        for (const [field, value] of Object.entries(entry.values || {})) {
          if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(field) || field === '__proto__' || field === 'constructor') continue;
          if (typeof value === 'string') values[field] = value.slice(0, 4000);
          else if (typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value))) values[field] = value;
          // Les tableaux servent aux exercices de manipulation : placements
          // (chaînes ou nombres) et marquages (booléens).
          else if (Array.isArray(value)) values[field] = value.slice(0, 64).map(item =>
            typeof item === 'string' ? item.slice(0, 400)
            : typeof item === 'boolean' ? item
            : typeof item === 'number' && Number.isFinite(item) ? item
            : null);
        }
        state.exercises[key] = { values, done: entry.done === true };
      }
    }
  } catch { storageAvailable = false; }

  const entry = key => state.exercises[key] ||= { values: {}, done: false };
  const isDone = key => entry(key).done === true;
  const hasDraft = key => Object.keys(entry(key).values).length > 0;
  const completedCount = () => allKeys.filter(isDone).length;

  function persist(notify = false) {
    clearTimeout(saveTimeout);
    const status = $('#save-status');
    try {
      localStorage.setItem(catalog.storageKey, JSON.stringify({ version: 2, exercises: state.exercises }));
      storageAvailable = true;
      if (status) { status.textContent = 'Sauvegardé ici'; status.classList.remove('save-warning'); }
      if (notify) toast('Brouillon enregistré dans ce navigateur.');
    } catch {
      storageAvailable = false;
      if (status) { status.textContent = 'Sauvegarde indisponible'; status.classList.add('save-warning'); }
      if (notify) toast('Le navigateur bloque le stockage. Vos réponses resteront accessibles tant que cette page est ouverte.');
    }
  }

  function markSaving() {
    const status = $('#save-status');
    if (status) status.textContent = storageAvailable ? 'Enregistrement…' : 'Sauvegarde indisponible';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => persist(), 350);
  }

  /* ──────────────────────── Messages et fenêtres ────────────────────── */

  function toast(message) {
    const node = $('#toast');
    if (!node) return;
    clearTimeout(toastTimeout);
    node.textContent = message;
    node.classList.add('visible');
    toastTimeout = setTimeout(() => node.classList.remove('visible'), 5000);
  }

  /* Une fenêtre « Repère · … » prend le gabarit des repères (extras.css) :
   * pastille illustrée devant le titre, conseil mis en avant, clés en
   * pastilles de couleur. */
  const TIP_BADGE = '<span class="tip-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M17.5 4.5c-6 .5-10 4.5-10.5 11l-1.5 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17.5 4.5c1 6.5-3 11-10 11 .5-6.5 4.5-10.5 10-11z" fill="currentColor"/></svg></span>';
  function openDialog(title, html) {
    const dialog = $('#info-dialog');
    if (!dialog) return;
    lastDialogTrigger = document.activeElement;
    // Tous les coups de pouce (repère, indice, exemple, rappel) partagent ce gabarit.
    const tip = /^(Repère|Un repère|Un indice|Indice|Un exemple|Rappel)/i.test(title);
    dialog.classList.toggle('is-tip', tip);
    $('#dialog-title').textContent = title;
    if (tip) $('#dialog-title').insertAdjacentHTML('afterbegin', TIP_BADGE);
    $('#dialog-body').innerHTML = html;
    dialog.showModal();
  }

  /* ───────────────────────── Briques d'interface ────────────────────── */

  const button = (label, action, style = 'secondary', extra = '') =>
    `<button type="button" class="button ${style}" data-action="${action}" ${extra}>${label}</button>`;

  const linkButton = (label, href, style = 'secondary', extra = '') =>
    `<a class="button ${style}" href="${esc(href)}" ${extra}>${label}</a>`;

  const chips = labels =>
    `<div class="chips">${labels.map((label, i) => `<span class="chip chip-${i % 3}">${esc(label)}</span>`).join('')}</div>`;

  const note = (text, title = '') =>
    `<aside class="note"><span class="note-symbol">${icon('lightbulb', { size: 20 })}</span><div>${title ? `<strong>${esc(title)}</strong>` : ''}<p>${esc(text)}</p></div></aside>`;

  const callout = text =>
    `<div class="callout"><span class="callout-symbol">${icon('document', { size: 20 })}</span><p>${esc(text)}</p></div>`;

  const pageTitle = (eyebrow, title, subtitle = '') =>
    `<div class="page-title">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h1>${esc(title)}</h1>${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ''}</div>`;

  const panelTitle = (title, extra = '') =>
    `<div class="panel-title"><h2>${esc(title)}</h2>${extra}</div>`;

  const step = (number, title, body, subtitle = '') =>
    `<section class="step"><span class="step-number step-${number}" aria-hidden="true">${number}</span><div class="step-content"><h3>${esc(title)}</h3>${subtitle ? `<p class="muted step-description">${esc(subtitle)}</p>` : ''}${body}</div></section>`;

  const mission = (title, text, pill = '', symbol = 'target') =>
    `<div class="mission"><span class="mission-symbol">${icon(symbol, { size: 30 })}</span><div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>${pill ? `<span class="time-pill">${esc(pill)}</span>` : ''}</div>`;

  const quote = (text, label = '') =>
    `<div class="client-quote">${label ? `<span class="quote-label">${esc(label)}</span>` : ''}<span class="quote-mark">${icon('quote', { size: 22 })}</span><p>${esc(text)}</p></div>`;

  const errorsBox = () => '<div id="form-errors" class="form-errors" role="alert" hidden></div>';
  const feedbackBox = () => '<section id="feedback" class="feedback" tabindex="-1" aria-labelledby="feedback-title" hidden></section>';

  const hintBlock = text =>
    `<details class="hint"><summary>Voir un indice</summary><p>${esc(text)}</p><small>Repère pédagogique proposé.</small></details>`;

  const illustration = (ex, extraClass = '') => {
    if (!ex.image) return '';
    return `<figure class="illustration ${extraClass}"><img src="${esc(webAsset(ex.image))}" alt="${esc(ex.alt)}" style="object-position:${esc(ex.imagePosition || 'center')}" decoding="async"><figcaption class="image-error" hidden>Illustration indisponible. Les consignes restent accessibles.</figcaption></figure>`;
  };

  /* Galerie : plusieurs illustrations côte à côte (écrans S2 A et F).
   * `active` met en avant celle qui correspond au cas en cours. */
  const gallery = (items, active = -1) => {
    if (!items || !items.length) return '';
    return `<div class="illustration-gallery">${items.map((item, i) =>
      `<figure class="illustration ${i === active ? 'is-active' : ''}"><img src="${esc(webAsset(item.image))}" alt="${esc(item.alt)}" decoding="async"><figcaption class="image-error" hidden>Illustration indisponible.</figcaption></figure>`
    ).join('')}</div>`;
  };

  /* ──────────────────────── En-tête et navigation ───────────────────── */

  /* En mode page unique, la barre de progression compte tous les exercices :
   * la progression suit l'apprenant d'une page à l'autre. */
  function renderChrome(current) {
    const brand = $('.brand');
    if (brand) brand.href = homeUrl();

    const label = $('.course-label');
    if (label && current) label.innerHTML = `${esc(current.seriesLabel)} <span>· ${esc(current.label)}</span>`;

    const progress = $('#course-progress');
    const count = $('#course-count');
    const done = completedCount();
    if (progress) { progress.max = allKeys.length; progress.value = done; }
    if (count) count.textContent = `${done} sur ${allKeys.length} terminés`;

    const status = $('#save-status');
    if (status && !storageAvailable) { status.textContent = 'Sauvegarde indisponible'; status.classList.add('save-warning'); }
    else if (status && allKeys.some(hasDraft)) status.textContent = 'Sauvegardé ici';
  }

  /* Onglets des exercices de la série en cours, plus un lien par autre série. */
  function renderNav(current) {
    const container = $('#exercise-links');
    if (!container) return;
    const serie = catalog.series.find(s => s.id === current.series);
    const tabs = serie.exercises.map(ex => {
      const key = `${serie.id}-${ex.id}`;
      const active = key === current.key;
      return `<a href="${esc(pageUrl(ex.file))}" class="exercise-link ${active ? 'active' : ''} ${isDone(key) ? 'is-done' : ''}" ${active ? 'aria-current="step"' : ''}><span class="exercise-code">${esc(ex.id)}</span><span>${esc(ex.label)}</span>${isDone(key) ? `<span class="nav-check">${icon('check', { size: 15, label: 'terminé' })}</span>` : ''}</a>`;
    }).join('');
    container.innerHTML = tabs;
    revealActiveNav();
    renderMenu(current, serie);

    const seriesBar = $('#series-links');
    if (seriesBar) {
      seriesBar.innerHTML = catalog.series.map(s => {
        const keys = s.exercises.map(ex => `${s.id}-${ex.id}`);
        const n = keys.filter(isDone).length;
        const active = s.id === current.series;
        return `<a href="${esc(pageUrl(s.exercises[0].file))}" class="series-link ${active ? 'active' : ''}" ${active ? 'aria-current="true"' : ''}><strong>${esc(s.label)}</strong><span>${n} / ${keys.length}</span></a>`;
      }).join('');
    }
  }

  /* LE MENU. Un rail à gauche (bouton menu, accueil, progression totale)
   * et un volet qui s'ouvre sur les exercices de la série en cours, avec une
   * coche pour chaque exercice terminé. Il remplace la rangée d'onglets, qui
   * reste construite mais masquée (extras.css). Styles : extras.css. */
  const MENU_SVG = {
    burger: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M4 6.5h16M4 12h16M4 17.5h16"/></svg>',
    home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m14.5 6-6 6 6 6"/></svg>'
  };
  const moduleCode = () => catalog.code || (String(catalog.storageKey || '').match(/\d+-\d+-\d+/) || [''])[0];
  let menu = null;

  function setMenuOpen(open, { focus = true } = {}) {
    if (!menu) return;
    const toggle = menu.querySelector('.av-menu-toggle');
    const panel = menu.querySelector('.av-menu-panel');
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    panel.inert = !open;
    if (!focus) return;
    if (open) (panel.querySelector('[aria-current]') || panel.querySelector('a, button'))?.focus();
    else toggle.focus();
  }

  function buildMenu() {
    // Sans vrai document (tests), pas de menu.
    if (!document.body || typeof document.body.prepend !== 'function') return false;
    menu = document.createElement('aside');
    menu.className = 'av-menu';
    menu.innerHTML = `<div class="av-menu-rail">
        <button type="button" class="av-menu-toggle" aria-expanded="false" aria-controls="av-menu-panel" aria-label="Ouvrir le menu">${MENU_SVG.burger}</button>
        <a class="av-menu-home" href="${esc(homeUrl())}" aria-label="Accueil du module" title="Accueil du module">${MENU_SVG.home}</a>
        <div class="av-menu-progress"><span class="av-menu-percent"></span><span class="av-menu-track"><span class="av-menu-fill"></span></span></div>
      </div>
      <div class="av-menu-panel" id="av-menu-panel">
        <p class="av-menu-title">Menu</p>
        <nav class="av-menu-nav"><ol class="av-menu-list"></ol></nav>
        <div class="av-menu-foot">
          <div class="av-menu-module"><span>Module ${esc(moduleCode())}</span><span class="av-menu-serie"></span></div>
          <div class="av-menu-links"><a href="${esc(homeUrl())}">Accueil</a><a href="${esc(homeUrl())}#bilan">Mon bilan</a></div>
        </div>
        <button type="button" class="av-menu-close" aria-label="Fermer le menu">${MENU_SVG.back}</button>
      </div>
      <div class="av-menu-backdrop"></div>`;
    document.body.prepend(menu);
    document.body.classList.add('has-menu');
    menu.querySelector('.av-menu-toggle').addEventListener('click', () => setMenuOpen(!menu.classList.contains('is-open')));
    menu.querySelector('.av-menu-close').addEventListener('click', () => setMenuOpen(false));
    menu.querySelector('.av-menu-backdrop').addEventListener('click', () => setMenuOpen(false, { focus: false }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenuOpen(false);
    });
    setMenuOpen(false, { focus: false });
    return true;
  }

  function renderMenu(current, serie) {
    if (!menu && !buildMenu()) return;
    menu.querySelector('.av-menu-nav').setAttribute('aria-label', `Les exercices de la série ${serie.label}`);
    menu.querySelector('.av-menu-serie').textContent = serie.label;
    menu.querySelector('.av-menu-list').innerHTML = serie.exercises.map(ex => {
      const key = `${serie.id}-${ex.id}`;
      const active = key === current.key;
      const done = isDone(key);
      return `<li><a href="${esc(pageUrl(ex.file))}" class="${active ? 'active' : ''} ${done ? 'is-done' : ''}" ${active ? 'aria-current="step"' : ''}>
        <span class="av-menu-label">${esc(ex.label)}</span>
        <span class="av-menu-check">${done ? icon('check', { size: 16, strokeWidth: 3, label: 'terminé' }) : '<span class="sr-only">à faire</span>'}</span>
      </a></li>`;
    }).join('');
    // La progression totale : tous les exercices du parcours (ou du thème).
    const percent = allKeys.length ? Math.round(completedCount() / allKeys.length * 100) : 0;
    const progress = menu.querySelector('.av-menu-progress');
    progress.setAttribute('role', 'img');
    progress.setAttribute('aria-label', `Progression totale : ${percent} %`);
    progress.title = `Progression totale : ${completedCount()} sur ${allKeys.length}`;
    menu.querySelector('.av-menu-percent').textContent = `${percent} %`;
    menu.querySelector('.av-menu-fill').style.height = `${percent}%`;
  }

  function revealActiveNav() {
    const container = $('#exercise-links');
    const active = container?.querySelector('.active');
    if (!active) return;
    const box = active.getBoundingClientRect();
    const frame = container.getBoundingClientRect();
    if (box.left < frame.left) container.scrollLeft -= frame.left - box.left + 8;
    else if (box.right > frame.right) container.scrollLeft += box.right - frame.right + 8;
  }

  /* Pied de page d'un exercice : précédent, position, suivant. */
  function renderFooterNav(current) {
    const index = allKeys.indexOf(current.key);
    const previous = catalog.all[index - 1];
    const next = catalog.all[index + 1];
    return `<div class="bottom-navigation">
      ${previous ? `<a class="text-button with-icon" href="${esc(pageUrl(previous.file))}">${icon('arrowLeft', { size: 18 })}<span>${esc(previous.seriesLabel)} · ${esc(previous.label)}</span></a>` : '<span></span>'}
      <span>Exercice ${index + 1} sur ${allKeys.length}</span>
      ${next ? `<a class="text-button with-icon" href="${esc(pageUrl(next.file))}"><span>${esc(next.seriesLabel)} · ${esc(next.label)}</span>${icon('arrowRight', { size: 18 })}</a>` : `<a class="text-button with-icon" href="${esc(homeUrl())}#bilan"><span>Voir le bilan</span>${icon('arrowRight', { size: 18 })}</a>`}
    </div>`;
  }

  function nextUrl(current) {
    const next = catalog.all[allKeys.indexOf(current.key) + 1];
    return next ? pageUrl(next.file) : `${homeUrl()}#bilan`;
  }

  /* Fond : le fond propre à l'exercice se superpose au fond commun. Les deux
   * PNG sont transparents par défaut, le blanc reste donc visible. */
  /* `briefing` à vrai : la page de contexte porte son propre décor, posé en
   * CSS. On retire alors le fond d'exercice, qui écraserait cette règle. */
  /* Le même fond sur toute la traversée de l'exercice : page de contexte,
   * menu des cas, puis exercice. Le décor ne change pas en cours de route,
   * seule la teinte de la page passe du crème au blanc. */
  function applyBackground(ex) {
    document.body.dataset.theme = ex?.theme || 'blue';
    const layers = [ex?.background, catalog.commonBackground].filter(Boolean).map(p => `url(${JSON.stringify(asset(p))})`);
    document.body.style.backgroundImage = layers.join(', ');
  }

  /* ──────────────────────── Comportements communs ───────────────────── */

  function wireImageFallbacks() {
    // Les illustrations des exercices ET celles des pages de contexte.
    $$('.illustration img, .briefing-picture img').forEach(img => {
      img.addEventListener('error', () => { img.hidden = true; img.nextElementSibling.hidden = false; }, { once: true });
    });

    /* Les bandeaux du menu des cas sont décoratifs et n'ont pas de bloc
     * de remplacement : si le fichier manque, on masque l'image et la
     * bande teintée tient lieu d'aplat, sans texte d'excuse. */
    $$('.case-card-picture img').forEach(img => {
      img.addEventListener('error', () => { img.hidden = true; }, { once: true });
    });
  }

  /* Grille de relecture : même fenêtre sur tous les écrans qui l'affichent. */
  const rubricButton = () => button(`${icon('list', { size: 17 })}<span>Grille d’évaluation</span>`, 'rubric', 'small subtle');

  function wireRubric(rubric) {
    $('[data-action="rubric"]')?.addEventListener('click', () => openDialog(
      'Grille de relecture',
      `<p class="muted">Repères proposés pour l’auto-évaluation. Ils ne constituent pas une grille de notation officielle.</p>
       <dl class="rubric">${rubric.map(([title, description]) => `<dt>${esc(title)}</dt><dd>${esc(description)}</dd>`).join('')}</dl>`));
  }

  /* ─────────────────────── Mode accessibilité ───────────────────────── */

  /* Le réglage suit l'apprenant d'un exercice à l'autre, et d'une session à
   * la suivante : on le range à part du brouillon des réponses. */
  const A11Y_KEY = 'atelier-vente-affichage-clavier';

  let keyboardHelpOn = (() => {
    try { return localStorage.getItem(A11Y_KEY) === 'on'; } catch { return false; }
  })();

  const keyboardHelpVisible = () => keyboardHelpOn;

  function paintKeyboardHelp() {
    document.body.classList.toggle('show-keyboard-help', keyboardHelpOn);
    const control = $('[data-action="keyboard-help"]');
    if (!control) return;
    control.innerHTML = icon('keyboard', { size: 19 });
    control.setAttribute('aria-pressed', String(keyboardHelpOn));
    control.setAttribute('aria-label', keyboardHelpOn
      ? 'Masquer les commandes clavier'
      : 'Afficher les commandes clavier');
    control.title = keyboardHelpOn
      ? 'Masquer les commandes clavier'
      : 'Afficher les commandes clavier des exercices à cartes';
    control.classList.toggle('is-on', keyboardHelpOn);
  }

  function toggleKeyboardHelp() {
    keyboardHelpOn = !keyboardHelpOn;
    try { localStorage.setItem(A11Y_KEY, keyboardHelpOn ? 'on' : 'off'); } catch { /* réglage perdu au rechargement */ }
    paintKeyboardHelp();
    toast(keyboardHelpOn
      ? 'Commandes clavier affichées. Elles restent accessibles à la tabulation même masquées.'
      : 'Commandes clavier masquées. La tabulation y donne toujours accès.');
    markScrollables();
  }

  function wireKeyboardHelp() {
    $('[data-action="keyboard-help"]')?.addEventListener('click', toggleKeyboardHelp);
    paintKeyboardHelp();
  }

  /* ──────────────────────────── Plein écran ─────────────────────────── */

  /* Le bouton bascule dans les deux sens ; la touche Échap sort aussi, par
   * le comportement natif du navigateur. L'icône suit l'état réel, qui peut
   * changer sans passer par le bouton. */
  const isFullscreen = () => Boolean(document.fullscreenElement || document.webkitFullscreenElement);

  function paintFullscreen() {
    const control = $('[data-action="fullscreen"]');
    if (!control) return;
    const on = isFullscreen();
    control.innerHTML = icon(on ? 'exitFullscreen' : 'fullscreen', { size: 19 });
    control.setAttribute('aria-pressed', String(on));
    control.setAttribute('aria-label', on ? 'Quitter le plein écran' : 'Passer en plein écran');
    control.title = on ? 'Quitter le plein écran (Échap)' : 'Passer en plein écran';
  }

  async function toggleFullscreen() {
    try {
      if (isFullscreen()) await (document.exitFullscreen?.() ?? document.webkitExitFullscreen?.());
      else await (document.documentElement.requestFullscreen?.() ?? document.documentElement.webkitRequestFullscreen?.());
    } catch {
      toast('Le plein écran est indisponible dans ce navigateur ou a été refusé.');
    }
    paintFullscreen();
  }

  function wireFullscreen() {
    const control = $('[data-action="fullscreen"]');
    if (!control) return;
    control.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', paintFullscreen);
    document.addEventListener('webkitfullscreenchange', paintFullscreen);
    paintFullscreen();
  }

  /* ──────────────────── Défilement de la page ───────────────────────── */

  /* La page défile d'un seul bloc : il n'y a plus de zone interne à
   * surveiller. Ces fonctions ne font donc rien ; elles restent appelées
   * par le moteur et l'accueil, et évitent d'éparpiller des conditions. */
  function wireScrollAreas() {}
  function markScrollables() {}

  function wireDialog() {
    const dialog = $('#info-dialog');
    if (!dialog) return;
    dialog.addEventListener('close', () => lastDialogTrigger?.focus());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  }

  root.AtelierCore = Object.freeze({
    catalog, state, $, $$, esc, words,
    asset, webAsset, pageUrl, homeUrl, inSubfolder,
    allKeys, findExercise, entry, isDone, hasDraft, completedCount,
    persist, markSaving, toast, openDialog,
    get storageAvailable() { return storageAvailable; },
    button, linkButton, chips, note, callout, pageTitle, panelTitle, step, mission, quote,
    errorsBox, feedbackBox, hintBlock, illustration, gallery, rubricButton, wireRubric, icon,
    renderChrome, renderNav, renderFooterNav, nextUrl, applyBackground,
    wireImageFallbacks, wireDialog, revealActiveNav,
    wireFullscreen, wireScrollAreas, markScrollables, toggleFullscreen, isFullscreen,
    wireKeyboardHelp, toggleKeyboardHelp, keyboardHelpVisible
  });
})(globalThis);
