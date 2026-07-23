import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDeveloperDashboard } from "../hooks/useDeveloperDashboard";
import { Cpu, Check } from "lucide-react";

export default function DeveloperPlansPage() {
  const { plans, loading } = useDeveloperDashboard();
  const [rates, setRates] = useState({});
  const [saved, setSaved] = useState(false);

  const handleRateChange = (planId, value) => {
    setRates(prev => ({
      ...prev,
      [planId]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando planos de API...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn max-w-xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos & Rate Limits</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Ajuste limites de concorrência por minuto e volumes mensais permitidos para cada plano de API.
          </p>
        </div>

        {/* Configuration form */}
        <form onSubmit={handleSave} className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-6 text-xs">
          {plans.map(p => {
            const currentVal = rates[p.id] !== undefined ? rates[p.id] : p.rateLimitMin;
            return (
              <div key={p.id} className="space-y-2 border-b border-slate-50 pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-slate-900 text-sm block">{p.name}</strong>
                    <span className="text-[10px] text-slate-400">Limite Mensal: {p.limitCalls.toLocaleString()} chamadas</span>
                  </div>
                  <strong className="text-purple-700 font-mono text-sm shrink-0">{currentVal} req/min</strong>
                </div>

                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={currentVal}
                  onChange={(e) => handleRateChange(p.id, Number(e.target.value))}
                  className="w-full"
                />
              </div>
            );
          })}

          <div className="flex items-center gap-2 pt-2">
            <button type="submit" className="h-9 px-4 font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition">
              Salvar Limites
            </button>
            {saved && (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <Check size={14} /> Rate limits salvos com sucesso!
              </span>
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
