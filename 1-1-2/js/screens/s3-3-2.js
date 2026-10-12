/* S3 3.2 · Action → Réaction.
 *
 * Six comportements numérotés, six réactions de client. On glisse chaque
 * pastille vers la réaction qu'elle provoque, ou on clique la pastille puis
 * l'emplacement « N° ». Un numéro ne sert qu'une fois : le reposer ailleurs
 * le retire de son ancien emplacement.
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
        aside: `<p class="k-count"><strong>${count()} / ${reactions.length}</strong> associations</p>` })}
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
          <p class="k-muted">${reviewing ? 'Le numéro attendu, et l’explication.' : 'Déposez un numéro dans chaque emplacement.'}</p>
          <ol class="ar-list">${reactions.map((reaction, i) => {
            const value = list[i];
            if (reviewing) {
              const ok = value === reaction.answer;
              return `<li class="ar-row ${ok ? 'is-ok' : 'is-ko'}"><span class="ar-letter">${letters[i]}</span><span><strong class="ar-reaction">${esc(reaction.text)}</strong><small class="k-why">${esc(behaviours[reaction.answer - 1])}${reaction.why ? ` ${esc(reaction.why)}` : ''}</small></span><span class="ar-expected ${ok ? 'is-ok' : 'is-ko'}" title="${ok ? 'Votre réponse est juste' : `Vous aviez mis : ${value ?? 'rien'}`}">N° attendu : ${reaction.answer}</span></li>`;
            }
            return `<li class="ar-row"><span class="ar-letter">${letters[i]}</span><span>${esc(reaction.text)}</span>
              <button type="button" class="ar-slot ${value ? 'is-filled' : ''}" data-drop="${i}" data-act="slot" data-index="${i}" aria-label="Réaction ${letters[i]}${value ? `, numéro ${value}` : ', vide'}">${value || 'N°'}</button>
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

  function feedback() {
    const right = reactions.filter((r, i) => matches()[i] === r.answer).length;
    return [`${right} association${right > 1 ? 's' : ''} juste${right > 1 ? 's' : ''} sur ${reactions.length}.`];
  }

  kit.on({
    pick: el => { const n = Number(el.dataset.number); ex.setValue('picked', picked() === n ? null : n); kit.commit(); },
    slot: el => {
      const slot = Number(el.dataset.index);
      const n = picked();
      if (n !== null) place(n, slot);
      else if (matches()[slot]) { const list = matches(); list[slot] = null; ex.setValue('match', list); }
      else { core.toast('Cliquez d’abord une pastille numérotée.'); return; }
      kit.commit();
    }
  });
  kit.onDrop((id, slot) => { place(Number(id), Number(slot)); kit.commit(); });
  kit.dialogs({ rule: { title: 'La consigne', html: `<p>${esc(content.subtitle)}</p><p>${esc(content.note)}</p><p>${esc(content.rule)}</p>` } });

  ex.mount('s3-3.2', { screen, validate, feedback, compactFeedback: true });
})();
