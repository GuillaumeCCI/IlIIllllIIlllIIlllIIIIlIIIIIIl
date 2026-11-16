const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

/* Helpers de saisie partagés. Les écrans sont couverts par screens.test.cjs
 * et flows.test.cjs, qui les montent et les jouent. */
const context = vm.createContext({});
context.globalThis = context;
vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/rules.js'), 'utf8'), context);
const rules = context.ExerciseRules;

test('required refuse le vide et les espaces seuls', () => {
  assert.ok(rules.required({ a: '' }, 'a', 'Champ'));
  assert.ok(rules.required({ a: '   ' }, 'a', 'Champ'));
  assert.equal(rules.required({ a: 'ok' }, 'a', 'Champ'), null);
});

test('required signale un texte trop long', () => {
  assert.ok(rules.required({ a: 'abcdef' }, 'a', 'Champ', 3));
});

test('wordRange compte les mots et respecte les bornes', () => {
  assert.equal(rules.words('un deux  trois '), 3);
  assert.ok(rules.wordRange({ a: 'un deux trois' }, 'a', 'Champ', 4, 10));
  assert.ok(rules.wordRange({ a: 'un deux trois' }, 'a', 'Champ', 0, 2));
  assert.equal(rules.wordRange({ a: 'un deux trois' }, 'a', 'Champ', 2, 5), null);
  assert.equal(rules.wordRange({ a: '' }, 'a', 'Champ', 2, 5), null);
});
