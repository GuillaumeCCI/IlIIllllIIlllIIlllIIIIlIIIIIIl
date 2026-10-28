/* S3 1.5 · La réponse la plus juste.
 *
 * Deux temps, pour ne poser qu'une question à la fois :
 *   1. CHOISIR  : la scène du client et les deux réponses, rien d'autre.
 *   2. EXPLIQUER: le choix est rappelé, on écrit son raisonnement.
 *
 * Séparer les deux évite de demander une justification avant même que le
 * choix soit arrêté, et laisse aux deux réponses la place de se lire.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.5'];

  const options = content.options.map(option => ({
    id: option.id,
    label: option.text,
    badge: option.id
  }));

  /* L'étape en cours. On ne passe à la seconde qu'une fois le choix fait. */
  const stage = () => Number(ex.value('stage')) === 2 ? 2 : 1;

  const current = () => core.findExercise('s3-1.5');

  /* Le fil des deux étapes, repris en haut de l'écran. */
  function stepper(at) {
    const steps = [
      { n: 1, label: 'Choisir' },
      { n: 2, label: 'Expliquer' }
    ];
    return `<ol class="duo-steps">${steps.map(step => {
      const done = step.n < at;
      const active = step.n === at;
      return `<li class="duo-step ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}">
        <span class="duo-step-dot">${done ? icon('check', { size: 14 }) : step.n}</span>
        <span class="duo-step-label">${esc(step.label)}</span>
      </li>`;
    }).join('')}</ol>`;
  }

  /* La scène, montrée entière : c'est elle qui porte l'objection. */
  function scene() {
    const exercise = current();
    if (!exercise.image || exercise.pending) {
      return `<section class="objection-card">
        <span class="mission-symbol">${icon('chat', { size: 26 })}</span>
        <p class="eyebrow">Objection client</p>
        ${core.quote(content.objection, '')}
        <span class="tag">${esc(content.objectionTag)}</span>
      </section>`;
    }
    return `<figure class="objection-scene">
      <img src="${esc(core.webAsset(exercise.image))}" alt="${esc(exercise.alt)}" decoding="async">
      <figcaption class="image-error" hidden>Illustration indisponible.</figcaption>
    </figure>`;
  }

  /* ── Étape 1 : choisir ─────────────────────────────────────────────── */
  function chooseScreen() {
    return `<div class="duo-layout">
      ${scene()}
      <div class="duo-answers">
        ${ex.radioCards('choice', options, 'answers')}
        ${core.errorsBox()}
        <div class="form-actions">
          <div class="form-meta">
            <span id="completion-status" class="completion-status"></span>
            ${core.button('Enregistrer le brouillon', 'save', 'text-button')}
          </div>
          <button type="submit" class="button primary">
            <span>Continuer vers mon explication</span>${icon('arrowRight', { size: 18 })}
          </button>
        </div>
      </div>
    </div>`;
  }

  /* ── Étape 2 : expliquer ───────────────────────────────────────────── */
  function explainScreen() {
    const exercise = current();
    const chosen = ex.value('choice');
    const vignette = exercise.image && !exercise.pending
      ? `<img class="recall-thumb" src="${esc(core.webAsset(exercise.image))}" alt="">`
      : '';

    return `<div class="duo-explain">
      <aside class="choice-recall">
        ${vignette}
        <div class="choice-recall-body">
          <p class="choice-recall-line">Votre choix : <strong>Réponse ${esc(chosen)}</strong></p>
          ${core.button(`<span>Relire les deux réponses</span>${icon('arrowRight', { size: 15 })}`, 'back-to-choice', 'text-button with-icon')}
        </div>
      </aside>

      <section class="panel explain-pair">
        <div class="explain-chosen">
          <p class="explain-chosen-label"><span class="explain-chosen-letter">${esc(chosen)}</span>La réponse que vous avez retenue</p>
          <p class="explain-chosen-text">« ${esc((content.options.find(o => o.id === chosen) || {}).text || '')} »</p>
        </div>
        <div class="explain-write">
          <h2 class="explain-question">Qu’est-ce qui rend cette réponse plus adaptée à l’objection du client ?</h2>
          ${ex.field('why', 'Votre raisonnement', {
            placeholder: 'Expliquez votre raisonnement…', max: 400, rows: 7, hideLabel: true
          })}
        </div>
      </section>

      ${core.errorsBox()}
      <div class="form-actions">
        ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Retour aux réponses</span>`, 'back-to-choice', 'text-button with-icon')}
        <div class="explain-submit">
          <button type="submit" class="button primary">
            <span>Valider mon analyse</span>${icon('arrowRight', { size: 18 })}
          </button>
          <p class="muted">Le retour s’affichera après validation.</p>
        </div>
      </div>
    </div>`;
  }

  /* ── Relecture, une fois validé ────────────────────────────────────── */
  /* Le corrigé au modèle de S1 A (js/corrige.js) : l'objection rappelée,
   * votre choix, le score estimatif, puis votre raisonnement face à une
   * réponse possible. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s3-1.5', ex.values());
    const [bloc] = result ? result.blocs : [];
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', content.title, `Le client vous dit : « ${content.objection} » ${content.objectionContext}`)}
      <section class="panel">${core.panelTitle('Votre choix')}${ex.reviewOptions(options, ex.value('choice'), content.answer)}</section>
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre raisonnement', bloc, text: ex.value('why'), model: content.feedback })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const at = stage();
    const title = at === 1 ? 'Quelle réponse traite le mieux l’objection ?' : 'Expliquez votre choix';

    return `<div class="duo-page">
      <header class="duo-head">
        <div>
          <p class="eyebrow">${esc(content.eyebrow)}</p>
          <h1>${esc(title)}</h1>
        </div>
        ${stepper(at)}
      </header>
      <form novalidate>${at === 1 ? chooseScreen() : explainScreen()}</form>
    </div>`;
  }

  /* Chaque étape ne valide que ce qu'elle demande. */
  function validate(values) {
    if (stage() === 1) {
      return ['A', 'B'].includes(values.choice)
        ? [] : [{ key: 'choice', message: 'Choisissez une réponse.' }];
    }
    return String(values.why ?? '').trim()
      ? [] : [{ key: 'why', message: 'Expliquez votre raisonnement.' }];
  }

  /* Étape 1 : on avance sans rien conclure. */
  function intercept() {
    if (stage() === 2) return false;
    if (!['A', 'B'].includes(ex.value('choice'))) return false;
    ex.setValue('stage', 2);
    return true;
  }

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  /* Le retour à l'étape 1 conserve le choix : on vient le relire. */
  function onMount() {
    core.$$('[data-action="back-to-choice"]').forEach(button =>
      button.addEventListener('click', () => { ex.setValue('stage', 1); ex.render(); }));
  }

  ex.mount('s3-1.5', { screen, validate, feedback, intercept, onMount, compactFeedback: true });
})();
