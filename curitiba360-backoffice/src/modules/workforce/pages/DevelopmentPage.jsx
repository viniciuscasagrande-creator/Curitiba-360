import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function DevelopmentPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce/performance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Desempenho
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Planos de Desenvolvimento (PDI)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie as metas de capacitação individual, mentorias agendadas e cursos recomendados.
          </p>
        </div>

        {/* PDIs list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <BookOpen size={18} className="text-purple-755 font-bold" /> PDIs Habilitados
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Desenvolvimento de Liderança (Carlos Roberto)</strong>
                <span className="text-[10px] text-slate-505 block">Objetivo: Habilitar para Gestor de Operações | Prazo: 2026-12-31 | Mentoria: Mensal com CEO</span>
              </div>
              <strong className="text-purple-700 font-mono text-xs">60% de Progresso</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
