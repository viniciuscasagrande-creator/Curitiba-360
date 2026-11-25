import React, { useState, useEffect } from 'react';
import { aiService } from '../services/aiService';
import AiCopilotChatPanel from '../components/AiCopilotChatPanel';
import AiModelRouterGateway from '../components/AiModelRouterGateway';
import FraudRiskScoreWidget from '../components/FraudRiskScoreWidget';
import AutomationRuleEnginePanel from '../components/AutomationRuleEnginePanel';
import { Bot } from 'lucide-react';

export default function AiCenterHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await aiService.getAiOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendPrompt = async (prompt) => {
    await aiService.sendCopilotPrompt(prompt);
    loadData();
  };

  const handleToggleRule = async (ruleId) => {
    await aiService.toggleAutomationRule(ruleId);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Central de Inteligência Artificial...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600 animate-bounce" /> Central de Inteligência Artificial, Analytics & Automação (MOD-11)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            IA Gateway, Copiloto do Produtor, Antifraude com Score de Risco, RAG Vector Search e Motor de Regras IF/THEN.
          </p>
        </div>
      </div>

      <AiModelRouterGateway status={data.aiGatewayStatus || {}} modelos={data.modelosDisponiveis || []} />
      <AiCopilotChatPanel conversations={data.copilotConversations || []} onSendPrompt={handleSendPrompt} />
      <FraudRiskScoreWidget scores={data.fraudRiskScores || []} />
      <AutomationRuleEnginePanel regras={data.regrasAutomacao || []} onToggleRule={handleToggleRule} />
    </div>
  );
}
