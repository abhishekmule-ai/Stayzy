-- Stayzy Mumbai PG & Hostel Finder
-- Seed Data

USE stayzy_db;

-- 1. Insert Areas
INSERT INTO areas (name, city, pincode, tagline, image) VALUES
('Powai', 'Mumbai', '400076', 'Tech Hub & IIT Bombay', '/areas/1.jpg'),
('Andheri', 'Mumbai', '400058', 'Metro Junction & Nightlife', '/areas/2.jpg'),
('Thane', 'Mumbai', '400601', 'Lakes & Fast Central Connectivity', '/areas/3.avif'),
('Ghatkopar', 'Mumbai', '400077', 'Central Transit & Somaiya Campus', '/areas/4.jpg'),
('Vashi', 'Mumbai', '400703', 'Navi Mumbai Academic Hub', '/areas/5.jpg'),
('Dadar', 'Mumbai', '400014', 'The Heart of Mumbai Railway Junction', '/areas/6.jpg')
ON DUPLICATE KEY UPDATE name=name;

-- 2. Insert Seed Users (Password: password123, hashed with bcrypt $2a$10$wKkS...)
INSERT INTO users (id, name, email, password_hash, role, phone) VALUES
(1, 'Aarav Sharma', 'student@stayzy.in', '$2a$10$Z3oF/Ksp.n4Zl0pC8oUeUeg3kYd4XQ8rW6JqWz612JcQ63rK5K1re', 'student', '+91 98765 43210'),
(2, 'Suresh Kulkarni', 'owner@stayzy.in', '$2a$10$Z3oF/Ksp.n4Zl0pC8oUeUeg3kYd4XQ8rW6JqWz612JcQ63rK5K1re', 'owner', '+91 98201 55432')
ON DUPLICATE KEY UPDATE email=email;

-- 3. Insert Initial Listings
INSERT INTO listings (
  id, owner_id, area_id, title, description, property_type, gender_preference, room_sharing,
  monthly_price, deposit, address_public, transit_info, amenities, house_rules, image_urls,
  status, featured, rating, reviews_count
) VALUES
(
  1, 2, 1,
  'Sunlit Twin-Sharing PG with Home Cooked Meals',
  'A well-kept, bright premium PG located in a peaceful residential pocket of Powai. Designed especially for college scholars and young interns at Hiranandani tech parks. Features high-speed fiber internet, dedicated study desks with ergonomic chairs, 3 hygienic home-cooked meals daily, and weekly linen laundry.',
  'pg', 'all', 'twin', 12500.00, 20000.00,
  'Near Central Avenue, Hiranandani Gardens, Powai',
  '5 mins to IIT Bombay Main Gate | 10 mins auto to Kanjurmarg Station',
  JSON_ARRAY('Wi-Fi', 'Meals', 'AC', 'Laundry', 'Housekeeping', 'Attached Bathroom', 'Security'),
  'Common entry gates open 6:00 AM – 11:30 PM. Overnight guests allowed on weekends with advance notice. Strict non-smoking policy inside living quarters.',
  JSON_ARRAY('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'),
  'published', TRUE, 4.8, 24
),
(
  2, 2, 2,
  'Girls Student Hostel with Library Lounge & 24/7 Wardens',
  'Safe and welcoming women hostel strategically situated in Andheri West. Walking distance to Bhavans College, coaching hubs, and metro line 1. Offers round-the-clock female security personnel, CCTV coverage, filtered RO drinking water, power backup, and a silent study room.',
  'hostel', 'women', 'triple', 9500.00, 15000.00,
  'Near Azad Nagar Metro Station, Andheri West',
  '3 mins walk to Azad Nagar Metro | 8 mins walk to Andheri Railway Station',
  JSON_ARRAY('Wi-Fi', 'Meals', 'Housekeeping', 'Security', 'Attached Bathroom', 'Power Backup'),
  'Biometric security entry. Curfew at 10:30 PM. Quiet hours in study lounge after 11 PM.',
  JSON_ARRAY('https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'),
  'published', TRUE, 4.9, 38
),
(
  3, 2, 3,
  'Spacious Private Room in 3BHK Shared Student Flat',
  'An airy private room with personal balcony in a furnished gated high-rise society. Complete with smart TV in the living room, modular kitchen with refrigerator and microwave, washing machine, and 200 Mbps fiber Wi-Fi. Ideal for senior students or working grads.',
  'shared_flat', 'men', 'private', 11000.00, 22000.00,
  'Near Teen Hath Naka & Panchpakhadi, Thane West',
  '8 mins by auto to Thane Railway Station | 2 mins to Eastern Express Highway',
  JSON_ARRAY('Wi-Fi', 'AC', 'Laundry', 'Housekeeping', 'Attached Bathroom', 'Power Backup'),
  'Independent flat keys with no curfew. Flatmates keep shared hall and kitchen tidy. Guests welcome with mutual respect.',
  JSON_ARRAY('https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'),
  'published', TRUE, 4.7, 19
)
ON DUPLICATE KEY UPDATE title=title;

-- 4. Insert Seed Favorite
INSERT INTO favorites (user_id, listing_id) VALUES (1, 1), (1, 2)
ON DUPLICATE KEY UPDATE listing_id=listing_id;

-- 5. Insert Seed Enquiry
INSERT INTO enquiries (listing_id, student_id, name, email, phone, message, move_in_date, status) VALUES
(1, 1, 'Aarav Sharma', 'student@stayzy.in', '+91 98765 43210', 'Hi Suresh ji, I am an IIT Bombay student looking to move in next semester. Is the room available from next month?', '2026-04-01', 'contacted')
ON DUPLICATE KEY UPDATE message=message;
