import { marketplaceMock } from "../mocks/marketplaceMock";

export const MARKETPLACE_STORAGE_KEY = "curitiba360:marketplace";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export async function getMarketplaceDashboard() {
  await new Promise((resolve) => window.setTimeout(resolve, 180));
  const stored = localStorage.getItem(MARKETPLACE_STORAGE_KEY);
  if (stored) {
    try {
      return clone(JSON.parse(stored));
    } catch {
      localStorage.removeItem(MARKETPLACE_STORAGE_KEY);
    }
  }
  localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(marketplaceMock));
  return clone(marketplaceMock);
}

export async function installExtensionRepository(id) {
  const data = await getMarketplaceDashboard();
  const ext = data.featuredExtensions.find(e => e.id === id);
  if (!ext) return data;

  const alreadyInstalled = data.installedExtensions.some(i => i.extensionId === id);
  if (!alreadyInstalled) {
    data.installedExtensions.push({
      id: `installation-${Date.now()}`,
      extensionId: id,
      name: ext.name,
      installedVersion: ext.currentVersion,
      status: "active",
      updateAvailable: false,
      config: {}
    });
    data.summary.installedExtensionsCount = data.installedExtensions.length;
    data.summary.activeInstallations = data.installedExtensions.length + 1248;
    localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(data));
  }
  return data;
}

export async function uninstallExtensionRepository(id) {
  const data = await getMarketplaceDashboard();
  data.installedExtensions = data.installedExtensions.filter(i => i.extensionId !== id);
  data.summary.installedExtensionsCount = data.installedExtensions.length;
  data.summary.activeInstallations = Math.max(1248, data.installedExtensions.length + 1248);
  localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function updateExtensionConfigRepository(id, config) {
  const data = await getMarketplaceDashboard();
  data.installedExtensions = data.installedExtensions.map(i => i.extensionId === id ? { ...i, config } : i);
  localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(data));
  return data;
}

export async function publishExtensionRepository(extension) {
  const data = await getMarketplaceDashboard();
  const newExt = {
    id: `extension-${Date.now()}`,
    slug: extension.name.toLowerCase().replace(/ /g, "-"),
    rating: 5.0,
    installations: 0,
    pricingModel: extension.price === 0 ? "free" : "monthly",
    verified: false,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...extension
  };
  data.featuredExtensions.push(newExt);
  data.summary.publishedExtensions = data.featuredExtensions.length + 84;
  localStorage.setItem(MARKETPLACE_STORAGE_KEY, JSON.stringify(data));
  return data;
}
