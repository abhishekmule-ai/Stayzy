import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getListings } from '../services/listingsService';
import ListingCard from '../components/listings/ListingCard';
import EmptyState from '../components/ui/EmptyState';
import Toast from '../components/ui/Toast';

export default function FavoritesPage() {
  const { favoriteIds, isDemoStorage, toggleFavorite } = useFavorites();
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      setLoading(true);
      try {
        const res = await getListings({ limit: 100 });
        const all = res.data || [];
        const matching = all.filter((l) => favoriteIds.includes(String(l.id)));
        setSavedListings(matching);
      } catch (err) {
        console.error('Failed to load favorites', err);
      } finally {
        setLoading(false);
      }
    }

    loadSaved();
  }, [favoriteIds]);

  return (
    <div className="page-container container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Heart size={24} style={{ color: 'var(--color-danger)' }} fill="var(--color-danger)" />
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }}>
            Saved Properties
          </h1>
        </div>
        <p style={{ color: 'var(--color-muted)' }}>
          Review and compare your shortlisted PGs and hostels.
        </p>
      </div>

      {isDemoStorage && (
        <Toast
          type="info"
          message="Favorites are currently saved locally on this browser session for easy demo exploration."
        />
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-muted)' }}>
          Loading your saved stays...
        </div>
      ) : savedListings.length === 0 ? (
        <EmptyState
          icon="favorites"
          title="No saved stays yet"
          description="Click the heart icon on any PG or hostel card while browsing to save properties here for easy comparison."
          actionText="Explore Student Stays"
          actionLink="/listings"
        />
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              fontSize: '0.9rem',
              color: 'var(--color-muted)',
            }}
          >
            <span>You have {savedListings.length} saved {savedListings.length === 1 ? 'property' : 'properties'}</span>
            <Link to="/listings" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Discover more &rarr;
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {savedListings.map((listing) => (
              <div key={listing.id} style={{ position: 'relative' }}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
