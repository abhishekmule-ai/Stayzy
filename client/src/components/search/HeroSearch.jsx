import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, IndianRupee, Home, ArrowRight } from 'lucide-react';

const LOCALITY_SUGGESTIONS = [
  'Powai',
  'Andheri',
  'Thane',
  'Ghatkopar',
  'Vashi',
  'Dadar',
];

const BUDGET_OPTIONS = [
  { label: 'Any Budget', min: '', max: '' },
  { label: 'Under ₹8,000', min: '0', max: '8000' },
  { label: '₹8,000 – ₹13,000', min: '8000', max: '13000' },
  { label: '₹13,000 – ₹20,000', min: '13000', max: '20000' },
  { label: '₹20,000+', min: '20000', max: '' },
];

const TYPE_OPTIONS = [
  { label: 'All Property Types', value: 'all' },
  { label: 'PG (Paying Guest)', value: 'pg' },
  { label: 'Student Hostel', value: 'hostel' },
  { label: 'Shared Flat', value: 'shared_flat' },
];

export default function HeroSearch() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [budgetIndex, setBudgetIndex] = useState('0');
  const [type, setType] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (area.trim()) {
      params.append('area', area.trim());
    }

    const selectedBudget = BUDGET_OPTIONS[parseInt(budgetIndex, 10)] || BUDGET_OPTIONS[0];
    if (selectedBudget.min) params.append('minPrice', selectedBudget.min);
    if (selectedBudget.max) params.append('maxPrice', selectedBudget.max);

    if (type && type !== 'all') {
      params.append('type', type);
    }

    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        boxShadow: 'var(--shadow-dropdown)',
        border: '1px solid var(--color-border)',
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* Locality Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label
            htmlFor="hero-locality"
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <MapPin size={13} style={{ color: 'var(--color-primary)' }} />
            <span>Locality / Area</span>
          </label>
          <input
            id="hero-locality"
            list="hero-localities"
            type="text"
            placeholder="e.g. Powai, Thane, Andheri"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="form-input"
            style={{
              border: 'none',
              backgroundColor: 'var(--color-bg)',
              fontWeight: 500,
              padding: '0.65rem 0.85rem',
            }}
          />
          <datalist id="hero-localities">
            {LOCALITY_SUGGESTIONS.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </div>

        {/* Budget Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label
            htmlFor="hero-budget"
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <IndianRupee size={13} style={{ color: 'var(--color-primary)' }} />
            <span>Monthly Budget</span>
          </label>
          <select
            id="hero-budget"
            value={budgetIndex}
            onChange={(e) => setBudgetIndex(e.target.value)}
            className="form-select"
            style={{
              border: 'none',
              backgroundColor: 'var(--color-bg)',
              fontWeight: 500,
              padding: '0.65rem 0.85rem',
            }}
          >
            {BUDGET_OPTIONS.map((opt, idx) => (
              <option key={opt.label} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label
            htmlFor="hero-type"
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--color-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <Home size={13} style={{ color: 'var(--color-primary)' }} />
            <span>Stay Type</span>
          </label>
          <select
            id="hero-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
            style={{
              border: 'none',
              backgroundColor: 'var(--color-bg)',
              fontWeight: 500,
              padding: '0.65rem 0.85rem',
            }}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div style={{ alignSelf: 'flex-end', paddingTop: '0.2rem' }}>
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              padding: '0.75rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              gap: '0.5rem',
            }}
          >
            <Search size={18} strokeWidth={2.5} />
            <span>Find Stays</span>
          </button>
        </div>
      </form>

      {/* Popular Area Quick Suggestions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginTop: '0.9rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--color-border)',
          fontSize: '0.8rem',
          color: 'var(--color-muted)',
        }}
      >
        <span style={{ fontWeight: 600 }}>Quick areas:</span>
        {LOCALITY_SUGGESTIONS.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => {
              setArea(loc);
              navigate(`/listings?area=${encodeURIComponent(loc)}`);
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '2px 6px',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--color-primary)',
              cursor: 'pointer',
              fontWeight: 500,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
