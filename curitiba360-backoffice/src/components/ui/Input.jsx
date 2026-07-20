// src/components/ui/Input.jsx
import React from 'react';

export default function Input({
  label,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  style = {},
  ...props
}) {
  return (
    <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          outline: 'none',
          fontSize: '1rem',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxSizing: 'border-box',
          backgroundColor: 'white',
          ...style
        }}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>
          {error}
        </span>
      )}
    </div>
  );
}
