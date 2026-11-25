import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign } from "lucide-react";

export default function PayrollPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Folha de Pagamento & Proventos</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe demonstrativos de pagamento de salários, comissões de vendas, impostos de terceiros e adiantamentos.
          </p>
        </div>

        {/* Payroll event summary */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <DollarSign size={18} className="text-purple-755 font-bold" /> Proventos do Mês (Julho/2026)
          </h3>

          <div className="divide-y divide-slate-100">
            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Salário Base (Carlos Roberto)</strong>
                <span className="text-[10px] text-slate-505 block">Competência: Julho/2026 | Tipo: Provento | Categoria: Operações</span>
              </div>
              <strong className="text-slate-900 font-mono text-xs">R$ 5.200,00</strong>
            </div>

            <div className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
              <div>
                <strong className="text-slate-900 text-xs block">Dedução INSS (Carlos Roberto)</strong>
                <span className="text-[10px] text-slate-505 block">Competência: Julho/2026 | Tipo: Desconto | Alíquota: 14%</span>
              </div>
              <strong className="text-red-750 font-mono text-xs">-R$ 728,00</strong>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
