import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Kanban } from "lucide-react";

export default function PortfolioKanbanPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Quadro Kanban do PMO</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a evolução de histórias, tarefas técnicas e features do portfólio.
          </p>
        </div>

        {/* Kanban Board */}
        <section className="grid gap-6 md:grid-cols-4">
          {/* Backlog / To Do */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 space-y-3">
            <h4 className="font-bold text-slate-900 my-0 flex justify-between items-center text-xs">
              <span>A Fazer</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded">2</span>
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
              <strong className="text-slate-900 text-xs block">Documentar chaves OAuth2</strong>
              <span className="text-[10px] text-slate-505 block">ID: TASK-402 | Inovação</span>
            </div>
          </div>

          {/* Doing */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 space-y-3">
            <h4 className="font-bold text-slate-900 my-0 flex justify-between items-center text-xs">
              <span>Em Execução</span>
              <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded">1</span>
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
              <strong className="text-slate-900 text-xs block">Instalar Totens de Praça</strong>
              <span className="text-[10px] text-slate-505 block">ID: TASK-209 | Infra</span>
            </div>
          </div>

          {/* Testing / Review */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 space-y-3">
            <h4 className="font-bold text-slate-900 my-0 flex justify-between items-center text-xs">
              <span>Em Teste</span>
              <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded">1</span>
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
              <strong className="text-slate-900 text-xs block">Simulação de Rota Integrada</strong>
              <span className="text-[10px] text-slate-505 block">ID: TASK-108 | IA</span>
            </div>
          </div>

          {/* Done */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 space-y-3">
            <h4 className="font-bold text-slate-900 my-0 flex justify-between items-center text-xs">
              <span>Concluído</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded">1</span>
            </h4>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-1">
              <strong className="text-slate-900 text-xs block">Mock da Malha Urbana 3D</strong>
              <span className="text-[10px] text-slate-505 block">ID: TASK-084 | Twin</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
