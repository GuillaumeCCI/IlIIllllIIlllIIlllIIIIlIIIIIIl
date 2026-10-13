/* MANIPULATION · glisser-déposer avec équivalent clavier systématique.
 *
 * Trois usages, un seul moteur :
 *   · sort   : classer des cartes dans 2 zones ou plus (S3 1.1, S4 2.1) ;
 *   · place  : placer des cartes à des positions ordonnées (S4 1.1) ;
 *   · match  : associer des cartes à des étapes (S3 1.2).
 *
 * Toute action réalisable à la souris l'est aussi au clavier : chaque zone a
 * un bouton, et la carte courante est annoncée. Le glisser-déposer est un
 * confort, jamais le seul chemin · exigence d'accessibilité.
 */
(function (root) {
  'use strict';

  const core = root.AtelierCore;
  const { $, $$, esc, icon } = core;

  /* Rend le paquet de cartes, les zones de dépôt et les boutons clavier.
   *
   * options :
   *   cards      [{ text }]         les cartes, dans l'ordre d'apparition
   *   zones      [{ id, label, description?, symbol? }]
   *   placed     { cardIndex: zoneId }   l'état actuel
   *   cursor     index de la carte présentée
   *   noun       'carte', 'phrase', 'réponse'…
   *   layout     'sides' | 'grid' | 'row'
   */
  function board(options) {
    const { cards, zones, placed, cursor, noun = 'carte', layout = 'grid', instruction = '' } = options;
    const remaining = cards.map((card, i) => i).filter(i => placed[i] === undefined);
    const currentIndex = remaining.includes(cursor) ? cursor : remaining[0];
    const done = Object.keys(placed).length;

    const zonesHtml = zones.map((zone, z) => {
      const inZone = Object.entries(placed).filter(([, id]) => id === zone.id).map(([i]) => Number(i));
      return `<div class="drop-zone zone-${esc(zone.id)}" data-zone="${esc(zone.id)}">
        <div class="drop-zone-head">
          ${zone.symbol ? `<span class="drop-symbol">${icon(zone.symbol, { size: 20 })}</span>` : ''}
          ${zone.number ? `<span class="drop-number" aria-hidden="true">${esc(zone.number)}</span>` : ''}
          <strong>${esc(zone.label)}</strong>
          ${zone.description ? `<span class="drop-description">${esc(zone.description)}</span>` : ''}
        </div>
        <ul class="drop-list">${inZone.map(i =>
          `<li class="placed-card"><span>${esc(cards[i].text)}</span><button type="button" class="icon-button small" data-action="unplace" data-index="${i}" aria-label="Retirer : ${esc(cards[i].text)}">${icon('close', { size: 15 })}</button></li>`
        ).join('') || `<li class="drop-empty">Déposez ${noun === 'phrase' ? 'une phrase' : `une ${noun}`} ici</li>`}</ul>
      </div>`;
    }).join('');

    const deck = currentIndex === undefined
      ? `<div class="deck deck-empty"><p>Toutes les ${noun}s sont placées.</p></div>`
      : `<div class="deck">
          <p class="deck-position">${esc(noun.toUpperCase())} ${cards.length - remaining.length + 1} SUR ${cards.length}</p>
          <div class="deck-dots" aria-hidden="true">${cards.map((_, i) => `<span class="dot ${placed[i] !== undefined ? 'filled' : i === currentIndex ? 'current' : ''}"></span>`).join('')}</div>
          <article class="draggable-card" draggable="true" data-card="${currentIndex}" tabindex="0" aria-label="${esc(noun)} à placer : ${esc(cards[currentIndex].text)}">
            <span class="card-grip">${icon('grip', { size: 18 })}</span>
            <p>${esc(cards[currentIndex].text)}</p>
          </article>
          ${instruction ? `<p class="deck-instruction">${esc(instruction)}</p>` : ''}
          <div class="keyboard-choices">
            <p class="muted keyboard-label">Ou choisissez au clavier</p>
            <div class="keyboard-buttons">${zones.map((zone, z) =>
              `<button type="button" class="button secondary small" data-action="place" data-zone="${esc(zone.id)}" data-index="${currentIndex}">${zone.key ? `<span class="key">${esc(zone.key)}</span>` : ''}${esc(zone.short || zone.label)}</button>`
            ).join('')}</div>
          </div>
        </div>`;

    return `<div class="board board-${layout}" data-board>
      ${layout === 'sides' ? `${zonesHtml.split('</div>\n      ').length ? '' : ''}` : ''}
      <div class="board-zones">${zonesHtml}</div>
      ${deck}
      <div class="board-footer">
        ${core.button('Annuler le dernier choix', 'undo', 'secondary small', done ? '' : 'disabled')}
        <span class="board-count">${done} ${noun}${done > 1 ? 's' : ''} placée${done > 1 ? 's' : ''} sur ${cards.length}</span>
      </div>
    </div>`;
  }

  /* Variante « deux côtés » : zone gauche, paquet au centre, zone droite.
   * Utilisée par S3 1.1 (bon réflexe / à éviter). */
  function sidesBoard(options) {
    const { cards, zones, placed, cursor, noun = 'carte' } = options;
    const remaining = cards.map((card, i) => i).filter(i => placed[i] === undefined);
    const currentIndex = remaining.includes(cursor) ? cursor : remaining[0];
    const done = Object.keys(placed).length;

    const side = (zone, position) => {
      const inZone = Object.entries(placed).filter(([, id]) => id === zone.id).map(([i]) => Number(i));
      return `<div class="drop-zone side side-${position} zone-${esc(zone.id)}" data-zone="${esc(zone.id)}">
        <span class="side-symbol">${icon(zone.symbol || 'check', { size: 28 })}</span>
        <strong>${esc(zone.label)}</strong>
        <span class="drop-description">Déposez la carte ici</span>
        <ul class="drop-list">${inZone.map(i =>
          `<li class="placed-card"><span>${esc(cards[i].text)}</span><button type="button" class="icon-button small" data-action="unplace" data-index="${i}" aria-label="Retirer : ${esc(cards[i].text)}">${icon('close', { size: 15 })}</button></li>`
        ).join('')}</ul>
      </div>`;
    };

    return `<div class="board board-sides" data-board>
      ${side(zones[0], 'left')}
      <div class="deck">
        ${currentIndex === undefined ? `<p class="deck-done">Toutes les cartes sont classées.</p>` : `
          <p class="deck-position">CARTE ${cards.length - remaining.length + 1} SUR ${cards.length}</p>
          <div class="deck-dots" aria-hidden="true">${cards.map((_, i) => `<span class="dot ${placed[i] !== undefined ? 'filled' : i === currentIndex ? 'current' : ''}"></span>`).join('')}</div>
          <article class="draggable-card" draggable="true" data-card="${currentIndex}" tabindex="0" aria-label="Carte à classer : ${esc(cards[currentIndex].text)}">
            <span class="card-grip">${icon('grip', { size: 18 })}</span>
            <span class="card-number">${currentIndex + 1}</span>
            <p>${esc(cards[currentIndex].text)}</p>
          </article>
          <div class="keyboard-choices">
            <p class="muted keyboard-label">Ou choisissez au clavier</p>
            <div class="keyboard-buttons">
              <button type="button" class="button secondary small" data-action="place" data-zone="${esc(zones[0].id)}" data-index="${currentIndex}">${icon('arrowLeft', { size: 16 })}<span>${esc(zones[0].label)}</span></button>
              <button type="button" class="button secondary small" data-action="place" data-zone="${esc(zones[1].id)}" data-index="${currentIndex}"><span>${esc(zones[1].label)}</span>${icon('arrowRight', { size: 16 })}</button>
            </div>
          </div>`}
      </div>
      ${side(zones[1], 'right')}
      <div class="board-footer">
        ${core.button('Annuler le dernier choix', 'undo', 'secondary small', done ? '' : 'disabled')}
        <span class="board-count">${done} sur ${cards.length} classées</span>
      </div>
    </div>`;
  }

  /* Variante « positions ordonnées » : 1 → 2 → 3 → 4 → 5 (S4 1.1). */
  function sequenceBoard(options) {
    const { cards, slots, placed, cursor } = options;
    const remaining = cards.map((card, i) => i).filter(i => placed[i] === undefined);
    const currentIndex = remaining.includes(cursor) ? cursor : remaining[0];
    const done = Object.keys(placed).length;
    const occupant = slot => Object.entries(placed).find(([, s]) => Number(s) === slot)?.[0];

    return `<div class="board board-sequence" data-board>
      <div class="sequence-slots">${Array.from({ length: slots }, (_, s) => {
        const index = occupant(s + 1);
        return `<div class="drop-zone slot ${index !== undefined ? 'filled' : ''}" data-zone="${s + 1}">
          <span class="slot-number" aria-hidden="true">${s + 1}</span>
          ${index !== undefined
            ? `<div class="placed-card"><span>${esc(cards[index].text)}</span><button type="button" class="icon-button small" data-action="unplace" data-index="${index}" aria-label="Retirer de la position ${s + 1}">${icon('close', { size: 15 })}</button></div>`
            : '<span class="drop-description">Déposez ici</span>'}
        </div>${s < slots - 1 ? `<span class="slot-arrow">${icon('arrowRight', { size: 18 })}</span>` : ''}`;
      }).join('')}</div>
      <div class="deck">
        ${currentIndex === undefined ? '<p class="deck-done">Toutes les phrases sont placées.</p>' : `
          <p class="deck-position">CARTE ${cards.length - remaining.length + 1} SUR ${cards.length}</p>
          <article class="draggable-card" draggable="true" data-card="${currentIndex}" tabindex="0" aria-label="Phrase à placer : ${esc(cards[currentIndex].text)}">
            <span class="card-grip">${icon('grip', { size: 18 })}</span>
            <p>« ${esc(cards[currentIndex].text)} »</p>
          </article>
          <p class="deck-instruction">Glissez la carte vers sa position</p>
          <div class="keyboard-choices">
            <p class="muted keyboard-label">Ou choisissez une position au clavier</p>
            <div class="keyboard-buttons">${Array.from({ length: slots }, (_, s) =>
              `<button type="button" class="button secondary small square" data-action="place" data-zone="${s + 1}" data-index="${currentIndex}" ${occupant(s + 1) !== undefined ? 'disabled' : ''} aria-label="Placer en position ${s + 1}">${s + 1}</button>`
            ).join('')}</div>
          </div>`}
      </div>
      <div class="board-footer">
        ${core.button('Annuler le dernier placement', 'undo', 'secondary small', done ? '' : 'disabled')}
        <span class="board-count">${done} phrase${done > 1 ? 's' : ''} placée${done > 1 ? 's' : ''} sur ${cards.length}</span>
      </div>
    </div>`;
  }

  /* Branche le glisser-déposer et le clavier sur le plateau rendu.
   * `onPlace(cardIndex, zoneId)` et `onUndo()` sont fournis par l'exercice. */
  function wire(handlers) {
    const { onPlace, onUndo } = handlers;
    let dragged = null;

    document.addEventListener('dragstart', event => {
      const card = event.target.closest('.draggable-card');
      if (!card) return;
      dragged = Number(card.dataset.card);
      card.classList.add('dragging');
      event.dataTransfer.effectAllowed = 'move';
      // Certains navigateurs exigent une donnée pour démarrer le glisser.
      event.dataTransfer.setData('text/plain', String(dragged));
    });

    document.addEventListener('dragend', event => {
      event.target.closest('.draggable-card')?.classList.remove('dragging');
      $$('.drop-zone.over').forEach(zone => zone.classList.remove('over'));
      dragged = null;
    });

    document.addEventListener('dragover', event => {
      const zone = event.target.closest('.drop-zone');
      if (!zone || dragged === null) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      zone.classList.add('over');
    });

    document.addEventListener('dragleave', event => {
      const zone = event.target.closest('.drop-zone');
      if (zone && !zone.contains(event.relatedTarget)) zone.classList.remove('over');
    });

    document.addEventListener('drop', event => {
      const zone = event.target.closest('.drop-zone');
      if (!zone) return;
      event.preventDefault();
      zone.classList.remove('over');
      const index = dragged !== null ? dragged : Number(event.dataTransfer.getData('text/plain'));
      if (Number.isFinite(index)) onPlace(index, zone.dataset.zone);
      dragged = null;
    });

    /* Dépôt par la saisie des cartes (plus bas dans ce fichier). */
    document.addEventListener('atelier:drop', event => {
      const { source, zone } = event.detail;
      if (!source.matches('.draggable-card') || !zone.matches('.drop-zone')) return;
      onPlace(Number(source.dataset.card), zone.dataset.zone);
    });

    document.addEventListener('click', event => {
      const control = event.target.closest('[data-action]');
      if (!control) return;
      if (control.dataset.action === 'place') onPlace(Number(control.dataset.index), control.dataset.zone);
      else if (control.dataset.action === 'unplace') onPlace(Number(control.dataset.index), null);
      else if (control.dataset.action === 'undo') onUndo();
    });

    // Entrée ou Espace sur la carte : ouvre le choix au clavier.
    document.addEventListener('keydown', event => {
      const card = event.target.closest('.draggable-card');
      if (!card || (event.key !== 'Enter' && event.key !== ' ')) return;
      event.preventDefault();
      $('.keyboard-buttons .button:not([disabled])')?.focus();
    });
  }

  root.AtelierDnD = Object.freeze({ board, sidesBoard, sequenceBoard, wire });
})(globalThis);

/* SAISIE DES CARTES · un glisser-déposer qui tient la carte en main.
 *
 * Le glisser natif du navigateur ne montre qu'une image fantôme, à demi
 * transparente, de la carte. Ici, à la souris ou au stylet, la carte est
 * réellement soulevée : un double opaque suit le pointeur (légère
 * inclinaison, ombre portée), la place d'origine reste marquée en
 * pointillés, la zone survolée s'éclaire, et la page défile seule près des
 * bords. Au lâcher sur une zone, l'événement `atelier:drop` est émis avec
 * { source, zone } : kit.js et le moteur ci-dessus s'y branchent.
 *
 * Un simple clic reste un clic (seuil de 6 px). Au doigt, rien ne change :
 * les boutons de chaque zone restent le chemin principal.
 */
(function (root) {
  'use strict';
  const doc = root.document;
  if (!doc || typeof doc.addEventListener !== 'function' || root.AtelierLift) return;

  const SOURCES = '[draggable="true"]';
  const ZONES = '[data-drop], .drop-zone';
  const THRESHOLD = 6;
  let press = null;   // { el, id, x, y, dx, dy }
  let ghost = null;
  let zone = null;
  let swallowClick = false;

  const overClass = el => (el.matches('.drop-zone') ? 'over' : 'is-over');
  function setZone(next) {
    if (next === zone) return;
    if (zone) zone.classList.remove(overClass(zone));
    zone = next;
    if (zone) zone.classList.add(overClass(zone));
  }

  function start(event) {
    const rect = press.el.getBoundingClientRect();
    ghost = press.el.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    ghost.classList.add('lift-ghost');
    ghost.setAttribute('aria-hidden', 'true');
    Object.assign(ghost.style, { width: `${rect.width}px`, height: `${rect.height}px` });
    doc.body.appendChild(ghost);
    // La prise se mesure là où le bouton a été enfoncé : mesurée au départ
    // du glisser (après quelques pixels), elle décalait la carte du pointeur.
    press.dx = press.x - rect.left;
    press.dy = press.y - rect.top;
    press.el.classList.add('is-lifted');
    doc.documentElement.classList.add('is-lifting');
    move(event);
  }

  function move(event) {
    ghost.style.transform = `translate(${event.clientX - press.dx}px, ${event.clientY - press.dy}px) rotate(-2deg) scale(1.03)`;
    const under = doc.elementFromPoint(event.clientX, event.clientY);
    setZone(under && under.closest ? under.closest(ZONES) : null);
    // Défilement automatique près du haut et du bas de la fenêtre.
    const edge = 70;
    if (event.clientY < edge) root.scrollBy(0, -14);
    else if (event.clientY > root.innerHeight - edge) root.scrollBy(0, 14);
  }

  function finish(drop) {
    const target = zone;
    const source = press && press.el;
    setZone(null);
    if (ghost) ghost.remove();
    ghost = null;
    if (source) source.classList.remove('is-lifted', 'is-dragging', 'dragging');
    doc.documentElement.classList.remove('is-lifting');
    press = null;
    if (drop && target && source) {
      doc.dispatchEvent(new CustomEvent('atelier:drop', { detail: { source, zone: target } }));
    }
  }

  // Le glisser natif est remplacé à la souris : plus d'image fantôme.
  doc.addEventListener('dragstart', event => {
    if (!(event.target.closest && event.target.closest(SOURCES) && press)) return;
    // Annulé ici, le glisser natif ne doit pas non plus marquer la carte
    // (classe « is-dragging ») : aucun « dragend » ne viendrait la retirer.
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);

  doc.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.pointerType === 'touch') return;
    const el = event.target.closest && event.target.closest(SOURCES);
    // Les champs ne se soulèvent pas (on y tape), sauf ceux marqués `data-lift`
    // (un numéro déjà posé qu'on peut déplacer) : un clic sans mouvement y
    // place toujours le curseur.
    if (!el || (event.target.closest('input, textarea, select, [data-no-lift]') && !event.target.closest('[data-lift]'))) return;
    press = { el, x: event.clientX, y: event.clientY, id: event.pointerId };
    // Le relâchement nous parvient même hors de la fenêtre.
    try { el.setPointerCapture(event.pointerId); } catch (error) { /* sans effet */ }
  });

  doc.addEventListener('pointermove', event => {
    if (!press || event.pointerId !== press.id) return;
    if (!ghost) {
      if (Math.hypot(event.clientX - press.x, event.clientY - press.y) < THRESHOLD) return;
      start(event);
    }
    event.preventDefault();
    move(event);
  });

  doc.addEventListener('pointerup', event => {
    if (!press || event.pointerId !== press.id) return;
    const dragged = Boolean(ghost);
    if (dragged) {
      swallowClick = true;
      setTimeout(() => { swallowClick = false; }, 0);
    }
    finish(dragged);
  });
  doc.addEventListener('pointercancel', () => { if (press) finish(false); });
  doc.addEventListener('lostpointercapture', event => { if (press && event.pointerId === press.id && !ghost) press = null; });
  doc.addEventListener('keydown', event => { if (event.key === 'Escape' && ghost) finish(false); });

  // Après un glisser, le relâchement ne doit pas valoir un clic sur la carte.
  doc.addEventListener('click', event => {
    if (!swallowClick) return;
    swallowClick = false;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  root.AtelierLift = Object.freeze({ active: () => Boolean(ghost) });
})(globalThis);
