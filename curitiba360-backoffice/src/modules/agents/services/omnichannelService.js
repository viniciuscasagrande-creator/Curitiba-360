import { INITIAL_OMNICHANNEL_DATA } from '../data/omnichannelMockData';

const STORAGE_KEY_OMNICHANNEL = 'curitiba360_agent_omnichannel_v1';

function getStoredOmnichannel() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_OMNICHANNEL);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_OMNICHANNEL, JSON.stringify(INITIAL_OMNICHANNEL_DATA));
      return INITIAL_OMNICHANNEL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados Omnichannel:', error);
    return INITIAL_OMNICHANNEL_DATA;
  }
}

function persistOmnichannel(data) {
  try {
    localStorage.setItem(STORAGE_KEY_OMNICHANNEL, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados Omnichannel:', error);
  }
}

export const omnichannelService = {
  async getOmnichannelOverview(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredOmnichannel();
    return { success: true, data };
  },

  async sendMessage(conversationId, text, channel = 'whatsapp') {
    await new Promise((resolve) => setTimeout(resolve, 200));
    let data = getStoredOmnichannel();
    const index = data.conversations.findIndex((c) => c.id === conversationId);
    if (index === -1) throw new Error('Conversa não encontrada.');

    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const dateStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    const newMsg = {
      id: `M-${Date.now()}`,
      sender: 'agent',
      texto: text,
      timestamp: timeStr,
      canal: channel
    };

    data.conversations[index].mensagens.push(newMsg);
    data.conversations[index].ultimaMensagemTexto = text;
    data.conversations[index].ultimaMensagemData = dateStr;
    data.conversations[index].status = 'atendido';
    data.conversations[index].naoLidas = 0;

    persistOmnichannel(data);
    return { success: true, conversation: data.conversations[index] };
  },

  async listTemplates() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredOmnichannel();
    return { success: true, templates: data.templates || [] };
  }
};
