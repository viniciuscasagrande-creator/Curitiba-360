import { portfolioPlatformMock } from "../mocks/portfolioPlatformMock";

const PORTFOLIO_STORAGE_KEY = "curitiba360:portfolio-platform";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getPartnerDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    }
  }
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolioPlatformMock));
  return clone(portfolioPlatformMock);
}

export async function addIdea(idea) {
  const data = await getPartnerDashboard();
  data.ideas.push(idea);
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function addBusinessCase(bc) {
  const data = await getPartnerDashboard();
  data.businessCases.push(bc);
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function updateProjectProgress(projectId, progress) {
  const data = await getPartnerDashboard();
  const project = data.projects.find(p => p.id === projectId);
  if (project) {
    project.progress = progress;
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}
