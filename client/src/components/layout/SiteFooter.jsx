import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, MapPin, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SiteFooter() {
  const { loginAsDemoStudent, loginAsDemoOwner, user } = useAuth();

  return (
    <footer
      style={{
        backgroundColor: '#101E24',
        color: '#E2E8F0',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <img
                src="/logo.png"
                alt="Stayzy Logo"
                style={{
                  height: '40px',
                  width: 'auto',
                  borderRadius: '6px',
                  backgroundColor: '#fff',
                  padding: '2px',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-family-display)',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#FFFFFF',
                }}
              >
                Stayzy
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Find your vibe. Find your stay. Mumbai's student and intern-focused platform for verified PGs, hostels, and shared flats.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38BDF8', fontSize: '0.8rem' }}>
              <ShieldCheck size={16} />
              <span>Dedicated student accommodation network</span>
            </div>
          </div>

          {/* Stays & Areas */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem', fontWeight: 700 }}>
              Popular Localities
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/listings?area=Powai" style={{ color: '#94A3B8' }}>
                  Powai (Near IIT Bombay)
                </Link>
              </li>
              <li>
                <Link to="/listings?area=Andheri" style={{ color: '#94A3B8' }}>
                  Andheri (West & East Metro Hub)
                </Link>
              </li>
              <li>
                <Link to="/listings?area=Thane" style={{ color: '#94A3B8' }}>
                  Thane (Central Line Express)
                </Link>
              </li>
              <li>
                <Link to="/listings?area=Ghatkopar" style={{ color: '#94A3B8' }}>
                  Ghatkopar (Somaiya Vidyavihar)
                </Link>
              </li>
              <li>
                <Link to="/listings?area=Vashi" style={{ color: '#94A3B8' }}>
                  Vashi (Navi Mumbai Hub)
                </Link>
              </li>
              <li>
                <Link to="/listings?area=Dadar" style={{ color: '#94A3B8' }}>
                  Dadar (Central Interchange)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '1rem', fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/listings" style={{ color: '#94A3B8' }}>
                  Explore All Properties
                </Link>
              </li>
              <li>
                <Link to="/favorites" style={{ color: '#94A3B8' }}>
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link to="/owner/listings/new" style={{ color: '#94A3B8' }}>
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: '#94A3B8' }}>
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Demo Persona Switcher */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              Evaluation / Demo Switcher
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginBottom: '0.85rem', lineHeight: '1.5' }}>
              Easily toggle between Student and Property Owner roles to test dashboards and flows:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="btn btn-outline btn-sm"
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.2)',
                  justifyContent: 'flex-start',
                  fontSize: '0.8rem',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
                <span>Switch to Student Persona</span>
              </button>
              <button
                type="button"
                onClick={loginAsDemoOwner}
                className="btn btn-outline btn-sm"
                style={{
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.2)',
                  justifyContent: 'flex-start',
                  fontSize: '0.8rem',
                }}
              >
                <Sparkles size={14} style={{ color: 'var(--color-highlight)' }} />
                <span>Switch to Owner Persona</span>
              </button>
            </div>
            {user && (
              <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#38BDF8' }}>
                Active: {user.name} ({user.role})
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.8rem',
            color: '#64748B',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Stayzy Mumbai. Built with modern React and Express.
          </div>
          <div style={{ fontStyle: 'italic' }}>
            Demo showcase. Listings are sample data for exploration and evaluation.
          </div>
        </div>
      </div>
    </footer>
  );
}
