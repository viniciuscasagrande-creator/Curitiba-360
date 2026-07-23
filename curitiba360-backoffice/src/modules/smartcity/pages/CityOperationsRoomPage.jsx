import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

export default function CityOperationsRoomPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/smartcity" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Sala de Situação da Cidade (CODI)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Painel de comunicação integrado com o Centro de Operações de Curitiba para gestão coordenada de incidentes municipais.
          </p>
        </div>

        {/* Integration logs */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Activity size={18} className="text-purple-755 font-bold" /> Comunicações de Incidentes Urbanos
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Canal de Comunicação com CODI Ativo</strong>
              <span className="text-[10px] text-slate-505 block">Todos os sistemas operando de forma integrada. Envio automático de alertas de trânsito em andamento.</span>
            </div>
            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
              Integrado
            </span>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
