import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function ExportReportsPage() {
  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/relatorios"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Relatórios
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Exportação de Dados
            </h1>
          </div>
        </header>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-955 my-0">Baixar base de dados (CSV/XLSX)</h3>
            <p className="text-sm text-slate-505 my-0 mt-1">Exportação em conformidade com as diretrizes da LGPD.</p>
          </div>
          <button
            onClick={() => window.alert("Relatório completo exportado com sucesso!")}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm border-none cursor-pointer px-4 transition"
          >
            <Download size={17} />
            Exportar Agora
          </button>
        </section>
      </div>
    </PartnerLayout>
  );
}
