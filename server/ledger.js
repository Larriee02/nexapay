import { Router } from 'express';
import { pool, transaction } from './db.js';
import { allow, choice, email, problem, uuid } from './http.js';

export const ledger = Router();
ledger.use(allow('customer'));

ledger.get('/', async (req, res) => {
  const [wallet, activity] = await Promise.all([
    pool.query('SELECT balance_cents FROM wallets WHERE user_id = $1', [req.user.id]),
    pool.query(
      `SELECT p.id, p.amount_cents, p.created_at, p.sender_id = $1 AS outgoing,
              CASE WHEN p.sender_id = $1 THEN p.type ELSE 'receive' END AS type,
              CASE WHEN p.sender_id = $1 THEN recipient.name ELSE sender.name END AS counterparty
       FROM payments p JOIN users sender ON sender.id = p.sender_id JOIN users recipient ON recipient.id = p.recipient_id
       WHERE p.sender_id = $1 OR p.recipient_id = $1 ORDER BY p.created_at DESC, p.id DESC LIMIT 100`,
      [req.user.id],
    ),
  ]);
  res.json({ balance: wallet.rows[0].balance_cents, payments: activity.rows });
});

ledger.get('/monthly', async (req, res) => {
  const { rows } = await pool.query(
    `WITH bounds AS (
       SELECT date_trunc('month', now() AT TIME ZONE 'UTC') AS current_month
     ), months AS (
       SELECT generate_series(current_month - interval '5 months', current_month, interval '1 month') AS start
       FROM bounds
     ), activity AS (
       SELECT date_trunc('month', created_at AT TIME ZONE 'UTC') AS month,
              sum(amount_cents) FILTER (WHERE sender_id = $1) AS sent,
              sum(amount_cents) FILTER (WHERE recipient_id = $1) AS received
       FROM payments
       WHERE (sender_id = $1 OR recipient_id = $1) AND created_at >= ((SELECT min(start) FROM months) AT TIME ZONE 'UTC')
       GROUP BY 1
     )
     SELECT to_char(m.start, 'YYYY-MM-DD') AS month, COALESCE(a.sent, 0) AS sent, COALESCE(a.received, 0) AS received
     FROM months m LEFT JOIN activity a ON m.start = a.month ORDER BY m.start DESC`,
    [req.user.id],
  );
  res.json(rows);
});

ledger.post('/', async (req, res) => {
  const { amount } = req.body;
  if (typeof amount !== 'string' || !/^\d{1,7}(?:\.\d{1,2})?$/.test(amount.trim())) {
    throw problem(400, 'Enter a dollar amount with up to two decimal places.');
  }
  const [dollars, fraction = ''] = amount.trim().split('.');
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, '0'));
  if (!cents) throw problem(400, 'Enter an amount greater than zero.');
  const address = email(req.body.recipient);
  const type = choice(req.body.type, ['send', 'transfer'], 'payment type');
  const requestId = uuid(req.body.requestId);
  const sender = req.user.id;
  const payment = await transaction(async (client) => {
    const { rows: recipients } = await client.query(
      'SELECT u.id FROM users u JOIN wallets w ON w.user_id = u.id WHERE u.email = $1',
      [address],
    );
    const recipient = recipients[0]?.id;
    if (!recipient || recipient === sender) throw problem(400, 'Choose another NexaPay wallet by its email address.');

    const { rows: wallets } = await client.query(
      'SELECT user_id, balance_cents FROM wallets WHERE user_id = ANY($1::uuid[]) ORDER BY user_id FOR UPDATE',
      [[sender, recipient]],
    );
    const { rows: previous } = await client.query(
      'SELECT id, recipient_id, amount_cents, type FROM payments WHERE sender_id = $1 AND request_id = $2',
      [sender, requestId],
    );
    if (previous[0]) {
      const existing = previous[0];
      if (existing.recipient_id !== recipient || Number(existing.amount_cents) !== cents || existing.type !== type) {
        throw problem(409, 'This payment reference already belongs to another transfer.');
      }
      return existing.id;
    }
    if (BigInt(wallets.find((wallet) => wallet.user_id === sender).balance_cents) < BigInt(cents)) {
      throw problem(400, 'Your available balance is too low for this payment.');
    }
    await client.query(
      'UPDATE wallets SET balance_cents = balance_cents + CASE WHEN user_id = $1 THEN -$3::bigint ELSE $3::bigint END WHERE user_id IN ($1, $2)',
      [sender, recipient, cents],
    );
    const { rows } = await client.query(
      'INSERT INTO payments(sender_id, recipient_id, request_id, amount_cents, type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [sender, recipient, requestId, cents, type],
    );
    return rows[0].id;
  });
  res.status(201).json({ id: payment });
});
