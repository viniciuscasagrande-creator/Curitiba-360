import { safetyPlatformMock } from "../mocks/safetyPlatformMock";

const SAFETY_STORAGE_KEY = "curitiba360:safety-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getSafetyDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(SAFETY_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(SAFETY_STORAGE_KEY);
    }
  }
  localStorage.setItem(SAFETY_STORAGE_KEY, JSON.stringify(safetyPlatformMock));
  return clone(safetyPlatformMock);
}

export async function saveIncidentRepository(incident) {
  const data = await getSafetyDashboard();
  const newIncident = {
    id: `incident-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
    ...incident
  };
  data.incidents.unshift(newIncident);
  data.summary.activeIncidents = data.incidents.length;
  localStorage.setItem(SAFETY_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveRiskRepository(risk) {
  const data = await getSafetyDashboard();
  const score = (risk.probability || 1) * (risk.impact || 1);
  let level = "low";
  if (score >= 16) level = "critical";
  else if (score >= 10) level = "high";
  else if (score >= 5) level = "moderate";

  const newRisk = {
    id: `risk-${Date.now()}`,
    riskScore: score,
    level,
    status: "identified",
    ...risk
  };
  data.risks.unshift(newRisk);
  localStorage.setItem(SAFETY_STORAGE_KEY, JSON.stringify(data));
  return data;
}
