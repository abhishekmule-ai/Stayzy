import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Users,
  Shield,
  Star,
  Train,
  CheckCircle2,
  Calendar,
  Send,
  ArrowLeft,
  Building,
  Heart,
  Share2,
  Phone,
  Info
} from 'lucide-react';
import PriceLabel, { formatINR } from '../components/ui/PriceLabel';
import AmenityBadge from '../components/ui/AmenityBadge';
import FavoriteButton from '../components/ui/FavoriteButton';
import Toast from '../components/ui/Toast';
import ListingCard from '../components/listings/ListingCard';
import { getListingById, getListings } from '../services/listingsService';
import { submitEnquiry } from '../services/enquiriesService';
import { useAuth } from '../context/AuthContext';

export default function ListingDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [similarListings, setSimilarListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Enquiry Form State
  const [formName, setFormName] = useState(user?.name || '');
  const [formEmail, setFormEmail] = useState(user?.email || '');
  const [formPhone, setFormPhone] = useState(user?.phone || '');
  const [formMoveInDate, setFormMoveInDate] = useState('');
  const [formMessage, setFormMessage] = useState('Hi, I am interested in this stay and would like to check availability and schedule a visit.');
  const [formConsent, setFormConsent] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(null);
  const [enquiryError, setEnquiryError] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      setError(null);
      setEnquirySuccess(null);
      try {
        const res = await getListingById(id);
        if (isMounted) {
          setListing(res.data);
          setActiveImageIndex(0);

          // Fetch similar listings from same area or property type
          const similarRes = await getListings({
            area: res.data.area,
            limit: 3,
          });
          if (isMounted) {
            setSimilarListings(
              (similarRes.data || []).filter((item) => String(item.id) !== String(id))
            );
          }
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Sync user info into form if logged in
  useEffect(() => {
    if (user) {
      if (!formName) setFormName(user.name || '');
      if (!formEmail) setFormEmail(user.email || '');
      if (!formPhone && user.phone) setFormPhone(user.phone || '');
    }
  }, [user]);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryError(null);

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setEnquiryError('Please fill in your name, email, and message.');
      return;
    }
    if (!formConsent) {
      setEnquiryError('Please check the consent box to send your contact details to the host.');
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await submitEnquiry(id, {
        listingTitle: listing.title,
        area: listing.area,
        name: formName.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        moveInDate: formMoveInDate || null,
        message: formMessage.trim(),
      });

      setEnquirySuccess(
        res.isDemo
          ? 'Enquiry submitted in demo mode! You can review your enquiry in the Student Dashboard.'
          : 'Your enquiry has been successfully delivered to the property manager!'
      );
    } catch (err) {
      setEnquiryError(err.message || 'Failed to submit enquiry. Please retry.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="page-container container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>Loading property details...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="page-container container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Property Not Found</h2>
        <p style={{ color: 'var(--color-muted)', margin: '1rem 0 2rem' }}>
          The listing you are trying to view might have been removed or is temporarily unavailable.
        </p>
        <Link to="/listings" className="btn btn-primary">
          Back to All Listings
        </Link>
      </div>
    );
  }

  const images = listing.imageUrls?.length
    ? listing.imageUrls
    : [listing.imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'];

  const sharingLabels = {
    private: 'Private Room',
    twin: 'Twin Sharing',
    triple: '3 Sharing (Triple)',
    four_sharing: '4 Sharing (Quad)',
  };

  const genderLabels = {
    women: 'Girls Only',
    men: 'Boys Only',
    all: 'Co-ed / Everyone Welcome',
  };

  const propertyTypeLabels = {
    pg: 'Paying Guest (PG)',
    hostel: 'Student Hostel',
    shared_flat: 'Furnished Shared Flat',
  };

  return (
    <div className="page-container container animate-fade-in">
      {/* Back button & quick navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <Link
          to="/listings"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--color-primary-dark)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to search results</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleShare}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Share2 size={14} />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
          <FavoriteButton listingId={listing.id} />
        </div>
      </div>

      {/* Main Layout Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 380px',
          gap: '2.5rem',
          alignItems: 'start',
        }}
        className="details-layout-grid"
      >
        {/* Left Column: Gallery, Specs, Description, Rules */}
        <div>
          {/* Gallery Showcase */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
            <div style={{ height: '420px', backgroundColor: '#E2E8F0', position: 'relative' }}>
              <img
                src={images[activeImageIndex]}
                alt={`${listing.title} view ${activeImageIndex + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  gap: '0.5rem',
                }}
              >
                <span className="badge badge-primary">{propertyTypeLabels[listing.propertyType] || 'PG'}</span>
                <span className="badge badge-highlight">{genderLabels[listing.genderPreference] || 'Co-ed'}</span>
                {listing.isDemo && (
                  <span className="badge" style={{ backgroundColor: 'rgba(0,0,0,0.75)', color: '#fff' }}>
                    SAMPLE PROPERTY
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-surface)',
                  overflowX: 'auto',
                }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: `2px solid ${idx === activeImageIndex ? 'var(--color-primary)' : 'transparent'}`,
                      opacity: idx === activeImageIndex ? 1 : 0.65,
                      cursor: 'pointer',
                      flexShrink: 0,
                      padding: 0,
                    }}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                marginBottom: '0.4rem',
              }}
            >
              <MapPin size={16} />
              <span>{listing.area}, {listing.city || 'Mumbai'}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '0.75rem' }}>
              {listing.title}
            </h1>

            {listing.addressPublic && (
              <p style={{ color: 'var(--color-muted)', fontSize: '0.925rem', marginBottom: '0.75rem' }}>
                📍 Approximate locality: {listing.addressPublic}
              </p>
            )}

            {listing.transitInfo && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: 'var(--color-primary-soft)',
                  color: 'var(--color-primary-dark)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                <Train size={15} />
                <span>Transit: {listing.transitInfo}</span>
              </div>
            )}
          </div>

          {/* Quick Specifications Bar */}
          <div
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Sharing
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '2px' }}>
                {sharingLabels[listing.roomSharing] || listing.roomSharing}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Suitable For
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '2px' }}>
                {genderLabels[listing.genderPreference] || 'All'}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Security Deposit
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '2px', color: 'var(--color-text)' }}>
                {listing.deposit ? formatINR(listing.deposit) : '1 Month Rent'}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Lock-in Period
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '2px' }}>
                1 to 3 Months
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Included Amenities</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {listing.amenities?.map((amenity) => (
                <AmenityBadge key={amenity} name={amenity} size="md" variant="neutral" />
              ))}
            </div>
          </section>

          {/* About This Stay */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>About this Property</h2>
            <div
              style={{
                fontSize: '0.975rem',
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)',
                whiteSpace: 'pre-line',
              }}
            >
              {listing.description}
            </div>
          </section>

          {/* House Rules */}
          {listing.houseRules && (
            <section
              style={{
                marginBottom: '2.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Shield size={20} style={{ color: 'var(--color-primary)' }} />
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>House Rules & Timings</h2>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                {listing.houseRules}
              </p>
            </section>
          )}
        </div>

        {/* Right Column: Pricing & Direct Enquiry Card */}
        <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 1.5rem)' }}>
          <div
            className="card"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-dropdown)',
            }}
          >
            {/* Price Header */}
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '0.25rem' }}>
                Monthly Rent
              </div>
              <PriceLabel
                price={listing.monthlyPrice}
                unit={listing.roomSharing === 'private' ? 'room' : 'bed'}
                size="lg"
              />
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.35rem' }}>
                {listing.deposit ? `Deposit: ${formatINR(listing.deposit)} (refundable)` : 'Standard security deposit applies'}
              </div>
            </div>

            {/* Owner Contact Information */}
            {listing.owner && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {listing.owner.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{listing.owner.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{listing.owner.role}</div>
                </div>
              </div>
            )}

            {/* Feedback Banners */}
            {enquirySuccess && (
              <Toast type="success" message={enquirySuccess} onClose={() => setEnquirySuccess(null)} />
            )}
            {enquiryError && (
              <Toast type="danger" message={enquiryError} onClose={() => setEnquiryError(null)} />
            )}

            {/* Direct Enquiry Form */}
            <form onSubmit={handleEnquirySubmit}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                Send Direct Enquiry
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.875rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="student@stayzy.in"
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.875rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.875rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Preferred Move-in Date
                </label>
                <input
                  type="date"
                  value={formMoveInDate}
                  onChange={(e) => setFormMoveInDate(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.875rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>
                  Message to Host *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="form-textarea"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.875rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={formConsent}
                  onChange={(e) => setFormConsent(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
                />
                <label htmlFor="consent" style={{ fontSize: '0.75rem', color: 'var(--color-muted)', lineHeight: '1.4' }}>
                  I agree to share my contact information with the property manager for this enquiry.
                </label>
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem', fontWeight: 700 }}
              >
                <Send size={16} />
                <span>{formSubmitting ? 'Sending Enquiry...' : 'Contact Host'}</span>
              </button>
            </form>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--color-muted)',
                textAlign: 'center',
              }}
            >
              🔒 Direct connect. No booking commissions charged.
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarListings.length > 0 && (
        <section style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            Similar Stays in {listing.area}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {similarListings.map((sim) => (
              <ListingCard key={sim.id} listing={sim} />
            ))}
          </div>
        </section>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 960px) {
          .details-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
