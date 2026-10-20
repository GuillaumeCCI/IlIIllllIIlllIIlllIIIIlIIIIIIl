/* S3 3.2 · Action → Réaction.
 *
 * Six comportements numérotés, six réactions de client. On glisse chaque
 * pastille vers la réaction qu'elle provoque, on clique la pastille puis
 * l'emplacement « N° », ou on tape le numéro dans l'emplacement. Un numéro
 * ne sert qu'une fois : le reposer ailleurs le retire de son ancien
 * emplacement. Un numéro déjà posé se glisse vers un autre emplacement :
 * les deux échangent leur place.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.2'];
  const behaviours = content.behaviours;
  const reactions = content.reactions;
  const letters = 'abcdef';

  const matches = () => kit.list('match', reactions.length, null).map(v => (Number.isInteger(v) ? v : null));
  const picked = () => (Number.isInteger(ex.value('picked')) ? ex.value('picked') : null);
  const count = () => matches().filter(Boolean).length;

  function place(number, slot) {
    const list = matches().map(v => (v === number ? null : v));
    list[slot] = number;
    ex.setValue('match', list);
    ex.setValue('picked', null);
  }

  function screen() {
    const reviewing = ex.reviewing();
    const list = matches();
    const chosen = picked();
    const right = reactions.filter((r, i) => list[i] === r.answer).length;
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, note: content.note,
        aside: `<p class="k-count"><strong>${count()} / ${reactions.length}</strong> associations</p>${reviewing ? '' : kit.tourButton()}` })}
      ${reviewing ? kit.result(right, reactions.length, 'associations justes') : ''}
      <form class="k-columns is-even" novalidate>
        <section class="k-panel">
          <h2 class="ar-title">Comportements du commercial</h2>
          <p class="k-muted">${reviewing ? 'Les six comportements.' : 'Faites glisser les pastilles numérotées.'}</p>
          <ol class="ar-list">${behaviours.map((text, i) => {
            const n = i + 1;
            const used = list.includes(n);
            return `<li class="ar-row">
              ${reviewing ? '' : `<span class="ar-grip">${icon('grip', { size: 22 })}</span>`}
              ${reviewing ? `<span class="ar-pill">${n}</span>` : `<button type="button" class="ar-pill ${used ? 'is-used' : ''} ${chosen === n ? 'is-picked' : ''}" draggable="true" data-drag="${n}" data-act="pick" data-number="${n}" aria-pressed="${chosen === n}" aria-label="Pastille ${n}${used ? ', déjà placée' : ''}">${n}</button>`}
              <span>${esc(text)}</span>
            </li>`;
          }).join('')}</ol>
        </section>
        <section class="k-panel">
          <h2 class="ar-title">Réactions probables du client</h2>
          <p class="k-muted">${reviewing ? 'Le numéro attendu, et l’explication.' : 'Déposez ou tapez un numéro dans chaque emplacement.'}</p>
          <ol class="ar-list">${reactions.map((reaction, i) => {
            const value = list[i];
            if (reviewing) {
              const ok = value === reaction.answer;
              return `<li class="ar-row ${ok ? 'is-ok' : 'is-ko'}"><span class="ar-letter">${letters[i]}</span><span><strong class="ar-reaction">${esc(reaction.text)}</strong><small class="k-why">${esc(behaviours[reaction.answer - 1])}${reaction.why ? ` ${esc(reaction.why)}` : ''}</small></span><span class="ar-expected ${ok ? 'is-ok' : 'is-ko'}" title="${ok ? 'Votre réponse est juste' : `Vous aviez mis : ${value ?? 'rien'}`}">N° attendu : ${reaction.answer}</span></li>`;
            }
            return `<li class="ar-row"><span class="ar-letter">${letters[i]}</span><span>${esc(reaction.text)}</span>
              <input type="text" class="ar-slot ${value ? 'is-filled' : ''}" inputmode="numeric" maxlength="1" autocomplete="off" placeholder="N°" value="${value || ''}"${value ? ` draggable="true" data-lift data-drag="slot${i}"` : ''} data-drop="${i}" data-act="slot" data-index="${i}" aria-label="Réaction ${letters[i]} : numéro du comportement, de 1 à ${behaviours.length}">
            </li>`;
          }).join('')}</ol>
        </section>
        <div class="ar-actions">
          ${reviewing ? `${content.takeaway ? ex.inlineNote(content.takeaway, 'neutral') : ''}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
            : `${core.errorsBox()}${kit.bar({ left: kit.reset(), center: kit.dialogButton('rule', 'Voir la consigne', 'secondary', ''), right: kit.submit('Valider mes associations', count() === reactions.length ? '' : 'data-pending="true"') })}`}
        </div>
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate() {
    const left = reactions.length - count();
    return left ? [{ key: 'match', message: `Associez encore ${kit.plural(left, 'réaction')}.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    pick: el => { const n = Number(el.dataset.number); ex.setValue('picked', picked() === n ? null : n); kit.commit(); },
    slot: el => {
      const slot = Number(el.dataset.index);
      const n = picked();
      // Sans pastille choisie, le clic sert juste à placer le curseur pour taper.
      if (n === null) return;
      place(n, slot);
      kit.commit();
    }
  });

  /* La saisie au clavier dans un emplacement : un chiffre de 1 à 6 y place
   * ce numéro, un champ vidé libère l'emplacement. Le curseur passe ensuite
   * au prochain emplacement vide. */
  function focusSlot(index) {
    const slots = [...document.querySelectorAll('input.ar-slot')];
    const next = slots.slice(index + 1).concat(slots.slice(0, index + 1)).find(input => !input.value) || slots[index];
    if (next) next.focus();
  }
  document.addEventListener('input', event => {
    const input = event.target.closest && event.target.closest('input.ar-slot');
    if (!input) return;
    const slot = Number(input.dataset.index);
    const raw = input.value.trim();
    if (!raw) { const list = matches(); list[slot] = null; ex.setValue('match', list); kit.commit(); focusSlot(slot - 1); return; }
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1 || n > behaviours.length) {
      input.value = matches()[slot] || '';
      core.toast(`Tapez un numéro de 1 à ${behaviours.length}.`);
      return;
    }
    place(n, slot);
    kit.commit();
    focusSlot(slot);
  });
  // Entrée dans un emplacement ne doit pas valider tout l'exercice.
  document.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.closest && event.target.closest('input.ar-slot')) event.preventDefault();
  });
  /* Dépôt : une pastille (« 3 ») se pose ; un numéro déjà posé (« slot2 »)
   * glissé sur un autre emplacement échange sa place avec lui. */
  kit.onDrop((id, slot) => {
    const to = Number(slot);
    if (String(id).startsWith('slot')) {
      const from = Number(String(id).slice(4));
      if (from === to) return;
      const list = matches();
      [list[from], list[to]] = [list[to], list[from]];
      ex.setValue('match', list);
    } else place(Number(id), to);
    kit.commit();
  });
  kit.dialogs({ rule: { title: 'La consigne', html: `<p>${esc(content.subtitle)}</p><p>${esc(content.note)}</p><p>${esc(content.rule)}</p>` } });

  // Visite guidée de l'écran, lancée d'elle-même la première fois. L'aperçu
  // montre, sur un exemple, comment poser un numéro dans un emplacement.
  kit.tour('s3-3.2', [
    { target: '.k-columns > .k-panel:first-child', title: 'Les comportements', text: 'Chaque comportement du commercial porte un numéro, de 1 à 6.' },
    { target: '.k-columns > .k-panel:nth-child(2)', title: 'Les réactions du client', text: 'Posez le bon numéro dans la case « N° » de chaque réaction. Un exemple :',
      preview: kit.dragDemo({
        pills: [{ label: '1', text: 'Parler trop vite.' }, { label: '2', text: 'Sourire au téléphone.' }],
        slots: [{ key: 'a', text: 'Le client se sent bien accueilli.' }, { key: 'b', text: 'Le client ne suit plus.' }],
        moves: [[1, 0], [0, 1]]
      }),
      items: [
        { symbol: 'grip', tone: 'blue', text: 'Faites glisser une pastille numérotée dans la case.' },
        { symbol: 'pointer', tone: 'blue', text: 'Ou cliquez sur la pastille, puis sur la case.' },
        { symbol: 'keyboard', tone: 'gold', text: 'Vous pouvez aussi taper le numéro dans la case.' }
      ],
      after: 'Chaque numéro ne sert qu’une fois.' },
    { target: '.k-page .k-bar', title: 'Valider',
      items: [
        { symbol: 'document', tone: 'blue', text: '« Voir la consigne » la rappelle.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Les 6 cases remplies, validez pour voir le corrigé.' }
      ] }
  ]);

  ex.mount('s3-3.2', { screen, validate, feedback, compactFeedback: true });
})();
