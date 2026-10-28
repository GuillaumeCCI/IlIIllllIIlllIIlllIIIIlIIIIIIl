/* S4 1.2 · Repérez ce qui cloche.
 * Surligner au moins 4 maladresses, puis réécrire l’ouverture.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon } = core;
  const content = window.ATELIER_S4['1.2'];
  const segments = content.segments;
  const { esc } = core;

  const marked = () => {
    const stored = ex.value('marked');
    return Array.isArray(stored) ? stored.map(Boolean) : segments.map(() => false);
  };
  const markedCount = () => marked().filter(Boolean).length;

  const stage = () => Number(ex.value('stage')) === 2 ? 2 : 1;
  const setStage = n => ex.setValue('stage', n);

  /* Le corrigé au modèle de S1 A (js/corrige.js) : les maladresses du
   * texte, repérées ou non, le score estimatif, puis votre ouverture
   * réécrite face à une réponse possible. */
  function reviewScreen() {
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s4-1.2', ex.values());
    const [bloc] = result ? result.blocs : [];
    const flags = marked();
    const flaws = segments.map((segment, i) => {
      if (!segment.flaw) return '';
      const found = flags[i];
      return `<div class="answer-key-row">
        <span class="verdict ${found ? 'ok' : 'ko'}">${icon(found ? 'check' : 'close', { size: 14, label: found ? 'repérée' : 'non repérée' })}</span>
        <span><strong>« ${esc(segment.text.trim())} »</strong> ${found ? 'Repérée.' : 'Non repérée.'} ${esc(segment.why)}</span>
      </div>`;
    }).join('');
    return `<section class="an-review">
      ${core.pageTitle('Corrigé', content.title, 'Un vendeur ouvre l’entretien de façon maladroite. Vous deviez repérer ses maladresses, puis réécrire son ouverture.')}
      <section class="panel">${core.panelTitle('Les maladresses du texte')}
        <div class="answer-key">${flaws}</div>
        ${ex.inlineNote(content.missing, 'neutral')}
      </section>
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre ouverture réécrite', bloc, text: ex.value('rewrite'), model: content.feedback })
      ])}
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const at = stage();
    const flags = marked();
    const count = markedCount();

    const steps = `<div class="stepper">
      <div class="stepper-item ${at === 1 ? 'active' : 'done'}"><span class="stepper-dot">1</span><span class="stepper-label">REPÉRER</span></div>
      <div class="stepper-item ${at === 2 ? 'active' : ''}"><span class="stepper-dot">2</span><span class="stepper-label">RÉÉCRIRE</span></div>
    </div>`;

    const repair = `<p class="muted" style="text-align:center">Cliquez sur les passages qui vous semblent maladroits.</p>
      <div class="highlight-text">
        <span class="quote-mark">${icon('quote', { size: 22 })}</span>
        ${segments.map((segment, i) =>
          `<button type="button" class="segment ${flags[i] ? 'marked' : ''}" data-segment="${i}" aria-pressed="${flags[i]}">${esc(segment.text)}</button>`
        ).join('')}
      </div>
      <div class="highlighter-status">
        <span class="highlighter-symbol">${icon('highlighter', { size: 22 })}</span>
        <span><strong>Surligneur actif</strong><small>Cliquez à nouveau pour retirer une sélection.</small></span>
      </div>`;

    const rewrite = `${ex.field('rewrite', 'Votre ouverture réécrite', {
           placeholder: 'Bonjour, merci de me recevoir. Je suis…', max: 900, rows: 8
         })}
         <div class="advice">${icon('lightbulb', { size: 19 })}<span>Reprenez les quatre temps : accueil, présentation, cadrage de la durée, puis une question ouverte.</span></div>`;

    return `<div class="writing-workshop">
      ${core.pageTitle(content.eyebrow, content.title, content.intro)}
      <form class="panel" novalidate>
        <div class="panel-title">
          ${steps}
          <span class="muted">${count} / ${content.minimum} maladresses repérées</span>
          ${window.AtelierKit ? window.AtelierKit.tourButton() : ''}
        </div>
        ${at === 1 ? repair : rewrite}
        <div class="case-progress" style="margin-top:18px">
          ${core.button('Effacer ma sélection', 'clear-marks', 'secondary small', count ? '' : 'disabled')}
          ${ex.caseProgress(content.minimum, Math.min(count, content.minimum), 'maladresse')}
        </div>
        ${ex.lockNote('Corrigé disponible après votre tentative')}
        ${core.errorsBox()}
        ${ex.actions(at === 1 ? 'Passer à la réécriture' : 'Valider ma réécriture')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    const flags = Array.isArray(values.marked) ? values.marked.filter(Boolean) : [];
    if (flags.length < content.minimum) errors.push({ key: 'marked', message: `Repérez au moins ${content.minimum} maladresses (actuellement ${flags.length}).` });
    if (!String(values.rewrite ?? '').trim()) errors.push({ key: 'rewrite', message: 'Réécrivez une ouverture plus juste.' });
    return errors;
  }

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => [];

  function intercept() {
    if (stage() !== 1 || markedCount() < content.minimum) return false;
    setStage(2);
    return true;
  }

  function onMount() {
    core.$$('[data-segment]').forEach(node => {
      node.addEventListener('click', () => {
        const index = Number(node.dataset.segment);
        const flags = marked();
        flags[index] = !flags[index];
        ex.setValue('marked', flags);
        ex.changed();
        ex.rebuild();
      });
    });
    const clear = core.$('[data-action="clear-marks"]');
    if (clear) clear.addEventListener('click', () => {
      ex.setValue('marked', segments.map(() => false));
      ex.changed();
      ex.rebuild();
    });
  }

  // Visite guidée de l'écran, lancée d'elle-même la première fois. L'aperçu
  // montre, sur une phrase d'exemple, comment surligner.
  if (window.AtelierKit) window.AtelierKit.tour('s4-1.2', [
    { target: '.writing-workshop .stepper', title: 'Deux étapes',
      items: [
        { key: '1', tone: 'gold', text: `repérez au moins ${content.minimum} maladresses dans l’ouverture ;` },
        { key: '2', tone: 'blue', text: 'réécrivez une ouverture plus juste.' }
      ] },
    { target: '.highlight-text, .highlighter-status', title: 'Le surligneur', text: 'Un exemple, sur une autre phrase :',
      preview: window.AtelierKit.hlDemo({
        tools: [{ label: 'Surligneur', tone: 'gold' }],
        parts: [
          { text: 'Alors voilà,', tool: 0 },
          { text: 'je passais dans le coin' },
          { text: 'et je me suis dit', tool: 0 },
          { text: 'que vous auriez besoin de nous.' }
        ]
      }),
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur un passage maladroit pour le surligner.' },
        { symbol: 'refresh', tone: 'gold', text: 'Cliquez à nouveau pour retirer le surlignage.' }
      ] },
    { target: '.writing-workshop .case-progress', title: 'Votre avancement', text: 'Le compteur montre combien de maladresses vous avez repérées.',
      after: '« Effacer ma sélection » retire tous vos surlignages.' },
    { target: '.writing-workshop .form-actions button[type="submit"]', title: 'Passer à la réécriture', text: 'Une fois les maladresses repérées, vous réécrivez l’ouverture, puis vous découvrez le corrigé.' }
  ]);

  ex.mount('s4-1.2', { screen, validate, feedback, intercept, onMount, compactFeedback: true });
})();
