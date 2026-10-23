import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isConnected = false;

export async function initDatabase() {
  let dbConfig;
  const isSslRequested =
    process.env.DB_SSL === 'true' ||
    process.env.DB_PORT === '4000' ||
    (process.env.DATABASE_URL && (process.env.DATABASE_URL.includes('ssl') || process.env.DATABASE_URL.includes('tidbcloud') || process.env.DATABASE_URL.includes('aivencloud')));

  if (process.env.DATABASE_URL) {
    dbConfig = {
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    if (isSslRequested) {
      dbConfig.ssl = { rejectUnauthorized: false };
    }
  } else {
    dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'stayzy_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    if (isSslRequested) {
      dbConfig.ssl = { rejectUnauthorized: false };
    }
  }

  const targetHost = process.env.DATABASE_URL ? 'Cloud URL' : `${dbConfig.host}:${dbConfig.port}`;

  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isConnected = true;
    console.log(`✅ Connected to MySQL database successfully at ${targetHost} (${dbConfig.database || 'active db'})`);
  } catch (error) {
    console.warn(`⚠️ MySQL not reachable at host ${targetHost} (${error.code || error.message}). Using robust in-memory mock repository for seamless demo operation.`);
    isConnected = false;
  }
}

export function getPool() {
  return pool;
}

export function isDbConnected() {
  return isConnected;
}
