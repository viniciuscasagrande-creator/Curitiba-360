import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnersB2b } from "../hooks/usePartnersB2b";
import { Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

export default function ReviewsPage() {
  const { partners, loading } = usePartnersB2b();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando ranking e avaliações...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Ranking & Avaliações de Parceiros</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a nota média de satisfação dos parceiros com base nas resenhas deixadas por turistas no aplicativo móvel.
          </p>
        </div>

        {/* Reviews ranking list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Star size={18} className="text-purple-755 font-bold" fill="currentColor" /> Classificação de Excelência
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {partners.map((p, index) => (
              <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div className="flex items-center gap-3">
                  <strong className="text-purple-700 text-sm font-mono w-4">#{index + 1}</strong>
                  <div>
                    <strong className="text-slate-900 text-xs block">{p.name}</strong>
                    <span className="text-[10px] text-slate-505 block">ID: {p.id} | Tipo: {p.type}</span>
                  </div>
                </div>
                <strong className="text-slate-900 font-mono">{p.rating} ★</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
