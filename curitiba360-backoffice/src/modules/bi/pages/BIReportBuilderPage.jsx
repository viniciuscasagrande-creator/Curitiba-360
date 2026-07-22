import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { PlusCircle, BarChart4 } from "lucide-react";

export default function BIReportBuilderPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Construtor de Relatórios Personalizados</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Monte e personalize análises cruzando métricas semânticas com dimensões e filtros específicos.</p>
        </div>

        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <BarChart4 size={20} />
            <h3 className="text-lg font-bold my-0">Novo Relatório Ad-hoc</h3>
          </div>
          <p className="text-xs text-slate-505 my-0">Selecione métricas e dimensões na barra lateral para montar uma visualização em tabela, linha ou barra.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
