/* S2 B · Reformuler sans dévier.
 * Quatre réponses du vendeur : identifier l'attitude, puis réécrire.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S2.B;
  const attitudes = window.ATELIER_S2.attitudes;
  const cases = content.cases;
  const { esc } = core;

  const attitudeKey = i => `attitude${i}`;
  const rewriteKey = i => `rewrite${i}`;

  /* Un pictogramme par attitude, pour les tuiles de choix. */
  const SYMBOLS = {
    'Jugement / évaluation': 'scales',
    'Interprétation': 'thought',
    'Soutien / consolation': 'hands',
    'Investigation / enquête': 'search',
    'Solution / décision': 'lightbulb',
    'Compréhension / reformulation': 'ear'
  };

  /* Une réplique à la fois : la réponse du vendeur, puis côte à côte
   * l'attitude à identifier et la reformulation à écrire. */
  function replica() {
    const at = Math.min(ex.wizardAt(), cases.length - 1);
    const item = cases[at];
    const last = at === cases.length - 1;
    const left = cases.length - at - 1;
    const back = at ? core.button(`${icon('arrowLeft', { size: 17 })}<span>Réplique précédente</span>`, 'wizard-prev', 'text-button with-icon') : '';
    return `<form class="replica-screen" novalidate>
      <div class="replica-title">${core.pageTitle(content.eyebrow, content.title)}${window.AtelierKit ? window.AtelierKit.tourButton() : ''}</div>
      ${core.mission('Consigne', content.intro, '', 'book')}
      ${core.clientCard(content.mission)}
      <div class="replica-progress">
        <div class="replica-bar" aria-hidden="true"><span style="width:${((at + 1) / cases.length) * 100}%"></span></div>
        ${core.stepPill(at, cases.length, 'Réplique')}
      </div>
      <div class="replica-seller">
        <span class="replica-avatar" aria-hidden="true">${icon('user', { size: 30 })}</span>
        <div><p class="replica-label">Réplique du vendeur n°${at + 1}</p><p class="replica-text">« ${esc(item.text)} »</p></div>
      </div>
      <div class="replica-cards">
        <section class="panel replica-card">
          <h2><span class="replica-num">1</span>Attitude identifiée</h2>
          ${ex.radioCards(attitudeKey(at), attitudes.map(label => ({ id: label, label, symbol: SYMBOLS[label] })), 'attitude-tiles')}
        </section>
        <section class="panel replica-card">
          <h2><span class="replica-num">2</span>Votre reformulation</h2>
          ${ex.field(rewriteKey(at), `Votre reformulation de la réplique ${at + 1}`, { placeholder: 'Reformulez sans rien ajouter à ce que dit le client…', max: 300, rows: 7, hideLabel: true })}
        </section>
      </div>
      ${last
        ? `${core.errorsBox()}<div class="wiz-back">${back}</div>${ex.actions('Valider mes réponses')}`
        : `<div class="wiz-actions">${back}<span class="replica-left">${left} réponse${left > 1 ? 's' : ''} reste${left > 1 ? 'nt' : ''}</span>${core.button(`<span>Réponse suivante</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${attitudeKey(at)},${rewriteKey(at)}"`)}</div>`}
      ${core.feedbackBox()}
    </form>`;
  }

  function screen() {
    const review = ex.reviewing();
    if (!review) return replica();
    return `<div class="writing-workshop">
      ${core.pageTitle(content.eyebrow, content.title)}
      ${core.mission('Votre mission', content.intro, '', 'target')}
      ${core.clientCard(content.mission)}
      <form class="panel" novalidate>
        <div class="answer-table">
          <div class="answer-table-head">
            <span>Réponse du vendeur</span><span>Attitude identifiée</span><span>Votre reformulation</span>
          </div>
          ${cases.map((item, i) => {
            const chosen = ex.value(attitudeKey(i));
            const right = chosen === item.answer;
            return `<div class="answer-row ${review ? (right ? 'row-ok' : 'row-ko') : ''}">
              <div class="row-source">
                <span class="row-badge" aria-hidden="true">${i + 1}</span>
                <p>« ${esc(item.text)} »</p>
              </div>
              ${review
                ? `<div class="row-verdict">
                     ${ex.verdictMark(right, right ? chosen : `Attendu : ${item.answer}`)}
                     ${right ? '' : `<span class="row-chosen">Votre réponse : ${esc(chosen)}</span>`}
                     ${ex.inlineNote(item.why, right ? 'good' : 'bad')}
                   </div>
                   <div class="row-model">
                     <p class="own-line">« ${esc(ex.value(rewriteKey(i)))} »</p>
                     ${ex.inlineNote(`Réécriture modèle : « ${item.rewrite} »`, 'neutral')}
                   </div>`
                : `${ex.select(attitudeKey(i), `Attitude de la réponse ${i + 1}`, attitudes, 'Choisir une attitude')}
                   ${ex.field(rewriteKey(i), `Votre reformulation de la réponse ${i + 1}`, {
                     placeholder: 'Réécrivez la réponse…', max: 300, rows: 2, hideLabel: true
                   })}`}
            </div>`;
          }).join('')}
        </div>
        ${ex.lockNote('Corrigé disponible après validation')}
        ${core.errorsBox()}
        ${ex.actions('Valider mes réponses')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    cases.forEach((item, i) => {
      if (!attitudes.includes(values[attitudeKey(i)])) errors.push({ key: attitudeKey(i), message: `Réponse ${i + 1} : choisissez une attitude.` });
      if (!String(values[rewriteKey(i)] ?? '').trim()) errors.push({ key: rewriteKey(i), message: `Réponse ${i + 1} : proposez une reformulation.` });
    });
    return errors;
  }

  /* Le détail figure déjà en face de chaque réponse : la synthèse ne garde
   * que le principe et le score. */
  function feedback(values) {
    const right = cases.filter((item, i) => values[attitudeKey(i)] === item.answer).length;
    return [
      content.feedback,
      `${right} attitude sur ${cases.length} correctement identifiée${right > 1 ? 's' : ''}. Les réécritures modèles sont affichées en face de vos propositions.`,
      content.criterion
    ];
  }

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s2-B', [
    { target: '.replica-screen .client-card', title: 'La phrase du client', text: 'Le client vous dit : « Votre solution me paraît un peu chère. » C’est à cette phrase que le vendeur répond.' },
    { target: '.replica-seller', title: 'La réplique du vendeur', text: 'Elle ressemble à une reformulation, mais elle dévie vers une autre attitude. Il y a quatre répliques à analyser, une à la fois.' },
    { target: '.replica-cards .replica-card:first-child', title: '1 · L’attitude identifiée', text: 'Choisissez l’attitude vers laquelle le vendeur dévie : jugement, interprétation, conseil…' },
    { target: '.replica-cards .replica-card:nth-child(2)', title: '2 · Votre reformulation', text: 'Écrivez une vraie reformulation : redites ce que le client exprime, sans rien ajouter ni interpréter.' },
    { target: '.replica-progress', title: 'Votre avancement', text: 'La barre et les points montrent la réplique en cours. « Réponse suivante » passe à la réplique d’après.' }
  ]);

  ex.mount('s2-B', { screen, validate, feedback, onMount: () => core.wireRubric(window.ATELIER_S2.rubric) });
})();
