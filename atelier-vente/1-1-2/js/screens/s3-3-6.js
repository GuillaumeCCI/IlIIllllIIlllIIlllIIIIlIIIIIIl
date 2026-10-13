/* S3 3.6 · L'arbre des réactions.
 *
 * Cinq étapes : la caractéristique, l'avantage et la preuve (le tronc
 * CAP), puis deux branches selon la réaction du client, convaincu ou
 * sceptique. L'arbre, en haut, se construit à chaque réponse.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.6'];
  const steps = content.steps;

  const stage = () => kit.stage(steps.length);
  const text = i => ex.value(`t${i}`);

  /* L'arbre : racine, tronc C · A · P, puis la fourche. */
  function tree(at, reviewing) {
    const node = (i, label) => {
      const state = reviewing || kit.filled(text(i)) && i !== at - 1 ? 'is-done' : i === at - 1 ? 'is-active' : '';
      return `<button type="button" class="tree-node ${state}" data-act="goto" data-index="${i + 1}" ${reviewing ? 'disabled' : ''} aria-label="Étape ${i + 1} : ${esc(steps[i].label)}">${label}</button>`;
    };
    const branch = (i, label) => {
      const state = reviewing || kit.filled(text(i)) && i !== at - 1 ? 'is-done' : i === at - 1 ? 'is-active' : '';
      return `<button type="button" class="tree-branch ${state}" data-act="goto" data-index="${i + 1}" ${reviewing ? 'disabled' : ''}><span class="tree-led"></span><span>${label}</span></button>`;
    };
    return `<div class="tree">
      <div class="tree-root"><span class="tree-root-node">${icon('sprout', { size: 34 })}</span><strong>Besoin</strong></div>
      <span class="tree-line ${kit.filled(text(0)) || reviewing ? 'is-on' : ''}"></span>
      ${node(0, 'C')}
      <span class="tree-line ${kit.filled(text(1)) || reviewing ? 'is-on' : ''}"></span>
      ${node(1, 'A')}
      <span class="tree-line ${kit.filled(text(2)) || reviewing ? 'is-on' : ''}"></span>
      ${node(2, 'P')}
      <svg class="tree-fork" viewBox="0 0 90 90" aria-hidden="true"><path d="M0 45 L90 12 M0 45 L90 78" /></svg>
      <div class="tree-branches">${branch(3, 'Convaincu')}${branch(4, 'Sceptique')}</div>
    </div>
    <p class="k-center k-muted">L’arbre se construit à chaque réponse.</p>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = stage();
    const step = steps[at - 1];
    /* Maquette : l'arbre sous l'en-tête, puis deux cartes (la branche à
     * gauche, l'étape à droite) et les actions sous les cartes. */
    const where = at <= 3
      ? `Cette réponse concerne l’étape ${step.key} de votre argument CAP.`
      : `Cette réponse prolonge votre argument face à un client ${esc(step.label.toLowerCase())}.`;
    return `<div class="k-page tree-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? `<p class="k-count">Arbre terminé</p>` : '' })}
      ${tree(at, reviewing)}
      ${reviewing ? reviewBody() : `<form class="tree-panel" novalidate>
        <div class="tree-columns">
          <aside class="k-panel tree-rootcard">
            <p class="tree-card-label">La branche</p>
            ${kit.clientCard(content.need, null, 'Besoin du client')}
            <p class="tree-info">${icon('info', { size: 20 })}<span>Gardez ce besoin comme fil conducteur. ${where}</span></p>
          </aside>
          <div class="k-panel tree-stepcard">
            <p class="tree-step-pill">Étape ${at} · ${esc(step.label)}</p>
            <h2 class="tree-question">${esc(step.question)}</h2>
            ${step.client ? `<p class="tree-client">${icon('chat', { size: 20 })}<span>Le client : « ${esc(step.client)} »</span></p>` : ''}
            ${ex.field(`t${at - 1}`, step.label, { placeholder: step.placeholder, max: 300, rows: 4, hideLabel: true })}
            ${kit.help(step.help)}
          </div>
        </div>
        ${core.errorsBox()}
        ${kit.bar({ left: at > 1 ? kit.back('back', 'Étape précédente') : kit.reset(), right: `${kit.dialogButton('hint', 'Voir un indice', 'secondary', '')}${kit.submit(step.button)}` })}
      </form>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible à la fin de l’arbre')}
    </div>`;
  }

  function reviewBody() {
    return `<div class="tree-review">${steps.map((step, i) => `<section class="k-panel">
      <p class="k-label">${i < 3 ? `${step.key} · ${esc(step.label)}` : `Branche · client ${esc(step.label.toLowerCase())}`}</p>
      ${step.client ? `<p class="tree-client">${icon('chat', { size: 18 })}<span>« ${esc(step.client)} »</span></p>` : ''}
      ${kit.yours('Votre réponse', text(i))}
      ${kit.model('Corrigé modèle', step.model)}
    </section>`).join('')}</div>
    ${content.takeaway ? ex.inlineNote(content.takeaway, 'neutral') : ''}
    ${core.feedbackBox()}
    <div class="k-utility">${kit.reset()}</div>`;
  }

  function validate() {
    const at = stage();
    if (!kit.filled(text(at - 1))) return [{ key: `t${at - 1}`, message: `Complétez l’étape « ${steps[at - 1].label} ».` }];
    const missing = steps.findIndex((_, i) => !kit.filled(text(i)));
    return missing === -1 ? [] : [{ key: `t${missing}`, message: `Complétez aussi l’étape « ${steps[missing].label} ».` }];
  }

  function intercept() {
    const at = stage();
    if (!kit.filled(text(at - 1))) return false;
    const next = steps.findIndex((_, i) => !kit.filled(text(i)));
    if (next === -1) return false;
    kit.setStage(next + 1);
    return true;
  }

  const feedback = () => ['Votre arbre est complet. Comparez chaque branche au corrigé modèle : le tronc CAP doit rester fidèle au besoin, et chaque branche doit répondre à la réaction du client.'];

  kit.on({
    goto: el => { kit.setStage(Number(el.dataset.index)); kit.commit(); },
    back: () => { kit.setStage(Math.max(1, stage() - 1)); kit.commit(); }
  });
  kit.dialogs({ hint: () => ({ title: 'Un indice', html: `<p>${esc(steps[stage() - 1].hint)}</p>` }) });

  ex.mount('s3-3.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
