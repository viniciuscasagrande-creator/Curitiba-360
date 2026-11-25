import { useState, useEffect } from 'react';
import { getBusinessOsMetrics } from '../../../services/businessOperatingSystemService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Landmark, TrendingUp, Cpu, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function ExecutiveOperatingCenterPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getBusinessOsMetrics();
      setData(res);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Curitiba 360 Business Operating System (Business OS)...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Business Operating System (Business OS) 🏛️
        </h1>
        <p className="mt-2 text-gray-500">Sistema Operacional Corporativo unificando Estratégia, Operações, Finanças e Governança por IA.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Receita Consolidada</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">{data?.consolidatedRevenue}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Atingimento de OKRs</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.strategicGoalsAchievement}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Economia Gerada por IA</span>
          <span className="text-3xl font-black text-purple-700 mt-1 block">{data?.aiSavingsTotal}</span>
        </Card>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Saúde Operacional Global</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{data?.operationalHealth}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Projetos Críticos Ativos</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{data?.criticalProjectsCount} Projetos</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Agentes C-Level Ativos</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{data?.executiveAgentsCount} Agentes</span>
        </Card>
      </div>
    </div>
  );
}
