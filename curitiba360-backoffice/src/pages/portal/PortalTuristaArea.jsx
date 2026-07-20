// src/pages/portal/PortalTuristaArea.jsx
import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

export default function PortalTuristaArea({ user, onUpdateUser, onRemoveFavorite, onAddNotification }) {
  const [subTab, setSubTab] = useState('ingressos'); // ingressos, favoritos, perfil, notificacoes, cartoes
  
  // Local Data State
  const [tickets, setTickets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cards, setCards] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Form states for profile edit
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');

  // Notification consent preferences
  const [consentEmail, setConsentEmail] = useState(true);
  const [consentPush, setConsentPush] = useState(true);
  const [consentSms, setConsentSms] = useState(false);

  // Credit Card Form
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Transfer state
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedTicketForTransfer, setSelectedTicketForTransfer] = useState(null);
  const [transferCpf, setTransferCpf] = useState('');
  const [transferName, setTransferName] = useState('');

  // Load everything from localStorage
  const loadLocalStorage = () => {
    const savedTickets = localStorage.getItem('@Curitiba360Public:tickets');
    if (savedTickets) setTickets(JSON.parse(savedTickets));

    const savedFavorites = localStorage.getItem('@Curitiba360Public:favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedCards = localStorage.getItem('@Curitiba360Public:cards');
    if (savedCards) setCards(JSON.parse(savedCards));

    const savedNotifs = localStorage.getItem('@Curitiba360Public:notifications');
    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
  };

  useEffect(() => {
    loadLocalStorage();
  }, [subTab]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setCpf(user.cpf || '');
    }
  }, [user]);

  const saveNotification = (title, message) => {
    const list = JSON.parse(localStorage.getItem('@Curitiba360Public:notifications') || '[]');
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      date: new Date().toLocaleString(),
      read: false
    };
    const updated = [newNotif, ...list];
    localStorage.setItem('@Curitiba360Public:notifications', JSON.stringify(updated));
    setNotifications(updated);
    if (onAddNotification) onAddNotification(newNotif);
  };

  // 1. Profile Save (PP-13)
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email, phone, cpf };
    onUpdateUser(updatedUser);
    alert('Dados de perfil salvos com sucesso!');
    saveNotification('Perfil Atualizado', 'Seus dados cadastrais foram editados com sucesso nas configurações.');
  };

  // 2. Add New Card (PP-15)
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cardExpiry || !cardCvv) {
      alert('Preencha todas as informações do cartão.');
      return;
    }
    const newCard = {
      id: 'card-' + Date.now(),
      number: '•••• •••• •••• ' + cardNumber.slice(-4),
      holder: cardHolder.toUpperCase(),
      expiry: cardExpiry,
      isDefault: cards.length === 0
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem('@Curitiba360Public:cards', JSON.stringify(updatedCards));
    
    // Clear card fields
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    
    alert('Novo cartão cadastrado com sucesso!');
    saveNotification('Novo Cartão de Crédito', `O cartão final ${cardNumber.slice(-4)} foi cadastrado.`);
  };

  const handleDeleteCard = (cardId) => {
    const updated = cards.filter(c => c.id !== cardId);
    setCards(updated);
    localStorage.setItem('@Curitiba360Public:cards', JSON.stringify(updated));
  };

  const handleSetDefaultCard = (cardId) => {
    const updated = cards.map(c => ({
      ...c,
      isDefault: c.id === cardId
    }));
    setCards(updated);
    localStorage.setItem('@Curitiba360Public:cards', JSON.stringify(updated));
  };

  // 3. Request Refund (PP-16)
  const handleRequestRefund = (ticketId) => {
    if (!window.confirm('Tem certeza de que deseja solicitar o reembolso deste ingresso?')) return;
    
    const ticket = tickets.find(t => t.ticketId === ticketId);
    // Anti-fraud/simulated check: immediately refund or send to analysis
    // For demo: if ticket ID ends in even digit -> auto refund, if odd -> goes to analysis
    const lastDigit = parseInt(ticketId.slice(-1));
    const isAutoRefund = lastDigit % 2 === 0;

    if (isAutoRefund) {
      alert('Reembolso Automático Aprovado! O valor foi estornado em sua conta original e o ingresso foi cancelado.');
      // Remove ticket
      const updatedTickets = tickets.filter(t => t.ticketId !== ticketId);
      setTickets(updatedTickets);
      localStorage.setItem('@Curitiba360Public:tickets', JSON.stringify(updatedTickets));
      
      saveNotification('Reembolso Aprovado 💸', `O reembolso do ingresso ${ticket.name} (${ticketId}) foi aprovado automaticamente.`);
    } else {
      alert('Solicitação Encaminhada! O cancelamento foi solicitado fora do prazo automático e foi enviado para análise manual pela administração. Prazo: 3 dias úteis.');
      saveNotification('Reembolso em Análise', `A solicitação do reembolso do ingresso ${ticket.name} (${ticketId}) foi enviada para análise comercial.`);
    }
  };

  // 4. Transfer Ticket (PP-20)
  const handleOpenTransferModal = (ticket) => {
    setSelectedTicketForTransfer(ticket);
    setTransferCpf('');
    setTransferName('');
    setTransferModalOpen(true);
  };

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    if (!transferCpf || !transferName) {
      alert('Preencha o CPF e o nome do destinatário.');
      return;
    }

    // Anti-cambista limits: simulate check (max 2 transfers per ticket)
    // Save transfer counts to local storage
    const transferCounts = JSON.parse(localStorage.getItem('@Curitiba360Public:transfers') || '{}');
    const ticketId = selectedTicketForTransfer.ticketId;
    const currentCount = transferCounts[ticketId] || 0;

    if (currentCount >= 2) {
      alert('Transferência Bloqueada! Limite de transferências anti-cambista excedido para este ingresso (Máximo de 2 transferências por voucher).');
      setTransferModalOpen(false);
      return;
    }

    // Perform transfer: update ticket owner details
    const updatedTickets = tickets.map(t => {
      if (t.ticketId === ticketId) {
        return {
          ...t,
          buyerName: transferName,
          buyerCpf: transferCpf,
          transferred: true
        };
      }
      return t;
    });

    setTickets(updatedTickets);
    localStorage.setItem('@Curitiba360Public:tickets', JSON.stringify(updatedTickets));

    // Update transfer count
    transferCounts[ticketId] = currentCount + 1;
    localStorage.setItem('@Curitiba360Public:transfers', JSON.stringify(transferCounts));

    alert(`Ingresso transferido com sucesso para ${transferName}!`);
    saveNotification('Ingresso Transferido 🤝', `O ingresso ${selectedTicketForTransfer.name} foi transferido para ${transferName} (CPF: ${transferCpf}).`);
    setTransferModalOpen(false);
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'left',
      color: '#f8fafc',
      fontFamily: '"Outfit", "Inter", sans-serif',
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      
      {/* Sidebar do Turista */}
      <aside style={{
        flex: 0.8,
        minWidth: '220px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        boxSizing: 'border-box'
      }}>
        <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #334155', marginBottom: '1rem', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 0.5rem auto' }}>
            🧑‍💻
          </div>
          <h4 style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: 'white' }}>{user?.name || 'Visitante'}</h4>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Perfil Turista</span>
        </div>

        <button
          onClick={() => setSubTab('ingressos')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: subTab === 'ingressos' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          🎟️ Meus Ingressos
        </button>

        <button
          onClick={() => setSubTab('favoritos')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: subTab === 'favoritos' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          ❤️ Meus Favoritos
        </button>

        <button
          onClick={() => setSubTab('perfil')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: subTab === 'perfil' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          ⚙️ Ajustes de Perfil
        </button>

        <button
          onClick={() => setSubTab('notificacoes')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: subTab === 'notificacoes' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          🔔 Inbox & Notificações
        </button>

        <button
          onClick={() => setSubTab('cartoes')}
          style={{
            width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', textAlign: 'left',
            backgroundColor: subTab === 'cartoes' ? '#10b981' : 'transparent',
            color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s'
          }}
        >
          💳 Cartões Salvos
        </button>
      </aside>

      {/* Main Content Area */}
      <main style={{
        flex: 2,
        minWidth: '320px',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '2rem',
        boxSizing: 'border-box'
      }}>
        
        {/* SUBTAB 1: MEUS INGRESSOS (PP-12, PP-16, PP-20) */}
        {subTab === 'ingressos' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: 'white' }}>
              Meus Ingressos Emitidos 🎟️
            </h3>

            {tickets.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🎟️</span>
                Nenhum ingresso emitido na sua conta. Visite a vitrine para adquirir vouchers.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {tickets.map(ticket => (
                  <div key={ticket.ticketId} style={{
                    backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px',
                    padding: '1.25rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center'
                  }}>
                    {/* QR Code thumbnail */}
                    <div style={{ backgroundColor: 'white', padding: '0.5rem', borderRadius: '8px', width: '100px', height: '100px' }}>
                      <img src={ticket.qrCode} alt="QR Code" style={{ width: '100%' }} />
                    </div>

                    {/* Ticket info */}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', margin: 0, color: 'white' }}>{ticket.name}</h4>
                        <span style={{ fontSize: '0.75rem', backgroundColor: '#10b98122', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                          Ativo
                        </span>
                      </div>
                      
                      <div style={{ fontSize: '0.825rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div><strong>ID:</strong> {ticket.ticketId}</div>
                        <div><strong>Portador:</strong> {ticket.buyerName} ({ticket.buyerCpf})</div>
                        <div><strong>Validade:</strong> {ticket.date}</div>
                        {ticket.transferred && (
                          <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>🔄 Ingresso Transferido</div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', borderTop: '1px solid #334155', paddingTop: '1rem', flexBasis: '100%' }}>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleOpenTransferModal(ticket)}
                          style={{
                            flex: 1, padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #3b82f6',
                            backgroundColor: '#3b82f622', color: '#3b82f6', fontSize: '0.75rem', fontWeight: 'bold',
                            cursor: 'pointer', transition: 'background-color 0.2s'
                          }}
                        >
                          🤝 Transferir Ingresso
                        </button>
                        <button
                          onClick={() => handleRequestRefund(ticket.ticketId)}
                          style={{
                            flex: 1, padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #ef4444',
                            backgroundColor: '#ef444422', color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold',
                            cursor: 'pointer', transition: 'background-color 0.2s'
                          }}
                        >
                          💸 Solicitar Estorno / Reembolso
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 2: FAVORITOS (PP-19) */}
        {subTab === 'favoritos' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: 'white' }}>
              Meus Favoritos ❤️
            </h3>

            {favorites.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>❤️</span>
                Sua lista de favoritos está vazia. Favorite atrações e pacotes na vitrine.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {favorites.map(item => (
                  <div key={item.id} style={{
                    backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px',
                    padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'
                  }}>
                    <div style={{ height: '120px', borderRadius: '8px', overflow: 'hidden' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'white', margin: '0 0 0.25rem 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineClamp: '2', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const updated = favorites.filter(f => f.id !== item.id);
                        setFavorites(updated);
                        localStorage.setItem('@Curitiba360Public:favorites', JSON.stringify(updated));
                        if (onRemoveFavorite) onRemoveFavorite(item.id);
                      }}
                      style={{
                        padding: '0.5rem', backgroundColor: 'transparent', border: '1px solid #ef4444',
                        color: '#ef4444', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold'
                      }}
                    >
                      Remover dos Favoritos
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: AJUSTES DE PERFIL (PP-13) */}
        {subTab === 'perfil' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: 'white' }}>
              Dados Pessoais & Configurações ⚙️
            </h3>

            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  Nome Completo
                </label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                  E-mail de Contato
                </label>
                <Input
                  type="email"
                  required
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
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white' }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                style={{ backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold', padding: '0.75rem 2rem', width: 'fit-content', marginTop: '1rem' }}
              >
                Salvar Alterações
              </Button>
            </form>
          </div>
        )}

        {/* SUBTAB 4: INBOX & NOTIFICACOES (PP-14) */}
        {subTab === 'notificacoes' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: 'white' }}>
              Central de Notificações & Inbox 🔔
            </h3>

            {/* Consent preferences */}
            <div style={{
              backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px',
              padding: '1.25rem', marginBottom: '1.5rem'
            }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>Preferências de Consentimento</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '0.825rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={consentEmail} onChange={(e)=>setConsentEmail(e.target.checked)} style={{ accentColor: '#10b981' }} />
                  Receber e-mails transacionais
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={consentPush} onChange={(e)=>setConsentPush(e.target.checked)} style={{ accentColor: '#10b981' }} />
                  Notificações Web Push
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={consentSms} onChange={(e)=>setConsentSms(e.target.checked)} style={{ accentColor: '#10b981' }} />
                  Alertas SMS
                </label>
              </div>
            </div>

            {/* Inbox Messages */}
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>Mensagens Recebidas</h4>
            {notifications.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem 0' }}>
                Sua caixa de mensagens está vazia.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notifications.map(notif => (
                  <div key={notif.id} style={{
                    backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px',
                    padding: '1rem', borderLeft: '4px solid #10b981'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '0.9rem', color: 'white' }}>{notif.title}</strong>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{notif.date}</span>
                    </div>
                    <p style={{ fontSize: '0.825rem', color: '#cbd5e1', margin: 0, lineHeight: '1.4' }}>{notif.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 5: CARTOES SALVOS (PP-15) */}
        {subTab === 'cartoes' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: 'white' }}>
              Cartões de Crédito Salvos 💳
            </h3>

            {/* Saved Cards List */}
            {cards.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Você não possui nenhum cartão de crédito cadastrado.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {cards.map(card => (
                  <div key={card.id} style={{
                    backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px',
                    padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>
                        💳 {card.number} 
                        {card.isDefault && (
                          <span style={{ fontSize: '0.625rem', backgroundColor: '#10b98122', color: '#10b981', padding: '1px 4px', borderRadius: '4px', textTransform: 'uppercase' }}>Principal</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Titular: {card.holder} | Vencimento: {card.expiry}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!card.isDefault && (
                        <button
                          onClick={() => handleSetDefaultCard(card.id)}
                          style={{ background: 'none', border: '1px solid #475569', color: '#cbd5e1', borderRadius: '6px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Definir Principal
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        style={{ background: 'none', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '6px', padding: '0.25rem 0.5rem', fontSize: '0.75rem', cursor: 'pointer' }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Card Form */}
            <form onSubmit={handleAddCard} style={{
              borderTop: '1px solid #334155', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'white', fontWeight: 'bold' }}>Adicionar Novo Cartão</h4>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Número do Cartão</label>
                <Input
                  type="text"
                  required
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e)=>setCardNumber(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '0.5rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Nome no Cartão</label>
                <Input
                  type="text"
                  required
                  placeholder="JOAO DA SILVA"
                  value={cardHolder}
                  onChange={(e)=>setCardHolder(e.target.value)}
                  style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '0.5rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>Vencimento</label>
                  <Input
                    type="text"
                    required
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e)=>setCardExpiry(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '0.5rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>CVV</label>
                  <Input
                    type="text"
                    required
                    placeholder="000"
                    value={cardCvv}
                    onChange={(e)=>setCardCvv(e.target.value)}
                    style={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '0.5rem' }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                style={{ backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold', padding: '0.5rem 1.5rem', width: 'fit-content', fontSize: '0.825rem' }}
              >
                Cadastrar Cartão
              </Button>
            </form>
          </div>
        )}

      </main>

      {/* TRANSFER MODAL (PP-20) */}
      {transferModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 100000
        }}>
          <form onSubmit={handleExecuteTransfer} style={{
            backgroundColor: 'white', borderRadius: '16px', width: '380px',
            color: '#1f2937', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem',
            fontFamily: 'sans-serif', textAlign: 'left', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1e293b' }}>Transferir Voucher</div>
              <button type="button" onClick={() => setTransferModalOpen(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af' }}>&times;</button>
            </div>

            <div style={{ fontSize: '0.825rem', color: '#475569', backgroundColor: '#f1f5f9', padding: '0.75rem', borderRadius: '8px' }}>
              ⚠️ <strong>Regra Anti-Cambista:</strong> Este ingresso só pode ser transferido um limite máximo de 2 vezes.
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>Nome do Novo Titular</label>
              <Input
                type="text"
                required
                placeholder="ex: Carlos Souza"
                value={transferName}
                onChange={(e)=>setTransferName(e.target.value)}
                style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#1f2937' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>CPF do Novo Titular</label>
              <Input
                type="text"
                required
                placeholder="000.000.000-00"
                value={transferCpf}
                onChange={(e)=>setTransferCpf(e.target.value)}
                style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', color: '#1f2937' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <Button type="button" onClick={() => setTransferModalOpen(false)} style={{ flex: 1, backgroundColor: '#e2e8f0', color: '#475569', border: 'none' }}>
                Cancelar
              </Button>
              <Button type="submit" style={{ flex: 1.5, backgroundColor: '#10b981', color: 'white', border: 'none', fontWeight: 'bold' }}>
                Executar Transferência
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
