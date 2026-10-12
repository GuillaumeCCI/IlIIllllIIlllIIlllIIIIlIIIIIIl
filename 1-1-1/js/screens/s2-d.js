/* S2 D · Explorer les 6 attitudes de Porter.
 * Une réponse rédigée par attitude, puis un choix final justifié.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S2.D;
  const attitudes = window.ATELIER_S2.attitudes;
  const { esc } = core;

  const replyKey = i => `reply${i}`;

  function screen() {
    return `<div class="writing-workshop">
      ${core.pageTitle(content.eyebrow, content.title)}
      ${core.mission('Votre mission', content.intro, '', 'chat')}
      ${core.clientCard(content.mission, 'assets/illustrations/clients/client-chignon.webp')}
      <form novalidate>
        <div class="attitude-grid">
          ${attitudes.map((attitude, i) => `<section class="attitude-card">
            <div class="attitude-head">
              <span class="radio-badge" aria-hidden="true">${i + 1}</span>
              <h3>${esc(attitude)}</h3>
            </div>
            ${ex.field(replyKey(i), 'Ma réponse', {
              placeholder: 'Rédigez votre réponse…', max: 300, rows: 3
            })}
          </section>`).join('')}
        </div>
        <div class="final-choice">
          <span class="mission-symbol">${icon('targetFilled', { size: 26 })}</span>
          <div>
            <h3>Votre choix final</h3>
            <p class="muted">Quelle attitude vous semble la plus appropriée lors d’une prise de contact ?</p>
            ${ex.select('finalChoice', 'Attitude la plus appropriée', attitudes, 'Choisir une attitude')}
          </div>
          <div>
            ${ex.field('justification', 'Justifiez votre choix', {
              placeholder: 'Justifiez votre choix…', max: 400, rows: 4, hideLabel: true
            })}
          </div>
        </div>
        ${core.errorsBox()}
        ${ex.actions('Valider mes réponses')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    attitudes.forEach((attitude, i) => {
      if (!String(values[replyKey(i)] ?? '').trim()) errors.push({ key: replyKey(i), message: `Attitude ${i + 1} (${attitude}) : rédigez une réponse.` });
    });
    if (!attitudes.includes(values.finalChoice)) errors.push({ key: 'finalChoice', message: 'Choisissez l’attitude la plus appropriée.' });
    if (!String(values.justification ?? '').trim()) errors.push({ key: 'justification', message: 'Justifiez votre choix final.' });
    return errors;
  }

  function feedback(values) {
    const chosen = values.finalChoice;
    const aligned = chosen === content.recommended;
    const examples = `Réponses modèles, une par attitude : ${attitudes.map((attitude, i) => `${attitude} : « ${content.examples[i]} »`).join(' · ')}`;
    return [
      content.feedback,
      aligned
        ? `Vous avez retenu « ${chosen} », qui est aussi l’attitude généralement recommandée en prise de contact.`
        : `Vous avez retenu « ${chosen} ». L’attitude généralement recommandée en prise de contact est « ${content.recommended} » ; relisez votre justification à la lumière de ce repère.`,
      examples,
      content.criterion
    ];
  }

  ex.mount('s2-D', { screen, validate, feedback, onMount: () => core.wireRubric(window.ATELIER_S2.rubric) });
})();
