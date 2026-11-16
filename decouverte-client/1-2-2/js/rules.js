/* Règles de complétude, pas de notation automatique du contenu.
 *
 * Helpers communs : un écran les compose plutôt que de réécrire ses
 * contrôles de saisie.
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

  root.ExerciseRules = Object.freeze({ words, text, required, wordRange });
})(globalThis);
