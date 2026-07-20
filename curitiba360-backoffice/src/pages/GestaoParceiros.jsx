// src/pages/GestaoParceiros.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoParceiros() {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Dados mockados baseados no seed do database
  const [parceiros, setParceiros] = useState([
    {
      id: 1,
      razaoSocial: "Parque Jaime Lerner Ltda",
      nomeFantasia: "Parque Jaime Lerner",
      cnpj: "12.345.678/0001-90",
      segmento: "Parque",
      emailComercial: "contato@parque.com",
      telefoneComercial: "(41) 3333-3333",
      status: "ATIVO",
      dataCriacao: "20/07/2026 10:00:00"
    },
    {
      id: 2,
      razaoSocial: "Ópera de Arame Entretenimento S.A.",
      nomeFantasia: "Ópera de Arame",
      cnpj: "98.765.432/0001-10",
      segmento: "Teatro / Cultura",
      emailComercial: "opera@arame.com",
      telefoneComercial: "(41) 3222-2222",
      status: "ATIVO",
      dataCriacao: "20/07/2026 10:02:00"
    }
  ]);

  const parceirosFiltrados = parceiros.filter(p => {
    const matchBusca = p.nomeFantasia.toLowerCase().includes(termoBusca.toLowerCase()) || 
                       p.razaoSocial.toLowerCase().includes(termoBusca.toLowerCase()) ||
                       p.cnpj.includes(termoBusca);
    const matchStatus = filtroStatus === 'Todos' || p.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const handleMudarStatus = (id, novoStatus) => {
    setParceiros(parceiros.map(p => p.id === id ? { ...p, status: novoStatus } : p));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Parceiros Comerciais</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Credenciamento, auditoria e controle de parceiros comerciais e locais</p>
        </div>
        
        <button 
          onClick={() => navigate('/parceiros/novo')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Adicionar Parceiro
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar por nome, razão social ou CNPJ..." 
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', flex: 1, minWidth: '250px' }}
        />
        
        <select 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Todos">Todos os Status</option>
          <option value="ATIVO">Ativos</option>
          <option value="PENDENTE_APROVACAO">Pendentes</option>
          <option value="SUSPENSA">Suspensos</option>
          <option value="INATIVA">Inativos</option>
        </select>
      </div>

      {/* TABELA DE PARCEIROS */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Razão Social / Fantasia</th>
              <th style={{ padding: '1rem' }}>CNPJ</th>
              <th style={{ padding: '1rem' }}>Segmento</th>
              <th style={{ padding: '1rem' }}>Contato</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {parceirosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum parceiro comercial cadastrado.</td>
              </tr>
            ) : (
              parceirosFiltrados.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{p.nomeFantasia}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{p.razaoSocial}</div>
                  </td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>{p.cnpj}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '0.75rem' }}>{p.segmento}</span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    <div>{p.emailComercial}</div>
                    <div style={{ color: '#6b7280' }}>{p.telefoneComercial}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: p.status === 'ATIVO' ? '#d1fae5' : p.status === 'PENDENTE_APROVACAO' ? '#fef3c7' : '#fee2e2',
                      color: p.status === 'ATIVO' ? '#065f46' : p.status === 'PENDENTE_APROVACAO' ? '#92400e' : '#991b1b'
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => navigate(`/parceiros/${p.id}`)}
                      style={{ padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Editar
                    </button>
                    {p.status === 'ATIVO' ? (
                      <button 
                        onClick={() => handleMudarStatus(p.id, 'SUSPENSA')}
                        style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Suspender
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleMudarStatus(p.id, 'ATIVO')}
                        style={{ padding: '0.25rem 0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Ativar
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
