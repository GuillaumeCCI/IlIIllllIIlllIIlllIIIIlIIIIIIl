/* S2 2.4 · La chasse aux preuves.
 *
 * Le pitch est découpé en cinq affirmations. Pour chacune, une seule case :
 * étayée par une preuve concrète, ou trou de preuve.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc } = kit;
  const content = window.ATELIER_S2['2.4'];
  const rows = content.rows;
  const answers = rows.map(row => row.answer);

  const counter = () => `<p class="k-count"><strong>${kit.answered('row', rows.length)} / ${rows.length}</strong> réponses</p>`;

  function screen() {
    const reviewing = ex.reviewing();
    const [first, ...rest] = content.pitch.split(/(?<=\.)\s/);
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: counter() })}
      <form class="k-panel" novalidate>
        <p class="k-label">Le pitch</p>
        <p class="proof-pitch">« <strong>${esc(first)}</strong> ${esc(rest.join(' '))} »</p>
        ${reviewing ? kit.result(kit.score('row', answers), rows.length, 'bonnes réponses') : '<p class="k-muted">Cochez une seule case par ligne.</p>'}
        ${kit.matrix({ key: 'row', rows, columns: content.columns, head: 'Affirmations extraites du pitch', answers: reviewing ? answers : null })}
        ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
          : `${core.errorsBox()}${kit.bar({ left: kit.reset(), right: kit.submit('Valider mes réponses') })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate(values) {
    const missing = rows.map((_, i) => i).filter(i => !values[`row${i}`]);
    return missing.length ? [{ key: `row${missing[0]}`, message: `Répondez aux ${rows.length} lignes (${missing.length} sans réponse).` }] : [];
  }

  const feedback = () => {
    // Le score est déjà en tête du corrigé : seule la leçon reste.
    return [`Un superlatif sans source est toujours un trou de preuve.`];
  };

  kit.live(() => ({ aside: counter() }));

  ex.mount('s2-2.4', { screen, validate, feedback, compactFeedback: true });
})();
