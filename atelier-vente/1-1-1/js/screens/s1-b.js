/* S1 B · S’adapter au client pressé.
 * Formuler une entrée en matière, puis nommer le réglage majeur.
 * Puis s'autoévaluer sur la grille, comme en S1 A ; le corrigé vient après.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S1;
  const { required } = window.ExerciseRules;

  /* L'exercice en deux étapes, une question à la fois ; le client illustré
   * reste à droite. Le corrigé, lui, montre les deux étapes ensemble. */
  const STEPS = [
    { key: 'opening', title: 'Montrez rapidement au client que vous avez compris son rythme et son besoin d’autonomie.', hint: 'Votre entrée en matière · 3 à 4 phrases',
      body: () => ex.field('opening', 'Votre entrée en matière', { placeholder: 'Écrivez ce que vous diriez au client…', max: 600, rows: 5, hideLabel: true }) },
    { key: 'adjustment', title: 'Précisez le réglage majeur effectué pour vous synchroniser avec le client.', hint: 'Une phrase suffit · par exemple le rythme, le ton, la distance ou la précision',
      body: () => ex.field('adjustment', 'Votre réglage majeur', { placeholder: 'Expliquez le principal ajustement effectué…', max: 250, rows: 4, hideLabel: true }) }
  ];

  function wizard(current) {
    const at = Math.min(ex.wizardAt(), STEPS.length - 1);
    const step = STEPS[at];
    const last = at === STEPS.length - 1;
    return `<form class="wiz-layout" novalidate>
      <section class="wiz-main">
        ${core.pageTitle('Mise en situation', 'Vente en boutique · le client pressé et distant')}
        ${core.callout('Un client entre dans votre magasin d’un pas rapide. Il jette des coups d’œil réguliers à sa montre, se montre particulièrement sur la réserve et évite le contact visuel prolongé. Il a manifestement un besoin précis, mais craint d’être accaparé par un discours commercial trop lourd.')}
        <div class="signals"><strong>Signaux observés</strong>${core.chips(['Pressé', 'Réservé', 'Besoin précis'])}</div>
        <div class="wiz-step is-step-${at + 1}">
          <div class="wiz-prompt"><span class="wiz-bulb" aria-hidden="true">${icon('lightbulb', { size: 30 })}</span><div><h2>${esc(step.title)}</h2><p>${esc(step.hint)}</p></div></div>
          ${step.body()}
          ${last ? core.errorsBox() : ''}
          ${last
            ? `<div class="wiz-actions is-split">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon')}<button type="submit" class="button primary">Valider mon approche</button></div>`
            : `<div class="wiz-actions">${core.button(`<span>Continuer</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${step.key}"`)}</div>`}
        </div>
      </section>
      <aside class="wiz-aside">
        <div class="wiz-aside-head"><div class="wiz-aside-tools">${window.AtelierKit ? window.AtelierKit.contextButton() + window.AtelierKit.tourButton() : ''}${core.stepPill(at, STEPS.length)}</div></div>
        <div class="wiz-art is-whole is-soft">${core.illustration(current)}</div>
      </aside>
      ${core.feedbackBox()}
    </form>`;
  }

  /* L'autoévaluation, une fois les deux étapes écrites : l'approche à
   * gauche pour la relire, la grille à droite. Styles : extras.css (.self-*). */
  const selfKey = i => `self${i}`;
  const selfShown = () => ex.value('selfCheck') === true;

  function selfScreen() {
    return `<section class="self-eval">
      ${window.AtelierKit ? `<div class="tour-corner">${window.AtelierKit.contextButton()}</div>` : ''}
      ${core.pageTitle('Autoévaluation', 'Votre approche est-elle une ouverture réussie ?', 'Vous évaluez votre approche (à gauche). Pour chacun des six critères d’une ouverture réussie, dites si elle y répond.')}
      <div class="self-layout">
        <aside class="panel self-recap">
          <h2>Votre approche</h2>
          ${VERDICTS.map((row, i) => `<div class="self-recap-item"><span class="an-n" aria-hidden="true">${i + 1}</span><div><h3>${esc(row.title)}</h3><p>« ${esc(ex.value(row.key))} »</p></div></div>`).join('')}
        </aside>
        <form class="panel self-form" novalidate>
          <h2>Les critères</h2>
          ${ex.selfList(content.rubric, selfKey)}
          ${core.errorsBox()}
          <div class="wiz-actions">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Modifier mon approche</span>`, 'self-back', 'text-button with-icon')}<button type="submit" class="button primary">Voir le corrigé</button></div>
        </form>
      </div>
    </section>`;
  }

  /* Le corrigé, comme celui de l'analyse (S1 A) : pleine largeur, une ligne
   * par étape, la réponse à gauche, le retour teinté à droite. La mise en
   * situation reste à portée dans une fenêtre. Styles : extras.css (.an-*). */
  const VERDICTS = [
    { key: 'opening', title: 'Votre entrée en matière', tone: 'neutral', label: 'Une réponse possible', symbol: 'lightbulb' },
    { key: 'adjustment', title: 'Votre réglage majeur', tone: 'good', label: 'Un réglage possible', symbol: 'lightbulb' }
  ];

  function reviewScreen() {
    const notes = content.feedback.B;
    // Le score estimatif, intégré réponse par réponse (grille « integre »).
    const analyse = window.AtelierAnalyse;
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES['s1-B'];
    const result = analyse && grid ? analyse.score(grid, ex.values()) : null;
    // La couleur suit le résultat : tout trouvé, rien trouvé, entre les deux.
    const toneOf = bloc => { const lines = bloc.lines.filter(l => l.kind !== 'warn'); const ok = lines.filter(l => l.kind === 'ok').length; return ok === lines.length ? 'good' : ok === 0 ? 'bad' : 'neutral'; };
    return `<section class="an-review">
      <header class="an-head">
        ${core.pageTitle('Corrigé', 'Votre approche', 'Voici votre approche, étape par étape, avec un retour sur chacune.')}
        ${core.button(`${icon('document', { size: 20 })}<span>Voir la mise en situation</span>`, 'scenario', 'subtle with-icon')}
      </header>
      ${result ? `<section class="panel an-score">${core.panelTitle('Votre score estimatif')}<section class="ana-score is-head" aria-label="Indicateur de points">${analyse.head(result)}</section></section>` : ''}
      <ol class="an-rows">${VERDICTS.map((row, i) => `<li class="an-row tone-${result ? toneOf(result.blocs[i]) : row.tone}">
        <div class="an-yours">
          <span class="an-n" aria-hidden="true">${i + 1}</span>
          <div><h2>${esc(row.title)}</h2><p>« ${result ? analyse.answer(result.blocs[i]) : esc(ex.value(row.key))} »</p>${result ? analyse.lines(result.blocs[i], { withText: false }) : ''}</div>
        </div>
        <div class="an-verdict">
          <span class="an-mark" aria-hidden="true">${icon(row.symbol, { size: 20, strokeWidth: 3 })}</span>
          <div><h3>${esc(row.label)}</h3><p>${esc(notes[i])}</p></div>
        </div>
      </li>`).join('')}</ol>
      ${ex.selfSummary(content.rubric, selfKey, 'votre approche')}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    if (selfShown()) return selfScreen();
    return wizard(core.findExercise('s1-B'));
  }

  const answerErrors = values => [
    required(values, 'opening', 'Votre entrée en matière', 600),
    required(values, 'adjustment', 'Votre réglage majeur', 250)
  ].filter(Boolean);

  // Sur la grille, chaque critère attend sa réponse.
  const validate = values => (selfShown() ? ex.selfErrors(content.rubric, selfKey, values, 'dites si votre approche y répond') : answerErrors(values));

  // Les deux étapes remplies, « Valider mon approche » ouvre la grille au lieu du corrigé.
  function intercept(values) {
    if (selfShown() || answerErrors(values).length) return false;
    ex.setValue('selfCheck', true);
    return true;
  }

  /* Le corrigé modèle et le réglage attendu sont posés dans le corrigé : le
   * bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  function onMount() {
    core.$('[data-action="scenario"]')?.addEventListener('click', () => core.openDialog(
      'Vente en boutique · le client pressé et distant',
      `${core.callout('Un client entre dans votre magasin d’un pas rapide. Il jette des coups d’œil réguliers à sa montre, se montre particulièrement sur la réserve et évite le contact visuel prolongé. Il a manifestement un besoin précis, mais craint d’être accaparé par un discours commercial trop lourd.')}
       <div class="signals"><strong>Signaux observés</strong>${core.chips(['Pressé', 'Réservé', 'Besoin précis'])}</div>
       ${core.note('Montrez rapidement au client que vous avez compris son rythme et son besoin d’autonomie.')}`));
    core.$('[data-action="self-back"]')?.addEventListener('click', () => {
      ex.setValue('selfCheck', false);
      core.persist();
      ex.render();
    });
  }

  // À l'arrivée sur l'autoévaluation : ce qu'on a sous les yeux.
  if (window.AtelierKit) window.AtelierKit.selfContext('.self-eval', [
    ['eye', 'Ce que vous évaluez', 'Votre approche : votre entrée en matière et votre réglage majeur (à gauche).'],
    ['list', 'Une ouverture réussie', ['Accueil et climat : saluer, remercier, mettre à l’aise.', 'Présentation : dire qui vous êtes, votre fonction, votre entreprise.', 'Cadrage : annoncer l’objet, le déroulé ou la durée.', 'Transition vers l’écoute : donner la parole au client.', 'Posture centrée client : parler de lui, sans monopoliser la parole.', 'Adaptation : ajuster au client, au canal et à la situation.']],
    ['list', 'Ce qui vous est demandé', 'Pour chaque critère, dites si votre approche y répond : « Oui », « En partie » ou « Non ».'],
    ['checkCircle', 'Ensuite', 'Le corrigé s’affiche. Vous comparez votre regard avec le sien.']
  ]);

  // À l'arrivée : la situation, les critères d'une ouverture réussie, ce qui est demandé.
  if (window.AtelierKit) window.AtelierKit.context([
    ['users', 'La situation', 'En boutique, un client pressé veut regarder seul, à son rythme.'],
    ['list', 'Une ouverture réussie', ['Accueil et climat : saluer, remercier, mettre à l’aise.', 'Présentation : dire qui vous êtes, votre fonction, votre entreprise.', 'Cadrage : annoncer l’objet, le déroulé ou la durée.', 'Transition vers l’écoute : donner la parole au client.', 'Posture centrée client : parler de lui, sans monopoliser la parole.', 'Adaptation : ajuster au client, au canal et à la situation.']],
    ['pencil', 'Ce qui vous est demandé', 'Écrire votre entrée en matière, puis dire ce que vous avez adapté à ce client.']
  ]);

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s1-B', [
    { target: '.wiz-main .callout, .wiz-main .signals', title: 'La situation', text: 'Lisez la situation et les signaux du client.' },
    { target: '.wiz-step .field', show: '.wiz-step.is-step-1', title: 'Votre réponse', text: 'Écrivez ici ce que vous diriez au client.' },
    { target: '.step-pill', title: 'Deux étapes', text: 'Vous répondez à une question à la fois :',
      items: [
        { key: '1', tone: 'blue', text: 'votre entrée en matière, en 3 à 4 phrases ;' },
        { key: '2', tone: 'coral', text: 'votre réglage majeur, en une phrase.' }
      ] },
    { target: '.wiz-step .wiz-actions', show: '.wiz-step.is-step-1', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: '« Continuer » ouvre l’étape suivante.' },
        { symbol: 'checkCircle', tone: 'green', text: 'À la deuxième étape, vous validez, puis vous faites votre autoévaluation.' },
        { symbol: 'document', tone: 'blue', text: 'Le corrigé s’affiche ensuite.' }
      ] },
    // Second temps, à l'arrivée sur l'étape 2 : ce qui est nouveau par rapport à l'étape 1.
    { later: true, target: '.wiz-step.is-step-2', title: 'Étape 2 : le réglage majeur',
      text: 'Votre entrée en matière est écrite. Dites maintenant, en une phrase, ce que vous avez adapté pour suivre ce client.' }
  ]);

  ex.mount('s1-B', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
