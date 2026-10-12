/* SONS · un retour sonore discret.
 *
 * Les sons sont synthétisés à la volée (Web Audio) : rien à télécharger,
 * rien à héberger. Sept exceptions sont des fichiers, dans assets/audio/ :
 * le clic sur un choix d'exercice (clic.mp3), le clic sur les autres
 * boutons, liens et onglets (clic-navigation.mp3), la désélection d'un
 * choix (deselection.mp3),
 * l'entrée dans un exercice
 * (« Commencer l'exercice », debut-exercice.mp3) et l'exercice réussi
 * sans erreur (exercice-reussi.mp3), et l'exercice avec des erreurs
 * (exercice-rate.mp3), et la fermeture d'une fenêtre (fermeture.mp3).
 * Cinq familles synthétisées :
 *   clic         un bouton, une carte, un choix ;
 *   dépôt        une carte glissée sur une zone ;
 *   étape        une étape validée, l'exercice continue ;
 *   oubli        la validation est refusée (champ vide, carte non placée) ;
 *   résultat     l'exercice est terminé : tout juste, des erreurs, ou
 *                une production rédigée (sans bonne ou mauvaise réponse).
 *
 * Le moteur des exercices n'est pas modifié : ce module écoute la page.
 * Après chaque validation, il regarde ce que le moteur a affiché (message
 * d'erreur, corrigé, marques vertes ou rouges) et joue le son adapté.
 *
 * Un bouton « Sons » dans l'en-tête coupe ou rétablit le son. Le choix est
 * mémorisé dans ce navigateur et vaut pour tous les modules du site.
 *
 * La musique de fond (accueil et exercices) et son bouton « Musique » sont
 * décrits plus bas, avec leurs fichiers.
 */
(function (root) {
  'use strict';
  if (!root.document) return;
  // Aperçu au survol du menu : une image muette de la page de contexte.
  if (root.document.documentElement.dataset.preview) return;

  const STORE = 'atelier-vente-sons';
  let context = null;
  let muted = false;
  try { muted = root.localStorage.getItem(STORE) === 'off'; } catch { /* stockage bloqué : son actif */ }

  /* Le contexte audio ne peut démarrer qu'après un geste de l'utilisateur. */
  function audio() {
    const Context = root.AudioContext || root.webkitAudioContext;
    if (!Context) return null;
    if (!context) context = new Context();
    if (context.state === 'suspended') context.resume();
    return context;
  }

  /* Une note : fréquence, départ, durée, forme d'onde, volume. */
  /* TOUS LES SONS AU MÊME NIVEAU. Les fichiers fournis n'ont pas le même
   * volume d'origine : chacun est mesuré au décodage (voir tune) et ramené
   * à ce niveau cible, exprimé en RMS sur ses seules parties audibles,
   * dans l'esprit de la mesure LUFS. Les sons synthétisés sont calés sur la
   * même cible. Pour tout monter ou tout baisser d'un coup : TARGET_DB. */
  const TARGET_DB = -24;
  const TARGET = Math.pow(10, TARGET_DB / 20);
  const CEILING = 0.9; // crête maximale après réglage : jamais de saturation

  /* Une note : fréquence, départ, durée, forme d'onde. Son amplitude est
   * déduite de la cible : une note qui décroît de façon exponentielle a une
   * RMS audible d'environ 1/2,63 de sa crête, multipliée par 1/√2 pour une
   * sinusoïde et 1/√3 pour un triangle. */
  function note(ctx, frequency, start, duration, type = 'sine') {
    const volume = Math.min(CEILING, TARGET * 2.63 * (type === 'triangle' ? Math.SQRT2 * 1.2247 : Math.SQRT2));
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const t = ctx.currentTime + start;
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  const SOUNDS = {
    click: ctx => note(ctx, 880, 0, 0.06, 'triangle'),
    drop: ctx => { note(ctx, 523, 0, 0.08, 'triangle'); note(ctx, 784, 0.05, 0.1, 'triangle'); },
    step: ctx => { note(ctx, 587, 0, 0.12, 'sine'); note(ctx, 880, 0.09, 0.18, 'sine'); },
    missing: ctx => { note(ctx, 247, 0, 0.12, 'triangle'); note(ctx, 208, 0.11, 0.18, 'triangle'); },
    correct: ctx => [523, 659, 784, 1047].forEach((f, i) => note(ctx, f, i * 0.09, i === 3 ? 0.42 : 0.16, 'sine')),
    wrong: ctx => { note(ctx, 392, 0, 0.18, 'triangle'); note(ctx, 311, 0.16, 0.34, 'triangle'); },
    done: ctx => { note(ctx, 523, 0, 0.16, 'sine'); note(ctx, 784, 0.12, 0.34, 'sine'); }
  };

  /* Les sons enregistrés. Le chemin est résolu depuis ce script (js/), si
   * bien qu'il vaut depuis la racine comme depuis exercices/.
   *
   * Ils sont joués par Web Audio, décodés une fois pour toutes : le lecteur
   * audio HTML met 50 à 150 ms à démarrer sous Windows et avale le début des
   * sons très courts (le « pop » du clic). Le lecteur HTML ne sert plus que
   * de secours, si Web Audio manque ou si le décodage a échoué. */
  const scriptSrc = document.currentScript && document.currentScript.src;
  /* Les sons enregistrés. Tous sont réglés au décodage (voir tune) : leur
   * silence de tête est coupé, pour qu'ils partent au moment même du clic,
   * et leur niveau est ramené à la cible commune.
   * `lead` : silence de tête mesuré (en secondes). Il est recalculé au
   * décodage, mais connu d'avance pour que le lecteur de secours le saute
   * aussi (la navigation commence par 0,27 s de vide). */
  const FILES = {
    click: { file: '../assets/audio/clic.mp3', lead: 0.057 },
    nav: { file: '../assets/audio/clic-navigation.mp3', lead: 0.266 },
    deselect: { file: '../assets/audio/deselection.mp3', lead: 0.037 },
    start: { file: '../assets/audio/debut-exercice.mp3', lead: 0.044 },
    correct: { file: '../assets/audio/exercice-reussi.mp3', lead: 0.099 },
    wrong: { file: '../assets/audio/exercice-rate.mp3', lead: 0.126 },
    close: { file: '../assets/audio/fermeture.mp3', lead: 0.027 },
    // L'apparition d'un exercice : un trait de feutre quand la consigne
    // arrive, puis un stylo qui écrit quand l'exercice vient bloc par bloc.
    brief: { file: '../assets/audio/consigne.mp3', lead: 0.094, trim: -5 },
    body: { file: '../assets/audio/exercice-apparition.mp3', lead: 0 },
    // Le survol d'un choix d'exercice, à la souris : un tic léger, plus bas
    // que les clics puisqu'il revient souvent.
    hover: { file: '../assets/audio/survol.mp3', lead: 0.048, skip: 0.015, trim: -8 }
  };
  const recordings = {};
  const buffers = {};
  const urlOf = file => new URL(file, scriptSrc).href;

  if (scriptSrc) {
    Object.entries(FILES).forEach(([name, { file }]) => {
      try {
        const clip = new Audio(urlOf(file));
        clip.preload = 'auto';
        clip.volume = 0.6; // secours, avant que le niveau réel ne soit mesuré
        recordings[name] = clip;
      } catch { /* son indisponible : on s'en passe */ }
    });
  }

  /* Le décodage se fait dès le chargement de la page : chaque exercice est
   * une nouvelle page, et attendre le premier geste laissait les premiers
   * clics au lecteur HTML, plus lent. Le contexte audio, créé en sommeil,
   * est réveillé par le premier geste (appui, touche, toucher). */
  let decoding = false;
  function decodeAll() {
    if (decoding || !scriptSrc) return;
    const ctx = audio();
    if (!ctx || !ctx.decodeAudioData) return;
    decoding = true;
    Object.entries(FILES).forEach(([name, { file }]) => {
      fetch(urlOf(file))
        .then(response => response.arrayBuffer())
        .then(data => new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject)))
        .then(buffer => { tune(name, buffer); buffers[name] = buffer; })
        .catch(() => { /* le lecteur HTML prendra le relais */ });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decodeAll);
  else decodeAll();
  ['pointerdown', 'keydown', 'touchstart'].forEach(type =>
    document.addEventListener(type, () => { decodeAll(); audio(); }, { capture: true, once: true }));

  /* Réglage d'un son décodé.
   * · Départ juste avant l'attaque (2 ms de marge) : le silence de tête,
   *   fréquent dans ces fichiers, retardait le son.
   * · Niveau perçu : RMS par fenêtres de 10 ms, en écartant les fenêtres
   *   silencieuses (sous -50 dB, ou à plus de 30 dB sous la plus forte).
   *   Le gain amène ce niveau à la cible, sans que la crête dépasse CEILING. */
  const db = value => (value > 0 ? 20 * Math.log10(value) : -Infinity);
  function tune(name, buffer) {
    const spec = FILES[name];
    const data = buffer.getChannelData(0);
    let peak = 0;
    for (let i = 0; i < data.length; i++) peak = Math.max(peak, Math.abs(data[i]));
    spec.lead = 0;
    if (peak > 0) {
      const floor = peak * 0.05;
      let i = 0;
      while (i < data.length && Math.abs(data[i]) < floor) i++;
      // `skip` : on entame le son un peu après son attaque, réglé à l'oreille.
      spec.lead = Math.max(0, i / buffer.sampleRate - 0.002) + (spec.skip || 0);
    }
    const block = Math.max(1, Math.round(buffer.sampleRate * 0.01));
    const energies = [];
    for (let i = 0; i < data.length; i += block) {
      const end = Math.min(data.length, i + block);
      let sum = 0;
      for (let j = i; j < end; j++) sum += data[j] * data[j];
      energies.push(sum / (end - i));
    }
    const loudest = energies.reduce((max, e) => Math.max(max, e), 0);
    const kept = energies.filter(e => e >= Math.max(1e-5, loudest * 1e-3));
    const rms = kept.length ? Math.sqrt(kept.reduce((sum, e) => sum + e, 0) / kept.length) : 0;
    // `trim` : un réglage à l'oreille, en dB, après l'égalisation.
    const gain = (rms > 0 && peak > 0 ? Math.min(TARGET / rms, CEILING / peak) : 1) * Math.pow(10, (spec.trim || 0) / 20);
    spec.gain = gain;
    spec.level = { rms: db(rms), peak: db(peak), gain: db(gain), result: db(rms * gain) };
    const clip = recordings[name];
    if (clip) clip.volume = Math.min(1, gain);
  }

  function playFile(name) {
    if (muted || !FILES[name]) return;
    const buffer = buffers[name];
    const ctx = buffer && audio();
    if (ctx) {
      try {
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        source.buffer = buffer;
        gain.gain.value = FILES[name].gain ?? 1;
        source.connect(gain).connect(ctx.destination);
        source.start(0, FILES[name].lead || 0);
        return;
      } catch { /* on tente le lecteur HTML */ }
    }
    const clip = recordings[name];
    if (!clip) return;
    try {
      // Des clics rapprochés se superposent au lieu de se couper.
      const voice = clip.paused ? clip : clip.cloneNode();
      voice.volume = clip.volume;
      voice.currentTime = FILES[name].lead || 0;
      const started = voice.play();
      if (started && started.catch) started.catch(() => {});
    } catch { /* un son raté ne doit jamais gêner l'exercice */ }
  }

  function play(name) {
    // Les clics enregistrés remplacent le clic synthétisé quand ils existent.
    if ((name === 'click' || name === 'nav') && recordings[name]) { playFile(name); return; }
    if (name === 'nav') name = 'click';
    if (muted || !SOUNDS[name]) return;
    const ctx = audio();
    if (!ctx) return;
    try { SOUNDS[name](ctx); } catch { /* un son raté ne doit jamais gêner l'exercice */ }
  }

  /* ─────────────────────────── Le bouton Sons ─────────────────────────── */

  const SPEAKER = '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/>';
  const WAVES = '<path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>';
  const CROSS = '<path d="m16 9.5 5 5m0-5-5 5"/>';
  const svg = body => `<svg class="icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

  function paint(button) {
    button.innerHTML = `${svg(SPEAKER + (muted ? CROSS : WAVES))}<span class="sound-toggle-label">${muted ? 'Sons coupés' : 'Sons'}</span>`;
    button.setAttribute('aria-pressed', String(!muted));
    button.setAttribute('aria-label', muted ? 'Activer les sons' : 'Couper les sons');
    button.title = muted ? 'Activer les sons' : 'Couper les sons';
  }

  function addToggle() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'header-button sound-toggle';
    button.dataset.soundToggle = 'true';
    paint(button);
    button.addEventListener('click', () => {
      muted = !muted;
      try { root.localStorage.setItem(STORE, muted ? 'off' : 'on'); } catch { /* préférence non mémorisée */ }
      paint(button);
      play('nav');
    });
    // Exercice intégré seul (ou page sans en-tête de module) : les boutons
    // Sons et Musique flottent ensemble, en haut à droite.
    const solo = document.documentElement.dataset.embed === 'solo';
    // `data-sound-anchor` : l'accueil général du site, hors module.
    const anchor = !solo && document.querySelector('.topbar .fullscreen-button, [data-sound-anchor]');
    if (anchor) anchor.after(button);
    else {
      const dock = document.createElement('div');
      dock.className = 'sound-dock';
      dock.appendChild(button);
      document.body.appendChild(dock);
    }
    addMusicToggle(button);
  }

  /* ─────────────────────────── La musique de fond ─────────────────────── */

  /* Une musique douce, en boucle, très en retrait des sons :
   *   l'accueil d'un module (le menu)   musique-menu.mp3, entrée en fondu
   *                                     de 5 s ;
   *   un exercice, une fois passé le carton de titre : l'une des deux
   *   musiques d'exercice, toujours la même pour un exercice donné (elles
   *   alternent dans l'ordre du catalogue), entrée en fondu de 2 s.
   * Les navigateurs interdisent le son avant le premier geste : si la page
   * s'ouvre sans clic préalable, la musique part au premier clic ou à la
   * première touche. Le bouton « Musique » de l'en-tête la coupe ou la
   * rétablit, indépendamment des sons ; le choix est mémorisé.
   * `rms` : niveau moyen de chaque fichier (en dB), mesuré une fois pour
   * toutes : chacun est ramené au même niveau d'écoute, MUSIC_DB. */
  const MUSIC_STORE = 'atelier-vente-musique';
  const MUSIC_DB = -30; // les sons sont à TARGET_DB (-24) : la musique 6 dB en dessous
  const TRACKS = {
    menu: { file: '../assets/audio/musique-menu.mp3', rms: -14.2, fade: 5 },
    steadfast: { file: '../assets/audio/musique-exercice-1.mp3', rms: -21.7, fade: 2 },
    solatium: { file: '../assets/audio/musique-exercice-2.mp3', rms: -15.0, fade: 2 }
  };
  let musicOff = false;
  try { musicOff = root.localStorage.getItem(MUSIC_STORE) === 'off'; } catch { /* stockage bloqué : musique active */ }

  const inExercise = /\/exercices\/[^/]+$/.test(root.location.pathname);

  /* Les lecteurs, un par musique, créés à la demande. `current` : la
   * musique voulue en ce moment sur la page (null : aucune). */
  const players = {};
  let current = null;
  let player = null;
  let resumed = false; // la musique reprend là où une page précédente l'a laissée
  /* Volume de départ du fondu : à peine audible, mais pas nul. Firefox
   * laisse jouer sans geste une musique à volume 0 (il la juge muette) :
   * l'écran d'accueil ne se montrait pas, puis le fondu restait bloqué. */
  const QUIET = 0.001;
  /* Le volume choisi par l'utilisateur, de 0 à 100 (curseur sous le bouton
   * Musique). 50 : le niveau prévu, MUSIC_DB ; 100 : deux fois plus fort ;
   * 0 : silence. Mémorisé dans ce navigateur, pour tout le site. */
  const VOLUME_STORE = `${MUSIC_STORE}-volume`;
  let musicVolume = 50;
  try {
    const saved = Number(root.localStorage.getItem(VOLUME_STORE));
    if (root.localStorage.getItem(VOLUME_STORE) !== null && saved >= 0 && saved <= 100) musicVolume = saved;
  } catch { /* volume par défaut */ }
  const level = name => Math.min(1, Math.pow(10, (MUSIC_DB - TRACKS[name].rms) / 20) * musicVolume / 50);

  /* Fondu du volume d'un lecteur vers `to` en `seconds`. L'oreille perçoit
   * le volume en décibels : la montée se fait donc à pas réguliers en dB,
   * de -36 dB sous le niveau final jusqu'à lui. On entend la musique dès la
   * première seconde, puis elle s'installe. La descente reste linéaire. */
  const FADE_FROM_DB = -36;
  function fade(audio, to, seconds, done) {
    const from = audio.volume;
    const rising = to > from;
    const id = audio.fadeId = (audio.fadeId || 0) + 1;
    const start = performance.now();
    const step = now => {
      if (id !== audio.fadeId) return;
      const p = Math.min(1, (now - start) / (seconds * 1000));
      const value = rising
        ? (p >= 1 ? to : Math.max(from, to * Math.pow(10, FADE_FROM_DB * (1 - p) / 20)))
        : from + (to - from) * p;
      audio.volume = Math.max(0, Math.min(1, value));
      if (p < 1) requestAnimationFrame(step);
      else if (done) done();
    };
    requestAnimationFrame(step);
  }

  /* La position du menu est gardée le temps de la visite : d'une page à
   * l'autre (accueil, page de contexte d'un exercice), la musique reprend
   * là où on l'avait laissée. */
  const positionKey = name => `${MUSIC_STORE}-position-${name}`;
  function savePosition() {
    const menu = players.menu;
    if (!menu) return;
    try { root.sessionStorage.setItem(positionKey('menu'), String(menu.currentTime)); } catch { /* position non gardée */ }
  }

  function playerFor(name) {
    if (players[name]) return players[name];
    let audio;
    try { audio = new Audio(urlOf(TRACKS[name].file)); } catch { return null; }
    audio.preload = 'auto';
    audio.volume = QUIET;
    loopWithCrossfade(audio, name);
    if (name === 'menu') {
      try {
        const at = Number(root.sessionStorage.getItem(positionKey(name)));
        if (at > 0) { audio.currentTime = at; resumed = true; }
      } catch { /* départ au début */ }
    }
    players[name] = audio;
    return audio;
  }

  /* LA BOUCLE EN FONDU ENCHAÎNÉ. Plutôt qu'un retour sec au début, les
   * CROSSFADE dernières secondes d'un morceau se fondent dans son début,
   * rejoué par un second lecteur (comme le fondu enchaîné de Spotify).
   * Le nouveau lecteur prend ensuite la place de l'ancien. */
  const CROSSFADE = 5;
  function loopWithCrossfade(audio, name) {
    let handing = false;
    audio.addEventListener('timeupdate', () => {
      if (handing || audio.paused || !audio.duration || audio.duration - audio.currentTime > CROSSFADE) return;
      handing = true;
      let next;
      try { next = new Audio(audio.currentSrc || audio.src); } catch { audio.currentTime = 0; handing = false; return; }
      next.preload = 'auto';
      next.volume = QUIET;
      next.muted = audio.muted;
      loopWithCrossfade(next, name);
      const target = level(name);
      const started = next.play();
      const swap = () => {
        players[name] = next;
        if (player === audio) player = next;
        fade(next, target, CROSSFADE);
        fade(audio, 0, CROSSFADE, () => audio.pause());
      };
      if (started && started.then) started.then(swap, () => { audio.currentTime = 0; handing = false; });
      else swap();
    });
    // Secours : si le morceau finit sans relais, il repart du début.
    audio.addEventListener('ended', () => { if (!handing) { audio.currentTime = 0; audio.play().catch(() => {}); } });
  }

  function startMusic() {
    if (musicOff || !current || !scriptSrc) return;
    player = playerFor(current);
    if (!player || !player.paused) return;
    const name = current;
    const audio = player;
    audio.muted = false;
    audio.volume = QUIET;
    // Firefox annonce d'avance s'il refusera le son : inutile d'essayer.
    let policy = 'allowed';
    try { if (navigator.getAutoplayPolicy) policy = navigator.getAutoplayPolicy(audio); } catch { /* inconnu : on essaie */ }
    const refused = () => { waiting(true); if (!inExercise) showEntrance(); };
    if (policy !== 'allowed' && !(navigator.userActivation && navigator.userActivation.isActive)) { refused(); return; }
    const started = audio.play();
    // Une reprise d'une page à l'autre se fait en douceur mais vite : la
    // musique « continue ». Un vrai départ prend son fondu complet.
    const rise = () => {
      waiting(false);
      fade(audio, level(name), name === 'menu' && resumed ? 1 : TRACKS[name].fade);
      resumed = false;
    };
    if (started && started.then) started.then(rise, refused);
    else rise();
  }

  function stopPlayer(audio, seconds = 0.6) {
    if (!audio || audio.paused) return;
    fade(audio, 0, seconds, () => { if (audio === players.menu) savePosition(); audio.pause(); });
  }

  /* Changer de musique : l'ancienne s'éteint en fondu, la nouvelle part. */
  function want(name) {
    if (current === name) { startMusic(); return; }
    if (player) stopPlayer(player, 0.8);
    current = name;
    player = null;
    startMusic();
  }

  /* Plus de musique sur la page (l'exercice se lance). */
  function silence() {
    current = null;
    if (player) stopPlayer(player, 0.8);
    player = null;
  }

  function exerciseTrack() {
    const file = root.location.pathname.split('/').pop().replace(/\.html$/, '');
    const list = (root.ATELIER_CATALOG && root.ATELIER_CATALOG.all) || [];
    let index = list.findIndex(exercise => exercise.file === file);
    if (index < 0) index = [...file].reduce((sum, c) => sum + c.charCodeAt(0), 0);
    return index % 2 ? 'solatium' : 'steadfast';
  }

  // Le premier geste débloque la lecture, si le navigateur l'avait refusée.
  // Sauf « Sans musique » sur l'écran d'accueil, et « Commencer
  // l'exercice », qui éteint justement la musique du menu.
  ['pointerdown', 'keydown', 'touchstart'].forEach(type =>
    document.addEventListener(type, event => {
      if (event.target && event.target.closest && event.target.closest('[data-entrance="off"], [data-action="start-exercise"]')) return;
      startMusic();
    }, { capture: true }));
  // La musique continue quand on passe sur un autre onglet : seul le
  // bouton Musique la coupe.
  root.addEventListener('pagehide', savePosition);

  /* Quelle musique, quand :
   *   accueil                         la musique du menu ;
   *   page de contexte d'un exercice  la musique du menu (elle continue,
   *                                   ou revient avec « Revoir la consigne ») ;
   *   « Commencer l'exercice »        elle s'éteint pendant le carton ;
   *   l'exercice à l'écran            sa musique d'exercice.
   * exercise.js annonce ces étapes. « Revoir la consigne » en cours
   * d'exercice garde la musique de l'exercice. Sur l'accueil, le départ
   * attend que la page et ce script soient prêts : l'écran d'accueil et
   * les boutons, définis plus bas, doivent exister. */
  if (inExercise) {
    // Toute page de contexte (première visite, onglet, « Revoir la consigne »)
    // joue la musique du menu.
    document.addEventListener('atelier:briefing-shown', () => want('menu'));
    document.addEventListener('atelier:exercise-launch', silence);
    document.addEventListener('atelier:exercise-shown', () => want(exerciseTrack()));
  } else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => want('menu'));
  else setTimeout(() => want('menu'));

  /* Le navigateur attend un geste : le bouton Musique clignote doucement
   * et l'annonce, jusqu'au premier clic. */
  function waiting(on) {
    const button = document.querySelector('[data-music-toggle]');
    if (!button) return;
    button.classList.toggle('is-waiting', on);
    button.title = on ? 'La musique démarre au premier clic sur la page' : (musicOff ? 'Activer la musique' : 'Couper la musique');
  }

  /* L'ÉCRAN D'ACCUEIL. Sur un accueil, si le navigateur refuse la musique
   * faute de geste, un écran couvre la page et demande si l'on veut de la
   * musique. « Avec musique » est le geste qui la lance ; « Sans musique »
   * la coupe, comme le bouton Musique, et l'écran ne revient plus. Un clic simulé par le code ne
   * compterait pas : le navigateur ne retient que les vrais. Les pages
   * suivantes de la visite sont en général autorisées d'office, et l'écran
   * ne revient alors pas. Styles intégrés : l'écran vaut aussi sur les
   * pages d'accueil hors module (Go Live, GitHub). */
  let entrance = null;
  function showEntrance() {
    if (entrance || musicOff || !document.body) return;
    // Déjà répondu pendant cette visite : on attend simplement un clic.
    try { if (root.sessionStorage.getItem(`${MUSIC_STORE}-choisie`)) return; } catch { /* on demande */ }
    const style = document.createElement('style');
    style.textContent = `
      .av-entrance { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 24px; background: #f8f5f0 url('${urlOf('../assets/backgrounds/accueil.webp')}') center / cover no-repeat; font-family: 'Fira Sans', system-ui, sans-serif; color: #101448; text-align: center; opacity: 0; transition: opacity .35s ease; }
      .av-entrance.is-shown { opacity: 1; }
      .av-entrance.is-leaving { opacity: 0; transition-duration: .6s; pointer-events: none; }
      .av-entrance-card { display: grid; justify-items: center; gap: 18px; max-width: 560px; }
      .av-entrance h1 { margin: 0; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 800; line-height: 1.05; }
      .av-entrance p { margin: 0; font-size: 1.1rem; line-height: 1.5; color: #58688b; }
      .av-entrance-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 10px; }
      .av-entrance button { display: inline-flex; align-items: center; gap: 10px; padding: 14px 36px; border: 0; border-radius: 999px; background: #134bd7; color: #fff; font: inherit; font-size: 1.1rem; font-weight: 700; cursor: var(--cursor-hand, pointer); box-shadow: 0 8px 22px rgb(19 75 215 / 25%); transition: transform .15s ease, background .15s ease; }
      .av-entrance button:hover { background: #0738b4; transform: translateY(-1px); }
      .av-entrance button.is-quiet { background: #fff; color: #134bd7; box-shadow: inset 0 0 0 1.5px #134bd7; }
      .av-entrance button.is-quiet:hover { background: #ecf4ff; }
      .av-entrance button:focus-visible { outline: 3px solid #ff936b; outline-offset: 3px; }
      @media (prefers-reduced-motion: reduce) { .av-entrance, .av-entrance.is-leaving { transition: none; } }`;
    entrance = document.createElement('div');
    entrance.className = 'av-entrance';
    entrance.setAttribute('role', 'dialog');
    entrance.setAttribute('aria-modal', 'true');
    entrance.setAttribute('aria-labelledby', 'av-entrance-title');
    entrance.innerHTML = `<div class="av-entrance-card">
      <h1 id="av-entrance-title">L’Atelier Vente</h1>
      <p>Souhaitez-vous une musique de fond pendant les exercices ?<br>Vous pourrez changer d’avis à tout moment avec le bouton&nbsp;«&nbsp;Musique&nbsp;».</p>
      <div class="av-entrance-actions">
        <button type="button" data-entrance="on">${svg(NOTE)}Avec musique</button>
        <button type="button" class="is-quiet" data-entrance="off">${svg(NOTE + SLASH)}Sans musique</button>
      </div>
    </div>`;
    entrance.appendChild(style);
    document.body.appendChild(entrance);
    requestAnimationFrame(() => requestAnimationFrame(() => entrance.classList.add('is-shown')));
    // « Avec » : le geste a déjà lancé la musique (écoute en capture, plus
    // haut). « Sans » : la musique est coupée et le choix mémorisé.
    entrance.addEventListener('click', event => {
      const choice = event.target.closest('[data-entrance]');
      if (!choice) return;
      try { root.sessionStorage.setItem(`${MUSIC_STORE}-choisie`, 'oui'); } catch { /* on redemandera */ }
      if (choice.dataset.entrance === 'off') setMusic(false);
      else startMusic();
      waiting(false);
      entrance.classList.add('is-leaving');
      setTimeout(() => entrance.remove(), 650);
    });
  }

  const NOTE = '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>';
  const SLASH = '<path d="m3.5 3.5 17 17"/>';

  function paintMusic(button) {
    button.innerHTML = `${svg(NOTE + (musicOff ? SLASH : ''))}<span class="sound-toggle-label">${musicOff ? 'Musique coupée' : 'Musique'}</span>`;
    button.setAttribute('aria-pressed', String(!musicOff));
    button.setAttribute('aria-label', musicOff ? 'Activer la musique' : 'Couper la musique');
    button.title = musicOff ? 'Activer la musique' : 'Couper la musique';
  }

  /* Musique voulue ou non : mémorisé, bouton mis à jour. Couper ne fait
   * que rendre la musique muette : elle continue en silence, et la remettre
   * la fait entendre au même endroit, sans repartir du début ni refaire de
   * fondu. Si elle ne jouait pas encore, la remettre la lance. */
  function setMusic(on) {
    musicOff = !on;
    try { root.localStorage.setItem(MUSIC_STORE, musicOff ? 'off' : 'on'); } catch { /* préférence non mémorisée */ }
    const button = document.querySelector('[data-music-toggle]');
    if (button) paintMusic(button);
    if (player && !player.paused) player.muted = musicOff;
    else if (!musicOff) startMusic();
  }

  /* Le curseur de volume : il apparaît sous le bouton Musique au survol
   * ou au clavier (focus). Le changement s'entend aussitôt, sans fondu.
   * Styles intégrés : le curseur vaut aussi hors module (Go Live, GitHub). */
  function setVolume(value) {
    musicVolume = value;
    try { root.localStorage.setItem(VOLUME_STORE, String(value)); } catch { /* volume non mémorisé */ }
    if (value > 0 && musicOff) { setMusic(true); return; }
    if (player && !player.paused && current) {
      player.fadeId = (player.fadeId || 0) + 1; // un fondu en cours s'arrête là
      player.volume = level(current);
    }
  }

  function volumeControl() {
    const style = document.createElement('style');
    style.textContent = `
      .music-control { position: relative; display: inline-flex; }
      .topbar:has(.music-control:hover), .topbar:has(.music-control:focus-within) { z-index: 30; }
      .music-volume { position: absolute; top: 100%; right: 0; z-index: 60; padding-top: 10px; visibility: hidden; opacity: 0; transition: opacity .15s ease, visibility 0s linear .15s; }
      .music-control:hover .music-volume, .music-control:focus-within .music-volume { visibility: visible; opacity: 1; transition-delay: 0s; }
      .music-volume-box { display: grid; gap: 8px; width: 210px; padding: 12px 16px 14px; border: 1px solid #dce3f0; border-radius: 14px; background: #fff; box-shadow: 0 12px 30px rgb(16 20 72 / 14%); font-family: 'Fira Sans', system-ui, sans-serif; color: #101448; text-align: left; }
      .music-volume-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; white-space: nowrap; font-size: .8rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: #58688b; }
      .music-volume-head output { font-size: .9rem; letter-spacing: 0; color: #134bd7; }
      .music-volume input { width: 100%; margin: 0; accent-color: #134bd7; cursor: var(--cursor-hand, pointer); }`;
    const wrap = document.createElement('span');
    wrap.className = 'music-control';
    wrap.innerHTML = `<div class="music-volume"><div class="music-volume-box">
      <label class="music-volume-head" for="music-volume-range"><span>Volume musique</span><output for="music-volume-range">${musicVolume} %</output></label>
      <input id="music-volume-range" type="range" min="0" max="100" step="1" value="${musicVolume}">
    </div></div>`;
    wrap.appendChild(style);
    const range = wrap.querySelector('input');
    const out = wrap.querySelector('output');
    range.addEventListener('input', () => { out.textContent = `${range.value} %`; setVolume(Number(range.value)); });
    return wrap;
  }

  function addMusicToggle(after) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'header-button sound-toggle music-toggle';
    button.dataset.musicToggle = 'true';
    paintMusic(button);
    // Un clic sur le bouton qui attendait lance la musique (par le geste) :
    // il ne doit pas, dans la foulée, la couper.
    const armed = () => { if (button.classList.contains('is-waiting')) button.dataset.wasWaiting = 'true'; };
    button.addEventListener('pointerdown', armed);
    button.addEventListener('keydown', armed);
    button.addEventListener('click', () => {
      if (button.dataset.wasWaiting) { delete button.dataset.wasWaiting; return; }
      setMusic(musicOff);
    });
    const control = volumeControl();
    control.prepend(button);
    after.after(control);
    if (current && !musicOff && (!player || player.paused)) waiting(true);
  }

  /* ─────────────────────────── L'écoute de la page ─────────────────────── */

  const CLICKABLE = 'button, a.button, [role="radio"], [role="tab"], label, select, summary';
  const WRONG = '.mark-ko, .is-wrong, .is-ko, .row-ko, .card-ko, .is-bad, .tone-bad, .is-missed, .is-incorrect';
  const RIGHT = '.mark-ok, .is-answer, .is-ok';

  /* Les boutons qui valident sans formulaire (cartes à classer) annoncent
   * leur effet par `data-act` : ils sonnent comme une validation. */
  const VALIDATES = '[data-act="dk-confirm"], [data-act="place"], [data-act="classify"]';

  /* Une désélection : un interrupteur actif (aria-pressed="true") qu'on
   * reclique, ou une case qu'on décoche. Une case cliquée directement est
   * déjà basculée quand le clic arrive ici ; cliquée par son étiquette, elle
   * le sera juste après. Les boutons radio et les onglets ne se
   * désélectionnent pas : ils n'entrent pas dans ce cas. */
  function isDeselect(target, event, pressing = false) {
    if (target.matches('[aria-pressed="true"]')) return true;
    const direct = event.target.matches && event.target.matches('input[type="checkbox"]') ? event.target : null;
    // À l'appui, la case n'a pas encore basculé ; au clic, si.
    if (direct) return pressing ? direct.checked : !direct.checked;
    const box = target.matches('label') && target.control && target.control.type === 'checkbox' ? target.control : null;
    return Boolean(box && box.checked);
  }

  /* Deux familles de clics. Un choix d'exercice (carte, option, mot, verbe…)
   * fait « pop » ; le reste (boutons d'action, liens, onglets, en-tête,
   * navigation, fenêtres d'aide) a son propre son, plus neutre. Les boutons
   * d'action portent les classes génériques `.button` ou `.text-button` ;
   * les choix ont chacun leur classe propre. */
  const UTILITY = '.button, .text-button, .header-button, a[href], [data-action], [role="tab"], summary, .k-back, .k-reset, .k-dialog-button';
  const UTILITY_ZONE = '.k-bar, .form-actions, .topbar, .exercise-nav, #exercise-links, header, nav, footer, dialog, .k-head';
  const isChoice = target => Boolean(target.closest('#main')) && !target.matches(UTILITY) && !target.closest(UTILITY_ZONE);

  /* Le son d'un élément cliqué. `pressing` : on est à l'appui du bouton de la
   * souris, avant le clic proprement dit. */
  function clickSound(target, event, pressing) {
    // La croix d'une fenêtre : c'est la fermeture qui sonne (voir plus bas).
    if (target.matches('[data-action="close-dialog"]')) return null;
    if (target.matches('[data-action="start-exercise"]')) return 'start';
    if (target.matches(VALIDATES)) return 'click';
    if (isDeselect(target, event, pressing)) return 'deselect';
    if (target.matches('[data-drop], [data-zone], .dk-zone, .mt-zone')) return 'drop';
    return isChoice(target) ? 'click' : 'nav';
  }

  function sound(name) {
    if (!name) return;
    if (name === 'start' || name === 'deselect') {
      if (recordings[name]) playFile(name); else play('click');
    } else play(name);
  }

  const clickable = event => {
    const target = event.target.closest && event.target.closest(CLICKABLE);
    if (!target || target.dataset.soundToggle || target.disabled) return null;
    // Le bouton de validation a son propre son, joué après le moteur.
    return target.matches('button[type="submit"]') ? null : target;
  };

  /* Le son part dès l'appui : le clic, lui, n'arrive qu'au relâchement,
   * et ce décalage se sentait. Les cartes à glisser attendent le clic, pour
   * ne pas sonner à chaque prise en main. Le clic qui suit ne rejoue rien. */
  let pressed = null;
  let recent = null;
  document.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    const target = clickable(event);
    if (!target || target.closest('[draggable="true"], [data-drag]')) return;
    const name = clickSound(target, event, true);
    if (name === 'drop') return;
    sound(name);
    pressed = { target, at: Date.now() };
  }, true);

  document.addEventListener('click', event => {
    const target = clickable(event);
    if (!target) return;
    const now = Date.now();
    const early = Boolean(pressed && pressed.target === target && now - pressed.at < 1500);
    pressed = null;
    // Une étiquette relaie le clic à sa case : ce second clic ne sonne pas.
    const relayed = Boolean(recent && recent.target === target && now - recent.at < 400 && event.target.matches && event.target.matches('input'));
    recent = { target, at: now };
    // Un choix qui valide aussitôt (une carte classée) fait « pop » ; la
    // validation ne garde alors que ses sons de résultat.
    if (target.matches(VALIDATES)) { if (!early) play('click'); afterValidation(true); return; }
    if (early || relayed) return;
    sound(clickSound(target, event, false));
  }, true);

  /* LE SURVOL. Passer la souris sur un choix d'exercice (carte, option…)
   * fait un tic, une fois par choix : rien tant qu'on reste dessus, ni
   * sur les boutons d'action, ni au doigt. Comme les sons de l'apparition,
   * il attend que la page ait reçu un premier geste (sinon il partirait
   * plus tard, au premier clic). */
  let hovered = null;
  let hoveredAt = 0;
  document.addEventListener('pointerover', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const target = event.target.closest && event.target.closest(CLICKABLE);
    if (target === hovered) return;
    hovered = target;
    if (!target || target.disabled || target.matches('[aria-disabled="true"], .is-locked, .is-used') || !isChoice(target)) return;
    if (!context || context.state !== 'running' || muted) return;
    const now = Date.now();
    if (now - hoveredAt < 70) return; // balayage rapide : pas de crépitement
    hoveredAt = now;
    playFile('hover');
  }, true);

  /* Une fenêtre se ferme, par sa croix, un clic à côté ou la touche Échap.
   * Le son part dès l'appui (croix, fond assombri) ou dès la touche : la
   * fermeture elle-même, l'événement `close`, n'arrive qu'au relâchement,
   * puis au tour suivant du navigateur, et le son traînait. `close` (qui
   * ne remonte pas, d'où la phase de capture) reste en secours, pour une
   * fermeture par le code. */
  let closedAt = 0;
  function closeSound() {
    closedAt = Date.now();
    if (recordings.close) playFile('close'); else play('nav');
  }
  const outside = (dialog, event) => {
    const box = dialog.getBoundingClientRect();
    return event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  };
  document.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.target.closest) return;
    const cross = event.target.closest('[data-action="close-dialog"]');
    const backdrop = event.target.tagName === 'DIALOG' && event.target.open && outside(event.target, event);
    if (cross || backdrop) closeSound();
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('dialog[open]')) closeSound();
  }, true);
  document.addEventListener('close', event => {
    if (event.target && event.target.tagName === 'DIALOG' && Date.now() - closedAt > 1500) closeSound();
  }, true);

  document.addEventListener('atelier:drop', () => play('drop'));
  document.addEventListener('drop', event => {
    if (event.target.closest && event.target.closest('[data-drop], .drop-zone, .slot')) play('drop');
  }, true);

  /* Le score affiché tranche quand il existe : « 2 / 3 » est un échec, même
   * si la correction contient aussi des marques vertes ; « 3 / 3 », une
   * réussite. Sans score, ce sont les marques juste / faux qui décident. */
  const SCORES = '.k-result strong, .cgr-score strong, .result-score, .crash-score, .drift-score';
  function verdictFromScores(main) {
    const found = [...main.querySelectorAll(SCORES)]
      .map(el => /(\d+)\s*\/\s*(\d+)/.exec(el.textContent))
      .filter(Boolean)
      .map(m => [Number(m[1]), Number(m[2])])
      .filter(([, total]) => total > 0);
    if (!found.length) return null;
    return found.every(([got, total]) => got >= total) ? 'right' : 'wrong';
  }

  /* Une validation : on photographie l'état avant, puis on lit ce que le
   * moteur a affiché, une fois son travail fini. */
  function afterValidation(quietStep = false) {
    const feedback = document.querySelector('#feedback');
    const wasShown = feedback && !feedback.hidden && feedback.innerHTML.trim() !== '';
    const before = document.querySelector('#main')?.innerHTML || '';
    const count = sel => document.querySelectorAll(`#main :is(${sel})`).length;
    const marksBefore = { wrong: count(WRONG), right: count(RIGHT) };
    setTimeout(() => {
      const errors = document.querySelector('#form-errors');
      if (errors && !errors.hidden && errors.textContent.trim()) { play('missing'); return; }
      // Le corrigé est souvent redessiné : on relit l'élément, pas l'ancien.
      const now = document.querySelector('#feedback');
      const shown = now && !now.hidden && now.innerHTML.trim() !== '';
      const main = document.querySelector('#main');
      if (shown && (!wasShown || main.innerHTML !== before)) {
        const scored = verdictFromScores(main);
        if (scored === 'wrong' || (scored !== 'right' && main.querySelector(WRONG))) { if (recordings.wrong) playFile('wrong'); else play('wrong'); }
        else if (scored === 'right' || main.querySelector(RIGHT)) { if (recordings.correct) playFile('correct'); else play('correct'); }
        else play('done');
        return;
      }
      // Un exercice à plusieurs cas corrige chaque cas sur place, sans la
      // fiche de corrigé : des marques juste / faux qui apparaissent valent
      // un résultat.
      const wrongNow = count(WRONG), rightNow = count(RIGHT);
      if (main && main.innerHTML !== before && (wrongNow > marksBefore.wrong || rightNow > marksBefore.right)) {
        if (wrongNow > marksBefore.wrong) { if (recordings.wrong) playFile('wrong'); else play('wrong'); }
        else if (recordings.correct) playFile('correct'); else play('correct');
        return;
      }
      if (main && main.innerHTML !== before && !quietStep) play('step');
    }, 30);
  }

  document.addEventListener('submit', event => {
    if (event.target.closest && event.target.closest('#main')) afterValidation();
  }, true);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addToggle);
  else addToggle();

  /* `levels()` rend les mesures de chaque fichier (en dB), pour contrôle. */
  const levels = () => Object.fromEntries(Object.entries(FILES).map(([name, spec]) => [name, spec.level || null]));
  /* `cue` joue un son enregistré par son nom (exercise.js s'en sert pour
   * l'apparition des exercices). */
  // Le contexte audio dort tant que la page n'a reçu aucun geste : un son
  // lancé alors attendrait, et partirait au premier clic, à contretemps.
  // L'apparition d'un exercice ne sonne donc que si le son est déjà possible.
  const cue = name => {
    if (!context || context.state !== 'running') return;
    if (recordings[name] || buffers[name]) playFile(name);
  };
  root.AtelierSounds = Object.freeze({
    play, levels, cue, get muted() { return muted; },
    get music() { return { track: current, volume: player ? player.volume : 0, paused: player ? player.paused : true, muted: player ? player.muted : false, time: player ? player.currentTime : 0, off: musicOff }; }
  });
})(globalThis);
