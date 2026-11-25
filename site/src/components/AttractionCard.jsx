import React, { useState } from 'react';
import { Star, Clock, Heart, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AttractionCard({ attraction, onClickDetail }) {
  const { t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={() => onClickDetail(attraction)}
      className="hover-card-rise"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={attraction.image} 
          alt={attraction.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Discount Badge */}
        {attraction.discount && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#ea580c',
            color: '#ffffff',
            fontSize: '12px',
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
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}
          title={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        >
          <Heart 
            size={18} 
            color={isFavorite ? '#ef4444' : '#64748b'} 
            fill={isFavorite ? '#ef4444' : 'none'} 
          />
        </button>

        <div style={{
          position: 'absolute',
          bottom: 0,
          inset: 'auto 0 0 0',
          height: '40px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
        }} />
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Title */}
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '4px', lineHeight: '1.3' }}>
            {attraction.title}
          </h3>

          {/* Subtitle / Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
            <MapPin size={14} color="#00a896" />
            <span>{attraction.subtitle}</span>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
              <Star size={13} color="#f59e0b" fill="#f59e0b" />
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#92400e' }}>{attraction.rating}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>({attraction.reviewsCount})</span>
          </div>

          {/* Duration */}
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} color="#64748b" />
            <span>{attraction.duration}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {attraction.originalPrice && attraction.originalPrice > 0 && (
              <span style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', marginRight: '6px' }}>
                R$ {attraction.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}

            {attraction.isFree ? (
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#16a34a' }}>
                {t('free')}
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>R$</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', lineHeight: '1' }}>
                  {attraction.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '34px',
                padding: '0 14px',
                fontSize: '12px',
                fontWeight: '800',
                color: '#2563eb',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#dbeafe';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#eff6ff';
              }}
            >
              {t('viewDetails')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
