import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchFavorites, addFavorite, removeFavorite, getLocalFavorites } from '../services/favoritesService';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(getLocalFavorites());
  const [isDemoStorage, setIsDemoStorage] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchFavorites();
        if (Array.isArray(res.data)) {
          setFavoriteIds(res.data.map(item => (typeof item === 'string' ? item : item.listingId || item.id)));
        }
        setIsDemoStorage(res.isDemo);
      } catch (err) {
        setFavoriteIds(getLocalFavorites());
        setIsDemoStorage(true);
      }
    }
    load();
  }, [user]);

  const toggleFavorite = async (id) => {
    const listingId = String(id);
    const exists = favoriteIds.includes(listingId);

    if (exists) {
      setFavoriteIds(prev => prev.filter(x => x !== listingId));
      await removeFavorite(listingId);
    } else {
      setFavoriteIds(prev => [...prev, listingId]);
      await addFavorite(listingId);
    }
  };

  const isFavorite = (id) => {
    return favoriteIds.includes(String(id));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        isFavorite,
        toggleFavorite,
        favoritesCount: favoriteIds.length,
        isDemoStorage
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
