/* S6 6.3 · Ma banque de questions terrain (fiche M1.2.2, synthèse
 * optionnelle, option 3), mise en scène comme 6.2 : la carte du chemin et
 * une page de transition avant chaque étape, un bilan à la fin de chaque
 * étape (avant la transition), les retours de la formatrice.
 *
 * Six étapes :
 *   0. Les situations : la mission (Nadia, la responsable ; Lucas, le nouveau
 *      collègue) et votre métier en une ligne ; puis 3 situations parmi 8 ;
 *      bilan : le piège et la question clé de chacune.
 *   1. Le bon réflexe : pour chaque situation, un client parle, trois
 *      réponses (nouvel essai après une réponse moins juste) ; bilan.
 *   2. Vos fiches : une fiche par situation, en quatre pages ; chaque
 *      question écrite affiche son type en direct (ATELIER_QTYPE, sans
 *      redessiner l'écran) ; l'aide se retire (fiche 1 : un exemple ; fiche
 *      2 : un indice ; fiche 3 : rien) ; bilan de chaque fiche.
 *   3. Vos 5 règles d'or : les thèmes couverts s'allument en direct ; bilan.
 *   4. Le test terrain (facultatif) : la question à tester, et quand.
 *   5. La grille. Puis le corrigé : votre banque complète, l'exemple.
 *
 * Valeurs : `intro`, `metier` ; `sit` (3 identifiants), `sitok` ; pour la
 * situation j : `c<j>`, `x<j>`, `retry<j>`, `ack<j>` (le bon réflexe),
 * `f<j>_<champ>`, `f<j>_ok` (la fiche) ; `r0`…`r4`, `rok` ; `t_q`, `t_when`,
 * `tok`, `tskip` ; `self<i>` ; `tr<k>` (transitions vues) ; `at`.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const KEY = 's6-6.3';
  const content = window.ATELIER_S6['6.3'];
  const QT = window.ATELIER_QTYPE;
  const { situations, pages, themes, manager, newcomer } = content;
  const STEPS = ['Les situations', 'Le bon réflexe', 'Vos fiches', 'Vos règles d’or', 'Le test terrain', 'La grille'];
  const LAST = STEPS.length - 1;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];
  const v = name => ex.value(name);
  const yes = name => v(name) === true;
  const filled = name => kit.filled(v(name));

  /* ── Les données de l'apprenant ──────────────────────────────────────── */
  const chosenIds = () => (Array.isArray(v('sit')) ? v('sit') : []);
  const chosen = () => chosenIds().map(id => situations.find(s => s.id === id)).filter(Boolean);
  const choiceAt = j => v(`c${j}`) || null;
  const tries = j => { const x = v(`x${j}`); return Array.isArray(x) && x.length ? x : (choiceAt(j) ? [choiceAt(j)] : []); };
  const currentAt = j => { const t = tries(j); return t[t.length - 1] || null; };
  const toneOf = (r, id) => (id === r.best ? 'ok' : (r.choices[id] || {}).tone || 'mid');
  const reflexRight = () => chosen().filter((s, j) => choiceAt(j) === s.reflex.best).length;
  const QFIELDS = pages.flatMap(p => p.fields).filter(f => f.kind === 'q');
  const ALLFIELDS = pages.flatMap(p => p.fields);

  /* Le type d'une question, en mots, et s'il convient au champ. */
  const TYPE_LABEL = { ouverte: 'Ouverte', fermee: 'Fermée', alternative: 'Alternative', orientee: 'Orientée', produit: 'Vente déguisée', 'pas-question': 'Pas une question', vide: '' };
  function fieldCheck(f, text) {
    if (!kit.filled(text)) return { ok: false, empty: true, label: '', text: `${f.label} : à remplir.` };
    if (f.kind === 'text') {
      const ok = String(text).trim().length >= f.min;
      return { ok, label: '', text: ok ? `${f.label} : c’est fait.` : `${f.label} : un peu court. Ajoutez un ou deux détails concrets de votre métier.` };
    }
    const type = QT.classify(text);
    let ok = f.expect.includes(type);
    if (ok && f.prio && !QT.prioritizes(text)) ok = false;
    const name = (TYPE_LABEL[type] || '').toLowerCase();
    let say;
    if (f.trap) say = ok ? `${f.label} : c’est bien un piège (question ${name === 'vente déguisée' ? 'qui pousse un produit' : name}). Lucas saura le reconnaître.` : `${f.label} : écrivez la question à NE PAS poser, celle qui souffle la réponse ou pousse un produit.`;
    else if (ok) say = `${f.label} : question ${name}, c’est ce qu’on attend.`;
    else if (f.prio && f.expect.includes(type)) say = `${f.label} : elle doit faire choisir le client (« qu’est-ce qui compte le plus ? », « entre A et B… »).`;
    else if (type === 'orientee' || type === 'produit') say = `${f.label} : elle ${type === 'produit' ? 'pousse un produit' : 'souffle la réponse'}. Une question de découverte laisse le client répondre librement.`;
    else if (type === 'pas-question') say = `${f.label} : formulez une vraie question, avec un point d’interrogation.`;
    else say = `${f.label} : question ${name}. On attend ici une question ${f.expect.map(e => TYPE_LABEL[e].toLowerCase()).join(' ou ')}.`;
    return { ok, type, label: TYPE_LABEL[type] || '', text: say };
  }
  const ficheChecks = j => ALLFIELDS.map(f => ({ f, ...fieldCheck(f, v(`f${j}_${f.id}`)) }));
  const qScore = () => chosen().reduce((n, _, j) => n + QFIELDS.filter(f => fieldCheck(f, v(`f${j}_${f.id}`)).ok).length, 0);
  const covered = () => { const all = [0, 1, 2, 3, 4].map(i => window.ATELIER_COACH.plain(v(`r${i}`) || '')).join(' '); return themes.filter(t => t.words.some(w => window.ATELIER_COACH.hasWord(` ${all} `, w))); };

  /* ── Les étapes ──────────────────────────────────────────────────────── */
  const stepDone = k => {
    if (k === 0) return yes('sitok');
    if (k === 1) return chosen().length === 3 && chosen().every((_, j) => yes(`ack${j}`));
    if (k === 2) return chosen().length === 3 && chosen().every((_, j) => yes(`f${j}_ok`));
    if (k === 3) return yes('rok');
    if (k === 4) return yes('tok') || yes('tskip');
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
      return `<button type="button" class="k-progress-arrow" data-act="h8-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEPS.map((label, i) => `<button type="button" class="k-progress-seg ${stepDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="h8-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${arrow(k - 1, 'prev')}<span class="k-progress-label">${esc(STEPS[k])}</span><strong>${k + 1} / ${STEPS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${arrow(k + 1, 'next')}</p>`;
  }

  /* ── Petits éléments (comme 6.2) ─────────────────────────────────────── */
  const img = path => esc(core.asset(`assets/illustrations/${path}`));
  const q = text => `«&nbsp;${esc(text)}&nbsp;»`;
  const delay = t => `style="animation-delay:${t.toFixed(2)}s"`;
  const next = (label, act, t = 0, extra = '') => `<button type="button" class="button primary h6-next h6-in" ${delay(t)} data-act="${act}" ${extra}><span>${esc(label)}</span>${icon('arrowRight', { size: 18 })}</button>`;
  const decor = img(content.decor);
  const stage = (body, extra = '') => `<section class="h6-stage ${extra}" style="--h6-decor:url('${decor}')"><div class="h6-stage-body">${body}</div></section>`;
  const VERDICT = {
    ok: { face: 'formatrice-oui', label: 'Ceci est une réponse appropriée', title: 'Bien vu !' },
    mid: { face: 'formatrice-presque', label: 'Ce n’est pas tout à fait la réponse attendue', title: 'Pas tout à fait…' },
    ko: { face: 'formatrice-attention', label: 'Ceci n’est pas une réponse appropriée', title: 'Fausse piste' }
  };
  const faceOf = tone => esc(core.asset(`../../moteur/assets/illustrations/retours/${VERDICT[tone].face}.webp`));
  const msgBox = (tone, html, title = VERDICT[tone].title) => `<div class="h7-msg tone-${tone}" id="h7-msg"><img src="${faceOf(tone)}" alt="" aria-hidden="true"><div class="h7-msg-body"><p class="h7-msg-title">${esc(title)}</p>${html}</div></div>`;
  const showMsg = () => setTimeout(() => { const el = document.getElementById('h7-msg'); if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 80);
  function feedbackCard(tone, text, { better = '', betterLabel = '', button }) {
    return `<div class="h6-gfb tone-${tone}">
        <aside class="h6-gfb-side h6-in"><img src="${faceOf(tone)}" alt="" aria-hidden="true"><p>${esc(VERDICT[tone].label)}</p></aside>
        <div class="h6-gfb-main"><div class="h6-gfb-col">
          <div class="h6-card h6-gfb-card h6-in" ${delay(0.15)}>
            <p class="h6-gfb-title">${esc(VERDICT[tone].title)}</p>
            <p class="h6-fb-say">${esc(text)}</p>
            ${better ? `<div class="h6-fb-better"><span>${esc(betterLabel)}</span><p>${esc(better)}</p></div>` : ''}
          </div>
          <div class="h6-gfb-foot">${button}</div>
        </div></div>
      </div>`;
  }

  /* ── La carte du chemin et les transitions (comme 6.2) ───────────────── */
  const SPOTS = [[15.4, 23], [46, 25], [78.6, 24], [15.4, 72], [46.8, 70], [78, 71]];
  const BADGES = [[7.7, 10], [39, 10], [71, 10], [7.7, 58], [39, 58], [71, 58]];
  const VEILS = [[20, 26], [47, 27], [80, 27], [20, 75], [47, 75], [80, 75]];
  function transition(k) {
    const t = content.transitions[k];
    const from = SPOTS[Math.max(0, k - 1)];
    const to = SPOTS[k];
    const map = `<div class="h7-map h6-in" role="img" aria-label="Le chemin de l’exercice : étape ${k + 1} sur ${STEPS.length}, ${esc(STEPS[k])}.">
        <img src="${img('parcours/banque-chemin.webp')}" alt="">
        ${VEILS.map(([x, y], i) => (i > k ? `<span class="h7-map-veil" style="left:${x}%;top:${y}%"></span>` : '')).join('')}
        ${BADGES.map(([x, y], i) => (i < k ? `<span class="h7-map-done" style="left:${x}%;top:${y}%">${icon('check', { size: 18, strokeWidth: 3.5 })}</span>` : '')).join('')}
        <span class="h7-map-pawn ${k > 0 ? 'is-moving' : 'is-landing'}" style="--fx:${from[0]}%;--fy:${from[1]}%;--tx:${to[0]}%;--ty:${to[1]}%"><b>Vous</b></span>
      </div>`;
    return stage(`<div class="h7-way">
          ${map}
          <div class="h6-card h7-trans h6-in" ${delay(0.3)}>
            <p class="k-label">Étape ${k + 1} sur ${STEPS.length}</p>
            <p class="h7-trans-title">${esc(STEPS[k])}</p>
            <p class="h7-trans-done">${icon('check', { size: 16, strokeWidth: 3 })}<span>${esc(t.done)}</span></p>
            <p class="h7-trans-why">${esc(t.why)}</p>
            <p class="h7-trans-todo"><span>À vous</span>${esc(t.todo)}</p>
          </div>
        </div>
        <div class="h6-stage-foot">${next('C’est parti', 'h8-tr', 1.2, `data-k="${k}"`)}</div>`);
  }

  /* ── 0 · Les situations ──────────────────────────────────────────────── */
  function introScreen() {
    return stage(`<div class="h6-choose">
          <div class="h6-card h6-who h6-in"><img class="h6-who-face" src="${img(manager.face)}" alt="" aria-hidden="true"><p class="h6-who-name">${esc(manager.name)}</p><p class="h6-who-role">${esc(manager.role)}</p></div>
          <div class="h6-card h6-answer h7-message h6-in" ${delay(0.15)}>
            <p class="h6-answer-label">Son message :</p>
            <p class="h6-answer-q">${q(content.ask)}</p>
            <p class="h7-mission-h">Ce que vous allez faire</p>
            <ol class="h7-mission">${content.mission.map(t => `<li>${esc(t)}</li>`).join('')}</ol>
            <div class="h7-write h8-metier"><p class="h7-write-note">Votre métier, en une ligne</p>${ex.field('metier', 'Votre métier', { placeholder: 'Conseiller dans un magasin de cuisines, attachée commerciale en assurance…', max: 140, type: 'input', hideLabel: true })}</div>
          </div>
        </div>
        <div class="h6-stage-foot">${next('C’est parti', 'h8-intro', 0.6)}</div>`);
  }

  function situationsStep() {
    const done = yes('sitok');
    const ids = chosenIds();
    const cards = situations.map(s => {
      const on = ids.includes(s.id);
      return `<button type="button" class="h7-dm ${on ? 'is-on' : ''} ${done ? 'is-done' : ''}" data-act="h8-sit" data-id="${s.id}" aria-pressed="${on}" ${done ? 'disabled' : ''}>
          <span class="h7-dm-tick" aria-hidden="true">${on ? icon('check', { size: 14, strokeWidth: 3 }) : ''}</span>
          <span class="h8-sit-title">${esc(s.title)}</span>
          <span class="h7-dm-q">${esc(s.line)}</span>
        </button>`;
    }).join('');
    const bilan = done ? msgBox('ok', `<p>Vos 3 situations, et ce que Lucas doit savoir de chacune :</p><ul class="h7-bilan-list">${chosen().map(s => `<li><span class="h7-bilan-q">${esc(s.title)}</span><span class="h7-bilan-a">Le piège : ${esc(s.trap.charAt(0).toLowerCase() + s.trap.slice(1))} La question clé : ${q(s.key)}</span></li>`).join('')}</ul>`, 'Bon choix') : '';
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Les situations · ${esc(v('metier') || 'votre métier')}</p>
        <p class="a4-role">Choisissez les 3 situations de découverte que vous rencontrez le plus souvent dans votre métier.</p>
        ${done ? '' : `<p class="h7-count" aria-live="polite"><b>${ids.length}</b> / 3 choisies</p>`}
        <div class="h7-dms">${cards}</div>
        ${done ? bilan : `<div class="h7-actions">${kit.act('h8-sit-check', `${icon('check', { size: 18 })}<span>Valider mes 3 situations</span>`, 'primary', ids.length === 3 ? '' : 'disabled')}</div>`}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: done ? kit.submit('Trouver le bon réflexe') : '' })}`;
  }

  /* ── 1 · Le bon réflexe ──────────────────────────────────────────────── */
  function reflexStep() {
    const list = chosen();
    const j = list.findIndex((_, i) => !yes(`ack${i}`));
    if (j === -1) {
      const n = reflexRight();
      const tone = n === 3 ? 'ok' : n >= 2 ? 'mid' : 'ko';
      return stage(`<div class="h6-card h7-bilan h6-in">
            <p class="k-label">Bilan de l’étape 2 · Le bon réflexe</p>
            ${msgBox(tone, `<p>Vous avez trouvé du premier coup <b>${n} bon${n > 1 ? 's' : ''} réflexe${n > 1 ? 's' : ''} sur 3</b>. Gardez en tête la question clé de chaque situation : elle ouvrira vos fiches.</p>`, n === 3 ? 'Bien vu !' : n >= 2 ? 'Un bon début' : 'À retravailler')}
            <ul class="h7-bilan-list">${list.map(s => `<li><span class="h7-bilan-q">${esc(s.title)}</span><span class="h7-bilan-a">La question clé : <b>${q(s.key)}</b></span></li>`).join('')}</ul>
          </div>
          <div class="h6-stage-foot">${kit.submit('Remplir mes fiches')}</div>`);
    }
    const s = list[j];
    const r = s.reflex;
    if (!choiceAt(j) || yes(`retry${j}`)) {
      const tried = yes(`retry${j}`) ? tries(j) : [];
      const opts = `<div class="h6-options" role="group" aria-label="Vos réponses possibles">${r.order.map((id, n) => `<button type="button" class="h6-option h6-in ${tried.includes(id) ? 'is-tried' : ''}" ${delay(0.2 + n * 0.15)} data-act="h8-pick" data-j="${j}" data-id="${id}" ${tried.includes(id) ? 'disabled aria-disabled="true"' : ''}><span class="h6-option-n">${n + 1}</span><span>${esc(r.choices[id].text)}</span>${tried.includes(id) ? '<span class="h6-cost is-tried">Déjà essayé</span>' : ''}</button>`).join('')}</div>`;
      return stage(`<div class="h7-analyse">
            <div class="h6-card h7-tr-card h6-in"><p class="k-label">Situation ${j + 1} sur 3 · ${esc(s.title)}</p>
              <div class="h7-tr-one">${r.scene ? `<p class="h7-gesture">${esc(r.scene)}</p>` : ''}<div class="h7-line is-client"><img src="${img(s.face)}" alt="" aria-hidden="true"><div class="h7-line-body"><p class="h7-who">${esc(r.who)}</p><p class="h7-said">${q(r.says)}</p></div></div></div></div>
            <div class="h7-analyse-main">
              <p class="h7-question h6-in" ${delay(0.1)}>Que lui répondez-vous ?</p>
              ${opts}
            </div>
          </div>`);
    }
    const id = currentAt(j);
    const tone = toneOf(r, id);
    const ok = tone === 'ok';
    return stage(feedbackCard(tone, ok ? r.why : r.choices[id].note, {
      better: ok ? '' : 'Revenez aux réponses et essayez-en une autre.', betterLabel: 'À vous de rejouer',
      button: ok ? next(j === 2 ? 'Voir le bilan' : 'Situation suivante', 'h8-ack', 0.5, `data-j="${j}"`)
        : `<button type="button" class="button primary h6-next h6-in" ${delay(0.5)} data-act="h8-retry" data-j="${j}">${icon('arrowLeft', { size: 18 })}<span>Revenir aux réponses</span></button>`
    }), 'is-fb');
  }

  /* ── 2 · Vos fiches ──────────────────────────────────────────────────── */
  let ficheJ = null;
  let pageP = 0;
  const badgeHtml = (f, text) => {
    if (f.kind !== 'q' || !kit.filled(text)) return '';
    const c = fieldCheck(f, text);
    return `<span class="h7-dot ${c.ok ? 'is-ok' : 'is-ko'}" aria-hidden="true"></span>${esc(c.label)}${c.ok ? '' : ` · on attend : ${esc(f.expect.map(e => TYPE_LABEL[e].toLowerCase()).join(' ou '))}${f.prio ? ', qui fait choisir' : ''}`}`;
  };
  function fichesStep() {
    const list = chosen();
    const free = list.findIndex((_, i) => !yes(`f${i}_ok`));
    const j = ficheJ !== null ? ficheJ : (free === -1 ? 0 : free);
    const s = list[j];
    const okJ = yes(`f${j}_ok`);
    const help = j === 0 ? 'example' : j === 1 ? 'hint' : '';
    const tabs = list.map((x, i) => `<button type="button" class="d5-floor-tab ${i === j ? 'is-current' : ''} ${yes(`f${i}_ok`) ? 'is-filled' : ''}" role="tab" aria-selected="${i === j}" data-act="h8-fiche" data-j="${i}" ${i > 0 && !yes(`f${i - 1}_ok`) ? 'disabled' : ''}><span class="d5-floor-n">${yes(`f${i}_ok`) ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(x.title)}</span></button>`).join('');
    const page = pages[pageP];
    const pageTabs = pages.map((p, n) => `<button type="button" class="h8-page ${n === pageP ? 'is-current' : ''}" data-act="h8-page" data-p="${n}"><span>${n + 1}</span>${esc(p.tab)}</button>`).join('');
    const fieldHtml = f => {
      const name = `f${j}_${f.id}`;
      const aid = help === 'example' ? `<p class="h8-aid">Exemple : ${f.kind === 'q' ? q(f.example) : esc(f.example)}</p>` : help === 'hint' ? `<p class="h8-aid">Indice : ${esc(f.hint)}</p>` : '';
      return `<div class="h7-write h8-field">
          <p class="h8-field-label">${esc(f.label)}</p>
          <p class="h7-write-note">${esc(f.sub)}</p>
          ${ex.field(name, f.label, { placeholder: f.kind === 'q' ? 'Votre question… ?' : 'Votre réponse…', max: f.kind === 'q' ? 220 : 400, rows: f.kind === 'q' ? 2 : 3, hideLabel: true })}
          ${f.kind === 'q' ? `<p class="h8-badge" data-badge="${name}" aria-live="polite">${badgeHtml(f, v(name))}</p>` : ''}
          ${aid}
        </div>`;
    };
    const lastPage = pageP === pages.length - 1;
    const nav = `<div class="h7-fiche-nav">${pageP > 0 ? `<button type="button" class="text-button with-icon" data-act="h8-page" data-p="${pageP - 1}">${icon('arrowLeft', { size: 16 })}<span>Page précédente</span></button>` : '<span></span>'}${lastPage ? (okJ ? '' : kit.act('h8-fiche-check', `${icon('check', { size: 18 })}<span>Vérifier ma fiche</span>`, 'primary', `data-j="${j}"`)) : `<button type="button" class="button primary small" data-act="h8-page" data-p="${pageP + 1}"><span>Page suivante</span>${icon('arrowRight', { size: 16 })}</button>`}</div>`;
    let bilan = '';
    if (okJ) {
      const cs = ficheChecks(j);
      const good = cs.filter(c => c.ok).length;
      const tone = good === cs.length ? 'ok' : good >= cs.length - 3 ? 'mid' : 'ko';
      bilan = msgBox(tone, `<p>Votre fiche « ${esc(s.title)} » : ${good} rubrique${good > 1 ? 's' : ''} sur ${cs.length} au point.</p><ul class="h7-msg-checks">${cs.map(c => `<li><span class="h7-dot ${c.ok ? 'is-ok' : 'is-ko'}" aria-hidden="true"></span><span>${esc(c.text)}</span></li>`).join('')}</ul><p class="h7-msg-note">Vous pouvez encore corriger vos questions : elles seront reprises telles quelles dans la banque.</p>`, `Bilan de la fiche ${j + 1}`)
        + (j < 2 ? `<div class="h7-actions"><button type="button" class="button primary" data-act="h8-fiche" data-j="${j + 1}"><span>Fiche suivante</span>${icon('arrowRight', { size: 16 })}</button></div>` : '');
    }
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Vos fiches · ${esc(v('metier') || 'votre métier')}</p>
        <p class="a4-role">Une fiche par situation, à partir d’un cas réel de votre métier. ${help === 'example' ? 'Pour cette première fiche, un exemple accompagne chaque rubrique.' : help === 'hint' ? 'Pour cette fiche, un simple indice.' : 'Cette fois, sans aide.'}</p>
        <div class="d5-floor-tabs" role="tablist" aria-label="Vos fiches">${tabs}</div>
        <div class="h8-pages" role="group" aria-label="Les pages de la fiche">${pageTabs}</div>
        <p class="h7-question">${esc(page.ask)}</p>
        <div class="h8-fields">${page.fields.map(fieldHtml).join('')}</div>
        ${nav}
        ${bilan}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: stepDone(2) ? kit.submit('Écrire mes règles d’or') : '' })}`;
  }

  /* ── 3 · Vos règles d'or ─────────────────────────────────────────────── */
  const themeChips = () => { const c = covered(); return themes.map(t => `<span class="h8-theme ${c.includes(t) ? 'is-on' : ''}" data-theme="${t.id}"><span class="h7-dot ${c.includes(t) ? 'is-ok' : ''}" aria-hidden="true"></span>${esc(t.text)}</span>`).join(''); };
  function rulesStep() {
    const done = yes('rok');
    const c = covered();
    const missing = themes.filter(t => !c.includes(t));
    const tone = c.length >= 5 ? 'ok' : c.length >= 4 ? 'mid' : 'ko';
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Vos 5 règles d’or</p>
        <p class="a4-role">La première page de la banque de Lucas : cinq règles courtes, qu’il gardera en tête au comptoir.</p>
        <div class="h8-rules-grid">
          <div class="h8-rules">${[0, 1, 2, 3, 4].map(i => `<div class="h7-write h8-rule"><span class="h8-rule-n">${i + 1}</span>${ex.field(`r${i}`, `Règle ${i + 1}`, { placeholder: i === 0 ? 'Je commence large, je finis précis.' : 'Votre règle…', max: 160, type: 'input', hideLabel: true })}</div>`).join('')}</div>
          <aside class="h7-aside"><p class="h7-aside-h"><span>Ce que vos règles couvrent</span>En direct</p><div class="h8-themes" aria-live="polite">${themeChips()}</div></aside>
        </div>
        ${done ? msgBox(tone, `<p>Vos règles couvrent ${c.length} thème${c.length > 1 ? 's' : ''} sur ${themes.length}.${missing.length ? ` Il vous en manque : ${esc(missing.map(t => t.text).join(' ; '))}.` : ''}</p><div class="h7-msg-model"><span>Un exemple de règles d’or</span>${content.rulesExample.map((x, i) => `<p>${i + 1}. ${esc(x)}</p>`).join('')}</div>`, c.length >= 5 ? 'Bien vu !' : 'Presque complet')
          : `<div class="h7-actions">${kit.act('h8-rules-check', `${icon('check', { size: 18 })}<span>Vérifier mes règles</span>`, 'primary')}</div>`}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: done ? kit.submit('Préparer le test terrain') : '' })}`;
  }

  /* ── 4 · Le test terrain (facultatif) ────────────────────────────────── */
  const myQuestions = () => chosen().flatMap((s, j) => ['o1', 'o2', 'c1', 'c2'].map(id => v(`f${j}_${id}`)).filter(kit.filled));
  function terrainStep() {
    const done = yes('tok') || yes('tskip');
    const qs = myQuestions();
    const pick = v('t_q');
    return `<section class="k-panel d5-panel h7-panel">
        <p class="k-label">Le test terrain · facultatif</p>
        <p class="a4-role">Choisissez une de vos questions, et dites quand vous la poserez. Après le test, notez ce qu’elle a fait dire au client.</p>
        <div class="h8-qpick" role="group" aria-label="Vos questions">${qs.map((x, i) => `<button type="button" class="h7-rank-item h8-qitem ${pick === x ? 'is-on' : ''}" data-act="h8-tq" data-i="${i}" ${done ? 'disabled' : ''}><span class="h7-dm-tick" aria-hidden="true">${pick === x ? icon('check', { size: 14, strokeWidth: 3 }) : ''}</span><span>${q(x)}</span></button>`).join('')}</div>
        <div class="h7-write h8-field"><p class="h8-field-label">Quand, et avec quel client ?</p>${ex.field('t_when', 'Quand', { placeholder: 'Jeudi, avec le prochain client qui « regarde juste »…', max: 200, type: 'input', hideLabel: true })}</div>
        ${done ? msgBox('ok', yes('tok') ? `<p>C’est noté : vous testerez ${q(pick || '')}. Après le test, ajoutez ce qu’elle a fait dire au client : c’est ce qui rendra votre banque vivante.</p>` : '<p>Vous avez passé cette étape. Vous pourrez tester une question plus tard.</p>', yes('tok') ? 'Bon test !' : 'Étape passée')
          : `<div class="h7-actions">${kit.act('h8-tskip', '<span>Passer cette étape</span>', 'secondary small')}${kit.act('h8-tok', `${icon('check', { size: 18 })}<span>Je m’engage à tester</span>`, 'primary')}</div>`}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: done ? kit.submit('Passer à la grille') : '' })}`;
  }

  /* ── 5 · La grille ───────────────────────────────────────────────────── */
  function grid() {
    return `<section class="k-panel d5-panel">
        <p class="k-label">Auto-évaluation · avant l’exemple</p>
        <p class="d5-intro">Vérifiez votre banque avec la grille. Votre tuteur utilisera la même.</p>
        ${kit.matrix({ key: 'self', rows: content.selfCheck, columns: YES_NO, head: 'Critère', round: true })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: kit.submit('Voir ma banque') })}`;
  }

  /* ── Le corrigé : votre banque complète, puis l'exemple ──────────────── */
  const bankText = () => [
    `Banque de questions · ${v('metier') || ''}`, '',
    'Mes 5 règles d’or :', ...[0, 1, 2, 3, 4].map(i => `  ${i + 1}. ${v(`r${i}`) || ''}`), '',
    ...chosen().flatMap((s, j) => [s.title.toUpperCase(), ...ALLFIELDS.map(f => `  ${f.label} : ${v(`f${j}_${f.id}`) || ''}`), ''])
  ].join('\n');
  function review() {
    const list = chosen();
    const yesCount = content.selfCheck.filter((_, i) => v(`self${i}`) === 'oui').length;
    const c = covered();
    return `<section class="k-panel h6-review h7-review">
        <p class="k-label">Votre parcours</p>
        <ul class="h7-path">
          <li><span>Le bon réflexe</span>${reflexRight()} sur 3 trouvés du premier coup</li>
          <li><span>Vos fiches</span>${qScore()} questions sur ${QFIELDS.length * 3} au point</li>
          <li><span>Vos règles d’or</span>${c.length} thèmes sur ${themes.length} couverts</li>
          <li><span>Le test terrain</span>${yes('tok') ? 'prévu' : 'passé'}</li>
        </ul>
      </section>
      <section class="k-panel h6-review h7-review">
        <p class="k-label">La banque de Lucas · ${esc(v('metier') || '')}</p>
        <div class="h8-bank">
          <div class="h8-bank-block"><p class="h8-bank-h">Mes 5 règles d’or</p><ol>${[0, 1, 2, 3, 4].map(i => `<li>${esc(v(`r${i}`) || '')}</li>`).join('')}</ol></div>
          ${list.map((s, j) => `<div class="h8-bank-block"><p class="h8-bank-h">${esc(s.title)}</p><dl>${ALLFIELDS.map(f => `<div><dt>${esc(f.label)}</dt><dd>${f.kind === 'q' ? q(v(`f${j}_${f.id}`) || '') : esc(v(`f${j}_${f.id}`) || '')}</dd></div>`).join('')}</dl></div>`).join('')}
        </div>
        <div class="h6-copy">${kit.act('h8-copy', `${icon('document', { size: 18 })}<span>Copier ma banque</span>`, 'secondary small')}<span>Pour la remettre à Lucas, ou à votre tuteur.</span></div>
      </section>
      <section class="k-panel h6-review h7-review">
        <p class="k-label">Un exemple · magasin d’électroménager</p>
        <p class="h7-review-line">Il n’existe pas de réponse unique : comparez la forme, pas le métier.</p>
        ${content.model.map(m => `<div class="h8-bank-block"><p class="h8-bank-h">${esc(m.title)}</p><p class="h7-review-line">${esc(m.text)}</p></div>`).join('')}
      </section>
      <section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yesCount}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${v(`self${i}`) === 'oui' ? '2' : '0'}">${v(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      ${kit.keyPoint ? kit.keyPoint(content.keyPoint) : ''}
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing() && stepDone(0);
    const k = at();
    let body;
    if (reviewing) body = review();
    else if (k === 0 && !yes('intro')) body = introScreen();
    else if (!yes(`tr${k}`)) body = transition(k);
    else body = [situationsStep, reflexStep, fichesStep, rulesStep, terrainStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page h7-page h8-root">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return yes('sitok') ? [] : [{ key: 'sit', message: 'Choisissez et validez vos 3 situations.' }];
    if (k === 1) return stepDone(1) ? [] : [{ key: 'sit', message: 'Trouvez le bon réflexe pour chaque situation.' }];
    if (k === 2) return stepDone(2) ? [] : [{ key: 'sit', message: 'Remplissez et vérifiez vos trois fiches.' }];
    if (k === 3) return yes('rok') ? [] : [{ key: 'r0', message: 'Écrivez et vérifiez vos 5 règles d’or.' }];
    if (k === 4) return stepDone(4) ? [] : [{ key: 't_when', message: 'Engagez-vous à tester une question, ou passez cette étape.' }];
    const missing = content.selfCheck.findIndex((_, i) => !values[`self${i}`]);
    return missing === -1 ? [] : [{ key: `self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < LAST && stepDone(k)) { ex.setValue('at', k + 1); ficheJ = null; pageP = 0; return true; }
    return false;
  }

  const feedback = () => ['Votre tuteur peut vous faire un retour sur votre banque, avec la même grille.'];

  kit.on({
    'h8-go': control => go(Number(control.dataset.index)),
    'h8-tr': control => { advance(`tr${Number(control.dataset.k)}`); window.scrollTo({ top: 0, behavior: 'instant' }); },
    'h8-intro': () => {
      if (!filled('metier')) { core.toast('Dites d’abord votre métier, en une ligne.'); return; }
      advance('intro'); window.scrollTo({ top: 0, behavior: 'instant' });
    },
    // Choisir une situation : mise à jour sur place (pas de clignotement).
    'h8-sit': control => {
      if (yes('sitok')) return;
      const id = control.dataset.id;
      const now = chosenIds();
      const on = !now.includes(id);
      if (on && now.length >= 3) { core.toast('Trois situations au plus : retirez-en une d’abord.'); return; }
      const nextIds = on ? [...now, id] : now.filter(x => x !== id);
      ex.setValue('sit', nextIds); ex.changed();
      control.classList.toggle('is-on', on);
      control.setAttribute('aria-pressed', String(on));
      control.querySelector('.h7-dm-tick').innerHTML = on ? icon('check', { size: 14, strokeWidth: 3 }) : '';
      const count = document.querySelector('.h7-count b');
      if (count) count.textContent = String(nextIds.length);
      const check = document.querySelector('[data-act="h8-sit-check"]');
      if (check) check.disabled = nextIds.length !== 3;
    },
    'h8-sit-check': () => { if (chosenIds().length === 3) { advance('sitok'); showMsg(); } },
    'h8-pick': control => {
      const j = Number(control.dataset.j);
      const id = control.dataset.id;
      if (!choiceAt(j)) { ex.setValue(`x${j}`, [id]); advance(`c${j}`, id); return; }
      if (!yes(`retry${j}`) || tries(j).includes(id)) return;
      ex.setValue(`x${j}`, [...tries(j), id]);
      advance(`retry${j}`, false);
    },
    'h8-retry': control => advance(`retry${Number(control.dataset.j)}`, true),
    'h8-ack': control => { advance(`ack${Number(control.dataset.j)}`); window.scrollTo({ top: 0, behavior: 'instant' }); },
    'h8-fiche': control => { ficheJ = Number(control.dataset.j); pageP = 0; ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); },
    'h8-page': control => { pageP = Number(control.dataset.p); ex.rebuild(); },
    'h8-fiche-check': control => {
      const j = Number(control.dataset.j);
      const empty = ALLFIELDS.find(f => !filled(`f${j}_${f.id}`));
      if (empty) { pageP = pages.findIndex(p => p.fields.includes(empty)); ex.rebuild(); core.toast(`Remplissez « ${empty.label} ».`); return; }
      ficheJ = j; advance(`f${j}_ok`); showMsg();
    },
    'h8-rules-check': () => {
      if ([0, 1, 2, 3, 4].some(i => !filled(`r${i}`))) { core.toast('Écrivez vos 5 règles d’or.'); return; }
      advance('rok'); showMsg();
    },
    'h8-tq': control => {
      const x = myQuestions()[Number(control.dataset.i)];
      ex.setValue('t_q', x); ex.changed();
      document.querySelectorAll('.h8-qitem').forEach(b => { const on = b === control; b.classList.toggle('is-on', on); b.querySelector('.h7-dm-tick').innerHTML = on ? icon('check', { size: 14, strokeWidth: 3 }) : ''; });
    },
    'h8-tok': () => {
      if (!filled('t_q')) { core.toast('Choisissez la question que vous testerez.'); return; }
      if (!filled('t_when')) { core.toast('Dites quand, et avec quel client.'); return; }
      advance('tok'); showMsg();
    },
    'h8-tskip': () => { advance('tskip'); showMsg(); },
    'h8-copy': () => {
      const done = () => core.toast('Votre banque est copiée.');
      const fail = () => core.toast('Copie impossible : sélectionnez le texte de votre banque.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(bankText()).then(done, fail);
      else fail();
    }
  });

  /* En direct, sans redessiner l'écran : le type de chaque question écrite,
   * et les thèmes couverts par les règles d'or. */
  document.addEventListener('input', event => {
    const field = event.target && event.target.dataset && event.target.dataset.field;
    if (!field) return;
    const m = /^f\d_(.+)$/.exec(field);
    if (m) {
      const f = QFIELDS.find(x => x.id === m[1]);
      const badge = f && document.querySelector(`[data-badge="${field}"]`);
      if (badge) badge.innerHTML = badgeHtml(f, event.target.value);
      return;
    }
    if (/^r\d$/.test(field)) {
      const box = document.querySelector('.h8-themes');
      if (box) setTimeout(() => { box.innerHTML = themeChips(); }, 0);
    }
  });

  kit.tour(KEY, [
    { target: '.h6-stage, .k-panel', title: 'Votre banque', text: 'Pour Lucas, le nouveau collègue : trois situations de votre métier, le bon réflexe, une fiche de questions pour chacune, puis vos règles d’or.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'Les situations, le bon réflexe, vos fiches, vos règles d’or, le test terrain, puis la grille.' }
  ]);

  ex.mount(KEY, { screen, validate, feedback, intercept, compactFeedback: true });
})();
