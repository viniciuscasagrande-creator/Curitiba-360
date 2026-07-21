import { INITIAL_AI_CORE_DATA } from '../data/aiCoreMockData';

const STORAGE_KEY_AI_CORE = 'curitiba360_ai_core_v1';

function getStoredAiCore() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_AI_CORE);
    if (!data) {
      localStorage.setItem(STORAGE_KEY_AI_CORE, JSON.stringify(INITIAL_AI_CORE_DATA));
      return INITIAL_AI_CORE_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados do AI Core:', error);
    return INITIAL_AI_CORE_DATA;
  }
}

function persistAiCore(data) {
  try {
    localStorage.setItem(STORAGE_KEY_AI_CORE, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados do AI Core:', error);
  }
}

export const aiService = {
  async getAiOverview() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const data = getStoredAiCore();
    return { success: true, data };
  },

  async sendCopilotPrompt(userPrompt) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let data = getStoredAiCore();

    const userMsg = {
      id: `MSG-${Date.now()}`,
      remetente: 'Produtor',
      texto: userPrompt,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    let aiAnswer = '🤖 Analisei os dados em tempo real no BigQuery. Seus eventos estão com ótima performance de conversão (+14.2% nesta semana)!';

    if (userPrompt.toLowerCase().includes('receber') || userPrompt.toLowerCase().includes('financeiro')) {
      aiAnswer = '💰 Você possui R$ 722.000,00 disponíveis para solicitação de repasse Pix imediato com taxa zero!';
    } else if (userPrompt.toLowerCase().includes('relatório') || userPrompt.toLowerCase().includes('executivo')) {
      aiAnswer = '📄 Relatório Executivo Gerado: 1.250 participantes confirmados, 98% check-in sem filas, ROI de campanha Mkt em 4.2x.';
    }

    const aiMsg = {
      id: `MSG-AI-${Date.now()}`,
      remetente: 'Curitiba 360 AI',
      texto: aiAnswer,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    data.copilotConversations.push(userMsg);
    data.copilotConversations.push(aiMsg);
    persistAiCore(data);

    return { success: true, userMsg, aiMsg };
  },

  async toggleAutomationRule(ruleId) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    let data = getStoredAiCore();
    const rule = data.regrasAutomacao.find((r) => r.id === ruleId);
    if (rule) {
      rule.status = rule.status === 'ativo' ? 'inativo' : 'ativo';
      persistAiCore(data);
    }
    return { success: true };
  }
};
