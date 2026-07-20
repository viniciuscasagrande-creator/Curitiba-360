// src/pages/GestaoAgencias.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoAgencias() {
  const navigate = useNavigate();
  
  // RF-026.05 e RF-026.06: Abas de Status
  const [abaAtiva, setAbaAtiva] = useState('Todas');
  const [termoBusca, setTermoBusca] = useState('');
  
  // RF-026.13 a RF-026.15: Controle de seleção múltipla
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock de dados baseado no seed do database
  const [agencias, setAgencias] = useState([
    { id: 1, razaoSocial: 'Turismo Curitiba 360 Ltda', nomeFantasia: 'Tour CWB', cnpj: '98.765.432/0001-10', status: 'ATIVO', responsavel: 'Maria Oliveira', qtdAgentes: 1, dataCadastro: '10/07/2026' },
    { id: 2, razaoSocial: 'Batel Agência de Viagens Eireli', nomeFantasia: 'Batel Turismo', cnpj: '12.222.333/0001-44', status: 'ATIVO', responsavel: 'Juliana Costa', qtdAgentes: 12, dataCadastro: '20/07/2026' },
  ]);

  // Lógica para filtrar a tabela (RF-026.02 e RF-026.07)
  const agenciasFiltradas = agencias.filter(ag => {
    const matchBusca = 
      ag.razaoSocial.toLowerCase().includes(termoBusca.toLowerCase()) || 
      ag.nomeFantasia.toLowerCase().includes(termoBusca.toLowerCase()) ||
      ag.cnpj.includes(termoBusca);
    
    const matchAba = abaAtiva === 'Todas' || ag.status === abaAtiva;
    return matchBusca && matchAba;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(agenciasFiltradas.map(ag => ag.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  return (
    <div>
      {/* CABEÇALHO DA TELA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Agências de Turismo</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as agências cadastradas no sistema</p>
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
            onClick={() => navigate('/agencias/novo')} 
            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Adicionar Agência
          </button>
        </div>
      </div>

      {/* ABAS DE STATUS E BARRA DE AÇÕES (RF-026.16 a RF-026.19) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['ATIVO', 'AGUARDANDO_CONTRATO', 'INATIVA', 'Todas'].map(aba => (
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
              {aba === 'ATIVO' ? 'Ativas' : aba === 'AGUARDANDO_CONTRATO' ? 'Aguardando Contrato' : aba === 'INATIVA' ? 'Inativas' : 'Todas'}
            </button>
          ))}
        </div>

        {/* BARRA DE AÇÕES CONTEXTUAL */}
        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            
            <button disabled={selecionados.length !== 1} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
            
            {abaAtiva === 'AGUARDANDO_CONTRATO' && (
              <>
                <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981', fontWeight: 'bold' }}>Emitir Contrato</button>
                <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}>Recusar Credenciamento</button>
              </>
            )}

            {abaAtiva === 'ATIVO' && <button style={{ padding: '0.25rem 0.5rem' }}>Suspender</button>}
            
            <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
          </div>
        )}
      </div>

      {/* TABELA DE AGÊNCIAS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                <input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === agenciasFiltradas.length && agenciasFiltradas.length > 0} />
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome Fantasia / Razão Social</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>CNPJ</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Responsável</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Agentes</th>
            </tr>
          </thead>
          <tbody>
            {agenciasFiltradas.map((ag) => (
              <tr key={ag.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>
                  <input type="checkbox" checked={selecionados.includes(ag.id)} onChange={() => handleSelecionarUm(ag.id)} />
                </td>
                <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{ag.id}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{ag.nomeFantasia}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{ag.razaoSocial}</div>
                </td>
                <td style={{ padding: '0.75rem' }}>{ag.cnpj}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{ag.responsavel}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                    backgroundColor: ag.status === 'ATIVO' ? '#d1fae5' : ag.status === 'AGUARDANDO_CONTRATO' ? '#fef3c7' : '#fee2e2',
                    color: ag.status === 'ATIVO' ? '#065f46' : ag.status === 'AGUARDANDO_CONTRATO' ? '#92400e' : '#991b1b'
                  }}>
                    {ag.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>{ag.qtdAgentes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
