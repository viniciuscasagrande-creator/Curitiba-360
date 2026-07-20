// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // RF-003.03: Filtro por período (Padrão: últimos 30 dias)
  const [dataInicial, setDataInicial] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [dataFinal, setDataFinal] = useState(new Date().toISOString().split('T')[0]);
  const [termoBusca, setTermoBusca] = useState('');

  // Estados para os KPIs
  const [kpis, setKpis] = useState({
    ingressosVendidos: 1250,
    cortesias: 45,
    totalIngressos: 1295,
    totalVendas: 45000.00
  });

  // RF-003.02: Lista de atrações
  const [atracoes, setAtracoes] = useState([
    { id: 1, nome: 'Visita Guiada Ópera de Arame', cidade: 'Curitiba', estado: 'PR', vendas: 350, receita: 17500.00, status: 'Em Alta' },
    { id: 2, nome: 'Tour Panorâmico Linha Turismo', cidade: 'Curitiba', estado: 'PR', vendas: 900, receita: 27500.00, status: 'Estável' }
  ]);

  useEffect(() => {
    console.log(`Buscando dados de ${dataInicial} até ${dataFinal}`);
  }, [dataInicial, dataFinal]);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b' }}>
      
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            Dashboard Geral
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem' }}>Acompanhe o desempenho de vendas e a visitação das atrações de Curitiba</p>
        </div>
        
        {/* RF-003.03: Filtro de Período */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'white', padding: '0.75rem 1.25rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>De</span>
            <input 
              type="date" 
              value={dataInicial} 
              onChange={(e) => setDataInicial(e.target.value)}
              style={{ padding: '0.375rem 0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem', color: '#334155' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>Até</span>
            <input 
              type="date" 
              value={dataFinal} 
              onChange={(e) => setDataFinal(e.target.value)}
              style={{ padding: '0.375rem 0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem', color: '#334155' }}
            />
          </div>
        </div>
      </div>

      {/* RF-003.01: Cards de KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <CardKPI titulo="Ingressos Vendidos" valor={kpis.ingressosVendidos} detalhe="↑ 12% vs mês anterior" corGradient="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" />
        <CardKPI titulo="Cortesias" valor={kpis.cortesias} detalhe="Aprovadas por admin" corGradient="linear-gradient(135deg, #10b981 0%, #047857 100%)" />
        <CardKPI titulo="Total de Ingressos" valor={kpis.totalIngressos} detalhe="Carga total do período" corGradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" />
        <CardKPI 
          titulo="Total de Vendas" 
          valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpis.totalVendas)} 
          detalhe="Receita bruta total"
          corGradient="linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)" 
        />
      </div>

      {/* RF-003.05: Gráfico de Vendas Avançado (Simulado em SVG com Gradiente) */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', margin: 0 }}>Desempenho de Vendas Geral</h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Faturamento diário acumulado no período</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#10b981', backgroundColor: '#ecfdf5', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
            Live Sync Ativo
          </span>
        </div>

        <div style={{ position: 'relative', height: '240px', width: '100%' }}>
          <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 800 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Linhas de Grade */}
            <line x1="0" y1="60" x2="800" y2="60" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="120" x2="800" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="0" y1="180" x2="800" y2="180" stroke="#f1f5f9" strokeWidth="1" />
            
            {/* Gráfico de Área */}
            <path 
              d="M 0,200 Q 150,120 300,160 T 600,60 T 800,90 L 800,240 L 0,240 Z" 
              fill="url(#gradientArea)" 
            />
            {/* Linha do Gráfico */}
            <path 
              d="M 0,200 Q 150,120 300,160 T 600,60 T 800,90" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold' }}>
          <span>Início do Período</span>
          <span>Meio</span>
          <span>Hoje</span>
        </div>
      </div>

      {/* RF-003.02, RF-003.06, RF-003.07: Tabela de Atrações */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Resumo Operacional por Atração</h2>
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>Rendimento individualizado das atrações parceiras</p>
          </div>
          
          <input 
            type="text" 
            placeholder="Filtrar por nome da atração..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', width: '280px', fontSize: '0.875rem' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>ID</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Atração Parceira</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Localidade</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Vendas</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Receita Gerada</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Métrica</th>
                <th style={{ padding: '1rem', color: '#475569', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {atracoes
                .filter(a => a.nome.toLowerCase().includes(termoBusca.toLowerCase()))
                .map((atracao) => (
                <tr key={atracao.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#94a3b8' }}>#{atracao.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#334155' }}>{atracao.nome}</td>
                  <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.875rem' }}>{atracao.cidade}/{atracao.estado}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{atracao.vendas} un.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>R$ {atracao.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                      backgroundColor: atracao.status === 'Em Alta' ? '#ecfdf5' : '#f1f5f9',
                      color: atracao.status === 'Em Alta' ? '#047857' : '#475569'
                    }}>{atracao.status}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {/* RF-003.04: Clicar para ver os detalhes da atração */}
                    <button 
                      onClick={() => navigate(`/atracoes`)}
                      style={{ padding: '0.375rem 0.75rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para os Cards
function CardKPI({ titulo, valor, detalhe, corGradient }) {
  return (
    <div style={{ 
      background: 'white', 
      padding: '1.5rem', 
      borderRadius: '16px', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ height: '4px', width: '100%', background: corGradient, position: 'absolute', top: 0, left: 0 }}></div>
      <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: '600' }}>{titulo}</h3>
      <p style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>{valor}</p>
      <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem', display: 'block' }}>{detalhe}</span>
    </div>
  );
}
