// src/components/ui/Tabs.jsx
import React from 'react';

export default function Tabs({ options, activeTab, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', marginBottom: '2rem', overflowX: 'auto' }}>
      {options.map(option => {
        const isActive = activeTab === option;
        
        return (
          <button 
            key={option}
            onClick={() => onChange(option)}
            style={{ 
              padding: '1rem 1.5rem', 
              border: 'none', 
              background: 'none', 
              cursor: 'pointer', 
              textAlign: 'center',
              fontWeight: isActive ? 'bold' : 'normal',
              color: isActive ? '#111827' : '#6b7280',
              borderBottom: isActive ? '3px solid #10b981' : '3px solid transparent',
              whiteSpace: 'nowrap',
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
