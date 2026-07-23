import { INITIAL_SUPPORT_DATA } from "../mocks/supportMockData";

export const SUPPORT_KEY = "curitiba360:support_data_v1";

function getStoredSupport() {
  const stored = localStorage.getItem(SUPPORT_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(SUPPORT_KEY, JSON.stringify(INITIAL_SUPPORT_DATA));
  return INITIAL_SUPPORT_DATA;
}

export async function getSupportSummary() {
  const data = getStoredSupport();
  return data.summary;
}

export async function getSupportTickets() {
  const data = getStoredSupport();
  return data.tickets;
}

export async function getSlas() {
  const data = getStoredSupport();
  return data.slas;
}

export async function getHealthScores() {
  const data = getStoredSupport();
  return data.healthScores;
}

export async function getArticles() {
  const data = getStoredSupport();
  return data.articles;
}

export async function getIncidents() {
  const data = getStoredSupport();
  return data.incidents;
}

export async function createTicketRepository(ticket) {
  const data = getStoredSupport();
  const newTicket = {
    id: `tick-${Date.now()}`,
    assignedAgent: null,
    slaStatus: "compliant",
    createdAt: new Date().toISOString(),
    ...ticket
  };
  data.tickets.unshift(newTicket);
  data.summary.openTickets = data.tickets.length;
  localStorage.setItem(SUPPORT_KEY, JSON.stringify(data));
  return data.tickets;
}

export async function updateTicketStatusRepository(id, status) {
  const data = getStoredSupport();
  data.tickets = data.tickets.map(t => t.id === id ? { ...t, status } : t);
  localStorage.setItem(SUPPORT_KEY, JSON.stringify(data));
  return data.tickets;
}

export async function saveArticleRepository(article) {
  const data = getStoredSupport();
  const newArt = {
    id: `art-${Date.now()}`,
    slug: article.title.toLowerCase().replace(/ /g, "-"),
    published: true,
    updatedAt: new Date().toISOString(),
    ...article
  };
  data.articles.unshift(newArt);
  localStorage.setItem(SUPPORT_KEY, JSON.stringify(data));
  return data.articles;
}

export async function saveIncidentRepository(incident) {
  const data = getStoredSupport();
  const newInc = {
    id: `inc-${Date.now()}`,
    status: "investigando",
    createdAt: new Date().toISOString(),
    ...incident
  };
  data.incidents.unshift(newInc);
  data.summary.activeIncidentsCount = data.incidents.filter(i => i.status !== "resolvido").length;
  localStorage.setItem(SUPPORT_KEY, JSON.stringify(data));
  return data.incidents;
}
