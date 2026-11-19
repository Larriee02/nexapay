import { readdir, readFile } from 'node:fs/promises';
import { pool, transaction } from './db.js';

try {
  await transaction(async (client) => {
    await client.query('SELECT pg_advisory_xact_lock(781029)');
    await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz DEFAULT now())');
    const { rows } = await client.query('SELECT name FROM schema_migrations');
    const applied = new Set(rows.map((row) => row.name));
    const directory = new URL('./migrations/', import.meta.url);
    const files = (await readdir(directory)).filter((name) => name.endsWith('.sql')).sort();
    for (const name of files) {
      if (applied.has(name)) continue;
      await client.query(await readFile(new URL(name, directory), 'utf8'));
      await client.query('INSERT INTO schema_migrations(name) VALUES ($1)', [name]);
      console.log('Applied', name);
    }
  });
} finally {
  await pool.end();
}
