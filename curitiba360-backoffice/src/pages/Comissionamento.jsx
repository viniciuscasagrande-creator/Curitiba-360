// src/pages/Comissionamento.jsx
import { useState } from 'react';

export default function Comissionamento() {
  const [abaAtiva, setAbaAtiva] = useState('Pendentes');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de Dados de Repasses / Comissionamento
  const [repasses, setRepasses] = useState([
    { id: 1, destinatario: 'Parque Jaime Lerner S/A', tipo: 'Parceiro Comercial', cnpj: '12.345.678/0001-90', valor: 4500.00, chavePix: '12.345.678/0001-90', status: 'Pendentes', periodo: '01/07/2026 - 15/07/2026' },
    { id: 2, destinatario: 'Tour CWB Agência', tipo: 'Agência de Turismo', cnpj: '98.765.432/0001-10', valor: 1545.00, chavePix: 'financeiro@tourcwb.com', status: 'Pendentes', periodo: '01/07/2026 - 15/07/2026' },
    { id: 3, destinatario: 'Ópera de Arame', tipo: 'Parceiro Comercial', cnpj: '11.222.333/0001-44', valor: 8900.00, chavePix: 'financeiro@opera.com', status: 'Pagos', periodo: '15/06/2026 - 30/06/2026', dataPagamento: '05/07/2026' },
  ]);

  const repassesFiltrados = repasses.filter(r => {
    const matchBusca = r.destinatario.toLowerCase().includes(termoBusca.toLowerCase()) || r.cnpj.includes(termoBusca);
    const matchAba = abaAtiva === 'Todos' || r.status === abaAtiva;
    return matchBusca && matchAba;
  });

  const handlePagarRepasse = (id) => {
    if (confirm("Confirmar a execução do pagamento via PIX integrado?")) {
      setRepasses(repasses.map(r => r.id === id ? { ...r, status: 'Pagos', dataPagamento: new Date().toLocaleDateString('pt-BR') } : r));
      alert("Pagamento processado com sucesso!");
    }
  };

  // KPIs
  const totalPendente = repasses.filter(r => r.status === 'Pendentes').reduce((acc, curr) => acc + curr.valor, 0);
  const totalPago = repasses.filter(r => r.status === 'Pagos').reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Comissionamentos e Repasses (RF-030)</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as comissões devidas a parceiros e agências de turismo e efetue os repasses financeiros</p>
      </div>

      {/* CARDS DE KPIS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Pendente de Repasse</h3>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#b45309' }}>R$ {totalPendente.toFixed(2)}</p>
          <small style={{ color: '#6b7280' }}>Refere-se ao ciclo de faturamento aberto.</small>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total Pago (Mês Atual)</h3>
          <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#047857' }}>R$ {totalPago.toFixed(2)}</p>
          <small style={{ color: '#6b7280' }}>Pagamentos liquidados com comprovante anexado.</small>
        </div>
      </div>

      {/* ABAS E FILTROS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Pendentes', 'Pagos', 'Todos'].map(aba => (
            <button 
              key={aba}
              onClick={() => setAbaAtiva(aba)}
              style={{ 
                padding: '0.5rem 0', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: abaAtiva === aba ? 'bold' : 'normal',
                borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
                color: abaAtiva === aba ? '#111827' : '#6b7280'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        <input 
          type="text" 
          placeholder="Buscar Destinatário, CNPJ..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px', marginBottom: '0.5rem' }}
        />
      </div>

      {/* TABELA DE REPASSES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Destinatário</th>
              <th style={{ padding: '1rem' }}>Tipo</th>
              <th style={{ padding: '1rem' }}>Período Ref.</th>
              <th style={{ padding: '1rem' }}>Valor do Repasse</th>
              <th style={{ padding: '1rem' }}>Dados Pix</th>
              <th style={{ padding: '1rem' }}>Status</th>
              {abaAtiva === 'Pendentes' && <th style={{ padding: '1rem', textAlign: 'center' }}>Ação</th>}
            </tr>
          </thead>
          <tbody>
            {repassesFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum repasse registrado para os filtros selecionados.</td>
              </tr>
            ) : (
              repassesFiltrados.map((rep) => (
                <tr key={rep.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{rep.destinatario}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CNPJ: {rep.cnpj}</div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{rep.tipo}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{rep.periodo}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#111827' }}>R$ {rep.valor.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{rep.chavePix}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: rep.status === 'Pagos' ? '#d1fae5' : '#fef3c7',
                      color: rep.status === 'Pagos' ? '#065f46' : '#92400e'
                    }}>
                      {rep.status === 'Pagos' ? `Pago em ${rep.dataPagamento}` : 'Aguardando Liberação'}
                    </span>
                  </td>
                  {abaAtiva === 'Pendentes' && (
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handlePagarRepasse(rep.id)}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.875rem' }}
                      >
                        Pagar PIX
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
