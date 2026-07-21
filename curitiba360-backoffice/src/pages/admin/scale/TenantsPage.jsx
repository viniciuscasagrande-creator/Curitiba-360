import { useState, useEffect } from 'react';
import { getOrganizations } from '../../../services/platformService';
import { formatCurrency } from '../../../utils/formatCurrency';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Building2, Users, DollarSign } from 'lucide-react';

export default function TenantsPage() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getOrganizations();
      setOrgs(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando organizações multi-tenant...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Multi-Tenant & Organizações 🏢
        </h1>
        <p className="mt-2 text-gray-500">Isolamento de dados por organizationId, planos e faturamento recorrente (MRR).</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Organização</th>
                <th className="p-3">Nome da Entidade</th>
                <th className="p-3">Plano</th>
                <th className="p-3">MRR (Mensal)</th>
                <th className="p-3">Usuários Ativos</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orgs.map(org => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-gray-900">{org.id}</td>
                  <td className="p-3 font-bold text-gray-900">{org.name}</td>
                  <td className="p-3 font-semibold text-purple-700">{org.plan}</td>
                  <td className="p-3 font-bold text-emerald-600">{formatCurrency(org.mrr)}</td>
                  <td className="p-3 font-bold text-gray-900">{org.usersCount}</td>
                  <td className="p-3">
                    <StatusBadge status={org.status} />
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
