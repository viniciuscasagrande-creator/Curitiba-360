import { useState, useEffect } from 'react';
import { getAgentsList } from '../../../services/agenticAiService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatusBadge from '../../../components/admin/StatusBadge';

export default function AgentsLibraryPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getAgentsList();
      setAgents(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando biblioteca de agentes...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Biblioteca de Agentes Especializados 🤖
        </h1>
        <p className="mt-2 text-gray-500">Agentes autônomos para Financeiro, CRM, Marketing, Operações, Atendimento e Fraude.</p>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase font-semibold text-gray-700">
              <tr>
                <th className="p-3">Nome do Agente</th>
                <th className="p-3">Domínio</th>
                <th className="p-3">Escopo de Atuação</th>
                <th className="p-3">Taxa de Sucesso</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agents.map(ag => (
                <tr key={ag.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold text-gray-900">{ag.name}</td>
                  <td className="p-3 font-semibold text-purple-700">{ag.domain}</td>
                  <td className="p-3 text-xs text-gray-700">{ag.role}</td>
                  <td className="p-3 font-bold text-emerald-600">{ag.successRate}</td>
                  <td className="p-3">
                    <StatusBadge status={ag.status} />
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
