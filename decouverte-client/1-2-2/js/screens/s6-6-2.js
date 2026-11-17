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
 * `rw<j>_t`, `rw<j>_ok` ; `sk<i>` (le classement), `sok` ; `rk` (ordre), `rkok` ;
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
  const KINDS = [{ id: 'explicite', label: 'Besoin dit', sub: 'explicite' }, { id: 'implicite', label: 'Besoin non dit', sub: 'implicite' }, { id: 'motivation', label: 'Motivation', sub: 'ce qui le pousse' }];
  const v = name => ex.value(name);
  const yes = name => v(name) === true;
  const D = () => content.dossiers[v('dos')] || null;
  const moments = () => (D() ? D().moments : []);

  /* ── L'entretien : les diagnostics ───────────────────────────────────── */
  const choiceAt = k => v(`c${k}`) || null;
  const tries = k => { const x = v(`x${k}`); return Array.isArray(x) && x.length ? x : (choiceAt(k) ? [choiceAt(k)] : []); };
  const currentAt = k => { const t = tries(k); return t[t.length - 1] || null; };
  const played = () => moments().filter((_, k) => choiceAt(k)).length;
  const toneOf = (m, id) => (id === m.best ? 'ok' : (m.choices[id] || {}).tone || 'mid');
  // Un diagnostic écrit (les derniers moments) : ton du premier essai.
  const firstTone = k => (moments()[k].write ? v(`wt${k}`) || 'ko' : toneOf(moments()[k], choiceAt(k)));
  const rightFirst = () => moments().filter((m, k) => choiceAt(k) && firstTone(k) === 'ok').length;

  // Le juge des réponses rédigées est dans le contenu (ATELIER_COACH), avec sa banque de tests.
  const judge = (m, text) => window.ATELIER_COACH.judgeIdeas(m.write.ideas, text);
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
    const kind = moments()[k].write ? 'write' : 'choose';
    if (!choiceAt(k)) return { kind, k };
    if (yes(`retry${k}`)) return { kind, k, retry: true };
    return { kind: 'fb', k };
  }

  /* ── Les moments décisifs ────────────────────────────────────────────── */
  const picked = () => (Array.isArray(v('dm')) ? v('dm') : []);
  const dmTone = n => (D().decisive.expected.includes(n) ? 'ok' : D().decisive.acceptable.includes(n) ? 'mid' : 'ko');
  const dmScore = () => picked().filter(n => D().decisive.expected.includes(n)).length;

  /* ── Les réécritures : la correction ─────────────────────────────────── */
  const cap = text => text.charAt(0).toUpperCase() + text.slice(1);
  function checks(j) {
    const r = D().rewrites[j];
    const type = v(`rw${j}_t`);
    const res = window.ATELIER_COACH.judgeRewrite(r, v(`rw${j}_q`) || '', content.productWords);
    const label = id => ((types.find(t => t.id === id) || {}).label || '').toLowerCase();
    const items = [];
    res.found.forEach(i => items.push({ ok: true, text: `${cap(i.text)}.` }));
    res.missing.forEach(i => items.push({ ok: false, text: `Il manque : ${i.text}.` }));
    if (res.product) items.push({ ok: false, text: `Elle propose un produit ou une offre (« ${res.product} ») : une question de découverte n’en propose aucun.` });
    if (res.forbidden) items.push({ ok: false, text: `${cap(r.forbidText)}.` });
    const typeOk = r.type.includes(type);
    if (!typeOk) items.push({ ok: false, text: `Le type attendu : ${r.type.map(label).join(' ou ')}.` });
    if (!res.question && res.found.length) items.push({ ok: false, text: 'Terminez par un point d’interrogation.' });
    return { tone: res.tone === 'ok' && !typeOk ? 'mid' : res.tone, items };
  }
  const rwAt = () => { const j = (D() ? D().rewrites : []).findIndex((_, i) => !yes(`rw${i}_ok`)); return j; };

  /* ── Ce qu'il fallait savoir ─────────────────────────────────────────── */
  const rankNow = () => (Array.isArray(v('rk')) ? v('rk') : []);
  const sortScore = () => D().sort.filter((c, i) => v(`sk${i}`) === c.kind).length;
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
  const lower = text => text.charAt(0).toLowerCase() + text.slice(1);
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
  // Une réplique façon dialogue : le visage, le nom, la phrase.
  // Un moment se nomme par son sujet (« L’îlot central »), jamais par « M4 ».
  const labelOf = n => (moments().find(m => m.n === n) || {}).label || '';
  const line = (cls, face, name, text, tag = '') => `<div class="h7-line ${cls}"><img src="${face}" alt="" aria-hidden="true"><div class="h7-line-body"><p class="h7-who">${esc(name)}${tag}</p><p class="h7-said">${q(text)}</p></div></div>`;
  const lines = (m, now = false) => line('is-seller', sellerFace(), D().seller.name, m.q, now ? '<span class="h7-now">Le moment à analyser</span>' : '')
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
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-shown');
      watch.unobserve(el);
      // Animation finie : on fige le moment (plus de calque, texte net).
      setTimeout(() => el.classList.add('is-settled'), 1400);
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
  // Un simple lien : l'aide-mémoire s'ouvre dans une fenêtre, sans rien décaler.
  const memoBox = () => `<button type="button" class="h7-help" data-act="h7-memo">${icon('document', { size: 16 })}<span>Aide-mémoire</span></button>`;
  const memoHtml = () => `<div class="h7-memo-win">
      <dl>${content.memo.map(x => `<div><dt>${esc(x.term)}</dt><dd>${esc(x.text)}<i>${q(x.ex)}</i></dd></div>`).join('')}</dl>
      <p class="h7-memo-funnel"><b>L’entonnoir de la découverte</b>${content.funnel.map((f, i) => `<span>${i + 1}. ${esc(f)}</span>`).join('')}</p>
    </div>`;

  /* Le retour de la formatrice (comme 6.1). */
  const VERDICT = {
    // Ici, on juge un DIAGNOSTIC, pas une action : pas de « À éviter… ».
    ok: { face: 'formatrice-oui', label: 'Votre diagnostic est juste', title: 'Bien vu !' },
    mid: { face: 'formatrice-presque', label: 'Votre diagnostic est en partie juste', title: 'Pas tout à fait…' },
    ko: { face: 'formatrice-attention', label: 'Votre diagnostic n’est pas le bon', title: 'Fausse piste' }
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
      body = `<div class="h6-card h6-banner is-text h6-in"><div><p class="k-label">Avant de commencer</p><p>Deux collègues vous confient la transcription de leur deuxième rendez-vous et vous demandent de l’aide. Choisissez un entretien : vous pourrez faire l’autre ensuite.</p></div></div>
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
          <p class="h7-context">${esc(D().context)}</p>
          <ol class="h7-tr is-read h7-reveal">${thread()}</ol>
          <p class="h7-read-note">Faites défiler pour lire la suite. Vous l’aurez sous les yeux pendant toute l’analyse.</p>
        </div>
        <div class="h6-stage-foot">${next('J’ai lu, je commence l’analyse', 'h6-flag', 0.4, 'data-name="read"')}</div>`;
    } else if (b.kind === 'choose') {
      // L'entretien à gauche (le moment surligné), la question et les
      // diagnostics à droite. Un indice pour M1 à M5, plus rien ensuite.
      // L'entretien a été lu en entier : ici, seul le moment à analyser
      // La carte ne porte que la question ; l'indice et l'aide-mémoire sont
      // deux petits boutons qui ouvrent une fenêtre.
      body = `<div class="h7-analyse">
          <div class="h6-card h7-tr-card h6-in"><p class="k-label">Moment ${k + 1} sur ${moments().length}</p><div class="h7-tr-one">${lines(m)}</div></div>
          <div class="h7-analyse-main">
            <p class="h7-question h6-in" ${delay(0.1)}>Qu’a fait ${esc(D().seller.name)} ici, et qu’est-ce que ça a produit ?</p>
            ${options({ title: 'Les diagnostics possibles', order: m.order, choices: m.choices, act: 'h7-pick', data: `data-step="${k}"`, tried: b.retry ? tries(k) : [] })}
          </div>
        </div>`;
    } else if (b.kind === 'write') {
      // Les derniers moments : on écrit soi-même. Le guide, dans le champ,
      // s'efface au fil des moments (complet, puis court, puis rien).
      body = `<div class="h7-analyse">
          <div class="h6-card h7-tr-card h6-in"><p class="k-label">Moment ${k + 1} sur ${moments().length}</p><div class="h7-tr-one">${lines(m)}</div></div>
          <div class="h7-analyse-main">
            <p class="h7-question h6-in" ${delay(0.1)}>Qu’a fait ${esc(D().seller.name)} ici, et qu’est-ce que ça a produit ?</p>
            <div class="h7-write h6-in" ${delay(0.2)}>
              <p class="h7-write-note">À vous de l’écrire, avec vos mots.</p>
              ${ex.field(`w${k}`, 'Votre diagnostic', { placeholder: m.write.guide || 'Votre diagnostic…', max: 500, rows: 4, hideLabel: true })}
              <div class="h7-actions">${kit.act('h7-write', `${icon('check', { size: 18 })}<span>Valider mon diagnostic</span>`, 'primary', `data-step="${k}"`)}</div>
            </div>
          </div>
        </div>`;
    } else if (b.kind === 'fb' && m.write) {
      const r = judge(m, v(`w${k}`));
      const ok = r.tone === 'ok';
      // « que elle » → « qu’elle » ; une idée ou plusieurs.
      const que = list => `que ${list.map(i => i.text).join(', et que ')}`.replace(/\bque (?=[aeiouyéèêh])/gi, 'qu’');
      const say = ok ? m.why : `${r.found.length ? `Vous avez bien vu ${que(r.found)}. ` : ''}Il vous manque ${r.missing.length > 1 ? 'les idées' : 'l’idée'} ${que(r.missing)}.`;
      const last = k === moments().length - 1;
      body = feedbackCard(r.tone, say, {
        better: ok ? "" : m.why, betterLabel: 'Le diagnostic attendu',
        tag: !yes(`wr${k}`) && ok ? 'Juste du premier coup' : '',
        button: `${ok ? '' : `<button type="button" class="button secondary h6-next h6-in" ${delay(0.5)} data-act="h7-retry" data-step="${k}">${icon('arrowLeft', { size: 18 })}<span>Compléter ma réponse</span></button>`}${next(last ? 'Voir mon bilan' : 'Moment suivant', 'h6-flag', 0.6, `data-name="ack${k}"`)}`
      });
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
      // Le bilan de l'étape, avant la transition : en phrases, ce qu'il faut retenir.
      const n = rightFirst();
      const tone = n >= 8 ? 'ok' : n >= 5 ? 'mid' : 'ko';
      const missed = moments().filter((m, i) => firstTone(i) !== 'ok');
      body = `<div class="h6-card h7-bilan h6-in">
          <p class="k-label">Bilan de l’étape 1 · L’entretien</p>
          ${msgBox(tone, `<p>Vous avez bien analysé du premier coup <b>${n} moment${n > 1 ? 's' : ''} sur ${moments().length}</b>.</p>`, n >= 8 ? 'Bien vu !' : n >= 5 ? 'Un bon début' : 'À retravailler')}
          ${missed.length ? `<p class="h7-bilan-h">Les moments à retenir</p>
          <ul class="h7-bilan-list">${missed.map(m => `<li><span class="h7-bilan-q">${q(m.q)}</span><span>C’était ${esc(lower(m.choices[m.best].text.split(' : ')[0]))} : ${esc(lower(m.choices[m.best].text.split(' : ').slice(1).join(' : ')))}</span></li>`).join('')}</ul>` : ''}
        </div>
        <div class="h6-stage-foot">${kit.submit('Choisir les moments décisifs')}</div>`;
    }
    const inGame = ['choose', 'write', 'fb', 'end'].includes(b.kind);
    const isFb = ['fb', 'warm-fb'].includes(b.kind);
    return `<section class="h6-stage ${isFb ? 'is-fb' : ''}" style="--h6-decor:url('${decorOf()}')">
        <div class="h6-stage-top">
          ${inGame ? `<div class="h6-meters">${gaugeBar(rightFirst())}</div>` : '<span></span>'}
          ${['choose', 'write'].includes(b.kind) ? `<div class="h7-helps is-corner">${m.hint ? `<button type="button" class="h7-help" data-act="h7-hint" data-step="${k}">${icon('thought', { size: 16 })}<span>Un indice</span></button>` : ''}${memoBox()}</div>` : ''}
        </div>
        <div class="h6-stage-body is-${b.kind}">${body}</div>
      </section>
      ${core.errorsBox()}`;
  }

  /* Un message de retour au style de la formatrice (son visage, un titre,
   * le texte). Après une validation, la page défile jusqu'à lui. */
  const msgBox = (tone, html, title = VERDICT[tone].title) => {
    const face = esc(core.asset(`../../moteur/assets/illustrations/retours/${VERDICT[tone].face}.webp`));
    return `<div class="h7-msg tone-${tone}" id="h7-msg"><img src="${face}" alt="" aria-hidden="true"><div class="h7-msg-body"><p class="h7-msg-title">${esc(title)}</p>${html}</div></div>`;
  };
  const showMsg = () => setTimeout(() => {
    const el = document.getElementById('h7-msg');
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 80);

  /* ── 1 · Les moments décisifs ────────────────────────────────────────── */
  function decisiveStep() {
    const d = D();
    const done = yes('dmok');
    const chosen = picked();
    const cards = moments().map(m => {
      const on = chosen.includes(m.n);
      const tone = done ? dmTone(m.n) : '';
      // Après validation : une seule petite pastille par carte ; les raisons sont dans le message.
      const mark = !done ? '' : on ? `<span class="h7-dm-mark tone-${tone}">${tone === 'ok' ? 'Décisif' : tone === 'mid' ? 'Se défend' : 'Pas décisif'}</span>` : tone === 'ok' ? '<span class="h7-dm-mark tone-miss">Moment attendu</span>' : '';
      return `<button type="button" class="h7-dm ${on ? 'is-on' : ''} ${done ? 'is-done' : ''}" data-act="h7-dm" data-n="${m.n}" aria-pressed="${on}" ${done ? 'disabled' : ''}>
          <span class="h7-dm-tick" aria-hidden="true">${on ? icon('check', { size: 14, strokeWidth: 3 }) : ''}</span>
          <span class="h7-dm-q">${q(m.q)}</span>
          <span class="h7-dm-foot"><span class="h7-dm-diag">${esc(m.choices[m.best].text.split(' : ')[0])}</span>${mark}</span>
        </button>`;
    }).join('');
    const score = dmScore();
    const tone = score === 3 ? 'ok' : score === 2 ? 'mid' : 'ko';
    const list = [...d.decisive.expected, ...d.decisive.acceptable].map(n => `<li><b>${esc(labelOf(n))}</b>${d.decisive.acceptable.includes(n) ? ' (se défend aussi)' : ''} : ${esc(d.decisive.why[n].replace(/^Acceptable : /, ''))}</li>`).join('');
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Les 3 moments décisifs</p>
        <p class="a4-role">Choisissez les trois moments où le questionnement de ${esc(d.seller.name)} a ouvert ou fermé la découverte. Pas les plus visibles : ceux qui ont le plus pesé.</p>
        ${done ? '' : `<p class="h7-count" aria-live="polite"><b>${chosen.length}</b> / 3 choisis</p>`}
        <div class="h7-dms">${cards}</div>
        ${done ? msgBox(tone, `<p>Vous avez trouvé ${score} des 3 moments décisifs.</p><ul class="h7-msg-list">${list}</ul>`)
          : `<div class="h7-actions">${kit.act('h7-dm-check', `${icon('check', { size: 18 })}<span>Valider mes 3 moments</span>`, 'primary', chosen.length === 3 ? '' : 'disabled')}</div>`}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir l’entretien'), right: done ? kit.submit('Réécrire les moments décisifs') : '' })}`;
  }

  /* ── 2 · Vos réécritures ─────────────────────────────────────────────── */
  /* Une seule consigne : « À la place de Karim, qu'auriez-vous demandé ? ».
   * Le moment à gauche (et ce qui a coincé), la question et le champ à
   * droite, comme pendant l'analyse. Indice et aide-mémoire en haut à droite. */
  let rwPick = null;
  function rewriteStep() {
    const d = D();
    const rws = d.rewrites;
    const free = rwAt();
    const j = rwPick !== null ? rwPick : (free === -1 ? 0 : free);
    const r = rws[j];
    const m = moments().find(x => x.n === r.n);
    const ok = yes(`rw${j}_ok`);
    const tabs = rws.map((x, i) => `<button type="button" class="d5-floor-tab ${i === j ? 'is-current' : ''} ${yes(`rw${i}_ok`) ? 'is-filled' : ''}" role="tab" aria-selected="${i === j}" data-act="h7-rw" data-i="${i}" ${i > 0 && !yes(`rw${i - 1}_ok`) ? 'disabled' : ''}><span class="d5-floor-n">${yes(`rw${i}_ok`) ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(labelOf(x.n))}</span></button>`).join('');
    const chips = types.map(t => `<button type="button" class="h7-chip ${v(`rw${j}_t`) === t.id ? 'is-on' : ''}" data-act="h7-type" data-j="${j}" data-id="${t.id}" aria-pressed="${v(`rw${j}_t`) === t.id}" ${ok ? 'disabled' : ''}>${esc(t.label)}</button>`).join('');
    const helps = `<div class="h7-helps is-corner">${r.hint ? `<button type="button" class="h7-help" data-act="h7-rwhint" data-j="${j}">${icon('thought', { size: 16 })}<span>Un indice</span></button>` : ''}${memoBox()}</div>`;
    let after = `<div class="h7-actions">${kit.act('h7-rw-check', `${icon('check', { size: 18 })}<span>Comparer avec le corrigé</span>`, 'primary', `data-j="${j}"`)}</div>`;
    if (ok) {
      const cs = checks(j);
      after = msgBox(cs.tone, `<ul class="h7-msg-checks">${cs.items.map(c => `<li><span class="h7-dot ${c.ok ? 'is-ok' : 'is-ko'}" aria-hidden="true"></span><span>${esc(c.text)}</span></li>`).join('')}</ul>
        <div class="h7-msg-model"><span>Des questions justes</span><p>${q(r.model)}</p>${(r.others || []).map(o => `<p>${q(o)}</p>`).join('')}</div>`)
        + (j < rws.length - 1 ? `<div class="h7-actions"><button type="button" class="button primary" data-act="h7-rw" data-i="${j + 1}"><span>Moment suivant</span>${icon('arrowRight', { size: 16 })}</button></div>` : '');
    }
    return `<section class="k-panel d5-panel h7-panel">
        <div class="h7-panel-top"><div><p class="k-label">Vos réécritures</p><p class="a4-role">Pour chaque moment décisif, la question que vous auriez posée à la place.</p></div>${helps}</div>
        <div class="d5-floor-tabs" role="tablist" aria-label="Les moments à réécrire">${tabs}</div>
        <div class="h7-analyse is-panel">
          <div class="h6-card h7-tr-card"><div class="h7-tr-one">${lines(m)}</div><p class="h7-stuck"><b>Ce qui a coincé :</b> ${esc(r.what)}</p></div>
          <div class="h7-analyse-main">
            <p class="h7-question">À la place de ${esc(d.seller.name)}, qu’auriez-vous demandé ?</p>
            <div class="h7-write">
              ${ex.field(`rw${j}_q`, 'Votre question', { placeholder: 'Votre question…', max: 300, rows: 2, hideLabel: true })}
              <p class="h7-write-note">C’est une question…</p>
              <div class="h7-chips" role="group" aria-label="Le type de votre question">${chips}</div>
            </div>
            ${after}
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
    // La grille à pastilles : cliquer ne redessine rien (pas de clignotement).
    const rows = kit.matrix({ key: 'sk', rows: d.sort.map(c => ({ text: c.text, why: c.why })), columns: KINDS, head: 'Ce qu’il fallait savoir', round: true, numbered: false, answers: sorted ? d.sort.map(c => c.kind) : null });
    const n = sortScore();
    const order = rankNow();
    const ranked = yes('rkok');
    const rankTone = rankRight() ? 'ok' : 'mid';
    const rankBox = sorted ? `<div class="h7-rank">
        <p class="k-label">Puis la hiérarchie</p>
        <p class="a4-role">Cliquez les trois besoins dans l’ordre : du plus important au moins important pour le client.</p>
        <div class="h7-rank-pool">${d.rank.show.map(id => { const it = d.rank.items.find(x => x.id === id); const pos = order.indexOf(id); return `<button type="button" class="h7-rank-item ${pos !== -1 ? 'is-on' : ''}" data-act="h7-rank" data-id="${id}" ${ranked || pos !== -1 ? 'disabled' : ''}><span class="h7-rank-n">${pos !== -1 ? pos + 1 : ''}</span><span>${esc(it.text)}</span></button>`; }).join('')}</div>
        ${ranked ? msgBox(rankTone, `<p>${esc(d.rank.why)}</p>${rankRight() ? '' : `<p class="h7-msg-model"><span>L’ordre attendu</span>${d.rank.items.map((it, i) => `${i + 1}. ${esc(it.text)}`).join('<br>')}</p>`}`, rankRight() ? 'C’est le bon ordre !' : 'Ce n’est pas l’ordre attendu')
          : `<div class="h7-actions">${kit.act('h7-rank-reset', `${icon('arrowLeft', { size: 16 })}<span>Recommencer</span>`, 'secondary small')}${kit.act('h7-rank-check', `${icon('check', { size: 18 })}<span>Vérifier l’ordre</span>`, 'primary', order.length === d.rank.items.length ? '' : 'disabled')}</div>`}
      </div>` : '';
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Ce que ${esc(d.seller.name)} aurait dû repartir en sachant</p>
        <p class="a4-role">Pour chaque information : un besoin que le client a dit, un besoin qu’il n’a pas dit, ou une motivation ?</p>
        <div class="h7-sort">${rows}</div>
        ${sorted ? (ranked ? '' : `<div ${ranked ? '' : 'id="h7-msg-sort"'}>${msgBox(n === d.sort.length ? 'ok' : n >= d.sort.length - 2 ? 'mid' : 'ko', `<p>${n} information${n > 1 ? 's' : ''} bien classée${n > 1 ? 's' : ''} sur ${d.sort.length}. L’explication est sous chaque information.</p>`)}</div>`)
          : `<div class="h7-actions">${kit.act('h7-sort-check', `${icon('check', { size: 18 })}<span>Vérifier mon classement</span>`, 'primary')}</div>`}
        ${rankBox}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h7-prev', 'Revoir mes réécritures'), right: stepDone(3) ? kit.submit('Rédiger ma fiche de coaching') : '' })}`;
  }

  /* ── 4 · La fiche de coaching ────────────────────────────────────────── */
  const typeLabel = id => ((types.find(t => t.id === id) || {}).label || '').toLowerCase();
  const kindList = kind => D().sort.filter((c, i) => v(`sk${i}`) === kind).map(c => c.text);
  const rankText = () => rankNow().map((id, i) => `${i + 1}. ${D().rank.items.find(x => x.id === id).text}`).join(' · ');
  let fichePick = 0;
  const fill = text => text.split('{name}').join(D().seller.name).split('{il}').join(D().seller.fem ? 'elle' : 'il');
  /* L'aide de chaque rubrique : les matériaux utiles, rien de plus. */
  function ficheHelp(id) {
    const d = D();
    if (id === 'good') {
      const strong = d.moments.filter(m => /^(Point fort|Utile)/.test(m.why));
      return `<p class="h7-aside-h">Les questions qui ont marché</p><ul>${strong.map(m => `<li><span class="h7-built-name">${esc(m.label)}</span>${q(m.q)}</li>`).join('')}</ul>`;
    }
    if (id === 'diag') {
      const left = d.sort.filter(x => x.kind !== 'explicite').map(x => x.text);
      return `<p class="h7-aside-h">Les moments qui ont fermé la découverte</p><ul>${d.rewrites.map(r => `<li><span class="h7-built-name">${esc(labelOf(r.n))}</span>${esc(r.what)}</li>`).join('')}</ul>
        <p class="h7-aside-h">Ce qui n’a pas été exploité</p><ul>${left.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
    }
    return `<p class="h7-aside-h">Vos questions de remplacement</p><ul>${d.rewrites.map((r, j) => `<li><span class="h7-built-name">${esc(labelOf(r.n))}</span>${q(v(`rw${j}_q`) || '')}</li>`).join('')}</ul>`;
  }
  function ficheStep() {
    const filled = fiche.map(r => kit.filled(v(`f_${r.id}`)));
    const r = fiche[fichePick];
    const i = fichePick;
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Ma fiche de coaching pour ${esc(D().seller.name)}</p>
        <p class="h7-rule-line">Règle d’or : des faits, le positif d’abord, jamais de jugement sur la personne.</p>
        <div class="d5-floor-tabs" role="tablist" aria-label="Les rubriques de la fiche">${fiche.map((x, n) => `<button type="button" class="d5-floor-tab ${n === i ? 'is-current' : ''} ${filled[n] ? 'is-filled' : ''}" role="tab" aria-selected="${n === i}" data-act="h7-fiche" data-i="${n}"><span class="d5-floor-n">${filled[n] ? icon('check', { size: 13, strokeWidth: 3 }) : n + 1}</span><span>${esc(x.tab)}</span></button>`).join('')}</div>
        <div class="h7-fiche">
          <div class="h7-fiche-main">
            <p class="h7-question">${esc(fill(r.label))}</p>
            <p class="h7-fiche-sub">${esc(fill(r.sub))}</p>
            ${ex.field(`f_${r.id}`, fill(r.label), { placeholder: fill(r.placeholder), max: 900, rows: 6, hideLabel: true })}
            <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="h7-fiche" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Rubrique précédente</span></button>` : '<span></span>'}${i < fiche.length - 1 ? `<button type="button" class="button secondary" data-act="h7-fiche" data-i="${i + 1}"><span>Rubrique suivante</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>
          </div>
          <aside class="h7-aside"><p class="k-label">Pour vous aider</p>${ficheHelp(r.id)}</aside>
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
      `1. Ce qui a marché : ${v('f_good') || ''}`,
      `2. Ce qui a coincé : ${v('f_diag') || ''}`,
      '3. Mes 3 moments décisifs :',
      ...d.rewrites.map((r, j) => `   ${labelOf(r.n)} · ${r.what} → « ${v(`rw${j}_q`) || ''} » (${typeLabel(v(`rw${j}_t`))})`),
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
    const rwOk = d.rewrites.filter((_, j) => checks(j).tone === 'ok').length;
    const ficheRows = fiche.map(r => `<div class="fm-rv-row">
        <p class="fm-rv-label">${esc(r.tab)}</p>
        <div class="fm-rv-you">${kit.filled(v(`f_${r.id}`)) ? `<p class="result-answer-text">${esc(v(`f_${r.id}`))}</p>` : '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>'}</div>
        <div class="fm-rv-model"><p>${esc(d.model[r.id])}</p></div>
      </div>`).join('');
    return `<section class="k-panel h6-review h7-review">
        <p class="k-label">Votre parcours de coach</p>
        <ul class="h7-path">
          <li><span>L’entretien</span>${rightFirst()} moment${rightFirst() > 1 ? 's' : ''} sur ${d.moments.length} bien analysé${rightFirst() > 1 ? 's' : ''} du premier coup</li>
          <li><span>Les moments décisifs</span>${dmScore()} trouvé${dmScore() > 1 ? 's' : ''} sur 3</li>
          <li><span>Vos réécritures</span>${rwOk} question${rwOk > 1 ? 's' : ''} juste${rwOk > 1 ? 's' : ''} sur 3</li>
          <li><span>Ce qu’il fallait savoir</span>${sortScore()} information${sortScore() > 1 ? 's' : ''} sur ${d.sort.length} bien classée${sortScore() > 1 ? 's' : ''}, priorités ${rankRight() ? 'dans le bon ordre' : 'à revoir'}</li>
        </ul>
      </section>
      <section class="k-panel fm-review is-rows h6-review">
        <p class="k-label">Bilan de votre fiche de coaching</p>
        <p class="h7-review-line">Comparez votre fiche avec un exemple : d’autres formulations sont justes, si elles citent des faits et commencent par le positif.</p>
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

  /* La page de transition : ce que vous venez de faire, pourquoi la suite,
   * ce qu'on vous demande. Dans la scène, comme l'entretien. */
  function transition(k) {
    const t = content.transitions[k];
    const fillT = text => text.split('{name}').join(D().seller.name).split('{il}').join(D().seller.fem ? 'elle' : 'il').split('{e}').join(D().seller.fem ? 'e' : '');
    return `<section class="h6-stage" style="--h6-decor:url('${decorOf()}')">
        <div class="h6-stage-body">
          <div class="h6-card h7-trans h6-in">
            <p class="k-label">Étape ${k + 1} sur ${STEPS.length}</p>
            <p class="h7-trans-title">${esc(STEPS[k])}</p>
            <p class="h7-trans-done">${icon('check', { size: 16, strokeWidth: 3 })}<span>${esc(fillT(t.done))}</span></p>
            <p class="h7-trans-why">${esc(fillT(t.why))}</p>
            <p class="h7-trans-todo"><span>À vous</span>${esc(fillT(t.todo))}</p>
          </div>
          <div class="h6-stage-foot">${next('C’est parti', 'h7-tr', 0.5, `data-k="${k}"`)}</div>
        </div>
      </section>`;
  }

  function screen() {
    const reviewing = ex.reviewing() && D();
    const k = at();
    // Avant chaque étape (à partir de la 2e) : une page de transition.
    const body = reviewing ? review() : k > 0 && !yes(`tr${k}`) ? transition(k) : [scenario, decisiveStep, rewriteStep, knowStep, ficheStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page h7-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: D() ? `Analysez l’entretien de ${D().seller.name}, repérez ce qui a ouvert ou fermé la découverte, et aidez-${D().seller.fem ? 'la' : 'le'} à progresser.` : content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
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
    'h7-tr': control => { advance(`tr${Number(control.dataset.k)}`); window.scrollTo({ top: 0, behavior: 'instant' }); },
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
    'h7-retry': control => { const k = Number(control.dataset.step); if (moments()[k].write) ex.setValue(`wr${k}`, true); advance(`retry${k}`, true); },
    'h7-write': control => {
      const k = Number(control.dataset.step);
      const m = moments()[k];
      if (!kit.filled(v(`w${k}`))) { core.toast('Écrivez d’abord votre diagnostic.'); return; }
      if (!choiceAt(k)) { ex.setValue(`seen${k}`, true); ex.setValue(`wt${k}`, judge(m, v(`w${k}`)).tone); advance(`c${k}`, 'write'); return; }
      advance(`retry${k}`, false);
    },
    'h7-memo': () => core.openDialog('Aide-mémoire : les types de questions', memoHtml()),
    'h7-hint': control => { const m = moments()[Number(control.dataset.step)]; if (m && m.hint) core.openDialog('Un indice', `<p class="h7-hint-win">${esc(m.hint)}</p>`); },
    'h7-replay-close': control => { const box = control.closest('details'); if (box) { box.open = false; box.querySelector('summary').focus(); } },
    'h7-dm': control => {
      if (yes('dmok')) return;
      const n = control.dataset.n;
      const now = picked();
      const on = !now.includes(n);
      if (on && now.length >= 3) { core.toast('Trois moments au plus : retirez-en un d’abord.'); return; }
      const next = on ? [...now, n] : now.filter(x => x !== n);
      ex.setValue('dm', next); ex.changed();
      control.classList.toggle('is-on', on);
      control.setAttribute('aria-pressed', String(on));
      control.querySelector('.h7-dm-tick').innerHTML = on ? icon('check', { size: 14, strokeWidth: 3 }) : '';
      const count = document.querySelector('.h7-count b');
      if (count) count.textContent = String(next.length);
      const check = document.querySelector('[data-act="h7-dm-check"]');
      if (check) check.disabled = next.length !== 3;
    },
    'h7-dm-check': () => { if (picked().length === 3) { advance('dmok', true); showMsg(); } },
    'h7-rw': control => { rwPick = Number(control.dataset.i); ex.rebuild(); },
    'h7-type': control => {
      const j = Number(control.dataset.j);
      if (yes(`rw${j}_ok`)) return;
      ex.setValue(`rw${j}_t`, control.dataset.id); ex.changed();
      control.parentElement.querySelectorAll('.h7-chip').forEach(b => { const on = b === control; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', String(on)); });
    },
    'h7-rw-check': control => {
      const j = Number(control.dataset.j);
      if (!kit.filled(v(`rw${j}_q`))) { core.toast('Écrivez la question que vous auriez posée.'); return; }
      if (!v(`rw${j}_t`)) { core.toast('Choisissez le type de votre question.'); return; }
      rwPick = j; advance(`rw${j}_ok`, true); showMsg();
    },
    'h7-sort-check': () => {
      if (!D().sort.every((_, i) => v(`sk${i}`))) { core.toast('Classez chaque information avant de vérifier.'); return; }
      advance('sok', true); showMsg();
    },
    'h7-rank': control => {
      const now = rankNow();
      if (yes('rkok') || now.includes(control.dataset.id)) return;
      const next = [...now, control.dataset.id];
      ex.setValue('rk', next); ex.changed();
      control.classList.add('is-on'); control.disabled = true;
      control.querySelector('.h7-rank-n').textContent = String(next.length);
      const check = document.querySelector('[data-act="h7-rank-check"]');
      if (check) check.disabled = next.length !== D().rank.items.length;
    },
    'h7-rank-reset': () => {
      if (yes('rkok')) return;
      ex.setValue('rk', []); ex.changed();
      document.querySelectorAll('.h7-rank-item').forEach(b => { b.classList.remove('is-on'); b.disabled = false; b.querySelector('.h7-rank-n').textContent = ''; });
      const check = document.querySelector('[data-act="h7-rank-check"]');
      if (check) check.disabled = true;
    },
    'h7-rank-check': () => { if (rankNow().length === D().rank.items.length) { advance('rkok', true); showMsg(); } },
    'h7-rwhint': control => { const r = D().rewrites[Number(control.dataset.j)]; if (r && r.hint) core.openDialog('Un indice', `<p class="h7-hint-win">${esc(r.hint)}</p>`); },
    'h7-fiche': control => { fichePick = Number(control.dataset.i); ex.rebuild(); },
    'h7-copy': () => {
      const done = () => core.toast('Votre fiche est copiée.');
      const fail = () => core.toast('Copie impossible : sélectionnez le texte de votre fiche.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(ficheText()).then(done, fail);
      else fail();
    }
  });

  kit.tour(KEY, [
    { target: '.h6-stage, .k-panel', title: 'Le coach', text: 'Votre collègue vous confie son entretien. Moment par moment, posez votre diagnostic, puis aidez votre collègue à progresser.' },
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
