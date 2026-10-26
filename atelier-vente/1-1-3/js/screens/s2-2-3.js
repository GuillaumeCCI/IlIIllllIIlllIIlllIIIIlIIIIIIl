/* S2 2.3 · Franchir le standard en douceur.
 *
 * Une simulation d'appel en trois temps :
 *   1 · ÉCOUTER : la situation et l'objectif de l'appel ;
 *   2 · RÉPONDRE : deux tours de parole avec l'accueil téléphonique, une
 *       réponse courte à chaque fois, que l'on confronte aux trois clés
 *       du défi (courtois, bref, facilitant) ;
 *   3 · RETOUR : l'appel relu, avec une réponse proposée à chaque tour.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.3'];
  const turns = content.turns;
  const keys = content.keys;

  const stage = () => kit.stage(2);
  const turn = () => Math.min(Math.max(0, Number(ex.value('turn')) || 0), turns.length - 1);
  const reply = t => ex.value(`reply${t}`);

  function bubbleStd(text) {
    return `<li class="call-line is-std"><span class="call-avatar">${icon('headset', { size: 30 })}</span><p>« ${esc(text)} »</p></li>`;
  }
  const bubbleMe = text => `<li class="call-line is-me"><p>« ${esc(text)} »</p><span class="call-avatar is-me">${icon('users', { size: 26 })}</span></li>`;

  function phone(t, waiting = true) {
    const history = [];
    for (let k = 0; k <= t; k++) {
      history.push(bubbleStd(turns[k].line));
      if (k < t || !waiting) history.push(bubbleMe(reply(k)));
    }
    return `<section class="call-phone">
      <header class="call-bar">${icon('phone', { size: 22 })}<span class="call-live"></span><span>Appel en cours</span><strong>Tour ${t + 1}</strong></header>
      <ol class="call-lines">${history.join('')}</ol>
      ${waiting ? '<p class="call-wait">Le standard attend votre réponse…<span class="call-dots"><i></i><i></i><i></i></span></p>' : ''}
      <p class="call-who">${icon('headset', { size: 18 })}<span>Accueil téléphonique</span></p>
    </section>`;
  }

  function listenStep() {
    return `<div class="k-columns call-layout">
      <section class="call-phone is-intro">
        <header class="call-bar">${icon('phone', { size: 22 })}<span>Avant l’appel</span></header>
        <div class="call-intro">
          <p class="k-label">La situation</p><p>${esc(content.context)}</p>
          <p class="k-label">Votre objectif</p><p class="call-goal">${icon('target', { size: 22 })}<span>${esc(content.goal)}</span></p>
        </div>
      </section>
      <form class="k-panel" novalidate>
        <p class="k-label">Les 3 clés du défi</p>
        <ul class="call-keys-list">${keys.map(k => `<li><strong>${esc(k.label)}</strong><span>${esc(k.text)}</span></li>`).join('')}</ul>
        ${kit.tip('Deux tours de parole vous attendent : l’accueil vous répondra après votre première réplique.')}
        ${core.errorsBox()}
        <div class="call-actions is-end">${kit.submit('Décrocher et écouter')}</div>
      </form>
    </div>`;
  }

  function answerStep() {
    const t = turn();
    return `<div class="k-columns call-layout">
      ${phone(t)}
      <form class="k-panel call-answer" novalidate>
        <p class="k-label">À vous de jouer</p>
        <h2 class="call-title">Que répondez-vous ?</h2>
        <p class="k-muted call-sub">Restez courtois et facilitez la suite de l’échange.</p>
        ${ex.field(`reply${t}`, 'Votre réponse au téléphone', { placeholder: 'Écrivez exactement ce que vous diriez au téléphone…', max: content.max, rows: 4, hideLabel: true })}
        <p class="k-label call-keys-title">Les 3 clés du défi</p>
        <div class="call-keys">${keys.map((k, i) => `<label class="call-key"><input type="checkbox" data-field="key${t}${i}" ${ex.value(`key${t}${i}`) === true ? 'checked' : ''}><span class="call-key-box" aria-hidden="true">${icon('check', { size: 14 })}</span><span>${esc(k.label)}</span></label>`).join('')}</div>
        <p class="k-muted call-keys-help">Cochez les clés que votre réponse respecte. Elle sera relue sur ces trois points.</p>
        <p class="call-keys-lock">${icon('lock', { size: 18 })}<span>Écrivez d’abord votre réponse pour cocher les clés.</span></p>
        ${core.errorsBox()}
        <div class="call-actions">${kit.dialogButton('hint', 'Voir un indice', 'text-button', 'lightbulb')}${kit.submit(t < turns.length - 1 ? 'Tester ma réponse' : 'Tester et voir le retour')}</div>
      </form>
    </div>`;
  }

  /* Le retour, un tour à la fois (onglets) : à gauche l'échange de ce tour,
   * à droite votre réponse, une réponse possible et les trois clés. */
  let shown = turns.length - 1;
  const keyIcon = { courtois: 'handshake', bref: 'document', facilitant: 'users' };
  const ticked = (t, i) => ex.value(`key${t}${i}`) === true;

  function reviewScreen() {
    const t = Math.min(shown, turns.length - 1);
    const tr = turns[t];
    const count = keys.filter((_, i) => ticked(t, i)).length;
    return `<div class="k-columns call-layout">
      <section class="call-phone">
        <header class="call-bar">${icon('phone', { size: 22 })}<span class="call-live"></span><span>Appel en cours</span><strong>Tour ${t + 1} sur ${turns.length}</strong></header>
        <ol class="call-lines">${bubbleStd(tr.line)}${bubbleMe(reply(t))}</ol>
        <p class="call-who">${icon('headset', { size: 18 })}<span>Accueil téléphonique</span></p>
      </section>
      <section class="k-panel call-feedback">
        <header class="call-fb-head"><h2>Le retour</h2><p class="call-fb-count">${icon('chart', { size: 20 })}<span>${count} critère${count > 1 ? 's' : ''} validé${count > 1 ? 's' : ''}</span></p></header>
        <div class="call-tabs" role="tablist">${turns.map((_, k) => `<button type="button" role="tab" class="call-tab ${k === t ? 'is-current' : ''}" aria-selected="${k === t}" data-act="review-turn" data-index="${k}">Tour ${k + 1}</button>`).join('')}</div>
        <div class="call-fb-card"><span class="call-fb-icon">${icon('user', { size: 24 })}</span><div><p class="call-fb-label">Votre réponse</p><p>« ${esc(reply(t))} »</p></div></div>
        <div class="call-fb-card is-model"><span class="call-fb-icon">${icon('sparkle', { size: 24 })}</span><div><p class="call-fb-label">Une réponse possible</p><p>${esc(tr.model)}</p></div></div>
        ${tr.why ? ex.inlineNote(tr.why, 'neutral') : ''}
        <ul class="call-fb-keys">${keys.map((k, i) => `<li class="is-${esc(k.id)} ${ticked(t, i) ? 'is-on' : ''}">
          <span class="call-fb-key-icon">${icon(keyIcon[k.id] || 'check', { size: 22 })}</span><strong>${esc(k.label)}</strong>
          <span class="call-fb-tick" aria-label="${ticked(t, i) ? 'Cochée' : 'Non cochée'}">${icon(ticked(t, i) ? 'check' : 'close', { size: 14 })}</span>
          <p>${esc(k.text)}</p></li>`).join('')}</ul>
      </section>
    </div>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  kit.on({ 'review-turn': el => { shown = Number(el.dataset.index); ex.rebuild(); } });

  function screen() {
    const reviewing = ex.reviewing();
    const at = reviewing ? 3 : stage();
    return `<div class="k-page call-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: kit.steps(['Écouter', 'Répondre', 'Retour'], at, { compact: true }) + (reviewing ? '' : kit.tourButton()) })}
      ${reviewing ? reviewScreen() : stage() === 1 ? listenStep() : answerStep()}
      ${reviewing ? '' : kit.utility('Corrigé disponible au retour')}
    </div>`;
  }

  function validate(values) {
    if (stage() === 1) return [];
    const t = turn();
    if (!kit.filled(values[`reply${t}`])) return [{ key: `reply${t}`, message: 'Écrivez ce que vous répondez à l’accueil.' }];
    const missing = turns.findIndex((_, k) => !kit.filled(values[`reply${k}`]));
    return missing === -1 ? [] : [{ key: `reply${missing}`, message: `Répondez aussi au tour ${missing + 1}.` }];
  }

  function intercept(values) {
    if (stage() === 1) { kit.setStage(2); return true; }
    const t = turn();
    if (!kit.filled(values[`reply${t}`]) || t >= turns.length - 1) return false;
    ex.setValue('turn', t + 1);
    return true;
  }

  /* Les clés ne se cochent qu'une réponse écrite : on juge ce qu'on a dit. */
  function lockKeys() {
    const form = document.querySelector('.call-answer');
    const field = form && form.querySelector('textarea');
    if (!field) return;
    const empty = !field.value.trim();
    form.classList.toggle('is-locked', empty);
    form.querySelectorAll('.call-key input').forEach(box => { box.disabled = empty; });
  }
  document.addEventListener('input', event => { if (event.target.closest && event.target.closest('.call-answer')) lockKeys(); });

  const feedback = () => ['Relisez vos deux réponses avec les trois clés : courtoise, brève, et qui donne une issue simple à votre interlocutrice.'];

  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  // Visite guidée en deux temps : avant l'appel, puis à la première réplique.
  kit.tour('s2-2.3', [
    { target: '.call-phone.is-intro', title: 'Avant l’appel', text: 'Lisez la situation et votre objectif.' },
    { target: '.call-keys-list', title: 'Les 3 clés du défi', text: 'Votre réponse devra être courtoise, brève et facilitante.' },
    { target: '.call-actions.is-end .k-submit', title: 'Décrocher', text: 'Ce bouton lance l’appel.',
      after: 'L’accueil vous parle, vous lui répondez : deux fois.' },
    { later: true, target: '.call-lines', title: 'L’accueil', text: 'Lisez ce que vous dit l’accueil.' },
    { later: true, target: '.call-answer textarea', title: 'Votre réponse', text: 'Écrivez exactement ce que vous diriez au téléphone.' },
    { later: true, target: '.call-keys', title: 'Les 3 clés', text: 'Cochez les clés que votre réponse respecte.',
      after: 'Elles s’ouvrent une fois votre réponse écrite.' },
    { later: true, target: '.call-answer [data-dialog="hint"]', title: 'Un indice', text: 'Un doute ? L’indice vous met sur la piste.' },
    { later: true, target: '.call-answer .k-submit', title: 'Tester ma réponse', text: 'L’accueil vous répond. Après le 2e tour, vous voyez le retour.' }
  ]);

  ex.mount('s2-2.3', { screen, validate, intercept, feedback, onMount: lockKeys, compactFeedback: true });
})();
