/* S5 5.1 · Trois commerciaux, une cliente pressée (fiche M1.2.1, A4).
 *
 * Quatre étapes : Thomas, Inès, Hugo (quatre critères notés 0, 1 ou 2),
 * puis le classement, la justification du premier choix et le critère
 * d'auto-évaluation de la fiche. Une étape s'ouvre quand la précédente
 * est notée. En relecture : les notes face au repère (un point d'écart
 * accepté), le classement, la justification et le corrigé de chacun.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const ouvert = window.AtelierOuvert;
  const { esc, icon } = kit;
  const content = window.ATELIER_S5['5.1'];
  const { sellers, criteria, levels } = content;
  const RANK = sellers.length;            // l'étape du classement
  const nC = criteria.length;
  const max = nC * 2;
  const SELF = [{ id: '2', label: 'Oui' }, { id: '1', label: 'En partie' }, { id: '0', label: 'Pas encore' }];

  /* LE CLASSEMENT AU CLIC : les trois commerciaux sur une ligne. Un clic
   * classe le commercial au rang suivant (il passe devant, numéroté) ; un
   * clic sur un commercial classé le retire, les suivants remontent. */
  const avatar = s => `<span class="a4-avatar" aria-hidden="true">${esc(s.name.charAt(0))}</span>`;
  const sellerOf = id => sellers.find(x => x.id === id);
  function podium() {
    const r = ranks().filter(Boolean);
    const placed = r.map((id, i) => {
      const s = sellerOf(id);
      return `<button type="button" class="a4-chip is-placed tone-${esc(s.id)}" data-act="a4-unplace" data-index="${i}" data-field="rank${i}" aria-label="${i + 1}. ${esc(s.name)}, cliquer pour retirer du classement">
        <span class="a4-chip-n">${i + 1}</span><strong>${esc(s.name)}</strong></button>`;
    });
    const rest = sellers.filter(s => !r.includes(s.id)).map(s => `<button type="button" class="a4-chip tone-${esc(s.id)}" data-act="a4-pick" data-id="${esc(s.id)}" ${r.length ? '' : `data-field="rank0"`}>
        ${avatar(s)}<strong>${esc(s.name)}</strong><span class="a4-chip-total">${total(s)} / ${max}</span></button>`);
    return `<div class="a4-chips">${[...placed, ...rest].join('')}</div>
      <p class="a4-chips-help">${r.length === sellers.length ? 'Cliquez sur un commercial pour le retirer du classement.' : 'Cliquez du plus adapté au moins adapté.'}</p>`;
  }



  const note = (s, i) => ex.value(`${s.id}${i}`);
  const rated = s => criteria.every((_, i) => note(s, i) !== '');
  const total = s => (rated(s) ? criteria.reduce((sum, _, i) => sum + Number(note(s, i)), 0) : null);
  const reference = s => s.notes.reduce((a, b) => a + b, 0);
  const nameOf = id => (sellers.find(s => s.id === id) || {}).name || '';
  const ranks = () => sellers.map((_, i) => ex.value(`rank${i}`));
  const reachable = k => sellers.slice(0, k).every(rated);
  const at = () => {
    const asked = Number(ex.value('at')) || 0;
    if (reachable(asked)) return Math.min(asked, RANK);
    const free = sellers.findIndex(s => !rated(s));
    return free === -1 ? RANK : free;
  };
  /* Le commercial qui vient d'arriver (-1 : aucun) : sa carte glisse en
   * place et s'annonce, le temps d'un rendu. */
  let arriving = -1;
  const go = k => { arriving = k < RANK && k !== at() ? k : -1; ex.setValue('at', k); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); };

  // Les indications entre crochets (« 3 minutes plus tard ») en italique.
  const said = text => esc(text).replace(/\[([^\]]+)\]/g, '<em class="a4-act">($1)</em>');

  const situation = () => `<p class="k-label">La situation</p>
      <p class="a4-role"><strong>${esc(content.client.name)}</strong> · ${esc(content.client.role)}</p>
      <p class="a4-signal">${icon('clock', { size: 18 })}<span>${esc(content.client.signal)}</span></p>`;
  const quoteCard = () => kit.clientCard(content.client.quote, content.client.portrait, `${content.client.name} dit au commercial`);
  const clientBlock = () => `<section class="k-panel a4-client">${situation()}${quoteCard()}</section>`;

  /* L'échange sur un même plan : la situation en bandeau, puis la réplique
   * de la cliente à gauche et la réponse du commercial à droite, alignées
   * en haut et de même hauteur. */
  const exchange = (s, k) => `<section class="k-panel a4-exchange">
      <div class="a4-exchange-head">${situation()}</div>
      <div class="a4-exchange-client">${quoteCard()}</div>
      <div class="a4-exchange-reply ${arriving === k ? 'is-arriving' : ''}" data-seller="${esc(s.id)}">
        <p class="a4-new tone-${esc(s.id)}" role="status">${arriving === k ? `${icon('sparkle', { size: 15 })}<span>Nouvelle réponse à noter · ${k + 1} sur ${RANK}</span>` : `<span>Réponse ${k + 1} sur ${RANK}</span>`}</p>
        ${sellerBlock(s, !TYPED.has(s.id))}
      </div>
    </section>`;

  /* La réponse du commercial, dans le même gabarit que la carte de la
   * cliente (moteur : .client-card), sans portrait : un médaillon à son
   * initiale, un libellé, sa réplique entre guillemets dessinés. */
  const mark = name => esc(core.asset(`assets/illustrations/clients/${name}.webp`));
  const sellerBlock = (s, typing = false) => `<div class="client-card-box a4-seller tone-${esc(s.id)}"><section class="client-card is-long no-portrait">
      <div class="client-card-said">
        <p class="client-card-label a4-seller-label"><span class="a4-avatar" aria-hidden="true">${esc(s.name.charAt(0))}</span><span>${esc(s.name)}, ${esc(s.role)}, lui répond</span></p>
        <div class="client-card-quote"><img class="client-card-mark" src="${mark('guillemet-ouvrant')}" alt="" aria-hidden="true"><blockquote ${typing ? 'data-tw class="is-typing"' : ''}>${said(s.text)}</blockquote><img class="client-card-mark is-closing" src="${mark('guillemet-fermant')}" alt="" aria-hidden="true"></div>
      </div>
    </section></div>`;

  /* La barre d'étapes : un segment par commercial, puis le classement. */
  function progress(k) {
    const labels = [...sellers.map(s => s.name), 'Classement'];
    return `<nav class="a4-steps" aria-label="Étapes">${labels.map((label, i) => {
      const done = i < RANK ? rated(sellers[i]) : false;
      return `<button type="button" class="a4-step ${i === k ? 'is-current' : ''} ${done ? 'is-done' : ''}" data-act="a4-go" data-index="${i}" ${reachable(i) ? '' : 'disabled'} ${i === k ? 'aria-current="step"' : ''}>
        <span class="a4-step-n">${done ? icon('check', { size: 15 }) : i + 1}</span><span>${esc(label)}</span></button>`;
    }).join('')}</nav>`;
  }

  function noteStep(k) {
    const s = sellers[k];
    return `${exchange(s, k)}
      <section class="k-panel a4-rate">
        <p class="k-label">Notez ${k ? 'maintenant ' : ''}${esc(s.name)}</p>
        ${kit.matrix({ key: s.id, rows: criteria, columns: levels, head: 'Critère', round: true })}
        <p class="a4-total" data-live="total">${totalLine(s)}</p>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: k ? kit.back('a4-prev', `Revenir à ${sellers[k - 1].name}`) : '',
        right: kit.submit(k < RANK - 1 ? `Noter ${sellers[k + 1].name}` : 'Classer les trois commerciaux') })}`;
  }
  const totalLine = s => `Total : <strong>${total(s) === null ? '–' : total(s)} / ${max}</strong>`;

  function rankStep() {
    /* Le rappel de l'échange : la réplique de la cliente, puis les trois
     * réponses côte à côte, chacune avec la note donnée, critère par critère. */
    return `<section class="k-panel a4-recap">
        <p class="k-label">Les trois réponses, avec vos notes</p>
        <p class="a4-recap-client"><strong>${esc(content.client.name)}</strong> « ${esc(content.client.quote)} »</p>
        <div class="a4-recap-grid">${sellers.map(s => `<article class="a4-recap-card tone-${esc(s.id)}">
          <header><span class="a4-avatar" aria-hidden="true">${esc(s.name.charAt(0))}</span><strong>${esc(s.name)}</strong>
            <span class="a4-recap-total"><b>${total(s)}</b> / ${max}</span></header>
          <p class="a4-recap-text">« ${said(s.text)} »</p>
          <ul class="a4-recap-notes">${criteria.map((c, i) => `<li><span>${esc(c.title)}</span><span class="a4-pips" role="img" aria-label="${esc(note(s, i))} sur 2">${[0, 1].map(p => `<i class="${p < Number(note(s, i)) ? 'is-on' : ''}"></i>`).join('')}</span></li>`).join('')}</ul>
        </article>`).join('')}</div>
      </section>
      <section class="k-panel a4-rank">
        <p class="k-label">Classez-les, du plus adapté au moins adapté</p>
        ${podium()}
        <div class="fm-field a4-justify"><p class="fm-label">${esc(content.justify.label)}</p><p class="fm-sub">${esc(content.justify.sub)}</p>
          ${ex.field('why', content.justify.label, { placeholder: content.justify.placeholder, max: 400, rows: 3, hideLabel: true })}</div>
        <p class="k-label a4-self-label">Auto-évaluation</p>
        ${kit.matrix({ key: 'self', rows: [content.selfCheck], columns: SELF, head: 'Critère', round: true, numbered: false })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('a4-prev', `Revenir à ${sellers[RANK - 1].name}`), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Relecture ──────────────────────────────────────────────────────── */

  const close = () => sellers.reduce((n, s) => n + criteria.filter((_, i) => Math.abs(Number(note(s, i)) - s.notes[i]) <= 1).length, 0);

  function reviewTable() {
    const cell = (s, i) => {
      const mine = Number(note(s, i));
      const gap = Math.abs(mine - s.notes[i]);
      return `<td><strong class="a4-mine">${mine}</strong>${kit.mark(gap <= 1, `repère ${s.notes[i]}${gap === 1 ? ' · un point d’écart' : ''}`)}</td>`;
    };
    return `<table class="a4-review">
      <thead><tr><th scope="col">Critère</th>${sellers.map(s => `<th scope="col">${esc(s.name)}</th>`).join('')}</tr></thead>
      <tbody>${criteria.map((c, i) => `<tr><th scope="row"><strong>${esc(c.title)}</strong><small>${esc(c.text)}</small></th>${sellers.map(s => cell(s, i)).join('')}</tr>`).join('')}
        <tr class="a4-review-total"><th scope="row"><strong>Total</strong></th>${sellers.map(s => `<td><strong class="a4-mine">${total(s)} / ${max}</strong><span class="a4-ref">repère ${reference(s)} / ${max}</span></td>`).join('')}</tr>
      </tbody>
    </table>`;
  }

  function review() {
    const chosen = ranks().map(nameOf).join(', puis ');
    const rankOk = ranks().every((id, i) => id === content.ranking[i]);
    const selfLabel = (SELF.find(o => o.id === ex.value('self0')) || {}).label || '';
    return `${clientBlock()}
      <section class="k-panel a4-result">
        ${kit.result(close(), sellers.length * nC, 'notes à un point près du repère, ou moins')}
        <p class="k-muted">${esc(content.tolerance)}</p>
        ${reviewTable()}
      </section>
      <section class="k-panel a4-result">
        ${kit.picked(rankOk, chosen, content.rankingText, 'Votre classement')}
        ${ouvert ? `${ouvert.head('s5-5.1')}${ouvert.answer('s5-5.1', 0, { title: 'Votre justification', text: ex.value('why'), model: content.models.why })}`
          : `${kit.yours('Votre justification', ex.value('why'))}${kit.model('Une justification possible', content.models.why)}`}
        <p class="a4-self-recap"><strong>${esc(content.selfCheck.title)}</strong> · votre réponse : ${esc(selfLabel)}</p>
      </section>
      <section class="k-panel a4-result">
        <p class="k-label">Le corrigé, commercial par commercial</p>
        ${sellers.map(s => `${sellerBlock(s)}${kit.explain(s.why, `${s.name} · ${reference(s)} / ${max}`)}`).join('')}
      </section>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const k = at();
    return `<div class="k-page a4-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : kit.tourButton() })}
      ${reviewing ? '' : progress(k)}
      <form novalidate class="a4-form">${reviewing ? review() : k < RANK ? noteStep(k) : rankStep()}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k < RANK) {
      const s = sellers[k];
      const missing = criteria.map((_, i) => i).filter(i => values[`${s.id}${i}`] === undefined || values[`${s.id}${i}`] === '');
      return missing.length ? [{ key: `${s.id}${missing[0]}`, message: `Notez ${s.name} sur les ${nC} critères (${missing.length} sans note).` }] : [];
    }
    const errors = [];
    const r = sellers.map((_, i) => values[`rank${i}`] || '');
    const empty = r.findIndex(v => !v);
    if (empty !== -1) errors.push({ key: `rank${empty}`, message: 'Placez les trois commerciaux dans le classement.' });
    else if (new Set(r).size < r.length) errors.push({ key: 'rank1', message: 'Chaque commercial n’apparaît qu’une fois dans le classement.' });
    if (!kit.filled(values.why)) errors.push({ key: 'why', message: 'Justifiez votre premier choix.' });
    if (!values.self0) errors.push({ key: 'self0', message: 'Répondez à l’auto-évaluation.' });
    return errors;
  }

  /* Un commercial noté : « valider » passe au suivant, puis au classement. */
  function intercept() {
    const k = at();
    if (k < RANK && rated(sellers[k])) { arriving = k + 1 < RANK ? k + 1 : -1; ex.setValue('at', k + 1); return true; }
    return false;
  }

  const feedback = () => ['Retenez le piège de Hugo : aller vite n’est pas écouter.'];

  kit.on({
    'a4-go': control => go(Number(control.dataset.index)),
    'a4-prev': () => go(Math.max(0, at() - 1)),
    'a4-pick': control => {
      const free = ranks().findIndex(v => !v);
      if (free === -1) return;
      ex.setValue(`rank${free}`, control.dataset.id);
      kit.commit();
    },
    'a4-unplace': control => {
      const left = ranks().filter(Boolean).filter((_, i) => i !== Number(control.dataset.index));
      sellers.forEach((_, i) => ex.setValue(`rank${i}`, left[i] || ''));
      kit.commit();
    }
  });

  kit.live(() => {
    const k = at();
    return k < RANK ? { total: totalLine(sellers[k]) } : {};
  });

  kit.tour('s5-5.1', [
    { target: '.a4-exchange-head, .a4-exchange-client', title: 'La cliente', text: 'Mme Royer est pressée : elle le dit, et elle le montre.' },
    { target: '.a4-seller', title: 'Le commercial', text: 'Lisez sa réponse en entier avant de noter.' },
    { target: '.a4-rate .k-matrix', title: 'La grille', text: 'Pour chaque critère, une note :',
      items: [
        { key: '0', tone: 'coral', text: 'absent ;' },
        { key: '1', tone: 'gold', text: 'partiel ;' },
        { key: '2', tone: 'green', text: 'maîtrisé.' }
      ] },
    { target: '.a4-steps', title: 'Les étapes', text: 'Trois commerciaux à noter, puis votre classement et votre justification.' }
  ]);

  /* LA MACHINE À ÉCRIRE : la réponse d'un commercial s'écrit sous les yeux
   * de l'apprenant, la première fois qu'elle s'affiche. Le texte à venir
   * reste en place, transparent : la carte garde sa taille, rien ne bouge.
   * On avance caractère par caractère dans les nœuds de texte, ce qui
   * préserve l'italique des indications (« 3 minutes plus tard »). Un clic
   * sur la carte affiche tout ; « réduire les animations » aussi. */
  const TYPED = new Set();
  const calm = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function typeReply() {
    const quote = document.querySelector('.a4-exchange-reply blockquote[data-tw]');
    if (!quote) return;
    const id = quote.closest('[data-seller]').dataset.seller;
    // Une fenêtre, la visite guidée ou l'apparition de l'écran : on attend.
    if (document.querySelector('dialog[open], .tour') || quote.closest('.is-revealing')) { setTimeout(typeReply, 250); return; }
    quote.removeAttribute('data-tw');
    TYPED.add(id);
    const chars = [];
    const walk = node => [...node.childNodes].forEach(child => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent) { const span = document.createElement('span'); span.className = 'a4-tw'; span.textContent = ch; frag.appendChild(span); chars.push(span); }
        child.replaceWith(frag);
      } else walk(child);
    });
    walk(quote);
    let n = 0;
    const finish = () => { n = chars.length; chars.forEach(c => c.classList.add('is-on')); quote.classList.remove('is-typing'); };
    if (calm()) { finish(); return; }
    quote.closest('.client-card').addEventListener('click', finish, { once: true });
    const tick = () => {
      if (!quote.isConnected || n >= chars.length) { quote.classList.remove('is-typing'); return; }
      chars.slice(n, n + 2).forEach(c => c.classList.add('is-on'));
      n += 2;
      // Une petite pause après une ponctuation forte, comme à l'oral.
      setTimeout(tick, /[.!?…]/.test(chars[n - 1]?.textContent || '') ? 260 : 24);
    };
    setTimeout(tick, arriving !== -1 ? 650 : 200);
  }

  // L'annonce ne vaut que pour le rendu qui suit le changement de commercial.
  const onMount = () => { typeReply(); if (arriving !== -1) setTimeout(() => { arriving = -1; }, 0); };

  ex.mount('s5-5.1', { screen, validate, feedback, intercept, onMount, compactFeedback: true });
})();
