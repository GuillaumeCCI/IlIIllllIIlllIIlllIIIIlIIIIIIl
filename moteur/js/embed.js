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

  /* LE CADRE. Le navigateur quitte le plein écran à chaque changement de
   * page. Une page de module ouverte hors du cadre (lien direct, ancien code
   * d'intégration) s'y place donc d'elle-même, avant tout affichage : le
   * cadre ne change plus de page, seules les pages intérieures changent, et
   * le plein écran tient. Sauf l'aperçu et l'exercice seul, faits pour
   * rester tels quels, et hors serveur web (fichier, tests). */
  const inCadre = (() => {
    try { return root.parent !== root && root.parent.document.documentElement.hasAttribute('data-cadre'); } catch { return false; }
  })();
  const place = /^(.*\/)(\d+-\d+-\d+\/(?:exercices\/[\w-]+\.html|index\.html)?)$/.exec(root.location.pathname);
  if (!inCadre && place && /^https?:$/.test(root.location.protocol) && raw !== 'apercu' && raw !== 'solo') {
    document.documentElement.style.visibility = 'hidden';
    root.location.replace(`${place[1]}cadre.html?page=${encodeURIComponent(place[2] + root.location.search + root.location.hash)}`);
    return;
  }

  if (raw === null) return;
  const preview = raw === 'apercu';
  const mode = raw === 'solo' || preview ? 'solo' : 'module';
  document.documentElement.dataset.embed = mode;
  if (preview) document.documentElement.dataset.preview = 'true';

  /* ?embed=module&theme=s2 : le module réduit à une seule série (un thème),
   * pour une séquence de LMS. Le catalogue est filtré dès qu'il est posé,
   * avant que `all` soit calculé : accueil, onglets, « Continuer », bilan et
   * progression ne voient plus que les exercices de ce thème. */
  const theme = mode === 'module' ? params.get('theme') : null;
  if (theme) {
    let catalog;
    Object.defineProperty(root, 'ATELIER_CATALOG', {
      configurable: true,
      get: () => catalog,
      set(value) {
        const serie = value && Array.isArray(value.series) && value.series.find(s => s.id === theme);
        if (serie) {
          value.series = [serie];
          value.theme = serie.id;
          value.intro = `${serie.exercises.length} exercices · ${serie.label}.`;
          document.documentElement.dataset.embedTheme = serie.id;
          /* L'en-tête de l'accueil annonce tout le module (« Série 1-1-1 ·
           * 4 séries, … ») : il ne nomme plus que le thème, en gras. */
          document.addEventListener('DOMContentLoaded', () => {
            const label = document.querySelector('.course-label');
            if (label && /séries/.test(label.textContent)) label.textContent = serie.label;
          });
        }
        catalog = value;
      }
    });
  }

  /* Les liens internes gardent le mode (et le thème) : un module intégré
   * reste intégré d'un exercice à l'autre. */
  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || link.target === '_blank') return;
    const url = new URL(link.getAttribute('href'), root.location.href);
    if (url.origin !== root.location.origin || url.searchParams.has('embed')) return;
    url.searchParams.set('embed', mode);
    if (theme) url.searchParams.set('theme', theme);
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
