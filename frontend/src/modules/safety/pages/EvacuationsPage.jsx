import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function EvacuationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/safety/muster-points" className="text-purple-755 font-bold">Pontos de Encontro</Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fila de Evacuação de Emergência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Controle e audite fluxos de evacuação parciais ou totais ativados em setores do evento.
          </p>
        </div>

        {/* Evacuations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <RefreshCw size={18} className="text-purple-755 font-bold" /> Status de Operações Ativas
          </h3>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Nenhuma evacuação ativa no momento.</strong>
              <span className="text-[10px] text-slate-505 block">Todos os setores operando dentro dos limites de segurança.</span>
            </div>
            <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
              SEGURO
            </span>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
