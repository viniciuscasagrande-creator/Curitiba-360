import { INITIAL_DEVELOPER_DATA } from '../data/apiWebhooksMockData';

const STORAGE_KEY_DEVELOPER_API = 'curitiba360_developer_api_v1';

function getStoredDeveloper() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DEVELOPER_API);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_DEVELOPER_API, JSON.stringify(INITIAL_DEVELOPER_DATA));
      return INITIAL_DEVELOPER_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados da API pública:', error);
    return INITIAL_DEVELOPER_DATA;
  }
}

function persistDeveloper(data) {
  try {
    localStorage.setItem(STORAGE_KEY_DEVELOPER_API, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados da API pública:', error);
  }
}

export const developerApiService = {
  async getDeveloperOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredDeveloper();
    return { success: true, data };
  },

  async createApiKey(keyData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredDeveloper();

    const newKey = {
      id: `KEY-${Date.now()}`,
      key: `curitiba360_live_${Math.random().toString(36).substring(2, 10)}`,
      criadoEm: new Date().toISOString().split('T')[0],
      status: 'ativo',
      taxaLimiteReqMin: 100,
      ...keyData
    };

    data.apiKeys.push(newKey);
    persistDeveloper(data);
    return { success: true, apiKey: newKey };
  },

  async registerWebhook(webhookData) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredDeveloper();

    const newWebhook = {
      id: `WH-${Date.now()}`,
      secretHmac: `whsec_${Math.random().toString(36).substring(2, 18)}`,
      criadoEm: new Date().toISOString().split('T')[0],
      status: 'ativo',
      ...webhookData
    };

    data.webhooks.push(newWebhook);
    persistDeveloper(data);
    return { success: true, webhook: newWebhook };
  },

  async triggerWebhookTest(webhookId) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredDeveloper();

    const newLog = {
      id: `LOG-WH-${Date.now()}`,
      webhookId,
      evento: 'event.published',
      statusHttp: 200,
      tentativas: 1,
      horario: new Date().toLocaleString('pt-BR'),
      hmacSignature: `sha256=${Math.random().toString(36).substring(2, 26)}`,
      payloadSnippet: '{"event":"event.published","eventId":"EVT-9001","status":"Publicado"}'
    };

    data.deliveryLogs.unshift(newLog);
    persistDeveloper(data);
    return { success: true, log: newLog, message: '🚀 Webhook de teste disparado com sucesso e assinado via HMAC sha256!' };
  }
};
