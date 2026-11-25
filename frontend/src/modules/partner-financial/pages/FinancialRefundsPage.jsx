import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function FinancialRefundsPage() {
  const { account } = useFinancialSummary();

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
              Reembolsos Realizados
            </h1>
          </div>
        </header>

        {account && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-955 my-0">Impacto Financeiro de Reembolsos</h3>
            <div className="text-sm text-slate-700">
              <p className="my-0">
                <strong>Taxa de Reembolso cobrada:</strong> R$ {account.fees.refund.toFixed(2)}
              </p>
            </div>
          </section>
        )}
      </div>
    </PartnerLayout>
  );
}
