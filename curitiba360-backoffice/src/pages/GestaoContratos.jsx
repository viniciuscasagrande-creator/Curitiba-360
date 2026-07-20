// src/pages/GestaoContratos.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoContratos() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('Todos');
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de contratos comerciais/agências
  const [contratos, setContratos] = useState([
    { id: 'C2026-01', contratado: 'Parque Jaime Lerner S/A', tipo: 'Parceiro Comercial', status: 'ATIVO', dataInicio: '10/07/2026', dataFim: '10/07/2027', comissao: '10%' },
    { id: 'C2026-02', contratado: 'Tour CWB Agência', tipo: 'Agência de Turismo', status: 'RASCUNHO', dataInicio: '18/07/2026', dataFim: '18/07/2027', comissao: '8%' },
    { id: 'C2026-03', contratado: 'Ópera Eventos Culturais', tipo: 'Parceiro Comercial', status: 'AGUARDANDO_ASSINATURA', dataInicio: '15/07/2026', dataFim: '15/07/2027', comissao: '12%' },
  ]);

  const contratosFiltrados = contratos.filter(c => {
    const matchBusca = c.contratado.toLowerCase().includes(termoBusca.toLowerCase()) || c.id.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAba = abaAtiva === 'Todos' || c.status === abaAtiva;
    return matchBusca && matchAba;
  });

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'ATIVO': return { bg: '#d1fae5', text: '#065f46' };
      case 'AGUARDANDO_ASSINATURA': return { bg: '#fef3c7', text: '#92400e' };
      case 'RASCUNHO': return { bg: '#f3f4f6', text: '#374151' };
      case 'EXPIRADO': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const handleDispararAssinatura = (id) => {
    setContratos(contratos.map(c => c.id === id ? { ...c, status: 'AGUARDANDO_ASSINATURA' } : c));
    alert(`Contrato #${id} enviado para o e-mail do contratado para assinatura digital.`);
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Contratos</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie contratos comerciais de parceiros locais e credenciamento de agências</p>
        </div>
        
        <button 
          onClick={() => navigate('/contratos/novo')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Elaborar Contrato
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Todos', 'RASCUNHO', 'AGUARDANDO_ASSINATURA', 'ATIVO', 'EXPIRADO'].map(aba => (
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
              {aba === 'ATIVO' ? 'Ativos' : aba === 'AGUARDANDO_ASSINATURA' ? 'Assinaturas' : aba === 'RASCUNHO' ? 'Rascunhos' : aba === 'EXPIRADO' ? 'Expirados' : 'Todos'}
            </button>
          ))}
        </div>

        <input 
          type="text" 
          placeholder="Buscar por ID ou Contratado..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px', marginBottom: '0.5rem' }}
        />
      </div>

      {/* TABELA DE CONTRATOS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Código</th>
              <th style={{ padding: '1rem' }}>Contratado / Razão Social</th>
              <th style={{ padding: '1rem' }}>Tipo</th>
              <th style={{ padding: '1rem' }}>Comissão</th>
              <th style={{ padding: '1rem' }}>Vigência</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contratosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum contrato cadastrado para esta aba.</td>
              </tr>
            ) : (
              contratosFiltrados.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{c.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{c.contratado}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{c.tipo}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>{c.comissao}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    {c.dataInicio} até {c.dataFim}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                      backgroundColor: getBadgeStyle(c.status).bg, color: getBadgeStyle(c.status).text
                    }}>
                      {c.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Visualizar PDF</button>
                    {c.status === 'RASCUNHO' && (
                      <button 
                        onClick={() => handleDispararAssinatura(c.id)}
                        style={{ padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Enviar p/ Assinar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
