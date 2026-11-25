// src/pages/OperacaoComercial.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { platformSyncService } from '../services/platformSyncService';

export default function OperacaoComercial() {
  const navigate = useNavigate();
  const [perfilLogado, setPerfilLogado] = useState(() => platformSyncService.getActiveRole());
  const [transacoes, setTransacoes] = useState(() => platformSyncService.getOrders());
  const [periodo, setPeriodo] = useState('Este mês');
  const [atracaoFiltro, setAtracaoFiltro] = useState('');
  const [parceiroFiltro, setParceiroFiltro] = useState('');
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  useEffect(() => {
    return platformSyncService.subscribe(() => {
      setTransacoes(platformSyncService.getOrders());
      setPerfilLogado(platformSyncService.getActiveRole());
    });
  }, []);

  const transacoesFiltradas = transacoes.filter((t) => {
    if (atracaoFiltro && !t.atracao.toLowerCase().includes(atracaoFiltro.toLowerCase())) return false;
    if (parceiroFiltro && t.parceiroRef !== parceiroFiltro) return false;
    return true;
  });

  const confirmadas = transacoesFiltradas.filter(t => t.status === 'Confirmado');
  const kpis = {
    totalVendas: confirmadas.reduce((acc, t) => acc + Number(t.valorTotal || 0), 0),
    qtdIngressos: confirmadas.reduce((acc, t) => acc + Number(t.qtd || 0), 0),
    comissaoAcumulada: confirmadas.reduce((acc, t) => acc + Number(t.comissaoRs || 0), 0),
    splitAtracoes: confirmadas.reduce((acc, t) => acc + Number(t.splitAtracaoRs || 0), 0),
    vendasCanceladas: transacoesFiltradas.filter(t => t.status.includes('Cancelado') || t.status === 'Reembolsado').length
  };

  const getBadgeStatus = (status) => {
    switch(status) {
      case 'Confirmado': return { bg: '#d1fae5', text: '#065f46' };
      case 'Cancelado Total': return { bg: '#fee2e2', text: '#991b1b' };
      case 'Cancelado Parcial': return { bg: '#ffedd5', text: '#9a3412' };
      case 'Reembolsado': return { bg: '#f3f4f6', text: '#374151' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const handleCancelarVenda = () => {
    const motivo = prompt("Informe o motivo do cancelamento e estorno:");
    if (motivo) {
      platformSyncService.cancelOrder(transacaoSelecionada.id, motivo);
      setTransacoes(platformSyncService.getOrders());
      setTransacaoSelecionada(null);
    }
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Operação Comercial & Split B2B em Tempo Real</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
            Todas as compras realizadas no Portal Público (/site) entram aqui instantaneamente com Split e QR Code
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigate('/site')} style={{ padding: '0.5rem 1rem', backgroundColor: '#00a896', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Simular Compra no Site (/site)
          </button>
          <button onClick={() => navigate('/financeiro/comissionamento')} style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            💰 Ver Comissionamento B2B
          </button>
        </div>
      </div>

      {/* ÁREA DE FILTROS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Período</label>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="Hoje">Hoje</option>
            <option value="Esta semana">Esta semana</option>
            <option value="Este mês">Este mês</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Buscar Atração</label>
          <input
            type="text"
            placeholder="Ex: Ópera, Trem, Jardim..."
            value={atracaoFiltro}
            onChange={(e) => setAtracaoFiltro(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>Canal B2B / QR Code Hotel</label>
          <select value={parceiroFiltro} onChange={(e) => setParceiroFiltro(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="">Todos os Canais & Hotéis</option>
            <option value="hotel-pestana">Hotel Pestana Curitiba 5★</option>
            <option value="hotel-radisson">Radisson Hotel Curitiba</option>
            <option value="hotel-nomaa">Nomaa Hotel Boutique</option>
            <option value="serra-verde">Serra Verde Express</option>
            <option value="tour-cwb">Agência Tour CWB</option>
            <option value="direto">Venda Direta Portal 360</option>
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.35rem 0.75rem', borderRadius: '999px', fontWeight: 'bold' }}>
            Visão RBAC Ativa: {perfilLogado}
          </span>
        </div>
      </div>

      {/* CARDS DE KPIS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Total de Vendas (GMV)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '6px 0 0 0' }}>R$ {kpis.totalVendas.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Ingressos Emitidos</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '6px 0 0 0' }}>{kpis.qtdIngressos}</p>
        </div>
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Comissão B2B (Hotéis/Agências)</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '6px 0 0 0', color: '#d97706' }}>R$ {kpis.comissaoAcumulada.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Split Líquido Atrações</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '6px 0 0 0', color: '#7c3aed' }}>R$ {kpis.splitAtracoes.toFixed(2)}</p>
        </div>
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: '4px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>Vendas Canceladas</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '6px 0 0 0' }}>{kpis.vendasCanceladas}</p>
        </div>
      </div>

      {/* TABELA DE TRANSAÇÕES */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>ID Pedido</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Data/Hora</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Turista</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atração / Pacote</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Canal B2B (QR Ref)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Qtd</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Valor Total</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Split Comissão</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transacoesFiltradas.map((t) => (
              <tr 
                key={t.id} 
                onClick={() => setTransacaoSelecionada(t)}
                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }}
              >
                <td style={{ padding: '0.75rem', color: '#2563eb', fontWeight: 'bold' }}>#{t.id}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.825rem' }}>{t.dataHora}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{t.turistaNome}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.turistaEmail}</div>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600' }}>{t.atracao}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.8rem' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontWeight: '600', color: '#334155' }}>
                    {t.parceiroNome || 'Venda Direta'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center', fontWeight: 'bold' }}>{t.qtd}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>R$ {Number(t.valorTotal || 0).toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#10b981' }}>R$ {Number(t.comissaoRs || 0).toFixed(2)}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>({t.comissaoPct}%)</div>
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
      </div>

      {/* MODAL DE DETALHES DA TRANSAÇÃO E VOUCHERS QR CODE */}
      {transacaoSelecionada && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Pedido #{transacaoSelecionada.id}</h2>
                <p style={{ color: '#6b7280', fontSize: '0.825rem', margin: '4px 0 0 0' }}>
                  Data/Hora: {transacaoSelecionada.dataHora} • Canal: <strong>{transacaoSelecionada.parceiroNome || 'Direto'}</strong>
                </p>
              </div>
              <button onClick={() => setTransacaoSelecionada(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Turista</h4>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{transacaoSelecionada.turistaNome}</p>
                <p style={{ margin: 0 }}>{transacaoSelecionada.turistaEmail}</p>
                <p style={{ margin: 0 }}>CPF: {transacaoSelecionada.turistaCpf || '123.456.789-00'}</p>
              </div>
              <div style={{ backgroundColor: '#f0fdf4', padding: '0.75rem', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '0.75rem', color: '#065f46', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Split Financeiro ({transacaoSelecionada.formaPagamento})</h4>
                <p style={{ margin: 0 }}>Total Pago: <strong>R$ {Number(transacaoSelecionada.valorTotal || 0).toFixed(2)}</strong></p>
                <p style={{ margin: 0, color: '#047857' }}>Comissão B2B ({transacaoSelecionada.comissaoPct}%): <strong>R$ {Number(transacaoSelecionada.comissaoRs || 0).toFixed(2)}</strong></p>
                <p style={{ margin: 0 }}>Líquido Atração: <strong>R$ {Number(transacaoSelecionada.splitAtracaoRs || (transacaoSelecionada.valorTotal * 0.8)).toFixed(2)}</strong></p>
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Vouchers QR Code Emitidos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {(transacaoSelecionada.vouchers || ['ING8001']).map((vCode, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>{transacaoSelecionada.atracao}</p>
                    <p style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 'bold', margin: '2px 0' }}>Código Voucher: {vCode}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <QRCodeSVG value={vCode} size={46} />
                    <button
                      onClick={() => {
                        setTransacaoSelecionada(null);
                        navigate(`/validacao?code=${vCode}`);
                      }}
                      style={{ padding: '0.4rem 0.75rem', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Validar na Catraca
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setTransacaoSelecionada(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Fechar</button>
              {transacaoSelecionada.status === 'Confirmado' && (
                <button onClick={handleCancelarVenda} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Cancelar Venda & Invalidar QR Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
