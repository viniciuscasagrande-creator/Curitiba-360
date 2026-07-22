import { INITIAL_SECURITY_DATA } from "../mocks/securityMockData";

export const SECURITY_KEY = "curitiba360:security_data_v1";

function getStoredSecurity() {
  const stored = localStorage.getItem(SECURITY_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(SECURITY_KEY, JSON.stringify(INITIAL_SECURITY_DATA));
  return INITIAL_SECURITY_DATA;
}

export async function getSecuritySummaryRepository() {
  const data = getStoredSecurity();
  return data.summary;
}

export async function getVulnerabilitiesRepository() {
  const data = getStoredSecurity();
  return data.vulnerabilities;
}

export async function getFraudAlertsRepository() {
  const data = getStoredSecurity();
  return data.fraudAlerts;
}

export async function getSessionsRepository() {
  const data = getStoredSecurity();
  return data.sessions;
}

export async function getConsentsRepository() {
  const data = getStoredSecurity();
  return data.consentLog;
}

export async function terminateSessionRepository(id) {
  const data = getStoredSecurity();
  data.sessions = data.sessions.filter(s => s.id !== id);
  data.summary.activeSessions = data.sessions.length;
  localStorage.setItem(SECURITY_KEY, JSON.stringify(data));
  return data.sessions;
}

export async function approveFraudAlertRepository(id) {
  const data = getStoredSecurity();
  data.fraudAlerts = data.fraudAlerts.map(a => a.id === id ? { ...a, status: "approved" } : a);
  localStorage.setItem(SECURITY_KEY, JSON.stringify(data));
  return data.fraudAlerts;
}

export async function blockFraudAlertRepository(id) {
  const data = getStoredSecurity();
  data.fraudAlerts = data.fraudAlerts.map(a => a.id === id ? { ...a, status: "blocked" } : a);
  localStorage.setItem(SECURITY_KEY, JSON.stringify(data));
  return data.fraudAlerts;
}

export async function fixVulnerabilityRepository(id) {
  const data = getStoredSecurity();
  data.vulnerabilities = data.vulnerabilities.map(v => v.id === id ? { ...v, status: "fixed" } : v);
  data.summary.pendingVulnerabilities = data.vulnerabilities.filter(v => v.status === "open").length;
  localStorage.setItem(SECURITY_KEY, JSON.stringify(data));
  return data.vulnerabilities;
}
