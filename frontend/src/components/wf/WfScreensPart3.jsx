// frontend/src/components/wf/WfScreensPart3.jsx
// Implementação fiel e 100% interativa das telas WF-028 a WF-047 (Gestão Financeira da Atração, Validações e Relatórios PDF/Tela)
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  WfSidebar, WfPagination, WfStatusPill,
  OFFICIAL_LOGO, OFFICIAL_HORIZONTAL_LOGO
} from './WfShell';
import { platformSyncService } from '../../services/platformSyncService';
import { downloadExcelCsv, playTurnstileBeep } from '../../utils/exportAndAudioUtils';

// ============================================================================
// WF-028 & WF-029: NEGOCIAÇÃO FINANCEIRA (CONDIÇÕES COMERCIAIS E INFORMAÇÕES FINANCEIRAS)
// ============================================================================
export function Wf028AttractionFinancialConfig({ mode = 'condicoes' }) {
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu={mode === 'condicoes' ? 'fin-condicoes' : 'fin-info'} />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '780px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>
              {mode === 'condicoes' ? 'Condições Comercial' : 'Informações Financeiras'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 18px 0' }}>
              Condições comerciais do contrato
            </p>
          </div>
          <button onClick={handleSave} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            Salvar Alterações ✓
          </button>
        </div>

        {savedBanner && (
          <div style={{ maxWidth: '780px', marginBottom: 16, padding: '10px 14px', borderRadius: 8, backgroundColor: '#dcfce7', color: '#166534', fontWeight: 700, fontSize: 13 }}>
            ✓ Configurações salvas e sincronizadas com o contrato da atração!
          </div>
        )}

        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '20px', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Apelido</label>
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: 6 }}>Nome da condição comercial</span>
            <input defaultValue="Padrão 10%" style={{ width: '320px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
          </div>

          {mode === 'condicoes' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Porcentagem/Valor</label>
                  <select style={{ width: '260px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }}><option>Porcentagem</option><option>Valor</option></select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Valor</label>
                  <input defaultValue="10%" style={{ width: '100px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. C.Crédito a Vista</label>
                  <input defaultValue="1,5%" style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. C.Crédito Parcelado</label>
                  <input defaultValue="1,5%" style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Pix</label>
                  <input defaultValue="1,5%" style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Antecipação</label>
                  <input defaultValue="1,5%" style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tx. Internacional</label>
                  <input defaultValue="1,5%" style={{ width: '110px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Prazo para pagamento</label>
                <input defaultValue="15" style={{ width: '70px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Liberado saque</label>
                <select style={{ width: '140px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }}><option>Sim</option><option>Não</option></select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Valor liberado para saque</label>
                <input defaultValue="R$ 10.000,00" style={{ width: '180px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Tempo mínimo para saque (dias)</label>
                <input defaultValue="15" style={{ width: '90px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#3b4758', marginBottom: 4 }}>Desconto Pix / TED</label>
                <input defaultValue="R$ 0,15" style={{ width: '140px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-030: RESUMO DAS DESPESAS & SOLICITAR REPASSE
// ============================================================================
export function Wf030ExpensesSummary() {
  const [showRepasseModal, setShowRepasseModal] = useState(true);
  const [valorRepasse, setValorRepasse] = useState('10.000,00');
  const [expandedRow, setExpandedRow] = useState('opera');

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="fin-despesas" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '580px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Resumo das Despesas</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 18px 0' }}>Condições comerciais do contrato</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}></th>
                  <th style={{ padding: '12px' }}>Nome ↕</th>
                  <th style={{ padding: '12px' }}>Status ↕</th>
                  <th style={{ padding: '12px' }}>Data de Liberação ↕</th>
                  <th style={{ padding: '12px' }}>Receita Líquida ↕</th>
                  <th style={{ padding: '12px' }}>Repasse ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1', cursor: 'pointer' }} onClick={() => setExpandedRow(expandedRow === 'opera' ? null : 'opera')}>
                  <td style={{ padding: '14px' }}>{expandedRow === 'opera' ? '⌃' : '⌄'}</td>
                  <td style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={OFFICIAL_LOGO} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #475467', padding: 2 }} />
                    <strong>Opera de Arame</strong>
                  </td>
                  <td style={{ padding: '14px' }}><WfStatusPill status="Aguardando Liberação" /></td>
                  <td style={{ padding: '14px' }}>02/12/2026 16:44:22</td>
                  <td style={{ padding: '14px', fontWeight: 700 }}>88.000,00</td>
                  <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setShowRepasseModal(true)} style={{ padding: '6px 14px', borderRadius: 99, border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Solicitar Repasse</button>
                  </td>
                </tr>
                {expandedRow === 'opera' && (
                  <tr>
                    <td colSpan={6} style={{ padding: '0 0 16px 36px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                            <th style={{ padding: 10 }}>Nome ↕</th>
                            <th style={{ padding: 10 }}>Valor ↕</th>
                            <th style={{ padding: 10 }}>Tipo ↕</th>
                            <th style={{ padding: 10 }}>Status ↕</th>
                            <th style={{ padding: 10 }}>Observações ↕</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { nome: 'Ingressos', valor: '100.000,00', tipo: 'Receita', status: 'Recebido', obs: '------------' },
                            { nome: 'Comissão Agentes', valor: '1.000,00', tipo: 'Despesas', status: 'Pendente', obs: '------------' },
                            { nome: 'Repasse', valor: '9.000,00', tipo: 'Despesas', status: 'Bloqueio Financeiro', obs: 'Cliente com bloqueio' },
                            { nome: 'Encargos', valor: '900,00', tipo: 'Despesas', status: 'Pendente', obs: '------------' }
                          ].map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                              <td style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <img src={OFFICIAL_LOGO} alt="" style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid #475467', padding: 1 }} />
                                <strong>{row.nome}</strong>
                              </td>
                              <td style={{ padding: 12 }}>{row.valor}</td>
                              <td style={{ padding: 12 }}><WfStatusPill status={row.tipo} /></td>
                              <td style={{ padding: 12 }}><WfStatusPill status={row.status} /></td>
                              <td style={{ padding: 12 }}>{row.obs}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                <tr style={{ borderBottom: '1px solid #cbd5e1', cursor: 'pointer' }} onClick={() => setExpandedRow(expandedRow === 'musica' ? null : 'musica')}>
                  <td style={{ padding: '14px' }}>{expandedRow === 'musica' ? '⌃' : '⌄'}</td>
                  <td style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={OFFICIAL_LOGO} alt="" style={{ width: 32, height: 32, borderRadius: '50%', border: '1.5px solid #475467', padding: 2 }} />
                    <strong>Rua da Música</strong>
                  </td>
                  <td style={{ padding: '14px' }}><WfStatusPill status="Aguardando Liberação" /></td>
                  <td style={{ padding: '14px' }}>02/12/2026 16:44:22</td>
                  <td style={{ padding: '14px', fontWeight: 700 }}>88.000,00</td>
                  <td style={{ padding: '14px' }} onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setShowRepasseModal(true)} style={{ padding: '6px 14px', borderRadius: 99, border: 'none', backgroundColor: '#f59e0b', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Solicitar Repasse</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {showRepasseModal && (
            <div style={{ width: '320px', border: '1.5px solid #475467', borderRadius: '14px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <strong style={{ fontSize: '15px', color: '#3b4758' }}>Você tem R$ 10.000,00 liberados para repasse</strong>
                <button onClick={() => setShowRepasseModal(false)} style={{ border: 'none', background: '#eef1f5', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>✕</button>
              </div>
              <label style={{ fontSize: 12, color: '#64748b', display: 'block', marginBottom: 6 }}>Valor</label>
              <input value={valorRepasse} onChange={(e) => setValorRepasse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', marginBottom: '14px', boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setValorRepasse('10.000,00')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', fontWeight: 700, cursor: 'pointer' }}>Valor Total</button>
                <button onClick={() => alert(`Repasse de R$ ${valorRepasse} solicitado com sucesso!`)} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Solicitar ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WF-031: VALIDAR INGRESSOS (CATRACA / VALIDAÇÃO)
// ============================================================================
export function Wf031ValidateTickets({ store }) {
  const [tab, setTab] = useState('Todos');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const vouchers = store?.liveVouchers || [];

  useEffect(() => {
    let stream = null;
    if (cameraActive && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(() => {
          setFeedback({ ok: false, message: 'Câmera indisponível neste dispositivo — use o leitor USB ou clique em Simular Leitura QR.' });
          setCameraActive(false);
        });
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [cameraActive]);

  const handleValidate = (overrideCode) => {
    const target = (typeof overrideCode === 'string' ? overrideCode : code).trim() || 'ING8001';
    const res = platformSyncService.validateTicketCode(target, 'João da Silva');
    playTurnstileBeep(res.ok ? 'success' : 'error');
    setFeedback(res);
    setCode('');
  };

  const allRows = [
    { id: '279827982798', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Validado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982799', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Validado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982800', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Erro de leitura', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    { id: '279827982801', nome: 'Darlene Robertson', email: 'Darlene.Robertson@gmail.com', status: 'Cancelado', data: '02/07/2026 16:44:22', por: 'João da Silva' },
    ...vouchers.slice(0, 3).map((v) => ({ id: v.codigo, nome: v.turista, email: v.email, status: v.status === 'Vendido' ? 'Validado' : v.status, data: v.dataHora, por: 'João da Silva' }))
  ];

  const filteredRows = allRows.filter((row) => {
    if (tab === 'Validados') return row.status === 'Validado';
    if (tab === 'Cancelados') return row.status === 'Cancelado' || row.status === 'Erro de leitura';
    return true;
  });

  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu="validar" />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>Validar Ingressos</h1>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Histórico de ingressos validados</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código QR (ex: ING8001)" style={{ width: '220px', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #475467' }} />
            <button onClick={() => handleValidate()} style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Validar Código ✓</button>
            <button onClick={() => setCameraActive(!cameraActive)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: cameraActive ? '#dc2626' : '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
              {cameraActive ? 'Fechar Câmera ✕' : 'Iniciar Validação 📷'}
            </button>
          </div>
        </div>

        {cameraActive && (
          <div style={{ marginBottom: 18, padding: 16, borderRadius: 12, backgroundColor: '#0f172a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: 200, height: 130, borderRadius: 10, backgroundColor: '#000', objectFit: 'cover', border: '2px solid #00a896' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: '#5eead4' }}>● Scanner WebRTC Ativo (Modo Catraca PWA)</div>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 10px 0' }}>Aponte o QR Code do voucher para a câmera ou clique ao lado para simular um bip de catraca:</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => handleValidate('ING8001')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: '#059669', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Simular QR Válido (ING8001)</button>
                  <button onClick={() => handleValidate('ING8002')} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', backgroundColor: '#d97706', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Simular QR Já Usado (ING8002)</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {feedback && (
          <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 16, backgroundColor: feedback.ok ? '#dcfce7' : '#fee2e2', color: feedback.ok ? '#166534' : '#991b1b', fontWeight: 700 }}>
            {feedback.message}
          </div>
        )}

        <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', marginBottom: '18px' }}>
          {['Todos', 'Validados', 'Cancelados'].map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderBottom: tab === t ? '3px solid #3b4758' : 'none', fontWeight: tab === t ? 700 : 500, cursor: 'pointer' }}>{t}</button>
          ))}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}>ID Ingresso ↕</th>
              <th style={{ padding: '12px 14px' }}>Nome ↕</th>
              <th style={{ padding: '12px 14px' }}>Status ↕</th>
              <th style={{ padding: '12px 14px' }}>Data/hora da Leitura ↕</th>
              <th style={{ padding: '12px 14px' }}>Validado por ↕</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px' }}>📋 {row.id}</td>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 700, color: '#3b4758' }}>{row.nome}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{row.email}</div>
                </td>
                <td style={{ padding: '14px' }}><WfStatusPill status={row.status} /></td>
                <td style={{ padding: '14px' }}>{row.data}</td>
                <td style={{ padding: '14px' }}>{row.por}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <WfPagination />
      </div>
    </div>
  );
}

// ============================================================================
// WF-032 A WF-047: RELATÓRIOS DA ATRAÇÃO (TELA E PDF COM LOGO OFICIAL CURITIBA 360°)
// ============================================================================
export function Wf032AttractionReport({ reportTitle = 'Relatório de Vendas', activeMenu = 'fin-vendas', isPdf = false, isBordero = false, pdfSlug = '' }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedAgent, setSelectedAgent] = useState('Todos');
  const [startDate, setStartDate] = useState('01/01/2026');
  const [endDate, setEndDate] = useState('31/12/2026');

  const allRows = [
    { cat: 'Adulto', qtd: 2798, unit: 'R$ 17,50', total: 'R$ 48.965,00' },
    { cat: 'Morador Curitiba Adulto', qtd: 2798, unit: 'R$ 17,50', total: 'R$ 48.965,00' },
    { cat: 'Estudante', qtd: 2798, unit: 'R$ 17,50', total: 'R$ 48.965,00' },
    { cat: 'Doador', qtd: 2798, unit: 'R$ 17,50', total: 'R$ 48.965,00' }
  ];

  const rows = selectedCategory === 'Todos' ? allRows : allRows.filter((r) => r.cat === selectedCategory);

  // LAYOUT PDF (WF-033, WF-035, WF-037, WF-039, WF-041, WF-043, WF-045, WF-047)
  if (isPdf) {
    return (
      <div className="notranslate" translate="no" style={{ backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)', padding: '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            border: '1.5px solid #94a3b8',
            borderRadius: '4px',
            padding: '22px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            marginBottom: '28px'
          }}>
            <img
              src={OFFICIAL_LOGO}
              alt="Curitiba 360°"
              style={{ width: '115px', height: '115px', objectFit: 'contain' }}
            />
            <div>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#475569', margin: '0 0 6px 0' }}>{reportTitle}</h1>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#475569' }}>Parque Jaime Lerner</div>
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#475569', marginBottom: '12px' }}>Filtros aplicados</h3>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Período</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>📅 {startDate} - {endDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Categoria</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>⊞ {selectedCategory}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Agente</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>👤 {selectedAgent}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: 4 }}>Tipo de Ingresso</div>
              <div style={{ border: '1.5px solid #475467', borderRadius: 8, padding: '10px 14px', fontSize: '13.5px' }}>🎟 Todos</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Categoria ↕</th>
                <th style={{ padding: '12px 16px' }}>Quantidade ↕</th>
                <th style={{ padding: '12px 16px' }}>Unitário ↕</th>
                <th style={{ padding: '12px 16px' }}>Total ↕</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.cat}</td>
                  <td style={{ padding: '14px 16px' }}>{r.qtd}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.unit}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 700 }}>{r.total}</td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}>
                <td style={{ padding: '14px 16px' }}>Quantidade: {rows.length}</td>
                <td style={{ padding: '14px 16px' }}>{(rows.length * 2798).toLocaleString('pt-BR')}</td>
                <td style={{ padding: '14px 16px' }}>R$ 17,50</td>
                <td style={{ padding: '14px 16px' }}>Total: R$ {(rows.length * 48965).toLocaleString('pt-BR')}</td>
              </tr>
            </tbody>
          </table>

          {isBordero && (
            <div style={{ marginTop: '36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', textAlign: 'center', paddingTop: '36px' }}>
              <div>
                <img src={OFFICIAL_HORIZONTAL_LOGO} alt="Curitiba 360°" style={{ height: 38, marginBottom: 8 }} />
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '28px' }}>Curitiba 360°</div>
                <div style={{ borderBottom: '1.5px solid #94a3b8', width: '75%', margin: '0 auto' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '46px', marginTop: '20px' }}>Parceiro Comercial</div>
                <div style={{ borderBottom: '1.5px solid #94a3b8', width: '75%', margin: '0 auto' }} />
              </div>
            </div>
          )}
        </div>

        <div style={{ paddingTop: '32px', fontSize: '12.5px', fontWeight: 700, color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
          <span>Emitido: quarta-feira 25 novembro 2026 às 14:30:00 Página 1/5</span>
          <button onClick={() => window.print()} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir PDF 🖨</button>
        </div>
      </div>
    );
  }

  // LAYOUT TELA DE RELATÓRIO DA ATRAÇÃO (WF-032, WF-034, WF-036, WF-038, WF-040, WF-042, WF-044, WF-046)
  return (
    <div className="notranslate" translate="no" style={{ display: 'flex', backgroundColor: '#ffffff', minHeight: 'calc(100vh - 45px)' }}>
      <WfSidebar mode="attraction" activeMenu={activeMenu} />
      <div style={{ flex: 1, padding: '28px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#3b4758', margin: 0 }}>{reportTitle}</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => window.print()} style={{ padding: '9px 16px', borderRadius: 8, border: '1.5px solid #475467', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>Imprimir 🖨</button>
            <button
              onClick={() => downloadExcelCsv(
                `${reportTitle.toLowerCase().replace(/\s+/g, '-')}-curitiba360.csv`,
                ['Categoria', 'Quantidade', 'Valor Unitario', 'Valor Total'],
                rows.map((r) => [r.cat, r.qtd, r.unit, r.total])
              )}
              style={{ padding: '9px 16px', borderRadius: 8, border: 'none', backgroundColor: '#eef1f5', color: '#3b4758', fontWeight: 700, cursor: 'pointer' }}
            >
              Download XLSX 📊
            </button>
            <button onClick={() => pdfSlug && navigate(`/tela/${pdfSlug}`)} style={{ padding: '9px 18px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Download PDF 📄</button>
          </div>
        </div>

        {isBordero && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px', fontSize: '12.5px', color: '#475569', backgroundColor: '#f8fafc', padding: '16px', borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <div>
              <strong style={{ fontSize: '15px', color: '#3b4758', display: 'block', marginBottom: 6 }}>Dados do Parceiro</strong>
              <div><strong>Razão Social:</strong> Instituto Jaime Lerner</div>
              <div><strong>Nome:</strong> Parque Jaime Lerner</div>
              <div><strong>CNPJ:</strong> 01.344.065/0001-17</div>
              <div><strong>Cidade:</strong> Curitiba - Paraná</div>
              <div><strong>Email:</strong> contato@parquejaimelerner.com</div>
            </div>
            <div>
              <strong style={{ fontSize: '15px', color: '#3b4758', display: 'block', marginBottom: 6 }}>Dados da Atração</strong>
              <div><strong>Nome:</strong> Parque Jaime Lerner</div>
              <div><strong>Local:</strong> Curitiba - PR</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontWeight: 700, fontSize: '13px', color: '#3b4758', marginBottom: '8px' }}>Filtros</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Todo o período ☑</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '115px', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
                <input value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '115px', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #475467' }} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Categoria</div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option value="Todos">⊞ Todos</option>
                <option value="Adulto">Adulto</option>
                <option value="Morador Curitiba Adulto">Morador Curitiba Adulto</option>
                <option value="Estudante">Estudante</option>
                <option value="Doador">Doador</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Agente</div>
              <select value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}>
                <option value="Todos">👤 Todos</option>
                <option value="Hotel Pestana">Hotel Pestana Curitiba</option>
                <option value="Agencia Silva">Agência Silva</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 4 }}>Tipo de Ingresso</div>
              <select style={{ padding: '9px 14px', borderRadius: 8, border: '1.5px solid #475467' }}><option>🎟 Todos</option><option>Inteira</option><option>Meia / Morador</option></select>
            </div>
            <button onClick={() => setSelectedCategory('Todos')} style={{ padding: '10px 16px', borderRadius: 8, border: 'none', backgroundColor: '#4e5a6b', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Limpar Filtros ↺</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
          <thead>
            <tr style={{ backgroundColor: '#eef1f5', color: '#3b4758', textAlign: 'left' }}>
              <th style={{ padding: '12px 14px' }}>Categoria ↕</th>
              <th style={{ padding: '12px 14px' }}>Quantidade ↕</th>
              <th style={{ padding: '12px 14px' }}>Unitário ↕</th>
              <th style={{ padding: '12px 14px' }}>Total ↕</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #cbd5e1' }}>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.cat}</td>
                <td style={{ padding: '14px' }}>{r.qtd}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.unit}</td>
                <td style={{ padding: '14px', fontWeight: 700 }}>{r.total}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}>
              <td style={{ padding: '14px' }}>Quantidade: {rows.length}</td>
              <td style={{ padding: '14px' }}>{(rows.length * 2798).toLocaleString('pt-BR')}</td>
              <td style={{ padding: '14px' }}>R$ 17,50</td>
              <td style={{ padding: '14px' }}>Total: R$ {(rows.length * 48965).toLocaleString('pt-BR')}</td>
            </tr>
          </tbody>
        </table>

        {isBordero ? (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#3b4758', marginBottom: '10px' }}>Resumo Fechamento</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '32px' }}>
              <thead>
                <tr style={{ backgroundColor: '#eef1f5', textAlign: 'left' }}>
                  <th style={{ padding: 12 }}>Descrição ↕</th>
                  <th style={{ padding: 12 }}>Valor ↕</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>Despesas</td><td style={{ padding: 12, fontWeight: 700 }}>R$ 98.085,15</td></tr>
                <tr style={{ borderBottom: '1px solid #cbd5e1' }}><td style={{ padding: 12 }}>Venda de ingressos</td><td style={{ padding: 12, fontWeight: 700 }}>R$ +193.075,00</td></tr>
                <tr style={{ backgroundColor: '#eef1f5', fontWeight: 800 }}><td style={{ padding: 12 }}>Fechamento</td><td style={{ padding: 12 }}>Total Líquido: R$ 94.989,85</td></tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', textAlign: 'center', paddingTop: '20px' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '36px' }}>Curitiba 360</div>
                <div style={{ borderBottom: '1.5px solid #cbd5e1', width: '70%', margin: '0 auto' }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#3b4758', marginBottom: '36px' }}>Parceiro Comercial</div>
                <div style={{ borderBottom: '1.5px solid #cbd5e1', width: '70%', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        ) : (
          <WfPagination />
        )}
      </div>
    </div>
  );
}
