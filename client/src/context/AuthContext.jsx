import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as authLogin, register as authRegister, logout as authLogout, DEMO_STUDENT, DEMO_OWNER } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial user
    const existing = getCurrentUser();
    if (existing) {
      setUser(existing);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authLogin(email, password);
    setUser(res.user);
    return res;
  };

  const register = async (userData) => {
    const res = await authRegister(userData);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
  };

  // Quick switch helpers for testing and demo evaluation
  const loginAsDemoStudent = () => {
    return login(DEMO_STUDENT.email, 'password123');
  };

  const loginAsDemoOwner = () => {
    return login(DEMO_OWNER.email, 'password123');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isOwner: user?.role === 'owner',
        login,
        register,
        logout,
        loginAsDemoStudent,
        loginAsDemoOwner
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
