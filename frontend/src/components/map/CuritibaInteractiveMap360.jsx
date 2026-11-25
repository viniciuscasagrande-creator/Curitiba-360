// frontend/src/components/map/CuritibaInteractiveMap360.jsx
// Mapa Georreferenciado Interativo 360° de Curitiba (OpenStreetMap Real + Rota Linha Turismo + Compra de Ingresso no Pino)
import React, { useState } from 'react';
import { MapPin, Navigation, Ticket, ExternalLink, Compass, CheckCircle2 } from 'lucide-react';

export const CURITIBA_GEO_LANDMARKS = [
  {
    id: 'jardim-botanico',
    title: 'Jardim Botânico de Curitiba',
    neighborhood: 'Jardim Botânico',
    lat: -25.4429,
    lng: -49.2398,
    price: 0,
    isFree: true,
    tourStop: 'Parada 04 • Linha Turismo',
    hours: '06h às 19h30',
    image: '/jardim_botanico.jpg',
    description: 'Estufa metálica em estilo art nouveau e jardins geométricos franceses.'
  },
  {
    id: 'opera-de-arame',
    title: 'Ópera de Arame & Vale da Música',
    neighborhood: 'Abranches',
    lat: -25.3845,
    lng: -49.2762,
    price: 45.0,
    isFree: false,
    tourStop: 'Parada 14 • Linha Turismo',
    hours: '10h às 17h40',
    image: '/opera_de_arame.jpg',
    description: 'Teatro tubular sobre lago com palco flutuante e música instrumental ao vivo.'
  },
  {
    id: 'museu-oscar-niemeyer',
    title: 'Museu Oscar Niemeyer (MON / Museu do Olho)',
    neighborhood: 'Centro Cívico',
    lat: -25.4099,
    lng: -49.2669,
    price: 30.0,
    isFree: false,
    tourStop: 'Parada 10 • Linha Turismo',
    hours: '10h às 18h (Ter a Dom)',
    image: '/museu_niemeyer.jpg',
    description: 'Maior museu de arte da América Latina, projetado por Oscar Niemeyer.'
  },
  {
    id: 'parque-tangua',
    title: 'Parque Tanguá (Mirante & Cascata)',
    neighborhood: 'Pilarzinho',
    lat: -25.3788,
    lng: -49.2827,
    price: 0,
    isFree: true,
    tourStop: 'Parada 15 • Linha Turismo',
    hours: '06h às 20h',
    image: '/parque_jaime_lerner.jpg',
    description: 'Antiga pedreira revitalizada com espelho d’água, cascata de 65m e pôr do sol icônico.'
  },
  {
    id: 'parque-barigui',
    title: 'Parque Barigui (Lago & Capivaras)',
    neighborhood: 'Bigorrilho',
    lat: -25.4264,
    lng: -49.3081,
    price: 0,
    isFree: true,
    tourStop: 'Parada 19 • Linha Turismo',
    hours: 'Aberto 24h',
    image: '/parque_barigui.jpg',
    description: 'Um dos maiores parques urbanos de Curitiba, famoso pelas capivaras e ciclovias.'
  },
  {
    id: 'largo-da-ordem',
    title: 'Centro Histórico & Largo da Ordem',
    neighborhood: 'São Francisco',
    lat: -25.4268,
    lng: -49.2719,
    price: 55.0,
    isFree: false,
    tourStop: 'Parada 01 • Marco Zero',
    hours: 'Feira Domingos 09h às 14h',
    image: '/centro_historico.jpg',
    description: 'Berço histórico de Curitiba com casarões coloniais, bares, gastronomia e feira de arte.'
  }
];

export default function CuritibaInteractiveMap360({ onBuyTicket }) {
  const [selectedSpot, setSelectedSpot] = useState(CURITIBA_GEO_LANDMARKS[1]); // Ópera de Arame default
  const [showTourLine, setShowTourLine] = useState(true);

  const bbox = `${(selectedSpot.lng - 0.025).toFixed(4)}%2C${(selectedSpot.lat - 0.015).toFixed(4)}%2C${(selectedSpot.lng + 0.025).toFixed(4)}%2C${(selectedSpot.lat + 0.015).toFixed(4)}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${selectedSpot.lat}%2C${selectedSpot.lng}`;

  return (
    <section style={{
      backgroundColor: '#0f172a',
      borderRadius: '20px',
      padding: '24px',
      color: '#f8fafc',
      border: '1px solid #1e293b',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00a896', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <Compass size={15} />
            <span>OpenStreetMap Georreferenciado Ao Vivo • Sem Custo de API</span>
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 0 0', color: '#ffffff' }}>
            Mapa Interativo Curitiba 360° & Rota Linha Turismo
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowTourLine(!showTourLine)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid #00a896',
              backgroundColor: showTourLine ? '#00a896' : 'transparent',
              color: '#fff',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            🚌 {showTourLine ? 'Rota Linha Turismo Ativa (24 Paradas)' : 'Mostrar Rota Linha Turismo'}
          </button>
          <a
            href={`https://www.openstreetmap.org/?mlat=${selectedSpot.lat}&mlon=${selectedSpot.lng}#map=15/${selectedSpot.lat}/${selectedSpot.lng}`}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#1e293b',
              color: '#cbd5e1',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ExternalLink size={14} /> Abrir GPS Tela Cheia
          </a>
        </div>
      </div>

      {/* Seletor rápido de Pinos Georreferenciados */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
        {CURITIBA_GEO_LANDMARKS.map((spot) => {
          const active = selectedSpot.id === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelectedSpot(spot)}
              style={{
                padding: '9px 14px',
                borderRadius: '999px',
                border: active ? '1.5px solid #00a896' : '1px solid #334155',
                backgroundColor: active ? 'rgba(0,168,150,0.2)' : '#1e293b',
                color: active ? '#5eead4' : '#cbd5e1',
                fontWeight: active ? 800 : 600,
                fontSize: '12.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <MapPin size={14} color={active ? '#00a896' : '#94a3b8'} />
              <span>{spot.title}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Mapa OpenStreetMap + Card Detalhe & Compra Rápida */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
        <div style={{
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1.5px solid #334155',
          minHeight: '340px',
          backgroundColor: '#1e293b',
          position: 'relative'
        }}>
          <iframe
            title={`Mapa ${selectedSpot.title}`}
            src={osmEmbedUrl}
            style={{ width: '100%', height: '340px', border: 0 }}
            loading="lazy"
          />
          {showTourLine && (
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(6px)',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #00a896',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11.5px'
            }}>
              <span>🚌 <strong>{selectedSpot.tourStop}</strong> • Frequência a cada 30 min</span>
              <span style={{ color: '#5eead4', fontWeight: 700 }}>GPS: {selectedSpot.lat}, {selectedSpot.lng}</span>
            </div>
          )}
        </div>

        {/* Card Lateral do Pino Selecionado */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '14px',
          padding: '20px',
          border: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ height: '145px', borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', position: 'relative' }}>
              <img src={selectedSpot.image} alt={selectedSpot.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute',
                top: 10,
                left: 10,
                backgroundColor: '#0f172a',
                color: '#5eead4',
                padding: '4px 10px',
                borderRadius: '99px',
                fontSize: '11px',
                fontWeight: 800
              }}>
                {selectedSpot.tourStop}
              </span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>
              {selectedSpot.title}
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 12px 0', lineHeight: 1.5 }}>
              {selectedSpot.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: '#cbd5e1', marginBottom: '16px' }}>
              <div>📍 <strong>Bairro:</strong> {selectedSpot.neighborhood} — Curitiba/PR</div>
              <div>🕒 <strong>Horário:</strong> {selectedSpot.hours}</div>
              <div>🎟️ <strong>Ingresso:</strong> {selectedSpot.isFree ? 'Entrada Franca (Passeio Guiado Opcional R$ 45,00)' : `R$ ${selectedSpot.price.toFixed(2)} (Voucher QR Code Imediato)`}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => onBuyTicket && onBuyTicket({
                id: selectedSpot.id,
                title: selectedSpot.title,
                price: selectedSpot.isFree ? 45.0 : selectedSpot.price,
                image: selectedSpot.image,
                quantity: 1,
                ticketType: 'Inteira Digital 360°'
              })}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#00a896',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Ticket size={16} />
              <span>Adicionar Ingresso ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
