/* S3 2.2 · Passez en mode traitement.
 *
 * Trois répliques de prospect et, pour chacune, le mauvais réflexe d'un
 * commercial. On explique pourquoi ce réflexe bloque, puis on rédige la
 * réponse adaptée, en vérifiant qu'elle comporte un accueil, une question
 * et une suite. « Enregistrer » passe au cas suivant encore incomplet.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['2.2'];
  const cases = content.cases;

  const complete = i => kit.filled(ex.value(`why${i}`)) && kit.filled(ex.value(`reply${i}`));
  const doneCount = () => cases.filter((_, i) => complete(i)).length;
  const current = () => {
    const n = Number(ex.value('case'));
    return Number.isInteger(n) && n >= 0 && n < cases.length ? n : 0;
  };

  function tabs(at) {
    return `<div class="fix-tabs">${cases.map((c, i) => `<button type="button" class="fix-tab ${i === at ? 'is-current' : ''} ${complete(i) ? 'is-done' : ''}" data-act="case" data-index="${i}">
      <span class="fix-n">${complete(i) && i !== at ? icon('check', { size: 18 }) : String(i + 1).padStart(2, '0')}</span><span class="fix-tab-text"><small>Réplique ${i + 1} · ${esc(c.tab)}</small><span>« ${esc(c.client)} »</span></span></button>`).join('')}</div>`;
  }

  function caseBody(i) {
    const c = cases[i];
    return `${kit.clientCard(c.client, null, 'Le client vous dit', i)}
      <div class="fix-grid">
        <section class="fix-bad">
          <p class="fix-bad-title">${icon('close', { size: 18 })}<span>Le réflexe à éviter</span></p>
          <p class="fix-reflex">« ${esc(c.reflex)} »</p>
          <p class="fix-label">Pourquoi ça bloque ?</p>
          ${ex.field(`why${i}`, 'Pourquoi ça bloque ?', { placeholder: 'Ce que cette réponse provoque…', max: 300, rows: 3, hideLabel: true })}
        </section>
        <span class="fix-arrow" aria-hidden="true">${icon('arrowRight', { size: 34 })}</span>
        <section class="fix-good">
          <p class="fix-good-title">${icon('pencil', { size: 18 })}<span>Votre réponse adaptée</span></p>
          ${ex.field(`reply${i}`, 'Votre réponse adaptée', { placeholder: 'Ce que vous diriez au client…', max: 500, rows: 5, hideLabel: true })}
          <p class="fix-help">${icon('lightbulb', { size: 18 })}<span>${esc(content.help)}</span></p>
        </section>
      </div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = current();
    const after = cases.findIndex((_, k) => k > at && !complete(k));
    const next = after !== -1 ? after : cases.findIndex((_, k) => k !== at && !complete(k));
    return `<div class="k-page fix-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count fix-count"><strong>${doneCount()} / ${cases.length}</strong> répliques réparées</p>` })}
      ${reviewing ? reviewScreen() : `${tabs(at)}
        <form class="k-panel fix-panel" novalidate>
          ${caseBody(at)}
          ${core.errorsBox()}
          <div class="fix-bar">
            <div class="fix-checks"><strong>À vérifier :</strong>${content.checks.map((label, k) => `<label class="call-key"><input type="checkbox" data-field="check${at}${k}" ${ex.value(`check${at}${k}`) === true ? 'checked' : ''}><span class="call-key-box" aria-hidden="true">${icon('check', { size: 14 })}</span><span>${esc(label)}</span></label>`).join('')}</div>
            <div class="fix-right">${kit.dialogButton(`tip${at}`, 'Voir un repère', 'secondary', 'search')}${kit.submit(next === -1 ? 'Enregistrer et terminer' : `Enregistrer et passer au cas ${next + 1}`)}</div>
          </div>
        </form>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 3 cas')}
    </div>`;
  }

  function reviewScreen() {
    return `${cases.map((c, i) => `<section class="k-panel fix-review">
      <p class="k-label">Cas ${i + 1} · ${esc(c.tab)}</p>
      <p class="fix-client"><span class="fix-c">C</span><span>« ${esc(c.client)} »</span></p>
      <p class="fix-reflex is-review">${icon('close', { size: 16 })}<span>« ${esc(c.reflex)} »</span></p>
      <div class="k-columns is-even">
        <div>${kit.yours('Pourquoi ça bloque, selon vous', ex.value(`why${i}`))}${kit.model('Ce que ce réflexe provoque', c.blocks)}</div>
        <div>${kit.yours('Votre réponse adaptée', ex.value(`reply${i}`))}${kit.model('Une réponse possible', c.model)}</div>
      </div>
    </section>`).join('')}
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function caseErrors(values, i) {
    const errors = [];
    if (!kit.filled(values[`why${i}`])) errors.push({ key: `why${i}`, message: `Cas ${i + 1} : expliquez pourquoi ce réflexe bloque.` });
    if (!kit.filled(values[`reply${i}`])) errors.push({ key: `reply${i}`, message: `Cas ${i + 1} : rédigez votre réponse adaptée.` });
    return errors;
  }

  function validate(values) {
    const own = caseErrors(values, current());
    if (own.length) return own;
    const missing = cases.findIndex((_, i) => caseErrors(values, i).length);
    return missing === -1 ? [] : [{ key: 'case', message: `Complétez aussi le cas ${missing + 1}.` }];
  }

  function intercept(values) {
    const at = current();
    if (caseErrors(values, at).length) return false;
    for (let step = 1; step < cases.length; step++) {
      const next = (at + step) % cases.length;
      if (caseErrors(values, next).length) { ex.setValue('case', next); return true; }
    }
    return false;
  }

  const feedback = () => ['Vos réponses accueillent-elles la réplique, posent-elles une question et proposent-elles une suite ? Comparez au corrigé.'];

  kit.on({ case: el => { ex.setValue('case', Number(el.dataset.index)); kit.commit(); } });
  kit.dialogs(Object.fromEntries(cases.map((c, i) => [`tip${i}`, { title: `Repère · ${c.tab}`, html: `<p>${esc(c.tip)}</p>` }])));

  ex.mount('s3-2.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
