/* S3 1.2 · Le crash-test de l'objection prix.
 *
 * Deux temps :
 *   1 · DIAGNOSTIC : on clique les passages maladroits de la réponse du
 *       commercial pour y poser un drapeau, puis on nomme chaque erreur ;
 *   2 · RÉÉCRITURE : on rédige la réponse que le commercial aurait dû faire.
 * Un drapeau se pose sur la première ligne libre ; recliquer le passage
 * le retire. Nommer l'erreur reste obligatoire, le drapeau est un repère.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['1.2'];
  const passages = content.passages;
  const ROWS = 4;

  const stage = () => kit.stage(2);
  const flag = r => {
    const v = ex.value(`flag${r}`);
    return Number.isInteger(v) && v >= 0 && v < passages.length ? v : null;
  };
  const rowOf = p => [0, 1, 2, 3].find(r => flag(r) === p);
  const named = () => [0, 1, 2, 3].filter(r => kit.filled(ex.value(`error${r}`))).length;

  /* L'échange, d'après la maquette : un portrait par interlocuteur, et la
   * réponse du commercial découpée en bulles, une par passage. Cliquer une
   * bulle y pose (ou retire) un drapeau numéroté. */
  const avatar = (who, label) =>
    `<span class="crash-avatar"><img src="${esc(core.asset(`assets/illustrations/s3/crash-${who}.webp`))}" alt="" decoding="async"><small>${label}</small></span>`;

  function exchange(clickable) {
    return `<ol class="crash-chat">
      <li class="crash-line">${avatar('client', 'Client')}<p class="crash-bubble">« ${esc(content.client)} »</p></li>
      <li class="crash-line is-seller">${avatar('commercial', 'Commercial')}
        <div class="crash-replies">${passages.map((p, i) => {
          const row = rowOf(i);
          const badge = row !== undefined ? `<span class="crash-flag">${icon('flag', { size: 14 })}${row + 1}</span>` : '';
          return clickable
            ? `<button type="button" class="crash-passage ${row !== undefined ? 'is-flagged' : ''}" data-act="flag" data-index="${i}" aria-pressed="${row !== undefined}">${badge}<span>« ${esc(p.text)} »</span></button>`
            : `<span class="crash-passage is-static ${row !== undefined ? 'is-flagged' : ''}">${badge}<span>« ${esc(p.text)} »</span></span>`;
        }).join('')}</div></li>
    </ol>`;
  }

  function flags() {
    return `<span class="crash-flags" aria-hidden="true">${[0, 1, 2, 3].map(r => `<span class="crash-flag-icon ${kit.filled(ex.value(`error${r}`)) ? 'is-on' : ''}">${icon('flag', { size: 26 })}</span>`).join('')}</span>`;
  }

  function diagnostic() {
    return `<div class="k-columns crash-layout">
      <section class="k-panel crash-exchange">
        <h2 class="crash-title">L’échange à analyser</h2>
        ${exchange(true)}
        ${kit.help('Sélectionnez un passage pour poser un drapeau.')}
      </section>
      <form class="k-panel crash-diag" novalidate>
        <h2>Votre diagnostic</h2>
        <div class="crash-score"><span class="k-count" data-live="named"><strong>${named()} / ${ROWS}</strong> erreurs repérées</span><span data-live="flags">${flags()}</span></div>
        <p class="k-muted">Nommez précisément chaque maladresse.</p>
        <ol class="crash-rows">${[0, 1, 2, 3].map(r => `<li>
          <span class="crash-row-flag">${icon('flag', { size: 18 })}<b>${r + 1}</b></span>
          <div>${flag(r) !== null ? `<p class="crash-quote">« ${esc(passages[flag(r)].text)} »</p>` : ''}
            <label class="sr-only" for="field-error${r}">Erreur repérée ${r + 1}</label>
            <input type="text" id="field-error${r}" data-field="error${r}" maxlength="200" placeholder="Erreur repérée…" value="${esc(ex.value(`error${r}`))}"></div>
        </li>`).join('')}</ol>
        ${core.errorsBox()}
        <div class="crash-actions">${kit.dialogButton('hint', 'Voir un indice', 'text-button', 'lightbulb')}${kit.submit('Passer à la réécriture', named() === ROWS ? '' : 'data-pending="true"')}</div>
      </form>
    </div>`;
  }

  function rewrite() {
    return `<div class="k-columns crash-layout">
      <section class="k-panel crash-exchange">
        <h2 class="crash-title">L’échange à réparer</h2>
        ${exchange(false)}
        <h3 class="k-small-title">Votre diagnostic</h3>
        <ol class="crash-own">${[0, 1, 2, 3].map(r => `<li>${esc(ex.value(`error${r}`))}</li>`).join('')}</ol>
        <button type="button" class="text-button with-icon" data-act="back">${icon('pencil', { size: 15 })}<span>Modifier mon diagnostic</span></button>
      </section>
      <form class="k-panel" novalidate>
        <h2>Réécrivez la réponse</h2>
        <p class="crash-client">${icon('users', { size: 20 })}<span>Le client : « ${esc(content.client)} »</span></p>
        ${ex.field('rewrite', 'Votre réponse au client', { placeholder: 'Ce que le commercial aurait dû répondre…', max: 800, rows: 7, hideLabel: true })}
        ${kit.tip(content.rewriteHelp)}
        ${core.errorsBox()}
        ${kit.bar({ left: kit.back('back', 'Revenir au diagnostic'), right: kit.submit('Valider ma réécriture') })}
      </form>
    </div>`;
  }

  function reviewScreen() {
    const caught = passages.filter((_, i) => rowOf(i) !== undefined).length;
    return `<section class="k-panel">
      <h2>Les maladresses du corrigé</h2>
      <p class="k-muted">Vous avez posé un drapeau sur ${caught} passage${caught > 1 ? 's' : ''} sur ${passages.length}.</p>
      <ol class="crash-review">${passages.map((p, i) => `<li class="${rowOf(i) !== undefined ? 'is-ok' : ''}">
        <p class="crash-quote">« ${esc(p.text)} »</p><p>${esc(p.error)}</p>
        ${rowOf(i) !== undefined ? `<p class="crash-yours">Votre ligne ${rowOf(i) + 1} : ${esc(ex.value(`error${rowOf(i)}`))}</p>` : ''}
      </li>`).join('')}</ol>
      ${content.missing ? `<h3 class="k-small-title">Ce que la réponse oublie aussi</h3><ol class="crash-review">${content.missing.map(m => `<li><p class="crash-quote">${esc(m.title)}</p><p>${esc(m.text)}</p></li>`).join('')}</ol>` : ''}
      ${[0, 1, 2, 3].some(r => flag(r) === null) ? `<h3 class="k-small-title">Vos autres repérages</h3><ul class="crash-own">${[0, 1, 2, 3].filter(r => flag(r) === null).map(r => `<li>${esc(ex.value(`error${r}`))}</li>`).join('')}</ul>` : ''}
    </section>
    <section class="k-panel">
      <h2>La réécriture</h2>
      <div class="k-columns is-even">${kit.yours('Votre réponse', ex.value('rewrite'))}${kit.model('Corrigé modèle', content.model)}</div>
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = stage();
    return `<div class="k-page crash-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: kit.steps(['Diagnostic', 'Réécriture'], reviewing ? 3 : at, { compact: true }) })}
      ${reviewing ? reviewScreen() : at === 1 ? diagnostic() : rewrite()}
      ${reviewing ? '' : kit.utility('Corrigé disponible après la réécriture')}
    </div>`;
  }

  function validate(values) {
    const missing = [0, 1, 2, 3].filter(r => !kit.filled(values[`error${r}`]));
    if (missing.length) return [{ key: `error${missing[0]}`, message: `Nommez les ${ROWS} maladresses (${missing.length} ligne${missing.length > 1 ? 's' : ''} vide${missing.length > 1 ? 's' : ''}).` }];
    if (stage() === 1) return [];
    return kit.filled(values.rewrite) ? [] : [{ key: 'rewrite', message: 'Réécrivez la réponse du commercial.' }];
  }

  function intercept(values) {
    if (stage() !== 1 || validate(values).length) return false;
    kit.setStage(2);
    return true;
  }

  const feedback = () => ['Votre réécriture suit-elle les étapes : accueillir, questionner, reformuler, traiter, contrôler ?'];

  kit.on({
    flag: el => {
      const p = Number(el.dataset.index);
      const row = rowOf(p);
      if (row !== undefined) ex.setValue(`flag${row}`, null);
      else {
        const free = [0, 1, 2, 3].find(r => flag(r) === null);
        if (free === undefined) { core.toast('Les 4 drapeaux sont posés : retirez-en un pour le déplacer.'); return; }
        ex.setValue(`flag${free}`, p);
      }
      kit.commit();
    },
    back: () => { kit.setStage(1); kit.commit(); }
  });
  kit.live(() => {
    const submit = core.$('.crash-actions .k-submit');
    if (submit) submit.dataset.pending = named() === ROWS ? 'false' : 'true';
    return { named: `<strong>${named()} / ${ROWS}</strong> erreurs repérées`, flags: flags() };
  });
  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  ex.mount('s3-1.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
