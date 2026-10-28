/* S1 1.3 · Écoutez le client.
 *
 * Quatre objections, deux décisions chacune :
 *   1 · le diagnostic : quelle est la nature de l'objection ?
 *   2 · l'action : quel premier geste adopter ?
 * Le choix du geste valide le cas et affiche le suivant. « Modifier »
 * revient au diagnostic. Après le quatrième cas, un récapitulatif permet
 * de relire avant de valider. Le bouton « Rappel » rouvre la méthode.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.3'];
  const natures = window.ATELIER_NATURES;
  const gestures = content.gestures;
  const cases = content.cases;
  const letters = 'ABCD';

  const nature = i => ex.value(`nature${i}`) || '';
  const gesture = i => ex.value(`gesture${i}`) || '';
  const complete = i => Boolean(nature(i) && gesture(i));
  const doneCount = () => cases.filter((_, i) => complete(i)).length;
  const natureOf = id => natures.find(n => n.id === id) || {};
  const gestureOf = id => gestures.find(g => g.id === id) || {};
  const recap = () => ex.value('case') === 'recap' && doneCount() === cases.length;
  const current = () => {
    const asked = Number(ex.value('case'));
    if (Number.isInteger(asked) && asked >= 0 && asked < cases.length) return asked;
    const free = cases.findIndex((_, i) => !complete(i));
    return free === -1 ? 0 : free;
  };
  const step = i => (!nature(i) || ex.value(`edit${i}`) === true ? 1 : 2);

  function caseDots(at) {
    return `<span class="ear-dots">${cases.map((_, i) => `<button type="button" class="ear-dot ${i === at && !recap() ? 'is-current' : complete(i) ? 'is-filled' : ''}" data-act="case" data-index="${i}" aria-label="Cas ${i + 1}"></button>`).join('')}</span>`;
  }

  /* Les éléments arrivent en cascade (classe commune k-cascade, rang --i) :
   * le panneau du client quand on change de cas, celui des choix à chaque
   * nouvelle étape. Entre deux clics sur la même étape, rien ne rejoue. */
  let shown = { panel: null, step: null };
  let play = { panel: true, step: true };
  const rise = (on, n) => (on ? ` k-cascade" style="--i:${n}` : '');

  function clientPanel(i) {
    const on = play.panel;
    return `<section class="ear-client">
      <img class="ear-portrait${rise(on, 0)}" src="${esc(core.asset(kit.portraitFor(null, i)))}" alt="" decoding="async">
      <p class="ear-eyebrow${rise(on, 1)}">Objection ${String(i + 1).padStart(2, '0')}</p>
      <h2 class="ear-heading${rise(on, 2)}">Écoutez le client</h2>
      <span class="ear-rule${rise(on, 2)}" aria-hidden="true"></span>
      <blockquote class="ear-quote${rise(on, 3)}">“ ${esc(cases[i].quote)} ”</blockquote>
      ${step(i) === 2
        ? `<div class="ear-diagnosis${rise(on || play.step, on ? 4 : 0)}"><p class="ear-diagnosis-label">Diagnostic posé</p><span class="ear-chip">${icon('check', { size: 18 })}<span>${esc(natureOf(nature(i)).label)}</span></span></div>`
        : `<p class="ear-topic${rise(on, 4)}">Cas : ${esc(cases[i].topic)}</p>`}
    </section>`;
  }

  function decision(i) {
    const on = play.step;
    if (step(i) === 1) {
      return `<p class="k-label${rise(on, 0)}">Étape 1 · Poser le diagnostic</p>
        <h2 class="ear-title${rise(on, 1)}">Quelle est la nature de cette objection ?</h2>
        <p class="ear-sub${rise(on, 2)}">Choisissez la nature la plus probable.</p>
        <div class="ear-grid">${natures.map((n, k) => `
          <button type="button" class="ear-option ${nature(i) === n.id ? 'is-chosen' : ''}${rise(on, 3 + k)}" data-act="nature" data-id="${n.id}" aria-pressed="${nature(i) === n.id}">
            <span class="ear-letter">${letters[k]}</span><span><strong>${esc(n.label)}</strong><small>${esc(n.text)}</small></span>
          </button>`).join('')}</div>
        <p class="ear-foot${rise(on, 3 + natures.length)}">Votre choix ouvre la deuxième décision.</p>`;
    }
    return `<div class="ear-retained${rise(on, 0)}">${icon('check', { size: 18 })}<span>Nature retenue : <strong>${esc(natureOf(nature(i)).label)}</strong></span>
        <button type="button" class="text-button" data-act="edit">Modifier</button></div>
      <p class="k-label${rise(on, 1)}">Étape 2 · Passer à l’action</p>
      <h2 class="ear-title${rise(on, 2)}">Comment réagir maintenant ?</h2>
      <p class="ear-sub${rise(on, 3)}">Choisissez le premier geste à adopter.</p>
      <div class="ear-list">${gestures.map((g, k) => `
        <button type="button" class="ear-action ${gesture(i) === g.id ? 'is-chosen' : ''}${rise(on, 4 + k)}" data-act="gesture" data-id="${g.id}" aria-pressed="${gesture(i) === g.id}">
          <span class="ear-action-symbol">${icon(g.symbol, { size: 28 })}</span>
          <span><strong>${esc(g.label)}</strong><small>${esc(g.sub)}</small></span>
          ${icon('chevronRight', { size: 22 })}
        </button>`).join('')}</div>
      <p class="ear-foot${rise(on, 4 + gestures.length)}">Choisissez un geste pour valider ce cas.</p>`;
  }

  function recapScreen() {
    return `<section class="k-panel">
      <h2>Vos quatre cas</h2>
      <p class="k-muted">Relisez vos décisions ; cliquez sur un cas pour le modifier.</p>
      <ol class="ear-recap">${cases.map((c, i) => `<li>
        <span class="ear-recap-n">${String(i + 1).padStart(2, '0')}</span>
        <span class="ear-recap-quote">“ ${esc(c.quote)} ”</span>
        <span class="ear-recap-tags"><span>${esc(natureOf(nature(i)).label)}</span><span>${esc(gestureOf(gesture(i)).label)}</span></span>
        <button type="button" class="text-button with-icon" data-act="case" data-index="${i}">${icon('pencil', { size: 15 })}<span>Modifier</span></button>
      </li>`).join('')}</ol>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.reset(), right: kit.submit('Valider mes 4 cas') })}
    </section>`;
  }

  function reviewScreen() {
    const right = cases.filter((c, i) => nature(i) === c.nature && gesture(i) === c.gesture).length;
    return `${kit.result(right, cases.length, 'cas entièrement justes')}
      <div class="k-review-grid">${cases.map((c, i) => {
        const okN = nature(i) === c.nature;
        const okG = gesture(i) === c.gesture;
        return `<section class="k-panel ear-review">
          <p class="k-label">Objection ${String(i + 1).padStart(2, '0')} · ${esc(c.topic)}</p>
          <blockquote class="ear-review-quote">“ ${esc(c.quote)} ”</blockquote>
          <div class="k-pick-pair ear-pick-pair">${kit.picked(okN, natureOf(nature(i)).label, natureOf(c.nature).label, 'Étape 1 · La nature de l’objection')}
          ${kit.picked(okG, gestureOf(gesture(i)).label, gestureOf(c.gesture).label, 'Étape 2 · Votre premier geste')}</div>
          ${kit.explain(c.why)}
        </section>`;
      }).join('')}</div>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = current();
    const top = `<div class="ear-top"><p class="k-label">Gestion des objections</p>
      <span class="ear-top-right">${reviewing ? '' : `<span class="tour-pair">${kit.contextButton()}${kit.tourButton()}</span>`}${kit.dialogButton('recall', 'Rappel', 'text-button', '')}<span class="ear-sep" aria-hidden="true"></span>
      ${reviewing ? '<span>Corrigé</span>' : `<span>Cas ${recap() ? cases.length : at + 1} sur ${cases.length}</span>${caseDots(at)}`}</span></div>`;
    if (reviewing) return `<div class="k-page ear-page">${top}${reviewScreen()}</div>`;
    // Ce qui a changé depuis le dernier dessin : le cas, ou l'étape du cas.
    const now = { panel: at, step: `${at}-${step(at)}` };
    play = { panel: shown.panel !== now.panel, step: shown.step !== now.step };
    shown = now;
    return `<div class="k-page ear-page">
      ${top}
      <form novalidate>
        ${recap() ? recapScreen() : `<div class="ear-card">${clientPanel(at)}<section class="ear-decision">${decision(at)}</section></div>${core.errorsBox()}`}
      </form>
      ${kit.utility('Corrigé disponible après les 4 cas')}
    </div>`;
  }

  function validate() {
    const left = cases.length - doneCount();
    return left ? [{ key: 'case', message: `Il reste ${kit.plural(left, 'cas', 'cas')} à traiter.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    nature: el => { const i = current(); ex.setValue(`nature${i}`, el.dataset.id); ex.setValue(`edit${i}`, false); ex.setValue('case', i); kit.commit(); },
    gesture: el => {
      const i = current();
      ex.setValue(`gesture${i}`, el.dataset.id);
      const next = cases.findIndex((_, k) => !complete(k));
      ex.setValue('case', next === -1 ? 'recap' : next);
      kit.commit();
    },
    edit: () => { ex.setValue(`edit${current()}`, true); kit.commit(); },
    case: el => { ex.setValue('case', Number(el.dataset.index)); kit.commit(); }
  });
  kit.dialogs({
    recall: {
      title: 'Rappel : à chaque nature, son premier geste',
      html: `<ul class="dialog-list">${natures.map(n => `<li><strong>${esc(n.label)}</strong> : ${esc(n.text)} Premier geste : <strong>${esc(n.gesture)}</strong>.</li>`).join('')}</ul>`
    }
  });

  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  kit.context([
    ['chat', 'La situation', 'Quatre clients vous opposent chacun une objection.'],
    ['list', 'Sa nature', 'Ce qui se cache derrière : un prétexte, une vraie réserve, un malentendu ou un besoin d’être rassuré.'],
    ['pencil', 'Ce qui vous est demandé', 'Pour chaque objection, choisir sa nature, puis votre premier geste.']
  ], 'Écoutez le client');

  // Visite guidée en deux temps : la nature, puis le premier geste.
  kit.tour('s1-1.3', [
    { target: '.ear-client .ear-quote', title: 'L’objection', text: 'Lisez ce que vous dit le client.' },
    { target: '.ear-grid', title: '1. Sa nature', text: 'Cliquez sur la nature la plus probable.',
      after: 'Votre choix ouvre la deuxième décision.' },
    { target: '.ear-page [data-dialog="recall"]', title: 'Le rappel', text: 'Un doute ? Le rappel associe chaque nature à son premier geste.' },
    { target: '.ear-dots', title: 'Quatre cas', text: 'Chaque point est un cas. Cliquez dessus pour y revenir.' },
    { later: true, target: '.ear-list', title: '2. Votre premier geste', text: 'Cliquez sur ce que vous faites en premier.',
      after: 'Votre choix valide le cas et ouvre le suivant.' },
    { later: true, target: '.ear-retained', title: 'Changer d’avis', text: '« Modifier » vous ramène au choix de la nature.' }
  ]);

  ex.mount('s1-1.3', { screen, validate, feedback, compactFeedback: true });
})();
