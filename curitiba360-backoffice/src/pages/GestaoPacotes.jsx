// src/pages/GestaoPacotes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoPacotes() {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  // Mock de pacotes promocionais
  const [pacotes, setPacotes] = useState([
    { id: 1, nome: 'Curitiba Cultural', atracoes: 'Ópera de Arame, MON, Teatro Paiol', precoOriginal: 75.00, precoDesconto: 60.00, status: 'Ativo', dataValidade: '31/12/2026' },
    { id: 2, nome: 'Parques e Natureza', atracoes: 'Jardim Botânico, Parque Tanguá, Bosque Alemão', precoOriginal: 40.00, precoDesconto: 30.00, status: 'Ativo', dataValidade: '31/10/2026' },
    { id: 3, nome: 'Fim de Semana Completo', atracoes: 'Linha Turismo + 2 Atrações', precoOriginal: 120.00, precoDesconto: 95.00, status: 'Inativo', dataValidade: '01/06/2026' },
  ]);

  const filtrados = pacotes.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || p.atracoes.toLowerCase().includes(termoBusca.toLowerCase());
    const matchStatus = filtroStatus === 'Todos' || p.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const handleToggleStatus = (id) => {
    setPacotes(pacotes.map(p => p.id === id ? { ...p, status: p.status === 'Ativo' ? 'Inativo' : 'Ativo' } : p));
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Pacotes de Atrações</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Agrupe múltiplos ingressos de atração em combos promocionais com descontos exclusivos para turistas</p>
        </div>

        <button 
          onClick={() => navigate('/pacotes/novo')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Criar Novo Combo
        </button>
      </div>

      {/* FILTROS E BUSCA */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Buscar combo por nome ou atrações inclusas..." 
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
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>
      </div>

      {/* TABELA DE PACOTES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem' }}>Combo / Pacote</th>
              <th style={{ padding: '1rem' }}>Atrações Inclusas</th>
              <th style={{ padding: '1rem' }}>Preço Original</th>
              <th style={{ padding: '1rem' }}>Preço com Desconto</th>
              <th style={{ padding: '1rem' }}>Válido até</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum combo localizado.</td>
              </tr>
            ) : (
              filtrados.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{p.nome}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{p.atracoes}</td>
                  <td style={{ padding: '1rem', textDecoration: 'line-through', color: '#9ca3af' }}>
                    R$ {p.precoOriginal.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: '#10b981', fontSize: '1rem' }}>
                    R$ {p.precoDesconto.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{p.dataValidade}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      backgroundColor: p.status === 'Ativo' ? '#d1fae5' : '#fee2e2',
                      color: p.status === 'Ativo' ? '#065f46' : '#991b1b'
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer', fontSize: '0.75rem' }}>Editar</button>
                    <button 
                      onClick={() => handleToggleStatus(p.id)}
                      style={{ 
                        padding: '0.25rem 0.5rem', 
                        backgroundColor: p.status === 'Ativo' ? '#f59e0b' : '#10b981', 
                        color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' 
                      }}
                    >
                      {p.status === 'Ativo' ? 'Inativar' : 'Ativar'}
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
