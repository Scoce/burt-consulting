import { Pool } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
let pool: Pool | null = null;

if (connectionString) {
  if (process.env.NODE_ENV === 'production') {
    pool = new Pool({ connectionString });
  } else {
    const globalWithPool = global as typeof globalThis & {
      __neonPool?: Pool;
    };
    if (!globalWithPool.__neonPool) {
      globalWithPool.__neonPool = new Pool({ connectionString });
    }
    pool = globalWithPool.__neonPool;
  }
} else {
  console.warn('[db] Warning: DATABASE_URL is not set. Using in-memory fallback database.');
}

// In-Memory Fallback database for contact submissions
interface MockSubmission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: Date;
}

const mockSubmissions: MockSubmission[] = [];
let dbInitialized = false;
let dbInitializing = false;

async function ensureTables() {
  if (dbInitialized || dbInitializing || !pool) return;
  dbInitializing = true;
  try {
    console.log('[db] Verifying database schema on Neon...');
    // Create contact submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        company VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbInitialized = true;
    console.log('[db] Database schema verified successfully.');
  } catch (err) {
    console.error('[db] Database initialization/migration failed:', err);
  } finally {
    dbInitializing = false;
  }
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const query = async (text: string, params: any[] = []) => {
  const start = Date.now();

  // 1. If real database is configured
  if (pool) {
    if (!dbInitialized) {
      await ensureTables();
    }
    try {
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log(`[db] Postgres query executed in ${duration}ms (rows: ${res.rowCount || 0})`);
      return res;
    } catch (err) {
      console.error('[db] Postgres query error:', err);
      throw err;
    }
  }

  // 2. In-memory database query simulator
  const queryNormalized = text.trim().replace(/\s+/g, ' ');

  // INSERT INTO contact_submissions
  if (queryNormalized.includes('INSERT INTO contact_submissions')) {
    const [name, email, company, message] = params;
    const newSubmission: MockSubmission = {
      id: mockSubmissions.length + 1,
      name,
      email,
      company: company || null,
      message,
      created_at: new Date(),
    };
    mockSubmissions.push(newSubmission);
    console.log('[db] [MOCK] Logged submission:', newSubmission);
    return { rows: [newSubmission], rowCount: 1 };
  }

  // SELECT * FROM contact_submissions
  if (queryNormalized.includes('FROM contact_submissions')) {
    return { rows: [...mockSubmissions], rowCount: mockSubmissions.length };
  }

  console.warn('[db] Unhandled query in in-memory simulator:', queryNormalized);
  return { rows: [], rowCount: 0 };
};

export { pool };
