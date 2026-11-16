/* SÉRIE 1 · SE POSITIONNER · la grille d'auto-positionnement du module.
 *
 * Fiche M1.2.2, « Grille d'auto-positionnement · Est-ce que je découvre
 * vraiment le besoin de mon client ? ». Huit critères, trois niveaux. L'apprenant
 * remplit la colonne « Début » avant le module (exercice 1.1), puis la
 * colonne « Fin » à la fin (série 9, exercice 9.1), sans revoir la
 * première ; il compare ensuite les deux et répond aux questions « Ma
 * progression ». La fiche tutoie ; l'interface vouvoie.
 *
 * La grille est partagée : `grid` sert aux deux écrans.
 */
(function (root) {
  'use strict';

  const grid = {
    title: 'Est-ce que je découvre vraiment le besoin de mon client ?',

    // Les trois niveaux, du plus bas au plus haut (l'ordre sert à comparer).
    levels: [
      { id: '0', label: 'À retravailler' },
      { id: '1', label: 'En bonne voie' },
      { id: '2', label: 'Maîtrisé' }
    ],

    criteria: [
      { title: 'Préparation', text: 'Avant l’entretien, je sais quelles informations je dois recueillir et j’ai préparé mes questions principales.' },
      { title: 'Technique de l’entonnoir', text: 'Je pars de questions larges sur la situation du client, puis je resserre vers des questions précises.' },
      { title: 'Types de questions', text: 'J’utilise les questions ouvertes pour faire parler, les questions alternatives pour faire choisir et les questions fermées pour valider, au bon moment.' },
      { title: 'Relances', text: 'Quand une réponse est vague, je relance (« C’est-à-dire ? », « Par exemple ? ») au lieu de passer à la question suivante.' },
      { title: 'Besoin explicite / implicite', text: 'Je distingue ce que le client demande de ce dont il a réellement besoin, et je vérifie mes hypothèses par une question.' },
      { title: 'Problématique et enjeux', text: 'Je fais exprimer au client ce que son problème lui coûte (temps, argent, image, sécurité, fatigue).' },
      { title: 'Motivations d’achat', text: 'Je repère ce qui motive vraiment le client (sécurité, orgueil, nouveauté, confort, argent, sympathie, valeurs) à partir de ses propres mots.' },
      { title: 'Hiérarchisation', text: 'Je distingue le besoin prioritaire des besoins secondaires et je fais valider cet ordre par le client.' }
    ],

    /* « Ma progression », à remplir à la fin du module. */
    questions: [
      { id: 'q1', label: 'Sur quel critère avez-vous le plus progressé ?', sub: 'Donnez un exemple précis tiré d’une activité.', placeholder: 'Ex. : les relances. Dans « Votre guide, votre découverte », j’ai…' },
      { id: 'q2', label: 'Quel critère reste « À retravailler » ou « En bonne voie » ?', sub: 'Un seul suffit : celui qui vous semble le plus utile à travailler.', placeholder: 'Le critère, et ce qui vous gêne encore…' },
      { id: 'q3', label: 'Quelle activité allez-vous refaire pour le travailler ?', sub: 'Aidez-vous du tableau « Si vous voulez retravailler… ».', placeholder: 'L’activité, et ce que vous y ferez autrement…' }
    ],

    /* « Si tu veux retravailler… Refais… » : `serie` et `exercise` renvoient
     * à l'exercice du module qui porte l'activité. Tant qu'il n'est pas en
     * ligne, la ligne s'affiche sans lien. */
    redo: [
      { topic: 'Types de questions, technique de l’entonnoir', activity: 'A1 · La bonne question au bon moment', serie: 's2', exercise: '2.1' },
      { topic: 'Besoin explicite / implicite, relances', activity: 'A2 · Du besoin exprimé au besoin réel', serie: 's3', exercise: '3.1' },
      { topic: 'Motivations d’achat, hiérarchisation', activity: 'A3 · Les mots qui trahissent les motivations', serie: 's4', exercise: '4.1' },
      { topic: 'Préparation, problématique et enjeux', activity: 'A4 · Le guide qui fait parler', serie: 's5', exercise: '5.1' },
      { topic: 'Tous les critères ensemble', activity: 'A5 avec une autre fiche client', serie: 's5', exercise: '5.2' }
    ]
  };

  /* LA GRILLE EN PASTILLES : une ligne par critère (numéro, titre, phrase),
   * puis trois boutons ; le niveau choisi se remplit de sa couleur, avec une
   * coche. `key` : préfixe des champs (« deb », « fin »). Un clic enregistre
   * le niveau (data-act="pos-pick", géré par chaque écran). */
  const pills = (key, ex, kit) => `<ol class="pos-rows">${grid.criteria.map((c, i) => {
    const chosen = ex.value(`${key}${i}`);
    return `<li class="pos-row">
      <span class="pos-row-n">${i + 1}</span>
      <span class="pos-row-text"><strong>${kit.esc(c.title)}</strong><small>${kit.esc(c.text)}</small></span>
      <span class="pos-pills" role="radiogroup" aria-label="${kit.esc(c.title)}">${grid.levels.map((l, j) => `<button type="button" class="pos-pill level-${l.id} ${chosen === l.id ? 'is-on' : ''}" role="radio" aria-checked="${chosen === l.id}" data-act="pos-pick" data-key="${key}${i}" data-id="${l.id}" ${j === 0 ? `data-field="${key}${i}"` : ''}>${kit.icon('check', { size: 14, strokeWidth: 3 })}<span>${kit.esc(l.label)}</span></button>`).join('')}</span>
    </li>`;
  }).join('')}</ol>`;

  /* Le clic sur une pastille : le niveau est enregistré, la ligne se met à jour. */
  const pick = (control, ex, kit) => {
    ex.setValue(control.dataset.key, control.dataset.id);
    ex.changed();
    control.parentElement.querySelectorAll('.pos-pill').forEach(b => {
      const on = b === control;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-checked', String(on));
    });
    kit.refreshLive();
  };

  root.ATELIER_S1 = {
    grid,
    pills,
    pick,

    /* ── 1.1 · Mon point de départ (colonne « Début ») ─────────────────── */
    '1.1': {
      eyebrow: 'Se positionner · Début du module',
      title: grid.title,
      subtitle: 'Pour chaque critère, cochez votre niveau aujourd’hui. Soyez honnête : personne ne vous note, c’est votre point de départ.',
      submit: 'Enregistrer mon point de départ',
      after: 'Votre point de départ est enregistré. À la fin du module, vous remplirez la même grille sans revoir celle-ci, puis vous verrez ce qui a bougé.'
    }
  };
})(globalThis);
