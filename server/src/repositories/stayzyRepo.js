import bcrypt from 'bcryptjs';
import { getPool, isDbConnected } from '../config/database.js';

// In-Memory Fallback Seed Data
let memoryUsers = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'student@stayzy.in',
    password_hash: bcrypt.hashSync('password123', 10),
    role: 'student',
    phone: '+91 98765 43210',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Suresh Kulkarni',
    email: 'owner@stayzy.in',
    password_hash: bcrypt.hashSync('password123', 10),
    role: 'owner',
    phone: '+91 98201 55432',
    createdAt: '2026-01-10T10:00:00Z',
  },
];

let memoryAreas = [
  { id: 1, name: 'Powai', city: 'Mumbai', pincode: '400076', tagline: 'Tech Hub & IIT Bombay', description: 'Next to IIT Bombay, Hiranandani business parks, upscale cafes, and lush lakeside jogging tracks.', averageRent: 13500, image: '/areas/1.jpg' },
  { id: 2, name: 'Andheri', city: 'Mumbai', pincode: '400058', tagline: 'Metro Junction & Nightlife', description: 'The ultimate student hotspot. Unbeatable connectivity with Metro Lines 1, 2A, 7 and Western line.', averageRent: 12000, image: '/areas/2.jpg' },
  { id: 3, name: 'Thane', city: 'Mumbai', pincode: '400601', tagline: 'Lakes & Fast Central Connectivity', description: 'Great for engineering students and interns. Direct fast trains to Central line and easy bus hubs.', averageRent: 8500, image: '/areas/3.avif' },
  { id: 4, name: 'Ghatkopar', city: 'Mumbai', pincode: '400077', tagline: 'Central Transit & Somaiya Campus', description: 'Smooth east-west transit, peaceful residential pockets, Somaiya Vidyavihar campus close by.', averageRent: 9500, image: '/areas/4.jpg' },
  { id: 5, name: 'Vashi', city: 'Mumbai', pincode: '400703', tagline: 'Navi Mumbai Academic Hub', description: 'Well-planned sectors, wide roads, spacious rooms, and great proximity to colleges in Nerul & Belapur.', averageRent: 7800, image: '/areas/5.jpg' },
  { id: 6, name: 'Dadar', city: 'Mumbai', pincode: '400014', tagline: 'The Heart of Mumbai Railway Junction', description: 'Central interchange connecting every corner of Mumbai. Near Ruia, Podar, and Kirti colleges.', averageRent: 14000, image: '/areas/6.jpg' },
];

let memoryListings = [
  {
    id: 1,
    owner_id: 2,
    area_id: 1,
    area: 'Powai',
    title: 'Sunlit Twin-Sharing PG with Home Cooked Meals',
    description: 'A well-kept, bright premium PG located in a peaceful residential pocket of Powai. Designed especially for college scholars and young interns at Hiranandani tech parks. Features high-speed fiber internet, dedicated study desks with ergonomic chairs, 3 hygienic home-cooked meals daily, and weekly linen laundry.',
    property_type: 'pg',
    gender_preference: 'all',
    room_sharing: 'twin',
    monthly_price: 12500,
    deposit: 20000,
    address_public: 'Near Central Avenue, Hiranandani Gardens, Powai',
    transit_info: '5 mins to IIT Bombay Main Gate | 10 mins auto to Kanjurmarg Station',
    amenities: ['Wi-Fi', 'Meals', 'AC', 'Laundry', 'Housekeeping', 'Attached Bathroom', 'Security'],
    house_rules: 'Common entry gates open 6:00 AM – 11:30 PM. Overnight guests allowed on weekends with advance notice. Strict non-smoking policy inside living quarters.',
    image_urls: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
    ],
    status: 'published',
    featured: true,
    rating: 4.8,
    reviews_count: 24,
    created_at: '2026-03-10T10:00:00Z',
    owner: { name: 'Suresh Kulkarni', role: 'Property Owner', phone: '+91 98201 55432' }
  },
  {
    id: 2,
    owner_id: 2,
    area_id: 2,
    area: 'Andheri',
    title: 'Girls Student Hostel with Library Lounge & 24/7 Wardens',
    description: 'Safe and welcoming women hostel strategically situated in Andheri West. Walking distance to Bhavans College, coaching hubs, and metro line 1. Offers round-the-clock female security personnel, CCTV coverage, filtered RO drinking water, power backup, and a silent study room.',
    property_type: 'hostel',
    gender_preference: 'women',
    room_sharing: 'triple',
    monthly_price: 9500,
    deposit: 15000,
    address_public: 'Near Azad Nagar Metro Station, Andheri West',
    transit_info: '3 mins walk to Azad Nagar Metro | 8 mins walk to Andheri Railway Station',
    amenities: ['Wi-Fi', 'Meals', 'Housekeeping', 'Security', 'Attached Bathroom', 'Power Backup'],
    house_rules: 'Biometric security entry. Curfew at 10:30 PM. Quiet hours in study lounge after 11 PM.',
    image_urls: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    status: 'published',
    featured: true,
    rating: 4.9,
    reviews_count: 38,
    created_at: '2026-03-15T11:30:00Z',
    owner: { name: 'Mrs. Vandana Patil', role: 'Hostel Warden', phone: '+91 98334 11209' }
  },
  {
    id: 3,
    owner_id: 2,
    area_id: 3,
    area: 'Thane',
    title: 'Spacious Private Room in 3BHK Shared Student Flat',
    description: 'An airy private room with personal balcony in a furnished gated high-rise society. Complete with smart TV in the living room, modular kitchen with refrigerator and microwave, washing machine, and 200 Mbps fiber Wi-Fi. Ideal for senior students or working grads.',
    property_type: 'shared_flat',
    gender_preference: 'men',
    room_sharing: 'private',
    monthly_price: 11000,
    deposit: 22000,
    address_public: 'Near Teen Hath Naka & Panchpakhadi, Thane West',
    transit_info: '8 mins by auto to Thane Railway Station | 2 mins to Eastern Express Highway',
    amenities: ['Wi-Fi', 'AC', 'Laundry', 'Housekeeping', 'Attached Bathroom', 'Power Backup'],
    house_rules: 'Independent flat keys with no curfew. Flatmates keep shared hall and kitchen tidy. Guests welcome with mutual respect.',
    image_urls: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
    ],
    status: 'published',
    featured: true,
    rating: 4.7,
    reviews_count: 19,
    created_at: '2026-03-18T14:15:00Z',
    owner: { name: 'Karan Mehta', role: 'Flatmate Lead', phone: '+91 97690 88214' }
  }
];

let memoryFavorites = [
  { id: 1, user_id: 1, listing_id: 1, created_at: '2026-03-20T10:00:00Z' },
  { id: 2, user_id: 1, listing_id: 2, created_at: '2026-03-21T11:00:00Z' },
];

let memoryEnquiries = [
  {
    id: 1,
    listing_id: 1,
    student_id: 1,
    name: 'Aarav Sharma',
    email: 'student@stayzy.in',
    phone: '+91 98765 43210',
    message: 'Hi Suresh ji, I am an IIT Bombay student looking to move in next semester. Is the room available from next month?',
    move_in_date: '2026-04-01',
    status: 'contacted',
    created_at: '2026-03-22T14:30:00Z'
  }
];

// Helper to normalize listings for response
function formatListing(raw) {
  return {
    id: String(raw.id),
    ownerId: raw.owner_id,
    title: raw.title,
    area: raw.area || (raw.area_name ? raw.area_name : 'Mumbai'),
    city: raw.city || 'Mumbai',
    description: raw.description,
    propertyType: raw.property_type,
    genderPreference: raw.gender_preference,
    roomSharing: raw.room_sharing,
    monthlyPrice: Number(raw.monthly_price),
    deposit: raw.deposit ? Number(raw.deposit) : null,
    addressPublic: raw.address_public,
    transitInfo: raw.transit_info,
    amenities: typeof raw.amenities === 'string' ? JSON.parse(raw.amenities) : (raw.amenities || []),
    houseRules: raw.house_rules,
    imageUrl: Array.isArray(raw.image_urls) ? raw.image_urls[0] : (typeof raw.image_urls === 'string' ? JSON.parse(raw.image_urls)[0] : raw.imageUrl),
    imageUrls: typeof raw.image_urls === 'string' ? JSON.parse(raw.image_urls) : (raw.image_urls || []),
    status: raw.status,
    featured: Boolean(raw.featured),
    rating: Number(raw.rating || 4.8),
    reviewsCount: Number(raw.reviews_count || 12),
    owner: raw.owner || { name: 'Verified Owner', role: 'Property Manager' },
    createdAt: raw.created_at,
  };
}

export const StayzyRepo = {
  // --- USERS ---
  async findUserByEmail(email) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        'SELECT id, name, email, password_hash, role, phone, created_at FROM users WHERE email = ? LIMIT 1',
        [email.toLowerCase().trim()]
      );
      return rows[0] || null;
    }
    return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  async findUserById(id) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        'SELECT id, name, email, role, phone, created_at FROM users WHERE id = ? LIMIT 1',
        [id]
      );
      return rows[0] || null;
    }
    const found = memoryUsers.find(u => u.id === Number(id));
    if (!found) return null;
    const { password_hash, ...safeUser } = found;
    return safeUser;
  },

  async createUser({ name, email, password, role, phone }) {
    const password_hash = await bcrypt.hash(password, 10);
    if (isDbConnected()) {
      const [result] = await getPool().execute(
        'INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
        [name, email.toLowerCase().trim(), password_hash, role || 'student', phone || null]
      );
      return { id: result.insertId, name, email: email.toLowerCase().trim(), role: role || 'student', phone };
    }

    const newUser = {
      id: memoryUsers.length + 1,
      name,
      email: email.toLowerCase().trim(),
      password_hash,
      role: role || 'student',
      phone: phone || '',
      createdAt: new Date().toISOString(),
    };
    memoryUsers.push(newUser);
    const { password_hash: _, ...safeUser } = newUser;
    return safeUser;
  },

  // --- AREAS ---
  async getAreas() {
    if (isDbConnected()) {
      const [rows] = await getPool().execute('SELECT id, name, city, pincode, tagline FROM areas ORDER BY name ASC');
      return rows;
    }
    return memoryAreas;
  },

  // --- LISTINGS ---
  async getListings(filters = {}) {
    const {
      q,
      area,
      minPrice,
      maxPrice,
      type,
      sharing,
      gender,
      amenities,
      sort = 'recommended',
      page = 1,
      limit = 12,
    } = filters;

    if (isDbConnected()) {
      let query = `
        SELECT l.*, a.name AS area_name, a.city, u.name AS owner_name, u.phone AS owner_phone
        FROM listings l
        JOIN areas a ON l.area_id = a.id
        JOIN users u ON l.owner_id = u.id
        WHERE l.status = 'published'
      `;
      const params = [];

      if (q) {
        query += ` AND (l.title LIKE ? OR a.name LIKE ? OR l.description LIKE ?)`;
        const wild = `%${q}%`;
        params.push(wild, wild, wild);
      }
      if (area && area !== 'all') {
        query += ` AND a.name = ?`;
        params.push(area);
      }
      if (minPrice) {
        query += ` AND l.monthly_price >= ?`;
        params.push(Number(minPrice));
      }
      if (maxPrice) {
        query += ` AND l.monthly_price <= ?`;
        params.push(Number(maxPrice));
      }
      if (type && type !== 'all') {
        query += ` AND l.property_type = ?`;
        params.push(type);
      }
      if (sharing && sharing !== 'all') {
        query += ` AND l.room_sharing = ?`;
        params.push(sharing);
      }
      if (gender && gender !== 'all') {
        query += ` AND (l.gender_preference = ? OR l.gender_preference = 'all')`;
        params.push(gender);
      }

      // Allowed sorts
      if (sort === 'price_asc') {
        query += ` ORDER BY l.monthly_price ASC`;
      } else if (sort === 'price_desc') {
        query += ` ORDER BY l.monthly_price DESC`;
      } else if (sort === 'newest') {
        query += ` ORDER BY l.created_at DESC`;
      } else {
        query += ` ORDER BY l.featured DESC, l.rating DESC`;
      }

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
      const offset = (pageNum - 1) * limitNum;

      query += ` LIMIT ? OFFSET ?`;
      params.push(limitNum, offset);

      const [rows] = await getPool().query(query, params);
      return {
        data: rows.map(r => formatListing({
          ...r,
          area: r.area_name,
          owner: { name: r.owner_name, phone: r.owner_phone, role: 'Property Owner' }
        })),
        pagination: { page: pageNum, limit: limitNum, total: rows.length }
      };
    }

    // In-memory fallback
    let results = [...memoryListings];
    if (q) {
      const term = q.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(term) ||
        l.area.toLowerCase().includes(term) ||
        l.description.toLowerCase().includes(term)
      );
    }
    if (area && area !== 'all') {
      results = results.filter(l => l.area.toLowerCase() === area.toLowerCase());
    }
    if (type && type !== 'all') {
      results = results.filter(l => l.property_type === type);
    }
    if (sharing && sharing !== 'all') {
      results = results.filter(l => l.room_sharing === sharing);
    }
    if (gender && gender !== 'all') {
      results = results.filter(l => l.gender_preference === gender || l.gender_preference === 'all');
    }
    if (minPrice) {
      results = results.filter(l => l.monthly_price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter(l => l.monthly_price <= Number(maxPrice));
    }
    if (amenities) {
      const list = amenities.split(',').map(a => a.trim().toLowerCase());
      results = results.filter(l => {
        const itemAm = (l.amenities || []).map(a => a.toLowerCase());
        return list.every(a => itemAm.includes(a));
      });
    }

    if (sort === 'price_asc') {
      results.sort((a, b) => a.monthly_price - b.monthly_price);
    } else if (sort === 'price_desc') {
      results.sort((a, b) => b.monthly_price - a.monthly_price);
    } else if (sort === 'newest') {
      results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    const total = results.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const offset = (pageNum - 1) * limitNum;
    const paged = results.slice(offset, offset + limitNum);

    return {
      data: paged.map(formatListing),
      pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) }
    };
  },

  async getListingById(id) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        `SELECT l.*, a.name AS area_name, a.city, u.name AS owner_name, u.phone AS owner_phone
         FROM listings l
         JOIN areas a ON l.area_id = a.id
         JOIN users u ON l.owner_id = u.id
         WHERE l.id = ? LIMIT 1`,
        [id]
      );
      if (!rows[0]) return null;
      return formatListing({
        ...rows[0],
        area: rows[0].area_name,
        owner: { name: rows[0].owner_name, phone: rows[0].owner_phone, role: 'Property Owner' }
      });
    }

    const found = memoryListings.find(l => String(l.id) === String(id));
    return found ? formatListing(found) : null;
  },

  async createListing(data, ownerId) {
    if (isDbConnected()) {
      const [result] = await getPool().execute(
        `INSERT INTO listings (
          owner_id, area_id, title, description, property_type, gender_preference,
          room_sharing, monthly_price, deposit, address_public, transit_info, amenities,
          house_rules, image_urls, status
        ) VALUES (?, (SELECT id FROM areas WHERE name = ? LIMIT 1), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')`,
        [
          ownerId,
          data.area || 'Powai',
          data.title,
          data.description,
          data.propertyType,
          data.genderPreference || 'all',
          data.roomSharing || 'twin',
          data.monthlyPrice,
          data.deposit || null,
          data.addressPublic || null,
          data.transitInfo || null,
          JSON.stringify(data.amenities || []),
          data.houseRules || null,
          JSON.stringify(data.imageUrls?.length ? data.imageUrls : [data.imageUrl])
        ]
      );
      return this.getListingById(result.insertId);
    }

    const newListing = {
      id: memoryListings.length + 1,
      owner_id: ownerId,
      area_id: 1,
      area: data.area || 'Powai',
      city: 'Mumbai',
      title: data.title,
      description: data.description,
      property_type: data.propertyType || 'pg',
      gender_preference: data.genderPreference || 'all',
      room_sharing: data.roomSharing || 'twin',
      monthly_price: Number(data.monthlyPrice),
      deposit: data.deposit ? Number(data.deposit) : null,
      address_public: data.addressPublic,
      transit_info: data.transitInfo,
      amenities: data.amenities || [],
      house_rules: data.houseRules,
      image_urls: data.imageUrls?.length ? data.imageUrls : [data.imageUrl],
      status: 'published',
      featured: false,
      rating: 5.0,
      reviews_count: 1,
      created_at: new Date().toISOString()
    };
    memoryListings.unshift(newListing);
    return formatListing(newListing);
  },

  async getOwnerListings(ownerId) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        `SELECT l.*, a.name AS area_name, a.city FROM listings l
         JOIN areas a ON l.area_id = a.id
         WHERE l.owner_id = ? ORDER BY l.created_at DESC`,
        [ownerId]
      );
      return rows.map(r => formatListing({ ...r, area: r.area_name }));
    }
    return memoryListings.filter(l => l.owner_id === ownerId).map(formatListing);
  },

  async updateListing(id, data, ownerId) {
    const listing = await this.getListingById(id);
    if (!listing) throw new Error('Listing not found');
    if (listing.ownerId !== ownerId) throw new Error('Unauthorized to modify this listing');

    if (isDbConnected()) {
      await getPool().execute(
        `UPDATE listings SET title = ?, description = ?, monthly_price = ?, deposit = ?, house_rules = ?
         WHERE id = ? AND owner_id = ?`,
        [data.title, data.description, data.monthlyPrice, data.deposit, data.houseRules, id, ownerId]
      );
      return this.getListingById(id);
    }

    const index = memoryListings.findIndex(l => String(l.id) === String(id));
    if (index !== -1) {
      memoryListings[index] = {
        ...memoryListings[index],
        ...data,
        monthly_price: data.monthlyPrice ? Number(data.monthlyPrice) : memoryListings[index].monthly_price
      };
      return formatListing(memoryListings[index]);
    }
    return null;
  },

  async deleteListing(id, ownerId) {
    const listing = await this.getListingById(id);
    if (!listing) throw new Error('Listing not found');
    if (listing.ownerId !== ownerId) throw new Error('Unauthorized to delete this listing');

    if (isDbConnected()) {
      await getPool().execute('DELETE FROM listings WHERE id = ? AND owner_id = ?', [id, ownerId]);
      return true;
    }
    memoryListings = memoryListings.filter(l => String(l.id) !== String(id));
    return true;
  },

  // --- FAVORITES ---
  async getFavorites(userId) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        `SELECT l.*, a.name AS area_name FROM favorites f
         JOIN listings l ON f.listing_id = l.id
         JOIN areas a ON l.area_id = a.id
         WHERE f.user_id = ?`,
        [userId]
      );
      return rows.map(r => formatListing({ ...r, area: r.area_name }));
    }

    const userFavs = memoryFavorites.filter(f => f.user_id === userId);
    return userFavs.map(f => {
      const l = memoryListings.find(item => item.id === f.listing_id);
      return l ? formatListing(l) : null;
    }).filter(Boolean);
  },

  async addFavorite(userId, listingId) {
    if (isDbConnected()) {
      await getPool().execute(
        'INSERT IGNORE INTO favorites (user_id, listing_id) VALUES (?, ?)',
        [userId, listingId]
      );
      return true;
    }
    if (!memoryFavorites.some(f => f.user_id === userId && f.listing_id === Number(listingId))) {
      memoryFavorites.push({ id: memoryFavorites.length + 1, user_id: userId, listing_id: Number(listingId), created_at: new Date().toISOString() });
    }
    return true;
  },

  async removeFavorite(userId, listingId) {
    if (isDbConnected()) {
      await getPool().execute(
        'DELETE FROM favorites WHERE user_id = ? AND listing_id = ?',
        [userId, listingId]
      );
      return true;
    }
    memoryFavorites = memoryFavorites.filter(f => !(f.user_id === userId && f.listing_id === Number(listingId)));
    return true;
  },

  // --- ENQUIRIES ---
  async createEnquiry(listingId, studentId, data) {
    if (isDbConnected()) {
      const [res] = await getPool().execute(
        `INSERT INTO enquiries (listing_id, student_id, name, email, phone, message, move_in_date, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new')`,
        [listingId, studentId || null, data.name, data.email, data.phone || null, data.message, data.moveInDate || null]
      );
      return { id: res.insertId, ...data, status: 'new' };
    }

    const newEnq = {
      id: memoryEnquiries.length + 1,
      listing_id: Number(listingId),
      student_id: studentId || null,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      move_in_date: data.moveInDate,
      status: 'new',
      created_at: new Date().toISOString()
    };
    memoryEnquiries.unshift(newEnq);
    return newEnq;
  },

  async getStudentEnquiries(studentId) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        `SELECT e.*, l.title AS listing_title, a.name AS area_name
         FROM enquiries e
         JOIN listings l ON e.listing_id = l.id
         JOIN areas a ON l.area_id = a.id
         WHERE e.student_id = ? ORDER BY e.created_at DESC`,
        [studentId]
      );
      return rows;
    }
    return memoryEnquiries.filter(e => e.student_id === studentId);
  },

  async getOwnerEnquiries(ownerId) {
    if (isDbConnected()) {
      const [rows] = await getPool().execute(
        `SELECT e.*, l.title AS listing_title FROM enquiries e
         JOIN listings l ON e.listing_id = l.id
         WHERE l.owner_id = ? ORDER BY e.created_at DESC`,
        [ownerId]
      );
      return rows;
    }
    return memoryEnquiries;
  }
};
