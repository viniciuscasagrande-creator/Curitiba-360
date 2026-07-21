import { INITIAL_PORTAL_SDK_DATA } from '../data/sdkPortalMockData';

const STORAGE_KEY_DEVELOPER_PORTAL = 'curitiba360_developer_portal_v1';

function getStoredPortal() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DEVELOPER_PORTAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_DEVELOPER_PORTAL, JSON.stringify(INITIAL_PORTAL_SDK_DATA));
      return INITIAL_PORTAL_SDK_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do Portal do Dev:', error);
    return INITIAL_PORTAL_SDK_DATA;
  }
}

function persistPortal(data) {
  try {
    localStorage.setItem(STORAGE_KEY_DEVELOPER_PORTAL, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do Portal do Dev:', error);
  }
}

export const developerPortalService = {
  async getPortalOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredPortal();
    return { success: true, data };
  },

  async switchEnvironmentMode(mode = 'Sandbox') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredPortal();

    data.sandboxInfo.modoAtual = mode === 'Sandbox' ? 'Sandbox (Testes)' : 'Produção (Live)';
    persistPortal(data);
    return { success: true, mode: data.sandboxInfo.modoAtual };
  },

  async executePlaygroundRequest(endpoint, payload = {}) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'x-curitiba360-response-time': '18ms',
        'x-ratelimit-remaining': '99'
      },
      body: {
        success: true,
        endpoint,
        environment: 'sandbox',
        timestamp: new Date().toISOString(),
        data: payload
      }
    };
  }
};
