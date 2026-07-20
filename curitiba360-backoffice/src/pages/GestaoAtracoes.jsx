// src/pages/GestaoAtracoes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoAtracoes() {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Mock de dados baseado no seed do database (coleção atracoes)
  const [atracoes, setAtracoes] = useState([
    {
      id: 1,
      nome: "Visita Guiada Ópera de Arame",
      capacidadePublico: 1000,
      classificacaoEtaria: "Livre",
      precoIngresso: 15.00,
      status: "ATIVO",
      linkYoutube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 2,
      nome: "Jardim Botânico de Curitiba",
      capacidadePublico: 2000,
      classificacaoEtaria: "Livre",
      precoIngresso: 0.00,
      status: "ATIVO",
      linkYoutube: ""
    }
  ]);

  const atracoesFiltradas = atracoes.filter(a => {
    const matchBusca = a.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' || a.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const handleToggleStatus = (id) => {
    setAtracoes(atracoes.map(a => a.id === id ? { ...a, status: a.status === 'ATIVO' ? 'INATIVO' : 'ATIVO' } : a));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Atrações</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as atrações e pontos turísticos listados no portal público</p>
        </div>
        
        <button 
          onClick={() => navigate('/atracoes/novo')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Adicionar Atração
        </button>
      </div>

      {/* FILTROS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar atração por nome..." 
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
          <option value="ATIVO">Ativas</option>
          <option value="INATIVO">Inativas</option>
        </select>
      </div>

      {/* TABELA DE ATRAÇÕES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Nome da Atração</th>
              <th style={{ padding: '1rem' }}>Capacidade máxima</th>
              <th style={{ padding: '1rem' }}>Classificação</th>
              <th style={{ padding: '1rem' }}>Preço Ingresso</th>
              <th style={{ padding: '1rem' }}>Vídeo Youtube</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {atracoesFiltradas.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhuma atração cadastrada.</td>
              </tr>
            ) : (
              atracoesFiltradas.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{a.nome}</td>
                  <td style={{ padding: '1rem' }}>{a.capacidadePublico} pessoas</td>
                  <td style={{ padding: '1rem' }}>{a.classificacaoEtaria}</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>
                    {a.precoIngresso === 0 ? 'Gratuito' : `R$ ${a.precoIngresso.toFixed(2)}`}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                    {a.linkYoutube ? (
                      <a href={a.linkYoutube} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                        Ver Vídeo 🔗
                      </a>
                    ) : (
                      <span style={{ color: '#9ca3af' }}>Nenhum</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: a.status === 'ATIVO' ? '#d1fae5' : '#fee2e2',
                      color: a.status === 'ATIVO' ? '#065f46' : '#991b1b'
                    }}>
                      {a.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => navigate(`/atracoes/${a.id}`)}
                      style={{ padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(a.id)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: a.status === 'ATIVO' ? '#f59e0b' : '#10b981', 
                        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' 
                      }}
                    >
                      {a.status === 'ATIVO' ? 'Inativar' : 'Ativar'}
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
