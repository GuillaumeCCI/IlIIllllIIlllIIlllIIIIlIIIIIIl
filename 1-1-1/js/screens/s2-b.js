/* S2 B · Reformuler sans dévier.
 * Quatre réponses du vendeur : identifier l'attitude, puis réécrire.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S2.B;
  const attitudes = window.ATELIER_S2.attitudes;
  const cases = content.cases;
  const { esc } = core;

  const attitudeKey = i => `attitude${i}`;
  const rewriteKey = i => `rewrite${i}`;

  function screen() {
    const review = ex.reviewing();
    return `<div class="writing-workshop">
      ${core.pageTitle(content.eyebrow, content.title)}
      ${core.mission('Votre mission', content.intro, '', 'target')}
      ${core.clientCard(content.mission, 'assets/illustrations/clients/client-cheveux-gris.webp')}
      <form class="panel" novalidate>
        <div class="answer-table">
          <div class="answer-table-head">
            <span>Réponse du vendeur</span><span>Attitude identifiée</span><span>Votre reformulation</span>
          </div>
          ${cases.map((item, i) => {
            const chosen = ex.value(attitudeKey(i));
            const right = chosen === item.answer;
            return `<div class="answer-row ${review ? (right ? 'row-ok' : 'row-ko') : ''}">
              <div class="row-source">
                <span class="row-badge" aria-hidden="true">${i + 1}</span>
                <p>« ${esc(item.text)} »</p>
              </div>
              ${review
                ? `<div class="row-verdict">
                     ${ex.verdictMark(right, right ? chosen : `Attendu : ${item.answer}`)}
                     ${right ? '' : `<span class="row-chosen">Votre réponse : ${esc(chosen)}</span>`}
                     ${ex.inlineNote(item.why, right ? 'good' : 'bad')}
                   </div>
                   <div class="row-model">
                     <p class="own-line">« ${esc(ex.value(rewriteKey(i)))} »</p>
                     ${ex.inlineNote(`Réécriture modèle : « ${item.rewrite} »`, 'neutral')}
                   </div>`
                : `${ex.select(attitudeKey(i), `Attitude de la réponse ${i + 1}`, attitudes, 'Choisir une attitude')}
                   ${ex.field(rewriteKey(i), `Votre reformulation de la réponse ${i + 1}`, {
                     placeholder: 'Réécrivez la réponse…', max: 300, rows: 2, hideLabel: true
                   })}`}
            </div>`;
          }).join('')}
        </div>
        ${ex.lockNote('Corrigé disponible après validation')}
        ${core.errorsBox()}
        ${ex.actions('Valider mes réponses')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    cases.forEach((item, i) => {
      if (!attitudes.includes(values[attitudeKey(i)])) errors.push({ key: attitudeKey(i), message: `Réponse ${i + 1} : choisissez une attitude.` });
      if (!String(values[rewriteKey(i)] ?? '').trim()) errors.push({ key: rewriteKey(i), message: `Réponse ${i + 1} : proposez une reformulation.` });
    });
    return errors;
  }

  /* Le détail figure déjà en face de chaque réponse : la synthèse ne garde
   * que le principe et le score. */
  function feedback(values) {
    const right = cases.filter((item, i) => values[attitudeKey(i)] === item.answer).length;
    return [
      content.feedback,
      `${right} attitude sur ${cases.length} correctement identifiée${right > 1 ? 's' : ''}. Les réécritures modèles sont affichées en face de vos propositions.`,
      content.criterion
    ];
  }

  ex.mount('s2-B', { screen, validate, feedback, onMount: () => core.wireRubric(window.ATELIER_S2.rubric) });
})();
