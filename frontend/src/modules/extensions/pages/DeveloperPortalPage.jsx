import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useMarketplace } from "../hooks/useMarketplace";
import { Link } from "react-router-dom";
import { Code, DollarSign, Upload, CheckCircle } from "lucide-react";

export default function DeveloperPortalPage() {
  const { data, loading } = useMarketplace();

  if (loading || !data || !data.summary || !data.featuredExtensions) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando portal do desenvolvedor...
        </div>
      </AdminLayout>
    );
  }

  const { summary, featuredExtensions } = data;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Portal do Desenvolvedor B2B</h1>
            <p className="mt-2 text-sm text-slate-655 my-0">
              Gerencie seus plugins cadastrados, envie atualizações de versão e consulte splits financeiros consolidados.
            </p>
          </div>
          <Link
            to="/admin/marketplace/publicar"
            className="h-9 px-4 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-xl cursor-pointer border-none transition flex items-center gap-1 hover:no-underline"
          >
            <Upload size={14} /> Publicar Extensão
          </Link>
        </div>

        {/* Developer stats */}
        <section className="grid gap-6 md:grid-cols-3 text-xs">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Minhas Extensões</span>
            <strong className="text-xl font-extrabold text-slate-900 block">
              {featuredExtensions.filter(e => e.developerId === "dev-01").length} publicadas
            </strong>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Instalações Ativas</span>
            <strong className="text-xl font-extrabold text-slate-900 block">328 organizações</strong>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wider text-[9px]">Saldo para Saque</span>
            <strong className="text-xl font-extrabold text-emerald-600 block">R$ {summary.pendingPayouts.toLocaleString()}</strong>
          </div>
        </section>

        {/* Extensions managed by user */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0">Minhas Extensões Ativas</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {featuredExtensions.filter(e => e.developerId === "dev-01").map(ext => (
              <div key={ext.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                <div className="space-y-1">
                  <strong className="text-slate-900 text-sm block">{ext.name}</strong>
                  <span className="text-[10px] text-slate-400 block">Versão: {ext.currentVersion} | Preço: R$ {ext.price?.toFixed(2)}/mês</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-150 uppercase tracking-wider font-bold">
                  APROVADA
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
