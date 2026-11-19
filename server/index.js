import { createServer as createHttpServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import app from './app.js';
import { pool } from './db.js';

const dev = process.argv.includes('--dev');
const server = createHttpServer(app);
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || '127.0.0.1';

if (dev) {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true, hmr: { server } } });
  app.use(vite.middlewares);
} else {
  const directory = fileURLToPath(new URL('../dist/', import.meta.url));
  app.use(express.static(directory));
  app.get('/{*path}', (req, res) => res.sendFile('index.html', { root: directory }));
}

await pool.query('SELECT 1 FROM users LIMIT 1');
server.listen(port, host, () => console.log(`NexaPay is listening on http://${host}:${port}`));
