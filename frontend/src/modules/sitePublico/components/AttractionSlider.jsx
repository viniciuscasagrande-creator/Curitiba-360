import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import AttractionCard from './AttractionCard';
import AttractionListItem from './AttractionListItem';

export default function AttractionSlider({ title, subtitle, attractions, onClickDetail }) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  if (!attractions || attractions.length === 0) return null;

  return (
    <section style={{ maxWidth: '1280px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Header with Title & Icon-Only View Switcher */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px 28px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        
        {/* Title & Subtitle */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
              Catálogo 360°
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
              {attractions.length} {attractions.length === 1 ? 'passeio encontrado' : 'passeios encontrados'}
            </span>
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: '1.2' }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* View Mode Switcher: Icons Only (Grade vs Lista) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
            Visualização:
          </span>
          <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px', border: '1px solid #cbd5e1', gap: '4px' }}>
            
            {/* Grid Icon Button */}
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: viewMode === 'grid' ? '800' : '600',
                backgroundColor: viewMode === 'grid' ? '#2563eb' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(37,99,235,0.35)' : 'none'
              }}
              title="Visualizar em Grade de Cards"
            >
              <LayoutGrid size={18} />
              <span>Grade</span>
            </button>

            {/* List Icon Button */}
            <button
              onClick={() => setViewMode('list')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: viewMode === 'list' ? '800' : '600',
                backgroundColor: viewMode === 'list' ? '#2563eb' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: viewMode === 'list' ? '0 2px 8px rgba(37,99,235,0.35)' : 'none'
              }}
              title="Visualizar em Lista Detalhada"
            >
              <List size={18} />
              <span>Lista</span>
            </button>

          </div>
        </div>

      </div>

      {/* Render View Mode: Grid or List */}
      {viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {attractions.map((attraction) => (
            <AttractionCard 
              key={attraction.id} 
              attraction={attraction} 
              onClickDetail={onClickDetail} 
            />
          ))}
        </div>
      ) : (
        /* List View rendering */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {attractions.map((attraction) => (
            <AttractionListItem
              key={attraction.id}
              attraction={attraction}
              onClickDetail={onClickDetail}
            />
          ))}
        </div>
      )}

    </section>
  );
}
