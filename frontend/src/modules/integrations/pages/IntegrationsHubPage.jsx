import React, { useState, useEffect } from 'react';
import { integrationsService } from '../services/integrationsService';
import CrmConnectorsCard from '../components/CrmConnectorsCard';
import ErpInvoicingPanel from '../components/ErpInvoicingPanel';
import SyncLogsTable from '../components/SyncLogsTable';
import { Layers } from 'lucide-react';

export default function IntegrationsHubPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await integrationsService.getIntegrationsOverview();
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

  const handleToggle = async (connectorId) => {
    await integrationsService.toggleConnectorStatus(connectorId);
    loadData();
  };

  const handleSync = async (connectorId) => {
    const res = await integrationsService.triggerManualSync(connectorId);
    alert(res.message);
    loadData();
  };

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando Hub de Integrações...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-600" /> Hub de Integrações & Ecossistema de Parceiros
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Conectores nativos com CRM, Automação de Marketing, ERPs Contábeis e Emissão de Notas Fiscais (NFS-e).
          </p>
        </div>
      </div>

      <CrmConnectorsCard crmConnectors={data.crmConnectors || []} onToggle={handleToggle} onSync={handleSync} />
      <ErpInvoicingPanel erpConnectors={data.erpConnectors || []} onSync={handleSync} />
      <SyncLogsTable logs={data.syncLogs || []} />
    </div>
  );
}
