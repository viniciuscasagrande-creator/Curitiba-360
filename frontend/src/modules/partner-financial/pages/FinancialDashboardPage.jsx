import React from "react";
import { ArrowRight, Download, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import FinancialSummaryCards from "../components/FinancialSummaryCards";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function FinancialDashboardPage() {
  const {
    account,
    transactions,
    payouts,
    loading,
    error,
  } = useFinancialSummary();

  if (loading) {
    return (
      <PartnerLayout>
        <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />
      </PartnerLayout>
    );
  }

  if (error || !account) {
    return (
      <PartnerLayout>
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error || "Conta financeira não encontrada."}
        </section>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-7xl space-y-6 select-none text-left">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700 my-0">
              Financeiro
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-955 my-0">
              Saldo e recebíveis
            </h1>
            <p className="mt-2 text-sm text-slate-600 my-0">
              Acompanhe vendas, taxas, recebíveis e repasses.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/parceiro/financeiro/extrato"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition text-decoration-none cursor-pointer"
            >
              <Download size={17} />
              Ver extrato
            </Link>

            <Link
              to="/parceiro/financeiro/repasses/solicitar"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 transition text-decoration-none cursor-pointer border-none"
            >
              <Landmark size={17} />
              Solicitar repasse
            </Link>
          </div>
        </header>

        <FinancialSummaryCards
          account={account}
        />

        <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-955 my-0">
                  Movimentações recentes
                </h2>
                <p className="mt-1 text-sm text-slate-500 my-0">
                  Créditos e débitos da conta.
                </p>
              </div>

              <Link
                to="/parceiro/financeiro/extrato"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 text-decoration-none hover:underline"
              >
                Ver extrato
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {transactions
                .slice(0, 5)
                .map(
                  (transaction) => (
                    <div
                      key={
                        transaction.id
                      }
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900 my-0">
                          {
                            transaction.description
                          }
                        </p>
                        <p className="mt-1 text-xs text-slate-500 my-0">
                          {new Date(
                            transaction.createdAt
                          ).toLocaleString(
                            "pt-BR"
                          )}
                        </p>
                      </div>

                      <strong
                        className={
                          transaction.direction ===
                          "credit"
                            ? "text-emerald-700"
                            : "text-red-700"
                        }
                      >
                        {transaction.direction ===
                        "credit"
                          ? "+"
                          : "-"}
                        {new Intl.NumberFormat(
                          "pt-BR",
                          {
                            style:
                              "currency",
                            currency:
                              "BRL",
                          }
                        ).format(
                          transaction.amount
                        )}
                      </strong>
                    </div>
                  )
                )}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-300 my-0 uppercase tracking-wider">
                Repasses Solicitados
              </p>
              <p className="mt-3 text-4xl font-extrabold my-0 font-mono">
                {payouts.length}
              </p>
              <p className="mt-2 text-sm text-slate-300 my-0">
                Histórico total de repasses iniciados pelo portal.
              </p>
            </div>

            <Link
              to="/parceiro/financeiro/repasses"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-955 text-decoration-none hover:bg-slate-100 transition cursor-pointer"
            >
              Ver repasses
              <ArrowRight size={17} />
            </Link>
          </article>
        </section>
      </div>
    </PartnerLayout>
  );
}
