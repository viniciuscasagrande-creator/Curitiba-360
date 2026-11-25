import { useState, useEffect } from 'react';
import { getDataPlatformMetrics } from '../../../services/dataPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { DollarSign, TrendingUp, Users, Heart, PieChart } from 'lucide-react';

export default function ExecutiveCockpitPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getDataPlatformMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Executive Cockpit & BI Corporativo...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Executive Cockpit & BI Corporativo 📊
        </h1>
        <p className="mt-2 text-gray-500">Visão consolidada executiva de GMV, Receita, Margem EBITDA, LTV, CAC e NPS.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">GMV Acumulado</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{data?.gmv}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Receita Líquida</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{data?.revenue}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Margem EBITDA</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{data?.ebitdaMargin}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">NPS Institucional</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">⭐ {data?.nps}</span>
        </Card>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">LTV Médio por Cliente</span>
          <span className="text-xl font-bold text-gray-900 mt-1 block">{data?.ltv}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">CAC (Custo Aquisição)</span>
          <span className="text-xl font-bold text-blue-600 mt-1 block">{data?.cac}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Churn</span>
          <span className="text-xl font-bold text-emerald-600 mt-1 block">{data?.churnRate}</span>
        </Card>
      </div>
    </div>
  );
}
