import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function WasteManagementPage() {
  const { summary, loading } = useSmartCityDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando gestão de resíduos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Resíduos & Limpeza Pública</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o nível de preenchimento das lixeiras eletrônicas inteligentes (smart bins) e a otimização de rotas de coleta de lixo.
          </p>
        </div>

        {/* Waste stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Trash2 size={18} className="text-purple-755 font-bold" /> Lixeiras Eletrônicas em Alerta
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Lixeiras Inteligentes em Nível Crítico</strong>
              <span className="text-[10px] text-slate-505 block">Dispositivos com nível de preenchimento acima de 80%. Coleta solicitada automaticamente.</span>
            </div>
            <strong className="text-red-750 text-sm font-mono">{summary.wasteFillCriticalAlerts} Alertas</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
