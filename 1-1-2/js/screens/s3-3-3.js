/* S3 3.3 · Le bon argument au bon moment.
 *
 * Trois attentes du client, cinq arguments. Pour chaque attente, un seul
 * argument ; un argument retenu ne peut plus servir ; deux arguments sont
 * des intrus et resteront inutilisés.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S3['3.3'];
  const needs = content.needs;
  const options = content.options;
  const letters = 'abcde';

  const need = () => Math.min(Math.max(0, Number(ex.value('need')) || 0), needs.length - 1);
  const pick = i => { const v = ex.value(`pick${i}`); return v === '' ? null : Number(v); };
  const done = i => ex.value(`done${i}`) === true;
  const takenBy = option => needs.findIndex((_, i) => pick(i) === option);

  /* Mise en page « une réplique, puis les choix » : la parole du client
   * dans sa carte (portrait, puis la citation entre guillemets), puis les
   * arguments empilés pleine largeur, en lignes compactes : tout l'exercice
   * tient à l'écran. Un trait corail coiffe le titre, à la place du
   * surtitre. */
  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = need();
    const free = options.filter((_, o) => takenBy(o) === -1 || takenBy(o) === i).length;
    return `<div class="k-page say-page is-moment">
      ${kit.head({ title: content.title, subtitle: content.subtitle,
        aside: `<div class="say-progress"><span class="say-dots">${needs.map((item, n) =>
          `<button type="button" class="say-dot ${n === i ? 'is-current' : done(n) ? 'is-done' : ''}" data-act="need" data-index="${n}" aria-label="Besoin ${n + 1} : ${esc(item.tab)}"></button>`).join('')}</span><span>Besoin ${i + 1} sur ${needs.length}</span></div>` })}
      <form novalidate>
        <section class="say-card">
          <div class="say-who" aria-hidden="true"><img class="say-portrait" src="${esc(core.asset('assets/illustrations/s3/say-cliente.webp'))}" alt="" decoding="async"></div>
          <div class="say-said">
            <p class="say-label">Le client vous dit</p>
            <div class="say-quote"><img class="say-glyph" src="${esc(core.asset('assets/illustrations/s3/say-guillemet-ouvrant.webp'))}" alt="" aria-hidden="true"><blockquote>${esc(needs[i].quote)}<img class="say-glyph is-closing" src="${esc(core.asset('assets/illustrations/s3/say-guillemet-fermant.webp'))}" alt="" aria-hidden="true"></blockquote></div>
          </div>
        </section>
        <div class="say-choose"><h2>Quel argument répond le mieux ?</h2><span class="k-muted">${free} disponible${free > 1 ? 's' : ''} · 2 resteront inutilisés</span></div>
        <div class="say-options" role="radiogroup">${options.map((text, o) => {
          const owner = takenBy(o);
          const locked = owner !== -1 && owner !== i;
          return `<label class="say-option ${locked ? 'is-locked' : ''}">
            <input type="radio" class="sr-only" name="pick${i}" data-field="pick${i}" value="${o}" ${pick(i) === o ? 'checked' : ''} ${locked ? 'disabled' : ''}>
            <span class="say-radio"></span><span class="say-letter">${letters[o]}</span>
            <span class="say-option-copy"><strong>${esc(text)}</strong>${locked ? `<small>Déjà retenu pour « ${esc(needs[owner].tab)} »</small>` : ''}</span>
          </label>`;
        }).join('')}</div>
        ${core.errorsBox()}
        <div class="say-actions">
          ${i ? kit.act('need-prev', `${icon('arrowLeft', { size: 17 })}<span>Précédent</span>`, 'text-button with-icon say-back') : '<span></span>'}
          ${kit.submit(needs.every((_, n) => n === i || done(n)) ? 'Valider mes choix' : 'Valider ma réponse')}
        </div>
      </form>
    </div>`;
  }

  /* Relecture : par besoin, la parole du client, votre choix, le corrigé,
   * puis le verdict expliqué. */
  function reviewScreen() {
    const right = needs.filter((item, i) => pick(i) === item.answer).length;
    const label = o => (o === null ? 'aucun argument' : `${letters[o]} · ${options[o]}`);
    return `${kit.answerReview({ subtitle: 'Voici vos réponses, accompagnées des bonnes réponses et d’une explication pour chaque besoin.',
        aside: `<p class="arv-score"><strong>${right} / ${needs.length}</strong> arguments bien placés</p>`,
        items: needs.map((item, i) => ({ tag: item.tab, text: `“${item.quote}”`, yours: pick(i) === null ? '' : options[pick(i)], expected: options[item.answer], ok: pick(i) === item.answer, why: item.why })) })}
      ${ex.inlineNote(content.intruders, 'neutral')}
      ${core.feedbackBox()}
      <div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate() {
    const i = need();
    if (pick(i) === null) return [{ key: `pick${i}`, message: 'Sélectionnez un argument.' }];
    const missing = needs.findIndex((_, n) => n !== i && !done(n));
    return missing === -1 ? [] : [{ key: 'need', message: `Répondez aussi au besoin « ${needs[missing].tab} ».` }];
  }

  function intercept() {
    const i = need();
    if (pick(i) === null) return false;
    ex.setValue(`done${i}`, true);
    const next = needs.findIndex((_, n) => !done(n));
    if (next === -1) return false;
    ex.setValue('need', next);
    return true;
  }

  function feedback() {
    const right = needs.filter((item, i) => pick(i) === item.answer).length;
    return [`${right} besoin${right > 1 ? 's' : ''} sur ${needs.length} servi${right > 1 ? 's' : ''} par l’argument attendu.`];
  }

  kit.on({
    need: el => { ex.setValue('need', Number(el.dataset.index)); kit.commit(); },
    'need-prev': () => { ex.setValue('need', Math.max(0, need() - 1)); kit.commit(); }
  });
  kit.dialogs({ rules: { title: 'Les règles', html: `<ul class="dialog-list">${content.rules.map(r => `<li>${esc(r)}</li>`).join('')}</ul>` } });

  ex.mount('s3-3.3', { screen, validate, intercept, feedback, compactFeedback: true });
})();
