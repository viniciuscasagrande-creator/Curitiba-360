import { INITIAL_AI_COPILOT_DATA } from '../data/aiCopilotMockData';

const STORAGE_KEY_COPILOT = 'curitiba360_agent_copilot_v1';

function getStoredCopilot() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_COPILOT);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_COPILOT, JSON.stringify(INITIAL_AI_COPILOT_DATA));
      return INITIAL_AI_COPILOT_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do Copiloto IA:', error);
    return INITIAL_AI_COPILOT_DATA;
  }
}

function persistCopilot(data) {
  try {
    localStorage.setItem(STORAGE_KEY_COPILOT, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do Copiloto IA:', error);
  }
}

export const aiCopilotService = {
  async getCopilotOverview(agentId = 'AGT-2001') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    const data = getStoredCopilot();
    return { success: true, data };
  },

  async sendCopilotMessage(userPrompt) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let data = getStoredCopilot();

    const timeStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `MSG-${Date.now()}-U`, sender: 'user', texto: userPrompt, timestamp: timeStr };

    let aiReplyText = `Com base na sua solicitação ("${userPrompt}"), recomendo priorizar os clientes com mais de 80% de chance de conversão e enviar um cupom especial de 10%.`;

    if (userPrompt.toLowerCase().includes('meta')) {
      aiReplyText = '🎯 Para fechar a meta deste mês, você precisa de apenas R$ 2.200. Sugiro entrar em contato com a Empresa Tecnologia X (Oportunidade OPP-301).';
    } else if (userPrompt.toLowerCase().includes('whatsapp') || userPrompt.toLowerCase().includes('mensagem')) {
      aiReplyText = '📱 Gere uma mensagem otimizada no nosso gerador automático com o tom "Consultivo e Amigável" para garantir maior taxa de leitura.';
    }

    const aiMsg = { id: `MSG-${Date.now()}-A`, sender: 'ai', texto: aiReplyText, timestamp: timeStr };

    data.copilotChatHistory = [...(data.copilotChatHistory || []), userMsg, aiMsg];
    persistCopilot(data);
    return { success: true, chatHistory: data.copilotChatHistory };
  },

  async generateWhatsappCopy(clientName = 'Cliente', eventName = 'Passeio em Curitiba', tone = 'amigavel') {
    await new Promise((resolve) => setTimeout(resolve, 200));

    let copy = `Olá, ${clientName}! 🌟 Tudo bem? Aqui é a Carolina do Curitiba 360. Vi que você demonstrou interesse no ${eventName}. Temos uma oferta exclusiva válida por 24h! Posso garantir a sua reserva?`;
    if (tone === 'urgente') {
      copy = `⚠️ Olá ${clientName}! Últimos lugares disponíveis para o ${eventName} neste final de semana! Garanta agora com voucher promocional antes que esgote!`;
    } else if (tone === 'corporativo') {
      copy = `Prezado(a) ${clientName}, boa tarde. Seguem as condições especiais para atendimento do grupo referente ao ${eventName}. Ficamos à disposição para fechamento.`;
    }

    return { success: true, copy };
  },

  async toggleAutomation(automationId) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    let data = getStoredCopilot();
    const index = data.automations.findIndex((a) => a.id === automationId);
    if (index === -1) throw new Error('Automação não encontrada.');

    data.automations[index].status = data.automations[index].status === 'ativa' ? 'pausada' : 'ativa';
    persistCopilot(data);
    return { success: true, automation: data.automations[index] };
  }
};
