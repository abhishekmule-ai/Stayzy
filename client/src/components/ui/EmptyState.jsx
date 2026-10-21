import React from 'react';
import { Home, SearchX, Heart, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon = 'search',
  title = 'No results found',
  description = 'Try adjusting your filters or expanding your search budget to explore more properties.',
  actionText,
  actionLink,
  onAction,
}) {
  const icons = {
    search: SearchX,
    favorites: Heart,
    home: Home,
    error: AlertCircle
  };

  const IconComponent = icons[icon] || SearchX;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        maxWidth: '480px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-soft)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem'
        }}
      >
        <IconComponent size={30} strokeWidth={2} />
      </div>

      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
        {title}
      </h3>

      <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}

      {actionText && !actionLink && onAction && (
        <button type="button" onClick={onAction} className="btn btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
}
