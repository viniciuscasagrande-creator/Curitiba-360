import { workforcePlatformMock } from "../mocks/workforcePlatformMock";

const WORKFORCE_STORAGE_KEY = "curitiba360:workforce-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getWorkforceDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(WORKFORCE_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(WORKFORCE_STORAGE_KEY);
    }
  }
  localStorage.setItem(WORKFORCE_STORAGE_KEY, JSON.stringify(workforcePlatformMock));
  return clone(workforcePlatformMock);
}

export async function saveEmployeeRepository(employee) {
  const data = await getWorkforceDashboard();
  const newEmp = {
    id: `emp-${Date.now()}`,
    registrationNumber: `RE-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "active",
    admissionDate: new Date().toISOString().split("T")[0],
    ...employee
  };
  data.employees.unshift(newEmp);
  data.summary.activeEmployees = data.employees.length;
  localStorage.setItem(WORKFORCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveCandidateRepository(candidate) {
  const data = await getWorkforceDashboard();
  const newCand = {
    id: `cand-${Date.now()}`,
    score: 80,
    consentGranted: true,
    stage: "applied",
    ...candidate
  };
  data.candidates.unshift(newCand);
  data.summary.candidatesInProcess = data.candidates.length;
  localStorage.setItem(WORKFORCE_STORAGE_KEY, JSON.stringify(data));
  return data;
}
