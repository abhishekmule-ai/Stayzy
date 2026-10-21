/**
 * Believable demo listings for Stayzy Mumbai.
 * Designed to showcase realistic Mumbai PGs, hostels, and shared student flats.
 */

export const POPULAR_AREAS = [
  {
    id: "powai",
    name: "Powai",
    tagline: "Tech Hub & IIT Bombay",
    description: "Next to IIT Bombay, Hiranandani business parks, upscale cafes, and lush lakeside jogging tracks.",
    averageRent: 13500,
    count: 19,
    image: "/areas/1.jpg"
  },
  {
    id: "andheri",
    name: "Andheri",
    tagline: "Metro Junction & Nightlife",
    description: "The ultimate student hotspot. Unbeatable connectivity with Metro Lines 1, 2A, 7 and Western line.",
    averageRent: 12000,
    count: 22,
    image: "/areas/2.jpg"
  },
  {
    id: "thane",
    name: "Thane",
    tagline: "Lakes & Fast Central Connectivity",
    description: "Great for engineering students and interns. Direct fast trains to Central line and easy bus hubs.",
    averageRent: 8500,
    count: 14,
    image: "/areas/3.avif"
  },
  {
    id: "ghatkopar",
    name: "Ghatkopar",
    tagline: "Central Transit & Somaiya Campus",
    description: "Smooth east-west transit, peaceful residential pockets, Somaiya Vidyavihar campus close by.",
    averageRent: 9500,
    count: 11,
    image: "/areas/4.jpg"
  },
  {
    id: "vashi",
    name: "Vashi",
    tagline: "Navi Mumbai Academic Hub",
    description: "Well-planned sectors, wide roads, spacious rooms, and great proximity to colleges in Nerul & Belapur.",
    averageRent: 7800,
    count: 16,
    image: "/areas/5.jpg"
  },
  {
    id: "dadar",
    name: "Dadar",
    tagline: "The Heart of Mumbai Railway Junction",
    description: "Central interchange connecting every corner of Mumbai. Near Ruia, Podar, and Kirti colleges.",
    averageRent: 14000,
    count: 8,
    image: "/areas/6.jpg"
  }
];

export const DEMO_LISTINGS = [
  {
    id: "demo-1",
    title: "Sunlit Twin-Sharing PG with Home Cooked Meals",
    area: "Powai",
    city: "Mumbai",
    propertyType: "pg",
    genderPreference: "all",
    roomSharing: "twin",
    monthlyPrice: 12500,
    deposit: 20000,
    addressPublic: "Near Central Avenue, Hiranandani Gardens, Powai",
    transitInfo: "5 mins to IIT Bombay Main Gate | 10 mins auto to Kanjurmarg Station",
    amenities: ["Wi-Fi", "Meals", "AC", "Laundry", "Housekeeping", "Attached Bathroom", "Security"],
    houseRules: "Common entry gates open 6:00 AM – 11:30 PM. Overnight guests allowed on weekends with advance notice. Strict non-smoking policy inside living quarters.",
    description: "A well-kept, bright premium PG located in a peaceful residential pocket of Powai. Designed especially for college scholars and young interns at Hiranandani tech parks. Features high-speed fiber internet, dedicated study desks with ergonomic chairs, 3 hygienic home-cooked meals daily, and weekly linen laundry.",
    imageUrls: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Suresh Kulkarni",
      role: "Verified Property Manager",
      phone: "+91 98201 55432"
    },
    featured: true,
    rating: 4.8,
    reviewsCount: 24,
    isDemo: true,
    createdAt: "2026-03-10T10:00:00Z"
  },
  {
    id: "demo-2",
    title: "Girls Student Hostel with Library Lounge & 24/7 Wardens",
    area: "Andheri",
    city: "Mumbai",
    propertyType: "hostel",
    genderPreference: "women",
    roomSharing: "triple",
    monthlyPrice: 9500,
    deposit: 15000,
    addressPublic: "Near Azad Nagar Metro Station, Andheri West",
    transitInfo: "3 mins walk to Azad Nagar Metro | 8 mins walk to Andheri Railway Station",
    amenities: ["Wi-Fi", "Meals", "Housekeeping", "Security", "Attached Bathroom", "Power Backup"],
    houseRules: "Biometric security entry. Curfew at 10:30 PM (late slips available through digital pass). Quiet hours in study lounge after 11 PM.",
    description: "Safe and welcoming women's hostel strategically situated in Andheri West. Walking distance to Bhavans College, coaching hubs, and metro line 1. Offers round-the-clock female security personnel, CCTV coverage, filtered RO drinking water, power backup, and a silent study room.",
    imageUrls: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Mrs. Vandana Patil",
      role: "Hostel Warden & Administrator",
      phone: "+91 98334 11209"
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 38,
    isDemo: true,
    createdAt: "2026-03-15T11:30:00Z"
  },
  {
    id: "demo-3",
    title: "Spacious Private Room in 3BHK Shared Student Flat",
    area: "Thane",
    city: "Mumbai Metropolitan Region",
    propertyType: "shared_flat",
    genderPreference: "men",
    roomSharing: "private",
    monthlyPrice: 11000,
    deposit: 22000,
    addressPublic: "Near Teen Hath Naka & Panchpakhadi, Thane West",
    transitInfo: "8 mins by auto to Thane Railway Station | 2 mins to Eastern Express Highway",
    amenities: ["Wi-Fi", "AC", "Laundry", "Housekeeping", "Attached Bathroom", "Power Backup"],
    houseRules: "Independent flat keys with no curfew. Flatmates keep shared hall and kitchen tidy. Guests welcome with mutual respect.",
    description: "An airy private room with personal balcony in a furnished gated high-rise society. Complete with smart TV in the living room, modular kitchen with refrigerator and microwave, washing machine, and 200 Mbps fiber Wi-Fi. Ideal for senior students or working grads.",
    imageUrls: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Karan Mehta",
      role: "Lead Flatmate & Leaseholder",
      phone: "+91 97690 88214"
    },
    featured: true,
    rating: 4.7,
    reviewsCount: 19,
    isDemo: true,
    createdAt: "2026-03-18T14:15:00Z"
  },
  {
    id: "demo-4",
    title: "Affordable 4-Sharing Boys PG near Somaiya Campus",
    area: "Ghatkopar",
    city: "Mumbai",
    propertyType: "pg",
    genderPreference: "men",
    roomSharing: "four_sharing",
    monthlyPrice: 6500,
    deposit: 10000,
    addressPublic: "Near Tilak Nagar & Somaiya Vidyavihar, Ghatkopar East",
    transitInfo: "5 mins walk to Somaiya College | 7 mins walk to Vidyavihar Station",
    amenities: ["Wi-Fi", "Meals", "Housekeeping", "Security"],
    houseRules: "Clean footwear rack at entrance. Common study lights out at 12 midnight; personal bed lamps allowed. Gates lock at 11:00 PM.",
    description: "Pocket-friendly student living tailored for college budgets. Located right beside Somaiya Vidyavihar. Rent covers morning breakfast, evening dinner, clean drinking water, daily housekeeping, and individual lockable steel almirahs.",
    imageUrls: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Rameshwar Dubey",
      role: "PG Caretaker",
      phone: "+91 98198 33490"
    },
    featured: false,
    rating: 4.5,
    reviewsCount: 16,
    isDemo: true,
    createdAt: "2026-03-20T09:20:00Z"
  },
  {
    id: "demo-5",
    title: "Co-Ed Modern Student Co-Living with Gym & Rooftop Cafe",
    area: "Vashi",
    city: "Mumbai Metropolitan Region",
    propertyType: "hostel",
    genderPreference: "all",
    roomSharing: "twin",
    monthlyPrice: 10500,
    deposit: 18000,
    addressPublic: "Sector 17, Near Vashi Plaza, Vashi, Navi Mumbai",
    transitInfo: "10 mins walk to Vashi Railway Station | 2 mins to Palm Beach Road junction",
    amenities: ["Wi-Fi", "Meals", "AC", "Laundry", "Housekeeping", "Security", "Attached Bathroom", "Power Backup"],
    houseRules: "Community-driven vibe! Respect quiet hours in dorm corridors after 10:30 PM. Common rooftop lounge open until midnight.",
    description: "Modern co-living space blending hostel sociability with hotel-grade maintenance. Features a gym, game room (table tennis & foosball), high-speed Wi-Fi workstations, chef-prepared buffet meals, and weekly curated community events.",
    imageUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab00f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Vikram Singhania",
      role: "Operations Lead @ VibeStays",
      phone: "+91 99200 44102"
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 52,
    isDemo: true,
    createdAt: "2026-03-22T16:00:00Z"
  },
  {
    id: "demo-6",
    title: "Heritage Style Twin PG next to Ruia & Podar College",
    area: "Dadar",
    city: "Mumbai",
    propertyType: "pg",
    genderPreference: "women",
    roomSharing: "twin",
    monthlyPrice: 14500,
    deposit: 25000,
    addressPublic: "Hindu Colony, Near Matunga & Dadar East",
    transitInfo: "4 mins walk to Ruia College | 6 mins to Dadar Central/Western Terminus",
    amenities: ["Wi-Fi", "Meals", "AC", "Housekeeping", "Attached Bathroom", "Security"],
    houseRules: "Traditional, peaceful locality. Gates locked at 10:00 PM. Parents permitted to visit in ground floor reception.",
    description: "Charming, well-ventilated stay in prestigious Hindu Colony, Dadar. High ceilings, wooden desks, cool cross-breeze, and pure vegetarian home-cooked Maharashtrian & Gujarati meals. Perfect for serious students attending nearby medical and degree colleges.",
    imageUrls: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Mrs. Shalini Gokhale",
      role: "Owner / Host",
      phone: "+91 98205 77190"
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 31,
    isDemo: true,
    createdAt: "2026-03-24T12:00:00Z"
  },
  {
    id: "demo-7",
    title: "Executive Shared Flat Room with AC near Bandra Kurla Complex",
    area: "Andheri",
    city: "Mumbai",
    propertyType: "shared_flat",
    genderPreference: "all",
    roomSharing: "twin",
    monthlyPrice: 16000,
    deposit: 30000,
    addressPublic: "Near Versova Link Road, Andheri West",
    transitInfo: "8 mins to Versova Metro Station | Close to cafes, media studios, and beach",
    amenities: ["Wi-Fi", "AC", "Laundry", "Housekeeping", "Attached Bathroom", "Power Backup"],
    houseRules: "Professional environment. Late working hours accommodated. Strictly no loud parties past 11 PM.",
    description: "Chic apartment sharing for media interns, design students, and young corporate starters. Fully furnished with modular Italian kitchen, automatic washing machine, 300 Mbps Wi-Fi, air conditioned rooms, and weekly housekeeping.",
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Tanmay Deshmukh",
      role: "Flat Representative",
      phone: "+91 98112 40993"
    },
    featured: true,
    rating: 4.7,
    reviewsCount: 14,
    isDemo: true,
    createdAt: "2026-03-25T15:45:00Z"
  },
  {
    id: "demo-8",
    title: "Cozy Triple-Sharing Student PG with Fast Wi-Fi",
    area: "Thane",
    city: "Mumbai Metropolitan Region",
    propertyType: "pg",
    genderPreference: "all",
    roomSharing: "triple",
    monthlyPrice: 7200,
    deposit: 12000,
    addressPublic: "Near Ghodbunder Road & Viviana Mall, Thane West",
    transitInfo: "2 mins walk to TMT bus stop | 12 mins to Thane Railway Station",
    amenities: ["Wi-Fi", "Meals", "Housekeeping", "Security", "Attached Bathroom"],
    houseRules: "Standard college hostel rules. Clean study tables after use. Gates close at 11:00 PM.",
    description: "Quiet and budget-conscious accommodation for college students in Thane. Located within walking distance of retail stores, medical clinics, and direct bus stops. Rent includes two hearty home meals, water purifier, and laundry hookups.",
    imageUrls: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80"
    ],
    imageUrl: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80",
    owner: {
      name: "Mrs. Anandi Rao",
      role: "PG Host",
      phone: "+91 97022 18944"
    },
    featured: false,
    rating: 4.6,
    reviewsCount: 20,
    isDemo: true,
    createdAt: "2026-03-26T08:30:00Z"
  }
];
