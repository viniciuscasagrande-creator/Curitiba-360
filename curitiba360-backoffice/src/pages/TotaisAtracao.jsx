// src/pages/TotaisAtracao.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TotaisAtracao() {
  const navigate = useNavigate();

  // RF-004.08 a RF-004.12: Filtros de Período (Padrão: 30 Dias)
  const [filtroRapido, setFiltroRapido] = useState('30 Dias');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  
  // Controle do submenu expansível "Gestão Financeira" (RF-004.10)
  const [financeiroExpandido, setFinanceiroExpandido] = useState(false);

  // Mock de Dados da Atração (RF-004.01 a RF-004.03)
  const atracao = {
    nome: 'Ópera de Arame',
    bairro: 'Pilarzinho',
    cidade: 'Curitiba - PR',
    foto: 'https://via.placeholder.com/150'
  };

  // Mock de KPIs (RF-004.13 a RF-004.16 e Cards Obrigatórios)
  const kpis = {
    vendidos: { qtd: 1540, variacao: 12.5, valor: 77000.00, ticketMedio: 50.00, metaStatus: 'Acima da meta' },
    emitidos: { qtd: 1600, variacao: 10.2, cortesias: 60, total: 1600 },
    reservados: { qtd: 45, variacao: -5.0, valor: 2250.00, ticketMedio: 50.00 },
    validacao: { qtd: 1540, variacao: 12.5, validados: 1300, pendentes: 240 }
  };

  // Mock de Pagamentos (Cards 5 ao 10)
  const pagamentos = [
    { titulo: 'Vendas no Dinheiro', qtd: 40, transacoes: 15, valor: 2000.00, variacao: -2.0 },
    { titulo: 'Vendas no C. Débito', qtd: 300, transacoes: 120, valor: 15000.00, variacao: 5.5 },
    { titulo: 'Vendas no C. Crédito', qtd: 500, transacoes: 210, valor: 25000.00, variacao: 15.0 },
    { titulo: 'Vendas no C. Crédito Parcelado', qtd: 400, transacoes: 150, valor: 20000.00, variacao: 8.4 },
    { titulo: 'Vendas no PIX', qtd: 300, transacoes: 140, valor: 15000.00, variacao: 25.0 },
    { titulo: 'Vendas por depósito, TED, etc...', qtd: 0, transacoes: 0, valor: 0.00, variacao: 0.0 } // RF-004.05: Zero não oculta
  ];

  // Componente Auxiliar para a Variação Percentual (RF-004.16)
  const VariacaoBadge = ({ valor }) => {
    if (valor === 0) return <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>N/A</span>; // RF-004.04
    const isPositivo = valor > 0;
    return (
      <span style={{ color: isPositivo ? '#10b981' : '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {isPositivo ? '↑' : '↓'} {Math.abs(valor)}%
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      
      {/* MENU LATERAL DE SUBMÓDULOS DA ATRAÇÃO (RF-004.04 e Tabela de Ordem) */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* RF-004.01 a RF-004.03: Info da Atração */}
        <div style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
          <img src={atracao.foto} alt="Atração" style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{atracao.nome}</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>{atracao.bairro} - {atracao.cidade}</p>
        </div>

        <nav style={{ padding: '1rem 0', flex: 1, overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {/* RF-004.07: Voltar ao Dashboard Geral */}
            <li style={{ padding: '0.5rem 1.5rem' }}>
              <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', textAlign: 'left' }}>
                ← Voltar ao Dashboard
              </button>
            </li>
            <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            
            {[
              { id: 'totais', label: 'Totais da Atração', ativo: true },
              { id: 'categorias', label: 'Categorias' },
              { id: 'pesquisar_ingresso', label: 'Pesquisar Ingresso' },
              { id: 'gestao_ingressos', label: 'Gestão de Ingressos' },
              { id: 'cupons', label: 'Gestão de Cupons' },
              { id: 'analytics', label: 'Gráficos Analytics' },
              { id: 'editar', label: 'Editar da Atração' },
              { id: 'agencias', label: 'Agências e Agentes' },
              { id: 'usuarios', label: 'Usuários' }
            ].map(item => (
              <li key={item.id}>
                <button style={{ 
                  width: '100%', padding: '0.75rem 1.5rem', border: 'none', background: item.ativo ? '#ecfdf5' : 'white', 
                  color: item.ativo ? '#065f46' : '#374151', fontWeight: item.ativo ? 'bold' : 'normal', textAlign: 'left',
                  borderLeft: item.ativo ? '4px solid #10b981' : '4px solid transparent', cursor: 'pointer'
                }}>
                  {item.label}
                </button>
              </li>
            ))}

            {/* Menu Expansível Financeiro (RF-004.10) */}
            <li>
              <button onClick={() => setFinanceiroExpandido(!financeiroExpandido)} style={{ width: '100%', padding: '0.75rem 1.5rem', border: 'none', background: 'white', color: '#374151', textAlign: 'left', borderLeft: '4px solid transparent', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                Gestão Financeira <span>{financeiroExpandido ? '▲' : '▼'}</span>
              </button>
              {financeiroExpandido && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, backgroundColor: '#f9fafb' }}>
                  <li><button style={{ width: '100%', padding: '0.5rem 1.5rem 0.5rem 2.5rem', border: 'none', background: 'none', color: '#6b7280', textAlign: 'left', cursor: 'pointer' }}>Relatórios da Atração</button></li>
                  <li><button style={{ width: '100%', padding: '0.5rem 1.5rem 0.5rem 2.5rem', border: 'none', background: 'none', color: '#6b7280', textAlign: 'left', cursor: 'pointer' }}>Negociação Financeira</button></li>
                  <li><button style={{ width: '100%', padding: '0.5rem 1.5rem 0.5rem 2.5rem', border: 'none', background: 'none', color: '#6b7280', textAlign: 'left', cursor: 'pointer' }}>Resumo das Despesas</button></li>
                </ul>
              )}
            </li>

            <li>
              <button style={{ width: '100%', padding: '0.75rem 1.5rem', border: 'none', background: 'white', color: '#374151', textAlign: 'left', borderLeft: '4px solid transparent', cursor: 'pointer' }}>
                Validar Ingressos
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (Cards e Filtros) */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        
        {/* RF-004.08 a RF-004.09: Filtros Rápidos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Hoje', '7 Dias', '30 Dias', 'Tudo'].map(f => (
              <button key={f} onClick={() => setFiltroRapido(f)} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: filtroRapido === f ? '#3b82f6' : '#f3f4f6', color: filtroRapido === f ? 'white' : '#374151', fontWeight: filtroRapido === f ? 'bold' : 'normal' }}>
                {f}
              </button>
            ))}
            <button onClick={() => setFiltroRapido('Período')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', background: filtroRapido === 'Período' ? '#eff6ff' : 'white', color: '#374151' }}>
              Período Específico
            </button>
          </div>

          {filtroRapido === 'Período' && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <span>até</span>
              <input type="date" value={dataFinal} onChange={e => setDataFinal(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          )}
        </div>

        {/* ================= CARDS PRINCIPAIS OBRIGATÓRIOS ================= */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Visão Geral (Indicadores)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Card 1: Ingressos Vendidos */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingressos Vendidos</h4>
              <VariacaoBadge valor={kpis.vendidos.variacao} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{kpis.vendidos.qtd}</p>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Valor:</span> <strong>R$ {kpis.vendidos.valor.toFixed(2)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Ticket Médio:</span> <strong>R$ {kpis.vendidos.ticketMedio.toFixed(2)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Meta:</span> <strong style={{ color: '#10b981' }}>{kpis.vendidos.metaStatus}</strong></div>
            </div>
          </div>

          {/* Card 2: Ingressos Emitidos */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingressos Emitidos</h4>
              <VariacaoBadge valor={kpis.emitidos.variacao} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{kpis.emitidos.qtd}</p>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Cortesias:</span> <strong>{kpis.emitidos.cortesias}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total (Vend + Cort):</span> <strong>{kpis.emitidos.total}</strong></div>
            </div>
          </div>

          {/* Card 3: Ingressos Reservados */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingressos Reservados</h4>
              <VariacaoBadge valor={kpis.reservados.variacao} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{kpis.reservados.qtd}</p>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Valor Reservado:</span> <strong>R$ {kpis.reservados.valor.toFixed(2)}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ticket Médio:</span> <strong>R$ {kpis.reservados.ticketMedio.toFixed(2)}</strong></div>
            </div>
          </div>

          {/* Card 4: Ingressos Validação */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingressos Validação</h4>
              <VariacaoBadge valor={kpis.validacao.variacao} />
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{kpis.validacao.qtd}</p>
            <div style={{ fontSize: '0.875rem', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Validados:</span> <strong style={{ color: '#10b981' }}>{kpis.validacao.validados}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Pendentes:</span> <strong style={{ color: '#ef4444' }}>{kpis.validacao.pendentes}</strong></div>
            </div>
          </div>

        </div>

        {/* ================= CARDS FORMAS DE PAGAMENTO ================= */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Formas de Pagamento</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {pagamentos.map((pag, idx) => (
            <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{pag.titulo}</h4>
                <VariacaoBadge valor={pag.variacao} />
              </div>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 1rem 0' }}>{pag.qtd} <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280' }}>itens</span></p>
              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Transações:</span> <strong>{pag.transacoes}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total:</span> <strong>R$ {pag.valor.toFixed(2)}</strong></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
