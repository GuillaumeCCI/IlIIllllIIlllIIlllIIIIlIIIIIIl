/* S1 F · Adapter son ouverture à chaque canal.
 * La même intention, déclinée au téléphone et par e-mail.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S1;
  const { required, words } = window.ExerciseRules;
  const { esc } = core;
  // Le bouton « Visite guidée » se pose à droite du titre (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const titled = html => (kit && !ex.reviewing() ? `<div class="tour-titled">${html}${kit.tourButton()}</div>` : html);

  function screen() {
    const current = core.findExercise('s1-F');
    return `<div class="stacked-screen">${titled(core.pageTitle('', 'Adaptez votre ouverture à chaque canal', 'Gardez l’intention, changez la forme.'))}
    <div class="mission channel-mission">
      <span class="mission-symbol">${icon('target', { size: 30 })}</span>
      <div><h2>Votre mission</h2><p>Transformez l’ouverture face-à-face en deux versions : téléphone et e-mail.</p></div>
      ${core.illustration(current)}
    </div>
    <section class="panel base-opening">
      <span class="base-symbol">${icon('quote', { size: 24 })}</span>
      <div><h2>Base en face-à-face</h2><p>« ${esc(content.faceToFace)} »</p></div>
    </section>
    <form class="stacked-form" novalidate>
      <div class="two-columns channel-columns">
        <section class="panel">
          <div class="channel-title">
            <span class="channel-icon">${icon('phone', { size: 23 })}</span>
            <div><h2>Téléphone</h2><p class="muted">30–45 secondes · Ton naturel</p></div>
          </div>
          ${ex.field('phone', 'Votre ouverture téléphonique', { placeholder: 'Écrivez ici votre ouverture téléphonique…', max: 1500, rows: 8, hideLabel: true })}
          ${ex.checkList('phoneCheck', ['Se présenter', 'Donner le motif', 'Poser une question'])}
        </section>
        <section class="panel">
          <div class="channel-title">
            <span class="channel-icon">${icon('mail', { size: 23 })}</span>
            <div><h2>E-mail</h2><p class="muted">80–120 mots · Lecture rapide</p></div>
          </div>
          ${ex.field('subject', 'Objet', { type: 'input', max: 120, placeholder: 'Objet de l’e-mail' })}
          ${ex.field('email', 'Message', { placeholder: 'Écrivez ici votre ouverture par e-mail…', wordLimit: '80–120', max: 3000, rows: 5 })}
          ${ex.checkList('emailCheck', ['Objet clair', 'Paragraphes courts', 'Appel à l’action'])}
        </section>
      </div>
      ${core.errorsBox()}
      ${ex.actions('Valider mes deux versions')}
      ${core.feedbackBox()}
    </form></div>`;
  }

  function validate(values) {
    const errors = [
      required(values, 'phone', 'Téléphone', 1500),
      required(values, 'subject', 'Objet de l’e-mail', 120),
      required(values, 'email', 'Message', 3000)
    ].filter(Boolean);
    const n = words(values.email);
    if (n && (n < 80 || n > 120)) errors.push({ key: 'email', message: `L’e-mail doit contenir entre 80 et 120 mots (actuellement ${n}).` });
    return errors;
  }

  const feedback = () => content.feedback.F;

  if (kit) kit.tour('s1-F', [
    { target: '.base-opening', title: 'L’ouverture de départ', text: 'Elle est prévue pour un face-à-face. Gardez son intention, changez sa forme.' },
    { target: '.channel-columns', title: 'Deux versions', wide: true,
      items: [
        { symbol: 'phone', tone: 'blue', text: 'Téléphone : 30 à 45 secondes, sur un ton naturel.' },
        { symbol: 'mail', tone: 'coral', text: 'E-mail : un objet, puis 80 à 120 mots faciles à lire.' },
        { symbol: 'check', tone: 'green', text: 'Sous chaque version, cochez ce qu’elle contient.' }
      ] },
    { target: '.form-actions', title: 'Valider mes deux versions', text: 'Le corrigé s’affiche, avec une version modèle pour chaque canal.' }
  ]);

  ex.mount('s1-F', { screen, validate, feedback });
})();
