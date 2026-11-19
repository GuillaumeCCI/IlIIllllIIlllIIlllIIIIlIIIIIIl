/* S2 2.6 · Le pitch de 60 secondes.
 *
 * Trois temps :
 *   1 · RÉDIGER : le texte, avec son nombre de mots et sa durée estimée ;
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
  const ouvert = window.AtelierOuvert;
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
  const total = () => (notes().every(v => v !== '' && v != null) ? notes().reduce((sum, v) => sum + Number(v), 0) : null);
  const totalText = () => `Total : ${total() === null ? '-' : total()} / ${max}`;
  const clock = s => (s >= 60 ? '01:00' : `00:${String(s).padStart(2, '0')}`);
  const RING = 2 * Math.PI * 88; // périmètre de l'anneau du chrono

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
      // L'anneau se remplit au fil de la minute.
      const ring = core.$('.rec-ring-fill');
      if (ring) ring.style.strokeDashoffset = String(RING * (1 - Math.min(1, (Date.now() - started) / (LIMIT * 1000))));
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
  // Le temps conseillé pour chaque partie de la structure (60 s en tout).
  const BUDGET = [10, 20, 20, 10];
  const TONES = ['indigo', 'teal', 'teal2', 'navy'];

  // Un chronomètre dessiné : cadran, graduations, poussoir, aiguille.
  const stopwatch = () => `<svg class="pitch-watch" viewBox="0 0 120 136" aria-hidden="true">
      <rect x="51" y="2" width="18" height="10" rx="3" class="pw-crown"/>
      <rect x="56" y="10" width="8" height="10" class="pw-crown"/>
      <rect x="96" y="22" width="12" height="7" rx="2" transform="rotate(45 102 25)" class="pw-crown"/>
      <circle cx="60" cy="76" r="54" class="pw-case"/>
      <circle cx="60" cy="76" r="46" class="pw-face"/>
      ${Array.from({ length: 60 }, (_, i) => { const a = i * 6 * Math.PI / 180; const r1 = i % 5 ? 41 : 36; return `<line x1="${(60 + Math.sin(a) * r1).toFixed(1)}" y1="${(76 - Math.cos(a) * r1).toFixed(1)}" x2="${(60 + Math.sin(a) * 44).toFixed(1)}" y2="${(76 - Math.cos(a) * 44).toFixed(1)}" class="${i % 5 ? 'pw-tick' : 'pw-tick is-major'}"/>`; }).join('')}
      <line x1="60" y1="76" x2="60" y2="40" class="pw-hand"/>
      <circle cx="60" cy="76" r="4" class="pw-pin"/>
      <text x="60" y="100" class="pw-label">60 s</text>
    </svg>`;

  function contractPanel() {
    return `<aside class="k-panel pitch-contract">
      <div class="pitch-prospect">
        <span class="pitch-lock" aria-hidden="true"></span>
        <p><small>Votre prospect</small><strong>Très attentif à la sécurité de ses données</strong></p>
      </div>
      <div class="pitch-minute">
        ${stopwatch()}
        <p><strong>Une minute, pas plus</strong><span>soit 150 mots environ, à voix posée.</span></p>
      </div>
      <p class="k-label">Votre minute, en quatre temps</p>
      <div class="pitch-bar" aria-hidden="true">${BUDGET.map((s, i) => `<i class="is-${TONES[i]}" style="flex:${s}"></i>`).join('')}</div>
      <ol class="pitch-structure">${content.structure.map((item, i) => `<li><span class="pitch-dot is-${TONES[i]}"></span><span>${esc(item)}</span><b>≈ ${BUDGET[i]} s</b></li>`).join('')}</ol>
      <p class="pitch-tone"><span>Ton affirmatif</span><span>Orienté client</span></p>
    </aside>`;
  }

  // La jauge du temps estimé, qui se remplit pendant l'écriture.
  function gauge() {
    const s = kit.seconds(pitch());
    const tone = s > LIMIT ? 'is-over' : s > 50 ? 'is-near' : '';
    return `<span class="pitch-gauge ${tone}"><i style="width:${Math.min(100, s / LIMIT * 100).toFixed(1)}%"></i></span>
      <span class="pitch-gauge-text"><strong>≈ ${s} s</strong> sur 60 · ${esc(kit.plural(kit.words(pitch()), 'mot'))}${s > LIMIT ? ' · trop long, raccourcissez' : ''}</span>`;
  }

  function writeStep() {
    return `<div class="k-columns pitch-layout">
      ${contractPanel()}
      <form class="k-panel" novalidate>
        <p class="k-ask">Que dites-vous à ce prospect, en une minute ?</p>
        <p class="k-instruction">Écrivez votre pitch tel que vous le prononcerez : une accroche, deux bénéfices prouvés, une conclusion.</p>
        ${ex.field('pitch', 'Votre pitch', { placeholder: 'Votre pitch…', max: 1200, rows: 8, hideLabel: true })}
        <div class="pitch-time" data-live="gauge">${gauge()}</div>
        ${core.errorsBox()}
        ${kit.bar({ left: kit.reset(), right: `${kit.dialogButton('example', 'Voir un exemple', 'secondary', '')}${kit.submit('Enregistrer mon texte et continuer')}` })}
      </form>
    </div>`;
  }

  /* ── Étape 2 : enregistrer ─────────────────────────────────────────── */
  // Le texte à dire, comme sur un prompteur, avec sa durée estimée et la minute en quatre temps.
  function scriptPanel() {
    return `<aside class="k-panel pitch-text">
        <div class="pitch-text-head"><p class="k-label">Votre texte</p><button type="button" class="text-button with-icon" data-act="to-stage" data-stage="1">${icon('pencil', { size: 15 })}<span>Modifier</span></button></div>
        <p class="pitch-text-body">${esc(pitch())}</p>
        <div class="pitch-time">${gauge()}</div>
        <div class="pitch-bar is-small" aria-hidden="true">${BUDGET.map((sec, i) => `<i class="is-${TONES[i]}" style="flex:${sec}"></i>`).join('')}</div>
        <p class="pitch-legend">${content.structure.map((item, i) => `<span><i class="pitch-dot is-${TONES[i]}"></i>${esc(item.replace('Un bénéfice + une preuve', 'Bénéfice + preuve'))}</span>`).join('')}</p>
      </aside>`;
  }

  function recordStep() {
    const kind = format();
    const has = Boolean(takeUrl);
    const done = has ? Math.min(1, (Number(ex.value('recorded')) || 0) / LIMIT) : 0;
    return `<div class="k-columns pitch-layout is-record">
      ${scriptPanel()}
      <form class="k-panel" novalidate>
        <p class="k-ask">À vous : dites votre pitch à voix haute, en une minute.</p>
        <div class="rec-format" role="radiogroup" aria-label="Format">
          <span class="rec-format-label">Format</span>
          <button type="button" class="rec-format-option ${kind === 'audio' ? 'is-on' : ''}" data-act="format" data-format="audio" role="radio" aria-checked="${kind === 'audio'}">${icon('microphone', { size: 18 })}<span>Audio</span></button>
          <button type="button" class="rec-format-option ${kind === 'video' ? 'is-on' : ''}" data-act="format" data-format="video" role="radio" aria-checked="${kind === 'video'}">${icon('video', { size: 18 })}<span>Vidéo</span></button>
        </div>
        <div class="rec-stage">
          <div class="rec-dial">
            <svg class="rec-ring" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="88" class="rec-ring-track"/>
              <circle cx="100" cy="100" r="88" class="rec-ring-fill" style="stroke-dasharray:${RING.toFixed(1)};stroke-dashoffset:${(RING * (1 - done)).toFixed(1)}"/>
            </svg>
            <div class="rec-dial-in">
              <span class="rec-symbol">${icon(kind === 'video' ? 'video' : 'microphone', { size: 24 })}</span>
              <strong id="rec-time">${has ? clock(Number(ex.value('recorded')) || 0) : '00:00'}</strong>
              <span class="rec-of">sur 01:00</span>
            </div>
          </div>
          <video id="rec-live" class="rec-live" muted playsinline hidden></video>
          <p id="rec-status" role="status">${has ? `Prise ${ex.value('take')} enregistrée` : 'Prêt à enregistrer'}</p>
          <span class="rec-wave" aria-hidden="true">${Array.from({ length: 40 }, (_, i) => `<i style="height:${6 + ((i * 37) % 22)}px;animation-delay:${((i % 7) * 0.09).toFixed(2)}s"></i>`).join('')}</span>
          <button type="button" class="button primary rec-button" data-act="record"><span class="rec-dot"></span><span>${has ? 'Refaire une prise' : 'Démarrer l’enregistrement'}</span></button>
          <p class="k-muted">L’enregistrement s’arrête de lui-même à 60 secondes.</p>
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
  // Même grille que l'audit du pitch (2.5) : une ligne par critère, trois boutons de note.
  const NOTE_TONES = ['ko', 'mid', 'ok'];
  const LEVELS = [['0', 'À retravailler'], ['1', 'En bonne voie'], ['2', 'Maîtrisé']];
  function scale() {
    return `<div class="audit-dots" aria-hidden="true">${criteria.map((_, i) => `<i class="${kit.filled(ex.value(`score${i}`)) ? 'is-done' : ''}"></i>`).join('')}</div>
      <ol class="audit-scale">${criteria.map((c, i) => {
        const chosen = ex.value(`score${i}`);
        return `<li class="audit-crit">
          <span class="audit-crit-num">${i + 1}</span>
          <span class="audit-crit-text"><strong>${esc(c.title)}</strong><small>${esc(c.text)}</small></span>
          <span class="audit-notes" role="radiogroup" aria-label="${esc(c.title)}">${LEVELS.map(([id, label], k) => `<label class="audit-note-btn is-${NOTE_TONES[k]}">
            <input type="radio" name="score${i}" data-field="score${i}" value="${id}" ${chosen === id ? 'checked' : ''}>
            <b>${id}</b><span>${label}</span>
          </label>`).join('')}</span>
        </li>`;
      }).join('')}</ol>`;
  }
  // Une note coche sa pastille, sans rien redessiner.
  document.addEventListener('change', event => {
    if (!(event.target.closest && event.target.closest('.audit-crit'))) return;
    const dots = document.querySelectorAll('.audit-dots i');
    document.querySelectorAll('.audit-crit').forEach((item, i) => { if (dots[i]) dots[i].classList.toggle('is-done', !!item.querySelector('input:checked')); });
  });

  function evaluateStep() {
    const seconds = Number(ex.value('recorded')) || 0;
    const media = takeUrl
      ? (takeKind === 'video' ? `<video class="rec-player" src="${takeUrl}" controls playsinline></video>` : `<audio class="rec-player" src="${takeUrl}" controls></audio>`)
      : `<p class="rec-empty">${seconds ? 'La prise n’est plus en mémoire : elle s’efface en quittant la page.' : 'Aucune prise enregistrée : évaluez votre lecture à voix haute.'}</p>`;
    return `<div class="k-columns pitch-layout is-evaluate">
      <aside class="k-panel rec-review">
        <p class="k-label">Votre enregistrement</p>
        <div class="rec-take">
          ${seconds ? `<p class="rec-take-head"><span>Prise ${ex.value('take') || 1} · ${ex.value('takeKind') === 'video' ? 'Vidéo' : 'Audio'}</span><span class="rec-pill ${seconds <= LIMIT ? 'is-ok' : 'is-over'}">${seconds} s${seconds <= LIMIT ? ' · dans la minute' : ' · trop long'}</span></p>` : ''}
          ${media}
          ${kit.act('to-stage', `${icon('refresh', { size: 18 })}<span>${seconds ? 'Refaire une prise' : 'Enregistrer une prise'}</span>`, 'secondary', 'data-stage="2"')}
        </div>
        <p class="k-label rec-listen-title">En réécoutant, demandez-vous</p>
        <ol class="rec-listen">${content.listen.map((item, i) => `<li><span>${i + 1}</span>${esc(item)}</li>`).join('')}</ol>
      </aside>
      <form class="k-panel" novalidate>
        <p class="k-ask">Comment jugez-vous votre prise ?</p>
        <p class="k-instruction">Pour chaque critère, donnez-vous 0, 1 ou 2 points.</p>
        ${scale()}
        <p class="audit-total" data-live="total">${esc(totalText())}</p>
        ${core.errorsBox()}
        ${kit.bar({ left: kit.back('to-stage-back', 'Réécouter'), right: kit.submit('Valider mon auto-évaluation') })}
      </form>
    </div>`;
  }

  // Les notes que l'apprenant s'est données, dites clairement, puis ce qu'il reprend en premier.
  function selfReview() {
    const rows = criteria.map((c, i) => {
      const v = ex.value(`score${i}`);
      const level = LEVELS.find(([id]) => id === v);
      return `<li><span class="pitch-self-text"><strong>${esc(c.title)}</strong><small>${esc(c.text)}</small></span>
        ${level ? `<span class="pitch-self-note is-${NOTE_TONES[Number(v)]}"><b>${v}</b>${level[1]}</span>` : '<span class="pitch-self-note">non noté</span>'}</li>`;
    }).join('');
    const weak = criteria.filter((_, i) => ex.value(`score${i}`) === '0').map(c => c.title);
    const next = weak.length
      ? `À reprendre en premier : ${weak.join(', ')}. Puis refaites une prise : le chrono reste le meilleur juge.`
      : 'Aucun critère à 0 : reprenez ceux à 1, puis refaites une prise pour gagner en aisance.';
    return `<section class="pitch-self">
      <h2>Votre auto-évaluation, critère par critère</h2>
      <p class="k-muted">Les notes que vous vous êtes données en réécoutant votre prise.</p>
      <ol class="pitch-self-list">${rows}</ol>
      <p class="pitch-self-next">${esc(next)}</p>
    </section>`;
  }

  function reviewScreen() {
    return `<section class="k-panel">
      ${ouvert.head('s2-2.6', undefined, [{ n: total() ?? 0, total: max, label: 'votre auto-évaluation' }]) || kit.result(total() ?? 0, max, 'votre auto-évaluation')}
      ${ouvert.answer('s2-2.6', 0, { title: 'Votre pitch', text: pitch(), model: content.example })}
      <p class="pitch-facts"><span>Votre texte : ≈ ${kit.seconds(pitch())} s à l’oral</span>${Number(ex.value('recorded')) ? `<span>Votre prise : ${ex.value('recorded')} s</span>` : ''}</p>
      ${selfReview()}
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
        aside: !reviewing && at === 3 ? kit.contextButton() : '' })}
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

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    record: () => toggleRecording(),
    format: el => { if (recorder?.state === 'recording') return; ex.setValue('format', el.dataset.format); kit.commit(); },
    'to-stage': el => { if (recorder?.state === 'recording') recorder.stop(); kit.setStage(Number(el.dataset.stage)); kit.commit(); },
    'to-stage-back': () => { if (recorder?.state === 'recording') recorder.stop(); kit.setStage(Math.max(1, stage() - 1)); kit.commit(); },
    'skip-record': () => { kit.setStage(3); kit.commit(); }
  });
  kit.live(() => ({ words: esc(wordsLine()), gauge: gauge(), total: esc(totalText()) }));
  kit.dialogs({ example: { title: 'Un exemple de pitch en 60 secondes', html: `<p>${esc(content.example)}</p><p class="k-muted">Environ 70 mots, soit une trentaine de secondes à l’oral : il reste de la marge pour respirer.</p>` } });

  window.addEventListener('pagehide', () => { if (recorder?.state === 'recording') { recorder.onstop = null; recorder.stop(); } stopStream(); if (takeUrl) URL.revokeObjectURL(takeUrl); });

  // À l'arrivée sur l'étape « S’évaluer » : ce qu'on a sous les yeux.
  kit.selfContext('.pitch-layout.is-evaluate', [
    ['eye', 'Ce que vous voyez', ['À gauche, votre enregistrement et les points à écouter.', 'À droite, les critères d’un bon pitch.']],
    ['list', 'Ce qui vous est demandé', 'Réécoutez votre prise. Pour chaque critère, donnez-vous de 0 à 2 points.'],
    ['checkCircle', 'Ensuite', 'Votre score s’affiche, avec un exemple de pitch.']
  ], 'S’évaluer');

  ex.mount('s2-2.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
