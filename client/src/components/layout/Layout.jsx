import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Demo Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-soft)',
          borderBottom: '1px solid var(--color-primary-soft-hover)',
          padding: '0.4rem 1rem',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--color-primary-dark)',
          fontWeight: 600,
        }}
      >
        <span>🌟 Welcome to Stayzy Mumbai — Find your vibe. Find your stay. Sample listings are active for testing & preview.</span>
      </div>

      <SiteHeader />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
