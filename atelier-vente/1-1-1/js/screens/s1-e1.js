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

  /* D'après la maquette : rien en panneau, tout posé sur le fond. À gauche
   * la situation (titre, illustration entière aux coins arrondis, ce que
   * l'on sait en pastilles à icône) ; à droite l'étape numérotée, la
   * réponse, l'indice, l'essai oral et les repères. Styles : extras.css. */
  const FACTS = [['calendar', 'Premier rendez-vous'], ['clock', '15 min restantes'], ['user', 'Décideur pressé']];

  function screen() {
    const current = core.findExercise('s1-E1');
    return `<div class="e1-layout">
      <section class="e1-scene">
        ${core.pageTitle('Mise en situation', 'Le prospect coupe sa caméra.', 'Vous perdez les signaux visuels. Comment gardez-vous le lien ?')}
        <div class="call-scene">
          ${core.illustration(current)}
          <div class="call-badge">${icon('video', { size: 16 })}<span>Visioconférence · caméra du prospect désactivée</span></div>
        </div>
        <p class="e1-label">Ce que vous savez</p>
        <ul class="e1-facts">${FACTS.map(([symbol, text]) => `<li>${icon(symbol, { size: 20 })}<span>${text}</span></li>`).join('')}</ul>
        <p class="e1-note">Privilégiez l’écoute et l’adaptation.</p>
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
  const feedback = () => content.feedback.E1;

  function onMount() {
    core.$('[data-action="record"]')?.addEventListener('click', () => media.toggleRecording());
  }

  ex.mount('s1-E1', { screen, validate, feedback, onMount });
})();
