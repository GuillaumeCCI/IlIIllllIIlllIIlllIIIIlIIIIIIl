/* S3 1.3 · Diagnostiquer l’objection.
 *
 * Quatre objections, traitées une par une depuis le menu des cas. Chaque
 * objection demande deux décisions successives : la nature probable, puis le
 * premier geste. Une objection validée ouvre la suivante, sans correction.
 * Les quatre faites, l’apprenant s’auto-évalue avec le mémo ; ensuite
 * seulement, toutes les corrections s’affichent d’un coup.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const kit = window.AtelierKit;
  const content = window.ATELIER_S3['1.3'];
  const cases = content.cases;

  const natureKey = i => `nature${i}`;
  const gestureKey = i => `gesture${i}`;
  const doneKey = i => `done${i}`;

  const caseDone = i => ex.value(doneKey(i)) === true;
  const answered = () => cases.every((_, i) => caseDone(i));

  /* L’auto-évaluation s’ouvre après la quatrième objection ; une fois
   * validée, l’exercice est terminé et les corrections sont visibles. */
  const selfKey = i => `self${i}`;
  const finished = () => ex.value('selfDone') === true;
  const selfShown = () => ex.value('selfCheck') === true && !finished();

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
  const labelOf = (list, id) => (list.find(option => option.id === id) || {}).label || 'sans réponse';

  /* Une ligne de la grille par objection : la réplique, puis le diagnostic
   * de l’apprenant, à juger d’après le mémo. */
  const rubric = () => cases.map((item, i) => [`« ${item.quote} »`,
    `Votre diagnostic : ${labelOf(content.natures, ex.value(natureKey(i)))}, puis ${labelOf(content.gestures, ex.value(gestureKey(i))).toLowerCase()}.`]);

  // Le mémo, en fenêtre pendant l’exercice et à côté de la grille.
  const memo = () => `<dl>${content.natures.map(nature =>
      `<dt>${esc(nature.label)}</dt><dd>${esc(nature.description)}</dd>`).join('')}</dl>
    <dl>${content.gestures.map(gesture =>
      `<dt>${esc(gesture.label)}</dt><dd>${esc(gesture.description)}</dd>`).join('')}</dl>`;

  /* La carte posée sur le fond : le retour au menu et le titre en haut. */
  const sheet = (aside, body) => `<div class="case-sheet">
      <form class="panel case-panel" novalidate>
        <header class="case-sheet-head">
          <div class="case-sheet-nav">
            ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Toutes les objections</span>`, 'back-to-menu', 'text-button with-icon')}
            <h1>${esc(content.title)}</h1>
          </div>
          <div class="case-sheet-aside">${aside}</div>
        </header>
        ${body}
      </form>
    </div>`;

  function selfScreen() {
    return sheet('', `<section class="self-eval">
        <p class="eyebrow">Auto-évaluation</p>
        <h2>Vos diagnostics correspondent-ils au mémo ?</h2>
        <p class="muted">Relisez chaque diagnostic avec le mémo. Les corrections s’affichent ensuite.</p>
        <div class="self-layout">
          <aside class="panel self-recap diag-memo">
            <h2>Le mémo</h2>
            ${memo()}
          </aside>
          <div class="self-form">
            ${ex.selfList(rubric(), selfKey)}
            ${core.errorsBox()}
            ${ex.actions('Voir les corrections')}
          </div>
        </div>
      </section>`);
  }

  /* Toutes les corrections d’un coup : pour chaque objection, les deux
   * décisions relues, puis l’explication. L’auto-évaluation suit. */
  function reviewScreen() {
    return sheet('', `<section class="diag-review">
        <h2>Les corrections</h2>
        <ol class="diag-review-list">${cases.map((item, i) => {
          const bothRight = ex.value(natureKey(i)) === item.nature && ex.value(gestureKey(i)) === item.gesture;
          return `<li class="diag-review-item">
            ${core.quote(item.quote)}
            <h4 class="review-heading">La nature de l’objection</h4>
            ${ex.reviewOptions(natureOptions, ex.value(natureKey(i)), item.nature)}
            <h4 class="review-heading">Votre premier geste</h4>
            ${ex.reviewOptions(gestureOptions, ex.value(gestureKey(i)), item.gesture)}
            ${ex.inlineNote(item.feedback, bothRight ? 'good' : 'bad')}
          </li>`;
        }).join('')}</ol>
        ${ex.selfSummary(rubric(), selfKey, 'vos diagnostics')}
        ${core.feedbackBox()}
      </section>`);
  }

  function screen() {
    if (finished()) return reviewScreen();
    if (selfShown()) return selfScreen();
    const i = ex.openCase() ?? 0;
    const item = cases[i];
    const at = stage(i);

    /* Le fil des deux temps, discret, posé près du titre : un gros
     * stepper horizontal occupait la largeur sans rien apprendre de plus. */
    const steps = `<p class="case-step-line">Cas ${i + 1} sur ${cases.length} · Étape ${at} sur 2
      <span class="case-step-dots"><span class="case-step-dot filled"></span><span class="case-step-dot ${at >= 2 ? 'filled' : ''}"></span></span></p>`;

    const body = at === 1
      ? `<h2>Quelle est la nature probable de cette objection ?</h2>
         <p class="muted">Choisissez la réponse la plus vraisemblable.</p>
         ${ex.radioCards(natureKey(i), content.natures, 'two')}
         <p class="muted asset-note">Le premier geste sera choisi à l’étape suivante.</p>`
      : `<h2>Quel est votre premier geste ?</h2>
         <p class="muted">Choisissez l’action qui ouvre le mieux la suite de l’échange.</p>
         ${ex.radioCards(gestureKey(i), content.gestures, 'two')}`;

    // La dernière objection validée ouvre l’auto-évaluation.
    const last = cases.every((_, n) => n === i || caseDone(n));
    return sheet(`${steps}
        ${core.button(`${icon('list', { size: 17 })}<span>Voir le mémo</span>`, 'memo', 'text-button with-icon')}
        ${kit ? `<span class="tour-pair">${kit.contextButton()}${kit.tourButton()}</span>` : ''}`,
      `${ex.caseDots(caseList(), i)}
        ${core.quote(item.quote)}
        ${body}
        ${core.errorsBox()}
        ${ex.actions(at === 1 ? 'Continuer' : last ? 'Valider et m’auto-évaluer' : 'Valider cette objection')}`);
  }

  /* La validation ne porte que sur l’écran en cours : l’étape 1 n’exige pas
   * encore le geste ; la grille attend une réponse par objection. */
  function validate(values) {
    if (selfShown()) return ex.selfErrors(rubric(), selfKey, values, 'dites si votre diagnostic correspond au mémo');
    const i = ex.openCase() ?? 0;
    if (stage(i) === 1) {
      return values[natureKey(i)] ? [] : [{ key: natureKey(i), message: 'Identifiez la nature de cette objection.' }];
    }
    return values[gestureKey(i)] ? [] : [{ key: gestureKey(i), message: 'Choisissez votre premier geste.' }];
  }

  /* Étape 1 : on passe à l’étape 2. Étape 2 : l’objection est notée traitée
   * et la suivante s’ouvre ; après la dernière, l’auto-évaluation. Seule la
   * grille valide vraiment l’exercice. */
  function intercept(values) {
    if (finished() || selfShown()) return false;
    const i = ex.openCase() ?? 0;
    if (stage(i) === 1) {
      if (!values[natureKey(i)]) return false;
      ex.setValue(stageKey(i), 2);
      return true;
    }
    if (!values[gestureKey(i)]) return false;
    ex.setValue(doneKey(i), true);
    const next = cases.findIndex((_, n) => !caseDone(n));
    if (next !== -1) ex.setValue('openCase', next);
    else ex.setValue('selfCheck', true);
    return true;
  }

  function afterSubmit() {
    if (selfShown()) ex.setValue('selfDone', true);
  }

  const allDone = () => answered() && finished();

  function feedback() {
    if (!allDone()) return '';
    const right = cases.filter((item, i) =>
      ex.value(natureKey(i)) === item.nature && ex.value(gestureKey(i)) === item.gesture).length;
    return [`${right} objection${right > 1 ? "s" : ""} sur ${cases.length} entièrement correcte${right > 1 ? "s" : ""}.`];
  }

  function onMount() {
    const button = core.$('[data-action="memo"]');
    if (button) button.addEventListener('click', () => core.openDialog('Mémo · diagnostiquer une objection',
      `<p class="muted">Repères proposés pour l’auto-évaluation.</p>${memo()}`));
  }

  // Au tout début, sur le menu des objections : de quoi parle l'exercice.
  if (kit) kit.context([
    ['target', 'La situation', 'Quatre clients vous opposent chacun une objection.'],
    ['list', 'Diagnostiquer', 'C’est reconnaître la nature de l’objection, puis choisir le premier geste pour y répondre.'],
    ['pencil', 'Ce qui vous est demandé', 'Pour chaque objection, choisir sa nature, puis votre premier geste.']
  ], 'Diagnostiquer une objection');

  // La visite guidée part à l'ouverture de la première objection.
  if (kit) kit.tour('s3-1.3', [
    { target: '.case-panel .client-quote', title: 'L’objection', text: 'Lisez ce que vous dit le client.' },
    { target: '.case-step-line', title: 'Deux étapes',
      items: [
        { key: '1', tone: 'blue', text: 'la nature de l’objection ;' },
        { key: '2', tone: 'coral', text: 'votre premier geste.' }
      ] },
    { target: '.case-panel .radio-cards', title: '1. Choisissez sa nature', text: 'Cliquez sur la nature la plus probable.' },
    { target: '.case-panel [data-action="memo"]', title: 'Le mémo', text: 'Un doute ? Le mémo rappelle chaque nature et chaque geste.' },
    { target: '.form-actions', title: '2. Continuez', text: '« Continuer » ouvre l’étape du premier geste.',
      after: 'Les corrections s’affichent à la fin, après votre auto-évaluation.' }
  ]);

  ex.mount('s3-1.3', {
    screen, validate, feedback, intercept, afterSubmit, allDone, onMount,
    cases: caseList,
    menuIntro: 'Choisissez une situation à traiter. Vous pourrez revenir aux autres ensuite.', menuLayout: 'rows'
  });
})();
