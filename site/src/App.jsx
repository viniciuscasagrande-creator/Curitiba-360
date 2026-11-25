import React, { useState, useMemo } from 'react';
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
import { ATTRACTIONS, UNIFIED_NAV_ITEMS } from './data/attractions';

export default function App() {
  const [activeTopicTab, setActiveTopicTab] = useState('all'); // all, parques, cultura, shows, teatros, eventos, bares, hoteis, tours, gastronomia, agencias, ofertas, roteiros, guia
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAttraction, setActiveAttraction] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAboutBrandOpen, setIsAboutBrandOpen] = useState(false);
  
  // Agency Quote Modal State
  const [isAgencyQuoteOpen, setIsAgencyQuoteOpen] = useState(false);
  const [agencyQuoteDefaultType, setAgencyQuoteDefaultType] = useState('passeio');

  // Handle Topic / Navigation Tab selection
  const handleSelectTopicTab = (tabId) => {
    setActiveTopicTab(tabId);
    setSearchQuery(''); // clear search query when switching tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveTopicTab('all'); // switch to 'all' so search is global across all categories
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

  // Filtered Attractions with Broad Fuzzy/Multi-Word Search Matching
  const filteredAttractions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const searchWords = q.split(/\s+/).filter(Boolean);

    return ATTRACTIONS.filter((item) => {
      // If user typed a search query, search globally across all fields
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

        // Match if exact substring exists OR if all search words match in the content
        const matchesSearch = fullContent.includes(q) || searchWords.every(word => fullContent.includes(word));
        return matchesSearch;
      }

      // Navigation tab filter (when no search query is typed)
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
  }, [activeTopicTab, searchQuery]);

  // Featured sections
  const imperdiveisAttractions = useMemo(() => {
    return ATTRACTIONS.filter(a => a.discount || a.category === 'pacotes' || a.category === 'agencias' || a.category === 'shows' || a.category === 'bares' || a.category === 'hoteis').slice(0, 4);
  }, []);

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
      
      {/* Header with Single Unified Navigation Bar */}
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

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        
        {/* Topic Context Banner for specific topic views */}
        {(activeTopicTab === 'parques' || activeTopicTab === 'cultura' || activeTopicTab === 'shows' || activeTopicTab === 'teatros' || activeTopicTab === 'eventos' || activeTopicTab === 'bares' || activeTopicTab === 'tours' || activeTopicTab === 'gastronomia') && !searchQuery && (
          <TopicBanner topicId={activeTopicTab} />
        )}

        {/* Hero Carousel (Shown on 'all' view when no search query) */}
        {activeTopicTab === 'all' && !searchQuery && (
          <HeroCarousel onSelectAttraction={setActiveAttraction} />
        )}

        {/* Dedicated Screen: Agências de Turismo & Região Metropolitana */}
        {activeTopicTab === 'agencias' && !searchQuery ? (
          <AgenciasSection
            attractions={ATTRACTIONS}
            onClickDetail={setActiveAttraction}
            onOpenQuote={handleOpenAgencyQuote}
          />
        ) : activeTopicTab === 'hoteis' && !searchQuery ? (
          /* Dedicated Screen: Hotelaria & Pousadas */
          <HoteisSection
            attractions={ATTRACTIONS}
            onClickDetail={setActiveAttraction}
          />
        ) : activeTopicTab === 'roteiros' && !searchQuery ? (
          /* Dedicated Screen: Roteiros Prontos */
          <RoteirosSection onClickDetail={setActiveAttraction} />
        ) : activeTopicTab === 'guia' && !searchQuery ? (
          /* Dedicated Screen: Guia Prático CWB */
          <GuiaPraticoSection />
        ) : (
          /* Standard Attraction Grid/Slider View */
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
            />

            {/* TOP 20 PRINCIPAIS PONTOS TURÍSTICOS GRID (Only on 'all' home view when no search query) */}
            {activeTopicTab === 'all' && !searchQuery && (
              <Top20LandmarksGrid onClickDetail={setActiveAttraction} />
            )}

            {/* Official Brand Section (Only on 'all' home view when no search query) */}
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

            {/* Imperdíveis Section (Only on 'all' home view when no search query) */}
            {activeTopicTab === 'all' && !searchQuery && (
              <ImperdiveisSection
                attractions={imperdiveisAttractions}
                onClickDetail={setActiveAttraction}
              />
            )}

            {/* Nearby / Geolocation Section */}
            <div id="nearby-section">
              <NearbySection
                attractions={ATTRACTIONS}
                onClickDetail={setActiveAttraction}
              />
            </div>
          </>
        )}

      </main>

      {/* Floating CWB360 AI Assistant Button */}
      <AIAssistantWidget onSelectAttraction={setActiveAttraction} />

      {/* Footer */}
      <Footer onOpenAboutBrand={() => setIsAboutBrandOpen(true)} />

      {/* Modals */}
      {activeAttraction && (
        <AttractionDetailModal
          attraction={activeAttraction}
          allAttractions={ATTRACTIONS}
          onClose={() => setActiveAttraction(null)}
          onAddToCart={handleAddToCart}
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
