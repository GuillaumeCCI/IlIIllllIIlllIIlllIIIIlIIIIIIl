/* S4 2.2 · Réparez la conversation.
 *
 * Trois situations, traitées une par une depuis le menu des cas :
 * remplacer la réponse réflexe par une reformulation de compréhension,
 * puis lire aussitôt la formulation attendue.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S4['2.2'];
  const situations = content.situations;

  const repairKey = i => `repair${i}`;
  const doneKey = i => `done${i}`;

  const caseDone = i => ex.value(doneKey(i)) === true;

  const cases = () => situations.map((situation, i) => ({
    label: `Situation ${i + 1}`,
    hint: situation.client,
    done: caseDone(i)
  }));

  function screen() {
    const i = ex.openCase() ?? 0;
    const situation = situations[i];
    const reviewed = caseDone(i);

    const answer = reviewed
      ? `<div class="own-answer">
           <h4>Votre réponse de compréhension</h4>
           <p>« ${esc(ex.value(repairKey(i)))} »</p>
           ${ex.inlineNote(`Reformulation attendue, à titre d’exemple : « ${situation.model} »`, 'good')}
         </div>`
      : ex.field(repairKey(i), 'Votre reformulation de compréhension', {
          placeholder: 'Écrivez votre reformulation…', max: 240, rows: 4, hideLabel: true
        });

    /* Les deux répliques se font face, chacune dans sa carte : ce que dit
     * le client à gauche, le réflexe à remplacer à droite. L'écart entre
     * les deux est ce que l'exercice demande de combler. */
    return `<div class="repair">
      <header class="repair-head">
        <div>
          ${core.button(`${icon('arrowLeft', { size: 16 })}<span>Toutes les situations</span>`, 'back-to-menu', 'text-button with-icon')}
          <p class="eyebrow">${esc(content.eyebrow)}</p>
          <h1>${esc(content.title)}</h1>
          <p class="subtitle">${esc(content.intro)}</p>
        </div>
        <div class="rc-head-side">
          <p class="repair-count">Situation <strong>${i + 1}</strong> / ${situations.length}</p>
          ${window.AtelierKit && !reviewed ? window.AtelierKit.tourButton() : ''}
        </div>
      </header>

      <div class="rc-exchange">
        <div class="rc-card is-client">
          <span class="rc-avatar" aria-hidden="true">CL</span>
          <p><span class="rc-who">Le client</span>${esc(situation.client)}</p>
        </div>
        <span class="rc-link" aria-hidden="true">${icon('arrowRight', { size: 26 })}</span>
        <div class="rc-card is-reflex">
          <span class="rc-avatar" aria-hidden="true">VO</span>
          <p><span class="rc-who">Réflexe à remplacer</span>${esc(situation.reflex)}</p>
        </div>
      </div>

      <form class="panel repair-sheet" novalidate>
        <div class="rc-sheet-head">
          <span class="rc-pencil" aria-hidden="true">${icon('pencil', { size: 22 })}</span>
          <div><h2>Votre reformulation de compréhension</h2>
          <p>Reformulez ce que le client exprime, sans défendre l’offre immédiatement.</p></div>
        </div>
        ${answer}
        ${reviewed ? '' : ex.lockNote('Un exemple de reformulation apparaîtra après validation.')}
        ${core.errorsBox()}
        ${ex.caseActions(cases(), i, 'Valider ma réponse')}
      </form>
    </div>`;
  }

  function validate(values) {
    const i = ex.openCase() ?? 0;
    return String(values[repairKey(i)] ?? '').trim()
      ? []
      : [{ key: repairKey(i), message: 'Proposez une reformulation de compréhension.' }];
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => situations.every((_, i) => caseDone(i));

  const feedback = () => allDone() ? [content.valued] : '';

  /* Visite guidée, lancée d'elle-même la première fois sur le menu des
   * échanges : elle montre en aperçu l'écran qui suit. Rejouée depuis un
   * échange, elle présente ses zones (les zones absentes sont sautées). */
  const first = situations[0];
  const preview = `<div class="rc-mini">
      <div class="rc-mini-row">
        <span class="rc-mini-card is-client"><b>Le client</b>${esc(first.client)}</span>
        <span class="rc-mini-link">${icon('arrowRight', { size: 14 })}</span>
        <span class="rc-mini-card is-reflex"><b>Réflexe à remplacer</b>${esc(first.reflex)}</span>
      </div>
      <span class="rc-mini-field">Écrivez votre reformulation…</span>
    </div>`;
  if (window.AtelierKit) window.AtelierKit.tour('s4-2.2', [
    { target: '.case-rows', title: 'Trois échanges à réparer', text: 'Dans chacun de ces échanges, le vendeur a répondu trop vite au client.',
      items: [
        { symbol: 'quote', tone: 'blue', text: 'Chaque ligne rappelle la phrase du client.' },
        { symbol: 'pointer', tone: 'blue', text: '« Réparer cet échange » ouvre l’échange.' }
      ] },
    { target: '.case-rows .case-row:first-child', title: 'Ce qui vous attend', text: 'Voici, en aperçu, l’écran d’un échange :', preview,
      items: [
        { key: '1', tone: 'blue', text: 'à gauche, ce que dit le client ;' },
        { key: '2', tone: 'coral', text: 'à droite, la réponse réflexe du vendeur, à remplacer ;' },
        { key: '3', tone: 'green', text: 'en dessous, vous écrivez votre reformulation, sans défendre l’offre.' }
      ],
      after: 'Après validation, un exemple de reformulation s’affiche.' },
    { target: '.case-menu-count', title: 'Votre avancement', text: 'Ce compteur indique combien d’échanges vous avez réparés. Traitez les 3 pour terminer l’exercice.' },
    { target: '.rc-card.is-client', title: 'Le client', text: 'Voici ce que le client dit au vendeur.' },
    { target: '.rc-card.is-reflex', title: 'Le réflexe à remplacer', text: 'Le vendeur a défendu son offre tout de suite. C’est cette réponse que vous remplacez.' },
    { target: '.repair-sheet .rc-sheet-head, .repair-sheet .field', title: 'Votre reformulation', text: 'Redites avec vos mots ce que le client exprime, pour montrer que vous l’avez compris.' },
    { target: '.repair .form-actions button[type="submit"]', title: 'Valider', text: 'Validez : un exemple de reformulation s’affiche, puis vous revenez aux autres échanges.' }
  ]);

  ex.mount('s4-2.2', {
    screen, validate, feedback, afterSubmit, allDone, cases,
    menuIntro: 'Choisissez un échange à reprendre.', menuLayout: 'rows'
  });
})();
