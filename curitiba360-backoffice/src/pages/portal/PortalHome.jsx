// src/pages/portal/PortalHome.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button';

// Subcomponents
import PortalMap from './PortalMap';
import PortalCart from './PortalCart';
import PortalTuristaArea from './PortalTuristaArea';
import PortalPartnerRegistration from './PortalPartnerRegistration';
import PortalInstitucional from './PortalInstitucional';

export default function PortalHome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Navigation Tab
  const [activeTab, setActiveTab] = useState('Vitrine'); // Vitrine, Conhecendo, Carrinho, Area do Turista, Seja Parceiro, Institucional
  
  // Registration Type (for Partner tab)
  const [registrationType, setRegistrationType] = useState('partner'); // partner, agency

  // Global State (persisted in localStorage)
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // UI States
  const [cookiesAceitos, setCookiesAceitos] = useState(false);
  const [dropdownPerfilAberto, setDropdownPerfilAberto] = useState(false);
  const [googleAuthAberto, setGoogleAuthAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Pacotes');
  const [busca, setBusca] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('PT'); // PT, EN

  // Ordering State
  const [orderBy, setOrderBy] = useState('name'); // name, priceAsc, priceDesc

  // Detail Modal State (PP-07)
  const [selectedAttractionDetail, setSelectedAttractionDetail] = useState(null);
  const [detailDate, setDetailDate] = useState('');
  const [detailQty, setDetailQty] = useState(1);

  // Responsive Mobile State
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load initial state
  useEffect(() => {
    // Check if user is logged in
    const loggedUser = localStorage.getItem('@Curitiba360Public:user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }

    // Load cart
    const savedCart = localStorage.getItem('@Curitiba360Public:cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('@Curitiba360Public:favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Load cookies preference
    const cookiesPref = localStorage.getItem('@Curitiba360Public:cookies');
    if (cookiesPref === 'accepted') {
      setCookiesAceitos(true);
    }

    // Check query params for navigation hooks
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Expose tab setter globally so subcomponents can redirect
  useEffect(() => {
    window.setPublicPortalActiveTab = setActiveTab;
    return () => {
      window.setPublicPortalActiveTab = null;
    };
  }, []);

  // Sync state functions
  const handleUpdateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('@Curitiba360Public:cart', JSON.stringify(newCart));
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('@Curitiba360Public:user', JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('@Curitiba360Public:user');
    setDropdownPerfilAberto(false);
    alert('Desconectado com sucesso!');
  };

  const handleToggleFavorite = (item) => {
    let updated;
    const isFav = favorites.some(f => f.id === item.id);
    if (isFav) {
      updated = favorites.filter(f => f.id !== item.id);
    } else {
      updated = [...favorites, item];
      // Save notification
      saveNotification('Item Favoritado ❤️', `${item.name} foi adicionado à sua lista de favoritos.`);
    }
    setFavorites(updated);
    localStorage.setItem('@Curitiba360Public:favorites', JSON.stringify(updated));
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
    setNotifications([newNotif, ...list]);
  };

  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselItems = [
    { title: 'Jardim Botânico', img: '/jardim_botanico.jpg', desc: 'O cartão-postal mais famoso de Curitiba com sua icônica estufa de metal e vidro.' },
    { title: 'Ópera de Arame', img: '/opera_de_arame.jpg', desc: 'Teatro espetacular construído com tubos de aço e placas transparentes.' },
    { title: 'Museu Oscar Niemeyer', img: '/museu_niemeyer.jpg', desc: 'O famoso "Olho", um dos maiores museus de arte da América Latina.' }
  ];

  // Mock Cards Data
  const cards = [
    { id: 1, name: 'Pacote Curitiba Histórica', category: 'Pacotes', img: '/centro_historico.jpg', price: 99.90, desc: 'Conheça o Largo da Ordem, Ruínas de São Francisco e muito mais.', reviews: [{ user: 'Carlos', rating: 5, comment: 'Excelente passeio cultural!' }, { user: 'Ana', rating: 4, comment: 'Muito explicativo, vale a pena.' }] },
    { id: 2, name: 'Linha Turismo Especial', category: 'Pacotes', img: '/opera_de_arame.jpg', price: 50.00, desc: 'Ingresso de 24 horas para embarque ilimitado nos principais pontos.', reviews: [{ user: 'Julia', rating: 5, comment: 'Super prático para conhecer tudo!' }] },
    { id: 3, name: 'Parque Jaime Lerner', category: 'Parques', img: '/parque_jaime_lerner.jpg', price: 0.00, desc: 'O mais novo parque de Curitiba, com paisagismo exuberante e lagos.', reviews: [] },
    { id: 4, name: 'Parque Barigui', category: 'Parques', img: '/parque_barigui.jpg', price: 0.00, desc: 'O ponto de encontro dos curitibanos para esportes e contato com as capivaras.', reviews: [{ user: 'Pedro', rating: 5, comment: 'Lugar lindo e cheio de capivaras!' }] },
    { id: 5, name: 'Jardim Botânico Entrada', category: 'Conhecendo Curitiba', img: '/jardim_botanico.jpg', price: 0.00, desc: 'Acesso à estufa icônica, jardins e Jardim das Sensações.', reviews: [{ user: 'Mariana', rating: 5, comment: 'O lugar mais lindo da cidade!' }] },
    { id: 6, name: 'Madalosso Restaurante', category: 'Restaurantes', img: '/centro_historico.jpg', price: 85.00, desc: 'Rodízio completo com a tradicional massa e frango italianos.', reviews: [{ user: 'Renato', rating: 4, comment: 'Comida maravilhosa e farta.' }] },
    { id: 7, name: 'Show Ópera nas Pedreiras', category: 'Shows e Espetáculos', img: '/opera_de_arame.jpg', price: 120.00, desc: 'Apresentação musical exclusiva no palco flutuante da Ópera de Arame.', reviews: [] },
    { id: 8, name: 'Cupom de 20% em Hotéis', category: 'Cupons de desconto', price: 10.00, img: '/curitiba_login_banner.png', desc: 'Adquira o cupom de desconto para hospedagens parceiras Curitiba 360.', reviews: [] }
  ];

  const categorias = [
    { id: 'Pacotes', label: '🎒 Pacotes' },
    { id: 'Promocionais', label: '🏷️ Promocionais' },
    { id: 'Cupons de desconto', label: '🎟️ Cupons' },
    { id: 'Parques', label: '🌳 Parques' },
    { id: 'Conhecendo Curitiba', label: '🗺️ Conhecendo' },
    { id: 'Restaurantes', label: '🍽️ Restaurantes' },
    { id: 'Shows e Espetáculos', label: '🎵 Shows' }
  ];

  // Filtering, Searching & Sorting (PP-04)
  const filteredCards = cards
    .filter(card => {
      const matchesCategory = card.category === categoriaAtiva;
      const matchesSearch = card.name.toLowerCase().includes(busca.toLowerCase()) || card.desc.toLowerCase().includes(busca.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (orderBy === 'name') return a.name.localeCompare(b.name);
      if (orderBy === 'priceAsc') return a.price - b.price;
      if (orderBy === 'priceDesc') return b.price - a.price;
      return 0;
    });

  // Detailed modal actions
  const handleOpenDetail = (attraction) => {
    setSelectedAttractionDetail(attraction);
    setDetailDate(new Date().toISOString().split('T')[0]);
    setDetailQty(1);
  };

  const handleAddToCart = () => {
    if (!selectedAttractionDetail) return;
    
    const cartItem = {
      id: selectedAttractionDetail.id + '-' + Date.now(),
      productId: selectedAttractionDetail.id,
      name: selectedAttractionDetail.name,
      price: selectedAttractionDetail.price,
      img: selectedAttractionDetail.img,
      quantity: detailQty,
      date: detailDate
    };

    const newCart = [...cart, cartItem];
    handleUpdateCart(newCart);
    setSelectedAttractionDetail(null);
    alert(`${selectedAttractionDetail.name} adicionado ao carrinho!`);
  };

  return (
    <div style={{
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: '"Outfit", "Inter", sans-serif',
      minHeight: '100vh',
      paddingBottom: '5rem',
      position: 'relative'
    }}>
      
      {/* 1. HEADER (PP-03, PP-01, PLT-02) */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid #1e293b',
        backgroundColor: '#0f172aff',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('Vitrine')}
            style={{ fontSize: '1.25rem', fontWeight: '800', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            🌲 Curitiba <span style={{ color: '#10b981' }}>360</span>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#94a3b8', fontWeight: 'bold' }}>
            <span 
              onClick={() => setActiveTab('Vitrine')}
              style={{ cursor: 'pointer', color: activeTab === 'Vitrine' ? '#10b981' : '#94a3b8' }}
            >
              Vitrine
            </span>
            <span 
              onClick={() => setActiveTab('Conhecendo')}
              style={{ cursor: 'pointer', color: activeTab === 'Conhecendo' ? '#10b981' : '#94a3b8' }}
            >
              Mapa Interativo
            </span>
            <span 
              onClick={() => {
                setRegistrationType('agency');
                setActiveTab('Seja Parceiro');
              }}
              style={{ cursor: 'pointer', color: activeTab === 'Seja Parceiro' && registrationType === 'agency' ? '#10b981' : '#94a3b8' }}
            >
              Agente de Vendas
            </span>
            <span 
              onClick={() => {
                setRegistrationType('partner');
                setActiveTab('Seja Parceiro');
              }}
              style={{ cursor: 'pointer', color: activeTab === 'Seja Parceiro' && registrationType === 'partner' ? '#10b981' : '#94a3b8' }}
            >
              Seja Parceiro 360
            </span>
            <span 
              onClick={() => setActiveTab('Institucional')}
              style={{ cursor: 'pointer', color: activeTab === 'Institucional' ? '#10b981' : '#94a3b8' }}
            >
              Sobre / FAQ
            </span>
          </nav>
        </div>

        {/* User / Actions Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Language flag switcher */}
          <div 
            onClick={() => setSelectedLanguage(prev => prev === 'PT' ? 'EN' : 'PT')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.875rem', userSelect: 'none' }}
          >
            {selectedLanguage === 'PT' ? '🇧🇷 PT-BR' : '🇺🇸 EN-US'}
          </div>

          {/* Cart Badge */}
          <div 
            onClick={() => setActiveTab('Carrinho')}
            style={{ position: 'relative', fontSize: '1.25rem', cursor: 'pointer', userSelect: 'none' }}
          >
            🛒 <span style={{ position: 'absolute', top: '-5px', right: '-8px', backgroundColor: '#10b981', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.625rem', fontWeight: 'bold' }}>
              {cart.length}
            </span>
          </div>

          {/* Profile Section / Login Trigger */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <Button
                onClick={() => setDropdownPerfilAberto(!dropdownPerfilAberto)}
                style={{
                  backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155',
                  padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.875rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                👤 Turista: {user.name.split(' ')[0]} <span>▼</span>
              </Button>

              {dropdownPerfilAberto && (
                <div style={{
                  position: 'absolute', right: 0, top: '110%', width: '180px',
                  backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', zIndex: 110, overflow: 'hidden'
                }}>
                  <div 
                    onClick={() => { setDropdownPerfilAberto(false); setActiveTab('Area do Turista'); }}
                    style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#f1f5f9', cursor: 'pointer', textAlign: 'left' }}
                    onMouseOver={e=>e.target.style.backgroundColor='#334155'} onMouseOut={e=>e.target.style.backgroundColor='transparent'}
                  >
                    💼 Minha Área
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#334155' }} />
                  <div 
                    onClick={handleLogout}
                    style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left' }}
                    onMouseOver={e=>e.target.style.backgroundColor='#334155'} onMouseOut={e=>e.target.style.backgroundColor='transparent'}
                  >
                    🚪 Sair
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => navigate('/portal/login')}
              style={{
                backgroundColor: '#10b981', color: 'white', border: 'none',
                padding: '0.5rem 1.5rem', borderRadius: '50px', fontSize: '0.875rem',
                cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              🔑 Entrar (Visitante)
            </Button>
          )}

        </div>
      </header>

      {/* 2. TABS RENDERING CONTAINER */}
      <div style={{ padding: '2rem' }}>
        
        {/* TAB: VITRINE PRINCIPAL (PP-03, PP-04, PP-05) */}
        {activeTab === 'Vitrine' && (
          <div>
            {/* Hero Banner Section */}
            <section style={{ position: 'relative', height: '380px', overflow: 'hidden', borderRadius: '24px', marginBottom: '2.5rem' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.9) 100%), url("${carouselItems[carouselIndex].img}")`,
                backgroundSize: 'cover', backgroundPosition: 'center', transition: 'background-image 0.5s ease-in-out',
                zIndex: 1
              }} />

              <div style={{
                position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', padding: '0 2rem', textAlign: 'center'
              }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'white', letterSpacing: '-1px' }}>
                  {carouselItems[carouselIndex].title}
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#e2e8f0', margin: '0 0 2rem 0', maxWidth: '600px', lineHeight: '1.5' }}>
                  {carouselItems[carouselIndex].desc}
                </p>

                {/* Search Bar (PP-04) */}
                <div style={{
                  display: 'flex', width: '100%', maxWidth: '600px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50px',
                  padding: '0.35rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  boxSizing: 'border-box'
                }}>
                  <input
                    type="text"
                    placeholder="Pesquise atrações, pacotes, restaurantes..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    style={{
                      flex: 1, border: 'none', background: 'none', color: 'white',
                      padding: '0.75rem 1.5rem', outline: 'none', fontSize: '1rem'
                    }}
                  />
                  <button style={{
                    backgroundColor: '#10b981', color: 'white', border: 'none',
                    borderRadius: '50px', padding: '0.75rem 1.5rem', fontWeight: 'bold', cursor: 'pointer'
                  }}>
                    Buscar
                  </button>
                </div>
              </div>
            </section>

            {/* Categoria Selection Section */}
            <section style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{
                display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem',
                scrollbarWidth: 'none', msOverflowStyle: 'none', maxWidth: '75%'
              }}>
                {categorias.map(cat => {
                  const isActive = categoriaAtiva === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaAtiva(cat.id)}
                      style={{
                        flexShrink: 0, padding: '0.6rem 1.25rem', borderRadius: '50px',
                        border: isActive ? '1px solid #10b981' : '1px solid #334155',
                        backgroundColor: isActive ? '#10b98122' : '#1e293b',
                        color: isActive ? '#10b981' : '#cbd5e1',
                        fontWeight: 'bold', fontSize: '0.825rem', cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Ordering Filter (PP-04) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.825rem', color: '#94a3b8' }}>Ordenar:</span>
                <select
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                  style={{
                    backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white',
                    padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.825rem', outline: 'none'
                  }}
                >
                  <option value="name">Nome (A-Z)</option>
                  <option value="priceAsc">Menor Preço</option>
                  <option value="priceDesc">Maior Preço</option>
                </select>
              </div>
            </section>

            {/* Vitrine Cards Grid */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'white' }}>
                O que fazer Curitiba 🌿
              </h2>

              {filteredCards.length > 0 ? (
                <div style={isMobile ? {
                  display: 'flex',
                  overflowX: 'auto',
                  gap: '1.25rem',
                  paddingBottom: '1.25rem',
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none'
                } : {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: '2rem'
                }}>
                  {filteredCards.map(card => {
                    const isFavorited = favorites.some(f => f.id === card.id);
                    return (
                      <div 
                        key={card.id} 
                        style={isMobile ? {
                          flexShrink: 0,
                          width: '280px',
                          scrollSnapAlign: 'start',
                          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
                          position: 'relative', cursor: 'pointer', boxSizing: 'border-box'
                        } : {
                          backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px',
                          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
                          position: 'relative', transition: 'transform 0.3s', boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleOpenDetail(card)}
                      >
                        {/* Heart Favorite button (PP-05) */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // prevent opening details modal
                            handleToggleFavorite(card);
                          }}
                          style={{
                            position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
                            background: 'rgba(15,23,42,0.6)', border: 'none', borderRadius: '50%',
                            width: '32px', height: '32px', cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', color: isFavorited ? '#ef4444' : '#cbd5e1', fontSize: '1rem'
                          }}
                        >
                          {isFavorited ? '❤️' : '🤍'}
                        </button>

                        {/* Card Image */}
                        <div style={{ height: '170px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                          <img src={card.img} alt={card.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Info details */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <h3 style={{ fontSize: '0.95rem', fontWeight: 'bold', margin: 0, color: 'white' }}>
                              {card.name}
                            </h3>
                            <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#10b981' }}>
                              {card.price > 0 ? `R$ ${card.price.toFixed(2)}` : 'Gratuito'}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>
                            {card.desc}
                          </p>
                        </div>

                        {/* Detail Trigger */}
                        <button
                          style={{
                            width: '100%', padding: '0.5rem', backgroundColor: '#10b981', color: 'white',
                            border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.825rem', fontWeight: 'bold'
                          }}
                        >
                          👁️ Ver Detalhes & Adquirir
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b', backgroundColor: '#1e293b', borderRadius: '16px' }}>
                  Nenhuma atração ou pacote encontrado nesta categoria.
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB: CONHECENDO CURITIBA (MAPA) (PP-06) */}
        {activeTab === 'Conhecendo' && <PortalMap />}

        {/* TAB: CARRINHO (PP-08, PP-09, PP-10, PP-11) */}
        {activeTab === 'Carrinho' && (
          <PortalCart
            cart={cart}
            onUpdateCart={handleUpdateCart}
            user={user}
          />
        )}

        {/* TAB: ÁREA DO TURISTA (PP-12, PP-13, PP-14, PP-15, PP-16, PP-19, PP-20) */}
        {activeTab === 'Area do Turista' && (
          <PortalTuristaArea
            user={user}
            onUpdateUser={handleUpdateUser}
            onRemoveFavorite={(id) => setFavorites(prev => prev.filter(f => f.id !== id))}
          />
        )}

        {/* TAB: SEJA PARCEIRO / AGÊNCIA (PP-18, PP-21) */}
        {activeTab === 'Seja Parceiro' && (
          <PortalPartnerRegistration
            isAgency={registrationType === 'agency'}
          />
        )}

        {/* TAB: INSTITUCIONAL / FAQ (PP-17) */}
        {activeTab === 'Institucional' && <PortalInstitucional />}

      </div>

      {/* 3. ATTRACTION DETAIL MODAL (PP-07) */}
      {selectedAttractionDetail && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center',
          alignItems: 'center', zIndex: 10000, padding: '1rem', boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '24px',
            maxWidth: '650px', width: '100%', maxHeight: '90%', overflowY: 'auto',
            padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
            textAlign: 'left', color: '#f8fafc', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#10b98122', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {selectedAttractionDetail.category}
              </span>
              <button 
                onClick={() => setSelectedAttractionDetail(null)}
                style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#94a3b8', lineHeight: 0 }}
              >
                &times;
              </button>
            </div>

            {/* Title & Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                {selectedAttractionDetail.name}
              </h3>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981' }}>
                {selectedAttractionDetail.price > 0 ? `R$ ${selectedAttractionDetail.price.toFixed(2)}` : 'Gratuito'}
              </span>
            </div>

            {/* Image Gallery */}
            <div style={{ height: '220px', borderRadius: '12px', overflow: 'hidden' }}>
              <img src={selectedAttractionDetail.img} alt={selectedAttractionDetail.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.925rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
              {selectedAttractionDetail.desc}
            </p>

            {/* Buying / Booking Panel */}
            <div style={{
              backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px',
              padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem'
            }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>Painel de Compra 🎟️</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1.2, minWidth: '150px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Data do Passeio</label>
                  <input
                    type="date"
                    value={detailDate}
                    onChange={(e) => setDetailDate(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#1e293b', border: '1px solid #334155', color: 'white', padding: '0.5rem', borderRadius: '8px', outline: 'none' }}
                  />
                </div>

                <div style={{ flex: 0.8, minWidth: '100px' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.25rem' }}>Quantidade</label>
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', padding: '0.25rem 0.5rem' }}>
                    <button onClick={() => setDetailQty(prev => prev > 1 ? prev - 1 : 1)} style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                    <span style={{ flex: 1, textAlign: 'center', fontSize: '0.875rem' }}>{detailQty}</span>
                    <button onClick={() => setDetailQty(prev => prev + 1)} style={{ border: 'none', background: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                style={{ width: '100%', padding: '0.75rem', backgroundColor: '#10b981', border: 'none', color: 'white', fontWeight: 'bold' }}
              >
                Adicionar ao Carrinho (Total: R$ {(selectedAttractionDetail.price * detailQty).toFixed(2)})
              </Button>
            </div>

            {/* Reviews Section */}
            <div style={{ borderTop: '1px solid #334155', paddingTop: '1.25rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>Avaliações dos Visitantes</h4>
              {selectedAttractionDetail.reviews && selectedAttractionDetail.reviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedAttractionDetail.reviews.map((rev, idx) => (
                    <div key={idx} style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        <strong style={{ color: '#cbd5e1' }}>{rev.user}</strong>
                        <span style={{ color: '#f59e0b' }}>{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.825rem', color: '#64748b', margin: 0 }}>Nenhuma avaliação cadastrada para este item.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. COOKIES CONSENT BANNER (PP-03) */}
      {!cookiesAceitos && (
        <div style={{
          position: 'fixed', bottom: '2rem', left: '2rem', right: '2rem', maxWidth: '600px',
          backgroundColor: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(16px)',
          border: '1px solid #334155', borderRadius: '16px', padding: '1.25rem 1.5rem',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', zIndex: 99999,
          display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', margin: '0 auto'
        }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>🍪 Controle de Privacidade</h4>
            <p style={{ fontSize: '0.825rem', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
              Utilizamos cookies próprios e de terceiros para analisar a navegação, personalizar conteúdos e anúncios, e oferecer recursos de redes sociais. Ao continuar, você aceita nossa política de cookies.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button 
              onClick={() => {
                alert('Preferências salvas!');
                setCookiesAceitos(true);
                localStorage.setItem('@Curitiba360Public:cookies', 'accepted');
              }}
              style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #475569', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
            >
              Configurar Cookies
            </button>
            <button 
              onClick={() => {
                setCookiesAceitos(true);
                localStorage.setItem('@Curitiba360Public:cookies', 'accepted');
              }}
              style={{ padding: '0.5rem 1.5rem', backgroundColor: '#10b981', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
