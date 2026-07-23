import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/experience" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Motor de Recomendações de IA</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a relevância e conversão das sugestões geográficas e colaborativas enviadas via aplicativo ou e-mail.
          </p>
        </div>

        {/* Recommendations list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Sparkles size={18} className="text-purple-755" /> Sugestões Recomendadas
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Visita à Vinícola Araucária (Tour)</strong>
                <span className="text-[10px] text-slate-505 block">Motivo: Recomendado porque comprou passeios gastronômicos e o clima está favorável.</span>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>Score Confiança: 96%</span>
                <span>•</span>
                <span>Canal: Push App</span>
                <span className="text-emerald-700 font-bold">Ativa</span>
              </div>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Aluguel de Bicicleta no Parque Barigui</strong>
                <span className="text-[10px] text-slate-505 block">Motivo: Recomendado com base na proximidade física do visitante e clima ensolarado.</span>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>Score Confiança: 88%</span>
                <span>•</span>
                <span>Canal: Push App</span>
                <span className="text-emerald-700 font-bold">Ativa</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
