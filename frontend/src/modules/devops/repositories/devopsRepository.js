import { initialPipelines, initialFeatureFlags, initialBackups } from "../mocks/devopsMock";

export const PIPELINES_STORAGE_KEY = "curitiba360:devops_pipelines";
export const FLAGS_STORAGE_KEY = "curitiba360:devops_flags";
export const BACKUPS_STORAGE_KEY = "curitiba360:devops_backups";
export const DEVOPS_CHANGED_EVENT = "curitiba360:devops-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(DEVOPS_CHANGED_EVENT, {
      detail: clone(data),
    })
  );
}

function savePipelines(data) {
  localStorage.setItem(PIPELINES_STORAGE_KEY, JSON.stringify(data));
  emitChanged({ type: "pipelines", data });
  return clone(data);
}

function saveFlags(data) {
  localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(data));
  emitChanged({ type: "flags", data });
  return clone(data);
}

function saveBackups(data) {
  localStorage.setItem(BACKUPS_STORAGE_KEY, JSON.stringify(data));
  emitChanged({ type: "backups", data });
  return clone(data);
}

export async function getPipelinesRepository() {
  try {
    const stored = localStorage.getItem(PIPELINES_STORAGE_KEY);
    if (stored) return clone(JSON.parse(stored));
  } catch {
    localStorage.removeItem(PIPELINES_STORAGE_KEY);
  }
  return savePipelines(initialPipelines);
}

export async function getFeatureFlagsRepository() {
  try {
    const stored = localStorage.getItem(FLAGS_STORAGE_KEY);
    if (stored) return clone(JSON.parse(stored));
  } catch {
    localStorage.removeItem(FLAGS_STORAGE_KEY);
  }
  return saveFlags(initialFeatureFlags);
}

export async function getBackupsRepository() {
  try {
    const stored = localStorage.getItem(BACKUPS_STORAGE_KEY);
    if (stored) return clone(JSON.parse(stored));
  } catch {
    localStorage.removeItem(BACKUPS_STORAGE_KEY);
  }
  return saveBackups(initialBackups);
}

export async function triggerPipelineRepository(name, branch) {
  const list = await getPipelinesRepository();
  const newPipe = {
    id: `pipe-${Math.random().toString().slice(2, 6)}`,
    name,
    branch,
    trigger: "manual",
    status: "running",
    durationSeconds: 0,
    createdAt: new Date().toISOString()
  };
  list.unshift(newPipe);
  savePipelines(list);
  return newPipe;
}

export async function toggleFeatureFlagRepository(flagId) {
  const list = await getFeatureFlagsRepository();
  const index = list.findIndex(f => f.id === flagId);
  if (index !== -1) {
    list[index].enabled = !list[index].enabled;
    saveFlags(list);
  }
}

export async function createBackupRepository(name) {
  const list = await getBackupsRepository();
  const newBackup = {
    id: `bak-${Math.random().toString().slice(2, 6)}`,
    name,
    sizeBytes: Math.floor(Math.random() * 200000000) + 10000000,
    status: "completed",
    createdAt: new Date().toISOString()
  };
  list.unshift(newBackup);
  saveBackups(list);
  return newBackup;
}
