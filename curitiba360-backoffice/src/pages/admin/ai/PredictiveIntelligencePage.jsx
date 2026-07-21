import { useState, useEffect } from 'react';
import { getAIIntelligenceAlerts } from '../../../services/predictiveEngineService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Sparkles, Brain, TrendingUp } from 'lucide-react';

export default function PredictiveIntelligencePage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAIIntelligenceAlerts();
      setAlerts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando inteligência preditiva e modelos de IA...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          IA Preditiva & Previsão de Inteligência 🤖
        </h1>
        <p className="mt-2 text-gray-500">Previsão de demanda em tempo real, inteligência de precificação e scoring de retenção.</p>
      </div>

      <div className="space-y-4">
        {alerts.map(item => (
          <Card key={item.id} className="p-6 space-y-3 border-l-4 border-l-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={20} className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
              </div>
              <Badge variant="blue">Confiança IA: {item.confidenceScore}</Badge>
            </div>

            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Insight Detectado:</strong> {item.insight}
            </p>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 flex items-center justify-between">
              <div>
                <strong className="font-bold text-blue-950 block">Ação Recomendada:</strong>
                <span>{item.recommendedAction}</span>
              </div>
              <button className="px-4 py-2 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition">
                Executar Ação
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
