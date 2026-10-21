import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createListing, updateListing, getListingById } from '../services/listingsService';
import ListingCard from '../components/listings/ListingCard';
import Toast from '../components/ui/Toast';

const AREAS = ['Powai', 'Andheri', 'Thane', 'Ghatkopar', 'Vashi', 'Dadar'];
const AMENITIES_LIST = [
  'Wi-Fi',
  'Meals',
  'AC',
  'Laundry',
  'Housekeeping',
  'Security',
  'Attached Bathroom',
  'Power Backup',
  'Study Table'
];

export default function ListingFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user, isOwner } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('Powai');
  const [addressPublic, setAddressPublic] = useState('');
  const [transitInfo, setTransitInfo] = useState('');
  const [propertyType, setPropertyType] = useState('pg');
  const [genderPreference, setGenderPreference] = useState('all');
  const [roomSharing, setRoomSharing] = useState('twin');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [houseRules, setHouseRules] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState(['Wi-Fi', 'Housekeeping', 'Security']);

  const [previewMode, setPreviewMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // If editing, load listing details
  useEffect(() => {
    if (isEditing) {
      async function loadExisting() {
        try {
          const res = await getListingById(id);
          const data = res.data;
          setTitle(data.title || '');
          setDescription(data.description || '');
          setArea(data.area || 'Powai');
          setAddressPublic(data.addressPublic || '');
          setTransitInfo(data.transitInfo || '');
          setPropertyType(data.propertyType || 'pg');
          setGenderPreference(data.genderPreference || 'all');
          setRoomSharing(data.roomSharing || 'twin');
          setMonthlyPrice(String(data.monthlyPrice || ''));
          setDeposit(data.deposit ? String(data.deposit) : '');
          setHouseRules(data.houseRules || '');
          setImageUrl(data.imageUrl || data.imageUrls?.[0] || '');
          if (Array.isArray(data.amenities)) {
            setSelectedAmenities(data.amenities);
          }
        } catch (err) {
          setError('Could not load listing for editing.');
        }
      }
      loadExisting();
    }
  }, [id, isEditing]);

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const priceNum = Number(monthlyPrice);
    if (!priceNum || priceNum <= 0) {
      setError('Please provide a valid positive monthly price.');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Please complete the title and description.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        area,
        city: 'Mumbai',
        addressPublic: addressPublic.trim() || `Near ${area} Hub`,
        transitInfo: transitInfo.trim() || `5 mins to ${area} transit`,
        propertyType,
        genderPreference,
        roomSharing,
        monthlyPrice: priceNum,
        deposit: deposit ? Number(deposit) : priceNum * 2,
        houseRules: houseRules.trim() || 'Standard house guidelines apply.',
        amenities: selectedAmenities,
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
        owner: {
          name: user?.name || 'Verified Property Manager',
          role: 'Property Owner',
          phone: user?.phone || '+91 98200 12345',
        },
      };

      if (isEditing) {
        await updateListing(id, payload);
      } else {
        await createListing(payload);
      }

      navigate('/owner/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save listing. Please verify inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  const previewListing = {
    id: id || 'preview-temp',
    title: title || 'Title of your property',
    area: area || 'Powai',
    city: 'Mumbai',
    propertyType,
    genderPreference,
    roomSharing,
    monthlyPrice: Number(monthlyPrice) || 9500,
    deposit: Number(deposit) || 15000,
    transitInfo: transitInfo || '5 mins to nearest station',
    amenities: selectedAmenities,
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    isDemo: true,
  };

  return (
    <div className="page-container container animate-fade-in">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link
            to="/owner/dashboard"
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
            <span>Back to Owner Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="btn btn-outline btn-sm"
          >
            <Eye size={15} />
            <span>{previewMode ? 'Return to Edit Form' : 'Preview Listing Card'}</span>
          </button>
        </div>

        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          {isEditing ? 'Edit Accommodation Listing' : 'List New Student Property'}
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Fill in accurate details to attract verified students and scholars in Mumbai.
        </p>

        {error && <Toast type="danger" message={error} onClose={() => setError(null)} />}

        {/* Preview Card View */}
        {previewMode ? (
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Live Card Preview</h3>
            <div style={{ maxWidth: '340px', margin: '0 auto', textAlign: 'left' }}>
              <ListingCard listing={previewListing} />
            </div>
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className="btn btn-primary"
              style={{ marginTop: '1.5rem' }}
            >
              Continue Editing
            </button>
          </div>
        ) : (
          /* Main Listing Form */
          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-title">
                Property Title *
              </label>
              <input
                id="form-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Twin Sharing PG with 3 Meals near IIT Powai"
                className="form-input"
              />
              <span className="form-helper">Make it descriptive and mention nearby landmarks or sharing type.</span>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-desc">
                Detailed Description *
              </label>
              <textarea
                id="form-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe rooms, furniture, ventilation, kitchen access, society environment, and distance to key colleges..."
                className="form-textarea"
              />
            </div>

            {/* Area & Transit Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="form-area">
                  Locality / Mumbai Area *
                </label>
                <select
                  id="form-area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="form-select"
                >
                  {AREAS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="form-transit">
                  Nearby Transit / College Landmark
                </label>
                <input
                  id="form-transit"
                  type="text"
                  value={transitInfo}
                  onChange={(e) => setTransitInfo(e.target.value)}
                  placeholder="e.g. 4 mins to Metro | 10 mins to Railway Station"
                  className="form-input"
                />
              </div>
            </div>

            {/* Public Address snippet */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-addr">
                Approximate Public Address
              </label>
              <input
                id="form-addr"
                type="text"
                value={addressPublic}
                onChange={(e) => setAddressPublic(e.target.value)}
                placeholder="e.g. Sector 17, near City Center"
                className="form-input"
              />
              <span className="form-helper">For privacy, your exact flat number will not be published publicly.</span>
            </div>

            {/* Property Type, Gender, Sharing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="form-select"
                >
                  <option value="pg">Paying Guest (PG)</option>
                  <option value="hostel">Student Hostel</option>
                  <option value="shared_flat">Shared Flat</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Gender Preference</label>
                <select
                  value={genderPreference}
                  onChange={(e) => setGenderPreference(e.target.value)}
                  className="form-select"
                >
                  <option value="all">Co-ed / All</option>
                  <option value="women">Girls Only</option>
                  <option value="men">Boys Only</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Room Sharing</label>
                <select
                  value={roomSharing}
                  onChange={(e) => setRoomSharing(e.target.value)}
                  className="form-select"
                >
                  <option value="twin">Twin Sharing (2)</option>
                  <option value="private">Private Single Room (1)</option>
                  <option value="triple">Triple Sharing (3)</option>
                  <option value="four_sharing">Four Sharing (4)</option>
                </select>
              </div>
            </div>

            {/* Rent & Deposit */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="form-price">
                  Monthly Rent (₹ per bed or room) *
                </label>
                <input
                  id="form-price"
                  type="number"
                  required
                  min="1000"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  placeholder="e.g. 9500"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="form-deposit">
                  Security Deposit (₹)
                </label>
                <input
                  id="form-deposit"
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  placeholder="e.g. 15000"
                  className="form-input"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-image">
                Room Photo URL
              </label>
              <input
                id="form-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="form-input"
              />
              <span className="form-helper">Paste a high quality image link of the student room.</span>
            </div>

            {/* Amenities Checkboxes */}
            <div className="form-group">
              <label className="form-label">Included Amenities</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.65rem' }}>
                {AMENITIES_LIST.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        padding: '0.4rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: checked ? 'var(--color-primary-soft)' : 'transparent',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity)}
                        style={{ accentColor: 'var(--color-primary)' }}
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="form-group">
              <label className="form-label" htmlFor="form-rules">
                House Rules & Gate Timings
              </label>
              <textarea
                id="form-rules"
                rows={3}
                value={houseRules}
                onChange={(e) => setHouseRules(e.target.value)}
                placeholder="e.g. Gates close at 11:00 PM, quiet hours after 10:30 PM, no smoking indoors..."
                className="form-textarea"
              />
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ flexGrow: 1 }}
              >
                <Save size={18} />
                <span>{submitting ? 'Saving Property...' : isEditing ? 'Update Listing' : 'Publish Property Listing'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(true)}
                className="btn btn-outline btn-lg"
              >
                <Eye size={18} />
                <span>Preview</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
