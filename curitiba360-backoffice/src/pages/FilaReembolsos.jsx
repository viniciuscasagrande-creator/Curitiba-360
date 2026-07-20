// src/pages/FilaReembolsos.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilaReembolsos() {
  const navigate = useNavigate();

  // RF-031.04 e RF-031.05: Abas de Status (Padrão: 'Pendentes')
  const [abaAtiva, setAbaAtiva] = useState('Pendentes');
  const [termoBusca, setTermoBusca] = useState('');
  const [selecionados, setSelecionados] = useState([]);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // Modal de Decisão (RF-031.24 a RF-031.40)
  const [modalDecisao, setModalDecisao] = useState(null);
  const [acaoDecisao, setAcaoDecisao] = useState('Aprovar'); // 'Aprovar' ou 'Rejeitar'
  const [motivoRejeicao, setMotivoRejeicao] = useState('');
  const [valorAprovado, setValorAprovado] = useState('');

  // Mock de Dados (RF-031.13 e RF-031.17)
  const [reembolsos, setReembolsos] = useState([
    { id: 101, idPedido: 5042, turistaNome: 'Carlos Almeida', turistaEmail: 'carlos@email.com', atracao: 'Ópera de Arame', valor: 150.00, motivo: 'Doença/Atestado', origem: 'Turista', dataCompra: '01/07/2026', dataSolicitacao: '10/07/2026', slaDias: 10, status: 'Pendente' },
    { id: 102, idPedido: 5120, turistaNome: 'Fernanda Lima', turistaEmail: 'fernanda@email.com', atracao: 'Parque Jaime Lerner', valor: 80.00, motivo: 'Insatisfação', origem: 'Agência', dataCompra: '05/07/2026', dataSolicitacao: '15/07/2026', slaDias: 5, status: 'Pendente' },
    { id: 103, idPedido: 5088, turistaNome: 'Ricardo Gomes', turistaEmail: 'ricardo@email.com', atracao: 'Tour Linha Turismo', valor: 200.00, motivo: 'Erro na compra', origem: 'Turista', dataCompra: '16/07/2026', dataSolicitacao: '18/07/2026', slaDias: 2, status: 'Pendente' },
    { id: 104, idPedido: 4999, turistaNome: 'Beatriz Souza', turistaEmail: 'beatriz@email.com', atracao: 'Jardim Botânico', valor: 50.00, motivo: 'Voo cancelado', origem: 'Agente', dataCompra: '20/06/2026', dataSolicitacao: '01/07/2026', slaDias: 19, status: 'Em Análise' },
  ]);

  const reembolsosFiltrados = reembolsos.filter(r => {
    const matchBusca = 
      r.id.toString().includes(termoBusca) || 
      r.idPedido.toString().includes(termoBusca) ||
      r.turistaNome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      r.turistaEmail.toLowerCase().includes(termoBusca.toLowerCase());
    
    // Map 'Pendentes' to match mock data status field 'Pendente'
    const matchAba = abaAtiva === 'Todos' || r.status === (abaAtiva === 'Pendentes' ? 'Pendente' : abaAtiva === 'Aprovados' ? 'Aprovado' : abaAtiva === 'Rejeitados' ? 'Rejeitado' : abaAtiva);
    return matchBusca && matchAba;
  }).sort((a, b) => b.slaDias - a.slaDias); // RF-031.19: Ordenação padrão por SLA decrescente

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(reembolsosFiltrados.map(r => r.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    if (selecionados.includes(id)) setSelecionados(selecionados.filter(item => item !== id));
    else setSelecionados([...selecionados, id]);
  };

  // Cores do SLA (RF-031.18)
  const getSlaColor = (dias) => {
    if (dias <= 3) return { bg: '#d1fae5', text: '#065f46' }; // Verde
    if (dias <= 7) return { bg: '#fef3c7', text: '#92400e' }; // Amarelo
    return { bg: '#fee2e2', text: '#991b1b' }; // Vermelho
  };

  const handleConfirmarDecisao = (e) => {
    e.preventDefault();
    if (acaoDecisao === 'Rejeitar' && !motivoRejeicao) {
      alert("O motivo é obrigatório para rejeição.");
      return;
    }
    alert(`Reembolso #${modalDecisao.id} ${acaoDecisao === 'Aprovar' ? 'APROVADO' : 'REJEITADO'} com sucesso! O e-mail foi enviado ao turista.`);
    setModalDecisao(null);
  };

  // RF-031.01: Contador de pendentes
  const qtdPendentes = reembolsos.filter(r => r.status === 'Pendente').length;

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Fila de Reembolsos
            <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '0.875rem', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>
              {qtdPendentes} pendentes
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Triagem manual de estornos pós-prazo</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Buscar ID, Turista, Email..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }}
          />
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>
            Filtros
          </button>
        </div>
      </div>

      {/* ABAS DE STATUS E BARRA DE AÇÕES (RF-031.22) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Pendentes', 'Em Análise', 'Aprovados', 'Rejeitados', 'Todos'].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setSelecionados([]); }}
              style={{ 
                padding: '0.5rem 0', border: 'none', background: 'none', cursor: 'pointer',
                fontWeight: abaAtiva === aba ? 'bold' : 'normal',
                borderBottom: abaAtiva === aba ? '2px solid #10b981' : '2px solid transparent',
                color: abaAtiva === aba ? '#111827' : '#6b7280'
              }}
            >
              {aba}
            </button>
          ))}
        </div>

        {/* BARRA DE AÇÕES EM MASSA */}
        {selecionados.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#eff6ff', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1d4ed8' }}>Selecionados {selecionados.length}</span>
            
            <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#10b981', fontWeight: 'bold' }}>Aprovar selecionados</button>
            <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}>Rejeitar selecionados</button>
            <button style={{ padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Marcar como Em Análise</button>
          </div>
        )}
      </div>

      {/* TABELA DA FILA (RF-031.13) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                <input type="checkbox" onChange={handleSelecionarTodos} checked={selecionados.length === reembolsosFiltrados.length && reembolsosFiltrados.length > 0} />
              </th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>SLA (Dias)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Reembolso / Pedido</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Turista</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Atração</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Valor (R$)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Origem</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {reembolsosFiltrados.map((r) => (
              <tr 
                key={r.id} 
                style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: r.status === 'Em Análise' ? '#fdf8f6' : 'white' }}
              >
                <td style={{ padding: '0.75rem' }}>
                  <input type="checkbox" checked={selecionados.includes(r.id)} onChange={() => handleSelecionarUm(r.id)} />
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 'bold', backgroundColor: getSlaColor(r.slaDias).bg, color: getSlaColor(r.slaDias).text }}>
                    {r.slaDias} dias
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold', color: '#3b82f6' }}>#{r.id}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Ped: #{r.idPedido}</div>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 'bold' }}>{r.turistaNome}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{r.turistaEmail}</div>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem' }}>{r.atracao}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>R$ {r.valor.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.2rem 0.4rem', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: '0.75rem' }}>{r.origem}</span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <button 
                    onClick={() => {
                      setModalDecisao(r);
                      setValorAprovado(r.valor);
                    }}
                    style={{ padding: '0.4rem 0.8rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem' }}
                  >
                    Analisar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE DECISÃO (RF-031.24 a RF-031.40) */}
      {modalDecisao && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Análise de Reembolso #{modalDecisao.id}</h2>
                <p style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', margin: 0 }}>SLA: {modalDecisao.slaDias} dias em aberto</p>
              </div>
              <button onClick={() => setModalDecisao(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Seção 1: Dados da Solicitação */}
              <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Dados do Pedido</h4>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Pedido:</strong> #{modalDecisao.idPedido}</p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Valor Pago:</strong> R$ {modalDecisao.valor.toFixed(2)} (PIX)</p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Data da Compra:</strong> {modalDecisao.dataCompra}</p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Turista:</strong> {modalDecisao.turistaNome}</p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}><strong>Origem da Solicitação:</strong> {modalDecisao.origem}</p>
              </div>

              {/* Seção 3: Motivo e Política */}
              <div style={{ background: '#fffbeb', padding: '1rem', borderRadius: '4px', border: '1px solid #fde68a' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#92400e', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Motivo Informado</h4>
                <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#92400e' }}>{modalDecisao.motivo}</p>
                <p style={{ fontSize: '0.875rem', margin: 0, fontStyle: 'italic' }}>"Solicito o estorno pois não poderei comparecer na data agendada devido a imprevistos médicos."</p>
                
                <hr style={{ margin: '1rem 0', borderColor: '#fde68a' }} />
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Política da Atração</h4>
                <p style={{ fontSize: '0.75rem', color: '#374151', margin: 0 }}>Cancelamento gratuito permitido até 48h antes do evento. Retenção de 20% fora do prazo.</p>
              </div>
            </div>

            {/* Seção 4: Decisão */}
            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>Decisão do Administrador</h4>
            <form onSubmit={handleConfirmarDecisao}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="decisao" value="Aprovar" checked={acaoDecisao === 'Aprovar'} onChange={() => setAcaoDecisao('Aprovar')} />
                  <span style={{ fontWeight: 'bold', color: '#10b981' }}>Aprovar Reembolso</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="radio" name="decisao" value="Rejeitar" checked={acaoDecisao === 'Rejeitar'} onChange={() => setAcaoDecisao('Rejeitar')} />
                  <span style={{ fontWeight: 'bold', color: '#ef4444' }}>Rejeitar Solicitação</span>
                </label>
              </div>

              {acaoDecisao === 'Aprovar' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Valor a Devolver (R$) *</label>
                    <input type="number" step="0.01" required value={valorAprovado} onChange={e => setValorAprovado(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
                    <small style={{ color: '#6b7280' }}>Para retenção, diminua o valor.</small>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Método de Estorno</label>
                    <select disabled style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f3f4f6' }}>
                      <option>Automático via Gateway (PIX)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Motivo da Rejeição *</label>
                  <select required value={motivoRejeicao} onChange={e => setMotivoRejeicao(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '0.5rem' }}>
                    <option value="">Selecione...</option>
                    <option value="Fora do prazo">Fora do prazo de cancelamento</option>
                    <option value="Já utilizado">Ingresso já utilizado</option>
                    <option value="Doc insuficiente">Documentação insuficiente</option>
                  </select>
                  <p style={{ fontSize: '0.75rem', color: '#ef4444', fontStyle: 'italic' }}>Este motivo será enviado por e-mail ao turista.</p>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" onClick={() => setModalDecisao(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.5rem 1.5rem', backgroundColor: acaoDecisao === 'Aprovar' ? '#10b981' : '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {acaoDecisao === 'Aprovar' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
