// Avant chaque message envoyé à Claude : récupère depuis GitHub ce qui a été
// envoyé depuis l'autre ordinateur (git fetch + merge --ff-only).
// Silencieux quand tout va bien. En cas de souci (pas de réseau, versions
// divergentes, fichier local qui bloquerait), rien n'est touché et un message
// est transmis à Claude pour qu'il prévienne l'utilisateur.
const { execFileSync } = require('child_process');
const path = require('path');

const cwd = path.resolve(__dirname, '..', '..');
const git = (...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 12000 }).trim();

function say(msg) {
  process.stdout.write(`[Synchro GitHub] ${msg}\n`);
}

try {
  try {
    git('fetch', '-q', 'origin', 'main');
  } catch (e) {
    say('Récupération impossible (pas de réseau ?). Travail sur la version locale.');
    process.exit(0);
  }
  const head = git('rev-parse', 'HEAD');
  const remote = git('rev-parse', 'origin/main');
  if (head === remote) process.exit(0);

  const behind = Number(git('rev-list', '--count', 'HEAD..origin/main'));
  const ahead = Number(git('rev-list', '--count', 'origin/main..HEAD'));
  if (behind === 0) process.exit(0); // seulement en avance : rien à récupérer

  if (ahead > 0) {
    say(`Versions divergentes : ${ahead} enregistrement(s) ici jamais envoyé(s), ${behind} nouveau(x) sur GitHub. Rien n'a été touché : prévenir l'utilisateur avant tout travail.`);
    process.exit(0);
  }
  try {
    git('merge', '--ff-only', '-q', 'origin/main');
    say(`${behind} nouveauté(s) récupérée(s) depuis GitHub avant ce message.`);
  } catch (e) {
    say(`Récupération bloquée (des fichiers modifiés ici seraient écrasés). Rien n'a été touché : prévenir l'utilisateur. Détail : ${(e.stderr || e.message).split('\n')[0]}`);
  }
} catch (e) {
  say(`Vérification impossible : ${e.message.split('\n')[0]}`);
}
process.exit(0);
