import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Printer, Download, Clock } from "lucide-react";

export default function GovReportsPage() {
  const reportsList = [
    { title: "Relatório de Gestão Fiscal (RGF) - Q1 2026", type: "PDF / Oficial", size: "2.1 MB", code: "RGF-2026-01" },
    { title: "Execução Física e Financeira de Programas de Inovação", type: "XLSX / Dashboard", size: "850 KB", code: "PROG-FIN-02" },
    { title: "Prestação de Contas Simplificada ao Cidadão", type: "PDF / Informativo", size: "1.4 MB", code: "CITIZEN-REP-26" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/government" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Relatórios & Prestações de Contas</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Documentos consolidados de prestação de contas, relatórios fiscais oficiais (LRF) e estatísticas urbanas.
          </p>
        </div>

        <div className="space-y-3">
          {reportsList.map((rep, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-50 rounded-xl text-purple-700">
                  <FileText size={18} />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">{rep.title}</strong>
                  <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                    Código: {rep.code} | {rep.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 border border-slate-200 cursor-pointer">
                  <Printer size={14} />
                </button>
                <button className="px-3 h-8 bg-purple-700 text-white font-bold rounded-lg border-none hover:bg-purple-800 cursor-pointer flex items-center gap-1">
                  <Download size={14} /> Baixar ({rep.size})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
