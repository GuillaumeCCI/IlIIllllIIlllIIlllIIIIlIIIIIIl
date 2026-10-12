/* S4 1.2 · Repérez ce qui cloche.
 * Surligner au moins 4 maladresses, puis réécrire l’ouverture.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S4['1.2'];
  const segments = content.segments;
  const { esc } = core;

  const marked = () => {
    const stored = ex.value('marked');
    return Array.isArray(stored) ? stored.map(Boolean) : segments.map(() => false);
  };
  const markedCount = () => marked().filter(Boolean).length;

  const stage = () => Number(ex.value('stage')) === 2 ? 2 : 1;
  const setStage = n => ex.setValue('stage', n);

  function screen() {
    const at = stage();
    const flags = marked();
    const count = markedCount();

    const steps = `<div class="stepper">
      <div class="stepper-item ${at === 1 ? 'active' : 'done'}"><span class="stepper-dot">1</span><span class="stepper-label">REPÉRER</span></div>
      <div class="stepper-item ${at === 2 ? 'active' : ''}"><span class="stepper-dot">2</span><span class="stepper-label">RÉÉCRIRE</span></div>
    </div>`;

    const repair = `<p class="muted" style="text-align:center">Cliquez sur les passages qui vous semblent maladroits.</p>
      <div class="highlight-text">
        <span class="quote-mark">${icon('quote', { size: 22 })}</span>
        ${segments.map((segment, i) =>
          `<button type="button" class="segment ${flags[i] ? 'marked' : ''}" data-segment="${i}" aria-pressed="${flags[i]}">${esc(segment.text)}</button>`
        ).join('')}
      </div>
      <div class="highlighter-status">
        <span class="highlighter-symbol">${icon('highlighter', { size: 22 })}</span>
        <span><strong>Surligneur actif</strong><small>Cliquez à nouveau pour retirer une sélection.</small></span>
      </div>`;

    const rewrite = ex.reviewing()
      ? `<div class="own-answer">
           <h4>Votre ouverture réécrite</h4>
           <p>« ${esc(ex.value('rewrite'))} »</p>
           ${ex.inlineNote(content.feedback, 'good')}
         </div>
         ${ex.inlineNote(content.missing, 'neutral')}`
      : `${ex.field('rewrite', 'Votre ouverture réécrite', {
           placeholder: 'Bonjour, merci de me recevoir. Je suis…', max: 900, rows: 8
         })}
         <div class="advice">${icon('lightbulb', { size: 19 })}<span>Reprenez les quatre temps : accueil, présentation, cadrage de la durée, puis une question ouverte.</span></div>`;

    return `<div class="writing-workshop">
      ${core.pageTitle(content.eyebrow, content.title, content.intro)}
      <form class="panel" novalidate>
        <div class="panel-title">
          ${steps}
          <span class="muted">${count} / ${content.minimum} maladresses repérées</span>
        </div>
        ${at === 1 ? repair : rewrite}
        <div class="case-progress" style="margin-top:18px">
          ${core.button('Effacer ma sélection', 'clear-marks', 'secondary small', count ? '' : 'disabled')}
          ${ex.caseProgress(content.minimum, Math.min(count, content.minimum), 'maladresse')}
        </div>
        ${ex.lockNote('Corrigé disponible après votre tentative')}
        ${core.errorsBox()}
        ${ex.actions(at === 1 ? 'Passer à la réécriture' : 'Valider ma réécriture')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    const flags = Array.isArray(values.marked) ? values.marked.filter(Boolean) : [];
    if (flags.length < content.minimum) errors.push({ key: 'marked', message: `Repérez au moins ${content.minimum} maladresses (actuellement ${flags.length}).` });
    if (!String(values.rewrite ?? '').trim()) errors.push({ key: 'rewrite', message: 'Réécrivez une ouverture plus juste.' });
    return errors;
  }

  /* Le modèle et le rappel sont posés sous la réécriture. */
  const feedback = () => ['Comparez votre réécriture au modèle affiché juste au-dessus. Le détail des maladresses figure ci-dessous.'];

  function answerKey() {
    const flags = marked();
    return `<div class="answer-key"><h4>Les maladresses du texte</h4>${segments.map((segment, i) => {
      if (!segment.flaw) return '';
      const found = flags[i];
      return `<div class="answer-key-row">
        <span class="verdict ${found ? 'ok' : 'ko'}">${icon(found ? 'check' : 'close', { size: 14, label: found ? 'repérée' : 'non repérée' })}</span>
        <span><strong>« ${esc(segment.text.trim())} »</strong> : ${esc(segment.why)}</span>
      </div>`;
    }).join('')}</div>`;
  }

  function intercept() {
    if (stage() !== 1 || markedCount() < content.minimum) return false;
    setStage(2);
    return true;
  }

  function onMount() {
    core.$$('[data-segment]').forEach(node => {
      node.addEventListener('click', () => {
        const index = Number(node.dataset.segment);
        const flags = marked();
        flags[index] = !flags[index];
        ex.setValue('marked', flags);
        ex.changed();
        ex.rebuild();
      });
    });
    const clear = core.$('[data-action="clear-marks"]');
    if (clear) clear.addEventListener('click', () => {
      ex.setValue('marked', segments.map(() => false));
      ex.changed();
      ex.rebuild();
    });
  }

  ex.mount('s4-1.2', { screen, validate, feedback, answerKey, intercept, onMount });
})();
