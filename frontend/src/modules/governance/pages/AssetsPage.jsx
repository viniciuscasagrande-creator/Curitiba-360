import React, { useState } from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { INITIAL_GOVERNANCE_DASHBOARD_MOCK } from "../mocks/governanceDashboardMock";
import { Layers, Plus, Database, Cpu, Network } from "lucide-react";

export default function AssetsPage() {
  const [assets, setAssets] = useState(INITIAL_GOVERNANCE_DASHBOARD_MOCK.assets);
  const [filterType, setFilterType] = useState("all");

  const filteredAssets = filterType === "all" ? assets : assets.filter(a => a.type === filterType);

  const getCriticallyColor = (crit) => {
    switch (crit) {
      case "critical": return "bg-red-50 text-red-700 border-red-200";
      case "high": return "bg-orange-50 text-orange-700 border-orange-200";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Inventário de Ativos (Assets)</h1>
            <p className="mt-2 text-sm text-slate-600 my-0">Identifique e classifique bancos de dados, chaves, Cloud Functions e APIs sob governança do backoffice.</p>
          </div>
          <button className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1">
            <Plus size={14} /> Novo Ativo
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <button onClick={() => setFilterType("all")} className={`h-8 px-4 text-xs font-semibold rounded-lg transition border border-slate-200 cursor-pointer ${filterType === "all" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
            Todos
          </button>
          <button onClick={() => setFilterType("database")} className={`h-8 px-4 text-xs font-semibold rounded-lg transition border border-slate-200 cursor-pointer ${filterType === "database" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
            Bancos de Dados
          </button>
          <button onClick={() => setFilterType("api")} className={`h-8 px-4 text-xs font-semibold rounded-lg transition border border-slate-200 cursor-pointer ${filterType === "api" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50"}`}>
            APIs
          </button>
        </div>

        {/* Assets List */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="divide-y divide-slate-100">
            {filteredAssets.map(asset => (
              <div key={asset.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                    {asset.type === "database" ? <Database size={18} /> : <Cpu size={18} />}
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">{asset.name}</strong>
                    <span className="text-[10px] text-slate-400 capitalize">Tipo: {asset.type} | Time Responsável: {asset.owner}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border capitalize ${getCriticallyColor(asset.criticality)}`}>
                  {asset.criticality}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
