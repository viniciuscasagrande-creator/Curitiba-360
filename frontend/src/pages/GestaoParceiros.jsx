// src/pages/GestaoParceiros.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoParceiros() {
  const navigate = useNavigate();
  
  // RF-036.05 e RF-036.06: Abas de Status (Padrão: 'Ativas')
  const [abaAtiva, setAbaAtiva] = useState('Ativas');
  const [termoBusca, setTermoBusca] = useState('');
  
  // RF-036.13 a RF-036.15: Controle de seleção múltipla
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock de dados para visualização (RF-036.08)
  const [parceiros, setParceiros] = useState([
    { id: 1, razaoSocial: 'Parque Jaime Lerner S/A', nomeFantasia: 'Parque Jaime Lerner', cnpj: '12.345.678/0001-90', email: 'contato@jaimelerner.com', status: 'Ativas', qtdAtracoes: 2, dataCadastro: '10/07/2026' },
    { id: 2, razaoSocial: 'Ópera Eventos Culturais Ltda', nomeFantasia: 'Ópera de Arame', cnpj: '98.765.432/0001-10', email: 'eventos@opera.com', status: 'Pendente de Aprovação', qtdAtracoes: 0, dataCadastro: '18/07/2026' },
    { id: 3, razaoSocial: 'Museu Oscar Niemeyer', nomeFantasia: 'MON', cnpj: '11.222.333/0001-44', email: 'diretoria@mon.gov.br', status: 'Suspensas', qtdAtracoes: 1, dataCadastro: '05/07/2026' },
  ]);

  // Lógica para filtrar a tabela (RF-036.02 e RF-036.07)
  const parceirosFiltrados = parceiros.filter(p => {
    const matchBusca = 
      p.razaoSocial.toLowerCase().includes(termoBusca.toLowerCase()) || 
      p.nomeFantasia.toLowerCase().includes(termoBusca.toLowerCase()) ||
      p.cnpj.includes(termoBusca);
    
    // Map 'Ativas' to match mock data status field which might be 'Ativa' or plural depending on UI
    const matchAba = abaAtiva === 'Todas' || p.status === abaAtiva || (abaAtiva === 'Ativas' && p.status === 'Ativas') || (abaAtiva === 'Suspensas' && p.status === 'Suspensas');
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(parceirosFiltrados.map(p => p.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  // Funções de Ação (RF-036.25, RF-036.30, etc)
  const handleAprovar = () => {
    // RN-036.14: Aprovar deve gerar um Contrato Rascunho e enviar e-mail com credenciais
    alert(`Aprovando parceiros: ${selecionados.join(', ')}. Contrato rascunho gerado!`);
    setSelecionados([]);
  };

  return (
    <div>
      {/* CABEÇALHO DA TELA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Parceiros Comerciais</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie os parceiros comerciais cadastrados no sistema</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar Razão Social, CNPJ..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
          />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
            Filtros
          </button>
          <button 
            onClick={() => navigate('/parceiros/novo')} 
            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Adicionar Parceiro
          </button>
        </div>
      </div>

      {/* ABAS DE STATUS E BARRA DE AÇÕES (RF-036.16 a RF-036.19) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Ativas', 'Pendente de Aprovação', 'Suspensas', 'Inativas', 'Todas'].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setSelecionados([]); }}
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

        {/* BARRA DE AÇÕES CONTEXTUAL */}
        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            
            <button disabled={selecionados.length !== 1} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
            
            {abaAtiva === 'Pendente de Aprovação' && (
              <>
                <button onClick={handleAprovar} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981', fontWeight: 'bold' }}>Aprovar</button>
                <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}>Rejeitar</button>
                <button disabled={selecionados.length !== 1} style={{ padding: '0.25rem 0.5rem' }}>Solicitar Docs</button>
              </>
            )}

            {abaAtiva === 'Ativas' && <button style={{ padding: '0.25rem 0.5rem' }}>Suspender</button>}
            {(abaAtiva === 'Suspensas' || abaAtiva === 'Inativas') && <button style={{ padding: '0.25rem 0.5rem' }}>Reativar</button>}
            
            <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
          </div>
        )}
      </div>

      {/* TABELA DE PARCEIROS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                <input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === parceirosFiltrados.length && parceirosFiltrados.length > 0} />
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Razão Social</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>CNPJ</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atrações</th>
            </tr>
          </thead>
          <tbody>
            {parceirosFiltrados.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>
                  <input type="checkbox" checked={selecionados.includes(p.id)} onChange={() => handleSelecionarUm(p.id)} />
                </td>
                <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{p.id}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{p.razaoSocial}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{p.email}</div>
                </td>
                <td style={{ padding: '0.75rem' }}>{p.cnpj}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                    backgroundColor: p.status === 'Ativas' ? '#d1fae5' : p.status === 'Pendente de Aprovação' ? '#fef3c7' : '#fee2e2',
                    color: p.status === 'Ativas' ? '#065f46' : p.status === 'Pendente de Aprovação' ? '#92400e' : '#991b1b'
                  }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>{p.qtdAtracoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
