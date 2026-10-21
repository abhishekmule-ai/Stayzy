import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ type = 'info', message, onClose, className = '' }) {
  if (!message) return null;

  const typeConfig = {
    info: {
      bg: 'var(--color-info-soft)',
      border: '#BFE0F7',
      text: '#175082',
      icon: Info,
    },
    success: {
      bg: 'var(--color-success-soft)',
      border: '#A8E3C6',
      text: '#0E5C38',
      icon: CheckCircle2,
    },
    warning: {
      bg: 'var(--color-highlight-soft)',
      border: '#F8DCAC',
      text: 'var(--color-highlight-text)',
      icon: AlertCircle,
    },
    danger: {
      bg: 'var(--color-danger-soft)',
      border: '#F7C6C4',
      text: 'var(--color-danger)',
      icon: AlertCircle,
    }
  }[type] || {
    bg: 'var(--color-info-soft)',
    border: '#BFE0F7',
    text: '#175082',
    icon: Info,
  };

  const IconComp = typeConfig.icon;

  return (
    <div
      className={`inline-toast ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: typeConfig.bg,
        border: `1px solid ${typeConfig.border}`,
        color: typeConfig.text,
        fontSize: '0.9rem',
        margin: '0.75rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <IconComp size={18} strokeWidth={2.2} style={{ flexShrink: 0 }} />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
