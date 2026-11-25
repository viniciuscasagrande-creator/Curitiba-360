import React, { useState, useEffect } from 'react';
import { developerPortalService } from '../services/developerPortalService';
import SandboxEnvironmentCard from '../components/SandboxEnvironmentCard';
import SdkCodeSnippetsPanel from '../components/SdkCodeSnippetsPanel';
import InteractiveApiPlayground from '../components/InteractiveApiPlayground';
import DeveloperDashboardMetricsCard from '../components/DeveloperDashboardMetricsCard';
import OAuthClientManagerPanel from '../components/OAuthClientManagerPanel';
import WebhookTesterReplayPanel from '../components/WebhookTesterReplayPanel';
import CliCommandSimulator from '../components/CliCommandSimulator';
import { Code2 } from 'lucide-react';

export default function DeveloperPortalScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await developerPortalService.getPortalOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleEnv = async (mode) => {
    await developerPortalService.switchEnvironmentMode(mode);
    loadData();
  };

  const handleExecuteRequest = async (endpoint) => {
    return await developerPortalService.executePlaygroundRequest(endpoint);
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Portal do Desenvolvedor...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-purple-600" /> Central do Desenvolvedor, SDKs & Playground Sandbox
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Baixe nossos SDKs em Node.js, Python e PHP, teste a API em tempo real e alterne entre Sandbox e Produção.
          </p>
        </div>
      </div>

      <DeveloperDashboardMetricsCard />
      <SandboxEnvironmentCard sandboxInfo={data.sandboxInfo || {}} onToggleEnv={handleToggleEnv} />
      <OAuthClientManagerPanel />
      <SdkCodeSnippetsPanel sdks={data.sdksDisponiveis || []} />
      <WebhookTesterReplayPanel />
      <InteractiveApiPlayground endpoints={data.playgroundEndpoints || []} onExecuteRequest={handleExecuteRequest} />
      <CliCommandSimulator />
    </div>
  );
}
