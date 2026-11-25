import { WalletRepository } from '../repositories/WalletRepository';

export const WalletService = {
  async getWallet() {
    return WalletRepository.getWallet();
  },

  async getTransactions(filterPeriod = 'all') {
    const list = await WalletRepository.getTransactions();
    if (filterPeriod === 'all') return list;

    const now = new Date();
    let limitDays = 30;
    if (filterPeriod === 'today') limitDays = 1;
    if (filterPeriod === '7days') limitDays = 7;
    if (filterPeriod === '30days') limitDays = 30;
    if (filterPeriod === '90days') limitDays = 90;

    const cutoff = new Date(now.getTime() - limitDays * 24 * 60 * 60 * 1000);
    return list.filter((tx) => new Date(tx.createdAt) >= cutoff);
  },

  async createPixRecharge(amount) {
    if (!amount || amount <= 0) throw new Error('Informe um valor válido para recarga.');
    return WalletRepository.createPix(amount);
  },

  async confirmPixRecharge(amount) {
    return WalletRepository.confirmPix(amount);
  },

  async getCards() {
    return WalletRepository.getCards();
  },

  async saveCard(cardData) {
    if (!cardData.number || cardData.number.length < 13) {
      throw new Error('Número de cartão inválido.');
    }
    return WalletRepository.saveCard(cardData);
  },

  async getCoupons() {
    return WalletRepository.getCoupons();
  },

  async getBenefits() {
    return WalletRepository.getBenefits();
  }
};
