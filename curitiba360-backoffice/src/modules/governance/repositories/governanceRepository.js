import { INITIAL_GOVERNANCE_DATA } from "../data/governanceMockData";
import { governancePlatformMock } from "../mocks/governancePlatformMock";

export const GOVERNANCE_KEY = "curitiba360:governance_data_v1";
const GOVERNANCE_STORAGE_KEY = "curitiba360:governance-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getStoredGovernance() {
  const stored = localStorage.getItem(GOVERNANCE_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(INITIAL_GOVERNANCE_DATA));
  return INITIAL_GOVERNANCE_DATA;
}

export async function getGovernanceSummaryRepository() {
  const data = getStoredGovernance();
  return data.summary;
}

export async function getBackupsRepository() {
  const data = getStoredGovernance();
  return data.backups;
}

export async function getRaciRepository() {
  const data = getStoredGovernance();
  return data.raci;
}

export async function getSlaPoliciesRepository() {
  const data = getStoredGovernance();
  return data.slaPolicies;
}

export async function getChangesRepository() {
  const data = getStoredGovernance();
  return data.changes;
}

export async function approveChangeRepository(id) {
  const data = getStoredGovernance();
  data.changes = data.changes.map(c => c.id === id ? { ...c, status: "approved" } : c);
  data.summary.pendingChanges = data.changes.filter(c => c.status === "pending_approval").length;
  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(data));
  return data.changes;
}

export async function createBackupRepository(databaseName) {
  const data = getStoredGovernance();
  const newBackup = {
    id: `bak-${Date.now()}`,
    database: databaseName,
    size: "120 MB",
    status: "completed",
    type: "manual",
    encrypted: true,
    timestamp: new Date().toISOString()
  };
  data.backups.unshift(newBackup);
  data.summary.backupsCount = data.backups.length;
  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(data));
  return data.backups;
}

export async function triggerDrpSimulationRepository() {
  const data = getStoredGovernance();
  data.summary.overallSla = "100.00%";
  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(data));
  return data.summary;
}

// WF-048 — Plataforma de Governança Executiva e Performance Corporativa methods
export async function getGovernanceDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(GOVERNANCE_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(GOVERNANCE_STORAGE_KEY);
    }
  }
  localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(governancePlatformMock));
  return clone(governancePlatformMock);
}

export async function addResolution(resolution) {
  const data = await getGovernanceDashboard();
  data.resolutions.push(resolution);
  localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function updateOkrProgress(okrId, progress) {
  const data = await getGovernanceDashboard();
  const okr = data.okrs.find(o => o.id === okrId);
  if (okr) {
    okr.progress = progress;
    localStorage.setItem(GOVERNANCE_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}
