import { initialOrganizations } from "../mocks/organizationMock";

export const ORGANIZATIONS_STORAGE_KEY = "curitiba360:organizations";
export const ACTIVE_ORG_STORAGE_KEY = "curitiba360:active_organization_id";
export const ORGANIZATIONS_CHANGED_EVENT = "curitiba360:organizations-changed";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function emitChanged(data) {
  window.dispatchEvent(
    new CustomEvent(ORGANIZATIONS_CHANGED_EVENT, {
      detail: clone(data),
    })
  );
}

function saveOrganizations(data) {
  localStorage.setItem(ORGANIZATIONS_STORAGE_KEY, JSON.stringify(data));
  emitChanged(data);
  return clone(data);
}

export async function getOrganizationsRepository() {
  await new Promise((resolve) => window.setTimeout(resolve, 150));
  try {
    const stored = localStorage.getItem(ORGANIZATIONS_STORAGE_KEY);
    if (stored) {
      return clone(JSON.parse(stored));
    }
  } catch {
    localStorage.removeItem(ORGANIZATIONS_STORAGE_KEY);
  }
  return saveOrganizations(initialOrganizations);
}

export async function getActiveOrgIdRepository() {
  const activeId = localStorage.getItem(ACTIVE_ORG_STORAGE_KEY);
  if (activeId) return activeId;
  const list = await getOrganizationsRepository();
  if (list && list.length > 0) {
    localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, list[0].id);
    return list[0].id;
  }
  return null;
}

export async function setActiveOrgIdRepository(id) {
  localStorage.setItem(ACTIVE_ORG_STORAGE_KEY, id);
  window.dispatchEvent(new CustomEvent(ORGANIZATIONS_CHANGED_EVENT, { detail: null }));
}

export async function createOrganizationRepository(org) {
  const list = await getOrganizationsRepository();
  const newOrg = {
    id: crypto.randomUUID ? crypto.randomUUID() : `org-${Math.random().toString()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
    plan: "starter",
    branding: {
      primaryColor: "#059669",
      secondaryColor: "#10b981",
      backgroundColor: "#f9fafb",
      font: "Inter",
      borderRadius: "16px",
      theme: "light",
      logo: ""
    },
    companies: [],
    branches: [],
    domains: [],
    billing: {
      planName: "Starter",
      nextBilling: "2026-08-22",
      usage: {
        users: 1,
        usersLimit: 3,
        events: 0,
        eventsLimit: 1,
        apiRequests: 0,
        apiLimit: 5000
      }
    },
    ...org
  };
  list.push(newOrg);
  saveOrganizations(list);
  return newOrg;
}

export async function updateBrandingRepository(orgId, branding) {
  const list = await getOrganizationsRepository();
  const index = list.findIndex(o => o.id === orgId);
  if (index !== -1) {
    list[index].branding = { ...list[index].branding, ...branding };
    list[index].updatedAt = new Date().toISOString();
    saveOrganizations(list);
  }
}

export async function addDomainRepository(orgId, hostname) {
  const list = await getOrganizationsRepository();
  const index = list.findIndex(o => o.id === orgId);
  if (index !== -1) {
    const newDomain = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
      hostname,
      verified: true,
      ssl: true
    };
    list[index].domains = [...(list[index].domains || []), newDomain];
    list[index].updatedAt = new Date().toISOString();
    saveOrganizations(list);
  }
}

export async function updatePlanRepository(orgId, plan) {
  const list = await getOrganizationsRepository();
  const index = list.findIndex(o => o.id === orgId);
  if (index !== -1) {
    list[index].plan = plan;
    list[index].billing.planName = plan.toUpperCase();
    list[index].updatedAt = new Date().toISOString();
    saveOrganizations(list);
  }
}
