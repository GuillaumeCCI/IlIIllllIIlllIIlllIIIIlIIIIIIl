/* SÉRIE 9 · FAIRE LE POINT · la colonne « Fin » de la grille
 * d'auto-positionnement, puis « Ma progression ».
 *
 * La grille elle-même (critères, niveaux, questions, tableau « Refaites… »)
 * est dans js/content-s1.js : les deux colonnes partagent les mêmes lignes.
 * Cette série reste la dernière du module : A4, A5 et la synthèse
 * optionnelle viendront s'insérer avant elle.
 */
(function (root) {
  'use strict';

  root.ATELIER_S9 = {

    /* ── 9.1 · Mon point d'arrivée (colonne « Fin ») ───────────────────── */
    '9.1': {
      eyebrow: 'Faire le point · Fin du module',
      title: 'Est-ce que je découvre vraiment le besoin de mon client ?',
      subtitle: 'Cochez votre niveau aujourd’hui, sans chercher à vous souvenir de votre première grille.',
      submitGrid: 'Comparer avec mon point de départ',
      submit: 'Valider mon bilan',
      // Note formateur de la fiche : la surestimation de départ est attendue.
      lower: 'Un niveau plus bas qu’au départ est souvent un bon signe : vous savez maintenant ce que le critère exige vraiment.',
      noStart: 'Vous n’avez pas rempli votre point de départ : la comparaison n’est pas possible, mais votre bilan reste utile.'
    }
  };
})(globalThis);
