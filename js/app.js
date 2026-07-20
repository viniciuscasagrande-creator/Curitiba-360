// Curitiba360 - Main Application Controller

const translations = {
    pt: {
        navHome: "Início",
        navMap: "Mapa Interativo",
        navPackages: "Pacotes",
        navDashboard: "Painel do Parceiro",
        
        heroSubtitle: "Viva Curitiba com todos os sentidos.",
        heroTitleLine1: "Sinta a Cultura,",
        heroTitleLine2: "Viva a Experiência.",
        heroDesc: "O Curitiba360 conecta hotéis, restaurantes, pontos turísticos e eventos em uma plataforma digital integrada. Escaneie, explore e viva a cidade com descontos exclusivos.",
        heroBtnExplore: "Ver Mapa da Cidade",
        heroBtnPromo: "Ver Ofertas Especiais",
        
        simTitle: "Simulador de QR Code",
        simDesc: "Simule a experiência do turista escaneando o QR Code físico no balcão do hotel.",
        simLabelSelect: "Escolha o Hotel de Simulação",
        simBtnScan: "Escanear QR Code do Hotel",
        simScanSuccess: "QR Code Escaneado! Bem-vindo ao 360° através do seu hotel.",
        
        badgeMap: "Mapa 360°",
        titleMap: "Ligue os Pontos da Cidade",
        descMap: "Explore os marcos icônicos no mapa. Clique nos pontos brilhantes para ver detalhes, fotos históricas, horários de funcionamento e integrar sua visita aos pacotes.",
        mapPlaceholderText: "Selecione um ponto turístico no mapa para ver informações detalhadas sobre a atração.",
        
        badgePackages: "Combos Exclusivos",
        titlePackages: "Roteiros Temáticos com Desconto",
        descPackages: "Pacotes completos integrando gastronomia qualificada, transporte turístico e ingressos culturais sem complexidade operacional.",
        pkgInclusions: "O que está incluso:",
        pkgBtnBook: "Reservar Experiência",
        
        surveyTitle: "Complete seu Cadastro Curitiba360",
        surveySubtitle: "Personalize sua experiência e garanta seu cupom de desconto.",
        surveyName: "Nome Completo",
        surveyEmail: "E-mail de Contato",
        surveyOrigin: "Cidade / Estado de Origem",
        surveyOriginPlh: "Ex: São Paulo - SP",
        surveyLabelDays: "Quantos dias ficará em Curitiba?",
        surveyLabelReason: "Qual o principal motivo da sua viagem?",
        surveyReasonLeisure: "Lazer e Turismo",
        surveyReasonBusiness: "Trabalho e Eventos",
        surveyBtnSubmit: "Gerar Meu Ingresso Digital",
        
        ticketTitle: "Seu Ingresso Digital Curitiba360",
        ticketSubtitle: "Apresente nos estabelecimentos parceiros para resgatar os serviços.",
        ticketCode: "CÓDIGO DO INGRESSO",
        ticketHotel: "HOTEL DE ORIGEM",
        ticketDate: "DATA DE EMISSÃO",
        ticketStatus: "STATUS",
        ticketStatusActive: "ATIVO / NÃO UTILIZADO",
        ticketClose: "Fechar e Salvar",
        
        dashTitle: "Portal de Inteligência de Turismo",
        dashSubtitle: "Análise de perfil do público e dados de conversão em tempo real.",
        dashMenuOverview: "Visão Geral",
        dashMenuHotels: "Heatmap de Hotéis",
        dashMenuDemographics: "Perfil do Turista",
        dashStatVisitors: "Visitantes Únicos",
        dashStatConversion: "Taxa de Conversão",
        dashStatRevenue: "Receita Turística",
        dashTitleHeatmap: "Volume de Scans de QR Code por Hotel",
        dashTitleChannels: "Acessos Estimados por Canal Mensal",
        dashTitleDemographics: "Origem Geográfica dos Turistas",
        
        chatWelcome: "Olá! Seja bem-vindo ao Curitiba360. Como posso ajudar na sua viagem hoje?",
        chatPlaceholder: "Digite sua pergunta...",
        
        toastScanHotel: "Simulação de QR Code ativada! Recomendações personalizadas para o ",
        pkgTagGastronomic: "Gastronomia + Show",
        pkgTitleGastronomic: "Curitiba Gastronômica Noturna",
        pkgDescGastronomic: "Aproveite a melhor culinária do Hard Rock Cafe Curitiba com direito a drink especial, mais ingresso premium para um show musical no Teatro Positivo.",
        pkgInclGastronomic1: "Jantar completo no Hard Rock Cafe",
        pkgInclGastronomic2: "Drink temático ou bebida inclusa",
        pkgInclGastronomic3: "Ingresso de Plateia para Show no Teatro",
        
        pkgTagHistoric: "História + Café",
        pkgTitleHistoric: "Curitiba Histórica Colonial",
        pkgDescHistoric: "Uma imersão completa no berço de Curitiba. Inclui um tour guiado exclusivo a pé pelo Largo da Ordem com historiador local e um café especial na Confeitaria das Flores.",
        pkgInclHistoric1: "Tour guiado a pé de 2 horas",
        pkgInclHistoric2: "Guia historiador bilíngue credenciado",
        pkgInclHistoric3: "Combo de Café Especial + Torta Colonial",
        
        pkgTagGreen: "Parques + Transporte",
        pkgTitleGreen: "Curitiba Verde Jaime Lerner",
        pkgDescGreen: "Explore a revolução ecológica de Curitiba. Inclui passe ilimitado para a Linha Turismo de ônibus e tour guiado pelas inovações urbanísticas do novo Parque Jaime Lerner.",
        pkgInclGreen1: "Passe diário ilimitado para Linha Turismo",
        pkgInclGreen2: "Visita guiada ao Parque Jaime Lerner",
        pkgInclGreen3: "Brinde ecológico exclusivo do memorial"
    },
    en: {
        navHome: "Home",
        navMap: "Interactive Map",
        navPackages: "Packages",
        navDashboard: "Partner Portal",
        
        heroSubtitle: "Experience Curitiba with all your senses.",
        heroTitleLine1: "Feel the Culture,",
        heroTitleLine2: "Live the Experience.",
        heroDesc: "Curitiba360 connects hotels, restaurants, tourist spots, and events into an integrated digital platform. Scan, explore, and experience the city with exclusive discounts.",
        heroBtnExplore: "View City Map",
        heroBtnPromo: "View Special Deals",
        
        simTitle: "QR Code Simulator",
        simDesc: "Simulate the tourist experience by scanning the physical QR Code at the hotel reception.",
        simLabelSelect: "Choose Simulation Hotel",
        simBtnScan: "Scan Hotel QR Code",
        simScanSuccess: "QR Code Scanned! Welcome to 360° through your hotel.",
        
        badgeMap: "360° Map",
        titleMap: "Connect the City Spots",
        descMap: "Explore iconic landmarks on the map. Click on the glowing pins to view historical details, opening hours, and integrate your visit with thematic packages.",
        mapPlaceholderText: "Select a tourist attraction on the map to display detailed information.",
        
        badgePackages: "Exclusive Bundles",
        titlePackages: "Discounted Thematic Packages",
        descPackages: "Complete routes integrating premium gastronomy, tourist transport, and cultural tickets without any operational hassle.",
        pkgInclusions: "What's included:",
        pkgBtnBook: "Book Experience",
        
        surveyTitle: "Complete your Curitiba360 Profile",
        surveySubtitle: "Customize your experience and unlock your discount coupon.",
        surveyName: "Full Name",
        surveyEmail: "Contact Email",
        surveyOrigin: "City / State of Origin",
        surveyOriginPlh: "e.g., Miami - FL",
        surveyLabelDays: "How many days are you staying in Curitiba?",
        surveyLabelReason: "What is the primary reason for your trip?",
        surveyReasonLeisure: "Leisure & Tourism",
        surveyReasonBusiness: "Business & Events",
        surveyBtnSubmit: "Generate My Digital Ticket",
        
        ticketTitle: "Your Curitiba360 Digital Ticket",
        ticketSubtitle: "Present this at partner venues to redeem your booked services.",
        ticketCode: "TICKET CODE",
        ticketHotel: "ORIGIN HOTEL",
        ticketDate: "ISSUE DATE",
        ticketStatus: "STATUS",
        ticketStatusActive: "ACTIVE / UNUSED",
        ticketClose: "Save and Close",
        
        dashTitle: "Tourism Intelligence Portal",
        dashSubtitle: "Audience profile analysis and conversion metrics in real-time.",
        dashMenuOverview: "Overview",
        dashMenuHotels: "Hotel Heatmap",
        dashMenuDemographics: "Tourist Profile",
        dashStatVisitors: "Unique Visitors",
        dashStatConversion: "Conversion Rate",
        dashStatRevenue: "Tourism Revenue",
        dashTitleHeatmap: "QR Code Scan Volume by Hotel",
        dashTitleChannels: "Estimated Monthly Traffic by Channel",
        dashTitleDemographics: "Geographical Origin of Tourists",
        
        chatWelcome: "Hello! Welcome to Curitiba360. How can I help you plan your trip today?",
        chatPlaceholder: "Type your question...",
        
        toastScanHotel: "QR Code simulation active! Personalized recommendations for ",
        pkgTagGastronomic: "Gastronomy + Show",
        pkgTitleGastronomic: "Curitiba Night Gastronomy",
        pkgDescGastronomic: "Enjoy premium dining at the famous Hard Rock Cafe Curitiba including a signature cocktail, plus a tier-1 ticket for a live musical performance at Teatro Positivo.",
        pkgInclGastronomic1: "Full course dinner at Hard Rock Cafe",
        pkgInclGastronomic2: "Signature cocktail or beverage included",
        pkgInclGastronomic3: "Premium main floor theater ticket",
        
        pkgTagHistoric: "History + Coffee",
        pkgTitleHistoric: "Colonial Historic Curitiba",
        pkgDescHistoric: "A deep dive into Curitiba's roots. Includes a private 2-hour walking tour of Largo da Ordem with a local historian and an artisanal coffee combo at Confeitaria das Flores.",
        pkgInclHistoric1: "2-hour private walking tour",
        pkgInclHistoric2: "Certified bilingual historian guide",
        pkgInclHistoric3: "Specialty coffee combo + colonial cake",
        
        pkgTagGreen: "Parks + Transit",
        pkgTitleGreen: "Jaime Lerner Green Curitiba",
        pkgDescGreen: "Explore Curitiba's ecological design. Includes a hop-on hop-off day pass for the double-decker Tourism Line bus and a guided architectural tour of the new Jaime Lerner Park.",
        pkgInclGreen1: "Hop-on hop-off Tourism Bus day pass",
        pkgInclGreen2: "Guided walking tour of Jaime Lerner Park",
        pkgInclGreen3: "Exclusive eco-gift from the memorial"
    }
};

// Application State
const state = {
    language: 'pt',
    theme: 'dark', // 'dark' or 'light'
    activeHotel: null,
    selectedPackage: null,
    currentDashboardTab: 'overview'
};

// Packages Price Data
const packagesData = {
    gastronomic: { key: 'gastronomic', price: 199.00, originalPrice: 240.00 },
    historic: { key: 'historic', price: 99.00, originalPrice: 120.00 },
    green: { key: 'green', price: 75.00, originalPrice: 90.00 }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial setups
    applyLanguage(state.language);
    
    // Scrolled header effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Global Event Listeners
    
    // Language Switcher
    const langBtn = document.getElementById('btn-language');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            state.language = state.language === 'pt' ? 'en' : 'pt';
            langBtn.querySelector('.lang-label').textContent = state.language.toUpperCase();
            applyLanguage(state.language);
            if (window.refreshMapLanguage) {
                window.refreshMapLanguage(state.language);
            }
        });
    }

    // Theme Switcher
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            const htmlEl = document.documentElement;
            const themeIcon = themeBtn.querySelector('.theme-icon');
            
            if (state.theme === 'light') {
                htmlEl.classList.add('light-theme');
                themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`; // Moon icon
            } else {
                htmlEl.classList.remove('light-theme');
                themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828-9.900l-.707-.707m12.728 9.900l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />`; // Sun icon
            }
        });
    }

    // Tab Navigation: Home / Partner Portal
    const links = document.querySelectorAll('[data-target-section]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target-section');
            switchSection(targetId);
            
            // Set active class on navbar links
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // QR Code Scanner Simulation
    const scanBtn = document.getElementById('btn-simulate-scan');
    const hotelSelect = document.getElementById('simulator-hotel');
    if (scanBtn && hotelSelect) {
        scanBtn.addEventListener('click', () => {
            const selectedHotel = hotelSelect.value;
            const hotelText = hotelSelect.options[hotelSelect.selectedIndex].text;
            state.activeHotel = hotelText;
            
            // Trigger visual greeting
            showToast(`${translations[state.language].toastScanHotel}${hotelText}!`);
            
            // Highlight packages or customize landing page text dynamically
            const heroSubtitle = document.querySelector('.hero-content .section-badge');
            if (heroSubtitle) {
                heroSubtitle.textContent = `QR Code Active: ${hotelText}`;
            }
        });
    }

    // Modal Control: Close modal when clicking X or overlay background
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Booking Button Clicks
    const bookButtons = document.querySelectorAll('[data-package]');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const pkgKey = btn.getAttribute('data-package');
            openBookingModal(pkgKey);
        });
    });

    // Survey Options Selection
    const surveyOptions = document.querySelectorAll('.survey-option-btn');
    surveyOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            // Unselect sibling options in same group
            const group = opt.getAttribute('data-survey-group');
            const parent = opt.parentElement;
            parent.querySelectorAll('.survey-option-btn').forEach(btn => btn.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    // Survey Submit Form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processCheckout();
        });
    }

    // Dashboard Menu Tabs
    const dashTabs = document.querySelectorAll('[data-dash-tab]');
    dashTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dashTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const targetTab = tab.getAttribute('data-dash-tab');
            switchDashboardTab(targetTab);
        });
    });

    // Chat Widget Control
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatInput = document.getElementById('chat-input');
    
    if (chatBubble && chatWindow) {
        chatBubble.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });
    }
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', handleChatSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChatSend();
        });
    }

    // Initialize Map on start
    if (window.initMap) {
        window.initMap(state.language);
    }
});

// Switch view sections (Tourist Site vs Partner Dashboard)
function switchSection(sectionId) {
    const touristSecs = ['hero-section', 'section-map', 'section-packages'];
    const dashSec = document.getElementById('section-dashboard');
    
    if (sectionId === 'tourist') {
        touristSecs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'block';
        });
        if (dashSec) dashSec.style.display = 'none';
        
        // Refresh map size triggers if SVG is rendered
    } else if (sectionId === 'dashboard') {
        touristSecs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
        if (dashSec) {
            dashSec.style.display = 'block';
            if (window.initDashboard) {
                window.initDashboard();
                switchDashboardTab(state.currentDashboardTab);
            }
        }
    }
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Switch interior dashboard tabs (Overview vs Heatmap vs Demographics)
function switchDashboardTab(tabId) {
    state.currentDashboardTab = tabId;
    
    const overviewDiv = document.getElementById('dash-view-overview');
    const heatmapDiv = document.getElementById('dash-view-heatmap');
    const profileDiv = document.getElementById('dash-view-profile');
    
    if (!overviewDiv || !heatmapDiv || !profileDiv) return;
    
    overviewDiv.style.display = 'none';
    heatmapDiv.style.display = 'none';
    profileDiv.style.display = 'none';
    
    if (tabId === 'overview') {
        overviewDiv.style.display = 'block';
    } else if (tabId === 'heatmap') {
        heatmapDiv.style.display = 'block';
    } else if (tabId === 'profile') {
        profileDiv.style.display = 'block';
    }
}

// Apply translation keys to all DOM elements with 'data-t' attribute
function applyLanguage(language) {
    const ptActive = language === 'pt';
    
    // 1. Swap flags/labels
    document.querySelector('.lang-label').textContent = language.toUpperCase();
    
    // 2. Map tags
    const trans = translations[language];
    
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (trans[key]) {
            // Check if element has dynamic span structure or is simple text
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = trans[key];
            } else {
                el.textContent = trans[key];
            }
        }
    });
}

// Simple Toast/Notification alert system
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'glass-panel';
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.right = '30px';
    toast.style.padding = '16px 24px';
    toast.style.zIndex = '3000';
    toast.style.borderColor = 'var(--primary)';
    toast.style.borderWidth = '1px';
    toast.style.boxShadow = 'var(--shadow-glow)';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '600';
    toast.style.animation = 'fadeIn 0.3s ease-out';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Booking Modal Controls
function openBookingModal(pkgKey) {
    state.selectedPackage = packagesData[pkgKey];
    const modalOverlay = document.getElementById('modal-overlay');
    const checkoutView = document.getElementById('modal-checkout-view');
    const ticketView = document.getElementById('modal-ticket-view');
    
    if (!modalOverlay || !state.selectedPackage) return;
    
    // Make sure checkout is showing, not ticket
    checkoutView.style.display = 'block';
    ticketView.style.display = 'none';
    
    // Map selected package title in form header
    const pkgTransKey = `pkgTitle${pkgKey.charAt(0).toUpperCase() + pkgKey.slice(1)}`;
    const pkgTitle = translations[state.language][pkgTransKey] || pkgKey;
    document.getElementById('checkout-package-name').textContent = pkgTitle;
    
    // Open Overlay
    modalOverlay.classList.add('active');
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

// Process Checkout & Survey Registration
function processCheckout() {
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value;
    const origin = document.getElementById('checkout-origin').value || "Curitiba - PR";
    
    // Gather survey days selection
    const daysSelected = document.querySelector('[data-survey-group="days"].selected');
    const days = daysSelected ? daysSelected.textContent : "3-5 dias";
    
    // Gather survey reason selection
    const reasonSelected = document.querySelector('[data-survey-group="reason"].selected');
    const reason = reasonSelected ? reasonSelected.getAttribute('data-reason') : "leisure";
    
    const pkg = state.selectedPackage;
    const hotel = state.activeHotel || "Nenhum (Scan Direto)";
    
    const ticketCode = "C360-" + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleDateString(state.language === 'pt' ? 'pt-BR' : 'en-US');
    
    // Save live registration for Dashboard Analytics
    if (window.addLiveRegistration) {
        window.addLiveRegistration({
            name,
            email,
            origin,
            days,
            reason,
            hotel,
            packageKey: pkg.key,
            pricePaid: pkg.price,
            code: ticketCode,
            date: dateStr
        });
    }
    
    // Update digital ticket UI elements
    const pkgTransKey = `pkgTitle${pkg.key.charAt(0).toUpperCase() + pkg.key.slice(1)}`;
    document.getElementById('ticket-package-title').textContent = translations[state.language][pkgTransKey];
    document.getElementById('ticket-val-code').textContent = ticketCode;
    document.getElementById('ticket-val-hotel').textContent = hotel;
    document.getElementById('ticket-val-date').textContent = dateStr;
    document.getElementById('ticket-val-name').textContent = name;
    
    // Generate simulated QR Code SVG inline dynamically
    generateSVGQRCode(ticketCode);
    
    // Transition modal from checkout form to success ticket
    const checkoutView = document.getElementById('modal-checkout-view');
    const ticketView = document.getElementById('modal-ticket-view');
    
    checkoutView.style.display = 'none';
    ticketView.style.display = 'block';
    
    // Show success notification
    showToast(state.language === 'pt' ? 'Ingresso emitido com sucesso!' : 'Ticket issued successfully!');
}

// Helper to generate a stylized placeholder SVG QR Code dynamically
function generateSVGQRCode(code) {
    const container = document.getElementById('ticket-qrcode-container');
    if (!container) return;
    
    // Simple matrix representation mockup of the QR Code
    container.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 29 29" shape-rendering="crispEdges" style="fill: #111827;">
            <!-- Squares simulating QR grid structure -->
            <!-- Position markers -->
            <path d="M0,0 h7 v7 h-7 z M1,1 h5 v5 h-5 z M2,2 h3 v3 h-3 z" />
            <path d="M22,0 h7 v7 h-7 z M23,1 h5 v5 h-5 z M24,2 h3 v3 h-3 z" />
            <path d="M0,22 h7 v7 h-7 z M1,23 h5 v5 h-5 z M2,24 h3 v3 h-3 z" />
            <!-- Inner random patterns simulating QR payload code -->
            <rect x="9" y="1" width="2" height="2" />
            <rect x="13" y="0" width="3" height="1" />
            <rect x="18" y="2" width="2" height="1" />
            <rect x="10" y="5" width="4" height="2" />
            <rect x="16" y="4" width="1" height="3" />
            
            <rect x="2" y="9" width="3" height="2" />
            <rect x="6" y="11" width="1" height="4" />
            <rect x="9" y="10" width="4" height="2" />
            <rect x="15" y="8" width="2" height="5" />
            
            <rect x="20" y="9" width="4" height="1" />
            <rect x="26" y="10" width="2" height="3" />
            <rect x="22" y="12" width="3" height="4" />
            
            <rect x="1" y="16" width="3" height="3" />
            <rect x="11" y="15" width="2" height="2" />
            <rect x="15" y="14" width="4" height="2" />
            
            <rect x="9" y="19" width="5" height="4" />
            <rect x="16" y="20" width="2" height="2" />
            <rect x="20" y="18" width="4" height="5" />
            <rect x="26" y="21" width="3" height="2" />
            
            <rect x="1" y="27" width="2" height="1" />
            <rect x="5" y="26" width="1" height="2" />
            <rect x="12" y="25" width="6" height="2" />
            <rect x="22" y="26" width="3" height="3" />
            <rect x="27" y="27" width="2" height="1" />
            <text x="14.5" y="16" font-size="2" font-family="monospace" text-anchor="middle" fill="var(--primary)" font-weight="bold">${code}</text>
        </svg>
    `;
}

// WhatsApp support chatbot handler
function handleChatSend() {
    const input = document.getElementById('chat-input');
    const body = document.getElementById('chat-body');
    if (!input || !body || !input.value.trim()) return;
    
    const userText = input.value.trim();
    input.value = '';
    
    // Append User message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = userText;
    body.appendChild(userMsg);
    
    // Scroll bottom
    body.scrollTop = body.scrollHeight;
    
    // Simulate bot thinking and reply
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot';
        
        // Simple keywords routing
        const textLower = userText.toLowerCase();
        if (textLower.includes('ingresso') || textLower.includes('ticket') || textLower.includes('compr') || textLower.includes('buy')) {
            botMsg.textContent = state.language === 'pt' ? 
                'Você pode reservar qualquer um dos pacotes na seção "Pacotes". Após preencher o cadastro, seu ingresso digital com QR Code será gerado na hora!' :
                'You can book any of the packages in the "Packages" section. After filling the quick profile, your digital QR Code ticket will be generated instantly!';
        } else if (textLower.includes('mapa') || textLower.includes('parque') || textLower.includes('botanico') || textLower.includes('lerner')) {
            botMsg.textContent = state.language === 'pt' ? 
                'Nosso Mapa Interativo mostra os principais pontos, inclusive o Jardim Botânico e o novo Parque Jaime Lerner. Clique nos círculos brilhantes para saber os horários e ingressos!' :
                'Our Interactive Map shows the main attractions, including the Botanical Garden and the new Jaime Lerner Park. Click on the glowing circles to view opening hours and ticketing info!';
        } else if (textLower.includes('desconto') || textLower.includes('cupom') || textLower.includes('discount')) {
            botMsg.textContent = state.language === 'pt' ? 
                'Todos os pacotes temáticos do Curitiba360 já possuem desconto embutido de até 20% comparado com as compras individuais!' :
                'All thematic Curitiba360 packages already include a built-in discount of up to 20% compared to buying individual tickets!';
        } else {
            botMsg.textContent = state.language === 'pt' ? 
                'Entendi! Um especialista do Curitiba360 vai entrar em contato com você em breve neste mesmo canal. Aproveite Curitiba!' :
                'Got it! A Curitiba360 specialist will get back to you shortly in this channel. Enjoy Curitiba!';
        }
        
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
    }, 800);
}
