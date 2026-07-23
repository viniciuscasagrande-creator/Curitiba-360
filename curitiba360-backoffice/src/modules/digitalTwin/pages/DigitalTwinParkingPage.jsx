import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useDigitalTwin } from "../hooks/useDigitalTwin";
import { Link } from "react-router-dom";
import { ArrowLeft, Box } from "lucide-react";

export default function DigitalTwinParkingPage() {
  const { summary, loading } = useDigitalTwin();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando estacionamento rotativo...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/digital-twin/mobility" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Trânsito & Mobilidade
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Smart Parking (Estacionamento Rotativo)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a disponibilidade de vagas em áreas públicas monitoradas por sensores geomagnéticos ativos.
          </p>
        </div>

        {/* Parking stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Box size={18} className="text-purple-755 font-bold" /> Vagas Públicas Mapeadas
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Vagas Livres Detectadas</strong>
              <span className="text-[10px] text-slate-505 block">Dispositivos com sensores geomagnéticos embutidos no asfalto reportando vaga vaga.</span>
            </div>
            <strong className="text-purple-700 text-sm font-mono">{summary.smartParkingVacancyPct}% Livres</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
