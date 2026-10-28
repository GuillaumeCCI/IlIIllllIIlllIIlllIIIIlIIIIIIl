/* S1 1.6 · Répondre en 6 étapes.
 *
 * Une objection choisie, puis une phrase adressée au client pour chacune
 * des six étapes de la méthode, une étape à la fois. Le menu de gauche
 * suit la progression ; l'auto-évaluation s'ouvre après la sixième phrase.
 * « Changer » permet de prendre une autre objection, les phrases restent.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.6'];
  const method = window.ATELIER_METHOD;
  const SELF = 7;
  const scale = [{ id: '2', label: 'Oui' }, { id: '1', label: 'En partie' }, { id: '0', label: 'Pas encore' }];

  const at = () => kit.stage(SELF, 'step');
  const phrase = i => ex.value(`phrase${i}`);
  const written = () => method.filter((_, i) => kit.filled(phrase(i))).length;
  const objection = () => content.objections[Math.min(Math.max(0, Number(ex.value('objection')) || 0), content.objections.length - 1)];
  const reachable = n => n === 1 || (n <= 6 ? kit.filled(phrase(n - 2)) || kit.filled(phrase(n - 1)) : written() === 6);

  function menu(step) {
    return `<nav class="six-menu k-panel" aria-label="Les 6 étapes">
      <h2>Les 6 étapes</h2>
      <ol>${method.map((s, i) => {
        const n = i + 1;
        const state = n === step ? 'is-current' : kit.filled(phrase(i)) ? 'is-done' : '';
        return `<li><button type="button" class="six-item ${state}" data-act="go" data-step="${n}" ${reachable(n) ? '' : 'disabled'}>
          <span class="six-n">${kit.filled(phrase(i)) && n !== step ? icon('check', { size: 16 }) : n}</span><span>${esc(s.name)}</span></button></li>`;
      }).join('')}</ol>
      <button type="button" class="six-item six-self ${step === SELF ? 'is-current' : ''}" data-act="go" data-step="${SELF}" ${written() === 6 ? '' : 'disabled'}>
        <span class="six-n">${icon(written() === 6 ? 'check' : 'lock', { size: 16 })}</span><span><strong>Auto-évaluation</strong><small>Après les 6 étapes</small></span></button>
      <p class="six-count" data-live="count">${written()} / 6 phrases</p>
    </nav>`;
  }

  function objectionCard() {
    if (ex.value('choosing') === true) {
      return `<section class="six-objection is-choosing">
        <p class="k-label">Choisissez une objection</p>
        <div class="six-choices">${content.objections.map((o, i) => `<button type="button" class="six-choice ${o === objection() ? 'is-chosen' : ''}" data-act="pick" data-index="${i}">« ${esc(o.text)} »</button>`).join('')}</div>
      </section>`;
    }
    return `<section class="six-objection">
      <img class="six-portrait" src="${esc(core.webAsset(content.portrait))}" alt="${esc(content.portraitAlt)}" decoding="async">
      <div><p class="k-label">Objection choisie</p><p class="six-bubble">« ${esc(objection().text)} »</p></div>
      <button type="button" class="text-button with-icon six-change" data-act="choose">${icon('pencil', { size: 18 })}<span>Changer</span></button>
    </section>`;
  }

  function stepBody(step) {
    if (step === SELF) {
      return `<p class="k-label">Auto-évaluation</p>
        <h2 class="six-title">Relisez vos 6 phrases</h2>
        <p class="six-question">Pour chaque étape, votre phrase remplit-elle son rôle ?</p>
        ${kit.matrix({ key: 'self', rows: content.checks.map((text, i) => ({ title: method[i].name, quote: phrase(i), text })), columns: scale, head: 'Votre phrase et son critère', round: true })}`;
    }
    const i = step - 1;
    return `<p class="k-label">Étape ${step} / 6</p>
      <h2 class="six-title">${esc(method[i].name)}</h2>
      <p class="six-question">${esc(content.prompts[i].question)}</p>
      ${ex.field(`phrase${i}`, `${method[i].name} : votre phrase au client`, { placeholder: 'Votre phrase au client…', max: 400, rows: 4, hideLabel: true })}
      <p class="k-muted">Une phrase précise, comme si vous lui parliez.</p>`;
  }

  function reviewScreen() {
    const model = objection().model;
    const self = content.checks.map((_, i) => Number(ex.value(`self${i}`)) || 0).reduce((a, b) => a + b, 0);
    return `<section class="k-panel">
      <p class="k-label">Objection travaillée</p>
      <p class="six-bubble is-review">« ${esc(objection().text)} »</p>
      ${kit.result(self, content.checks.length * 2, 'votre auto-évaluation')}
      <ol class="six-review">${method.map((s, i) => `<li>
        <p class="six-review-step"><span class="six-n">${i + 1}</span><strong>${esc(s.name)}</strong><small>${esc(s.role)}</small></p>
        <div class="six-review-pair">${kit.yours('Votre phrase', phrase(i))}${kit.model('Une phrase possible', model[i])}</div>
      </li>`).join('')}</ol>
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  // L'étape qui vient d'arriver glisse en place (pas à chaque redessin).
  let shownStep = null;

  function screen() {
    const reviewing = ex.reviewing();
    const step = at();
    const entering = shownStep !== null && shownStep !== step ? (step > shownStep ? 'is-next' : 'is-prev') : '';
    shownStep = step;
    return `<div class="k-page six-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : kit.contextButton() + kit.tourButton() })}
      ${reviewing ? reviewScreen() : `<div class="six-layout">
        ${menu(step)}
        <form class="k-panel six-main" novalidate>
          ${objectionCard()}
          <div class="six-step ${entering}">${stepBody(step)}</div>
          ${core.errorsBox()}
          <div class="six-actions">${step === SELF ? kit.back('go-back', 'Revenir à l’étape 6') : kit.dialogButton(`tip${step - 1}`, 'Voir un repère', 'secondary', 'lightbulb')}
            ${kit.submit(step === SELF ? 'Valider mon auto-évaluation' : step === 6 && written() >= 5 ? 'Enregistrer et s’auto-évaluer' : 'Enregistrer et continuer')}</div>
        </form>
      </div>`}
      ${reviewing ? '' : kit.utility('Phrases modèles après l’auto-évaluation')}
    </div>`;
  }

  function validate(values) {
    const step = at();
    if (step <= 6 && !kit.filled(values[`phrase${step - 1}`])) return [{ key: `phrase${step - 1}`, message: `Rédigez votre phrase pour l’étape « ${method[step - 1].name} ».` }];
    const missing = method.findIndex((_, i) => !kit.filled(values[`phrase${i}`]));
    if (missing !== -1) return step === SELF ? [{ key: `phrase${missing}`, message: `Il manque la phrase de l’étape « ${method[missing].name} ».` }] : [];
    if (step < SELF) return [];
    const unrated = content.checks.findIndex((_, i) => !values[`self${i}`]);
    return unrated === -1 ? [] : [{ key: `self${unrated}`, message: 'Évaluez chacune des 6 lignes.' }];
  }

  function intercept(values) {
    const step = at();
    if (step === SELF || validate(values).length) return false;
    const next = method.findIndex((_, i) => i >= step && !kit.filled(values[`phrase${i}`]));
    const first = method.findIndex((_, i) => !kit.filled(values[`phrase${i}`]));
    kit.setStage(next !== -1 ? next + 1 : first !== -1 ? first + 1 : SELF, 'step');
    return true;
  }

  const feedback = () => ['Comparez chacune de vos phrases au corrigé modèle : remplit-elle le rôle de son étape ?'];

  kit.on({
    go: el => { kit.setStage(Number(el.dataset.step), 'step'); kit.commit(); },
    'go-back': () => { kit.setStage(6, 'step'); kit.commit(); },
    choose: () => { ex.setValue('choosing', true); kit.commit(); },
    pick: el => { ex.setValue('objection', Number(el.dataset.index)); ex.setValue('choosing', false); kit.commit(); }
  });
  kit.live(() => ({ count: `${written()} / 6 phrases` }));
  kit.dialogs(Object.fromEntries(content.prompts.map((p, i) => [`tip${i}`, { title: `Repère · ${method[i].name}`, html: `<p>${esc(p.tip)}</p>` }])));

  // À l'arrivée, avant la visite guidée : ce qu'est la méthode et ce qui est demandé.
  kit.context([
    ['target', 'La méthode', 'Pour traiter une objection, un commercial suit six étapes, toujours dans le même ordre.'],
    ['list', 'Les six étapes', 'Accueillir, questionner, reformuler, traiter, contrôler, enchaîner.'],
    ['pencil', 'Ce qui vous est demandé', 'Écrire, pour chaque étape, la phrase que vous diriez au client.']
  ], 'La méthode en 6 étapes');

  // À l'arrivée sur l'auto-évaluation : ce qu'on a sous les yeux.
  kit.selfContext('.six-self.is-current', [
    ['eye', 'Ce que vous voyez', 'Vos 6 phrases, une par étape, chacune avec ce qu’elle doit faire.'],
    ['list', 'Ce qui vous est demandé', 'Relisez chaque phrase. Dites si elle remplit son rôle : « Oui », « En partie » ou « Pas encore ».'],
    ['checkCircle', 'Ensuite', 'Des phrases modèles s’affichent à côté des vôtres, avec votre score.']
  ]);

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s1-1.6', [
    { target: '.six-menu', title: 'Les 6 étapes', text: 'Voici les six étapes de la méthode, à traiter une par une.',
      items: [
        { symbol: 'target', tone: 'blue', text: 'L’étape en cours est surlignée.' },
        { symbol: 'check', tone: 'green', text: 'Une étape terminée est cochée.' }
      ] },
    { target: '.six-objection', title: 'L’objection du client', text: 'C’est l’objection à laquelle vous répondez.',
      items: [
        { symbol: 'pencil', tone: 'blue', text: 'Pour en choisir une autre, cliquez sur « Changer ».' },
        { symbol: 'check', tone: 'green', text: 'Vos phrases déjà écrites sont conservées.' }
      ] },
    { target: '.six-main .field', title: 'Votre phrase', text: 'Écrivez ici ce que vous diriez au client pour cette étape, en une phrase précise, comme si vous lui parliez.' },
    { target: '.six-main .k-dialog-button', title: 'Un repère', text: 'Un doute ? Ce bouton ouvre un conseil pour l’étape en cours.' },
    { target: '.six-actions .k-submit', title: 'Enregistrer et continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: 'Votre phrase est enregistrée et vous passez à l’étape suivante.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Après la sixième étape, vous relisez vos phrases pour vous auto-évaluer.' }
      ] }
  ]);

  ex.mount('s1-1.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
