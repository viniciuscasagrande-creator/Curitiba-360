import React, { useState, useEffect } from 'react';
import { govService } from '../services/govService';
import ComplianceChecklistCard from '../components/ComplianceChecklistCard';
import RiskHeatmapWidget from '../components/RiskHeatmapWidget';
import AuditTrailLogsTable from '../components/AuditTrailLogsTable';
import { ShieldCheck } from 'lucide-react';

export default function GovernanceCompliancePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    govService.getGovOverview().then((res) => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-slate-900 min-h-screen p-12 text-center text-white space-y-3 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-purple-300 font-semibold animate-pulse">Carregando governança e compliance...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto text-xs text-slate-800">
      <div className="flex items-center justify-between border-b pb-4 border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" /> Governança Corporativa, Compliance & Riscos (MOD-16)
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Checklist de conformidade LGPD / ISO 27001 / PCI DSS, mapa de riscos e trilha de auditoria imutável.
          </p>
        </div>
      </div>

      <ComplianceChecklistCard checklist={data.complianceChecklist || []} />
      <RiskHeatmapWidget riscos={data.riscosIdentificados || []} />
      <AuditTrailLogsTable logs={data.auditLogs || []} />
    </div>
  );
}
