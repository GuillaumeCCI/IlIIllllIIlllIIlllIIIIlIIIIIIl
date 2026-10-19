/* S2 2.5 · L'audit du pitch.
 *
 * Noter un pitch sur les six critères de la grille commune (0, 1 ou 2),
 * un à un : chaque note dévoile le critère suivant. Puis désigner la
 * modification prioritaire. Le total se calcule en
 * direct. En relecture, la note de l'apprenant est comparée au repère : un
 * écart d'un point reste une appréciation défendable.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc } = kit;
  const content = window.ATELIER_S2['2.5'];
  const criteria = content.criteria;
  const max = criteria.length * 2;

  const notes = () => criteria.map((_, i) => ex.value(`note${i}`));
  const total = () => notes().every(v => v !== '') ? notes().reduce((sum, v) => sum + Number(v), 0) : null;
  const totalText = () => `Total : ${total() === null ? '-' : total()} / ${max}`;
  const reference = criteria.reduce((sum, c) => sum + c.reference, 0);

  function reviewTable() {
    return `<table class="k-matrix is-review audit-review">
      <thead><tr><th scope="col" class="k-matrix-label">Critère</th><th scope="col">Votre note</th><th scope="col">Corrigé</th></tr></thead>
      <tbody>${criteria.map((c, i) => {
        const mine = Number(ex.value(`note${i}`));
        const gap = Math.abs(mine - c.reference);
        return `<tr class="${gap === 0 ? 'is-ok' : gap === 1 ? '' : 'is-ko'}">
          <th scope="row" class="k-matrix-label"><span class="k-num">${i + 1}</span><span class="k-matrix-text"><strong>${esc(c.title)}</strong><small class="k-why">${esc(c.why)}</small></span></th>
          <td><strong class="audit-note">${mine}</strong></td>
          <td>${kit.mark(gap <= 1, `${c.reference}${gap === 1 ? ' · écart d’un point' : gap > 1 ? ' · écart important' : ''}`)}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, note: content.note,
        aside: `<p class="k-count">Score : <strong data-live="score">${esc(totalText().replace('Total : ', ''))}</strong></p>` })}
      <section class="k-panel audit-pitch"><p class="k-label">Le pitch à analyser</p><p>${esc(content.pitch)}</p></section>
      <form class="audit-layout" novalidate>
        <section class="k-panel">
          <h2>1. Notez le pitch</h2>
          ${reviewing ? `${kit.result(total(), max, `votre total, pour ${reference} / ${max} au repère`)}${reviewTable()}`
            : kit.matrix({ key: 'note', rows: criteria, columns: content.levels.map(level => ({ id: level.id, label: level.id, sub: level.label })), head: 'Critère', round: true, progressive: true })}
          ${reviewing ? '' : `<p class="audit-total" data-live="total">${esc(totalText())}</p>`}
        </section>
        <section class="k-panel">
          <h2>2. Choisissez votre priorité</h2>
          ${reviewing ? `${kit.yours('Votre modification prioritaire', ex.value('priority'))}${kit.model('Corrigé modèle', content.priority)}`
            : `<p class="k-instruction">Quelle modification aurait le plus fort impact sur ce pitch ?</p>
              ${ex.field('priority', 'La modification prioritaire', { placeholder: 'La modification prioritaire…', max: 240, rows: 7, hideLabel: true })}
              <p class="k-muted">Une seule priorité, formulée concrètement.</p>`}
        </section>
        <div class="audit-actions">
          ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
            : `${core.errorsBox()}${kit.bar({ left: kit.reset(), right: kit.submit('Valider mon audit') })}`}
        </div>
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate(values) {
    const errors = [];
    const missing = criteria.map((_, i) => i).filter(i => values[`note${i}`] === undefined || values[`note${i}`] === '');
    if (missing.length) errors.push({ key: `note${missing[0]}`, message: `Notez les ${criteria.length} critères (${missing.length} sans note).` });
    if (!kit.filled(values.priority)) errors.push({ key: 'priority', message: 'Désignez la modification prioritaire.' });
    return errors;
  }

  // Le total et le repère sont déjà en tête du corrigé : seule la leçon reste.
  const feedback = () => ['Ce pitch parle bénéfices, sur un ton assuré, avec une question pour finir ; mais aucune preuve ne vient appuyer ses promesses.'];

  kit.live(() => ({ total: esc(totalText()), score: esc(totalText().replace('Total : ', '')) }));

  ex.mount('s2-2.5', { screen, validate, feedback, compactFeedback: true });
})();
