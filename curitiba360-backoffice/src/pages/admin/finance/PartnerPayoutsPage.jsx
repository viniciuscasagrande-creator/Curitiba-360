import { useState, useEffect } from 'react';
import { getPartnerSettlements } from '../../../services/settlementService';
import { formatCurrency } from '../../../utils/formatCurrency';
import StatusBadge from '../../../components/admin/StatusBadge';
import Card from '../../../components/ui/Card';

export default function PartnerPayoutsPage() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getPartnerSettlements();
      setPayouts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando repasses a parceiros...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Repasses e Liquidação B2B 🏦</h1>
        <p className="mt-2 text-gray-500">Gestão de liquidação financeira e repasse para hotéis, restaurantes e produtoras.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Repasse</th>
                <th className="p-3">Parceiro</th>
                <th className="p-3">Volume Bruto</th>
                <th className="p-3">Taxas Plataforma</th>
                <th className="p-3">Líquido a Repassar</th>
                <th className="p-3">Data Agendada</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payouts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{p.id}</td>
                  <td className="p-3 font-semibold text-gray-800">{p.partnerName}</td>
                  <td className="p-3 font-bold text-gray-900">{formatCurrency(p.grossAmount)}</td>
                  <td className="p-3 text-red-600 font-medium">-{formatCurrency(p.fees)}</td>
                  <td className="p-3 font-bold text-emerald-600">{formatCurrency(p.netAmount)}</td>
                  <td className="p-3 text-xs">{p.payoutDate}</td>
                  <td className="p-3">
                    <StatusBadge status={p.status} />
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
