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
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.tourButton()}</div>` : '');

  const PHONE_CHECKS = ['Se présenter', 'Donner le motif', 'Poser une question'];
  const EMAIL_CHECKS = ['Objet clair', 'Paragraphes courts', 'Appel à l’action'];

  /* Le corrigé au modèle de S1 A (js/corrige.js) : vos cases cochées face
   * à ce que l'outil a repéré, le score estimatif, puis chaque réponse
   * (téléphone, objet, message) face à une réponse possible. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s1-F', ex.values());
    const [phoneBloc, subjectBloc, emailBloc] = result ? result.blocs : [];
    const notes = content.feedback.F;
    const checks = [...PHONE_CHECKS.map((_, i) => `phoneCheck${i}`), ...EMAIL_CHECKS.map((_, i) => `emailCheck${i}`)];
    const grade = i => (ex.value(checks[i]) === true ? { id: 'oui', label: 'Coché' } : { id: 'non', label: 'Pas coché' });
    const all = result ? { lines: result.blocs.flatMap(b => b.lines) } : null;
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', 'Adaptez votre ouverture à chaque canal', 'Vous deviez transformer une ouverture prévue pour un face-à-face en deux versions : au téléphone, puis par e-mail.')}
      ${corrige.compare({ rubric: [...PHONE_CHECKS, ...EMAIL_CHECKS].map(t => [t]), bloc: all, what: 'vos deux versions', grade })}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Au téléphone', bloc: phoneBloc, text: ex.value('phone'), model: notes.phone }),
        corrige.row({ n: 2, title: 'L’objet de l’e-mail', bloc: subjectBloc, text: ex.value('subject'), model: notes.subject }),
        corrige.row({ n: 3, title: 'Le message', bloc: emailBloc, text: ex.value('email'), model: notes.email })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const current = core.findExercise('s1-F');
    return `${corner()}<div class="stacked-screen">${core.pageTitle('', 'Adaptez votre ouverture à chaque canal', 'Gardez l’intention, changez la forme.')}
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
          ${ex.checkList('phoneCheck', PHONE_CHECKS)}
        </section>
        <section class="panel">
          <div class="channel-title">
            <span class="channel-icon">${icon('mail', { size: 23 })}</span>
            <div><h2>E-mail</h2><p class="muted">80–120 mots · Lecture rapide</p></div>
          </div>
          ${ex.field('subject', 'Objet', { type: 'input', max: 120, placeholder: 'Objet de l’e-mail' })}
          ${ex.field('email', 'Message', { placeholder: 'Écrivez ici votre ouverture par e-mail…', wordLimit: '80–120', max: 3000, rows: 5 })}
          ${ex.checkList('emailCheck', EMAIL_CHECKS)}
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

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  if (kit) kit.tour('s1-F', [
    { target: '.base-opening', title: 'L’ouverture de départ', text: 'Elle est prévue pour un face-à-face. Gardez son intention, changez sa forme.' },
    { target: '.channel-columns', title: 'Deux versions', wide: true,
      items: [
        { symbol: 'phone', tone: 'blue', text: 'Téléphone : 30 à 45 secondes, sur un ton naturel.' },
        { symbol: 'mail', tone: 'coral', text: 'E-mail : un objet, puis 80 à 120 mots faciles à lire.' },
        { symbol: 'check', tone: 'green', text: 'Sous chaque version, cochez ce qu’elle contient.' }
      ] },
    { target: '.form-actions', title: 'Valider mes deux versions', text: 'Le corrigé s’affiche, avec une version possible pour chaque canal.' }
  ]);

  ex.mount('s1-F', { screen, validate, feedback, compactFeedback: true });
})();
