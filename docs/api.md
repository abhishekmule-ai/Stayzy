# Stayzy REST API Specification

**Base URL:** `/api/v1`

---

## 1. System Health
### `GET /api/v1/health`
Checks server status and uptime.
- **Auth:** Public
- **Response 200 OK:**
```json
{
  "status": "ok",
  "service": "Stayzy Mumbai REST API",
  "version": "1.0.0",
  "timestamp": "2026-10-21T14:00:00.000Z"
}
```

---

## 2. Searchable Localities
### `GET /api/v1/areas`
Lists supported Mumbai areas and student hubs.
- **Auth:** Public
- **Response 200 OK:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Powai", "city": "Mumbai", "pincode": "400076", "tagline": "Tech Hub & IIT Bombay" },
    { "id": 2, "name": "Andheri", "city": "Mumbai", "pincode": "400058", "tagline": "Metro Junction & Nightlife" }
  ]
}
```

---

## 3. Accommodation Listings
### `GET /api/v1/listings`
Search, filter, sort, and paginate active listings.
- **Auth:** Public
- **Query Parameters:**
  - `q`: Free-text search string (e.g. `powai`, `iit`)
  - `area`: Locality name (e.g. `Thane`, `Powai`)
  - `type`: `pg`, `hostel`, `shared_flat`
  - `sharing`: `private`, `twin`, `triple`, `four_sharing`
  - `gender`: `women`, `men`, `all`
  - `minPrice`: Minimum monthly price (₹)
  - `maxPrice`: Maximum monthly price (₹)
  - `amenities`: Comma-separated list (e.g. `wifi,meals,ac`)
  - `sort`: `recommended`, `price_asc`, `price_desc`, `newest`
  - `page`: Page number (default: 1)
  - `limit`: Number of items per page (default: 12, max: 50)
- **Response 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Sunlit Twin-Sharing PG with Home Cooked Meals",
      "area": "Powai",
      "city": "Mumbai",
      "propertyType": "pg",
      "genderPreference": "all",
      "roomSharing": "twin",
      "monthlyPrice": 12500,
      "deposit": 20000,
      "amenities": ["Wi-Fi", "Meals", "AC", "Laundry", "Housekeeping", "Attached Bathroom"],
      "imageUrl": "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "featured": true,
      "rating": 4.8
    }
  ],
  "pagination": { "page": 1, "limit": 12, "total": 8 }
}
```

### `GET /api/v1/listings/:id`
Retrieves comprehensive property facts, gallery images, and house guidelines.
- **Auth:** Public
- **Response 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Sunlit Twin-Sharing PG with Home Cooked Meals",
    "area": "Powai",
    "description": "A well-kept, bright premium PG located in a peaceful residential pocket of Powai...",
    "propertyType": "pg",
    "genderPreference": "all",
    "roomSharing": "twin",
    "monthlyPrice": 12500,
    "deposit": 20000,
    "addressPublic": "Near Central Avenue, Hiranandani Gardens, Powai",
    "transitInfo": "5 mins to IIT Bombay Main Gate",
    "amenities": ["Wi-Fi", "Meals", "AC", "Laundry", "Housekeeping"],
    "houseRules": "Common entry gates open 6:00 AM – 11:30 PM.",
    "owner": { "name": "Suresh Kulkarni", "role": "Property Owner" }
  }
}
```

---

## 4. Authentication Endpoints
### `POST /api/v1/auth/register`
- **Body:**
```json
{
  "name": "Aarav Sharma",
  "email": "student@stayzy.in",
  "password": "password123",
  "role": "student",
  "phone": "+91 98765 43210"
}
```
- **Response 201 Created:**
```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": { "id": 1, "name": "Aarav Sharma", "email": "student@stayzy.in", "role": "student" },
  "message": "Account created successfully."
}
```

### `POST /api/v1/auth/login`
- **Body:**
```json
{
  "email": "student@stayzy.in",
  "password": "password123"
}
```
- **Response 200 OK:** Returns signed JWT and sanitized user profile without password hash.

---

## 5. Favorites
- `GET /api/v1/favorites` (Bearer Auth) -> Lists student's shortlisted properties
- `POST /api/v1/favorites/:listingId` (Bearer Auth) -> Adds property to favorites
- `DELETE /api/v1/favorites/:listingId` (Bearer Auth) -> Removes property from favorites

---

## 6. Enquiries & Dashboards
- `POST /api/v1/listings/:id/enquiries` -> Submits an enquiry form
- `GET /api/v1/student/enquiries` (Bearer Auth) -> Returns user's submitted enquiries
- `GET /api/v1/owner/listings` (Owner Auth) -> Returns listings owned by authenticated owner
- `POST /api/v1/owner/listings` (Owner Auth) -> Publishes a new property
- `PATCH /api/v1/owner/listings/:id` (Owner Auth) -> Updates an existing property
- `DELETE /api/v1/owner/listings/:id` (Owner Auth) -> Removes an owner's property
- `GET /api/v1/owner/enquiries` (Owner Auth) -> Inquiries received for owner's properties
