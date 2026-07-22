import { INITIAL_GOVERNANCE_DATA } from "../data/governanceMockData";

export const GOVERNANCE_KEY = "curitiba360:governance_data_v1";

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
  // Simulate setting SLA status for testing
  data.summary.overallSla = "100.00%";
  localStorage.setItem(GOVERNANCE_KEY, JSON.stringify(data));
  return data.summary;
}
