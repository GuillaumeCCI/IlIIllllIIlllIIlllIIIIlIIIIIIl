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

  /* Le corrigé, d'après la maquette : à gauche une carte par maladresse
   * (drapeau, passage, réponse attendue, explication, et la ligne de
   * l'apprenant), à droite les conseils tirés de « ce que la réponse oublie
   * aussi ». L'explication de la fiche se coupe à son premier « : ». */
  const TONES = ['coral', 'green', 'blue', 'green'];
  // Le corrigé a deux onglets : 1 · maladresses et conseils, 2 · réécriture.
  // Non enregistré : il rouvre toujours sur le premier.
  let reviewTab = 1;
  const TIP_ICONS = ['chat', 'lightbulb', 'users'];

  function reviewScreen() {
    return reviewTab === 2 ? rewriteReview() : faultsReview();
  }

  function faultsReview() {
    const caught = passages.filter((_, i) => rowOf(i) !== undefined).length;
    const others = [0, 1, 2, 3].filter(r => flag(r) === null && kit.filled(ex.value(`error${r}`)));
    return `<div class="k-columns crash-corrige">
      <section class="k-panel crash-faults">
        <h2>Les maladresses du commercial</h2>
        <p class="k-muted">${caught === passages.length ? `Vous avez repéré les ${passages.length} maladresses.` : `Vous avez posé un drapeau sur ${caught} passage${caught > 1 ? 's' : ''} sur ${passages.length}.`} Voici les réponses attendues.</p>
        <ol class="crash-fault-list">${passages.map((p, i) => {
          const cut = p.error.indexOf(' : ');
          const label = cut > 0 ? p.error.slice(0, cut) : p.error;
          const detail = cut > 0 ? p.error.slice(cut + 3) : '';
          const row = rowOf(i);
          return `<li class="crash-fault">
            <span class="crash-fault-flag tone-${TONES[i % TONES.length]}">${icon('flag', { size: 24 })}<b>${i + 1}</b></span>
            <div>
              <p class="crash-fault-quote">« ${esc(p.text)} »</p>
              <p class="crash-fault-answer"><strong>Réponse attendue :</strong> ${esc(label)}.</p>
              ${detail ? `<p class="crash-fault-detail">${esc(detail.charAt(0).toUpperCase() + detail.slice(1))}</p>` : ''}
              <p class="crash-fault-yours">${row !== undefined ? `Votre réponse : « ${esc(ex.value(`error${row}`))} »` : 'Passage non repéré.'}</p>
            </div>
          </li>`;
        }).join('')}</ol>
        ${others.length ? `<h3 class="k-small-title">Vos autres repérages</h3><ul class="crash-own">${others.map(r => `<li>${esc(ex.value(`error${r}`))}</li>`).join('')}</ul>` : ''}
      </section>
      <div class="crash-side">
      ${content.missing ? `<aside class="k-panel crash-tips">
        <h2>Conseils pour progresser</h2>
        <p class="k-muted">Ce que la réponse du commercial oublie aussi.</p>
        <ul>${content.missing.map((m, i) => `<li><span class="crash-tip-icon tone-${['blue', 'coral', 'green'][i % 3]}">${icon(TIP_ICONS[i % TIP_ICONS.length], { size: 26 })}</span><div><strong>${esc(m.title)}</strong><p>${esc(m.text)}</p></div></li>`).join('')}</ul>
      </aside>` : ''}
        <div class="crash-side-next">${kit.act('review-tab', `<span>Voir la réécriture</span>${icon('arrowRight', { size: 18 })}`, 'primary', 'data-tab="2"')}</div>
      </div>
    </div>
    <div class="k-utility">${kit.reset()}</div>`;
  }

  function rewriteReview() {
    return `<section class="k-panel">
      <h2>La réécriture</h2>
      <p class="k-muted">Comparez votre réponse au client avec le corrigé modèle.</p>
      <div class="k-columns is-even">${kit.yours('Votre réponse', ex.value('rewrite'))}${kit.model('Corrigé modèle', content.model)}</div>
      <div class="crash-review-back">${kit.back('review-tab', 'Revenir aux maladresses')}</div>
    </section>
    ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const at = stage();
    return `<div class="k-page crash-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: reviewing ? 'Voici les maladresses à repérer, et les réponses attendues.' : content.subtitle,
        aside: `${kit.steps(['Diagnostic', 'Réécriture'], reviewing ? 3 : at, { compact: true })}${reviewing ? '' : kit.tourButton()}` })}
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
    back: () => { kit.setStage(1); kit.commit(); },
    'review-tab': el => {
      reviewTab = Number(el.dataset.tab) === 2 ? 2 : 1;
      ex.rebuild();
      window.scrollTo({ top: 0 });
    }
  });
  kit.live(() => {
    const submit = core.$('.crash-actions .k-submit');
    if (submit) submit.dataset.pending = named() === ROWS ? 'false' : 'true';
    return { named: `<strong>${named()} / ${ROWS}</strong> erreurs repérées`, flags: flags() };
  });
  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  kit.tour('s3-1.2', [
    { target: '.crash-exchange', title: 'L’échange à analyser', text: 'Le client trouve l’offre trop chère. Lisez la réponse du commercial.',
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Cliquez sur un passage maladroit pour y poser un drapeau.' },
        { symbol: 'undo', tone: 'coral', text: 'Recliquez-le pour retirer le drapeau.' }
      ] },
    { target: '.crash-diag .crash-score, .crash-rows', title: 'Votre diagnostic', text: 'Chaque drapeau posé remplit une ligne, de 1 à 4.',
      items: [
        { symbol: 'pencil', tone: 'blue', text: 'Sur chaque ligne, nommez précisément la maladresse.' },
        { symbol: 'flag', tone: 'coral', text: 'En haut, un drapeau se colore à chaque erreur nommée.' }
      ] },
    { target: '.crash-actions .k-dialog-button', title: 'Un indice', text: 'Un doute ? Ce bouton rappelle les étapes de la méthode.' },
    { target: '.crash-actions .k-submit', title: 'Passer à la réécriture',
      items: [
        { symbol: 'check', tone: 'blue', text: 'Le bouton s’active quand les 4 maladresses sont nommées.' },
        { symbol: 'pencil', tone: 'green', text: 'Vous réécrivez ensuite la réponse que le commercial aurait dû faire.' }
      ] }
  ]);

  ex.mount('s3-1.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
