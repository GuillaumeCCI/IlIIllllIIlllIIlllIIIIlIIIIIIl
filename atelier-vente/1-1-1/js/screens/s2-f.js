/* S2 F · Adapter son écoute au profil.
 *
 * Trois profils, traités un par un depuis le menu des cas : réponse
 * d'écoute, adaptation de posture, puis correction immédiate.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { esc } = core;
  const content = window.ATELIER_S2.F;
  const profiles = content.profiles;

  const replyKey = i => `reply${i}`;
  const postureKey = i => `posture${i}`;
  const doneKey = i => `done${i}`;

  const caseDone = i => ex.value(doneKey(i)) === true;

  /* Le menu reprend la scène de chaque profil, comme l'exercice. */
  const gallery = () => (core.findExercise('s2-F').gallery || []);
  const cases = () => profiles.map((profile, i) => ({
    label: profile.label,
    hint: profile.quote,
    image: (gallery()[i] || {}).image,
    done: caseDone(i)
  }));

  function screen() {
    const i = ex.openCase() ?? 0;
    const profile = profiles[i];
    const reviewed = caseDone(i);
    const current = core.findExercise('s2-F');

    const body = reviewed
      ? `<div class="own-answer">
           <h4>Votre réponse d’écoute</h4>
           <p>« ${esc(ex.value(replyKey(i)))} »</p>
           ${ex.inlineNote(`Réponse modèle : « ${profile.model} »`, 'good')}
         </div>
         <div class="own-answer">
           <h4>Votre adaptation</h4>
           <p>« ${esc(ex.value(postureKey(i)))} »</p>
           ${ex.inlineNote(`Adaptation attendue : ${profile.adaptation}`, 'neutral')}
         </div>
         ${ex.inlineNote(content.criterion, 'neutral')}`
      : `${core.step(1, 'Votre réponse d’écoute', ex.field(replyKey(i), 'Votre réponse d’écoute', {
           placeholder: 'Écrivez votre réponse…', max: 320, rows: 4, hideLabel: true
         }), 'Répondez sans contredire ni vous justifier.')}
         ${core.step(2, 'Votre adaptation', ex.field(postureKey(i), 'Votre adaptation', {
           placeholder: 'J’ai adapté ma posture en…', max: 180, rows: 3, hideLabel: true
         }), 'En une phrase, expliquez votre posture.')}`;

    return `<div class="two-columns">
      <section class="scenario">
        ${core.pageTitle(content.eyebrow, content.title)}
        <p class="scene-intro">${esc(content.intro)}</p>
        ${core.scene((current.gallery || [])[i], profile.quote)}
        ${core.note(content.hint)}
      </section>
      <form class="panel answer-panel" novalidate>
        ${ex.caseBar(cases(), i, 'profil')}
        ${core.panelTitle(profile.label, core.rubricButton())}
        <div class="exercise-body">${body}</div>
        ${reviewed ? '' : ex.lockNote('La correction s’affiche dès que vous validez ce profil')}
        ${core.errorsBox()}
        ${ex.caseActions(cases(), i, 'Valider ma réponse')}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur le profil ouvert. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    const errors = [];
    if (!String(values[replyKey(i)] ?? '').trim()) errors.push({ key: replyKey(i), message: 'Formulez une réponse d’écoute.' });
    if (!String(values[postureKey(i)] ?? '').trim()) errors.push({ key: postureKey(i), message: 'Expliquez votre adaptation en une phrase.' });
    return errors;
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => profiles.every((_, i) => caseDone(i));

  const feedback = () => allDone()
    ? ['Les trois profils sont traités. Rouvrez-en un pour relire votre formulation et la réponse modèle.']
    : '';

  ex.mount('s2-F', {
    screen, validate, feedback, afterSubmit, allDone, cases,
    menuIntro: 'Trois profils d’interlocuteurs vous attendent. Choisissez celui que vous souhaitez traiter en premier.',
    onMount: () => core.wireRubric(window.ATELIER_S2.rubric)
  });
})();
