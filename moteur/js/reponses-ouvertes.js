/* RÉPONSES OUVERTES · le score et la relecture des réponses rédigées.
 *
 * Les écrans du module construisent eux-mêmes leur corrigé : ils y placent
 * le score (grilles marquées `integre: true` dans grilles.js) avec ces
 * quelques briques, toujours dans le même ordre :
 *   - en tête, le score global sur 10 (`head`) ;
 *   - puis, pour chaque réponse, la réponse de l'apprenant avec les mots
 *     repérés surlignés, « Ce qu'on attend · x sur y », et « Une réponse
 *     possible » repliée (`answer`).
 * Le calcul vient de moteur/js/indicateur.js (window.AtelierAnalyse) et des
 * grilles de js/grilles.js. Sans eux, la réponse s'affiche telle quelle,
 * avec sa réponse possible.
 *
 * Commun à tous les modules (sauf 1-1-1, qui a son js/corrige.js). Une
 * grille peut dépendre du cas travaillé (`parCas: index => ({ blocs })`) :
 * l'écran annonce le cas avec `forCase(key, index)` avant le corrigé.
 */
(() => {
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const filled = value => String(value ?? '').trim().length > 0;
  const engine = () => window.AtelierAnalyse;
  const cases = {};
  const forCase = (key, index) => { cases[key] = Number(index) || 0; };
  const grid = key => {
    const g = window.ATELIER_GRILLES && window.ATELIER_GRILLES[key];
    return g && typeof g.parCas === 'function' ? Object.assign({ integre: g.integre }, g.parCas(cases[key] || 0)) : g;
  };
  const current = () => (window.AtelierExercise ? window.AtelierExercise.values() : {});

  /* Le score de tout l'exercice, ou null (pas de grille, rien d'écrit). */
  function result(key, values = current()) {
    const g = grid(key);
    return engine() && g ? engine().score(g, values) : null;
  }

  /* Un bloc de la grille, noté seul. `fields` remplace ses champs : une
   * liste d'erreurs se surligne ainsi champ par champ. */
  function blocOf(key, index, values = current(), fields) {
    const g = grid(key);
    const source = g && g.blocs && g.blocs[index];
    if (!engine() || !source) return null;
    const bloc = fields ? Object.assign({}, source, { motif: undefined, champs: fields }) : source;
    const scored = engine().score({ blocs: [bloc] }, values);
    return scored ? scored.blocs[0] : null;
  }

  /* Le score global, en tête du corrigé. */
  function head(key, values) {
    const scored = result(key, values);
    return scored ? `<section class="ana-score is-head open-score" aria-label="Votre score">${engine().head(scored)}</section>` : '';
  }

  /* La réponse possible, repliée : un texte, ou du HTML déjà prêt (`html`). */
  const model = (text, { html = '', extra = '', label = 'Une réponse possible' } = {}) => (filled(text) || html
    ? `<details class="result-model open-model"><summary>${esc(label)}</summary>
        <div class="result-model-body">${html || `<p>${esc(text)}</p>`}${extra}</div>
      </details>`
    : '');

  /* La réponse de l'apprenant, mots repérés surlignés (sans grille : telle quelle). */
  function quote(key, index, text, values, fields) {
    if (!filled(text)) return '<p class="result-answer-text is-empty"><em>Non renseigné.</em></p>';
    const bloc = blocOf(key, index, values, fields);
    return `<p class="result-answer-text">« ${bloc ? engine().answer(bloc) : esc(text)} »</p>`;
  }

  /* Ce qu'on attend : les coches du bloc. */
  function expected(key, index, values) {
    const bloc = blocOf(key, index, values);
    return bloc ? engine().lines(bloc, { withText: false }) : '';
  }

  /* Une réponse complète : « Votre … », ce qu'on attend, la réponse possible.
   * `index` : le bloc de la grille ; `text` : la réponse ; `model` : le texte
   * proposé (ou `modelHtml`) ; `extra` : un complément sous la réponse
   * possible. */
  function answer(key, index, { title = 'Votre réponse', text = '', model: proposed = '', modelHtml = '', extra = '', values } = {}) {
    const vals = values || current();
    return `<div class="open-answer">
      <p class="open-answer-title">${esc(title)}</p>
      ${quote(key, index, text, vals)}
      ${filled(text) ? expected(key, index, vals) : ''}
      ${model(proposed, { html: modelHtml, extra })}
    </div>`;
  }

  window.AtelierOuvert = Object.freeze({ result, blocOf, head, model, quote, expected, answer, forCase });
})();
