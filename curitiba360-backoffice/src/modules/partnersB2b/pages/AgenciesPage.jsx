import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark } from "lucide-react";

export default function AgenciesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Agências de Viagens & Operadoras B2B</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie o cadastro de operadoras nacionais e internacionais que revendem combos e atrativos de Curitiba.
          </p>
        </div>

        {/* Agencies overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Landmark size={18} className="text-purple-755 font-bold" /> Operadoras Conectadas (API / Portal)
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">CVC Corp & Operadoras Integradas</strong>
              <span className="text-[10px] text-slate-505 block">Sincronização xml/json ativa para vendas automatizadas.</span>
            </div>
            <strong className="text-emerald-700 text-xs">Ativo</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
