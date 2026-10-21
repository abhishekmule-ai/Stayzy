import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoriteButton({ listingId, size = 20, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(listingId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(listingId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? 'Remove from saved stays' : 'Save to favorites'}
      title={active ? 'Saved' : 'Save listing'}
      className={`favorite-btn ${className}`}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      <Heart
        size={size}
        strokeWidth={2}
        fill={active ? 'var(--color-danger)' : 'transparent'}
        color={active ? 'var(--color-danger)' : '#334155'}
        style={{
          transform: active ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      />
    </button>
  );
}
