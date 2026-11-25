import { INITIAL_QUALITY_DATA } from "../mocks/qualityMockData";

export const QUALITY_KEY = "curitiba360:quality_data_v1";

function getStoredQuality() {
  const stored = localStorage.getItem(QUALITY_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(QUALITY_KEY, JSON.stringify(INITIAL_QUALITY_DATA));
  return INITIAL_QUALITY_DATA;
}

export async function getQualitySummary() {
  const data = getStoredQuality();
  return data.summary;
}

export async function getReleases() {
  const data = getStoredQuality();
  return data.releases;
}

export async function getTestPlans() {
  const data = getStoredQuality();
  return data.testPlans;
}

export async function getTestCases() {
  const data = getStoredQuality();
  return data.testCases;
}

export async function getBugs() {
  const data = getStoredQuality();
  return data.bugs;
}

export async function approveReleaseRepository(releaseId, userId) {
  const data = getStoredQuality();
  data.releases = data.releases.map(r => r.id === releaseId ? { ...r, status: "approved", approvedBy: userId } : r);
  localStorage.setItem(QUALITY_KEY, JSON.stringify(data));
  return data.releases;
}

export async function createBugRepository(bug) {
  const data = getStoredQuality();
  const newBug = {
    id: `bug-${Date.now()}`,
    ...bug,
    createdAt: new Date().toISOString()
  };
  data.bugs.unshift(newBug);
  data.summary.openBugsCount = data.bugs.length;
  localStorage.setItem(QUALITY_KEY, JSON.stringify(data));
  return data.bugs;
}

export async function updateBugStatusRepository(bugId, status) {
  const data = getStoredQuality();
  data.bugs = data.bugs.map(b => b.id === bugId ? { ...b, status } : b);
  localStorage.setItem(QUALITY_KEY, JSON.stringify(data));
  return data.bugs;
}

export async function getPerformanceMetrics() {
  const data = getStoredQuality();
  return data.performanceMetrics;
}

export async function getAccessibilityScan() {
  const data = getStoredQuality();
  return data.accessibilityScan;
}

export async function getSecurityScan() {
  const data = getStoredQuality();
  return data.securityScan;
}
