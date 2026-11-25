import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function PersonalizationPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Personalização de Experiência</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Defina banners dinâmicos, blocos de destaque e ofertas ordenadas com base no clima de Curitiba, fuso ou tag do turista.
          </p>
        </div>

        {/* Personalization block */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Sparkles size={18} className="text-purple-755" /> Regras Contextuais Ativas
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Clima Chuvoso → Destaque Passeios Cobertos</strong>
                <span className="text-[10px] text-slate-505 block">Se clima em Curitiba for "chuva", substitui banner principal por "Museus & Ópera".</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativa
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-sm block">Tag VIP → Exibir Lounge no Aeroporto</strong>
                <span className="text-[10px] text-slate-505 block">Se o visitante tiver tag "VIP", destaca transfers de luxo e lounge Executivo.</span>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativa
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
