import { superAppMock } from "../mocks/superAppMock";

const STORAGE_KEY = "curitiba360:super-app-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getSuperAppData() {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(superAppMock));
  return clone(superAppMock);
}

export async function saveSuperAppData(data) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return clone(data);
}
