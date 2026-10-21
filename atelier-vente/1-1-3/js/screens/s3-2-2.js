/* S3 2.2 · Passez en mode traitement.
 *
 * Trois répliques de prospect et, pour chacune, le mauvais réflexe d'un
 * commercial. On explique pourquoi ce réflexe bloque, puis on rédige la
 * réponse adaptée. « Enregistrer » passe au cas suivant encore incomplet ;
 * les 3 cas faits, une auto-évaluation (accueil, question, suite) précède
 * le corrigé.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['2.2'];
  const cases = content.cases;
  const SELF = cases.length;
  const scale = [{ id: '2', label: 'Oui' }, { id: '1', label: 'En partie' }, { id: '0', label: 'Pas encore' }];

  const complete = i => kit.filled(ex.value(`why${i}`)) && kit.filled(ex.value(`reply${i}`));
  const doneCount = () => cases.filter((_, i) => complete(i)).length;
  const allDone = () => doneCount() === cases.length;
  const current = () => {
    const n = Number(ex.value('case'));
    return Number.isInteger(n) && n >= 0 && (n < cases.length || (n === SELF && allDone())) ? n : 0;
  };

  function tabs(at) {
    return `<div class="fix-tabs">${cases.map((c, i) => `<button type="button" class="fix-tab ${i === at ? 'is-current' : ''} ${complete(i) ? 'is-done' : ''}" data-act="case" data-index="${i}" aria-label="Réplique ${i + 1} · ${esc(c.tab)} : « ${esc(c.client)} »">
      <span class="fix-n">${complete(i) && i !== at ? icon('check', { size: 18 }) : String(i + 1).padStart(2, '0')}</span><span class="fix-tab-text">${esc(c.tab)}</span></button>`).join('')}
      <button type="button" class="fix-tab is-self ${at === SELF ? 'is-current' : ''}" data-act="case" data-index="${SELF}" ${allDone() ? '' : 'disabled'}>
        <span class="fix-n">${icon(allDone() ? 'list' : 'lock', { size: 16 })}</span><span class="fix-tab-text">Auto-évaluation</span></button></div>`;
  }

  function caseBody(i) {
    const c = cases[i];
    return `${kit.clientCard(c.client, null, 'Le client vous dit', i)}
      <div class="fix-grid">
        <section class="fix-bad">
          <p class="fix-bad-title">${icon('close', { size: 18 })}<span>Le réflexe à éviter</span></p>
          <p class="fix-reflex">« ${esc(c.reflex)} »</p>
          <p class="fix-label">Pourquoi ça bloque ?</p>
          ${ex.field(`why${i}`, 'Pourquoi ça bloque ?', { placeholder: 'Ce que cette réponse provoque…', max: 300, rows: 3, hideLabel: true })}
        </section>
        <span class="fix-arrow" aria-hidden="true">${icon('arrowRight', { size: 34 })}</span>
        <section class="fix-good">
          <p class="fix-good-title">${icon('pencil', { size: 18 })}<span>Votre réponse adaptée</span></p>
          ${ex.field(`reply${i}`, 'Votre réponse adaptée', { placeholder: 'Ce que vous diriez au client…', max: 500, rows: 5, hideLabel: true })}
          <p class="fix-help">${icon('lightbulb', { size: 18 })}<span>${esc(content.help)}</span></p>
        </section>
      </div>`;
  }

  /* L'auto-évaluation, une fois les 3 cas faits : on relit ses réponses,
   * puis on note chacun des trois critères. */
  function selfBody() {
    return `<p class="k-label">Auto-évaluation</p>
      <h2 class="fix-self-title">Relisez vos 3 réponses</h2>
      <ol class="fix-reread">${cases.map((c, i) => `<li><strong>${esc(c.tab)}</strong><span>« ${esc(ex.value(`reply${i}`))} »</span></li>`).join('')}</ol>
      <p class="fix-self-question">Vos réponses contiennent-elles ces trois éléments ?</p>
      ${kit.matrix({ key: 'self', rows: content.selfChecks, columns: scale, head: 'Critère', round: true })}`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = current();
    const after = cases.findIndex((_, k) => k > at && !complete(k));
    const next = after !== -1 ? after : cases.findIndex((_, k) => k !== at && !complete(k));
    return `<div class="k-page fix-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count fix-count"><strong>${doneCount()} / ${cases.length}</strong> répliques réparées</p>${reviewing ? '' : kit.tourButton()}` })}
      ${reviewing ? reviewScreen() : `${tabs(at)}
        <form class="k-panel fix-panel" novalidate>
          ${at === SELF ? selfBody() : caseBody(at)}
          ${core.errorsBox()}
          <div class="fix-bar">
            ${at === SELF ? kit.act('case', `${icon('arrowLeft', { size: 18 })}<span>Revenir au cas ${SELF}</span>`, 'secondary', `data-index="${SELF - 1}"`) : '<span></span>'}
            <div class="fix-right">${at === SELF ? kit.submit('Valider mon auto-évaluation') : `${kit.dialogButton(`tip${at}`, 'Voir un repère', 'secondary', 'search')}${kit.submit(next === -1 ? 'Enregistrer et s’auto-évaluer' : `Enregistrer et passer au cas ${next + 1}`)}`}</div>
          </div>
        </form>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible après l’auto-évaluation')}
    </div>`;
  }

  function reviewScreen() {
    const score = content.selfChecks.reduce((sum, _, i) => sum + (Number(ex.value(`self${i}`)) || 0), 0);
    return `${kit.result(score, content.selfChecks.length * 2, 'votre auto-évaluation')}
    ${cases.map((c, i) => `<section class="k-panel fix-review">
      <p class="k-label">Cas ${i + 1} · ${esc(c.tab)}</p>
      <p class="fix-client"><span class="fix-c">C</span><span>« ${esc(c.client)} »</span></p>
      <p class="fix-reflex is-review">${icon('close', { size: 16 })}<span>« ${esc(c.reflex)} »</span></p>
      <div class="k-columns is-even">
        <div>${kit.yours('Pourquoi ça bloque, selon vous', ex.value(`why${i}`))}${kit.model('Ce que ce réflexe provoque', c.blocks)}</div>
        <div>${kit.yours('Votre réponse adaptée', ex.value(`reply${i}`))}${kit.model('Une réponse possible', c.model)}</div>
      </div>
    </section>`).join('')}
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function caseErrors(values, i) {
    const errors = [];
    if (!kit.filled(values[`why${i}`])) errors.push({ key: `why${i}`, message: `Cas ${i + 1} : expliquez pourquoi ce réflexe bloque.` });
    if (!kit.filled(values[`reply${i}`])) errors.push({ key: `reply${i}`, message: `Cas ${i + 1} : rédigez votre réponse adaptée.` });
    return errors;
  }

  function validate(values) {
    const at = current();
    if (at < SELF) {
      const own = caseErrors(values, at);
      if (own.length) return own;
    }
    const missing = cases.findIndex((_, i) => caseErrors(values, i).length);
    if (missing !== -1) return [{ key: 'case', message: `Complétez aussi le cas ${missing + 1}.` }];
    if (at < SELF) return [];
    const unrated = content.selfChecks.findIndex((_, i) => !values[`self${i}`]);
    return unrated === -1 ? [] : [{ key: `self${unrated}`, message: `Évaluez chacune des ${content.selfChecks.length} lignes.` }];
  }

  function intercept(values) {
    const at = current();
    if (at === SELF || caseErrors(values, at).length) return false;
    for (let step = 1; step < cases.length; step++) {
      const next = (at + step) % cases.length;
      if (caseErrors(values, next).length) { ex.setValue('case', next); return true; }
    }
    ex.setValue('case', SELF);
    return true;
  }

  const feedback = () => ['Vos réponses accueillent-elles la réplique, posent-elles une question et proposent-elles une suite ? Comparez au corrigé.'];

  kit.on({ case: el => { ex.setValue('case', Number(el.dataset.index)); kit.commit(); } });
  kit.dialogs(Object.fromEntries(cases.map((c, i) => [`tip${i}`, { title: `Repère · ${c.tab}`, html: `<p>${esc(c.tip)}</p>` }])));

  kit.tour('s3-2.2', [
    { target: '.fix-tabs', title: 'Trois répliques', text: 'Trois clients, trois répliques à traiter.',
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une réplique pour passer de l’une à l’autre.' },
        { symbol: 'check', tone: 'green', text: 'Une réplique terminée est cochée.' }
      ] },
    { target: '.fix-panel .client-card', title: 'La réplique du client', text: 'Voici ce que le client vous dit au téléphone.' },
    { target: '.fix-bad', title: 'Le réflexe à éviter', text: 'Le commercial a répondu ainsi, et l’échange se bloque.',
      items: [
        { symbol: 'pencil', tone: 'coral', text: 'Expliquez ce que cette réponse provoque chez le client.' }
      ] },
    { target: '.fix-good', title: 'Votre réponse adaptée', text: 'Écrivez ce que vous diriez au client à la place, comme si vous lui parliez.',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: 'La ligne en dessous rappelle la marche à suivre.' }
      ] },
    { target: '.fix-tab.is-self', title: 'L’auto-évaluation', text: 'Après les 3 cas, vous relisez vos réponses et vous vérifiez qu’elles contiennent :',
      items: [
        { key: '1', tone: 'blue', text: 'un accueil de la réplique ;' },
        { key: '2', tone: 'coral', text: 'une question ;' },
        { key: '3', tone: 'green', text: 'une suite concrète.' }
      ] },
    { target: '.fix-right', title: 'Repère et enregistrement',
      items: [
        { symbol: 'search', tone: 'gold', text: '« Voir un repère » donne une piste pour ce cas.' },
        { symbol: 'arrowRight', tone: 'blue', text: '« Enregistrer » passe au cas suivant.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Le corrigé s’affiche après l’auto-évaluation.' }
      ] }
  ]);

  ex.mount('s3-2.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
