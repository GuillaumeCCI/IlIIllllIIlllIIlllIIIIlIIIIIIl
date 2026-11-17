/* S6 6.2 · Le coach (fiche M1.2.2, synthèse optionnelle, option 1), mis en
 * scène comme 6.1 : décor flouté, une carte à la fois, retour de la
 * formatrice après chaque choix.
 *
 * Six étapes :
 *   0. L'entretien : le choix du dossier (A Camille / B Karim) ; le message
 *      du collègue et la mission en quatre points (annoncée AVANT toute
 *      question) ; la règle d'or du coach (accroche) ; l'entretien lu EN
 *      ENTIER ; puis les dix moments M1-M10, chacun en deux temps : votre
 *      diagnostic (l'entretien à gauche, le moment surligné, l'aide-mémoire
 *      des types de questions à ouvrir), puis le retour. Le premier diagnostic compte ;
 *      après un diagnostic moins juste, on revient aux propositions. Un
 *      indice pour les cinq premiers moments, plus rien ensuite.
 *   1. Les moments décisifs : trois moments à choisir parmi dix.
 *   2. Vos réécritures : pour chaque moment décisif attendu, ce qui s'est
 *      passé et votre question de remplacement (indice, puis indice court,
 *      puis aucun) ; des repères automatiques, puis le corrigé.
 *   3. Ce qu'il fallait savoir : classer sept informations, puis ordonner
 *      les priorités.
 *   4. La fiche de coaching : trois rubriques rédigées (les deux autres
 *      viennent des étapes 2 et 3).
 *   5. La grille Oui / Non. Puis le corrigé.
 *
 * Valeurs : `dos` (A ou B), `warm`, `wok`, `intro` ; pour le moment k :
 * `seen<k>`, `c<k>` (premier diagnostic), `x<k>` (essais), `retry<k>`,
 * `ack<k>` ; `dm` (les 3 moments), `dmok` ; `rw<j>_why`, `rw<j>_q`,
 * `rw<j>_t`, `rw<j>_ok` ; `sk_<id>`, `sok` ; `rk` (ordre), `rkok` ;
 * `f_<rubrique>` ; `self<i>` ; `at`.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const KEY = 's6-6.2';
  const content = window.ATELIER_S6['6.2'];
  const { warmup, fiche, types } = content;
  const STEPS = ['L’entretien', 'Les moments décisifs', 'Vos réécritures', 'Ce qu’il fallait savoir', 'La fiche de coaching', 'La grille'];
  const LAST = STEPS.length - 1;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];
  const KINDS = [{ id: 'explicite', label: 'Besoin explicite' }, { id: 'implicite', label: 'Besoin implicite' }, { id: 'motivation', label: 'Motivation' }];
  const v = name => ex.value(name);
  const yes = name => v(name) === true;
  const D = () => content.dossiers[v('dos')] || null;
  const moments = () => (D() ? D().moments : []);

  /* ── L'entretien : les diagnostics ───────────────────────────────────── */
  const choiceAt = k => v(`c${k}`) || null;
  const tries = k => { const x = v(`x${k}`); return Array.isArray(x) && x.length ? x : (choiceAt(k) ? [choiceAt(k)] : []); };
  const currentAt = k => { const t = tries(k); return t[t.length - 1] || null; };
  const played = () => moments().filter((_, k) => choiceAt(k)).length;
  const rightFirst = () => moments().filter((m, k) => choiceAt(k) === m.best).length;
  const toneOf = (m, id) => (id === m.best ? 'ok' : (m.choices[id] || {}).tone || 'mid');
  const interviewDone = () => Boolean(D()) && moments().every((_, k) => yes(`ack${k}`));

  function beat() {
    // D'abord la mission en clair, puis la règle d'or, puis l'entretien lu
    // en entier ; ensuite seulement l'analyse, moment par moment.
    if (!D()) return { kind: 'pick' };
    if (!yes('intro')) return { kind: 'intro' };
    if (!v('warm')) return { kind: 'warm' };
    if (!yes('wok')) return { kind: 'warm-fb' };
    if (!yes('read')) return { kind: 'read' };
    const k = moments().findIndex((_, i) => !yes(`ack${i}`));
    if (k === -1) return { kind: 'end' };
    if (!choiceAt(k)) return { kind: 'choose', k };
    if (yes(`retry${k}`)) return { kind: 'choose', k, retry: true };
    return { kind: 'fb', k };
  }

  /* ── Les moments décisifs ────────────────────────────────────────────── */
  const picked = () => (Array.isArray(v('dm')) ? v('dm') : []);
  const dmTone = n => (D().decisive.expected.includes(n) ? 'ok' : D().decisive.acceptable.includes(n) ? 'mid' : 'ko');
  const dmScore = () => picked().filter(n => D().decisive.expected.includes(n)).length;

  /* ── Les réécritures : des repères automatiques ──────────────────────── */
  const norm = text => String(text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function checks(j) {
    const r = D().rewrites[j];
    const text = String(v(`rw${j}_q`) || '').trim();
    const type = v(`rw${j}_t`);
    const out = [];
    out.push(/\?\s*»?$/.test(text)
      ? { ok: true, text: 'C’est bien une question.' }
      : { ok: false, text: 'Terminez par un point d’interrogation : votre collègue doit pouvoir la poser telle quelle.' });
    const product = content.productWords.find(word => norm(` ${text} `).includes(norm(word)));
    out.push(product
      ? { ok: false, text: `Elle parle d’un produit ou d’une offre (« ${product.trim()} ») : une question de découverte n’en propose aucun.` }
      : { ok: true, text: 'Elle ne propose aucun produit.' });
    const label = id => (types.find(t => t.id === id) || {}).label || '';
    out.push(r.type.includes(type)
      ? { ok: true, text: `Le type choisi (${label(type).toLowerCase()}) est celui du corrigé.` }
      : { ok: false, text: `Le corrigé propose plutôt : ${r.type.map(t => label(t).toLowerCase()).join(' ou ')}.` });
    if (type === 'ouverte' && /^(est-ce|vous |avez|etes|voulez|aimeriez|pensez|preferez|c'est|c’est|ce n)/.test(norm(text))) {
      out.push({ ok: false, text: 'Elle commence comme une question fermée (« Est-ce que… », « Vous… ? ») : vérifiez qu’elle laisse vraiment parler.' });
    }
    return out;
  }
  const rwAt = () => { const j = (D() ? D().rewrites : []).findIndex((_, i) => !yes(`rw${i}_ok`)); return j; };

  /* ── Ce qu'il fallait savoir ─────────────────────────────────────────── */
  const rankNow = () => (Array.isArray(v('rk')) ? v('rk') : []);
  const sortScore = () => D().sort.filter(c => v(`sk_${c.id}`) === c.kind).length;
  const rankRight = () => D().rank.items.every((it, i) => rankNow()[i] === it.id);

  const stepDone = k => {
    if (!D()) return false;
    if (k === 0) return interviewDone();
    if (k === 1) return yes('dmok');
    if (k === 2) return D().rewrites.every((_, j) => yes(`rw${j}_ok`));
    if (k === 3) return yes('sok') && yes('rkok');
    if (k === 4) return fiche.every(r => kit.filled(v(`f_${r.id}`)));
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
  const advance = (name, value = true) => { ex.setValue(name, value); ex.changed(); ex.rebuild(); };

  function progress(k) {
    const arrow = (i, dir) => {
      const ok = i >= 0 && i <= LAST && reachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="h7-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEPS.map((label, i) => `<button type="button" class="k-progress-seg ${stepDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="h7-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${arrow(k - 1, 'prev')}<span class="k-progress-label">${esc(STEPS[k])}</span><strong>${k + 1} / ${STEPS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${arrow(k + 1, 'next')}</p>`;
  }

  /* ── Petits éléments ─────────────────────────────────────────────────── */
  const img = path => esc(core.asset(`assets/illustrations/${path}`));
  const q = text => `«&nbsp;${esc(text)}&nbsp;»`;
  const delay = t => `style="animation-delay:${t.toFixed(2)}s"`;
  const next = (label, act, t = 0, extra = '') => `<button type="button" class="button primary h6-next h6-in" ${delay(t)} data-act="${act}" ${extra}><span>${esc(label)}</span>${icon('arrowRight', { size: 18 })}</button>`;
  const person = who => D().people[who];
  const sellerFace = () => img(D().seller.face);
  const decorOf = () => (D() ? img(D().decor) : img('dialogues/magasin.webp'));

  const GAUGE_TIP = 'Le nombre de moments que vous avez bien analysés du premier coup. Après un diagnostic moins juste, vous pouvez réessayer, mais seul le premier compte.';
  const gaugeBar = value => `<div class="h6-gauge has-tip" tabindex="0" data-tip="${esc(GAUGE_TIP)}" role="img" aria-label="Diagnostics justes : ${value} sur ${moments().length}. ${esc(GAUGE_TIP)}">
      <span class="h6-gauge-label">Diagnostics justes</span>
      <span class="h6-gauge-track"><span class="h6-gauge-fill tone-${value >= 8 ? 'ok' : value >= 5 ? 'mid' : 'ko'}" style="width:${(value / Math.max(1, moments().length)) * 100}%"></span></span>
      <strong>${value} / ${moments().length}</strong>
    </div>`;

  /* Les répliques d'un moment : la question du vendeur, le geste, le client. */
  /* L'entretien entier. Avec `current`, le moment analysé est surligné et
   * les suivants sont estompés. */
  // Une réplique façon dialogue : le visage, le nom (et le repère M1…), la phrase.
  const line = (cls, face, name, text, tag = '') => `<div class="h7-line ${cls}"><img src="${face}" alt="" aria-hidden="true"><div class="h7-line-body"><p class="h7-who">${esc(name)}${tag}</p><p class="h7-said">${q(text)}</p></div></div>`;
  const lines = (m, now = false) => line('is-seller', sellerFace(), D().seller.name, m.q, `<span class="h7-mn">${esc(m.n)}</span>${now ? '<span class="h7-now">Le moment à analyser</span>' : ''}`)
    + (m.scene ? `<p class="h7-gesture">${esc(m.scene)}</p>` : '')
    + m.replies.map(r => line('is-client', img(person(r.who).face), person(r.who).name, r.text)).join('');
  function thread(current = -1) {
    return moments().map((m, k) => {
      const cls = current < 0 ? '' : k === current ? 'is-current' : k > current ? 'is-later' : 'is-before';
      return `<li class="h7-tr-moment ${cls}">${lines(m, k === current)}</li>`;
    }).join('');
  }
  /* À la lecture, chaque moment apparaît quand on descend jusqu'à lui
   * (fondu et léger glissement) ; sans cette possibilité, tout s'affiche. */
  const revealOnScroll = () => setTimeout(() => {
    const box = document.querySelector('.h7-tr.h7-reveal');
    if (!box) return;
    const items = box.querySelectorAll('.h7-tr-moment');
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || typeof IntersectionObserver !== 'function') { items.forEach(el => el.classList.add('is-shown')); return; }
    const watch = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-shown'); watch.unobserve(entry.target); }
    }), { root: box, threshold: 0.2 });
    items.forEach(el => watch.observe(el));
  }, 0);
  // Fait défiler l'entretien jusqu'au moment analysé, après l'affichage.
  const scrollTranscript = () => setTimeout(() => {
    document.querySelectorAll('.h7-tr').forEach(box => {
      const cur = box.querySelector('.is-current');
      if (cur) box.scrollTop = Math.max(0, cur.offsetTop - 12);
    });
  }, 0);

  /* L'aide-mémoire : les types de questions et l'entonnoir. */
  const memoBox = () => `<details class="h7-memo"><summary>${icon('document', { size: 16 })}<span>Aide-mémoire : les types de questions</span></summary>
      <dl>${content.memo.map(x => `<div><dt>${esc(x.term)}</dt><dd>${esc(x.text)} <i>${q(x.ex)}</i></dd></div>`).join('')}</dl>
      <p class="h7-memo-funnel"><b>L’entonnoir :</b> ${content.funnel.map((f, i) => `<span>${i + 1}. ${esc(f)}</span>`).join('')}</p>
    </details>`;

  /* Le retour de la formatrice (comme 6.1). */
  const VERDICT = {
    ok: { face: 'formatrice-oui', label: 'Ceci est une réponse appropriée', title: 'Absolument !' },
    mid: { face: 'formatrice-presque', label: 'Ce n’est pas tout à fait la réponse attendue', title: 'Pas tout à fait…' },
    ko: { face: 'formatrice-attention', label: 'Ceci n’est pas une réponse appropriée', title: 'À éviter…' }
  };
  function feedbackCard(tone, text, { better = '', betterLabel = '', button, wait = 0, tag = '' }) {
    const verdict = VERDICT[tone];
    const face = esc(core.asset(`../../moteur/assets/illustrations/retours/${verdict.face}.webp`));
    return `<div class="h6-gfb tone-${tone}">
        <aside class="h6-gfb-side h6-in"><img src="${face}" alt="" aria-hidden="true"><p>${esc(verdict.label)}</p></aside>
        <div class="h6-gfb-main"><div class="h6-gfb-col">
          <div class="h6-card h6-gfb-card h6-in" ${delay(wait + 0.15)}>
            <p class="h6-gfb-title">${esc(verdict.title)}${tag ? `<span class="h6-fb-points">${esc(tag)}</span>` : ''}</p>
            <p class="h6-fb-say">${esc(text)}</p>
            ${better ? `<div class="h6-fb-better"><span>${esc(betterLabel)}</span><p>${esc(better)}</p></div>` : ''}
          </div>
          <div class="h6-gfb-foot">${button}</div>
        </div></div>
      </div>`;
  }

  /* Des choix numérotés, à droite d'une carte (comme 6.1). */
  function options({ title, order, choices, act, data = '', tried = [] }) {
    return `<div class="h6-options" role="group" aria-label="${esc(title)}">${order.map((id, n) => `<button type="button" class="h6-option h6-in ${tried.includes(id) ? 'is-tried' : ''}" ${delay(0.2 + n * 0.15)} data-act="${act}" data-id="${id}" ${data} ${tried.includes(id) ? 'disabled aria-disabled="true"' : ''}><span class="h6-option-n">${n + 1}</span><span>${esc(choices[id].text)}</span>${tried.includes(id) ? '<span class="h6-cost is-tried">Déjà essayé</span>' : ''}</button>`).join('')}</div>`;
  }

  /* ── 0 · L'entretien ─────────────────────────────────────────────────── */
  function dossierCard(d, n) {
    const faces = [d.seller.face, ...Object.values(d.people).map(p => p.face)];
    return `<button type="button" class="h7-dossier h6-in" ${delay(0.15 + n * 0.15)} data-act="h7-dossier" data-id="${d.id}">
        <span class="h7-dossier-faces" aria-hidden="true">${faces.map(f => `<img src="${img(f)}" alt="">`).join('')}</span>
        <span class="h7-dossier-tab">${esc(d.tab)}</span>
        <b class="h7-dossier-title">${esc(d.title)}</b>
        <span class="h7-dossier-place">${esc(d.place)}</span>
        <span class="h7-dossier-text">${esc(d.context)}</span>
      </button>`;
  }

  function scenario() {
    const b = beat();
    const k = b.k;
    const m = k !== undefined ? moments()[k] : null;
    let body = '';
    if (b.kind === 'pick') {
      body = `<div class="h6-card h6-banner is-text h6-in"><div><p class="k-label">Avant de commencer</p><p>Un collègue vous confie la transcription de son deuxième rendez-vous et vous demande de l’aide. Choisissez un dossier : vous pourrez faire l’autre ensuite.</p></div></div>
        <div class="h7-dossiers">${Object.values(content.dossiers).map(dossierCard).join('')}</div>`;
    } else if (b.kind === 'intro') {
      // Le message du collègue, puis ce que vous allez faire, en clair.
      body = `<div class="h6-choose">
          <div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${sellerFace()}" alt="" aria-hidden="true"><p class="h6-who-name">${esc(D().seller.name)}</p><p class="h6-who-role">${esc(D().seller.role)}</p></div>
          <div class="h6-card h6-answer h7-message h6-in" ${delay(0.15)}>
            <p class="h6-answer-label">Son message :</p>
            <p class="h6-answer-q">${q(D().ask)}</p>
            <p class="h7-context">${esc(D().context)}</p>
            <p class="h7-mission-h">Ce que vous allez faire</p>
            <ol class="h7-mission">${content.mission.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
          </div>
        </div>
        <div class="h6-stage-foot">${next('C’est parti', 'h6-flag', 0.6, 'data-name="intro"')}</div>`;
    } else if (b.kind === 'warm') {
      body = `<div class="h6-choose">
          <div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${sellerFace()}" alt="" aria-hidden="true"><p class="h6-who-name">Avant de lire son entretien</p><p class="h6-who-ask">${esc(warmup.question)}</p></div>
          ${options({ title: 'Question d’accroche', order: warmup.order, choices: warmup.choices, act: 'h7-warm' })}
        </div>`;
    } else if (b.kind === 'warm-fb') {
      const id = v('warm');
      const ok = id === warmup.best;
      body = feedbackCard(ok ? 'ok' : 'mid', warmup.choices[id].fb, { better: ok ? '' : warmup.choices[warmup.best].text, betterLabel: 'La réponse attendue', button: next('Lire son entretien', 'h6-flag', 0.4, 'data-name="wok"') });
    } else if (b.kind === 'read') {
      // L'entretien en entier, à lire avant toute analyse.
      const names = Object.values(D().people).map(p => p.name).join(' et ');
      revealOnScroll();
      body = `<div class="h6-card h7-read h6-in">
          <p class="k-label">Étape 1 · Lisez l’entretien en entier</p>
          <p class="h7-read-title">${esc(D().seller.name)} avec ${esc(names)}</p>
          <p class="h7-context">${esc(D().context)} Les questions de ${esc(D().seller.name)} sont numérotées de M1 à M10.</p>
          <ol class="h7-tr is-read h7-reveal">${thread()}</ol>
          <p class="h7-read-note">Faites défiler pour lire la suite. Vous l’aurez sous les yeux pendant toute l’analyse.</p>
        </div>
        <div class="h6-stage-foot">${next('J’ai lu, je commence l’analyse', 'h6-flag', 0.4, 'data-name="read"')}</div>`;
    } else if (b.kind === 'choose') {
      // L'entretien à gauche (le moment surligné), la question et les
      // diagnostics à droite. Un indice pour M1 à M5, plus rien ensuite.
      scrollTranscript();
      body = `<div class="h7-analyse">
          <div class="h6-card h7-tr-card h6-in"><p class="k-label">L’entretien de ${esc(D().seller.name)}</p><ol class="h7-tr">${thread(k)}</ol></div>
          <div class="h7-analyse-main">
            <div class="h6-card h7-question h6-in" ${delay(0.1)}>
              <p class="k-label">Étape 2 · Analysez · moment ${k + 1} sur ${moments().length}</p>
              <p class="h7-ask">${esc(m.n)} : avec cette question, qu’a fait ${esc(D().seller.name)} ? Et qu’est-ce que ça a produit ?</p>
              ${m.hint ? `<p class="h7-hint">${icon('thought', { size: 16 })}<span>${esc(m.hint)}</span></p>` : ''}
              ${memoBox()}
            </div>
            ${options({ title: 'Les diagnostics possibles', order: m.order, choices: m.choices, act: 'h7-pick', data: `data-step="${k}"`, tried: b.retry ? tries(k) : [] })}
          </div>
        </div>`;
    } else if (b.kind === 'fb') {
      const id = currentAt(k);
      const tone = toneOf(m, id);
      const ok = tone === 'ok';
      const first = tries(k).length === 1;
      body = feedbackCard(tone, ok ? m.why : m.choices[id].note, {
        better: ok ? '' : 'Revenez aux propositions et essayez un autre diagnostic.', betterLabel: 'À vous de rejouer',
        tag: first ? (ok ? 'Juste du premier coup' : '') : '',
        button: ok ? next(k === moments().length - 1 ? 'Voir mon bilan' : 'Moment suivant', 'h6-flag', 0.5, `data-name="ack${k}"`)
          : `<button type="button" class="button primary h6-next h6-in" ${delay(0.5)} data-act="h7-retry" data-step="${k}">${icon('arrowLeft', { size: 18 })}<span>Revenir aux propositions</span></button>`
      });
    } else {
      const n = rightFirst();
      body = `<div class="h6-card h6-end tone-${n >= 8 ? 'ok' : n >= 5 ? 'mid' : 'ko'} h6-in">
          <p class="k-label">L’entretien est analysé</p>
          <p class="h6-end-title">${n} diagnostic${n > 1 ? 's' : ''} juste${n > 1 ? 's' : ''} du premier coup, sur ${moments().length}</p>
          <p class="h6-end-text">Vous avez relu tout l’entretien de ${esc(D().seller.name)}. Place aux moments qui ont tout changé.</p>
        </div>
        <div class="h6-stage-foot">${kit.submit('Choisir les moments décisifs')}</div>`;
    }
    const inGame = ['choose', 'fb', 'end'].includes(b.kind);
    const isFb = ['fb', 'warm-fb'].includes(b.kind);
    return `<section class="h6-stage ${isFb ? 'is-fb' : ''}" style="--h6-decor:url('${decorOf()}')">
        <div class="h6-stage-top">
          ${inGame ? `<div class="h6-meters">${gaugeBar(rightFirst())}</div>` : '<span></span>'}
          ${['fb', 'end'].includes(b.kind) ? `<details class="h6-replay"><summary>${icon('chat', { size: 16 })}<span>Relire l’entretien</span></summary>
            <div class="h6-replay-panel" role="region" aria-label="L’entretien">
              <div class="h6-replay-head"><img src="${sellerFace()}" alt="" aria-hidden="true"><p><b>L’entretien de ${esc(D().seller.name)}</b><span>${esc(Object.values(D().people).map(p => p.name).join(' et '))}</span></p>
                <button type="button" class="h6-replay-close" data-act="h7-replay-close" aria-label="Fermer">${icon('close', { size: 16 })}</button></div>
              <ol class="d5-thread h6-replay-list">${thread()}</ol>
            </div></details>` : ''}
        </div>
        <div class="h6-stage-body is-${b.kind}">${body}</div>
      </section>
      ${core.errorsBox()}`;
  }

  /* ── 1 · Les moments décisifs ────────────────────────────────────────── */
  function decisiveStep() {
    const done = yes('dmok');
    const chosen = picked();
    const cards = moments().map((m, k) => {
      const on = chosen.includes(m.n);
      const tone = done ? dmTone(m.n) : '';
      const mark = done && (on || tone === 'ok') ? `<span class="h7-dm-mark tone-${on ? tone : 'miss'}">${on ? (tone === 'ok' ? `${icon('check', { size: 14, strokeWidth: 3 })}Décisif` : tone === 'mid' ? 'Se défend' : `${icon('close', { size: 14, strokeWidth: 3 })}Pas décisif`) : 'À choisir'}</span>` : '';
      return `<button type="button" class="h7-dm ${on ? 'is-on' : ''} ${done ? 'is-done' : ''}" data-act="h7-dm" data-n="${m.n}" aria-pressed="${on}" ${done ? 'disabled' : ''}>
          <span class="h7-dm-n">${esc(m.n)}</span>
          <span class="h7-dm-q">${q(m.q)}</span>
          <span class="h7-dm-diag">${esc(m.choices[m.best].text.split(' : ')[0])}</span>
          ${mark}
          ${done && (on || tone === 'ok') && D().decisive.why[m.n] ? `<span class="h7-dm-why">${esc(D().decisive.why[m.n])}</span>` : ''}
        </button>`;
    }).join('');
    const score = dmScore();
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Les 3 moments décisifs</p>
        <p class="a4-role">Choisissez les trois moments où le questionnement de ${esc(D().seller.name)} a ouvert ou fermé la découverte. Pas les plus visibles : ceux qui ont le plus pesé.</p>
        <p class="h7-count" aria-live="polite">${done ? `<b>${score}</b> / 3 moments attendus` : `<b>${chosen.length}</b> / 3 choisis`}</p>
        <div class="h7-dms">${cards}</div>
        ${done ? `<div class="h7-verdict tone-${score === 3 ? 'ok' : score >= 2 ? 'mid' : 'ko'}"><p>${esc(D().decisive.text)}</p></div>`
          : `<div class="h7-actions">${kit.act('h7-dm-check', `${icon('check', { size: 18 })}<span>Valider mes 3 moments</span>`, 'primary', chosen.length === 3 ? '' : 'disabled')}</div>`}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir l’entretien'), right: done ? kit.submit('Réécrire les moments décisifs') : '' })}`;
  }

  /* ── 2 · Vos réécritures ─────────────────────────────────────────────── */
  let rwPick = null;
  function rewriteStep() {
    const rws = D().rewrites;
    const free = rwAt();
    const j = rwPick !== null ? rwPick : (free === -1 ? 0 : free);
    const r = rws[j];
    const k = moments().findIndex(m => m.n === r.n);
    const m = moments()[k];
    const ok = yes(`rw${j}_ok`);
    // L'aide se retire : un indice, puis un indice plus court, puis aucun (contenu).
    const hint = r.hint || '';
    const tabs = rws.map((x, i) => `<button type="button" class="d5-floor-tab ${i === j ? 'is-current' : ''} ${yes(`rw${i}_ok`) ? 'is-filled' : ''}" role="tab" aria-selected="${i === j}" data-act="h7-rw" data-i="${i}" ${i > 0 && !yes(`rw${i - 1}_ok`) ? 'disabled' : ''}><span class="d5-floor-n">${yes(`rw${i}_ok`) ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(x.n)}</span></button>`).join('');
    const typeChips = types.map(t => `<button type="button" class="h7-chip ${v(`rw${j}_t`) === t.id ? 'is-on' : ''}" data-act="h7-type" data-j="${j}" data-id="${t.id}" aria-pressed="${v(`rw${j}_t`) === t.id}" ${ok ? 'disabled' : ''}>${esc(t.label)}</button>`).join('');
    const result = ok ? `<div class="h7-checks"><p class="k-label">Les repères</p><ul>${checks(j).map(c => `<li class="${c.ok ? 'is-ok' : 'is-ko'}"><span aria-hidden="true">${icon(c.ok ? 'check' : 'thought', { size: 15, strokeWidth: 2.5 })}</span>${esc(c.text)}</li>`).join('')}</ul></div>
        <div class="h7-model"><p class="k-label">Le corrigé</p><p class="h7-model-what">${esc(r.what)}</p><p class="h7-model-q">${q(r.model)}</p><p class="h7-model-type">Type : ${esc(r.type.map(t => types.find(x => x.id === t).label.toLowerCase()).join(' ou '))}</p></div>
        <div class="d5-floor-nav"><span></span>${j < rws.length - 1 ? `<button type="button" class="button secondary" data-act="h7-rw" data-i="${j + 1}"><span>Moment suivant</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>`
      : `<div class="h7-actions">${kit.act('h7-rw-check', `${icon('check', { size: 18 })}<span>Comparer avec le corrigé</span>`, 'primary', `data-j="${j}"`)}</div>`;
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Vos réécritures</p>
        <p class="a4-role">Pour chacun des trois moments décisifs : ce qui s’est passé, puis la question que vous auriez posée à la place, et son type.</p>
        <div class="d5-floor-tabs" role="tablist" aria-label="Les moments à réécrire">${tabs}</div>
        <div class="h7-rw">
          <div class="h7-rw-moment">
            <div class="h7-tr-one">${lines(m)}</div>
            ${hint ? `<p class="h7-hint">${icon('thought', { size: 16 })}<span>${esc(hint)}</span></p>` : '<p class="h7-hint is-none">Sans indice, cette fois.</p>'}
          </div>
          <div class="h7-rw-main">
            <div class="fm-field"><p class="fm-label">Ce qui s’est passé, et pourquoi c’est décisif</p>${ex.field(`rw${j}_why`, 'Ce qui s’est passé', { placeholder: 'Il/elle… ; du coup, le client…', max: 400, rows: 3, hideLabel: true })}</div>
            <div class="fm-field"><p class="fm-label">La question que vous auriez posée</p>${ex.field(`rw${j}_q`, 'Votre question', { placeholder: 'Qu’est-ce que… ?', max: 300, type: 'input', hideLabel: true })}</div>
            <div class="fm-field"><p class="fm-label">Son type</p><div class="h7-chips" role="group" aria-label="Le type de votre question">${typeChips}</div>${memoBox()}</div>
            ${result}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir mes moments'), right: stepDone(2) ? kit.submit('Ce qu’il fallait savoir') : '' })}`;
  }

  /* ── 3 · Ce qu'il fallait savoir ─────────────────────────────────────── */
  function knowStep() {
    const d = D();
    const sorted = yes('sok');
    const rows = d.sort.map(c => {
      const mine = v(`sk_${c.id}`);
      const good = mine === c.kind;
      return `<div class="h7-sort-row ${sorted ? (good ? 'is-ok' : 'is-ko') : ''}">
          <p class="h7-sort-text">${esc(c.text)}</p>
          <div class="h7-chips" role="group" aria-label="${esc(c.text)}">${KINDS.map(kd => `<button type="button" class="h7-chip ${mine === kd.id ? 'is-on' : ''} ${sorted && kd.id === c.kind ? 'is-answer' : ''}" data-act="h7-sort" data-id="${c.id}" data-kind="${kd.id}" aria-pressed="${mine === kd.id}" ${sorted ? 'disabled' : ''}>${esc(kd.label)}</button>`).join('')}</div>
          ${sorted ? `<p class="h7-sort-why">${icon(good ? 'check' : 'close', { size: 14, strokeWidth: 3 })}<span>${esc(c.why)}</span></p>` : ''}
        </div>`;
    }).join('');
    const allSorted = d.sort.every(c => v(`sk_${c.id}`));
    const order = rankNow();
    const ranked = yes('rkok');
    const rankBox = sorted ? `<div class="h7-rank">
        <p class="fm-label">Puis la hiérarchie : de la priorité au secondaire</p>
        <p class="fm-sub">Cliquez les trois besoins dans l’ordre de ce qui compte le plus pour le client.</p>
        <div class="h7-rank-pool">${d.rank.show.map(id => { const it = d.rank.items.find(x => x.id === id); const pos = order.indexOf(id); return `<button type="button" class="h7-rank-item ${pos !== -1 ? 'is-on' : ''}" data-act="h7-rank" data-id="${id}" ${ranked || pos !== -1 ? 'disabled' : ''}><span class="h7-rank-n">${pos !== -1 ? pos + 1 : ''}</span><span>${esc(it.text)}</span></button>`; }).join('')}</div>
        ${ranked ? `<div class="h7-verdict tone-${rankRight() ? 'ok' : 'mid'}"><p><b>${rankRight() ? 'Absolument !' : 'Pas tout à fait…'}</b> ${esc(d.rank.why)}</p>${rankRight() ? '' : `<p class="h7-rank-model">L’ordre attendu : ${d.rank.items.map((it, i) => `${i + 1}. ${esc(it.text)}`).join(' · ')}</p>`}</div>`
          : `<div class="h7-actions">${order.length ? kit.act('h7-rank-reset', `${icon('arrowLeft', { size: 16 })}<span>Recommencer</span>`, 'secondary small') : ''}${kit.act('h7-rank-check', `${icon('check', { size: 18 })}<span>Vérifier l’ordre</span>`, 'primary', order.length === d.rank.items.length ? '' : 'disabled')}</div>`}
      </div>` : '';
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Ce que ${esc(d.seller.name)} aurait dû repartir en sachant</p>
        <p class="a4-role">Classez chaque information : un besoin que le client a exprimé, un besoin qu’il n’a pas dit, ou une motivation.</p>
        ${sorted ? `<p class="h7-count"><b>${sortScore()}</b> / ${d.sort.length} bien classées</p>` : ''}
        <div class="h7-sort">${rows}</div>
        ${sorted ? '' : `<div class="h7-actions">${kit.act('h7-sort-check', `${icon('check', { size: 18 })}<span>Vérifier mon classement</span>`, 'primary', allSorted ? '' : 'disabled')}</div>`}
        ${rankBox}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir mes réécritures'), right: stepDone(3) ? kit.submit('Rédiger ma fiche de coaching') : '' })}`;
  }

  /* ── 4 · La fiche de coaching ────────────────────────────────────────── */
  const typeLabel = id => ((types.find(t => t.id === id) || {}).label || '').toLowerCase();
  const kindList = kind => D().sort.filter(c => v(`sk_${c.id}`) === kind).map(c => c.text);
  const rankText = () => rankNow().map((id, i) => `${i + 1}. ${D().rank.items.find(x => x.id === id).text}`).join(' · ');
  let fichePick = 0;
  function ficheStep() {
    const filled = fiche.map(r => kit.filled(v(`f_${r.id}`)));
    const pane = (i, r) => `<div class="d5-ana-pane" ${i === fichePick ? '' : 'hidden'}>
        <div class="fm-field"><p class="fm-label">${esc(r.label)}</p><p class="fm-sub">${esc(r.sub)}</p>
          ${ex.field(`f_${r.id}`, r.label, { placeholder: r.placeholder, max: 900, rows: 6, hideLabel: true })}</div>
        <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="h7-fiche" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Rubrique précédente</span></button>` : '<span></span>'}${i < fiche.length - 1 ? `<button type="button" class="button secondary" data-act="h7-fiche" data-i="${i + 1}"><span>Rubrique suivante</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>
      </div>`;
    const built = `<div class="h7-built">
        <p class="k-label">Déjà dans votre fiche</p>
        <p class="h7-built-h">3 · Mes 3 moments décisifs</p>
        <ul>${D().rewrites.map((r, j) => `<li><b>${esc(r.n)}</b> · ${esc(v(`rw${j}_why`) || '')} <span class="h7-built-q">→ ${q(v(`rw${j}_q`) || '')} (${esc(typeLabel(v(`rw${j}_t`)))})</span></li>`).join('')}</ul>
        <p class="h7-built-h">4 · Ce qu’il aurait dû repartir en sachant</p>
        <ul><li><b>Explicites</b> : ${esc(kindList('explicite').join(' ; ') || 'aucun')}</li><li><b>Implicites</b> : ${esc(kindList('implicite').join(' ; ') || 'aucun')}</li><li><b>Motivations</b> : ${esc(kindList('motivation').join(' ; ') || 'aucune')}</li><li><b>Hiérarchie</b> : ${esc(rankText())}</li></ul>
        <details class="h7-transcript"><summary>${icon('chat', { size: 16 })}<span>Relire l’entretien</span></summary><ol class="h7-tr">${thread()}</ol></details>
      </div>`;
    return `<section class="k-panel d5-panel h6-panel h7-panel">
        <p class="k-label">Ma fiche de coaching pour ${esc(D().seller.name)}</p>
        <p class="h7-rule">${icon('check', { size: 16 })}<span>${esc(content.rule)}</span></p>
        <div class="d5-chat d5-ana">
          <div class="d5-chat-thread d5-ana-said">${built}</div>
          <div class="d5-ana-main">
            <div class="d5-floor-tabs" role="tablist" aria-label="Les rubriques de la fiche">${fiche.map((r, i) => `<button type="button" class="d5-floor-tab ${i === fichePick ? 'is-current' : ''} ${filled[i] ? 'is-filled' : ''}" role="tab" aria-selected="${i === fichePick}" data-act="h7-fiche" data-i="${i}"><span class="d5-floor-n">${filled[i] ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(r.tab)}</span></button>`).join('')}</div>
            ${fiche.map((r, i) => pane(i, r)).join('')}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir ce qu’il fallait savoir'), right: kit.submit('Passer à la grille') })}`;
  }

  /* ── 5 · La grille ───────────────────────────────────────────────────── */
  function grid() {
    return `<section class="k-panel d5-panel">
        <p class="k-label">Auto-évaluation · avant le corrigé</p>
        <p class="d5-intro">Vérifiez votre fiche avec la grille. Votre tuteur utilisera la même.</p>
        ${kit.matrix({ key: 'self', rows: content.selfCheck, columns: YES_NO, head: 'Critère', round: true })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revenir à ma fiche'), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Le corrigé ──────────────────────────────────────────────────────── */
  const ficheText = () => {
    const d = D();
    return [
      `Fiche de coaching pour ${d.seller.name} (${d.title})`, '',
      `1. Ce qui a bien fonctionné : ${v('f_good') || ''}`,
      `2. Mon diagnostic : ${v('f_diag') || ''}`,
      '3. Mes 3 moments décisifs :',
      ...d.rewrites.map((r, j) => `   ${r.n} · ${v(`rw${j}_why`) || ''} → « ${v(`rw${j}_q`) || ''} » (${typeLabel(v(`rw${j}_t`))})`),
      '4. Ce qu’il aurait dû repartir en sachant :',
      `   Explicites : ${kindList('explicite').join(' ; ')}`,
      `   Implicites : ${kindList('implicite').join(' ; ')}`,
      `   Motivations : ${kindList('motivation').join(' ; ')}`,
      `   Hiérarchie : ${rankText()}`,
      `5. Deux conseils : ${v('f_tips') || ''}`
    ].join('\n');
  };

  function review() {
    const d = D();
    const yesCount = content.selfCheck.filter((_, i) => v(`self${i}`) === 'oui').length;
    const diagRows = d.moments.map((m, k) => {
      const id = choiceAt(k);
      const tone = toneOf(m, id);
      return `<div class="h6-path-row">
          <p class="h6-path-n">${esc(m.n)}</p>
          <div class="h6-path-you"><p class="h6-pick is-${tone}"><span aria-hidden="true">${tone === 'mid' ? '–' : icon(tone === 'ok' ? 'check' : 'close', { size: 14, strokeWidth: 3 })}</span><span><b>${esc((m.choices[id] || {}).text || '')}</b><span class="h6-pick-q">${q(m.q)}</span></span></p>
            ${tries(k).length > 1 ? `<p class="h6-retried">Puis vous avez essayé : ${tries(k).slice(1).map(t => esc(m.choices[t].text.split(' : ')[0])).join(' ; ')}.</p>` : ''}</div>
          <div class="h6-path-best">${tone === 'ok' ? `<p class="h6-explain">${esc(m.why)}</p>` : `<p class="h6-best-label">Le bon diagnostic</p><p class="h6-best-q"><b>${esc(m.choices[m.best].text)}</b></p><p class="h6-explain">${esc(m.why)}</p>`}</div>
        </div>`;
    }).join('');
    const rwRows = d.rewrites.map((r, j) => `<div class="fm-rv-row">
        <p class="fm-rv-label">${esc(r.n)}</p>
        <div class="fm-rv-you"><p class="result-answer-text">${esc(v(`rw${j}_why`) || '')}</p><p class="result-answer-text">${q(v(`rw${j}_q`) || '')} <em>(${esc(typeLabel(v(`rw${j}_t`)))})</em></p></div>
        <div class="fm-rv-model"><p>${esc(r.what)}</p><p>${q(r.model)}</p></div>
      </div>`).join('');
    const ficheRows = fiche.map(r => `<div class="fm-rv-row">
        <p class="fm-rv-label">${esc(r.label.replace(/^\d+ · /, ''))}</p>
        <div class="fm-rv-you">${kit.filled(v(`f_${r.id}`)) ? `<p class="result-answer-text">${esc(v(`f_${r.id}`))}</p>` : '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>'}</div>
        <div class="fm-rv-model"><p>${esc(d.model[r.id])}</p></div>
      </div>`).join('');
    return `<section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Votre analyse de l’entretien de ${esc(d.seller.name)}</span><span class="a4-review-count"><b>${rightFirst()}</b> / ${d.moments.length} diagnostics justes du premier coup · moments décisifs : <b>${dmScore()}</b> / 3</span></p>
        <div class="h6-path-head" aria-hidden="true"><span></span><span>Votre premier diagnostic</span><span>Le corrigé</span></div>
        ${diagRows}
      </section>
      <section class="k-panel h6-review">
        <p class="k-label">Les moments décisifs</p>
        <p class="h7-review-line">Vous avez choisi : <b>${picked().join(', ')}</b>. ${esc(d.decisive.text)}</p>
      </section>
      <section class="k-panel fm-review is-rows h6-review">
        <p class="k-label">Vos réécritures</p>
        <div class="fm-rv-head" aria-hidden="true"><span></span><span>Votre version</span><span>Le corrigé</span></div>
        ${rwRows}
      </section>
      <section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Ce qu’il fallait savoir</span><span class="a4-review-count"><b>${sortScore()}</b> / ${d.sort.length} bien classées · hiérarchie ${rankRight() ? 'juste' : 'à revoir'}</span></p>
        <ul class="h7-review-sort">${d.sort.map(c => `<li class="${v(`sk_${c.id}`) === c.kind ? 'is-ok' : 'is-ko'}"><b>${esc(c.text)}</b> · ${esc(KINDS.find(k => k.id === c.kind).label.toLowerCase())}. <span>${esc(c.why)}</span></li>`).join('')}</ul>
        <p class="h7-review-line"><b>La hiérarchie :</b> ${d.rank.items.map((it, i) => `${i + 1}. ${esc(it.text)}`).join(' · ')}. ${esc(d.rank.why)}</p>
      </section>
      <section class="k-panel fm-review is-rows h6-review">
        <p class="k-label">Votre fiche de coaching</p>
        <div class="fm-rv-head" aria-hidden="true"><span></span><span>Votre fiche</span><span>Un exemple</span></div>
        ${ficheRows}
        <div class="h6-copy">${kit.act('h7-copy', `${icon('document', { size: 18 })}<span>Copier ma fiche</span>`, 'secondary small')}<span>Pour l’envoyer à ${esc(d.seller.name)}, ou à votre tuteur.</span></div>
      </section>
      <section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yesCount}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${v(`self${i}`) === 'oui' ? '2' : '0'}">${v(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      ${kit.keyPoint ? kit.keyPoint(content.keyPoint) : ''}
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing() && D();
    const k = at();
    const body = reviewing ? review() : [scenario, decisiveStep, rewriteStep, knowStep, ficheStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page h7-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return interviewDone() ? [] : [{ key: 'warm', message: 'Analysez l’entretien jusqu’au bout.' }];
    if (k === 1) return yes('dmok') ? [] : [{ key: 'dm', message: 'Choisissez et validez vos 3 moments décisifs.' }];
    if (k === 2) return stepDone(2) ? [] : [{ key: `rw${Math.max(0, rwAt())}_q`, message: 'Réécrivez les trois moments décisifs.' }];
    if (k === 3) return stepDone(3) ? [] : [{ key: 'rk', message: 'Classez les informations, puis vérifiez la hiérarchie.' }];
    if (k === 4) {
      const missing = fiche.findIndex(r => !kit.filled(values[`f_${r.id}`]));
      if (missing !== -1) fichePick = missing;
      return missing === -1 ? [] : [{ key: `f_${fiche[missing].id}`, message: `Remplissez la rubrique « ${fiche[missing].tab} » de votre fiche.` }];
    }
    const missing = content.selfCheck.findIndex((_, i) => !values[`self${i}`]);
    return missing === -1 ? [] : [{ key: `self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < LAST && stepDone(k)) { ex.setValue('at', k + 1); rwPick = null; return true; }
    return false;
  }

  const feedback = () => ['Votre tuteur peut vous faire un retour sur votre fiche, avec la même grille.'];

  kit.on({
    'h7-go': control => go(Number(control.dataset.index)),
    'h7-prev': () => go(Math.max(0, at() - 1)),
    'h6-flag': control => advance(control.dataset.name),
    'h7-dossier': control => { if (!D()) advance('dos', control.dataset.id); },
    'h7-warm': control => { if (!v('warm')) advance('warm', control.dataset.id); },
    'h7-pick': control => {
      const k = Number(control.dataset.step);
      const id = control.dataset.id;
      if (!choiceAt(k)) { ex.setValue(`seen${k}`, true); ex.setValue(`x${k}`, [id]); advance(`c${k}`, id); return; }
      if (!yes(`retry${k}`) || tries(k).includes(id)) return;
      ex.setValue(`x${k}`, [...tries(k), id]);
      advance(`retry${k}`, false);
    },
    'h7-retry': control => advance(`retry${Number(control.dataset.step)}`, true),
    'h7-replay-close': control => { const box = control.closest('details'); if (box) { box.open = false; box.querySelector('summary').focus(); } },
    'h7-dm': control => {
      if (yes('dmok')) return;
      const n = control.dataset.n;
      const now = picked();
      if (now.includes(n)) ex.setValue('dm', now.filter(x => x !== n));
      else if (now.length < 3) ex.setValue('dm', [...now, n]);
      else { core.toast('Trois moments au plus : retirez-en un d’abord.'); return; }
      ex.changed(); ex.rebuild();
    },
    'h7-dm-check': () => { if (picked().length === 3) advance('dmok', true); },
    'h7-rw': control => { rwPick = Number(control.dataset.i); ex.rebuild(); },
    'h7-type': control => { const j = Number(control.dataset.j); if (!yes(`rw${j}_ok`)) advance(`rw${j}_t`, control.dataset.id); },
    'h7-rw-check': control => {
      const j = Number(control.dataset.j);
      if (!kit.filled(v(`rw${j}_why`))) { core.toast('Dites d’abord ce qui s’est passé à ce moment.'); return; }
      if (!kit.filled(v(`rw${j}_q`))) { core.toast('Écrivez la question que vous auriez posée.'); return; }
      if (!v(`rw${j}_t`)) { core.toast('Choisissez le type de votre question.'); return; }
      rwPick = j; advance(`rw${j}_ok`, true);
    },
    'h7-sort': control => { if (!yes('sok')) advance(`sk_${control.dataset.id}`, control.dataset.kind); },
    'h7-sort-check': () => { if (D().sort.every(c => v(`sk_${c.id}`))) advance('sok', true); },
    'h7-rank': control => { const now = rankNow(); if (!yes('rkok') && !now.includes(control.dataset.id)) advance('rk', [...now, control.dataset.id]); },
    'h7-rank-reset': () => { if (!yes('rkok')) advance('rk', []); },
    'h7-rank-check': () => { if (rankNow().length === D().rank.items.length) advance('rkok', true); },
    'h7-fiche': control => { fichePick = Number(control.dataset.i); ex.rebuild(); },
    'h7-copy': () => {
      const done = () => core.toast('Votre fiche est copiée.');
      const fail = () => core.toast('Copie impossible : sélectionnez le texte de votre fiche.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(ficheText()).then(done, fail);
      else fail();
    }
  });

  kit.tour(KEY, [
    { target: '.h6-stage, .k-panel', title: 'Le coach', text: 'Un collègue vous confie son entretien. Moment par moment, posez votre diagnostic, puis aidez-le à progresser.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'L’entretien, les moments décisifs, vos réécritures, ce qu’il fallait savoir, la fiche de coaching, puis la grille.' }
  ]);

  /* « Relire l'entretien » : on descend au dernier moment ; clic à côté ou Échap pour fermer. */
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
