import { apiMock } from "../mocks/apiMock";

export const API_STORAGE_KEY = "curitiba360:api";
export const API_CHANGED_EVENT = "curitiba360:api-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(new CustomEvent(API_CHANGED_EVENT, { detail: clone(data) }));
}

function saveApiData(data) {
  localStorage.setItem(API_STORAGE_KEY, JSON.stringify(data));
  emitChanged(data);
  return clone(data);
}

export async function getApiRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  try {
    const stored = localStorage.getItem(API_STORAGE_KEY);
    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(API_STORAGE_KEY);
  }
  return saveApiData(apiMock);
}

export async function createApiKeyRepository(key) {
  const data = await getApiRepository();
  const newKey = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    prefix: "c360_live_" + Math.random().toString(36).substring(2, 8) + "...",
    createdAt: new Date().toISOString(),
    status: "active",
    ...key
  };
  data.apiKeys = [newKey, ...(data.apiKeys || [])];
  return saveApiData(data);
}
