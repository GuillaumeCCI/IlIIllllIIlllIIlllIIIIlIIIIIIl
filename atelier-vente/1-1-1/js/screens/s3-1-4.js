/* S3 1.4 · Derrière le prétexte.
 * Lire l’échange, formuler l’hypothèse du vrai frein, puis la question qui l’ouvre.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S3['1.4'];
  const { esc } = core;

  function screen() {
    const review = ex.reviewing();
    return `<div class="two-columns">
      <section class="panel scenario">
        <h2>L’échange</h2>
        <div class="conversation">
          ${content.exchange.map(line => `<div class="bubble ${line.who === 'Client' ? 'client' : 'seller'}">
            <span class="who">${esc(line.who)}</span>${esc(line.text)}
          </div>`).join('')}
        </div>
        <div class="observation">${icon('lightbulb', { size: 19 })}<span>${esc(content.observation)}</span></div>
        ${core.hintBlock(content.hint)}
      </section>
      <form class="panel answer-panel" novalidate>
        ${core.panelTitle('Votre analyse')}
        ${review
          ? `${core.step(1, 'Vraie objection probable', `<p class="own-line">« ${esc(ex.value('hypothesis'))} »</p>${ex.inlineNote(content.hypothesisModel, 'good')}`)}
             ${core.step(2, 'Question pour la révéler', `<p class="own-line">« ${esc(ex.value('question'))} »</p>${ex.inlineNote(content.questionModel, 'good')}`)}
             ${ex.inlineNote(content.avoid, 'bad')}`
          : `${core.step(1, 'Vraie objection probable', ex.field('hypothesis', 'Vraie objection probable', {
               placeholder: 'Le client hésite peut-être parce que…', max: 240, rows: 4, hideLabel: true
             }), 'Formulez une hypothèse simple et précise.')}
             ${core.step(2, 'Question pour la révéler', ex.field('question', 'Question pour la révéler', {
               placeholder: 'Qu’est-ce qui vous fait hésiter aujourd’hui ?', max: 240, rows: 4, hideLabel: true
             }), 'Posez une question ouverte, sans suggérer la réponse.')}`}
        ${ex.lockNote('Corrigé disponible après votre tentative')}
        ${core.errorsBox()}
        ${ex.actions('Valider mes réponses')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    if (!String(values.hypothesis ?? '').trim()) errors.push({ key: 'hypothesis', message: 'Formulez votre hypothèse sur le vrai frein.' });
    const question = String(values.question ?? '').trim();
    if (!question) errors.push({ key: 'question', message: 'Proposez une question pour révéler le frein.' });
    // Le contrôle reste formel : il signale une tournure sans question.
    else if (!/[?？]/u.test(question)) errors.push({ key: 'question', message: 'Votre question doit se terminer par un point d’interrogation.' });
    return errors;
  }

  /* Les deux repères sont posés sous les deux champs. */
  const feedback = () => ['Comparez votre hypothèse et votre question aux repères affichés sous chacune.'];

  ex.mount('s3-1.4', { screen, validate, feedback });
})();
