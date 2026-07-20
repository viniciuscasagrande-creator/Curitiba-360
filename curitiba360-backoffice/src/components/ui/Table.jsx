// src/components/ui/Table.jsx
import React from 'react';

export default function Table({ columns, children }) {
  return (
    <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
        
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                style={{ 
                  padding: '0.75rem 1rem', 
                  borderBottom: '1px solid #e5e7eb',
                  color: '#374151',
                  fontWeight: 'bold',
                  fontSize: '0.875rem'
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {/* As linhas (<tr> e <td>) serão passadas como children para manter a flexibilidade */}
          {children}
        </tbody>
        
      </table>
    </div>
  );
}
