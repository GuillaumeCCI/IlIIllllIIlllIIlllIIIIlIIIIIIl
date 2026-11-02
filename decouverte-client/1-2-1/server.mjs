// Serveur de développement facultatif. Node.js 18+ ; aucune installation npm.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const port = Number(option('--port', process.env.PORT || 4173));
const host = option('--host', '127.0.0.1');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.woff2': 'font/woff2', '.json': 'application/json; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    // Les fichiers communs (/moteur/…, que le navigateur demande à la racine
    // depuis ../../moteur/) viennent du moteur du dépôt.
    const base = pathname.startsWith('/moteur/') ? resolve(root, '..', '..') : root;
    let path = resolve(base, '.' + pathname);
    const rel = relative(base, path);
    if (rel === '..' || rel.startsWith('..' + sep) || rel.split(sep).some(part => part.startsWith('.'))) { response.writeHead(403); response.end('Accès refusé'); return; }
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const bytes = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path).toLowerCase()] || 'application/octet-stream', 'Content-Length': bytes.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch { response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); response.end('Fichier introuvable'); }
});
server.listen(port, host, () => console.log(`L’Atelier Vente : http://${host}:${port}/`));
server.on('error', error => { console.error(`Impossible de démarrer le serveur : ${error.message}`); process.exitCode = 1; });
