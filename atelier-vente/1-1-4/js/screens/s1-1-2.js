/* S1 1.2 · La méthode sandwich.
 *
 * Trois surligneurs (bénéfice, prix, réassurance) et une réplique découpée
 * en passages. On choisit un surligneur, puis on clique le passage : il
 * prend sa couleur. Recliquer un passage avec le même surligneur l'efface.
 * Chaque surligneur ne sert qu'à un passage.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.2'];
  const markers = content.markers;
  const passages = content.passages;

  const marked = i => (markers.some(m => m.id === ex.value(`mark${i}`)) ? ex.value(`mark${i}`) : '');
  const tool = () => (markers.some(m => m.id === ex.value('tool')) ? ex.value('tool') : markers[0].id);
  const count = () => passages.filter((_, i) => marked(i)).length;
  const markerOf = id => markers.find(m => m.id === id) || {};

  function sentence(review = false) {
    return `<p class="sw-sentence">« ${passages.map((p, i) => {
      const m = marked(i);
      if (review) {
        const ok = m === p.part;
        return `<span class="sw-passage is-static tone-${esc(markerOf(p.part).tone)}">${esc(p.text)}<span class="sw-tag ${ok ? 'is-ok' : 'is-ko'}">${esc(markerOf(p.part).label)}</span></span>`;
      }
      return `<button type="button" class="sw-passage ${m ? `is-marked tone-${esc(markerOf(m).tone)}` : ''}" data-act="sw-mark" data-index="${i}" aria-pressed="${Boolean(m)}" aria-label="${esc(p.text)}${m ? ` : ${esc(markerOf(m).label)}` : ''}">${esc(p.text)}</button>`;
    }).join(' ')} »</p>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    const right = passages.filter((p, i) => marked(i) === p.part).length;
    return `<div class="k-page sw-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle,
        aside: `<p class="k-count"><strong data-live="count">${count()} / ${passages.length}</strong> passages repérés</p>${reviewing ? '' : kit.tourButton()}` })}
      <form class="k-panel" novalidate>
        ${kit.steps(markers.map(m => m.label), reviewing ? markers.length + 1 : 0, { compact: true })}
        ${reviewing ? `${kit.result(right, passages.length, 'passages bien repérés')}${sentence(true)}
          <ul class="sw-explain">${markers.map(m => `<li class="tone-${esc(m.tone)}"><strong>${esc(m.label)}</strong><span>${esc(content.explanations[m.id])}</span></li>`).join('')}</ul>
          ${content.keyPoint ? ex.inlineNote(content.keyPoint, 'neutral') : ''}
          ${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>`
        : `<p class="sw-instruction">${icon('pointer', { size: 20 })}<span>Choisissez un surligneur, puis sélectionnez le passage correspondant.</span></p>
          <div class="sw-tools" role="radiogroup" aria-label="Surligneurs">${markers.map(m => `
            <button type="button" class="sw-tool tone-${esc(m.tone)} ${tool() === m.id ? 'is-active' : ''}" role="radio" aria-checked="${tool() === m.id}" data-act="sw-tool" data-id="${esc(m.id)}">
              <span class="sw-pen">${icon('highlighter', { size: 24 })}</span><span>${esc(m.label)}</span></button>`).join('')}</div>
          ${sentence()}
          ${core.errorsBox()}
          ${kit.bar({
            left: kit.act('sw-clear', `${icon('refresh', { size: 17 })}<span>Effacer les surlignages</span>`, 'text-button'),
            right: kit.submit('Vérifier mon découpage', count() === passages.length ? '' : 'data-pending="true"')
          })}`}
      </form>
      ${reviewing ? '' : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function validate() {
    const left = passages.length - count();
    return left ? [{ key: 'mark0', message: `Surlignez encore ${kit.plural(left, 'passage')}.` }] : [];
  }

  // Le score est déjà en tête du corrigé : le pavé final ne garde que « Continuer ».
  const feedback = () => [];

  kit.on({
    'sw-tool': el => { ex.setValue('tool', el.dataset.id); kit.commit(); },
    'sw-mark': el => {
      const i = Number(el.dataset.index);
      const t = tool();
      if (marked(i) === t) ex.setValue(`mark${i}`, '');
      else {
        // Un surligneur ne sert qu'une fois : il quitte son ancien passage.
        passages.forEach((_, k) => { if (k !== i && marked(k) === t) ex.setValue(`mark${k}`, ''); });
        ex.setValue(`mark${i}`, t);
        const free = markers.find(m => !passages.some((_, k) => marked(k) === m.id));
        if (free) ex.setValue('tool', free.id);
      }
      kit.commit();
    },
    'sw-clear': () => { passages.forEach((_, i) => ex.setValue(`mark${i}`, '')); ex.setValue('tool', markers[0].id); kit.commit(); }
  });

  // Visite guidée de l'écran, lancée d'elle-même la première fois. L'aperçu
  // montre, sur une phrase d'exemple, comment passer d'un surligneur à l'autre.
  kit.tour('s1-1.2', [
    { target: '.sw-page .k-steps', title: 'La méthode sandwich', text: 'Le prix s’annonce entre deux éléments qui le font accepter :',
      items: markers.map((m, i) => ({ key: String(i + 1), tone: ['blue', 'gold', 'green'][i], text: m.label })) },
    { target: '.sw-instruction, .sw-tools', title: 'Les surligneurs', text: 'Un exemple, sur une autre phrase :',
      preview: kit.hlDemo({
        tools: markers.map((m, i) => ({ label: m.label, tone: ['blue', 'gold', 'green'][i] })),
        parts: [
          { text: 'Vous gagnez une heure par jour', tool: 0 },
          { text: 'pour 49 € par mois,', tool: 1 },
          { text: 'sans engagement.', tool: 2 }
        ]
      }),
      items: [
        { symbol: 'pointer', tone: 'blue', text: 'Choisissez un surligneur, puis cliquez sur le passage.' },
        { symbol: 'highlighter', tone: 'gold', text: 'Chaque surligneur ne sert qu’à un passage.' },
        { symbol: 'refresh', tone: 'green', text: 'Le surligneur suivant se choisit tout seul.' }
      ] },
    { target: '.sw-sentence', title: 'La réplique', text: 'Elle est découpée en passages : surlignez chacun avec la bonne couleur.' },
    { target: '.sw-page .k-bar', title: 'Vérifier',
      items: [
        { symbol: 'refresh', tone: 'coral', text: '« Effacer les surlignages » recommence.' },
        { symbol: 'checkCircle', tone: 'green', text: 'Les 3 passages surlignés, vérifiez votre découpage.' }
      ] }
  ]);

  ex.mount('s1-1.2', { screen, validate, feedback, compactFeedback: true });
})();
