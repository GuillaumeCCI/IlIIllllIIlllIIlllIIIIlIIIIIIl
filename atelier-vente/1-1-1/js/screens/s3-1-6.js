/* S3 1.6 · Construisez votre traitement complet.
 *
 * Six étapes, une phrase par étape. Le fil des étapes est posé en rail
 * vertical à gauche, avec l'objection en tête ; l'écriture occupe la
 * colonne de droite. Une fois les six phrases écrites, un récapitulatif
 * permet de relire l'ensemble avant de valider.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.6'];
  const method = window.ATELIER_S3.method;

  const lineKey = i => `line${i}`;
  const stepDone = i => String(ex.value(lineKey(i)) ?? '').trim().length > 0;
  const writtenCount = () => method.filter((_, i) => stepDone(i)).length;
  const allWritten = () => writtenCount() === method.length;

  /* Le récapitulatif s'ouvre quand tout est écrit, et se referme dès
   * qu'on repart modifier une étape. */
  const showingRecap = () => allWritten() && ex.value('recap') !== false;

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    if (showingRecap()) return recapScreen();

    const i = Math.min(ex.cursor(), method.length - 1);
    const item = method[i];

    /* Le rail : l'objection, puis les six étapes empilées. Chacune est
     * cliquable pour revenir dessus. */
    const rail = `<aside class="step-rail">
      ${core.clientCard(content.objection, null, 'Objection client')}
      <ol class="step-rail-list">${method.map((entry, n) => `
        <li>
          <button type="button" class="step-rail-item ${n === i ? 'is-active' : ''} ${stepDone(n) ? 'is-done' : ''}"
            data-action="goto-step" data-index="${n}" aria-current="${n === i}">
            <span class="step-rail-dot">${stepDone(n) && n !== i ? icon('check', { size: 15 }) : String(n + 1).padStart(2, '0')}</span>
            <span class="step-rail-label">${esc(entry.step)}</span>
          </button>
        </li>`).join('')}</ol>
    </aside>`;

    return `<div class="step-layout">
      ${rail}
      <form class="panel step-sheet" novalidate>
        <div class="step-sheet-top"><span class="step-pill">Étape ${i + 1} / ${method.length}</span>${window.AtelierKit ? `<span class="tour-pair">${window.AtelierKit.contextButton()}${window.AtelierKit.tourButton()}</span>` : ''}</div>
        <h1>${esc(item.step)} l’objection</h1>
        <p class="subtitle">${esc(item.role)}</p>

        <h2 class="step-question">Que diriez-vous au client ?</h2>
        ${ex.field(lineKey(i), 'Votre phrase', {
          placeholder: item.placeholder, max: 200, rows: 7, hideLabel: true
        })}
        <p class="advice">${icon('lightbulb', { size: 19 })}<span>${esc(item.advice)}</span></p>

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
  function recapScreen() {
    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Relisez votre réponse complète</h1>
        <p class="subtitle">Lisez vos six phrases d’un seul tenant avant de valider.</p>
        <p class="result-score">${writtenCount()} / ${method.length} phrases saisies</p>
      </header>

      <form novalidate>
        <ol class="recap-list">${method.map((item, i) => `
          <li class="recap-row">
            <span class="recap-number">${String(i + 1).padStart(2, '0')}</span>
            <span class="recap-text"><strong class="recap-step">${esc(item.step)}</strong> « ${esc(ex.value(lineKey(i)))} »</span>
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

  /* Après validation : chaque phrase est relue en regard de son étape. */
  function reviewScreen() {
    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Votre traitement, d’un seul tenant</h1>
        <p class="subtitle">${esc(content.feedback)}</p>
      </header>
      <ol class="result-list">${method.map((item, i) => `
        <li class="result-row">
          <span class="result-number">${String(i + 1).padStart(2, '0')}</span>
          <span class="result-body">
            <span class="result-role">${icon(item.symbol, { size: 15 })}<span>${esc(item.step)}</span></span>
            <strong>« ${esc(ex.value(lineKey(i)))} »</strong>
            <span class="result-why">${esc(item.role)}</span>
            ${content.model && content.model[i] ? `<span class="result-why">Corrigé modèle : « ${esc(content.model[i])} »</span>` : ''}
          </span>
        </li>`).join('')}</ol>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate(values) {
    /* En cours de rédaction, seule l'étape ouverte est exigée ; au
     * récapitulatif, les six doivent être remplies. */
    if (!showingRecap()) {
      const i = Math.min(ex.cursor(), method.length - 1);
      return String(values[lineKey(i)] ?? '').trim()
        ? [] : [{ key: lineKey(i), message: `Étape ${i + 1} (${method[i].step}) : rédigez votre phrase.` }];
    }
    return method
      .map((item, i) => String(values[lineKey(i)] ?? '').trim() ? null : { key: lineKey(i), message: `Étape ${i + 1} (${item.step}) : rédigez votre phrase.` })
      .filter(Boolean);
  }

  const feedback = () => [content.feedback];

  /* Avancer d'une étape tant qu'il en reste, puis laisser la validation
   * ouvrir le récapitulatif. */
  function intercept() {
    if (showingRecap()) return false;
    const i = Math.min(ex.cursor(), method.length - 1);
    if (!stepDone(i)) return false;
    if (i >= method.length - 1) {
      if (!allWritten()) {
        const missing = method.findIndex((_, n) => !stepDone(n));
        ex.setCursor(missing);
        return true;
      }
      ex.setValue('recap', true);
      return true;
    }
    ex.setCursor(i + 1);
    return true;
  }

  function onMount() {
    core.$$('[data-action="goto-step"]').forEach(button => {
      button.addEventListener('click', () => {
        ex.setCursor(Number(button.dataset.index));
        ex.setValue('recap', false);
        core.persist();
        ex.render();
      });
    });
  }

  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  if (window.AtelierKit) window.AtelierKit.context([
    ['target', 'La méthode', 'Pour traiter une objection, le vendeur suit six étapes, toujours dans le même ordre.'],
    ['chat', 'L’objection', 'Un client vous oppose une objection : c’est à elle que vous répondez.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire, pour chaque étape, la phrase que vous diriez au client.']
  ], 'La méthode en 6 étapes');

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s3-1.6', [
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

  ex.mount('s3-1.6', { screen, validate, feedback, intercept, onMount, compactFeedback: true });
})();
