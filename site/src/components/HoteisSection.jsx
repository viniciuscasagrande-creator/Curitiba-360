import React, { useState } from 'react';
import { Hotel, BedDouble, MapPin, Star, ShieldCheck, CheckCircle2, PhoneCall, Sparkles, Filter, Calendar, Award } from 'lucide-react';
import AttractionCard from './AttractionCard';

export default function HoteisSection({ attractions, onClickDetail }) {
  const [filterType, setFilterType] = useState('all'); // all, luxo, pousadas, executivo

  // Filter hotel attractions
  const hotelList = attractions.filter(a => 
    a.category === 'hoteis' || a.topic === 'hoteis' || a.categories?.includes('hoteis')
  );

  const filteredHotels = hotelList.filter(item => {
    if (filterType === 'luxo') return item.rating >= 4.9 && (item.price > 400 || item.title.includes('5★') || item.title.includes('Radisson') || item.title.includes('Nomaa') || item.title.includes('Rayon'));
    if (filterType === 'pousadas') return item.title.toLowerCase().includes('pousada') || item.location.includes('Ilha do Mel') || item.location.includes('São José');
    if (filterType === 'executivo') return item.price <= 400 || item.title.includes('Bourbon') || item.title.includes('Ibis');
    return true;
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', paddingBottom: '64px' }}>
      
      {/* Top Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '48px 20px',
        borderBottom: '1px solid #1e293b',
        boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.15)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          
          <div style={{ flex: 1, minWidth: '320px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(37,99,235,0.25)', color: '#60a5fa', padding: '6px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: '700', marginBottom: '16px', border: '1px solid rgba(96,165,250,0.4)' }}>
              <Hotel size={16} />
              <span>GUIA TURÍSTICO DE HOTELARIA & HOSPEDAGEM</span>
            </div>

            <h1 style={{ fontSize: '36px', fontWeight: '900', lineHeight: '1.2', marginBottom: '12px' }}>
              Hotelaria & Pousadas em Curitiba e RMC
            </h1>

            <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '720px', lineHeight: '1.6', marginBottom: '24px' }}>
              Encontre os melhores hotéis 5 estrelas no Batel, pousadas pé na areia na Ilha do Mel e chalés rústicos de charme no Caminho do Vinho.
            </p>

            {/* Quick Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: '#cbd5e1', fontWeight: '600' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px' }}>
                <Award size={15} color="#f59e0b" />
                <span>Hotéis 5★ e Boutique</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px' }}>
                <MapPin size={15} color="#00a896" />
                <span>Pousadas na Ilha do Mel & RMC</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '8px' }}>
                <ShieldCheck size={15} color="#10b981" />
                <span>Reserva Garantida ao Melhor Preço</span>
              </div>
            </div>
          </div>

          {/* Guarantee Card */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',
            padding: '24px',
            minWidth: '280px',
            backdropFilter: 'blur(10px)'
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
              Central de Reservas CWB 360°
            </h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.4' }}>
              Precisa de ajuda para escolher seu hotel ou pousada ideal? Fale com nossos consultores.
            </p>
            <a
              href="https://wa.me/5541999999999"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '13px',
                textDecoration: 'none'
              }}
            >
              <PhoneCall size={16} />
              <span>Consultar Hospedagem 24h</span>
            </a>
          </div>

        </div>
      </div>

      {/* Filter Tabs & Grid */}
      <div style={{ maxWidth: '1280px', margin: '40px auto 0', padding: '0 20px' }}>
        
        {/* Filter Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color="#00a896" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
              Filtrar Tipo de Hospedagem:
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Todas as Hospedagens' },
              { id: 'luxo', label: '⭐ Luxo & 5 Estrelas (Batel)' },
              { id: 'pousadas', label: '🌿 Pousadas (Ilha do Mel & RMC)' },
              { id: 'executivo', label: '💼 Executivo & Central' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id)}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: filterType === btn.id ? '800' : '600',
                  backgroundColor: filterType === btn.id ? '#2563eb' : '#f1f5f9',
                  color: filterType === btn.id ? '#ffffff' : '#475569',
                  border: filterType === btn.id ? 'none' : '1px solid #cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hotels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {filteredHotels.map((item) => (
            <AttractionCard key={item.id} attraction={item} onClickDetail={onClickDetail} />
          ))}
        </div>

      </div>

    </div>
  );
}
