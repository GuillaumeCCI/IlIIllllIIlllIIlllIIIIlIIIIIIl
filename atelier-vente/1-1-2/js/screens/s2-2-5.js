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
        aside: `<p class="k-count">Score : <strong data-live="score">${esc(totalText().replace('Total : ', ''))}</strong></p>${reviewing ? '' : kit.tourButton()}` })}
      <section class="k-panel audit-pitch"><p class="k-label">Le pitch à analyser</p><p>${esc(content.pitch)}</p></section>
      <form class="audit-layout" novalidate>
        <section class="k-panel">
          <h2>1. Notez le pitch ci-dessus</h2>
          ${reviewing ? `${kit.result(total(), max, `votre total, pour ${reference} / ${max} au repère`)}${reviewTable()}`
            : kit.matrix({ key: 'note', rows: criteria, columns: content.levels.map(level => ({ id: level.id, label: level.id, sub: level.label })), head: 'Critère', round: true, progressive: true })}
          ${reviewing ? '' : `<p class="audit-total" data-live="total">${esc(totalText())}</p>`}
        </section>
        <section class="k-panel audit-priority">
          <h2>2. Choisissez votre priorité</h2>
          ${reviewing ? `${kit.yours('Votre modification prioritaire', ex.value('priority'))}${kit.model('Corrigé modèle', content.priority)}`
            : `<p class="k-instruction">Quelle modification aurait le plus fort impact sur ce pitch ?</p>
              ${ex.field('priority', 'La modification prioritaire', { placeholder: 'La modification prioritaire…', max: 240, rows: 7, hideLabel: true })}
              <p class="k-muted">Une seule priorité, formulée concrètement.</p>
              <p class="audit-lock">${kit.icon('lock', { size: 18 })}<span>Notez d’abord les ${criteria.length} critères pour écrire votre priorité.</span></p>`}
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

  /* La priorité reste visible, mais ne s’écrit qu’une fois les six critères
   * notés. On lit les cases cochées, à jour dès le clic. */
  function lockPriority() {
    const panel = document.querySelector('.audit-priority');
    const field = panel && panel.querySelector('textarea');
    if (!field) return;
    const rated = criteria.every((_, i) => document.querySelector(`input[name="note${i}"]:checked`));
    panel.classList.toggle('is-locked', !rated);
    field.disabled = !rated;
  }
  document.addEventListener('change', event => { if (event.target.closest && event.target.closest('.k-matrix')) lockPriority(); });

  kit.live(() => ({ total: esc(totalText()), score: esc(totalText().replace('Total : ', '')) }));

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.5', [
    { target: '.audit-pitch', title: 'Le pitch à analyser', text: 'Lisez attentivement ce discours : c’est lui que vous allez évaluer.' },
    { target: '.audit-layout .k-matrix .k-matrix-label', title: 'Les critères', text: 'Ici s’affiche le critère à juger. Il y en a six.' },
    { target: '.audit-layout .k-matrix th:not(.k-matrix-label), .audit-layout .k-matrix td', title: 'Notez le pitch', text: 'Pour chaque critère, choisissez une note :',
      items: [
        { key: '0', tone: 'coral', text: 'à retravailler ;' },
        { key: '1', tone: 'gold', text: 'en bonne voie ;' },
        { key: '2', tone: 'green', text: 'maîtrisé.' }
      ],
      after: 'Chaque note fait apparaître le critère suivant.' },
    { target: '.audit-total', title: 'Le total', text: 'Votre total sur 12 se calcule au fur et à mesure de vos notes.' },
    { target: '.audit-layout > .k-panel:nth-child(2)', title: 'Votre priorité', text: 'Écrivez LA modification qui rendrait ce pitch plus percutant : une seule, formulée concrètement.',
      after: 'Elle s’ouvre une fois les six critères notés.' },
    { target: '.k-bar .k-submit', title: 'Valider mon audit', text: 'Vous découvrez ensuite le corrigé :',
      items: [
        { symbol: 'scales', tone: 'blue', text: 'vos notes sont comparées au repère, critère par critère ;' },
        { symbol: 'check', tone: 'green', text: 'un écart d’un point reste accepté.' }
      ] }
  ]);

  ex.mount('s2-2.5', { screen, validate, feedback, onMount: lockPriority, compactFeedback: true });
})();
