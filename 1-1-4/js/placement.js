/* ÉTAT DE PLACEMENT · logique commune aux exercices de manipulation.
 *
 * Les quatre exercices à cartes (S3 1.1, S3 1.2, S4 1.1, S4 2.1) partagent la
 * même mécanique : une liste `placed` (une zone par carte), un historique
 * pour « annuler », et un curseur sur la carte présentée. Ce module évite de
 * réécrire quatre fois ce comportement.
 */
(function (root) {
  'use strict';

  const ex = () => root.AtelierExercise;

  function create(options) {
    const { total, unique = false } = options;

    const list = () => {
      const stored = ex().value('placed');
      return Array.isArray(stored) && stored.length === total ? stored.slice() : Array.from({ length: total }, () => null);
    };

    const history = () => {
      const stored = ex().value('history');
      return Array.isArray(stored) ? stored.filter(n => Number.isFinite(n)) : [];
    };

    /* Vue { indexDeCarte: zone } attendue par les plateaux. */
    const map = () => {
      const result = {};
      list().forEach((zone, i) => { if (zone !== null && zone !== undefined) result[i] = zone; });
      return result;
    };

    const placedCount = () => list().filter(zone => zone !== null && zone !== undefined).length;
    const isComplete = () => placedCount() === total;
    const remaining = () => total - placedCount();

    /* Avance le curseur sur la première carte encore libre. */
    function focusNextFree(current) {
      const values = list();
      const next = values.findIndex(zone => zone === null || zone === undefined);
      ex().setCursor(next === -1 ? current : next);
    }

    /* `zone === null` retire la carte de sa zone. Avec `unique`, une zone ne
     * peut accueillir qu'une seule carte : la précédente est renvoyée au paquet. */
    function place(index, zone) {
      const values = list();
      const past = history().filter(n => n !== index);
      if (zone === null || zone === undefined) {
        values[index] = null;
        ex().setValue('placed', values);
        ex().setValue('history', past);
        ex().setCursor(index);
        return;
      }
      if (unique) {
        const occupant = values.findIndex(z => String(z) === String(zone));
        if (occupant !== -1 && occupant !== index) values[occupant] = null;
      }
      values[index] = zone;
      past.push(index);
      ex().setValue('placed', values);
      ex().setValue('history', past);
      focusNextFree(index);
    }

    function undo() {
      const past = history();
      const last = past[past.length - 1];
      if (last === undefined) return false;
      const values = list();
      values[last] = null;
      ex().setValue('placed', values);
      ex().setValue('history', past.slice(0, -1));
      ex().setCursor(last);
      return true;
    }

    /* Branche le plateau : chaque action enregistre puis redessine l'écran. */
    function wire(dnd) {
      dnd.wire({
        onPlace(index, zone) {
          if (!Number.isFinite(index)) return;
          place(index, zone);
          ex().changed();
          ex().rebuild();
        },
        onUndo() {
          if (!undo()) return;
          ex().changed();
          ex().rebuild();
        }
      });
    }

    return { list, map, history, place, undo, wire, placedCount, isComplete, remaining };
  }

  root.AtelierPlacement = Object.freeze({ create });
})(globalThis);
