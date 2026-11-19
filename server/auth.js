import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import nodemailer from 'nodemailer';
import { pool, transaction } from './db.js';
import { digest, hashPassword, token, verifyPassword } from './security.js';
import { allow, email, problem, required } from './http.js';

const cookie = 'nexapay_session';
const age = 7 * 24 * 60 * 60 * 1000;
const options = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.SECURE_COOKIES === 'true' || process.env.NODE_ENV === 'production',
  path: '/',
};
const userFields = 'id, name, email, role';
const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
});
const mailer = process.env.SMTP_URL && process.env.MAIL_FROM
  ? nodemailer.createTransport(process.env.SMTP_URL)
  : null;

function password(value, min) {
  if (typeof value !== 'string' || value.length < min || value.length > 128) {
    throw problem(400, `Password must contain ${min}–128 characters.`);
  }
  return value;
}

export async function loadSession(req, res, next) {
  const raw = req.headers.cookie?.match(/(?:^|;\s*)nexapay_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (raw) {
    req.sessionHash = digest(raw);
    const { rows } = await pool.query(
      'SELECT u.id, u.name, u.email, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = $1 AND s.expires_at > now()',
      [req.sessionHash],
    );
    req.user = rows[0];
  }
  next();
}

async function startSession(user, req, res, expectedHash) {
  const raw = token();
  await transaction(async (client) => {
    if (expectedHash) {
      const { rows } = await client.query('SELECT password_hash FROM users WHERE id = $1 FOR UPDATE', [user.id]);
      if (rows[0]?.password_hash !== expectedHash) throw problem(401, 'Invalid email or password.');
    }
    if (req.sessionHash) await client.query('DELETE FROM sessions WHERE token_hash = $1', [req.sessionHash]);
    await client.query('DELETE FROM sessions WHERE user_id = $1 AND expires_at <= now()', [user.id]);
    await client.query('INSERT INTO sessions(token_hash, user_id, expires_at) VALUES ($1, $2, $3)', [
      digest(raw), user.id, new Date(Date.now() + age),
    ]);
  });
  res.cookie(cookie, raw, { ...options, maxAge: age }).json({ user });
}

export const auth = Router();
auth.get('/session', (req, res) => res.json({ user: req.user ?? null }));
auth.post('/login', authLimit, async (req, res) => {
  const { rows } = await pool.query(`SELECT ${userFields}, password_hash FROM users WHERE email = $1`, [email(req.body.email)]);
  const { password_hash: hash, ...user } = rows[0] || {};
  if (!(await verifyPassword(password(req.body.password, 1), hash))) throw problem(401, 'Invalid email or password.');
  await startSession(user, req, res, hash);
});

auth.post('/signup', authLimit, async (req, res) => {
  const name = required(req.body.name, 100, 'Name');
  const address = email(req.body.email);
  const hash = await hashPassword(password(req.body.password, 8));
  const user = await transaction(async (client) => {
    const { rows } = await client.query(
      `INSERT INTO users(name, email, password_hash) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING ${userFields}`,
      [name, address, hash],
    );
    if (!rows[0]) throw problem(409, 'This email is already registered.');
    await client.query('INSERT INTO wallets(user_id) VALUES ($1)', [rows[0].id]);
    return rows[0];
  });
  await startSession(user, req, res);
});

auth.patch('/profile', allow(), async (req, res) => {
  const { rows } = await pool.query(
    `UPDATE users SET name = $1 WHERE id = $2 RETURNING ${userFields}`,
    [required(req.body.name, 100, 'Name'), req.user.id],
  );
  res.json({ user: rows[0] });
});

auth.post('/logout', async (req, res) => {
  if (req.sessionHash) await pool.query('DELETE FROM sessions WHERE token_hash = $1', [req.sessionHash]);
  res.clearCookie(cookie, options).json({});
});

auth.post('/recovery', authLimit, async (req, res) => {
  if (!mailer) throw problem(503, 'Email recovery is unavailable. Contact support for help.');
  const { rows } = await pool.query('SELECT id, email FROM users WHERE email = $1', [email(req.body.email)]);
  const user = rows[0];
  if (user) {
    const code = token();
    await pool.query(
      `INSERT INTO password_resets(token_hash, user_id, expires_at) VALUES ($1, $2, now() + interval '30 minutes')
       ON CONFLICT (user_id) DO UPDATE SET token_hash = EXCLUDED.token_hash, expires_at = EXCLUDED.expires_at`,
      [digest(code), user.id],
    );
    try {
      await mailer.sendMail({ from: process.env.MAIL_FROM, to: user.email, subject: 'Reset your NexaPay password', text: `Enter this recovery code on the NexaPay reset page within 30 minutes:\n\n${code}` });
    } catch {
      console.error('NexaPay recovery email could not be delivered.');
    }
  }
  res.json({});
});

auth.post('/reset', authLimit, async (req, res) => {
  const code = required(req.body.code, 64, 'Recovery code');
  const hash = await hashPassword(password(req.body.password, 8));
  await transaction(async (client) => {
    const { rows } = await client.query(
      'DELETE FROM password_resets WHERE token_hash = $1 AND expires_at > now() RETURNING user_id',
      [digest(code)],
    );
    if (!rows[0]) throw problem(400, 'This recovery code is invalid or expired.');
    await client.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, rows[0].user_id]);
    await client.query('DELETE FROM sessions WHERE user_id = $1', [rows[0].user_id]);
  });
  res.clearCookie(cookie, options).json({});
});
