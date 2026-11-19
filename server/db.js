import pg from 'pg';

if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL before starting NexaPay.');
export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
pool.on('error', (error) => console.error('Postgres connection error:', error.message));

export async function transaction(work) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
