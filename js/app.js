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
        dashMenuIntegrations: "Integrações Externas",
        dashMenuCommercial: "Configurações Comerciais",
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
        pkgInclGreen3: "Brinde ecológico exclusivo do memorial",

        badgePromo: "Novidades",
        titlePromo: "Destaques Semanais",
        descPromo: "Benefícios exclusivos da semana para usuários da plataforma Curitiba360.",
        promo1Title: "Parada Confeitaria das Flores",
        promo1Desc: "15% de desconto em todo o cardápio de cafés coloniais ao apresentar o QR Code da plataforma.",
        promo2Title: "Bar do Alemão - Batel",
        promo2Desc: "Chopp em dobro de segunda a quinta para turistas hospedados em hotéis parceiros.",
        badgeRoadmap: "Roadmap",
        titleRoadmap: "Futuro: App Curitiba360",
        descRoadmap: "Em breve, um aplicativo nativo completo para expandir sua jornada urbana.",
        roadmapItem1: "Gamificação: Colete conquistas ao visitar atrações",
        roadmapItem2: "Recompensas: Troque pontos por ingressos e brindes",
        roadmapItem3: "Login Pessoal: Histórico de viagens e roteiros salvos"
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
        dashMenuIntegrations: "External Integrations",
        dashMenuCommercial: "Commercial Settings",
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
        pkgInclGreen3: "Exclusive eco-gift from the memorial",

        badgePromo: "What's New",
        titlePromo: "Weekly Highlights",
        descPromo: "Exclusive weekly benefits for Curitiba360 users.",
        promo1Title: "Confeitaria das Flores Stop",
        promo1Desc: "15% discount on all colonial coffee menu items by showing the platform's QR Code.",
        promo2Title: "Bar do Alemão - Batel",
        promo2Desc: "Double draft beer from Monday to Thursday for tourists staying in partner hotels.",
        badgeRoadmap: "Roadmap",
        titleRoadmap: "Future: Curitiba360 App",
        descRoadmap: "Coming soon, a complete native app to expand your urban journey.",
        roadmapItem1: "Gamification: Collect achievements when visiting attractions",
        roadmapItem2: "Rewards: Exchange points for tickets and gifts",
        roadmapItem3: "Personal Login: Travel history and saved routes"
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
    const touristSecs = ['hero-section', 'section-map', 'section-packages', 'section-highlights'];
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
    const integrationsDiv = document.getElementById('dash-view-integrations');
    const commercialDiv = document.getElementById('dash-view-commercial-settings');
    
    if (!overviewDiv || !heatmapDiv || !profileDiv) return;
    
    overviewDiv.style.display = 'none';
    heatmapDiv.style.display = 'none';
    profileDiv.style.display = 'none';
    if (integrationsDiv) integrationsDiv.style.display = 'none';
    if (commercialDiv) commercialDiv.style.display = 'none';
    
    if (tabId === 'overview') {
        overviewDiv.style.display = 'block';
    } else if (tabId === 'heatmap') {
        heatmapDiv.style.display = 'block';
    } else if (tabId === 'profile') {
        profileDiv.style.display = 'block';
    } else if (tabId === 'integrations') {
        if (integrationsDiv) integrationsDiv.style.display = 'block';
    } else if (tabId === 'commercial-settings') {
        if (commercialDiv) {
            commercialDiv.style.display = 'block';
            loadCommercialData();
        }
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
    
    const payload = {
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
    };

    // Save to Database Server
    fetch('api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Database write success:", data);
    })
    .catch(err => {
        console.error("Database write failed:", err);
    });

    // Save live registration for Dashboard Analytics
    if (window.addLiveRegistration) {
        window.addLiveRegistration(payload);
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

// Test External API connectivity simulator
function testIntegration(id, name) {
    showToast(state.language === 'pt' ? 
        `Conexão testada com sucesso para ${name}!` : 
        `Connection tested successfully for ${name}!`);
    
    // Update badge status to "Connected"
    const badge = document.getElementById(`status-int-${id}`);
    if (badge) {
        badge.textContent = state.language === 'pt' ? 'Conectado' : 'Connected';
        badge.style.background = 'rgba(16, 185, 129, 0.1)';
        badge.style.color = '#10B981';
        badge.style.borderColor = '#10B981';
    }
}

// Switch diagram in the viewer dropdown
function switchDiagram(fileName) {
    const imgViewer = document.getElementById('diagram-img-viewer');
    const titleText = document.getElementById('diagram-display-title');
    if (imgViewer && titleText) {
        imgViewer.src = `assets/diagramas/${fileName}`;
        titleText.textContent = fileName;
        
        // Reset zoom
        imgViewer.style.transform = 'scale(1)';
        imgViewer.style.cursor = 'zoom-in';
    }
}

// Zoom in/out helper for the diagram image
let isDiagramZoomed = false;
function zoomDiagram() {
    const imgViewer = document.getElementById('diagram-img-viewer');
    if (!imgViewer) return;
    
    isDiagramZoomed = !isDiagramZoomed;
    if (isDiagramZoomed) {
        imgViewer.style.transform = 'scale(1.8)';
        imgViewer.style.cursor = 'zoom-out';
        imgViewer.parentElement.style.overflow = 'auto'; // allow panning
    } else {
        imgViewer.style.transform = 'scale(1)';
        imgViewer.style.cursor = 'zoom-in';
        imgViewer.parentElement.style.overflow = 'hidden';
    }
}

// Bind to window to allow direct HTML calls
window.testIntegration = testIntegration;
window.switchDiagram = switchDiagram;
window.zoomDiagram = zoomDiagram;

// State variables for Commercial Settings
let commercialState = {
    conditions: [],
    financials: [],
    currentSubTab: 'conditions',
    currentFinancialFilter: 'Ativo',
    selectedConditionIds: [],
    selectedFinancialIds: [],
    conditionsPage: 1,
    conditionsPageSize: 10
};

// Switch sub-tab between conditions and financial rules
function switchCommercialSubTab(subTabId) {
    commercialState.currentSubTab = subTabId;
    
    const condPanel = document.getElementById('commercial-subtab-conditions-panel');
    const finPanel = document.getElementById('commercial-subtab-financial-panel');
    const btnCond = document.getElementById('btn-subtab-conditions');
    const btnFin = document.getElementById('btn-subtab-financial');
    
    if (subTabId === 'conditions') {
        if (condPanel) condPanel.style.display = 'block';
        if (finPanel) finPanel.style.display = 'none';
        
        btnCond.style.background = 'var(--primary-glow)';
        btnCond.style.color = 'var(--primary)';
        btnCond.style.border = '1px solid var(--primary)';
        
        btnFin.style.background = 'transparent';
        btnFin.style.color = 'var(--text-secondary)';
        btnFin.style.border = '1px solid var(--glass-border)';
    } else {
        if (condPanel) condPanel.style.display = 'none';
        if (finPanel) finPanel.style.display = 'block';
        
        btnFin.style.background = 'var(--primary-glow)';
        btnFin.style.color = 'var(--primary)';
        btnFin.style.border = '1px solid var(--primary)';
        
        btnCond.style.background = 'transparent';
        btnCond.style.color = 'var(--text-secondary)';
        btnCond.style.border = '1px solid var(--glass-border)';
        
        renderFinancialsTable();
    }
}

// Fetch Commercial Settings from backend API
async function loadCommercialData() {
    try {
        const response = await fetch('/api/commercial-settings');
        const data = await response.json();
        commercialState.conditions = data.commercialConditions || [];
        commercialState.financials = data.financialInfo || [];
        
        // Reset selections
        commercialState.selectedConditionIds = [];
        commercialState.selectedFinancialIds = [];
        updateConditionsActionBar();
        updateFinancialsActionBar();
        
        renderConditionsTable();
        renderFinancialsTable();
    } catch (err) {
        console.error("Error loading commercial settings:", err);
    }
}

// Render Commercial Conditions Table
function renderConditionsTable() {
    const tbody = document.getElementById('conditions-table-body');
    if (!tbody) return;
    
    // Get filter values
    const query = document.getElementById('cond-search').value.toLowerCase();
    const filterStatus = document.getElementById('cond-filter-status').value;
    const filterType = document.getElementById('cond-filter-type').value;
    const filterDays = document.getElementById('cond-filter-days').value;
    
    // Filter conditions
    let filtered = commercialState.conditions.filter(c => {
        const matchesQuery = c.nickname.toLowerCase().includes(query) || String(c.id).includes(query);
        const matchesStatus = filterStatus === 'Todos' || c.status === filterStatus;
        const matchesType = filterType === 'Todos' || c.type === filterType;
        const matchesDays = !filterDays || c.daysLimit <= Number(filterDays);
        return matchesQuery && matchesStatus && matchesType && matchesDays;
    });
    
    // Pagination
    const totalRecords = filtered.length;
    const size = Number(commercialState.conditionsPageSize);
    const totalPages = Math.ceil(totalRecords / size) || 1;
    if (commercialState.conditionsPage > totalPages) {
        commercialState.conditionsPage = totalPages;
    }
    const startIdx = (commercialState.conditionsPage - 1) * size;
    const paginated = filtered.slice(startIdx, startIdx + size);
    
    // Update pagination info
    const endIdx = Math.min(startIdx + size, totalRecords);
    const paginationText = totalRecords > 0 ? `${startIdx + 1} a ${endIdx} de ${totalRecords}` : '0 de 0';
    document.getElementById('cond-pagination-info').textContent = paginationText;
    
    // Build rows
    tbody.innerHTML = paginated.map(c => {
        const isChecked = commercialState.selectedConditionIds.includes(c.id);
        const statusBadge = c.status === 'Ativo' ? 
            `<span class="section-badge" style="background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid #10B981; font-size: 10px; margin: 0; padding: 2px 6px;">Ativo</span>` :
            `<span class="section-badge" style="background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid #EF4444; font-size: 10px; margin: 0; padding: 2px 6px;">Inativo</span>`;
        
        const typeBadge = c.type === 'Porcentagem' ? 
            `<span style="background: rgba(99, 102, 241, 0.1); color: #818CF8; border: 1px solid #818CF8; padding: 2px 6px; border-radius: 4px;">%</span>` : 
            `<span style="background: rgba(16, 185, 129, 0.1); color: #34D399; border: 1px solid #34D399; padding: 2px 6px; border-radius: 4px;">R$</span>`;
            
        const valueFormatted = c.type === 'Porcentagem' ? `${c.value}%` : `R$ ${c.value.toFixed(2)}`;
        const linkedBadge = c.linked ? 
            `<span style="color: #60A5FA; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Contrato</span>` : 
            `<span style="color: var(--text-muted);">Livre</span>`;

        return `
            <tr style="border-bottom: 1px solid var(--glass-border); background: ${isChecked ? 'rgba(255, 75, 43, 0.05)' : 'transparent'}; transition: background 0.2s;">
                <td style="padding: 12px 16px;"><input type="checkbox" ${isChecked ? 'checked' : ''} onclick="toggleConditionRow(${c.id}, this.checked)"></td>
                <td style="padding: 12px; font-weight: 600;">${c.id}</td>
                <td style="padding: 12px; font-weight: 700; color: #FFF;">${c.nickname}</td>
                <td style="padding: 12px;">${statusBadge}</td>
                <td style="padding: 12px;">${typeBadge}</td>
                <td style="padding: 12px; font-weight: 600;">${valueFormatted}</td>
                <td style="padding: 12px;">${c.ccVista}%</td>
                <td style="padding: 12px;">${c.ccParcelado}%</td>
                <td style="padding: 12px;">${c.pix}%</td>
                <td style="padding: 12px;">${c.anticipation}%</td>
                <td style="padding: 12px; font-weight: 600;">${c.daysLimit} dias</td>
                <td style="padding: 12px;">${c.international}%</td>
                <td style="padding: 12px; font-size: 11px;">${linkedBadge}</td>
            </tr>
        `;
    }).join('');
}

// Toggle selection for a single condition row
function toggleConditionRow(id, isChecked) {
    if (isChecked) {
        if (!commercialState.selectedConditionIds.includes(id)) {
            commercialState.selectedConditionIds.push(id);
        }
    } else {
        commercialState.selectedConditionIds = commercialState.selectedConditionIds.filter(cid => cid !== id);
    }
    
    // Update check-all checkbox status
    const allCheck = document.getElementById('cond-check-all');
    if (allCheck) {
        const paginatedIds = commercialState.conditions.map(c => c.id);
        allCheck.checked = paginatedIds.length > 0 && paginatedIds.every(cid => commercialState.selectedConditionIds.includes(cid));
    }
    
    updateConditionsActionBar();
    renderConditionsTable();
}

// Toggle all conditions checkboxes
function toggleAllConditions(checkbox) {
    const isChecked = checkbox.checked;
    
    // Find filtered ids on screen
    const query = document.getElementById('cond-search').value.toLowerCase();
    const filterStatus = document.getElementById('cond-filter-status').value;
    const filterType = document.getElementById('cond-filter-type').value;
    const filterDays = document.getElementById('cond-filter-days').value;
    
    const visibleConditions = commercialState.conditions.filter(c => {
        const matchesQuery = c.nickname.toLowerCase().includes(query) || String(c.id).includes(query);
        const matchesStatus = filterStatus === 'Todos' || c.status === filterStatus;
        const matchesType = filterType === 'Todos' || c.type === filterType;
        const matchesDays = !filterDays || c.daysLimit <= Number(filterDays);
        return matchesQuery && matchesStatus && matchesType && matchesDays;
    });

    visibleConditions.forEach(c => {
        if (isChecked) {
            if (!commercialState.selectedConditionIds.includes(c.id)) {
                commercialState.selectedConditionIds.push(c.id);
            }
        } else {
            commercialState.selectedConditionIds = commercialState.selectedConditionIds.filter(cid => cid !== c.id);
        }
    });
    
    updateConditionsActionBar();
    renderConditionsTable();
}

// Update the floating action bar for conditions
function updateConditionsActionBar() {
    const bar = document.getElementById('cond-action-bar');
    if (!bar) return;
    
    const count = commercialState.selectedConditionIds.length;
    if (count > 0) {
        bar.style.display = 'flex';
        document.getElementById('cond-selected-count').textContent = count;
        
        // Rules: Edit button only if exactly 1 is selected
        const btnEdit = document.getElementById('btn-cond-edit');
        const btnCopy = document.getElementById('btn-cond-copy');
        const btnDelete = document.getElementById('btn-cond-delete');
        
        if (count === 1) {
            btnEdit.style.display = 'block';
            btnCopy.style.display = 'block';
            
            // Check if selected is linked to a contract
            const selectedCond = commercialState.conditions.find(c => c.id === commercialState.selectedConditionIds[0]);
            if (selectedCond && selectedCond.linked) {
                // Cannot edit linked conditions, show Warning or hide edit (specification says: "condições vinculadas exibe Copiar em vez de Editar")
                btnEdit.style.display = 'none';
            }
        } else {
            btnEdit.style.display = 'none';
            btnCopy.style.display = 'none';
        }
        
        // Delete button disabled/warning if any selected is linked
        const anyLinkedSelected = commercialState.conditions.some(c => commercialState.selectedConditionIds.includes(c.id) && c.linked);
        if (anyLinkedSelected) {
            btnDelete.style.opacity = '0.5';
            btnDelete.title = "Não é possível excluir condições vinculadas a contratos vigentes";
        } else {
            btnDelete.style.opacity = '1';
            btnDelete.title = "";
        }
    } else {
        bar.style.display = 'none';
    }
}

// Filter Conditions Table Trigger
function filterConditionsTable() {
    commercialState.conditionsPage = 1;
    renderConditionsTable();
}

// Change page size
function changeConditionsPageSize(size) {
    commercialState.conditionsPageSize = size;
    commercialState.conditionsPage = 1;
    renderConditionsTable();
}

// Page switcher
function changeConditionsPage(dir) {
    commercialState.conditionsPage += dir;
    if (commercialState.conditionsPage < 1) commercialState.conditionsPage = 1;
    renderConditionsTable();
}

// Update the field values label mask when selecting type dropdown
function updateCondValueLabel(type) {
    const label = document.getElementById('cond-val-label');
    if (label) {
        label.textContent = type === 'Porcentagem' ? 'Valor (%) *' : 'Valor (R$) *';
    }
}

// Open modal for a new commercial condition
function openConditionModal() {
    document.getElementById('cond-modal-title').textContent = "Nova Condição Comercial";
    document.getElementById('cond-form-id').value = "";
    document.getElementById('condition-form').reset();
    updateCondValueLabel('Porcentagem');
    
    // Show modal
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('modal-checkout-view').style.display = 'none';
    document.getElementById('modal-ticket-view').style.display = 'none';
    document.getElementById('modal-financial-view').style.display = 'none';
    document.getElementById('modal-condition-view').style.display = 'block';
}

// Handle Conditions Actions (Edit, Copy, Delete, Inactivate)
async function handleConditionAction(action) {
    const selectedIds = commercialState.selectedConditionIds;
    if (selectedIds.length === 0) return;
    
    if (action === 'edit') {
        const id = selectedIds[0];
        const cond = commercialState.conditions.find(c => c.id === id);
        if (!cond) return;
        
        // Show modal pre-filled
        document.getElementById('cond-modal-title').textContent = "Editar Condição Comercial";
        document.getElementById('cond-form-id').value = cond.id;
        document.getElementById('cond-form-nickname').value = cond.nickname;
        document.getElementById('cond-form-type').value = cond.type;
        document.getElementById('cond-form-value').value = cond.value;
        document.getElementById('cond-form-ccvista').value = cond.ccVista;
        document.getElementById('cond-form-ccparcelado').value = cond.ccParcelado;
        document.getElementById('cond-form-pix').value = cond.pix;
        document.getElementById('cond-form-anticipation').value = cond.anticipation;
        document.getElementById('cond-form-international').value = cond.international;
        document.getElementById('cond-form-days').value = cond.daysLimit;
        document.getElementById('cond-form-active').checked = cond.status === 'Ativo';
        
        updateCondValueLabel(cond.type);
        
        // Show modal
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById('modal-checkout-view').style.display = 'none';
        document.getElementById('modal-ticket-view').style.display = 'none';
        document.getElementById('modal-financial-view').style.display = 'none';
        document.getElementById('modal-condition-view').style.display = 'block';
    } else if (action === 'copy') {
        const id = selectedIds[0];
        const cond = commercialState.conditions.find(c => c.id === id);
        if (!cond) return;
        
        // Same as edit, but clear the ID field to save as new record!
        document.getElementById('cond-modal-title').textContent = "Nova Condição Comercial (Cópia)";
        document.getElementById('cond-form-id').value = ""; // Clear ID
        document.getElementById('cond-form-nickname').value = `${cond.nickname} (Cópia)`;
        document.getElementById('cond-form-type').value = cond.type;
        document.getElementById('cond-form-value').value = cond.value;
        document.getElementById('cond-form-ccvista').value = cond.ccVista;
        document.getElementById('cond-form-ccparcelado').value = cond.ccParcelado;
        document.getElementById('cond-form-pix').value = cond.pix;
        document.getElementById('cond-form-anticipation').value = cond.anticipation;
        document.getElementById('cond-form-international').value = cond.international;
        document.getElementById('cond-form-days').value = cond.daysLimit;
        document.getElementById('cond-form-active').checked = cond.status === 'Ativo';
        
        updateCondValueLabel(cond.type);
        
        // Show modal
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById('modal-checkout-view').style.display = 'none';
        document.getElementById('modal-ticket-view').style.display = 'none';
        document.getElementById('modal-financial-view').style.display = 'none';
        document.getElementById('modal-condition-view').style.display = 'block';
    } else if (action === 'delete') {
        const anyLinked = commercialState.conditions.some(c => selectedIds.includes(c.id) && c.linked);
        if (anyLinked) {
            alert(state.language === 'pt' ? "Erro: Não é possível excluir uma condição vinculada a contrato vigente!" : "Error: Cannot delete a condition linked to an active contract!");
            return;
        }
        
        if (confirm(state.language === 'pt' ? `Confirmar exclusão de ${selectedIds.length} condições comerciais?` : `Confirm deletion of ${selectedIds.length} commercial conditions?`)) {
            const res = await fetch('/api/commercial-conditions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', ids: selectedIds })
            });
            if (res.ok) {
                showToast(state.language === 'pt' ? "Condições excluídas com sucesso!" : "Conditions deleted successfully!");
                loadCommercialData();
            } else {
                const data = await res.json();
                alert(data.error || "Error deleting conditions");
            }
        }
    } else if (action === 'inactivate') {
        const res = await fetch('/api/commercial-conditions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'inactivate', ids: selectedIds })
        });
        if (res.ok) {
            showToast(state.language === 'pt' ? "Condições inativadas com sucesso!" : "Conditions inactivated successfully!");
            loadCommercialData();
        } else {
            alert("Error inactivating conditions");
        }
    }
}

// Save condition form handler
async function saveConditionForm(event) {
    event.preventDefault();
    
    const id = document.getElementById('cond-form-id').value;
    const nickname = document.getElementById('cond-form-nickname').value;
    const type = document.getElementById('cond-form-type').value;
    const value = document.getElementById('cond-form-value').value;
    const ccVista = document.getElementById('cond-form-ccvista').value;
    const ccParcelado = document.getElementById('cond-form-ccparcelado').value;
    const pix = document.getElementById('cond-form-pix').value;
    const anticipation = document.getElementById('cond-form-anticipation').value;
    const international = document.getElementById('cond-form-international').value;
    const daysLimit = document.getElementById('cond-form-days').value;
    const status = document.getElementById('cond-form-active').checked ? 'Ativo' : 'Inativo';
    
    const bodyPayload = {
        nickname, type, value, ccVista, ccParcelado, pix, anticipation, international, daysLimit, status
    };
    if (id) {
        bodyPayload.id = id;
    }
    
    try {
        const res = await fetch('/api/commercial-conditions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyPayload)
        });
        
        if (res.ok) {
            closeModal();
            showToast(state.language === 'pt' ? "Condição Comercial salva com sucesso!" : "Commercial Condition saved successfully!");
            loadCommercialData();
        } else {
            const data = await res.json();
            alert(data.error || "Erro ao salvar condição");
        }
    } catch (err) {
        console.error("Error saving condition:", err);
    }
}


// --- FINANCIAL RULES METHODS (WF-011) ---

// Switch filter by status
function switchFinancialFilter(filterStatus) {
    commercialState.currentFinancialFilter = filterStatus;
    
    // Toggle active state on subtab filter buttons
    const btnActive = document.getElementById('btn-fin-tab-active');
    const btnInactive = document.getElementById('btn-fin-tab-inactive');
    const btnAll = document.getElementById('btn-fin-tab-all');
    
    [btnActive, btnInactive, btnAll].forEach(btn => {
        if (btn) {
            btn.style.background = 'transparent';
            btn.style.borderColor = 'var(--glass-border)';
        }
    });
    
    let activeBtn;
    if (filterStatus === 'Ativo') activeBtn = btnActive;
    else if (filterStatus === 'Inativo') activeBtn = btnInactive;
    else activeBtn = btnAll;
    
    if (activeBtn) {
        activeBtn.style.background = 'var(--secondary-glow)';
        activeBtn.style.borderColor = 'var(--secondary)';
    }
    
    renderFinancialsTable();
}

// Render Financials Rules Table
function renderFinancialsTable() {
    const tbody = document.getElementById('financials-table-body');
    if (!tbody) return;
    
    const statusFilter = commercialState.currentFinancialFilter;
    
    let filtered = commercialState.financials.filter(f => {
        return statusFilter === 'Todos' || f.status === statusFilter;
    });
    
    tbody.innerHTML = filtered.map(f => {
        const isChecked = commercialState.selectedFinancialIds.includes(f.id);
        const statusBadge = f.status === 'Ativo' ? 
            `<span class="section-badge" style="background: rgba(16, 185, 129, 0.1); color: #10B981; border: 1px solid #10B981; font-size: 10px; margin: 0; padding: 2px 6px;">Ativo</span>` :
            `<span class="section-badge" style="background: rgba(239, 68, 68, 0.1); color: #EF4444; border: 1px solid #EF4444; font-size: 10px; margin: 0; padding: 2px 6px;">Inativo</span>`;
        
        const linkedBadge = f.linked ? 
            `<span style="color: #60A5FA; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> Contrato</span>` : 
            `<span style="color: var(--text-muted);">Livre</span>`;

        return `
            <tr style="border-bottom: 1px solid var(--glass-border); background: ${isChecked ? 'rgba(255, 75, 43, 0.05)' : 'transparent'}; transition: background 0.2s;">
                <td style="padding: 12px 16px;"><input type="checkbox" ${isChecked ? 'checked' : ''} onclick="toggleFinancialRow(${f.id}, this.checked)"></td>
                <td style="padding: 12px; font-weight: 600;">${f.id}</td>
                <td style="padding: 12px; font-weight: 700; color: #FFF;">${f.nickname}</td>
                <td style="padding: 12px;">${statusBadge}</td>
                <td style="padding: 12px; font-weight: 600; color: ${f.withdrawAllowed === 'Sim' ? '#34D399' : '#F87171'};">${f.withdrawAllowed}</td>
                <td style="padding: 12px;">${f.withdrawPct}%</td>
                <td style="padding: 12px; font-weight: 600;">R$ ${f.withdrawMax.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                <td style="padding: 12px; font-weight: 600;">${f.withdrawMinDays} dias</td>
                <td style="padding: 12px;">${f.pixFee}</td>
                <td style="padding: 12px;">${f.tedFee}</td>
                <td style="padding: 12px; font-size: 11px;">${linkedBadge}</td>
            </tr>
        `;
    }).join('');
}

// Toggle single row selection for financial info
function toggleFinancialRow(id, isChecked) {
    if (isChecked) {
        if (!commercialState.selectedFinancialIds.includes(id)) {
            commercialState.selectedFinancialIds.push(id);
        }
    } else {
        commercialState.selectedFinancialIds = commercialState.selectedFinancialIds.filter(fid => fid !== id);
    }
    
    const allCheck = document.getElementById('fin-check-all');
    if (allCheck) {
        const visibleIds = commercialState.financials.map(f => f.id);
        allCheck.checked = visibleIds.length > 0 && visibleIds.every(fid => commercialState.selectedFinancialIds.includes(fid));
    }
    
    updateFinancialsActionBar();
    renderFinancialsTable();
}

// Toggle all financials checkboxes
function toggleAllFinancials(checkbox) {
    const isChecked = checkbox.checked;
    
    commercialState.financials.forEach(f => {
        if (isChecked) {
            if (!commercialState.selectedFinancialIds.includes(f.id)) {
                commercialState.selectedFinancialIds.push(f.id);
            }
        } else {
            commercialState.selectedFinancialIds = commercialState.selectedFinancialIds.filter(fid => fid !== f.id);
        }
    });
    
    updateFinancialsActionBar();
    renderFinancialsTable();
}

// Update the floating action bar for financial rules
function updateFinancialsActionBar() {
    const bar = document.getElementById('fin-action-bar');
    if (!bar) return;
    
    const count = commercialState.selectedFinancialIds.length;
    if (count > 0) {
        bar.style.display = 'flex';
        document.getElementById('fin-selected-count').textContent = count;
        
        const btnEdit = document.getElementById('btn-fin-edit');
        if (count === 1) {
            btnEdit.style.display = 'block';
        } else {
            btnEdit.style.display = 'none';
        }
    } else {
        bar.style.display = 'none';
    }
}

// Open modal for a new financial rule
function openFinancialModal() {
    document.getElementById('fin-modal-title').textContent = "Nova Informação Financeira";
    document.getElementById('fin-form-id').value = "";
    document.getElementById('financial-form').reset();
    
    // Show modal
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('modal-checkout-view').style.display = 'none';
    document.getElementById('modal-ticket-view').style.display = 'none';
    document.getElementById('modal-condition-view').style.display = 'none';
    document.getElementById('modal-financial-view').style.display = 'block';
}

// Handle financial rule operations (Edit, Delete)
async function handleFinancialAction(action) {
    const selectedIds = commercialState.selectedFinancialIds;
    if (selectedIds.length === 0) return;
    
    if (action === 'edit') {
        const id = selectedIds[0];
        const fin = commercialState.financials.find(f => f.id === id);
        if (!fin) return;
        
        document.getElementById('fin-modal-title').textContent = "Editar Informação Financeira";
        document.getElementById('fin-form-id').value = fin.id;
        document.getElementById('fin-form-nickname').value = fin.nickname;
        document.getElementById('fin-form-status').value = fin.status;
        document.getElementById('fin-form-allowed').value = fin.withdrawAllowed;
        document.getElementById('fin-form-pct').value = fin.withdrawPct;
        document.getElementById('fin-form-max').value = fin.withdrawMax;
        document.getElementById('fin-form-mindays').value = fin.withdrawMinDays;
        document.getElementById('fin-form-pixfee').value = fin.pixFee;
        document.getElementById('fin-form-tedfee').value = fin.tedFee;
        
        // Show modal
        document.getElementById('modal-overlay').style.display = 'flex';
        document.getElementById('modal-checkout-view').style.display = 'none';
        document.getElementById('modal-ticket-view').style.display = 'none';
        document.getElementById('modal-condition-view').style.display = 'none';
        document.getElementById('modal-financial-view').style.display = 'block';
    } else if (action === 'delete') {
        if (confirm(state.language === 'pt' ? `Confirmar exclusão de ${selectedIds.length} regras financeiras?` : `Confirm deletion of ${selectedIds.length} financial rules?`)) {
            const res = await fetch('/api/financial-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', ids: selectedIds })
            });
            if (res.ok) {
                showToast(state.language === 'pt' ? "Informações financeiras excluídas com sucesso!" : "Financial information deleted successfully!");
                loadCommercialData();
            } else {
                alert("Error deleting financial information");
            }
        }
    }
}

// Save financial rule form handler
async function saveFinancialForm(event) {
    event.preventDefault();
    
    const id = document.getElementById('fin-form-id').value;
    const nickname = document.getElementById('fin-form-nickname').value;
    const status = document.getElementById('fin-form-status').value;
    const withdrawAllowed = document.getElementById('fin-form-allowed').value;
    const withdrawPct = document.getElementById('fin-form-pct').value;
    const withdrawMax = document.getElementById('fin-form-max').value;
    const withdrawMinDays = document.getElementById('fin-form-mindays').value;
    const pixFee = document.getElementById('fin-form-pixfee').value;
    const tedFee = document.getElementById('fin-form-tedfee').value;
    
    const bodyPayload = {
        nickname, status, withdrawAllowed, withdrawPct, withdrawMax, withdrawMinDays, pixFee, tedFee
    };
    if (id) {
        bodyPayload.id = id;
    }
    
    try {
        const res = await fetch('/api/financial-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyPayload)
        });
        
        if (res.ok) {
            closeModal();
            showToast(state.language === 'pt' ? "Regra financeira salva com sucesso!" : "Financial rule saved successfully!");
            loadCommercialData();
        } else {
            alert("Erro ao salvar regra financeira");
        }
    } catch (err) {
        console.error("Error saving financial rule:", err);
    }
}

// Bind to window to allow direct HTML calls
window.testIntegration = testIntegration;
window.switchDiagram = switchDiagram;
window.zoomDiagram = zoomDiagram;

window.switchCommercialSubTab = switchCommercialSubTab;
window.filterConditionsTable = filterConditionsTable;
window.changeConditionsPageSize = changeConditionsPageSize;
window.changeConditionsPage = changeConditionsPage;
window.toggleAllConditions = toggleAllConditions;
window.toggleConditionRow = toggleConditionRow;
window.openConditionModal = openConditionModal;
window.updateCondValueLabel = updateCondValueLabel;
window.saveConditionForm = saveConditionForm;
window.handleConditionAction = handleConditionAction;

window.switchFinancialFilter = switchFinancialFilter;
window.toggleAllFinancials = toggleAllFinancials;
window.toggleFinancialRow = toggleFinancialRow;
window.openFinancialModal = openFinancialModal;
window.handleFinancialAction = handleFinancialAction;
window.saveFinancialForm = saveFinancialForm;


