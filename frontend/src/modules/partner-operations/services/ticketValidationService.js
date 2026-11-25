import {
  addCheckInRecordRepository,
  getTicketByCodeRepository,
  updateTicketRepository,
} from "../repositories/partnerOperationsRepository";

export async function validateTicket({
  code,
  productId,
  sessionId,
  operatorId,
  deviceId,
  gate,
  mode = "qr_code",
}) {
  if (!code?.trim()) {
    throw new Error(
      "Informe ou escaneie um ingresso."
    );
  }

  const ticket =
    await getTicketByCodeRepository(
      code.trim()
    );

  if (!ticket) {
    return {
      result: "invalid",
      ticket: null,
    };
  }

  if (
    ticket.productId !== productId
  ) {
    return {
      result: "invalid",
      ticket,
    };
  }

  if (
    sessionId &&
    ticket.sessionId !== sessionId
  ) {
    return {
      result: "wrong_session",
      ticket,
    };
  }

  if (
    ticket.status === "used" ||
    ticket.checkIn.checkedIn
  ) {
    return {
      result: "duplicate",
      ticket,
    };
  }

  if (
    [
      "blocked",
      "cancelled",
      "refunded",
      "expired",
    ].includes(ticket.status)
  ) {
    return {
      result: ticket.status,
      ticket,
    };
  }

  if (ticket.status !== "active") {
    return {
      result: "invalid",
      ticket,
    };
  }

  const checkedInAt =
    new Date().toISOString();

  const nextCheckIn = {
    checkedIn: true,
    checkedInAt,
    gate,
    deviceId,
    operatorId,
    validationMode:
      mode === "offline"
        ? "offline"
        : mode === "manual"
          ? "manual"
          : "online",
  };

  await updateTicketRepository(
    ticket.id,
    {
      status: "used",
      checkIn: nextCheckIn,
    }
  );

  await addCheckInRecordRepository({
    ticketId: ticket.id,
    orderId: ticket.orderId,
    partnerId: ticket.partnerId,
    productId: ticket.productId,
    sessionId: ticket.sessionId,
    operatorId,
    deviceId,
    gate,
    mode,
    result: "approved",
    checkedInAt,
    location: {
      latitude: null,
      longitude: null,
    },
    synced: mode !== "offline",
    syncedAt:
      mode !== "offline"
        ? checkedInAt
        : null,
  });

  return {
    result: "approved",
    ticket: {
      ...ticket,
      status: "used",
      checkIn: nextCheckIn,
    },
  };
}
