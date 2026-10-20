/* S3 1.2 · Associer chaque étape à son rôle.
 *
 * Six rôles à rattacher aux six étapes de la méthode. Le rôle à placer à
 * gauche ; à droite, les six étapes en tuiles à choisir (pas un parcours :
 * on en choisit une), chacune montrant le rôle qu'on lui a donné. Puis un récapitulatif relisible avant
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
      : playScreen();
  }

  /* Les boutons reprennent les actions de AtelierSorter (sort-card,
   * goto-card) : sorter.wire les branche. */
  function playScreen() {
    const list = placement.list();
    const index = Math.min(ex.cursor(), cards.length - 1);
    const done = placement.placedCount();
    const holder = id => list.findIndex(zone => String(zone) === String(id));

    const deck = cards.map((_, i) => {
      const state = i === index ? 'is-current' : list[i] != null ? 'is-done' : '';
      return `<button type="button" class="rl-deck-item ${state}" data-action="goto-card" data-index="${i}" aria-current="${i === index}">
        ${list[i] != null && i !== index ? icon('check', { size: 14 }) : ''}<span>Rôle ${i + 1}</span></button>`;
    }).join('');

    const steps = choices.map((choice, k) => {
      const at = holder(choice.id);
      const mine = at === index;
      return `<li><button type="button" class="rl-step ${at !== -1 ? 'is-filled' : ''} ${mine ? 'is-mine' : ''}" data-action="sort-card" data-zone="${esc(choice.id)}" aria-pressed="${mine}">
        <span class="rl-step-icon">${icon(choice.symbol, { size: 22 })}</span>
        <span class="rl-step-body"><strong>${esc(method[k].step)}</strong>
          <small>${at !== -1 ? `« ${esc(cards[at].text)} »` : 'Pas encore de rôle'}</small></span>
        ${at !== -1 ? `<span class="rl-step-tag">Rôle ${at + 1}</span>` : ''}
      </button></li>`;
    }).join('');

    return `<div class="rl">
      <header class="rl-head">
        <div>${core.pageTitle(content.eyebrow, content.title, 'Lisez le rôle, puis cliquez sur l’étape de la méthode qui le remplit.')}</div>
        <div class="rl-head-side">${window.AtelierKit ? window.AtelierKit.tourButton() : ''}<p class="rl-count"><strong>${done} / ${cards.length}</strong> rôles associés</p></div>
      </header>
      <div class="rl-layout">
        <section class="rl-side">
          <article class="rl-card">
            <p class="rl-card-tag">Rôle ${index + 1} sur ${cards.length}</p>
            <span class="rl-card-quote" aria-hidden="true">${icon('quote', { size: 34 })}</span>
            <p class="rl-card-text">${esc(cards[index].text)}</p>
            <p class="rl-card-ask">${icon('pointer', { size: 18 })}<span>Quelle étape remplit ce rôle ?</span></p>
          </article>
          <nav class="rl-deck" aria-label="Les six rôles">${deck}</nav>
          ${(window.ATELIER_BRIEFINGS || {})[ex.current.key] ? core.button('Revoir la consigne', 'show-briefing', 'text-button review-brief') : ''}
          <p class="rl-note">${icon('lock', { size: 15 })}<span>Vous relisez vos six choix avant de valider ; le corrigé vient ensuite.</span></p>
        </section>
        <section class="panel rl-method">
          <h2>Choisissez l’étape qui remplit ce rôle</h2>
          <p class="k-muted rl-method-help">Les six étapes de la méthode : cliquez sur l’une d’elles.</p>
          <ol class="rl-steps">${steps}</ol>
        </section>
      </div>
    </div>`;
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

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s3-1.2', [
    { target: '.rl-card', title: 'Le rôle à placer', text: 'Chaque carte décrit ce que fait une étape de la méthode de traitement des objections.' },
    { target: '.rl-method', title: 'Les six étapes', text: 'Lisez le rôle affiché, puis sélectionnez l’étape de la méthode qui lui correspond le mieux.',
      items: [
        { symbol: 'check', tone: 'green', text: 'Une fois choisie, l’étape affiche le rôle que vous lui avez donné : vous voyez où vous en êtes.' },
        { symbol: 'refresh', tone: 'gold', text: 'Vous changez d’avis ? Cliquez simplement sur une autre étape.' }
      ] },
    { target: '.rl-deck', title: 'Les six rôles', text: 'Le rôle suivant s’affiche tout seul. Cliquez sur « Rôle 1 » à « Rôle 6 » pour revenir sur un rôle et changer votre choix.' },
    { target: '.rl-count', title: 'Votre avancement', text: 'Une fois les 6 rôles associés, vous relisez vos choix avant de valider.' }
  ]);

  ex.mount('s3-1.2', {
    screen, validate, feedback, compactFeedback: true,
    onMount: () => sorter.wire(placement, cards)
  });
})();
