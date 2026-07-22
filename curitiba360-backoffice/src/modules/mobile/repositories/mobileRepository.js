import { initialMobileDevices, initialMobileTickets } from "../mocks/mobileMock";

export const DEVICES_STORAGE_KEY = "curitiba360:mobile_devices";
export const TICKETS_STORAGE_KEY = "curitiba360:mobile_tickets";
export const MOBILE_CHANGED_EVENT = "curitiba360:mobile-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(MOBILE_CHANGED_EVENT, {
      detail: clone(data),
    })
  );
}

function saveDevices(data) {
  localStorage.setItem(DEVICES_STORAGE_KEY, JSON.stringify(data));
  emitChanged({ type: "devices", data });
  return clone(data);
}

function saveTickets(data) {
  localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(data));
  emitChanged({ type: "tickets", data });
  return clone(data);
}

export async function getMobileDevicesRepository() {
  try {
    const stored = localStorage.getItem(DEVICES_STORAGE_KEY);
    if (stored) return clone(JSON.parse(stored));
  } catch {
    localStorage.removeItem(DEVICES_STORAGE_KEY);
  }
  return saveDevices(initialMobileDevices);
}

export async function getMobileTicketsRepository() {
  try {
    const stored = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (stored) return clone(JSON.parse(stored));
  } catch {
    localStorage.removeItem(TICKETS_STORAGE_KEY);
  }
  return saveTickets(initialMobileTickets);
}

export async function registerMobileDeviceRepository(device) {
  const list = await getMobileDevicesRepository();
  const newDevice = {
    id: crypto.randomUUID ? crypto.randomUUID() : `dev-${Math.random().toString()}`,
    registeredAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
    status: "active",
    ...device
  };
  list.push(newDevice);
  saveDevices(list);
  return newDevice;
}

export async function revokeMobileDeviceRepository(deviceId) {
  const list = await getMobileDevicesRepository();
  const filtered = list.filter(d => d.id !== deviceId);
  saveDevices(filtered);
}

export async function checkInOfflineTicketRepository(ticketCode, overrideReason = "") {
  const tickets = await getMobileTicketsRepository();
  const index = tickets.findIndex(t => t.ticketCode === ticketCode);
  if (index !== -1) {
    if (tickets[index].status === "used" && !overrideReason) {
      throw new Error("TICKET_ALREADY_USED");
    }
    tickets[index].status = "used";
    tickets[index].overrideReason = overrideReason;
    saveTickets(tickets);
    return tickets[index];
  }
  throw new Error("TICKET_NOT_FOUND");
}
