import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import PartnerLayout from "../../partner/layouts/PartnerLayout";

export default function AnticipationPage() {
  const [amount, setAmount] = useState(1000);
  const feeRate = 0.025; // 2.5% simple fee rate
  const feeAmount = amount * feeRate;
  const netAmount = amount - feeAmount;

  return (
    <PartnerLayout>
      <div className="mx-auto max-w-xl space-y-6 select-none text-left">
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
              Antecipação de Saldo
            </h1>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-bold text-slate-955 my-0 flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500 animate-pulse" />
            Simulador de Antecipação
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Valor a Antecipar (R$)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 space-y-3 text-sm text-slate-750 font-semibold">
            <div className="flex justify-between">
              <span>Valor Bruto da Operação</span>
              <span className="text-slate-950">R$ {amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxa de Antecipação (2.5%)</span>
              <span className="text-red-600">- R$ {feeAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 my-2" />
            <div className="flex justify-between text-base font-bold">
              <span>Valor Líquido Estimado</span>
              <span className="text-emerald-700">R$ {netAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => window.alert("Solicitação de antecipação enviada para análise comercial!")}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm border-none cursor-pointer transition"
          >
            Confirmar Antecipação
          </button>
        </section>
      </div>
    </PartnerLayout>
  );
}
