import { useState, useEffect } from 'react';
import { getEnterpriseOperations } from '../../../services/enterpriseOperationsService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { FileText, Building2 } from 'lucide-react';

export default function VendorContractsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getEnterpriseOperations();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando governança de contratos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Governança de Fornecedores & Contratos 📄
        </h1>
        <p className="mt-2 text-gray-500">Contratos ativos de fornecedores críticos, valores anuais e alertas de renovação (90 dias de aviso prévio).</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Contrato</th>
                <th className="p-3">Fornecedor Crítico</th>
                <th className="p-3">Valor Anual</th>
                <th className="p-3">Revisão Prévia</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.vendorContracts?.map(cnt => (
                <tr key={cnt.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{cnt.id}</td>
                  <td className="p-3 font-sans font-bold text-gray-900">{cnt.vendor}</td>
                  <td className="p-3 font-bold text-emerald-600">{cnt.annualValue}</td>
                  <td className="p-3 font-sans text-purple-700 font-bold">{cnt.renewalNoticeDays} dias antes</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={cnt.status} />
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
