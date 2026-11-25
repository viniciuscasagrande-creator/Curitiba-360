import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSecurityDashboard } from "../hooks/useSecurityDashboard";
import { ShieldAlert, CheckCircle, AlertTriangle, ShieldX, Play } from "lucide-react";

export default function RiskManagementPage() {
  const { vulnerabilities, fixVulnerability, loading } = useSecurityDashboard();

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded font-bold text-[10px]">CRÍTICO</span>;
      case "high":
        return <span className="bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded font-bold text-[10px]">ALTO</span>;
      case "medium":
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold text-[10px]">MÉDIO</span>;
      default:
        return <span className="bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-bold text-[10px]">BAIXO</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Riscos & Vulnerabilidades</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monitore varreduras estáticas de código (SAST), análise de dependências (SCA) e portas expostas.</p>
        </div>

        {/* Vulnerabilities scan status */}
        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Vulnerabilidades de Software Detectadas</h3>
          {loading ? (
            <div className="text-xs text-slate-400 py-4 text-center">Carregando auditorias...</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {vulnerabilities.map(vuln => (
                <div key={vuln.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-900 text-sm">{vuln.title}</span>
                      {getSeverityBadge(vuln.severity)}
                    </div>
                    <p className="text-[10px] text-slate-400 my-0">Detectada em: {new Date(vuln.detectedAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {vuln.status === "fixed" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 text-xs">
                        <CheckCircle size={12} /> Corrigida
                      </span>
                    ) : (
                      <button
                        onClick={() => fixVulnerability(vuln.id)}
                        className="h-8 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition"
                      >
                        Corrigir via Patch
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Port scanning policy */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert size={20} className="text-purple-400" />
            <h3 className="font-extrabold text-sm my-0 uppercase tracking-wider text-purple-200">Port Scanning & WAF Telemetry</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Firewall (Cloudflare WAF)</span>
              <strong className="text-emerald-400 mt-1 block">Ativo & Protegendo</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Portas Abertas Permitidas</span>
              <strong className="text-slate-200 mt-1 block">HTTPS (443) / HTTP (80)</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
