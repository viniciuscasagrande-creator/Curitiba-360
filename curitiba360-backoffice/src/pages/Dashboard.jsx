// src/pages/Dashboard.jsx
import { useState } from 'react';

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('Ativos');

  // Dados reais dos parques e atrações de Curitiba (WF-002)
  const atracoes = [
    {
      nome: 'Jardim Botânico de Curitiba',
      local: 'Jardim Botânico, Curitiba',
      imagem: '/jardim_botanico.jpg',
      vendidos: 120,
      cortesias: 15,
      total: 135,
      receita: 'R$ 1.200,00',
      graficoValor: '$3.500',
      status: 'Ativos'
    },
    {
      nome: 'Ópera de Arame',
      local: 'Abranches, Curitiba',
      imagem: '/opera_de_arame.jpg',
      vendidos: 85,
      cortesias: 10,
      total: 95,
      receita: 'R$ 950,00',
      graficoValor: '$2.100',
      status: 'Ativos'
    },
    {
      nome: 'Museu Oscar Niemeyer (MON)',
      local: 'Centro Cívico, Curitiba',
      imagem: '/museu_niemeyer.jpg',
      vendidos: 140,
      cortesias: 25,
      total: 165,
      receita: 'R$ 2.475,00',
      graficoValor: '$4.200',
      status: 'Ativos'
    },
    {
      nome: 'Centro Histórico & Largo',
      local: 'São Francisco, Curitiba',
      imagem: '/centro_historico.jpg',
      vendidos: 180,
      cortesias: 30,
      total: 210,
      receita: 'R$ 0,00 (Gratuito)',
      graficoValor: '$2.800',
      status: 'Ativos'
    },
    {
      nome: 'Parque Barigui',
      local: 'Bigorrilho, Curitiba',
      imagem: '/parque_barigui.jpg',
      vendidos: 200,
      cortesias: 0,
      total: 200,
      receita: 'R$ 0,00 (Gratuito)',
      graficoValor: '$3.100',
      status: 'Ativos'
    },
    {
      nome: 'Parque Jaime Lerner',
      local: 'Pilarzinho, Curitiba',
      imagem: '/parque_jaime_lerner.jpg',
      vendidos: 45,
      cortesias: 20,
      total: 65,
      receita: 'R$ 325,00',
      graficoValor: '$1.488',
      status: 'Inativos'
    }
  ];

  // Filtragem funcional baseada na aba ativa
  const atracoesFiltradas = atracoes.filter(atracao => {
    if (abaAtiva === 'Todos') return true;
    return atracao.status === abaAtiva;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Cabeçalho */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151', margin: 0 }}>Dashboard</h1>
        <div style={{ position: 'relative', width: '350px' }}>
          <input 
            type="text" 
            placeholder="Enter search terms" 
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} 
          />
          <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
        </div>
      </header>

      {/* Abas */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', marginBottom: '2rem' }}>
        {['Ativos', 'Inativos', 'Todos'].map(aba => (
          <button 
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{ 
              flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'center',
              fontWeight: abaAtiva === aba ? 'bold' : 'normal',
              color: abaAtiva === aba ? '#374151' : '#9ca3af',
              borderBottom: abaAtiva === aba ? '3px solid #111827' : '3px solid transparent'
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      {/* Grid de Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {atracoesFiltradas.map((atracao, index) => (
          <div key={index} className="park-card">
            
            {/* Imagem do Parque */}
            <div className="park-card-image-wrapper">
              <img 
                src={atracao.imagem} 
                alt={atracao.nome} 
                className="park-card-image"
              />
            </div>

            {/* Cabeçalho do Card */}
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.35rem 0', color: '#1f2937' }}>{atracao.nome}</h3>
            <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>📍</span> {atracao.local}
            </p>

            {/* Estatísticas (Lista de chave/valor) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vendidos</span><span style={{ fontWeight: '600', color: '#1f2937' }}>{atracao.vendidos}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cortesias</span><span style={{ fontWeight: '600', color: '#1f2937' }}>{atracao.cortesias}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total</span><span style={{ fontWeight: '600', color: '#1f2937' }}>{atracao.total}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Receita</span><span style={{ fontWeight: '600', color: '#10b981' }}>{atracao.receita}</span></div>
            </div>

            {/* Gráfico de Barras Estático (Visual matching WF-002) */}
            <div style={{ position: 'relative', height: '140px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              {/* Grid lines */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                {['$4k', '$3k', '$2k', '$1k', '$0'].map((label, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: '12px' }}>
                    <span translate="no" style={{ fontSize: '0.625rem', color: '#9ca3af', width: '35px', textAlign: 'right', whiteSpace: 'nowrap' }}>{label}</span>
                    <div style={{ flex: 1, borderTop: '1px solid #f3f4f6' }}></div>
                  </div>
                ))}
              </div>
              
              {/* Bars */}
              <div style={{ position: 'absolute', width: 'calc(100% - 43px)', height: '100%', left: '43px', top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '7px', zIndex: 1 }}>
                <div style={{ width: '18%', height: '55%', backgroundColor: '#e5e7eb', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '70%', backgroundColor: '#e5e7eb', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '85%', backgroundColor: '#e5e7eb', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '60%', backgroundColor: '#4b5563', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', fontWeight: 'bold', color: '#374151', backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>
                    {atracao.graficoValor}
                  </span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}