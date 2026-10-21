# Stayzy — Mumbai PG & Hostel Finder
> **Find your vibe. Find your stay.**  
> A dedicated, modern platform designed for college students, interns, and young professionals discovering verified accommodation across Mumbai and nearby metropolitan regions.

![Stayzy Logo](client/public/logo.png)

---

## 🌟 Key Features

1. **Locality Discovery:** Real-time filtering across major student and transit hubs: **Powai (near IIT Bombay)**, **Andheri**, **Thane**, **Ghatkopar (Somaiya Vidyavihar)**, **Vashi**, and **Dadar**.
2. **Precision Search & Filters:**
   - Filter by monthly budget with instant preset chips (Under ₹8k, ₹8k–₹13k, ₹13k+).
   - Filter by accommodation type: PG (Paying Guest), Student Hostel, Furnished Shared Flat.
   - Filter by room sharing: Private Single Room, Twin Sharing, Triple Sharing, Quad Sharing.
   - Filter by gender preferences: Girls Only, Boys Only, Co-ed / All.
   - Filter by student amenities: Wi-Fi, Meals, Air Conditioning, Laundry, Housekeeping, Security, Attached Bathroom, Power Backup.
   - Sort by Recommended, Price (Low to High), Price (High to Low), and Newest.
   - Shareable URLs: All filter and sort states update URL query parameters automatically.
3. **Transparent Pricing:** All rents displayed in Indian Rupees (₹) with clear bed/month or room/month notations and security deposit disclosures. Zero brokerage fees.
4. **Saved Properties:** Toggle favorites from cards or detail views; persist to student accounts or local demo storage.
5. **Direct Host Enquiries:** Send inquiries with preferred move-in dates and messages. View and manage sent inquiries from the Student Dashboard.
6. **Role-Aware Dashboards:**
   - **Student Dashboard (`/dashboard`):** Profile overview, active inquiries status, and saved stays.
   - **Owner Dashboard (`/owner/dashboard`):** Property analytics, listing management table, publish new stay (`/owner/listings/new`), edit listings, and manage incoming student messages.
7. **Dual-Tier Service Layer & Offline Fallback:**
   - Connects to an Express REST API with parameterized MySQL queries.
   - Seamlessly falls back to an intelligent in-memory repository and local demo data if MySQL or API credentials are not configured, ensuring immediate out-of-the-box evaluation.

---

## 📁 Repository Structure

```text
├── client/                     # React 18 + Vite frontend
│   ├── public/                 # Static assets, favicon, logo.png
│   ├── src/
│   │   ├── app/                # App.jsx, router.jsx
│   │   ├── components/
│   │   │   ├── layout/         # SiteHeader, SiteFooter, Layout
│   │   │   ├── listings/       # ListingCard, ListingGrid, ListingFilters, ListingSort, AppliedFilterChips
│   │   │   ├── search/         # HeroSearch
│   │   │   └── ui/             # PriceLabel, AmenityBadge, FavoriteButton, LoadingSkeleton, EmptyState, Toast
│   │   ├── context/            # AuthContext, FavoritesContext
│   │   ├── data/               # Believable demo listings and Mumbai localities
│   │   ├── pages/              # Home, Listings, Details, Login, Register, Favorites, Dashboards, Form, 404
│   │   ├── services/           # api.js, listingsService.js, authService.js, favoritesService.js, enquiriesService.js
│   │   └── styles/             # tokens.css, global.css
│   └── package.json
├── server/                     # Node.js + Express REST API
│   ├── src/
│   │   ├── config/             # database.js (MySQL pool + offline fallback)
│   │   ├── controllers/        # auth, listings, areas, favorites, enquiries
│   │   ├── middleware/         # auth (JWT), errorHandler
│   │   ├── repositories/       # stayzyRepo.js (Parameterized SQL + memory store)
│   │   ├── routes/             # api.js (/api/v1 endpoints)
│   │   └── app.js
│   ├── sql/
│   │   ├── schema.sql          # MySQL database schema DDL
│   │   └── seed.sql            # Seed dataset with Mumbai areas and demo stays
│   ├── tests/                  # Integration test suite (node:test)
│   ├── .env.example
│   └── package.json
├── docs/                       # Complete architectural and API documentation
│   ├── architecture.md
│   ├── api.md
│   └── database.md
├── scripts/                    # start-all.js concurrent runner
├── IMPLEMENTATION_STATUS.md    # Feature verification & testing report
├── .env.example
├── README.md
└── package.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher, tested on v24.21.0)
- **npm** (v9.0.0 or higher)

### 2. Install Dependencies
Run in the project root:
```bash
# In client/
cd client && npm install

# In server/
cd ../server && npm install
```

### 3. Run the Development Servers
From the root workspace directory, you can run:

#### Start Frontend Only (Demo & Mock Mode):
```bash
npm run client
# Opens at: http://localhost:5173
```

#### Start Backend Only:
```bash
npm run server
# REST API starts at: http://localhost:5000/api/v1
```

#### Start Both Concurrently:
```bash
npm run dev:all
```

---

## 🧪 Running Tests & Production Builds

### 1. Run Backend Integration Tests
```bash
npm run test
# or: cd server && npm test
```
*Executes all 6 integration test suites testing health, areas, listings, details, auth, and role security.*

### 2. Run Frontend Production Build
```bash
npm run build
# or: cd client && npm run build
```
*Compiles Vite bundle with gzip optimization and strict syntax checks.*

---

## 🔑 Demo Access Personas

Quick persona switchers are built into the UI navigation, or you can sign in directly on `/login`:

| Persona | Email | Password | Role |
|---|---|---|---|
| **Demo Student** | `student@stayzy.in` | `password123` | Student / Tenant |
| **Demo Property Owner** | `owner@stayzy.in` | `password123` | Property Owner / Manager |

---

## 🗄️ Optional MySQL Database Setup

If you wish to connect to a live MySQL instance:
1. Create the database and tables:
   ```bash
   mysql -u root -p < server/sql/schema.sql
   mysql -u root -p < server/sql/seed.sql
   ```
2. Copy `server/.env.example` to `server/.env` and update credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=stayzy_db
   ```
*(Note: If MySQL is not running, Stayzy automatically uses its in-memory fallback, so no database is required to test the entire application).*
