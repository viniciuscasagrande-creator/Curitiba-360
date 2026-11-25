import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, DollarSign } from "lucide-react";

export default function GovAgreementsPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando convênios...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Convênios Municipais</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhamento de repasses, convênios estaduais, federais e internacionais (BID, BNDES) pactuados.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.agreements.map(conv => (
            <div key={conv.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-xl text-purple-700">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 my-0">{conv.agency}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {conv.id}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono text-emerald-700 bg-emerald-50">
                  {conv.status === "in_execution" ? "Em Execução" : "Aprovado"}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-mono">
                <span><strong>Valor do Repasse:</strong> R$ {conv.value.toLocaleString("pt-BR")}</span>
                <span><strong>Contrapartida Municipal:</strong> R$ {conv.counterPart.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
