import React from 'react';
import { X } from 'lucide-react';

export default function AppliedFilterChips({ filters, onRemoveFilter, onClearAll }) {
  const chips = [];

  if (filters.q) {
    chips.push({ key: 'q', label: `Search: "${filters.q}"` });
  }
  if (filters.area && filters.area !== 'all') {
    chips.push({ key: 'area', label: `Area: ${filters.area}` });
  }
  if (filters.type && filters.type !== 'all') {
    const typeNames = { pg: 'PG', hostel: 'Hostel', shared_flat: 'Shared Flat' };
    chips.push({ key: 'type', label: `Type: ${typeNames[filters.type] || filters.type}` });
  }
  if (filters.gender && filters.gender !== 'all') {
    const genderNames = { women: 'Girls only', men: 'Boys only', all: 'Co-ed / All' };
    chips.push({ key: 'gender', label: `Gender: ${genderNames[filters.gender] || filters.gender}` });
  }
  if (filters.sharing && filters.sharing !== 'all') {
    const sharingNames = {
      private: 'Private Room',
      twin: 'Twin Sharing',
      triple: '3 Sharing',
      four_sharing: '4 Sharing',
    };
    chips.push({ key: 'sharing', label: `Sharing: ${sharingNames[filters.sharing] || filters.sharing}` });
  }
  if (filters.minPrice) {
    chips.push({ key: 'minPrice', label: `Min: ₹${filters.minPrice}` });
  }
  if (filters.maxPrice) {
    chips.push({ key: 'maxPrice', label: `Max: ₹${filters.maxPrice}` });
  }
  if (filters.amenities) {
    const list = Array.isArray(filters.amenities)
      ? filters.amenities
      : filters.amenities.split(',').filter(Boolean);
    list.forEach((amenity) => {
      chips.push({ key: `amenity:${amenity}`, label: amenity, isAmenity: true, value: amenity });
    });
  }

  if (chips.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      <span style={{ fontSize: '0.825rem', color: 'var(--color-muted)', fontWeight: 600 }}>
        Active filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary-soft)',
            color: 'var(--color-primary-dark)',
            fontSize: '0.8rem',
            fontWeight: 500,
          }}
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemoveFilter(chip)}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'var(--color-primary-dark)',
              background: 'none',
              border: 'none',
              padding: '1px',
            }}
            aria-label={`Remove filter ${chip.label}`}
          >
            <X size={13} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        style={{
          fontSize: '0.8rem',
          color: 'var(--color-danger)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          marginLeft: '0.25rem',
          textDecoration: 'underline',
        }}
      >
        Clear all
      </button>
    </div>
  );
}
