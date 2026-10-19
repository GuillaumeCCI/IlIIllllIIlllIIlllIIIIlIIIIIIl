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
        aside: reviewing ? '' : `<p class="k-count spot-count" data-live="counter">${counter()}</p>${kit.tourButton()}` })}
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
      ${reviewing ? `${kit.corrige({ title: 'Les 4 erreurs à repérer', items: content.errors,
        note: 'Comparez : chacune de vos lignes correspond-elle à l’une de ces erreurs ? L’ordre n’a pas d’importance.' })}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>` : kit.utility('Les 4 erreurs attendues après validation')}
    </div>`;
  }

  function reviewBody() {
    return `<h2>Vos repérages</h2>
      <ol class="spot-own">${content.errors.map((_, i) => `<li>${esc(ex.value(`spot${i}`))}</li>`).join('')}</ol>`;
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

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.4', [
    { target: '.spot-call', title: 'L’appel', text: 'Lisez cet appel de prospection du début à la fin. Le commercial y commet quatre maladresses.' },
    { target: '.spot-inputs', title: 'Vos 4 repérages',
      items: [
        { symbol: 'pencil', tone: 'blue', text: 'Notez une erreur précise par ligne, en quelques mots.' },
        { symbol: 'info', tone: 'blue', text: 'L’ordre n’a pas d’importance.' }
      ] },
    { target: '.spot-count', title: 'Votre avancement', text: 'Chaque ligne remplie allume une pastille. Il en faut quatre.' },
    { target: '.spot-actions', title: 'Indice et vérification',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: 'Un doute ? « Voir un indice » vous oriente.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Une fois vos quatre lignes écrites, vérifiez vos repérages pour découvrir le corrigé.' }
      ] }
  ]);

  ex.mount('s2-2.4', { screen, validate, feedback, compactFeedback: true });
})();
