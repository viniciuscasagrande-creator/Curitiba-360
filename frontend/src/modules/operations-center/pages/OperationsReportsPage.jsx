import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useOperationsDashboard } from "../hooks/useOperationsDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";

export default function OperationsReportsPage() {
  const { reports, loading } = useOperationsDashboard();

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando relatórios...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/operations" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Centro
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios Pós-Operação</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acesse o histórico consolidade de vendas totais, picos de público presentes, conformidade de SLA de incidentes e lições aprendidas.
          </p>
        </div>

        {/* Reports list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans">Relatórios Fechados</h3>
          <div className="divide-y divide-slate-100">
            {reports.map(rep => (
              <div key={rep.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">{rep.eventName}</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold tracking-wider text-[8px]">
                      {rep.date}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455">
                    <span>Acessos: {rep.checkins.toLocaleString()}</span>
                    <span>•</span>
                    <span>Receita: R$ {rep.revenue.toLocaleString()}</span>
                    <span>•</span>
                    <span>SLA: {rep.slaCompliance}%</span>
                  </div>
                </div>

                <button className="h-8 px-3 font-bold text-purple-755 hover:text-purple-805 bg-purple-50 hover:bg-purple-100 border-none rounded-xl cursor-pointer transition flex items-center gap-1 font-sans text-xs">
                  <Download size={12} /> Baixar PDF
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
