// src/components/ui/Tabs.jsx
import React from 'react';

export default function Tabs({ options, activeTab, onTabChange, style = {} }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', marginBottom: '2rem', width: '100%', ...style }}>
      {options.map((option) => {
        const isString = typeof option === 'string';
        const label = isString ? option : option.label;
        const value = isString ? option : option.value;
        const isActive = activeTab === value;

        return (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: isActive ? 'bold' : '600',
              color: isActive ? '#111827' : '#6b7280',
              borderBottom: isActive ? '3px solid #10b981' : '3px solid transparent',
              transition: 'all 0.2s ease',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
