// src/pages/Comissionamento.jsx
import { useState } from 'react';

export default function Comissionamento() {
  // Simulando a visão da AGÊNCIA
  const perfilLogado = 'AGENCIA';

  // --- Mock de Dados do Período Atual (RF-030.01 a RF-030.03) ---
  const periodoAtual = {
    dataInicio: '01/07/2026',
    dataFimPrevista: '31/07/2026',
    comissaoBruta: 1650.00,
    deducoes: 105.00, // Referente a cancelamentos/reembolsos
    comissaoLiquida: 1545.00
  };

  // --- Mock do Histórico de Períodos Fechados (RF-030.04 e RF-030.05) ---
  const [historico, setHistorico] = useState([
    { id: 1, periodo: 'Junho/2026', vendas: 12000.00, qtdIngressos: 240, comissaoBruta: 1200.00, deducoes: 0, comissaoLiquida: 1200.00, status: 'Repasse Pago' },
    { id: 2, periodo: 'Maio/2026', vendas: 15000.00, qtdIngressos: 300, comissaoBruta: 1500.00, deducoes: 50.00, comissaoLiquida: 1450.00, status: 'Fechado' },
    { id: 3, periodo: 'Abril/2026', vendas: 8000.00, qtdIngressos: 160, comissaoBruta: 800.00, deducoes: 0, comissaoLiquida: 800.00, status: 'Repasse Solicitado' },
    { id: 4, periodo: 'Março/2026', vendas: 10000.00, qtdIngressos: 200, comissaoBruta: 1000.00, deducoes: 100.00, comissaoLiquida: 900.00, status: 'Em Contestação' }
  ]);

  // Estados dos Modais (RF-030.11 e RF-030.16)
  const [modalRepasse, setModalRepasse] = useState(null);
  const [modalContestacao, setModalContestacao] = useState(null);
  const [observacaoRepasse, setObservacaoRepasse] = useState('');
  const [motivoContestacao, setMotivoContestacao] = useState('');
  const [valorEsperado, setValorEsperado] = useState('');

  // Badges de Status (RF-030.05)
  const getBadgeStatus = (status) => {
    switch(status) {
      case 'Repasse Pago': return { bg: '#d1fae5', text: '#065f46' };
      case 'Fechado': return { bg: '#dbeafe', text: '#1e40af' };
      case 'Repasse Solicitado': return { bg: '#fef3c7', text: '#92400e' };
      case 'Em Contestação': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  // Funções de Ação
  const handleSolicitarRepasse = (e) => {
    e.preventDefault();
    alert(`Repasse de R$ ${modalRepasse.comissaoLiquida} solicitado com sucesso! O status mudará para "Repasse Solicitado".`);
    // Aqui chamaria o backend para alterar o status e notificar o Admin (RF-030.15)
    setModalRepasse(null);
  };

  const handleContestar = (e) => {
    e.preventDefault();
    alert(`Contestação enviada! Status do período ${modalContestacao.periodo} mudará para "Em Contestação".`);
    // Aqui chamaria o backend (RF-030.19)
    setModalContestacao(null);
  };

  return (
    <div>
      {/* CABEÇALHO */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Comissionamento e Repasse</h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Acompanhe suas comissões e solicite repasses</p>
      </div>

      {/* PAINEL DO PERÍODO ATUAL (RF-030.01 a RF-030.03) */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Período Atual em Aberto</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>De {periodoAtual.dataInicio} até {periodoAtual.dataFimPrevista} (Previsão)</p>
          </div>
          <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#f3f4f6', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold', color: '#374151' }}>
            Aguardando Fechamento
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#6b7280' }}>Comissão Bruta Acumulada</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>R$ {periodoAtual.comissaoBruta.toFixed(2)}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '0.875rem', color: '#ef4444' }}>Total de Deduções</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>- R$ {periodoAtual.deducoes.toFixed(2)}</p>
            <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>Cancelamentos/Reembolsos</small>
          </div>
          <div style={{ paddingLeft: '1.5rem', borderLeft: '2px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 'bold' }}>Comissão Líquida a Receber</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>R$ {periodoAtual.comissaoLiquida.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE PERÍODOS (RF-030.04) */}
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Histórico de Períodos Fechados</h2>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Período</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Vendas (R$)</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Qtd Ingressos</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Comissão Bruta</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Deduções</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Comissão Líquida</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((h) => (
              <tr key={h.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{h.periodo}</td>
                <td style={{ padding: '0.75rem' }}>R$ {h.vendas.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>{h.qtdIngressos}</td>
                <td style={{ padding: '0.75rem' }}>R$ {h.comissaoBruta.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', color: '#ef4444' }}>R$ {h.deducoes.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#10b981' }}>R$ {h.comissaoLiquida.toFixed(2)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: getBadgeStatus(h.status).bg, color: getBadgeStatus(h.status).text }}>
                    {h.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  {/* Botões de Ação (RF-030.09 e RF-030.10) */}
                  {h.status === 'Fechado' && h.comissaoLiquida > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => setModalRepasse(h)} style={{ padding: '0.25rem 0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Solicitar Repasse</button>
                      <button onClick={() => setModalContestacao(h)} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'white', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Contestar</button>
                    </div>
                  )}
                  {h.status !== 'Fechado' && (
                    <button style={{ padding: '0.25rem 0.5rem', backgroundColor: 'white', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Ver Detalhes</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE SOLICITAÇÃO DE REPASSE (RF-030.11 a RF-030.15) */}
      {modalRepasse && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Solicitar Repasse - {modalRepasse.periodo}</h2>
            <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
              <p style={{ margin: 0, color: '#065f46', fontSize: '0.875rem' }}>Valor a ser repassado</p>
              <h3 style={{ margin: 0, fontSize: '2rem', color: '#10b981' }}>R$ {modalRepasse.comissaoLiquida.toFixed(2)}</h3>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Dados Bancários para Depósito</h4>
              <div style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem', color: '#374151' }}>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Banco:</strong> 033 - Santander</p>
                <p style={{ margin: '0 0 0.25rem 0' }}><strong>Agência:</strong> 1234 | <strong>Conta:</strong> 56789-0</p>
                <p style={{ margin: 0 }}><strong>Titular:</strong> Turismo Curitiba 360 Ltda</p>
              </div>
              <a href="/perfil" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none' }}>Editar dados bancários</a>
            </div>

            <form onSubmit={handleSolicitarRepasse}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Observação (Opcional)</label>
                <textarea 
                  rows="3" 
                  value={observacaoRepasse}
                  onChange={(e) => setObservacaoRepasse(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Alguma observação para o Administrador?"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalRepasse(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Confirmar Solicitação</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE CONTESTAÇÃO (RF-030.16 a RF-030.20) */}
      {modalContestacao && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Contestar Valores - {modalContestacao.periodo}</h2>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>Se você encontrou alguma divergência nas comissões deste período, preencha os dados abaixo.</p>

            <form onSubmit={handleContestar}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Valor Esperado (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={valorEsperado}
                  onChange={(e) => setValorEsperado(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Ex: 1500.00"
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Motivo da Contestação *</label>
                <textarea 
                  rows="4" 
                  required
                  value={motivoContestacao}
                  onChange={(e) => setMotivoContestacao(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="Detalhe os pedidos ou valores que estão incorretos..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={() => setModalContestacao(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>Cancelar</button>
                <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Enviar Contestação</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
