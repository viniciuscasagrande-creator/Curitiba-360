import { aiMock } from "../mocks/aiMock";

export const AI_STORAGE_KEY = "curitiba360:ai";
export const AI_CHANGED_EVENT = "curitiba360:ai-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(new CustomEvent(AI_CHANGED_EVENT, { detail: clone(data) }));
}

function saveAiData(data) {
  localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(data));
  emitChanged(data);
  return clone(data);
}

export async function getAiRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  try {
    const stored = localStorage.getItem(AI_STORAGE_KEY);
    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(AI_STORAGE_KEY);
  }
  return saveAiData(aiMock);
}

export async function addAiMessageRepository(message) {
  const data = await getAiRepository();
  data.messages = [...(data.messages || []), message];
  return saveAiData(data);
}
