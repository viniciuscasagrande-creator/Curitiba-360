const WALLET_KEY = 'curitiba360:wallet_v1';
const TRANSACTIONS_KEY = 'curitiba360:wallet_transactions_v1';
const CARDS_KEY = 'curitiba360:wallet_cards_v1';
const COUPONS_KEY = 'curitiba360:wallet_coupons_v1';
const BENEFITS_KEY = 'curitiba360:wallet_benefits_v1';

const INITIAL_WALLET = {
  id: 'WLT-360-01',
  userId: 'usr-default',
  balance: 245.50,
  cashback: 35.80,
  blocked: 0.00,
  currency: 'BRL',
  updatedAt: new Date().toISOString()
};

const INITIAL_TRANSACTIONS = [
  {
    id: 'TX-901',
    walletId: 'WLT-360-01',
    type: 'cashback', // credit, debit, cashback, refund, pix, purchase, withdraw
    amount: 15.40,
    description: 'Cashback - Passeio Trem Morretes',
    status: 'approved', // pending, approved, cancelled, failed
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'TX-902',
    walletId: 'WLT-360-01',
    type: 'purchase',
    amount: -120.00,
    description: 'Compra Ingresso - Festival Cerveja',
    status: 'approved',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'TX-903',
    walletId: 'WLT-360-01',
    type: 'pix',
    amount: 200.00,
    description: 'Recarga via PIX',
    status: 'approved',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'TX-904',
    walletId: 'WLT-360-01',
    type: 'refund',
    amount: 50.00,
    description: 'Estorno Reserva Museu MON',
    status: 'approved',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];

const INITIAL_CARDS = [
  {
    id: 'CRD-1',
    token: 'tok_visa_4242',
    brand: 'Visa',
    last4: '4242',
    holderName: 'Vinicius Casagrande',
    expiryMasked: '12/28',
    isDefault: true
  },
  {
    id: 'CRD-2',
    token: 'tok_master_8888',
    brand: 'Mastercard',
    last4: '8888',
    holderName: 'Vinicius Casagrande',
    expiryMasked: '08/29',
    isDefault: false
  }
];

const INITIAL_COUPONS = [
  {
    id: 'CPN-1',
    code: 'CURITIBA10',
    title: '10% OFF em Eventos',
    description: '10% de desconto em qualquer ingresso cultural da cidade.',
    discountType: 'percentage', // percentage, fixed
    value: 10,
    expiresAt: '2026-12-31',
    active: true
  },
  {
    id: 'CPN-2',
    code: 'SUPER360',
    title: 'R$ 25 OFF em Passeios',
    description: 'Desconto fixo de R$ 25 para passeios de ecoinovação.',
    discountType: 'fixed',
    value: 25,
    expiresAt: '2026-10-30',
    active: true
  }
];

const INITIAL_BENEFITS = [
  {
    id: 'BNF-1',
    name: 'Desconto Linha Turismo',
    description: '20% de desconto no embarque da Linha Turismo Curitiba.',
    company: 'URBS Curitiba',
    category: 'Transporte',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
    expiresAt: '2026-12-31',
    active: true
  },
  {
    id: 'BNF-2',
    name: 'Entrada Grátis MON no Aniversário',
    description: 'Entrada gratuita no Museu Oscar Niemeyer no mês do seu aniversário.',
    company: 'Museu Oscar Niemeyer',
    category: 'Cultura',
    imageUrl: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=800&auto=format&fit=crop',
    expiresAt: '2026-12-31',
    active: true
  }
];

function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(data);
  } catch (e) {
    return fallback;
  }
}

function persistData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Erro ao salvar ${key}:`, e);
  }
}

export const WalletRepository = {
  async getWallet() {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredData(WALLET_KEY, INITIAL_WALLET);
  },

  async getTransactions() {
    await new Promise((r) => setTimeout(r, 100));
    return getStoredData(TRANSACTIONS_KEY, INITIAL_TRANSACTIONS);
  },

  async addTransaction(txData) {
    await new Promise((r) => setTimeout(r, 150));
    const wallet = await this.getWallet();
    const transactions = await this.getTransactions();

    const newTx = {
      id: `TX-${Date.now()}`,
      walletId: wallet.id,
      status: txData.status || 'approved',
      createdAt: new Date().toISOString(),
      ...txData
    };

    transactions.unshift(newTx);
    persistData(TRANSACTIONS_KEY, transactions);

    // Atualizar saldo
    if (newTx.status === 'approved') {
      if (newTx.type === 'cashback') {
        wallet.cashback += Math.abs(newTx.amount);
      } else {
        wallet.balance += newTx.amount;
      }
      wallet.updatedAt = new Date().toISOString();
      persistData(WALLET_KEY, wallet);
    }

    return newTx;
  },

  async createPix(amount) {
    await new Promise((r) => setTimeout(r, 150));
    const pixCopyPaste = `00020126580014BR.GOV.BCB.PIX0136curitiba360-wallet-${Date.now()}520400005303986540${amount.toFixed(2)}5802BR5915CURITIBA3606008CURITIBA62070503***6304`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCopyPaste)}`;

    return {
      pixId: `PIX-${Date.now()}`,
      amount,
      pixCopyPaste,
      qrCodeUrl,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString()
    };
  },

  async confirmPix(amount, description = 'Recarga via PIX') {
    return this.addTransaction({
      type: 'pix',
      amount,
      description,
      status: 'approved'
    });
  },

  async getCards() {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredData(CARDS_KEY, INITIAL_CARDS);
  },

  async saveCard(cardData) {
    await new Promise((r) => setTimeout(r, 150));
    const cards = await this.getCards();
    const newCard = {
      id: `CRD-${Date.now()}`,
      token: `tok_${cardData.brand.toLowerCase()}_${cardData.number.slice(-4)}`,
      brand: cardData.brand || 'Visa',
      last4: cardData.number.slice(-4),
      holderName: cardData.holderName,
      expiryMasked: cardData.expiry,
      isDefault: cards.length === 0
    };
    cards.push(newCard);
    persistData(CARDS_KEY, cards);
    return newCard;
  },

  async getCoupons() {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredData(COUPONS_KEY, INITIAL_COUPONS);
  },

  async getBenefits() {
    await new Promise((r) => setTimeout(r, 80));
    return getStoredData(BENEFITS_KEY, INITIAL_BENEFITS);
  }
};
