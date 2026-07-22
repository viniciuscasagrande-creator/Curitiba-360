import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function FinancialStatementPage() {
  const { transactions } = useFinancialSummary();

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-5xl space-y-6 select-none text-left">
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
              Extrato Detalhado
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Descrição</th>
                  <th className="px-6 py-4">Referência</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-55/50 transition">
                    <td className="px-6 py-4">{new Date(t.createdAt).toLocaleDateString("pt-BR")}</td>
                    <td className="px-6 py-4">{t.description}</td>
                    <td className="px-6 py-4">{t.referenceId}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-slate-100 border border-slate-200/80 px-2 py-0.5 text-xs text-slate-700 font-bold uppercase">
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right ${t.direction === "credit" ? "text-emerald-700" : "text-red-700"}`}>
                      {t.direction === "credit" ? "+" : "-"} R$ {t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-505">
                      Nenhuma transação registrada no extrato.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PartnerLayout>
  );
}
