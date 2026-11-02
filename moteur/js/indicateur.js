/* Analyse des réponses ouvertes · un indicateur de points, à la correction.
 *
 * Chaque module peut fournir `window.ATELIER_GRILLES`, une grille par
 * exercice (clé du catalogue, ex. 's1-E3'). Une grille est faite de blocs ;
 * un bloc lit un ou plusieurs champs et compte :
 *   - ses critères : des familles de mots et d'expressions (synonymes,
 *     tournures). Un critère trouvé rapporte ses points ;
 *   - les phrases complètes : majuscule, verbe, au moins quatre mots,
 *     ponctuation finale. Sans aucune phrase complète, les critères ne
 *     comptent qu'à moitié : une liste de mots-clés ne suffit pas ;
 *   - ses pièges : des tournures à éviter, qui retirent des points ;
 *   - ses règles : sans question, avec question, nombre de mots.
 * Le total est ramené sur 10. C'est un indicateur : il repère des mots,
 * il ne comprend pas le sens.
 *
 * Écriture des expressions : la casse, les accents et les apostrophes ne
 * comptent pas ; chaque mot est réduit à sa racine (« propose »,
 * « proposez », « proposer » se valent) ; un mot peut s'intercaler entre
 * deux mots d'une expression (« je vous le propose »). Un mot terminé par
 * `*` est un début de mot (« rassur* »).
 *
 * Fautes d’orthographe : les critères tolèrent les mots écrits au son, une
 * lettre de travers, les mots collés (« cest ») ; une phrase sans majuscule
 * ni point compte si elle a un verbe et ses petits mots de liaison. Les
 * pièges, eux, restent exacts, pour ne jamais pénaliser à tort.
 */
(function (root) {
  'use strict';

  /* ── Mots ─────────────────────────────────────────────────────────── */

  const plain = text => String(text ?? '')
    .toLowerCase()
    .replace(/œ/g, 'oe').replace(/æ/g, 'ae')
    .normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Terminaisons retirées, la plus longue d'abord ; la racine garde 3 lettres.
  const ENDINGS = ['issements', 'issement', 'eraient', 'eriez', 'erions', 'erons', 'eront', 'aient', 'ements', 'ement', 'ations', 'ation',
    'euses', 'euse', 'eurs', 'eur', 'ives', 'ive', 'ions', 'iez', 'ons', 'ent', 'ait', 'ais', 'ant', 'ante', 'ees', 'ee', 'era', 'erai',
    'ez', 'er', 'es', 'e', 's', 'x'].sort((a, b) => b.length - a.length);
  const stem = word => {
    for (const end of ENDINGS) {
      // « prix » garde son x : sinon il se confondrait avec « pris » (pris au sérieux).
      if (end === 'x' && word.length < 5) continue;
      if (word.length - end.length >= 3 && word.endsWith(end)) return word.slice(0, -end.length);
    }
    return word;
  };

  /* Mots collés par un apprenant qui écrit vite ou mal (« cest », « jai »,
   * « cad ») : rendus en mots séparés, pour que « c’est bien ça » ou
   * « c’est-à-dire » se reconnaissent quand même. */
  const SPLIT = { cest: ['c', 'est'], sest: ['s', 'est'], nest: ['n', 'est'], jai: ['j', 'ai'], quil: ['qu', 'il'], quils: ['qu', 'ils'],
    cad: ['c', 'est', 'a', 'dire'], cestadire: ['c', 'est', 'a', 'dire'], ske: ['ce', 'que'], kesk: ['qu', 'est', 'ce', 'que'] };

  // Les mots du texte, avec leur place dans le texte d'origine (pour surligner).
  function tokens(text) {
    const list = [];
    const source = String(text ?? '');
    const re = /[\p{L}\p{N}]+/gu;
    let m;
    while ((m = re.exec(source))) {
      const word = plain(m[0]);
      for (const piece of SPLIT[word] || [word]) list.push({ word: piece, stem: stem(piece), start: m.index, end: m.index + m[0].length });
    }
    return list;
  }

  // Une expression compilée : une suite de racines (ou de débuts de mots).
  const cache = new Map();
  function compile(expression) {
    if (cache.has(expression)) return cache.get(expression);
    const parts = plain(expression).split(/[^a-z0-9*]+/).filter(Boolean)
      .map(word => (word.endsWith('*') ? { prefix: word.slice(0, -1) } : { stem: stem(word), word }));
    cache.set(expression, parts);
    return parts;
  }

  /* Tolérance orthographique, pour les critères seulement (jamais les
   * pièges) : un apprenant fâché avec l'orthographe doit voir ses bonnes
   * idées comptées. Deux mots se valent s'ils se prononcent à peu près
   * pareil (« épuisan », « fatigé », « loterri ») ou s'ils ne diffèrent que
   * d'une lettre (deux pour les mots longs). Les mots de moins de quatre
   * lettres restent exacts : « sa » et « ça » ne se confondent pas. */
  const sound = word => word
    .replace(/ph/g, 'f').replace(/qu/g, 'k').replace(/c(?=[eiy])/g, 's').replace(/[cq]/g, 'k')
    .replace(/gu(?=[ei])/g, 'g').replace(/g(?=[ei])/g, 'j').replace(/h/g, '').replace(/y/g, 'i').replace(/w/g, 'v')
    .replace(/eau|au/g, 'o').replace(/ai|ei/g, 'e').replace(/en|em|am/g, 'an').replace(/ain|ein|un|im/g, 'in')
    .replace(/([a-z])\1+/g, '$1').replace(/(?<=^.{4,})(es|e|s|t|ts|d|ds|x|z|er|ez|et)$/, '');
  // Distance d'édition bornée (avec inversion de deux lettres voisines).
  const near = (a, b, max) => {
    if (Math.abs(a.length - b.length) > max) return false;
    let before = null;
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (before && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], before[j - 2] + 1);
        best = Math.min(best, cur[j]);
      }
      if (best > max) return false;
      before = prev;
      prev = cur;
    }
    return prev[b.length] <= max;
  };
  const close = (word, target) => {
    if (word.length < 4 || target.length < 4) return false;
    if (sound(word) === sound(target)) return true;
    const shortest = Math.min(word.length, target.length);
    const max = shortest >= 10 ? 2 : shortest >= 7 ? 1 : 0;
    if (max > 0 && near(word, target, max)) return true;
    // Une élision sans apostrophe : « darriver », « lappartement ».
    const rest = word.startsWith('qu') ? word.slice(2) : /^[dljnsc][aeiouyh]/.test(word) ? word.slice(1) : '';
    return rest.length >= 4 && close(rest, target);
  };
  // Les mots courts les plus souvent écrits au son.
  const SHORT = { sa: 'ca', ke: 'que', koi: 'quoi', ki: 'qui', tro: 'trop', tou: 'tout', tous: 'tout', bocou: 'beaucoup', bcp: 'beaucoup', pk: 'pourquoi',
    pq: 'pourquoi', pr: 'pour', ds: 'dans', vs: 'vous', ns: 'nous', tjs: 'toujours', tjrs: 'toujours', pa: 'pas', mai: 'mais', se: 'ce' };
  const same = (token, part, fuzzy) => {
    if (part.prefix !== undefined) {
      if (token.word.startsWith(part.prefix)) return true;
      return Boolean(fuzzy) && part.prefix.length >= 5 && close(token.word.slice(0, part.prefix.length), part.prefix);
    }
    if (token.stem === part.stem) return true;
    if (!fuzzy) return false;
    if (SHORT[token.word] && SHORT[token.word] === part.word) return true;
    // Les mots entiers, pas les racines : « agence » ne doit pas valoir « agent ».
    return close(token.word, part.word) || (token.stem.length >= 4 && part.stem.length >= 4 && sound(token.stem) === sound(part.stem));
  };

  // Toutes les places où l'expression apparaît : [début, fin] en indices de mots.
  // `fuzzy` : tolérer les fautes d'orthographe (critères seulement).
  function find(list, expression, fuzzy = false) {
    const parts = compile(expression);
    if (!parts.length) return [];
    const found = [];
    for (let i = 0; i < list.length; i++) {
      if (!same(list[i], parts[0], fuzzy)) continue;
      let at = i;
      let ok = true;
      for (let p = 1; p < parts.length && ok; p++) {
        // Le mot suivant de l'expression, ou celui d'après (un mot intercalé).
        if (list[at + 1] && same(list[at + 1], parts[p], fuzzy)) at += 1;
        else if (list[at + 2] && same(list[at + 2], parts[p], fuzzy)) at += 2;
        else ok = false;
      }
      if (ok) found.push([i, at]);
    }
    return found;
  }

  /* ── Phrases ──────────────────────────────────────────────────────── */

  const VERBS = new Set(('suis es est sommes etes sont etais etait etions etiez etaient serai sera serons serez seront serait serais soit soyez ' +
    'ai as a avons avez ont avais avait aurai aura aurez aurait aurions ' +
    'vais vas va allons allez vont irai ira irez ' +
    'peux peut pouvons pouvez peuvent pourrai pourra pourrez pourrait pourriez ' +
    'veux veut voulons voulez veulent voudrais voudrait voudriez ' +
    'dois doit devons devez doivent devrais devrait devriez ' +
    'fais fait faisons faites font ferai fera ferez ' +
    'sais sait savons savez savent ' +
    'dis dit disons dites disent ' +
    'vois voit voyons voyez voient ' +
    'prends prend prenons prenez prennent ' +
    'mets met mettons mettez ' +
    'viens vient venons venez viennent ' +
    'comprends comprend comprenons comprenez ' +
    'entends entend entendons entendez ' +
    'reste restez convient conviennent semble semblez faut fallait faudra faudrait vaut valent ' +
    'merci bonjour').split(' '));
  const isVerb = token => VERBS.has(token.word) ||
    (token.word.length >= 4 && /(ez|ons|er|ir|ait|ais|aient|ent|ra|rai|rez|rons|e)$/.test(token.word) && !/ment$/.test(token.word));
  // Un verbe reconnaissable sans majuscule ni point : terminaisons sûres seulement
  // (« téléphone », « client » ne passent pas pour des verbes).
  const isStrongVerb = token => token.word.length >= 4 && /(ez|ons|er|ir|ait|ais|aient|rez|rons)$/.test(token.word);

  // Une phrase complète : un verbe et quatre mots au moins. La majuscule et
  // le point final ne sont pas exigés : on juge l'idée, pas l'orthographe.
  // Un mot qui suit « je », « vous »… compte comme verbe, même mal écrit
  // (« vous avé », « il reprent »). Une liste de mots-clés, elle, n'a pas de verbe.
  const SUBJECTS = new Set('je j tu il elle on nous vous ils elles'.split(' '));
  const GREETINGS = new Set(['bonjour', 'merci']);
  const GLUE = new Set('le la les l un une des de du d a au aux pour avec dans sur que qu qui et en par ne n pas c ce se si mais ou donc car quand comme'.split(' '));
  function sentences(text) {
    const pieces = String(text ?? '').split(/(?<=[.!?…])\s+|\n+/).map(s => s.trim()).filter(Boolean);
    const complete = pieces.filter(piece => {
      const words = tokens(piece);
      if (words.length < 4) return false;
      // Une suite de mots isolés séparés par des virgules reste une liste.
      const chunks = piece.split(/[,;\/]+/).map(c => tokens(c).length).filter(Boolean);
      if (chunks.length >= 3 && chunks.every(n => n <= 2)) return false;
      const subject = words.some((w, i) => SUBJECTS.has(w.word) && words[i + 1] && !SUBJECTS.has(words[i + 1].word));
      // Une phrase, même mal écrite, a ses petits mots de liaison ou finit par
      // une ponctuation ; une liste de mots-clés, non.
      const glue = words.filter(w => GLUE.has(w.word)).length >= 2 || /[.!?…]\s*["»”)]?$/.test(piece);
      if (glue && (subject || words.some((w, i) => (VERBS.has(w.word) && !GREETINGS.has(w.word)) || (isStrongVerb(w) && !(w.word === 'rendez' && words[i + 1]?.word === 'vous'))))) return true;
      // Sans verbe évident, la majuscule et le point final départagent, comme avant.
      const first = piece.replace(/^[«"“\s(—–-]+/, '');
      return /^\p{Lu}/u.test(first) && /[.!?…»"”)]$/.test(piece) && words.some(isVerb);
    });
    // Un long texte sans aucun point (plusieurs verbes, une douzaine de mots
    // ou plus) vaut plusieurs phrases : l'apprenant a oublié la ponctuation.
    const unpunctuated = !/[.!?…]/.test(String(text ?? ''));
    const count = complete.reduce((n, piece) => {
      if (!unpunctuated) return n + 1;
      const words = tokens(piece);
      return n + Math.max(1, Math.min(words.filter(w => VERBS.has(w.word) || isStrongVerb(w)).length, Math.floor(words.length / 6)));
    }, 0);
    return { all: pieces.length, complete: count };
  }

  /* ── Règles propres à un exercice ─────────────────────────────────── */

  const countWords = text => tokens(text).length;
  const RULES = {
    sansQuestion: { test: text => !/[?？]/u.test(text), ok: 'Aucune question posée.', ko: 'Une question s’est glissée : la consigne demande une phrase affirmative.' },
    avecQuestion: { test: text => /[?？]/u.test(text), ok: 'Une question donne la parole au client.', ko: 'Pensez à finir par une question qui donne la parole au client.' },
    maxMots: n => ({ test: text => countWords(text) <= n, ok: `${n} mots au plus : c’est respecté.`, ko: `Votre texte dépasse ${n} mots.` }),
    minMots: n => ({ test: text => countWords(text) >= n, ok: 'La longueur est suffisante.', ko: `Développez un peu : ${n} mots au moins.` })
  };
  const rule = spec => {
    const [name, arg] = String(spec.regle).split(':');
    const def = typeof RULES[name] === 'function' ? RULES[name](Number(arg)) : RULES[name];
    return def ? { ...def, points: spec.points ?? 1, nom: spec.nom } : null;
  };

  /* ── Score d'un bloc ──────────────────────────────────────────────── */

  // Les champs du bloc : une liste de clés, ou un motif (« line » → line1, line2…).
  function fieldsOf(bloc, values) {
    if (bloc.motif) {
      const re = new RegExp(`^${bloc.motif}\\d+$`);
      return Object.keys(values).filter(key => re.test(key)).sort((a, b) => Number(a.replace(/\D/g, '')) - Number(b.replace(/\D/g, '')));
    }
    return bloc.champs || [];
  }

  function scoreBloc(bloc, values) {
    const texts = fieldsOf(bloc, values).map(key => String(values[key] ?? '').trim()).filter(Boolean);
    const text = texts.join('\n');
    if (!text && bloc.siRempli) return null;
    const list = tokens(text);
    const marks = [];
    const lines = [];
    let earned = 0;
    let max = 0;

    const phrases = sentences(text);
    const expected = bloc.phrases?.attendues ?? 1;
    const sentencePoints = bloc.phrases?.points ?? 1;
    const listOnly = sentencePoints > 0 && phrases.complete === 0 && text.length > 0;

    let criteriaEarned = 0;
    let criteriaMax = 0;
    let formEarned = 0;
    for (const critere of bloc.criteres || []) {
      const points = critere.points ?? 2;
      max += points;
      criteriaMax += points;
      const hits = [];
      const spans = [];
      for (const expression of critere.mots) {
        for (const [a, b] of find(list, expression, true)) {
          // Une tournure déjà comptée (« je vous propose ») ne recompte pas son morceau (« propose »).
          if (spans.some(([x, y]) => a >= x && b <= y)) continue;
          spans.push([a, b]);
          hits.push(text.slice(list[a].start, list[b].end));
          marks.push([list[a].start, list[b].end]);
        }
      }
      const unique = [...new Set(hits.map(h => h.toLowerCase()))];
      const needed = critere.min ?? 1;
      const share = Math.min(1, unique.length / needed);
      criteriaEarned += points * share;
      lines.push({ kind: share >= 1 ? 'ok' : share > 0 ? 'part' : 'miss', nom: critere.nom, found: unique.slice(0, 4), conseil: critere.conseil });
    }
    earned += listOnly ? criteriaEarned / 2 : criteriaEarned;
    // Sans aucun élément attendu, la forme ne se coche pas : un texte court
    // ou une question hors sujet ne doit pas paraître « réussi ».
    const noSubstance = (bloc.criteres || []).length > 0 && criteriaEarned === 0;
    const WAIT = 'Ce point comptera dès que votre réponse reprendra un élément attendu.';

    if (sentencePoints) {
      max += sentencePoints;
      const share = Math.min(1, phrases.complete / expected);
      formEarned += sentencePoints * share;
      lines.push({ kind: noSubstance ? 'miss' : share >= 1 ? 'ok' : share > 0 ? 'part' : 'miss', nom: expected > 1 ? `${expected} phrases complètes` : 'Une phrase complète', sentences: phrases.complete, expected, listOnly, wait: noSubstance, conseil: noSubstance ? WAIT : bloc.phrases && bloc.phrases.conseil });
    }

    for (const spec of bloc.regles || []) {
      const def = rule(spec);
      if (!def) continue;
      max += def.points;
      const ok = def.test(text);
      if (ok) formEarned += def.points;
      lines.push({ kind: ok && !noSubstance ? 'ok' : 'miss', nom: def.nom || 'Consigne', texte: noSubstance ? WAIT : ok ? def.ok : def.ko });
    }

    // La forme (phrases, consignes) suit le fond : entière dès que la moitié
    // des critères est trouvée, en proportion en dessous, rien sans critère.
    // Une phrase bien construite mais hors sujet ne rapporte donc presque rien.
    const formShare = criteriaMax ? Math.min(1, criteriaEarned / (criteriaMax / 2)) : 1;
    earned += formEarned * formShare * (listOnly ? 0.5 : 1);
    if ((bloc.criteres || []).length && criteriaEarned === 0) earned = 0;

    let malus = 0;
    for (const piege of bloc.pieges || []) {
      const hits = [];
      for (const expression of piege.mots) {
        for (const [a, b] of find(list, expression)) {
          hits.push(text.slice(list[a].start, list[b].end));
          marks.push([list[a].start, list[b].end, 'warn']);
        }
      }
      if (!hits.length) continue;
      malus += piege.points ?? 1;
      lines.push({ kind: 'warn', nom: piege.nom, found: [...new Set(hits.map(h => h.toLowerCase()))].slice(0, 3), conseil: piege.conseil });
    }
    earned = Math.max(0, earned - malus);

    return { titre: bloc.titre || '', text, marks, lines, earned, max };
  }

  /* ── Score d'un exercice ──────────────────────────────────────────── */

  function score(grid, values) {
    if (!grid) return null;
    const blocs = (grid.blocs || [grid]).map(bloc => scoreBloc(bloc, values)).filter(Boolean);
    const earned = blocs.reduce((n, b) => n + b.earned, 0);
    const max = blocs.reduce((n, b) => n + b.max, 0);
    if (!max) return null;
    const points = Math.round((earned / max) * 10 * 2) / 2;
    return { points, total: 10, blocs };
  }

  /* ── Affichage ────────────────────────────────────────────────────── */

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const number = n => String(n).replace('.', ',');

  // Le texte de l'apprenant, mots repérés surlignés.
  function highlighted(text, marks) {
    const sorted = marks.slice().sort((a, b) => a[0] - b[0]);
    let html = '';
    let at = 0;
    for (const [a, b, kind] of sorted) {
      if (a < at) continue;
      html += esc(text.slice(at, a)) + `<mark${kind ? ` class="is-${kind}"` : ''}>${esc(text.slice(a, b))}</mark>`;
      at = b;
    }
    return html + esc(text.slice(at));
  }

  const SYMBOL = { ok: '✓', part: '◐', miss: '○', warn: '!' };
  function line(item) {
    let detail = '';
    if (item.sentences !== undefined) {
      detail = item.wait ? item.conseil
        : item.sentences >= item.expected ? ''
        : item.sentences ? `${item.sentences} sur ${item.expected} pour l’instant.`
        : item.conseil || 'Écrivez la phrase entière, telle que vous la diriez au client.';
    } else if (item.texte) detail = item.kind === 'ok' ? '' : item.texte;
    else if (item.kind === 'warn') detail = `Repéré : ${item.found.map(f => `« ${f} »`).join(', ')}.${item.conseil ? ` ${item.conseil}` : ''}`;
    // Un critère rempli se passe de commentaire : ses mots sont surlignés dans la réponse.
    else if (item.kind !== 'ok' && item.conseil) detail = item.conseil;
    return `<li class="ana-line is-${item.kind}"><span class="ana-symbol" aria-hidden="true">${SYMBOL[item.kind]}</span>
      <span><strong>${esc(item.nom)}</strong>${detail ? `<span class="ana-detail">${esc(detail)}</span>` : ''}</span></li>`;
  }

  // Le score en tête : les points et l'avertissement.
  const head = result => `<div class="ana-head">
        <p class="ana-points"><strong>${number(result.points)}</strong><span>/ ${result.total} points</span></p>
        <p class="ana-note">Un score estimatif, calculé automatiquement : il repère des mots et des tournures. Une réponse juste dite autrement peut être sous-estimée. Comparez aussi avec la réponse possible.</p>
        <p class="ana-legend"><span><span class="ana-symbol is-ok" aria-hidden="true">✓</span>Présent dans votre réponse</span><span><span class="ana-symbol is-miss" aria-hidden="true">○</span>Attendu, pas encore là</span><span><span class="ana-symbol is-warn" aria-hidden="true">!</span>À éviter</span></p>
      </div>`;

  // Le détail d'un bloc : les coches, puis le texte surligné. Un écran qui
  // montre lui-même la réponse (`withText: false`) ne garde que les coches.
  const met = bloc => bloc.lines.filter(item => item.kind === 'ok').length;
  const expected = bloc => bloc.lines.filter(item => item.kind !== 'warn').length;
  const lines = (bloc, { withText = true } = {}) => `<p class="ana-expect">Ce qu’on attend dans votre réponse <span>· ${met(bloc)} sur ${expected(bloc)} repérés</span></p>
        <ul class="ana-lines">${bloc.lines.map(line).join('')}</ul>
        ${withText && bloc.marks.length ? `<p class="ana-text">${highlighted(bloc.text, bloc.marks)}</p>` : ''}`;

  // La réponse de l'apprenant, mots repérés surlignés (sans repère : telle quelle).
  const answer = bloc => highlighted(bloc.text, bloc.marks);

  function render(result) {
    if (!result) return '';
    const several = result.blocs.length > 1;
    return `<section class="ana-score" aria-label="Indicateur de points">
      ${head(result)}
      <div class="ana-blocs${several ? ' is-several' : ''}">${result.blocs.map(bloc => `<div class="ana-bloc">
        ${several && bloc.titre ? `<h4>${esc(bloc.titre)}</h4>` : ''}
        ${lines(bloc)}
      </div>`).join('')}</div>
    </section>`;
  }

  // Le bloc à insérer dans le corrigé d'un exercice, ou rien s'il n'a pas de
  // grille. `integre` : l'écran place lui-même le score dans son corrigé.
  function forExercise(key, values) {
    const grid = root.ATELIER_GRILLES?.[key];
    return grid && !grid.integre ? render(score(grid, values)) : '';
  }

  /* Le corrigé type replié (`details.result-model`, corps `.result-model-body`) :
   * il s'ouvre et se referme en glissant. Un seul écouteur sur la page, qui
   * vaut pour les écrans redessinés ; avec « réduire les animations », le
   * pli s'ouvre d'un coup. */
  const doc = root.document;
  if (doc && typeof doc.addEventListener === 'function') doc.addEventListener('click', event => {
    const summary = event.target.closest && event.target.closest('.result-model > summary');
    if (!summary) return;
    const fold = summary.parentElement;
    const body = fold.querySelector('.result-model-body');
    const still = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || !body || !body.animate) return;
    event.preventDefault();
    if (fold.dataset.moving) return;
    fold.dataset.moving = '1';
    const opening = !fold.open;
    if (opening) fold.open = true;
    fold.classList.toggle('is-closing', !opening);
    const height = `${body.scrollHeight}px`;
    const frames = [{ height: '0px', opacity: 0 }, { height, opacity: 1 }];
    const motion = body.animate(opening ? frames : frames.reverse(), { duration: opening ? 320 : 240, easing: 'cubic-bezier(.3, .7, .3, 1)' });
    motion.onfinish = () => { if (!opening) fold.open = false; fold.classList.remove('is-closing'); delete fold.dataset.moving; };
  });

  root.AtelierAnalyse = Object.freeze({ tokens, find, sentences, score, render, head, lines, answer, forExercise });
})(globalThis);
