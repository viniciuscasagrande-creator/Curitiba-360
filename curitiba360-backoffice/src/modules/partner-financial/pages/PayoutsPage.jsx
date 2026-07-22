import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, Eye } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import { PAYOUT_STATUS } from "../constants/payoutStatus";

export default function PayoutsPage() {
  const { payouts, loading } = useFinancialSummary();

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
              Histórico de Repasses
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Data Solicitação</th>
                  <th className="px-6 py-4">Valor Solicitado</th>
                  <th className="px-6 py-4">Banco de Destino</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {payouts.map((p) => {
                  const statusInfo = PAYOUT_STATUS[p.status] || PAYOUT_STATUS.requested;
                  return (
                    <tr key={p.id} className="hover:bg-slate-55/50 transition">
                      <td className="px-6 py-4 font-bold text-slate-955">{p.code}</td>
                      <td className="px-6 py-4">{new Date(p.requestedAt).toLocaleDateString("pt-BR")}</td>
                      <td className="px-6 py-4">R$ {p.requestedAmount.toFixed(2)}</td>
                      <td className="px-6 py-4">{p.bankAccountSnapshot?.bankName || "Banco Padrão"}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusInfo.className} border`}>
                          {statusInfo.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {payouts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Nenhum repasse solicitado ainda.
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
