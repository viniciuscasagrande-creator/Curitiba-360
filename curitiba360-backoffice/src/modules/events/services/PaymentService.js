import { PaymentRepository } from '../repositories/PaymentRepository';

export const PaymentService = {
  async createPix(paymentDetails) {
    const pixCopyPaste = `00020126580014BR.GOV.BCB.PIX0136curitiba360-pix-${Date.now()}520400005303986540${paymentDetails.amount.toFixed(2)}5802BR5915CURITIBA3606008CURITIBA62070503***6304`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pixCopyPaste)}`;

    const payment = await PaymentRepository.createPayment({
      method: 'pix',
      amount: paymentDetails.amount,
      orderId: paymentDetails.orderId,
      status: 'pending',
      pixCopyPaste,
      qrCodeUrl,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutos
    });

    return payment;
  },

  async createCard(paymentDetails) {
    const payment = await PaymentRepository.createPayment({
      method: 'card',
      amount: paymentDetails.amount,
      orderId: paymentDetails.orderId,
      cardBrand: paymentDetails.cardBrand || 'Visa',
      lastDigits: paymentDetails.cardNumber ? paymentDetails.cardNumber.slice(-4) : '4242',
      installments: paymentDetails.installments || 1,
      status: 'approved' // Simulação instantânea para MVP
    });

    return payment;
  },

  async createWallet(paymentDetails) {
    const payment = await PaymentRepository.createPayment({
      method: 'wallet',
      amount: paymentDetails.amount,
      orderId: paymentDetails.orderId,
      walletAccount: paymentDetails.walletAccount || 'Carteira Curitiba 360',
      status: 'approved'
    });

    return payment;
  },

  async status(paymentId) {
    return PaymentRepository.getPaymentStatus(paymentId);
  },

  async cancel(paymentId) {
    return PaymentRepository.updateStatus(paymentId, 'cancelled');
  },

  async refund(paymentId) {
    return PaymentRepository.updateStatus(paymentId, 'refunded');
  }
};
