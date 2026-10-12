/* S1 1.5 · Le tournoi des arguments.
 *
 * Quatre arguments, deux demi-finales, une finale, présentées un duel à
 * la fois : on choisit l'argument qui répond le mieux au besoin de
 * sécurité du client, puis « Valider mon choix » ouvre le duel suivant.
 * La finale oppose les deux vainqueurs. Puis on justifie le choix du
 * grand gagnant.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.5'];
  const C = content.contenders;
  const [semi1, semi2] = content.semis;

  const pick = key => ex.value(key) || '';
  const stage = () => (kit.stage(2) === 2 && pick('final') ? 2 : 1);
  const finalists = () => [pick('semi1'), pick('semi2')];
  const semisDone = () => Boolean(pick('semi1') && pick('semi2'));

  const MATCHES = ['semi1', 'semi2', 'final'];
  const LABELS = ['Demi-finale 1 sur 2', 'Demi-finale 2 sur 2', 'La grande finale'];
  const pairOf = m => (m === 0 ? semi1 : m === 1 ? semi2 : finalists());
  /* Le duel affiché : celui qu'on a ouvert, s'il est jouable, sinon le
   * premier sans vainqueur. La finale n'est jouable qu'après les demis. */
  const playable = m => m < 2 || semisDone();
  function match() {
    const asked = ex.value('match');
    if (Number.isInteger(asked) && asked >= 0 && asked <= 2 && playable(asked)) return asked;
    const first = MATCHES.findIndex(key => !pick(key));
    return first === -1 ? 2 : first;
  }

  const contender = (letter, key, chosen) => {
    const item = C[letter];
    const state = chosen === letter ? 'is-winner' : chosen ? 'is-loser' : '';
    /* Une carte illustrée se lit en paysage : la lettre et le titre à
     * gauche, l'illustration à droite (`bleed` : elle touche les bords). */
    const art = item.image ? `<span class="duel-art ${item.bleed ? 'is-bleed' : ''}"><img src="${esc(core.webAsset(item.image))}" alt="" decoding="async"></span>` : '';
    return `<button type="button" class="duel-card ${art ? 'has-picture' : ''} ${state}" data-act="pick" data-match="${key}" data-letter="${letter}" aria-pressed="${chosen === letter}">
      <span class="duel-radio" aria-hidden="true">${chosen === letter ? icon('check', { size: 16 }) : ''}</span>
      <span class="duel-letter tone-${item.tone}">${letter}</span>
      <span class="duel-text">${esc(item.short)}</span>
      ${art}
    </button>`;
  };

  /* Le fil des trois matchs, en haut à droite : on peut revenir sur un
   * duel déjà joué. */
  function matchSteps(at) {
    return `<div class="match-steps"><span class="match-count">${at + 1} sur 3</span>${MATCHES.map((key, m) => {
      const state = m === at ? 'is-active' : pick(key) ? 'is-done' : '';
      return `${m ? '<span class="match-line" aria-hidden="true"></span>' : ''}<button type="button" class="match-dot ${state}" data-act="match" data-index="${m}" ${playable(m) ? '' : 'disabled'} aria-label="${LABELS[m]}">${m + 1}</button>`;
    }).join('')}</div>`;
  }

  function clientPanel() {
    const exercise = ex.current;
    return `<aside class="k-panel tournoi-client">
      <h2>Votre client</h2>
      ${exercise.image ? `<figure class="tournoi-picture"><img src="${esc(core.webAsset(exercise.image))}" alt="${esc(exercise.alt)}" decoding="async"></figure>` : ''}
      <div class="soncas-recap is-small"><span class="soncas-recap-motive">${icon('shield', { size: 28 })}<span><small>Motivation dominante</small><strong>Sécurité</strong></span></span></div>
      <blockquote class="tournoi-quote">${icon('quote', { size: 26 })}<p>${esc(content.quote)}</p></blockquote>
      <p class="k-help">${icon('lightbulb', { size: 18 })}<span>Gardez sa préoccupation en tête à chaque match.</span></p>
    </aside>`;
  }

  function duel() {
    const m = match();
    const key = MATCHES[m];
    const [left, right] = pairOf(m);
    return `<form class="k-panel duel-panel" novalidate>
      <p class="duel-label">${LABELS[m]}</p>
      <h2>Faites s’affronter les arguments</h2>
      <p class="k-instruction">Cliquez sur le meilleur argument de chaque duel.</p>
      <div class="duel-pair is-solo">${contender(left, key, pick(key))}<span class="duel-vs">VS</span>${contender(right, key, pick(key))}</div>
      ${kit.tip('Le meilleur argument est celui qui répond le plus précisément au risque exprimé.')}
      ${core.errorsBox()}
      ${kit.bar({
        left: m ? kit.back('previous', 'Duel précédent') : '',
        right: `${kit.dialogButton('hint')}${kit.submit('Valider mon choix', pick(key) ? '' : 'data-pending="true"')}`
      })}
    </form>`;
  }

  function finished() {
    const winner = C[pick('final')];
    return `<form class="k-panel" novalidate>
      <h2 class="tournoi-done">${icon('trophy', { size: 34 })}<span>Tournoi terminé !</span></h2>
      <div class="tournoi-summary">
        <span>${icon('check', { size: 18 })}<strong>Demi-finale 1</strong><span class="duel-letter tone-${C[pick('semi1')].tone}">${pick('semi1')}</span></span>
        <span>${icon('check', { size: 18 })}<strong>Demi-finale 2</strong><span class="duel-letter tone-${C[pick('semi2')].tone}">${pick('semi2')}</span></span>
        <span>${icon('check', { size: 18 })}<strong>Finale</strong><span class="duel-letter tone-${C[pick('semi1')].tone}">${pick('semi1')}</span><small>VS</small><span class="duel-letter tone-${C[pick('semi2')].tone}">${pick('semi2')}</span></span>
      </div>
      <div class="tournoi-winner">
        <p class="k-label">Argument prioritaire</p>
        <p class="tournoi-winner-line"><span class="duel-letter tone-${winner.tone}">${pick('final')}</span><strong>${pick('final')} · ${esc(winner.text)}</strong><span class="tournoi-badge">${icon('crown', { size: 20 })}<span>Grand gagnant</span></span></p>
      </div>
      <div class="soncas-question"><span class="soncas-big is-small">4</span><div><h3>Justifiez votre choix</h3><p class="k-muted">En une ou deux phrases, expliquez pourquoi cet argument est le plus décisif pour ce profil de client.</p></div></div>
      ${ex.field('why', 'Votre justification', { placeholder: 'Cet argument est prioritaire parce que…', max: 300, rows: 4, hideLabel: true })}
      ${kit.tip('Reliez votre justification au risque de piratage exprimé par le client.')}
      ${core.errorsBox()}
      ${kit.bar({ left: kit.back('replay', 'Revoir le tournoi'), right: `${kit.dialogButton('hint')}${kit.submit('Valider ma réponse')}` })}
    </form>`;
  }

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const done = stage() === 2;
    return `<div class="k-page tournoi-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title,
        subtitle: 'Pour chaque face-à-face, sélectionnez l’argument qui répond le mieux au besoin de sécurité du client, jusqu’à désigner le grand gagnant.',
        aside: done ? `<p class="k-count"><strong>3 / 3</strong> matchs</p>` : matchSteps(match()) })}
      <div class="k-columns tournoi-layout">${clientPanel()}${done ? finished() : duel()}</div>
      ${kit.utility('Corrigé disponible après la finale')}
    </div>`;
  }

  function reviewScreen() {
    const rows = [['semi1', 'Demi-finale 1'], ['semi2', 'Demi-finale 2'], ['final', 'Finale']];
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: 'Votre tournoi, match par match', symbol: 'trophy' })}
      <section class="k-panel">
        <ul class="tournoi-review">${rows.map(([key, label]) => {
          const ok = pick(key) === content.expected[key];
          return `<li>
            <strong>${label}</strong>
            ${kit.mark(ok, ok ? `${pick(key)} · ${C[pick(key)].text}` : `Vous : ${pick(key)} · attendu : ${content.expected[key]}`)}
            <p class="k-muted">${esc(content.why[key])}</p>
          </li>`;
        }).join('')}</ul>
        ${kit.yours('Votre justification', ex.value('why'))}
        ${kit.model('Corrigé modèle', content.model)}
      </section>
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate(values) {
    if (stage() === 1 && !pick(MATCHES[match()])) return [{ key: 'duel', message: 'Choisissez le meilleur argument de ce duel.' }];
    if (!pick('semi1') || !pick('semi2')) return [{ key: 'semi', message: 'Départagez les deux demi-finales.' }];
    if (!pick('final')) return [{ key: 'final', message: 'Désignez le vainqueur de la finale.' }];
    if (stage() === 2 && !kit.filled(values.why)) return [{ key: 'why', message: 'Justifiez votre choix.' }];
    return [];
  }

  /* « Valider mon choix » : duel suivant, puis la justification. */
  function intercept() {
    if (stage() === 2) return false;
    const m = match();
    if (!pick(MATCHES[m])) return false;
    const next = MATCHES.findIndex((key, n) => n > m && !pick(key));
    if (next !== -1 || m < 2) { ex.setValue('match', next === -1 ? m + 1 : next); return true; }
    if (!pick('semi1') || !pick('semi2')) return false;
    kit.setStage(2);
    return true;
  }

  function feedback() {
    const right = ['semi1', 'semi2', 'final'].filter(key => pick(key) === content.expected[key]).length;
    return [`${right} match${right > 1 ? 's' : ''} sur 3 tranché${right > 1 ? 's' : ''} comme le repère.`];
  }

  kit.on({
    pick: el => {
      const { match: key, letter } = el.dataset;
      /* On reste sur ce duel jusqu'à « Valider mon choix ». */
      ex.setValue('match', MATCHES.indexOf(key));
      ex.setValue(key, letter);
      if (key !== 'final' && !finalists().includes(pick('final'))) ex.setValue('final', '');
      kit.commit();
    },
    match: el => { ex.setValue('match', Number(el.dataset.index)); kit.commit(); },
    previous: () => { ex.setValue('match', Math.max(0, match() - 1)); kit.commit(); },
    replay: () => { kit.setStage(1); ex.setValue('match', 2); kit.commit(); }
  });
  kit.dialogs({
    hint: {
      title: 'Un indice',
      html: '<p>Le client a déjà été piraté. Entre deux arguments de sécurité, préférez celui qui empêche l’intrusion elle-même plutôt que celui qui en limite les conséquences.</p>'
    }
  });

  ex.mount('s1-1.5', { screen, validate, intercept, feedback, compactFeedback: true });
})();
