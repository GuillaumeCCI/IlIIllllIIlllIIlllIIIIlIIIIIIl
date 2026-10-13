/* MÉDIAS · lecture de l’accroche, entraînement oral, chronomètre.
 *
 * Repris de l’ancien app.js. Utilisé par les écrans S1 A, E1 et E2 ; chargé
 * partout, mais inerte tant qu’un écran ne l’appelle pas.
 *
 * L’enregistrement reste temporaire : il n’est ni transcrit, ni envoyé à un
 * serveur, ni conservé dans le brouillon.
 */
(function (root) {
  'use strict';

  const core = root.AtelierCore;
  const { $, icon } = core;

  let audio = null;
  let speaking = false;
  let recorder = null;
  let recordStream = null;
  let recordUrl = null;
  let recordTimeout = null;
  let recordingPending = false;
  let session = 0;             // invalide les médias quand on quitte l’écran
  let timer = { remaining: 40, running: false, interval: null, deadline: 0 };

  /* ─────────────────────────── Accroche audio ───────────────────────── */

  function audioLabel(label) {
    document.querySelectorAll('[data-audio-label]').forEach(el => { el.textContent = label; });
    const play = $('.play-button');
    if (!play) return;
    play.innerHTML = icon(label === 'Arrêter l’écoute' ? 'pause' : 'play', { size: 30 });
    play.setAttribute('aria-label', label);
  }

  function listen(config) {
    if (speaking || audio) { stopAudio(); return; }
    if (config.src) {
      audio = new Audio(core.asset(config.src));
      audio.addEventListener('ended', stopAudio);
      audio.addEventListener('error', () => { stopAudio(); core.toast('Le fichier audio est indisponible. Vous pouvez consulter la transcription.'); });
      audioLabel('Arrêter l’écoute');
      audio.play().catch(() => { stopAudio(); core.toast('La lecture audio n’a pas démarré. Consultez la transcription ou réessayez.'); });
      return;
    }
    if (!('speechSynthesis' in window)) { core.toast('La lecture vocale est indisponible dans ce navigateur. Consultez la transcription.'); return; }
    const utterance = new SpeechSynthesisUtterance(config.transcript);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.95;
    utterance.onend = () => { speaking = false; audioLabel('Écouter l’accroche'); };
    utterance.onerror = () => { speaking = false; audioLabel('Écouter l’accroche'); };
    speaking = true;
    audioLabel('Arrêter l’écoute');
    window.speechSynthesis.speak(utterance);
  }

  function stopAudio() {
    if (audio) { audio.pause(); audio = null; }
    if (speaking && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    speaking = false;
    audioLabel('Écouter l’accroche');
  }

  /* ───────────────────────── Entraînement oral ──────────────────────── */

  async function toggleRecording() {
    if (recordingPending) return;
    if (recorder?.state === 'recording') { recorder.stop(); return; }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      core.toast('L’enregistrement nécessite un navigateur compatible sur HTTPS ou localhost. Vous pouvez vous entraîner à voix haute puis écrire votre réponse.');
      return;
    }
    const version = session;
    recordingPending = true;
    $('#record-button').disabled = true;
    $('#record-status').textContent = 'Autorisez le microphone pour commencer.';
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (version !== session) { stream.getTracks().forEach(track => track.stop()); return; }
      recordStream = stream;
      const chunks = [];
      recorder = new MediaRecorder(stream);
      const active = recorder;
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        clearTimeout(recordTimeout);
        stream.getTracks().forEach(track => track.stop());
        if (version !== session || !$('#record-playback')) return;
        if (recordUrl) URL.revokeObjectURL(recordUrl);
        recordUrl = URL.createObjectURL(new Blob(chunks, { type: active.mimeType || 'audio/webm' }));
        $('#record-playback').src = recordUrl;
        $('#record-playback').hidden = false;
        $('#record-button').textContent = 'Refaire un essai oral';
        $('#record-status').textContent = 'Réécoutez-vous, puis complétez votre réponse écrite. Cet audio sera effacé en quittant cet exercice.';
      };
      recorder.onerror = () => { core.toast('L’enregistrement a été interrompu. Vous pouvez poursuivre à l’écrit.'); stopAll(); };
      recorder.start();
      $('#record-button').textContent = 'Arrêter l’enregistrement';
      $('#record-status').textContent = 'Enregistrement en cours · arrêt automatique après 2 minutes.';
      recordTimeout = setTimeout(() => { if (active.state === 'recording') active.stop(); }, 120000);
    } catch {
      recordStream?.getTracks().forEach(track => track.stop());
      if (version === session && $('#record-status')) $('#record-status').textContent = 'Microphone indisponible ou autorisation refusée. Vous pouvez poursuivre à l’écrit.';
    } finally {
      recordingPending = false;
      if (version === session && $('#record-button')) $('#record-button').disabled = false;
    }
  }

  function stopAll() {
    session++;
    stopAudio();
    clearTimeout(recordTimeout);
    if (recorder?.state === 'recording') { recorder.onstop = null; recorder.stop(); }
    recordStream?.getTracks().forEach(track => track.stop());
    if (recordUrl) URL.revokeObjectURL(recordUrl);
    recordUrl = null;
    recorder = null;
    recordStream = null;
    recordingPending = false;
  }

  /* ──────────────────────────── Chronomètre ─────────────────────────── */

  function paintTimer() {
    if (!$('#timer-value')) return;
    $('#timer-value').textContent = `00:${String(timer.remaining).padStart(2, '0')}`;
    $('#timer-button').textContent = timer.running ? 'Mettre en pause'
      : timer.remaining === 0 ? 'Refaire un essai'
      : timer.remaining === 40 ? 'Tester à voix haute' : 'Reprendre';
    $('.timer-face')?.style.setProperty('--elapsed', `${(40 - timer.remaining) / 40 * 100}%`);
    $('#timer-description').textContent = timer.remaining === 0 ? 'Les 40 secondes sont écoulées.'
      : timer.running ? 'Lisez votre proposition à voix haute.'
      : timer.remaining === 40 ? 'Lancez le chrono lorsque vous êtes prêt.' : 'Chronomètre en pause.';
  }

  function resetTimer() {
    clearInterval(timer.interval);
    timer = { remaining: 40, running: false, interval: null, deadline: 0 };
    paintTimer();
  }

  function toggleTimer() {
    if (timer.running) {
      timer.remaining = Math.max(0, Math.ceil((timer.deadline - Date.now()) / 1000));
      timer.running = false;
      clearInterval(timer.interval);
    } else {
      if (timer.remaining === 0) timer.remaining = 40;
      timer.running = true;
      timer.deadline = Date.now() + timer.remaining * 1000;
      $('#timer-announcement').textContent = 'Chronomètre démarré.';
      timer.interval = setInterval(() => {
        timer.remaining = Math.max(0, Math.ceil((timer.deadline - Date.now()) / 1000));
        if (timer.remaining === 0) {
          clearInterval(timer.interval);
          timer.running = false;
          $('#timer-announcement').textContent = 'Les 40 secondes sont écoulées. Vous pouvez relire et ajuster votre proposition.';
        }
        paintTimer();
      }, 150);
    }
    paintTimer();
  }

  /* Le widget de chronomètre, prêt à insérer dans un écran. */
  const timerWidget = () => `<div class="timer-widget">
    <div class="timer-face" role="timer" aria-label="Temps restant">${icon('clock', { size: 19 })}<strong id="timer-value">00:40</strong></div>
    <div class="timer-description"><h3>Test oral</h3><p class="muted" id="timer-description">Lancez le chrono lorsque vous êtes prêt.</p><small>Lecture à voix haute, sans enregistrement.</small></div>
    <div class="timer-actions">${core.button('Tester à voix haute', 'timer', 'secondary', 'id="timer-button"')}${core.button('Recommencer', 'reset-timer', 'text-button small')}</div>
    <span id="timer-announcement" class="sr-only" role="status"></span>
  </div>`;

  window.addEventListener('pagehide', () => { stopAll(); clearInterval(timer.interval); });

  root.AtelierMedia = Object.freeze({
    listen, stopAudio, toggleRecording, stopAll,
    toggleTimer, resetTimer, paintTimer, timerWidget
  });
})(globalThis);
