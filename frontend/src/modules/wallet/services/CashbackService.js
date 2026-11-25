import { WalletRepository } from '../repositories/WalletRepository';

export const CashbackService = {
  async getCashbackBalance() {
    const wallet = await WalletRepository.getWallet();
    return wallet.cashback || 0;
  },

  async getCashbackHistory() {
    const transactions = await WalletRepository.getTransactions();
    return transactions.filter((tx) => tx.type === 'cashback');
  },

  async useCashback(amount, description = 'Uso de cashback em compra') {
    const wallet = await WalletRepository.getWallet();
    if (wallet.cashback < amount) {
      throw new Error('Saldo de cashback insuficiente.');
    }

    // Deduzir cashback e registrar movimentação
    const updatedWallet = await WalletRepository.addTransaction({
      type: 'debit',
      amount: -amount,
      description,
      status: 'approved'
    });

    return updatedWallet;
  }
};
