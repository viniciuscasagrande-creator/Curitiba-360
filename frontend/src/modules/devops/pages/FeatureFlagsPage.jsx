import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDevopsDashboard } from "../hooks/useDevopsDashboard";
import { ShieldAlert, AlertTriangle } from "lucide-react";

export default function FeatureFlagsPage() {
  const { flags, toggleFlag, loading } = useDevopsDashboard();
  const [warningFlag, setWarningFlag] = useState(null);

  const handleToggle = (flag) => {
    if (flag.environment === "production") {
      setWarningFlag(flag);
    } else {
      toggleFlag(flag.id);
    }
  };

  const confirmToggle = () => {
    if (warningFlag) {
      toggleFlag(warningFlag.id);
      setWarningFlag(null);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-80 animate-pulse bg-slate-200 rounded-3xl" />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Feature Flags & Rollouts</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Gerencie liberação progressiva de código em produção de forma segura sem necessidade de novos deploys.</p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="space-y-4">
            {flags.map(flag => (
              <div key={flag.id} className="p-4 border border-slate-200 rounded-2xl flex justify-between items-center bg-slate-50/50">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 my-0 flex items-center gap-2">
                    {flag.name}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                      {flag.environment.toUpperCase()}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 my-0">{flag.description}</p>
                  <p className="text-[10px] text-slate-400 my-0">Lançamento: {flag.percentage}% dos usuários</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(flag)}
                    className={`h-9 px-4 rounded-xl text-xs font-bold border cursor-pointer transition ${flag.enabled ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-none' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-350'}`}
                  >
                    {flag.enabled ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Modal */}
        {warningFlag && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
              <div className="flex gap-3 text-amber-600">
                <AlertTriangle size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 my-0 text-lg">Atenção: Feature Flag em Produção</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Você está alterando o comportamento do código em produção. Isso impactará os usuários ativos.</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setWarningFlag(null)}
                  className="h-9 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmToggle}
                  className="h-9 px-4 rounded-xl border-none bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                >
                  Confirmar Alteração
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
