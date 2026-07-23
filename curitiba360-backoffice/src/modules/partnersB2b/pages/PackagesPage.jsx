import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";

export default function PackagesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/partners-b2b" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Combos & Pacotes Turísticos Inteligentes</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Crie e gerencie combos promocionais casando diárias de hotéis com cupons de restaurantes e ingressos de parques de Curitiba.
          </p>
        </div>

        {/* Packages overview */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Gift size={18} className="text-purple-755 font-bold" /> Pacotes Cadastrados
          </h3>

          <div className="p-4 bg-purple-50 rounded-2xl flex justify-between items-center text-sans font-sans border border-purple-100">
            <div>
              <strong className="text-slate-900 text-xs block">Combo Casal: Jardim Botânico + Jantar Italiano</strong>
              <span className="text-[10px] text-slate-505 block">Inclui: 2 ingressos rápidos + 1 voucher Churrascaria | Preço: R$ 290,00</span>
            </div>
            <strong className="text-purple-700 text-xs uppercase font-mono">Válido</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
