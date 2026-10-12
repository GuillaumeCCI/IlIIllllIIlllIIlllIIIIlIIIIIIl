/* S3 1.7 · Construisez vos cartes réflexes.
 *
 * Quatre objections, traitées une par une depuis le menu des cas. Chaque
 * carte se construit en trois temps : décoder, creuser, répondre. La
 * correction de la carte s’affiche dès que ses trois temps sont validés.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.7'];
  const cards = content.cards;

  const stages = ['Décoder', 'Creuser', 'Répondre'];
  const natureKey = i => `nature${i}`;
  const digKey = i => `dig${i}`;
  const replyKey = i => `reply${i}`;
  const doneKey = i => `done${i}`;

  const cardDone = i => ex.value(doneKey(i)) === true;

  /* Ce que lit le menu : le numéro, l’objection en aperçu, et l’état. */
  const caseList = () => cards.map((card, i) => ({
    label: `Objection ${i + 1}`,
    hint: card.objection,
    done: cardDone(i)
  }));

  /* Le temps en cours est propre à la carte ouverte : revenir au menu puis
   * rouvrir une carte reprend là où elle en était. */
  const stageKey = i => `stage${i}`;
  const stage = i => Math.min(3, Math.max(1, Number(ex.value(stageKey(i))) || 1));

  const natureOptions = content.natures.map(n => ({ id: n.id, label: n.label }));

  function screen() {
    const i = ex.openCase() ?? 0;
    const card = cards[i];
    const reviewed = cardDone(i);
    const at = stage(i);

    const body = reviewed
      ? `<h4 class="review-heading">La nature de l’objection</h4>
         ${ex.reviewOptions(natureOptions, ex.value(natureKey(i)), card.answer)}
         <div class="own-answer">
           <h4>Votre question pour creuser</h4>
           <p>« ${esc(ex.value(digKey(i)))} »</p>
         </div>
         <div class="own-answer">
           <h4>Votre réponse avec preuve</h4>
           <p>« ${esc(ex.value(replyKey(i)))} »</p>
         </div>
         ${ex.inlineNote(card.feedback, ex.value(natureKey(i)) === card.answer ? 'good' : 'bad')}`
      : at === 1
      ? `<h2>Quelle est la nature de cette objection ?</h2>
         <p class="muted">Choisissez une réponse.</p>
         ${ex.radioCards(natureKey(i), content.natures, 'two')}`
      : at === 2
      ? `<h2>Quelle question permet de creuser ?</h2>
         <p class="muted">Une question ouverte, qui fait préciser sans suggérer la réponse.</p>
         ${ex.field(digKey(i), 'Votre question', { placeholder: 'Par rapport à quoi…', max: 240, rows: 3, hideLabel: true })}`
      : `<h2>Votre réponse, avec une preuve</h2>
         <p class="muted">Appuyez-vous sur un élément vérifiable plutôt que sur une promesse.</p>
         ${ex.field(replyKey(i), 'Votre réponse', { placeholder: 'Concrètement…', max: 400, rows: 4, hideLabel: true })}`;

    const steps = `<div class="stepper">${stages.map((label, n) => `<div class="stepper-item ${n + 1 === at ? 'active' : ''} ${n + 1 < at ? 'done' : ''}">
      <span class="stepper-dot">${n + 1}</span><span class="stepper-label">${esc(label.toUpperCase())}</span>
    </div>`).join('')}</div>`;

    /* Les deux premiers temps font avancer la carte ; le troisième la
     * valide, et la barre propose alors la carte suivante. */
    const actions = reviewed
      ? ex.caseActions(caseList(), i, 'Valider cette carte')
      : ex.actions(at < 3 ? 'Continuer' : 'Valider cette carte');

    return `<div class="two-columns">
      <section class="panel scenario">
        ${core.pageTitle(content.eyebrow, content.title, content.intro)}
        <div class="deck" style="margin-top:14px">
          <article class="draggable-card" draggable="false" style="cursor:default">
            <span class="tag">Objection ${i + 1}</span>
            <p style="margin-top:12px">« ${esc(card.objection)} »</p>
          </article>
        </div>
      </section>
      <form class="panel answer-panel" novalidate>
        ${ex.caseBar(caseList(), i, { noun: 'carte', feminine: true })}
        ${reviewed ? '' : steps}
        ${body}
        ${reviewed ? '' : ex.lockNote('Le corrigé de cette carte s’affiche dès que vous l’avez construite')}
        ${core.errorsBox()}
        ${actions}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur la carte ouverte, et seulement sur son
   * temps en cours : décoder n’exige pas encore la question ni la réponse. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    const at = stage(i);
    if (at === 1) {
      return values[natureKey(i)] ? [] : [{ key: natureKey(i), message: 'Identifiez la nature de cette objection.' }];
    }
    if (at === 2) {
      return String(values[digKey(i)] ?? '').trim()
        ? [] : [{ key: digKey(i), message: 'Proposez une question pour creuser.' }];
    }
    return String(values[replyKey(i)] ?? '').trim()
      ? [] : [{ key: replyKey(i), message: 'Rédigez votre réponse avec une preuve.' }];
  }

  /* Temps 1 et 2 : on avance dans la carte sans rien conclure. */
  function intercept() {
    const i = ex.openCase() ?? 0;
    if (cardDone(i)) return false;
    const at = stage(i);
    if (at === 1) {
      if (!ex.value(natureKey(i))) return false;
      ex.setValue(stageKey(i), 2);
      return true;
    }
    if (at === 2) {
      if (!String(ex.value(digKey(i)) ?? '').trim()) return false;
      ex.setValue(stageKey(i), 3);
      return true;
    }
    return false;
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => cards.every((_, i) => cardDone(i));

  function feedback() {
    if (!allDone()) return '';
    const right = cards.filter((card, i) => ex.value(natureKey(i)) === card.answer).length;
    return [`${right} nature sur ${cards.length} correctement identifiée${right > 1 ? 's' : ''}. Rouvrez une carte pour relire votre question, votre réponse et l’analyse attendue.`];
  }

  function answerKey() {
    return `<div class="answer-key"><h4>Le détail, carte par carte</h4>${cards.map((card, i) => {
      const ok = ex.value(natureKey(i)) === card.answer;
      const label = content.natures.find(n => n.id === card.answer).label;
      return `<div class="answer-key-row">
        <span class="verdict ${ok ? 'ok' : 'ko'}">${icon(ok ? 'check' : 'close', { size: 14, label: ok ? 'correct' : 'incorrect' })}</span>
        <span><strong>« ${esc(card.objection)} »</strong> ${esc(label)}.</span>
      </div>`;
    }).join('')}</div>`;
  }

  ex.mount('s3-1.7', {
    screen, validate, feedback, answerKey, intercept, afterSubmit, allDone,
    cases: caseList,
    menuIntro: 'Quatre cartes réflexes à construire. Choisissez l’objection que vous souhaitez travailler en premier.'
  });
})();
