/* S2 2.6 · Le script de rebond.
 *
 * Trois esquives au téléphone ; pour chacune, une réponse type de 2 à 3
 * phrases, confrontée aux trois clés du rebond. Après les trois scripts,
 * l'auto-évaluation : on les lit à voix haute (avec un enregistrement audio
 * facultatif, gardé en mémoire de la page seulement), puis on note sa voix.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.6'];
  const situations = content.situations;
  const SELF = situations.length;
  const scale = [{ id: '0', label: '0', sub: 'À retravailler' }, { id: '1', label: '1', sub: 'En bonne voie' }, { id: '2', label: '2', sub: 'Maîtrisé' }];

  const script = i => ex.value(`script${i}`);
  const sentences = text => (String(text || '').trim().match(/[^.!?…]+[.!?…]+|[^.!?…]+$/gu) || []).filter(s => s.trim().length > 1).length;
  const written = () => situations.filter((_, i) => sentences(script(i)) >= 2).length;
  const at = () => {
    const n = Number(ex.value('at'));
    if (n === SELF && written() === SELF) return SELF;
    return Number.isInteger(n) && n >= 0 && n < SELF ? n : 0;
  };

  /* ── L'enregistrement, gardé en mémoire tant que la page est ouverte ── */
  let recorder = null;
  let stream = null;
  let takeUrl = null;

  async function toggleRecording() {
    if (recorder?.state === 'recording') { recorder.stop(); return; }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      core.toast('L’enregistrement nécessite un navigateur compatible, sur localhost ou HTTPS. Lisez simplement vos scripts à voix haute.');
      return;
    }
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch { core.toast('Micro indisponible ou autorisation refusée. Lisez simplement vos scripts à voix haute.'); return; }
    const chunks = [];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    recorder.onstop = () => {
      stream?.getTracks().forEach(track => track.stop());
      stream = null;
      if (takeUrl) URL.revokeObjectURL(takeUrl);
      takeUrl = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' }));
      recorder = null;
      kit.commit();
    };
    recorder.start();
    const button = core.$('[data-act="record"]');
    if (button) button.innerHTML = `${icon('pauseCircle', { size: 20 })}<span>Arrêter l’enregistrement</span>`;
    core.$('.rb-rec')?.classList.add('is-recording');
  }

  function menu(current) {
    return `<nav class="k-panel rb-menu" aria-label="Les 3 situations">
      <h2>Les 3 situations</h2>
      <ol>${situations.map((s, i) => `<li><button type="button" class="rb-item ${i === current ? 'is-current' : ''} ${sentences(script(i)) >= 2 ? 'is-done' : ''}" data-act="go" data-index="${i}">
        <span class="rb-n">${sentences(script(i)) >= 2 && i !== current ? icon('check', { size: 16 }) : i + 1}</span>
        <span><strong>${esc(s.title)}</strong><small>« ${esc(s.quote)} »</small></span>${icon('chevronRight', { size: 18 })}
      </button></li>`).join('')}</ol>
      <button type="button" class="rb-item rb-self ${current === SELF ? 'is-current' : ''}" data-act="go" data-index="${SELF}" ${written() === SELF ? '' : 'disabled'}>
        <span class="rb-n">${icon(written() === SELF ? 'microphone' : 'lock', { size: 16 })}</span>
        <span><strong>Auto-évaluation</strong><small>Après les 3 scripts</small></span>${icon('chevronRight', { size: 18 })}
      </button>
      <p class="rb-voice">${icon('microphone', { size: 18 })}<span>Lecture à voix haute pour évaluer la voix.</span></p>
    </nav>`;
  }

  function scriptStep(i) {
    const s = situations[i];
    return `<p class="k-label">Script ${i + 1} / ${SELF}</p>
      <h2 class="rb-title">${esc(s.short)}</h2>
      ${kit.clientCard(s.quote, null, 'Le client vous dit', situations.indexOf(s))}
      <h3 class="rb-label">Votre réponse type</h3>
      ${ex.field(`script${i}`, 'Votre réponse type', { placeholder: 'Répondez au client en 2 ou 3 phrases…', max: 500, rows: 4, hideLabel: true })}
      <p class="k-muted" data-live="sentences">${sentencesLine(i)}</p>`;
  }

  const sentencesLine = i => `${kit.plural(sentences(script(i)), 'phrase')} · 2 à 3 phrases, comme si vous lui parliez.`;

  function selfStep() {
    return `<p class="k-label">Auto-évaluation</p>
      <h2 class="rb-title">Lisez vos trois scripts à voix haute</h2>
      <ol class="rb-reread">${situations.map((s, i) => `<li><strong>« ${esc(s.quote)} »</strong><span>${esc(script(i))}</span></li>`).join('')}</ol>
      <div class="rb-rec">
        <button type="button" class="button secondary" data-act="record">${icon('microphone', { size: 20 })}<span>${takeUrl ? 'Refaire l’enregistrement' : 'S’enregistrer (facultatif)'}</span></button>
        ${takeUrl ? `<audio class="rb-player" src="${takeUrl}" controls></audio>` : '<span class="k-muted">L’enregistrement reste sur cet appareil et s’efface en quittant la page.</span>'}
      </div>
      ${kit.matrix({ key: 'voice', rows: content.voice, columns: scale, head: 'Ma voix', round: true, numbered: false })}`;
  }

  function reviewScreen() {
    const score = content.voice.map((_, j) => Number(ex.value(`voice${j}`)) || 0).reduce((a, b) => a + b, 0);
    return `<section class="k-panel">
      ${kit.result(score, content.voice.length * 2, 'votre auto-évaluation de la voix')}
      ${situations.map((s, i) => `<div class="rb-review">
        <p class="k-label">Script ${i + 1} · ${esc(s.title)}</p>
        <p class="rb-review-quote">« ${esc(s.quote)} »</p>
        <div class="rb-review-pair">${kit.yours('Votre réponse', script(i))}${kit.model('Une réponse possible', s.model)}</div>
      </div>`).join('')}
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const current = at();
    return `<div class="k-page rb-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count rb-count" data-live="count"><strong>${written()} / ${SELF}</strong> scripts</p>` })}
      ${reviewing ? reviewScreen() : `<div class="rb-layout">
        ${menu(current)}
        <form class="k-panel rb-main" novalidate>
          ${current === SELF ? selfStep() : scriptStep(current)}
          ${core.errorsBox()}
          <div class="rb-actions">${current === SELF ? kit.back('go-last', 'Revenir au script 3') : kit.dialogButton(`tip${current}`, 'Voir un repère', 'secondary', 'lightbulb')}
            ${kit.submit(current === SELF ? 'Valider mon auto-évaluation' : written() === SELF || (written() === SELF - 1 && sentences(script(current)) < 2) ? 'Enregistrer et s’auto-évaluer' : `Enregistrer et passer au script ${Math.min(current + 2, SELF)}`)}</div>
        </form>
      </div>`}
      ${reviewing ? '' : kit.utility('Corrigé disponible après l’auto-évaluation')}
    </div>`;
  }

  function scriptError(values, i) {
    const n = sentences(values[`script${i}`]);
    if (!kit.filled(values[`script${i}`])) return { key: `script${i}`, message: `Rédigez votre réponse à « ${situations[i].quote} ».` };
    if (n < 2) return { key: `script${i}`, message: 'Rédigez au moins 2 phrases : accuser réception, puis proposer une suite.' };
    return null;
  }

  function validate(values) {
    const current = at();
    if (current < SELF) {
      const own = scriptError(values, current);
      if (own) return [own];
    }
    const missing = situations.findIndex((_, i) => scriptError(values, i));
    if (missing !== -1) return current === SELF ? [scriptError(values, missing)] : [];
    if (current < SELF) return [];
    const unrated = content.voice.findIndex((_, j) => !values[`voice${j}`]);
    return unrated === -1 ? [] : [{ key: `voice${unrated}`, message: 'Notez chacun des 4 critères de voix.' }];
  }

  function intercept(values) {
    const current = at();
    if (current === SELF || validate(values).length) return false;
    const next = situations.findIndex((_, i) => i > current && scriptError(values, i));
    const first = situations.findIndex((_, i) => scriptError(values, i));
    ex.setValue('at', next !== -1 ? next : first !== -1 ? first : SELF);
    return true;
  }

  const feedback = () => ['Comparez vos scripts au corrigé modèle, puis relisez-les à voix haute jusqu’à ce qu’ils sonnent naturels.'];

  kit.on({
    go: el => { if (recorder?.state === 'recording') recorder.stop(); ex.setValue('at', Number(el.dataset.index)); kit.commit(); },
    'go-last': () => { if (recorder?.state === 'recording') recorder.stop(); ex.setValue('at', SELF - 1); kit.commit(); },
    record: () => toggleRecording()
  });
  kit.live(() => {
    const current = at();
    return { count: `<strong>${written()} / ${SELF}</strong> scripts`, sentences: current < SELF ? sentencesLine(current) : '' };
  });
  kit.dialogs(Object.fromEntries(situations.map((s, i) => [`tip${i}`, { title: `Repère · ${s.title}`, html: `<p>${esc(s.tip)}</p><p class="tip-keys"><span>Les ${content.keys.length} clés :</span>${content.keys.map((k, j) => `${j ? '<span class="tip-sep" aria-hidden="true"></span>' : ''}<span class="tip-key tone-${['blue', 'coral', 'green'][j % 3]}">${esc(k)}</span>`).join('')}</p>` }])));

  window.addEventListener('pagehide', () => { if (recorder?.state === 'recording') { recorder.onstop = null; recorder.stop(); } stream?.getTracks().forEach(t => t.stop()); if (takeUrl) URL.revokeObjectURL(takeUrl); });

  ex.mount('s2-2.6', { screen, validate, intercept, feedback, compactFeedback: true });
})();
