// src/pages/portal/PortalCart.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalCart({ cart, onUpdateCart, user, onAddTicket }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Carrinho, 2: Identificação/Revisão, 3: Pagamento, 4: Confirmação

  // State
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // Checkout forms
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  // Payment forms
  const [paymentMethod, setPaymentMethod] = useState('pix'); // pix, credit, googlepay
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedSavedCard, setSelectedSavedCard] = useState('');

  // PIX state
  const [pixTimeRemaining, setPixTimeRemaining] = useState(600); // 10 minutes
  const [generatedTickets, setGeneratedTickets] = useState([]);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setCpf(user.cpf || '');
    }
  }, [user]);

  // Load saved cards from localStorage
  useEffect(() => {
    const localCards = localStorage.getItem('@Curitiba360Public:cards');
    if (localCards) {
      const parsed = JSON.parse(localCards);
      setSavedCards(parsed);
      if (parsed.length > 0) {
        setSelectedSavedCard(parsed[0].id);
      }
    }
  }, [step]);

  // Countdowns for PIX simulation
  useEffect(() => {
    let timer;
    if (step === 3 && paymentMethod === 'pix') {
      timer = setInterval(() => {
        setPixTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, paymentMethod]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Cart Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalDiscount = subtotal * discount;
  const total = subtotal - totalDiscount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'CURITIBA20') {
      setDiscount(0.2); // 20% off
      setAppliedCoupon('CURITIBA20');
      alert('Cupom CURITIBA20 aplicado com sucesso! (20% de desconto)');
    } else {
      alert('Cupom inválido.');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
    setCoupon('');
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty <= 0) {
      onUpdateCart(cart.filter(item => item.id !== itemId));
    } else {
      onUpdateCart(cart.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveItem = (itemId) => {
    onUpdateCart(cart.filter(item => item.id !== itemId));
  };

  const handleIdentificationSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !cpf || !phone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setStep(3);
  };

  const handlePaymentSubmit = (e) => {
    if (e) e.preventDefault();

    // If credit card and save card is checked
    if (paymentMethod === 'credit') {
      if (!selectedSavedCard && (!cardNumber || !cardHolder || !cardExpiry || !cardCvv)) {
        alert('Por favor, preencha as informações do cartão.');
        return;
      }

      if (saveCard && cardNumber) {
        const newCard = {
          id: 'card-' + Date.now(),
          number: '•••• •••• •••• ' + cardNumber.slice(-4),
          holder: cardHolder,
          expiry: cardExpiry,
          isDefault: savedCards.length === 0
        };
        const updatedCards = [...savedCards, newCard];
        setSavedCards(updatedCards);
        localStorage.setItem('@Curitiba360Public:cards', JSON.stringify(updatedCards));
        
        // Save notification
        saveNotification('Novo Cartão Adicionado', `O cartão de crédito final ${cardNumber.slice(-4)} foi cadastrado na sua conta.`);
      }
    }

    // Generate simulated tickets
    const tickets = cart.map(item => ({
      ticketId: 'TKT-' + Math.floor(100000 + Math.random() * 900000),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      date: item.date || new Date().toLocaleDateString(),
      buyerName: name,
      buyerCpf: cpf,
      buyerEmail: email,
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TKT-' + Date.now()
    }));

    setGeneratedTickets(tickets);
    
    // Save to global tickets in localStorage
    const savedTickets = JSON.parse(localStorage.getItem('@Curitiba360Public:tickets') || '[]');
    localStorage.setItem('@Curitiba360Public:tickets', JSON.stringify([...tickets, ...savedTickets]));

    // Add Notification
    saveNotification('Ingressos Emitidos 🎉', `Sua compra de ${cart.length} item(ns) foi confirmada. Seus vouchers já estão disponíveis!`);

    // Reset Cart
    onUpdateCart([]);
    setStep(4);
  };

  const saveNotification = (title, message) => {
    const list = JSON.parse(localStorage.getItem('@Curitiba360Public:notifications') || '[]');
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      date: new Date().toLocaleString(),
      read: false
    };
    localStorage.setItem('@Curitiba360Public:notifications', JSON.stringify([newNotif, ...list]));
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'left',
      color: '#f8fafc',
      fontFamily: '"Outfit", "Inter", sans-serif'
    }}>
      
      {/* Checkout Progress Stepper */}
      {step < 4 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          backgroundColor: '#1e293b',
          borderRadius: '50px',
          padding: '0.5rem 1.5rem',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.875rem' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 1 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>1</span>
            Carrinho
          </div>
          <div style={{ flex: 1, height: '2px', backgroundColor: step >= 2 ? '#10b981' : '#334155', margin: '0 1rem' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.875rem' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 2 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>2</span>
            Identificação / Revisão
          </div>
          <div style={{ flex: 1, height: '2px', backgroundColor: step >= 3 ? '#10b981' : '#334155', margin: '0 1rem' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: step >= 3 ? '#10b981' : '#64748b', fontWeight: 'bold', fontSize: '0.875rem' }}>
            <span style={{ display: 'inline-flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: step >= 3 ? '#10b981' : '#334155', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>3</span>
            Pagamento
          </div>
        </div>
      )}

      {/* STEP 1: CART LISTING (PP-08) */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Meu Carrinho 🛒</h2>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p style={{ fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>Seu carrinho está vazio.</p>
              <Button onClick={() => window.location.reload()} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.75rem 2rem' }}>
                Voltar à Vitrine
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              {/* Items List */}
              <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '320px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                    padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center', position: 'relative'
                  }}>
                    {/* Item Thumbnail */}
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#0f172a' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Item details */}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                      <div style={{ fontSize: '0.825rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <span>📅 Data: {item.date || new Date().toLocaleDateString()}</span>
                        <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '0.95rem' }}>R$ {item.price.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Quantity Edit */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #334155', borderRadius: '8px', padding: '0.25rem' }}>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer', padding: '0 0.5rem', fontWeight: 'bold' }}>-</button>
                      <span style={{ fontSize: '0.875rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer', padding: '0 0.5rem', fontWeight: 'bold' }}>+</button>
                    </div>

                    {/* Delete Item */}
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.25rem', padding: '0.5rem' }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Panel */}
              <div style={{
                flex: 1, minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '16px',
                border: '1px solid #334155', padding: '1.5rem', display: 'flex', flexDirection: 'column',
                gap: '1.25rem', boxSizing: 'border-box'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #334155', paddingBottom: '0.75rem', margin: 0 }}>
                  Resumo do Pedido
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                      <span>Desconto ({discount*100}%)</span>
                      <span>- R$ {totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div style={{ height: '1px', backgroundColor: '#334155', margin: '0.5rem 0' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span style={{ color: '#10b981' }}>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon form */}
                {appliedCoupon ? (
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    backgroundColor: '#10b98122', border: '1px dashed #10b981', borderRadius: '8px',
                    padding: '0.5rem 1rem', fontSize: '0.825rem'
                  }}>
                    <span>🏷️ Cupom <strong>{appliedCoupon}</strong> ativo</span>
                    <button onClick={handleRemoveCoupon} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}>Remover</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                    <Input
                      type="text"
                      placeholder="Cupom (ex: CURITIBA20)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '0.5rem' }}
                    />
                    <Button type="submit" style={{ backgroundColor: '#334155', border: 'none', color: 'white', padding: '0.5rem 1rem' }}>
                      Aplicar
                    </Button>
                  </form>
                )}

                <Button
                  onClick={() => setStep(2)}
                  style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', fontWeight: 'bold' }}
                >
                  Prosseguir para Identificação
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: IDENTIFICATION / REVISION (PP-09) */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Dados do Passageiro & Revisão 👤</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Form */}
            <form onSubmit={handleIdentificationSubmit} style={{
              flex: 1.5, minWidth: '320px', backgroundColor: '#1e293b', borderRadius: '16px',
              border: '1px solid #334155', padding: '1.75rem', display: 'flex', flexDirection: 'column',
              gap: '1.25rem', boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '1px solid #334155', paddingBottom: '0.75rem', margin: 0 }}>
                Confirmar Dados Pessoais
              </h3>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Nome Completo
                </label>
                <Input
                  type="text"
                  required
                  placeholder="ex: João da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  E-mail Transacional (para envio do voucher)
                </label>
                <Input
                  type="email"
                  required
                  placeholder="exemplo@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    Telefone
                  </label>
                  <Input
                    type="tel"
                    required
                    placeholder="(41) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    CPF
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Button type="button" onClick={() => setStep(1)} style={{ flex: 1, backgroundColor: '#334155', border: 'none', color: 'white' }}>
                  Voltar
                </Button>
                <Button type="submit" style={{ flex: 1.5, backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold' }}>
                  Ir para Pagamento
                </Button>
              </div>
            </form>

            {/* Cart Preview summary */}
            <div style={{
              flex: 1, minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '16px',
              border: '1px solid #334155', padding: '1.5rem', display: 'flex', flexDirection: 'column',
              gap: '1rem', boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Revisão de Pedido</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.825rem', color: '#cbd5e1' }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>R$ {(item.price*item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: '1px', backgroundColor: '#334155', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 'bold' }}>
                <span>Total Final</span>
                <span style={{ color: '#10b981' }}>R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT METHOD (PP-10) */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Escolha a Forma de Pagamento 💳</h2>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
            
            {/* Payment selector and forms */}
            <div style={{ flex: 1.5, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Payment tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#1e293b', padding: '0.35rem', borderRadius: '12px', border: '1px solid #334155' }}>
                <button
                  onClick={() => setPaymentMethod('pix')}
                  style={{
                    flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    backgroundColor: paymentMethod === 'pix' ? '#10b981' : 'transparent',
                    color: 'white', fontWeight: 'bold', transition: 'all 0.2s'
                  }}
                >
                  📱 PIX
                </button>
                <button
                  onClick={() => setPaymentMethod('credit')}
                  style={{
                    flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    backgroundColor: paymentMethod === 'credit' ? '#10b981' : 'transparent',
                    color: 'white', fontWeight: 'bold', transition: 'all 0.2s'
                  }}
                >
                  💳 Cartão de Crédito
                </button>
                <button
                  onClick={() => setPaymentMethod('googlepay')}
                  style={{
                    flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    backgroundColor: paymentMethod === 'googlepay' ? '#4285f4' : 'transparent',
                    color: 'white', fontWeight: 'bold', transition: 'all 0.2s'
                  }}
                >
                  🤖 Google Pay
                </button>
              </div>

              {/* PIX Flow */}
              {paymentMethod === 'pix' && (
                <div style={{
                  backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                  padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1.25rem'
                }}>
                  <div style={{ fontSize: '1rem', color: '#cbd5e1' }}>Escaneie o QR Code abaixo no app do seu banco para pagar:</div>
                  
                  {/* Mock PIX QR Code */}
                  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', width: '160px', height: '160px' }}>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=curitiba360pixpayment" alt="Pix QR" style={{ width: '100%' }} />
                  </div>

                  <div style={{ fontSize: '0.825rem', color: '#94a3b8' }}>
                    O QR Code expira em: <strong style={{ color: '#ef4444' }}>{formatTime(pixTimeRemaining)}</strong>
                  </div>

                  {/* Copy & Paste Code */}
                  <div style={{ width: '100%' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem', textAlign: 'left' }}>PIX Copia e Cola:</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        readOnly
                        value="00020101021226870014br.gov.bcb.pix2565curitiba360paymentgatewaytotalvalue520400005303986540510.00"
                        style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #334155', color: '#94a3b8', borderRadius: '8px', padding: '0.5rem', fontSize: '0.75rem', outline: 'none' }}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText("00020101021226870014br.gov.bcb.pix2565curitiba360paymentgatewaytotalvalue520400005303986540510.00");
                          alert('Chave Copiada!');
                        }}
                        style={{ backgroundColor: '#334155', border: 'none', color: 'white', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        Copiar
                      </button>
                    </div>
                  </div>

                  <div style={{ height: '1px', backgroundColor: '#334155', width: '100%', margin: '0.5rem 0' }} />

                  <Button
                    onClick={handlePaymentSubmit}
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', fontWeight: 'bold' }}
                  >
                    Simular Confirmação Automática de Pagamento PIX
                  </Button>
                </div>
              )}

              {/* Credit Card Flow */}
              {paymentMethod === 'credit' && (
                <form onSubmit={handlePaymentSubmit} style={{
                  backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                  padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxSizing: 'border-box'
                }}>
                  
                  {/* Select Saved Card */}
                  {savedCards.length > 0 && (
                    <div style={{ marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                        Usar Cartão Salvo
                      </label>
                      <select
                        value={selectedSavedCard}
                        onChange={(e) => setSelectedSavedCard(e.target.value)}
                        style={{ width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', borderRadius: '8px', padding: '0.75rem', outline: 'none' }}
                      >
                        {savedCards.map(c => (
                          <option key={c.id} value={c.id}>{c.number} ({c.holder})</option>
                        ))}
                        <option value="">-- Inserir Novo Cartão --</option>
                      </select>
                    </div>
                  )}

                  {!selectedSavedCard && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                          Número do Cartão
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="0000 0000 0000 0000"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                          Nome Impresso no Cartão
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="JOAO D SILVA"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                            Validade
                          </label>
                          <Input
                            type="text"
                            required
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                            CVV
                          </label>
                          <Input
                            type="text"
                            required
                            placeholder="000"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                          />
                        </div>
                      </div>

                      {user && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', userSelect: 'none' }}>
                          <input
                            type="checkbox"
                            id="save-card-check"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            style={{ accentColor: '#10b981', width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <label htmlFor="save-card-check" style={{ fontSize: '0.825rem', color: '#cbd5e1', cursor: 'pointer' }}>
                            Salvar dados do cartão para futuras compras
                          </label>
                        </div>
                      )}
                    </>
                  )}

                  <Button
                    type="submit"
                    style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', backgroundColor: '#10b981', border: 'none', fontWeight: 'bold', marginTop: '1rem' }}
                  >
                    Confirmar Pagamento R$ {total.toFixed(2)}
                  </Button>
                </form>
              )}

              {/* Google Pay Flow */}
              {paymentMethod === 'googlepay' && (
                <div style={{
                  backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                  padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '1.5rem'
                }}>
                  <div style={{ fontSize: '1.125rem', color: '#cbd5e1' }}>
                    Pague de forma rápida e segura usando sua conta Google.
                  </div>
                  
                  {/* Google Pay Button Graphic */}
                  <button
                    onClick={handlePaymentSubmit}
                    style={{
                      backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '6px',
                      padding: '0.75rem 2.5rem', fontSize: '1.25rem', fontWeight: 'bold',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.2)', transition: 'background-color 0.2s'
                    }}
                    onMouseOver={e=>e.currentTarget.style.backgroundColor='#232323'}
                    onMouseOut={e=>e.currentTarget.style.backgroundColor='black'}
                  >
                    Google Pay
                  </button>
                </div>
              )}
            </div>

            {/* Review Box */}
            <div style={{
              flex: 1, minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '16px',
              border: '1px solid #334155', padding: '1.5rem', display: 'flex', flexDirection: 'column',
              gap: '1rem', boxSizing: 'border-box'
            }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Dados da Compra</h3>
              <div style={{ fontSize: '0.825rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Nome:</strong> {name}</div>
                <div><strong>E-mail:</strong> {email}</div>
                <div><strong>CPF:</strong> {cpf}</div>
              </div>
              <div style={{ height: '1px', backgroundColor: '#334155', margin: '0.5rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 'bold' }}>
                <span>Valor Total:</span>
                <span style={{ color: '#10b981' }}>R$ {total.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                style={{ border: 'none', background: 'none', color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.825rem', textAlign: 'left', padding: 0 }}
              >
                Alterar dados ou revisar itens
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: CONFIRMATION / VOUCHERS (PP-11) */}
      {step === 4 && (
        <div style={{
          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '24px',
          padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1.5rem'
        }}>
          <div style={{ fontSize: '4rem' }}>🎉</div>
          
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
            Compra Confirmada!
          </h2>
          
          <p style={{ color: '#cbd5e1', fontSize: '1.125rem', maxWidth: '600px', lineHeight: '1.6', margin: 0 }}>
            Obrigado por sua compra! O pagamento foi processado com sucesso. Enviamos um e-mail transacional com os detalhes e vouchers em PDF.
          </p>

          <div style={{
            backgroundColor: '#10b98122', border: '1px solid #10b981', borderRadius: '12px',
            padding: '1rem 2rem', color: '#10b981', fontWeight: 'bold', fontSize: '0.875rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            📧 Simular visualização de E-mail de Voucher: 
            <span 
              onClick={() => navigate(`/portal/email-confirmacao?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&voucher=true`)}
              style={{ textDecoration: 'underline', cursor: 'pointer', color: '#3b82f6' }}
            >
              Abrir Caixa de Entrada Mock
            </span>
          </div>

          <div style={{ height: '1px', backgroundColor: '#334155', width: '100%', margin: '1rem 0' }} />

          {/* Vouchers / QR Code generation */}
          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'left' }}>Seus Vouchers Digitais</h3>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
              {generatedTickets.map(ticket => (
                <div key={ticket.ticketId} style={{
                  backgroundColor: 'white', color: '#1e293b', border: '1px solid #e2e8f0',
                  borderRadius: '16px', padding: '1.5rem', width: '280px', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1rem', borderBottom: '1px solid #e2e8f0', width: '100%', paddingBottom: '0.5rem', textAlign: 'center' }}>
                    {ticket.name}
                  </div>
                  
                  {/* QR Code image */}
                  <div style={{ width: '150px', height: '150px', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' }}>
                    <img src={ticket.qrCode} alt="Ticket QR" style={{ width: '100%' }} />
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '100%', textAlign: 'left' }}>
                    <div><strong>ID do Ticket:</strong> {ticket.ticketId}</div>
                    <div><strong>Passageiro:</strong> {ticket.buyerName}</div>
                    <div><strong>CPF:</strong> {ticket.buyerCpf}</div>
                    <div><strong>Validade:</strong> {ticket.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Button
              onClick={() => {
                // Navigate to Tourist Area
                const activeTabSetter = window.setPublicPortalActiveTab;
                if (activeTabSetter) {
                  activeTabSetter('Area do Turista');
                } else {
                  window.location.reload();
                }
              }}
              style={{ backgroundColor: '#334155', color: 'white', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold' }}
            >
              Ir para "Meus Ingressos"
            </Button>
            
            <Button
              onClick={() => window.location.reload()}
              style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold' }}
            >
              Voltar à Vitrine Principal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
