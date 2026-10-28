/* CORRIGÉ DES RÉPONSES OUVERTES · le modèle validé sur S1 A et S1 B.
 *
 * Une petite aide partagée par les écrans du module :
 *   - le score estimatif en tête (« Votre score estimatif ») ;
 *   - une ligne par réponse : à gauche le numéro, le titre, la phrase de
 *     l'apprenant (mots repérés surlignés), puis « Ce qu'on attend dans
 *     votre réponse » ; à droite l'encadré neutre « Une réponse possible ».
 *     La couleur du numéro suit le score de la réponse ;
 *   - le tableau « Votre autoévaluation, critère par critère », en haut du
 *     corrigé, sous le score.
 * La grille de l'exercice (js/grilles.js) porte `integre: true` : le moteur
 * n'affiche plus le score à part dans le pavé du bas.
 * Styles : extras.css (.an-*). Sans indicateur (tests), le texte s'affiche tel quel.
 */
(() => {
  'use strict';
  const core = () => window.AtelierCore;
  const analyse = () => window.AtelierAnalyse;
  const esc = value => core().esc(value);

  // Le score de l'exercice, ou null (pas de grille, pas d'indicateur).
  function score(key, values) {
    const grid = window.ATELIER_GRILLES && window.ATELIER_GRILLES[key];
    return grid && analyse() ? analyse().score(grid, values) : null;
  }

  // La couleur suit le résultat : tout trouvé, rien trouvé, entre les deux.
  function toneOf(bloc) {
    if (!bloc) return 'neutral';
    const lines = bloc.lines.filter(l => l.kind !== 'warn');
    const ok = lines.filter(l => l.kind === 'ok').length;
    return ok === lines.length ? 'good' : ok === 0 ? 'bad' : 'neutral';
  }

  // « Votre score estimatif », en tête du corrigé.
  const head = result => (result
    ? `<section class="panel an-score">${core().panelTitle('Votre score estimatif')}<section class="ana-score is-head" aria-label="Indicateur de points">${analyse().head(result)}</section></section>`
    : '');

  // La réponse de l'apprenant, mots repérés surlignés ; `text` sans score.
  const answer = (bloc, text) => (bloc ? analyse().answer(bloc) : esc(text));

  /* Un morceau de la réponse d'un bloc qui lit plusieurs champs (un
   * argument parmi d'autres) : ses mots repérés, et eux seuls. */
  function part(bloc, text) {
    const piece = String(text ?? '').trim();
    if (!bloc) return esc(piece);
    const at = bloc.text.indexOf(piece);
    if (at < 0 || !piece) return esc(piece);
    const end = at + piece.length;
    const marks = bloc.marks.filter(([a, b]) => a >= at && b <= end).map(([a, b, kind]) => [a - at, b - at, kind]);
    return analyse().answer({ text: piece, marks });
  }

  // Ce qu'on attend dans la réponse, sous la phrase (sans répéter le texte).
  const expect = bloc => (bloc ? analyse().lines(bloc, { withText: false }) : '');

  /* Une ligne du corrigé. `yours` : le HTML de la réponse (par défaut, la
   * phrase surlignée entre guillemets) ; `model` : un texte ou une liste de
   * paragraphes, ou `modelHtml` déjà prêt ; `extra` : ce qui suit, sur
   * toute la largeur ; `half` : deux colonnes égales (réponses longues). */
  function row({ n, title, bloc, text = '', yours, model, modelHtml, label = 'Une réponse possible', extra = '', half = false }) {
    const paragraphs = (Array.isArray(model) ? model : [model]).filter(Boolean);
    return `<li class="an-row tone-${toneOf(bloc)}${half ? ' is-half' : ''}">
        <div class="an-yours">
          <span class="an-n" aria-hidden="true">${esc(n)}</span>
          <div><h2>${esc(title)}</h2>${yours !== undefined ? yours : `<p>« ${answer(bloc, text)} »</p>`}${expect(bloc)}</div>
        </div>
        <div class="an-verdict">
          <span class="an-mark" aria-hidden="true">${core().icon('lightbulb', { size: 20, strokeWidth: 3 })}</span>
          <div><h3>${esc(label)}</h3>${modelHtml !== undefined ? modelHtml : paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}</div>
        </div>
        ${extra}
      </li>`;
  }
  const rows = list => `<ol class="an-rows">${list.join('')}</ol>`;

  /* L'autoévaluation face au score : pour chaque critère de la grille, ce
   * que l'apprenant a répondu, et ce que le score a repéré sous le même nom,
   * dans le seul bloc évalué. `what` : ce qui est évalué (« votre réponse »). */
  function compare({ rubric, selfKey, bloc, what }) {
    const ex = window.AtelierExercise;
    const grade = i => ex.selfGrades.find(g => g.id === ex.value(selfKey(i))) || { id: 'vide', label: 'Sans réponse' };
    const lines = bloc ? bloc.lines : [];
    const seen = title => {
      const same = lines.filter(l => l.nom === title || l.nom.startsWith(`${title} :`));
      if (!same.length) return '<span class="an-seen is-none">L’outil ne sait pas le repérer : à juger vous-même</span>';
      return same.some(l => l.kind === 'ok') ? '<span class="an-seen is-ok">✓ Oui</span>' : '<span class="an-seen is-miss">○ Non</span>';
    };
    return `<div class="an-rows-compare"><div class="an-compare">
        <h3>Votre autoévaluation, critère par critère</h3>
        <p class="muted">Ce que vous avez répondu pour ${esc(what)}, face à ce que l’outil a repéré dans votre texte.</p>
        <table><thead><tr><th>Critère</th><th>Votre avis</th><th>Repéré dans votre texte ?</th></tr></thead>
        <tbody>${rubric.map(([title], i) => `<tr><th>${esc(title)}</th><td><span class="self-pill is-${grade(i).id}">${esc(grade(i).label)}</span></td><td>${seen(title)}</td></tr>`).join('')}</tbody></table>
      </div></div>`;
  }

  window.AtelierCorrige = Object.freeze({ score, toneOf, head, answer, part, expect, row, rows, compare });
})();
