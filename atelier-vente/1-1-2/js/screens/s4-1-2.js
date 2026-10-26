/* S4 1.2 · Dérouler la chaîne CAP.
 *
 * Deux caractéristiques, présentées une à la fois : à gauche la
 * caractéristique, à droite l'avantage puis la preuve à rédiger.
 * « Valider et passer à l'étape suivante » ouvre la caractéristique
 * suivante ; la dernière validation affiche le corrigé, qui place un
 * exemple sous chaque champ.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S4['1.2'];
  const lines = content.lines;

  const current = () => Math.min(Math.max(0, Number(ex.value('line')) || 0), lines.length - 1);
  const lineDone = i => kit.filled(ex.value(`adv${i}`)) && kit.filled(ex.value(`proof${i}`));

  /* Une case A ou P de la colonne de droite : la lettre et son nom, la
   * question en titre, puis le champ. */
  function box(field, tone, letter, label, question) {
    return `<div class="cap-box tone-${tone}">
      <p class="cap-box-head"><span class="cap-box-letter">${letter}</span><span>${esc(label)}</span></p>
      <p class="cap-box-question">${esc(question)}</p>
      ${ex.field(field, `${label} : ${question}`, { placeholder: 'Écrivez votre réponse ici…', max: 220, rows: 3, hideLabel: true })}
    </div>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = current();
    const item = lines[i];
    const last = lines.every((_, n) => n === i || lineDone(n));
    return `<div class="k-page cap-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        note: 'Un avantage répond au « pourquoi c’est utile pour lui ? », une preuve au « comment en être sûr ? ».',
        aside: `<div class="cap-progress"><span>Étape ${i + 1} sur ${lines.length}</span><span class="k-dots">${lines.map((_, n) =>
          `<button type="button" class="k-dot ${n === i ? 'is-current' : lineDone(n) ? 'is-done' : ''}" data-act="line" data-index="${n}" aria-label="Caractéristique ${n + 1}"></button>`).join('')}</span></div>${kit.tourButton()}` })}
      <form novalidate>
        <div class="cap-layout">
          <section class="k-panel cap-feature">
            <p class="cap-feature-head"><span class="cap-pill">Caractéristique</span><span class="cap-n">${i + 1}</span></p>
            <p class="cap-feature-text">${esc(item.feature)}</p>
            ${item.image ? `<img class="cap-feature-picture" src="${esc(core.asset(item.image))}" alt="" decoding="async">`
              : item.symbol ? `<span class="cap-feature-art" aria-hidden="true">${icon(item.symbol, { size: 64, strokeWidth: 1.4 })}</span>` : ''}
          </section>
          <section class="k-panel cap-fields">
            ${box(`adv${i}`, 'a', 'A', 'Avantage', 'Quel bénéfice concret pour le client ?')}
            <span class="cap-down" aria-hidden="true">${icon('arrowDown', { size: 22 })}</span>
            ${box(`proof${i}`, 'p', 'P', 'Preuve', 'Quel élément factuel peut le rassurer ?')}
          </section>
        </div>
        ${core.errorsBox()}
        ${kit.bar({
          right: `${kit.dialogButton('hint', 'Voir un indice', 'secondary', '')}${kit.submit(last ? 'Vérifier mes réponses' : 'Valider et passer à l’étape suivante')}`
        })}
      </form>
    </div>`;
  }

  function reviewScreen() {
    return `<div class="k-page cg-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle })}
      <form novalidate>
        ${lines.map((line, i) => `<section class="chain-row">
          <span class="chain-n">${i + 1}</span>
          <div class="chain-cell tone-c"><p class="chain-label">Caractéristique</p><p class="chain-feature">${esc(line.feature)}</p></div>
          <span class="chain-arrow">${icon('arrowRight', { size: 26 })}</span>
          <div class="chain-cell tone-a"><p class="chain-label">Avantage</p><p class="chain-own">${esc(ex.value(`adv${i}`))}</p>${kit.model('Corrigé, exemple', line.advantage)}</div>
          <span class="chain-arrow">${icon('arrowRight', { size: 26 })}</span>
          <div class="chain-cell tone-p"><p class="chain-label">Preuve</p><p class="chain-own">${esc(ex.value(`proof${i}`))}</p>${kit.model('Corrigé, exemple', line.proof)}</div>
        </section>`).join('')}
        ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>
      </form>
    </div>`;
  }

  function lineErrors(i) {
    const errors = [];
    if (!kit.filled(ex.value(`adv${i}`))) errors.push({ key: `adv${i}`, message: `Caractéristique ${i + 1} : complétez l’avantage.` });
    if (!kit.filled(ex.value(`proof${i}`))) errors.push({ key: `proof${i}`, message: `Caractéristique ${i + 1} : complétez la preuve.` });
    return errors;
  }

  function validate() {
    const errors = lineErrors(current());
    if (errors.length) return errors;
    const missing = lines.findIndex((_, n) => !lineDone(n));
    return missing === -1 ? [] : [{ key: 'line', message: `Complétez aussi la caractéristique ${missing + 1}.` }];
  }

  /* Caractéristique remplie : on passe à la suivante encore incomplète. */
  function intercept() {
    const i = current();
    if (lineErrors(i).length) return false;
    const next = lines.findIndex((_, n) => n !== i && !lineDone(n));
    if (next === -1) return false;
    ex.setValue('line', next);
    return true;
  }

  const feedback = () => ['Comparez vos avantages et vos preuves aux exemples : un avantage commence souvent par « vous », une preuve est un fait vérifiable.'];

  kit.on({ line: el => { ex.setValue('line', Number(el.dataset.index)); kit.commit(); } });
  kit.dialogs({
    hint: {
      title: 'Un indice',
      html: '<p><strong>Avantage :</strong> partez de « Vous… » et dites ce que le client y gagne au quotidien.</p><p><strong>Preuve :</strong> un chiffre, un engagement écrit, un fait vérifiable qui rend la promesse crédible.</p>'
    }
  });

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s4-1.2', [
    { target: '.cap-feature', title: 'La caractéristique', text: 'Votre point de départ : ce qu’est le produit.' },
    { target: '.cap-fields', title: 'Vos deux réponses',
      items: [
        { key: 'A', tone: 'green', text: 'L’avantage : ce que le client y gagne.' },
        { key: 'P', tone: 'coral', text: 'La preuve : un fait qui le démontre.' }
      ] },
    { target: '.cap-progress', title: 'Deux caractéristiques', text: 'Vous les traitez l’une après l’autre.' },
    { target: '.cap-page .k-bar', title: 'Valider',
      items: [
        { symbol: 'lightbulb', tone: 'gold', text: '« Voir un indice » vous aide si vous bloquez.' },
        { symbol: 'arrowRight', tone: 'blue', text: 'Ce bouton passe à la caractéristique suivante.' }
      ] }
  ]);

  ex.mount('s4-1.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
