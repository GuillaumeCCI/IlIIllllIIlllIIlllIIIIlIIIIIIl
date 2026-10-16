/* S2 2.1 · Mythe ou méthode ?
 *
 * Huit affirmations, une à la fois. On glisse la carte vers « Mythe » ou
 * « Méthode », ou on clique la zone. « Passer » remet la carte à plus tard,
 * « Annuler le dernier choix » revient en arrière. Une fois tout classé, un
 * récapitulatif permet de relire avant de valider.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.1'];
  const cards = content.cards;
  const zones = content.zones;
  const total = cards.length;

  function zone(z) {
    return `<button type="button" class="myth-zone tone-${z.tone}" data-drop="${z.id}" data-act="place" data-zone="${z.id}">
      <span class="myth-zone-inner">${z.image ? `<img class="myth-zone-art" src="${esc(core.webAsset(z.image))}" alt="" decoding="async">` : icon(z.symbol, { size: 40 })}<strong>${esc(z.label)}</strong><span>${esc(z.sub)}</span></span>
    </button>`;
  }

  function sortScreen(index) {
    const done = kit.deckPlaced(total).filter(Boolean).length;
    const history = ex.value('history');
    return `<div class="myth-board">
      <div class="myth-left">
        <p class="k-label">Affirmation ${index + 1}</p>
        <h2 class="myth-title">À vous de trancher</h2>
        <div class="myth-row">
          <article class="myth-card" draggable="true" data-drag="${index}" tabindex="0" aria-label="Affirmation à classer : ${esc(cards[index].text)}">
            <span class="myth-grip">${icon('grip', { size: 26 })}</span>
            <p class="myth-text">« ${esc(cards[index].text)} »</p>
            <p class="k-muted">Maintenez la carte et déplacez-la vers la droite, ou cliquez une catégorie.</p>
          </article>
          <span class="myth-arrow">${icon('arrowRight', { size: 34 })}<span>Glisser</span></span>
        </div>
      </div>
      <div class="myth-right">
        <h2>Classez l’affirmation</h2>
        ${zones.map(zone).join('')}
      </div>
    </div>
    ${kit.bar({
      left: kit.act('deck-undo', `${icon('arrowLeft', { size: 17 })}<span>Annuler le dernier choix</span>`, 'secondary with-icon', Array.isArray(history) && history.length ? '' : 'disabled'),
      right: kit.act('deck-skip', `<span>Passer</span>${icon('arrowRight', { size: 18 })}`, 'primary with-icon myth-skip', total - done > 1 ? '' : 'disabled')
    })}`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const index = kit.deckCurrent(total);
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    const body = reviewing
      ? `${kit.result(right, total, 'affirmations bien classées')}${kit.deckReview(cards, zones)}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
      : index === null
        ? `<h2>Relisez votre classement</h2><p class="k-muted">Cliquez sur une ligne pour la modifier, puis validez.</p>${kit.deckRecap(cards, zones, 'Valider mon classement')}`
        : sortScreen(index);
    /* Pendant le tri (maquette) : pas de panneau autour, le compteur et
     * des points en haut à droite. */
    const sorting = !reviewing && index !== null;
    return `<div class="k-page myth-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<div class="myth-progress"><p class="k-count"><strong>${placed.filter(Boolean).length} / ${total}</strong> classées</p>${sorting ? `<span class="k-dots">${cards.map((_, n) => `<span class="k-dot ${n === index ? 'is-current' : placed[n] ? 'is-done' : ''}"></span>`).join('')}</span>` : ''}</div>` })}
      <form class="${sorting ? 'myth-stage' : 'k-panel'}" novalidate>${body}${reviewing ? '' : core.errorsBox()}</form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 8 affirmations')}
    </div>`;
  }

  function validate() {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    return left ? [{ key: 'placed', message: `Il reste ${kit.plural(left, 'affirmation')} à classer.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    place: el => { kit.deckPlace(total, el.dataset.zone); kit.commit(); },
    'deck-undo': () => { kit.deckUndo(total); kit.commit(); },
    'deck-skip': () => { kit.deckSkip(total); kit.commit(); },
    'deck-reopen': el => { kit.deckReopen(total, Number(el.dataset.index)); kit.commit(); }
  });
  kit.onDrop((id, zone) => { kit.deckPlace(total, zone); kit.commit(); });

  ex.mount('s2-2.1', { screen, validate, feedback, compactFeedback: true });
})();
