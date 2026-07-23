import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";

export default function ExtensionLogsPage() {
  const { data, loading } = useMarketplace();

  if (loading || !data || !data.logs) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando logs do sandbox...
        </div>
      </AdminLayout>
    );
  }

  const { logs } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Logs de Sandbox (Execução Isolada)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore chamadas de sistema, tempos de processamento e avisos de privilégio de extensões externas em tempo real.
          </p>
        </div>

        {/* Logs List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {logs.map(log => (
              <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] uppercase border ${log.severity === "warning" ? "bg-amber-50 text-amber-700 border-amber-150" : "bg-blue-50 text-blue-700 border-blue-150"}`}>
                      {log.severity}
                    </span>
                    <strong className="text-slate-800">Plugin ID: {log.extensionId}</strong>
                  </div>
                  <p className="text-slate-600 my-0 leading-relaxed">{log.message}</p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
