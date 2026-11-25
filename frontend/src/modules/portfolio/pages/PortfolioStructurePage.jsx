import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, GitFork } from "lucide-react";

export default function PortfolioStructurePage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Estrutura de Portfólio</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a decomposição hierárquica desde o macro-portfólio até as histórias e tarefas técnicas das squads de desenvolvimento.
          </p>
        </div>

        {/* Hierarchy tree */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <GitFork size={18} className="text-purple-755 font-bold" /> Hierarquia do Portfólio Curitiba 360
          </h3>

          <div className="space-y-3 font-mono text-[10px]">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 font-sans">
              <strong className="text-slate-900 block text-xs">Portfólio: Inovação Urbana 2027</strong>
              <div className="ml-4 mt-2 border-l-2 border-purple-200 pl-4 space-y-2">
                <div>
                  <strong className="text-slate-800 block text-[11px]">Programa: Smart Mobility & Transito Autônomo</strong>
                  <div className="ml-4 border-l-2 border-blue-200 pl-4">
                    <span className="text-[10px] text-slate-600 block">Projeto: Estação Tubo Inteligente Central (progresso: 75%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
