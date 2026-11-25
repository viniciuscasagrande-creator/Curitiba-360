import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Coins, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PartnerLayout from "../../partner/layouts/PartnerLayout";
import { payoutRequestSchema } from "../schemas/payoutRequestSchema";
import { createPayoutRepository } from "../repositories/partnerFinancialRepository";
import { useFinancialSummary } from "../hooks/useFinancialSummary";

export default function PayoutRequestPage() {
  const navigate = useNavigate();
  const { account } = useFinancialSummary();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(payoutRequestSchema),
    defaultValues: {
      amount: 100,
      bankAccountId: "bank-account-001",
      confirmation: true,
    },
  });

  const onSubmit = async (values) => {
    if (!account) return;
    if (values.amount > account.balance.available) {
      window.alert("Saldo disponível insuficiente!");
      return;
    }
    await createPayoutRepository({
      requestedAmount: values.amount,
      bankAccountId: values.bankAccountId,
      requestedBy: "user-demo",
    });
    setSuccess(true);
    setTimeout(() => {
      navigate("/parceiro/financeiro");
    }, 2000);
  };

  if (success) {
    return (
      <PartnerLayout>
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm select-none">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <CheckCircle size={36} />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-955 my-0">Repasse Solicitado!</h2>
          <p className="mt-2 text-sm text-slate-655 my-0">
            Sua solicitação de saque foi registrada e está em processamento bancário.
          </p>
        </div>
      </PartnerLayout>
    );
  }

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
              Solicitar Repasse
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Valor do Saque (R$)</label>
            <input
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            />
            {errors.amount && (
              <p className="mt-1.5 text-xs font-semibold text-red-600 my-0">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Conta Bancária de Destino</label>
            <select
              {...register("bankAccountId")}
              className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none focus:border-emerald-500 bg-white"
            >
              <option value="bank-account-001">Banco do Brasil • Agência 1234 • Conta 56789-0</option>
            </select>
          </div>

          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="confirmation"
              {...register("confirmation")}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-550 cursor-pointer"
            />
            <label htmlFor="confirmation" className="text-xs font-semibold text-slate-500 cursor-pointer">
              Confirmo que os dados bancários acima estão corretos e atualizados.
            </label>
          </div>
          {errors.confirmation && (
            <p className="text-xs font-semibold text-red-600 my-0">{errors.confirmation.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm border-none cursor-pointer transition disabled:opacity-50"
          >
            Confirmar e Enviar Solicitação
          </button>
        </form>
      </div>
    </PartnerLayout>
  );
}
