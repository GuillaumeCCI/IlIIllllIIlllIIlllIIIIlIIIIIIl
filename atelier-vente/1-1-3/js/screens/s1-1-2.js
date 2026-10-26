/* S1 1.2 · À chaque étape, son rôle.
 *
 * Six rôles, un à la fois, et les six verbes de la méthode. Un clic sur un
 * verbe l'associe au rôle affiché, puis le rôle suivant apparaît. Un verbe
 * ne sert qu'une fois : le choisir à nouveau le retire du rôle précédent.
 * Les pastilles de l'en-tête permettent de revenir sur un rôle.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.2'];
  const method = window.ATELIER_METHOD;
  const roles = content.roles;
  const letters = 'abcdef';

  const pick = i => ex.value(`pick${i}`) || '';
  const count = () => roles.filter((_, i) => pick(i)).length;
  const verb = id => method.find(step => step.id === id) || {};
  const letterOf = id => letters[method.findIndex(step => step.id === id)] || '';
  const current = () => {
    const asked = Number(ex.value('role'));
    if (Number.isInteger(asked) && asked >= 0 && asked < roles.length) return asked;
    const free = roles.findIndex((_, i) => !pick(i));
    return free === -1 ? 0 : free;
  };

  function dots(at) {
    return `<span class="role-dots">${roles.map((_, i) => `<button type="button" class="role-dot ${i === at ? 'is-current' : pick(i) ? 'is-filled' : ''}" data-act="role" data-index="${i}" aria-label="Rôle ${i + 1}${pick(i) ? ` : ${verb(pick(i)).name}` : ''}"></button>`).join('')}</span>`;
  }

  function choose(id) {
    const at = current();
    roles.forEach((_, i) => { if (i !== at && pick(i) === id) ex.setValue(`pick${i}`, ''); });
    ex.setValue(`pick${at}`, id);
    // Le rôle suivant sans réponse, en partant du rôle courant.
    for (let step = 1; step <= roles.length; step++) {
      const next = (at + step) % roles.length;
      if (!pick(next)) { ex.setValue('role', next); return; }
    }
    ex.setValue('role', at);
  }

  function playScreen() {
    const at = current();
    return `<p class="k-band role-band"><span class="k-band-symbol">${icon('info', { size: 22 })}</span><span>${esc(content.instruction)}</span></p>
      <div class="k-columns role-layout">
        <section class="k-panel role-card">
          <span class="role-pill">Rôle ${at + 1} / ${roles.length}</span>
          <p class="role-lead">${esc(content.lead)}</p>
          <div class="role-body">
            <span class="role-symbol">${icon('document', { size: 44 })}</span>
            <p class="role-text">“ ${esc(roles[at].text)} ”</p>
          </div>
          <p class="role-question">${esc(content.question)}</p>
        </section>
        <section class="k-panel role-verbs">
          <h2>Choisissez l’étape</h2>
          <div class="role-grid">${method.map((step, i) => {
            const owner = roles.findIndex((_, r) => pick(r) === step.id);
            const state = owner === at ? 'is-chosen' : owner !== -1 ? 'is-used' : '';
            return `<button type="button" class="role-verb ${state}" data-act="verb" data-verb="${step.id}" aria-pressed="${owner === at}">
              <span class="role-letter">${letters[i]}</span><img class="role-art" src="${esc(core.webAsset(`assets/illustrations/s1/role-${letters[i]}.webp`))}" alt="" decoding="async"><span class="role-name">${esc(step.name)}</span>
              ${owner !== -1 && owner !== at ? `<small>rôle ${owner + 1}</small>` : ''}
            </button>`;
          }).join('')}</div>
          <p class="k-muted role-note">Un verbe ne peut être utilisé qu’une seule fois.</p>
        </section>
      </div>`;
  }

  function reviewScreen() {
    const right = roles.filter((role, i) => pick(i) === role.answer).length;
    return `${kit.result(right, roles.length, 'rôles bien associés')}
      <ol class="role-review">${roles.map((role, i) => {
        const ok = pick(i) === role.answer;
        return `<li class="${ok ? 'is-ok' : 'is-ko'}">
          <span class="role-letter">${letterOf(role.answer)}</span>
          <span class="role-review-text"><strong>${esc(verb(role.answer).name)}</strong><span>${esc(role.text)}</span></span>
          ${kit.mark(ok, ok ? 'Correct' : `Vous : ${verb(pick(i)).name || 'rien'}`)}
        </li>`;
      }).join('')}</ol>
      <p class="role-order">${icon('list', { size: 18 })}<span>Dans l’échange, l’ordre est : ${method.map(step => esc(step.name)).join(' · ')}.</span></p>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const n = count();
    return `<div class="k-page role-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? '' : `<span class="tour-pair">${kit.contextButton()}${kit.tourButton()}</span><p class="k-count">Rôle <strong>${current() + 1} sur ${roles.length}</strong></p>${dots(current())}` })}
      <form novalidate>
        ${reviewing ? reviewScreen() : `${playScreen()}${core.errorsBox()}${kit.bar({
          left: kit.reset(),
          center: n === roles.length ? 'Tous les rôles sont associés.' : 'Choisissez une étape pour continuer.',
          right: `<span class="k-count"><strong>${n} / ${roles.length}</strong> associations</span>${kit.submit('Valider mes associations', n === roles.length ? '' : 'data-pending="true"')}`
        })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 6 rôles')}
    </div>`;
  }

  function validate() {
    const left = roles.length - count();
    return left ? [{ key: 'pick', message: `Associez encore ${kit.plural(left, 'rôle')} à une étape.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    verb: el => { choose(el.dataset.verb); kit.commit(); },
    role: el => { ex.setValue('role', Number(el.dataset.index)); kit.commit(); }
  });

  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  kit.context([
    ['list', 'La méthode', 'Six étapes pour traiter une objection, chacune désignée par un verbe.'],
    ['target', 'Un rôle', 'Ce que fait une étape dans l’échange avec le client.'],
    ['pencil', 'Ce qui vous est demandé', 'Pour chacun des 6 rôles, retrouver l’étape qui lui correspond.']
  ], 'À chaque étape, son rôle');

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s1-1.2', [
    { target: '.role-body', title: 'Le rôle', text: 'Lisez ce que fait cette étape.' },
    { target: '.role-grid', title: 'Les 6 étapes', text: 'Cliquez sur l’étape qui a ce rôle.',
      after: 'Le rôle suivant apparaît aussitôt. Chaque étape ne sert qu’une fois.' },
    { target: '.role-dots', title: 'Six rôles', text: 'Chaque point est un rôle. Cliquez dessus pour y revenir.' },
    { target: '.role-page .k-bar .k-submit', title: 'Valider', text: 'Les 6 rôles associés, validez pour voir le corrigé.' }
  ]);

  ex.mount('s1-1.2', { screen, validate, feedback, compactFeedback: true });
})();
