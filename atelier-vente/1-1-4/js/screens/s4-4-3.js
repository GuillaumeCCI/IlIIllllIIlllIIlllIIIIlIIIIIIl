/* S4 4.3 · Trouver l’élément de valeur
 *
 * À gauche, le contexte de la relance ; à droite, les trois éléments de
 * valeur en accordéon, un seul ouvert à la fois (un élément rédigé est
 * coché). L'élément ouvert montre sa consigne ; « Voir un indice » ouvre
 * des amorces de phrases et la règle d'or.
 * « Enregistrer » ouvre l'élément suivant encore vide ; les trois écrits,
 * l'exercice se valide. Textes : js/content-s4.js, entrée « 4.3 ».
 * Les champs gardent les clés de l'écran commun (c0_v1, c0_v2, c0_v3).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const ouvert = window.AtelierOuvert;
  const { esc, icon } = kit;
  const content = window.ATELIER_S4['4.3'];
  const kase = content.cases[0];
  const fields = kase.fields;
  const n = fields.length;
  const key = f => `c0_${f.id}`;
  const done = i => kit.filled(ex.value(key(fields[i])));
  const doneCount = () => fields.filter((_, i) => done(i)).length;
  const open = () => {
    const v = Number(ex.value('open'));
    if (Number.isInteger(v) && v >= 0 && v < n) return v;
    const first = fields.findIndex((_, i) => !done(i));
    return first === -1 ? 0 : first;
  };

  // L'offre envoyée, dessinée comme une proposition commerciale (elle dit la cliente et l'offre).
  const offer = () => `<figure class="vf-offer" aria-label="L’offre envoyée à Madame Riveau">
      <div class="vf-offer-top"><strong>Ergolys</strong><span>Proposition commerciale</span></div>
      <p class="vf-offer-to"><small>Pour</small>Madame Riveau, responsable des ressources humaines<br>Entreprise de 80 salariés</p>
      <ul class="vf-offer-lines">
        <li><span>10 postes de travail ergonomiques complets</span><b>17 000 €</b></li>
        <li><span>Installation sur place</span><b>incluse</b></li>
        <li><span>Garantie 5 ans</span><b>incluse</b></li>
      </ul>
      <p class="vf-offer-total"><span>Total</span><b>17 000 €</b></p>
      <p class="vf-offer-stamp">Envoyée il y a une semaine · pas de réponse</p>
    </figure>`;

  function contextPanel() {
    const c = content.context;
    const rest = c.rows.filter(r => !/cliente|offre/i.test(r.label));
    return `<aside class="k-panel vf-context">
      <h2>Contexte</h2>
      ${offer()}
      <ul class="vf-facts">${rest.map(r => `<li><span class="vf-fact-icon tone-${esc(r.tone)}">${icon(r.symbol, { size: 20 })}</span><span><small>${esc(r.label)}</small>${esc(r.text)}</span></li>`).join('')}</ul>
    </aside>`;
  }

  function item(f, i, at) {
    if (i !== at) {
      const text = ex.value(key(f));
      return `<li class="vf-item"><button type="button" class="vf-head" data-act="vf-open" data-index="${i}" aria-expanded="false">
        <span class="vf-n ${done(i) ? 'is-done' : ''}">${done(i) ? icon('check', { size: 16 }) : i + 1}</span><strong>${esc(f.label)}</strong>
        <span class="vf-preview">${esc(kit.filled(text) ? text : f.placeholder.replace('Rédigez votre ', '').replace(/^./, c => c.toUpperCase()))}</span>
        <span class="vf-chev">${icon('chevronRight', { size: 20 })}</span></button></li>`;
    }
    return `<li class="vf-item is-open">
      <div class="vf-head is-static"><span class="vf-n is-current">${i + 1}</span><div><strong>${esc(f.label)}</strong>
        <p class="vf-sub">${esc(content.subs[i])}</p></div></div>
      ${ex.field(key(f), f.label, { placeholder: f.placeholder, max: 500, rows: 3, hideLabel: true })}
    </li>`;
  }

  function reviewScreen() {
    return `${ouvert.head('s4-4.3')}<section class="k-panel vf-review">
      <h2>Vos trois idées</h2>
      <p class="k-muted">Comparez chacune de vos idées à une piste possible.</p>
      ${fields.map((f, i) => `<div class="vf-review-row"><p class="k-label">${esc(f.label)}</p>
        ${ouvert.answer('s4-4.3', i, { title: 'Votre idée', text: ex.value(key(f)), model: f.model })}</div>`).join('')}
      ${kase.lesson ? ex.inlineNote(kase.lesson, 'neutral') : ''}
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  const countLine = () => `<strong>${doneCount()} / ${n}</strong> ${esc(content.countLabel)}`;

  function screen() {
    const reviewing = ex.reviewing();
    const at = open();
    return `<div class="k-page vf-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? '' : kit.tourButton() })}
      ${reviewing ? reviewScreen() : `<div class="vf-layout">
        ${contextPanel()}
        <form class="k-panel vf-main" novalidate>
          <p class="k-ask">Qu’apportez-vous de nouveau ou d’utile à Madame Riveau ?</p>
          <ol class="vf-acc">${fields.map((f, i) => item(f, i, at)).join('')}</ol>
          ${core.errorsBox()}
          <div class="vf-actions">${kit.dialogButton('hint', 'Voir un indice', 'secondary', 'lightbulb')}${kit.submit(doneCount() >= n - 1 && !done(at) || doneCount() === n ? content.submitLabel : 'Enregistrer et passer au suivant')}</div>
        </form>
      </div>`}
      ${reviewing ? '' : kit.utility('Pistes possibles après les 3 idées')}
    </div>`;
  }

  function validate(values) {
    const missing = fields.findIndex(f => !kit.filled(values[key(f)]));
    return missing === -1 ? [] : [{ key: key(fields[missing]), message: `Rédigez l’${fields[missing].label.toLowerCase()}.` }];
  }

  // L'élément ouvert est rempli : on ouvre le suivant encore vide.
  function intercept(values) {
    const at = open();
    if (!kit.filled(values[key(fields[at])])) return false;
    for (let step = 1; step < n; step++) {
      const next = (at + step) % n;
      if (!kit.filled(values[key(fields[next])])) { ex.setValue('open', next); return true; }
    }
    return false;
  }

  const feedback = () => [content.feedback];

  kit.on({ 'vf-open': el => { ex.setValue('open', Number(el.dataset.index)); kit.commit(); } });
  kit.live(() => ({ 'vf-count': countLine() }));
  // L'indice : une amorce de phrase par piste, puis la règle d'or.
  kit.dialogs({ hint: { title: content.hint.title, html: `<ul class="vf-hints">${content.hint.items.map(h =>
      `<li><strong>${esc(h.label)}</strong><span>« ${esc(h.example)} »</span></li>`).join('')}</ul>
    <p class="vf-rule"><strong>Règle d’or :</strong> ${esc(content.hint.rule)}</p>` } });
  kit.tour('s4-4.3', content.tour);

  ex.mount('s4-4.3', { screen, validate, intercept, feedback, compactFeedback: true });
})();
