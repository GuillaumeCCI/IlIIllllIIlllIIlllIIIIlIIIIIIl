/* S1 1.2 · Décomposez l'argument.
 *
 * Trois surligneurs : C, A, P. On choisit un surligneur, puis on clique les
 * mots (ou on les balaie en maintenant le bouton) pour les colorer. Cliquer
 * un mot déjà de la couleur active l'efface. Deux arguments à traiter ; le
 * corrigé compare, mot à mot, le découpage attendu.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.2'];

  const PARTS = [
    { id: 'C', label: 'Caractéristique', tone: 'c' },
    { id: 'A', label: 'Avantage', tone: 'a' },
    { id: 'P', label: 'Preuve', tone: 'p' }
  ];

  /* Chaque argument, mis à plat en mots, avec la composante attendue. */
  const tokens = content.arguments.map(segments => segments.flatMap(segment =>
    segment.text.split(/\s+/).filter(Boolean).map(word => ({ word, part: segment.part }))));

  const current = () => Math.min(Math.max(0, Number(ex.value('arg')) || 0), tokens.length - 1);
  const tool = () => PARTS.some(p => p.id === ex.value('tool')) ? ex.value('tool') : 'C';
  const marks = a => kit.list(`marks${a}`, tokens[a].length, null).map(v => (['C', 'A', 'P'].includes(v) ? v : null));
  const done = a => ex.value(`done${a}`) === true;
  const used = a => PARTS.filter(p => marks(a).includes(p.id)).length;

  /* Qualité d'une composante : part des mots attendus bien colorés, et
   * mots colorés à tort. */
  function quality(a, part) {
    const m = marks(a);
    const expected = tokens[a].map((t, i) => (t.part === part ? i : -1)).filter(i => i >= 0);
    const hit = expected.filter(i => m[i] === part).length;
    const extra = m.filter((v, i) => v === part && tokens[a][i].part !== part).length;
    return { ratio: expected.length ? hit / expected.length : 0, extra, ok: hit / expected.length >= 0.8 && extra <= 1 };
  }

  function sentence(a, editable, show = null) {
    const m = show || marks(a);
    return tokens[a].map((t, i) => {
      const part = m[i];
      const cls = part ? `hl hl-${part.toLowerCase()}` : '';
      return editable
        ? `<button type="button" class="hl-word ${cls}" data-word="${i}" aria-pressed="${Boolean(part)}" aria-label="${esc(t.word)}${part ? `, surligné ${part}` : ''}">${esc(t.word)}</button>`
        : `<span class="hl-word ${cls}">${esc(t.word)}</span>`;
    }).join(' ');
  }

  /* Une pastille par argument : bleue pour celui en cours, pâle sinon. */
  const dots = a => `<span class="k-dots" aria-hidden="true">${tokens.map((_, i) => `<span class="k-dot ${i === a ? 'is-current' : done(i) ? 'is-done' : ''}"></span>`).join('')}</span>`;

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const a = current();
    const t = tool();
    const n = used(a);
    /* Mise en page des maquettes : l'argument d'abord, sur sa carte ; les
     * surligneurs en dessous, sur une ligne ; pas de panneau autour. */
    return `<div class="k-page hl-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${tokens.filter((_, i) => done(i)).length} / ${tokens.length}</strong> arguments complétés ${dots(a)}</p>${kit.contextButton()}${kit.tourButton()}` })}
      <form class="hl-stage" novalidate>
        <div class="hl-argument">
          <span class="hl-tag">Argument ${a + 1}</span>
          <span class="hl-quote">${icon('quote', { size: 40 })}</span>
          <p class="hl-text">${sentence(a, true)}</p>
        </div>
        <p class="hl-lead"><strong>Choisissez</strong> un surligneur, puis sélectionnez le passage correspondant.</p>
        <div class="hl-tools" role="radiogroup" aria-label="Surligneur actif">${PARTS.map(p =>
          `<button type="button" class="hl-tool tone-${p.tone} ${p.id === t ? 'is-active' : ''}" data-act="tool" data-part="${p.id}" role="radio" aria-checked="${p.id === t}">
            <span class="hl-pen">${icon('highlighter', { size: 26 })}</span>
            <strong class="hl-tool-letter">${p.id}</strong><span class="hl-tool-label">${p.label}</span>
          </button>`).join('')}</div>
        ${core.errorsBox()}
        ${kit.bar({
          left: kit.act('clear', `${icon('trash', { size: 17 })}<span>Effacer les surlignages</span>`, 'secondary', marks(a).some(Boolean) ? '' : 'disabled'),
          center: `${n} / 3 composantes repérées`,
          right: kit.submit(tokens.every((_, i) => i === a || done(i)) ? 'Vérifier mon découpage' : 'Argument suivant', n === 3 ? '' : 'data-pending="true"')
        })}
      </form>
      ${kit.utility('Corrigé disponible après les 2 arguments')}
    </div>`;
  }

  /* Le texte surligné en plages continues : les mots voisins de même
   * couleur forment un seul surlignage, comme sur la maquette. */
  function ranges(a, show) {
    const out = [];
    tokens[a].forEach((t, k) => {
      const part = show[k] || null;
      const last = out[out.length - 1];
      if (last && last.part === part) last.words.push(t.word);
      else out.push({ part, words: [t.word] });
    });
    return out.map(r => r.part
      ? `<span class="hl-range hl-${r.part.toLowerCase()}">${esc(r.words.join(' '))}</span>`
      : esc(r.words.join(' '))).join(' ');
  }

  /* Relecture : un argument à la fois, votre découpage à gauche, celui du
   * corrigé à droite, avec les mêmes couleurs. */
  function reviewScreen() {
    const a = Math.min(Math.max(0, Number(ex.value('reviewArg')) || 0), tokens.length - 1);
    const next = (a + 1) % tokens.length;
    return `<div class="k-page hl-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${a + 1}</strong> sur <strong>${tokens.length}</strong> arguments ${tokens.map((_, n) => `<button type="button" class="k-dot ${n === a ? 'is-current' : ''}" data-act="review-arg" data-index="${n}" aria-label="Argument ${n + 1}"></button>`).join('')}</p>` })}
      <div class="hl-compare">
        <section class="k-panel hl-side">
          <p class="hl-side-head"><span class="hl-side-icon">${icon('user', { size: 22 })}</span><span class="hl-side-pill">Votre découpage</span></p>
          <p class="hl-side-text"><span class="hl-side-quote">${icon('quote', { size: 30 })}</span><span>${ranges(a, marks(a))}</span></p>
        </section>
        <span class="hl-compare-arrow" aria-hidden="true">${icon('arrowRight', { size: 28 })}</span>
        <section class="k-panel hl-side is-model">
          <p class="hl-side-head"><span class="hl-side-icon">${icon('check', { size: 22 })}</span><span class="hl-side-pill">Découpage du corrigé</span></p>
          <p class="hl-side-text"><span class="hl-side-quote">${icon('quote', { size: 30 })}</span><span>${ranges(a, tokens[a].map(t => t.part))}</span></p>
        </section>
      </div>
      <div class="hl-tools is-legend">${PARTS.map(p => `<span class="hl-tool tone-${p.tone}"><span class="hl-pen">${icon('highlighter', { size: 22 })}</span><strong class="hl-tool-letter">${p.id}</strong><span class="hl-tool-label">${p.label}</span></span>`).join('')}</div>
      <p class="k-center k-muted">Les mêmes couleurs sont utilisées pour votre découpage et pour le corrigé.</p>
      <div class="k-bar hl-review-bar">
        <div class="k-bar-left">${kit.reset()}</div><div></div>
        <div class="k-bar-right">${kit.act('review-arg', `<span>${next ? 'Argument suivant' : 'Revoir l’argument 1'}</span>${icon('arrowRight', { size: 18 })}`, 'primary with-icon', `data-index="${next}"`)}</div>
      </div>
      ${core.feedbackBox()}
    </div>`;
  }

  function validate() {
    const a = current();
    if (used(a) < 3) return [{ key: 'marks', message: `Repérez les trois composantes de l’argument ${a + 1} (${used(a)} sur 3).` }];
    const missing = tokens.findIndex((_, i) => i !== a && !done(i));
    if (missing !== -1) return [{ key: 'arg', message: `Décomposez aussi l’argument ${missing + 1}.` }];
    return [];
  }

  function intercept() {
    const a = current();
    if (used(a) < 3) return false;
    ex.setValue(`done${a}`, true);
    const next = tokens.findIndex((_, i) => !done(i));
    if (next === -1) return false;
    ex.setValue('arg', next);
    return true;
  }

  function feedback() {
    const ok = tokens.reduce((sum, _, a) => sum + PARTS.filter(p => quality(a, p.id).ok).length, 0);
    return [`${ok} composante${ok > 1 ? 's' : ''} sur ${tokens.length * 3} délimitée${ok > 1 ? 's' : ''} avec précision.`];
  }

  /* Surlignage au clic et au balayage. Le balayage applique à chaque mot
   * survolé le même geste que sur le premier : colorer ou effacer. */
  let isPainting = false;
  let paintValue = null;

  function startPaint(node) {
    const t = tool();
    paintValue = marks(current())[Number(node.dataset.word)] === t ? null : t;
    paint(node);
  }

  function paint(node) {
    const a = current();
    const m = marks(a);
    m[Number(node.dataset.word)] = paintValue;
    ex.setValue(`marks${a}`, m);
    node.className = `hl-word ${paintValue ? `hl hl-${paintValue.toLowerCase()}` : ''}`;
  }

  function onMount() {
    core.$$('[data-word]').forEach(node => {
      node.addEventListener('pointerdown', event => {
        event.preventDefault();
        isPainting = true;
        startPaint(node);
      });
      node.addEventListener('pointerenter', () => { if (isPainting) paint(node); });
      /* Au clavier, Entrée ou Espace déclenche un clic sans pointeur. */
      node.addEventListener('click', event => {
        if (event.detail !== 0) return;
        startPaint(node);
        ex.changed();
        ex.rebuild();
        core.$(`[data-word="${node.dataset.word}"]`)?.focus();
      });
    });
  }

  /* Fin du balayage, où que le bouton soit relâché. */
  document.addEventListener('pointerup', () => {
    if (!isPainting) return;
    isPainting = false;
    ex.changed();
    ex.rebuild();
  });

  kit.on({
    'review-arg': el => { ex.setValue('reviewArg', Number(el.dataset.index)); kit.commit(); },
    tool: el => { ex.setValue('tool', el.dataset.part); kit.commit(); },
    clear: () => { ex.setValue(`marks${current()}`, tokens[current()].map(() => null)); kit.commit(); }
  });

  // Visite guidée de l'écran, lancée d'elle-même la première fois. L'aperçu
  // montre, sur une phrase d'exemple, comment passer d'un surligneur à l'autre.
  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  kit.context([
    ['target', 'Un argument', 'Un argument de vente efficace se construit en trois parties.'],
    ['document', 'La caractéristique', 'Ce qu’est le produit, ce qu’il a.'],
    ['sparkle', 'L’avantage', 'Ce que le client y gagne.'],
    ['award', 'La preuve', 'Ce qui montre que c’est vrai.'],
    ['pencil', 'Ce qui vous est demandé', 'Surligner ces trois parties dans chaque argument.']
  ], 'Les trois parties d’un argument');

  kit.tour('s1-1.2', [
    { target: '.hl-argument', title: 'L’argument', text: 'Lisez l’argument : vous allez y surligner ses trois composantes.' },
    { target: '.hl-tools .hl-tool', title: 'Les trois surligneurs', text: 'Un exemple, sur une autre phrase :',
      preview: kit.hlDemo({
        tools: PARTS.map((p, i) => ({ letter: p.id, label: p.label, tone: ['blue', 'green', 'gold'][i] })),
        parts: [
          { text: 'Notre siège se règle en hauteur', tool: 0 },
          { text: ': votre dos est soulagé toute la journée.', tool: 1 },
          { text: '9 clients sur 10 le recommandent.', tool: 2 }
        ]
      }),
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur un surligneur pour le choisir.' },
        { symbol: 'highlighter', tone: 'gold', text: 'Cliquez sur les mots, ou maintenez le clic pour en surligner plusieurs.' },
        { symbol: 'refresh', tone: 'green', text: 'Changez de surligneur pour passer à la couleur suivante.' }
      ] },
    { target: '.hl-page .k-count', title: 'Deux arguments', text: 'Vous découpez 2 arguments. Les points montrent celui en cours.' },
    { target: '.hl-page .k-bar', title: 'Avancer',
      items: [
        { symbol: 'trash', tone: 'coral', text: '« Effacer les surlignages » recommence l’argument.' },
        { symbol: 'chart', tone: 'blue', text: 'Au centre, le nombre de composantes déjà repérées.' },
        { symbol: 'arrowRight', tone: 'green', text: 'Les 3 composantes repérées, passez à l’argument suivant.' }
      ] }
  ]);

  ex.mount('s1-1.2', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
