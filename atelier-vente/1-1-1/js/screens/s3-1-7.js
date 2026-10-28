/* S3 1.7 · Construisez vos cartes réflexes.
 *
 * Quatre objections, traitées une par une depuis le menu des cas. Chaque
 * carte se construit en trois temps : décoder, creuser, répondre. La
 * correction de la carte s’affiche dès que ses trois temps sont validés.
 */
(() => {
  'use strict';
  const core = window.AtelierCore;
  const ex = window.AtelierExercise;
  const { icon, esc } = core;
  const content = window.ATELIER_S3['1.7'];
  const cards = content.cards;

  const stages = ['Décoder', 'Creuser', 'Répondre'];
  const natureKey = i => `nature${i}`;
  const digKey = i => `dig${i}`;
  const replyKey = i => `reply${i}`;
  const doneKey = i => `done${i}`;

  const cardDone = i => ex.value(doneKey(i)) === true;

  /* Ce que lit le menu : le numéro, l’objection en aperçu, et l’état. */
  const caseList = () => cards.map((card, i) => ({
    label: `Objection ${i + 1}`,
    hint: card.objection,
    image: core.portraitFor(null, i),
    portrait: true,
    done: cardDone(i)
  }));

  /* Le temps en cours est propre à la carte ouverte : revenir au menu puis
   * rouvrir une carte reprend là où elle en était. */
  const stageKey = i => `stage${i}`;
  const stage = i => Math.min(3, Math.max(1, Number(ex.value(stageKey(i))) || 1));

  const natureOptions = content.natures.map(n => ({ id: n.id, label: n.label }));

  /* Le corrigé d'une carte, au modèle de S1 A (js/corrige.js) : la nature
   * de l'objection (décoder), le score estimatif de cette carte, puis votre
   * question (creuser) et votre réponse (répondre), chacune face à une
   * réponse possible. */
  function reviewScreen(i, card) {
    const corrige = window.AtelierCorrige;
    const result = corrige.scoreCase('s3-1.7', [2 * i, 2 * i + 1], ex.values());
    const [digBloc, replyBloc] = result ? result.blocs : [];
    return `<form class="an-review s317-review" novalidate data-bar-stays>
      ${ex.caseBar(caseList(), i, { noun: 'carte', feminine: true }, { dots: false })}
      ${core.pageTitle('Corrigé', `Objection ${i + 1}`, `Le client vous dit : « ${card.objection} »`)}
      <section class="panel">${core.panelTitle('Décoder : la nature de l’objection')}
        ${ex.reviewOptions(natureOptions, ex.value(natureKey(i)), card.answer)}
        ${ex.inlineNote(card.why, 'neutral')}
      </section>
      ${corrige.head(result)}
      ${corrige.rows([
        corrige.row({ n: 1, title: 'Creuser : votre question', bloc: digBloc, text: ex.value(digKey(i)), model: card.question }),
        corrige.row({ n: 2, title: 'Répondre : votre réponse avec une preuve', bloc: replyBloc, text: ex.value(replyKey(i)), model: card.reply })
      ])}
      ${core.errorsBox()}
      ${ex.caseActions(caseList(), i, 'Valider cette carte')}
    </form>`;
  }

  function screen() {
    const i = ex.openCase() ?? 0;
    const card = cards[i];
    const reviewed = cardDone(i);
    const at = stage(i);

    if (reviewed) return reviewScreen(i, card);
    const body = at === 1
      ? `<h2>Quelle est la nature de cette objection ?</h2>
         <p class="muted">Choisissez une réponse.</p>
         ${ex.radioCards(natureKey(i), content.natures, 'two')}`
      : at === 2
      ? `<h2>Quelle question permet de creuser ?</h2>
         <p class="muted">Une question ouverte, qui fait préciser sans suggérer la réponse.</p>
         ${ex.field(digKey(i), 'Votre question', { placeholder: 'Par rapport à quoi…', max: 240, rows: 3, hideLabel: true })}`
      : `<h2>Votre réponse, avec une preuve</h2>
         <p class="muted">Appuyez-vous sur un élément vérifiable plutôt que sur une promesse.</p>
         ${ex.field(replyKey(i), 'Votre réponse', { placeholder: 'Concrètement…', max: 400, rows: 4, hideLabel: true })}`;

    const steps = `<div class="stepper">${stages.map((label, n) => `<div class="stepper-item ${n + 1 === at ? 'active' : ''} ${n + 1 < at ? 'done' : ''}">
      <span class="stepper-dot">${n + 1}</span><span class="stepper-label">${esc(label.toUpperCase())}</span>
    </div>`).join('')}</div>`;

    /* Les deux premiers temps font avancer la carte ; le troisième la valide. */
    const actions = ex.actions(at < 3 ? 'Continuer' : 'Valider cette carte');

    return `<div class="two-columns reflex-layout">
      <section class="panel scenario">
        ${core.pageTitle(content.eyebrow, content.title, content.intro)}
        <div class="reflex-objection">${core.clientCard(card.objection, null, `Objection ${i + 1} sur ${cards.length}`, i)}</div>
      </section>
      <form class="panel answer-panel" novalidate data-bar-stays>
        ${ex.caseBar(caseList(), i, { noun: 'carte', feminine: true }, { dots: false })}
        ${steps}
        <div class="stage-body">${body}</div>
        ${ex.lockNote('Le corrigé de cette carte s’affiche dès que vous l’avez construite')}
        ${core.errorsBox()}
        ${actions}
      </form>
    </div>`;
  }

  /* La validation ne porte que sur la carte ouverte, et seulement sur son
   * temps en cours : décoder n’exige pas encore la question ni la réponse. */
  function validate(values) {
    const i = ex.openCase() ?? 0;
    const at = stage(i);
    if (at === 1) {
      return values[natureKey(i)] ? [] : [{ key: natureKey(i), message: 'Identifiez la nature de cette objection.' }];
    }
    if (at === 2) {
      return String(values[digKey(i)] ?? '').trim()
        ? [] : [{ key: digKey(i), message: 'Proposez une question pour creuser.' }];
    }
    return String(values[replyKey(i)] ?? '').trim()
      ? [] : [{ key: replyKey(i), message: 'Rédigez votre réponse avec une preuve.' }];
  }

  /* Temps 1 et 2 : on avance dans la carte sans rien conclure. */
  function intercept() {
    const i = ex.openCase() ?? 0;
    if (cardDone(i)) return false;
    const at = stage(i);
    if (at === 1) {
      if (!ex.value(natureKey(i))) return false;
      ex.setValue(stageKey(i), 2);
      return true;
    }
    if (at === 2) {
      if (!String(ex.value(digKey(i)) ?? '').trim()) return false;
      ex.setValue(stageKey(i), 3);
      return true;
    }
    return false;
  }

  function afterSubmit() {
    ex.setValue(doneKey(ex.openCase() ?? 0), true);
  }

  const allDone = () => cards.every((_, i) => cardDone(i));

  function feedback() {
    if (!allDone()) return '';
    const right = cards.filter((card, i) => ex.value(natureKey(i)) === card.answer).length;
    return [`${right} nature sur ${cards.length} correctement identifiée${right > 1 ? 's' : ''}. Rouvrez une carte pour relire votre question, votre réponse et l’analyse attendue.`];
  }

  function answerKey() {
    return `<div class="answer-key"><h4>Le détail, carte par carte</h4>${cards.map((card, i) => {
      const ok = ex.value(natureKey(i)) === card.answer;
      const label = content.natures.find(n => n.id === card.answer).label;
      return `<div class="answer-key-row">
        <span class="verdict ${ok ? 'ok' : 'ko'}">${icon(ok ? 'check' : 'close', { size: 14, label: ok ? 'correct' : 'incorrect' })}</span>
        <span><strong>« ${esc(card.objection)} »</strong> ${esc(label)}.</span>
      </div>`;
    }).join('')}</div>`;
  }

  /* Changement de temps dans une même carte : le contenu arrive en
   * glissant, la pastille du temps rebondit. Avec « réduire les
   * animations », rien ne bouge. */
  let last = null;
  function onMount() {
    const i = ex.openCase();
    const now = i === null ? null : { i, at: stage(i), done: cardDone(i) };
    const moved = last && now && last.i === now.i && !now.done && last.at !== now.at;
    last = now;
    if (!moved || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    const bodyEl = core.$('.stage-body');
    if (bodyEl && bodyEl.animate) bodyEl.animate([{ opacity: 0, transform: 'translateX(48px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(.22, .9, .3, 1)' });
    const dot = core.$('.stepper-item.active .stepper-dot');
    if (dot) { dot.classList.remove('k-switch-pop'); void dot.offsetWidth; dot.classList.add('k-switch-pop'); }
  }

  ex.mount('s3-1.7', {
    screen, onMount, validate, feedback, answerKey, intercept, afterSubmit, allDone,
    cases: caseList,
    menuIntro: 'Quatre cartes réflexes à construire. Choisissez l’objection que vous souhaitez travailler en premier.'
  });
})();
