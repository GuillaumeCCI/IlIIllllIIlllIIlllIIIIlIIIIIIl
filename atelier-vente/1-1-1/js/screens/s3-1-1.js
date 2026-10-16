/* S3 1.1 · Les bons réflexes face à une objection.
 *
 * Huit comportements à trier. Une carte à la fois, deux boutons, puis un
 * récapitulatif avant validation : plus de zone à viser, et le clavier
 * fonctionne sans dispositif particulier.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const sorter = window.AtelierSorter;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.1'];
  const cards = content.cards;

  const choices = [
    { id: 'good', label: 'Bon réflexe', symbol: 'check', tone: 'good' },
    { id: 'bad', label: 'À éviter', symbol: 'close', tone: 'bad' }
  ];

  const placement = window.AtelierPlacement.create({ total: cards.length });

  function screen() {
    if (ex.reviewing()) return reviewScreen();

    const common = { cards, choices, placement };
    return sorter.showingRecap(placement)
      ? `<form novalidate>${sorter.recapScreen({
          ...common,
          title: 'Vérifiez votre classement',
          intro: 'Huit cartes classées. Relisez-les avant de valider.',
          lock: 'Le corrigé apparaît après validation.',
          submitLabel: 'Valider mon classement'
        })}</form>`
      : sorter.cardScreen({
          ...common,
          eyebrow: content.eyebrow,
          title: content.title,
          intro: 'Pour chaque situation, choisissez le bon côté.',
          hint: 'Choisissez un côté pour passer à la carte suivante.',
          lock: `La correction apparaît après les ${cards.length} cartes.`
        });
  }

  /* Une fois validé, chaque carte est relue avec son verdict. */
  function reviewScreen() {
    const list = placement.list();
    const right = cards.filter((card, i) => list[i] === card.answer).length;
    const label = id => choices.find(choice => choice.id === id).label;

    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Votre classement</h1>
        <p class="subtitle">${esc(content.feedback)}</p>
        <p class="result-score">${right} / ${cards.length} ${right > 1 ? 'correctes' : 'correcte'}</p>
      </header>
      <ol class="result-list">${cards.map((card, i) => {
        const ok = list[i] === card.answer;
        return `<li class="result-row ${ok ? 'is-ok' : 'is-ko'}">
          <span class="result-number">${String(i + 1).padStart(2, '0')}</span>
          <span class="result-body">
            <strong>${esc(card.text)}</strong>
            <span class="result-why">${esc(card.why)}</span>
          </span>
          <span class="result-answer tone-${card.answer}">${esc(label(card.answer))}</span>
          <span class="result-mark">${icon(ok ? 'check' : 'close', { size: 16, label: ok ? 'correct' : 'incorrect' })}</span>
        </li>`;
      }).join('')}</ol>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate() {
    const left = placement.remaining();
    return left ? [{ key: 'placed', message: `Il reste ${left} carte${left > 1 ? 's' : ''} à classer.` }] : [];
  }

  /* Le détail est déjà dans l'écran de relecture : le pavé reste court. */
  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  ex.mount('s3-1.1', {
    screen, validate, feedback, compactFeedback: true,
    onMount: () => sorter.wire(placement, cards)
  });
})();
