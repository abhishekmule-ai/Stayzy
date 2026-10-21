import React from 'react';
import {
  Wifi,
  Utensils,
  Wind,
  Shirt,
  Sparkles,
  ShieldCheck,
  Bath,
  Zap,
  BookOpen,
  Check
} from 'lucide-react';

const AMENITY_ICONS = {
  'wi-fi': Wifi,
  'wifi': Wifi,
  'internet': Wifi,
  'meals': Utensils,
  'food': Utensils,
  'ac': Wind,
  'air conditioning': Wind,
  'laundry': Shirt,
  'washing machine': Shirt,
  'housekeeping': Sparkles,
  'cleaning': Sparkles,
  'security': ShieldCheck,
  'cctv': ShieldCheck,
  'attached bathroom': Bath,
  'attached bath': Bath,
  'power backup': Zap,
  'study table': BookOpen,
  'study desk': BookOpen
};

export default function AmenityBadge({ name, size = 'sm', variant = 'neutral' }) {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  const IconComponent = AMENITY_ICONS[key] || Check;

  const iconSize = size === 'sm' ? 13 : 16;

  return (
    <span
      className={`badge badge-${variant}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: size === 'sm' ? '0.2rem 0.55rem' : '0.4rem 0.75rem',
        fontSize: size === 'sm' ? '0.78rem' : '0.875rem'
      }}
    >
      <IconComponent size={iconSize} strokeWidth={2.2} style={{ color: 'var(--color-primary)' }} />
      <span>{name}</span>
    </span>
  );
}
