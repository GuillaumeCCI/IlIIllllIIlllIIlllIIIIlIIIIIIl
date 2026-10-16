/* S3 3.1 · Repérez l'intrus.
 *
 * Trois séries de trois affirmations : deux bonnes pratiques, une erreur.
 * Pour chaque série, on sélectionne l'affirmation fausse, puis on explique
 * pourquoi elle pénalise l'échange. Le corrigé suit la troisième série.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.1'];
  const series = content.series;
  const letters = ['A', 'B', 'C'];

  const serie = () => Math.min(Math.max(0, Number(ex.value('serie')) || 0), series.length - 1);
  const choice = i => { const v = ex.value(`wrong${i}`); return v === '' ? null : Number(v); };
  const done = i => ex.value(`done${i}`) === true;

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = serie();
    const s = series[i];
    /* Les séries en onglets texte, soulignés quand ils sont actifs, en haut
     * à droite de la carte de la série. */
    const tabs = `<div class="verdict-tabs" role="tablist">${series.map((_, n) => `${n ? '<span class="verdict-tab-line" aria-hidden="true"></span>' : ''}<button type="button" role="tab" class="verdict-tab ${n === i ? 'is-active' : ''} ${done(n) ? 'is-done' : ''}" data-act="serie" data-index="${n}" aria-selected="${n === i}">${done(n) ? icon('check', { size: 14 }) : ''}Série ${letters[n]}</button>`).join('')}</div>`;
    return `<div class="k-page verdict-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle })}
      <form class="k-columns is-wide-left verdict-layout" novalidate>
        <section class="k-panel">
          <div class="verdict-head"><h2>Série ${letters[i]}</h2>${tabs}</div>
          <p class="k-instruction">Cliquez sur l’affirmation qui vous semble fausse.</p>
          <div class="verdict-items" role="radiogroup">${s.items.map((text, n) => `
            <label class="verdict-item">
              <input type="radio" name="wrong${i}" data-field="wrong${i}" value="${n}" ${choice(i) === n ? 'checked' : ''}>
              <span class="verdict-n">${n + 1}.</span><span>${esc(text)}</span>
            </label>`).join('')}</div>
        </section>
        <section class="k-panel verdict-side">
          <h2 class="verdict-title">Votre explication</h2>
          <p class="verdict-label">Expliquez pourquoi cette affirmation est fausse.</p>
          ${ex.field(`why${i}`, 'Votre explication', { placeholder: 'Votre explication ici…', max: 240, rows: 7, hideLabel: true })}
          <p class="verdict-tip">${icon('lightbulb', { size: 19 })}<span>Soyez précis : quel effet sur la persuasion ?</span></p>
        </section>
        <div class="verdict-actions">${core.errorsBox()}${kit.bar({ left: `<span class="verdict-reset">${icon('refresh', { size: 20 })}${kit.reset()}</span>`, right: kit.submit(`Valider la série ${letters[i]}`) })}</div>
      </form>
      ${kit.utility('Corrigé disponible après les 3 séries')}
    </div>`;
  }

  /* Relecture (maquette) : par série, les trois affirmations numérotées,
   * l'erreur attendue en vert, un mauvais choix en rouge, puis « Pourquoi ? ». */
  function reviewScreen() {
    const right = series.filter((s, i) => choice(i) === s.wrong).length;
    return `<div class="k-page verdict-review">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Vos verdicts', subtitle: 'L’erreur de chaque série, et pourquoi elle pénalise l’échange.',
        aside: `<div class="say-progress"><span><strong>${right} / ${series.length}</strong> erreurs repérées</span><span class="say-dots">${series.map((s, i) => `<span class="say-dot ${choice(i) === s.wrong ? 'is-current' : ''}"></span>`).join('')}</span></div>` })}
      <div class="k-review-grid is-3">${series.map((s, i) => `<section class="k-panel vr-serie">
        <h2>Série ${letters[i]}</h2>
        <ol class="vr-items">${s.items.map((text, n) => {
          const state = n === s.wrong ? 'is-answer' : n === choice(i) ? 'is-wrong' : '';
          const label = n === s.wrong ? (n === choice(i) ? 'Votre choix, correct' : 'L’erreur attendue') : n === choice(i) ? 'Votre choix' : '';
          return `<li class="vr-item ${state}"><span class="vr-n">${n + 1}</span><span>${esc(text)}</span>${state ? `<span class="vr-mark" title="${label}">${icon(state === 'is-answer' ? 'check' : 'close', { size: 18, label })}</span>` : ''}</li>`;
        }).join('')}</ol>
        <p class="vr-why">${icon('lightbulb', { size: 26 })}<span><strong>Pourquoi ?</strong> ${esc(s.why)}</span></p>
      </section>`).join('')}</div>
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function seriesErrors(i) {
    const errors = [];
    if (choice(i) === null) errors.push({ key: `wrong${i}`, message: 'Sélectionnez l’affirmation fausse.' });
    if (!kit.filled(ex.value(`why${i}`))) errors.push({ key: `why${i}`, message: 'Expliquez pourquoi elle pénalise l’échange.' });
    return errors;
  }

  function validate() {
    const i = serie();
    const errors = seriesErrors(i);
    if (errors.length) return errors;
    const missing = series.findIndex((_, n) => n !== i && !done(n));
    return missing === -1 ? [] : [{ key: 'serie', message: `Terminez aussi la série ${letters[missing]}.` }];
  }

  function intercept() {
    const i = serie();
    if (seriesErrors(i).length) return false;
    ex.setValue(`done${i}`, true);
    const next = series.findIndex((_, n) => !done(n));
    if (next === -1) return false;
    ex.setValue('serie', next);
    return true;
  }

  function feedback() {
    const right = series.filter((s, i) => choice(i) === s.wrong).length;
    return [`${right} erreur${right > 1 ? 's' : ''} repérée${right > 1 ? 's' : ''} sur ${series.length}.`];
  }

  kit.on({ serie: el => { ex.setValue('serie', Number(el.dataset.index)); kit.commit(); } });

  ex.mount('s3-3.1', { screen, validate, intercept, feedback, compactFeedback: true });
})();
