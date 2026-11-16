/* S5 5.2 · Votre guide, votre découverte (fiche M1.2.2, A5, activité socle).
 *
 * Cinq étapes : choisir un client ; préparer son guide (les cinq étages de
 * l'entonnoir) ; mener la découverte avec un client virtuel (on écrit sa
 * question pour un thème, puis on découvre la réponse du client, une à la
 * fois, comme le recommande la note formateur) ; analyser (besoin implicite,
 * motivation dominante, hiérarchie, questions à améliorer) ; la grille Oui /
 * Non. Puis le corrigé : ce qu'une bonne découverte devait faire émerger,
 * l'exemple de guide, et ce qu'il faut déposer.
 *
 * Toutes les réponses sont rangées par client (\`<client>_<champ>\`) : changer
 * de client garde le travail de chacun.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const ouvert = window.AtelierOuvert;
  const { esc, icon } = kit;
  const KEY = 's5-5.2';
  const content = window.ATELIER_S5['5.2'];
  const { fiches, floors } = content;
  const STEPS = ['Le client', 'Votre guide', 'La découverte', 'L’analyse', 'La grille'];
  const LAST = STEPS.length - 1;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];

  const fiche = () => fiches.find(f => f.id === ex.value('fiche')) || null;
  const K = name => `${(fiche() || {}).id || 'x'}_${name}`;
  const val = name => ex.value(K(name));
  const asked = f => f.topics.map((_, i) => i).filter(i => ex.value(`${f.id}_ask${i}`) === true);

  const stepDone = k => {
    const f = fiche();
    if (k === 0) return Boolean(f);
    if (!f) return false;
    if (k === 1) return floors.every(fl => kit.filled(val(fl.id)));
    if (k === 2) return asked(f).length >= content.minAsked;
    if (k === 3) return ['implicite', 'prio'].every(n => kit.filled(val(n))) && Boolean(val('motivation'));
    return content.selfCheck.every((_, i) => Boolean(val(`self${i}`)));
  };
  const reachable = k => Array.from({ length: k }, (_, i) => i).every(stepDone);
  const at = () => {
    const asked0 = Number(ex.value('at')) || 0;
    if (reachable(asked0)) return Math.min(asked0, LAST);
    const free = STEPS.findIndex((_, k) => !stepDone(k));
    return free === -1 ? LAST : free;
  };
  const go = k => { ex.setValue('at', k); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); };

  /* La barre d'étapes des autres exercices, dans l'en-tête. */
  function progress(k) {
    const arrow = (i, dir) => {
      const ok = i >= 0 && i <= LAST && reachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="d5-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEPS.map((label, i) => `<button type="button" class="k-progress-seg ${stepDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="d5-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${arrow(k - 1, 'prev')}<span class="k-progress-label">${esc(STEPS[k])}</span><strong>${k + 1} / ${STEPS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${arrow(k + 1, 'next')}</p>`;
  }

  const portrait = name => esc(core.asset(`assets/illustrations/clients/${name}.webp`));
  const head = f => `<p class="k-label">${esc(f.sector)} · ${esc(f.name)}</p><p class="a4-role">${esc(f.context)}</p>`;

  /* ── 0 · Le client ──────────────────────────────────────────────────── */
  function choose() {
    const chosen = ex.value('fiche');
    return `<section class="k-panel a5-choose">
        <p class="k-label">Choisissez le client le plus proche de votre futur métier</p>
        <p class="a5-choose-help">Vous préparez votre guide, puis vous menez <strong>une découverte</strong> avec ce client.</p>
        <div class="a5-fiches" role="radiogroup" aria-label="Le client">${fiches.map((x, i) => `<button type="button" class="a5-fiche ${chosen === x.id ? 'is-on' : ''}" role="radio" aria-checked="${chosen === x.id}" data-act="d5-fiche" data-id="${esc(x.id)}" ${i === 0 ? 'data-field="fiche"' : ''}>
            <span class="a5-fiche-art"><img src="${portrait(x.portrait)}" alt="" decoding="async"></span>
            <span class="a5-fiche-body"><span class="a5-fiche-sector">${esc(x.sector)}</span><strong>${esc(x.title)}</strong><span class="a5-fiche-who">${esc(x.profile)}</span></span>
            <span class="a5-fiche-check" aria-hidden="true">${icon('check', { size: 16, strokeWidth: 3 })}</span>
          </button>`).join('')}</div>
        <p class="a5-choose-rule">${icon('ban', { size: 15 })}<span>${esc(content.forbidden)}</span></p>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: kit.submit('Préparer mon guide') })}`;
  }

  let floorPick = null;
  /* ── 1 · Le guide ───────────────────────────────────────────────────── */
  function guide() {
    const f = fiche();
    // L'étage affiché : le premier encore vide, ou celui choisi dans les onglets.
    const floorAt = Number.isInteger(floorPick) ? floorPick : Math.max(0, floors.findIndex(fl => !kit.filled(val(fl.id))));
    return `<section class="k-panel d5-panel">
        ${head(f)}
        <p class="d5-intro">Pour chaque étage de l’entonnoir, écrivez 2 ou 3 questions que vous poserez à ${esc(f.name)}.</p>
        <div class="d5-floor-tabs" role="tablist" aria-label="Les étages de l’entonnoir">${floors.map((fl, i) => `<button type="button" class="d5-floor-tab ${i === floorAt ? 'is-current' : ''} ${kit.filled(val(fl.id)) ? 'is-filled' : ''}" role="tab" aria-selected="${i === floorAt}" data-act="d5-floor" data-i="${i}"><span class="d5-floor-n">${kit.filled(val(fl.id)) ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(fl.title)}</span></button>`).join('')}</div>
        <ol class="d5-floors is-one">${floors.map((fl, i) => `<li class="d5-floor" ${i === floorAt ? '' : 'hidden'}>
          <p class="d5-floor-title"><span class="d5-floor-n">${i + 1}</span>Étage ${i + 1} sur ${floors.length} · ${esc(fl.title)}</p>
          <p class="fm-sub">${esc(fl.aim)}</p>
          ${ex.field(K(fl.id), fl.title, { placeholder: 'Vos questions, une par ligne…', max: 600, rows: 5, hideLabel: true })}
          <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="d5-floor" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Étage précédent</span></button>` : '<span></span>'}${i < floors.length - 1 ? `<button type="button" class="button secondary" data-act="d5-floor" data-i="${i + 1}"><span>Étage suivant</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>
        </li>`).join('')}</ol>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('d5-prev', 'Changer de client'), right: kit.submit('Mener la découverte') })}`;
  }

  /* ── 2 · La découverte, avec le client virtuel ──────────────────────── */
  /* La découverte en conversation : à gauche le fil (vos questions, ses
   * réponses), à droite le thème à explorer et votre question, puis
   * « Découvrir sa réponse ». */
  let topicPick = null;
  function discovery() {
    const f = fiche();
    const done = asked(f);
    const open = f.topics.map((_, i) => i).filter(i => ex.value(`${f.id}_ask${i}`) !== true);
    const cur = open.includes(topicPick) ? topicPick : open[0];
    const thread = done.length ? done.map(i => `<li class="d5-msg is-you"><p><span>Vous · ${esc(f.topics[i].label)}</span>«&nbsp;${esc(val(`q${i}`))}&nbsp;»</p></li>
        <li class="d5-msg is-client"><img src="${portrait(f.portrait)}" alt="" aria-hidden="true"><p><span>${esc(f.name)}</span>«&nbsp;${esc(f.topics[i].answer)}&nbsp;»</p></li>`).join('')
      : `<li class="d5-thread-empty">Posez votre première question : la réponse de ${esc(f.name)} s’affichera ici.</li>`;
    const ok = done.length >= content.minAsked;
    return `<section class="k-panel d5-panel">
        ${head(f)}
        <div class="d5-chat">
          <div class="d5-chat-thread">
            <p class="d5-chat-count ${ok ? 'is-ok' : ''}"><b>${done.length}</b> question${done.length > 1 ? 's' : ''} posée${done.length > 1 ? 's' : ''} · au moins ${content.minAsked}</p>
            <ol class="d5-thread">${thread}</ol>
          </div>
          <div class="d5-chat-ask">${cur === undefined ? `<p class="d5-chat-done">Vous avez exploré tous les thèmes. Passez à l’analyse.</p>` : `
            <p class="fm-label">1 · Choisissez un thème</p>
            <div class="d5-topic-chips" role="radiogroup" aria-label="Les thèmes">${open.map(i => `<button type="button" class="d5-topic-chip ${i === cur ? 'is-on' : ''}" role="radio" aria-checked="${i === cur}" data-act="d5-topic" data-i="${i}">${esc(f.topics[i].label)}</button>`).join('')}</div>
            <p class="fm-label">2 · Écrivez votre question</p>
            ${ex.field(K(`q${cur}`), `Votre question sur : ${f.topics[cur].label}`, { placeholder: 'Votre question…', max: 300, rows: 3, hideLabel: true })}
            <div class="d5-chat-send">${kit.act('d5-ask', `${icon('chat', { size: 16 })}<span>Découvrir sa réponse</span>`, 'primary', `data-i="${cur}"`)}</div>`}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('d5-prev', 'Revenir à mon guide'), right: kit.submit('Analyser ma découverte') })}`;
  }

  /* ── 3 · L'analyse ──────────────────────────────────────────────────── */
  /* L'analyse : à gauche ce que le client a dit (en bulles), à droite une
   * question à la fois, avec ses onglets. Tous les champs restent dans la
   * page (les autres sont masqués) : rien ne se perd en changeant d'onglet. */
  let anaPick = 0;
  const ANA = ['Le besoin implicite', 'La motivation', 'La hiérarchie', 'À reformuler'];
  function analysis() {
    const f = fiche();
    const said = asked(f).map(i => `<li class="d5-msg is-client"><img src="${portrait(f.portrait)}" alt="" aria-hidden="true"><p><span>${esc(f.topics[i].label)}</span>«&nbsp;${esc(f.topics[i].answer)}&nbsp;»</p></li>`).join('');
    const mot = val('motivation');
    const filled = [kit.filled(val('implicite')), Boolean(mot), kit.filled(val('prio')), kit.filled(val('ameliorer'))];
    const pane = (i, body) => `<div class="d5-ana-pane" ${i === anaPick ? '' : 'hidden'}>${body}
        <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="d5-ana" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Question précédente</span></button>` : '<span></span>'}${i < ANA.length - 1 ? `<button type="button" class="button secondary" data-act="d5-ana" data-i="${i + 1}"><span>Question suivante</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div></div>`;
    return `<section class="k-panel d5-panel">
        ${head(f)}
        <div class="d5-chat d5-ana">
          <div class="d5-chat-thread d5-ana-said"><p class="d5-chat-count">Ce que ${esc(f.name)} vous a dit</p><ol class="d5-thread">${said}</ol></div>
          <div class="d5-ana-main">
            <div class="d5-floor-tabs" role="tablist" aria-label="Les questions de l’analyse">${ANA.map((t, i) => `<button type="button" class="d5-floor-tab ${i === anaPick ? 'is-current' : ''} ${filled[i] ? 'is-filled' : ''}" role="tab" aria-selected="${i === anaPick}" data-act="d5-ana" data-i="${i}"><span class="d5-floor-n">${filled[i] ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${t}</span></button>`).join('')}</div>
            ${pane(0, `<div class="fm-field"><p class="fm-label">Un besoin implicite que vous avez découvert</p><p class="fm-sub">Ce dont ${esc(f.name)} a besoin sans l’avoir demandé, avec ses mots.</p>
              ${ex.field(K('implicite'), 'Le besoin implicite', { placeholder: 'Son vrai besoin…', max: 400, rows: 4, hideLabel: true })}</div>`)}
            ${pane(1, `<div class="fm-field"><p class="fm-label">Sa motivation dominante</p><p class="fm-sub">Ce qui pèse le plus dans sa décision.</p>
              <div class="d5-motivs" role="radiogroup" aria-label="La motivation dominante">${content.motivations.map((m, i) => `<button type="button" class="a4-self-pill ${mot === m.id ? 'is-on' : ''}" role="radio" aria-checked="${mot === m.id}" data-act="d5-motiv" data-id="${m.id}" ${i === 0 ? `data-field="${K('motivation')}"` : ''}>${esc(m.label)}</button>`).join('')}</div></div>`)}
            ${pane(2, `<div class="fm-field"><p class="fm-label">Votre hiérarchie provisoire</p><p class="fm-sub">Chaque niveau s’appuie sur les mots du client. Seul le premier est obligatoire.</p>
              <div class="d5-hier is-stack">
                <label><span class="d5-hier-k is-p">Prioritaire</span>${ex.field(K('prio'), 'Le besoin prioritaire', { placeholder: 'Le besoin prioritaire…', max: 300, rows: 2, hideLabel: true })}</label>
                <label><span class="d5-hier-k is-i">Important</span>${ex.field(K('important'), 'Un besoin important', { placeholder: 'Facultatif', max: 300, rows: 2, hideLabel: true })}</label>
                <label><span class="d5-hier-k is-s">Secondaire</span>${ex.field(K('secondaire'), 'Un besoin secondaire', { placeholder: 'Facultatif', max: 300, rows: 2, hideLabel: true })}</label>
              </div></div>`)}
            ${pane(3, `<div class="fm-field"><p class="fm-label">Deux questions que vous reformuleriez, et comment</p><p class="fm-sub">Facultatif : relisez vos questions à gauche.</p>
              ${ex.field(K('ameliorer'), 'Deux questions à reformuler', { placeholder: '« J’ai demandé… ; je demanderais plutôt… »', max: 600, rows: 4, hideLabel: true })}</div>`)}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('d5-prev', 'Revenir à la découverte'), right: kit.submit('Passer à la grille') })}`;
  }

  /* ── 4 · La grille Oui / Non ────────────────────────────────────────── */
  function grid() {
    return `<section class="k-panel d5-panel">
        <p class="k-label">Auto-évaluation · avant le corrigé</p>
        <p class="d5-intro">Votre tuteur utilisera la même grille.</p>
        ${kit.matrix({ key: K('self'), rows: content.selfCheck, columns: YES_NO, head: 'Critère', round: true })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('d5-prev', 'Revenir à l’analyse'), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Le corrigé ─────────────────────────────────────────────────────── */
  const MARK = { ok: '✓', part: '◐', miss: '○', warn: '!' };
  function scored(index, title, name, model) {
    const text = val(name);
    const bloc = ouvert && ouvert.blocOf(KEY, index);
    const pts = bloc && bloc.max ? Math.round(bloc.earned / bloc.max * 10 * 2) / 2 : null;
    const chips = bloc && kit.filled(text) ? `<ul class="a4-expect">${bloc.lines.map(item => {
      const tip = item.kind === 'warn' ? `Repéré : ${(item.found || []).map(w => `« ${w} »`).join(', ')}. ${item.conseil || ''}` : item.kind === 'ok' ? '' : (item.conseil || '');
      return `<li class="is-${item.kind}" ${tip ? `tabindex="0" data-tip="${esc(tip)}"` : ''}><span aria-hidden="true">${MARK[item.kind] || ''}</span>${esc(item.nom)}</li>`;
    }).join('')}</ul>` : '';
    return `<div class="a5-review-step">
      <div class="a5-rv-head"><h2 class="a5-review-title">${esc(title)}</h2>${pts !== null ? `<span class="a4-just-score"><b>${String(pts).replace('.', ',')}</b> / 10</span>` : ''}</div>
      <div class="a5-rv-grid">
        <div class="a5-rv-you"><p class="a5-rv-label">Vous</p>${ouvert ? ouvert.quote(KEY, index, text) : `<p>« ${esc(text)} »</p>`}${chips}</div>
        <div class="a5-rv-model"><p class="a5-rv-label">Ce qu’il fallait faire émerger</p><p class="a5-rv-model-text">${esc(model)}</p></div>
      </div>
    </div>`;
  }

  const allText = f => [
    `Découverte avec ${f.name} · ${f.title}`, '',
    'MON GUIDE', ...floors.map((fl, i) => `${i + 1}. ${fl.title} : ${val(fl.id)}`), '',
    'MES QUESTIONS', ...asked(f).map(i => `${f.topics[i].label} : « ${val(`q${i}`)} » → « ${f.topics[i].answer} »`), '',
    'MON ANALYSE', `Besoin implicite : ${val('implicite')}`,
    `Motivation dominante : ${(content.motivations.find(m => m.id === val('motivation')) || {}).label || ''}`,
    `Prioritaire : ${val('prio')}`, `Important : ${val('important')}`, `Secondaire : ${val('secondaire')}`,
    `Questions à reformuler : ${val('ameliorer')}`
  ].join('\n');

  function review() {
    const f = fiche();
    if (ouvert) ouvert.forCase(KEY, fiches.indexOf(f));
    const total = ouvert && ouvert.result(KEY);
    const motOk = val('motivation') === f.motivation;
    const label = id => (content.motivations.find(m => m.id === id) || {}).label || '–';
    const yes = content.selfCheck.filter((_, i) => val(`self${i}`) === 'oui').length;
    return `<section class="k-panel a5-review">
        <p class="a4-review-head"><span class="k-label">${esc(f.sector)} · ${esc(f.title)} · ${esc(f.name)}</span>${total ? `<span class="a4-review-count">Votre analyse : <b>${String(total.points).replace('.', ',')}</b> / 10</span>` : ''}</p>
        ${scored(0, 'Le besoin implicite', 'implicite', f.emerge.implicites)}
        ${scored(1, 'Le besoin prioritaire', 'prio', f.emerge.prioritaire)}
        <div class="a5-review-step">${kit.picked(motOk, label(val('motivation')), label(f.motivation), 'La motivation dominante', f.emerge.motivations)}</div>
      </section>
      <section class="k-panel a5-review">
        <p class="k-label">Ce qu’une bonne découverte devait faire émerger</p>
        <dl class="d5-emerge">
          <dt>Besoin explicite</dt><dd>${esc(f.emerge.explicite)}</dd>
          <dt>Besoins implicites</dt><dd>${esc(f.emerge.implicites)}</dd>
          <dt>Motivations</dt><dd>${esc(f.emerge.motivations)}</dd>
          <dt>Prioritaire</dt><dd>${esc(f.emerge.prioritaire)}</dd>
          <dt>Question clé à ne pas oublier</dt><dd>${esc(f.emerge.cle)}</dd>
        </dl>
        <p class="a5-rv-label d5-guide-label">Un exemple de guide</p>
        <p class="d5-guide-model">${esc(f.guide)}</p>
        ${f.note ? `<p class="k-muted">${esc(f.note)}</p>` : ''}
      </section>
      <section class="k-panel a5-review">
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yes}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${val(`self${i}`) === 'oui' ? '2' : '0'}">${val(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      <section class="k-panel a5-deposit">
        <div class="a5-dep-head">
          <p class="k-label">${icon('folder', { size: 16 })} À déposer sur la plateforme</p>
          ${kit.act('d5-copy', `${icon('document', { size: 18 })}<span>Copier mon guide et mon analyse</span>`, 'primary small')}
        </div>
        <p class="a5-dep-after">${esc(content.deposit)}</p>
        <pre class="a5-copy-text">${esc(allText(f))}</pre>
      </section>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing() && fiche();
    const k = at();
    const body = reviewing ? review() : [choose, guide, discovery, analysis, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    const f = fiche();
    if (k === 0 || !f) return values.fiche ? [] : [{ key: 'fiche', message: 'Choisissez un client.' }];
    const v = name => values[`${f.id}_${name}`];
    if (k === 1) { const fl = floors.find(x => !kit.filled(v(x.id))); return fl ? [{ key: `${f.id}_${fl.id}`, message: `Écrivez vos questions pour l’étage « ${fl.title} ».` }] : []; }
    if (k === 2) return asked(f).length >= content.minAsked ? [] : [{ key: `${f.id}_q0`, message: `Posez au moins ${content.minAsked} questions (${asked(f).length} pour l’instant).` }];
    if (k === 3) {
      const errors = [];
      if (!kit.filled(v('implicite'))) errors.push({ key: `${f.id}_implicite`, message: 'Écrivez un besoin implicite.' });
      if (!v('motivation')) errors.push({ key: `${f.id}_motivation`, message: 'Choisissez sa motivation dominante.' });
      if (!kit.filled(v('prio'))) errors.push({ key: `${f.id}_prio`, message: 'Écrivez le besoin prioritaire.' });
      return errors;
    }
    const missing = content.selfCheck.findIndex((_, i) => !v(`self${i}`));
    return missing === -1 ? [] : [{ key: `${f.id}_self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < LAST && stepDone(k)) { ex.setValue('at', k + 1); return true; }
    return false;
  }

  const feedback = () => ['Pensez à déposer votre guide et votre analyse : votre tuteur vous répondra avec la même grille.'];

  kit.on({
    'd5-go': control => go(Number(control.dataset.index)),
    'd5-prev': () => go(Math.max(0, at() - 1)),
    'd5-floor': control => { floorPick = Number(control.dataset.i); ex.changed(); kit.commit(); },
    'd5-fiche': control => {
      ex.setValue('fiche', control.dataset.id);
      ex.changed();
      document.querySelectorAll('.a5-fiche').forEach(card => {
        const on = card.dataset.id === control.dataset.id;
        card.classList.toggle('is-on', on);
        card.setAttribute('aria-checked', String(on));
      });
    },
    'd5-topic': control => { topicPick = Number(control.dataset.i); ex.rebuild(); },
    'd5-ana': control => { anaPick = Number(control.dataset.i); ex.rebuild(); },
    'd5-ask': control => {
      const i = Number(control.dataset.i);
      if (!kit.filled(val(`q${i}`))) { core.toast('Écrivez d’abord votre question.'); document.querySelector(`[data-field="${K(`q${i}`)}"]`)?.focus(); return; }
      ex.setValue(K(`ask${i}`), true);
      ex.changed();
      ex.rebuild();
    },
    'd5-motiv': control => {
      ex.setValue(K('motivation'), control.dataset.id);
      ex.changed();
      document.querySelectorAll('[data-act="d5-motiv"]').forEach(b => {
        const on = b.dataset.id === control.dataset.id;
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-checked', String(on));
      });
    },
    'd5-copy': () => {
      const text = allText(fiche());
      const done = () => core.toast('Votre guide et votre analyse sont copiés : collez-les dans votre dépôt.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => core.toast('Copie impossible : sélectionnez le texte ci-dessous.'));
      else core.toast('Copie impossible : sélectionnez le texte ci-dessous.');
    }
  });

  kit.tour('s5-5.2', [
    { target: '.a5-fiches', title: 'Votre client', text: 'Choisissez le client le plus proche de votre futur métier.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'Votre guide, la découverte avec le client, votre analyse, puis la grille.' }
  ]);

  ex.mount(KEY, { screen, validate, feedback, intercept, compactFeedback: true });
})();
