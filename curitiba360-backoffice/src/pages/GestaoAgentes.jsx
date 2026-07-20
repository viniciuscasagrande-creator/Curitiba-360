// src/pages/GestaoAgentes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function GestaoAgentes() {
  const navigate = useNavigate();
  // RF-028.05 e RF-028.06: Abas de Status (Padrão: 'Ativos')
  const [abaAtiva, setAbaAtiva] = useState('Ativos');
  const [termoBusca, setTermoBusca] = useState('');
  
  // RF-028.13 e RF-028.14: Controle de seleção múltipla
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Mock de dados para visualização (RF-028.08)
  const [agentes, setAgentes] = useState([
    { id: 101, nome: 'Carlos Silva', cpf: '111.222.333-**', email: 'carlos@tourcwb.com', agencia: 'Tour CWB', qtdAtracoes: 5, status: 'Ativo', dataCadastro: '02/07/2026' },
    { id: 102, nome: 'Ana Souza', cpf: '444.555.666-**', email: 'ana@viagenssul.com', agencia: 'Viagens Sul', qtdAtracoes: 3, status: 'Inativo', dataCadastro: '15/07/2026' },
    { id: 103, nome: 'Marcos Pereira', cpf: '777.888.999-**', email: 'marcos@explorepr.com', agencia: 'Explore Paraná', qtdAtracoes: 0, status: 'Pendente de Aprovação', dataCadastro: '19/07/2026' },
    { id: 104, nome: 'Juliana Costa', cpf: '123.456.789-**', email: 'juliana@agencia.com', agencia: 'Agência Central', qtdAtracoes: 2, status: 'Inativo (Agência Bloqueada)', dataCadastro: '10/05/2026' },
  ]);

  // Lógica para filtrar a tabela (RF-028.02 e RF-028.07)
  const agentesFiltrados = agentes.filter(a => {
    const matchBusca = 
      a.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
      a.cpf.includes(termoBusca) ||
      a.email.toLowerCase().includes(termoBusca.toLowerCase());
    
    // Tratamento para as abas (RF-028.10)
    if (abaAtiva === 'Todos') return matchBusca;
    if (abaAtiva === 'Ativos') return matchBusca && a.status === 'Ativo';
    if (abaAtiva === 'Inativos') return matchBusca && (a.status === 'Inativo' || a.status === 'Inativo (Agência Bloqueada)');
    if (abaAtiva === 'Pendente de Aprovação') return matchBusca && a.status === 'Pendente de Aprovação';
    
    return matchBusca;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(agentesFiltrados.map(a => a.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'Ativo': return { bg: '#d1fae5', text: '#065f46' };
      case 'Pendente de Aprovação': return { bg: '#fef3c7', text: '#92400e' };
      case 'Inativo (Agência Bloqueada)': return { bg: '#fee2e2', text: '#991b1b' };
      case 'Inativo': return { bg: '#f3f4f6', text: '#374151' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const handleTransferir = () => {
    // RF-028.38: Ação de transferir agente de agência
    alert(`Iniciando transferência dos agentes: ${selecionados.join(', ')} para nova agência.`);
    setSelecionados([]);
  };

  return (
    <div>
      {/* CABEÇALHO DA TELA (RF-028.01) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gestão de Agentes</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Gerencie os revendedores individuais do sistema</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Input 
            icon="🔍" 
            placeholder="Buscar Nome, CPF ou E-mail..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ width: '250px' }}
          />
          <Button variant="outline">
            Filtros
          </Button>
          <Button variant="primary" onClick={() => navigate('/comercial/agentes/novo')}>
            + Adicionar Agente
          </Button>
        </div>
      </div>

      {/* ABAS DE STATUS E BARRA DE AÇÕES (RF-028.05 e RF-028.16) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <Tabs 
            options={['Ativos', 'Pendente de Aprovação', 'Inativos', 'Todos']} 
            activeTab={abaAtiva} 
            onChange={(aba) => { setAbaAtiva(aba); setSelecionados([]); }} 
          />
        </div>

        {/* BARRA DE AÇÕES CONTEXTUAL POR ABA (RF-028.16 a RF-028.19) */}
        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados: {selecionados.length}</span>
            
            <Button variant="outline" disabled={selecionados.length !== 1} onClick={() => alert('Editando agente...')}>
              Editar
            </Button>
            
            {abaAtiva === 'Pendente de Aprovação' && (
              <>
                <Button variant="primary" onClick={() => alert('Agentes aprovados!')}>Aprovar</Button>
                <Button variant="danger" onClick={() => alert('Agentes rejeitados!')}>Rejeitar</Button>
              </>
            )}

            {abaAtiva === 'Ativos' && (
              <>
                <Button variant="secondary" onClick={handleTransferir}>Transferir Agência</Button>
                <Button variant="outline" onClick={() => alert('Agente inativado')}>Inativar</Button>
              </>
            )}

            {abaAtiva === 'Inativos' && (
              <>
                <Button variant="secondary" onClick={handleTransferir}>Transferir Agência</Button>
                <Button variant="primary" onClick={() => alert('Agente ativado')}>Ativar</Button>
              </>
            )}
            
            <Button variant="danger" onClick={() => alert('Agente excluído')}>Excluir</Button>
          </div>
        )}
      </div>

      {/* TABELA DE AGENTES (RF-028.08) */}
      <Table 
        columns={[
          <input 
            type="checkbox" 
            onChange={handleSelecionarTodos} 
            checked={selecionados.length === agentesFiltrados.length && agentesFiltrados.length > 0} 
          />,
          'ID', 
          'Nome / E-mail', 
          'CPF', 
          'Agência Vinculada', 
          'Status', 
          'Atrações', 
          'Data Cadastro'
        ]}
      >
        {agentesFiltrados.map((a) => (
          <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem 1rem' }}>
              <input type="checkbox" checked={selecionados.includes(a.id)} onChange={() => handleSelecionarUm(a.id)} />
            </td>
            <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>#{a.id}</td>
            <td style={{ padding: '0.75rem 1rem' }}>
              <div style={{ fontWeight: 'bold' }}>{a.nome}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{a.email}</div>
            </td>
            <td style={{ padding: '0.75rem 1rem' }}>{a.cpf}</td>
            <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold', color: '#3b82f6' }}>{a.agencia}</td>
            <td style={{ padding: '0.75rem 1rem' }}>
              <span style={{ 
                padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                backgroundColor: getBadgeStyle(a.status).bg,
                color: getBadgeStyle(a.status).text
              }}>
                {a.status}
              </span>
            </td>
            <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>{a.qtdAtracoes}</td>
            <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>{a.dataCadastro}</td>
          </tr>
        ))}
      </Table>

      {/* Paginação */}
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', borderRadius: '0 0 8px 8px', border: '1px solid #e5e7eb', borderTop: 'none' }}>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mostrando 1 a {agentesFiltrados.length} de {agentesFiltrados.length} registros</span>
        <select value={itensPorPagina} onChange={(e) => setItensPorPagina(e.target.value)} style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #d1d5db' }}>
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
      </div>
    </div>
  );
}
