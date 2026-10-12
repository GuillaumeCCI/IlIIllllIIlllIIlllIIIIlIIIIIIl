/* S1 B · S’adapter au client pressé.
 * Formuler une entrée en matière, puis nommer le réglage majeur.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S1;
  const { required } = window.ExerciseRules;

  function screen() {
    const current = core.findExercise('s1-B');
    const review = ex.reviewing();
    const notes = content.feedback.B;
    return `<div class="two-columns">
      <section class="scenario">
        ${core.pageTitle('Mise en situation', 'Vente en boutique · le client pressé et distant')}
        ${core.callout('Un client entre dans votre magasin d’un pas rapide. Il jette des coups d’œil réguliers à sa montre, se montre particulièrement sur la réserve et évite le contact visuel prolongé. Il a manifestement un besoin précis, mais craint d’être accaparé par un discours commercial trop lourd.')}
        <div class="signals"><strong>Signaux observés</strong>${core.chips(['Pressé', 'Réservé', 'Besoin précis'])}</div>
        ${core.illustration(current)}
        ${core.note('Montrez rapidement au client que vous avez compris son rythme et son besoin d’autonomie.')}
      </section>
      <form class="panel answer-panel" novalidate>
        ${core.panelTitle('Préparez votre approche', core.rubricButton())}
        <p class="panel-intro">Rédigez votre entrée en matière en 3 à 4 phrases, puis précisez le réglage majeur effectué pour vous synchroniser avec le client.</p>
        ${review
          ? `${core.step(1, 'Votre entrée en matière', `<p class="own-line">« ${esc(ex.value('opening'))} »</p>${ex.inlineNote(notes[0], 'good')}`)}
             ${core.step(2, 'Votre réglage majeur', `<p class="own-line">« ${esc(ex.value('adjustment'))} »</p>${ex.inlineNote(notes[1], 'neutral')}`)}`
          : `${core.step(1, 'Votre entrée en matière', ex.field('opening', 'Votre entrée en matière', { placeholder: 'Écrivez ce que vous diriez au client…', max: 600, rows: 5, hideLabel: true }), '3 à 4 phrases')}
             ${core.step(2, 'Votre réglage majeur', core.chips(['Rythme', 'Ton', 'Distance', 'Précision']) + ex.field('adjustment', 'Votre réglage majeur', { placeholder: 'Expliquez le principal ajustement effectué…', max: 250, rows: 4, hideLabel: true }), 'Une phrase suffit')}`}
        ${core.errorsBox()}
        ${ex.actions('Valider mon approche')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  const validate = values => [
    required(values, 'opening', 'Votre entrée en matière', 600),
    required(values, 'adjustment', 'Votre réglage majeur', 250)
  ].filter(Boolean);

  /* Le corrigé modèle et le réglage attendu sont affichés sous les deux
   * étapes : la synthèse ne garde que le critère à vérifier. */
  const feedback = () => [content.feedback.B[2]];

  function onMount() {
    core.wireRubric(content.rubric);
  }

  ex.mount('s1-B', { screen, validate, feedback, onMount });
})();
