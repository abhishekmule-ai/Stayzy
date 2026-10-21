import React from 'react';

export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function PriceLabel({ price, period = 'month', unit = 'bed', size = 'md', className = '' }) {
  const formatted = formatINR(price);

  const sizeClasses = {
    sm: { price: '0.95rem', sub: '0.75rem' },
    md: { price: '1.25rem', sub: '0.85rem' },
    lg: { price: '1.65rem', sub: '0.95rem' },
  }[size] || { price: '1.25rem', sub: '0.85rem' };

  return (
    <div
      className={`price-label ${className}`}
      style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.25rem' }}
    >
      <span
        style={{
          fontSize: sizeClasses.price,
          fontWeight: 800,
          color: 'var(--color-primary-dark)',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-family-display)'
        }}
      >
        {formatted}
      </span>
      <span
        style={{
          fontSize: sizeClasses.sub,
          color: 'var(--color-muted)',
          fontWeight: 500
        }}
      >
        /{unit ? `${unit}/` : ''}{period}
      </span>
    </div>
  );
}
