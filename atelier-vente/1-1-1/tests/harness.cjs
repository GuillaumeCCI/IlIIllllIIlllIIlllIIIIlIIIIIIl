/* DOM minimal pour exécuter les écrans hors navigateur.
 *
 * Partagé par screens.test.cjs et flows.test.cjs. Implémente juste ce que le
 * code des écrans utilise réellement : assez pour attraper les erreurs de
 * référence et les logiques de validation, pas pour juger du rendu visuel.
 * Un essai dans un vrai navigateur reste nécessaire.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function createElement(tag = 'div') {
  return {
    tagName: String(tag).toUpperCase(),
    children: [],
    parentNode: null,
    dataset: {},
    classList: {
      _set: new Set(),
      add(...names) { names.forEach(name => name && this._set.add(name)); },
      remove(...names) { names.forEach(name => this._set.delete(name)); },
      toggle(name, force) {
        if (force === undefined) this._set.has(name) ? this._set.delete(name) : this._set.add(name);
        else force ? this._set.add(name) : this._set.delete(name);
      },
      contains(name) { return this._set.has(name); }
    },
    style: { setProperty() {} },
    attributes: {},
    _html: '',
    _text: '',
    hidden: false,
    value: '',
    maxLength: 500,
    disabled: false,
    get innerHTML() { return this._html; },
    set innerHTML(html) { this._html = String(html); },
    get textContent() { return this._text; },
    set textContent(text) { this._text = String(text); },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    getAttribute(name) { return this.attributes[name] ?? null; },
    removeAttribute(name) { delete this.attributes[name]; },
    addEventListener() {},
    removeEventListener() {},
    appendChild(child) { child.parentNode = this; this.children.push(child); return child; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() {},
    scrollIntoView() {},
    getBoundingClientRect() { return { left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0 }; },
    insertAdjacentHTML(position, html) { this._html += String(html); },
    showModal() {}, close() {}
  };
}

function createDocument() {
  const registry = new Map();
  const ensure = selector => {
    if (!registry.has(selector)) registry.set(selector, createElement('div'));
    return registry.get(selector);
  };
  ['#main', '#feedback', '#form-errors', '#toast', '#info-dialog', '#dialog-title', '#dialog-body',
   '#save-status', '#course-progress', '#course-count', '#exercise-links', '#series-links',
   '#completion-status', '.brand', '.course-label'].forEach(ensure);

  /* Le corrigé détaillé s'insère avant `.feedback-anchor`. Le DOM simulé
   * reproduit cette insertion dans le HTML du feedback, sinon la fiche de
   * corrigé serait écrite dans un nœud isolé et les tests ne la verraient pas. */
  const feedback = ensure('#feedback');
  const marker = '<span class="feedback-anchor" hidden></span>';
  feedback.querySelector = selector => selector !== '.feedback-anchor' ? null : {
    insertAdjacentHTML(position, html) {
      const at = feedback.innerHTML.indexOf(marker);
      feedback.innerHTML = at === -1
        ? feedback.innerHTML + String(html)
        : feedback.innerHTML.slice(0, at) + String(html) + feedback.innerHTML.slice(at);
    }
  };

  return {
    documentElement: Object.assign(createElement('html'), {
      dataset: { depth: '1' },
      requestFullscreen: () => Promise.resolve()
    }),
    fullscreenElement: null,
    exitFullscreen: () => Promise.resolve(),
    body: Object.assign(createElement('body'), { dataset: {}, style: {}, className: '' }),
    title: '',
    activeElement: null,
    querySelector: selector => registry.get(selector) ?? null,
    querySelectorAll: () => [],
    addEventListener() {},
    createElement
  };
}

function makeSandbox(options = {}) {
  const store = new Map(Object.entries(options.storage || {}));
  const sandbox = {
    console,
    document: createDocument(),
    location: { pathname: '/exercices/page.html', hash: '' },
    localStorage: {
      getItem: key => store.has(key) ? store.get(key) : null,
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: key => store.delete(key)
    },
    addEventListener() {},
    requestAnimationFrame() {},
    scrollTo() {},
    setTimeout: () => 0,
    clearTimeout() {},
    setInterval: () => 0,
    clearInterval() {},
    Array, Object, String, Number, Boolean, JSON, Math, Date, Error, RegExp, Set, Map, Promise
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  return sandbox;
}

const MODULES = [
  'js/web-images.js', 'js/icons.js', 'js/catalog.js', 'js/briefings.js', 'js/previews.js', 'js/content-s1.js', 'js/content-s2.js', 'js/content-s3.js', 'js/content-s4.js',
  'js/core.js', 'js/rules.js', 'js/exercise.js', 'js/dnd.js', 'js/placement.js', 'js/sorter.js', 'js/media.js'
];

/* Charge le socle puis un écran. `options.storage` préremplit localStorage. */
function load(screenFile, options = {}) {
  const sandbox = makeSandbox(options);
  for (const file of MODULES) vm.runInContext(read(file), sandbox, { filename: file });
  vm.runInContext(read(screenFile), sandbox, { filename: screenFile });
  return sandbox;
}

const catalogSandbox = makeSandbox();
vm.runInContext(read('js/catalog.js'), catalogSandbox, { filename: 'js/catalog.js' });

module.exports = {
  root, read, load, makeSandbox, createElement, createDocument,
  catalog: catalogSandbox.window.ATELIER_CATALOG
};
