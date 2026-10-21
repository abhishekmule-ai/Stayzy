import { apiRequest } from './api';
import { DEMO_LISTINGS, POPULAR_AREAS } from '../data/demoListings';

const LOCAL_STORAGE_CUSTOM_LISTINGS_KEY = 'stayzy_user_listings';

function getStoredCustomListings() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CUSTOM_LISTINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom listings from localStorage', e);
    return [];
  }
}

function saveCustomListings(listings) {
  try {
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_LISTINGS_KEY, JSON.stringify(listings));
  } catch (e) {
    console.error('Error saving custom listings to localStorage', e);
  }
}

/**
 * Filter demo and custom listings locally
 */
function filterLocalListings(allListings, filters = {}) {
  let results = [...allListings];

  const {
    q,
    area,
    type,
    propertyType,
    sharing,
    roomSharing,
    gender,
    genderPreference,
    minPrice,
    maxPrice,
    amenities,
    sort = 'recommended',
    page = 1,
    limit = 12
  } = filters;

  const searchTerm = (q || '').trim().toLowerCase();
  if (searchTerm) {
    results = results.filter(item =>
      (item.title && item.title.toLowerCase().includes(searchTerm)) ||
      (item.area && item.area.toLowerCase().includes(searchTerm)) ||
      (item.description && item.description.toLowerCase().includes(searchTerm)) ||
      (item.addressPublic && item.addressPublic.toLowerCase().includes(searchTerm))
    );
  }

  const areaFilter = (area || '').trim().toLowerCase();
  if (areaFilter && areaFilter !== 'all') {
    results = results.filter(item =>
      item.area && item.area.toLowerCase() === areaFilter
    );
  }

  const targetType = type || propertyType;
  if (targetType && targetType !== 'all') {
    results = results.filter(item => item.propertyType === targetType);
  }

  const targetSharing = sharing || roomSharing;
  if (targetSharing && targetSharing !== 'all') {
    results = results.filter(item => item.roomSharing === targetSharing);
  }

  const targetGender = gender || genderPreference;
  if (targetGender && targetGender !== 'all') {
    results = results.filter(item =>
      item.genderPreference === targetGender || item.genderPreference === 'all'
    );
  }

  if (minPrice) {
    const min = Number(minPrice);
    if (!isNaN(min)) {
      results = results.filter(item => item.monthlyPrice >= min);
    }
  }

  if (maxPrice) {
    const max = Number(maxPrice);
    if (!isNaN(max)) {
      results = results.filter(item => item.monthlyPrice <= max);
    }
  }

  if (amenities) {
    const reqAmenities = Array.isArray(amenities)
      ? amenities
      : amenities.split(',').map(a => a.trim().toLowerCase()).filter(Boolean);

    if (reqAmenities.length > 0) {
      results = results.filter(item => {
        if (!item.amenities || !Array.isArray(item.amenities)) return false;
        const itemLower = item.amenities.map(a => a.toLowerCase());
        return reqAmenities.every(a => itemLower.includes(a));
      });
    }
  }

  // Sorting
  if (sort === 'price_asc') {
    results.sort((a, b) => a.monthlyPrice - b.monthlyPrice);
  } else if (sort === 'price_desc') {
    results.sort((a, b) => b.monthlyPrice - a.monthlyPrice);
  } else if (sort === 'newest') {
    results.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  } else {
    // 'recommended' - featured first, then rating
    results.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }

  const total = results.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.max(1, parseInt(limit, 10) || 12);
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (pageNum - 1) * pageSize;
  const paginatedData = results.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    pagination: {
      total,
      page: pageNum,
      limit: pageSize,
      totalPages
    },
    isDemo: true
  };
}

export async function getListings(filters = {}) {
  // Construct query string
  const queryParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      queryParams.append(key, val);
    }
  });

  try {
    const res = await apiRequest(`/listings?${queryParams.toString()}`);
    return {
      data: res.data,
      pagination: res.pagination,
      isDemo: false
    };
  } catch (error) {
    // Seamless fallback to realistic local demo data
    const custom = getStoredCustomListings();
    const combined = [...custom, ...DEMO_LISTINGS];
    return filterLocalListings(combined, filters);
  }
}

export async function getListingById(id) {
  try {
    const res = await apiRequest(`/listings/${id}`);
    return { data: res.data, isDemo: false };
  } catch (error) {
    // Check custom listings first
    const custom = getStoredCustomListings();
    const foundCustom = custom.find(item => String(item.id) === String(id));
    if (foundCustom) {
      return { data: foundCustom, isDemo: true };
    }

    const foundDemo = DEMO_LISTINGS.find(item => String(item.id) === String(id));
    if (foundDemo) {
      return { data: foundDemo, isDemo: true };
    }

    throw new Error('Listing not found');
  }
}

export async function getPopularAreas() {
  try {
    const res = await apiRequest('/areas');
    return res.data;
  } catch (error) {
    return POPULAR_AREAS;
  }
}

export async function createListing(listingData) {
  try {
    const res = await apiRequest('/owner/listings', {
      method: 'POST',
      body: JSON.stringify(listingData),
    });
    return res.data;
  } catch (error) {
    // Demo mode: create locally
    const custom = getStoredCustomListings();
    const newListing = {
      ...listingData,
      id: `owner-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isDemo: true,
      rating: 5.0,
      reviewsCount: 1,
      imageUrl: listingData.imageUrl || listingData.imageUrls?.[0] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      imageUrls: listingData.imageUrls?.length ? listingData.imageUrls : [listingData.imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80']
    };
    custom.unshift(newListing);
    saveCustomListings(custom);
    return newListing;
  }
}

export async function updateListing(id, listingData) {
  try {
    const res = await apiRequest(`/owner/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(listingData),
    });
    return res.data;
  } catch (error) {
    const custom = getStoredCustomListings();
    const index = custom.findIndex(l => String(l.id) === String(id));
    if (index !== -1) {
      custom[index] = { ...custom[index], ...listingData, updatedAt: new Date().toISOString() };
      saveCustomListings(custom);
      return custom[index];
    }
    throw new Error('Listing not found to update in demo mode');
  }
}

export async function deleteListing(id) {
  try {
    await apiRequest(`/owner/listings/${id}`, {
      method: 'DELETE'
    });
    return true;
  } catch (error) {
    let custom = getStoredCustomListings();
    custom = custom.filter(l => String(l.id) !== String(id));
    saveCustomListings(custom);
    return true;
  }
}

export async function getOwnerListings() {
  try {
    const res = await apiRequest('/owner/listings');
    return res.data;
  } catch (error) {
    return getStoredCustomListings();
  }
}
