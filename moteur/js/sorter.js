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
   *   ask                             la question en bandeau bleu nuit, face aux réponses (texte, ou fonction (carte, i))
   *   lock                            ce que la validation débloquera (dit en petit sur la carte)
   *   quote    { who, text }          une parole, dans une bulle sous le titre
   * Repris le 19/11 : plus de compteur ni de lignes d'aide isolées ;
   * l'avancement (« Carte 1 sur 6 » et ses pastilles) est sur la carte.
   */
  function cardScreen(options) {
    const { cards, choices, placement, eyebrow, title, intro, hint = '', lock = '', ask = '', quote = null } = options;
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

    /* Une réponse qui ne sert qu'une fois (placement « unique ») et déjà
     * donnée à une autre carte le dit (19/11 : on était renvoyé sur une carte
     * sans savoir pourquoi). */
    const ownerOf = id => (placement.unique ? placement.list().findIndex((zone, i) => i !== index && String(zone) === String(id)) : -1);
    const buttons = choices.map(choice => {
      const owner = ownerOf(choice.id);
      return `
      <button type="button" class="sorter-choice tone-${choice.tone || 'neutral'} ${String(chosen) === String(choice.id) ? 'is-chosen' : ''} ${owner >= 0 ? 'is-used' : ''}"
        data-action="sort-card" data-zone="${esc(String(choice.id))}">
        ${choice.symbol ? `<span class="sorter-choice-symbol">${icon(choice.symbol, { size: 22 })}</span>` : ''}
        <span class="sorter-choice-label">${esc(choice.label)}${owner >= 0 ? `<small>Déjà choisie pour la carte ${owner + 1}</small>` : ''}</span>
      </button>`;
    }).join('');

    void done; void hint;
    return `<div class="sorter is-card-screen">
      <header class="sorter-head">
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        ${intro ? `<p class="subtitle">${esc(intro)}</p>` : ''}
        ${quote ? `<blockquote class="sorter-quote"><span class="sorter-quote-who">${esc(quote.who || 'Le client vous dit')}</span>« ${esc(quote.text)} »</blockquote>` : ''}
      </header>

      <article class="sorter-card">
        <div class="sorter-card-top">
          <span class="sorter-card-tag">Carte ${index + 1} sur ${cards.length}</span>
          <span class="sorter-dots">${dots}</span>
        </div>
        <p class="sorter-card-text">${esc(card.text)}</p>
        ${lock ? `<p class="sorter-card-lock">${icon('lock', { size: 13 })}<span>${esc(lock)}</span></p>` : ''}
      </article>

      ${ask ? `<p class="k-ask">${esc(typeof ask === 'function' ? ask(card, index) : ask)}</p>` : ''}
      <div class="sorter-choices count-${choices.length}">${buttons}</div>
      ${briefLink() ? `<div class="sorter-foot">${briefLink()}</div>` : ''}
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
  /* LE FONDU ENCHAÎNÉ entre deux cartes (validé en 1-2-1, 18/11 ; demandé
   * ici le 19/11) : une copie exacte de l'écran se pose par-dessus, l'écran
   * suivant se dessine dessous (les parties identiques au pixel près), la
   * copie s'efface (0,45 s), puis le contenu de la nouvelle carte apparaît
   * (0,6 s). Aucun mouvement, aucun flash. */
  function crossfade(draw) {
    const main = document.querySelector('#main');
    const still = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!main || still || typeof main.cloneNode !== 'function' || !root.requestAnimationFrame) { draw(); return; }
    const ghost = main.cloneNode(true);
    ghost.setAttribute('aria-hidden', 'true');
    ghost.inert = true;
    Object.assign(ghost.style, { position: 'absolute', left: `${main.offsetLeft}px`, top: `${main.offsetTop}px`,
      width: `${main.offsetWidth}px`, height: `${main.offsetHeight}px`, margin: '0', boxSizing: 'border-box', pointerEvents: 'none', zIndex: '40' });
    main.after(ghost);
    setTimeout(() => ghost.remove(), 700);
    draw();
    document.querySelector('#main .sorter-card')?.classList.add('is-arriving');
    requestAnimationFrame(() => {
      ghost.style.transition = 'opacity .45s ease-in-out';
      ghost.style.opacity = '0';
    });
  }

  function wire(placement, cards) {
    core().$$('[data-action="sort-card"]').forEach(button => {
      button.addEventListener('click', () => {
        const index = Math.min(ex().cursor(), cards.length - 1);
        const zone = button.dataset.zone;
        const owner = placement.unique ? placement.list().findIndex((z, i) => i !== index && String(z) === String(zone)) : -1;
        placement.place(index, zone);
        if (owner >= 0) {
          const label = button.querySelector('.sorter-choice-label')?.firstChild?.textContent?.trim() || 'Cette réponse';
          core().toast(`« ${label} » était sur la carte ${owner + 1} : cette carte est à reclasser.`);
        }
        if (placement.isComplete()) ex().setValue('recap', true);
        core().persist();
        crossfade(() => ex().render());
      });
    });

    core().$$('[data-action="goto-card"]').forEach(button => {
      button.addEventListener('click', () => {
        ex().setCursor(Number(button.dataset.index));
        ex().setValue('recap', false);
        core().persist();
        crossfade(() => ex().render());
      });
    });
  }

  /* Le récapitulatif n'est montré qu'une fois tout classé, et tant qu'on
   * ne demande pas à revenir sur une carte. */
  const showingRecap = placement => placement.isComplete() && ex().value('recap') !== false;

  root.AtelierSorter = { cardScreen, slotScreen, recapScreen, wire, showingRecap };
})(globalThis);
