# Stayzy Database Documentation

## 1. Engine & Collation
- **RDBMS:** MySQL 8.0+
- **Character Set:** `utf8mb4`
- **Collation:** `utf8mb4_unicode_ci`

---

## 2. Entity-Relationship Schema

```
+--------------------+            +------------------------+
|       users        | 1        * |        listings        |
+--------------------+------------+------------------------+
| id (PK)            |            | id (PK)                |
| name               |            | owner_id (FK -> users) |
| email (UQ)         |            | area_id (FK -> areas)  |
| password_hash      |            | title                  |
| role               |            | property_type          |
| phone              |            | gender_preference      |
| created_at         |            | room_sharing           |
+--------------------+            | monthly_price          |
          | 1                     | deposit                |
          |                       | address_public         |
          | *                     | transit_info           |
+--------------------+            | amenities (JSON)       |
|     favorites      |            | house_rules            |
+--------------------+            | image_urls (JSON)      |
| id (PK)            |            | status                 |
| user_id (FK)       |            +------------------------+
| listing_id (FK)    |                        | 1
+--------------------+                        |
                                              | *
+--------------------+            +------------------------+
|       areas        | 1        * |       enquiries        |
+--------------------+------------+------------------------+
| id (PK)            |            | id (PK)                |
| name               |            | listing_id (FK)        |
| city               |            | student_id (FK, null)  |
| pincode            |            | name                   |
| tagline            |            | email                  |
+--------------------+            | message                |
                                  | move_in_date           |
                                  | status                 |
                                  +------------------------+
```

---

## 3. Indexes & Constraints
1. **`users`:**
   - Unique index on `email`.
   - Index on `role` for rapid query authorization.
2. **`areas`:**
   - Composite unique index on `(name, city)`.
3. **`listings`:**
   - Composite foreign keys on `owner_id` (cascading delete) and `area_id` (restrict delete).
   - B-tree indexes on `monthly_price`, `property_type`, `gender_preference`, `room_sharing`, and `status`.
4. **`favorites`:**
   - Unique composite index on `(user_id, listing_id)`.
5. **`enquiries`:**
   - Index on `status` and `listing_id`.

---

## 4. Migration & Seeding Instructions

### Step 1: Create Database and Tables
Run using MySQL CLI or Workbench:
```bash
mysql -u root -p < server/sql/schema.sql
```

### Step 2: Populate Initial Stays and Users
```bash
mysql -u root -p < server/sql/seed.sql
```

### Step 3: Configure Environment
Copy `.env.example` to `server/.env` and update credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=stayzy_db
```
