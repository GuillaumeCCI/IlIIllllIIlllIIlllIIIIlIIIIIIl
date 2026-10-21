/* S1 E2 · L’ultimatum : 40 secondes pour donner envie.
 * Ouverture de 90 mots maximum, testée au chronomètre.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const media = window.AtelierMedia;
  const content = window.ATELIER_S1;
  const { required, words } = window.ExerciseRules;
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.tourButton()}</div>` : '');

  function screen() {
    const current = core.findExercise('s1-E2');
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
        ${core.panelTitle('Votre proposition')}
        <p class="muted">Rédigez votre ouverture, puis testez-la à voix haute.</p>
        ${core.hintBlock(content.hints.E2)}
        ${ex.field('proposal', 'Votre ouverture', { placeholder: 'Écrivez ici votre ouverture…', wordLimit: '90', max: 2000, rows: 6, hideLabel: true })}
        ${ex.checkList('check', ['Accroche claire', 'Valeur client', 'Suite proposée'])}
        ${media.timerWidget()}
        ${core.errorsBox()}
        ${ex.actions('Valider ma proposition')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [required(values, 'proposal', 'Votre proposition', 2000)].filter(Boolean);
    if (words(values.proposal) > 90) errors.push({ key: 'proposal', message: 'Réduisez votre proposition à 90 mots maximum.' });
    return errors;
  }

  const feedback = () => content.feedback.E2;

  function onMount() {
    media.resetTimer();
    core.$('[data-action="timer"]')?.addEventListener('click', () => media.toggleTimer());
    core.$('[data-action="reset-timer"]')?.addEventListener('click', () => media.resetTimer());
  }

  if (kit) kit.tour('s1-E2', [
    { target: '.answer-panel .field', title: 'Votre ouverture', text: 'Écrivez-la comme vous la diriez : 90 mots au plus, soit environ 40 secondes à l’oral.' },
    { target: '.answer-panel .self-checks', title: 'Vérifiez-la', text: 'Cochez ce que contient votre ouverture :',
      items: [
        { key: '1', tone: 'blue', text: 'une accroche claire ;' },
        { key: '2', tone: 'coral', text: 'une valeur pour le client ;' },
        { key: '3', tone: 'green', text: 'une suite proposée.' }
      ] },
    { target: '.timer-widget', title: 'Le test des 40 secondes', text: 'Lancez le chrono et lisez votre ouverture à voix haute : tient-elle dans le temps ?' },
    { target: '.form-actions', title: 'Valider ma proposition', text: 'Le corrigé s’affiche, avec une ouverture possible.' }
  ]);

  ex.mount('s1-E2', { screen, validate, feedback, onMount });
})();
