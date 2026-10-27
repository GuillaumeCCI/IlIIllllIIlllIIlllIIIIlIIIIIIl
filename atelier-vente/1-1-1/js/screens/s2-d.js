/* S2 D · Explorer les 6 attitudes de Porter.
 *
 * Sept étapes, une à la fois, comme le traitement complet (S3 1.6) : une
 * réponse par attitude, puis le choix final justifié. Les étapes sont en
 * pastilles en tête du panneau, cliquables ; la réplique du client reste à
 * gauche. Au corrigé : le score en tête, un bloc par étape (la réponse,
 * ce qu'on attend, le corrigé type replié).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S2.D;
  const attitudes = window.ATELIER_S2.attitudes;

  // Ce que fait chaque attitude, en une phrase : on sait quoi écrire sans connaître Porter.
  const DEFINITIONS = [
    'On approuve ou on désapprouve ce que dit le client.',
    'On explique à la place du client ce qu’il pense vraiment.',
    'On rassure le client, on minimise ce qu’il ressent.',
    'On pose une question pour en savoir plus.',
    'On propose tout de suite une solution ou un conseil.',
    'On redit avec ses mots ce que le client exprime, pour montrer qu’on a compris.'
  ];

  const replyKey = i => `reply${i}`;
  const FINAL = attitudes.length; // la septième étape : le choix final
  // Les pastilles gardent le premier mot : « Jugement », « Soutien »… sur une seule ligne.
  const labels = [...attitudes.map(name => name.split(' / ')[0]), 'Votre choix'];

  const filled = key => String(ex.value(key) ?? '').trim().length > 0;
  const stepDone = i => (i < FINAL ? filled(replyKey(i)) : attitudes.includes(ex.value('finalChoice')) && filled('justification'));
  const at = () => Math.min(Math.max(ex.cursor(), 0), FINAL);

  const track = i => `<ol class="step-rail-list is-track">${labels.map((label, n) => `
      <li>
        <button type="button" class="step-rail-item ${n === i ? 'is-active' : ''} ${stepDone(n) ? 'is-done' : ''}"
          data-action="goto-step" data-index="${n}" aria-current="${n === i}">
          <span class="step-rail-dot">${stepDone(n) && n !== i ? icon('check', { size: 15 }) : n + 1}</span>
          <span class="step-rail-label">${esc(label)}</span>
        </button>
      </li>`).join('')}</ol>`;

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = at();
    const body = i < FINAL
      ? `<h1>${esc(attitudes[i])}</h1>
        <p class="subtitle">${esc(DEFINITIONS[i])}</p>
        <h2 class="step-question">Que répondriez-vous au client, avec cette attitude ?</h2>
        ${ex.field(replyKey(i), 'Votre réponse', { placeholder: 'Votre réponse au client…', max: 300, rows: 6, hideLabel: true })}`
      : `<h1>Votre choix final</h1>
        <p class="subtitle">Quelle attitude vous semble la plus appropriée lors d’une prise de contact ?</p>
        ${ex.select('finalChoice', 'Attitude la plus appropriée', attitudes, 'Choisir une attitude')}
        <h2 class="step-question">Pourquoi celle-ci ?</h2>
        ${ex.field('justification', 'Justifiez votre choix', { placeholder: 'Justifiez votre choix…', max: 400, rows: 5, hideLabel: true })}`;

    return `<div class="step-layout porter-layout">
      <aside class="step-rail">${core.clientCard(content.mission)}</aside>
      <form class="panel step-sheet" novalidate>
        ${track(i)}
        <div class="step-sheet-top"><span class="step-pill">Étape ${i + 1} / ${FINAL + 1}</span>${window.AtelierKit ? `<span class="tour-pair">${window.AtelierKit.contextButton()}${window.AtelierKit.tourButton()}</span>` : ''}</div>
        ${body}
        ${core.errorsBox()}
        <div class="step-foot">
          ${ex.lockNote('Le corrigé sera disponible après votre tentative.')}
          <div class="step-foot-actions">
            ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
            <button type="submit" class="button primary">
              <span>${i < FINAL ? 'Continuer' : 'Valider mes réponses'}</span>${icon('arrowRight', { size: 18 })}
            </button>
          </div>
        </div>
      </form>
    </div>`;
  }

  /* Au corrigé : le score, puis un bloc par étape, deux rangées de trois
   * et le choix final en pleine largeur. */
  function reviewScreen() {
    const analyse = window.AtelierAnalyse;
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES['s2-D'];
    const result = analyse && grid ? analyse.score(grid, ex.values()) : null;
    const bloc = i => result && result.blocs[i];
    const tile = (i, title, text, model, extra = '') => `<li class="result-row ${i === FINAL ? 'is-final' : ''}">
        <div class="result-tile-head"><span class="result-number">${i + 1}</span><span class="result-role"><span>${esc(title)}</span></span></div>
        <div class="result-yours-block">
          <p class="ana-expect">Votre réponse</p>
          ${extra}
          <p class="result-answer-text">« ${bloc(i) ? analyse.answer(bloc(i)) : esc(text)} »</p>
        </div>
        ${bloc(i) ? analyse.lines(bloc(i), { withText: false }) : ''}
        <details class="result-model">
          <summary>Voir un corrigé type</summary>
          <div class="result-model-body"><p>${esc(model)}</p></div>
        </details>
      </li>`;
    const chosen = ex.value('finalChoice');
    return `<div class="sorter recap">
      <header class="sorter-head">
        <h1>Les 6 attitudes de Porter</h1>
        <p class="subtitle">Le client vous dit : « ${esc(content.mission.replace(/[«»]/g, '').trim())} »</p>
      </header>
      ${result ? `<section class="ana-score is-head" aria-label="Indicateur de points">${analyse.head(result)}</section>` : ''}
      <ol class="result-list result-tiles">
        ${attitudes.map((attitude, i) => tile(i, attitude, ex.value(replyKey(i)), `« ${content.examples[i]} »`)).join('')}
        ${tile(FINAL, 'Votre choix final', ex.value('justification'), content.feedback,
          `<p class="porter-choice">${icon(chosen === content.recommended ? 'check' : 'target', { size: 16 })}<span>${esc(chosen || '')}</span></p>`)}
      </ol>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate(values) {
    const missing = i => (i < FINAL
      ? (String(values[replyKey(i)] ?? '').trim() ? null : { key: replyKey(i), message: `${attitudes[i]} : rédigez une réponse.` })
      : null);
    const finalErrors = () => [
      attitudes.includes(values.finalChoice) ? null : { key: 'finalChoice', message: 'Choisissez l’attitude la plus appropriée.' },
      String(values.justification ?? '').trim() ? null : { key: 'justification', message: 'Justifiez votre choix final.' }
    ].filter(Boolean);
    const i = at();
    if (i < FINAL) return [missing(i)].filter(Boolean);
    // À la dernière étape, tout doit être rempli : on signale d'abord ce qui manque avant.
    return [...attitudes.map((_, n) => missing(n)).filter(Boolean), ...finalErrors()];
  }

  // Avancer d'une étape tant qu'il en reste ; la dernière valide l'exercice.
  function intercept() {
    const i = at();
    if (i >= FINAL || !stepDone(i)) return false;
    ex.setCursor(i + 1);
    return true;
  }

  // Le corrigé est dans l'écran : le pavé du bas ne garde que la suite.
  const feedback = () => [content.criterion];

  function onMount() {
    core.$$('[data-action="goto-step"]').forEach(button => {
      button.addEventListener('click', () => {
        ex.setCursor(Number(button.dataset.index));
        core.persist();
        ex.render();
      });
    });
  }

  /* À l'arrivée : la fenêtre de contexte (Porter en deux phrases), puis la
   * visite guidée de l'écran. Les deux se rouvrent depuis l'en-tête. */
  const kit = window.AtelierKit;
  if (kit) {
    kit.context([
      ['target', 'Pourquoi vous êtes là', 'Pour découvrir qu’il existe six façons de répondre à un client, et choisir la plus juste au premier contact.'],
      ['chat', 'Ce qui se passe', `Un client vous dit : « ${content.mission.replace(/[«»]/g, '').trim()} » Vous allez lui répondre six fois, avec six attitudes différentes.`],
      ['pencil', 'Ce qui vous est demandé', 'Écrire une réponse par attitude, une étape à la fois, puis choisir celle qui convient le mieux et dire pourquoi.']
    ], 'Les 6 attitudes de Porter');
    kit.tour('s2-D', [
      { target: '.step-rail .client-card', title: 'Le client', text: 'Voici ce qu’il vous dit. Toutes vos réponses s’adressent à lui.' },
      { target: '.step-rail-list.is-track', title: 'Sept étapes', text: 'Six attitudes, puis votre choix final.',
        items: [{ symbol: 'pointer', tone: 'blue', text: 'Cliquez sur une étape pour y revenir.' }] },
      { target: '.step-sheet h1, .step-sheet .subtitle', title: 'L’attitude en cours', text: 'Son nom, et ce qu’elle consiste à faire.' },
      { target: '.step-sheet .field, .step-sheet textarea', title: 'Votre réponse', text: 'Écrivez ce que vous diriez au client avec cette attitude.' },
      { target: '.step-foot-actions', title: 'Continuer', text: '« Continuer » enregistre votre réponse et passe à l’attitude suivante.' }
    ]);
  }

  ex.mount('s2-D', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
