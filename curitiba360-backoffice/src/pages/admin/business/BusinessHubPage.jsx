import { useState, useEffect } from 'react';
import { getBusinessHubMetrics } from '../../../services/businessPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Building2, Store, DollarSign, TrendingUp } from 'lucide-react';

export default function BusinessHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getBusinessHubMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Business Hub Executivo...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Business Hub & Platform Ecosystem 🏢
        </h1>
        <p className="mt-2 text-gray-500">Ecossistema de negócios multiempresa, parceiros, faturamento e marketplaces ativos.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Empresas Ativas</span>
          <span className="text-3xl font-black text-gray-900 mt-1 block">{data?.activeCompanies}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Parceiros Credenciados</span>
          <span className="text-3xl font-black text-blue-600 mt-1 block">{data?.activePartners}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">GMV Mensal Plaftorm</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{data?.monthlyGmv}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Receita Recorrente (MRR)</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{data?.recurringRevenue}</span>
        </Card>
      </div>
    </div>
  );
}
