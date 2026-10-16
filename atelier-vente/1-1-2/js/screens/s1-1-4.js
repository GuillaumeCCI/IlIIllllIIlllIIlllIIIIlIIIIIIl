/* S1 1.4 · Le radar SONCAS.
 *
 * Deux clients. Pour chacun : repérer les indices dans ses propos (mots
 * cliquables), puis trois temps à droite :
 *   2 · la motivation dominante, parmi les six SONCAS (verrouillée tant
 *       que MIN_CLUES indices ne sont pas repérés : l'étape 1 n'est pas
 *       facultative) ;
 *   3 · exactement deux arguments qui lui correspondent ;
 *   4 · une justification courte.
 * Le corrigé s'affiche une fois les deux clients validés.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.4'];
  const clients = content.clients;
  const motives = content.motives;
  const letters = 'abcdef';
  const MIN_CLUES = 2;

  const client = () => Math.min(Math.max(0, Number(ex.value('client')) || 0), clients.length - 1);
  const stageOf = c => kit.stage(3, `stage${c}`);
  const clues = c => kit.list(`clues${c}`, clients[c].quote.length, false).map(Boolean);
  const motive = c => ex.value(`motive${c}`) || '';
  const args = c => { const v = ex.value(`args${c}`); return Array.isArray(v) ? v.filter(Number.isInteger) : []; };
  const done = c => ex.value(`done${c}`) === true;
  const clueCount = c => clues(c).filter(Boolean).length;
  const cluesReady = c => clueCount(c) >= MIN_CLUES;
  const motiveOf = id => motives.find(m => m.id === id);
  const exercise = () => ex.current;

  function picture(c) {
    const item = clients[c];
    const quote = `<div class="soncas-bubble">${icon('quote', { size: 24 })}<p>${item.quote.map(([word], i) =>
      `<button type="button" class="soncas-word ${clues(c)[i] ? 'is-clue' : ''}" data-act="clue" data-index="${i}" aria-pressed="${clues(c)[i]}">${esc(word)}</button>`).join(' ')}</p></div>`;
    if (item.image && exercise().image) {
      return `<div class="soncas-scene"><img src="${esc(core.webAsset(exercise().image))}" alt="${esc(exercise().alt)}" decoding="async">${quote}</div>`;
    }
    return `<div class="soncas-scene is-plain"><span class="soncas-avatar">${icon('users', { size: 40 })}</span><p class="k-label">${esc(item.label)}</p>${quote}</div>`;
  }

  function leftPanel(c) {
    const n = clueCount(c);
    const ready = cluesReady(c);
    return `<section class="k-panel">
      <div class="k-panel-title"><span class="k-badge">1</span><h2>Analysez les propos</h2></div>
      <p class="soncas-todo ${ready ? 'is-ok' : ''}">${icon(ready ? 'check' : 'pointer', { size: 20 })}<span>${ready
        ? 'Indices repérés : vous pouvez choisir la motivation. D’autres mots vous mettent sur la piste ? Cliquez-les aussi.'
        : `<strong>Commencez ici :</strong> cliquez sur les mots qui vous mettent sur la piste (au moins ${MIN_CLUES}).`}</span></p>
      ${picture(c)}
      <p class="soncas-clues">${icon('search', { size: 20 })}<span>Indices repérés : <strong>${n}</strong></span></p>
    </section>`;
  }

  function recap(c, withArgs) {
    const m = motiveOf(motive(c));
    return `<div class="soncas-recap">
      <span class="soncas-recap-motive">${icon(m.symbol, { size: 28 })}<span><small>Motivation retenue</small><strong>${esc(m.label)}</strong></span></span>
      ${withArgs ? `<span class="soncas-recap-args"><small>Arguments retenus</small>${args(c).map(i =>
        `<span class="soncas-recap-arg">${icon('check', { size: 15 })}<span><strong>${letters[i]}</strong> · ${esc(clients[c].arguments[i])}</span></span>`).join('')}</span>` : ''}
    </div>`;
  }

  function stageBody(c) {
    const at = stageOf(c);
    if (at === 1) {
      const locked = !cluesReady(c);
      return `${locked ? `<p class="soncas-locked">${icon('lock', { size: 20 })}<span>Étape 1 d’abord : repérez au moins ${MIN_CLUES} indices dans les propos du client, à gauche.</span></p>` : ''}
        <fieldset class="soncas-step2 ${locked ? 'is-locked' : ''}" ${locked ? 'disabled' : ''}><div class="soncas-question"><span class="soncas-big">2</span><div><h3>Quelle est sa motivation dominante ?</h3><p class="k-muted">Choisissez une seule motivation SONCAS.</p></div></div>
        <div class="soncas-motives" role="radiogroup">${motives.map((m, n) => `
          <label class="soncas-motive tone-${esc(m.tone || 'blue')} ${m.image ? 'has-picture' : ''} ${motive(c) === m.id ? 'is-chosen' : ''}">
            <input type="radio" class="sr-only" name="motive${c}" data-field="motive${c}" value="${m.id}" ${motive(c) === m.id ? 'checked' : ''}>
            <span class="soncas-motive-copy"><span class="soncas-motive-n">${n + 1}</span><strong>${esc(m.label)}</strong></span>
            ${m.image ? `<span class="soncas-motive-art"><img src="${esc(core.webAsset(m.image))}" alt="" decoding="async"></span>` : icon(m.symbol, { size: 38 })}
          </label>`).join('')}</div></fieldset>
        ${kit.tip('Appuyez-vous sur les mots employés par le client.')}`;
    }
    if (at === 2) {
      const chosen = args(c);
      return `${recap(c, false)}
        <div class="soncas-question"><span class="soncas-big">3</span><div><h3>Quels arguments feront mouche ?</h3><p class="k-muted">Sélectionnez exactement 2 cartes.</p></div></div>
        <div class="soncas-args">${clients[c].arguments.map((text, i) => `
          <button type="button" class="soncas-arg ${chosen.includes(i) ? 'is-on' : ''}" data-act="arg" data-index="${i}" aria-pressed="${chosen.includes(i)}">
            <span class="soncas-arg-letter">${letters[i]}</span><span>${esc(text)}</span>
          </button>`).join('')}</div>
        <p class="k-muted">${chosen.length} / 2 argument${chosen.length > 1 ? 's' : ''} sélectionné${chosen.length > 1 ? 's' : ''}</p>
        ${kit.tip('Cherchez les arguments qui répondent directement à la motivation retenue.')}`;
    }
    return `<div class="soncas-question"><span class="soncas-big">4</span><div><h3>Justifiez votre choix</h3><p class="k-muted">Expliquez en quoi ces deux arguments répondent précisément à la préoccupation du client.</p></div></div>
      ${ex.field(`why${c}`, 'Votre justification', { placeholder: 'Ces arguments sont pertinents parce que…', max: 300, rows: 5, hideLabel: true })}
      ${kit.tip('Reliez les arguments choisis aux mots employés par le client.')}`;
  }

  /* Étape 4 : à gauche, ce que l'on a retenu (motivation, puis les deux
   * arguments en cartes) à la place des propos du client. */
  function recapPanel(c) {
    const m = motiveOf(motive(c));
    return `<aside class="soncas-side">
      <div class="soncas-side-motive">${icon(m.symbol, { size: 34 })}<span><small>Motivation retenue</small><strong>${esc(m.label)}</strong></span></div>
      <p class="k-label">Arguments retenus</p>
      <ul class="soncas-side-args">${args(c).map(i => `<li><span>${esc(clients[c].arguments[i])}</span><span class="soncas-side-letter">${letters[i]}</span></li>`).join('')}</ul>
    </aside>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const c = client();
    const at = stageOf(c);
    const steps = kit.steps(['Motivation', 'Arguments', 'Justification'], at, { compact: true, letters: ['2', '3', '4'] });
    const labels = { 1: 'Continuer vers les arguments', 2: 'Continuer vers la justification', 3: 'Valider ce client' };
    const backs = { 2: 'Retour à la motivation', 3: 'Retour aux arguments' };
    const bar = kit.bar({
      left: at > 1 ? kit.back('stage-back', backs[at]) : kit.reset(),
      right: `${kit.dialogButton(at === 3 ? 'example' : 'hint', at === 3 ? 'Voir un exemple' : 'Voir un indice')}${kit.submit(labels[at])}`
    });
    /* Maquette de l'étape 4 : en-tête « Construisez votre réponse » et fil
     * d'étapes en haut à droite ; le rappel à gauche, la rédaction à droite. */
    if (at === 3) {
      return `<div class="k-page soncas-page is-final">
        ${kit.head({ eyebrow: `${content.eyebrow} · Client ${c + 1} sur ${clients.length}`, title: 'Construisez votre réponse',
          subtitle: 'Rédigez une justification en expliquant en quoi ces arguments répondent précisément à la préoccupation du client.', aside: steps })}
        <div class="k-columns soncas-final">
          ${recapPanel(c)}
          <form class="k-panel" novalidate>${stageBody(c)}${core.errorsBox()}${bar}</form>
        </div>
      </div>`;
    }
    return `<div class="k-page soncas-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, symbol: 'target',
        aside: `<p class="k-count">Client <strong>${c + 1} sur ${clients.length}</strong></p>` })}
      ${kit.band('Repérez les indices dans les propos du client, identifiez sa motivation dominante, puis choisissez les 2 arguments qui lui correspondent le mieux.')}
      <div class="k-tabs">${clients.map((item, i) => `<button type="button" class="k-tab ${i === c ? 'is-active' : ''} ${done(i) ? 'is-done' : ''}" data-act="client" data-index="${i}"><span class="k-tab-dot">${done(i) ? icon('check', { size: 14 }) : i + 1}</span><span>${esc(item.label)}</span></button>`).join('')}</div>
      <div class="k-columns">
        ${leftPanel(c)}
        <form class="k-panel" novalidate>
          <h2 class="soncas-title">Construisez votre réponse</h2>
          ${steps}
          ${stageBody(c)}
          ${core.errorsBox()}
          ${bar}
        </form>
      </div>
      ${kit.utility('Corrigé disponible après les 2 clients')}
    </div>`;
  }

  function reviewScreen() {
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Votre radar, client par client', symbol: 'target' })}
      <div class="k-review-grid">${clients.map((item, c) => {
        const expectedMotive = motiveOf(item.motive);
        const okMotive = motive(c) === item.motive;
        const expectedClues = item.quote.filter(([, clue]) => clue).map(([word]) => word.replace(/[.,]$/, ''));
        return `<section class="k-panel soncas-review">
          <h2>${esc(item.label)}</h2>
          <p class="soncas-quote-review">${item.quote.map(([word, clue], i) => {
            const found = clues(c)[i];
            return `<span class="${clue ? (found ? 'is-found' : 'is-missed') : found ? 'is-extra' : ''}">${esc(word)}</span>`;
          }).join(' ')}</p>
          <p class="k-muted">Indices attendus : ${esc(expectedClues.join(', '))}. Surlignés en vert ceux que vous avez repérés, en pointillés ceux qui vous ont échappé.</p>
          <p class="review-line">${kit.picked(okMotive, motiveOf(motive(c))?.label, expectedMotive.label, 'Motivation')}</p>
          <ul class="soncas-args-review">${item.arguments.map((text, i) => {
            const expected = item.answers.includes(i);
            const chosen = args(c).includes(i);
            if (!expected && !chosen) return '';
            return `<li>${kit.mark(expected, `${letters[i]} · ${text}`)}<small>${expected ? (chosen ? 'retenu, attendu' : 'attendu, non retenu') : 'retenu, non attendu'}</small></li>`;
          }).join('')}</ul>
          ${kit.yours('Votre justification', ex.value(`why${c}`))}
          ${kit.model('Corrigé modèle', item.model)}
        </section>`;
      }).join('')}</div>
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function stageErrors(c) {
    const at = stageOf(c);
    if (at === 1 && !cluesReady(c)) return [{ key: `clues${c}`, message: `Repérez d’abord au moins ${MIN_CLUES} indices dans les propos du client.` }];
    if (at === 1 && !motive(c)) return [{ key: `motive${c}`, message: 'Choisissez une motivation.' }];
    if (at === 2 && args(c).length !== 2) return [{ key: 'args', message: 'Sélectionnez exactement 2 arguments.' }];
    if (at === 3 && !kit.filled(ex.value(`why${c}`))) return [{ key: `why${c}`, message: 'Justifiez votre choix.' }];
    return [];
  }

  function validate() {
    const c = client();
    const errors = stageErrors(c);
    if (errors.length) return errors;
    if (stageOf(c) < 3) return [{ key: 'stage', message: 'Terminez les étapes de ce client.' }];
    const missing = clients.findIndex((_, i) => i !== c && !done(i));
    return missing === -1 ? [] : [{ key: 'client', message: `Traitez aussi le client ${missing + 1}.` }];
  }

  function intercept() {
    const c = client();
    if (stageErrors(c).length) return false;
    if (stageOf(c) < 3) { kit.setStage(stageOf(c) + 1, `stage${c}`); return true; }
    ex.setValue(`done${c}`, true);
    const next = clients.findIndex((_, i) => !done(i));
    if (next === -1) return false;
    ex.setValue('client', next);
    return true;
  }

  function feedback() {
    const motivesOk = clients.filter((item, c) => motive(c) === item.motive).length;
    const argsOk = clients.reduce((sum, item, c) => sum + args(c).filter(i => item.answers.includes(i)).length, 0);
    return [`Motivation identifiée pour ${motivesOk} client${motivesOk > 1 ? 's' : ''} sur ${clients.length} ; ${argsOk} argument${argsOk > 1 ? 's' : ''} pertinent${argsOk > 1 ? 's' : ''} sur ${clients.length * 2}.`];
  }

  kit.on({
    clue: el => {
      const c = client();
      const list = clues(c);
      const i = Number(el.dataset.index);
      list[i] = !list[i];
      ex.setValue(`clues${c}`, list);
      kit.commit();
    },
    arg: el => {
      const c = client();
      const i = Number(el.dataset.index);
      let list = args(c);
      if (list.includes(i)) list = list.filter(n => n !== i);
      else if (list.length < 2) list.push(i);
      else { core.toast('Deux arguments maximum : retirez-en un avant d’en choisir un autre.'); return; }
      ex.setValue(`args${c}`, list);
      kit.commit();
    },
    client: el => { ex.setValue('client', Number(el.dataset.index)); kit.commit(); },
    'stage-back': () => { const c = client(); kit.setStage(Math.max(1, stageOf(c) - 1), `stage${c}`); kit.commit(); }
  });
  kit.dialogs({
    hint: () => ({
      title: 'Un indice',
      html: stageOf(client()) === 1
        ? '<p>Relisez les mots que vous avez repérés : expriment-ils une peur, un désir de facilité, un souci d’argent, l’envie d’être reconnu, le goût du neuf ou le besoin d’une relation de confiance ?</p>'
        : '<p>Un bon argument répond à la motivation retenue, pas à une autre. Écartez ceux qui parlent de prix, d’esthétique ou de fonctions avancées si ce n’est pas ce qui préoccupe le client.</p>'
    }),
    example: {
      title: 'Un exemple de justification',
      html: '<p>« Le client a été piraté et veut être certain que ses données seront protégées. Le chiffrement empêche une nouvelle intrusion, et la sauvegarde automatique garantit qu’il ne perdra rien, même en cas de problème. »</p>'
    }
  });

  ex.mount('s1-1.4', { screen, validate, intercept, feedback, compactFeedback: true });
})();
