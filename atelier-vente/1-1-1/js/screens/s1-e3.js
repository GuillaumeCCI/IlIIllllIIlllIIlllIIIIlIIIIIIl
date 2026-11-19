/* S1 E3 · Entrer en matière avec assurance.
 * Une première phrase affirmative, sans question, en 280 caractères.
 * Un contexte s'ouvre à l'arrivée (kit.context).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const content = window.ATELIER_S1;
  const { required, text } = window.ExerciseRules;
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.contextButton()}${kit.tourButton()}</div>` : '');

  /* Le corrigé au modèle de S1 A (js/corrige.js) : la situation rappelée,
   * le score estimatif en tête, puis votre ouverture face à une réponse
   * possible, avec ce qu'on attend sous votre ouverture. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s1-E3', ex.values());
    const [bloc] = result ? result.blocs : [];
    const notes = content.feedback.E3;
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', 'Entrez en matière avec assurance', 'Une cliente vient refaire son salon dans votre agence de décoration. Elle s’assoit et attend que vous lanciez l’échange, sans question. Voici votre ouverture face à une réponse possible.')}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre ouverture', bloc, text: ex.value('opening'), model: [notes[0], notes[1]] })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const current = core.findExercise('s1-E3');
    /* Gabarit validé le 19/11 (S1 E1) : la scène à gauche, la situation en
     * une phrase ; à droite, dans une carte blanche, la question en titre,
     * une phrase qui dit quoi écrire, le champ. */
    return `${corner()}<div class="e1-layout">
      <section class="e1-scene">
        ${core.pageTitle('Mise en situation', 'Entrez en matière avec assurance', 'Une cliente vient refaire son salon dans votre agence de décoration. Elle s’assoit en face de vous et attend que vous lanciez l’échange.')}
        <div class="e2-art">${core.illustration(current)}</div>
      </section>
      <form class="e1-answer" data-bar-stays novalidate>
        <div class="e1-ask"><h2>Que lui dites-vous pour lancer l’échange, sans lui poser de question&nbsp;?</h2>${core.hintBlock(content.hints.E3)}</div>
        <p class="e1-help">Écrivez votre première phrase telle que vous la diriez : prenez l’initiative et installez un climat positif, sans point d’interrogation. 280 caractères au plus.</p>
        ${ex.field('opening', 'Votre première phrase', { placeholder: 'Je vous propose de…', max: 280, rows: 5, hideLabel: true })}
        ${core.errorsBox()}
        ${ex.actions('Valider ma réponse')}
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

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => ['À retenir : lancer l’échange par une proposition (« Je vous propose de… ») montre votre assurance et laisse le client répondre librement.'];

  // À l'arrivée : pourquoi on est là, ce qui se passe, ce qui est demandé.
  if (kit) kit.context([
    ['target', 'Pourquoi vous êtes là', 'Pour vous entraîner à lancer l’entretien vous-même, avec assurance, au lieu d’attendre que le client parle.'],
    ['users', 'Ce qui se passe', 'Une cliente vient refaire son salon avec une agence de décoration. Elle s’assoit en face de vous et attend.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire votre première phrase, sans aucune question. Elle doit rassurer la cliente et lui donner envie de parler.']
  ]);
  if (kit) kit.tour('s1-E3', [
    { target: '.e1-ask, .e1-help', title: 'La question', text: 'Vous ouvrez l’échange vous-même, dans un climat positif, sans poser de question.' },
    { target: '.e1-answer .field', title: 'Votre ouverture', text: 'Une entrée en matière affirmative : aucune question, pas de point d’interrogation.',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: '« Voir un indice » donne un exemple de tournure.' }
      ] },
    { target: '.form-actions', title: 'Valider', text: 'Le corrigé s’affiche, avec une ouverture possible.' }
  ]);

  ex.mount('s1-E3', { screen, validate, feedback, compactFeedback: true });
})();
