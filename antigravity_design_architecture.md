# Mumbai PG / Hostel Finder — Design & Architecture Specification

> **Purpose:** Use this document as the implementation brief for Antigravity IDE. Build a polished, responsive website that helps students discover PGs and hostels around Mumbai and nearby areas.
>
> **Working name:** StayFinder Mumbai  
> **Primary audience:** College students, interns, and young professionals looking for accommodation.  
> **Core stack:** React + JavaScript + CSS on the frontend; Node.js + Express REST API on the backend; MySQL database.

---

## 1. Instructions for Antigravity

Build the website from this specification. First inspect the existing repository and preserve working code where possible. If the repository is empty, scaffold the project. Do not stop after creating a static mockup: implement functional navigation, reusable components, realistic sample listing data, working search/filter interactions, loading/empty/error states, and a clear API integration layer.

Work in small, verifiable milestones:
1. Inspect repository and summarize the existing setup.
2. Create the visual system and shared layout.
3. Implement public pages and responsive listing cards using local mock data.
4. Implement search, filters, sorting, favorites, and listing details.
5. Add Express API and MySQL integration using environment variables.
6. Add authentication and role-aware dashboard flows.
7. Run the available lint/build/tests, fix errors, and document setup.

If MySQL or API credentials are unavailable, the frontend must still run with clearly separated mock data. Never hard-code secrets. Do not claim a feature is connected to a real backend unless it is actually implemented and tested.

## 2. Product Vision

Create a trustworthy, modern accommodation-discovery experience. It should feel like a carefully designed Indian rental platform—not a generic admin template. Make the main task obvious: enter an area and budget, browse suitable properties, inspect details, and contact the owner.

### Main goals
- Find PGs and hostels by locality.
- Filter by monthly budget, accommodation type, gender preference, room sharing, and amenities.
- Compare properties using clear prices and practical details.
- Save favorites after signing in (or locally in demo mode).
- Send an owner enquiry through a form.
- Let owners manage their own listings after authentication.

### Trust and usability principles
- Display prices in Indian rupees (₹) per bed/month or room/month as appropriate.
- Clearly label sample/demo listings. Never present fake reviews, verification badges, or availability as verified facts.
- Include useful empty states, inline validation, success/error messages, and loading skeletons.
- Avoid dark patterns, fake countdowns, fabricated urgency, and intrusive popups.
- Keep keyboard navigation, visible focus states, readable contrast, and accessible labels.

## 3. Visual Design Direction

### Overall style
- Premium, warm, editorial, student-friendly.
- Spacious layouts, strong typography, subtle borders, soft shadows, rounded cards.
- Use a warm off-white canvas with deep navy/charcoal text and one confident teal/emerald accent. Use orange only for small highlights if needed.
- Avoid excessive gradients, glassmorphism, neon effects, over-animation, and oversized decorative blobs.
- Use restrained motion: 150–250 ms transitions, small hover elevation, and reduced-motion support.

### Suggested design tokens
```css
:root {
  --color-bg: #F8F8F5;
  --color-surface: #FFFFFF;
  --color-text: #17211F;
  --color-muted: #68736F;
  --color-border: #E4E8E5;
  --color-primary: #087F6E;
  --color-primary-hover: #06695C;
  --color-primary-soft: #E7F5F1;
  --color-highlight: #F4B860;
  --color-danger: #C2413A;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --shadow-card: 0 8px 28px rgba(23, 33, 31, 0.07);
  --content-width: 1200px;
}
```

### Typography
- Use **Inter**, **DM Sans**, or a similar highly legible sans-serif.
- Use a clear hierarchy: large bold page heading, medium section headings, concise body copy, and small muted metadata.
- Keep body text around 15–17 px on desktop and comfortably readable on mobile.
- Use consistent spacing based on an 8 px scale.

### Imagery
- Use consistent, high-quality accommodation photos with a 4:3 or 3:2 crop.
- Use a local fallback/placeholder if images fail to load.
- Do not let missing images break the layout.
- Do not use random unrelated stock imagery for property cards.

## 4. Information Architecture & Routes

Implement these routes using React Router:

| Route | Page | Access |
|---|---|---|
| `/` | Home / Landing page | Public |
| `/listings` | Search results and filters | Public |
| `/listings/:id` | Property details | Public |
| `/login` | Sign in | Public |
| `/register` | Create account | Public |
| `/favorites` | Saved properties | Signed-in user; demo fallback permitted |
| `/dashboard` | Student dashboard | Signed-in student |
| `/owner/dashboard` | Owner dashboard | Signed-in owner |
| `/owner/listings/new` | Create listing | Signed-in owner |
| `/owner/listings/:id/edit` | Edit own listing | Signed-in owner |
| `*` | Not found | Public |

The header should contain the logo, Explore PGs, popular areas, a “List your property” action, and sign-in/account controls. On mobile, collapse navigation into an accessible menu.

## 5. Page-by-Page Design

### A. Home page `/`
1. **Header**
   - Brand mark: simple location pin/roof icon and “StayFinder”.
   - Links: Explore stays, Areas, How it works.
   - Secondary action: Sign in.
   - Primary action: List your property.
2. **Hero**
   - Eyebrow: “A better place to start your next chapter”
   - Main headline: “Find a place that feels like yours.”
   - Short supporting text about finding PGs and hostels near colleges and workplaces in Mumbai.
   - Prominent search panel with:
     - Locality input with suggestions (Thane, Powai, Andheri, Ghatkopar, Vashi, Dadar, Navi Mumbai).
     - Monthly budget selector.
     - Accommodation type selector (PG, hostel, shared flat).
     - Search button.
   - Keep the search panel functional: submit should navigate to `/listings` with query parameters.
3. **Popular areas**
   - Compact locality cards with area name and short neutral descriptor.
   - Clicking an area starts a search for that area.
4. **Why StayFinder**
   - Three concise benefits: search by budget, compare essentials, contact owners directly.
5. **Featured stays**
   - Four to six property cards with image, title, locality, price, room type, amenities, and favorite button.
   - Mark mock entries as demo/sample in the app where appropriate.
6. **How it works**
   - Search → Compare → Contact.
7. **Footer**
   - About, Explore stays, List a property, Privacy, Terms, contact placeholder.
   - Do not invent a real office address or support phone number.

### B. Listings page `/listings`
Use a desktop two-column layout:
- Left: filter panel (sticky only when it does not obstruct smaller screens).
- Right: results count, applied filter chips, sort dropdown, responsive property grid.
- Mobile: filters open in a drawer or expandable panel; provide an obvious Apply/Close control.

Filters:
- Locality / area
- Minimum and maximum monthly budget
- Property type: PG / hostel / shared flat
- Room sharing: private / twin / triple / four-sharing
- Suitable for: women / men / all
- Amenities: Wi-Fi, meals, laundry, AC, housekeeping, security, attached bathroom
- Sort: recommended, price low-to-high, price high-to-low, newest

Functional expectations:
- Filters combine correctly instead of overwriting one another.
- Reset clears all filters.
- Search state is reflected in URL query parameters so links can be shared and refreshed.
- Show active filter chips with individual remove controls.
- Include loading skeletons, no-results state with “Clear filters”, and error/retry state.
- Debounce free-text locality search where appropriate.
- Keep filter controls accessible and labelled.

### C. Property details `/listings/:id`
- Image gallery with sensible fallback and accessible image labels.
- Title, locality, approximate address (do not expose private exact address in public demo data), property type, gender preference, room options, monthly price, deposit if known, and available amenities.
- Description and house rules.
- “Contact owner” card with name/role only when available.
- Enquiry form: name, email/phone as appropriate, message, move-in date optional, consent checkbox.
- Favorite toggle.
- Similar properties section.
- Clear feedback after enquiry submission. If API is not configured, use a demo submission message and do not imply an email or SMS was actually sent.

### D. Login and register
- Clean, centered form layout with name/email/password and role selection at registration (student or owner).
- Validate required fields and show useful messages.
- Password input should include show/hide control.
- Never store plaintext passwords.
- Use server-side password hashing and secure session/token handling in production.
- Do not place secrets or private user details in local storage.
- If implementing demo mode, label it clearly and keep it separate from production authentication.

### E. Favorites `/favorites`
- Show saved property cards and remove controls.
- Persist to backend for authenticated users.
- In demo mode, local persistence is acceptable, with a clear note that favorites are stored on this device.
- Include a useful empty state linking back to Explore stays.

### F. Student dashboard `/dashboard`
- Welcome panel, saved properties, recent enquiries, profile summary.
- Only show data belonging to the signed-in user.
- If the backend does not support a section yet, display a well-labelled empty/demo state rather than invented activity.

### G. Owner dashboard `/owner/dashboard`
- Summary cards for total listings and enquiries.
- Table/list of the owner’s properties with edit and deactivate actions.
- Create listing CTA.
- Owner can only edit/delete listings they own; enforce this on the backend, not just in React.

### H. Create/edit listing
Fields:
- Title, description, locality, property type, gender preference, room-sharing options, monthly price, deposit, amenities, house rules, image URLs.
- Validate price as a positive number and required fields.
- Show preview before saving.
- Owner authorization must be checked on the server.

### I. Not found
- Friendly message, link to home, and link to browse listings.

## 6. Reusable React Component Tree

```text
App
├── AppRouter
├── Layout
│   ├── SiteHeader
│   ├── MobileNavigation
│   ├── MainContent
│   └── SiteFooter
├── Pages
│   ├── HomePage
│   │   ├── HeroSearch
│   │   ├── PopularAreas
│   │   ├── FeaturedListings
│   │   ├── BenefitSection
│   │   └── HowItWorks
│   ├── ListingsPage
│   │   ├── ListingFilters
│   │   ├── AppliedFilterChips
│   │   ├── ListingSort
│   │   └── ListingGrid
│   ├── ListingDetailsPage
│   │   ├── ImageGallery
│   │   ├── ListingFacts
│   │   ├── AmenitiesList
│   │   ├── OwnerContactCard
│   │   └── EnquiryForm
│   ├── LoginPage
│   ├── RegisterPage
│   ├── FavoritesPage
│   ├── StudentDashboardPage
│   ├── OwnerDashboardPage
│   └── ListingFormPage
└── SharedComponents
    ├── ListingCard
    ├── PriceLabel
    ├── AmenityBadge
    ├── FavoriteButton
    ├── SearchInput
    ├── SelectField
    ├── EmptyState
    ├── ErrorState
    ├── LoadingSkeleton
    ├── Modal / Drawer
    └── Toast / InlineAlert
```

## 7. Technical Architecture

### Frontend
- React with Vite and JavaScript.
- React Router for navigation.
- Plain CSS or CSS Modules; use the design tokens above.
- Use Context API for lightweight auth/favorites state if needed; do not add Redux unless complexity justifies it.
- Keep API calls in a dedicated `services/` layer.
- Keep page components, reusable UI, hooks, and utilities separate.
- Use URL search parameters as the source of truth for shareable search filters.
- Provide a single configurable API base URL via environment variable.

### Backend
- Node.js + Express.js REST API.
- Use `mysql2/promise` or another maintained MySQL client.
- Use parameterized SQL for every query.
- Validate request bodies and query parameters server-side.
- Centralized error middleware; return consistent JSON error shapes.
- Add request logging and basic rate limiting for authentication/enquiry endpoints.
- Use CORS with explicitly configured allowed origins.
- Use environment variables for database credentials, session/token secrets, and frontend origin.
- Do not return password hashes in API responses.
- Implement role and ownership checks on protected routes.

### Database
Use MySQL with foreign keys, indexes, timestamps, and constraints. Suggested schema:

#### `users`
- `id` BIGINT primary key, auto increment
- `name` VARCHAR(100), required
- `email` VARCHAR(255), required, unique
- `password_hash` VARCHAR(255), required
- `role` ENUM('student','owner'), default 'student'
- `created_at`, `updated_at`

#### `areas`
- `id` BIGINT primary key, auto increment
- `name` VARCHAR(100), required
- `city` VARCHAR(100), default 'Mumbai'
- `pincode` VARCHAR(10), nullable
- unique/index on area and city

#### `listings`
- `id` BIGINT primary key, auto increment
- `owner_id` BIGINT foreign key → users.id
- `area_id` BIGINT foreign key → areas.id
- `title` VARCHAR(180), required
- `description` TEXT
- `property_type` ENUM('pg','hostel','shared_flat')
- `gender_preference` ENUM('women','men','all')
- `monthly_price` DECIMAL(10,2), required and > 0
- `deposit` DECIMAL(10,2), nullable
- `address_public` VARCHAR(255), nullable; keep exact private address out of public demo responses
- `room_sharing` ENUM('private','twin','triple','four_sharing')
- `amenities` JSON, or a normalized listing_amenities table if stronger relational querying is required
- `house_rules` TEXT
- `image_urls` JSON, or a separate `listing_images` table
- `status` ENUM('draft','published','inactive'), default 'draft'
- `created_at`, `updated_at`

#### `favorites`
- `id` BIGINT primary key, auto increment
- `user_id` BIGINT foreign key → users.id
- `listing_id` BIGINT foreign key → listings.id
- `created_at`
- unique constraint on (`user_id`, `listing_id`)

#### `enquiries`
- `id` BIGINT primary key, auto increment
- `listing_id` BIGINT foreign key → listings.id
- `student_id` BIGINT foreign key → users.id, nullable if guest enquiries are supported
- `name` VARCHAR(100), required
- `email` VARCHAR(255), required
- `phone` VARCHAR(30), nullable
- `message` TEXT, required
- `move_in_date` DATE, nullable
- `status` ENUM('new','contacted','closed'), default 'new'
- `created_at`

### Relationships
- One user with role `owner` can own many listings.
- One area can contain many listings.
- Students can favorite many listings; each listing can be favorited by many students.
- One listing can have many enquiries.
- Use foreign keys and suitable delete behavior to preserve referential integrity.

## 8. REST API Contract

Use `/api/v1` as the API prefix.

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| GET | `/api/v1/health` | Health check | Public |
| GET | `/api/v1/areas` | List searchable areas | Public |
| GET | `/api/v1/listings` | Search/filter/sort/paginate published listings | Public |
| GET | `/api/v1/listings/:id` | Listing details | Public |
| POST | `/api/v1/auth/register` | Register student or owner | Public |
| POST | `/api/v1/auth/login` | Sign in | Public |
| POST | `/api/v1/auth/logout` | Sign out when session-based auth is used | Auth |
| GET | `/api/v1/auth/me` | Current user profile | Auth |
| GET | `/api/v1/favorites` | Get current user's favorites | Student |
| POST | `/api/v1/favorites/:listingId` | Add favorite | Student |
| DELETE | `/api/v1/favorites/:listingId` | Remove favorite | Student |
| POST | `/api/v1/listings/:id/enquiries` | Submit an enquiry | Public or Auth, according to policy |
| GET | `/api/v1/student/enquiries` | Current student's enquiries | Student |
| GET | `/api/v1/owner/listings` | Get current owner's listings | Owner |
| POST | `/api/v1/owner/listings` | Create listing | Owner |
| PATCH | `/api/v1/owner/listings/:id` | Update own listing | Owner |
| DELETE | `/api/v1/owner/listings/:id` | Deactivate/delete own listing | Owner |
| GET | `/api/v1/owner/enquiries` | Enquiries for owner's listings | Owner |

### Search query parameters
`GET /api/v1/listings?q=thane&area=Thane&minPrice=5000&maxPrice=15000&type=pg&sharing=twin&gender=all&amenities=wifi,meals&sort=price_asc&page=1&limit=12`

- Validate and cap pagination (`limit` maximum 50).
- Whitelist allowed sort values; never insert arbitrary client-provided SQL fragments.
- Use parameterized SQL for user-supplied values.
- Return `{ data, pagination }`, with total count and current page.
- For invalid filters, return a 400 response with a helpful message.

## 9. Suggested Folder Structure

```text
stayfinder-mumbai/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx
│   │   │   └── router.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── listings/
│   │   │   ├── search/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── listingsService.js
│   │   │   ├── authService.js
│   │   │   └── favoritesService.js
│   │   ├── data/
│   │   │   └── demoListings.js
│   │   ├── styles/
│   │   │   ├── tokens.css
│   │   │   └── global.css
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validate.js
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── app.js
│   ├── sql/
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── tests/
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── architecture.md
│   ├── api.md
│   └── database.md
├── .gitignore
├── README.md
└── package.json
```

## 10. Example Listing Data

Use believable **demo data**, clearly identified as sample data in the development environment. Never claim these are real available rooms.

```js
export const demoListings = [
  {
    id: "demo-1",
    title: "Bright shared stay near the station",
    area: "Thane",
    city: "Mumbai Metropolitan Region",
    propertyType: "pg",
    genderPreference: "all",
    roomSharing: "twin",
    monthlyPrice: 8500,
    deposit: 15000,
    amenities: ["Wi-Fi", "Laundry", "Housekeeping"],
    imageUrl: "/images/demo-room-1.jpg",
    isDemo: true
  },
  {
    id: "demo-2",
    title: "Student hostel with study lounge",
    area: "Powai",
    city: "Mumbai",
    propertyType: "hostel",
    genderPreference: "women",
    roomSharing: "triple",
    monthlyPrice: 11000,
    deposit: 20000,
    amenities: ["Wi-Fi", "Meals", "Security"],
    imageUrl: "/images/demo-room-2.jpg",
    isDemo: true
  }
];
```

## 11. Functional Requirements & Acceptance Criteria

The project is ready for review when:

- All routes load directly and internal navigation works.
- Layout is responsive at 360 px, 768 px, 1024 px, and 1440 px widths.
- Home search submits area, budget, and type to the listings page.
- Multiple filters work together, update the URL, and can be reset.
- Sorting produces the correct order.
- Listing cards open the correct details page.
- Favorites can be added and removed; demo persistence is labelled.
- Enquiry form validates fields and shows success/error states.
- API failures do not crash the UI.
- Backend uses parameterized SQL and does not leak password hashes.
- Owners cannot edit another owner's listings.
- Secrets are stored in `.env`, and `.env` is excluded from Git.
- README explains setup, environment variables, migrations/seeding, and run commands.
- Build/lint/test commands are run and any remaining issues are documented.

## 12. Implementation Rules

1. Build real interactions, not decorative controls.
2. Reuse components instead of duplicating page markup.
3. Keep business logic out of large UI components.
4. Keep API access in service modules.
5. Use semantic HTML and accessible form labels.
6. Handle loading, empty, error, and success states.
7. Never hard-code credentials or expose password hashes.
8. Never trust client-side role checks; enforce authorization in the API.
9. Do not fabricate real properties, reviews, owners, contact details, or verified availability.
10. If a requirement cannot be fully implemented, document the limitation and leave a clear integration point.

## 13. Final Deliverables

Create or update these files in the repository:
- `README.md` — setup, features, scripts, and environment configuration.
- `docs/architecture.md` — architecture, data flow, and component boundaries.
- `docs/api.md` — API route contract and example requests/responses.
- `docs/database.md` — schema, relationships, indexes, and seed instructions.
- `server/sql/schema.sql` and `server/sql/seed.sql`.
- `.env.example` with placeholder values only.
- Functional React frontend and Express backend.
- A concise `IMPLEMENTATION_STATUS.md` noting completed features, tested commands, and anything still requiring configuration.

At the end, summarize what was implemented, list exact commands to run it, identify any missing environment setup, and report build/test results honestly.
