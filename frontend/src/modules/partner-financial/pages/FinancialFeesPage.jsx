import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function FinancialFeesPage() {
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
              Taxas da Plataforma
            </h1>
          </div>
        </header>

        {account && (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-955 my-0">Resumo de Taxas Aplicadas</h3>
            <div className="divide-y divide-slate-100 text-sm text-slate-700">
              <div className="py-3 flex justify-between font-semibold">
                <span>Taxas de Comissão (Plataforma)</span>
                <span className="text-red-600">- R$ {account.fees.platform.toFixed(2)}</span>
              </div>
              <div className="py-3 flex justify-between font-semibold">
                <span>Taxas de Gateway (Pagamento)</span>
                <span className="text-red-600">- R$ {account.fees.payment.toFixed(2)}</span>
              </div>
              <div className="py-3 flex justify-between font-semibold">
                <span>Taxas de Antecipação</span>
                <span className="text-red-600">- R$ {account.fees.anticipation.toFixed(2)}</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </PartnerLayout>
  );
}
