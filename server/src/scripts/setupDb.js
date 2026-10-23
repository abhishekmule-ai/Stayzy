import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  console.log('🚀 Starting Stayzy Database Migration & Seeding...\n');

  let dbConfig;
  const isSsl =
    process.env.DB_SSL === 'true' ||
    process.env.DB_PORT === '4000' ||
    (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('ssl'));

  if (process.env.DATABASE_URL) {
    dbConfig = {
      uri: process.env.DATABASE_URL,
      multipleStatements: true,
    };
    if (isSsl) {
      dbConfig.ssl = { rejectUnauthorized: false };
    }
  } else {
    dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'test',
      multipleStatements: true,
    };
    if (isSsl) {
      dbConfig.ssl = { rejectUnauthorized: false };
    }
  }

  const targetHost = process.env.DATABASE_URL ? 'URL connection' : `${dbConfig.host}:${dbConfig.port}`;
  const targetDb = dbConfig.database || '(from URL)';
  console.log(`📡 Connecting to MySQL at ${targetHost} (database: ${targetDb})...`);

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connection established successfully!\n');
  } catch (err) {
    console.error('❌ Failed to connect to MySQL database:', err.message);
    console.error('\nPlease check your .env settings (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_SSL or DATABASE_URL).');
    process.exit(1);
  }

  try {
    const schemaPath = path.resolve(__dirname, '../../sql/schema.sql');
    const seedPath = path.resolve(__dirname, '../../sql/seed.sql');

    const parseStatements = (filePath) => {
      const raw = fs.readFileSync(filePath, 'utf8');
      const lines = raw.split(/\r?\n/);
      
      const cleanedLines = lines.filter(line => {
        const trimmed = line.trim();
        // Remove comments
        if (trimmed.startsWith('--') || trimmed.startsWith('/*')) return false;
        // Remove database creation / use commands (handled by connection)
        if (trimmed.toUpperCase().startsWith('CREATE DATABASE') || trimmed.toUpperCase().startsWith('USE ')) return false;
        return true;
      });

      const fullContent = cleanedLines.join('\n');
      return fullContent
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    };

    console.log('📄 Applying schema.sql...');
    const schemaStatements = parseStatements(schemaPath);
    console.log(`Found ${schemaStatements.length} schema statements to execute.`);

    for (let i = 0; i < schemaStatements.length; i++) {
      const stmt = schemaStatements[i];
      const preview = stmt.split('\n')[0].substring(0, 60);
      console.log(`  [${i + 1}/${schemaStatements.length}] Executing: ${preview}...`);
      await connection.query(stmt);
    }
    console.log('✅ All schema tables created successfully!\n');

    console.log('🌱 Applying seed.sql...');
    const seedStatements = parseStatements(seedPath);
    console.log(`Found ${seedStatements.length} seed statements to execute.`);

    for (let i = 0; i < seedStatements.length; i++) {
      const stmt = seedStatements[i];
      const preview = stmt.split('\n')[0].substring(0, 60);
      console.log(`  [${i + 1}/${seedStatements.length}] Executing: ${preview}...`);
      await connection.query(stmt);
    }
    console.log('✅ Seed data inserted successfully!\n');

    // Verification count
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    const [areas] = await connection.query('SELECT COUNT(*) as count FROM areas');
    const [listings] = await connection.query('SELECT COUNT(*) as count FROM listings');

    console.log('📊 Verification Summary:');
    console.log(`   - Users:    ${users[0].count}`);
    console.log(`   - Areas:    ${areas[0].count}`);
    console.log(`   - Listings: ${listings[0].count}`);
    console.log('\n🎉 Your database is now LIVE and fully populated with real Mumbai stays & demo accounts!');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();
