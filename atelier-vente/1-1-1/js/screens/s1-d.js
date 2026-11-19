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
  // Le bouton « Visite guidée », en haut à droite de l'écran (kit.js chargé par la page).
  const kit = window.AtelierKit;
  const corner = () => (kit && !ex.reviewing() ? `<div class="tour-corner">${kit.tourButton()}</div>` : '');

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

  /* LE CORRIGÉ EN LIGNES (19/11 : l'ancien empilait cartes, encadrés et un
   * conseil répété ; la coche à côté de la fonction laissait croire que la
   * phrase était bonne). Une ligne par phrase : le numéro, la phrase, la
   * fonction choisie en petite étiquette. Le nom « Accueil / 4 × 20 » se
   * dit « Accueil ». */
  const plain = fonction => String(fonction || '').replace(' / 4 × 20', '');

  function reviewedRows(bloc) {
    return `<ol class="d-lines">${Array.from({ length: lineCount() }, (_, i) => {
      const n = i + 1;
      const fonction = ex.value(techniqueKey(n));
      return `<li><span class="d-n">${n}</span><p>« ${window.AtelierCorrige.part(bloc, ex.value(lineKey(n)))} »</p>${fonction ? `<span class="d-tag">${esc(plain(fonction))}</span>` : ''}</li>`;
    }).join('')}</ol>`;
  }

  /* Le modèle, construit de la même façon : la phrase, sa fonction, à quoi elle sert. */
  function modelRows() {
    return `<ol class="d-lines is-model">${correction.model.map((row, i) => `<li><span class="d-n">${i + 1}</span><p>« ${esc(row.line)} »<span class="d-why">${esc(row.intention)}</span></p><span class="d-tag">${esc(plain(row.fonction))}</span></li>`).join('')}</ol>`;
  }

  /* Le vrai retour : les quatre fonctions clés, chacune trouvée (dans quelle
   * phrase) ou absente, avec une seule fois ce qu'elle doit faire. */
  function keyFunctions() {
    const where = fonction => Array.from({ length: lineCount() }, (_, i) => i + 1).filter(n => ex.value(techniqueKey(n)) === fonction);
    return `<ul class="d-keys">${correction.requiredFunctions.map(fonction => {
      const lines = where(fonction);
      const found = lines.length > 0;
      const said = found ? `dans votre phrase ${lines.join(' et ')}` : 'absente de votre ouverture';
      return `<li class="${found ? 'is-ok' : 'is-miss'}"><span class="d-mark" aria-hidden="true">${found ? '✓' : '○'}</span><div><p><strong>${esc(plain(fonction))}</strong> · ${said}</p><p class="d-help">${esc(correction.guidance[fonction] || '')}</p></div></li>`;
    }).join('')}</ul>`;
  }

  /* ── L'écran ─────────────────────────────────────────────────────────── */

  /* La saisie, selon la maquette : consigne et lignes à gauche, la
   * vendeuse en réflexion à droite, montrée entière. */
  const ART = { image: 'assets/illustrations/s1/ouverture-reflexion.webp', alt: 'Une vendeuse réfléchit à son ouverture devant son ordinateur, un stylo à la main.' };

  function writing() {
    return `${corner()}<form class="wiz-layout writing-layout" data-bar-stays novalidate>
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

  /* Le corrigé au modèle de S1 A (js/corrige.js) : le score estimatif en
   * tête, puis votre ouverture, ligne par ligne avec sa fonction, face à
   * une réponse possible construite de la même façon. */
  function screen() {
    if (!ex.reviewing()) return writing();
    const corrige = window.AtelierCorrige;
    const result = corrige.score('s1-D', ex.values());
    const bloc = result ? result.blocs[0] : null;
    const missing = missingFunctions();
    const yours = reviewedRows(bloc);
    const keysTitle = missing.length
      ? `Il manque ${missing.length > 1 ? `${missing.length} fonctions clés` : 'une fonction clé'} à votre ouverture`
      : 'Votre ouverture remplit les quatre fonctions clés';

    return `<section class="an-review writing-review">
      ${core.pageTitle('Corrigé', 'Construisez votre ouverture', 'Votre ouverture, phrase par phrase, face à une réponse possible construite de la même façon, puis les quatre fonctions clés.')}
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Votre ouverture, phrase par phrase', bloc, yours, modelHtml: modelRows(), half: true })
      ])}
      <section class="panel d-keys-panel"><h2>${esc(keysTitle)}</h2><p class="d-keys-lead">Toute ouverture complète doit remplir ces quatre fonctions. Voici, pour chacune, la phrase où vous l’avez indiquée.</p>${keyFunctions()}</section>
      ${core.feedbackBox()}
    </section>`;
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

  /* Tout le corrigé est posé au-dessus : le bilan ne garde que le bouton de suite. */
  const feedback = () => ['À retenir : une ouverture complète accueille, présente, cadre l’échange, puis donne la parole au client.'];

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

  if (kit) kit.tour('s1-D', [
    { target: '.writing-row', title: 'Une phrase par ligne',
      items: [
        { symbol: 'pencil', tone: 'blue', text: 'À gauche, écrivez la phrase telle que vous la diriez au client.' },
        { symbol: 'list', tone: 'coral', text: 'À droite, choisissez ce qu’elle fait dans l’ouverture : sa fonction.' }
      ] },
    { target: '[data-action="add-line"]', title: 'De 4 à 6 phrases', text: 'Il en faut au moins 4. Ce lien ajoute une ligne, jusqu’à 6.' },
    { target: '.form-actions', title: 'Valider mon ouverture', text: 'Le corrigé reprend chacune de vos lignes, avec un repère sur la fonction choisie, face à une réponse possible.' }
  ]);

  ex.mount('s1-D', { screen, validate, feedback, onMount, compactFeedback: true });
})();
