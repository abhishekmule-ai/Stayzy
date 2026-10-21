import React from 'react';
import ListingCard from './ListingCard';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import EmptyState from '../ui/EmptyState';

export default function ListingGrid({
  listings = [],
  loading = false,
  error = null,
  onResetFilters,
}) {
  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  if (error) {
    return (
      <EmptyState
        icon="error"
        title="Unable to load listings"
        description={error.message || 'There was an issue retrieving properties. Please check your connection or retry.'}
        actionText="Try Again"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        icon="search"
        title="No stays match your criteria"
        description="We couldn't find properties matching all your selected filters. Try broadening your budget range, changing sharing options, or clearing filters."
        actionText="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div
      className="listing-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
