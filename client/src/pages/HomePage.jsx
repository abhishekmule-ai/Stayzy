import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Wallet,
  ShieldCheck,
  PhoneCall,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  Users
} from 'lucide-react';
import HeroSearch from '../components/search/HeroSearch';
import ListingCard from '../components/listings/ListingCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { getListings, getPopularAreas } from '../services/listingsService';

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredStays, setFeaturedStays] = useState([]);
  const [popularAreas, setPopularAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [listingsRes, areasRes] = await Promise.all([
          getListings({ limit: 6, sort: 'recommended' }),
          getPopularAreas(),
        ]);
        setFeaturedStays(listingsRes.data || []);
        setPopularAreas(areasRes || []);
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Section */}
      <section
        style={{
          position: 'relative',
          paddingTop: '3.5rem',
          paddingBottom: '4.5rem',
          background: 'linear-gradient(180deg, #F0F6F4 0%, var(--color-bg) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-primary-dark)',
              marginBottom: '1.25rem',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
            <span>A better place to start your next chapter</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: 'var(--color-text)',
              marginBottom: '1.15rem',
              letterSpacing: '-0.03em',
              lineHeight: '1.15',
            }}
          >
            Find a place that <span style={{ color: 'var(--color-primary)' }}>feels like yours.</span>
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: '680px',
              margin: '0 auto 2.25rem auto',
              lineHeight: '1.5',
            }}
          >
            Discover curated PGs, hostels, and shared flats near top colleges, transit lines, and workplace hubs across Mumbai.
          </p>

          {/* Prominent Search Panel */}
          <HeroSearch />

          {/* Stats Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '2.5rem',
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} style={{ color: 'var(--color-primary)' }} />
              <span><strong>85+</strong> Student properties listed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={18} style={{ color: 'var(--color-primary)' }} />
              <span><strong>1,200+</strong> Happy students matched</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
              <span><strong>100%</strong> Zero brokerage direct connects</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Areas Section */}
      <section id="areas" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                LOCALITIES
              </span>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800 }}>Explore Popular Hubs in Mumbai</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                Key student centers with easy metro and suburban railway connectivity.
              </p>
            </div>
            <Link
              to="/listings"
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>View all Mumbai areas</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Area Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {popularAreas.map((area, idx) => {
              const defaultAreaImages = ['/areas/1.jpg', '/areas/2.jpg', '/areas/3.avif', '/areas/4.jpg', '/areas/5.jpg', '/areas/6.jpg'];
              const imgSrc = area.image || defaultAreaImages[idx % defaultAreaImages.length] || '/areas/1.jpg';
              return (
              <div
                key={area.id || area.name}
                onClick={() => navigate(`/listings?area=${encodeURIComponent(area.name)}`)}
                className="card card-hoverable"
                style={{
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={imgSrc}
                    alt={area.name}
                    onError={(e) => { e.currentTarget.src = '/areas/1.jpg'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px', color: '#fff' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.2 }}>{area.name}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{area.tagline}</div>
                  </div>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-muted)', lineHeight: '1.4' }}>
                    {area.description}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: '0.6rem',
                      borderTop: '1px solid var(--color-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ color: 'var(--color-muted)' }}>From ₹{area.averageRent?.toLocaleString('en-IN') || '7,500'}/mo</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Browse stays &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* 3. Why Stayzy Section */}
      <section
        style={{
          padding: '4rem 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
              WHY STAYZY
            </span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Built specifically for student life in Mumbai
            </h2>
            <p style={{ color: 'var(--color-muted)' }}>
              We know shifting to Mumbai for college or internships can feel overwhelming. Stayzy makes discovering genuine stays transparent and hassle-free.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Benefit 1 */}
            <div
              style={{
                padding: '2rem',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Wallet size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Real Prices & True Budgets</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                All rents and deposits are shown upfront per bed or per room. No hidden commissions, no unexpected broker cuts, and no bait-and-switch rates.
              </p>
            </div>

            {/* Benefit 2 */}
            <div
              style={{
                padding: '2rem',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Compare Essentials that Matter</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Check vital student amenities right away: Wi-Fi speed, daily home meals, study desks, laundry provisions, and realistic transit minutes to college.
              </p>
            </div>

            {/* Benefit 3 */}
            <div
              style={{
                padding: '2rem',
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <PhoneCall size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Contact Owners Directly</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                Connect directly with property managers, hostel wardens, or flatmates. Submit quick move-in enquiries and arrange visits directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Stays Section */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="badge badge-highlight" style={{ marginBottom: '0.5rem' }}>
                FEATURED SELECTION
              </span>
              <h2 style={{ fontSize: '1.9rem', fontWeight: 800 }}>Top Rated Student Stays</h2>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                Handpicked PGs and hostels loved by current scholars and interns in Mumbai.
              </p>
            </div>
            <Link to="/listings" className="btn btn-primary btn-sm">
              Explore All Listings ({featuredStays.length}+)
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {featuredStays.slice(0, 6).map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: '4rem 0',
          backgroundColor: 'var(--color-primary-soft)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-neutral" style={{ backgroundColor: '#fff', marginBottom: '0.5rem' }}>
              SIMPLE PROCESS
            </span>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-primary-dark)' }}>
              How Stayzy Works
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Three straightforward steps to secure your student accommodation in Mumbai.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              position: 'relative',
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Search by Locality & Budget</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                Pick your preferred area near your university or office. Filter by sharing type and monthly rent.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Compare Essentials & Photos</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                Inspect authentic room images, check Wi-Fi, air conditioning, meal plans, house timings, and nearby stations.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  margin: '0 auto 1.25rem auto',
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Send Direct Enquiry</h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.875rem' }}>
                Submit an enquiry directly with your move-in date. Save favorites to your dashboard to review later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#17211F',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, maxWidth: '640px' }}>
              Are you a PG owner or hostel manager in Mumbai?
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '580px', fontSize: '1rem', lineHeight: '1.6' }}>
              List your property on Stayzy to connect directly with genuine students, scholars, and interns looking for quality accommodation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/owner/listings/new" className="btn btn-primary btn-lg">
                Post Your Property
              </Link>
              <Link to="/listings" className="btn btn-outline btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Browse Current Listings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
