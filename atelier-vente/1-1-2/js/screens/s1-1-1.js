/* S1 1.1 · Trouvez l'intrus.
 *
 * Trois séries de quatre cartes. Pour chacune, deux temps :
 *   1. REPÉRER : cliquer la carte qui n'appartient pas au trio ;
 *   2. CLASSER : dire si le trio restant réunit des caractéristiques, des
 *      avantages ou des preuves.
 * Le corrigé s'affiche une fois les trois séries validées.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.1'];
  const series = content.series;
  const letters = ['A', 'B', 'C'];
  // Vignettes peintes de la colonne gauche du corrigé, une par série.
  const SIDE_ART = ['assets/illustrations/s3/accueil/3-1.webp', 'assets/illustrations/s2/accueil/2-4.webp', 'assets/illustrations/s3/accueil/3-5.webp'];

  const serie = () => Math.min(Math.max(0, Number(ex.value('serie')) || 0), series.length - 1);
  const intruder = i => { const v = ex.value(`intruder${i}`); return Number.isInteger(v) ? v : null; };
  const category = i => ex.value(`category${i}`) || '';
  const done = i => ex.value(`done${i}`) === true;
  const doneCount = () => series.filter((_, i) => done(i)).length;
  const stageOf = i => (Number(ex.value(`stage${i}`)) === 2 && intruder(i) !== null ? 2 : 1);

  /* Les pastilles A · B · C, pour passer d'une série à l'autre. */
  function serieTabs(at) {
    return `<div class="k-tabs" role="tablist">${series.map((_, i) =>
      `<button type="button" role="tab" class="k-tab ${i === at ? 'is-active' : ''} ${done(i) ? 'is-done' : ''}" data-act="serie" data-index="${i}" aria-selected="${i === at}">
        <span class="k-tab-dot">${done(i) ? icon('check', { size: 14 }) : letters[i]}</span><span>Série ${letters[i]}</span>
      </button>`).join('')}</div>`;
  }

  /* L'illustration d'une carte : l'image fournie, sinon son pictogramme
   * posé sur une tache de couleur, dans le même esprit. */
  const TONES = ['blue', 'coral', 'green', 'lilac'];
  function picture(i, n) {
    const text = series[i].cards[n];
    const src = (content.pictures || {})[text];
    if (src) return `<span class="intrus-picture"><img src="${esc(core.webAsset(src))}" alt="" decoding="async"></span>`;
    const name = (series[i].icons || [])[n];
    return name ? `<span class="intrus-picture is-icon"><span class="intrus-blob">${icon(name, { size: 54, strokeWidth: 1.6 })}</span></span>` : '';
  }

  /* Une carte : bandeau teinté, numéro, illustration, texte. Chaque position
   * a sa teinte (bleu, corail, vert, lilas). Un clic désigne l'intrus : la
   * carte reste en place, marquée « Intrus » ; un second clic l'annule. */
  function stepOne(i) {
    const cards = series[i].cards;
    const out = intruder(i);
    return `<div class="intrus-cards">${cards.map((text, n) => `
        <button type="button" class="intrus-card tone-${TONES[n % TONES.length]} ${n === out ? 'is-out' : ''}" data-act="discard" data-index="${n}" aria-pressed="${n === out}" aria-label="${n === out ? 'Intrus choisi' : 'Désigner comme intrus'}, carte ${n + 1} : ${esc(text)}">
          <span class="intrus-band">${n === out ? `<span class="intrus-tag">${icon('close', { size: 14 })}Intrus</span>` : ''}</span>
          <span class="intrus-number">${n + 1}</span>
          ${picture(i, n)}
          <span class="intrus-text">${esc(text)}</span>
        </button>`).join('')}</div>`;
  }

  function stepTwo(i) {
    const cards = series[i].cards;
    const out = intruder(i);
    const chosen = category(i);
    const icons = series[i].icons || [];
    return `<div class="intrus-cards is-trio">${cards.map((text, n) => n === out ? '' :
        `<div class="intrus-card is-static has-art">${picture(i, n) || (icons[n] ? `<span class="intrus-symbol">${icon(icons[n], { size: 46, strokeWidth: 1.5 })}</span>` : '')}<span class="intrus-text">${esc(text)}</span></div>`).join('')}</div>
      <div class="cap-options" role="radiogroup" aria-label="Catégorie du trio">${content.categories.map(option => `
        <label class="cap-option tone-${option.id} ${chosen === option.id ? 'is-chosen' : ''}">
          <span class="cap-letter">${option.id}</span>
          <strong>${esc(option.label)}</strong>
          <input type="radio" name="category${i}" data-field="category${i}" value="${option.id}" ${chosen === option.id ? 'checked' : ''}>
        </label>`).join('')}</div>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = serie();
    const at = stageOf(i);
    /* Étape 2 : titre propre, en-tête aligné à gauche (maquette). */
    const title = at === 1 ? content.title : 'Identifiez la bonne catégorie';
    const subtitle = at === 1
      ? 'Cliquez sur la carte qui n’appartient pas au trio, puis identifiez sa catégorie.'
      : 'L’intrus a été écarté. Choisissez la nature commune aux trois cartes.';
    const ready = at === 1 ? intruder(i) !== null : Boolean(category(i));

    /* Mise en page des maquettes : en-tête centré, les cartes posées sur le
     * fond, sans panneau ni fil d'étapes ; les séries A · B · C en haut à
     * droite. Les cartes elles-mêmes sont des boutons : un clic ou Entrée
     * écarte la carte, sans rangée de touches à part. */
    return `<div class="k-page intrus-page stage-${at}">
      ${kit.head({ eyebrow: content.eyebrow, title, subtitle, aside: serieTabs(i) })}
      <form class="intrus-stage" novalidate>
        ${at === 1 ? stepOne(i) : stepTwo(i)}
        ${core.errorsBox()}
        ${kit.bar({
          left: at === 1
            ? kit.act('restore', 'Annuler', 'secondary', intruder(i) === null ? 'disabled' : '')
            : kit.act('to-step1', `${icon('arrowLeft', { size: 18 })}<span>Revenir à l’intrus</span>`, 'secondary with-icon'),
          right: kit.submit(at === 1 ? 'Continuer' : 'Valider la réponse', ready ? '' : 'data-pending="true"')
        })}
      </form>
      ${kit.utility('Corrigé disponible après les 3 séries')}
    </div>`;
  }

  /* ── Relecture : les trois séries, carte par carte ───────────────────── */
  function reviewScreen() {
    const label = id => content.categories.find(option => option.id === id)?.label || '';
    const rightIntruders = series.filter((s, i) => intruder(i) === s.intruder).length;
    const rightCategories = series.filter((s, i) => category(i) === s.category).length;

    /* Maquette « Votre analyse » : pastille Corrigé, grand titre, les deux
     * scores et la liste cochée en haut à droite ; puis une bande par série
     * (pastille et vignette peinte à gauche, les quatre cartes, l'explication
     * sous une ampoule). */
    const stat = (symbol, right, text) => `<p class="ir-stat"><span class="ir-stat-symbol">${icon(symbol, { size: 26, strokeWidth: 2.4 })}</span><span><strong>${right} / ${series.length}</strong><small>${esc(text)}</small></span></p>`;
    return `<div class="k-page ir-review">
      <header class="arv-head ir-head">
        <div class="arv-head-text"><p class="corrige-tag">Corrigé</p><h1>Votre analyse</h1><p class="arv-subtitle">Voici l’analyse de chaque trio, avec la bonne position et une explication.</p></div>
        <div class="ir-stats">${stat('search', rightIntruders, 'intrus repérés')}${stat('check', rightCategories, 'trios bien classés')}</div>
        <img class="arv-art ir-art" src="${esc(core.asset('assets/illustrations/corrige-checklist.webp'))}" alt="" decoding="async">
      </header>
      ${series.map((s, i) => {
        const okCategory = category(i) === s.category;
        const [, lead = '', rest = s.why] = /^(Intrus : la carte \d+\.)\s*(.*)$/s.exec(s.why) || [];
        return `<section class="ir-serie">
          <div class="ir-side"><span class="ir-pill">Série ${letters[i]}</span><img class="ir-side-art" src="${esc(core.asset(SIDE_ART[i % SIDE_ART.length]))}" alt="" decoding="async"></div>
          <div class="ir-main">
            <div class="intrus-cards is-review">${s.cards.map((text, n) => {
              const isAnswer = n === s.intruder;
              const isChosen = n === intruder(i);
              return `<div class="intrus-card is-static ${isAnswer ? 'is-answer' : isChosen ? 'is-wrong' : ''}">
                <span class="intrus-text">${esc(text)}</span>
                ${isAnswer ? kit.mark(true, isChosen ? 'Votre intrus, correct' : 'L’intrus') : isChosen ? kit.mark(false, 'Votre choix') : ''}
              </div>`;
            }).join('')}</div>
            <div class="ir-note"><span class="ir-bulb">${icon('lightbulb', { size: 26 })}</span>
              <div><p>${lead ? `<strong>${esc(lead)}</strong> ` : ''}${esc(rest)}</p>
              <p class="ir-trio">${kit.picked(okCategory, label(category(i)), label(s.category), 'Trio')}</p></div>
            </div>
          </div>
        </section>`;
      }).join('')}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  /* ── Validation ───────────────────────────────────────────────────────── */
  function validate() {
    const i = serie();
    if (stageOf(i) === 1 && intruder(i) === null) return [{ key: 'intruder', message: 'Écartez d’abord la carte intruse.' }];
    if (stageOf(i) === 2 && !category(i)) return [{ key: `category${i}`, message: 'Choisissez la catégorie du trio.' }];
    const missing = series.findIndex((_, n) => n !== i && !done(n));
    if (missing !== -1) return [{ key: 'serie', message: `Terminez aussi la série ${letters[missing]}.` }];
    return [];
  }

  /* Avance d'une étape, ou d'une série, sans conclure l'exercice. */
  function intercept() {
    const i = serie();
    if (stageOf(i) === 1) {
      if (intruder(i) === null) return false;
      ex.setValue(`stage${i}`, 2);
      return true;
    }
    if (!category(i)) return false;
    ex.setValue(`done${i}`, true);
    const next = series.findIndex((_, n) => !done(n));
    if (next === -1) return false;
    ex.setValue('serie', next);
    return true;
  }

  function feedback() {
    const right = series.filter((s, i) => intruder(i) === s.intruder && category(i) === s.category).length;
    return [`${right} série${right > 1 ? 's' : ''} sur ${series.length} entièrement juste${right > 1 ? 's' : ''}.`];
  }

  function discard(n) {
    const i = serie();
    ex.setValue(`intruder${i}`, intruder(i) === n ? null : n);
    kit.commit();
  }

  kit.on({
    discard: el => discard(Number(el.dataset.index)),
    restore: () => { const i = serie(); ex.setValue(`intruder${i}`, null); ex.setValue(`stage${i}`, 1); kit.commit(); },
    'to-step1': () => { ex.setValue(`stage${serie()}`, 1); kit.commit(); },
    serie: el => { ex.setValue('serie', Number(el.dataset.index)); kit.commit(); }
  });

  ex.mount('s1-1.1', { screen, validate, intercept, feedback, compactFeedback: true });
})();
