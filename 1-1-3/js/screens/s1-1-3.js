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

  function clientPanel(i) {
    return `<section class="ear-client">
      <p class="ear-eyebrow">${esc(content.eyebrow)} · Objection ${String(i + 1).padStart(2, '0')}</p>
      <h2>Écoutez le client</h2>
      <span class="ear-rule" aria-hidden="true"></span>
      <blockquote class="ear-quote">“ ${esc(cases[i].quote)} ”</blockquote>
      ${step(i) === 2
        ? `<div class="ear-diagnosis"><p class="ear-diagnosis-label">Diagnostic posé</p><span class="ear-chip">${icon('check', { size: 18 })}<span>${esc(natureOf(nature(i)).label)}</span></span></div>`
        : `<p class="ear-topic">Cas : ${esc(cases[i].topic)}</p>`}
    </section>`;
  }

  function decision(i) {
    if (step(i) === 1) {
      return `<p class="k-label">Étape 1 · Poser le diagnostic</p>
        <h2 class="ear-title">Quelle est la nature de cette objection ?</h2>
        <p class="ear-sub">Choisissez la nature la plus probable.</p>
        <div class="ear-grid">${natures.map((n, k) => `
          <button type="button" class="ear-option ${nature(i) === n.id ? 'is-chosen' : ''}" data-act="nature" data-id="${n.id}" aria-pressed="${nature(i) === n.id}">
            <span class="ear-letter">${letters[k]}</span><span><strong>${esc(n.label)}</strong><small>${esc(n.text)}</small></span>
          </button>`).join('')}</div>
        <p class="ear-foot">Votre choix ouvre la deuxième décision.</p>`;
    }
    return `<div class="ear-retained">${icon('check', { size: 18 })}<span>Nature retenue : <strong>${esc(natureOf(nature(i)).label)}</strong></span>
        <button type="button" class="text-button" data-act="edit">Modifier</button></div>
      <p class="k-label">Étape 2 · Passer à l’action</p>
      <h2 class="ear-title">Comment réagir maintenant ?</h2>
      <p class="ear-sub">Choisissez le premier geste à adopter.</p>
      <div class="ear-list">${gestures.map(g => `
        <button type="button" class="ear-action ${gesture(i) === g.id ? 'is-chosen' : ''}" data-act="gesture" data-id="${g.id}" aria-pressed="${gesture(i) === g.id}">
          <span class="ear-action-symbol">${icon(g.symbol, { size: 28 })}</span>
          <span><strong>${esc(g.label)}</strong><small>${esc(g.sub)}</small></span>
          ${icon('chevronRight', { size: 22 })}
        </button>`).join('')}</div>
      <p class="ear-foot">Choisissez un geste pour valider ce cas.</p>`;
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
      ${cases.map((c, i) => {
        const okN = nature(i) === c.nature;
        const okG = gesture(i) === c.gesture;
        return `<section class="k-panel ear-review">
          <p class="k-label">Objection ${String(i + 1).padStart(2, '0')} · ${esc(c.topic)}</p>
          <blockquote class="ear-review-quote">“ ${esc(c.quote)} ”</blockquote>
          <p class="review-line"><span>Nature : <strong>${esc(natureOf(c.nature).label)}</strong></span> ${kit.mark(okN, okN ? 'votre diagnostic' : `vous : ${natureOf(nature(i)).label || 'rien'}`)}</p>
          <p class="review-line"><span>Premier geste : <strong>${esc(gestureOf(c.gesture).label)}</strong></span> ${kit.mark(okG, okG ? 'votre geste' : `vous : ${gestureOf(gesture(i)).label || 'rien'}`)}</p>
          ${ex.inlineNote(c.why, okN && okG ? 'good' : 'neutral')}
        </section>`;
      }).join('')}
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = current();
    const top = `<div class="ear-top"><p class="k-label">Gestion des objections</p>
      <span class="ear-top-right">${kit.dialogButton('recall', 'Rappel', 'text-button', '')}<span class="ear-sep" aria-hidden="true"></span>
      ${reviewing ? '<span>Corrigé</span>' : `<span>Cas ${recap() ? cases.length : at + 1} sur ${cases.length}</span>${caseDots(at)}`}</span></div>`;
    if (reviewing) return `<div class="k-page ear-page">${top}${reviewScreen()}</div>`;
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

  function feedback() {
    const right = cases.filter((c, i) => nature(i) === c.nature && gesture(i) === c.gesture).length;
    return [`${right} cas sur ${cases.length} entièrement juste${right > 1 ? 's' : ''} : nature et premier geste.`];
  }

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

  ex.mount('s1-1.3', { screen, validate, feedback, compactFeedback: true });
})();
