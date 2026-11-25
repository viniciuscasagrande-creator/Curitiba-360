import { digitalTwinMock } from "../mocks/digitalTwinMock";

const DIGITAL_TWIN_STORAGE_KEY = "curitiba360:digital-twin-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getDigitalTwinDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(DIGITAL_TWIN_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(DIGITAL_TWIN_STORAGE_KEY);
    }
  }
  localStorage.setItem(DIGITAL_TWIN_STORAGE_KEY, JSON.stringify(digitalTwinMock));
  return clone(digitalTwinMock);
}

export async function updateIoTDeviceStatus(deviceId, status) {
  const data = await getDigitalTwinDashboard();
  const device = data.iotDevices.find(d => d.id === deviceId);
  if (device) {
    device.status = status;
    localStorage.setItem(DIGITAL_TWIN_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}

export async function addSimulationScenario(type, parameters) {
  const data = await getDigitalTwinDashboard();
  // simulate adding impact or simulation details
  localStorage.setItem(DIGITAL_TWIN_STORAGE_KEY, JSON.stringify(data));
  return data;
}
