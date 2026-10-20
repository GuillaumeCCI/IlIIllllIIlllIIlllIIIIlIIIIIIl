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
        <div class="wiz-panel-head">${window.AtelierKit ? window.AtelierKit.tourButton() : ''}${core.rubricButton()}</div>
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
    // Le gros bouton ▶ et « Écouter l’accroche » portent tous deux data-action="listen" :
    // un seul écouteur chacun, sinon le second clic arrête aussitôt la lecture.
    document.querySelectorAll('[data-action="listen"]').forEach(button =>
      button.addEventListener('click', () => media.listen(content.audio)));
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

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s1-A', [
    { target: '.scenario .callout', title: 'La consigne', text: 'Vous analysez l’accroche d’une vendeuse en boutique, en trois temps :',
      items: [
        { key: '1', tone: 'green', text: 'ce qui fonctionne ;' },
        { key: '2', tone: 'coral', text: '2 à 3 axes d’amélioration ;' },
        { key: '3', tone: 'blue', text: 'votre nouvelle version de l’accroche.' }
      ] },
    { target: '.media-scene, .media-actions', title: 'L’accroche', text: 'Commencez par écouter l’accroche.',
      items: [
        { symbol: 'play', tone: 'blue', text: 'Le bouton ▶ ou « Écouter l’accroche » lance l’écoute.' },
        { symbol: 'document', tone: 'blue', text: '« Voir la transcription » affiche le texte de l’accroche.' }
      ] },
    { target: '.scenario .note', title: 'Le conseil', text: 'Ce conseil vous dit sur quoi porter votre attention.' },
    { target: '.step-pill', title: 'Trois étapes', text: 'Vous répondez à une question à la fois :',
      items: [
        { key: '1', tone: 'green', text: 'Ce qui fonctionne : les points forts de l’accroche.' },
        { key: '2', tone: 'coral', text: 'Axes d’amélioration : 2 à 3 points précis à corriger.' },
        { key: '3', tone: 'blue', text: 'Votre version améliorée : vous réécrivez l’accroche.' }
      ],
      after: 'La pastille montre l’étape en cours.' },
    { target: '.wiz-panel [data-action="rubric"]', title: 'La grille d’évaluation', text: 'Ce bouton affiche les critères sur lesquels votre analyse sera jugée.' },
    { target: '.wiz-panel .field', title: 'Votre réponse', text: 'Écrivez ici votre réponse à l’étape en cours, avec des exemples précis tirés de l’accroche.' },
    { target: '.wiz-actions', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: '« Continuer » ouvre l’étape suivante.' },
        { symbol: 'checkCircle', tone: 'green', text: 'À la troisième étape, vous validez et découvrez le corrigé.' }
      ] }
  ]);

  ex.mount('s1-A', { screen, validate, feedback, onMount, compactFeedback: true });
})();
