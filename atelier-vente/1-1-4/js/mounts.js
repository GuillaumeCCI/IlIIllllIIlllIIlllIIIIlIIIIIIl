/* MÉCANIQUES D'EXERCICE 1-1-4 · quatre écrans paramétrés par le contenu.
 *
 * La plupart des 34 exercices du module partagent une mécanique :
 *   mountDeck     une carte à la fois, classée dans l'une des zones
 *                 (vrai / faux, signal verbal / non verbal…) ;
 *   mountMatch    une carte à la fois, reliée à une zone qui ne sert
 *                 qu'une fois (leviers, techniques de conclusion…) ;
 *   mountCompare  deux réponses à comparer, un choix, une justification ;
 *   mountForm     un ou plusieurs cas, chacun avec sa scène (réplique,
 *                 dialogue, image, e-mail) et ses champs à remplir.
 *
 * Le contenu (js/content-s1.js à s5.js) décrit l'exercice ; l'écran
 * (js/screens/*.js) se contente d'appeler la bonne mécanique. Tout l'état
 * reste dans le brouillon de l'exercice, donc sauvegardé et restauré.
 */
(function (root) {
  'use strict';

  const core = () => root.AtelierCore;
  const ex = () => root.AtelierExercise;
  const kit = () => root.AtelierKit;
  const esc = (...a) => kit().esc(...a);
  const icon = (...a) => kit().icon(...a);
  const LETTERS = 'abcdefghij';
  const intOr = (v, fallback = null) => (Number.isInteger(v) ? v : fallback);

  /* ───────────────────────────── Scènes ───────────────────────────────── */

  /* Une scène est un bloc, ou une liste de blocs :
   *   { quote, speaker }              une réplique du client ;
   *   { dialogue: [{ who, label, text, mark }] }   un échange ;
   *   { image, alt, bubble, caption } une illustration (chemin du projet) ;
   *   { email: { to, subject, lines } }            un e-mail ;
   *   { info, symbol, strong }        une phrase de contexte (strong : début en gras) ;
   *   { facts: [{ symbol, text }], title }         une liste de repères. */
  function scene(blocks) {
    const list = Array.isArray(blocks) ? blocks : blocks ? [blocks] : [];
    return list.map(block => {
      if (block.quote) {
        // La réplique seule du client : sa carte illustrée, un portrait par
        // exercice (toujours le même pour une page donnée).
        const speaker = block.speaker && !/^(le )?client$/i.test(block.speaker) ? block.speaker : 'Le client vous dit';
        return kit().clientCard(block.quote, block.portrait || null, speaker);
      }
      if (block.dialogue) {
        return `<ol class="sc-dialogue">${block.dialogue.map(line => {
          const seller = line.who === 'seller';
          const text = line.mark && line.text.includes(line.mark)
            ? `${esc(line.text.slice(0, line.text.indexOf(line.mark)))}<mark>${esc(line.mark)}</mark>${esc(line.text.slice(line.text.indexOf(line.mark) + line.mark.length))}`
            : esc(line.text);
          return `<li class="sc-line ${seller ? 'is-seller' : ''}"><span class="sc-avatar ${seller ? 'is-seller' : ''}">${icon(seller ? 'headset' : 'users', { size: 24 })}<small>${esc(line.label || (seller ? 'Commercial' : 'Client'))}</small></span><p>« ${text} »</p></li>`;
        }).join('')}</ol>`;
      }
      if (block.image) {
        return `<figure class="sc-picture ${block.wide ? 'is-wide' : ''}"><img src="${esc(core().webAsset(block.image))}" alt="${esc(block.alt || '')}" decoding="async" style="object-position:${esc(block.position || 'center')}">
          ${block.bubble ? `<p class="sc-bubble">« ${esc(block.bubble)} »</p>` : ''}
          ${block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ''}</figure>`;
      }
      if (block.email) {
        const mail = block.email;
        return `<article class="sc-email">
          <header><span class="sc-email-symbol">${icon('mail', { size: 26 })}</span><div>${mail.to ? `<p><strong>À :</strong> ${esc(mail.to)}</p>` : ''}${mail.subject ? `<p><strong>Objet :</strong> ${esc(mail.subject)}</p>` : '<p class="k-label">E-mail de relance</p>'}</div></header>
          ${mail.lines.map(line => `<p>${esc(line)}</p>`).join('')}
        </article>`;
      }
      if (block.info) {
        return `<p class="sc-info">${icon(block.symbol || 'info', { size: 22 })}<span>${block.strong ? `<strong>${esc(block.strong)}</strong> ` : ''}${esc(block.info)}</span></p>`;
      }
      if (block.facts) {
        return `<div class="sc-facts">${block.title ? `<h3>${esc(block.title)}</h3>` : ''}<ul>${block.facts.map(f =>
          `<li><span class="sc-fact-symbol">${icon(f.symbol || 'check', { size: 20 })}</span><span>${f.strong ? `<strong>${esc(f.strong)}</strong> ` : ''}${esc(f.text)}</span></li>`).join('')}</ul></div>`;
      }
      return '';
    }).join('');
  }

  /* ─────────────────────── Une carte, des zones ─────────────────────── */

  /* content : eyebrow, title, subtitle, legend (une ligne de rappel),
   * question, cardLabel, letters (a, b, c…), symbol, quoted, zones
   * [{ id, label, sub, tone, symbol, letter }], cards [{ text, answer, why }]. */
  function mountDeck(key, content) {
    const cards = content.cards;
    const zones = content.zones;
    const total = cards.length;
    const noun = content.cardLabel || 'Affirmation';
    const pick = () => (zones.some(z => z.id === ex().value('pick')) ? ex().value('pick') : '');
    const label = i => `${noun} ${content.letters ? `${LETTERS[i]} · ` : ''}${i + 1} / ${total}`;
    const text = card => (content.quoted ? `« ${esc(card.text)} »` : esc(card.text));

    function confirm(zone) {
      kit().deckPlace(total, zone);
      ex().setValue('pick', '');
    }

    function playScreen(index) {
      const history = ex().value('history');
      return `<div class="dk-board">
        <article class="dk-card" draggable="true" data-drag="${index}" tabindex="0" aria-label="${esc(label(index))} : ${esc(cards[index].text)}">
          <p class="dk-pos">${esc(label(index))}</p>
          <div class="dk-body">${content.symbol ? `<span class="dk-symbol">${icon(content.symbol, { size: 34 })}</span>` : ''}<div class="dk-words"><p class="dk-text">${text(cards[index])}</p>${content.question && zones.length === 2 ? `<p class="dk-question is-inline">${esc(content.question)}</p>` : ''}</div></div>
        </article>
        ${content.question && zones.length !== 2 ? `<p class="dk-question">${esc(content.question)}</p>` : ''}
        <div class="dk-zones count-${zones.length}" role="radiogroup" aria-label="${esc(content.question || 'Votre réponse')}">${zones.map(z => `
          <button type="button" class="dk-zone tone-${esc(z.tone || 'neutral')} ${pick() === z.id ? 'is-chosen' : ''}" role="radio" aria-checked="${pick() === z.id}" data-drop="${esc(z.id)}" data-act="dk-pick" data-zone="${esc(z.id)}">
            <span class="dk-zone-mark">${zones.length === 2 && (z.tone === 'good' || z.tone === 'bad') ? icon(z.tone === 'good' ? 'check' : 'close', { size: 30 }) : z.letter ? esc(z.letter) : icon(z.symbol || 'check', { size: 26 })}</span>
            <span class="dk-zone-words"><strong>${esc(z.label)}</strong>${z.sub ? `<small>${esc(z.sub)}</small>` : ''}</span>
            ${zones.length === 2 ? `<span class="dk-zone-go">${icon('chevronRight', { size: 22 })}</span>` : ''}
          </button>`).join('')}</div>
        ${content.drag ? `<p class="dk-hint">${icon('pointer', { size: 18 })}<span>Glissez la carte sur une zone, ou choisissez une zone puis validez.</span></p>` : ''}
      </div>
      ${kit().bar({
        left: kit().dialogButton('all', `Voir les ${total} ${content.cardsLabel || 'cartes'}`, 'text-button', 'list'),
        center: kit().act('deck-undo', `${icon('undo', { size: 17 })}<span>Annuler</span>`, 'secondary', Array.isArray(history) && history.length ? '' : 'disabled'),
        right: kit().act('dk-confirm', `<span>${esc(content.confirmLabel || 'Valider et continuer')}</span>${icon('arrowRight', { size: 18 })}`, 'primary', pick() ? '' : 'disabled')
      })}`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      const index = kit().deckCurrent(total);
      const placed = kit().deckPlaced(total);
      const right = cards.filter((card, i) => placed[i] === card.answer).length;
      const body = reviewing
        ? `${kit().result(right, total, content.resultLabel || 'bonnes réponses')}${kit().deckReview(cards, zones)}${content.keyPoint ? root.AtelierExercise.inlineNote(content.keyPoint, 'neutral') : ''}${core().feedbackBox()}<div class="k-utility">${kit().reset()}</div>`
        : index === null
          ? `<h2>Relisez vos réponses</h2><p class="k-muted">Cliquez sur une ligne pour la modifier, puis validez.</p>${kit().deckRecap(cards, zones, 'Valider mes réponses')}`
          : playScreen(index);
      return `<div class="k-page dk-page">
        ${kit().head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
          aside: `<p class="k-count"><strong>${placed.filter(Boolean).length} / ${total}</strong> réponses</p>${reviewing ? '' : kit().deckDots(total, index)}` })}
        ${content.legend && !reviewing ? `<p class="dk-legend">${content.legend.map(l => `<span><strong>${esc(l.label)} :</strong> ${esc(l.text)}</span>`).join('')}</p>` : ''}
        <form class="dk-form" novalidate>${body}${reviewing ? '' : core().errorsBox()}</form>
        ${reviewing ? '' : kit().utility(`Corrigé disponible après les ${total} ${content.cardsLabel || 'cartes'}`)}
      </div>`;
    }

    function validate() {
      const left = kit().deckPlaced(total).filter(zone => zone === null).length;
      return left ? [{ key: 'placed', message: `Il reste ${kit().plural(left, 'carte')} à classer.` }] : [];
    }

    // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
    const feedback = () => [];

    kit().on({
      'dk-pick': el => { ex().setValue('pick', el.dataset.zone); kit().commit(); },
      'dk-confirm': () => { if (pick()) { confirm(pick()); kit().commit(); } },
      'deck-undo': () => { kit().deckUndo(total); ex().setValue('pick', ''); kit().commit(); },
      'deck-reopen': el => { kit().deckReopen(total, Number(el.dataset.index)); kit().commit(); }
    });
    kit().onDrop((id, zone) => { confirm(zone); kit().commit(); });
    kit().dialogs({
      all: () => {
        const placed = kit().deckPlaced(total);
        const zoneLabel = id => (zones.find(z => z.id === id) || {}).label;
        return { title: `Les ${total} ${content.cardsLabel || 'cartes'}`, html: `<ol class="dialog-list">${cards.map((c, i) => `<li>${text(c)}${placed[i] ? ` <em>· ${esc(zoneLabel(placed[i]))}</em>` : ''}</li>`).join('')}</ol>` };
      }
    });

    ex().mount(key, { screen, validate, feedback, compactFeedback: true });
  }

  /* ────────────────── Une carte, une zone qui sert une fois ──────────── */

  /* content : eyebrow, title, subtitle, cardLabel, zoneTitle, zoneHelp,
   * cards [{ text, answer: index de zone, why }], zones [{ label, sub }],
   * intro (facultatif) : { title, subtitle, scene, next } lu avant de
   * commencer, puis rappelé par un lien. */
  function mountMatch(key, content) {
    const cards = content.cards;
    const zones = content.zones;
    const n = cards.length;
    const hasIntro = Boolean(content.intro);
    const at = () => (hasIntro ? kit().stage(2) : 2);
    const link = i => intOr(ex().value(`link${i}`));
    const owner = z => cards.findIndex((_, i) => link(i) === z);
    const count = () => cards.filter((_, i) => link(i) !== null).length;
    const current = () => {
      const asked = intOr(ex().value('card'));
      if (asked !== null && asked >= 0 && asked < n) return asked;
      const free = cards.findIndex((_, i) => link(i) === null);
      return free === -1 ? 0 : free;
    };

    function assign(z) {
      const i = current();
      const previous = owner(z);
      if (previous !== -1 && previous !== i) ex().setValue(`link${previous}`, null);
      ex().setValue(`link${i}`, z);
      let next = -1;
      for (let step = 1; step <= n && next === -1; step++) if (link((i + step) % n) === null) next = (i + step) % n;
      ex().setValue('card', next === -1 ? i : next);
    }

    function dots(i) {
      return `<span class="mt-dots">${cards.map((_, k) => `<button type="button" class="mt-dot ${k === i ? 'is-current' : link(k) !== null ? 'is-filled' : ''}" data-act="mt-card" data-index="${k}" aria-label="${esc(content.cardLabel)} ${LETTERS[k]}">${LETTERS[k]}</button>`).join('')}</span>`;
    }

    function playScreen() {
      const i = current();
      return `<div class="mt-board">
        <section class="mt-card-side">
          <article class="mt-card" draggable="true" data-drag="${i}" tabindex="0">
            <p class="dk-pos">${esc(content.cardLabel)} ${i + 1} / ${n}</p>
            <span class="mt-letter">${LETTERS[i]}</span>
            <p class="mt-text">${content.quoted === false ? esc(cards[i].text) : `« ${esc(cards[i].text)} »`}</p>
            ${link(i) !== null ? `<p class="mt-current">${icon('check', { size: 16 })}<span>Associée à : ${esc(zones[link(i)].label)}</span></p>` : ''}
          </article>
          <p class="k-help">${icon('info', { size: 17 })}<span>Chaque ${esc(content.zoneNoun || 'proposition')} ne s’utilise qu’une fois.</span></p>
        </section>
        <section class="k-panel mt-zones">
          <h2>${esc(content.zoneTitle)}</h2>
          ${content.zoneHelp ? `<p class="k-muted">${esc(content.zoneHelp)}</p>` : ''}
          <ul>${zones.map((z, k) => {
            const by = owner(k);
            return `<li><button type="button" class="mt-zone ${by === i ? 'is-chosen' : by !== -1 ? 'is-used' : ''}" data-drop="${k}" data-act="mt-zone" data-zone="${k}" aria-pressed="${by === i}">
              <span class="mt-zone-n">${content.zoneLetters ? esc(content.zoneLetters[k]) : k + 1}</span><span class="mt-zone-text"><strong>${esc(z.label)}</strong>${z.sub ? `<small>${esc(z.sub)}</small>` : ''}</span>
              ${by !== -1 ? `<span class="mt-zone-by">${LETTERS[by]}</span>` : ''}
            </button></li>`;
          }).join('')}</ul>
        </section>
      </div>`;
    }

    function introScreen() {
      return `<section class="k-panel mt-intro">${scene(content.intro.scene)}</section>
        ${kit().bar({ center: `${n} ${content.cardsLabel || 'cartes'} à placer`, right: kit().submit(content.intro.next || 'Passer aux associations') })}`;
    }

    function reviewScreen() {
      const right = cards.filter((c, i) => link(i) === c.answer).length;
      return `${kit().result(right, n, 'associations justes')}
        <ol class="mt-review">${cards.map((c, i) => {
          const ok = link(i) === c.answer;
          return `<li class="${ok ? 'is-ok' : 'is-ko'}"><span class="mt-letter is-small">${LETTERS[i]}</span>
            <span class="mt-review-text"><strong>${content.quoted === false ? esc(c.text) : `« ${esc(c.text)} »`}</strong><span>${icon('arrowRight', { size: 15 })} ${esc(zones[c.answer].label)}</span>${c.why ? `<small>${esc(c.why)}</small>` : ''}</span>
            ${kit().mark(ok, ok ? 'Correct' : `Vous : ${link(i) === null ? 'rien' : zones[link(i)].label}`)}</li>`;
        }).join('')}</ol>
        ${content.keyPoint ? ex().inlineNote(content.keyPoint, 'neutral') : ''}
        ${core().feedbackBox()}<div class="k-utility">${kit().reset()}</div>`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      const stage = at();
      const intro = !reviewing && stage === 1;
      return `<div class="k-page mt-page">
        ${kit().head({ eyebrow: content.eyebrow, title: intro ? content.intro.title : content.title, subtitle: intro ? content.intro.subtitle : content.subtitle,
          aside: intro ? '' : `<p class="k-count"><strong>${count()} / ${n}</strong> associations</p>${reviewing ? '' : dots(current())}` })}
        ${hasIntro && !intro && !reviewing ? `<p class="mt-reread">${kit().dialogButton('intro', content.intro.reread || 'Relire le document', 'text-button', 'document')}</p>` : ''}
        <form novalidate class="mt-form">
          ${reviewing ? reviewScreen() : intro ? introScreen() : `${playScreen()}${core().errorsBox()}${kit().bar({
            left: kit().reset(),
            center: `${count()} / ${n} associations faites`,
            right: kit().submit(content.submitLabel || 'Vérifier mes associations', count() === n ? '' : 'data-pending="true"')
          })}`}
        </form>
        ${reviewing ? '' : kit().utility('Corrigé disponible après validation')}
      </div>`;
    }

    function validate() {
      if (at() === 1) return [];
      const left = n - count();
      return left ? [{ key: 'link', message: `Associez encore ${kit().plural(left, 'carte')}.` }] : [];
    }

    function intercept() {
      if (at() !== 1) return false;
      kit().setStage(2);
      return true;
    }

    // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
    const feedback = () => [];

    kit().on({
      'mt-zone': el => { assign(Number(el.dataset.zone)); kit().commit(); },
      'mt-card': el => { ex().setValue('card', Number(el.dataset.index)); kit().commit(); }
    });
    kit().onDrop((id, z) => { ex().setValue('card', Number(id)); assign(Number(z)); kit().commit(); });
    if (hasIntro) kit().dialogs({ intro: { title: content.intro.title, html: scene(content.intro.scene) } });

    ex().mount(key, { screen, validate, intercept, feedback, compactFeedback: true });
  }

  /* ───────────────────── Deux réponses à comparer ───────────────────── */

  /* content : eyebrow, title, subtitle, badge, speaker, quote, image,
   * options [{ id, label, text | lines, analysis }], answer, listTitle,
   * whyLabel, whyHelp, hint, model ; criteria [{ id, label, symbol }]
   * (au moins deux à cocher) ou criteriaFields (nombre de critères à
   * rédiger) remplacent ou complètent la justification libre. */
  function mountCompare(key, content) {
    const chosen = () => ex().value('pick');
    const ticked = () => (Array.isArray(ex().value('criteria')) ? ex().value('criteria') : []);
    const fields = content.criteriaFields || 0;
    const optionText = option => (option.lines ? option.lines.map(line => `<span class="cmp-line">${esc(line)}</span>`).join('') : `« ${esc(option.text)} »`);

    function sceneBlock() {
      if (content.image) return `<section class="cmp-scene">${scene({ image: content.image, alt: content.imageAlt, wide: true })}</section>`;
      if (content.context) return `<p class="cmp-context">${icon('mail', { size: 20 })}<span>${esc(content.context)}</span></p>`;
      return content.quote ? `<section class="cmp-client">${scene({ quote: content.quote, speaker: content.speaker })}</section>` : '';
    }

    // `answer` peut lister plusieurs réponses quand le corrigé les accepte toutes.
    const accepted = () => [].concat(content.answer);
    const both = () => accepted().length > 1;

    function optionCard(option, reviewing) {
      const isChosen = chosen() === option.id;
      if (reviewing) {
        const ok = accepted().includes(option.id);
        const okLabel = both() ? (isChosen ? 'Votre choix, pertinent' : 'Pertinente aussi') : isChosen ? 'Votre choix, le plus efficace' : 'Le plus efficace';
        return `<section class="cmp-option is-static ${ok ? 'is-answer' : ''}">
          <header><span class="cmp-review-radio ${isChosen ? 'is-on' : ''}" aria-hidden="true"></span><strong>${esc(option.label)}</strong>${ok ? kit().mark(true, okLabel) : isChosen ? kit().mark(false, 'Votre choix') : ''}</header>
          <p class="cmp-text">${optionText(option)}</p>
          <ul class="cmp-analysis ${ok ? 'is-good' : 'is-bad'}">${option.analysis.map(line => { const at = line.indexOf(' : '); return at > 0 && at < 40 ? `<li><strong>${esc(line.slice(0, at))}</strong> : ${esc(line.slice(at + 3))}</li>` : `<li>${esc(line)}</li>`; }).join('')}</ul>
        </section>`;
      }
      return `<label class="cmp-option ${isChosen ? 'is-chosen' : ''}">
        <input type="radio" class="sr-only" name="pick" data-field="pick" value="${esc(option.id)}" ${isChosen ? 'checked' : ''}>
        <span class="cmp-option-body"><strong>${esc(option.label)}</strong><span class="cmp-text">${optionText(option)}</span></span>
        <span class="cmp-choose"><span class="cmp-radio" aria-hidden="true"></span>${esc(content.chooseLabel || 'Je choisis cette réponse')}</span>
      </label>`;
    }

    function criteriaBlock(reviewing) {
      if (!content.criteria) return '';
      return `<div class="cmp-criteria" role="group" aria-label="Critères">${content.criteria.map(c => {
        const on = ticked().includes(c.id);
        return reviewing
          ? `<span class="cmp-criterion is-static ${on ? 'is-on' : ''}">${icon(c.symbol, { size: 20 })}<span>${esc(c.label)}</span></span>`
          : `<button type="button" class="cmp-criterion ${on ? 'is-on' : ''}" data-act="cmp-criterion" data-id="${esc(c.id)}" aria-pressed="${on}"><span class="cmp-tick">${on ? icon('check', { size: 14 }) : ''}</span>${icon(c.symbol, { size: 20 })}<span>${esc(c.label)}</span></button>`;
      }).join('')}</div>`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      const ok = accepted().includes(chosen());
      const minNote = content.criteria ? `<span class="k-count cmp-min" data-live="cmp-min"><strong>${Math.min(ticked().length, 2)} / 2</strong> critères minimum</span>` : '';
      return `<div class="k-page cmp-page">
        ${kit().head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
          aside: content.badge ? `<p class="cmp-badge">${esc(content.badge)}</p>` : '' })}
        ${sceneBlock()}
        <form novalidate class="cmp-form">
          ${content.listTitle ? `<h2 class="cmp-list-title">${esc(content.listTitle)}</h2>` : ''}
          ${reviewing ? kit().result(ok ? 1 : 0, 1, both() ? 'les deux réponses peuvent convenir' : ok ? 'vous avez choisi la réponse la plus efficace' : 'la réponse la plus efficace était l’autre') : ''}
          <div class="cmp-options" ${reviewing ? '' : 'role="radiogroup"'}>${content.options.map(option => optionCard(option, reviewing)).join('')}</div>
          <section class="k-panel cmp-why">
            <header class="cmp-why-head"><span class="cmp-why-symbol">${icon('pencil', { size: 22 })}</span><div><h2>${esc(content.whyLabel)}</h2><p class="k-muted">${esc(content.whyHelp)}</p></div>${reviewing ? '' : minNote}</header>
            ${criteriaBlock(reviewing)}
            ${reviewing
              ? `${fields ? Array.from({ length: fields }, (_, i) => kit().yours(`Votre critère ${i + 1}`, ex().value(`crit${i}`))).join('') : kit().yours('Votre justification', ex().value('why'))}${kit().model('Corrigé', content.model)}`
              : `${fields
                  ? `<div class="cmp-fields">${Array.from({ length: fields }, (_, i) => `<div><p class="cmp-field-label"><span>${i + 1}</span>Critère ${i + 1}</p>${ex().field(`crit${i}`, `Critère ${i + 1}`, { placeholder: 'Saisissez votre critère…', max: 300, rows: 3, hideLabel: true })}</div>`).join('')}</div>`
                  : ex().field('why', content.whyLabel, { placeholder: content.whyPlaceholder || 'Expliquez votre choix…', max: 600, rows: 3, hideLabel: true })}
                <div class="cmp-why-row">${content.hint ? kit().dialogButton('hint', 'Voir un repère', 'secondary', 'book') : '<span></span>'}${kit().submit(content.submitLabel || 'Valider mon analyse')}</div>`}
          </section>
          ${reviewing ? `${core().feedbackBox()}<div class="k-utility">${kit().reset()}</div>` : core().errorsBox()}
        </form>
        ${reviewing ? '' : kit().utility('Analyse des deux réponses après validation')}
      </div>`;
    }

    function validate(values) {
      const errors = [];
      if (!values.pick) errors.push({ key: 'pick', message: 'Choisissez une réponse.' });
      if (content.criteria && ticked().length < 2) errors.push({ key: 'criteria', message: 'Cochez au moins deux critères.' });
      if (fields) {
        for (let i = 0; i < fields; i++) if (!kit().filled(values[`crit${i}`])) errors.push({ key: `crit${i}`, message: `Rédigez le critère ${i + 1}.` });
      } else if (!kit().filled(values.why)) errors.push({ key: 'why', message: 'Expliquez votre choix en une ou deux phrases.' });
      return errors;
    }

    const feedback = () => [both()
      ? 'Les deux réponses peuvent convenir : comparez votre justification au corrigé.'
      : accepted().includes(chosen())
      ? 'Bon choix. Comparez votre justification à l’analyse des deux réponses.'
      : 'Ce n’était pas la réponse la plus efficace : relisez l’analyse des deux réponses.'];

    kit().on({
      'cmp-criterion': el => {
        const list = ticked().slice();
        const at = list.indexOf(el.dataset.id);
        if (at === -1) list.push(el.dataset.id); else list.splice(at, 1);
        ex().setValue('criteria', list);
        kit().commit();
      }
    });
    if (content.hint) kit().dialogs({ hint: { title: 'Un repère', html: `<p>${esc(content.hint)}</p>` } });

    ex().mount(key, { screen, validate, feedback, compactFeedback: true });
  }

  /* ─────────────────────── Des cas, des champs ──────────────────────── */

  /* content : eyebrow, title, subtitle, countLabel, caseNoun, sequential,
   * layout ('side' | 'stack'), scene (par défaut), fields (par défaut),
   * side (bloc de contexte affiché à gauche), resources (liste en fenêtre),
   * hint, tokens (champs à insérer), stepper (frise d'étapes dans l'en-tête,
   * étape numérotée, bouton « Précédent »), tip (astuce à droite),
   * tour (bulles de la visite guidée, voir kit.tour), cases [{ tab, title, scene, fields,
   * answers, models, checks, model, next }].
   *
   * Un champ : { id, label, sub, type: 'textarea' | 'input' | 'select' |
   * 'choice' | 'chips', placeholder, rows, max, options, answer, model,
   * min, optional, help }. Clé dans le brouillon : `c<cas>_<id>`. */
  function mountForm(key, content) {
    const cases = content.cases;
    const n = cases.length;
    const fieldsOf = i => (cases[i].fields || content.fields || []).map(f => Object.assign({}, f, {
      answer: (cases[i].answers || {})[f.id] ?? f.answer,
      model: (cases[i].models || {})[f.id] ?? f.model
    }));
    const k = (i, f) => `c${i}_${f.id || f}`;
    const val = (i, f) => ex().value(k(i, f));
    const chips = (i, f) => (Array.isArray(val(i, f)) ? val(i, f) : []);
    const filledField = (i, f) => (f.type === 'chips' ? chips(i, f).length >= (f.min || 1) : kit().filled(val(i, f)));
    const complete = i => {
      const fields = fieldsOf(i);
      return fields.length ? fields.every(f => f.optional || filledField(i, f)) : ex().value(k(i, 'read')) === true;
    };
    const doneCount = () => cases.filter((_, i) => complete(i)).length;
    /* Plusieurs cas : on compte les cas complets. Un seul : ses champs. */
    const countLine = () => {
      if (n > 1) return `<strong>${doneCount()} / ${n}</strong> ${esc(content.countLabel || 'étapes complétées')}`;
      const fields = fieldsOf(0);
      return `<strong>${fields.filter(f => filledField(0, f)).length} / ${fields.length}</strong> ${esc(content.countLabel || 'étapes')}`;
    };
    const reachable = i => !content.sequential || cases.slice(0, i).every((_, j) => complete(j));
    /* Le cas affiché. Sans choix mémorisé, le premier ; un cas encore
     * fermé (étapes successives) renvoie au premier cas incomplet. L'écran
     * mémorise ensuite le cas qu'il affiche : remplir ce cas ne doit pas
     * faire glisser la validation vers le suivant. */
    const current = () => {
      const asked = intOr(ex().value('case'));
      if (asked === null) return 0;
      if (asked >= 0 && asked < n && reachable(asked)) return asked;
      const free = cases.findIndex((_, i) => !complete(i));
      return free === -1 ? n - 1 : free;
    };
    let lastFocus = null;

    /* La frise d'étapes de l'en-tête (content.stepper), à la place des onglets. */
    function stepper(at) {
      return `<div class="fm-stepper"><p class="fm-stepper-now">${esc(content.caseNoun || 'Étape')} ${at + 1} sur ${n}</p><p class="fm-stepper-count" data-live="fm-count">${countLine()}</p>
        <ol>${cases.map((c, i) => `<li class="${i === at ? 'is-current' : ''} ${complete(i) ? 'is-done' : ''}"><button type="button" data-act="fm-case" data-index="${i}" ${reachable(i) ? '' : 'disabled'} ${i === at ? 'aria-current="step"' : ''}><span class="fm-stepper-dot">${complete(i) && i !== at ? icon('check', { size: 16 }) : i + 1}</span><span class="fm-stepper-label">${esc(c.tab)}</span></button></li>`).join('')}</ol></div>`;
    }

    function tabs(at) {
      if (n < 2 || content.stepper) return '';
      return `<div class="fm-tabs count-${n} ${content.sequential ? 'is-steps' : ''}">${cases.map((c, i) => `<button type="button" class="fm-tab ${i === at ? 'is-current' : ''} ${complete(i) ? 'is-done' : ''}" data-act="fm-case" data-index="${i}" ${reachable(i) ? '' : 'disabled'}>
        <span class="fm-tab-n">${complete(i) && i !== at ? icon('check', { size: 18 }) : content.sequential ? i + 1 : String(i + 1).padStart(2, '0')}</span><span class="fm-tab-text">${esc(c.tab)}${c.tabSub ? `<small>${esc(c.tabSub)}</small>` : ''}${c.tabNote ? `<small class="fm-tab-note">${esc(c.tabNote)}</small>` : ''}</span></button>`).join('')}</div>`;
    }

    function fieldBlock(i, f) {
      const key = k(i, f);
      const label = f.label ? `<p class="fm-label">${f.symbol ? icon(f.symbol, { size: 20 }) : ''}<span>${esc(f.label)}</span></p>${f.sub ? `<p class="fm-sub">${esc(f.sub)}</p>` : ''}` : '';
      if (f.type === 'choice') {
        return `<div class="fm-field">${label}<div class="fm-choices count-${f.options.length}" role="radiogroup">${f.options.map(o => `
          <button type="button" class="fm-choice ${val(i, f) === o.id ? 'is-chosen' : ''}" role="radio" aria-checked="${val(i, f) === o.id}" data-act="fm-choice" data-key="${esc(key)}" data-id="${esc(o.id)}" data-field="${esc(key)}">
            ${o.symbol ? `<span class="fm-choice-symbol tone-${esc(o.tone || 'blue')}">${icon(o.symbol, { size: 26 })}</span>` : '<span class="fm-radio"></span>'}
            <span><strong>${esc(o.label)}</strong>${o.sub ? `<small>${esc(o.sub)}</small>` : ''}</span>
          </button>`).join('')}</div></div>`;
      }
      if (f.type === 'chips') {
        return `<div class="fm-field">${label}<div class="fm-chips">${f.options.map(o => {
          const on = chips(i, f).includes(o.id);
          return `<button type="button" class="fm-chip ${on ? 'is-on' : ''}" data-act="fm-chip" data-key="${esc(key)}" data-id="${esc(o.id)}" data-field="${esc(key)}" aria-pressed="${on}"><span class="fm-tick">${on ? icon('check', { size: 14 }) : ''}</span>${o.symbol ? icon(o.symbol, { size: 22 }) : ''}<span>${esc(o.label)}</span></button>`;
        }).join('')}</div><p class="k-muted" data-live="chips-${esc(key)}">${chipsLine(i, f)}</p></div>`;
      }
      if (f.type === 'select') {
        return `<div class="fm-field">${label}${ex().select(key, f.label, f.options, f.placeholder || 'Choisir…')}</div>`;
      }
      return `<div class="fm-field ${f.inline ? 'is-inline' : ''}">${label}${ex().field(key, f.label || f.placeholder || 'Votre réponse', { placeholder: f.placeholder || '', max: f.max || 500, rows: f.rows || 3, hideLabel: true, type: f.type === 'input' ? 'input' : 'textarea' })}${f.help ? `<p class="k-muted">${esc(f.help)}</p>` : ''}</div>`;
    }

    const chipsLine = (i, f) => {
      const c = chips(i, f).length;
      return `${c} ${f.chipNoun || 'élément'}${c > 1 ? 's' : ''} choisi${c > 1 ? 's' : ''}${f.min > 1 ? ` · ${f.min} minimum` : ''}`;
    };

    /* Deux champs `half` qui se suivent partagent une ligne. */
    function fieldRows(i, fields) {
      let html = '';
      for (let at = 0; at < fields.length; at++) {
        if (fields[at].half && fields[at + 1] && fields[at + 1].half) {
          html += `<div class="fm-row">${fieldBlock(i, fields[at])}${fieldBlock(i, fields[at + 1])}</div>`;
          at++;
        } else html += fieldBlock(i, fields[at]);
      }
      return html;
    }

    /* Un cas `numbered` : chaque champ dans sa carte, avec un grand numéro
     * rond dont la couleur alterne. */
    const TONES = ['blue', 'coral', 'green'];
    const numberedFields = (i, fields) => `<ol class="fm-numbered">${fields.map((f, j) => `<li class="fm-num-card"><span class="fm-num tone-${TONES[j % TONES.length]}">${j + 1}</span><div>${fieldBlock(i, f)}</div></li>`).join('')}</ol>`;

    function checksBlock(i) {
      const checks = cases[i].checks || content.checks;
      if (!checks) return '';
      return `<div class="fm-checks"><p class="k-label">${esc(content.checksLabel || 'Vérifiez votre réponse')}</p><div class="fm-checks-row">${checks.map((label, j) =>
        `<label class="call-key"><input type="checkbox" data-field="${k(i, `k${j}`)}" ${val(i, `k${j}`) === true ? 'checked' : ''}><span class="call-key-box" aria-hidden="true">${icon('check', { size: 14 })}</span><span>${esc(label)}</span></label>`).join('')}</div></div>`;
    }

    function tokens() {
      if (!content.tokens) return '';
      return `<div class="fm-tokens"><span class="k-label">Insérer un champ</span>${content.tokens.map(t => `<button type="button" class="fm-token" data-act="fm-token" data-token="${esc(t)}">${icon('plus', { size: 14 })}<span>${esc(t)}</span></button>`).join('')}</div>`;
    }

    /* L'aperçu du canal (content.skin) : les champs listés prennent l'allure
     * du canal choisi dans le champ `skin.field` (e-mail, appel, rendez-vous,
     * messagerie, courrier). Tous les habillages sont dans la page ; le
     * changement de canal ne fait que basculer `data-skin`. */
    function skinBlock(i, fields) {
      const sk = content.skin;
      const on = val(i, { id: sk.field }) || 'none';
      const deco = (cls, html) => `<div class="${cls}" aria-hidden="true">${html}</div>`;
      const who = `<span class="sk-avatar">${esc(sk.initials || '')}</span><span class="sk-who"><strong>${esc(sk.name)}</strong><small>${esc(sk.role || '')}</small></span>`;
      return `<div class="fm-skin" data-skin="${esc(on)}" data-skin-for="${esc(k(i, sk.field))}">
        ${deco('sk-hint sk-none', `${icon('info', { size: 18 })}<span>Choisissez un canal : la zone d’écriture prendra son apparence.</span>`)}
        ${deco('sk-head sk-email', `<p class="sk-bar"><i></i><i></i><i></i><span>Nouveau message</span></p><p class="sk-line"><b>À</b><span class="sk-chip">${esc(sk.name)}</span></p><p class="sk-line"><b>Objet</b><span>${esc(sk.subject || '')}</span></p>`)}
        ${deco('sk-head sk-phone', `${who}<span class="sk-call">${icon('phone', { size: 16 })} Appel en cours</span>`)}
        ${deco('sk-head sk-visit', `${icon('calendar', { size: 22 })}<span class="sk-who"><strong>Rendez-vous sur place</strong><small>Avec ${esc(sk.name)} · vos notes pour l’entretien</small></span>`)}
        ${deco('sk-head sk-linkedin', `<p class="sk-bar"><span>Messagerie</span></p><div class="sk-line">${who}</div>`)}
        ${deco('sk-head sk-mail', `<p class="sk-to"><strong>${esc(sk.name)}</strong><br>${esc(sk.role || '')}</p><p class="sk-line"><b>Objet :</b> <span>${esc(sk.subject || '')}</span></p>`)}
        <div class="sk-body">${fieldRows(i, fields)}</div>
        ${deco('sk-foot sk-email', `<span class="sk-send">Envoyer ${icon('arrowRight', { size: 16 })}</span>`)}
        ${deco('sk-foot sk-phone', `<span class="sk-hang">${icon('phone', { size: 20 })}</span>`)}
        ${deco('sk-foot sk-linkedin', `<span class="sk-send">Envoyer</span>`)}
        ${deco('sk-foot sk-mail', `<span class="sk-sign">Bien cordialement,<br>Votre signature</span>`)}
      </div>`;
    }

    function casePanel(i) {
      const c = cases[i];
      const fields = fieldsOf(i);
      const sceneHtml = scene(c.scene || content.scene);
      const after = cases.findIndex((_, j) => j > i && !complete(j));
      const next = after !== -1 ? after : cases.findIndex((_, j) => j !== i && !complete(j));
      const label = next === -1 ? (content.submitLabel || 'Valider mes réponses') : (c.next || content.nextLabel || `Enregistrer et continuer`);
      if (content.stepper) {
        const prev = i > 0 ? `data-act="fm-case" data-index="${i - 1}"` : 'disabled';
        // L'astuce se pose à côté du cadre blanc, sur le fond de la page.
        return `<div class="fm-step-wrap ${content.tip || content.resources ? 'has-tip' : ''}"><section class="k-panel fm-panel fm-step">
          <div class="fm-main">
            ${content.side ? `<div class="fm-side-card">${scene(content.side)}</div>` : ''}
            <div class="fm-step-head"><span class="fm-step-n">${String(i + 1).padStart(2, '0')}</span><div><h2 class="fm-step-title">${esc(c.tab)}</h2>${c.intro ? `<p class="fm-intro">${esc(c.intro)}</p>` : ''}</div></div>
            ${content.skin ? fieldRows(i, fields.filter(f => !content.skin.fields.includes(f.id))) + skinBlock(i, fields.filter(f => content.skin.fields.includes(f.id))) : fieldRows(i, fields)}${core().errorsBox()}</div>
          <div class="fm-actions"><button type="button" class="button secondary fm-prev" ${prev}>${icon('arrowLeft', { size: 18 })}<span>Précédent</span></button>
            ${kit().submit(label)}</div>
        </section>${content.tip || content.resources ? `<aside class="fm-side-col">
          ${content.tip ? `<div class="fm-tip">${icon('lightbulb', { size: 30 })}<p><strong>Astuce :</strong> ${esc(content.tip)}</p></div>` : ''}
          ${content.resources ? `<div class="fm-res"><p class="fm-res-title">${icon('stack', { size: 22 })}<span>${esc(content.resourcesTitle || 'Vos ressources')}</span></p><p class="fm-res-text">${content.resources.length} idées à piocher pour donner de la valeur à chaque relance.</p>${kit().dialogButton('resources', content.resourcesLabel || 'Mes ressources', 'primary', '')}</div>` : ''}
        </aside>` : ''}</div>`;
      }
      const form = `<div class="fm-main">
        ${c.title && n > 1 ? `<p class="k-label">${esc(content.caseNoun || 'Cas')} ${i + 1} / ${n}</p>` : ''}${c.title ? `<h2 class="fm-title">${esc(c.title)}</h2>` : ''}
        ${c.intro ? `<p class="fm-intro">${esc(c.intro)}</p>` : ''}
        ${tokens()}
        ${c.numbered ? numberedFields(i, fields) : fieldRows(i, fields)}
        ${checksBlock(i)}
        ${core().errorsBox()}
        <div class="fm-actions">${content.hint || c.hint ? kit().dialogButton(`hint${c.hint ? i : ''}`, content.hintLabel || 'Voir un repère', 'secondary', 'lightbulb') : '<span></span>'}
          ${content.resources ? kit().dialogButton('resources', content.resourcesLabel || 'Mes ressources', 'text-button', 'stack') : ''}${kit().submit(label)}</div>
      </div>`;
      if (!sceneHtml) return `<section class="k-panel fm-panel">${form}</section>`;
      return `<section class="fm-panel ${content.layout === 'stack' ? 'is-stack' : 'is-side'}"><div class="k-panel fm-scene">${sceneHtml}</div><div class="k-panel">${form}</div></section>`;
    }

    /* LE CORRIGÉ EN ACCORDÉON (content.review) : une ligne par étape, avec
     * son badge ; la première est ouverte. Dans chaque étape, un tableau
     * « Votre réponse / Une réponse possible / Notre avis » et un encadré
     * « Ce qu'il faut retenir ». Seuls le délai et le canal sont jugés (ils
     * se vérifient) ; les champs rédigés reçoivent une question pour se
     * relire, jamais une fausse note. */
    // Délai en jours depuis l'envoi : « J+3 », « 3 jours », « 2 semaines », « un mois », « le 6 juin ».
    function daysOf(text) {
      const t = String(text || '').toLowerCase();
      const n = x => (/\d/.test(x) ? Number(x) : 1);
      let m = t.match(/j\s*\+\s*(\d+)/);
      if (m) return Number(m[1]);
      m = t.match(/(\d+|un)\s*mois/);
      if (m) return n(m[1]) * 30;
      m = t.match(/(\d+|une)\s*(semaines?|sem\b)/);
      if (m) return n(m[1]) * 7;
      m = t.match(/(\d+)\s*(jours?|j\b)/);
      if (m) return Number(m[1]);
      m = content.review.start && t.match(/(\d{1,2})\s*(juin|juillet)/);
      if (m) return (m[2] === 'juillet' ? 30 : 0) + Number(m[1]) - content.review.start;
      return null;
    }

    function accordionReview() {
      const rv = content.review;
      const symbols = rv.symbols || {};
      const tone = { ok: ['Bien vu', 'check'], fix: ['À préciser', 'info'], ko: ['À ajuster', 'close'], read: ['À vérifier', 'search'] };
      const channelField = fieldsOf(0).find(f => f.id === rv.channel);
      const channelLabel = id => ((channelField?.options || []).find(o => o.id === id) || {}).label || id || 'rien';
      const verdicts = cases.map((c, i) => {
        const r = c.review || {};
        const out = {};
        const days = daysOf(val(i, { id: rv.when }));
        const before = i > 0 ? daysOf(val(i - 1, { id: rv.when })) : 0;
        if (days === null) out[rv.when] = ['fix', 'Indiquez un délai précis, par exemple J+3 : trois jours après l’envoi.'];
        else if (before !== null && days <= before) out[rv.when] = ['ko', 'Cette relance arrive avant la précédente, ou en même temps : espacez-les dans le temps.'];
        else if (r.days && (days < r.days[0] || days > r.days[1])) out[rv.when] = ['fix', r.whenTip];
        else out[rv.when] = ['ok', r.whenOk];
        const chosen = val(i, { id: rv.channel });
        if (i > 0 && chosen && chosen === val(i - 1, { id: rv.channel })) out[rv.channel] = ['ko', `Même canal qu’à l’étape précédente : variez pour relancer l’attention. ${r.channelWhy}`];
        else if ((r.channels || []).includes(chosen)) out[rv.channel] = ['ok', r.channelWhy];
        else out[rv.channel] = ['fix', `${channelLabel((r.channels || [])[0])} conviendrait mieux ici. ${r.channelWhy}`];
        (rv.written || []).forEach(id => { out[id] = ['read', (r.check || {})[id] || '']; });
        const states = Object.values(out).map(v => v[0]);
        const badge = states.includes('ko') ? ['ko', 'À ajuster'] : states.includes('fix') ? ['fix', 'À améliorer'] : ['ok', 'Bien réalisée'];
        return { out, badge };
      });
      const shownOf = (i, f) => (f.type === 'select' ? channelLabel(val(i, f)) : val(i, f)) || 'rien';
      return `<div class="rva">${cases.map((c, i) => {
        const { out, badge } = verdicts[i];
        const r = c.review || {};
        return `<details class="rva-item tone-${badge[0]}" ${i === 0 ? 'open' : ''}>
          <summary><span class="rva-n">${i + 1}</span><span class="rva-title"><strong>${esc(c.tab)}</strong>${r.subtitle ? `<small>${esc(r.subtitle)}</small>` : ''}</span>
            <span class="rva-badge tone-${badge[0]}"><i></i>${esc(badge[1])}</span><span class="rva-chev">${icon('chevronRight', { size: 20 })}</span></summary>
          <div class="rva-body">
            <div class="rva-grid" role="table">
              <div class="rva-row rva-headrow" role="row"><span role="columnheader"></span><span role="columnheader">Votre réponse</span><span role="columnheader">Une réponse possible</span><span role="columnheader">Notre avis</span></div>
              ${fieldsOf(i).map(f => {
                const [state, text] = out[f.id] || ['read', ''];
                return `<div class="rva-row" role="row">
                  <span class="rva-field" role="rowheader"><span class="rva-symbol">${icon(symbols[f.id] || 'pencil', { size: 20 })}</span><strong>${esc(f.label)}</strong></span>
                  <span class="rva-cell" role="cell">${esc(shownOf(i, f))}</span>
                  <span class="rva-cell is-model" role="cell">${esc(f.model || '')}</span>
                  <span class="rva-avis tone-${state}" role="cell"><span class="rva-mark">${icon(tone[state][1], { size: 14, strokeWidth: 3 })}</span><span><strong>${tone[state][0]}</strong>${text ? `<small>${esc(text)}</small>` : ''}</span></span>
                </div>`;
              }).join('')}
            </div>
            ${r.retain ? `<div class="rva-retain">${icon('lightbulb', { size: 30 })}<strong>Ce qu’il faut retenir</strong><ul>${r.retain.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''}
            ${c.lesson ? ex().inlineNote(c.lesson, 'neutral') : ''}
          </div>
        </details>`;
      }).join('')}</div>${content.keyPoint ? ex().inlineNote(content.keyPoint, 'neutral') : ''}${core().feedbackBox()}<div class="k-utility">${kit().reset()}</div>`;
    }

    function reviewScreen() {
      if (content.review) return accordionReview();
      return cases.map((c, i) => {
        const fields = fieldsOf(i);
        if (!fields.length && !c.model && !c.lesson) return '';
        const sceneHtml = c.reviewScene !== false ? scene((c.scene || content.scene) && [].concat(c.scene || content.scene).filter(b => b.quote || b.info || b.dialogue)) : '';
        // Un onglet qui se contente de répéter « Situation 2 » n'est pas redit.
        const noun = `${content.caseNoun || 'Cas'} ${i + 1}`;
        const heading = c.tab && c.tab !== noun ? `${noun} · ${c.tab}` : noun;
        // Les champs courts (un mot, une date) se lisent en tableau.
        const compact = fields.length > 2 && fields.every(f => f.type !== 'choice' && f.type !== 'chips');
        if (compact) {
          const shownOf = f => (f.type === 'select' ? ((f.options.find(o => (o.id || o) === val(i, f)) || {}).label || val(i, f)) : val(i, f));
          return `<section class="k-panel fm-review">
            ${n > 1 ? `<p class="k-label">${esc(heading)}</p>` : ''}
            <table class="fm-review-table"><thead><tr><th scope="col"></th><th scope="col">Votre réponse</th><th scope="col">Une réponse possible</th></tr></thead>
              <tbody>${fields.map(f => `<tr><th scope="row">${esc(f.label)}</th><td>${esc(shownOf(f))}</td><td>${f.model ? esc(f.model) : ''}</td></tr>`).join('')}</tbody></table>
          </section>`;
        }
        return `<section class="k-panel fm-review">
          ${n > 1 ? `<p class="k-label">${esc(heading)}</p>` : ''}
          ${c.title ? `<h3 class="fm-review-title">${esc(c.title)}</h3>` : ''}
          ${sceneHtml && n > 1 ? `<div class="fm-review-scene">${sceneHtml}</div>` : ''}
          ${fields.map(f => {
            if (f.type === 'choice') {
              const opt = id => (f.options.find(o => o.id === id) || {}).label || 'rien';
              const accepted = [].concat(f.answer || []);
              if (!accepted.length) return `<p class="review-line">${esc(f.label)} : <strong>${esc(opt(val(i, f)))}</strong></p>`;
              const ok = accepted.includes(val(i, f));
              return `${kit().picked(ok, opt(val(i, f)), accepted.map(opt).join(' ou '), f.label)}${f.why ? kit().explain(f.why) : ''}`;
            }
            if (f.type === 'chips') {
              const labels = chips(i, f).map(id => (f.options.find(o => o.id === id) || {}).label).filter(Boolean);
              return `<p class="review-line">${esc(f.label)} : <strong>${esc(labels.join(' · ') || 'aucun')}</strong></p>`;
            }
            const shown = f.type === 'select' ? ((f.options.find(o => (o.id || o) === val(i, f)) || {}).label || val(i, f)) : val(i, f);
            return `<div class="fm-review-pair ${f.model ? '' : 'is-single'}">${kit().yours(f.label || 'Votre réponse', shown)}${f.model ? kit().model(f.modelLabel || 'Une réponse possible', f.model) : ''}</div>`;
          }).join('')}
          ${c.model ? kit().model(content.modelLabel || 'Corrigé modèle', c.model) : ''}
          ${c.lesson ? ex().inlineNote(c.lesson, 'neutral') : ''}
        </section>`;
      }).join('') + `${content.keyPoint ? ex().inlineNote(content.keyPoint, 'neutral') : ''}${core().feedbackBox()}<div class="k-utility">${kit().reset()}</div>`;
    }

    function screen() {
      const reviewing = ex().reviewing();
      const at = current();
      if (!reviewing && ex().value('case') !== at) ex().setValue('case', at);
      return `<div class="k-page fm-page ${content.className || ''}">
        ${kit().head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
          aside: `${content.stepper && !reviewing ? stepper(at) : n > 1 || content.countLabel ? `<p class="k-count fm-count" data-live="fm-count">${countLine()}</p>` : ''}${content.tour && !reviewing ? kit().tourButton() : ''}` })}
        ${content.side && !reviewing && !content.stepper ? `<div class="k-panel fm-side">${scene(content.side)}</div>` : ''}
        ${reviewing ? reviewScreen() : `${tabs(at)}<form novalidate class="fm-form">${casePanel(at)}</form>`}
        ${reviewing ? '' : kit().utility(content.lock || 'Corrigé disponible après validation')}
      </div>`;
    }

    function caseErrors(values, i) {
      const fields = fieldsOf(i);
      if (!fields.length) return [];
      return fields.filter(f => !f.optional && !(f.type === 'chips'
        ? (Array.isArray(values[k(i, f)]) ? values[k(i, f)] : []).length >= (f.min || 1)
        : kit().filled(values[k(i, f)])))
        .map(f => ({ key: k(i, f), message: `${n > 1 ? `${content.caseNoun || 'Cas'} ${i + 1} : ` : ''}${f.type === 'chips' && f.min > 1 ? `choisissez au moins ${f.min} éléments` : f.type === 'choice' || f.type === 'select' ? 'faites un choix' : 'complétez'} « ${f.label || f.placeholder} ».` }));
    }

    function validate(values) {
      const at = current();
      const own = caseErrors(values, at);
      if (own.length) return own;
      const missing = cases.findIndex((_, i) => !complete(i) && i !== at);
      return missing === -1 ? [] : [{ key: 'case', message: `Complétez aussi : ${cases[missing].tab}.` }];
    }

    function intercept(values) {
      const at = current();
      if (caseErrors(values, at).length) return false;
      if (!fieldsOf(at).length) ex().setValue(k(at, 'read'), true);
      // Le cas suivant encore incomplet, sinon le premier qui l'est.
      const after = cases.findIndex((_, j) => j > at && !complete(j));
      const target = after !== -1 ? after : cases.findIndex((_, j) => !complete(j));
      if (target === -1) return false;
      ex().setValue('case', target);
      return true;
    }

    const feedback = () => [content.feedback || 'Comparez vos réponses au corrigé.'];

    kit().on({
      'fm-case': el => { ex().setValue('case', Number(el.dataset.index)); kit().commit(); },
      'fm-choice': el => { ex().setValue(el.dataset.key, el.dataset.id); kit().commit(); },
      'fm-chip': el => {
        const list = Array.isArray(ex().value(el.dataset.key)) ? ex().value(el.dataset.key).slice() : [];
        const at = list.indexOf(el.dataset.id);
        if (at === -1) list.push(el.dataset.id); else list.splice(at, 1);
        ex().setValue(el.dataset.key, list);
        kit().commit();
      },
      'fm-token': el => {
        const target = lastFocus && root.document.body.contains(lastFocus) ? lastFocus : core().$('.fm-main textarea, .fm-main input[type="text"]');
        if (!target) return;
        const token = el.dataset.token;
        const start = target.selectionStart ?? target.value.length;
        target.value = `${target.value.slice(0, start)}${token}${target.value.slice(target.selectionEnd ?? start)}`;
        ex().setValue(target.dataset.field, target.value);
        ex().changed();
        target.focus();
      }
    });
    if (root.document && typeof root.document.addEventListener === 'function') {
      // Nouveau canal choisi : l'aperçu bascule aussitôt.
      root.document.addEventListener('change', event => {
        const field = event.target && event.target.dataset && event.target.dataset.field;
        if (!field) return;
        root.document.querySelectorAll(`.fm-skin[data-skin-for="${field}"]`).forEach(el => { el.dataset.skin = event.target.value || 'none'; });
      });
      root.document.addEventListener('focusin', event => {
        if (event.target.matches && event.target.matches('.fm-main textarea, .fm-main input[type="text"]')) lastFocus = event.target;
      });
    }
    kit().live(() => {
      const at = current();
      const parts = { 'fm-count': countLine() };
      fieldsOf(at).filter(f => f.type === 'chips').forEach(f => { parts[`chips-${k(at, f)}`] = chipsLine(at, f); });
      return parts;
    });
    const dialogTable = {};
    if (content.hint) dialogTable.hint = { title: content.hintLabel || 'Un repère', html: `<p>${esc(content.hint)}</p>` };
    cases.forEach((c, i) => { if (c.hint) dialogTable[`hint${i}`] = { title: content.hintLabel || 'Un repère', html: `<p>${esc(c.hint)}</p>` }; });
    if (content.resources) dialogTable.resources = { title: content.resourcesTitle || 'Vos ressources', html: `<ul class="dialog-list">${content.resources.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` };
    kit().dialogs(dialogTable);

    if (content.tour) kit().tour(key, content.tour);
    ex().mount(key, { screen, validate, intercept, feedback, compactFeedback: true });
  }

  root.AtelierMounts = Object.freeze({ scene, mountDeck, mountMatch, mountCompare, mountForm });
})(globalThis);
