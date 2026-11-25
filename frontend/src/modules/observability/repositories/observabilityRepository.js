import {
  observabilityMock,
} from "../mocks/observabilityMock";

export const OBSERVABILITY_STORAGE_KEY =
  "curitiba360:observability";

export const OBSERVABILITY_CHANGED_EVENT =
  "curitiba360:observability-changed";

function clone(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(
      OBSERVABILITY_CHANGED_EVENT,
      {
        detail: clone(data),
      }
    )
  );
}

function saveObservability(data) {
  const nextData = {
    ...data,
    updatedAt:
      new Date().toISOString(),
  };

  localStorage.setItem(
    OBSERVABILITY_STORAGE_KEY,
    JSON.stringify(nextData)
  );

  emitChanged(nextData);

  return clone(nextData);
}

export async function getObservabilityRepository() {
  await new Promise((resolve) =>
    window.setTimeout(resolve, 180)
  );

  try {
    const stored =
      localStorage.getItem(
        OBSERVABILITY_STORAGE_KEY
      );

    if (stored) {
      return clone(
        JSON.parse(stored)
      );
    }
  } catch {
    localStorage.removeItem(
      OBSERVABILITY_STORAGE_KEY
    );
  }

  return saveObservability(
    observabilityMock
  );
}
export async function createIncidentRepository(incident) {
  const data = await getObservabilityRepository();
  const newIncident = {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...incident
  };
  data.incidents = [newIncident, ...(data.incidents || [])];
  return saveObservability(data);
}
