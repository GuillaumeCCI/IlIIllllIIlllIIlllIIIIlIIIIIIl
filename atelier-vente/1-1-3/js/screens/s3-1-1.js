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
          // La case nomme son étape, puis dit où va vraiment la carte posée là.
          const home = card ? method[card.step].name : '';
          return `<li class="path-stop ${i % 2 ? 'is-low' : ''}"><span class="path-n">${i + 1}</span>
            <button type="button" class="path-slot is-filled ${ok ? 'is-ok' : 'is-ko'} ${detail === i ? 'is-detail' : ''}" data-act="detail" data-index="${i}"><strong>${esc(method[i].name)}</strong>
              <span class="path-verdict">${icon(ok ? 'check' : 'close', { size: 15, strokeWidth: 3 })}<span>${ok ? 'Bien placée' : `Sa bonne étape :<b>${esc(home)}</b>`}</span></span></button></li>`;
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

  /* Le détail d'une étape, après validation : la carte posée et la carte
   * attendue, côte à côte. Non enregistré : s'ouvre sur la première erreur. */
  let detail = null;
  const firstWrong = () => { const i = slots().findIndex((id, k) => !cardOf(id) || cardOf(id).step !== k); return i === -1 ? 0 : i; };
  const cardBox = card => card ? `<div class="path-detail-card"><span class="path-letter">${esc(card.id)}</span><p>${esc(card.text)}</p></div>` : '<div class="path-detail-card"><p>Aucune carte.</p></div>';

  function details() {
    if (detail === null) detail = firstWrong();
    const i = detail;
    const mine = cardOf(slots()[i]);
    const expected = cards.find(c => c.step === i);
    const ok = mine && mine.id === expected.id;
    return `<section class="k-panel path-detail">
      <nav class="path-detail-nav" aria-label="Les étapes"><h2>Détail des étapes</h2>
        <ol>${method.map((step, k) => {
          const good = cardOf(slots()[k]) && cardOf(slots()[k]).step === k;
          return `<li><button type="button" class="${k === i ? 'is-current' : ''} ${good ? 'is-ok' : 'is-ko'}" data-act="detail" data-index="${k}" aria-current="${k === i}"><span>${k + 1} · ${esc(step.name)}</span>${icon(k === i ? 'arrowRight' : good ? 'check' : 'close', { size: 16 })}</button></li>`;
        }).join('')}</ol>
      </nav>
      <div class="path-detail-body">
        <p class="path-detail-pos">Étape ${i + 1} sur ${SLOTS}</p>
        <h3>${i + 1} · ${esc(method[i].name)}</h3>
        <p class="path-detail-role">${esc(method[i].role)}</p>
        <div class="path-detail-pair ${ok ? 'is-single' : ''}">
          <div class="path-detail-box ${ok ? 'is-ok' : 'is-ko'}">
            <p class="path-detail-title">${icon(ok ? 'check' : 'close', { size: 18, strokeWidth: 3 })}<span><strong>Votre choix</strong>${ok ? 'C’est la bonne carte pour cette étape.' : `Vous avez placé cette carte en ${i + 1}<sup>${i ? 'e' : 're'}</sup> position.`}</span></p>
            ${cardBox(mine)}
          </div>
          ${ok ? '' : `<div class="path-detail-box is-ok">
            <p class="path-detail-title">${icon('check', { size: 18, strokeWidth: 3 })}<span><strong>Carte attendue</strong>À cette étape, la carte attendue est :</span></p>
            ${cardBox(expected)}
          </div>`}
        </div>
      </div>
    </section>`;
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
      ${kit.head({ eyebrow: content.eyebrow, title: content.title,
        subtitle: reviewing ? `${right} carte${right > 1 ? 's' : ''} sur ${SLOTS} à la bonne place. Voici votre parcours et les réponses attendues.` : content.subtitle,
        aside: `<p class="k-count path-count"><strong>${n} / ${SLOTS}</strong> coups placés</p>` })}
      <form novalidate class="path-form">
        <section class="path-board">
          <h2>${esc(content.pathTitle)}</h2>
          ${path(reviewing)}
          ${reviewing ? '' : '<p class="k-muted path-note">Placez une carte sur chaque case. Vous pouvez les déplacer pour changer l’ordre.</p>'}
        </section>
        ${reviewing ? `${details()}
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
    detail: el => { detail = Number(el.dataset.index); ex.rebuild(); },
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
