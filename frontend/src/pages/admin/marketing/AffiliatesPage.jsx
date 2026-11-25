import { useState, useEffect } from 'react';
import { getAffiliates } from '../../../services/affiliateService';
import { formatCurrency } from '../../../utils/formatCurrency';
import StatusBadge from '../../../components/admin/StatusBadge';
import Card from '../../../components/ui/Card';

export default function AffiliatesPage() {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAffiliates();
      setAffiliates(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando rede de afiliados...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rede de Afiliados & Comissões 🔗</h1>
        <p className="mt-2 text-gray-500">Gestão de links rastreáveis, promotores, blogs de turismo e comissionamento.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Afiliado</th>
                <th className="p-3">Nome / Blog / Canal</th>
                <th className="p-3">Código</th>
                <th className="p-3">Comissão %</th>
                <th className="p-3">Vendas Indicadas</th>
                <th className="p-3">Total Acumulado</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {affiliates.map(af => (
                <tr key={af.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{af.id}</td>
                  <td className="p-3 font-bold text-gray-900">{af.name}</td>
                  <td className="p-3 font-mono text-blue-600 font-bold">{af.code}</td>
                  <td className="p-3 font-semibold text-purple-700">{af.commissionRate}%</td>
                  <td className="p-3 font-bold text-gray-900">{af.referralsCount}</td>
                  <td className="p-3 font-bold text-emerald-600">{formatCurrency(af.totalEarned)}</td>
                  <td className="p-3">
                    <StatusBadge status={af.status} />
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
