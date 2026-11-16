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

  /* LE CLASSEMENT : la liste arrive déjà rangée d'après les notes de
   * l'apprenant (à égalité, dans l'ordre de passage). Tant qu'il n'y touche
   * pas, elle suit ses notes ; les flèches ↑ ↓ changent l'ordre, et il est
   * alors gardé tel quel (`rankTouched`). */
  const avatar = s => `<span class="a4-avatar" aria-hidden="true">${esc(s.name.charAt(0))}</span>`;
  const sellerOf = id => sellers.find(x => x.id === id);
  // L'info-bulle d'une ligne du rappel : la note en clair, puis le critère.
  const tipOf = (x, c, i) => {
    const level = levels.find(l => l.id === String(note(x, i)));
    return `${c.title} · ${note(x, i)} / 2, ${level ? level.sub.toLowerCase() : ''}. ${c.text}`;
  };
  function autoRank() {
    if (ex.value('rankTouched') === true && ranks().every(Boolean)) return;
    const order = sellers.map((x, i) => ({ id: x.id, t: total(x) ?? 0, i })).sort((p, q) => q.t - p.t || p.i - q.i);
    order.forEach((o, i) => ex.setValue(`rank${i}`, o.id));
  }
  function podium() {
    autoRank();
    const r = ranks();
    const rows = r.map((id, i) => {
      const x = sellerOf(id);
      return `<li class="a4-order-row tone-${esc(x.id)}" data-field="rank${i}" data-id="${esc(x.id)}">
        <span class="a4-order-n">${i + 1}</span>${avatar(x)}<strong>${esc(x.name)}</strong><span class="a4-order-total">${total(x)} / ${max}</span>
        <span class="a4-order-moves">
          <button type="button" class="a4-move is-up" data-act="a4-move" data-index="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Monter ${esc(x.name)}">${kit.icon('arrowDown', { size: 16 })}</button>
          <button type="button" class="a4-move" data-act="a4-move" data-index="${i}" data-dir="1" ${i === r.length - 1 ? 'disabled' : ''} aria-label="Descendre ${esc(x.name)}">${kit.icon('arrowDown', { size: 16 })}</button>
        </span></li>`;
    }).join('');
    // Deux commerciaux voisins à égalité : c'est à l'apprenant de trancher.
    const tie = r.find((id, i) => i && total(sellerOf(id)) === total(sellerOf(r[i - 1])));
    const tieText = tie ? ` ${esc(sellerOf(r[r.indexOf(tie) - 1]).name)} et ${esc(sellerOf(tie).name)} sont à égalité : à vous de les départager.` : '';
    return `<p class="a4-order-help">Votre classement, d’après vos notes. Modifiez l’ordre si besoin.${tieText}</p>
      <ol class="a4-order">${rows}</ol>`;
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

  const STEP_LABELS = [...sellers.map(s => `Noter ${s.name}`), 'Classement'];
  const stepIsDone = i => (i < RANK ? rated(sellers[i]) : false);
  const stepReachable = i => reachable(i);
  /* La barre d'étapes des autres exercices (moteur : .k-progress-*), dans
   * l'en-tête : flèche, « Étapes 2 / 5 », un segment par étape (plein :
   * faite ; cerclé : en cours), flèche. */
  function progress(k) {
      const go = (i, dir) => {
      const ok = i >= 0 && i < STEP_LABELS.length && stepReachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="a4-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}${ok ? ` : ${esc(STEP_LABELS[i])}` : ''}" title="${ok ? esc(STEP_LABELS[i]) : ''}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEP_LABELS.map((label, i) => `<button type="button" class="k-progress-seg ${stepIsDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="a4-go" data-index="${i}" ${stepReachable(i) ? '' : 'disabled'} ${i === k ? 'aria-current="step"' : ''} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${go(k - 1, 'prev')}<span class="k-progress-label">${esc(STEP_LABELS[k] || 'Étapes')}</span><strong>${Math.min(k + 1, STEP_LABELS.length)} / ${STEP_LABELS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${go(k + 1, 'next')}</p>`;
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
          <ul class="a4-recap-notes">${criteria.map((c, i) => `<li tabindex="0" data-tip="${esc(tipOf(s, c, i))}"><span>${esc(c.title)}</span><span class="a4-pips" role="img" aria-label="${esc(note(s, i))} sur 2">${[0, 1].map(p => `<i class="${p < Number(note(s, i)) ? 'is-on' : ''}"></i>`).join('')}</span></li>`).join('')}</ul>
        </article>`).join('')}</div>
      </section>
      <section class="k-panel a4-rank">
        <p class="k-label">Classez-les, du plus adapté au moins adapté</p>
        ${podium()}
        <div class="fm-field a4-justify"><p class="fm-label">${esc(content.justify.label)}</p><p class="fm-sub">${esc(content.justify.sub)}</p>
          ${ex.field('why', content.justify.label, { placeholder: content.justify.placeholder, max: 400, rows: 3, hideLabel: true })}</div>
        <div class="a4-self">
          <p class="a4-self-q"><span class="k-label">Auto-évaluation</span><span>${esc(content.selfCheck.text)}</span></p>
          <div class="a4-self-pills" role="radiogroup" aria-label="${esc(content.selfCheck.title)}">${SELF.map(o => `<button type="button" class="a4-self-pill ${ex.value('self0') === o.id ? 'is-on' : ''}" role="radio" aria-checked="${ex.value('self0') === o.id}" data-act="a4-self" data-id="${o.id}" ${o.id === SELF[0].id ? 'data-field="self0"' : ''}>${esc(o.label)}</button>`).join('')}</div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('a4-prev', `Revenir à ${sellers[RANK - 1].name}`), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Relecture ──────────────────────────────────────────────────────── */

  const close = () => sellers.reduce((n, s) => n + criteria.filter((_, i) => Math.abs(Number(note(s, i)) - s.notes[i]) <= 1).length, 0);

  /* Le corrigé, en trois cartes : pour chaque commercial, vos notes et
   * celles du corrigé, critère par critère (un écart d'un point est
   * accepté), puis l'explication de la fiche. */
  const pips = (n, label) => `<span class="a4-pips" role="img" aria-label="${esc(label)}">${[0, 1].map(p => `<i class="${p < n ? 'is-on' : ''}"></i>`).join('')}</span>`;
  /* Chaque ligne : votre note et la note attendue, côte à côte, puis une
   * marque : ✓ même note, ±1 un point d'écart (accepté), ✗ deux points. */
  const VERDICT = gap => (gap === 0 ? { cls: 'is-same', icon: 'check', text: 'même note' }
    : gap === 1 ? { cls: 'is-near', icon: 'check', text: 'un point d’écart, accepté' }
    : { cls: 'is-far', icon: 'close', text: 'deux points d’écart' });
  const verdictMark = v => `<span class="a4-verdict ${v.cls}" aria-hidden="true">${kit.icon(v.icon, { size: 13, strokeWidth: 3 })}</span>`;
  function reviewCards() {
    return `<div class="a4-recap-grid a4-review-grid">${sellers.map(x => `<article class="a4-recap-card tone-${esc(x.id)}">
      <header>${avatar(x)}<strong>${esc(x.name)}</strong>
        <span class="a4-review-totals"><span>Vous <b>${total(x)}</b></span><span>Attendu <b class="is-ref">${reference(x)}</b></span><small>sur ${max}</small></span></header>
      <ul class="a4-review-rows">
        <li class="a4-review-cols" aria-hidden="true"><span></span><span>Vous</span><span>Attendu</span><span></span></li>
        ${criteria.map((c, i) => {
          const mine = Number(note(x, i));
          const ref = x.notes[i];
          const v = VERDICT(Math.abs(mine - ref));
          const tip = `Votre note : ${mine} · attendu : ${ref} (${v.text}). ${c.text}`;
          return `<li class="${v.cls}" tabindex="0" data-tip="${esc(tip)}"><span class="a4-review-crit">${esc(c.title)}</span><span class="a4-n is-mine" aria-label="Votre note : ${mine} sur 2">${mine}</span><span class="a4-n" aria-label="Note attendue : ${ref} sur 2">${ref}</span>${verdictMark(v)}</li>`;
        }).join('')}
      </ul>
      <p class="a4-review-why">${esc(x.why)}</p>
    </article>`).join('')}</div>`;
  }

  /* La justification : la réponse (mots repérés surlignés) et son score,
   * puis ce qu'on attendait, en pastilles (le conseil en info-bulle). */
  const MARK = { ok: '✓', part: '◐', miss: '○', warn: '!' };
  function justification() {
    const text = ex.value('why');
    const scored = ouvert && ouvert.result('s5-5.1');
    const bloc = ouvert && ouvert.blocOf('s5-5.1', 0);
    const wanted = bloc ? bloc.lines.filter(l => l.kind !== 'warn') : [];
    const found = wanted.filter(l => l.kind === 'ok').length;
    const chips = bloc ? `<p class="a4-expect-title">Ce qu’une bonne justification contient <span>· ${found} sur ${wanted.length} dans la vôtre</span></p>
      <p class="a4-expect-help"><b>✓</b> présent dans votre réponse · <b>○</b> manquant, survolez-le pour un conseil</p><ul class="a4-expect">${bloc.lines.map(item => {
      const tip = item.kind === 'warn' ? `Repéré : ${(item.found || []).map(w => `« ${w} »`).join(', ')}. ${item.conseil || ''}` : item.kind === 'ok' ? '' : (item.conseil || '');
      return `<li class="is-${item.kind}" ${tip ? `tabindex="0" data-tip="${esc(tip)}"` : ''}><span aria-hidden="true">${MARK[item.kind] || ''}</span>${esc(item.nom)}</li>`;
    }).join('')}</ul>` : '';
    return `<div class="a4-just">
        <p class="a4-just-title"><span>Votre justification</span>${scored ? `<span class="a4-just-score"><b>${String(scored.points).replace('.', ',')}</b> / ${scored.total}</span>` : ''}</p>
        ${ouvert ? ouvert.quote('s5-5.1', 0, text) : `<p>« ${esc(text)} »</p>`}
        ${kit.filled(text) ? chips : ''}
        ${ouvert ? ouvert.model(content.models.why) : kit.model('Une réponse possible', content.models.why)}
      </div>`;
  }

  /* Le classement en deux tuiles, chaque commercial avec sa place :
   * « 1er Hugo · 2e Thomas · 3e Inès ». */
  const PLACE_SHORT = ['1er', '2e', '3e'];
  const placed = ids => ids.map((id, i) => `${PLACE_SHORT[i]} ${nameOf(id)}`).join(' · ');
  const rankReview = () => kit.picked(ranks().every((id, i) => id === content.ranking[i]), placed(ranks()), placed(content.ranking), 'Votre classement, du plus adapté au moins adapté');

  function review() {
    return `${clientBlock()}
      <section class="k-panel a4-result">
        <div class="a4-review-head"><p class="a4-review-title"><span class="k-label">Vos notes et les notes attendues</span><span class="a4-review-count"><b>${close()}</b> / ${sellers.length * nC} notes justes, à un point près</span></p><p class="a4-review-legend">${[0, 1, 2].map(g => { const v = VERDICT(g); return `<span>${verdictMark(v)}${v.text.charAt(0).toUpperCase() + v.text.slice(1).replace(', accepté', ' : accepté')}</span>`; }).join('')}</p></div>
        ${reviewCards()}
      </section>
      <section class="k-panel a4-result">
        ${rankReview()}
        ${justification()}
      </section>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const k = at();
    return `<div class="k-page a4-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
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
    'a4-self': control => {
      ex.setValue('self0', control.dataset.id);
      ex.changed();
      document.querySelectorAll('.a4-self-pill').forEach(pill => {
        const on = pill.dataset.id === control.dataset.id;
        pill.classList.toggle('is-on', on);
        pill.setAttribute('aria-checked', String(on));
      });
    },
    'a4-move': control => {
      const r = ranks();
      const i = Number(control.dataset.index);
      const j = i + Number(control.dataset.dir);
      if (j < 0 || j >= r.length) return;
      [r[i], r[j]] = [r[j], r[i]];
      // L'animation (FLIP) : la place de chaque ligne avant le changement…
      const before = new Map([...document.querySelectorAll('.a4-order-row')].map(row => [row.dataset.id, row.getBoundingClientRect().top]));
      const moved = r[i];
      r.forEach((id, k) => ex.setValue(`rank${k}`, id));
      ex.setValue('rankTouched', true);
      kit.commit();
      // … puis chaque ligne repart de là et glisse jusqu'à sa nouvelle place.
      document.querySelectorAll('.a4-order-row').forEach(row => {
        const dy = (before.get(row.dataset.id) ?? row.getBoundingClientRect().top) - row.getBoundingClientRect().top;
        if (row.dataset.id === moved) row.classList.add('is-moved');
        if (!dy || calm()) return;
        row.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2, .8, .3, 1)' });
      });
      // Le focus suit la ligne déplacée, sur la même flèche si elle reste possible.
      const row = document.querySelector(`.a4-order-row[data-id="${moved}"]`);
      const again = row && row.querySelector(`.a4-move[data-dir="${control.dataset.dir}"]:not(:disabled)`);
      (again || (row && row.querySelector('.a4-move:not(:disabled)')))?.focus({ preventScroll: true });
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
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'Trois commerciaux à noter, puis votre classement et votre justification.' }
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
