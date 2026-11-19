import process from 'node:process';

export default async function handler(req, res) {
  if (process.env.DATABASE_URL) {
    const { default: app } = await import('../server/app.js');
    return app(req, res);
  }

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && req.url.split('?')[0] === '/api/auth/session') {
    return res.end(JSON.stringify({ user: null }));
  }
  res.statusCode = 503;
  res.end(JSON.stringify({ error: 'This is a public preview. Account and payment services are temporarily unavailable.' }));
}
