import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Leaf, CloudRain, Trash } from "lucide-react";

export default function EsgEnvironmentPage() {
  const { energyDetails, waterDetails, wasteDetails, loading } = useEsgDashboard();

  if (loading || !energyDetails) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores ambientais...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/esg" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Dimensão Ambiental (E)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Monitore o consumo hídrico, eficiência energética e a triagem de resíduos sólidos das atrações.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">
          {/* Energy card */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 my-0 flex items-center gap-1">
              <Leaf size={16} className="text-emerald-650" /> Matriz Energética
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span>Solar:</span>
                <span className="font-bold text-slate-700">{energyDetails.solarPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Eólica:</span>
                <span className="font-bold text-slate-700">{energyDetails.windPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Rede Pública:</span>
                <span className="font-bold text-slate-700">{energyDetails.gridPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Geradores fósseis:</span>
                <span className="font-bold text-slate-700">{energyDetails.generatorPercent}%</span>
              </div>
              <div className="border-t border-slate-50 pt-2 flex justify-between font-sans">
                <span>Índice Eficiência:</span>
                <span className="font-bold text-emerald-650">{energyDetails.efficiencyIndex}%</span>
              </div>
            </div>
          </div>

          {/* Water card */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 my-0 flex items-center gap-1">
              <CloudRain size={16} className="text-blue-500" /> Consumo Hídrico
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span>Volume Total:</span>
                <span className="font-bold text-slate-700">{waterDetails.totalConsumptionM3.toLocaleString()} m³</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Reuso:</span>
                <span className="font-bold text-emerald-650">{waterDetails.reusePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Captação de Chuva:</span>
                <span className="font-bold text-slate-700">{waterDetails.rainwaterCapturePercent}%</span>
              </div>
              <div className="flex justify-between">
                <span>Desperdício:</span>
                <span className="font-bold text-red-600">{waterDetails.wasteRatePercent}%</span>
              </div>
            </div>
          </div>

          {/* Waste card */}
          <div className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 my-0 flex items-center gap-1">
              <Trash size={16} className="text-purple-650" /> Triagem de Resíduos
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between">
                <span>Orgânicos:</span>
                <span className="font-bold text-slate-700">{wasteDetails.organicKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Papel/Papelão:</span>
                <span className="font-bold text-slate-700">{wasteDetails.paperKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Plástico:</span>
                <span className="font-bold text-slate-700">{wasteDetails.plasticKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Eletrônicos (e-Waste):</span>
                <span className="font-bold text-slate-700">{wasteDetails.eWasteKg.toLocaleString()} kg</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
