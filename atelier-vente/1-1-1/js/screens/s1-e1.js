/* S1 E1 · Garder le lien quand la caméra se coupe.
 * Réponse écrite, plus un essai oral facultatif réécoutable sur place.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const media = window.AtelierMedia;
  const content = window.ATELIER_S1;
  const { required } = window.ExerciseRules;
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.contextButton()}${kit.tourButton()}</div>` : '');

  /* D'après la maquette : rien en panneau, tout posé sur le fond. À gauche
   * la situation (titre, illustration entière aux coins arrondis, ce que
   * l'on sait en pastilles à icône) ; à droite l'étape numérotée, la
   * réponse, l'indice, l'essai oral et les repères. Styles : extras.css. */


  /* Le corrigé au modèle de S1 A (js/corrige.js) : la situation rappelée,
   * le score estimatif en tête, puis votre réponse face à une réponse
   * possible, avec ce qu'on attend sous votre réponse. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s1-E1', ex.values());
    const [bloc] = result ? result.blocs : [];
    const notes = content.feedback.E1;
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', 'Le prospect coupe sa caméra.', 'Premier rendez-vous en visio avec un décideur pressé : il reste 15 minutes, et il vient de couper sa caméra. Voici votre réponse face à une réponse possible.')}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre prochaine action', bloc, text: ex.value('response'), model: [notes[0], notes[1]] })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const current = core.findExercise('s1-E1');
    /* Repris le 19/11 : la situation racontée en une phrase (plus d'étiquettes
     * à pictogramme ni de phrase isolée) ; à droite la vraie question en
     * titre, une phrase qui dit quoi écrire (les trois temps y sont), le
     * champ, l'essai oral en petit bouton doux facultatif. */
    return `${corner()}<div class="e1-layout">
      <section class="e1-scene">
        ${core.pageTitle('Mise en situation', 'Le prospect coupe sa caméra.', 'Premier rendez-vous en visio avec un décideur pressé. Il reste 15 minutes, et il vient de couper sa caméra : vous ne voyez plus ses réactions.')}
        <div class="call-scene">
          ${core.illustration(current)}
          <div class="call-badge">${icon('video', { size: 16 })}<span>Visioconférence · caméra du prospect désactivée</span></div>
        </div>
      </section>
      <form class="e1-answer" data-bar-stays novalidate>
        <div class="e1-ask">
          <h2>Que lui dites-vous maintenant, pour garder le lien ?</h2>
          ${core.hintBlock(content.hints.E1)}
        </div>
        <p class="e1-help">Écrivez ce que vous lui diriez, en deux ou trois phrases : reconnaissez ce qui vient de se passer, rassurez-le, puis relancez l’échange par une question.</p>
        ${ex.field('response', 'Ce que vous lui dites', { placeholder: 'Votre réponse…', max: 300, rows: 5, hideLabel: true })}
        <div class="oral-practice">
          ${core.button('S’entraîner à l’oral (facultatif)', 'record', 'soft-button', 'id="record-button"')}
          <p class="asset-note" id="record-status">Pour réécouter votre ton ; rien n’est conservé.</p>
          <audio id="record-playback" controls hidden aria-label="Réécouter votre entraînement oral"></audio>
        </div>
        ${core.errorsBox()}
        ${ex.actions('Valider ma réponse')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  const validate = values => [required(values, 'response', 'Votre prochaine action', 300)].filter(Boolean);
  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => ['À retenir : sans image, dites à voix haute ce qui se passe et ce qui va suivre, puis redonnez la parole.'];

  function onMount() {
    core.$('[data-action="record"]')?.addEventListener('click', () => media.toggleRecording());
  }

  // À l'arrivée : pourquoi on est là, ce qui se passe, ce qui est demandé.
  if (kit) kit.context([
    ['target', 'Pourquoi vous êtes là', 'Pour vous entraîner à garder le lien avec un prospect quand l’échange se passe en visioconférence.'],
    ['video', 'Ce qui se passe', 'Premier rendez-vous en visio avec un décideur pressé. Il reste 15 minutes, et il vient de couper sa caméra : vous ne voyez plus ses réactions.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire, en 2 ou 3 phrases, ce que vous lui dites maintenant pour garder le lien.']
  ]);
  if (kit) kit.tour('s1-E1', [
    { target: '.e1-scene .page-title, .call-scene', title: 'La situation', text: 'Un premier rendez-vous en visio, 15 minutes restantes, et le prospect coupe sa caméra : votre réponse doit en tenir compte.' },
    { target: '.e1-ask, .e1-help', title: 'La question', text: 'Votre réponse enchaîne trois temps :',
      items: [
        { key: '1', tone: 'blue', text: 'reconnaître ce qui vient de se passer ;' },
        { key: '2', tone: 'coral', text: 'rassurer le prospect ;' },
        { key: '3', tone: 'green', text: 'relancer l’échange par une question.' }
      ] },
    { target: '.e1-answer .field', title: 'Votre réponse', text: 'Écrivez ce que vous diriez, en 2 ou 3 phrases.',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: '« Voir un indice » vous oriente si vous bloquez.' }
      ] },
    { target: '.oral-practice', title: 'S’entraîner à l’oral', text: 'Facultatif : enregistrez-vous pour réécouter votre ton. Rien n’est conservé.' },
    { target: '.form-actions', title: 'Valider ma réponse', text: 'Le corrigé s’affiche, avec une réponse possible.' }
  ]);

  ex.mount('s1-E1', { screen, validate, feedback, onMount, compactFeedback: true });
})();
