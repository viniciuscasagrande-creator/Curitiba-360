import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";

export default function ReviewsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Moderação de Avaliações</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Modere avaliações enviadas por turistas para atrações, parques e roteiros da cidade.
          </p>
        </div>

        {/* Reviews list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <MessageSquare size={18} className="text-purple-755" /> Avaliações Pendentes
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">"Lindo demais, porém poucas rampas no mirante."</strong>
                <span className="text-[10px] text-slate-505 block">Parque Tanguá • Nota: 4/5★ • Autor: Mariana Souza • Sentimento: Neutro</span>
              </div>
              <div className="flex gap-2 shrink-0 font-sans">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2 py-1 rounded border-none cursor-pointer">Aprovar</button>
                <button className="bg-red-650 hover:bg-red-700 text-white font-bold px-2 py-1 rounded border-none cursor-pointer">Rejeitar</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
