/**
 * API client configuration for Stayzy.
 * Configurable via VITE_API_URL, defaults to '/api/v1' or 'http://localhost:5000/api/v1'
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('stayzy_auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If backend connection fails (network error, connection refused)
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      err.isNetworkError = true;
    }
    throw err;
  }
}

export { API_BASE };
