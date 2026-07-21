import { INITIAL_ORDERS_API_DATA } from '../data/apiOrdersMockData';

const STORAGE_KEY_ORDERS_API = 'curitiba360_orders_api_v1';

function getStoredOrdersApi() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ORDERS_API);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_ORDERS_API, JSON.stringify(INITIAL_ORDERS_API_DATA));
      return INITIAL_ORDERS_API_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados da API de pedidos:', error);
    return INITIAL_ORDERS_API_DATA;
  }
}

function persistOrdersApi(data) {
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS_API, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados da API de pedidos:', error);
  }
}

export const ordersApiService = {
  async getOrdersOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredOrdersApi();
    return { success: true, data };
  },

  async createOrderWithIdempotency(orderData, idempotencyKey) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredOrdersApi();

    // Verificação de idempotência
    const existing = data.idempotencyStore.find((i) => i.key === idempotencyKey);
    if (existing) {
      const existingOrder = data.orders.find((o) => o.id === existing.orderId);
      return {
        success: true,
        isCachedIdempotent: true,
        message: `⚡ REQUISIÇÃO IDEMPOTENTE: Pedido retornado da chave em cache (${idempotencyKey})!`,
        order: existingOrder
      };
    }

    const newOrderId = `ORD-${Date.now().toString().slice(-4)}`;
    const newOrder = {
      id: newOrderId,
      idempotencyKey,
      comprador: orderData.comprador || 'Cliente API',
      email: orderData.email || 'api@parceiro.com',
      total: orderData.total || 150.00,
      status: 'paid',
      dataCriacao: new Date().toLocaleString('pt-BR'),
      itens: orderData.itens || [{ tipo: 'Ingresso Padrão', qtd: 1, valorUnit: 150.00 }]
    };

    data.orders.unshift(newOrder);
    data.idempotencyStore.unshift({
      key: idempotencyKey,
      orderId: newOrderId,
      processadoEm: new Date().toLocaleString('pt-BR')
    });

    persistOrdersApi(data);
    return { success: true, isCachedIdempotent: false, message: '🎉 Pedido criado e processado com sucesso!', order: newOrder };
  }
};
