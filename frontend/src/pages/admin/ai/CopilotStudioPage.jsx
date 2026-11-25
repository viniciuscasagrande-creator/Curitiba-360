import { useState, useEffect } from 'react';
import { getCopilotInsights } from '../../../services/copilotService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Bot, Sparkles, Brain, DollarSign, Users, Activity } from 'lucide-react';

export default function CopilotStudioPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getCopilotInsights();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Copilotos Generativos de IA...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          AI Copilot Studio & Assistentes Generativos 🤖
        </h1>
        <p className="mt-2 text-gray-500">Copilotos especializados para CRM, Financeiro, Operações, Marketing e Suporte.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="p-6 space-y-3 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">CRM Copilot</h2>
            </div>
            <Badge variant="purple">Probabilidade Retorno: {data?.crmCopilot?.returnProbability}</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Cliente:</strong> {data?.crmCopilot?.customerName} ({data?.crmCopilot?.totalPurchases} compras)
          </p>
          <div className="p-3 bg-purple-50 rounded-xl text-xs font-semibold text-purple-900">
            💡 <strong>Sugestão IA:</strong> {data?.crmCopilot?.recommendation}
          </div>
        </Card>

        <Card className="p-6 space-y-3 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={20} className="text-emerald-600" />
              <h2 className="text-lg font-bold text-gray-900">Finance Copilot</h2>
            </div>
            <Badge variant="green">Receita Prevista: {data?.financeCopilot?.predictedRevenue}</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Saúde Fluxo Caixa:</strong> {data?.financeCopilot?.cashflowHealth}
          </p>
          <div className="p-3 bg-emerald-50 rounded-xl text-xs font-semibold text-emerald-900">
            💡 <strong>Recomendação IA:</strong> {data?.financeCopilot?.recommendation}
          </div>
        </Card>

        <Card className="p-6 space-y-3 border-l-4 border-l-blue-600 sm:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Operations Copilot (Ao Vivo)</h2>
            </div>
            <Badge variant="blue">Monitoramento em Tempo Real</Badge>
          </div>
          <p className="text-sm text-gray-600">
            <strong className="text-gray-900">Diagnóstico:</strong> {data?.operationsCopilot?.checkinFlow}
          </p>
          <div className="p-3 bg-blue-50 rounded-xl text-xs font-semibold text-blue-900 flex items-center justify-between">
            <span>💡 <strong>Ação de Desgargalo:</strong> {data?.operationsCopilot?.recommendation}</span>
            <button className="px-3 py-1 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition">
              Executar Redirecionamento
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
