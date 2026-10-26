/* BOÎTE À OUTILS DES ÉCRANS 1-1-2 · briques communes aux 24 exercices.
 *
 * Les maquettes du module partagent un vocabulaire : un en-tête (sur-titre,
 * grand titre, sous-titre, compteur à droite), un fil d'étapes numérotées,
 * un bandeau de consigne, une astuce jaune, des grilles « une case par
 * ligne », des cartes à glisser. Ce module les fabrique une fois pour toutes.
 *
 * Il ne porte aucun état : tout reste dans le brouillon de l'exercice
 * (AtelierExercise.value / setValue), donc sauvegardé et restauré.
 *
 * Les commandes passent par l'attribut `data-act`, distinct du `data-action`
 * du moteur : un écran déclare ses réactions avec `kit.on({ nom: fn })`.
 */
(function (root) {
  'use strict';

  const core = () => root.AtelierCore;
  const ex = () => root.AtelierExercise;
  const icon = (...args) => root.AtelierIcons.icon(...args);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ───────────────────────────── Comptages ──────────────────────────── */

  const words = value => (String(value ?? '').trim().match(/\S+/gu) || []).length;
  /* Débit oral moyen d'un pitch : environ 150 mots par minute. */
  const seconds = value => Math.round(words(value) / 2.5);
  const filled = value => String(value ?? '').trim().length > 0;
  const plural = (n, word, many = `${word}s`) => `${n} ${n > 1 ? many : word}`;

  /* L'étape en cours d'un exercice à plusieurs temps, bornée. */
  function stage(max, name = 'stage') {
    const n = Number(ex().value(name)) || 1;
    return Math.min(Math.max(1, n), max);
  }
  const setStage = (n, name = 'stage') => ex().setValue(name, n);

  /* Un tableau sauvegardé, toujours rendu à la bonne longueur. */
  function list(name, length, fill = null) {
    const stored = ex().value(name);
    const result = Array.isArray(stored) ? stored.slice(0, length) : [];
    while (result.length < length) result.push(fill);
    return result;
  }

  /* ─────────────────────────── En-têtes ─────────────────────────────── */

  /* L'en-tête des maquettes : sur-titre, titre, sous-titre, et à droite un
   * compteur (« 0 / 3 séries complétées »). `symbol` ajoute un médaillon. */
  function head({ eyebrow = '', title, subtitle = '', aside = '', symbol = '', note = '' }) {
    return `<header class="k-head">
      ${symbol ? `<span class="k-head-symbol">${icon(symbol, { size: 30 })}</span>` : ''}
      <div class="k-head-text">
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
        <h1>${esc(title)}</h1>
        ${subtitle ? `<p class="k-subtitle">${esc(subtitle)}</p>` : ''}
        ${note ? `<p class="k-note">${esc(note)}</p>` : ''}
      </div>
      ${aside ? `<div class="k-head-aside" data-live="aside">${aside}</div>` : ''}
    </header>`;
  }

  /* Le fil d'étapes : les étapes passées sont cochées, l'étape en cours
   * est pleine, les suivantes sont grisées. `locked` ajoute un cadenas. */
  function steps(labels, at, options = {}) {
    const { locked = false, compact = false, letters = null } = options;
    return `<ol class="k-steps ${compact ? 'is-compact' : ''}">${labels.map((label, i) => {
      const n = i + 1;
      const state = n < at ? 'is-done' : n === at ? 'is-active' : 'is-next';
      const mark = n < at ? icon('check', { size: 16 }) : esc(letters ? letters[i] : n);
      return `<li class="k-step ${state}">
        <span class="k-step-dot">${mark}</span>
        ${locked && n > at ? `<span class="k-step-lock">${icon('lock', { size: 14 })}</span>` : ''}
        <span class="k-step-label">${esc(label)}</span>
      </li>`;
    }).join('')}</ol>`;
  }

  /* Bandeau bleu de consigne, avec le livre ouvert des maquettes. */
  const band = html => `<div class="k-band"><span class="k-band-symbol">${icon('book', { size: 22 })}</span><p>${html}</p></div>`;

  /* Astuce jaune, avec l'ampoule. */
  const tip = text => `<p class="k-tip">${icon('lightbulb', { size: 19 })}<span>${esc(text)}</span></p>`;

  /* Petite ligne d'aide grise, avec une icône. */
  const help = (text, symbol = 'info') => `<p class="k-help">${icon(symbol, { size: 17 })}<span>${esc(text)}</span></p>`;

  /* LE CORRIGÉ EN ÉTAPES : pastille « Corrigé », titre, points numérotés
   * reliés par un trait (titre + explication), illustration de checklist à
   * droite, puis un encadré « ampoule » pour la consigne de comparaison.
   * `items` : [{ title, text }]. Styles : extras.css. */
  const corrige = ({ title, items, note = '' }) =>
    `<section class="k-panel corrige"><p class="corrige-tag">Corrigé</p>
      <h2 class="corrige-title">${esc(title)}</h2>
      <div class="corrige-body">
        <ol class="corrige-steps">${items.map((item, i) => `<li><span class="corrige-n" aria-hidden="true">${i + 1}</span><div><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div></li>`).join('')}</ol>
        <img class="corrige-art" src="${esc(window.AtelierCore.asset('assets/illustrations/corrige-checklist.webp'))}" alt="" decoding="async">
      </div>
      ${note ? `<div class="corrige-note">${icon('lightbulb', { size: 38 })}<p>${esc(note)}</p></div>` : ''}
    </section>`;

  /* LE CORRIGÉ RÉPONSE PAR RÉPONSE : pastille « Corrigé », grand titre,
   * lecteur illustré en haut à droite, puis une carte par question :
   * numéro, étiquette, énoncé, et trois cases « Votre réponse » (rouge si
   * fausse, verte si juste), « Bonne réponse », « Explication ».
   * items : [{ tag?, text, yours, expected, ok, why }]. Styles : extras.css. */
  const answerReview = ({ title = 'Le corrigé', subtitle = '', aside = '', items }) => `<div class="k-page ar-review">
      <header class="arv-head">
        <div class="arv-head-text"><p class="corrige-tag">Corrigé</p><h1>${esc(title)}</h1>${subtitle ? `<p class="arv-subtitle">${esc(subtitle)}</p>` : ''}${aside}</div>
        <img class="arv-art" src="${esc(core().asset('assets/illustrations/corrige-lecteur.webp'))}" alt="" decoding="async">
      </header>
      <ol class="arv-list">${items.map((item, i) => `<li class="arv-item ${item.ok ? 'is-ok' : 'is-ko'}">
        <span class="arv-n" aria-hidden="true">${i + 1}</span>
        <div class="arv-body">
          ${item.tag ? `<p class="arv-tag">${esc(item.tag)}</p>` : ''}
          <p class="arv-text">${esc(item.text)}</p>
          <div class="arv-cells">
            <div class="arv-cell is-yours ${item.ok ? 'is-ok' : 'is-ko'}"><span class="arv-mark">${icon(item.ok ? 'check' : 'close', { size: 16, strokeWidth: 3 })}</span><div><strong>Votre réponse</strong><span>${esc(item.yours || 'Aucune réponse')}</span></div></div>
            <div class="arv-cell is-expected ${item.ok ? 'is-quiet' : ''}"><span class="arv-mark">${icon('check', { size: 16, strokeWidth: 3 })}</span><div><strong>Bonne réponse</strong><span>${esc(item.expected)}</span></div></div>
            <div class="arv-cell is-why">${icon('lightbulb', { size: 26 })}<div><strong>Explication</strong><span>${esc(item.why || '')}</span></div></div>
          </div>
        </div>
      </li>`).join('')}</ol>`;

  /* La carte « citation client » : celle du moteur (core.js). */
  const clientCard = (...args) => core().clientCard(...args);
  const portraitFor = (...args) => core().portraitFor(...args);

  /* ───────────────────────────── Actions ────────────────────────────── */

  const submit = (label, extra = '') =>
    `<button type="submit" class="button primary k-submit" ${extra}><span>${esc(label)}</span>${icon('arrowRight', { size: 18 })}</button>`;

  const act = (name, label, style = 'secondary', extra = '') =>
    `<button type="button" class="button ${style}" data-act="${esc(name)}" ${extra}>${label}</button>`;

  const back = (name, label) =>
    `<button type="button" class="text-button with-icon k-back" data-act="${esc(name)}">${icon('arrowLeft', { size: 17 })}<span>${esc(label)}</span></button>`;

  /* Le bouton « Réinitialiser » demande une confirmation par un second clic. */
  const reset = () => `<button type="button" class="text-button k-reset" data-act="reset">Réinitialiser</button>`;

  /* Un bouton qui ouvre une fenêtre d'aide déclarée par `kit.dialogs`. */
  const dialogButton = (name, label = 'Voir un indice', style = 'secondary', symbol = 'lightbulb') =>
    `<button type="button" class="button ${style} k-dialog-button" data-act="dialog" data-dialog="${esc(name)}">${symbol ? icon(symbol, { size: 18 }) : ''}<span>${esc(label)}</span></button>`;

  /* La barre du bas des maquettes : à gauche, au centre, à droite. */
  const bar = ({ left = '', center = '', right = '' }) =>
    `<div class="k-bar"><div class="k-bar-left">${left}</div><div class="k-bar-center" data-live="center">${center}</div><div class="k-bar-right">${right}</div></div>`;

  /* La ligne utilitaire sous chaque exercice (brouillon, consigne,
   * « Corrigé disponible… ») est retirée : la saisie s'enregistre toute
   * seule. Les écrans l'appellent encore, elle ne produit plus rien. */
  const utility = () => '';

  /* ─────────────────────── Grille « une case par ligne » ────────────── */

  /* Tableau d'affirmations, une colonne par réponse possible. Chaque ligne
   * est un groupe de boutons radio, dessinés en cases à cocher comme sur
   * les maquettes. En relecture (`answers` fourni), la bonne case est verte
   * et le choix erroné rouge. */
  // `progressive` : les lignes apparaissent une à une, chaque réponse
  // dévoilant la suivante (voir l'écouteur plus bas).
  function matrix({ key, rows, columns, head: heading = '', answers = null, numbered = true, round = false, progressive = false }) {
    const reviewing = Array.isArray(answers);
    const open = progressive && !reviewing ? rows.findIndex((_, i) => !filled(ex().value(`${key}${i}`))) : -1;
    return `<table class="k-matrix ${reviewing ? 'is-review' : ''} ${round ? 'is-round' : ''} ${open !== -1 ? 'is-progressive' : ''}">
      <thead><tr><th scope="col" class="k-matrix-label">${esc(heading)}</th>${columns.map(column =>
        `<th scope="col"><strong>${esc(column.label)}</strong>${column.sub ? `<span>${esc(column.sub)}</span>` : ''}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((row, i) => {
        const field = `${key}${i}`;
        const chosen = ex().value(field);
        const verdict = reviewing ? (chosen === answers[i] ? 'is-ok' : 'is-ko') : '';
        return `<tr class="${verdict} ${open !== -1 && i > open ? 'is-waiting' : ''}">
          <th scope="row" class="k-matrix-label">${numbered ? `<span class="k-num">${i + 1}</span>` : ''}<span class="k-matrix-text">${row.quote ? `<strong>${esc(row.title)}</strong><q class="k-matrix-quote">${esc(row.quote)}</q><span class="k-matrix-crit">${esc(row.text)}</span>` : row.title ? `<strong>${esc(row.title)}</strong><small>${esc(row.text)}</small>` : esc(row.text)}${reviewing && row.why ? `<small class="k-why">${esc(row.why)}</small>` : ''}</span></th>
          ${columns.map(column => {
            const isChosen = chosen === column.id;
            if (reviewing) {
              const isAnswer = answers[i] === column.id;
              const state = isAnswer ? 'is-answer' : isChosen ? 'is-wrong' : '';
              return `<td><span class="k-box ${state} ${isChosen ? 'is-checked' : ''}">${isAnswer || isChosen ? icon(isAnswer ? 'check' : 'close', { size: 16, label: isAnswer ? (isChosen ? 'votre réponse, correcte' : 'réponse attendue') : 'votre réponse' }) : ''}</span></td>`;
            }
            return `<td><label class="k-box-label"><input type="radio" class="k-box-input" name="${esc(field)}" data-field="${esc(field)}" value="${esc(column.id)}" ${isChosen ? 'checked' : ''}><span class="k-box" aria-hidden="true">${icon('check', { size: 16 })}</span><span class="sr-only">${esc(row.text)} : ${esc(column.label)}</span></label></td>`;
          }).join('')}
        </tr>`;
      }).join('')}</tbody>
    </table>`;
  }

  // Grille progressive : une ligne notée dévoile la suivante, qui glisse en place.
  if (root.document && typeof root.document.addEventListener === 'function') {
    root.document.addEventListener('change', event => {
      const row = event.target.closest && event.target.closest('.k-matrix.is-progressive tbody tr');
      const next = row && row.nextElementSibling;
      if (next && next.classList.contains('is-waiting')) { next.classList.remove('is-waiting'); next.classList.add('is-arriving'); }
    });
  }

  /* Le nombre de lignes renseignées d'une grille. */
  const answered = (key, count) => Array.from({ length: count }, (_, i) => ex().value(`${key}${i}`)).filter(filled).length;

  /* Le nombre de bonnes réponses d'une grille. */
  const score = (key, answers) => answers.filter((answer, i) => ex().value(`${key}${i}`) === answer).length;

  /* Choix exclusifs en boutons (C · A · P, C · B…). Même rendu en relecture. */
  function choiceButtons(field, options, answer = null) {
    const chosen = ex().value(field);
    const reviewing = answer !== null;
    return `<div class="k-choices count-${options.length}" role="radiogroup">${options.map(option => {
      const isChosen = chosen === option.id;
      if (reviewing) {
        const state = option.id === answer ? 'is-answer' : isChosen ? 'is-wrong' : 'is-muted';
        return `<span class="k-choice tone-${esc(option.tone || 'blue')} ${state}">${option.badge ? `<span class="k-choice-badge">${esc(option.badge)}</span>` : ''}<span>${esc(option.label)}</span>${option.id === answer ? icon('check', { size: 16, label: 'réponse attendue' }) : isChosen ? icon('close', { size: 16, label: 'votre réponse' }) : ''}</span>`;
      }
      return `<label class="k-choice tone-${esc(option.tone || 'blue')} ${isChosen ? 'is-chosen' : ''}">
        <input type="radio" class="sr-only" name="${esc(field)}" data-field="${esc(field)}" value="${esc(option.id)}" ${isChosen ? 'checked' : ''}>
        ${option.badge ? `<span class="k-choice-badge">${esc(option.badge)}</span>` : ''}<span>${esc(option.label)}</span>
      </label>`;
    }).join('')}</div>`;
  }

  /* ───────────────────────── Affichage progressif ──────────────────── */

  /* Combien de blocs montrer : tous ceux jusqu'au plus avancé des blocs
   * remplis, plus le suivant. En relecture, tout est visible. */
  function reach(total, done) {
    if (ex().reviewing()) return total;
    let last = -1;
    for (let i = 0; i < total; i++) if (done(i)) last = i;
    return Math.min(total, last + 2);
  }

  /* Les blocs `selector` d'indice >= shown() sont rendus avec `hidden`.
   * Dès qu'une saisie est terminée (« change » : un choix coché, un champ
   * quitté), le bloc suivant apparaît et vient à l'écran. Un bloc montré
   * ne disparaît plus, même si l'on efface sa réponse. La page défile
   * jusqu'à la barre des boutons. */
  function reveal(selector, shown) {
    document.addEventListener('change', () => setTimeout(() => {
      const limit = shown();
      let added = null;
      core().$(selector).forEach((block, i) => {
        if (i >= limit || !block.hidden) return;
        block.hidden = false;
        block.classList.add('is-new');
        added = block;
      });
      // La page descend jusqu'à la barre des boutons, juste sous le dernier
      // bloc : le bouton de validation reste en vue, quel que soit le zoom.
      // Une fois tout montré, chaque réponse la ramène aussi à l'écran.
      const bar = core().$('.k-page .k-bar');
      if (added || !core().$(selector).some(block => block.hidden)) (bar || added)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 0));
  }

  /* ──────────────── Grille de cartes à qualifier (S4 1.1, 2.1) ──────── */

  /* Un rappel des catégories, puis une carte par affirmation avec ses
   * boutons de réponse. `content` : eyebrow, title, subtitle, legend,
   * instruction, items [{ text, answer, why }]. Monte l'exercice.
   * `progressive` : les cartes apparaissent une à une, la suivante dès
   * que la précédente a sa réponse (la relecture les montre toutes).
   * `context` (et `itemNoun`, « phrase » par défaut) : une visite guidée
   * courte, qui pose la situation puis montre les catégories. */
  function mountChoiceGrid(key, content, { progressive = false } = {}) {
    const items = content.items;
    // Par défaut, les tuiles ne portent que la lettre (C, A, P) : la légende
    // au-dessus en donne le sens. `letterButtons: false` y remet le mot.
    const options = content.legend.map(l => content.letterButtons !== false
      ? { id: l.id, label: l.id, tone: l.tone }
      : { id: l.id, label: l.label, badge: l.id, tone: l.tone });
    const answers = items.map(item => item.answer);
    const count = () => answered('item', items.length);
    const shown = () => progressive ? reach(items.length, i => filled(ex().value(`item${i}`))) : items.length;

    /* La correction : un écran à part, pour que chaque affirmation se lise
     * seule. Votre choix est cerclé de vert (juste) ou de rouge (faux) ; s'il
     * est faux, la réponse attendue est entourée de pointillés verts. Un
     * encadré donne le verdict en toutes lettres, puis l'explication. */
    function reviewScreen() {
      const right = score('item', answers);
      const labelOf = id => (content.legend.find(l => l.id === id) || {}).label || id;
      const verdicts = items.map((item, i) => ex().value(`item${i}`) === item.answer);
      const mark = (state, size = 18) => `<span class="cgr-mark ${state}" aria-hidden="true">${state === 'is-ko' ? icon('close', { size }) : icon('check', { size })}</span>`;
      const choices = (item, i) => {
        const chosen = ex().value(`item${i}`);
        return `<div class="k-choices count-${options.length}">${options.map(option => {
          const state = option.id === chosen ? (chosen === item.answer ? 'is-right' : 'is-wrong')
            : option.id === item.answer ? 'is-expected' : 'is-muted';
          const sign = state === 'is-right' || state === 'is-expected' ? icon('check', { size: 16 }) : state === 'is-wrong' ? icon('close', { size: 16 }) : '';
          const said = state === 'is-right' ? 'votre réponse, juste' : state === 'is-wrong' ? 'votre réponse, fausse' : state === 'is-expected' ? 'réponse attendue' : '';
          return `<span class="k-choice tone-${esc(option.tone || 'blue')} ${state}"${said ? ` aria-label="${esc(option.label)}, ${said}"` : ''}>${option.badge ? `<span class="k-choice-badge">${esc(option.badge)}</span>` : ''}<span>${esc(option.label)}</span>${sign}</span>`;
        }).join('')}</div>`;
      };
      return `${answerReview({ subtitle: 'Voici vos réponses, accompagnées des bonnes réponses et d’une explication pour chaque affirmation.',
        aside: `<p class="arv-score"><strong>${right} / ${items.length}</strong> bonnes réponses</p>`,
        items: items.map((item, i) => ({ text: item.text, yours: ex().value(`item${i}`) ? labelOf(ex().value(`item${i}`)) : '', expected: labelOf(item.answer), ok: verdicts[i], why: item.why })) })}
        <form novalidate>
          ${core().feedbackBox()}<div class="k-utility">${reset()}</div>
        </form>
      </div>`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      if (reviewing) return reviewScreen();
      const right = score('item', answers);
      return `<div class="k-page cg-page">
        ${head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: content.context ? tourButton() : '' })}
        <div class="cg-legend count-${content.legend.length}">${content.legend.map(l =>
          `<div class="cg-legend-item tone-${l.tone}"><span class="cg-letter">${esc(l.id)}</span><span><strong>${esc(l.label)}</strong><span>${esc(l.text)}</span></span></div>`).join('')}</div>
        ${reviewing ? result(right, items.length, 'bonnes réponses') : `<p class="cg-instruction">${icon('pointer', { size: 22 })}<span>${esc(content.instruction)}</span></p>`}
        <form novalidate>
          <div class="cg-grid">${items.map((item, i) => `<section class="cg-card ${reviewing ? (ex().value(`item${i}`) === item.answer ? 'is-ok' : 'is-ko') : ''}" data-card="${i}"${i < shown() ? '' : ' hidden'}>
            <p class="cg-text"><span class="cg-n">${i + 1}</span><span>${esc(item.text)}</span></p>
            ${choiceButtons(`item${i}`, options, reviewing ? item.answer : null)}
            ${reviewing ? `<p class="k-why">${esc(item.why)}</p>` : ''}
          </section>`).join('')}</div>
          ${reviewing ? `${core().feedbackBox()}<div class="k-utility">${reset()}</div>`
            : `${core().errorsBox()}${bar({ left: `<span class="k-muted" data-live="count">${count()} sur ${items.length} réponses</span>`, right: submit('Vérifier mes réponses') })}`}
        </form>
        ${reviewing ? '' : utility('Corrigé disponible après validation')}
      </div>`;
    }

    function validate(values) {
      const missing = items.map((_, i) => i).filter(i => !values[`item${i}`]);
      return missing.length ? [{ key: `item${missing[0]}`, message: `Répondez aux ${items.length} affirmations (${missing.length} sans réponse).` }] : [];
    }

    const feedback = () => {
      const right = score('item', answers);
      return [`${right} réponse${right > 1 ? 's' : ''} juste${right > 1 ? 's' : ''} sur ${items.length}.`];
    };

    if (progressive) reveal('.cg-card[data-card]', shown);
    live(() => ({ count: `${count()} sur ${items.length} réponses` }));
    if (content.context) {
      const noun = content.itemNoun || 'phrase';
      const TONES = { c: 'blue', a: 'green', p: 'gold' };
      tour(key, [
        { target: '.cg-legend', title: 'Le contexte', text: content.context, wide: true,
          items: content.legend.map(l => ({ key: l.id, tone: TONES[l.tone] || 'blue', text: `${l.label} : ${l.text.charAt(0).toLowerCase()}${l.text.slice(1)}` })),
          after: content.contextAfter ?? `Pour chaque ${noun}, choisissez la bonne catégorie.` },
        { target: '.cg-grid', title: `Les ${noun}s`, text: `Cliquez sur la lettre qui correspond à chaque ${noun}.`,
          after: progressive ? `La ${noun} suivante apparaît dès que vous avez répondu.` : '' },
        { target: '.cg-page .k-bar', title: 'Vérifier', text: `Toutes les ${noun}s classées, vérifiez vos réponses : le corrigé s’affiche avec une explication pour chacune.` }
      ]);
    }
    ex().mount(key, { screen, validate, feedback, compactFeedback: true });
  }

  /* ───────────────────── Paquet de cartes à classer ─────────────────── */

  /* Une carte à la fois, à glisser vers une zone ou à classer d'un clic
   * sur la zone. État : `placed` (une zone par carte), `history` (pour
   * annuler), `card` (la carte présentée). Sert à S2 2.1 et S4 3.1. */
  const deckPlaced = total => list('placed', total, null);
  const deckCurrent = total => {
    const placed = deckPlaced(total);
    const asked = Number(ex().value('card'));
    if (Number.isInteger(asked) && asked >= 0 && asked < total && placed[asked] === null) return asked;
    const free = placed.findIndex(zone => zone === null);
    return free === -1 ? null : free;
  };
  function deckPlace(total, zone) {
    const index = deckCurrent(total);
    if (index === null) return;
    const placed = deckPlaced(total);
    placed[index] = zone;
    const history = (Array.isArray(ex().value('history')) ? ex().value('history') : []).concat(index);
    ex().setValue('placed', placed);
    ex().setValue('history', history);
    ex().setValue('card', null);
  }
  function deckUndo(total) {
    const history = Array.isArray(ex().value('history')) ? ex().value('history').slice() : [];
    const last = history.pop();
    if (!Number.isInteger(last)) return;
    const placed = deckPlaced(total);
    placed[last] = null;
    ex().setValue('placed', placed);
    ex().setValue('history', history);
    ex().setValue('card', last);
  }
  /* « Passer » : présente la carte libre suivante, sans classer celle-ci. */
  function deckSkip(total) {
    const placed = deckPlaced(total);
    const current = deckCurrent(total);
    for (let step = 1; step <= total; step++) {
      const next = (current + step) % total;
      if (placed[next] === null) { ex().setValue('card', next); return; }
    }
  }
  /* Revenir sur une carte déjà classée : elle redevient libre. */
  function deckReopen(total, index) {
    const placed = deckPlaced(total);
    placed[index] = null;
    ex().setValue('placed', placed);
    ex().setValue('card', index);
  }

  /* Les pastilles de progression, une par carte. */
  const deckDots = (total, current) => {
    const placed = deckPlaced(total);
    return `<span class="deck-dots" aria-hidden="true">${placed.map((zone, i) =>
      `<span class="deck-dot ${i === current ? 'is-current' : zone !== null ? 'is-filled' : ''}"></span>`).join('')}</span>`;
  };

  /* Le récapitulatif, une fois tout classé : relire, modifier, valider. */
  function deckRecap(cards, zones, submitLabel) {
    const placed = deckPlaced(cards.length);
    const zoneOf = id => zones.find(zone => zone.id === id) || {};
    return `<ol class="deck-recap">${cards.map((card, i) => `<li>
      <span class="deck-recap-n">${String(i + 1).padStart(2, '0')}</span>
      <span class="deck-recap-text">${esc(card.text)}</span>
      <span class="deck-recap-zone tone-${esc(zoneOf(placed[i]).tone || 'neutral')}">${esc(zoneOf(placed[i]).label || '')}</span>
      <button type="button" class="deck-recap-reopen" data-act="deck-reopen" data-index="${i}"><span class="sr-only">Modifier la carte ${i + 1}</span></button>
    </li>`).join('')}</ol>
    <div class="k-bar"><div class="k-bar-left">${act('deck-undo', `${icon('undo', { size: 17 })}<span>Annuler le dernier choix</span>`)}</div><div class="k-bar-center">Toutes les cartes sont classées.</div><div class="k-bar-right">${submit(submitLabel)}</div></div>`;
  }

  /* La relecture : chaque carte, sa zone attendue, son explication. */
  function deckReview(cards, zones) {
    const placed = deckPlaced(cards.length);
    const zoneOf = id => zones.find(zone => zone.id === id) || {};
    /* Deux colonnes à droite : votre réponse (cochée ou barrée), puis la
     * réponse attendue. Un en-tête les nomme une fois pour toutes. */
    const tag = (zone, extra = '') => `<span class="deck-recap-zone tone-${esc(zone.tone || 'neutral')} ${extra}">${esc(zone.label || 'rien')}</span>`;
    return `<ol class="deck-recap is-review has-columns">
      <li class="deck-review-head" aria-hidden="true"><span></span><span></span><span>Votre réponse</span><span>Réponse attendue</span></li>
      ${cards.map((card, i) => {
      const ok = placed[i] === card.answer;
      return `<li class="${ok ? 'is-ok' : 'is-ko'}">
        <span class="deck-recap-n">${String(i + 1).padStart(2, '0')}</span>
        <span class="deck-recap-text"><strong>${esc(card.text)}</strong>${card.why ? `<small>${esc(card.why)}</small>` : ''}</span>
        <span class="deck-review-yours" aria-label="Votre réponse : ${esc(zoneOf(placed[i]).label || 'rien')}${ok ? ', correcte' : ', incorrecte'}">${icon(ok ? 'check' : 'close', { size: 15 })}${tag(zoneOf(placed[i]), 'is-yours')}</span>
        <span class="deck-review-expected" aria-label="Réponse attendue : ${esc(zoneOf(card.answer).label)}">${tag(zoneOf(card.answer))}</span>
      </li>`;
    }).join('')}</ol>`;
  }

  /* ─────────────────────────── Relecture ────────────────────────────── */

  const mark = (ok, label = '') => ex().verdictMark(ok, label);

  /* Une réponse à choix dans le corrigé, en deux tuiles : à gauche le choix
   * de l'apprenant (vert s'il est juste, rouge sinon), à droite la réponse
   * attendue, seulement s'il s'est trompé. `topic` précise la question
   * quand il y en a plusieurs (« Nature », « Premier geste »…). */
  const picked = (ok, chosen, expected, topic = '') => {
    const tile = (state, label, value) => `<div class="k-pick-tile ${state}">
      <span class="k-pick-icon">${icon(state === 'is-ko' ? 'close' : 'check', { size: 20, strokeWidth: 3 })}</span>
      <span><small>${esc(label)}</small><strong>${esc(value)}</strong></span>
    </div>`;
    const about = topic ? `${topic} · ` : '';
    return `<div class="k-pick">${ok
      ? tile('is-ok', `${about}Votre choix, juste`, chosen)
      : tile('is-ko', `${about}Votre choix`, chosen || 'Aucune réponse') + tile('is-ok', `${about}Réponse attendue`, expected)}</div>`;
  };

  /* L'explication du corrigé, avec son ampoule. */
  const explain = text => `<div class="k-explain"><span class="k-explain-icon">${icon('lightbulb', { size: 22 })}</span><div><strong>Explication</strong><p>${esc(text)}</p></div></div>`;

  /* La production de l'apprenant, citée telle quelle. */
  const yours = (title, text) =>
    `<div class="own-answer"><h4>${esc(title)}</h4><p>${filled(text) ? `« ${esc(text)} »` : '<em>Non renseigné.</em>'}</p></div>`;

  /* Un repère proposé, posé sous la production. */
  const model = (title, text) =>
    `<div class="k-model"><p class="k-model-title">${icon('sparkle', { size: 16 })}<span>${esc(title)}</span></p><p>${esc(text)}</p></div>`;

  /* Le score en grand, en tête de relecture. */
  const result = (right, total, label = 'bonnes réponses') =>
    `<p class="k-result"><strong>${right} / ${total}</strong><span>${esc(label)}</span></p>`;

  /* ───────────────────── Commandes et fenêtres ──────────────────────── */

  let handlers = {};
  let dialogTable = {};
  let liveFn = null;
  let dropFn = null;
  let dragged = null;

  /* Les réactions de l'écran aux boutons `data-act`. */
  const on = map => { handlers = Object.assign({}, handlers, map); };
  /* Les fenêtres d'aide : { nom: { title, html } } ou une fonction. */
  const dialogs = map => { dialogTable = Object.assign({}, dialogTable, map); };
  /* Ce qui se met à jour à chaque frappe, sans redessiner l'écran :
   * renvoie { nomDeZone: html } pour les éléments `data-live`. */
  const live = fn => { liveFn = fn; };
  /* Le dépôt d'une carte glissée : fn(idDeLaCarte, zone). */
  const onDrop = fn => { dropFn = fn; };

  function refreshLive() {
    if (!liveFn) return;
    const parts = liveFn() || {};
    for (const [name, html] of Object.entries(parts)) {
      core().$$(`[data-live="${name}"]`).forEach(node => { node.innerHTML = html; });
    }
  }

  /* Efface les réponses de l'exercice, sans réimposer la consigne. */
  function resetExercise() {
    const values = ex().values();
    for (const field of Object.keys(values)) {
      if (field !== 'briefed' && field !== 'openCase') delete values[field];
    }
    core().entry(ex().current.key).done = false;
    core().persist();
    ex().render(true);
    core().toast('Exercice réinitialisé.');
  }

  let armedTimer = null;
  function armReset(button) {
    if (button.dataset.armed === 'true') { clearTimeout(armedTimer); resetExercise(); return; }
    button.dataset.armed = 'true';
    button.textContent = 'Confirmer : tout effacer';
    button.classList.add('is-armed');
    armedTimer = setTimeout(() => {
      button.dataset.armed = 'false';
      button.textContent = 'Réinitialiser';
      button.classList.remove('is-armed');
    }, 4000);
  }

  function openDialog(name) {
    const entry = typeof dialogTable[name] === 'function' ? dialogTable[name]() : dialogTable[name];
    if (entry) core().openDialog(entry.title, entry.html);
  }

  /* Un seul jeu d'écouteurs par page : l'écran peut être redessiné cent
   * fois, les réactions restent celles déclarées par `on`. */
  if (root.document && typeof root.document.addEventListener === 'function') {
    document.addEventListener('click', event => {
      const control = event.target.closest && event.target.closest('[data-act]');
      if (!control || control.disabled) return;
      const name = control.dataset.act;
      if (name === 'reset') { event.preventDefault(); armReset(control); return; }
      if (name === 'dialog') { event.preventDefault(); openDialog(control.dataset.dialog); return; }
      if (handlers[name]) { event.preventDefault(); handlers[name](control, event); }
    });

    document.addEventListener('input', () => setTimeout(refreshLive, 0));

    /* Dépôt par la saisie des cartes (dnd.js) : la carte soulevée suit le
     * pointeur, sans image fantôme. Le glisser natif ci-dessous reste en
     * secours. */
    document.addEventListener('atelier:drop', event => {
      const { source, zone } = event.detail;
      if (!source.dataset.drag || !zone.dataset.drop) return;
      if (dropFn) dropFn(source.dataset.drag, zone.dataset.drop, zone);
    });

    /* Glisser-déposer : un confort. Chaque dépôt a son équivalent au clic. */
    document.addEventListener('dragstart', event => {
      const card = event.target.closest && event.target.closest('[data-drag]');
      if (!card) return;
      dragged = card.dataset.drag;
      card.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', dragged);
    });
    document.addEventListener('dragend', event => {
      event.target.closest && event.target.closest('[data-drag]')?.classList.remove('is-dragging');
      core().$$('[data-drop].is-over').forEach(zone => zone.classList.remove('is-over'));
      dragged = null;
    });
    document.addEventListener('dragover', event => {
      const zone = event.target.closest && event.target.closest('[data-drop]');
      if (!zone || dragged === null) return;
      event.preventDefault();
      zone.classList.add('is-over');
    });
    document.addEventListener('dragleave', event => {
      const zone = event.target.closest && event.target.closest('[data-drop]');
      if (zone && !zone.contains(event.relatedTarget)) zone.classList.remove('is-over');
    });
    document.addEventListener('drop', event => {
      const zone = event.target.closest && event.target.closest('[data-drop]');
      if (!zone || dragged === null) return;
      event.preventDefault();
      zone.classList.remove('is-over');
      const id = dragged;
      dragged = null;
      if (dropFn) dropFn(id, zone.dataset.drop, zone);
    });
  }

  /* ─────────────── Deux réponses à comparer (S1 1.5, S2 2.5) ────────── */

  /* La réplique du client, deux réponses en cartes à cocher, puis le
   * « pourquoi ce choix ? ». En relecture : la bonne réponse, l'analyse de
   * chacune, la justification de l'apprenant et une justification proposée.
   * `content` : eyebrow, title, subtitle, speaker, quote, options
   * [{ id, label, text, analysis }], answer, whyLabel, whyHelp, hint, model ;
   * `asideTitle`/`asideText` et `listTitle` facultatifs. `options.image`
   * pose l'illustration du catalogue en bandeau ; `options.steps` affiche
   * le fil Écouter · Choisir · Expliquer. */
  function mountCompare(key, content, settings = {}) {
    const picture = () => (ex().current.image ? core().webAsset(ex().current.image) : '');
    const chosen = () => ex().value('pick');
    const stageAt = () => (!chosen() ? 2 : 3);

    function scene() {
      const quote = `<span>« ${esc(content.quote)} »</span>`;
      if (settings.image && picture()) {
        return `<section class="cmp-banner">
          <div class="cmp-banner-art"><img src="${esc(picture())}" alt="${esc(ex().current.alt || '')}" decoding="async" style="object-position:${esc(ex().current.imagePosition || 'center')}"><p class="cmp-bubble"><span class="k-label">${esc(content.speaker)}</span>${quote}</p></div>
          <div class="cmp-banner-text"><h2>${esc(content.asideTitle)}</h2><p>${esc(content.asideText)}</p></div>
        </section>`;
      }
      if (content.portrait) return clientCard(content.quote, content.portrait === true ? null : content.portrait);
      return `<section class="k-panel cmp-client"><span class="cmp-avatar">${icon('users', { size: 34 })}<small>${esc(content.speaker)}</small></span><p class="cmp-bubble">${quote}</p></section>`;
    }

    function optionCard(option, reviewing) {
      const isChosen = chosen() === option.id;
      if (reviewing) {
        const ok = option.id === content.answer;
        return `<section class="cmp-option is-static ${ok ? 'is-answer' : ''} ${isChosen ? 'is-chosen' : ''}">
          <header><span class="cmp-review-radio ${isChosen ? 'is-on' : ''}" aria-hidden="true"></span><strong>${esc(option.label)}</strong>${ok ? mark(true, isChosen ? 'Votre choix, le plus efficace' : 'La réponse la plus efficace') : isChosen ? mark(false, 'Votre choix') : ''}</header>
          <p>« ${esc(option.text)} »</p>
          <ul class="cmp-analysis ${ok ? 'is-good' : 'is-bad'}">${option.analysis.map(line => { const at = line.indexOf(' : '); return at > 0 && at < 40 ? `<li><strong>${esc(line.slice(0, at))}</strong> : ${esc(line.slice(at + 3))}</li>` : `<li>${esc(line)}</li>`; }).join('')}</ul>
        </section>`;
      }
      return `<label class="cmp-option ${isChosen ? 'is-chosen' : ''}">
        <input type="radio" class="sr-only" name="pick" data-field="pick" value="${esc(option.id)}" ${isChosen ? 'checked' : ''}>
        <span class="cmp-radio" aria-hidden="true"></span>
        <span class="cmp-option-body"><strong>${esc(option.label)}</strong><span>« ${esc(option.text)} »</span></span>
      </label>`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      const ok = chosen() === content.answer;
      return `<div class="k-page cmp-page">
        ${head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
          aside: reviewing ? '' : `${settings.steps ? `<div data-live="cmp-steps">${steps(['Écouter', 'Choisir', 'Expliquer'], stageAt(), { compact: true })}</div>` : ''}${tourButton()}` })}
        ${scene()}
        <form novalidate class="cmp-form">
          <h2 class="cmp-list-title">${esc(content.listTitle)}</h2>
          ${reviewing ? result(ok ? 1 : 0, 1, ok ? 'vous avez choisi la réponse la plus efficace' : 'la réponse la plus efficace était l’autre') : ''}
          <div class="cmp-options" ${reviewing ? '' : 'role="radiogroup"'}>${content.options.map(option => optionCard(option, reviewing)).join('')}</div>
          <section class="k-panel cmp-why">
            ${reviewing
              ? `${yours('Votre justification', ex().value('why'))}${model('Une justification possible', content.model)}`
              : `<h2>${esc(content.whyLabel)}</h2><p class="k-muted">${esc(content.whyHelp)}</p>
                ${ex().field('why', content.whyLabel, { placeholder: 'Expliquez ce qui rend cette réponse efficace…', max: 600, rows: 3, hideLabel: true })}
                <div class="cmp-why-row">${dialogButton('hint', 'Voir un indice', 'text-button', 'lightbulb')}${submit('Valider ma réponse')}</div>`}
          </section>
          ${reviewing ? `${core().feedbackBox()}<div class="k-utility">${reset()}</div>` : core().errorsBox()}
        </form>
        ${reviewing ? '' : utility('Analyse des deux réponses après validation')}
      </div>`;
    }

    function validate(values) {
      const errors = [];
      if (!values.pick) errors.push({ key: 'pick', message: 'Choisissez la réponse la plus efficace.' });
      if (!filled(values.why)) errors.push({ key: 'why', message: 'Expliquez votre choix en une ou deux phrases.' });
      return errors;
    }

    const feedback = () => [chosen() === content.answer
      ? 'Bon choix. Comparez votre justification à l’analyse des deux réponses.'
      : 'Ce n’était pas la réponse la plus efficace : relisez l’analyse des deux réponses.'];

    live(() => (settings.steps ? { 'cmp-steps': steps(['Écouter', 'Choisir', 'Expliquer'], stageAt(), { compact: true }) } : {}));
    dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

    // Visite guidée de l'écran, lancée d'elle-même la première fois.
    tour(key, [
      { target: '.cmp-page .cmp-bubble, .cmp-page .client-card', title: 'Le client', text: `Il vous dit : « ${content.quote} »` },
      { target: '.cmp-options', title: 'Deux réponses', text: 'Lisez-les, puis cliquez sur la plus efficace.',
        after: 'Ensuite, vous expliquerez votre choix.' },
      // Second temps : la justification n'apparaît qu'une réponse choisie.
      { later: true, target: '.cmp-why textarea', title: 'Pourquoi ce choix ?', text: 'Expliquez en une ou deux phrases ce qui la rend efficace.' },
      { later: true, target: '.cmp-why [data-dialog="hint"]', title: 'Un indice', text: 'Un doute ? L’indice vous met sur la piste.' },
      { later: true, target: '.cmp-why .k-submit', title: 'Valider ma réponse', text: 'Vous découvrez ensuite l’analyse des deux réponses.' }
    ]);

    ex().mount(key, { screen, validate, feedback, compactFeedback: true });
  }

  /* Enregistre un changement fait au clic, puis redessine. */
  function commit() {
    ex().changed();
    ex().rebuild();
  }

  /* ─────────────────────────── Visite guidée ───────────────────────────── */

  /* Un projecteur qui présente l'écran, zone par zone : tout s'assombrit
   * sauf la zone montrée, et une bulle l'explique (« 2 / 5 », Précédent,
   * Suivant, Passer). Elle se lance d'elle-même la première fois que
   * l'écran d'exercice apparaît (mémorisé dans le navigateur), et
   * `tourButton()` permet de la revoir. `steps` : [{ target, title, text,
   * items, after }] ; `items` ([{ key | symbol, text, tone }]) s'affiche en
   * liste à pastilles (lettre ou icône) entre `text` et `after` : une ligne
   * par information, jamais plusieurs idées à la suite.
   * `target` étant un sélecteur ; plusieurs, séparés par des virgules,
   * forment une seule zone qui les englobe. Une zone absente est sautée.
   * Un saut de ligne dans le texte d'une bulle ouvre un nouveau paragraphe.
   * `show` : sélecteur d'un bloc masqué tant que l'apprenant n'a pas agi
   * (un cadre qui apparaît après un choix) ; il est affiché le temps de la
   * bulle. Sans `show`, une zone invisible est sautée.
   * `later` : bulle de la SUITE de la visite, pour une zone qui apparaît
   * après un choix. Elle ne fait pas partie du premier passage ; la suite
   * se lance d'elle-même la première fois que sa zone s'affiche. Le bouton
   * « Visite guidée » rejoue toutes les bulles dont la zone est visible.
   * `wide` : bulle large, posée sous la zone (ou au-dessus), ses `items`
   * côte à côte ; pour une zone très large qu'une bulle étroite cacherait.
   * `preview` (HTML écrit par l'exercice) montre en aperçu, sous `text`,
   * un écran à venir ; la bulle s'élargit alors. `hlDemo()` fournit un
   * aperçu animé des surligneurs, qui se joue en boucle dans la bulle ;
   * `dragDemo()`, celui d'un glisser-déposer de pastilles.
   * Styles : extras-commun.css (.tour-*). */
  let tourSteps = [];
  let tourKey = '';
  let demoTimer = null;

  /* Aperçu animé des surligneurs : une phrase d'exemple, les surligneurs
   * dessous, et un curseur qui choisit un surligneur, colore son passage,
   * puis passe au suivant. `tools` : [{ label, letter, tone }] ; `parts` :
   * [{ text, tool }], `tool` étant l'index du surligneur (absent : texte
   * laissé tel quel). Tons : blue, green, gold, coral. */
  const hlDemo = ({ tools, parts }) => `<div class="tour-demo" data-demo>
      <p class="tour-demo-text">${parts.map(p => Number.isInteger(p.tool)
        ? `<span class="tour-demo-part tone-${esc(tools[p.tool].tone)}" data-tool="${p.tool}">${esc(p.text)}</span>`
        : esc(p.text)).join(' ')}</p>
      <div class="tour-demo-tools">${tools.map(t => `<span class="tour-demo-tool tone-${esc(t.tone)}">${icon('highlighter', { size: 15 })}${t.letter ? `<b>${esc(t.letter)}</b>` : ''}<span>${esc(t.label)}</span></span>`).join('')}</div>
      <span class="tour-demo-cursor">${icon('pointer', { size: 20 })}</span>
    </div>`;

  /* Aperçu animé d'un glisser-déposer : des pastilles à gauche, des
   * emplacements à droite ; le curseur prend une pastille et la dépose dans
   * son emplacement. `pills` : [{ label, text }] ; `slots` : [{ key, text }] ;
   * `moves` : [[pastille, emplacement], …] (index). */
  const dragDemo = ({ pills, slots, moves, empty = 'N°' }) => `<div class="tour-demo is-drag" data-demo="drag" data-moves="${esc(JSON.stringify(moves))}">
      <div class="tour-drag">
        <ul class="tour-drag-col">${pills.map(p => `<li><span class="tour-drag-pill" data-label="${esc(p.label)}">${esc(p.label)}</span><span>${esc(p.text)}</span></li>`).join('')}</ul>
        <ul class="tour-drag-col">${slots.map(s => `<li>${s.key ? `<b class="tour-drag-key">${esc(s.key)}</b>` : ''}<span>${esc(s.text)}</span><span class="tour-drag-slot" data-empty="${esc(empty)}">${esc(empty)}</span></li>`).join('')}</ul>
      </div>
      <span class="tour-demo-ghost" aria-hidden="true"></span>
      <span class="tour-demo-cursor">${icon('pointer', { size: 20 })}</span>
    </div>`;

  /* Les gestes de l'aperçu : [{ el, act, carry }], et de quoi tout remettre
   * à zéro avant de recommencer. */
  function demoMoves(demo) {
    if (demo.dataset.demo === 'drag') {
      const pills = [...demo.querySelectorAll('.tour-drag-pill')];
      const slots = [...demo.querySelectorAll('.tour-drag-slot')];
      const moves = [];
      JSON.parse(demo.dataset.moves || '[]').forEach(([from, to]) => {
        const pill = pills[from], slot = slots[to];
        moves.push({ el: pill, act: () => pill.classList.add('is-picked') });
        moves.push({ el: slot, carry: pill.dataset.label, act: () => {
          slot.textContent = pill.dataset.label;
          slot.classList.add('is-filled');
          pill.classList.remove('is-picked');
          pill.classList.add('is-used');
        } });
      });
      const reset = () => {
        pills.forEach(p => p.classList.remove('is-picked', 'is-used'));
        slots.forEach(s => { s.classList.remove('is-filled'); s.textContent = s.dataset.empty; });
      };
      return { moves, reset };
    }
    const tools = [...demo.querySelectorAll('.tour-demo-tool')];
    const parts = [...demo.querySelectorAll('.tour-demo-part')];
    const moves = [];
    tools.forEach((tool, t) => {
      moves.push({ el: tool, act: () => tools.forEach(x => x.classList.toggle('is-active', x === tool)) });
      parts.filter(p => Number(p.dataset.tool) === t).forEach(p => moves.push({ el: p, act: () => p.classList.add('is-marked') }));
    });
    const reset = () => {
      tools.forEach(x => x.classList.remove('is-active'));
      parts.forEach(p => p.classList.remove('is-marked'));
    };
    return { moves, reset };
  }

  function playDemo(card) {
    clearInterval(demoTimer);
    const demo = card.querySelector('[data-demo]');
    if (!demo) return;
    const cursor = demo.querySelector('.tour-demo-cursor');
    const ghost = demo.querySelector('.tour-demo-ghost');
    const { moves, reset } = demoMoves(demo);
    let k = 0;
    const tick = () => {
      if (!demo.isConnected) { clearInterval(demoTimer); return; }
      // Deux temps de pause sur le résultat, puis tout recommence.
      if (k >= moves.length + 2) {
        k = 0;
        reset();
      }
      const move = moves[k++];
      if (!move) return;
      const r = move.el.getBoundingClientRect(), base = demo.getBoundingClientRect();
      const x = Math.round(r.left - base.left + Math.min(r.width / 2, 40)), y = Math.round(r.top - base.top + r.height / 2);
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      // La pastille portée suit le curseur jusqu'à son emplacement.
      if (ghost) {
        ghost.textContent = move.carry || '';
        ghost.classList.toggle('is-on', Boolean(move.carry));
        ghost.style.transform = `translate(${x - 14}px, ${y - 14}px)`;
      }
      setTimeout(() => { if (!demo.isConnected) return; move.act(); if (ghost) ghost.classList.remove('is-on'); }, 450);
    };
    tick();
    demoTimer = setInterval(tick, 1200);
  }
  const tourButton = () => `<button type="button" class="text-button with-icon tour-replay" data-act="tour">${icon('question', { size: 18 })}<span>Visite guidée</span></button>`;

  // Espace insécable devant « » : ? ! et après « : jamais un signe seul en
  // début de ligne.
  const tight = text => esc(text).replace(/« /g, '« ').replace(/ ([»:;?!])/g, ' $1');

  function tourStart(list = tourSteps, key = tourKey) {
    const doc = root.document;
    const visible = s => [...doc.querySelectorAll(s.target)].some(el => el.getClientRects().length);
    const steps = list.filter(s => s.show ? doc.querySelector(s.show) : visible(s));
    if (!steps.length || doc.querySelector('.tour')) return;
    try { root.localStorage.setItem(key, '1'); } catch {}
    const layer = doc.createElement('div');
    layer.className = 'tour';
    layer.innerHTML = `<div class="tour-hole"></div><div class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" tabindex="-1"></div>`;
    doc.body.appendChild(layer);
    // Une zone collée au bas de la page (la barre des boutons) reçoit juste
    // la marge qu'il faut pour ne pas toucher le bord de l'écran.
    const padding = doc.body.style.paddingBottom;
    const hole = layer.querySelector('.tour-hole');
    const card = layer.querySelector('.tour-card');
    let at = 0;
    // Une barre de boutons ne garde que ses boutons et ses textes : le
    // cadre n'entoure pas le vide de la barre.
    const CONTROLS = 'button, a, [data-act], [data-action]';
    const barParts = el => {
      if (el.matches(CONTROLS) || !el.querySelector(CONTROLS) || el.querySelector('textarea, input, select, img, video, canvas')) return [el];
      const parts = [...el.querySelectorAll('*')].filter(node => node.matches(CONTROLS)
        ? !node.parentElement.closest(CONTROLS) || node.parentElement.closest(CONTROLS) === el
        : !node.closest(CONTROLS) && [...node.childNodes].some(child => child.nodeType === 3 && child.textContent.trim()));
      return parts.length ? parts : [el];
    };
    // Le rectangle qui englobe tous les éléments de la zone.
    const zone = target => {
      const rects = [...doc.querySelectorAll(target)].flatMap(barParts).map(el => el.getBoundingClientRect()).filter(r => r.width || r.height);
      if (!rects.length) return null;
      const left = Math.min(...rects.map(r => r.left)), top = Math.min(...rects.map(r => r.top));
      const right = Math.max(...rects.map(r => r.right)), bottom = Math.max(...rects.map(r => r.bottom));
      return { left, top, right, bottom, width: right - left, height: bottom - top };
    };
    const place = () => {
      const r = zone(steps[at].target);
      if (!r) return;
      const pad = 8;
      Object.assign(hole.style, { left: `${r.left - pad}px`, top: `${r.top - pad}px`, width: `${r.width + 2 * pad}px`, height: `${r.height + 2 * pad}px` });
      const vw = root.innerWidth, vh = root.innerHeight, cw = card.offsetWidth, ch = card.offsetHeight, gap = 20;
      let x, y;
      // Bulle large : sous la zone si elle tient, sinon au-dessus, centrée sur la zone.
      if (steps[at].wide) {
        x = r.left + r.width / 2 - cw / 2;
        y = r.bottom + gap + ch < vh - 12 ? r.bottom + gap : r.top - gap - ch;
      }
      else if (r.right + gap + cw < vw - 12) { x = r.right + gap; y = r.top; }
      else if (r.left - gap - cw > 12) { x = r.left - gap - cw; y = r.top; }
      else if (r.bottom + gap + ch < vh - 12) { x = r.left; y = r.bottom + gap; }
      else { x = r.left; y = r.top - gap - ch; }
      card.style.left = `${Math.min(Math.max(12, x), vw - cw - 12)}px`;
      card.style.top = `${Math.min(Math.max(12, y), vh - ch - 12)}px`;
    };
    // Le bloc demandé par `show` est affiché le temps de sa bulle.
    const unreveal = () => doc.querySelectorAll('.tour-shown').forEach(el => el.classList.remove('tour-shown'));
    const show = i => {
      at = i;
      const s = steps[at];
      unreveal();
      if (s.show) doc.querySelectorAll(s.show).forEach(el => el.classList.add('tour-shown'));
      const last = at === steps.length - 1;
      card.classList.toggle('has-preview', Boolean(s.preview));
      card.classList.toggle('is-wide', Boolean(s.wide));
      card.innerHTML = `<p class="tour-count">${at + 1} / ${steps.length}</p>
        <h2 id="tour-title">${esc(s.title)}</h2>${s.text ? s.text.split('\n').map(line => `<p>${tight(line)}</p>`).join('') : ''}
        ${s.preview ? `<div class="tour-preview" aria-hidden="true">${s.preview}</div>` : ''}
        ${s.items ? `<ul class="tour-items">${s.items.map(item => `<li><span class="tour-key tone-${esc(item.tone || 'blue')}">${item.symbol ? icon(item.symbol, { size: 16 }) : esc(item.key)}</span><span>${tight(item.text)}</span></li>`).join('')}</ul>` : ''}
        ${s.after ? `<p class="tour-after">${tight(s.after)}</p>` : ''}
        <div class="tour-actions"><button type="button" class="text-button" data-tour="skip">${last ? '' : 'Passer'}</button>
          <span>${at ? '<button type="button" class="button secondary" data-tour="prev">Précédent</button>' : ''}
          <button type="button" class="button primary" data-tour="next">${last ? 'C’est parti !' : 'Suivant'}</button></span></div>`;
      const el = doc.querySelector(s.target);
      doc.body.style.paddingBottom = padding;
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      const r = zone(s.target);
      const over = r ? Math.ceil(r.bottom - (root.innerHeight - 40)) : 0;
      if (over > 0) { doc.body.style.paddingBottom = `${over}px`; root.scrollBy(0, over); }
      place();
      // Une zone qui finit d'apparaître (animation d'entrée) bouge encore :
      // on la recale une fois l'animation terminée.
      setTimeout(() => { if (layer.isConnected && steps[at] === s) place(); }, 800);
      // La bulle réapparaît en douceur à chaque zone.
      card.classList.remove('is-in');
      void card.offsetWidth;
      card.classList.add('is-in');
      card.querySelector('[data-tour="next"]').focus();
      playDemo(card);
    };
    const close = () => {
      unreveal();
      clearInterval(demoTimer);
      layer.remove();
      doc.body.style.paddingBottom = padding;
      root.removeEventListener('resize', place);
      root.removeEventListener('scroll', place, true);
      doc.removeEventListener('keydown', keys, true);
    };
    const keys = event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); at < steps.length - 1 ? show(at + 1) : close(); }
      else if (event.key === 'ArrowLeft' && at) { event.preventDefault(); show(at - 1); }
    };
    card.addEventListener('click', event => {
      const act = event.target.closest('[data-tour]')?.dataset.tour;
      if (act === 'next') at < steps.length - 1 ? show(at + 1) : close();
      else if (act === 'prev') show(at - 1);
      else if (act === 'skip') close();
    });
    root.addEventListener('resize', place);
    root.addEventListener('scroll', place, true);
    doc.addEventListener('keydown', keys, true);
    show(0);
  }

  /* LE CONTEXTE D'ARRIVÉE : pourquoi on est là, ce qui se passe, ce qui est
   * demandé. Une fenêtre s'ouvre d'elle-même à l'arrivée sur l'exercice
   * (après « Commencer » et son carton de titre), une fois par visite ; le
   * bouton rendu par `contextButton()` la rouvre. `rows` : [[symbole,
   * libellé, texte]], ou une fonction qui les rend (null : rien à montrer),
   * pour un contexte qui change d'une étape à l'autre ; `title` de même.
   * `contextOpen()` la rouvre depuis l'écran. La visite guidée attend que
   * la fenêtre soit fermée.
   * Styles : extras-commun.css (.k-context). */
  let contextRows = null;
  let contextTitle = 'Le contexte';
  function openContext() {
    const rows = typeof contextRows === 'function' ? contextRows() : contextRows;
    if (!rows) return;
    const title = typeof contextTitle === 'function' ? contextTitle() : contextTitle;
    core().openDialog(title, `<section class="k-context"><ul>${rows.map(([symbol, label, line]) =>
      `<li><span class="k-context-icon">${icon(symbol, { size: 20 })}</span><span><strong>${esc(label)}</strong>${esc(line)}</span></li>`).join('')}</ul></section>
      <p class="k-context-go"><button type="button" class="button primary" data-act="k-context-go">C’est parti</button></p>`);
    const dialog = root.document.querySelector('#info-dialog');
    if (!dialog) return;
    dialog.classList.add('is-context');
    dialog.addEventListener('close', () => dialog.classList.remove('is-context'), { once: true });
  }
  function context(rows, title = 'Le contexte') {
    contextRows = rows;
    contextTitle = title;
    handlers = Object.assign({}, handlers, {
      'k-context': () => openContext(),
      'k-context-go': () => root.document.querySelector('#info-dialog')?.close()
    });
    if (!root.document) return;
    const wait = setInterval(() => {
      const doc = root.document;
      if (ex().reviewing() || (doc.body.classList.contains('is-briefing') && !doc.querySelector('#main .case-menu')) || doc.querySelector('.launch-veil, .page-transition') || !doc.querySelector('#main form, #main .k-page, #main .case-menu')) return;
      clearInterval(wait);
      openContext();
    }, 250);
  }
  const contextButton = () => `<button type="button" class="text-button with-icon tour-replay k-context-open" data-act="k-context">${icon('document', { size: 18 })}<span>Le contexte</span></button>`;

  // Lancement automatique : on attend que la première zone soit à l'écran
  // et que l'écran ait fini d'apparaître.
  function tour(id, steps) {
    tourSteps = steps;
    tourKey = `atelier-visite-${id}`;
    handlers = Object.assign({}, handlers, { tour: () => tourStart() });
    if (!root.document) return;
    const seenOf = key => { try { return root.localStorage.getItem(key) === '1'; } catch { return false; } };
    const shown = target => [...root.document.querySelectorAll(target)].some(el => el.getClientRects().length);
    // Chaque passage attend que sa première zone soit à l'écran.
    const autoStart = (list, key, delay) => {
      if (!list.length || seenOf(key)) return;
      const wait = setInterval(() => {
        if (ex().reviewing() || seenOf(key) || root.document.querySelector('.tour, dialog[open]') || !shown(list[0].target)) return;
        clearInterval(wait);
        // Au moment de partir, une fenêtre (le contexte) peut s'être ouverte : on attend qu'elle se ferme.
        setTimeout(function go() {
          if (root.document.querySelector('dialog[open], .launch-veil')) { setTimeout(go, 400); return; }
          tourStart(list, key);
        }, delay);
      }, 400);
    };
    autoStart(steps.filter(s => !s.later), tourKey, 2600);
    autoStart(steps.filter(s => s.later), `${tourKey}-suite`, 1600);
  }

  root.AtelierKit = Object.freeze({
    corrige, answerReview, clientCard, portraitFor, tour, tourButton, context, contextButton, contextOpen: openContext, hlDemo, dragDemo,
    esc, icon, words, seconds, filled, plural, stage, setStage, list,
    head, steps, band, tip, help, submit, act, back, reset, dialogButton, bar, utility,
    matrix, answered, score, choiceButtons,
    mountChoiceGrid, mountCompare, reach, reveal,
    deckPlaced, deckCurrent, deckPlace, deckUndo, deckSkip, deckReopen, deckDots, deckRecap, deckReview,
    mark, picked, explain, yours, model, result,
    on, dialogs, live, onDrop, refreshLive, commit, openDialog
  });
})(globalThis);
