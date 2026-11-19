/* S1 A · Analyser une accroche.
 * Écouter, relever les points forts et les axes d’amélioration, réécrire.
 * Puis s'autoévaluer : pour chaque critère de la grille, l'apprenant dit si
 * sa version y répond ; le corrigé ne vient qu'après.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const media = window.AtelierMedia;
  const content = window.ATELIER_S1;

  /* L'analyse, une question à la fois : la pastille d'étapes au-dessus, un
   * grand numéro, le champ, puis « Continuer » (ou la validation à la fin).
   * `context` : ce que l'étape demande, dans la fenêtre « Le contexte ». */
  const STEPS = [
    { key: 'strengths', title: 'Qu’est-ce que Camille réussit dans son accroche ?', hint: 'Citez ses mots, puis dites pourquoi ils fonctionnent : une ou deux phrases par point fort.',
      context: [
        ['target', 'Le but de l’étape', 'Relever ce que Camille réussit dans son accroche.'],
        ['pencil', 'Comment faire', 'Pour chaque point fort, citez ses mots et dites pourquoi ils fonctionnent.']
      ],
      body: () => ex.field('strengths', 'Ce qui fonctionne', { placeholder: 'Par exemple : elle commence par…', rows: 6, hideLabel: true }) },
    { key: 'improvements', title: 'Qu’est-ce que Camille devrait changer ?', hint: 'Relevez deux ou trois points précis : citez le passage qui gêne, puis dites ce que vous feriez à la place. Pensez à la clarté de son message et à ce que ce client attend.',
      context: [
        ['target', 'Le but de l’étape', 'Repérer ce qui gêne dans l’accroche et ce qu’il faudrait changer : on appelle cela des axes d’amélioration.'],
        ['pencil', 'Comment faire', 'Pour chaque axe, citez le passage concerné et dites ce que vous feriez à la place.'],
        ['lightbulb', 'À quoi penser', 'La clarté de son message, et ce qu’attend un gérant qui reçoit une conseillère pour la première fois.']
      ],
      body: () => ex.field('improvements', 'Ce que Camille devrait changer', { placeholder: 'Par exemple : quand elle dit « … », elle devrait plutôt…', rows: 6, hideLabel: true }) },
    { key: 'rewrite', title: 'À sa place, comment ouvririez-vous ce rendez-vous ?', hint: 'Réécrivez l’accroche telle que vous la diriez au client, en trois ou quatre phrases : gardez ce qui fonctionne, corrigez ce que vous avez relevé.',
      context: [
        ['target', 'Le but de l’étape', 'Réécrire l’accroche comme si vous étiez Camille.'],
        ['pencil', 'Comment faire', 'Gardez ce qui fonctionne et corrigez les axes d’amélioration que vous avez relevés.'],
        ['list', 'Une ouverture réussie', ['Accueil et climat : saluer, remercier, mettre à l’aise.', 'Présentation : dire qui vous êtes, votre fonction, votre entreprise.', 'Cadrage : annoncer l’objet, le déroulé ou la durée.', 'Transition vers l’écoute : donner la parole au client.', 'Posture centrée client : parler de lui, sans monopoliser la parole.', 'Adaptation : ajuster au client, au canal et à la situation.']]
      ],
      body: () => ex.field('rewrite', 'Votre version de l’accroche', { placeholder: 'Bonjour, …', max: 800, rows: 6, hideLabel: true }) }
  ];

  function analysisStep() {
    const at = Math.min(ex.wizardAt(), STEPS.length - 1);
    const step = STEPS[at];
    const last = at === STEPS.length - 1;
    return `<div class="wiz-column">
      ${core.stepPill(at, STEPS.length)}
      <form class="panel answer-panel wiz-panel" novalidate>
        <div class="wiz-panel-head">${window.AtelierKit ? window.AtelierKit.contextButton() + window.AtelierKit.tourButton() : ''}</div>
        <div class="wiz-number"><span>${at + 1}</span><div><h2>${esc(step.title)}</h2>${step.hint ? `<p>${esc(step.hint)}</p>` : ''}</div></div>
        ${step.body()}
        ${last
          ? `${core.errorsBox()}<div class="wiz-actions">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon')}<button type="submit" class="button primary">Valider mon analyse</button></div>`
          : `<div class="wiz-actions">${at ? core.button(`${icon('arrowLeft', { size: 17 })}<span>Étape précédente</span>`, 'wizard-prev', 'text-button with-icon') : ''}${core.button(`<span>Continuer</span>${icon('arrowRight', { size: 18 })}`, 'wizard-next', 'primary', `data-require="${step.key}"`)}</div>`}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  /* L'autoévaluation, une fois les trois étapes écrites : l'analyse à
   * gauche pour la relire, la grille à droite, critère par critère. */
  const selfKey = i => `self${i}`;
  const selfShown = () => ex.value('selfCheck') === true;

  function selfScreen() {
    return `<section class="self-eval">
      ${window.AtelierKit ? `<div class="tour-corner">${window.AtelierKit.contextButton()}</div>` : ''}
      ${core.pageTitle('Autoévaluation', 'Votre version de l’accroche est-elle une ouverture réussie ?', 'Relisez votre version (n° 3, à gauche). Pour chacun des six critères, dites si elle y répond : oui, en partie ou non.')}
      <div class="self-layout">
        <aside class="panel self-recap">
          <h2>Votre analyse</h2>
          ${VERDICTS.map((row, i) => `<div class="self-recap-item"><span class="an-n" aria-hidden="true">${i + 1}</span><div><h3>${esc(row.title)}</h3><p>« ${esc(ex.value(row.key))} »</p></div></div>`).join('')}
        </aside>
        <form class="panel self-form" novalidate>
          <h2>Les critères</h2>
          ${ex.selfList(content.rubric, selfKey)}
          ${core.errorsBox()}
          <div class="wiz-actions">${core.button(`${icon('arrowLeft', { size: 17 })}<span>Modifier mon analyse</span>`, 'self-back', 'text-button with-icon')}<button type="submit" class="button primary">Voir le corrigé</button></div>
        </form>
      </div>
    </section>`;
  }

  /* Le corrigé, d'après la maquette : pleine largeur, une ligne par point.
   * À gauche le numéro, le titre et la réponse de l'apprenant ; à droite le
   * retour, teinté selon le verdict. La mise en situation reste à portée
   * dans une fenêtre. */
  const VERDICTS = [
    { key: 'strengths', title: 'Ce que Camille réussit', tone: 'good', label: 'Une réponse possible', symbol: 'lightbulb' },
    { key: 'improvements', title: 'Ce qu’elle devrait changer', tone: 'bad', label: 'Une réponse possible', symbol: 'lightbulb' },
    { key: 'rewrite', title: 'Votre version de l’accroche', tone: 'neutral', label: 'Une réponse possible', symbol: 'lightbulb' }
  ];

  /* L'autoévaluation face au score : pour chaque critère de la grille, ce
   * que l'apprenant a répondu, et ce que le score a repéré sous le même nom. */
  function compare(result, only) {
    const grade = i => ex.selfGrades.find(g => g.id === ex.value(selfKey(i))) || { id: 'vide', label: 'Sans réponse' };
    const lines = result ? (only === undefined ? result.blocs : [result.blocs[only]]).flatMap(b => b.lines) : [];
    const seen = title => {
      const same = lines.filter(l => l.nom === title || l.nom.startsWith(`${title} :`));
      if (!same.length) return '<span class="an-seen is-none">L’outil ne sait pas le repérer : à juger vous-même</span>';
      return same.some(l => l.kind === 'ok') ? '<span class="an-seen is-ok">✓ Oui</span>' : '<span class="an-seen is-miss">○ Non</span>';
    };
    return `<div class="an-compare">
        <h3>Votre autoévaluation, critère par critère</h3>
        <p class="muted">Ce que vous avez répondu pour votre version améliorée, face à ce que l’outil a repéré dans votre texte.</p>
        <table><thead><tr><th>Critère</th><th>Votre avis</th><th>Repéré dans votre texte ?</th></tr></thead>
        <tbody>${content.rubric.map(([title], i) => `<tr><th>${esc(title)}</th><td><span class="self-pill is-${grade(i).id}">${esc(grade(i).label)}</span></td><td>${seen(title)}</td></tr>`).join('')}</tbody></table>
      </div>`;
  }

  function reviewScreen() {
    const notes = content.feedback.A;
    // Le score estimatif, intégré réponse par réponse (grille « integre »).
    const analyse = window.AtelierAnalyse;
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES['s1-A'];
    const result = analyse && grid ? analyse.score(grid, ex.values()) : null;
    // La couleur suit le résultat : tout trouvé, rien trouvé, entre les deux.
    const toneOf = bloc => { const lines = bloc.lines.filter(l => l.kind !== 'warn'); const ok = lines.filter(l => l.kind === 'ok').length; return ok === lines.length ? 'good' : ok === 0 ? 'bad' : 'neutral'; };
    return `<section class="an-review">
      <header class="an-head">
        ${core.pageTitle('Corrigé', 'Votre analyse de l’accroche', 'Vos trois réponses, chacune face à une réponse possible.')}
        ${core.button(`${icon('document', { size: 20 })}<span>Voir la mise en situation</span>`, 'scenario', 'subtle with-icon')}
      </header>
      ${window.AtelierCorrige.head(result, { rubric: content.rubric, selfKey, bloc: result ? result.blocs[VERDICTS.findIndex(row => row.key === 'rewrite')] : null, what: 'votre version améliorée' })}
      <ol class="an-rows">${VERDICTS.map((row, i) => `<li class="an-row tone-${result ? toneOf(result.blocs[i]) : row.tone}">
        <div class="an-yours">
          <span class="an-n" aria-hidden="true">${i + 1}</span>
          <div><h2>${esc(row.title)}</h2><p>« ${result ? analyse.answer(result.blocs[i]) : esc(ex.value(row.key))} »</p>${result ? analyse.lines(result.blocs[i], { withText: false }) : ''}</div>
        </div>
        <div class="an-verdict">
          <span class="an-mark" aria-hidden="true">${icon(row.symbol, { size: 20, strokeWidth: 3 })}</span>
          <div><h3>${esc(row.label)}</h3><p>${esc(notes[i])}</p></div>
        </div>
      </li>`).join('')}</ol>
      ${core.feedbackBox()}
    </section>`;
  }

  function screen() {
    const current = core.findExercise('s1-A');
    if (ex.reviewing()) return reviewScreen();
    if (selfShown()) return selfScreen();
    return `<div class="two-columns">
      <section class="scenario">
        ${core.pageTitle('Mise en situation', 'Rendez-vous chez un client · l’accroche de Camille')}
        ${core.callout('Camille ouvre un rendez-vous chez un client. Écoutez son accroche : vous direz ce qu’elle réussit, ce qu’elle devrait changer, puis vous la réécrirez.')}
        <div class="media-scene">
          ${core.illustration(current)}
          ${core.button(icon('play', { size: 30 }), 'listen', 'play-button', 'aria-label="Écouter l’accroche"')}
        </div>
        <div class="media-actions">
          ${core.button(`${icon('play', { size: 18 })}<span data-audio-label>Écouter l’accroche</span>`, 'listen', 'primary')}
          ${core.button('Voir la transcription', 'transcript', 'subtle')}
        </div>
        ${content.audio.demo ? '<p class="asset-note">Accroche de démonstration · lecture vocale de votre navigateur.</p>' : ''}
        ${core.note('Appuyez chaque réponse sur ses mots exacts : la transcription est là pour les relire.')}
      </section>
      ${analysisStep()}
    </div>`;
  }

  const { required } = window.ExerciseRules;

  const analysisErrors = values => [
    required(values, 'strengths', 'Ce qui fonctionne', 500),
    required(values, 'improvements', 'Axes d’amélioration', 500),
    required(values, 'rewrite', 'Votre version améliorée', 800)
  ].filter(Boolean);

  // Sur la grille, chaque critère attend sa réponse.
  const validate = values => selfShown()
    ? ex.selfErrors(content.rubric, selfKey, values, 'dites si votre version y répond')
    : analysisErrors(values);

  /* Les trois étapes remplies, « Valider mon analyse » ouvre la grille
   * au lieu du corrigé. */
  function intercept(values) {
    if (selfShown() || analysisErrors(values).length) return false;
    ex.setValue('selfCheck', true);
    return true;
  }

  /* Les trois constats sont posés dans le corrigé : le bilan ne garde que
   * le bouton de suite. */
  const feedback = () => [];

  const transcript = () =>
    `<p class="tag">${content.audio.demo ? 'Texte de démonstration' : 'Accroche de l’exercice'}</p>
     <blockquote class="transcript">« ${esc(content.audio.transcript)} »</blockquote>`;

  /* La fenêtre « Le contexte » s'ouvre à l'arrivée, puis à chaque
   * nouvelle étape ; « Le contexte » la rouvre. */
  const stepNow = () => (ex.reviewing() || selfShown() ? null : Math.min(ex.wizardAt(), STEPS.length - 1));
  let contextStep = null;
  function onMount() {
    const at = stepNow();
    if (at !== null && contextStep !== null && at !== contextStep && window.AtelierKit) window.AtelierKit.contextOpen();
    if (at !== null) contextStep = at;
    // Le gros bouton ▶ et « Écouter l’accroche » portent tous deux data-action="listen" :
    // un seul écouteur chacun, sinon le second clic arrête aussitôt la lecture.
    document.querySelectorAll('[data-action="listen"]').forEach(button =>
      button.addEventListener('click', () => media.listen(content.audio)));
    core.$('[data-action="transcript"]')?.addEventListener('click', () => core.openDialog(
      'Transcription de l’accroche',
      `${transcript()}
       ${content.audio.demo ? '<p class="muted">Aucun enregistrement n’était joint aux maquettes. Cet exemple sert de support à l’exercice.</p>' : ''}`));
    core.$('[data-action="scenario"]')?.addEventListener('click', () => {
      core.openDialog('Rendez-vous chez un client · l’accroche de Camille',
        `${core.callout('Camille ouvre un rendez-vous chez un client. Écoutez son accroche : vous direz ce qu’elle réussit, ce qu’elle devrait changer, puis vous la réécrirez.')}
         ${transcript()}
         <div class="media-actions">${core.button(`${icon('play', { size: 18 })}<span data-audio-label>Écouter l’accroche</span>`, 'listen', 'primary')}</div>`);
      core.$('#dialog-body [data-action="listen"]')?.addEventListener('click', () => media.listen(content.audio));
    });
    core.$('[data-action="self-back"]')?.addEventListener('click', () => {
      ex.setValue('selfCheck', false);
      core.persist();
      ex.render();
    });
  }

  if (window.AtelierKit) window.AtelierKit.context(
    () => (stepNow() === null ? null : STEPS[stepNow()].context),
    () => `Étape ${stepNow() + 1} · ${STEPS[stepNow()].title}`);

  // À l'arrivée sur l'autoévaluation : ce qu'on a sous les yeux.
  if (window.AtelierKit) window.AtelierKit.selfContext('.self-eval', [
    ['eye', 'Ce que vous évaluez', 'Votre version de l’accroche (n° 3, à gauche).'],
    ['list', 'Une ouverture réussie', ['Accueil et climat : saluer, remercier, mettre à l’aise.', 'Présentation : dire qui vous êtes, votre fonction, votre entreprise.', 'Cadrage : annoncer l’objet, le déroulé ou la durée.', 'Transition vers l’écoute : donner la parole au client.', 'Posture centrée client : parler de lui, sans monopoliser la parole.', 'Adaptation : ajuster au client, au canal et à la situation.']],
    ['list', 'Ce qui vous est demandé', 'Pour chaque critère, dites si votre version y répond : « Oui », « En partie » ou « Non ».'],
    ['checkCircle', 'Ensuite', 'Le corrigé s’affiche. Vous comparez votre regard avec le sien.']
  ]);

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  if (window.AtelierKit) window.AtelierKit.tour('s1-A', [
    { target: '.scenario .callout', title: 'La consigne', text: 'Vous analysez l’accroche de Camille, conseillère en assurance, en trois temps :',
      items: [
        { key: '1', tone: 'green', text: 'ce qu’elle réussit ;' },
        { key: '2', tone: 'coral', text: 'deux ou trois choses à changer ;' },
        { key: '3', tone: 'blue', text: 'votre version de l’accroche.' }
      ] },
    { target: '.media-scene, .media-actions', title: 'L’accroche', text: 'Commencez par écouter l’accroche.',
      items: [
        { symbol: 'play', tone: 'blue', text: 'Le bouton ▶ ou « Écouter l’accroche » lance l’écoute.' },
        { symbol: 'document', tone: 'blue', text: '« Voir la transcription » affiche le texte de l’accroche.' }
      ] },
    { target: '.step-pill', title: 'Trois étapes', text: 'Vous répondez à une question à la fois :',
      items: [
        { key: '1', tone: 'green', text: 'Ce que Camille réussit.' },
        { key: '2', tone: 'coral', text: 'Ce qu’elle devrait changer : deux ou trois points précis.' },
        { key: '3', tone: 'blue', text: 'Votre version : vous réécrivez l’accroche.' }
      ],
      after: 'La pastille montre l’étape en cours.' },
    { target: '.wiz-panel .field', title: 'Votre réponse', text: 'Écrivez ici votre réponse à l’étape en cours, avec des exemples précis tirés de l’accroche.' },
    { target: '.wiz-actions', title: 'Continuer',
      items: [
        { symbol: 'arrowRight', tone: 'blue', text: '« Continuer » ouvre l’étape suivante.' },
        { symbol: 'checkCircle', tone: 'green', text: 'À la troisième étape, vous validez, puis vous faites votre autoévaluation.' },
        { symbol: 'document', tone: 'blue', text: 'Le corrigé s’affiche ensuite.' }
      ] }
  ]);

  ex.mount('s1-A', { screen, validate, intercept, feedback, onMount, compactFeedback: true });
})();
