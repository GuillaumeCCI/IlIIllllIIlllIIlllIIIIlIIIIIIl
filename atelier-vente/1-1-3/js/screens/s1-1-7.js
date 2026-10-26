/* S1 1.7 · Ma bibliothèque d'objections.
 *
 * Quatre fiches à préparer : la nature de l'objection, la question pour
 * creuser, la réponse type et la preuve à citer. « Enregistrer cette fiche »
 * passe à la suivante encore incomplète ; la liste de gauche permet d'y
 * revenir. En relecture, chaque fiche est mise en regard du corrigé.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.7'];
  const natures = window.ATELIER_NATURES;
  const fiches = content.fiches;
  const PARTS = ['nature', 'question', 'answer', 'proof'];

  const val = (part, i) => ex.value(`${part}${i}`);
  const complete = i => PARTS.every(part => kit.filled(val(part, i)));
  const doneCount = () => fiches.filter((_, i) => complete(i)).length;
  const natureLabel = id => (natures.find(n => n.id === id) || {}).label || '';
  const current = () => {
    const asked = Number(ex.value('fiche'));
    return Number.isInteger(asked) && asked >= 0 && asked < fiches.length ? asked : 0;
  };

  function list(at) {
    return `<nav class="k-panel lib-list" aria-label="Les objections">
      <h2>Les objections</h2>
      <ol>${fiches.map((f, i) => `<li><button type="button" class="lib-item ${i === at ? 'is-current' : ''} ${complete(i) ? 'is-done' : ''}" data-act="fiche" data-index="${i}">
        <span class="lib-n">${complete(i) && i !== at ? icon('check', { size: 16 }) : i + 1}</span>
        <span><strong>« ${esc(f.text)} »</strong><small>${complete(i) ? 'Complétée' : 'À compléter'}</small></span>
      </button></li>`).join('')}</ol>
    </nav>`;
  }

  function sheet(i) {
    return `<p class="k-label">Fiche ${i + 1} / ${fiches.length}</p>
      <h2 class="lib-title">« ${esc(fiches[i].text)} »</h2>
      <div class="lib-row"><span class="lib-step">1</span><div><label class="lib-label" for="field-nature${i}">Nature de l’objection</label>
        ${ex.select(`nature${i}`, 'Nature de l’objection', natures.map(n => ({ id: n.id, label: n.label })), 'Choisir une nature')}</div></div>
      <div class="lib-row"><span class="lib-step">2</span><div><p class="lib-label">Question pour creuser</p>
        ${ex.field(`question${i}`, 'Question pour creuser', { placeholder: 'La question que vous poseriez au client…', max: 300, rows: 2, hideLabel: true })}</div></div>
      <div class="lib-row"><span class="lib-step">3</span><div><p class="lib-label">Réponse type + preuve</p>
        ${ex.field(`answer${i}`, 'Votre réponse', { placeholder: 'Ce que vous diriez…', max: 500, rows: 2 })}
        ${ex.field(`proof${i}`, 'Preuve à citer', { placeholder: 'Exemple, résultat, essai, témoignage…', max: 300, rows: 2 })}</div></div>`;
  }

  function table(review = false) {
    return `<div class="lib-table-wrap"><table class="lib-table">
      <thead><tr><th scope="col">Objection</th><th scope="col">Nature</th><th scope="col">Question</th><th scope="col">Réponse</th><th scope="col">Preuve</th></tr></thead>
      <tbody>${fiches.map((f, i) => `<tr><th scope="row">« ${esc(f.text)} »</th><td>${esc(natureLabel(val('nature', i)))}</td><td>${esc(val('question', i))}</td><td>${esc(val('answer', i))}</td><td>${esc(val('proof', i))}</td></tr>${review ? '' : ''}`).join('')}</tbody>
    </table></div>`;
  }

  function reviewScreen() {
    return `<section class="k-panel">
      <h2>Votre bibliothèque</h2>
      <p class="k-muted">Gardez-la sous la main : elle se relit en un coup d’œil avant un rendez-vous.</p>
      ${table(true)}
    </section>
    <div class="k-review-grid">${fiches.map((f, i) => `<section class="k-panel lib-review">
      <p class="k-label">Fiche ${i + 1}</p>
      <h3 class="lib-title">« ${esc(f.text)} »</h3>
      <p class="review-line">Votre diagnostic : <strong>${esc(natureLabel(val('nature', i)))}</strong></p>
      ${ex.inlineNote(`Nature selon le corrigé : ${natureLabel(f.nature)}. ${f.natureNote}`, 'neutral')}
      <div class="lib-review-grid">
        ${kit.model('Une question possible', f.question)}
        ${kit.model('Une réponse possible', f.answer)}
        ${kit.model('Une preuve possible', f.proof)}
      </div>
    </section>`).join('')}</div>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = current();
    const last = fiches.every((_, i) => i === at || complete(i));
    return `<div class="k-page lib-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${doneCount()} / ${fiches.length}</strong> fiches complétées</p>${reviewing ? '' : kit.contextButton() + kit.tourButton()}` })}
      ${reviewing ? reviewScreen() : `<div class="lib-layout">
        ${list(at)}
        <form class="k-panel lib-sheet" novalidate>
          ${sheet(at)}
          ${core.errorsBox()}
          <div class="lib-actions">
            <p class="k-muted">Vos réponses pourront être modifiées plus tard.</p>
            ${kit.submit(last ? 'Enregistrer et terminer' : 'Enregistrer cette fiche')}
          </div>
        </form>
      </div>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 4 objections')}
    </div>`;
  }

  function ficheErrors(values, i) {
    const labels = { nature: 'Choisissez la nature de l’objection.', question: 'Rédigez la question pour creuser.', answer: 'Rédigez votre réponse type.', proof: 'Indiquez la preuve à citer.' };
    return PARTS.filter(part => !kit.filled(values[`${part}${i}`])).map(part => ({ key: `${part}${i}`, message: labels[part] }));
  }

  function validate(values) {
    const at = current();
    const own = ficheErrors(values, at);
    if (own.length) return own;
    const missing = fiches.findIndex((_, i) => ficheErrors(values, i).length);
    return missing === -1 ? [] : [{ key: 'fiche', message: `Complétez aussi la fiche ${missing + 1}.` }];
  }

  function intercept(values) {
    const at = current();
    if (ficheErrors(values, at).length) return false;
    for (let step = 1; step < fiches.length; step++) {
      const next = (at + step) % fiches.length;
      if (ficheErrors(values, next).length) { ex.setValue('fiche', next); core.toast(`Fiche ${at + 1} enregistrée.`); return true; }
    }
    return false;
  }

  const feedback = () => ['Comparez vos fiches au corrigé : une question ouverte, une réponse courte, une preuve vérifiable.'];

  kit.on({ fiche: el => { ex.setValue('fiche', Number(el.dataset.index)); kit.commit(); } });

  // À l'arrivée, avant la visite guidée : de quoi parle l'exercice et ce qui est demandé.
  kit.context([
    ['list', 'Une bibliothèque d’objections', 'Des réponses préparées à l’avance aux objections que vous entendez souvent.'],
    ['document', 'Une fiche', 'Pour une objection : sa nature, une question pour creuser, une réponse et sa preuve.'],
    ['pencil', 'Ce qui vous est demandé', 'Remplir les 4 fiches, une par objection.']
  ], 'Votre bibliothèque d’objections');

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s1-1.7', [
    { target: '.lib-list', title: 'Les objections', text: 'Une fiche par objection. Cliquez pour passer de l’une à l’autre.' },
    { target: '.lib-sheet .lib-row:nth-of-type(1)', title: '1. La nature', text: 'Choisissez dans la liste ce que cache l’objection.' },
    { target: '.lib-sheet .lib-row:nth-of-type(2)', title: '2. La question', text: 'Écrivez la question que vous poseriez au client pour en savoir plus.' },
    { target: '.lib-sheet .lib-row:nth-of-type(3)', title: '3. La réponse et sa preuve', text: 'Ce que vous diriez, puis un fait qui le prouve. Par exemple :',
      items: [
        { symbol: 'chat', tone: 'blue', text: 'la réponse : « Nos sièges soulagent le dos de vos équipes. » ;' },
        { symbol: 'check', tone: 'green', text: 'la preuve : « Chez un client, les arrêts pour mal de dos ont baissé de 30 %. »' }
      ] },
    { target: '.lib-actions .k-submit', title: 'Enregistrer', text: 'Ce bouton passe à la fiche suivante.',
      after: 'Après la 4e fiche, vous voyez le corrigé.' }
  ]);

  ex.mount('s1-1.7', { screen, validate, intercept, feedback, compactFeedback: true });
})();
