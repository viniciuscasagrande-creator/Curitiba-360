import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function FiscalDocumentsPage() {
  const invoices = [
    { id: "nf1", number: "000.123.456", period: "Julho/2026", amount: 298.84 },
    { id: "nf2", number: "000.123.455", period: "Junho/2026", amount: 250.00 }
  ];

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-4xl space-y-6 select-none text-left">
        <header className="flex items-center gap-4">
          <Link
            to="/parceiro/financeiro"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-707 hover:bg-slate-50 transition text-decoration-none"
          >
            <ArrowLeft size={19} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Financeiro
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-955 my-0">
              Notas Fiscais
            </h1>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {invoices.map((inv) => (
            <div key={inv.id} className="border border-slate-200 bg-white rounded-3xl p-5 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-955 my-0">Nota Fiscal #{inv.number}</h4>
                  <p className="text-xs text-slate-505 my-0 mt-0.5">Período: {inv.period} • R$ {inv.amount.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={() => window.alert("XML/PDF baixado com sucesso!")}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
                aria-label="Download nota fiscal"
              >
                <Download size={15} />
              </button>
            </div>
          ))}
        </section>
      </div>
    </PartnerLayout>
  );
}
