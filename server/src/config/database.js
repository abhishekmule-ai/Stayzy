import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isConnected = false;

export async function initDatabase() {
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'stayzy_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isConnected = true;
    console.log('✅ Connected to MySQL database successfully:', dbConfig.database);
  } catch (error) {
    console.warn('⚠️ MySQL not reachable at host ' + dbConfig.host + ' (' + error.code + '). Using robust in-memory mock repository for seamless demo operation.');
    isConnected = false;
  }
}

export function getPool() {
  return pool;
}

export function isDbConnected() {
  return isConnected;
}
