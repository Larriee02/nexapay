import { createServer as createHttpServer } from 'node:http';
import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'node:url';
import { admin } from './admin.js';
import { auth, loadSession } from './auth.js';
import { pool } from './db.js';
import { problem } from './http.js';
import { ledger } from './ledger.js';
import { contact, tickets } from './support.js';

const dev = process.argv.includes('--dev');
const app = express();
const server = createHttpServer(app);
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || '127.0.0.1';
app.disable('x-powered-by');
if (process.env.TRUST_PROXY_HOPS) app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS));
app.use('/api', helmet(), (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  if (!['GET', 'HEAD'].includes(req.method)) {
    if (req.get('sec-fetch-site') === 'cross-site' || !req.is('application/json')) {
      return next(problem(415, 'Use a same-site JSON request.'));
    }
  }
  next();
}, express.json({ limit: '16kb' }), (req, res, next) => {
  if (!['GET', 'HEAD'].includes(req.method) && (!req.body || Array.isArray(req.body))) {
    return next(problem(400, 'Send a JSON object.'));
  }
  next();
}, loadSession);
app.use('/api/auth', auth);
app.use('/api/ledger', ledger);
app.use('/api/tickets', tickets);
app.use('/api/contact', contact);
app.use('/api/admin', admin);
app.use('/api', (req, res) => res.status(404).json({ error: 'Endpoint not found.' }));

if (dev) {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true, hmr: { server } } });
  app.use(vite.middlewares);
} else {
  const directory = fileURLToPath(new URL('../dist/', import.meta.url));
  app.use(express.static(directory));
  app.get('/{*path}', (req, res) => res.sendFile('index.html', { root: directory }));
}

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status >= 400 && error.status < 500 ? error.status : error.status === 503 ? 503 : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ error: status === 500 ? 'NexaPay could not complete this request.' : error.message });
});

await pool.query('SELECT 1 FROM users LIMIT 1');
server.listen(port, host, () => console.log(`NexaPay is listening on http://${host}:${port}`));
