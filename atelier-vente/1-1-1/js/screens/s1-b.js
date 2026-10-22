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
    { key: 'adjustment', title: 'Précisez le réglage majeur effectué pour vous synchroniser avec le client.', hint: 'Votre réglage majeur · une phrase suffit',
      body: () => core.chips(['Rythme', 'Ton', 'Distance', 'Précision']) + ex.field('adjustment', 'Votre réglage majeur', { placeholder: 'Expliquez le principal ajustement effectué…', max: 250, rows: 4, hideLabel: true }) }
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
        <div class="wiz-step">
          <div class="wiz-prompt"><span class="wiz-bulb" aria-hidden="true">${icon('lightbulb', { size: 30 })}</span><div><h2>${esc(step.title)}</h2><p>${esc(step.hint)}</p></div></div>
          ${step.body()}
          ${last ? '' : `<div class="wiz-actions">${core.button(`<span>Continuer</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${step.key}"`)}</div>`}
        </div>
        ${last ? `${core.errorsBox()}<div class="wiz-back">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon')}</div>${ex.actions('Valider mon approche')}` : ''}
      </section>
      <aside class="wiz-aside">
        <div class="wiz-aside-head">${core.stepPill(at, STEPS.length)}</div>
        <div class="wiz-art">${core.illustration(current)}</div>
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
      ${core.pageTitle('Autoévaluation', 'Votre approche répond-elle à ces critères ?', 'Relisez votre approche. Pour chaque critère, dites si elle y répond. Le corrigé s’affiche ensuite.')}
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
    { key: 'opening', title: 'Votre entrée en matière', tone: 'neutral', label: 'Corrigé modèle', symbol: 'sparkle' },
    { key: 'adjustment', title: 'Votre réglage majeur', tone: 'good', label: 'Réglage attendu', symbol: 'check' }
  ];

  function reviewScreen() {
    const notes = content.feedback.B;
    return `<section class="an-review">
      <header class="an-head">
        ${core.pageTitle('Corrigé', 'Votre approche', 'Voici votre approche, étape par étape, avec un retour sur chacune.')}
        ${core.button(`${icon('document', { size: 20 })}<span>Voir la mise en situation</span>`, 'scenario', 'subtle with-icon')}
      </header>
      <ol class="an-rows">${VERDICTS.map((row, i) => `<li class="an-row tone-${row.tone}">
        <div class="an-yours">
          <span class="an-n" aria-hidden="true">${i + 1}</span>
          <div><h2>${esc(row.title)}</h2><p>« ${esc(ex.value(row.key))} »</p></div>
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

  ex.mount('s1-B', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
