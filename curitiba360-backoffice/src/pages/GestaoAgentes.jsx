// src/pages/GestaoAgentes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoAgentes() {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroAgencia, setFiltroAgencia] = useState('Todas');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Mock de dados de Agentes vinculados a Agências
  const [agentes, setAgentes] = useState([
    { id: 1, nome: 'Mariana Costa', email: 'mariana@tourcwb.com', agencia: 'Tour CWB Agência', status: 'Ativo', dataCadastro: '05/07/2026' },
    { id: 2, nome: 'Pedro Santos', email: 'pedro@curitibaguia.com.br', agencia: 'Curitiba Guia Viagens', status: 'Ativo', dataCadastro: '10/07/2026' },
    { id: 3, nome: 'Carla Dias', email: 'carla@tourcwb.com', agencia: 'Tour CWB Agência', status: 'Inativo', dataCadastro: '12/07/2026' },
  ]);

  // Mock de lista de Agências para filtro
  const agencias = ['Tour CWB Agência', 'Curitiba Guia Viagens'];

  const filtrados = agentes.filter(a => {
    const matchBusca = a.nome.toLowerCase().includes(termoBusca.toLowerCase()) || a.email.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAgencia = filtroAgencia === 'Todas' || a.agencia === filtroAgencia;
    const matchStatus = filtroStatus === 'Todos' || a.status === filtroStatus;
    return matchBusca && matchAgencia && matchStatus;
  });

  const handleToggleStatus = (id) => {
    setAgentes(agentes.map(a => a.id === id ? { ...a, status: a.status === 'Ativo' ? 'Inativo' : 'Ativo' } : a));
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Agentes de Turismo</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as contas, permissões e status dos agentes vinculados às agências cadastradas</p>
        </div>

        <button 
          onClick={() => navigate('/usuarios/novo')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Novo Agente
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar agente por nome ou email..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '250px' }}
        />

        <select 
          value={filtroAgencia} 
          onChange={(e) => setFiltroAgencia(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Todas">Todas as Agências</option>
          {agencias.map((ag, idx) => (
            <option key={idx} value={ag}>{ag}</option>
          ))}
        </select>

        <select 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      {/* TABELA DE AGENTES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Nome / Email</th>
              <th style={{ padding: '1rem' }}>Agência Vinculada</th>
              <th style={{ padding: '1rem' }}>Data Cadastro</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum agente localizado.</td>
              </tr>
            ) : (
              filtrados.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{a.nome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{a.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.2rem 0.5rem', background: '#f3f4f6', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 'bold' }}>
                      {a.agencia}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{a.dataCadastro}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: a.status === 'Ativo' ? '#d1fae5' : '#fee2e2',
                      color: a.status === 'Ativo' ? '#065f46' : '#991b1b'
                    }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Editar</button>
                    <button 
                      onClick={() => handleToggleStatus(a.id)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: a.status === 'Ativo' ? '#f59e0b' : '#10b981', 
                        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' 
                      }}
                    >
                      {a.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                    </button>
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
