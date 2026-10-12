/* S3 3.4 · Le radar de dérive.
 *
 * Une priorité client, cinq arguments du commercial. Pour chacun, une case :
 * pertinent ou dérive. « Calculer mon score » révèle le corrigé et remplit
 * la jauge de cinq cases.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.4'];
  const rows = content.rows;
  const answers = rows.map(row => row.answer);

  const counter = () => `<p class="k-count"><strong>${kit.answered('row', rows.length)} / ${rows.length}</strong> arguments analysés</p>`;

  function gauge(score) {
    return `<div class="drift-score">
      <strong class="drift-label">Mon score de dérive</strong>
      <span class="drift-value">${score === null ? '-' : score} / ${rows.length}</span>
      <span class="drift-gauge" aria-hidden="true">${rows.map((_, i) => `<span class="${score !== null && i < score ? 'is-on' : ''}"></span>`).join('')}</span>
      <span class="k-muted">Le score correspond au nombre d’arguments correctement analysés.</span>
    </div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const score = reviewing ? kit.score('row', answers) : null;
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: counter() })}
      ${kit.clientCard(content.priority, 'assets/illustrations/clients/client-pull-clair.webp', 'Priorité du client')}
      <form class="k-panel" novalidate>
        ${reviewing ? '' : '<p class="k-muted">Cochez une seule réponse par ligne.</p>'}
        ${kit.matrix({ key: 'row', rows, columns: content.columns, head: 'Arguments du commercial', answers: reviewing ? answers : null })}
        ${gauge(score)}
        ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
          : `${core.errorsBox()}${kit.bar({ left: kit.reset(), center: kit.dialogButton('need', 'Revoir le besoin', 'secondary', ''), right: kit.submit('Calculer mon score') })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après le calcul du score')}
    </div>`;
  }

  function validate(values) {
    const missing = rows.map((_, i) => i).filter(i => !values[`row${i}`]);
    return missing.length ? [{ key: `row${missing[0]}`, message: `Analysez les ${rows.length} arguments (${missing.length} sans réponse).` }] : [];
  }

  const feedback = () => {
    const right = kit.score('row', answers);
    return [`Score : ${right} / ${rows.length}. Un argument est pertinent s’il fait gagner du temps sur l’administratif ; tout le reste est une dérive.`];
  };

  kit.live(() => ({ aside: counter() }));
  kit.dialogs({ need: { title: 'La priorité du client', html: `<p>« ${esc(content.priority)} »</p><p class="k-muted">Un argument pertinent lui fait gagner du temps sur ses tâches administratives. Le reste, même vrai, l’éloigne de sa priorité.</p>` } });

  ex.mount('s3-3.4', { screen, validate, feedback, compactFeedback: true });
})();
