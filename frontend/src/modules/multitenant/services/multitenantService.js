import { INITIAL_MULTITENANT_DATA } from '../data/multitenantMockData';

const STORAGE_KEY_MULTITENANT = 'curitiba360_multitenant_v1';

function getStoredMultitenant() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MULTITENANT);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_MULTITENANT, JSON.stringify(INITIAL_MULTITENANT_DATA));
      return INITIAL_MULTITENANT_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados multi-tenant:', error);
    return INITIAL_MULTITENANT_DATA;
  }
}

function persistMultitenant(data) {
  try {
    localStorage.setItem(STORAGE_KEY_MULTITENANT, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados multi-tenant:', error);
  }
}

export const multitenantService = {
  async getMultitenantOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredMultitenant();
    return { success: true, data };
  },

  async switchActiveTenant(tenantId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredMultitenant();

    const targetOrg = data.organizacoes.find((o) => o.id === tenantId);
    if (targetOrg) {
      data.activeTenant = {
        id: targetOrg.id,
        nome: targetOrg.nome,
        dominio: `${targetOrg.nome.toLowerCase().replace(/\s+/g, '')}.curitiba360.com.br`,
        plano: targetOrg.plano,
        status: targetOrg.status,
        limiteEventos: 'Ilimitado',
        limiteUsuarios: 'Ilimitado',
        logoUrl: 'https://curitiba360.com.br/logos/tenant.png',
        temaAtivo: 'Dark Premium'
      };
      persistMultitenant(data);
    }

    return { success: true, message: `🌐 Organização alterada para: ${targetOrg?.nome}!` };
  },

  async togglePluginInstall(pluginId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredMultitenant();

    const plug = data.marketplacePlugins.find((p) => p.id === pluginId);
    if (plug) {
      plug.instalado = !plug.instalado;
      persistMultitenant(data);
    }

    return { success: true, message: plug?.instalado ? `📦 Plugin ${plug?.nome} instalado no Tenant!` : `🗑️ Plugin ${plug?.nome} removido!` };
  },

  async upgradeSaasPlan(planId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredMultitenant();

    const plan = data.planosSaas.find((p) => p.id === planId);
    if (plan) {
      data.activeTenant.plano = plan.nome;
      persistMultitenant(data);
    }

    return { success: true, message: `🚀 Plano SaaS atualizado para ${plan?.nome} com sucesso!` };
  }
};
