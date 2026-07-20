// src/pages/OperacaoComercial.jsx
import { useState } from 'react';

export default function OperacaoComercial() {
  // SIMULAÇÃO DE PERFIL: Troque para 'AGENTE', 'AGENCIA' ou 'ADMINISTRADOR' para ver a tela mudando (RN-029.01 a RN-029.03)
  const perfilLogado = 'AGENCIA'; 

  // --- Filtros (RF-029.02 a RF-029.06) ---
  const [periodo, setPeriodo] = useState('Este mês');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [atracaoFiltro, setAtracaoFiltro] = useState('');
  const [agenteFiltro, setAgenteFiltro] = useState('');
  const [agenciaFiltro, setAgenciaFiltro] = useState('');
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Modal de Detalhes da Transação (RF-029.16)
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  // --- Mock de Dados (KPIs e Tabela) ---
  const kpis = {
    totalVendas: 15450.00,
    qtdIngressos: 309,
    comissaoAcumulada: 1545.00,
    cuponsEmitidos: 15,
    cuponsUtilizados: 8,
    vendasCanceladas: 3
  };

  const transacoes = [
    { id: '10293', dataHora: '20/07/2026 10:30', turistaNome: 'João Silva', turistaEmail: 'joao@email.com', telefone: '(41) 99999-1111', atracao: 'Ópera de Arame', qtd: 2, valorTotal: 100.00, cupom: '-', comissaoRs: 10.00, comissaoPct: 10, status: 'Confirmado', formaPagamento: 'PIX' },
    { id: '10294', dataHora: '19/07/2026 14:15', turistaNome: 'Maria Souza', turistaEmail: 'maria@email.com', telefone: '(41) 98888-2222', atracao: 'Parque Jaime Lerner', qtd: 1, valorTotal: 50.00, cupom: 'TOUR10', comissaoRs: 5.00, comissaoPct: 10, status: 'Cancelado Parcial', formaPagamento: 'Cartão de Crédito' },
    { id: '10295', dataHora: '18/07/2026 09:00', turistaNome: 'Carlos Eduardo', turistaEmail: 'carlos@email.com', telefone: '(11) 97777-3333', atracao: 'Jardim Botânico', qtd: 4, valorTotal: 200.00, cupom: '-', comissaoRs: 20.00, comissaoPct: 10, status: 'Reembolsado', formaPagamento: 'PIX' }
  ];

  // RF-029.17: Badges de Status
  const getBadgeStatus = (status) => {
    switch(status) {
      case 'Confirmado': return { bg: '#d1fae5', text: '#065f46' };
      case 'Cancelado Total': return { bg: '#fee2e2', text: '#991b1b' };
      case 'Cancelado Parcial': return { bg: '#ffedd5', text: '#9a3412' };
      case 'Reembolsado': return { bg: '#f3f4f6', text: '#374151' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  // RF-029.23 a RF-029.25: Cancelamento de Venda
  const handleCancelarVenda = () => {
    const motivo = prompt("Informe o motivo do cancelamento (Obrigatório):");
    if (motivo) {
      alert(`Solicitação de estorno enviada ao gateway para o pedido #${transacaoSelecionada.id}. O ingresso será invalidado e o turista notificado.`);
      setTransacaoSelecionada(null);
    } else {
      alert("O motivo é obrigatório para cancelar a venda.");
    }
  };

  return (
    <div>
      {/* CABEÇALHO E EXPORTAÇÃO (RF-029.01 e RF-029.07) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Operação Comercial</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Painel de vendas e acompanhamento de transações</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>📄 Exportar CSV</button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>📕 Exportar PDF</button>
        </div>
      </div>

      {/* ÁREA DE FILTROS (RF-029.02 a RF-029.06) */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Período</label>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Hoje">Hoje</option>
            <option value="Esta semana">Esta semana</option>
            <option value="Este mês">Este mês</option>
            <option value="Personalizado">Período personalizado...</option>
          </select>
        </div>

        {periodo === 'Personalizado' && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Data Inicial</label>
              <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Data Final</label>
              <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Atração</label>
          <select value={atracaoFiltro} onChange={(e) => setAtracaoFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">Todas as atrações</option>
            <option value="1">Ópera de Arame</option>
            <option value="2">Parque Jaime Lerner</option>
          </select>
        </div>

        {/* Filtro por Agente (Apenas Agência e Admin) */}
        {(perfilLogado === 'AGENCIA' || perfilLogado === 'ADMINISTRADOR') && (
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Agente</label>
            <select value={agenteFiltro} onChange={(e) => setAgenteFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">Todos os Agentes</option>
              <option value="1">Carlos (ID: 101)</option>
              <option value="2">Ana (ID: 102)</option>
            </select>
          </div>
        )}

        {/* Filtro por Agência (Apenas Admin) */}
        {perfilLogado === 'ADMINISTRADOR' && (
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Agência</label>
            <select value={agenciaFiltro} onChange={(e) => setAgenciaFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">Todas as Agências</option>
              <option value="1">Tour CWB</option>
              <option value="2">Viagens Sul</option>
            </select>
          </div>
        )}
      </div>

      {/* CARDS DE KPIS (RF-029.09 a RF-029.12) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total de Vendas</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ {kpis.totalVendas.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ingressos Vendidos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{kpis.qtdIngressos}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Comissão Acumulada</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ {kpis.comissaoAcumulada.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cupons (Emitidos/Usados)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{kpis.cuponsEmitidos} / {kpis.cuponsUtilizados}</p>
        </div>
        
        {/* KPI exclusivo de Agência/Admin (RF-029.12A) */}
        {(perfilLogado === 'AGENCIA' || perfilLogado === 'ADMINISTRADOR') && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Vendas Canceladas</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{kpis.vendasCanceladas}</p>
          </div>
        )}
      </div>

      {/* TABELA DE TRANSAÇÕES (RF-029.13) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID Pedido</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data/Hora</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Turista</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atração</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Qtd</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Valor Total</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Cupom</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Comissão</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr 
                key={t.id} 
                onClick={() => setTransacaoSelecionada(t)}
                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <td style={{ padding: '0.75rem', color: '#3b82f6', fontWeight: 'bold' }}>#{t.id}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{t.dataHora}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{t.turistaNome}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.turistaEmail}</div>
                </td>
                <td style={{ padding: '0.75rem' }}>{t.atracao}</td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>{t.qtd}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>R$ {t.valorTotal.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>{t.cupom}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#10b981' }}>R$ {t.comissaoRs.toFixed(2)}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>({t.comissaoPct}%)</div>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStatus(t.status).bg, color: getBadgeStatus(t.status).text }}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* RF-029.15: Paginação */}
        <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Mostrando 1 a {transacoes.length} de {transacoes.length} transações</span>
          <select value={itensPorPagina} onChange={(e) => setItensPorPagina(e.target.value)} style={{ padding: '0.25rem', borderRadius: '4px' }}>
            <option value="10">10 por página</option>
            <option value="20">20 por página</option>
            <option value="50">50 por página</option>
          </select>
        </div>
      </div>

      {/* MODAL DE DETALHES DA TRANSAÇÃO (RF-029.18 a RF-029.22) */}
      {transacaoSelecionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Detalhes do Pedido #{transacaoSelecionada.id}</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Data/Hora: {transacaoSelecionada.dataHora}</p>
              </div>
              <button onClick={() => setTransacaoSelecionada(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Turista</h4>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{transacaoSelecionada.turistaNome}</p>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>{transacaoSelecionada.turistaEmail}</p>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>{transacaoSelecionada.telefone}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Pagamento</h4>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{transacaoSelecionada.formaPagamento}</p>
                <p style={{ fontSize: '0.875rem', margin: 0 }}>Status: <strong style={{ color: getBadgeStatus(transacaoSelecionada.status).text }}>{transacaoSelecionada.status}</strong></p>
              </div>
            </div>

            {/* Ingressos Individuais (RF-029.20 e RF-029.22A) */}
            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Ingressos</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              {Array.from({ length: transacaoSelecionada.qtd }).map((_, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '4px', marginBottom: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{transacaoSelecionada.atracao}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Ingresso {idx + 1} de {transacaoSelecionada.qtd}</p>
                  </div>
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>
                    QR CODE
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button onClick={() => setTransacaoSelecionada(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Fechar</button>
              
              {/* Botão de Cancelar exibido apenas se status incluir "Confirmado" (Simulando a regra de 24h descrita in RF-029.23) */}
              {transacaoSelecionada.status === 'Confirmado' && (
                <button onClick={handleCancelarVenda} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar Venda
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
