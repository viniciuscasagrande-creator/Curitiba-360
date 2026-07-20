// src/pages/Dashboard.jsx
import { useState } from 'react';

export default function Dashboard() {
  const [abaAtiva, setAbaAtiva] = useState('Ativos');

  // Mock de dados baseado no wireframe WF-002 - Dashboard.png
  const atracoes = Array(6).fill({
    nome: 'Parque Jaime Lerner',
    local: 'Pilarzinho - Curitiba',
    estatisticas: {
      vendidos: 11,
      cortesias: 9,
      total: 20,
      receita: '200,00'
    },
    graficoDestaque: '$2.488'
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', color: '#374151' }}>
      
      {/* ================= BARRA LATERAL (SIDEBAR) ================= */}
      <aside style={{ width: '250px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        
        {/* Perfil do Usuário */}
        <div style={{ padding: '2rem 1rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #ccc', margin: '0 auto 1rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
            <span style={{ color: '#9ca3af' }}>🖼️</span>
          </div>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem 0', color: '#111827' }}>João da Silva</h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Administrador</p>
        </div>

        {/* Navegação Principal */}
        <nav style={{ flex: 1, padding: '0 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#f3f4f6', border: 'none', borderRadius: '8px', textAlign: 'left', fontWeight: 'bold', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <span>🗃️</span> Dashboard
              </button>
            </li>
            {[
              { id: 'usuarios', icon: '👥', label: 'Gestão de Usuários' },
              { id: 'contratos', icon: '📅', label: 'Gestão de Contratos' },
              { id: 'condicoes', icon: '📋', label: 'Condições Comerciais' },
              { id: 'atracoes', icon: '📦', label: 'Gestão de Atrações' },
              { id: 'relatorios', icon: '📊', label: 'Relatórios Financeiros' }
            ].map(item => (
              <li key={item.id}>
                <button style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <span>{item.icon}</span> {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navegação Inferior */}
        <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <button style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
            <span>⚙️</span> Configurações
          </button>
          <button style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: 'transparent', border: 'none', textAlign: 'left', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* ================= ÁREA PRINCIPAL ================= */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        
        {/* Cabeçalho */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>Dashboard</h1>
          <div style={{ position: 'relative', width: '300px' }}>
            <input 
              type="text" 
              placeholder="Enter search terms" 
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }} 
            />
            <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>🔍</span>
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
                color: abaAtiva === aba ? '#111827' : '#6b7280',
                borderBottom: abaAtiva === aba ? '3px solid #111827' : '3px solid transparent'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        {/* Grid de Cards das Atrações */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {atracoes.map((atracao, index) => (
            <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              
              {/* Imagem Placeholder */}
              <div style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#9ca3af', fontSize: '1.5rem' }}>🖼️</span>
              </div>

              {/* Informações Básicas */}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#111827' }}>{atracao.nome}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📍</span> {atracao.local}
              </p>

              {/* Tabela de Estatísticas */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Vendidos</span><span>{atracao.estatisticas.vendidos}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Cortesias</span><span>{atracao.estatisticas.cortesias}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Total</span><span>{atracao.estatisticas.total}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6b7280' }}>Receita</span><span>R$ {atracao.estatisticas.receita}</span></div>
              </div>

              {/* Gráfico Simulado */}
              <div style={{ marginTop: 'auto', position: 'relative', height: '120px' }}>
                {/* Linhas de grade (background) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
                  {['$4k', '$3k', '$2k', '$1k', '$0'].map((label, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.625rem', color: '#9ca3af', width: '20px' }}>{label}</span>
                      <div style={{ flex: 1, borderTop: '1px solid #f3f4f6' }}></div>
                    </div>
                  ))}
                </div>
                
                {/* Barras do Gráfico */}
                <div style={{ position: 'absolute', width: 'calc(100% - 28px)', height: '100%', left: '28px', top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '7px', zIndex: 1 }}>
                  <div style={{ width: '18%', height: '55%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '18%', height: '70%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '18%', height: '85%', backgroundColor: '#9ca3af', borderRadius: '4px 4px 0 0' }}></div>
                  <div style={{ width: '18%', height: '60%', backgroundColor: '#4b5563', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.625rem', fontWeight: 'bold', color: '#111827', backgroundColor: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>
                      {atracao.graficoDestaque}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
