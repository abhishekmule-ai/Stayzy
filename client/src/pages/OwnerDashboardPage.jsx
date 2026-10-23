import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  PlusCircle,
  Users,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getOwnerListings, deleteListing, getListings } from '../services/listingsService';
import { getOwnerEnquiries } from '../services/enquiriesService';
import { formatINR } from '../components/ui/PriceLabel';
import Toast from '../components/ui/Toast';

export default function OwnerDashboardPage() {
  const { user, isOwner, loginAsDemoOwner } = useAuth();
  const [listings, setListings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadOwnerData = async () => {
    setLoading(true);
    try {
      const [ownerListings, allListings, ownerEnq] = await Promise.all([
        getOwnerListings(),
        getListings({ limit: 10 }),
        getOwnerEnquiries(),
      ]);

      // If owner has no custom listings yet in demo, use demo listings 1 & 5 as their managed properties
      if (!ownerListings || ownerListings.length === 0) {
        const defaultOwned = (allListings.data || []).slice(0, 2);
        setListings(defaultOwned);
      } else {
        setListings(ownerListings);
      }

      setEnquiries(ownerEnq.data || []);
    } catch (err) {
      console.error('Failed to load owner data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOwnerData();
  }, [user]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove listing "${title}"?`)) {
      await deleteListing(id);
      setToastMessage({ type: 'success', text: `Listing "${title}" removed successfully.` });
      loadOwnerData();
    }
  };

  if (!user || user.role !== 'owner') {
    return (
      <div className="page-container container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Owner Account Required</h2>
        <p style={{ color: 'var(--color-muted)', margin: '1rem 0 2rem' }}>
          You must be logged in with a Property Owner account to access owner management tools.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/login" className="btn btn-primary">
            Sign In as Owner
          </Link>
          <button type="button" onClick={loginAsDemoOwner} className="btn btn-outline">
            Switch to Demo Owner Persona
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container container animate-fade-in">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span className="badge badge-primary">OWNER PORTAL</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{user.name}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }}>
            Property Management Dashboard
          </h1>
        </div>

        <Link to="/owner/listings/new" className="btn btn-primary btn-lg">
          <PlusCircle size={18} />
          <span>Add New Property</span>
        </Link>
      </div>

      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.text}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* Stats Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        <div className="card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            <span>Active Listings</span>
            <Building2 size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
            {listings.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '0.25rem' }}>
            ● Published & Visible
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            <span>Student Inquiries</span>
            <MessageSquare size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem' }}>
            {enquiries.length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
            Direct prospective tenants
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)', fontSize: '0.875rem' }}>
            <span>Verification Status</span>
            <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.85rem', color: 'var(--color-success)' }}>
            Verified Partner
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
            Zero brokerage listings
          </div>
        </div>
      </div>

      {/* Owner Listings Table / List */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Your Properties</h2>
          <Link to="/owner/listings/new" className="btn btn-secondary btn-sm">
            <PlusCircle size={15} />
            <span>Create Listing</span>
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted)' }}>
            Loading properties...
          </div>
        ) : listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-muted)' }}>
            <p style={{ marginBottom: '1rem' }}>You have not published any student stays yet.</p>
            <Link to="/owner/listings/new" className="btn btn-primary">
              List Your First Property
            </Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-muted)' }}>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Property</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Area</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Type & Sharing</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Monthly Price</th>
                  <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={l.imageUrl || l.imageUrls?.[0]}
                        alt={l.title}
                        style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div style={{ maxWidth: '240px' }}>
                        <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {l.title}
                        </div>
                        {l.isDemo && (
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>SAMPLE LISTING</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 500 }}>{l.area}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>
                        {l.propertyType} • {l.roomSharing}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                      {formatINR(l.monthlyPrice)}
                    </td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span className="badge badge-success">Active</span>
                    </td>
                    <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <Link
                          to={`/listings/${l.id}`}
                          className="btn btn-ghost btn-sm"
                          title="View Public Page"
                          style={{ padding: '0.35rem' }}
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/owner/listings/${l.id}/edit`}
                          className="btn btn-outline btn-sm"
                          title="Edit Listing"
                          style={{ padding: '0.35rem 0.6rem' }}
                        >
                          <Edit3 size={15} />
                          <span>Edit</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(l.id, l.title)}
                          className="btn btn-ghost btn-sm"
                          title="Delete Listing"
                          style={{ padding: '0.35rem', color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Enquiries Received */}
      <div className="card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>
          Recent Inquiries Received from Students
        </h2>

        {enquiries.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            No inquiries received yet. When students contact you via the listing page, messages will appear here.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {enq.name} <span style={{ fontWeight: 400, color: 'var(--color-muted)' }}>({enq.email}{enq.phone ? ` • ${enq.phone}` : ''})</span>
                  </div>
                  <span className="badge badge-primary">
                    For: {enq.listingTitle || 'Your Property'}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0' }}>
                  "{enq.message}"
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                  Preferred Move-in: {enq.moveInDate || 'Flexible'} • Received on {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
