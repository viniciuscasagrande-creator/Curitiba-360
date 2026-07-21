import { useState, useEffect } from 'react';
import { getWhatIfSimulations } from '../../../services/autonomousEnterpriseService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Layers, ArrowUpRight } from 'lucide-react';

export default function ScenarioSimulatorPage() {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getWhatIfSimulations();
      setSimulations(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Simulador de Cenários What-If...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Simulador de Cenários Estratégicos (What-If) 🔮
        </h1>
        <p className="mt-2 text-gray-500">Simulação de impacto financeiro, operacional e riscos antes da execução real.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {simulations.map(sim => (
          <Card key={sim.id} className="p-6 space-y-3 flex flex-col justify-between border-l-4 border-l-blue-600">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="blue">Risco: {sim.riskLevel}</Badge>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-2">{sim.scenarioName}</h2>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Impacto Previsto:</strong> {sim.predictedRevenueImpact || sim.predictedCapacityIncrease}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-semibold">Recomendação IA: {sim.recommendedAction}</span>
              <button className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition flex items-center gap-1">
                Executar Simulação Completa <ArrowUpRight size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
