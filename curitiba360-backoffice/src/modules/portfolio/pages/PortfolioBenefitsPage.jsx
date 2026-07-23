import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { usePartnerDashboard } from "../hooks/usePartnerDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";

export default function PortfolioBenefitsPage() {
  const { data, loading } = usePartnerDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando benefícios...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/portfolio" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Gestão de Benefícios & Metas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a captura de valor social, ambiental e financeiro prometidos no business case de cada iniciativa.
          </p>
        </div>

        {/* Benefits list */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5 font-sans">
            <Target size={18} className="text-purple-755 font-bold" /> Benefícios Monitorados
          </h3>

          <div className="divide-y divide-slate-100 font-mono text-[10px]">
            {data.benefits.map(ben => (
              <div key={ben.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-sans font-sans">
                <div>
                  <strong className="text-slate-900 text-xs block">{ben.description}</strong>
                  <span className="text-[10px] text-slate-505 block">ID: {ben.id} | Tipo: {ben.type} | Alvo: {ben.targetValue} | Realizado: {ben.achievedValue}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${ben.status === "achieved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-purple-50 text-purple-700 border-purple-100"}`}>
                  {ben.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
