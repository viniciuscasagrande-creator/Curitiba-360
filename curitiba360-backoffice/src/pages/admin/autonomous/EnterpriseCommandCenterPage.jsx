import { useState, useEffect } from 'react';
import { getEnterpriseCommandMetrics, getGoalList } from '../../../services/autonomousEnterpriseService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Target, Bot, Zap, DollarSign } from 'lucide-react';

export default function EnterpriseCommandCenterPage() {
  const [metrics, setMetrics] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const m = await getEnterpriseCommandMetrics();
      const g = await getGoalList();
      setMetrics(m);
      setGoals(g);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Enterprise Command Center...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Autonomous Enterprise Command Center 🚀
        </h1>
        <p className="mt-2 text-gray-500">Plataforma autônoma orientada por objetivos estratégicos com 156 agentes colaborativos.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Objetivos Estratégicos</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{metrics?.strategicGoalsCount} OKRs</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Agentes em Colaboração</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{metrics?.collaboratingAgentsCount} Agentes</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Processos Autônomos</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{metrics?.autonomousProcessesCount}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Economia Mensal Estimada</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{metrics?.monthlyEstimatedSavings}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Objetivos Estratégicos Corporativos (OKRs)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Título do Objetivo</th>
                <th className="p-3">Área Responsável</th>
                <th className="p-3">Meta / Target</th>
                <th className="p-3">Progresso</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {goals.map(g => (
                <tr key={g.id} className="hover:bg-gray-50">
                  <td className="p-3 font-sans font-bold text-gray-900">{g.title}</td>
                  <td className="p-3 font-sans text-purple-700 font-semibold">{g.area}</td>
                  <td className="p-3 font-bold text-emerald-600">{g.target}</td>
                  <td className="p-3 font-bold text-blue-600">{g.progress}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={g.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
