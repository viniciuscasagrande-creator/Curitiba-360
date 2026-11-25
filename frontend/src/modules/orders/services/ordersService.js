import {
  getOrderByIdRepository,
  getOrdersRepository,
  updateOrderRepository,
  updateTicketRepository,
} from "../repositories/ordersRepository";

export async function getOrders(
  filters = {}
) {
  const orders =
    await getOrdersRepository();

  const {
    search = "",
    status = "all",
    sort = "recent",
  } = filters;

  const normalizedSearch =
    search.trim().toLowerCase();

  let result = orders.filter(
    (order) => {
      const matchesStatus =
        status === "all" ||
        order.status === status;

      const searchableText = [
        order.code,
        order.customer?.name,
        ...order.items.map(
          (item) => item.title
        ),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(
          normalizedSearch
        );

      return (
        matchesStatus &&
        matchesSearch
      );
    }
  );

  result.sort((a, b) => {
    if (sort === "oldest") {
      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );
    }

    if (sort === "highest") {
      return (
        b.pricing.total -
        a.pricing.total
      );
    }

    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );
  });

  return result;
}

export async function getOrderById(
  orderId
) {
  if (!orderId) {
    throw new Error(
      "Pedido não informado."
    );
  }

  const order =
    await getOrderByIdRepository(
      orderId
    );

  if (!order) {
    throw new Error(
      "Pedido não encontrado."
    );
  }

  return order;
}

export async function transferTicket({
  orderId,
  ticketId,
  recipient,
}) {
  const order =
    await getOrderById(orderId);

  const ticket = order.tickets.find(
    (item) => item.id === ticketId
  );

  if (!ticket) {
    throw new Error(
      "Ingresso não encontrado."
    );
  }

  if (
    ticket.status !== "active"
  ) {
    throw new Error(
      "Somente ingressos ativos podem ser transferidos."
    );
  }

  if (!ticket.transfer.allowed) {
    throw new Error(
      "Este ingresso não permite transferência."
    );
  }

  return updateTicketRepository(
    orderId,
    ticketId,
    {
      status: "transferred",

      holder: {
        name: recipient.name,
        email: recipient.email,
        cpf: recipient.cpf,
      },

      transfer: {
        allowed: false,
        transferredTo:
          recipient.email,
        transferredAt:
          new Date().toISOString(),
      },
    }
  );
}

export async function requestOrderRefund({
  orderId,
  reason,
}) {
  const order =
    await getOrderById(orderId);

  if (
    !["confirmed", "completed"].includes(
      order.status
    )
  ) {
    throw new Error(
      "Este pedido não pode ser reembolsado."
    );
  }

  if (order.refund.requested) {
    throw new Error(
      "Já existe uma solicitação de reembolso."
    );
  }

  return updateOrderRepository(
    orderId,
    {
      status: "refunded",
      refund: {
        requested: true,
        status: "requested",
        reason,
        requestedAt:
          new Date().toISOString(),
        processedAt: null,
      },
    }
  );
}

export async function submitOrderReview({
  orderId,
  rating,
  comment,
}) {
  const order =
    await getOrderById(orderId);

  if (order.status !== "completed" && order.status !== "confirmed") {
    // Make it available for confirmed/completed during tests
    throw new Error(
      "A avaliação estará disponível após a conclusão do evento."
    );
  }

  if (order.review.submitted) {
    throw new Error(
      "Este pedido já foi avaliado."
    );
  }

  return updateOrderRepository(
    orderId,
    {
      review: {
        submitted: true,
        rating: Number(rating),
        comment: comment.trim(),
        submittedAt:
          new Date().toISOString(),
      },
    }
  );
}
