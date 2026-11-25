import React from 'react';
import AttractionCard from './AttractionCard';

export default function ImperdiveisSection({ attractions, onClickDetail }) {
  if (!attractions || attractions.length === 0) return null;

  return (
    <section style={{ maxWidth: '1280px', margin: '48px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
          Imperdíveis
        </h2>
        <p style={{ fontSize: '15px', color: '#64748b' }}>
          Pacotes exclusivos e aventuras de trem pela Serra do Mar.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {attractions.map((item) => (
          <AttractionCard 
            key={item.id} 
            attraction={item} 
            onClickDetail={onClickDetail} 
          />
        ))}
      </div>
    </section>
  );
}
