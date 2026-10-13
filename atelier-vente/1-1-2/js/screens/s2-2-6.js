/* S2 2.6 · Le pitch de 60 secondes.
 *
 * Trois temps :
 *   1 · RÉDIGER : le texte, avec son nombre de mots et sa durée estimée,
 *       puis la structure cochée (accroche, 2 bénéfices prouvés, conclusion) ;
 *   2 · ENREGISTRER : une prise audio ou vidéo, arrêtée d'office à 60 s ;
 *   3 · S'ÉVALUER : réécouter, puis noter les 7 critères de 0 à 2.
 *
 * La prise reste dans la mémoire de la page : elle n'est ni envoyée, ni
 * conservée dans le brouillon. Sans micro, on peut passer à l'évaluation.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.6'];
  const LIMIT = 60;
  const criteria = content.criteria;
  const max = criteria.length * 2;

  const stage = () => kit.stage(3);
  const format = () => (ex.value('format') === 'video' ? 'video' : 'audio');
  const pitch = () => ex.value('pitch');
  const wordsLine = () => `${kit.plural(kit.words(pitch()), 'mot')} · ≈ ${kit.seconds(pitch())} s`;
  const notes = () => criteria.map((_, i) => ex.value(`score${i}`));
  const total = () => (notes().every(v => v !== '') ? notes().reduce((sum, v) => sum + Number(v), 0) : null);
  const totalText = () => `Total : ${total() === null ? '-' : total()} / ${max}`;
  const clock = s => (s >= 60 ? '01:00' : `00:${String(s).padStart(2, '0')}`);

  /* ── La prise, gardée en mémoire tant que la page est ouverte ──────── */
  let recorder = null;
  let stream = null;
  let takeUrl = null;
  let takeKind = null;
  let started = 0;
  let ticker = null;
  let stopper = null;

  function stopStream() {
    clearInterval(ticker);
    clearTimeout(stopper);
    stream?.getTracks().forEach(track => track.stop());
    stream = null;
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      core.toast('L’enregistrement nécessite un navigateur compatible, sur localhost ou HTTPS. Vous pouvez vous entraîner à voix haute, puis passer à l’auto-évaluation.');
      return;
    }
    const kind = format();
    try {
      stream = await navigator.mediaDevices.getUserMedia(kind === 'video' ? { audio: true, video: true } : { audio: true });
    } catch {
      core.toast('Micro ou caméra indisponible, ou autorisation refusée. Vous pouvez passer à l’auto-évaluation.');
      return;
    }
    const chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    recorder.onstop = () => {
      const seconds = Math.min(LIMIT, Math.round((Date.now() - started) / 1000));
      stopStream();
      if (takeUrl) URL.revokeObjectURL(takeUrl);
      takeUrl = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || (kind === 'video' ? 'video/webm' : 'audio/webm') }));
      takeKind = kind;
      recorder = null;
      ex.setValue('recorded', seconds);
      ex.setValue('take', (Number(ex.value('take')) || 0) + 1);
      ex.setValue('takeKind', kind);
      kit.commit();
    };
    recorder.start();
    started = Date.now();
    const live = core.$('#rec-live');
    if (live && kind === 'video') { live.srcObject = stream; live.hidden = false; live.play?.(); }
    paintRecording(true);
    ticker = setInterval(() => {
      const elapsed = Math.floor((Date.now() - started) / 1000);
      const time = core.$('#rec-time');
      if (time) time.textContent = clock(elapsed);
    }, 250);
    stopper = setTimeout(() => { if (recorder?.state === 'recording') recorder.stop(); }, LIMIT * 1000);
  }

  function paintRecording(on) {
    const button = core.$('[data-act="record"]');
    if (button) button.innerHTML = on ? `${icon('pauseCircle', { size: 20 })}<span>Arrêter l’enregistrement</span>` : `<span class="rec-dot"></span><span>Démarrer l’enregistrement</span>`;
    const status = core.$('#rec-status');
    if (status) status.textContent = on ? 'Enregistrement en cours…' : 'Prêt à enregistrer';
    core.$('.rec-stage')?.classList.toggle('is-recording', on);
  }

  function toggleRecording() {
    if (recorder?.state === 'recording') { recorder.stop(); return; }
    startRecording();
  }

  /* ── Étape 1 : rédiger ─────────────────────────────────────────────── */
  function contractPanel() {
    return `<aside class="k-panel pitch-contract">
      <p class="k-label">Le contrat des 60 s</p>
      <p class="pitch-clock">${icon('clock', { size: 64 })}<strong>60 s</strong></p>
      <p>Prospect : très attentif à la sécurité</p>
      <p class="k-label">Structure attendue</p>
      <ol class="pitch-structure">${content.structure.map(item => `<li>${esc(item)}</li>`).join('')}</ol>
      <p class="pitch-tone">Ton affirmatif · Orienté client</p>
    </aside>`;
  }

  function writeStep() {
    return `<div class="k-columns pitch-layout">
      ${contractPanel()}
      <form class="k-panel" novalidate>
        <h2>1. Rédigez votre discours</h2>
        <p class="k-instruction">Préparez un texte suffisamment court pour être prononcé en moins d’une minute.</p>
        ${ex.field('pitch', 'Votre pitch', { placeholder: 'Votre pitch…', max: 1200, rows: 8, hideLabel: true })}
        <p class="pitch-words" data-live="words">${esc(wordsLine())}</p>
        <fieldset class="pitch-parts"><legend>Structure de votre discours</legend>${content.parts.map((part, i) => `
          <label class="pitch-part"><input type="checkbox" data-field="part${i}" ${ex.value(`part${i}`) === true ? 'checked' : ''}><span>${esc(part)}</span></label>`).join('')}
        </fieldset>
        ${core.errorsBox()}
        ${kit.bar({ left: kit.reset(), right: `${kit.dialogButton('example', 'Voir un exemple', 'secondary', '')}${kit.submit('Enregistrer mon texte et continuer')}` })}
      </form>
    </div>`;
  }

  /* ── Étape 2 : enregistrer ─────────────────────────────────────────── */
  function recordStep() {
    const kind = format();
    const has = Boolean(takeUrl);
    return `<div class="k-columns pitch-layout is-record">
      <aside class="k-panel pitch-text">
        <div class="pitch-text-head"><p class="k-label">Votre texte</p><button type="button" class="text-button with-icon" data-act="to-stage" data-stage="1">${icon('pencil', { size: 15 })}<span>Modifier</span></button></div>
        <p class="pitch-text-body">${esc(pitch())}</p>
        <p class="pitch-words">${esc(wordsLine())}</p>
        <p class="pitch-tone">Accroche · 2 bénéfices prouvés · Conclusion</p>
      </aside>
      <form class="k-panel" novalidate>
        <h2>2. Enregistrez votre pitch</h2>
        <p class="k-instruction">Choisissez votre format, puis lancez une prise de 60 secondes maximum.</p>
        <div class="rec-format" role="radiogroup" aria-label="Format">
          <button type="button" class="rec-format-option ${kind === 'audio' ? 'is-on' : ''}" data-act="format" data-format="audio" role="radio" aria-checked="${kind === 'audio'}">${icon('microphone', { size: 20 })}<span>Audio</span></button>
          <button type="button" class="rec-format-option ${kind === 'video' ? 'is-on' : ''}" data-act="format" data-format="video" role="radio" aria-checked="${kind === 'video'}">${icon('video', { size: 20 })}<span>Vidéo</span></button>
        </div>
        <div class="rec-stage">
          <span class="rec-symbol">${icon(kind === 'video' ? 'video' : 'microphone', { size: 40 })}</span>
          <video id="rec-live" class="rec-live" muted playsinline hidden></video>
          <p id="rec-status" role="status">${has ? `Prise ${ex.value('take')} enregistrée` : 'Prêt à enregistrer'}</p>
          <p class="rec-time"><strong id="rec-time">${has ? clock(Number(ex.value('recorded')) || 0) : '00:00'}</strong><span> / 01:00</span></p>
          <span class="rec-wave" aria-hidden="true">${Array.from({ length: 48 }, (_, i) => `<i style="height:${6 + ((i * 37) % 22)}px"></i>`).join('')}</span>
          <button type="button" class="button primary rec-button" data-act="record"><span class="rec-dot"></span><span>${has ? 'Refaire une prise' : 'Démarrer l’enregistrement'}</span></button>
          <p class="k-muted">Le chronomètre s’arrête automatiquement à 60 secondes.</p>
        </div>
        ${core.errorsBox()}
        ${kit.bar({
          left: kit.back('to-stage-back', 'Retour au texte'),
          center: has ? '' : '<button type="button" class="text-button" data-act="skip-record">Continuer sans enregistrer</button>',
          right: kit.submit('Passer à l’auto-évaluation', has ? '' : 'data-pending="true"')
        })}
      </form>
    </div>`;
  }

  /* ── Étape 3 : s'évaluer ───────────────────────────────────────────── */
  function evaluateStep() {
    const seconds = Number(ex.value('recorded')) || 0;
    const media = takeUrl
      ? (takeKind === 'video' ? `<video class="rec-player" src="${takeUrl}" controls playsinline></video>` : `<audio class="rec-player" src="${takeUrl}" controls></audio>`)
      : `<p class="k-muted">${seconds ? 'La prise n’est plus en mémoire : elle s’efface en quittant la page.' : 'Aucune prise enregistrée : évaluez votre lecture à voix haute.'}</p>`;
    return `<div class="k-columns pitch-layout is-evaluate">
      <aside class="k-panel">
        <p class="k-label">Votre enregistrement</p>
        ${seconds ? `<p class="k-muted">Prise ${ex.value('take') || 1} · ${ex.value('takeKind') === 'video' ? 'Vidéo' : 'Audio'}</p>` : ''}
        ${media}
        ${seconds ? `<p class="rec-duration">Durée : ${seconds} s · ${seconds <= LIMIT ? `<span class="is-ok">Limite respectée ${icon('check', { size: 16 })}</span>` : 'Limite dépassée'}</p>` : ''}
        ${kit.act('to-stage', `${icon('refresh', { size: 18 })}<span>Refaire une prise</span>`, 'secondary', 'data-stage="2"')}
        <p class="k-label rec-listen-title">À écouter attentivement</p>
        <ul class="rec-listen">${content.listen.map(item => `<li>${esc(item)}</li>`).join('')}</ul>
      </aside>
      <form class="k-panel" novalidate>
        <h2>3. Auto-évaluez votre prestation</h2>
        <p class="k-instruction">Réécoutez votre prise, puis attribuez de 0 à 2 points à chaque critère.</p>
        ${kit.matrix({ key: 'score', rows: criteria, columns: [{ id: '0', label: '0', sub: 'À retravailler' }, { id: '1', label: '1', sub: 'En bonne voie' }, { id: '2', label: '2', sub: 'Maîtrisé' }], head: 'Critère et indicateur', round: true, numbered: false })}
        <p class="audit-total" data-live="total">${esc(totalText())}</p>
        ${core.errorsBox()}
        ${kit.bar({ left: kit.back('to-stage-back', 'Réécouter'), right: kit.submit('Valider mon auto-évaluation') })}
      </form>
    </div>`;
  }

  function reviewScreen() {
    return `<section class="k-panel">
      ${kit.result(total(), max, 'votre auto-évaluation')}
      ${kit.yours('Votre pitch', pitch())}
      <p class="pitch-words">${esc(wordsLine())}${Number(ex.value('recorded')) ? ` · prise de ${ex.value('recorded')} s` : ''}</p>
      <ul class="pitch-score-list">${criteria.map((c, i) => `<li><span>${esc(c.title)}</span><strong>${ex.value(`score${i}`)} / 2</strong></li>`).join('')}</ul>
      ${kit.model('Un exemple de pitch en 60 s', content.example)}
      ${ex.inlineNote('Pour progresser, retravaillez en priorité les critères notés 0, puis refaites une prise : le chrono reste le meilleur juge de la concision.', 'neutral')}
    </section>
    ${core.feedbackBox()}
    <div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = stage();
    const body = reviewing ? reviewScreen() : at === 1 ? writeStep() : at === 2 ? recordStep() : evaluateStep();
    return `<div class="k-page pitch-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count">${reviewing ? 'Terminé' : `Étape <strong>${at} sur 3</strong>`}</p><span class="pitch-badge">${esc(content.badge)}</span>` })}
      ${reviewing ? '' : kit.steps(['Rédiger', 'Enregistrer', 'S’évaluer'], at)}
      ${body}
      ${reviewing ? '' : kit.utility('L’enregistrement reste sur cet appareil et s’efface en quittant la page.')}
    </div>`;
  }

  function validate(values) {
    const at = stage();
    if (!kit.filled(values.pitch)) return [{ key: 'pitch', message: 'Rédigez votre pitch.' }];
    if (kit.words(values.pitch) > 200) return [{ key: 'pitch', message: 'Votre texte dépasse largement une minute : visez 150 mots maximum.' }];
    if (at < 3) return [];
    const missing = criteria.map((_, i) => i).filter(i => !values[`score${i}`]);
    return missing.length ? [{ key: `score${missing[0]}`, message: `Notez les ${criteria.length} critères (${missing.length} sans note).` }] : [];
  }

  function intercept(values) {
    const at = stage();
    if (at === 3 || validate(values).length) return false;
    if (recorder?.state === 'recording') recorder.stop();
    kit.setStage(at + 1);
    return true;
  }

  const feedback = () => [`Auto-évaluation : ${total()} / ${max}. Comparez votre texte au pitch modèle du corrigé.`];

  kit.on({
    record: () => toggleRecording(),
    format: el => { if (recorder?.state === 'recording') return; ex.setValue('format', el.dataset.format); kit.commit(); },
    'to-stage': el => { if (recorder?.state === 'recording') recorder.stop(); kit.setStage(Number(el.dataset.stage)); kit.commit(); },
    'to-stage-back': () => { if (recorder?.state === 'recording') recorder.stop(); kit.setStage(Math.max(1, stage() - 1)); kit.commit(); },
    'skip-record': () => { kit.setStage(3); kit.commit(); }
  });
  kit.live(() => ({ words: esc(wordsLine()), total: esc(totalText()) }));
  kit.dialogs({ example: { title: 'Un exemple de pitch en 60 secondes', html: `<p>${esc(content.example)}</p><p class="k-muted">Environ 70 mots, soit une trentaine de secondes à l’oral : il reste de la marge pour respirer.</p>` } });

  window.addEventListener('pagehide', () => { if (recorder?.state === 'recording') { recorder.onstop = null; recorder.stop(); } stopStream(); if (takeUrl) URL.revokeObjectURL(takeUrl); });

  ex.mount('s2-2.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
