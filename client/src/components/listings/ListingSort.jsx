import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export default function ListingSort({ currentSort = 'recommended', onSortChange, totalCount = 0 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)' }}>
        Showing <span style={{ color: 'var(--color-primary)' }}>{totalCount}</span> {totalCount === 1 ? 'property' : 'properties'}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ArrowUpDown size={16} style={{ color: 'var(--color-muted)' }} />
        <label htmlFor="listing-sort-select" style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 500 }}>
          Sort by:
        </label>
        <select
          id="listing-sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="form-select"
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.875rem',
            borderRadius: 'var(--radius-sm)',
            width: 'auto',
            minWidth: '170px',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <option value="recommended">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  );
}
