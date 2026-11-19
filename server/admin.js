import { Router } from 'express';
import { pool } from './db.js';
import { allow, problem, uuid } from './http.js';

export const admin = Router();
admin.use(allow('admin'));

admin.get('/', async (req, res) => {
  const [summary, payments] = await Promise.all([
    pool.query(`SELECT (SELECT count(*) FROM users) AS users,
                       (SELECT count(*) FROM payments) AS payments,
                       (SELECT count(*) FROM tickets WHERE status IN ('open', 'in-progress')) AS active_tickets,
                       (SELECT count(*) FROM contact_messages WHERE read_at IS NULL) AS unread_messages`),
    pool.query(`SELECT p.id, p.amount_cents, p.created_at, sender.name AS sender, recipient.name AS recipient
                FROM payments p JOIN users sender ON sender.id = p.sender_id
                JOIN users recipient ON recipient.id = p.recipient_id ORDER BY p.created_at DESC, p.id LIMIT 50`),
  ]);
  res.json({ summary: summary.rows[0], payments: payments.rows });
});

admin.get('/monthly', async (req, res) => {
  const { rows } = await pool.query(
    `WITH bounds AS (
       SELECT date_trunc('month', now() AT TIME ZONE 'UTC') AS current_month
     ), months AS (
       SELECT generate_series(current_month - interval '5 months', current_month, interval '1 month') AS start
       FROM bounds
     ), registrations AS (
       SELECT date_trunc('month', created_at AT TIME ZONE 'UTC') AS month, count(*) AS accounts
       FROM users WHERE created_at >= ((SELECT min(start) FROM months) AT TIME ZONE 'UTC') GROUP BY 1
     ), transfers AS (
       SELECT date_trunc('month', created_at AT TIME ZONE 'UTC') AS month, sum(amount_cents) AS volume
       FROM payments WHERE created_at >= ((SELECT min(start) FROM months) AT TIME ZONE 'UTC') GROUP BY 1
     )
     SELECT to_char(m.start, 'YYYY-MM-DD') AS month, COALESCE(r.accounts, 0) AS accounts, COALESCE(t.volume, 0) AS volume
     FROM months m LEFT JOIN registrations r ON m.start = r.month
                   LEFT JOIN transfers t ON m.start = t.month ORDER BY m.start DESC`,
  );
  res.json(rows);
});

admin.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC, id LIMIT 100');
  res.json(rows);
});

admin.get('/inbox', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC, id LIMIT 100');
  res.json(rows);
});
admin.patch('/inbox/:id', async (req, res) => {
  const result = await pool.query('UPDATE contact_messages SET read_at = COALESCE(read_at, now()) WHERE id = $1', [uuid(req.params.id)]);
  if (!result.rowCount) throw problem(404, 'Message not found.');
  res.json({});
});
