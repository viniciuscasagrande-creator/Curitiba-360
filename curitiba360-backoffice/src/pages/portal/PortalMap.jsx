// src/pages/portal/PortalMap.jsx
import { useState } from 'react';

export default function PortalMap() {
  const [selectedSpot, setSelectedSpot] = useState(null);

  const spots = [
    {
      id: 'botanico',
      name: 'Jardim Botânico',
      coords: { x: '70%', y: '65%' },
      desc: 'Inaugurado em 1991, seu marco é a estufa metálica com estilo Art Nouveau de três abóbadas inspirada no Palácio de Cristal de Londres. Possui jardins geométricos franceses e o Museu Botânico.',
      img: '/jardim_botanico.jpg',
      schedule: '06h00 às 19h30 (Todos os dias)',
      price: 'Gratuito',
      recommendations: 'Visite pela manhã para fotos ideais. O Jardim das Sensações é uma parada imperdível.'
    },
    {
      id: 'opera',
      name: 'Ópera de Arame',
      coords: { x: '45%', y: '25%' },
      desc: 'Um dos teatros mais singulares do mundo, construído em estrutura tubular metálica e teto de policarbonato transparente. Fica localizado no Parque das Pedreiras, em meio a lagos e cascatas.',
      img: '/opera_de_arame.jpg',
      schedule: '10h00 às 18h00 (Terça a Domingo)',
      price: 'R$ 15,00 (Inteira) / R$ 7,50 (Meia)',
      recommendations: 'Aproveite o restaurante flutuante e assista às apresentações no palco flutuante.'
    },
    {
      id: 'niemeyer',
      name: 'Museu Oscar Niemeyer (MON)',
      coords: { x: '55%', y: '40%' },
      desc: 'Conhecido popularmente como o "Museu do Olho", é o maior museu de arte da América Latina, projetado pelo renomado arquiteto Oscar Niemeyer. Conta com mostras nacionais e internacionais de design e artes visuais.',
      img: '/museu_niemeyer.jpg',
      schedule: '10h00 às 18h00 (Quarta a Domingo)',
      price: 'R$ 30,00 (Inteira) / R$ 15,00 (Meia)',
      recommendations: 'Às quartas-feiras a entrada é gratuita para todos os públicos.'
    },
    {
      id: 'historico',
      name: 'Centro Histórico',
      coords: { x: '50%', y: '55%' },
      desc: 'Berço da colonização de Curitiba. Concentra construções do século XVIII e XIX, como a Igreja do Rosário, a Casa Romário Martins, o Memorial de Curitiba e o famoso calçadão de pedras basálticas.',
      img: '/centro_historico.jpg',
      schedule: 'Livre acesso (Área pública)',
      price: 'Gratuito',
      recommendations: 'Não perca a Feirinha do Largo da Ordem que acontece aos domingos pela manhã.'
    },
    {
      id: 'jaime_lerner',
      name: 'Parque Jaime Lerner',
      coords: { x: '35%', y: '35%' },
      desc: 'Homenagem ao urbanista e ex-prefeito Jaime Lerner. O parque conta com lagos integrados de drenagem urbana, mirantes, ciclovias ecológicas e uma estrutura moderna de convivência.',
      img: '/parque_jaime_lerner.jpg',
      schedule: '06h00 às 20h00 (Todos os dias)',
      price: 'Gratuito',
      recommendations: 'Excelente local para piqueniques e caminhadas no final de tarde.'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      textAlign: 'left'
    }}>
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
          Conhecendo Curitiba 🗺️
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Explore os principais atrativos da Linha Turismo através do mapa interativo. Clique nos pins para visualizar informações e recomendações.
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {/* Mapa Interativo (SVG) */}
        <div style={{
          flex: 1,
          minWidth: '320px',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          position: 'relative',
          height: '450px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* SVG Map representation */}
          <svg width="100%" height="100%" viewBox="0 0 500 500" style={{ pointerEvents: 'none' }}>
            {/* Green Areas / Parks representation in background */}
            <circle cx="100" cy="180" r="60" fill="rgba(16, 185, 129, 0.05)" />
            <circle cx="350" cy="380" r="90" fill="rgba(16, 185, 129, 0.05)" />
            
            {/* Connection Line (Linha Turismo) */}
            <path
              d="M 175 175 Q 225 200 250 275 T 350 325"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8,8"
              opacity="0.6"
            />
            <path
              d="M 225 125 T 250 200"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8,8"
              opacity="0.6"
            />
            <path
              d="M 250 275 L 250 125"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8,8"
              opacity="0.6"
            />
          </svg>

          {/* Interactive Pins */}
          {spots.map(spot => {
            const isSelected = selectedSpot?.id === spot.id;
            return (
              <div
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                style={{
                  position: 'absolute',
                  left: spot.coords.x,
                  top: spot.coords.y,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 10 : 2,
                  pointerEvents: 'auto'
                }}
              >
                {/* Ping animation effect */}
                <div style={{
                  position: 'absolute',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  opacity: 0.4,
                  animation: 'pulse 2s infinite',
                  transform: 'translate(-25%, -25%)'
                }} />
                
                {/* Pin Icon */}
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? '#3b82f6' : '#10b981',
                  border: '3px solid white',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s'
                }} />

                {/* Spot label */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(15,23,42,0.85)',
                  backdropFilter: 'blur(4px)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.625rem',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  border: '1px solid #334155',
                  color: 'white'
                }}>
                  {spot.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Spot Details Panel */}
        <div style={{
          flex: 0.8,
          minWidth: '300px',
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}>
          {selectedSpot ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden' }}>
                <img
                  src={selectedSpot.img}
                  alt={selectedSpot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.5rem 0' }}>
                  {selectedSpot.name}
                </h3>
                <span style={{ fontSize: '0.75rem', backgroundColor: '#10b98122', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                  💰 {selectedSpot.price}
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>
                {selectedSpot.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
                <div>
                  <strong style={{ color: 'white' }}>🕒 Horário:</strong> <span style={{ color: '#cbd5e1' }}>{selectedSpot.schedule}</span>
                </div>
                <div>
                  <strong style={{ color: 'white' }}>💡 Recomendação:</strong> <span style={{ color: '#cbd5e1' }}>{selectedSpot.recommendations}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
              Selecione um ponto turístico no mapa ao lado para conhecer detalhes históricos, horários e dicas de visitação.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
