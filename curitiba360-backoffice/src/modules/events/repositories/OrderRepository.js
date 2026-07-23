const ORDERS_KEY = 'curitiba360:orders';

function getStoredOrders() {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erro ao ler OrderRepository:', e);
    return [];
  }
}

function persistOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Erro ao persistir OrderRepository:', e);
  }
}

export const OrderRepository = {
  async create(orderData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const orders = getStoredOrders();
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: orderData.status || 'created', // created, pending, processing, approved, failed, expired, cancelled, refunded
      ...orderData
    };
    orders.unshift(newOrder);
    persistOrders(orders);
    return newOrder;
  },

  async find(orderId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const orders = getStoredOrders();
    return orders.find((o) => o.id === orderId) || null;
  },

  async updateStatus(orderId, newStatus) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const orders = getStoredOrders();
    const index = orders.findIndex((o) => o.id === orderId);
    if (index >= 0) {
      orders[index].status = newStatus;
      orders[index].updatedAt = newDate().toISOString();
      persistOrders(orders);
      return orders[index];
    }
    return null;
  },

  async cancel(orderId) {
    return this.updateStatus(orderId, 'cancelled');
  },

  async history() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getStoredOrders();
  }
};
