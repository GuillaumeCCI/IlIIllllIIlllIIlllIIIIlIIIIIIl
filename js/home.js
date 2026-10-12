/* ACCUEIL · menu des séries, reprise du parcours et bilan global.
 *
 * `index.html#bilan` affiche le bilan ; sans ancre, l'accueil liste les
 * quatre séries et leurs exercices. Chaque lien ouvre la page de l'exercice.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const { $, esc, icon } = core;
  const catalog = core.catalog;

  const stateOf = key => core.isDone(key) ? { label: 'Terminé', className: 'done', done: true }
    : core.hasDraft(key) ? { label: 'À compléter', className: '', done: false }
    : { label: 'À commencer', className: '', done: false };

  /* Pastille d'état : l'icône n'apparaît que pour un exercice terminé. */
  const stateBadge = state =>
    `<span class="state ${state.className}">${state.done ? icon('check', { size: 15 }) : ''}<span>${esc(state.label)}</span></span>`;

  /* Le premier exercice non terminé : c'est là que « Reprendre » conduit. */
  function resumeTarget() {
    const next = catalog.all.find(exercise => !core.isDone(exercise.key));
    return next || catalog.all[0];
  }

  function home() {
    const done = core.completedCount();
    const total = catalog.all.length;
    const resume = resumeTarget();

    return `<div class="home-hero">
      ${core.pageTitle('Série 1-1-1', 'L’Atelier Vente', 'Vingt-trois exercices pour s’entraîner à la prise de contact, à l’écoute active, à la gestion des objections et à la manipulation des méthodes.')}
      <p class="muted">${done} exercice${done > 1 ? 's' : ''} terminé${done > 1 ? 's' : ''} sur ${total}. Vos réponses restent dans ce navigateur.</p>
      <div class="home-actions">
        ${core.linkButton(done ? 'Reprendre où je me suis arrêté' : 'Commencer le parcours', core.pageUrl(resume.file), 'primary')}
        ${core.linkButton('Voir mon bilan', '#bilan', 'secondary')}
      </div>
    </div>
    <div class="home-series">${catalog.series.map(serie => {
      const keys = serie.exercises.map(exercise => `${serie.id}-${exercise.id}`);
      const count = keys.filter(core.isDone).length;
      return `<section class="home-card">
        <h2>${esc(serie.label)}</h2>
        <p class="muted">${count} sur ${keys.length} terminés</p>
        <ol>${serie.exercises.map(exercise => {
          const key = `${serie.id}-${exercise.id}`;
          const state = stateOf(key);
          return `<li><a href="${esc(core.pageUrl(exercise.file))}">
            <span class="exercise-code">${esc(exercise.id)}</span>
            <span>${esc(exercise.label)}</span>
            ${stateBadge(state)}
          </a></li>`;
        }).join('')}</ol>
        ${core.linkButton(`Commencer ${serie.label.toLowerCase()}`, core.pageUrl(serie.exercises[0].file), 'secondary')}
      </section>`;
    }).join('')}</div>`;
  }

  function summary() {
    const done = core.completedCount();
    const total = catalog.all.length;
    return `<div class="summary-page">
      ${core.pageTitle('Votre parcours', done === total ? 'Les vingt-trois exercices sont terminés.' : 'Votre entraînement continue.',
        `${done} exercice${done > 1 ? 's' : ''} terminé${done > 1 ? 's' : ''} sur ${total}. Retrouvez vos réponses pour les relire ou les compléter.`)}
      ${catalog.series.map(serie => {
        const keys = serie.exercises.map(exercise => `${serie.id}-${exercise.id}`);
        const count = keys.filter(core.isDone).length;
        return `<section class="summary-series">
          <h2>${esc(serie.label)} <span>${count} / ${keys.length}</span></h2>
          <div class="summary-list">${serie.exercises.map(exercise => {
            const key = `${serie.id}-${exercise.id}`;
            const state = stateOf(key);
            return `<a class="summary-row" href="${esc(core.pageUrl(exercise.file))}">
              <span class="exercise-code">${esc(exercise.id)}</span>
              <strong>${esc(exercise.label)}</strong>
              ${stateBadge(state)}
            </a>`;
          }).join('')}</div>
        </section>`;
      }).join('')}
      <p class="muted">Ce bilan indique les exercices complétés. Il ne constitue pas une évaluation de vos compétences. Vos réponses sont conservées dans ce navigateur lorsque le stockage local est disponible.</p>
      <div class="home-actions">${core.linkButton('Revenir à l’accueil', 'index.html', 'secondary')}</div>
    </div>`;
  }

  function render() {
    const atSummary = location.hash === '#bilan';
    $('#main').innerHTML = atSummary ? summary() : home();
    document.title = atSummary ? 'Votre bilan · L’Atelier Vente' : 'L’Atelier Vente · Série 1-1-1';
    core.renderChrome(null);
    // L'accueil n'appartient à aucune série : pas de fond d'exercice.
    document.body.style.backgroundImage = `url(${JSON.stringify(core.asset(catalog.commonBackground))})`;

    const bar = $('#series-links');
    if (bar) bar.innerHTML = catalog.series.map(serie => {
      const keys = serie.exercises.map(exercise => `${serie.id}-${exercise.id}`);
      const count = keys.filter(core.isDone).length;
      return `<a href="${esc(core.pageUrl(serie.exercises[0].file))}" class="series-link"><strong>${esc(serie.label)}</strong><span>${count} / ${keys.length}</span></a>`;
    }).join('');
  }

  window.addEventListener('hashchange', render);
  core.wireDialog();
  render();
  core.wireFullscreen();
  core.wireKeyboardHelp();
})();
