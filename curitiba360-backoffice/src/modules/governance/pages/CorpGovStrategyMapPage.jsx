import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export default function CorpGovStrategyMapPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/governance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Mapa Estratégico</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe as relações de causa e efeito entre os objetivos estratégicos de cada perspectiva da corporação.
          </p>
        </div>

        {/* Perspectives mapping */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 my-0 flex items-center gap-1.5">
            <Compass size={18} className="text-purple-755 font-bold" /> Mapa de Perspectivas BSC
          </h3>

          <div className="space-y-4 font-sans text-xs">
            {/* Finance */}
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl">
              <strong className="text-rose-900 block text-xs">Perspectiva Financeira</strong>
              <span className="text-[10px] text-rose-700 block mt-1">Aumentar eficiência operacional e reduzir custos de manutenção de infraestrutura legada.</span>
            </div>

            {/* Customer */}
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-2xl">
              <strong className="text-blue-900 block text-xs">Perspectiva de Clientes & Visitantes</strong>
              <span className="text-[10px] text-blue-700 block mt-1">Garantir a melhor usabilidade no ecossistema mobile offline e digital twin interativo.</span>
            </div>

            {/* Process */}
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-2xl">
              <strong className="text-purple-900 block text-xs">Perspectiva de Processos Internos</strong>
              <span className="text-[10px] text-purple-700 block mt-1">Digitalizar auditorias e implementar split automatizado de repasses sem intervenção humana.</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
