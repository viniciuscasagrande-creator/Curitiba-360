import { smartCityMock } from "../mocks/smartCityMock";

const SMART_CITY_STORAGE_KEY = "curitiba360:smartcity-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getSmartCityDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(SMART_CITY_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(SMART_CITY_STORAGE_KEY);
    }
  }
  localStorage.setItem(SMART_CITY_STORAGE_KEY, JSON.stringify(smartCityMock));
  return clone(smartCityMock);
}

export async function updateSensorStatus(sensorId, status) {
  const data = await getSmartCityDashboard();
  const sensor = data.sensors.find(s => s.id === sensorId);
  if (sensor) {
    sensor.status = status;
    localStorage.setItem(SMART_CITY_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}

export async function runUrbanSimulation(type, parameters) {
  const data = await getSmartCityDashboard();
  data.summary.activeSimulations += 1;
  localStorage.setItem(SMART_CITY_STORAGE_KEY, JSON.stringify(data));
  return data;
}
