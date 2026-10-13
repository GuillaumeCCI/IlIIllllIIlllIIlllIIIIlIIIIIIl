/* S3 2.1 · À chaque objection, sa nature.
 *
 * Six réactions, une à la fois, à ranger dans l'un des quatre dossiers.
 * On choisit un dossier, puis « Classer et passer à la suivante » ; glisser
 * la carte sur un dossier la classe directement. Une fois tout rangé, un
 * récapitulatif permet de relire avant de valider.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['2.1'];
  const cards = content.reactions;
  const zones = window.ATELIER_NATURES.map(n => ({ id: n.id, label: n.label, text: n.text, tone: 'neutral' }));
  const total = cards.length;
  const letters = 'abcdef';

  const pick = () => (zones.some(z => z.id === ex.value('pick')) ? ex.value('pick') : '');

  /* Classer ; la dernière réaction classée valide l'exercice et ouvre le
   * corrigé, sans écran de relecture. */
  function classify(zone) {
    kit.deckPlace(total, zone);
    ex.setValue('pick', '');
    kit.commit();
    if (kit.deckCurrent(total) === null) ex.submit();
  }

  function sortScreen(index) {
    return `<div class="nat-stack">
      <article class="nat-card" draggable="true" data-drag="${index}" tabindex="0" aria-label="Réaction ${index + 1} : ${esc(cards[index].text)}">
        <p class="nat-position">Réaction ${index + 1} / ${total}</p>
        <div class="nat-card-body"><span class="nat-letter">${letters[index]}</span><p class="nat-text">« ${esc(cards[index].text)} »</p></div>
      </article>
    </div>
    <p class="nat-instruction">${esc(content.instruction)}</p>
    <div class="nat-zones" role="radiogroup" aria-label="Les quatre natures">${zones.map(z => `
      <button type="button" class="nat-zone ${pick() === z.id ? 'is-chosen' : ''}" role="radio" aria-checked="${pick() === z.id}" data-drop="${z.id}" data-act="pick" data-zone="${z.id}">
        <span class="nat-folder"><img src="${esc(core.asset(`assets/illustrations/s3/nature-${z.id}.webp`))}" alt="" decoding="async">${pick() === z.id ? `<span class="nat-chosen">${icon('check', { size: 16, strokeWidth: 3 })}</span>` : ''}</span>
        <span><strong>${esc(z.label)}</strong><small>${esc(z.text)}</small></span>
      </button>`).join('')}</div>
    ${kit.bar({
      right: `${kit.act('deck-undo', `${icon('undo', { size: 17 })}<span>Annuler</span>`, 'secondary', Array.isArray(ex.value('history')) && ex.value('history').length ? '' : 'disabled')}${kit.act('classify', `<span>Classer et passer à la suivante</span>${icon('arrowRight', { size: 18 })}`, 'primary', pick() ? '' : 'disabled')}`
    })}`;
  }

  /* Le corrigé, d'après la maquette : une ligne par réaction (numéro
   * teinté, citation et explication), votre case cochée ou barrée, et la
   * case attendue quand elle diffère. Propre à cet exercice : kit.deckReview
   * sert aux autres. */
  const ROW_TONES = ['blue', 'coral', 'green'];
  const ZONE_TONES = { pretexte: 'green', fondee: 'blue', malentendu: 'violet', reassurance: 'coral' };

  function zonePill(id, mark = '') {
    const zone = zones.find(z => z.id === id) || {};
    return `<span class="nat-pill tone-${ZONE_TONES[zone.id] || 'blue'}">${zone.id ? `<img src="${esc(core.asset(`assets/illustrations/s3/nature-${zone.id}.webp`))}" alt="">` : ''}<span>${esc(zone.label || 'Non classée')}</span>${mark}</span>`;
  }

  function reviewScreen() {
    const placed = kit.deckPlaced(total);
    return `<img class="nat-signpost" src="${esc(core.asset('assets/illustrations/s3/nature-panneau.webp'))}" alt="" decoding="async">
      <ol class="nat-recap">${cards.map((card, i) => {
        const ok = placed[i] === card.answer;
        return `<li class="tone-${ROW_TONES[i % ROW_TONES.length]} ${ok ? 'is-ok' : 'is-ko'}">
          <span class="nat-recap-n">${String(i + 1).padStart(2, '0')}</span>
          <span class="nat-recap-text"><strong>« ${esc(card.text)} »</strong>${card.why ? `<small>${esc(card.why)}</small>` : ''}</span>
          <span class="nat-recap-zones">
            ${zonePill(placed[i], `<span class="nat-mark" aria-label="${ok ? 'correct' : 'incorrect'}">${icon(ok ? 'check' : 'close', { size: 13, strokeWidth: 3 })}</span>`)}
            ${ok ? '' : `<span class="nat-expected">Attendu : ${zonePill(card.answer)}</span>`}
          </span>
        </li>`;
      }).join('')}</ol>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const index = kit.deckCurrent(total);
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    // Tout classé mais pas encore validé (brouillon d'avant) : un bouton suffit.
    const body = reviewing
      ? reviewScreen()
      : index === null
        ? `<p class="nat-instruction">Toutes les réactions sont classées.</p><div class="nat-recap-actions">${kit.submit('Voir le corrigé')}</div>`
        : sortScreen(index);
    return `<div class="k-page nat-page ${reviewing ? 'is-recap' : ''}">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title,
        subtitle: reviewing ? `${right} réaction${right > 1 ? 's' : ''} sur ${total} bien classée${right > 1 ? 's' : ''}. Voici le corrigé.` : content.subtitle,
        aside: reviewing || index === null ? '' : kit.deckDots(total, index) })}
      <form class="nat-form" novalidate>${body}${reviewing ? '' : core.errorsBox()}</form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 6 réactions')}
    </div>`;
  }

  function validate() {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    return left ? [{ key: 'placed', message: `Il reste ${kit.plural(left, 'réaction')} à classer.` }] : [];
  }

  function feedback() {
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    return [`${right} réaction${right > 1 ? 's' : ''} sur ${total} correctement classée${right > 1 ? 's' : ''}.`];
  }

  kit.on({
    pick: el => { ex.setValue('pick', el.dataset.zone); kit.commit(); },
    classify: () => { if (pick()) classify(pick()); },
    'deck-undo': () => { kit.deckUndo(total); ex.setValue('pick', ''); kit.commit(); }
  });
  kit.onDrop((id, zone) => classify(zone));

  ex.mount('s3-2.1', { screen, validate, feedback, compactFeedback: true });
})();
