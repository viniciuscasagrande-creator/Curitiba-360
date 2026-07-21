import { useState, useEffect } from 'react';
import { getDeployments } from '../../../services/platformService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { Rocket } from 'lucide-react';

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getDeployments();
      setDeployments(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando histórico de deployments e CI/CD...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Deployments & Pipeline CI/CD 🚀
        </h1>
        <p className="mt-2 text-gray-500">Histórico de implantações automatizadas em Staging e Produção via GitHub Actions.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">ID Deploy</th>
                <th className="p-3">Versão</th>
                <th className="p-3">Ambiente</th>
                <th className="p-3">Estratégia</th>
                <th className="p-3">Autor / Trigger</th>
                <th className="p-3">Data / Hora</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono text-xs">
              {deployments.map(d => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{d.id}</td>
                  <td className="p-3 font-bold text-blue-700">{d.version}</td>
                  <td className="p-3 font-sans font-bold text-purple-700 uppercase">{d.environment}</td>
                  <td className="p-3 font-sans text-gray-700">{d.strategy}</td>
                  <td className="p-3 font-sans text-gray-800">{d.author}</td>
                  <td className="p-3 text-gray-500">{d.deployedAt}</td>
                  <td className="p-3 font-sans">
                    <StatusBadge status={d.status} />
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
