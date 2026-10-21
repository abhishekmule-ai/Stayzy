import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import ListingFilters from '../components/listings/ListingFilters';
import ListingGrid from '../components/listings/ListingGrid';
import ListingSort from '../components/listings/ListingSort';
import AppliedFilterChips from '../components/listings/AppliedFilterChips';
import Toast from '../components/ui/Toast';
import { getListings } from '../services/listingsService';

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [listings, setListings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoData, setIsDemoData] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract filters from URL query parameters
  const currentFilters = useMemo(() => {
    return {
      q: searchParams.get('q') || '',
      area: searchParams.get('area') || '',
      type: searchParams.get('type') || '',
      sharing: searchParams.get('sharing') || '',
      gender: searchParams.get('gender') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      amenities: searchParams.get('amenities') || '',
      sort: searchParams.get('sort') || 'recommended',
      page: searchParams.get('page') || '1',
    };
  }, [searchParams]);

  // Fetch listings whenever search params change
  useEffect(() => {
    let isMounted = true;
    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const res = await getListings(currentFilters);
        if (isMounted) {
          setListings(res.data || []);
          setTotalCount(res.pagination?.total ?? (res.data ? res.data.length : 0));
          setIsDemoData(res.isDemo);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchResults();
    return () => {
      isMounted = false;
    };
  }, [currentFilters]);

  // Update a single filter in URL search params
  const handleFilterChange = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === undefined || value === null || value === '' || value === 'all') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    // Reset to page 1 on filter alteration
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  // Remove a filter chip
  const handleRemoveChip = (chip) => {
    if (chip.isAmenity) {
      const current = currentFilters.amenities
        ? (Array.isArray(currentFilters.amenities)
            ? currentFilters.amenities
            : currentFilters.amenities.split(',').filter(Boolean))
        : [];
      const updated = current.filter((a) => a !== chip.value);
      handleFilterChange('amenities', updated.length > 0 ? updated.join(',') : '');
    } else {
      handleFilterChange(chip.key, '');
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Handle free text search
  const handleSearchInput = (e) => {
    e.preventDefault();
    const val = e.target.searchQuery.value;
    handleFilterChange('q', val);
  };

  return (
    <div className="page-container container animate-fade-in">
      {/* Top Banner if demo data */}
      {isDemoData && (
        <Toast
          type="info"
          message="Displaying curated sample listings for Mumbai areas. Real-time filtering, pricing, and amenities are active."
        />
      )}

      {/* Header & Free Text Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }}>
            Student PGs & Hostels in Mumbai
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
            Compare verified stays across Powai, Andheri, Thane, Ghatkopar, and Navi Mumbai.
          </p>
        </div>

        {/* Free text search bar */}
        <form
          onSubmit={handleSearchInput}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-surface)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.35rem 0.5rem 0.35rem 0.85rem',
            width: '100%',
            maxWidth: '380px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
          <input
            type="text"
            name="searchQuery"
            defaultValue={currentFilters.q}
            placeholder="Search by college, metro, or area..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '0.9rem',
            }}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.4rem 0.75rem' }}>
            Search
          </button>
        </form>
      </div>

      {/* Mobile Filter Trigger Button */}
      <div className="mobile-filter-bar" style={{ display: 'none', marginBottom: '1rem' }}>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
        >
          <SlidersHorizontal size={16} />
          <span>Filter & Refine Stays</span>
        </button>
      </div>

      {/* Two Column Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="listings-layout-grid"
      >
        {/* Left Column: Filters (Desktop Sticky) */}
        <div className="desktop-filters-wrapper" style={{ position: 'sticky', top: 'calc(var(--header-height) + 1.5rem)' }}>
          <ListingFilters
            filters={currentFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Right Column: Results, Sort, Chips, Grid */}
        <div style={{ minWidth: 0 }}>
          {/* Active Chips */}
          <AppliedFilterChips
            filters={currentFilters}
            onRemoveFilter={handleRemoveChip}
            onClearAll={handleResetFilters}
          />

          {/* Sort bar & count */}
          <ListingSort
            currentSort={currentFilters.sort}
            onSortChange={(val) => handleFilterChange('sort', val)}
            totalCount={totalCount}
          />

          {/* Main Grid / Skeletons / Empty */}
          <ListingGrid
            listings={listings}
            loading={loading}
            error={error}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '360px',
              height: '100%',
              backgroundColor: '#fff',
              overflowY: 'auto',
              padding: '1rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ListingFilters
              filters={currentFilters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onCloseMobile={() => setMobileFiltersOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .listings-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filters-wrapper {
            display: none !important;
          }
          .mobile-filter-bar {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
