import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useEsgDashboard } from "../hooks/useEsgDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign } from "lucide-react";

export default function EsgEconomicPage() {
  const { summary, economicDetails, loading } = useEsgDashboard();

  if (loading || !economicDetails) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando indicadores econômicos...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/esg" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Fomento Econômico Local (E)</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe o retorno financeiro gerado pelo fluxo de turistas e a porcentagem de receita redistribuída às empresas locais.
          </p>
        </div>

        {/* Economic stats */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Receita Turística Direta</span>
            <span className="text-2xl font-extrabold text-slate-900 block">R$ {economicDetails.touristRevenueBrl.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Tributos Municipais Gerados</span>
            <span className="text-2xl font-extrabold text-slate-900 block">R$ {economicDetails.localTaxesBrl.toLocaleString()}</span>
          </div>

          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Parcerias Locais Ativas</span>
            <span className="text-2xl font-extrabold text-emerald-700 block">{economicDetails.localPartnerships} PMEs</span>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
