import express from 'express';
import helmet from 'helmet';
import { admin } from './admin.js';
import { auth, loadSession } from './auth.js';
import { problem } from './http.js';
import { ledger } from './ledger.js';
import { contact, tickets } from './support.js';

const app = express();
app.disable('x-powered-by');
const proxyHops = process.env.TRUST_PROXY_HOPS ?? (process.env.VERCEL === '1' ? '1' : '0');
app.set('trust proxy', Number(proxyHops));
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

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status >= 400 && error.status < 500 ? error.status : error.status === 503 ? 503 : 500;
  if (status === 500) console.error(error);
  res.status(status).json({ error: status === 500 ? 'NexaPay could not complete this request.' : error.message });
});

export default app;
