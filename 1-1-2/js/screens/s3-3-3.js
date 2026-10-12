/* S3 3.3 · Le bon argument au bon moment.
 *
 * Trois attentes du client, cinq arguments. Pour chaque attente, un seul
 * argument ; un argument retenu ne peut plus servir ; deux arguments sont
 * des intrus et resteront inutilisés.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.3'];
  const needs = content.needs;
  const options = content.options;
  const letters = 'abcde';

  const need = () => Math.min(Math.max(0, Number(ex.value('need')) || 0), needs.length - 1);
  const pick = i => { const v = ex.value(`pick${i}`); return v === '' ? null : Number(v); };
  const done = i => ex.value(`done${i}`) === true;
  const takenBy = option => needs.findIndex((_, i) => pick(i) === option);

  /* Mise en page « une réplique, puis les choix » : la parole du client
   * dans sa carte (portrait, puis la citation entre guillemets), puis les
   * arguments empilés pleine largeur, en lignes compactes : tout l'exercice
   * tient à l'écran. Un trait corail coiffe le titre, à la place du
   * surtitre. */
  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = need();
    const free = options.filter((_, o) => takenBy(o) === -1 || takenBy(o) === i).length;
    return `<div class="k-page say-page is-moment">
      ${kit.head({ title: content.title, subtitle: content.subtitle,
        aside: `<div class="say-progress"><span>Besoin ${i + 1} sur ${needs.length}</span><span class="say-dots">${needs.map((item, n) =>
          `<button type="button" class="say-dot ${n === i ? 'is-current' : done(n) ? 'is-done' : ''}" data-act="need" data-index="${n}" aria-label="Besoin ${n + 1} : ${esc(item.tab)}"></button>`).join('')}</span></div>` })}
      <form novalidate>
        <section class="say-card">
          <div class="say-who" aria-hidden="true">
            <svg class="say-spark" viewBox="0 0 40 40"><path d="M24 6l5 9M8 18l11 3M10 33l10-6"/></svg>
            <span class="say-avatar">${icon('user', { size: 50 })}</span>
          </div>
          <div class="say-said">
            <p class="say-label">Le client vous dit</p>
            <div class="say-quote"><span class="say-glyph" aria-hidden="true">“</span><blockquote>${esc(needs[i].quote)}</blockquote><span class="say-glyph is-closing" aria-hidden="true">”</span></div>
          </div>
        </section>
        <div class="say-choose"><h2>Quel argument répond le mieux ?</h2><span class="k-muted">${free} disponible${free > 1 ? 's' : ''} · 2 resteront inutilisés</span></div>
        <div class="say-options" role="radiogroup">${options.map((text, o) => {
          const owner = takenBy(o);
          const locked = owner !== -1 && owner !== i;
          return `<label class="say-option ${locked ? 'is-locked' : ''}">
            <input type="radio" class="sr-only" name="pick${i}" data-field="pick${i}" value="${o}" ${pick(i) === o ? 'checked' : ''} ${locked ? 'disabled' : ''}>
            <span class="say-radio"></span><span class="say-letter">${letters[o]}</span>
            <span class="say-option-copy"><strong>${esc(text)}</strong>${locked ? `<small>Déjà retenu pour « ${esc(needs[owner].tab)} »</small>` : ''}</span>
          </label>`;
        }).join('')}</div>
        ${core.errorsBox()}
        <div class="say-actions">
          ${i ? kit.act('need-prev', `${icon('arrowLeft', { size: 17 })}<span>Précédent</span>`, 'text-button with-icon say-back') : '<span></span>'}
          ${kit.submit(needs.every((_, n) => n === i || done(n)) ? 'Valider mes choix' : 'Valider ma réponse')}
        </div>
      </form>
    </div>`;
  }

  /* Relecture : par besoin, la parole du client, votre choix, le corrigé,
   * puis le verdict expliqué. */
  function reviewScreen() {
    const right = needs.filter((item, i) => pick(i) === item.answer).length;
    const label = o => (o === null ? 'aucun argument' : `${letters[o]} · ${options[o]}`);
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Vos arguments, besoin par besoin', subtitle: 'Pour chaque attente, votre choix puis l’argument attendu.' })}
      ${kit.result(right, needs.length, 'arguments bien placés')}
      <section class="k-panel cmp-list">${needs.map((item, i) => {
        const ok = pick(i) === item.answer;
        return `<div class="cmp-row">
          <span class="cmp-n">${i + 1}</span>
          <div class="cmp-body">
            <p class="cmp-quote"><span class="k-label">${esc(item.tab)}</span>“${esc(item.quote)}”</p>
            <p class="cmp-line"><span class="cmp-pill">${icon('user', { size: 18 })}<span>Votre choix</span></span><span>${esc(label(pick(i)))}</span></p>
            <p class="cmp-line is-model"><span class="cmp-pill">${icon('check', { size: 18 })}<span>Corrigé</span></span><span>${esc(label(item.answer))}</span></p>
            <div class="cmp-verdict ${ok ? 'is-ok' : 'is-ko'}">
              <span class="cmp-verdict-icon">${icon(ok ? 'check' : 'close', { size: 18 })}</span>
              <div><strong>${ok ? 'Bon choix' : 'Ce n’est pas l’argument le plus direct'}</strong>${ok ? '' : `<p>→ Attendu : ${esc(options[item.answer])}</p>`}<p class="cmp-why">${esc(item.why)}</p></div>
            </div>
          </div>
        </div>`;
      }).join('')}</section>
      ${ex.inlineNote(content.intruders, 'neutral')}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate() {
    const i = need();
    if (pick(i) === null) return [{ key: `pick${i}`, message: 'Sélectionnez un argument.' }];
    const missing = needs.findIndex((_, n) => n !== i && !done(n));
    return missing === -1 ? [] : [{ key: 'need', message: `Répondez aussi au besoin « ${needs[missing].tab} ».` }];
  }

  function intercept() {
    const i = need();
    if (pick(i) === null) return false;
    ex.setValue(`done${i}`, true);
    const next = needs.findIndex((_, n) => !done(n));
    if (next === -1) return false;
    ex.setValue('need', next);
    return true;
  }

  function feedback() {
    const right = needs.filter((item, i) => pick(i) === item.answer).length;
    return [`${right} besoin${right > 1 ? 's' : ''} sur ${needs.length} servi${right > 1 ? 's' : ''} par l’argument attendu.`];
  }

  kit.on({
    need: el => { ex.setValue('need', Number(el.dataset.index)); kit.commit(); },
    'need-prev': () => { ex.setValue('need', Math.max(0, need() - 1)); kit.commit(); }
  });
  kit.dialogs({ rules: { title: 'Les règles', html: `<ul class="dialog-list">${content.rules.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` } });

  ex.mount('s3-3.3', { screen, validate, intercept, feedback, compactFeedback: true });
})();
