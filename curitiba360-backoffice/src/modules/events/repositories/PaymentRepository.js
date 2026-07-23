const PAYMENTS_KEY = 'curitiba360:payments';

function getStoredPayments() {
  try {
    const data = localStorage.getItem(PAYMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao ler PaymentRepository:', e);
    return [];
  }
}

function persistPayments(payments) {
  try {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
  } catch (e) {
    console.error('Erro ao persistir PaymentRepository:', e);
  }
}

export const PaymentRepository = {
  async createPayment(paymentData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const payments = getStoredPayments();
    const newPayment = {
      id: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: paymentData.status || 'pending', // created, pending, processing, approved, failed, expired, cancelled, refunded
      ...paymentData
    };
    payments.unshift(newPayment);
    persistPayments(payments);
    return newPayment;
  },

  async getPaymentStatus(paymentId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const payments = getStoredPayments();
    const payment = payments.find((p) => p.id === paymentId);
    return payment ? payment.status : 'not_found';
  },

  async updateStatus(paymentId, status) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const payments = getStoredPayments();
    const index = payments.findIndex((p) => p.id === paymentId);
    if (index >= 0) {
      payments[index].status = status;
      payments[index].updatedAt = new Date().toISOString();
      persistPayments(payments);
      return payments[index];
    }
    return null;
  }
};
