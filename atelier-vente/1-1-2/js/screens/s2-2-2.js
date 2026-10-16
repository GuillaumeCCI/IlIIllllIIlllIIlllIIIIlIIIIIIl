/* S2 2.2 · L'échelle de conviction.
 *
 * Cinq propositions à ranger sur une échelle, de 1 (moins convaincante) à
 * 5 (plus percutante). On glisse une proposition sur un échelon, ou on la
 * sélectionne d'un clic puis on clique l'échelon. Un échelon n'accueille
 * qu'une proposition : la précédente retourne dans la liste.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.2'];
  const cards = content.cards;
  const levels = [5, 4, 3, 2, 1];

  const ranks = () => kit.list('ranks', cards.length, null).map(v => (Number.isInteger(v) ? v : null));
  const selected = () => cards.findIndex(card => card.id === ex.value('selected'));
  const holder = level => ranks().indexOf(level);
  const placedCount = () => ranks().filter(Boolean).length;

  function place(index, level) {
    const list = ranks();
    const previous = list.indexOf(level);
    if (previous !== -1) list[previous] = null;
    list[index] = level;
    ex.setValue('ranks', list);
    ex.setValue('selected', '');
  }

  function propositions() {
    const list = ranks();
    const chosen = selected();
    return `<ul class="ladder-cards">${cards.map((card, i) => list[i] ? '' : `<li>
      <button type="button" class="ladder-card ${i === chosen ? 'is-selected' : ''}" draggable="true" data-drag="${i}" data-act="select" data-index="${i}" aria-pressed="${i === chosen}">
        <span class="ladder-letter">${card.id}</span><span class="ladder-text">« ${esc(card.text)} »</span><span class="ladder-grip">${icon('grip', { size: 22 })}</span>
      </button></li>`).join('') || '<li class="ladder-empty">Toutes les propositions sont placées.</li>'}</ul>`;
  }

  /* En relecture, chaque échelon dit si la proposition est à sa place, ou
   * à quelle position elle devrait aller. */
  const verdict = (ok, rank) => `<span class="ladder-verdict ${ok ? 'is-ok' : 'is-ko'}"><span class="ladder-verdict-icon">${icon(ok ? 'check' : 'close', { size: 15 })}</span><span>${ok ? 'Bien placé' : `À placer en position ${rank}`}</span></span>`;

  function ladder(review = false) {
    const list = ranks();
    return `<div class="ladder ${review ? 'is-review' : ''}">
      <p class="ladder-top">Plus percutante</p>
      <div class="ladder-rows">
        <span class="ladder-axis" aria-hidden="true"></span>
        ${levels.map(level => {
          const i = holder(level);
          const card = cards[i];
          if (review) {
            const expected = cards.find(c => c.rank === level);
            const ok = card && card.id === expected.id;
            return `<div class="ladder-row"><span class="ladder-n">${level}</span>
              <div class="ladder-slot is-filled ${ok ? 'is-ok' : 'is-ko'}"><span class="ladder-letter">${card ? card.id : '?'}</span><span class="ladder-text">${card ? `« ${esc(card.text)} »` : ''}</span>${verdict(ok, card ? card.rank : expected.rank)}</div></div>`;
          }
          return `<div class="ladder-row"><span class="ladder-n">${level}</span>
            <button type="button" class="ladder-slot ${card ? 'is-filled' : ''}" data-drop="${level}" data-act="slot" data-level="${level}" aria-label="Échelon ${level}${card ? ` : ${esc(card.text)}` : ', vide'}">
              ${card ? `<span class="ladder-letter">${card.id}</span><span class="ladder-text">« ${esc(card.text)} »</span><span class="ladder-remove">${icon('close', { size: 15 })}</span>` : '<span class="ladder-placeholder">Déposez une proposition</span>'}
            </button></div>`;
        }).join('')}
      </div>
      <p class="ladder-bottom">Moins convaincante</p>
    </div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const n = placedCount();
    const right = cards.filter((card, i) => ranks()[i] === card.rank).length;
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${n} / ${cards.length}</strong> classées</p>` })}
      <form class="k-panel" novalidate>
        ${reviewing ? `${kit.result(right, cards.length, 'propositions à leur place')}
          ${ladder(true)}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
        : `<div class="k-columns is-even ladder-layout">
            <section>
              <h2>Propositions à classer</h2>
              <p class="k-muted">Faites glisser chaque formulation vers l’échelle, ou cliquez-la puis cliquez un échelon.</p>
              ${propositions()}
            </section>
            <section class="ladder-side">
              <h2>Votre classement</h2>
              ${ladder()}
            </section>
          </div>
          ${core.errorsBox()}
          ${kit.bar({
            left: kit.reset(),
            center: `<span class="deck-dots" aria-hidden="true">${cards.map((_, i) => `<span class="deck-dot ${i < n ? 'is-filled' : ''}"></span>`).join('')}</span><span>${n} proposition${n > 1 ? 's' : ''} classée${n > 1 ? 's' : ''} sur ${cards.length}</span>`,
            right: `${kit.dialogButton('hint', 'Voir un indice', 'secondary', '')}${kit.submit('Valider mon classement', n === cards.length ? '' : 'data-pending="true"')}`
          })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate() {
    const left = cards.length - placedCount();
    return left ? [{ key: 'ranks', message: `Placez encore ${kit.plural(left, 'proposition')} sur l’échelle.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    select: el => {
      const card = cards[Number(el.dataset.index)];
      ex.setValue('selected', ex.value('selected') === card.id ? '' : card.id);
      kit.commit();
    },
    slot: el => {
      const level = Number(el.dataset.level);
      const chosen = selected();
      if (chosen !== -1) place(chosen, level);
      else {
        // Sans sélection, cliquer un échelon occupé rend sa proposition.
        const i = holder(level);
        if (i === -1) { core.toast('Sélectionnez d’abord une proposition dans la liste.'); return; }
        const list = ranks();
        list[i] = null;
        ex.setValue('ranks', list);
      }
      kit.commit();
    }
  });
  kit.onDrop((id, level) => { place(Number(id), Number(level)); kit.commit(); });
  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  ex.mount('s2-2.2', { screen, validate, feedback, compactFeedback: true });
})();
