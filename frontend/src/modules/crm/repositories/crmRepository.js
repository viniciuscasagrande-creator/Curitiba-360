import { crmMock } from "../mocks/crmMock";

export const CRM_STORAGE_KEY = "curitiba360:crm";
export const CRM_CHANGED_EVENT = "curitiba360:crm-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(new CustomEvent(CRM_CHANGED_EVENT, { detail: clone(data) }));
}

function saveCRM(data) {
  localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(data));
  emitChanged(data);
  return clone(data);
}

export async function getCRMRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  try {
    const stored = localStorage.getItem(CRM_STORAGE_KEY);
    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(CRM_STORAGE_KEY);
  }
  return saveCRM(crmMock);
}

export async function createCustomerRepository(customer) {
  const data = await getCRMRepository();
  const newCustomer = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    createdAt: new Date().toISOString(),
    status: "active",
    score: 50,
    level: "Bronze",
    tags: [],
    ...customer
  };
  data.customers = [newCustomer, ...(data.customers || [])];
  return saveCRM(data);
}

export async function createTicketRepository(ticket) {
  const data = await getCRMRepository();
  const newTicket = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    createdAt: new Date().toISOString(),
    status: "open",
    priority: "normal",
    ...ticket
  };
  data.tickets = [newTicket, ...(data.tickets || [])];
  return saveCRM(data);
}
