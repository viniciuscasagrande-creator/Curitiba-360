// src/pages/Dashboard.jsx
import { useState } from 'react';

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('Ativos');

  // Mock de dados baseado no wireframe WF-002
  const atracoes = Array(6).fill({
    nome: 'Parque Jaime Lerner',
    local: 'Pilarzinho - Curitiba',
    vendidos: 11,
    cortesias: 9,
    total: 20,
    receita: 'R$ 200,00',
    graficoValor: '$2.488'
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
        {atracoes.map((atracao, index) => (
          <div key={index} style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
            
            {/* Placeholder de Imagem */}
            <div style={{ height: '220px', backgroundColor: '#f3f4f6', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#9ca3af', fontSize: '1.5rem' }}>🖼️</span>
            </div>

            {/* Cabeçalho do Card */}
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#374151', textAlign: 'center' }}>{atracao.nome}</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>📍</span> {atracao.local}
            </p>

            {/* Estatísticas (Lista de chave/valor) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem', color: '#4b5563', padding: '0 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Vendidos</span><span>{atracao.vendidos}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cortesias</span><span>{atracao.cortesias}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total</span><span>{atracao.total}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Receita</span><span>{atracao.receita}</span></div>
            </div>

            {/* Gráfico de Barras Estático (Visual matching WF-002) */}
            <div style={{ position: 'relative', height: '140px', padding: '0 1rem' }}>
              {/* Grid lines */}
              <div style={{ position: 'absolute', width: 'calc(100% - 2rem)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                {['$4k', '$3k', '$2k', '$1k', '$0'].map((label, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.625rem', color: '#9ca3af', width: '20px' }}>{label}</span>
                    <div style={{ flex: 1, borderTop: '1px solid #f3f4f6' }}></div>
                  </div>
                ))}
              </div>
              
              {/* Bars */}
              <div style={{ position: 'absolute', width: 'calc(100% - 2rem - 28px)', height: '100%', left: 'calc(1rem + 28px)', top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '7px', zIndex: 1 }}>
                <div style={{ width: '18%', height: '55%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '70%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                <div style={{ width: '18%', height: '85%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
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