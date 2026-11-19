import { pool, transaction } from './db.js';
import { hashPassword } from './security.js';

const demoUsers = [
  ['Alex Morgan', 'alex@demo.com', 'customer', 2458042],
  ['Jamie Chen', 'jamie@demo.com', 'customer', 100000],
  ['Nexa Studio', 'biz@demo.com', 'merchant', 0],
  ['NexaPay Admin', 'admin@demo.com', 'admin', 0],
];
try {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password || password.length < 12 || password.length > 128) throw new Error('ADMIN_PASSWORD must be 12–128 characters.');
    const result = await pool.query(
      "INSERT INTO users(name, email, password_hash, role) VALUES ('NexaPay Admin', $1, $2, 'admin') ON CONFLICT (email) DO NOTHING",
      [adminEmail.trim().toLowerCase(), await hashPassword(password)],
    );
    if (!result.rowCount) throw new Error('An account with ADMIN_EMAIL already exists.');
  } else {
    if (process.env.NODE_ENV === 'production') throw new Error('Use ADMIN_EMAIL and ADMIN_PASSWORD to provision an admin in production.');
    await transaction(async (client) => {
      for (const [name, email, role, balance] of demoUsers) {
        const { rows } = await client.query(
          'INSERT INTO users(name, email, password_hash, role) VALUES($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING RETURNING id',
          [name, email, await hashPassword('demo123'), role],
        );
        if (rows[0] && role === 'customer') {
          await client.query('INSERT INTO wallets(user_id, balance_cents) VALUES ($1, $2)', [rows[0].id, balance]);
        }
      }
    });
  }
} finally {
  await pool.end();
}
