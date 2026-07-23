import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { Shield, ShieldAlert, CheckCircle } from "lucide-react";

export default function SecurityTestsPage() {
  const { security, loading } = useQualityDashboard();

  if (loading || !security) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de segurança...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Testes de Segurança (SecOps)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Valide as checagens automatizadas de dependências (SCA) e a integridade de injeção XSS/SQL do código estático (SAST).
          </p>
        </div>

        {/* Security status metrics list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Auditoria SecOps Estática</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Vulnerabilidades SAST Encontradas</span>
              <strong className="text-emerald-700">{security.sastVulnerabilities}</strong>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Pacotes Desatualizados com CVE (SCA)</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${security.scaOutdatedPackages > 0 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                {security.scaOutdatedPackages} Alertas
              </span>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Assinatura & Validação JWT</span>
              <strong className="text-slate-800 capitalize">{security.jwtValidationStatus}</strong>
            </div>
            <div className="py-3 first:pt-0 last:pb-0 flex justify-between items-center">
              <span>Proteções contra XSS / CSRF</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-bold">
                Ativo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
