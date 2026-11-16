/* S5 5.2 · Votre réponse, votre voix (fiche M1.2.1, A5).
 *
 * Cinq étapes : choisir une fiche client, répondre à ses trois répliques
 * (compréhension, adaptation au signal, synthèse avec validation), puis
 * s'enregistrer à l'oral et remplir la grille Oui / Non de la fiche. En
 * relecture : chaque réponse face au corrigé modèle de la fiche choisie,
 * la grille, et ce qu'il faut déposer sur la plateforme (texte copiable,
 * enregistrement téléchargeable avant de quitter la page).
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const media = window.AtelierMedia;
  const ouvert = window.AtelierOuvert;
  const KEY = 's5-5.2';
  const { esc, icon } = kit;
  const content = window.ATELIER_S5['5.2'];
  const { fiches, tasks } = content;
  const ORAL = 4;
  const YES_NO = [{ id: 'oui', label: 'Oui' }, { id: 'non', label: 'Non' }];

  const fiche = () => fiches.find(f => f.id === ex.value('fiche')) || null;
  const answer = k => ex.value(`r${k}`);
  const stepDone = k => (k === 0 ? Boolean(fiche()) : k <= 3 ? kit.filled(answer(k)) : false);
  const reachable = k => Array.from({ length: k }, (_, i) => i).every(stepDone);
  const at = () => {
    const asked = Number(ex.value('at')) || 0;
    if (reachable(asked)) return Math.min(asked, ORAL);
    const free = [0, 1, 2, 3].find(k => !stepDone(k));
    return free === undefined ? ORAL : free;
  };
  /* L'ENREGISTREMENT, GARDÉ DANS LE NAVIGATEUR (IndexedDB), un par client :
   * on le retrouve à l'étape de l'oral et dans « À déposer », même après un
   * rechargement. Rien n'est envoyé : l'apprenant le télécharge et le dépose. */
  const AUDIO_DB = 'decouverte-client-1-2-1-audio';
  const recordings = {};   // client → { blob, url }
  const extOf = type => (/ogg/.test(type) ? 'ogg' : /mp4|aac/.test(type) ? 'm4a' : 'webm');
  const fileName = (f, blob) => `entretien-${f.name.toLowerCase().replace(/^(m\.|mme)\s*/, '').replace(/[^a-z]+/g, '-')}.${extOf(blob.type)}`;
  function audioStore(mode, fn) {
    return new Promise(resolve => {
      if (!window.indexedDB) { resolve(null); return; }
      const open = indexedDB.open(AUDIO_DB, 1);
      open.onupgradeneeded = () => open.result.createObjectStore('audio');
      open.onerror = () => resolve(null);
      open.onsuccess = () => {
        try {
          const req = fn(open.result.transaction('audio', mode).objectStore('audio'));
          req.onsuccess = () => resolve(req.result ?? null);
          req.onerror = () => resolve(null);
        } catch { resolve(null); }
      };
    });
  }
  function keep(id, blob) {
    if (recordings[id]) URL.revokeObjectURL(recordings[id].url);
    recordings[id] = { blob, url: URL.createObjectURL(blob) };
  }
  const saveRecording = (id, blob) => { keep(id, blob); audioStore('readwrite', st => st.put(blob, id)); };
  let loaded = false;
  function loadRecordings() {
    if (loaded) return;
    loaded = true;
    Promise.all(fiches.map(x => audioStore('readonly', st => st.get(x.id)).then(blob => { if (blob) keep(x.id, blob); })))
      .then(() => { if (Object.keys(recordings).length) ex.rebuild(); });
  }
  const recordingOf = f => (f && recordings[f.id]) || null;

  const go = k => { ex.setValue('at', k); ex.rebuild(); window.scrollTo({ top: 0, behavior: 'instant' }); };

  // Une réplique : le geste entre crochets à part, les mots du client ensuite.
  const gestureOf = line => (line.match(/^\[([^\]]+)\]/) || [])[1] || '';
  const wordsOf = line => line.replace(/^\[[^\]]+\]\s*/, '');

  /* Un même entretien en trois moments : leur nom (barre d'étapes, repère de
   * parcours, boutons) et la façon dont le client prend la parole. */
  const MOMENTS = ['Comprendre le client', 'Tenir compte du signal', 'Faire la synthèse'];
  const SPEAKS = ['Au début de l’entretien, {nom} vous dit', 'Un peu plus tard, {nom} ajoute', 'Pour finir, {nom} vous dit'];
  const STEP_LABELS = ['Le client', ...MOMENTS, 'Oral et grille'];

  /* Le repère de parcours : « Un même entretien avec M. Garnier, en trois
   * moments », les trois moments, celui en cours mis en avant. */
  const moments = (f, k) => `<div class="a5-moments">
      <span class="a5-moments-title">Un même entretien avec ${esc(f.name)}, en trois moments</span>
      <ol>${MOMENTS.map((m, i) => `<li class="${i + 1 === k ? 'is-current' : i + 1 < k ? 'is-done' : ''}" ${i + 1 === k ? 'aria-current="step"' : ''}><span class="a5-moments-n">${i + 1 < k ? icon('check', { size: 12, strokeWidth: 3 }) : i + 1}</span>${esc(m)}</li>`).join('')}</ol>
    </div>`;
  const stepIsDone = i => stepDone(i);
  const stepReachable = i => reachable(i);
  /* La barre d'étapes des autres exercices (moteur : .k-progress-*), dans
   * l'en-tête : flèche, « Étapes 2 / 5 », un segment par étape (plein :
   * faite ; cerclé : en cours), flèche. */
  function progress(k) {
    const go = (i, dir) => {
      const ok = i >= 0 && i < STEP_LABELS.length && stepReachable(i);
      return `<button type="button" class="k-progress-arrow" data-act="a5-go" data-index="${i}" ${ok ? '' : 'disabled'} aria-label="${dir === 'prev' ? 'Précédent' : 'Suivant'}${ok ? ` : ${esc(STEP_LABELS[i])}` : ''}" title="${ok ? esc(STEP_LABELS[i]) : ''}">${icon(dir === 'prev' ? 'arrowLeft' : 'arrowRight', { size: 18 })}</button>`;
    };
    const segs = STEP_LABELS.map((label, i) => `<button type="button" class="k-progress-seg ${stepIsDone(i) ? 'is-done' : ''} ${i === k ? 'is-current' : ''}" data-act="a5-go" data-index="${i}" ${stepReachable(i) ? '' : 'disabled'} ${i === k ? 'aria-current="step"' : ''} aria-label="${esc(label)}" title="${esc(label)}"></button>`).join('');
    return `<p class="k-count fm-count is-progress">${go(k - 1, 'prev')}<span class="k-progress-label">${esc(STEP_LABELS[k] || 'Étapes')}</span><strong>${Math.min(k + 1, STEP_LABELS.length)} / ${STEP_LABELS.length}</strong><span class="k-progress-segs" role="group" aria-label="Étapes">${segs}</span>${go(k + 1, 'next')}</p>`;
  }


  /* ── Étape 0 : le choix du client ───────────────────────────────────── */
  /* Trois cartes de client : le portrait, le secteur, le lieu, le client.
   * Un clic sur la carte la choisit (contour bleu, coche). */
  const portrait = name => esc(core.asset(`assets/illustrations/clients/${name}.webp`));
  function choose() {
    const chosen = ex.value('fiche');
    return `<section class="k-panel a5-choose">
        <p class="k-label">Choisissez le client le plus proche de votre futur métier</p>
        <p class="a5-choose-help">Vous menez ensuite <strong>un seul entretien</strong> avec lui, en trois moments : comprendre le client, tenir compte de son signal, faire la synthèse.</p>
        <div class="a5-fiches" role="radiogroup" aria-label="Le client">${fiches.map((x, i) => `<button type="button" class="a5-fiche ${chosen === x.id ? 'is-on' : ''}" role="radio" aria-checked="${chosen === x.id}" data-act="a5-fiche" data-id="${esc(x.id)}" ${i === 0 ? 'data-field="fiche"' : ''}>
            <span class="a5-fiche-art"><img src="${portrait(x.portrait)}" alt="" decoding="async"></span>
            <span class="a5-fiche-body"><span class="a5-fiche-sector">${esc(x.sector)}</span><strong>${esc(x.title)}</strong><span class="a5-fiche-who">${esc(x.profile)}</span></span>
            <span class="a5-fiche-check" aria-hidden="true">${icon('check', { size: 16, strokeWidth: 3 })}</span>
          </button>`).join('')}</div>
        <p class="a5-choose-rule">${icon('ban', { size: 15 })}<span>${esc(content.forbidden)}</span></p>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ right: kit.submit('Écouter le client') })}`;
  }

  /* Le fil de l'entretien, en tête des moments 2 et 3 : ce que vous venez
   * de lui répondre, puis ce qui se passe ensuite (`bridges`). */
  const thread = (f, k) => {
    const text = [f.bridges && f.bridges[k - 1], gestureOf(f.lines[k - 1]) && `${gestureOf(f.lines[k - 1])}.`].filter(Boolean).join(' ');
    return k > 1 && text ? `<p class="a5-thread-next">${esc(text)}</p>` : '';
  };

  /* Ce que le client a déjà dit : seulement à la réplique 3, où la synthèse
   * doit reprendre tout l'échange. Ses mots seuls, affichés d'emblée. */
  const history = (f, k) => (k === 3 ? `<div class="a5-said">
      <p class="a5-said-title">Ce que ${esc(f.name)} vous a dit</p>
      <ol>${f.lines.slice(0, 2).map(line => `<li>« ${esc(wordsOf(line))} »</li>`).join('')}</ol>
    </div>` : '');

  /* ── Étapes 1 à 3 : une réplique, une réponse ───────────────────────── */
  function reply(k) {
    const f = fiche();
    const line = f.lines[k - 1];
    const gesture = gestureOf(line);
    const task = tasks[k - 1];
    /* Un seul panneau : le client en bandeau, puis sa réplique (gauche) et
     * votre réponse (droite), côte à côte et de même hauteur. */
    return `<section class="k-panel a5-exchange">
        <div class="a5-exchange-head">
          ${k === 1 ? `<p class="a4-role">${esc(f.context || f.profile)}</p>` : ''}
          ${history(f, k)}
        </div>
        <div class="a5-exchange-client">
          ${thread(f, k)}
          ${kit.clientCard(wordsOf(line), f.portrait, `Moment ${k} sur 3 · ${SPEAKS[k - 1].replace('{nom}', f.name)}`)}
          <p class="a5-task"><strong>${esc(task.title)} :</strong> ${esc(task.text.charAt(0).toLowerCase() + task.text.slice(1))}</p>
        </div>
        <div class="a5-exchange-you">
          <div class="a5-you-card">
            <p class="client-card-label a5-you-label"><span class="a4-avatar" aria-hidden="true">V</span><span>Vous lui répondez</span></p>
            ${ex.field(`r${k}`, task.title, { placeholder: 'Votre réponse, comme vous la diriez…', max: k === 3 ? 700 : 400, rows: k === 3 ? 5 : 4, hideLabel: true })}
          </div>
        </div>
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('a5-prev', k === 1 ? 'Changer de client' : `Revenir au moment ${k - 1}`),
        right: kit.submit(k < 3 ? 'Suite de l’entretien' : 'Passer à l’oral') })}`;
  }

  /* ── Étape 4 : l'oral, puis la grille ───────────────────────────────── */
  function oral() {
    const f = fiche();
    return `<section class="k-panel a5-oral">
        <p class="k-label">${esc(content.oral.title)}</p>
        <p>${esc(content.oral.text)}</p>
        <ol class="a5-script">${[1, 2, 3].map(k => `<li><span class="a5-script-client">${esc(f.name)} : « ${esc(wordsOf(f.lines[k - 1]))} »</span><span class="a5-script-you">« ${esc(answer(k))} »</span></li>`).join('')}</ol>
        <div class="oral-practice">
          ${kit.act('a5-record', `${icon('microphone', { size: 18 })}<span>Commencer l’enregistrement</span>`, 'secondary', 'id="record-button"')}
          <p class="asset-note" id="record-status">${recordingOf(f) ? 'Votre dernier enregistrement est prêt : réécoutez-le, ou recommencez.' : 'Votre enregistrement reste dans ce navigateur : vous le retrouverez au moment du dépôt.'}</p>
          <audio id="record-playback" controls ${recordingOf(f) ? `src="${recordingOf(f).url}"` : 'hidden'} aria-label="Réécouter votre enregistrement"></audio>
          <a id="record-download" class="button secondary small" ${recordingOf(f) ? `href="${recordingOf(f).url}" download="${esc(fileName(f, recordingOf(f).blob))}"` : 'hidden'}>${icon('arrowDown', { size: 16 })}<span>Télécharger l’enregistrement</span></a>
        </div>
      </section>
      <section class="k-panel a5-self">
        <p class="k-label">Auto-évaluation · avant le corrigé</p>
        ${kit.matrix({ key: 'self', rows: content.selfCheck, columns: YES_NO, head: 'Critère', round: true })}
      </section>
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('a5-prev', 'Revenir au moment 3'), right: kit.submit('Voir le corrigé') })}`;
  }

  /* ── Relecture ──────────────────────────────────────────────────────── */
  const allText = f => `Entretien avec ${f.name} · ${f.title}\n\n` + [1, 2, 3].map(k => `Moment ${k} · ${MOMENTS[k - 1]}\n${f.name} : « ${wordsOf(f.lines[k - 1])} »\nMa réponse : ${answer(k)}`).join('\n\n');

  /* Une réponse au corrigé : la réplique du client, votre réponse (mots
   * repérés surlignés) et son score, ce qu'une bonne réponse contient (en
   * pastilles, le conseil en info-bulle), puis la réponse possible. */
  const MARK = { ok: '✓', part: '◐', miss: '○', warn: '!' };
  function answerReview(f, k) {
    const text = answer(k);
    const bloc = ouvert && ouvert.blocOf(KEY, k - 1);
    const pts = bloc && bloc.max ? Math.round(bloc.earned / bloc.max * 10 * 2) / 2 : null;
    const chips = bloc ? `<ul class="a4-expect a5-expect">${bloc.lines.map(item => {
        const tip = item.kind === 'warn' ? `Repéré : ${(item.found || []).map(w => `« ${w} »`).join(', ')}. ${item.conseil || ''}` : item.kind === 'ok' ? '' : (item.conseil || '');
        return `<li class="is-${item.kind}" ${tip ? `tabindex="0" data-tip="${esc(tip)}"` : ''}><span aria-hidden="true">${MARK[item.kind] || ''}</span>${esc(item.nom)}</li>`;
      }).join('')}</ul>` : '';
    return `<div class="a5-review-step">
      <div class="a5-rv-head">
        <h2 class="a5-review-title"><span class="a4-step-n">${k}</span>${esc(MOMENTS[k - 1])}</h2>
        ${pts !== null ? `<span class="a4-just-score"><b>${String(pts).replace('.', ',')}</b> / 10</span>` : ''}
      </div>
      <p class="a5-rv-client">${esc(f.name)} : « ${esc(wordsOf(f.lines[k - 1]))} »</p>
      <div class="a5-rv-grid">
        <div class="a5-rv-you">
          <p class="a5-rv-label">Vous</p>
          ${ouvert ? ouvert.quote(KEY, k - 1, text) : `<p>« ${esc(text)} »</p>`}
          ${kit.filled(text) ? chips : ''}
        </div>
        <div class="a5-rv-model">
          <p class="a5-rv-label">Une réponse possible</p>
          <p class="a5-rv-model-text">« ${esc(f.models[k - 1])} »</p>
          ${f.notes[k - 1] ? `<p class="a5-rv-note">${esc(f.notes[k - 1])}</p>` : ''}
        </div>
      </div>
    </div>`;
  }

  function review() {
    const f = fiche();
    if (ouvert) ouvert.forCase(KEY, fiches.indexOf(f));
    const scored = ouvert && ouvert.result(KEY);
    const yes = content.selfCheck.filter((_, i) => ex.value(`self${i}`) === 'oui').length;
    return `<section class="k-panel a5-review">
        <p class="a4-review-head"><span class="k-label">${esc(f.sector)} · ${esc(f.title)} · ${esc(f.name)}</span>${scored ? `<span class="a4-review-count">Vos trois réponses : <b>${String(scored.points).replace('.', ',')}</b> / 10</span>` : ''}</p>
        ${[1, 2, 3].map(k => answerReview(f, k)).join('')}
        <p class="k-muted">Ce sont des exemples, pas des réponses uniques : toute réponse qui respecte la grille est valable.</p>
      </section>
      <section class="k-panel a5-review">
        <p class="a4-review-head"><span class="k-label">Mon auto-évaluation</span><span class="a4-review-count"><b>${yes}</b> / ${content.selfCheck.length} critères cochés « Oui »</span></p>
        <ul class="a5-self-recap">${content.selfCheck.map((row, i) => `<li><span class="pos-level level-${ex.value(`self${i}`) === 'oui' ? '2' : '0'}">${ex.value(`self${i}`) === 'oui' ? 'Oui' : 'Non'}</span><span>${esc(row.text)}</span></li>`).join('')}</ul>
      </section>
      <section class="k-panel a5-deposit">
        <div class="a5-dep-head">
          <p class="k-label">${icon('folder', { size: 16 })} À déposer sur la plateforme</p>
          ${kit.act('a5-copy', `${icon('document', { size: 18 })}<span>Copier mes réponses</span>`, 'primary small')}
        </div>
        <ul class="a5-dep-list">
          <li><span class="a5-dep-n">1</span><span><strong>Vos trois réponses</strong>, en texte : copiez-les avec le bouton, puis collez-les dans votre dépôt.</span></li>
          <li><span class="a5-dep-n">2</span><span><strong>Votre enregistrement</strong> : ${recordingOf(f) ? 'téléchargez-le ici, puis joignez le fichier à votre dépôt.' : 'vous n’en avez pas encore fait. Revenez à l’étape de l’oral pour vous enregistrer.'}</span></li>
        </ul>
        ${recordingOf(f) ? `<div class="a5-dep-audio"><audio controls src="${recordingOf(f).url}" aria-label="Votre enregistrement"></audio>
          <a class="button primary small" href="${recordingOf(f).url}" download="${esc(fileName(f, recordingOf(f).blob))}">${icon('arrowDown', { size: 16 })}<span>Télécharger l’enregistrement</span></a></div>` : ''}
        <p class="a5-dep-after">Votre tuteur (ou un pair) vous fera un retour avec la même grille.</p>
        <div class="a5-dep-cards">${[1, 2, 3].map(k => `<article class="a5-dep-card">
          <p class="a5-dep-moment"><span class="a4-step-n">${k}</span>${esc(MOMENTS[k - 1])}</p>
          <p class="a5-dep-client">${esc(f.name)} : « ${esc(wordsOf(f.lines[k - 1]))} »</p>
          <p class="a5-dep-you">« ${esc(answer(k))} »</p>
        </article>`).join('')}</div>
      </section>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing() && fiche();
    const k = at();
    return `<div class="k-page a4-page a5-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : progress(k) + kit.tourButton() })}
      <form novalidate>${reviewing ? review() : k === 0 ? choose() : k <= 3 ? reply(k) : oral()}</form>
    </div>`;
  }

  function validate(values) {
    const k = at();
    if (k === 0) return values.fiche ? [] : [{ key: 'fiche', message: 'Choisissez un client.' }];
    if (k <= 3) return kit.filled(values[`r${k}`]) ? [] : [{ key: `r${k}`, message: `Écrivez votre réponse (moment ${k} : ${MOMENTS[k - 1].toLowerCase()}).` }];
    const missing = content.selfCheck.findIndex((_, i) => !values[`self${i}`]);
    return missing === -1 ? [] : [{ key: `self${missing}`, message: `Répondez Oui ou Non à chacun des ${content.selfCheck.length} critères.` }];
  }

  function intercept() {
    const k = at();
    if (k < ORAL && stepDone(k)) { media.stopAll(); ex.setValue('at', k + 1); return true; }
    return false;
  }

  const feedback = () => ['Pensez à déposer le texte de vos réponses et votre enregistrement : votre tuteur vous répondra avec la même grille.'];

  kit.on({
    'a5-fiche': control => {
      /* Un brouillon par client : en changeant de client, les réponses du
       * précédent sont mises de côté (`<client>_r1`…) et celles du nouveau
       * reviennent (vides la première fois). L'auto-évaluation, qui porte
       * sur ces réponses, repart de zéro. */
      const before = ex.value('fiche');
      const next = control.dataset.id;
      if (before && before !== next) {
        [1, 2, 3].forEach(k => {
          ex.setValue(`${before}_r${k}`, answer(k));
          ex.setValue(`r${k}`, ex.value(`${next}_r${k}`) || '');
        });
        content.selfCheck.forEach((_, i) => ex.setValue(`self${i}`, ''));
      }
      ex.setValue('fiche', next);
      ex.changed();
      document.querySelectorAll('.a5-fiche').forEach(card => {
        const on = card.dataset.id === control.dataset.id;
        card.classList.toggle('is-on', on);
        card.setAttribute('aria-checked', String(on));
      });
    },
    'a5-go': control => { media.stopAll(); go(Number(control.dataset.index)); },
    'a5-prev': () => { media.stopAll(); go(Math.max(0, at() - 1)); },
    'a5-record': () => {
      const f = fiche();
      media.toggleRecording({ max: content.oral.max, status: 'Enregistrement prêt : réécoutez-vous. Vous le retrouverez aussi au moment du dépôt.',
        onRecorded: blob => {
          saveRecording(f.id, blob);
          const link = document.querySelector('#record-download');
          if (link) link.download = fileName(f, blob);
        } });
    },
    'a5-copy': () => {
      const text = allText(fiche());
      const done = () => core.toast('Vos réponses sont copiées : collez-les dans votre dépôt.');
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => core.toast('Copie impossible : sélectionnez le texte ci-dessus.'));
      else core.toast('Copie impossible : sélectionnez le texte ci-dessus.');
    }
  });

  kit.tour('s5-5.2', [
    { target: '.a5-fiches', title: 'Votre client', text: 'Choisissez la fiche la plus proche de votre futur métier : commerce, entre entreprises ou immobilier. Vous menez ensuite un seul entretien avec ce client.' },
    { target: '.k-count.is-progress', title: 'Les étapes', text: 'Un même entretien, en trois moments. Une réponse à chaque moment :',
      items: [
        { key: '1', tone: 'blue', text: 'une réponse en attitude de compréhension ;' },
        { key: '2', tone: 'gold', text: 'une réponse adaptée au signal non verbal ;' },
        { key: '3', tone: 'green', text: 'une synthèse qui se termine par une validation.' }
      ],
      after: 'Puis l’oral et votre auto-évaluation.' },
    // L'oral, la première fois qu'on y arrive.
    { later: true, target: '.a5-oral .oral-practice', title: 'L’enregistrement', text: 'Lisez vos trois réponses à voix haute, réécoutez-vous, puis téléchargez le fichier pour le déposer.' },
    { later: true, target: '.a5-self', title: 'Votre auto-évaluation', text: 'Oui ou non pour chaque critère, avant de voir le corrigé. Votre tuteur utilisera la même grille.' }
  ]);

  loadRecordings();

  ex.mount('s5-5.2', { screen, validate, feedback, intercept, compactFeedback: true });
})();
