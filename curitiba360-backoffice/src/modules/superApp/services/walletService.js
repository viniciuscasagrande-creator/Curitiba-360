import { getSuperAppData, saveSuperAppData } from "../repositories/superAppRepository";

export const walletService = {
  async getWallet() {
    const data = await getSuperAppData();
    return { success: true, data: data.wallet };
  },

  async addFunds(amount) {
    const data = await getSuperAppData();
    data.wallet.availableBalance += amount;
    data.wallet.transactions.unshift({
      id: "tx-" + Date.now(),
      type: "top_up",
      amount,
      description: "Recarga de Saldo via PIX",
      date: new Date().toISOString()
    });
    data.summary.walletBalance = data.wallet.availableBalance;
    await saveSuperAppData(data);
    return { success: true, data: data.wallet };
  },

  async payWithWallet(amount, description) {
    const data = await getSuperAppData();
    if (data.wallet.availableBalance < amount) {
      return { success: false, message: "Saldo insuficiente na carteira." };
    }
    data.wallet.availableBalance -= amount;
    data.wallet.transactions.unshift({
      id: "tx-" + Date.now(),
      type: "payment_out",
      amount: -amount,
      description,
      date: new Date().toISOString()
    });
    data.summary.walletBalance = data.wallet.availableBalance;
    await saveSuperAppData(data);
    return { success: true, data: data.wallet };
  }
};
