import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function MissingPersonsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/safety" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Desaparecimento de Pessoas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe ocorrências de crianças ou dependentes perdidos na área de eventos ou parques turísticos de Curitiba.
          </p>
        </div>

        {/* Missing persons list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <HelpCircle size={18} className="text-purple-755 font-bold" /> Casos em Aberto
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Pedro Henrique (6 anos)</strong>
                <span className="text-[10px] text-slate-505 block">Descrição: Camiseta vermelha do Coritiba, calça jeans | Último Local: Praça da Alimentação | Responsável: Joana (mãe)</span>
              </div>
              <span className="text-[9px] bg-red-50 text-red-750 font-bold px-2 py-0.5 rounded border border-red-100 uppercase animate-pulse">
                Procurando
              </span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
