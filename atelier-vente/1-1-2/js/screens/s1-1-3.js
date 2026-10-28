/* S1 1.3 · La fabrique à arguments.
 *
 * À gauche, la fiche produit en cartes ; à droite, l'argument en cours.
 * Pour chacun des trois besoins du prospect, trois colonnes côte à côte :
 *   C · déposer les caractéristiques qui y répondent ;
 *   A · formuler l'avantage pour le client ;
 *   P · déposer la preuve qui rend la promesse crédible.
 * Les cartes se glissent dans la colonne C ou P, ou s'ajoutent d'un clic
 * dans la colonne active (celle qu'on a cliquée en dernier).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.3'];
  const cards = content.cards;
  const needs = content.needs;

  const need = () => Math.min(Math.max(0, Number(ex.value('need')) || 0), needs.length - 1);
  const picked = (n, slot) => {
    const stored = ex.value(`${slot}${n}`);
    return Array.isArray(stored) ? stored.filter(id => cards.some(card => card.id === id)) : [];
  };
  const advantage = n => ex.value(`a${n}`);
  const done = n => ex.value(`done${n}`) === true;
  const doneCount = () => needs.filter((_, n) => done(n)).length;
  const card = id => cards.find(c => c.id === id);
  /* La colonne qui reçoit les cartes cliquées : C par défaut. */
  const slot = () => (ex.value('slot') === 'p' ? 'p' : 'c');

  /* Teintes des pictogrammes de la fiche produit, en alternance. */
  const TONES = ['blue', 'coral', 'green'];

  function prospectBar() {
    return `<div class="fab-prospect">
      <span class="fab-prospect-title">${icon('users', { size: 22 })}<strong>Votre prospect</strong></span>
      ${content.prospect.map((text, i) => `<span class="fab-pill">${icon(i ? 'monitor' : 'building', { size: 18 })}<span>${esc(text)}</span></span>`).join('')}
      <span class="fab-divider" aria-hidden="true"></span>
      <strong class="fab-prospect-title">Ses priorités :</strong>
      ${needs.map((item, i) => `<span class="fab-pill fab-need tone-${i}"><span class="fab-need-n">${i + 1}</span><span>${esc(item.label)}</span></span>`).join('')}
    </div>`;
  }

  function cardGrid(n) {
    const used = [...picked(n, 'c'), ...picked(n, 'p')];
    return `<div class="fab-cards">${cards.map((c, i) => {
      const on = used.includes(c.id);
      // La carte et, à côté, son « i » : un bouton ne peut pas en contenir un autre.
      return `<div class="fab-card-wrap"><button type="button" class="fab-card ${on ? 'is-on' : ''}" draggable="true" data-drag="${c.id}" data-act="toggle-card" data-id="${c.id}" aria-pressed="${on}">
        <span class="fab-card-symbol tone-${TONES[i % TONES.length]}">${icon(c.symbol, { size: 22 })}</span>
        <span class="fab-card-text">${esc(c.text)}</span>
        <span class="fab-card-grip">${on ? icon('check', { size: 16 }) : icon('grip', { size: 18 })}</span>
      </button>${c.info ? `<button type="button" class="fab-card-info" data-act="card-info" data-id="${c.id}" aria-label="Que veut dire « ${esc(c.text)} » ?">${icon('info', { size: 18 })}</button>` : ''}</div>`;
    }).join('')}</div>`;
  }

  /* Une colonne C ou P : la zone de dépôt, active quand on la clique. */
  function dropColumn(n, key, letter, label) {
    const list = picked(n, key);
    const active = slot() === key;
    return `<div class="fab-col tone-${key}">
      <button type="button" class="fab-col-head ${active ? 'is-active' : ''}" data-act="slot" data-slot="${key}" aria-pressed="${active}">
        <span class="fab-col-letter">${letter}</span><span><strong>${esc(label)}</strong><small>${active ? 'Les cartes cliquées arrivent ici' : 'Cliquez ici pour y ajouter des cartes'}</small></span>
      </button>
      <div class="fab-drop ${list.length ? 'has-cards' : ''} ${active ? 'is-active' : ''}" data-drop="${key}">
        ${list.length ? list.map(id => `<span class="fab-chip">${icon(card(id).symbol, { size: 16 })}<span>${esc(card(id).text)}</span>
          <button type="button" class="fab-chip-remove" data-act="remove-card" data-id="${id}" data-slot="${key}" aria-label="Retirer ${esc(card(id).text)}">${icon('close', { size: 13 })}</button></span>`).join('')
          : `<span class="fab-drop-empty">${icon('stack', { size: 28 })}<span>Déposez une ou plusieurs cartes ici</span></span>`}
      </div>
    </div>`;
  }

  let shownNeed = null;

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const n = need();
    const last = needs.every((_, i) => i === n || done(i));
    // Le besoin qui vient d'arriver glisse en place (pas à chaque redessin).
    const entering = shownNeed !== null && shownNeed !== n ? (n > shownNeed ? 'is-next' : 'is-prev') : '';
    shownNeed = n;
    return `<div class="k-page fab-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title,
        subtitle: 'À partir du profil du prospect et de la fiche produit, sélectionnez les informations pertinentes et construisez 3 arguments sur mesure.',
        aside: `<p class="k-count"><strong>${doneCount()} / ${needs.length}</strong> arguments validés</p>${kit.tourButton()}` })}
      ${prospectBar()}
      <div class="k-columns fab-layout">
        <section class="k-panel">
          <div class="k-panel-title"><span class="k-badge">${icon('document', { size: 24 })}</span><div><h2>Sélectionnez les informations utiles</h2><p class="k-muted">Choisissez les cartes qui vous seront utiles pour construire vos 3 arguments.</p></div></div>
          ${cardGrid(n)}
          ${kit.tip(content.hint)}
        </section>
        <form class="k-panel" novalidate>
          <div class="fab-build-head fab-current fab-step ${entering}">
            <span class="fab-need-big">${n + 1}</span>
            <div><p class="k-label">Votre argument en cours</p><h2>${esc(needs[n].label)}</h2><p class="k-muted">Construisez votre argument en sélectionnant des informations à gauche.</p></div>
            <div class="fab-build-count"><span>Argument ${n + 1} sur ${needs.length}</span>
              <span class="k-dots">${needs.map((item, i) => `<button type="button" class="k-dot ${i === n ? 'is-current' : done(i) ? 'is-done' : ''}" data-act="need" data-index="${i}" aria-label="Besoin ${i + 1} : ${esc(item.label)}"></button>`).join('')}</span>
            </div>
          </div>
          <div class="fab-cols fab-step ${entering}">
            ${dropColumn(n, 'c', 'C', 'Caractéristique')}
            <div class="fab-col tone-a">
              <div class="fab-col-head"><span class="fab-col-letter">A</span><span><strong>Avantage</strong><small>Ce que le client y gagne</small></span></div>
              ${ex.field(`a${n}`, 'Avantage pour le client', { placeholder: 'Vous… (ce que le client y gagne)', max: 240, rows: 7, hideLabel: true })}
            </div>
            ${dropColumn(n, 'p', 'P', 'Preuve')}
          </div>
          ${core.errorsBox()}
          ${kit.bar({
            left: kit.reset(),
            right: `${kit.dialogButton('hint')}${kit.submit(last ? 'Valider mes arguments' : 'Continuer')}`
          })}
        </form>
      </div>
    </div>`;
  }

  function cardVerdict(id, n, kind) {
    const c = card(id);
    const ok = c.kind === kind && c.needs.includes(n);
    const reason = ok ? '' : c.kind && c.kind !== kind ? (c.kind === 'P' ? 'c’est une preuve' : 'c’est une caractéristique')
      : c.note || (!c.kind ? 'hors sujet' : 'répond à un autre besoin');
    return `<li class="${ok ? 'is-ok' : 'is-ko'}">${kit.mark(ok, c.text)}${reason ? `<small>${esc(reason)}</small>` : ''}</li>`;
  }

  function reviewScreen() {
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Vos trois arguments', subtitle: 'Chaque carte est vérifiée au regard du besoin, puis comparée au corrigé modèle.' })}
      <div class="fab-review">${needs.map((item, n) => {
        const expected = cards.filter(c => c.kind === 'C' && c.needs.includes(n) && !c.optional).map(c => c.text).join(', ');
        return `<section class="k-panel">
          <div class="fab-need-banner">${icon(item.symbol, { size: 30 })}<div><p class="k-label">Besoin ${n + 1}</p><h3>${esc(item.title)}</h3></div></div>
          <h4 class="k-small-title">Caractéristiques</h4>
          <ul class="fab-verdicts">${picked(n, 'c').map(id => cardVerdict(id, n, 'C')).join('')}</ul>
          <p class="k-muted">Attendues : ${esc(expected)}.</p>
          ${kit.yours('Votre avantage', advantage(n))}
          <h4 class="k-small-title">Preuves</h4>
          <ul class="fab-verdicts">${picked(n, 'p').map(id => cardVerdict(id, n, 'P')).join('')}</ul>
          <p class="k-muted">Attendues : ${esc(cards.filter(c => c.kind === 'P' && c.needs.includes(n) && !c.optional).map(c => c.text).join(', '))}.</p>
          ${kit.model('Argument possible', item.model)}
        </section>`;
      }).join('')}</div>
      ${content.takeaway ? ex.inlineNote(content.takeaway, 'neutral') : ''}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function argumentErrors(n) {
    const errors = [];
    if (!picked(n, 'c').length) errors.push({ key: 'c', message: 'Déposez au moins une caractéristique.' });
    if (!kit.filled(advantage(n))) errors.push({ key: `a${n}`, message: 'Formulez l’avantage pour le client.' });
    if (!picked(n, 'p').length) errors.push({ key: 'p', message: 'Déposez au moins une preuve.' });
    return errors;
  }

  function validate() {
    const n = need();
    const errors = argumentErrors(n);
    if (errors.length) return errors;
    const missing = needs.findIndex((_, i) => i !== n && !done(i));
    return missing === -1 ? [] : [{ key: 'need', message: `Construisez aussi l’argument du besoin ${missing + 1}.` }];
  }

  function intercept() {
    const n = need();
    if (argumentErrors(n).length) return false;
    ex.setValue(`done${n}`, true);
    const next = needs.findIndex((_, i) => !done(i));
    if (next === -1) return false;
    ex.setValue('need', next);
    ex.setValue('slot', 'c');
    return true;
  }

  function feedback() {
    let right = 0;
    let total = 0;
    needs.forEach((_, n) => {
      ['c', 'p'].forEach(slot => picked(n, slot).forEach(id => {
        total++;
        const c = card(id);
        if (c.kind === slot.toUpperCase() && c.needs.includes(n)) right++;
      }));
    });
    return [`${right} carte${right > 1 ? 's' : ''} pertinente${right > 1 ? 's' : ''} sur ${total} déposée${total > 1 ? 's' : ''}.`];
  }

  /* Ajoute la carte à la colonne visée, ou l'en retire. Une carte ne
   * figure que dans une colonne à la fois. */
  function toggle(id, target = slot(), force = false) {
    const n = need();
    const list = picked(n, target);
    const other = target === 'c' ? 'p' : 'c';
    const has = list.includes(id);
    if (has && !force) list.splice(list.indexOf(id), 1);
    else if (!has) list.push(id);
    ex.setValue(`${target}${n}`, list);
    ex.setValue(`${other}${n}`, picked(n, other).filter(x => x !== id));
    kit.commit();
  }

  kit.on({
    'toggle-card': el => {
      const n = need();
      const where = ['c', 'p'].find(key => picked(n, key).includes(el.dataset.id));
      toggle(el.dataset.id, where || slot());
    },
    'remove-card': el => toggle(el.dataset.id, el.dataset.slot),
    'card-info': el => { const c = card(el.dataset.id); core.openDialog(c.text, `<p>${esc(c.info)}</p>`); },
    slot: el => { ex.setValue('slot', el.dataset.slot); kit.commit(); },
    need: el => { ex.setValue('need', Number(el.dataset.index)); kit.commit(); }
  });
  kit.onDrop((id, zone) => { if (zone === 'c' || zone === 'p') { ex.setValue('slot', zone); toggle(id, zone, true); } });
  kit.dialogs({
    hint: {
      title: 'Un indice',
      html: `<p><strong>C ·</strong> une caractéristique décrit ce que fait le produit. Ne gardez que celles qui répondent à ce besoin précis : le poids de l’application ou la couleur du logo n’intéressent pas ce client.</p>
        <p><strong>A ·</strong> commencez par « Vous… » et décrivez ce que le client vivra : ce qu’il évite, ce qu’il gagne, ce qui devient plus simple.</p>
        <p><strong>P ·</strong> une preuve est un fait vérifiable : un chiffre, un audit, une garantie, un nombre de clients.</p>`
    }
  });

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s1-1.3', [
    { target: '.fab-prospect', title: 'Votre prospect', text: 'Voici le client : une entreprise de 12 salariés sans service informatique, et ses trois priorités. Vous construisez un argument pour chacune.' },
    { target: '.fab-cards', title: 'Les informations du produit', text: 'Ces cartes décrivent le produit.',
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Faites glisser une carte, ou cliquez dessus, pour l’ajouter à votre argument.' },
        { symbol: 'info', tone: 'blue', text: 'Un terme inconnu ? Le « i » de la carte l’explique.' },
        { symbol: 'lightbulb', tone: 'gold', text: 'Toutes ne sont pas utiles : ne gardez que celles qui répondent au besoin.' }
      ] },
    { target: '.fab-current', title: 'Un argument par priorité', text: 'Vous construisez trois arguments, un pour chaque priorité du client.',
      items: [
        { symbol: 'target', tone: 'blue', text: 'Le bandeau indique la priorité à traiter maintenant.' },
        { symbol: 'chart', tone: 'blue', text: 'Les trois points, en haut à droite, montrent votre avancement : cliquez sur un point pour passer à un autre argument.' }
      ] },
    { target: '.fab-cols', title: 'La méthode CAP', text: 'Votre argument se construit en trois colonnes :',
      items: [
        { key: 'C', tone: 'blue', text: 'les caractéristiques qui répondent au besoin ;' },
        { key: 'A', tone: 'coral', text: 'ce que le client y gagne, à écrire vous-même en commençant par « Vous… » ;' },
        { key: 'P', tone: 'green', text: 'la preuve qui rend la promesse crédible.' }
      ],
      after: 'Cliquez sur l’en-tête C ou P pour y envoyer les cartes.' },
    { target: '.k-bar .k-dialog-button', title: 'Un indice', text: 'Un doute ? Ce bouton rappelle ce qu’on attend dans chaque colonne.' },
    { target: '.k-bar .k-submit', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: 'Votre argument est enregistré et vous passez à la priorité suivante.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Après le troisième argument, vous validez et découvrez le corrigé.' }
      ] }
  ]);

  ex.mount('s1-1.3', { screen, validate, intercept, feedback, compactFeedback: true });
})();
