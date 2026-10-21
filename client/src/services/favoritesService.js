import { apiRequest } from './api';

const FAVORITES_STORAGE_KEY = 'stayzy_saved_favorites';

export function getLocalFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['demo-1', 'demo-2']; // Pre-populate 2 for rich first impression
  } catch (e) {
    return [];
  }
}

export function saveLocalFavorites(ids) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to store favorites locally', e);
  }
}

export async function fetchFavorites() {
  try {
    const res = await apiRequest('/favorites');
    return { data: res.data, isDemo: false };
  } catch (error) {
    return { data: getLocalFavorites(), isDemo: true };
  }
}

export async function addFavorite(listingId) {
  try {
    await apiRequest(`/favorites/${listingId}`, { method: 'POST' });
  } catch (error) {
    // Demo mode: update local storage
    const current = getLocalFavorites();
    if (!current.includes(listingId)) {
      current.push(listingId);
      saveLocalFavorites(current);
    }
  }
  return true;
}

export async function removeFavorite(listingId) {
  try {
    await apiRequest(`/favorites/${listingId}`, { method: 'DELETE' });
  } catch (error) {
    // Demo mode: update local storage
    let current = getLocalFavorites();
    current = current.filter(id => id !== listingId);
    saveLocalFavorites(current);
  }
  return true;
}
