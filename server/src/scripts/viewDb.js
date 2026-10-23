import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function viewDatabase() {
  console.log('\n==============================================');
  console.log('   🔍 STAYZY PROJECT - LIVE DATABASE VIEWER   ');
  console.log('==============================================\n');

  const isSsl =
    process.env.DB_SSL === 'true' ||
    process.env.DB_PORT === '4000' ||
    (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('ssl'));

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
  };

  if (isSsl) {
    dbConfig.ssl = { rejectUnauthorized: false };
  }

  console.log(`📡 Connecting to: ${dbConfig.host}:${dbConfig.port} (DB: ${dbConfig.database})`);

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database Connected Successfully!\n');

    // 1. Show all tables
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('📋 Database Tables:');
    console.table(tables);

    // 2. Users Table
    const [users] = await connection.query(
      'SELECT id, name, email, role, phone, created_at FROM users LIMIT 10;'
    );
    console.log('\n👤 Table: users');
    console.table(users);

    // 3. Areas Table
    const [areas] = await connection.query(
      'SELECT id, name, city, pincode, tagline FROM areas LIMIT 10;'
    );
    console.log('\n📍 Table: areas');
    console.table(areas);

    // 4. Listings Table
    const [listings] = await connection.query(
      'SELECT id, title, property_type, gender_preference, room_sharing, monthly_price, rating FROM listings LIMIT 10;'
    );
    console.log('\n🏠 Table: listings');
    console.table(listings);

    // 5. Enquiries Table
    const [enquiries] = await connection.query(
      'SELECT id, listing_id, name, email, phone, status, created_at FROM enquiries LIMIT 10;'
    );
    console.log('\n📩 Table: enquiries');
    console.table(enquiries);

    // 6. Favorites Table
    const [favorites] = await connection.query(
      'SELECT id, user_id, listing_id, created_at FROM favorites LIMIT 10;'
    );
    console.log('\n❤️ Table: favorites');
    console.table(favorites);

    console.log('\n==============================================');
    console.log('✨ All tables retrieved successfully from database!');
    console.log('==============================================\n');
  } catch (error) {
    console.error('❌ Error viewing database:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

viewDatabase();
