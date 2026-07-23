import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";

export default function TrainingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/workforce/certifications" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            Controle de Certificações
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Treinamentos Obrigatórios & Capacitações</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie o catálogo de cursos e acompanhe a taxa de conclusão de treinamentos regulatórios.
          </p>
        </div>

        {/* Trainings list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <GraduationCap size={18} className="text-purple-755 font-bold" /> Programas de Capacitação
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Treinamento de Acessibilidade & Hospitalidade</strong>
                <span className="text-[10px] text-slate-505 block">Duração: 120min | Formato: EAD / Vídeo | Elegibilidade: Obrigatório para Atendimento e Bilheteria</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Primeiros Socorros & Brigada de Incêndio (CIPA)</strong>
                <span className="text-[10px] text-slate-505 block">Duração: 480min | Formato: Presencial | Elegibilidade: Obrigatório para Operações</span>
              </div>
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase">
                Ativo
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
