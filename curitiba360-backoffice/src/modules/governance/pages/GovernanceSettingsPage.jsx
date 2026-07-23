import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { Shield, Key, AlertTriangle, Fingerprint } from "lucide-react";

export default function GovernanceSettingsPage() {
  const [rto, setRto] = useState(15);
  const [rpo, setRpo] = useState(5);

  const saveSettings = () => {
    alert("Parâmetros de RTO e RPO atualizados com sucesso!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Configurações de Governança</h1>
          <p className="mt-2 text-sm text-slate-650 my-0">Ajuste tolerâncias de tempo de inatividade (RTO/RPO) e frequência de auditorias de código.</p>
        </div>

        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 max-w-xl">
          <h3 className="text-lg font-bold text-slate-900 my-0">Parâmetros de Tolerância de Risco</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">RTO Alvo (Recovery Time Objective - Minutos)</label>
              <input
                type="number"
                value={rto}
                onChange={(e) => setRto(Number(e.target.value))}
                className="h-9 px-3 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">RPO Alvo (Recovery Point Objective - Minutos)</label>
              <input
                type="number"
                value={rpo}
                onChange={(e) => setRpo(Number(e.target.value))}
                className="h-9 px-3 text-xs border border-slate-200 rounded-xl"
              />
            </div>

            <button
              onClick={saveSettings}
              className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl border-none cursor-pointer transition"
            >
              Salvar Parâmetros
            </button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
