import { INITIAL_DEVELOPER_DATA } from "../mocks/developerMockData";

export const DEV_KEY = "curitiba360:dev_data_v1";

function getStoredDev() {
  const stored = localStorage.getItem(DEV_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(DEV_KEY, JSON.stringify(INITIAL_DEVELOPER_DATA));
  return INITIAL_DEVELOPER_DATA;
}

export async function getDevSummary() {
  const data = getStoredDev();
  return data.summary;
}

export async function getDevApps() {
  const data = getStoredDev();
  return data.apps;
}

export async function getApiKeys() {
  const data = getStoredDev();
  return data.apiKeys;
}

export async function getWebhooks() {
  const data = getStoredDev();
  return data.webhooks;
}

export async function getApiPlans() {
  const data = getStoredDev();
  return data.plans;
}

export async function getApiLogs() {
  const data = getStoredDev();
  return data.logs;
}

export async function getMarketplaceItems() {
  const data = getStoredDev();
  return data.marketplaceItems;
}

export async function createDevAppRepository(app) {
  const data = getStoredDev();
  const newApp = {
    id: `app-${Date.now()}`,
    clientId: `cli_${Math.random().toString(36).substring(7)}`,
    clientSecret: `sec_${Math.random().toString(36).substring(3)}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...app
  };
  data.apps.unshift(newApp);
  data.summary.registeredApps = data.apps.length;
  localStorage.setItem(DEV_KEY, JSON.stringify(data));
  return data.apps;
}

export async function updateAppStatusRepository(appId, status) {
  const data = getStoredDev();
  data.apps = data.apps.map(a => a.id === appId ? { ...a, status, updatedAt: new Date().toISOString() } : a);
  localStorage.setItem(DEV_KEY, JSON.stringify(data));
  return data.apps;
}

export async function saveWebhookRepository(webhook) {
  const data = getStoredDev();
  const newWh = {
    id: `wh-${Date.now()}`,
    enabled: true,
    createdAt: new Date().toISOString(),
    ...webhook
  };
  data.webhooks.unshift(newWh);
  data.summary.webhooksDispatched += 1;
  localStorage.setItem(DEV_KEY, JSON.stringify(data));
  return data.webhooks;
}
