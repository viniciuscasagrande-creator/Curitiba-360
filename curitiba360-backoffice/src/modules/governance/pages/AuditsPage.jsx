import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { FileCheck, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function AuditsPage() {
  const [auditLogs] = useState([
    { id: "aud-01", scope: "PCI DSS v4.0 Check", status: "compliant", auditor: "QSA Certifiers Ltd", checkedAt: "2026-07-20T10:00:00Z" },
    { id: "aud-02", scope: "LGPD Data Retention Audit", status: "non_compliant", auditor: "Internal DPO Office", checkedAt: "2026-07-21T14:30:00Z" }
  ]);

  const [criticalFindings, setCriticalFindings] = useState([
    { id: "find-01", description: "Retenção excessiva de logs de transações contendo dados pessoais sem anonimização.", severity: "critical", slaDays: 3, resolved: false },
    { id: "find-02", description: "Ambiente de sandbox compartilhando chaves de acesso com produção.", severity: "critical", slaDays: 1, resolved: false }
  ]);

  const resolveFinding = (id) => {
    setCriticalFindings(criticalFindings.map(f => f.id === id ? { ...f, resolved: true } : f));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Auditorias & Conformidade</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">Acompanhe escopos de checagem PCI-DSS, relatórios regulatórios e logs de conformidade de políticas internas.</p>
        </div>

        {/* Achados Críticos Section */}
        <section className="bg-red-50/50 border border-red-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={20} />
            <h3 className="text-lg font-bold my-0">Achados Críticos de Auditoria</h3>
          </div>
          <div className="divide-y divide-red-100">
            {criticalFindings.map(find => (
              <div key={find.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900 my-0 leading-relaxed">{find.description}</p>
                  <p className="text-[10px] text-red-650 my-0">Gravidade: <span className="font-bold uppercase">{find.severity}</span> | Prazo de Resolução: <span className="font-bold">{find.slaDays} dia(s)</span></p>
                </div>
                <div>
                  {find.resolved ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-250 font-bold">
                      <CheckCircle size={12} /> Mitigado
                    </span>
                  ) : (
                    <button
                      onClick={() => resolveFinding(find.id)}
                      className="h-8 px-3 text-xs font-bold text-white bg-red-700 hover:bg-red-800 rounded-xl cursor-pointer border-none transition"
                    >
                      Mitigar Risco
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit scope logs */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Status das Auditorias Recentes</h3>
          <div className="divide-y divide-slate-100">
            {auditLogs.map(log => (
              <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-3">
                    <strong className="text-slate-900 text-sm">{log.scope}</strong>
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      Auditado por: {log.auditor}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 my-0">Data de Auditoria: {new Date(log.checkedAt).toLocaleString()}</p>
                </div>

                <div>
                  {log.status === "compliant" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 text-xs">
                      Conforme
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold border border-red-200 text-xs">
                      Não Conforme
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
