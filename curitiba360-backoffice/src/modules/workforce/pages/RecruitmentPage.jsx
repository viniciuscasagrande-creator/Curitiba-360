import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, Plus, Users } from "lucide-react";

export default function RecruitmentPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <ArrowLeft size={14} /> Voltar ao Painel
          </Link>
          <Link to="/admin/workforce/candidates" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
            <Users size={14} /> Banco de Candidatos
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Vagas & Recrutamento</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o funil de contratação, triagem curricular automatizada com IA e entrevistas agendadas.
          </p>
        </div>

        {/* Vacancies list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Briefcase size={18} className="text-purple-755 font-bold" /> Processos Seletivos Ativos
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Guia de Turismo Bilíngue (Festival)</strong>
                <span className="text-[10px] text-slate-505 block">Departamento: Operações | Tipo: Temporário | Requisitos: Fluência em Inglês/Espanhol</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>12 inscritos</span>
                <span>•</span>
                <span>3 entrevistas</span>
                <span className="text-emerald-700 font-bold">Publicada</span>
              </div>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Líder de Atendimento e Hospitalidade</strong>
                <span className="text-[10px] text-slate-505 block">Departamento: Atendimento | Tipo: Efetivo (CLT) | Requisitos: Experiência em hotelaria/turismo</span>
              </div>
              <div className="flex items-center gap-4 font-mono text-[9px] text-slate-455 shrink-0">
                <span>18 inscritos</span>
                <span>•</span>
                <span>1 proposta</span>
                <span className="text-emerald-700 font-bold">Em Seleção</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
