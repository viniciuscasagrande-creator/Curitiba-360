import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import AttractionSlider from './components/AttractionSlider';
import Top20LandmarksGrid from './components/Top20LandmarksGrid';
import OfficialBrandSection from './components/OfficialBrandSection';
import ImperdiveisSection from './components/ImperdiveisSection';
import NearbySection from './components/NearbySection';
import TopicBanner from './components/TopicBanner';
import RoteirosSection from './components/RoteirosSection';
import GuiaPraticoSection from './components/GuiaPraticoSection';
import AgenciasSection from './components/AgenciasSection';
import HoteisSection from './components/HoteisSection';
import AgenciaCotacaoModal from './components/AgenciaCotacaoModal';
import AttractionDetailModal from './components/AttractionDetailModal';
import CartModal from './components/CartModal';
import LoginModal from './components/LoginModal';
import BrandAboutModal from './components/BrandAboutModal';
import AIAssistantWidget from './components/AIAssistantWidget';
import Footer from './components/Footer';
import CuritibaLivePulseBanner from './components/CuritibaLivePulseBanner';
import { ATTRACTIONS, UNIFIED_NAV_ITEMS } from './data/attractions';
import { LanguageProvider } from './context/LanguageContext';
import { platformSyncService, B2B_PARTNERS_CATALOG } from '../../services/platformSyncService';
import { freeApisService } from '../../services/freeApisService';

function SitePublicoContent() {
  const navigate = useNavigate();
  const [activeTopicTab, setActiveTopicTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAttraction, setActiveAttraction] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAboutBrandOpen, setIsAboutBrandOpen] = useState(false);
  const [isAgencyQuoteOpen, setIsAgencyQuoteOpen] = useState(false);
  const [agencyQuoteDefaultType, setAgencyQuoteDefaultType] = useState('passeio');

  // Real-time synced state with Backoffice & B2B QR Referral & Free Public APIs
  const [customAttractions, setCustomAttractions] = useState(() => platformSyncService.getCustomAttractions());
  const [activeRef, setActiveRef] = useState(() => platformSyncService.captureReferralFromUrl());
  const [liveData, setLiveData] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');

  const refreshLiveApis = async (force = false) => {
    const data = await freeApisService.fetchCuritibaLivePulse(force);
    setLiveData(data);
  };

  useEffect(() => {
    refreshLiveApis(false);
    setActiveRef(platformSyncService.captureReferralFromUrl());
    return platformSyncService.subscribe(() => {
      setCustomAttractions(platformSyncService.getCustomAttractions());
      setActiveRef(platformSyncService.getActiveReferral());
    });
  }, []);

  const allAttractions = useMemo(() => {
    return [...customAttractions, ...ATTRACTIONS];
  }, [customAttractions]);

  const handleSelectTopicTab = (tabId) => {
    setActiveTopicTab(tabId);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveTopicTab('all');
    }
  };

  const handleFilterLandmark = (landmarkName) => {
    setActiveTopicTab('all');
    setSearchQuery(landmarkName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAgencyQuote = (type = 'passeio') => {
    setAgencyQuoteDefaultType(type);
    setIsAgencyQuoteOpen(true);
  };

  const filteredAttractions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const searchWords = q.split(/\s+/).filter(Boolean);

    return allAttractions.filter((item) => {
      if (q) {
        const fullContent = [
          item.title,
          item.subtitle || '',
          item.location,
          item.description,
          item.category,
          item.topic || '',
          ...(item.categories || []),
          ...(item.features || []),
          ...(item.tags || [])
        ].join(' ').toLowerCase();

        return fullContent.includes(q) || searchWords.every(word => fullContent.includes(word));
      }

      if (activeTopicTab !== 'all' && activeTopicTab !== 'roteiros' && activeTopicTab !== 'guia' && activeTopicTab !== 'agencias' && activeTopicTab !== 'hoteis') {
        if (activeTopicTab === 'ofertas') {
          if (!item.discount && !item.categories?.includes('promocionais') && !item.categories?.includes('cupons')) {
            return false;
          }
        } else {
          const matchesTopic = item.topic === activeTopicTab || item.category === activeTopicTab || item.categories?.includes(activeTopicTab);
          if (!matchesTopic) return false;
        }
      }

      return true;
    });
  }, [activeTopicTab, searchQuery, allAttractions]);

  const imperdiveisAttractions = useMemo(() => {
    return allAttractions.filter(a => a.discount || a.category === 'pacotes' || a.category === 'agencias' || a.category === 'shows' || a.category === 'bares' || a.category === 'hoteis').slice(0, 4);
  }, [allAttractions]);

  const handleAddToCart = (newItem) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        i => i.id === newItem.id && i.ticketType === newItem.ticketType
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleAddItineraryToCart = (items) => {
    items.forEach((rec) => {
      handleAddToCart({
        id: rec.id,
        title: rec.title,
        price: rec.price || 50.00,
        image: rec.image,
        ticketType: 'Inteira (Roteiro IA)',
        quantity: 1
      });
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClearFilters = () => {
    setActiveTopicTab('all');
    setSearchQuery('');
  };

  const activeTabMeta = UNIFIED_NAV_ITEMS.find(i => i.id === activeTopicTab);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Barra Superior de Integração B2B QR Code & Atalho Backoffice */}
      <div style={{ backgroundColor: '#022c22', color: '#ecfdf5', padding: '8px 20px', fontSize: '12px', borderBottom: '1px solid #065f46' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '800', color: '#34d399' }}>🏨 Simulador QR Code Hotel / Agência B2B:</span>
            <select
              value={activeRef?.code || ''}
              onChange={(e) => setActiveRef(platformSyncService.setActiveReferral(e.target.value))}
              style={{ backgroundColor: '#064e3b', color: '#ffffff', border: '1px solid #10b981', borderRadius: '6px', padding: '3px 8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
            >
              <option value="">Venda Direta (Sem QR Code de Parceiro)</option>
              {B2B_PARTNERS_CATALOG.map(p => (
                <option key={p.id} value={p.code}>
                  {p.name} ({p.discountPct}% OFF Turista / {p.commissionPct}% Comissão B2B)
                </option>
              ))}
            </select>
            {activeRef && (
              <span style={{ backgroundColor: '#10b981', color: '#022c22', fontWeight: '900', padding: '2px 8px', borderRadius: '999px', fontSize: '11px' }}>
                ✓ {activeRef.discountPct}% OFF Ativo no Checkout
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ backgroundColor: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
            >
              🖥️ Voltar ao Backoffice (/dashboard)
            </button>
            <button
              onClick={() => navigate('/validacao')}
              style={{ backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
            >
              📷 Validador QR (/validacao)
            </button>
          </div>
        </div>
      </div>

      <Header
        activeTopicTab={activeTopicTab}
        onSelectTopicTab={handleSelectTopicTab}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAgencyQuote={handleOpenAgencyQuote}
        onClearFilters={handleClearFilters}
        totalResults={filteredAttractions.length}
      />

      {/* Painel Ao Vivo Conectado a APIs Gratuitas (Open-Meteo, Qualidade do Ar, AwesomeAPI Câmbio, BrasilAPI e Wikipedia) */}
      <CuritibaLivePulseBanner
        liveData={liveData}
        onRefresh={() => refreshLiveApis(true)}
        onFilterClimate={(topic) => handleSelectTopicTab(topic)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
      />

      <main style={{ flex: 1 }}>
        {(activeTopicTab === 'parques' || activeTopicTab === 'cultura' || activeTopicTab === 'shows' || activeTopicTab === 'teatros' || activeTopicTab === 'eventos' || activeTopicTab === 'bares' || activeTopicTab === 'tours' || activeTopicTab === 'gastronomia') && !searchQuery && (
          <TopicBanner topicId={activeTopicTab} />
        )}

        {activeTopicTab === 'all' && !searchQuery && (
          <HeroCarousel onSelectAttraction={setActiveAttraction} />
        )}

        {activeTopicTab === 'agencias' && !searchQuery ? (
          <AgenciasSection
            attractions={allAttractions}
            onClickDetail={setActiveAttraction}
            onOpenQuote={handleOpenAgencyQuote}
          />
        ) : activeTopicTab === 'hoteis' && !searchQuery ? (
          <HoteisSection
            attractions={allAttractions}
            onClickDetail={setActiveAttraction}
          />
        ) : activeTopicTab === 'roteiros' && !searchQuery ? (
          <RoteirosSection onClickDetail={setActiveAttraction} />
        ) : activeTopicTab === 'guia' && !searchQuery ? (
          <GuiaPraticoSection />
        ) : (
          <>
            <AttractionSlider
              title={
                searchQuery
                  ? `Resultados para "${searchQuery}" (${filteredAttractions.length})`
                  : activeTopicTab === 'parques'
                  ? "Parques, Bosques & Natureza em Curitiba"
                  : activeTopicTab === 'cultura'
                  ? "Museus, Teatros & Patrimônio Histórico"
                  : activeTopicTab === 'shows'
                  ? "Shows & Concertos ao Vivo em Curitiba"
                  : activeTopicTab === 'teatros'
                  ? "Teatros & Espetáculos das Artes Cênicas"
                  : activeTopicTab === 'eventos'
                  ? "Festivais, Feiras & Eventos Especiais"
                  : activeTopicTab === 'bares'
                  ? "Bares, Choperias & Pubs em Curitiba e Região Metropolitana"
                  : activeTopicTab === 'tours'
                  ? "Tours, Passeios de Trem & Linha Turismo"
                  : activeTopicTab === 'gastronomia'
                  ? "Restaurantes, Polos Gastronômicos & Mercados"
                  : activeTopicTab === 'ofertas'
                  ? "Ofertas, Promoções & Cupons de Desconto"
                  : "O Que Fazer em Curitiba • Atrações em Destaque 360°"
              }
              subtitle={
                searchQuery
                  ? `Exibindo todas as atrações, shows, passeios e experiências relacionadas a "${searchQuery}".`
                  : activeTabMeta?.desc || "Explore as melhores atrações da capital paranaense."
              }
              attractions={filteredAttractions}
              onClickDetail={setActiveAttraction}
              liveCurrencies={liveData?.currencies}
              selectedCurrency={selectedCurrency}
            />

            {activeTopicTab === 'all' && !searchQuery && (
              <Top20LandmarksGrid onClickDetail={setActiveAttraction} />
            )}

            {activeTopicTab === 'all' && !searchQuery && (
              <OfficialBrandSection
                onOpenMap={() => {
                  const nearbyEl = document.getElementById('nearby-section');
                  if (nearbyEl) nearbyEl.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenAboutBrand={() => setIsAboutBrandOpen(true)}
                onFilterLandmark={handleFilterLandmark}
              />
            )}

            {activeTopicTab === 'all' && !searchQuery && (
              <ImperdiveisSection
                attractions={imperdiveisAttractions}
                onClickDetail={setActiveAttraction}
              />
            )}

            <div id="nearby-section">
              <NearbySection
                attractions={allAttractions}
                onClickDetail={setActiveAttraction}
              />
            </div>
          </>
        )}
      </main>

      <AIAssistantWidget
        onSelectAttraction={setActiveAttraction}
        onAddItineraryToCart={handleAddItineraryToCart}
        liveData={liveData}
      />

      <Footer onOpenAboutBrand={() => setIsAboutBrandOpen(true)} />

      {activeAttraction && (
        <AttractionDetailModal
          attraction={activeAttraction}
          allAttractions={allAttractions}
          onClose={() => setActiveAttraction(null)}
          onAddToCart={handleAddToCart}
          liveData={liveData}
        />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <BrandAboutModal
        isOpen={isAboutBrandOpen}
        onClose={() => setIsAboutBrandOpen(false)}
      />

      <AgenciaCotacaoModal
        isOpen={isAgencyQuoteOpen}
        onClose={() => setIsAgencyQuoteOpen(false)}
        defaultType={agencyQuoteDefaultType}
      />
    </div>
  );
}

export default function SitePublicoApp() {
  return (
    <LanguageProvider>
      <SitePublicoContent />
    </LanguageProvider>
  );
}
