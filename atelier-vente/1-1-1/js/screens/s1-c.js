/* S1 C · Comparer deux ouvertures.
 *
 * Trois temps, pour ne poser qu'une question à la fois :
 *   1. CHOISIR    : les deux ouvertures côte à côte, rien d'autre.
 *   2. ARGUMENTER : un argument à la fois, relié à un critère (3 à 5).
 *   3. EMPRUNTER  : ce que l'on reprendrait à l'autre ouverture.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S1;
  const { required } = window.ExerciseRules;

  // L'ouverture 1 est celle attendue par le corrigé de la fiche.
  const expected = '1';

  const ARGUE_ART = { image: 'assets/illustrations/s1/choix-reflexion.webp', alt: 'Une femme réfléchit, un stylo contre le menton, une bulle de pensée au-dessus d’elle.' };
  // Provisoire : l'illustration de l'étape 2, en attendant celle de la maquette.
  const BORROW_ART = { image: 'assets/illustrations/s1/choix-reflexion.webp', alt: 'Une femme réfléchit, un stylo contre le menton.' };
  const art = ({ image, alt }) => `<img class="compare-art" src="${esc(core.asset(image))}" alt="${esc(alt)}">`;

  const stage = () => [2, 3].includes(Number(ex.value('stage'))) ? Number(ex.value('stage')) : 1;
  const argumentCount = () => Math.min(5, Math.max(3, Number(ex.value('argumentCount')) || 3));
  // L'argument affiché à l'étape 2, de 1 à argumentCount().
  const argIndex = () => Math.min(argumentCount(), Math.max(1, Number(ex.value('argIndex')) || 1));
  const other = choice => choice === '1' ? '2' : '1';

  // Une ligne par critère, sous son nom, dans les petites cartes de l'étape 2.
  const CRITERIA_HELP = {
    'Accueil et climat': 'Saluer, remercier, mettre à l’aise.',
    'Présentation': 'Dire qui l’on est, sa fonction, son entreprise.',
    'Cadrage': 'Annoncer l’objet, le déroulé ou la durée.',
    'Transition vers l’écoute': 'Donner la parole au client.',
    'Posture centrée client': 'Parler de lui plus que de soi.',
    'Adaptation': 'Tenir compte du client et de la situation.'
  };

  /* Erreurs d'un argument : un critère de la liste et une explication. */
  function argumentErrors(values, i) {
    const errors = [];
    if (!content.criteria.includes(values[`criterion${i}`])) errors.push({ key: `criterion${i}`, message: `Argument ${i} : choisissez un critère.` });
    const error = required(values, `argument${i}`, `Argument ${i}`, 400);
    if (error) errors.push(error);
    return errors;
  }

  /* Le fil des trois étapes, centré au-dessus du titre. */
  function stepper(at) {
    const steps = ['Choisir', 'Argumenter', 'Reprendre'];
    return `<ol class="duo-steps compare-steps">${steps.map((label, i) => {
      const n = i + 1;
      const done = n < at;
      const active = n === at;
      return `<li class="duo-step ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}" ${active ? 'aria-current="step"' : ''}>
        <span class="duo-step-dot">${done ? icon('check', { size: 14 }) : n}</span>
        <span class="duo-step-label">${esc(label)}</span>
      </li>`;
    }).join('')}</ol>`;
  }

  /* Le rappel du choix, avec la relecture des ouvertures en fenêtre. */
  function recall(withOther = false) {
    /* Les ouvertures elles-mêmes, sous les yeux (19/11, à la place d'une
     * barre « Votre choix · Autre proposition · Relire ») : à l'étape 2, celle
     * choisie ; à l'étape 3, les deux, l'autre mise en avant puisque la
     * question porte sur elle. */
    const choice = ex.value('choice');
    const card = (n, tag, focus) => `<figure class="recall-card ${focus ? 'is-focus' : ''}">
        <figcaption><span class="recall-tag">${esc(tag)}</span><strong>Ouverture ${esc(n)}</strong></figcaption>
        <blockquote>« ${esc(content.openings[Number(n) - 1] || '')} »</blockquote>
      </figure>`;
    return `<div class="compare-recall-cards ${withOther ? 'is-two' : ''}">
      ${card(choice, 'Votre choix', false)}
      ${withOther ? card(other(choice), 'Celle que vous n’avez pas choisie', true) : ''}
    </div>`;
  }

  /* Le contexte en pastilles illustrées, chacune dans sa teinte. */
  const facts = () => `<ul class="compare-facts">${[['briefcase', 'Premier rendez-vous'], ['building', 'Petite entreprise'], ['clock', '30 min']]
    .map(([name, label]) => `<li>${icon(name, { size: 20 })}<span>${esc(label)}</span></li>`).join('')}</ul>`;

  /* ── Étape 1 : choisir ─────────────────────────────────────────────── */
  function chooseScreen() {
    const choice = ex.value('choice');
    return `<p class="k-ask">Les deux ouvertures sont acceptables. Laquelle prépare le mieux l’échange avec ce client ?</p>
      <fieldset class="opening-cards compare-openings" id="field-choice">
        <legend class="sr-only">Choisissez l’ouverture la plus efficace</legend>
        ${content.openings.map((text, index) => {
          const n = String(index + 1);
          const selected = choice === n;
          return `<article class="opening-card ${selected ? 'selected' : ''}" data-choice-card="${n}">
            <span class="tag">Ouverture ${n}</span>
            <blockquote>« ${esc(text)} »</blockquote>
            <label class="opening-pick">
              <input type="radio" name="choice" data-field="choice" value="${n}" ${selected ? 'checked' : ''}>
              <span>Choisir cette ouverture</span>
            </label>
          </article>`;
        }).join('')}
      </fieldset>
      ${core.errorsBox()}
      <div class="form-actions">
        <div class="form-meta">
          ${core.button(`${icon('list', { size: 17 })}<span>Voir la grille d’évaluation</span>`, 'rubric', 'text-button with-icon')}
        </div>
        <button type="submit" class="button primary"><span>Continuer vers mes arguments</span>${icon('arrowRight', { size: 18 })}</button>
      </div>`;
  }

  /* ── Étape 2 : argumenter, un argument à la fois ───────────────────── */
  function argueScreen() {
    const count = argumentCount();
    const i = argIndex();
    const values = ex.values();
    const dots = Array.from({ length: count }, (_, k) => {
      const n = k + 1;
      const reachable = n <= i || Array.from({ length: n - 1 }, (_, m) => m + 1).every(m => !argumentErrors(values, m).length);
      const state = n === i ? 'current' : !argumentErrors(values, n).length ? 'filled' : '';
      return `<button type="button" class="case-dot ${state}" data-action="goto-argument" data-index="${n}" ${reachable ? '' : 'disabled'}
        aria-label="Argument ${n}" aria-current="${n === i}"><span>${n}</span></button>`;
    }).join('');
    const last = i === count;

    return `<section class="panel compare-card">
        <div class="compare-card-top">
          <span class="tag">Argument ${i} sur ${count}</span>
          <span class="case-dots">${dots}</span>
        </div>
        <h2 class="explain-question">Pourquoi l’ouverture ${esc(ex.value('choice'))} vous paraît-elle plus efficace ?</h2>
        <p class="explain-help">Citez un passage de l’ouverture que vous avez choisie, puis dites pourquoi il aide ce client. Un argument à la fois.</p>
        ${ex.field(`argument${i}`, `Argument ${i}`, {
          max: 400, rows: 6, hideLabel: true,
          placeholder: 'Quand elle dit « … », le client…'
        })}
        <fieldset class="crit-pick" id="field-criterion${i}">
          <legend>Sur quel critère d’une bonne ouverture porte cet argument ?</legend>
          <div class="crit-grid">${content.criteria.map(name => {
            const chosen = ex.value(`criterion${i}`) === name;
            return `<label class="crit-card">
              <input type="radio" name="criterion${i}" data-field="criterion${i}" value="${esc(name)}" ${chosen ? 'checked' : ''}>
              <span class="crit-dot" aria-hidden="true">${icon('check', { size: 13, strokeWidth: 3 })}</span>
              <span class="crit-text"><strong>${esc(name)}</strong><span>${esc(CRITERIA_HELP[name] || '')}</span></span>
            </label>`;
          }).join('')}</div>
        </fieldset>
        <div class="compare-card-tools">
          ${last && count < 5 ? core.button(`${icon('plus', { size: 15 })}<span>Ajouter un argument</span>`, 'add-argument', 'text-button with-icon') : ''}
          ${i > 3 ? core.button(`${icon('close', { size: 15 })}<span>Supprimer cet argument</span>`, 'remove-argument', 'text-button with-icon') : ''}
        </div>
      </section>
      ${core.errorsBox()}
      <div class="form-actions">
        ${i === 1
          ? core.button(`${icon('arrowLeft', { size: 16 })}<span>Retour au choix</span>`, 'back-to-choice', 'text-button with-icon')
          : core.button(`${icon('arrowLeft', { size: 16 })}<span>Argument précédent</span>`, 'previous-argument', 'text-button with-icon')}
        <button type="submit" class="button primary"><span>${last ? 'Continuer vers la dernière étape' : `Enregistrer et passer à l’argument ${i + 1}`}</span>${icon('arrowRight', { size: 18 })}</button>
      </div>`;
  }

  /* ── Étape 3 : emprunter à l'autre ─────────────────────────────────── */
  function borrowScreen() {
    return `<div class="borrow-layout">
      <section class="panel compare-card">
        <span class="tag">Dernière étape</span>
        <h2 class="explain-question">Que reprendriez-vous de l’ouverture ${esc(other(ex.value('choice')))} ?</h2>
        <p class="explain-help">Choisissez une bonne idée de l’ouverture que vous n’avez pas retenue, puis dites où et comment vous l’ajouteriez à la vôtre.</p>
        ${ex.field('borrow', 'Ce que vous reprendriez à l’autre', {
          max: 500, rows: 6, hideLabel: true,
          placeholder: 'Je reprendrais… parce que… Je l’intégrerais ainsi…'
        })}
        ${ex.lockNote('Une réponse possible s’affichera après validation.')}
      </section>
      ${art(BORROW_ART)}
      </div>
      ${core.errorsBox()}
      <div class="form-actions">
        ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Retour à mes arguments</span>`, 'back-to-arguments', 'text-button with-icon')}
        <div class="form-meta">
          <span id="completion-status" class="completion-status"></span>
          ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
          <button type="submit" class="button primary"><span>Valider mon analyse</span>${icon('arrowRight', { size: 18 })}</button>
        </div>
      </div>`;
  }

  /* ── Relecture, une fois validé ────────────────────────────────────── */
  /* Le corrigé au modèle de S1 A (js/corrige.js) : les deux ouvertures et
   * le choix attendu, le score estimatif, puis une ligne par réponse : vos
   * arguments, votre emprunt, chacun face à une réponse possible. */
  function reviewScreen() {
    const choice = ex.value('choice');
    const notes = content.feedback.C;
    const kit = window.AtelierCorrige;
    const result = kit.score('s1-C', ex.values());
    const [argBloc, borrowBloc] = result ? result.blocs : [];
    const args = Array.from({ length: argumentCount() }, (_, k) => {
      const n = k + 1;
      return `<li><span class="chip chip-${k % 3}">${esc(ex.value(`criterion${n}`))}</span><p>« ${kit.part(argBloc, ex.value(`argument${n}`))} »</p></li>`;
    }).join('');
    return `<section class="an-review compare-review">${kit.head(result)}<div class="opening-cards compare-openings">${content.openings.map((text, index) => {
        const n = String(index + 1);
        const selected = choice === n;
        const isExpected = n === expected;
        return `<article class="opening-card ${isExpected ? 'card-ok' : 'card-ko'}">
          <span class="tag">Ouverture ${n}</span>
          <blockquote>« ${esc(text)} »</blockquote>
          ${ex.verdictMark(isExpected, isExpected ? (selected ? 'Votre choix, celui attendu' : 'Choix attendu') : (selected ? 'Votre choix' : 'Moins efficace'))}
        </article>`;
      }).join('')}</div>
      ${kit.rows([
        kit.row({ n: 1, title: 'Vos arguments', bloc: argBloc, yours: `<ol class="compare-arguments">${args}</ol>`, model: [notes[0], notes[1]] }),
        kit.row({ n: 2, title: 'Ce que vous reprendriez à l’autre', bloc: borrowBloc, text: ex.value('borrow'), model: notes[2] })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    const review = ex.reviewing();
    const at = stage();
    const head = review
      ? { title: 'Comparer deux ouvertures', sub: 'Votre choix, puis vos réponses, chacune face à une réponse possible.' }
      : [
          { title: 'Comparer deux ouvertures', sub: '' },
          { title: 'Vos arguments', sub: 'Au moins trois arguments, un à la fois, chacun relié à un critère d’une bonne ouverture.' },
          { title: 'Ce que vous reprendriez à l’autre', sub: 'Une bonne idée peut compléter votre ouverture sans changer votre choix.' }
        ][at - 1];
    const body = review ? reviewScreen() : at === 1 ? chooseScreen() : at === 2 ? argueScreen() : borrowScreen();

    // Étape 2 : le titre, la consigne et le rappel à gauche, l'illustration
    // à droite, posée sur la carte de l'argument.
    // Étape 3 : même en-tête calé à gauche, l'illustration à côté de la carte.
    if (!review && at > 1) {
      return `<div class="compare-page">
        <header class="compare-head is-split">
          ${stepper(at)}
          <div class="compare-head-text">
            <h1>${esc(head.title)}</h1>
            <p class="compare-sub">${esc(head.sub)}</p>
            ${recall(at === 3)}
          </div>
          ${at === 2 ? art(ARGUE_ART) : ''}
        </header>
        <form novalidate>${body}</form>
      </div>`;
    }

    return `<div class="compare-page">
      <header class="compare-head">
        ${review ? '' : stepper(at)}
        <h1>${esc(head.title)}</h1>
        ${head.sub ? `<p class="compare-sub">${esc(head.sub)}</p>` : ''}
        ${at === 1 || review ? facts() : ''}
      </header>
      ${review ? body : `<form novalidate>${body}</form>`}
    </div>`;
  }

  /* Chaque étape ne valide que ce qu'elle demande ; la dernière reprend
   * l'ensemble, pour ne jamais clore un exercice incomplet. */
  function validate(values) {
    const choiceError = ['1', '2'].includes(values.choice) ? [] : [{ key: 'choice', message: 'Choisissez une ouverture.' }];
    if (stage() === 1) return choiceError;
    if (stage() === 2) return argumentErrors(values, argIndex());
    const errors = [...choiceError];
    for (let i = 1; i <= argumentCount(); i++) errors.push(...argumentErrors(values, i));
    const borrow = required(values, 'borrow', 'Ce que vous emprunteriez à l’autre', 500);
    if (borrow) errors.push(borrow);
    return errors;
  }

  /* Étapes 1 et 2 : on avance d'un cran sans rien conclure. */
  function intercept(values) {
    if (stage() === 1) {
      if (!['1', '2'].includes(values.choice)) return false;
      ex.setValue('stage', 2);
      ex.setValue('argIndex', 1);
      return true;
    }
    if (stage() === 2) {
      if (argumentErrors(values, argIndex()).length) return false;
      if (argIndex() < argumentCount()) ex.setValue('argIndex', argIndex() + 1);
      else ex.setValue('stage', 3);
      return true;
    }
    /* Étape 3 : un oubli d'une étape précédente ne se signale pas ici, où
     * il est invisible. On ramène l'apprenant à l'argument (ou au choix) en
     * cause, où le message s'affiche à côté du champ à compléter. */
    const missing = !['1', '2'].includes(values.choice) ? 0
      : Array.from({ length: argumentCount() }, (_, k) => k + 1).find(i => argumentErrors(values, i).length);
    if (missing === undefined) return false;
    ex.setValue('stage', missing ? 2 : 1);
    if (missing) ex.setValue('argIndex', missing);
    setTimeout(() => ex.submit());
    return true;
  }

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  /* Supprime l'argument affiché en décalant les suivants. */
  function removeArgument(index) {
    const total = argumentCount();
    for (let i = index; i < total; i++) {
      ex.setValue(`argument${i}`, ex.value(`argument${i + 1}`));
      ex.setValue(`criterion${i}`, ex.value(`criterion${i + 1}`));
    }
    ex.setValue(`argument${total}`, '');
    ex.setValue(`criterion${total}`, '');
    ex.setValue('argumentCount', total - 1);
    ex.setValue('argIndex', Math.min(index, total - 1));
    ex.changed();
    ex.rebuild();
  }

  /* Les deux ouvertures, relues sans quitter l'étape en cours. */
  function rereadOpenings() {
    const choice = ex.value('choice');
    core.openDialog('Les deux ouvertures', content.openings.map((text, index) => {
      const n = String(index + 1);
      return `<div class="compare-dialog-opening">
        <span class="tag">Ouverture ${n}${choice === n ? ' · votre choix' : ''}</span>
        <blockquote>« ${esc(text)} »</blockquote>
      </div>`;
    }).join(''));
  }

  const go = (key, n) => { ex.setValue(key, n); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  function onMount() {
    core.wireRubric(content.rubric);
    const on = (action, fn) => core.$$(`[data-action="${action}"]`).forEach(node => node.addEventListener('click', () => fn(node)));
    on('reread-openings', rereadOpenings);
    on('back-to-choice', () => go('stage', 1));
    on('back-to-arguments', () => { ex.setValue('argIndex', argumentCount()); go('stage', 2); });
    on('previous-argument', () => go('argIndex', argIndex() - 1));
    on('goto-argument', node => go('argIndex', Number(node.dataset.index)));
    on('add-argument', () => {
      ex.setValue('argumentCount', Math.min(5, argumentCount() + 1));
      ex.setValue('argIndex', argumentCount());
      ex.changed();
      ex.rebuild(`criterion${argumentCount()}`);
    });
    on('remove-argument', () => removeArgument(argIndex()));
    // La carte choisie s'éclaire dès le clic, sans attendre un nouveau rendu.
    core.$$('[data-choice-card] input').forEach(input => input.addEventListener('change', () =>
      core.$$('[data-choice-card]').forEach(card => card.classList.toggle('selected', card.dataset.choiceCard === input.value))));
    // Un clic n'importe où sur la carte la choisit, pas seulement sur le bouton du bas.
    core.$$('[data-choice-card]').forEach(card => card.addEventListener('click', event => {
      if (event.target.closest('label, input')) return;
      const input = card.querySelector('input[type="radio"]');
      if (input && !input.checked) input.click();
    }));
  }

  ex.mount('s1-C', { screen, validate, feedback, intercept, onMount, compactFeedback: true });
})();
