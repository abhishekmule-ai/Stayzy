import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Heart,
  PlusCircle,
  User,
  LogOut,
  LayoutDashboard,
  Building,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function SiteHeader() {
  const { user, logout, isOwner, isStudent, loginAsDemoStudent, loginAsDemoOwner } = useAuth();
  const { favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
          }}
          onClick={closeMobile}
        >
          <img
            src="/logo.png"
            alt="Stayzy Logo"
            style={{
              height: '44px',
              width: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: 'var(--color-text)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Stayzy
            </span>
            <span
              style={{
                fontSize: '0.65rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                marginTop: '2px',
              }}
            >
              FIND YOUR VIBE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          <Link
            to="/listings"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: location.pathname === '/listings' ? 'var(--color-primary)' : 'var(--color-text)',
            }}
          >
            Explore Stays
          </Link>
          <Link
            to="/listings?type=pg"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            PGs
          </Link>
          <Link
            to="/listings?type=hostel"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            Hostels
          </Link>
          <Link
            to="/listings?type=shared_flat"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            Shared Flats
          </Link>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Saved Stays Link */}
          <Link
            to="/favorites"
            aria-label="Saved listings"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              color: favoritesCount > 0 ? 'var(--color-danger)' : 'var(--color-text-secondary)',
              transition: 'all 0.15s ease',
            }}
            title="Saved Stays"
          >
            <Heart size={19} fill={favoritesCount > 0 ? 'var(--color-danger)' : 'transparent'} />
            {favoritesCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: 'var(--color-danger)',
                  color: '#FFFFFF',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* List Your Property CTA */}
          <Link
            to={isOwner ? '/owner/listings/new' : '/owner/dashboard'}
            className="btn btn-secondary btn-sm desktop-only-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 600,
            }}
          >
            <PlusCircle size={15} />
            <span>List Property</span>
          </Link>

          {/* User Account / Auth */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name || 'Account'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '220px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-dropdown)',
                    padding: '0.5rem',
                    zIndex: 100,
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border)', marginBottom: '0.35rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{user.email}</div>
                    <span className="badge badge-primary" style={{ marginTop: '0.35rem', fontSize: '0.7rem' }}>
                      {user.role === 'owner' ? 'Property Owner' : 'Student / Tenant'}
                    </span>
                  </div>

                  {user.role === 'owner' ? (
                    <>
                      <Link
                        to="/owner/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        <LayoutDashboard size={15} />
                        <span>Owner Dashboard</span>
                      </Link>
                      <Link
                        to="/owner/listings/new"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        <PlusCircle size={15} />
                        <span>Create New Listing</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.875rem',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <GraduationCap size={15} />
                      <span>Student Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/favorites"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <Heart size={15} />
                    <span>Saved Stays ({favoritesCount})</span>
                  </Link>

                  <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.35rem 0' }} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-danger)',
                      width: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm desktop-only-btn" style={{ display: 'none' }}>
                Join Stayzy
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 40,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            overflowY: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
            <Link to="/listings" onClick={closeMobile} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              Explore All Stays
            </Link>
            <Link to="/listings?type=pg" onClick={closeMobile} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              PGs (Paying Guest)
            </Link>
            <Link to="/listings?type=hostel" onClick={closeMobile} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              Student Hostels
            </Link>
            <Link to="/listings?type=shared_flat" onClick={closeMobile} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              Shared Flats
            </Link>
            <Link to="/favorites" onClick={closeMobile} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              Saved Properties ({favoritesCount})
            </Link>
            {user ? (
              <Link
                to={user.role === 'owner' ? '/owner/dashboard' : '/dashboard'}
                onClick={closeMobile}
                style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={closeMobile} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                  Sign In
                </Link>
                <Link to="/register" onClick={closeMobile} className="btn btn-primary">
                  Create Account
                </Link>
              </>
            )}
            <Link to="/owner/listings/new" onClick={closeMobile} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
              <PlusCircle size={16} />
              <span>List Your Property</span>
            </Link>
          </nav>

          {/* Quick Demo Mode switcher for mobile testers */}
          <div style={{ marginTop: 'auto', padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
              QUICK DEMO ROLES
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => { loginAsDemoStudent(); closeMobile(); }}
                className="btn btn-outline btn-sm"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => { loginAsDemoOwner(); closeMobile(); }}
                className="btn btn-outline btn-sm"
              >
                Demo Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for media queries */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-only-btn {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
