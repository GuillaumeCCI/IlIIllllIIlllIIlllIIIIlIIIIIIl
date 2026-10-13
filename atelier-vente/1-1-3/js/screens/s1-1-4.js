/* S1 1.4 · Ce qui n'est pas dit.
 *
 * Une scène illustrée, trois répliques numérotées. L'apprenant formule
 * l'objection silencieuse probable, puis la question ouverte qui la ferait
 * émerger. En relecture : ses réponses, des hypothèses possibles et une
 * question proposée.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const kit = window.AtelierKit;
  const { esc, icon } = kit;
  const content = window.ATELIER_S1['1.4'];
  const exercise = () => ex.current;

  function bubbleText(b) {
    if (!b.mark) return esc(b.text);
    const at = b.text.lastIndexOf(b.mark);
    return `${esc(b.text.slice(0, at))}<span class="hidden-mark">${esc(b.mark)}</span>${esc(b.text.slice(at + b.mark.length))}`;
  }

  function scene() {
    const bubbles = content.bubbles.map((b, i) => `<li class="hidden-bubble" style="--x:${b.left}%;--y:${b.top}%">
      <span class="hidden-n">${i + 1}</span><span><small>${esc(b.who)}</small>« ${bubbleText(b)} »</span></li>`).join('');
    return `<figure class="hidden-scene">
      ${exercise().image ? `<img src="${esc(core.webAsset(exercise().image))}" alt="${esc(exercise().alt)}" decoding="async">` : ''}
      <ol class="hidden-bubbles">${bubbles}</ol>
    </figure>`;
  }

  function screen() {
    const reviewing = ex.reviewing();
    return `<div class="k-page hidden-page">
      ${kit.head({ eyebrow: content.eyebrow, title: content.title, subtitle: content.subtitle })}
      <div class="hidden-layout">
        ${scene()}
        <form class="k-panel hidden-panel" novalidate>
          <h2>${reviewing ? 'Vos réponses' : 'À vous de jouer'}</h2>
          ${reviewing ? reviewBody() : `
            <div class="hidden-field"><p class="hidden-label"><span class="hidden-step">1</span>L’objection silencieuse probable</p>
              ${ex.field('hypothesis', 'L’objection silencieuse probable', { placeholder: 'Votre hypothèse…', max: 300, rows: 3, hideLabel: true })}
              <p class="k-muted">${esc(content.hypothesisHelp)}</p></div>
            <div class="hidden-field"><p class="hidden-label"><span class="hidden-step">2</span>La question pour la révéler</p>
              ${ex.field('question', 'La question pour la révéler', { placeholder: 'Votre question ouverte…', max: 300, rows: 3, hideLabel: true })}
              <p class="k-muted">${esc(content.questionHelp)}</p></div>
            ${core.errorsBox()}
            <div class="hidden-actions">${kit.dialogButton('hint', 'Voir un indice', 'text-button', '')}${kit.submit('Valider ma réponse')}</div>`}
        </form>
      </div>
      ${reviewing ? `${core.feedbackBox()}<div class="k-utility">${kit.reset()}</div>` : kit.utility('Corrigé disponible après validation')}
    </div>`;
  }

  function reviewBody() {
    return `${kit.yours('Votre hypothèse', ex.value('hypothesis'))}
      <div class="k-model"><p class="k-model-title">${icon('sparkle', { size: 16 })}<span>Objections probables, selon le corrigé</span></p>
        <ul class="hidden-list">${content.hypotheses.map(h => `<li>${esc(h)}</li>`).join('')}</ul></div>
      ${kit.yours('Votre question', ex.value('question'))}
      ${kit.model('Une question possible', content.model)}
      ${ex.inlineNote(content.lesson, 'neutral')}`;
  }

  function validate(values) {
    const errors = [];
    if (!kit.filled(values.hypothesis)) errors.push({ key: 'hypothesis', message: 'Formulez l’objection que le client pourrait taire.' });
    if (!kit.filled(values.question)) errors.push({ key: 'question', message: 'Rédigez la question qui permettrait de la révéler.' });
    else if (!/\?\s*$/.test(String(values.question).trim())) errors.push({ key: 'question', message: 'Votre question doit se terminer par un point d’interrogation.' });
    return errors;
  }

  const feedback = () => ['Votre question est-elle ouverte, sans suggérer la réponse ? Comparez-la au corrigé.'];

  kit.dialogs({ hint: { title: 'Un indice', html: `<p>${esc(content.hint)}</p>` } });

  ex.mount('s1-1.4', { screen, validate, feedback, compactFeedback: true });
})();
