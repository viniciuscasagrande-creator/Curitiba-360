import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, ChevronRight, RefreshCw, Compass, MapPin, Star, ShoppingBag, Utensils, Music, Trees, Hotel, Ticket } from 'lucide-react';
import { ATTRACTIONS } from '../data/attractions';
import { useLanguage } from '../context/LanguageContext';

const QUICK_SUGGESTIONS = [
  "🛍️ Quais os melhores Shoppings de Curitiba?",
  "🌲 Quais os parques imperdíveis?",
  "🍺 Bares para tomar Chopp Submarino e Carne de Onça?",
  "🍝 Onde comer o tradicional rodízio em Santa Felicidade?",
  "🏨 Recomende hotéis 5 estrelas no Batel",
  "🚂 Como funciona o passeio de trem para Morretes?",
  "🎭 Programação de shows, festivais e teatros",
  "🚌 Como andar na Linha Turismo e nos Tubos BRT?"
];

export default function AIAssistantWidget({ onSelectAttraction }) {
  const { t, currentLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  // Set initial welcome message based on language
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: t('aiGreeting'),
        recommendations: []
      }
    ]);
  }, [currentLang]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Comprehensive AI Guide Response Engine
  const generateAIResponse = (userText) => {
    const textLower = userText.toLowerCase().trim();
    let replyText = "";
    let recommendations = [];

    // SHOPPING & COMPRAS
    if (textLower.includes('shopping') || textLower.includes('compra') || textLower.includes('loja') || textLower.includes('mueller') || textLower.includes('patio batel') || textLower.includes('estacao') || textLower.includes('souvenir')) {
      replyText = currentLang === 'en'
        ? "Curitiba has amazing malls and traditional crafts fairs! 🛍️✨\n\n1. **Pátio Batel**: The most luxurious mall in South Brazil with VIP cinemas & fine dining.\n2. **Shopping Mueller**: The first shopping mall in Curitiba.\n3. **Shopping Estação**: Integrated with the historical railway station and Railway Museum.\n4. **Largo da Ordem Sunday Fair**: Over 1,000 artisans in the Historical Center every Sunday."
        : currentLang === 'es'
        ? "¡Curitiba tiene centros comerciales increíbles y ferias artesanales! 🛍️✨\n\n1. **Pátio Batel**: El centro comercial más lujoso con cines VIP y gastronomía fina.\n2. **Shopping Mueller**: El primer centro comercial de Curitiba.\n3. **Shopping Estação**: Integrado a la estación de tren histórica.\n4. **Feria del Largo da Ordem**: Todos los domingos en el Centro Histórico."
        : "Curitiba possui shoppings incríveis e feiras tradicionais de compras! 🛍️✨\n\n1. **Pátio Batel**: O shopping mais luxuoso do Sul, com grifes internacionais, salas de cinema VIP e polo gastronômico.\n2. **Shopping Mueller**: O primeiro shopping de Curitiba (fundado em 1983 no Centro Cívico).\n3. **Shopping Estação**: Integrado à antiga Estação Ferroviária com o Museu Ferroviário e Teatro Regina Vogue.\n4. **Feira do Largo da Ordem**: Todos os domingos com mais de 1.000 artesãos no Centro Histórico.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'cultura' || a.category === 'gastronomia').slice(0, 3);
    }
    // PARQUES & NATUREZA
    else if (textLower.includes('parque') || textLower.includes('botanico') || textLower.includes('barigui') || textLower.includes('tangua') || textLower.includes('capivara') || textLower.includes('natureza') || textLower.includes('bosque') || textLower.includes('park')) {
      replyText = currentLang === 'en'
        ? "Curitiba is the Ecological Capital of Brazil with 50m² of green space per habitant! 🌿 Capybaras await you:\n\n1. **Botanical Garden**: Iconic glass greenhouse inspired by London Crystal Palace (100% Free).\n2. **Barigui Park**: Largest park in the city and home of capybaras.\n3. **Tanguá Park**: Spectacular sunset viewpoint with a 65m waterfall."
        : currentLang === 'es'
        ? "¡Curitiba es la Capital Ecológica de Brasil con 50m² de área verde por habitante! 🌿 Carpinchos te esperan:\n\n1. **Jardín Botánico**: Estufa de vidrio icónica inspirada en el Palacio de Cristal de Londres (100% Gratis).\n2. **Parque Barigui**: El parque más grande de la ciudad y hogar de carpinchos.\n3. **Parque Tanguá**: Mirador espectacular al atardecer con cascada de 65m."
        : "Curitiba é a Capital Ecológica com mais de 50m² de área verde por habitante! 🌿 Capivaras e araucárias te esperam:\n\n1. **Jardim Botânico**: A estufa de vidro icônica inspirada no Palácio de Cristal de Londres (Entrada 100% Grátis).\n2. **Parque Barigui**: O maior parque da cidade e lar oficial do bando de capivaras mascotes.\n3. **Parque Tanguá**: Mirante em formato de castelo com o pôr do sol mais espetacular de Curitiba e cascata de 65m.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'parques' || a.id === 'jardim-botanico' || a.id === 'parque-tangua' || a.id === 'parque-barigui').slice(0, 3);
    } 
    // BARES, CHOPP & BOTEQUINS
    else if (textLower.includes('bar') || textLower.includes('chopp') || textLower.includes('cerveja') || textLower.includes('onca') || textLower.includes('alemao') || textLower.includes('porks') || textLower.includes('pub') || textLower.includes('beer')) {
      replyText = "A vida noturna e os botequins curitibanos são famosos mundialmente! 🍺🥩\n\n1. **Bar do Alemão**: O lendário Chopp Submarino no Largo da Ordem (você ganha o canequinho souvenir) com a autêntica Carne de Onça.\n2. **Porks - Porco & Chope**: Torresmo de rolo estalando de crocante e chopp artesanal paranaense a R$ 12.\n3. **We Are Bastards Pub**: 30 torneiras de chopp artesanal, fliperama retrô e rock no Água Verde.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'bares' || a.topic === 'bares').slice(0, 3);
    }
    // RESTAURANTES & GASTRONOMIA
    else if (textLower.includes('restaurante') || textLower.includes('comida') || textLower.includes('comer') || textLower.includes('gastronomia') || textLower.includes('madalosso') || textLower.includes('barreado') || textLower.includes('food')) {
      replyText = "Prepare o paladar para um banquete gastronômico inesquecível! 🍝😋\n\n1. **Família Madalosso (Santa Felicidade)**: O maior restaurante das Américas com o autêntico rodízio italiano.\n2. **Terrazza 40**: O primeiro restaurante panorâmico 360° no topo do edifício no Bigorrilho.\n3. **Mercado Municipal de Curitiba**: Famoso pelo Pastel de Bacalhau gigante.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'gastronomia' || a.id === 'restaurante-madalosso' || a.id === 'restaurante-terrazza40').slice(0, 3);
    }
    // HOTÉIS & HOSPEDAGEM
    else if (textLower.includes('hotel') || textLower.includes('pousada') || textLower.includes('hospedagem') || textLower.includes('batel') || textLower.includes('stay')) {
      replyText = "Encontre a hospedagem perfeita em Curitiba e Região Metropolitana! 🏨✨\n\n1. **Radisson Hotel Curitiba 5★**: Luxo na Praça da Espanha (Batel) com SPA e piscina aquecida.\n2. **Nomaa Hotel Boutique 5★**: Design moderno autoral com brunch premiado.\n3. **Pousada Ilha do Mel (Encantadas)**: Pousada de charme pé na areia com café caiçara.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'hoteis' || a.topic === 'hoteis').slice(0, 3);
    }
    // SHOWS, TEATROS & RUA DA MÚSICA
    else if (textLower.includes('show') || textLower.includes('teatro') || textLower.includes('musica') || textLower.includes('pedreira') || textLower.includes('guaira') || textLower.includes('evento') || textLower.includes('rua da musica') || textLower.includes('vale da musica')) {
      replyText = "Curitiba respira cultura, música ao vivo e grandes espetáculos! 🎭🎵\n\n1. **Rua da Música & Vale da Música**: O inconfundível palco flutuante no lago da Ópera de Arame com apresentações diárias a céu aberto (Jazz, MPB e Bossa Nova).\n2. **Pedreira Paulo Leminski**: O maior palco ao ar livre da América Latina para turnês internacionais.\n3. **Teatro Guaíra (Guairão)**: Sede da Orquestra Sinfônica do Paraná com 2.173 lugares.";
      recommendations = ATTRACTIONS.filter(a => a.id === 'rua-da-musica' || a.category === 'shows' || a.category === 'teatros').slice(0, 3);
    }
    // TOURS, TREM MORRETES & RMC
    else if (textLower.includes('trem') || textLower.includes('serra') || textLower.includes('morretes') || textLower.includes('linha turismo') || textLower.includes('passeio') || textLower.includes('train')) {
      replyText = "Aventuras inesquecíveis na capital e na Região Metropolitana! 🚂🏖️\n\n1. **Trem Serra Verde Express**: Eleito um dos passeios de trem mais bonitos do mundo pela Serra do Mar até Morretes.\n2. **Linha Turismo Double-Decker**: Ônibus panorâmico de 2 andares que percorre 26 atrações com 5 reembarques.\n3. **Tour Caminho do Vinho (SJP)**: Visita guiada a adegas italianas com degustação livre.";
      recommendations = ATTRACTIONS.filter(a => a.category === 'tours' || a.category === 'agencias' || a.id === 'trem-serra-verde').slice(0, 3);
    }
    else {
      replyText = `Com certeza! Posso te orientar em detalhe sobre "${userText}"! 🌲✨ O portal **Curitiba 360°** é o seu guia definitivo para a Capital Ecológica. Você prefere dicas de gastronomia, parques, vida noturna, hotéis ou passeios pela região?`;
      recommendations = ATTRACTIONS.slice(0, 3);
    }

    return { replyText, recommendations };
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      recommendations: []
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking & response
    setTimeout(() => {
      const { replyText, recommendations } = generateAIResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        recommendations
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2500 }}>
      
      {/* Floating AI Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: '60px',
          padding: '0 20px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, #00a896 0%, #2563eb 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 24px rgba(0, 168, 150, 0.45)',
          border: '2px solid rgba(255,255,255,0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          outline: 'none'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        title={t('aiName')}
      >
        <div style={{ position: 'relative' }}>
          <Bot size={26} color="#ffffff" />
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '10px', height: '10px', backgroundColor: '#22c55e', borderRadius: '50%', border: '2px solid #ffffff' }} />
        </div>
        <span style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>
          {isOpen ? 'Close' : 'IA Curitiba 360'}
        </span>
        <Sparkles size={18} color="#f59e0b" />
      </button>

      {/* Popover AI Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '76px',
          right: 0,
          width: '390px',
          maxWidth: 'calc(100vw - 32px)',
          height: '560px',
          maxHeight: 'calc(100vh - 120px)',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 45px rgba(15,23,42,0.25)',
          overflow: 'hidden',
          border: '1px solid #cbd5e1',
          display: 'flex',
          flexDirection: 'column'
        }} className="animate-fade-in">
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
            color: '#ffffff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00a896 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,168,150,0.4)'
              }}>
                <Bot size={22} color="#ffffff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#ffffff' }}>{t('aiName')}</h4>
                  <span style={{ backgroundColor: '#22c55e', color: '#ffffff', fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>{t('aiBadge')}</span>
                </div>
                <p style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '1px' }}>
                  {t('aiSubtitle')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', color: '#ffffff', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            backgroundColor: '#f8fafc',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }} className="hide-scrollbar">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '100%'
                }}
              >
                {/* Message Bubble */}
                <div
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#2563eb' : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    maxWidth: '90%',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                </div>

                {/* AI Attraction Recommendations inside chat */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '92%' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {t('aiRecommended')}
                    </span>
                    {msg.recommendations.map(rec => (
                      <div
                        key={rec.id}
                        onClick={() => {
                          if (onSelectAttraction) onSelectAttraction(rec);
                        }}
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          border: '1px solid #cbd5e1',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = '#00a896'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
                      >
                        <img src={rec.image} alt={rec.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {rec.title}
                          </h5>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            <span style={{ color: '#2563eb', fontWeight: '700' }}>
                              {rec.isFree ? t('free') : `R$ ${rec.price.toFixed(2).replace('.', ',')}`}
                            </span>
                            <span>•</span>
                            <span>★ {rec.rating}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} color="#00a896" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ffffff', padding: '10px 16px', borderRadius: '16px', border: '1px solid #e2e8f0', width: 'fit-content' }}>
                <RefreshCw size={14} color="#00a896" className="animate-spin" />
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{t('aiThinking')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div style={{ padding: '8px 12px', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', overflowX: 'auto', display: 'flex', gap: '6px' }} className="hide-scrollbar">
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#2563eb',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Footer Input Bar */}
          <div style={{ padding: '12px', backgroundColor: '#ffffff', borderTop: '1px solid #cbd5e1', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder={t('aiPlaceholder')}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              style={{
                flex: 1,
                height: '42px',
                padding: '0 16px',
                borderRadius: '9999px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00a896 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(0,168,150,0.3)',
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
