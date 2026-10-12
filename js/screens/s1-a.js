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
      <form class="panel answer-panel" novalidate>
        ${core.panelTitle('Votre analyse', core.rubricButton())}
        ${review
          ? `${core.step(1, 'Ce qui fonctionne', `<p class="own-line">« ${esc(ex.value('strengths'))} »</p>${ex.inlineNote(notes[0], 'good')}`)}
             ${core.step(2, 'Axes d’amélioration', `<p class="own-line">« ${esc(ex.value('improvements'))} »</p>${ex.inlineNote(notes[1], 'bad')}`)}
             ${core.step(3, 'Votre version améliorée', `<p class="own-line">« ${esc(ex.value('rewrite'))} »</p>${ex.inlineNote(notes[2], 'neutral')}`)}`
          : `${core.step(1, 'Ce qui fonctionne', ex.field('strengths', 'Ce qui fonctionne', { placeholder: 'Notez les points forts de l’accroche…', hideLabel: true }))}
             ${core.step(2, 'Axes d’amélioration', core.chips(['Clarté', 'Adaptation au client']) + ex.field('improvements', 'Axes d’amélioration', { placeholder: 'Vos axes d’amélioration…', hideLabel: true }), 'Ajoutez 2 à 3 points précis')}
             ${core.step(3, 'Votre version améliorée', ex.field('rewrite', 'Votre version améliorée', { placeholder: 'Réécrivez l’accroche ici…', max: 800, hideLabel: true }))}`}
        ${core.errorsBox()}
        ${ex.actions('Valider mon analyse')}
        ${core.feedbackBox()}
      </form>
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
