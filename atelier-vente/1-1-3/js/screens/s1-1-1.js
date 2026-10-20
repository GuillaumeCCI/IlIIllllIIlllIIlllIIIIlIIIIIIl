/* S1 1.1 · Bon réflexe ou à éviter ?
 *
 * Huit attitudes du commercial, une à la fois. Un clic sur « À éviter » ou
 * « Bon réflexe » classe la situation et fait apparaître la suivante. Une
 * fois tout classé, un
 * récapitulatif permet de relire avant de valider.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.1'];
  const cards = content.cards;
  const zones = content.zones;
  const total = cards.length;

  function sortScreen(index) {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    const history = ex.value('history');
    return `<div class="xp-board">
      <div class="xp-top">
        <span class="xp-left">${kit.plural(left - 1, 'restante', 'restantes')}</span>
      </div>
      <div class="xp-stack">
        <article class="xp-card" tabindex="0" aria-label="Situation ${index + 1} : ${esc(cards[index].text)}">
          <span class="xp-tag">Situation ${String(index + 1).padStart(2, '0')}</span>
          <div class="xp-card-body">
            <span class="xp-symbol">${icon('chat', { size: 42 })}</span>
            <div class="xp-card-words"><p class="xp-text">« ${esc(cards[index].text)} »</p><p class="xp-question">${esc(content.question)}</p></div>
          </div>
        </article>
      </div>
      <div class="xp-answers">${zones.map(z => `
        <button type="button" class="xp-answer tone-${z.tone}" data-drop="${z.id}" data-act="place" data-zone="${z.id}">
          <span class="xp-answer-symbol">${icon(z.symbol, { size: 32 })}</span>
          <span class="xp-answer-words"><strong>${esc(z.label)}</strong><small>${esc(z.sub)}</small></span>
          <span class="xp-answer-go" aria-hidden="true">${icon('chevronRight', { size: 22 })}</span>
        </button>`).join('')}</div>
    </div>
    ${kit.bar({
      left: kit.act('deck-undo', `${icon('undo', { size: 17 })}<span>Revenir à la précédente</span>`, 'secondary', Array.isArray(history) && history.length ? '' : 'disabled'),
      right: kit.act('deck-skip', `<span>Passer</span>${icon('chevronRight', { size: 18 })}`, 'secondary', left > 1 ? '' : 'disabled')
    })}`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const index = kit.deckCurrent(total);
    const placed = kit.deckPlaced(total);
    const done = placed.filter(Boolean).length;
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    const body = reviewing
      ? `${kit.result(right, total, 'comportements bien classés')}${kit.deckReview(cards, zones)}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
      : index === null
        ? `<h2>Relisez votre classement</h2><p class="k-muted">Cliquez sur une ligne pour la modifier, puis validez.</p>${kit.deckRecap(cards, zones, 'Valider mon classement')}`
        : sortScreen(index);
    /* Pendant le tri, l'écran suit la maquette : ni compteur, ni bandeau
     * de consigne, ni panneau blanc. La carte et les deux réponses se
     * posent directement sur le fond ; la frise dit où l'on en est. */
    const sorting = !reviewing && index !== null;
    return `<div class="k-page xp-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: sorting ? '' : `<p class="k-count"><strong>${done} / ${total}</strong> comportements classés</p>` })}
      <form class="k-panel ${sorting ? 'xp-bare' : ''}" novalidate>${body}${reviewing ? '' : core.errorsBox()}</form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 8 situations')}
    </div>`;
  }

  function validate() {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    return left ? [{ key: 'placed', message: `Il reste ${kit.plural(left, 'situation')} à classer.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    place: el => { kit.deckPlace(total, el.dataset.zone); kit.commit(); },
    'deck-undo': () => { kit.deckUndo(total); kit.commit(); },
    'deck-skip': () => { kit.deckSkip(total); kit.commit(); },
    'deck-reopen': el => { kit.deckReopen(total, Number(el.dataset.index)); kit.commit(); }
  });

  ex.mount('s1-1.1', { screen, validate, feedback, compactFeedback: true });
})();
