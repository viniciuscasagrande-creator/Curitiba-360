import { useState, useEffect } from 'react';
import { getFinopsMetrics, getOperationalContracts } from '../../../services/finopsService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { DollarSign, TrendingDown, ShieldCheck, FileText } from 'lucide-react';

export default function FinOpsPage() {
  const [data, setData] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getFinopsMetrics();
      const contractData = await getOperationalContracts();
      setData(metrics);
      setContracts(contractData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando FinOps & Governança de Custos...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          FinOps & Governança de Custos de Cloud 💰
        </h1>
        <p className="mt-2 text-gray-500">Unit economics por transação, otimização de infraestrutura GCP e governança orçamentária.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Gasto Mensal de Cloud</span>
          <span className="text-2xl font-black text-gray-900 mt-1 block">{data?.monthlyCloudSpend}</span>
          <span className="text-xs text-emerald-600 font-bold block mt-1">{data?.budgetVariance}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Custo por Transação</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{data?.costPerTransaction}</span>
          <span className="text-xs text-gray-500 block mt-1">Eficiência máxima</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Margem Unit Economics</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{data?.unitEconomics}</span>
        </Card>

        <Card className="p-5 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Economia Potencial</span>
          <span className="text-sm font-extrabold text-amber-600 mt-1 block">{data?.savingsOpportunity}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Distribuição dos Custos de Infraestrutura</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Serviço Cloud</th>
                <th className="p-3">Gasto Mensal</th>
                <th className="p-3">Participação %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.infrastructureBreakdown?.map(item => (
                <tr key={item.service} className="hover:bg-gray-50">
                  <td className="p-3 font-sans font-bold text-gray-900">{item.service}</td>
                  <td className="p-3 font-bold text-emerald-600">{item.spend}</td>
                  <td className="p-3 font-bold text-purple-700">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
