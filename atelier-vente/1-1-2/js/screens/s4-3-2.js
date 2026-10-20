/* S4 3.2 · Repérer la sur-argumentation.
 *
 * Un court échange où le commercial noie le client sous les fonctions. On
 * relève trois erreurs, puis on compare avec le corrigé de la fiche.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S4['3.2'];

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle, aside: reviewing ? '' : kit.tourButton() })}
      <form class="over-page" novalidate>
        <div class="k-columns is-wide-left">
        <section class="k-panel" aria-label="Extrait de l’entretien">
          <div class="over-chat">${content.exchange.map(line => `<div class="over-line is-${line.who}">
            <span class="over-avatar"><img src="${esc(core.asset(`assets/illustrations/s4/portrait-${line.who === 'client' ? 'client' : 'commercial'}.webp`))}" alt="" decoding="async"></span>
            <div><span class="over-who">${line.who === 'client' ? 'Client' : 'Commercial'}</span>
            <p class="over-bubble">${esc(line.text)}</p></div>
          </div>`).join('')}</div>
        </section>
        <section class="k-panel">
          <p class="over-title">${icon('search', { size: 30 })}<span><strong>Votre diagnostic</strong><small>Notez les 3 erreurs les plus importantes.</small></span></p>
          ${[0, 1, 2].map(i => `<div class="over-error"><span class="over-n">${i + 1}</span>
            ${reviewing ? `<p class="over-own">${esc(ex.value(`error${i}`))}</p>`
              : ex.field(`error${i}`, `Erreur ${i + 1}`, { placeholder: 'Décrivez l’erreur observée…', max: 240, rows: 2, hideLabel: true })}
          </div>`).join('')}
        </section>
        </div>
        ${reviewing ? '' : `${core.errorsBox()}${kit.bar({ left: kit.help(content.tip, 'info'), right: kit.submit('Comparer avec le corrigé') })}`}
      </form>
      ${reviewing ? `${kit.corrige({ title: 'Le corrigé', items: content.model,
        note: 'Comparez avec vos trois erreurs : l’ordre importe peu, c’est l’idée qui compte. Retrouvez-vous le fond (besoin ignoré), le rythme (avalanche) et l’écoute (signal manqué) ?' })}${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>` : kit.utility('Corrigé disponible après votre diagnostic')}
    </div>`;
  }

  function validate(values) {
    return [0, 1, 2].filter(i => !kit.filled(values[`error${i}`]))
      .map(i => ({ key: `error${i}`, message: `Décrivez l’erreur ${i + 1}.` }));
  }

  // Le corrigé à l'écran dit tout : pas de phrase de bilan en plus.
  const feedback = () => [];

  // Visite guidée de l'écran, lancée d'elle-même la première fois.
  kit.tour('s4-3.2', [
    { target: '.over-chat', title: 'L’échange', text: 'Lisez cet échange entre le client et le commercial : le commercial en dit beaucoup trop.' },
    { target: '.over-error', title: 'Votre diagnostic', text: 'Notez ici les 3 erreurs les plus importantes du commercial, une par case.' },
    { target: '.k-bar', title: 'Le corrigé',
      items: [
        { symbol: 'info', tone: 'gold', text: 'L’indice en bas à gauche vous dit quoi observer.' },
        { symbol: 'arrowRight', tone: 'blue', text: 'Une fois vos 3 erreurs notées, comparez-les avec le corrigé.' }
      ] }
  ]);

  ex.mount('s4-3.2', { screen, validate, feedback, compactFeedback: true });
})();
