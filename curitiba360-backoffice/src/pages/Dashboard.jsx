// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../config/firebase';

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

  // Estados para os KPIs (Exemplo com dados simulados)
  const [kpis, setKpis] = useState({
    ingressosVendidos: 1250,
    cortesias: 45,
    totalIngressos: 1295,
    totalVendas: 45000.00
  });

  // RF-003.02: Lista de atrações
  const [atracoes, setAtracoes] = useState([
    { id: 1, nome: 'Visita Guiada Ópera de Arame', cidade: 'Curitiba', estado: 'PR', vendas: 350 },
    { id: 2, nome: 'Tour Panorâmico Linha Turismo', cidade: 'Curitiba', estado: 'PR', vendas: 900 }
  ]);

  // Função simulada para buscar dados do Firebase quando o período mudar
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Aqui entrarão as consultas reais ao Firestore (ex: db.collection('pedidos'))
      console.log(`Buscando dados de ${dataInicial} até ${dataFinal}`);
    };
    fetchDashboardData();
  }, [dataInicial, dataFinal]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
        
        {/* RF-003.03: Filtro de Período */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>De:</label>
            <input 
              type="date" 
              value={dataInicial} 
              onChange={(e) => setDataInicial(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>Até:</label>
            <input 
              type="date" 
              value={dataFinal} 
              onChange={(e) => setDataFinal(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </div>

      {/* RF-003.01: Cards de KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <CardKPI titulo="Ingressos Vendidos" valor={kpis.ingressosVendidos} cor="#3b82f6" />
        <CardKPI titulo="Cortesias" valor={kpis.cortesias} cor="#10b981" />
        <CardKPI titulo="Total de Ingressos" valor={kpis.totalIngressos} cor="#f59e0b" />
        <CardKPI 
          titulo="Total de Vendas" 
          valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpis.totalVendas)} 
          cor="#8b5cf6" 
        />
      </div>

      {/* RF-003.05: Placeholder para Gráfico */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: '#6b7280' }}>Área reservada para o Gráfico de Vendas (Ex: Recharts ou Chart.js)</span>
      </div>

      {/* RF-003.02, RF-003.06, RF-003.07: Tabela de Atrações */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Resumo por Atração</h2>
          
          <input 
            type="text" 
            placeholder="Pesquisar atração..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>Nome da Atração</th>
              <th style={{ padding: '0.75rem' }}>Local</th>
              <th style={{ padding: '0.75rem' }}>Vendas no Período</th>
              <th style={{ padding: '0.75rem' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {atracoes
              .filter(a => a.nome.toLowerCase().includes(termoBusca.toLowerCase()))
              .map((atracao) => (
              <tr key={atracao.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>#{atracao.id}</td>
                <td style={{ padding: '0.75rem' }}>{atracao.nome}</td>
                <td style={{ padding: '0.75rem' }}>{atracao.cidade}/{atracao.estado}</td>
                <td style={{ padding: '0.75rem' }}>{atracao.vendas}</td>
                <td style={{ padding: '0.75rem' }}>
                  {/* RF-003.04: Clicar para ver os detalhes da atração */}
                  <button 
                    onClick={() => navigate(`/atracoes/${atracao.id}`)}
                    style={{ padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
  );
}

// Componente auxiliar para os Cards
function CardKPI({ titulo, valor, cor }) {
  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${cor}` }}>
      <h3 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{titulo}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>{valor}</p>
    </div>
  );
}
