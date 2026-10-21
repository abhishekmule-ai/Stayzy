import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      className="page-container container animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-soft)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <Compass size={36} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-primary-dark)' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Looking for a stay that isn't here?
      </h2>
      <p style={{ color: 'var(--color-muted)', maxWidth: '460px', marginBottom: '2rem' }}>
        The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track to finding your vibe in Mumbai.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>Return Home</span>
        </Link>
        <Link to="/listings" className="btn btn-outline">
          <Search size={16} />
          <span>Browse All PGs & Hostels</span>
        </Link>
      </div>
    </div>
  );
}
