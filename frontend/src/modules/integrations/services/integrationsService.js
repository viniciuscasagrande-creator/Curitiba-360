import { INITIAL_INTEGRATIONS_DATA } from '../data/connectorsMockData';

const STORAGE_KEY_INTEGRATIONS = 'curitiba360_integrations_v1';

function getStoredIntegrations() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_INTEGRATIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_INTEGRATIONS, JSON.stringify(INITIAL_INTEGRATIONS_DATA));
      return INITIAL_INTEGRATIONS_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados de integrações:', error);
    return INITIAL_INTEGRATIONS_DATA;
  }
}

function persistIntegrations(data) {
  try {
    localStorage.setItem(STORAGE_KEY_INTEGRATIONS, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados de integrações:', error);
  }
}

export const integrationsService = {
  async getIntegrationsOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredIntegrations();
    return { success: true, data };
  },

  async toggleConnectorStatus(connectorId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredIntegrations();

    const crmConn = data.crmConnectors.find((c) => c.id === connectorId);
    if (crmConn) {
      crmConn.status = crmConn.status === 'conectado' ? 'desconectado' : 'conectado';
    }

    const erpConn = data.erpConnectors.find((c) => c.id === connectorId);
    if (erpConn) {
      erpConn.status = erpConn.status === 'ativo' ? 'pendente' : 'ativo';
    }

    persistIntegrations(data);
    return { success: true };
  },

  async triggerManualSync(connectorId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredIntegrations();

    const newLog = {
      id: `SYNC-${Date.now().toString().slice(-4)}`,
      conector: connectorId,
      evento: 'Manual Sync Requested',
      statusHttp: 200,
      registrosAfetados: 12,
      horario: new Date().toLocaleString('pt-BR'),
      mensagem: 'Sincronização em lote concluída com sucesso!'
    };

    data.syncLogs.unshift(newLog);
    persistIntegrations(data);

    return { success: true, message: '🔄 Sincronização manual executada e concluída!' };
  }
};
