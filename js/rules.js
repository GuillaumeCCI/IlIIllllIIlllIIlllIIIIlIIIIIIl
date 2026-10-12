/* Règles de complétude, pas de notation automatique du contenu.
 *
 * `validate` couvre les exercices de la série 1 (compatibilité avec les tests
 * d’origine). Les helpers `required`, `words` et `check` servent à toutes les
 * séries : un écran les compose plutôt que de réécrire ses contrôles.
 */
(function (root) {
  'use strict';

  const text = value => typeof value === 'string' ? value.trim() : '';
  const words = value => (text(value).match(/\S+/gu) || []).length;

  /* Renvoie une erreur ou null. À composer dans un .filter(Boolean). */
  function required(values, key, label, max = 2000) {
    const value = text(values[key]);
    if (!value) return { key, message: `Complétez « ${label} ».` };
    if (String(values[key]).length > max) return { key, message: `« ${label} » : ${max} caractères maximum.` };
    return null;
  }

  /* Contrôle de nombre de mots, borne basse facultative. */
  function wordRange(values, key, label, min, max) {
    const n = words(values[key]);
    if (!n) return null;                                   // le vide est traité par required
    if (max && n > max) return { key, message: min ? `« ${label} » doit contenir entre ${min} et ${max} mots (actuellement ${n}).` : `Réduisez « ${label} » à ${max} mots maximum.` };
    if (min && n < min) return { key, message: `« ${label} » doit contenir entre ${min} et ${max} mots (actuellement ${n}).` };
    return null;
  }

  function validate(id, values, config) {
    const errors = [];
    const need = (key, label, max = 2000) => {
      const error = required(values, key, label, max);
      if (error) errors.push(error);
    };
    if (id === 'A') {
      need('strengths', 'Ce qui fonctionne', 500);
      need('improvements', 'Axes d’amélioration', 500);
      need('rewrite', 'Votre version améliorée', 800);
    } else if (id === 'B') {
      need('opening', 'Votre entrée en matière', 600);
      need('adjustment', 'Votre réglage majeur', 250);
    } else if (id === 'C') {
      if (!['1', '2'].includes(values.choice)) errors.push({ key: 'choice', message: 'Choisissez une ouverture.' });
      const count = Math.min(5, Math.max(3, Number(values.argumentCount) || 3));
      for (let i = 1; i <= count; i++) {
        if (!config.criteria.includes(values[`criterion${i}`])) errors.push({ key: `criterion${i}`, message: `Argument ${i} : choisissez un critère.` });
        need(`argument${i}`, `Argument ${i}`, 400);
      }
      need('borrow', 'Ce que vous emprunteriez à l’autre', 500);
    } else if (id === 'D') {
      const count = Math.min(6, Math.max(4, Number(values.lineCount) || 4));
      for (let i = 1; i <= count; i++) {
        need(`line${i}`, `Phrase ${i}`, 300);
        if (!config.techniques.includes(values[`technique${i}`])) errors.push({ key: `technique${i}`, message: `Phrase ${i} : choisissez une fonction.` });
      }
    } else if (id === 'E1') need('response', 'Votre prochaine action', 300);
    else if (id === 'E2') {
      need('proposal', 'Votre proposition', 2000);
      if (words(values.proposal) > 90) errors.push({ key: 'proposal', message: 'Réduisez votre proposition à 90 mots maximum.' });
    } else if (id === 'E3') {
      need('opening', 'Votre ouverture', 280);
      if (/[?？]/u.test(text(values.opening))) errors.push({ key: 'opening', message: 'Reformulez votre ouverture sans point d’interrogation, comme demandé.' });
    } else if (id === 'F') {
      need('phone', 'Téléphone', 1500);
      need('subject', 'Objet de l’e-mail', 120);
      need('email', 'Message', 3000);
      const n = words(values.email);
      if (n && (n < 80 || n > 120)) errors.push({ key: 'email', message: `L’e-mail doit contenir entre 80 et 120 mots (actuellement ${n}).` });
    }
    return errors;
  }

  root.ExerciseRules = Object.freeze({ words, text, required, wordRange, validate });
})(globalThis);
