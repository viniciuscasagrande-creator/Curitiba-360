// src/components/ui/Table.jsx
import React from 'react';

export default function Table({ headers, data, renderRow, children, style = {} }) {
  return (
    <div style={{ 
      width: '100%', 
      overflowX: 'auto', 
      backgroundColor: 'white', 
      borderRadius: '12px', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)', 
      border: '1px solid #e5e7eb',
      ...style 
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            {headers.map((header, index) => (
              <th key={index} style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: '#4b5563', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && renderRow ? data.map((item, index) => (
            <tr 
              key={index} 
              style={{ 
                borderBottom: '1px solid #e5e7eb', 
                transition: 'background-color 0.2s' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {renderRow(item, index)}
            </tr>
          )) : children}
        </tbody>
      </table>
    </div>
  );
}
