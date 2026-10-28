/* MOTEUR D'EXERCICE · monte un exercice dans #main et gère sa vie.
 *
 * Une page d'exercice se résume à :
 *     AtelierExercise.mount('s2-A', screenFunction);
 * où `screenFunction` renvoie le HTML de l'écran. Le moteur s'occupe du
 * reste : champs, compteurs, validation, feedback, sauvegarde, navigation.
 *
 * Les écrans à plusieurs cas (3 clients, 6 étapes, 8 cartes…) utilisent le
 * curseur `cursor` : un index sauvegardé avec les réponses.
 */
(function (root) {
  'use strict';

  const core = root.AtelierCore;
  const { $, $$, esc, words, icon } = core;

  let current = null;        // l'exercice du catalogue affiché sur cette page
  let screen = null;         // fonction qui produit le HTML
  let validateFn = null;     // fonction de validation propre à l'exercice
  let feedbackFn = null;     // fonction qui produit le texte de relecture
  let onMountFn = null;      // branchements spécifiques après chaque rendu
  let afterSubmitFn = null;  // réaction à une validation réussie
  let interceptFn = null;    // avance d'étape avant la validation finale
  let answerKeyFn = null;    // fiche de corrigé détaillée ajoutée au feedback
  let casesFn = null;        // liste des cas, pour les exercices qui en ont
  let menuIntro = '';        // phrase d'accueil du menu des cas
  let menuLayout = 'cards'; // « cards » ou « rows » selon ce qui porte le cas
  let allDoneFn = null;      // dit si l'exercice entier est terminé
  let compactFeedback = false; // corrigé déjà dans l'écran : pavé réduit

  /* ─────────────────── Accès aux réponses de l'exercice ─────────────── */

  const values = () => core.entry(current.key).values;
  const value = key => values()[key] ?? '';
  const setValue = (key, v) => { values()[key] = v; };
  /* Les exercices en étapes (une question à la fois) : l'étape affichée.
   * Boutons : data-action="wizard-next" (data-require="champ" : le champ à
   * remplir avant de passer) et data-action="wizard-prev". */
  const wizardAt = () => Math.max(0, Number(values().wizard) || 0);
  const cursor = () => Number(value('cursor')) || 0;
  /* Vrai quand l'exercice a été validé : l'écran bascule alors en mode
   * relecture et place ses corrections au contact des réponses. */
  const reviewing = () => core.isDone(current.key);
  const setCursor = n => setValue('cursor', n);

  /* Liste de réponses indexée par cas : `field('reply', 2)` → « reply2 ». */
  const indexed = (name, index) => `${name}${index}`;

  /* ──────────────────────── Fabrique de champs ──────────────────────── */

  function field(key, label, options = {}) {
    const { placeholder = '', max = 500, rows = 3, wordLimit = '', hideLabel = false, type = 'textarea', help = '' } = options;
    const id = `field-${key}`;
    const described = `count-${key}`;
    const attrs = `id="${id}" name="${key}" data-field="${key}" maxlength="${max}" placeholder="${esc(placeholder)}" aria-describedby="${described}"`;
    const control = type === 'input'
      ? `<input type="text" ${attrs} value="${esc(value(key))}">`
      : `<textarea ${attrs} rows="${rows}">${esc(value(key))}</textarea>`;
    const shown = wordLimit ? words(value(key)) : String(value(key)).length;
    const limit = wordLimit || max;
    return `<div class="field">
      <label class="${hideLabel ? 'sr-only' : ''}" for="${id}">${esc(label)}</label>
      ${help && !hideLabel ? `<p class="field-help">${esc(help)}</p>` : ''}
      <div class="input-wrap">${control}<span class="counter" id="${described}" data-counter="${key}" ${wordLimit ? `data-words="${esc(wordLimit)}"` : ''}>${shown} / ${limit}${wordLimit ? ' mots' : ''}</span></div>
    </div>`;
  }

  function select(key, label, options, placeholder = 'Choisir…') {
    return `<select id="field-${key}" name="${key}" data-field="${key}" aria-label="${esc(label)}"><option value="">${esc(placeholder)}</option>${options.map(option => {
      const text = typeof option === 'string' ? option : option.label;
      const val = typeof option === 'string' ? option : option.id;
      return `<option value="${esc(val)}" ${value(key) === val ? 'selected' : ''}>${esc(text)}</option>`;
    }).join('')}</select>`;
  }

  /* Liste de choix exclusifs présentée en cartes cliquables. */
  function radioCards(key, options, extraClass = '') {
    return `<div class="radio-cards ${extraClass}" role="radiogroup" id="field-${key}" data-radio-group="${key}">${options.map(option => {
      const selected = value(key) === option.id;
      return `<label class="radio-card ${selected ? 'selected' : ''}">
        <input type="radio" name="${key}" data-field="${key}" value="${esc(option.id)}" ${selected ? 'checked' : ''}>
        ${option.symbol ? `<span class="radio-symbol">${icon(option.symbol, { size: 22 })}</span>` : ''}
        ${option.badge ? `<span class="radio-badge" aria-hidden="true">${esc(option.badge)}</span>` : ''}
        <span class="radio-body"><strong>${esc(option.label)}</strong>${option.description ? `<span>${esc(option.description)}</span>` : ''}</span>
      </label>`;
    }).join('')}</div>`;
  }

  /* Autoévaluation avant le corrigé : pour chaque critère d'une grille
   * ([titre, description]), Oui / En partie / Non. `keyOf(i)` nomme le
   * champ du critère i. Styles : extras.css du module (.self-*). */
  const SELF_GRADES = [
    { id: 'oui', label: 'Oui', symbol: 'check' },
    { id: 'partie', label: 'En partie', symbol: 'refresh' },
    { id: 'non', label: 'Non', symbol: 'close' }
  ];
  const selfList = (rubric, keyOf) => `<ol class="self-list">${rubric.map(([title, description], i) => `<li class="self-row">
      <div class="self-criterion"><h3>${esc(title)}</h3><p>${esc(description)}</p></div>
      ${radioCards(keyOf(i), SELF_GRADES, 'self-grade')}
    </li>`).join('')}</ol>`;
  const selfErrors = (rubric, keyOf, values, verb = 'dites si votre réponse y répond') => rubric
    .map(([title], i) => (SELF_GRADES.some(g => g.id === values[keyOf(i)]) ? null : { key: keyOf(i), message: `« ${title} » : ${verb}.` }))
    .filter(Boolean);
  // Le rappel de l'autoévaluation, sous le corrigé.
  const selfSummary = (rubric, keyOf, what = 'votre réponse') => `<section class="panel self-summary">
      <h2>Votre autoévaluation</h2>
      <p class="muted">Vous jugez ${esc(what)} conforme sur ${rubric.filter((_, i) => value(keyOf(i)) === 'oui').length} critères sur ${rubric.length}. Comparez avec le retour ci-dessus.</p>
      <ul class="self-summary-list">${rubric.map(([title], i) => {
        const grade = SELF_GRADES.find(g => g.id === value(keyOf(i))) || { label: 'Sans réponse', id: 'vide' };
        return `<li><span>${esc(title)}</span><span class="self-pill is-${grade.id}">${esc(grade.label)}</span></li>`;
      }).join('')}</ul>
    </section>`;

  function checkList(prefix, labels) {
    return `<fieldset class="self-checks"><legend class="sr-only">Auto-vérification</legend>${labels.map((label, i) =>
      `<label><input type="checkbox" data-field="${prefix}${i}" ${value(`${prefix}${i}`) === true ? 'checked' : ''}><span>${esc(label)}</span></label>`
    ).join('')}</fieldset>`;
  }

  /* Barre de cas : « Client 1 sur 3 », cliquable pour revenir en arrière. */
  function caseTabs(items, options = {}) {
    const { noun = 'cas', done = () => false } = options;
    const n = cursor();
    return `<div class="case-tabs" role="tablist">${items.map((item, i) =>
      `<button type="button" role="tab" class="case-tab ${i === n ? 'active' : ''} ${done(i) ? 'is-done' : ''}" data-action="goto-case" data-index="${i}" aria-selected="${i === n}"><span class="case-number">${i + 1}</span><span>${esc(item.label || `${noun} ${i + 1}`)}</span></button>`
    ).join('')}<p class="case-position">${esc(noun.charAt(0).toUpperCase() + noun.slice(1))} ${n + 1} sur ${items.length}</p></div>`;
  }

  /* Pastilles de progression : ○ ○ ● « 1 cas complété sur 3 ». */
  function caseProgress(total, doneCount, noun = 'cas') {
    return `<div class="case-progress"><span class="dots" aria-hidden="true">${Array.from({ length: total }, (_, i) =>
      `<span class="dot ${i < doneCount ? 'filled' : ''}"></span>`).join('')}</span><span>${doneCount} ${noun}${doneCount > 1 ? 's' : ''} complété${doneCount > 1 ? 's' : ''} sur ${total}</span></div>`;
  }

  /* Bandeau « corrigé disponible après… » des maquettes : retiré, n'affiche plus rien. */
  const lockNote = () => '';

  /* ─────────────── Briques de correction affichée en place ──────────── */

  /* Pastille verte ou rouge accolée à une réponse. */
  const verdictMark = (ok, label = '') =>
    `<span class="mark ${ok ? 'mark-ok' : 'mark-ko'}">${icon(ok ? 'check' : 'close', { size: 14 })}${label ? `<span>${esc(label)}</span>` : ''}</span>`;

  /* Courte explication glissée sous le champ qu'elle corrige. */
  const inlineNote = (text, tone = 'neutral') =>
    `<p class="inline-note tone-${tone}">${esc(text)}</p>`;

  /* Le bloc « version modèle », posé sous la production de l'apprenant. */
  const modelBlock = (title, body, intro = '') =>
    `<section class="model-block">
      <header class="model-head">${icon('sparkle', { size: 17 })}<h3>${esc(title)}</h3></header>
      ${intro ? `<p class="model-intro">${esc(intro)}</p>` : ''}
      ${body}
    </section>`;

  /* Liste de choix passée en relecture : la bonne réponse ressort en vert,
   * le choix erroné de l'apprenant en rouge, le reste s'efface. Remplace
   * les boutons radio, qui n'ont plus lieu d'être une fois validé. */
  function reviewOptions(options, chosen, answer) {
    return `<div class="option-review">${options.map(option => {
      const isAnswer = option.id === answer;
      const isChosen = option.id === chosen;
      const state = isAnswer ? 'is-answer' : isChosen ? 'is-wrong' : 'is-muted';
      return `<div class="option-row ${state}">
        ${option.badge ? `<span class="radio-badge">${esc(option.badge)}</span>` : ''}
        <span class="option-text">${esc(option.label)}</span>
        ${isAnswer ? verdictMark(true, isChosen ? 'Votre réponse, correcte' : 'Réponse attendue')
          : isChosen ? verdictMark(false, 'Votre réponse') : ''}
      </div>`;
    }).join('')}</div>`;
  }

  /* ─────────────── Briques du mode « un cas à la fois » ─────────────── */

  /* Le fil au-dessus d'un cas : le retour au menu, la position, et les
   * autres cas accessibles d'un clic. */
  /* Le nom des cas s'écrit « objection » ou « carte » selon l'exercice :
   * il faut donc son genre pour accorder « tous / toutes » et « traité ».
   * Un simple mot reste accepté, et vaut masculin à pluriel régulier. */
  function caseNoun(noun) {
    const descriptor = typeof noun === 'string' ? { noun } : (noun || {});
    const word = descriptor.noun || 'cas';
    return {
      word,
      plural: descriptor.plural || (word.endsWith('s') ? word : `${word}s`),
      feminine: Boolean(descriptor.feminine)
    };
  }

  function caseBar(cases, index, noun = 'cas', { dots: withDots = true } = {}) {
    const { word, plural, feminine } = caseNoun(noun);
    const done = cases.filter(item => item.done).length;
    const treated = `traité${feminine ? 'e' : ''}`;
    const dots = cases.map((item, n) => {
      const state = n === index ? 'current' : item.done ? 'filled' : '';
      return `<button type="button" class="case-dot ${state}" data-action="open-case" data-index="${n}"
        aria-label="${esc(item.label || `${word} ${n + 1}`)}${item.done ? `, ${treated}` : ''}"
        aria-current="${n === index}"><span>${n + 1}</span></button>`;
    }).join('');

    return `<div class="case-bar">
      ${core.button(`${icon('arrowLeft', { size: 16 })}<span>${feminine ? 'Toutes les' : 'Tous les'} ${esc(plural)}</span>`, 'back-to-menu', 'text-button with-icon')}
      ${withDots ? `<span class="case-switch"><span class="case-switch-label">Changer ${/^[aeiouyéèêh]/i.test(word) ? 'd’' : 'de '}${esc(word)}</span><span class="case-dots">${dots}</span></span>` : ''}
      <span class="case-bar-count"><span class="case-ring" style="--done:${(done / cases.length * 100).toFixed(0)}%" aria-hidden="true"></span>${done} sur ${cases.length} ${treated}${done > 1 ? 's' : ''}</span>
    </div>`;
  }

  /* Les pastilles seules, sans le retour au menu ni le décompte : pour
   * les écrans qui placent déjà ces deux éléments dans leur en-tête. */
  function caseDots(cases, index) {
    const dots = cases.map((item, n) => {
      const state = n === index ? 'current' : item.done ? 'filled' : '';
      return `<button type="button" class="case-dot ${state}" data-action="open-case" data-index="${n}"
        aria-label="${esc(item.label || `Cas ${n + 1}`)}${item.done ? ', traité' : ''}"
        aria-current="${n === index}"><span>${n + 1}</span></button>`;
    }).join('');
    return `<div class="case-dots-row"><span class="case-dots">${dots}</span></div>`;
  }

  /* La barre d'actions d'un cas. Avant validation : enregistrer, valider.
   * Après : la correction est affichée, on propose la suite. */
  function caseActions(cases, index, label = 'Valider ma réponse') {
    const reviewed = cases[index] && cases[index].done;
    if (!reviewed) {
      return `<div class="form-actions">
        <div class="form-meta">
          <span id="completion-status" class="completion-status"></span>
          ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
        </div>
        <button type="submit" class="button primary">${esc(label)}</button>
      </div>`;
    }

    /* Le cas est traité : on oriente vers le suivant non traité, ou vers la
     * suite du parcours si tout est fait. */
    const next = cases.findIndex((item, n) => n !== index && !item.done);
    const allDone = cases.every(item => item.done);

    return `<div class="form-actions is-reviewed">
      <div class="form-meta">
        <span class="completion-status ready">${icon('check', { size: 15 })}<span>Ce cas est traité</span></span>
      </div>
      ${next === -1
        ? (allDone
            ? core.linkButton(`<span>${core.allKeys.indexOf(current.key) === core.allKeys.length - 1 ? 'Voir mon bilan' : 'Exercice suivant'}</span>${icon('arrowRight', { size: 18 })}`, core.nextUrl(current), 'primary')
            : core.button('Revenir au menu', 'back-to-menu', 'primary'))
        : core.isDone(current.key)
          // Exercice déjà terminé (allDone) : la suite en premier, le cas suivant en option.
          ? `${core.button(`<span>Autre cas : ${esc(cases[next].label || `cas ${next + 1}`)}</span>`, 'open-case', 'text-button', `data-index="${next}"`)}${core.linkButton(`<span>${core.allKeys.indexOf(current.key) === core.allKeys.length - 1 ? 'Voir mon bilan' : 'Exercice suivant'}</span>${icon('arrowRight', { size: 18 })}`, core.nextUrl(current), 'primary')}`
          : core.button(`<span>Cas suivant : ${esc(cases[next].label || `cas ${next + 1}`)}</span>${icon('arrowRight', { size: 18 })}`, 'open-case', 'primary', `data-index="${next}"`)}
    </div>`;
  }

  /* Barre d'actions du formulaire. */
  function actions(label = 'Valider mes réponses', options = {}) {
    const { skip = false, secondary = '' } = options;
    return `<div class="form-actions">
      <div class="form-meta">
        <span id="completion-status" class="completion-status"></span>
        ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
        ${(root.ATELIER_BRIEFINGS || {})[current.key] ? core.button('Revoir la consigne', 'show-briefing', 'text-button review-brief') : ''}
        ${skip ? core.button('Passer ce cas', 'skip-case', 'text-button') : ''}
        ${secondary}
      </div>
      <button type="submit" class="button primary">${label}</button>
    </div>`;
  }

  /* ──────────────────── Page de contexte ────────────────────────────── */

  /* Vrai tant que l'apprenant n'a pas ouvert l'exercice. Le réglage est
   * rangé avec ses réponses : il suit donc le brouillon. */
  const briefingSeen = () => value('briefed') === true;
  const briefingContent = () => (root.ATELIER_BRIEFINGS || {})[current.key];

  /* On montre la consigne au premier passage, et seulement si l'exercice
   * n'a pas déjà été commencé : revenir sur un brouillon ne doit pas
   * réimposer la lecture. */
  let showingBriefing = false;

  /* ──────────────────── Menu des cas ────────────────────────────────── */

  /* Les exercices à plusieurs cas (trois clients, quatre objections…)
   * proposent un menu : l'apprenant choisit le cas qu'il veut traiter, le
   * valide, lit sa correction, puis revient choisir le suivant.
   *
   * L'écran déclare ses cas par l'option `cases` de mount(). Sans elle, le
   * menu n'existe pas et l'exercice s'ouvre directement. */
  let showingMenu = false;

  const caseList = () => (casesFn ? casesFn() : []);
  const hasMenu = () => caseList().length > 1;

  /* Le cas en cours de traitement, ou null quand on est au menu. */
  const openCase = () => {
    const raw = value('openCase');
    return Number.isInteger(raw) && raw >= 0 && raw < caseList().length ? raw : null;
  };

  /* On montre le menu dès qu'un exercice a plusieurs cas et qu'aucun n'est
   * ouvert. L'exercice validé reste consultable par le menu. */
  function shouldShowMenu() {
    if (!hasMenu()) return false;
    return openCase() === null;
  }

  // Arrivée par « Exercice suivant » (#consigne) : la page de consigne
  // s'affiche toujours, même pour un exercice déjà commencé.
  let askedBrief = root.location && root.location.hash === '#consigne';
  function shouldBrief() {
    if (!briefingContent()) return false;
    if (askedBrief) return true;
    // Aperçu (survol du menu) : toujours la page de contexte.
    if (root.document && root.document.documentElement && root.document.documentElement.dataset.preview) return true;
    if (briefingSeen()) return false;
    // Un brouillon existant vaut passage : on n'interrompt pas une reprise.
    return Object.keys(values()).length === 0;
  }

  /* La page reprend la composition de la maquette : un grand titre, une
   * carte « Votre mission » à gauche, l'aperçu de l'exercice à
   * droite. Les critères et la mise en situation complète restent
   * disponibles, repliés, pour ne pas alourdir l'écran. */
  function briefingScreen() {
    const brief = briefingContent();
    const lede = brief.lede || {};
    const previews = root.AtelierPreviews;

    /* Une illustration fournie l'emporte sur le schéma. `gallery` sert aux
     * exercices qui en comptent plusieurs (S2 A et S2 F, trois chacun). */
    /* `pending` marque un emplacement déclaré dont le fichier n'a pas encore
     * été fourni : l'écran retombe alors sur le schéma de mécanique. Déposez
     * le PNG au chemin indiqué dans js/catalog.js et retirez `pending`. */
    const pictures = current.pending ? []
      : current.gallery ? current.gallery
      : current.image ? [{ image: current.image, alt: current.alt }] : [];

    const art = pictures.length
      ? `<div class="briefing-pictures ${pictures.length > 1 ? `is-gallery count-${pictures.length}` : ''}">${pictures.map(picture =>
          `<figure class="briefing-picture"><img src="${esc(core.webAsset(picture.image))}" alt="${esc(picture.alt)}" decoding="async" loading="eager"><figcaption class="image-error" hidden>Illustration indisponible.</figcaption></figure>`
        ).join('')}</div>`
      : previews && previews.has(current.key) ? previews.preview(current.key) : '';

    return `<div class="briefing">
      <header class="briefing-head">
        <p class="briefing-eyebrow"><strong>Exercice</strong><span aria-hidden="true">·</span><span>${esc(current.seriesLabel)}</span></p>
        <h1>${esc(current.label)}</h1>
        <p class="briefing-lede">${lede.key ? `<span class="lede-key">${esc(lede.key)}</span> ` : ''}<span class="lede-rest">${esc(lede.rest || brief.task || '')}</span></p>
      </header>

      <div class="briefing-body ${pictures.length ? 'has-art' : ''}">
        <div>
          <section class="mission-card">
            <div class="mission-card-head">
              <span class="briefing-icon">${icon('document', { size: 23 })}</span>
              <h2>Votre mission</h2>
            </div>
            <p>${esc(brief.mission || brief.task)}</p>
            ${brief.quote ? core.quote(brief.quote, 'Le client dit') : ''}
            ${brief.method ? `<p class="mission-note">${icon('target', { size: 22 })}<span>${esc(brief.method)}</span></p>` : ''}
            ${core.button(`<span>Commencer l’exercice</span>${icon('arrowRight', { size: 19 })}`, 'start-exercise', 'primary')}
          </section>

        </div>

        <div class="briefing-preview">
          ${art}
        </div>
      </div>
    </div>`;
  }

  /* Le menu : une carte par cas, avec son état. Les cas sont librement
   * accessibles, dans l'ordre que l'apprenant veut. */
  function menuScreen() {
    const cases = caseList();
    const done = cases.filter(item => item.done).length;
    // Un exercice peut se terminer avant le dernier cas (allDone) : la suite s'offre alors.
    const all = done === cases.length || core.isDone(current.key);

    /* Variante « lignes » : quand la réplique du client est l'essentiel,
     * elle mérite toute la largeur, avec l'action posée à droite. Les
     * cartes conviennent mieux à un cas porté par une illustration. */
    if (menuLayout === 'rows') {
      const rows = cases.map((item, index) => `
        <li class="case-row ${item.done ? 'is-done' : ''}">
          <span class="case-row-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="case-row-body">
            <span class="case-row-state">${item.done
              ? `${icon('check', { size: 14 })}<span>Traité</span>`
              : '<span>À traiter</span>'}</span>
            ${item.hint ? `<span class="case-row-quote">« ${esc(item.hint)} »</span>` : `<span class="case-row-quote">${esc(item.label || '')}</span>`}
          </span>
          ${core.button(`<span>${item.done ? 'Revoir cet échange' : 'Réparer cet échange'}</span>${icon('arrowRight', { size: 17 })}`,
            'open-case', 'primary', `data-index="${index}"`)}
        </li>`).join('');

      return `<div class="case-menu rows">
        ${core.pageTitle(current.seriesLabel, current.label)}
        <p class="case-menu-intro">${esc(menuIntroText())}</p>
        <ol class="case-rows">${rows}</ol>
        <div class="case-menu-foot">
          ${ex_caseProgressLine(done, cases.length)}
          ${all
            ? core.linkButton(`<span>${core.allKeys.indexOf(current.key) === core.allKeys.length - 1 ? 'Voir mon bilan' : 'Exercice suivant'}</span>${icon('arrowRight', { size: 18 })}`, core.nextUrl(current), 'primary')
            : core.button('Revoir la consigne', 'show-briefing', 'text-button')}
        </div>
      </div>`;
    }

    const cards = cases.map((item, index) => {
      const label = item.label || `Cas ${index + 1}`;
      /* L'illustration du cas, quand l'écran en fournit une. Décorative :
       * le libellé et la réplique disent déjà tout, donc l'alternative
       * reste vide pour ne pas répéter l'information au lecteur d'écran. */
      const picture = item.image
        ? `<span class="case-card-picture"><img src="${esc(core.webAsset(item.image))}" alt=""></span>`
        : '';

      return `<button type="button" class="case-card ${item.done ? 'is-done' : ''} ${item.portrait ? 'has-portrait' : ''}" data-action="open-case" data-index="${index}">
        ${picture}
        <span class="case-card-body">
          <span class="case-card-top">
            <span class="case-card-number">${index + 1}</span>
            <span class="case-card-state">${item.done
              ? `${icon('check', { size: 15 })}<span>Traité</span>`
              : '<span>À traiter</span>'}</span>
          </span>
          <span class="case-card-label">${esc(label)}</span>
          ${item.hint ? `<span class="case-card-hint">« ${esc(item.hint)} »</span>` : ''}
        </span>
      </button>`;
    }).join('');

    return `<div class="case-menu">
      ${core.pageTitle(current.seriesLabel, current.label)}
      <p class="case-menu-intro">${esc(menuIntroText())}</p>
      <div class="case-cards">${cards}</div>
      <div class="case-menu-foot">
        ${ex_caseProgressLine(done, cases.length)}
        ${all
          ? core.linkButton(`<span>${core.allKeys.indexOf(current.key) === core.allKeys.length - 1 ? 'Voir mon bilan' : 'Exercice suivant'}</span>${icon('arrowRight', { size: 18 })}`, core.nextUrl(current), 'primary')
          : core.button('Revoir la consigne', 'show-briefing', 'text-button')}
      </div>
    </div>`;
  }

  /* Le texte d'accueil du menu suit l'avancement. */
  function menuIntroText() {
    const cases = caseList();
    const done = cases.filter(item => item.done).length;
    if (!done) return menuIntro || 'Choisissez le cas que vous souhaitez traiter en premier.';
    if (done === cases.length) return 'Vous avez traité tous les cas. Vous pouvez en rouvrir un pour relire votre réponse et sa correction.';
    if (core.isDone(current.key)) return `Exercice terminé. Les ${cases.length - done} autres cas restent ouverts : chacun est une nouvelle tentative, à faire quand vous voulez.`;
    return `Il vous reste ${cases.length - done} cas à traiter. Choisissez le suivant, ou rouvrez un cas déjà fait pour relire sa correction.`;
  }

  const ex_caseProgressLine = (done, total) =>
    `<p class="case-menu-count">${done} cas sur ${total} traité${done > 1 ? 's' : ''}</p>`;

  /* ───────────────────────── Rendu et cycle de vie ──────────────────── */

  /* Première apparition de l'écran (ouverture, nouveau cas) : la consigne
   * en fondu, puis l'exercice, bloc par bloc. Pas aux re-rendus d'un clic.
   * L'apparition se règle une fois l'écran entièrement monté (barre du bas
   * déplacée, ajouts de l'écran lui-même) : sinon, ces éléments arrivaient
   * d'emblée. */
  function render(focus = false) {
    drawScreen(focus);
    if (showingBriefing) return;
    if (focus || !revealed) { revealed = true; revealScreen(); }
    // Un écran redessiné pendant son apparition (minuterie, image chargée…)
    // reprend l'apparition là où elle en était, au lieu de tout montrer.
    else if (revealClock && Date.now() < revealClock.end) revealScreen(revealClock);
  }

  function drawScreen(focus) {
    /* Trois écrans possibles, dans cet ordre : la consigne, le menu des cas
     * quand l'exercice en a plusieurs, puis le cas lui-même. */
    showingBriefing = shouldBrief();
    showingMenu = !showingBriefing && shouldShowMenu();

    // Le fond de l'exercice vaut pour les trois écrans ; la consigne et le
    // menu se distinguent par leur teinte crème, posée par `is-briefing`.
    const decorated = showingBriefing || showingMenu;
    // L'exercice est à l'écran (hors carton de titre) : la musique peut partir.
    if (!showingBriefing && !launching) announceShown();
    if (showingBriefing) announce('atelier:briefing-shown');
    document.body.classList.toggle('is-briefing', decorated);
    core.applyBackground(current);

    $('#main').innerHTML = (showingBriefing ? briefingScreen()
      : showingMenu ? menuScreen()
      : screen()) + core.renderFooterNav(current);
    if (!showingBriefing) hoistEyebrow();

    if (showingBriefing || showingMenu) {
      core.renderChrome(current);
      core.renderNav(current);
      core.wireImageFallbacks();
      if (showingMenu) markSwitch();
      if (onMountFn) onMountFn();
      if (focus) { $('#main').focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }
      return;
    }
    core.renderChrome(current);
    core.renderNav(current);
    core.wireImageFallbacks();
    liftActionBar();
    placeHintButtons();
    core.wireScrollAreas();
    // La hauteur réelle n'est connue qu'après la mise en page du navigateur.
    requestAnimationFrame(() => core.markScrollables());
    updateCounters();
    updateCompletion();
    markSwitch();
    if (core.isDone(current.key)) showFeedback();
    // Après le feedback : un écran peut ainsi enrichir la fiche de corrigé.
    if (onMountFn) onMountFn();
    if (focus) { $('#main').focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }

  /* PASSAGE D'UN ÉLÉMENT À L'AUTRE (argument, série, client, étape, carte…).
   * La position se lit sur les repères de progression de l'écran (points,
   * onglets, étapes : l'élément courant parmi ses frères de même classe) et
   * sur le curseur et l'étape du moteur. Quand l'une d'elles change d'un
   * rendu à l'autre du même exercice, le contenu arrive du côté où l'on va
   * et le repère pulse. Rien au premier affichage ni sur un clic qui ne
   * change pas de position. */
  const MARKERS = ':is([class*="dot"], [class*="tab"], [class*="step"], [class*="pip"]):is(.is-current, .is-active, .is-now, [aria-current="step"], [aria-current="true"], [role="tab"][aria-selected="true"])';
  const STILL = '.k-head, .k-bar, header, h1, .eyebrow, .k-subtitle, nav, script, style, .form-actions, [class*="rail"], [class*="stepper"], [class*="steps"], [class*="dots"], [class*="tabs"], [role="tablist"]';
  let lastSpots = null;

  function positions() {
    const spots = { cursor: { index: cursor() }, wizard: { index: wizardAt() }, stage: { index: Number(value('stage')) || 1 }, case: { index: showingMenu ? -1 : (Number.isInteger(value('openCase')) ? value('openCase') : -1) } };
    [...($$(`#main ${MARKERS}`) || [])].forEach(marker => {
      const group = marker.classList[0];
      if (!group || spots[group]) return;
      const siblings = [...marker.parentElement.children].filter(el => el.classList.contains(group));
      if (siblings.length > 1) spots[group] = { index: siblings.indexOf(marker), marker };
    });
    return spots;
  }

  function markSwitch() {
    const spots = positions();
    const previous = lastSpots;
    lastSpots = { key: current.key, spots };
    if (!previous || previous.key !== current.key) return;
    // Venir du menu n'est pas passer d'un cas à l'autre : l'apparition de l'écran suffit.
    if (previous.spots.case && previous.spots.case.index === -1) return;
    const moved = Object.keys(spots).find(name => previous.spots[name] && previous.spots[name].index !== spots[name].index);
    if (!moved) return;
    const forward = spots[moved].index > previous.spots[moved].index;
    const page = $('#main .k-page') || [...$('#main').children].find(el => el.children.length > 1 && !el.matches(`${STILL}, .bottom-navigation`));
    if (!page) return;
    // Les repères restent en place : un bloc qui en contient un n'est pas
    // animé en entier, on descend dans ses enfants (trois niveaux au plus).
    const markers = Object.values(spots).map(spot => spot.marker).filter(Boolean);
    /* Le halo entoure la première carte arrondie du contenu (elle-même ou
     * un descendant proche), jamais un bloc carré qui l'enveloppe. */
    let haloDone = false;
    const halo = el => {
      if (haloDone) return;
      const card = [el, ...el.querySelectorAll(':scope > *, :scope > * > *')].find(node => {
        const style = getComputedStyle(node);
        return parseFloat(style.borderTopLeftRadius) >= 8 && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && node.offsetWidth > 200;
      });
      if (!card) return;
      haloDone = true;
      card.classList.remove('k-switch-halo');
      void card.offsetWidth;
      card.classList.add('k-switch-halo');
      const off = event => { if (event.target === card && event.animationName === 'k-switch-glow') { card.classList.remove('k-switch-halo'); card.removeEventListener('animationend', off); } };
      card.addEventListener('animationend', off);
    };
    const animate = (parent, depth) => [...parent.children].forEach(el => {
      if (el.matches(STILL)) return;
      if (markers.some(marker => el.contains(marker))) { if (depth < 3) animate(el, depth + 1); return; }
      el.classList.remove('k-switch-next', 'k-switch-prev');
      void el.offsetWidth;
      el.classList.add(forward ? 'k-switch-next' : 'k-switch-prev');
      halo(el);
      // Animation finie, la classe part : sinon le bloc reste un calque à
      // part et recouvre la liste déroulante ouverte du bloc précédent.
      el.addEventListener('animationend', event => {
        if (event.target === el && /^k-switch-(next|prev|fade)$/.test(event.animationName)) el.classList.remove('k-switch-next', 'k-switch-prev');
      });
    });
    animate(page, 0);
    Object.values(spots).forEach(spot => { if (spot.marker && previous.spots[spot.marker.classList[0]]?.index !== spot.index) pulse(spot.marker); });
  }

  /* Un petit repère (point, pastille) pulse en grand. Un grand repère (un
   * onglet avec son texte) ne grossit pas : seule sa pastille ronde pulse,
   * doucement ; sans pastille, il s'entoure juste d'un halo. */
  function pulse(marker) {
    const small = el => { const r = el.getBoundingClientRect(); return r.width <= 64 && r.height <= 64; };
    if (small(marker)) { marker.classList.add('k-switch-pulse'); return; }
    const badge = [...marker.querySelectorAll('*')].find(el => {
      const r = el.getBoundingClientRect();
      return r.width >= 16 && small(el) && Math.abs(r.width - r.height) < 6;
    });
    if (badge) badge.classList.add('k-switch-pop');
    else marker.classList.add('k-switch-halo');
  }

  /* « VOIR UN REPÈRE » À SA PLACE. Le bouton naît dans la barre du bas ; il
   * remonte à droite du titre de la zone de réponse (le titre qui précède le
   * premier champ de son bloc), là où on se pose la question. Sans titre
   * repérable, il reste en bas. Une case vide garde l'équilibre de la barre. */
  function placeHintButtons() {
    const buttons = $$('#main .k-dialog-button');
    if (!buttons) return;
    [...buttons].forEach(button => {
      if (!/repère|indice/i.test(button.textContent) || button.closest('.hint-row')) return;
      const block = button.closest('form, section, .k-panel');
      const field = block && block.querySelector('.field, textarea');
      const fieldBox = field && (field.closest('.field') || field);
      if (!fieldBox) return;
      let heading = fieldBox.previousElementSibling;
      while (heading && heading.matches('p, .field-help, .k-muted')) heading = heading.previousElementSibling;
      if (!heading || !heading.matches('h2, h3, h4, .rb-label')) return;
      const row = document.createElement('div');
      row.className = 'hint-row';
      heading.before(row);
      row.append(heading);
      const spot = document.createElement('span');
      spot.className = 'hint-spot';
      button.replaceWith(spot);
      row.append(button);
    });
  }

  /* La barre du bas (Retour, Passer, Valider…) quitte son panneau : posée
   * sur le fond, ses boutons tiennent les bords gauche et droit de la page.
   * Elle reste liée au formulaire par l'attribut `form`, si bien que
   * « Valider » soumet toujours. L'écran étant redessiné en entier à chaque
   * changement, le déplacement est refait à chaque rendu. On ne déplace que
   * l'unique barre d'un écran : quand il y en a plusieurs, chacune
   * appartient à son bloc et y reste. */
  function liftActionBar() {
    const bars = $$('#main .k-bar, #main .form-actions');
    if (!bars || bars.length !== 1) return;
    const bar = bars[0];
    // Un écran peut garder sa barre près du contenu : `data-bar-stays`.
    if (bar.closest('[data-bar-stays]')) return;
    const main = $('#main');
    const page = bar.closest('.k-page') || [...main.children].find(child => child.contains(bar));
    if (!page) return;
    /* Le bloc à quitter : le bloc de premier rang de la page qui contient
     * la barre (panneau, colonnes…), ou la page elle-même quand c'est déjà
     * un panneau. Une barre posée à même la page ne bouge pas. */
    let block = bar;
    while (block.parentElement && block.parentElement !== page) block = block.parentElement;
    if (page.matches('form, .k-panel, .panel')) block = page;
    if (block !== bar) {
      const form = bar.closest('form');
      if (form) {
        if (!form.id) form.id = 'exercise-form';
        bar.querySelectorAll('button, input, select, textarea').forEach(control => control.setAttribute('form', form.id));
      }
      block.after(bar);
    }
    bar.classList.add('is-detached');
  }

  /* L'entrée dans l'exercice : un carton de titre crème (surtitre, titre,
   * fine barre qui se remplit) couvre la page de contexte ; l'exercice se
   * prépare dessous, puis apparaît en remontant doucement quand le carton
   * s'efface, en douceur. Environ 2,6 s en tout. Un second clic pendant l'animation ne
   * fait rien ; avec « réduire les animations », on entre directement. */
  let launching = false;
  /* Les étapes annoncées à sounds.js, qui choisit la musique : page de
   * contexte, lancement (« Commencer l'exercice »), exercice à l'écran. */
  const announce = name => { if (typeof root.CustomEvent === 'function') document.dispatchEvent(new root.CustomEvent(name)); };
  const announceShown = () => announce('atelier:exercise-shown');

  function openExercise() {
    if (askedBrief) {
      askedBrief = false;
      try { root.history.replaceState(null, '', root.location.pathname + root.location.search); } catch { /* sans historique */ }
    }
    setValue('briefed', true);
    // Un exercice à cas multiples passe par son menu ; les autres
    // ouvrent directement leur unique cas.
    if (!hasMenu()) setValue('openCase', 0);
    core.persist();
    render(true);
  }

  function launchExercise() {
    if (launching) return;
    announce('atelier:exercise-launch');
    const calm = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm) { openExercise(); return; }
    launching = true;
    const veil = document.createElement('div');
    // Deux fonds illustrés, tirés au hasard à chaque lancement.
    veil.className = `launch-veil bg-${1 + Math.floor(Math.random() * 2)}`;
    veil.setAttribute('role', 'status');
    veil.innerHTML = `<div class="launch-card">
      <p class="launch-eyebrow">Exercice · ${esc(current.seriesLabel)}</p>
      <p class="launch-title">${esc(current.label)}</p>
      <span class="launch-bar" aria-hidden="true"><span></span></span>
    </div>`;
    document.body.appendChild(veil);
    requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('is-shown')));
    setTimeout(openExercise, 650);
    setTimeout(() => {
      veil.classList.add('is-leaving');
      $('#main')?.classList.add('is-entering');
      announceShown();
    }, 1550);
    setTimeout(() => {
      veil.remove();
      $('#main')?.classList.remove('is-entering');
      launching = false;
    }, 2600);
  }

  /* L'APPARITION DE L'ÉCRAN. La consigne (surtitre, titre, sous-titre)
   * arrive en fondu ; l'exercice suit, bloc par bloc, chacun un peu après
   * le précédent, en remontant doucement. Les blocs sont les enfants de la
   * page, et ceux des formulaires et colonnes qu'elle contient. Juste après
   * « Commencer l'exercice », tout part après le carton de titre. Avec
   * « réduire les animations », rien ne bouge (voir extras.css). */
  let revealed = false;
  const HEAD = '.k-head, .page-title, header, h1, .subtitle, .k-subtitle, .k-band, .instruction-band';
  // Le menu des cas aussi : ses cartes arrivent l'une après l'autre.
  const SPLIT = 'form, .k-columns, .two-columns, .k-page, .intrus-stage, .duo-page, .stacked-screen, .case-menu, .case-cards, .case-rows';
  function painted(el) {
    const style = root.getComputedStyle ? root.getComputedStyle(el) : null;
    if (!style) return false;
    const fill = style.backgroundColor && !/rgba\(.*,\s*0\)|transparent/.test(style.backgroundColor);
    const border = parseFloat(style.borderTopWidth) > 0 && style.borderTopStyle !== 'none';
    return Boolean(fill || border || (style.boxShadow && style.boxShadow !== 'none') || (style.backgroundImage && style.backgroundImage !== 'none'));
  }

  let revealClock = null;
  let revealSounds = [0, 0];
  function revealScreen(clock = null) {
    const resumed = Boolean(clock);
    const main = $('#main');
    if (!main) return;
    const blocks = [];
    const visit = (el, depth) => {
      [...el.children].forEach(child => {
        if (child.matches('.exercise-nav, nav, script, dialog, [hidden], .page-tag')) return;
        // Un bloc qui se voit lui-même (fond, bordure, ombre) apparaît d'un
        // seul tenant : découpé, son cadre vide serait là dès le départ.
        if (depth < 2 && child.matches(SPLIT) && child.children.length > 1 && !child.matches(HEAD) && !painted(child)) visit(child, depth + 1);
        // Au corrigé, une liste (lignes de réponses) arrive ligne par ligne.
        else if (clock && clock.deep && depth < 4 && child.matches('ol, ul, tbody, table') && child.children.length > 1 && !painted(child)) visit(child, depth + 1);
        else blocks.push(child);
      });
    };
    visit(main, 0);
    const tag = main.querySelector(':scope > .page-tag');
    const now = Date.now();
    if (!clock) clock = { t0: now, start: launching ? 1.45 : 0.1 };
    const elapsed = (now - clock.t0) / 1000;
    const start = clock.start - elapsed; // négatif : l'animation reprend en cours
    // Le temps de lire la consigne avant que l'exercice ne commence à venir.
    const READ_DELAY = clock.read ?? 1.3;
    const heads = blocks.filter(el => el.matches(HEAD));
    const rest = blocks.filter(el => !el.matches(HEAD));
    [tag, ...heads].filter(Boolean).forEach(el => { el.classList.add('is-revealing', 'is-reveal-head'); el.style.setProperty('--reveal-delay', `${start}s`); });
    clock.end = clock.t0 + (clock.start + READ_DELAY + Math.min(rest.length, 13) * 0.15 + 0.8) * 1000;
    revealClock = clock;
    rest.forEach((el, i) => { el.classList.add('is-revealing'); el.style.setProperty('--reveal-delay', `${(start + READ_DELAY + Math.min(i, 12) * 0.15).toFixed(2)}s`); });
    // Les sons de l'apparition, seulement au premier passage (pas à une
    // reprise après un nouveau dessin de l'écran).
    if (!resumed) {
      clearTimeout(revealSounds[0]); clearTimeout(revealSounds[1]);
      const cue = name => root.AtelierSounds && root.AtelierSounds.cue && root.AtelierSounds.cue(name);
      revealSounds = [setTimeout(() => cue('brief'), Math.max(0, start) * 1000),
        rest.length ? setTimeout(() => cue('body'), Math.max(0, start + READ_DELAY) * 1000) : 0];
    }
    const done = event => { const el = event.target; if (el.classList && el.classList.contains('is-revealing')) { el.classList.remove('is-revealing', 'is-reveal-head'); el.style.removeProperty('--reveal-delay'); } };
    main.addEventListener('animationend', done);
  }

  /* Le surtitre de l'exercice (« Méthode CAP »…) quitte l'en-tête et se pose
   * en pastille dans l'angle haut gauche de la zone d'exercice (.page-tag,
   * voir extras.css). Seul le premier surtitre de la page est concerné. */
  function hoistEyebrow() {
    const main = $('#main');
    const eyebrow = main && main.querySelector('.eyebrow');
    if (!eyebrow || !eyebrow.textContent.trim()) return;
    // Un surtitre qui n'est qu'un numéro (« Exercice 1.2 ») ne dit rien de
    // plus que les onglets : il disparaît.
    if (/^\s*Exercice(\s+[\w.-]+)?\s*$/i.test(eyebrow.textContent)) { eyebrow.remove(); return; }
    // « Exercice 1.3 · Méthode CAP » → « Méthode CAP » : le numéro et le
    // mot « Exercice » sont déjà dans les onglets.
    const label = eyebrow.textContent.replace(/^\s*Exercice(\s+[\w.-]+)?\s*·\s*/i, '');
    if (label.trim() && label !== eyebrow.textContent) eyebrow.textContent = label;
    eyebrow.classList.add('page-tag');
    main.prepend(eyebrow);
  }

  /* Re-rendu après un changement de structure (cas suivant, ajout de ligne…). */
  function rebuild(focusKey) {
    core.persist();
    render();
    if (focusKey) $(`[data-field="${focusKey}"]`)?.focus();
  }

  function changed() {
    core.entry(current.key).done = false;
    const feedback = $('#feedback');
    if (feedback) feedback.hidden = true;
    const errors = $('#form-errors');
    if (errors) errors.hidden = true;
    $$('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
    core.markSaving();
    updateCounters();
    updateCompletion();
    core.renderChrome(current);
    core.renderNav(current);
  }

  function updateCounters() {
    $$('[data-counter]').forEach(el => {
      const key = el.dataset.counter;
      const input = $(`[data-field="${key}"]`);
      if (!input) return;
      const limit = el.dataset.words || input.maxLength;
      const n = el.dataset.words ? words(value(key)) : String(value(key)).length;
      el.textContent = `${n} / ${limit}${el.dataset.words ? ' mots' : ''}`;
      // Une limite en mots écrite « 80–120 » signale au-delà de la borne haute.
      const max = Number(String(limit).split(/[–-]/).pop());
      el.classList.toggle('over-limit', Boolean(el.dataset.words) && Number.isFinite(max) && n > max);
    });
  }

  function updateCompletion() {
    const status = $('#completion-status');
    if (!status) return;
    const errors = validateFn ? validateFn(values(), current) : [];
    const n = new Set(errors.map(e => e.key)).size;
    status.textContent = core.isDone(current.key) ? 'Exercice terminé' : n ? `${n} élément${n > 1 ? 's' : ''} à compléter` : 'Prêt à valider';
    status.classList.toggle('ready', n === 0);
  }

  function showFeedback(focus = false) {
    const node = $('#feedback');
    if (!node) return;
    const text = feedbackFn ? feedbackFn(values(), current) : '';
    if (!text) return;
    const isLast = core.allKeys.indexOf(current.key) === core.allKeys.length - 1;
    const body = Array.isArray(text) ? text : [text];
    node.hidden = false;
    /* Les écrans dont le corrigé est déjà posé au contact des réponses
     * n'ont pas besoin du pavé complet : ils demandent le mode compact,
     * qui ne garde que le bouton de suite, et le bilan chiffré s'il y en a
     * un (« 3 rôles sur 6… ») : les phrases d'invitation générales
     * (« Bon choix. Comparez… ») sont retirées, comme l'avertissement. */
    node.classList.toggle('is-compact', compactFeedback);
    node.innerHTML = `${compactFeedback ? '' : `<span class="feedback-tag">${icon('check', { size: 16 })}<span>Réponse complétée</span></span>
      <h3 id="feedback-title">Pour relire votre réponse</h3>`}
      ${body.filter(paragraph => !compactFeedback || /\d/.test(paragraph) || !/compar|relise/i.test(paragraph)).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}
      <span class="feedback-anchor" hidden></span>
      ${core.linkButton(isLast ? 'Voir mon bilan' : 'Continuer', core.nextUrl(current), 'primary')}`;
    // L'écran peut insérer sa fiche de corrigé détaillée avant l'avertissement.
    if (answerKeyFn) {
      const html = answerKeyFn(values(), current);
      if (html) node.querySelector('.feedback-anchor').insertAdjacentHTML('beforebegin', html);
    }
    // Réponses ouvertes : l'indicateur de points (indicateur.js), en tête du corrigé.
    const analysis = root.AtelierAnalyse?.forExercise(current.key, values());
    if (analysis) {
      // La réponse est déjà relue au-dessus : l'encadré devient celui du score.
      node.querySelector('.feedback-tag')?.remove();
      const title = node.querySelector('#feedback-title');
      if (title) { title.textContent = 'Votre score estimatif'; title.insertAdjacentHTML('afterend', analysis); }
      else node.insertAdjacentHTML('afterbegin', analysis);
    }
    if (focus) node.focus();
  }

  function submit() {
    /* Écrans à plusieurs cas : tant qu'il reste une étape devant et que
     * l'étape courante est remplie, « valider » avance au cas suivant au
     * lieu de clore l'exercice. L'intercepteur renvoie true s'il a agi. */
    if (interceptFn && interceptFn(values(), current)) {
      core.persist();
      render();
      $('#main').focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const errors = validateFn ? validateFn(values(), current) : [];
    const area = $('#form-errors');
    $$('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
    if (errors.length) {
      if (area) {
        area.hidden = false;
        area.innerHTML = `<strong>Quelques éléments restent à compléter.</strong><ul>${errors.map(e => `<li>${esc(e.message)}</li>`).join('')}</ul>`;
      }
      for (const error of errors) $(`[data-field="${error.key}"]`)?.setAttribute('aria-invalid', 'true');
      const first = $(`[data-field="${errors[0].key}"]`) || $(`#field-${errors[0].key}`);
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      first?.focus();
      return;
    }
    if (area) area.hidden = true;
    // L'écran marque d'abord son cas comme traité, puis on recalcule si
    // l'exercice entier est terminé : un exercice à cas multiples ne l'est
    // qu'une fois tous ses cas validés.
    if (afterSubmitFn) afterSubmitFn(values(), current);
    core.entry(current.key).done = allDoneFn ? allDoneFn(values(), current) : true;
    core.persist();
    render();
    // Le corrigé arrive en cascade : un bloc après l'autre, sans attendre.
    showFeedback(true);
    if (core.isDone(current.key)) revealScreen({ t0: Date.now(), start: 0.05, read: 0.2, deep: true });
    $('#feedback')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

/* ───────────────────────── Menus déroulants ───────────────────────────   * La liste native du navigateur ne se met pas en forme : chaque <select>   * d'un exercice est doublé d'une liste à nous (bouton bleu pâle, liste   * claire, choix surligné). Le <select> reste dans la page, caché : c'est   * lui qui porte la valeur (sauvegarde, validation) ; la liste ne fait que   * le piloter. Styles : extras-commun.css (.pick). */
  function enhanceSelect(select) {
    const wrap = document.createElement('div');
    wrap.className = 'pick';
    select.before(wrap);
    wrap.append(select);
    select.tabIndex = -1;    select.dataset.picked = 'true';
    const listId = `${select.id}-list`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pick-button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', listId);
    button.setAttribute('aria-label', select.getAttribute('aria-label') || '');
    const list = document.createElement('ul');
    list.className = 'pick-list';
    list.id = listId;
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    const items = [...select.options].map((option, i) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.id = `${listId}-${i}`;
      li.dataset.value = option.value;
      li.textContent = option.textContent;
      list.append(li);
      return li;
    });
    wrap.append(button, list);
    let active = -1;

    const paint = () => {
      const chosen = select.selectedIndex;
      button.innerHTML = `<span>${esc(select.options[chosen]?.textContent || '')}</span>${icon('chevronRight', { size: 20 })}`;
      button.classList.toggle('is-empty', !select.value);
      items.forEach((li, i) => li.setAttribute('aria-selected', String(i === chosen)));
    };
    const highlight = i => {
      active = Math.max(0, Math.min(items.length - 1, i));
      items.forEach((li, k) => li.classList.toggle('is-active', k === active));
      button.setAttribute('aria-activedescendant', items[active].id);
      items[active].scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      $$('.pick-list:not([hidden])').forEach(other => { if (other !== list) other.closest('.pick').close(); });
      list.hidden = false;
      wrap.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      highlight(Math.max(0, select.selectedIndex));
    };
    const close = () => {
      list.hidden = true;
      wrap.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.removeAttribute('aria-activedescendant');
    };
    wrap.close = close;
    const choose = i => {
      if (select.selectedIndex !== i) {
        select.selectedIndex = i;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      paint();
      close();
      button.focus();
    };

    button.addEventListener('click', () => (list.hidden ? open() : close()));
    button.addEventListener('keydown', event => {
      const isOpen = !list.hidden;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!isOpen) open();
        else highlight(active + (event.key === 'ArrowDown' ? 1 : -1));
      } else if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
        event.preventDefault();
        choose(active);
      } else if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab' && isOpen) close();
    });
    items.forEach((li, i) => {
      li.addEventListener('mousedown', event => event.preventDefault());
      li.addEventListener('click', () => choose(i));
      li.addEventListener('mousemove', () => { if (active !== i) highlight(i); });
    });
    // La validation donne le focus au <select> fautif : on le renvoie au bouton.
    select.addEventListener('focus', () => button.focus());
    paint();
  }


  /* Tout <select> qui apparaît dans #main (rendu complet ou partiel) est
   * doublé aussitôt ; un clic ailleurs referme la liste ouverte. */
  function wirePickers() {
    const main = $('#main');
    if (!main) return;
    const enhanceAll = () => $$('#main select:not([data-picked])').forEach(enhanceSelect);
    // Absent du DOM simulé des tests : le premier passage suffit alors.
    if (window.MutationObserver) new MutationObserver(enhanceAll).observe(main, { childList: true, subtree: true });
    enhanceAll();
    document.addEventListener('click', event => {
      $$('.pick.is-open').forEach(pick => { if (!pick.contains(event.target)) pick.close(); });
    });
  }

  /* Les zones d'écriture n'ont plus de poignée : elles grandissent avec
   * le texte (jamais en dessous de leur hauteur prévue), à la saisie et à
   * chaque rendu (brouillon rechargé). */
  function fitTextarea(area) {
    area.style.height = 'auto';
    if (area.scrollHeight > area.clientHeight) area.style.height = `${area.scrollHeight + 2}px`;
  }

  function wireAutoGrow() {
    const main = $('#main');
    if (!main) return;
    const fitAll = () => $$('#main textarea').forEach(fitTextarea);
    if (window.MutationObserver) new MutationObserver(fitAll).observe(main, { childList: true, subtree: true });
    document.addEventListener('input', event => { if (event.target.matches?.('#main textarea')) fitTextarea(event.target); });
    window.addEventListener('resize', fitAll);
    fitAll();
  }

  /* ─────────────────────────── Branchements ─────────────────────────── */

  function wire() {
    wirePickers();
    wireAutoGrow();
    document.addEventListener('input', event => {
      const input = event.target.closest('[data-field]');
      if (!input) return;
      setValue(input.dataset.field, input.type === 'checkbox' ? input.checked : input.value);
      changed();
      if (input.type === 'radio') syncRadioCards(input.dataset.field);
    });

    document.addEventListener('submit', event => {
      if (!event.target.matches('#main form')) return;
      event.preventDefault();
      submit();
    });

    document.addEventListener('click', event => {
      const control = event.target.closest('[data-action]');
      if (!control) return;
      switch (control.dataset.action) {
        case 'save': core.persist(true); break;
        case 'start-exercise': launchExercise(); break;
        case 'open-case':
          setValue('openCase', Number(control.dataset.index));
          setValue('stage', 1);
          core.persist();
          // Le cas s'ouvre aussitôt : pas le temps de lecture d'une consigne.
          drawScreen(true);
          if (!showingBriefing) { revealed = true; revealScreen({ t0: Date.now(), start: 0.05, read: 0.15 }); }
          break;
        case 'back-to-menu':
          setValue('openCase', null);
          core.persist();
          render(true);
          break;
        case 'show-briefing':
          // Relecture volontaire : on retire la marque, la consigne revient.
          setValue('briefed', false);
          core.persist();
          render(true);
          break;
        case 'close-dialog': $('#info-dialog')?.close(); break;
        case 'goto-case': setCursor(Number(control.dataset.index)); setValue('stage', 1); rebuild(); break;
        case 'previous-case': setCursor(Math.max(0, cursor() - 1)); setValue('stage', 1); rebuild(); break;
        case 'next-case': setCursor(cursor() + 1); rebuild(); break;
        // Passer un cas repart de sa première étape.
        case 'skip-case': setCursor(cursor() + 1); setValue('stage', 1); rebuild(); break;
        case 'wizard-next': {
          // data-require : un ou plusieurs champs (séparés par des virgules) à remplir d'abord.
          const need = (control.dataset.require || '').split(',').filter(Boolean).find(key => !String(value(key) || '').trim());
          if (need) {
            core.toast('Complétez votre réponse pour continuer.');
            $(`[data-field="${need}"]`)?.focus();
            break;
          }
          setValue('wizard', wizardAt() + 1); core.persist(); rebuild(); window.scrollTo({ top: 0, behavior: 'instant' });
          break;
        }
        case 'wizard-prev': setValue('wizard', Math.max(0, wizardAt() - 1)); core.persist(); rebuild(); break;
        default: break;
      }
    });

    window.addEventListener('pagehide', () => core.persist());
    core.wireDialog();
  }

  function syncRadioCards(key) {
    $$(`[data-radio-group="${key}"] .radio-card`).forEach(card => {
      card.classList.toggle('selected', card.querySelector('input').checked);
    });
  }

  /* ───────────────────────────── Montage ────────────────────────────── */

  function mount(key, options) {
    current = core.findExercise(key);
    if (!current) throw new Error(`Exercice inconnu : ${key}`);
    screen = options.screen;
    validateFn = options.validate || null;
    feedbackFn = options.feedback || null;
    onMountFn = options.onMount || null;
    afterSubmitFn = options.afterSubmit || null;
    interceptFn = options.intercept || null;
    compactFeedback = Boolean(options.compactFeedback);
    answerKeyFn = options.answerKey || null;
    casesFn = options.cases || null;
    menuIntro = options.menuIntro || '';
    menuLayout = options.menuLayout || 'cards';
    allDoneFn = options.allDone || null;
    document.title = `${current.label} · ${current.seriesLabel} · L’Atelier Vente`;
    wire();
    render();
    core.wireFullscreen();
    core.wireKeyboardHelp();
    core.wireScale();
  }

  root.AtelierExercise = Object.freeze({
    mount, render, rebuild, changed, submit, showFeedback,
    values, value, setValue, cursor, setCursor, indexed, wizardAt,
    field, select, radioCards, checkList, selfGrades: SELF_GRADES, selfList, selfErrors, selfSummary, caseTabs, caseProgress, lockNote, actions,
    caseBar, caseDots, caseActions,
    reviewing, verdictMark, inlineNote, modelBlock, reviewOptions,
    openCase, hasMenu,
    get current() { return current; }
  });
})(globalThis);
