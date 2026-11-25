import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, GitFork } from "lucide-react";

export default function OrganizationChartPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Organograma Hierárquico</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Estrutura organizacional, subordinação e líderes de departamento do Curitiba 360.
          </p>
        </div>

        {/* Tree structure */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <GitFork size={18} className="text-purple-755 font-bold" /> Hierarquia Corporativa
          </h3>

          <div className="flex flex-col items-center gap-4 text-center font-mono">
            {/* Top Node */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl w-48 font-sans">
              <strong className="block text-purple-900 text-xs font-bold">Diretoria Executiva</strong>
              <span className="text-[10px] text-slate-505 block">CEO / Conselho</span>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            {/* Manager Node */}
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl w-48 font-sans">
              <strong className="block text-slate-900 text-xs font-bold">Gerência de Operações</strong>
              <span className="text-[10px] text-slate-505 block">Carlos Roberto</span>
            </div>

            <div className="h-6 w-px bg-slate-200" />

            {/* Subordinate Nodes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl w-40 font-sans">
                <strong className="block text-slate-900 text-[11px] font-bold">Coord. Bilheteria</strong>
                <span className="text-[9px] text-slate-505 block">Amanda Silva</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl w-40 font-sans">
                <strong className="block text-slate-900 text-[11px] font-bold">Coord. Segurança</strong>
                <span className="text-[9px] text-slate-505 block">Vaga em Aberto</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
