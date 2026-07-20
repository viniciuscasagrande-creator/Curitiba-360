// src/pages/GestaoRelatoriosFinanceiros.jsx
import { useState } from 'react';

export default function GestaoRelatoriosFinanceiros() {
  const [dataInicio, setDataInicio] = useState('2026-07-01');
  const [dataFim, setDataFim] = useState('2026-07-20');
  const [canalFiltro, setCanalFiltro] = useState('Todos');

  // Mock de Relatório Consolidado
  const resumoFinanceiro = {
    faturamentoBruto: 458900.00,
    comissaoPlataforma: 68835.00, // ~15% médio
    taxaGateway: 16061.50, // ~3.5%
    repasseLiquido: 374003.50,
  };

  // Transações consolidadas para auditoria
  const transacoes = [
    { id: 'TX_1001', data: '20/07/2026 12:05', cliente: 'Alice Silva', item: 'Ingresso Jardim Botânico (x2)', valor: 100.00, canal: 'Portal Público', gateway: 'Pix', status: 'Aprovado' },
    { id: 'TX_1002', data: '20/07/2026 11:30', cliente: 'Bruno Alves', item: 'Ingresso Ópera de Arame (x3)', valor: 360.00, canal: 'Agente de Turismo', gateway: 'Cartão de Crédito', status: 'Aprovado' },
    { id: 'TX_1003', data: '19/07/2026 18:22', cliente: 'Clara Costa', item: 'Combo Parques e Natureza (x1)', valor: 30.00, gateway: 'Pix', canal: 'Portal Público', status: 'Reembolsado' },
    { id: 'TX_1004', data: '19/07/2026 15:45', cliente: 'Diego Souza', item: 'Ingresso Ópera de Arame (x1)', valor: 120.00, gateway: 'Cartão de Crédito', canal: 'Portal Público', status: 'Pendente' }
  ];

  const transacoesFiltradas = transacoes.filter(tx => {
    return canalFiltro === 'Todos' || tx.canal === canalFiltro;
  });

  const handleExportarXLSX = () => {
    alert('Consolidando dados financeiros e exportando planilha em formato XLSX...');
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Relatórios Financeiros Consolidados</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Audite o faturamento bruto, taxas de comissão e repasses do ecossistema Curitiba 360</p>
        </div>

        <button 
          onClick={handleExportarXLSX}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          📊 Exportar XLSX
        </button>
      </div>

      {/* FILTROS DE AUDITORIA */}
      <div style={{ display: 'flex', gap: '1rem', background: 'white', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Data Inicial</label>
          <input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Data Final</label>
          <input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Filtrar por Canal</label>
          <select value={canalFiltro} onChange={e => setCanalFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }}>
            <option value="Todos">Todos os Canais</option>
            <option value="Portal Público">Portal Público</option>
            <option value="Agente de Turismo">Agente de Turismo</option>
          </select>
        </div>
      </div>

      {/* CARDS DE BALANÇO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #3b82f6' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Faturamento Bruto</span>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#1e3a8a' }}>R$ {resumoFinanceiro.faturamentoBruto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #f59e0b' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Comissão Plataforma</span>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#b45309' }}>R$ {resumoFinanceiro.comissaoPlataforma.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #ef4444' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Custos Gateway</span>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#b91c1c' }}>- R$ {resumoFinanceiro.taxaGateway.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderTop: '4px solid #10b981' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Repasse Líquido (Parceiros)</span>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0 0 0', color: '#047857' }}>R$ {resumoFinanceiro.repasseLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* TABELA DE DETALHE DE TRANSAÇÕES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold', fontSize: '1rem' }}>Detalhamento das Operações</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>ID Transação</th>
              <th style={{ padding: '1rem' }}>Data</th>
              <th style={{ padding: '1rem' }}>Cliente</th>
              <th style={{ padding: '1rem' }}>Item Adquirido</th>
              <th style={{ padding: '1rem' }}>Método</th>
              <th style={{ padding: '1rem' }}>Origem/Canal</th>
              <th style={{ padding: '1rem' }}>Valor</th>
              <th style={{ padding: '1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transacoesFiltradas.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{tx.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{tx.data}</td>
                <td style={{ padding: '1rem' }}>{tx.cliente}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{tx.item}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{tx.gateway}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: '#eff6ff', color: '#1e40af', borderRadius: '4px', fontWeight: 'bold' }}>
                    {tx.canal}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>R$ {tx.valor.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                    backgroundColor: tx.status === 'Aprovado' ? '#d1fae5' : tx.status === 'Reembolsado' ? '#fee2e2' : '#fef3c7',
                    color: tx.status === 'Aprovado' ? '#065f46' : tx.status === 'Reembolsado' ? '#991b1b' : '#92400e'
                  }}>{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
