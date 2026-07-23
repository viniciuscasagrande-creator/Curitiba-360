import { legalMock } from "../mocks/legalMock";

const LEGAL_STORAGE_KEY = "curitiba360:legal-documents";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getLegalDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(LEGAL_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(LEGAL_STORAGE_KEY);
    }
  }
  localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(legalMock));
  return clone(legalMock);
}

export async function getContracts() {
  const data = await getLegalDashboard();
  return data.contracts;
}

export async function getTemplates() {
  const data = await getLegalDashboard();
  return data.templates;
}

export async function getSigners() {
  const data = await getLegalDashboard();
  return data.signers;
}

export async function getPolicies() {
  const data = await getLegalDashboard();
  return data.policies;
}

export async function getConsents() {
  const data = await getLegalDashboard();
  return data.consents;
}

export async function getRisks() {
  const data = await getLegalDashboard();
  return data.risks;
}

export async function getProcesses() {
  const data = await getLegalDashboard();
  return data.processes;
}

export async function saveContractRepository(contract) {
  const data = await getLegalDashboard();
  const newCon = {
    id: `con-${Date.now()}`,
    number: `2026/CT-${Math.floor(Math.random() * 800 + 100)}`,
    status: "draft",
    version: 1,
    ...contract
  };
  data.contracts.unshift(newCon);
  data.summary.activeContracts = data.contracts.length;
  localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function savePolicyRepository(policy) {
  const data = await getLegalDashboard();
  const newPol = {
    id: `pol-${Date.now()}`,
    status: "draft",
    complianceRate: 100,
    ...policy
  };
  data.policies.unshift(newPol);
  localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveConsentRepository(consent) {
  const data = await getLegalDashboard();
  const newCns = {
    id: `cns-${Date.now()}`,
    status: "granted",
    grantedAt: new Date().toISOString().split("T")[0],
    ...consent
  };
  data.consents.unshift(newCns);
  localStorage.setItem(LEGAL_STORAGE_KEY, JSON.stringify(data));
  return data;
}
