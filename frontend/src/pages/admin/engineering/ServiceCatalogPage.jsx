import { useState, useEffect } from 'react';
import { getEngineeringMetrics } from '../../../services/engineeringPlatformService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { Server } from 'lucide-react';

export default function ServiceCatalogPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getEngineeringMetrics();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando Catálogo de Serviços...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Catálogo Interno de Serviços 📦
        </h1>
        <p className="mt-2 text-gray-500">Registro de microsserviços, repositórios, owners, linguagens e status de saúde.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Nome do Serviço</th>
                <th className="p-3">Domínio de Negócio</th>
                <th className="p-3">Equipe Owner</th>
                <th className="p-3">Stack / Linguagem</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {data?.services?.map(s => (
                <tr key={s.name} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{s.name}</td>
                  <td className="p-3 font-sans font-semibold text-purple-700">{s.domain}</td>
                  <td className="p-3 font-sans text-gray-700">{s.owner}</td>
                  <td className="p-3 text-blue-700 font-bold">{s.language}</td>
                  <td className="p-3 font-sans">
                    <Badge variant="green">Saudável 🟢</Badge>
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
