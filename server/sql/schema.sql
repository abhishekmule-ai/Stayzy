-- Stayzy Mumbai PG & Hostel Finder
-- MySQL Database Schema

CREATE DATABASE IF NOT EXISTS stayzy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE stayzy_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'owner') NOT NULL DEFAULT 'student',
  phone VARCHAR(30) NULL,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Areas Table
CREATE TABLE IF NOT EXISTS areas (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL DEFAULT 'Mumbai',
  pincode VARCHAR(10) NULL,
  tagline VARCHAR(255) NULL,
  image VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_area_city (name, city),
  INDEX idx_areas_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Listings Table
CREATE TABLE IF NOT EXISTS listings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  owner_id BIGINT UNSIGNED NOT NULL,
  area_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  property_type ENUM('pg', 'hostel', 'shared_flat') NOT NULL,
  gender_preference ENUM('women', 'men', 'all') NOT NULL DEFAULT 'all',
  room_sharing ENUM('private', 'twin', 'triple', 'four_sharing') NOT NULL DEFAULT 'twin',
  monthly_price DECIMAL(10,2) NOT NULL,
  deposit DECIMAL(10,2) NULL,
  address_public VARCHAR(255) NULL,
  transit_info VARCHAR(255) NULL,
  amenities JSON NULL,
  house_rules TEXT NULL,
  image_urls JSON NULL,
  status ENUM('draft', 'published', 'inactive') NOT NULL DEFAULT 'published',
  featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 4.8,
  reviews_count INT UNSIGNED DEFAULT 12,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (area_id) REFERENCES areas(id) ON DELETE RESTRICT,
  INDEX idx_listings_price (monthly_price),
  INDEX idx_listings_type (property_type),
  INDEX idx_listings_gender (gender_preference),
  INDEX idx_listings_sharing (room_sharing),
  INDEX idx_listings_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Favorites Table
CREATE TABLE IF NOT EXISTS favorites (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  listing_id BIGINT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_favorite (user_id, listing_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  listing_id BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  message TEXT NOT NULL,
  move_in_date DATE NULL,
  status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_enquiries_status (status),
  INDEX idx_enquiries_listing (listing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
