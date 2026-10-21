import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Star, Train } from 'lucide-react';
import PriceLabel from '../ui/PriceLabel';
import AmenityBadge from '../ui/AmenityBadge';
import FavoriteButton from '../ui/FavoriteButton';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80';

export default function ListingCard({ listing, showDemoBadge = true }) {
  const [imageSrc, setImageSrc] = useState(
    listing.imageUrl || listing.imageUrls?.[0] || FALLBACK_IMAGE
  );

  const sharingLabels = {
    private: 'Private Room',
    twin: 'Twin Sharing',
    triple: '3 Sharing',
    four_sharing: '4 Sharing',
  };

  const genderLabels = {
    women: "Girls only",
    men: "Boys only",
    all: "Co-ed / All",
  };

  const genderBadgeVariants = {
    women: 'highlight',
    men: 'neutral',
    all: 'primary',
  };

  const propertyTypeLabels = {
    pg: 'PG',
    hostel: 'Hostel',
    shared_flat: 'Flat Share',
  };

  return (
    <article
      className="card card-hoverable listing-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '65%', // ~3:2 ratio
          backgroundColor: '#EAEFEA',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageSrc}
          alt={listing.title}
          loading="lazy"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.35s ease',
          }}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            zIndex: 2,
          }}
        >
          <span className={`badge badge-${genderBadgeVariants[listing.genderPreference] || 'neutral'}`}>
            {genderLabels[listing.genderPreference] || 'Co-ed'}
          </span>
          <span className="badge badge-neutral" style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}>
            {propertyTypeLabels[listing.propertyType] || 'PG'}
          </span>
          {showDemoBadge && listing.isDemo && (
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(23, 33, 31, 0.8)',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                letterSpacing: '0.04em'
              }}
            >
              SAMPLE
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
          <FavoriteButton listingId={listing.id} />
        </div>

        {/* Rating overlay badge */}
        {listing.rating && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              backgroundColor: 'rgba(23, 33, 31, 0.82)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              padding: '3px 7px',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
            }}
          >
            <Star size={12} fill="#F4B860" color="#F4B860" />
            <span>{listing.rating}</span>
            {listing.reviewsCount && (
              <span style={{ opacity: 0.75, fontSize: '0.72rem' }}>({listing.reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          gap: '0.75rem',
        }}
      >
        {/* Location & Sharing */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'var(--color-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600, color: 'var(--color-primary)' }}>
            <MapPin size={14} />
            <span>{listing.area}, {listing.city || 'Mumbai'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} />
            <span>{sharingLabels[listing.roomSharing] || listing.roomSharing}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.35',
            fontWeight: 700,
            color: 'var(--color-text)',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.7rem',
          }}
        >
          <Link
            to={`/listings/${listing.id}`}
            style={{ color: 'inherit' }}
            className="listing-title-link"
          >
            {listing.title}
          </Link>
        </h3>

        {/* Transit info if available */}
        {listing.transitInfo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              color: 'var(--color-muted)',
              backgroundColor: 'var(--color-bg)',
              padding: '0.35rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <Train size={13} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{listing.transitInfo}</span>
          </div>
        )}

        {/* Amenities snippet */}
        {listing.amenities && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: 'auto' }}>
            {listing.amenities.slice(0, 3).map((amenity) => (
              <AmenityBadge key={amenity} name={amenity} size="sm" />
            ))}
            {listing.amenities.length > 3 && (
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-muted)',
                  alignSelf: 'center',
                  fontWeight: 500,
                  padding: '0 4px',
                }}
              >
                +{listing.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--color-border)', margin: '0.4rem 0 0.2rem' }} />

        {/* Price and Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0.2rem',
          }}
        >
          <PriceLabel price={listing.monthlyPrice} unit={listing.roomSharing === 'private' ? 'room' : 'bed'} />

          <Link
            to={`/listings/${listing.id}`}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 600 }}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
