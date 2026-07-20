// src/pages/ControleTransferencias.jsx
import { useState } from 'react';

export default function ControleTransferencias() {
  const [abaAtiva, setAbaAtiva] = useState('Pendentes');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de transferências financeiras (repasses)
  const [transferencias, setTransferencias] = useState([
    { id: 'T901', destinatario: 'Parque Jaime Lerner S/A', tipo: 'Parceiro Comercial', banco: '033 - Santander', chavePix: '12.345.678/0001-90', valor: 16875.00, status: 'Pendentes', dataSolicitacao: '19/07/2026 18:00' },
    { id: 'T902', destinatario: 'Tour CWB Agência', tipo: 'Agência de Turismo', banco: '341 - Itaú', chavePix: 'contato@tourcwb.com', valor: 1200.00, status: 'Pendentes', dataSolicitacao: '20/07/2026 09:30' },
    { id: 'T903', destinatario: 'Curitiba Guia Viagens', tipo: 'Agência de Turismo', banco: '260 - Nubank', chavePix: '09.876.543/0001-21', valor: 850.00, status: 'Concluídas', dataProcessamento: '18/07/2026 15:00', dataSolicitacao: '17/07/2026 11:00' },
  ]);

  const filtrados = transferencias.filter(t => {
    const matchBusca = t.destinatario.toLowerCase().includes(termoBusca.toLowerCase()) || t.id.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAba = abaAtiva === 'Todas' || t.status === abaAtiva;
    return matchBusca && matchAba;
  });

  const handleProcessarTransferencia = (id) => {
    if (confirm(`Confirmar o processamento do repasse #${id}? O Pix será disparado.`)) {
      setTransferencias(transferencias.map(t => t.id === id ? { ...t, status: 'Concluídas', dataProcessamento: new Date().toLocaleString('pt-BR') } : t));
      alert('Repasse processado com sucesso!');
    }
  };

  const handleRejeitarTransferencia = (id) => {
    const motivo = prompt('Informe a justificativa de rejeição do repasse (Dados bancários incorretos, etc):');
    if (motivo) {
      setTransferencias(transferencias.map(t => t.id === id ? { ...t, status: 'Rejeitadas', motivoRejeicao: motivo } : t));
      alert('Solicitação de repasse rejeitada.');
    }
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Controle de Transferências (Repasses)</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Efetue, autorize e exporte remessas de saques de repasses de comissão para agências e parceiros credenciados</p>
        </div>
        
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          📦 Exportar Arquivo CNAB240
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Pendentes', 'Concluídas', 'Rejeitadas', 'Todas'].map(aba => (
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
          placeholder="Buscar Destinatário ou ID..." 
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
              <th style={{ padding: '1rem' }}>ID Transação</th>
              <th style={{ padding: '1rem' }}>Destinatário</th>
              <th style={{ padding: '1rem' }}>Tipo</th>
              <th style={{ padding: '1rem' }}>Dados de Depósito (PIX)</th>
              <th style={{ padding: '1rem' }}>Valor Repasse</th>
              <th style={{ padding: '1rem' }}>Status</th>
              {abaAtiva === 'Pendentes' && <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum repasse registrado para esta aba.</td>
              </tr>
            ) : (
              filtrados.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>#{t.id}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{t.destinatario}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Solicitado: {t.dataSolicitacao}</div>
                    {t.dataProcessamento && <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Pago: {t.dataProcessamento}</div>}
                    {t.motivoRejeicao && <div style={{ fontSize: '0.75rem', color: '#ef4444' }}><strong>Motivo Rejeição:</strong> {t.motivoRejeicao}</div>}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{t.tipo}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{t.banco}</div>
                    <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Chave: {t.chavePix}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', fontSize: '1rem' }}>
                    R$ {t.valor.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: t.status === 'Concluídas' ? '#d1fae5' : t.status === 'Rejeitadas' ? '#fee2e2' : '#fef3c7',
                      color: t.status === 'Concluídas' ? '#065f46' : t.status === 'Rejeitadas' ? '#991b1b' : '#92400e'
                    }}>
                      {t.status}
                    </span>
                  </td>
                  {abaAtiva === 'Pendentes' && (
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleProcessarTransferencia(t.id)}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                      >
                        Pagar Pix
                      </button>
                      <button 
                        onClick={() => handleRejeitarTransferencia(t.id)}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                      >
                        Rejeitar
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
