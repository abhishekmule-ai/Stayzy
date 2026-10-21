import { apiRequest } from './api';

const TOKEN_KEY = 'stayzy_auth_token';
const USER_KEY = 'stayzy_user_info';

export const DEMO_STUDENT = {
  id: 'usr-student-1',
  name: 'Aarav Sharma',
  email: 'student@stayzy.in',
  role: 'student',
  phone: '+91 98765 43210',
  college: 'IIT Bombay / NMIMS',
  createdAt: '2026-01-15T10:00:00Z',
};

export const DEMO_OWNER = {
  id: 'usr-owner-1',
  name: 'Suresh Kulkarni',
  email: 'owner@stayzy.in',
  role: 'owner',
  phone: '+91 98201 55432',
  company: 'Kulkarni Hospitality Stays',
  createdAt: '2026-01-10T10:00:00Z',
};

export async function login(email, password) {
  try {
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    if (res.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
    return { user: res.user, isDemo: false };
  } catch (error) {
    // If API failed or in demo mode, authenticate against demo users or simulated login
    const normalizedEmail = email.toLowerCase().trim();
    if (normalizedEmail === 'owner@stayzy.in') {
      const user = { ...DEMO_OWNER };
      localStorage.setItem(TOKEN_KEY, 'demo_owner_token');
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { user, isDemo: true };
    }

    if (normalizedEmail === 'student@stayzy.in' || normalizedEmail.includes('student')) {
      const user = { ...DEMO_STUDENT, email: normalizedEmail };
      localStorage.setItem(TOKEN_KEY, 'demo_student_token');
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { user, isDemo: true };
    }

    // Dynamic mock user for any other email
    const inferredRole = normalizedEmail.includes('owner') ? 'owner' : 'student';
    const user = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email: normalizedEmail,
      role: inferredRole,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(TOKEN_KEY, 'demo_generic_token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, isDemo: true };
  }
}

export async function register(userData) {
  try {
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (res.token) {
      localStorage.setItem(TOKEN_KEY, res.token);
    }
    if (res.user) {
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
    return { user: res.user, isDemo: false };
  } catch (error) {
    // Local demo fallback
    const user = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'student',
      phone: userData.phone || '',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(TOKEN_KEY, 'demo_registered_token');
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { user, isDemo: true };
  }
}

export async function logout() {
  try {
    await apiRequest('/auth/logout', { method: 'POST' });
  } catch (e) {
    // Ignore error
  } finally {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
