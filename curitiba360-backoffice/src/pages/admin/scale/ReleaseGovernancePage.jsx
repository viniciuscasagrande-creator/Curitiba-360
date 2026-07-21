import { useState, useEffect } from 'react';
import { getReleaseGovernance } from '../../../services/releaseGovernanceService';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import { CheckCircle2, TestTube, ShieldCheck, GitPullRequest } from 'lucide-react';

export default function ReleaseGovernancePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const metrics = await getReleaseGovernance();
      setData(metrics);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 font-medium animate-pulse">
        Carregando governança de releases e suítes E2E...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Governança de Releases & Testes E2E 🧪
        </h1>
        <p className="mt-2 text-gray-500">Aprovação automatizada de deploys, execução de testes Cypress/Playwright e security scan.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Status do Pipeline</span>
          <span className="text-xl font-black text-emerald-600 mt-1 block">{data?.pipelineStatus}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Taxa de Aprovação E2E</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{data?.e2ePassRate}</span>
        </Card>

        <Card className="p-6 text-center">
          <span className="text-xs font-semibold text-gray-500 uppercase block">Security Scan SAST/DAST</span>
          <span className="text-xl font-bold text-purple-700 mt-1 block">{data?.securityScanResult}</span>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Suítes de Testes Automatizados E2E</h2>
        <div className="divide-y divide-gray-100">
          {data?.testSuites?.map(suite => (
            <div key={suite.name} className="py-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <div>
                  <span className="font-bold text-gray-900 block">{suite.name}</span>
                  <span className="text-xs text-gray-500">{suite.tests} cenários validados</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-gray-500">Tempo: {suite.duration}</span>
                <Badge variant="green">Passou 🟢</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
