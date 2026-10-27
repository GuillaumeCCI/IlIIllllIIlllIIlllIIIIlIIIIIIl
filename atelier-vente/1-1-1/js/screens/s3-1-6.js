/* S3 1.6 · Construisez votre traitement complet.
 *
 * Six contextes au choix (menu des cas), un par secteur : chacun a son
 * vendeur, son client, sa situation, son objection, ses atouts et son
 * corrigé type (content-s3.js). Dans un contexte, six étapes, une phrase
 * par étape : le fil des étapes est posé en rail à gauche, sous la fiche
 * du contexte et l'objection ; l'écriture occupe la colonne de droite. Les
 * six phrases écrites, un récapitulatif permet de relire avant de valider.
 *
 * L'exercice est terminé dès le premier contexte traité ; les autres sont
 * de nouvelles tentatives. Un contexte traité se corrige (« Modifier mes
 * phrases ») ou se recommence (« Nouvelle tentative »).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.6'];
  const method = window.ATELIER_S3.method;
  const contexts = content.cases;

  /* Les clés d'un contexte. Le premier garde celles d'avant les contextes
   * (line0…line5), pour ne pas perdre les réponses déjà écrites. */
  const lineKey = (c, i) => (c === 0 ? `line${i}` : `c${c}_line${i}`);
  const stepKey = c => `c${c}_step`;
  const recapKey = c => `c${c}_recap`;
  const doneKey = c => `done${c}`;

  const current = () => ex.openCase() ?? 0;
  const caseDone = c => ex.value(doneKey(c)) === true;
  const stepDone = (c, i) => String(ex.value(lineKey(c, i)) ?? '').trim().length > 0;
  const writtenCount = c => method.filter((_, i) => stepDone(c, i)).length;
  const allWritten = c => writtenCount(c) === method.length;
  const stepOf = c => Math.min(Math.max(Number(ex.value(stepKey(c))) || 0, 0), method.length - 1);
  const setStep = (c, i) => { ex.setValue(stepKey(c), i); ex.setCursor(i); };

  /* Le récapitulatif s'ouvre quand tout est écrit, et se referme dès
   * qu'on repart modifier une étape. */
  const showingRecap = c => allWritten(c) && ex.value(recapKey(c)) !== false;

  const cases = () => contexts.map((cas, c) => ({ label: cas.label, hint: cas.objection, done: caseDone(c) }));

  /* Le premier contexte traité termine l'exercice, pour de bon : une
   * nouvelle tentative ne retire pas la marque (`achieved`). */
  const allDone = () => ex.value('achieved') === true || contexts.some((_, c) => caseDone(c));

  /* ── La fiche du contexte, en tête du rail ─────────────────────────── */
  const brief = cas => `<div class="case-brief">
      <p class="case-brief-tag">${esc(cas.label)}</p>
      <p><strong>Vous</strong>${esc(cas.vous)}</p>
      <p><strong>Le client</strong>${esc(cas.client)}</p>
      <p><strong>La situation</strong>${esc(cas.situation)}</p>
    </div>`;

  const atouts = cas => `<div class="case-atouts">
      <p class="ana-expect">Vos atouts pour ce client</p>
      <ul>${cas.atouts.map(item => `<li>${icon('check', { size: 14 })}<span>${esc(item)}</span></li>`).join('')}</ul>
    </div>`;

  function screen() {
    const c = current();
    if (caseDone(c)) return reviewScreen(c);
    if (showingRecap(c)) return recapScreen(c);

    const cas = contexts[c];
    const i = stepOf(c);
    const item = method[i];

    /* Le rail : le retour aux contextes, la fiche du contexte, l'objection,
     * puis les six étapes empilées, chacune cliquable pour y revenir. */
    const rail = `<aside class="step-rail">
      ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Tous les contextes</span>`, 'back-to-menu', 'text-button with-icon')}
      ${brief(cas)}
      ${core.clientCard(cas.objection, null, 'Objection client')}
      <ol class="step-rail-list">${method.map((entry, n) => `
        <li>
          <button type="button" class="step-rail-item ${n === i ? 'is-active' : ''} ${stepDone(c, n) ? 'is-done' : ''}"
            data-action="goto-step" data-index="${n}" aria-current="${n === i}">
            <span class="step-rail-dot">${stepDone(c, n) && n !== i ? icon('check', { size: 15 }) : String(n + 1).padStart(2, '0')}</span>
            <span class="step-rail-label">${esc(entry.step)}</span>
          </button>
        </li>`).join('')}</ol>
    </aside>`;

    return `<div class="step-layout">
      ${rail}
      <form class="panel step-sheet" novalidate>
        <div class="step-sheet-top"><span class="step-pill">Étape ${i + 1} / ${method.length}</span>${kit ? `<span class="tour-pair">${kit.contextButton()}${kit.tourButton()}</span>` : ''}</div>
        <h1>${esc(item.step)} l’objection</h1>
        <p class="subtitle">${esc(item.role)}</p>

        <h2 class="step-question">Que diriez-vous au client ?</h2>
        ${ex.field(lineKey(c, i), 'Votre phrase', {
          placeholder: item.placeholder, max: 300, rows: 7, hideLabel: true
        })}
        <p class="advice">${icon('lightbulb', { size: 19 })}<span>${esc(item.advice)}</span></p>
        ${i === 3 ? atouts(cas) : ''}

        ${core.errorsBox()}
        <div class="step-foot">
          ${ex.lockNote('Le corrigé sera disponible après votre tentative.')}
          <div class="step-foot-actions">
            ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
            <button type="submit" class="button primary">
              <span>${i < method.length - 1 ? 'Continuer' : 'Relire mes six phrases'}</span>${icon('arrowRight', { size: 18 })}
            </button>
          </div>
        </div>
      </form>
    </div>`;
  }

  /* Les six phrases d'un seul tenant, avant validation. */
  function recapScreen(c) {
    const cas = contexts[c];
    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Relisez votre réponse complète</h1>
        <p class="subtitle">${esc(cas.label)} · « ${esc(cas.objection)} » Lisez vos six phrases d’un seul tenant avant de valider.</p>
        <p class="result-score">${writtenCount(c)} / ${method.length} phrases saisies</p>
      </header>

      <form novalidate>
        <ol class="recap-list">${method.map((item, i) => `
          <li class="recap-row">
            <span class="recap-number">${String(i + 1).padStart(2, '0')}</span>
            <span class="recap-text"><strong class="recap-step">${esc(item.step)}</strong> « ${esc(ex.value(lineKey(c, i)))} »</span>
            <button type="button" class="text-button with-icon recap-edit" data-action="goto-step" data-index="${i}">
              ${icon('pencil', { size: 15 })}<span>Modifier</span>
            </button>
          </li>`).join('')}</ol>

        ${core.errorsBox()}
        <div class="recap-foot">
          ${ex.lockNote('Le corrigé sera disponible après validation.')}
          <button type="submit" class="button primary">
            <span>Valider ma réponse</span>${icon('arrowRight', { size: 18 })}
          </button>
        </div>
      </form>
    </div>`;
  }

  /* Après validation : le contexte et son objection, le score, puis six
   * blocs en deux rangées de trois. Chaque bloc : la phrase de l'apprenant
   * (mots repérés surlignés), ce qu'on attend, puis le corrigé type replié. */
  function reviewScreen(c) {
    const cas = contexts[c];
    const analyse = window.AtelierAnalyse;
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES['s3-1.6'];
    const result = analyse && grid ? analyse.score(grid.parCas(cas, i => lineKey(c, i)), ex.values()) : null;
    const bloc = i => result && result.blocs[i];
    return `<div class="sorter recap">
      <header class="sorter-head">
        ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Tous les contextes</span>`, 'back-to-menu', 'text-button with-icon result-back')}
        <h1>Votre traitement, d’un seul tenant</h1>
        <p class="subtitle"><strong>${esc(cas.label)}</strong> · « ${esc(cas.objection)} »</p>
      </header>
      <div class="result-top">
        ${result ? `<section class="ana-score is-head" aria-label="Indicateur de points">${analyse.head(result)}</section>` : ''}
        <div class="result-again">
          <button type="button" class="text-button with-icon" data-action="revise">${icon('pencil', { size: 17 })}<span>Modifier mes phrases</span></button>
          <button type="button" class="text-button with-icon" data-action="retry">${icon('refresh', { size: 17 })}<span>Nouvelle tentative</span></button>
        </div>
      </div>
      <ol class="result-list result-tiles">${method.map((item, i) => `
        <li class="result-row">
          <div class="result-tile-head"><span class="result-number">${String(i + 1).padStart(2, '0')}</span>
            <span class="result-role">${icon(item.symbol, { size: 15 })}<span>${esc(item.step)}</span></span></div>
          <p class="result-goal">${esc(item.role)}</p>
          <div class="result-yours-block">
            <p class="ana-expect">Votre phrase</p>
            <p class="result-answer-text">« ${bloc(i) ? analyse.answer(bloc(i)) : esc(ex.value(lineKey(c, i)))} »</p>
          </div>
          ${bloc(i) ? analyse.lines(bloc(i), { withText: false }) : ''}
          <details class="result-model">
            <summary>Voir un corrigé type</summary>
            <div class="result-model-body">
              <p>« ${esc(cas.model[i])} »</p>
            </div>
          </details>
        </li>`).join('')}</ol>
      <p class="result-reread">${esc(content.feedback)}</p>
      ${ex.caseActions(cases(), c)}
    </div>`;
  }

  function validate(values) {
    const c = current();
    /* En cours de rédaction, seule l'étape ouverte est exigée ; au
     * récapitulatif, les six doivent être remplies. */
    const missing = i => (String(values[lineKey(c, i)] ?? '').trim() ? null : { key: lineKey(c, i), message: `Étape ${i + 1} (${method[i].step}) : rédigez votre phrase.` });
    if (!showingRecap(c)) return [missing(stepOf(c))].filter(Boolean);
    return method.map((_, i) => missing(i)).filter(Boolean);
  }

  /* Avancer d'une étape tant qu'il en reste, puis laisser la validation
   * ouvrir le récapitulatif. */
  function intercept() {
    const c = current();
    if (showingRecap(c)) return false;
    const i = stepOf(c);
    if (!stepDone(c, i)) return false;
    if (i >= method.length - 1) {
      if (!allWritten(c)) {
        setStep(c, method.findIndex((_, n) => !stepDone(c, n)));
        return true;
      }
      ex.setValue(recapKey(c), true);
      return true;
    }
    setStep(c, i + 1);
    return true;
  }

  // Le contexte validé passe au corrigé ; le récapitulatif se referme.
  function afterSubmit() {
    const c = current();
    ex.setValue(doneKey(c), true);
    ex.setValue(recapKey(c), false);
    ex.setValue('achieved', true);
  }

  // Le corrigé est dans l'écran ; la suite passe par la barre du contexte.
  const feedback = () => '';

  /* « Modifier mes phrases » rouvre la relecture, réponses gardées ;
   * « Nouvelle tentative » efface le contexte et repart de la première
   * étape. Dans les deux cas, on valide à nouveau pour voir le corrigé. */
  function reopen(clear) {
    const c = current();
    ex.setValue(doneKey(c), false);
    if (clear) {
      method.forEach((_, i) => ex.setValue(lineKey(c, i), ''));
      ex.setValue(recapKey(c), false);
      setStep(c, 0);
    } else ex.setValue(recapKey(c), true);
    core.entry(ex.current.key).done = allDone();
    core.persist();
    ex.render(true);
  }

  document.addEventListener('click', event => {
    const control = event.target.closest && event.target.closest('[data-action="revise"], [data-action="retry"]');
    if (control) reopen(control.dataset.action === 'retry');
  });

  /* « Voir un corrigé type » : le pli s'ouvre et se referme en glissant.
   * Un seul écouteur sur la page : il vaut pour les blocs redessinés.
   * Avec « réduire les animations », le pli s'ouvre d'un coup. */
  document.addEventListener('click', event => {
    const summary = event.target.closest && event.target.closest('.result-model > summary');
    if (!summary) return;
    const fold = summary.parentElement;
    const body = fold.querySelector('.result-model-body');
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !body || !body.animate) return;
    event.preventDefault();
    if (fold.dataset.moving) return;
    fold.dataset.moving = '1';
    const opening = !fold.open;
    if (opening) fold.open = true;
    fold.classList.toggle('is-closing', !opening);
    const height = `${body.scrollHeight}px`;
    const frames = [{ height: '0px', opacity: 0 }, { height, opacity: 1 }];
    const motion = body.animate(opening ? frames : frames.reverse(), { duration: opening ? 320 : 240, easing: 'cubic-bezier(.3, .7, .3, 1)' });
    motion.onfinish = () => { if (!opening) fold.open = false; fold.classList.remove('is-closing'); delete fold.dataset.moving; };
  });

  /* À l'ouverture d'un contexte pas encore traité, sa fiche s'ouvre en
   * fenêtre, une fois par visite : on lit le contexte avant d'écrire. */
  const shown = new Set();
  function onMount() {
    const c = ex.openCase();
    if (kit && c !== null && !caseDone(c) && !shown.has(c) && !showingRecap(c)) {
      shown.add(c);
      setTimeout(() => { if (!document.querySelector('dialog[open], .tour')) kit.contextOpen(); }, 500);
    }
    core.$$('[data-action="goto-step"]').forEach(button => {
      button.addEventListener('click', () => {
        const k = current();
        setStep(k, Number(button.dataset.index));
        ex.setValue(recapKey(k), false);
        core.persist();
        ex.render();
      });
    });
  }

  /* La fenêtre de contexte : au menu, la méthode ; dans un contexte, sa
   * fiche complète, atouts compris. */
  if (kit) kit.context(() => {
    const c = ex.openCase();
    if (c === null) return [
      ['target', 'La méthode', 'Pour traiter une objection, le vendeur suit six étapes, toujours dans le même ordre.'],
      ['chat', 'Six contextes', 'Six clients, six secteurs, six objections. Choisissez celui que vous voulez traiter.'],
      ['pencil', 'Ce qui vous est demandé', 'Écrire, pour chaque étape, la phrase que vous diriez au client. Un contexte suffit pour terminer l’exercice ; les autres sont autant de nouvelles tentatives.']
    ];
    const cas = contexts[c];
    return [
      ['user', 'Vous', cas.vous],
      ['users', 'Le client', cas.client],
      ['chat', 'La situation', `${cas.situation} Il vous dit : « ${cas.objection} »`],
      ['check', 'Vos atouts', cas.atouts.join('\n')]
    ];
  }, () => (ex.openCase() === null ? 'La méthode en 6 étapes' : `Le contexte · ${contexts[ex.openCase()].label}`));

  // Visite guidée de l'écran, lancée d'elle-même au premier contexte ouvert.
  if (kit) kit.tour('s3-1.6', [
    { target: '.case-brief', title: 'Le contexte', text: 'Qui vous êtes, qui est le client, où en est l’échange.' },
    { target: '.step-rail .client-card', title: 'L’objection du client', text: 'Voici ce que le client vous oppose. Toute votre réponse doit la traiter.' },
    { target: '.step-rail-list', title: 'Les six étapes', text: 'Vous traitez l’objection en six étapes, une phrase par étape.',
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une étape pour revenir dessus et modifier votre phrase.' }
      ] },
    { target: '.step-sheet h1, .step-sheet .subtitle', title: 'L’étape en cours', text: 'Le titre rappelle l’étape, et la phrase en dessous dit à quoi elle sert.' },
    { target: '.step-sheet .field, .step-sheet textarea', title: 'Votre phrase', text: 'Écrivez ici ce que vous diriez au client. Le début proposé vous aide à démarrer.' },
    { target: '.step-foot-actions', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: '« Continuer » enregistre votre phrase et ouvre l’étape suivante.' },
        { symbol: 'document', tone: 'blue', text: 'Après la sixième phrase, vous relisez votre réponse complète avant de valider.' }
      ] }
  ]);

  ex.mount('s3-1.6', {
    screen, validate, feedback, intercept, afterSubmit, allDone, cases, onMount,
    menuIntro: 'Choisissez un contexte. Un seul suffit pour terminer l’exercice ; chacun des autres est une nouvelle tentative.'
  });
})();
