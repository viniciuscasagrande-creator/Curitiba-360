import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Droplet } from "lucide-react";

export default function UtilityWaterPage() {
  const { utilities, loading } = useSmartCityDashboard();

  if (loading || !utilities) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados hídricos...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Monitoramento Hídrico & Saneamento</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a telemetria do consumo de água potável em atrações urbanas e taxas gerais de perdas de distribuição da Sanepar.
          </p>
        </div>

        {/* Water stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Droplet size={18} className="text-purple-755 font-bold" /> Medições de Vazão Hídrica
          </h3>

          <div className="divide-y divide-slate-100 font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Consumo Diário Acumulado</strong>
                <span className="text-[10px] text-slate-505 block">Consumo medido em medidores ultrassônicos inteligentes.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">{utilities.water.todayM3.toLocaleString()} m³</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Taxa de Perda Física</strong>
                <span className="text-[10px] text-slate-505 block">Perdas em vazamento de rede subterrânea estimadas por IA.</span>
              </div>
              <strong className="text-red-750 text-sm font-mono">{utilities.water.lossRate}%</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
