import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

export default function UtilityEnergyPage() {
  const { utilities, loading } = useSmartCityDashboard();

  if (loading || !utilities) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando consumo elétrico...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Consumo Elétrico & Smart Grid</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o consumo total em subestações Copel, economia por postes LED inteligentes dimerizados e geração fotovoltaica.
          </p>
        </div>

        {/* Energy stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Zap size={18} className="text-purple-755 font-bold" /> Geração & Consumo de Energia
          </h3>

          <div className="divide-y divide-slate-100 font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Consumo Diário Consolidado</strong>
                <span className="text-[10px] text-slate-505 block">Consumo aferido em tempo real nas redes públicas monitoradas.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">{utilities.energy.todayKwh.toLocaleString()} kWh</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Média de Consumo de Referência</strong>
                <span className="text-[10px] text-slate-505 block">Média calculada para o mesmo período sem otimizações de IA.</span>
              </div>
              <strong className="text-slate-705 text-sm font-mono">{utilities.energy.averageKwh.toLocaleString()} kWh</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Economia Registrada Hoje</strong>
                <span className="text-[10px] text-slate-505 block">Economia gerada por diminuição automática de luminosidade de postes de madrugada.</span>
              </div>
              <strong className="text-emerald-700 text-sm font-mono">-{utilities.energy.savingKwh.toLocaleString()} kWh</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
