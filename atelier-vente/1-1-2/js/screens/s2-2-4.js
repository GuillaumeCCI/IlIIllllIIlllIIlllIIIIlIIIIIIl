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

  // Le corrigé détaillé : votre réponse, la bonne réponse, l'explication.
  const label = id => (content.columns.find(c => c.id === id) || {}).label || '';
  // « Étayée : … » / « Trou de preuve : … » : la bonne réponse est déjà dite.
  const reason = why => why.replace(/^[^:]+:\s*/, '').replace(/^./, c => c.toUpperCase());

  function reviewScreen() {
    return `${kit.answerReview({ subtitle: 'Voici vos réponses, accompagnées des bonnes réponses et d’une explication pour chaque affirmation.',
        aside: `<p class="arv-score"><strong>${kit.score('row', answers)} / ${rows.length}</strong> bonnes réponses</p>`,
        items: rows.map((row, i) => ({ text: `« ${row.text} »`, yours: label(ex.value(`row${i}`)), expected: label(row.answer), ok: ex.value(`row${i}`) === row.answer, why: reason(row.why) })) })}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    if (reviewing) return reviewScreen();
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
    return [`Une preuve doit couvrir toute la promesse : un audit RGPD prouve la conformité, pas une « sécurité totale ».`];
  };

  kit.live(() => ({ aside: counter() }));

  ex.mount('s2-2.4', { screen, validate, feedback, compactFeedback: true });
})();
