// frontend/src/services/platformSyncService.js
// Barramento de Dados e Sincronização em Tempo Real (Site Público CWB 360 <-> Backoffice <-> Validador QR <-> Financeiro B2B)

const KEYS = {
  ATTRACTIONS: 'cwb360:platform_attractions_v2',
  ORDERS: 'cwb360:platform_orders_v2',
  VOUCHERS: 'cwb360:platform_vouchers_v2',
  CHECKINS: 'cwb360:platform_checkins_v2',
  PARTNERS: 'cwb360:platform_partners_v2',
  REF_TRACKING: 'cwb360:platform_active_ref_v2',
  ACTIVE_ROLE: 'cwb360:platform_active_role_v2'
};

export const B2B_PARTNERS_CATALOG = [
  { id: 'hotel-pestana', code: 'hotel-pestana', name: 'Hotel Pestana Curitiba 5★', type: 'HOTEL', commissionPct: 12, discountPct: 10, cnpj: '12.345.678/0001-90', contact: 'Roberto Mendes', phone: '(41) 3017-9900', scans: 1450 },
  { id: 'hotel-radisson', code: 'hotel-radisson', name: 'Radisson Hotel Curitiba Batel', type: 'HOTEL', commissionPct: 12, discountPct: 10, cnpj: '23.456.789/0001-01', contact: 'Fernanda Costa', phone: '(41) 3351-2222', scans: 1215 },
  { id: 'hotel-nomaa', code: 'hotel-nomaa', name: 'Nomaa Hotel Boutique 5★', type: 'HOTEL', commissionPct: 15, discountPct: 10, cnpj: '34.567.890/0001-12', contact: 'Juliana Paes', phone: '(41) 3087-9500', scans: 960 },
  { id: 'agencia-serra-verde', code: 'serra-verde', name: 'Serra Verde Express Turismo', type: 'AGENCIA', commissionPct: 15, discountPct: 10, cnpj: '45.678.901/0001-23', contact: 'Carlos Eduardo', phone: '(41) 3888-3488', scans: 2140 },
  { id: 'agencia-tour-cwb', code: 'tour-cwb', name: 'Agência Tour CWB Receptivo', type: 'AGENCIA', commissionPct: 10, discountPct: 5, cnpj: '56.789.012/0001-34', contact: 'Ana Paula', phone: '(41) 3222-4455', scans: 840 }
];

const INITIAL_ORDERS = [
  {
    id: 'CWB-102930',
    dataHora: '24/11/2026 10:30',
    turistaNome: 'João Silva',
    turistaEmail: 'joao@email.com',
    turistaCpf: '123.456.789-10',
    telefone: '(41) 99999-1111',
    atracao: 'Ópera de Arame & Vale da Música',
    qtd: 2,
    valorTotal: 180.00,
    cupom: 'PESTANA10',
    parceiroRef: 'hotel-pestana',
    parceiroNome: 'Hotel Pestana Curitiba 5★',
    comissaoRs: 21.60,
    comissaoPct: 12,
    splitPlataformaRs: 18.00,
    splitAtracaoRs: 140.40,
    status: 'Confirmado',
    formaPagamento: 'PIX',
    vouchers: ['ING8001', 'ING8004']
  },
  {
    id: 'CWB-102931',
    dataHora: '24/11/2026 14:15',
    turistaNome: 'Carlos Souza',
    turistaEmail: 'carlos@email.com',
    turistaCpf: '444.555.666-00',
    telefone: '(41) 98888-2222',
    atracao: 'Jardim Botânico de Curitiba',
    qtd: 1,
    valorTotal: 50.00,
    cupom: '-',
    parceiroRef: 'serra-verde',
    parceiroNome: 'Serra Verde Express Turismo',
    comissaoRs: 7.50,
    comissaoPct: 15,
    splitPlataformaRs: 5.00,
    splitAtracaoRs: 37.50,
    status: 'Confirmado',
    formaPagamento: 'Cartão de Crédito',
    vouchers: ['ING8002']
  },
  {
    id: 'CWB-102932',
    dataHora: '25/11/2026 09:00',
    turistaNome: 'Beatriz Ramos',
    turistaEmail: 'beatriz@email.com',
    turistaCpf: '777.888.999-55',
    telefone: '(11) 97777-3333',
    atracao: 'Passeio de Trem Serra Verde Express',
    qtd: 2,
    valorTotal: 438.00,
    cupom: 'TOUR10',
    parceiroRef: 'hotel-radisson',
    parceiroNome: 'Radisson Hotel Curitiba Batel',
    comissaoRs: 52.56,
    comissaoPct: 12,
    splitPlataformaRs: 43.80,
    splitAtracaoRs: 341.64,
    status: 'Confirmado',
    formaPagamento: 'PIX',
    vouchers: ['ING8005', 'ING8006']
  }
];

const INITIAL_VOUCHERS = [
  { id: 'ING8001', orderId: 'CWB-102930', turista: 'João Silva', cpf: '123.456.789-10', atracao: 'Ópera de Arame & Vale da Música', categoria: 'Inteira', valor: 90.00, status: 'Pendente', dataCompra: '24/11/2026 10:30', validadoEm: null },
  { id: 'ING8004', orderId: 'CWB-102930', turista: 'João Silva', cpf: '123.456.789-10', atracao: 'Ópera de Arame & Vale da Música', categoria: 'Inteira', valor: 90.00, status: 'Pendente', dataCompra: '24/11/2026 10:30', validadoEm: null },
  { id: 'ING8002', orderId: 'CWB-102931', turista: 'Carlos Souza', cpf: '444.555.666-00', atracao: 'Jardim Botânico de Curitiba', categoria: 'Meia-entrada', valor: 50.00, status: 'Validado', dataCompra: '24/11/2026 14:15', validadoEm: '24/11/2026 15:30' },
  { id: 'ING8003', orderId: 'CWB-102900', turista: 'Ana Maria', cpf: '777.888.999-55', atracao: 'Ópera de Arame & Vale da Música', categoria: 'Inteira', valor: 90.00, status: 'Cancelado', dataCompra: '23/11/2026 11:00', validadoEm: null },
  { id: 'ING8005', orderId: 'CWB-102932', turista: 'Beatriz Ramos', cpf: '777.888.999-55', atracao: 'Passeio de Trem Serra Verde Express', categoria: 'Inteira', valor: 219.00, status: 'Pendente', dataCompra: '25/11/2026 09:00', validadoEm: null },
  { id: 'ING8006', orderId: 'CWB-102932', turista: 'Beatriz Ramos', cpf: '777.888.999-55', atracao: 'Passeio de Trem Serra Verde Express', categoria: 'Inteira', valor: 219.00, status: 'Pendente', dataCompra: '25/11/2026 09:00', validadoEm: null }
];

const INITIAL_CHECKINS = [
  { id: 'ING8002', turista: 'Carlos Souza', atracao: 'Jardim Botânico de Curitiba', dataHora: '24/11/2026 15:30', operador: 'Portaria Principal' }
];

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('cwb360_sync_update', { detail: { key } }));
  } catch (e) {
    console.error('Erro ao persistir sincronização:', e);
  }
}

export const platformSyncService = {
  // === 1. PARCEIROS B2B & RASTREAMENTO (?ref=) ===
  getPartners() {
    return readJson(KEYS.PARTNERS, B2B_PARTNERS_CATALOG);
  },

  captureReferralFromUrl() {
    if (typeof window === 'undefined') return this.getActiveReferral();
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref') || params.get('agency') || params.get('hotel');
    if (refCode) {
      return this.setActiveReferral(refCode);
    }
    return this.getActiveReferral();
  },

  setActiveReferral(refCode) {
    if (!refCode) {
      localStorage.removeItem(KEYS.REF_TRACKING);
      window.dispatchEvent(new CustomEvent('cwb360_sync_update', { detail: { key: KEYS.REF_TRACKING } }));
      return null;
    }
    const partners = this.getPartners();
    const matched = partners.find(p => p.code.toLowerCase() === refCode.toLowerCase() || p.id.toLowerCase() === refCode.toLowerCase());
    const partnerObj = matched || {
      id: refCode,
      code: refCode,
      name: `Parceiro Credenciado (${refCode.toUpperCase()})`,
      type: 'PARCEIRO',
      commissionPct: 10,
      discountPct: 10,
      scans: 1
    };

    // Increment scan count
    if (matched) {
      const updated = partners.map(p => p.id === matched.id ? { ...p, scans: (p.scans || 0) + 1 } : p);
      writeJson(KEYS.PARTNERS, updated);
    }

    writeJson(KEYS.REF_TRACKING, partnerObj);
    return partnerObj;
  },

  getActiveReferral() {
    try {
      const raw = localStorage.getItem(KEYS.REF_TRACKING);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // === 2. CATÁLOGO DE ATRAÇÕES SINCRONIZADO (Backoffice <-> Site) ===
  getCustomAttractions() {
    return readJson(KEYS.ATTRACTIONS, []);
  },

  addAttraction(newAttraction) {
    const current = this.getCustomAttractions();
    const item = {
      id: newAttraction.id || `atr-${Date.now()}`,
      title: newAttraction.nome || newAttraction.title,
      nome: newAttraction.nome || newAttraction.title,
      subtitle: newAttraction.local || newAttraction.subtitle || 'Curitiba • PR',
      location: newAttraction.local || newAttraction.location || 'Curitiba • PR',
      parceiro: newAttraction.parceiro || 'Parque Jaime Lerner S/A',
      category: newAttraction.category || 'parques',
      topic: newAttraction.topic || 'parques',
      categories: [newAttraction.category || 'parques', 'pacotes'],
      price: Number(newAttraction.valor || newAttraction.price || 45.00),
      originalPrice: Number(newAttraction.valor || newAttraction.price || 45.00) * 1.25,
      isFree: Number(newAttraction.valor || newAttraction.price || 0) === 0,
      discount: 'NOVO 360°',
      rating: 5.0,
      reviewsCount: 18,
      duration: '2 a 3 horas',
      image: newAttraction.foto || newAttraction.image || '/jardim_botanico.jpg',
      gallery: [newAttraction.foto || newAttraction.image || '/jardim_botanico.jpg'],
      description: newAttraction.release || newAttraction.description || 'Atração oficial integrada via Backoffice Curitiba 360°.',
      features: ['Ingresso Digital QR Code', 'Validação na Catraca 360', 'Parceiro Oficial Verificado'],
      status: newAttraction.status || 'Ativo',
      dataCriacao: new Date().toLocaleDateString('pt-BR')
    };
    const updated = [item, ...current];
    writeJson(KEYS.ATTRACTIONS, updated);
    return item;
  },

  // === 3. PEDIDOS, CHECKOUT COM SPLIT B2B E EMISSÃO DE VOUCHERS QR CODE ===
  getOrders() {
    return readJson(KEYS.ORDERS, INITIAL_ORDERS);
  },

  getVouchers() {
    return readJson(KEYS.VOUCHERS, INITIAL_VOUCHERS);
  },

  getCheckins() {
    return readJson(KEYS.CHECKINS, INITIAL_CHECKINS);
  },

  createOrder({ cartItems, paymentMethod = 'PIX', touristName = 'Visitante Curitiba 360', touristEmail = 'turista@curitiba360.com.br', touristCpf = '111.222.333-44', touristPhone = '(41) 99999-0000', couponCode = '' }) {
    const activeRef = this.getActiveReferral();
    const orderId = 'CWB-' + Math.floor(100000 + Math.random() * 900000);
    const nowStr = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

    const rawTotal = cartItems.reduce((acc, item) => acc + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
    const discountPct = activeRef ? (activeRef.discountPct || 10) : (couponCode ? 10 : 0);
    const discountAmount = Number(((rawTotal * discountPct) / 100).toFixed(2));
    const finalTotal = Math.max(0, Number((rawTotal - discountAmount).toFixed(2)));

    const commissionPct = activeRef ? (activeRef.commissionPct || 12) : 10;
    const comissaoRs = Number(((finalTotal * commissionPct) / 100).toFixed(2));
    const splitPlataformaRs = Number((finalTotal * 0.10).toFixed(2));
    const splitAtracaoRs = Number(Math.max(0, finalTotal - comissaoRs - splitPlataformaRs).toFixed(2));

    const generatedVouchers = [];
    cartItems.forEach((item) => {
      const qty = Number(item.quantity || 1);
      for (let i = 0; i < qty; i++) {
        const voucherCode = 'ING' + Math.floor(1000 + Math.random() * 9000);
        generatedVouchers.push({
          id: voucherCode,
          code: voucherCode,
          orderId,
          turista: touristName,
          cpf: touristCpf,
          atracao: item.title || item.name,
          title: item.title || item.name,
          categoria: item.ticketType || 'Inteira',
          valor: Number(item.price || 0),
          status: 'Pendente',
          dataCompra: nowStr,
          validadoEm: null
        });
      }
    });

    const newOrder = {
      id: orderId,
      dataHora: nowStr,
      turistaNome: touristName,
      turistaEmail: touristEmail,
      turistaCpf: touristCpf,
      telefone: touristPhone,
      atracao: cartItems.map(i => i.title || i.name).join(' + '),
      qtd: generatedVouchers.length,
      valorBruto: rawTotal,
      descontoRs: discountAmount,
      valorTotal: finalTotal,
      cupom: couponCode || (activeRef ? `${activeRef.code.toUpperCase()}10` : '-'),
      parceiroRef: activeRef ? activeRef.code : 'direto',
      parceiroNome: activeRef ? activeRef.name : 'Venda Direta Portal 360',
      comissaoRs,
      comissaoPct: commissionPct,
      splitPlataformaRs,
      splitAtracaoRs,
      status: 'Confirmado',
      formaPagamento: paymentMethod === 'pix' || paymentMethod === 'PIX' ? 'PIX' : 'Cartão de Crédito',
      vouchers: generatedVouchers.map(v => v.id)
    };

    const allOrders = [newOrder, ...this.getOrders()];
    const allVouchers = [...generatedVouchers, ...this.getVouchers()];

    writeJson(KEYS.ORDERS, allOrders);
    writeJson(KEYS.VOUCHERS, allVouchers);

    return {
      orderId,
      order: newOrder,
      vouchers: generatedVouchers
    };
  },

  cancelOrder(orderId, reason = 'Solicitação do cliente') {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status: 'Cancelado Total', motivoCancelamento: reason } : o);
    const vouchers = this.getVouchers().map(v => v.orderId === orderId ? { ...v, status: 'Cancelado' } : v);
    writeJson(KEYS.ORDERS, orders);
    writeJson(KEYS.VOUCHERS, vouchers);
  },

  // === 4. VALIDADOR DE CATRACA / SCANNER QR CODE ===
  validateVoucher(voucherCode) {
    const cleanCode = (voucherCode || '').toUpperCase().trim();
    const vouchers = this.getVouchers();
    const index = vouchers.findIndex(v => v.id.toUpperCase() === cleanCode);

    if (index === -1) {
      return { status: 'erro', message: 'Código não localizado no banco Curitiba 360.', voucher: null };
    }

    const target = vouchers[index];
    if (target.status === 'Cancelado') {
      return { status: 'erro', message: 'Este ingresso foi cancelado/estornado.', voucher: target };
    }

    if (target.status === 'Validado') {
      return { status: 'duplicado', message: `Ingresso já utilizado em ${target.validadoEm || 'data anterior'}.`, voucher: target };
    }

    const nowStr = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    const updatedVoucher = { ...target, status: 'Validado', validadoEm: nowStr };
    vouchers[index] = updatedVoucher;
    writeJson(KEYS.VOUCHERS, vouchers);

    const checkinRecord = {
      id: updatedVoucher.id,
      turista: updatedVoucher.turista,
      atracao: updatedVoucher.atracao,
      dataHora: nowStr,
      operador: 'Catraca / Scanner 360'
    };
    const checkins = [checkinRecord, ...this.getCheckins()];
    writeJson(KEYS.CHECKINS, checkins);

    return { status: 'sucesso', message: 'Acesso liberado! Check-in registrado em tempo real.', voucher: updatedVoucher, checkinRecord };
  },

  // === 5. PERFIL RBAC ATIVO (SELETOR MULTI-PERFIL) ===
  getActiveRole() {
    return localStorage.getItem(KEYS.ACTIVE_ROLE) || 'ADMINISTRADOR';
  },

  setActiveRole(role) {
    localStorage.setItem(KEYS.ACTIVE_ROLE, role);
    window.dispatchEvent(new CustomEvent('cwb360_sync_update', { detail: { key: KEYS.ACTIVE_ROLE, role } }));
    return role;
  },

  // === 6. SUBSCRIBE PARA ATUALIZAÇÃO EM TEMPO REAL ===
  subscribe(callback) {
    const handler = (e) => callback(e.detail);
    window.addEventListener('cwb360_sync_update', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('cwb360_sync_update', handler);
      window.removeEventListener('storage', handler);
    };
  }
};

export default platformSyncService;
