/* S4 1.1 · Remettez l’ouverture dans le bon ordre.
 *
 * Cinq phrases à placer. Une carte à la fois, les cinq positions listées
 * à droite : on clique sur une place au lieu de viser une zone.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const sorter = window.AtelierSorter;
  const { icon, esc } = core;
  const content = window.ATELIER_S4['1.1'];
  const cards = content.cards;

  /* Ce que chaque phrase accomplit dans l'ouverture, affiché au corrigé :
   * c'est la logique de la séquence qu'il faut retenir, pas l'ordre appris
   * par cœur. Indexé par position attendue. */
  const roles = [
    { label: 'Accueillir', symbol: 'chat' },
    { label: 'Se présenter', symbol: 'users' },
    { label: 'Annoncer l’objet', symbol: 'document' },
    { label: 'Cadrer la durée', symbol: 'clock' },
    { label: 'Ouvrir l’écoute', symbol: 'ear' }
  ];

  // Une position n'accueille qu'une phrase : `unique` libère l'ancienne.
  const placement = window.AtelierPlacement.create({ total: cards.length, unique: true });

  /* Le récapitulatif affiche les phrases dans l'ordre choisi. */
  const inChosenOrder = () => {
    const list = placement.list();
    return cards
      .map((card, i) => ({ card, position: Number(list[i]) }))
      .sort((a, b) => a.position - b.position);
  };

  function screen() {
    if (ex.reviewing()) return reviewScreen();

    if (sorter.showingRecap(placement)) {
      const ordered = inChosenOrder();
      return `<form novalidate>${sorter.recapScreen({
        cards: ordered.map(({ card }) => card),
        choices: cards.map((_, i) => ({ id: String(i + 1), label: `Position ${i + 1}` })),
        placement: {
          list: () => ordered.map(({ position }) => String(position))
        },
        title: 'Vérifiez votre séquence',
        intro: 'Cinq phrases placées. Relisez l’enchaînement avant de valider.',
        lock: 'Le corrigé apparaît après validation.',
        submitLabel: 'Valider mon ordre'
      })}</form>`;
    }

    return sorter.slotScreen({
      cards, placement,
      eyebrow: content.eyebrow,
      title: content.title,
      intro: 'Placez cinq phrases pour construire une ouverture fluide.',
      lock: `Le corrigé apparaît après les ${cards.length} cartes.`
    });
  }

  /* Le corrigé montre l'ordre attendu, avec le rôle de chaque phrase et
   * la place que l'apprenant lui avait donnée. */
  function reviewScreen() {
    const list = placement.list();
    const expected = cards
      .map((card, i) => ({ card, index: i }))
      .sort((a, b) => a.card.position - b.card.position);
    const right = cards.filter((card, i) => Number(list[i]) === card.position).length;

    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Une ouverture fluide</h1>
        <p class="subtitle">Voici un enchaînement possible pour passer de l’accueil à l’écoute.</p>
        <p class="result-score">${right} / ${cards.length} à la place attendue</p>
      </header>

      <ol class="result-list">${expected.map(({ card, index }) => {
        const yours = list[index];
        const ok = Number(yours) === card.position;
        const role = roles[card.position - 1] || {};
        return `<li class="result-row ${ok ? 'is-ok' : 'is-ko'}">
          <span class="result-number">${String(card.position).padStart(2, '0')}</span>
          <span class="result-body">
            <span class="result-role">${icon(role.symbol, { size: 15 })}<span>${esc(role.label)}</span></span>
            <strong>« ${esc(card.text)} »</strong>
          </span>
          <span class="result-answer ${ok ? 'tone-ok' : 'tone-neutral'}">Votre place : ${esc(String(yours ?? 'aucune'))}</span>
          <span class="result-mark">${icon(ok ? 'check' : 'close', { size: 16, label: ok ? 'correct' : 'incorrect' })}</span>
        </li>`;
      }).join('')}</ol>

      <p class="result-note">${esc(content.feedback[content.feedback.length - 1])}</p>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate() {
    const left = placement.remaining();
    return left ? [{ key: 'placed', message: `Il reste ${left} phrase${left > 1 ? 's' : ''} à placer.` }] : [];
  }

  function feedback() {
    // Le score est déjà en tête du corrigé : seule la leçon reste.
    return [content.feedback[0]];
  }

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s4-1.1', [
    { target: '.sequence-card', title: 'La phrase à placer', text: 'Les 5 phrases arrivent une par une, dans le désordre.' },
    { target: '.slot-list', title: 'La séquence', text: 'Cliquez sur la place qui revient à la phrase, de 01 (le début de l’ouverture) à 05 (la fin).',
      after: 'Une place n’accueille qu’une phrase.' },
    { target: '.sequence-count', title: 'Votre avancement', text: 'Le compteur indique combien de phrases sont placées. Après les 5, vous relisez votre séquence avant de valider.' }
  ]);

  ex.mount('s4-1.1', {
    screen, validate, feedback, compactFeedback: true,
    onMount: () => sorter.wire(placement, cards)
  });
})();
