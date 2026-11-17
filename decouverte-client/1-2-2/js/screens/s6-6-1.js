/* S6 6.1 · L'entretien dont vous êtes le héros (fiche M1.2.2, synthèse
 * optionnelle, option 2).
 *
 * Trois étapes : le scénario (sept choix de question, une jauge de
 * découverte, la réaction de la cliente aussitôt, puis une fin selon la
 * jauge) ; la carte des besoins (six rubriques, une à la fois, avec la
 * conversation à gauche) ; la grille Oui / Non. Puis le corrigé : votre
 * parcours face au parcours optimal, votre carte face à l'exemple.
 *
 * Valeurs : `c0`…`c6` (le choix à chaque étape), `m_<rubrique>` (la carte),
 * `self0`…`self6` (la grille), `at` (l'étape en cours).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const KEY = 's6-6.1';
  const content = window.ATELIER_S6['6.1'];
  const { client, steps, endings, map } = content;
  const STEPS = ['Le scénario', 'La carte des besoins', 'La grille'];
  const LAST = STEPS.length - 1;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];

  /* ── Le scénario : choix faits, jauge, fin ───────────────────────────── */
  const choiceAt = k => ex.value(`c${k}`) || null;
  const played = () => steps.filter((_, k) => choiceAt(k)).length;
  const scenarioDone = () => played() === steps.length;
  // La jauge après chaque choix, bornée de 0 à 10.
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

  const stepDone = k => {
    if (k === 0) return scenarioDone();
    if (k === 1) return map.every(r => !r.required || kit.filled(ex.value(`m_${r.id}`)));
    return content.selfCheck.every((_, i) => Boolean(ex.value(`self${i}`)));
  };
  const reachable = k => Array.from({ length: k }, (_, i) => i).every(stepDone);
  const at = () => {
    const asked = Number(ex.value('at')) || 0;
    if (reachable(asked)) return Math.min(asked, LAST);
    const free = STEPS.findIndex((_, k) => !stepDone(k));
    return free === -1 ? LAST : free;
  };
  const go = k => { ex.setValue('at', k); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); };
  // Au scénario, la conversation s'ouvre sur son dernier message.
  const toLatest = () => requestAnimationFrame(() => {
    const list = document.querySelector('.h6-chat .d5-thread');
    if (!list) return;
    list.style.scrollBehavior = 'auto'; list.scrollTop = list.scrollHeight; list.style.scrollBehavior = '';
    // Les bulles animées grandissent la liste : on la suit jusqu'au bout.
    [500, 1100, 1700, 2300, 2900].forEach(ms => setTimeout(() => { list.scrollTop = list.scrollHeight; }, ms));
    // Les trois points disparaissent quand la réponse arrive.
    setTimeout(() => list.querySelectorAll('.h6-typing').forEach(dot => dot.remove()), 1350);
  });

  function progress(k) {
    const arrow = (i, dir) => {
      const ok = i >= 0 && i <= LAST && reachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="h6-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEPS.map((label, i) => `<button type="button" class="k-progress-seg ${stepDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="h6-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${arrow(k - 1, 'prev')}<span class="k-progress-label">${esc(STEPS[k])}</span><strong>${k + 1} / ${STEPS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${arrow(k + 1, 'next')}</p>`;
  }

  const portrait = esc(core.asset(`assets/illustrations/clients/${client.portrait}.webp`));
  const head = () => `<p class="k-label">Concession automobile · ${esc(client.name)}, ${esc(client.role.toLowerCase())}</p><p class="a4-role">${esc(client.context)}</p>`;
  const q = text => `«&nbsp;${esc(text)}&nbsp;»`;

  /* La conversation jusqu'ici : pour chaque étape jouée, ce qui se passe,
   * ce que dit la cliente, votre question, sa réaction. `upto` : jusqu'où. */
  let askAt = 0; // l'instant (en s) où la colonne de droite peut apparaître
  const at$ = t => `style="animation-delay:${t.toFixed(2)}s"`;
  function thread(upto, { withCurrent = true } = {}) {
    const items = [];
    // L'étape jouée : votre question, les trois points, sa réponse.
    const played$ = fresh >= 0 ? steps[fresh].choices[choiceAt(fresh)] : null;
    let clock = played$ ? (played$.reply ? 1.55 : 0.55) : 0;
    steps.forEach((s, k) => {
      if (k > upto || (k === upto && !withCurrent)) return;
      // L'étape suivante arrive ensuite, une bulle après l'autre.
      const next = fresh >= 0 && k === fresh + 1;
      // Une bulle de l'étape suivante : son instant, puis l'horloge avance.
      const later = gap => { if (!next) return ''; const style = at$(clock); clock += gap; return style; };
      if (s.scene) items.push(`<li class="h6-scene ${next ? 'h6-in' : ''}" ${later(0.55)}>${esc(s.scene)}</li>`);
      if (s.says) items.push(`<li class="d5-msg is-client ${next ? 'h6-in' : ''}" ${later(0.65)}><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(s.says)}</p></li>`);
      if (s.after) items.push(`<li class="h6-scene ${next ? 'h6-in' : ''}" ${later(0.55)}>${esc(s.after)}</li>`);
      const c = s.choices[choiceAt(k)];
      if (!c) return;
      const anim = k === fresh;
      items.push(`<li class="d5-msg is-you ${anim ? 'h6-in is-you-in' : ''}"><p><span>Vous · étape ${k + 1}</span>${q(c.text)}</p></li>`);
      if (c.reply && anim) items.push('<li class="h6-typing" aria-hidden="true"><span></span><span></span><span></span></li>');
      if (c.reply) items.push(`<li class="d5-msg is-client ${anim ? 'h6-in is-reply-in' : ''}"><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(c.reply)}</p></li>`);
    });
    askAt = fresh >= 0 ? clock + 0.2 : 0;
    return items.join('');
  }

  const gaugeBar = (value, label = 'Jauge de découverte') => `<div class="h6-gauge" role="img" aria-label="${esc(label)} : ${value} sur 10">
      <span class="h6-gauge-label">${esc(label)}</span>
      <span class="h6-gauge-track"><span class="h6-gauge-fill tone-${value >= 8 ? 'ok' : value >= 4 ? 'mid' : 'ko'}" style="width:${value * 10}%"></span></span>
      <strong>${value} / 10</strong>
    </div>`;

  /* ── 0 · Le scénario ─────────────────────────────────────────────────── */
  let lastDelta = null;
  let fresh = -1; // l'étape qui vient d'être jouée (animée une fois)
  function scenario() {
    const k = played();
    const done = scenarioDone();
    const s = steps[k];
    const end = ending();
    const delta = lastDelta === null ? '' : `<span class="h6-delta is-${lastDelta > 0 ? 'up' : lastDelta < 0 ? 'down' : 'same'}">${lastDelta > 0 ? `+${lastDelta}` : lastDelta === 0 ? '=' : lastDelta}</span>`;
    return `<section class="k-panel d5-panel h6-panel">
        ${head()}
        <div class="d5-chat h6-chat">
          <div class="d5-chat-thread">
            <div class="h6-gauge-row">${gaugeBar(gauge())}${delta}</div>
            <ol class="d5-thread">${thread(done ? steps.length - 1 : k)}</ol>
          </div>
          <div class="d5-chat-ask h6-ask">${done ? `
            <div class="h6-end tone-${end.tone} h6-in" ${at$(askAt)}>
              <p class="k-label">La fin de votre partie</p>
              <p class="h6-end-title">${esc(end.title)}</p>
              <div class="d5-msg is-client"><img src="${portrait}" alt="" aria-hidden="true"><p><span>${esc(client.name)}</span>${q(end.says)}</p></div>
              <p class="h6-end-text">${esc(end.text)}</p>
            </div>
            <p class="fm-sub h6-in" ${at$(askAt + 0.3)}>Votre partie est jouée : c’est elle qui compte pour votre carte. L’analyse de vos choix arrive au corrigé.</p>` : `
            <p class="k-label h6-in" ${at$(askAt)}>Étape ${k + 1} sur ${steps.length}</p>
            <p class="fm-label h6-in" ${at$(askAt + 0.1)}>${esc(s.prompt || 'Quelle question posez-vous ?')}</p>
            <div class="h6-choices" role="group" aria-label="Les questions possibles">${s.order.map((id, n) => `<button type="button" class="h6-choice h6-in" ${at$(askAt + 0.3 + n * 0.18)} data-act="h6-pick" data-step="${k}" data-id="${id}" ${id === s.order[0] ? 'data-field="c' + k + '"' : ''}>${q(s.choices[id].text)}</button>`).join('')}</div>`}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: kit.submit('Construire ma carte des besoins') })}`;
  }

  /* ── 1 · La carte des besoins ────────────────────────────────────────── */
  let mapPick = 0;
  function mapStep() {
    const filled = map.map(r => kit.filled(ex.value(`m_${r.id}`)));
    const pane = (i, r) => `<div class="d5-ana-pane" ${i === mapPick ? '' : 'hidden'}>
        <div class="fm-field"><p class="fm-label">${esc(r.label)}</p><p class="fm-sub">${esc(r.sub)}</p>
          ${ex.field(`m_${r.id}`, r.label, { placeholder: r.placeholder, max: 700, rows: 5, hideLabel: true })}</div>
        <div class="d5-floor-nav">${i > 0 ? `<button type="button" class="text-button with-icon" data-act="h6-map" data-i="${i - 1}">${icon('arrowLeft', { size: 16 })}<span>Rubrique précédente</span></button>` : '<span></span>'}${i < map.length - 1 ? `<button type="button" class="button secondary" data-act="h6-map" data-i="${i + 1}"><span>Rubrique suivante</span>${icon('arrowRight', { size: 16 })}</button>` : ''}</div>
      </div>`;
    return `<section class="k-panel d5-panel h6-panel">
        <p class="k-label">La carte des besoins de ${esc(client.name)}</p>
        <p class="a4-role">Elle servira à votre argumentation. Appuyez-vous sur votre partie : vos questions et ses réponses sont à gauche.</p>
        <div class="d5-chat d5-ana">
          <div class="d5-chat-thread d5-ana-said"><div class="h6-gauge-row">${gaugeBar(gauge(), 'Votre jauge finale')}</div><ol class="d5-thread">${thread(steps.length - 1)}</ol></div>
          <div class="d5-ana-main">
            <div class="d5-floor-tabs" role="tablist" aria-label="Les rubriques de la carte">${map.map((r, i) => `<button type="button" class="d5-floor-tab ${i === mapPick ? 'is-current' : ''} ${filled[i] ? 'is-filled' : ''}" role="tab" aria-selected="${i === mapPick}" data-act="h6-map" data-i="${i}"><span class="d5-floor-n">${filled[i] ? icon('check', { size: 13, strokeWidth: 3 }) : i + 1}</span><span>${esc(r.tab)}</span></button>`).join('')}</div>
            ${map.map((r, i) => pane(i, r)).join('')}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('h6-prev', 'Revoir ma partie'), right: kit.submit('Passer à la grille') })}`;
  }

  /* ── 2 · La grille Oui / Non ─────────────────────────────────────────── */
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
    ...map.map(r => `${r.label.replace(/^\d+ · /, '')} : ${ex.value(`m_${r.id}`) || ''}`)
  ].join('\n');

  function review() {
    const end = ending();
    const best = steps.filter((s, k) => choiceAt(k) === s.best).length;
    const yes = content.selfCheck.filter((_, i) => ex.value(`self${i}`) === 'oui').length;
    const pathRows = steps.map((s, k) => {
      const id = choiceAt(k);
      const c = s.choices[id] || {};
      const ok = id === s.best;
      // Le verdict en mots, puis l'explication de VOTRE choix ; à droite, la
      // meilleure question et pourquoi, seulement si ce n'était pas la vôtre.
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
      const text = ex.value(`m_${r.id}`);
      return `<div class="fm-rv-row">
          <p class="fm-rv-label">${esc(r.label.replace(/^\d+ · /, ''))}</p>
          <div class="fm-rv-you">${kit.filled(text) ? `<p class="result-answer-text">${esc(text)}</p>` : '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>'}</div>
          <div class="fm-rv-model"><p>${esc(r.model)}</p></div>
        </div>`;
    }).join('');
    return `<section class="k-panel h6-review">
        <p class="a4-review-head"><span class="k-label">Votre partie</span><span class="a4-review-count"><b>${best}</b> / ${steps.length} meilleurs choix</span></p>
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
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yes}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${ex.value(`self${i}`) === 'oui' ? '2' : '0'}">${ex.value(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      ${kit.keyPoint ? kit.keyPoint(content.keyPoint) : ''}
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const k = at();
    const body = reviewing ? review() : [scenario, mapStep, grid][k]();
    return `<div class="k-page a4-page a5-page d5-page h6-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${body}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return scenarioDone() ? [] : [{ key: `c${played()}`, message: `Jouez le scénario jusqu’au bout (${played()} étape${played() > 1 ? 's' : ''} sur ${steps.length}).` }];
    if (k === 1) {
      const missing = map.findIndex(r => r.required && !kit.filled(values[`m_${r.id}`]));
      if (missing !== -1) mapPick = missing;
      return missing === -1 ? [] : [{ key: `m_${map[missing].id}`, message: `Remplissez la rubrique « ${map[missing].tab} » de votre carte.` }];
    }
    const missing = content.selfCheck.findIndex((_, i) => !values[`self${i}`]);
    return missing === -1 ? [] : [{ key: `self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < LAST && stepDone(k)) { ex.setValue('at', k + 1); lastDelta = null; fresh = -1; return true; }
    return false;
  }

  const feedback = () => ['Votre tuteur peut vous faire un retour sur votre carte, avec la même grille.'];

  kit.on({
    'h6-go': control => go(Number(control.dataset.index)),
    'h6-prev': () => go(Math.max(0, at() - 1)),
    'h6-pick': control => {
      const k = Number(control.dataset.step);
      if (choiceAt(k) || k !== played()) return; // un choix fait reste fait
      ex.setValue(`c${k}`, control.dataset.id);
      lastDelta = gaugeAfter(k + 1) - gaugeAfter(k);
      fresh = k;
      ex.changed();
      ex.rebuild();
      toLatest();
    },
    'h6-map': control => { mapPick = Number(control.dataset.i); ex.rebuild(); },
    'h6-copy': () => {
      const done = () => core.toast('Votre carte est copiée.');
      const fail = () => core.toast('Copie impossible : sélectionnez le texte de votre carte.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(mapText()).then(done, fail);
      else fail();
    }
  });

  kit.tour(KEY, [
    { target: '.h6-gauge', title: 'La jauge de découverte', text: 'Elle part de 5. Elle monte quand votre question fait parler la cliente, elle baisse quand elle ferme l’échange.' },
    { target: '.h6-choices', title: 'Vos questions', text: 'À chaque étape, choisissez une question. Un choix fait ne se reprend pas : c’est votre partie.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'Le scénario, la carte des besoins, puis la grille.' }
  ]);

  ex.mount(KEY, { screen, validate, feedback, intercept, compactFeedback: true, onMount: toLatest });
})();
