/* INTÉGRATION · afficher un module ou un exercice dans une autre plateforme.
 *
 * Chargé tôt et sans `defer`, pour poser le mode avant le premier affichage.
 * Deux modes, choisis par l'adresse :
 *
 *   ?embed=module   le module entier dans une iframe (LMS, site…) : le pied
 *                   de page disparaît, la navigation entre exercices reste,
 *                   et les liens internes gardent le mode intégré ;
 *   ?embed=solo     un exercice seul : en-tête, onglets, navigation et
 *                   bouton « Continuer » disparaissent. L'apprenant fait
 *                   l'exercice, voit son corrigé, et c'est tout.
 *   ?embed=apercu   l'aperçu d'un exercice, au survol du menu Go Live :
 *                   comme « solo », mais toujours sur sa page de contexte,
 *                   sans sons ni musique, et sans rien enregistrer.
 *
 * Dans les deux cas, la page annonce sa hauteur à la page qui l'accueille
 * (message `atelier-vente:height`), pour que l'iframe s'ajuste sans barre
 * de défilement. Le code d'intégration du site sait l'écouter.
 */
(function (root) {
  'use strict';
  if (!root.document) return;

  const params = new URLSearchParams(root.location.search);
  const raw = params.get('embed');
  if (raw === null) return;
  const preview = raw === 'apercu';
  const mode = raw === 'solo' || preview ? 'solo' : 'module';
  document.documentElement.dataset.embed = mode;
  if (preview) document.documentElement.dataset.preview = 'true';

  /* Les liens internes gardent le mode : un module intégré reste intégré
   * d'un exercice à l'autre. */
  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || link.target === '_blank') return;
    const url = new URL(link.getAttribute('href'), root.location.href);
    if (url.origin !== root.location.origin || url.searchParams.has('embed')) return;
    url.searchParams.set('embed', mode);
    link.href = url.pathname + url.search + url.hash;
  }, true);

  /* La hauteur réelle de la page, envoyée à chaque changement. */
  let last = 0;
  function announce() {
    const height = Math.ceil(document.documentElement.scrollHeight);
    if (Math.abs(height - last) < 2 || root.parent === root) return;
    last = height;
    root.parent.postMessage({ type: 'atelier-vente:height', height, page: root.location.pathname }, '*');
  }
  root.addEventListener('load', announce);
  root.addEventListener('resize', announce);
  if (root.ResizeObserver) {
    const start = () => new ResizeObserver(announce).observe(document.body);
    if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  } else root.setInterval(announce, 800);
})(globalThis);
