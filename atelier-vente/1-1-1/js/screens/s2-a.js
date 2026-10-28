/* S2 A · Choisir la réponse la plus juste.
 *
 * Trois clients, traités un par un. Après la consigne, l'apprenant choisit
 * le client qu'il veut traiter, répond, lit aussitôt sa correction, puis
 * revient au menu choisir le suivant. L'ordre est libre.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { esc } = core;
  const content = window.ATELIER_S2.A;
  const clients = content.clients;

  // Un jeu de champs par client : « choice0 », « why0 », « choice1 »…
  const choiceKey = i => `choice${i}`;
  const whyKey = i => `why${i}`;
  const doneKey = i => `done${i}`;
  // L'autoévaluation du cas i : « self0_0 », « self0_1 »…, ouverte par « selfOpen0 ».
  const selfKey = i => k => `self${i}_${k}`;
  const selfOpen = i => ex.value(`selfOpen${i}`) === true;
  const rubric = window.ATELIER_S2.rubric;

  /* Un client est « traité » une fois validé, pas seulement rempli : c'est
   * la validation qui déclenche sa correction et le marque au menu. */
  const caseDone = i => ex.value(doneKey(i)) === true;

  /* Ce que lit le menu : un libellé, l'état, la réplique en aperçu et la
   * scène du client, reprise de la galerie de l'exercice. */
  const gallery = () => (core.findExercise('s2-A').gallery || []);
  const cases = () => clients.map((client, i) => ({
    label: client.label,
    hint: client.quote,
    image: (gallery()[i] || {}).image,
    done: caseDone(i)
  }));

  /* Le corrigé d'un client, au modèle de S1 A (js/corrige.js) : votre
   * choix, votre autoévaluation face à ce que l'outil a repéré, le score
   * estimatif de ce client, puis votre justification face à une réponse
   * possible. */
  function reviewScreen(i, client, options) {
    const corrige = window.AtelierCorrige;
    const result = corrige.scoreCase('s2-A', i, ex.values());
    const bloc = result ? result.blocs[0] : null;
    return `<form class="an-review s2a-review" novalidate>
      ${ex.caseBar(cases(), i, 'client')}
      ${core.pageTitle('Corrigé', client.label, `Le client vous dit : « ${client.quote} »`)}
      <section class="panel">${core.panelTitle('Votre choix')}${ex.reviewOptions(options, ex.value(choiceKey(i)), client.answer)}</section>
      ${corrige.compare({ rubric, selfKey: selfKey(i), bloc, what: 'votre réponse' })}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre justification', bloc, text: ex.value(whyKey(i)), model: client.model })
      ])}
      ${core.errorsBox()}
      ${ex.caseActions(cases(), i)}
    </form>`;
  }

  function screen() {
    const i = ex.openCase() ?? 0;
    const client = clients[i];
    const reviewed = caseDone(i);
    const current = core.findExercise('s2-A');

    const options = client.options.map(option => ({
      id: option.id,
      label: option.text,
      badge: option.id
    }));
    if (reviewed) return reviewScreen(i, client, options);

    const picked = (options.find(o => o.id === ex.value(choiceKey(i))) || {}).label || '';
    const body = !reviewed && selfOpen(i)
      ? `<div class="own-answer">
           <h4>Votre réponse</h4>
           <p>« ${esc(picked)} »</p>
           <h4>Votre justification</h4>
           <p>« ${esc(ex.value(whyKey(i)))} »</p>
         </div>
         <h3 class="self-case-title">Votre autoévaluation</h3>
         ${window.AtelierKit ? `<div class="tour-corner">${window.AtelierKit.contextButton()}</div>` : ''}
         ${ex.selfList(rubric, selfKey(i))}`
      : `${ex.radioCards(choiceKey(i), options, 'answers')}
         ${ex.field(whyKey(i), 'Votre justification', {
           help: 'En une phrase, pourquoi les 3 autres réponses sont-elles moins adaptées ?',
           placeholder: 'Expliquez votre choix…', max: 240, rows: 3
         })}`;

    return `<div class="two-columns">
      <section class="scenario">
        ${core.pageTitle(content.eyebrow, content.title)}
        <p class="scene-intro">${esc(content.intro)}</p>
        ${core.scene((current.gallery || [])[i], client.quote)}
        ${core.note(content.hint)}
      </section>
      <form class="panel answer-panel" novalidate>
        ${ex.caseBar(cases(), i, 'client')}
        ${core.panelTitle(client.label)}
        <div class="exercise-body">${body}</div>
        ${ex.lockNote(selfOpen(i) ? 'La correction s’affiche dès que vous validez votre autoévaluation' : 'Après validation, vous faites votre autoévaluation, puis la correction s’affiche')}
        ${core.errorsBox()}
        ${selfOpen(i) && !reviewed ? `<div class="wiz-back">${core.button(`${core.icon('arrowLeft', { size: 17 })}<span>Modifier ma réponse</span>`, 'self-back', 'text-button with-icon')}</div>` : ''}
        ${ex.caseActions(cases(), i, selfOpen(i) ? 'Voir la correction' : 'Valider ma réponse')}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur le client ouvert. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    if (selfOpen(i)) return ex.selfErrors(rubric, selfKey(i), values);
    const errors = [];
    if (!values[choiceKey(i)]) errors.push({ key: choiceKey(i), message: 'Choisissez une réponse.' });
    if (!String(values[whyKey(i)] ?? '').trim()) errors.push({ key: whyKey(i), message: 'Justifiez votre choix en une phrase.' });
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

  /* L'exercice n'est terminé que lorsque les trois clients le sont. */
  const allDone = () => clients.every((_, i) => caseDone(i));

  /* Le pavé du bas ne sert qu'une fois tout traité : chaque correction est
   * déjà affichée sous les réponses du client concerné. */
  function feedback() {
    if (!allDone()) return '';
    const right = clients.filter((client, i) => ex.value(choiceKey(i)) === client.answer).length;
    return [right === clients.length
      ? 'Les trois prises de contact retenues sont celles attendues.'
      : `${right} choix sur ${clients.length} correspond${right > 1 ? 'ent' : ''} à la réponse attendue. Rouvrez un client pour relire sa correction.`];
  }

  /* Visite guidée, à l'ouverture du premier cas : ses zones n'existent pas
   * au menu, elle attend donc qu'un cas soit ouvert. Une fois vue, elle ne
   * revient plus (les cas suivants s'ouvrent sans visite). */
  // À l'arrivée sur l'autoévaluation d'un client : ce qu'on a sous les yeux.
  if (window.AtelierKit) window.AtelierKit.selfContext('.self-case-title', [
    ['eye', 'Ce que vous voyez', ['En haut, la réponse choisie et votre justification.', 'En dessous, les critères d’une bonne réponse.']],
    ['list', 'Ce qui vous est demandé', 'Relisez votre réponse. Pour chaque critère, dites si elle y répond : « Oui », « En partie » ou « Non ».'],
    ['checkCircle', 'Ensuite', 'La correction de ce client s’affiche. Vous comparez votre regard avec le sien.']
  ]);

  if (window.AtelierKit) window.AtelierKit.tour('s2-A', [
    { target: '.scenario .case-scene', title: 'Le client', text: 'Voici le client et ce qu’il vous dit.' },
    { target: '.case-bar', title: 'Les trois clients', text: 'Ce compteur montre combien de clients vous avez traités. « Tous les clients » ramène au menu.' },
    { target: '.answer-panel .exercise-body', title: 'Votre réponse', text: 'Choisissez la meilleure réponse, puis justifiez votre choix en une phrase.' },
    { target: '#main .form-actions', title: 'Valider', text: 'Vous évaluez ensuite votre réponse, puis la correction s’affiche.' }
  ]);

  ex.mount('s2-A', {
    screen, validate, intercept, feedback, afterSubmit, allDone, cases,
    menuIntro: 'Trois clients vous attendent. Choisissez celui que vous souhaitez traiter en premier.',
    onMount: () => core.$('[data-action="self-back"]')?.addEventListener('click', () => {
      ex.setValue(`selfOpen${ex.openCase() ?? 0}`, false);
      core.persist();
      ex.render();
    })
  });
})();
