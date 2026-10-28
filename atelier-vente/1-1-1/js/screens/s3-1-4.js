/* S3 1.4 · Derrière le prétexte.
 * Lire l’échange, formuler l’hypothèse du vrai frein, puis la question qui l’ouvre.
 * Un contexte s'ouvre à l'arrivée (kit.context).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S3['1.4'];
  const { esc } = core;
  // « Le contexte » et « Voir un indice », côte à côte en haut à droite de l'analyse (kit.js chargé par la page).
  const kit = window.AtelierKit;

  /* L'échange, commun à la saisie et au corrigé. */
  const exchange = () => `<h2>L’échange</h2>
        <div class="conversation">
          ${content.exchange.map(line => `<div class="bubble ${line.who === 'Client' ? 'client' : 'seller'}">
            <span class="who">${esc(line.who)}</span>${esc(line.text)}
          </div>`).join('')}
        </div>
        <div class="observation">${icon('lightbulb', { size: 19 })}<span>${esc(content.observation)}</span></div>`;

  // La barre et le pavé du bas, communs à la saisie et au corrigé.
  const rest = () => `${ex.lockNote('Corrigé disponible après votre tentative')}
        ${core.errorsBox()}
        ${ex.actions('Valider mes réponses')}
        ${core.feedbackBox()}`;

  /* Au corrigé, deux étages : l'échange face au score, puis « Votre
   * analyse » sur toute la largeur, une carte par réponse, côte à côte.
   * Chaque carte : la phrase (mots repérés surlignés), ce qu'on attend, et
   * le corrigé type replié. */
  function reviewScreen() {
    const analyse = window.AtelierAnalyse;
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES['s3-1.4'];
    const result = analyse && grid ? analyse.score(grid, ex.values()) : null;
    const card = (i, n, title, key, model, extra = '') => `<article class="review-card">
        ${core.step(n, title, `<p class="result-answer-text">«\u00a0${result ? analyse.answer(result.blocs[i]) : esc(ex.value(key))}\u00a0»</p>
          ${result ? analyse.lines(result.blocs[i], { withText: false }) : ''}
          <details class="result-model">
            <summary>Voir une réponse possible</summary>
            <div class="result-model-body"><p>${esc(model)}</p>${extra}</div>
          </details>`)}
      </article>`;
    return `<div class="review-layout">
      <div class="two-columns">
        <section class="panel scenario">${exchange()}</section>
        <section class="panel review-score">${core.panelTitle('Votre score estimatif')}${result ? `<section class="ana-score is-head" aria-label="Indicateur de points">${analyse.head(result)}</section>` : ''}</section>
      </div>
      <form class="panel answer-panel review-analysis" novalidate>
        ${core.panelTitle('Votre analyse')}
        <div class="review-cards">
          ${card(0, 1, 'Vraie objection probable', 'hypothesis', content.hypothesisModel)}
          ${card(1, 2, 'Question pour la révéler', 'question', content.questionModel, `<p class="result-avoid">${esc(content.avoid)}</p>`)}
        </div>
        ${rest()}
      </form>
    </div>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    return `<div class="two-columns">
      <section class="panel scenario">${exchange()}</section>
      <form class="panel answer-panel" novalidate>
        <div class="hint-row analyse-head">${core.panelTitle('Votre analyse')}<span class="analyse-tools">${kit ? kit.contextButton() : ''}${core.hintBlock(content.hint)}</span></div>
        ${core.step(1, 'Vraie objection probable', ex.field('hypothesis', 'Vraie objection probable', {
          placeholder: 'Le client hésite peut-être parce que…', max: 240, rows: 4, hideLabel: true
        }), 'Formulez une hypothèse simple et précise.')}
        ${core.step(2, 'Question pour la révéler', ex.field('question', 'Question pour la révéler', {
          placeholder: 'Votre question au client…', max: 240, rows: 4, hideLabel: true
        }), 'Posez une question ouverte, sans suggérer la réponse.')}
        ${rest()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    if (!String(values.hypothesis ?? '').trim()) errors.push({ key: 'hypothesis', message: 'Formulez votre hypothèse sur le vrai frein.' });
    const question = String(values.question ?? '').trim();
    if (!question) errors.push({ key: 'question', message: 'Proposez une question pour révéler le frein.' });
    // Le contrôle reste formel : il signale une tournure sans question.
    else if (!/[?？]/u.test(question)) errors.push({ key: 'question', message: 'Votre question doit se terminer par un point d’interrogation.' });
    return errors;
  }

  /* Les deux repères sont posés sous les deux champs. */
  // Le corrigé est dans les deux réponses : le pavé du bas ne garde que la suite.
  const feedback = () => ['Relisez votre hypothèse et votre question avec une réponse possible.'];

  // À l'arrivée : pourquoi on est là, ce qui se passe, ce qui est demandé.
  if (kit) kit.context([
    ['target', 'Pourquoi vous êtes là', 'Pour apprendre à repérer ce que cache un « je vais réfléchir », au lieu d’accepter un report vague.'],
    ['chat', 'Ce qui se passe', 'Un commercial vient de présenter son offre à un client. Le client répond qu’il va réfléchir. Le commercial propose de le rappeler dans un mois, et l’échange s’arrête là.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire ce qui freine probablement le client, puis la question que vous lui auriez posée pour le faire parler.']
  ]);

  ex.mount('s3-1.4', { screen, validate, feedback, compactFeedback: true });
})();
