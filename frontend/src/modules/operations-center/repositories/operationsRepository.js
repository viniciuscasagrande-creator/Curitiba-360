import { operationsCenterMock } from "../mocks/operationsCenterMock";

const OPERATIONS_STORAGE_KEY = "curitiba360:operations-center";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getOperationsDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(OPERATIONS_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(OPERATIONS_STORAGE_KEY);
    }
  }
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(operationsCenterMock));
  return clone(operationsCenterMock);
}

export async function getLiveEvents() {
  const data = await getOperationsDashboard();
  return data.events;
}

export async function getIncidents() {
  const data = await getOperationsDashboard();
  return data.incidents;
}

export async function getAlerts() {
  const data = await getOperationsDashboard();
  return data.alerts;
}

export async function getLocations() {
  const data = await getOperationsDashboard();
  return data.locations;
}

export async function getQueues() {
  const data = await getOperationsDashboard();
  return data.queues;
}

export async function getDevices() {
  const data = await getOperationsDashboard();
  return data.devices;
}

export async function getTeams() {
  const data = await getOperationsDashboard();
  return data.teams;
}

export async function getContingencyPlans() {
  const data = await getOperationsDashboard();
  return data.contingencyPlans;
}

export async function getServices() {
  const data = await getOperationsDashboard();
  return data.services;
}

export async function getReports() {
  const data = await getOperationsDashboard();
  return data.reports;
}

export async function saveIncidentRepository(incident) {
  const data = await getOperationsDashboard();
  const newInc = {
    id: `incident-${Date.now()}`,
    elapsedMinutes: 0,
    slaRemainingMinutes: 60,
    status: "detected",
    ...incident
  };
  data.incidents.unshift(newInc);
  data.summary.activeIncidents = data.incidents.length;
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveContingencyPlanRepository(plan) {
  const data = await getOperationsDashboard();
  const newPlan = {
    id: `plan-${Date.now()}`,
    status: "approved",
    ...plan
  };
  data.contingencyPlans.unshift(newPlan);
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveDeviceRepository(device) {
  const data = await getOperationsDashboard();
  const newDev = {
    id: `dev-${Date.now()}`,
    status: "online",
    batteryLevel: 100,
    signalStrength: 100,
    ...device
  };
  data.devices.unshift(newDev);
  data.summary.onlineDevices = data.devices.filter(d => d.status === "online").length;
  data.summary.offlineDevices = data.devices.filter(d => d.status === "offline").length;
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(data));
  return data;
}
