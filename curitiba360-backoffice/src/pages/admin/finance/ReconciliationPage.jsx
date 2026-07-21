import { useState, useEffect } from 'react';
import { getReconciliationIssues, resolveDivergence } from '../../../services/reconciliationService';
import { formatCurrency } from '../../../utils/formatCurrency';
import StatusBadge from '../../../components/admin/StatusBadge';
import Card from '../../../components/ui/Card';

export default function ReconciliationPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getReconciliationIssues();
      setIssues(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleResolve = async (id) => {
    await resolveDivergence(id, 'conciliado');
    const data = await getReconciliationIssues();
    setIssues(data);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando conciliação financeira...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Conciliação Financeira & Divergências ⚖️</h1>
        <p className="mt-2 text-gray-500">Comparação entre transações de gateway de pagamento e o Ledger do sistema.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Transação</th>
                <th className="p-3">Gateway</th>
                <th className="p-3">Tipo de Divergência</th>
                <th className="p-3">Valor Esperado</th>
                <th className="p-3">Valor Recebido</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.map(i => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{i.transactionId}</td>
                  <td className="p-3 font-semibold text-gray-800">{i.gateway}</td>
                  <td className="p-3 text-amber-600 font-medium">{i.type}</td>
                  <td className="p-3 font-bold text-gray-900">{formatCurrency(i.expectedAmount)}</td>
                  <td className="p-3 font-bold text-blue-600">{formatCurrency(i.receivedAmount)}</td>
                  <td className="p-3">
                    <StatusBadge status={i.status} />
                  </td>
                  <td className="p-3 text-center">
                    {i.status !== 'conciliado' && (
                      <button
                        onClick={() => handleResolve(i.id)}
                        className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition"
                      >
                        Conciliar
                      </button>
                    )}
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
