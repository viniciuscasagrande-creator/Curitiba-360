import { roadmapMock } from "../mocks/roadmapMock";

export const ROADMAP_KEY = "curitiba360:roadmap_data_v1";

function getStoredRoadmap() {
  const stored = localStorage.getItem(ROADMAP_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(ROADMAP_KEY, JSON.stringify(roadmapMock));
  return roadmapMock;
}

export async function getRoadmapSummary() {
  const data = getStoredRoadmap();
  return data.summary;
}

export async function getRoadmapObjectives() {
  const data = getStoredRoadmap();
  return data.objectives;
}

export async function getRoadmapInitiatives() {
  const data = getStoredRoadmap();
  return data.initiatives;
}

export async function getRoadmapAlerts() {
  const data = getStoredRoadmap();
  return data.alerts;
}

export async function getRoadmapScenarios() {
  const data = getStoredRoadmap();
  return data.scenarios;
}

export async function getInnovationPipeline() {
  const data = getStoredRoadmap();
  return data.innovationPipeline;
}

export async function getExpansionCities() {
  const data = getStoredRoadmap();
  return data.expansionCities;
}

export async function createInitiativeRepository(initiative) {
  const data = getStoredRoadmap();
  const newInitiative = {
    id: `initiative-${Date.now()}`,
    ...initiative,
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  data.initiatives.unshift(newInitiative);
  data.summary.activeInitiatives = data.initiatives.length;
  localStorage.setItem(ROADMAP_KEY, JSON.stringify(data));
  return data.initiatives;
}

export async function updateInitiativeStatusRepository(id, status) {
  const data = getStoredRoadmap();
  data.initiatives = data.initiatives.map(i => i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i);
  localStorage.setItem(ROADMAP_KEY, JSON.stringify(data));
  return data.initiatives;
}
