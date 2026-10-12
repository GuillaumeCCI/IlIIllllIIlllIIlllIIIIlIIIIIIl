/* UNE CARTE À LA FOIS · remplace le glisser-déposer par un choix simple.
 *
 * Quatre exercices classent des cartes : S3 1.1 (deux côtés), S3 1.2 et
 * S4 2.1 (six catégories), S1 C (cinq positions). Le plateau de dépôt
 * demandait de viser une zone et montrait tout l'écran d'un coup. On
 * présente désormais UNE carte, avec ses réponses en boutons, puis un
 * RÉCAPITULATIF relisible avant validation.
 *
 * Le module ne porte que l'affichage : l'état reste dans `placement`.
 */
(function (root) {
  'use strict';

  const core = () => root.AtelierCore;
  const ex = () => root.AtelierExercise;

  /* Le rappel de la consigne reste accessible pendant tout l'exercice :
   * ces écrans n'utilisent pas la barre d'actions standard, qui le
   * portait jusqu'ici. */
  const briefLink = () => (root.ATELIER_BRIEFINGS || {})[ex().current.key]
    ? core().button('Revoir la consigne', 'show-briefing', 'text-button review-brief')
    : '';

  /* ── L'écran « une carte » ──────────────────────────────────────────
   * `options` :
   *   cards    [{ text }]            les cartes, dans l'ordre d'apparition
   *   choices  [{ id, label, symbol, tone }]  les réponses possibles
   *   placement                       l'état partagé
   *   eyebrow, title, intro           l'en-tête
   *   hint                            la ligne d'aide sous les boutons
   *   lock                            ce que la validation débloquera
   */
  function cardScreen(options) {
    const { cards, choices, placement, eyebrow, title, intro, hint = '', lock = '' } = options;
    const { esc, icon } = core();
    const index = Math.min(ex().cursor(), cards.length - 1);
    const card = cards[index];
    const done = placement.placedCount();
    const chosen = placement.list()[index];

    /* Les pastilles disent où l'on en est, et permettent de revenir sur
     * une carte déjà classée sans repasser par le récapitulatif. */
    const dots = cards.map((_, i) => {
      const state = i === index ? 'current' : placement.list()[i] != null ? 'filled' : '';
      return `<button type="button" class="sorter-dot ${state}" data-action="goto-card" data-index="${i}"
        aria-label="Carte ${i + 1}${placement.list()[i] != null ? ', classée' : ''}"
        aria-current="${i === index}"></button>`;
    }).join('');

    const buttons = choices.map(choice => `
      <button type="button" class="sorter-choice tone-${choice.tone || 'neutral'} ${String(chosen) === String(choice.id) ? 'is-chosen' : ''}"
        data-action="sort-card" data-zone="${esc(String(choice.id))}">
        ${choice.symbol ? `<span class="sorter-choice-symbol">${icon(choice.symbol, { size: 22 })}</span>` : ''}
        <span class="sorter-choice-label">${esc(choice.label)}</span>
      </button>`).join('');

    return `<div class="sorter">
      <header class="sorter-head">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        ${intro ? `<p class="subtitle">${esc(intro)}</p>` : ''}
        <div class="sorter-progress">
          <span class="sorter-dots">${dots}</span>
          <span class="sorter-count">${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}</span>
          <span class="sorter-done">${done} classée${done > 1 ? 's' : ''}</span>
        </div>
      </header>

      <article class="sorter-card">
        <span class="sorter-card-tag">Carte ${String(index + 1).padStart(2, '0')}</span>
        <p class="sorter-card-text">${esc(card.text)}</p>
      </article>

      <div class="sorter-choices count-${choices.length}">${buttons}</div>
      ${hint ? `<p class="sorter-hint">${esc(hint)}</p>` : ''}
      <div class="sorter-foot">
        ${briefLink()}
        ${lock ? `<p class="sorter-lock">${icon('lock', { size: 15 })}<span>${esc(lock)}</span></p>` : ''}
      </div>
    </div>`;
  }

  /* ── L'écran « séquence » ───────────────────────────────────────────
   * Variante pour les exercices d'ordre : la carte est posée à gauche,
   * les positions s'empilent à droite. On choisit une place plutôt
   * qu'une catégorie, mais la mécanique reste la même.
   */
  function slotScreen(options) {
    const { cards, placement, eyebrow, title, intro, lock = '' } = options;
    const { esc, icon } = core();
    const index = Math.min(ex().cursor(), cards.length - 1);
    const card = cards[index];
    const list = placement.list();
    const done = placement.placedCount();

    /* Une position occupée montre la phrase qu'elle contient, et reste
     * cliquable : la choisir déplace l'ancienne carte. */
    const slots = cards.map((_, position) => {
      const holder = list.findIndex(value => String(value) === String(position + 1));
      const filled = holder !== -1;
      return `<button type="button" class="slot-row ${filled ? 'is-filled' : ''}"
        data-action="sort-card" data-zone="${position + 1}">
        <span class="slot-number">${String(position + 1).padStart(2, '0')}</span>
        <span class="slot-body">${filled
          ? esc(cards[holder].text)
          : `<span class="slot-empty">${icon('plus', { size: 15 })}<span>Placer ici</span></span>`}</span>
      </button>`;
    }).join('');

    return `<div class="sorter sequence">
      <header class="sorter-head sequence-head">
        <div>
          <p class="eyebrow">${esc(eyebrow)}</p>
          <h1>${esc(title)}</h1>
          ${intro ? `<p class="subtitle">${esc(intro)}</p>` : ''}
        </div>
        <p class="sequence-count">${done} / ${cards.length} phrases placées</p>
      </header>

      <div class="sequence-layout">
        <article class="sorter-card sequence-card">
          <span class="sorter-card-tag">Carte ${index + 1} / ${cards.length}</span>
          <p class="sorter-card-text">« ${esc(card.text)} »</p>
          <p class="sequence-hint">Choisissez sa place dans la séquence.</p>
        </article>
        <ol class="slot-list">${slots}</ol>
      </div>
      <div class="sorter-foot">${briefLink()}${lock ? `<p class="sorter-lock">${icon('lock', { size: 15 })}<span>${esc(lock)}</span></p>` : ''}</div>
    </div>`;
  }

  /* ── L'écran « récapitulatif » ──────────────────────────────────────
   * Affiché une fois toutes les cartes classées : on relit ses choix,
   * on en modifie un si besoin, puis on valide.
   */
  function recapScreen(options) {
    const { cards, choices, placement, title, intro, lock = '', submitLabel = 'Valider' } = options;
    const { esc, icon } = core();
    const list = placement.list();
    const label = id => (choices.find(choice => String(choice.id) === String(id)) || {}).label || '';

    const rows = cards.map((card, i) => `
      <li class="recap-row">
        <span class="recap-number">${String(i + 1).padStart(2, '0')}</span>
        <span class="recap-text">${esc(card.text)}</span>
        <span class="recap-choice">${esc(label(list[i]))}</span>
        <button type="button" class="text-button with-icon recap-edit" data-action="goto-card" data-index="${i}">
          ${icon('pencil', { size: 15 })}<span>Modifier</span>
        </button>
      </li>`).join('');

    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>${esc(title)}</h1>
        ${intro ? `<p class="subtitle">${esc(intro)}</p>` : ''}
      </header>
      <ol class="recap-list">${rows}</ol>
      <div class="recap-foot">
        ${briefLink()}
        ${lock ? `<p class="sorter-lock">${icon('lock', { size: 15 })}<span>${esc(lock)}</span></p>` : ''}
        <button type="submit" class="button primary">
          <span>${esc(submitLabel)}</span>${icon('arrowRight', { size: 18 })}
        </button>
      </div>
    </div>`;
  }

  /* ── Les branchements, communs aux quatre écrans ────────────────────
   * Classer une carte avance à la suivante non classée ; une fois tout
   * classé, on bascule sur le récapitulatif.
   */
  function wire(placement, cards) {
    core().$$('[data-action="sort-card"]').forEach(button => {
      button.addEventListener('click', () => {
        const index = Math.min(ex().cursor(), cards.length - 1);
        placement.place(index, button.dataset.zone);
        if (placement.isComplete()) ex().setValue('recap', true);
        core().persist();
        ex().render();
      });
    });

    core().$$('[data-action="goto-card"]').forEach(button => {
      button.addEventListener('click', () => {
        ex().setCursor(Number(button.dataset.index));
        ex().setValue('recap', false);
        core().persist();
        ex().render();
      });
    });
  }

  /* Le récapitulatif n'est montré qu'une fois tout classé, et tant qu'on
   * ne demande pas à revenir sur une carte. */
  const showingRecap = placement => placement.isComplete() && ex().value('recap') !== false;

  root.AtelierSorter = { cardScreen, slotScreen, recapScreen, wire, showingRecap };
})(globalThis);
