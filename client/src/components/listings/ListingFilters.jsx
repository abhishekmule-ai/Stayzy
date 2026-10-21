import React from 'react';
import { SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

const AREAS = [
  'All Areas',
  'Powai',
  'Andheri',
  'Thane',
  'Ghatkopar',
  'Vashi',
  'Dadar',
];

const PROPERTY_TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'pg', label: 'PG (Paying Guest)' },
  { id: 'hostel', label: 'Student Hostel' },
  { id: 'shared_flat', label: 'Shared Flat' },
];

const GENDER_OPTIONS = [
  { id: 'all', label: 'All / Co-ed' },
  { id: 'women', label: 'Girls Only' },
  { id: 'men', label: 'Boys Only' },
];

const SHARING_OPTIONS = [
  { id: 'all', label: 'Any Sharing' },
  { id: 'private', label: 'Private Room' },
  { id: 'twin', label: 'Twin Sharing' },
  { id: 'triple', label: '3 Sharing' },
  { id: 'four_sharing', label: '4 Sharing' },
];

const AVAILABLE_AMENITIES = [
  'Wi-Fi',
  'Meals',
  'AC',
  'Laundry',
  'Housekeeping',
  'Security',
  'Attached Bathroom',
  'Power Backup',
];

export default function ListingFilters({
  filters,
  onFilterChange,
  onResetFilters,
  onCloseMobile,
  isMobileDrawer = false,
}) {
  const currentAmenities = filters.amenities
    ? (Array.isArray(filters.amenities)
        ? filters.amenities
        : filters.amenities.split(',').filter(Boolean))
    : [];

  const handleAmenityToggle = (amenity) => {
    let updated;
    if (currentAmenities.includes(amenity)) {
      updated = currentAmenities.filter((a) => a !== amenity);
    } else {
      updated = [...currentAmenities, amenity];
    }
    onFilterChange('amenities', updated.length > 0 ? updated.join(',') : '');
  };

  const handlePricePreset = (min, max) => {
    onFilterChange('minPrice', min);
    onFilterChange('maxPrice', max);
  };

  return (
    <aside
      className="listing-filters-panel"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--color-primary)' }} />
          <span>Filters</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={onResetFilters}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.8rem', color: 'var(--color-muted)', padding: '0.25rem 0.5rem' }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="btn btn-ghost btn-sm"
              aria-label="Close filters drawer"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Area / Locality */}
      <div className="form-group">
        <label htmlFor="filter-area" className="form-label">
          Locality / Area
        </label>
        <select
          id="filter-area"
          value={filters.area || 'all'}
          onChange={(e) => onFilterChange('area', e.target.value === 'All Areas' ? 'all' : e.target.value)}
          className="form-select"
        >
          {AREAS.map((a) => (
            <option key={a} value={a === 'All Areas' ? 'all' : a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div className="form-group">
        <label className="form-label">Monthly Budget (₹)</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="number"
            placeholder="Min (e.g. 5000)"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="form-input"
            aria-label="Minimum monthly budget"
          />
          <input
            type="number"
            placeholder="Max (e.g. 15000)"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="form-input"
            aria-label="Maximum monthly budget"
          />
        </div>
        {/* Quick Budget Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
          <button
            type="button"
            onClick={() => handlePricePreset('4000', '8000')}
            className="badge badge-neutral"
            style={{ cursor: 'pointer', border: '1px solid var(--color-border)' }}
          >
            Under ₹8k
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset('8000', '13000')}
            className="badge badge-neutral"
            style={{ cursor: 'pointer', border: '1px solid var(--color-border)' }}
          >
            ₹8k – ₹13k
          </button>
          <button
            type="button"
            onClick={() => handlePricePreset('13000', '25000')}
            className="badge badge-neutral"
            style={{ cursor: 'pointer', border: '1px solid var(--color-border)' }}
          >
            ₹13k+
          </button>
        </div>
      </div>

      {/* Property Type */}
      <div className="form-group">
        <label className="form-label">Property Type</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {PROPERTY_TYPES.map((pt) => {
            const isSelected = (filters.type || 'all') === pt.id;
            return (
              <label
                key={pt.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={pt.id}
                  checked={isSelected}
                  onChange={() => onFilterChange('type', pt.id)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                {pt.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Gender Preference */}
      <div className="form-group">
        <label className="form-label">Suitable For</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
          {GENDER_OPTIONS.map((opt) => {
            const isSelected = (filters.gender || 'all') === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onFilterChange('gender', opt.id)}
                style={{
                  padding: '0.45rem 0.25rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: isSelected ? 'var(--color-primary-soft)' : 'var(--color-surface)',
                  color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text)',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Sharing */}
      <div className="form-group">
        <label htmlFor="filter-sharing" className="form-label">
          Room Sharing
        </label>
        <select
          id="filter-sharing"
          value={filters.sharing || 'all'}
          onChange={(e) => onFilterChange('sharing', e.target.value)}
          className="form-select"
        >
          {SHARING_OPTIONS.map((so) => (
            <option key={so.id} value={so.id}>
              {so.label}
            </option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div className="form-group" style={{ marginBottom: '0.5rem' }}>
        <label className="form-label">Amenities</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
          {AVAILABLE_AMENITIES.map((amenity) => {
            const checked = currentAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  color: checked ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  fontWeight: checked ? 600 : 400,
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAmenityToggle(amenity)}
                  style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {isMobileDrawer && (
        <button
          type="button"
          onClick={onCloseMobile}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '1.5rem' }}
        >
          Apply Filters
        </button>
      )}
    </aside>
  );
}
