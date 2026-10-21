/* S1 E2 · L’ultimatum : 40 secondes pour donner envie.
 * Ouverture de 90 mots maximum, testée au chronomètre. Deux temps :
 * l'apprenant rédige, puis s'auto-évalue (accroche, valeur, suite) avant
 * le corrigé. Un contexte s'ouvre à l'arrivée (kit.context).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const media = window.AtelierMedia;
  const content = window.ATELIER_S1;
  const { required, words } = window.ExerciseRules;
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.contextButton()}${kit.tourButton()}</div>` : '');

  // L'auto-évaluation, une fois l'ouverture écrite.
  const SELF = [
    { title: 'Accroche claire', text: 'On comprend tout de suite qui vous êtes et pourquoi vous êtes là.' },
    { title: 'Valeur client', text: 'Vous dites ce que le client peut y gagner, concrètement.' },
    { title: 'Suite proposée', text: 'Vous proposez clairement de poursuivre l’échange.' }
  ];
  const SCALE = [{ id: '2', label: 'Oui' }, { id: '1', label: 'En partie' }, { id: '0', label: 'Pas encore' }];
  const selfStage = () => ex.value('stage') === 'self';
  const score = () => SELF.reduce((sum, _, i) => sum + (Number(ex.value(`self${i}`)) || 0), 0);

  function writePanel() {
    return `${core.panelTitle('Votre proposition')}
        <p class="muted">Rédigez votre ouverture, puis testez-la à voix haute.</p>
        <div class="k-field-head"><p class="k-field-label" aria-hidden="true">Votre ouverture · 90 mots maximum</p>${core.hintBlock(content.hints.E2)}</div>
        ${ex.field('proposal', 'Votre ouverture', { placeholder: 'Écrivez ici votre ouverture…', wordLimit: '90', max: 2000, rows: 6, hideLabel: true })}
        ${media.timerWidget()}
        ${core.errorsBox()}
        ${ex.actions('Passer à l’auto-évaluation')}`;
  }

  function selfPanel() {
    return `${core.panelTitle('Auto-évaluation')}
        <p class="muted">Relisez votre ouverture.</p>
        <blockquote class="self-reread">« ${esc(ex.value('proposal'))} »</blockquote>
        <p class="self-question">Votre ouverture contient-elle ces trois éléments ?</p>
        ${kit.matrix({ key: 'self', rows: SELF, columns: SCALE, head: 'Critère', round: true })}
        <p><button type="button" class="text-button with-icon" data-act="e2-back">${icon('arrowLeft', { size: 16 })}<span>Revenir à mon ouverture</span></button></p>
        ${core.errorsBox()}
        ${ex.actions('Valider mon auto-évaluation')}`;
  }

  function screen() {
    const current = core.findExercise('s1-E2');
    const reviewing = ex.reviewing();
    return `${corner()}${core.pageTitle('', 'L’ultimatum', 'Vous avez 40 secondes pour donner envie au client de poursuivre.')}
    ${core.mission('Votre défi', 'Allez à l’essentiel sans sacrifier le climat, le cadrage ni l’écoute.', '40 secondes')}
    <div class="two-columns ultimatum">
      <section class="panel context-panel">
        ${core.illustration(current)}
        <span class="tag rose">Ouverture orale</span>
        <h2>Le contexte</h2>
        <p class="muted">Le client vous accorde 40 secondes avant de décider s’il continue.</p>
      </section>
      <form class="panel answer-panel" novalidate>
        ${reviewing ? `${kit.result(score(), SELF.length * 2, 'votre auto-évaluation')}${core.panelTitle('Votre proposition')}<blockquote class="self-reread">« ${esc(ex.value('proposal'))} »</blockquote>`
          : selfStage() ? selfPanel() : writePanel()}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [required(values, 'proposal', 'Votre proposition', 2000)].filter(Boolean);
    if (words(values.proposal) > 90) errors.push({ key: 'proposal', message: 'Réduisez votre proposition à 90 mots maximum.' });
    if (errors.length || values.stage !== 'self') return errors;
    const unrated = SELF.findIndex((_, i) => !values[`self${i}`]);
    return unrated === -1 ? [] : [{ key: `self${unrated}`, message: 'Évaluez chacune des 3 lignes.' }];
  }

  // L'ouverture écrite et valide : on passe à l'auto-évaluation.
  function intercept(values) {
    if (values.stage === 'self' || validate(values).length) return false;
    ex.setValue('stage', 'self');
    return true;
  }

  const feedback = () => content.feedback.E2;

  function onMount() {
    media.resetTimer();
    core.$('[data-action="timer"]')?.addEventListener('click', () => media.toggleTimer());
    core.$('[data-action="reset-timer"]')?.addEventListener('click', () => media.resetTimer());
  }

  if (kit) {
    kit.on({ 'e2-back': () => { ex.setValue('stage', 'write'); kit.commit(); } });
    // À l'arrivée : pourquoi on est là, ce qui se passe, ce qui est demandé.
    kit.context([
      ['target', 'Pourquoi vous êtes là', 'Pour vous entraîner à aller à l’essentiel quand le temps manque, sans perdre le client.'],
      ['clock', 'Ce qui se passe', 'Le client vous accorde 40 secondes avant de décider s’il poursuit l’échange avec vous.'],
      ['pencil', 'Ce qui vous est demandé', 'Écrire une ouverture de 90 mots maximum, la tester à voix haute au chrono, puis l’évaluer.']
    ]);
    kit.tour('s1-E2', [
      { target: '.answer-panel .field', title: 'Votre ouverture', text: 'Écrivez-la comme vous la diriez : 90 mots au plus, soit environ 40 secondes à l’oral.',
        items: [
          { symbol: 'lightbulb', tone: 'gold', text: '« Voir un indice » rappelle ce qu’elle doit contenir.' }
        ] },
      { target: '.timer-widget', title: 'Le test des 40 secondes', text: 'Lancez le chrono et lisez votre ouverture à voix haute : tient-elle dans le temps ?' },
      { target: '.form-actions', title: 'L’auto-évaluation', text: 'Ce bouton ouvre une courte grille : votre ouverture contient-elle les trois éléments attendus ?',
        items: [
          { key: '1', tone: 'blue', text: 'une accroche claire ;' },
          { key: '2', tone: 'coral', text: 'une valeur pour le client ;' },
          { key: '3', tone: 'green', text: 'une suite proposée.' }
        ],
        after: 'Le corrigé s’affiche ensuite.' }
    ]);
  }

  ex.mount('s1-E2', { screen, validate, intercept, feedback, onMount });
})();
