// src/pages/FilaReembolsos.jsx
import { useState } from 'react';

export default function FilaReembolsos() {
  const [abaAtiva, setAbaAtiva] = useState('Aguardando Análise');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de dados da fila de reembolsos
  const [reembolsos, setReembolsos] = useState([
    { id: 'R101', dataSolicitacao: '20/07/2026 09:15', turistaNome: 'Carlos Silva', turistaEmail: 'carlos@email.com', atracao: 'Ópera de Arame', valorIngresso: 50.00, motivo: 'Desistência da viagem', status: 'Aguardando Análise' },
    { id: 'R102', dataSolicitacao: '19/07/2026 15:40', turistaNome: 'Juliana Lins', turistaEmail: 'juliana@email.com', atracao: 'Parque Jaime Lerner', valorIngresso: 75.00, motivo: 'Condições meteorológicas (chuva forte)', status: 'Aguardando Análise' },
    { id: 'R103', dataSolicitacao: '18/07/2026 11:00', turistaNome: 'Marcos Souza', turistaEmail: 'marcos@email.com', atracao: 'Jardim Botânico', valorIngresso: 30.00, motivo: 'Problemas de saúde na família', status: 'Aprovado', dataProcessamento: '19/07/2026 10:00' },
  ]);

  const reembolsosFiltrados = reembolsos.filter(r => {
    const matchBusca = r.turistaNome.toLowerCase().includes(termoBusca.toLowerCase()) || r.id.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAba = abaAtiva === 'Todos' || r.status === abaAtiva;
    return matchBusca && matchAba;
  });

  const handleAprovar = (id) => {
    if (confirm(`Confirmar a aprovação do reembolso #${id}? O estorno será disparado automaticamente no gateway.`)) {
      setReembolsos(reembolsos.map(r => r.id === id ? { ...r, status: 'Aprovado', dataProcessamento: new Date().toLocaleDateString('pt-BR') } : r));
      alert('Estorno aprovado com sucesso no gateway!');
    }
  };

  const handleRejeitar = (id) => {
    const motivoRejeicao = prompt("Informe a justificativa de rejeição (Obrigatório para o turista):");
    if (motivoRejeicao) {
      setReembolsos(reembolsos.map(r => r.id === id ? { ...r, status: 'Rejeitado', justificativa: motivoRejeicao, dataProcessamento: new Date().toLocaleDateString('pt-BR') } : r));
      alert('Solicitação de reembolso rejeitada.');
    } else {
      alert("A justificativa é obrigatória para rejeitar a solicitação.");
    }
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Fila de Reembolsos (RF-031)</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as solicitações de estorno e cancelamento de ingressos realizadas pelos turistas</p>
      </div>

      {/* ABAS DE FILTRO E CAMPO DE BUSCA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Aguardando Análise', 'Aprovado', 'Rejeitado', 'Todos'].map(aba => (
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
          placeholder="Buscar por ID ou Turista..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px', marginBottom: '0.5rem' }}
        />
      </div>

      {/* TABELA DE REEMBOLSOS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>ID Solicitação</th>
              <th style={{ padding: '1rem' }}>Data</th>
              <th style={{ padding: '1rem' }}>Turista</th>
              <th style={{ padding: '1rem' }}>Atração</th>
              <th style={{ padding: '1rem' }}>Valor</th>
              <th style={{ padding: '1rem' }}>Motivo Justificado</th>
              <th style={{ padding: '1rem' }}>Status</th>
              {abaAtiva === 'Aguardando Análise' && <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {reembolsosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhuma solicitação de reembolso pendente.</td>
              </tr>
            ) : (
              reembolsosFiltrados.map((rem) => (
                <tr key={rem.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#3b82f6' }}>#{rem.id}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{rem.dataSolicitacao}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{rem.turistaNome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rem.turistaEmail}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{rem.atracao}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>R$ {rem.valorIngresso.toFixed(2)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    <div>{rem.motivo}</div>
                    {rem.justificativa && <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}><strong>Motivo Rejeição:</strong> {rem.justificativa}</div>}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: rem.status === 'Aprovado' ? '#d1fae5' : rem.status === 'Rejeitado' ? '#fee2e2' : '#fef3c7',
                      color: rem.status === 'Aprovado' ? '#065f46' : rem.status === 'Rejeitado' ? '#991b1b' : '#92400e'
                    }}>
                      {rem.status}
                    </span>
                  </td>
                  {abaAtiva === 'Aguardando Análise' && (
                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => handleAprovar(rem.id)}
                        style={{ padding: '0.4rem 0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                      >
                        Aprovar
                      </button>
                      <button 
                        onClick={() => handleRejeitar(rem.id)}
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
