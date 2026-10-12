/* S2 2.4 · Repérer les erreurs de prospection.
 *
 * Un appel de prospection à lire, quatre maladresses à nommer, une par
 * ligne. Les pastilles de l'en-tête se remplissent au fil des repérages.
 * En relecture : les repérages de l'apprenant, puis les quatre erreurs
 * attendues, expliquées.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.4'];
  const total = content.errors.length;
  const exercise = () => ex.current;

  const found = () => content.errors.filter((_, i) => kit.filled(ex.value(`spot${i}`))).length;
  const counter = () => `<span>${found()} / ${total} erreurs repérées</span><span class="spot-dots">${content.errors.map((_, i) =>
    `<span class="spot-dot ${kit.filled(ex.value(`spot${i}`)) ? 'is-on' : ''}"></span>`).join('')}</span>`;

  function transcript() {
    const who = { client: { label: 'Client', symbol: 'users' }, seller: { label: 'Commercial', symbol: 'headset' } };
    return `<section class="k-panel spot-call">
      <header class="spot-call-head">
        ${exercise().image ? `<img class="spot-thumb" src="${esc(core.webAsset(exercise().image))}" alt="${esc(exercise().alt)}" decoding="async">` : ''}
        <span class="spot-phone">${icon('phone', { size: 26 })}</span>
        <div><p class="spot-call-title">${esc(content.call)}</p><p class="k-muted">${esc(content.sector)}</p></div>
      </header>
      <ol class="spot-lines">${content.lines.map(line => `<li class="spot-line is-${line.who}">
        <span class="spot-avatar">${icon(who[line.who].symbol, { size: 26 })}<small>${who[line.who].label}</small></span>
        <p>« ${esc(line.text)} »</p>
      </li>`).join('')}</ol>
    </section>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page spot-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? '' : `<p class="k-count spot-count" data-live="counter">${counter()}</p>` })}
      <div class="k-columns is-even spot-layout">
        ${transcript()}
        <form class="k-panel spot-form" novalidate>
          ${reviewing ? reviewBody() : `<h2>Vos ${total} repérages</h2>
            <p class="k-muted">Notez une erreur précise par ligne.</p>
            <ol class="spot-inputs">${content.errors.map((_, i) => `<li><span class="spot-n">${i + 1}</span>
              <label class="sr-only" for="field-spot${i}">Erreur repérée ${i + 1}</label>
              <textarea id="field-spot${i}" data-field="spot${i}" rows="2" maxlength="240" placeholder="Erreur repérée…">${esc(ex.value(`spot${i}`))}</textarea></li>`).join('')}</ol>
            ${core.errorsBox()}
            <div class="spot-actions">${kit.dialogButton('hint', 'Voir un indice', 'text-button', 'lightbulb')}<span class="k-muted">Vous pourrez reformuler avant de valider.</span>${kit.submit('Vérifier mes repérages', found() === total ? '' : 'data-pending="true"')}</div>`}
        </form>
      </div>
      ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>` : kit.utility('Les 4 erreurs attendues après validation')}
    </div>`;
  }

  function reviewBody() {
    return `<h2>Vos repérages</h2>
      <ol class="spot-own">${content.errors.map((_, i) => `<li>${esc(ex.value(`spot${i}`))}</li>`).join('')}</ol>
      <h2 class="spot-expected-title">Les 4 erreurs à repérer</h2>
      <ol class="spot-expected">${content.errors.map(e => `<li><strong>${esc(e.title)}</strong><span>${esc(e.text)}</span></li>`).join('')}</ol>
      ${ex.inlineNote('Comparez : chacune de vos lignes correspond-elle à l’une de ces erreurs ? L’ordre n’a pas d’importance.', 'neutral')}`;
  }

  function validate(values) {
    const missing = content.errors.map((_, i) => i).filter(i => !kit.filled(values[`spot${i}`]));
    return missing.length ? [{ key: `spot${missing[0]}`, message: `Notez les ${total} erreurs (${missing.length} ligne${missing.length > 1 ? 's' : ''} vide${missing.length > 1 ? 's' : ''}).` }] : [];
  }

  const feedback = () => ['Comparez vos repérages aux quatre erreurs du corrigé.'];

  kit.live(() => {
    const submit = core.$('.spot-actions .k-submit');
    if (submit) submit.dataset.pending = found() === total ? 'false' : 'true';
    return { counter: counter() };
  });
  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  ex.mount('s2-2.4', { screen, validate, feedback, compactFeedback: true });
})();
