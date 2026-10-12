/* S1 1.6 · Construire… puis réparer un mauvais argumentaire !
 *
 * Trois temps, à l'envers de l'habitude :
 *   1 · rédiger volontairement le pire argumentaire possible ;
 *   2 · en diagnostiquer trois erreurs majeures ;
 *   3 · le réparer, puis comparer avant et après.
 * Le contexte et les trois besoins du client restent affichés à gauche.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.6'];

  const stage = () => kit.stage(3);
  const errorsFound = () => [0, 1, 2].filter(i => kit.filled(ex.value(`error${i}`))).length;

  function sidePanel(at) {
    return `<aside class="k-panel repair-side">
      <section class="repair-block">
        <span class="repair-symbol">${icon('undo', { size: 26 })}</span>
        <div><h2>Votre objectif</h2><p>${esc(content.objective)}</p></div>
      </section>
      <section class="repair-block">
        <span class="repair-symbol">${icon('document', { size: 26 })}</span>
        <div><h2>Votre contexte</h2><p>${esc(content.context)}</p>
          <ol class="repair-needs">${content.needs.map((need, i) => `<li><span>${i + 1}</span>${esc(need)}</li>`).join('')}</ol>
        </div>
      </section>
      <p class="repair-challenge ${at === 3 ? 'is-green' : ''}">${icon('bolt', { size: 26 })}<span><strong>Votre défi :</strong> ${at === 3
        ? 'répondez maintenant à chacun des 3 besoins avec des bénéfices concrets.'
        : 'ignorez volontairement ces bonnes pratiques… pour mieux les réparer ensuite.'}</span></p>
    </aside>`;
  }

  function trapCard() {
    const index = ex.value('trap');
    if (!Number.isInteger(index)) return '';
    const trap = content.traps[index % content.traps.length];
    return `<p class="repair-trap">${icon('bolt', { size: 18 })}<span><strong>${esc(trap.name)} :</strong> ${esc(trap.text)}</span></p>`;
  }

  function stepOne() {
    return `<p class="repair-stage-label is-blue">Étape 1 sur 3</p>
      <h2 class="repair-title">Rédigez le pire argumentaire possible</h2>
      <p class="repair-lede">Lâchez-vous ! Choisissez des informations hors sujet, abusez du jargon technique, ignorez royalement les attentes du client ou noyez-le sous une liste interminable de caractéristiques. Bref, faites tout ce qu’un bon commercial devrait s’interdire.</p>
      ${ex.field('worst', 'Mon pire argumentaire', { placeholder: 'Commencez votre argumentaire désastreux ici…', max: 800, rows: 4 })}
      <div class="repair-inspiration">
        <span class="repair-deck">${icon('stack', { size: 40 })}</span>
        <div><strong>Besoin d’inspiration ?</strong>
          <div class="repair-inspiration-row">${kit.act('draw', 'Tirer une carte piège', 'secondary small')}<span class="k-muted">${content.traps.slice(0, 4).map(t => esc(t.name)).join(' · ')}</span></div>
        </div>
      </div>
      ${trapCard()}`;
  }

  function stepTwo() {
    const n = errorsFound();
    return `<p class="repair-stage-label">Étape 2 sur 3</p>
      <h2 class="repair-title">Analysez les dégâts</h2>
      <p class="repair-lede">Prenez du recul sur le texte que vous venez de rédiger. Identifiez 3 erreurs majeures qui le rendent totalement inefficace.</p>
      <div class="repair-recall">
        <span class="repair-recall-symbol">${icon('search', { size: 24 })}</span>
        <div><p class="k-label">Votre argumentaire</p><p>${esc(ex.value('worst'))}</p></div>
        <button type="button" class="text-button with-icon" data-act="to-stage" data-stage="1">${icon('pencil', { size: 15 })}<span>Modifier mon texte</span></button>
      </div>
      <div class="repair-diag-head"><h3>Posez votre diagnostic</h3><span class="k-muted" data-live="errors">${n} / 3 erreurs identifiées</span></div>
      ${[0, 1, 2].map(i => `<div class="repair-error">
        <span class="repair-error-n">${i + 1}</span><label for="field-error${i}">Erreur ${i + 1}</label>
        <input type="text" id="field-error${i}" data-field="error${i}" maxlength="200" placeholder="Nommez l’erreur et expliquez son impact…" value="${esc(ex.value(`error${i}`))}">
      </div>`).join('')}
      <p class="repair-help">${icon('lightbulb', { size: 20 })}<span>Besoin d’un coup de pouce ?</span>${kit.dialogButton('traps', 'Afficher les pièges fréquents', 'secondary small', '')}</p>`;
  }

  function stepThree() {
    return `<p class="repair-stage-label is-green">Étape 3 sur 3</p>
      <h2 class="repair-title">Réparez votre argumentaire</h2>
      <p class="repair-lede">Reprenez la main. Réécrivez votre texte en sélectionnant uniquement les éléments qui répondent aux besoins précis de ce client. Transformez les caractéristiques techniques en bénéfices concrets et rassurez-le avec des preuves.</p>
      <p class="repair-links">
        <button type="button" class="text-button with-icon" data-act="dialog" data-dialog="initial">${icon('document', { size: 18 })}<span>Voir mon texte initial</span></button>
        <button type="button" class="text-button with-icon" data-act="dialog" data-dialog="diagnostic">${icon('search', { size: 18 })}<span>Voir mon diagnostic</span></button>
      </p>
      ${ex.field('fixed', 'Mon argumentaire idéal', { placeholder: 'Réécrivez ici une proposition claire, ciblée et rassurante…', max: 800, rows: 6 })}
      ${kit.tip('Besoin → bénéfice concret → preuve.')}`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const at = stage();
    const body = at === 1 ? stepOne() : at === 2 ? stepTwo() : stepThree();
    const right = at === 1 ? kit.submit('Passer à l’étape suivante')
      : at === 2 ? kit.submit('Passer à la réparation')
      : `${kit.dialogButton('example', 'Voir un exemple', 'secondary', '')}${kit.submit('Comparer avant / après')}`;
    return `<div class="k-page repair-page stage-${at}">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, aside: kit.steps(['Construire le pire', 'Analyser les dégâts', 'Réparer'], at, { compact: true }) })}
      <div class="k-columns">
        ${sidePanel(at)}
        <form class="k-panel" novalidate>
          ${body}
          ${core.errorsBox()}
          ${kit.bar({ left: at === 1 ? kit.reset() : kit.back('to-stage-back', at === 2 ? 'Revenir à l’argumentaire' : 'Revenir au diagnostic'), right })}
        </form>
      </div>
      ${kit.utility('Comparaison avant / après à la validation')}
    </div>`;
  }

  function reviewScreen() {
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Avant / après', subtitle: 'Votre argumentaire désastreux, votre diagnostic, puis votre version réparée.' })}
      <div class="k-columns is-even">
        <section class="k-panel repair-before"><p class="repair-stage-label">Avant</p>${kit.yours('Mon pire argumentaire', ex.value('worst'))}
          <h3 class="k-small-title">Mon diagnostic</h3>
          <ol class="repair-diag-list">${[0, 1, 2].map(i => `<li>${esc(ex.value(`error${i}`))}</li>`).join('')}</ol>
          ${kit.model('Exemple de pire argumentaire', content.worstExample)}
          <h3 class="k-small-title">Les erreurs à y repérer</h3>
          <ol class="repair-diag-list">${content.worstErrors.map(text => `<li>${esc(text)}</li>`).join('')}</ol>
        </section>
        <section class="k-panel repair-after"><p class="repair-stage-label is-green">Après</p>${kit.yours('Mon argumentaire réparé', ex.value('fixed'))}
          ${kit.model('Exemple d’argumentaire amélioré', content.model)}
          ${ex.inlineNote(content.takeaway, 'neutral')}
        </section>
      </div>
      <section class="k-panel">
        <h3>Relisez votre version réparée</h3>
        <ul class="repair-checks">
          <li>${icon('check', { size: 16 })}<span>Chacun des 3 besoins (sécurité, accompagnement, budget) reçoit une réponse.</span></li>
          <li>${icon('check', { size: 16 })}<span>Chaque caractéristique est traduite en bénéfice concret pour le client.</span></li>
          <li>${icon('check', { size: 16 })}<span>Au moins une preuve rend la promesse crédible : chiffre, audit, garantie.</span></li>
          <li>${icon('check', { size: 16 })}<span>Le jargon a disparu, le ton est affirmatif.</span></li>
        </ul>
      </section>
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate(values) {
    const at = stage();
    if (!kit.filled(values.worst)) return [{ key: 'worst', message: 'Rédigez d’abord votre pire argumentaire.' }];
    if (at === 1) return [];
    const missing = [0, 1, 2].filter(i => !kit.filled(values[`error${i}`]));
    if (missing.length) return missing.map(i => ({ key: `error${i}`, message: `Décrivez l’erreur ${i + 1}.` }));
    if (at === 2) return [];
    return kit.filled(values.fixed) ? [] : [{ key: 'fixed', message: 'Rédigez votre argumentaire réparé.' }];
  }

  function intercept(values) {
    const at = stage();
    if (at === 3 || validate(values).length) return false;
    kit.setStage(at + 1);
    return true;
  }

  const feedback = () => ['Comparez votre version réparée au corrigé modèle et à la grille de relecture ci-dessus.'];

  kit.on({
    draw: () => {
      const previous = ex.value('trap');
      let next = Math.floor(Math.random() * content.traps.length);
      if (next === previous) next = (next + 1) % content.traps.length;
      ex.setValue('trap', next);
      kit.commit();
    },
    'to-stage': el => { kit.setStage(Number(el.dataset.stage)); kit.commit(); },
    'to-stage-back': () => { kit.setStage(Math.max(1, stage() - 1)); kit.commit(); }
  });
  kit.live(() => ({ errors: `${errorsFound()} / 3 erreurs identifiées` }));
  kit.dialogs({
    traps: { title: 'Les pièges fréquents', html: `<ul class="dialog-list">${content.commonErrors.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` },
    initial: () => ({ title: 'Mon texte initial', html: `<p>${esc(ex.value('worst'))}</p>` }),
    diagnostic: () => ({ title: 'Mon diagnostic', html: `<ol class="dialog-list">${[0, 1, 2].map(i => `<li>${esc(ex.value(`error${i}`))}</li>`).join('')}</ol>` }),
    example: { title: 'Un exemple de réparation', html: `<p><strong>Avant :</strong> ${esc(content.worstExample)}</p><p><strong>Après :</strong> ${esc(content.model)}</p>` }
  });

  ex.mount('s1-1.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
