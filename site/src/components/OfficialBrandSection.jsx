import React from 'react';
import { 
  MapPin, Info, Trees, Eye, Train, TowerControl as Tower, 
  Smile, Landmark, Flower2, Building2 
} from 'lucide-react';
import { BRAND_LANDMARKS } from '../data/attractions';

const LANDMARK_ICONS = {
  Trees, Eye, Train, TowerControl: Tower, Smile, Landmark, Flower2, Building2
};

export default function OfficialBrandSection({ onOpenMap, onOpenAboutBrand, onFilterLandmark }) {
  return (
    <section style={{ 
      backgroundColor: '#f8fafc', 
      borderTop: '1px solid #e2e8f0', 
      borderBottom: '1px solid #e2e8f0', 
      padding: '64px 20px',
      margin: '48px 0'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', lgGridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        
        {/* Left Side: Brand Text & Actions */}
        <div>
          <div style={{
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '1.5px',
            color: '#64748b',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            IDENTIDADE VISUAL OFICIAL
          </div>

          <h2 style={{
            fontSize: '38px',
            fontWeight: '800',
            color: '#0f172a',
            lineHeight: '1.2',
            marginBottom: '16px'
          }}>
            Viva Curitiba <br/>
            <span style={{ color: '#00a896' }}>com todos os sentidos.</span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#475569',
            lineHeight: '1.6',
            marginBottom: '32px',
            maxWidth: '540px'
          }}>
            Conectamos você ao melhor da cultura, turismo e experiências gastronômicas da capital. Descubra os pontos icônicos inspirados no design do Parque Jaime Lerner.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <button
              onClick={onOpenMap}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f59e0b',
                color: '#0f172a',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
            >
              <MapPin size={18} />
              <span>Ver Atrações no Mapa</span>
            </button>

            <button
              onClick={onOpenAboutBrand}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                color: '#334155',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '15px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
            >
              <Info size={18} color="#00a896" />
              <span>Sobre a Marca 360</span>
            </button>
          </div>
        </div>

        {/* Right Side: Landmark Icons Grid (2 rows x 4 cols) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {BRAND_LANDMARKS.map((landmark) => {
            const IconComp = LANDMARK_ICONS[landmark.icon] || Trees;
            return (
              <button
                key={landmark.id}
                onClick={() => onFilterLandmark(landmark.name)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '20px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#00a896';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,168,150,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
                }}
                title={landmark.desc}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#e6fffa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  <IconComp size={24} color="#00a896" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', lineHeight: '1.2' }}>
                  {landmark.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
