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
  // L'autoévaluation du cas i : « self0_0 », « self0_1 »…, ouverte par « selfOpen0 ».
  const selfKey = i => k => `self${i}_${k}`;
  const selfOpen = i => ex.value(`selfOpen${i}`) === true;
  const rubric = window.ATELIER_S2.rubric;

  const caseDone = i => ex.value(doneKey(i)) === true;

  /* Le menu reprend la scène de chaque profil, comme l'exercice. */
  const gallery = () => (core.findExercise('s2-F').gallery || []);
  const cases = () => profiles.map((profile, i) => ({
    label: profile.label,
    hint: profile.quote,
    image: (gallery()[i] || {}).image,
    done: caseDone(i)
  }));

  /* Le corrigé d'un profil, au modèle de S1 A (js/corrige.js) : votre
   * autoévaluation face à ce que l'outil a repéré, le score estimatif de ce
   * profil, puis vos deux réponses, chacune face à une réponse possible. */
  function reviewScreen(i, profile) {
    const corrige = window.AtelierCorrige;
    const result = corrige.scoreCase('s2-F', [2 * i, 2 * i + 1], ex.values());
    const [replyBloc, postureBloc] = result ? result.blocs : [];
    const all = result ? { lines: result.blocs.flatMap(b => b.lines) } : null;
    return `<form class="an-review s2f-review" novalidate>
      ${ex.caseBar(cases(), i, 'profil')}
      ${core.pageTitle('Corrigé', profile.label, `Le client vous dit : « ${profile.quote} »`)}
      ${corrige.compare({ rubric, selfKey: selfKey(i), bloc: all, what: 'vos deux réponses' })}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre réponse d’écoute', bloc: replyBloc, text: ex.value(replyKey(i)), model: `Vous pouviez écrire : « ${profile.model} »` }),
        corrige.row({ n: 2, title: 'Votre adaptation', bloc: postureBloc, text: ex.value(postureKey(i)), model: profile.adaptation })
      ])}
      ${core.errorsBox()}
      ${ex.caseActions(cases(), i)}
    </form>`;
  }

  function screen() {
    const i = ex.openCase() ?? 0;
    const profile = profiles[i];
    const reviewed = caseDone(i);
    const current = core.findExercise('s2-F');
    if (reviewed) return reviewScreen(i, profile);

    const body = !reviewed && selfOpen(i)
      ? `<div class="own-answer">
           <h4>Votre réponse d’écoute</h4>
           <p>« ${esc(ex.value(replyKey(i)))} »</p>
           <h4>Votre adaptation</h4>
           <p>« ${esc(ex.value(postureKey(i)))} »</p>
         </div>
         <h3 class="self-case-title">Votre autoévaluation</h3>
         ${window.AtelierKit ? `<div class="tour-corner">${window.AtelierKit.contextButton()}</div>` : ''}
         ${ex.selfList(rubric, selfKey(i))}`
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
        ${core.panelTitle(profile.label)}
        <div class="exercise-body">${body}</div>
        ${ex.lockNote(selfOpen(i) ? 'La correction s’affiche dès que vous validez votre autoévaluation' : 'Après validation, vous faites votre autoévaluation, puis la correction s’affiche')}
        ${core.errorsBox()}
        ${selfOpen(i) && !reviewed ? `<div class="wiz-back">${core.button(`${core.icon('arrowLeft', { size: 17 })}<span>Modifier ma réponse</span>`, 'self-back', 'text-button with-icon')}</div>` : ''}
        ${ex.caseActions(cases(), i, selfOpen(i) ? 'Voir la correction' : 'Valider ma réponse')}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur le profil ouvert. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    if (selfOpen(i)) return ex.selfErrors(rubric, selfKey(i), values);
    const errors = [];
    if (!String(values[replyKey(i)] ?? '').trim()) errors.push({ key: replyKey(i), message: 'Formulez une réponse d’écoute.' });
    if (!String(values[postureKey(i)] ?? '').trim()) errors.push({ key: postureKey(i), message: 'Expliquez votre adaptation en une phrase.' });
    return errors;
  }

  // Le cas rempli, « Valider ma réponse » ouvre son autoévaluation au lieu de la correction.
  function intercept(values) {
    const i = ex.openCase() ?? 0;
    if (caseDone(i) || selfOpen(i) || validate(values).length) return false;
    ex.setValue(`selfOpen${i}`, true);
    return true;
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => profiles.every((_, i) => caseDone(i));

  const feedback = () => allDone()
    ? ['Les trois profils sont traités. Rouvrez-en un pour relire votre formulation et une réponse possible.']
    : '';

  /* Visite guidée, à l'ouverture du premier cas : ses zones n'existent pas
   * au menu, elle attend donc qu'un cas soit ouvert. Une fois vue, elle ne
   * revient plus (les cas suivants s'ouvrent sans visite). */
  // À l'arrivée sur l'autoévaluation d'un profil : ce qu'on a sous les yeux.
  if (window.AtelierKit) window.AtelierKit.selfContext('.self-case-title', [
    ['eye', 'Ce que vous voyez', ['En haut, votre réponse d’écoute et votre adaptation.', 'En dessous, les critères d’une bonne réponse.']],
    ['list', 'Ce qui vous est demandé', 'Relisez vos deux réponses. Pour chaque critère, dites si elles y répondent : « Oui », « En partie » ou « Non ».'],
    ['checkCircle', 'Ensuite', 'La correction de ce profil s’affiche. Vous comparez votre regard avec le sien.']
  ]);

  if (window.AtelierKit) window.AtelierKit.tour('s2-F', [
    { target: '.scenario .case-scene', title: 'Le profil', text: 'Voici le client et ce qu’il vous dit.' },
    { target: '.case-bar', title: 'Les trois profils', text: 'Ce compteur montre combien de profils vous avez traités. « Tous les profils » ramène au menu.' },
    { target: '.answer-panel .exercise-body', title: 'Vos deux réponses', text: 'Écrivez votre réponse d’écoute, puis, en une phrase, comment vous adaptez votre posture.' },
    { target: '#main .form-actions', title: 'Valider', text: 'Vous évaluez ensuite votre réponse, puis la correction s’affiche.' }
  ]);

  ex.mount('s2-F', {
    screen, validate, intercept, feedback, afterSubmit, allDone, cases,
    menuIntro: 'Trois profils d’interlocuteurs vous attendent. Choisissez celui que vous souhaitez traiter en premier.',
    onMount: () => core.$('[data-action="self-back"]')?.addEventListener('click', () => {
      ex.setValue(`selfOpen${ex.openCase() ?? 0}`, false);
      core.persist();
      ex.render();
    })
  });
})();
