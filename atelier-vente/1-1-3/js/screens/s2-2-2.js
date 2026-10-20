/* S2 2.2 · À chaque erreur sa conséquence.
 *
 * Cinq maladresses à gauche, cinq conséquences à droite. On sélectionne une
 * erreur, puis la conséquence correspondante ; on peut aussi glisser
 * l'erreur sur sa conséquence. Une conséquence ne sert qu'une fois : la
 * réattribuer libère l'erreur qui la portait.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.2'];
  const errors = content.errors;
  const consequences = content.consequences;
  const letters = 'abcde';

  const links = () => kit.list('links', errors.length, null).map(v => (Number.isInteger(v) ? v : null));
  const count = () => links().filter(v => v !== null).length;
  const selected = () => {
    const n = Number(ex.value('selected'));
    return Number.isInteger(n) && n >= 0 && n < errors.length && ex.value('selected') !== '' ? n : null;
  };
  const owner = c => links().indexOf(c);

  function link(error, consequence) {
    const list = links();
    const previous = list.indexOf(consequence);
    if (previous !== -1) list[previous] = null;
    list[error] = consequence;
    ex.setValue('links', list);
    ex.setValue('selected', '');
  }

  function playBoard() {
    const list = links();
    const chosen = selected();
    return `<div class="pair-board">
      <section><h2>Les erreurs</h2>
        <ul class="pair-list">${errors.map((e, i) => `<li>
          <button type="button" class="pair-error ${i === chosen ? 'is-selected' : ''} ${list[i] !== null ? 'is-linked' : ''}" draggable="true" data-drag="${i}" data-act="error" data-index="${i}" aria-pressed="${i === chosen}">
            <span class="pair-letter">${letters[i]}</span><span class="pair-text">${esc(e.text)}</span>
            <span class="pair-mark">${list[i] !== null ? `<span class="pair-link">${list[i] + 1}</span>` : '<span class="pair-radio"></span>'}</span>
          </button></li>`).join('')}</ul>
      </section>
      <section><h2>Leurs conséquences</h2>
        <ul class="pair-list">${consequences.map((c, k) => `<li>
          <button type="button" class="pair-consequence ${owner(k) !== -1 ? 'is-linked' : ''}" data-drop="${k}" data-act="consequence" data-index="${k}">
            <span class="pair-number">${k + 1}</span><span class="pair-text">${esc(c)}</span>
            ${owner(k) !== -1 ? `<span class="pair-link">${letters[owner(k)]}</span>` : ''}
          </button></li>`).join('')}</ul>
      </section>
    </div>`;
  }

  function reviewBoard() {
    const list = links();
    const right = errors.filter((e, i) => list[i] === e.answer).length;
    return `${kit.result(right, errors.length, 'associations justes')}
      <ol class="pair-review">${errors.map((e, i) => {
        const ok = list[i] === e.answer;
        return `<li class="${ok ? 'is-ok' : 'is-ko'}">
          <span class="pair-letter">${letters[i]}</span>
          <span class="pair-review-text"><strong>${esc(e.text)}</strong><span>${icon('arrowRight', { size: 16 })} ${esc(consequences[e.answer])}</span></span>
          ${kit.mark(ok, ok ? 'Correct' : `Vous : ${list[i] === null ? 'rien' : list[i] + 1}`)}
        </li>`;
      }).join('')}</ol>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const n = count();
    return `<div class="k-page pair-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${n} / ${errors.length}</strong> associations</p>${reviewing ? '' : kit.tourButton()}` })}
      ${reviewing ? '' : kit.help(content.instruction)}
      <form class="k-panel" novalidate>
        ${reviewing ? `${reviewBoard()}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>` : `${playBoard()}${core.errorsBox()}${kit.bar({
          left: kit.reset(),
          center: `${n} sur ${errors.length} associations créées`,
          right: kit.submit('Vérifier mes associations', n === errors.length ? '' : 'data-pending="true"')
        })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate() {
    const left = errors.length - count();
    return left ? [{ key: 'links', message: `Associez encore ${kit.plural(left, 'erreur')} à sa conséquence.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    error: el => {
      const i = Number(el.dataset.index);
      ex.setValue('selected', selected() === i ? '' : i);
      kit.commit();
    },
    consequence: el => {
      const k = Number(el.dataset.index);
      const chosen = selected();
      if (chosen !== null) link(chosen, k);
      else if (owner(k) !== -1) {
        // Sans erreur sélectionnée, cliquer une conséquence liée la libère.
        const list = links();
        list[owner(k)] = null;
        ex.setValue('links', list);
      } else { core.toast('Sélectionnez d’abord une erreur dans la colonne de gauche.'); return; }
      kit.commit();
    }
  });
  kit.onDrop((id, k) => { link(Number(id), Number(k)); kit.commit(); });

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.2', [
    { target: '.pair-board', title: 'Relier les deux colonnes',
      items: [
        { key: 'a', tone: 'blue', text: 'Cliquez sur une erreur, à gauche.' },
        { key: '1', tone: 'green', text: 'Puis cliquez sur sa conséquence, à droite.' }
      ],
      after: 'Le numéro de la conséquence s’affiche à côté de l’erreur.' },
    { target: '.pair-page .k-bar', title: 'Vérifier', text: 'Les 5 erreurs reliées, vérifiez vos associations pour voir le corrigé.' }
  ]);

  ex.mount('s2-2.2', { screen, validate, feedback, compactFeedback: true });
})();
