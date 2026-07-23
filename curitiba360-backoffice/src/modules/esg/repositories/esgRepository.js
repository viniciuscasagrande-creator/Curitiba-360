import { esgPlatformMock } from "../mocks/esgPlatformMock";

const ESG_STORAGE_KEY = "curitiba360:esg-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getEsgDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(ESG_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(ESG_STORAGE_KEY);
    }
  }
  localStorage.setItem(ESG_STORAGE_KEY, JSON.stringify(esgPlatformMock));
  return clone(esgPlatformMock);
}

export async function saveEsgProjectRepository(project) {
  const data = await getEsgDashboard();
  const newProject = {
    id: `proj-esg-${Date.now()}`,
    status: "draft",
    ...project
  };
  data.projects.unshift(newProject);
  localStorage.setItem(ESG_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveEsgGoalRepository(goal) {
  const data = await getEsgDashboard();
  const newGoal = {
    id: `goal-esg-${Date.now()}`,
    status: "on_track",
    ...goal
  };
  data.goals.unshift(newGoal);
  localStorage.setItem(ESG_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function saveEsgSupplierRepository(supplier) {
  const data = await getEsgDashboard();
  const newSupplier = {
    id: `sup-esg-${Date.now()}`,
    compliance: "compliant",
    status: "certified",
    ...supplier
  };
  data.suppliers.unshift(newSupplier);
  localStorage.setItem(ESG_STORAGE_KEY, JSON.stringify(data));
  return data;
}
