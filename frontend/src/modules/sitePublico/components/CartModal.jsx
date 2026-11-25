import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle, CreditCard, QrCode, Building2, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { platformSyncService } from '../../../services/platformSyncService';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [touristName, setTouristName] = useState('Turista Curitiba 360');
  const [touristEmail, setTouristEmail] = useState('visitante@curitiba360.com.br');
  const [touristCpf, setTouristCpf] = useState('123.456.789-00');
  const [couponCode, setCouponCode] = useState('');
  const [activeRef, setActiveRef] = useState(() => platformSyncService.getActiveReferral());

  useEffect(() => {
    setActiveRef(platformSyncService.getActiveReferral());
    return platformSyncService.subscribe(() => {
      setActiveRef(platformSyncService.getActiveReferral());
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const rawTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountPct = activeRef ? (activeRef.discountPct || 10) : (couponCode.trim() ? 10 : 0);
  const discountAmount = (rawTotal * discountPct) / 100;
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const created = platformSyncService.createOrder({
        cartItems,
        paymentMethod,
        touristName: touristName || 'Turista Curitiba 360',
        touristEmail: touristEmail || 'visitante@curitiba360.com.br',
        touristCpf: touristCpf || '123.456.789-00',
        couponCode: couponCode.trim()
      });
      setIsProcessing(false);
      setOrderComplete(created);
      onClearCart();
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 3000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '620px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#00a896" />
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Checkout Integrado Curitiba 360°</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {orderComplete ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <CheckCircle size={56} color="#16a34a" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                Pagamento Confirmado & Ingressos Emitidos!
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Pedido <strong>#{orderComplete.orderId}</strong> sincronizado em tempo real com o Backoffice, Validador de Catraca e Split Financeiro B2B.
              </p>

              {/* Split B2B Summary */}
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 16px', textAlign: 'left', marginBottom: '16px', fontSize: '12px', color: '#065f46' }}>
                <div style={{ fontWeight: '800', marginBottom: '4px' }}>⚡ Split Financeiro Automático Executado:</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Origem / Canal B2B:</span>
                  <strong>{orderComplete.order.parceiroNome}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Comissão B2B ({orderComplete.order.comissaoPct}%):</span>
                  <strong>R$ {orderComplete.order.comissaoRs.toFixed(2)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Repasse Líquido Atração:</span>
                  <strong>R$ {orderComplete.order.splitAtracaoRs.toFixed(2)}</strong>
                </div>
              </div>

              {/* Vouchers with Real QR Codes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                {orderComplete.vouchers.map((v, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#00a896', backgroundColor: '#e6fffa', padding: '3px 10px', borderRadius: '999px', border: '1px solid #99f6e4' }}>
                      CÓDIGO: {v.id}
                    </span>
                    <strong style={{ fontSize: '13px', color: '#0f172a', textAlign: 'center' }}>{v.atracao}</strong>
                    <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <QRCodeSVG value={v.id} size={110} />
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Titular: {v.turista}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const firstCode = orderComplete.vouchers[0]?.id || '';
                    setOrderComplete(null);
                    onClose();
                    navigate(`/validacao?code=${firstCode}`);
                  }}
                  style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '12px 18px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <QrCode size={16} />
                  <span>Testar Este Ingresso na Catraca (/validacao)</span>
                </button>

                <button
                  onClick={() => {
                    setOrderComplete(null);
                    onClose();
                    navigate('/comercial/vendas');
                  }}
                  style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '12px 18px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <ExternalLink size={16} />
                  <span>Ver no Backoffice Comercial</span>
                </button>

                <button
                  onClick={() => { setOrderComplete(null); onClose(); }}
                  style={{ backgroundColor: '#00a896', color: '#ffffff', padding: '12px 20px', borderRadius: '10px', fontWeight: '800', fontSize: '13px', border: 'none', cursor: 'pointer' }}
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <ShoppingBag size={48} color="#cbd5e1" style={{ margin: '0 auto 12px' }} />
              <p style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>Seu carrinho está vazio.</p>
              <button onClick={onClose} style={{ marginTop: '16px', color: '#2563eb', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer' }}>
                Explorar atrações
              </button>
            </div>
          ) : (
            <div>
              {/* Active B2B Referral Banner */}
              {activeRef && (
                <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '10px 14px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#1e40af' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={16} color="#2563eb" />
                    <span>QR Code Parceiro Ativo: <strong>{activeRef.name}</strong> ({activeRef.discountPct}% OFF aplicado)</span>
                  </div>
                  <span style={{ fontWeight: '800', color: '#16a34a' }}>-{activeRef.discountPct}%</span>
                </div>
              )}

              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <img src={item.image} alt={item.title} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{item.title}</h4>
                      <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>
                        {item.ticketType || 'Inteira'} • Qtd: {item.quantity}
                      </span>
                      <strong style={{ fontSize: '13px', color: '#2563eb', display: 'block' }}>
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </strong>
                    </div>
                    <button onClick={() => onRemoveItem(idx)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '6px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tourist Identification for Voucher QR Code */}
              <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Dados do Titular dos Ingressos (Para Validação na Portaria)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    value={touristName}
                    onChange={(e) => setTouristName(e.target.value)}
                    placeholder="Nome completo"
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <input
                    type="text"
                    value={touristCpf}
                    onChange={(e) => setTouristCpf(e.target.value)}
                    placeholder="CPF / Passaporte"
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <input
                    type="email"
                    value={touristEmail}
                    onChange={(e) => setTouristEmail(e.target.value)}
                    placeholder="E-mail para envio do voucher"
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Cupom (ex: TOUR10)"
                    style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Payment Method Option */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  FORMA DE PAGAMENTO (COM SPLIT AUTOMÁTICO B2B)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px',
                      border: paymentMethod === 'pix' ? '2px solid #00a896' : '1px solid #cbd5e1',
                      backgroundColor: paymentMethod === 'pix' ? '#e6fffa' : '#ffffff',
                      color: '#0f172a', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                    }}
                  >
                    <QrCode size={18} color="#00a896" />
                    <span>PIX Instantâneo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px',
                      border: paymentMethod === 'card' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: paymentMethod === 'card' ? '#eff6ff' : '#ffffff',
                      color: '#0f172a', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={18} color="#2563eb" />
                    <span>Cartão de Crédito</span>
                  </button>
                </div>
              </div>

              {/* Order Total & Action */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  {discountAmount > 0 && (
                    <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', display: 'block' }}>
                      Desconto aplicado: -R$ {discountAmount.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Total Líquido:</span>
                  <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  style={{
                    backgroundColor: '#2563eb', color: '#ffffff', padding: '14px 28px', borderRadius: '12px',
                    fontWeight: '800', fontSize: '15px', border: 'none', cursor: 'pointer',
                    opacity: isProcessing ? 0.7 : 1, boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                  }}
                >
                  {isProcessing ? 'Emitindo QR Codes...' : 'Confirmar & Gerar QR Code'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
