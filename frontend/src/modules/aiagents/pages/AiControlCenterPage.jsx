import React, { useState, useEffect } from 'react';
import { aiAgentsService } from '../services/aiAgentsService';
import AiControlCenterPanel from '../components/AiControlCenterPanel';
import MultiagentOrchestratorBoard from '../components/MultiagentOrchestratorBoard';
import AgentLibraryCatalog from '../components/AgentLibraryCatalog';
import { Bot } from 'lucide-react';

export default function AiControlCenterPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    aiAgentsService.getAiAgentsOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando AI Control Center...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800 font-medium">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-600 animate-bounce" /> AI Control Center, Agentes Autônomos & Orquestração (MOD-25)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Orquestração multiagente assíncrona, governança de IA com human-in-the-loop e biblioteca de copilotos por área.
          </p>
        </div>
      </div>

      <AiControlCenterPanel control={data.controlCenter || {}} />
      <MultiagentOrchestratorBoard fluxo={data.multiagentFlow || []} />
      <AgentLibraryCatalog agentes={data.agentesBiblioteca || []} />
    </div>
  );
}
