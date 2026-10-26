/* S2 2.3 · Le studio d'accroches.
 *
 * Trois accroches de natures différentes pour la même prospecte : une
 * question, un chiffre-choc, un bénéfice projeté. Les onglets permettent
 * de revenir sur une accroche ; « Voir un exemple » propose un modèle.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.3'];
  const hooks = content.hooks;

  const current = () => Math.min(Math.max(0, Number(ex.value('hook')) || 0), hooks.length - 1);
  const filled = i => kit.filled(ex.value(`hook${i}`));

  function prospect() {
    const exercise = ex.current;
    return `<aside class="k-panel studio-prospect">
      <p class="k-label">Votre prospect</p>
      ${exercise.image ? `<figure class="studio-picture"><img src="${esc(core.webAsset(exercise.image))}" alt="${esc(exercise.alt)}" decoding="async"></figure>` : ''}
      <h2>${esc(content.prospect.name)}</h2>
      <p class="studio-software">Logiciel envisagé : ${esc(content.prospect.software)}</p>
      <p><strong>Son problème :</strong> ${esc(content.prospect.problem)}</p>
    </aside>`;
  }

  function tabs(at) {
    return `<div class="studio-tabs" role="tablist">${hooks.map((hook, i) =>
      `<button type="button" role="tab" class="studio-tab ${i === at ? 'is-active' : ''} ${filled(i) ? 'is-done' : ''}" data-act="hook" data-index="${i}" aria-selected="${i === at}">
        <span class="studio-tab-n">${filled(i) && i !== at ? icon('check', { size: 16 }) : i + 1}</span><span class="studio-tab-text">${esc(hook.tab)}<small>${esc(hook.title)}</small></span>
      </button>`).join('')}</div>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const at = current();
    const hook = hooks[at];
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count">Accroche <strong>${at + 1} sur ${hooks.length}</strong></p>${kit.tourButton()}` })}
      <div class="k-columns studio-layout">
        ${prospect()}
        <form class="k-panel" novalidate>
          ${tabs(at)}
          <p class="k-label studio-kind">Accroche ${at + 1} · ${esc(hook.tab)}</p>
          <h2 class="studio-title">${esc(hook.title)}</h2>
          <p class="k-instruction">${esc(hook.prompt)}</p>
          ${ex.field(`hook${at}`, hook.title, { placeholder: hook.placeholder, max: 160, rows: 5, hideLabel: true })}
          ${core.errorsBox()}
          ${kit.bar({ left: kit.reset(), right: `${kit.dialogButton('example', 'Voir un exemple', 'secondary', '')}${kit.submit(hooks.every((_, i) => i === at || filled(i)) ? 'Valider mes 3 accroches' : hook.next)}` })}
        </form>
      </div>
      ${kit.utility('Exemples comparés à la validation')}
    </div>`;
  }

  function reviewScreen() {
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Vos trois accroches', subtitle: 'Relisez chacune au regard des trois critères : courte, concrète, centrée sur le client.' })}
      <div class="studio-review">${hooks.map((hook, i) => `<section class="k-panel">
        <p class="k-label">Accroche ${i + 1} · ${esc(hook.tab)}</p>
        ${kit.yours('Votre accroche', ex.value(`hook${i}`))}
        ${kit.model('Un exemple', hook.example)}
      </section>`).join('')}</div>
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate() {
    const at = current();
    if (!filled(at)) return [{ key: `hook${at}`, message: `Rédigez votre accroche « ${hooks[at].tab} ».` }];
    const missing = hooks.findIndex((_, i) => !filled(i));
    return missing === -1 ? [] : [{ key: 'hook', message: `Rédigez aussi l’accroche « ${hooks[missing].tab} ».` }];
  }

  function intercept() {
    const at = current();
    if (!filled(at)) return false;
    const next = hooks.findIndex((_, i) => !filled(i));
    if (next === -1) return false;
    ex.setValue('hook', next);
    return true;
  }

  const feedback = () => ['Vos trois accroches sont enregistrées. Comparez-les aux exemples du corrigé.'];

  kit.on({ hook: el => { ex.setValue('hook', Number(el.dataset.index)); kit.commit(); } });
  kit.dialogs({ example: () => ({ title: `Un exemple · ${hooks[current()].tab}`, html: `<p>« ${esc(hooks[current()].example)} »</p><p class="k-muted">Un exemple parmi d’autres : écrivez votre propre version.</p>` }) });

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.3', [
    { target: '.studio-prospect', title: 'Votre prospect', text: 'Vos accroches s’adressent à elle : lisez qui elle est et son problème.' },
    { target: '.studio-tabs', title: 'Trois accroches', text: 'Une par onglet, chacune d’une nature différente.' },
    { target: '.studio-layout textarea', title: 'Votre accroche', text: 'Une bonne accroche est :',
      items: [
        { symbol: 'check', tone: 'green', text: 'courte : une ou deux phrases ;' },
        { symbol: 'check', tone: 'green', text: 'concrète : un fait, un chiffre, une situation ;' },
        { symbol: 'check', tone: 'green', text: 'centrée sur le client : elle parle de ses besoins.' }
      ] },
    { target: '.k-page .k-bar [data-dialog="example"]', title: 'Un exemple', text: 'Vous bloquez ? Voyez un modèle, puis écrivez votre version.' },
    { target: '.k-page .k-bar .k-submit', title: 'Continuer', text: 'Ce bouton passe à l’accroche suivante.',
      after: 'Après la 3e, vous comparez vos accroches aux exemples.' }
  ]);

  ex.mount('s2-2.3', { screen, validate, intercept, feedback, compactFeedback: true });
})();
