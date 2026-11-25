// src/pages/GestaoUsuarios.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GestaoUsuarios() {
  const navigate = useNavigate();
  
  // RF-006.05 e RF-006.06: Abas de Status (Padrão: 'Ativos')
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');
  
  // RF-006.14 e RF-006.15: Controle de seleção múltipla
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock de dados para visualização (No futuro, virá do Firebase Firestore)
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Ana Silva', email: 'ana@curitiba360.com', perfil: 'ADMINISTRADOR', status: 'Ativo', dataCriacao: '10/07/2026', ultimoLogin: '20/07/2026', foto: 'https://via.placeholder.com/30' },
    { id: 2, nome: 'Parque Barigui', email: 'contato@barigui.com', perfil: 'PARCEIRO_COMERCIAL', status: 'Ativo', dataCriacao: '12/07/2026', ultimoLogin: '19/07/2026', foto: 'https://via.placeholder.com/30' },
    { id: 3, nome: 'Agência Turismo PR', email: 'agencia@turismopr.com', perfil: 'AGENCIA', status: 'Inativo', dataCriacao: '15/07/2026', ultimoLogin: '-', foto: 'https://via.placeholder.com/30' },
  ]);

  // Lógica para filtrar a tabela com base na aba e na busca (RF-006.02 e RF-006.07)
  const usuariosFiltrados = usuarios.filter(u => {
    const matchBusca = u.nome.toLowerCase().includes(termoBusca.toLowerCase()) || u.email.toLowerCase().includes(termoBusca.toLowerCase());
    const matchAba = abaAtiva === 'Todos' || u.status === (abaAtiva === 'Ativos' ? 'Ativo' : 'Inativo');
    return matchBusca && matchAba;
  });

  // Lógica dos Checkboxes
  const handleSelecionarTodos = (e) => {
    if (e.target.checked) {
      setSelecionados(usuariosFiltrados.map(u => u.id));
    } else {
      setSelecionados([]);
    }
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter(item => item !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  // Funções de Ação
  const handleInativar = () => {
    alert(`Inativando os usuários: ${selecionados.join(', ')}`);
    // Aqui chamaremos a função para atualizar o status no Firebase
    setSelecionados([]);
  };

  return (
    <div>
      {/* CABEÇALHO DA TELA (RF-006.01, RF-006.02, RF-006.03, RF-006.04) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Usuários</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie os usuários do sistema</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar por ID, nome ou e-mail..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
          />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
            Filtros
          </button>
          <button 
            onClick={() => navigate('/usuarios/novo')} 
            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Adicionar usuário
          </button>
        </div>
      </div>

      {/* ABAS DE STATUS E BARRA DE AÇÕES (RF-006.05 e RF-006.16) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Ativos', 'Inativos', 'Todos'].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setSelecionados([]); }}
              style={{ 
                padding: '0.5rem 0', 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer',
                fontWeight: abaAtiva === aba ? 'bold' : 'normal',
                borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
                color: abaAtiva === aba ? '#111827' : '#6b7280'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        {/* BARRA DE AÇÕES (Só aparece se tiver gente selecionada) */}
        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            
            {/* RF-006.19: Botão Editar só habilita se exatamente 1 for selecionado */}
            <button disabled={selecionados.length !== 1} style={{ padding: '0.25rem 0.5rem', cursor: selecionados.length === 1 ? 'pointer' : 'not-allowed' }}>Editar</button>
            
            {abaAtiva === 'Ativos' && <button onClick={handleInativar} style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Inativar selecionados</button>}
            {abaAtiva === 'Inativos' && <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Ativar selecionados</button>}
            
            <button style={{ padding: '0.25rem 0.5rem', color: 'red', cursor: 'pointer' }}>Excluir</button>
          </div>
        )}
      </div>

      {/* TABELA DE USUÁRIOS (RF-006.08) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                <input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === usuariosFiltrados.length && usuariosFiltrados.length > 0} />
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>User ID</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Nome</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Perfil</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data de criação</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Último login</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>
                  <input type="checkbox" checked={selecionados.includes(u.id)} onChange={() => handleSelecionarUm(u.id)} />
                </td>
                <td style={{ padding: '0.75rem', color: '#6b7280' }}>#{u.id}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={u.foto} alt="" style={{ borderRadius: '50%', width: '30px', height: '30px' }} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{u.nome}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '0.75rem' }}>{u.perfil}</span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{u.dataCriacao}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{u.ultimoLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* RF-006.21: Paginação */}
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mostrando 1 a {usuariosFiltrados.length} de {usuariosFiltrados.length} registros</span>
          <select value={itensPorPagina} onChange={(e) => setItensPorPagina(e.target.value)} style={{ padding: '0.25rem', borderRadius: '4px' }}>
            <option value="10">10 por página</option>
            <option value="20">20 por página</option>
            <option value="50">50 por página</option>
          </select>
        </div>
      </div>
    </div>
  );
}
