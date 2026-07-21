import { useState, useEffect } from 'react';
import { getWorkflows } from '../../../services/developerPlatformService';
import Card from '../../../components/ui/Card';
import StatusBadge from '../../../components/admin/StatusBadge';
import { GitBranch, ArrowRight } from 'lucide-react';

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getWorkflows();
      setWorkflows(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando automações Low-Code...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Automação Low-Code & Workflows 🌿
        </h1>
        <p className="mt-2 text-gray-500">Construção visual de fluxos de automação de eventos e ações encadeadas.</p>
      </div>

      <div className="space-y-4">
        {workflows.map(wf => (
          <Card key={wf.id} className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitBranch size={20} className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">{wf.name}</h2>
              </div>
              <StatusBadge status={wf.status} />
            </div>

            <p className="text-xs text-gray-500 font-mono">
              <strong className="text-gray-900">Gatilho (Trigger):</strong> {wf.trigger}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {wf.steps.map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl font-semibold text-xs">
                    {step}
                  </span>
                  {idx < wf.steps.length - 1 && <ArrowRight size={14} className="text-gray-400" />}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
