/* APERÇUS DES EXERCICES · dessins SVG affichés sur les pages de contexte.
 *
 * Chaque aperçu montre la MÉCANIQUE de l'exercice, pas une scène de vente :
 * des cartes qui se déplacent vers des emplacements, une question et ses
 * options, un paragraphe à surligner. L'apprenant comprend d'un coup d'œil
 * ce qu'il va manipuler.
 *
 * Six familles couvrent les 24 exercices. Chacune est paramétrée par le
 * nombre réel de cartes, de zones ou de lignes, lu dans le catalogue des
 * contenus : l'aperçu d'un exercice à 8 cartes en montre bien 8.
 *
 * Tout est tracé, sans fichier image : net à toute taille, et les couleurs
 * suivent le thème.
 */
(function (root) {
  'use strict';

  /* Palette de l'aperçu. Volontairement plus douce que celle de l'interface :
   * c'est une illustration, elle ne doit pas rivaliser avec le bouton. */
  const INK = '#13205c';
  const BLUE = '#1b4fd8';
  const SOFT = '#dbe4fa';
  const SOFTER = '#eaf0fd';
  const CORAL = '#f4a28c';
  const CORAL_SOFT = '#fbdcd2';
  const PAPER = '#ffffff';
  const LINE = '#c9d6f2';

  /* Barres grises qui figurent du texte, sans en afficher. */
  const textLines = (x, y, widths, gap = 11, height = 7, fill = SOFT) =>
    widths.map((width, i) =>
      `<rect x="${x}" y="${y + i * gap}" width="${width}" height="${height}" rx="${height / 2}" fill="${fill}"/>`).join('');

  /* La poignée à six points des cartes déplaçables. */
  const grip = (x, y) => {
    let dots = '';
    for (let column = 0; column < 2; column++) {
      for (let row = 0; row < 3; row++) {
        dots += `<circle cx="${x + column * 6}" cy="${y + row * 6}" r="1.7" fill="#aebbd9"/>`;
      }
    }
    return dots;
  };

  /* Une carte à déplacer : poignée, pastille de lettre, deux lignes. */
  function card(x, y, width, letter, tone, tilt = 0) {
    const height = 58;
    const badge = tone === 'coral' ? CORAL_SOFT : SOFT;
    const badgeInk = tone === 'coral' ? '#b4573c' : BLUE;
    return `<g transform="rotate(${tilt} ${x + width / 2} ${y + height / 2})">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="11" fill="${PAPER}" stroke="${LINE}"/>
      ${grip(x + 17, y + 23)}
      <circle cx="${x + 48}" cy="${y + height / 2}" r="15" fill="${badge}"/>
      <text x="${x + 48}" y="${y + height / 2 + 5}" text-anchor="middle" font-size="15" font-weight="700" fill="${badgeInk}">${letter}</text>
      ${textLines(x + 73, y + 18, [width - 95, width - 130])}
    </g>`;
  }

  /* Un emplacement vide, en pointillés. */
  const slot = (x, y, width, height, number) => `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="10" fill="${SOFTER}" stroke="${LINE}" stroke-dasharray="5 4"/>
    ${number !== undefined ? `<circle cx="${x + 26}" cy="${y + height / 2}" r="14" fill="${SOFT}"/>
    <text x="${x + 26}" y="${y + height / 2 + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${BLUE}">${number}</text>` : ''}
  </g>`;

  /* Petits traits de mouvement, comme sur une bande dessinée. */
  const spark = (x, y, flip = false) => `<g stroke="${CORAL}" stroke-width="3" stroke-linecap="round" transform="${flip ? `scale(-1 1) translate(${-2 * x} 0)` : ''}">
    <path d="M${x} ${y} l-9 -11"/><path d="M${x + 9} ${y - 5} l-5 -13"/><path d="M${x - 7} ${y + 11} l-12 -5"/>
  </g>`;

  const arrow = (x, y) => `<path d="M${x} ${y} q 22 -16 44 2" fill="none" stroke="#9db4e8" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M${x + 38} ${y - 5} l8 7 -9 5" fill="none" stroke="#9db4e8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  const frame = body => `<svg viewBox="0 0 640 470" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" class="preview-art">${body}</svg>`;

  /* ── Famille 1 · remise en ordre ─────────────────────────────────────── */
  /* Des cartes en vrac à gauche, des emplacements numérotés à droite. */
  function orderPreview(count = 5) {
    const letters = ['C', 'A', 'E', 'B', 'D', 'F'];
    const shown = Math.min(count, 5);
    const step = 400 / shown;
    let cards = '';
    for (let i = 0; i < shown; i++) {
      const tilt = [-2.5, 1.5, -1, 2, -2][i % 5];
      cards += card(18 + (i % 2) * 10, 30 + i * step, 330, letters[i], i % 2 ? 'coral' : 'blue', tilt);
    }
    let slots = '';
    for (let i = 0; i < shown; i++) {
      slots += slot(420, 30 + i * step, 205, 52, i + 1);
    }
    return frame(`${cards}${slots}${arrow(368, 52)}${spark(390, 300)}`);
  }

  /* ── Famille 2 · tri en deux zones ───────────────────────────────────── */
  function sortPreview() {
    return frame(`
      <rect x="18" y="86" width="178" height="230" rx="16" fill="#f1faf5" stroke="#a8d8bf" stroke-dasharray="6 5"/>
      <circle cx="107" cy="150" r="30" fill="#d9f0e3"/>
      <path d="M95 150 l9 10 17-21" stroke="#1b6b47" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${textLines(52, 200, [110, 78], 13, 8, '#bfe3cf')}

      <rect x="444" y="86" width="178" height="230" rx="16" fill="#fdf5f4" stroke="#eeb4a8" stroke-dasharray="6 5"/>
      <circle cx="533" cy="150" r="30" fill="#fbdcd2"/>
      <path d="M523 140 l20 20 M543 140 l-20 20" stroke="#b4573c" stroke-width="4" stroke-linecap="round"/>
      ${textLines(478, 200, [110, 78], 13, 8, '#f3cabd')}

      ${card(228, 118, 184, '1', 'blue', -3)}
      ${card(222, 180, 184, '2', 'coral', 2)}
      <path d="M212 150 l-26 0" stroke="#a8d8bf" stroke-width="3" stroke-linecap="round"/>
      <path d="M192 144 l-8 6 8 6" stroke="#a8d8bf" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M424 212 l26 0" stroke="#eeb4a8" stroke-width="3" stroke-linecap="round"/>
      <path d="M444 206 l8 6 -8 6" stroke="#eeb4a8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${spark(250, 100)}`);
  }

  /* ── Famille 3 · association vers une grille de zones ────────────────── */
  function matchPreview(zones = 6) {
    const columns = zones > 4 ? 3 : 2;
    const rows = Math.ceil(Math.min(zones, 6) / columns);
    /* La grille tient entre la flèche (x 320) et la marge droite du dessin
     * (x 600) : au-delà, le cadre du SVG la rognait. */
    const width = (280 - (columns - 1) * 14) / columns;
    const height = 92;
    let grid = '';
    for (let i = 0; i < Math.min(zones, 6); i++) {
      const column = i % columns;
      const row = Math.floor(i / columns);
      const x = 300 + column * (width + 14);
      const y = 70 + row * (height + 16);
      grid += `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="12" fill="${SOFTER}" stroke="${LINE}" stroke-dasharray="5 4"/>
        <circle cx="${x + width / 2}" cy="${y + 32}" r="17" fill="${SOFT}"/>
        ${textLines(x + 18, y + 60, [width - 36, width - 58], 11, 6)}`;
    }
    void rows;
    return frame(`${grid}
      ${card(26, 150, 248, 'A', 'blue', -3)}
      ${card(20, 214, 248, 'B', 'coral', 2)}
      ${arrow(272, 170)}
      ${spark(60, 118)}`);
  }

  /* ── Famille 4 · question à choix ────────────────────────────────────── */
  function choicePreview(options = 4) {
    const shown = Math.min(options, 4);
    let rows = '';
    /* Moins il y a d'options, plus chacune respire : deux options ont
     * des cartes hautes et bien espacées, quatre se resserrent pour tenir. */
    const height = shown <= 2 ? 76 : 60;
    const step = shown <= 2 ? 100 : shown === 3 ? 84 : 74;
    const top = shown <= 2 ? 156 : 150;
    const radius = shown <= 2 ? 18 : 15;
    for (let i = 0; i < shown; i++) {
      const y = top + i * step;
      const middle = y + height / 2;
      const chosen = i === 2;
      rows += `<rect x="40" y="${y}" width="560" height="${height}" rx="12" fill="${chosen ? '#f3fbf6' : PAPER}" stroke="${chosen ? '#7cc49b' : LINE}" stroke-width="${chosen ? 2 : 1}"/>
        <circle cx="${40 + radius + 22}" cy="${middle}" r="${radius}" fill="${chosen ? '#d9f0e3' : SOFT}"/>
        <text x="${40 + radius + 22}" y="${middle + 5}" text-anchor="middle" font-size="${radius - 1}" font-weight="700" fill="${chosen ? '#1b6b47' : BLUE}">${'abcd'[i]}</text>
        ${textLines(40 + 2 * radius + 46, middle - 11, [i % 2 ? 380 : 440, i % 2 ? 250 : 300], 15, 7)}
        ${chosen ? `<path d="M556 ${middle} l8 9 15-19" stroke="#1b6b47" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` : ''}`;
    }
    return frame(`
      <rect x="40" y="36" width="560" height="86" rx="14" fill="${SOFTER}"/>
      <path d="M70 62 q-8 6 -8 16 0 10 8 10 7 0 7-8 0-7-6-7-2 0-3 1 1-6 6-10z" fill="#9db4e8"/>
      <path d="M96 62 q-8 6 -8 16 0 10 8 10 7 0 7-8 0-7-6-7-2 0-3 1 1-6 6-10z" fill="#9db4e8"/>
      ${textLines(124, 60, [420, 300], 16, 9, '#c3d3f2')}
      ${rows}${spark(620, 128, true)}`);
  }

  /* ── Famille 5 · rédaction ligne à ligne ─────────────────────────────── */
  function writePreview(lines = 4) {
    const shown = Math.min(lines, 5);
    let rows = '';
    for (let i = 0; i < shown; i++) {
      const y = 48 + i * 86;
      rows += `<circle cx="52" cy="${y + 34}" r="19" fill="${i % 2 ? CORAL_SOFT : SOFT}"/>
        <text x="52" y="${y + 40}" text-anchor="middle" font-size="16" font-weight="700" fill="${i % 2 ? '#b4573c' : BLUE}">${i + 1}</text>
        <rect x="88" y="${y}" width="350" height="68" rx="11" fill="${PAPER}" stroke="${LINE}"/>
        ${textLines(108, y + 20, [i === shown - 1 ? 150 : 290, i === shown - 1 ? 0 : 200], 15, 8)}
        <rect x="454" y="${y}" width="160" height="68" rx="11" fill="${SOFTER}" stroke="${LINE}"/>
        ${textLines(474, y + 29, [104], 12, 8, '#c3d3f2')}
        <path d="M588 ${y + 30} l6 7 6-7" stroke="#9db4e8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    }
    return frame(`${rows}${spark(620, 40, true)}`);
  }

  /* ── Famille 6 · surligneur ──────────────────────────────────────────── */
  function highlightPreview() {
    const mark = (x, y, width) => `<rect x="${x}" y="${y}" width="${width}" height="16" rx="4" fill="#ffe9a3"/>`;
    return frame(`
      <rect x="30" y="40" width="580" height="310" rx="16" fill="${PAPER}" stroke="${LINE}"/>
      <path d="M68 88 q-9 7 -9 18 0 11 9 11 8 0 8-9 0-8-7-8-2 0-3 1 1-7 7-11z" fill="#9db4e8"/>
      <path d="M96 88 q-9 7 -9 18 0 11 9 11 8 0 8-9 0-8-7-8-2 0-3 1 1-7 7-11z" fill="#9db4e8"/>
      ${mark(124, 84, 150)}${mark(286, 84, 104)}
      ${textLines(124, 88, [146, 0], 12, 8, '#b9c9ea')}
      ${textLines(402, 88, [172], 12, 8, SOFT)}
      ${textLines(64, 128, [510, 470], 26, 8, SOFT)}
      ${mark(64, 196, 196)}
      ${textLines(276, 200, [292], 12, 8, SOFT)}
      ${textLines(64, 240, [500], 26, 8, SOFT)}
      ${mark(64, 272, 128)}
      ${textLines(208, 276, [350], 12, 8, SOFT)}
      <circle cx="534" cy="306" r="30" fill="#fff2cc"/>
      <path d="M525 312 l17-17 9 9 -17 17z" fill="#e8b52e"/>
      <path d="M520 317 l-4 11 11-4z" fill="#d9a406"/>
      ${spark(60, 386)}`);
  }

  /* ── Correspondance exercice → aperçu ────────────────────────────────── */
  /* Chaque exercice reçoit sa famille et ses paramètres réels. */
  const MAP = {
    's1-1.1': () => choicePreview(4),
    's1-1.2': () => highlightPreview(),
    's1-1.3': () => matchPreview(3),
    's1-1.4': () => choicePreview(4),
    's1-1.5': () => choicePreview(2),
    's1-1.6': () => writePreview(3),

    's2-2.1': () => sortPreview(),
    's2-2.2': () => orderPreview(5),
    's2-2.3': () => writePreview(3),
    's2-2.4': () => choicePreview(4),
    's2-2.5': () => writePreview(5),
    's2-2.6': () => writePreview(4),

    's3-3.1': () => choicePreview(3),
    's3-3.2': () => matchPreview(6),
    's3-3.3': () => choicePreview(4),
    's3-3.4': () => sortPreview(),
    's3-3.5': () => choicePreview(2),
    's3-3.6': () => writePreview(5),

    's4-1.1': () => choicePreview(3),
    's4-1.2': () => writePreview(2),
    's4-2.1': () => sortPreview(),
    's4-2.2': () => writePreview(2),
    's4-3.1': () => sortPreview(),
    's4-3.2': () => writePreview(3)
  };

  const preview = key => (MAP[key] ? MAP[key]() : '');
  const has = key => Boolean(MAP[key]);

  root.AtelierPreviews = Object.freeze({ preview, has, keys: Object.freeze(Object.keys(MAP)) });
})(globalThis);
