/* S2 2.4 · Quatre faux pas face au prix.
 *
 * On clique les passages maladroits de la réponse du commercial pour y
 * poser un drapeau, puis on nomme chaque erreur. Un drapeau se pose sur la
 * première ligne libre ; recliquer le passage le retire. Nommer l'erreur
 * reste obligatoire, le drapeau est un repère.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S2['2.4'];
  const passages = content.passages;
  const ROWS = 4;
  const rows = [0, 1, 2, 3];

  const flag = r => {
    const v = ex.value(`flag${r}`);
    return Number.isInteger(v) && v >= 0 && v < passages.length ? v : null;
  };
  const rowOf = p => rows.find(r => flag(r) === p);
  const named = () => rows.filter(r => kit.filled(ex.value(`error${r}`))).length;

  function exchange(clickable) {
    return `<ol class="crash-chat">
      <li class="crash-line"><span class="crash-avatar">${icon('users', { size: 26 })}<small>Client</small></span><p class="crash-bubble">« ${esc(content.client)} »</p></li>
      <li class="crash-line is-seller"><span class="crash-avatar is-seller">${icon('users', { size: 26 })}<small>Commercial</small></span>
        <p class="crash-bubble is-long">« ${passages.map((p, i) => {
          const row = rowOf(i);
          return clickable
            ? `<button type="button" class="crash-passage ${row !== undefined ? 'is-flagged' : ''}" data-act="flag" data-index="${i}" aria-pressed="${row !== undefined}">${row !== undefined ? `<span class="crash-flag">${icon('flag', { size: 14 })}${row + 1}</span>` : ''}${esc(p.text)}</button>`
            : `<span class="crash-passage is-static ${row !== undefined ? 'is-flagged' : ''}">${esc(p.text)}</span>`;
        }).join(' ')} »</p></li>
    </ol>`;
  }

  const flags = () => `<span class="crash-flags" aria-hidden="true">${rows.map(r => `<span class="crash-flag-icon ${kit.filled(ex.value(`error${r}`)) ? 'is-on' : ''}">${icon('flag', { size: 26 })}</span>`).join('')}</span>`;

  function playScreen() {
    return `<div class="k-columns crash-layout">
      <section class="k-panel crash-exchange">
        <h2>L’échange</h2>
        ${exchange(true)}
        ${kit.help('Sélectionnez un passage, puis nommez l’erreur.')}
      </section>
      <form class="k-panel crash-diag" novalidate>
        <h2>Votre diagnostic</h2>
        <ol class="crash-rows">${rows.map(r => `<li>
          <span class="crash-row-flag">${icon('flag', { size: 18 })}<b>${r + 1}</b></span>
          <div>${flag(r) !== null ? `<p class="crash-quote">« ${esc(passages[flag(r)].text)} »</p>` : ''}
            <label class="sr-only" for="field-error${r}">Erreur repérée ${r + 1}</label>
            <input type="text" id="field-error${r}" data-field="error${r}" maxlength="200" placeholder="Erreur repérée…" value="${esc(ex.value(`error${r}`))}"></div>
        </li>`).join('')}</ol>
        ${core.errorsBox()}
        <div class="crash-actions">${kit.dialogButton('hint', 'Voir un indice', 'text-button', 'lightbulb')}${kit.submit('Voir mon débrief', named() === ROWS ? '' : 'data-pending="true"')}</div>
      </form>
    </div>`;
  }

  function reviewScreen() {
    const caught = passages.filter((_, i) => rowOf(i) !== undefined).length;
    return `<section class="k-panel">
      <h2>Les 4 faux pas</h2>
      <p class="k-muted">Vous avez posé un drapeau sur ${caught} passage${caught > 1 ? 's' : ''} sur ${passages.length}.</p>
      <ol class="crash-review">${passages.map((p, i) => `<li class="${rowOf(i) !== undefined ? 'is-ok' : ''}">
        <p class="crash-quote">« ${esc(p.text)} »</p><p>${esc(p.error)}</p>
        ${rowOf(i) !== undefined ? `<p class="crash-yours">Votre ligne ${rowOf(i) + 1} : ${esc(ex.value(`error${rowOf(i)}`))}</p>` : ''}
      </li>`).join('')}</ol>
      ${rows.some(r => flag(r) === null) ? `<h3 class="k-small-title">Vos autres repérages</h3><ul class="crash-own">${rows.filter(r => flag(r) === null).map(r => `<li>${esc(ex.value(`error${r}`))}</li>`).join('')}</ul>` : ''}
      ${content.keyPoint ? ex.inlineNote(content.keyPoint, 'neutral') : ''}
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page crash-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: reviewing ? '' : `<div class="crash-score"><span class="k-count" data-live="named"><strong>${named()} / ${ROWS}</strong> erreurs repérées</span><span data-live="flags">${flags()}</span></div>${kit.tourButton()}` })}
      ${reviewing ? reviewScreen() : playScreen()}
      ${reviewing ? '' : kit.utility('Débrief disponible après validation')}
    </div>`;
  }

  function validate(values) {
    const missing = rows.filter(r => !kit.filled(values[`error${r}`]));
    return missing.length ? [{ key: `error${missing[0]}`, message: `Nommez les ${ROWS} erreurs (${missing.length} ligne${missing.length > 1 ? 's' : ''} vide${missing.length > 1 ? 's' : ''}).` }] : [];
  }

  const feedback = () => ['Comparez vos repérages aux quatre faux pas du corrigé.'];

  kit.on({
    flag: el => {
      const p = Number(el.dataset.index);
      const row = rowOf(p);
      if (row !== undefined) ex.setValue(`flag${row}`, null);
      else {
        const free = rows.find(r => flag(r) === null);
        if (free === undefined) { core.toast('Les 4 drapeaux sont posés : retirez-en un pour le déplacer.'); return; }
        ex.setValue(`flag${free}`, p);
      }
      kit.commit();
    }
  });
  kit.live(() => {
    const submit = core.$('.crash-actions .k-submit');
    if (submit) submit.dataset.pending = named() === ROWS ? 'false' : 'true';
    return { named: `<strong>${named()} / ${ROWS}</strong> erreurs repérées`, flags: flags() };
  });
  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s2-2.4', [
    { target: '.crash-exchange', title: 'L’échange', text: 'Le client trouve le prix trop élevé. Lisez la réponse du commercial : elle contient quatre faux pas.' },
    { target: '.crash-line.is-seller .crash-bubble', title: 'Repérez les passages', text: 'Cliquez sur un passage maladroit : un drapeau numéroté s’y pose. Cliquez à nouveau pour le retirer.' },
    { target: '.crash-rows', title: 'Votre diagnostic', text: 'Le passage choisi s’affiche sur la ligne du même numéro. Écrivez ensuite l’erreur en quelques mots : c’est cette explication qui compte.' },
    { target: '.crash-score', title: 'Votre avancement', text: 'Chaque erreur nommée allume un drapeau. Il en faut quatre.' },
    { target: '.crash-actions', title: 'Indice et débrief', text: 'Un doute ? « Voir un indice » vous oriente. Quand les quatre erreurs sont nommées, « Voir mon débrief » affiche le corrigé.' }
  ]);

  ex.mount('s2-2.4', { screen, validate, feedback, compactFeedback: true });
})();
