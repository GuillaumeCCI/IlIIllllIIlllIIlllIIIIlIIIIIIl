/* S3 3.5 · Vérifier avant d'avancer.
 *
 * Quatre répliques du commercial. Pour chacune : vérifie-t-il l'impact de
 * son argument, ou pousse-t-il son argumentation ? S'il pousse, on rédige
 * la question de contrôle qu'il aurait pu poser.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.5'];
  const lines = content.lines;
  const choices = content.choices;

  const line = () => Math.min(Math.max(0, Number(ex.value('line')) || 0), lines.length - 1);
  const act = i => ex.value(`act${i}`) || '';
  const done = i => ex.value(`done${i}`) === true;

  function lineErrors(i) {
    if (!act(i)) return [{ key: `act${i}`, message: 'Indiquez ce que fait le vendeur.' }];
    if (act(i) === 'push' && !kit.filled(ex.value(`q${i}`))) return [{ key: `q${i}`, message: 'Rédigez la question de contrôle qu’il aurait pu poser.' }];
    return [];
  }

  /* Pictogramme de chaque choix, comme sur la maquette. */
  const SYMBOLS = { check: ['chat', 'coral'], push: ['sprout', 'green'] };

  /* Mise en page « une réplique, puis les choix » : la réplique dans sa
   * carte, la question, les deux choix empilés pleine largeur, puis la
   * question de contrôle si le vendeur pousse son argumentation. */
  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = line();
    const chosen = act(i);
    const ready = Boolean(chosen) && (chosen !== 'push' || kit.filled(ex.value(`q${i}`)));
    const n = String(i + 1).padStart(2, '0');
    return `<div class="k-page say-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<div class="say-progress"><span>Réplique ${i + 1} sur ${lines.length}</span>
          <span class="say-dots">${lines.map((_, k) => `<button type="button" class="say-dot ${k === i ? 'is-current' : done(k) ? 'is-done' : ''}" data-act="line" data-index="${k}" aria-label="Réplique ${k + 1}"></button>`).join('')}</span></div>` })}
      <form novalidate>
        <section class="say-card">
          <p class="say-label">Prise de parole ${n} <span>/</span> Le commercial dit…</p>
          <div class="say-quote"><span class="say-glyph" aria-hidden="true">“</span><blockquote>${esc(lines[i].text)}</blockquote></div>
        </section>
        <div class="say-choose"><h2>Que fait le vendeur ?</h2></div>
        <div class="say-options" role="radiogroup" aria-label="Que fait le vendeur ?">${choices.map(choice => {
          const [symbol, tone] = SYMBOLS[choice.id] || ['chat', 'coral'];
          return `<button type="button" class="say-option ${chosen === choice.id ? 'is-chosen' : ''}" role="radio" aria-checked="${chosen === choice.id}" data-act="choose" data-choice="${choice.id}" data-field="act${i}">
            <span class="say-radio"></span>
            <span class="say-symbol tone-${tone} ${choice.image ? 'has-art' : ''}">${choice.image ? `<img src="${esc(core.webAsset(choice.image))}" alt="" decoding="async">` : icon(symbol, { size: 40, strokeWidth: 1.5 })}</span>
            <span class="say-option-copy"><strong>${esc(choice.label)}</strong><small>${esc(choice.sub)}</small></span>
          </button>`;
        }).join('')}</div>
        <p class="say-note">${icon('info', { size: 18 })}<span>${esc(content.note)}</span></p>
        ${chosen === 'push' ? `<div class="check-conditional">${ex.field(`q${i}`, 'Ma question de contrôle', { placeholder: 'Rédigez la question qu’il aurait pu poser au client…', max: 180, rows: 3 })}</div>` : ''}
        ${core.errorsBox()}
        <div class="say-actions">
          <div class="check-actions-left">
            ${kit.act('prev', `${icon('arrowLeft', { size: 17 })}<span>Précédente</span>`, 'text-button with-icon say-back', i === 0 ? 'disabled' : '')}
            ${chosen ? '<button type="button" class="text-button check-clear" data-act="clear-line">Réinitialiser</button>' : ''}
          </div>
          ${kit.submit(lines.every((_, k) => k === i || done(k)) ? 'Valider mes réponses' : 'Valider ma réponse', ready ? '' : 'data-pending="true"')}
        </div>
      </form>
    </div>`;
  }

  function reviewScreen() {
    const label = id => choices.find(c => c.id === id)?.label || 'rien';
    const right = lines.filter((l, i) => act(i) === l.answer).length;
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Vos analyses, réplique par réplique' })}
      ${kit.result(right, lines.length, 'répliques bien analysées')}
      ${lines.map((l, i) => {
        const ok = act(i) === l.answer;
        return `<section class="k-panel">
          <p class="k-label">Prise de parole ${i + 1}</p>
          <blockquote class="check-review-quote">“ ${esc(l.text)} ”</blockquote>
          <p class="review-line">${esc(label(l.answer))} ${kit.mark(ok, ok ? 'votre réponse' : `vous aviez choisi : ${label(act(i))}`)}</p>
          ${ex.inlineNote(l.why, ok ? 'good' : 'neutral')}
          ${act(i) === 'push' ? kit.yours('Votre question de contrôle', ex.value(`q${i}`)) : ''}
          ${l.model ? kit.model('Question de contrôle possible', l.model) : ''}
        </section>`;
      }).join('')}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate() {
    const i = line();
    const errors = lineErrors(i);
    if (errors.length) return errors;
    const missing = lines.findIndex((_, n) => n !== i && !done(n));
    return missing === -1 ? [] : [{ key: 'line', message: `Analysez aussi la réplique ${missing + 1}.` }];
  }

  function intercept() {
    const i = line();
    if (lineErrors(i).length) return false;
    ex.setValue(`done${i}`, true);
    const next = lines.findIndex((_, n) => !done(n));
    if (next === -1) return false;
    ex.setValue('line', next);
    return true;
  }

  function feedback() {
    const right = lines.filter((l, i) => act(i) === l.answer).length;
    return [`${right} réplique${right > 1 ? 's' : ''} sur ${lines.length} correctement analysée${right > 1 ? 's' : ''}.`];
  }

  kit.on({
    choose: el => { ex.setValue(`act${line()}`, el.dataset.choice); kit.commit(); },
    line: el => { ex.setValue('line', Number(el.dataset.index)); kit.commit(); },
    prev: () => { ex.setValue('line', Math.max(0, line() - 1)); kit.commit(); },
    /* Efface le choix et la question de cette réplique seulement. */
    'clear-line': () => { ex.setValue(`act${line()}`, ''); ex.setValue(`q${line()}`, ''); kit.commit(); }
  });

  /* Le bouton s'active dès que la question de contrôle est saisie. */
  kit.live(() => {
    const i = line();
    const ready = Boolean(act(i)) && (act(i) !== 'push' || kit.filled(ex.value(`q${i}`)));
    const button = core.$('.k-submit');
    if (button) { if (ready) button.removeAttribute('data-pending'); else button.setAttribute('data-pending', 'true'); }
    return {};
  });

  ex.mount('s3-3.5', { screen, validate, intercept, feedback, compactFeedback: true });
})();
