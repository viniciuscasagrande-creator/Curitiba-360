// src/components/ui/Tabs.jsx
import React from 'react';

export default function Tabs({ options, activeTab, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', gap: '2rem', overflowX: 'auto' }}>
      {options.map(option => {
        const isActive = activeTab === option;
        
        return (
          <button 
            key={option}
            onClick={() => onChange(option)}
            style={{ 
              padding: '0.75rem 0', 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#111827' : '#6b7280',
              borderBottom: isActive ? '2px solid #111827' : '2px solid transparent',
              whiteSpace: 'nowrap',
              fontSize: '0.875rem',
              transition: 'all 0.2s'
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}