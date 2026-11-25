import { useState, useEffect } from 'react';
import { getBankingAccounts } from '../../../services/businessPlatformService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Landmark, CreditCard, DollarSign } from 'lucide-react';

export default function BankingServicePage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getBankingAccounts();
      setAccounts(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Banking as a Service (BaaS)...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Banking as a Service (BaaS) 🏦
        </h1>
        <p className="mt-2 text-gray-500">Contas digitais corporativas, PIX, antecipação de recebíveis e split automático.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Conta BaaS</th>
                <th className="p-3">Titular / Empresa</th>
                <th className="p-3">Saldo Disponível</th>
                <th className="p-3">Chaves PIX</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {accounts.map(acc => (
                <tr key={acc.accountId} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{acc.accountId}</td>
                  <td className="p-3 font-sans font-bold text-gray-900">{acc.holder}</td>
                  <td className="p-3 font-bold text-emerald-600">{acc.balance}</td>
                  <td className="p-3 font-sans text-purple-700 font-bold">{acc.pixKeys} cadastradas</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={acc.status} />
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
