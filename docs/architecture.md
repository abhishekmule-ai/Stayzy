# Stayzy Architecture Documentation

## 1. Overview & System Purpose
**Stayzy** ("Find your vibe. Find your stay.") is a full-stack student accommodation discovery platform specifically designed for Mumbai and its metropolitan regions (Powai, Andheri, Thane, Ghatkopar, Vashi, Dadar). It allows college scholars, interns, and young professionals to explore, filter, compare, save, and directly enquire about student PGs, hostels, and shared flats with 100% upfront pricing and zero brokerage.

---

## 2. High-Level Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              STAYZY CLIENT                              |
|                       (React 18 + Vite + Vanilla CSS)                   |
|                                                                         |
|  [Navbar / Brand]    [Hero Search]    [Listing Filters]   [Listing Grid]|
|          |                  |                 |                 |       |
|          +----------> [URL Query State (useSearchParams)] <-----+       |
|                                     |                                   |
|                +--------------------+-------------------+               |
|                |                                        |               |
|       [AuthContext (JWT)]                    [FavoritesContext]         |
|                |                                        |               |
|  +-------------v----------------------------------------v------------+  |
|  |                           Service Layer                           |  |
|  |     (listingsService, authService, favoritesService, api.js)       |  |
+--+----------------------------------+--------------------------------+--+
                                      |
                     REST HTTP / JSON | (Bearer Token Authorization)
                                      v
+-------------------------------------+-----------------------------------+
|                              STAYZY SERVER                              |
|                         (Node.js + Express.js)                          |
|                                                                         |
|  [CORS / JSON Parser] -> [Auth Middleware (JWT)] -> [Centralized Router]|
|                                                            |            |
|       +--------------------+-------------------------------+            |
|       |                    |                               |            |
|  [Auth Controller]   [Listings Controller]       [Enquiries Controller] |
|       |                    |                               |            |
|       +--------------------+-------------------------------+            |
|                                    |                                    |
|                      [Stayzy Dual Repository Layer]                     |
|                                    |                                    |
|                +-------------------+-------------------+                |
|                |                                       |                |
|       [MySQL2 Connection Pool]               [In-Memory Mock Fallback]  |
|       (Parameterized SQL Queries)            (Offline / Demo Execution) |
+----------------+--------------------------------------------------------+
                 |
                 v
+----------------+--------------------------------------------------------+
|                          DATABASE LAYER (MySQL 8.0)                     |
|   Tables: users | areas | listings | favorites | enquiries              |
+-------------------------------------------------------------------------+
```

---

## 3. Data Flow & State Management

1. **Search & Filter Synchronization:**
   - Filters on `/listings` are synchronized to the URL query string via `useSearchParams`.
   - Refreshing or sharing a link preserves the exact state (`q`, `area`, `type`, `sharing`, `gender`, `minPrice`, `maxPrice`, `amenities`, `sort`, `page`).

2. **Dual-Tier Service Layer:**
   - Frontend services automatically attempt to call the Express API at `/api/v1`.
   - If the API or database is unavailable, services seamlessly fall back to local demo storage (`DEMO_LISTINGS` & `localStorage`).

3. **Authentication Flow:**
   - Role-aware authentication supporting both `student` and `owner` personas.
   - Passwords securely hashed with `bcryptjs`.
   - User identity carried via JSON Web Tokens (`jwt.sign` with 7-day expiration).

4. **Security & Authorization Boundaries:**
   - Client-side routes guide users to role-specific views (`/dashboard` vs `/owner/dashboard`).
   - Server-side routes strictly enforce permissions (`requireAuth`, `requireRole('owner')`), guaranteeing owners cannot modify or delete listings they do not own.
