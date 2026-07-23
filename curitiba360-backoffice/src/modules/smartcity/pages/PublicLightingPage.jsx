import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useSmartCityDashboard } from "../hooks/useSmartCityDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

export default function PublicLightingPage() {
  const { summary, loading } = useSmartCityDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando iluminação pública...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Iluminação Pública & Postes Inteligentes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie o parque de iluminação LED inteligente de Curitiba, controle dimerização automática por setores e ordens de manutenção de postes apagados.
          </p>
        </div>

        {/* Lighting stats */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Lightbulb size={18} className="text-purple-755 font-bold" /> Status do Parque de Lâmpadas
          </h3>

          <div className="divide-y divide-slate-100 font-sans">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Postes LED Inteligentes Ativos</strong>
                <span className="text-[10px] text-slate-505 block">Dispositivos conectados à rede Mesh LoRaWAN municipal.</span>
              </div>
              <strong className="text-purple-700 text-sm font-mono">{summary.streetLightingActive.toLocaleString()} Postes</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
              <div>
                <strong className="text-slate-900 text-xs block">Falhas de Lâmpada Detectadas</strong>
                <span className="text-[10px] text-slate-505 block">Postes reportados automaticamente sem corrente elétrica à noite.</span>
              </div>
              <strong className="text-red-750 text-sm font-mono">{summary.streetLightingFailures} Postes Apagados</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
