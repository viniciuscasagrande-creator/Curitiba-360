import React, { useState } from 'react';
import { Star, Clock, Heart, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AttractionListItem({ attraction, onClickDetail }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={() => onClickDetail(attraction)}
      className="hover-card-rise mobile-list-container"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        transition: 'all 0.25s ease',
        alignItems: 'stretch'
      }}
    >
      {/* Left Thumbnail */}
      <div className="mobile-list-thumb" style={{ position: 'relative', width: '260px', minWidth: '240px', height: '190px', borderRadius: '14px', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={attraction.image}
          alt={attraction.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Discount Badge */}
        {attraction.discount && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#ea580c',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: '800',
            padding: '4px 10px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(234,88,12,0.3)',
            zIndex: 2
          }}>
            {attraction.discount}
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '38px',
            height: '38px',
            minHeight: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            zIndex: 2
          }}
          title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart 
            size={18} 
            color={isFavorite ? '#ef4444' : '#64748b'} 
            fill={isFavorite ? '#ef4444' : 'none'} 
          />
        </button>
      </div>

      {/* Right Column: Information & Actions */}
      <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', lineHeight: '1.3' }}>
                {attraction.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                <MapPin size={14} color="#00a896" />
                <span>{attraction.subtitle}</span>
              </div>
            </div>

            {/* Price Badge */}
            <div style={{ backgroundColor: '#f8fafc', padding: '8px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', flexShrink: 0 }}>
              {attraction.isFree ? (
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#16a34a' }}>
                  ENTRADA GRÁTIS
                </div>
              ) : (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>A partir de</span>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: '#2563eb', lineHeight: '1' }}>
                    R$ {attraction.price.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rating & Duration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '10px', marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#fef3c7', padding: '3px 10px', borderRadius: '6px' }}>
              <Star size={14} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#92400e' }}>{attraction.rating}</span>
              <span style={{ fontSize: '11px', color: '#78350f' }}>({attraction.reviewsCount} avaliações)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
              <Clock size={14} color="#00a896" />
              <span>Duração: {attraction.duration}</span>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '14px' }}>
            {attraction.description.substring(0, 160)}...
          </p>

          {/* Bullet Features */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {attraction.features?.slice(0, 3).map((ft, i) => (
              <span key={i} style={{ fontSize: '12px', fontWeight: '600', backgroundColor: '#f1f5f9', color: '#334155', padding: '4px 12px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#00a896" />
                <span>{ft}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #e2e8f0', paddingTop: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
            {attraction.paymentTerms || 'Pague em até 3x no cartão de crédito'}
          </span>

          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '44px',
              minHeight: '44px',
              padding: '0 20px',
              borderRadius: '10px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
              transition: 'all 0.2s ease',
              width: '100%',
              maxWidth: '220px'
            }}
          >
            <span>Ver Passeio Completo</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
