/* S6 6.1 · L'entretien dont vous êtes le héros (fiche M1.2.2, synthèse
 * optionnelle, option 2), mis en scène comme un récit interactif.
 *
 * Quatre étapes :
 *   0. Le scénario, en scène (décor de la concession flouté) : une question
 *      d'accroche, puis sept étapes, chacune en quatre temps : la situation,
 *      votre choix, la réaction de la cliente, le retour (« Absolument ! » /
 *      « Pas tout à fait… »). La jauge de découverte compte votre premier
 *      choix ; une fin selon la jauge.
 *   1. Vos acquis : quatre questions, une à la fois, retour aussitôt.
 *   2. La carte des besoins : six rubriques, la partie jouée à gauche.
 *   3. La grille Oui / Non.
 * Puis le corrigé : votre parcours, votre carte face à l'exemple.
 *
 * Valeurs : `warm` (accroche), `wok` (son retour lu) ; pour chaque étape k :
 * `seen<k>` (situation lue), `c<k>` (le choix), `rs<k>` (réaction lue),
 * `ack<k>` (retour lu) ; `q<i>` et `qa<i>` (vos acquis) ; `m_<rubrique>`
 * (la carte) ; `self<i>` (la grille) ; `at` (l'étape en cours).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const KEY = 's6-6.1';
  const content = window.ATELIER_S6['6.1'];
  const { client, steps, endings, map, warmup, quiz } = content;
  const STEPS = ['Le scénario', 'Vos acquis', 'La carte des besoins', 'La grille'];
  const LAST = STEPS.length - 1;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];
  const v = name => ex.value(name);
  const yes = name => v(name) === true;

  /* ── Le scénario : choix, jauge, fin ─────────────────────────────────── */
  const choiceAt = k => v(`c${k}`) || null;
  const played = () => steps.filter((_, k) => choiceAt(k)).length;
  const gaugeAfter = upto => steps.slice(0, upto).reduce((g, s, k) => {
    const c = s.choices[choiceAt(k)];
    return c ? Math.max(0, Math.min(10, g + c.points)) : g;
  }, content.start);
  const gauge = () => gaugeAfter(played());
  const ending = () => {
    const found = endings.find(e => gauge() >= e.min) || endings[endings.length - 1];
    const last = steps.length - 1;
    // Sans la bonne validation, pas de « Exactement, et dans cet ordre ».
    return found === endings[0] && choiceAt(last) !== steps[last].best ? endings[1] : found;
  };
  const scenarioDone = () => steps.every((_, k) => yes(`ack${k}`));

  /* Le temps où l'on est dans la scène, déduit de ce qui est déjà fait. */
  function beat() {
    if (!v('warm')) return { kind: 'warm' };
    if (!yes('wok')) return { kind: 'warm-fb' };
    const k = steps.findIndex((_, i) => !yes(`ack${i}`));
    if (k === -1) return { kind: 'end' };
    if (!choiceAt(k)) return { kind: yes(`seen${k}`) ? 'choose' : 'ctx', k };
    return { kind: yes(`rs${k}`) ? 'fb' : 'reply', k };
  }

  /* Vos acquis : la première question sans réponse lue. */
  const quizAt = () => { const i = quiz.findIndex((_, n) => !yes(`qa${n}`)); return i === -1 ? quiz.length : i; };
  const quizScore = () => quiz.filter((item, n) => v(`q${n}`) === item.best).length;

  const stepDone = k => {
    if (k === 0) return scenarioDone();
    if (k === 1) return quizAt() === quiz.length;
    if (k === 2) return map.every(r => !r.required || kit.filled(v(`m_${r.id}`)));
    return content.selfCheck.every((_, i) => Boolean(v(`self${i}`)));
  };
  const reachable = k => Array.from({ length: k }, (_, i) => i).every(stepDone);
  const at = () => {
    const asked = Number(v('at')) || 0;
    if (reachable(asked)) return Math.min(asked, LAST);
    const free = STEPS.findIndex((_, k) => !stepDone(k));
    return free === -1 ? LAST : free;
  };
  const go = k => { ex.setValue('at', k); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); };
  // Un pas dans la scène : on enregistre, puis on redessine.
  const advance = (name, value = true) => { ex.setValue(name, value); ex.changed(); ex.rebuild(); };

  function progress(k) {
    const arrow = (i, dir) => {
      const ok = i >= 0 && i <= LAST && reachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="h6-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEPS.map((label, i) => `<button type="button" class="k-progress-seg ${stepDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="h6-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${arrow(k - 1, 'prev')}<span class="k-progress-label">${esc(STEPS[k])}</span><strong>${k + 1} / ${STEPS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${arrow(k + 1, 'next')}</p>`;
  }

  const img = path => esc(core.asset(`assets/illustrations/${path}`));
  const portrait = img(client.face);
  const decor = img(client.decor);
  const picture = `<img class="h6-picture" src="${img(client.picture)}" alt="${esc(client.name)}, assise dans l’espace conseil, se tient l’épaule droite.">`;
  const q = text => `«&nbsp;${esc(text)}&nbsp;»`;
  const delay = t => `style="animation-delay:${t.toFixed(2)}s"`;
  const said = (text, t = 0) => `<div class="h6-said h6-in" ${delay(t)}><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(text)}</p></div>`;
  const next = (label, act, t = 0, extra = '') => `<button type="button" class="button primary h6-next h6-in" ${delay(t)} data-act="${act}" ${extra}><span>${esc(label)}</span>${icon('arrowRight', { size: 18 })}</button>`;

  const gaugeBar = (value, label = 'Jauge de découverte') => `<div class="h6-gauge" role="img" aria-label="${esc(label)} : ${value} sur 10">
      <span class="h6-gauge-label">${esc(label)}</span>
      <span class="h6-gauge-track"><span class="h6-gauge-fill tone-${value >= 8 ? 'ok' : value >= 4 ? 'mid' : 'ko'}" style="width:${value * 10}%"></span></span>
      <strong>${value} / 10</strong>
    </div>`;

  /* La conversation (relue en scène, et à gauche de la carte). */
  function thread() {
    const items = [];
    steps.forEach((s, k) => {
      if (!yes(`seen${k}`) && !choiceAt(k)) return;
      if (s.scene) items.push(`<li class="h6-scene">${esc(s.scene)}</li>`);
      if (s.says) items.push(`<li class="d5-msg is-client"><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(s.says)}</p></li>`);
      if (s.after) items.push(`<li class="h6-scene">${esc(s.after)}</li>`);
      const c = s.choices[choiceAt(k)];
      if (!c) return;
      items.push(`<li class="d5-msg is-you"><p><span>Vous · étape ${k + 1}</span>${q(c.text)}</p></li>`);
      if (c.reply) items.push(`<li class="d5-msg is-client"><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(c.reply)}</p></li>`);
    });
    return items.join('') || '<li class="d5-thread-empty">La conversation s’affichera ici.</li>';
  }

  /* Un retour, dans le style du formateur : le verdict à gauche, l'explication à droite. */
  const VERDICT = {
    ok: { icon: 'check', face: 'formatrice-oui', label: 'Ceci est une réponse appropriée', title: 'Absolument !' },
    mid: { icon: 'thought', face: 'formatrice-presque', label: 'Ce n’est pas tout à fait la réponse attendue', title: 'Pas tout à fait…' },
    ko: { icon: 'close', face: 'formatrice-attention', label: 'Ceci n’est pas une réponse appropriée', title: 'À éviter…' }
  };
  function feedbackCard(tone, text, { better = '', betterLabel = 'Il valait mieux demander', quoted = true, points = null, button }) {
    const verdict = VERDICT[tone];
    return `<div class="h6-fb tone-${tone}">
        <div class="h6-fb-side h6-in"><img class="h6-fb-face" src="${esc(core.asset(`../../moteur/assets/illustrations/retours/${verdict.face}.webp`))}" alt="" aria-hidden="true"><p>${esc(verdict.label)}</p></div>
        <div class="h6-card h6-fb-text h6-in" ${delay(0.15)}>
          <p class="h6-fb-title">${esc(verdict.title)}${points === null ? '' : `<span class="h6-delta is-${points > 0 ? 'up' : points < 0 ? 'down' : 'same'}">${points > 0 ? '+2' : points < 0 ? '−2' : '0'} sur la jauge</span>`}</p>
          <p>${esc(text)}</p>
          ${better ? `<p class="h6-better"><span>${esc(betterLabel)}</span>${quoted ? q(better) : esc(better)}</p>` : ''}
        </div>
        <div class="h6-stage-foot">${button}</div>
      </div>`;
  }

  /* Des choix numérotés, face à la personne qui pose la question. */
  function choiceBlock({ title, ask, order, choices, act, data = '', field = '' }) {
    return `<div class="h6-choose">
        <div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${img(client.seller)}" alt="" aria-hidden="true"><p class="h6-who-name">Vous, Antoine</p><p class="h6-who-ask">${esc(ask)}</p></div>
        <div class="h6-options" role="group" aria-label="${esc(title)}">${order.map((id, n) => `<button type="button" class="h6-option h6-in" ${delay(0.2 + n * 0.15)} data-act="${act}" data-id="${id}" ${data} ${n === 0 && field ? `data-field="${field}"` : ''}><span class="h6-option-n">${n + 1}</span><span>${esc(choices[id].text)}</span></button>`).join('')}</div>
      </div>`;
  }

  /* ── 0 · Le scénario, en scène ───────────────────────────────────────── */
  function scenario() {
    const b = beat();
    const k = b.k;
    const s = steps[k];
    let body = '';
    if (b.kind === 'warm') {
      body = `<div class="h6-card h6-banner is-text h6-in"><div><p class="k-label">Avant de commencer</p><p>${esc(client.context)}</p></div></div>
        ${choiceBlock({ title: 'Question d’accroche', ask: warmup.question, order: warmup.order, choices: warmup.choices, act: 'h6-warm', field: 'warm' })}`;
    } else if (b.kind === 'warm-fb') {
      const id = v('warm');
      const ok = id === warmup.best;
      body = feedbackCard(ok ? 'ok' : 'mid', warmup.choices[id].fb, { better: ok ? '' : warmup.choices[warmup.best].text, betterLabel: 'La réponse attendue', quoted: false, button: next('Commencer l’entretien', 'h6-flag', 0.4, 'data-name="wok"') });
    } else if (b.kind === 'ctx') {
      body = `<div class="h6-card h6-situation ${s.picture ? 'has-picture' : ''} h6-in">
          ${s.picture ? picture : ''}
          <p class="k-label">Étape ${k + 1} sur ${steps.length}</p>
          ${s.scene ? `<p class="h6-scene-text">${esc(s.scene)}</p>` : ''}
          ${s.says ? said(s.says, 0.35) : ''}
          ${s.after ? `<p class="h6-scene-text h6-in" ${delay(0.8)}>${esc(s.after)}</p>` : ''}
          ${s.prompt ? `<p class="h6-scene-text">${esc(s.prompt)}</p>` : ''}
        </div>
        <div class="h6-stage-foot">${next('Continuer', 'h6-flag', s.says ? 1.1 : 0.5, `data-name="seen${k}"`)}</div>`;
    } else if (b.kind === 'choose') {
      body = choiceBlock({ title: 'Les questions possibles', ask: s.prompt || 'Que lui demandez-vous ?', order: s.order, choices: s.choices, act: 'h6-pick', data: `data-step="${k}"`, field: `c${k}` });
    } else if (b.kind === 'reply') {
      const c = s.choices[choiceAt(k)];
      body = `<div class="h6-card h6-exchange">
          <div class="h6-you h6-in"><span>Vous</span>${q(c.text)}</div>
          ${c.reply ? `<div class="h6-typing h6-in" aria-hidden="true"><span></span><span></span><span></span></div>${said(c.reply, 1.05)}` : ''}
        </div>
        <div class="h6-stage-foot">${next('Continuer', 'h6-flag', c.reply ? 1.6 : 0.5, `data-name="rs${k}"`)}</div>`;
    } else if (b.kind === 'fb') {
      const id = choiceAt(k);
      const c = s.choices[id];
      const ok = id === s.best;
      body = feedbackCard(ok ? 'ok' : c.points < 0 ? 'ko' : 'mid', ok ? s.why : c.note, { better: ok ? '' : s.choices[s.best].text, points: c.points, button: next(k === steps.length - 1 ? 'Voir la fin de l’entretien' : 'Continuer', 'h6-flag', 0.4, `data-name="ack${k}"`) });
    } else {
      const end = ending();
      body = `<div class="h6-card h6-end tone-${end.tone} h6-in">
          <p class="k-label">La fin de l’entretien</p>
          <p class="h6-end-title">${esc(end.title)}</p>
          ${said(end.says, 0.3)}
          <p class="h6-end-text">${esc(end.text)}</p>
        </div>
        <div class="h6-stage-foot">${kit.submit('Vérifier mes acquis')}</div>`;
    }
    const inGame = !['warm', 'warm-fb'].includes(b.kind);
    return `<section class="h6-stage" style="--h6-decor:url('${decor}')">
        <div class="h6-stage-top">
          ${inGame ? gaugeBar(gauge()) : '<span></span>'}
          ${inGame && played() ? `<details class="h6-replay"><summary>${icon('chat', { size: 16 })}<span>Relire l’échange</span></summary><ol class="d5-thread">${thread()}</ol></details>` : ''}
        </div>
        <div class="h6-stage-body is-${b.kind}">${body}</div>
      </section>
      ${core.errorsBox()}`;
  }

  /* ── 1 · Vos acquis ──────────────────────────────────────────────────── */
  function quizStep() {
    const i = quizAt();
    let body;
    if (i === quiz.length) {
      body = `<div class="h6-card h6-end tone-${quizScore() >= 3 ? 'ok' : 'mid'} h6-in"><p class="k-label">Vos acquis</p><p class="h6-end-title">${quizScore()} bonne${quizScore() > 1 ? 's' : ''} réponse${quizScore() > 1 ? 's' : ''} sur ${quiz.length}</p><p class="h6-end-text">Place à la carte des besoins de ${esc(client.name)}.</p></div>
        <div class="h6-stage-foot">${kit.submit('Construire ma carte des besoins')}</div>`;
    } else if (!v(`q${i}`)) {
      body = `<p class="k-label h6-quiz-n">Question ${i + 1} sur ${quiz.length}</p>${choiceBlock({ title: `Question ${i + 1}`, ask: quiz[i].question, order: quiz[i].order, choices: quiz[i].choices, act: 'h6-quiz', data: `data-i="${i}"`, field: `q${i}` })}`;
    } else {
      const id = v(`q${i}`);
      const ok = id === quiz[i].best;
      body = feedbackCard(ok ? 'ok' : 'ko', quiz[i].choices[id].fb, { better: ok ? '' : quiz[i].choices[quiz[i].best].text, betterLabel: 'La bonne réponse', quoted: false, button: next(i === quiz.length - 1 ? 'Voir mon résultat' : 'Question suivante', 'h6-flag', 0.4, `data-name="qa${i}"`) });
    }
    return `<section class="h6-stage" style="--h6-decor:url('${decor}')"><div class="h6-stage-body">${body}</div></section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h6-prev', 'Revoir l’entretien') })}`;
  }

  /* ── 2 · La carte des besoins ────────────────────────────────────────── */
  let mapPick = 0;
  function mapStep() {
    const filled = map.map(r => kit.filled(v(`m_${r.id}`)));
    const pane = (i, r) => `<div class="d5-ana-pane" ${i === mapPick ? '' : 'hidden'}>
        <div class="fm-field"><p class="fm-label">${esc(r.label)}</p><p class="fm-sub">${esc(r.sub)}</p>
          ${ex.field(`m_${r.id}`, r.label, { placeholder: r.placeholder, max: 700, rows: 5, hideLabel: true })}</div>
        <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="h6-map" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Rubrique précédente</span></button>` : '<span></span>'}${i < map.length - 1 ? `<button type="button" class="button secondary" data-act="h6-map" data-i="${i + 1}"><span>Rubrique suivante</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>
      </div>`;
    return `<section class="k-panel d5-panel h6-panel">
        <p class="k-label">La carte des besoins de ${esc(client.name)}</p>
        <p class="a4-role">Elle servira à votre argumentation. Appuyez-vous sur votre partie : vos questions et ses réponses sont à gauche.</p>
        <div class="d5-chat d5-ana">
          <div class="d5-chat-thread d5-ana-said"><div class="h6-gauge-row">${gaugeBar(gauge(), 'Votre jauge finale')}</div><ol class="d5-thread">${thread()}</ol></div>
          <div class="d5-ana-main">
            <div class="d5-floor-tabs" role="tablist" aria-label="Les rubriques de la carte">${map.map((r, i) => `<button type="button" class="d5-floor-tab ${i === mapPick ? 'is-current' : ''} ${filled[i] ? 'is-filled' : ''}" role="tab" aria-selected="${i === mapPick}" data-act="h6-map" data-i="${i}"><span class="d5-floor-n">${filled[i] ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(r.tab)}</span></button>`).join('')}</div>
            ${map.map((r, i) => pane(i, r)).join('')}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h6-prev', 'Revoir mes acquis'), right: kit.submit('Passer à la grille') })}`;
  }

  /* ── 3 · La grille Oui / Non ─────────────────────────────────────────── */
  function grid() {
    return `<section class="k-panel d5-panel">
        <p class="k-label">Auto-évaluation · avant le corrigé</p>
        <p class="d5-intro">Vérifiez votre carte avec la grille. Votre tuteur utilisera la même.</p>
        ${kit.matrix({ key: 'self', rows: content.selfCheck, columns: YES_NO, head: 'Critère', round: true })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h6-prev', 'Revenir à ma carte'), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Le corrigé ──────────────────────────────────────────────────────── */
  const mapText = () => [
    `La carte des besoins de ${client.name}`, '',
    ...map.map(r => `${r.label.replace(/^\d+ · /, '')} : ${v(`m_${r.id}`) || ''}`)
  ].join('\n');

  function review() {
    const end = ending();
    const best = steps.filter((s, k) => choiceAt(k) === s.best).length;
    const yesCount = content.selfCheck.filter((_, i) => v(`self${i}`) === 'oui').length;
    const pathRows = steps.map((s, k) => {
      const id = choiceAt(k);
      const c = s.choices[id] || {};
      const ok = id === s.best;
      const tone = ok ? 'is-ok' : c.points < 0 ? 'is-ko' : 'is-mid';
      const verdict = ok ? 'Absolument : c’est la meilleure question.' : c.points < 0 ? 'Réponse à éviter.' : 'Pas tout à fait…';
      return `<div class="h6-path-row">
          <p class="h6-path-n">Étape ${k + 1}</p>
          <div class="h6-path-you"><p class="h6-pick ${tone}"><span aria-hidden="true">${ok ? '✓' : c.points < 0 ? '✗' : '–'}</span>${q(c.text || '')}</p>
            <p class="h6-verdict ${tone}">${verdict}<span>${c.points > 0 ? '+2' : c.points < 0 ? '−2' : '0'} sur la jauge</span></p>
            <p class="h6-explain">${esc(ok ? s.why : c.note || '')}</p></div>
          <div class="h6-path-best">${ok ? '' : `<p class="h6-best-label">La meilleure question</p><p class="h6-best-q">${q(s.choices[s.best].text)}</p><p class="h6-explain">${esc(s.why)}</p>`}</div>
        </div>`;
    }).join('');
    const mapRows = map.map(r => {
      const text = v(`m_${r.id}`);
      return `<div class="fm-rv-row">
          <p class="fm-rv-label">${esc(r.label.replace(/^\d+ · /, ''))}</p>
          <div class="fm-rv-you">${kit.filled(text) ? `<p class="result-answer-text">${esc(text)}</p>` : '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>'}</div>
          <div class="fm-rv-model"><p>${esc(r.model)}</p></div>
        </div>`;
    }).join('');
    return `<section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Votre partie</span><span class="a4-review-count"><b>${best}</b> / ${steps.length} meilleurs choix · vos acquis : <b>${quizScore()}</b> / ${quiz.length}</span></p>
        <div class="h6-review-end tone-${end.tone}">${gaugeBar(gauge(), 'Votre jauge finale')}<p><strong>${esc(end.title)}.</strong> ${esc(end.text)}</p></div>
        <div class="h6-path-head" aria-hidden="true"><span></span><span>Votre choix, et ce qu’il a produit</span><span>Ce qu’il fallait demander</span></div>
        ${pathRows}
      </section>
      <section class="k-panel fm-review is-rows h6-review">
        <p class="k-label">Votre carte des besoins</p>
        <div class="fm-rv-head" aria-hidden="true"><span></span><span>Votre carte</span><span>Un exemple (parcours réussi)</span></div>
        ${mapRows}
        <div class="h6-copy">${kit.act('h6-copy', `${icon('document', { size: 18 })}<span>Copier ma carte</span>`, 'secondary small')}<span>Pour la garder, ou la transmettre à votre tuteur.</span></div>
      </section>
      <section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yesCount}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${v(`self${i}`) === 'oui' ? '2' : '0'}">${v(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      ${kit.keyPoint ? kit.keyPoint(content.keyPoint) : ''}
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const k = at();
    const body = reviewing ? review() : [scenario, quizStep, mapStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return scenarioDone() ? [] : [{ key: 'warm', message: 'Jouez l’entretien jusqu’au bout.' }];
    if (k === 1) return stepDone(1) ? [] : [{ key: `q${quizAt()}`, message: `Répondez aux ${quiz.length} questions.` }];
    if (k === 2) {
      const missing = map.findIndex(r => r.required && !kit.filled(values[`m_${r.id}`]));
      if (missing !== -1) mapPick = missing;
      return missing === -1 ? [] : [{ key: `m_${map[missing].id}`, message: `Remplissez la rubrique « ${map[missing].tab} » de votre carte.` }];
    }
    const missing = content.selfCheck.findIndex((_, i) => !values[`self${i}`]);
    return missing === -1 ? [] : [{ key: `self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < LAST && stepDone(k)) { ex.setValue('at', k + 1); return true; }
    return false;
  }

  const feedback = () => ['Votre tuteur peut vous faire un retour sur votre carte, avec la même grille.'];

  kit.on({
    'h6-go': control => go(Number(control.dataset.index)),
    'h6-prev': () => go(Math.max(0, at() - 1)),
    // « Continuer » : le temps présent est lu, on passe au suivant.
    'h6-flag': control => advance(control.dataset.name),
    'h6-warm': control => { if (!v('warm')) advance('warm', control.dataset.id); },
    'h6-pick': control => {
      const k = Number(control.dataset.step);
      if (choiceAt(k)) return; // un choix fait reste fait : la jauge compte le premier
      advance(`c${k}`, control.dataset.id);
    },
    'h6-quiz': control => { const i = Number(control.dataset.i); if (!v(`q${i}`)) advance(`q${i}`, control.dataset.id); },
    'h6-map': control => { mapPick = Number(control.dataset.i); ex.rebuild(); },
    'h6-copy': () => {
      const done = () => core.toast('Votre carte est copiée.');
      const fail = () => core.toast('Copie impossible : sélectionnez le texte de votre carte.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(mapText()).then(done, fail);
      else fail();
    }
  });

  kit.tour(KEY, [
    { target: '.h6-stage', title: 'L’entretien', text: 'Vous êtes Antoine. À chaque étape : la situation, votre question, la réaction de la cliente, puis un retour sur votre choix.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'L’entretien, vos acquis, la carte des besoins, puis la grille.' }
  ]);

  ex.mount(KEY, { screen, validate, feedback, intercept, compactFeedback: true });
})();
