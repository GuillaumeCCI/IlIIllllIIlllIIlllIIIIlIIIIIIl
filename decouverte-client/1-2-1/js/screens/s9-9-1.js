/* S9 9.1 · Mon point d'arrivée.
 *
 * La fin de la grille d'auto-positionnement (fiche M1.2.1), en deux temps :
 *   1. la colonne « Fin », sans revoir la colonne « Début » ;
 *   2. les deux colonnes côte à côte, critère par critère, puis les trois
 *      questions « Ma progression » et le tableau « Si vous voulez
 *      retravailler… Refaites… ».
 * La colonne « Début » est lue dans le brouillon de l'exercice 1.1.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const grid = window.ATELIER_S1.grid;
  const content = window.ATELIER_S9['9.1'];
  const FIN = 'fin';
  const START_KEY = 's1-1.1';
  const n = grid.criteria.length;

  const levelOf = id => grid.levels.find(level => level.id === id);
  const startOf = i => String(core.entry(START_KEY).values[`deb${i}`] ?? '');
  const hasStart = () => grid.criteria.some((_, i) => levelOf(startOf(i)));
  const gridDone = () => grid.criteria.every((_, i) => levelOf(ex.value(`${FIN}${i}`)));
  const step = () => (ex.reviewing() || (ex.wizardAt() >= 1 && gridDone()) ? 1 : 0);

  const pill = id => {
    const level = levelOf(id);
    return `<span class="pos-level level-${esc(level ? level.id : 'none')}">${esc(level ? level.label : 'Sans réponse')}</span>`;
  };

  /* Le sens de l'écart : en hausse, stable, en baisse (sans jugement). */
  function trend(i) {
    const a = levelOf(startOf(i));
    const b = levelOf(ex.value(`${FIN}${i}`));
    if (!a || !b) return '<span class="pos-trend">–</span>';
    const gap = Number(b.id) - Number(a.id);
    if (gap > 0) return `<span class="pos-trend is-up">${icon('arrowRight', { size: 16 })}<span>En progrès</span></span>`;
    if (gap < 0) return `<span class="pos-trend is-down">${icon('eye', { size: 16 })}<span>Regard plus exigeant</span></span>`;
    return '<span class="pos-trend is-same"><span>Stable</span></span>';
  }

  function comparison() {
    const lower = grid.criteria.some((_, i) => levelOf(startOf(i)) && levelOf(ex.value(`${FIN}${i}`)) && Number(ex.value(`${FIN}${i}`)) < Number(startOf(i)));
    return `<table class="pos-compare">
      <thead><tr><th scope="col">Critère</th><th scope="col">Début</th><th scope="col">Fin</th><th scope="col"><span class="sr-only">Évolution</span></th></tr></thead>
      <tbody>${grid.criteria.map((c, i) => `<tr>
        <th scope="row"><span class="k-num">${i + 1}</span><span><strong>${esc(c.title)}</strong><small>${esc(c.text)}</small></span></th>
        <td>${pill(startOf(i))}</td><td>${pill(ex.value(`${FIN}${i}`))}</td><td>${trend(i)}</td>
      </tr>`).join('')}</tbody>
    </table>
    ${!hasStart() ? kit.help(content.noStart) : lower ? kit.help(content.lower, 'lightbulb') : ''}`;
  }

  /* « Si vous voulez retravailler… Refaites… » : un lien vers la série,
   * quand elle est en ligne. */
  const redo = () => `<table class="pos-redo">
    <thead><tr><th scope="col">Si vous voulez retravailler…</th><th scope="col">Refaites…</th></tr></thead>
    <tbody>${grid.redo.map(row => {
      const serie = core.catalog.series.find(s => s.id === row.serie);
      const exercise = serie && (serie.exercises.find(x => x.id === row.exercise) || serie.exercises[0]);
      const target = exercise ? `<a href="${esc(core.pageUrl(exercise.file))}">${esc(row.activity)}<small>${esc(serie.label)} · ${esc(exercise.label)}</small></a>` : `<span>${esc(row.activity)}</span>`;
      return `<tr><td>${esc(row.topic)}</td><td>${target}</td></tr>`;
    }).join('')}</tbody>
  </table>`;

  const questions = reviewing => grid.questions.map(q => reviewing
    ? `<div class="pos-answer"><p class="fm-label">${esc(q.label)}</p><p>« ${esc(ex.value(q.id))} »</p></div>`
    : `<div class="fm-field"><p class="fm-label">${esc(q.label)}</p><p class="fm-sub">${esc(q.sub)}</p>${ex.field(q.id, q.label, { placeholder: q.placeholder, max: 600, rows: 3, hideLabel: true })}</div>`).join('');

  function screen() {
    const reviewing = ex.reviewing();
    const at = step();
    const filled = kit.answered(FIN, n);
    const aside = at === 0 ? `<p class="k-count">Critères : <strong data-live="count">${filled} / ${n}</strong></p>` : '';
    if (at === 0) {
      return `<div class="k-page pos-page">
        ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside })}
        <form novalidate>
          <section class="k-panel pos-panel">${kit.matrix({ key: FIN, rows: grid.criteria, columns: grid.levels, head: 'Critère', round: true })}</section>
          ${core.errorsBox()}${kit.bar({ right: kit.submit(content.submitGrid) })}
        </form>
      </div>`;
    }
    return `<div class="k-page pos-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Ma progression', subtitle: 'Vos deux grilles côte à côte, puis trois questions pour décider de la suite.' })}
      <form novalidate>
        <section class="k-panel pos-panel"><p class="k-label">Début et fin du module</p>${comparison()}</section>
        <section class="k-panel pos-panel"><p class="k-label">Ma progression</p>${questions(reviewing)}</section>
        <section class="k-panel pos-panel"><p class="k-label">Pour aller plus loin</p>${redo()}</section>
        ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
          : `${core.errorsBox()}${kit.bar({ left: `<button type="button" class="text-button with-icon k-back" data-action="wizard-prev">${icon('arrowLeft', { size: 17 })}<span>Revoir ma grille</span></button>`, right: kit.submit(content.submit) })}`}
      </form>
    </div>`;
  }

  function validate(values) {
    const missing = grid.criteria.map((_, i) => i).filter(i => !values[`${FIN}${i}`]);
    if (missing.length) return [{ key: `${FIN}${missing[0]}`, message: `Cochez un niveau pour chacun des ${n} critères (${missing.length} sans réponse).` }];
    return grid.questions.filter(q => !kit.filled(values[q.id])).map(q => ({ key: q.id, message: `Répondez à « ${q.label} »` }));
  }

  /* La grille remplie, « valider » passe à la comparaison au lieu de clore. */
  function intercept() {
    if (step() === 0 && gridDone()) { ex.setValue('wizard', 1); return true; }
    return false;
  }

  const feedback = () => ['Votre bilan est enregistré. Gardez en tête l’activité que vous avez choisi de refaire : c’est là que votre progression continue.'];

  kit.live(() => ({ count: `${kit.answered(FIN, n)} / ${n}` }));

  ex.mount('s9-9.1', { screen, validate, feedback, intercept, compactFeedback: true });
})();
