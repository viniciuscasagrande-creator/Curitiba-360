import React from "react";
import AdminLayout from "../../admin/layouts/AdminLayout";
import { useFinanceDashboard } from "../hooks/useFinanceDashboard";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function TreasuryPage() {
  const { summary, transactions, loading } = useFinanceDashboard();

  if (loading || !summary) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-slate-500">
          Carregando tesouraria...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 text-left select-none animate-fadeIn text-xs max-w-4xl">
        <Link to="/admin/finance" className="flex items-center gap-1 text-purple-700 font-bold hover:no-underline text-xs">
          <ArrowLeft size={14} /> Voltar ao Painel
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 my-0">Tesouraria & Balanço Ledger</h1>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Acompanhe a contabilização de entradas e saídas no livro-razão imutável de transações do gateway.
          </p>
        </div>

        {/* Balance cards */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Saldo Contábil</span>
            <span className="text-2xl font-extrabold text-slate-900 block">R$ {summary.totalBalance.toLocaleString()}</span>
          </div>
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Saldo Disponível</span>
            <span className="text-2xl font-extrabold text-emerald-650 block">R$ {summary.availableBalance.toLocaleString()}</span>
          </div>
          <div className="p-5 border border-slate-200 rounded-3xl bg-white shadow-sm space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block uppercase tracking-wider">Bloqueado / Garantias</span>
            <span className="text-2xl font-extrabold text-red-600 block">R$ {summary.blockedBalance.toLocaleString()}</span>
          </div>
        </section>

        {/* Transactions ledger */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 font-mono text-[10px]">
          <h3 className="text-lg font-bold text-slate-900 my-0 font-sans flex items-center gap-1">
            <BookOpen size={18} className="text-purple-750" /> Razão Contábil (Ledger)
          </h3>

          <div className="divide-y divide-slate-100">
            {transactions.map(tx => (
              <div key={tx.id} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-900 text-xs font-sans">ID: {tx.id} ({tx.referenceType})</strong>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[8px]">
                      {tx.type}
                    </span>
                  </div>
                  <div className="flex gap-4 text-slate-455">
                    <span>Taxa: R$ {tx.feeAmount.toFixed(2)}</span>
                    <span>•</span>
                    <span>Líquido: R$ {tx.netAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <strong className={`text-sm font-bold font-mono block ${tx.grossAmount > 0 ? "text-emerald-650" : "text-red-655"}`}>
                    {tx.grossAmount > 0 ? "+" : ""}R$ {tx.grossAmount.toLocaleString()}
                  </strong>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider">{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
