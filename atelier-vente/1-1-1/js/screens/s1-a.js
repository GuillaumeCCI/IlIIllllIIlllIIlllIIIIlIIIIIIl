/* S1 A · Analyser une accroche.
 * Écouter, relever les points forts et les axes d’amélioration, réécrire.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const media = window.AtelierMedia;
  const content = window.ATELIER_S1;

  /* L'analyse, une question à la fois : la pastille d'étapes au-dessus, un
   * grand numéro, le champ, puis « Continuer » (ou la validation à la fin). */
  const STEPS = [
    { key: 'strengths', title: 'Ce qui fonctionne', body: () => ex.field('strengths', 'Ce qui fonctionne', { placeholder: 'Notez les points forts de l’accroche…', rows: 6, hideLabel: true }) },
    { key: 'improvements', title: 'Axes d’amélioration', hint: 'Ajoutez 2 à 3 points précis', body: () => core.chips(['Clarté', 'Adaptation au client']) + ex.field('improvements', 'Axes d’amélioration', { placeholder: 'Vos axes d’amélioration…', rows: 6, hideLabel: true }) },
    { key: 'rewrite', title: 'Votre version améliorée', body: () => ex.field('rewrite', 'Votre version améliorée', { placeholder: 'Réécrivez l’accroche ici…', max: 800, rows: 6, hideLabel: true }) }
  ];

  function analysisStep() {
    const at = Math.min(ex.wizardAt(), STEPS.length - 1);
    const step = STEPS[at];
    const last = at === STEPS.length - 1;
    return `<div class="wiz-column">
      ${core.stepPill(at, STEPS.length)}
      <form class="panel answer-panel wiz-panel" novalidate>
        <div class="wiz-panel-head">${core.rubricButton()}</div>
        <div class="wiz-number"><span>${at + 1}</span><div><h2>${esc(step.title)}</h2>${step.hint ? `<p>${esc(step.hint)}</p>` : ''}</div></div>
        ${step.body()}
        ${last
          ? `${core.errorsBox()}<div class="wiz-actions">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon')}<button type="submit" class="button primary">Valider mon analyse</button></div>`
          : `<div class="wiz-actions">${at ? core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon') : ''}${core.button(`<span>Continuer</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${step.key}"`)}</div>`}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  /* Le corrigé, d'après la maquette : pleine largeur, une ligne par point.
   * À gauche le numéro, le titre et la réponse de l'apprenant ; à droite le
   * retour, teinté selon le verdict. La mise en situation reste à portée
   * dans une fenêtre. */
  const VERDICTS = [
    { key: 'strengths', title: 'Ce qui fonctionne', tone: 'good', label: 'Pertinent', symbol: 'check' },
    { key: 'improvements', title: 'Axes d’amélioration', tone: 'bad', label: 'À améliorer', symbol: 'close' },
    { key: 'rewrite', title: 'Votre version améliorée', tone: 'neutral', label: 'Version améliorée', symbol: 'sparkle' }
  ];

  function reviewScreen() {
    const notes = content.feedback.A;
    return `<section class="an-review">
      <header class="an-head">
        ${core.pageTitle('Corrigé', 'Votre analyse', 'Voici l’analyse de votre réponse, point par point, avec un retour sur chacun.')}
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
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    const current = core.findExercise('s1-A');
    if (ex.reviewing()) return reviewScreen();
    return `<div class="two-columns">
      <section class="scenario">
        ${core.pageTitle('Mise en situation', 'Vente en boutique · le client pressé et distant')}
        ${core.callout('Écoutez l’accroche, puis identifiez ce qui fonctionne, 2 à 3 axes d’amélioration et proposez une nouvelle version.')}
        <div class="media-scene">
          ${core.illustration(current)}
          ${core.button(icon('play', { size: 30 }), 'listen', 'play-button', 'aria-label="Écouter l’accroche"')}
        </div>
        <div class="media-actions">
          ${core.button(`${icon('play', { size: 18 })}<span data-audio-label>Écouter l’accroche</span>`, 'listen', 'primary')}
          ${core.button('Voir la transcription', 'transcript', 'subtle')}
        </div>
        <p class="asset-note">${content.audio.demo ? 'Accroche de démonstration · lecture vocale de votre navigateur.' : 'Écoutez l’accroche et appuyez votre analyse sur des exemples précis.'}</p>
        ${core.note('Concentrez-vous sur la formulation, le ton et l’adaptation au contexte.')}
      </section>
      ${analysisStep()}
    </div>`;
  }

  const { required } = window.ExerciseRules;

  const validate = values => [
    required(values, 'strengths', 'Ce qui fonctionne', 500),
    required(values, 'improvements', 'Axes d’amélioration', 500),
    required(values, 'rewrite', 'Votre version améliorée', 800)
  ].filter(Boolean);

  /* Les trois constats sont posés dans le corrigé : le bilan ne garde que
   * le bouton de suite. */
  const feedback = () => [];

  const transcript = () =>
    `<p class="tag">${content.audio.demo ? 'Texte de démonstration' : 'Accroche de l’exercice'}</p>
     <blockquote class="transcript">« ${esc(content.audio.transcript)} »</blockquote>`;

  function onMount() {
    core.$('[data-action="listen"]')?.addEventListener('click', () => media.listen(content.audio));
    core.$('.play-button')?.addEventListener('click', () => media.listen(content.audio));
    core.$('[data-action="transcript"]')?.addEventListener('click', () => core.openDialog(
      'Transcription de l’accroche',
      `${transcript()}
       ${content.audio.demo ? '<p class="muted">Aucun enregistrement n’était joint aux maquettes. Cet exemple sert de support à l’exercice.</p>' : ''}`));
    core.$('[data-action="scenario"]')?.addEventListener('click', () => {
      core.openDialog('Vente en boutique · le client pressé et distant',
        `${core.callout('Écoutez l’accroche, puis identifiez ce qui fonctionne, 2 à 3 axes d’amélioration et proposez une nouvelle version.')}
         ${transcript()}
         <div class="media-actions">${core.button(`${icon('play', { size: 18 })}<span data-audio-label>Écouter l’accroche</span>`, 'listen', 'primary')}</div>`);
      core.$('#dialog-body [data-action="listen"]')?.addEventListener('click', () => media.listen(content.audio));
    });
    core.wireRubric(content.rubric);
  }

  ex.mount('s1-A', { screen, validate, feedback, onMount, compactFeedback: true });
})();
