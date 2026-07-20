// src/pages/GestaoAtracoes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoAtracoes() {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('Ativos'); // RF-012.06
  const [selecionados, setSelecionados] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');

  // Mock de Atrações (RF-012.10)
  const [atracoes, setAtracoes] = useState([
    { id: 1, nome: 'Jardim Botânico', parceiro: 'Parque Jaime Lerner S/A', status: 'Ativo', dataCriacao: '01/07/2026', foto: 'https://via.placeholder.com/40' },
    { id: 2, nome: 'Ópera de Arame', parceiro: 'Ópera Eventos', status: 'Pendente de Contrato', dataCriacao: '05/07/2026', foto: 'https://via.placeholder.com/40' },
    { id: 3, nome: 'Tour Histórico CWB', parceiro: 'Tour CWB', status: 'Rascunho', dataCriacao: '10/07/2026', foto: 'https://via.placeholder.com/40' }
  ]);

  const filtrados = atracoes.filter(a => {
    const matchBusca = a.nome.toLowerCase().includes(termoBusca.toLowerCase()) || a.parceiro.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAba = abaAtiva === 'Todos' || a.status.includes(abaAtiva.replace('s', ''));
    return matchBusca && matchAba;
  });

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'Ativo': return { bg: '#d1fae5', text: '#065f46' };
      case 'Pendente de Contrato': return { bg: '#fef3c7', text: '#92400e' };
      case 'Rascunho': return { bg: '#f3f4f6', text: '#374151' };
      case 'Inativo': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Atrações</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie as atrações do sistema</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Buscar ID, nome, parceiro..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Filtros</button>
          <button onClick={() => navigate('/atracoes/nova')} style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ Adicionar Atração</button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem', gap: '2rem' }}>
        {['Ativos', 'Inativos', 'Todos'].map(aba => (
          <button key={aba} onClick={() => setAbaAtiva(aba)} style={{ padding: '0.5rem 0', border: 'none', background: 'none', cursor: 'pointer', fontWeight: abaAtiva === aba ? 'bold' : 'normal', borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent' }}>
            {aba}
          </button>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}><input type="checkbox" /></th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome da Atração</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Parceiro Comercial</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(a => (
              <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}><input type="checkbox" /></td>
                <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{a.id}</td>
                <td 
                  onClick={() => navigate(`/atracoes/${a.id}/totais`)}
                  style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <img src={a.foto} alt="" style={{ borderRadius: '4px' }} />
                  <strong style={{ color: '#3b82f6', textDecoration: 'underline' }}>{a.nome}</strong>
                </td>
                <td style={{ padding: '0.75rem' }}><span style={{ padding: '0.2rem 0.5rem', background: '#f3f4f6', borderRadius: '4px', fontSize: '0.75rem' }}>{a.parceiro}</span></td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStyle(a.status).bg, color: getBadgeStyle(a.status).text }}>{a.status}</span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{a.dataCriacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
