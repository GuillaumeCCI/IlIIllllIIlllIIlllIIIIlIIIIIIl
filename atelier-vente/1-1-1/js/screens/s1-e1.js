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
  const FACTS = [['calendar', 'Premier rendez-vous'], ['clock', '15 min restantes'], ['user', 'Décideur pressé']];

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
    return `${corner()}<div class="e1-layout">
      <section class="e1-scene">
        ${core.pageTitle('Mise en situation', 'Le prospect coupe sa caméra.', 'Vous perdez les signaux visuels. Comment gardez-vous le lien ?')}
        <p class="e1-label">Ce que vous savez</p>
        <ul class="e1-facts">${FACTS.map(([symbol, text]) => `<li>${icon(symbol, { size: 20 })}<span>${text}</span></li>`).join('')}</ul>
        <p class="e1-note">Privilégiez l’écoute et l’adaptation.</p>
        <div class="call-scene">
          ${core.illustration(current)}
          <div class="call-badge">${icon('video', { size: 16 })}<span>Visioconférence · caméra du prospect désactivée</span></div>
        </div>
      </section>
      <form class="e1-answer" data-bar-stays novalidate>
        <div class="e1-head">
          <span class="e1-n" aria-hidden="true">1</span>
          <div><h2>Votre prochaine action</h2><p>Que dites-vous maintenant ?</p>
            <div class="think-box e1-think"><h3>Pensez à</h3>${core.chips(['Reconnaître', 'Rassurer', 'Rebondir'])}</div></div>
        </div>
        <div class="e1-field-head"><p class="e1-label" aria-hidden="true">Votre réponse en 2 ou 3 phrases</p>${core.hintBlock(content.hints.E1)}</div>
        ${ex.field('response', 'Votre réponse en 2 ou 3 phrases', { placeholder: 'Formulez votre réponse en 2 ou 3 phrases…', max: 300, rows: 5, hideLabel: true })}
        <div class="oral-practice">
          ${core.button('S’entraîner à l’oral', 'record', 'secondary', 'id="record-button"')}
          <p class="asset-note" id="record-status">Enregistrement temporaire, à réécouter ici. Complétez ensuite votre réponse écrite.</p>
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
  const feedback = () => [];

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
    { target: '.e1-facts', title: 'Ce que vous savez', text: 'Appuyez-vous sur ces trois éléments : votre réponse doit en tenir compte.' },
    { target: '.e1-think', title: 'Pensez à', text: 'Votre réponse enchaîne trois temps :',
      items: [
        { key: '1', tone: 'blue', text: 'reconnaître la situation ;' },
        { key: '2', tone: 'coral', text: 'rassurer le prospect ;' },
        { key: '3', tone: 'green', text: 'rebondir sur la suite de l’échange.' }
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
