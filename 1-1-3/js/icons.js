/* ICÔNES SVG · aucun emoji, aucun caractère décoratif dans l'interface.
 *
 * Chaque icône est un SVG tracé, qui hérite de la couleur du texte
 * (`currentColor`) et s'adapte à la taille demandée. Les emoji ont été
 * écartés : leur dessin change d'un système à l'autre, ils sont annoncés
 * de façon imprévisible par les lecteurs d'écran et ils ne suivent pas
 * la couleur du thème.
 *
 * Usage :  icon('check')             icône décorative (aria-hidden)
 *          icon('check', { label })  icône porteuse de sens (role=img)
 *          icon('check', { size })   taille en pixels (défaut 24)
 *
 * Pour ajouter une icône : ajoutez une entrée à PATHS avec son tracé,
 * dessiné dans une grille de 24 × 24.
 */
(function (root) {
  'use strict';

  /* Tracés dessinés sur une grille 24 × 24, trait de 1.75 pour rester
   * lisible en petit. `fill` indique les formes pleines. */
  const PATHS = {
    // ── Navigation et validation ───────────────────────────────────────
    check: '<path d="m4.5 12.75 5 5 9.5-11"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrowRight: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    arrowLeft: '<path d="M20 12H5m6 6-6-6 6-6"/>',
    arrowDown: '<path d="M12 4v15m6-6-6 6-6-6"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',

    // ── Médias ─────────────────────────────────────────────────────────
    play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke-linejoin="round"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    microphone: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    phone: '<path d="M7.5 3.8h-.1A3.4 3.4 0 0 0 4 7.2c0 7.1 5.7 12.8 12.8 12.8a3.4 3.4 0 0 0 3.4-3.4v-.1l-3.6-1.6-2 2.2a13.4 13.4 0 0 1-6.9-6.9l2.2-2z"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.8 7 7.1 5.5a2 2 0 0 0 2.2 0L20.2 7"/>',

    // ── Information et guidage ─────────────────────────────────────────
    lightbulb: '<path d="M9.5 17.5h5M10 20.5h4M8 11a4 4 0 1 1 8 0c0 1.7-1 2.6-1.5 3.6-.3.6-.4 1.3-.4 1.9h-4.2c0-.6-.1-1.3-.4-1.9C9 13.6 8 12.7 8 11Z"/>',
    sparkle: '<path d="M12 3.5 13.8 9l5.7 1.8L13.8 13 12 18.5 10.2 13 4.5 10.8 10.2 9z"/>',
    list: '<path d="M8.5 7h11M8.5 12h11M8.5 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01"/>',
    document: '<path d="M14 3.5H7.5a1.5 1.5 0 0 0-1.5 1.5v14a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7.5z"/><path d="M14 3.5v4h4M9 13h6M9 16.5h4"/>',
    lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5v-3a3.5 3.5 0 0 1 7 0v3"/>',
    quote: '<path d="M9.5 6.5C7 7.8 5.5 10 5.5 12.8c0 2.3 1.3 3.9 3.2 3.9 1.7 0 2.9-1.2 2.9-2.8 0-1.6-1.1-2.7-2.6-2.7-.3 0-.6 0-.8.1.3-1.3 1.2-2.4 2.5-3.2zm8.4 0c-2.5 1.3-4 3.5-4 6.3 0 2.3 1.3 3.9 3.2 3.9 1.7 0 2.9-1.2 2.9-2.8 0-1.6-1.1-2.7-2.6-2.7-.3 0-.6 0-.8.1.3-1.3 1.2-2.4 2.5-3.2z" fill="currentColor" stroke="none"/>',
    chat: '<path d="M20 12.5c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4 20.5l1.6-4.1A6.6 6.6 0 0 1 4 12.5c0-3.9 3.6-7 8-7s8 3.1 8 7Z"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
    targetFilled: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>',
    grip: '<circle cx="9" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="16" r="1.2" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1.2" fill="currentColor" stroke="none"/>',
    highlighter: '<path d="m14.5 4.5 5 5-8 8H8l-1.5-1.5v-3.5z"/><path d="M4 20.5h7"/>',
    refresh: '<path d="M19.5 11A7.5 7.5 0 0 0 6.6 6.6L4.5 8.5M4.5 13A7.5 7.5 0 0 0 17.4 17.4l2.1-1.9"/><path d="M4.5 4.5v4h4M19.5 19.5v-4h-4"/>',

    // ── Les six attitudes de Porter et le diagnostic d'objection ───────
    scales: '<path d="M12 4.5v15M7.5 19.5h9M5 8.5h14M9.5 7.5 12 5l2.5 2.5"/><path d="M5 8.5 2.5 14h5zM19 8.5 16.5 14h5z"/>',
    question: '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.5-2.2 1.9-2.2 3.3M12 16.8h.01"/>',
    hands: '<path d="M12 18.5c-2.5 0-4.5-1.6-5.4-3.9L5 10.8a1.3 1.3 0 0 1 2.3-1.2l1 1.6V5.3a1.3 1.3 0 0 1 2.6 0v4.4a1.3 1.3 0 0 1 2.6 0v.6a1.3 1.3 0 0 1 2.5.4v1.1l1-1.5a1.3 1.3 0 0 1 2.3 1.2l-1.6 3.8c-.9 2.3-2.9 3.2-5.7 3.2z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.1-1.2l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-2.1 1.2l-2.3-1-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.1 1.2l.3 2.5h4l.3-2.5a7 7 0 0 0 2.1-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z"/>',
    ear: '<path d="M8 9.5a4 4 0 1 1 8 0c0 2.2-2 2.9-2.8 4.2-.5.8-.4 1.6-.9 2.3a2.3 2.3 0 0 1-4.1-1.4"/><path d="M11 9.5a1.2 1.2 0 0 1 2.3.4M7.5 20a5.5 5.5 0 0 1-1.3-4"/>',
    handshake: '<path d="m12 7.5 2-1.5 4.5 3.5-3 4-2.2-1.8"/><path d="m12 7.5-2-1.5L5.5 9.5 9 14l2-1.6"/><path d="M11 12.4 13 14M9.8 14.4l1.9 1.7M8.6 16.4l1.7 1.5"/>',
    thought: '<path d="M16.5 14.5a3.8 3.8 0 0 0 .4-7.4A4.4 4.4 0 0 0 8.4 6a3.6 3.6 0 0 0-.9 7.1"/><path d="M7.5 13.5h9M5.5 18h.01M8.5 19.5h.01"/>',
    shield: '<path d="M12 3.5 5.5 6v5.5c0 4 2.6 7.6 6.5 9 3.9-1.4 6.5-5 6.5-9V6z"/>',
    running: '<circle cx="14" cy="5" r="1.8"/><path d="m8 20 2.5-4.5L8 12l1-4.5 3.5-1 3 2.5 2.5 1"/><path d="m10.5 15.5 4 1 1.5 4M9 8.5 5.5 10"/>',
    pauseCircle: '<circle cx="12" cy="12" r="8.5"/><path d="M10 9v6M14 9v6"/>',
    chart: '<path d="M4.5 19.5h15M7 16.5v-4M11.5 16.5v-8M16 16.5v-5.5"/>',
    pin: '<path d="M12 21s6-5.2 6-9.6A6 6 0 0 0 6 11.4C6 15.8 12 21 12 21Z"/><circle cx="12" cy="11.2" r="2.2"/>',

    // ── Plein écran ────────────────────────────────────────────────────
    fullscreen: '<path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15"/>',
    exitFullscreen: '<path d="M9 4v3.5A1.5 1.5 0 0 1 7.5 9H4M20 9h-3.5A1.5 1.5 0 0 1 15 7.5V4M15 20v-3.5a1.5 1.5 0 0 1 1.5-1.5H20M4 15h3.5A1.5 1.5 0 0 1 9 16.5V20"/>',

    // ── Aide au clavier ────────────────────────────────────────────────
    keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 9.5h.01M9.5 9.5h.01M13 9.5h.01M16.5 9.5h.01M6 14.5h.01M18 9.5h.01M18 14.5h.01M9 14.5h6"/>',
    mouse: '<rect x="7" y="2.5" width="10" height="19" rx="5"/><path d="M12 7v3.5"/>',
    pencil: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="M14.5 6.5l3 3"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3.2 3.2 0 0 1 0 6"/><path d="M17.5 14.5a5.5 5.5 0 0 1 3 5"/>',

    // ── Module 1-1-2 ───────────────────────────────────────────────────
    book: '<path d="M12 6.5c-2-1.5-4.8-2-8-1.5v13c3.2-.5 6 0 8 1.5 2-1.5 4.8-2 8-1.5V5c-3.2-.5-6 0-8 1.5Z"/><path d="M12 6.5v13"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
    trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9l1-12.5M10 10.5v6M14 10.5v6"/>',
    trophy: '<path d="M8 4.5h8v5a4 4 0 0 1-8 0z"/><path d="M8 6.5H5a3 3 0 0 0 3 4M16 6.5h3a3 3 0 0 1-3 4M12 13.5v3M8.5 19.5h7M10 16.5h4v3h-4z"/>',
    crown: '<path d="m4 8 4 4 4-6 4 6 4-4-1.5 10h-13z"/><path d="M5.5 20h13"/>',
    rocket: '<path d="M14.5 4.5c3-1 5-.5 5-.5s.5 2-.5 5c-1 3-4.5 6.5-7.5 8l-4-4c1.5-3 5-7.5 7-8.5Z"/><circle cx="15" cy="9" r="1.6"/><path d="M8 13l-3.5.5L6 10.5l3.5-.5M11 16l-.5 3.5 3-1.5.5-3.5M6.5 17.5 4 20"/>',
    armchair: '<path d="M6.5 11V7.5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2V11"/><path d="M4.5 11a1.5 1.5 0 0 1 1.5 1.5V14h12v-1.5a1.5 1.5 0 0 1 3 0V17H3v-4.5A1.5 1.5 0 0 1 4.5 11ZM5.5 17v2.5M18.5 17v2.5"/>',
    coins: '<ellipse cx="12" cy="6.5" rx="6.5" ry="2.5"/><path d="M5.5 6.5v4c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-4M5.5 10.5v4c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-4M5.5 14.5v3c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-3"/>',
    bolt: '<path d="M13.5 3 5.5 13.5H12L10.5 21l8-10.5H12z"/>',
    undo: '<path d="M9 14 4.5 9.5 9 5"/><path d="M4.5 9.5h10a5 5 0 0 1 0 10h-3"/>',
    thumbUp: '<path d="M7.5 10.5v9h-3v-9z"/><path d="M7.5 10.5 11 4a2 2 0 0 1 2.5 2.3l-.6 3.2h5a2 2 0 0 1 2 2.4l-1.3 6.2a2 2 0 0 1-2 1.4H7.5"/>',
    thumbDown: '<path d="M7.5 13.5v-9h-3v9z"/><path d="M7.5 13.5 11 20a2 2 0 0 0 2.5-2.3l-.6-3.2h5a2 2 0 0 0 2-2.4l-1.3-6.2a2 2 0 0 0-2-1.4H7.5"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
    ban: '<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>',
    video: '<rect x="3" y="6.5" width="12.5" height="11" rx="2"/><path d="m15.5 10.5 5-3v9l-5-3"/>',
    sprout: '<path d="M12 20.5v-9"/><path d="M12 11.5c0-3.5-2.5-6-6.5-6 0 3.5 2.5 6 6.5 6ZM12 13.5c0-3.5 2.5-6 6.5-6 0 3.5-2.5 6-6.5 6Z"/>',
    wand: '<path d="m4 20 11-11M13 7l2 2"/><path d="M17.5 3.5v3M16 5h3M20 9.5v2M19 10.5h2M10 3.5v2M9 4.5h2"/>',
    star: '<path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    building: '<path d="M5 20.5V4.5h9v16M14 9.5h5v11M3.5 20.5h17M8 8h3M8 11.5h3M8 15h3M16.5 13h.01M16.5 16.5h.01"/>',
    monitor: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
    tag: '<path d="M12.5 3.5h7v7l-9 9-7-7z"/><circle cx="16" cy="7" r="1.3"/>',
    cloud: '<path d="M7 18.5a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6-1.3A4.6 4.6 0 0 1 17 18.5z"/>',
    headset: '<path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2"/><rect x="3.5" y="13.5" width="4" height="5.5" rx="1.5"/><rect x="16.5" y="13.5" width="4" height="5.5" rx="1.5"/><path d="M18.5 19c0 1.2-1.5 2-4 2h-2"/>',
    smartphone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17.5h2"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 0 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.2-1-1.6-1-2.7 0-1 .8-1.6 1.8-1.6h2.4a3.5 3.5 0 0 0 3.5-3.5C20.5 6.6 16.7 3.5 12 3.5Z"/><circle cx="7.8" cy="11.5" r="1.1"/><circle cx="10" cy="7.8" r="1.1"/><circle cx="14.5" cy="7.8" r="1.1"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    stack: '<path d="m12 4 8.5 4.5L12 13 3.5 8.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>',
    pointer: '<path d="m5 4 13 6.5-5.5 1.5L10 18z"/>',
    flag: '<path d="M6 21V4.5"/><path d="M6 4.5h11l-2.5 4 2.5 4H6"/>',
    folder: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2v7.8a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/>'
  };

  const escapeAttribute = value => String(value ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Renvoie le SVG d'une icône. Sans `label`, l'icône est décorative et
   * masquée aux lecteurs d'écran : le texte voisin porte déjà le sens. */
  function icon(name, options = {}) {
    const path = PATHS[name];
    if (!path) return '';
    const { size = 24, label = '', className = '', strokeWidth = 1.75 } = options;
    const accessibility = label
      ? `role="img" aria-label="${escapeAttribute(label)}"`
      : 'aria-hidden="true" focusable="false"';
    return `<svg class="icon ${escapeAttribute(className)}" width="${Number(size)}" height="${Number(size)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${Number(strokeWidth)}" stroke-linecap="round" stroke-linejoin="round" ${accessibility}>${path}</svg>`;
  }

  const has = name => Object.prototype.hasOwnProperty.call(PATHS, name);

  root.AtelierIcons = Object.freeze({ icon, has, names: Object.freeze(Object.keys(PATHS)) });
})(globalThis);
