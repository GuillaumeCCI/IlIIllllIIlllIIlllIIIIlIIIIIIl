/* S1 E3 · Entrer en matière avec assurance.
 * Une première phrase affirmative, sans question, en 280 caractères.
 * Un contexte s'ouvre à l'arrivée (kit.context).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S1;
  const { required, text } = window.ExerciseRules;
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.contextButton()}${kit.tourButton()}</div>` : '');

  function screen() {
    const current = core.findExercise('s1-E3');
    return `${corner()}<div class="two-columns affirmative">
      <section class="panel scenario">
        <span class="tag coral">Approche affirmative</span>
        ${core.pageTitle('', 'Entrez en matière avec assurance', 'Rédigez une première phrase sans poser de question.')}
        ${core.illustration(current)}
        <div class="objective">
          <span class="mission-symbol">${icon('target', { size: 26 })}</span>
          <div><h3>Objectif</h3><ul class="objective-list"><li>${icon('check', { size: 16 })}<span>Prendre l’initiative</span></li><li>${icon('check', { size: 16 })}<span>Créer un climat positif</span></li></ul></div>
        </div>
      </section>
      <form class="panel answer-panel" novalidate data-bar-stays>
        ${core.panelTitle('Votre ouverture')}
        <p class="panel-intro">Une cliente vient refaire son salon dans votre agence de décoration. Elle s’assoit et attend que vous lanciez l’échange. Formulez une entrée en matière naturelle et directe.</p>
        ${ex.field('opening', 'Votre ouverture', { placeholder: 'Ex. Je vous propose de commencer par…', max: 280, rows: 12, hideLabel: true })}
        ${core.hintBlock(content.hints.E3)}
        ${core.errorsBox()}
        ${ex.actions()}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [required(values, 'opening', 'Votre ouverture', 280)].filter(Boolean);
    // Contrôle formel : la consigne interdit la forme interrogative.
    if (/[?？]/u.test(text(values.opening))) errors.push({ key: 'opening', message: 'Reformulez votre ouverture sans point d’interrogation, comme demandé.' });
    return errors;
  }

  const feedback = () => content.feedback.E3;

  // À l'arrivée : pourquoi on est là, ce qui se passe, ce qui est demandé.
  if (kit) kit.context([
    ['target', 'Pourquoi vous êtes là', 'Pour vous entraîner à lancer l’entretien vous-même, avec assurance, au lieu d’attendre que le client parle.'],
    ['users', 'Ce qui se passe', 'Une cliente vient refaire son salon avec une agence de décoration. Elle s’assoit en face de vous et attend.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire votre première phrase, sans aucune question. Elle doit rassurer la cliente et lui donner envie de parler.']
  ]);
  if (kit) kit.tour('s1-E3', [
    { target: '.objective', title: 'L’objectif', text: 'Gardez-le en tête : vous ouvrez l’échange vous-même, dans un climat positif.' },
    { target: '.answer-panel .field', title: 'Votre ouverture', text: 'Une entrée en matière affirmative : aucune question, pas de point d’interrogation.',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: '« Voir un indice » donne un exemple de tournure.' }
      ] },
    { target: '.form-actions', title: 'Valider', text: 'Le corrigé s’affiche, avec une ouverture possible.' }
  ]);

  ex.mount('s1-E3', { screen, validate, feedback });
})();
