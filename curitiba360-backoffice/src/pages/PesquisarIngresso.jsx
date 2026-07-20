// src/pages/PesquisarIngresso.jsx
import { useState } from 'react';

export default function PesquisarIngresso() {
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Mock de Dados de Ingressos/Pedidos (RF-014.05)
  const [pedidos, setPedidos] = useState([
    { id: '10542', turistaNome: 'Mariana Costa', cpf: '012.345.***-**', email: 'mariana.costa@email.com', atracao: 'Jardim Botânico', dataCompra: '19/07/2026', total: 150.00, statusPagamento: 'Aprovado', statusIngresso: 'Válido', qtd: 2 },
    { id: '10543', turistaNome: 'Pedro Henrique', cpf: '987.654.***-**', email: 'pedro.h@email.com', atracao: 'Ópera de Arame', dataCompra: '18/07/2026', total: 50.00, statusPagamento: 'Aprovado', statusIngresso: 'Utilizado', qtd: 1 },
    { id: '10544', turistaNome: 'Lucas Silva', cpf: '333.444.***-**', email: 'lucas.silva@email.com', atracao: 'Tour Linha Turismo', dataCompra: '15/07/2026', total: 200.00, statusPagamento: 'Reembolsado', statusIngresso: 'Cancelado', qtd: 4 },
    { id: '10545', turistaNome: 'Ana Ferreira', cpf: '555.666.***-**', email: 'ana.f@email.com', atracao: 'Museu Oscar Niemeyer', dataCompra: '20/07/2026', total: 80.00, statusPagamento: 'Pendente', statusIngresso: 'Aguardando Pag.', qtd: 2 },
  ]);

  // Lógica de Busca e Filtro (RF-014.02)
  const resultadosFiltrados = pedidos.filter(p => {
    const matchBusca = 
      p.id.includes(termoBusca) || 
      p.turistaNome.toLowerCase().includes(termoBusca.toLowerCase()) || 
      p.email.toLowerCase().includes(termoBusca.toLowerCase()) ||
      p.cpf.includes(termoBusca);
    
    const matchStatus = filtroStatus === 'Todos' || p.statusIngresso === filtroStatus;
    
    return matchBusca && matchStatus;
  });

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'Válido': return { bg: '#d1fae5', text: '#065f46' };
      case 'Utilizado': return { bg: '#f3f4f6', text: '#374151' };
      case 'Cancelado': return { bg: '#fee2e2', text: '#991b1b' };
      case 'Aguardando Pag.': return { bg: '#fef3c7', text: '#92400e' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pesquisar Ingresso</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Central de atendimento: busque por pedidos e ingressos de turistas.</p>
        </div>
      </div>

      {/* BARRA DE PESQUISA (RF-014.02) */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Pesquisa Geral</label>
          <input 
            type="text" 
            placeholder="Nome, CPF, E-mail ou Número do Pedido..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Status do Ingresso</label>
          <select 
            value={filtroStatus} 
            onChange={(e) => setFiltroStatus(e.target.value)} 
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem', minWidth: '150px' }}
          >
            <option value="Todos">Todos</option>
            <option value="Válido">Válido</option>
            <option value="Utilizado">Utilizado</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Aguardando Pag.">Aguardando Pag.</option>
          </select>
        </div>
        <button style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
          Pesquisar
        </button>
      </div>

      {/* RESULTADOS DA PESQUISA (RF-014.05) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Pedido</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Turista</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atração</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data Compra</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Qtd</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Valor Total</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {resultadosFiltrados.length > 0 ? (
              resultadosFiltrados.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#3b82f6' }}>#{p.id}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{p.turistaNome}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CPF: {p.cpf}</div>
                  </td>
                  <td style={{ padding: '0.75rem' }}>{p.atracao}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{p.dataCompra}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>{p.qtd}</td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>R$ {p.total.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStyle(p.statusIngresso).bg, color: getBadgeStyle(p.statusIngresso).text }}>
                      {p.statusIngresso}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => setPedidoSelecionado(p)}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Nenhum pedido encontrado para a pesquisa realizada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE DETALHES DO PEDIDO (Para SAC resolver dúvidas) */}
      {pedidoSelecionado && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Detalhes do Pedido #{pedidoSelecionado.id}</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>Efetuado em {pedidoSelecionado.dataCompra}</p>
              </div>
              <button onClick={() => setPedidoSelecionado(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Dados do Turista</h4>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>{pedidoSelecionado.turistaNome}</p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{pedidoSelecionado.email}</p>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>CPF: {pedidoSelecionado.cpf}</p>
              </div>

              <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Pagamento</h4>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>Total: <strong>R$ {pedidoSelecionado.total.toFixed(2)}</strong></p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>Forma: Cartão de Crédito</p>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>
                  Status: <strong style={{ color: pedidoSelecionado.statusPagamento === 'Aprovado' ? '#10b981' : '#f59e0b' }}>{pedidoSelecionado.statusPagamento}</strong>
                </p>
              </div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Ingressos do Pedido</h4>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '4px', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{pedidoSelecionado.atracao}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Categoria: Inteira</p>
                </div>
                <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStyle(pedidoSelecionado.statusIngresso).bg, color: getBadgeStyle(pedidoSelecionado.statusIngresso).text }}>
                  {pedidoSelecionado.statusIngresso}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button onClick={() => setPedidoSelecionado(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Fechar</button>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Reenviar Voucher por E-mail</button>
                {pedidoSelecionado.statusIngresso === 'Válido' && (
                  <button style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cancelar Pedido</button>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
