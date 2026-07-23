import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { HardDrive, Play, Lock, RefreshCw } from "lucide-react";

export default function BackupsPage() {
  const [policies] = useState(INITIAL_GOVERNANCE_DASHBOARD_MOCK.backupPolicies);
  const [executions, setExecutions] = useState(INITIAL_GOVERNANCE_DASHBOARD_MOCK.backupExecutions);

  const runBackupManual = (policyId) => {
    const newExec = {
      id: `be-${Date.now()}`,
      policyId,
      startedAt: new Date().toISOString(),
      finishedAt: new Date(Date.now() + 15000).toISOString(),
      status: "succeeded",
      sizeBytes: 8520420,
      checksum: "e5f6a1b2c3d4",
      storageLocation: "gs://curitiba360-manual-backups",
      encrypted: true,
      errorMessage: null
    };
    setExecutions([newExec, ...executions]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Políticas & Execução de Backups</h1>
          <p className="mt-2 text-sm text-slate-650 my-0">Gerencie regras de retenção, backups imutáveis baseados em WORM e confira logs de checksums de integridade.</p>
        </div>

        {/* Backup Policies List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Políticas de Backup Cadastradas</h3>
          <div className="divide-y divide-slate-100">
            {policies.map(policy => (
              <div key={policy.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <strong className="text-slate-900 text-sm">{policy.name}</strong>
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded font-bold text-[10px]">
                      {policy.frequency.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-500 my-0">Tipo: <span className="font-semibold text-slate-700">{policy.backupType}</span> | Retenção: <span className="font-semibold text-slate-700">{policy.retentionDays} dias</span></p>
                  <div className="flex gap-2 text-[10px] text-slate-400">
                    {policy.encrypted && <span className="flex items-center gap-0.5 text-emerald-600"><Lock size={10} /> Criptografado</span>}
                    {policy.immutable && <span className="text-indigo-600 font-medium">Imutável (WORM)</span>}
                  </div>
                </div>

                <button
                  onClick={() => runBackupManual(policy.id)}
                  className="h-8 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1"
                >
                  <Play size={12} /> Executar Agora
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Executions Log */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Histórico de Execuções Recentes</h3>
          <div className="divide-y divide-slate-100">
            {executions.map(exec => (
              <div key={exec.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-slate-800 font-mono">ID: {exec.id}</strong>
                  <div className="text-[10px] text-slate-400 mt-1">
                    <span>Destino: {exec.storageLocation}</span>
                    <span className="mx-2">•</span>
                    <span>Checksum: {exec.checksum}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 text-[10px]">
                    CONCLUÍDO ({(exec.sizeBytes / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                  <span className="block text-[10px] text-slate-400 mt-1">{new Date(exec.startedAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
