import { useState, useEffect } from 'react';
import { getAiCommandMetrics } from '../../../services/agenticAiService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Bot, Zap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AiCommandCenterPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAiCommandMetrics();
      setMetrics(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando AI Command Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          AI Command Center & Agentic Operations 🧠
        </h1>
        <p className="mt-2 text-gray-500">Centro de comando autônomo com 18 agentes especializados trabalhando colaborativamente.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Agentes Ativos</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{metrics?.activeAgentsCount} Agentes</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Tarefas Executadas Hoje</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{metrics?.tasksExecutedToday}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Sucesso</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{metrics?.automationSuccessRate}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Economia Estimada</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{metrics?.estimatedSavingsHours}</span>
        </Card>
      </div>
    </div>
  );
}
