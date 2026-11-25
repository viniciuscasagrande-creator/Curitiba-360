// src/components/ui/Table.jsx
import React from 'react';

export default function Table({ columns, children, onSelectAll, isAllSelected, showPagination = true }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          
          <thead style={{ backgroundColor: '#f9fafb', color: '#4b5563', borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}>
            <tr>
              {/* Coluna fixa de Checkbox se a função onSelectAll for passada */}
              {onSelectAll && (
                <th style={{ padding: '0.75rem 1rem', width: '40px' }}>
                  <input type="checkbox" checked={isAllSelected} onChange={onSelectAll} style={{ cursor: 'pointer' }} />
                </th>
              )}
              
              {columns.map((col, index) => (
                <th key={index} style={{ padding: '0.75rem 1rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  {col} <span style={{ fontSize: '0.6rem', color: '#9ca3af', marginLeft: '0.25rem' }}>↕</span>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {children}
          </tbody>
          
        </table>
      </div>

      {/* Paginação Global */}
      {showPagination && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem', gap: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', outline: 'none', color: '#374151' }}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>«</button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>‹</button>
            <span>Página 1 de 3</span>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>›</button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>»</button>
          </div>
        </div>
      )}
    </div>
  );
}