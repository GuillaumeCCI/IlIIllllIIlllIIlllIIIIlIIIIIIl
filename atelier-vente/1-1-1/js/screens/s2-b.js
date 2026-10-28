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
          <h2><span class="replica-num">1</span>Identifiez l’attitude du vendeur</h2>
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

  /* Le corrigé au modèle de S1 A (js/corrige.js) : la phrase du client, le
   * score estimatif, puis une ligne par réplique : l'attitude que vous avez
   * reconnue et votre reformulation, face à une réponse possible. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s2-B', ex.values());
    const blocs = result ? result.blocs : [];
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', content.title, `Le client dit au vendeur : ${content.mission} ${content.feedback}`)}
      ${corrige.head(result)}
      ${corrige.rows(cases.map((item, i) => {
        const chosen = ex.value(attitudeKey(i));
        const right = chosen === item.answer;
        const yours = `<p class="an-attitude">Attitude reconnue : <strong>${esc(chosen)}</strong> ${ex.verdictMark(right, right ? 'Attendue' : `Attendue : ${item.answer}`)}</p>
          <p>Votre reformulation : « ${corrige.answer(blocs[i], ex.value(rewriteKey(i)))} »</p>`;
        return corrige.row({ n: i + 1, title: `Réplique du vendeur : « ${item.text} »`, bloc: blocs[i], yours,
          model: [`Attitude du vendeur : ${item.answer}. ${item.why}`, item.rewrite] });
      }))}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    return ex.reviewing() ? reviewScreen() : replica();
  }

  function validate(values) {
    const errors = [];
    cases.forEach((item, i) => {
      if (!attitudes.includes(values[attitudeKey(i)])) errors.push({ key: attitudeKey(i), message: `Réponse ${i + 1} : choisissez une attitude.` });
      if (!String(values[rewriteKey(i)] ?? '').trim()) errors.push({ key: rewriteKey(i), message: `Réponse ${i + 1} : proposez une reformulation.` });
    });
    return errors;
  }

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s2-B', [
    { target: '.replica-screen .client-card', title: 'La phrase du client', text: 'Le client dit au vendeur : « Votre solution me paraît un peu chère. » C’est à cette phrase que le vendeur répond.' },
    { target: '.replica-seller', title: 'La réplique du vendeur',
      items: [
        { symbol: 'chat', tone: 'coral', text: 'Elle ressemble à une reformulation, mais elle dévie vers une autre attitude.' },
        { symbol: 'list', tone: 'blue', text: 'Il y a quatre répliques à analyser, une à la fois.' }
      ] },
    { target: '.replica-cards .replica-card:first-child', title: '1 · Identifiez l’attitude du vendeur', text: 'Choisissez l’attitude vers laquelle le vendeur dévie : jugement, interprétation, conseil…' },
    { target: '.replica-cards .replica-card:nth-child(2)', title: '2 · Votre reformulation', text: 'Écrivez une vraie reformulation : redites ce que le client exprime, sans rien ajouter ni interpréter.' },
    { target: '.replica-progress', title: 'Votre avancement',
      items: [
        { symbol: 'chart', tone: 'blue', text: 'La barre et les points montrent la réplique en cours.' },
        { symbol: 'arrowRight', tone: 'blue', text: '« Réponse suivante » passe à la réplique d’après.' }
      ] }
  ]);

  ex.mount('s2-B', { screen, validate, feedback, compactFeedback: true, onMount: () => core.wireRubric(window.ATELIER_S2.rubric) });
})();
