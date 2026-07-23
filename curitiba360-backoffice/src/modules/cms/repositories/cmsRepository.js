import { INITIAL_CMS_DATA } from "../mocks/cmsMockData";

export const CMS_KEY = "curitiba360:cms_data_v2";

function getStoredCms() {
  const stored = localStorage.getItem(CMS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(CMS_KEY, JSON.stringify(INITIAL_CMS_DATA));
  return INITIAL_CMS_DATA;
}

export async function getCmsSummary() {
  const data = getStoredCms();
  return data.summary;
}

export async function getCmsPages() {
  const data = getStoredCms();
  return data.pages;
}

export async function getCmsBanners() {
  const data = getStoredCms();
  return data.banners;
}

export async function getCmsRedirects() {
  const data = getStoredCms();
  return data.redirects;
}

export async function getCmsExperiments() {
  const data = getStoredCms();
  return data.experiments;
}

export async function getPersonalizationRules() {
  const data = getStoredCms();
  return data.personalizationRules;
}

export async function getCmsTranslations() {
  const data = getStoredCms();
  return data.translations;
}

export async function getCalendarEvents() {
  const data = getStoredCms();
  return data.calendarEvents;
}

export async function saveCmsPageRepository(page) {
  const data = getStoredCms();
  const newPage = {
    id: `page-${Date.now()}`,
    slug: page.title.toLowerCase().replace(/ /g, "-"),
    status: page.status || "rascunho",
    publishedAt: page.status === "publicado" ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString(),
    ...page
  };
  data.pages.unshift(newPage);
  data.summary.publishedPages = data.pages.filter(p => p.status === "publicado").length;
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.pages;
}

export async function saveCmsBannerRepository(banner) {
  const data = getStoredCms();
  const newBan = {
    id: `ban-${Date.now()}`,
    clickCount: 0,
    active: true,
    ...banner
  };
  data.banners.unshift(newBan);
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.banners;
}

export async function saveCmsRedirectRepository(redirect) {
  const data = getStoredCms();
  const newRed = {
    id: `red-${Date.now()}`,
    ...redirect
  };
  data.redirects.unshift(newRed);
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.redirects;
}

export async function saveCmsExperimentRepository(exp) {
  const data = getStoredCms();
  const newExp = {
    id: `exp-${Date.now()}`,
    winner: null,
    ...exp
  };
  data.experiments.unshift(newExp);
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.experiments;
}

export async function savePersonalizationRuleRepository(rule) {
  const data = getStoredCms();
  const newRule = {
    id: `rule-${Date.now()}`,
    ...rule
  };
  data.personalizationRules.unshift(newRule);
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.personalizationRules;
}

export async function updateTranslationRepository(id, translation) {
  const data = getStoredCms();
  data.translations = data.translations.map(t => t.id === id ? { ...t, ...translation } : t);
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
  return data.translations;
}
