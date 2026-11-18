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
  const tries = k => { const x = v(`x${k}`); return Array.isArray(x) && x.length ? x : (choiceAt(k) ? [choiceAt(k)] : []); };
  const currentAt = k => { const t = tries(k); return t[t.length - 1] || null; };
  const played = () => steps.filter((_, k) => choiceAt(k)).length;
  const gaugeAfter = upto => steps.slice(0, upto).reduce((g, s, k) => {
    const c = s.choices[choiceAt(k)];
    return c ? Math.max(0, Math.min(10, g + c.points)) : g;
  }, content.start);
  const gauge = () => gaugeAfter(played());
  // Le chrono : les minutes prises par les choix faits jusqu'à l'étape `upto`.
  const usedAfter = upto => steps.slice(0, upto).reduce((m, st, k) => m + ((st.choices[choiceAt(k)] || {}).minutes || 0), 0);
  const left = (upto = played()) => Math.max(0, content.minutes - usedAfter(upto));
  const minutesText = n => (n === 15 ? 'un quart d’heure' : `${n} minute${n > 1 ? 's' : ''}`);
  // Sa phrase, avec le temps qui lui reste vraiment (« Il me reste {reste}. »).
  const sayOf = (st, k) => (st.says || '').replace('{reste}', minutesText(left(k)));
  const ending = () => {
    const found = endings.find(e => gauge() >= e.min) || endings[endings.length - 1];
    const last = steps.length - 1;
    // Sans la bonne validation, pas de « Exactement, et dans cet ordre ».
    const sure = found === endings[0] && currentAt(last) !== steps[last].best ? endings[1] : found;
    // Plus assez de temps pour un vrai essai : l'essai est écourté.
    if (sure !== endings[endings.length - 1] && left(steps.length) < content.testMin) return Object.assign({}, content.shortEnding, { text: content.shortEnding.text.replace('{reste}', minutesText(left(steps.length))) });
    return sure;
  };
  const scenarioDone = () => steps.every((_, k) => yes(`ack${k}`));

  /* Le temps où l'on est dans la scène, déduit de ce qui est déjà fait. */
  function beat() {
    if (!v('warm')) return { kind: 'warm' };
    if (!yes('wok')) return { kind: 'warm-fb' };
    if (!yes('tr0') && !yes('seen0')) return { kind: 'trans' };
    const k = steps.findIndex((_, i) => !yes(`ack${i}`));
    if (k === -1) return { kind: yes('endok') ? 'bilan' : 'end' };
    if (!choiceAt(k)) return { kind: yes(`seen${k}`) ? 'choose' : 'ctx', k };
    // Après un choix moins bon : retour aux propositions, les essais grisés.
    if (yes(`retry${k}`)) return { kind: 'choose', k, retry: true };
    return { kind: yes(`rs${k}`) ? 'fb' : 'reply', k };
  }

  /* Vos acquis : la première question sans réponse lue. */
  const quizAt = () => { const i = quiz.findIndex((_, n) => !yes(`qa${n}`)); return i === -1 ? quiz.length : i; };
  const quizScore = () => quiz.filter((item, n) => v(`q${n}`) === item.best).length;

  const stepDone = k => {
    if (k === 0) return scenarioDone() && yes('endok');
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
  // « Lui demander… » → « lui demander… », pour « Vous décidez de lui demander… ».
  const lower = text => text.charAt(0).toLowerCase() + text.slice(1);
  const delay = t => `style="animation-delay:${t.toFixed(2)}s"`;
  const said = (text, t = 0) => `<div class="h6-said h6-in" ${delay(t)}><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(text)}</p></div>`;
  const next = (label, act, t = 0, extra = '') => `<button type="button" class="button primary h6-next h6-in" ${delay(t)} data-act="${act}" ${extra}><span>${esc(label)}</span>${icon('arrowRight', { size: 18 })}</button>`;

  // Au survol (ou au clavier), une bulle explique la jauge et le chrono.
  const GAUGE_TIP = 'La jauge mesure la qualité de votre découverte. Elle part de 5 sur 10 : une bonne question la fait monter de 2, une question qui ferme l’échange la fait baisser de 2, les autres la laissent stable. À la fin, elle décide de la suite de l’entretien.';
  const CLOCK_TIP = 'Mme Rivière n’a que 30 minutes, essai compris. Chaque question prend du temps : son coût s’affiche sur chaque choix. Gardez au moins 10 minutes pour l’essai.';
  const gaugeBar = (value, label = 'Jauge de découverte') => `<div class="h6-gauge has-tip" tabindex="0" data-tip="${esc(GAUGE_TIP)}" role="img" aria-label="${esc(label)} : ${value} sur 10. ${esc(GAUGE_TIP)}">
      <span class="h6-gauge-label">${esc(label)}</span>
      <span class="h6-gauge-track"><span class="h6-gauge-fill tone-${value >= 8 ? 'ok' : value >= 4 ? 'mid' : 'ko'}" style="width:${value * 10}%"></span></span>
      <strong>${value} / 10</strong>
    </div>`;

  /* Le chrono : un cadran SVG dont l'anneau se vide avec les minutes, le
   * nombre au centre, « Temps restant / sur 30 min » à côté. */
  const clockBadge = n => {
    const r = 19; const c = 2 * Math.PI * r; const part = Math.max(0, Math.min(1, n / content.minutes));
    return `<div class="h6-clock has-tip ${n < content.testMin ? 'is-short' : ''}" tabindex="0" data-tip="${esc(CLOCK_TIP)}" role="img" aria-label="Temps restant : ${n} minutes sur ${content.minutes}. ${esc(CLOCK_TIP)}">
        <svg class="h6-dial" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
          <circle cx="24" cy="24" r="${r}" class="h6-dial-track"/>
          <circle cx="24" cy="24" r="${r}" class="h6-dial-fill" stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${(c * (1 - part)).toFixed(2)}" transform="rotate(-90 24 24)"/>
          <rect x="21" y="1" width="6" height="3" rx="1" class="h6-dial-cap"/>
          <text x="24" y="25" class="h6-dial-num">${n}</text>
        </svg>
        <span class="h6-clock-text"><b>Temps restant</b><span>sur ${content.minutes} min</span></span>
      </div>`;
  };

  /* La conversation (relue en scène, et à gauche de la carte). */
  function thread() {
    const items = [];
    steps.forEach((s, k) => {
      if (!yes(`seen${k}`) && !choiceAt(k)) return;
      items.push(`<li class="h6-step-sep"><span>Étape ${k + 1}</span></li>`);
      if (s.scene) items.push(`<li class="h6-scene">${esc(s.scene)}</li>`);
      if (sayOf(s, k)) items.push(`<li class="d5-msg is-client"><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(sayOf(s, k))}</p></li>`);
      if (s.after) items.push(`<li class="h6-scene">${esc(s.after)}</li>`);
      const c = s.choices[currentAt(k)];
      if (!c) return;
      items.push(`<li class="d5-msg is-you"><p><span>Vous</span>${q(c.text)}</p></li>`);
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
  function feedbackCard(tone, text, { better = '', betterLabel = 'Il valait mieux demander', quoted = true, points = null, button, wait = 0, compact = false }) {
    const verdict = VERDICT[tone];
    const face = esc(core.asset(`../../moteur/assets/illustrations/retours/${verdict.face}.webp`));
    const chip = `<span class="h6-fb-chip">${esc(verdict.title)}</span><span class="sr-only">${esc(verdict.label)}.</span>`;
    const pts = points === null ? '' : `<span class="h6-fb-points">${points > 0 ? '+2' : points < 0 ? '−2' : '0'} sur la jauge</span>`;
    const inner = `<p class="h6-fb-say">${esc(text)}</p>
            ${better ? `<div class="h6-fb-better"><span>${esc(betterLabel)}</span><p>${quoted ? q(better) : esc(better)}</p></div>` : ''}`;
    // Version compacte (à droite de la cliente) : la formatrice en petit, dans l'en-tête.
    if (compact) return `<div class="h6-fb is-compact tone-${tone}"><div class="h6-fb-bubble h6-in" ${delay(wait)}>
            <p class="h6-fb-head"><span class="h6-fb-who"><img src="${face}" alt="" aria-hidden="true">${chip}</span>${pts}</p>
            ${inner}
          </div></div>`;
    // Comme l'exemple : à gauche, un panneau blanc sur toute la hauteur de la
    // scène (la formatrice, « Ceci est une réponse appropriée ») ; à droite,
    // une carte blanche (« Absolument ! », l'explication) ; « Continuer » en bas.
    return `<div class="h6-gfb tone-${tone}">
        <aside class="h6-gfb-side h6-in"><img src="${face}" alt="" aria-hidden="true"><p>${esc(verdict.label)}</p></aside>
        <div class="h6-gfb-main"><div class="h6-gfb-col">
          <div class="h6-card h6-gfb-card h6-in" ${delay(wait + 0.15)}>
            <p class="h6-gfb-title">${esc(verdict.title)}${pts}</p>
            ${inner}
          </div>
          <div class="h6-gfb-foot">${button}</div>
        </div></div>
      </div>`;
  }

  /* Des choix numérotés, face à la personne qui pose la question. */
  /* À gauche, une seule carte : sans rappel, Antoine et la question ; avec
   * un rappel, la cliente qui parle (son visage, sa phrase, son geste), et
   * Antoine en petit dessous. À droite, les questions numérotées. */
  function choiceBlock({ title, ask, order, choices, act, data = '', field = '', recall = '', gesture = '', tried = [] }) {
    const left = recall
      ? `<div class="h6-card h6-who has-recall h6-in">
          <img class="h6-who-face" src="${portrait}" alt="" aria-hidden="true">
          <p class="h6-who-name">${esc(client.name)}</p>
          <p class="h6-recall-quote">${q(recall)}</p>
          ${gesture ? `<p class="h6-recall-gesture">${esc(gesture)}</p>` : ''}
          <p class="h6-who-mini"><img src="${img(client.seller)}" alt="" aria-hidden="true"><span><b>Vous, Antoine</b>${esc(ask)}</span></p>
        </div>`
      : `<div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${img(client.seller)}" alt="" aria-hidden="true"><p class="h6-who-name">Vous, Antoine</p><p class="h6-who-ask">${esc(ask)}</p></div>`;
    return `<div class="h6-choose">
        ${left}
        <div class="h6-options" role="group" aria-label="${esc(title)}">${order.map((id, n) => `<button type="button" class="h6-option h6-in ${tried.includes(id) ? 'is-tried' : ''}" ${delay(0.2 + n * 0.15)} data-act="${act}" data-id="${id}" ${data} ${n === 0 && field ? `data-field="${field}"` : ''} ${tried.includes(id) ? 'disabled aria-disabled="true"' : ''}><span class="h6-option-n">${n + 1}</span><span>${esc(choices[id].intent || choices[id].text)}</span>${tried.includes(id) ? '<span class="h6-cost is-tried">Déjà essayé</span>' : choices[id].minutes ? `<span class="h6-cost">−${choices[id].minutes} min</span>` : ''}</button>`).join('')}</div>
      </div>`;
  }

  /* ── 0 · Le scénario, en scène ───────────────────────────────────────── */
  function scenario() {
    const b = beat();
    if (b.kind === 'trans') return transition(0);
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
      // Avec une image : l'image à gauche sur toute la hauteur, sa phrase en
      // grand à droite (son visage est déjà dans l'image), le geste dessous.
      if (s.picture) body = `<div class="h6-card h6-situation has-picture h6-in">
          ${picture}
          <div class="h6-situation-text">
            <p class="k-label">Étape ${k + 1} sur ${steps.length}</p>
            ${sayOf(s, k) ? `<p class="h6-big-quote h6-in" ${delay(0.35)}><span>${esc(client.name)}</span>${q(sayOf(s, k))}</p>` : ''}
            ${s.after ? `<p class="h6-scene-text h6-in" ${delay(0.8)}>${esc(s.after)}</p>` : ''}
          </div>
        </div>
        <div class="h6-stage-foot">${next('Continuer', 'h6-flag', 1.1, `data-name="seen${k}"`)}</div>`;
      else body = `<div class="h6-card h6-situation h6-in">
          <p class="k-label">Étape ${k + 1} sur ${steps.length}</p>
          ${s.scene ? `<p class="h6-scene-text">${esc(s.scene)}</p>` : ''}
          ${sayOf(s, k) ? said(sayOf(s, k), 0.35) : ''}
          ${s.after ? `<p class="h6-scene-text h6-in" ${delay(0.8)}>${esc(s.after)}</p>` : ''}
          ${s.prompt ? `<p class="h6-scene-text">${esc(s.prompt)}</p>` : ''}
        </div>
        <div class="h6-stage-foot">${next('Continuer', 'h6-flag', sayOf(s, k) ? 1.1 : 0.5, `data-name="seen${k}"`)}</div>`;
    } else if (b.kind === 'choose') {
      // Le rappel, dans la carte de gauche : sa phrase de l'étape, ou à défaut
      // sa dernière réponse ; son geste s'il compte (l'épaule).
      const last = !sayOf(s, k) && k > 0 ? steps[k - 1].choices[currentAt(k - 1)] : null;
      const recall = sayOf(s, k) || (last && last.reply) || '';
      body = choiceBlock({ title: 'Les questions possibles', ask: s.prompt || 'Que lui demandez-vous ?', order: s.order, choices: s.choices, act: 'h6-pick', data: `data-step="${k}"`, field: `c${k}`, recall, gesture: s.after || '', tried: b.retry ? tries(k) : [] });
    } else if (b.kind === 'fb') {
      const id = currentAt(k);
      const c = s.choices[id];
      const ok = id === s.best;
      const tone = ok ? 'ok' : c.points < 0 ? 'ko' : 'mid';
      const first = tries(k).length === 1;
      body = feedbackCard(tone, ok ? s.why : c.note, {
        better: ok ? '' : 'Revenez aux propositions et essayez une autre intention.', betterLabel: 'À vous de rejouer', quoted: false,
        points: first ? c.points : null,
        button: ok ? next(k === steps.length - 1 ? 'Voir la fin de l’entretien' : 'Continuer', 'h6-flag', 0.5, `data-name="ack${k}"`)
          : `<button type="button" class="button primary h6-next h6-in" ${delay(0.5)} data-act="h6-retry" data-step="${k}">${icon('arrowLeft', { size: 18 })}<span>Revenir aux propositions</span></button>`
      });
    } else if (b.kind === 'reply') {
      // Comme l'exemple (« Votre réponse : ») : vous à gauche, votre question
      // à droite, et dessous la réaction de la cliente.
      const c = s.choices[currentAt(k)];
      body = `<div class="h6-choose">
          <div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${img(client.seller)}" alt="" aria-hidden="true"><p class="h6-who-name">Vous, Antoine</p><p class="h6-who-ask">Vous décidez de ${esc(lower(c.intent || ''))}</p></div>
          <div class="h6-card h6-answer h6-in" ${delay(0.15)}>
            <p class="h6-answer-label">Votre réponse :${c.minutes ? `<span class="h6-cost">−${c.minutes} min</span>` : ''}</p>
            <p class="h6-answer-q">${q(c.text)}</p>
            ${c.reply ? `<div class="h6-answer-reply"><img src="${portrait}" alt="" aria-hidden="true"><div><span>${esc(client.name)}</span><div class="h6-typing h6-typing-inline" aria-hidden="true"><span></span><span></span><span></span></div><p class="h6-in" ${delay(1.1)}>${q(c.reply)}</p></div></div>` : ''}
          </div>
        </div>
        <div class="h6-stage-foot">${next('Continuer', 'h6-flag', c.reply ? 1.6 : 0.5, `data-name="rs${k}"`)}</div>`;
    } else if (b.kind === 'end') {
      const end = ending();
      body = `<div class="h6-card h6-end tone-${end.tone} h6-in">
          <p class="k-label">La fin de l’entretien</p>
          <p class="h6-end-title">${esc(end.title)}</p>
          ${said(end.says, 0.3)}
          <p class="h6-end-text">${esc(end.text)}</p>
        </div>
        <div class="h6-stage-foot">${next('Voir mon bilan', 'h6-flag', 0.8, 'data-name="endok"')}</div>`;
    } else {
      body = scenarioBilan();
    }
    const inGame = !['warm', 'warm-fb', 'bilan'].includes(b.kind);
    const isFb = ['fb', 'warm-fb'].includes(b.kind);
    return `<section class="h6-stage ${isFb ? 'is-fb' : ''}" style="--h6-decor:url('${decor}')">
        <div class="h6-stage-top">
          ${inGame ? `<div class="h6-meters">${gaugeBar(gauge())}${clockBadge(left())}</div>` : '<span></span>'}
          ${inGame && played() ? `<details class="h6-replay"><summary>${icon('chat', { size: 16 })}<span>Relire l’échange</span></summary>
            <div class="h6-replay-panel" role="region" aria-label="L’échange jusqu’ici">
              <div class="h6-replay-head"><img src="${portrait}" alt="" aria-hidden="true"><p><b>L’échange jusqu’ici</b><span>${esc(client.name)} · ${played()} étape${played() > 1 ? 's' : ''} jouée${played() > 1 ? 's' : ''}</span></p>
                <button type="button" class="h6-replay-close" data-act="h6-replay-close" aria-label="Fermer">${icon('close', { size: 16 })}</button></div>
              <ol class="d5-thread h6-replay-list">${thread()}</ol>
            </div></details>` : ''}
        </div>
        <div class="h6-stage-body is-${b.kind}">${body}</div>
      </section>
      ${core.errorsBox()}`;
  }

  /* Le bilan de l'entretien, avant la transition : une phrase de synthèse,
   * puis seulement les questions à retenir (la vôtre, et la meilleure). */
  function scenarioBilan() {
    const end = ending();
    const good = steps.filter((s, k) => choiceAt(k) === s.best).length;
    const missed = steps.map((_, k) => k).filter(k => choiceAt(k) && choiceAt(k) !== steps[k].best);
    const n = steps.length;
    const how = good === n ? 'toutes vos premières questions ont' : good === 0 ? 'aucune de vos premières questions n’a' : good === 1 ? 'une seule de vos premières questions a' : `${good} de vos premières questions ont`;
    const items = missed.map(k => {
      const s = steps[k];
      const c = s.choices[choiceAt(k)];
      const b = s.choices[s.best];
      return `<li><span class="h7-bilan-q">Étape ${k + 1} · Vous avez choisi de ${esc(lower(c.intent))} : ${q(c.text)}</span>
          <span class="h7-bilan-a">Il valait mieux <b>${esc(lower(b.intent))}</b> : ${q(b.text)}</span></li>`;
    }).join('');
    return `<div class="h6-card h7-bilan h6-in">
        <p class="k-label">Le bilan de l’étape 1</p>
        <p class="h7-trans-title">Votre découverte avec ${esc(client.name)}</p>
        <p class="h7-trans-why">Sur ${n} étapes, ${how} fait avancer la découverte. Votre jauge finit à ${gauge()} sur 10, et il reste ${left(steps.length)} minutes pour l’essai : ${esc(lower(end.title))}. C’est à partir de ce qu’elle vous a dit que vous construirez la carte de ses besoins.</p>
        ${missed.length ? `<p class="h7-bilan-h">Les questions à retenir</p><ul class="h7-bilan-list">${items}</ul>` : '<p class="h7-trans-why">Vous avez choisi la meilleure question à chaque étape : la carte de ses besoins s’appuiera sur une découverte complète.</p>'}
      </div>
      <div class="h6-stage-foot">${kit.submit('Passer à la suite')}</div>`;
  }

  /* Le bilan des acquis : le score, puis les questions manquées et leur bonne réponse. */
  function quizBilan() {
    const wrong = quiz.map((_, n) => n).filter(n => v(`q${n}`) !== quiz[n].best);
    const score = quizScore();
    return `<div class="h6-card h7-bilan h6-in">
        <p class="k-label">Le bilan de l’étape 2</p>
        <p class="h7-trans-title">Vos réflexes de questionnement</p>
        <p class="h7-trans-why">${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${quiz.length}. ${wrong.length ? 'Voici ce qu’il fallait répondre là où vous vous êtes trompé·e : gardez-le en tête pour construire la carte.' : 'Les bons réflexes sont en place : vous pouvez construire la carte de ses besoins.'}</p>
        ${wrong.length ? `<ul class="h7-bilan-list">${wrong.map(n => `<li><span class="h7-bilan-q">${esc(quiz[n].question)}</span><span class="h7-bilan-a">La bonne réponse : <b>${esc(quiz[n].choices[quiz[n].best].text)}</b> ${esc(quiz[n].choices[quiz[n].best].fb)}</span></li>`).join('')}</ul>` : ''}
      </div>
      <div class="h6-stage-foot">${kit.submit('Passer à la carte des besoins')}</div>`;
  }

  /* La page de transition, sur la carte du chemin (image fournie par
   * l'utilisateur, deux rangées de deux) : les étapes faites cochées, les
   * suivantes estompées, le pion « Vous » qui glisse jusqu'à l'étape où l'on
   * entre. Positions sur l'image, en % : SPOTS le pion (sur le pictogramme),
   * BADGES la coche (sur le numéro), VEILS le voile d'une étape à venir. */
  const SPOTS = [[26.8, 21], [72.1, 21], [26.8, 70.4], [73.9, 70.4]];
  const BADGES = [[10.9, 8.9], [56.6, 8.9], [11.1, 57.5], [56.6, 57.5]];
  const VEILS = [[23.7, 24], [69.4, 24], [23.7, 74.9], [69.4, 74.9]];
  function pathMap(k) {
    const from = SPOTS[Math.max(0, k - 1)];
    const to = SPOTS[k];
    return `<div class="h7-map h9-map h6-in" role="img" aria-label="Le chemin de l’exercice : étape ${k + 1} sur ${STEPS.length}, ${esc(STEPS[k])}.">
        <img src="${img('parcours/heros-chemin.webp')}" alt="">
        ${VEILS.map(([x, y], i) => (i > k ? `<span class="h7-map-veil" style="left:${x}%;top:${y}%"></span>` : '')).join('')}
        ${BADGES.map(([x, y], i) => (i < k ? `<span class="h7-map-done" style="left:${x}%;top:${y}%">${icon('check', { size: 18, strokeWidth: 3.5 })}</span>` : '')).join('')}
        <span class="h7-map-pawn ${k > 0 ? 'is-moving' : 'is-landing'}" style="--fx:${from[0]}%;--fy:${from[1]}%;--tx:${to[0]}%;--ty:${to[1]}%"><b>Vous</b></span>
      </div>`;
  }
  function transition(k) {
    const t = content.transitions[k];
    return `<section class="h6-stage" style="--h6-decor:url('${decor}')">
        <div class="h6-stage-body">
          <div class="h7-way">
            ${pathMap(k)}
            <div class="h6-card h7-trans h6-in" ${delay(0.3)}>
              <p class="k-label">Étape ${k + 1} sur ${STEPS.length}</p>
              <p class="h7-trans-title">${esc(STEPS[k])}</p>
              <p class="h7-trans-done">${icon('check', { size: 16, strokeWidth: 3 })}<span>${esc(t.done)}</span></p>
              <p class="h7-trans-why">${esc(t.why)}</p>
              <p class="h7-trans-todo"><span>À vous</span>${esc(t.todo)}</p>
            </div>
          </div>
          <div class="h6-stage-foot">${next('C’est parti', 'h6-tr', 1.2, `data-k="${k}"`)}</div>
        </div>
      </section>`;
  }

  /* ── 1 · Vos acquis ──────────────────────────────────────────────────── */
  function quizStep() {
    const i = quizAt();
    let body;
    if (i === quiz.length) {
      body = quizBilan();
    } else if (!v(`q${i}`)) {
      body = `<p class="k-label h6-quiz-n">Question ${i + 1} sur ${quiz.length}</p>${choiceBlock({ title: `Question ${i + 1}`, ask: quiz[i].question, order: quiz[i].order, choices: quiz[i].choices, act: 'h6-quiz', data: `data-i="${i}"`, field: `q${i}` })}`;
    } else {
      const id = v(`q${i}`);
      const ok = id === quiz[i].best;
      body = feedbackCard(ok ? 'ok' : 'ko', quiz[i].choices[id].fb, { better: ok ? '' : quiz[i].choices[quiz[i].best].text, betterLabel: 'La bonne réponse', quoted: false, button: next(i === quiz.length - 1 ? 'Voir mon résultat' : 'Question suivante', 'h6-flag', 0.4, `data-name="qa${i}"`) });
    }
    return `<section class="h6-stage ${i < quiz.length && v(`q${i}`) ? 'is-fb' : ''}" style="--h6-decor:url('${decor}')"><div class="h6-stage-body">${body}</div></section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h6-prev', 'Revoir l’entretien') })}`;
  }

  /* Changer d'onglet sans redessiner l'écran (le dialogue à gauche ne bouge
   * pas) : on montre le bon panneau, avec un glissement en fondu, et on met
   * à jour les onglets (onglet courant, coche des rubriques remplies). */
  function showMapPane(control, i) {
    const box = control.closest('.d5-ana-main');
    const panes = box ? Array.from(box.querySelectorAll('.d5-ana-pane')) : [];
    if (!panes[i]) { ex.rebuild(); return; }
    const before = panes.findIndex(p => !p.hidden);
    panes.forEach((p, n) => { p.hidden = n !== i; p.classList.remove('is-entering', 'from-left'); });
    box.querySelectorAll('.d5-floor-tab').forEach((t, n) => {
      t.classList.toggle('is-current', n === i);
      t.setAttribute('aria-selected', String(n === i));
      const full = kit.filled(v(`m_${map[n].id}`));
      t.classList.toggle('is-filled', full);
    });
    const pane = panes[i];
    void pane.offsetWidth;
    pane.classList.add('is-entering');
    if (before > i) pane.classList.add('from-left');
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
            <div class="d5-floor-tabs" role="tablist" aria-label="Les rubriques de la carte">${map.map((r, i) => `<button type="button" class="d5-floor-tab ${i === mapPick ? 'is-current' : ''} ${filled[i] ? 'is-filled' : ''}" role="tab" aria-selected="${i === mapPick}" data-act="h6-map" data-i="${i}"><span class="d5-floor-n">${i + 1}</span><span>${esc(r.tab)}</span><span class="h6-tab-ok">${icon('check', { size: 14, strokeWidth: 3 })}</span></button>`).join('')}</div>
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
    ...map.map(r => `${r.tab} : ${v(`m_${r.id}`) || ''}`)
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
      return `<div class="h6-path-row is-one">
          <p class="h6-path-n">Étape ${k + 1}</p>
          <div class="h6-path-you"><p class="h6-pick ${tone}"><span aria-hidden="true">${ok ? '✓' : c.points < 0 ? '✗' : '–'}</span><span><b>${esc(c.intent || '')}</b><span class="h6-pick-q">${q(c.text || '')}</span></span></p>
            <p class="h6-verdict ${tone}">${verdict}<span>${c.points > 0 ? '+2' : c.points < 0 ? '−2' : '0'} sur la jauge</span></p>
            ${ok ? '' : `<p class="h6-better-line">Il valait mieux <b>${esc(lower(s.choices[s.best].intent))}</b> : ${q(s.choices[s.best].text)}</p>`}</div>
        </div>`;
    }).join('');
    const mapRows = map.map(r => {
      const text = v(`m_${r.id}`);
      return `<div class="fm-rv-row">
          <p class="fm-rv-label">${esc(r.tab)}</p>
          <div class="fm-rv-you">${kit.filled(text) ? `<p class="result-answer-text">${esc(text)}</p>` : '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>'}</div>
          <div class="fm-rv-model"><p>${esc(r.model)}</p></div>
        </div>`;
    }).join('');
    return `<section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Votre partie</span><span class="a4-review-count"><b>${best}</b> / ${steps.length} meilleurs choix · vos acquis : <b>${quizScore()}</b> / ${quiz.length}</span></p>
        <div class="h6-review-end tone-${end.tone}">${gaugeBar(gauge(), 'Votre jauge finale')}<p><strong>${esc(end.title)}.</strong> ${esc(end.text)}</p><p class="h6-time-line">${icon('clock', { size: 16 })} Découverte : ${usedAfter(steps.length)} minutes · reste ${left(steps.length)} minutes pour l’essai (il en faut ${content.testMin}).</p></div>
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
    const body = reviewing ? review() : k > 0 && !yes(`tr${k}`) ? transition(k) : [scenario, quizStep, mapStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page h7-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return stepDone(0) ? [] : [{ key: 'warm', message: 'Jouez l’entretien jusqu’au bout.' }];
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
    'h6-tr': control => { advance(`tr${control.dataset.k}`); window.scrollTo({ top: 0, behavior: 'instant' }); },
    // « Continuer » : le temps présent est lu, on passe au suivant.
    'h6-flag': control => advance(control.dataset.name),
    'h6-warm': control => { if (!v('warm')) advance('warm', control.dataset.id); },
    'h6-pick': control => {
      const k = Number(control.dataset.step);
      const id = control.dataset.id;
      // Le premier choix compte pour la jauge et le chrono ; les suivants servent à comprendre.
      if (!choiceAt(k)) { ex.setValue(`x${k}`, [id]); advance(`c${k}`, id); return; }
      if (!yes(`retry${k}`) || tries(k).includes(id)) return;
      ex.setValue(`x${k}`, [...tries(k), id]);
      ex.setValue(`rs${k}`, false);
      advance(`retry${k}`, false);
    },
    'h6-replay-close': control => { const box = control.closest('details'); if (box) { box.open = false; box.querySelector('summary').focus(); } },
    'h6-retry': control => { const k = Number(control.dataset.step); ex.setValue(`rs${k}`, false); advance(`retry${k}`, true); },
    'h6-quiz': control => { const i = Number(control.dataset.i); if (!v(`q${i}`)) advance(`q${i}`, control.dataset.id); },
    'h6-map': control => { mapPick = Number(control.dataset.i); showMapPane(control, mapPick); },
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

  /* « Relire l'échange » : à l'ouverture, on descend au dernier message ; un
   * clic à côté ou la touche Échap referme le panneau. */
  document.addEventListener('toggle', event => {
    const box = event.target;
    if (!box.matches || !box.matches('.h6-replay') || !box.open) return;
    const list = box.querySelector('.h6-replay-list');
    if (list) list.scrollTop = list.scrollHeight;
  }, true);
  document.addEventListener('click', event => {
    document.querySelectorAll('.h6-replay[open]').forEach(box => { if (!box.contains(event.target)) box.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.h6-replay[open]').forEach(box => { box.open = false; box.querySelector('summary').focus(); });
  });

  ex.mount(KEY, { screen, validate, feedback, intercept, compactFeedback: true });
})();
