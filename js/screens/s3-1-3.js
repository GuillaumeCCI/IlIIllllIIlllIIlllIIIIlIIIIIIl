/* S3 1.3 · Diagnostiquer l’objection.
 *
 * Quatre objections, traitées une par une depuis le menu des cas. Chaque
 * objection demande deux décisions successives : la nature probable, puis le
 * premier geste. La correction des deux s’affiche dès la validation du cas.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.3'];
  const cases = content.cases;

  const natureKey = i => `nature${i}`;
  const gestureKey = i => `gesture${i}`;
  const doneKey = i => `done${i}`;

  const caseDone = i => ex.value(doneKey(i)) === true;

  /* Ce que lit le menu : le numéro, la réplique en aperçu, et l’état. */
  const caseList = () => cases.map((item, i) => ({
    label: `Objection ${i + 1}`,
    hint: item.quote,
    done: caseDone(i)
  }));

  /* Les deux temps d’une objection. L’étape est propre au cas ouvert, pour
   * qu’un retour au menu puis une réouverture reprenne au bon endroit. */
  const stageKey = i => `stage${i}`;
  const stage = i => Number(ex.value(stageKey(i))) === 2 ? 2 : 1;

  const natureOptions = content.natures.map(n => ({ id: n.id, label: n.label }));
  const gestureOptions = content.gestures.map(g => ({ id: g.id, label: g.label }));

  function screen() {
    const i = ex.openCase() ?? 0;
    const item = cases[i];
    const reviewed = caseDone(i);
    const at = stage(i);

    /* Le fil des deux temps, discret, posé près du titre : un gros
     * stepper horizontal occupait la largeur sans rien apprendre de plus. */
    const steps = `<p class="case-step-line">Cas ${i + 1} sur ${cases.length} · Étape ${at} sur 2
      <span class="case-step-dots"><span class="case-step-dot filled"></span><span class="case-step-dot ${at >= 2 ? 'filled' : ''}"></span></span></p>`;

    /* Une fois le cas validé, les deux décisions sont relues l’une sous
     * l’autre, chacune marquée, puis l’explication de l’objection. */
    const bothRight = ex.value(natureKey(i)) === item.nature && ex.value(gestureKey(i)) === item.gesture;
    const body = reviewed
      ? `<h2>Vos deux décisions, relues</h2>
         <h4 class="review-heading">La nature de l’objection</h4>
         ${ex.reviewOptions(natureOptions, ex.value(natureKey(i)), item.nature)}
         <h4 class="review-heading">Votre premier geste</h4>
         ${ex.reviewOptions(gestureOptions, ex.value(gestureKey(i)), item.gesture)}
         ${ex.inlineNote(item.feedback, bothRight ? 'good' : 'bad')}`
      : at === 1
      ? `<h2>Quelle est la nature probable de cette objection ?</h2>
         <p class="muted">Choisissez la réponse la plus vraisemblable.</p>
         ${ex.radioCards(natureKey(i), content.natures, 'two')}
         <p class="muted asset-note">Le premier geste sera choisi à l’étape suivante.</p>`
      : `<h2>Quel est votre premier geste ?</h2>
         <p class="muted">Choisissez l’action qui ouvre le mieux la suite de l’échange.</p>
         ${ex.radioCards(gestureKey(i), content.gestures, 'two')}`;

    /* Tant que l’objection n’est pas validée, le bouton fait avancer d’une
     * étape ; une fois validée, la barre propose le cas suivant. */
    const actions = reviewed
      ? ex.caseActions(caseList(), i, 'Valider cette objection')
      : ex.actions(at === 1 ? 'Continuer' : 'Valider cette objection');

    /* Tout l'exercice tient dans une carte posée sur le fond : le retour
     * au menu et le mémo en haut, la réplique, puis les réponses. */
    return `<div class="case-sheet">
      <form class="panel case-panel" novalidate>
        <header class="case-sheet-head">
          <div class="case-sheet-nav">
            ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Toutes les objections</span>`, 'back-to-menu', 'text-button with-icon')}
            <h1>${esc(content.title)}</h1>
          </div>
          <div class="case-sheet-aside">
            ${reviewed ? '' : steps}
            ${core.button(`${icon('list', { size: 17 })}<span>Voir le mémo</span>`, 'memo', 'text-button with-icon')}
          </div>
        </header>

        ${ex.caseDots(caseList(), i)}
        ${core.quote(item.quote)}
        ${body}
        ${core.errorsBox()}
        ${actions}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur l’objection ouverte, et seulement sur
   * l’étape en cours : l’étape 1 n’exige pas encore le geste. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    if (stage(i) === 1) {
      return values[natureKey(i)] ? [] : [{ key: natureKey(i), message: 'Identifiez la nature de cette objection.' }];
    }
    return values[gestureKey(i)] ? [] : [{ key: gestureKey(i), message: 'Choisissez votre premier geste.' }];
  }

  /* Étape 1 : on passe à l’étape 2 sans rien conclure. */
  function intercept() {
    const i = ex.openCase() ?? 0;
    if (caseDone(i) || stage(i) === 2) return false;
    if (!ex.value(natureKey(i))) return false;
    ex.setValue(stageKey(i), 2);
    return true;
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => cases.every((_, i) => caseDone(i));

  function feedback() {
    if (!allDone()) return '';
    const right = cases.filter((item, i) =>
      ex.value(natureKey(i)) === item.nature && ex.value(gestureKey(i)) === item.gesture).length;
    return [`${right} objection sur ${cases.length} entièrement correcte${right > 1 ? 's' : ''}. Rouvrez une objection pour relire ses deux décisions et son explication.`];
  }

  function answerKey() {
    return `<div class="answer-key"><h4>Le détail, objection par objection</h4>${cases.map((item, i) => {
      const ok = ex.value(natureKey(i)) === item.nature && ex.value(gestureKey(i)) === item.gesture;
      const nature = content.natures.find(n => n.id === item.nature).label;
      const gesture = content.gestures.find(g => g.id === item.gesture).label;
      return `<div class="answer-key-row">
        <span class="verdict ${ok ? 'ok' : 'ko'}">${icon(ok ? 'check' : 'close', { size: 14, label: ok ? 'correct' : 'incorrect' })}</span>
        <span><strong>« ${esc(item.quote)} »</strong> ${esc(nature)}, puis ${esc(gesture).toLowerCase()}.</span>
      </div>`;
    }).join('')}</div>`;
  }

  function onMount() {
    const memo = core.$('[data-action="memo"]');
    if (memo) memo.addEventListener('click', () => core.openDialog('Mémo · diagnostiquer une objection',
      `<p class="muted">Repères proposés pour l’auto-évaluation.</p><dl>${content.natures.map(nature =>
        `<dt>${esc(nature.label)}</dt><dd>${esc(nature.description)}</dd>`).join('')}</dl>
       <dl>${content.gestures.map(gesture =>
        `<dt>${esc(gesture.label)}</dt><dd>${esc(gesture.description)}</dd>`).join('')}</dl>`));
  }

  ex.mount('s3-1.3', {
    screen, validate, feedback, answerKey, intercept, afterSubmit, allDone, onMount,
    cases: caseList,
    menuIntro: 'Choisissez une situation à traiter. Vous pourrez revenir aux autres ensuite.', menuLayout: 'rows'
  });
})();
