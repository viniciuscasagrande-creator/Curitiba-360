// src/components/ui/Button.jsx
import React from 'react';

export default function Button({ children, style, variant = 'primary', ...props }) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
        };
      case 'danger':
        return {
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
        };
      case 'success':
        return {
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
        };
      case 'primary':
      default:
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
        };
    }
  };

  return (
    <button
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        ...getVariantStyles(),
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
