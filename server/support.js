import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { pool, transaction } from './db.js';
import { allow, choice, email, problem, required, uuid } from './http.js';

const statuses = ['open', 'in-progress', 'resolved', 'closed'];

export const tickets = Router();
tickets.use(allow());
tickets.get('/', async (req, res) => {
  const owner = req.user.role === 'admin' ? null : req.user.id;
  const { rows } = await pool.query(
    `SELECT t.*, u.email AS customer_email,
            COALESCE((SELECT json_agg(json_build_object('id', m.id, 'sender', a.name, 'body', m.body, 'created_at', m.created_at) ORDER BY m.id)
                      FROM ticket_messages m JOIN users a ON a.id = m.author_id WHERE m.ticket_id = t.id), '[]') AS messages
     FROM tickets t JOIN users u ON u.id = t.user_id
     WHERE ($1::uuid IS NULL OR t.user_id = $1) ORDER BY t.created_at DESC LIMIT 100`,
    [owner],
  );
  res.json(rows);
});

tickets.post('/', allow('customer'), async (req, res) => {
  const { title, description, category, priority } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO tickets(user_id, title, description, category, priority) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [req.user.id, required(title, 120, 'Title'), required(description, 4000, 'Description'),
      choice(category, ['billing', 'technical', 'account', 'security', 'other'], 'category'),
      choice(priority, ['low', 'medium', 'high'], 'priority')],
  );
  res.status(201).json(rows[0]);
});

tickets.patch('/:id', allow('admin'), async (req, res) => {
  const result = await pool.query('UPDATE tickets SET status = $1 WHERE id = $2', [
    choice(req.body.status, statuses, 'status'), uuid(req.params.id),
  ]);
  if (!result.rowCount) throw problem(404, 'Ticket not found.');
  res.json({});
});

tickets.post('/:id/messages', async (req, res) => {
  const id = uuid(req.params.id);
  const body = required(req.body.body, 4000, 'Reply');
  await transaction(async (client) => {
    const owner = req.user.role === 'admin' ? null : req.user.id;
    const { rows } = await client.query(
      'SELECT status FROM tickets WHERE id = $1 AND ($2::uuid IS NULL OR user_id = $2) FOR UPDATE',
      [id, owner],
    );
    if (!rows[0]) throw problem(404, 'Ticket not found.');
    if (rows[0].status === 'closed') throw problem(409, 'This ticket is closed.');
    await client.query('INSERT INTO ticket_messages(ticket_id, author_id, body) VALUES ($1, $2, $3)', [id, req.user.id, body]);
    if (owner === null && rows[0].status === 'open') {
      await client.query("UPDATE tickets SET status = 'in-progress' WHERE id = $1", [id]);
    }
  });
  res.status(201).json({});
});

export const contact = Router();
contact.post('/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 15, message: { error: 'Please try again in a few minutes.' } }), async (req, res) => {
  const { name, subject, body } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO contact_messages(name, email, subject, body) VALUES ($1, $2, $3, $4) RETURNING id',
    [required(name, 100, 'Name'), email(req.body.email), required(subject, 150, 'Subject'), required(body, 4000, 'Message')],
  );
  res.status(201).json(rows[0]);
});
