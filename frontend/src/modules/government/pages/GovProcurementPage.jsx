import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useGovernmentDashboard } from "../hooks/useGovernmentDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, ClipboardList } from "lucide-react";

export default function GovProcurementPage() {
  const { data, loading } = useGovernmentDashboard();

  if (loading || !data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando licitações...
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Licitações & Compras Públicas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhamento de processos licitatórios municipais em andamento, homologados e suspensos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.procurements.map(lic => (
            <div key={lic.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono text-purple-700 bg-purple-50">
                  {lic.modality}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono ${
                  lic.status === "published" ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"
                }`}>
                  {lic.status === "published" ? "Publicado" : "Em Análise"}
                </span>
              </div>

              <div>
                <strong className="text-sm font-bold text-slate-900 block leading-tight">{lic.title}</strong>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">Processo: {lic.id}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button className="px-3 h-8 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-100 cursor-pointer transition">
                  Visualizar Edital
                </button>
                <button className="px-3 h-8 bg-purple-700 text-white font-bold rounded-lg border-none hover:bg-purple-800 cursor-pointer transition">
                  Registrar Proposta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
