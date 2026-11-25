import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Sparkles, Eye, Trees, CheckCircle2, ArrowRight, Filter, Beer, Hotel, Music, Utensils, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NearbySection({ attractions, onClickDetail }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, parques, bares, hoteis, shows, gastronomia, agencias
  const [userCoords, setUserCoords] = useState({ lat: -25.4284, lng: -49.2733 });
  const [gpsStatus, setGpsStatus] = useState('GPS Centro Curitiba');
  
  // Filter attractions with valid coordinates
  const validAttractions = attractions.filter(a => a.lat && a.lng);

  // Selected Pin State
  const [selectedAttractionId, setSelectedAttractionId] = useState(validAttractions[0]?.id || 'jardim-botanico');

  // Request real browser geolocation if available
  const handleDetectGPS = () => {
    if (navigator.geolocation) {
      setGpsStatus('Localizando...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsStatus('GPS Ativo com Precisão');
        },
        () => {
          setGpsStatus('GPS Centro (Padrão)');
        }
      );
    }
  };

  // Calculate distance in km
  const getDistance = (lat, lng) => {
    if (!lat || !lng) return '2.5';
    const dLat = (lat - userCoords.lat) * 111;
    const dLng = (lng - userCoords.lng) * 100;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    return dist.toFixed(1);
  };

  const getPinPosition = (lat, lng) => {
    const minLat = -25.36;
    const maxLat = -25.58;
    const minLng = -49.34;
    const maxLng = -49.16;

    const top = Math.min(Math.max(((lat - minLat) / (maxLat - minLat)) * 80 + 10, 8), 92);
    const left = Math.min(Math.max(((lng - minLng) / (maxLng - minLng)) * 80 + 10, 8), 92);

    return { top: `${top}%`, left: `${left}%` };
  };

  const filteredAttractions = validAttractions.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory || item.topic === selectedCategory || item.categories?.includes(selectedCategory);
  });

  const selectedAttraction = validAttractions.find(a => a.id === selectedAttractionId) || validAttractions[0];

  return (
    <section style={{ maxWidth: '1280px', margin: '56px auto', padding: '0 20px' }}>
      
      {/* Header with Title & Live GPS button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span style={{
            backgroundColor: '#e0f2fe',
            color: '#0284c7',
            fontSize: '12px',
            fontWeight: '800',
            padding: '4px 12px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Navigation size={14} />
            <span>Geolocalização Interativa</span>
          </span>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', marginTop: '8px', marginBottom: '4px' }}>
            {t('mapSectionTitle')}
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '700px' }}>
            {t('mapSectionSubtitle')}
          </p>
        </div>

        {/* GPS Button */}
        <button
          onClick={handleDetectGPS}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '42px',
            padding: '0 18px',
            borderRadius: '10px',
            backgroundColor: '#00a896',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '800',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,168,150,0.3)',
            transition: 'all 0.2s ease'
          }}
        >
          <Navigation size={16} />
          <span>{gpsStatus}</span>
        </button>
      </div>

      {/* Category Filter Pills Bar above Map */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '12px 16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto'
      }} className="hide-scrollbar">
        <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px', paddingRight: '8px', flexShrink: 0 }}>
          <Filter size={15} color="#00a896" />
          <span>Filtrar:</span>
        </div>

        {[
          { id: 'all', label: t('mapFilterAll') },
          { id: 'parques', label: t('mapFilterParks') },
          { id: 'bares', label: t('mapFilterBars') },
          { id: 'hoteis', label: t('mapFilterHotels') },
          { id: 'shows', label: t('mapFilterShows') },
          { id: 'gastronomia', label: t('mapFilterFood') },
          { id: 'agencias', label: t('mapFilterTours') }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              height: '34px',
              padding: '0 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: selectedCategory === cat.id ? '800' : '600',
              backgroundColor: selectedCategory === cat.id ? '#2563eb' : '#f1f5f9',
              color: selectedCategory === cat.id ? '#ffffff' : '#475569',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Map & Interactive Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Modern Vector Map Canvas */}
        <div className="lg:col-span-2" style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          minHeight: '440px',
          border: '2px solid #cbd5e1',
          boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
          backgroundColor: '#f1f5f9',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          
          {/* Map Grid Vector Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 100%),
              linear-gradient(to right, rgba(0, 168, 150, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 168, 150, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 36px 36px, 36px 36px'
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
              <path d="M 0 100 Q 200 300, 400 150 T 900 400" fill="none" stroke="#3b82f6" strokeWidth="18" strokeLinecap="round" />
              <path d="M 100 0 Q 300 400, 600 200 T 800 600" fill="none" stroke="#00a896" strokeWidth="14" opacity="0.4" />
            </svg>
          </div>

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '8px 14px',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            fontSize: '12px',
            fontWeight: '800',
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
              <span>{t('yourLocation')}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00a896' }} />
              <span>{t('pointsOnMap')}</span>
            </div>
          </div>

          {/* Interactive Pins on Map Container */}
          <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', minHeight: '380px' }}>
            
            {/* User GPS Pin */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '45%',
              transform: 'translate(-50%, -100%)',
              zIndex: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '5px 10px',
                borderRadius: '9999px',
                fontWeight: '800',
                fontSize: '11px',
                boxShadow: '0 4px 12px rgba(37,99,235,0.4)',
                border: '2px solid #ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Navigation size={13} color="#ffffff" />
                <span>{t('yourLocation')}</span>
              </div>
            </div>

            {/* Attraction Pins */}
            {filteredAttractions.map((item) => {
              const isSelected = selectedAttractionId === item.id;
              const pos = getPinPosition(item.lat, item.lng);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedAttractionId(item.id)}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    transform: 'translate(-50%, -100%)',
                    cursor: 'pointer',
                    zIndex: isSelected ? 30 : 15,
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  {/* Pin Bubble */}
                  <div style={{
                    backgroundColor: isSelected ? '#0f172a' : '#00a896',
                    color: '#ffffff',
                    padding: isSelected ? '7px 12px' : '5px 10px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '11px',
                    boxShadow: isSelected ? '0 8px 20px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.15)',
                    border: '2px solid #ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    whiteSpace: 'nowrap'
                  }}>
                    <MapPin size={14} color="#ffffff" fill={isSelected ? '#00a896' : '#ffffff'} />
                    <span>{item.title.split('•')[0].split('(')[0]}</span>
                  </div>
                  
                  {/* Pointer Arrow */}
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: `7px solid ${isSelected ? '#0f172a' : '#00a896'}`,
                    marginTop: '-1px'
                  }} />
                </div>
              );
            })}
          </div>

          {/* Map Footer Prompt */}
          <div style={{
            position: 'relative',
            zIndex: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            padding: '12px 20px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#475569'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="#00a896" />
              <span>Curitiba 360 Map</span>
            </div>
            <div style={{ fontWeight: '800', color: '#00a896' }}>
              {filteredAttractions.length} {t('pointsOnMap')}
            </div>
          </div>

        </div>

        {/* Selected Attraction Card Sidebar */}
        {selectedAttraction && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <MapPin size={13} />
                  <span>{getDistance(selectedAttraction.lat, selectedAttraction.lng)} {t('kmFromYou')}</span>
                </span>

                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                  ★ {selectedAttraction.rating}
                </span>
              </div>

              {/* Thumbnail Image */}
              <div style={{ position: 'relative', height: '180px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {selectedAttraction.category.toUpperCase()}
                </div>
              </div>

              {/* Attraction Info */}
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', lineHeight: '1.3' }}>
                {selectedAttraction.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: '1.5' }}>
                {selectedAttraction.description.substring(0, 130)}...
              </p>
            </div>

            {/* Card Action Button */}
            <button
              onClick={() => onClickDetail(selectedAttraction)}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              <span>{t('viewFullTour')}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
