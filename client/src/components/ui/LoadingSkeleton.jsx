import React from 'react';

export default function LoadingSkeleton({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', width: '100%' }}>
        {items.map((_, i) => (
          <div
            key={i}
            className="card"
            style={{
              overflow: 'hidden',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          >
            <div style={{ height: '220px', backgroundColor: 'var(--color-border)' }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ height: '18px', backgroundColor: 'var(--color-border)', borderRadius: '4px', width: '40%', marginBottom: '0.75rem' }} />
              <div style={{ height: '22px', backgroundColor: 'var(--color-border)', borderRadius: '4px', width: '85%', marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ height: '24px', backgroundColor: 'var(--color-border)', borderRadius: '12px', width: '60px' }} />
                <div style={{ height: '24px', backgroundColor: 'var(--color-border)', borderRadius: '12px', width: '80px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                <div style={{ height: '26px', backgroundColor: 'var(--color-border)', borderRadius: '4px', width: '100px' }} />
                <div style={{ height: '32px', backgroundColor: 'var(--color-border)', borderRadius: '8px', width: '90px' }} />
              </div>
            </div>
          </div>
        ))}
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.9; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-muted)' }}>
      Loading content...
    </div>
  );
}
