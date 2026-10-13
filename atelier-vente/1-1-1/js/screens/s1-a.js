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
          ? `${core.errorsBox()}<div class="wiz-back">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon')}</div>${ex.actions('Valider mon analyse')}`
          : `<div class="wiz-actions">${at ? core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon') : ''}${core.button(`<span>Continuer</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${step.key}"`)}</div>`}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function screen() {
    const current = core.findExercise('s1-A');
    const review = ex.reviewing();
    const notes = content.feedback.A;
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
      ${review ? `<form class="panel answer-panel" novalidate>
        ${core.panelTitle('Votre analyse', core.rubricButton())}
        ${core.step(1, 'Ce qui fonctionne', `<p class="own-line">« ${esc(ex.value('strengths'))} »</p>${ex.inlineNote(notes[0], 'good')}`)}
        ${core.step(2, 'Axes d’amélioration', `<p class="own-line">« ${esc(ex.value('improvements'))} »</p>${ex.inlineNote(notes[1], 'bad')}`)}
        ${core.step(3, 'Votre version améliorée', `<p class="own-line">« ${esc(ex.value('rewrite'))} »</p>${ex.inlineNote(notes[2], 'neutral')}`)}
        ${core.errorsBox()}
        ${ex.actions('Valider mon analyse')}
        ${core.feedbackBox()}
      </form>` : analysisStep()}
    </div>`;
  }

  const { required } = window.ExerciseRules;

  const validate = values => [
    required(values, 'strengths', 'Ce qui fonctionne', 500),
    required(values, 'improvements', 'Axes d’amélioration', 500),
    required(values, 'rewrite', 'Votre version améliorée', 800)
  ].filter(Boolean);

  /* Les trois constats sont posés sous les trois étapes : la synthèse ne
   * garde que le critère à vérifier. */
  const feedback = () => [content.feedback.A[3]];

  function onMount() {
    core.$('[data-action="listen"]')?.addEventListener('click', () => media.listen(content.audio));
    core.$('.play-button')?.addEventListener('click', () => media.listen(content.audio));
    core.$('[data-action="transcript"]')?.addEventListener('click', () => core.openDialog(
      'Transcription de l’accroche',
      `<p class="tag">${content.audio.demo ? 'Texte de démonstration' : 'Accroche de l’exercice'}</p>
       <blockquote class="transcript">« ${esc(content.audio.transcript)} »</blockquote>
       ${content.audio.demo ? '<p class="muted">Aucun enregistrement n’était joint aux maquettes. Cet exemple sert de support à l’exercice.</p>' : ''}`));
    core.wireRubric(content.rubric);
  }

  ex.mount('s1-A', { screen, validate, feedback, onMount });
})();
