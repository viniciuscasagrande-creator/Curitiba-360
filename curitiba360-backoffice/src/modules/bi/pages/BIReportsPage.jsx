import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { FileText, ClipboardList } from "lucide-react";

export default function BIReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios Executivos Consolidados</h1>
          <p className="mt-2 text-sm text-slate-600 my-0">Consulte relatórios gerenciais consolidados do ecossistema de vendas, financeiro e marketing.</p>
        </div>

        <section className="p-6 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-600">
            <ClipboardList size={20} />
            <h3 className="text-lg font-bold my-0">Relatório Consolidado de Vendas Semanais</h3>
          </div>
          <p className="text-xs text-slate-505 my-0">Relatório com métricas consolidadas (receita líquida, ticket médio, conversão) gerado em formato PDF/Excel.</p>
        </section>
      </div>
    </AdminLayout>
  );
}
