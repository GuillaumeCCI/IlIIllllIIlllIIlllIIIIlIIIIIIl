/* S2 2.7 · Construisez vos cartes réflexes.
 *
 * Une carte par esquive, trois gestes pour la préparer : la posture, la
 * réponse, le rebond. Chaque geste s'écrit à son tour ; la carte terminée,
 * on passe à la suivante. Une fois les trois cartes prêtes, la fiche
 * s'ouvre « en mode appel » : gros caractères, à garder sous les yeux.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.7'];
  const cards = content.cards;
  const gestures = content.gestures;

  const val = (g, c) => ex.value(`${gestures[g].id}${c}`);
  const cardDone = c => gestures.every((_, g) => kit.filled(val(g, c)));
  const ready = () => cards.filter((_, c) => cardDone(c)).length;
  const card = () => Math.min(Math.max(0, Number(ex.value('card')) || 0), cards.length - 1);
  const gesture = c => {
    const asked = Number(ex.value(`g${c}`));
    if (Number.isInteger(asked) && asked >= 0 && asked < gestures.length) return asked;
    const free = gestures.findIndex((_, g) => !kit.filled(val(g, c)));
    return free === -1 ? gestures.length - 1 : free;
  };

  /* Le numéro de la carte et, à côté, un point par carte pour passer de
   * l'une à l'autre (la phrase du client n'est montrée qu'une fois, en dessous). */
  function position(current) {
    return `<div class="reflex-position"><span>Carte ${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}</span>
      <span class="k-dots">${cards.map((c, i) => `<button type="button" class="k-dot ${i === current ? 'is-current' : cardDone(i) ? 'is-done' : ''}" data-act="card" data-index="${i}" aria-label="Carte ${i + 1} : « ${esc(c.quote)} »"></button>`).join('')}</span></div>`;
  }

  function editor(c) {
    const g = gesture(c);
    const step = gestures[g];
    return `<section class="reflex-card">
      ${position(c)}
      ${kit.clientCard(cards[c].quote, null, 'Le client vous dit', c)}
      <ol class="k-steps is-compact reflex-steps">${gestures.map((s, k) => `<li class="k-step ${k === g ? 'is-active' : kit.filled(val(k, c)) ? 'is-done' : 'is-next'}">
        <button type="button" class="k-step-dot" data-act="gesture" data-index="${k}" aria-label="${esc(s.label)}">${kit.filled(val(k, c)) && k !== g ? icon('check', { size: 16 }) : k + 1}</button><span class="k-step-label">${esc(s.label)}</span></li>`).join('')}</ol>
      <h3 class="reflex-question">${esc(step.question)}</h3>
      <p class="k-muted">${esc(step.sub)}</p>
      ${ex.field(`${step.id}${c}`, step.question, { placeholder: step.placeholder, max: 300, rows: 3, hideLabel: true })}
      <p class="k-muted">Restez concret et utilisable pendant un appel.</p>
      ${core.errorsBox()}
      <div class="reflex-actions">${kit.dialogButton(`tip${g}`, 'Voir un repère', 'secondary', 'book')}${kit.submit(g < gestures.length - 1 ? step.next : ready() === cards.length || (ready() === cards.length - 1 && !cardDone(c)) ? 'Ouvrir ma fiche en mode appel' : step.next)}</div>
    </section>`;
  }

  function reviewScreen() {
    return `<section class="reflex-sheet" aria-label="Ma fiche en mode appel">
      <header><span>${icon('phone', { size: 26 })}</span><div><p class="k-label">Mode appel</p><h2>Mes cartes réflexes</h2></div></header>
      <div class="reflex-sheet-grid">${cards.map((c, i) => `<article class="reflex-final">
        <p class="reflex-final-quote">« ${esc(c.quote)} »</p>
        <dl>${gestures.map((g, k) => `<dt>${esc(g.label)}</dt><dd>${esc(val(k, i))}</dd>`).join('')}</dl>
      </article>`).join('')}</div>
    </section>
    <section class="k-panel">
      <h2>Les cartes du corrigé</h2>
      <div class="reflex-sheet-grid">${cards.map(c => `<article class="reflex-model">
        <p class="reflex-final-quote">« ${esc(c.quote)} »</p>
        <dl>${gestures.map(g => `<dt>${esc(g.label)}</dt><dd>${esc(c.model[g.id])}</dd>`).join('')}</dl>
      </article>`).join('')}</div>
    </section>
    ${core.feedbackBox()}<div class="k-utility"><button type="button" class="text-button with-icon" data-act="print">${icon('document', { size: 17 })}<span>Imprimer ma fiche</span></button>${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const c = card();
    return `<div class="k-page reflex-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count reflex-count"><strong>${ready()} / ${cards.length}</strong> cartes prêtes</p>${reviewing ? '' : kit.contextButton() + kit.tourButton()}` })}
      ${reviewing ? reviewScreen() : `<form novalidate class="reflex-form">${editor(c)}</form>
        <p class="k-muted reflex-foot">Une fois les 3 cartes terminées, ouvrez votre fiche en mode appel.</p>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible avec votre fiche')}
    </div>`;
  }

  function validate(values) {
    const c = card();
    const g = gesture(c);
    const field = `${gestures[g].id}${c}`;
    if (!kit.filled(values[field])) return [{ key: field, message: `Carte ${c + 1} : complétez « ${gestures[g].label} ».` }];
    for (let i = 0; i < cards.length; i++) {
      const missing = gestures.findIndex((s, k) => !kit.filled(values[`${s.id}${i}`]));
      if (missing !== -1) return [{ key: 'card', message: `Carte ${i + 1} : il manque « ${gestures[missing].label} ».` }];
    }
    return [];
  }

  function intercept(values) {
    const c = card();
    const g = gesture(c);
    if (!kit.filled(values[`${gestures[g].id}${c}`])) return false;
    // Geste suivant de la même carte, sinon carte suivante incomplète.
    const nextGesture = gestures.findIndex((s, k) => k > g && !kit.filled(values[`${s.id}${c}`]));
    const anyGesture = gestures.findIndex(s => !kit.filled(values[`${s.id}${c}`]));
    if (nextGesture !== -1 || anyGesture !== -1) { ex.setValue(`g${c}`, nextGesture !== -1 ? nextGesture : anyGesture); return true; }
    for (let step = 1; step < cards.length; step++) {
      const next = (c + step) % cards.length;
      const free = gestures.findIndex(s => !kit.filled(values[`${s.id}${next}`]));
      if (free !== -1) { ex.setValue('card', next); ex.setValue(`g${next}`, free); core.toast(`Carte ${c + 1} prête.`); return true; }
    }
    return false;
  }

  const feedback = () => ['Vos trois cartes sont prêtes : relisez-les à voix haute avant votre prochaine session d’appels.'];

  kit.on({
    card: el => { ex.setValue('card', Number(el.dataset.index)); kit.commit(); },
    gesture: el => { ex.setValue(`g${card()}`, Number(el.dataset.index)); kit.commit(); },
    print: () => window.print()
  });
  kit.dialogs(Object.fromEntries(gestures.map((g, i) => [`tip${i}`, { title: `Repère · ${g.label}`, html: `<p>${esc(g.tip)}</p>` }])));

  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  kit.context([
    ['target', 'Une carte réflexe', 'Une fiche courte, à garder sous les yeux pendant vos appels de prospection.'],
    ['chat', 'Une esquive', 'Une phrase toute faite du prospect pour écourter l’appel, comme « Je n’ai pas le temps ».'],
    ['pencil', 'Ce qui vous est demandé', 'Pour chacune des 3 esquives, écrire votre posture, votre réponse et votre rebond.']
  ], 'Vos cartes réflexes');

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.7', [
    { target: '.reflex-card .client-card', title: 'L’esquive', text: 'Voici ce que vous dit le prospect.' },
    { target: '.reflex-steps', title: 'Trois gestes, dans l’ordre',
      items: [
        { key: '1', tone: 'blue', text: 'la posture : votre voix et votre attitude ;' },
        { key: '2', tone: 'blue', text: 'la réponse : la phrase que vous dites ;' },
        { key: '3', tone: 'blue', text: 'le rebond : ce qui relance l’échange.' }
      ] },
    { target: '.reflex-card .field', title: 'Votre texte', text: 'Écrivez le geste en cours, court et utilisable pendant un appel.' },
    { target: '.reflex-position', title: 'Trois cartes', text: 'Une carte par esquive.',
      after: 'Chaque point est une carte. Cliquez dessus pour en changer.' },
    { target: '.reflex-actions .k-submit', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: 'Ce bouton passe au geste suivant, puis à la carte suivante.' },
        { symbol: 'phone', tone: 'green', text: 'Les 3 cartes prêtes, votre fiche s’ouvre en mode appel.' }
      ] }
  ]);

  ex.mount('s2-2.7', { screen, validate, intercept, feedback, compactFeedback: true });
})();
