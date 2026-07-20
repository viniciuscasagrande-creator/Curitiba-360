// src/pages/TotaisAtracao.jsx
import { useState } from 'react';

export default function TotaisAtracao() {
  const [dataInicio, setDataInicio] = useState('2026-07-01');
  const [dataFim, setDataFim] = useState('2026-07-31');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de dados estatísticos por atração (RF-014)
  const [estatisticas, setEstatisticas] = useState([
    { id: 1, nome: 'Ópera de Arame', ingressosVendidos: 1250, receitaBruta: 18750.00, comissaoRetida: 1875.00, repasseLiquido: 16875.00, ticketMedio: 15.00 },
    { id: 2, nome: 'Jardim Botânico', ingressosVendidos: 3100, receitaBruta: 0.00, comissaoRetida: 0.00, repasseLiquido: 0.00, ticketMedio: 0.00 },
    { id: 3, nome: 'Museu Oscar Niemeyer', ingressosVendidos: 850, receitaBruta: 25500.00, comissaoRetida: 2550.00, repasseLiquido: 22950.00, ticketMedio: 30.00 }
  ]);

  const estatisticasFiltradas = estatisticas.filter(est => 
    est.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const totalIngressos = estatisticasFiltradas.reduce((sum, item) => sum + item.ingressosVendidos, 0);
  const totalReceita = estatisticasFiltradas.reduce((sum, item) => sum + item.receitaBruta, 0);
  const totalRepasse = estatisticasFiltradas.reduce((sum, item) => sum + item.repasseLiquido, 0);

  const handleExportarRelatorio = () => {
    alert('Exportando relatório consolidado de totais por atração em formato CSV...');
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Totais por Atração (RF-014)</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Acompanhe o volume de vendas, receita bruta gerada e valores a repassar por ponto turístico</p>
        </div>

        <button 
          onClick={handleExportarRelatorio}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📄 Exportar Planilha
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px', gap: '1.5rem', marginBottom: '2rem', alignItems: 'end', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pesquisar por Atração</label>
          <input 
            type="text" 
            placeholder="Nome da atração..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data Inicial</label>
          <input 
            type="date" 
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Data Final</label>
          <input 
            type="date" 
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
      </div>

      {/* CARDS DE CONSOLIDADO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Total de Ingressos Vendidos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0' }}>{totalIngressos} unidades</p>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Receita Bruta Total</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#10b981' }}>R$ {totalReceita.toFixed(2)}</p>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Total Repasse Líquido</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#8b5cf6' }}>R$ {totalRepasse.toFixed(2)}</p>
        </div>
      </div>

      {/* TABELA DE ESTATÍSTICAS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Atração</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ingressos Vendidos</th>
              <th style={{ padding: '1rem' }}>Ticket Médio</th>
              <th style={{ padding: '1rem' }}>Receita Bruta</th>
              <th style={{ padding: '1rem' }}>Comissão Retida</th>
              <th style={{ padding: '1rem' }}>Repasse Líquido</th>
            </tr>
          </thead>
          <tbody>
            {estatisticasFiltradas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhuma estatística disponível no período selecionado.</td>
              </tr>
            ) : (
              estatisticasFiltradas.map((est) => (
                <tr key={est.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{est.nome}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{est.ingressosVendidos}</td>
                  <td style={{ padding: '1rem' }}>R$ {est.ticketMedio.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>R$ {est.receitaBruta.toFixed(2)}</td>
                  <td style={{ padding: '1rem', color: '#ef4444' }}>- R$ {est.comissaoRetida.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>R$ {est.repasseLiquido.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
