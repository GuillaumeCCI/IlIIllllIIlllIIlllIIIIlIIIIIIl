/* S1 D · Construire son ouverture.
 * Quatre à six phrases, chacune reliée à sa fonction.
 *
 * Après validation, l'écran bascule en relecture : chaque ligne reçoit sa
 * pastille en face de la fonction choisie, puis la version modèle s'affiche
 * juste en dessous, construite de la même façon. Le corrigé n'est plus un
 * bloc unique : chaque remarque se trouve au contact de ce qu'elle corrige.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S1;
  const correction = content.feedback.D;
  const { required } = window.ExerciseRules;

  const lineCount = () => Math.min(6, Math.max(4, Number(ex.value('lineCount')) || 4));
  const lineKey = i => `line${i}`;
  const techniqueKey = i => `technique${i}`;

  /* Les fonctions réellement employées par l'apprenant, sans doublon. */
  const chosenFunctions = () => {
    const used = new Set();
    for (let i = 1; i <= lineCount(); i++) {
      const value = ex.value(techniqueKey(i));
      if (value) used.add(value);
    }
    return used;
  };

  /* Une fonction clé absente est le vrai défaut à signaler. */
  const missingFunctions = () => {
    const used = chosenFunctions();
    return correction.requiredFunctions.filter(fonction => !used.has(fonction));
  };

  /* ── Les lignes, en saisie puis en relecture ─────────────────────────── */

  function editableRows() {
    return Array.from({ length: lineCount() }, (_, i) => {
      const n = i + 1;
      return `<div class="writing-row">
        <span class="step-number">${n}</span>
        ${ex.field(lineKey(n), `Phrase ${n}`, { max: 300, rows: 1, placeholder: i ? 'Ajoutez la suite…' : 'Écrivez votre première phrase…', hideLabel: true })}
        ${ex.select(techniqueKey(n), `Fonction de la phrase ${n}`, content.techniques, 'Choisir une fonction')}
        ${i >= 4 ? core.button(icon('close', { size: 16 }), 'remove-line', 'icon-button', `data-index="${n}" aria-label="Supprimer la phrase ${n}"`) : ''}
      </div>`;
    }).join('');
  }

  /* En relecture, la ligne et sa fonction deviennent du texte, suivis du
   * repère propre à la fonction choisie. La pastille est verte quand la
   * fonction fait partie des quatre attendues ; « Adaptation » reste un
   * choix légitime, simplement pas une fonction clé. */
  function reviewedRows() {
    return Array.from({ length: lineCount() }, (_, i) => {
      const n = i + 1;
      const text = ex.value(lineKey(n));
      const fonction = ex.value(techniqueKey(n));
      const isKey = correction.requiredFunctions.includes(fonction);
      const guidance = correction.guidance[fonction];
      return `<div class="review-row ${isKey ? 'is-key' : ''}">
        <span class="step-number">${n}</span>
        <div class="review-body">
          <p class="review-line">« ${esc(text)} »</p>
          ${guidance ? `<p class="inline-note tone-neutral">${esc(guidance)}</p>` : ''}
        </div>
        <span class="review-function">${ex.verdictMark(isKey)}<span>${esc(fonction)}</span></span>
      </div>`;
    }).join('');
  }

  /* Le modèle, présenté exactement comme la production de l'apprenant. */
  function modelRows() {
    return `<div class="review-rows model-rows">${correction.model.map((row, i) => `<div class="review-row">
      <span class="step-number">${i + 1}</span>
      <div class="review-body">
        <p class="review-line">« ${esc(row.line)} »</p>
        <p class="inline-note tone-good">${esc(row.intention)}</p>
      </div>
      <span class="review-function"><span>${esc(row.fonction)}</span></span>
    </div>`).join('')}</div>`;
  }

  /* ── L'écran ─────────────────────────────────────────────────────────── */

  /* La saisie, selon la maquette : consigne et lignes à gauche, la
   * vendeuse en réflexion à droite, montrée entière. */
  const ART = { image: 'assets/illustrations/s1/ouverture-reflexion.webp', alt: 'Une vendeuse réfléchit à son ouverture devant son ordinateur, un stylo à la main.' };

  function writing() {
    return `<form class="wiz-layout writing-layout" data-bar-stays novalidate>
      <section class="wiz-main">
        ${core.pageTitle('Mise en situation', 'Construisez votre ouverture', 'Rédigez une ouverture commerciale complète (4 à 6 phrases) pour la situation de votre choix. Écrivez une phrase par ligne et sélectionnez sa fonction.')}
        <div class="exercise-body">
          ${editableRows()}
          ${lineCount() < 6 ? core.button('+ Ajouter une ligne', 'add-line', 'text-button') : ''}
        </div>
        <div class="wiz-note is-deco"><p>Votre ouverture doit être fluide, adaptée à la situation et donner envie au client d’échanger.</p></div>
        ${core.errorsBox()}
      </section>
      <aside class="wiz-aside">
        <div class="wiz-art is-whole">${core.illustration(ART)}</div>
        ${ex.actions('Valider mon ouverture')}
      </aside>
      ${core.feedbackBox()}
    </form>`;
  }

  function screen() {
    if (!ex.reviewing()) return writing();
    const missing = missingFunctions();
    const many = missing.length > 1;

    const body = `<div class="review-rows">${reviewedRows()}</div>
         ${missing.length
           ? ex.inlineNote(`Fonction${many ? 's' : ''} clé${many ? 's' : ''} absente${many ? 's' : ''} de votre ouverture : ${missing.join(', ')}.`, 'bad')
           : ex.inlineNote('Les quatre fonctions clés sont présentes : accueil, présentation, cadrage et transition vers l’écoute.', 'good')}
         ${ex.modelBlock('La même ouverture, version modèle', modelRows(), correction.criterion)}`;

    return `<div class="writing-workshop">
      ${core.pageTitle('Atelier d’écriture', 'Construisez votre ouverture', 'Rédigez une ouverture commerciale complète (4 à 6 phrases) pour la situation de votre choix. Écrivez une phrase par ligne et sélectionnez sa fonction.')}
      <form class="panel" novalidate>
        <div class="panel-title">
          <h2>Votre ouverture</h2>
          <span class="muted">Votre production, relue</span>
        </div>
        <div class="exercise-body">${body}</div>
        ${core.errorsBox()}
        ${ex.actions('Valider mon ouverture')}
        ${core.feedbackBox()}
      </form>
    </div>`;
  }

  function validate(values) {
    const errors = [];
    const count = Math.min(6, Math.max(4, Number(values.lineCount) || 4));
    for (let i = 1; i <= count; i++) {
      const error = required(values, lineKey(i), `Phrase ${i}`, 300);
      if (error) errors.push(error);
      if (!content.techniques.includes(values[techniqueKey(i)])) errors.push({ key: techniqueKey(i), message: `Phrase ${i} : choisissez une fonction.` });
    }
    return errors;
  }

  /* Le pavé de relecture se réduit à l'essentiel : le détail est en place. */
  function feedback() {
    const missing = missingFunctions();
    return missing.length
      ? [`Relisez votre ouverture : il y manque ${missing.length > 1 ? 'les fonctions' : 'la fonction'} ${missing.join(', ')}. Comparez avec la version modèle ci-dessus.`]
      : ['Les quatre fonctions clés sont présentes et identifiées. Comparez vos formulations à la version modèle ci-dessus.'];
  }

  function removeLine(index) {
    const total = lineCount();
    for (let i = index; i < total; i++) {
      ex.setValue(lineKey(i), ex.value(lineKey(i + 1)));
      ex.setValue(techniqueKey(i), ex.value(techniqueKey(i + 1)));
    }
    ex.setValue(lineKey(total), '');
    ex.setValue(techniqueKey(total), '');
    ex.setValue('lineCount', total - 1);
    ex.changed();
    ex.rebuild(lineKey(Math.max(1, index - 1)));
  }

  function onMount() {
    core.$('[data-action="add-line"]')?.addEventListener('click', () => {
      ex.setValue('lineCount', Math.min(6, lineCount() + 1));
      ex.changed();
      ex.rebuild(lineKey(lineCount()));
    });
    core.$$('[data-action="remove-line"]').forEach(node =>
      node.addEventListener('click', () => removeLine(Number(node.dataset.index))));
  }

  ex.mount('s1-D', { screen, validate, feedback, onMount });
})();
