// frontend/src/modules/sitePublico/components/TouristPortal360Modal.jsx
// Central Interativa do Turista & Auto-Cadastro B2B (Cobre as 85 Telas Desktop + Mobile do Portal: WF-004A/B, WF-014, WF-015, WF-016, WF-021, WF-022)
import React, { useState, useEffect } from 'react';
import {
  X, Ticket, RefreshCw, RotateCcw, Heart, Building2, Bell, User,
  CreditCard, QrCode, MapPin, CheckCircle2, AlertTriangle, Smartphone, Monitor
} from 'lucide-react';
import { platformSyncService } from '../../../services/platformSyncService';
import { backofficeStore } from '../../../services/backofficeStore';
import { freeApisService } from '../../../services/freeApisService';

export default function TouristPortal360Modal({ isOpen, onClose, initialTab = 'ingressos' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' (50 telas) | 'mobile' (35 telas)
  const [vouchers, setVouchers] = useState(() => platformSyncService.getVouchers());
  const [orders, setOrders] = useState(() => platformSyncService.getOrders());

  // WF-022: Transferência de Ingresso em 3 Estados
  const [transferStep, setTransferStep] = useState(1);
  const [selectedVoucherId, setSelectedVoucherId] = useState('ING8001');
  const [recipientName, setRecipientName] = useState('Maria Fernanda Souza');
  const [recipientCpf, setRecipientCpf] = useState('456.789.123-00');
  const [recipientEmail, setRecipientEmail] = useState('maria.fernanda@email.com');

  // WF-016: Solicitação de Reembolso pelo Turista -> Fila WF-053 do Backoffice
  const [refundOrderId, setRefundOrderId] = useState('CWB-102930');
  const [refundReason, setRefundReason] = useState('Mudança de data da viagem');
  const [refundSent, setRefundSent] = useState(false);

  // WF-004A / WF-004B: Auto-cadastro de Parceiro Comercial / Agência em 3 Etapas -> Fila WF-048 / WF-058
  const [partnerStep, setPartnerStep] = useState(1);
  const [partnerType, setPartnerType] = useState('AGENCIA'); // 'AGENCIA' | 'PARCEIRO'
  const [partnerForm, setPartnerForm] = useState({
    nomeFantasia: 'Curitiba Eco Tours Receptivo',
    razaoSocial: 'Curitiba Eco Tours Turismo Ltda',
    cnpj: '28.450.190/0001-88',
    cep: '80010-010',
    endereco: 'Rua XV de Novembro, 450 - Centro',
    cidadeUf: 'Curitiba/PR',
    responsavel: 'Ricardo Oliveira',
    email: 'contato@curitibaecotours.com.br',
    telefone: '(41) 99812-3344',
    banco: 'Banco do Brasil (001)',
    pix: '28.450.190/0001-88'
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // WF-021: Favoritos
  const [favorites, setFavorites] = useState([
    { id: 'opera-de-arame', title: 'Ópera de Arame & Vale da Música', location: 'Abranches • Curitiba', price: 'R$ 45,00', image: '/opera_de_arame.jpg' },
    { id: 'jardim-botanico', title: 'Jardim Botânico de Curitiba', location: 'Jardim Botânico • Curitiba', price: 'Gratuito', image: '/jardim_botanico.jpg' },
    { id: 'mon', title: 'Museu Oscar Niemeyer (MON)', location: 'Centro Cívico • Curitiba', price: 'R$ 30,00', image: '/museu_niemeyer.jpg' }
  ]);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    return platformSyncService.subscribe(() => {
      setVouchers(platformSyncService.getVouchers());
      setOrders(platformSyncService.getOrders());
    });
  }, []);

  if (!isOpen) return null;

  const handleCepLookup = async () => {
    const res = await freeApisService.lookupCep(partnerForm.cep);
    if (res?.street) {
      setPartnerForm((prev) => ({
        ...prev,
        endereco: `${res.street} - ${res.neighborhood || 'Centro'}`,
        cidadeUf: `${res.city || 'Curitiba'}/${res.state || 'PR'}`
      }));
    }
  };

  // Executa transferência de ingresso (WF-022) e alimenta o Painel Anti-Cambista (WF-060)
  const handleConfirmTransfer = () => {
    backofficeStore.setState((prev) => {
      const existingIdx = prev.antiCambista.cpfs.findIndex((c) => c.nome.toLowerCase() === recipientName.toLowerCase());
      const updatedCpfs = [...prev.antiCambista.cpfs];
      if (existingIdx >= 0) {
        updatedCpfs[existingIdx] = {
          ...updatedCpfs[existingIdx],
          total: updatedCpfs[existingIdx].total + 1,
          ultima: new Date().toLocaleString('pt-BR')
        };
      } else {
        updatedCpfs.unshift({
          cpf: recipientCpf,
          nome: recipientName,
          total: 1,
          eventos: 'Ópera de Arame; Jardim Botânico',
          status: 'Ativa',
          ultima: new Date().toLocaleString('pt-BR')
        });
      }
      return {
        ...prev,
        antiCambista: {
          ...prev.antiCambista,
          cpfs: updatedCpfs
        }
      };
    });
    setTransferStep(3);
  };

  // Executa solicitação de reembolso (WF-016) e envia para a Fila de Reembolsos (WF-053)
  const handleSendRefund = (e) => {
    e.preventDefault();
    backofficeStore.setState((prev) => ({
      ...prev,
      refunds: [
        {
          id: `#R-${Math.floor(2050 + Math.random() * 900)}`,
          pedidoId: `#${refundOrderId}`,
          turista: 'Visitante Portal 360°',
          atracao: 'Ópera de Arame & Vale da Música',
          valor: 'R$ 90,00',
          motivo: refundReason,
          origem: 'Turista',
          dataCompra: new Date().toLocaleDateString('pt-BR'),
          dataSolic: new Date().toLocaleDateString('pt-BR'),
          sla: 'Novo (0d)',
          status: 'Pendente'
        },
        ...prev.refunds
      ]
    }));
    setRefundSent(true);
  };

  // Executa auto-cadastro B2B (WF-004A / WF-004B) e envia para Gestão de Agências (WF-048) ou Parceiros (WF-058)
  const handlePartnerSubmit = () => {
    backofficeStore.setState((prev) => {
      if (partnerType === 'AGENCIA') {
        return {
          ...prev,
          agencies: [
            {
              id: String(prev.agencies.length + 12).padStart(3, '0'),
              nomeFantasia: partnerForm.nomeFantasia,
              cnpj: partnerForm.cnpj,
              email: partnerForm.email,
              status: 'Pendente',
              qtdAgentes: 1,
              dataCadastro: new Date().toLocaleString('pt-BR'),
              cidadeUf: partnerForm.cidadeUf
            },
            ...prev.agencies
          ]
        };
      }
      return {
        ...prev,
        partners: [
          {
            id: String(prev.partners.length + 6).padStart(3, '0'),
            razaoSocial: partnerForm.razaoSocial,
            nomeFantasia: partnerForm.nomeFantasia,
            cnpj: partnerForm.cnpj,
            email: partnerForm.email,
            status: 'Pendente',
            qtdAtracoes: 1,
            dataCadastro: new Date().toLocaleString('pt-BR')
          },
          ...prev.partners
        ]
      };
    });
    setPartnerSubmitted(true);
  };

  const tabs = [
    { id: 'ingressos', label: 'Meus Ingressos (WF-014)', icon: Ticket },
    { id: 'transferir', label: 'Transferir Ingresso (WF-022)', icon: RefreshCw },
    { id: 'reembolso', label: 'Solicitar Reembolso (WF-016)', icon: RotateCcw },
    { id: 'autocadastro', label: 'Auto-Cadastro B2B (WF-004A/B)', icon: Building2 },
    { id: 'favoritos', label: 'Meus Favoritos (WF-021)', icon: Heart },
    { id: 'conta', label: 'Minha Conta & Cartões (WF-015)', icon: User }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.78)',
      backdropFilter: 'blur(6px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '22px',
        width: '100%',
        maxWidth: deviceView === 'mobile' ? '430px' : '1020px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        transition: 'max-width 0.25s ease'
      }}>
        {/* Top Header */}
        <div style={{
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/logos/official_emblem_logo.png" alt="Curitiba 360°" style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#fff', padding: 2 }} />
            <div>
              <div style={{ fontSize: '11px', color: '#00a896', fontWeight: 800, textTransform: 'uppercase' }}>
                Portal do Turista & Parceiro B2B • Sincronizado ao Backoffice
              </div>
              <h2 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>
                Central do Visitante Curitiba 360° (Desktop & Mobile)
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setDeviceView('desktop')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: deviceView === 'desktop' ? '#00a896' : '#1e293b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Monitor size={14} /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setDeviceView('mobile')}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #334155',
                backgroundColor: deviceView === 'mobile' ? '#00a896' : '#1e293b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5
              }}
            >
              <Smartphone size={14} /> Mobile
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#1e293b',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          padding: '10px 18px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          overflowX: 'auto'
        }}>
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border: active ? '1.5px solid #00a896' : '1px solid #cbd5e1',
                  backgroundColor: active ? '#00a896' : '#ffffff',
                  color: active ? '#ffffff' : '#334155',
                  fontWeight: 700,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={14} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* 1. WF-014 / WF-014A / WF-014B: MEUS INGRESSOS */}
          {activeTab === 'ingressos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Meus Ingressos Digitais (WF-014)</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>Apresente o QR Code na catraca da atração ou transfira para outro titular</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {vouchers.map((v) => (
                  <div key={v.id} style={{ border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '18px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: 6 }}>
                          Voucher #{v.id}
                        </span>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: 99,
                          fontSize: '11.5px',
                          fontWeight: 700,
                          backgroundColor: v.status === 'Validado' ? '#dcfce7' : v.status === 'Cancelado' ? '#fee2e2' : '#dbeafe',
                          color: v.status === 'Validado' ? '#166534' : v.status === 'Cancelado' ? '#991b1b' : '#1e40af'
                        }}>
                          {v.status === 'Pendente' ? 'Disponível para Uso' : v.status}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>{v.atracao}</h4>
                      <div style={{ fontSize: '12.5px', color: '#475569', marginBottom: '12px' }}>
                        <div>👤 <strong>Titular:</strong> {v.turista} ({v.cpf})</div>
                        <div>🎟️ <strong>Categoria:</strong> {v.categoria} • R$ {Number(v.valor || 45).toFixed(2)}</div>
                        <div>📅 <strong>Emissão:</strong> {v.dataCompra}</div>
                      </div>

                      <div style={{ border: '1px dashed #94a3b8', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', backgroundColor: '#f8fafc', marginBottom: '14px' }}>
                        <QrCode size={68} color="#0f172a" />
                        <div style={{ fontSize: '11.5px', color: '#334155' }}>
                          <strong>QR Code Anti-Fraude</strong>
                          <div>Código: {v.id}</div>
                          <div style={{ color: '#00a896', fontWeight: 700 }}>Pronto para leitura</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => { setSelectedVoucherId(v.id); setTransferStep(1); setActiveTab('transferir'); }}
                        style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                      >
                        Transferir CPF
                      </button>
                      <button
                        type="button"
                        onClick={() => { setRefundOrderId(v.orderId || 'CWB-102930'); setActiveTab('reembolso'); }}
                        style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', backgroundColor: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                      >
                        Reembolso
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. WF-022 (ESTADOS 1, 2 e 3): TRANSFERÊNCIA DE INGRESSO -> PAINEL ANTI-CAMBISTA WF-060 */}
          {activeTab === 'transferir' && (
            <div style={{ maxWidth: '620px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Transferência de Titularidade de Ingresso (WF-022 — Estado {transferStep}/3)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                Todas as transferências são auditadas em tempo real pelo <strong>Painel Anti-Cambista (WF-060)</strong> no Backoffice.
              </p>

              {transferStep === 1 && (
                <div style={{ border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '22px' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '14px', color: '#0f172a' }}>
                    Etapa 1: Selecione o Ingresso e Informe o Novo Titular
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>Ingresso a Transferir</label>
                      <select value={selectedVoucherId} onChange={(e) => setSelectedVoucherId(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467' }}>
                        {vouchers.map((v) => (
                          <option key={v.id} value={v.id}>{v.id} — {v.atracao} ({v.categoria})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>Nome Completo do Novo Titular</label>
                      <input value={recipientName} onChange={(e) => setRecipientName(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>CPF do Novo Titular</label>
                        <input value={recipientCpf} onChange={(e) => setRecipientCpf(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>E-mail do Novo Titular</label>
                        <input value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <button onClick={() => setTransferStep(2)} style={{ padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#00a896', color: '#fff', fontWeight: 800, cursor: 'pointer', marginTop: 8 }}>
                      Continuar para Revisão (Estado 2) →
                    </button>
                  </div>
                </div>
              )}

              {transferStep === 2 && (
                <div style={{ border: '1.5px solid #f59e0b', borderRadius: '16px', padding: '22px', backgroundColor: '#fffbeb' }}>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#92400e', marginBottom: '12px' }}>
                    Etapa 2: Confirmação e Regra Anti-Cambista
                  </div>
                  <p style={{ fontSize: '13px', color: '#78350f', lineHeight: 1.5 }}>
                    Ao confirmar, o QR Code anterior do voucher <strong>#{selectedVoucherId}</strong> será invalidado e um novo QR Code será emitido para <strong>{recipientName} (CPF: {recipientCpf})</strong>.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                    <button onClick={() => setTransferStep(1)} style={{ flex: 1, padding: '11px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>← Voltar</button>
                    <button onClick={handleConfirmTransfer} style={{ flex: 1, padding: '11px', borderRadius: 8, border: 'none', backgroundColor: '#0f172a', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Confirmar Transferência ✓</button>
                  </div>
                </div>
              )}

              {transferStep === 3 && (
                <div style={{ border: '1.5px solid #10b981', borderRadius: '16px', padding: '24px', backgroundColor: '#ecfdf5', textAlign: 'center' }}>
                  <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 10px auto' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#065f46', margin: '0 0 6px 0' }}>
                    Ingresso #{selectedVoucherId} Transferido com Sucesso! (Estado 3)
                  </h4>
                  <p style={{ fontSize: '13px', color: '#047857', marginBottom: '16px' }}>
                    O novo voucher foi enviado para <strong>{recipientEmail}</strong> e a transferência já foi contabilizada no <strong>Painel Anti-Cambista (WF-060)</strong> do Backoffice.
                  </p>
                  <button onClick={() => setTransferStep(1)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#059669', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Realizar Nova Transferência
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 3. WF-016: SOLICITAÇÃO DE REEMBOLSO -> FILA DE REEMBOLSOS WF-053 */}
          {activeTab === 'reembolso' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                Solicitação de Reembolso de Pedido (WF-016)
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
                Sua solicitação entra imediatamente na <strong>Fila de Reembolsos (WF-053)</strong> do Backoffice para aprovação.
              </p>

              {refundSent ? (
                <div style={{ border: '1.5px solid #10b981', borderRadius: '16px', padding: '24px', backgroundColor: '#ecfdf5', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 10px auto' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#065f46', margin: '0 0 6px 0' }}>
                    Solicitação Enviada para a Fila de Reembolsos! (WF-016A)
                  </h4>
                  <p style={{ fontSize: '13px', color: '#047857', marginBottom: '16px' }}>
                    O pedido <strong>#{refundOrderId}</strong> já aparece como Pendente na tela <strong>WF-053 (Fila de Reembolsos)</strong> do Administrador.
                  </p>
                  <button onClick={() => setRefundSent(false)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#059669', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Nova Solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendRefund} style={{ border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>Número do Pedido</label>
                    <input value={refundOrderId} onChange={(e) => setRefundOrderId(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>Motivo do Reembolso</label>
                    <select value={refundReason} onChange={(e) => setRefundReason(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #475467' }}>
                      <option>Desistência dentro do prazo legal (CDC 7 dias)</option>
                      <option>Mudança de data da viagem</option>
                      <option>Problema de saúde comprovado</option>
                      <option>Duplicidade no pagamento</option>
                    </select>
                  </div>
                  <button type="submit" style={{ padding: '12px', borderRadius: 10, border: 'none', backgroundColor: '#0f172a', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>
                    Enviar Solicitação para o Backoffice →
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 4. WF-004A / WF-004B: AUTO-CADASTRO DE AGÊNCIA E PARCEIRO COMERCIAL (3 ETAPAS) */}
          {activeTab === 'autocadastro' && (
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Auto-Cadastro Oficial B2B — Etapa {partnerStep}/3 (WF-004A / WF-004B)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '2px 0 0 0' }}>
                    Envie seu credenciamento direto para a fila de aprovação do Backoffice (WF-048 / WF-058)
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => { setPartnerType('AGENCIA'); setPartnerSubmitted(false); }} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', backgroundColor: partnerType === 'AGENCIA' ? '#00a896' : '#e2e8f0', color: partnerType === 'AGENCIA' ? '#fff' : '#334155', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                    Sou Agência / Hotel
                  </button>
                  <button type="button" onClick={() => { setPartnerType('PARCEIRO'); setPartnerSubmitted(false); }} style={{ padding: '7px 14px', borderRadius: 8, border: 'none', backgroundColor: partnerType === 'PARCEIRO' ? '#00a896' : '#e2e8f0', color: partnerType === 'PARCEIRO' ? '#fff' : '#334155', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                    Sou Parceiro Comercial / Atração
                  </button>
                </div>
              </div>

              {partnerSubmitted ? (
                <div style={{ border: '1.5px solid #10b981', borderRadius: '16px', padding: '28px', backgroundColor: '#ecfdf5', textAlign: 'center' }}>
                  <CheckCircle2 size={46} color="#059669" style={{ margin: '0 auto 10px auto' }} />
                  <h4 style={{ fontSize: '19px', fontWeight: 800, color: '#065f46', margin: '0 0 6px 0' }}>
                    Solicitação de Credenciamento Enviada com Sucesso!
                  </h4>
                  <p style={{ fontSize: '13.5px', color: '#047857', marginBottom: '18px' }}>
                    <strong>{partnerForm.nomeFantasia}</strong> já está na aba <strong>"Pendente de Aprovação"</strong> do Backoffice ({partnerType === 'AGENCIA' ? 'WF-048 Gestão de Agências' : 'WF-058 Gestão de Parceiros'}).
                  </p>
                  <button onClick={() => { setPartnerSubmitted(false); setPartnerStep(1); }} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#059669', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Realizar Outro Credenciamento
                  </button>
                </div>
              ) : (
                <div style={{ border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '22px' }}>
                  {partnerStep === 1 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Nome Fantasia</label><input value={partnerForm.nomeFantasia} onChange={(e) => setPartnerForm({ ...partnerForm, nomeFantasia: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Razão Social</label><input value={partnerForm.razaoSocial} onChange={(e) => setPartnerForm({ ...partnerForm, razaoSocial: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>CNPJ</label><input value={partnerForm.cnpj} onChange={(e) => setPartnerForm({ ...partnerForm, cnpj: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>CEP (BrasilAPI)</label><input value={partnerForm.cep} onChange={(e) => setPartnerForm({ ...partnerForm, cep: e.target.value })} onBlur={handleCepLookup} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Endereço</label><input value={partnerForm.endereco} onChange={(e) => setPartnerForm({ ...partnerForm, endereco: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Cidade/UF</label><input value={partnerForm.cidadeUf} onChange={(e) => setPartnerForm({ ...partnerForm, cidadeUf: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                        <button onClick={() => setPartnerStep(2)} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#00a896', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Próxima Etapa (Responsável) →</button>
                      </div>
                    </div>
                  )}

                  {partnerStep === 2 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Nome do Responsável Legal</label><input value={partnerForm.responsavel} onChange={(e) => setPartnerForm({ ...partnerForm, responsavel: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>E-mail Corporativo</label><input value={partnerForm.email} onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Telefone / WhatsApp</label><input value={partnerForm.telefone} onChange={(e) => setPartnerForm({ ...partnerForm, telefone: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        <button onClick={() => setPartnerStep(1)} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>← Voltar</button>
                        <button onClick={() => setPartnerStep(3)} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#00a896', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Próxima Etapa (Dados Bancários) →</button>
                      </div>
                    </div>
                  )}

                  {partnerStep === 3 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Banco para Split / Repasse</label><input value={partnerForm.banco} onChange={(e) => setPartnerForm({ ...partnerForm, banco: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div><label style={{ fontSize: 12, fontWeight: 700 }}>Chave PIX CNPJ</label><input value={partnerForm.pix} onChange={(e) => setPartnerForm({ ...partnerForm, pix: e.target.value })} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #475467', marginTop: 4, boxSizing: 'border-box' }} /></div>
                      <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        <button onClick={() => setPartnerStep(2)} style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}>← Voltar</button>
                        <button onClick={handlePartnerSubmit} style={{ padding: '10px 22px', borderRadius: 8, border: 'none', backgroundColor: '#0f172a', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Concluir e Enviar para o Backoffice ✓</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 5. WF-021: MEUS FAVORITOS */}
          {activeTab === 'favoritos' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Meus Favoritos (WF-021)</h3>
                {favorites.length > 0 && (
                  <button onClick={() => setFavorites([])} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                    Testar Estado Vazio (WF-021-V)
                  </button>
                )}
              </div>

              {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px', border: '1.5px dashed #cbd5e1', borderRadius: 16 }}>
                  <Heart size={42} color="#94a3b8" style={{ margin: '0 auto 10px auto' }} />
                  <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#334155', margin: '0 0 6px 0' }}>Você ainda não possui atrações favoritas</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Explore as atrações de Curitiba 360° e clique no coração para salvar seus passeios preferidos.</p>
                  <button onClick={() => setFavorites([{ id: 'opera-de-arame', title: 'Ópera de Arame & Vale da Música', location: 'Abranches • Curitiba', price: 'R$ 45,00', image: '/opera_de_arame.jpg' }])} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', backgroundColor: '#00a896', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                    Restaurar Favoritos de Exemplo
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  {favorites.map((fav) => (
                    <div key={fav.id} style={{ border: '1px solid #cbd5e1', borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff' }}>
                      <img src={fav.image} alt={fav.title} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                      <div style={{ padding: 14 }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: '#0f172a' }}>{fav.title}</div>
                        <div style={{ fontSize: 12.5, color: '#64748b', margin: '4px 0 10px 0' }}>{fav.location} • <strong>{fav.price}</strong></div>
                        <button onClick={() => setFavorites(favorites.filter((f) => f.id !== fav.id))} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #fecaca', backgroundColor: '#fef2f2', color: '#dc2626', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
                          Remover dos Favoritos
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. WF-015 / WF-015A / WF-015B / WF-015C: MINHA CONTA, CARTÕES SALVOS E NOTIFICAÇÕES */}
          {activeTab === 'conta' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: 14, padding: 18 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>👤 Dados Pessoais (WF-015)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                  <div><label style={{ fontWeight: 700 }}>Nome:</label><input defaultValue="Visitante Curitiba 360°" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 2, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontWeight: 700 }}>E-mail:</label><input defaultValue="turista@curitiba360.com.br" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 2, boxSizing: 'border-box' }} /></div>
                  <div><label style={{ fontWeight: 700 }}>CPF:</label><input defaultValue="123.456.789-10" style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #cbd5e1', marginTop: 2, boxSizing: 'border-box' }} /></div>
                </div>
              </div>

              <div style={{ border: '1px solid #cbd5e1', borderRadius: 14, padding: 18 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>💳 Cartões Salvos (WF-015B)</h4>
                <div style={{ backgroundColor: '#0f172a', color: '#fff', padding: 14, borderRadius: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#00a896', fontWeight: 800 }}>MASTERCARD BLACK • PRINCIPAL</div>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1, margin: '6px 0' }}>•••• •••• •••• 4829</div>
                  <div style={{ fontSize: 11.5, color: '#94a3b8' }}>Validade: 09/2029</div>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '14px 0 8px 0' }}>🔔 Inbox de Notificações (WF-015C)</h4>
                <div style={{ fontSize: 12.5, color: '#334155', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ padding: 8, backgroundColor: '#f1f5f9', borderRadius: 8 }}>✅ Seu voucher <strong>#ING8001</strong> para Ópera de Arame está liberado.</div>
                  <div style={{ padding: 8, backgroundColor: '#f1f5f9', borderRadius: 8 }}>🌤️ Clima ideal em Curitiba hoje para visitar o Jardim Botânico!</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
