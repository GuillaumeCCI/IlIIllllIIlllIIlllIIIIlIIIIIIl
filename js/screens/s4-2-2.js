/* S4 2.2 · Réparez la conversation.
 *
 * Trois situations, traitées une par une depuis le menu des cas :
 * remplacer la réponse réflexe par une reformulation de compréhension,
 * puis lire aussitôt la formulation attendue.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S4['2.2'];
  const situations = content.situations;

  const repairKey = i => `repair${i}`;
  const doneKey = i => `done${i}`;

  const caseDone = i => ex.value(doneKey(i)) === true;

  const cases = () => situations.map((situation, i) => ({
    label: `Situation ${i + 1}`,
    hint: situation.client,
    done: caseDone(i)
  }));

  function screen() {
    const i = ex.openCase() ?? 0;
    const situation = situations[i];
    const reviewed = caseDone(i);

    const answer = reviewed
      ? `<div class="own-answer">
           <h4>Votre réponse de compréhension</h4>
           <p>« ${esc(ex.value(repairKey(i)))} »</p>
           ${ex.inlineNote(`Reformulation attendue, à titre d’exemple : « ${situation.model} »`, 'good')}
         </div>`
      : ex.field(repairKey(i), 'Votre réponse de compréhension', {
          placeholder: 'Écrivez votre reformulation…', max: 240, rows: 4
        });

    /* Les deux répliques se font face : ce que dit le client à gauche,
     * le réflexe à remplacer à droite. L'écart entre les deux est ce que
     * l'exercice demande de combler. */
    return `<div class="repair">
      <header class="repair-head">
        <div>
          ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Toutes les situations</span>`, 'back-to-menu', 'text-button with-icon')}
          <p class="eyebrow">${esc(content.eyebrow)}</p>
          <h1>${esc(content.title)}</h1>
          <p class="subtitle">${esc(content.intro)}</p>
        </div>
        <p class="repair-count">Situation <strong>${i + 1}</strong> / ${situations.length}</p>
      </header>

      <div class="repair-exchange">
        <div class="repair-bubble is-client">
          <span class="avatar" aria-hidden="true">CL</span>
          <div class="bubble client"><span class="who">Le client</span>${esc(situation.client)}</div>
        </div>
        <span class="repair-link" aria-hidden="true">${icon('arrowRight', { size: 20 })}</span>
        <div class="repair-bubble is-reflex">
          <div class="bubble reflex"><span class="who">Réflexe à remplacer</span>${esc(situation.reflex)}</div>
          <span class="avatar" aria-hidden="true">VO</span>
        </div>
      </div>

      <form class="panel repair-sheet" novalidate>
        <h2 class="repair-question">${icon('pencil', { size: 20 })}<span>Reformulez ce que le client exprime, sans défendre l’offre immédiatement.</span></h2>
        ${answer}
        ${reviewed ? '' : ex.lockNote('Un exemple de reformulation apparaîtra après validation.')}
        ${core.errorsBox()}
        ${ex.caseActions(cases(), i, 'Valider ma réponse')}
      </form>
    </div>`;
  }

  function validate(values) {
    const i = ex.openCase() ?? 0;
    return String(values[repairKey(i)] ?? '').trim()
      ? []
      : [{ key: repairKey(i), message: 'Proposez une reformulation de compréhension.' }];
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => situations.every((_, i) => caseDone(i));

  const feedback = () => allDone() ? [content.valued] : '';

  ex.mount('s4-2.2', {
    screen, validate, feedback, afterSubmit, allDone, cases,
    menuIntro: 'Choisissez un échange à reprendre.', menuLayout: 'rows'
  });
})();
