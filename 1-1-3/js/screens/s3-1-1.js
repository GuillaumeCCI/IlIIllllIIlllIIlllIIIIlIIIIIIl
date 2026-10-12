/* S3 1.1 · Dans le bon ordre.
 *
 * Six cartes à placer sur les six cases d'un parcours, du départ à
 * l'arrivée. On sélectionne une carte puis une case, ou on glisse la carte.
 * Une case occupée cliquée sans carte sélectionnée rend sa carte ; déposer
 * une carte sur une case occupée renvoie l'ancienne dans la réserve.
 * « Débloquer la méthode » valide et révèle le nom de chaque étape.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['1.1'];
  const method = window.ATELIER_METHOD;
  const cards = content.cards;
  const SLOTS = method.length;

  const slots = () => kit.list('slots', SLOTS, null).map(id => (cards.some(c => c.id === id) ? id : null));
  const placed = () => slots().filter(Boolean).length;
  const cardOf = id => cards.find(c => c.id === id);
  const selected = () => (cards.some(c => c.id === ex.value('selected')) ? ex.value('selected') : '');

  function put(id, slot) {
    const list = slots();
    const from = list.indexOf(id);
    if (from !== -1) list[from] = null;
    list[slot] = id;
    ex.setValue('slots', list);
    ex.setValue('selected', '');
  }

  function path(review = false) {
    const list = slots();
    return `<ol class="path-track">
      <li class="path-end"><span>Départ</span></li>
      ${list.map((id, i) => {
        const card = cardOf(id);
        if (review) {
          const expected = cards.find(c => c.step === i);
          const ok = id === expected.id;
          return `<li class="path-stop ${i % 2 ? 'is-low' : ''}"><span class="path-n">${i + 1}</span>
            <div class="path-slot is-filled ${ok ? 'is-ok' : 'is-ko'}"><span class="path-letter">${esc(id || '?')}</span><strong>${esc(method[i].name)}</strong>${kit.mark(ok, ok ? 'Bien placée' : `Attendu : ${expected.id}`)}</div></li>`;
        }
        return `<li class="path-stop ${i % 2 ? 'is-low' : ''}"><span class="path-n">${i + 1}</span>
          <button type="button" class="path-slot ${card ? 'is-filled' : ''}" data-drop="${i}" data-act="slot" data-slot="${i}" aria-label="Case ${i + 1}${card ? ` : carte ${card.id}` : ', vide'}"
            ${card ? `draggable="true" data-drag="${card.id}"` : ''}>
            ${card ? `<span class="path-letter">${card.id}</span><span class="path-mini">${esc(card.text)}</span>` : '<span class="path-empty" aria-hidden="true"></span>'}
          </button></li>`;
      }).join('')}
      <li class="path-end is-arrival"><span>Arrivée</span></li>
    </ol>`;
  }

  function hand() {
    const list = slots();
    return `<div class="path-hand">${cards.map(card => list.includes(card.id)
      ? `<span class="path-card is-placed"><span class="path-letter">${card.id}</span><span>Placée en case ${list.indexOf(card.id) + 1}</span></span>`
      : `<button type="button" class="path-card ${selected() === card.id ? 'is-selected' : ''}" draggable="true" data-drag="${card.id}" data-act="pick" data-card="${card.id}" aria-pressed="${selected() === card.id}">
          <span class="path-letter">${card.id}</span><span class="path-text">${esc(card.text)}</span><span class="path-grip">${icon('grip', { size: 20 })}</span>
        </button>`).join('')}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const n = placed();
    const right = slots().filter((id, i) => cardOf(id) && cardOf(id).step === i).length;
    return `<div class="k-page path-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count path-count"><strong>${n} / ${SLOTS}</strong> coups placés</p>` })}
      <form novalidate class="path-form">
        <section class="path-board">
          <h2>${esc(content.pathTitle)}</h2>
          ${reviewing ? kit.result(right, SLOTS, 'cartes à la bonne place') : ''}
          ${path(reviewing)}
          <p class="k-muted path-note">${reviewing ? `La méthode : ${method.map(s => esc(s.name)).join(' · ')}.` : 'Placez une carte sur chaque case. Vous pouvez les déplacer pour changer l’ordre.'}</p>
        </section>
        ${reviewing ? `<section class="k-panel"><h2>Le rôle de chaque étape</h2><ol class="path-roles">${method.map((s, i) => `<li><strong>${i + 1} · ${esc(s.name)}</strong><span>${esc(s.role)}</span><em>Carte ${cards.find(c => c.step === i).id}</em></li>`).join('')}</ol></section>
          ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
        : `<section class="k-panel path-cards"><h2>Vos cartes</h2>${hand()}</section>
          ${core.errorsBox()}
          ${kit.bar({
            left: kit.reset(),
            center: 'Sélectionnez une carte, puis une case, ou glissez-la.',
            right: kit.submit('Débloquer la méthode', n === SLOTS ? '' : 'data-pending="true"')
          })}`}
      </form>
      ${reviewing ? '' : kit.utility('Les noms des étapes après validation')}
    </div>`;
  }

  function validate() {
    const left = SLOTS - placed();
    return left ? [{ key: 'slots', message: `Placez encore ${kit.plural(left, 'carte')} sur le parcours.` }] : [];
  }

  function feedback() {
    const right = slots().filter((id, i) => cardOf(id) && cardOf(id).step === i).length;
    return [`${right} carte${right > 1 ? 's' : ''} sur ${SLOTS} à la bonne place.`];
  }

  kit.on({
    pick: el => { ex.setValue('selected', selected() === el.dataset.card ? '' : el.dataset.card); kit.commit(); },
    slot: el => {
      const slot = Number(el.dataset.slot);
      if (selected()) put(selected(), slot);
      else if (slots()[slot]) { const list = slots(); list[slot] = null; ex.setValue('slots', list); }
      else { core.toast('Sélectionnez d’abord une carte dans « Vos cartes ».'); return; }
      kit.commit();
    }
  });
  kit.onDrop((id, slot) => { put(id, Number(slot)); kit.commit(); });

  ex.mount('s3-1.1', { screen, validate, feedback, compactFeedback: true });
})();
