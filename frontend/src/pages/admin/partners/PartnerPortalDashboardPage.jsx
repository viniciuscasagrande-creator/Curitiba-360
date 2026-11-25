import { useState, useEffect } from 'react';
import { getPartnerPortalMetrics } from '../../../services/partnerPortalService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Building2, DollarSign, Calendar, Star, TrendingUp } from 'lucide-react';

export default function PartnerPortalDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getPartnerPortalMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Portal do Parceiro B2B...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            Portal do Parceiro B2B 🏢
          </h1>
          <p className="mt-1 text-gray-500 text-sm">Painel exclusivo do estabelecimento parceiro: {data?.partnerName}.</p>
        </div>
        <Badge variant="blue">Parceiro Credenciado 🌟</Badge>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Vendas Acumuladas</span>
            <DollarSign size={20} className="text-emerald-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">{formatCurrency(data?.salesTotal)}</h2>
          <span className="text-xs font-bold text-emerald-600">{data?.ordersCount} pedidos</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Próximo Repasse</span>
            <Calendar size={20} className="text-blue-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-blue-700">{formatCurrency(data?.nextPayoutAmount)}</h2>
          <span className="text-xs font-bold text-gray-500">Data: {data?.nextPayoutDate}</span>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Taxa de Conversão</span>
            <TrendingUp size={20} className="text-purple-600" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-purple-700">{data?.conversionRate}</h2>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase">Avaliação Clientes</span>
            <Star size={20} className="text-amber-500" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-amber-500">⭐ {data?.averageRating} / 5.0</h2>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Vendas Recentes do Parceiro</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Pedido</th>
                <th className="p-3">Item / Serviço</th>
                <th className="p-3">Data</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.recentSales?.map(s => (
                <tr key={s.orderId} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{s.orderId}</td>
                  <td className="p-3 font-semibold text-gray-800">{s.item}</td>
                  <td className="p-3 text-xs">{s.date}</td>
                  <td className="p-3 font-bold text-emerald-600">{formatCurrency(s.amount)}</td>
                  <td className="p-3">
                    <Badge variant="green">Pago</Badge>
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
