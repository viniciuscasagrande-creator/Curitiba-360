import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useWorkforceDashboard } from "../hooks/useWorkforceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export default function ContractorsPage() {
  const { summary, loading } = useWorkforceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando dados de prestadores...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/workforce" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Prestadores PJ & Terceirizados</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Gerencie empresas parceiras, alocação de equipes terceirizadas para eventos e faturamento de horas.
          </p>
        </div>

        {/* Contractors list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1.5">
            <Users size={18} className="text-purple-755 font-bold" /> Contratos de Terceiros Ativos
          </h3>

          <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center text-sans font-sans">
            <div>
              <strong className="text-slate-900 text-xs block">Segurança Integrada Curitiba Ltda.</strong>
              <span className="text-[10px] text-slate-505 block">Efetivo Alocado: 12 vigilantes | Escala: Eventos Finais de Semana | Vigência: 2027-01-31</span>
            </div>
            <strong className="text-purple-700 text-sm font-mono">{summary.activeContractors} Prestadores</strong>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
