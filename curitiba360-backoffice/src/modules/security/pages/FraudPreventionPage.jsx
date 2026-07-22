import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSecurityDashboard } from "../hooks/useSecurityDashboard";
import { ShieldAlert, AlertTriangle, ShieldCheck, XCircle, Check } from "lucide-react";

export default function FraudPreventionPage() {
  const { fraudAlerts, approveFraudAlert, blockFraudAlert, loading } = useSecurityDashboard();

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Prevenção a Fraude & Bots</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Acompanhe alertas transacionais suspeitos em tempo real e bloqueios automáticos de bots de checkout.</p>
        </div>

        {/* Bot telemetry info */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-red-400" />
            <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-red-200">Proteção contra Bots & DDoS</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl my-0">
            Filtros do WAF bloqueiam crawlers e bots maliciosos tentando realizar scraping de ingressos ou ataques de força bruta no checkout.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
            <div>
              <span className="text-slate-400 block">Recomposições bloqueadas</span>
              <strong className="text-slate-200 mt-1 block">42,400 requisições/dia</strong>
            </div>
            <div>
              <span className="text-slate-400 block">DDoS mitigados</span>
              <strong className="text-slate-200 mt-1 block">0 ativos</strong>
            </div>
            <div>
              <span className="text-slate-400 block">PCI-DSS Status</span>
              <strong className="text-emerald-400 mt-1 block">COMPLIANT</strong>
            </div>
          </div>
        </section>

        {/* Flagged transactions */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Transações Suspeitas Requerendo Ação</h3>
          {loading ? (
            <div className="text-xs text-slate-400 py-4 text-center">Carregando fraudes...</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {fraudAlerts.map(alert => (
                <div key={alert.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-3">
                      <strong className="text-slate-900 text-sm">{alert.customerName}</strong>
                      <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                        {alert.orderId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${alert.riskScore >= 90 ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                        Risco: {alert.riskScore}%
                      </span>
                    </div>
                    <p className="text-slate-500 my-0">Motivo: <strong className="text-slate-700">{alert.reason}</strong> | Valor: <strong className="text-slate-800">R$ {alert.amount.toFixed(2)}</strong></p>
                    <p className="text-[10px] text-slate-400 my-0">Status do alerta: <strong className="uppercase">{alert.status}</strong></p>
                  </div>

                  {alert.status === "under_review" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveFraudAlert(alert.id)}
                        className="h-8 px-3 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl cursor-pointer border border-emerald-200 transition flex items-center gap-1"
                      >
                        <Check size={12} /> Liberar
                      </button>
                      <button
                        onClick={() => blockFraudAlert(alert.id)}
                        className="h-8 px-3 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl cursor-pointer border border-red-200 transition flex items-center gap-1"
                      >
                        <XCircle size={12} /> Recusar e Bloquear
                      </button>
                    </div>
                  )}

                  {alert.status === "approved" && (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs flex items-center gap-1">
                      <Check size={12} /> Aprovada Manualmente
                    </span>
                  )}

                  {alert.status === "blocked" && (
                    <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200 text-xs flex items-center gap-1">
                      <XCircle size={12} /> Transação Bloqueada
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
