/* S4 3.1 · À faire ou à éviter ? Défi express.
 *
 * Six comportements, une carte à la fois : on clique « À faire » ou « À ne
 * pas faire », et la suivante apparaît d'elle-même. La carte ne se glisse pas.
 * Même mécanique de paquet que S2 2.1 : voyez kit.deck*.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S4['3.1'];
  const cards = content.cards;
  const zones = content.zones;
  const total = cards.length;

  /* Au-dessus de la carte, calé sur son bord droit : le nombre de cartes
   * restantes. */
  function progress() {
    const done = kit.deckPlaced(total).filter(Boolean).length;
    return `<div class="express-progress"><span class="express-left">${kit.plural(total - done - 1, 'carte restante', 'cartes restantes')}</span></div>`;
  }

  function playScreen(index) {
    const history = ex.value('history');
    return `${progress()}<article class="express-card">
        <span class="express-tag">Carte ${String(index + 1).padStart(2, '0')}</span>
        <div class="express-body"><span class="express-symbol">${icon('document', { size: 44 })}</span>
          <div><p class="express-text">“${esc(cards[index].text)}”</p><p class="express-question">Cette pratique renforce-t-elle la persuasion ?</p></div>
        </div>
      </article>
      <div class="express-zones">${zones.map(z => `<button type="button" class="express-zone tone-${z.tone}" data-act="place" data-zone="${z.id}">
        <span class="express-zone-symbol">${icon(z.tone === 'good' ? 'check' : 'close', { size: 30 })}</span><span class="express-zone-words"><strong>${esc(z.label)}</strong><span>${esc(z.sub)}</span></span><span class="express-go">${icon('chevronRight', { size: 22 })}</span>
      </button>`).join('')}</div>
      <div class="express-actions">${kit.act('deck-undo', `${icon('arrowLeft', { size: 17 })}<span>Annuler le dernier choix</span>`, 'text-button with-icon express-undo', Array.isArray(history) && history.length ? '' : 'disabled')}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const index = kit.deckCurrent(total);
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    return `<div class="k-page express-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle })}
      <form novalidate class="${!reviewing && index !== null ? 'express-play' : ''}">
        ${reviewing ? `<section class="k-panel">${kit.result(right, total, 'cartes bien classées')}${kit.deckReview(cards, zones)}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div></section>`
          : index === null ? `<section class="k-panel"><h2>Relisez votre classement</h2><p class="k-muted">Modifiez une carte si besoin, puis validez.</p>${kit.deckRecap(cards, zones, 'Valider mon classement')}${core.errorsBox()}</section>`
          : playScreen(index)}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 6 cartes')}
    </div>`;
  }

  function validate() {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    return left ? [{ key: 'placed', message: `Il reste ${kit.plural(left, 'carte')} à classer.` }] : [];
  }

  function feedback() {
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    return [`${right} carte${right > 1 ? 's' : ''} sur ${total} correctement classée${right > 1 ? 's' : ''}.`];
  }

  kit.on({
    place: el => { kit.deckPlace(total, el.dataset.zone); kit.commit(); },
    'deck-undo': () => { kit.deckUndo(total); kit.commit(); },
    'deck-reopen': el => { kit.deckReopen(total, Number(el.dataset.index)); kit.commit(); }
  });

  ex.mount('s4-3.1', { screen, validate, feedback, compactFeedback: true });
})();
