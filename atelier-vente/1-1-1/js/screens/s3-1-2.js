/* S3 1.2 · Associer chaque étape à son rôle.
 *
 * Six rôles à rattacher aux six étapes de la méthode. Une carte à la
 * fois, les six étapes en boutons, puis un récapitulatif relisible avant
 * validation.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const sorter = window.AtelierSorter;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.2'];
  const method = window.ATELIER_S3.method;

  /* Les réponses sont les six étapes ; les cartes sont les rôles, dans un
   * ordre mélangé pour que l'association demande un vrai choix. */
  const choices = method.map((item, i) => ({
    id: String(i),
    label: `${i + 1}. ${item.step}`,
    symbol: item.symbol
  }));

  const order = [2, 0, 4, 1, 5, 3];
  const cards = order.map(i => ({ text: method[i].role, answer: String(i) }));

  // Une étape ne reçoit qu'un rôle : `unique` libère la précédente.
  const placement = window.AtelierPlacement.create({ total: cards.length, unique: true });

  function screen() {
    if (ex.reviewing()) return reviewScreen();

    const common = { cards, choices, placement };
    return sorter.showingRecap(placement)
      ? `<form novalidate>${sorter.recapScreen({
          ...common,
          title: 'Vérifiez vos associations',
          intro: 'Six choix enregistrés. Relisez-les avant de valider.',
          lock: 'Le corrigé apparaît après validation.',
          submitLabel: 'Valider mes associations'
        })}</form>`
      : sorter.cardScreen({
          ...common,
          eyebrow: content.eyebrow,
          title: content.title,
          intro: 'Lisez la carte, puis choisissez l’étape correspondante.',
          hint: 'Vous pourrez revoir vos six choix avant validation.',
          lock: 'Le corrigé apparaît après les six cartes.'
        });
  }

  /* Le corrigé suit l'ordre de la méthode, pas celui des cartes : c'est
   * la séquence qu'il faut retenir. */
  function reviewScreen() {
    const list = placement.list();
    const right = cards.filter((card, i) => list[i] === card.answer).length;

    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Vos associations, en un coup d’œil</h1>
        <p class="subtitle">La méthode, étape par étape.</p>
        <p class="result-score">${right} / ${cards.length} ${right > 1 ? 'correctes' : 'correcte'}</p>
      </header>

      <ol class="result-list">${method.map((item, stepIndex) => {
        const cardIndex = cards.findIndex(card => card.answer === String(stepIndex));
        const ok = list[cardIndex] === String(stepIndex);
        const chosenStep = method[Number(list[cardIndex])];
        return `<li class="result-row ${ok ? 'is-ok' : 'is-ko'}">
          <span class="result-number">${String(stepIndex + 1).padStart(2, '0')}</span>
          <span class="result-body">
            <strong>${esc(item.step)}</strong>
            <span class="result-why">${esc(item.role)}</span>
            ${ok ? '' : `<span class="result-yours">Votre choix : <strong>${esc(chosenStep ? chosenStep.step : 'aucun')}</strong></span>`}
          </span>
          <span class="result-answer ${ok ? 'tone-ok' : 'tone-bad'}">${ok ? 'Réussi' : 'À revoir'}</span>
          <span class="result-mark">${icon(ok ? 'check' : 'close', { size: 16, label: ok ? 'correct' : 'incorrect' })}</span>
        </li>`;
      }).join('')}</ol>

      <p class="result-note">${esc(content.feedback)}</p>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate() {
    const left = placement.remaining();
    return left ? [{ key: 'placed', message: `Il reste ${left} carte${left > 1 ? 's' : ''} à associer.` }] : [];
  }

  function feedback() {
    const list = placement.list();
    const right = cards.filter((card, i) => list[i] === card.answer).length;
    return [`Vous avez associé correctement ${right} carte${right > 1 ? 's' : ''} sur ${cards.length}.`];
  }

  ex.mount('s3-1.2', {
    screen, validate, feedback, compactFeedback: true,
    onMount: () => sorter.wire(placement, cards)
  });
})();
