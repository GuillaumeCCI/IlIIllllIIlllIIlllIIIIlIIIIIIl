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

  function screen() {
    const current = core.findExercise('s1-E1');
    return `${core.pageTitle('Mise en situation', 'Le prospect coupe sa caméra.', 'Vous perdez les signaux visuels. Comment gardez-vous le lien ?')}
    <div class="two-columns">
      <section class="scenario">
        <div class="call-scene">
          ${core.illustration(current)}
          <div class="call-badge">Visioconférence · caméra du prospect désactivée</div>
        </div>
        <div class="panel compact"><h3>Ce que vous savez</h3>${core.chips(['Premier rendez-vous', '15 min restantes', 'Décideur pressé'])}</div>
        <p class="under-note">Privilégiez l’écoute et l’adaptation.</p>
      </section>
      <form class="panel answer-panel" novalidate>
        ${core.panelTitle('Votre prochaine action')}
        <p class="panel-intro">Que dites-vous maintenant ?</p>
        ${ex.field('response', 'Votre réponse en 2 ou 3 phrases', { placeholder: 'Formulez votre réponse en 2 ou 3 phrases…', max: 300, rows: 5 })}
        <div class="oral-practice">
          ${core.button('S’entraîner à l’oral', 'record', 'secondary', 'id="record-button"')}
          <p class="asset-note" id="record-status">Enregistrement temporaire, à réécouter ici. Complétez ensuite votre réponse écrite.</p>
          <audio id="record-playback" controls hidden aria-label="Réécouter votre entraînement oral"></audio>
        </div>
        ${core.hintBlock(content.hints.E1)}
        <div class="think-box"><h3>Pensez à…</h3>${core.chips(['Reconnaître', 'Rassurer', 'Rebondir'])}</div>
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
