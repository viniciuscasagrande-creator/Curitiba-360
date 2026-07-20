// src/components/ui/Input.jsx
import React from 'react';

export default function Input({ 
  icon, 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  style = {},
  ...props 
}) {
  return (
    <div style={{ position: 'relative', width: '100%', ...style }}>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ 
          width: '100%', 
          padding: icon ? '0.75rem 1rem 0.75rem 2.5rem' : '0.75rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid #d1d5db', 
          outline: 'none',
          fontSize: '0.875rem',
          color: '#111827'
        }} 
        {...props}
      />
      {icon && (
        <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
          {icon}
        </span>
      )}
    </div>
  );
}
