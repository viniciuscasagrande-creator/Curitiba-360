import {
  partnerOperationsMock,
} from "../mocks/partnerOperationsMock";

export const OPERATIONS_STORAGE_KEY =
  "curitiba360:partner-operations";

export const OPERATIONS_CHANGED_EVENT =
  "curitiba360:partner-operations-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(
      OPERATIONS_CHANGED_EVENT,
      {
        detail: clone(data),
      }
    )
  );
}

function saveOperations(data) {
  const nextData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(
    OPERATIONS_STORAGE_KEY,
    JSON.stringify(nextData)
  );

  emitChanged(nextData);

  return clone(nextData);
}

export async function getOperationsRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 150)
  );

  try {
    const stored = localStorage.getItem(
      OPERATIONS_STORAGE_KEY
    );

    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(
      OPERATIONS_STORAGE_KEY
    );
  }

  return saveOperations(
    partnerOperationsMock
  );
}

export async function getTicketByCodeRepository(
  code
) {
  const data =
    await getOperationsRepository();

  return (
    data.tickets.find(
      (ticket) =>
        ticket.code === code ||
        ticket.securePayload === code
    ) || null
  );
}

export async function updateTicketRepository(
  ticketId,
  updates
) {
  const data =
    await getOperationsRepository();

  const tickets = data.tickets.map(
    (ticket) =>
      ticket.id === ticketId
        ? {
            ...ticket,
            ...updates,
            updatedAt:
              new Date().toISOString(),
          }
        : ticket
  );

  return saveOperations({
    ...data,
    tickets,
  });
}

export async function addCheckInRecordRepository(
  record
) {
  const data =
    await getOperationsRepository();

  return saveOperations({
    ...data,

    checkIns: [
      {
        id:
          record.id ||
          Math.random().toString(),
        ...record,
      },

      ...(data.checkIns || []),
    ],
  });
}
