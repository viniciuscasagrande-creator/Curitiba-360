import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";

export default function DeveloperLogsPage() {
  const { logs, loading } = useDeveloperDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando logs de API...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Logs de API (Gateway)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore em tempo real as respostas HTTP do API Gateway e identifique erros de integração de clientes.
          </p>
        </div>

        {/* Logs List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100 text-xs">
            {logs.map(log => (
              <div key={log.id} className="py-3 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${log.status >= 400 ? "bg-red-50 text-red-700 border border-red-150" : "bg-emerald-50 text-emerald-700 border border-emerald-150"}`}>
                      {log.status}
                    </span>
                    <strong className="text-slate-800">{log.method} {log.path}</strong>
                  </div>
                  <p className="text-[10px] text-slate-400 my-0">IP: {log.ip} | Latência: {log.latencyMs}ms | Data: {new Date(log.timestamp).toLocaleString()}</p>
                </div>
                {log.errorMsg && (
                  <span className="text-[10px] text-red-600 bg-red-50 px-2.5 py-0.5 rounded border border-red-100 font-semibold">
                    {log.errorMsg}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
