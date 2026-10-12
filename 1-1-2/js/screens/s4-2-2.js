/* S4 2.2 · Passez en mode client.
 *
 * Deux défis, présentés un à la fois : à gauche la fiche technique, à
 * droite le bénéfice client à rédiger. « Valider et passer à l'étape
 * suivante » ouvre le défi suivant ; la dernière validation affiche le
 * corrigé, avec un exemple sous chaque bénéfice.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S4['2.2'];
  const challenges = content.challenges;

  const current = () => Math.min(Math.max(0, Number(ex.value('challenge')) || 0), challenges.length - 1);
  const filled = i => kit.filled(ex.value(`client${i}`));

  function screen() {
    if (ex.reviewing()) return reviewScreen();
    const i = current();
    const c = challenges[i];
    const last = challenges.every((_, n) => n === i || filled(n));
    return `<div class="k-page cap-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<div class="cap-progress"><span>Étape ${i + 1} sur ${challenges.length}</span><span class="k-dots">${challenges.map((_, n) =>
          `<button type="button" class="k-dot ${n === i ? 'is-current' : filled(n) ? 'is-done' : ''}" data-act="challenge" data-index="${n}" aria-label="Défi ${n + 1}"></button>`).join('')}</span></div>` })}
      <form novalidate>
        <section class="k-panel mc-solo">
          <div class="mc-solo-tech">
            <p class="cap-feature-head"><span class="cap-n">${i + 1}</span><span class="cap-pill">Fiche technique</span><span class="mc-solo-tag">${esc(c.tag)}</span></p>
            <div class="mc-solo-card"><span class="mc-solo-doc">${icon('document', { size: 26 })}</span><p>“ ${esc(c.card)} ”</p></div>
            ${c.symbol ? `<span class="mc-solo-art" aria-hidden="true">${icon(c.symbol, { size: 64, strokeWidth: 1.4 })}</span>` : ''}
          </div>
          <span class="mc-solo-arrow" aria-hidden="true">${icon('arrowRight', { size: 30 })}</span>
          <div class="mc-solo-client">
            <p class="mc-solo-head"><span class="mc-solo-user">${icon('users', { size: 20 })}</span><span class="mc-solo-pill">Bénéfice client</span></p>
            ${ex.field(`client${i}`, `Défi ${i + 1} : le bénéfice concret`, { placeholder: 'Exprimez ici le bénéfice concret pour le client…', max: 220, rows: 6, hideLabel: true })}
            <p class="mc-solo-tip">${icon('lightbulb', { size: 20 })}<span>Résultat utile : langage simple, phrase directe.</span></p>
          </div>
        </section>
        ${core.errorsBox()}
        ${kit.bar({
          right: `${kit.dialogButton('hint', 'Voir un indice', 'secondary', '')}${kit.submit(last ? 'Valider mes transformations' : 'Valider et passer à l’étape suivante')}`
        })}
      </form>
    </div>`;
  }

  function reviewScreen() {
    return `<div class="k-page cap-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle })}
      <div class="mc-grid">${challenges.map((c, i) => `<section class="k-panel mc-card">
        <header class="mc-card-head"><span class="mc-n">${i + 1}</span><strong>Défi ${i + 1}</strong><span class="mc-tag">${esc(c.tag)}</span></header>
        <div class="mc-tech"><span class="mc-tech-symbol">${icon('document', { size: 24 })}</span><div><p class="k-label">La carte technique</p><p class="mc-tech-text">“ ${esc(c.card)} ”</p></div></div>
        ${kit.yours('Votre bénéfice client', ex.value(`client${i}`))}
        ${kit.model('Corrigé, exemple', c.model)}
      </section>`).join('')}</div>
      ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>
    </div>`;
  }

  function validate() {
    const i = current();
    if (!filled(i)) return [{ key: `client${i}`, message: `Défi ${i + 1} : exprimez le bénéfice concret.` }];
    const missing = challenges.findIndex((_, n) => !filled(n));
    return missing === -1 ? [] : [{ key: 'challenge', message: `Relevez aussi le défi ${missing + 1}.` }];
  }

  /* Défi relevé : on passe au suivant encore vide. */
  function intercept() {
    const i = current();
    if (!filled(i)) return false;
    const next = challenges.findIndex((_, n) => n !== i && !filled(n));
    if (next === -1) return false;
    ex.setValue('challenge', next);
    return true;
  }

  const feedback = () => ['Relisez vos cartes client : décrivent-elles un résultat vécu, en langage simple, en une phrase directe ?'];

  kit.on({ challenge: el => { ex.setValue('challenge', Number(el.dataset.index)); kit.commit(); } });
  kit.dialogs({
    hint: { title: 'Un indice', html: `<p>${esc(content.tip)} Commencez par « Vous… » et décrivez ce qui change pour lui : ce qu’il évite, ce qu’il gagne, ce qui devient plus simple.</p>` }
  });

  ex.mount('s4-2.2', { screen, validate, intercept, feedback, compactFeedback: true });
})();
