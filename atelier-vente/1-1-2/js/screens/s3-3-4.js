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

  /* Le corrigé, d'après la maquette : en-tête « Corrigé » illustré, puis
   * pour chaque argument sa position (votre choix coché vert s'il est juste,
   * barré rouge sinon ; la bonne case en pointillés verts si vous l'avez
   * manquée) et un verdict à droite. La jauge du score clôt le tableau. */
  function reviewScreen(score) {
    const label = id => (content.columns.find(c => c.id === id) || {}).label || '';
    const mark = (i, column) => {
      const chosen = ex.value(`row${i}`) === column.id;
      const expected = answers[i] === column.id;
      if (chosen) return `<span class="drv-mark ${expected ? 'is-right' : 'is-wrong'}">${icon(expected ? 'check' : 'close', { size: 22, strokeWidth: 3, label: expected ? 'votre choix, juste' : 'votre choix, faux' })}</span>`;
      if (expected) return `<span class="drv-mark is-expected">${icon('check', { size: 18, strokeWidth: 3, label: 'réponse attendue' })}</span>`;
      return '<span class="drv-mark"></span>';
    };
    return `${kit.answerReview({ subtitle: 'Voici l’analyse de chaque argument, avec la bonne position et une explication.', items: [] }).replace('<ol class="arv-list"></ol>', '')}
      <section class="k-panel drv-review">
        <div class="drv-row drv-head"><span>Arguments du commercial</span>${content.columns.map(c => `<span class="drv-col is-${esc(c.id)}">${icon(c.id === 'fit' ? 'check' : 'close', { size: 16, strokeWidth: 3 })}<strong>${esc(c.label)}</strong><small>${esc(c.sub)}</small></span>`).join('')}<span></span></div>
        ${rows.map((row, i) => {
          const ok = ex.value(`row${i}`) === answers[i];
          return `<div class="drv-row ${ok ? 'is-ok' : 'is-ko'}">
            <div class="drv-arg"><span class="drv-n">${i + 1}</span><div><strong>${esc(row.text)}</strong><small>${esc(row.why)}</small></div></div>
            ${content.columns.map(c => `<span class="drv-cell">${mark(i, c)}</span>`).join('')}
            <div class="drv-verdict ${ok ? 'is-ok' : 'is-ko'}"><strong>${ok ? 'Bon positionnement' : 'À repositionner'}</strong><span>${ok ? `Vous l’avez bien classé : « ${esc(label(answers[i]))} ».` : `Il fallait le classer : « ${esc(label(answers[i]))} ».`}</span></div>
          </div>`;
        }).join('')}
        <div class="drv-score">
          <span class="drv-score-symbol">${icon('target', { size: 34 })}</span>
          <div><small>Votre score de dérive</small><strong>${score} / ${rows.length}</strong></div>
          <span class="drift-gauge" aria-hidden="true">${rows.map((_, i) => `<span class="${i < score ? 'is-on' : ''}"></span>`).join('')}</span>
          <span class="k-muted">Le score correspond au nombre d’arguments correctement analysés.</span>
        </div>
      </section>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    if (reviewing) return reviewScreen(kit.score('row', answers));
    const score = reviewing ? kit.score('row', answers) : null;
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: counter() })}
      ${kit.clientCard(content.priority, null, 'Priorité du client')}
      <form class="k-panel" novalidate>
        ${reviewing ? '' : '<p class="k-muted">Cochez une seule réponse par ligne.</p>'}
        ${kit.matrix({ key: 'row', rows, columns: content.columns, head: 'Arguments du commercial', answers: reviewing ? answers : null })}
        ${reviewing ? gauge(score) : ""}
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
