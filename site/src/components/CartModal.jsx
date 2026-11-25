import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CheckCircle, CreditCard, QrCode } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete({
        orderId: 'CWB-' + Math.floor(100000 + Math.random() * 900000),
        vouchers: cartItems.map(item => ({
          title: item.title,
          code: 'QR-' + Math.random().toString(36).substring(2, 9).toUpperCase()
        }))
      });
      onClearCart();
    }, 1500);
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
        maxWidth: '560px',
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#00a896" />
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Meu Carrinho 360</h2>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {orderComplete ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Reserva Confirmada!
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                Seus ingressos digitais foram gerados com sucesso. Apresente o QR Code no local da atração.
              </p>
              
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '24px' }}>
                <strong style={{ display: 'block', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  NÚMERO DO PEDIDO: {orderComplete.orderId}
                </strong>
                {orderComplete.vouchers.map((v, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: idx < orderComplete.vouchers.length - 1 ? '1px dashed #cbd5e1' : 'none' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{v.title}</span>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: '#00a896', backgroundColor: '#e6fffa', padding: '4px 8px', borderRadius: '6px' }}>{v.code}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setOrderComplete(null); onClose(); }}
                style={{ backgroundColor: '#00a896', color: '#ffffff', padding: '12px 24px', borderRadius: '10px', fontWeight: '800', border: 'none', cursor: 'pointer' }}
              >
                Concluir e Voltar
              </button>
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
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {cartItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <img src={item.image} alt={item.title} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', lineHeight: '1.2' }}>{item.title}</h4>
                      <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                        {item.ticketType} • Qtd: {item.quantity}
                      </span>
                      <strong style={{ fontSize: '14px', color: '#2563eb', display: 'block', marginTop: '4px' }}>
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </strong>
                    </div>
                    <button onClick={() => onRemoveItem(idx)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '6px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Payment Method Option */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  FORMA DE PAGAMENTO
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <button
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '10px',
                      border: paymentMethod === 'pix' ? '2px solid #00a896' : '1px solid #cbd5e1',
                      backgroundColor: paymentMethod === 'pix' ? '#e6fffa' : '#ffffff',
                      color: '#0f172a',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    <QrCode size={18} color="#00a896" />
                    <span>PIX Instantâneo</span>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '10px',
                      border: paymentMethod === 'card' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: paymentMethod === 'card' ? '#eff6ff' : '#ffffff',
                      color: '#0f172a',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
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
                  <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Total do Pedido:</span>
                  <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: '12px',
                    fontWeight: '800',
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: isProcessing ? 0.7 : 1,
                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
                  }}
                >
                  {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
