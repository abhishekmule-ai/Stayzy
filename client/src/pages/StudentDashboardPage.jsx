import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Heart,
  Send,
  User,
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getListings } from '../services/listingsService';
import { getStudentEnquiries } from '../services/enquiriesService';
import ListingCard from '../components/listings/ListingCard';

export default function StudentDashboardPage() {
  const { user, isAuthenticated, loginAsDemoStudent } = useAuth();
  const { favoriteIds } = useFavorites();
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [favoriteListings, setFavoriteListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      try {
        const [enqRes, listingsRes] = await Promise.all([
          getStudentEnquiries(),
          getListings({ limit: 50 }),
        ]);

        setEnquiries(enqRes.data || []);
        const allListings = listingsRes.data || [];
        setFavoriteListings(allListings.filter((l) => favoriteIds.includes(String(l.id))));
      } catch (err) {
        console.error('Failed to load student dashboard', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [favoriteIds]);

  if (!isAuthenticated) {
    return (
      <div className="page-container container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Sign In Required</h2>
        <p style={{ color: 'var(--color-muted)', margin: '1rem 0 2rem' }}>
          Please sign in to view your student dashboard, recent enquiries, and saved stays.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
          <button type="button" onClick={loginAsDemoStudent} className="btn btn-outline">
            Use Demo Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          padding: '2rem',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-soft) 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 800,
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-primary">STUDENT ACCOUNT</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Verified Explorer</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome, {user.name}</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {user.email} • Mumbai Accommodation Portal
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/listings" className="btn btn-primary">
            Search More Stays
          </Link>
          <Link to="/favorites" className="btn btn-outline">
            Saved ({favoriteIds.length})
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Enquiries & Saved Shortlist */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="dashboard-two-col"
      >
        {/* Column 1: My Enquiries */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={18} style={{ color: 'var(--color-primary)' }} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Your Recent Enquiries</h2>
            </div>
            <span className="badge badge-neutral">{enquiries.length} submitted</span>
          </div>

          {enquiries.length === 0 ? (
            <div
              className="card"
              style={{
                padding: '2.5rem',
                textAlign: 'center',
                color: 'var(--color-muted)',
              }}
            >
              <p style={{ marginBottom: '1rem' }}>You haven't submitted any enquiries to property managers yet.</p>
              <Link to="/listings" className="btn btn-secondary btn-sm">
                Browse PGs & Hostels
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="card"
                  style={{
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                        {enq.listingTitle || 'Stay Enquiry'}
                      </h3>
                      {enq.area && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--color-primary)', marginTop: '2px' }}>
                          <MapPin size={12} />
                          <span>{enq.area}</span>
                        </div>
                      )}
                    </div>
                    <span className={`badge ${enq.status === 'contacted' ? 'badge-success' : 'badge-highlight'}`}>
                      {enq.status === 'contacted' ? 'Contacted by Host' : 'Pending Response'}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      backgroundColor: 'var(--color-bg)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      margin: '0.75rem 0',
                      fontStyle: 'italic',
                    }}
                  >
                    "{enq.message}"
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem',
                      color: 'var(--color-muted)',
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: '0.6rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} />
                      <span>Move-in: {enq.moveInDate || 'Flexible'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} />
                      <span>{new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Saved Stays Snippet & Profile Details */}
        <div>
          {/* Profile Card */}
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Student Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--color-muted)' }}>Name: </span>
                <strong>{user.name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-muted)' }}>Email: </span>
                <span>{user.email}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-muted)' }}>Phone: </span>
                <span>{user.phone || 'Not added'}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-muted)' }}>Institution: </span>
                <span>{user.college || 'Mumbai Student'}</span>
              </div>
            </div>
          </div>

          {/* Saved Stays */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} style={{ color: 'var(--color-danger)' }} fill="var(--color-danger)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Saved Stays ({favoriteListings.length})</h3>
            </div>
            <Link to="/favorites" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              View all
            </Link>
          </div>

          {favoriteListings.length === 0 ? (
            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--color-muted)' }}>
              <p style={{ fontSize: '0.875rem' }}>No saved properties yet.</p>
              <Link to="/listings" className="btn btn-outline btn-sm" style={{ marginTop: '0.75rem' }}>
                Browse Stays
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {favoriteListings.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/listings/${item.id}`}
                  className="card card-hoverable"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <img
                    src={item.imageUrl || item.imageUrls?.[0]}
                    alt={item.title}
                    style={{ width: '64px', height: '54px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ minWidth: 0, flexGrow: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      {item.area} &bull; ₹{item.monthlyPrice?.toLocaleString('en-IN')}/mo
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .dashboard-two-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
