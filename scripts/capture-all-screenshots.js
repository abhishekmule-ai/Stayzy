import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const frontendDir = path.join(rootDir, 'screenshots', 'frontend');
const backendDir = path.join(rootDir, 'screenshots', 'backend');

fs.mkdirSync(frontendDir, { recursive: true });
fs.mkdirSync(backendDir, { recursive: true });

async function run() {
  console.log('🚀 Starting Screenshot Capture Engine for Stayzy...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('📸 1. Capturing Frontend: Home Page Hero...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(frontendDir, '01_home_hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

  console.log('📸 2. Capturing Frontend: Home Page Full Scroll...');
  await page.screenshot({ path: path.join(frontendDir, '02_home_full_page.png'), fullPage: true });

  console.log('📸 3. Capturing Frontend: Listings Discovery Page...');
  await page.goto('http://localhost:5173/listings', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '03_listings_catalog.png') });

  console.log('📸 4. Capturing Frontend: Filtered Listings (Powai / Wi-Fi & AC)...');
  await page.goto('http://localhost:5173/listings?area=Powai&minPrice=8000&maxPrice=15000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '04_listings_filtered.png') });

  console.log('📸 5. Capturing Frontend: Property Details Page (Sunlit Twin-Sharing PG)...');
  await page.goto('http://localhost:5173/listings/demo-1', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(frontendDir, '05_listing_detail_overview.png') });

  console.log('📸 6. Capturing Frontend: Property Details Full Page (Amenities & Enquiry Form)...');
  await page.screenshot({ path: path.join(frontendDir, '06_listing_detail_full.png'), fullPage: true });

  console.log('📸 7. Capturing Frontend: Login Page...');
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(frontendDir, '07_login_page.png') });

  console.log('📸 8. Capturing Frontend: Student Dashboard (Logged In)...');
  await page.evaluate(() => {
    const studentUser = {
      id: 'usr-student-1',
      name: 'Aarav Sharma',
      email: 'student@stayzy.in',
      role: 'student',
      phone: '+91 98765 43210',
      college: 'IIT Bombay / NMIMS',
      createdAt: '2026-01-15T10:00:00Z',
    };
    localStorage.setItem('stayzy_auth_token', 'mock_jwt_student_token_123');
    localStorage.setItem('stayzy_user_info', JSON.stringify(studentUser));
  });
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '08_student_dashboard.png'), fullPage: true });

  console.log('📸 9. Capturing Frontend: Saved Favorites Page...');
  await page.goto('http://localhost:5173/favorites', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '09_student_favorites.png') });

  console.log('📸 10. Capturing Frontend: Owner Dashboard (Logged In)...');
  await page.evaluate(() => {
    const ownerUser = {
      id: 'usr-owner-1',
      name: 'Suresh Kulkarni',
      email: 'owner@stayzy.in',
      role: 'owner',
      phone: '+91 98201 55432',
      company: 'Kulkarni Hospitality Stays',
      createdAt: '2026-01-10T10:00:00Z',
    };
    localStorage.setItem('stayzy_auth_token', 'mock_jwt_owner_token_456');
    localStorage.setItem('stayzy_user_info', JSON.stringify(ownerUser));
  });
  await page.goto('http://localhost:5173/owner/dashboard', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '10_owner_dashboard.png'), fullPage: true });

  console.log('📸 11. Capturing Frontend: Owner Add New Listing Form...');
  await page.goto('http://localhost:5173/owner/listings/new', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(frontendDir, '11_owner_new_listing_form.png'), fullPage: true });

  await browser.close();
  console.log('✅ All Frontend screenshots successfully captured!');
}

run().catch(err => {
  console.error('❌ Error capturing screenshots:', err);
  process.exit(1);
});
