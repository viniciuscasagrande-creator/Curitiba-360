import { ordersMock } from "../mocks/ordersMock";

export const ORDERS_STORAGE_KEY =
  "curitiba360:orders";

export const ORDERS_CHANGED_EVENT =
  "curitiba360:orders-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitOrdersChanged(orders) {
  window.dispatchEvent(
    new CustomEvent(
      ORDERS_CHANGED_EVENT,
      {
        detail: clone(orders),
      }
    )
  );
}

function saveOrders(orders) {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders)
  );

  emitOrdersChanged(orders);

  return clone(orders);
}

export async function getOrdersRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 200)
  );

  try {
    const stored =
      localStorage.getItem(
        ORDERS_STORAGE_KEY
      );

    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(
      ORDERS_STORAGE_KEY
    );
  }

  return saveOrders(ordersMock);
}

export async function getOrderByIdRepository(
  orderId
) {
  const orders =
    await getOrdersRepository();

  return (
    orders.find(
      (order) => order.id === orderId
    ) || null
  );
}

export async function updateOrderRepository(
  orderId,
  updates
) {
  const orders =
    await getOrdersRepository();

  const nextOrders = orders.map(
    (order) =>
      order.id === orderId
        ? {
            ...order,
            ...updates,
            updatedAt:
              new Date().toISOString(),
          }
        : order
  );

  saveOrders(nextOrders);

  return clone(
    nextOrders.find(
      (order) => order.id === orderId
    )
  );
}

export async function updateTicketRepository(
  orderId,
  ticketId,
  updates
) {
  const order =
    await getOrderByIdRepository(orderId);

  if (!order) {
    throw new Error(
      "Pedido não encontrado."
    );
  }

  const tickets = order.tickets.map(
    (ticket) =>
      ticket.id === ticketId
        ? {
            ...ticket,
            ...updates,
          }
        : ticket
  );

  return updateOrderRepository(
    orderId,
    {
      tickets,
    }
  );
}

export async function saveOrderRepository(newOrder) {
  const orders = await getOrdersRepository();
  const nextOrders = [newOrder, ...orders.filter((o) => o.id !== newOrder.id)];
  saveOrders(nextOrders);
  return clone(newOrder);
}
export {
  saveOrders
};
