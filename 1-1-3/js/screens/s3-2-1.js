/* S3 2.1 · À chaque objection, sa nature.
 *
 * Six réactions, une à la fois, à ranger dans l'un des quatre dossiers.
 * On choisit un dossier, puis « Classer et passer à la suivante » ; glisser
 * la carte sur un dossier la classe directement. Une fois tout rangé, un
 * récapitulatif permet de relire avant de valider.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['2.1'];
  const cards = content.reactions;
  const zones = window.ATELIER_NATURES.map(n => ({ id: n.id, label: n.label, text: n.text, tone: 'neutral' }));
  const total = cards.length;
  const letters = 'abcdef';

  const pick = () => (zones.some(z => z.id === ex.value('pick')) ? ex.value('pick') : '');

  function classify(zone) {
    kit.deckPlace(total, zone);
    ex.setValue('pick', '');
  }

  function sortScreen(index) {
    const done = kit.deckPlaced(total).filter(Boolean).length;
    return `<div class="nat-stack">
      <article class="nat-card" draggable="true" data-drag="${index}" tabindex="0" aria-label="Réaction ${index + 1} : ${esc(cards[index].text)}">
        <p class="nat-position">Réaction ${index + 1} / ${total}</p>
        <div class="nat-card-body"><span class="nat-letter">${letters[index]}</span><p class="nat-text">« ${esc(cards[index].text)} »</p></div>
      </article>
    </div>
    <p class="nat-instruction">${esc(content.instruction)}</p>
    <div class="nat-zones" role="radiogroup" aria-label="Les quatre natures">${zones.map(z => `
      <button type="button" class="nat-zone ${pick() === z.id ? 'is-chosen' : ''}" role="radio" aria-checked="${pick() === z.id}" data-drop="${z.id}" data-act="pick" data-zone="${z.id}">
        <span class="nat-folder">${icon(pick() === z.id ? 'check' : 'folder', { size: 30 })}</span>
        <span><strong>${esc(z.label)}</strong><small>${esc(z.text)}</small></span>
      </button>`).join('')}</div>
    ${kit.bar({
      left: kit.dialogButton('all', 'Voir les 6 réactions', 'text-button', 'list'),
      center: `${done + 1} / ${total} en cours`,
      right: `${kit.act('deck-undo', `${icon('undo', { size: 17 })}<span>Annuler</span>`, 'secondary', Array.isArray(ex.value('history')) && ex.value('history').length ? '' : 'disabled')}${kit.act('classify', `<span>Classer et passer à la suivante</span>${icon('arrowRight', { size: 18 })}`, 'primary', pick() ? '' : 'disabled')}`
    })}`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const index = kit.deckCurrent(total);
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    const body = reviewing
      ? `${kit.result(right, total, 'réactions bien classées')}${kit.deckReview(cards, zones)}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
      : index === null
        ? `<h2>Relisez votre classement</h2><p class="k-muted">Cliquez sur une ligne pour la modifier, puis validez.</p>${kit.deckRecap(cards, zones, 'Valider mon classement')}`
        : sortScreen(index);
    return `<div class="k-page nat-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong>${placed.filter(Boolean).length} / ${total}</strong> classées</p>${reviewing ? '' : kit.deckDots(total, index)}` })}
      <form class="nat-form" novalidate>${body}${reviewing ? '' : core.errorsBox()}</form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après les 6 réactions')}
    </div>`;
  }

  function validate() {
    const left = kit.deckPlaced(total).filter(zone => zone === null).length;
    return left ? [{ key: 'placed', message: `Il reste ${kit.plural(left, 'réaction')} à classer.` }] : [];
  }

  function feedback() {
    const placed = kit.deckPlaced(total);
    const right = cards.filter((card, i) => placed[i] === card.answer).length;
    return [`${right} réaction${right > 1 ? 's' : ''} sur ${total} correctement classée${right > 1 ? 's' : ''}.`];
  }

  kit.on({
    pick: el => { ex.setValue('pick', el.dataset.zone); kit.commit(); },
    classify: () => { if (pick()) { classify(pick()); kit.commit(); } },
    'deck-undo': () => { kit.deckUndo(total); ex.setValue('pick', ''); kit.commit(); },
    'deck-reopen': el => { kit.deckReopen(total, Number(el.dataset.index)); kit.commit(); }
  });
  kit.onDrop((id, zone) => { classify(zone); kit.commit(); });
  kit.dialogs({
    all: () => {
      const placed = kit.deckPlaced(total);
      const label = id => (zones.find(z => z.id === id) || {}).label;
      return { title: 'Les 6 réactions', html: `<ol class="dialog-list">${cards.map((c, i) => `<li>« ${esc(c.text)} »${placed[i] ? ` <em>· ${esc(label(placed[i]))}</em>` : ''}</li>`).join('')}</ol>` };
    }
  });

  ex.mount('s3-2.1', { screen, validate, feedback, compactFeedback: true });
})();
