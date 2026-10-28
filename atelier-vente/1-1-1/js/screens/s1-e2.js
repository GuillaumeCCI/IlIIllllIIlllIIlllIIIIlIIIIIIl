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

  /* Le corrigé au modèle de S1 A (js/corrige.js) : votre autoévaluation
   * face à ce que l'outil a repéré, le score estimatif, puis votre
   * ouverture face à une réponse possible. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s1-E2', ex.values());
    const [bloc] = result ? result.blocs : [];
    const notes = content.feedback.E2;
    const ids = { 2: 'oui', 1: 'partie', 0: 'non' };
    const grade = i => {
      const pick = SCALE.find(s => s.id === ex.value(`self${i}`));
      return pick ? { id: ids[pick.id], label: pick.label } : { id: 'vide', label: 'Sans réponse' };
    };
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', 'L’ultimatum', 'Vous vendez des sièges de bureau ergonomiques. La gérante d’une entreprise de 40 salariés vous accorde 40 secondes, puis décide si elle vous donne un rendez-vous de 10 minutes.')}
      ${corrige.compare({ rubric: SELF.map(s => [s.title]), bloc, what: 'votre ouverture', grade })}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre ouverture', bloc, text: ex.value('proposal'), model: [notes[0], notes[1]] })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const current = core.findExercise('s1-E2');
    return `${corner()}${core.pageTitle('', 'L’ultimatum', 'Vous avez 40 secondes pour donner envie au client de poursuivre.')}
    ${core.mission('Votre défi', 'Allez à l’essentiel sans sacrifier le climat, le cadrage ni l’écoute.')}
    <div class="two-columns ultimatum">
      <section class="panel context-panel">
        ${core.illustration(current)}
        <span class="tag rose">Ouverture orale</span>
        <h2>Le contexte</h2>
        <p class="panel-intro">Vous êtes commercial chez Ergolys, qui vend des sièges de bureau ergonomiques. La gérante d’une entreprise de 40 salariés vous reçoit entre deux réunions. Après 40 secondes, elle choisit : vous accorder un rendez-vous de 10 minutes, ou s’arrêter là.</p>
      </section>
      <form class="panel answer-panel" novalidate>
        ${selfStage() ? selfPanel() : writePanel()}
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

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

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
      ['clock', 'Ce qui se passe', 'Vous vendez des sièges de bureau ergonomiques. La gérante d’une entreprise vous accorde 40 secondes, puis décide si elle vous donne un rendez-vous.'],
      ['pencil', 'Ce qui vous est demandé', 'Écrire une ouverture de 90 mots maximum, la tester à voix haute au chrono, puis l’évaluer.']
    ]);
    // À l'arrivée sur l'auto-évaluation : ce qu'on a sous les yeux.
    kit.selfContext('.self-reread', [
      ['eye', 'Ce que vous voyez', ['En haut, votre ouverture, telle que vous l’avez écrite.', 'En dessous, les trois éléments qu’elle doit contenir.']],
      ['list', 'Ce qui vous est demandé', 'Relisez votre ouverture. Pour chaque élément, répondez « Oui », « En partie » ou « Pas encore ».'],
      ['checkCircle', 'Ensuite', 'Le corrigé s’affiche, avec votre score. Vous pouvez encore revenir à votre ouverture avant de valider.']
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

  ex.mount('s1-E2', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
