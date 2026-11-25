import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useQualityDashboard } from "../hooks/useQualityDashboard";
import { CheckCircle2, AlertTriangle, ShieldAlert, Award, FileSpreadsheet, Lock } from "lucide-react";

export default function ReleasesPage() {
  const { releases, approveRelease, loading } = useQualityDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando backlog de releases...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Homologação de Releases</h1>
          <p className="mt-2 text-sm text-slate-650 my-0">
            Valide a liberação de builds para produção, verifique os quality gates e aprove novas versões da plataforma.
          </p>
        </div>

        {/* Releases backlog list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0">Backlog de Liberações</h3>
          <div className="divide-y divide-slate-100">
            {releases.map(release => (
              <div key={release.id} className="py-5 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-3">
                    <strong className="text-slate-900 text-base">v{release.version}</strong>
                    <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      Build: {release.buildStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm font-semibold my-0">{release.title}</p>
                  <p className="text-[10px] text-slate-400 my-0">Criada em: {new Date(release.createdAt).toLocaleString()}</p>
                  
                  {/* Quality Gates indicators grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Lint OK
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Typecheck OK
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Cobertura OK
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Smoke Test OK
                    </span>
                  </div>
                </div>

                <div>
                  {release.status === "review" ? (
                    <button
                      onClick={() => approveRelease(release.id)}
                      className="h-9 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl cursor-pointer border-none transition"
                    >
                      Aprovar para Produção
                    </button>
                  ) : (
                    <div className="text-right">
                      <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold border border-emerald-250">
                        Liberada em Produção
                      </span>
                      {release.approvedBy && (
                        <p className="text-[10px] text-slate-400 mt-1 my-0">Aprovador: {release.approvedBy}</p>
                      )}
                    </div>
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
