/* S4 2.1 · Associez chaque réponse à son attitude.
 *
 * Six réponses du commercial à ranger dans les six attitudes de Porter.
 * Une réponse à la fois, les six attitudes en boutons, puis un
 * récapitulatif relisible avant validation.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const sorter = window.AtelierSorter;
  const { icon, esc } = core;
  const content = window.ATELIER_S4['2.1'];
  const cards = content.cards;

  const choices = content.zones.map(zone => ({
    id: zone.id,
    label: zone.label,
    symbol: zone.symbol
  }));

  // Une attitude ne reçoit qu'une réponse.
  const placement = window.AtelierPlacement.create({ total: cards.length, unique: true });

  const attitude = id => (choices.find(choice => choice.id === id) || {});

  function screen() {
    if (ex.reviewing()) return reviewScreen();

    const common = { cards, choices, placement };
    return sorter.showingRecap(placement)
      ? `<form novalidate>${sorter.recapScreen({
          ...common,
          title: 'Vérifiez vos associations',
          intro: 'Six réponses classées. Relisez-les avant de valider.',
          lock: 'Le corrigé apparaît après validation.',
          submitLabel: 'Valider mes associations'
        })}</form>`
      : sorter.cardScreen({
          ...common,
          eyebrow: content.eyebrow,
          title: 'Quelle attitude reconnaissez-vous ?',
          intro: `Le client dit : « ${content.clientSays} »`,
          hint: 'Classez cette réponse parmi les six attitudes.',
          lock: `Le corrigé apparaîtra après validation des ${cards.length} cartes.`
        });
  }

  /* Chaque réponse est relue avec l'attitude attendue et ce qui la
   * caractérise : c'est la distinction entre attitudes qu'il faut retenir. */
  function reviewScreen() {
    const list = placement.list();
    const right = cards.filter((card, i) => list[i] === card.answer).length;

    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Vos six associations</h1>
        <p class="subtitle">Regardez ce qui distingue chaque attitude.</p>
        <p class="result-score">${right} / ${cards.length} ${right > 1 ? 'correctes' : 'correcte'}</p>
      </header>

      <ol class="result-list">${cards.map((card, i) => {
        const ok = list[i] === card.answer;
        const expected = attitude(card.answer);
        const chosen = attitude(list[i]);
        return `<li class="result-row ${ok ? 'is-ok' : 'is-ko'}">
          <span class="result-number">${String(i + 1).padStart(2, '0')}</span>
          <span class="result-body">
            <strong>« ${esc(card.text)} »</strong>
            <span class="result-why">${esc(card.why)}</span>
            ${ok ? '' : `<span class="result-yours">Votre choix : <strong>${esc(chosen.label || 'aucun')}</strong></span>`}
          </span>
          <span class="result-answer ${ok ? 'tone-ok' : 'tone-bad'}">
            ${icon(expected.symbol, { size: 16 })}<span>${esc(expected.label)}</span>
          </span>
          <span class="result-mark">${icon(ok ? 'check' : 'close', { size: 16, label: ok ? 'correct' : 'incorrect' })}</span>
        </li>`;
      }).join('')}</ol>

      <p class="result-note">${esc(content.feedback[1])}</p>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate() {
    const left = placement.remaining();
    return left ? [{ key: 'placed', message: `Il reste ${left} réponse${left > 1 ? 's' : ''} à classer.` }] : [];
  }

  function feedback() {
    const list = placement.list();
    const right = cards.filter((card, i) => list[i] === card.answer).length;
    return [`Vous avez classé correctement ${right} réponse${right > 1 ? 's' : ''} sur ${cards.length}.`, content.feedback[0]];
  }

  ex.mount('s4-2.1', {
    screen, validate, feedback, compactFeedback: true,
    onMount: () => sorter.wire(placement, cards)
  });
})();
