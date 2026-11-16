/* S1 1.1 · Mon point de départ.
 *
 * La colonne « Début » de la grille d'auto-positionnement (fiche M1.2.1) :
 * huit critères, trois niveaux. Rien n'est noté ni corrigé ; en relecture,
 * l'apprenant retrouve ses choix. La colonne « Fin » est l'exercice 9.1.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc } = kit;
  const S1 = window.ATELIER_S1;
  const grid = S1.grid;
  const content = S1['1.1'];
  const KEY = 'deb';

  const levelOf = id => grid.levels.find(level => level.id === id);
  const count = () => kit.answered(KEY, grid.criteria.length);

  /* La relecture : chaque critère et le niveau choisi, en pastille. */
  const recap = () => `<ol class="pos-recap">${grid.criteria.map((c, i) => {
    const level = levelOf(ex.value(`${KEY}${i}`));
    return `<li><span class="k-num">${i + 1}</span><span class="pos-recap-text"><strong>${esc(c.title)}</strong><small>${esc(c.text)}</small></span>
      <span class="pos-level level-${esc(level ? level.id : 'none')}">${esc(level ? level.label : 'Sans réponse')}</span></li>`;
  }).join('')}</ol>`;

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page pos-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? '' : `<p class="k-count">Critères : <strong data-live="count">${count()} / ${grid.criteria.length}</strong></p>` })}
      <form novalidate>
        <section class="k-panel pos-panel">
          ${reviewing
            ? `<p class="k-label">Votre point de départ</p>${recap()}`
            : kit.matrix({ key: KEY, rows: grid.criteria, columns: grid.levels, head: 'Critère', round: true })}
        </section>
        ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
          : `${core.errorsBox()}${kit.bar({ right: kit.submit(content.submit) })}`}
      </form>
    </div>`;
  }

  function validate(values) {
    const missing = grid.criteria.map((_, i) => i).filter(i => !values[`${KEY}${i}`]);
    return missing.length ? [{ key: `${KEY}${missing[0]}`, message: `Cochez un niveau pour chacun des ${grid.criteria.length} critères (${missing.length} sans réponse).` }] : [];
  }

  const feedback = () => [content.after];

  kit.live(() => ({ count: `${count()} / ${grid.criteria.length}` }));

  ex.mount('s1-1.1', { screen, validate, feedback, compactFeedback: true });
})();
