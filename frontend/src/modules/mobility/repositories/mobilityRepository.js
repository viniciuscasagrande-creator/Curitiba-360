import { mobilityPlatformMock } from "../mocks/mobilityPlatformMock";

const MOBILITY_STORAGE_KEY = "curitiba360:mobility-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getMobilityDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(MOBILITY_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(MOBILITY_STORAGE_KEY);
    }
  }
  localStorage.setItem(MOBILITY_STORAGE_KEY, JSON.stringify(mobilityPlatformMock));
  return clone(mobilityPlatformMock);
}

export async function saveRouteRepository(route) {
  const data = await getMobilityDashboard();
  const newRoute = {
    id: `rt-${Date.now()}`,
    status: "draft",
    accessibilityEnabled: true,
    ...route
  };
  data.routes.unshift(newRoute);
  localStorage.setItem(MOBILITY_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveTripRepository(trip) {
  const data = await getMobilityDashboard();
  const newTrip = {
    id: `trip-${Date.now()}`,
    passengers: 0,
    status: "planned",
    delayMinutes: 0,
    ...trip
  };
  data.trips.unshift(newTrip);
  localStorage.setItem(MOBILITY_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveDriverRepository(driver) {
  const data = await getMobilityDashboard();
  const newDriver = {
    id: `drv-${Date.now()}`,
    status: "available",
    averageRating: 5.0,
    ...driver
  };
  data.drivers.unshift(newDriver);
  localStorage.setItem(MOBILITY_STORAGE_KEY, JSON.stringify(data));
  return data;
}
