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
      ${corrige.head(result, { rubric: [...PHONE_CHECKS, ...EMAIL_CHECKS].map(t => [t]), bloc: all, what: 'vos deux versions', grade })}
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
    /* Repris le 19/11 : la situation en une phrase ; l'ouverture de départ
     * montrée en carte, à côté de l'image ; puis deux cartes blanches, une
     * par canal, chacune avec sa question, une phrase d'aide, le champ et
     * ce qu'il faut cocher, annoncé. */
    return `${corner()}<div class="stacked-screen f-screen">
    ${core.pageTitle('Mise en situation', 'Adaptez votre ouverture à chaque canal', 'Vous aviez préparé cette ouverture pour un rendez-vous en face à face. Le client préfère finalement un appel, puis un e-mail : gardez la même intention, changez la forme.')}
    <div class="f-base">
      <figure class="recall-card is-focus"><figcaption><span class="recall-tag">L’ouverture de départ</span><strong>En face à face</strong></figcaption><blockquote>« ${esc(content.faceToFace)} »</blockquote></figure>
      <div class="f-art">${core.illustration(current)}</div>
    </div>
    <form class="stacked-form" novalidate>
      <div class="two-columns channel-columns">
        <section class="e1-answer f-card">
          <div class="e1-ask"><h2>Au téléphone, que lui dites-vous&nbsp;?</h2></div>
          <p class="e1-help">En 30 à 45 secondes, sur un ton naturel : présentez-vous, donnez le motif de votre appel, puis posez une question.</p>
          ${ex.field('phone', 'Votre ouverture au téléphone', { placeholder: 'Bonjour, …', max: 1500, rows: 7, hideLabel: true })}
          <p class="f-check-title">Cochez ce que contient votre version&nbsp;:</p>
          ${ex.checkList('phoneCheck', PHONE_CHECKS)}
        </section>
        <section class="e1-answer f-card">
          <div class="e1-ask"><h2>Par e-mail, qu’écrivez-vous&nbsp;?</h2></div>
          <p class="e1-help">Un objet clair, puis un message de 80 à 120 mots, en paragraphes courts, qui se termine par une proposition concrète.</p>
          ${ex.field('subject', 'Objet', { type: 'input', max: 120, placeholder: 'Objet de l’e-mail' })}
          ${ex.field('email', 'Message', { placeholder: 'Bonjour, …', wordLimit: '80–120', max: 3000, rows: 6 })}
          <p class="f-check-title">Cochez ce que contient votre version&nbsp;:</p>
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
  const feedback = () => ['À retenir : au téléphone, faites court et posez vite une question ; par e-mail, un objet clair et une proposition concrète à la fin.'];

  if (kit) kit.tour('s1-F', [
    { target: '.f-base .recall-card', title: 'L’ouverture de départ', text: 'Elle est prévue pour un face-à-face. Gardez son intention, changez sa forme.' },
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
