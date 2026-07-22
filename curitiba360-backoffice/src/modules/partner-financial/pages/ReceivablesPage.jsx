import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import { RECEIVABLE_STATUS } from "../constants/receivableStatus";

export default function ReceivablesPage() {
  const { receivables } = useFinancialSummary();

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
              Agenda de Recebíveis
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Data Disponibilidade</th>
                  <th className="px-6 py-4">Pedido Original</th>
                  <th className="px-6 py-4">Valor Bruto</th>
                  <th className="px-6 py-4">Valor Líquido</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {receivables.map((r) => {
                  const statusInfo = RECEIVABLE_STATUS[r.status] || RECEIVABLE_STATUS.created;
                  return (
                    <tr key={r.id} className="hover:bg-slate-55/50 transition">
                      <td className="px-6 py-4">{new Date(r.availableAt).toLocaleDateString("pt-BR")}</td>
                      <td className="px-6 py-4">{r.orderId.toUpperCase().replace("-", "")}</td>
                      <td className="px-6 py-4">R$ {r.grossAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-emerald-700">R$ {r.netAmount.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusInfo.className} border`}>
                          {statusInfo.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {receivables.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-505">
                      Nenhum recebível futuro ou disponível na agenda.
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
